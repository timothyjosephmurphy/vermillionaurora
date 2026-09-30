import {frameCatalog,frameSelection} from '../../catalog/frame-matching.mjs';

const element=(tag,text,className)=>{const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;return el;};
function render(root,paper,image){
  const selection=frameSelection(paper,image,'print'),list=root.querySelector('[data-frame-list]');
  root.querySelector('[data-frame-size]').textContent=selection.summary;
  list.replaceChildren(...selection.options.map(frame=>{
    const card=element('article','','frame-option');
    card.append(element('p',frame.label,`frame-fit${frame.fit==='direct'?' frame-fit-direct':''}`),element('h4',frame.title),element('p',frame.brand,'frame-brand'),element('p',frame.detail,'frame-detail'));
    const link=element('a','Check price on Amazon ↗','frame-link');
    link.href=frame.href;link.target='_blank';link.rel=frameCatalog.affiliateTag?'sponsored noopener noreferrer':'noopener noreferrer';
    link.setAttribute('aria-label',`Check ${frame.title} ${frame.brand} frame price on Amazon (opens in a new tab)`);
    card.append(link);return card;
  }));
  const empty=root.querySelector('[data-frame-empty]');empty.hidden=selection.options.length>0;empty.textContent=selection.empty;
}
export function initializeFrameRecommendations(){
  const start=()=>document.querySelectorAll('[data-frame-recommendations][data-frame-context="print"]').forEach(root=>{
    if(root.dataset.frameInitialized)return;root.dataset.frameInitialized='true';
    const selector=root.closest('[data-print-options]');if(!selector){render(root,null,null);return;}
    const update=()=>{
      let options;try{options=JSON.parse(selector.dataset.options||'[]');}catch{options=[];}
      const value=selector.querySelector('input[type="radio"]:checked')?.value;
      const selected=Array.isArray(options)?options.find(option=>option.id===value):null;
      // Never substitute image dimensions when the physical sheet is unknown.
      render(root,selected?.paper||selected?.paperSize||null,selected?.image||selected?.imageSize||null);
    };
    selector.addEventListener('change',event=>{if(event.target.matches('input[type="radio"]'))update();});
    selector.addEventListener('print:selectionchange',update);
    update();
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}
