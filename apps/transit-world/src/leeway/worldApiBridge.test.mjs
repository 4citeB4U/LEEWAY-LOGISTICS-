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
