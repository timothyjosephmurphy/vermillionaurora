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
test('http on tjm.art upgrades to https with the same path and query',()=>{
  assert.deepEqual(loc('http://tjm.art/about/?a=1',off),[301,'https://tjm.art/about/?a=1']);
  assert.equal(loc('https://tjm.art/about/',off),null);
});
test('Apple Pay domain association is served on tjm.art, from Square when reachable and the snapshot otherwise',async()=>{
  const {applePayAssociation,APPLE_PAY_ASSOCIATION_PATH}=await import('../worker/site.mjs');
  const {APPLE_PAY_DOMAIN_ASSOCIATION}=await import('../worker/apple-pay-domain-association.mjs');
  assert.equal(APPLE_PAY_ASSOCIATION_PATH,'/.well-known/apple-developer-merchantid-domain-association');
  assert.match(APPLE_PAY_DOMAIN_ASSOCIATION,/^[0-9A-F]{1000,}$/);
  const fresh='AB'.repeat(600);
  assert.equal(await (await applePayAssociation(async()=>new Response(fresh))).text(),fresh);
  assert.equal(await (await applePayAssociation(async()=>{throw Error('offline');})).text(),APPLE_PAY_DOMAIN_ASSOCIATION);
  assert.equal(await (await applePayAssociation(async()=>new Response('<html>error</html>'))).text(),APPLE_PAY_DOMAIN_ASSOCIATION);
  const env={...off,ASSETS:{fetch:()=>new Response('asset')}};
  const r=await worker.fetch(new Request('https://tjm.art'+APPLE_PAY_ASSOCIATION_PATH),env);
  assert.equal(r.status,200);assert.match(r.headers.get('Content-Type'),/^text\/plain/);
});
test('fingerprinted /display/ and /_astro/ assets get a one-year immutable cache; pages keep the default',async()=>{
  const env={...off,ASSETS:{fetch:r=>new URL(r.url).pathname==='/missing/'?new Response('nf',{status:404}):new Response('x',{headers:{'Cache-Control':'public, max-age=0, must-revalidate','Content-Type':'image/webp'}})}};
  for(const p of ['/display/a-123-160.webp','/_astro/index.abc.css']){const r=await worker.fetch(new Request('https://tjm.art'+p),env);assert.equal(r.headers.get('Cache-Control'),'public, max-age=31536000, immutable',p);assert.equal(r.headers.get('Content-Type'),'image/webp');}
  for(const p of ['/','/gallery/','/gallery-images/a.jpg','/missing/'])assert.notEqual((await worker.fetch(new Request('https://tjm.art'+p),env)).headers.get('Cache-Control'),'public, max-age=31536000, immutable',p);
});
