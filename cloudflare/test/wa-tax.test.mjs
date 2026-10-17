import {env} from 'cloudflare:workers';
import {runInDurableObject} from 'cloudflare:test';
import {it,expect,beforeEach,afterEach,vi} from 'vitest';
import {catalogVersion} from '../cart-policy.mjs';
import catalog from '../checkout-catalog.mjs';
import {cartCheckout} from '../cart-checkout.mjs';
import {bitcoinCheckout} from '../bitcoin-checkout.mjs';
import {priceCart} from '../checkout-pricing.mjs';
import {TAX_ADDRESS_ERROR} from '../wa-sales-tax.mjs';
import {DOR_SEATTLE,isDor} from './dor-mock.mjs';

// Quote-only: Shippo and the DOR rate lookup are mocked. No payment provider is called.
const slug='honeybadger-and-cub-with-genesis-block',amount=catalog[slug].amount;
const seattle={name:'Test Buyer',street1:'123 Main St',street2:'',city:'Seattle',state:'WA',zip:'98122',country:'US'};
const portland={name:'Test Buyer',street1:'1221 SW 4th Ave',street2:'',city:'Portland',state:'OR',zip:'97204',country:'US'};
const DOR_ZIP_ONLY=DOR_SEATTLE.replace('code="2"','code="5"');
const DOR_NO_MATCH='<?xml version="1.0" encoding="UTF-8" ?><response loccode="-1" localrate="-1" rate="-1" code="6" />';
const square={CART_CHECKOUT_ENABLED:'true',SANDBOX_RETURN_ORIGIN:'https://shop.example.test',SHIPPO_AUTO_LABEL_ENABLED:'false',
  SQUARE_CHECKOUT_ENABLED:'true',SQUARE_MODE:'sandbox',SQUARE_CHECKOUT_SLUGS:slug,SQUARE_ACCESS_TOKEN:'fake',SQUARE_APPLICATION_ID:'APP',
  SQUARE_LOCATION_ID:'LOCATION',SQUARE_WEBHOOK_SIGNATURE_KEY:'fake',SQUARE_WEBHOOK_URL:'https://worker/checkout/square/webhook'};
const bitcoin={CHECKOUT_MODE:'live',BTCPAY_URL:'https://btcpay.example.test',BTCPAY_STORE_ID:'STORE',BTCPAY_API_KEY:'fake',BTCPAY_WEBHOOK_SECRET:'fake',
  BTCPAY_CHECKOUT_ENABLED:'true',BTCPAY_CHECKOUT_SLUGS:slug};
let calls,dor;
beforeEach(async()=>{
  calls=[];dor=[];
  const stock=env.PAINTING_STOCK.getByName(slug);
  await runInDurableObject(stock,(_,ctx)=>{ctx.storage.sql.exec('DELETE FROM stock');ctx.storage.sql.exec('DELETE FROM shipping_job');});
  vi.stubGlobal('fetch',vi.fn(async(input,init={})=>{
    const url=new URL(input);calls.push({url:url.href,method:init.method||'GET'});
    if(url.hostname==='api.goshippo.com'&&url.pathname==='/shipments/')return Response.json({rates:[{object_id:'RATE1',currency:'USD',amount:'12.00',provider:'UPS',servicelevel:{name:'Ground'}}]});
    if(isDor(url)){expect(init.method||'GET').toBe('GET');const next=dor.shift();if(next instanceof Error)throw next;return new Response(next??DOR_SEATTLE,{headers:{'Content-Type':'text/xml'}});}
    throw Error(`Unmocked external request ${url.origin}${url.pathname}`);
  }));
});
afterEach(()=>vi.unstubAllGlobals());
const items=[{id:slug,type:'original',quantity:1,title:catalog[slug].title,amount}];
const expectedTax=taxable=>(Math.floor((taxable*105500+500000)/1e6)/100).toFixed(2);
const request=(path,body)=>new Request(`https://worker${path}`,{method:'POST',headers:{...(path.startsWith('/checkout/cart/')?{Origin:'https://shop.example.test'}:{}),'Content-Type':'application/json'},body:JSON.stringify(body)});

