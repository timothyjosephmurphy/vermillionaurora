import {quoteFinerWorksPrints} from './finerworks-quotes.mjs';
import {quotePrints as legacyQuote} from './prodigi-api.mjs';
export async function quotePrints(env,items,address) {
  if(env.PRINT_PROVIDER==='finerworks')return quoteFinerWorksPrints(env,items,address);
  if(items.some(i=>i.provider==='finerworks'))throw Error('FinerWorks cannot fall back to another print provider');
  // Legacy support only; current sandbox selects FinerWorks and new prints stay disabled.
  if(!env.PRINT_PROVIDER||env.PRINT_PROVIDER==='prodigi')return legacyQuote(env,items);
  throw Error('Unknown print provider');
}