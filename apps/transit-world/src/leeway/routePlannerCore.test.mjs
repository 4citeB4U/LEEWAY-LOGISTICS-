import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createPlannerRequests,
  optimizeStopOrder,
  routeCapability,
  DEFAULT_VEHICLE,
  fuelEstimate,
  formatFuelPriceProvenance,
  moveStop,
  parseCoordinate,
  createRouteClient,
} from './routePlannerCore.js';

test('fuel provenance distinguishes regional benchmarks from unverified station reports', () => {
  assert.match(
    formatFuelPriceProvenance('EIA Midwest weekly diesel average · 2026-09-21'),
    /Regional benchmark, not a station quote/,
  );
  const report = formatFuelPriceProvenance(
    'Reported Station Price · Example station · Diesel · user report, unverified',
  );
  assert.match(report, /User report, confirm current pump price/);
  assert.doesNotMatch(report, /Regional benchmark/);
  assert.equal(
    formatFuelPriceProvenance(null),
    'Manual price; no station quote supplied.',
  );
});

test('clear rejects a provider completing after abort; later planning still succeeds', async () => {
  const requests = createPlannerRequests();
  let finishOld;
  let displayed = null;
  const old = requests.begin();
  const oldResponse = new Promise((resolve) => {
    finishOld = resolve;
  });
  const oldWork = oldResponse.then((payload) => {
    if (old.isCurrent()) displayed = payload;
  });
  requests.invalidate(); // used by clear, removal, reordering and profile edits
  assert.equal(old.signal.aborted, true);
  const replacement = requests.begin();
  if (replacement.isCurrent()) displayed = 'new route';
  finishOld('obsolete route'); // upstream ignores abort
  await oldWork;
  assert.equal(displayed, 'new route');
  assert.equal(replacement.signal.aborted, false);
});

test('invalidating an optimization prevents its late matrix from starting route work', async () => {
  const requests = createPlannerRequests();
  let resolveMatrix;
  let routeCalls = 0;
  const active = requests.begin();
  const matrix = new Promise((resolve) => {
    resolveMatrix = resolve;
  });
  const work = matrix.then(() => {
    if (!active.isCurrent()) return;
    routeCalls++;
  });
  requests.invalidate();
  resolveMatrix([
    [0, 1],
    [1, 0],
  ]);
  await work;
  assert.equal(routeCalls, 0);
});

test('location callbacks and stale errors cannot overwrite state after clear/destroy', async () => {
  const requests = createPlannerRequests();
  const location = requests.capture();
  const active = requests.begin();
  assert.equal(location.isCurrent(), false);
  let rejectRequest;
  let status = 'All locations cleared';
  const work = new Promise((_, reject) => {
    rejectRequest = reject;
  }).catch((error) => {
    if (active.isCurrent()) status = error.message;
  });
  requests.invalidate();
  rejectRequest(new Error('obsolete timeout'));
  await work;
  assert.equal(status, 'All locations cleared');
  assert.equal(active.isCurrent(), false);
});

