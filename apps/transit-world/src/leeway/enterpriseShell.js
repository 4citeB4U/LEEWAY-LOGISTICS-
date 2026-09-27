import * as Cesium from 'cesium';
import { mountEnterpriseWorkspace } from './enterpriseWorkspace.js';
import { readEnterpriseState } from './enterpriseStore.js';

function ensureStyles(documentRef) {
  if (documentRef.getElementById('leeway-enterprise-shell-styles')) return;
  const style = documentRef.createElement('style');
  style.id = 'leeway-enterprise-shell-styles';
  style.textContent = `
    body.leeway-enterprise-shell #title-bar,
    body.leeway-enterprise-shell #style-indicator,
    body.leeway-enterprise-shell #top-center-actions,
    body.leeway-enterprise-shell #command-dock,
    body.leeway-enterprise-shell #left-panel-stack,
    body.leeway-enterprise-shell #first-run-launcher { display:none !important; }
    body.leeway-enterprise-shell #leeway-agent-lee { display:none; }
    body.leeway-enterprise-shell #leeway-agent-lee.leeway-open { display:block; left:98px; bottom:92px; width:min(430px,calc(100vw - 120px)); }
    #leeway-world-shell { position:fixed; inset:0; z-index:9700; pointer-events:none; color:#edfaff; font:12px/1.35 Inter,ui-sans-serif,system-ui,sans-serif; }
    #leeway-world-shell * { box-sizing:border-box; }
    .lws-top { pointer-events:auto; position:absolute; top:0; left:0; right:0; height:64px; display:grid; grid-template-columns:390px minmax(280px,650px) 1fr; align-items:center; gap:18px; padding:0 20px; background:rgba(2,12,20,.94); border-bottom:1px solid rgba(62,211,236,.20); backdrop-filter:blur(16px); }
    .lws-brand { display:flex; gap:12px; align-items:center; min-width:0; }
    .lws-mark { width:40px; height:40px; border:1px solid #3ee5f2; border-radius:50%; display:grid; place-items:center; color:#72f3ff; font-weight:800; }
    .lws-brand strong { display:block; font-size:17px; letter-spacing:.23em; white-space:nowrap; }
    .lws-brand span { display:block; margin-top:3px; font-size:8px; letter-spacing:.22em; opacity:.48; white-space:nowrap; }
    .lws-search { position:relative; }
    .lws-search input { width:100%; height:42px; padding:0 44px 0 42px; border-radius:12px; border:1px solid rgba(119,210,229,.24); background:rgba(9,25,36,.86); color:#eaffff; outline:none; font:inherit; }
    .lws-search input:focus { border-color:#47e5f4; box-shadow:0 0 0 2px rgba(71,229,244,.08); }
    .lws-search:before { content:'⌕'; position:absolute; left:15px; top:7px; font-size:23px; opacity:.68; }
    .lws-search kbd { position:absolute; right:10px; top:10px; font-size:9px; padding:4px 6px; border-radius:6px; border:1px solid rgba(255,255,255,.10); opacity:.55; }
    .lws-top-actions { justify-self:end; display:flex; gap:8px; align-items:center; }
    .lws-chip { pointer-events:auto; border:1px solid transparent; background:transparent; color:#d9edf2; padding:9px 10px; border-radius:10px; cursor:pointer; font:inherit; white-space:nowrap; }
    .lws-chip:hover { border-color:rgba(69,224,241,.22); background:rgba(69,224,241,.05); }
    .lws-avatar { width:36px; height:36px; border:1px solid rgba(72,227,241,.55); border-radius:50%; display:grid; place-items:center; font-weight:700; }
    .lws-agent-status { font-size:9px; color:#59f0ac; margin-left:-3px; }
    .lws-rail { pointer-events:auto; position:absolute; top:78px; left:10px; bottom:18px; width:72px; padding:8px; border-radius:15px; background:rgba(3,14,23,.92); border:1px solid rgba(78,217,238,.22); backdrop-filter:blur(14px); display:flex; flex-direction:column; gap:4px; }
    .lws-nav { border:0; background:transparent; color:#c8dbe2; border-radius:10px; padding:9px 4px; min-height:60px; display:grid; place-items:center; gap:4px; cursor:pointer; font:inherit; font-size:9px; }
    .lws-nav .i { font-size:19px; line-height:1; }
    .lws-nav:hover,.lws-nav.active { color:#70f2ff; background:rgba(52,219,239,.10); box-shadow:inset 3px 0 0 #2ce3f3; }
    .lws-spacer { flex:1; }
    .lws-dock { pointer-events:auto; position:absolute; left:50%; bottom:18px; transform:translateX(-50%); min-height:66px; display:flex; align-items:center; gap:3px; padding:7px 10px; border-radius:23px; background:rgba(3,15,24,.94); border:1px solid rgba(74,215,236,.20); backdrop-filter:blur(16px); box-shadow:0 18px 55px rgba(0,0,0,.35); }
    .lws-dock-btn { min-width:70px; border:0; background:transparent; color:#d7e8ed; padding:8px 8px; border-radius:12px; cursor:pointer; font:inherit; font-size:9px; }
    .lws-dock-btn .i { display:block; color:#7feeff; font-size:18px; margin-bottom:4px; }
    .lws-dock-btn:hover { background:rgba(66,225,242,.08); }
    .lws-ai { width:88px; height:88px; margin:-18px 4px; border-radius:50%; border:1px solid #43ecfa; background:radial-gradient(circle at 50% 35%,rgba(61,226,245,.20),rgba(4,20,31,.96) 62%); box-shadow:0 0 25px rgba(42,223,241,.22); color:#fff; cursor:pointer; display:grid; place-items:center; align-content:center; }
    .lws-ai strong { font-size:10px; } .lws-ai span { font-size:8px; color:#7feeff; }
    .lws-live { position:absolute; left:98px; bottom:22px; pointer-events:auto; display:flex; gap:8px; align-items:center; padding:9px 12px; border:1px solid rgba(255,255,255,.10); border-radius:12px; background:rgba(3,15,24,.86); cursor:pointer; }
    .lws-live b { color:#57f1a9; font-size:9px; } .lws-live span { opacity:.56; font-size:9px; }
    .lws-layer-menu { pointer-events:auto; position:absolute; top:76px; left:94px; width:260px; padding:12px; border-radius:14px; background:rgba(3,15,24,.96); border:1px solid rgba(68,221,241,.22); box-shadow:0 18px 55px rgba(0,0,0,.35); backdrop-filter:blur(16px); display:none; }
    .lws-layer-menu.open { display:block; }
    .lws-layer-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
    .lws-layer-head strong { font-size:11px; letter-spacing:.12em; }
    .lws-layer-row { width:100%; border:0; background:transparent; color:#d7e8ed; padding:9px 8px; border-radius:9px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; font:inherit; }
    .lws-layer-row:hover { background:rgba(66,225,242,.07); }
    .lws-layer-state { font-size:8px; letter-spacing:.08em; opacity:.58; }
    .lws-layer-row.on .lws-layer-state { color:#54efae; opacity:1; }
    .lws-layer-row.unavailable { opacity:.38; cursor:default; }
    .lws-layer-group { margin:10px 6px 4px; font-size:8px; letter-spacing:.14em; color:#69e9f7; opacity:.72; }
    .lws-layer-id { display:block; margin-top:2px; font-size:7px; opacity:.38; }
    body.leeway-enterprise-shell #leeway-transit-world { top:76px; right:12px; width:min(425px,calc(100vw - 106px)); max-height:calc(100vh - 94px); border-radius:15px; z-index:9780; }
    body.leeway-enterprise-shell #leeway-transit-world .ltw-title { font-size:15px; }
    body.leeway-enterprise-shell #leeway-transit-world .ltw-section { padding:11px 14px; }
    body.leeway-enterprise-shell #leeway-transit-world .ltw-section h3 { font-size:9px; }
    body.leeway-enterprise-shell #leeway-transit-world [data-action="world-awareness"] { display:none; }
    .lws-toast { position:absolute; top:76px; left:50%; transform:translateX(-50%); opacity:0; pointer-events:none; padding:9px 14px; border-radius:10px; background:#071722; border:1px solid rgba(64,221,238,.24); transition:opacity .2s; }
    .lws-toast.show { opacity:1; }
    @media(max-width:1000px){.lws-top{grid-template-columns:270px 1fr}.lws-top-actions .hide-sm{display:none}.lws-brand strong{font-size:13px}.lws-brand span{display:none}.lws-dock-btn{min-width:58px}.lws-live{display:none}}
  `;
  documentRef.head.appendChild(style);
}

