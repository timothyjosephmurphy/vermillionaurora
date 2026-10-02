import {readFile} from 'node:fs/promises';
import {randomBytes,createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
const work=process.argv[2],specs=JSON.parse(await readFile(path.join(work,'uploads.json'),'utf8'));
const api='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-book-media-upload';
const token=`${Date.now()+30*60000}.${randomBytes(32).toString('hex')}`;
const headers={Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'};
try{
 const r=await fetch(api+'/secrets',{method:'PUT',headers,body:JSON.stringify({name:'BOOK_MEDIA_UPLOAD_TOKEN',text:token,type:'secret_text'})});assert(r.ok,'Could not install short-lived upload credential');
 let cursor=0,done=0;
 async function workOne(){while(cursor<specs.length){const spec=specs[cursor++],bytes=await readFile(path.join(work,spec.file));assert.equal(createHash('sha256').update(bytes).digest('hex'),spec.sha256);
  let success=false;for(let i=0;i<6;i++){
   const response=await fetch('https://vermillion-book-media-upload.timothyjosephmurphy.workers.dev/'+spec.key,{method:'PUT',headers:{Authorization:`Bearer ${token}`,'Content-Type':spec.contentType},body:bytes,signal:AbortSignal.timeout(90000)});
   if(response.ok){const result=await response.json();assert.equal(result.sha256,spec.sha256);success=true;break;}
   if(![404,429,502,503,504].includes(response.status))throw Error(`R2 upload failed ${spec.key}: ${response.status}`);
   await new Promise(r=>setTimeout(r,3000*(i+1)));
  }assert(success,'Upload failed: '+spec.key);done++;if(done%50===0)console.log(`Uploaded ${done}/${specs.length}`);
 }}
 const results=await Promise.allSettled([workOne(),workOne(),workOne(),workOne()]);for(const r of results)if(r.status==='rejected')throw r.reason;
 // Verify the public route and bytes for each object, rather than trusting a binding alone.
 cursor=0;
 async function verify(){while(cursor<specs.length){const spec=specs[cursor++];const r=await fetch('https://media.vermillionaurora.com/'+spec.key,{signal:AbortSignal.timeout(90000)});assert(r.ok,'Public R2 object unavailable: '+spec.key);assert.equal(createHash('sha256').update(new Uint8Array(await r.arrayBuffer())).digest('hex'),spec.sha256);}}
 const checks=await Promise.allSettled([verify(),verify(),verify(),verify()]);for(const r of checks)if(r.status==='rejected')throw r.reason;
 console.log(`PASS: ${done} objects uploaded and verified through the public media domain.`);
}finally{
 const r=await fetch(api+'/secrets/BOOK_MEDIA_UPLOAD_TOKEN',{method:'DELETE',headers});assert(r.ok,'Upload credential cleanup failed');
}
