import catalog, {catalogVersion} from './checkout-catalog.mjs';
import { rateItem } from './shippo-rate.mjs';
import {catalogVersion as cartVersion} from './cart-policy.mjs';
import {quotePrints} from './print-provider.mjs';
import {applyCode} from './print-codes.mjs';
import {salesTax} from './wa-sales-tax.mjs';
import {cleanShippingAddress} from '../catalog/addresses.mjs';

const cents = value => Math.round(Number(value) * 100);
const dollars = value => (value / 100).toFixed(2);

// Any destination checkout can serve (see catalog/addresses.mjs). A missing country means US.
export function cleanAddress(input) {
  return cleanShippingAddress(input);
}

// Customs and the Shippo rate request live in shippo-rate.mjs so the Nostr marketplace publisher (#325)
// quotes shipping with exactly the same code. Rate quotes only: nothing here buys a label.
export { ORIGINAL_HS_CODE, customsDeclaration } from './shippo-rate.mjs';
export async function priceShipment(env, slug, input) {
  return {slug, ...await rateItem(env, catalog[slug], input)};
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
