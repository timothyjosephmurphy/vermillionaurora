import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import {products,collections,byId,catalogVersion,validateCatalog,priceLabel,dimensionLabel} from '../catalog/catalog.mjs';
import {estimatePaperParcelWeightLb} from '../catalog/shipping-estimates.mjs';
import checkout,{catalogVersion as workerVersion} from '../cloudflare/checkout-catalog.mjs';
import {inventoryStatus} from '../cloudflare/inventory-api.mjs';
import {lowestPrintPrice} from '../src/data/card-commerce.mjs';
test('every product renders at its stable URL with matching content and checkout price',()=>{
 assert.equal(catalogVersion,workerVersion);
 for(const p of products){const $=load(fs.readFileSync(`dist/products/${p.slug}/index.html`,'utf8'));assert.equal($('h1').text(),p.title);assert.equal($('meta[name=catalog-version]').attr('content'),catalogVersion);assert.equal($('link[rel=canonical]').attr('href'),`https://tjm.art/products/${p.slug}/`);for(const paragraph of p.story)assert.ok($('main').text().includes(paragraph),p.slug);if(p.image)assert.equal(($('main img, main svg[data-image-src]').first().attr('data-image-src') || $('main img, main svg[data-image-src]').first().attr('src')),p.image.src);if(checkout[p.id]){assert.equal(checkout[p.id].amount,p.listing.price.amount);assert.equal($('.product-detail-price').text(),priceLabel(p));}}
});
test('gallery rows and shared cards use the catalog and preserve collection order',()=>{
 for(const [key,path] of Object.entries({home:'index.html',gallery:'gallery/index.html',paul:'exhibitions/paul-murphy/index.html',chase:'exhibitions/chase-toole/index.html',gavin:'exhibitions/gavin-robertson/index.html'})){
 const $=load(fs.readFileSync(`dist/${path}`,'utf8'));const expected=collections[key].filter(e=>byId[e.product].type==='painting').map(e=>e.product);
 if(key==='home'){
  // Featured works: every qualifying painting, highest original price first, ties by title; prints-only last by lowest print price.
  const price=id=>Number(byId[id].listing?.price?.amount)||null;
  const available=collections.home.filter(e=>e.variant==='carousel'&&['available','inquiry'].includes(byId[e.product].listing?.status)).map(e=>e.product)
   .sort((a,b)=>(price(a)===null)-(price(b)===null)||(price(b)??0)-(price(a)??0)||(price(a)===null?(lowestPrintPrice(byId[a])??Infinity)-(lowestPrintPrice(byId[b])??Infinity):0)||byId[a].title.localeCompare(byId[b].title,'en'));
  // Collector's Items: no item limit, every qualifying painting in collection order.
  const collectors=collections.home.filter(e=>e.variant==='carousel'&&!['available','inquiry'].includes(byId[e.product].listing?.status)).map(e=>e.product);
  assert.deepEqual($('.available-paintings-carousel [data-product-id]').map((i,e)=>$(e).attr('data-product-id')).get(),available);
  assert.deepEqual($('.collector-items-carousel [data-product-id]').map((i,e)=>$(e).attr('data-product-id')).get(),collectors);
  const prices=$('.available-paintings-carousel [data-product-id]').map((i,e)=>price($(e).attr('data-product-id'))).get().filter(Boolean);
  assert.deepEqual(prices,[...prices].sort((a,b)=>b-a),'featured works sorted by original price, highest first');
  assert.equal($('.available-paintings-carousel [data-product-id]').length+collectors.length,expected.length);
  assert.equal($('.collector-archive-link').length,0);
  assert.ok($('.painting-discovery-actions a.button[href="/gallery/"]').length);
  assert.equal($('#gallery h2').text(),'Featured works');
  assert.equal($('#collectors-items h2').text(),'Collector’s Items');
  // Testimonials are discoverable: main nav (after Commissions) and a CTA under the collectors carousel.
  const nav=$('.main-nav a').map((i,e)=>$(e).attr('href')).get();
  assert.equal(nav[nav.indexOf('/commissions/')+1],'/testimonials/');
  assert.equal($('#collectors-items .testimonial-cta a[href="/testimonials/"]').length,1);
 }else{
  const scope=({gallery:'.painting-list',paul:'.exhibition-grid',chase:'.collaboration-grid',gavin:'.film-collaboration-gallery'})[key];
  assert.deepEqual($(`${scope} [data-product-id]`).map((i,e)=>$(e).attr('data-product-id')).get(),expected);
 }
 for(const node of $('[data-product-id]').toArray()){const id=$(node).attr('data-product-id');assert.ok(byId[id],id);assert.equal(($(node).find('img, svg[data-image-src]').first().attr('data-image-src') || $(node).find('img, svg[data-image-src]').first().attr('src')),byId[id].image.src);if(key==='gallery')assert.equal($(node).find('.painting-list-dimensions').text(),dimensionLabel(byId[id]));}
 }
});
test('invalid identities, missing assets, unsafe prices and shipping stop the build',()=>{
 const change=fn=>{const copy=structuredClone(products);fn(copy);assert.throws(()=>validateCatalog(copy,collections));};
 change(p=>p.push(p[0]));change(p=>p[0].image.src='/missing-artwork.jpg');change(p=>p.find(x=>x.checkout?.mode==='integrated').listing.price.amount='-1.00');change(p=>p.find(x=>x.checkout?.mode==='integrated').checkout.shipping.weight=0);change(p=>p[0].slug='renamed-without-migration');
});
test('integrated checkout profiles use dimension-based packed-weight estimates',()=>{
 const integrated=products.filter(p=>p.checkout?.mode==='integrated');
 assert.equal(integrated.length,Object.keys(checkout).length);
 for(const p of integrated){
  const s=p.checkout.shipping;
  if(['painting-portrait-in-green','painting-portrait-in-gold'].includes(p.id)){
   assert.equal(s.weight,0.25,p.id);
   assert.equal(s.height,0.125,p.id);
   assert.equal(s.insuranceRequested,true,p.id);
   continue;
  }
  assert.equal(s.weight,estimatePaperParcelWeightLb(p),p.id);
 }
});
test('public output excludes source code, credentials and shipping notes',()=>{
 for(const path of ['cloudflare','node_modules','src','catalog/catalog.mjs','catalog/collections.json','payments/verify-production.mjs','package.json','.git'])assert.equal(fs.existsSync(`dist/${path}`),false,path);
 const body=fs.readFileSync('dist/catalog/products.json','utf8');assert.ok(!body.includes('insuranceRequested'));assert.ok(!body.includes('verification'));assert.ok(!body.includes('GITHUB_TOKEN'));
});
test('live availability works independently of payment providers and exposes only status',async()=>{
 const id='painting-portrait-in-green',sold=products.find(p=>p.listing?.status==='sold').id;
 const env={PAINTING_STOCK:{getByName:name=>({summary:async()=>name===id?{state:'held',expires_at:Date.now()+60_000,manual:null}:null,status:async()=>'reserved'})}};
 const r=await inventoryStatus(new Request(`https://worker/inventory/status?ids=${id},${sold}`),env);assert.equal(r.status,200);assert.equal(r.headers.get('Cache-Control'),'no-store');assert.deepEqual(await r.json(),{version:catalogVersion,availability:{[id]:'reserved',[sold]:'sold'}});
 assert.equal((await inventoryStatus(new Request('https://worker/inventory/status?ids=unknown'),env)).status,400);
 assert.equal((await inventoryStatus(new Request(`https://worker/inventory/status?ids=${id}`),{})).status,503);
});

