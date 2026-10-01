import {env} from 'cloudflare:workers';
import {it,expect} from 'vitest';
import {saveCommissionReferences,purgeCommissionReferences,commissionPrivacy} from '../commission-privacy.mjs';
import worker from '../commission-worker.js';
it('uses real R2 conditional writes to adopt, schedule and remove private files',async()=>{
 const id=crypto.randomUUID(),now=Date.now(),bucket=env.COMMISSION_UPLOADS;
 const key=`commissions/${id}/referenceImage.jpg`;
 await bucket.put(key,new Uint8Array([1,2,3]),{httpMetadata:{contentType:'image/jpeg'}});
 const call=body=>commissionPrivacy(new Request('https://worker.test/commission-privacy',{method:'POST',headers:{Authorization:'Bearer local-only'},body:JSON.stringify(body)}),{...env,COMMISSION_MANAGER_TOKEN:'local-only'},now);
 expect((await call({action:'adopt',id})).status).toBe(200);
 expect((await call({action:'update',id,status:'complete',completedAt:new Date(now-100*86400000).toISOString()})).status).toBe(200);
 await purgeCommissionReferences(env,now);
 expect(await bucket.head(key)).toBe(null);
 expect(await bucket.head(`commission-retention/${id}.json`)).toBe(null);
});
it('routes owner operations privately and runs the scheduled cleanup',async()=>{
 const now=Date.now(),id=crypto.randomUUID(),key=`commissions/${id}/referenceImage.jpg`;
 await saveCommissionReferences(env.COMMISSION_UPLOADS,id,[{key,originalName:'private.jpg',type:'image/jpeg',bytes:new Uint8Array([4,5])}],now-100*86400000);
 const response=await worker.fetch(new Request('https://worker.test/commission-privacy',{method:'POST',body:'{}'}),env);
 expect(response.status).toBe(404);
 const pending=[];await worker.scheduled({},env,{waitUntil:p=>pending.push(p)});await Promise.all(pending);
 expect(await env.COMMISSION_UPLOADS.head(key)).toBe(null);
});
