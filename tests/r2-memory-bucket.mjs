// In-memory stand-in for an R2 bucket binding (get/put/head/list/delete, ranged reads, onlyIf etags, multipart).
export class Bucket {
  data=new Map();seq=0;
  async put(key,value,options={}){const prev=this.data.get(key);if(options.onlyIf?.etagMatches&&prev?.etag!==options.onlyIf.etagMatches)return null;const item={key,value,etag:String(++this.seq),...options};this.data.set(key,item);return item;}
  async get(key,options={}){const item=this.data.get(key);if(!item)return null;const text=typeof item.value==='string'?item.value:null;let body=item.value;if(options.range&&typeof body!=='string')body=body.slice(options.range.offset,options.range.offset+options.range.length);return {...item,body,size:sizeOf(item.value),text:async()=>text??new TextDecoder().decode(item.value),json:async()=>JSON.parse(text)};}
  async head(key){const item=this.data.get(key);return item?{key,size:sizeOf(item.value),httpEtag:'"'+item.etag+'"',httpMetadata:item.httpMetadata}:null;}
  uploads=new Map();
  async createMultipartUpload(key,options){const uploadId='up'+(++this.seq);this.uploads.set(uploadId,{key,options,parts:new Map()});return {key,uploadId};}
  resumeMultipartUpload(key,uploadId){const bucket=this;const u=()=>{const x=bucket.uploads.get(uploadId);if(!x||x.key!==key)throw Error('NoSuchUpload');return x;};return {
    async uploadPart(n,bytes){const x=u();const etag='e'+n+'-'+(++bucket.seq);x.parts.set(n,{etag,bytes:new Uint8Array(bytes)});return {partNumber:n,etag};},
    async complete(parts){const x=u();const chunks=parts.map(p=>{const got=x.parts.get(p.partNumber);if(!got||got.etag!==p.etag)throw Error('InvalidPart');return got.bytes;});const all=new Uint8Array(chunks.reduce((n,c)=>n+c.length,0));let o=0;for(const c of chunks){all.set(c,o);o+=c.length;}bucket.uploads.delete(uploadId);return bucket.put(key,all,x.options);},
    async abort(){u();bucket.uploads.delete(uploadId);}};}
  async delete(keys){for(const key of Array.isArray(keys)?keys:[keys])this.data.delete(key);}
  async list({prefix='',limit=1000,cursor}){const all=[...this.data.values()].filter(x=>x.key.startsWith(prefix)).sort((a,b)=>a.key.localeCompare(b.key));const rest=all.filter(x=>!cursor||x.key>cursor),objects=rest.slice(0,limit);return {objects,truncated:rest.length>limit,cursor:objects.at(-1)?.key};}
}
export const sizeOf=v=>typeof v==='string'?new TextEncoder().encode(v).length:v.byteLength;
