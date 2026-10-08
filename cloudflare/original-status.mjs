// Owner-only original status. Sold and unavailable leave the site and Etsy.
// Available is the only path that reactivates an Etsy listing.
import {inventory} from './checkout-catalog.mjs';
import {displayedStatus} from './original-availability.mjs';
import {listingMap, deactivateOriginal, activateOriginal, appendLog} from './etsy-original-sync.mjs';

const ORIGINS = new Set(['https://tjm.art', 'https://vermillion-commissions.timothyjosephmurphy.workers.dev']);
const STATE_KEY = 'etsy/original-inventory.json';
const STATUSES = new Set(['sold', 'unavailable', 'available']);

async function authorized(request, env) {
  const token = env.INVENTORY_ADMIN_TOKEN;
  if (!token) return false;
  const digest = value => crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  const actual = new Uint8Array(await digest(request.headers.get('Authorization') || ''));
  const expected = new Uint8Array(await digest('Bearer ' + token));
  let difference = actual.length ^ expected.length;
  for (let i = 0; i < actual.length && i < expected.length; i++) difference |= actual[i] ^ expected[i];
  return difference === 0;
}
function json(body, status = 200) {
  return Response.json(body, {status, headers: {'Cache-Control': 'no-store'}});
}
async function loadLog(env) {
  const object = await env.COMMISSION_UPLOADS.get(STATE_KEY);
  if (!object) return {state: {processedReceiptIds: [], log: [], alerts: {}}, etag: null};
  const state = await object.json();
  state.log ||= [];
  state.processedReceiptIds ||= [];
  state.alerts ||= {};
  return {state, etag: object.etag};
}
async function saveLog(env, state, etag) {
  const ok = await env.COMMISSION_UPLOADS.put(STATE_KEY, JSON.stringify(state), {onlyIf: etag ? {etagMatches: etag} : {etagDoesNotMatch: '*'}, httpMetadata: {contentType: 'application/json'}});
  if (!ok) throw Error('Status log changed. Retry.');
}

export async function originalStatusApi(request, env, now = Date.now()) {
  if (request.method !== 'POST' || !ORIGINS.has(request.headers.get('Origin') || '')) return json({error: 'Invalid management credential or origin.'}, 403);
  if (!await authorized(request, env)) return json({error: 'Invalid management credential or origin.'}, 403);
  if (!env.INVENTORY_ADMIN_TOKEN || !env.PAINTING_STOCK || !env.COMMISSION_UPLOADS) return json({error: 'Inventory admin is not configured.'}, 503);
  let input; try { input = await request.json(); } catch { return json({error: 'Invalid request'}, 400); }
  const at = new Date(now).toISOString();
  if (input.action === 'log') {
    const {state} = await loadLog(env);
    const productId = String(input.id || '');
    const log = state.log.filter(entry => !productId || entry.productId === productId).slice(-50);
    return json({log});
  }
  if (input.action === 'list') {
    const ids = Array.isArray(input.ids) && input.ids.length ? input.ids : Object.keys(inventory);
    if (ids.length > 300 || ids.some(id => !Object.hasOwn(inventory, id))) return json({error: 'Unknown artwork.'}, 400);
    const {state} = await loadLog(env);
    const latestFor = id => [...state.log].reverse().find(entry => entry.productId === id) || null;
    const originals = [];
    for (let i = 0; i < ids.length; i += 40) {
      originals.push(...await Promise.all(ids.slice(i, i + 40).map(async id => {
        const stub = env.PAINTING_STOCK.getByName(id);
        const row = typeof stub.summary === 'function' ? await stub.summary() : null;
        const latest = latestFor(id);
        return {id, status: displayedStatus(inventory[id].status, row, now), note: row?.note || latest?.note || '', at: row?.at || latest?.at || null};
      })));
    }
    return json({originals});
  }
  if (input.action !== 'set') return json({error: 'Unknown action.'}, 400);
  const id = String(input.id || '');
  const status = String(input.status || '');
  const note = String(input.note || '').replace(/\s+/g, ' ').trim().slice(0, 300);
  if (!Object.hasOwn(inventory, id) || !STATUSES.has(status)) return json({error: 'Choose a known original and sold, unavailable, or available.'}, 400);
  const stub = env.PAINTING_STOCK.getByName(id);
  const marked = await stub.setManual(status, note, at);
  if (!marked.ok) return json({error: marked.error || 'Status was not changed.'}, 409);
  const {state, etag} = await loadLog(env);
  appendLog(state, {at, productId: id, status, note, source: 'manual'});
  await saveLog(env, state, etag);
  let etsy = {skipped: 'unmapped'};
  if (env.ETSY_KEYSTRING) {
    try {
      const {connection} = await import('./etsy-listings.mjs');
      const loaded = await connection(env);
      const match = listingMap(loaded.record).find(item => item.productId === id);
      if (match) etsy = status === 'available'
        ? await activateOriginal(env, loaded.token, match.listingId)
        : await deactivateOriginal(env, loaded.token, match.listingId);
    } catch (error) {
      const {alertOriginalSync} = await import('./etsy-original-sync.mjs');
      await alertOriginalSync(env, 'Etsy original sync failed for ' + id, 'tjm.art now shows ' + id + ' as ' + status + ', but Etsy was not updated.\n\n' + (error.message || 'Etsy rejected the update.'), state);
      etsy = {ok: false, error: error.message || 'Etsy was not updated.'};
    }
  }
  return json({id, status: marked.status, note, at, etsy});
}
