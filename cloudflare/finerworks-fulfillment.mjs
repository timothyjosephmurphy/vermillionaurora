import {finerworksRequest} from './finerworks-api.mjs';
import {finerworksRecipient,groupPrintProducts,quoteFinerWorksPrints} from './finerworks-quotes.mjs';
import {moneyCents} from '../catalog/print-pricing.mjs';
import {printAssetUrl} from './print-asset-policy.mjs';

const terminal=new Set(['complete','review','cancelled','test-complete']);
const reference=/^va-cart-[0-9a-f]{32}-prints$/;
export function finerworksOrderingReady(env,mode=env.PAYPAL_MODE) {
  return ['sandbox','live'].includes(mode)&&env.PAYPAL_MODE===mode&&env.PRINT_PROVIDER==='finerworks'&&env.FINERWORKS_ORDER_ENABLED==='true'&&
    !!env.FINERWORKS_WEB_API_KEY&&!!env.FINERWORKS_APP_KEY&&
    (mode==='sandbox'||!!env.FINERWORKS_PAYMENT_TOKEN&&env.FINERWORKS_PAYMENT_TOKEN!=='xxxx');
}
export function newFinerWorksJob(env,order,items) {
  // The provider rejects the 51-character UUID reference. Keep all UUID bits in 47 characters.
  const q=order.quote,mode=order.mode,po=`va-cart-${String(order.id||'').replaceAll('-','')}-prints`;
  if(!finerworksOrderingReady(env,mode)||!reference.test(po)||q.printQuote?.provider!=='finerworks'||q.printQuote.mode!==mode||
    !/^\d+$/.test(q.printQuote.shippingMethod||'')||items.some(i=>mode==='live'&&(i.testOnly||i.sampleOnly&&env.LIVE_PRINT_SAMPLE_ENABLED!=='true')))throw Error('FinerWorks fulfillment is not enabled for this order');
  groupPrintProducts(items,po);
  const callbackKey=[...crypto.getRandomValues(new Uint8Array(32))].map(n=>n.toString(16).padStart(2,'0')).join('');
  const origin=mode==='sandbox'?env.SANDBOX_RETURN_ORIGIN:'https://vermillion-commissions.timothyjosephmurphy.workers.dev';
  const request={merchantReference:po,orders:[{order_po:po,order_key:null,recipient:finerworksRecipient(q.address,po),
    order_items:items.map(item=>({product_order_po:po,product_sku:item.sku,product_qty:item.quantity,
      product_title:item.title.slice(0,50),product_image:{product_url_file:printAssetUrl(item.assetUrl,mode),product_url_thumbnail:printAssetUrl(item.assetUrl,mode)}})),
    shipping_code:q.printQuote.shippingMethod,test_mode:mode==='sandbox',
    webhook_order_status_url:`${origin}/checkout/prints/callback?order=${order.id}&key=${callbackKey}`}],validate_only:false};
  // Payment credentials are attached only at the provider boundary, never persisted.
  return {provider:'finerworks',status:'pending',mode,callbackKey,request,items,address:q.address,
    maximumProviderCost:q.printQuote.maximumProviderCost,quotedProductionCost:q.printQuote.productionCost,quotedShipping:q.printQuote.shipping,shipments:[]};
}
function parseOrder(job,result,{submitted=false}={}) {
  const rows=result.orders,po=job.request.merchantReference;
  if(!Array.isArray(rows)||rows.length>1||rows.some(r=>r.order_po!==po))throw Error('FinerWorks order identity mismatch');
  if(!rows.length){if(submitted)throw Error('FinerWorks submission did not identify an order');return null;}
  const row=rows[0];
  if(!Number.isSafeInteger(row.order_id)||row.order_id<=0||job.providerId&&String(row.order_id)!==job.providerId)throw Error('FinerWorks order identity mismatch');
  return row;
}
function statusUpdate(job,row) {
  const stage=String(row.order_status_label||row.order_status||'accepted').toLowerCase();
  let status=/(cancel)/.test(stage)?'cancelled':/^(shipped|delivered|completed)$/.test(stage)?'complete':/hold|error|reject|payment|failed/.test(stage)?'review':'in-production';
  // Test orders exercise acceptance but never claim a physical shipment.
  if(job.mode==='sandbox'&&status!=='cancelled'&&status!=='review')status='test-complete';
  const shipments=(row.shipments||[]).map(s=>({id:s.tracking_number||'',carrier:typeof s.carrier==='string'?s.carrier:'',service:typeof s.service==='string'?s.service:'',
    dispatchDate:s.shipment_date||null,trackingNumber:s.tracking_number||'',trackingUrl:safeUrl(s.tracking_url)}));
  return {...job,providerId:String(row.order_id),status,stage,shipments,updatedAt:Date.now(),
    ...(['review','cancelled'].includes(status)?{reason:'FinerWorks reported an order that needs review.'}:{})};
}
function safeUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch{return '';}}
export async function fulfillFinerWorks(env,job,persist) {
  if(terminal.has(job.status))return true;
  if(!finerworksOrderingReady(env,job.mode))throw Error('FinerWorks fulfillment environment changed');
  if(job.checkedAt&&Date.now()-job.checkedAt<60000)return false;
  let next={...job,checkedAt:Date.now()};
  if(next.status==='pending') {
    let quote;
    try {quote=await quoteFinerWorksPrints(env,job.items,job.address);}catch(error) {
      if(/cost changed|needs review/.test(error.message)){await persist({...next,status:'review',reason:'Print cost or material changed after payment. Review before ordering.'});return true;}
      throw error;
    }
    // Use the selected delivery service, not a newly cheaper/different service.
    const option=quote.options.find(o=>o.shippingMethod===job.request.orders[0].shipping_code);
    if(!option||moneyCents(option.maximumProviderCost)>moneyCents(job.maximumProviderCost)) {
      await persist({...next,status:'review',reason:'Print production or delivery costs changed after payment. Review before ordering.'});return true;
    }
    next={...next,status:'creating',attemptedAt:Date.now()};await persist(next);
    try {
      const {merchantReference,...body}=next.request;
      const result=await finerworksRequest(env,'/v3/submit_orders_v2',{...body,payment_token:job.mode==='sandbox'?'xxxx':env.FINERWORKS_PAYMENT_TOKEN});
      const row=parseOrder(next,result,{submitted:true});
      next=statusUpdate(next,row);await persist(next);return terminal.has(next.status);
    } catch(error) {
      // FinerWorks does not document idempotent submission. A timeout is never retried.
      await persist({...next,lastErrorAt:Date.now(),lastError:error.message,providerDiagnostic:error.details||null});return false;
    }
  }
  const result=await finerworksRequest(env,'/v3/fetch_order_status',{order_pos:[job.request.merchantReference],order_ids:job.providerId?[Number(job.providerId)]:[]});
  let row;
  try {row=parseOrder(next,result);}catch {await persist({...next,status:'review',reason:'FinerWorks returned a conflicting order reference. No second order was submitted.'});return true;}
  if(!row) {
    if(Date.now()-(job.attemptedAt||0)>10*60000){await persist({...next,status:'review',reason:'FinerWorks order submission could not be confirmed. Check the saved PO before submitting again.'});return true;}
    await persist(next);return false;
  }
  next=statusUpdate(next,row);await persist(next);return terminal.has(next.status);
}
export function finerworksFulfillmentRecord(job) {
  return {id:job.request.merchantReference,provider:'finerworks',providerOrderId:job.providerId||'',status:job.status,
    productionCost:job.quotedProductionCost,shippingCost:job.quotedShipping,currency:'USD',
    items:job.items.map(i=>({id:i.id,quantity:i.quantity,sku:i.sku,imageSize:i.imageSize,paperSize:i.paperSize,...(i.mat?{mat:i.mat,baseSku:i.baseSku}:{}),...(i.frame?{frame:i.frame}:{})})),shipments:job.shipments||[],reason:job.reason||''};
}