function icon(name) {
  return ({map:'⌖',loads:'▣',drivers:'♙',fleet:'▰',transit:'▤',rail:'▥',facilities:'⌂',crm:'◇',intel:'▥',ai:'✦',layers:'▱',traffic:'▥',weather:'☁',freight:'▰',three:'◆',locate:'⌾'})[name] || '•';
}

export function mountEnterpriseShell(application) {
  if (document.getElementById('leeway-world-shell')) return null;
  ensureStyles(document);
  document.body.classList.add('leeway-enterprise-shell');

  const components = application.getComponents();
  const viewer = components.scene?.viewer;
  const dataManager = components.data?.dataManager;
  const mapStackController = components.scene?.mapStackController;
  const operations = components.scene?.operations;
  const agentPanel = () => document.getElementById('leeway-agent-lee');
  const layerCategoryOrder = ['Transportation', 'World Awareness', 'Infrastructure', 'Weather', 'Media / Context', 'Special'];
  const layerCategories = {
    traffic: 'Transportation',
    transit: 'Transportation',
    bikeshare: 'Transportation',
    directions: 'Transportation',
    flights: 'Transportation',
    military: 'Transportation',
    'local-adsb': 'Transportation',
    'ais-live-vessels': 'Transportation',
    cctv: 'World Awareness',
    earthquakes: 'World Awareness',
    'fire-perimeters': 'World Awareness',
    'local-firms': 'World Awareness',
    satellites: 'World Awareness',
    'rocket-launches': 'World Awareness',
    'military-awareness': 'World Awareness',
    'local-datacenters': 'Infrastructure',
    'local-dams': 'Infrastructure',
    'military-installations': 'Infrastructure',
    'osm-pipelines': 'Infrastructure',
    'telegeography-submarine-cables': 'Infrastructure',
    'alpr-cameras': 'Infrastructure',
    wind: 'Weather',
    'weather-radar': 'Weather',
    'weather-satellite': 'Weather',
    'weather-lightning': 'Weather',
    'weather-cyclones': 'Weather',
    radio: 'Media / Context',
    'recent-imagery': 'Media / Context',
    'bhote-koshi-2026': 'Special',
    'bhote-koshi-locator': 'Special',
  };

  const shell = document.createElement('div');
  shell.id = 'leeway-world-shell';
  shell.innerHTML = `
    <header class="lws-top">
      <div class="lws-brand"><div class="lws-mark">LW</div><div><strong>LEEWAY LOGISTICS</strong><span>WORLD-FIRST LOGISTICS OPERATING SYSTEM</span></div></div>
      <div class="lws-search"><input aria-label="Global search" placeholder="Search locations, loads, drivers, equipment, facilities..." /><kbd>⌘ K</kbd></div>
      <div class="lws-top-actions">
        <button class="lws-chip" data-action="map">◎ Transit World⌄</button>
        <button class="lws-chip hide-sm" data-action="layers">▱ Layers⌄</button>
        <button class="lws-chip hide-sm" data-action="workspace">CRM</button>
        <div class="lws-avatar">AL</div><div class="lws-agent-status">Agent Lee<br>LOCAL AI</div>
      </div>
    </header>
    <nav class="lws-rail">
      ${[['map','Map'],['loads','Loads'],['drivers','Drivers'],['fleet','Fleet'],['transit','Transit'],['rail','Rail'],['facilities','Facilities'],['crm','CRM'],['intel','Intelligence'],['ai','AI']].map(([id,label],i)=>`<button class="lws-nav ${i===0?'active':''}" data-nav="${id}"><span class="i">${icon(id)}</span><span>${label}</span></button>`).join('')}
      <div class="lws-spacer"></div>
      <button class="lws-nav" data-action="collapse"><span class="i">«</span><span>Collapse</span></button>
    </nav>
    <aside class="lws-layer-menu" data-layer-menu>
      <div class="lws-layer-head"><strong>WORLD LAYERS</strong><button class="lws-chip" data-action="close-layers">×</button></div>
      <div data-layer-list></div>
    </aside>
    <button class="lws-live" data-action="connect-world" type="button"><b data-world-led>● CHECK</b><span data-world-status>Connect live world data</span></button>
    <nav class="lws-dock">
      ${[['layers','Layers'],['traffic','Traffic'],['weather','Weather']].map(([id,label])=>`<button class="lws-dock-btn" data-dock="${id}"><span class="i">${icon(id)}</span>${label}</button>`).join('')}
      <button class="lws-ai" data-action="ai"><strong>Ask LeeWay</strong><span>Gemma 4 E4B</span></button>
      ${[['transit','Transit'],['freight','Freight'],['rail','Rail'],['three','3D'],['locate','Locate']].map(([id,label])=>`<button class="lws-dock-btn" data-dock="${id}"><span class="i">${icon(id)}</span>${label}</button>`).join('')}
    </nav>
    <div class="lws-toast" role="status" aria-live="polite"></div>
  `;
  document.body.appendChild(shell);

  const toast = shell.querySelector('.lws-toast');
  const layerMenu = shell.querySelector('[data-layer-menu]');
  const layerList = shell.querySelector('[data-layer-list]');
  const worldLed = shell.querySelector('[data-world-led]');
  const worldStatus = shell.querySelector('[data-world-status]');
  let toastTimer;

  function renderLayerMenu() {
    const rows = (dataManager?.getAll?.() || []).map((row) => ({
      ...row,
      category: layerCategories[row.id] || 'Special',
    }));

    const groups = new Map(layerCategoryOrder.map((name) => [name, []]));
    for (const row of rows) {
      if (!groups.has(row.category)) groups.set(row.category, []);
      groups.get(row.category).push(row);
    }

    layerList.innerHTML = [...groups.entries()]
      .filter(([, items]) => items.length)
      .map(([category, items]) => {
        const body = items
          .sort((a, b) => String(a.name || a.id).localeCompare(String(b.name || b.id)))
          .map((row) => {
            const enabled = Boolean(row.enabled);
            return `<button class="lws-layer-row ${enabled ? 'on' : ''}" data-shell-layer="${row.id}">
              <span>${row.name || row.id}<small class="lws-layer-id">${row.id}</small></span>
              <span class="lws-layer-state">${enabled ? 'ON' : 'OFF'}</span>
            </button>`;
          })
          .join('');
        return `<div class="lws-layer-group">${category}</div>${body}`;
      })
      .join('');
  }

  function toggleLayerMenu(open = null) {
    const next = open == null ? !layerMenu.classList.contains('open') : open;
    if (next) renderLayerMenu();
    layerMenu.classList.toggle('open', next);
  }

  function say(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function setWorldStatus(state, message) {
    const colors = {
      live: '#57f1a9',
      permission: '#ffd36b',
      offline: '#ff8c8c',
      checking: '#72eefa',
    };
    worldLed.style.color = colors[state] || colors.checking;
    worldLed.textContent =
      state === 'live'
        ? '● LIVE'
        : state === 'permission'
          ? '● PERMISSION'
          : state === 'offline'
            ? '● OFFLINE'
            : '● CHECK';
    worldStatus.textContent = message;
  }

  async function probeWorldProvider({ explain = false } = {}) {
    const bridge = globalThis.__leewayWorldApiBridge;
    if (!bridge?.installed || typeof bridge.probe !== 'function') {
      setWorldStatus('offline', 'Local live-data bridge not configured');
      if (explain) say('Live-world provider bridge is not configured in this build');
      return false;
    }

    setWorldStatus('checking', 'Checking LeeWay world providers…');
    const result = await bridge.probe();
    if (result.ok) {
      setWorldStatus('live', 'CCTV · world providers connected');
      if (explain) say('LeeWay live-world provider connected');
      return true;
    }

    const error = String(result.error || '');
    const permissionLikely =
      /permission|network|failed to fetch|load failed|blocked/i.test(error);
    if (permissionLikely) {
      setWorldStatus('permission', 'Click to allow local world data');
      if (explain) {
        say('Allow this site to access loopback/local network when your browser asks');
      }
    } else {
      setWorldStatus('offline', 'Start LeeWay World Providers');
      if (explain) say('Start the LeeWay World Provider runtime on this device');
    }
    return false;
  }

  async function locate(query) {
    if (!query || !viewer || !operations?.searchAndFlyTo) return false;
    try {
      const result = await operations.searchAndFlyTo(viewer, query, { waitForArrival: true });
      if (result?.ok === false) throw new Error(result.error || 'Location unavailable');
      say(`Flying to ${query}`);
      return true;
    } catch (error) {
      say(`Could not locate ${query}`);
      return false;
    }
  }

  const workspace = mountEnterpriseWorkspace({
    onLocate: ({ query, name }) => locate(query || name),
  });

  function setNav(id) {
    shell.querySelectorAll('[data-nav]').forEach((button) => button.classList.toggle('active', button.dataset.nav === id));
  }

  function toggleAgent(open = null) {
    const panel = agentPanel();
    if (!panel) return;
    const next = open == null ? !panel.classList.contains('leeway-open') : open;
    panel.classList.toggle('leeway-open', next);
    if (next) panel.querySelector('.lal-input')?.focus();
  }

  async function toggleLayer(id) {
    if (!dataManager?.layers?.has(id)) {
      say(`${id} layer is not available in this build`);
      return;
    }
    const layer = dataManager.getAll().find((row) => row.id === id);
    const nextEnabled = !layer?.enabled;
    await dataManager.setEnabled(id, nextEnabled, { origin: 'tool' });
    renderLayerMenu();
    say(`${layer?.name || id}: ${nextEnabled ? 'on' : 'off'}`);
  }

  async function handleSearch(value) {
    const q = String(value || '').trim();
    if (!q) return;
    const state = readEnterpriseState();
    const person = state.people.find((row) => row.name.toLowerCase().includes(q.toLowerCase()));
    if (person) { workspace.openPeople(); say(`Opened ${person.name} in People`); return; }
    const equipment = state.equipment.find((row) => row.unit.toLowerCase().includes(q.toLowerCase()));
    if (equipment) { workspace.openEquipment(); say(`Opened equipment ${equipment.unit}`); return; }
    const account = state.crm.accounts.find((row) => row.name.toLowerCase().includes(q.toLowerCase()));
    if (account) { workspace.openCrm(); say(`Opened ${account.name} in CRM`); return; }
    await locate(q);
  }

  shell.querySelector('.lws-search input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { void handleSearch(event.currentTarget.value); event.currentTarget.select(); }
  });

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); shell.querySelector('.lws-search input').focus();
    }
  });

  shell.addEventListener('click', async (event) => {
    const nav = event.target.closest('[data-nav]');
    const action = event.target.closest('[data-action]')?.dataset.action;
    const dock = event.target.closest('[data-dock]')?.dataset.dock;
    const layerButton = event.target.closest('[data-shell-layer]');

    if (layerButton) {
      await toggleLayer(layerButton.dataset.shellLayer);
      return;
    }

    if (nav) {
      const id = nav.dataset.nav; setNav(id);
      if (id === 'map') { workspace.close(); toggleAgent(false); return; }
      if (id === 'drivers') { workspace.openPeople(); return; }
      if (id === 'fleet') { workspace.openEquipment(); return; }
      if (id === 'facilities' || id === 'crm') { workspace.openCrm(); return; }
      if (id === 'loads') { workspace.open('overview'); say('Load board domain opened from enterprise command'); return; }
      if (id === 'transit') { workspace.close(); await toggleLayer('transit'); return; }
      if (id === 'rail') { workspace.close(); say('Rail operating view ready for rail provider binding'); return; }
      if (id === 'intel') { workspace.close(); toggleLayerMenu(true); return; }
      if (id === 'ai') { workspace.close(); toggleAgent(true); return; }
    }

    if (action === 'ai') { toggleAgent(); return; }
    if (action === 'connect-world') { await probeWorldProvider({ explain: true }); return; }
    if (action === 'map') { workspace.close(); setNav('map'); return; }
    if (action === 'workspace') { workspace.open(); return; }
    if (action === 'layers') { toggleLayerMenu(); return; }
    if (action === 'close-layers') { toggleLayerMenu(false); return; }
    if (action === 'collapse') { shell.querySelector('.lws-rail').classList.toggle('compact'); return; }

    if (dock === 'layers') { toggleLayerMenu(); return; }
    if (dock === 'traffic') { await toggleLayer('traffic'); return; }
    if (dock === 'weather') {
      for (const id of ['weather-radar','weather-satellite','weather-lightning']) if (dataManager?.layers?.has(id)) await dataManager.setEnabled(id, true, { origin:'tool' });
      say('Weather awareness requested'); return;
    }
    if (dock === 'transit') { await toggleLayer('transit'); return; }
    if (dock === 'freight') { workspace.open('overview'); say('Freight command workspace opened'); return; }
    if (dock === 'rail') { say('Rail provider binding is not yet verified'); return; }
    if (dock === 'three') {
      try { await mapStackController?.setStack?.('photoreal'); say('3D map stack requested'); } catch { say('3D map stack unavailable'); }
      return;
    }
    if (dock === 'locate') {
      if (!navigator.geolocation) { say('Device location unavailable'); return; }
      navigator.geolocation.getCurrentPosition(
        (position) => viewer?.camera?.flyTo?.({ destination: Cesium.Cartesian3.fromDegrees(position.coords.longitude, position.coords.latitude, 1800), duration:1.4 }),
        () => say('Location permission was not granted'),
      );
    }
  });

  return {
    root: shell,
    workspace,
    locate,
    openWorkspace: (tab='overview') => workspace.open(tab),
    openAgent: () => toggleAgent(true),
    closeAgent: () => toggleAgent(false),
    notify: say,
    destroy() {
      workspace.destroy();
      shell.remove();
      document.body.classList.remove('leeway-enterprise-shell');
    },
  };
}
