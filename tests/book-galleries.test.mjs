import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import manifest from '../catalog/book-galleries.json' with {type:'json'};
import bookProducts from '../catalog/book-products.json' with {type:'json'};
import bookPrints from '../catalog/book-prints.json' with {type:'json'};
import {printOptions,config,papers} from '../catalog/prints.mjs';
import originalProducts from '../catalog/products.json' with {type:'json'};
import archiveProducts from '../catalog/archive-products.mjs';
import olderWorkProducts from '../catalog/older-work-products.mjs';
import collections from '../catalog/collections.json' with {type:'json'};
import {canonicalArtwork,sectionAdditions,sectionArtworkIds} from '../src/data/canonical-artworks.mjs';
import wallLabels from '../catalog/wall-label-galleries.json' with {type:'json'};

const groups=new Map(manifest.sections.map(group=>[group.id,group]));

test('book gallery sections contain only the retained artwork inventory',()=>{
  const originalIds=new Set(originalProducts.map(product=>product.id));
  for(const product of bookProducts){
    assert(!originalIds.has(product.id));
    assert(!product.checkout);
    assert(!product.listing.price);
    assert(!product.dimensions,'Unstated units must not become inches');
  }
  const collectionIds=new Set([...originalProducts,...archiveProducts].map(p=>p.id));
  for(const entries of Object.values(collections))for(const entry of entries)assert(collectionIds.has(entry.product),entry.product);

  assert.equal(manifest.sections.length,6);
  assert(!manifest.sections.some(group=>group.title==='About the Author'));
  for(const removed of ['Foreword','Afterword: Who is Satoshi Nakamoto?','Tomer, Valerie, and Marisa','Chase','Lisa','Daniel','Laura','Catherine','Dawn','Tahoma','San Juan Islands','Miami'])
    assert(!manifest.sections.some(group=>group.title===removed),`${removed} gallery should be removed`);

  const pacific=groups.get('watercolor-landscapes-pacific-north-west');
  assert.equal(pacific.title,'Pacific Northwest');
  assert.equal(pacific.artworks.length,8);
  const removedBookArt=['book-art-48cda66da2ff219fbb3f','book-art-543df2de766892143568','book-art-a572796512b8828b7333','book-art-dd27a2bc4247b8f9d49f','book-art-37da3c70d9d7750135e7','book-art-94962f025af06c2aa581'];
  for(const id of removedBookArt){
    assert(!manifest.artworks.some(art=>art.id===id),`${id} should be absent from the source manifest`);
    assert(!manifest.sections.some(group=>group.artworks.includes(id)),`${id} should be absent from every book gallery`);
  // studio-tracker #252: the framed photo of 'Sunrise on Rainier with Eagle' is gone; painting-portrait-with-hat is the master.
  assert(!manifest.artworks.some(art=>art.id==='book-art-d78badff7e21472c00b8'),'the framed duplicate scan is removed');
    assert(!bookProducts.some(product=>product.id===id),`${id} should have no product page`);
    assert(!(id in bookPrints),`${id} should have no print-ordering record`);
  }
  for(const id of ['book-art-e6068e265bfdc379526c','book-art-5e4eb881d89ae9f5c635','book-art-f56007f6a7d6ee955caf','book-art-d1399111a441ed91feaa'])
    assert(pacific.artworks.includes(id));

  for(const id of ['book-art-9ae261289a3bce952c6f', 'book-art-deb3358c321671dae1fc', 'book-art-164f60d23032b0f718de', 'book-art-aa4dcced8a2ae6a8111c', 'book-art-8fde7c978d6cd5d53727', 'book-art-b01b8695b2528cb850a3', 'book-art-7a3ad7bacdb71faac1b8']) {
    assert(!pacific.artworks.includes(id));
    assert(bookProducts.some(product=>product.id===id));
  }

  const friends=groups.get('watercolor-portraits-friends');
  assert.equal(friends.artworks.length,41);
  assert.equal(friends.artworks[0],'book-art-614d5b68dbe5052e302a');
  assert(friends.artworks.includes('book-art-b7a9cd259d8ac51a236b'),'The rescued hummingbird belongs in Friends');
  assert.equal(new Set(friends.artworks).size,friends.artworks.length);
  for(const id of ['book-art-9209f1fd7d47f373597f','book-art-a61c71e5de8cc1b71500','book-art-596837cb5ff533c620dd','book-art-7bce6e3509027d1f7a0b','book-art-3a9cba708a8045364e82','book-art-6bcf18417734a8e3010a','book-art-0d7df713c5f0f67733ae','book-art-0c4b161071524e23d519','book-art-b7410a9f4340e559e4f4'])
    assert(!manifest.sections.some(group=>group.artworks.includes(id)),`${id} should be removed from the book galleries`);
  for(const id of ['book-art-2a670ca4f87a8cbd8b02','book-art-d78badff7e21472c00b8'])
    assert(!manifest.sections.some(group=>group.artworks.includes(id)),`${id} should be absent from every book gallery`);

  const travels=groups.get('watercolor-landscapes-travels');
  assert(travels);
  assert.equal(travels.artworks.length,31);
  for(const id of ['book-art-c198f09bc8ddad18ed1e','book-art-27fee33e69f262ecfacb','book-art-55829535637cd4974a88','book-art-e589c9375e23d1de4748','book-art-f91504eaa0ab6b936c29','book-art-fb5eaeb2078ebf9c75f0','book-art-4bb692457bed7cd4bb00'])
    assert(travels.artworks.includes(id));
  assert(!pacific.artworks.includes('book-art-c198f09bc8ddad18ed1e'));

  const self=groups.get('watercolor-portraits-self-portraits');
  assert.equal(self.artworks.length,11);
  for(const id of ['book-art-024a1e2da99a49b4438a','book-art-02b06cbfebb63c2794d9','book-art-311b1c39d98767f359b5','book-art-cb92d1d647c6f92403c7','book-art-64a80ece808ac08d4877'])
    assert(self.artworks.includes(id));
  assert(!self.artworks.includes('book-art-471daf14a8bb7883f114'));

  for(const group of manifest.sections){
    const $=load(fs.readFileSync(`dist/book-galleries/${group.id}/index.html`,'utf8'));
    assert.equal($('h1').text(),group.title);
    const shown=[...new Set([...group.artworks,...(sectionAdditions[group.id]||[])].map(id=>canonicalArtwork[id]||id))];
    assert.deepEqual($('.painting-list-row').map((_,row)=>$(row).attr('data-product-id')).get(),shown);
    assert.equal($('#available-for-prints').length,1);
    assert($('#available-for-prints').parent().text().includes('Available for prints'));
    assert.equal($('script[src="/exhibitions/viewer.js"]').length,1);
    assert.equal($('.book-measurement-note').length,0);
    assert(!$('[data-gallery-list]').text().toLowerCase().includes('book measurements'));
    const expected=shown.filter(id=>printOptions(bookProducts.find(product=>product.id===id)||[...originalProducts,...archiveProducts,...olderWorkProducts].find(product=>product.id===id),config,papers).some(option=>option.ready)).length;
    assert.equal(Number($('.book-gallery-stats').attr('data-print-ready-count')),expected);
    for(const id of group.artworks)assert(bookProducts.some(product=>product.id===id)||Object.values(canonicalArtwork).includes(id),`${id} is neither a book product nor a canonical painting`);
  }
  const viewer=fs.readFileSync('exhibitions/viewer.js','utf8');
  assert(viewer.includes("grid.closest('.book-gallery-page')"));
  assert(viewer.includes("box.className = 'exhibition-viewer' + (threeUp ? ' ev-three-up' : '')"));
  const overview=load(fs.readFileSync('dist/book-galleries/index.html','utf8'));
  assert.equal(overview('.book-gallery-carousel-grid li').length,manifest.sections.length+2); // Archived + Older Work (Strawberry Point moved to the homepage Featured works, Oct 16 2026)
  assert.equal(overview('.book-gallery-links a').length,manifest.books.length+1); // book PDFs plus the wall-label gallery index
  const uniqueIds=[...new Set(manifest.sections.flatMap(sectionArtworkIds))];
  const printReady=uniqueIds.filter(id=>printOptions(bookProducts.find(product=>product.id===id)||[...originalProducts,...archiveProducts,...olderWorkProducts].find(product=>product.id===id),config,papers).some(option=>option.ready)).length;
  assert.equal(Number(overview('.book-gallery-print-total').attr('data-total-print-ready-count')),printReady);
  const home=load(fs.readFileSync('dist/index.html','utf8'));
  assert.equal(home('.book-section-carousel .ex-slide').length,manifest.sections.length+wallLabels.galleries.length+2); // book chapters, wall labels, Archived, Older Work
  assert.equal(home('#book-galleries h2').text(),'Selected Galleries');
  assert.equal(home('#gallery h2').text(),'Featured works');
  for(const id of ['painting-portrait-in-green','painting-portrait-in-gold'])
    assert(!collections.home.some(entry=>entry.product===id),`${id} belongs in the Portraits gallery, not Featured works`);
  // El Zonte at Dawn: one product page; the duplicate book scan was removed from the catalog.
  assert(!bookProducts.some(product=>product.id==='book-art-1be48d404e2dbf547794'));
  assert(groups.get('watercolor-landscapes-travels').artworks.includes('painting-shoreline-at-dusk'));
  assert.equal(originalProducts.find(product=>product.id==='painting-shoreline-at-dusk').title,'El Zonte at Dawn');
  for(const [scan,canonical] of Object.entries(canonicalArtwork)){
    assert([...originalProducts,...archiveProducts,...olderWorkProducts].some(product=>product.id===canonical));
    assert(fs.readFileSync('static/_redirects','utf8').includes(`/products/${scan}/ /products/${canonical}/ 301`));
  }
  const devo=bookProducts.find(p=>p.id===friends.artworks[0]);
  assert.equal(home('.book-section-carousel a[href="/book-galleries/watercolor-portraits-friends/"] img').attr('src'),devo.image.src);
  const bitcoiners=load(fs.readFileSync('dist/book-galleries/watercolor-portraits-bitcoiners/index.html','utf8'));
  for(const source of manifest.artworks.filter(art=>art.originalProductId)) {
    const row=bitcoiners(`[data-product-id="${source.id}"]`);
    assert.equal(row.find('.product-title-link').attr('href'),`/products/${source.originalProductId}/`);
    const ready=printOptions(bookProducts.find(product=>product.id===source.id),config,papers).some(option=>option.ready);
    assert.equal(row.find(`a[href="/products/${source.id}/"]`).length,ready?1:0);
    for(const group of ['home','gallery'])assert(!collections[group].some(e=>e.product===source.originalProductId));
  }
});

