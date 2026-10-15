// Register the committed Older Work group masters as print sources after verifying their checksums.
// Masters are crops of the archive photographs made off-site; R2 originals are never modified.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import recipes from '../catalog/older-work-print-masters.json' with {type:'json'};
const url=new URL('../catalog/prints.json',import.meta.url),config=JSON.parse(await readFile(url,'utf8'));
for(const r of recipes){
  const u=new URL(r.url);if(u.origin!=='https://vermillionaurora.com'||!/^\/print-masters\/[a-f0-9]{64}\.jpg$/.test(u.pathname))throw Error('Unexpected Older Work master location');
  const bytes=await readFile(new URL('../static'+u.pathname,import.meta.url)),sha256=createHash('sha256').update(bytes).digest('hex');
  if(sha256!==r.sha256)throw Error('Changed Older Work master: '+r.id);
  const {width,height}=await sharp(bytes).metadata();if(width!==r.widthPx||height!==r.heightPx)throw Error('Changed master dimensions: '+r.id);
  const source={url:r.url,widthPx:width,heightPx:height,sha256},previous=config.artworks[r.id];
  if(previous&&JSON.stringify(previous.source)!==JSON.stringify(source))throw Error('Existing Older Work print source changed: '+r.id);
  const art=previous||{enabled:false,sizing:'image-proportional',sizingApproved:true,paper:config.defaultPaper,source,variants:{}};
  if(r.layoutOptions)art.layoutOptions=r.layoutOptions;
  config.artworks[r.id]=art;
}
config.artworks=Object.fromEntries(Object.entries(config.artworks).sort(([a],[b])=>a.localeCompare(b)));
await writeFile(url,JSON.stringify(config,null,2)+'\n');
console.log(`Registered ${recipes.length} checksum-verified Older Work masters.`);
