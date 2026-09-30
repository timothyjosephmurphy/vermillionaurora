// Retail estimates for physical originals, checked against Framebridge's pricing
// and mail-in pages on 2026-09-30. This is a quote request, never a paid add-on.
export const framingTermsVersion = 'framebridge-request-2026-09-30';
export const framingStyles = Object.freeze({
  black: 'Black', white: 'White', natural: 'Natural wood', advice: 'Help me choose'
});
export const framingSources = [
  'https://www.framebridge.com/pages/pricing',
  'https://www.framebridge.com/pages/mail-in-service',
  'https://www.framebridge.com/pages/artists-program'
];
const tiers = [
  [5,7,8500,0], [9,12,11500,0], [12,18,15000,0],
  [18,24,20000,0], [24,34,26500,2500], [32,40,36500,2500]
];
export function originalFramingOffer(product) {
  const d = product.dimensions;
  if (product.type !== 'painting' || product.listing?.status !== 'available' ||
      product.checkout?.mode !== 'integrated' || !/paper/i.test(product.surface || '') ||
      /\bframed\b/i.test(`${product.surface || ''} ${product.framing || ''}`) ||
      !d || !['in','cm'].includes(d.unit) ||
      ![d.width,d.height].every(n => Number.isFinite(n) && n > 0)) return null;
  const [short,long] = [d.width,d.height].map(n => n / (d.unit === 'cm' ? 2.54 : 1)).sort((a,b) => a-b);
  const tier = tiers.find(([w,h]) => short <= w + 0.000001 && long <= h + 0.000001);
  if (!tier) return null;
  const [, , frameCents, deliveryCents] = tier;
  return {provider:'framebridge',termsVersion:framingTermsVersion,currency:'USD',
    estimate:((frameCents + 1000 + deliveryCents)/100).toFixed(2),
    pricingAsOf:'2026-09-30',styles:framingStyles};
}

// Never accept a customer's estimate, supplier price, or fulfillment status.
export function originalFramingRequest(input, offer) {
  if (input == null) return null;
  if (!offer || typeof input !== 'object' || Array.isArray(input) ||
      input.termsVersion !== framingTermsVersion ||
      typeof input.style !== 'string' || !Object.hasOwn(framingStyles,input.style)) {
    throw Error('Refresh the framing options before checkout.');
  }
  return {provider:'framebridge',mode:'quote-request',termsVersion:framingTermsVersion,
    style:input.style,styleLabel:framingStyles[input.style],mat:'White mat',
    estimate:offer.estimate,currency:'USD',pricingAsOf:offer.pricingAsOf};
}
