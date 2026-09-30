import catalog, {catalogVersion} from './checkout-catalog.mjs';
import { insuranceRequest, insuredShipmentMatches, insuredRateMatches } from './shipping-insurance.mjs';
import {catalogVersion as cartVersion} from './cart-policy.mjs';
import {quotePrints} from './print-provider.mjs';

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
  if (!item?.parcel || !env.SHIPPO_TOKEN || !env.STRIPE_SECRET_KEY || !env.SHIP_FROM_STREET) throw new Error('Shipping and tax services are not configured');
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

async function calculateTax(env,items,address,shippingCents) {
  const form=new URLSearchParams({currency:'usd',
    'customer_details[address][line1]':address.street1,'customer_details[address][city]':address.city,
    'customer_details[address][state]':address.state,'customer_details[address][postal_code]':address.zip,
    'customer_details[address][country]':'US','customer_details[address_source]':'shipping',
    'shipping_cost[amount]':String(shippingCents)});
  if(address.street2)form.set('customer_details[address][line2]',address.street2);
  items.forEach((item,i)=>{
    form.set(`line_items[${i}][amount]`,String(cents(item.amount)*(item.quantity||1)));
    form.set(`line_items[${i}][tax_code]`,'txcd_99999999');
    form.set(`line_items[${i}][tax_behavior]`,'exclusive');
    form.set(`line_items[${i}][reference]`,item.id);
  });
  const response=await fetch('https://api.stripe.com/v1/tax/calculations',{
    method:'POST',signal:AbortSignal.timeout(20000),headers:{Authorization:`Bearer ${env.STRIPE_SECRET_KEY}`,'Content-Type':'application/x-www-form-urlencoded'},body:form});
  const calculation=await response.json(),base=items.reduce((sum,item)=>sum+cents(item.amount)*(item.quantity||1),0);
  if(!response.ok||calculation.currency!=='usd'||!Number.isSafeInteger(calculation.amount_total)||calculation.amount_total<base+shippingCents||!/^taxcalc_/.test(calculation.id||''))throw Error('Tax calculation unavailable');
  return {base:dollars(base),shipping:dollars(shippingCents),tax:dollars(calculation.amount_total-base-shippingCents),total:dollars(calculation.amount_total),taxCalculationId:calculation.id};
}
export async function priceOrder(env,slug,input) {
  const shipment=await priceShipment(env,slug,input);
  return {...shipment,catalogVersion,...await calculateTax(env,[{id:slug,amount:shipment.base}],shipment.address,cents(shipment.shipping))};
}
export async function priceCart(env,items,input,email) {
  const address=cleanAddress(input),shipments=[];
  // Each original is packed separately. No speculative combined-parcel dimensions.
  for(const item of items.filter(i=>i.type!=='print'))shipments.push(await priceShipment(env,item.id,address));
  const printItems=items.filter(i=>i.type==='print'),printQuote=printItems.length?await quotePrints(env,printItems,address):null;
  const totals=await calculateTax(env,items,address,shipments.reduce((sum,s)=>sum+cents(s.shipping),0)+(printQuote?cents(printQuote.shipping):0));
  return {schemaVersion:3,catalogVersion:cartVersion,address,email,items,shipments,...(printQuote?{printQuote}:{}),...totals,quotedAt:Date.now()};
}

export async function recordTax(env,calculationId,captureId) {
  if (!calculationId || !env.STRIPE_SECRET_KEY) throw new Error('Tax record is not configured');
  const response = await fetch('https://api.stripe.com/v1/tax/transactions/create_from_calculation',{
    method:'POST',headers:{Authorization:`Bearer ${env.STRIPE_SECRET_KEY}`,'Idempotency-Key':captureId.startsWith('btcpay:')?captureId:`paypal-${captureId}`,'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({calculation:calculationId,reference:captureId.startsWith('btcpay:')?captureId:`paypal-${captureId}`})
  });
  if (!response.ok) throw new Error(`Tax transaction recording failed (${response.status})`);
}
