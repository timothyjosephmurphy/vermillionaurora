// /testimonials/ is a built page, and approved quotes used to arrive only after JavaScript
// fetched /testimonials/api/approved. Crawlers never saw them (studio-tracker #102).
// This runs in the website Worker on each GET: it reads that same approved list from the
// checkout Worker and writes the quotes into the HTML. An approval rebuilds
// testimonials/approved.json, so the next cache miss (60s, same as the JSON) includes it.
// No rebuild. The page script still fetches the JSON and skips ids already in the HTML.
//
// The published set is still small and family-heavy, so this is an ItemList of Quotation
// (a CreativeWork), not Review and not AggregateRating. Star snippets wait on #47.
export const TESTIMONIALS_PAGE = ['/testimonials', '/testimonials/'];

const ID = /^t-\d{8}-[0-9a-f]{12}$/;
const PHOTO = /^\/testimonials\/api\/photo\/t-\d{8}-[0-9a-f]{12}\/[0-3]$/;
const VIDEO = /^\/testimonials\/api\/video\/t-\d{8}-[0-9a-f]{12}$/;
const POSTER = /^\/testimonials\/api\/video\/t-\d{8}-[0-9a-f]{12}\/poster$/;
const HREF = /^\/products\/[a-z0-9-]{1,150}\/$/;
const VTYPE = /^video\/(?:mp4|webm)$/;

const plain = (v, n) => typeof v === 'string' ? v.replace(/\0/g, '').replace(/\r\n?/g, '\n').trim().slice(0, n) : '';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Public fields only. Email, ratings, storage keys and anything that is not a same-origin media path are dropped.
export function safeEntry(t) {
  if (!t || typeof t !== 'object' || !ID.test(t.id)) return null;
  const name = plain(t.name, 80) || 'A collector';
  const city = plain(t.city, 100);
  const painting = plain(t.painting, 200);
  const quote = plain(t.quote, 2000);
  const paintingHref = HREF.test(t.paintingHref) ? t.paintingHref : '';
  const photos = (Array.isArray(t.photos) ? t.photos : []).filter(p => PHOTO.test(p)).slice(0, 4);
  const v = t.video;
  const video = v && typeof v === 'object' && VIDEO.test(v.src) && VTYPE.test(v.type)
    ? {src: v.src, type: v.type, poster: POSTER.test(v.poster) ? v.poster : ''}
    : null;
  if (!quote && !video && !photos.length) return null;
  return {id: t.id, name, city, painting, quote, paintingHref, photos, video};
}

function cardHtml(t) {
  const who = t.name;
  const parts = [];
  const [first, ...rest] = t.photos;
  if (first) parts.push(`<img class="testimonial-photo" src="${esc(first)}" alt="${esc(`${t.painting || 'Painting by TJ Murphy'} with ${who}`)}" loading="lazy" decoding="async">`);
  if (rest.length) {
    const thumbs = rest.map((src, i) => `<li><a href="${esc(src)}" target="_blank" rel="noopener"><img src="${esc(src)}" alt="${esc(`More from ${who} (photo ${i + 2})`)}" loading="lazy" decoding="async"></a></li>`).join('');
    parts.push(`<ul class="testimonial-thumbs">${thumbs}</ul>`);
  }
  if (t.video) {
    const label = `Video from ${who}${t.painting ? ` about “${t.painting}”` : ''}`;
    const poster = t.video.poster ? ` poster="${esc(t.video.poster)}"` : '';
    parts.push(`<figure class="testimonial-video"><video controls playsinline preload="none" aria-label="${esc(label)}"${poster}><source src="${esc(t.video.src)}" type="${esc(t.video.type)}"></video><p class="video-fallback" hidden>This video can’t play in this browser. Try Safari or another device, or <a href="${esc(t.video.src)}">open the video file</a>.</p></figure>`);
  }
  if (t.quote) parts.push(`<blockquote><p>${esc(`“${t.quote}”`)}</p></blockquote>`);
  let meta = `<strong>${esc(who)}</strong>`;
  if (t.city) meta += esc(` · ${t.city}`);
  if (t.painting || t.paintingHref) {
    meta += '<br>';
    meta += t.paintingHref ? `<a href="${esc(t.paintingHref)}">${esc(t.painting || 'See the painting')}</a>` : esc(t.painting);
  }
  parts.push(`<p class="testimonial-meta"><span>${meta}</span></p>`);
  return `<li class="testimonial" id="${t.id}">${parts.join('')}</li>`;
}

