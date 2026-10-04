import {randomBytes} from 'node:crypto';
import {readFile} from 'node:fs/promises';

const file=process.argv[2];
if(!file)throw Error('Provide the reviewed Buffer request JSON path.');
const request=JSON.parse(await readFile(file,'utf8'));
const routes={status:'/buffer/status',list:'/buffer/posts/list',create:'/buffer/posts/create'};
const batch=request.operation==='batch-create';
if(!routes[request.operation]&&!batch)throw Error('Unsupported Buffer operation.');
if(['create','batch-create'].includes(request.operation)&&request.confirmSchedule!==true)throw Error('A scheduled request requires confirmSchedule:true.');
const inputs=batch?request.posts:[request.input??{}];
if(batch&&(!Array.isArray(inputs)||!inputs.length||inputs.length>20))throw Error('batch-create requires 1 to 20 reviewed post inputs.');
for(const input of inputs){
 if(['create','batch-create'].includes(request.operation)&&(input.saveToDraft!==false||!input.dueAt||Date.parse(input.dueAt)<=Date.now()))throw Error('Each reviewed create must be a future scheduled post.');
}
const origin='https://vermillion-commissions.timothyjosephmurphy.workers.dev';
const endpoint='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-commissions/secrets';
const name='BUFFER_OPERATIONS_TOKEN',token=randomBytes(32).toString('hex');
const cf=async(method,body)=>{
 const response=await fetch(endpoint+(method==='DELETE'?`/${name}`:''),{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(20000)});
 const data=await response.json();if(!response.ok||!data.success)throw Error(`Buffer operation credential ${method} failed: HTTP ${response.status}`);
};
let installed=false;
try{
 await cf('PUT',{name,text:token,type:'secret_text'});installed=true;
 const call=(path,input={})=>fetch(origin+path,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(input),redirect:'error',signal:AbortSignal.timeout(90000)});
 let ready;
 for(let attempt=0;attempt<10;attempt++){
  ready=await call('/buffer/status');
  if(ready.status!==404)break;
  if(attempt<9)await new Promise(resolve=>setTimeout(resolve,2000));
 }
 if(!ready.ok){
  const data=await ready.json();console.log(JSON.stringify({operation:'status',status:ready.status,result:data},null,2));
  throw Error('Buffer API readiness was not confirmed.');
 }
 if(request.operation==='status'){
  const data=await ready.json();console.log(JSON.stringify({operation:request.operation,status:ready.status,result:data},null,2));
 }else if(request.operation==='batch-create'){
  const results=[];
  for(const input of inputs){
   const response=await call(routes.create,input);
   const data=await response.json();
   const item={idempotencyKey:input.idempotencyKey,status:response.status,result:data};
   results.push(item);console.log(JSON.stringify({operation:'batch-create-item',...item}));
   if(!response.ok)throw Error('A Buffer create was not confirmed; inspect the queue and prior results before retrying.');
  }
  console.log(JSON.stringify({operation:request.operation,scheduled:results.length},null,2));
 }else{
  let response;
  if(request.operation==='list'){
   // Buffer secrets can take a moment to propagate between Cloudflare edges.
   // Retrying this read-only request cannot create duplicate posts.
   for(let attempt=0;attempt<5;attempt++){
    response=await call(routes.list,request.input??{});
    if(response.status!==404)break;
    if(attempt<4)await new Promise(resolve=>setTimeout(resolve,1500));
   }
  }else response=await call(routes[request.operation],request.input??{});
  const data=await response.json();
  console.log(JSON.stringify({operation:request.operation,status:response.status,result:data},null,2));
  if(!response.ok)throw Error('Buffer operation was not confirmed; inspect the result before retrying.');
 }
}finally{if(installed){await cf('DELETE');console.log('Temporary Buffer operation credential removed.');}}
