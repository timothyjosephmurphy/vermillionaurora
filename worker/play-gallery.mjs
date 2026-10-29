// Production /play entry is the hex tag gallery. The browser stays on tjm.art.
// Static _redirects cannot proxy an external host, so this Worker fetches the
// hex build and returns it. Quake files under static/play stay frozen: a path
// that still exists here (orsay, /play/g, to-cart.html) is served from assets.
// A miss (hex JS, PBR, plaques) comes from the hex build. /play, /play/ and
// /play/index.html are always the hex entry, even though the Quake shell file
// is still in the tree.
export const HEX_PLAY_ORIGIN = 'https://preview-251.tjm-tag-gallery-preview.pages.dev';
export const PLAY_WORKER_FIRST = ['/play', '/play/*'];

const ENTRY = new Set(['/play', '/play/', '/play/index.html']);
const STRIP_REQUEST = new Set(['cookie', 'authorization', 'host']);

export function playR2Redirect(pathname, search = '') {
  const match = /^\/play\/(holo|books)\/(.*)$/.exec(pathname);
  if (!match) return null;
  return `https://img.tjm.art/play/${match[1]}/${match[2]}${search}`;
}

export function hexPlayUrl(requestUrl) {
  const incoming = new URL(requestUrl);
  const upstream = new URL(incoming.pathname + incoming.search, HEX_PLAY_ORIGIN);
  if (upstream.origin !== HEX_PLAY_ORIGIN || upstream.pathname !== incoming.pathname) {
    throw new Error('play proxy refused a path outside the hex gallery');
  }
  return upstream;
}

function rewriteLocation(location, incoming) {
  if (!location) return null;
  try {
    const next = new URL(location, HEX_PLAY_ORIGIN);
    if (next.origin !== HEX_PLAY_ORIGIN) return location;
    const local = new URL(incoming);
    return `${local.origin}${next.pathname}${next.search}${next.hash}`;
  } catch {
    return location;
  }
}

export async function proxyHexPlay(request, fetcher = fetch) {
  let upstream;
  try { upstream = hexPlayUrl(request.url); } catch {
    return new Response('The 3D gallery is temporarily unavailable.', { status: 502, headers: { 'cache-control': 'no-store' } });
  }
  const headers = new Headers();
  for (const [key, value] of request.headers) {
    if (STRIP_REQUEST.has(key.toLowerCase())) continue;
    headers.set(key, value);
  }
  const method = request.method;
  const init = { method, headers, redirect: 'manual' };
  if (method !== 'GET' && method !== 'HEAD') {
    init.body = request.body;
    init.duplex = 'half';
  }
  let res;
  try { res = await fetcher(upstream.toString(), init); } catch {
    return new Response('The 3D gallery is temporarily unavailable.', { status: 502, headers: { 'cache-control': 'no-store' } });
  }
  const out = new Headers(res.headers);
  const location = rewriteLocation(out.get('location'), request.url);
  if (location) out.set('location', location);
  out.delete('set-cookie');
  // Workers fetch already decompresses. Leaving these on would make the browser decode twice.
  out.delete('content-encoding');
  out.delete('content-length');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: out });
}

const moved = (location) => new Response(null, { status: 301, headers: { Location: location, 'Cache-Control': 'public, max-age=3600' } });

export async function playGallery(request, env = {}, fetcher = fetch) {
  const url = new URL(request.url);
  const r2 = playR2Redirect(url.pathname, url.search);
  if (r2) return moved(r2);
  const load = env.HEX_FETCH || fetcher;
  if (ENTRY.has(url.pathname)) return proxyHexPlay(request, load);
  if (env.ASSETS) {
    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404) return asset;
    try { await asset.body?.cancel?.(); } catch { /* the 404 page is unused */ }
  }
  return proxyHexPlay(request, load);
}
