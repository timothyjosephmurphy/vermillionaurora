import test from 'node:test';
import assert from 'node:assert/strict';
import {inquiryReference,notifyAddress,autoReply,logInquiry} from './commission-form.mjs';
test('reference is TJM-YYMMDD-XXXX in Pacific time',()=>{
  assert.equal(inquiryReference('7f3a1b2c-0000-4000-8000-000000000000',new Date('2026-10-21T02:00:00Z')),'TJM-261020-7F3A');
});
test('notifications go to tj@tjm.art unless overridden',()=>{
  assert.equal(notifyAddress({}),'tj@tjm.art');
  assert.equal(notifyAddress({COMMISSION_NOTIFY_TO:'x@y.z'}),'x@y.z');
});
test('auto-reply: first name, reference, no prices or emojis',()=>{
  for (const a of [autoReply({name:'Ana Lopez',email:'a@b.co',reference:'TJM-261020-7F3A'}),autoReply({name:'Ana',email:'a@b.co',reference:'TJM-261020-7F3A',paintingTitle:'Hope'}),autoReply({name:'Ana',email:'a@b.co',reference:'TJM-261020-7F3A',paintingTitle:'Hope',quote:true})]){
    assert.match(a.text,/^Hi Ana,/); assert.match(a.text,/TJM-261020-7F3A/); assert.match(a.subject,/TJM-261020-7F3A/);
    assert.doesNotMatch(a.text,/\$|\p{Extended_Pictographic}/u); assert.equal(a.to,'a@b.co');
  }
  assert.match(autoReply({name:'Ana',email:'a@b.co',reference:'TJM-261020-7F3A',paintingTitle:'Hope',quote:true}).text,/shipping quote for Hope/);
});
test('inquiry log writes one row and never throws',async()=>{
  const runs=[]; const db={prepare:sql=>({run:async()=>runs.push(sql),bind:(...v)=>({run:async()=>runs.push([sql,v])})})};
  assert.equal(await logInquiry({CATALOG_DB:db},{requestId:'r',reference:'TJM',kind:'commission',name:'A',email:'a@b.co',description:'d'}),true);
  assert.equal(runs.filter(r=>Array.isArray(r)).length,1);
  assert.equal(await logInquiry({CATALOG_DB:{prepare:()=>{throw Error('x')}}},{}),false);
  assert.equal(await logInquiry({},{}),false);
});
