import {prodigiEnvironment,prodigiRequest,quotePrints,validateProdigiOrder} from './prodigi-api.mjs';
import {newFinerWorksJob,fulfillFinerWorks,finerworksFulfillmentRecord} from './finerworks-fulfillment.mjs';
export function newPrintJob(env,order,items) {
  if(order.quote?.printQuote?.provider==='finerworks'||items.some(i=>i.provider==='finerworks'))return newFinerWorksJob(env,order,items);
  const q=order.quote,a=q.address,mode=order.mode,key=crypto.randomUUID(),callbackKey=[...crypto.getRandomValues(new Uint8Array(32))].map(n=>n.toString(16).padStart(2,'0')).join('');
  const origin=mode==='sandbox'?env.SANDBOX_RETURN_ORIGIN:'https://vermillion-commissions.timothyjosephmurphy.workers.dev';
  const request={idempotencyKey:key,merchantReference:`va-cart-${order.id}-prints`,shippingMethod:q.printQuote.shippingMethod,
    callbackUrl:`${origin}/checkout/prints/callback?order=${order.id}&key=${callbackKey}`,
    recipient:{name:a.name,address:{line1:a.street1,line2:a.street2||'',postalOrZipCode:a.zip,countryCode:'US',townOrCity:a.city,stateOrCounty:a.state}},
    items:items.map(i=>({merchantReference:i.id,sku:i.sku,copies:i.quantity,sizing:'fitPrintArea',attributes:i.attributes||{},assets:[{printArea:'default',url:i.assetUrl}]}))};
  return {provider:'prodigi',status:'pending',mode,callbackKey,request,items,maximumProviderCost:q.printQuote.maximumProviderCost,quotedProductionCost:q.printQuote.productionCost,quotedShipping:q.printQuote.shipping,shipments:[]};
}
export async function fulfillPrints(env,job,persist) {
  if(job.provider==='finerworks')return fulfillFinerWorks(env,job,persist);
  prodigiEnvironment(env,job.mode);
  if(['complete','review','cancelled'].includes(job.status))return true;
  if(job.checkedAt&&Date.now()-job.checkedAt<60000)return false;
  let next={...job,checkedAt:Date.now()};
  if(!next.providerId&&next.status==='pending') {
    // Validate price once before the first create. Retried creates use the exact saved body/key.
    const quote=await quotePrints(env,job.items);
    if(Number(quote.maximumProviderCost)>Number(job.maximumProviderCost)+0.01){await persist({...next,status:'review',reason:'Print production or shipping cost increased after payment. Review before fulfillment.'});return true;}
    next={...next,status:'creating',attemptedAt:Date.now()};await persist(next);
  }
  let order;
  try {
    const result=await prodigiRequest(env,next.providerId?`/orders/${next.providerId}`:'/orders',next.providerId?undefined:next.request,next.mode);
    order=validateProdigiOrder(next,result.order);
  } catch(error) {
    // A lost successful create reply is retried with the same indefinite Prodigi idempotency key.
    if(error.status&&error.status>=400&&error.status<500&&error.status!==429||error.outcome==='CreatedWithIssues'||/mismatch/.test(error.message)){
      await persist({...next,status:'review',reason:'The print provider needs attention. Check the saved order reference before taking action.'});return true;
    }
    await persist({...next,lastErrorAt:Date.now()});throw error;
  }
  const stage=String(order.status?.stage||'').toLowerCase(),issues=order.status?.issues||[];
  const shipments=(order.shipments||[]).map(s=>({id:s.id||'',carrier:s.carrier?.name||'',service:s.carrier?.service||'',dispatchDate:s.dispatchDate||null,
    trackingNumber:s.tracking?.number||'',trackingUrl:safeTrackingUrl(s.tracking?.url),items:s.items||[]}));
  let status=stage==='complete'?'complete':stage==='cancelled'?'cancelled':'in-production';
  if(issues.length||['awaitingpayment','draft'].includes(stage))status='review';
  await persist({...next,providerId:order.id,status,stage,shipments,charges:order.charges||[],issues,updatedAt:Date.now(),...(status==='review'?{reason:'Prodigi reported an issue with the print order.'}:{}),...(status==='cancelled'?{reason:'Prodigi cancelled this print order; review the customer payment.'}:{})});
  return ['complete','cancelled','review'].includes(status);
}
function safeTrackingUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch{return '';}}
export function printFulfillmentRecord(job) {
  if(job.provider==='finerworks')return finerworksFulfillmentRecord(job);
  return {id:job.request.merchantReference,provider:'prodigi',providerOrderId:job.providerId||'',status:job.status,
    productionCost:job.quotedProductionCost,shippingCost:job.quotedShipping,currency:'USD',charges:job.charges||[],items:job.items.map(i=>({id:i.id,quantity:i.quantity,sku:i.sku,imageSize:i.imageSize,paperSize:i.paperSize})),shipments:job.shipments||[],reason:job.reason||''};
}
