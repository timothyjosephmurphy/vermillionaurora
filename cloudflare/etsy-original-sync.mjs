// Two-way inventory for one-of-a-kind originals. Prints stay quantity 100 and are never written here.
// Automatic changes only deactivate an Etsy listing. Reactivation happens only when an owner marks the original available.
import {EXISTING_PRINT_LISTINGS, PROTECTED_LISTING_IDS, ORIGINAL_LISTINGS} from './etsy-sync-plan.mjs';
import {etsyOriginalPrice} from './original-availability.mjs';

const API = 'https://api.etsy.com/v3/application';
const STATE_KEY = 'etsy/original-inventory.json';
const PRINT_LISTING_IDS = new Set(Object.values(EXISTING_PRINT_LISTINGS));
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function listingMap(record) {
  const saved = record?.etsyListingSync?.listings || {};
  const ids = new Set([...Object.keys(ORIGINAL_LISTINGS), ...Object.keys(saved)]);
  const map = [];
  for (const productId of ids) {
    const listingId = Number(saved[productId]?.original || ORIGINAL_LISTINGS[productId] || 0);
    if (!listingId) continue;
    if (PROTECTED_LISTING_IDS.has(listingId) || PRINT_LISTING_IDS.has(listingId)) throw Error('Refusing to treat a print listing as an original.');
    map.push({productId, listingId});
  }
  return map.sort((a, b) => a.productId.localeCompare(b.productId));
}

export function byListingId(map) {
  return new Map(map.map(item => [item.listingId, item.productId]));
}

export function originalsInReceipt(receipt, listingToProduct) {
  if (!receipt || receipt.is_paid === false || receipt.was_paid === false) return [];
  const receiptId = receipt.receipt_id ?? receipt.receiptId;
  if (receiptId === undefined || receiptId === null) return [];
  const transactions = Array.isArray(receipt.transactions) ? receipt.transactions : [];
  const hits = [];
  for (const tx of transactions) {
    const listingId = Number(tx.listing_id ?? tx.listingId);
    const productId = listingToProduct.get(listingId);
    if (!productId || PROTECTED_LISTING_IDS.has(listingId) || PRINT_LISTING_IDS.has(listingId)) continue;
    hits.push({productId, listingId, receiptId: String(receiptId)});
  }
  return hits;
}

// Site sold/unavailable while Etsy is still for sale is drift. Never the reverse.
export function reconcileAction(siteStatus, etsyState) {
  const forSale = etsyState === 'active';
  if ((siteStatus === 'sold' || siteStatus === 'unavailable') && forSale) return 'deactivate';
  return 'none';
}

function rows(value) {
  return Array.isArray(value?.results) ? value.results : Array.isArray(value) ? value : [];
}

async function etsyApi() {
  const mod = await import('./etsy-listings.mjs');
  return mod;
}

