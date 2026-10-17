import test from 'node:test';
import assert from 'node:assert/strict';
import { salesTax, waRate, parseRateResponse, TaxAddressError } from './wa-sales-tax.mjs';
import { salesReceiptPayload } from './quickbooks-core.mjs';

const MATCH='<?xml version="1.0" encoding="utf-8"?><response loccode="1726" localrate=".0405" rate=".1055" code="2" xmlns=""><addressline code="1726" street="BROAD ST" state="WA" zip="98109" period="Q42026" /><rate name="SEATTLE" code="1726" staterate=".0650" localrate=".0405" /></response>';
const ZIP=MATCH.replace('code="2"','code="5"');
const NONE='<?xml version="1.0" encoding="UTF-8" ?><response loccode="-1" localrate="-1" rate="-1" code="9" debughint="Zipcode is invalid for WA State." />';
const seattle={street1:'400 Broad St',city:'Seattle',state:'WA',zip:'98109',country:'US'};
function mockDor(t,replies){
  const urls=[];
  t.mock.method(globalThis,'fetch',async(url,options={})=>{
    urls.push(new URL(url));assert.equal(options.method,'GET');
    const next=replies.shift();if(next instanceof Error)throw next;
    return typeof next==='number'?new Response('error',{status:next}):new Response(next,{headers:{'Content-Type':'text/xml'}});
  });
  return urls;
}

test('parses the DOR XML response',()=>{
  assert.deepEqual(parseRateResponse(MATCH),{code:2,rate:'.1055',loccode:'1726',jurisdiction:'SEATTLE',period:'Q42026'});
  assert.equal(parseRateResponse('<html/>'),null);
});

test('WA match: rate × (artwork + framing + shipping), rounded to the cent',async t=>{
  const urls=mockDor(t,[MATCH]);
  // $1,000 artwork + $150 framing + $25 shipping = $1,175.00 × 10.55% = $123.9625 → $123.96
  const {taxCents,tax}=await salesTax(seattle,117500);
  assert.equal(taxCents,12396);
  assert.deepEqual(tax,{state:'WA',collected:true,source:'wa-dor',rate:'0.1055',loccode:'1726',jurisdiction:'SEATTLE',period:'Q42026',basis:'address',resultCode:2});
  assert.equal(urls.length,1);assert.equal(urls[0].origin+urls[0].pathname,'https://webgis.dor.wa.gov/webapi/AddressRates.aspx');
  assert.deepEqual(Object.fromEntries(urls[0].searchParams),{output:'xml',addr:'400 Broad St',city:'Seattle',zip:'98109'});
  // Half-cent rounds up: $10.00 × 10.55% = $1.055 → $1.06
  mockDor(t,[MATCH]);assert.equal((await salesTax(seattle,1000)).taxCents,106);
});

test('WA fallback: an unmatched, failed or partial address lookup uses the ZIP-only rate',async t=>{
  for(const first of [NONE,ZIP,500,new Error('network'),'not xml']){
    const urls=mockDor(t,[first,ZIP]);
    const {taxCents,tax}=await salesTax(seattle,10000);
    assert.equal(taxCents,1055);assert.equal(tax.basis,'zip');assert.equal(tax.loccode,'1726');
    assert.deepEqual(Object.fromEntries(urls[1].searchParams),{output:'xml',addr:'',city:'',zip:'98109'});
  }
});

test('WA failure: both lookups failing blocks the quote, never $0',async t=>{
  for(const replies of [[NONE,NONE],[500,new Error('down')],[MATCH.replace('rate=".1055"','rate="-1"'),NONE]]){
    mockDor(t,replies);
    await assert.rejects(salesTax(seattle,10000),err=>err instanceof TaxAddressError&&err.code==='TAX_ADDRESS'&&/couldn’t calculate Washington sales tax/.test(err.message));
  }
  mockDor(t,[NONE,NONE]);await assert.rejects(waRate(seattle),TaxAddressError);
});

test('non-WA US addresses: $0 tax and no DOR request',async t=>{
  const urls=mockDor(t,[]);
  for(const state of ['OR','CA','NY','ID']){
    const {taxCents,tax}=await salesTax({street1:'1 Main St',city:'Somewhere',state,zip:'97204',country:'US'},50000);
    assert.equal(taxCents,0);assert.equal(tax.collected,false);assert.equal(tax.basis,'out-of-state');
  }
  assert.equal(urls.length,0);
});

test('QuickBooks receipt records WA sales tax as its own line with the location code',()=>{
  const refs={customerId:'58',depositAccountId:'91',items:{original:'1',print:'2',deposit:'3',shipping:'4',tax:'5',discount:'6'}};
  const receipt={kind:'sale',status:'COMPLETED',provider:'square',currency:'USD',orderId:'cart:abc-123',transactionId:'square:PAY1',paidAt:'2026-10-17T19:00:00Z',
    items:[{id:'p1',type:'print',title:'Portrait',amount:'100.00',quantity:1}],shipping:'10.00',tax:'11.61',gross:'121.61',
    salesTax:{state:'WA',collected:true,source:'wa-dor',rate:'0.1055',loccode:'1726',jurisdiction:'SEATTLE',period:'Q42026',basis:'address',taxable:'110.00',amount:'11.61'}};
  const payload=salesReceiptPayload(receipt,refs);
  const taxLine=payload.Line.find(l=>l.SalesItemLineDetail.ItemRef.value==='5');
  assert.equal(taxLine.Amount,11.61);
  assert.match(taxLine.Description,/^WA sales tax collected — DOR location code 1726 \(SEATTLE\), rate 10\.55% on taxable \$110\.00/);
  assert.match(payload.PrivateNote,/WA sales tax \$11\.61 at 10\.55%, DOR location code 1726/);
  // Out-of-state: no tax line.
  const oregon=salesReceiptPayload({...receipt,tax:'0.00',gross:'110.00',salesTax:{state:'OR',collected:false,rate:'0',basis:'out-of-state'}},refs);
  assert.equal(oregon.Line.some(l=>l.SalesItemLineDetail.ItemRef.value==='5'),false);
});
