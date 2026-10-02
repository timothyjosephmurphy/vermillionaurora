import test from 'node:test';
import assert from 'node:assert/strict';
import {etsyAutoForward} from './etsy-fulfillment.mjs';
import {read,write} from './etsy-connection.mjs';
import {ETSY_ORIGIN} from './etsy-connection.mjs';
import {etsySkuForPrintId} from './etsy-listing-plan.mjs';
import prints from './etsy-print-source.mjs';

const now=Date.parse('2026-10-02T20:00:00Z');
class Bucket{
 data=new Map();sequence=0;
 async get(key){const x=this.data.get(key);return x?{etag:x.etag,json:async()=>JSON.parse(x.value)}:null;}
 async put(key,value,{onlyIf}){
  const old=this.data.get(key);
  if(onlyIf.etagMatches&&old?.etag!==onlyIf.etagMatches)return null;
  if(onlyIf.etagDoesNotMatch==='*'&&old)return null;
  const x={value,etag:String(++this.sequence)};this.data.set(key,x);return x;
 }
}
async function setup(enabled=true){
 const env={ETSY_AUTO_FULFILLMENT_ENABLED:enabled?'true':'false',ETSY_KEYSTRING:'etsy-key',ETSY_SHARED_SECRET:'etsy-secret',
  COMMISSION_MANAGER_TOKEN:'manager',COMMISSION_UPLOADS:new Bucket(),PAYPAL_MODE:'live',ETSY_FINERWORKS_MODE:'sandbox',PRINT_PROVIDER:'finerworks',
  FINERWORKS_ORDER_ENABLED:'true',FINERWORKS_WEB_API_KEY:'web-key',FINERWORKS_APP_KEY:'app-key'};
 const print=prints.find(p=>p.id==='warszawska-syrenka'),size=print.variants[0],etsySku=await etsySkuForPrintId('print-'+print.id+'-'+size.key);
 const batch={status:'complete',skuMapVersion:1,items:{[print.id]:{listingId:7654321}},
  skuMap:{[etsySku]:{printId:'print-'+print.id+'-'+size.key,productId:print.id,sizeKey:size.key,frameKey:null,providerSku:size.sku}}};
 await write(env,{connection:{shopId:42,userId:'123',accessToken:'123.access',refreshToken:'123.refresh',expiresAt:now+3600000,scopes:['transactions_r','transactions_w']},etsyDraftBatch:batch},null);
 return {env,print,size,etsySku};
}
const paidReceipt=id=>({receipt_id:id,is_paid:true,is_shipped:false,is_canceled:false,create_timestamp:Math.floor((now+1000)/1000),
 last_modified_timestamp:Math.floor((now+1000)/1000),name:'Buyer Name',first_line:'1 Main Street',second_line:'',city:'Seattle',
 state:'WA',zip:'98101',country_iso:'US',subtotal:{amount:5000,divisor:100,currency_code:'USD'},total_shipping_cost:{amount:0,divisor:100,currency_code:'USD'}});
