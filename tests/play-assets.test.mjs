import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const rules=fs.readFileSync('static/_redirects','utf8').split('\n').map(l=>l.trim().split(/\s+/)).filter(l=>l[0]&&!l[0].startsWith('#'));
test('/play holo and book-cover assets redirect to the R2 copies (studio-tracker #131)',()=>{
  for(const dir of ['holo','books']){
    const r=rules.find(l=>l[0]===`/play/${dir}/*`);
    assert.ok(r,`rule for /play/${dir}/*`);
    assert.equal(r[1],`https://img.tjm.art/play/${dir}/:splat`);
    assert.equal(r[2],'301');
  }
});
test('every built /play HTML page declares a language (studio-tracker #131); user-scalable=no is intentional on the 3D galleries (#149)',()=>{
  const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):e.name.endsWith('.html')?[path.join(d,e.name)]:[]);
  const files=walk('static/play');
  assert.ok(files.length>0);
  for(const f of files)assert.match(fs.readFileSync(f,'utf8'),/<html[^>]*\slang="en"/,f);
});
