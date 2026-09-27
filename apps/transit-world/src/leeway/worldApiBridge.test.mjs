import test from 'node:test';
import assert from 'node:assert/strict';

test('GitHub Pages API requests resolve to the LeeWay local world provider', async () => {
  const previousLocation = globalThis.location;
  Object.defineProperty(globalThis, 'location', {
    configurable: true,
    value: new URL('https://4citeb4u.github.io/LEEWAY-LOGISTICS-/'),
  });
  try {
    const mod = await import('./worldApiBridge.js?test=pages');
    assert.equal(
      mod.resolveWorldApiUrl('/api/cctv/sources'),
      'http://127.0.0.1:4176/api/cctv/sources',
    );
    assert.equal(
      mod.resolveWorldApiUrl('/api/celestrak/stations'),
      'http://127.0.0.1:4176/api/celestrak/stations',
    );
    assert.equal(
      mod.resolveWorldApiUrl('https://example.com/api/test'),
      'https://example.com/api/test',
    );
  } finally {
    if (previousLocation === undefined) {
      delete globalThis.location;
    } else {
      Object.defineProperty(globalThis, 'location', {
        configurable: true,
        value: previousLocation,
      });
    }
  }
});

test('bridged Pages fetches declare loopback target address space', async () => {
  const previousLocation = globalThis.location;
  const previousFetch = globalThis.fetch;
  Object.defineProperty(globalThis, 'location', {
    configurable: true,
    value: new URL('https://4citeb4u.github.io/LEEWAY-LOGISTICS-/'),
  });

  const calls = [];
  const fakeFetch = async (input, init = {}) => {
    calls.push({ input: String(input), init });
    return { ok: true, status: 200 };
  };

  try {
    const mod = await import('./worldApiBridge.js?test=loopback');
    const bridge = mod.installWorldApiBridge({ fetchImpl: fakeFetch });
    await globalThis.fetch('/api/cctv/sources', { cache: 'no-store' });

    assert.equal(calls.length, 1);
    assert.equal(
      calls[0].input,
      'http://127.0.0.1:4176/api/cctv/sources',
    );
    assert.equal(calls[0].init.targetAddressSpace, 'loopback');

    bridge.restore();
  } finally {
    globalThis.fetch = previousFetch;
    if (previousLocation === undefined) {
      delete globalThis.location;
    } else {
      Object.defineProperty(globalThis, 'location', {
        configurable: true,
        value: previousLocation,
      });
    }
    delete globalThis.__leewayWorldApiBridge;
  }
});