import {deriveParcel} from '../catalog/shipping.mjs';
test('dimensioned available paintings receive parcels from the flat-at-12-inch rule',()=>{
 const originals=products.filter(p=>p.type==='painting'&&p.listing?.status==='available'&&p.listing?.price);
 const missing=originals.filter(p=>!p.dimensions);
 assert.deepEqual(missing.map(p=>p.id),[]); // paul-murphy-painting-55 was the last one, measured at 12 × 10 in
 const ready=originals.filter(p=>p.dimensions);
 assert.equal(ready.length,56); // 52 before paul-murphy-painting-82 was removed, 51 after, 52 once paul-murphy-painting-55 was measured, 53 with El Zonte Before Dawn, 55 with Meditation at Denny Blaine and Sunrise in El Zonte (Large), 56 with Hope, the Vermillion Aurora
 for(const p of ready){
  assert.equal(p.checkout.mode,'integrated',p.id);
  const s=p.checkout.shipping;
  const pkg=s.packageOverride?{length:s.length,width:s.width,height:s.height,weight:s.weight,packaging:s.packaging}:deriveParcel(p.dimensions,s.weight,s.height,{rollable:!(p.framing&&!/unframed/i.test(p.framing))});
  assert.deepEqual(checkout[p.id].parcel,{length:pkg.length,width:pkg.width,height:pkg.height,weight:pkg.weight},p.id);
  assert.equal(checkout[p.id].packaging,pkg.packaging,p.id);
 }
});
test('flat packaging is used only when the larger painting side is at most 12 inches',()=>{
 assert.deepEqual(deriveParcel({width:8,height:12,unit:'in'},2),{length:14,width:10,height:2,weight:2,packaging:'flat'});
 assert.deepEqual(deriveParcel({width:8,height:16,unit:'in'},2),{length:8,width:4,height:4,weight:2,packaging:'tube'});
 assert.deepEqual(deriveParcel({width:24,height:48,unit:'in'},2),{length:24,width:4,height:4,weight:2,packaging:'tube'});
 assert.deepEqual(deriveParcel({width:100,height:70,unit:'cm'},2),{length:28,width:4,height:4,weight:2,packaging:'tube'});
 assert.deepEqual(deriveParcel({width:30.48,height:25,unit:'cm'},2),{length:14,width:12,height:2,weight:2,packaging:'flat'});
 assert.deepEqual(deriveParcel({width:36,height:16,unit:'in'},2,2,{rollable:false}),{length:38,width:18,height:2,weight:2,packaging:'flat'});
});

