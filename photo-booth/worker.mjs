// studio-tracker #311: photo booth backend Worker (DRAFT, not deployed, not wired into the site Worker).
// Bindings (placeholders in wrangler.draft.jsonc): PHOTOS (R2), DB (D1), secret BOOTH_ADMIN_PASSWORD.
// Visibility: the visitor who took a photo sees it at once (owner token); everyone else sees it only after TJ approves it.
import { FRAME, LIMITS, expiresAt } from './config.mjs';

const enc = new TextEncoder();
const COOKIE = '__Host-booth-admin';
const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const TOKEN = /^[0-9a-f]{64}$/;
const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
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

// Owner-only approval: the same pattern as /catalog-admin/ (worker/catalog-admin.mjs): a Worker-secret password,
// a 12-hour signed HttpOnly cookie after login, or "Authorization: Bearer <password>" for scripts; no secret = closed.
export async function adminAuthed(request, env) {
  const secret = env.BOOTH_ADMIN_PASSWORD; if (!secret) return false;
  const bearer = request.headers.get('Authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (bearer) return same(bearer, secret);
  const c = (request.headers.get('Cookie') || '').split(/;\s*/).find((x) => x.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  const [exp, sig] = (c || '').split('.');
  return !!exp && Number(exp) > Date.now() && same(sig || '', await hmac(secret, 'booth-admin:' + exp));
}

// "id.token" pairs from X-Booth-Owner (or a single ?t= token for one image). Returns the ids whose token matches.
async function ownedIds(db, pairs) {
  const ok = new Map();
  for (const pair of pairs.slice(0, LIMITS.OWNER_TOKENS_MAX)) {
    const [id, token] = pair.trim().split('.');
    if (!ID.test(id || '') || !TOKEN.test(token || '')) continue;
    const row = await db.prepare('SELECT owner_hash FROM photos WHERE id = ?').bind(id).first();
    if (row && await same(row.owner_hash, await sha256(token))) ok.set(id, token);
  }
  return ok;
}
const live = (now) => '(expires_at IS NULL OR expires_at > ' + Number(now) + ')';
const publicItem = (r, token) => ({ id: r.id, url: `/booth/photos/${r.id}` + (token ? `?t=${token}` : ''), createdAt: r.created_at, frame: r.frame, ...(token ? { mine: true, status: r.status, expiresAt: r.expires_at } : {}) });

async function upload(request, env, now) {
  const form = await request.formData().catch(() => null);
  const file = form?.get('photo');
  if (!file || typeof file === 'string') return json({ error: 'Send the photo as the "photo" field.' }, 400);
  const ext = LIMITS.CONTENT_TYPES[file.type];
  if (!ext) return json({ error: 'Photos must be JPEG, WebP or PNG.' }, 415);
  if (file.size > LIMITS.MAX_PHOTO_BYTES) return json({ error: 'That photo is too large.' }, 413);
  const consent = form.get('consent') === 'yes';
  const frame = String(form.get('frame') || 'none');
  if (!FRAME.options.includes(frame) || (!FRAME.enabled && frame !== 'none')) return json({ error: 'Unknown frame.' }, 400);
  const id = crypto.randomUUID(), token = hex(crypto.getRandomValues(new Uint8Array(32)));
  await env.PHOTOS.put(`photos/${id}`, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  await env.DB.prepare('INSERT INTO photos (id, owner_hash, status, consent_keep, frame, content_type, bytes, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(id, await sha256(token), 'pending', consent ? 1 : 0, frame, file.type, file.size, now, expiresAt(consent, now)).run();
  // The visitor keeps owner = `${id}.${token}`; the delete link is DELETE /booth/api/photos/<id> with that header.
  return json({ id, owner: `${id}.${token}`, status: 'pending', url: `/booth/photos/${id}?t=${token}`, expiresAt: expiresAt(consent, now) }, 201);
}

async function wall(request, env, now) {
  const db = env.DB;
  const rows = (await db.prepare(`SELECT * FROM photos WHERE status = 'approved' AND ${live(now)} ORDER BY created_at DESC LIMIT ?`).bind(LIMITS.WALL_CAP).all()).results;
  const mine = await ownedIds(db, (request.headers.get('X-Booth-Owner') || '').split(',').filter(Boolean));
  const items = new Map(rows.map((r) => [r.id, publicItem(r, mine.get(r.id))]));
  for (const [id, token] of mine) {
    const r = await db.prepare(`SELECT * FROM photos WHERE id = ? AND status IN ('pending','approved') AND ${live(now)}`).bind(id).first();
    if (r) items.set(id, publicItem(r, token));
  }
  return json({ photos: [...items.values()].sort((a, b) => b.createdAt - a.createdAt) });
}

async function image(request, env, id, now) {
  const row = await env.DB.prepare('SELECT * FROM photos WHERE id = ?').bind(id).first();
  const url = new URL(request.url);
  const admin = await adminAuthed(request, env);
  const owner = (await ownedIds(env.DB, [`${id}.${url.searchParams.get('t') || ''}`])).has(id);
  const isLive = row && (row.expires_at == null || row.expires_at > now);
  const visible = isLive && (row.status === 'approved' || ((owner || admin) && row.status === 'pending'));
  if (!visible) return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  const obj = await env.PHOTOS.get(`photos/${id}`);
  if (!obj) return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  const shared = row.status === 'approved' && !owner && !admin;
  return new Response(obj.body, { headers: { 'Content-Type': row.content_type, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': shared ? 'public, max-age=300' : 'private, no-store' } });
}

async function remove(env, id, status) {
  await env.PHOTOS.delete(`photos/${id}`);
  await env.DB.prepare('UPDATE photos SET status = ? WHERE id = ?').bind(status, id).run();
}

export async function sweepExpired(env, now = Date.now()) {
  const rows = (await env.DB.prepare(`SELECT id FROM photos WHERE expires_at IS NOT NULL AND expires_at <= ? AND status NOT IN ('expired','deleted') LIMIT 500`).bind(now).all()).results;
  for (const { id } of rows) await remove(env, id, 'expired');
  return rows.length;
}

async function admin(request, env, op, now) {
  const url = new URL(request.url);
  if (!env.BOOTH_ADMIN_PASSWORD || !env.DB) return json({ error: 'Photo booth admin is not configured.' }, 503);
  if (request.method !== 'GET' && request.headers.get('Origin') !== url.origin && !request.headers.get('Authorization')) return json({ error: 'Wrong origin.' }, 403);
  if (op === 'login' && request.method === 'POST') {
    const { password } = await request.json().catch(() => ({}));
    if (!password || !await same(password, env.BOOTH_ADMIN_PASSWORD)) { await new Promise((r) => setTimeout(r, 800)); return json({ error: 'Wrong password.' }, 403); }
    const exp = Date.now() + 12 * 3600e3;
    return json({ ok: true }, 200, { 'Set-Cookie': `${COOKIE}=${exp}.${await hmac(env.BOOTH_ADMIN_PASSWORD, 'booth-admin:' + exp)}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=43200` });
  }
  if (op === 'logout') return json({ ok: true }, 200, { 'Set-Cookie': `${COOKIE}=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0` });
  if (!await adminAuthed(request, env)) return json({ error: 'Sign in first.' }, 401);
  if (op === 'queue' && request.method === 'GET') {
    const rows = (await env.DB.prepare(`SELECT * FROM photos WHERE status = 'pending' AND ${live(now)} ORDER BY created_at ASC LIMIT ?`).bind(LIMITS.QUEUE_MAX).all()).results;
    return json({ queue: rows.map((r) => ({ id: r.id, url: `/booth/photos/${r.id}`, createdAt: r.created_at, consentKeep: !!r.consent_keep, frame: r.frame, expiresAt: r.expires_at })) });
  }
  const m = op.match(/^photos\/([^/]+)\/(approve|reject)$/);
  if (m && request.method === 'POST') {
    if (!ID.test(m[1])) return json({ error: 'Not found.' }, 404);
    const status = m[2] === 'approve' ? 'approved' : 'rejected';
    const res = await env.DB.prepare(`UPDATE photos SET status = ?, decided_at = ? WHERE id = ? AND status IN ('pending','approved','rejected') AND ${live(now)}`).bind(status, now, m[1]).run();
    if (!res.meta.changes) return json({ error: 'Not found.' }, 404);
    if (status === 'rejected') await env.PHOTOS.delete(`photos/${m[1]}`);
    return json({ ok: true, id: m[1], status });
  }
  return json({ error: 'Not found.' }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url), path = url.pathname.replace(/\/+$/, '');
    if (!path.startsWith('/booth/')) return new Response('Not found', { status: 404 });
    if (!env.DB || !env.PHOTOS) return json({ error: 'Photo booth is not configured.' }, 503);
    const now = Date.now(), m = request.method;
    try {
      if (path === '/booth/api/photos' && m === 'POST') return await upload(request, env, now);
      if (path === '/booth/api/wall' && m === 'GET') return await wall(request, env, now);
      const del = path.match(/^\/booth\/api\/photos\/([^/]+)$/);
      if (del && m === 'DELETE') {
        if (!ID.test(del[1])) return json({ error: 'Not found.' }, 404);
        const owns = (await ownedIds(env.DB, (request.headers.get('X-Booth-Owner') || '').split(','))).has(del[1]);
        if (!owns && !await adminAuthed(request, env)) return json({ error: 'Not found.' }, 404);
        await remove(env, del[1], 'deleted');
        return json({ ok: true });
      }
      const img = path.match(/^\/booth\/photos\/([^/]+)$/);
      if (img && m === 'GET') return ID.test(img[1]) ? await image(request, env, img[1], now) : new Response('Not found', { status: 404 });
      if (path.startsWith('/booth/api/admin/')) return await admin(request, env, path.slice('/booth/api/admin/'.length), now);
    } catch (err) {
      return json({ error: 'Something went wrong.' }, 500);
    }
    return json({ error: 'Not found.' }, 404);
  },
  async scheduled(event, env) { await sweepExpired(env); },
};
