import {inventory,catalogVersion} from './checkout-catalog.mjs';
import {displayedStatus} from './original-availability.mjs';
import {corsOrigin} from './site-origins.mjs';
export async function inventoryStatus(request,env,ctx) {
 const headers={'Access-Control-Allow-Origin':corsOrigin(request),'Cache-Control':'no-store','Vary':'Origin'};
 if(request.method!=='GET')return Response.json({error:'Method not allowed'},{status:405,headers});
 const ids=[...new Set((new URL(request.url).searchParams.get('ids')||'').split(','))];
 if(!ids.length||ids.length>80||ids.some(id=>!Object.hasOwn(inventory,id)))return Response.json({error:'Supply up to 80 known artwork IDs'},{status:400,headers});
 if(!env.PAINTING_STOCK)return Response.json({error:'Availability temporarily unavailable'},{status:503,headers});
 // Shared 45 s edge cache: wall pages ask about 200+ works, and each uncached id costs one stock
 // Durable Object request (the account hit its daily DO limit on 2026-10-15). Checkout itself always
 // reads live stock; only this displayed status can lag by up to 45 s.
 const cache=globalThis.caches?.default,key=new Request(`https://inventory-cache.invalid/status?v=${catalogVersion}&ids=${[...ids].sort().join(',')}`);
 if(cache){try{const hit=await cache.match(key);if(hit)return new Response(hit.body,{headers:{...headers,'Content-Type':'application/json'}});}catch{}}
 try {
  const entries=await Promise.all(ids.map(async id=>{
    const stub=env.PAINTING_STOCK.getByName(id);
    if(typeof stub.summary==='function')return [id,displayedStatus(inventory[id].status,await stub.summary())];
    return [id,inventory[id].status==='available'?await stub.status():inventory[id].status];
  }));
  const body=JSON.stringify({version:catalogVersion,availability:Object.fromEntries(entries)});
  if(cache){const put=cache.put(key,new Response(body,{headers:{'Content-Type':'application/json','Cache-Control':'public, max-age=45'}})).catch(()=>{});if(ctx?.waitUntil)ctx.waitUntil(put);else await put;}
  return new Response(body,{headers:{...headers,'Content-Type':'application/json'}});
 }catch{return Response.json({error:'Availability temporarily unavailable'},{status:503,headers});}
}
