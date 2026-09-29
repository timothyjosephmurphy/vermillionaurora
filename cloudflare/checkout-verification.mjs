// Sandbox diagnostics require a short-lived token installed by the verification job.
// Responses contain state flags only, never credentials or buyer details.
const slug='honeybadger-and-cub-with-genesis-block';
export async function verifySandbox(request,env) {
  const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
  if(env.PAYPAL_MODE!=='sandbox'||env.GITHUB_TOKEN||!env.CHECKOUT_AUDIT_TOKEN||request.headers.get('Authorization')!==`Bearer ${env.CHECKOUT_AUDIT_TOKEN}`)return reply({error:'Not found'},404);
  const stub=env.PAINTING_STOCK.getByName(slug);
  const state=await stub.verification();
  if(request.method==='GET')return reply(state);
  if(request.method!=='POST')return reply({error:'Method not allowed'},405);
  try {
    const auth=await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token',{method:'POST',headers:{Authorization:`Basic ${btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`)}`,'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials'});
    const token=await auth.json();
    if(!auth.ok||!token.access_token)return reply({error:'Sandbox PayPal authentication failed',status:auth.status},502);
    const api=async(path,body)=>{
      const r=await fetch('https://api-m.sandbox.paypal.com'+path,{method:body===undefined?'GET':'POST',headers:{Authorization:`Bearer ${token.access_token}`,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
      const d=await r.json().catch(()=>({}));
      if(!r.ok){const error=new Error(d.name||'PayPal API failure');error.status=r.status;error.details=(d.details||[]).map(x=>({field:x.field,issue:x.issue,description:x.description}));throw error;}
      return d;
    };
    const hook=await api('/v1/notifications/webhooks/'+encodeURIComponent(env.PAYPAL_WEBHOOK_ID));
    const registered=hook.url===env.SANDBOX_RETURN_ORIGIN+'/checkout/webhook'&&hook.event_types?.some(x=>['PAYMENT.CAPTURE.COMPLETED','*'].includes(x.name));
    const saved=await stub.order();
    if(!saved?.orderId||state.status!=='sold')return reply({...state,registered,error:'No completed test order'},409);
    const order=await api('/v2/checkout/orders/'+saved.orderId);
    const capture=order.purchase_units?.[0]?.payments?.captures?.[0];
    if(!capture?.id)return reply({...state,registered,error:'No capture on test order'},409);
    const query=new URLSearchParams({transaction_id:capture.id,event_type:'PAYMENT.CAPTURE.COMPLETED',page_size:'10'});
    const events=await api('/v1/notifications/webhooks-events?'+query);
    const event=events.events?.find(x=>x.resource?.id===capture.id&&x.event_type==='PAYMENT.CAPTURE.COMPLETED');
    if(!event)return reply({...state,registered,eventFound:false},409);
    await api('/v1/notifications/webhooks-events/'+encodeURIComponent(event.id)+'/resend',{webhook_ids:[env.PAYPAL_WEBHOOK_ID]});
    return reply({...state,registered,eventFound:true,replayRequested:true});
  } catch(error) {
    return reply({...state,error:error.message,status:error.status,details:error.details},502);
  }
}
