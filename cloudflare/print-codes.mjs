// At-cost print codes.
// - TJ's owner code (unlimited): prints at provider cost, originals at $0 + shipping, never deposits.
//   Only its SHA-256 hash lives here; the code value is never stored in the repo.
// - Collector codes (single use): prints only, at provider cost. Issued by an owner request
//   authenticated with the existing COMMISSION_MANAGER_TOKEN; stored hashed in a CartOrder Durable Object
//   named "print-code:<hash>", claimed at payment start, released on cancel/expiry, redeemed on payment.
export const OWNER_CODE_HASH='18f6c5edb2affc9f147987bb61690f9b5bceecc97f8a01af9cd463736c40cf7d';
export const normalizeCode=code=>typeof code==='string'?code.toUpperCase().replace(/[^A-Z0-9]/g,''):'';
export async function codeHash(code){
  const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('va-print-code:'+normalizeCode(code)));
  return [...new Uint8Array(bytes)].map(n=>n.toString(16).padStart(2,'0')).join('');
}
const ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export function newCollectorCode(){
  const s=[...crypto.getRandomValues(new Uint8Array(12))].map(n=>ALPHABET[n%32]).join('');
  return `VA-${s.slice(0,4)}-${s.slice(4,8)}-${s.slice(8,12)}`;
}
export const codeStore=(env,hash)=>env.CART_ORDERS.getByName('print-code:'+hash);
// Resolve a code typed in the cart. Returns null for no code; throws a buyer-safe message for a bad code.
export async function resolveCode(env,code,items) {
  const norm=normalizeCode(code);
  if(!norm)return null;
  if(norm.length<8||norm.length>40)throw Error('That code is not valid.');
  const hash=await codeHash(norm);
  if(items.some(i=>i.type==='deposit'))throw Error('Codes cannot be used on commission deposits.');
  if(hash===OWNER_CODE_HASH)return {kind:'owner',hash};
  if(!items.some(i=>i.type==='print'))throw Error('This code applies to prints only.');
  if(items.some(i=>i.type!=='print'))throw Error('This code applies to prints only. Check out originals separately.');
  const state=await codeStore(env,hash).codeState();
  if(!state||state.status==='redeemed')throw Error('That code is not valid or has already been used.');
  if(state.status==='claimed')throw Error('That code is being used in another checkout. Try again in 20 minutes.');
  // The last group of the code is kept so bookkeeping can show a masked reference (VA-…-WXYZ). Never the full code,
  // and never anything about the owner code.
  return {kind:'collector',hash,suffix:norm.slice(-4)};
}
// Apply at-cost pricing AFTER the print provider validated retail prices. unitCosts are dollar strings (or cents) per copy by SKU.
export function applyCode(items,code,unitCosts) {
  if(!code)return items;
  return items.map(item=>{
    if(item.type==='print'){
      const raw=unitCosts?.[item.sku],cost=typeof raw==='string'&&/^\d+\.\d{2}$/.test(raw)?Number(raw.replace('.','')):raw;
      if(!Number.isSafeInteger(cost)||cost<=0)throw Error('Print cost unavailable for this code');
      return {...item,listAmount:item.amount,amount:(cost/100).toFixed(2),priceCode:code.kind};
    }
    if(code.kind==='owner'&&item.type!=='deposit')return {...item,listAmount:item.amount,amount:'0.00',priceCode:'owner'};
    return item;
  });
}
const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
// POST /checkout/print-codes/issue  Authorization: Bearer <COMMISSION_MANAGER_TOKEN>  {name,email,note?}
export async function printCodesApi(request,env) {
  const token=env.COMMISSION_MANAGER_TOKEN,auth=request.headers.get('Authorization')||'';
  if(request.method!=='POST'||!token||!env.CART_ORDERS||auth.length!==token.length+7||auth!==`Bearer ${token}`)return json({error:'Not found'},404);
  let body;try{body=await request.json();}catch{return json({error:'Invalid request'},400);}
  const name=String(body?.name||'').trim().slice(0,120),email=String(body?.email||'').trim().slice(0,254),note=String(body?.note||'').trim().slice(0,500);
  if(!name||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return json({error:'Name and a valid email are required'},400);
  return json(await issueCollectorCode(env,{name,email,note}));
}
// Shared by the endpoint above and the testimonial owner page. Callers authenticate the owner first.
export const CODE_USAGE='Single use, prints only, priced at print-lab cost plus shipping.';
export async function issueCollectorCode(env,{name,email,note=''}) {
  const code=newCollectorCode(),hash=await codeHash(code);
  const record={name,email,note,issuedAt:new Date().toISOString(),mode:env.PAYPAL_MODE};
  await codeStore(env,hash).codeIssue(hash,record);
  if(env.SALES_ARCHIVE)await env.SALES_ARCHIVE.put(`print-codes/${env.PAYPAL_MODE}/${hash}.json`,JSON.stringify({hash,...record},null,2),{httpMetadata:{contentType:'application/json'}});
  return {code,name,email,issuedAt:record.issuedAt,usage:CODE_USAGE};
}