test('exhibition years match the artist’s confirmed dates across the site',()=>{
 const locations=JSON.parse(fs.readFileSync('exhibitions/world-map/locations.json','utf8'));
 const mapDate=slug=>locations.flatMap(place=>place.exhibitions).find(item=>item.slug===slug)?.date;
 const expected={ 'cape-town':'2025','studio-601':'2023','bitcoin-film-festival-warsaw':'2026','victrola':'2025' };
 for(const [slug,date] of Object.entries(expected))assert.equal(mapDate(slug),date,slug+' map date');
 const home=load(fs.readFileSync('dist/index.html','utf8'));
 const index=load(fs.readFileSync('dist/exhibitions/index.html','utf8'));
 for(const [slug,date] of Object.entries(expected)){
  const card=home(`a[href="/exhibitions/${slug}/"]`).first().closest('.ex-slide');
  assert.ok(card.text().includes(date),slug+' homepage date');
  const listing=index(`a[href="/exhibitions/${slug}/"]`).first().closest('article');
  assert.equal(listing.find('.exhibition-date').text(),date,slug+' exhibition index date');
 }
 for(const [slug,date] of Object.entries(expected)){
  const path=slug==='bitcoin-film-festival-warsaw'?'dist/exhibitions/bitcoin-film-festival-warsaw/index.html':`dist/exhibitions/${slug}/index.html`;
  const detail=load(fs.readFileSync(path,'utf8'));
  assert.equal(detail('time[datetime]').first().attr('datetime'),date,slug+' detail date');
 }
 const studio=load(fs.readFileSync('dist/exhibitions/studio-601/index.html','utf8'));
 assert.equal(studio('[data-caption*="Studio 601"][data-caption*="2022"]').length,0,'Studio 601 captions use 2023');
 assert.equal(studio('img[alt*="Studio 601"][alt*="2022"]').length,0,'Studio 601 image descriptions use 2023');
});

