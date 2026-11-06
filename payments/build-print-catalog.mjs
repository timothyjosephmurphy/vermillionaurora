import { mkdir, writeFile } from 'node:fs/promises';
import { readyPrints, printVersion } from '../catalog/prints.mjs';

const assetDir = new URL('../cloudflare/print-assets/', import.meta.url);
await mkdir(assetDir, { recursive: true });
await writeFile(new URL('print-catalog.json', assetDir), `${JSON.stringify({ printVersion, prints: readyPrints })}\n`);
await writeFile(new URL('../cloudflare/print-catalog-version.mjs', import.meta.url), `// Generated from catalog/prints.json and verified paper mappings.
// The checkout Worker script embeds only this version key. The catalog body is
// cloudflare/print-assets/print-catalog.json, loaded through Workers Static Assets.
export const printVersion = ${JSON.stringify(printVersion)};
`);
await writeFile(new URL('../cloudflare/print-catalog.mjs', import.meta.url), `// Generated loader. Node, scripts, and Worker tests import this module.
// The checkout Worker does not. It loads cloudflare/print-assets/print-catalog.json
// through the Workers Static Assets binding.
import asset from './print-assets/print-catalog.json' with { type: 'json' };
import { prints, installPrintCatalog } from './print-catalog-store.mjs';
export const printVersion = asset.printVersion;
installPrintCatalog(asset.prints, asset.printVersion);
export default prints;
`);
console.log(`Built ${Object.keys(readyPrints).length} print variants; print catalog ${printVersion}`);
