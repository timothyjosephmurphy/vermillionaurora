import {authorized} from './etsy-connection.mjs';

export const BUFFER_ORIGIN='https://vermillion-commissions.timothyjosephmurphy.workers.dev';
const encoder=new TextEncoder();
const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const sha=async text=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(text))),v=>v.toString(16).padStart(2,'0')).join('');
const fail=(message,status=400)=>Object.assign(new Error(message),{status});
const quote=JSON.stringify;
const services=new Set(['facebook','instagram','twitter','x']);
const states=new Set(['draft','scheduled','sent','error']);
const hosts=new Set(['vermillionaurora.com','media.vermillionaurora.com']);

function clean(message,env){
 let value=String(message||'Buffer request failed.');
 for(const key of ['BUFFER_API_TOKEN','BUFFER_OPERATIONS_TOKEN','COMMISSION_MANAGER_TOKEN'])if(env[key])value=value.replaceAll(env[key],'[redacted]');
 return value.slice(0,350);
}
async function graphql(env,query){
 let response,data;
 try{
  response=await fetch('https://api.buffer.com',{method:'POST',redirect:'manual',headers:{Authorization:`Bearer ${env.BUFFER_API_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({query}),signal:AbortSignal.timeout(20000)});
 }catch{throw fail('Buffer network response could not be confirmed. Check the queue before repeating a write.',502);}
 if(response.status>=300&&response.status<400)throw fail(`Buffer returned an unexpected HTTP ${response.status} redirect.`,502);
 try{data=await response.json();}catch{throw fail(`Buffer returned a non-JSON response: HTTP ${response.status}, content type ${response.headers.get('Content-Type')||'unknown'}.`,502);}
 if(!response.ok||data.errors?.length)throw fail(clean(data.errors?.[0]?.message||`Buffer returned HTTP ${response.status}.`,env),502);
 if(!data.data)throw fail('Buffer returned an invalid response.',502);
 return data.data;
}
async function channels(env){
 const data=await graphql(env,'query { account { organizations { id } } }');
 if(!Array.isArray(data.account?.organizations)||data.account.organizations.length>10)throw fail('Buffer organization response is invalid.',502);
 const result=[];
 for(const organization of data.account.organizations){
  const d=await graphql(env,`query { channels(input:{organizationId:${quote(organization.id)}}) { id name displayName service isQueuePaused } }`);
  if(!Array.isArray(d.channels))throw fail('Buffer channel response is invalid.',502);
  result.push(...d.channels.map(c=>({id:c.id,name:c.name,displayName:c.displayName,service:c.service,isQueuePaused:c.isQueuePaused,organizationId:organization.id})));
 }
 return result;
}
async function body(request){
 const text=await request.text();if(encoder.encode(text).length>24000)throw fail('Request is too large.',413);
 try{const value=JSON.parse(text||'{}');if(!value||Array.isArray(value)||typeof value!=='object')throw Error();return value;}catch{throw fail('A JSON object is required.');}
}
function createInput(input,channel,now){
 if(typeof input.idempotencyKey!=='string'||!/^[-a-zA-Z0-9_]{8,100}$/.test(input.idempotencyKey))throw fail('A stable idempotencyKey of 8–100 letters, digits, underscores or hyphens is required.');
 if(typeof input.text!=='string'||!input.text.trim()||input.text.length>5000)throw fail('Post text is required and must be at most 5,000 characters.');
 const urls=input.imageUrls??[];
 if(!Array.isArray(urls)||urls.length>10)throw fail('Provide at most ten image URLs.');
 for(const image of urls){
  let u;try{u=new URL(image);}catch{throw fail('Image URL is invalid.');}
  if(u.protocol!=='https:'||!hosts.has(u.hostname)||u.port||u.username||u.password||u.search||u.hash||!/^\/.*\.(?:jpe?g|png|webp)$/i.test(u.pathname))throw fail('Images must be public HTTPS image files on your website or media domain.');
 }
 if(channel.service==='instagram'&&!urls.length)throw fail('Instagram posts require an image.');
 if(['twitter','x'].includes(channel.service)){
  if(urls.length>4)throw fail('X posts support at most four images.');
  // Buffer enforces the platform limit too; count URLs using X's 23-character length.
  if(Array.from(input.text.replace(/https?:\/\/\S+/g,'x'.repeat(23))).length>280)throw fail('X post text exceeds 280 characters.');
 }
 if(input.saveToDraft!==undefined&&typeof input.saveToDraft!=='boolean')throw fail('saveToDraft must be a boolean.');
 const saveToDraft=input.saveToDraft!==false;
 if(!saveToDraft&&(!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(input.dueAt||'')||!Number.isFinite(Date.parse(input.dueAt))||Date.parse(input.dueAt)<=now))throw fail('Scheduling requires a future dueAt in UTC ISO 8601 format.');
 if(!saveToDraft&&channel.isQueuePaused)throw fail('The selected Buffer channel queue is paused.');
 return {channelId:channel.id,text:input.text,imageUrls:urls,saveToDraft,...(!saveToDraft?{dueAt:new Date(input.dueAt).toISOString()}:{})};
}
async function create(env,input,all,now){
 const channel=all.find(c=>c.id===input.channelId&&services.has(c.service));if(!channel)throw fail('Select a connected Facebook, Instagram or X channel.');
 const value=createInput(input,channel,now),fingerprint=await sha(JSON.stringify(value));
 const key=`buffer/operations/${await sha(input.idempotencyKey)}.json`;
 const prior=await env.COMMISSION_UPLOADS.get(key);
 if(prior){
  const record=await prior.json();if(record.fingerprint!==fingerprint)throw fail('This idempotencyKey was already used for a different post.',409);
  if(record.state==='complete')return {...record.result,replayed:true};
  throw fail('This operation is pending or unconfirmed. Check Buffer posts before starting another write.',409);
 }
 const pending=await env.COMMISSION_UPLOADS.put(key,JSON.stringify({fingerprint,state:'pending',channelId:channel.id,createdAt:new Date(now).toISOString()}),{onlyIf:{etagDoesNotMatch:'*'}});
 if(!pending)throw fail('This operation is already in progress.',409);
 // Once reserved, never automatically repeat a provider mutation after timeout or storage failure.
 const fields=[`text:${quote(value.text)}`,`channelId:${quote(channel.id)}`,'schedulingType:automatic',`mode:${value.saveToDraft?'addToQueue':'customScheduled'}`,`saveToDraft:${value.saveToDraft}`];
 if(channel.service==='facebook')fields.push('metadata:{facebook:{type:post}}');
 if(channel.service==='instagram')fields.push('metadata:{instagram:{type:post,shouldShareToFeed:true}}');
 if(value.dueAt)fields.push(`dueAt:${quote(value.dueAt)}`);
 if(value.imageUrls.length)fields.push(`assets:[${value.imageUrls.map(url=>`{image:{url:${quote(url)}}}`).join(',')}]`);
 const data=await graphql(env,`mutation { createPost(input:{${fields.join(',')}}) { __typename ... on PostActionSuccess { post { id text channelId dueAt status } } ... on MutationError { message } } }`);
 const action=data.createPost;
 if(action?.__typename!=='PostActionSuccess'||!action.post?.id)throw fail(clean(action?.message||'Buffer did not confirm creation. Check your drafts and queue.',env),502);
 const result={post:action.post,saveToDraft:value.saveToDraft};
 const saved=await env.COMMISSION_UPLOADS.put(key,JSON.stringify({fingerprint,state:'complete',result,createdAt:new Date(now).toISOString()}),{onlyIf:{etagMatches:pending.etag}});
 if(!saved)throw fail('Buffer created the post, but the local receipt could not be saved. Check Buffer before repeating.',502);
 return result;
}
export async function bufferApi(request,env,now=Date.now()){
 const url=new URL(request.url),path=url.pathname;
 if(url.origin!==BUFFER_ORIGIN)return json({error:'Not found'},404);
 const isOwner=await authorized(request,env)||await authorized(request,{COMMISSION_MANAGER_TOKEN:env.BUFFER_OPERATIONS_TOKEN});
 if(!isOwner)return json({error:'Not found'},404);
 if(request.headers.has('Origin')&&request.headers.get('Origin')!==BUFFER_ORIGIN)return json({error:'Invalid origin'},403);
 if(request.method!=='POST')return json({error:'Method not allowed'},405);
 if(!['/buffer/status','/buffer/posts/list','/buffer/posts/create'].includes(path))return json({error:'Not found'},404);
 if(!env.BUFFER_API_TOKEN)return json({ready:false,error:'BUFFER_API_TOKEN is missing from this Worker.'},503);
 if(path==='/buffer/posts/create'&&!env.COMMISSION_UPLOADS)return json({error:'Private operation storage is unavailable.'},503);
 try{
  const all=await channels(env);
  if(path==='/buffer/status')return json({ready:true,channels:all});
  const input=await body(request);
  if(path==='/buffer/posts/create')return json(await create(env,input,all,now));
  const channel=all.find(c=>c.id===input.channelId);if(!channel)throw fail('Select a connected channel.');
  const status=input.status??['draft','scheduled','sent','error'];if(!Array.isArray(status)||!status.length||status.some(s=>!states.has(s)))throw fail('Invalid post status filter.');
  if(input.after!==undefined&&(typeof input.after!=='string'||input.after.length>512))throw fail('Invalid pagination cursor.');
  const data=await graphql(env,`query { posts(first:100${input.after?`,after:${quote(input.after)}`:''},input:{organizationId:${quote(channel.organizationId)},filter:{channelIds:[${quote(channel.id)}],status:[${status.join(',')}]}}) { edges { node { id text channelId dueAt status } } pageInfo { hasNextPage endCursor } } }`);
  return json(data.posts);
 }catch(error){return json({error:clean(error.message,env)},error.status||503);}
}