test('Arizona Slot Cave uses the complete left-rotated image in its gallery and full-screen product view',()=>{
 const check=image=>{assert.equal(image.attr('viewBox'),'0 0 3192 3450');assert.equal(image.find('image').attr('transform'),'translate(0 3450) rotate(-90)');assert.equal(image.find('image').attr('href'),byId['paul-murphy-painting-8'].image.src);};
 const page=load(fs.readFileSync('dist/products/paul-murphy-painting-8/index.html','utf8'));
 check(page('.painting-image-trigger svg'));check(page('.painting-lightbox svg'));
 assert.equal(page('meta[property="og:image"]').attr('content'),byId['paul-murphy-painting-8'].image.src);
 const gallery=load(fs.readFileSync('dist/exhibitions/paul-murphy/index.html','utf8'));
 check(gallery('[data-product-id="paul-murphy-painting-8"] svg'));
});
test('checked-in PayPal allowlist matches every dimensioned, available, priced painting (deploy verifier rule)',()=>{
 // payments/verify-production.mjs enforces this after deploying; catch a mismatch in the gate instead.
 const vars=JSON.parse(fs.readFileSync('cloudflare/wrangler.jsonc','utf8')).vars;
 const eligible=products.filter(p=>p.type==='painting'&&p.listing?.status==='available'&&p.listing?.price&&p.dimensions&&p.checkout?.mode==='integrated').map(p=>p.id).sort();
 assert.deepEqual((vars.PAYPAL_CHECKOUT_SLUGS||'').split(',').map(s=>s.trim()).filter(Boolean).sort(),eligible);
});
test('original purchase buttons say "Buy"; paintings without online checkout still link to the purchase inquiry form',()=>{
 const html=[];
 const walk=dir=>{for(const e of fs.readdirSync(dir,{withFileTypes:true})){const path=`${dir}/${e.name}`;if(e.isDirectory())walk(path);else if(e.name.endsWith('.html'))html.push(path);}};
 walk('dist');
 for(const path of html)assert(!/inquire to buy/i.test(fs.readFileSync(path,'utf8')),`${path} still says "Inquire to buy"`);
 for(const p of products.filter(p=>p.type==='painting'&&p.listing.status==='available')){
  const $=load(fs.readFileSync(`dist/products/${p.slug}/index.html`,'utf8'));
  const link=$('[data-original-purchase] [data-purchase-inquiry]');
  assert.equal(link.length,1,p.id);
  assert.equal(link.text(),'Buy',p.id);
  assert.equal(link.attr('href'),p.inquiryHref||`/commissions/?product=${encodeURIComponent(p.slug)}#form`,p.id);
  if(p.checkout?.mode==='integrated'){
   assert.equal($('[data-cart-product] [data-cart-buy]').text(),'Buy now',p.id);
   assert.equal($('[data-cart-product] [data-purchase-inquiry]').length,1,`${p.id}: fallback until the cart confirms stock`);
  }
 }
});
test('painting cards: price without "USD", "Prints from" the cheapest ready print, vermillion Buy cue inside one whole-tile link',async()=>{
 const {lowestPrintPrice,printsFromLabel,showBuy,dollars}=await import('../src/data/card-commerce.mjs');
 assert.equal(dollars(25),'$25');assert.equal(dollars(1000),'$1,000');assert.equal(dollars(32.5),'$32.50');
 assert.equal(priceLabel(byId['painting-lady-in-gold']??products.find(p=>p.title==='Lady in Gold')),'$1,000');
 const pages=['index.html','gallery/index.html','gallery/available/index.html','exhibitions/paul-murphy/index.html'];
 let checked=0;
 for(const path of pages){
  const $=load(fs.readFileSync(`dist/${path}`,'utf8'));
  $('[data-caption]').each((i,e)=>assert(!/\bUSD\b/.test($(e).attr('data-caption')),`${path}: ${$(e).attr('data-caption')}`));
  $('.card-tile, a.ex-photo[data-buy]').each((i,e)=>{
   const tile=$(e),href=tile.is('a')?tile.attr('href'):tile.find('a').attr('href');
   const p=products.find(p=>href?.replace(/\/$/,'').endsWith(`/products/${p.slug}`));assert(p,`${path}: card without product link (${href})`);
   assert.equal(tile.find('a a').length+(tile.is('a')?tile.find('a').length:0),0,`${path}: ${p.id} has nested links`);
   tile.find('a').each((j,a)=>assert.equal($(a).attr('href'),href,`${path}: ${p.id} links elsewhere`));
   assert.equal(tile.find('button, input, select').length,0,`${path}: ${p.id}`);
   assert.equal(tile.find('.card-prints-from').first().text()||tile.attr('data-prints-from')||'',printsFromLabel(p),`${path}: ${p.id}`);
   assert.equal(tile.attr('data-buy')??String(showBuy(p)),String(showBuy(p)),`${path}: ${p.id}`);
   if(tile.attr('data-prints-from')!==undefined)assert.equal(tile.attr('data-prints-from'),printsFromLabel(p),`${path}: ${p.id}`);
   const buy=tile.find('[data-card-buy]');
   if(buy.length){assert(buy.parent().is('.card-buy-row')&&buy.parent().children().length===2&&buy.is(':last-child'),`${path}: ${p.id} Buy must sit at the end of the card's last text line`);assert.equal(buy.text(),'Buy');assert.equal(buy.attr('aria-hidden'),'true');assert.equal(buy.attr('hidden')!==undefined,!showBuy(p)&&path!=='gallery/available/index.html',`${path}: ${p.id}`);}
   checked++;
  });
 }
 assert(checked>100,`checked ${checked} cards`);
 for(const p of products.filter(p=>p.type==='painting')){const low=lowestPrintPrice(p);if(low!==null)assert(low>0);if(p.listing.status==='available'||low!==null)assert(showBuy(p),p.id);else assert(!showBuy(p),p.id);}
 const css=fs.readFileSync('styles.css','utf8');assert.match(css,/\.card-buy\{[^}]*background:var\(--cta\)/);
});
test('painting pages render extra photos as thumbnails after the main image and an accessible product video',()=>{
 const withMedia=products.filter(p=>p.type==='painting'&&(p.gallery?.length||p.video));
 assert.deepEqual(withMedia.map(p=>p.id).sort(),['el-zonte-at-sunrise','el-zonte-before-dawn','hope-the-vermillion-aurora','meditation-at-denny-blaine','painting-clouds-over-water','painting-emergence','painting-insect-garden','painting-moonlit-water','painting-red-horizon','painting-shoreline-at-dusk','painting-twin-dragons','sunrise-in-el-zonte-large','sunset-in-el-tunco-el-salvador','sunset-in-el-zonte-el-salvador']);
 for(const p of withMedia){
  const $=load(fs.readFileSync(`dist/products/${p.slug}/index.html`,'utf8'));
  const thumbs=$('.product-media [data-product-thumbs] .product-thumb');
  assert.equal(thumbs.length,p.gallery.length+1,p.id);
  assert.equal(thumbs.first().attr('aria-pressed'),'true');
  assert.match(thumbs.first().attr('aria-label'),new RegExp(`^Show photo 1 of ${p.gallery.length+1}: `));
  p.gallery.forEach((g,i)=>{const t=thumbs.eq(i+1);assert.equal(t.attr('data-alt'),g.alt);assert.ok(g.alt.startsWith(p.title)||g.alt==='El Zonte paintings by TJ Murphy hanging in a gallery',p.id+': '+g.alt);assert.equal(t.find('source[type="image/avif"]').length,1);assert.equal(t.find('source[type="image/webp"]').length,1);});
  if(p.video){
   const video=$('.product-media video[data-product-video]');
   assert.equal(video.length,1,p.id);
   for(const attr of ['controls','playsinline'])assert.ok(video.attr(attr)!==undefined,attr);
   assert.equal(video.attr('preload'),'metadata');assert.equal(video.attr('aria-label'),p.video.label);assert.equal(video.attr('poster'),p.video.poster);
   assert.equal(video.attr('autoplay'),undefined);
   assert.deepEqual(video.find('source').map((i,e)=>$(e).attr('src')).get(),p.video.sources.map(s=>s.src));
  } else assert.equal($('.product-media video[data-product-video]').length,0,p.id);
 }
});
test('homepage featured carousel includes each El Zonte painting exactly once with the new full-res photos',()=>{
 const trackIds=[];
 const $=load(fs.readFileSync('dist/index.html','utf8'));
 $('[data-available-paintings] [data-product-id]').each((i,el)=>trackIds.push($(el).attr('data-product-id')));
 const want={'el-zonte-before-dawn':'el-zonte-before-dawn','painting-shoreline-at-dusk':'el-zonte-at-dawn-2026','el-zonte-at-sunrise':'sunrise-punta-el-zonte-hostel-2026'};
 for(const [id,photo] of Object.entries(want)){
  assert.equal(trackIds.filter(x=>x===id).length,1,`${id} should appear exactly once in the featured track (order=${trackIds.join(',')})`);
  const card=$(`[data-available-paintings] [data-product-id="${id}"]`);
  const img=card.find('img');
  const src=`${img.attr('src')||''} ${img.attr('srcset')||''} ${img.attr('data-image-src')||''}`;
  assert.match(src,new RegExp(photo),`${id} must use the new photo (${photo}), got ${src.slice(0,160)}`);
  assert(!/shoreline-at-dusk-|sunrise-punto-el-zonte/.test(src),`${id} still references an old photo path`);
 }
});
test('homepage featured carousel leads with Sunrise in El Zonte (Large), Meditation at Denny Blaine and Moonrise Over the Cascades, once each, new photos',()=>{
 const trackIds=[];
 const $=load(fs.readFileSync('dist/index.html','utf8'));
 $('[data-available-paintings] [data-product-id]').each((i,el)=>trackIds.push($(el).attr('data-product-id')));
 const want={'sunrise-in-el-zonte-large':'sunrise-in-el-zonte-large','meditation-at-denny-blaine':'meditation-at-denny-blaine','painting-moonlit-water':'moonrise-over-the-cascades'};
 for(const [id,photo] of Object.entries(want)){
  assert.equal(trackIds.filter(x=>x===id).length,1,`${id} should appear exactly once in the featured track (order=${trackIds.join(',')})`);
  const card=$(`[data-available-paintings] [data-product-id="${id}"]`);
  const img=card.find('img');
  const src=`${img.attr('src')||''} ${img.attr('srcset')||''} ${img.attr('data-image-src')||''}`;
  assert.match(src,new RegExp(photo),`${id} must use the new photo (${photo}), got ${src.slice(0,160)}`);
  assert(!/moonlit-water/.test(src),`${id} still references the old Moonrise photo`);
 }
 // One product page each; Moonrise keeps its id and URL with the new title, size and prints.
 for(const id of Object.keys(want))assert.equal(products.filter(p=>p.id===id).length,1,id);
 const moon=products.find(p=>p.id==='painting-moonlit-water');
 assert.equal(moon.title,'Moonrise Over the Cascades');assert.deepEqual(moon.dimensions,{width:12,height:23,unit:'in'});
 assert(fs.existsSync('gallery-images/moonlit-water.jpg'),'old Moonrise photo stays in place');
 const page=load(fs.readFileSync('dist/products/painting-moonlit-water/index.html','utf8'));
 assert.equal(page('h1').text(),'Moonrise Over the Cascades');
 assert(page('[data-print-options], [data-print-purchase], .print-options').length>0||/Prints from/.test(page.html()),'Moonrise page offers prints');
});
test('homepage featured carousel leads with Hope and Sunset at Kihei on Maui, once each, new photos',()=>{
 const trackIds=[];
 const $=load(fs.readFileSync('dist/index.html','utf8'));
 $('[data-available-paintings] [data-product-id]').each((i,el)=>trackIds.push($(el).attr('data-product-id')));
 const want={'hope-the-vermillion-aurora':'hope-the-vermillion-aurora','painting-red-horizon':'sunset-at-kihei-on-maui'};
 for(const [id,photo] of Object.entries(want)){
  assert.equal(trackIds.filter(x=>x===id).length,1,`${id} should appear exactly once`);
  const card=$(`[data-available-paintings] [data-product-id="${id}"]`);
  const img=card.find('img');
  const src=`${img.attr('src')||''} ${img.attr('srcset')||''} ${img.attr('data-image-src')||''}`;
  assert.match(src,new RegExp(photo),`${id} must use the new photo`);
  assert(!/red-horizon/.test(src),`${id} still uses the old Hawaii photo`);
 }
 // Featured works are sorted by price: Hope ($2,000) leads; Kihei ($1,000) comes before the $600 and $500 paintings.
 assert.equal(trackIds[0],'hope-the-vermillion-aurora');
 assert(trackIds.indexOf('painting-red-horizon')<trackIds.indexOf('meditation-at-denny-blaine'));
 const kihei=products.find(p=>p.id==='painting-red-horizon');
 assert.equal(kihei.title,'Sunset at Kihei on Maui');assert.deepEqual(kihei.dimensions,{width:23,height:44,unit:'in'});
 assert.equal(kihei.listing.price.amount,'1000.00');assert.equal(kihei.year,2022);
 assert(fs.existsSync('gallery-images/red-horizon.jpg'),'old Hawaii photo stays');
 const hope=products.find(p=>p.id==='hope-the-vermillion-aurora');
 assert.equal(hope.title,'Hope, the Vermillion Aurora');assert.deepEqual(hope.dimensions,{width:44,height:22,unit:'in'});
 assert.equal(hope.listing.price.amount,'2000.00');assert.equal(hope.year,2023);
});
test('Burning Man Temple 2022 paintings are collector’s items with their own pages, no prints and no checkout',()=>{
 const ids=['burning-man-temple-2022-blue','burning-man-temple-2022-pink','burning-man-temple-2022-flame','burning-man-temple-2022-daytime'];
 const $=load(fs.readFileSync('dist/index.html','utf8'));
 const collectors=$('[data-collector-paintings] [data-product-id]').map((i,el)=>$(el).attr('data-product-id')).get();
 // The Temple series closes Collector's Items (and the gallery list) in the order Blue, Pink, Flame, Daytime.
 assert.deepEqual(collectors.slice(-4),ids);
 assert.deepEqual(collections.gallery.slice(-4).map(e=>e.product),ids);
 for(const id of ids){
  const p=products.find(x=>x.id===id);
  assert.equal(p.listing.status,'not-for-sale',id);assert.equal(p.listing.price,undefined,id);assert.equal(p.checkout.mode,'inquiry',id);
  assert.deepEqual(p.dimensions,{width:45,height:24,unit:'in'},id);assert.equal(p.year,2022,id);assert.equal(p.medium,'Watercolor pastel',id);
  assert.equal(collectors.filter(x=>x===id).length,1,`${id} once in Collector’s Items`);
  assert.equal($(`[data-available-paintings] [data-product-id="${id}"]`).length,0,id);
  assert(!Object.keys(JSON.parse(fs.readFileSync('catalog/prints.json','utf8')).artworks).includes(id),`${id} has no prints`);
  const page=load(fs.readFileSync(`dist/products/${id}/index.html`,'utf8'));
  assert.equal(page('h1').text(),p.title);
  assert.equal(page('[data-original-purchase]').length,0,id);
  assert.equal(page('.product-availability').text().trim(),'Not for sale',id);
  assert.equal($(`[data-collector-paintings] [data-product-id="${id}"]`).attr('data-availability'),'Not for sale',id);
 }
});
test('the wedding portrait and four commissioned portraits lead the /commissions/ portrait carousel and are not products',()=>{
 const $=load(fs.readFileSync('dist/commissions/index.html','utf8'));
 const box=$('#portrait [data-mix]');
 assert.equal(box.find('.portrait-preview-stage img').first().attr('data-image-src'),'/gallery-images/wedding-portrait-with-dog.jpg');
 assert.ok(box.find('.portrait-preview-stage img').first().attr('alt').startsWith('Wedding Portrait with Dog'));
 assert.equal(box.attr('data-lead'),'portrait-lead');assert.equal(box.attr('data-mix'),'single-portrait,double-portrait');
 const js=fs.readFileSync('portrait-preview.js','utf8');const lead=JSON.parse(js.match(/const portraitImages = (\{.*?\});/)[1])['portrait-lead'];
 assert.deepEqual(lead.map(s=>s.split('/').pop().replace(/-[0-9a-f]{10}-\d+\.webp$/,'')),['wedding-portrait-with-dog','commissioned-portrait-1','commissioned-portrait-2','commissioned-portrait-3','commissioned-portrait-4']);
 for(const s of lead)assert.ok(fs.existsSync('static'+s),s);
 const srcs=new Set(products.flatMap(p=>[p.image?.src,...(p.examples||[]).map(e=>e.src),...(p.gallery||[]).map(g=>g.src)]));
 for(const n of ['wedding-portrait-with-dog','commissioned-portrait-1','commissioned-portrait-2','commissioned-portrait-3','commissioned-portrait-4'])assert.ok(!srcs.has(`/gallery-images/${n}.jpg`),n);
});

test('living room exhibition keeps its 18 chosen photographs in source and catalog',()=>{
 const $=load(fs.readFileSync('exhibitions/living-room/index.html','utf8'));
 const links=$('.exhibition-grid a.ex-photo');
 assert.equal(links.length,18);
 assert.match($('.section-heading p').first().text(),/^18 photographs and videos\./);
 const removed=/three-landscapes-in-living-room|IMG_43(46|72|88|89|91|92)\./;
 links.each((i,a)=>{
  assert.doesNotMatch($(a).attr('href'),removed);
  assert.equal($(a).find('img').attr('alt'),`My Living Room, Seattle, Washington exhibition photograph ${i+1}`);
 });
 const entry=JSON.parse(fs.readFileSync('exhibitions/catalog.json','utf8')).find(e=>e.slug==='living-room');
 assert.deepEqual(entry.files.map(f=>f.url),links.map((i,a)=>$(a).attr('href')).get());
 assert.ok(fs.existsSync('exhibitions/living-room/images/three-landscapes-in-living-room.jpg'),'homepage card image stays');
});
