import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {PLAY_SHARE_ALT, PLAY_SHARE_IMAGE} from '../worker/play-gallery.mjs';
const rules=fs.readFileSync('static/_redirects','utf8').split('\n').map(l=>l.trim().split(/\s+/)).filter(l=>l[0]&&!l[0].startsWith('#'));
test('/play holo and book-cover assets redirect to the R2 copies (studio-tracker #131)',()=>{
  for(const dir of ['holo','books']){
    const r=rules.find(l=>l[0]===`/play/${dir}/*`);
    assert.ok(r,`rule for /play/${dir}/*`);
    assert.equal(r[1],`https://img.tjm.art/play/${dir}/:splat`);
    assert.equal(r[2],'301');
  }
});
test('the /play share card is the hex START courtyard JPEG, and the October file stays',async()=>{
  const jpeg=fs.readFileSync('static/play/share-start-2026-11-04.jpg');
  assert.equal(jpeg.readUInt16BE(0),0xffd8);
  assert.deepEqual(jpegSize(jpeg),{width:1200,height:630});
  assert.ok(fs.existsSync('static/play/share-start-2026-10-20.jpg'));
  assert.equal(PLAY_SHARE_IMAGE,'https://tjm.art/play/share-start-2026-11-04.jpg');
  assert.match(PLAY_SHARE_ALT,/START courtyard/);
});
function jpegSize(buf){
  let i=2;
  while(i+8<buf.length){
    if(buf[i]!==0xff)break;
    const marker=buf[i+1];
    const len=buf.readUInt16BE(i+2);
    if(marker>=0xc0&&marker<=0xcf&&marker!==0xc4&&marker!==0xc8&&marker!==0xcc)return{height:buf.readUInt16BE(i+5),width:buf.readUInt16BE(i+7)};
    i+=2+len;
  }
  throw new Error('jpeg size missing');
}
test('static /play has no Quake HTML; proxied entry HTML gets lang from the Worker',async()=>{
  const walk=d=>fs.existsSync(d)?fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):e.name.endsWith('.html')?[path.join(d,e.name)]:[]):[];
  assert.deepEqual(walk('static/play'),[]);
  const {ensurePlayLang}=await import('../worker/play-gallery.mjs');
  assert.equal(ensurePlayLang('<html><head></head>'),'<html lang="en"><head></head>');
});
