import {finerworksRequest} from './finerworks-api.mjs';
const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
const tokenPattern=/^[\x21-\x7e]{1,128}$/;
const problem=(code,details={})=>Object.assign(Error(code),{billingCode:code,safeDetails:details});
export function selectPaymentToken(data,profileId) {
  if(data?.status?.success!==true||data.payment_profile_id!==profileId||!Array.isArray(data.payment_tokens)||data.payment_tokens.length>20)throw problem('INVALID_PAYMENT_TOKEN_RESPONSE');
  const rows=data.payment_tokens;
  if(!rows.length)throw problem('NO_SAVED_PAYMENT_METHOD');
  if(rows.some(r=>typeof r?.token!=='string'||!tokenPattern.test(r.token)||['xxxx','invoice'].includes(r.token))||new Set(rows.map(r=>r.token)).size!==rows.length)throw problem('INVALID_PAYMENT_TOKEN_RESPONSE');
  const defaults=rows.filter(r=>r.is_default===true),selected=defaults.length===1?defaults[0]:rows.length===1?rows[0]:null;
  if(!selected)throw problem('CHOOSE_ONE_DEFAULT_PAYMENT_METHOD',{paymentMethodsFound:rows.length});
  const label=typeof selected.associated_payment_method==='string'?selected.associated_payment_method:'';
  return {token:selected.token,paymentMethodsFound:rows.length,usedDefault:selected.is_default===true,
    brand:label.match(/\b(Visa|Mastercard|American Express|Amex|Discover|PayPal)\b/i)?.[0]||'Saved payment method',last4:label.match(/(\d{4})\D*$/)?.[1]||null};
}
export async function finerworksBillingSetup(request,env) {
  let setup;try{setup=JSON.parse(env.FINERWORKS_BILLING_SETUP||'null');}catch{}
  const expiry=typeof setup?.token==='string'?Number(setup.token.split('.')[0]):0;
  if(env.PAYPAL_MODE!=='sandbox'||request.method!=='POST'||!/^\d{13}\.[a-f0-9]{64}$/.test(setup?.token||'')||expiry<=Date.now()||expiry>Date.now()+20*60000||request.headers.get('Authorization')!==`Bearer ${setup.token}`)return reply({error:'Not found'},404);
  try {
    const jwk=setup.publicKey;
    if(!jwk||jwk.kty!=='RSA'||jwk.e!=='AQAB'||typeof jwk.n!=='string'||jwk.n.length!==512||jwk.d)throw problem('INVALID_SETUP_ENCRYPTION_KEY');
    const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSA-OAEP',hash:'SHA-256'},false,['encrypt']);
    const profile=await finerworksRequest(env,'/v3/test_my_credentials',undefined,'GET'),profileId=profile.user_account?.payment_profile_id;
    if(typeof profileId!=='string'||! /^[A-Za-z0-9_-]{1,128}$/.test(profileId))throw problem('NO_SAVED_BILLING_PROFILE');
    const response=await fetch(`https://v2.api.finerworks.com/v3/get_payment_tokens?payment_profile_id=${encodeURIComponent(profileId)}`,{
      method:'GET',redirect:'manual',signal:AbortSignal.timeout(30000),headers:{Accept:'application/json',web_api_key:String(env.FINERWORKS_WEB_API_KEY).trim(),app_key:String(env.FINERWORKS_APP_KEY).trim()}});
    if(!response.ok)throw problem('PAYMENT_TOKEN_LOOKUP_FAILED',{httpStatus:response.status});
    const result=selectPaymentToken(await response.json(),profileId),label=new TextEncoder().encode(`FINERWORKS_PAYMENT_TOKEN|${setup.token}`);
    const encrypted=await crypto.subtle.encrypt({name:'RSA-OAEP',label},key,new TextEncoder().encode(result.token));
    const {token,...metadata}=result;
    return reply({...metadata,algorithm:'RSA-OAEP-SHA256',encryptedToken:btoa(String.fromCharCode(...new Uint8Array(encrypted)))});
  } catch(error) {
    return reply({error:error.billingCode||'BILLING_LOOKUP_FAILED',...(error.safeDetails||{}),...(!error.billingCode&&Number.isInteger(error.status)?{httpStatus:error.status}:{})},502);
  }
}
