// BTCPay Greenfield API. Credentials remain in Worker secrets.
export const SITE = 'https://vermillionaurora.com';
export const ORDER = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
export function bitcoinServer(env) {
  const url = new URL(env.BTCPAY_URL);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw Error('Invalid BTCPay URL');
  return url.origin;
}
export function bitcoinConfigured(env) {
  try { bitcoinServer(env); } catch { return false; }
  return !!(env.BTCPAY_API_KEY && env.BTCPAY_STORE_ID && env.BTCPAY_WEBHOOK_SECRET && env.BITCOIN_ORDERS &&
    env.PAINTING_STOCK && env.SALES_LEDGER && env.SALES_ARCHIVE &&
    env.SHIPPO_TOKEN && env.STRIPE_SECRET_KEY && env.SHIP_FROM_STREET && env.PAYPAL_MODE === 'live');
}
export const bitcoinOffered = (env,slug) => env.BTCPAY_CHECKOUT_ENABLED === 'true' && bitcoinConfigured(env) &&
  !!env.BTCPAY_CHECKOUT_SLUGS?.split(',').map(s=>s.trim()).includes(slug);
export async function bitcoinApi(env,path,body) {
  const response = await fetch(`${bitcoinServer(env)}/api/v1/stores/${encodeURIComponent(env.BTCPAY_STORE_ID)}${path}`,{
    // Workers rejects redirect:'error' before sending the request. Manual mode
    // leaves redirects as non-OK responses without forwarding credentials.
    method:body === undefined ? 'GET' : 'POST',redirect:'manual',signal:AbortSignal.timeout(20_000),
    headers:{Authorization:`token ${env.BTCPAY_API_KEY}`,'Content-Type':'application/json'},
    body:body === undefined ? undefined : JSON.stringify(body)
  });
  if (!response.ok) throw Error(`BTCPay API ${response.status}`);
  return response.json();
}
export function checkoutUrl(env,value) {
  const url = new URL(value);
  if (url.origin !== bitcoinServer(env) || url.username || url.password) throw Error('Unexpected Bitcoin checkout URL');
  return url.href;
}
export async function validBitcoinSignature(raw,signature,secret) {
  if (!/^sha256=[a-f0-9]{64}$/i.test(signature || '') || !secret) return false;
  const key = await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['verify']);
  const bytes = Uint8Array.from(signature.slice(7).match(/../g),x=>parseInt(x,16));
  return crypto.subtle.verify('HMAC',key,bytes,new TextEncoder().encode(raw));
}
