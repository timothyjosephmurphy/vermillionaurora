import {moneyCents,moneyString,printRetailPrice,PRINT_PRICING} from './print-pricing.mjs';

export const FRAME_PRICING='finerworks-frame-at-cost-v1';
// Only the artwork carries a margin. Add the exact quoted frame, mat and
// glazing costs to its unframed selling price, without rounding the result up.
export function framedRetailPrice(quote,unframedAmount) {
  if(quote?.ok!==true||quote.quantity!==1||quote.shippingIncluded!==false||quote.taxIncluded!==false||(quote.currency||'USD')!=='USD')throw Error('A verified single-copy manufacturing-only USD quote is required');
  const base=moneyCents(quote.baseCost),total=moneyCents(quote.productionCost);
  const extras=['matCost','secondMatCost','frameCost','glazingCost'].map(k=>moneyCents(quote[k],{allowZero:true}));
  if(base+extras.reduce((a,b)=>a+b,0)!==total||extras[0]<=0||extras[1]!==0||extras[2]<=0||extras[3]<=0)throw Error('Frame cost breakdown does not match the complete quote');
  const artwork=moneyCents(unframedAmount);
  if(artwork<moneyCents(printRetailPrice(quote.baseCost)))throw Error('Print production cost changed; review the saved retail price before checkout');
  return moneyString(artwork+total-base);
}
export function reviewFramedPrice(quote,unframedAmount,published={}) {
  const recommendedAmount=framedRetailPrice(quote,unframedAmount),amount=published.amount??null;
  if(amount!==null)moneyCents(amount);
  return {ruleId:FRAME_PRICING,currency:'USD',amount,recommendedAmount,
    needsReview:amount!==recommendedAmount||published.pricingRule!==FRAME_PRICING||published.unframedAmount!==unframedAmount,overridden:false};
}
export function publishedFramedPrice(variant,productCode,unframedAmount) {
  if(variant?.pricingRule!==FRAME_PRICING||variant.sku!==productCode||variant.unframedAmount!==unframedAmount||!/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(variant.quotedAt||''))return null;
  const base=moneyCents(unframedAmount),amount=moneyCents(variant.amount);
  if(base<PRINT_PRICING.minimumCents||amount<=base||variant.priceOverride!==undefined)throw Error('Invalid framed print price');
  return variant.amount;
}
