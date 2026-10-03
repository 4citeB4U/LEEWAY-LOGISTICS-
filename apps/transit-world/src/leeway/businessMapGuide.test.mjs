import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mountBusinessMapGuide } from './businessMapGuide.js';
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
test('Settings link preserves the deployed subpath, opens separately and cleans up', () => {
  const root = { children: [], ownerDocument: { createElement(tag) { return { tag, remove() { root.children = root.children.filter(x => x !== this); } }; } }, appendChild(node) { this.children.push(node); } };
  const guide = mountBusinessMapGuide({ root, baseUrl: '/LEEWAY-LOGISTICS-/' });
  assert.equal(root.children.length, 1);
  assert.equal(root.children[0].href, '/LEEWAY-LOGISTICS-/business-map-guide.html');
  assert.equal(root.children[0].target, '_blank');
  assert.equal(root.children[0].rel, 'noopener');
  guide.destroy(); assert.equal(root.children.length, 0);
});
test('business sidebar and settings guide are wired without duplicate business launchers', () => {
  const source = read('./enterpriseShell.js');
  const header = source.slice(source.indexOf('<header class="lws-top">'), source.indexOf('</header>',source.indexOf('<header class="lws-top">')));
  assert.match(header, /leeway-approved-logo\.jpg/);
  assert.match(header, /aria-controls="business-sidebar"/);
  for (const action of ['map','layers','workspace','capabilities']) assert.ok(!header.includes(`data-action="${action}"`), `${action} is not duplicated in header`);
  const dock = source.slice(source.indexOf('<nav class="lws-dock">'), source.indexOf('</nav>',source.indexOf('<nav class="lws-dock">')));
  for (const action of ['operations','transit','freight','rail']) assert.ok(!dock.includes(`['${action}',`), `${action} not duplicated in dock`);
  assert.match(source, /mountBusinessMapGuide\(\{ root: mapToolsPanel\.root \}\)/);
  assert.match(source, /businessGuide\.destroy\(\)/);
  const css = read('./businessShellLayout.css');
  assert.match(css, /\.lws-rail\s*\{\s*display:flex/);
  assert.match(css, /@media\(max-width:700px\)/);
});
test('print guide includes a keyboard/browser print fallback and source-qualified legend', () => {
  const html = read('../../public/business-map-guide.html');
  assert.match(html, /@media print/); assert.match(html, /Print \/ Save as PDF/);
  assert.match(html, /not live video/); assert.match(html, /Dot motion may be simulated/);
  assert.match(html, /unavailable arrival data/); assert.match(html, /#2ecc71/); assert.match(html, /#f0b23e/); assert.match(html, /#e05252/);
  assert.match(read('../../public/business-map-guide.js'), /window\.print\(\)/);
});
