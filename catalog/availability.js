// Static content is always readable; live stock overrides availability after load.
(() => {
 const nodes=[...document.querySelectorAll('[data-product-id]')];
 const ids=[...new Set(nodes.map(node=>node.dataset.productId))];
 if(!ids.length)return;
 const endpoint='/inventory/status';
 const labels={available:'Available',inquiry:'Available by inquiry',reserved:'Temporarily reserved',sold:'Sold',unavailable:'Not currently available','not-for-sale':'Not for sale',retired:'Unavailable'};
 const availableTrack=document.querySelector('[data-available-paintings]');
 const collectorTrack=document.querySelector('[data-collector-paintings]');
 // Build order of every homepage painting card, so a card that leaves a track and comes back
 // (a 15-minute cart hold expiring, say) returns to its own place instead of the end.
 const homeOrder=new Map();
 [availableTrack,collectorTrack].forEach((track,t)=>{if(track)[...track.children].forEach((child,i)=>homeOrder.set(child,t*10000+i));});
 function moveHomepagePainting(node,value){
  if(!availableTrack||!collectorTrack||!node.matches('.product-card'))return;
  if(node.parentElement!==availableTrack&&node.parentElement!==collectorTrack)return;
  const target=['available','inquiry'].includes(value)?availableTrack:collectorTrack;
  if(node.parentElement===target)return;
  const order=homeOrder.get(node)??Infinity;
  const next=[...target.children].find(child=>(homeOrder.get(child)??Infinity)>order);
  target.insertBefore(node,next||null);
 }
 // Moving a card changes what sits under the visitor's thumb. Pin the first visible slide of each
 // track and restore its offset in the same task, before paint, so the carousel does not jump.
 function anchorTracks(){
  return [availableTrack,collectorTrack].filter(Boolean).map(track=>{
   const left=track.getBoundingClientRect().left;
   // Every slide from the first visible one on, in case that one is the card that moves away.
   const children=[...track.children],first=children.findIndex(child=>child.getBoundingClientRect().right>left+1);
   return {track,candidates:first<0?[]:children.slice(first).map(child=>({child,offset:child.getBoundingClientRect().left-left}))};
  });
 }
 function restoreTracks(anchors){
  for(const {track,candidates} of anchors){
   const kept=candidates.find(({child})=>child.parentElement===track);
   if(!kept)continue;
   const drift=kept.child.getBoundingClientRect().left-track.getBoundingClientRect().left-kept.offset;
   if(Math.abs(drift)>=1)track.scrollLeft+=drift;
  }
 }
 function updateHomepageEmptyMessages(){
  // The homepage only ships empty-state text when a track is really empty; add it here if live stock empties one.
  const toggle=(empty,hasItems,text)=>{if(!empty)return;if(!hasItems&&!empty.textContent.trim())empty.textContent=text;empty.hidden=hasItems;};
  if(availableTrack)toggle(document.querySelector('[data-available-empty]'),availableTrack.querySelectorAll('[data-product-id]').length>0,'No original paintings are available right now. Browse the collector\u2019s items or ask about a commission.');
  if(collectorTrack)toggle(document.querySelector('[data-collector-empty]'),collectorTrack.children.length>0,'There are no sold or unavailable works in this selection right now.');
 }
 for(const node of nodes){
  node.querySelectorAll('[data-live-status]').forEach(el=>{el.dataset.initialText=el.textContent;});
  node.querySelectorAll('[data-card-price]').forEach(el=>{el.dataset.price=el.textContent;});
  if(node.dataset.caption)node.dataset.initialCaption=node.dataset.caption;
 }
 let busy=false,lastSignature;
 async function refresh() {
  if(busy||document.hidden)return;busy=true;
  try {
   const status={};
   for(let i=0;i<ids.length;i+=80){const response=await fetch(`${endpoint}?ids=${encodeURIComponent(ids.slice(i,i+80).join(','))}`,{cache:'no-store',signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error('Availability unavailable');Object.assign(status,(await response.json()).availability);}
   const signature=JSON.stringify(status);if(signature===lastSignature)return;lastSignature=signature;
   const anchors=anchorTracks();
   for(const node of nodes) {
    const value=status[node.dataset.productId],label=labels[value];if(!label)continue;
    node.dataset.availability=label;
    node.querySelectorAll('[data-live-status]').forEach(el=>{el.textContent=value==='available'?el.dataset.initialText:label;if(value!=='available')el.hidden=false;});
    node.querySelectorAll('[data-card-price]').forEach(el=>{el.textContent=value==='available'?el.dataset.price:label;});
    if(node.dataset.caption){node.dataset.caption=value==='available'?node.dataset.initialCaption:node.dataset.initialCaption.replace(/ · [^]*$/,' · '+label);}
    if(node.dataset.buy!==undefined){const buy=['available','inquiry'].includes(value)||!!node.dataset.printsFrom;node.dataset.buy=String(buy);node.querySelectorAll('[data-card-buy]').forEach(el=>{el.hidden=!buy;el.textContent=value==='available'?'Buy':value==='inquiry'?'Inquire':'Buy a print';});}
    node.querySelectorAll('[data-original-purchase]').forEach(el=>{el.hidden=!['available','inquiry'].includes(value);});
    moveHomepagePainting(node,value);
   }
   restoreTracks(anchors);
   updateHomepageEmptyMessages();
   document.dispatchEvent(new CustomEvent('catalog:availability',{detail:status}));
  }catch { /* Keep inquiry links and server-authoritative checkout available. */ }
  finally{busy=false;}
 }
 refresh();setInterval(refresh,30000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
})();
