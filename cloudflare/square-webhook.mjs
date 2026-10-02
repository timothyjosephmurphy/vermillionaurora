const ORDER_ID=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function sameBytes(a,b) {
  if(a.length!==b.length)return false;
  let mismatch=0;for(let i=0;i<a.length;i++)mismatch|=a[i]^b[i];return mismatch===0;
}
async function validSignature(request,body,env) {
  if(!env.SQUARE_WEBHOOK_SIGNATURE_KEY||!env.SQUARE_WEBHOOK_URL||request.url!==env.SQUARE_WEBHOOK_URL)return false;
  const signature=request.headers.get('x-square-hmacsha256-signature');if(!signature)return false;
  try {
    const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.SQUARE_WEBHOOK_SIGNATURE_KEY),{name:'HMAC',hash:'SHA-256'},false,['sign']);
    const digest=new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(env.SQUARE_WEBHOOK_URL+body)));
    const supplied=Uint8Array.from(atob(signature),char=>char.charCodeAt(0));
    return sameBytes(digest,supplied);
  } catch { return false; }
}

export async function squareWebhook(request,env) {
  if(request.method!=='POST')return new Response('Method not allowed',{status:405});
  const body=await request.text();if(body.length>65536)return new Response('Too large',{status:413});
  if(!await validSignature(request,body,env))return new Response('Invalid signature',{status:403});
  let event;try{event=JSON.parse(body);}catch{return new Response('Invalid event',{status:400});}
  if(event.type!=='payment.updated')return new Response(null,{status:200});
  const payment=event.data?.object?.payment;
  if(payment?.status!=='COMPLETED')return new Response(null,{status:200});
  if(!payment?.id||!ORDER_ID.test(payment.reference_id||''))return new Response(null,{status:200});
  try {
    await env.CART_ORDERS.getByName(payment.reference_id).acceptSquare(payment.id);
    return new Response(null,{status:200});
  } catch(error) {
    console.error('Square payment webhook needs reconciliation',payment.id,error.message);
    return new Response('Retry event',{status:500});
  }
}
