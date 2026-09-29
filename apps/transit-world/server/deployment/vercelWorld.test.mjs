import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import {
  createMiddlewareRouter,
  createVercelWorldHandler,
} from './vercelWorld.js';

function response() {
  const res = new EventEmitter();
  res.headers = {};
  res.statusCode = 200;
  res.writableEnded = false;
  res.setHeader = (key, value) => {
    res.headers[String(key).toLowerCase()] = value;
  };
  res.writeHead = (status, headers = {}) => {
    res.statusCode = status;
    for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
  };
  res.end = (body = '') => {
    res.body = String(body ?? '');
    res.writableEnded = true;
  };
  return res;
}

test('router strips a mount prefix and restores the request URL', async () => {
  const router = createMiddlewareRouter();
  let seen = null;
  router.middlewares.use('/api/cctv', (req, res) => {
    seen = req.url;
    res.end('ok');
  });
  const req = { url: '/api/cctv/sources?city=milwaukee' };
  const res = response();
  assert.equal(await router.handle(req, res), true);
  assert.equal(seen, '/sources?city=milwaukee');
  assert.equal(req.url, '/api/cctv/sources?city=milwaukee');
});

test('world handler exposes health and GitHub Pages CORS', async () => {
  const handler = createVercelWorldHandler({
    env: {},
    plugins: [{ name: 'proof-provider', configureServer() {} }],
    sharedHandler() {
      throw new Error('shared handler should not run');
    },
  });
  const req = {
    method: 'GET',
    url: '/api/health',
    headers: { origin: 'https://4citeb4u.github.io' },
  };
  const res = response();
  await handler(req, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.headers['access-control-allow-origin'], 'https://4citeb4u.github.io');
  assert.deepEqual(JSON.parse(res.body).providers, ['proof-provider']);
});

test('world handler dispatches provider middleware', async () => {
  const plugin = {
    name: 'camera-proof',
    configureServer(server) {
      server.middlewares.use('/api/cctv', (req, res) => {
        assert.equal(req.url, '/sources');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ sources: [{ id: 'proof-1' }] }));
      });
    },
  };
  const handler = createVercelWorldHandler({
    env: {},
    plugins: [plugin],
    sharedHandler() {
      throw new Error('shared handler should not run');
    },
  });
  const req = { method: 'GET', url: '/api/cctv/sources', headers: {} };
  const res = response();
  await handler(req, res);
  assert.equal(res.statusCode, 200);
  assert.equal(JSON.parse(res.body).sources[0].id, 'proof-1');
});

test('unknown provider route returns a truthful 404', async () => {
  const handler = createVercelWorldHandler({
    env: {},
    plugins: [],
    sharedHandler() {},
  });
  const res = response();
  await handler({ method: 'GET', url: '/api/nope', headers: {} }, res);
  assert.equal(res.statusCode, 404);
});
