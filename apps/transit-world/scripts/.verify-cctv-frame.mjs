import http from 'node:http';
import handler from '../api/[...path].js';

const server = http.createServer((req, res) => {
  Promise.resolve(handler(req, res)).catch((error) => {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: String(error?.message || error) }));
  });
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

try {
  const catalogResponse = await fetch(origin + '/api/cctv/sources', {
    signal: AbortSignal.timeout(90000),
  });
  const catalogBody = await catalogResponse.json();
  const sources = Array.isArray(catalogBody)
    ? catalogBody
    : Array.isArray(catalogBody.sources)
      ? catalogBody.sources
      : [];
  console.log('CATALOG', JSON.stringify({
    status: catalogResponse.status,
    count: sources.length,
  }));

  let proof = null;
  const preferred = [
    ...sources.filter((row) => /caltrans|nyc|deldot|txdot|tfl/i.test(
      `${row.provider || ''} ${row.sourceKind || ''}`,
    )),
    ...sources,
  ];
  const seen = new Set();
  for (const camera of preferred) {
    if (!camera?.id || seen.has(camera.id)) continue;
    seen.add(camera.id);
    if (seen.size > 40) break;
    try {
      const response = await fetch(
        origin + '/api/cctv/frame/' + encodeURIComponent(camera.id),
        { signal: AbortSignal.timeout(15000) },
      );
      const contentType = response.headers.get('content-type') || '';
      const buffer = await response.arrayBuffer();
      if (response.ok && contentType.startsWith('image/') && buffer.byteLength > 1000) {
        proof = {
          id: camera.id,
          name: camera.name,
          provider: camera.provider,
          city: camera.city,
          status: response.status,
          contentType,
          bytes: buffer.byteLength,
          sourceHeader: response.headers.get('x-cctv-source'),
        };
        break;
      }
    } catch {}
  }
  console.log('FRAME_PROOF', JSON.stringify(proof));
  if (!proof) process.exitCode = 2;
} finally {
  server.close();
}
