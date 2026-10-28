import manifest from './manifest.tjm.json';
import { MAX_BYTES, contentType, keyAllowed } from './keys.mjs';

const expected = new Map(manifest.map((object) => [object.key, object]));

async function tokenMatches(provided, expectedToken) {
  const encoder = new TextEncoder();
  const [providedHash, expectedHash] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(provided)),
    crypto.subtle.digest('SHA-256', encoder.encode(expectedToken)),
  ]);
  return crypto.subtle.timingSafeEqual(providedHash, expectedHash);
}

export default {
  async fetch(request, env) {
    const token = env.BLOG_MEDIA_UPLOAD_TOKEN || '';
    const expiry = Number(token.split('.')[0]);
    if (request.method !== 'PUT') return new Response('Upload requires PUT', { status: 404 });
    if (!/^\d{13}\.[a-f0-9]{64}$/.test(token)) return new Response('Temporary credential missing or malformed', { status: 404 });
    if (expiry < Date.now() || expiry > Date.now() + 31 * 60000) return new Response('Temporary credential expired', { status: 404 });
    if (!(await tokenMatches(request.headers.get('Authorization') || '', `Bearer ${token}`))) {
      return new Response('Temporary credential does not match', { status: 404 });
    }

    const key = new URL(request.url).pathname.slice(1);
    const spec = expected.get(key);
    const type = contentType(key);
    if (!spec || !keyAllowed(key) || !type || spec.contentType !== type || spec.size > MAX_BYTES || Number(request.headers.get('Content-Length')) !== spec.size) {
      return new Response('Unexpected object', { status: 400 });
    }

    const bytes = await request.arrayBuffer();
    if (bytes.byteLength !== spec.size) return new Response('Size mismatch', { status: 400 });
    const sha256 = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))]
      .map((value) => value.toString(16).padStart(2, '0')).join('');
    if (sha256 !== spec.sha256) return new Response('Digest mismatch', { status: 400 });

    const existing = await env.BLOG_MEDIA.head(key);
    if (existing && existing.customMetadata?.sha256 !== sha256) return new Response('Existing object differs', { status: 409 });
    if (!existing) {
      const cacheControl = key.startsWith('blog/')
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800';
      await env.BLOG_MEDIA.put(key, bytes, {
        sha256,
        httpMetadata: { contentType: type, cacheControl },
        customMetadata: { sha256 },
      });
    }
    return Response.json({ key, sha256, size: bytes.byteLength });
  },
};
