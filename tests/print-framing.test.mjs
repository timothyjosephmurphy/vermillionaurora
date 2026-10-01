import test from 'node:test';
import assert from 'node:assert/strict';
import config from '../catalog/legacy-print-samples.json' with {type:'json'};
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
import {printOptions} from '../catalog/print-sizing.mjs';
test('framed samples require their exact approved frame, mat, file, dimensions and saved price',()=>{
  const id='painting-portrait-in-green',p={id,type:'painting',dimensions:config.artworks[id].dimensions};
  const small=c=>printOptions(p,c,papers).find(o=>o.key==='small').frameOptions.find(o=>o.finishKey==='frame-black');
  assert.equal(small(config).ready,true);assert.equal(small(config).amount,'59.63');
  for(const mutate of [v=>v.asset.approved=false,v=>v.asset.sha256='0'.repeat(64),v=>v.asset.sourceSha256='0'.repeat(64),v=>v.asset.paperWidthIn=8,v=>v.asset.sampleOnly=false,v=>v.asset.frame.id=2,v=>v.frame.glazing.id=3,v=>v.mat.outer.width=12,v=>v.amount='25.00',v=>v.unframedAmount='30.00',v=>v.pricingRule='finerworks-3.5x-v1',v=>v.sku='different-code']){
    const c=structuredClone(config);mutate(c.artworks[id].variants.small.frameOptions.black);assert.equal(small(c).ready,false);
  }
});
