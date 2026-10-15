// /catalog-admin/: owner page for the live catalog (tjm-catalog D1). Password = Worker secret CATALOG_ADMIN_PASSWORD.
// Sign-in sets a 12-hour HttpOnly cookie signed with that password; scripts (nightly export) may send
// "Authorization: Bearer <password>" instead. Every write bumps the D1 revision, so pages and checkout use it at once.
import { readLive, bumpRev, importSnapshot, exportAll, syncFromSnapshot, now } from '../cloudflare/catalog-d1.mjs';
import { snapshot } from './catalog-pages.mjs';
const COOKIE = '__Host-catalog-admin';
const STATUSES = new Set(['available', 'sold', 'not-for-sale', 'inquiry', 'unavailable']);
const enc = new TextEncoder();
const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return [...new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)))].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function same(a, b) {
  const d = v => crypto.subtle.digest('SHA-256', enc.encode(String(v)));
  const [x, y] = [new Uint8Array(await d(a)), new Uint8Array(await d(b))];
  let diff = 0; for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}
async function authed(request, env) {
  const secret = env.CATALOG_ADMIN_PASSWORD; if (!secret) return false;
  const bearer = request.headers.get('Authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (bearer) return same(bearer, secret);
  const c = (request.headers.get('Cookie') || '').split(/;\s*/).find(x => x.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  const [exp, sig] = (c || '').split('.');
  return !!exp && Number(exp) > Date.now() && same(sig, await hmac(secret, 'catalog-admin:' + exp));
}
const price = v => { if (v === null || v === '' || v === undefined) return null; const n = Number(v); if (!Number.isFinite(n) || n <= 0 || n > 1e6) throw Error('Enter a price like 125 or 125.00'); return n.toFixed(2); };
const dim = v => { if (v === null || v === '' || v === undefined) return null; const n = Number(v); if (!Number.isFinite(n) || n <= 0 || n > 2000) throw Error('Enter dimensions as positive numbers'); return n; };
const text = (v, max) => { const s = String(v ?? '').replace(/\s+/g, ' ').trim(); if (s.length > max) throw Error('Text is too long'); return s; };
export async function catalogAdmin(request, env, ctx) {
  const url = new URL(request.url), path = url.pathname.replace(/\/+$/, '') || '/';
  if (path === '/catalog-admin' && request.method === 'GET') return new Response(PAGE, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'same-origin' } });
  if (!path.startsWith('/catalog-admin/api/')) return new Response('Not found', { status: 404 });
  if (!env.CATALOG_DB || !env.CATALOG_ADMIN_PASSWORD) return json({ error: 'Catalog admin is not configured.' }, 503);
  const op = path.slice('/catalog-admin/api/'.length), db = env.CATALOG_DB;
  if (request.method !== 'GET' && request.headers.get('Origin') !== url.origin) return json({ error: 'Wrong origin.' }, 403);
  if (op === 'login' && request.method === 'POST') {
    const { password } = await request.json().catch(() => ({}));
    if (!password || !await same(password, env.CATALOG_ADMIN_PASSWORD)) { await new Promise(r => setTimeout(r, 800)); return json({ error: 'Wrong password.' }, 403); }
    const exp = Date.now() + 12 * 3600e3;
    return json({ ok: true }, 200, { 'Set-Cookie': `${COOKIE}=${exp}.${await hmac(env.CATALOG_ADMIN_PASSWORD, 'catalog-admin:' + exp)}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=43200` });
  }
  if (op === 'logout') return json({ ok: true }, 200, { 'Set-Cookie': `${COOKIE}=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0` });
  if (!await authed(request, env)) return json({ error: 'Sign in first.' }, 401);
  try {
    if (op === 'catalog' && request.method === 'GET') {
      const live = await readLive(db, { force: true });
      return json({ rev: live.rev, empty: live.empty, paintings: [...live.paintings.values()], editions: [...live.editions.values()], images: Object.fromEntries(live.images), status: Object.fromEntries(live.status) });
    }
    if (op === 'export' && request.method === 'GET') {
      const day = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
      return new Response(JSON.stringify(await exportAll(db), null, 1) + '\n', { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Content-Disposition': `attachment; filename="tjm-catalog-${day}.json"` } });
    }
    if (op === 'import' && request.method === 'POST') return json(await importSnapshot(db, await snapshot(env)));
    // {ids:[...]} copies those paintings (and their print sizes) from the deployed build; anything D1 lacks is always added.
    if (op === 'sync' && request.method === 'POST') { const b = await request.json().catch(() => ({})); return json(await syncFromSnapshot(db, await snapshot(env), { ids: Array.isArray(b.ids) ? b.ids.map(String).slice(0, 500) : [], missing: true })); }
    if (op === 'painting' && request.method === 'POST') {
      const b = await request.json(), id = String(b.id || '');
      const cur = await db.prepare('SELECT * FROM paintings WHERE id = ?').bind(id).first();
      if (!cur) return json({ error: 'Unknown painting.' }, 404);
      const next = { title: b.title !== undefined ? text(b.title, 200) : cur.title, price_amount: b.price !== undefined ? price(b.price) : cur.price_amount,
        width: b.width !== undefined ? dim(b.width) : cur.width, height: b.height !== undefined ? dim(b.height) : cur.height, unit: b.unit !== undefined ? (['in', 'cm'].includes(b.unit) ? b.unit : cur.unit) : cur.unit,
        description: b.description !== undefined ? text(b.description, 2000) : cur.description };
      if (!next.title) throw Error('A title is required.');
      const stmts = [db.prepare('UPDATE paintings SET title=?, price_amount=?, width=?, height=?, unit=?, description=?, updated_at=? WHERE id=?').bind(next.title, next.price_amount, next.width, next.height, next.unit, next.description, now(), id)];
      if (b.status !== undefined) { if (!STATUSES.has(b.status)) throw Error('Unknown availability.'); stmts.push(db.prepare('INSERT INTO status (product_id, status, note, updated_at) VALUES (?,?,?,?) ON CONFLICT(product_id) DO UPDATE SET status=excluded.status, note=excluded.note, updated_at=excluded.updated_at').bind(id, b.status, 'catalog-admin', now())); }
      await db.batch(stmts);
      await bumpRev(db, 'painting', id, { before: { title: cur.title, price: cur.price_amount, width: cur.width, height: cur.height, unit: cur.unit }, after: { ...next, status: b.status } });
      return json({ ok: true });
    }
    if (op === 'painting/new' && request.method === 'POST') {
      const b = await request.json();
      const slug = String(b.slug || '').toLowerCase(); if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 80) throw Error('Use a slug like my-new-painting.');
      const title = text(b.title, 200); if (!title) throw Error('A title is required.');
      const status = STATUSES.has(b.status) ? b.status : 'available';
      const taken = await db.prepare('SELECT id FROM paintings WHERE id = ? OR slug = ?').bind(slug, slug).first();
      const snap = await snapshot(env);
      if (taken || snap.bySlug.has(slug) || snap.byId.has(slug)) throw Error('That slug is already used.');
      const w = dim(b.width), h = dim(b.height);
      await db.batch([
        db.prepare("INSERT INTO paintings (id, slug, type, title, artist, medium, surface, year, width, height, unit, description, price_amount, currency, parcel_json, source, updated_at) VALUES (?,?, 'painting', ?, 'TJ Murphy', ?, NULL, ?, ?, ?, ?, ?, ?, 'USD', ?, 'admin', ?)")
          .bind(slug, slug, title, text(b.medium, 200) || null, Number(b.year) || null, w, h, ['in', 'cm'].includes(b.unit) ? b.unit : 'in', text(b.description, 2000) || null, price(b.price), w && h ? JSON.stringify({ length: Math.ceil(Math.min(w, h) * (b.unit === 'cm' ? 0.3937 : 1)) + 4, width: 4, height: 4, weight: 2 }) : null, now()),
        db.prepare('INSERT INTO status (product_id, status, note, updated_at) VALUES (?,?,?,?)').bind(slug, status, 'catalog-admin', now())]);
      await bumpRev(db, 'painting/new', slug, { title, status });
      return json({ ok: true, id: slug, url: `/products/${slug}/` });
    }
    if (op === 'edition' && request.method === 'POST') {
      const b = await request.json(), cur = await db.prepare('SELECT * FROM editions WHERE id = ?').bind(String(b.id || '')).first();
      if (!cur) return json({ error: 'Unknown size.' }, 404);
      const amount = b.amount !== undefined ? price(b.amount) : cur.amount, enabled = b.enabled !== undefined ? (b.enabled ? 1 : 0) : cur.enabled;
      if (!amount) throw Error('A print needs a price.');
      await db.prepare('UPDATE editions SET amount=?, enabled=?, updated_at=? WHERE id=?').bind(amount, enabled, now(), cur.id).run();
      await bumpRev(db, 'edition', cur.id, { before: { amount: cur.amount, enabled: cur.enabled }, after: { amount, enabled } });
      return json({ ok: true });
    }
    // Picture swap: the page crops (never pads) and makes the WebP sizes; each one is PUT under its existing R2 key.
    if (op === 'image' && request.method === 'PUT') {
      const id = url.searchParams.get('product') || '', key = url.searchParams.get('key') || '', width = Number(url.searchParams.get('width'));
      if (!env.IMAGES) throw Error('Image storage is not configured.');
      const p = await db.prepare('SELECT id, source FROM paintings WHERE id = ?').bind(id).first(); if (!p) return json({ error: 'Unknown painting.' }, 404);
      const row = await db.prepare('SELECT key FROM images WHERE product_id = ? AND key = ?').bind(id, key).first();
      const newKey = new RegExp(`^display/${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(160|480|960|1600)\\.webp$`).test(key) && Number(key.match(/-(\d+)\.webp$/)[1]) === width;
      if (!row && !newKey) throw Error('That image name does not belong to this painting.');
      if (request.headers.get('Content-Type') !== 'image/webp') throw Error('Upload WebP.');
      const bytes = await request.arrayBuffer();
      if (bytes.byteLength < 100 || bytes.byteLength > 8e6 || new TextDecoder().decode(bytes.slice(8, 12)) !== 'WEBP') throw Error('Not a WebP image.');
      await env.IMAGES.put(key, bytes, { httpMetadata: { contentType: 'image/webp', cacheControl: 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800' } });
      if (!row) await db.prepare("INSERT INTO images (product_id, key, width, role, rev) VALUES (?, ?, ?, 'display', 0)").bind(id, key, width).run();
      return json({ ok: true, key });
    }
    if (op === 'image/done' && request.method === 'POST') {
      const { product } = await request.json();
      const r = await db.prepare('SELECT MAX(rev) AS rev FROM images WHERE product_id = ?').bind(String(product || '')).first();
      const rev = Math.max(Number(r?.rev || 0), Math.floor(Date.now() / 1000) % 1e9) + 1;
      await db.prepare('UPDATE images SET rev = ? WHERE product_id = ?').bind(rev, String(product)).run();
      await bumpRev(db, 'image', String(product), { rev });
      return json({ ok: true, rev });
    }
    return json({ error: 'Unknown request.' }, 404);
  } catch (e) { return json({ error: e.message || 'Request failed.' }, 400); }
}
const PAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Catalog admin · TJ Murphy</title>
<style>body{font:15px/1.45 system-ui,sans-serif;margin:0;background:#faf8f4;color:#222}header{display:flex;gap:12px;align-items:center;padding:12px 20px;background:#222;color:#fff;flex-wrap:wrap}header h1{font-size:18px;margin:0 auto 0 0}main{display:grid;grid-template-columns:minmax(240px,340px) 1fr;gap:20px;padding:20px}@media(max-width:800px){main{grid-template-columns:1fr}}
#list{max-height:80vh;overflow:auto;background:#fff;border:1px solid #ddd}#list button{display:block;width:100%;text-align:left;border:0;border-bottom:1px solid #eee;background:none;padding:8px 10px;cursor:pointer}#list button:hover,#list button[aria-current]{background:#f0ece4}
section{background:#fff;border:1px solid #ddd;padding:16px;margin-bottom:16px}label{display:block;margin:8px 0}input,select,textarea{font:inherit;padding:5px;max-width:100%}input[type=text],textarea{width:100%;box-sizing:border-box}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #eee;padding:4px 6px;text-align:left}td input[type=text]{width:7em}button{font:inherit;padding:6px 12px;cursor:pointer}.msg{min-height:1.4em;color:#06603a}.err{color:#a40000}small{color:#666}img.pv{max-width:220px;max-height:220px;display:block;margin:8px 0}</style></head><body>
<header><h1>Catalog admin</h1><span id="rev"></span><button id="export" hidden>Export JSON</button><button id="import" hidden>Import built catalog</button><button id="logout" hidden>Sign out</button></header>
<div id="login" style="padding:40px;max-width:360px"><form id="lf"><label>Password <input type="password" id="pw" autocomplete="current-password" required></label><button>Sign in</button><p class="msg err" id="lm"></p></form></div>
<main id="app" hidden><div><input type="text" id="q" placeholder="Search title or id"><div id="list"></div><section><h2>Add a painting</h2><form id="nf"><label>Slug <input type="text" name="slug" required pattern="[a-z0-9-]+"></label><label>Title <input type="text" name="title" required></label><label>Price (blank = not for sale) <input type="text" name="price"></label><label>Width <input type="text" name="width" size="5"> Height <input type="text" name="height" size="5"> <select name="unit"><option>in</option><option>cm</option></select></label><label>Medium <input type="text" name="medium"></label><label>Year <input type="text" name="year" size="5"></label><label>Availability <select name="status"><option>available</option><option>inquiry</option><option>not-for-sale</option><option>sold</option></select></label><label>Description <textarea name="description" rows="3"></textarea></label><button>Add painting</button><p class="msg" id="nm"></p></form><small>Then pick it in the list and add its picture.</small></section></div><div id="edit"><p>Pick a painting.</p></div></main>
<script>
const $=s=>document.querySelector(s),api=async(p,o={})=>{const r=await fetch('/catalog-admin/api/'+p,{credentials:'same-origin',...o,headers:{...(o.json?{'Content-Type':'application/json'}:{}),...(o.headers||{})},body:o.json?JSON.stringify(o.json):o.body});const j=r.headers.get('Content-Type')?.includes('json')?await r.json():null;if(!r.ok)throw Error(j?.error||r.statusText);return j};
let data=null,current=null;const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function load(){try{data=await api('catalog')}catch(e){$('#login').hidden=false;$('#app').hidden=true;return}$('#login').hidden=true;$('#app').hidden=false;$('#logout').hidden=false;$('#export').hidden=data.empty;$('#import').hidden=!data.empty;$('#rev').textContent='Revision '+data.rev+' · '+data.paintings.length+' paintings · '+data.editions.length+' print sizes';if(!current){const u=new URLSearchParams(location.search),k=u.get('slug')||u.get('id')||decodeURIComponent(location.hash.slice(1)),m=k&&data.paintings.find(p=>p.slug===k||p.id===k);if(m)current=m.id}list();if(current)show(current)}
function list(){const q=$('#q').value.toLowerCase();$('#list').innerHTML=data.paintings.filter(p=>!q||p.title.toLowerCase().includes(q)||p.id.includes(q)).sort((a,b)=>a.title.localeCompare(b.title)).map(p=>'<button data-id="'+esc(p.id)+'"'+(p.id===current?' aria-current="true"':'')+'>'+esc(p.title)+'<br><small>'+esc(p.id)+(p.price_amount?' · $'+p.price_amount:'')+' · '+esc(data.status[p.id]?.status||'')+'</small></button>').join('')}
function show(id){current=id;const p=data.paintings.find(x=>x.id===id);if(!p)return;const eds=data.editions.filter(e=>e.product_id===id),imgs=data.images[id]||[],st=data.status[id]?.status||'';list();
$('#edit').innerHTML='<section><h2>'+esc(p.title)+'</h2><p><a href="/products/'+esc(p.slug)+'/" target="_blank">View page ↗</a> <small>'+esc(p.id)+' · '+esc(p.source)+'</small></p><form id="pf"><label>Title <input type="text" name="title" value="'+esc(p.title)+'"></label><label>Original price (blank = no price) <input type="text" name="price" value="'+esc(p.price_amount||'')+'"></label><label>Size of the original: <input type="text" name="width" size="5" value="'+esc(p.width??'')+'"> × <input type="text" name="height" size="5" value="'+esc(p.height??'')+'"> <select name="unit">'+['in','cm'].map(u=>'<option'+(p.unit===u?' selected':'')+'>'+u+'</option>').join('')+'</select> <small>(W × H)</small></label><label>Availability <select name="status">'+['','available','inquiry','not-for-sale','sold','unavailable'].map(s=>'<option'+(s===st?' selected':'')+'>'+s+'</option>').join('')+'</select> <small>Live holds and sales still come from checkout; Etsy follows within 5 minutes.</small></label><label>Description <textarea name="description" rows="3">'+esc(p.description||'')+'</textarea></label><button>Save</button> <span class="msg" id="pm"></span></form></section>'
+'<section><h2>Picture</h2>'+(imgs.length?'<img class="pv" src="https://img.tjm.art/'+esc(imgs.filter(i=>i.width<=480).at(-1)?.key||imgs[0].key)+(imgs[0].rev?'?v='+imgs[0].rev:'')+'">':'<p>No picture yet.</p>')+'<p><small>New photo is cropped to the painting\\'s proportions (centre, never padded) and saved in the same sizes'+(imgs.length?' ('+imgs.map(i=>i.width).join(', ')+' px)':' (160, 480, 960, 1600 px)')+'. Print masters still change through the repo.</small></p><input type="file" id="photo" accept="image/*"> <button id="swap">Upload picture</button> <span class="msg" id="im"></span></section>'
+(eds.length?'<section><h2>Print sizes</h2><table><tr><th>Size</th><th>Paper</th><th>Price</th><th>On sale</th><th></th></tr>'+eds.map(e=>'<tr data-e="'+esc(e.id)+'"><td>'+esc(e.title.replace(p.title+' — ',''))+'</td><td><small>'+(e.paper_w?esc(e.paper_w+' × '+e.paper_h+' in'):'')+'</small></td><td>$<input type="text" value="'+esc(e.amount)+'"></td><td><input type="checkbox"'+(e.enabled?' checked':'')+'></td><td><button>Save</button> <span class="msg"></span></td></tr>').join('')+'</table><small>Sizes can be withdrawn; new sizes need new FinerWorks files (repo).</small></section>':'');
$('#pf').onsubmit=async ev=>{ev.preventDefault();const f=new FormData(ev.target),b={id};for(const [k,v] of f)if(!(k==='status'&&!v))b[k]=v;try{await api('painting',{method:'POST',json:b});$('#pm').textContent='Saved. Live now.';await load()}catch(e){$('#pm').textContent=e.message}};
document.querySelectorAll('tr[data-e]').forEach(tr=>tr.querySelector('button').onclick=async()=>{const m=tr.querySelector('.msg');try{await api('edition',{method:'POST',json:{id:tr.dataset.e,amount:tr.querySelector('input[type=text]').value,enabled:tr.querySelector('input[type=checkbox]').checked}});m.textContent='Saved';await load()}catch(e){m.textContent=e.message}});
$('#swap').onclick=()=>swap(p,imgs)}
async function swap(p,imgs){const m=$('#im'),file=$('#photo').files[0];if(!file){m.textContent='Choose a photo first.';return}try{m.textContent='Preparing…';
const bmp=await createImageBitmap(file,{imageOrientation:'from-image'}),W=bmp.width,H=bmp.height,ratio=p.width&&p.height?p.width/p.height:(imgs.length?await new Promise(r=>{const i=new Image();i.onload=()=>r(i.naturalWidth/i.naturalHeight);i.src='https://img.tjm.art/'+imgs[0].key}):W/H);
let cw=W,ch=Math.round(W/ratio);if(ch>H){ch=H;cw=Math.round(H*ratio)}const sx=Math.floor((W-cw)/2),sy=Math.floor((H-ch)/2);
const targets=imgs.length?imgs.map(i=>({key:i.key,w:i.width})):[160,480,960,1600].map(w=>({key:'display/'+p.id+'-'+w+'.webp',w}));const skipped=[];
for(const t of targets){if(t.w>cw){skipped.push(t.w);continue}const c=document.createElement('canvas');c.width=t.w;c.height=Math.round(t.w*ch/cw);const g=c.getContext('2d');g.imageSmoothingQuality='high';g.drawImage(bmp,sx,sy,cw,ch,0,0,c.width,c.height);
const blob=await new Promise(r=>c.toBlob(r,'image/webp',0.8));if(!blob||blob.type!=='image/webp')throw Error('This browser cannot make WebP; use Chrome, Edge or Firefox.');m.textContent='Uploading '+t.w+' px…';await api('image?product='+encodeURIComponent(p.id)+'&key='+encodeURIComponent(t.key)+'&width='+t.w,{method:'PUT',body:blob,headers:{'Content-Type':'image/webp'}})}
await api('image/done',{method:'POST',json:{product:p.id}});m.textContent='Live now'+(skipped.length?' (kept old '+skipped.join(', ')+' px: photo too small)':'')+'.';await load()}catch(e){m.textContent=e.message}}
$('#list').onclick=e=>{const b=e.target.closest('button[data-id]');if(b)show(b.dataset.id)};$('#q').oninput=list;
$('#lf').onsubmit=async e=>{e.preventDefault();try{await api('login',{method:'POST',json:{password:$('#pw').value}});$('#pw').value='';load()}catch(err){$('#lm').textContent=err.message}};
$('#logout').onclick=async()=>{await api('logout',{method:'POST'});location.reload()};$('#export').onclick=()=>{location.href='/catalog-admin/api/export'};
$('#import').onclick=async()=>{if(!confirm('Import the built catalog into the database (one time)?'))return;try{const r=await api('import',{method:'POST'});alert('Imported '+r.paintings+' paintings and '+r.editions+' print sizes.');load()}catch(e){alert(e.message)}};
$('#nf').onsubmit=async e=>{e.preventDefault();const b=Object.fromEntries(new FormData(e.target));try{const r=await api('painting/new',{method:'POST',json:b});$('#nm').textContent='Added: '+r.url;e.target.reset();await load();show(r.id)}catch(err){$('#nm').textContent=err.message}};
load();
</script></body></html>`;
