import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import productData from './all-products.mjs';
import collectionData from './collections.json' with {type:'json'};
import { createHash } from 'node:crypto';

export const products = productData;
export const collections = collectionData;
export const byId = Object.fromEntries(products.map(p => [p.id, p]));
export const catalogVersion = createHash('sha256').update(JSON.stringify({products, collections})).digest('hex').slice(0, 20);
export const urlFor = p => `/products/${p.slug}/`;
export const statusLabel = p => ({available:'Available', sold:'Sold', 'not-for-sale':'Not for sale', inquiry:'Available by inquiry', retired:'Unavailable'})[p.listing?.status] || '';
export const priceLabel = (p, currency=true) => p.listing?.price ? `${p.listing.price.from ? 'From ' : ''}$${Number(p.listing.price.amount).toLocaleString('en-US', {maximumFractionDigits:2})}${currency ? ` ${p.listing.price.currency}` : ''}` : '';
export function dimensionLabel(p) {
  if (!p.dimensions) return 'Measurements available on request';
  const {width, height, unit} = p.dimensions;
  return p.dimensionOrder === 'height-width' ? `${height} × ${width} ${unit} (H × W)` : `${width} × ${height} ${unit} (W × H)`;
}
export function validateCatalog(items=products, groups=collections) {
  const ids=new Set(), slugs=new Set();
  const fail=(p,msg)=>{throw Error(`Catalog ${p.id || '(missing id)'}: ${msg}`);};
  const media=(p,img)=>{
    if (!img?.src || !img.alt) fail(p,'image and alt text required');
    if (!img.src.startsWith('/') && !img.src.startsWith('https://')) fail(p,'image URL must use HTTPS or a site path');
    if (img.src.startsWith('/') && !existsSync(resolve(process.cwd(),img.src.slice(1)))) fail(p,`missing image ${img.src}`);
  };
  for(const p of items) {
    if (!/^[a-z0-9-]+$/.test(p.id) || !/^[a-z0-9-]+$/.test(p.slug) || ids.has(p.id) || slugs.has(p.slug)) fail(p,'invalid or duplicate identity');
    // These IDs are existing Durable Object names. A URL rename needs an explicit migration.
    if(p.id!==p.slug) fail(p,'keep stock identity and slug stable');
    ids.add(p.id);slugs.add(p.slug);
    if (!p.title || !['painting','commission','book','work'].includes(p.type)) fail(p,'title or type missing');
    if (!Array.isArray(p.story)) fail(p,'story must be an array of paragraphs');
    if (['painting','book'].includes(p.type)) media(p,p.image);
    for(const img of p.examples || []) media(p,img);
    const price=p.listing?.price;
    if(p.type!=='book' && !['available','sold','not-for-sale','inquiry','retired'].includes(p.listing?.status)) fail(p,'listing status required');
    if(price && (!/^\d+\.\d{2}$/.test(price.amount) || Number(price.amount)<=0 || price.currency!=='USD')) fail(p,'positive USD price with two decimal places required');
    if(p.listing?.status==='available' && !price) fail(p,'available artwork needs a price');
    if(p.dimensions && (!['in','cm'].includes(p.dimensions.unit) || !['width','height'].every(k=>Number.isFinite(p.dimensions[k])&&p.dimensions[k]>0))) fail(p,'invalid dimensions');
    if(p.type==='book' && (!p.book?.pdfUrl?.startsWith('https://') || !p.book.purchaseUrl?.startsWith('https://www.amazon.com/'))) fail(p,'book URLs missing');
    if(p.checkout?.mode==='integrated') {
      const s=p.checkout.shipping;
      if(!price || !p.dimensions || !s || !['length','width','height','weight'].every(k=>Number.isFinite(s[k])&&s[k]>0) || !['flat','tube'].includes(s.packaging) || !['estimated','verified'].includes(s.verification)) fail(p,'explicit shipping profile and price required');
    }
    if(p.checkout?.mode==='paypal-link' && (p.checkout.link?.title!==p.title || p.checkout.link?.amount!==price?.amount || p.checkout.link?.currency!==price?.currency)) fail(p,'hosted payment link must match the listing');
  }
  for(const [key,entries] of Object.entries(groups)) {
    const seen=new Set();
    for(const entry of entries) {
      if(!ids.has(entry.product)||seen.has(entry.product)) throw Error(`Collection ${key}: unknown or duplicate ${entry.product}`);
      seen.add(entry.product);
    }
  }
  return true;
}
validateCatalog();
