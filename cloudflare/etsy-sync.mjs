// Owner-only, product-scoped Etsy updates. Does not publish unless activate is called,
// and never touches listings outside the El Zonte sync set.
import {ETSY_ORIGIN} from './etsy-connection.mjs';
import {call as etsyApiCall, persist as persistEtsyRecord} from './etsy-listings.mjs';
import {shippingChoice, shippingPackages, estimateShippingPackages} from './etsy-shipping.mjs';
import {
  SYNC_WORKS, EXISTING_PRINT_LISTINGS, PROTECTED_LISTING_IDS, syncSourceVersion,
  buildSyncPrintPlan, buildSyncOriginalPlan, workById, printTitle, originalTitle
} from './etsy-sync-plan.mjs';

const API = 'https://api.etsy.com/v3/application';
export const ADMIN_PATHS = new Set(['/etsy/listings/sync', '/etsy/listings/media', '/etsy/listings/activate', '/etsy/listings/verify', '/etsy/listings/reconcile']);
const rows = value => Array.isArray(value?.results) ? value.results : Array.isArray(value) ? value : [];
const SLOTS = {painting: 1, 'room-1': 2, 'room-2': 3, 'room-3': 4};

function exactlyOne(items, label) {
  if (items.length !== 1) throw Error('Expected exactly one ' + label + ' and found ' + items.length + '. Shop settings were not changed.');
  return items[0];
}
function flatten(nodes, parent = '') {
  return rows(nodes).flatMap(node => {
    const name = parent ? parent + ' › ' + node.name : node.name;
    return rows(node.children).length ? flatten(node.children, name) : [{id: Number(node.id), name}];
  });
}
function owned(id) {
  const listingId = Number(id);
  if (!Number.isSafeInteger(listingId) || listingId <= 0 || PROTECTED_LISTING_IDS.has(listingId)) throw Error('Refusing to modify a listing outside the El Zonte sync.');
  return listingId;
}
function indexOf(record) {
  const sync = record.etsyListingSync;
  return sync?.listings ? sync : {version: 1, sourceVersion: syncSourceVersion, listings: {}};
}
async function saveIndex(env, record, etag, sync) {
  const next = {...record, etsyListingSync: {...sync, version: 1, sourceVersion: syncSourceVersion}};
  return {record: next, etag: await persistEtsyRecord(env, next, etag)};
}
function remember(sync, productId, kind, listingId) {
  const listings = {...sync.listings, [productId]: {...sync.listings[productId], [kind]: listingId}};
  return {...sync, listings};
}

async function shopSetup(env, token) {
  const shop = token.shopId;
  const paths = ['/shops/' + shop + '/shipping-profiles', '/shops/' + shop + '/readiness-state-definitions?legacy=false&limit=100&offset=0', '/shops/' + shop + '/production-partners', '/seller-taxonomy/nodes', '/shops/' + shop + '/policies/return', '/shops/' + shop];
  const data = await Promise.all(paths.map(path => etsyApiCall(API + path, env, token, {action: 'loading Etsy shop setup'})));
  if (String(data[5]?.currency_code || '').toUpperCase() !== 'USD') throw Error('The catalog is priced in USD. Shop settings were not changed.');
  const shipping = rows(data[0]).map(shippingChoice).filter(item => Number.isSafeInteger(item.id));
  const readiness = rows(data[1]).filter(item => item.readiness_state === 'made_to_order' && Number.isSafeInteger(item.readiness_state_id));
  const partners = rows(data[2]).map(item => ({id: Number(item.production_partner_id ?? item.partner_id), name: String(item.partner_name ?? item.name ?? '').trim()})).filter(item => Number.isSafeInteger(item.id) && item.id > 0);
  const policies = rows(data[4]).map(item => ({id: Number(item.return_policy_id), acceptsReturns: item.accepts_returns === true, acceptsExchanges: item.accepts_exchanges === true, returnDeadline: item.return_deadline ?? null})).filter(item => Number.isSafeInteger(item.id) && item.id > 0);
  return {
    printsShipping: exactlyOne(shipping.filter(item => /^Prints Shipping\b/i.test(item.name)), 'Prints Shipping profile'),
    originalsShipping: exactlyOne(shipping.filter(item => /^Originals Shipping\b/i.test(item.name)), 'Originals Shipping profile'),
    readinessId: exactlyOne(readiness, 'made-to-order processing profile').readiness_state_id,
    partnerId: exactlyOne(partners, 'production partner').id,
    returnPolicyId: exactlyOne(policies.filter(item => item.acceptsReturns && item.acceptsExchanges && item.returnDeadline === 30), '30-day return policy').id,
    taxonomy: flatten(data[3]).filter(item => Number.isSafeInteger(item.id) && item.id > 0)
  };
}
function originalTaxonomy(nodes) {
  const painted = nodes.filter(node => /painting/i.test(node.name) && /watercolor/i.test(node.name));
  const choice = (painted.length ? painted : nodes.filter(node => /watercolor/i.test(node.name))).sort((a, b) => a.name.length - b.name.length)[0];
  if (!choice) throw Error('No Etsy watercolor painting category was found. Shop settings were not changed.');
  return choice;
}
function printTaxonomy(nodes, existingId) {
  if (Number.isSafeInteger(Number(existingId)) && nodes.some(node => node.id === Number(existingId))) return Number(existingId);
  const digital = nodes.find(node => /Digital Prints$/.test(node.name));
  if (!digital) throw Error('No Etsy print category was found. Shop settings were not changed.');
  return digital.id;
}

