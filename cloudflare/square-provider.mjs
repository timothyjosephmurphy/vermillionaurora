const cents=value=>{if(typeof value!=='string'||!/^\d+\.\d{2}$/.test(value))throw Error('Invalid amount');const result=Number(value.replace('.',''));if(!Number.isSafeInteger(result))throw Error('Invalid amount');return result;};
const squareBase=env=>env.SQUARE_MODE==='sandbox'?'https://connect.squareupsandbox.com':'https://connect.squareup.com';
export async function squareRequest(env,path,body) {
  if(!env.SQUARE_ACCESS_TOKEN)throw Error('Square is not configured');
  const response=await fetch(`${squareBase(env)}${path}`,{method:body===undefined?'GET':'POST',signal:AbortSignal.timeout(20000),
    headers:{Authorization:`Bearer ${env.SQUARE_ACCESS_TOKEN}`,'Content-Type':'application/json','Square-Version':'2026-08-19'},
    ...(body===undefined?{}:{body:JSON.stringify(body)})});
  const result=await response.json();
  if(!response.ok){const error=Error(`Square request failed (${response.status})`);error.definiteFailure=response.status>=400&&response.status<500&&response.status!==429;throw error;}
  return result;
}
export function squarePaymentBody(env,data) {
  if(!data.squareSourceId||data.squareSourceId.length>2000)throw Error('Square card token is missing');
  return {source_id:data.squareSourceId,idempotency_key:data.squareIdempotencyKey||data.id,amount_money:{amount:cents(data.quote.total),currency:'USD'},
    autocomplete:true,location_id:data.squareLocationId,reference_id:data.id,buyer_email_address:data.quote.email,
    note:`Vermillion Aurora order: ${data.quote.items.map(item=>item.title).join('; ')}`.slice(0,500),
    shipping_address:{first_name:data.quote.address.name.split(/\s+/)[0],last_name:data.quote.address.name.split(/\s+/).slice(1).join(' '),
      address_line_1:data.quote.address.street1,...(data.quote.address.street2?{address_line_2:data.quote.address.street2}:{}),
      locality:data.quote.address.city,administrative_district_level_1:data.quote.address.state,postal_code:data.quote.address.zip,country:'US'}};
}
export function validateSquarePayment(env,data,payment) {
  const amount=Number(payment.amount_money?.amount);
  if(env.SQUARE_MODE!==data.squareMode||env.SQUARE_LOCATION_ID!==data.squareLocationId||
    typeof payment.id!=='string'||!payment.id||payment.id.length>100||payment.status!=='COMPLETED'||
    payment.location_id!==data.squareLocationId||payment.reference_id!==data.id||payment.amount_money?.currency!=='USD'||
    !Number.isSafeInteger(amount)||amount!==cents(data.quote.total)||
    (data.providerId&&data.providerId!==payment.id))throw Error('Square payment does not match the saved order');
  return `square:${payment.id}`;
}
export function squarePaymentDetails(payment) {
  const fees=payment.processing_fee||[],fee=fees.reduce((sum,item)=>sum+Number(item.amount_money?.amount||0),0);
  return {provider:'square',paymentId:payment.id,fee:fees.length&&Number.isSafeInteger(fee)?(fee/100).toFixed(2):null,feeCurrency:fees.length?'USD':''};
}
