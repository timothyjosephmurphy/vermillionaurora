// Small overview images come from the same untouched masters used at maximum zoom.
import sharp from 'sharp';
import {readFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {wallArtworks,wallThumbnailWidths,wallSize} from '../src/data/gallery-wall.mjs';
await mkdir('static/gallery-wall',{recursive:true});
let cursor=0;
await Promise.all(Array.from({length:3},async()=>{
  while(cursor<wallArtworks.length){
    const art=wallArtworks[cursor++];
    // All current TJ masters are versioned local assets; reject an unreviewed source move.
    if(!/^\/print-masters\/[a-f0-9]{64}\.jpg$/.test(art.fullSrc))throw Error(`Review wall master location: ${art.id}`);
    const bytes=await readFile(`static${art.fullSrc}`);
    if(createHash('sha256').update(bytes).digest('hex')!==art.sourceSha256)throw Error(`Changed wall master: ${art.id}`);
    const metadata=await sharp(bytes).metadata();
    if(metadata.width!==art.sourceWidth||metadata.height!==art.sourceHeight)throw Error(`Changed wall master dimensions: ${art.id}`);
    for(const width of wallThumbnailWidths.filter(w=>w<art.sourceWidth)){
      await sharp(bytes).resize({width,withoutEnlargement:true}).webp({quality:width<960?82:92,effort:4}).toFile(`static/gallery-wall/${art.sourceSha256}-${width}.webp`);
    }
  }
}));
console.log(`Prepared progressive previews for ${wallArtworks.length} gallery-wall prints; full-resolution masters unchanged.`);

// Exact miniature of the measured wall, framed as one artwork for the homepage carousel.
const scale=.98,left=94,top=64,composite=[];
const rectangle=(width,height,color)=>({create:{width,height,channels:4,background:color}});
for(const art of wallArtworks){
  const x=left+Math.round(art.x*scale),y=top+Math.round(art.y*scale),w=Math.round(art.width*scale),h=Math.round(art.height*scale),border=Math.max(1,Math.round(art.frameWidth*scale));
  composite.push({input:await sharp(rectangle(w,h,'#272320')).png().toBuffer(),left:x,top:y});
  composite.push({input:await sharp(rectangle(w-border*2,h-border*2,'#fffefb')).png().toBuffer(),left:x+border,top:y+border});
  const iw=Math.round(art.imageWidth*scale),ih=Math.round(art.imageHeight*scale);
  composite.push({input:await sharp(`static${art.fullSrc}`).resize({width:iw,height:ih,fit:'contain',background:'#fffefb'}).png().toBuffer(),left:x+Math.round((w-iw)/2),top:y+Math.round((h-ih)/2)});
}
const background=Buffer.from(`<svg width="1600" height="880"><rect width="1600" height="880" fill="#e8e0d4"/><rect x="18" y="18" width="1564" height="844" rx="2" fill="#262321"/><rect x="32" y="32" width="1536" height="816" fill="#fcfaf5"/><rect x="94" y="64" width="${wallSize.width*scale}" height="${wallSize.height*scale}" fill="#eee8dd"/></svg>`);
await sharp(background).composite(composite).webp({quality:91}).toFile('static/gallery-wall/framed-wall.webp');
