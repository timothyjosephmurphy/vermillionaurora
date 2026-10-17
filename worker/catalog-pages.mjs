// Request-time catalog for tjm.art. Pages are still built statically (SEO, JSON-LD, fast); this Worker lays the
// live tjm-catalog D1 values over them: it diffs D1 against the snapshot the pages were built from
// (/catalog/snapshot.json) and patches only what changed (titles, original prices, dimensions, print prices,
// withdrawn sizes, swapped pictures), plus worker-rendered pages for paintings added in /catalog-admin/.
// Patched pages are edge-cached under a key containing the D1 revision, so an edit shows on the next request.
// Fallback: if D1 is missing, empty or errors, the built page is served unchanged.
import { readLive } from '../cloudflare/catalog-d1.mjs';
const IMAGE_ORIGIN = 'https://img.tjm.art';
let snapCache = null;
export async function snapshot(env) {
  if (snapCache) return snapCache;
  const r = await env.ASSETS.fetch(new Request('https://tjm.art/catalog/snapshot.json'));
  if (!r.ok) throw Error('snapshot missing');
  const s = await r.json();
  snapCache = { ...s, byId: new Map(s.paintings.map(p => [p.id, p])), bySlug: new Map(s.paintings.map(p => [p.slug, p])), editionsById: new Map(s.editions.map(e => [e.id, e])) };
  return snapCache;
}
export async function liveCatalog(env) {
  if (!env.CATALOG_DB) return null;
  try { const live = await readLive(env.CATALOG_DB); return live.empty ? null : live; } catch { return null; }
}
export const money = a => `$${Number(a).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const dimsLabel = (w, h, u) => `${w} × ${h} ${u}`;
// What changed in D1 relative to the built snapshot, per product.
export function diffCatalog(live, snap) {
  const changes = new Map(), added = [];
  const get = id => { if (!changes.has(id)) changes.set(id, { editions: new Map(), images: [] }); return changes.get(id); };
  for (const [id, p] of live.paintings) {
    const o = snap.byId.get(id);
    if (!o) { if (p.source === 'admin') added.push(p); continue; }
    if (p.title !== o.title) get(id).title = [o.title, p.title];
    if ((p.price_amount || null) !== (o.price || null) && o.price && p.price_amount) get(id).price = [o.price, p.price_amount];
    const st = live.status.get(id)?.status;
    if ((st === 'sold' || st === 'unavailable') && st !== (o.status || 'available')) get(id).status = st;
    if (o.width && p.width && o.unit && (p.width !== o.width || p.height !== o.height || p.unit !== o.unit)) get(id).dims = [[o.width, o.height, o.unit], [p.width, p.height, p.unit]];
  }
  for (const [id, e] of live.editions) {
    const o = snap.editionsById.get(id); if (!o) continue;
    if (!e.enabled || e.amount !== o.amount) get(e.product_id).editions.set(id, { from: o.amount, amount: e.amount, enabled: !!e.enabled });
  }
  for (const [id, list] of live.images) for (const im of list) if (im.rev > 0) get(id).images.push(im);
  for (const [id, c] of changes) if (!c.title && !c.price && !c.dims && !c.status && !c.editions.size && !c.images.length) changes.delete(id);
  return { changes, added };
}
function minPrint(snap, live, productId) {
  let before = Infinity, after = Infinity;
  for (const e of snap.editions) if (e.productId === productId) {
    before = Math.min(before, Number(e.amount));
    const l = live.editions.get(e.id); if (!l || l.enabled) after = Math.min(after, Number(l ? l.amount : e.amount));
  }
  return [before, after];
}
function patchSegment(text, c, snap, live, productId, isProductPage) {
  let t = text;
  if (c.title) {
    const [o, n] = c.title;
    for (const [a, b] of [[esc(o), esc(n)], [esc(o).replace(/'/g, '&#39;'), esc(n).replace(/'/g, '&#39;')], [JSON.stringify(o).slice(1, -1), JSON.stringify(n).slice(1, -1)], [o, n]]) if (a) t = t.split(a).join(b);
  }
  if (c.price) {
    const [o, n] = c.price;
    t = t.replace(new RegExp(reEsc(money(o)) + '(?![\\d,]|\\.\\d)', 'g'), money(n))
      .split(`"price":"${o}"`).join(`"price":"${n}"`).split(`data-price="${o}"`).join(`data-price="${n}"`);
  }
  if (c.dims) {
    const [[ow, oh, ou], [nw, nh, nu]] = c.dims;
    t = t.split(dimsLabel(ow, oh, ou)).join(dimsLabel(nw, nh, nu)).split(dimsLabel(oh, ow, ou)).join(dimsLabel(nh, nw, nu));
  }
  // Unavailable or sold original: details line, description and JSON-LD offer on its page; price captions in listings.
  if (c.status) {
    const label = statusText[c.status];
    if (isProductPage) {
      t = t.replace(/(<dt>Original<\/dt><dd>)Available(?: · [^<]*)?(?=<\/dd>)/, `$1${label}`)
        .replace(/Original available for \$[\d,]+(?:\.\d\d)?\./g, c.status === 'sold' ? 'Original sold.' : 'Original not currently available.')
        .split('"availability":"https://schema.org/InStock"').join('"availability":"https://schema.org/SoldOut"');
    } else {
      t = t.replace(/(<p class="sp-price"[^>]*>)\$[\d,]+(?:\.\d\d)?(?=<\/p>)/g, `$1${label}`)
        .replace(/(<div class="product-info"><p>[^<]*· )\$[\d,]+(?:\.\d\d)?(?=<\/p>)/g, `$1${label}`);
    }
  }
  for (const im of c.images) t = t.replace(new RegExp(reEsc(`${IMAGE_ORIGIN}/${im.key}`) + '(?:\\?v=\\d+)?', 'g'), `${IMAGE_ORIGIN}/${im.key}?v=${im.rev}`);
  if (c.editions.size) {
    const [before, after] = minPrint(snap, live, productId);
    if (Number.isFinite(before) && Number.isFinite(after) && before !== after) t = t.replace(new RegExp('(rints from )' + reEsc(money(before)) + '(?:\\.00)?(?![\\d,]|\\.\\d)', 'g'), `$1${money(after)}`);
    if (isProductPage) {
      t = t.replace(/<label class="print-choice[^"]*"><input[^>]*value="(print-[^"]+)"[^>]*>[\s\S]*?<\/label>/g, (m, id) => {
        const e = c.editions.get(id); if (!e) return m;
        if (!e.enabled) return '';
        return m.replace(`<b>$${e.from}</b>`, `<b>$${e.amount}</b>`);
      });
      t = t.replace(/data-options="([^"]*)"/g, (m, raw) => {
        let data; try { data = JSON.parse(raw.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')); } catch { return m; }
        const walk = v => {
          if (Array.isArray(v)) return v.filter(x => !(x && typeof x === 'object' && c.editions.get(x.id)?.enabled === false)).map(walk);
          if (v && typeof v === 'object') { const out = {}; for (const [k, x] of Object.entries(v)) out[k] = walk(x); const e = c.editions.get(v.id); if (e && 'amount' in v) out.amount = e.amount; return out; }
          return v;
        };
        return `data-options="${esc(JSON.stringify(walk(data)))}"`;
      });
    }
  }
  return t;
}
export function patchHtml(html, pageProductId, diff, snap, live) {
  const { changes } = diff;
  if (pageProductId) { const c = changes.get(pageProductId); return c ? patchSegment(html, c, snap, live, pageProductId, true) : html; }
  const re = /data-(?:product|sp)-id="([^"]+)"/g, cuts = [];
  let m; while ((m = re.exec(html))) cuts.push([html.lastIndexOf('<', m.index), m[1]]);
  let out = '', pos = 0, owner = null;
  const flush = end => { const seg = html.slice(pos, end); const c = owner && changes.get(owner); out += c ? patchSegment(seg, c, snap, live, owner, false) : seg; };
  for (const [start, id] of cuts) { flush(start); pos = start; owner = id; }
  flush(html.length);
  return out;
}
function displaySet(live, id) {
  const list = (live.images.get(id) || []).filter(i => i.key.startsWith('display/'));
  const url = i => `${IMAGE_ORIGIN}/${i.key}${i.rev ? `?v=${i.rev}` : ''}`;
  const pick = list.filter(i => i.width <= 960).at(-1) || list[0];
  return list.length ? { src: url(pick), srcset: list.map(i => `${url(i)} ${i.width}w`).join(', '), full: url(list.at(-1)) } : null;
}
const statusText = { available: 'Available', sold: 'Sold', 'not-for-sale': 'Not for sale', inquiry: 'Available by inquiry', unavailable: 'Not currently available' };
// Card added to the gallery lists for a painting created in /catalog-admin/.
function addedCard(p, live) {
  const img = displaySet(live, p.id), status = live.status.get(p.id)?.status || 'available';
  const price = p.price_amount ? money(p.price_amount) : '';
  return `<li class="painting-list-row card-tile" data-product-id="${esc(p.id)}" data-availability="${esc(statusText[status] || status)}"${p.price_amount ? ` data-price="${esc(p.price_amount)}"` : ''} data-caption="${esc(p.title)}${price ? ` · ${price}` : ''}"><a href="/products/${esc(p.slug)}/" class="gallery-product-image" aria-label="View ${esc(p.title)}" tabindex="-1">${img ? `<img src="${img.src}" srcset="${img.srcset}" sizes="64px" alt="${esc(p.title)} by ${esc(p.artist || 'TJ Murphy')}" loading="lazy" decoding="async">` : ''}</a><h3><a href="/products/${esc(p.slug)}/" class="product-title-link">${esc(p.title)}</a></h3>${p.width ? `<p class="painting-list-dimensions">${esc(dimsLabel(p.width, p.height, p.unit))} (W × H)</p>` : ''}<div class="painting-list-commerce"><p class="painting-list-price">${esc(price || statusText[status] || '')}</p></div></li>`;
}
export function addCards(html, diff, live) {
  if (!diff.added.length) return html;
  const cards = diff.added.map(p => addedCard(p, live)).join('');
  const i = html.indexOf('<li class="painting-list-row');
  return i < 0 ? html : html.slice(0, i) + cards + html.slice(i);
}
// Full page for a painting added in the admin: the /about/ page shell with a product <main> and JSON-LD.
export async function renderAdded(env, p, live) {
  const shell = await (await env.ASSETS.fetch(new Request('https://tjm.art/about/'))).text();
  const img = displaySet(live, p.id), status = live.status.get(p.id)?.status || 'available', url = `https://tjm.art/products/${p.slug}/`;
  const desc = p.description || `${p.title} by ${p.artist || 'TJ Murphy'}.`;
  const ld = { '@context': 'https://schema.org', '@type': 'VisualArtwork', name: p.title, url, creator: { '@type': 'Person', name: p.artist || 'TJ Murphy' }, description: desc,
    ...(img ? { image: img.full } : {}), ...(p.medium ? { artMedium: p.medium } : {}), ...(p.year ? { dateCreated: String(p.year) } : {}),
    ...(p.width ? { width: { '@type': 'Distance', name: `${p.width} ${p.unit}` }, height: { '@type': 'Distance', name: `${p.height} ${p.unit}` } } : {}),
    ...(p.price_amount ? { offers: { '@type': 'Offer', price: p.price_amount, priceCurrency: p.currency || 'USD', url, availability: status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut' } } : {}) };
  const main = `<main class="product-page"><section class="product-detail" data-product-id="${esc(p.id)}"><figure class="product-figure">${img ? `<a class="painting-image-trigger" href="${img.full}"><img src="${img.src}" srcset="${img.srcset}" sizes="(max-width: 980px) calc(100vw - 48px), 560px" alt="${esc(p.title)} by ${esc(p.artist || 'TJ Murphy')}" fetchpriority="high"></a>` : ''}</figure><div class="product-info"><h1>${esc(p.title)}</h1>${p.medium ? `<p>${esc(p.medium)}${p.year ? `, ${p.year}` : ''}</p>` : ''}${p.width ? `<p>${esc(dimsLabel(p.width, p.height, p.unit))} (W × H)</p>` : ''}<p class="product-detail-price">${esc(p.price_amount ? money(p.price_amount) : statusText[status] || '')}</p><p>${esc(desc)}</p><p><a class="button" href="/commissions/">Ask about this painting</a></p></div></section><script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script></main>`;
  return shell.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)} — TJ Murphy</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(desc)}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta property="og:(?:url)" content=")[^"]*"/g, `$1${url}"`)
    .replace(/(<meta (?:property|name)="(?:og|twitter):title" content=")[^"]*"/g, `$1${esc(p.title)}"`)
    .replace(/(<meta (?:property|name)="(?:og|twitter):description" content=")[^"]*"/g, `$1${esc(desc)}"`)
    .replace(/(<meta (?:property|name)="(?:og|twitter):image" content=")[^"]*"/g, img ? `$1${img.full}"` : '$&')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
    .replace(/<main\b[\s\S]*<\/main>/, main);
}
// /catalog/products.json (cart metadata) with live titles, print prices and withdrawn sizes.
export function patchProductsJson(data, live) {
  for (const p of data.products) { const l = live.paintings.get(p.id); if (l) p.title = l.title; }
  data.prints = data.prints.filter(x => live.editions.get(x.id)?.enabled !== 0).map(x => { const e = live.editions.get(x.id); return e ? { ...x, amount: e.amount, title: e.title } : x; });
  for (const p of live.paintings.values()) if (p.source === 'admin' && !data.products.some(x => x.id === p.id)) {
    const img = displaySet(live, p.id);
    data.products.push({ id: p.id, slug: p.slug, title: p.title, type: p.type, listing: { status: live.status.get(p.id)?.status || 'available', price: p.price_amount ? { amount: p.price_amount, currency: p.currency || 'USD' } : null }, image: img ? { src: img.src, alt: p.title } : null });
  }
  data.liveRev = live.rev;
  return data;
}
export const BROWSER_HTML = 'public, max-age=0, must-revalidate';
export function browserCopy(hit) { const h = new Headers(hit.headers); h.set('Cache-Control', BROWSER_HTML); h.delete('Age'); return new Response(hit.body, { status: hit.status, headers: h }); }
export const CATALOG_PATHS = path => path === '/' || path === '/catalog/products.json' || /^\/(?:products|gallery)(?:\/|$)/.test(path);
export async function catalogResponse(request, env, ctx) {
  const url = new URL(request.url);
  if (request.method !== 'GET' && request.method !== 'HEAD') return env.ASSETS.fetch(request);
  const live = await liveCatalog(env);
  if (!live) return env.ASSETS.fetch(request);
  let snap; try { snap = await snapshot(env); } catch { return env.ASSETS.fetch(request); }
  const diff = diffCatalog(live, snap);
  const slug = url.pathname.match(/^\/products\/([^/]+)\/?$/)?.[1];
  const addedHere = slug && diff.added.find(p => p.slug === slug);
  const touches = addedHere || url.pathname === '/catalog/products.json' || diff.added.length || (slug ? diff.changes.has(snap.bySlug.get(slug)?.id) : diff.changes.size);
  if (!touches) return env.ASSETS.fetch(request);
  const cache = caches.default, key = new Request(`https://tjm.art/__catalog/v2/${live.rev}/${encodeURIComponent(snap.builtAt)}${url.pathname}`);
  // The edge copy (keyed by live rev + build time, so every deploy misses it) is stored with a day's TTL, but browsers
  // must always revalidate HTML: re-stamp the short browser policy on hits.
  const hit = await cache.match(key);
  if (hit) return browserCopy(hit);
  let body, type = 'text/html; charset=utf-8', base;
  if (addedHere) {
    if (url.pathname !== `/products/${slug}/`) return Response.redirect(`https://tjm.art/products/${slug}/`, 301);
    body = await renderAdded(env, addedHere, live);
  } else {
    base = await env.ASSETS.fetch(request);
    if (!base.ok || !/text\/html|application\/json/.test(base.headers.get('Content-Type') || '')) return base;
    if (url.pathname === '/catalog/products.json') { body = JSON.stringify(patchProductsJson(await base.json(), live)); type = 'application/json'; }
    else {
      const id = slug ? snap.bySlug.get(slug)?.id : null;
      body = patchHtml(await base.text(), id, diff, snap, live);
      if (!slug) body = addCards(body, diff, live);
    }
  }
  const res = new Response(body, { headers: { 'Content-Type': type, 'Cache-Control': BROWSER_HTML, 'X-Catalog-Rev': live.rev } });
  const store = new Response(res.clone().body, { headers: { ...Object.fromEntries(res.headers), 'Cache-Control': 'public, max-age=86400' } });
  // only a GET may fill the edge copy: a HEAD response has no body and would be served empty to later GETs
  if (request.method === 'GET') ctx?.waitUntil?.(cache.put(key, store));
  return res;
}