export async function alertOriginalSync(env, subject, text, state) {
  const key = subject.slice(0, 120);
  const alerts = state?.alerts || {};
  if (alerts[key] && Date.now() - alerts[key] < 3600_000) return {sent: false, throttled: true};
  alerts[key] = Date.now();
  if (state) state.alerts = alerts;
  try {
    const {sellerMailToken} = await import('./shipping-email.mjs');
    const token = await sellerMailToken(env);
    const owner = 'tj@vermillionaurora.com';
    const encode = value => { let s = ''; for (const b of new TextEncoder().encode(value)) s += String.fromCharCode(b); return btoa(s); };
    const mime = [`From: Vermillion Aurora <${owner}>`, `To: ${owner}`, `Subject: =?UTF-8?B?${encode(subject)}?=`, 'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', encode(text)].join('\r\n');
    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {method: 'POST', signal: AbortSignal.timeout(20000),
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}, body: JSON.stringify({raw: encode(mime).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')})});
    if (!response.ok) throw Error('Owner email failed');
    console.error('Etsy original sync alert emailed:', subject);
    return {sent: true};
  } catch (error) {
    console.error('Etsy original sync alert failed:', subject);
    return {sent: false, error: error.message || 'alert failed'};
  }
}

async function loadState(env) {
  const object = await env.COMMISSION_UPLOADS.get(STATE_KEY);
  if (!object) return {state: {processedReceiptIds: [], log: [], alerts: {}}, etag: null};
  const state = await object.json();
  state.processedReceiptIds ||= [];
  state.log ||= [];
  state.alerts ||= {};
  return {state, etag: object.etag};
}

async function saveState(env, state, etag) {
  const body = JSON.stringify({
    processedReceiptIds: state.processedReceiptIds.slice(-400),
    log: state.log.slice(-200),
    alerts: state.alerts,
    lastPollAt: state.lastPollAt || null
  });
  const ok = await env.COMMISSION_UPLOADS.put(STATE_KEY, body, {onlyIf: etag ? {etagMatches: etag} : {etagDoesNotMatch: '*'}, httpMetadata: {contentType: 'application/json'}});
  if (!ok) throw Error('Original sync state changed. Retry.');
  return ok.etag || etag;
}

export function appendLog(state, entry) {
  state.log.push(entry);
  state.log = state.log.slice(-200);
}

async function withRetry(fn) {
  let last;
  for (let attempt = 0; attempt < 3; attempt++) {
    try { return await fn(); }
    catch (error) {
      last = error;
      if ([400, 401, 403, 404].includes(error.etsyStatus)) break;
      await sleep(200 * (attempt + 1));
    }
  }
  throw last;
}

async function readListing(env, token, listingId) {
  const {call} = await etsyApi();
  try { return await call(API + '/listings/' + listingId, env, token, {action: 'reading a listing'}); }
  catch (error) { if (error.etsyStatus === 404) return null; throw error; }
}

export async function deactivateOriginal(env, token, listingId) {
  if (PROTECTED_LISTING_IDS.has(Number(listingId)) || PRINT_LISTING_IDS.has(Number(listingId))) throw Error('Refusing to deactivate a print or protected listing.');
  const listing = await readListing(env, token, listingId);
  if (!listing) return {ok: false, missing: true};
  if (listing.state !== 'active') return {ok: true, already: true, state: listing.state};
  const {call} = await etsyApi();
  const send = quantity => {
    const body = new URLSearchParams();
    body.set('state', 'inactive');
    if (quantity) body.set('quantity', '0');
    return call(API + '/shops/' + token.shopId + '/listings/' + listingId, env, token, {method: 'PATCH', headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}, body, action: 'deactivating an original'});
  };
  try { await withRetry(() => send(true)); }
  catch (error) {
    if (!/quantity/i.test(error.message || '')) throw error;
    await withRetry(() => send(false));
  }
  return {ok: true, state: 'inactive'};
}

export async function activateOriginal(env, token, listingId) {
  if (PROTECTED_LISTING_IDS.has(Number(listingId)) || PRINT_LISTING_IDS.has(Number(listingId))) throw Error('Refusing to activate a print or protected listing.');
  const listing = await readListing(env, token, listingId);
  if (!listing) return {ok: false, missing: true};
  if (listing.state === 'active' && Number(listing.quantity) > 0) return {ok: true, already: true, state: 'active'};
  const {call} = await etsyApi();
  const body = new URLSearchParams();
  body.set('state', 'active');
  body.set('quantity', '1');
  await withRetry(() => call(API + '/shops/' + token.shopId + '/listings/' + listingId, env, token, {method: 'PATCH', headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}, body, action: 'reactivating an original'}));
  return {ok: true, state: 'active'};
}

