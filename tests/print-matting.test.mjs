import test from 'node:test';
import assert from 'node:assert/strict';
import {matLayout,matSizeAllowed} from '../catalog/matting.mjs';
import {frameSelection} from '../catalog/frame-matching.mjs';
import {printOptions} from '../catalog/print-sizing.mjs';
import config from '../catalog/prints.json' with {type:'json'};
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
test('mat follows orientation and fits an existing frame without trimming the sheet',()=>{
  for(const [paper,outer] of [[{width:7.5,height:6},{width:10,height:8}],[{width:11.25,height:9},{width:14,height:11}],[{width:15,height:12},{width:20,height:16}],[{width:12,height:15},{width:16,height:20}]]){
    const mat=matLayout(paper);assert.deepEqual(mat.outer,{...outer,unit:'in'});assert.deepEqual(mat.window,{...paper,unit:'in'});
    const selection=frameSelection(paper,paper,'print',mat);
    assert.equal(selection.options.length,1);assert.equal(selection.options[0].fit,'direct');assert.match(selection.options[0].label,/selected mat/);
  }
});
test('unknown, oversized and invalid paper never produce a false fit',()=>{
  for(const paper of [null,{width:0,height:10},{width:NaN,height:10},{width:40,height:90}])assert.equal(matLayout(paper),null);
  assert.equal(matLayout({width:8,height:10},{width:9,height:10}),null);
  const material={id:1,minWidth:4,minHeight:4,maxWidth:8,maxHeight:10};
  assert.equal(matSizeAllowed(material,{width:10,height:8}),true);
  assert.equal(matLayout({width:11,height:14},undefined,material),null);
});
test('mat variants have separate identities, prices and proof gates',()=>{
  const id='painting-portrait-in-green',p={id,type:'painting',dimensions:config.artworks[id].dimensions};
  const options=printOptions(p,config,papers);
  for(const base of options){
    const mat=base.matOptions[0];assert.equal(mat.id,`${base.id}-mat-snow-white`);assert.equal(mat.baseSku,base.paper.sku);assert.equal(mat.ready,false);
    assert(mat.reasons.includes('Approve the mat opening and exact print layout together'));assert.deepEqual(mat.image,base.image);
  }
});
