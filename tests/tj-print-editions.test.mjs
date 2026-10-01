import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import config from '../catalog/prints.json' with {type:'json'};
import recipes from '../catalog/tj-print-masters.json' with {type:'json'};
import {readyPrints} from '../catalog/prints.mjs';
test('All 18 reviewed TJ masters have native-resolution editions and three frames at every approved size',async()=>{
  assert.equal(recipes.length,18);
  let sizes=0;
  for(const recipe of recipes){
    const art=config.artworks[recipe.id],base=Object.values(readyPrints).filter(p=>p.productId===recipe.id&&!p.mat&&!p.frame);
    assert(art.enabled);assert(!art.sampleOnly&&!art.testOnly);assert(base.length);sizes+=base.length;
    if(recipe.layoutOptions)assert.deepEqual(base.map(p=>p.sizeKey),['full']);
    const source=await readFile(new URL('../static'+new URL(art.source.url).pathname,import.meta.url));
    assert.equal(createHash('sha256').update(source).digest('hex'),art.source.sha256);
    for(const p of base){
      assert(p.minimumDpi>=300);assert(p.imageSize.width<p.paperSize.width&&p.imageSize.height<p.paperSize.height);
      assert(Math.min(p.paperSize.width,p.paperSize.height)>=4);
      assert(p.imageSize.width*300<=art.source.widthPx+1&&p.imageSize.height*300<=art.source.heightPx+1);
      for(const finish of ['black','white','natural']){
        const f=readyPrints[`${p.id}-frame-${finish}`];assert(f);assert.equal(f.assetSha256,p.assetSha256);assert(f.frame&&f.mat);assert(Number(f.amount)>Number(p.amount));
      }
    }
  }
  assert.equal(sizes,37);
});
