// USD print pricing only. Shipping and sales tax are never marked up here.
// Published prices are explicit catalog snapshots; quote refreshes only recommend changes.
export const PRINT_PRICING = Object.freeze({
  id: 'finerworks-3.5x-v1', currency: 'USD', multiplierNumerator: 7,
  multiplierDenominator: 2, incrementCents: 500, minimumCents: 2500
});
export function moneyCents(value, {allowZero = false} = {}) {
  if (typeof value !== 'string' || !/^(?:0|[1-9]\d*)\.\d{2}$/.test(value)) throw Error('Use a USD amount with two decimal places');
  const result = Number(value.replace('.', ''));
  if (!Number.isSafeInteger(result) || result < (allowZero ? 0 : 1) || result > 100000000) throw Error('Invalid USD amount');
  return result;
}
export const moneyString = cents => {
  if (!Number.isSafeInteger(cents) || cents < 0) throw Error('Invalid cents');
  return (cents / 100).toFixed(2);
};
export function printRetailPrice(productionCost, currency = 'USD') {
  if (currency !== PRINT_PRICING.currency) throw Error('Print pricing requires a USD quote');
  const cost = moneyCents(productionCost), p = PRINT_PRICING;
  // Exact integer arithmetic, including half-cent boundaries.
  const rounded = Math.ceil(cost * p.multiplierNumerator / (p.multiplierDenominator * p.incrementCents)) * p.incrementCents;
  return moneyString(Math.max(p.minimumCents, rounded));
}
export function reviewPrintPrice(quote, published = {}) {
  if (quote?.ok !== true || quote.quantity !== 1 || quote.shippingIncluded !== false || quote.taxIncluded !== false) throw Error('A verified single-copy manufacturing-only quote is required');
  const recommendedAmount = printRetailPrice(quote.productionCost, quote.currency || 'USD');
  const override = published.priceOverride;
  if (override !== undefined && (typeof override?.reason !== 'string' || !override.reason.trim() || moneyCents(override.amount) < PRINT_PRICING.minimumCents)) throw Error('A price override needs a reason and must meet the $25 minimum');
  const amount = override?.amount ?? published.amount ?? null;
  if (amount !== null) moneyCents(amount);
  return {ruleId: PRINT_PRICING.id, currency: 'USD', amount, recommendedAmount,
    needsReview: amount === null || (!override && amount !== recommendedAmount), overridden: !!override};
}
export function publishedPrintPrice(variant, productCode) {
  const override = variant?.priceOverride;
  if (override !== undefined) {
    if (typeof override?.reason !== 'string' || !override.reason.trim() || moneyCents(override.amount) < PRINT_PRICING.minimumCents) throw Error('Invalid print price override');
    return override.amount;
  }
  if (variant?.pricingRule !== PRINT_PRICING.id || variant.sku !== productCode || !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(variant.quotedAt || '')) return null;
  const cents = moneyCents(variant.amount);
  if (cents < PRINT_PRICING.minimumCents || cents % PRINT_PRICING.incrementCents) throw Error('Published print price does not meet the pricing rule');
  return variant.amount;
}
