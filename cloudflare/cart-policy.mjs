import catalog, {catalogVersion as originalVersion} from './checkout-catalog.mjs';
import prints, {printVersion} from './print-catalog.mjs';
import {framingTermsVersion,originalFramingRequest} from '../catalog/original-framing.mjs';
export const catalogVersion=`${originalVersion}-${printVersion}-${framingTermsVersion}`;
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
export function paymentMethods(env,id) {
  if(env.CART_CHECKOUT_ENABLED!=='true'||!env.CART_ORDERS||!env.PAINTING_STOCK||!env.SALES_LEDGER||!env.SALES_ARCHIVE)return [];
  const print=Object.hasOwn(prints,id)?prints[id]:null;
  if(!env.STRIPE_SECRET_KEY||!['live','sandbox'].includes(env.PAYPAL_MODE))return [];
  if(print) {
    if(print.testOnly&&env.PAYPAL_MODE!=='sandbox')return [];
    if(print.sampleOnly&&env.PAYPAL_MODE==='live'&&env.LIVE_PRINT_SAMPLE_ENABLED!=='true')return [];
    if(env.PRINT_CHECKOUT_ENABLED!=='true'||!listed(env.PRINT_CHECKOUT_IDS,id))return [];
    if(print.provider==='finerworks') {if(!finerworksOrderingReady(env))return [];}
    else if(env.PRINT_PROVIDER==='finerworks'||!env.PRODIGI_API_KEY||env.PRODIGI_ENV!==env.PAYPAL_MODE)return [];
  } else if(!env.SHIPPO_TOKEN||!env.SHIP_FROM_STREET||!catalog[id]||catalog[id].available===false)return [];
  const methods=[];
  if(env.PAYPAL_CHECKOUT_ENABLED==='true'&&(print||listed(env.PAYPAL_CHECKOUT_SLUGS,id))&&env.PAYPAL_CLIENT_ID&&env.PAYPAL_CLIENT_SECRET&&env.PAYPAL_MERCHANT_ID&&env.PAYPAL_WEBHOOK_ID)methods.push('paypal');
  if(print?!print.sampleOnly&&printBitcoinOffered(env):bitcoinOffered(env,id))methods.push('bitcoin');
  return methods;
}
export function cartItems(input) {
  if(!Array.isArray(input)||input.length<1||input.length>MAX_ITEMS)throw Error(`Choose between 1 and ${MAX_ITEMS} items.`);
  const seen=new Set(),sampleArtworks=new Set();
  return input.map(line=>{
    if(!line||typeof line.id!=='string'||seen.has(line.id))throw Error('An item is unavailable or its quantity is invalid.');
    seen.add(line.id);
    if(Object.hasOwn(prints,line.id)) {
      if(line.framing!=null)throw Error('Original framing is not available for prints.');
      if(!Number.isSafeInteger(line.quantity)||line.quantity<1||line.quantity>10)throw Error('Choose between 1 and 10 copies per print.');
      const p=prints[line.id];
      if(p.sampleOnly){if(line.quantity!==1||sampleArtworks.has(p.productId))throw Error('Choose one sample size and one copy per painting.');sampleArtworks.add(p.productId);}
      return {...prints[line.id],quantity:line.quantity};
    }
    if(line.quantity!==1||!Object.hasOwn(catalog,line.id)||catalog[line.id].available===false)throw Error('An item is unavailable or its quantity is invalid.');
    const framing=originalFramingRequest(line.framing,catalog[line.id].framingOffer);
    return {id:line.id,type:'original',quantity:1,title:catalog[line.id].title,amount:catalog[line.id].amount,...(framing?{framing}:{})};
  }).sort((a,b)=>a.id.localeCompare(b.id));
}
export function commonMethods(env,items) { return ['paypal','bitcoin'].filter(method=>items.every(item=>paymentMethods(env,item.id).includes(method))); }
export function cleanEmail(email) {
  if(typeof email!=='string'||email.length>254||!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))throw Error('Enter a valid email address.');
  return email;
}
export async function keyHash(key) { return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key)))].map(n=>n.toString(16).padStart(2,'0')).join(''); }
function printBitcoinOffered(env) {
  try {const u=new URL(env.BTCPAY_URL);return env.PAYPAL_MODE==='live'&&env.BTCPAY_CHECKOUT_ENABLED==='true'&&u.protocol==='https:'&&!u.username&&!u.password&&!!env.BTCPAY_STORE_ID&&!!env.BTCPAY_API_KEY&&!!env.BTCPAY_WEBHOOK_SECRET&&!!env.BITCOIN_ORDERS;}catch{return false;}
}
export function publicCartItem(item) {
  const {id,type,productId,title,amount,quantity,imageSize,paperSize,paper,preview,mat,frame,sampleOnly,framing}=item;
  return {id,type,title,amount,quantity,...(type==='print'?{productId,imageSize,paperSize,paper,preview,...(sampleOnly?{sampleOnly:true}:{}),...(mat?{mat:{name:mat.name,outer:mat.outer,window:mat.window}}:{}),...(frame?{frame:{name:frame.name,size:frame.size,glazing:{name:frame.glazing.name}}}:{})}:framing?{framing}:{})};
}
