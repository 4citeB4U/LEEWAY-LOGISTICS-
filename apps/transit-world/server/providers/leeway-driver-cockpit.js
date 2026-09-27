import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const DEFAULT_HUB_URL = 'http://127.0.0.1:5082';
const DEFAULT_COCKPIT_PATH = fileURLToPath(
  new URL('../../config/leeway-driver-cockpit.json', import.meta.url),
);

function localHubUrl(raw = process.env.LEEWAY_TRANSIT_HUB_URL) {
  const url = new URL(String(raw || DEFAULT_HUB_URL).trim());
  const host = url.hostname.toLowerCase();
  if (!['127.0.0.1', 'localhost', '::1'].includes(host)) {
    throw new Error('LeeWay Transit Hub must remain local');
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Unsupported Transit Hub protocol');
  }
  return url;
}

function tenantHeaders() {
  const id = String(process.env.LEEWAY_TRANSIT_TENANT_ID || '').trim();
  const code = String(process.env.LEEWAY_TRANSIT_TENANT_CODE || '').trim();
  if (!id && !code) return {};
  if (!id || !code) throw new Error('Both LeeWay tenant values are required');
  return { 'X-LeeWay-Tenant-Id': id, 'X-LeeWay-Tenant-Code': code };
}
async function readCockpitConfig(
  path = process.env.LEEWAY_DRIVER_COCKPIT_PATH || DEFAULT_COCKPIT_PATH,
) {
  return JSON.parse(await readFile(path, 'utf8'));
}

export function cockpitRouteContract(config) {
  const pickup = config?.activeLoad?.pickup;
  const delivery = config?.activeLoad?.delivery;
  const valid = (point) =>
    Number.isFinite(point?.lat) &&
    Number.isFinite(point?.lon) &&
    Math.abs(point.lat) <= 90 &&
    Math.abs(point.lon) <= 180;
  if (!valid(pickup) || !valid(delivery)) return null;
  return {
    origin: { lat: pickup.lat, lon: pickup.lon, label: pickup.name },
    destination: { lat: delivery.lat, lon: delivery.lon, label: delivery.name },
    visualProfile: 'car',
    visualAuthority: 'OSRM_CAR_BASE_ONLY',
    truckSafetyStatus: config.routeIntelligence?.truckSafetyStatus || 'UNVERIFIED',
  };
}

export async function buildDriverCockpit({
  fetchImpl = (...args) => fetch(...args),
} = {}) {
  const config = await readCockpitConfig();
  const hub = localHubUrl();
  const endpoint = new URL('/api/Vehicles', hub);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetchImpl(endpoint, {
      signal: controller.signal,
      headers: { Accept: 'application/json', ...tenantHeaders() },
    });
    if (!response.ok) throw new Error(`Transit Hub HTTP ${response.status}`);
    const vehicles = await response.json();
    const fleetNumber = config?.driver?.vehicleFleetNumber;
    const vehicle = (Array.isArray(vehicles) ? vehicles : []).find(
      (row) => row?.fleetNumber === fleetNumber,
    ) || null;
    return {
      mode: config.mode || 'UNVERIFIED',
      generatedAt: new Date().toISOString(),
      driver: config.driver,
      vehicle,
      truckProfile: config.truckProfile,
      hos: config.hos,
      activeLoad: config.activeLoad,
      documents: config.documents,
      crm: config.crm,
      routeIntelligence: config.routeIntelligence,
      route: cockpitRouteContract(config),
      provenance: {
        businessSource: endpoint.toString(),
        spatialRouteAuthority: 'OSRM_CAR_BASE_ONLY',
        liveTruckSafeRouting: false,
        formulaExecuted: false,
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}
function writeJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export function leewayDriverCockpitProxy(options = {}) {
  const handle = async (req, res, next) => {
    const pathname = String(req.url || '').split('?')[0];
    if (pathname !== '/driver-cockpit' && pathname !== '/driver-cockpit/') return next();
    if (req.method !== 'GET') return writeJson(res, 405, { error: 'method_not_allowed' });
    try {
      return writeJson(res, 200, await buildDriverCockpit(options));
    } catch (error) {
      return writeJson(res, 503, {
        error: 'leeway_driver_cockpit_unavailable',
        detail: String(error?.message || error),
      });
    }
  };
  return {
    name: 'leeway-driver-cockpit-proxy',
    configureServer(server) {
      server.middlewares.use('/api/leeway-transit', handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/leeway-transit', handle);
    },
  };
}
