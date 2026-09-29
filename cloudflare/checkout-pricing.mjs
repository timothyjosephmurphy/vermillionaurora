import catalog from './checkout-catalog.mjs';
import { insuranceRequest, insuredShipmentMatches, insuredRateMatches } from './shipping-insurance.mjs';

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

export async function priceOrder(env, slug, input) {
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
    method:'POST',headers:{Authorization:`ShippoToken ${env.SHIPPO_TOKEN}`,'Content-Type':'application/json','SHIPPO-API-VERSION':'2018-02-08'},
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
  const shippingCents = cents(rate.amount), paintingCents = cents(item.amount);
  const form = new URLSearchParams({
    currency:'usd',
    'customer_details[address][line1]':address.street1,
    'customer_details[address][city]':address.city,
    'customer_details[address][state]':address.state,
    'customer_details[address][postal_code]':address.zip,
    'customer_details[address][country]':'US',
    'customer_details[address_source]':'shipping',
    'line_items[0][amount]':String(paintingCents),
    'line_items[0][tax_code]':'txcd_99999999',
    'line_items[0][tax_behavior]':'exclusive',
    'line_items[0][reference]':slug,
    'shipping_cost[amount]':String(shippingCents)
  });
  if (address.street2) form.set('customer_details[address][line2]',address.street2);
  const taxResponse = await fetch('https://api.stripe.com/v1/tax/calculations',{
    method:'POST',headers:{Authorization:`Bearer ${env.STRIPE_SECRET_KEY}`,'Content-Type':'application/x-www-form-urlencoded'},body:form
  });
  const calculation = await taxResponse.json();
  if (!taxResponse.ok || calculation.currency !== 'usd' || !Number.isSafeInteger(calculation.amount_total) ||
      calculation.amount_total < paintingCents + shippingCents || !/^taxcalc_/.test(calculation.id || '')) {
    throw new Error(`Tax calculation unavailable (${taxResponse.status})`);
  }
  return {
    address,base:item.amount,shipping:dollars(shippingCents),tax:dollars(calculation.amount_total-paintingCents-shippingCents),
    total:dollars(calculation.amount_total),taxCalculationId:calculation.id,
    carrier:rate.provider || 'Carrier',service:rate.servicelevel?.name || 'Shipping',
    parcel:item.parcel,packaging:item.packaging,title:item.title,
    rateId:rate.object_id,quotedAt:Date.now(),
    ...(insurance ? {insurance:{...insurance,fee:Number(rate.included_insurance_price).toFixed(2),shipmentId:shipment.object_id}} : {})
  };
}

export async function recordTax(env,calculationId,captureId) {
  if (!calculationId || !env.STRIPE_SECRET_KEY) throw new Error('Tax record is not configured');
  const response = await fetch('https://api.stripe.com/v1/tax/transactions/create_from_calculation',{
    method:'POST',headers:{Authorization:`Bearer ${env.STRIPE_SECRET_KEY}`,'Idempotency-Key':`paypal-${captureId}`,'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({calculation:calculationId,reference:`paypal-${captureId}`})
  });
  if (!response.ok) throw new Error(`Tax transaction recording failed (${response.status})`);
}
