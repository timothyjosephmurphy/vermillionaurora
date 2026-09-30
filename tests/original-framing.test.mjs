import test from 'node:test';
import assert from 'node:assert/strict';
import {originalFramingOffer,originalFramingRequest,framingTermsVersion} from '../catalog/original-framing.mjs';
import {cartItems,publicCartItem} from '../cloudflare/cart-policy.mjs';
import {newShippingJob,fulfillSale} from '../cloudflare/shipping-fulfillment.mjs';
import prints from '../cloudflare/print-catalog.mjs';

const painting={type:'painting',listing:{status:'available'},checkout:{mode:'integrated'},surface:'Watercolor paper',framing:'Unframed',dimensions:{width:12,height:15,unit:'in'}};
const request={style:'black',termsVersion:framingTermsVersion};
test('original framing estimates use physical artwork size, orientation and mail-in/delivery fees',()=>{
  for(const [width,height,estimate] of [[5,7,'95.00'],[12,9,'125.00'],[12,15,'160.00'],[18,24,'210.00'],[24,34,'300.00'],[40,32,'400.00']]){
    assert.equal(originalFramingOffer({...painting,dimensions:{width,height,unit:'in'}}).estimate,estimate);
  }
  assert.equal(originalFramingOffer({...painting,dimensions:{width:30.48,height:38.1,unit:'cm'}}).estimate,'160.00');
  assert.equal(originalFramingOffer({...painting,dimensions:{width:13,height:13,unit:'in'}}).estimate,'210.00');
});
test('framing is not offered for prints, sold work, existing frames, missing measurements or oversized art',()=>{
  for(const override of [{type:'print'},{listing:{status:'sold'}},{surface:'canvas'},{surface:'framed'},{framing:'Already framed'},{checkout:{mode:'inquiry'}},{dimensions:null},{dimensions:{width:33,height:41,unit:'in'}},{dimensions:{width:0,height:5,unit:'in'}}])assert.equal(originalFramingOffer({...painting,...override}),null);
});
test('server keeps only the chosen preference and authoritative estimate; malformed requests fail closed',()=>{
  const selection=originalFramingRequest({...request,estimate:'0.01',status:'paid'},originalFramingOffer(painting));
  assert.equal(selection.estimate,'160.00');assert.equal(selection.mode,'quote-request');assert.equal(selection.status,undefined);
  const line=cartItems([{id:'painting-portrait-in-green',quantity:1,amount:'0.01',framing:{...request,estimate:'0.01'}}])[0];
  assert.equal(line.amount,'20.00');assert.equal(line.framing.estimate,'160.00');assert.equal(publicCartItem(line).framing.style,'black');
  for(const bad of [{...request,style:'__proto__'},{...request,termsVersion:'old'},true,[],{}])assert.throws(()=>originalFramingRequest(bad,originalFramingOffer(painting)));
  assert.throws(()=>originalFramingRequest(request,null));
  assert.throws(()=>cartItems([{id:Object.keys(prints)[0],quantity:1,framing:request}]));
  assert.equal(cartItems([{id:'painting-portrait-in-green',quantity:1}])[0].framing,undefined);
});
test('a framing request never buys the saved direct-to-buyer shipping label',async()=>{
  const quote={slug:'painting-portrait-in-green',framing:{...request,shippingCredit:'6.00'}};
  const job=newShippingJob({PAYPAL_MODE:'live',SHIPPO_AUTO_LABEL_ENABLED:'true'},'cart:example',quote);
  assert.equal(job.status,'framing-requested');
  assert.equal(await fulfillSale({}, {order_id:'cart:example',state:'sold',capture_id:'CAPTURE'},job,()=>{throw Error('Must not mutate the held shipment');}),true);
  assert.equal(newShippingJob({SHIPPO_AUTO_LABEL_ENABLED:'true'},'other',{}).status,'pending');
});
