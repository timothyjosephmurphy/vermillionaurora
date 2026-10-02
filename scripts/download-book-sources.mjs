import manifest from '../catalog/book-galleries.json' with {type:'json'};
import {mkdir,writeFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
await mkdir(process.argv[2],{recursive:true});
for(const b of manifest.books){const r=await fetch(b.pdfUrl);if(!r.ok)throw Error('Book download failed');const data=Buffer.from(await r.arrayBuffer());if(createHash('sha256').update(data).digest('hex')!==b.sha256)throw Error('Book changed; re-review before extracting');await writeFile(`${process.argv[2]}/${b.id}.pdf`,data);}