async function readListing(env, token, listingId) {
  try {
    return await etsyApiCall(API + '/listings/' + listingId, env, token, {action: 'reading a listing'});
  } catch (error) {
    if (error.etsyStatus === 404) return null;
    throw error;
  }
}
async function findByTitle(env, token, title) {
  for (const state of ['draft', 'active']) {
    for (let offset = 0; offset < 500; offset += 100) {
      const data = await etsyApiCall(API + '/shops/' + token.shopId + '/listings?state=' + state + '&limit=100&offset=' + offset, env, token, {action: 'finding an existing listing'});
      const hit = rows(data).find(item => item.title === title && !PROTECTED_LISTING_IDS.has(Number(item.listing_id)));
      if (hit) return hit;
      if (rows(data).length < 100) break;
    }
  }
  return null;
}
async function writeListing(env, token, listingId, body) {
  const send = payload => etsyApiCall(API + '/shops/' + token.shopId + '/listings/' + listingId, env, token, {method: 'PATCH', headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}, body: payload, action: 'updating a listing'});
  try {
    return await send(body);
  } catch (error) {
    if (!body.has('materials') || !/material/i.test(error.message)) throw error;
    body.delete('materials');
    await send(body);
    return {skipped: ['materials']};
  }
}

function requested(input) {
  const ids = input?.productIds;
  if (!Array.isArray(ids) || !ids.length || ids.length > SYNC_WORKS.length || new Set(ids).size !== ids.length) throw Error('Choose the El Zonte paintings to sync.');
  return ids.map(workById);
}
function kindOf(input) {
  if (input?.kind !== 'print' && input?.kind !== 'original') throw Error('Choose print or original.');
  return input.kind;
}

async function ensureListing(env, token, record, etag, sync, work, kind, setup) {
  const title = kind === 'print' ? printTitle(work) : originalTitle(work);
  let listingId = sync.listings?.[work.id]?.[kind] || (kind === 'print' ? EXISTING_PRINT_LISTINGS[work.id] : null) || null;
  let listing = listingId ? await readListing(env, token, owned(listingId)) : null;
  if (!listing) {
    listing = await findByTitle(env, token, title);
    listingId = listing ? owned(listing.listing_id) : null;
  }
  const settings = {
    taxonomyId: kind === 'print' ? printTaxonomy(setup.taxonomy, listing?.taxonomy_id) : originalTaxonomy(setup.taxonomy).id,
    shippingProfileId: kind === 'print' ? setup.printsShipping.id : setup.originalsShipping.id,
    readinessStateId: setup.readinessId,
    partnerId: setup.partnerId,
    returnPolicyId: listing?.return_policy_id || setup.returnPolicyId,
    shippingPackages: kind === 'print' && setup.printsShipping.profileType === 'calculated' ? shippingPackages('calculated', null, SYNC_WORKS) : null
  };
  if (kind === 'original' && setup.originalsShipping.profileType !== 'calculated') settings.shippingPackages = null;
  const plan = kind === 'print' ? await buildSyncPrintPlan(work, settings) : buildSyncOriginalPlan(work, settings);
  let created = false;
  if (!listingId) {
    let createdListing;
    try {
      createdListing = await etsyApiCall(API + '/shops/' + token.shopId + '/listings?legacy=false', env, token, {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}, body: plan.body, action: 'creating a draft'});
    } catch (error) {
      if (!plan.body.has('materials') || !/material/i.test(error.message)) throw error;
      plan.body.delete('materials');
      createdListing = await etsyApiCall(API + '/shops/' + token.shopId + '/listings?legacy=false', env, token, {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}, body: plan.body, action: 'creating a draft'});
    }
    listingId = owned(createdListing?.listing_id);
    created = true;
    sync = remember(sync, work.id, kind, listingId);
    ({record, etag} = await saveIndex(env, record, etag, sync));
  } else {
    owned(listingId);
    const patched = await writeListing(env, token, listingId, plan.body);
    sync = remember(sync, work.id, kind, listingId);
    if (patched?.skipped) sync.listings[work.id].skipped = patched.skipped;
    ({record, etag} = await saveIndex(env, record, etag, sync));
  }
  if (kind === 'print') {
    await etsyApiCall(API + '/listings/' + listingId + '/inventory?legacy=false&max_variations_supported=2', env, token, {method: 'PUT', headers: {'Content-Type': 'application/json; charset=utf-8'}, body: JSON.stringify(plan.inventory), action: 'setting sizes and frame options'});
    const batch = record.etsyDraftBatch;
    if (batch) {
      record = {...record, etsyDraftBatch: {...batch, skuMap: {...batch.skuMap, ...plan.skuMap}}};
      etag = await persistEtsyRecord(env, {...record, etsyListingSync: sync}, etag);
    }
  }
  return {record, etag, sync, listingId, created, title};
}

