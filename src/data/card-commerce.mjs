import {config,papers,printOptions} from '../../catalog/prints.mjs';
// Card commerce cues (galleries, carousels): the lowest print price and whether to show the "Buy" cue.
// Uses the same print options as the product page ("Print available from ..."): ready, non-test, unframed sizes.
export function lowestPrintPrice(p){
  if(p?.type!=='painting')return null;
  const options=printOptions(p,config,papers).filter(o=>o.ready&&!o.testOnly);
  return options.length?Math.min(...options.map(o=>Number(o.amount))):null;
}
export const dollars=value=>`$${Number(value).toLocaleString('en-US',value%1?{minimumFractionDigits:2,maximumFractionDigits:2}:{maximumFractionDigits:0})}`;
export function printsFromLabel(p){const value=lowestPrintPrice(p);return value===null?'':`Prints from ${dollars(value)}`;}
// Buy shows when the original is available or prints exist; the card itself links to the painting's one product page.
export const showBuy=p=>p?.type==='painting'&&(p.listing?.status==='available'||lowestPrintPrice(p)!==null);
