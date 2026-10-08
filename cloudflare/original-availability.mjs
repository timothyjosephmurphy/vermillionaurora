// Public original-painting availability. Prints are not represented here.
// manual is the owner override: available, sold, or unavailable.
// A manual "available" is the only case that puts a catalog-sold work back on sale.

export function stockStatus(row, now = Date.now()) {
  if (!row) return 'available';
  if (row.state === 'held' && Number(row.expires_at) > now) return 'reserved';
  if (row.state === 'capturing' || row.state === 'cart-held') return 'reserved';
  if (row.state === 'sold' || row.manual === 'sold') return 'sold';
  if (row.manual === 'unavailable' || row.state === 'unavailable') return 'unavailable';
  if (row.manual === 'available' || row.state === 'held' || row.state === 'open') return 'available';
  return 'reserved';
}

export function displayedStatus(catalogStatus, row, now = Date.now()) {
  const live = stockStatus(row, now);
  if (row?.manual === 'available' && live === 'available') return 'available';
  if (live === 'sold' || live === 'unavailable' || live === 'reserved') return live;
  if (catalogStatus && catalogStatus !== 'available') return catalogStatus;
  return live || 'available';
}

export function nextManualRow(row, status, now = Date.now()) {
  if (!['available', 'sold', 'unavailable'].includes(status)) return {error: 'Choose sold, unavailable, or available.'};
  if (row && ((row.state === 'held' && Number(row.expires_at) > now) || row.state === 'capturing' || row.state === 'cart-held')) {
    return {error: 'This original is in checkout. Try again when that hold ends.'};
  }
  if (status === 'available') return {manual: 'available', state: 'open', order_id: null, capture_id: null, expires_at: null};
  if (status === 'unavailable') return {manual: 'unavailable', state: 'unavailable', order_id: 'manual', capture_id: 'manual', expires_at: null};
  if (row?.state === 'sold') return {unchanged: true, manual: 'sold', state: 'sold', order_id: row.order_id || null, capture_id: row.capture_id || null, expires_at: null};
  const id = 'manual:' + now;
  return {manual: 'sold', state: 'sold', order_id: id, capture_id: id, expires_at: null};
}

export function nextEtsySale(row, receiptId, now = Date.now()) {
  const capture = 'etsy:' + receiptId;
  if (row?.state === 'sold' && row.capture_id === capture) return {duplicate: true};
  if (row?.state === 'sold' || row?.state === 'capturing') return {conflict: true};
  const replacedHold = (row?.state === 'held' && Number(row.expires_at) > now) || row?.state === 'cart-held';
  return {replacedHold, manual: 'sold', state: 'sold', order_id: capture, capture_id: capture, expires_at: null};
}

export const ETSY_ORIGINAL_UPLIFT = 1.1;

export function etsyOriginalPrice(sitePrice, uplift = ETSY_ORIGINAL_UPLIFT) {
  const cents = Math.round(Number(sitePrice) * 100);
  const bps = Math.round(Number(uplift) * 10000);
  if (!Number.isSafeInteger(cents) || cents <= 0 || !Number.isSafeInteger(bps) || bps < 10000) throw Error('Original price uplift is not configured.');
  return (Math.round(cents * bps / 10000) / 100).toFixed(2);
}