function mockApis(t,{receipt,transactions,submitStatus=200}){
 const calls=[];
 t.mock.method(globalThis,'fetch',async(url,options={})=>{
  const target=String(url);calls.push({url:target,options});
  if(target.includes('/receipts?'))return Response.json({count:receipt?1:0,results:receipt?[{receipt_id:receipt.receipt_id,is_paid:true,is_shipped:false,
   last_modified_timestamp:receipt.last_modified_timestamp,create_timestamp:receipt.create_timestamp}]:[]});
  if(target.endsWith('/receipts/'+receipt?.receipt_id+'/transactions'))return Response.json({results:transactions});
  if(target.endsWith('/receipts/'+receipt?.receipt_id))return Response.json(receipt);
  if(target.endsWith('/v3/list_shipping_options_multiple')){
   const body=JSON.parse(options.body),order=body.orders[0],line=order.order_items[0];
   return Response.json({status:{success:true},orders:[{order_po:order.order_po,options:[{id:12,rate:4,shipping_method:'UPS Ground',carrier:'UPS',
    calculated_total:{order_po:order.order_po,product_pricing:[{product_code:line.product_sku,product_qty:line.product_qty,total_price:10}],
     order_subtotal:10,order_shipping_rate:4,order_sales_tax:0,order_expedite_fee:0,order_credits_used:0,order_discount:0,order_grand_total:14}}]}]});
  }
  if(target.endsWith('/v3/fetch_order_status'))return Response.json({status:{success:true},orders:[]});
  if(target.endsWith('/v3/submit_orders_v2')){
   if(submitStatus!==200)return Response.json({status:{success:false}},{status:submitStatus});
   const body=JSON.parse(options.body),order=body.orders[0];
   return Response.json({status:{success:true},orders:[{order_id:887766,order_po:order.order_po}]});
  }
  throw Error('Unexpected mocked URL '+target);
 });
 return calls;
}
test('disabled integration does not contact Etsy or FinerWorks',async t=>{
 const {env}=await setup(false),calls=mockApis(t,{});
 assert.deepEqual(await etsyAutoForward(env,now),{skipped:true});
 assert.equal(calls.length,0);
});
test('forwards one paid mapped Etsy print through the FinerWorks sandbox exactly once',async t=>{
 const {env,size,etsySku}=await setup(),receipt=paidReceipt(123456);
 const calls=mockApis(t,{receipt,transactions:[{transaction_id:1,listing_id:7654321,sku:etsySku,quantity:1}]});
 const result=await etsyAutoForward(env,now);
 assert.deepEqual(result,{processed:1});
 const submitted=calls.find(x=>x.url.endsWith('/v3/submit_orders_v2'));
 assert.ok(submitted);
 const body=JSON.parse(submitted.options.body);
 assert.equal(body.validate_only,false);
 assert.equal(body.payment_token,'xxxx');
 assert.equal(body.orders[0].test_mode,true);
 assert.equal(env.PAYPAL_MODE,'live');
 assert.equal(body.orders[0].order_items[0].product_sku,size.sku);
 const {record}=await read(env),job=record.etsyFulfillmentOrders['123456'];
 assert.equal(job.status,'submitted');
 assert.equal(job.providerOrderId,'887766');
 assert.equal(job.receiptId,'123456');
 assert.equal(record.etsyFulfillmentActivatedAt,now);
});
test('address-hidden receipt is saved for review and never sent to FinerWorks',async t=>{
 const {env,etsySku}=await setup(),receipt={...paidReceipt(123457),first_line:'',city:'',state:'',zip:'',country_iso:''};
 const calls=mockApis(t,{receipt,transactions:[{transaction_id:2,listing_id:7654321,sku:etsySku,quantity:1}]});
 await etsyAutoForward(env,now);
 assert.equal(calls.some(x=>x.url.endsWith('/v3/submit_orders_v2')),false);
 const {record}=await read(env),job=record.etsyFulfillmentOrders['123457'];
 assert.equal(job.status,'needs-review');
 assert.match(job.reason,/address/);
});

test('older paid receipts are not imported when automatic forwarding is activated',async t=>{
 const {env,etsySku}=await setup(),receipt={...paidReceipt(123458),last_modified_timestamp:Math.floor((now-1000)/1000)};
 const calls=mockApis(t,{receipt,transactions:[{transaction_id:3,listing_id:7654321,sku:etsySku,quantity:1}]});
 await etsyAutoForward(env,now);
 assert.equal(calls.some(x=>x.url.includes('/receipts/123458')),false);
 assert.equal(calls.some(x=>x.url.endsWith('/v3/submit_orders_v2')),false);
});
test('uncertain supplier submission is reconciled by PO and never submitted twice',async t=>{
 const {env,etsySku}=await setup(),receipt=paidReceipt(123459);
 const calls=mockApis(t,{receipt,transactions:[{transaction_id:4,listing_id:7654321,sku:etsySku,quantity:1}],submitStatus:500});
 await etsyAutoForward(env,now);
 await etsyAutoForward(env,now+11*60_000);
 assert.equal(calls.filter(x=>x.url.endsWith('/v3/submit_orders_v2')).length,1);
 assert.equal(calls.some(x=>x.url.endsWith('/v3/fetch_order_status')),true);
 const {record}=await read(env);
 assert.equal(record.etsyFulfillmentOrders['123459'].status,'needs-review');
});
