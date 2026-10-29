import test from 'node:test';
import assert from 'node:assert/strict';
import {products} from '../catalog/catalog.mjs';
import {config,papers,printOptions} from '../catalog/prints.mjs';
import artworks from '../catalog/book-prints.json' with {type:'json'};
import {framedMatLayout} from '../catalog/matting.mjs';
import mats from '../catalog/finerworks-mats.json' with {type:'json'};

test('book prints use the 1 inch sheet and three frame sizes, and stay off sale until quoted',()=>{
  const ids=Object.keys(artworks);
  assert(ids.length>0);
  assert(ids.every(id=>artworks[id].enabled===false));
  for(const id of ids){
    const product=products.find(p=>p.id===id);assert(product,`${id}: product page missing`);
    const options=printOptions(product,config,papers);assert(options.length,`${id}: no print sizes`);
    for(const option of options){
      assert.equal(option.ready,false);
      assert.equal(option.frameOptions.length,3,`${option.id}: expected black, white, and natural frames`);
      assert.deepEqual(option.frameOptions.map(f=>f.finishKey).sort(),['frame-black','frame-natural','frame-white']);
      for(const framed of option.frameOptions){
        assert.equal(framed.ready,false);
        assert.equal(framed.baseSku,option.paper.sku);assert.equal(framed.paper.sku,null);
        assert(framed.mat&&framed.frame);
        assert.deepEqual(framed.mat,framedMatLayout(option.paper,option.image,mats.materials[0]));
      }
    }
  }
});
