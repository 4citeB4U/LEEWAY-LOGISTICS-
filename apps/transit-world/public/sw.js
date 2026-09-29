/* Cache the installed application's static shell after an online visit. Never
   intercept live APIs, tiles, locations, model files, TTS, or route responses. */
const CACHE = 'leeway-logistics-offline-v4';
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
  const requestUrl = new URL(event.request.url);
  const sameOrigin = requestUrl.origin === self.location.origin;
  const staticAsset = sameOrigin && (
    requestUrl.pathname.startsWith(new URL('assets/', base).pathname) ||
    /\.(?:js|mjs|css|html|json|png|jpg|jpeg|svg|webp|ico|woff2?)$/i.test(requestUrl.pathname)
  );
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
  if (event.request.method === 'GET' && staticAsset) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE).then((cache) => cache.put(event.request, copy)));
        }
        return response;
      }).catch(() => caches.match(event.request)),
    );
    return;
  }
  if (
    event.request.method !== 'GET' ||
    event.request.mode !== 'navigate' ||
    !event.request.url.startsWith(base)
  )
    return;
  // Once the installed app has been opened online, its cached shell and its
  // cached Vite assets can reopen. Live layers and new routing still fail
  // honestly offline; the separate saved-trip screen remains the safe fallback.
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then((cache) => cache.put(event.request, copy)));
      }
      return response;
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match(offline))),
  );
});
