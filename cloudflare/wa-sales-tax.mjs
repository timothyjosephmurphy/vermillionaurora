// Washington destination-based sales tax from the Department of Revenue's free rate lookup.
// https://dor.wa.gov/taxes-rates/retail-sales-tax/destination-based-sales-tax-and-streamlined-sales-tax/wa-sales-tax-rate-lookup-url-interface
// Only the shipping street, city and ZIP are sent. Orders shipping outside Washington are not taxed.
export const DOR_RATE_URL='https://webgis.dor.wa.gov/webapi/AddressRates.aspx';
export const TAX_ADDRESS_ERROR='We couldn’t calculate Washington sales tax for this address. Check the street, city and ZIP code, then try again.';
// DOR result codes: 0 address found, 1 ZIP+4 found, 2 address updated and found. Higher codes are partial or no match.
const ADDRESS_MATCH=new Set([0,1,2]);
// A ZIP-only request answers 5 (5-digit ZIP located) or better.
const ZIP_MATCH=new Set([0,1,2,3,4,5]);

export class TaxAddressError extends Error {
  constructor(message=TAX_ADDRESS_ERROR){super(message);this.name='TaxAddressError';this.code='TAX_ADDRESS';}
}

const attribute=(tag,name)=>tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
export function parseRateResponse(xml) {
  const tag=String(xml||'').match(/<response\b[^>]*>/)?.[0];
  if(!tag)return null;
  const code=Number(attribute(tag,'code')),rate=attribute(tag,'rate'),loccode=attribute(tag,'loccode');
  const jurisdiction=String(xml).match(/<rate\b[^>]*\sname="([^"]*)"/)?.[1]||'';
  const period=String(xml).match(/<addressline\b[^>]*\speriod="([^"]*)"/)?.[1]||'';
  return {code,rate,loccode,jurisdiction,period};
}
// The rate must be a plausible combined WA rate (state 6.5% plus local) with a four-digit location code.
function validRate(result,accepted) {
  if(!result||!Number.isInteger(result.code)||!accepted.has(result.code))return false;
  if(!/^\d{4}$/.test(result.loccode||'')||!/^0?\.\d{1,6}$/.test(result.rate||''))return false;
  const rate=Number(result.rate);return rate>=0.065&&rate<0.2;
}
async function lookup(params,accepted) {
  const url=new URL(DOR_RATE_URL);
  url.search=new URLSearchParams({output:'xml',...params}).toString();
  try {
    const response=await fetch(url.href,{method:'GET',signal:AbortSignal.timeout(10000),headers:{Accept:'application/xml,text/xml'}});
    if(!response.ok)return null;
    const result=parseRateResponse(await response.text());
    return validRate(result,accepted)?result:null;
  } catch { return null; }
}
// Returns {rate, ppm, loccode, jurisdiction, period, basis:'address'|'zip', resultCode} or throws TaxAddressError.
export async function waRate(address) {
  const zip=String(address.zip||'').trim();
  const street=[address.street1,address.street2].filter(Boolean).join(' ').trim();
  let result=await lookup({addr:street,city:address.city||'',zip},ADDRESS_MATCH),basis='address';
  if(!result){result=await lookup({addr:'',city:'',zip:zip.slice(0,5)},ZIP_MATCH);basis='zip';}
  if(!result)throw new TaxAddressError();
  const ppm=Math.round(Number(result.rate)*1e6);
  return {rate:String(ppm/1e6),ppm,loccode:result.loccode,jurisdiction:result.jurisdiction.slice(0,60),period:result.period.slice(0,10),basis,resultCode:result.code};
}
// taxableCents is artwork (after any code discount) + framing + shipping. Shipping and framing are taxable in Washington.
export async function salesTax(address,taxableCents) {
  if(!Number.isSafeInteger(taxableCents)||taxableCents<0)throw Error('Invalid taxable amount');
  if(address.country&&address.country!=='US')throw Error('Only US addresses are supported');
  if(address.state!=='WA')return {taxCents:0,tax:{state:address.state,collected:false,rate:'0',basis:'out-of-state'}};
  const found=await waRate(address);
  const {ppm,...rate}=found;
  // Integer arithmetic, rounded half up to the cent.
  const taxCents=Math.floor((taxableCents*ppm+500000)/1e6);
  return {taxCents,tax:{state:'WA',collected:true,source:'wa-dor',...rate}};
}
