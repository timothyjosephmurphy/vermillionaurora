// Browser security headers for HTML responses (studio-tracker #802).
// Static pages get the same values from static/_headers (copied to dist/_headers).
// The Worker adds them to HTML it builds itself (catalog patches, /play proxy,
// testimonials injection). Report-Only CSP never blocks a live request.
//
// /play/ loads each gallery in a same-origin iframe (/play/g/<id>/).
// X-Frame-Options SAMEORIGIN and frame-ancestors 'self' allow that frame
// and refuse embedding from other sites.
// camera=(self) and microphone=(self) keep /neural-dance/ and /neural-dance/live/ working.

export const HSTS = 'max-age=31536000; includeSubDomains';
export const CONTENT_TYPE_OPTIONS = 'nosniff';
export const REFERRER_POLICY = 'strict-origin-when-cross-origin';
export const FRAME_OPTIONS = 'SAMEORIGIN';
// The book pages embed the "Read the book" PDF from media.vermillionaurora.com in an iframe (frame-src).
export const CSP_REPORT_PATH = '/csp-report';
export const CSP_REPORT_GROUP = 'csp-endpoint';
export const REPORTING_ENDPOINTS = `${CSP_REPORT_GROUP}="${CSP_REPORT_PATH}"`;
export const PERMISSIONS_POLICY = 'camera=(self), microphone=(self), geolocation=()';

// Audited from src/, static/, worker/, payments/cart.js, and neural-dance/:
// inline JSON-LD and Astro/page scripts, Neural Dance WASM, Square Web Payments
// SDK + Apple Pay JS, Cloudflare Web Analytics, Leaflet, heic2any, YouTube and
// Google Maps frames, exhibition photos, OpenStreetMap tiles, the blog feed,
// and the cart's off-host checkout fallback.
export const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://web.squarecdn.com https://sandbox.web.squarecdn.com https://js.squareup.com https://js.squareupsandbox.com https://applepay.cdn-apple.com https://static.cloudflareinsights.com https://unpkg.com https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://unpkg.com https://web.squarecdn.com https://sandbox.web.squarecdn.com https://*.squarecdn.com",
  "img-src 'self' data: blob: https://img.tjm.art https://media.vermillionaurora.com https://vermillionaurora.com https://i.ytimg.com https://tile.openstreetmap.org https://*.squareup.com https://*.squareupsandbox.com https://*.squarecdn.com https://static.cloudflareinsights.com",
  "font-src 'self' data: https://*.squarecdn.com",
  "media-src 'self' blob: mediastream: data: https://img.tjm.art https://media.vermillionaurora.com",
  "connect-src 'self' wss://tjm.art ws://localhost:* ws://127.0.0.1:* blob: data: https://img.tjm.art https://media.vermillionaurora.com https://pay.tjm.art https://vermillion-nostr-publisher.timothyjosephmurphy.workers.dev https://vermillion-commissions.timothyjosephmurphy.workers.dev https://*.squareup.com https://*.squareupsandbox.com https://*.squarecdn.com https://pci-connect.squareup.com https://pci-connect.squareupsandbox.com https://applepay.cdn-apple.com https://*.apple.com https://cloudflareinsights.com https://static.cloudflareinsights.com https://tile.openstreetmap.org https://cdn.jsdelivr.net",
  "frame-src 'self' https://media.vermillionaurora.com https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://pay.tjm.art https://web.squarecdn.com https://sandbox.web.squarecdn.com https://connect.squareup.com https://connect.squareupsandbox.com https://*.squareup.com https://*.apple.com",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self' https://pay.tjm.art https://*.squareup.com",
  "object-src 'none'",
  // Safari logs an error for a report-only policy with nowhere to send reports. report-to names the
  // Reporting-Endpoints group below; report-uri covers browsers without the Reporting API.
  `report-uri ${CSP_REPORT_PATH}`,
  `report-to ${CSP_REPORT_GROUP}`,
].join('; ');

export const SITE_SECURITY_HEADERS = {
  'Strict-Transport-Security': HSTS,
  'X-Content-Type-Options': CONTENT_TYPE_OPTIONS,
  'Referrer-Policy': REFERRER_POLICY,
  'X-Frame-Options': FRAME_OPTIONS,
  'Permissions-Policy': PERMISSIONS_POLICY,
  'Content-Security-Policy-Report-Only': CSP_REPORT_ONLY,
  'Reporting-Endpoints': REPORTING_ENDPOINTS,
};

// HTML the Worker constructs. Existing X-Frame-Options (catalog admin DENY) and
// Referrer-Policy stay. Asset responses that only pass through ASSETS.fetch are
// left untouched; static/_headers covers those.
export function withSiteSecurityHeaders(response) {
  if (!response) return response;
  const type = response.headers.get('content-type') || '';
  if (!type.toLowerCase().includes('text/html')) return response;
  const headers = new Headers(response.headers);
  headers.set('Strict-Transport-Security', HSTS);
  headers.set('X-Content-Type-Options', CONTENT_TYPE_OPTIONS);
  if (!headers.has('Referrer-Policy')) headers.set('Referrer-Policy', REFERRER_POLICY);
  if (!headers.has('X-Frame-Options')) headers.set('X-Frame-Options', FRAME_OPTIONS);
  headers.set('Permissions-Policy', PERMISSIONS_POLICY);
  headers.set('Content-Security-Policy-Report-Only', CSP_REPORT_ONLY);
  headers.set('Reporting-Endpoints', REPORTING_ENDPOINTS);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// Collector for report-only CSP violations: logs a compact summary (visible in Worker traces) and
// answers 204. Never echoes the body, never stores it, and caps what it reads.
export async function handleCspReport(request) {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  const type = (request.headers.get('content-type') || '').toLowerCase();
  if (!/application\/(csp-report|reports\+json|json)/.test(type)) return new Response(null, { status: 415 });
  try {
    const text = (await request.text()).slice(0, 16384);
    const parsed = JSON.parse(text);
    const reports = (Array.isArray(parsed) ? parsed.map(r => r?.body) : [parsed?.['csp-report']]).filter(Boolean).slice(0, 10);
    for (const r of reports) {
      const directive = r.effectiveDirective || r['effective-directive'] || r['violated-directive'] || '';
      const blocked = String(r.blockedURL || r['blocked-uri'] || '').slice(0, 200);
      const page = String(r.documentURL || r['document-uri'] || '').split(/[?#]/)[0].slice(0, 200);
      console.log(JSON.stringify({ csp: 'report-only', directive, blocked, page }));
    }
  } catch { /* Malformed reports are ignored. */ }
  return new Response(null, { status: 204 });
}
