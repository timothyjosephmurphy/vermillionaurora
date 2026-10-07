// Website origins for the checkout Worker. PRIMARY_SITE is used in links and payment return URLs;
// every origin in SITE_ORIGINS is accepted for CORS while the site moves from vermillionaurora.com to tjm.art.
export const PRIMARY_SITE = 'https://tjm.art';
export const SITE_ORIGINS = ['https://tjm.art', 'https://vermillionaurora.com'];
export const isSiteOrigin = (origin, origins = SITE_ORIGINS) => origins.includes(origin);
// CORS answers with the caller's Origin when it is allowed, otherwise with the primary origin.
export const corsOrigin = (request, origins = SITE_ORIGINS, fallback = origins === SITE_ORIGINS ? PRIMARY_SITE : origins[0]) => {
  const origin = request?.headers?.get('Origin');
  return isSiteOrigin(origin, origins) ? origin : fallback;
};
// Sets Access-Control-Allow-Origin on a finished response (keeps module-level header objects request-independent).
export const withCors = (request, response, origins = SITE_ORIGINS) => {
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', corsOrigin(request, origins));
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
};
