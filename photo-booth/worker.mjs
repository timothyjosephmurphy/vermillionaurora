// studio-tracker #311: photo booth backend Worker (DRAFT, not deployed, not wired into the site Worker).
// Bindings (placeholders in wrangler.draft.jsonc): PHOTOS (R2), DB (D1), AI (Workers AI), secret CATALOG_ADMIN_PASSWORD (shared with /catalog-admin/).
// Flow: consent is required (no consent = nothing stored) -> content filter -> pass: published at once, no approval queue;
// filter says no / unsure / errors: held privately, visible only to the admin tool. Consenting photos never expire.
import { LIMITS, FILTER } from './config.mjs';
import { moderate } from './moderation.mjs';

const enc = new TextEncoder();
const COOKIE = '__Host-catalog-admin';   // same cookie and signing string as worker/catalog-admin.mjs: one sign-in covers both
const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const TOKEN = /^[0-9a-f]{64}$/;
const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
const notFound = () => new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const sha256 = async (s) => hex(await crypto.subtle.digest('SHA-256', enc.encode(s)));
async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}
async function same(a, b) {
  const [x, y] = [new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(String(a)))), new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(String(b))))];
  let diff = 0; for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

// Admin remove tool: the same pattern as /catalog-admin/ (worker/catalog-admin.mjs) and the same secret, CATALOG_ADMIN_PASSWORD:
// a 12-hour signed HttpOnly cookie after login, or "Authorization: Bearer <password>" for scripts; no secret = closed.
export async function adminAuthed(request, env) {
  const secret = env.CATALOG_ADMIN_PASSWORD; if (!secret) return false;
  const bearer = request.headers.get('Authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (bearer) return same(bearer, secret);
  const c = (request.headers.get('Cookie') || '').split(/;\s*/).find((x) => x.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  const [exp, sig] = (c || '').split('.');
  return !!exp && Number(exp) > Date.now() && same(sig || '', await hmac(secret, 'catalog-admin:' + exp));
}

// The visitor's delete link: header "X-Booth-Owner: <id>.<token>".
async function owns(db, id, header) {
  const [hid, token] = String(header || '').trim().split('.');
  if (hid !== id || !TOKEN.test(token || '')) return false;
  const row = await db.prepare('SELECT owner_hash FROM photos WHERE id = ?').bind(id).first();
  return !!row && same(row.owner_hash, await sha256(token));
}

// Stored with a content type taken from the upload, so check the file really is that format.
function looksLike(type, b) {
  const u = new Uint8Array(b.slice(0, 12));
  if (type === 'image/jpeg') return u[0] === 0xff && u[1] === 0xd8 && u[2] === 0xff;
  if (type === 'image/png') return [0x89, 0x50, 0x4e, 0x47].every((v, i) => u[i] === v);
  if (type === 'image/webp') return String.fromCharCode(...u.slice(0, 4)) === 'RIFF' && String.fromCharCode(...u.slice(8, 12)) === 'WEBP';
  return false;
}
const item = (r) => ({ id: r.id, url: `/booth/photos/${r.id}`, createdAt: r.created_at });

async function upload(request, env, now) {
  const form = await request.formData().catch(() => null);
  const file = form?.get('photo');
  if (!file || typeof file === 'string') return json({ error: 'Send the photo as the "photo" field.' }, 400);
  // No consent to keep the photo: it is never uploaded to the wall and never stored (nothing is written anywhere).
  if (form.get('consent') !== 'yes') return json({ error: 'Photos are only posted with your consent to keep them.' }, 422);
  if (!LIMITS.CONTENT_TYPES[file.type]) return json({ error: 'Photos must be JPEG, WebP or PNG.' }, 415);
  if (file.size > LIMITS.MAX_PHOTO_BYTES) return json({ error: 'That photo is too large.' }, 413);
  const bytes = await file.arrayBuffer();
  if (!looksLike(file.type, bytes)) return json({ error: 'That file is not a valid photo.' }, 415);
  const used = await env.DB.prepare('SELECT count(*) AS n FROM photos WHERE created_at > ?').bind(now - 86400e3).first();
  if (used.n >= FILTER.DAILY_MAX) return json({ error: 'The photo wall is busy. Try again later.' }, 503);

  const verdict = await moderate(env, bytes, file.type);   // never throws; failures come back as a hold
  const id = crypto.randomUUID(), token = hex(crypto.getRandomValues(new Uint8Array(32)));
  await env.PHOTOS.put(`photos/${id}`, bytes, { httpMetadata: { contentType: file.type } });
  await env.DB.prepare('INSERT INTO photos (id, owner_hash, status, hold_reason, content_type, bytes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .bind(id, await sha256(token), verdict.publish ? 'published' : 'held', verdict.reason, file.type, file.size, now).run();
  // `owner` is the visitor's delete link credential: DELETE /booth/api/photos/<id> with it in X-Booth-Owner.
  if (verdict.publish) return json({ id, owner: `${id}.${token}`, status: 'published', url: `/booth/photos/${id}` }, 201);
  return json({ id, owner: `${id}.${token}`, status: 'held', message: 'This photo was not posted.' }, 202);
}

async function wall(env) {
  const rows = (await env.DB.prepare(`SELECT * FROM photos WHERE status = 'published' ORDER BY created_at DESC LIMIT ?`).bind(LIMITS.WALL_CAP).all()).results;
  return json({ photos: rows.map(item) }, 200, { 'Cache-Control': 'public, max-age=30' });
}

async function image(request, env, id) {
  const row = await env.DB.prepare('SELECT * FROM photos WHERE id = ?').bind(id).first();
  const admin = !!row && row.status === 'held' && await adminAuthed(request, env);
  if (!row || !(row.status === 'published' || admin)) return notFound();
  const obj = await env.PHOTOS.get(`photos/${id}`);
  if (!obj) return notFound();
  return new Response(obj.body, { headers: { 'Content-Type': row.content_type, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': row.status === 'published' ? 'public, max-age=300' : 'private, no-store' } });
}

async function remove(env, id) {
  await env.PHOTOS.delete(`photos/${id}`);
  const res = await env.DB.prepare(`UPDATE photos SET status = 'removed' WHERE id = ? AND status != 'removed'`).bind(id).run();
  return res.meta.changes > 0;
}

async function admin(request, env, op) {
  const url = new URL(request.url);
  if (!env.CATALOG_ADMIN_PASSWORD) return json({ error: 'Photo booth admin is not configured.' }, 503);
  if (request.method !== 'GET' && request.headers.get('Origin') !== url.origin && !request.headers.get('Authorization')) return json({ error: 'Wrong origin.' }, 403);
  if (op === 'login' && request.method === 'POST') {
    const { password } = await request.json().catch(() => ({}));
    if (!password || !await same(password, env.CATALOG_ADMIN_PASSWORD)) { await new Promise((r) => setTimeout(r, 800)); return json({ error: 'Wrong password.' }, 403); }
    const exp = Date.now() + 12 * 3600e3;
    return json({ ok: true }, 200, { 'Set-Cookie': `${COOKIE}=${exp}.${await hmac(env.CATALOG_ADMIN_PASSWORD, 'catalog-admin:' + exp)}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=43200` });
  }
  if (op === 'logout') return json({ ok: true }, 200, { 'Set-Cookie': `${COOKIE}=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0` });
  if (!await adminAuthed(request, env)) return json({ error: 'Sign in first.' }, 401);
  if (op === 'photos' && request.method === 'GET') {
    const rows = (await env.DB.prepare(`SELECT * FROM photos WHERE status IN ('published','held') ORDER BY created_at DESC LIMIT ?`).bind(LIMITS.ADMIN_LIST_MAX).all()).results;
    return json({ photos: rows.map((r) => ({ ...item(r), status: r.status, holdReason: r.hold_reason })) });
  }
  const m = op.match(/^photos\/([^/]+)\/remove$/);
  if (m && request.method === 'POST' && ID.test(m[1])) return await remove(env, m[1]) ? json({ ok: true, id: m[1], status: 'removed' }) : json({ error: 'Not found.' }, 404);
  return json({ error: 'Not found.' }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url), path = url.pathname.replace(/\/+$/, '');
    if (!path.startsWith('/booth/')) return new Response('Not found', { status: 404 });
    if (!env.DB || !env.PHOTOS) return json({ error: 'Photo booth is not configured.' }, 503);
    const m = request.method;
    try {
      if (path === '/booth/api/photos' && m === 'POST') return await upload(request, env, Date.now());
      if (path === '/booth/api/wall' && m === 'GET') return await wall(env);
      const del = path.match(/^\/booth\/api\/photos\/([^/]+)$/);
      if (del && m === 'DELETE') {
        if (!ID.test(del[1])) return json({ error: 'Not found.' }, 404);
        if (!await owns(env.DB, del[1], request.headers.get('X-Booth-Owner')) && !await adminAuthed(request, env)) return json({ error: 'Not found.' }, 404);
        return await remove(env, del[1]) ? json({ ok: true }) : json({ error: 'Not found.' }, 404);
      }
      const img = path.match(/^\/booth\/photos\/([^/]+)$/);
      if (img && m === 'GET') return ID.test(img[1]) ? await image(request, env, img[1]) : notFound();
      if (path.startsWith('/booth/api/admin/')) return await admin(request, env, path.slice('/booth/api/admin/'.length));
    } catch {
      return json({ error: 'Something went wrong.' }, 500);
    }
    return json({ error: 'Not found.' }, 404);
  },
};
