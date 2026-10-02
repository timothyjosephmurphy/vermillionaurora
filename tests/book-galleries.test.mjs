import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import manifest from '../catalog/book-galleries.json' with {type:'json'};
import bookProducts from '../catalog/book-products.json' with {type:'json'};
import bookPrints from '../catalog/book-prints.json' with {type:'json'};
import {printOptions,config,papers} from '../catalog/prints.mjs';
import originalProducts from '../catalog/products.json' with {type:'json'};
import collections from '../catalog/collections.json' with {type:'json'};

const groups=new Map(manifest.sections.map(group=>[group.id,group]));

test('book gallery sections are consolidated without changing painting inventory',()=>{
  const originalIds=new Set(originalProducts.map(product=>product.id));
  for(const product of bookProducts){
    assert(!originalIds.has(product.id));
    assert(!product.checkout);
    assert(!product.listing.price);
    assert(!product.dimensions,'Unstated units must not become inches');
  }
  for(const entries of Object.values(collections))for(const entry of entries)assert(originalIds.has(entry.product));

  assert.equal(manifest.sections.length,10);
  assert.equal(manifest.sections.filter(group=>group.title==='About the Author').length,1);
  for(const removed of ['Foreword','Afterword: Who is Satoshi Nakamoto?','Tomer, Valerie, and Marisa','Chase','Lisa','Daniel','Laura','Catherine','Dawn'])
    assert(!manifest.sections.some(group=>group.title===removed),`${removed} gallery should be removed`);

  const friends=groups.get('watercolor-portraits-friends');
  assert(friends.artworks.includes('book-art-b7a9cd259d8ac51a236b'),'The rescued hummingbird belongs in Friends');
  assert.equal(new Set(friends.artworks).size,friends.artworks.length);
  for(const id of ['book-art-2a670ca4f87a8cbd8b02','book-art-d78badff7e21472c00b8'])
    assert(!manifest.sections.some(group=>group.artworks.includes(id)),`${id} should be absent from every book gallery`);

  const travels=groups.get('watercolor-landscapes-travels');
  assert(travels);
  assert.equal(travels.artworks.length,38);
  for(const id of ['book-art-c198f09bc8ddad18ed1e','book-art-87cf2a732259b313f5ab','book-art-ac338ff3806b66917b3c','book-art-56e40e02275a8767a802','book-art-27fee33e69f262ecfacb','book-art-55829535637cd4974a88','book-art-e589c9375e23d1de4748'])
    assert(travels.artworks.includes(id));

  for(const group of manifest.sections){
    const $=load(fs.readFileSync(`dist/book-galleries/${group.id}/index.html`,'utf8'));
    assert.equal($('h1').text(),group.title);
    assert.equal($('.book-art-carousel .book-art-slide').length,group.artworks.length);
    assert.equal($('.book-art-carousel .ex-controls').length,1);
    assert.equal($('.book-measurement-note').length,0);
    assert(!$('.book-art-carousel').text().toLowerCase().includes('book measurements'));
    const expected=group.artworks.filter(id=>printOptions(bookProducts.find(product=>product.id===id),config,papers).some(option=>option.ready)).length;
    assert.equal(Number($('.book-gallery-stats').attr('data-print-ready-count')),expected);
    for(const id of group.artworks)assert(bookProducts.some(product=>product.id===id));
  }
  const overview=load(fs.readFileSync('dist/book-galleries/index.html','utf8'));
  const uniqueIds=[...new Set(manifest.sections.flatMap(group=>group.artworks))];
  const printReady=uniqueIds.filter(id=>printOptions(bookProducts.find(product=>product.id===id),config,papers).some(option=>option.ready)).length;
  assert.equal(Number(overview('.book-gallery-print-total').attr('data-total-print-ready-count')),printReady);
  const home=load(fs.readFileSync('dist/index.html','utf8'));
  assert.equal(home('.book-section-carousel .ex-slide').length,manifest.sections.length);
});

test('book print files preserve native resolution and use content-addressed R2 assets',()=>{
  assert.equal(Object.keys(bookPrints).length,53);
  assert.equal(Object.values(bookPrints).reduce((count,art)=>count+Object.keys(art.variants).length,0),109);
  assert(Object.values(bookPrints).every(art=>art.enabled));
  for(const product of bookProducts){
    const art=bookPrints[product.id];
    if(!art)continue;
    const source=manifest.artworks.find(entry=>entry.id===product.id);
    assert.equal(art.source.sha256,source.masterSha256);
    for(const option of printOptions(product,config,papers)){
      assert(option.resolution.dpi>=300);
      assert(option.asset.layoutSpec.content.width<=source.widthPx);
      assert(option.asset.layoutSpec.content.height<=source.heightPx);
      assert.equal(option.asset.url,`https://media.vermillionaurora.com/images/book-galleries/v1/prints/${option.asset.sha256}.jpg`);
      if(art.enabled)assert(option.ready,option.reasons.join(', '));
    }
  }
});