test('book print files preserve native resolution and use content-addressed R2 assets',()=>{
  assert.equal(Object.keys(bookPrints).length,54); // +1: Sunrise on Rainier from Denny Blaine carries the book-art-9ae2… prints (Oct 20 2026)
  assert.equal(Object.values(bookPrints).reduce((count,art)=>count+Object.keys(art.variants).length,0),162);
  assert(Object.values(bookPrints).every(art=>art.enabled===true));
  for(const product of bookProducts){
    const art=bookPrints[product.id];
    if(!art)continue;
    const source=manifest.artworks.find(entry=>entry.id===product.id);
    assert.equal(art.source.sha256,source.masterSha256);
    for(const option of printOptions(product,config,papers)){
      assert(option.resolution.dpi>=300);
      assert(option.asset.layoutSpec.content.width<=source.widthPx);
      assert(option.asset.layoutSpec.content.height<=source.heightPx);
      assert.equal(option.asset.layout,'full-image-white-border-v2');
      assert.equal(option.asset.url,`https://vermillionaurora.com/print-editions/${option.asset.sha256}.jpg`);
      assert(option.asset.layoutSpec.content.left>=300&&option.asset.layoutSpec.content.top>=300);
      assert(option.ready,option.reasons.join(', '));
    }
  }
});

