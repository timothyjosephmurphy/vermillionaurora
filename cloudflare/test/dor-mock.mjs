// Washington DOR rate lookup fixture (Seattle, location code 1726, 10.55%). Tests never call the live service.
export const DOR_SEATTLE='<?xml version="1.0" encoding="utf-8"?><response loccode="1726" localrate=".0405" rate=".1055" code="2" xmlns=""><addressline code="1726" street="MAIN ST" state="WA" zip="98122" period="Q42026" /><rate name="SEATTLE" code="1726" staterate=".0650" localrate=".0405" /></response>';
export const isDor=url=>String(url).startsWith('https://webgis.dor.wa.gov/webapi/AddressRates.aspx');
export const dorReply=()=>new Response(DOR_SEATTLE,{headers:{'Content-Type':'text/xml'}});
