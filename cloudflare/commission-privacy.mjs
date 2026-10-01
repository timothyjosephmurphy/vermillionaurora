// Private commission references only. Never touches sales, inventory, or payment records.
const DAY=86400000;
const PREFIX='commission-retention/';
const CURSOR='commission-maintenance/cursor.json';
const ID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ORIGIN='https://vermillionaurora.com';
const headers={'Cache-Control':'no-store','Access-Control-Allow-Origin':ORIGIN,'Vary':'Origin','X-Content-Type-Options':'nosniff'};
const reply=(body,status=200)=>Response.json(body,{status,headers});
const keyFor=id=>PREFIX+id+'.json';
const allowedKey=(id,key)=>typeof key==='string'&&new RegExp(`^commissions/${id}/(referenceImage|paletteImage)\\.(jpg|png|webp|heic|heif)$`,'i').test(key);

export async function saveCommissionReferences(bucket,id,files,now=Date.now()) {
  if(!files.length)return;
  const record={id,status:'inquiry',createdAt:new Date(now).toISOString(),expiresAt:new Date(now+90*DAY).toISOString(),files:files.map(({key,originalName,type})=>({key,originalName,type}))};
  try {
    // Save the manifest first so an interrupted upload is still discoverable for cleanup.
    await bucket.put(keyFor(id),JSON.stringify(record),{httpMetadata:{contentType:'application/json'}});
    for(const f of files)await bucket.put(f.key,f.bytes,{httpMetadata:{contentType:f.type},customMetadata:{originalName:f.originalName.slice(0,200)}});
  } catch(error) {await removeCommissionReferences(bucket,record);throw error;}
}
export async function removeCommissionReferences(bucket,record) {
  if(!ID.test(record.id))throw Error('Invalid commission reference');
  const keys=record.files.map(f=>f.key);
  if(keys.some(key=>!allowedKey(record.id,key)))throw Error('Invalid upload key');
  // Delete the manifest last: a failed file deletion remains retryable.
  if(keys.length)await bucket.delete(keys);
  await bucket.delete(keyFor(record.id));
}
async function lockAndRemove(bucket,object,record,now,force=false) {
  if(!force&&Date.parse(record.expiresAt)>now)return false;
  if(!Number.isFinite(Date.parse(record.expiresAt)))return false;
  const locked=await bucket.put(keyFor(record.id),JSON.stringify({...record,status:'deleting',expiresAt:new Date(Math.min(now,Date.parse(record.expiresAt))).toISOString()}),{onlyIf:{etagMatches:object.etag},httpMetadata:{contentType:'application/json'}});
  if(!locked)return false;
  await removeCommissionReferences(bucket,record);return true;
}
export async function purgeCommissionReferences(env,now=Date.now()) {
  const bucket=env.COMMISSION_UPLOADS;
  if(!bucket)throw Error('Private commission storage is missing');
  const saved=await bucket.get(CURSOR);
  const cursor=saved?(await saved.json()).cursor:undefined;
  // Bounded work per invocation, with a persisted cursor to avoid starving later records.
  const page=await bucket.list({prefix:PREFIX,limit:200,...(cursor?{cursor}:{})});
  let removed=0;
  for(const item of page.objects) {
    const object=await bucket.get(item.key);if(!object)continue;
    const record=await object.json();
    if(await lockAndRemove(bucket,object,record,now))removed++;
  }
  if(page.truncated)await bucket.put(CURSOR,JSON.stringify({cursor:page.cursor}));
  else await bucket.delete(CURSOR);
  return {checked:page.objects.length,removed,more:page.truncated};
}
export async function commissionPrivacy(request,env,now=Date.now()) {
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization'}});
  if(request.method!=='POST'||!env.COMMISSION_MANAGER_TOKEN||request.headers.get('Authorization')!==`Bearer ${env.COMMISSION_MANAGER_TOKEN}`)return reply({error:'Not found'},404);
  const origin=request.headers.get('Origin');
  if(origin&&origin!==ORIGIN)return reply({error:'Not found'},404);
  if(!env.COMMISSION_UPLOADS)return reply({error:'Private storage unavailable'},503);
  let input;try{input=await request.json();}catch{return reply({error:'Invalid request'},400);}
  const bucket=env.COMMISSION_UPLOADS;
  try {
    if(input.action==='list') {
      const page=await bucket.list({prefix:PREFIX,limit:50,...(typeof input.cursor==='string'?{cursor:input.cursor}:{})});
      const records=[];
      for(const item of page.objects){const obj=await bucket.get(item.key);if(obj)records.push(await obj.json());}
      return reply({records,cursor:page.truncated?page.cursor:null});
    }
    if(input.action==='legacy') {
      const page=await bucket.list({prefix:'commissions/',limit:100,...(typeof input.cursor==='string'?{cursor:input.cursor}:{})});
      const ids=[...new Set(page.objects.map(x=>x.key.split('/')[1]).filter(id=>ID.test(id)))];
      const records=[];
      for(const id of ids)if(!await bucket.head(keyFor(id)))records.push({id,status:'legacy-review',files:page.objects.filter(x=>x.key.split('/')[1]===id).map(x=>({key:x.key,originalName:x.key.split('/').pop()}))});
      return reply({records,cursor:page.truncated?page.cursor:null});
    }
    if(!ID.test(input.id||''))return reply({error:'Invalid reference'},400);
    let object=await bucket.get(keyFor(input.id));
    let record=object?await object.json():null;
    if(input.action==='adopt'&&!record) {
      const page=await bucket.list({prefix:`commissions/${input.id}/`,limit:10});
      if(!page.objects.length||page.objects.some(x=>!allowedKey(input.id,x.key)))return reply({error:'Reference not found'},404);
      record={id:input.id,status:'inquiry',createdAt:new Date(now).toISOString(),expiresAt:new Date(now+90*DAY).toISOString(),legacy:true,files:page.objects.map(x=>({key:x.key,originalName:x.key.split('/').pop()}))};
      const result=await bucket.put(keyFor(input.id),JSON.stringify(record),{onlyIf:{etagDoesNotMatch:'*'},httpMetadata:{contentType:'application/json'}});
      return result?reply({record}):reply({error:'Record changed; reload'},409);
    }
    if(!record)return reply({error:'Reference not found'},404);
    if(record.status==='deleting')return reply({error:'Deletion is in progress'},409);
    if(input.action==='download') {
      const file=record.files.find(x=>x.key===input.key);
      if(!file||!allowedKey(input.id,file.key))return reply({error:'File not found'},404);
      const data=await bucket.get(file.key);if(!data)return reply({error:'File not found'},404);
      return new Response(data.body,{headers:{...headers,'Content-Type':data.httpMetadata?.contentType||'application/octet-stream','Content-Disposition':'attachment; filename="'+file.key.split('/').pop()+'"'}});
    }
    if(input.action==='delete') {
      if(input.confirm!==input.id)return reply({error:'Confirm the reference to delete'},400);
      const deleted=await lockAndRemove(bucket,object,record,now,true);
      return deleted?reply({deleted:true}):reply({error:'Record changed; reload'},409);
    }
    if(input.action==='update') {
      if(Date.parse(record.expiresAt)<=now)return reply({error:'Retention date passed; files are awaiting deletion'},409);
      const status=input.status;
      if(!['active','complete','cancelled','agreed-extension'].includes(status))return reply({error:'Invalid status'},400);
      let date;
      if(status==='complete'||status==='cancelled') {
        const completed=Date.parse(input.completedAt);
        if(!Number.isFinite(completed)||completed>now||completed<Date.parse(record.createdAt.slice(0,10)+'T00:00:00Z')&&!record.legacy)return reply({error:'Choose a valid completion or cancellation date'},400);
        date=completed+90*DAY;record.completedAt=new Date(completed).toISOString();
      } else {
        date=Date.parse(input.expiresAt);
        if(!Number.isFinite(date)||date<=now||date>now+366*DAY)return reply({error:'Choose a retention date within the next year'},400);
        if(input.agreed!==true)return reply({error:'Confirm that the retention date was agreed with the customer'},400);
        record.agreementRecordedAt=new Date(now).toISOString();
      }
      record={...record,status,expiresAt:new Date(date).toISOString()};
      const updated=await bucket.put(keyFor(record.id),JSON.stringify(record),{onlyIf:{etagMatches:object.etag},httpMetadata:{contentType:'application/json'}});
      return updated?reply({record}):reply({error:'Record changed; reload'},409);
    }
    return reply({error:'Unknown action'},400);
  } catch {return reply({error:'Reference operation failed; please retry'},503);}
}
