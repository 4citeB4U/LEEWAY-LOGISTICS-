import { openSkyProxy } from '../providers/aircraft/opensky.js';
import { adsbLolProxy } from '../providers/aircraft/adsb-lol.js';
import { adsbdbProxy } from '../providers/aircraft/enrichment.js';
import { trackBackfillProxies } from '../providers/aircraft/tracks.js';
import { cctvProxy } from '../providers/cctv.js';
import { defaultSourceRoot } from '../providers/common/source-root.js';
import { transitProxy } from '../providers/transit.js';
import { weatherProxy } from '../providers/weather.js';
import { createVercelSharedHandler } from './vercelShared.js';

const DEFAULT_ALLOWED_ORIGINS = Object.freeze([
  'https://4citeb4u.github.io',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
]);

function pathnameOf(value) {
  return new URL(String(value || '/'), 'https://leeway.invalid').pathname;
}

function mountMatches(pathname, mount) {
  return pathname === mount || pathname.startsWith(`${mount}/`);
}

function strippedUrl(value, mount) {
  const incoming = new URL(String(value || '/'), 'https://leeway.invalid');
  const pathname = incoming.pathname.slice(mount.length) || '/';
  return `${pathname}${incoming.search}`;
}

export function createMiddlewareRouter() {
  const stack = [];
  const middlewares = {
    use(path, handler) {
      if (typeof path === 'function') {
        stack.push({ mount: null, handler: path });
        return;
      }
      if (typeof handler !== 'function')
        throw new TypeError('middleware handler required');
      const mount = String(path || '').replace(/\/$/, '');
      if (!mount.startsWith('/')) throw new TypeError('middleware path required');
      stack.push({ mount, handler });
    },
  };

  async function handle(req, res) {
    const originalUrl = req.url || '/';
    let index = 0;
    async function dispatch(error) {
      if (error) throw error;
      if (res.writableEnded) return true;
      while (index < stack.length) {
        const row = stack[index++];
        const pathname = pathnameOf(req.url);
        if (row.mount && !mountMatches(pathname, row.mount)) continue;
        const priorUrl = req.url;
        if (row.mount) req.url = strippedUrl(priorUrl, row.mount);
        let nextPromise = null;
        const next = (nextError) => {
          nextPromise = dispatch(nextError);
          return nextPromise;
        };
        try {
          await row.handler(req, res, next);
          if (nextPromise) await nextPromise;
        } finally {
          req.url = priorUrl;
        }
        return res.writableEnded;
      }
      return false;
    }
    try {
      return await dispatch();
    } finally {
      req.url = originalUrl;
    }
  }

  return { middlewares, handle, size: () => stack.length };
}

function allowedOrigins(env) {
  const configured = String(env.LEEWAY_ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...configured]);
}

function applyCors(req, res, env) {
  const origin = String(req.headers?.origin || '');
  const allowed = allowedOrigins(env);
  if (origin && allowed.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization,Range',
    );
    res.setHeader(
      'Access-Control-Expose-Headers',
      'Content-Range,Accept-Ranges,X-CCTV-Source,X-OpenSky-Auth,X-OpenSky-Cache,X-Flight-Source',
    );
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  return { origin, allowed: !origin || allowed.has(origin) };
}

export function createWorldPlugins({ sourceRoot = defaultSourceRoot } = {}) {
  return [
    openSkyProxy(),
    adsbLolProxy(),
    adsbdbProxy(),
    trackBackfillProxies(),
    cctvProxy({ sourceRoot }),
    weatherProxy(),
    transitProxy(),
  ];
}

function installPlugins(router, plugins) {
  const server = { middlewares: router.middlewares, httpServer: null };
  for (const plugin of plugins) {
    if (typeof plugin?.configureServer === 'function') plugin.configureServer(server);
  }
}

function json(res, status, body, extra = {}) {
  if (res.writableEnded) return;
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    ...extra,
  });
  res.end(JSON.stringify(body));
}

export function createVercelWorldHandler({
  env = process.env,
  plugins = createWorldPlugins(),
  sharedHandler = createVercelSharedHandler({ env }),
} = {}) {
  const router = createMiddlewareRouter();
  installPlugins(router, plugins);
  const providerNames = plugins.map((plugin) => plugin?.name).filter(Boolean);

  return async function vercelWorldHandler(req, res) {
    const cors = applyCors(req, res, env);
    if (req.method === 'OPTIONS') {
      if (!cors.allowed) return json(res, 403, { error: 'origin_not_allowed' });
      res.statusCode = 204;
      res.end();
      return;
    }

    const pathname = pathnameOf(req.url);
    if (pathname === '/api/health' || pathname === '/health') {
      return json(res, 200, {
        ok: true,
        service: 'leeway-world-runtime',
        providerCount: providerNames.length,
        providers: providerNames,
      });
    }

    if (
      pathname.startsWith('/api/peers/') ||
      pathname === '/api/hazard-reports' ||
      pathname === '/api/hazard-reports/status'
    ) {
      return sharedHandler(req, res);
    }

    try {
      const handled = await router.handle(req, res);
      if (!handled && !res.writableEnded)
        return json(res, 404, { error: 'Unknown LeeWay World endpoint.' });
    } catch (error) {
      console.error('[LeeWay World Runtime]', error?.message || String(error));
      return json(res, 503, { error: 'LeeWay World provider unavailable.' });
    }
  };
}
