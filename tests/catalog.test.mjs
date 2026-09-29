import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import {products,collections,byId,catalogVersion,validateCatalog,priceLabel} from '../catalog/catalog.mjs';
import checkout,{catalogVersion as workerVersion} from '../cloudflare/checkout-catalog.mjs';
import {inventoryStatus} from '../cloudflare/inventory-api.mjs';
test('every product renders at its stable URL with matching content and checkout price',()=>{
 assert.equal(catalogVersion,workerVersion);
 for(const p of products){const $=load(fs.readFileSync(`dist/products/${p.slug}/index.html`,'utf8'));assert.equal($('h1').text(),p.title);assert.equal($('meta[name=catalog-version]').attr('content'),catalogVersion);assert.equal($('link[rel=canonical]').attr('href'),`https://vermillionaurora.com/products/${p.slug}/`);for(const paragraph of p.story)assert.ok($('main').text().includes(paragraph),p.slug);if(p.image)assert.equal($('main img').first().attr('src'),p.image.src);if(checkout[p.id]){assert.equal(checkout[p.id].amount,p.listing.price.amount);assert.equal($('.product-detail-price').text(),priceLabel(p));}}
});
test('shared cards use the catalog and preserve collection order',()=>{
 for(const [key,path] of Object.entries({home:'index.html',gallery:'gallery/index.html',paul:'exhibitions/paul-murphy/index.html',chase:'exhibitions/chase-toole/index.html',gavin:'exhibitions/gavin-robertson/index.html'})){
 const $=load(fs.readFileSync(`dist/${path}`,'utf8'));const expected=collections[key].filter(e=>byId[e.product].type==='painting').map(e=>e.product);assert.deepEqual($('[data-product-id]').map((i,e)=>$(e).attr('data-product-id')).get(),expected);for(const id of expected)assert.ok($(`[data-product-id="${id}"]`).find('img').attr('src')===byId[id].image.src);
 if(key==='home')assert.equal($('.painting-carousel .product-card').filter((i,e)=>$(e).text().includes('Available')).length,0);
 }
});
test('invalid identities, missing assets, unsafe prices and shipping stop the build',()=>{
 const change=fn=>{const copy=structuredClone(products);fn(copy);assert.throws(()=>validateCatalog(copy,collections));};
 change(p=>p.push(p[0]));change(p=>p[0].image.src='/missing-artwork.jpg');change(p=>p.find(x=>x.checkout?.mode==='integrated').listing.price.amount='-1.00');change(p=>p.find(x=>x.checkout?.mode==='integrated').checkout.shipping.weight=0);change(p=>p[0].slug='renamed-without-migration');
});
test('public output excludes source code, credentials and shipping notes',()=>{
 for(const path of ['cloudflare','node_modules','src','catalog/catalog.mjs','catalog/collections.json','payments/verify-production.mjs','package.json','.git'])assert.equal(fs.existsSync(`dist/${path}`),false,path);
 const body=fs.readFileSync('dist/catalog/products.json','utf8');assert.ok(!body.includes('insuranceRequested'));assert.ok(!body.includes('verification'));assert.ok(!body.includes('GITHUB_TOKEN'));
});
test('live availability works independently of payment providers and exposes only status',async()=>{
 const id='painting-portrait-in-green',sold=products.find(p=>p.listing?.status==='sold').id;
 const env={PAINTING_STOCK:{getByName:name=>{assert.equal(name,id);return{status:async()=>'reserved'};}}};
 const r=await inventoryStatus(new Request(`https://worker/inventory/status?ids=${id},${sold}`),env);assert.equal(r.status,200);assert.equal(r.headers.get('Cache-Control'),'no-store');assert.deepEqual(await r.json(),{version:catalogVersion,availability:{[id]:'reserved',[sold]:'sold'}});
 assert.equal((await inventoryStatus(new Request('https://worker/inventory/status?ids=unknown'),env)).status,400);
 assert.equal((await inventoryStatus(new Request(`https://worker/inventory/status?ids=${id}`),{})).status,503);
});
