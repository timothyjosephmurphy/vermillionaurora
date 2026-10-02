import {ETSY_ORIGIN,authorized,json,read,write} from './etsy-connection.mjs';
import {etsyApiConnection,etsyApiCall} from './etsy-listings.mjs';
import {finerworksRequest} from './finerworks-api.mjs';
import {finerworksRecipient,shippingOptions} from './finerworks-quotes.mjs';
import {printAssetUrl} from './print-asset-policy.mjs';
import prints from './etsy-print-source.mjs';

const API='https://api.etsy.com/v3/application',SITE='https://vermillionaurora.com';
const PAGE_SIZE=100,MAX_NEW_ORDERS=3,LOCK_MS=8*60_000;
const rows=x=>Array.isArray(x?.results)?x.results:[];
const enabled=env=>env.ETSY_AUTO_FULFILLMENT_ENABLED==='true';
const cents=x=>{
 if(typeof x==='number'&&Number.isFinite(x)&&x>=0)return Math.round(x*100);
 if(typeof x==='string'&&/^\d+(?:\.\d{1,2})?$/.test(x))return Math.round(Number(x)*100);
 if(x&&typeof x==='object'&&Number.isFinite(x.amount)&&Number.isFinite(x.divisor)&&x.divisor>0&&x.amount>=0)return Math.round(x.amount/x.divisor*100);
 return null;
};
const hex=b=>Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,'0')).join('');
async function reference(shopId,id){
 const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('vermillion-etsy-v1:'+shopId+':'+id));
 return 'va-etsy-'+hex(hash).slice(0,32);
}
async function update(env,fn){
 for(let i=0;i<4;i++){const {record,etag}=await read(env),saved=await write(env,fn({...record}),etag);if(saved)return;}
 throw Error('Etsy fulfillment state changed during update');
}
async function claim(env,now){
 const lease=hex(crypto.getRandomValues(new Uint8Array(16))),{record,etag}=await read(env);
 if(record.etsyFulfillmentLease?.expiresAt>now)return null;
 return await write(env,{...record,etsyFulfillmentLease:{lease,expiresAt:now+LOCK_MS}},etag)?lease:null;
}
async function release(env,lease){
 try{await update(env,r=>r.etsyFulfillmentLease?.lease===lease?{...r,etsyFulfillmentLease:null}:r);}catch{}
}
async function saveJob(env,id,job){
 await update(env,r=>({...r,etsyFulfillmentOrders:{...(r.etsyFulfillmentOrders||{}),[String(id)]:job}}));
}
const paid=r=>r?.is_paid===true||r?.was_paid===true;
const shipped=r=>r?.is_shipped===true||r?.was_shipped===true;
const cancelled=r=>r?.is_canceled===true||r?.was_canceled===true||r?.was_cancelled===true;
const scopes=t=>Array.isArray(t?.scopes)&&t.scopes.includes('transactions_r')&&t.scopes.includes('transactions_w');
const setup=e=>enabled(e)&&e.PRINT_PROVIDER==='finerworks'&&e.FINERWORKS_ORDER_ENABLED==='true'&&
 ['sandbox','live'].includes(e.ETSY_FINERWORKS_MODE)&&e.FINERWORKS_WEB_API_KEY&&e.FINERWORKS_APP_KEY&&
 (e.ETSY_FINERWORKS_MODE==='sandbox'||e.FINERWORKS_PAYMENT_TOKEN&&e.FINERWORKS_PAYMENT_TOKEN!=='xxxx');
