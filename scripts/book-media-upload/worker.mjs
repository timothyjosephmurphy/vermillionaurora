import manifest from './manifest.json';
const expected=new Map(manifest.map(o=>[o.key,o]));
export default {async fetch(request,env){
 const token=env.BOOK_MEDIA_UPLOAD_TOKEN||'',expiry=Number(token.split('.')[0]);
 if(request.method!=='PUT'||!/^\d{13}\.[a-f0-9]{64}$/.test(token)||expiry<Date.now()||expiry>Date.now()+31*60000||request.headers.get('Authorization')!==`Bearer ${token}`)return new Response('Not found',{status:404});
 const key=new URL(request.url).pathname.slice(1),spec=expected.get(key);
 if(!spec||!key.startsWith('images/book-galleries/v1/')||Number(request.headers.get('Content-Length'))!==spec.size)return new Response('Unexpected object',{status:400});
 const bytes=await request.arrayBuffer();if(bytes.byteLength!==spec.size)return new Response('Size mismatch',{status:400});
 const sha=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(n=>n.toString(16).padStart(2,'0')).join('');
 if(sha!==spec.sha256)return new Response('Digest mismatch',{status:400});
 const old=await env.BOOK_MEDIA.head(key);
 if(old&&old.customMetadata?.sha256!==sha)return new Response('Existing object differs',{status:409});
 if(!old)await env.BOOK_MEDIA.put(key,bytes,{sha256:sha,httpMetadata:{contentType:spec.contentType,cacheControl:'public, max-age=31536000, immutable'},customMetadata:{sha256:sha}});
 return Response.json({key,sha256:sha,size:bytes.byteLength});
}};
