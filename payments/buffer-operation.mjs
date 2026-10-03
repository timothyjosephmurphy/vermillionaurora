import {randomBytes} from 'node:crypto';
import {readFile} from 'node:fs/promises';

const file=process.argv[2];
if(!file)throw Error('Provide the reviewed Buffer request JSON path.');
const request=JSON.parse(await readFile(file,'utf8'));
const routes={status:'/buffer/status',list:'/buffer/posts/list',create:'/buffer/posts/create'};
if(!routes[request.operation])throw Error('Unsupported Buffer operation.');
if(request.operation==='create'&&request.input?.saveToDraft===false&&request.confirmSchedule!==true)throw Error('A scheduled request requires confirmSchedule:true.');
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
 const response=await fetch(origin+routes[request.operation],{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(request.input??{}),redirect:'error',signal:AbortSignal.timeout(90000)});
 const data=await response.json();
 console.log(JSON.stringify({operation:request.operation,status:response.status,result:data},null,2));
 if(!response.ok)throw Error('Buffer operation was not confirmed; inspect the result before retrying.');
}finally{if(installed){await cf('DELETE');console.log('Temporary Buffer operation credential removed.');}}
