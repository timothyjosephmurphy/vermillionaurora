import catalog from './checkout-catalog.mjs';
import { backfillCheckoutSale } from './historical-sales.mjs';

const STATUS_CONCURRENCY=8;
// Deployment-only maintenance. No public export or customer information in the response.
export async function salesMaintenance(request,env) {
  const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
  if(request.method!=='POST'||!env.CHECKOUT_AUDIT_TOKEN||request.headers.get('Authorization')!==`Bearer ${env.CHECKOUT_AUDIT_TOKEN}`)return reply({error:'Not found'},404);
  if(env.CHECKOUT_MODE!=='live'||!env.SALES_LEDGER||!env.SALES_ARCHIVE)return reply({error:'Sales archive is not configured'},503);
  const url=new URL(request.url);
  if(url.searchParams.get('action')==='reset') {
    const slug=url.searchParams.get('slug');
    if(typeof slug!=='string'||!catalog[slug])return reply({error:'Painting not in checkout catalog'},404);
    try {
      // Backfill/archive the completed sale before clearing the stock row.
      const archived=await backfillCheckoutSale(env,slug);
      const result=await env.PAINTING_STOCK.getByName(slug).resetForRelisting();
      return reply({slug,archived,result});
    } catch {
      return reply({error:'Painting could not be safely relisted; existing payment records are preserved'},409);
    }
  }

  let stage='inventory',product=null,checked=0;
  try {
    const periods=new Set();let backfilled=0;
    // Stock status is read-only, so check it a few at a time: one-by-one round trips took ~67 s for
    // 148 paintings and began exceeding the 90 s post-deploy timeout. Backfills stay sequential, in catalog order.
    const slugs=Object.keys(catalog),sold=new Array(slugs.length).fill(false);let next=0;
    await Promise.all(Array.from({length:Math.min(STATUS_CONCURRENCY,slugs.length)},async()=>{
      while(next<slugs.length){const i=next++;product=slugs[i];checked++;sold[i]=await env.PAINTING_STOCK.getByName(slugs[i]).status()==='sold';}
    }));
    for(const [i,slug] of slugs.entries()) {
      if(!sold[i])continue;
      stage='backfill';product=slug;
      const result=await backfillCheckoutSale(env,slug);
      if(result.recorded){periods.add(result.period);backfilled++;}
    }
    const archives=[];
    stage='archive';product=null;
    for(const period of periods)archives.push(await env.SALES_LEDGER.getByName(`live:${period}`).archiveNow());
    return reply({ready:archives.every(x=>x.archived),backfilled,archives});
  }catch(error){ return reply({error:'Sales archive verification failed; existing payment records are preserved',stage,product,checked,
    failure:/Verified IPN sale receipt/.test(error.message)?'missing-ipn-receipt':/Historical capture validation/.test(error.message)?'historical-capture-mismatch':/Too many/.test(error.message)?'request-limit':/Conflicting payment/.test(error.message)?'conflicting-payment':Number.isInteger(error.status)?`provider-http-${error.status}`:'archive-operation-failed'},503); }
}
