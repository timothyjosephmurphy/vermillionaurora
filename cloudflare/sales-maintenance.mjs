import catalog from './checkout-catalog.mjs';
import { backfillCheckoutSale } from './paypal-orders.mjs';

// Deployment-only maintenance. No public export or customer information in the response.
export async function salesMaintenance(request,env) {
  const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
  if(request.method!=='POST'||!env.CHECKOUT_AUDIT_TOKEN||request.headers.get('Authorization')!==`Bearer ${env.CHECKOUT_AUDIT_TOKEN}`)return reply({error:'Not found'},404);
  if(env.PAYPAL_MODE!=='live'||!env.SALES_LEDGER||!env.SALES_ARCHIVE)return reply({error:'Sales archive is not configured'},503);
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
    for(const slug of Object.keys(catalog)) {
      stage='inventory';product=slug;checked++;
      if(await env.PAINTING_STOCK.getByName(slug).status()!=='sold')continue;
      stage='backfill';
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
