import test from 'node:test';
import assert from 'node:assert/strict';

test('Pages CCTV frame and media URLs point directly at the LeeWay world provider', async () => {
  const previousLocation = globalThis.location;
  Object.defineProperty(globalThis, 'location', {
    configurable: true,
    value: new URL('https://4citeb4u.github.io/LEEWAY-LOGISTICS-/'),
  });

  try {
    const { createCctvSource } = await import('./source.js?test=pages-media');
    const source = createCctvSource({
      fetchImpl: async () => ({
        ok: true,
        async json() {
          return { sources: [], cameras: [] };
        },
      }),
    });
    const camera = {
      id: 'il-gateway-test',
      name: 'Chicago Test Camera',
      city: 'Chicago',
      lat: 41.88,
      lon: -87.64,
      headingDeg: 90,
      fovDeg: 55,
      pitchDeg: -18,
    };

    const frame = source.getFrameUrl(camera, 300000);
    const media = source.getMediaUrl(camera);

    assert.match(
      frame,
      /^http:\/\/127\.0\.0\.1:4176\/api\/cctv\/frame\/il-gateway-test\?/,
    );
    assert.match(
      media,
      /^http:\/\/127\.0\.0\.1:4176\/api\/cctv\/media\/il-gateway-test\?/,
    );
  } finally {
    if (previousLocation === undefined) delete globalThis.location;
    else {
      Object.defineProperty(globalThis, 'location', {
        configurable: true,
        value: previousLocation,
      });
    }
  }
});