export async function onSiteSold(env, productId) {
  if (!env?.ETSY_KEYSTRING || !env.COMMISSION_UPLOADS) return {skipped: 'unconfigured'};
  const {connection} = await etsyApi();
  let loaded;
  try { loaded = await connection(env); }
  catch (error) {
    await alertOriginalSync(env, 'Etsy original sync failed for ' + productId, 'The site marked ' + productId + ' sold, but Etsy could not be reached to take the listing down.\n\n' + (error.message || 'Etsy sync failed.'), (await loadState(env)).state);
    return {ok: false};
  }
  const match = listingMap(loaded.record).find(item => item.productId === productId);
  if (!match) return {skipped: 'unmapped'};
  try {
    const result = await deactivateOriginal(env, loaded.token, match.listingId);
    return {ok: true, ...result, listingId: match.listingId};
  } catch (error) {
    const {state, etag} = await loadState(env);
    await alertOriginalSync(env, 'Etsy original sync failed for ' + productId, 'The site marked ' + productId + ' sold, but the Etsy listing ' + match.listingId + ' is still for sale.\n\n' + (error.message || 'Etsy rejected the update.') + '\n\nThe next check will try again. Nothing was reactivated.', state);
    try { await saveState(env, state, etag); } catch { /* the email already went out or was logged */ }
    console.error('Etsy original deactivate failed:', productId);
    return {ok: false, listingId: match.listingId};
  }
}

async function siteRow(env, productId) {
  const stub = env.PAINTING_STOCK?.getByName?.(productId);
  if (!stub) return null;
  if (typeof stub.summary === 'function') return stub.summary();
  return null;
}

export async function reconcileOriginals(env, token, record, {dryRun = true, siteStatusFor} = {}) {
  const {inventory} = await import('./checkout-catalog.mjs');
  const {displayedStatus} = await import('./original-availability.mjs');
  const map = listingMap(record);
  const results = [];
  for (const item of map) {
    const row = siteStatusFor ? null : await siteRow(env, item.productId);
    const siteStatus = siteStatusFor ? siteStatusFor(item.productId) : displayedStatus(inventory[item.productId]?.status || 'available', row);
    let listing = null, error = null;
    try { listing = await readListing(env, token, item.listingId); }
    catch (err) { error = err.message || 'read failed'; }
    const etsyState = listing?.state || (error ? 'error' : 'missing');
    const action = error ? 'none' : reconcileAction(siteStatus, etsyState);
    let applied = null;
    if (action === 'deactivate' && !dryRun) {
      try { applied = await deactivateOriginal(env, token, item.listingId); }
      catch (err) {
        error = err.message || 'deactivate failed';
        const loaded = await loadState(env);
        await alertOriginalSync(env, 'Etsy original sync failed for ' + item.productId, item.productId + ' is ' + siteStatus + ' on tjm.art, but Etsy listing ' + item.listingId + ' could not be deactivated.\n\n' + error, loaded.state);
        try { await saveState(env, loaded.state, loaded.etag); } catch { /* logged */ }
      }
    }
    const price = listing ? (typeof listing.price === 'number' ? listing.price : (listing.price?.divisor ? listing.price.amount / listing.price.divisor : null)) : null;
    results.push({
      productId: item.productId, listingId: item.listingId, siteStatus, etsyState, price, quantity: listing?.quantity ?? null,
      url: listing?.url || (listing ? 'https://www.etsy.com/listing/' + item.listingId : null),
      drift: action === 'deactivate', action: dryRun ? action : (applied ? 'deactivated' : action), error
    });
  }
  return {dryRun: !!dryRun, uplift: etsyOriginalPrice(1000), results, drift: results.some(item => item.drift)};
}

