/* Cache only the offline landing screen. Never intercept live APIs, tiles,
   locations, model files, TTS or route responses with stale data. */
const CACHE = 'leeway-logistics-offline-v3';
const base = self.registration.scope;
const offline = new URL('offline.html', base).href;
const offlineAssets = [
  'offline.html',
  'icon-192.png',
  'offlineTripCore.js',
  'offlineTripPage.js',
].map((path) => new URL(path, base).href);
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(offlineAssets)),
  );
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith('leeway-logistics-offline-') && key !== CACHE,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (event) => {
  if (
    event.request.method === 'GET' &&
    offlineAssets.includes(event.request.url)
  ) {
    event.respondWith(
      caches
        .match(event.request)
        .then((cached) => cached || fetch(event.request)),
    );
    return;
  }
  if (
    event.request.method !== 'GET' ||
    event.request.mode !== 'navigate' ||
    !event.request.url.startsWith(base)
  )
    return;
  // A cached online HTML shell without its bundles cannot start offline.
  // Bypass the HTTP cache; only the explicit offline document is the fallback.
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(() =>
      caches.match(offline),
    ),
  );
});
