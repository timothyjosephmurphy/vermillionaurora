import {finerworksRequest,finerworksEnvironment} from './finerworks-api.mjs';
import {ORDER_ID,ACCESS_KEY} from './cart-policy.mjs';

export async function printApi(request,env) {
  const url=new URL(request.url),action=url.pathname.split('/').at(-1),reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
  if(action==='callback') {
    if(request.method!=='POST'||!ORDER_ID.test(url.searchParams.get('order')||'')||!ACCESS_KEY.test(url.searchParams.get('key')||'')||!env.CART_ORDERS)return reply({error:'Not found'},404);
    const ok=await env.CART_ORDERS.getByName(url.searchParams.get('order')).printCallback(url.searchParams.get('key'));
    return reply({received:ok},ok?200:404);
  }
  if(action==='health'&&request.method==='GET')return reply({provider:'finerworks',mode:finerworksEnvironment(env,false),webApiKeyConfigured:!!env.FINERWORKS_WEB_API_KEY,appKeyConfigured:!!env.FINERWORKS_APP_KEY,enabled:env.PRINT_CHECKOUT_ENABLED==='true'});
  if(action!=='verify'||request.method!=='POST'||!env.CHECKOUT_AUDIT_TOKEN||request.headers.get('Authorization')!==`Bearer ${env.CHECKOUT_AUDIT_TOKEN}`)return reply({error:'Not found'},404);
  if(env.PAYPAL_MODE!=='sandbox')return reply({error:'Sandbox verification only'},409);
  try {
    const credentials=await finerworksRequest(env,'/v3/test_my_credentials',undefined,'GET');
    return reply({provider:'finerworks',mode:'test',credentialsOk:credentials?.status?.success===true,status:credentials?.status||null});
  } catch(error) {
    return reply({provider:'finerworks',mode:'test',credentialsOk:false,error:error.message},502);
  }
}