function money(value) {
  if (typeof value === 'number') return value;
  if (value && Number.isFinite(value.amount) && Number.isFinite(value.divisor) && value.divisor) return value.amount / value.divisor;
  return null;
}

export async function etsyListingAdmin(request, env, session, now = Date.now()) {
  const path = new URL(request.url).pathname;
  if (new URL(request.url).origin !== ETSY_ORIGIN) throw Error('Not found');
  let {record, etag, token} = session;
  if (path === '/etsy/listings/media') return uploadMedia(request, env, record, etag, token);
  let input; try { input = await request.json(); } catch { throw Error('Choose the El Zonte paintings to sync.'); }
  if (path === '/etsy/listings/reconcile') {
    const {reconcileOriginals} = await import('./etsy-original-sync.mjs');
    return reconcileOriginals(env, token, record, {dryRun: input.dryRun !== false});
  }
  const works = requested(input);
  if (path === '/etsy/listings/verify') return verify(env, token, record, works, input.kind);
  const kind = kindOf(input);
  if (path === '/etsy/listings/activate') return activate(env, token, record, works, kind);
  const setup = await shopSetup(env, token);
  let sync = indexOf(record);
  const results = [];
  for (const work of works) {
    const saved = await ensureListing(env, token, record, etag, sync, work, kind, setup);
    record = saved.record; etag = saved.etag; sync = saved.sync;
    results.push({id: work.id, kind, listingId: saved.listingId, created: saved.created, title: saved.title, state: 'draft'});
  }
  return {sourceVersion: syncSourceVersion, results};
}

async function uploadMedia(request, env, record, etag, token) {
  let form; try { form = await request.formData(); } catch { throw Error('Upload an image or the listing video.'); }
  const work = workById(String(form.get('productId') || ''));
  const kind = kindOf({kind: String(form.get('kind') || '')});
  const op = String(form.get('op') || 'image');
  const sync = indexOf(record);
  const listingId = owned(sync.listings?.[work.id]?.[kind] || (kind === 'print' ? EXISTING_PRINT_LISTINGS[work.id] : null));
  if (op === 'prune') {
    const images = rows(await etsyApiCall(API + '/listings/' + listingId + '/images', env, token, {action: 'reading listing images'}));
    let removed = 0;
    for (const image of images) if (Number(image.rank) > 4 && image.listing_image_id) {
      await etsyApiCall(API + '/shops/' + token.shopId + '/listings/' + listingId + '/images/' + image.listing_image_id, env, token, {method: 'DELETE', action: 'removing an extra image'});
      removed += 1;
    }
    return {id: work.id, kind, listingId, removed};
  }
  if (op === 'drop-inactive-video') {
    const {dropInactiveVideo} = await import('./etsy-original-sync.mjs');
    return {id: work.id, kind, listingId, ...await dropInactiveVideo(env, token, listingId)};
  }
  if (op === 'video') {
    const existing = await etsyApiCall(API + '/listings/' + listingId + '/videos', env, token, {action: 'reading listing video'}).catch(error => error.etsyStatus === 404 ? {results: []} : Promise.reject(error));
    if (rows(existing).some(video => !video.video_state || video.video_state === 'active')) return {id: work.id, kind, listingId, video: 'already attached'};
    const file = form.get('file');
    if (!file || typeof file.arrayBuffer !== 'function' || file.size <= 0 || file.size > 20 * 1024 * 1024) throw Error('The listing video must be a file under 20 MB.');
    const upload = new FormData();
    upload.set('video', new Blob([await file.arrayBuffer()], {type: 'video/mp4'}), 'etsy-video-15s.mp4');
    upload.set('name', 'etsy-video-15s.mp4');
    await etsyApiCall(API + '/shops/' + token.shopId + '/listings/' + listingId + '/videos', env, token, {method: 'POST', body: upload, timeout: 60000, action: 'uploading a listing video'});
    return {id: work.id, kind, listingId, video: 'uploaded'};
  }
  const slot = String(form.get('slot') || '');
  const rank = SLOTS[slot];
  if (!rank) throw Error('Choose the painting photo or a living-room shot.');
  const file = form.get('file');
  const type = file?.type || '';
  if (!file || typeof file.arrayBuffer !== 'function' || !['image/jpeg', 'image/png'].includes(type) || file.size <= 0 || file.size > 8 * 1024 * 1024) throw Error('Each listing image must be a JPEG or PNG under 8 MB.');
  const upload = new FormData();
  upload.set('image', new Blob([await file.arrayBuffer()], {type}), work.id + '-' + slot + (type === 'image/jpeg' ? '.jpg' : '.png'));
  upload.set('rank', String(rank));
  upload.set('overwrite', 'true');
  upload.set('alt_text', Array.from(slot === 'painting' ? work.image.alt : work.title + ' hanging with the other El Zonte paintings in a living room').slice(0, 250).join(''));
  await etsyApiCall(API + '/shops/' + token.shopId + '/listings/' + listingId + '/images', env, token, {method: 'POST', body: upload, action: 'uploading artwork'});
  if (!sync.listings?.[work.id]?.[kind]) ({record, etag} = await saveIndex(env, record, etag, remember(sync, work.id, kind, listingId)));
  return {id: work.id, kind, listingId, rank};
}

