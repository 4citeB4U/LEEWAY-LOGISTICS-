import * as Cesium from 'cesium';
import { summarizeTruckRouteSafety } from './truckRoutePolicy.js';
import { operationalCockpit, operationalFleet } from './operationalData.js';

const WORLD_LAYER_IDS = Object.freeze([
  'transit',
  'traffic-incidents',
  'weather-radar',
  'weather-satellite',
  'weather-lightning',
  'cctv',
]);

function minutesLabel(value) {
  if (value == null || !Number.isFinite(Number(value))) return 'UNAVAILABLE';
  const minutes = Math.max(0, Number(value));
  const hours = Math.floor(minutes / 60);
  const remainder = Math.round(minutes % 60);
  return hours ? `${hours}h ${remainder}m` : `${remainder}m`;
}

function money(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? `$${amount.toLocaleString()}` : '—';
}

function setText(root, id, value) {
  const node = root.querySelector(`[data-field="${id}"]`);
  if (node)
    node.textContent = value == null || value === '' ? '—' : String(value);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`${url} HTTP ${response.status}`);
  return response.json();
}
function routeRequestUrl(route) {
  if (!route?.origin || !route?.destination) return null;
  const coords =
    `${route.origin.lon.toFixed(6)},${route.origin.lat.toFixed(6)};` +
    `${route.destination.lon.toFixed(6)},${route.destination.lat.toFixed(6)}`;
  return `/api/route?profile=car&coords=${encodeURIComponent(coords)}&steps=1`;
}

function removeEntity(viewer, id) {
  const existing = viewer.entities.getById(id);
  if (existing) viewer.entities.remove(existing);
}

