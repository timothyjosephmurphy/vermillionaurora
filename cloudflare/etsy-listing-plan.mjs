// Contract sources and observed constraints: docs/etsy-api-contract.md.
const SIZE=513, FRAME=514, QUANTITY=100;
const TAGS=['art print','watercolor art','bitcoin art','wall decor','fine art print','framed art','TJ Murphy'];
const encoder=new TextEncoder();
const positive=x=>typeof x==='number'&&Number.isFinite(x)&&x>0;
const id=x=>Number.isSafeInteger(x)&&x>0;
const length=x=>Array.from(x).length;
const requireValue=(condition,message)=>{if(!condition)throw Error('Etsy preflight: '+message);};

export const labelOf=p=>p.id==='painting-shoreline-at-dusk'?p.title+' — Landscape':p.id==='el-zonte-at-sunrise'?p.title+' — Portrait':p.title;
export const titleOf=p=>labelOf(p)+' Art Print · Framed or Unframed';

// Stable across price/title/provider-code changes; identity includes the artwork,
// size, and frame. Preserve the full provider code separately for fulfillment.
export async function etsySkuForPrintId(printId){
 const bytes=new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode('vermillion-etsy-sku-v1:'+printId)));
 return 'VA-'+Array.from(bytes.slice(0,12),x=>x.toString(16).padStart(2,'0')).join('');
}

const itemText=p=>p.title+' is an archival art print by TJ Murphy, reproduced from an original '+(p.medium||'watercolor pastel')+' painting.\n\n'+p.story.join('\n\n')+'\n\n'+p.variants.map(v=>v.label+' ('+v.paperSize.width+' × '+v.paperSize.height+' in): $'+v.price+' unframed; Black frame $'+v.frames[0].price+', White frame $'+v.frames[1].price+', Natural wood frame $'+v.frames[2].price+'.').join('\n')+'\n\nFramed options use a Snow White mat and Premium Clear acrylic glazing.';

function createBody(p,s){
 const f=new URLSearchParams();
 for(const [k,v] of Object.entries({quantity:QUANTITY,title:titleOf(p),description:labelOf(p)+'. '+itemText(p),price:Math.min(...p.variants.map(v=>Number(v.price))),who_made:'someone_else',when_made:'made_to_order',taxonomy_id:s.taxonomyId,shipping_profile_id:s.shippingProfileId,readiness_state_id:s.readinessStateId,is_supply:'false',type:'physical',production_partner_ids:s.partnerId}))f.set(k,String(v));
 if(s.returnPolicyId)f.set('return_policy_id',String(s.returnPolicyId));
 for(const [key,value] of Object.entries(s.shippingPackages?.[p.id]||{}))f.set(key,String(value));
 f.set('tags',TAGS.join(','));
 return f;
}

