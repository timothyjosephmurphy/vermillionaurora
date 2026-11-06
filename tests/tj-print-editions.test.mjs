import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import config from '../catalog/prints.json' with {type:'json'};
import recipes from '../catalog/tj-print-masters.json' with {type:'json'};
import {readyPrints} from '../catalog/prints.mjs';
import {EDITION_LAYOUT} from '../catalog/edition-layout.mjs';
import {manifestCoversSource} from '../scripts/lib/print-master-file.mjs';
test('reviewed TJ masters sell 1 inch sheets with three quoted frames',async()=>{
  assert.equal(recipes.length,23);
  for(const recipe of recipes){
    const art=config.artworks[recipe.id];
    assert.equal(art.enabled,true);assert(!art.sampleOnly&&!art.testOnly);
    assert.equal(Object.values(readyPrints).filter(p=>p.productId===recipe.id).length>0,true);
    try{const source=await readFile(new URL('../static'+new URL(art.source.url).pathname,import.meta.url));assert.equal(createHash('sha256').update(source).digest('hex'),art.source.sha256);}
    catch(error){if(error.code!=='ENOENT')throw error;assert.equal(manifestCoversSource(art.source)?.sha256,art.source.sha256,recipe.id);}
    assert(Object.keys(art.variants).length);
    for(const v of Object.values(art.variants))assert.equal(v.asset.layout,EDITION_LAYOUT);
  }
});