export async function pollEtsyReceipts(env, token, record, {dryRun = false, now = Date.now()} = {}) {
  const {call} = await etsyApi();
  const {state, etag} = await loadState(env);
  const since = state.lastPollAt ? Math.floor(Date.parse(state.lastPollAt) / 1000) - 600 : Math.floor(now / 1000) - 86400;
  let receipts = [];
  try {
    const data = await call(API + '/shops/' + token.shopId + '/receipts?limit=100&was_paid=true&min_created=' + since, env, token, {action: 'reading Etsy receipts'});
    receipts = rows(data);
  } catch (error) {
    if (!dryRun) await alertOriginalSync(env, 'Etsy receipt check failed', 'The five-minute Etsy receipt check could not read the shop.\n\n' + (error.message || 'Etsy could not be reached.') + '\n\nNo listing was reactivated.', state);
    try { await saveState(env, state, etag); } catch { /* logged */ }
    return {ok: false, error: error.message || 'receipts failed', results: []};
  }
  const map = byListingId(listingMap(record));
  const seen = new Set(state.processedReceiptIds);
  const results = [];
  for (const receipt of receipts) {
    for (const hit of originalsInReceipt(receipt, map)) {
      if (seen.has(hit.receiptId + ':' + hit.productId)) { results.push({...hit, duplicate: true}); continue; }
      if (dryRun) { results.push({...hit, dryRun: true}); continue; }
      const stub = env.PAINTING_STOCK.getByName(hit.productId);
      const marked = await stub.recordEtsySale(hit.receiptId, new Date(now).toISOString());
      if (marked.conflict) {
        await alertOriginalSync(env, 'Etsy sale conflicts with site stock for ' + hit.productId, 'Etsy receipt ' + hit.receiptId + ' sold ' + hit.productId + ', but tjm.art already has a different sale or a payment in progress. The site was not overwritten. Listing ' + hit.listingId + ' will be deactivated if it is still active.', state);
      }
      seen.add(hit.receiptId + ':' + hit.productId);
      state.processedReceiptIds.push(hit.receiptId + ':' + hit.productId);
      appendLog(state, {at: new Date(now).toISOString(), productId: hit.productId, status: 'sold', note: 'Etsy receipt ' + hit.receiptId, source: 'etsy'});
      try { await deactivateOriginal(env, token, hit.listingId); } catch (error) {
        await alertOriginalSync(env, 'Etsy original sync failed for ' + hit.productId, 'Etsy receipt ' + hit.receiptId + ' sold ' + hit.productId + ', and the listing could not be deactivated.\n\n' + (error.message || 'Etsy rejected the update.'), state);
      }
      results.push({...hit, ...marked});
    }
  }
  state.lastPollAt = new Date(now).toISOString();
  if (!dryRun) await saveState(env, state, etag);
  return {ok: true, results};
}

export async function runOriginalInventorySync(env, now = Date.now()) {
  if (!env?.ETSY_KEYSTRING || !env.COMMISSION_UPLOADS || !env.PAINTING_STOCK) return {skipped: 'unconfigured'};
  const {connection} = await etsyApi();
  const loaded = await connection(env);
  const polled = await pollEtsyReceipts(env, loaded.token, loaded.record, {now});
  const reconciled = await reconcileOriginals(env, loaded.token, loaded.record, {dryRun: false});
  return {polled, reconciled};
}

export async function dropInactiveVideo(env, token, listingId) {
  if (PROTECTED_LISTING_IDS.has(Number(listingId)) || Number(listingId) === 4587311534) throw Error('Refusing to edit a protected listing.');
  const {call} = await etsyApi();
  const videos = rows(await call(API + '/listings/' + listingId + '/videos', env, token, {action: 'reading listing video'}).catch(error => error.etsyStatus === 404 ? {results: []} : Promise.reject(error)));
  const active = videos.some(video => !video.video_state || video.video_state === 'active');
  if (!active) return {removed: 0, skipped: 'no active video'};
  const inactive = videos.filter(video => video.video_state === 'inactive' && video.video_id);
  const removed = [];
  for (const video of inactive) {
    try {
      await call(API + '/shops/' + token.shopId + '/listings/' + listingId + '/videos/' + video.video_id, env, token, {method: 'DELETE', action: 'removing an inactive video'});
      removed.push(video.video_id);
    } catch (error) {
      return {removed, skipped: error.message || 'Etsy rejected the video delete'};
    }
  }
  return {removed};
}
