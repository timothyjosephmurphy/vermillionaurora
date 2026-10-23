// Marketplace planner and runner. NOTHING here is wired to the Worker's cron or routes (phase 1).
//
// Safety model:
//  * Dry-run is the default. It builds UNSIGNED templates and never calls the signer or reads the key.
//  * Publishing needs MARKET_PUBLISH_ENABLED=true AND MARKET_MODE=publish AND a per-product approval
//    (MARKET_APPROVED_IDS). The kind 0 profile also needs MARKET_PROFILE_APPROVED=true.
//  * The key is only ever reached through an injected `getKey()` that the signer calls lazily.
import { finalizeEvent, getPublicKey } from 'nostr-tools/pure';
import { SimplePool } from 'nostr-tools/pool';
import { MARKET_PUBKEY, MARKET_RELAYS, MARKET_SHIPPING, MODE_DRY_RUN, MODE_PUBLISH } from './market-config.mjs';
import {
  KIND_LISTING, KIND_PROFILE, KIND_SHIPPING, buildProfileTemplate, contentHash, ineligibleReason,
  listingId, mapListing, mapShippingOptions
} from './market-listing.mjs';

export function marketSettings(env = {}) {
  const enabled = env.MARKET_PUBLISH_ENABLED === 'true';
  const mode = env.MARKET_MODE === MODE_PUBLISH ? MODE_PUBLISH : MODE_DRY_RUN;
  return {
    enabled,
    mode,
    publishLive: enabled && mode === MODE_PUBLISH,
    approved: new Set(String(env.MARKET_APPROVED_IDS || '').split(',').map((id) => id.trim()).filter(Boolean)),
    profileApproved: env.MARKET_PROFILE_APPROVED === 'true',
    relays: String(env.MARKET_RELAYS || '').split(',').map((r) => r.trim()).filter(Boolean)
  };
}

const listingKey = (productId) => `market:listing:${productId}`;
const shippingKey = (d) => `market:ship:${d}`;
const PROFILE_KEY = 'market:profile';

/**
 * Decide what would be published. Pure apart from reading `store` (get only).
 * products: catalog products. live: { [productId]: 'available'|'reserved'|'sold'|'unavailable' }.
 * categories: { [productId]: [labels] }. previewIds: build templates for these even if unapproved (dry-run display only).
 */
export async function planMarket({ settings, products, live = {}, categories = {}, store, now = Date.now(), previewIds = [] }) {
  const nowS = Math.floor(now / 1000);
  const items = [];
  let anyPublish = false;
  for (const product of products) {
    const approved = settings.approved.has(product.id);
    const preview = previewIds.includes(product.id);
    if (!approved && !preview) continue;     // unapproved products are not even mapped
    const reason = ineligibleReason(product);
    if (reason) { items.push({ productId: product.id, action: 'skip-ineligible', reason }); continue; }
    const state = (await store?.get(listingKey(product.id))) || null;
    const template = mapListing(product, {
      now: nowS, publishedAt: state?.publishedAt, prevCreatedAt: state?.createdAt, live: live[product.id], categories: categories[product.id]
    });
    const hash = await contentHash(template);
    let action = 'publish';
    if (!approved) action = 'preview-only';
    else if (state?.hash === hash) action = 'skip-unchanged';
    if (action === 'publish') anyPublish = true;
    items.push({ productId: product.id, d: listingId(product.id), action, hash, template });
  }
  const shipping = [];
  if (anyPublish || previewIds.length) {
    const prevCreatedAt = {};
    const prev = {};
    for (const d of Object.values(MARKET_SHIPPING).filter((t) => t?.id).map((t) => t.id)) {
      prev[d] = (await store?.get(shippingKey(d))) || null;
      prevCreatedAt[d] = prev[d]?.createdAt;
    }
    const templates = mapShippingOptions({ now: nowS, prevCreatedAt });
    for (const template of templates) {
      const d = template.tags[0][1];
      const hash = await contentHash(template);
      shipping.push({ d, action: !anyPublish ? 'preview-only' : (prev[d]?.hash === hash ? 'skip-unchanged' : 'publish'), hash, template });
    }
  }
  return { mode: settings.publishLive ? MODE_PUBLISH : MODE_DRY_RUN, items, shipping };
}

/** Signer with a kind allow-list and a pubkey check. The key is read lazily, on the first signature only. */
export function makeSigner({ getKey, expectedPubkey = MARKET_PUBKEY, profileApproved = false }) {
  let key;
  return async function signTemplate(template) {
    const allowed = [KIND_LISTING, KIND_SHIPPING, ...(profileApproved ? [KIND_PROFILE] : [])];
    if (!allowed.includes(template.kind)) throw new Error(`Kind ${template.kind} is not allowed to be signed`);
    key ??= await getKey();
    if (getPublicKey(key) !== expectedPubkey) throw new Error('Signing key does not match the expected marketplace pubkey');
    return finalizeEvent({ kind: template.kind, created_at: template.created_at, tags: template.tags, content: template.content }, key);
  };
}

