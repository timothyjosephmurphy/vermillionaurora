import {writeFile} from 'node:fs/promises';
import {products} from '../catalog/catalog.mjs';
import {readyPrints,printVersion} from '../catalog/prints.mjs';

const selected=[
  'warszawska-syrenka',
  'honeybadger-and-cub-with-genesis-block',
  'painting-red-horizon',
  'painting-shoreline-at-dusk',
  'el-zonte-at-sunrise'
];
const sizeOrder=[['full','Large'],['medium','Medium'],['small','Small']];
const frameOrder=[['black','Black'],['white','White'],['natural','Natural wood']];
const output=selected.map(productId=>{
  const product=products.find(item=>item.id===productId&&item.type==='painting');
  if(!product)throw Error('Missing Etsy print artwork '+productId);
  const variants=sizeOrder.flatMap(([key,label])=>{
    const base=readyPrints[`print-${productId}-${key}`];
    if(!base)return [];
    const frames=frameOrder.map(([frameKey,frameLabel])=>{
      const option=readyPrints[`print-${productId}-${key}-frame-${frameKey}`];
      if(!option)throw Error(`Missing ready ${frameLabel} frame for ${productId} ${key}`);
      return {key:frameKey,label:frameLabel,price:option.amount,sku:option.sku,outerSize:option.frame.size,mat:option.mat.name,glazing:option.frame.glazing.name};
    });
    return [{key,label,price:base.amount,sku:base.sku,paperSize:base.paperSize,frames}];
  });
  if(!variants.length)throw Error('No ready print variants for '+productId);
  return {
    id:product.id,title:product.title,artist:product.artist,year:product.year||null,
    medium:product.medium||'Watercolor pastel',surface:product.surface||null,
    dimensions:product.dimensions||null,story:product.story||[],
    image:{src:product.image.src,alt:product.image.alt},
    variants
  };
});
await writeFile(new URL('../cloudflare/etsy-print-source.mjs',import.meta.url),
  `// Generated from the approved print catalog. Do not edit by hand.\nexport const sourcePrintVersion=${JSON.stringify(printVersion)};\nexport default ${JSON.stringify(output,null,2)};\n`);
console.log(`Built Etsy print source for ${output.length} paintings.`);
