export const squareTestPageEnabled = env => env.PAYPAL_MODE === 'sandbox' && env.SQUARE_MODE === 'sandbox' && env.SQUARE_CHECKOUT_ENABLED === 'true' && env.SQUARE_SANDBOX_NO_FULFILLMENT === 'true';

export const squareTestPage = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Square sandbox test | Vermillion Aurora</title>
<style>
:root{color-scheme:light}body{font:16px/1.5 system-ui,sans-serif;max-width:680px;margin:32px auto;padding:0 18px;color:#231f20}
h1{font-size:1.7rem}label{display:block;margin:12px 0 4px}input,select,button{font:inherit;box-sizing:border-box;padding:10px;width:100%}
button{margin:12px 0;cursor:pointer}.notice{background:#fff1eb;padding:12px;border-radius:8px}.status{min-height:2em}
#card{padding:12px;border:1px solid #aaa;border-radius:6px;margin:12px 0}
</style></head>
<body>
<h1>Square sandbox checkout test</h1>
<p class="notice">Sandbox only. This uses the test card and sample address below. Shipping and tax providers process the address to calculate a quote; no tax transaction is recorded, shipping label is purchased, or order email is sent. A successful test marks the painting sold in the sandbox inventory only.</p>
<form id="form">
<label for="painting">Pilot painting</label><select id="painting" required></select>
<label for="email">Test email</label><input id="email" type="email" value="square-test@example.test" required>
<label for="name">Name</label><input id="name" value="Square Sandbox Test" required>
<label for="street1">Street</label><input id="street1" value="123 Main St" required>
<label for="street2">Apartment or suite (optional)</label><input id="street2">
<label for="city">City</label><input id="city" value="Seattle" required>
<label for="state">State</label><input id="state" value="WA" maxlength="2" required>
<label for="zip">ZIP</label><input id="zip" value="98101" required>
<button id="quote" type="submit">Calculate sample shipping and tax</button>
</form>
<p id="total" aria-live="polite"></p>
<div id="card" hidden></div>
<button id="pay" type="button" disabled hidden>Submit sandbox test payment</button>
<p id="status" class="status" role="status" aria-live="polite"></p>
<script>
const form=document.querySelector('#form'),select=document.querySelector('#painting'),quoteButton=document.querySelector('#quote'),payButton=document.querySelector('#pay'),cardBox=document.querySelector('#card'),status=document.querySelector('#status'),total=document.querySelector('#total');
let capabilities,card,quote;
const api=async(action,data)=>{const r=await fetch('/checkout/cart/'+action,data?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}:{cache:'no-store'});const b=await r.json();if(!r.ok)throw Error(b.error||'Sandbox checkout request failed');return b};
const showError=e=>{status.textContent=e.message||'Request failed.';};
async function init(){
 status.textContent='Checking Square sandbox configuration…';
 capabilities=await api('catalog');
 if(capabilities.square?.mode!=='sandbox')throw Error('Square sandbox is not enabled for this Worker.');
 const items=capabilities.products.filter(p=>p.methods.includes('square')&&p.type!=='print');
 if(!items.length)throw Error('No painting is enabled in the Square sandbox allowlist.');
 for(const item of items){const option=document.createElement('option');option.value=item.id;option.textContent=item.title+' — $'+item.amount;select.append(option);}
 const script=document.createElement('script');script.src='https://sandbox.web.squarecdn.com/v1/square.js';
 await new Promise((resolve,reject)=>{script.onload=resolve;script.onerror=()=>reject(Error('Square sandbox card form failed to load.'));document.head.append(script);});
 const payments=window.Square.payments(capabilities.square.applicationId,capabilities.square.locationId);
 card=await payments.card();await card.attach('#card');cardBox.hidden=false;status.textContent='Ready. Use Square’s sandbox Visa test number 4111 1111 1111 1111, any future expiry, CVV 111, and a valid ZIP.';
}
form.addEventListener('submit',async event=>{
 event.preventDefault();if(!form.reportValidity())return;
 quoteButton.disabled=true;payButton.hidden=true;payButton.disabled=true;status.textContent='Getting a sample quote…';total.textContent='';
 try{
  const address={name:document.querySelector('#name').value.trim(),street1:document.querySelector('#street1').value.trim(),street2:document.querySelector('#street2').value.trim(),city:document.querySelector('#city').value.trim(),state:document.querySelector('#state').value.trim().toUpperCase(),zip:document.querySelector('#zip').value.trim()};
  quote=await api('quote',{items:[{id:select.value,quantity:1}],address,email:document.querySelector('#email').value.trim(),catalogVersion:capabilities.version});
  if(!quote.methods.includes('square'))throw Error('Square is not available for this painting.');
  total.textContent='Artwork $'+quote.quote.base+' + shipping $'+quote.quote.shipping+' + tax $'+quote.quote.tax+' = $'+quote.quote.total+' USD';
  payButton.hidden=false;payButton.disabled=false;status.textContent='Quote ready. Submit the sandbox test payment when ready.';
 }catch(e){showError(e);}finally{quoteButton.disabled=false;}
});
payButton.addEventListener('click',async()=>{
 if(!quote||!card)return;payButton.disabled=true;quoteButton.disabled=true;status.textContent='Tokenizing sandbox card…';
 try{
  const name=document.querySelector('#name').value.trim().split(/\s+/),email=document.querySelector('#email').value.trim();
  const token=await card.tokenize({amount:quote.quote.total,currencyCode:'USD',intent:'CHARGE',customerInitiated:true,sellerKeyedIn:false,billingContact:{givenName:name.shift()||'',familyName:name.join(' '),email,countryCode:'US'}});
  if(token.status!=='OK'||!token.token)throw Error('Square could not tokenize the sandbox card. Check the card details.');
  status.textContent='Submitting sandbox payment…';
  let order=await api('start',{orderId:quote.orderId,key:quote.key,method:'square',sourceId:token.token});
  for(let i=0;i<15&&['reserving','creating','settling'].includes(order.status);i++){await new Promise(resolve=>setTimeout(resolve,1500));order=await api('status',{orderId:quote.orderId,key:quote.key});}
  status.textContent=order.status==='paid'&&order.sandboxTestOnly?'Sandbox payment succeeded. No fulfillment actions were run. Order reference: '+order.orderId:order.status==='paid'?'Payment succeeded but the sandbox safety marker is missing. Do not retry. Order reference: '+order.orderId:order.paymentError||('Sandbox order status: '+order.status+'. Reference: '+order.orderId);
 }catch(e){showError(e);}finally{payButton.disabled=false;quoteButton.disabled=false;}
});
init().catch(showError);
</script></body></html>`;
