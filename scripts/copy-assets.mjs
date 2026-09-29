import { readdir, mkdir, copyFile, writeFile } from 'node:fs/promises';
import { products, catalogVersion, statusLabel } from '../catalog/catalog.mjs';

// Copy only public assets. Worker code, payment maintenance scripts, catalogs with
// shipping notes, old hosting bundles, dependencies and tests never enter dist.
const roots=['featured-carousel','about','book-viewer','exhibitions','gallery','gallery-images','murals','neural-dance','products'];
const types=/\.(?:html|css|js|json|jpg|jpeg|png|webp|gif|svg|ico|avif|woff2?|ttf|pdf|mp4|webm|mp3|wav)$/i;
const migrated=new Set(['index.html','gallery/index.html','exhibitions/paul-murphy/index.html','exhibitions/chase-toole/index.html','exhibitions/gavin-robertson/index.html',...products.map(p=>`products/${p.slug}/index.html`)]);
async function copy(path) {
  if(migrated.has(path)||path==='gallery/inventory.json')return;
  await mkdir(`dist/${path.slice(0,path.lastIndexOf('/'))}`,{recursive:true});
  await copyFile(path,`dist/${path}`);
}
async function walk(dir) {
  for(const entry of await readdir(dir,{withFileTypes:true})) {
    const path=`${dir}/${entry.name}`;
    if(entry.name.startsWith('.'))continue;
    if(entry.isDirectory())await walk(path);
    else if(types.test(path))await copy(path);
  }
}
for(const root of roots)await walk(root);
for(const entry of await readdir('.', {withFileTypes:true})) if(entry.isFile() && /\.(css|js|ico|svg|png|txt|xml)$/.test(entry.name) && !entry.name.endsWith('.config.js')) {await copyFile(entry.name,`dist/${entry.name}`);}
await mkdir('dist/payments',{recursive:true});
await copyFile('payments/paypal-checkout.js','dist/payments/paypal-checkout.js');
await mkdir('dist/catalog',{recursive:true});
await copyFile('catalog/availability.js','dist/catalog/availability.js');
await writeFile('dist/catalog/products.json',JSON.stringify({version:catalogVersion,products:products.map(p=>({id:p.id,slug:p.slug,title:p.title,type:p.type,listing:p.listing,image:p.image}))}));
await writeFile('dist/catalog/version.json',JSON.stringify({version:catalogVersion,products:products.length}));
await writeFile('dist/payments/paypal-links.json',JSON.stringify(Object.fromEntries(products.filter(p=>p.checkout?.mode==='paypal-link').map(p=>[p.slug,p.checkout.link]))));
// Read-only compatibility export for existing links and integrations. Never edit it.
await writeFile('dist/gallery/inventory.json',JSON.stringify({paintings:products.filter(p=>p.type==='painting').map(p=>({A:p.slug,B:p.title,C:p.listing.price?.amount||'0',D:p.listing.price?.currency||'USD',E:statusLabel(p),F:p.dimensions?.width||'',G:p.dimensions?.height||'',H:p.dimensions?.unit||'',I:p.medium||'',J:p.surface||'',K:p.year||'',L:p.framing||'',M:p.story.join('\n\n'),O:`https://vermillionaurora.com/products/${p.slug}/`,P:p.image.src,image:p.image.src}))}));
console.log(`Public assets copied; catalog ${catalogVersion}`);
