import {
  getLanguage,
  setLanguage,
  languageOptions,
  mountLocaleLabels,
} from './experienceLocale.js';
import './experiencePreferences.css';

export function mountExperiencePreferences() {
  const root = document.createElement('section');
  root.className = 'lw-preferences';
  root.hidden = true;
  root.setAttribute('aria-label', 'Settings and system atlas');
  root.innerHTML = `<header><h2>Settings</h2><button type="button" data-close>Close</button></header>
    <h3>Welcome to LeeWay</h3><label>Which language do you prefer?<select aria-label="Preferred language">${languageOptions()}</select></label>
    <button type="button" data-apply>Apply language</button>
    <p data-coverage></p>
    <h3>Music</h3><label>Choose music from this device<input type="file" accept="audio/*" data-music /></label>
    <audio controls preload="metadata" hidden aria-label="Music player"></audio><p data-track translate="no"></p>
    <nav aria-label="Music apps"><a href="https://open.spotify.com/" target="_blank" rel="noopener">Spotify ↗</a><a href="https://music.youtube.com/" target="_blank" rel="noopener">YouTube Music ↗</a><a href="https://music.apple.com/" target="_blank" rel="noopener">Apple Music ↗</a></nav>
    <p data-music-note></p>
    <h3>System atlas</h3>
    <p class="lw-atlas-intro">Use this atlas to learn what every business icon, map layer, status, and multimodal view means before operating it.</p>
    <div class="lw-atlas-grid">
      <details><summary>Business navigation</summary><div class="lw-atlas-body">
        <b>▦ Map</b> live spatial operating surface · <b>▣ Loads</b> dispatch/load comparison · <b>♙ Drivers</b> people and driver profiles · <b>▰ Fleet</b> equipment and assignments · <b>▤ Transit</b> public transit operations · <b>▥ Rail</b> published rail/transit routes and reported vehicles · <b>✈ Air</b> public aircraft layer · <b>⚓ Marine</b> AIS vessel layer · <b>⌂ Facilities</b> customer/facility records · <b>◇ CRM</b> accounts, brokers, lanes and follow-up · <b>◎ Features</b> capability catalog · <b>▥ Intelligence</b> world layers · <b>⚙ Settings</b> preferences and atlas · <b>✦ Agent Lee</b> copilot.
      </div></details>
      <details><summary>CRM & business workspace</summary><div class="lw-atlas-body">
        <b>Command</b> company onboarding and operating summary · <b>People</b> employee/driver onboarding and evidence · <b>Equipment</b> tractors, trailers, buses, vans and assets · <b>Sales & CRM</b> customers, brokers, facilities, lanes, pipeline, activities and follow-up · <b>Documents</b> evidence metadata · <b>Integrations</b> governed system connections.
      </div></details>
      <details><summary>Public transit & rail</summary><div class="lw-atlas-body">
        Transit is split into independent <b>Routes</b>, <b>Stops & departures</b>, and <b>Reported vehicles</b>. Route geometry follows published/mapped networks; stops can show upcoming departures when an authoritative schedule source is available; vehicle dots are reported GPS fixes and are never presented as an ETA by themselves. Zoom into a city for local transit discovery. Rail uses the same published route/stop/vehicle authority until a dedicated rail-provider connector supplies richer operations.
      </div></details>
      <details><summary>Air & marine</summary><div class="lw-atlas-body">
        <b>Air</b> shows reported aircraft positions plus source-authorized enrichment such as registration, aircraft type, airline and origin/destination when available. Scheduled gates, terminals, takeoff/landing times must come from an authorized airport/airline source and are not inferred. <b>Marine</b> shows reported AIS vessels where the live source has coverage; ports and terminals remain separate place/facility context.
      </div></details>
      <details><summary>Layer & truth states</summary><div class="lw-atlas-body">
        <span class="lw-truth live">LIVE</span> source-reported now · <span class="lw-truth scheduled">SCHEDULED</span> published timetable · <span class="lw-truth mapped">MAPPED</span> network geometry without a live feed · <span class="lw-truth simulated">SIMULATED</span> training/replay only · <span class="lw-truth stale">STALE</span> last update is outside freshness policy · <span class="lw-truth unavailable">UNAVAILABLE</span> source/key/coverage missing. The interface must never silently promote mapped or simulated data to live.
      </div></details>
      <details><summary>Map interaction states</summary><div class="lw-atlas-body">
        <b>Default</b> icon or line · <b>Hover</b> quick context · <b>Selected</b> highlighted object · <b>Expanded</b> rich card · <b>Multi-select</b> compare objects · <b>Linked panel</b> full operational details. Colors communicate object type and operational status, not confidence.
      </div></details>
    </div>`;
  document.body.append(root);
  const language = root.querySelector('select'),
    audio = root.querySelector('audio');
  let mediaUrl;
  const coverage = {
    en: 'Map and voice controls are translated. Business workflows, guidance details and provider content are not fully translated yet. Voice availability depends on the selected service.',
    es: 'Los controles del mapa y de voz están traducidos. Los procesos empresariales, los detalles de navegación y el contenido de proveedores aún no están completamente traducidos. La voz depende del servicio elegido.',
    fr: 'Les commandes de carte et de voix sont traduites. Les processus métier, les détails du guidage et les contenus des fournisseurs ne sont pas encore entièrement traduits. La voix dépend du service choisi.',
    zh: '地图和语音控件已翻译。业务流程、导航详情和数据提供方内容尚未完全翻译。语音支持取决于所选服务。',
    ru: 'Элементы карты и голосового управления переведены. Бизнес-процессы, подробности навигации и данные поставщиков пока переведены не полностью. Голос зависит от выбранного сервиса.',
    mn: 'Газрын зураг болон дууны удирдлагыг орчуулсан. Бизнесийн үйл явц, чиглүүлэлтийн дэлгэрэнгүй мэдээлэл, нийлүүлэгчийн агуулгыг бүрэн орчуулаагүй. Дууны боломж сонгосон үйлчилгээнээс хамаарна.',
  };
  const musicNotes = {
    en: 'Device files stay on this device. Music apps open separately and keep their own login, playback and voice controls. Agent Lee does not control them.',
    es: 'Los archivos permanecen en este dispositivo. Las apps de música se abren por separado y conservan sus propios controles. Agent Lee no las controla.',
    fr: 'Les fichiers restent sur cet appareil. Les applications musicales s’ouvrent séparément et gardent leurs commandes. Agent Lee ne les contrôle pas.',
    zh: '本机文件保留在此设备上。音乐应用单独打开，使用各自的登录和播放控制。Agent Lee 不控制这些应用。',
    ru: 'Файлы остаются на устройстве. Музыкальные приложения открываются отдельно со своими средствами управления. Agent Lee ими не управляет.',
    mn: 'Файлууд төхөөрөмж дээрээ үлдэнэ. Хөгжмийн аппууд тусдаа нээгдэж, өөрийн удирдлагыг ашиглана. Agent Lee тэдгээрийг удирдахгүй.',
  };
  function refresh() {
    language.value = getLanguage().code;
    root.querySelector('[data-coverage]').textContent =
      coverage[language.value];
    root.querySelector('[data-music-note]').textContent =
      musicNotes[language.value];
  }
  const stopLabels = mountLocaleLabels();
  refresh();
  globalThis.addEventListener('leeway:language', refresh);
  root.querySelector('[data-apply]').addEventListener('click', () => {
    setLanguage(language.value);
    root.hidden = true;
  });
  root.querySelector('[data-close]').addEventListener('click', () => {
    root.hidden = true;
  });
  root.querySelector('[data-music]').addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    audio.pause();
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    mediaUrl = URL.createObjectURL(file);
    audio.src = mediaUrl;
    audio.hidden = false;
    root.querySelector('[data-track]').textContent = file.name;
  });
  // First-use language onboarding does not block the map or request location.
  try {
    if (!localStorage.getItem('leeway.language')) root.hidden = false;
  } catch {}
  return {
    open() {
      root.hidden = false;
      refresh();
      language.focus();
    },
    destroy() {
      audio.pause();
      if (mediaUrl) URL.revokeObjectURL(mediaUrl);
      stopLabels();
      globalThis.removeEventListener('leeway:language', refresh);
      root.remove();
    },
  };
}
