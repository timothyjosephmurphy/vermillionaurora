import {mkdir,writeFile,rm,readFile} from 'node:fs/promises';
import {createWriteStream} from 'node:fs';
import {Readable,Transform} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {createHash,randomBytes} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import path from 'node:path';
const exec = promisify(execFile);
const scriptName = 'vermillion-archive-reader-20261012';
const api = 'https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/' + scriptName;
const apiHeaders = {Authorization:'Bearer ' + process.env.CLOUDFLARE_API_TOKEN,'Content-Type':'application/json'};
if (!process.env.CLOUDFLARE_API_TOKEN) throw Error('Media credential is not configured.');
if (process.argv.includes('--cleanup')) {
  const response = await fetch(api,{method:'DELETE',headers:apiHeaders});
  if (!response.ok && response.status !== 404) throw Error('Reader cleanup failed: HTTP ' + response.status);
  console.log('Temporary archive reader removed; bucket objects retained.');
  process.exit(0);
}
const root='.cache/painting-archive';
const temp='.cache/painting-archive-input';
await mkdir(root+'/previews',{recursive:true});
await mkdir(temp,{recursive:true});
const token = String(Date.now()+30*60_000)+'.'+randomBytes(32).toString('hex');
const worker='https://'+scriptName+'.timothyjosephmurphy.workers.dev';
async function get(route) {
  for(let attempt=0;attempt<6;attempt++){
    const response=await fetch(worker+route,{
      headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(120_000)
    });
    if(response.ok)return response;
    if(![404,429,502,503,504].includes(response.status))throw Error('Archive read failed: HTTP '+response.status);
    await response.body?.cancel();
    if(attempt===5)throw Error('Archive reader unavailable: HTTP '+response.status);
    await new Promise(resolve=>setTimeout(resolve,2000*(attempt+1)));
  }
}
try {
  const install=await fetch(api+'/secrets',{method:'PUT',headers:apiHeaders,
    body:JSON.stringify({name:'ARCHIVE_READ_TOKEN',text:token,type:'secret_text'})});
  if(!install.ok)throw Error('Cannot configure temporary archive credential: HTTP '+install.status);
  const objects=[];
  let cursor='';
  do {
    const result=await (await get('/list'+(cursor?'?cursor='+encodeURIComponent(cursor):''))).json();
    objects.push(...result.objects);
    cursor=result.truncated?result.cursor:'';
    if(objects.length>5000)throw Error('Archive exceeds the 5,000-object review limit.');
    if(result.truncated && !cursor)throw Error('Missing R2 pagination cursor.');
  } while(cursor);
  const inventory={bucket:'images',prefix:'images/Archive/',generatedAt:new Date().toISOString(),objects};
  await writeFile(root+'/inventory.json',JSON.stringify(inventory,null,2));
  const photos=objects.filter(o=>/\.(jpe?g|heic|heif)$/i.test(o.key))
    .sort((a,b)=>a.key.localeCompare(b.key,'en',{numeric:true}));
  if(!photos.length)throw Error('No JPEG or HEIC files found under images/Archive/.');
  console.log('Archive contains '+photos.length+' image files.');
  let next=0,completed=0;
  const reviewed=[];
  async function processOne(){
    while(next<photos.length){
      const order=next++;
      const object=photos[order];
      if(object.size>256*1024*1024)throw Error('Object exceeds 256 MiB review limit: '+object.key);
      const ext=path.extname(object.key).toLowerCase();
      const kind=/\.jpe?g$/i.test(ext)?'front':'back';
      const id=String(order+1).padStart(4,'0');
      const input=path.join(temp,id+ext);
      const preview='previews/'+id+'-'+kind+'.jpg';
      const response=await get('/object?key='+encodeURIComponent(object.key));
      const hash=createHash('sha256');
      const hasher=new Transform({transform(chunk,encoding,callback){hash.update(chunk);callback(null,chunk);}});
      await pipeline(Readable.fromWeb(response.body),hasher,createWriteStream(input));
      const {stdout}=await exec('python',['scripts/preview-painting-archive.py',input,path.join(root,preview),kind],{maxBuffer:1024*1024});
      const image=JSON.parse(stdout);
      await rm(input);
      const sourceUrl='https://media.vermillionaurora.com/'+object.key.split('/').map(encodeURIComponent).join('/');
      let publicStatus=null;
      if(kind==='front'){
        const check=await fetch(sourceUrl,{method:'HEAD',signal:AbortSignal.timeout(30_000)});
        publicStatus=check.status;
      }
      reviewed.push({...object,order:order+1,kind,preview,sourceUrl,publicStatus,sha256:hash.digest('hex'),...image});
      completed++;
      if(completed%25===0)console.log('Prepared '+completed+'/'+photos.length+' review previews.');
    }
  }
  const results=await Promise.allSettled([processOne(),processOne(),processOne(),processOne()]);
  reviewed.sort((a,b)=>a.order-b.order);
  await writeFile(root+'/review.json',JSON.stringify({...inventory,objects:reviewed},null,2));
  for(const result of results)if(result.status==='rejected')throw result.reason;
  console.log('PASS: '+reviewed.length+' source images inventoried and previewed.');
} finally {
  await rm(temp,{recursive:true,force:true});
  const response=await fetch(api+'/secrets/ARCHIVE_READ_TOKEN',{method:'DELETE',headers:apiHeaders});
  if(!response.ok && response.status!==404)throw Error('Temporary archive credential cleanup failed: HTTP '+response.status);
}
