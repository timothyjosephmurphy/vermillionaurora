import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHmac } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import worker, { adminAuthed } from '../photo-booth/worker.mjs';
import { parseVerdict } from '../photo-booth/moderation.mjs';
import { FILTER, LIMITS } from '../photo-booth/config.mjs';

const H = 'https://tjm.art', PASSWORD = 'test-only-password';
const JPEG = [0xff, 0xd8, 0xff, 0xe0];
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
// Fake Workers AI: `reply` is what the model says, or a function, or an Error to throw.
const ai = (reply) => ({ calls: 0, async run(model, input) { this.calls++; this.last = { model, input }; const r = typeof reply === 'function' ? reply() : reply; if (r instanceof Error) throw r; return { response: r }; } });
const SAFE = '{"verdict":"safe","reason":"clothed person"}';
const env = (reply = SAFE, extra = {}) => ({ DB: d1(), PHOTOS: r2(), AI: ai(reply), CATALOG_ADMIN_PASSWORD: PASSWORD, ...extra });
const bearer = { Authorization: `Bearer ${PASSWORD}` };
const call = (e, path, init = {}) => worker.fetch(new Request(H + path, init), e);
function form({ consent = 'yes', type = 'image/jpeg', size = 100, head = JPEG, extra = {} } = {}) {
  const f = new FormData(); const bytes = new Uint8Array(size); bytes.set(head);
  f.set('photo', new File([bytes], 'p.jpg', { type }));
  if (consent !== null) f.set('consent', consent);
  for (const [k, v] of Object.entries(extra)) f.set(k, v);
  return f;
}
const post = (e, opts) => call(e, '/booth/api/photos', { method: 'POST', body: form(opts) });
const wall = async (e) => (await (await call(e, '/booth/api/wall')).json()).photos;
const rows = (e) => e.DB.raw.prepare('SELECT * FROM photos').all();

