import catalog, {catalogVersion} from './checkout-catalog.mjs';
import { insuranceRequest, insuredShipmentMatches, insuredRateMatches } from './shipping-insurance.mjs';
import {catalogVersion as cartVersion} from './cart-policy.mjs';
import {quotePrints} from './print-provider.mjs';
import {applyCode} from './print-codes.mjs';
import {salesTax} from './wa-sales-tax.mjs';

const cents = value => Math.round(Number(value) * 100);
const dollars = value => (value / 100).toFixed(2);

export function cleanAddress(input) {
  if (!input || typeof input !== 'object') throw new Error('Shipping address required');
  const address = Object.fromEntries(['name','street1','street2','city','state','zip'].map(key => [key,String(input[key] || '').trim()]));
  if (!address.name || !address.street1 || !address.city || !/^[A-Z]{2}$/.test(address.state.toUpperCase()) || !/^\d{5}(-\d{4})?$/.test(address.zip)) {
    throw new Error('Enter a complete US shipping address');
  }
  for (const value of Object.values(address)) if (value.length > 100) throw new Error('Address field is too long');
  address.state = address.state.toUpperCase();
  address.country = 'US';
  return address;
}

export async function priceShipment(env, slug, input) {
  const item = catalog[slug];
  if (!item?.parcel || !env.SHIPPO_TOKEN || !env.SHIP_FROM_STREET) throw new Error('Shipping services are not configured');
  const address = cleanAddress(input);
  const insurance = insuranceRequest(item);
  const phone = env.SHIP_FROM_PHONE?.trim();
  if (insurance && !/^\+[1-9]\d{7,14}$/.test(phone || '')) throw new Error('Shipping sender phone is not configured. Set SHIP_FROM_PHONE in international format.');
  const from = {name:'Vermillion Aurora',email:'tj@vermillionaurora.com',street1:env.SHIP_FROM_STREET,city:'Seattle',state:'WA',zip:'98122',country:'US',
    ...(phone ? {phone} : {})};
  const parcel = Object.fromEntries(Object.entries(item.parcel).map(([key,value]) => [key,String(value)]));
  Object.assign(parcel,{distance_unit:'in',mass_unit:'lb'});
  const shipmentResponse = await fetch('https://api.goshippo.com/shipments/',{
    method:'POST',signal:AbortSignal.timeout(20000),headers:{Authorization:`ShippoToken ${env.SHIPPO_TOKEN}`,'Content-Type':'application/json','SHIPPO-API-VERSION':'2018-02-08'},
    body:JSON.stringify({address_from:from,address_to:address,parcels:[parcel],async:false,...(insurance ? {extra:{insurance}} : {})})
  });
  const shipment = await shipmentResponse.json();
  if (!shipmentResponse.ok) throw new Error(`Shipping quote unavailable (${shipmentResponse.status})`);
  if (insurance && !insuredShipmentMatches(shipment, insurance)) throw new Error('Shipping insurance was not confirmed by Shippo');
  const carriers = (env.SHIPPO_CARRIER_ALLOWLIST || '').split(',').map(value=>value.trim().toLowerCase()).filter(Boolean);
  const rates = (shipment.rates || []).filter(r => (!carriers.length || carriers.includes(String(r.provider || '').toLowerCase())) &&
    r.object_id && r.currency === 'USD' && Number.isFinite(Number(r.amount)) && Number(r.amount) > 0 &&
    (!insurance || insuredRateMatches(r, shipment.object_id)));
  if (!rates.length) throw new Error('No carrier rate available for this package and address');
  const rate = rates.sort((a,b) => Number(a.amount)-Number(b.amount))[0];
  return {slug,address,base:item.amount,shipping:dollars(cents(rate.amount)),carrier:rate.provider||'Carrier',service:rate.servicelevel?.name||'Shipping',
    parcel:item.parcel,packaging:item.packaging,title:item.title,rateId:rate.object_id,quotedAt:Date.now(),
    ...(insurance?{insurance:{...insurance,fee:Number(rate.included_insurance_price).toFixed(2),shipmentId:shipment.object_id}}:{})};
}

// Washington sales tax applies to artwork (including framing) and shipping for orders shipped to WA; other US
// destinations are not taxed. A WA rate that cannot be found falls back to the Seattle rate (taxFallback), never $0 and never blocking.
async function calculateTax(items,address,shippingCents) {
  const base=items.reduce((sum,item)=>sum+cents(item.amount)*(item.quantity||1),0);
  const {taxCents,tax}=await salesTax(address,base+shippingCents);
  return {base:dollars(base),shipping:dollars(shippingCents),tax:dollars(taxCents),total:dollars(base+shippingCents+taxCents),
    salesTax:{...tax,taxable:dollars(base+shippingCents),amount:dollars(taxCents)}};
}
export async function priceOrder(env,slug,input) {
  const shipment=await priceShipment(env,slug,input);
  return {...shipment,catalogVersion,...await calculateTax([{id:slug,amount:shipment.base}],shipment.address,cents(shipment.shipping))};
}
// A commission deposit (first 50%) is a service payment: no delivery address, no shipping and no WA sales tax.
// The address and tax are handled on the final payment (the balance), which keeps the full address and tax quote.
export const isDepositOnly=items=>Array.isArray(items)&&items.length>0&&items.every(i=>i.type==='deposit'&&i.commission?.stage!=='balance');
export async function priceCart(env,items,input,email,code=null) {
  if(isDepositOnly(items)){
    const base=items.reduce((sum,item)=>sum+cents(item.amount)*(item.quantity||1),0);
    // An address is never required or taxed here; one the buyer happened to send is kept only for the record.
    let address=null;try{address=cleanAddress(input);}catch{}
    return {schemaVersion:3,catalogVersion:cartVersion,address,email,items,shipments:[],base:dollars(base),shipping:'0.00',tax:'0.00',total:dollars(base)};
  }
  const address=cleanAddress(input),shipments=[];
  // Each original is packed separately. No speculative combined-parcel dimensions.
  for(const item of items.filter(i=>(i.type!=='print'&&i.type!=='deposit')))shipments.push(await priceShipment(env,item.id,address));
  const printItems=items.filter(i=>i.type==='print'),printQuote=printItems.length?await quotePrints(env,printItems,address):null;
  // A code reprices only after the provider has validated the listed retail prices.
  if(code){items=applyCode(items,code,printQuote?.unitCosts);if(printQuote)delete printQuote.unitCosts;}
  const totals=await calculateTax(items,address,shipments.reduce((sum,s)=>sum+cents(s.shipping),0)+(printQuote?cents(printQuote.shipping):0));
  return {schemaVersion:3,catalogVersion:cartVersion,address,email,items,shipments,...(printQuote?{printQuote}:{}),...(code?{printCode:{kind:code.kind,hash:code.hash,...(code.kind==='collector'&&/^[A-Z2-9]{4}$/.test(code.suffix||'')?{suffix:code.suffix}:{})}}:{}),...totals,quotedAt:Date.now()};
}
