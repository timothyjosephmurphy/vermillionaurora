import { env } from 'cloudflare:workers';
import { runInDurableObject, runDurableObjectAlarm, evictDurableObject } from 'cloudflare:test';
import { it, expect, afterEach, vi } from 'vitest';
import { salesCsv, ipnRecord } from '../sales-records.mjs';
import { salesMaintenance } from '../sales-maintenance.mjs';
import { handlePaypalIpn } from '../paypal-inventory.mjs';
import {backfillCheckoutSale} from '../paypal-orders.mjs';

const objects=[];
afterEach(async()=>{
  for(const stub of objects)await runInDurableObject(stub,(_,ctx)=>ctx.storage.deleteAlarm());
  objects.length=0;vi.unstubAllGlobals();
});
const receipt=(extra={})=>({schemaVersion:1,id:'payment:CAP1',kind:'sale',mode:'sandbox',source:'checkout',transactionId:'CAP1',orderId:'ORD1',status:'COMPLETED',
  paidAt:'2026-09-29T09:30:00.000Z',recordedAt:'2026-09-29T09:30:01.000Z',currency:'USD',gross:'26.01',itemAmount:'20.00',shipping:'6.01',tax:'0.00',
  title:'Chase Toole',buyerEmail:'private@example.test',...extra});
