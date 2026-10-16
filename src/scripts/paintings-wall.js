import {clamp,fitView,paintingView,inspectionView,zoomAt,constrainView,screenRect,intersects,imageSource,focusArtwork,panelPosition} from './gallery-wall-math.mjs';

function initializeWall(){
  const root=document.querySelector('[data-gallery-wall]');if(!root)return;
  const {artworks:all,world}=JSON.parse(root.querySelector('[data-wall-data]').textContent);
  let artworks=all;
  const viewport=root.querySelector('[data-wall-viewport]'),scene=root.querySelector('[data-wall-scene]');
  // size the wall to the rest of the screen so the fitted view shows every painting on landing
  const sizeToScreen=()=>{if(document.body.classList.contains('wall-immersive')||document.fullscreenElement)return;viewport.style.removeProperty('height');const top=viewport.getBoundingClientRect().top+scrollY;root.style.setProperty('--wall-top',`${Math.round(top)}px`);};
  // on narrow screens the wall is much wider than tall: shrink the box to the fitted wall plus room for the controls
  const sizeToScreen2=()=>{sizeToScreen();if(innerWidth<760&&!document.body.classList.contains('wall-immersive')){const h=viewport.clientWidth*.96*world.height/world.width+150;if(h<viewport.clientHeight)viewport.style.height=`${Math.round(h)}px`;}};
  sizeToScreen2();
  // fit leaves a strip at the bottom for the zoom controls so no painting starts hidden behind them
  const fitOf=v=>{const f=fitView({width:v.width,height:Math.max(120,v.height-60)},world);return f;};
  const panel=root.querySelector('[data-wall-panel]'),buy=panel.querySelector('[data-wall-buy]');
  const status=root.querySelector('[data-wall-status]'),zoomLabel=root.querySelector('[data-wall-zoom]');
  const picker=root.querySelector('[data-wall-picker]'),byId=new Map(all.map(art=>[art.id,art]));
  const imageStates=new Map(all.map(art=>[art.id,{img:root.querySelector(`[data-art-image="${art.id}"]`),width:art.sources[0].width,loading:false,failed:new Map()}]));
  let view={width:viewport.clientWidth,height:viewport.clientHeight},fit=fitOf(view),transform={...fit};
  let focused=null,dismissed=null,frame=0,imageTimer=0,activeLoads=0,busy=false,capabilities=null;
  let focusPoint={x:view.width/2,y:view.height/2};
  let immersive=false,animation=0,animationResolve=null,navigating=false,inspecting=null,inspectionReady=false;
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const transitionStyle=document.createElement('style');document.head.append(transitionStyle);
  const enableProductTransition=enabled=>{transitionStyle.textContent=`@view-transition{navigation:${enabled?'auto':'none'}}`;};
  const outside=[...document.querySelectorAll('.site-header,.wall-intro,.wall-filter,.wall-caption,.wall-index,.wall-unsized,.site-footer')];
  const maxScale=()=>Math.max(...artworks.map(a=>paintingView(a,view).scale));
  const limitAt=point=>{
    const art=focusArtwork(artworks,transform,view,0,point);
    return {art,scale:art?paintingView(art,view).scale:maxScale()};
  };
  const pointers=new Map();let gesture=null,moved=false,pinched=false,suppressClickUntil=0;
  // The details card never calls the Worker. Buy goes to the product page when this browser's cart reports
  // working checkout for the painting (already loaded by the site cart); otherwise it opens the purchase form.
  const checkoutReady=art=>!!(capabilities?.enabled&&capabilities.products?.find(p=>p.id===art.id&&p.status==='available'));
  function updateBuy(){
    if(!focused)return;
    buy.hidden=!focused.buy;
    buy.href=checkoutReady(focused)?focused.href:focused.buyHref;
  }
  function setFocus(art){
    if(focused?.id===art?.id)return;
    focused=art;
    root.dataset.focusedArt=art?.id||'';
    if(!art){dismissed=null;return;}
    picker.value=art.id;
    panel.querySelector('[data-wall-title]').textContent=art.title;
    panel.querySelector('[data-wall-artist]').textContent=art.artist;
    panel.querySelector('[data-wall-medium]').textContent=art.description;
    panel.querySelector('[data-wall-size]').textContent=art.sizeLabel;
    panel.querySelector('[data-wall-state]').textContent=art.statusLabel;
    panel.querySelector('[data-wall-product]').href=art.href;
    updateBuy();
  }
  function render(){
    frame=0;
    scene.style.transform=`translate(${transform.x}px,${transform.y}px) scale(${transform.scale})`;
    zoomLabel.textContent=`${Math.round(transform.scale/fit.scale*100)}%`;
    root.querySelector('[data-wall-minus]').disabled=transform.scale<=fit.scale*1.001;
    root.querySelector('[data-wall-plus]').disabled=transform.scale>=limitAt({x:view.width/2,y:view.height/2}).scale*.999;
    if(inspecting)setFocus(byId.get(inspecting));
    else if(!busy)setFocus(focusArtwork(artworks,transform,view,fit.scale,focusPoint));
    const panelView={...view,height:view.height-(view.width<=760&&!immersive?106:64)};
    const obstacles=artworks.map(art=>screenRect(art,transform)).filter(rect=>intersects(rect,panelView,12));
    const pos=focused&&!pointers.size&&!animation&&!navigating?(inspecting?inspectionView(focused,view).panel:panelPosition(screenRect(focused,transform),panelView,{width:panel.offsetWidth,height:panel.offsetHeight},obstacles)):null;
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
    view={width:viewport.clientWidth,height:viewport.clientHeight};fit=fitOf(view);
    transform={...transform,x:transform.x+offset.x,y:transform.y+offset.y};
    focusPoint={x:focusPoint.x+offset.x,y:focusPoint.y+offset.y};
    for(const [id,p] of pointers)pointers.set(id,{x:p.x+offset.x,y:p.y+offset.y});
    schedule();return offset;
  }
  function clearInspection(){inspecting=null;inspectionReady=false;delete root.dataset.inspecting;delete root.dataset.inspectionSide;}
  function zoom(factor,point,inPlace=false){
    if(navigating)return;cancelAnimation();clearInspection();
    point||={x:view.width/2,y:view.height/2};
    if(factor>1&&!inPlace){const offset=setImmersive(true);point={x:point.x+offset.x,y:point.y+offset.y};}
    focusPoint=point;
    const limit=limitAt(point),scale=clamp(transform.scale*factor,fit.scale,Math.max(transform.scale,limit.scale));
    if(factor<1&&scale<=fit.scale*1.001){reset();return;}
    if(factor>1&&limit.art&&scale>=limit.scale*.999){focusPoint={x:view.width/2,y:(view.height-64)/2};animateTo(paintingView(limit.art,view),260);}
    else change(zoomAt(transform,point,scale));
  }
  function reset(){clearInspection();navigating=false;enableProductTransition(false);cancelAnimation();setImmersive(false);dismissed=null;focusPoint={x:view.width/2,y:view.height/2};setFocus(null);picker.value='';animateTo({...fit});status.textContent='The full wall is in view.';}
  function focusById(id){
    const art=byId.get(id);if(!art)return Promise.resolve(false);
    clearInspection();
    setImmersive(true);dismissed=null;focusPoint={x:view.width/2,y:(view.height-64)/2};
    setFocus(art);status.textContent=`Viewing ${art.title}.`;
    return animateTo(paintingView(art,view));
  }
  async function inspectPainting(art){
    setImmersive(true);inspecting=art.id;inspectionReady=false;dismissed=null;
    const target=inspectionView(art,view);
    root.dataset.inspecting=art.id;root.dataset.inspectionSide=String(target.side);
    focusPoint=target.center;setFocus(art);
    status.textContent=`Viewing ${art.title}. Click the painting again to open its page.`;
    const complete=await animateTo(target.transform);
    if(complete&&inspecting===art.id)inspectionReady=true;
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
    const candidates=[],cx=view.width/2,cy=view.height/2;
    const atLimit=transform.scale>=limitAt({x:cx,y:cy}).scale*.95;
    for(const art of artworks){
      const state=imageStates.get(art.id),rect=screenRect(art,transform);
      if(!intersects(rect,view,70)){
        // well off screen: step a large image back to the 960 level (never down to the tiny tile) to save memory
        if(!intersects(rect,view,Math.max(view.width,view.height))&&state.width>960&&!state.loading){const keep=imageSource(art.sources,960);state.img.src=keep.src;state.width=keep.width;state.img.dataset.loadedWidth=String(keep.width);}
        continue;
      }
      // pick the rendition that matches the painting's on-screen device pixels; at full zoom (or when focused) the sharpest one
      const nearMaximum=atLimit||(focused?.id===art.id&&transform.scale>=paintingView(art,view).scale*.95);
      const source=nearMaximum?art.sources.at(-1):imageSource(art.sources,(art.imageWidth||art.width)*transform.scale*Math.max(1,devicePixelRatio));
      if(source.width>state.width&&!state.loading&&(state.failed.get(source.src)||0)<2)
        candidates.push({art,state,source,priority:(focused?.id===art.id?-1e9:0)+Math.hypot(rect.x+rect.width/2-cx,rect.y+rect.height/2-cy)});
    }
    candidates.sort((a,b)=>a.priority-b.priority);
    for(const {art,state,source} of candidates){
      if(activeLoads>=4)break;
      activeLoads++;state.loading=true;
      // the low-res tile stays in place until the sharper file has fully loaded, so nothing ever blanks
      const image=new Image();image.decoding='async';
      const done=ok=>{
        activeLoads--;state.loading=false;
        if(ok&&source.width>state.width){state.img.src=source.src;state.width=source.width;state.img.dataset.loadedWidth=String(source.width);}
        else if(!ok)state.failed.set(source.src,(state.failed.get(source.src)||0)+1);
        setTimeout(loadVisibleDetail,0);
      };
      image.onload=()=>{(image.decode?image.decode():Promise.resolve()).catch(()=>{}).then(()=>done(true));};
      image.onerror=()=>done(false);
      image.src=source.src;
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
    if(pointers.size>1){moved=true;pinched=true;clearInspection();setImmersive(true);}
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
      if(moved){clearInspection();focusPoint={x:view.width/2,y:view.height/2};change({...gesture.transform,x:gesture.transform.x+dx,y:gesture.transform.y+dy});}
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
    if(anchor&&event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();const art=byId.get(anchor.dataset.wallArt);if(inspecting===art.id&&inspectionReady)visitPainting(art);else inspectPainting(art);}
  },true);
  viewport.addEventListener('dragstart',event=>event.preventDefault());
  // a plain wheel or two-finger trackpad scroll moves the page; only a pinch (ctrl+wheel, or Safari gesture events) zooms
  viewport.addEventListener('wheel',event=>{
    if(event.target.closest('.wall-tools'))return;
    const unit=event.deltaMode===1?16:event.deltaMode===2?view.height:1;
    if(!event.ctrlKey){
      // zoomed in: scroll pans the wall (shift+wheel pans sideways); at fit zoom or at the pan edge the page scrolls
      if(transform.scale<=fit.scale*1.001)return;
      let dx=event.deltaX*unit,dy=event.deltaY*unit;
      if(event.shiftKey&&!dx){dx=dy;dy=0;}
      const next=constrainView({...transform,x:transform.x-dx,y:transform.y-dy},view,world);
      if(Math.abs(next.x-transform.x)<.5&&Math.abs(next.y-transform.y)<.5)return;
      event.preventDefault();cancelAnimation();clearInspection();transform=next;schedule();return;
    }
    event.preventDefault();
    const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?view.height:1);
    // trackpad pinch zooms inside the page (no full-screen takeover) so scrolling past the pan edge still reaches the page
    zoom(Math.exp(-clamp(delta,-100,100)*.008),point(event),true);
  },{passive:false});
  let gestureScale=1;
  viewport.addEventListener('gesturestart',event=>{event.preventDefault();gestureScale=1;});
  viewport.addEventListener('gesturechange',event=>{event.preventDefault();const f=event.scale/gestureScale;gestureScale=event.scale;const r=viewport.getBoundingClientRect();zoom(f,{x:event.clientX-r.left,y:event.clientY-r.top});});
  viewport.addEventListener('gestureend',event=>event.preventDefault());
  viewport.addEventListener('keydown',event=>{
    if(event.target.closest('[data-wall-ui]'))return;
    if(['+','=','-','0','Home','Escape','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))event.preventDefault();else return;
    if(['0','Home','Escape'].includes(event.key))reset();
    else if(['+','='].includes(event.key))zoom(1.5);
    else if(event.key==='-')zoom(1/1.5);
    else {if(navigating)return;cancelAnimation();clearInspection();focusPoint={x:view.width/2,y:view.height/2};change({...transform,x:transform.x+({ArrowLeft:70,ArrowRight:-70}[event.key]||0),y:transform.y+({ArrowUp:70,ArrowDown:-70}[event.key]||0)});}
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
    view=next;fit=fitOf(view);
    const scale=clamp(transform.scale,fit.scale,maxScale());
    if(inspecting){const target=inspectionView(byId.get(inspecting),view);root.dataset.inspectionSide=String(target.side);focusPoint=target.center;transform=target.transform;schedule();return;}
    change(wasFit?{...fit}:focused?paintingView(focused,view):{scale,x:view.width/2-center.x*scale,y:view.height/2-center.y*scale});
  }).observe(viewport);
  // Status filter: other paintings stay on the wall but fade out and can no longer be inspected.
  const filterBar=root.querySelector('[data-wall-filter]'),filterNames={all:'all paintings','available':'available paintings',sold:'sold paintings','not-for-sale':'paintings that are not for sale'};
  function applyFilter(key){
    artworks=key==='all'?all:all.filter(art=>art.status===key);
    const show=new Set(artworks.map(art=>art.id));
    for(const art of all){const el=root.querySelector(`[data-wall-art="${art.id}"]`);el.classList.toggle('is-dimmed',!show.has(art.id));el.inert=!show.has(art.id);}
    picker.replaceChildren(new Option('Find a painting',''),...artworks.map(art=>new Option(art.title,art.id)));
    for(const button of filterBar.querySelectorAll('[data-filter]'))button.setAttribute('aria-pressed',String(button.dataset.filter===key));
    root.dataset.filter=key;reset();status.textContent=`Showing ${artworks.length} ${filterNames[key]}.`;
  }
  if(filterBar){filterBar.hidden=false;filterBar.addEventListener('click',event=>{const button=event.target.closest('[data-filter]');if(button)applyFilter(button.dataset.filter);});}
  Promise.resolve(window.vaCartReady).then(value=>{capabilities=value;updateBuy();});
  window.addEventListener('pageshow',()=>{navigating=false;enableProductTransition(false);for(const state of imageStates.values())state.img.style.viewTransitionName='';schedule();});
  const index=root.querySelector('[data-wall-index]');if(index)index.open=false;
  viewport.classList.add('is-ready');root.dataset.ready='true';render();
  const requested=new URLSearchParams(location.hash.slice(1)).get('painting');if(requested)focusById(requested);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initializeWall,{once:true});else initializeWall();
