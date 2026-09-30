import {writeFile} from 'node:fs/promises';
import {readyPrints,printVersion} from '../catalog/prints.mjs';
await writeFile(new URL('../cloudflare/print-catalog.mjs',import.meta.url),`// Generated from catalog/prints.json and verified paper mappings.\nexport const printVersion=${JSON.stringify(printVersion)};\nexport default ${JSON.stringify(readyPrints,null,2)};\n`);
console.log(`Built ${Object.keys(readyPrints).length} print variants; print catalog ${printVersion}`);
