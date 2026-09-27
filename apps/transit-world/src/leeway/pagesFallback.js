import cockpitConfig from '../../config/leeway-driver-cockpit.json';
import telemetryConfig from '../../config/leeway-transit-telemetry.json';

export function isStaticPagesMode() {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hostname.endsWith('github.io') ||
    import.meta.env.VITE_LEEWAY_STATIC_PAGES === '1'
  );
}

export function buildStaticCockpit() {
  const fleetNumber = cockpitConfig?.driver?.vehicleFleetNumber || 'LW-1001';
  return {
    mode: 'TRAINING_DEMO',
    generatedAt: new Date().toISOString(),
    driver: cockpitConfig.driver,
    vehicle: {
      id: 'github-pages-training-vehicle',
      fleetNumber,
      manufacturer: 'New Flyer',
      model: 'Xcelsior CHARGE NG',
      modelYear: 2025,
      status: 'TRAINING_DEMO',
    },
    truckProfile: cockpitConfig.truckProfile,
    hos: cockpitConfig.hos,
    activeLoad: cockpitConfig.activeLoad,
    documents: cockpitConfig.documents,
    crm: cockpitConfig.crm,
    routeIntelligence: cockpitConfig.routeIntelligence,
    route: {
      origin: {
        lat: cockpitConfig.activeLoad.pickup.lat,
        lon: cockpitConfig.activeLoad.pickup.lon,
        label: cockpitConfig.activeLoad.pickup.name,
      },
      destination: {
        lat: cockpitConfig.activeLoad.delivery.lat,
        lon: cockpitConfig.activeLoad.delivery.lon,
        label: cockpitConfig.activeLoad.delivery.name,
      },
      visualProfile: 'car',
      visualAuthority: 'OSRM_CAR_BASE_ONLY',
      truckSafetyStatus: 'UNVERIFIED',
    },
    provenance: {
      businessSource: 'bundled-training-fixture',
      spatialRouteAuthority: 'OSRM_CAR_BASE_ONLY',
      liveTruckSafeRouting: false,
      formulaExecuted: false,
      staticPagesMode: true,
    },
  };
}

export function buildStaticFleet() {
  const vehicles = (telemetryConfig?.vehicles || []).map((row) => ({
    id: `pages-${row.fleetNumber}`,
    lat: Number(row.lat),
    lon: Number(row.lon),
    bearing: Number(row.bearing) || 0,
    speedMps: Number(row.speedMps) || 0,
    timestamp: Math.floor(Date.now() / 1000),
    timestampSource: 'training-fixture',
    routeId: row.routeId || 'LEEWAY-TRAINING',
    tripId: row.tripId || null,
    directionId: null,
    label: `[DEMO] ${row.fleetNumber}`,
    stopId: null,
    status: row.status || 'TRAINING_FIXTURE',
    occupancy: null,
    leewayVehicle: {
      fleetNumber: row.fleetNumber,
      manufacturer: 'New Flyer',
      model: 'Xcelsior CHARGE NG',
      modelYear: 2025,
      operationalStatus: 'TRAINING_DEMO',
      telemetryMode: 'TRAINING_DEMO',
    },
  }));

  return {
    feedId: 'leeway-transit-hub',
    name: 'LeeWay Enterprise Transit Hub — GitHub Pages Demo',
    fetchedAt: Date.now(),
    feedTimestamp: Math.floor(Date.now() / 1000),
    version: 'leeway-static-pages-v1',
    entityCount: vehicles.length,
    truncated: false,
    count: vehicles.length,
    vehicles,
    leeway: {
      telemetryMode: 'TRAINING_DEMO',
      liveGps: false,
      businessSource: 'bundled-training-fixture',
      staticPagesMode: true,
    },
  };
}

export async function fetchStaticRoute(route) {
  if (!route?.origin || !route?.destination) return null;
  const coords =
    `${route.origin.lon.toFixed(6)},${route.origin.lat.toFixed(6)};` +
    `${route.destination.lon.toFixed(6)},${route.destination.lat.toFixed(6)}`;
  const url =
    'https://router.project-osrm.org/route/v1/driving/' +
    coords +
    '?overview=full&geometries=geojson&steps=true';

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`OSRM HTTP ${response.status}`);
    const body = await response.json();
    const first = body?.routes?.[0];
    const geometry = first?.geometry?.coordinates;
    if (!first || !Array.isArray(geometry) || geometry.length < 2) {
      throw new Error('OSRM route unavailable');
    }
    return {
      ok: true,
      profile: 'car',
      geometry,
      distanceM: Number(first.distance) || 0,
      durationS: Number(first.duration) || 0,
      source: 'browser-osrm-training-fallback',
    };
  } catch {
    return {
      ok: true,
      profile: 'car',
      geometry: [
        [route.origin.lon, route.origin.lat],
        [route.destination.lon, route.destination.lat],
      ],
      distanceM: null,
      durationS: null,
      source: 'straight-line-training-fallback',
    };
  }
}