test('perspective-corrected book photos replace the desk photo everywhere and stay display-only',()=>{
  const {corrections}=JSON.parse(fs.readFileSync('catalog/book-photo-corrections.json','utf8'));
  const uploads=JSON.parse(fs.readFileSync('scripts/book-photo-corrections/uploads.json','utf8'));
  assert(corrections.length>0);
  for(const c of corrections){
    const art=manifest.artworks.find(entry=>entry.key===c.key),product=bookProducts.find(p=>p.id===art.id);
    assert.equal(art.masterUrl,c.masterUrl);assert.equal(art.previewUrl,c.previewUrl);
    assert.deepEqual(art.photoCorrection,{widthPx:c.widthPx,heightPx:c.heightPx,masterSha256:c.masterSha256,previewSha256:c.previewSha256,config:'catalog/book-photo-corrections.json'});
    assert.deepEqual(product.image,{src:c.previewUrl,alt:product.title,fullSrc:c.masterUrl,width:c.widthPx,height:c.heightPx});
    assert.equal(art.printCandidate,false);assert(!bookPrints[art.id]);
    for(const [ext,sha] of [['jpg',c.masterSha256],['webp',c.previewSha256]]){
      const u=uploads.find(x=>x.key===`images/book-galleries/v1/${c.output}.${ext}`);
      assert.equal(u.sha256,sha);
      assert.equal(createHash('sha256').update(fs.readFileSync(`scripts/book-photo-corrections/${u.file}`)).digest('hex'),sha);
    }
    const page=fs.readFileSync(`dist/products/${art.id}/index.html`,'utf8'),$=load(page);
    assert(!page.includes(`/v1/${c.key}.`),'old desk photo still referenced');
    assert.deepEqual([...new Set(page.match(new RegExp(`/v1/${c.key}[^"' ]*`,'g')))].sort(),[`/v1/${c.output}.jpg`,`/v1/${c.output}.webp`],'only the current corrected photo is referenced');
    assert.match($('meta[property="og:image"]').attr('content'),/^https:\/\/img\.tjm\.art\/social\//);
    assert.equal(JSON.parse($('script[type="application/ld+json"]').first().html()).image,c.previewUrl);
    assert.equal($('.product-figure img').attr('width'),String(c.widthPx));
    // The frame shrink-wraps. width:auto + max-width/max-height keep the painted aspect, so a tall crop is not letterboxed onto the paper background.
    const css=fs.readFileSync('styles.css','utf8');
    assert.match(css,/\.product-figure \{[^}]*width: fit-content;/);
    assert.match(css,/\.product-figure img \{[^}]*width: auto; height: auto; max-width: 100%; max-height: 75vh;/);
    const galleryCss=fs.readFileSync('src/layouts/BookGalleryLayout.astro','utf8');
    assert.match(galleryCss,/\.book-gallery-page \.ev-three-up \.ev-cell img\{width:auto;height:100%;padding:0;object-fit:contain\}/);
    assert.match(galleryCss,/\.book-gallery-page \.ev-thumbs button\{flex:0 0 auto;width:auto;height:auto;padding:0;background:transparent\}/);
    assert.match(galleryCss,/\.book-gallery-page \.ev-thumbs img\{width:auto;height:62px;object-fit:contain\}/);
    assert.match(galleryCss,/\.book-gallery-page \.painting-list-row \.gallery-product-image img\{object-fit:cover\}/);
    assert.doesNotMatch(galleryCss,/\.book-gallery-page \.ev-three-up \.ev-cell\{background:#f4efe8\}/);
    assert.match(fs.readFileSync('exhibitions/viewer.js','utf8'),/Closest cell, so mixed aspect ratios/);
    assert.equal($('.painting-image-trigger').attr('href'),c.masterUrl);
    for(const section of art.sectionIds){
      const html=fs.readFileSync(`dist/book-galleries/${section}/index.html`,'utf8');
      assert(html.includes(c.previewUrl)&&!html.includes(`/v1/${c.key}.`));
    }
  }
});

test('homepage selected galleries crop portrait heroes to a short landscape tile', () => {
  const src = fs.readFileSync('src/components/BookGalleryCarousel.astro', 'utf8');
  assert.doesNotMatch(src, /style="[^"]*object-fit:\s*contain/);
  assert.match(src, /\.book-section-carousel \.ex-slide img \{[^}]*aspect-ratio:\s*4\s*\/\s*3;[^}]*object-fit:\s*cover;/s);
  assert.match(src, /Explore gallery →/);
  assert.match(src, /alt=\{p\.title\}/);
  assert.match(src, /alt=\{artworkAlt\(hero\)\}/);
  assert.match(src, /aria-roledescription="carousel"/);
  // Shared carousel rules stay put so exhibitions, murals, and featured works are unchanged.
  const css = fs.readFileSync('styles.css', 'utf8');
  assert.match(css, /\.ex-slide img \{ width:100%; aspect-ratio:4\/3; object-fit:cover; background:var\(--paper\); \}/);
  assert.match(css, /\.painting-carousel \.ex-slide img \{ height:100%; aspect-ratio:auto; \}/);
  const home = fs.readFileSync('home-compact.css', 'utf8');
  assert.match(home, /\.home-page #exhibitions \.ex-slide img,\.home-page #featured-artists \.ex-slide img \{ aspect-ratio:16\/9; \}/);
  assert.match(home, /\.home-page #murals \.ex-slide img \{ display:block; height:280px; aspect-ratio:16\/9; object-fit:cover; \}/);
});

