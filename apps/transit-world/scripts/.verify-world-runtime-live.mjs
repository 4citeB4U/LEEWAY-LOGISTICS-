import http from 'node:http';
import handler from '../api/[...path].js';

const server = http.createServer((req, res) => {
  Promise.resolve(handler(req, res)).catch((error) => {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: String(error?.message || error) }));
  });
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

async function get(path, timeoutMs = 45000) {
  const response = await fetch(origin + path, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: { Origin: 'https://4citeb4u.github.io' },
  });
  const contentType = response.headers.get('content-type') || '';
  const text = await response.text();
  let body = text;
  if (contentType.includes('json')) {
    try { body = JSON.parse(text); } catch {}
  }
  return {
    status: response.status,
    contentType,
    cors: response.headers.get('access-control-allow-origin'),
    body,
  };
}

try {
  const health = await get('/api/health');
  console.log('HEALTH', JSON.stringify({
    status: health.status,
    cors: health.cors,
    body: health.body,
  }));

  const flightA = await get('/api/opensky?lat=43.0389&lon=-87.9065', 60000);
  const statesA = Array.isArray(flightA.body?.states) ? flightA.body.states : [];
  console.log('OPENSKY_A', JSON.stringify({
    status: flightA.status,
    source: flightA.body?.source || null,
    time: flightA.body?.time || null,
    stateCount: statesA.length,
    first: statesA[0]?.slice?.(0, 11) || null,
  }));

  await new Promise((resolve) => setTimeout(resolve, 13000));
  const flightB = await get('/api/opensky?lat=43.0389&lon=-87.9065', 60000);
  const statesB = Array.isArray(flightB.body?.states) ? flightB.body.states : [];
  const byIdB = new Map(statesB.map((row) => [row?.[0], row]));
  const moving = statesA.find((row) => {
    const later = byIdB.get(row?.[0]);
    return later && (later[5] !== row[5] || later[6] !== row[6] || later[3] !== row[3]);
  });
  console.log('OPENSKY_B', JSON.stringify({
    status: flightB.status,
    time: flightB.body?.time || null,
    stateCount: statesB.length,
    movingProof: moving ? {
      icao24: moving[0],
      callsign: moving[1],
      before: [moving[5], moving[6], moving[3]],
      after: [byIdB.get(moving[0])[5], byIdB.get(moving[0])[6], byIdB.get(moving[0])[3]],
    } : null,
  }));

  const cctv = await get('/api/cctv/sources', 90000);
  const sources = Array.isArray(cctv.body) ? cctv.body :
    Array.isArray(cctv.body?.sources) ? cctv.body.sources : [];
  console.log('CCTV', JSON.stringify({
    status: cctv.status,
    count: sources.length,
    sample: sources.slice(0, 3).map((row) => ({
      id: row.id, name: row.name, provider: row.provider, city: row.city,
      snapshot: Boolean(row.snapshotUrl || row.url),
    })),
  }));

  const weather = await get('/api/weather/manifest?product=clouds', 60000);
  console.log('WEATHER', JSON.stringify({
    status: weather.status,
    product: weather.body?.product || null,
    timeCount: Array.isArray(weather.body?.times) ? weather.body.times.length : null,
    latest: weather.body?.latest || null,
  }));
} finally {
  server.close();
}