async function activate(env, token, record, works, kind) {
  const sync = indexOf(record);
  const results = [];
  for (const work of works) {
    const listingId = owned(sync.listings?.[work.id]?.[kind] || (kind === 'print' ? EXISTING_PRINT_LISTINGS[work.id] : null));
    const body = new URLSearchParams();
    body.set('state', 'active');
    if (kind === 'original') body.set('quantity', '1');
    const publish = payload => etsyApiCall(API + '/shops/' + token.shopId + '/listings/' + listingId, env, token, {method: 'PATCH', headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}, body: payload, action: 'publishing a listing'});
    try { await publish(body); }
    catch (error) {
      if (kind !== 'original' || !body.has('quantity') || !/quantity/i.test(error.message || '')) throw error;
      body.delete('quantity');
      await publish(body);
    }
    const listing = await readListing(env, token, listingId);
    results.push({id: work.id, kind, listingId, state: listing?.state || null, url: listing?.url || 'https://www.etsy.com/listing/' + listingId});
  }
  return {results};
}

async function verify(env, token, record, works, kindFilter) {
  const sync = indexOf(record);
  const kinds = kindFilter === 'print' || kindFilter === 'original' ? [kindFilter] : ['print', 'original'];
  const results = [];
  for (const work of works) for (const kind of kinds) {
    const listingId = sync.listings?.[work.id]?.[kind] || (kind === 'print' ? EXISTING_PRINT_LISTINGS[work.id] : null);
    if (!listingId) { results.push({id: work.id, kind, listingId: null, state: 'missing'}); continue; }
    owned(listingId);
    const listing = await readListing(env, token, listingId);
    const images = rows(await etsyApiCall(API + '/listings/' + listingId + '/images', env, token, {action: 'reading listing images'}).catch(error => error.etsyStatus === 404 ? {results: []} : Promise.reject(error)));
    const videos = rows(await etsyApiCall(API + '/listings/' + listingId + '/videos', env, token, {action: 'reading listing video'}).catch(error => error.etsyStatus === 404 ? {results: []} : Promise.reject(error)));
    let prices = [];
    if (kind === 'print') {
      const inventory = await etsyApiCall(API + '/listings/' + listingId + '/inventory?legacy=false', env, token, {action: 'reading listing prices'}).catch(() => null);
      prices = rows(inventory?.products ? {results: inventory.products} : inventory).flatMap(product => (product.offerings || []).map(offering => money(offering.price))).filter(price => price > 0);
    }
    results.push({
      id: work.id, kind, listingId: Number(listingId), title: listing?.title || null, state: listing?.state || null,
      url: listing?.url || (listing ? 'https://www.etsy.com/listing/' + listingId : null),
      price: money(listing?.price), quantity: listing?.quantity ?? null,
      prices: prices.length ? [Math.min(...prices), Math.max(...prices)] : [],
      images: images.length, imageRanks: images.map(image => image.rank).sort((a, b) => a - b),
      video: videos.some(video => !['deleted','flagged'].includes(video.video_state)), videoState: videos.map(video => video.video_state || 'active')
    });
  }
  return {results};
}
