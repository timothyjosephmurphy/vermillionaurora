import catalog, {catalogVersion as originalVersion} from './checkout-catalog.mjs';
import prints, {printVersion} from './print-catalog.mjs';
import deposits from './commission-deposits.mjs';
export const catalogVersion=`${originalVersion}-${printVersion}`;
import {bitcoinOffered} from './bitcoin-api.mjs';
import {finerworksOrderingReady} from './finerworks-fulfillment.mjs';
export const MAX_ITEMS=12;
export const ORDER_ID=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
export const ACCESS_KEY=/^[a-f0-9]{64}$/;
export const cartOrigin=env=>env.PAYPAL_MODE==='sandbox'?env.SANDBOX_RETURN_ORIGIN:'https://vermillionaurora.com';
export const dollars=n=>(n/100).toFixed(2);
export function cents(value) {
  if(typeof value!=='string'||!/^\d+\.\d{2}$/.test(value))throw Error('Invalid amount');
  const result=Number(value.replace('.',''));if(!Number.isSafeInteger(result))throw Error('Invalid amount');return result;
}
export const listed=(list,id)=>!!list?.split(',').map(s=>s.trim()).includes(id);
// Keep the explicit legacy/sample list for staged rollouts, while allowing the
// generated, server-owned catalog to scale past Wrangler's 5.1 kB text-binding
// limit. This flag never admits an ID absent from the generated print catalog.
export const printCheckoutListed=(env,id)=>env.PRINT_CHECKOUT_ALL==='true'?Object.hasOwn(prints,id):listed(env.PRINT_CHECKOUT_IDS,id);
export function paymentMethods(env,id) {
  if(env.CART_CHECKOUT_ENABLED!=='true'||!env.CART_ORDERS||!env.PAINTING_STOCK||!env.SALES_LEDGER||!env.SALES_ARCHIVE)return [];
  const print=Object.hasOwn(prints,id)?prints[id]:null;
  if(!env.STRIPE_SECRET_KEY||!['live','sandbox'].includes(env.PAYPAL_MODE))return [];
  if(Object.hasOwn(deposits,id))return depositMethods(env);
  if(print) {
    if(print.testOnly&&env.PAYPAL_MODE!=='sandbox')return [];
    if(print.sampleOnly&&env.PAYPAL_MODE==='live'&&env.LIVE_PRINT_SAMPLE_ENABLED!=='true')return [];
    if(env.PRINT_CHECKOUT_ENABLED!=='true'||!printCheckoutListed(env,id))return [];
    if(print.provider==='finerworks') {if(!finerworksOrderingReady(env))return [];}
    else if(env.PRINT_PROVIDER==='finerworks'||!env.PRODIGI_API_KEY||env.PRODIGI_ENV!==env.PAYPAL_MODE)return [];
  } else if(!env.SHIPPO_TOKEN||!env.SHIP_FROM_STREET||!Object.hasOwn(catalog,id)||catalog[id].available===false)return [];
  const methods=[];
  // PAYPAL_DEPRECATED="true" hides PayPal everywhere (cards via Square, Bitcoin via BTCPay) without touching credentials.
  if(env.PAYPAL_DEPRECATED!=='true'&&env.PAYPAL_CHECKOUT_ENABLED==='true'&&(print||listed(env.PAYPAL_CHECKOUT_SLUGS,id))&&env.PAYPAL_CLIENT_ID&&env.PAYPAL_CLIENT_SECRET&&env.PAYPAL_MERCHANT_ID&&env.PAYPAL_WEBHOOK_ID)methods.push('paypal');
  if(print?!print.sampleOnly&&printBitcoinOffered(env):bitcoinOffered(env,id))methods.push('bitcoin');
  if(env.SQUARE_CHECKOUT_ENABLED==='true'&&env.SQUARE_MODE===env.PAYPAL_MODE&&['live','sandbox'].includes(env.SQUARE_MODE)&&
    (env.SQUARE_CHECKOUT_ALL==='true'||listed(env.SQUARE_CHECKOUT_SLUGS,id))&&env.SQUARE_ACCESS_TOKEN&&env.SQUARE_APPLICATION_ID&&env.SQUARE_LOCATION_ID&&env.SQUARE_WEBHOOK_SIGNATURE_KEY&&env.SQUARE_WEBHOOK_URL&&
    !(env.SQUARE_MODE==='live'&&env.SQUARE_APPLICATION_ID.startsWith('sandbox-')))methods.push('square');
  return methods;
}
// Commission deposits are non-shippable service lines (50% of a fixed package price).
// They are off unless COMMISSION_DEPOSITS_ENABLED is "true", and COMMISSION_DEPOSITS_PAUSED stops them.
export function depositMethods(env) {
  if(env.COMMISSION_DEPOSITS_ENABLED!=='true'||env.COMMISSION_DEPOSITS_PAUSED==='true')return [];
  const methods=[];
  if(env.PAYPAL_DEPRECATED!=='true'&&env.PAYPAL_CHECKOUT_ENABLED==='true'&&env.PAYPAL_CLIENT_ID&&env.PAYPAL_CLIENT_SECRET&&env.PAYPAL_MERCHANT_ID&&env.PAYPAL_WEBHOOK_ID)methods.push('paypal');
  if(printBitcoinOffered(env))methods.push('bitcoin');
  if(env.SQUARE_CHECKOUT_ENABLED==='true'&&env.SQUARE_MODE===env.PAYPAL_MODE&&['live','sandbox'].includes(env.SQUARE_MODE)&&env.SQUARE_CHECKOUT_ALL==='true'&&
    env.SQUARE_ACCESS_TOKEN&&env.SQUARE_APPLICATION_ID&&env.SQUARE_LOCATION_ID&&env.SQUARE_WEBHOOK_SIGNATURE_KEY&&env.SQUARE_WEBHOOK_URL&&
    !(env.SQUARE_MODE==='live'&&env.SQUARE_APPLICATION_ID.startsWith('sandbox-')))methods.push('square');
  return methods;
}
const REQUEST_ID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export function cartItems(input) {
  if(Array.isArray(input)&&input.some(line=>line&&Object.hasOwn(deposits,line.id))) {
    // A deposit is checked out on its own so no shipping or inventory rules mix in.
    if(input.length!==1||input[0].quantity!==1)throw Error('Pay a commission deposit on its own, one at a time.');
    const line=input[0],d=deposits[line.id];
    if(line.requestId!==undefined&&!REQUEST_ID.test(line.requestId))throw Error('The commission request reference is invalid.');
    return [{id:line.id,type:'deposit',quantity:1,title:d.title,amount:d.amount,commission:{package:d.package,...(d.option?{option:d.option}:{}),packageTitle:d.packageTitle,packagePrice:d.packagePrice,
      ...(line.requestId?{requestId:line.requestId}:{}),balance:(Number(d.packagePrice)-Number(d.amount)).toFixed(2)}}];
  }
  if(!Array.isArray(input)||input.length<1||input.length>MAX_ITEMS)throw Error(`Choose between 1 and ${MAX_ITEMS} items.`);
  const seen=new Set(),sampleArtworks=new Set();
  return input.map(line=>{
    if(!line||typeof line.id!=='string'||seen.has(line.id))throw Error('An item is unavailable or its quantity is invalid.');
    seen.add(line.id);
    if(Object.hasOwn(prints,line.id)) {
      if(!Number.isSafeInteger(line.quantity)||line.quantity<1||line.quantity>10)throw Error('Choose between 1 and 10 copies per print.');
      const p=prints[line.id];
      if(p.sampleOnly){if(line.quantity!==1||sampleArtworks.has(p.productId))throw Error('Choose one sample size and one copy per painting.');sampleArtworks.add(p.productId);}
      return {...prints[line.id],quantity:line.quantity};
    }
    if(line.quantity!==1||!Object.hasOwn(catalog,line.id)||catalog[line.id].available===false)throw Error('An item is unavailable or its quantity is invalid.');
    return {id:line.id,type:'original',quantity:1,title:catalog[line.id].title,amount:catalog[line.id].amount};
  }).sort((a,b)=>a.id.localeCompare(b.id));
}
export function commonMethods(env,items) { return ['paypal','square','bitcoin'].filter(method=>items.every(item=>paymentMethods(env,item.id).includes(method))); }
export function cleanEmail(email) {
  if(typeof email!=='string'||email.length>254||!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))throw Error('Enter a valid email address.');
  return email;
}
export async function keyHash(key) { return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key)))].map(n=>n.toString(16).padStart(2,'0')).join(''); }
function printBitcoinOffered(env) {
  try {const u=new URL(env.BTCPAY_URL);return env.PAYPAL_MODE==='live'&&env.BTCPAY_CHECKOUT_ENABLED==='true'&&u.protocol==='https:'&&!u.username&&!u.password&&!!env.BTCPAY_STORE_ID&&!!env.BTCPAY_API_KEY&&!!env.BTCPAY_WEBHOOK_SECRET&&!!env.BITCOIN_ORDERS;}catch{return false;}
}
export function publicCartItem(item) {
  const {id,type,productId,title,amount,quantity,imageSize,paperSize,paper,preview,mat,frame,sampleOnly,commission,listAmount,priceCode}=item;
  return {id,type,title,amount,quantity,...(listAmount?{listAmount,priceCode}:{}),...(type==='deposit'&&commission?{commission}:{}),...(type==='print'?{productId,imageSize,paperSize,paper,preview,...(sampleOnly?{sampleOnly:true}:{}),...(mat?{mat:{name:mat.name,outer:mat.outer,window:mat.window}}:{}),...(frame?{frame:{name:frame.name,size:frame.size,glazing:{name:frame.glazing.name}}}:{})}:{})};
}
