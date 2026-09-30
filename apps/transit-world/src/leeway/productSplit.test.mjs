import assert from 'node:assert/strict';
import {readFile, access} from 'node:fs/promises';
import {test} from 'node:test';
test('business ships no personal app entry, manifest or worker', async()=>{
 const root=new URL('../../',import.meta.url);
 for(const file of ['personal/index.html','src/personalMain.js','compare.html','public/manifest-personal.webmanifest','public/personal/sw-personal.js']) await assert.rejects(access(new URL(file,root)),{code:'ENOENT'});
 const manifest=JSON.parse(await readFile(new URL('public/manifest.webmanifest',root),'utf8'));
 assert.equal(manifest.scope,'./');
 const config=await readFile(new URL('server/standalone/vite.config.js',root),'utf8'); assert.doesNotMatch(config,/personal\/index|compare\.html/);
});
