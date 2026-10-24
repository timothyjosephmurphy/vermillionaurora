// Shippo shipping costs for marketplace listings (#325). Reuses checkout's rate code and parcel profiles.
// RATE QUOTES ONLY: rateItem creates a Shippo shipment to read rates; nothing here creates a transaction/label.
import { rateItem } from '../../cloudflare/shippo-rate.mjs';
import { checkoutItem } from '../../catalog/shipping.mjs';
import { MARKET_SHIPPING } from './market-config.mjs';

const quoteKey = (productId) => `market:shipquote:${productId}`;

/** "38.41" -> "39.00" (round up) or "38.41". */
export function marketCost(amount, roundUp = MARKET_SHIPPING.roundUpToWholeDollar) {
  const cents = Math.round(Number(amount) * 100);
  if (!Number.isSafeInteger(cents) || cents <= 0) return null;
  return ((roundUp ? Math.ceil(cents / 100) * 100 : cents) / 100).toFixed(2);
}

/** The checkout parcel item for a product, or null without an integrated parcel profile. */
export function parcelItem(product) {
  if (product?.checkout?.mode !== 'integrated' || !product.checkout.shipping || !product.listing?.price) return null;
  try { return checkoutItem(product); } catch { return null; }
}

/**
 * Returns async (product) => { us:{cost,carrier,service}, international:{...}, quotedAt } or { unavailable: reason }.
 * deps: { env (SHIPPO_TOKEN, SHIP_FROM_STREET, SHIP_FROM_PHONE, SHIPPO_CUSTOMS_SIGNER, SHIPPO_CARRIER_ALLOWLIST),
 *         store (cache, optional), now (ms), fetchImpl (tests mock Shippo here), requireLiveToken, log }.
 * requireLiveToken: refuse a shippo_test_ token (test rates are not real prices); set for live publishing.
 */
export function makeShippoQuoter({ env = {}, store, now = Date.now(), fetchImpl = globalThis.fetch, requireLiveToken = false, config = MARKET_SHIPPING, log } = {}) {
  return async function quoteShipping(product) {
    const item = parcelItem(product);
    if (!item) return { unavailable: 'no-parcel-profile' };
    const token = String(env.SHIPPO_TOKEN || '');
    if (!token || !env.SHIP_FROM_STREET) return { unavailable: 'shippo-not-configured' };
    if (requireLiveToken && token.startsWith('shippo_test_')) return { unavailable: 'shippo-test-token' };
    const fingerprint = JSON.stringify({ item, d: config.destinations, c: env.SHIPPO_CARRIER_ALLOWLIST || '', test: token.startsWith('shippo_test_') });
    const cached = await store?.get(quoteKey(product.id));
    if (cached?.fingerprint === fingerprint && now - cached.quotedAt < config.cacheTtlMs) return cached.rates;
    const rates = { quotedAt: now };
    for (const tier of ['us', 'international']) {
      try {
        const q = await rateItem(env, item, config.destinations[tier], fetchImpl);
        const cost = marketCost(q.shipping, config.roundUpToWholeDollar);
        if (!cost) throw new Error('Invalid Shippo amount');
        rates[tier] = { cost, quoted: q.shipping, carrier: q.carrier, service: q.service };
      } catch (error) {
        log?.({ productId: product.id, tier, status: 'shippo-quote-failed', message: String(error?.message || error) });
        return { unavailable: 'shippo-no-rate', tier };   // not cached: retried next sync
      }
    }
    await store?.put(quoteKey(product.id), { fingerprint, quotedAt: now, rates });
    return rates;
  };
}