export function validateListingPlan({body,inventory,skuMap}){
 const title=body.get('title')||'';
 requireValue(title.trim()&&length(title)<=140&&!/[^\p{L}\p{Nd}\p{P}\p{Sm}\p{Zs}™©®]/u.test(title),'listing titles must use supported characters and be at most 140 characters.');
 for(const char of ['%',':','&','+'])requireValue(title.split(char).length<=2,'a title may contain '+char+' only once.');
 requireValue(body.get('description')?.trim(),'a description is required.');
 for(const key of ['quantity','taxonomy_id','shipping_profile_id','readiness_state_id','production_partner_ids'])requireValue(id(Number(body.get(key))),key+' must be a positive integer.');
 requireValue(!body.has('return_policy_id')||id(Number(body.get('return_policy_id'))),'return_policy_id must be a positive integer.');
 requireValue(positive(Number(body.get('price'))),'listing price must be positive.');
 requireValue(body.get('type')==='physical'&&body.get('who_made')==='someone_else'&&body.get('when_made')==='made_to_order'&&body.get('is_supply')==='false'&&!body.has('state'),'these requests must create physical, made-to-order drafts marked as made by another company or person.');
 const tags=(body.get('tags')||'').split(',');
 requireValue(body.getAll('tags').length===1&&tags.length<=13&&tags.every(t=>t.trim()&&length(t)<=20&&!/[^\p{L}\p{Nd}\p{Zs}\-'™©®]/u.test(t)&&!/^[-']/.test(t)),'use at most 13 comma-separated tags of at most 20 characters each.');
 const packageFields=['item_weight','item_length','item_width','item_height'];
 if([...packageFields,'item_weight_unit','item_dimensions_unit'].some(k=>body.has(k))){
  requireValue(packageFields.every(k=>positive(Number(body.get(k)))),'calculated shipping requires all four positive measurements.');
  requireValue(['oz','lb','g','kg'].includes(body.get('item_weight_unit'))&&['in','ft','mm','cm','m','yd','inches'].includes(body.get('item_dimensions_unit')),'calculated shipping requires supported measurement units.');
 }
 const products=inventory.products,seen=new Set(),combinations=new Set();
 requireValue(Array.isArray(products)&&products.length>0&&products.length<=4900,'two-variation inventory must contain between 1 and 4900 products.');
 for(const p of products){
  requireValue(typeof p.sku==='string'&&p.sku.length>0&&length(p.sku)<=32&&!seen.has(p.sku),'each Etsy SKU must be unique and at most 32 characters.');seen.add(p.sku);
  requireValue(typeof skuMap[p.sku]?.providerSku==='string'&&skuMap[p.sku].providerSku.trim()&&skuMap[p.sku]?.printId,'each Etsy SKU needs its complete fulfillment mapping.');
  requireValue(!('product_id' in p)&&!('is_deleted' in p),'inventory requests must not contain response-only product fields.');
  requireValue(p.property_values?.length===2&&p.property_values.every((v,i)=>v.property_id===[SIZE,FRAME][i]&&v.property_name?.trim()&&Array.isArray(v.value_ids)&&v.value_ids.every(id)&&v.scale_id===null&&v.values?.length===1&&typeof v.values[0]==='string'&&v.values[0].trim()&&!/[()]/.test(v.values[0])),'size/frame variations need custom properties 513/514 and nonempty values without parentheses.');
  const combination=JSON.stringify(p.property_values.map(v=>v.values));requireValue(!combinations.has(combination),'duplicate size/frame combination.');combinations.add(combination);
  requireValue(p.offerings?.length===1,'each print option must have one offering.');
  const o=p.offerings[0];
  requireValue(positive(o.price)&&id(o.quantity)&&o.is_enabled===true&&id(o.readiness_state_id)&&o.readiness_state_id===Number(body.get('readiness_state_id')),'offerings require numeric positive prices, quantities, enabled status, and the selected processing profile.');
  requireValue(!('offering_id' in o)&&!('is_deleted' in o),'inventory requests must not contain response-only offering fields.');
 }
 const dependencies=[['price',p=>p.offerings[0].price],['quantity',p=>p.offerings[0].quantity],['sku',p=>p.sku],['readiness_state',p=>p.offerings[0].readiness_state_id]];
 const allProperties=dependencies.some(([field])=>inventory[field+'_on_property']?.length===2);
 for(const [field,value] of dependencies){
  const properties=inventory[field+'_on_property'];
  requireValue(Array.isArray(properties)&&new Set(properties).size===properties.length&&properties.every(p=>[SIZE,FRAME].includes(p))&&(!allProperties||[0,2].includes(properties.length)),'invalid '+field+'_on_property dependencies.');
  const groups=new Map();
  for(const p of products){const key=JSON.stringify(properties.map(prop=>p.property_values.find(v=>v.property_id===prop).values));requireValue(!groups.has(key)||groups.get(key)===value(p),field+' differs outside its declared variation properties.');groups.set(key,value(p));}
 }
 requireValue(Number(body.get('price'))===Math.min(...products.map(p=>p.offerings[0].price)),'listing price must match the cheapest print option.');
}

export async function buildListingPlans(works,settings){
 const plans=await Promise.all(works.map(async p=>{
  requireValue(p.variants?.length&&p.variants.every(v=>v.frames?.length===3),'each selected print size requires three frame options.');
  const image=new URL(p.image.src,'https://vermillionaurora.com');
  requireValue(image.origin==='https://vermillionaurora.com','artwork images must use the approved website.');
  const products=[],skuMap={};
  for(const size of p.variants){
   const variants=[{key:null,name:'Unframed',price:size.price,sku:size.sku},...size.frames.map(f=>({...f,name:f.label}))];
   for(const v of variants){
    const printId='print-'+p.id+'-'+size.key+(v.key?'-frame-'+v.key:'');
    const sku=await etsySkuForPrintId(printId);
    skuMap[sku]={printId,productId:p.id,sizeKey:size.key,frameKey:v.key,providerSku:v.sku};
    products.push({sku,property_values:[{property_id:SIZE,property_name:'Print size',value_ids:[],values:[size.label],scale_id:null},{property_id:FRAME,property_name:'Frame',value_ids:[],values:[v.name],scale_id:null}],offerings:[{price:Number(v.price),quantity:QUANTITY,is_enabled:true,readiness_state_id:settings.readinessStateId}]});
   }
  }
  const plan={id:p.id,body:createBody(p,settings),inventory:{products,price_on_property:[SIZE,FRAME],quantity_on_property:[],readiness_state_on_property:[],sku_on_property:[SIZE,FRAME]},skuMap};
  validateListingPlan(plan);return plan;
 }));
 const seen=new Set();
 for(const plan of plans)for(const sku of Object.keys(plan.skuMap)){requireValue(!seen.has(sku),'duplicate Etsy SKU across paintings.');seen.add(sku);}
 return plans;
}
