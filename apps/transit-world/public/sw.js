/* Cache only the offline landing screen. Never intercept live APIs, tiles,
   locations, model files, TTS or route responses with stale data. */
const CACHE = 'leeway-logistics-offline-v2';
const base = self.registration.scope;
const offline = new URL('offline.html', base).href;
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll([offline, new URL('icon-192.png', base).href]),
      ),
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
    (event.request.url === new URL('icon-192.png', base).href ||
      event.request.url === offline)
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
    fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(offline)),
  );
});