function listBounds(html) {
  const open = html.match(/<ul\b[^>]*\bdata-testimonial-list\b[^>]*>/);
  if (!open) return null;
  const start = open.index + open[0].length;
  let depth = 1;
  const re = /<\/?ul\b[^>]*>/gi;
  re.lastIndex = start;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return {start, end: m.index};
  }
  return null;
}

function reveal(html) {
  return html.replace(/<([a-zA-Z0-9-]+)(\s[^>]*\bdata-has-testimonials\b[^>]*)>/g, (full, tag, attrs) => {
    const cleaned = attrs.replace(/\s+hidden(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g, '');
    return `<${tag}${cleaned}>`;
  });
}

function quoteList(entries) {
  const quotes = entries.filter(t => t.quote);
  if (!quotes.length) return '';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Collector testimonials',
    url: 'https://tjm.art/testimonials/',
    itemListElement: quotes.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Quotation',
        text: t.quote,
        author: {'@type': 'Person', name: t.name},
        ...(t.painting ? {about: {'@type': 'VisualArtwork', name: t.painting, ...(t.paintingHref ? {url: `https://tjm.art${t.paintingHref}`} : {}), creator: {'@id': 'https://tjm.art/#tj-murphy'}}} : {}),
      },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

// Returns the new HTML, or null when there is nothing safe to add or the page has no list slot.
export function injectTestimonials(html, list) {
  if (typeof html !== 'string') return null;
  const entries = (Array.isArray(list) ? list : []).map(safeEntry).filter(Boolean);
  if (!entries.length) return null;
  const bounds = listBounds(html);
  if (!bounds) return null;
  const present = new Set([...html.slice(bounds.start, bounds.end).matchAll(/\bid="(t-\d{8}-[0-9a-f]{12})"/g)].map(m => m[1]));
  const fresh = entries.filter(t => !present.has(t.id));
  let next = html.slice(0, bounds.end) + fresh.map(cardHtml).join('') + html.slice(bounds.end);
  next = reveal(next);
  const headEnd = next.indexOf('</head>');
  if (headEnd >= 0 && !next.slice(0, headEnd).includes('"@type":"ItemList"')) {
    const ld = quoteList(entries);
    if (ld) next = next.slice(0, headEnd) + ld + next.slice(headEnd);
  }
  return next;
}

export async function testimonialsPage(request, env) {
  const pageUrl = new URL(request.url);
  pageUrl.pathname = '/testimonials/';
  pageUrl.search = '';
  const asset = await env.ASSETS.fetch(new Request(pageUrl.href));
  if (!asset.ok) return asset;
  const type = asset.headers.get('content-type') || '';
  if (!type.includes('text/html')) return asset;
  let testimonials = [];
  if (env.CHECKOUT) {
    try {
      const r = await env.CHECKOUT.fetch(new Request('https://tjm.art/testimonials/api/approved', {headers: {Accept: 'application/json'}}));
      if (r.ok) {
        const data = await r.json();
        if (Array.isArray(data?.testimonials)) testimonials = data.testimonials;
      }
    } catch { /* built page still has the form; the browser script retries the list */ }
  }
  if (!testimonials.length) return asset;
  const html = await asset.text();
  let injected = null;
  try { injected = injectTestimonials(html, testimonials); } catch { injected = null; }
  if (!injected) return new Response(html, {status: asset.status, headers: asset.headers});
  const headers = new Headers(asset.headers);
  headers.delete('content-length');
  headers.delete('etag');
  headers.set('content-type', 'text/html; charset=utf-8');
  headers.set('cache-control', 'public, max-age=60, must-revalidate');
  return new Response(injected, {status: asset.status, headers});
}
