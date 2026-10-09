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

// Paintings the owner-only Etsy sync may create or update (one print listing and one original listing each).
const syncIds = ['el-zonte-before-dawn', 'painting-shoreline-at-dusk', 'el-zonte-at-sunrise',
  'sunrise-in-el-zonte-large', 'meditation-at-denny-blaine', 'painting-moonlit-water',
  'painting-red-horizon', 'hope-the-vermillion-aurora'];
const syncOutput = syncIds.map(productId => {
  const product = products.find(item => item.id === productId && item.type === 'painting');
  if (!product) throw Error('Missing Etsy sync artwork ' + productId);
  if (/punto/i.test(product.title + ' ' + (product.story || []).join(' '))) throw Error('Punto spelling in ' + productId);
  const variants = sizeOrder.flatMap(([key, label]) => {
    const base = readyPrints[`print-${productId}-${key}`];
    if (!base) throw Error('Missing ready print ' + productId + ' ' + key);
    if (base.paper !== 'Watercolor Bright White') throw Error('Unexpected print paper for ' + productId + ': ' + base.paper);
    const frames = frameOrder.map(([frameKey, frameLabel]) => {
      const option = readyPrints[`print-${productId}-${key}-frame-${frameKey}`];
      if (!option) throw Error(`Missing ready ${frameLabel} frame for ${productId} ${key}`);
      return {key: frameKey, label: frameLabel, price: option.amount, sku: option.sku, outerSize: option.frame.size, mat: option.mat.name, glazing: option.frame.glazing.name};
    });
    return [{key, label, price: base.amount, sku: base.sku, paperSize: base.paperSize, frames}];
  });
  const ship = product.checkout?.shipping;
  if (!ship || ship.packaging !== 'tube' || !(ship.weight > 0) || !(ship.length > 0)) throw Error('Original tube shipping is not recorded for ' + productId);
  return {
    id: product.id, title: product.title, story: product.story || [],
    medium: product.medium || 'Watercolor pastel',
    dimensions: product.dimensions, image: {src: product.image.src, alt: product.image.alt},
    ...(product.gallery?.[0]?.alt ? {roomAlt: product.gallery[0].alt} : {}),
    variants,
    original: {
      price: product.listing.price.amount,
      currency: product.listing.price.currency,
      shipping: {
        item_weight: ship.weight, item_length: ship.length, item_width: ship.width, item_height: ship.height,
        item_weight_unit: 'lb', item_dimensions_unit: 'in'
      }
    }
  };
});
await writeFile(new URL('../cloudflare/etsy-sync-source.mjs', import.meta.url),
  `// Generated from the approved catalog for the targeted Etsy sync. Do not edit by hand.\nexport const syncSourceVersion=${JSON.stringify(printVersion)};\nexport default ${JSON.stringify(syncOutput, null, 2)};\n`);
console.log(`Built Etsy sync source for ${syncOutput.length} paintings.`);