test('without consent nothing is stored: no R2 object, no D1 row, the filter is not even called', async () => {
  const e = env();
  for (const consent of [null, 'no', '', 'YES', 'true']) assert.equal((await post(e, { consent })).status, 422);
  assert.equal(e.PHOTOS.m.size, 0); assert.equal(rows(e).length, 0); assert.equal(e.AI.calls, 0);
});
test('a consenting photo that passes the filter is published at once, with no approval step', async () => {
  const e = env(); const res = await post(e);
  assert.equal(res.status, 201);
  const body = await res.json();
  assert.equal(body.status, 'published');
  assert.match(body.owner, /^[0-9a-f-]{36}\.[0-9a-f]{64}$/);
  assert.deepEqual((await wall(e)).map((p) => p.id), [body.id]);
  const img = await call(e, body.url);
  assert.equal(img.status, 200); assert.match(img.headers.get('Cache-Control'), /public/);
  const row = rows(e)[0];
  assert.equal(row.status, 'published');
  assert.ok(!JSON.stringify(row).includes(body.owner.split('.')[1]), 'the owner token itself is never stored');
  assert.equal(e.AI.last.model, FILTER.MODEL);
});
test('the filter fails closed: unsafe, unsure, borderline, refusals, prose, bad JSON, errors and a missing AI binding all hold the photo', async () => {
  const cases = {
    unsafe: ['{"verdict":"unsafe","reason":"nudity"}', 'unsafe'],
    unsure: ['{"verdict":"unsure","reason":"borderline"}', 'unsure'],
    prose: ['The image looks safe to me.', 'unsure'],
    proseWithSafe: ['Sure! {"verdict":"safe"} hope that helps', 'unsure'],
    refusal: ["I can't help with that.", 'unsure'],
    badJson: ['{"verdict":"safe"', 'unsure'],
    otherValue: ['{"verdict":"mostly safe"}', 'unsure'],
    empty: ['', 'unsure'],
    thrown: [new Error('model unavailable'), 'filter_error'],
  };
  for (const [name, [reply, reason]] of Object.entries(cases)) {
    const e = env(reply); const res = await post(e);
    assert.equal(res.status, 202, name);
    const body = await res.json(); assert.equal(body.status, 'held', name);
    assert.deepEqual(await wall(e), [], name);
    assert.equal(rows(e)[0].hold_reason, reason, name);
    assert.equal((await call(e, `/booth/photos/${body.id}`)).status, 404, name);        // private to everyone but the admin tool
  }
  const noAi = env(SAFE, { AI: undefined }); const res = await post(noAi);
  assert.equal(res.status, 202); assert.deepEqual(await wall(noAi), []);
});
test('parseVerdict accepts one JSON object (optionally fenced) and nothing else', () => {
  assert.equal(parseVerdict('{"verdict":"safe"}'), 'safe');
  assert.equal(parseVerdict('```json\n{"verdict":"unsafe","reason":"x"}\n```'), 'unsafe');
  for (const bad of [null, undefined, 42, '[]', '"safe"', 'safe', '{"verdict":"Safe"}', '{}']) assert.equal(parseVerdict(bad), null);
});
test('held photos are visible only to the admin tool', async () => {
  const e = env('{"verdict":"unsafe"}'); const { id } = await (await post(e)).json();
  assert.equal((await call(e, `/booth/photos/${id}`, { headers: { Authorization: 'Bearer nope' } })).status, 404);
  assert.equal((await call(e, `/booth/photos/${id}`, { headers: bearer })).status, 200);
  const list = (await (await call(e, '/booth/api/admin/photos', { headers: bearer })).json()).photos;
  assert.deepEqual(list.map((p) => [p.id, p.status, p.holdReason]), [[id, 'held', 'unsafe']]);
});
test('there is no approval queue: queue/approve/reject routes do not exist', async () => {
  const e = env(); const { id } = await (await post(e)).json();
  for (const [path, method] of [['/booth/api/admin/queue', 'GET'], [`/booth/api/admin/photos/${id}/approve`, 'POST'], [`/booth/api/admin/photos/${id}/reject`, 'POST']])
    assert.equal((await call(e, path, { method, headers: bearer })).status, 404);
  assert.equal(rows(e)[0].status, 'published');
  const sql = fs.readFileSync('photo-booth/migrations/0001_photos.sql', 'utf8') + fs.readFileSync('photo-booth/worker.mjs', 'utf8');
  assert.doesNotMatch(sql, /pending|approve|BOOTH_ADMIN_PASSWORD/i);
});
test('upload validation: type, size, magic bytes, missing photo; the frame field is ignored', async () => {
  const e = env();
  assert.equal((await post(e, { type: 'image/gif' })).status, 415);
  assert.equal((await post(e, { size: LIMITS.MAX_PHOTO_BYTES + 1 })).status, 413);
  assert.equal((await post(e, { head: [0, 0, 0, 0] })).status, 415);
  assert.equal((await call(e, '/booth/api/photos', { method: 'POST', body: new FormData() })).status, 400);
  assert.equal(rows(e).length, 0); assert.equal(e.AI.calls, 0);
  assert.equal((await post(e, { extra: { frame: 'gold' } })).status, 201);
  assert.ok(!('frame' in rows(e)[0]));
});
test('the daily filter budget is a hard cap: over it, uploads are refused and nothing is stored', async () => {
  const e = env(); const now = Date.now();
  for (let i = 0; i < FILTER.DAILY_MAX; i++) e.DB.raw.prepare("INSERT INTO photos (id, owner_hash, status, content_type, bytes, created_at) VALUES (?, 'x', 'published', 'image/jpeg', 1, ?)").run(crypto.randomUUID(), now - i);
  assert.equal((await post(e)).status, 503);
  assert.equal(e.AI.calls, 0); assert.equal(e.PHOTOS.m.size, 0);
  e.DB.raw.prepare('UPDATE photos SET created_at = ?').run(now - 2 * 86400e3);   // window moves on
  assert.equal((await post(e)).status, 201);
});
test('admin remove tool: same password and pattern as /catalog-admin/; refused without it; closed if the secret is unset', async () => {
  const e = env(); const { id } = await (await post(e)).json();
  for (const init of [{}, { headers: { Authorization: 'Bearer nope' } }, { headers: { Cookie: '__Host-catalog-admin=9999999999999.abc' } }]) {
    assert.equal((await call(e, '/booth/api/admin/photos', init)).status, 401);
    assert.ok([401, 403].includes((await call(e, `/booth/api/admin/photos/${id}/remove`, { method: 'POST', ...init })).status));
  }
  assert.equal(rows(e)[0].status, 'published');
  assert.equal((await call(env(SAFE, { CATALOG_ADMIN_PASSWORD: undefined }), '/booth/api/admin/photos', { headers: bearer })).status, 503);
  assert.equal((await call(e, `/booth/api/admin/photos/${id}/remove`, { method: 'POST', headers: bearer })).status, 200);
  assert.ok(!e.PHOTOS.m.has(`photos/${id}`)); assert.deepEqual(await wall(e), []);
  assert.equal((await call(e, `/booth/photos/${id}`)).status, 404);
  assert.equal((await call(e, `/booth/api/admin/photos/${id}/remove`, { method: 'POST', headers: bearer })).status, 404);
  assert.equal((await call(e, `/booth/api/admin/photos/${crypto.randomUUID()}/remove`, { method: 'POST', headers: bearer })).status, 404);
});
test('a catalog-admin cookie (same signing as worker/catalog-admin.mjs) works here, and login sets that same cookie; browser writes need a same-origin Origin', async () => {
  const e = env(); const { id } = await (await post(e)).json();
  const exp = Date.now() + 3600e3;
  const cookie = `__Host-catalog-admin=${exp}.${createHmac('sha256', PASSWORD).update('catalog-admin:' + exp).digest('hex')}`;
  assert.equal(await adminAuthed(new Request(H + '/x', { headers: { Cookie: cookie } }), e), true);
  assert.equal((await call(e, '/booth/api/admin/photos', { headers: { Cookie: cookie } })).status, 200);
  assert.equal((await call(e, `/booth/api/admin/photos/${id}/remove`, { method: 'POST', headers: { Cookie: cookie } })).status, 403);  // no Origin
  assert.equal((await call(e, `/booth/api/admin/photos/${id}/remove`, { method: 'POST', headers: { Cookie: cookie, Origin: H } })).status, 200);
  assert.equal((await call(e, '/booth/api/admin/login', { method: 'POST', headers: { Origin: 'https://evil.example' }, body: JSON.stringify({ password: PASSWORD }) })).status, 403);
  const res = await call(e, '/booth/api/admin/login', { method: 'POST', headers: { Origin: H }, body: JSON.stringify({ password: PASSWORD }) });
  assert.equal(res.status, 200); assert.match(res.headers.get('Set-Cookie'), /^__Host-catalog-admin=\d+\.[0-9a-f]{64}; Path=\/; Secure; HttpOnly; SameSite=Strict/);
  assert.ok(!res.headers.get('Set-Cookie').includes(PASSWORD));
});
test('the visitor can delete their own photo with their owner token; nobody else can', async () => {
  const e = env(); const a = await (await post(e)).json(); const b = await (await post(e)).json();
  assert.equal((await call(e, `/booth/api/photos/${a.id}`, { method: 'DELETE', headers: { 'X-Booth-Owner': b.owner } })).status, 404);
  assert.equal((await call(e, `/booth/api/photos/${a.id}`, { method: 'DELETE', headers: { 'X-Booth-Owner': `${a.id}.${'0'.repeat(64)}` } })).status, 404);
  assert.equal((await call(e, `/booth/api/photos/${a.id}`, { method: 'DELETE' })).status, 404);
  assert.equal((await call(e, `/booth/api/photos/${a.id}`, { method: 'DELETE', headers: { 'X-Booth-Owner': a.owner } })).status, 200);
  assert.ok(!e.PHOTOS.m.has(`photos/${a.id}`)); assert.deepEqual((await wall(e)).map((p) => p.id), [b.id]);
});
test('the wall is newest first and capped; nothing expires', async () => {
  const e = env(); const now = Date.now();
  for (let i = 0; i < LIMITS.WALL_CAP + 5; i++) e.DB.raw.prepare("INSERT INTO photos (id, owner_hash, status, content_type, bytes, created_at) VALUES (?, 'x', 'published', 'image/jpeg', 1, ?)").run(crypto.randomUUID(), now - 400 * 86400e3 + i);
  const photos = await wall(e);
  assert.equal(photos.length, LIMITS.WALL_CAP);
  assert.ok(photos.every((p, i) => i === 0 || photos[i - 1].createdAt >= p.createdAt));
  assert.equal((await import('../photo-booth/worker.mjs')).default.scheduled, undefined);
  assert.doesNotMatch(fs.readFileSync('photo-booth/migrations/0001_photos.sql', 'utf8') + fs.readFileSync('photo-booth/config.mjs', 'utf8'), /expires_at|TTL_DAYS|FRAME|frame TEXT/);
});
test('unconfigured, unknown routes and bad ids fail closed', async () => {
  assert.equal((await call({}, '/booth/api/wall')).status, 503);
  const e = env();
  assert.equal((await call(e, '/elsewhere')).status, 404);
  assert.equal((await call(e, '/booth/photos/not-an-id')).status, 404);
  assert.equal((await call(e, '/booth/api/nope')).status, 404);
});
test('wrangler draft: placeholder ids only, route tjm.art/booth/*, AI binding, no cron, no new secret name', () => {
  const draft = fs.readFileSync('photo-booth/wrangler.draft.jsonc', 'utf8');
  for (const k of ['REPLACE_ME_booth_db', 'REPLACE_ME_D1_DATABASE_ID', 'REPLACE_ME_booth_photos']) assert.ok(draft.includes(k), k);
  assert.doesNotMatch(draft, /e7514ceb|tjm-catalog|tjm-images|BOOTH_ADMIN_PASSWORD|"crons"/);
  const cfg = JSON.parse(draft.replace(/^\s*\/\/.*$/gm, ''));
  assert.deepEqual(cfg.routes, [{ pattern: 'tjm.art/booth/*', zone_name: 'tjm.art' }]);
  assert.deepEqual(cfg.ai, { binding: 'AI' });
  assert.equal(cfg.triggers, undefined);
});
