/*
REGION: LeeWay Logistics / World Runtime
TAG: LEEWAY.LOGISTICS.WORLD.RUNTIME.LOCAL_ADAPTER
5WH:
WHAT = Thin Node HTTP adapter for the canonical LeeWay World handler.
WHY = Runs the same provider spine locally without duplicating provider logic.
WHO = LeeWay Industries / Agent Lee under Creator authority.
WHERE = apps/transit-world/server/deployment/localWorld.js
WHEN = Local validation, workstation service, or an authorized HTTPS tunnel.
HOW = Node http.Server delegates every request to createVercelWorldHandler().
LICENSE = MIT, matching this repository.
*/
import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createVercelWorldHandler } from './vercelWorld.js';

function validPort(value) {
  return Number.isInteger(value) && value >= 0 && value <= 65535;
}

export function createLocalWorldServer({
  env = process.env,
  handler = createVercelWorldHandler({ env }),
} = {}) {
  return http.createServer((req, res) => {
    Promise.resolve(handler(req, res)).catch((error) => {
      console.error(
        '[LeeWay World Local Adapter]',
        error?.message || String(error),
      );
      if (res.writableEnded) return;
      res.writeHead(503, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      });
      res.end(JSON.stringify({ error: 'LeeWay World runtime unavailable.' }));
    });
  });
}

export async function listenLocalWorld({
  env = process.env,
  host = env.LEEWAY_WORLD_HOST || '127.0.0.1',
  port = Number(env.LEEWAY_WORLD_PORT || 4176),
  handler,
} = {}) {
  if (!validPort(port)) throw new TypeError('LEEWAY_WORLD_PORT must be 0-65535.');
  const server = createLocalWorldServer({ env, handler });
  await new Promise((resolve, reject) => {
    const fail = (error) => {
      server.off('listening', ready);
      reject(error);
    };
    const ready = () => {
      server.off('error', fail);
      resolve();
    };
    server.once('error', fail);
    server.once('listening', ready);
    server.listen(port, host);
  });
  return server;
}

const invoked =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (invoked) {
  const server = await listenLocalWorld();
  const address = server.address();
  const printable =
    typeof address === 'object' && address
      ? `${address.address}:${address.port}`
      : String(address);
  console.log(`[LeeWay World Runtime] listening on ${printable}`);

  const close = () => {
    server.close(() => process.exit(0));
  };
  process.once('SIGINT', close);
  process.once('SIGTERM', close);
}
