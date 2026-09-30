/*
REGION: LeeWay Logistics / Municipal Transit
TAG: LEEWAY.LOGISTICS.MUNICIPAL_TRANSIT.STORE
5WH:
WHAT = Local-first municipal/county transit operations state used by the map workspace.
WHY = Fixed-route, ADA/paratransit, fare/APC, maintenance and safety workflows must remain usable before an agency backend is connected.
WHO = LeeWay Industries under Creator authority.
WHERE = apps/transit-world/src/leeway/municipalTransitStore.js
WHEN = Municipal Transit workspace load and operator edits.
HOW = Versioned local candidate state with bounded normalized collections.
LICENSE = MIT, matching this repository.
*/

export const MUNICIPAL_TRANSIT_KEY = 'leeway.municipalTransit.v1';
export const MUNICIPAL_TRANSIT_COLLECTIONS = Object.freeze([
  'routes',
  'stops',
  'serviceCalendars',
  'operatorAssignments',
  'vehicleAssignments',
  'serviceAlerts',
  'paratransitTrips',
  'fareProducts',
  'apcCounts',
  'workOrders',
  'incidents',
]);

const MAX_ROWS = 500;

function clean(value, max = 240) {
  return String(value ?? '').trim().slice(0, max);
}

function boundedArray(value) {
  return Array.isArray(value)
    ? value.filter((row) => row && typeof row === 'object').slice(-MAX_ROWS)
    : [];
}

export function emptyMunicipalTransitState() {
  return {
    version: 1,
    agency: {
      name: '',
      mode: 'LOCAL_CANDIDATE',
    },
    routes: [],
    stops: [],
    serviceCalendars: [],
    operatorAssignments: [],
    vehicleAssignments: [],
    serviceAlerts: [],
    paratransitTrips: [],
    fareProducts: [],
    apcCounts: [],
    workOrders: [],
    incidents: [],
    updatedAt: null,
  };
}

export function normalizeMunicipalTransitState(value = {}) {
  const base = emptyMunicipalTransitState();
  const state = {
    ...base,
    version: 1,
    agency: {
      name: clean(value?.agency?.name, 120),
      mode: 'LOCAL_CANDIDATE',
    },
    updatedAt: Number.isFinite(Number(value.updatedAt))
      ? Number(value.updatedAt)
      : null,
  };
  for (const collection of MUNICIPAL_TRANSIT_COLLECTIONS)
    state[collection] = boundedArray(value[collection]);
  return state;
}

export function decodeMunicipalTransitState(raw) {
  if (!raw) return emptyMunicipalTransitState();
  try {
    return normalizeMunicipalTransitState(JSON.parse(raw));
  } catch {
    return emptyMunicipalTransitState();
  }
}

export function loadMunicipalTransitState(storage = globalThis.localStorage) {
  try {
    return decodeMunicipalTransitState(storage?.getItem?.(MUNICIPAL_TRANSIT_KEY));
  } catch {
    return emptyMunicipalTransitState();
  }
}

export function saveMunicipalTransitState(
  state,
  storage = globalThis.localStorage,
  now = Date.now,
) {
  const normalized = normalizeMunicipalTransitState({
    ...state,
    updatedAt: now(),
  });
  storage?.setItem?.(MUNICIPAL_TRANSIT_KEY, JSON.stringify(normalized));
  return normalized;
}

export function addMunicipalTransitRecord(
  state,
  collection,
  record,
  { now = Date.now, randomId = () => crypto.randomUUID?.() } = {},
) {
  if (!MUNICIPAL_TRANSIT_COLLECTIONS.includes(collection))
    throw new Error('Unknown municipal transit collection');
  const next = normalizeMunicipalTransitState(state);
  const id = clean(
    record?.id ||
      randomId?.() ||
      `${collection}-${now()}-${Math.random().toString(36).slice(2)}`,
    100,
  );
  const row = {
    ...record,
    id,
    createdAt: Number(record?.createdAt) || now(),
    updatedAt: now(),
  };
  next[collection] = [...next[collection].filter((x) => x.id !== id), row].slice(
    -MAX_ROWS,
  );
  next.updatedAt = now();
  return next;
}

export function removeMunicipalTransitRecord(state, collection, id) {
  if (!MUNICIPAL_TRANSIT_COLLECTIONS.includes(collection))
    throw new Error('Unknown municipal transit collection');
  const next = normalizeMunicipalTransitState(state);
  next[collection] = next[collection].filter((row) => row.id !== id);
  return next;
}

export function summarizeMunicipalTransitState(state) {
  const value = normalizeMunicipalTransitState(state);
  const passengerBoardings = value.apcCounts.reduce(
    (sum, row) => sum + (Number(row.boardings) || 0),
    0,
  );
  const passengerAlightings = value.apcCounts.reduce(
    (sum, row) => sum + (Number(row.alightings) || 0),
    0,
  );
  return Object.freeze({
    routeCount: value.routes.length,
    stopCount: value.stops.length,
    alertCount: value.serviceAlerts.filter(
      (row) => String(row.status || 'ACTIVE').toUpperCase() !== 'CLOSED',
    ).length,
    paratransitTripCount: value.paratransitTrips.length,
    fareProductCount: value.fareProducts.length,
    passengerBoardings,
    passengerAlightings,
    openWorkOrders: value.workOrders.filter(
      (row) => !['CLOSED', 'COMPLETE'].includes(String(row.status || '').toUpperCase()),
    ).length,
    incidentCount: value.incidents.length,
  });
}
