// Shippo rate quotes for one original painting, shared by checkout (checkout-pricing.mjs) and the Nostr
// marketplace publisher (nostr-publisher/src/market-shipping.mjs). Creates a Shippo shipment to read rates.
// It never creates a transaction, so it never buys a label.
import { insuranceRequest, insuredShipmentMatches, insuredRateMatches } from './shipping-insurance.mjs';
import {cleanShippingAddress,isInternational,destinationError} from '../catalog/addresses.mjs';

const cents = value => Math.round(Number(value) * 100);
const dollars = value => (value / 100).toFixed(2);

// Original paintings (hand-painted): HS 9701.91. Every non-US parcel carries a customs declaration, DDU (buyer pays duties).
export const ORIGINAL_HS_CODE='9701.91';
export function customsDeclaration(env,item,address) {
  const value=Number(item.amount),weight=Number(item.parcel?.weight);
  if(!Number.isFinite(value)||value<=0||!Number.isFinite(weight)||weight<=0)throw new Error('Customs details are missing for this painting');
  // Exports over $2,500 to countries other than Canada need an AES filing (ITN); checkout does not file those.
  if(address.country!=='CA'&&value>2500)throw destinationError('International shipping for originals over $2,500 needs export paperwork. Email tj@tjm.art for a quote.');
  const signer=String(env.SHIPPO_CUSTOMS_SIGNER||'').trim();
  return {contents_type:'MERCHANDISE',contents_explanation:'Original painting',non_delivery_option:'RETURN',incoterm:'DDU',
    eel_pfc:address.country==='CA'?'NOEEI_30_36':'NOEEI_30_37_a',certify:!!signer,certify_signer:signer,
    items:[{description:'Original hand-painted painting (artwork)',quantity:1,net_weight:String(weight),mass_unit:'lb',value_amount:value.toFixed(2),value_currency:'USD',origin_country:'US',tariff_number:ORIGINAL_HS_CODE}]};
}

// item: a checkout-catalog entry {title, amount, currency, parcel, packaging, insuranceRequested?}.
// fetchImpl lets tests mock Shippo. Returns the cheapest allowed USD rate (a quote, never a label).
export async function rateItem(env, item, input, fetchImpl = fetch) {
  if (!item?.parcel || !env.SHIPPO_TOKEN || !env.SHIP_FROM_STREET) throw new Error('Shipping services are not configured');
  const address = cleanShippingAddress(input);
  const international = isInternational(address);
  const customs = international ? customsDeclaration(env,item,address) : null;
  const insurance = insuranceRequest(item);
  const phone = env.SHIP_FROM_PHONE?.trim();
  if ((insurance || international) && !/^\+[1-9]\d{7,14}$/.test(phone || '')) throw new Error('Shipping sender phone is not configured. Set SHIP_FROM_PHONE in international format.');
  const from = {name:'Vermillion Aurora',email:'tj@vermillionaurora.com',street1:env.SHIP_FROM_STREET,city:'Seattle',state:'WA',zip:'98122',country:'US',
    ...(phone ? {phone} : {})};
  const parcel = Object.fromEntries(Object.entries(item.parcel).map(([key,value]) => [key,String(value)]));
  Object.assign(parcel,{distance_unit:'in',mass_unit:'lb'});
  const shipmentResponse = await fetchImpl('https://api.goshippo.com/shipments/',{
    method:'POST',signal:AbortSignal.timeout(20000),headers:{Authorization:`ShippoToken ${env.SHIPPO_TOKEN}`,'Content-Type':'application/json','SHIPPO-API-VERSION':'2018-02-08'},
    body:JSON.stringify({address_from:from,address_to:address,parcels:[parcel],async:false,...(customs ? {customs_declaration:customs} : {}),...(insurance ? {extra:{insurance}} : {})})
  });
  const shipment = await shipmentResponse.json();
  if (!shipmentResponse.ok) throw new Error(`Shipping quote unavailable (${shipmentResponse.status})`);
  if (insurance && !insuredShipmentMatches(shipment, insurance)) throw new Error('Shipping insurance was not confirmed by Shippo');
  const carriers = (env.SHIPPO_CARRIER_ALLOWLIST || '').split(',').map(value=>value.trim().toLowerCase()).filter(Boolean);
  const rates = (shipment.rates || []).filter(r => (!carriers.length || carriers.includes(String(r.provider || '').toLowerCase())) &&
    r.object_id && r.currency === 'USD' && Number.isFinite(Number(r.amount)) && Number(r.amount) > 0 &&
    (!insurance || insuredRateMatches(r, shipment.object_id)));
  if (!rates.length) throw destinationError(international ? 'No carrier can ship this original to that country through online checkout yet. Email tj@tjm.art for a quote.' : 'No carrier rate available for this package and address');
  const rate = rates.sort((a,b) => Number(a.amount)-Number(b.amount))[0];
  return {address,base:item.amount,shipping:dollars(cents(rate.amount)),carrier:rate.provider||'Carrier',service:rate.servicelevel?.name||'Shipping',
    parcel:item.parcel,packaging:item.packaging,title:item.title,rateId:rate.object_id,quotedAt:Date.now(),
    ...(customs?{customs:{hsCode:ORIGINAL_HS_CODE,incoterm:'DDU',value:customs.items[0].value_amount,certified:customs.certify}}:{}),
    ...(insurance?{insurance:{...insurance,fee:Number(rate.included_insurance_price).toFixed(2),shipmentId:shipment.object_id}}:{})};
}

