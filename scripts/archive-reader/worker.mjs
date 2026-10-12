const PREFIX = 'images/Archive/';
export default {
  async fetch(request, env) {
    const token = env.ARCHIVE_READ_TOKEN || '';
    const expiry = Number(token.split('.')[0]);
    if (request.method !== 'GET' || !/^\d{13}\.[a-f0-9]{64}$/.test(token)
        || expiry < Date.now() || expiry > Date.now() + 31 * 60_000
        || request.headers.get('Authorization') !== 'Bearer ' + token) {
      return new Response('Not found', {status:404});
    }
    const url = new URL(request.url);
    if (url.pathname === '/list') {
      const result = await env.ARCHIVE.list({
        prefix:PREFIX, limit:1000, cursor:url.searchParams.get('cursor') || undefined
      });
      return Response.json({
        objects:result.objects.map(({key,size,etag,uploaded})=>({key,size,etag,uploaded})),
        truncated:result.truncated, cursor:result.truncated ? result.cursor : null
      }, {headers:{'Cache-Control':'no-store'}});
    }
    const key = url.searchParams.get('key');
    if (url.pathname !== '/object' || !key || !key.startsWith(PREFIX)
        || !/\.(jpe?g|heic|heif)$/i.test(key)) {
      return new Response('Not found', {status:404});
    }
    const object = await env.ARCHIVE.get(key);
    if (!object) return new Response('Not found', {status:404});
    return new Response(object.body, {headers:{
      'Content-Type':'application/octet-stream',
      'Content-Length':String(object.size),
      'Cache-Control':'no-store',
      'ETag':object.httpEtag
    }});
  }
};
