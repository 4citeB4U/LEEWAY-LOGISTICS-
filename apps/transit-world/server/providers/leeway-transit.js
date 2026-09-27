import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const FEED_ID = 'leeway-transit-hub';
const DEFAULT_TRANSIT_HUB_URL = 'http://127.0.0.1:5082';
const DEFAULT_TELEMETRY_PATH = fileURLToPath(
  new URL('../../config/leeway-transit-telemetry.json', import.meta.url),
);

function localTransitHubUrl(raw = process.env.LEEWAY_TRANSIT_HUB_URL) {
  const value = String(raw || DEFAULT_TRANSIT_HUB_URL).trim();
  const url = new URL(value);
  const host = url.hostname.toLowerCase();
  if (!['127.0.0.1', 'localhost', '::1'].includes(host)) {
    throw new Error('LEEWAY_TRANSIT_HUB_URL must resolve to this machine');
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Unsupported LeeWay Transit Hub protocol');
  }
  return url;
}

function tenantHeaders() {
  const id = String(process.env.LEEWAY_TRANSIT_TENANT_ID || '').trim();
  const code = String(process.env.LEEWAY_TRANSIT_TENANT_CODE || '').trim();
  if (!id && !code) return {};
  if (!id || !code) {
    throw new Error('Both LeeWay tenant environment values are required');
  }
  return {
    'X-LeeWay-Tenant-Id': id,
    'X-LeeWay-Tenant-Code': code,
  };
}

async function readTelemetry(path = DEFAULT_TELEMETRY_PATH) {
  const parsed = JSON.parse(await readFile(path, 'utf8'));
  const rows = Array.isArray(parsed?.vehicles) ? parsed.vehicles : [];
  return {
    mode: String(parsed?.mode || 'UNVERIFIED').toUpperCase(),
    rows,
  };
}

function finiteCoordinate(lat, lon) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lon) <= 180 &&
    !(Math.abs(lat) < 1e-6 && Math.abs(lon) < 1e-6)
  );
}
export function projectLeeWayVehicles(
  vehicles,
  telemetry,
  now = Date.now(),
) {
  const spatialByFleet = new Map(
    (telemetry?.rows || []).map((row) => [String(row.fleetNumber), row]),
  );
  const timestamp = Math.floor(now / 1000);
  return (Array.isArray(vehicles) ? vehicles : []).flatMap((vehicle) => {
    const spatial = spatialByFleet.get(String(vehicle?.fleetNumber || ''));
    if (!spatial || !finiteCoordinate(spatial.lat, spatial.lon)) return [];
    return [{
      id: String(vehicle.id),
      lat: Number(spatial.lat),
      lon: Number(spatial.lon),
      bearing: Number.isFinite(spatial.bearing) ? spatial.bearing : null,
      speedMps: Number.isFinite(spatial.speedMps) ? spatial.speedMps : 0,
      timestamp,
      timestampSource: 'fetch',
      routeId: spatial.routeId || 'LEEWAY-TRAINING',
      tripId: spatial.tripId || null,
      directionId: null,
      label: `[DEMO] ${vehicle.fleetNumber}`,
      stopId: null,
      status: spatial.status || 'TRAINING_FIXTURE',
      occupancy: null,
      leewayVehicle: {
        fleetNumber: vehicle.fleetNumber,
        manufacturer: vehicle.manufacturer,
        model: vehicle.model,
        modelYear: vehicle.modelYear,
        operationalStatus: vehicle.status,
        telemetryMode: telemetry.mode,
      },
    }];
  });
}
async function buildSnapshot({ fetchImpl = fetch } = {}) {
  const hub = localTransitHubUrl();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const endpoint = new URL('/api/Vehicles', hub);
    const response = await fetchImpl(endpoint, {
      signal: controller.signal,
      headers: { Accept: 'application/json', ...tenantHeaders() },
    });
    if (!response.ok) {
      throw new Error(`Transit Hub HTTP ${response.status}`);
    }
    const vehicles = await response.json();
    const telemetry = await readTelemetry(
      process.env.LEEWAY_TRANSIT_TELEMETRY_PATH || DEFAULT_TELEMETRY_PATH,
    );
    const fetchedAt = Date.now();
    const projected = projectLeeWayVehicles(vehicles, telemetry, fetchedAt);
    return {
      feedId: FEED_ID,
      name: 'LeeWay Enterprise Transit Hub',
      fetchedAt,
      feedTimestamp: Math.floor(fetchedAt / 1000),
      version: 'leeway-spatial-bridge-v1',
      entityCount: projected.length,
      truncated: false,
      count: projected.length,
      vehicles: projected,
      leeway: {
        telemetryMode: telemetry.mode,
        liveGps: false,
        businessSource: endpoint.toString(),
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}
function writeJson(res, status, body, headers = {}) {
  res.statusCode = status;
  for (const [key, value] of Object.entries({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers,
  })) res.setHeader(key, value);
  res.end(JSON.stringify(body));
}

export function leewayTransitProxy(options = {}) {
  const handle = async (req, res, next) => {
    const pathname = String(req.url || '').split('?')[0];
    if (pathname !== '/vehicles' && pathname !== '/vehicles/') return next();
    if (req.method !== 'GET') return writeJson(res, 405, { error: 'method_not_allowed' });
    try {
      const snapshot = await buildSnapshot(options);
      return writeJson(res, 200, snapshot, {
        'X-LeeWay-Transit-Source': 'enterprise-transit-hub',
        'X-LeeWay-Telemetry-Mode': snapshot.leeway.telemetryMode,
        'X-Transit-Contact': String(snapshot.fetchedAt),
      });
    } catch (error) {
      return writeJson(res, 503, {
        error: 'leeway_transit_unavailable',
        detail: String(error?.message || error),
      });
    }
  };
  return {
    name: 'leeway-transit-proxy',
    configureServer(server) {
      server.middlewares.use('/api/leeway-transit', handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/leeway-transit', handle);
    },
  };
}
