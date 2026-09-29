import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

test('business and personal are distinct installable entries with a live comparison', async () => {
  const [businessManifest, personalManifest, personalHtml, compareHtml, main] =
    await Promise.all([
      readFile(path.join(root, 'public/manifest.webmanifest'), 'utf8').then(
        JSON.parse,
      ),
      readFile(
        path.join(root, 'public/manifest-personal.webmanifest'),
        'utf8',
      ).then(JSON.parse),
      readFile(path.join(root, 'personal/index.html'), 'utf8'),
      readFile(path.join(root, 'compare.html'), 'utf8'),
      readFile(path.join(root, 'src/personalMain.js'), 'utf8'),
    ]);

  assert.equal(businessManifest.id, './');
  assert.equal(businessManifest.scope, './');
  assert.equal(personalManifest.id, './personal/');
  assert.equal(personalManifest.scope, './personal/');
  assert.equal(personalManifest.start_url, './personal/');
  assert.match(personalHtml, /LeeWay Maps — Personal World Navigation/);
  assert.match(main, /edition: 'personal'/);
  assert.match(main, /scope: 'personal\/'/);
  assert.match(compareHtml, /src="\.\/\?comparison=business"/);
  assert.match(compareHtml, /src="\.\/personal\/\?comparison=personal"/);
});
