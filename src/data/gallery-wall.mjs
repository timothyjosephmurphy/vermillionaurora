import layout from '../../catalog/gallery-wall-layout.json' with {type:'json'};
import {byId,collections,urlFor} from '../../catalog/catalog.mjs';
import {readyPrints,config,printVersion} from '../../catalog/prints.mjs';

export const WALL_UNIT=8;
export const wallSize={width:(layout.width+24)*WALL_UNIT,height:(layout.height+24)*WALL_UNIT};
export const wallPrintVersion=printVersion;
export const wallThumbnailWidths=[320,960,1920];
const galleryIds=new Set(collections.gallery.map(p=>p.product));
const largest=new Map();
for(const p of Object.values(readyPrints)){
  if(p.testOnly||p.sampleOnly||p.frame?.key!=='black'||byId[p.productId]?.artist!=='TJ Murphy'||!galleryIds.has(p.productId))continue;
  const old=largest.get(p.productId);
  if(!old||p.frame.size.width*p.frame.size.height>old.frame.size.width*old.frame.size.height)largest.set(p.productId,p);
}
// The coordinates are measured inches, never a CSS grid that can resize the art.
if(largest.size!==layout.artworks.length||new Set(layout.artworks.map(p=>p.id)).size!==largest.size)throw Error('Review the print wall layout for the current print collection');
export const wallArtworks=layout.artworks.map(position=>{
  const product=byId[position.id],print=largest.get(position.id);
  if(!print)throw Error(`Print wall artwork unavailable: ${position.id}`);
  const source=config.artworks[product.id].source,frame=print.frame;
  const width=frame.size.width+2*frame.mouldingWidth,height=frame.size.height+2*frame.mouldingWidth;
  if(Math.abs(position.width-width)>.001||Math.abs(position.height-height)>.001)throw Error(`Review changed print wall frame dimensions: ${product.id}`);
  const url=new URL(source.url),fullSrc=url.origin==='https://vermillionaurora.com'?url.pathname:source.url;
  const variants=wallThumbnailWidths.filter(w=>w<source.widthPx).map(width=>({width,src:`/gallery-wall/${source.sha256}-${width}.webp`}));
  return {
    id:product.id,title:product.title,href:urlFor(product),printHref:`${urlFor(product)}#print-options`,
    printId:print.id,price:print.amount,currency:print.currency,frameSize:frame.size,paperSize:print.paperSize,
    imageSize:print.imageSize,frameWidth:frame.mouldingWidth*WALL_UNIT,
    x:(position.x+12)*WALL_UNIT,y:(position.y+12)*WALL_UNIT,width:width*WALL_UNIT,height:height*WALL_UNIT,
    imageWidth:print.imageSize.width*WALL_UNIT,imageHeight:print.imageSize.height*WALL_UNIT,
    fullSrc,sourceSha256:source.sha256,sourceWidth:source.widthPx,sourceHeight:source.heightPx,
    sources:[...variants,{width:source.widthPx,src:fullSrc}],
    description:`${product.medium||'Watercolor'}${product.year?` · ${product.year}`:''}`
  };
});
export {layout as wallLayout};
