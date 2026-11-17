// Shared owner email alerts (Gmail via the existing sellerMailToken path).
// Used for sync, auth, and FinerWorks price-mismatch notices. Dedupes by key.
import {sellerMailToken} from './shipping-email.mjs';

export const OWNER_ALERT_EMAIL = 'tj@vermillionaurora.com';
const STATE_KEY = 'alerts/owner-alerts.json';
const DEFAULT_TTL_MS = 6 * 3600_000;
// Soft dedupe across isolates in this Worker process; R2 is the durable store.
const recentAlerts = new Map();

async function loadState(env) {
  if (!env?.COMMISSION_UPLOADS) return {state: {alerts: {}}, etag: null};
  const object = await env.COMMISSION_UPLOADS.get(STATE_KEY);
  if (!object) return {state: {alerts: {}}, etag: null};
  const state = await object.json();
  state.alerts ||= {};
  return {state, etag: object.etag};
}

async function saveState(env, state, etag) {
  if (!env?.COMMISSION_UPLOADS) return;
  const body = JSON.stringify({alerts: state.alerts, updatedAt: new Date().toISOString()});
  await env.COMMISSION_UPLOADS.put(STATE_KEY, body, {
    onlyIf: etag ? {etagMatches: etag} : {etagDoesNotMatch: '*'},
    httpMetadata: {contentType: 'application/json'},
  }).catch(() => {});
}

export async function alertOwner(env, key, subject, text, {ttlMs = DEFAULT_TTL_MS, state} = {}) {
  const alertKey = String(key || subject).slice(0, 160);
  const memoryAt = recentAlerts.get(alertKey);
  if (memoryAt && Date.now() - memoryAt < ttlMs) return {sent: false, throttled: true};
  let loaded = null;
  if (!state) {
    loaded = await loadState(env);
    state = loaded.state;
  }
  const alerts = state.alerts || (state.alerts = {});
  if (alerts[alertKey] && Date.now() - alerts[alertKey] < ttlMs) {
    recentAlerts.set(alertKey, alerts[alertKey]);
    return {sent: false, throttled: true};
  }
  alerts[alertKey] = Date.now();
  recentAlerts.set(alertKey, alerts[alertKey]);
  try {
    const token = await sellerMailToken(env);
    const encode = value => {
      let s = '';
      for (const b of new TextEncoder().encode(value)) s += String.fromCharCode(b);
      return btoa(s);
    };
    const prefix = env.CHECKOUT_MODE === 'sandbox' ? '[TEST] ' : '';
    const mime = [
      `From: Vermillion Aurora Productions <${OWNER_ALERT_EMAIL}>`,
      `To: ${OWNER_ALERT_EMAIL}`,
      `Subject: =?UTF-8?B?${encode(prefix + subject)}?=`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      encode(text),
    ].join('\r\n');
    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      signal: AbortSignal.timeout(20000),
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({raw: encode(mime).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}),
    });
    if (!response.ok) throw Error(`Gmail HTTP ${response.status}`);
    if (loaded) await saveState(env, state, loaded.etag);
    console.error('Owner alert emailed:', subject);
    return {sent: true};
  } catch (error) {
    console.error('Owner alert failed:', subject, error.message || error);
    return {sent: false, error: error.message || 'alert failed'};
  }
}

export async function alertFinerWorksPriceMismatch(env, mismatch) {
  const code = mismatch.productCode || mismatch.sku || 'unknown';
  console.error(JSON.stringify({
    event: 'finerworks_price_mismatch',
    productCode: code,
    id: mismatch.id || null,
    storedAmount: mismatch.storedAmount ?? null,
    storedCost: mismatch.storedCost ?? null,
    liveCost: mismatch.liveCost ?? null,
    correctedAmount: mismatch.amount ?? null,
    status: mismatch.status,
  }));
  const lines = [
    `FinerWorks live manufacturing cost no longer matches the saved catalog price for ${code}.`,
    '',
    `Product code: ${code}`,
    mismatch.id ? `Cart line: ${mismatch.id}` : null,
    mismatch.title ? `Title: ${mismatch.title}` : null,
    `Stored retail: ${mismatch.storedAmount ?? 'n/a'}`,
    `Stored supplier cost: ${mismatch.storedCost ?? 'n/a (unframed uses retail rule)'}`,
    `Live supplier cost: ${mismatch.liveCost ?? 'n/a'}`,
    `Corrected retail: ${mismatch.amount ?? 'n/a'}`,
    `Checkout action: ${mismatch.status}`,
    '',
    'No wrong price was charged. Checkout either asked the buyer to confirm a corrected price or blocked the size.',
  ].filter(Boolean);
  return alertOwner(env, `finerworks-price:${code}`, `FinerWorks price mismatch — ${code}`, lines.join('\n'));
}
