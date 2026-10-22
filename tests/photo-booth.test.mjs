import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import worker, { sweepExpired } from '../photo-booth/worker.mjs';
import { EXPIRY, FRAME, LIMITS, expiresAt } from '../photo-booth/config.mjs';

const DAY = 86400e3, H = 'https://tjm.art', PASSWORD = 'test-admin-password';
// D1 shim over node:sqlite, running the real migration file.
function d1() {
  const db = new DatabaseSync(':memory:');
  db.exec(fs.readFileSync('photo-booth/migrations/0001_photos.sql', 'utf8'));
  const stmt = (sql, args = []) => ({
    bind: (...a) => stmt(sql, a),
    first: async () => db.prepare(sql).get(...args) ?? null,
    all: async () => ({ results: db.prepare(sql).all(...args) }),
    run: async () => ({ meta: { changes: Number(db.prepare(sql).run(...args).changes) } }),
  });
  return { prepare: (sql) => stmt(sql), raw: db };
}
function r2() {
  const m = new Map();
  return { m, put: async (k, v) => { m.set(k, v); }, get: async (k) => m.has(k) ? { body: m.get(k) } : null, delete: async (k) => { m.delete(k); } };
}
const env = (extra = {}) => ({ DB: d1(), PHOTOS: r2(), BOOTH_ADMIN_PASSWORD: PASSWORD, ...extra });
const bearer = { Authorization: `Bearer ${PASSWORD}` };
const call = (e, path, init = {}) => worker.fetch(new Request(H + path, init), e);
function form(fields = {}, type = 'image/jpeg', size = 100) {
  const f = new FormData();
  f.set('photo', new File([new Uint8Array(size)], 'p.jpg', { type }));
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}
const post = async (e, fields, type, size) => call(e, '/booth/api/photos', { method: 'POST', body: form(fields, type, size) });
const wallIds = async (e, headers = {}) => (await (await call(e, '/booth/api/wall', { headers })).json()).photos.map((p) => p.id);

