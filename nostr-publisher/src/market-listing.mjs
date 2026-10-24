// Pure mappers: catalog product -> kind 30402 listing, kind 30406 shipping options, kind 0 profile.
// No I/O, no key, no clock (callers pass `now`). Output templates are UNSIGNED: { kind, created_at, tags, content }.
import {
  MARKET_PUBKEY, MARKET_PRICE_UPLIFT, MARKET_SHIPPING, MARKET_QUOTE_TEXT, MARKET_INTL_INQUIRY_NOTE, MARKET_SITE, MARKET_LOCATION,
  MARKET_ARTIST, MARKET_PROFILE, INTERNATIONAL_COUNTRIES
} from './market-config.mjs';

export const KIND_PROFILE = 0;
export const KIND_LISTING = 30402;
export const KIND_SHIPPING = 30406;

export const listingId = (productId) => `tjm-${productId}`;
export const listingAddress = (productId, pubkey = MARKET_PUBKEY) => `${KIND_LISTING}:${pubkey}:${listingId(productId)}`;
export const shippingAddress = (d, pubkey = MARKET_PUBKEY) => `${KIND_SHIPPING}:${pubkey}:${d}`;

const absolute = (src) => (/^https?:\/\//.test(src) ? src : `${MARKET_SITE}${src.startsWith('/') ? '' : '/'}${src}`);

export function dimensionText(dimensions) {
  if (!dimensions) return '';
  return `${dimensions.width} × ${dimensions.height} ${dimensions.unit}`;
}

// Shippo-quoted costs, or "contact for quote" only when Shippo could not quote (see market-shipping.mjs).
// rates: { us:{cost}, international:{cost}|null } | { unavailable: reason } | undefined. A US quote is enough to list;
// a missing international quote means international shipping by inquiry.
export function shippingMode(product, rates) {
  if (product?.checkout?.mode !== 'integrated' || !product.checkout?.shipping) return { quote: true, reason: 'no-parcel-profile' };
  if (!rates?.us?.cost) return { quote: true, reason: rates?.unavailable || 'shippo-not-quoted' };
  return { quote: false, us: rates.us.cost, international: rates.international?.cost || null };
}

export const shippingOptionId = (tier, productId, shipping = MARKET_SHIPPING) => `${shipping[tier].idPrefix}-${productId}`;

/** Marketplace price: the site price (USD) times the configured uplift (1 = same price). Returns "123.00" or null. */
export function marketPrice(product, uplift = MARKET_PRICE_UPLIFT) {
  const price = product.listing?.price;
  if (!price || price.currency !== 'USD') return null;
  const cents = Math.round(Number(price.amount) * 100);
  const bps = Math.round(Number(uplift) * 10000);
  if (!Number.isSafeInteger(cents) || cents <= 0 || !Number.isSafeInteger(bps) || bps < 10000) return null;
  return (Math.round(cents * bps / 10000) / 100).toFixed(2);
}

/**
 * Why a product cannot be listed, or null if it can. Only TJ's own originals, and only available or sold works.
 * (The catalog also holds Paul Murphy's works, books and commissions; prints are not in the product list at all.)
 */
export function ineligibleReason(product) {
  if (!product || product.type !== 'painting') return 'not-an-original-painting';
  if (product.artist !== MARKET_ARTIST) return 'not-by-tj';
  if (!['available', 'sold'].includes(product.listing?.status)) return 'not-for-sale';
  if (!product.image?.src) return 'no-image';
  if (!marketPrice(product)) return 'no-usd-price';
  return null;
}

// `live` = the PaintingStock status: available | reserved | sold | unavailable. Defaults to the catalog status.
export function stockFor(product, live) {
  const status = live || product.listing?.status;
  switch (status) {
    case 'available': return { quantity: 1, status: 'active', visibility: 'on-sale' };
    // A site checkout hold: quantity 0 so nobody can buy, still listed.
    case 'reserved': return { quantity: 0, status: 'active', visibility: 'on-sale' };
    // TJ: sold listings stay visible as a portfolio (status sold, stock 0, never deleted).
    case 'sold': return { quantity: 0, status: 'sold', visibility: 'on-sale' };
    default: return { quantity: 0, status: 'active', visibility: 'hidden' };
  }
}

function summaryText(product) {
  const first = (product.story?.[0] || '').replace(/\s+/g, ' ').trim();
  const sentence = first.match(/^.*?[.!?](\s|$)/)?.[0].trim() || first;
  const base = sentence || `${product.title} by ${MARKET_ARTIST}.`;
  return base.length > 240 ? `${base.slice(0, 237).trimEnd()}...` : base;
}

function descriptionText(product, mode) {
  const specs = [product.medium, product.surface, product.year, dimensionText(product.dimensions), product.framing]
    .filter(Boolean).join(' · ');
  const shipLine = mode.quote
    ? MARKET_QUOTE_TEXT
    : [
      `Shipping is paid by the buyer, quoted by carrier for this packed painting: $${mode.us} within the United States${mode.international ? `, $${mode.international} worldwide on Plebeian Market` : ''}. Shopstr checkout charges the US rate.`,
      mode.international
        ? `International buyers on Shopstr: international shipping is available by inquiry. Contact me via ${MARKET_SITE} or a Nostr DM before buying. Import duties and taxes outside the US are paid by the buyer.`
        : `International shipping is available by inquiry. Contact me via ${MARKET_SITE} or a Nostr DM before buying. Import duties and taxes outside the US are paid by the buyer.`
    ].join('\n\n');
  return [
    ...(product.story || []),
    `Original artwork by ${MARKET_ARTIST}. ${specs}.`,
    shipLine,
    `More photos and details: ${MARKET_SITE}/products/${product.slug}/`
  ].filter(Boolean).join('\n\n');
}

/**
 * Catalog product -> unsigned kind 30402 template carrying both Shopstr and Plebeian (Gamma) tags.
 * Returns null when the product is ineligible.
 * options: { now (unix s), publishedAt (unix s, kept from the first publish), live, categories [labels],
 *            prevCreatedAt (unix s), rates (Shippo quote for this product, see market-shipping.mjs), shipping (config), pubkey }
 */
export function mapListing(product, options = {}) {
  if (ineligibleReason(product)) return null;
  const { now = Math.floor(Date.now() / 1000), publishedAt, live, categories = [], prevCreatedAt, rates, shipping = MARKET_SHIPPING, pubkey = MARKET_PUBKEY } = options;
  const stock = stockFor(product, live);
  const mode = shippingMode(product, rates);
  const tags = [
    ['d', listingId(product.id)],
    ['title', product.title],
    ['summary', summaryText(product)],
    ['published_at', String(publishedAt ?? now)],
    ['alt', `${product.title}, an original ${String(product.medium || 'watercolor').toLowerCase()} painting by ${MARKET_ARTIST}`],
    ['price', marketPrice(product), 'USD'],
    ['image', absolute(product.image.src)],
    ['location', MARKET_LOCATION],
    // Shopstr reads quantity and status; Plebeian (Gamma) reads stock, visibility and type.
    ['quantity', String(stock.quantity)],
    ['stock', String(stock.quantity)],
    ['status', stock.status],
    ['visibility', stock.visibility],
    ['type', 'simple', 'physical']
  ];
  if (product.dimensions) tags.push(['spec', 'dimensions', dimensionText(product.dimensions)]);
  if (product.medium) tags.push(['spec', 'medium', product.medium]);
  if (product.surface) tags.push(['spec', 'surface', product.surface]);
  if (product.year) tags.push(['spec', 'year', String(product.year)]);
  if (product.framing) tags.push(['spec', 'framing', product.framing]);
  tags.push(['spec', 'artist', MARKET_ARTIST]);
  if (mode.quote) {
    tags.push(['shipping-note', 'Contact for a shipping quote']);
  } else {
    // Shopstr has one Added Cost: the US quote (TJ, Oct 24). International Shopstr buyers ship by inquiry.
    tags.push(['shipping', 'Added Cost', mode.us, 'USD']);
    tags.push(['shipping-note', MARKET_INTL_INQUIRY_NOTE]);
    tags.push(['shipping_option', shippingAddress(shippingOptionId('us', product.id, shipping), pubkey)]);
    if (mode.international) tags.push(['shipping_option', shippingAddress(shippingOptionId('international', product.id, shipping), pubkey)]);
  }
  const topics = new Set(['art', 'original-art', 'watercolor', 'painting', 'shopstr', ...categories.map((c) => String(c).toLowerCase().replace(/\s+/g, '-'))]);
  for (const topic of topics) tags.push(['t', topic]);
  const createdAt = Math.max(now, (prevCreatedAt ?? 0) + 1);
  return { kind: KIND_LISTING, created_at: createdAt, tags, content: descriptionText(product, mode) };
}

/** One product's Shippo-quoted kind 30406 options: US, plus worldwide when quoted; [] if quote-only. */
export function mapShippingOptions(product, options = {}) {
  const { now = Math.floor(Date.now() / 1000), prevCreatedAt = {}, rates, shipping = MARKET_SHIPPING } = options;
  const mode = shippingMode(product, rates);
  if (mode.quote) return [];
  const build = (tierName, countries, description) => {
    const tier = shipping[tierName], d = shippingOptionId(tierName, product.id, shipping);
    return {
      kind: KIND_SHIPPING,
      created_at: Math.max(now, (prevCreatedAt[d] ?? 0) + 1),
      content: `${description} Buyer pays shipping. Carrier rate quoted for "${product.title}" as packed. Contact for a quote for special requests.`,
      tags: [
        ['d', d],
        ['title', `${tier.title}: ${product.title}`],
        ['price', mode[tierName], 'USD'],
        ['country', ...countries],
        ['service', 'standard'],
        ['duration', String(tier.durationDays[0]), String(tier.durationDays[1]), 'D']
      ]
    };
  };
  const result = [build('us', ['US'], 'Tracked shipping within the United States.')];
  // No international quote: no worldwide option; international shipping is by inquiry.
  if (mode.international) result.push(build('international', INTERNATIONAL_COUNTRIES, 'Tracked shipping worldwide except sanctioned destinations. Import duties, VAT and customs fees are not included and are paid by the buyer.'));
  return result;
}

/**
 * Kind 0 profile template. Kind 0 is replaceable, so `current` (the latest profile content, an object) is MERGED:
 * fields we do not manage are kept, managed fields are set. Returns null without `current` (never overwrite blind),
 * unless allowBlank is set (a brand new account).
 */
export function buildProfileTemplate({ current, now = Math.floor(Date.now() / 1000), prevCreatedAt, profile = MARKET_PROFILE, allowBlank = false } = {}) {
  if (!current && !allowBlank) return null;
  const merged = { ...(current || {}), ...profile };
  return { kind: KIND_PROFILE, created_at: Math.max(now, (prevCreatedAt ?? 0) + 1), tags: [], content: JSON.stringify(merged) };
}

/** Stable hash input: everything that matters to readers except timestamps (created_at, published_at). */
export async function contentHash(template) {
  const stable = JSON.stringify({ kind: template.kind, content: template.content, tags: template.tags.filter((t) => t[0] !== 'published_at') });
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(stable));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
