// Minimal R2 (S3 API) client: SigV4-signed PUT/HEAD/list with node:crypto, no dependencies.
// Credentials come from R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY; never log them.
import { createHash, createHmac } from 'node:crypto';
export const R2_ACCOUNT = process.env.R2_ACCOUNT_ID || '3c1fddf0f4f4fc9c84594757d2e1bda0';
export const R2_BUCKET = process.env.R2_IMAGE_BUCKET || 'tjm-images';
export { IMAGE_ORIGIN } from './image-keys.mjs';
// Names are hashed, but swap-image.mjs replaces pictures in place under the same key and purges
// the edge. So the edge keeps objects a year (s-maxage) while browsers revalidate daily; a true
// "immutable" would pin a swapped picture in visitors' browsers for a year.
export const CACHE_IMAGES = 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800';
const host = `${R2_ACCOUNT}.r2.cloudflarestorage.com`;
const sha = d => createHash('sha256').update(d).digest('hex');
const hmac = (k, d) => createHmac('sha256', k).update(d).digest();
const enc = s => encodeURIComponent(s).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
async function r2(method, key = '', { body = '', headers = {}, query = {} } = {}) {
  const id = process.env.R2_ACCESS_KEY_ID, secret = process.env.R2_SECRET_ACCESS_KEY;
  if (!id || !secret) throw new Error('R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY not set');
  const now = new Date().toISOString().replace(/[-:]|\.\d{3}/g, ''), day = now.slice(0, 8);
  const path = `/${R2_BUCKET}/${key.split('/').map(enc).join('/')}`;
  const qs = Object.keys(query).sort().map(k => `${enc(k)}=${enc(query[k])}`).join('&');
  const h = { host, 'x-amz-date': now, 'x-amz-content-sha256': sha(body), ...Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])) };
  const names = Object.keys(h).sort();
  const creq = [method, path, qs, names.map(n => `${n}:${String(h[n]).trim()}\n`).join(''), names.join(';'), h['x-amz-content-sha256']].join('\n');
  const scope = `${day}/auto/s3/aws4_request`;
  const sts = ['AWS4-HMAC-SHA256', now, scope, sha(creq)].join('\n');
  const key4 = ['auto', 's3', 'aws4_request'].reduce((k, d) => hmac(k, d), hmac('AWS4' + secret, day));
  h.authorization = `AWS4-HMAC-SHA256 Credential=${id}/${scope}, SignedHeaders=${names.join(';')}, Signature=${createHmac('sha256', key4).update(sts).digest('hex')}`;
  delete h.host;
  const res = await fetch(`https://${host}${path}${qs ? '?' + qs : ''}`, { method, headers: h, body: method === 'PUT' ? body : undefined });
  if (!res.ok && !(method === 'HEAD' && res.status === 404)) throw new Error(`R2 ${method} ${key}: ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res;
}
export const contentType = k => ({ webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', avif: 'image/avif' })[k.split('.').pop().toLowerCase()] || 'application/octet-stream';
export const putObject = (key, body, cacheControl = CACHE_IMAGES) => r2('PUT', key, { body, headers: { 'content-type': contentType(key), 'cache-control': cacheControl } });
export const headObject = async key => { const r = await r2('HEAD', key); return r.status === 404 ? null : { size: +r.headers.get('content-length'), etag: r.headers.get('etag') }; };
export async function listKeys(prefix) {
  const out = new Map(); let token;
  do {
    const xml = await (await r2('GET', '', { query: { 'list-type': '2', prefix, ...(token ? { 'continuation-token': token } : {}) } })).text();
    for (const m of xml.matchAll(/<Contents>[^]*?<Key>([^<]+)<\/Key>[^]*?<Size>(\d+)<\/Size>[^]*?<\/Contents>/g)) out.set(m[1].replace(/&amp;/g, '&'), +m[2]);
    token = xml.match(/<NextContinuationToken>([^<]+)</)?.[1];
  } while (token);
  return out;
}
