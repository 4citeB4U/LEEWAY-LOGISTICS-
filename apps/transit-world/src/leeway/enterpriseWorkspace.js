import { getLanguage, languageOptions } from './experienceLocale.js';
import {
  addAccount,
  addDocumentMetadata,
  addEquipment,
  addPerson,
  advanceOrganizationOnboarding,
  markIntegration,
  readEnterpriseState,
  summarizeEnterpriseState,
  updateOrganization,
} from './enterpriseStore.js';
import {
  ORGANIZATION_ONBOARDING_STEPS,
  onboardingProfile,
} from './onboardingRequirements.js';

const WORKSPACE_TABS = Object.freeze([
  ['overview', 'Command'],
  ['people', 'People'],
  ['equipment', 'Equipment'],
  ['crm', 'Sales & CRM'],
  ['documents', 'Documents'],
  ['integrations', 'Integrations'],
]);

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function statusClass(value) {
  const text = String(value || '').toUpperCase();
  if (
    text.includes('COMPLETE') ||
    text.includes('ACTIVE') ||
    text.includes('CONNECTED')
  )
    return 'good';
  if (
    text.includes('REVIEW') ||
    text.includes('PROGRESS') ||
    text.includes('ONBOARD')
  )
    return 'warn';
  return 'muted';
}

