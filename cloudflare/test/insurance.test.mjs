import { env } from 'cloudflare:workers';
import { runInDurableObject, runDurableObjectAlarm, evictDurableObject } from 'cloudflare:test';
import { afterEach, beforeEach, it, expect, vi } from 'vitest';
import { priceOrder } from '../checkout-pricing.mjs';

const slug = 'painting-portrait-in-green';
let calls, rate, shipment, transaction, objects;
beforeEach(() => {
  calls=[];objects=[];
  rate={object_id:'INS_RATE',shipment:'INS_SHIPMENT',currency:'USD',amount:'5.75',included_insurance_price:'0.75',provider:'USPS',servicelevel:{name:'Ground Advantage'}};
  shipment={object_id:'INS_SHIPMENT',extra:{insurance:{amount:'20.00',currency:'USD',content:'Original painting: Chase Toole'}}};
  transaction={object_id:'INS_TX',test:true,status:'SUCCESS',rate:'INS_RATE',label_url:'https://deliver.goshippo.com/insured.pdf'};
  vi.stubGlobal('fetch',vi.fn(async(url,options={})=>{
    calls.push({url,...options});
    if(url==='https://api.goshippo.com/shipments/')return Response.json({...shipment,rates:[{object_id:'UNINSURED',currency:'USD',amount:'1.00'},rate]});
    if(url==='https://api.goshippo.com/rates/INS_RATE/')return Response.json(rate);
    if(url==='https://api.goshippo.com/shipments/INS_SHIPMENT/')return Response.json(shipment);
    if(url==='https://api.stripe.com/v1/tax/calculations')return Response.json({id:'taxcalc_INSURED',currency:'usd',amount_total:2575});
    if(url.endsWith('/tax/transactions/create_from_calculation'))return Response.json({id:'TAX1'});
    if(url==='https://oauth2.googleapis.com/token')return Response.json({access_token:'EMAIL'});
    if(url==='https://api.goshippo.com/transactions/')return Response.json(transaction);
    if(url==='https://deliver.goshippo.com/insured.pdf')return new Response('%PDF-1.4\nTest');
    if(url==='https://gmail.googleapis.com/gmail/v1/users/me/messages/send')return Response.json({id:'EMAIL1'});
    throw Error('Unexpected request: '+url);
  }));
});
afterEach(async()=>{
  for(const stub of objects)await runInDurableObject(stub,(_,ctx)=>ctx.storage.deleteAlarm());
  vi.unstubAllGlobals();
});
const pricing=()=>priceOrder(env,slug,{name:'Test Buyer',street1:'123 Main St',city:'Seattle',state:'WA',zip:'98122'});
const purchases=()=>calls.filter(c=>c.url==='https://api.goshippo.com/transactions/');
const job=stub=>runInDurableObject(stub,(_,ctx)=>JSON.parse(ctx.storage.sql.exec('SELECT data FROM shipping_job WHERE id=1').one().data));
async function paid(quote){
  const stub=env.PAINTING_STOCK.getByName(crypto.randomUUID());objects.push(stub);
  await stub.initialize(slug);await stub.reserve('HOLD');await stub.bindOrder('HOLD','ORDER',quote);await stub.complete('ORDER','CAPTURE');
  return stub;
}

it('quotes the flat envelope with $20 insurance and includes its fee only once',async()=>{
  const quote=await pricing();
  const request=JSON.parse(calls.find(c=>c.url.endsWith('/shipments/')).body);
  expect(request.extra.insurance).toEqual(shipment.extra.insurance);
  expect(request.address_from.phone).toBe('+12065550123');
  expect(request.parcels).toEqual([{length:'15',width:'12',height:'0.125',weight:'0.25',distance_unit:'in',mass_unit:'lb'}]);
  expect(quote).toMatchObject({base:'20.00',shipping:'5.75',total:'25.75',rateId:'INS_RATE',insurance:{amount:'20.00',fee:'0.75'}});
  expect(calls.find(c=>c.url.endsWith('/tax/calculations')).body.get('shipping_cost[amount]')).toBe('575');
});

it('requires the sender phone before quoting or charging for an insured shipment',async()=>{
  await expect(priceOrder({...env,SHIP_FROM_PHONE:''},slug,{name:'Buyer',street1:'123 Main St',city:'Seattle',state:'WA',zip:'98122'})).rejects.toThrow('SHIP_FROM_PHONE');
  expect(calls).toHaveLength(0);
});

it.each(['missing premium','wrong value','wrong currency'])('refuses an unconfirmed quote: %s',async(kind)=>{
  if(kind==='missing premium')delete rate.included_insurance_price;
  if(kind==='wrong value')shipment.extra.insurance.amount='10.00';
  if(kind==='wrong currency')shipment.extra.insurance.currency='EUR';
  await expect(pricing()).rejects.toThrow();expect(purchases()).toHaveLength(0);
});

it('purchases the verified insured rate, includes insurance in the email, and survives eviction without repurchase',async()=>{
  const stub=await paid(await pricing());await evictDurableObject(stub);await runDurableObjectAlarm(stub);
  expect(await job(stub)).toMatchObject({status:'ready',insuranceConfirmed:true,emailId:'EMAIL1',pdfAttached:true});
  expect(JSON.parse(purchases()[0].body).rate).toBe('INS_RATE');
  const email=calls.find(c=>c.url.endsWith('/messages/send'));
  const mime=atob(JSON.parse(email.body).raw.replaceAll('-','+').replaceAll('_','/'));
  const text=atob(mime.split('Content-Transfer-Encoding: base64\r\n\r\n')[1].split('\r\n--')[0].replaceAll('\r\n',''));
  expect(text).toContain('Insurance: $20.00 USD');expect(text).toContain('premium $0.75 included');
  await evictDurableObject(stub);await stub.complete('ORDER','CAPTURE');await runInDurableObject(stub,instance=>instance.alarm());
  expect(purchases()).toHaveLength(1);
});

it('does not buy a label when the saved rate loses its insurance',async()=>{
  const stub=await paid(await pricing());delete rate.included_insurance_price;
  await runDurableObjectAlarm(stub);expect(purchases()).toHaveLength(0);
  expect(await job(stub)).toMatchObject({status:'review',emailId:'EMAIL1'});
});

it('requires review when the purchased label refers to a different rate, without buying again',async()=>{
  const stub=await paid(await pricing());transaction.rate='OTHER_RATE';
  await runDurableObjectAlarm(stub);expect((await job(stub)).status).toBe('review');
  await runInDurableObject(stub,instance=>instance.alarm());expect(purchases()).toHaveLength(1);
  expect((await job(stub)).insuranceConfirmed).not.toBe(true);
});