/** Publish to relays; resolves with the first relay that accepts (the publisher's Promise.any pattern). */
export function makePoolPublisher(relays = MARKET_RELAYS) {
  const pool = new SimplePool();
  const publish = (event) => Promise.any(pool.publish(relays, event).map((result, i) => result.then(() => relays[i])));
  publish.close = () => pool.close(relays);
  return publish;
}

async function sendOne({ store, stateKey, pendingKey, template, hash, now, signTemplate, publish, log }) {
  const leaseKey = `${stateKey}:lease`;
  const acquired = await store.transaction?.(async (txn) => {
    const until = await txn.get(leaseKey);
    if (until && until > now) return false;
    await txn.put(leaseKey, now + 5 * 60_000);
    return true;
  }) ?? true;
  if (!acquired) return { status: 'leased' };
  try {
    // Persist the signed event before any network I/O so a retry reuses the same id and timestamp.
    let event = await store.get(pendingKey);
    if (!event || event.hash !== hash) {
      const signed = await signTemplate(template);
      event = { hash, event: signed };
      await store.put(pendingKey, event);
    }
    const relay = await publish(event.event);
    const previous = await store.get(stateKey);
    await store.put(stateKey, {
      eventId: event.event.id, hash, createdAt: event.event.created_at, relay, acceptedAt: now,
      publishedAt: previous?.publishedAt ?? (Number((template.tags.find((t) => t[0] === 'published_at') || [])[1]) || undefined)
    });
    await store.delete(pendingKey);
    log?.({ kind: template.kind, eventId: event.event.id, status: 'published' });
    return { status: 'published', eventId: event.event.id };
  } catch (error) {
    log?.({ kind: template.kind, status: 'publish-failed', message: String(error?.message || error) });
    return { status: 'failed' };
  } finally {
    await store.delete(leaseKey);
  }
}

/**
 * Plan, then (only if every gate is open) sign and publish approved items.
 * deps: { signTemplate, publish, store, log }. In dry-run neither signTemplate nor publish is ever called.
 */
export async function runMarket({ env, products, live, categories, previewIds, now = Date.now(), deps = {}, shippingConfig = MARKET_SHIPPING }) {
  const settings = marketSettings(env);
  const plan = await planMarket({ settings, products, live, categories, store: deps.store, now, previewIds });
  if (!settings.publishLive) {
    return { mode: MODE_DRY_RUN, unsigned: [...plan.shipping, ...plan.items].filter((i) => i.template).map((i) => i.template), plan, published: 0 };
  }
  if (!deps.signTemplate || !deps.publish || !deps.store) throw new Error('Live marketplace publishing needs signTemplate, publish and store');
  // Placeholder shipping numbers must never go public. TJ sets MARKET_SHIPPING.placeholder to false with real rates.
  if (shippingConfig.placeholder) return { mode: MODE_DRY_RUN, blocked: 'placeholder-shipping', plan, published: 0 };
  let published = 0;
  // Shipping options first, so a listing never points at a missing 30406.
  for (const item of plan.shipping.filter((s) => s.action === 'publish')) {
    const result = await sendOne({ store: deps.store, stateKey: shippingKey(item.d), pendingKey: `market:pending:${item.d}`, template: item.template, hash: item.hash, now, signTemplate: deps.signTemplate, publish: deps.publish, log: deps.log });
    if (result.status === 'published') published += 1;
  }
  for (const item of plan.items.filter((i) => i.action === 'publish')) {
    const result = await sendOne({ store: deps.store, stateKey: listingKey(item.productId), pendingKey: `market:pending:${item.productId}`, template: item.template, hash: item.hash, now, signTemplate: deps.signTemplate, publish: deps.publish, log: deps.log });
    if (result.status === 'published') published += 1;
  }
  return { mode: MODE_PUBLISH, plan, published };
}

/**
 * Kind 0 profile update: merge into `current` (caller supplies the latest profile content from a relay read).
 * Needs publishLive AND MARKET_PROFILE_APPROVED. Dry-run returns the unsigned template only.
 */
export async function runProfile({ env, current, now = Date.now(), deps = {}, allowBlank = false }) {
  const settings = marketSettings(env);
  const prev = await deps.store?.get(PROFILE_KEY);
  const template = buildProfileTemplate({ current, now: Math.floor(now / 1000), prevCreatedAt: prev?.createdAt, allowBlank });
  if (!template) return { mode: settings.mode, status: 'needs-current-profile', template: null };
  if (!settings.publishLive || !settings.profileApproved) {
    return { mode: MODE_DRY_RUN, status: settings.publishLive ? 'profile-not-approved' : 'dry-run', template };
  }
  if (!deps.signTemplate || !deps.publish || !deps.store) throw new Error('Live profile publishing needs signTemplate, publish and store');
  const hash = await contentHash(template);
  if (prev?.hash === hash) return { mode: MODE_PUBLISH, status: 'unchanged', template };
  const result = await sendOne({ store: deps.store, stateKey: PROFILE_KEY, pendingKey: 'market:pending:profile', template, hash, now, signTemplate: deps.signTemplate, publish: deps.publish, log: deps.log });
  return { mode: MODE_PUBLISH, status: result.status, template };
}