it('taxes a matched Washington street address at the DOR rate on artwork plus shipping',async()=>{
  const q=await priceCart({...env,...square},items,seattle,'buyer@example.test');
  const taxable=Math.round(Number(amount)*100)+1200;
  expect(q.tax).toBe(expectedTax(taxable));
  expect(q.total).toBe(((taxable+Math.round(Number(q.tax)*100))/100).toFixed(2));
  expect(q.salesTax).toMatchObject({state:'WA',collected:true,source:'wa-dor',rate:'0.1055',loccode:'1726',jurisdiction:'SEATTLE',basis:'address',resultCode:2,taxable:(taxable/100).toFixed(2),amount:q.tax});
  const lookups=calls.filter(c=>isDor(c.url));expect(lookups).toHaveLength(1);
  const sent=new URL(lookups[0].url);
  expect(Object.fromEntries(sent.searchParams)).toEqual({output:'xml',addr:'123 Main St',city:'Seattle',zip:'98122'});
  expect(sent.href).not.toContain('Test%20Buyer');expect(sent.href).not.toContain('buyer%40');
});

it('falls back to a ZIP-only lookup when the street address does not match',async()=>{
  dor=[DOR_NO_MATCH,DOR_ZIP_ONLY];
  const q=await priceCart({...env,...square},items,seattle,'buyer@example.test');
  expect(q.salesTax).toMatchObject({loccode:'1726',rate:'0.1055',basis:'zip',resultCode:5});
  expect(q.tax).toBe(expectedTax(Math.round(Number(amount)*100)+1200));
  const lookups=calls.filter(c=>isDor(c.url)).map(c=>Object.fromEntries(new URL(c.url).searchParams));
  expect(lookups).toEqual([{output:'xml',addr:'123 Main St',city:'Seattle',zip:'98122'},{output:'xml',addr:'',city:'',zip:'98122'}]);
});

it('falls back to the ZIP when the address lookup errors or returns a partial match',async()=>{
  for(const first of [new Error('network down'),'<html>Service unavailable</html>',DOR_ZIP_ONLY]) {
    calls=[];dor=[first,DOR_ZIP_ONLY];
    const q=await priceCart({...env,...square},items,seattle,'buyer@example.test');
    expect(q.salesTax.basis).toBe('zip');expect(Number(q.tax)).toBeGreaterThan(0);
  }
});

it('blocks a Washington quote with an address message when both lookups fail, for Square and BTCPay alike',async()=>{
  dor=[DOR_NO_MATCH,DOR_NO_MATCH];
  await expect(priceCart({...env,...square},items,seattle,'buyer@example.test')).rejects.toThrow(TAX_ADDRESS_ERROR);
  // Cart endpoint (Square card): no quote, no order, a clear address message, never $0 tax.
  dor=[DOR_NO_MATCH,new Error('timeout')];
  const cart=await cartCheckout(request('/checkout/cart/quote',{items:[{id:slug,quantity:1}],address:seattle,email:'buyer@example.test',catalogVersion}),{...env,...square});
  expect(cart.status).toBe(422);
  const body=await cart.json();expect(body).toEqual({error:TAX_ADDRESS_ERROR,code:'TAX_ADDRESS'});
  // Single-painting Bitcoin quote (BTCPay): blocked the same way, with no invoice request.
  dor=[DOR_NO_MATCH,DOR_NO_MATCH];
  const btc=await bitcoinCheckout(request('/checkout/bitcoin/quote',{slug,address:seattle}),{...env,...bitcoin});
  expect(btc.status).toBe(422);expect((await btc.json()).code).toBe('TAX_ADDRESS');
  expect(calls.some(c=>c.url.includes('btcpay.example.test')||c.url.includes('squareup'))).toBe(false);
});

it('charges $0 tax to other US states without calling the DOR lookup',async()=>{
  const q=await priceCart({...env,...square},items,portland,'buyer@example.test');
  expect(q.tax).toBe('0.00');expect(q.total).toBe((Number(amount)+12).toFixed(2));
  expect(q.salesTax).toMatchObject({state:'OR',collected:false,basis:'out-of-state'});
  expect(calls.some(c=>isDor(c.url))).toBe(false);
  const btc=await bitcoinCheckout(request('/checkout/bitcoin/quote',{slug,address:portland}),{...env,...bitcoin});
  expect(btc.status).toBe(200);expect((await btc.json()).tax).toBe('0.00');
});

it('quotes the same Washington tax through the BTCPay single-painting endpoint',async()=>{
  const btc=await bitcoinCheckout(request('/checkout/bitcoin/quote',{slug,address:seattle}),{...env,...bitcoin});
  expect(btc.status).toBe(200);
  expect((await btc.json()).tax).toBe(expectedTax(Math.round(Number(amount)*100)+1200));
});
