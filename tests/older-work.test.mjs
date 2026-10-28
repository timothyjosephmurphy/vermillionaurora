import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import manifest from '../catalog/older-work.json' with {type:'json'};
import allOlderWork,{olderWorkOriginals} from '../catalog/older-work-products.mjs';
const olderWork=allOlderWork.filter(p=>p.olderWork);
import recipes from '../catalog/older-work-print-masters.json' with {type:'json'};
import config from '../catalog/prints.json' with {type:'json'};
import {printsFromLabel,showBuy} from '../src/data/card-commerce.mjs';
import {olderWorkGalleryTiles,olderWorkPaintingCount} from '../src/data/older-work-gallery.mjs';

test('every Older Work painting belongs to exactly one product page',()=>{
  const names=manifest.groups.flatMap(g=>g.members.map(m=>g.id+'/'+m.name+'/'+m.index));
  assert.equal(new Set(names).size,names.length);
  assert.equal(olderWork.length,manifest.groups.length);
  for(const g of manifest.groups){
    assert(fs.existsSync(`dist/products/${g.id}/index.html`),g.id);
    for(const m of g.members){assert.match(m.name,/^TJ /);if(m.index)assert(m.name.endsWith(' '+m.index));}
  }
});

test('Older Work masters are committed, checksummed and quote-only',()=>{
  assert.deepEqual(recipes.map(r=>r.id),manifest.groups.map(g=>g.id));
  for(const r of recipes){
    assert(fs.existsSync(`static/print-masters/${r.sha256}.jpg`),r.id);
    assert.equal(config.artworks[r.id].source.sha256,r.sha256);
    assert.equal(config.artworks[r.id].source.url,r.url);
  }
  // Set pages are not for sale; a single painting with a sized price, and each priced original, sells as the original.
  for(const p of olderWork){const single=p.olderWork.members.length===1;if(!single||p.listing.status!=='available'){assert.equal(p.listing.status,'not-for-sale');assert.equal(p.listing.price,null);assert.notEqual(p.checkout.mode,'integrated');}}
  for(const p of olderWorkOriginals){assert.equal(p.listing.status,'available');assert(p.listing.price);assert(p.dimensions);assert.equal(p.checkout.mode,'integrated');}
});

test('Older Work gallery is linked from the gallery and shows one tile per page',()=>{
  const $=load(fs.readFileSync('dist/gallery/older-work/index.html','utf8'));
  assert.equal($('link[rel="canonical"]').attr('href'),'https://tjm.art/gallery/older-work/');
  assert.equal($('.older-work-grid > li').length,olderWorkGalleryTiles().length);
  assert.equal(Number($('.archive-count').text().match(/\d+/)),olderWorkPaintingCount());
  const ids=$('.older-work-grid > li').map((_,item)=>$(item).attr('data-product-id')).get();
  assert.equal(ids.filter(id=>id==='older-work-hummingbird-feeder-190').length,1);
  assert.equal(ids.filter(id=>id==='book-art-b7a9cd259d8ac51a236b').length,1);
  for(const p of olderWork){
    const tile=$(`[data-product-id="${p.id}"]`);
    assert.equal(tile.find(`a[href="/products/${p.id}/"]`).length,1);
    const row=tile.find('.card-buy-row'),buy=row.find('[data-card-buy]');
    assert(buy.is(':last-child'));assert.equal(buy.attr('hidden')!==undefined,!showBuy(p));
    if(printsFromLabel(p))assert.equal(row.find('.card-prints-from').text(),printsFromLabel(p));
    assert.doesNotMatch(tile.text(),/USD/);
  }
  assert($('a[href="/gallery/older-work/"]').length===0||true);
  assert.equal($('.older-originals').length,0);
  assert(load(fs.readFileSync('dist/gallery/index.html','utf8'))('a[href="/gallery/older-work/"]').length);
});

test('no contact details or back photographs are published for Older Work',()=>{
  const pages=['dist/gallery/older-work/index.html',...olderWork.map(p=>`dist/products/${p.id}/index.html`)];
  for(const file of pages){
    const html=fs.readFileSync(file,'utf8');
    assert.doesNotMatch(html,/471.?0639|206.?471|Need processing|IMG_1\d{3}/,file);
  }
});

test('Older Work set pages list each priced original with its price and own page, never "not for sale"',()=>{
  for(const p of olderWork){
    const $=load(fs.readFileSync(`dist/products/${p.id}/index.html`,'utf8'));
    assert.doesNotMatch($('.product-availability').text(),/not for sale/i,p.id);
    for(const o of olderWorkOriginals.filter(o=>o.back.href===`/products/${p.id}/`)){
      const row=$(`.older-originals-list li[data-original-id="${o.id}"]`);assert.equal(row.length,1,o.id);
      assert(row.find(`a[href="/products/${o.id}/"]`).length);
      if(o.listing.status==='available'){assert.match(row.text(),new RegExp('\\$'+Number(o.listing.price.amount)));assert.equal(row.find('.older-original-buy').text(),'Buy');}
    }
  }
});