function renderRoute(viewer, payload, cockpit) {
  removeEntity(viewer, 'leeway-active-load-route');
  removeEntity(viewer, 'leeway-active-load-pickup');
  removeEntity(viewer, 'leeway-active-load-delivery');
  if (
    !payload?.ok ||
    !Array.isArray(payload.geometry) ||
    payload.geometry.length < 2
  ) {
    return null;
  }
  const positions = payload.geometry.flatMap(([lon, lat]) => [lon, lat]);
  const routeEntity = viewer.entities.add({
    id: 'leeway-active-load-route',
    name: cockpit.activeLoad?.loadNumber || 'LeeWay Active Load',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(positions),
      width: 7,
      clampToGround: true,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.22,
        color: Cesium.Color.CYAN.withAlpha(0.94),
      }),
    },
  });
  const pickup = cockpit.route.origin;
  const delivery = cockpit.route.destination;
  viewer.entities.add({
    id: 'leeway-active-load-pickup',
    position: Cesium.Cartesian3.fromDegrees(pickup.lon, pickup.lat),
    point: {
      pixelSize: 13,
      color: Cesium.Color.LIME,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    },
    label: {
      text: 'PICKUP',
      pixelOffset: new Cesium.Cartesian2(0, -24),
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 3,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    },
  });
  viewer.entities.add({
    id: 'leeway-active-load-delivery',
    position: Cesium.Cartesian3.fromDegrees(delivery.lon, delivery.lat),
    point: {
      pixelSize: 13,
      color: Cesium.Color.ORANGE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    },
    label: {
      text: 'DELIVERY',
      pixelOffset: new Cesium.Cartesian2(0, -24),
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 3,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    },
  });
  return routeEntity;
}
function ensureStyles(documentRef) {
  if (documentRef.getElementById('leeway-transit-world-styles')) return;
  const style = documentRef.createElement('style');
  style.id = 'leeway-transit-world-styles';
  style.textContent = `
    #leeway-transit-world {
      position: fixed; top: 72px; right: 18px; z-index: 9500;
      width: min(410px, calc(100vw - 36px)); max-height: calc(100vh - 96px);
      overflow: auto; border: 1px solid rgba(80,220,255,.45);
      background: rgba(3,12,20,.90); backdrop-filter: blur(14px);
      box-shadow: 0 18px 65px rgba(0,0,0,.48); color: #eaffff;
      font: 16px/1.5 Inter, ui-sans-serif, system-ui, sans-serif;
      border-radius:24px;
    }
    #leeway-transit-world * { box-sizing: border-box; }
    .ltw-head { padding: 18px; border-bottom: 1px solid rgba(80,220,255,.25); display:grid; grid-template-columns:1fr auto; gap:10px; align-items:start; }
    .ltw-heading-copy { min-width:0; }
    .ltw-kicker { letter-spacing: .12em; font-size: 13px; color:#8deef8; }
    .ltw-title { font-size: 24px; line-height:1.15; font-weight: 850; margin-top: 5px; }
    .ltw-close { width:48px; height:48px; border:1px solid rgba(130,235,247,.38); border-radius:18px; background:linear-gradient(150deg,#294a58,#0b202b); color:#fff; font:700 25px/1 system-ui,sans-serif; cursor:pointer; box-shadow:inset 0 1px 0 #fff3,0 4px 0 #020a0f; }
    .ltw-badges { display:flex; gap:6px; flex-wrap:wrap; margin-top:9px; }
    .ltw-badge { border:1px solid rgba(151,235,244,.3); padding:6px 10px; border-radius:999px; font-size:13px; background:#8feefa0d; }
    .ltw-section { margin:12px; padding:16px; border:1px solid rgba(133,224,236,.18); border-radius:20px; background:linear-gradient(145deg,rgba(40,79,92,.38),rgba(4,17,26,.72)); box-shadow:inset 0 1px 0 #fff1,0 7px 18px #0005; }
    .ltw-section h3 { margin:0 0 12px; font-size:16px; letter-spacing:.06em; color:#a6f4fb; }
    .ltw-grid { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
    .ltw-grid > div { min-width:0; padding:11px; border-radius:15px; background:rgba(1,12,19,.48); border:1px solid rgba(137,227,239,.12); }
    .ltw-label { color:#a8ced5; font-size:13px; text-transform:uppercase; letter-spacing:.04em; }
    .ltw-value { margin-top:4px; font-size:16px; color:#f3feff; overflow-wrap:anywhere; }
    .ltw-route { font-size:17px; line-height:1.45; padding:13px; border-radius:16px; border:1px solid rgba(80,220,255,.25); background:rgba(80,220,255,.08); }
    .ltw-actions { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
    .ltw-actions button { min-height:48px; padding:10px; border:1px solid rgba(80,220,255,.35); border-radius:17px; background:linear-gradient(150deg,#274a59,#0b2330); box-shadow:inset 0 1px 0 #fff3,0 4px 0 #020a0f; color:inherit; cursor:pointer; font:700 15px/1.25 system-ui,sans-serif; }
    .ltw-actions button:hover { background:rgba(80,220,255,.16); }
    .ltw-status-unverified { color:#ffd877; }
    .ltw-status-blocked { color:#ff7a7a; }
    .ltw-status-clear { color:#86ffa8; }
    @media (max-width:720px) { #leeway-transit-world { top:auto; bottom:12px; right:12px; width:calc(100vw - 24px); max-height:48vh; } }
  `;
  documentRef.head.appendChild(style);
}
function buildPanel(documentRef, { edition = 'business' } = {}) {
  ensureStyles(documentRef);
  const isBusiness = edition !== 'personal';
  const root = documentRef.createElement('aside');
  root.id = 'leeway-transit-world';
  root.dataset.edition = isBusiness ? 'business' : 'personal';
  root.innerHTML = isBusiness
    ? `
    <div class="ltw-head">
      <div class="ltw-heading-copy"><div class="ltw-kicker">LEEWAY LOGISTICS · OPERATIONS</div>
        <div class="ltw-title">Driver & Load Cockpit</div>
        <div class="ltw-badges"><span class="ltw-badge" data-field="mode">LOADING</span><span class="ltw-badge" data-field="vehicle">VEHICLE</span><span class="ltw-badge" data-field="route-safety">UNVERIFIED</span><span class="ltw-badge" data-field="data-source">CONNECTING</span></div>
      </div><button class="ltw-close" type="button" data-action="close" aria-label="Close operations">×</button>
    </div>
    <section class="ltw-section">
      <h3>ACTIVE LOAD / CONTRACT</h3>
      <div class="ltw-grid">
        <div><div class="ltw-label">Load</div><div class="ltw-value" data-field="load"></div></div>
        <div><div class="ltw-label">Rate</div><div class="ltw-value" data-field="rate"></div></div>
        <div><div class="ltw-label">Broker</div><div class="ltw-value" data-field="broker"></div></div>
        <div><div class="ltw-label">Weight</div><div class="ltw-value" data-field="weight"></div></div>
      </div>
    </section>
    <section class="ltw-section">
      <h3>ROUTE</h3>
      <div class="ltw-route"><span data-field="pickup"></span> → <span data-field="delivery"></span></div>
      <div class="ltw-grid" style="margin-top:8px">
        <div><div class="ltw-label">Road distance</div><div class="ltw-value" data-field="distance"></div></div>
        <div><div class="ltw-label">Base ETA</div><div class="ltw-value" data-field="eta"></div></div>
        <div><div class="ltw-label">Visual route</div><div class="ltw-value" data-field="visual-authority"></div></div>
        <div><div class="ltw-label">Truck gate</div><div class="ltw-value" data-field="truck-gate"></div></div>
      </div>
    </section>
    <section class="ltw-section">
      <h3>DRIVER READINESS</h3>
      <div class="ltw-grid">
        <div><div class="ltw-label">Drive remaining</div><div class="ltw-value" data-field="drive"></div></div>
        <div><div class="ltw-label">Shift remaining</div><div class="ltw-value" data-field="shift"></div></div>
        <div><div class="ltw-label">Next break</div><div class="ltw-value" data-field="break"></div></div>
        <div><div class="ltw-label">Equipment</div><div class="ltw-value" data-field="equipment"></div></div>
      </div>
    </section>
    <section class="ltw-section">
      <h3>WORLD AWARENESS</h3>
      <div class="ltw-badges">
        <span class="ltw-badge">3D TERRAIN</span><span class="ltw-badge">BUILDINGS</span>
        <span class="ltw-badge">TRAFFIC</span><span class="ltw-badge">WEATHER</span>
        <span class="ltw-badge">CCTV</span><span class="ltw-badge">PUBLIC TRANSIT</span>
      </div>
      <div class="ltw-value" style="margin-top:8px" data-field="world-status">Layers available; operator activation governed.</div>
    </section>
    <section class="ltw-section">
      <h3>DISPATCH / CRM</h3>
      <div class="ltw-grid">
        <div><div class="ltw-label">Customer</div><div class="ltw-value" data-field="customer"></div></div>
        <div><div class="ltw-label">Dispatcher</div><div class="ltw-value" data-field="dispatcher"></div></div>
        <div><div class="ltw-label">BOL</div><div class="ltw-value" data-field="bol"></div></div>
        <div><div class="ltw-label">DVIR</div><div class="ltw-value" data-field="dvir"></div></div>
      </div>
    </section>
    <section class="ltw-section">
      <h3>LEEWAY PRODUCT LINEAGE</h3>
      <div class="ltw-value">LeeWay Logistics · Transit World</div>
      <div class="ltw-label" style="margin-top:6px">Spatial engine lineage</div>
      <div class="ltw-value" style="opacity:.68">Built in part from MIT-licensed God's Eye View spatial work by Bilawal Sidhu. LeeWay product identity, workflows, governance, CRM, Transit Hub, Driver Cockpit, and Agent Lee are LeeWay-owned layers.</div>
    </section>
    <section class="ltw-section">
      <div class="ltw-actions">
        <button type="button" data-action="driver-view">DRIVER VIEW</button>
        <button type="button" data-action="route-view">SHOW ACTIVE LOAD ROUTE</button>
        <button type="button" data-action="world-awareness">WORLD AWARENESS</button>
        <button type="button" data-action="refresh">REFRESH</button>
      </div>
    </section>
  `
    : `
    <div class="ltw-head">
      <div class="ltw-heading-copy"><div class="ltw-kicker">LEEWAY MAPS · TRIP OPERATIONS</div><div class="ltw-title">Travel Cockpit</div>
        <div class="ltw-badges"><span class="ltw-badge" data-field="mode">PERSONAL</span><span class="ltw-badge">MAP READY</span><span class="ltw-badge">OFFLINE TRIP CACHE</span></div>
      </div><button class="ltw-close" type="button" data-action="close" aria-label="Close trip operations">×</button>
    </div>
    <section class="ltw-section"><h3>ACTIVE TRIP</h3><div class="ltw-route">Enter real street addresses in Directions to begin a trip. Your active route remains visible when the network drops after it has been saved.</div></section>
    <section class="ltw-section"><h3>ROAD AWARENESS</h3><div class="ltw-grid"><div><div class="ltw-label">Traffic</div><div class="ltw-value">Official incidents · coverage limited</div></div><div><div class="ltw-label">Weather</div><div class="ltw-value">Radar · clouds · lightning</div></div><div><div class="ltw-label">Cameras</div><div class="ltw-value">Public feeds · source labeled</div></div><div><div class="ltw-label">Flights</div><div class="ltw-value">Tail · origin · destination</div></div></div></section>
    <section class="ltw-section"><h3>PRIVACY</h3><div class="ltw-value">Business loads, fleet, employees, CRM, and dispatch records are excluded from LeeWay Maps Personal.</div></section>
    <section class="ltw-section"><div class="ltw-actions"><button type="button" data-action="world-awareness">TURN ON ROAD AWARENESS</button><button type="button" data-action="refresh">REFRESH MAP STATUS</button></div></section>
  `;
  documentRef.body.appendChild(root);
  return root;
}
export async function mountLeeWayTransitWorld(
  application,
  { edition = document.body?.dataset?.leewayEdition || 'business' } = {},
) {
  if (document.getElementById('leeway-transit-world')) return null;
  const components = application.getComponents();
  const viewer = components.scene?.viewer;
  const dataManager = components.data?.dataManager;
  if (!viewer || !dataManager)
    throw new Error('LeeWay Transit World requires scene and data manager');

  const isBusiness = edition !== 'personal';
  const root = buildPanel(document, { edition });
  let cockpit;
  let fleet;
  let routeEntity;

  async function refresh({ showRoute = false } = {}) {
    if (!isBusiness) {
      setText(
        root,
        'mode',
        navigator.onLine ? 'PERSONAL · ONLINE' : 'PERSONAL · OFFLINE',
      );
      return { cockpit: null, fleet: null, routePayload: null, safety: null };
    }
    const [cockpitResult, fleetResult] = await Promise.allSettled([
      fetchJson('/api/leeway-transit/driver-cockpit'),
      fetchJson('/api/leeway-transit/vehicles'),
    ]);
    cockpit = operationalCockpit(cockpitResult.status === 'fulfilled' ? cockpitResult.value : null);
    fleet = operationalFleet(fleetResult.status === 'fulfilled' ? fleetResult.value : null);
    const safety = summarizeTruckRouteSafety(cockpit.truckProfile, []);
    const routeUrl = routeRequestUrl(cockpit.route);
    const routePayload = !showRoute
      ? null
      : routeUrl
          ? await fetchJson(routeUrl)
          : null;
    if (showRoute) routeEntity = renderRoute(viewer, routePayload, cockpit);

    setText(root, 'mode', cockpit.mode);
    setText(root, 'data-source', cockpit.mode === 'NOT CONNECTED' ? 'OPERATIONS NOT CONNECTED' : 'LIVE HUB');
    setText(
      root,
      'vehicle',
      cockpit.vehicle?.fleetNumber || cockpit.driver?.vehicleFleetNumber,
    );
    setText(root, 'load', cockpit.activeLoad?.loadNumber);
    setText(root, 'rate', money(cockpit.activeLoad?.rateUsd));
    setText(root, 'broker', cockpit.activeLoad?.brokerName);
    setText(root, 'weight', `${cockpit.activeLoad?.weightLbs || '—'} lb`);
    setText(root, 'pickup', cockpit.activeLoad?.pickup?.name);
    setText(root, 'delivery', cockpit.activeLoad?.delivery?.name);
    setText(
      root,
      'distance',
      routePayload?.ok && Number.isFinite(routePayload.distanceM)
        ? `${(routePayload.distanceM / 1609.344).toFixed(1)} mi`
        : 'UNAVAILABLE',
    );
    setText(
      root,
      'eta',
      routePayload?.ok && Number.isFinite(routePayload.durationS)
        ? minutesLabel(routePayload.durationS / 60)
        : 'UNAVAILABLE',
    );
    setText(root, 'visual-authority', cockpit.route?.visualAuthority);
    setText(root, 'truck-gate', safety.status);
    setText(root, 'route-safety', safety.status);
    const safetyBadge = root.querySelector('[data-field="route-safety"]');
    safetyBadge?.classList.toggle(
      'ltw-status-blocked',
      safety.status === 'BLOCKED',
    );
    safetyBadge?.classList.toggle(
      'ltw-status-clear',
      safety.status === 'NO_CONFLICT_FOUND',
    );
    safetyBadge?.classList.toggle(
      'ltw-status-unverified',
      safety.status === 'UNVERIFIED',
    );
    setText(root, 'drive', minutesLabel(cockpit.hos?.driveRemainingMinutes));
    setText(root, 'shift', minutesLabel(cockpit.hos?.shiftRemainingMinutes));
    setText(root, 'break', minutesLabel(cockpit.hos?.nextBreakDueMinutes));
    setText(root, 'equipment', cockpit.truckProfile?.equipmentType);
    setText(root, 'customer', cockpit.crm?.customer);
    setText(root, 'dispatcher', cockpit.crm?.dispatcher);
    setText(root, 'bol', cockpit.documents?.bol);
    setText(root, 'dvir', cockpit.documents?.dvir);
    return { cockpit, fleet, routePayload, safety };
  }

  root.addEventListener('click', async (event) => {
    const action = event.target?.closest?.('[data-action]')?.dataset?.action;
    if (!action) return;
    if (action === 'close') {
      root.dispatchEvent(
        new CustomEvent('leeway:right-panel-close', { bubbles: true }),
      );
      return;
    }
    if (action === 'refresh') {
      await refresh();
      return;
    }
    if (action === 'world-awareness') {
      const results = [];
      for (const id of WORLD_LAYER_IDS) {
        try {
          await dataManager.setEnabled(id, true, { origin: 'tool' });
          results.push(id);
        } catch {}
      }
      setText(
        root,
        'world-status',
        `Requested: ${results.join(', ') || 'no layers'}`,
      );
      return;
    }
    if (action === 'route-view') {
      if (!isBusiness) return;
      if (!routeEntity) await refresh({ showRoute: true });
      if (!routeEntity) return;
      await viewer.flyTo(routeEntity, { duration: 1.8 });
      return;
    }
    if (action === 'driver-view') {
      if (!isBusiness) return;
      const vehicle = fleet?.vehicles?.find(
        (row) =>
          row?.leewayVehicle?.fleetNumber ===
          cockpit?.driver?.vehicleFleetNumber,
      );
      if (!vehicle) return;
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          vehicle.lon,
          vehicle.lat,
          1150,
        ),
        orientation: {
          heading: Cesium.Math.toRadians(Number(vehicle.bearing) || 0),
          pitch: Cesium.Math.toRadians(-38),
          roll: 0,
        },
        duration: 1.6,
      });
    }
  });

  await refresh();
  return {
    root,
    refresh,
    destroy() {
      removeEntity(viewer, 'leeway-active-load-route');
      removeEntity(viewer, 'leeway-active-load-pickup');
      removeEntity(viewer, 'leeway-active-load-delivery');
      root.remove();
    },
  };
}