test('directed road-distance optimizer preserves endpoints and beats original order', () => {
  const matrix = [
    [0, 10, 2, 20],
    [9, 0, 10, 2],
    [9, 2, 0, 10],
    [20, 20, 20, 0],
  ];
  assert.deepEqual(optimizeStopOrder(matrix), {
    order: [0, 2, 1, 3],
    distanceM: 6,
  });
});
test('optimizer handles ten intermediate stops and unreachable legs', () => {
  const m = Array.from({ length: 12 }, (_, a) =>
    Array.from({ length: 12 }, (_, b) => (a === b ? 0 : Math.abs(a - b))),
  );
  const answer = optimizeStopOrder(m);
  assert.equal(answer.order.length, 12);
  assert.equal(answer.distanceM, 11);
  assert.equal(answer.order[0], 0);
  assert.equal(answer.order.at(-1), 11);
  assert.throws(
    () =>
      optimizeStopOrder([
        [0, null],
        [null, 0],
      ]),
    /connected/,
  );
});
test('road optimization agrees with brute force on asymmetric distance matrices', () => {
  const permutations = (a) =>
    a.length < 2
      ? [a]
      : a.flatMap((v, i) =>
          permutations(a.filter((_, j) => j !== i)).map((p) => [v, ...p]),
        );
  for (let seed = 1; seed <= 8; seed++) {
    const matrix = Array.from({ length: 6 }, (_, a) =>
      Array.from({ length: 6 }, (_, b) =>
        a === b ? 0 : 1 + ((a * 53 + b * 17 + seed * 31) % 43),
      ),
    );
    const best = Math.min(
      ...permutations([1, 2, 3, 4]).map((p) =>
        [0, ...p, 5].reduce(
          (sum, v, i, a) => (i ? sum + matrix[a[i - 1]][v] : 0),
          0,
        ),
      ),
    );
    assert.equal(optimizeStopOrder(matrix).distanceM, best);
  }
});
test('truck/hazmat/oversize never silently becomes a passenger route; toll avoidance is blocked', () => {
  assert.match(routeCapability(DEFAULT_VEHICLE), /Passenger-car/);
  for (const patch of [
    { type: 'semi' },
    { hazmat: true },
    { oversize: true },
  ]) {
    assert.throws(
      () => routeCapability({ ...DEFAULT_VEHICLE, ...patch }),
      /qualified truck/,
    );
    assert.match(
      routeCapability({ ...DEFAULT_VEHICLE, ...patch }, true),
      /NOT verified/,
    );
  }
  assert.throws(
    () => routeCapability({ ...DEFAULT_VEHICLE, avoidTolls: true }, true),
    /cannot enforce/,
  );
});
test('fuel math uses US miles/gallons and does not invent a price', () => {
  assert.deepEqual(fuelEstimate(160934.4, 10, 4), {
    miles: 100,
    gallons: 10,
    cost: 40,
  });
  assert.equal(fuelEstimate(160934.4, 10, 0).cost, null);
  assert.equal(fuelEstimate(100, 0, 4), null);
});
test('reordering is immutable and coordinate input is strictly bounded', () => {
  const before = ['a', 'b', 'c'];
  assert.deepEqual(moveStop(before, 2, 1), ['a', 'c', 'b']);
  assert.deepEqual(before, ['a', 'b', 'c']);
  assert.equal(parseCoordinate('91, 0'), null);
  assert.deepEqual(parseCoordinate('41.2, -87.3'), {
    lat: 41.2,
    lon: -87.3,
    label: '41.2, -87.3',
  });
});
test('route transport preserves street geometry and refuses invalid response', async () => {
  const coords = [
    [-87.63, 41.88],
    [-87.62, 41.881],
    [-87.61, 41.89],
  ];
  let url;
  const client = createRouteClient({
    fetchImpl: async (u) => {
      url = u;
      return {
        ok: true,
        json: async () => ({
          code: 'Ok',
          routes: [
            {
              geometry: { coordinates: coords },
              distance: 3000,
              duration: 600,
              legs: [],
            },
          ],
        }),
      };
    },
  });
  const result = await client.route([
    { lon: -87.63, lat: 41.88 },
    { lon: -87.61, lat: 41.89 },
  ]);
  assert.deepEqual(result.geometry, coords);
  assert.match(url, /steps=true/);
  assert.equal(result.distanceM, 3000);
  const broken = createRouteClient({
    fetchImpl: async () => ({
      ok: true,
      json: async () => ({ code: 'NoRoute' }),
    }),
  });
  await assert.rejects(
    () =>
      broken.route([
        { lat: 1, lon: 2 },
        { lat: 3, lon: 4 },
      ]),
    /No usable/,
  );
});
test('cancel signal reaches provider; coordinate lookup needs no network', async () => {
  let calls = 0;
  const client = createRouteClient({
    fetchImpl: async (_, init) => {
      calls++;
      init.signal.throwIfAborted();
      return { ok: true, json: async () => ({}) };
    },
  });
  assert.equal((await client.search('41,-87'))[0].lat, 41);
  assert.equal(calls, 0);
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    () =>
      client.route(
        [
          { lat: 1, lon: 2 },
          { lat: 3, lon: 4 },
        ],
        { signal: controller.signal },
      ),
    { name: 'AbortError' },
  );
});
