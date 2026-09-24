const INDEX_KEY = 'media-index.json';
export async function buildIndex(env) {
  const files = [];
  let cursor;
  do {
    const page = await env.MEDIA.list({limit: 1000, cursor, include: ['httpMetadata']});
    for (const object of page.objects) {
      if (object.key === INDEX_KEY || object.key.endsWith('/')) continue;
      files.push({key: object.key, url: env.PUBLIC_BASE_URL.replace(/\/$/, '') + '/' + object.key.split('/').map(encodeURIComponent).join('/'), size: object.size, uploaded: object.uploaded.toISOString(), contentType: object.httpMetadata?.contentType ?? null});
    }
    if (page.truncated && (!page.cursor || page.cursor === cursor)) throw new Error('R2 pagination did not advance');
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  return {updatedAt: new Date().toISOString(), count: files.length, files};
}
export default {
  async fetch(request, env) {
    if (!['/', '/media-index.json'].includes(new URL(request.url).pathname)) return new Response('Not found', {status:404});
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405, headers:{Allow:'GET, HEAD'}});
    try {
      const index = await buildIndex(env);
      return new Response(request.method === 'HEAD' ? null : JSON.stringify(index, null, 2), {headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Access-Control-Allow-Origin':'*'}});
    } catch (error) {
      console.error('Media index read failed', error);
      return new Response('Media index temporarily unavailable', {status:503});
    }
  },
  async scheduled(event, env) {
    const index = await buildIndex(env);
    await env.MEDIA.put(INDEX_KEY, JSON.stringify(index, null, 2), {httpMetadata:{contentType:'application/json; charset=utf-8',cacheControl:'no-cache, max-age=0, must-revalidate'}});
  }
};
