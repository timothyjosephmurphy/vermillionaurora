import {destinationError} from '../catalog/addresses.mjs';
import {quoteFinerWorksPrints} from './finerworks-quotes.mjs';
import {quotePrints as legacyQuote} from './prodigi-api.mjs';
export async function quotePrints(env,items,address) {
  if(env.PRINT_PROVIDER==='finerworks')return quoteFinerWorksPrints(env,items,address);
  if(items.some(i=>i.provider==='finerworks'))throw Error('FinerWorks cannot fall back to another print provider');
  // Legacy support only; current sandbox selects FinerWorks and new prints stay disabled.
  // The legacy Prodigi path is unused and stays US-only.
  if(!env.PRINT_PROVIDER||env.PRINT_PROVIDER==='prodigi'){if(address?.country&&address.country!=='US')throw destinationError('Prints can only ship within the United States.');return legacyQuote(env,items);}
  throw Error('Unknown print provider');
}