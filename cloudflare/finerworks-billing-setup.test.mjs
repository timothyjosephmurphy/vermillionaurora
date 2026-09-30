import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync,privateDecrypt,randomBytes} from 'node:crypto';
import {finerworksBillingSetup,selectPaymentToken} from './finerworks-billing-setup.mjs';
const {publicKey,privateKey}=generateKeyPairSync('rsa',{modulusLength:3072});
const session=()=>({token:`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`,publicKey:publicKey.export({format:'jwk'})});
const environment=s=>({PAYPAL_MODE:'sandbox',FINERWORKS_WEB_API_KEY:'private-web-key',FINERWORKS_APP_KEY:'private-app-key',FINERWORKS_BILLING_SETUP:JSON.stringify(s)});
const request=(s,extra={})=>new Request('https://sandbox.example/checkout/prints/billing-setup?payment_profile_id=someone-else',{method:'POST',headers:{Authorization:`Bearer ${s.token}`},body:JSON.stringify({payment_profile_id:'someone-else'}),...extra});
const row=(token='saved-private-token',is_default=true)=>({token,is_default,associated_payment_method:'Visa ending in 1111'});
const envelope=rows=>({status:{success:true},payment_profile_id:'own-profile',payment_tokens:rows});
test('missing, malformed, wrong, expired, future and live-mode access fails before any provider call',async t=>{
  let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;throw Error('Must not call provider');});
  const s=session();
  const bad=[null,{token:42}, {...s,token:`${Date.now()-1}.${'a'.repeat(64)}`},{...s,token:`${Date.now()+30*60000}.${'a'.repeat(64)}`}];
  for(const value of bad)assert.equal((await finerworksBillingSetup(request(s),environment(value))).status,404);
  assert.equal((await finerworksBillingSetup(request({...s,token:s.token+'x'}),environment(s))).status,404);
  assert.equal((await finerworksBillingSetup(request(s),{...environment(s),PAYPAL_MODE:'live'})).status,404);
  assert.equal((await finerworksBillingSetup(request(s,{method:'GET',body:undefined}),environment(s))).status,404);
  assert.equal(calls,0);
});
test('selects a unique default or sole method, rejects ambiguity and unrelated profiles without exposing secrets',()=>{
  assert.equal(selectPaymentToken(envelope([row('other',false),row()]),'own-profile').token,'saved-private-token');
  assert.equal(selectPaymentToken(envelope([row('only',false)]),'own-profile').token,'only');
  for(const [data,code] of [
    [envelope([]),'NO_SAVED_PAYMENT_METHOD'],
    [envelope([row('one',false),row('two',false)]),'CHOOSE_ONE_DEFAULT_PAYMENT_METHOD'],
    [envelope([row('one'),row('two')]),'CHOOSE_ONE_DEFAULT_PAYMENT_METHOD'],
    [{...envelope([row()]),payment_profile_id:'other-profile'},'INVALID_PAYMENT_TOKEN_RESPONSE'],
    [envelope([row('xxxx')]),'INVALID_PAYMENT_TOKEN_RESPONSE'],
    [envelope([row('invoice')]),'INVALID_PAYMENT_TOKEN_RESPONSE'],
    [envelope([row('private\ninvalid')]),'INVALID_PAYMENT_TOKEN_RESPONSE'],
    [envelope([row(),row()]),'INVALID_PAYMENT_TOKEN_RESPONSE']
  ])assert.throws(()=>selectPaymentToken(data,'own-profile'),e=>e.message===code&&!JSON.stringify(e).includes('saved-private-token'));
});
test('retrieves only authenticated own profile with GET and binds encrypted token to this setup session',async t=>{
  const s=session(),calls=[];
  t.mock.method(globalThis,'fetch',async(url,init)=>{
    const u=new URL(url);calls.push(u.pathname);assert.equal(init.method,'GET');assert.equal(init.redirect,'manual');assert.equal(init.body,undefined);
    assert.equal(u.origin,'https://v2.api.finerworks.com');assert.equal(init.headers.web_api_key,'private-web-key');
    if(u.pathname==='/v3/test_my_credentials')return Response.json({status:{success:true},user_account:{payment_profile_id:'own-profile',app_key:'private-app-key'}});
    assert.equal(u.pathname,'/v3/get_payment_tokens');assert.equal(u.searchParams.get('payment_profile_id'),'own-profile');
    return Response.json(envelope([row()]));
  });
  const r=await finerworksBillingSetup(request(s),environment(s)),body=await r.text(),data=JSON.parse(body);
  assert.equal(r.status,200);assert.equal(r.headers.get('Cache-Control'),'no-store');
  for(const secret of ['saved-private-token','private-web-key','private-app-key','own-profile',s.token])assert.ok(!body.includes(secret));
  assert.equal(data.brand,'Visa');assert.equal(data.last4,'1111');assert.equal(data.algorithm,'RSA-OAEP-SHA256');
  const options={key:privateKey,oaepHash:'sha256',oaepLabel:Buffer.from(`FINERWORKS_PAYMENT_TOKEN|${s.token}`)},cipher=Buffer.from(data.encryptedToken,'base64');
  assert.equal(privateDecrypt(options,cipher).toString(),'saved-private-token');
  assert.throws(()=>privateDecrypt({...options,oaepLabel:Buffer.from('wrong-session')},cipher));
  assert.deepEqual(calls,['/v3/test_my_credentials','/v3/get_payment_tokens']);
});
test('provider errors and malformed responses never return account details or tokens',async t=>{
  const s=session();let badResponse;
  t.mock.method(globalThis,'fetch',async url=>String(url).endsWith('test_my_credentials')?Response.json({status:{success:true},user_account:{payment_profile_id:'own-profile'}}):badResponse.clone());
  for(const response of [Response.json({error:'saved-private-token private-web-key'}, {status:403}),Response.json(envelope([row('private\ninvalid')])),new Response('saved-private-token',{status:200})]){
    badResponse=response;const r=await finerworksBillingSetup(request(s),environment(s)),body=await r.text();
    assert.equal(r.status,502);assert.ok(!body.includes('saved-private-token'));assert.ok(!body.includes('private-web-key'));assert.ok(!body.includes('private\\ninvalid'));
  }
});
