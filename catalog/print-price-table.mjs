// Offline checks for the committed print/frame price table (catalog/prints.json and
// catalog/book-prints.json). No network calls. Policy: payments/FINERWORKS-PRICING.md.
import {moneyCents,printRetailPrice,PRINT_PRICING,publishedPrintPrice} from './print-pricing.mjs';
import {FRAME_PRICING,framedRetailPrice,publishedFramedPrice} from './frame-pricing.mjs';

export const PRICE_BLOCK_MESSAGE = "This size needs a fresh price, we've been notified, please try another size or check back soon";

function moneyStringCents(cents) {
  if (!Number.isSafeInteger(cents) || cents < 0) return null;
  return (cents / 100).toFixed(2);
}

// Every enabled, priced variant must carry a saved retail that maps to the intended
// margin rule. Framed retail = unframed retail + exact saved supplier frame/mat/glazing
// extras (amount − unframedAmount), with no markup.
export function checkPrintPriceTable(printsConfig, bookArtworks = {}) {
  const artworks = {...(printsConfig?.artworks || {}), ...bookArtworks};
  const errors = [];
  let unframed = 0, framed = 0;

  for (const [productId, art] of Object.entries(artworks)) {
    if (!art || art.enabled !== true) continue;
    const variants = art.variants || {};
    for (const [key, variant] of Object.entries(variants)) {
      const label = `${productId}/${key}`;
      try {
        const amount = publishedPrintPrice(variant, variant.sku);
        if (amount === null) {
          errors.push(`${label}: missing a saved unframed price under ${PRINT_PRICING.id}`);
          continue;
        }
        if (amount !== variant.amount) errors.push(`${label}: published amount ${variant.amount} does not match saved price ${amount}`);
        moneyCents(variant.amount);
        if (!variant.priceOverride) {
          if (variant.pricingRule !== PRINT_PRICING.id) errors.push(`${label}: pricingRule must be ${PRINT_PRICING.id}`);
          if (moneyCents(variant.amount) < PRINT_PRICING.minimumCents) errors.push(`${label}: amount below $${(PRINT_PRICING.minimumCents / 100).toFixed(2)}`);
          if (moneyCents(variant.amount) % PRINT_PRICING.incrementCents) errors.push(`${label}: amount must land on a $${(PRINT_PRICING.incrementCents / 100).toFixed(0)} step`);
        }
        unframed++;

        for (const [frameKey, frame] of Object.entries(variant.frameOptions || {})) {
          const flabel = `${label}/frame-${frameKey}`;
          try {
            const framedAmount = publishedFramedPrice(frame, frame.sku, variant.amount);
            if (framedAmount === null) {
              errors.push(`${flabel}: missing a saved framed price under ${FRAME_PRICING}`);
              continue;
            }
            if (framedAmount !== frame.amount) errors.push(`${flabel}: published amount ${frame.amount} does not match saved price ${framedAmount}`);
            if (frame.unframedAmount !== variant.amount) errors.push(`${flabel}: unframedAmount ${frame.unframedAmount} must equal unframed ${variant.amount}`);
            if (frame.pricingRule !== FRAME_PRICING) errors.push(`${flabel}: pricingRule must be ${FRAME_PRICING}`);
            if (frame.baseSku !== variant.sku) errors.push(`${flabel}: baseSku must equal unframed sku ${variant.sku}`);
            const extras = moneyCents(frame.amount) - moneyCents(frame.unframedAmount);
            if (extras <= 0) errors.push(`${flabel}: framed amount must exceed unframed by the saved supplier frame cost`);
            framed++;
          } catch (error) {
            errors.push(`${flabel}: ${error.message}`);
          }
        }
      } catch (error) {
        errors.push(`${label}: ${error.message}`);
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    counts: {
      unframed,
      framed,
      artworks: Object.keys(artworks).filter(id => artworks[id]?.enabled === true).length,
    },
  };
}

// Pure checkout guard: compare a live FinerWorks manufacturing quote to the saved retail.
// Returns ok | confirm (positive margin, corrected price) | block (margin gone / underwater).
export function reviewLivePrintCost(item, liveQuote) {
  if (!liveQuote?.ok || liveQuote.quantity !== 1 || liveQuote.shippingIncluded !== false || liveQuote.taxIncluded !== false) {
    return {status: 'block', message: PRICE_BLOCK_MESSAGE, reason: 'invalid-live-quote'};
  }
  const sku = item.sku;
  const liveCost = liveQuote.productionCost;
  const storedAmount = item.amount;

  if (item.frame) {
    let corrected;
    try {
      corrected = framedRetailPrice(liveQuote, item.unframedAmount);
    } catch {
      let storedCost = null;
      try { storedCost = moneyStringCents(moneyCents(item.amount) - moneyCents(item.unframedAmount)); } catch { /* ignore */ }
      return {
        status: 'block', message: PRICE_BLOCK_MESSAGE, reason: 'negative-margin',
        productCode: sku, storedAmount, liveCost, storedCost, id: item.id, title: item.title,
      };
    }
    if (corrected === storedAmount) return {status: 'ok', productCode: sku, amount: storedAmount, liveCost};
    let storedCost = null, liveExtras = null;
    try {
      storedCost = moneyStringCents(moneyCents(storedAmount) - moneyCents(item.unframedAmount));
      liveExtras = moneyStringCents(moneyCents(liveQuote.productionCost) - moneyCents(liveQuote.baseCost));
    } catch { /* ignore */ }
    if (moneyCents(storedAmount) > moneyCents(liveCost)) {
      return {
        status: 'confirm', productCode: sku, storedAmount, amount: corrected, liveCost,
        storedCost, liveExtras, id: item.id, title: item.title,
      };
    }
    return {
      status: 'block', message: PRICE_BLOCK_MESSAGE, reason: 'negative-margin',
      productCode: sku, storedAmount, liveCost, storedCost, id: item.id, title: item.title,
    };
  }

  const corrected = item.priceOverride?.amount || printRetailPrice(liveCost);
  if (!item.priceOverride && corrected === storedAmount) {
    return {status: 'ok', productCode: sku, amount: storedAmount, liveCost};
  }
  if (item.priceOverride && moneyCents(storedAmount) >= moneyCents(printRetailPrice(liveCost))) {
    return {status: 'ok', productCode: sku, amount: storedAmount, liveCost};
  }
  if (moneyCents(storedAmount) > moneyCents(liveCost)) {
    return {
      status: 'confirm', productCode: sku, storedAmount, amount: corrected, liveCost,
      storedCost: null, id: item.id, title: item.title,
    };
  }
  return {
    status: 'block', message: PRICE_BLOCK_MESSAGE, reason: 'negative-margin',
    productCode: sku, storedAmount, liveCost, storedCost: null, id: item.id, title: item.title,
  };
}
