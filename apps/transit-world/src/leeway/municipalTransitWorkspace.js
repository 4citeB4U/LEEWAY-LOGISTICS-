/*
REGION: LeeWay Logistics / Municipal Transit
TAG: LEEWAY.LOGISTICS.MUNICIPAL_TRANSIT.WORKSPACE
5WH:
WHAT = Municipal/county transit operating workspace embedded in the business map.
WHY = County and city transit customers need planning, CAD/AVL, rider, ADA/paratransit, fare/APC, maintenance, safety and reporting surfaces beside the live map.
WHO = LeeWay Industries under Creator authority.
WHERE = apps/transit-world/src/leeway/municipalTransitWorkspace.js
WHEN = Business operator opens Transit or a municipal capability.
HOW = Local-first CRUD plus live transit-layer telemetry; later agency connectors can replace local persistence without replacing the map UI.
LICENSE = MIT, matching this repository.
*/

import {
  addMunicipalTransitRecord,
  loadMunicipalTransitState,
  saveMunicipalTransitState,
  summarizeMunicipalTransitState,
} from './municipalTransitStore.js';

const TABS = Object.freeze([
  ['planning', 'Service Planning'],
  ['cadavl', 'CAD / AVL'],
  ['rider', 'Rider + GTFS'],
  ['paratransit', 'ADA / Paratransit'],
  ['fare', 'Fare + APC'],
  ['maintenance', 'Maintenance + Safety'],
  ['reports', 'Reports'],
]);

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function options(values) {
  return values.map((value) => `<option value="${value}">${value}</option>`).join('');
}

export function municipalTransitTabForDomain(id = '') {
  return (
    {
      'municipal-service-planning': 'planning',
      'municipal-cadavl': 'cadavl',
      'municipal-rider-info': 'rider',
      'municipal-ada-demand': 'paratransit',
      'municipal-fare-apc': 'fare',
      'municipal-maintenance-safety': 'maintenance',
      analytics: 'reports',
    }[id] || 'cadavl'
  );
}

