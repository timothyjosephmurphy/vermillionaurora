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
test('production /play entry is the hex gallery; Quake files and R2 covers stay put', async () => {
  const { GALLERY_3D_URL } = await import('../src/data/gallery-entry.mjs');
  const { HEX_PLAY_ORIGIN } = await import('../worker/play-gallery.mjs');
  assert.equal(GALLERY_3D_URL, 'https://tjm.art/play/');
  const seen = [];
  const env = {
    ...off,
    ASSETS: { fetch: r => new Response('asset:' + new URL(r.url).pathname, { status: new URL(r.url).pathname.startsWith('/play/pbr/') ? 404 : 200 }) },
    HEX_FETCH: async (input, init) => {
      const href = typeof input === 'string' ? input : input.url;
      seen.push([href, init?.redirect]);
      if (String(href).endsWith('/play/index.html')) {
        return new Response(null, { status: 302, headers: { location: HEX_PLAY_ORIGIN + '/play/?from=index' } });
      }
      return new Response('hex-body', { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'content-encoding': 'gzip', 'content-length': '99' } });
    },
  };
  const entry = await worker.fetch(new Request('https://tjm.art/play/?key=layout'), env);
  assert.equal(entry.status, 200);
  assert.equal(await entry.text(), 'hex-body');
  assert.equal(entry.headers.get('content-encoding'), null);
  assert.deepEqual(seen[0], [HEX_PLAY_ORIGIN + '/play/?key=layout', 'manual']);
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/play'), env)).text(), 'hex-body');
  const rewritten = await worker.fetch(new Request('https://tjm.art/play/index.html'), env);
  assert.equal(rewritten.status, 302);
  assert.equal(rewritten.headers.get('location'), 'https://tjm.art/play/?from=index');
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/play/orsay/'), env)).text(), 'asset:/play/orsay/');
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/play/to-cart.html?from=tags&items=a'), env)).text(), 'asset:/play/to-cart.html');
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/play/pbr/floor_diff.webp'), env)).text(), 'hex-body');
  const holo = await worker.fetch(new Request('https://tjm.art/play/holo/still.jpg?v=1'), env);
  assert.equal(holo.status, 301);
  assert.equal(holo.headers.get('Location'), 'https://img.tjm.art/play/holo/still.jpg?v=1');
  for (const path of ['/gallery/room/', '/gallery/room']) {
    const r = await worker.fetch(new Request('https://tjm.art' + path + '?from=home'), env);
    assert.equal(r.status, 301, path);
    assert.equal(r.headers.get('Location'), GALLERY_3D_URL + '?from=home', path);
  }
  const fs = await import('node:fs');
  const rules = fs.readFileSync('static/_redirects', 'utf8').split('\n').map(l => l.trim().split(/\s+/)).filter(l => l[0] && !l[0].startsWith('#'));
  for (const path of ['/gallery/room/', '/gallery/room']) assert.deepEqual(rules.find(l => l[0] === path)?.slice(1), [GALLERY_3D_URL, '301']);
  for (const path of ['/play', '/play/', '/play/index.html']) assert.equal(rules.find(l => l[0] === path), undefined, path);
  assert.equal(rules.some(l => (l[1] || '').includes('tjm-tag-gallery-preview.pages.dev')), false);
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
test('newsletter signup on tjm.art is forwarded and fails closed without the checkout Worker',async()=>{
  const seen=[];const env={...off,ASSETS:{fetch:()=>new Response('asset')},CHECKOUT:{fetch:r=>{seen.push([r.method,new URL(r.url).pathname]);return Response.json({ok:true});}}};
  assert.equal((await worker.fetch(new Request('https://tjm.art/newsletter/subscribe',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'email=a@b.co'}),env)).status,200);
  assert.deepEqual(seen,[['POST','/newsletter/subscribe']]);
  assert.equal((await worker.fetch(new Request('https://tjm.art/newsletter/buttondown-webhook',{method:'POST',body:'{}'}),env)).status,200);
  assert.equal((await worker.fetch(new Request('https://tjm.art/newsletter/subscribe',{method:'POST'}),{...env,CHECKOUT:undefined})).status,503);
  assert.equal(await (await worker.fetch(new Request('https://vermillionaurora.com/newsletter/subscribe',{method:'POST'}),env)).text(),'asset');
});
test('sticker checkout on tjm.art is forwarded and fails closed without the checkout Worker',async()=>{
  const seen=[];const env={...off,ASSETS:{fetch:()=>new Response('asset')},CHECKOUT:{fetch:r=>{seen.push(new URL(r.url).pathname);return Response.json({ok:true,mode:'mock'});}}};
  assert.equal((await worker.fetch(new Request('https://tjm.art/checkout/stickers/order',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}),env)).status,200);
  assert.deepEqual(seen,['/checkout/stickers/order']);
  assert.equal((await worker.fetch(new Request('https://tjm.art/checkout/stickers/catalog'),{...env,CHECKOUT:undefined})).status,503);
  assert.equal(await (await worker.fetch(new Request('https://vermillionaurora.com/checkout/stickers/order'),env)).text(),'asset');
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
test('the Worker passes asset responses through untouched (cache headers now come from a zone rule)',async()=>{
  const env={...off,ASSETS:{fetch:()=>new Response('x',{headers:{'Cache-Control':'public, max-age=0, must-revalidate','Content-Type':'image/webp'}})}};
  for(const p of ['/display/a-123-160.webp','/_astro/index.abc.css','/gallery-images/a.jpg']){const r=await worker.fetch(new Request('https://tjm.art'+p),env);assert.equal(r.headers.get('Cache-Control'),'public, max-age=0, must-revalidate',p);}
});
test('static headers allow revalidation but never long-lived caching of error responses',async()=>{
  const fs=await import('node:fs');
  for(const path of ['static/_headers','dist/_headers']){
    if(!fs.existsSync(path))continue;
    const headers=fs.readFileSync(path,'utf8');
    // _headers rules match URLs, not response status. Revalidation/no-transform
    // is safe on a 404; positive cache lifetimes and immutable are not.
    for(const [,value] of headers.matchAll(/^[ \t]+cache-control:[ \t]*(.*)$/gim)){
      assert.doesNotMatch(value,/(?:^|,)\s*immutable\s*(?:,|$)/i,`${path}: immutable belongs in the status-aware zone rule`);
      for(const [,directive,seconds] of value.matchAll(/(?:^|,)\s*(s-maxage|max-age)\s*=\s*"?(\d+)"?/gi)){
        assert.equal(Number(seconds),0,`${path}: ${directive} must not cache error responses`);
      }
    }
  }
});
test('gallery frames keep their revalidating no-transform header in the built assets',async()=>{
  const fs=await import('node:fs');
  const source=fs.readFileSync('static/_headers','utf8');
  assert.match(source,/^\/play\/g\/\*\r?\n[ \t]+Cache-Control: public, max-age=0, must-revalidate, no-transform\s*$/m);
  if(fs.existsSync('dist/index.html'))assert.equal(fs.readFileSync('dist/_headers','utf8'),source,'the build must preserve the gallery analytics header');
});
test('long-cache headers remain a zone rule limited to successful asset responses',async()=>{
  const fs=await import('node:fs');
  const doc=fs.readFileSync('docs/static-bypass-zone-rules.md','utf8');
  const expr=doc.match(/^CACHE_RULE_EXPRESSION: (.+)$/m)?.[1];
  assert.ok(expr,'the doc records the cache rule expression');
  assert.match(expr,/http\.response\.code eq 200/);
  assert.deepEqual([...expr.matchAll(/starts_with\(http\.request\.uri\.path, "([^"]+)"\)/g)].map(m=>m[1]),['/_astro/','/display/']);
  assert.ok(doc.includes('Cache-Control: public, max-age=31536000, immutable')&&doc.includes('dabd690a6a4a455384558b3b19d278f8'));
});
const globRe=(pattern)=>new RegExp('^'+pattern.replace(/[.+?^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*')+'$');
const workerFirst=async()=>{
  const fs=await import('node:fs');
  const config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));
  return config.assets.run_worker_first;
};
test('run_worker_first lists exactly the routes the Worker serves, so static files never invoke it',async()=>{
  const {QUICKBOOKS_API,TESTIMONIALS_API,TESTIMONIALS_PAGE,NEWSLETTER_PATHS,ORIGINALS_API,APPLE_PAY_ASSOCIATION_PATH,NOSTR_JSON_PATH,LNURLP_PREFIX,CATALOG_WORKER_FIRST,CART_API,STICKERS_API,SHOP_REDIRECTS,PLAY_WORKER_FIRST}=await import('../worker/site.mjs');
  const patterns=await workerFirst();
  assert.ok(Array.isArray(patterns)&&patterns.length>0&&patterns.length<=100,'an explicit pattern list, not true');
  assert.ok(patterns.every(p=>p.startsWith('/')&&!p.startsWith('!/')),'no negative patterns needed');
  const matches=(path)=>patterns.some(p=>globRe(p).test(path));
  // Every route the Worker handles runs the Worker first.
  for(const path of [...QUICKBOOKS_API,TESTIMONIALS_API+'approved',TESTIMONIALS_API+'submit',TESTIMONIALS_API+'photo/abc/1',TESTIMONIALS_API+'video/abc/poster',TESTIMONIALS_API+'owner',...TESTIMONIALS_PAGE,...NEWSLETTER_PATHS,ORIGINALS_API,APPLE_PAY_ASSOCIATION_PATH,NOSTR_JSON_PATH,LNURLP_PREFIX+'tj'])assert.ok(matches(path),path+' must run the Worker');
  // Every pattern is a route the Worker actually handles (no stray patterns).
  const handled=new Set([...QUICKBOOKS_API,ORIGINALS_API,CART_API+'*',STICKERS_API+'*',...Object.keys(SHOP_REDIRECTS),APPLE_PAY_ASSOCIATION_PATH,NOSTR_JSON_PATH,LNURLP_PREFIX+'*',TESTIMONIALS_API+'*',...TESTIMONIALS_PAGE,...NEWSLETTER_PATHS,...CATALOG_WORKER_FIRST,...PLAY_WORKER_FIRST]);
  for(const p of patterns)assert.ok(handled.has(p),p+' is not a Worker route');
  assert.equal(patterns.length,handled.size);
  // Static files, pages and admin pages are served by the assets layer, not the Worker.
  for(const path of ['/play','/play/','/play/assets/index.js','/play/orsay/'])assert.ok(matches(path),path+' must run the Worker');
  for(const path of ['/about/','/_astro/index.abc.css','/display/a-123-160.webp','/gallery-images/a.jpg','/product-media/el-zonte/room-1-2400.webp','/robots.txt','/sitemap.xml','/catalog/version.json','/print-editions/a.jpg','/print-masters/a.jpg','/quickbooks/','/quickbooks/disconnected/','/testimonials/api','/testimonial-manager/','/originals-manager/','/inventory/','/.well-known/security.txt','/favicon.ico','/site.webmanifest','/404.html','/nope/'])assert.ok(!matches(path),path+' must not invoke the Worker');
});
test('assets keep their routing settings and the service binding is unchanged',async()=>{
  const fs=await import('node:fs');
  const config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));
  assert.equal(config.assets.directory,'./dist');assert.equal(config.assets.binding,'ASSETS');
  assert.equal(config.assets.html_handling,'auto-trailing-slash');assert.equal(config.assets.not_found_handling,'404-page');
  assert.deepEqual(config.services,[{binding:'CHECKOUT',service:'vermillion-commissions'}]);
  assert.deepEqual(config.vars,{PRIMARY_HOST:'tjm.art',LEGACY_REDIRECT:'true'});
});
test('zone redirect rules document the legacy exceptions exactly as the Worker keeps them',async()=>{
  const fs=await import('node:fs');
  const {KEEP_ON_LEGACY}=await import('../worker/site.mjs');
  const doc=fs.readFileSync('docs/static-bypass-zone-rules.md','utf8');
  const expr=doc.match(/^LEGACY_RULE_EXPRESSION: (.+)$/m)?.[1];
  assert.ok(expr,'the doc records the legacy rule expression');
  assert.deepEqual([...expr.matchAll(/not starts_with\(http\.request\.uri\.path, "([^"]+)"\)/g)].map(m=>m[1]),KEEP_ON_LEGACY);
  assert.match(expr,/^\(http\.host eq "vermillionaurora\.com" and /);
  for(const needle of ['(http.host eq "www.tjm.art")','(http.host eq "tjm.art" and not ssl)','81db549fdd1e4d04b41cc6f69cb1c895','8fb5c150877b4889952ac2814eae2a4b','be24884aab634cccb6ec1cde04bff37a','901dca909b4c4cd6a0055d0141c4c8a9'])assert.ok(doc.includes(needle),needle);
});
test('renamed product pages: one-hop 301 from the legacy domain, _redirects on tjm.art, no stale catalog ids',async()=>{
  const {PRODUCT_RENAMES,renamedProductPath}=await import('../worker/product-renames.mjs');
  const fs=await import('node:fs');
  const products=JSON.parse(fs.readFileSync('catalog/products.json','utf8'));
  const prints=JSON.parse(fs.readFileSync('catalog/prints.json','utf8')).artworks;
  const checkoutSlugs=fs.readFileSync('cloudflare/wrangler.jsonc','utf8');
  const redirects=fs.readFileSync('static/_redirects','utf8');
  const archiveIds=JSON.parse(fs.readFileSync('catalog/archive-paintings.json','utf8')).paintings.map(p=>p.id);
  const olderWorkIds=JSON.parse(fs.readFileSync('catalog/older-work.json','utf8')).groups.map(g=>g.id);
  const ids=new Set([...products.map(p=>p.id),...archiveIds,...olderWorkIds]);
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
test('/contact/ is a server-side 301 to the commission form (static/_redirects), not a meta-refresh page, and stays out of the sitemap',async()=>{
  const fs=await import('node:fs');
  const rules=fs.readFileSync('static/_redirects','utf8').split('\n').map(l=>l.trim().split(/\s+/)).filter(l=>l[0]&&!l[0].startsWith('#'));
  for(const from of ['/contact/','/contact'])assert.deepEqual(rules.filter(r=>r[0]===from),[[from,'/commissions/#form','301']],from);
  assert.ok(!fs.existsSync('src/pages/contact'),'no Astro.redirect stub page (it rendered a 980px meta-refresh page with a 200)');
  if(fs.existsSync('dist/sitemap.xml')){
    assert.ok(!fs.existsSync('dist/contact/index.html'),'no built /contact/ page');
    assert.doesNotMatch(fs.readFileSync('dist/sitemap.xml','utf8'),/tjm\.art\/contact\b/);
    assert.match(fs.readFileSync('dist/commissions/index.html','utf8'),/\bid="form"/,'the redirect target anchor exists');
  }
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

test('original inventory API on tjm.art goes to the checkout Worker', async () => {
  const seen = [];
  const env = {LEGACY_REDIRECT:'false', PRIMARY_HOST:'tjm.art', ASSETS:{fetch:()=>new Response('asset')}, CHECKOUT:{fetch:r=>{seen.push(r.url);return new Response('checkout');}}};
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/inventory/originals',{method:'POST'}),env)).text(), 'checkout');
  assert.equal(seen[0], 'https://tjm.art/inventory/originals');
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/originals-manager/'),env)).text(), 'asset');
  assert.equal((await worker.fetch(new Request('https://tjm.art/inventory/originals'),{...env, CHECKOUT:undefined})).status, 503);
});

test('NIP-05 nostr.json: exact body, JSON content type, CORS, 200 with no redirect',async()=>{
  const {default:worker,NOSTR_JSON_PATH}=await import('../worker/site.mjs');
  assert.equal(NOSTR_JSON_PATH,'/.well-known/nostr.json');
  const hex='7edfc4a9556797f26adab9d1fd5adbe5f66f174546f8ddeee09502cd532f88cb';
  for(const q of ['','?name=tj']){
    const r=await worker.fetch(new Request('https://tjm.art/.well-known/nostr.json'+q),{PRIMARY_HOST:'tjm.art',ASSETS:{fetch:()=>new Response('asset',{status:404})}},{});
    assert.equal(r.status,200);assert.equal(r.headers.get('content-type'),'application/json');assert.equal(r.headers.get('access-control-allow-origin'),'*');
    assert.equal(await r.text(),JSON.stringify({names:{tj:hex,_:hex}}));
  }
});

test('Lightning address tj@tjm.art: BTCPay payRequest passed through unchanged, CORS, short cache; LNURL errors otherwise',async()=>{
  const {lnurlp,LNURLP_NAMES}=await import('../worker/site.mjs');
  const alby=JSON.stringify({status:'OK',tag:'payRequest',callback:'https://pay.tjm.art/BTC/UILNURL/pay/lnaddress/tj',minSendable:1000,maxSendable:612000000000,metadata:'[]'});
  let asked;
  const ok=await lnurlp('tj',async(u)=>{asked=u;return new Response(alby,{headers:{'content-type':'application/json'}});});
  assert.equal(asked,LNURLP_NAMES.tj);assert.equal(LNURLP_NAMES.tj,'https://pay.tjm.art/.well-known/lnurlp/tj');assert.equal(ok.status,200);assert.equal(await ok.text(),alby);
  assert.equal(ok.headers.get('content-type'),'application/json');assert.equal(ok.headers.get('access-control-allow-origin'),'*');assert.equal(ok.headers.get('cache-control'),'public, max-age=300');
  for(const f of [async()=>{throw Error('offline');},async()=>new Response('oops',{status:500}),async()=>new Response('<html>')]){
    const r=await lnurlp('tj',f);assert.equal(r.status,502);const j=await r.json();assert.equal(j.status,'ERROR');assert.ok(j.reason);assert.equal(r.headers.get('access-control-allow-origin'),'*');
  }
  for(const n of ['bob','toString','']){const r=await lnurlp(n,async()=>{throw Error('must not fetch');});assert.equal(r.status,404);assert.equal((await r.json()).status,'ERROR');}
});

test('site worker keeps logs: wrangler.jsonc enables observability like the checkout worker (#132)',async()=>{
  const fs=await import('node:fs');
  const site=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));
  assert.equal(site.observability?.enabled,true);
  assert.equal(site.observability?.logs?.enabled,true);
  assert.equal(site.observability?.logs?.invocation_logs,true);
});
