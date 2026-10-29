import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import config from '../catalog/prints.json' with {type:'json'};
import recipes from '../catalog/tj-print-masters.json' with {type:'json'};
import {readyPrints} from '../catalog/prints.mjs';
import {EDITION_LAYOUT} from '../catalog/edition-layout.mjs';
test('TJ masters keep native-resolution 1 inch sheets and stay off sale until quoted',async()=>{
  assert.equal(recipes.length,23);
  for(const recipe of recipes){
    const art=config.artworks[recipe.id];
    assert.equal(art.enabled,false);assert(!art.sampleOnly&&!art.testOnly);
    assert.equal(Object.values(readyPrints).filter(p=>p.productId===recipe.id).length,0);
    if(recipe.layoutOptions?.sizeKeys)assert.deepEqual(Object.keys(art.variants),recipe.layoutOptions.sizeKeys);
    const source=await readFile(new URL('../static'+new URL(art.source.url).pathname,import.meta.url));
    assert.equal(createHash('sha256').update(source).digest('hex'),art.source.sha256);
    for(const v of Object.values(art.variants)){
      assert.equal(v.asset.layout,EDITION_LAYOUT);assert.equal(v.amount,undefined);assert.equal(v.frameOptions,undefined);
      assert(v.asset.layoutSpec.content.left>=300&&v.asset.layoutSpec.content.top>=300);
      assert(v.asset.imageWidthIn*300<=art.source.widthPx+1&&v.asset.imageHeightIn*300<=art.source.heightPx+1);
    }
  }
});

test('Cormorant mural master is the exact 3:2 crop of the high-resolution photo, prepared at three native-resolution sizes',()=>{
  const art=config.artworks['cormorant-presiding-over-sunset-on-puget-sound'];
  assert.equal(art.source.widthPx*2,art.source.heightPx*3,'exact 3:2, no padding');
  assert(art.source.widthPx>=6700&&!art.layoutOptions);
  assert.deepEqual(Object.keys(art.variants),['full','medium','small']);
  for(const v of Object.values(art.variants)){
    assert.equal(v.asset.sourceSha256,art.source.sha256);
    assert.match(v.sku,/^5M144M8S/);
    assert(v.asset.paperWidthIn>=v.asset.imageWidthIn+1.9&&v.asset.paperHeightIn>=v.asset.imageHeightIn+1.9);
  }
});
