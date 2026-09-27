import * as Cesium from 'cesium';
import { summarizeTruckRouteSafety } from './truckRoutePolicy.js';

const WORLD_LAYER_IDS = Object.freeze([
  'transit',
  'traffic',
  'weather-radar',
  'weather-satellite',
  'weather-lightning',
  'cctv',
]);

function minutesLabel(value) {
  const minutes = Math.max(0, Number(value) || 0);
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
  if (node) node.textContent = value == null || value === '' ? '—' : String(value);
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
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
  if (!payload?.ok || !Array.isArray(payload.geometry) || payload.geometry.length < 2) {
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
      font: 12px/1.35 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }
    #leeway-transit-world * { box-sizing: border-box; }
    .ltw-head { padding: 14px 16px; border-bottom: 1px solid rgba(80,220,255,.25); }
    .ltw-kicker { letter-spacing: .18em; font-size: 10px; opacity: .72; }
    .ltw-title { font-size: 17px; font-weight: 800; margin-top: 3px; }
    .ltw-badges { display:flex; gap:6px; flex-wrap:wrap; margin-top:9px; }
    .ltw-badge { border:1px solid rgba(255,255,255,.2); padding:3px 6px; border-radius:999px; font-size:10px; }
    .ltw-section { padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.08); }
    .ltw-section h3 { margin:0 0 8px; font-size:11px; letter-spacing:.12em; opacity:.72; }
    .ltw-grid { display:grid; grid-template-columns: 1fr 1fr; gap:8px 12px; }
    .ltw-label { opacity:.58; font-size:9px; text-transform:uppercase; letter-spacing:.08em; }
    .ltw-value { margin-top:2px; overflow-wrap:anywhere; }
    .ltw-route { font-size:11px; padding:8px; border:1px solid rgba(80,220,255,.2); background:rgba(80,220,255,.05); }
    .ltw-actions { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
    .ltw-actions button { padding:8px; border:1px solid rgba(80,220,255,.35); background:rgba(80,220,255,.08); color:inherit; cursor:pointer; font:inherit; }
    .ltw-actions button:hover { background:rgba(80,220,255,.16); }
    .ltw-status-unverified { color:#ffd877; }
    .ltw-status-blocked { color:#ff7a7a; }
    .ltw-status-clear { color:#86ffa8; }
    @media (max-width:720px) { #leeway-transit-world { top:auto; bottom:12px; right:12px; width:calc(100vw - 24px); max-height:48vh; } }
  `;
  documentRef.head.appendChild(style);
}
function buildPanel(documentRef) {
  ensureStyles(documentRef);
  const root = documentRef.createElement('aside');
  root.id = 'leeway-transit-world';
  root.innerHTML = `
    <div class="ltw-head">
      <div class="ltw-kicker">LEEWAY SPATIAL FABRIC · TRANSPORT</div>
      <div class="ltw-title">Transit World · Driver Cockpit</div>
      <div class="ltw-badges">
        <span class="ltw-badge" data-field="mode">LOADING</span>
        <span class="ltw-badge" data-field="vehicle">VEHICLE</span>
        <span class="ltw-badge" data-field="route-safety">UNVERIFIED</span>
      </div>
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
      <div class="ltw-actions">
        <button type="button" data-action="driver-view">DRIVER VIEW</button>
        <button type="button" data-action="route-view">ROUTE VIEW</button>
        <button type="button" data-action="world-awareness">WORLD AWARENESS</button>
        <button type="button" data-action="refresh">REFRESH</button>
      </div>
    </section>
  `;
  documentRef.body.appendChild(root);
  return root;
}
export async function mountLeeWayTransitWorld(application) {
  if (document.getElementById('leeway-transit-world')) return null;
  const components = application.getComponents();
  const viewer = components.scene?.viewer;
  const dataManager = components.data?.dataManager;
  if (!viewer || !dataManager) throw new Error('LeeWay Transit World requires scene and data manager');

  const root = buildPanel(document);
  let cockpit;
  let fleet;
  let routeEntity;

  async function refresh() {
    [cockpit, fleet] = await Promise.all([
      fetchJson('/api/leeway-transit/driver-cockpit'),
      fetchJson('/api/leeway-transit/vehicles'),
    ]);
    const safety = summarizeTruckRouteSafety(cockpit.truckProfile, []);
    const routeUrl = routeRequestUrl(cockpit.route);
    const routePayload = routeUrl ? await fetchJson(routeUrl) : null;
    routeEntity = renderRoute(viewer, routePayload, cockpit);

    setText(root, 'mode', cockpit.mode);
    setText(root, 'vehicle', cockpit.vehicle?.fleetNumber || cockpit.driver?.vehicleFleetNumber);
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
    safetyBadge?.classList.toggle('ltw-status-blocked', safety.status === 'BLOCKED');
    safetyBadge?.classList.toggle('ltw-status-clear', safety.status === 'NO_CONFLICT_FOUND');
    safetyBadge?.classList.toggle('ltw-status-unverified', safety.status === 'UNVERIFIED');
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
      setText(root, 'world-status', `Requested: ${results.join(', ') || 'no layers'}`);
      return;
    }
    if (action === 'route-view' && routeEntity) {
      await viewer.flyTo(routeEntity, { duration: 1.8 });
      return;
    }
    if (action === 'driver-view') {
      const vehicle = fleet?.vehicles?.find(
        (row) => row?.leewayVehicle?.fleetNumber === cockpit?.driver?.vehicleFleetNumber,
      );
      if (!vehicle) return;
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(vehicle.lon, vehicle.lat, 1150),
        orientation: {
          heading: Cesium.Math.toRadians(Number(vehicle.bearing) || 0),
          pitch: Cesium.Math.toRadians(-38),
          roll: 0,
        },
        duration: 1.6,
      });
    }
  });

  await dataManager.setEnabled('transit', true, { origin: 'tool' });
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