function formatBytes(bytes) {
  const size = Number(bytes);
  if (!Number.isFinite(size) || size <= 0) return '—';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function ensureStyles(documentRef) {
  if (documentRef.getElementById('leeway-enterprise-workspace-styles')) return;
  const style = documentRef.createElement('style');
  style.id = 'leeway-enterprise-workspace-styles';
  style.textContent = `
    #leeway-enterprise-workspace {
      position: fixed; inset: 68px 18px 18px 88px; z-index: 9850;
      display: none; background: rgba(4,13,21,.97); color:#eafcff;
      border:1px solid rgba(75,216,244,.34); border-radius:18px;
      box-shadow:0 28px 90px rgba(0,0,0,.58); backdrop-filter:blur(18px);
      overflow:hidden; font:13px/1.4 Inter,ui-sans-serif,system-ui,sans-serif;
    }
    #leeway-enterprise-workspace.open { display:grid; grid-template-columns:230px 1fr; }
    #leeway-enterprise-workspace * { box-sizing:border-box; }
    .lew-side { padding:22px 16px; background:rgba(3,11,18,.86); border-right:1px solid rgba(255,255,255,.07); }
    .lew-brand { font-weight:800; letter-spacing:.12em; font-size:12px; }
    .lew-sub { opacity:.55; font-size:10px; margin:4px 0 20px; letter-spacing:.08em; }
    .lew-tabs { display:grid; gap:7px; }
    .lew-tab { width:100%; text-align:left; border:0; border-radius:10px; padding:11px 12px; background:transparent; color:#cfe3ea; cursor:pointer; font:inherit; }
    .lew-tab.active,.lew-tab:hover { background:rgba(58,211,239,.10); color:#72efff; }
    .lew-side-actions { margin-top:22px; padding-top:18px; border-top:1px solid rgba(255,255,255,.07); display:grid; gap:8px; }
    .lew-primary,.lew-secondary,.lew-ghost { border-radius:10px; padding:10px 12px; cursor:pointer; font:inherit; }
    .lew-primary { border:1px solid #44e2f5; background:#1edff5; color:#001117; font-weight:800; }
    .lew-secondary { border:1px solid rgba(68,226,245,.35); background:rgba(68,226,245,.08); color:#eaffff; }
    .lew-ghost { border:1px solid rgba(255,255,255,.12); background:transparent; color:#cfe3ea; }
    .lew-main { min-width:0; display:flex; flex-direction:column; }
    .lew-top { min-height:72px; display:flex; align-items:center; justify-content:space-between; padding:14px 22px; border-bottom:1px solid rgba(255,255,255,.07); }
    .lew-title h2 { margin:0; font-size:20px; } .lew-title p { margin:3px 0 0; opacity:.58; font-size:11px; }
    .lew-close { width:38px; height:38px; border-radius:50%; border:1px solid rgba(255,255,255,.15); background:transparent; color:#fff; cursor:pointer; font-size:20px; }
    .lew-content { padding:22px; overflow:auto; }
    .lew-grid { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); gap:14px; }
    .lew-card { grid-column:span 4; background:rgba(10,25,36,.78); border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:16px; }
    .lew-card.wide { grid-column:span 8; } .lew-card.full { grid-column:1/-1; }
    .lew-card h3 { margin:0 0 4px; font-size:13px; } .lew-card p { margin:0; opacity:.55; font-size:11px; }
    .lew-metric { font-size:28px; font-weight:800; margin-top:10px; color:#7af4ff; }
    .lew-progress { height:7px; margin-top:12px; border-radius:99px; background:rgba(255,255,255,.08); overflow:hidden; }
    .lew-progress span { display:block; height:100%; background:#36def2; border-radius:inherit; }
    .lew-checklist { display:grid; gap:8px; margin-top:14px; }
    .lew-check { display:flex; justify-content:space-between; gap:12px; padding:9px 10px; border-radius:9px; background:rgba(255,255,255,.035); }
    .lew-status { font-size:9px; font-weight:800; letter-spacing:.08em; padding:3px 7px; border-radius:99px; border:1px solid rgba(255,255,255,.12); }
    .lew-status.good { color:#62ffb1; border-color:rgba(98,255,177,.28); }
    .lew-status.warn { color:#ffd36b; border-color:rgba(255,211,107,.28); }
    .lew-status.muted { color:#9fb0ba; }
    .lew-toolbar { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:14px; }
    .lew-toolbar h3 { margin:0; font-size:17px; }
    .lew-table { width:100%; border-collapse:collapse; }
    .lew-table th { text-align:left; font-size:9px; letter-spacing:.09em; text-transform:uppercase; opacity:.5; padding:10px; border-bottom:1px solid rgba(255,255,255,.08); }
    .lew-table td { padding:12px 10px; border-bottom:1px solid rgba(255,255,255,.055); vertical-align:top; }
    .lew-table tr:hover td { background:rgba(68,226,245,.035); }
    .lew-drawer { position:absolute; inset:0 0 0 auto; width:min(520px,90vw); background:#06131d; border-left:1px solid rgba(71,222,241,.30); transform:translateX(102%); transition:transform .22s ease; z-index:3; overflow:auto; padding:20px; }
    .lew-drawer.open { transform:translateX(0); }
    .lew-drawer-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:18px; }
    .lew-drawer h3 { margin:0; font-size:19px; }
    .lew-stepper { display:flex; gap:5px; margin:14px 0 20px; }
    .lew-stepper span { flex:1; height:5px; background:rgba(255,255,255,.09); border-radius:99px; }
    .lew-stepper span.done,.lew-stepper span.active { background:#34dfef; }
    .lew-form { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .lew-field { display:grid; gap:5px; } .lew-field.full { grid-column:1/-1; }
    .lew-field label { font-size:10px; opacity:.6; }
    .lew-field input,.lew-field select,.lew-field textarea { width:100%; border-radius:9px; border:1px solid rgba(255,255,255,.12); background:#091924; color:#efffff; padding:10px; font:inherit; }
    .lew-drop { grid-column:1/-1; min-height:128px; border:1px dashed rgba(88,226,245,.42); border-radius:12px; display:grid; place-items:center; text-align:center; padding:16px; cursor:pointer; background:rgba(58,211,239,.035); }
    .lew-drop input { display:none; }
    .lew-drop strong { display:block; color:#76ecfa; margin-bottom:4px; }
    .lew-note { opacity:.55; font-size:10px; margin-top:7px; }
    .lew-form-actions { grid-column:1/-1; display:flex; justify-content:flex-end; gap:8px; margin-top:6px; }
    .lew-integrations { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }
    .lew-integration { border:1px solid rgba(255,255,255,.08); background:rgba(10,25,36,.7); border-radius:12px; padding:14px; }
    .lew-integration h4 { margin:0 0 4px; } .lew-integration p { opacity:.5; margin:0 0 12px; font-size:10px; }
    .lew-banner { grid-column:1/-1; border:1px solid rgba(255,211,107,.22); background:rgba(255,211,107,.05); color:#ffe7a5; border-radius:12px; padding:11px 13px; font-size:11px; }
    .lew-entity-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
    .lew-entity-card { position:relative; overflow:hidden; min-height:180px; border:1px solid rgba(101,231,248,.24); border-radius:24px; padding:18px; color:#effeff; background:linear-gradient(145deg,rgba(21,48,64,.96),rgba(4,17,27,.96)); box-shadow:inset 0 1px rgba(255,255,255,.12),0 13px 30px rgba(0,0,0,.32); }
    .lew-entity-card::after { content:""; position:absolute; inset:0; pointer-events:none; background:radial-gradient(circle at 12% 0%,rgba(89,231,255,.12),transparent 42%); }
    .lew-entity-card h4 { position:relative; margin:0; font-size:19px; line-height:1.2; }
    .lew-entity-card p { position:relative; margin:5px 0 14px; color:#bcd2db; font-size:14px; }
    .lew-entity-card button { position:relative; }
    .lew-entity-meta { position:relative; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin:14px 0; }
    .lew-entity-meta div,.lew-detail { padding:10px 11px; border:1px solid rgba(255,255,255,.08); border-radius:14px; background:rgba(0,0,0,.18); }
    .lew-entity-meta small,.lew-detail small { display:block; color:#91a8b2; font-size:12px; text-transform:uppercase; letter-spacing:.06em; }
    .lew-entity-meta strong,.lew-detail strong { display:block; margin-top:3px; font-size:15px; }
    .lew-vehicle-visual { position:relative; height:150px; margin:-2px -2px 14px; perspective:650px; border-radius:18px; overflow:hidden; background:linear-gradient(#173747 0 62%,#07131c 62%); }
    .lew-vehicle-visual::before { content:""; position:absolute; left:0; right:0; bottom:37%; border-top:2px dashed rgba(255,255,255,.24); transform:skewY(-4deg); }
    .lew-semi { position:absolute; left:8%; right:7%; bottom:23px; height:78px; filter:drop-shadow(0 14px 10px rgba(0,0,0,.55)); transform:rotateY(-8deg) rotateX(2deg); transform-style:preserve-3d; }
    .lew-trailer { position:absolute; left:37%; right:0; top:3px; height:50px; border:2px solid rgba(214,246,255,.75); border-radius:7px 12px 4px 4px; background:linear-gradient(145deg,#d9eff4,#607c89 58%,#203744); box-shadow:inset -14px -10px 20px rgba(0,0,0,.24); }
    .lew-trailer::after { content:"LEEWAY"; position:absolute; right:13px; top:14px; color:#092632; font-weight:900; letter-spacing:.18em; font-size:11px; }
    .lew-cab { position:absolute; left:0; bottom:15px; width:42%; height:58px; border-radius:14px 8px 6px 5px; background:linear-gradient(145deg,#4ef0ff,#087a99 62%,#043a53); clip-path:polygon(4% 34%,28% 34%,40% 0,78% 0,100% 38%,100% 100%,0 100%); box-shadow:inset -10px -8px 16px rgba(0,0,0,.3); }
    .lew-cab::after { content:""; position:absolute; left:44%; top:8px; width:28%; height:18px; border-radius:3px; background:linear-gradient(145deg,#d9fbff,#193c50); }
    .lew-wheel { position:absolute; bottom:0; width:22px; height:22px; border:5px solid #071016; border-radius:50%; background:#66828b; box-shadow:0 0 0 2px #1d313a; }
    .lew-wheel.w1 { left:17%; } .lew-wheel.w2 { left:67%; } .lew-wheel.w3 { left:82%; }
    .lew-credential { border:1px solid rgba(110,233,248,.30); border-radius:25px; padding:18px; background:linear-gradient(145deg,#102d3d,#06131d 62%); box-shadow:inset 0 1px rgba(255,255,255,.12),0 18px 46px rgba(0,0,0,.35); }
    .lew-id-head { display:grid; grid-template-columns:96px 1fr; gap:16px; align-items:center; }
    .lew-photo { width:96px; height:112px; display:grid; place-items:center; border-radius:20px; border:1px solid rgba(104,235,250,.25); background:radial-gradient(circle at 50% 32%,#4a7182 0 18%,#153444 19% 38%,#071722 39%); color:#cfeaf1; font-size:12px; text-align:center; }
    .lew-detail-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin-top:16px; }
    .lew-crm-metrics { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin-bottom:16px; }
    .lew-crm-metrics .lew-card { grid-column:auto; }
    #leeway-enterprise-workspace { font-size:16px; line-height:1.5; border-radius:24px; }
    .lew-brand { font-size:15px; } .lew-sub,.lew-title p,.lew-card p,.lew-note,.lew-integration p { font-size:14px; opacity:.78; }
    .lew-tab,.lew-primary,.lew-secondary,.lew-ghost { min-height:46px; border-radius:16px; font-size:15px; }
    .lew-tab { box-shadow:inset 0 1px rgba(255,255,255,.06); }
    .lew-tab.active,.lew-tab:hover { background:linear-gradient(145deg,rgba(51,226,244,.22),rgba(11,55,70,.55)); box-shadow:inset 0 1px rgba(255,255,255,.16),0 9px 22px rgba(0,0,0,.24); }
    .lew-title h2 { font-size:25px; } .lew-close { width:48px; height:48px; font-size:25px; background:linear-gradient(145deg,#183747,#07141e); box-shadow:inset 0 1px rgba(255,255,255,.16),0 8px 20px rgba(0,0,0,.3); }
    .lew-card,.lew-integration,.lew-drop { border-radius:22px; box-shadow:inset 0 1px rgba(255,255,255,.08),0 12px 28px rgba(0,0,0,.24); }
    .lew-card h3 { font-size:18px; } .lew-status,.lew-table th { font-size:12px; } .lew-table td { font-size:15px; }
    .lew-drawer { width:min(660px,96vw); padding:24px; } .lew-drawer h3 { font-size:24px; }
    @media(max-width:900px){#leeway-enterprise-workspace.open{grid-template-columns:1fr;inset:62px 8px 8px}.lew-side{display:none}.lew-card,.lew-card.wide{grid-column:1/-1}.lew-integrations{grid-template-columns:1fr}.lew-form{grid-template-columns:1fr}.lew-crm-metrics{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:560px){.lew-content{padding:14px}.lew-top{padding:12px 14px}.lew-toolbar{align-items:stretch;flex-direction:column}.lew-entity-grid{grid-template-columns:1fr}.lew-detail-grid,.lew-entity-meta{grid-template-columns:1fr}.lew-crm-metrics{grid-template-columns:1fr}.lew-id-head{grid-template-columns:80px 1fr}.lew-photo{width:80px;height:96px}.lew-table{font-size:14px}.lew-table th:nth-child(n+4),.lew-table td:nth-child(n+4){display:none}}
  `;
  documentRef.head.appendChild(style);
}

function overview(state) {
  const summary = summarizeEnterpriseState();
  const onboarding = state.onboardingCases.find(
    (row) => row.type === 'ORGANIZATION',
  );
  const pct = onboarding
    ? Math.round(((onboarding.step - 1) / onboarding.totalSteps) * 100)
    : 0;
  return `
    <div class="lew-grid">
      <div class="lew-banner">LOCAL CANDIDATE MODE · CRM records persist in this browser. Uploaded document bytes and financial credentials are not stored in GitHub Pages. Connect a governed backend before production use.</div>
      <section class="lew-card wide">
        <h3>Company onboarding</h3><p>${esc(state.organization.legalName)} · ${esc(state.organization.companyType)}</p>
        <div class="lew-metric">${onboarding?.step || 1} / ${onboarding?.totalSteps || 7}</div>
        <div class="lew-progress"><span style="width:${pct}%"></span></div>
        <div class="lew-checklist">
          ${(onboarding?.checklist || []).map((row) => `<div class="lew-check"><span>${esc(row.label)}</span><span class="lew-status ${statusClass(row.status)}">${esc(row.status)}</span></div>`).join('')}
        </div>
      </section>
      <section class="lew-card"><h3>Employees</h3><p>Active workforce</p><div class="lew-metric">${summary.employeeCount}</div><button class="lew-secondary" data-action="open-tab" data-tab="people">View people</button></section>
      <section class="lew-card"><h3>Onboarding</h3><p>People in process</p><div class="lew-metric">${summary.onboardingPeople}</div><button class="lew-secondary" data-action="onboard-person">Onboard employee</button></section>
      <section class="lew-card"><h3>Equipment</h3><p>Vehicles / trailers / assets</p><div class="lew-metric">${summary.equipmentCount}</div><button class="lew-secondary" data-action="open-tab" data-tab="equipment">View equipment</button></section>
      <section class="lew-card"><h3>CRM accounts</h3><p>Customers / brokers / facilities</p><div class="lew-metric">${summary.crmAccountCount}</div><button class="lew-secondary" data-action="open-tab" data-tab="crm">Open CRM</button></section>
      <section class="lew-card"><h3>Evidence</h3><p>Documents received</p><div class="lew-metric">${summary.documentCount}</div><button class="lew-secondary" data-action="open-tab" data-tab="documents">View documents</button></section>
      <section class="lew-card"><h3>Integrations</h3><p>Connected systems</p><div class="lew-metric">${summary.integrationsConnected}</div><button class="lew-secondary" data-action="open-tab" data-tab="integrations">Connect systems</button></section>
    </div>`;
}

function vehicleVisual(row) {
  const isTrailer = String(row.type).toLowerCase().includes('trailer');
  return `<div class="lew-vehicle-visual" role="img" aria-label="3D equipment preview of ${esc(row.unit)} ${esc(row.type)}">
    <div class="lew-semi">
      <div class="lew-trailer" style="${isTrailer ? 'left:5%' : ''}"></div>
      ${isTrailer ? '' : '<div class="lew-cab"></div>'}
      <i class="lew-wheel w1"></i><i class="lew-wheel w2"></i><i class="lew-wheel w3"></i>
    </div>
  </div>`;
}

function people(state) {
  return `
    <div class="lew-toolbar"><div><h3>Drivers & people</h3><div class="lew-note">Open a profile for credential, assignment, truck, safety, and onboarding detail.</div></div><button class="lew-primary" data-action="onboard-person">+ Onboard employee</button></div>
    <div class="lew-entity-grid">
    ${state.people.map((row) => `<article class="lew-entity-card"><h4>${esc(row.name)}</h4><p>${esc(row.role)} · ${esc(row.location)}</p><span class="lew-status ${statusClass(row.status)}">${esc(row.status)}</span><div class="lew-entity-meta"><div><small>Onboarding</small><strong>${esc(row.onboarding)}</strong></div><div><small>Evidence</small><strong>${Array.isArray(row.requiredEvidence) && row.requiredEvidence.length ? `${(row.evidence || []).length}/${row.requiredEvidence.length} received` : esc((row.evidence || []).length || 0)}</strong></div></div><button class="lew-secondary" data-action="view-person" data-person-id="${esc(row.id)}">Open driver profile</button></article>`).join('')}
    </div>`;
}

function equipment(state) {
  return `
    <div class="lew-toolbar"><div><h3>Fleet & equipment</h3><div class="lew-note">Tractors, trailers, service vehicles, buses, vans, and rail assets with assignments and maintenance state.</div></div><button class="lew-primary" data-action="onboard-equipment">+ Add equipment</button></div>
    <div class="lew-entity-grid">
    ${state.equipment.map((row) => `<article class="lew-entity-card">${vehicleVisual(row)}<h4>${esc(row.unit)} · ${esc(row.manufacturer || row.type)}</h4><p>${esc([row.modelYear, row.model, row.subtype].filter(Boolean).join(' · '))}</p><span class="lew-status ${statusClass(row.status)}">${esc(row.status)}</span><div class="lew-entity-meta"><div><small>Assignment</small><strong>${esc(row.assignment || 'Unassigned')}</strong></div><div><small>Maintenance</small><strong>${esc(row.maintenanceStatus || 'Pending')}</strong></div></div><button class="lew-secondary" data-action="view-equipment" data-equipment-id="${esc(row.id)}">Open equipment record</button></article>`).join('')}
    </div>`;
}

function crm(state) {
  const accounts = state.crm.accounts || [];
  const prospects = accounts.filter(
    (row) =>
      String(row.stage).toLowerCase().includes('prospect') ||
      String(row.status).toUpperCase() === 'PROSPECT',
  ).length;
  const followUps = accounts.filter((row) => row.nextFollowUp).length;
  const pipeline = accounts.reduce(
    (sum, row) => sum + (Number(row.estimatedValue) || 0),
    0,
  );
  return `
    <div class="lew-toolbar"><div><h3>Transportation Sales & CRM</h3><div class="lew-note">Purpose-built account, broker, lane, sales, campaign, activity, and follow-up workspace for transportation operations.</div></div><button class="lew-primary" data-action="new-account">+ New account</button></div>
    <div class="lew-crm-metrics"><section class="lew-card"><h3>${accounts.length}</h3><p>Connected accounts</p></section><section class="lew-card"><h3>${prospects}</h3><p>Prospects</p></section><section class="lew-card"><h3>${followUps}</h3><p>Scheduled follow-ups</p></section><section class="lew-card"><h3>$${pipeline.toLocaleString()}</h3><p>Visible pipeline value</p></section></div>
    <div class="lew-entity-grid">${accounts.map((row) => `<article class="lew-entity-card"><h4>${esc(row.name)}</h4><p>${esc(row.type)} · ${esc(row.location)}</p><span class="lew-status ${statusClass(row.status)}">${esc(row.stage || row.status)}</span><div class="lew-entity-meta"><div><small>Priority</small><strong>${esc(row.priority || 'MEDIUM')}</strong></div><div><small>Lane</small><strong>${esc(row.lane || 'Not assigned')}</strong></div><div><small>Next follow-up</small><strong>${esc(row.nextFollowUp || 'Not scheduled')}</strong></div><div><small>Value</small><strong>$${Number(row.estimatedValue || 0).toLocaleString()}</strong></div></div><button class="lew-secondary" data-action="view-account" data-account-id="${esc(row.id)}">Open account</button> <button class="lew-ghost" data-action="locate-account" data-location="${esc(row.location)}" data-name="${esc(row.name)}">Show on map</button></article>`).join('')}</div>`;
}

function personDrawer(person, state) {
  const vehicle = state.equipment.find(
    (row) =>
      row.id === person.assignedEquipmentId || row.assignment === person.name,
  );
  return `<div class="lew-drawer-head"><div><div class="lew-note">DRIVER CREDENTIAL · BUSINESS DIRECTORY</div><h3>${esc(person.name)}</h3><p class="lew-note">Company-visible profile. Operational values are training data until a governed HR/ELD connector is bound.</p></div><button class="lew-close" data-action="close-drawer" aria-label="Close driver profile">×</button></div>
  <section class="lew-credential"><div class="lew-id-head"><div class="lew-photo">${person.photoUrl ? `<img src="${esc(person.photoUrl)}" alt="${esc(person.name)}">` : 'No verified<br>photo'}</div><div><span class="lew-status ${statusClass(person.status)}">${esc(person.status)}</span><h3>${esc(person.name)}</h3><p>${esc(person.employeeNumber || person.id)} · ${esc(person.role)}</p><strong>${esc(person.location)}</strong></div></div><div class="lew-detail-grid"><div class="lew-detail"><small>CDL</small><strong>${esc([person.cdlClass, person.cdlState].filter(Boolean).join(' · ') || 'Not recorded')}</strong></div><div class="lew-detail"><small>Medical</small><strong>${esc(person.medicalStatus || 'Not recorded')}</strong></div><div class="lew-detail"><small>Hours available</small><strong>${esc(person.hoursAvailable || 'ELD not connected')}</strong></div><div class="lew-detail"><small>Safety score</small><strong>${esc(person.safetyScore || 'Not available')}</strong></div></div></section>
  ${vehicle ? `<section class="lew-card full" style="margin-top:16px">${vehicleVisual(vehicle)}<h3>${esc(vehicle.unit)} · ${esc(vehicle.manufacturer)} ${esc(vehicle.model)}</h3><p>${esc(vehicle.currentRoute || 'No active route')} · ETA ${esc(vehicle.eta || 'not available')}</p><div class="lew-detail-grid"><div class="lew-detail"><small>Fuel</small><strong>${vehicle.fuelPercent == null ? 'Not connected' : `${esc(vehicle.fuelPercent)}%`}</strong></div><div class="lew-detail"><small>Load</small><strong>${vehicle.loadPercent == null ? 'Not connected' : `${esc(vehicle.loadPercent)}%`}</strong></div><div class="lew-detail"><small>Maintenance</small><strong>${esc(vehicle.maintenanceStatus)}</strong></div><div class="lew-detail"><small>Work order</small><strong>${esc(vehicle.workOrder)}</strong></div></div></section>` : '<div class="lew-banner" style="margin-top:16px">No vehicle assignment is connected to this profile.</div>'}`;
}

function equipmentDetailDrawer(row) {
  return `<div class="lew-drawer-head"><div><div class="lew-note">GOVERNED FLEET ASSET</div><h3>${esc(row.unit)}</h3><p class="lew-note">Telemetry is labeled as local training data until an ELD or fleet connector is verified.</p></div><button class="lew-close" data-action="close-drawer" aria-label="Close equipment record">×</button></div>${vehicleVisual(row)}<div class="lew-detail-grid"><div class="lew-detail"><small>Vehicle</small><strong>${esc([row.modelYear, row.manufacturer, row.model].filter(Boolean).join(' ') || row.type)}</strong></div><div class="lew-detail"><small>Configuration</small><strong>${esc(row.subtype)}</strong></div><div class="lew-detail"><small>Assignment</small><strong>${esc(row.assignment || 'Unassigned')}</strong></div><div class="lew-detail"><small>VIN ending</small><strong>${esc(row.vinTail || 'Not recorded')}</strong></div><div class="lew-detail"><small>Route</small><strong>${esc(row.currentRoute || 'No active route')}</strong></div><div class="lew-detail"><small>ETA</small><strong>${esc(row.eta || 'Not available')}</strong></div><div class="lew-detail"><small>Fuel</small><strong>${row.fuelPercent == null ? 'Not connected' : `${esc(row.fuelPercent)}%`}</strong></div><div class="lew-detail"><small>Load</small><strong>${row.loadPercent == null ? 'Not connected' : `${esc(row.loadPercent)}%`}</strong></div><div class="lew-detail"><small>Maintenance</small><strong>${esc(row.maintenanceStatus || 'Pending review')}</strong></div><div class="lew-detail"><small>Work order</small><strong>${esc(row.workOrder || 'None')}</strong></div></div>`;
}

function accountDetailDrawer(row) {
  return `<div class="lew-drawer-head"><div><div class="lew-note">TRANSPORTATION SALES ACCOUNT</div><h3>${esc(row.name)}</h3><p class="lew-note">${esc(row.type)} · ${esc(row.location)}</p></div><button class="lew-close" data-action="close-drawer" aria-label="Close CRM account">×</button></div><div class="lew-detail-grid"><div class="lew-detail"><small>Stage</small><strong>${esc(row.stage || row.status)}</strong></div><div class="lew-detail"><small>Priority</small><strong>${esc(row.priority || 'MEDIUM')}</strong></div><div class="lew-detail"><small>Contact</small><strong>${esc(row.contact || 'Not recorded')}</strong></div><div class="lew-detail"><small>Lane</small><strong>${esc(row.lane || 'Not assigned')}</strong></div><div class="lew-detail"><small>Next follow-up</small><strong>${esc(row.nextFollowUp || 'Not scheduled')}</strong></div><div class="lew-detail"><small>Pipeline value</small><strong>$${Number(row.estimatedValue || 0).toLocaleString()}</strong></div><div class="lew-detail" style="grid-column:1/-1"><small>Next action</small><strong>${esc(row.nextAction || 'Define next action')}</strong></div></div><button class="lew-primary" data-action="locate-account" data-location="${esc(row.location)}" data-name="${esc(row.name)}" style="margin-top:16px">Show account on map</button>`;
}

function documents(state) {
  return `
    <div class="lew-toolbar"><div><h3>Documents & evidence</h3><div class="lew-note">Intake metadata is stored locally in this candidate. Production document bytes require a governed backend/evidence vault.</div></div></div>
    <label class="lew-drop"><input type="file" multiple data-action="upload-files"><div><strong>Drop or choose files</strong>Applications, licenses, insurance, inspections, policies, contracts, rate confirmations, onboarding evidence.</div></label>
    <section class="lew-card full" style="margin-top:14px"><table class="lew-table"><thead><tr><th>Document</th><th>Category</th><th>Owner</th><th>Status</th><th>Size</th><th>Received</th></tr></thead><tbody>
    ${state.documents.map((row) => `<tr><td><strong>${esc(row.name)}</strong></td><td>${esc(row.category)}</td><td>${esc(row.ownerType)} · ${esc(row.ownerId)}</td><td><span class="lew-status ${statusClass(row.status)}">${esc(row.status)}</span></td><td>${formatBytes(row.size)}</td><td>${esc(row.uploadedAt || '—')}</td></tr>`).join('')}
    </tbody></table></section>`;
}

function integrations(state) {
  return `
    <div class="lew-toolbar"><div><h3>Integrations</h3><div class="lew-note">Connect the systems a real operator already uses. No credential is collected by this Pages candidate.</div></div></div>
    <div class="lew-integrations">
      ${state.integrations.map((row) => `<div class="lew-integration"><h4>${esc(row.name)}</h4><p>Governed connector boundary</p><span class="lew-status ${statusClass(row.status)}">${esc(row.status)}</span><div style="margin-top:12px"><button class="lew-secondary" data-action="connect-integration" data-id="${esc(row.id)}">Connect</button></div></div>`).join('')}
    </div>`;
}

function employeeWizardMarkup({ step = 1, draft = {}, files = [] } = {}) {
  const role = draft.role || 'Driver';
  const profile = onboardingProfile(role);
  const steps = ['Identity', 'Role', 'Evidence', 'Review'];
  const header = `<div class="lew-drawer-head"><div><div class="lew-note">GUIDED ONBOARDING · STEP ${step} OF 4</div><h3>Onboard employee</h3><p class="lew-note">Agent Lee can guide this process one question group at a time.</p></div><button class="lew-close" data-action="close-drawer">×</button></div>
  <div class="lew-stepper">${steps.map((_, index) => `<span class="${index + 1 < step ? 'done' : index + 1 === step ? 'active' : ''}"></span>`).join('')}</div>`;

  if (step === 1) {
    return (
      header +
      `<form class="lew-form" data-wizard-form="employee">
      <div class="lew-field full"><label>Full legal name</label><input name="name" required value="${esc(draft.name || '')}" placeholder="Employee name"></div>
      <div class="lew-field"><label>Email</label><input name="email" type="email" value="${esc(draft.email || '')}" placeholder="name@company.com"></div>
      <div class="lew-field"><label>Phone</label><input name="phone" value="${esc(draft.phone || '')}" placeholder="Phone"></div>
      <div class="lew-field"><label>Preferred language</label><select name="preferredLanguage">${languageOptions(draft.preferredLanguage || getLanguage().code)}</select></div>
      <div class="lew-note full">Collect only information your organization is authorized to collect. Sensitive payroll, identity, and eligibility data should be handled by the production governed backend—not GitHub Pages/localStorage.</div>
      <div class="lew-form-actions"><button type="button" class="lew-ghost" data-action="close-drawer">Cancel</button><button type="button" class="lew-primary" data-wizard-next="employee">Continue</button></div>
    </form>`
    );
  }

  if (step === 2) {
    return (
      header +
      `<form class="lew-form" data-wizard-form="employee">
      <div class="lew-field"><label>Role</label><select name="role">${['Driver', 'Dispatcher', 'Fleet Manager', 'Maintenance', 'Transit Operator', 'HR / Recruiting', 'Operations'].map((item) => `<option ${item === role ? 'selected' : ''}>${item}</option>`).join('')}</select></div>
      <div class="lew-field"><label>Employment status</label><select name="status"><option>ONBOARDING</option><option>CANDIDATE</option><option>ACTIVE</option></select></div>
      <div class="lew-field full"><label>Primary work location</label><input name="location" value="${esc(draft.location || '')}" placeholder="City, state, terminal, facility, or route base"></div>
      <div class="lew-field full"><label>Role-based onboarding sections</label><div class="lew-checklist">${profile.sections.map((item) => `<div class="lew-check"><span>${esc(item)}</span><span class="lew-status muted">REQUIRED PROFILE</span></div>`).join('')}</div></div>
      ${profile.note ? `<div class="lew-note full">${esc(profile.note)}</div>` : ''}
      <div class="lew-form-actions"><button type="button" class="lew-ghost" data-wizard-back="employee">Back</button><button type="button" class="lew-primary" data-wizard-next="employee">Continue</button></div>
    </form>`
    );
  }

  if (step === 3) {
    return (
      header +
      `<form class="lew-form" data-wizard-form="employee">
      <div class="lew-field full"><label>Expected evidence for this role</label><div class="lew-checklist">${profile.evidence.map((item) => `<div class="lew-check"><span>${esc(item)}</span><span class="lew-status muted">PENDING</span></div>`).join('')}</div></div>
      <label class="lew-drop"><input type="file" multiple name="files"><div><strong>Drop onboarding documents</strong>${files.length ? `${files.length} file(s) currently selected for this intake` : 'Application, eligibility/tax forms, licenses, qualifications, policies, and role evidence.'}</div></label>
      <div class="lew-note full">LeeWay stores file metadata only in this public candidate. Production file bytes belong in the governed document/evidence backend.</div>
      <div class="lew-form-actions"><button type="button" class="lew-ghost" data-wizard-back="employee">Back</button><button type="button" class="lew-primary" data-wizard-next="employee">Review</button></div>
    </form>`
    );
  }

  return (
    header +
    `<div class="lew-grid">
    <section class="lew-card full"><h3>Review employee onboarding</h3><p>Confirm the connected record before creating the case.</p>
      <div class="lew-checklist">
        <div class="lew-check"><span>Name</span><strong>${esc(draft.name || '—')}</strong></div>
        <div class="lew-check"><span>Role</span><strong>${esc(role)}</strong></div>
        <div class="lew-check"><span>Location</span><strong>${esc(draft.location || '—')}</strong></div>
        <div class="lew-check"><span>Documents selected</span><strong>${files.length}</strong></div>
        <div class="lew-check"><span>Onboarding status</span><span class="lew-status warn">READY TO CREATE</span></div>
      </div>
    </section>
    <div class="lew-banner">I‑9, tax, driver qualification, medical/safety, and other requirements must be configured for the employer, job, operation, jurisdiction, and current law. LeeWay is organizing the workflow and evidence—not replacing employer/compliance responsibility.</div>
    <div class="lew-form-actions"><button type="button" class="lew-ghost" data-wizard-back="employee">Back</button><button type="button" class="lew-primary" data-wizard-finish="employee">Create onboarding case</button></div>
  </div>`
  );
}

function companyWizardMarkup({ step = 1, draft = {}, files = [] } = {}) {
  const labels = ORGANIZATION_ONBOARDING_STEPS.map((item) => item.label);
  const header = `<div class="lew-drawer-head"><div><div class="lew-note">COMPANY ONBOARDING · STEP ${step} OF ${labels.length}</div><h3>Onboard organization</h3><p class="lew-note">A simple guided setup for the company, people, fleet, evidence, and integrations.</p></div><button class="lew-close" data-action="close-drawer">×</button></div>
  <div class="lew-stepper">${labels.map((_, index) => `<span class="${index + 1 < step ? 'done' : index + 1 === step ? 'active' : ''}"></span>`).join('')}</div>`;

  if (step === 1)
    return (
      header +
      `<form class="lew-form" data-wizard-form="company">
    <div class="lew-field full"><label>Legal company name</label><input name="legalName" required value="${esc(draft.legalName || '')}" placeholder="Legal entity"></div>
    <div class="lew-field"><label>DBA / operating name</label><input name="dba" value="${esc(draft.dba || '')}" placeholder="Operating name"></div>
    <div class="lew-field"><label>Company type</label><select name="companyType"><option>Motor Carrier / Logistics</option><option>Municipal Transit</option><option>Private Fleet</option><option>Brokerage</option><option>Warehouse / Distribution</option><option>Rail / Intermodal</option><option>Port / Marine Logistics</option><option>Mixed Transportation</option></select></div>
    <div class="lew-form-actions"><button type="button" class="lew-ghost" data-action="close-drawer">Cancel</button><button type="button" class="lew-primary" data-wizard-next="company">Continue</button></div>
  </form>`
    );

  if (step === 2)
    return (
      header +
      `<form class="lew-form" data-wizard-form="company">
    <div class="lew-field full"><label>Primary operating location</label><input name="primaryLocation" value="${esc(draft.primaryLocation || '')}" placeholder="HQ, city, terminal, or operating base"></div>
    <div class="lew-field full"><label>Transportation modes</label><input name="modes" value="${esc(draft.modes || '')}" placeholder="Trucking, transit, rail, delivery, marine/intermodal..."></div>
    <div class="lew-field full"><label>What do you operate?</label><textarea name="operations" rows="4" placeholder="Fleet size, service area, transit routes, terminals, freight network, municipal operation...">${esc(draft.operations || '')}</textarea></div>
    <div class="lew-form-actions"><button type="button" class="lew-ghost" data-wizard-back="company">Back</button><button type="button" class="lew-primary" data-wizard-next="company">Continue</button></div>
  </form>`
    );

  if (step === 3)
    return (
      header +
      `<form class="lew-form" data-wizard-form="company">
    <div class="lew-field full"><label>Primary administrator</label><input name="adminName" value="${esc(draft.adminName || '')}" placeholder="Administrator name"></div>
    <div class="lew-field full"><label>Administrator email</label><input name="adminEmail" type="email" value="${esc(draft.adminEmail || '')}" placeholder="admin@company.com"></div>
    <div class="lew-note full">After company activation, additional employees and roles are added through the People workspace with role-based onboarding.</div>
    <div class="lew-form-actions"><button type="button" class="lew-ghost" data-wizard-back="company">Back</button><button type="button" class="lew-primary" data-wizard-next="company">Continue</button></div>
  </form>`
    );

  if (step === 4) {
    const count = readEnterpriseState().equipment.length;
    return (
      header +
      `<div class="lew-grid"><section class="lew-card full"><h3>Equipment and fleet</h3><p>Existing local equipment records</p><div class="lew-metric">${count}</div><div class="lew-note">You can continue company setup now and onboard vehicles, trailers, buses, service assets, and other equipment immediately afterward.</div></section><div class="lew-form-actions"><button type="button" class="lew-ghost" data-wizard-back="company">Back</button><button type="button" class="lew-primary" data-wizard-next="company">Continue</button></div></div>`
    );
  }

  if (step === 5)
    return (
      header +
      `<form class="lew-form" data-wizard-form="company">
    <label class="lew-drop"><input type="file" multiple name="files"><div><strong>Drop company documents</strong>${files.length ? `${files.length} file(s) selected` : 'Operating authority, insurance, permits, policies, contracts, safety programs, facility documents, or other evidence.'}</div></label>
    <div class="lew-note full">The Pages candidate stores file metadata only. Production files must go to the governed evidence/document backend.</div>
    <div class="lew-form-actions"><button type="button" class="lew-ghost" data-wizard-back="company">Back</button><button type="button" class="lew-primary" data-wizard-next="company">Continue</button></div>
  </form>`
    );

  if (step === 6) {
    const state = readEnterpriseState();
    return (
      header +
      `<div class="lew-grid"><section class="lew-card full"><h3>Choose integrations</h3><p>These are connector boundaries only until a real provider is bound.</p><div class="lew-integrations" style="margin-top:14px">${state.integrations.map((row) => `<div class="lew-integration"><h4>${esc(row.name)}</h4><p>${esc(row.status)}</p><span class="lew-status muted">CONNECT AFTER SETUP</span></div>`).join('')}</div></section><div class="lew-form-actions"><button type="button" class="lew-ghost" data-wizard-back="company">Back</button><button type="button" class="lew-primary" data-wizard-next="company">Review</button></div></div>`
    );
  }

  return (
    header +
    `<div class="lew-grid"><section class="lew-card full"><h3>Review organization</h3><p>LeeWay will create the connected company workspace and keep unbound integrations clearly marked.</p><div class="lew-checklist">
    <div class="lew-check"><span>Legal name</span><strong>${esc(draft.legalName || '—')}</strong></div>
    <div class="lew-check"><span>Operating name</span><strong>${esc(draft.dba || '—')}</strong></div>
    <div class="lew-check"><span>Company type</span><strong>${esc(draft.companyType || '—')}</strong></div>
    <div class="lew-check"><span>Primary location</span><strong>${esc(draft.primaryLocation || '—')}</strong></div>
    <div class="lew-check"><span>Documents selected</span><strong>${files.length}</strong></div>
  </div></section><div class="lew-form-actions"><button type="button" class="lew-ghost" data-wizard-back="company">Back</button><button type="button" class="lew-primary" data-wizard-finish="company">Create company workspace</button></div></div>`
  );
}

function equipmentDrawer() {
  return `<div class="lew-drawer-head"><div><div class="lew-note">ASSET INTAKE</div><h3>Onboard equipment</h3><p class="lew-note">Create the asset first; attach telematics/maintenance evidence when available.</p></div><button class="lew-close" data-action="close-drawer">×</button></div>
  <form class="lew-form" data-form="equipment">
    <div class="lew-field"><label>Unit number</label><input name="unit" required placeholder="LW-1004"></div>
    <div class="lew-field"><label>Asset type</label><select name="type"><option>Tractor</option><option>Trailer</option><option>Box Truck</option><option>Bus</option><option>Van</option><option>Service Vehicle</option><option>Rail Equipment</option><option>Other</option></select></div>
    <div class="lew-field full"><label>Configuration</label><input name="subtype" placeholder="53 ft Dry Van, Class 8, 40 ft Bus..."></div>
    <div class="lew-field full"><label>Assignment</label><input name="assignment" placeholder="Driver, terminal, route, tractor..."></div>
    <div class="lew-field"><label>Manufacturer</label><input name="manufacturer" placeholder="Kenworth, Freightliner, Volvo..."></div>
    <div class="lew-field"><label>Model</label><input name="model" placeholder="T680, Cascadia, VNL..."></div>
    <div class="lew-field"><label>Model year</label><input name="modelYear" type="number" min="1950" max="2100" placeholder="2026"></div>
    <div class="lew-field"><label>Maintenance state</label><select name="maintenanceStatus"><option>SERVICE CURRENT</option><option>INSPECTION DUE</option><option>OUT OF SERVICE</option><option>PENDING REVIEW</option></select></div>
    <label class="lew-drop"><input type="file" multiple name="files"><div><strong>Drop equipment evidence</strong>Registration, insurance, inspection, title/lease, maintenance records, photos, manuals.</div></label>
    <div class="lew-form-actions"><button type="button" class="lew-ghost" data-action="close-drawer">Cancel</button><button type="submit" class="lew-primary">Add equipment</button></div>
  </form>`;
}

function accountDrawer() {
  return `<div class="lew-drawer-head"><div><div class="lew-note">CRM RECORD</div><h3>New account</h3><p class="lew-note">One connected record can appear in boards, activity, routes, documents, and the world map.</p></div><button class="lew-close" data-action="close-drawer">×</button></div>
  <form class="lew-form" data-form="account">
    <div class="lew-field full"><label>Account name</label><input name="name" required placeholder="Customer, broker, terminal, repair hub..."></div>
    <div class="lew-field"><label>Type</label><select name="type"><option>Customer</option><option>Broker</option><option>Shipper</option><option>Consignee</option><option>Terminal</option><option>Warehouse</option><option>Repair Hub</option><option>Port / Intermodal</option></select></div>
    <div class="lew-field"><label>Status</label><select name="status"><option>ACTIVE</option><option>PROSPECT</option><option>ONBOARDING</option><option>INACTIVE</option></select></div>
    <div class="lew-field full"><label>Location</label><input name="location" placeholder="Address, city, terminal, or facility"></div>
    <div class="lew-field"><label>Sales stage</label><select name="stage"><option>Prospect</option><option>Qualified</option><option>Quote requested</option><option>Negotiation</option><option>Active customer</option><option>Operational</option></select></div>
    <div class="lew-field"><label>Priority</label><select name="priority"><option>HIGH</option><option selected>MEDIUM</option><option>LOW</option></select></div>
    <div class="lew-field"><label>Contact</label><input name="contact" placeholder="Contact or desk"></div>
    <div class="lew-field"><label>Pipeline value</label><input name="estimatedValue" type="number" min="0" step="1" placeholder="2800"></div>
    <div class="lew-field full"><label>Primary lane</label><input name="lane" placeholder="Chicago, IL → Milwaukee, WI"></div>
    <div class="lew-field"><label>Next follow-up</label><input name="nextFollowUp" placeholder="Tomorrow · 09:00 CT"></div>
    <div class="lew-field"><label>Next action</label><input name="nextAction" placeholder="Confirm rate and pickup window"></div>
    <div class="lew-form-actions"><button type="button" class="lew-ghost" data-action="close-drawer">Cancel</button><button type="submit" class="lew-primary">Create account</button></div>
  </form>`;
}

export function mountEnterpriseWorkspace({ onLocate } = {}) {
  ensureStyles(document);
  const root = document.createElement('section');
  root.id = 'leeway-enterprise-workspace';
  root.innerHTML = `
    <aside class="lew-side">
      <div class="lew-brand">LEEWAY LOGISTICS</div><div class="lew-sub">ENTERPRISE WORKSPACE</div>
      <nav class="lew-tabs">${WORKSPACE_TABS.map(([id, label], i) => `<button class="lew-tab ${i === 0 ? 'active' : ''}" data-tab="${id}">${label}</button>`).join('')}</nav>
      <div class="lew-side-actions"><button class="lew-primary" data-action="company-onboarding">Continue company onboarding</button><button class="lew-secondary" data-action="onboard-person">Onboard employee</button><button class="lew-secondary" data-action="onboard-equipment">Add equipment</button></div>
    </aside>
    <main class="lew-main">
      <header class="lew-top"><div class="lew-title"><h2 data-title>Command</h2><p data-subtitle>Connected logistics CRM, people, equipment, documents, and onboarding.</p></div><button class="lew-close" data-action="close-workspace">×</button></header>
      <div class="lew-content" data-content></div>
      <aside class="lew-drawer" data-drawer></aside>
    </main>`;
  document.body.appendChild(root);

  const content = root.querySelector('[data-content]');
  const drawer = root.querySelector('[data-drawer]');
  const title = root.querySelector('[data-title]');
  let activeTab = 'overview';
  let employeeWizard = { step: 1, draft: {}, files: [] };
  let companyWizard = { step: 1, draft: {}, files: [] };

  function render() {
    const state = readEnterpriseState();
    const views = { overview, people, equipment, crm, documents, integrations };
    content.innerHTML = views[activeTab]?.(state) || overview(state);
    title.textContent =
      Object.fromEntries(WORKSPACE_TABS)[activeTab] || 'Command';
    root
      .querySelectorAll('[data-tab]')
      .forEach((button) =>
        button.classList.toggle('active', button.dataset.tab === activeTab),
      );
    bindFileInputs();
  }

  function bindFileInputs() {
    content
      .querySelectorAll('input[type="file"][data-action="upload-files"]')
      .forEach((input) => {
        input.addEventListener('change', () => {
          for (const file of input.files || [])
            addDocumentMetadata({ file, category: 'General Intake' });
          render();
        });
      });
  }

  function mergeWizardForm(target, form) {
    if (!form) return;
    const data = new FormData(form);
    for (const [key, value] of data.entries()) {
      if (value instanceof File) continue;
      target.draft[key] = String(value);
    }
    const fileInput = form.querySelector('input[type="file"]');
    if (fileInput?.files?.length) {
      target.files = [...target.files, ...fileInput.files];
    }
  }

  function renderEmployeeWizard() {
    drawer.innerHTML = employeeWizardMarkup(employeeWizard);
    drawer.classList.add('open');
  }

  function renderCompanyWizard() {
    drawer.innerHTML = companyWizardMarkup(companyWizard);
    drawer.classList.add('open');
  }

  function resetEmployeeWizard() {
    employeeWizard = { step: 1, draft: {}, files: [] };
  }

  function resetCompanyWizard() {
    const org = readEnterpriseState().organization || {};
    companyWizard = {
      step: Math.max(1, Math.min(7, Number(org.onboardingStep) || 1)),
      draft: {
        legalName: org.legalName || '',
        dba: org.dba || '',
        companyType: org.companyType || '',
        primaryLocation: org.primaryLocation || '',
        modes: Array.isArray(org.modes)
          ? org.modes.join(', ')
          : String(org.modes || ''),
      },
      files: [],
    };
  }

  function finishEmployeeWizard() {
    const role = employeeWizard.draft.role || 'Driver';
    const profile = onboardingProfile(role);
    addPerson({
      ...employeeWizard.draft,
      role,
      status: 'ONBOARDING',
      onboarding: 'DOCUMENT_REVIEW',
      evidence: employeeWizard.files.map((file) => file.name),
      requiredEvidence: [...profile.evidence],
    });
    for (const file of employeeWizard.files) {
      addDocumentMetadata({
        ownerType: 'person',
        ownerId: employeeWizard.draft.name || 'new-person',
        category: 'Employee Onboarding',
        file,
      });
    }
    resetEmployeeWizard();
    drawer.classList.remove('open');
    activeTab = 'people';
    render();
  }

  function finishCompanyWizard() {
    const draft = companyWizard.draft;
    updateOrganization({
      legalName:
        draft.legalName || readEnterpriseState().organization.legalName,
      dba: draft.dba || '',
      companyType: draft.companyType || 'Motor Carrier / Logistics',
      primaryLocation: draft.primaryLocation || '',
      modes: String(draft.modes || '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      onboardingStep: 7,
      status: 'READY_FOR_REVIEW',
      operations: draft.operations || '',
      primaryAdmin: {
        name: draft.adminName || '',
        email: draft.adminEmail || '',
      },
    });
    for (const file of companyWizard.files) {
      addDocumentMetadata({
        ownerType: 'organization',
        ownerId: 'org-demo',
        category: 'Organization Onboarding',
        file,
      });
    }
    advanceOrganizationOnboarding(7);
    companyWizard = { step: 7, draft: { ...draft }, files: [] };
    drawer.classList.remove('open');
    activeTab = 'overview';
    render();
  }

  function openDrawer(markup) {
    drawer.innerHTML = markup;
    drawer.classList.add('open');
    const employeeForm = drawer.querySelector('[data-form="employee"]');
    employeeForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(employeeForm);
      addPerson(Object.fromEntries(data.entries()));
      for (const file of employeeForm.elements.files?.files || [])
        addDocumentMetadata({
          ownerType: 'person',
          ownerId: 'new-person',
          category: 'Employee Onboarding',
          file,
        });
      drawer.classList.remove('open');
      activeTab = 'people';
      render();
    });
    const equipmentForm = drawer.querySelector('[data-form="equipment"]');
    equipmentForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(equipmentForm);
      addEquipment(Object.fromEntries(data.entries()));
      for (const file of equipmentForm.elements.files?.files || [])
        addDocumentMetadata({
          ownerType: 'equipment',
          ownerId: 'new-equipment',
          category: 'Equipment Intake',
          file,
        });
      drawer.classList.remove('open');
      activeTab = 'equipment';
      render();
    });
    const accountForm = drawer.querySelector('[data-form="account"]');
    accountForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      addAccount(Object.fromEntries(new FormData(accountForm).entries()));
      drawer.classList.remove('open');
      activeTab = 'crm';
      render();
    });
  }

  root.addEventListener('click', (event) => {
    const tabButton = event.target.closest('[data-tab]');
    if (tabButton) {
      activeTab = tabButton.dataset.tab;
      render();
      return;
    }

    const employeeNext = event.target.closest('[data-wizard-next="employee"]');
    if (employeeNext) {
      const form = drawer.querySelector('[data-wizard-form="employee"]');
      if (form && !form.reportValidity()) return;
      mergeWizardForm(employeeWizard, form);
      employeeWizard.step = Math.min(4, employeeWizard.step + 1);
      renderEmployeeWizard();
      return;
    }
    const employeeBack = event.target.closest('[data-wizard-back="employee"]');
    if (employeeBack) {
      mergeWizardForm(
        employeeWizard,
        drawer.querySelector('[data-wizard-form="employee"]'),
      );
      employeeWizard.step = Math.max(1, employeeWizard.step - 1);
      renderEmployeeWizard();
      return;
    }
    if (event.target.closest('[data-wizard-finish="employee"]')) {
      finishEmployeeWizard();
      return;
    }

    const companyNext = event.target.closest('[data-wizard-next="company"]');
    if (companyNext) {
      const form = drawer.querySelector('[data-wizard-form="company"]');
      if (form && !form.reportValidity()) return;
      mergeWizardForm(companyWizard, form);
      companyWizard.step = Math.min(7, companyWizard.step + 1);
      advanceOrganizationOnboarding(companyWizard.step);
      renderCompanyWizard();
      render();
      return;
    }
    const companyBack = event.target.closest('[data-wizard-back="company"]');
    if (companyBack) {
      mergeWizardForm(
        companyWizard,
        drawer.querySelector('[data-wizard-form="company"]'),
      );
      companyWizard.step = Math.max(1, companyWizard.step - 1);
      advanceOrganizationOnboarding(companyWizard.step);
      renderCompanyWizard();
      render();
      return;
    }
    if (event.target.closest('[data-wizard-finish="company"]')) {
      finishCompanyWizard();
      return;
    }

    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    if (action === 'close-workspace') {
      root.classList.remove('open');
      return;
    }
    if (action === 'close-drawer') {
      drawer.classList.remove('open');
      return;
    }
    if (action === 'open-tab') {
      activeTab = button.dataset.tab || 'overview';
      render();
      return;
    }
    if (action === 'onboard-person') {
      resetEmployeeWizard();
      renderEmployeeWizard();
      return;
    }
    if (action === 'onboard-equipment') {
      openDrawer(equipmentDrawer());
      return;
    }
    if (action === 'new-account') {
      openDrawer(accountDrawer());
      return;
    }
    if (action === 'view-person') {
      const state = readEnterpriseState();
      const row = state.people.find(
        (item) => item.id === button.dataset.personId,
      );
      if (row) openDrawer(personDrawer(row, state));
      return;
    }
    if (action === 'view-equipment') {
      const row = readEnterpriseState().equipment.find(
        (item) => item.id === button.dataset.equipmentId,
      );
      if (row) openDrawer(equipmentDetailDrawer(row));
      return;
    }
    if (action === 'view-account') {
      const row = readEnterpriseState().crm.accounts.find(
        (item) => item.id === button.dataset.accountId,
      );
      if (row) openDrawer(accountDetailDrawer(row));
      return;
    }
    if (action === 'company-onboarding') {
      resetCompanyWizard();
      renderCompanyWizard();
      return;
    }
    if (action === 'connect-integration') {
      markIntegration(button.dataset.id, 'CONNECTOR_NOT_BOUND');
      button.textContent = 'Connector required';
      render();
      return;
    }
    if (action === 'locate-account') {
      root.classList.remove('open');
      onLocate?.({ query: button.dataset.location, name: button.dataset.name });
    }
  });

  render();

  return {
    root,
    open(tab = 'overview') {
      activeTab = tab;
      root.classList.add('open');
      render();
    },
    close() {
      root.classList.remove('open');
      drawer.classList.remove('open');
    },
    isOpen() {
      return root.classList.contains('open');
    },
    openPeople() {
      this.open('people');
    },
    openEquipment() {
      this.open('equipment');
    },
    openCrm() {
      this.open('crm');
    },
    openDocuments() {
      this.open('documents');
    },
    openIntegrations() {
      this.open('integrations');
    },
    startEmployeeOnboarding() {
      this.open('people');
      resetEmployeeWizard();
      renderEmployeeWizard();
    },
    startCompanyOnboarding() {
      this.open('overview');
      resetCompanyWizard();
      renderCompanyWizard();
    },
    startEquipmentOnboarding() {
      this.open('equipment');
      openDrawer(equipmentDrawer());
    },
    startAccountIntake() {
      this.open('crm');
      openDrawer(accountDrawer());
    },
    getSummary: summarizeEnterpriseState,
    destroy() {
      root.remove();
    },
  };
}
