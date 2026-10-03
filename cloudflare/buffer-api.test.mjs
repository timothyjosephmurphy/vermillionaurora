import test,{afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {bufferApi,BUFFER_ORIGIN} from './buffer-api.mjs';

const originalFetch=globalThis.fetch;
afterEach(()=>{globalThis.fetch=originalFetch;});
class Bucket{
 map=new Map();version=0;
 async get(key){const x=this.map.get(key);return x?{etag:x.etag,json:async()=>JSON.parse(x.value)}:null;}
 async put(key,value,options={}){
  const old=this.map.get(key),c=options.onlyIf;
  if(c?.etagDoesNotMatch==='*'&&old||c?.etagMatches&&old?.etag!==c.etagMatches)return null;
  const etag=String(++this.version);this.map.set(key,{value,etag});return {etag};
 }
}
const setup=()=>({BUFFER_API_TOKEN:'buffer-secret',COMMISSION_MANAGER_TOKEN:'manager',BUFFER_OPERATIONS_TOKEN:'ops',COMMISSION_UPLOADS:new Bucket()});
const req=(env,path,input={},extra={})=>bufferApi(new Request(BUFFER_ORIGIN+path,{method:'POST',headers:{Authorization:'Bearer manager','Content-Type':'application/json',...extra},body:JSON.stringify(input)}),env,Date.parse('2026-10-03T08:00:00Z'));
function mock(service='facebook',mutation){
 const queries=[];
 globalThis.fetch=async(url,options)=>{
  assert.equal(url,'https://api.buffer.com');assert.equal(options.headers.Authorization,'Bearer buffer-secret');
  const q=JSON.parse(options.body).query;queries.push(q);
  if(q.includes('account {'))return Response.json({data:{account:{organizations:[{id:'org'}]}}});
  if(q.includes('channels(input'))return Response.json({data:{channels:[{id:'channel',name:'Vermilion Aurora',service,isQueuePaused:false}]}});
  if(q.startsWith('mutation'))return mutation?mutation(q):Response.json({data:{createPost:{__typename:'PostActionSuccess',post:{id:'post-1',text:'Hello',channelId:'channel',dueAt:null,status:'draft'}}}});
  return Response.json({data:{posts:{edges:[{node:{id:'post-1',status:'draft'}}],pageInfo:{hasNextPage:false,endCursor:null}}}});
 };
 return queries;
}
const input={channelId:'channel',text:'Hello',imageUrls:['https://vermillionaurora.com/about/images/tj-murphy-portrait.jpg'],idempotencyKey:'intro-facebook-2026'};

test('refuses unauthenticated, wrong origins and preview hosts before provider calls',async()=>{
 globalThis.fetch=()=>{throw Error('No provider calls expected');};const env=setup();
 assert.equal((await req(env,'/buffer/status',{}, {Authorization:'Bearer wrong'})).status,404);
 assert.equal((await req(env,'/buffer/status',{}, {Origin:'https://evil.test'})).status,403);
 assert.equal((await bufferApi(new Request('https://preview.test/buffer/status'),env)).status,404);
 assert.equal((await req({...env,BUFFER_API_TOKEN:''},'/buffer/status')).status,503);
});
test('lists connected channels with owner or temporary operations credential',async()=>{
 mock();const env=setup();const r=await req(env,'/buffer/status',{}, {Authorization:'Bearer ops'});
 assert.equal(r.status,200);const d=await r.json();assert.equal(d.channels[0].organizationId,'org');assert(!JSON.stringify(d).includes('buffer-secret'));
});
test('reports provider HTTP failures without exposing non-JSON response bodies',async()=>{
 globalThis.fetch=async()=>new Response('buffer-secret should not be returned',{status:403,headers:{'Content-Type':'text/html'}});
 const r=await req(setup(),'/buffer/status');assert.equal(r.status,502);const text=await r.text();assert.match(text,/HTTP 403/);assert(!text.includes('buffer-secret'));
});
test('defaults to a draft and replays receipt without creating another post',async()=>{
 const queries=mock(),env=setup();const first=await req(env,'/buffer/posts/create',input);assert.equal(first.status,200);
 assert.equal((await first.json()).saveToDraft,true);const mutation=queries.find(q=>q.startsWith('mutation'));
 assert.match(mutation,/saveToDraft:true/);assert.match(mutation,/mode:addToQueue/);assert.match(mutation,/assets:\[\{image:\{url:/);
 assert.equal((await (await req(env,'/buffer/posts/create',input)).json()).replayed,true);
 assert.equal(queries.filter(q=>q.startsWith('mutation')).length,1);
 assert.equal((await req(env,'/buffer/posts/create',{...input,text:'Different'})).status,409);
});
test('validates channel ownership, Instagram media and public image hosts',async()=>{
 const queries=mock('instagram'),env=setup();
 assert.equal((await req(env,'/buffer/posts/create',{...input,channelId:'other'})).status,400);
 assert.equal((await req(env,'/buffer/posts/create',{...input,imageUrls:[]})).status,400);
 assert.equal((await req(env,'/buffer/posts/create',{...input,imageUrls:['https://evil.test/art.jpg']})).status,400);
 assert.equal(queries.filter(q=>q.startsWith('mutation')).length,0);
});
test('requires explicit scheduling, a future UTC date, and enforces X length',async()=>{
 const queries=mock('twitter'),env=setup();
 assert.equal((await req(env,'/buffer/posts/create',{...input,saveToDraft:false})).status,400);
 assert.equal((await req(env,'/buffer/posts/create',{...input,saveToDraft:false,dueAt:'2026-10-02T10:00:00Z'})).status,400);
 assert.equal((await req(env,'/buffer/posts/create',{...input,text:'x'.repeat(281)})).status,400);
 const r=await req(env,'/buffer/posts/create',{...input,saveToDraft:false,dueAt:'2026-10-06T17:00:00Z'});assert.equal(r.status,200);
 assert.match(queries.find(q=>q.startsWith('mutation')),/mode:customScheduled/);
});
test('unconfirmed mutations remain reserved and provider secrets are redacted',async()=>{
 const queries=mock('facebook',()=>Response.json({errors:[{message:'buffer-secret ops manager provider problem'}]})),env=setup();
 const r=await req(env,'/buffer/posts/create',input);assert.equal(r.status,502);const text=await r.text();for(const key of ['buffer-secret','manager'])assert(!text.includes(key));
 assert.equal((await req(env,'/buffer/posts/create',input)).status,409);assert.equal(queries.filter(q=>q.startsWith('mutation')).length,1);
});
test('concurrent requests reserve the same key before calling the provider',async()=>{
 const queries=mock(),env=setup();const responses=await Promise.all([req(env,'/buffer/posts/create',input),req(env,'/buffer/posts/create',input)]);
 assert(responses.some(r=>r.status===200));assert(responses.every(r=>[200,409].includes(r.status)));assert.equal(queries.filter(q=>q.startsWith('mutation')).length,1);
});
test('lists posts with pagination and refuses invalid filter values',async()=>{
 const queries=mock(),env=setup();const r=await req(env,'/buffer/posts/list',{channelId:'channel',status:['draft'],after:'cursor"test'});
 assert.equal(r.status,200);assert.equal((await r.json()).pageInfo.hasNextPage,false);assert.match(queries.at(-1),/after:"cursor\\"test"/);
 assert.equal((await req(env,'/buffer/posts/list',{channelId:'channel',status:['invalid']})).status,400);
});
