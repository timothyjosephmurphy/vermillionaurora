// Maps changed files (stdin) to product slugs and print productIds for sampled post-deploy checks.
import fs from 'node:fs';
import {products} from '../../catalog/catalog.mjs';
import prints from '../../cloudflare/print-catalog.mjs';
const files=fs.readFileSync(0,'utf8').split('\n').map(s=>s.trim()).filter(Boolean);
const hit=id=>id&&id.length>4&&files.some(f=>f.includes(`/${id}/`)||f.includes(`/${id}.`)||f.includes(`/${id}-`)||f.endsWith(`/${id}`));
const slugs=[...new Set(products.map(p=>p.slug).filter(hit))].slice(0,25);
const printIds=[...new Set(Object.values(prints).map(p=>p.productId).filter(hit))].slice(0,25);
const out={product_slugs:slugs.join(','),print_products:printIds.join(','),blog:String(files.some(f=>/(^|\/)blog(\/|-)/.test(f))),unknown:String(!files.length)};
console.log(JSON.stringify(out));
if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,Object.entries(out).map(([k,v])=>`${k}=${v}\n`).join(''));
