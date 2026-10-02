import test from 'node:test';
import assert from 'node:assert/strict';
import {products} from '../catalog/catalog.mjs';
import {config,papers,printOptions} from '../catalog/prints.mjs';
import artworks from '../catalog/book-prints.json' with {type:'json'};

test('every enabled book print size offers three ready, supplier-quoted frames',()=>{
  const ids=Object.keys(artworks).filter(id=>artworks[id].enabled);
  assert(ids.length>0);
  for(const id of ids){
    const product=products.find(p=>p.id===id);assert(product,`${id}: product page missing`);
    const options=printOptions(product,config,papers);assert(options.length,`${id}: no print sizes`);
    for(const option of options){
      assert(option.ready,`${option.id}: ${option.reasons.join('; ')}`);
      assert.equal(option.frameOptions.length,3,`${option.id}: expected black, white, and natural frames`);
      assert.deepEqual(option.frameOptions.map(f=>f.finishKey).sort(),['frame-black','frame-natural','frame-white']);
      for(const framed of option.frameOptions){
        assert(framed.ready,`${framed.id}: ${framed.reasons.join('; ')}`);
        assert(framed.sku);assert(framed.mat&&framed.frame);
        assert(Number(framed.amount)>Number(option.amount));
        assert.equal(framed.asset.url,option.asset.url);assert.equal(framed.asset.sha256,option.asset.sha256);
      }
    }
  }
});