export function mountMunicipalTransitWorkspace({
  dataManager,
  storage = globalThis.localStorage,
  documentRef = globalThis.document,
  notify = () => {},
} = {}) {
  let state = loadMunicipalTransitState(storage);
  let activeTab = 'cadavl';
  const root = documentRef.createElement('section');
  root.id = 'leeway-municipal-transit';
  root.hidden = true;
  root.innerHTML = `
    <header class="lmt-head">
      <div><small>LEEWAY LOGISTICS · COUNTY / MUNICIPAL TRANSIT</small><h2>Transit Operations Center</h2><p>Fixed route · CAD/AVL · rider information · ADA/paratransit · fares/APC · maintenance · safety · reports</p></div>
      <button type="button" data-close aria-label="Close municipal transit">×</button>
    </header>
    <nav class="lmt-tabs">${TABS.map(([id,label])=>`<button type="button" data-tab="${id}">${label}</button>`).join('')}</nav>
    <main data-content></main>
  `;
  documentRef.body.append(root);

  const style = documentRef.createElement('style');
  style.dataset.leewayMunicipalTransit = '1';
  style.textContent = `
    #leeway-municipal-transit{position:fixed;inset:70px 16px 16px 92px;z-index:10035;background:rgba(3,13,21,.98);color:#effdff;border:1px solid rgba(67,226,244,.34);border-radius:22px;box-shadow:0 28px 90px rgba(0,0,0,.62);overflow:hidden;font:14px/1.45 Inter,ui-sans-serif,system-ui,sans-serif}
    #leeway-municipal-transit[hidden]{display:none!important}.lmt-head{display:flex;justify-content:space-between;gap:18px;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.08)}.lmt-head small{color:#73eff9;letter-spacing:.12em;font-weight:800}.lmt-head h2{margin:4px 0 3px;font-size:24px}.lmt-head p{margin:0;color:#a8c4cc}.lmt-head button{width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:#0b2330;color:#fff;font-size:22px;cursor:pointer}
    .lmt-tabs{display:flex;gap:6px;overflow:auto;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.06)}.lmt-tabs button{white-space:nowrap;border:1px solid rgba(74,220,239,.18);border-radius:10px;background:#081c27;color:#dffaff;padding:9px 11px;cursor:pointer}.lmt-tabs button.active{background:#38dcec;color:#04202a;font-weight:800}
    #leeway-municipal-transit main{height:calc(100% - 140px);overflow:auto;padding:16px}.lmt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}.lmt-card{border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:14px;background:rgba(10,28,39,.72)}.lmt-card h3{margin:0 0 8px}.lmt-metric{font-size:28px;font-weight:850;color:#77eff9}.lmt-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.lmt-form label{display:grid;gap:4px;color:#abc4cc;font-size:11px}.lmt-form input,.lmt-form select,.lmt-form textarea{width:100%;box-sizing:border-box;border-radius:9px;border:1px solid rgba(91,219,238,.24);background:#061620;color:#fff;padding:9px;font:inherit}.lmt-form textarea{min-height:70px}.lmt-form button,.lmt-action{border:1px solid rgba(79,230,248,.3);border-radius:10px;background:#0b2b38;color:#ecffff;padding:9px 11px;cursor:pointer}.lmt-form button{grid-column:1/-1}.lmt-list{display:grid;gap:7px;margin-top:10px}.lmt-row{padding:9px;border-radius:10px;background:rgba(255,255,255,.04);display:flex;justify-content:space-between;gap:10px}.lmt-note{color:#a9c3cb;font-size:12px}.lmt-wide{grid-column:1/-1}@media(max-width:720px){#leeway-municipal-transit{inset:62px 8px 8px}.lmt-form{grid-template-columns:1fr}.lmt-head h2{font-size:20px}}
  `;
  documentRef.head.append(style);

  const content = root.querySelector('[data-content]');

  function persist() {
    try {
      state = saveMunicipalTransitState(state, storage);
      return true;
    } catch {
      notify('Municipal transit changes are in memory only on this device');
      return false;
    }
  }

  function add(collection, record) {
    state = addMunicipalTransitRecord(state, collection, record);
    persist();
    render();
  }

  function liveTransitState() {
    const layer = dataManager?.layers?.get?.('transit')?.module;
    const ui = layer?.getUIState?.() || null;
    return {
      enabled: Boolean(dataManager?.isEnabled?.('transit')),
      count: Number(ui?.totalCount ?? ui?.count ?? 0),
      visible: Number(ui?.count ?? 0),
      loading: Boolean(ui?.loading?.active),
      error: ui?.error || null,
    };
  }

  async function enableLiveTransit() {
    for (const id of ['transit','transit-routes','transit-stops','transit-vehicles']) {
      if (!dataManager?.layers?.has?.(id)) continue;
      if (!dataManager.isEnabled?.(id))
        await dataManager.setEnabled(id, true, { origin: 'user' });
    }
    notify('Live transit route, stop and vehicle layers requested');
    render();
  }

  function summaryCards() {
    const s = summarizeMunicipalTransitState(state);
    return `<div class="lmt-grid">
      <section class="lmt-card"><h3>Routes</h3><div class="lmt-metric">${s.routeCount}</div></section>
      <section class="lmt-card"><h3>Stops</h3><div class="lmt-metric">${s.stopCount}</div></section>
      <section class="lmt-card"><h3>Paratransit trips</h3><div class="lmt-metric">${s.paratransitTripCount}</div></section>
      <section class="lmt-card"><h3>Active alerts</h3><div class="lmt-metric">${s.alertCount}</div></section>
      <section class="lmt-card"><h3>APC boardings</h3><div class="lmt-metric">${s.passengerBoardings}</div></section>
      <section class="lmt-card"><h3>Open work orders</h3><div class="lmt-metric">${s.openWorkOrders}</div></section>
    </div>`;
  }

  function rows(collection, formatter) {
    const values = state[collection] || [];
    if (!values.length) return '<p class="lmt-note">No records yet.</p>';
    return `<div class="lmt-list">${values.slice().reverse().map((row)=>`<div class="lmt-row">${formatter(row)}</div>`).join('')}</div>`;
  }

  function planning() {
    return `<div class="lmt-grid">
      <section class="lmt-card"><h3>Add route / pattern</h3><form class="lmt-form" data-form="route">
        <label>Route ID<input name="code" required></label><label>Name<input name="name" required></label>
        <label>Pattern<select name="pattern">${options(['LOCAL','EXPRESS','LIMITED','CIRCULATOR','SHUTTLE','SEASONAL','EVENT'])}</select></label>
        <label>Status<select name="status">${options(['ACTIVE','DRAFT','DETOUR','SUSPENDED'])}</select></label>
        <button>Add route</button></form></section>
      <section class="lmt-card"><h3>Add stop</h3><form class="lmt-form" data-form="stop">
        <label>Stop code<input name="code" required></label><label>Name<input name="name" required></label>
        <label>Accessible<select name="accessible">${options(['YES','NO','UNKNOWN'])}</select></label>
        <label>Amenities<input name="amenities" placeholder="Shelter, bench, lighting"></label>
        <button>Add stop</button></form></section>
      <section class="lmt-card lmt-wide"><h3>Routes</h3>${rows('routes',(r)=>`<span><strong>${esc(r.code)}</strong> · ${esc(r.name)}</span><span>${esc(r.pattern)} · ${esc(r.status)}</span>`)}</section>
      <section class="lmt-card lmt-wide"><h3>Stops</h3>${rows('stops',(r)=>`<span><strong>${esc(r.code)}</strong> · ${esc(r.name)}</span><span>ADA ${esc(r.accessible)}</span>`)}</section>
      <section class="lmt-card lmt-wide"><h3>Planning coverage</h3><p class="lmt-note">Service calendars, timepoints, headways, transfers, layovers, deadheads, blocks, runs, rosters, operator bids, spare buses, EV range assignment, scenarios, stop spacing, ridership, Title VI/equity, ADA access and board/public-change tracking are governed through this planning domain and can be bound to an agency scheduler without replacing the map.</p></section>
    </div>`;
  }

  function cadavl() {
    const live = liveTransitState();
    return `<div class="lmt-grid">
      <section class="lmt-card"><h3>Live transit layer</h3><div class="lmt-metric">${live.enabled ? 'ON' : 'OFF'}</div><p class="lmt-note">${live.count} loaded · ${live.visible} in current scope${live.error ? ` · ${esc(live.error)}` : ''}</p><button class="lmt-action" data-enable-live>Enable route + stop + vehicle layers</button></section>
      <section class="lmt-card"><h3>CAD/AVL operating model</h3><p class="lmt-note">Vehicle location, breadcrumbs, assignment, schedule/headway adherence, early/late/missed/cancelled trips, bunching/gap detection, ETA, detours, disruption recovery, swaps, short turns, transfer holds, operator messaging, acknowledgements, supervisor tracking, panic/radio/cellular/tablet integrations and the operations audit trail bind here.</p></section>
      <section class="lmt-card lmt-wide"><h3>Assignment record</h3><form class="lmt-form" data-form="vehicleAssignment"><label>Vehicle<input name="vehicle" required></label><label>Route / trip / block<input name="service" required></label><label>Operator<input name="operator"></label><label>Status<select name="status">${options(['ASSIGNED','IN_SERVICE','LATE','HOLD','OUT_OF_SERVICE'])}</select></label><button>Save assignment</button></form>
      ${rows('vehicleAssignments',(r)=>`<span><strong>${esc(r.vehicle)}</strong> · ${esc(r.service)}</span><span>${esc(r.operator)} · ${esc(r.status)}</span>`)}</section>
    </div>`;
  }

  function rider() {
    return `<div class="lmt-grid">
      <section class="lmt-card"><h3>Publish service alert</h3><form class="lmt-form" data-form="alert"><label>Route / area<input name="scope" required></label><label>Type<select name="kind">${options(['DELAY','DETOUR','STOP_CLOSED','CANCELLED','WEATHER','HOLIDAY','GENERAL'])}</select></label><label class="lmt-wide">Message<textarea name="message" required></textarea></label><button>Save alert</button></form></section>
      <section class="lmt-card"><h3>Rider information stack</h3><p class="lmt-note">Live bus map, predictions, trip planning, transfers, walking directions, accessibility, service alerts, subscriptions, digital signs/kiosks, GTFS schedule publishing, GTFS-Realtime vehicle/trip/alert feeds, feed validation, open data and third-party planners all terminate at this rider surface.</p></section>
      <section class="lmt-card lmt-wide"><h3>Service alerts</h3>${rows('serviceAlerts',(r)=>`<span><strong>${esc(r.kind)}</strong> · ${esc(r.scope)}</span><span>${esc(r.message)}</span>`)}</section>
    </div>`;
  }

  function paratransit() {
    return `<div class="lmt-grid">
      <section class="lmt-card lmt-wide"><h3>Book ADA / demand-response trip</h3><form class="lmt-form" data-form="paratransit">
        <label>Rider / case<input name="rider" required></label><label>Eligibility<select name="eligibility">${options(['VERIFIED','PENDING','CONDITIONAL'])}</select></label>
        <label>Pickup<input name="pickup" required></label><label>Drop-off<input name="dropoff" required></label>
        <label>Pickup window<input name="window" placeholder="09:00–09:30"></label><label>Mobility / PCA / companion<input name="accommodation"></label>
        <label>Trip type<select name="kind">${options(['ADA','MICROTRANSIT','MEDICAL','DIALYSIS','EMPLOYMENT','SCHOOL','GROUP'])}</select></label><label>Status<select name="status">${options(['BOOKED','DISPATCHED','ARRIVING','COMPLETE','NO_SHOW','CANCELLED'])}</select></label>
        <button>Book trip</button></form></section>
      <section class="lmt-card lmt-wide"><h3>Trips</h3>${rows('paratransitTrips',(r)=>`<span><strong>${esc(r.rider)}</strong> · ${esc(r.pickup)} → ${esc(r.dropoff)}</span><span>${esc(r.kind)} · ${esc(r.status)}</span>`)}</section>
      <section class="lmt-card lmt-wide"><p class="lmt-note">Eligibility, renewals, accommodations, PCA/companions, door/curb service, reminders, subscriptions, will-call returns, pooling, closest-vehicle assignment, manifests, no-shows, unmet trips, contractor/NEMT connections, fare billing, service zones/hours, virtual stops and first/last-mile feeders share this domain.</p></section>
    </div>`;
  }

  function fare() {
    return `<div class="lmt-grid">
      <section class="lmt-card"><h3>Fare product</h3><form class="lmt-form" data-form="fare"><label>Name<input name="name" required></label><label>Price<input name="price" type="number" min="0" step=".01"></label><label>Media<select name="media">${options(['CASH','PAPER','SMART_CARD','CONTACTLESS','MOBILE','QR','ACCOUNT_BASED'])}</select></label><label>Class<select name="fareClass">${options(['FULL','REDUCED','SENIOR','DISABILITY','STUDENT','DAY','WEEK','MONTH'])}</select></label><button>Add fare product</button></form></section>
      <section class="lmt-card"><h3>APC count</h3><form class="lmt-form" data-form="apc"><label>Route / trip<input name="service" required></label><label>Stop<input name="stop"></label><label>Boardings<input name="boardings" type="number" min="0" value="0"></label><label>Alightings<input name="alightings" type="number" min="0" value="0"></label><button>Record count</button></form></section>
      <section class="lmt-card lmt-wide"><h3>Fare products</h3>${rows('fareProducts',(r)=>`<span><strong>${esc(r.name)}</strong> · ${esc(r.media)}</span><span>$${Number(r.price||0).toFixed(2)} · ${esc(r.fareClass)}</span>`)}</section>
      <section class="lmt-card lmt-wide"><h3>APC entries</h3>${rows('apcCounts',(r)=>`<span><strong>${esc(r.service)}</strong> · ${esc(r.stop)}</span><span>+${Number(r.boardings)||0} / −${Number(r.alightings)||0}</span>`)}</section>
      <section class="lmt-card lmt-wide"><p class="lmt-note">Fare capping, transfers, zones/distance fares, mobile wallets, stored value, auto reload, pass sales, proof-of-payment, fare inspection/evasion, cash vault reconciliation, institutional programs, paratransit billing, APC calibration/device health and NTD reconciliation bind here.</p></section>
    </div>`;
  }

  function maintenance() {
    return `<div class="lmt-grid">
      <section class="lmt-card"><h3>Work order</h3><form class="lmt-form" data-form="workOrder"><label>Vehicle / asset<input name="asset" required></label><label>Priority<select name="priority">${options(['LOW','NORMAL','HIGH','OUT_OF_SERVICE'])}</select></label><label class="lmt-wide">Issue<textarea name="issue" required></textarea></label><label>Status<select name="status">${options(['OPEN','ASSIGNED','IN_PROGRESS','COMPLETE'])}</select></label><button>Create work order</button></form></section>
      <section class="lmt-card"><h3>Safety / security incident</h3><form class="lmt-form" data-form="incident"><label>Vehicle / route<input name="scope"></label><label>Severity<select name="severity">${options(['LOW','MODERATE','HIGH','EMERGENCY'])}</select></label><label class="lmt-wide">Description<textarea name="description" required></textarea></label><button>Record incident</button></form></section>
      <section class="lmt-card lmt-wide"><h3>Work orders</h3>${rows('workOrders',(r)=>`<span><strong>${esc(r.asset)}</strong> · ${esc(r.issue)}</span><span>${esc(r.priority)} · ${esc(r.status)}</span>`)}</section>
      <section class="lmt-card lmt-wide"><h3>Incidents</h3>${rows('incidents',(r)=>`<span><strong>${esc(r.severity)}</strong> · ${esc(r.scope)}</span><span>${esc(r.description)}</span>`)}</section>
      <section class="lmt-card lmt-wide"><p class="lmt-note">Preventive maintenance, parts, warranty, road calls, diagnostics, fuel/idle, EV state-of-charge/chargers, lifecycle assets, panic alarms, collision/injury/security workflows, emergency detours, responder coordination, video/event tagging, driver safety and training/certification share this maintenance/safety domain.</p></section>
    </div>`;
  }

  function reports() {
    const s = summarizeMunicipalTransitState(state);
    return `${summaryCards()}<section class="lmt-card" style="margin-top:12px"><h3>Reporting scope</h3><p class="lmt-note">On-time performance, early/late, missed/cancelled/completed trips, headway adherence, bunching, gaps, travel/dwell/layover/recovery, ridership/load/transfers, paratransit productivity and no-shows, fare revenue, fleet availability, fuel/energy/emissions, maintenance reliability, safety/security, complaints, cost per revenue hour/mile, subsidy per trip, route productivity, Title VI/ADA/equity, NTD/FTA, board/public dashboards and scheduled exports bind to the same governed records and live transit feeds.</p><pre>${esc(JSON.stringify(s,null,2))}</pre></section>`;
  }

  function render() {
    root.querySelectorAll('[data-tab]').forEach((button) =>
      button.classList.toggle('active', button.dataset.tab === activeTab),
    );
    content.innerHTML =
      activeTab === 'planning' ? planning() :
      activeTab === 'cadavl' ? cadavl() :
      activeTab === 'rider' ? rider() :
      activeTab === 'paratransit' ? paratransit() :
      activeTab === 'fare' ? fare() :
      activeTab === 'maintenance' ? maintenance() :
      reports();
  }

  root.addEventListener('click', async (event) => {
    if (event.target.closest('[data-close]')) {
      root.hidden = true;
      return;
    }
    const tab = event.target.closest('[data-tab]');
    if (tab) {
      activeTab = tab.dataset.tab;
      render();
      return;
    }
    if (event.target.closest('[data-enable-live]')) {
      await enableLiveTransit();
    }
  });

  root.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    const payload = Object.fromEntries(new FormData(form).entries());
    if (form.dataset.form === 'route') add('routes', payload);
    else if (form.dataset.form === 'stop') add('stops', payload);
    else if (form.dataset.form === 'vehicleAssignment') add('vehicleAssignments', payload);
    else if (form.dataset.form === 'alert') add('serviceAlerts', { ...payload, status: 'ACTIVE' });
    else if (form.dataset.form === 'paratransit') add('paratransitTrips', payload);
    else if (form.dataset.form === 'fare') add('fareProducts', payload);
    else if (form.dataset.form === 'apc') add('apcCounts', payload);
    else if (form.dataset.form === 'workOrder') add('workOrders', payload);
    else if (form.dataset.form === 'incident') add('incidents', payload);
    form.reset();
  });

  render();
  return Object.freeze({
    root,
    open(tab = 'cadavl') {
      activeTab = TABS.some(([id]) => id === tab) ? tab : 'cadavl';
      root.hidden = false;
      render();
    },
    close() {
      root.hidden = true;
    },
    refresh() {
      state = loadMunicipalTransitState(storage);
      render();
    },
    destroy() {
      root.remove();
      style.remove();
    },
  });
}
