// Generated loader. Node, scripts, and Worker tests import this module.
// The checkout Worker does not. It loads cloudflare/print-assets/print-catalog.json
// through the Workers Static Assets binding.
import asset from './print-assets/print-catalog.json' with { type: 'json' };
import { prints, installPrintCatalog } from './print-catalog-store.mjs';
export const printVersion = asset.printVersion;
installPrintCatalog(asset.prints, asset.printVersion);
export default prints;
