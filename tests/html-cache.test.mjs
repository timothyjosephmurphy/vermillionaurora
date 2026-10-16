import test from 'node:test';import assert from 'node:assert/strict';
import {browserCopy,BROWSER_HTML} from '../worker/catalog-pages.mjs';
test('edge-cached catalog HTML is re-stamped so browsers always revalidate',async()=>{
  const r=browserCopy(new Response('<html>',{headers:{'Cache-Control':'public, max-age=86400','Content-Type':'text/html','Age':'50'}}));
  assert.equal(BROWSER_HTML,'public, max-age=0, must-revalidate');assert.equal(r.headers.get('Cache-Control'),BROWSER_HTML);assert.equal(r.headers.get('Age'),null);assert.equal(await r.text(),'<html>');
});
