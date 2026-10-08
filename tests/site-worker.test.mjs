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
test('renamed product pages: one-hop 301 from the legacy domain, _redirects on tjm.art, no stale catalog ids',async()=>{
  const {PRODUCT_RENAMES,renamedProductPath}=await import('../worker/product-renames.mjs');
  const fs=await import('node:fs');
  const products=JSON.parse(fs.readFileSync('catalog/products.json','utf8'));
  const prints=JSON.parse(fs.readFileSync('catalog/prints.json','utf8')).artworks;
  const checkoutSlugs=fs.readFileSync('cloudflare/wrangler.jsonc','utf8');
  const redirects=fs.readFileSync('static/_redirects','utf8');
  const ids=new Set(products.map(p=>p.id));
  assert.ok(Object.keys(PRODUCT_RENAMES).length>0);
  for(const [old,next] of Object.entries(PRODUCT_RENAMES)){
    assert.ok(ids.has(next),`${next} is a product`);
    assert.ok(!ids.has(old),`${old} no longer a product id`);
    assert.ok(!Object.hasOwn(PRODUCT_RENAMES,next),'no redirect chains');
    // Hash-bound print records and live checkout identities keep their slugs.
    assert.ok(!Object.hasOwn(prints,old)&&!checkoutSlugs.includes(old),`${old} must not be print- or checkout-bound`);
    for(const path of [`/products/${old}/`,`/products/${old}`])
      assert.ok(redirects.includes(`${path} /products/${next}/ 301\n`),path);
    assert.deepEqual(loc(`https://vermillionaurora.com/products/${old}/?ref=ig`,on),[301,`https://tjm.art/products/${next}/?ref=ig`]);
    assert.deepEqual(loc(`https://www.vermillionaurora.com/products/${old}`,on),[301,`https://tjm.art/products/${next}/`]);
    assert.equal(renamedProductPath(`/products/${old}/extra/`),`/products/${old}/extra/`);
  }
  assert.deepEqual(loc('https://vermillionaurora.com/products/painting-shoreline-at-dusk/',on),[301,'https://tjm.art/products/painting-shoreline-at-dusk/']);
});
test('every Nostr scheduled-post product link resolves to a live product page',async()=>{
  const fs=await import('node:fs');
  const {posts}=await import('../nostr-publisher/src/posts.mjs');
  const slugs=new Set(JSON.parse(fs.readFileSync('catalog/products.json','utf8')).map(p=>p.slug));
  for(const post of posts){
    const slug=post.productUrl.match(/^\/products\/([a-z0-9-]+)\/$/)?.[1];
    if(slug)assert.ok(slugs.has(slug),`${post.id} links to ${post.productUrl}`);
  }
});
