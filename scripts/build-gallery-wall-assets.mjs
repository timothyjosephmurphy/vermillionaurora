// Small overview images come from the same untouched masters used at maximum zoom.
import sharp from 'sharp';
import {readFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {wallArtworks,wallThumbnailWidths} from '../src/data/gallery-wall.mjs';
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
