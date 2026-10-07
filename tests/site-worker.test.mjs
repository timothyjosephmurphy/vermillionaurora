import test from 'node:test';
import assert from 'node:assert/strict';
import worker, {hostRedirect} from '../worker/site.mjs';
const on={LEGACY_REDIRECT:'true',PRIMARY_HOST:'tjm.art'},off={LEGACY_REDIRECT:'false',PRIMARY_HOST:'tjm.art'};
const loc=(url,env)=>{const r=hostRedirect(new Request(url),env);return r&&[r.status,r.headers.get('Location')];};
test('legacy domains 301 to the same path and query on tjm.art when enabled',()=>{
  assert.deepEqual(loc('https://vermillionaurora.com/',on),[301,'https://tjm.art/']);
  assert.deepEqual(loc('https://vermillionaurora.com/products/painting-portrait-in-gold/?ref=ig&x=1',on),[301,'https://tjm.art/products/painting-portrait-in-gold/?ref=ig&x=1']);
  assert.deepEqual(loc('https://www.vermillionaurora.com/about/',on),[301,'https://tjm.art/about/']);
  assert.deepEqual(loc('http://vermillionaurora.com/home/story.html',on),[301,'https://tjm.art/home/story.html']);
});
test('hash-bound print and catalog files stay on the legacy domain',()=>{
  for(const p of ['/print-editions/a/b.jpg','/print-samples/abc.jpg','/print-masters/x.tif','/print-test/','/prints/test','/catalog/version.json'])assert.equal(loc('https://vermillionaurora.com'+p,on),null);
  assert.deepEqual(loc('https://vermillionaurora.com/print-editions-not/',on),[301,'https://tjm.art/print-editions-not/']);
});
test('nothing moves while the flag is off, except www.tjm.art to the apex',()=>{
  assert.equal(loc('https://vermillionaurora.com/about/',off),null);
  assert.equal(loc('https://tjm.art/about/',on),null);
  assert.deepEqual(loc('https://www.tjm.art/commissions/?a=1',off),[301,'https://tjm.art/commissions/?a=1']);
});
test('other requests are served by the assets binding',async()=>{
  const env={...off,ASSETS:{fetch:r=>new Response('asset:'+new URL(r.url).pathname)}};
  assert.equal(await (await worker.fetch(new Request('https://vermillionaurora.com/about/'),env)).text(),'asset:/about/');
  assert.equal((await worker.fetch(new Request('https://www.vermillionaurora.com/x/'),{...on,ASSETS:env.ASSETS})).status,301);
});
test('QuickBooks API paths on tjm.art go to the checkout Worker; public pages stay static',async()=>{
  const seen=[];const env={...off,ASSETS:{fetch:r=>new Response('asset')},CHECKOUT:{fetch:r=>{seen.push([r.method,r.url,r.headers.get('Cookie')]);return new Response('checkout');}}};
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/quickbooks/callback?code=c&state=s',{headers:{Cookie:'__Host-qbo-state=n'}}),env)).text(),'checkout');
  assert.deepEqual(seen[0],['GET','https://tjm.art/quickbooks/callback?code=c&state=s','__Host-qbo-state=n']);
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/quickbooks/start',{method:'POST'}),env)).text(),'checkout');
  for(const p of ['/quickbooks/','/quickbooks/disconnected/'])assert.equal(await (await worker.fetch(new Request('https://tjm.art'+p),env)).text(),'asset');
  assert.equal(await (await worker.fetch(new Request('https://vermillionaurora.com/quickbooks/callback'),env)).text(),'asset');
  assert.equal((await worker.fetch(new Request('https://tjm.art/quickbooks/connect'),{...env,CHECKOUT:undefined})).status,503);
});
