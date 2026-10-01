import test from 'node:test';
import assert from 'node:assert/strict';
import {commissionPrivacy,saveCommissionReferences,purgeCommissionReferences} from './commission-privacy.mjs';
import {commissionForm} from './commission-form.mjs';
const DAY=86400000,now=Date.parse('2026-10-01T12:00:00Z');
const id='12345678-1234-1234-1234-123456789abc';
const second='22345678-1234-1234-1234-123456789abc';
const file=(ref=id)=>({key:`commissions/${ref}/referenceImage.jpg`,originalName:'portrait.jpg',type:'image/jpeg',bytes:new Uint8Array([1,2,3])});
class Bucket {
 data=new Map();seq=0;failDelete=false;
 async put(key,value,options={}){const prev=this.data.get(key);if(options.onlyIf?.etagMatches&&prev?.etag!==options.onlyIf.etagMatches)return null;if(options.onlyIf?.etagDoesNotMatch==='*'&&prev)return null;const item={key,value,etag:String(++this.seq),...options};this.data.set(key,item);return item;}
 async get(key){const item=this.data.get(key);if(!item)return null;return {...item,body:item.value,json:async()=>JSON.parse(item.value)};}
 async head(key){return this.data.get(key)||null;}
 async delete(keys){if(this.failDelete&&Array.isArray(keys))throw Error('Temporary storage fault');for(const key of Array.isArray(keys)?keys:[keys])this.data.delete(key);}
 async list({prefix='',limit=1000,cursor}){const all=[...this.data.values()].filter(x=>x.key.startsWith(prefix)).sort((a,b)=>a.key.localeCompare(b.key));const remaining=all.filter(x=>!cursor||x.key>cursor),objects=remaining.slice(0,limit);return {objects,truncated:remaining.length>limit,cursor:objects.at(-1)?.key};}
}
const setup=()=>({COMMISSION_UPLOADS:new Bucket(),COMMISSION_MANAGER_TOKEN:'test-owner-token'});
const call=(env,body,at=now,token='test-owner-token',origin='https://vermillionaurora.com')=>commissionPrivacy(new Request('https://worker.test/commission-privacy',{method:'POST',headers:{Authorization:`Bearer ${token}`,Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)}),env,at);
test('private management fails closed, including other origins; no customer email in storage',async()=>{
 const env=setup();await saveCommissionReferences(env.COMMISSION_UPLOADS,id,[file()],now);
 assert.equal((await call(env,{action:'list'},now,'wrong')).status,404);
 assert.equal((await call(env,{action:'list'},now,undefined,'https://other.test')).status,404);
 const r=await call(env,{action:'list'});assert.equal(r.headers.get('Cache-Control'),'no-store');assert.equal((await r.json()).records.length,1);
 assert.equal(env.COMMISSION_UPLOADS.data.get(file().key).customMetadata.customerEmail,undefined);
 assert.equal((await call(env,{action:'download',id,key:'sales/private.json'})).status,404);
 const download=await call(env,{action:'download',id,key:file().key});assert.equal(download.headers.get('Content-Disposition'),'attachment; filename="referenceImage.jpg"');
});
test('expiry deletes only due references, preserving active projects, legacy uploads and sales',async()=>{
 const env=setup(),b=env.COMMISSION_UPLOADS;
 await saveCommissionReferences(b,id,[file()],now-91*DAY);await saveCommissionReferences(b,second,[file(second)],now);
 await b.put('commissions/legacy/referenceImage.jpg','old');await b.put('sales/2026.json','accounting');
 const result=await purgeCommissionReferences(env,now);assert.equal(result.removed,1);assert.equal(await b.get(file().key),null);assert.ok(await b.get(file(second).key));assert.ok(await b.get('sales/2026.json'));assert.ok(await b.get('commissions/legacy/referenceImage.jpg'));
});
test('completion uses actual date plus 90 days; active extensions require recorded agreement',async()=>{
 const env=setup();await saveCommissionReferences(env.COMMISSION_UPLOADS,id,[file()],now-30*DAY);
 assert.equal((await call(env,{action:'update',id,status:'active',expiresAt:new Date(now+60*DAY).toISOString()})).status,400);
 assert.equal((await call(env,{action:'update',id,status:'active',expiresAt:new Date(now+60*DAY).toISOString(),agreed:true})).status,200);
 const res=await call(env,{action:'update',id,status:'complete',completedAt:new Date(now-2*DAY).toISOString()});assert.equal((await res.json()).record.expiresAt,new Date(now+88*DAY).toISOString());
 assert.equal((await purgeCommissionReferences(env,now+87*DAY)).removed,0);assert.equal((await purgeCommissionReferences(env,now+89*DAY)).removed,1);
});
test('cleanup retries after interrupted deletion and rejects reopening a locked record',async()=>{
 const env=setup(),b=env.COMMISSION_UPLOADS;await saveCommissionReferences(b,id,[file()],now);b.failDelete=true;
 assert.equal((await call(env,{action:'delete',id,confirm:id})).status,503);assert.ok(await b.get('commission-retention/'+id+'.json'));
 assert.equal((await call(env,{action:'update',id,status:'active',expiresAt:new Date(now+DAY).toISOString(),agreed:true})).status,409);
 b.failDelete=false;assert.equal((await purgeCommissionReferences(env,now+1)).removed,1);
});
test('concurrent retention update wins over a stale cleanup read',async()=>{
 const env=setup(),b=env.COMMISSION_UPLOADS;await saveCommissionReferences(b,id,[file()],now-91*DAY);
 const put=b.put.bind(b);let raced=false;
 b.put=async(key,value,options)=>{if(options?.onlyIf?.etagMatches&&!raced){raced=true;const r=JSON.parse(value);await put(key,JSON.stringify({...r,status:'active',expiresAt:new Date(now+DAY).toISOString()}));}return put(key,value,options);};
 assert.equal((await purgeCommissionReferences(env,now)).removed,0);assert.ok(await b.get(file().key));
});
test('legacy references require explicit adoption and are then manageable',async()=>{
 const env=setup(),b=env.COMMISSION_UPLOADS;await b.put(file().key,file().bytes);
 assert.equal((await (await call(env,{action:'legacy'})).json()).records[0].id,id);
 assert.equal((await call(env,{action:'adopt',id})).status,200);
 assert.equal((await call(env,{action:'update',id,status:'complete',completedAt:new Date(now-120*DAY).toISOString()})).status,200);
 assert.equal((await purgeCommissionReferences(env,now)).removed,1);
});
test('bounded cleanup advances across pages and returns to the start',async()=>{
 const env=setup(),b=env.COMMISSION_UPLOADS;
 for(let i=0;i<202;i++){const ref=i.toString(16).padStart(8,'0')+'-1234-1234-1234-123456789abc';await saveCommissionReferences(b,ref,[file(ref)],now-91*DAY);}
 const a=await purgeCommissionReferences(env,now),c=await purgeCommissionReferences(env,now);assert.equal(a.removed,200);assert.equal(a.more,true);assert.equal(c.removed,2);assert.equal(c.more,false);
});
function submission(two=false){const f=new FormData();f.set('name','Test customer');f.set('email','test@example.com');f.set('description','A private commission');f.set('referenceImage',new File(['private bytes'],'test.jpg',{type:'image/jpeg'}));if(two)f.set('paletteImage',new File(['bad'],'bad.svg',{type:'image/svg+xml'}));return new Request('https://worker.test/',{method:'POST',headers:{Origin:'https://vermillionaurora.com'},body:f});}
test('invalid second upload leaves no orphan files and sends no email',async()=>{
 const env=setup();const response=await commissionForm(submission(true),env);assert.equal(response.status,400);assert.equal(env.COMMISSION_UPLOADS.data.size,0);
});
test('new commission emails contain no image attachment, and send failures roll back storage',async t=>{
 const env=setup();let mime='';
 t.mock.method(globalThis,'fetch',async(url,options)=>{if(String(url).includes('/token'))return Response.json({access_token:'mock'});mime=Buffer.from(JSON.parse(options.body).raw,'base64url').toString();return Response.json({id:'mock-message'});});
 assert.equal((await commissionForm(submission(),env)).status,200);assert.match(mime,/commission-manager/);assert.doesNotMatch(mime,/Content-Disposition: attachment|private bytes/);assert.equal(env.COMMISSION_UPLOADS.data.size,2);
 const failed=setup();globalThis.fetch=async()=>Response.json({error:'mock'},{status:500});assert.equal((await commissionForm(submission(),failed)).status,500);assert.equal(failed.COMMISSION_UPLOADS.data.size,0);
});
