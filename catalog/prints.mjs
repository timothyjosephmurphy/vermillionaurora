import {createHash} from 'node:crypto';
import {products} from './catalog.mjs';
import config from './prints.json' with {type:'json'};
import papers from './prodigi-papers.json' with {type:'json'};
import {printOptions,sizeLabel} from './print-sizing.mjs';
export {config,papers,printOptions,sizeLabel};
export const printVersion=createHash('sha256').update(JSON.stringify({config,papers,dimensions:products.map(p=>[p.id,p.dimensions])})).digest('hex').slice(0,20);
// Every measured painting gets a review page. Public ordering is still gated by
// an explicit artwork entry with verified source, paper, and price data.
export const proposals=products.filter(p=>p.type==='painting'&&p.dimensions).map(product=>({product,options:printOptions(product,config,papers)}));
export const readyPrints=Object.fromEntries(proposals.flatMap(({product,options})=>options.filter(o=>o.ready).map(o=>[o.id,{
  id:o.id,type:'print',productId:product.id,title:`${product.title} — ${o.label}`,artworkTitle:product.title,
  amount:o.amount,currency:'USD',sku:o.paper.sku,scale:o.scale,imageSize:o.image,paperSize:{width:o.paper.width,height:o.paper.height,unit:'in'},paper:o.paperLabel,testOnly:o.testOnly,
  assetUrl:o.asset.url,assetSha256:o.asset.sha256||null,sourceSha256:config.artworks[product.id].source.sha256,
  preview:product.image,attributes:{},minimumDpi:config.minimumDpi
}])));
for(const [id,art] of Object.entries(config.artworks)) {
  if(!products.some(p=>p.id===id&&p.type==='painting'))throw Error(`Unknown print artwork: ${id}`);
  if(art.enabled&&!proposals.find(p=>p.product.id===id)?.options.some(o=>o.ready))throw Error(`Enabled prints have no ready variants: ${id}`);
}