function review(id,po,reason,now){return {receiptId:String(id),orderPo:po,status:'needs-review',reason,createdAt:now,updatedAt:now};}
function catalogMatch(map,sku){
 const p=prints.find(x=>x.id===map?.productId);if(!p||typeof map.providerSku!=='string')return null;
 for(const size of p.variants){
  if(size.sku===map.providerSku)return {product:p,option:size};
  const frame=size.frames?.find(x=>x.sku===map.providerSku);
  if(frame)return {product:p,option:frame};
 }
 return null;
}
function itemsFor(transactions,batch,mode){
 if(batch?.status!=='complete'||batch.skuMapVersion!==1||!batch.skuMap||!batch.items)throw Error('Approved Etsy print listing map is missing.');
 if(!Array.isArray(transactions)||transactions.length<1||transactions.length>12)throw Error('Receipt must contain 1 to 12 print variants.');
 const bySku=new Map();
 for(const tx of transactions){
  const sku=String(tx.sku||''),m=batch.skuMap[sku],listing=batch.items[m?.productId],match=catalogMatch(m,sku),qty=Number(tx.quantity);
  if(!m||!match||!listing?.listingId||String(tx.listing_id)!==String(listing.listingId)||!Number.isSafeInteger(qty)||qty<1||qty>10)throw Error('Receipt has a SKU, listing, or quantity outside the approved Etsy print catalog.');
  const line=bySku.get(sku)||{sku:m.providerSku,qty:0,product:match.product,option:match.option};
  line.qty+=qty;if(line.qty>10)throw Error('Receipt quantity exceeds the FinerWorks limit.');bySku.set(sku,line);
 }
 return [...bySku.values()].map((x,i)=>{
  const image=printAssetUrl(new URL(x.product.image.src,SITE).href,mode);
  return {id:String(i+1),sku:x.sku,qty:x.qty,title:x.product.title,image,option:x.option.key||'unframed'};
 });
}
function addressOf(r){return {name:r.name||r.recipient_name||'',street1:r.first_line||'',street2:r.second_line||'',city:r.city||'',state:r.state||'',zip:r.zip||'',country:r.country_iso||''};}
async function processReceipt(env,token,id,batch,now){
 const po=await reference(token.shopId,id),saveReview=reason=>saveJob(env,id,review(id,po,reason,now));
 let receipt;
 try{receipt=await etsyApiCall(API+'/shops/'+token.shopId+'/receipts/'+id,env,token,{action:'loading paid Etsy receipt'});}
 catch(e){return saveReview(e.etsyStatus===403?'Etsy did not provide this app access to the receipt address. No FinerWorks order was placed.':'Etsy receipt details could not be loaded. No FinerWorks order was placed.');}
 if(String(receipt.receipt_id)!==String(id))return saveReview('Etsy returned a different receipt ID. No FinerWorks order was placed.');
 if(!paid(receipt)||shipped(receipt)||cancelled(receipt))return saveReview('Receipt is unpaid, already shipped, or canceled. No FinerWorks order was placed.');
 const address=addressOf(receipt);
 if(address.country!=='US')return saveReview('Automatic forwarding currently supports complete US delivery addresses only.');
 let recipient;try{recipient=finerworksRecipient(address,po);}catch{return saveReview('Etsy did not provide a complete API-visible US address. No FinerWorks order was placed.');}
 let txs;try{txs=rows(await etsyApiCall(API+'/shops/'+token.shopId+'/receipts/'+id+'/transactions',env,token,{action:'loading receipt print variants'}));}
 catch{return saveReview('Etsy line items could not be loaded. No FinerWorks order was placed.');}
 let items;try{items=itemsFor(txs,batch,env.ETSY_FINERWORKS_MODE);}catch(e){return saveReview(e.message);}
 const itemRevenue=cents(receipt.subtotal),shippingRevenue=cents(receipt.total_shipping_cost);
 if(itemRevenue===null||shippingRevenue===null)return saveReview('Etsy item and shipping totals are missing. Review before forwarding.');
 const orderItems=items.map(i=>({product_order_po:po,product_sku:i.sku,product_qty:i.qty,product_title:i.title.slice(0,50),
  product_image:{product_url_file:i.image,product_url_thumbnail:i.image}}));
 const products=orderItems.map(i=>({product_sku:i.product_sku,product_qty:i.product_qty}));
 const quoteBody={orders:[{order_po:po,order_key:null,recipient,order_items:orderItems,shipping_code:'EC',test_mode:env.ETSY_FINERWORKS_MODE==='sandbox'}]};
 let options;try{options=shippingOptions(await finerworksRequest(env,'/v3/list_shipping_options_multiple',quoteBody),po,products);}
 catch{return saveReview('FinerWorks could not confirm the exact production and shipping cost. Review before forwarding.');}
 const choice=options[0],supplierCost=cents(choice?.maximumProviderCost);
 if(supplierCost===null||supplierCost>itemRevenue+shippingRevenue)return saveReview('FinerWorks total exceeds the Etsy item and shipping proceeds. Review before forwarding.');
 const job={receiptId:String(id),orderPo:po,status:'submitting',items:items.map(i=>({sku:i.sku,quantity:i.qty,title:i.title,option:i.option})),
  providerCost:choice.maximumProviderCost,createdAt:now,updatedAt:now,attemptedAt:now,trackingStatus:'not-shipped'};
 await saveJob(env,id,job);
 try{
  const data=await finerworksRequest(env,'/v3/submit_orders_v2',{orders:[{order_po:po,order_key:null,recipient,order_items:orderItems,
   shipping_code:choice.shippingMethod,test_mode:env.ETSY_FINERWORKS_MODE==='sandbox'}],validate_only:false,
   payment_token:env.ETSY_FINERWORKS_MODE==='sandbox'?'xxxx':env.FINERWORKS_PAYMENT_TOKEN});
  const r=data.orders;
  if(!Array.isArray(r)||r.length!==1||String(r[0].order_po)!==po||!Number.isSafeInteger(r[0].order_id)||r[0].order_id<=0)throw Error('Unconfirmed supplier response');
  await saveJob(env,id,{...job,status:'submitted',providerOrderId:String(r[0].order_id),updatedAt:Date.now()});
 }catch{
  await saveJob(env,id,{...job,status:'submission-uncertain',reason:'FinerWorks may have received the order. The saved PO will be checked before any retry.',updatedAt:Date.now()});
 }
}
const trackingUrl=x=>{try{const u=new URL(x);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch{return '';}}
async function forwardTracking(env,token,job,shipment,now){
 if(!shipment?.tracking_number)return saveJob(env,job.receiptId,{...job,status:'shipped-tracking-review',trackingStatus:'manual-required',reason:'FinerWorks shipped without a tracking number. Update Etsy manually.',updatedAt:now});
 const trackingNumber=String(shipment.tracking_number);
 await saveJob(env,job.receiptId,{...job,status:'shipped-tracking-sending',trackingStatus:'sending',trackingNumber,updatedAt:now});
 let carriers;
 try{carriers=await etsyApiCall(API+'/shops/'+token.shopId+'/shipping-carriers',env,token,{action:'loading Etsy shipping carriers'});}
 catch{return saveJob(env,job.receiptId,{...job,status:'shipped-tracking-review',trackingStatus:'manual-required',trackingNumber,reason:'Etsy carrier details are unavailable. Add tracking manually in Etsy.',updatedAt:Date.now()});}
 const carrier=String(shipment.carrier||''),match=rows(carriers).find(x=>String(x.name||x.carrier_name||'').toLowerCase()===carrier.toLowerCase());
 if(!match)return saveJob(env,job.receiptId,{...job,status:'shipped-tracking-review',trackingStatus:'manual-required',trackingNumber,reason:'Etsy does not list the FinerWorks carrier. Add tracking manually in Etsy.',updatedAt:Date.now()});
 try{
  await etsyApiCall(API+'/shops/'+token.shopId+'/receipts/'+job.receiptId+'/tracking',env,token,{method:'POST',
   headers:{'Content-Type':'application/json'},body:JSON.stringify({tracking_code:trackingNumber,carrier_name:match.name||match.carrier_name}),action:'updating Etsy shipment tracking'});
  return saveJob(env,job.receiptId,{...job,status:'shipped',trackingStatus:'sent',trackingNumber,trackingUrl:trackingUrl(shipment.tracking_url),updatedAt:Date.now()});
 }catch(e){return saveJob(env,job.receiptId,{...job,status:'shipped-tracking-review',trackingStatus:e.etsyStatus===403?'etsy-access-required':'tracking-uncertain',
  trackingNumber,reason:e.etsyStatus===403?'Etsy has not approved this app to submit tracking. Add tracking manually in Etsy.':'Etsy tracking update could not be confirmed. Check Etsy before retrying.',updatedAt:Date.now()});}
}
async function refreshJob(env,token,job,now){
 if(job.lastProviderCheckAt&&now-job.lastProviderCheckAt<55*60_000)return;
 let data;try{data=await finerworksRequest(env,'/v3/fetch_order_status',{order_pos:[job.orderPo],order_ids:job.providerOrderId?[Number(job.providerOrderId)]:[]});}
 catch{return saveJob(env,job.receiptId,{...job,lastProviderCheckAt:now,reason:'FinerWorks status check failed; the saved order will be checked again.',updatedAt:now});}
 const list=Array.isArray(data.orders)?data.orders:[];
 if(list.length>1||list.some(x=>x.order_po!==job.orderPo))return saveJob(env,job.receiptId,{...job,status:'needs-review',reason:'FinerWorks returned a conflicting order reference. No second order was submitted.',updatedAt:now});
 if(!list.length){
  if(now-(job.attemptedAt||job.createdAt)>10*60_000)return saveJob(env,job.receiptId,{...job,status:'needs-review',reason:'FinerWorks could not confirm the saved order. Review before taking action.',updatedAt:now});
  return saveJob(env,job.receiptId,{...job,lastProviderCheckAt:now,updatedAt:now});
 }
 const row=list[0];
 if(!Number.isSafeInteger(row.order_id)||row.order_id<=0||job.providerOrderId&&String(row.order_id)!==job.providerOrderId)return saveJob(env,job.receiptId,{...job,status:'needs-review',reason:'FinerWorks order identity did not match the saved order.',updatedAt:now});
 const label=String(row.order_status_label||row.order_status||'accepted').toLowerCase();
 if(/cancel|reject|hold|error|fail|payment/.test(label))return saveJob(env,job.receiptId,{...job,status:'needs-review',providerOrderId:String(row.order_id),reason:'FinerWorks reported an order that needs review.',updatedAt:now});
 const shipments=Array.isArray(row.shipments)?row.shipments:[];
 if(/ship|deliver|complete/.test(label)||shipments.some(x=>x.tracking_number)){
  if(shipments.length!==1)return saveJob(env,job.receiptId,{...job,status:'shipped-tracking-review',providerOrderId:String(row.order_id),trackingStatus:'manual-required',reason:'FinerWorks split this order into multiple shipments. Add tracking manually in Etsy.',updatedAt:now});
  return forwardTracking(env,token,{...job,providerOrderId:String(row.order_id)},shipments[0],now);
 }
 return saveJob(env,job.receiptId,{...job,status:'in-production',providerOrderId:String(row.order_id),lastProviderCheckAt:now,updatedAt:now});
}
function view(record,env){
 const orders=Object.values(record.etsyFulfillmentOrders||{}).sort((a,b)=>(b.updatedAt||b.createdAt||0)-(a.updatedAt||a.createdAt||0)).slice(0,50);
 return {enabled:enabled(env),activatedAt:record.etsyFulfillmentActivatedAt||null,lastSyncAt:record.etsyFulfillmentLastSyncAt||null,
  lastError:record.etsyFulfillmentLastError||null,orders:orders.map(x=>({receiptId:x.receiptId,status:x.status,reason:x.reason||null,
   providerOrderId:x.providerOrderId||null,trackingStatus:x.trackingStatus||null,trackingNumber:x.trackingNumber||null,updatedAt:x.updatedAt||x.createdAt||null}))};
}
export async function etsyAutoForward(env,now=Date.now()){
 if(!enabled(env)||!setup(env))return {skipped:true};
 let lease;try{lease=await claim(env,now);}catch{return {skipped:true};}
 if(!lease)return {skipped:true};
 try{
  const {token}=await etsyApiConnection(env,now);
  if(!scopes(token))throw Error('Etsy needs transaction read/write authorization. Reconnect Etsy.');
  await update(env,r=>({...r,etsyFulfillmentActivated:true,etsyFulfillmentActivatedAt:r.etsyFulfillmentActivatedAt||now,etsyFulfillmentLastError:null}));
  const {record}=await read(env),batch=record.etsyDraftBatch;
  for(const job of Object.values(record.etsyFulfillmentOrders||{})){
   if(['submitting','submitted','submission-uncertain','in-production'].includes(job.status))await refreshJob(env,token,job,now);
   else if(job.trackingStatus==='sending'&&now-(job.updatedAt||0)>10*60_000)await saveJob(env,job.receiptId,{...job,status:'shipped-tracking-review',trackingStatus:'tracking-uncertain',reason:'Etsy tracking update may have succeeded. Check the receipt before retrying.',updatedAt:now});
  }
  let offset=0,count=0,pages=0;
  while(count<MAX_NEW_ORDERS&&pages<10){
   const since=Math.floor((record.etsyFulfillmentActivatedAt||now)/1000);
   const data=await etsyApiCall(API+'/shops/'+token.shopId+'/receipts?was_paid=true&was_shipped=false&min_last_modified='+since+'&limit='+PAGE_SIZE+'&offset='+offset,env,token,{action:'loading paid Etsy receipts'});
   const receipts=rows(data);if(!Array.isArray(data.results))throw Error('Etsy returned an unreadable receipt list.');
   pages++;
   for(const summary of receipts){
    const id=summary.receipt_id;if(!Number.isSafeInteger(id)||id<=0||!paid(summary)||shipped(summary)||cancelled(summary))continue;
    if((await read(env)).record.etsyFulfillmentOrders?.[String(id)])continue;
    const observed=Number(summary.last_modified_timestamp||summary.create_timestamp||0)*1000;
    if(!observed||observed<(record.etsyFulfillmentActivatedAt||now))continue;
    await processReceipt(env,token,id,batch,now);count++;
    if(count>=MAX_NEW_ORDERS)break;
   }
   if(receipts.length<PAGE_SIZE||offset+PAGE_SIZE>=Number(data.count||0))break;
   offset+=PAGE_SIZE;
  }
  await update(env,r=>({...r,etsyFulfillmentLastSyncAt:now,etsyFulfillmentLastError:null}));
  return {processed:count};
 }catch(e){
  const message=e.message==='Etsy needs transaction read/write authorization. Reconnect Etsy.'?e.message:
   /403|address/i.test(e.message)?'Etsy denied receipt access. Check receipt address permissions with Etsy.':'Order sync could not complete. Check Etsy fulfillment status.';
  try{await update(env,r=>({...r,etsyFulfillmentLastSyncAt:now,etsyFulfillmentLastError:message}));}catch{}
  return {error:message};
 }finally{await release(env,lease);}
}
export async function etsyFulfillment(request,env){
 const url=new URL(request.url);
 if(url.origin!==ETSY_ORIGIN||request.method!=='POST'||url.pathname!=='/etsy/fulfillment/status')return json({error:'Not found'},404);
 if(request.headers.get('Origin')!==ETSY_ORIGIN||!await authorized(request,env))return json({error:'Invalid management credential or origin.'},403);
 if(!env.COMMISSION_UPLOADS||!env.COMMISSION_MANAGER_TOKEN)return json({error:'Private Etsy storage is not configured.'},503);
 try{const {record}=await read(env);return json({ready:setup(env)&&Boolean(record.connection?.accessToken),connected:Boolean(record.connection?.accessToken),...view(record,env)});}
 catch{return json({error:'Etsy fulfillment state is unavailable.'},503);}
}
