import {inventory,catalogVersion} from './checkout-catalog.mjs';
const headers={'Access-Control-Allow-Origin':'https://vermillionaurora.com','Cache-Control':'no-store','Vary':'Origin'};
export async function inventoryStatus(request,env) {
 if(request.method!=='GET')return Response.json({error:'Method not allowed'},{status:405,headers});
 const ids=[...new Set((new URL(request.url).searchParams.get('ids')||'').split(','))];
 if(!ids.length||ids.length>80||ids.some(id=>!Object.hasOwn(inventory,id)))return Response.json({error:'Supply up to 80 known artwork IDs'},{status:400,headers});
 if(!env.PAINTING_STOCK)return Response.json({error:'Availability temporarily unavailable'},{status:503,headers});
 try {
  const entries=await Promise.all(ids.map(async id=>[id,inventory[id].status==='available'?await env.PAINTING_STOCK.getByName(id).status():inventory[id].status]));
  return Response.json({version:catalogVersion,availability:Object.fromEntries(entries)},{headers});
 }catch{return Response.json({error:'Availability temporarily unavailable'},{status:503,headers});}
}