test('upload stores the bytes in R2 and a pending record in D1, and returns an owner token', async () => {
  const e = env(); const res = await post(e, { consent: 'yes' });
  assert.equal(res.status, 201);
  const body = await res.json();
  assert.equal(body.status, 'pending');
  assert.match(body.owner, /^[0-9a-f-]{36}\.[0-9a-f]{64}$/);
  assert.ok(e.PHOTOS.m.has(`photos/${body.id}`));
  const row = e.DB.raw.prepare('SELECT * FROM photos WHERE id = ?').get(body.id);
  assert.equal(row.status, 'pending'); assert.equal(row.consent_keep, 1);
  assert.ok(!JSON.stringify(row).includes(body.owner.split('.')[1]), 'the token itself is never stored');
});
test('upload rejects wrong type, oversize, missing photo and unknown frames', async () => {
  const e = env();
  assert.equal((await post(e, {}, 'image/gif')).status, 415);
  assert.equal((await post(e, {}, 'image/jpeg', LIMITS.MAX_PHOTO_BYTES + 1)).status, 413);
  assert.equal((await call(e, '/booth/api/photos', { method: 'POST', body: new FormData() })).status, 400);
  assert.equal((await post(e, { frame: 'gold' })).status, 400);
  assert.equal(e.DB.raw.prepare('SELECT count(*) n FROM photos').get().n, 0);
});
test('the frame is an option: off by default, only "none" accepted', async () => {
  assert.equal(FRAME.enabled, false); assert.deepEqual(FRAME.options, ['none']);
  const e = env(); const { id } = await (await post(e, { frame: 'none' })).json();
  assert.equal(e.DB.raw.prepare('SELECT frame FROM photos WHERE id = ?').get(id).frame, 'none');
});
test('the owner sees a new photo at once; everyone else does not until it is approved', async () => {
  const e = env(); const { id, owner } = await (await post(e, {})).json();
  assert.deepEqual(await wallIds(e), []);
  const mine = (await (await call(e, '/booth/api/wall', { headers: { 'X-Booth-Owner': owner } })).json()).photos;
  assert.equal(mine.length, 1); assert.equal(mine[0].mine, true); assert.equal(mine[0].status, 'pending');
  assert.equal((await call(e, mine[0].url)).status, 200);                       // owner can load the image
  assert.equal((await call(e, `/booth/photos/${id}`)).status, 404);              // a stranger cannot
  assert.equal((await call(e, `/booth/photos/${id}?t=${'0'.repeat(64)}`)).status, 404);
  assert.equal((await call(e, '/booth/api/wall', { headers: { 'X-Booth-Owner': `${id}.${'0'.repeat(64)}` } }).then((r) => r.json())).photos.length, 0);
});
test('approval is owner-only: no credentials, wrong password and wrong cookie are all refused', async () => {
  const e = env(); const { id } = await (await post(e, {})).json();
  for (const init of [{}, { headers: { Authorization: 'Bearer nope' } }, { headers: { Cookie: '__Host-booth-admin=9999999999999.abc' } }]) {
    assert.equal((await call(e, '/booth/api/admin/queue', init)).status, 401);
    assert.ok([401, 403].includes((await call(e, `/booth/api/admin/photos/${id}/approve`, { method: 'POST', ...init })).status));
  }
  assert.equal(e.DB.raw.prepare('SELECT status FROM photos WHERE id = ?').get(id).status, 'pending');
  const closed = env({ BOOTH_ADMIN_PASSWORD: undefined });
  assert.equal((await call(closed, '/booth/api/admin/queue', { headers: bearer })).status, 503);
});
test('admin queue lists pending photos, approving makes them public, rejecting removes the image', async () => {
  const e = env();
  const a = await (await post(e, {})).json(); const b = await (await post(e, {})).json();
  const queue = (await (await call(e, '/booth/api/admin/queue', { headers: bearer })).json()).queue;
  assert.deepEqual(queue.map((q) => q.id).sort(), [a.id, b.id].sort());
  assert.equal((await call(e, `/booth/photos/${a.id}`, { headers: bearer })).status, 200); // TJ can preview a pending photo
  assert.equal((await call(e, `/booth/api/admin/photos/${a.id}/approve`, { method: 'POST', headers: bearer })).status, 200);
  assert.deepEqual(await wallIds(e), [a.id]);
  const img = await call(e, `/booth/photos/${a.id}`);
  assert.equal(img.status, 200); assert.match(img.headers.get('Cache-Control'), /public/);
  assert.equal((await call(e, `/booth/api/admin/photos/${b.id}/reject`, { method: 'POST', headers: bearer })).status, 200);
  assert.ok(!e.PHOTOS.m.has(`photos/${b.id}`)); assert.deepEqual(await wallIds(e), [a.id]);
  assert.equal((await call(e, `/booth/api/admin/photos/${crypto.randomUUID()}/approve`, { method: 'POST', headers: bearer })).status, 404);
});
test('login sets a signed cookie that then works for the queue; browser writes need a same-origin Origin', async () => {
  const e = env();
  assert.equal((await call(e, '/booth/api/admin/login', { method: 'POST', headers: { Origin: 'https://evil.example' }, body: JSON.stringify({ password: PASSWORD }) })).status, 403);
  const res = await call(e, '/booth/api/admin/login', { method: 'POST', headers: { Origin: H }, body: JSON.stringify({ password: PASSWORD }) });
  assert.equal(res.status, 200);
  const cookie = res.headers.get('Set-Cookie').split(';')[0];
  assert.match(res.headers.get('Set-Cookie'), /HttpOnly; SameSite=Strict/);
  assert.equal((await call(e, '/booth/api/admin/queue', { headers: { Cookie: cookie } })).status, 200);
  const approve = await post(e, {}).then((r) => r.json());
  assert.equal((await call(e, `/booth/api/admin/photos/${approve.id}/approve`, { method: 'POST', headers: { Cookie: cookie } })).status, 403); // no Origin
});
test('expiry: consent decides the deadline (config constants), null means never', () => {
  const t = 1e12;
  assert.equal(expiresAt(true, t), t + EXPIRY.CONSENTED_TTL_DAYS * DAY);
  assert.equal(expiresAt(false, t), t + EXPIRY.UNCONSENTED_TTL_DAYS * DAY);
  const was = EXPIRY.CONSENTED_TTL_DAYS; EXPIRY.CONSENTED_TTL_DAYS = null;
  assert.equal(expiresAt(true, t), null); EXPIRY.CONSENTED_TTL_DAYS = was;
  assert.match(fs.readFileSync('photo-booth/config.mjs', 'utf8'), /TODO\(#311, OPEN\)/);
});
test('expired photos disappear from the wall and the image route, and the sweep deletes the R2 object', async () => {
  const e = env(); const { id, owner } = await (await post(e, {})).json();
  await call(e, `/booth/api/admin/photos/${id}/approve`, { method: 'POST', headers: bearer });
  assert.deepEqual(await wallIds(e), [id]);
  e.DB.raw.prepare('UPDATE photos SET expires_at = ? WHERE id = ?').run(Date.now() - 1000, id);
  assert.deepEqual(await wallIds(e), []);
  assert.deepEqual(await wallIds(e, { 'X-Booth-Owner': owner }), []);
  assert.equal((await call(e, `/booth/photos/${id}`)).status, 404);
  assert.ok(e.PHOTOS.m.has(`photos/${id}`));
  assert.equal(await sweepExpired(e), 1);
  assert.ok(!e.PHOTOS.m.has(`photos/${id}`));
  assert.equal(e.DB.raw.prepare('SELECT status FROM photos WHERE id = ?').get(id).status, 'expired');
  assert.equal(await sweepExpired(e), 0);
  await worker.scheduled({}, e);
});
test('the owner can delete their own photo; a stranger cannot; the wall is capped and newest first', async () => {
  const e = env(); const a = await (await post(e, {})).json(); const b = await (await post(e, {})).json();
  assert.equal((await call(e, `/booth/api/photos/${a.id}`, { method: 'DELETE', headers: { 'X-Booth-Owner': b.owner } })).status, 404);
  assert.equal((await call(e, `/booth/api/photos/${a.id}`, { method: 'DELETE' })).status, 404);
  assert.equal((await call(e, `/booth/api/photos/${a.id}`, { method: 'DELETE', headers: { 'X-Booth-Owner': a.owner } })).status, 200);
  assert.ok(!e.PHOTOS.m.has(`photos/${a.id}`));
  const now = Date.now();
  for (let i = 0; i < LIMITS.WALL_CAP + 5; i++) e.DB.raw.prepare("INSERT INTO photos (id, owner_hash, status, content_type, bytes, created_at) VALUES (?, 'x', 'approved', 'image/jpeg', 1, ?)").run(crypto.randomUUID(), now + i);
  const photos = (await (await call(e, '/booth/api/wall')).json()).photos;
  assert.equal(photos.length, LIMITS.WALL_CAP);
  assert.ok(photos.every((p, i) => i === 0 || photos[i - 1].createdAt >= p.createdAt));
  assert.ok(!photos.some((p) => p.mine));
});
test('unconfigured, unknown routes and bad ids fail closed', async () => {
  assert.equal((await call({}, '/booth/api/wall')).status, 503);
  const e = env();
  assert.equal((await call(e, '/elsewhere')).status, 404);
  assert.equal((await call(e, '/booth/photos/not-an-id')).status, 404);
  assert.equal((await call(e, '/booth/api/nope')).status, 404);
});
test('wrangler draft uses placeholders only, and the migration has the approval-queue and expiry columns', () => {
  const draft = fs.readFileSync('photo-booth/wrangler.draft.jsonc', 'utf8');
  for (const k of ['REPLACE_ME_booth_db', 'REPLACE_ME_D1_DATABASE_ID', 'REPLACE_ME_booth_photos']) assert.ok(draft.includes(k), k);
  assert.doesNotMatch(draft, /e7514ceb|tjm-catalog|tjm-images|"routes"|"route"/);
  const sql = fs.readFileSync('photo-booth/migrations/0001_photos.sql', 'utf8');
  for (const col of ['status', 'owner_hash', 'consent_keep', 'expires_at', 'frame']) assert.match(sql, new RegExp(col));
});
