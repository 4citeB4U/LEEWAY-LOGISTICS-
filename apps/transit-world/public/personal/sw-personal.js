const CACHE = 'leeway-maps-offline-v1';
const base = self.registration.scope;
const appBase = new URL('../', base);
const offline = new URL('offline.html', appBase).href;
const assets = ['offline.html', 'icon-192.png', 'offlineTripCore.js', 'offlineTripPage.js'].map((path) => new URL(path, appBase).href);
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(assets))));
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('leeway-maps-offline-') && key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const inScope = url.origin === self.location.origin && url.pathname.startsWith(new URL(base).pathname);
  if (event.request.method !== 'GET' || !inScope || url.pathname.startsWith(new URL('api/', appBase).pathname)) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(offline)));
    return;
  }
  if (url.pathname.includes('/assets/') || url.pathname.includes('/cesium/')) {
    event.respondWith(fetch(event.request).then((response) => { if (response.ok && response.type === 'basic') event.waitUntil(caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()))); return response; }).catch(() => caches.match(event.request)));
  }
});
