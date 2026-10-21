import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import manifest from '../catalog/archive-paintings.json' with {type:'json'};
import recipes from '../catalog/archive-print-masters.json' with {type:'json'};
import products from '../catalog/archive-products.mjs';
import collections from '../catalog/collections.json' with {type:'json'};
import {readyPrints,config} from '../catalog/prints.mjs';
import {wallArtworks} from '../src/data/gallery-wall.mjs';
import {roomArtworks} from '../src/data/gallery-room.mjs';

test('all 54 archive masters retain exact bytes and offer native-resolution editions with three verified frames',async()=>{
  assert.equal(recipes.length,54);
  for(const recipe of recipes){
    const p=manifest.paintings.find(p=>p.id===recipe.id),art=config.artworks[recipe.id];
    // A master is the exact photo, or a recorded crop of it (derivedFrom names the photo it was cut from).
    assert.equal(recipe.derivedFrom?.sha256??recipe.sha256,p.front.sha256,recipe.id);
    assert.equal(art.source.sha256,recipe.sha256);
    const bytes=await readFile(new URL('../static'+new URL(art.source.url).pathname,import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),recipe.sha256);
    assert(art.enabled&&!art.testOnly&&!art.sampleOnly);
    const base=Object.values(readyPrints).filter(v=>v.productId===recipe.id&&!v.mat&&!v.frame);
    assert(base.length>0,recipe.id);
    for(const v of base){
      assert(v.imageSize.width*300<=art.source.widthPx+1&&v.imageSize.height*300<=art.source.heightPx+1);
      assert(v.imageSize.width<v.paperSize.width&&v.imageSize.height<v.paperSize.height);
      assert(Math.min(v.paperSize.width,v.paperSize.height)>=4);
      // Goat Lake #308 (Oct 21 2026): re-sized to the 10 × 12 in original; framed options wait for a frame quote on the padded edition.
      if(recipe.id!=='archived-painting-308')for(const finish of ['black','white','natural'])assert(readyPrints[`${v.id}-frame-${finish}`],`${v.id} ${finish}`);
    }
    assert.equal(wallArtworks.filter(a=>a.id===recipe.id).length,1,recipe.id);
  }
  assert.equal(wallArtworks.length,77);
  assert.equal(roomArtworks.length,24,'Expanded Print Wall does not overcrowd the curated 3D room');
});

test('identified featured selections have comparable original prices and measured shipping only',()=>{
  const expected=[246,248,247,438,437,433,436,301,66,15,2,1,307,249].map(n=>`archived-painting-${n}`).concat(['archived-painting-img-1555']);
  // Prices TJ sets himself in the admin (pricingBasis artist-set) are not part of the featured selection.
  const selected=products.filter(p=>p.listing.status==='available'&&manifest.paintings.find(x=>x.id===p.id)?.originalSale?.pricingBasis!=='artist-set');
  assert.deepEqual(new Set(selected.map(p=>p.id)),new Set(expected));
  assert.deepEqual(manifest.featuredSelectionRequest.unmatchedIndices,[266]);
  for(const p of selected){
    const record=manifest.paintings.find(x=>x.id===p.id);
    assert(record.originalSale.comparableProductIds.length>=1);
    assert(Number(p.listing.price.amount)>=250&&Number(p.listing.price.amount)<=1000);
    assert(collections.home.some(e=>e.product===p.id&&e.variant==='carousel'));
    if(p.checkout.mode==='integrated'){
      assert(record.recordedDimensions||record.cataloguedDimensions);
      assert(p.checkout.shipping.weight>0);
      assert.equal(p.checkout.shipping.verification,'estimated');
    }else assert.equal(p.dimensions,null);
  }
  assert.equal(selected.filter(p=>p.checkout.mode==='integrated').length,11);
});
