import {clamp,fitView,paintingView,zoomAt,constrainView,screenRect,intersects,imageSource,focusArtwork,panelPosition} from './gallery-wall-math.mjs';

function initializeWall(){
  const root=document.querySelector('[data-gallery-wall]');if(!root)return;
  const {artworks,world,printVersion}=JSON.parse(root.querySelector('[data-wall-data]').textContent);
  const viewport=root.querySelector('[data-wall-viewport]'),scene=root.querySelector('[data-wall-scene]');
  const panel=root.querySelector('[data-wall-panel]'),buy=panel.querySelector('[data-wall-buy]');
  const status=root.querySelector('[data-wall-status]'),zoomLabel=root.querySelector('[data-wall-zoom]');
  const picker=root.querySelector('[data-wall-picker]'),byId=new Map(artworks.map(art=>[art.id,art]));
  const imageStates=new Map(artworks.map(art=>[art.id,{img:root.querySelector(`[data-art-image="${art.id}"]`),width:art.sources[0].width,loading:false,failed:new Set()}]));
  let view={width:viewport.clientWidth,height:viewport.clientHeight},fit=fitView(view,world),transform={...fit};
  let focused=null,dismissed=null,frame=0,imageTimer=0,activeLoads=0,busy=false,capabilities=null;
  let focusPoint={x:view.width/2,y:view.height/2};
  let immersive=false,animation=0,animationResolve=null,navigating=false;
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const transitionStyle=document.createElement('style');document.head.append(transitionStyle);
  const enableProductTransition=enabled=>{transitionStyle.textContent=`@view-transition{navigation:${enabled?'auto':'none'}}`;};
  const outside=[...document.querySelectorAll('.site-header,.wall-intro,.wall-caption,.wall-index,.site-footer')];
  const maxScale=()=>Math.max(...artworks.map(a=>paintingView(a,view).scale));
  const limitAt=point=>{
    const art=focusArtwork(artworks,transform,view,0,point);
    return {art,scale:art?paintingView(art,view).scale:maxScale()};
  };
  const pointers=new Map();let gesture=null,moved=false,pinched=false,suppressClickUntil=0;
  const money=amount=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(Number(amount));
  const size=s=>`${Number(s.width.toFixed(2))} × ${Number(s.height.toFixed(2))} in`;
  const livePrint=art=>capabilities?.enabled&&capabilities.version?.endsWith('-'+printVersion)?capabilities.products?.find(p=>p.id===art.printId&&p.status==='available'):null;
  function updateBuy(){
    if(!focused)return;
    const live=livePrint(focused);
    buy.disabled=busy||!live;
    buy.textContent=busy?'Adding…':'Buy this framed print';
    panel.querySelector('[data-wall-price]').textContent=money(live?.amount||focused.price);
    panel.querySelector('[data-wall-availability]').textContent=live?'Shipping and tax calculated in your cart.':'See the product page for current print options.';
  }
  function setFocus(art){
    if(focused?.id===art?.id)return;
    focused=art;
    root.dataset.focusedArt=art?.id||'';
    if(!art){dismissed=null;return;}
    picker.value=art.id;
    panel.querySelector('[data-wall-title]').textContent=art.title;
    panel.querySelector('[data-wall-medium]').textContent=art.description;
    panel.querySelector('[data-wall-print-size]').textContent=`Print: ${size(art.paperSize)}`;
    panel.querySelector('[data-wall-frame-size]').textContent=`Mat / frame: ${size(art.frameSize)}`;
    panel.querySelector('[data-wall-product]').href=art.href;
    panel.querySelector('[data-wall-options]').href=art.printHref;
    panel.querySelector('[data-wall-message]').textContent='';
    updateBuy();
  }
  function render(){
    frame=0;
    scene.style.transform=`translate(${transform.x}px,${transform.y}px) scale(${transform.scale})`;
    zoomLabel.textContent=`${Math.round(transform.scale/fit.scale*100)}%`;
    root.querySelector('[data-wall-minus]').disabled=transform.scale<=fit.scale*1.001;
    root.querySelector('[data-wall-plus]').disabled=transform.scale>=limitAt({x:view.width/2,y:view.height/2}).scale*.999;
    if(!busy)setFocus(focusArtwork(artworks,transform,view,fit.scale,focusPoint));
    const panelView={...view,height:view.height-(view.width<=760&&!immersive?106:64)};
    const obstacles=artworks.map(art=>screenRect(art,transform)).filter(rect=>intersects(rect,panelView,12));
    const pos=focused&&!pointers.size&&!animation&&!navigating?panelPosition(screenRect(focused,transform),panelView,{width:panel.offsetWidth,height:panel.offsetHeight},obstacles):null;
    const shown=pos&&focused&&focused.id!==dismissed;
    panel.classList.toggle('is-visible',!!shown);panel.inert=!shown;panel.setAttribute('aria-hidden',String(!shown));
    if(shown){
      panel.style.left=`${pos.x}px`;panel.style.top=`${pos.y}px`;
    }
    clearTimeout(imageTimer);imageTimer=setTimeout(loadVisibleDetail,100);
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(render);}
  function change(next){transform=constrainView({...next,scale:clamp(next.scale,fit.scale,maxScale())},view,world);schedule();}
  function cancelAnimation(){cancelAnimationFrame(animation);animation=0;if(animationResolve){animationResolve(false);animationResolve=null;}root.dataset.animating='false';}
  function animateTo(next,duration=650){
    cancelAnimation();
    if(reducedMotion.matches){change(next);render();return Promise.resolve(true);}
    const start={...transform},started=performance.now();root.dataset.animating='true';
    return new Promise(resolve=>{
      animationResolve=resolve;
      const tick=now=>{
        const progress=Math.min(1,(now-started)/duration),ease=1-Math.pow(1-progress,3);
        const scale=start.scale*Math.pow(next.scale/start.scale,ease);
        const ratio=Math.abs(next.scale-start.scale)>.0001?(scale-start.scale)/(next.scale-start.scale):ease;
        transform={scale,x:start.x+(next.x-start.x)*ratio,y:start.y+(next.y-start.y)*ratio};
        render();
        if(progress<1)animation=requestAnimationFrame(tick);
        else{animation=0;animationResolve=null;root.dataset.animating='false';schedule();resolve(true);}
      };
      animation=requestAnimationFrame(tick);
    });
  }
  function setImmersive(enabled){
    if(immersive===enabled)return {x:0,y:0};
    const before=viewport.getBoundingClientRect();
    immersive=enabled;document.body.classList.toggle('wall-immersive',enabled);root.dataset.immersive=String(enabled);
    outside.forEach(el=>{el.inert=enabled;});
    const after=viewport.getBoundingClientRect(),offset={x:before.left-after.left,y:before.top-after.top};
    view={width:viewport.clientWidth,height:viewport.clientHeight};fit=fitView(view,world);
    transform={...transform,x:transform.x+offset.x,y:transform.y+offset.y};
    focusPoint={x:focusPoint.x+offset.x,y:focusPoint.y+offset.y};
    for(const [id,p] of pointers)pointers.set(id,{x:p.x+offset.x,y:p.y+offset.y});
    schedule();return offset;
  }
  function zoom(factor,point){
    if(navigating)return;cancelAnimation();
    point||={x:view.width/2,y:view.height/2};
    if(factor>1){const offset=setImmersive(true);point={x:point.x+offset.x,y:point.y+offset.y};}
    focusPoint=point;
    const limit=limitAt(point),scale=clamp(transform.scale*factor,fit.scale,Math.max(transform.scale,limit.scale));
    if(factor<1&&scale<=fit.scale*1.001){reset();return;}
    if(factor>1&&limit.art&&scale>=limit.scale*.999){focusPoint={x:view.width/2,y:(view.height-64)/2};animateTo(paintingView(limit.art,view),260);}
    else change(zoomAt(transform,point,scale));
  }
  function reset(){navigating=false;enableProductTransition(false);cancelAnimation();setImmersive(false);dismissed=null;focusPoint={x:view.width/2,y:view.height/2};setFocus(null);picker.value='';animateTo({...fit});status.textContent='The full print wall is in view.';}
  function focusById(id){
    const art=byId.get(id);if(!art)return Promise.resolve(false);
    setImmersive(true);dismissed=null;focusPoint={x:view.width/2,y:(view.height-64)/2};
    setFocus(art);status.textContent=`Viewing ${art.title}.`;
    return animateTo(paintingView(art,view));
  }
  async function visitPainting(art){
    if(navigating)return;navigating=true;
    enableProductTransition(true);
    const prefetch=document.createElement('link');prefetch.rel='prefetch';prefetch.href=art.href;prefetch.as='document';document.head.append(prefetch);
    const complete=await focusById(art.id);
    if(!complete||!navigating)return;
    imageStates.get(art.id).img.style.viewTransitionName='wall-painting';
    status.textContent=`Opening ${art.title}.`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{if(navigating)location.assign(art.href);}));
  }
  // CSS transforms do not update srcset's layout width. Explicitly select the
  // rendition needed for the on-screen image, and keep the full master as the last level.
  function loadVisibleDetail(){
    const candidates=[];
    for(const art of artworks){
      const state=imageStates.get(art.id),rect=screenRect(art,transform);
      if(!intersects(rect,view,70)){
        if(state.width>960&&!state.loading){state.img.src=art.sources[0].src;state.width=art.sources[0].width;}
        continue;
      }
      const nearMaximum=focused?.id===art.id&&transform.scale>=paintingView(art,view).scale*.95;
      const source=nearMaximum?art.sources.at(-1):imageSource(art.sources,art.imageWidth*transform.scale*Math.max(1,devicePixelRatio));
      if(source.width>state.width&&!state.loading&&!state.failed.has(source.src))candidates.push({art,state,source});
    }
    candidates.sort((a,b)=>(b.art.id===focused?.id?1:0)-(a.art.id===focused?.id?1:0));
    for(const {art,state,source} of candidates){
      if(activeLoads>=2)break;
      activeLoads++;state.loading=true;
      const image=new Image();image.decoding='async';image.src=source.src;
      image.decode().then(()=>{
        if(intersects(screenRect(art,transform),view,70)&&source.width>state.width){
          state.img.src=source.src;state.width=source.width;state.img.dataset.loadedWidth=String(source.width);
        }
      }).catch(()=>{state.failed.add(source.src);}).finally(()=>{activeLoads--;state.loading=false;setTimeout(loadVisibleDetail,0);});
    }
  }
  const point=event=>{const rect=viewport.getBoundingClientRect();return {x:event.clientX-rect.left,y:event.clientY-rect.top};};
  const midpoint=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
  function rebaseGesture(){
    const list=[...pointers.values()];
    gesture=list.length?{transform:{...transform},start:list[0],center:list.length>1?midpoint(list[0],list[1]):list[0],distance:list.length>1?Math.hypot(list[0].x-list[1].x,list[0].y-list[1].y):0}:null;
  }
  viewport.addEventListener('pointerdown',event=>{
    if(event.button!==0||event.target.closest('[data-wall-ui]'))return;
    if(navigating)return;cancelAnimation();
    if(!pointers.size){moved=false;pinched=false;}
    pointers.set(event.pointerId,point(event));
    (event.target.closest('a')||viewport).setPointerCapture(event.pointerId);
    if(pointers.size>1){moved=true;pinched=true;setImmersive(true);}
    rebaseGesture();viewport.classList.add('is-dragging');schedule();
  });
  viewport.addEventListener('pointermove',event=>{
    if(!pointers.has(event.pointerId)||!gesture)return;
    pointers.set(event.pointerId,point(event));
    const list=[...pointers.values()];
    if(list.length>1&&gesture.distance>0){
      const center=midpoint(list[0],list[1]),distance=Math.hypot(list[0].x-list[1].x,list[0].y-list[1].y);
      const limit=limitAt(center),scale=clamp(gesture.transform.scale*distance/gesture.distance,fit.scale,Math.max(gesture.transform.scale,limit.scale));
      const next=zoomAt(gesture.transform,gesture.center,scale);
      next.x+=center.x-gesture.center.x;next.y+=center.y-gesture.center.y;moved=true;focusPoint=center;change(next);
    }else{
      const dx=list[0].x-gesture.start.x,dy=list[0].y-gesture.start.y;
      if(Math.hypot(dx,dy)>5)moved=true;
      if(moved){focusPoint={x:view.width/2,y:view.height/2};change({...gesture.transform,x:gesture.transform.x+dx,y:gesture.transform.y+dy});}
    }
  });
  const endPointer=event=>{
    if(!pointers.has(event.pointerId))return;
    pointers.delete(event.pointerId);
    if(moved||event.type==='pointercancel')suppressClickUntil=performance.now()+400;
    rebaseGesture();if(!pointers.size){
      viewport.classList.remove('is-dragging');
      const limit=limitAt(focusPoint);
      if(moved&&immersive&&transform.scale<=fit.scale*1.001)reset();
      else if(pinched&&limit.art&&transform.scale>=limit.scale*.999){focusPoint={x:view.width/2,y:(view.height-64)/2};animateTo(paintingView(limit.art,view),220);}
    }schedule();
  };
  viewport.addEventListener('pointerup',endPointer);viewport.addEventListener('pointercancel',endPointer);viewport.addEventListener('lostpointercapture',endPointer);
  viewport.addEventListener('click',event=>{
    if(event.target.closest('[data-wall-ui]'))return;
    if(performance.now()<suppressClickUntil){event.preventDefault();event.stopImmediatePropagation();return;}
    const anchor=event.target.closest('[data-wall-art]');
    if(anchor&&event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();visitPainting(byId.get(anchor.dataset.wallArt));}
  },true);
  viewport.addEventListener('dragstart',event=>event.preventDefault());
  viewport.addEventListener('wheel',event=>{
    if(event.target.closest('.wall-tools'))return;
    event.preventDefault();
    const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?view.height:1);
    zoom(Math.exp(-clamp(delta,-100,100)*(event.ctrlKey ? .008 : .0025)),point(event));
  },{passive:false});
  viewport.addEventListener('keydown',event=>{
    if(event.target.closest('[data-wall-ui]'))return;
    if(['+','=','-','0','Home','Escape','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))event.preventDefault();else return;
    if(['0','Home','Escape'].includes(event.key))reset();
    else if(['+','='].includes(event.key))zoom(1.5);
    else if(event.key==='-')zoom(1/1.5);
    else {if(navigating)return;cancelAnimation();focusPoint={x:view.width/2,y:view.height/2};change({...transform,x:transform.x+({ArrowLeft:70,ArrowRight:-70}[event.key]||0),y:transform.y+({ArrowUp:70,ArrowDown:-70}[event.key]||0)});}
  });
  // Tabbing through real product links keeps the current link visible at any zoom.
  viewport.addEventListener('focusin',event=>{
    const anchor=event.target.closest('[data-wall-art]');if(!anchor||!anchor.matches(':focus-visible'))return;
    if(!intersects(screenRect(byId.get(anchor.dataset.wallArt),transform),view,-30))focusById(anchor.dataset.wallArt);
  });
  root.querySelector('[data-wall-plus]').addEventListener('click',()=>zoom(1.5));
  root.querySelector('[data-wall-minus]').addEventListener('click',()=>zoom(1/1.5));
  root.querySelector('[data-wall-fit]').addEventListener('click',reset);
  picker.addEventListener('change',()=>{if(picker.value)focusById(picker.value);else reset();});
  panel.querySelector('[data-wall-close]').addEventListener('click',()=>{dismissed=focused?.id;viewport.focus({preventScroll:true});schedule();});
  const full=root.querySelector('[data-wall-fullscreen]');
  full.hidden=!viewport.requestFullscreen;
  full.addEventListener('click',async()=>{
    try{if(document.fullscreenElement===viewport)await document.exitFullscreen();else await viewport.requestFullscreen();}catch{status.textContent='Full-screen view is unavailable in this browser.';}
  });
  document.addEventListener('fullscreenchange',()=>{full.textContent=document.fullscreenElement===viewport?'Exit full screen':'Full screen';});
  new ResizeObserver(()=>{
    const next={width:viewport.clientWidth,height:viewport.clientHeight};if(!next.width||!next.height)return;
    if(next.width===view.width&&next.height===view.height)return;
    cancelAnimation();
    const wasFit=Math.abs(transform.scale-fit.scale)<.001;
    const center={x:(view.width/2-transform.x)/transform.scale,y:(view.height/2-transform.y)/transform.scale};
    focusPoint={x:focusPoint.x*next.width/view.width,y:focusPoint.y*next.height/view.height};
    view=next;fit=fitView(view,world);
    const scale=clamp(transform.scale,fit.scale,maxScale());
    change(wasFit?{...fit}:focused?paintingView(focused,view):{scale,x:view.width/2-center.x*scale,y:view.height/2-center.y*scale});
  }).observe(viewport);
  buy.addEventListener('click',()=>{
    if(buy.disabled||!focused||busy)return;
    const art=focused;busy=true;updateBuy();
    panel.querySelector('[data-wall-message]').textContent='Adding this framed print to your cart…';
    document.dispatchEvent(new CustomEvent('cart:add-print',{detail:{id:art.printId,quantity:1,onResult:result=>{
      busy=false;updateBuy();panel.querySelector('[data-wall-message]').textContent=result.message;
      if(result.ok)location.assign('/cart/');
    }}}));
  });
  Promise.resolve(window.vaCartReady).then(value=>{capabilities=value;updateBuy();});
  window.addEventListener('pageshow',()=>{navigating=false;enableProductTransition(false);for(const state of imageStates.values())state.img.style.viewTransitionName='';schedule();});
  viewport.classList.add('is-ready');root.dataset.ready='true';render();
  const requested=new URLSearchParams(location.hash.slice(1)).get('painting');if(requested)focusById(requested);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initializeWall,{once:true});else initializeWall();