function ledger(){const stub=env.SALES_LEDGER.getByName(crypto.randomUUID());objects.push(stub);return stub;}
const read=stub=>runInDurableObject(stub,(_,ctx)=>ctx.storage.sql.exec('SELECT data FROM sales').toArray().map(x=>JSON.parse(x.data)));
it('verifies legacy IPN receipts from the ledger without sending transaction IDs to PayPal Orders',async()=>{
  const period=new Date().toISOString().slice(0,7),stub=env.SALES_LEDGER.getByName(`live:${period}`);objects.push(stub);
  await runInDurableObject(stub,i=>{i.env={...i.env,PAYPAL_MODE:'live'};});
  const record=ipnRecord({},new URLSearchParams({payment_status:'Completed',txn_id:'LEGACYARCHIVE1',mc_currency:'USD',mc_gross:'20.00',payment_date:new Date().toISOString()}));
  await stub.record(record);
  const fetch=vi.fn(()=>{throw Error('No provider call is permitted');});vi.stubGlobal('fetch',fetch);
  const stock={getByName:()=>({order:async()=>({state:'sold',captureId:'LEGACYARCHIVE1',orderId:'ipn:LEGACYARCHIVE1'})})};
  expect(await backfillCheckoutSale({...env,PAYPAL_MODE:'live',PAINTING_STOCK:stock},'legacy-work')).toEqual({recorded:true,period});expect(fetch).not.toHaveBeenCalled();
  expect((await stub.archiveNow()).archived).toBe(true);
  expect(await stub.hasRecordedIpnSale('MISSING')).toBe(false);
});
it('keeps one financial receipt across retries and eviction, with retained fulfillment history',async()=>{
  const stub=ledger();await stub.record(receipt());await stub.record(receipt());
  expect((await stub.summary()).records).toBe(1);
  await evictDurableObject(stub);
  await stub.record(receipt({fulfillment:{labelStatus:'ready',trackingNumber:'TRACK1'}}));
  await stub.record(receipt({source:'ipn',buyerEmail:'',title:'less detailed'}));
  const rows=await read(stub);expect(rows).toHaveLength(1);expect(rows[0].buyerEmail).toBe('private@example.test');
  expect(rows[0].fulfillment.trackingNumber).toBe('TRACK1');
  expect(await runInDurableObject(stub,(_,ctx)=>ctx.storage.sql.exec('SELECT count(*) AS n FROM versions').one().n)).toBe(2);
  expect(await runInDurableObject(stub,async instance=>{try{await instance.record(receipt({gross:'1.00'}));return '';}catch(error){return error.message;}})).toContain('Conflicting payment');
});
it('exports a private CSV and revision backup, retaining a retry alarm if storage fails',async()=>{
  const stub=ledger();
  await runInDurableObject(stub,instance=>{instance.env={...instance.env,PAYPAL_MODE:'live',SALES_ARCHIVE:{put:async()=>{throw Error('R2 unavailable')}}};});
  await stub.record(receipt({mode:'live'}));
  expect(await runInDurableObject(stub,async instance=>{try{await instance.archiveNow();return '';}catch(error){return error.message;}})).toBe('R2 unavailable');
  expect((await stub.summary()).archived).toBe(false);
  expect(await runInDurableObject(stub,(_,ctx)=>ctx.storage.getAlarm())).toBeGreaterThan(Date.now());
  await runInDurableObject(stub,instance=>{instance.env={...instance.env,SALES_ARCHIVE:env.SALES_ARCHIVE};});
  expect((await stub.archiveNow()).archived).toBe(true);
  const csv=await (await env.SALES_ARCHIVE.get('sales/live/2026-09/sales.csv')).text();
  expect(csv).toContain('Chase Toole');expect(csv).toContain('26.01');
  const backup=await (await env.SALES_ARCHIVE.get('sales/live/2026-09/history/revision-1.json')).json();
  expect(backup.records[0].transactionId).toBe('CAP1');
});
it('never exports sandbox transactions into live storage',async()=>{
  const stub=ledger();let writes=0;
  await runInDurableObject(stub,instance=>{instance.env={...instance.env,SALES_ARCHIVE:{put:async()=>{writes++;}}};});
  await stub.record(receipt());await stub.archiveNow();expect(writes).toBe(0);
});
it('stores the receipt atomically with sold state even when the accounting service is unavailable',async()=>{
  const stub=env.PAINTING_STOCK.getByName(crypto.randomUUID());objects.push(stub);
  await stub.initialize('painting-portrait-in-green');await stub.reserve('hold');
  await stub.bindOrder('hold','ORDER',{title:'Chase Toole',base:'20.00',shipping:'6.01',tax:'0.00',total:'26.01',taxCalculationId:'taxcalc_1',address:{name:'Buyer'},quotedAt:Date.now()});
  await runInDurableObject(stub,instance=>{instance.env={...instance.env,SALES_LEDGER:{getByName:()=>({record:async()=>{throw Error('Unavailable')}})}};});
  expect(await stub.complete('ORDER','CAPTURE',{paidAt:'2026-09-29T09:30:00Z',fee:'1.40',net:'24.61',buyerEmail:'buyer@example.test'})).toBe(true);
  expect(await runInDurableObject(stub,async instance=>{try{await instance.archiveSale();return '';}catch(error){return error.message;}})).toBe('Unavailable');
  await runInDurableObject(stub,(_,ctx)=>ctx.storage.deleteAlarm());
  await evictDurableObject(stub);
  expect(await stub.status()).toBe('sold');
  const saved=await runInDurableObject(stub,(_,ctx)=>JSON.parse(ctx.storage.sql.exec('SELECT data FROM sale_receipt').one().data));
  expect(saved.paypalFee).toBe('1.40');expect(saved.gross).toBe('26.01');expect(saved.buyerEmail).toBe('buyer@example.test');
  expect(await stub.archiveSale()).toEqual({recorded:true,period:'2026-09'});
  const target=env.SALES_LEDGER.getByName('sandbox:2026-09');objects.push(target);
});
it('archives unmatched legacy payments and requests retry on ledger failure',async()=>{
  let recorded=[];let fail=false;
  vi.stubGlobal('fetch',vi.fn(async url=>{
    if(String(url).includes('ipnpb.paypal.com'))return new Response('VERIFIED');
    if(String(url).includes('git/ref/'))return Response.json({object:{sha:'main'}});
    if(String(url).includes('git/commits/'))return Response.json({tree:{sha:'tree'}});
    if(String(url).includes('/contents/'))return Response.json({encoding:'base64',content:btoa('{}')});
    throw Error('Unexpected call');
  }));
  const config={PAYPAL_IPN_ENABLED:'true',PAYPAL_MERCHANT_ID:'MERCHANT',GITHUB_TOKEN:'fake',SALES_LEDGER:{getByName:()=>({record:async r=>{if(fail)throw Error('Unavailable');recorded.push(r);}})}};
  const req=()=>new Request('https://test/paypal-ipn',{method:'POST',body:new URLSearchParams({payment_status:'Completed',receiver_id:'MERCHANT',txn_id:'LEGACY1',item_name:'Unmatched work',mc_currency:'USD',mc_gross:'200.00',mc_fee:'6.00',payment_date:'2026-09-29T09:30:00Z'})});
  expect((await handlePaypalIpn(req(),config)).status).toBe(200);expect(recorded[0].gross).toBe('200.00');expect(recorded[0].paypalNet).toBe('194.00');
  fail=true;expect((await handlePaypalIpn(req(),config)).status).toBe(503);
});
it('preserves verified IPN refund adjustments and escapes spreadsheet formulas',()=>{
  const record=ipnRecord({},new URLSearchParams({payment_status:'Refunded',txn_id:'REFUND1',parent_txn_id:'CAP1',mc_currency:'USD',mc_gross:'-20.00',payment_date:'2026-09-29T09:30:00Z'}));
  expect(record.kind).toBe('adjustment');expect(record.parentTransactionId).toBe('CAP1');expect(record.gross).toBe('-20.00');
  expect(record.tax).toBeNull();
  const csv=salesCsv([receipt({buyerName:'=HYPERLINK("https://example.test")',title:'Comma, "quote"'})]);
  expect(csv).toContain("'=HYPERLINK");expect(csv).toContain('Comma, ""quote""');
});
it('denies accounting access without the deployment credential',async()=>{
  const response=await salesMaintenance(new Request('https://test/checkout/sales-maintenance',{method:'POST'}),env);
  expect(response.status).toBe(404);
});
it('does not lose a second sale arriving during an archive write',async()=>{
  const stub=ledger();
  await runInDurableObject(stub,instance=>{
    const bucket=instance.env.SALES_ARCHIVE;let first=true;
    instance.env={...instance.env,PAYPAL_MODE:'live',SALES_ARCHIVE:{put:async(...args)=>{
      if(first){first=false;await instance.record(receipt({mode:'live',id:'payment:CAP2',transactionId:'CAP2',gross:'40.00'}));}
      return bucket.put(...args);
    }}};
  });
  await stub.record(receipt({mode:'live'}));
  await stub.archiveNow();
  expect((await stub.summary()).archived).toBe(false);
  await stub.archiveNow();
  const snapshot=await (await env.SALES_ARCHIVE.get('sales/live/2026-09/sales.json')).json();
  expect(snapshot.records).toHaveLength(2);expect((await stub.summary()).archived).toBe(true);
});
