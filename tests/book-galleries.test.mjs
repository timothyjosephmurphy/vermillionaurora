import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {load} from 'cheerio';
import manifest from '../catalog/book-galleries.json' with {type:'json'};
import bookProducts from '../catalog/book-products.json' with {type:'json'};
import bookPrints from '../catalog/book-prints.json' with {type:'json'};
import {printOptions,config,papers} from '../catalog/prints.mjs';
import originalProducts from '../catalog/products.json' with {type:'json'};
import collections from '../catalog/collections.json' with {type:'json'};
test('book galleries preserve existing original inventory and collections',()=>{
 const originalIds=new Set(originalProducts.map(p=>p.id));
 for(const p of bookProducts){assert(!originalIds.has(p.id));assert(!p.checkout);assert(!p.listing.price);assert(!p.dimensions,'Unstated units must not become inches');}
 for(const entries of Object.values(collections))for(const e of entries)assert(originalIds.has(e.product));
 for(const g of manifest.sections){const $=load(fs.readFileSync(`dist/book-galleries/${g.id}/index.html`,'utf8'));assert.equal($('h1').text(),g.title);assert.equal($('.book-gallery-card').length,g.artworks.length);for(const id of g.artworks)assert(bookProducts.some(p=>p.id===id));}
 const home=load(fs.readFileSync('dist/index.html','utf8'));assert.equal(home('.book-section-carousel .ex-slide').length,manifest.sections.length);
});
test('book print files preserve native resolution and use content-addressed R2 assets',()=>{
 assert.equal(Object.keys(bookPrints).length,53);
 assert.equal(Object.values(bookPrints).reduce((n,a)=>n+Object.keys(a.variants).length,0),109);
 assert(Object.values(bookPrints).every(a=>a.enabled));
 for(const p of bookProducts){const art=bookPrints[p.id];if(!art)continue;const source=manifest.artworks.find(e=>e.id===p.id);assert.equal(art.source.sha256,source.masterSha256);
  for(const o of printOptions(p,config,papers)){assert(o.resolution.dpi>=300);assert(o.asset.layoutSpec.content.width<=source.widthPx);assert(o.asset.layoutSpec.content.height<=source.heightPx);assert.equal(o.asset.url,`https://media.vermillionaurora.com/images/book-galleries/v1/prints/${o.asset.sha256}.jpg`);if(art.enabled)assert(o.ready,o.reasons.join(', '));}
 }
});
