// Regional smoke proof. No credentials, cloud API, or fleet locations are used.
// Run: node integrations/valhalla/verify.mjs [http://127.0.0.1:8002]
const endpoint = process.argv[2] ?? 'http://127.0.0.1:8002';
const url = new URL(endpoint);
if (!['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname)) {
  throw new Error('This regional proof permits only a loopback service');
}
async function request(path, body) {
  const response = await fetch(new URL(path, url), {
    method: body ? 'POST' : 'GET',
    // Official service does not handle OPTIONS; text/plain JSON avoids a CORS preflight.
    headers: body ? { 'content-type': 'text/plain' } : {},
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30000),
  });
  return { http: response.status, cors: response.headers.get('access-control-allow-origin'), body: await response.json() };
}
const truck = {
  height: 4.1, width: 2.6, length: 21, weight: 36.28,
  axle_load: 9, axle_count: 5, hazmat: true,
  hgv_no_access_penalty: 43200, ignore_restrictions: false,
};
const route = {
  locations: [
    { lat: 38.902, lon: -77.035, type: 'break' },
    { lat: 38.864, lon: -76.988, type: 'break' },
  ],
  costing: 'truck', costing_options: { truck },
  format: 'osrm', shape_format: 'geojson', units: 'kilometers',
};
const status = await request('/status');
const baseline = await request('/route', route);
const exclusions = await request('/route', {
  ...route, costing_options: { truck: { ...truck, exclude_bridges: true, exclude_tunnels: true } },
});
const outside = await request('/route', {
  ...route, locations: [{ lat: 41.8781, lon: -87.6298 }, { lat: 41.9, lon: -87.65 }],
});
function summary(result) {
  const value = result.body.routes?.[0];
  return {
    http: result.http, cors: result.cors, code: result.body.code ?? result.body.error_code,
    message: result.body.message ?? result.body.error,
    distanceM: value?.distance, durationS: value?.duration,
    geometryPoints: value?.geometry?.coordinates?.length,
    warnings: result.body.warnings ?? [],
  };
}
const validBaseline = baseline.http === 200 && baseline.body.routes?.[0]?.geometry?.coordinates?.length > 1;
const validExcludedRoute = exclusions.http === 200 && exclusions.body.routes?.[0]?.geometry?.coordinates?.length > 1;
const noExcludedRoute = exclusions.body.code === 'NoRoute' || exclusions.body.error_code === 442;
const changed = validBaseline && (noExcludedRoute || (validExcludedRoute &&
  JSON.stringify(baseline.body.routes[0].geometry) !== JSON.stringify(exclusions.body.routes[0].geometry)));
const result = {
  observedAt: new Date().toISOString(), endpoint: url.origin,
  coverage: 'District of Columbia regional extract only',
  status, truckOptionsSent: truck,
  baseline: summary(baseline), hardExclusions: summary(exclusions),
  exclusionChangedPathOrBlocked: changed,
  outsideCoverage: summary(outside),
  boundary: 'Engine acceptance and regional behavior proof; not a certification of road restrictions, permits, live closures, or truck safety.',
};
console.log(JSON.stringify(result, null, 2));
if (!validBaseline || !changed || outside.http === 200 || exclusions.body.warnings?.length) process.exitCode = 1;
