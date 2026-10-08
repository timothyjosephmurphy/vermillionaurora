const portraitImages = {"small-landscape": ["/display/golden-coast-158e812f2a-310.webp", "/display/moonlit-water-2d5761a881-308.webp", "/display/portrait-with-hat-ec28072b66-480.webp", "/display/sunset-silhouette-a29846643f-480.webp", "/display/el-salvador-sunrise-73351c7989-480.webp", "/display/golden-reflection-96abad4e39-290.webp", "/display/red-horizon-9f049eb26b-296.webp", "/display/two-soldiers-6d91f5f3d2-480.webp"], "single-portrait": ["https://media.vermillionaurora.com/images/Single%20Portraits/IMG_0013.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_0017.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_0959.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_0960.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_0961.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_0962.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_0999.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_1016.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_1018.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_1023.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_1036.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_1040.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_1043.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_1045.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_1223.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_1652.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_1653.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_2221.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_2222.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_2223.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9094.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9104.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9370.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9372.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9375.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9380.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9386.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9400.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9717.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9833.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9835.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9893.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9921.jpeg", "https://media.vermillionaurora.com/images/Single%20Portraits/IMG_9923.jpeg"], "double-portrait": ["https://media.vermillionaurora.com/images/Double%20Portraits/72064089526__670907BA-6F07-4A76-B462-99F35ADAFBB5.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_0011.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_0015.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_0019.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_0021.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_0023.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_0035.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_0041.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_0043.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_0969.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_1391.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_1392.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_1424.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_9170.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_9377.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_9398.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_9909.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_9953.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_9973.jpeg", "https://media.vermillionaurora.com/images/Double%20Portraits/IMG_9989.jpeg"]};
const portraitAlts = {"small-landscape": ["Sunset in the Strait of Juan de Fuca, Patos Island 1, watercolor pastel landscape by TJ Murphy", "Moonrise over lake in the North Cascades, watercolor pastel landscape by TJ Murphy", "Sunrise on Rainier with Eagle, watercolor pastel landscape by TJ Murphy", "Sunset in the Strait of Juan de Fuca, Sucia Island, watercolor pastel landscape by TJ Murphy", "Sunrise from Punta El Zonte Hostel, watercolor pastel landscape by TJ Murphy", "Sunset in El Zonte, El Salvador, watercolor pastel landscape by TJ Murphy", "Hawaii, watercolor pastel landscape by TJ Murphy", "Rice paddies in Vietnam, Photo Credit: Daniel Goldsmith, watercolor pastel landscape by TJ Murphy"]};
// data-mix="key1,key2" interleaves several lists so landscapes and portraits rotate together.
const interleave = lists => {const out=[];for(let i=0;i<Math.max(...lists.map(l=>l.length));i++)lists.forEach(l=>{if(i<l.length)out.push(l[i]);});return out;};
document.querySelectorAll('[data-mix]').forEach(box => {
 const keys=box.dataset.mix.split(','),name=box.dataset.portrait;
 portraitImages[name]=interleave(keys.map(k=>portraitImages[k]||[]));
 portraitAlts[name]=interleave(keys.map(k=>(portraitImages[k]||[]).map((_,i)=>portraitAlts[k]?.[i]||`${k.replaceAll('-',' ')} commission example by TJ Murphy`)));
});
document.querySelectorAll('[data-portrait]').forEach(box => {
 const images=portraitImages[box.dataset.portrait], stage=box.querySelector('a');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let index=0, paused=motion.matches, visible=false, hover=false, focus=false, busy=false, timer;
 function schedule(){clearTimeout(timer);if(!paused && visible && !hover && !focus && !document.hidden)timer=setTimeout(()=>move(1),5000);}
 // Fetch and decode the next slide ahead of time so auto-advance never stalls on a large image.
 const ready=new Map();function preload(){const src=images[(index+1)%images.length];if(src&&!ready.has(src)){const img=new Image();img.src=src;ready.set(src,img.decode().catch(()=>{}));}}
 async function move(step){
  if(busy)return;busy=true;index=(index+step+images.length)%images.length;
  const old=stage.querySelector('img'), next=new Image();next.src=images[index];next.alt=portraitAlts[box.dataset.portrait]?.[index]||box.dataset.portrait.replaceAll('-',' ')+' example '+(index+1)+' by TJ Murphy';
  try{await next.decode();}catch{}stage.append(next);
  const duration=motion.matches?0:350;
  const animations=[old.animate([{transform:'translateX(0)'},{transform:`translateX(${-step*100}%)`}],{duration,easing:'ease-in-out',fill:'forwards'}),next.animate([{transform:`translateX(${step*100}%)`},{transform:'translateX(0)'}],{duration,easing:'ease-in-out',fill:'forwards'})];
  await Promise.allSettled(animations.map(a=>a.finished));old.remove();animations.forEach(a=>a.cancel());busy=false;preload();schedule();
 }
 box.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')hover=true;schedule();});box.addEventListener('pointerleave',e=>{if(e.pointerType!=='touch'){hover=false;schedule();}});
 box.addEventListener('focusin',()=>{focus=true;schedule();});box.addEventListener('focusout',e=>{focus=box.contains(e.relatedTarget);schedule();});
 let start=null,suppress=false;stage.style.touchAction='pan-y pinch-zoom';
 stage.addEventListener('pointerdown',e=>{if(!e.isPrimary || e.button!==0)return;clearTimeout(timer);start={x:e.clientX,y:e.clientY};suppress=false;stage.setPointerCapture(e.pointerId);});
 stage.addEventListener('pointerup',e=>{if(!start)return;const x=e.clientX-start.x,y=e.clientY-start.y;start=null;if(Math.abs(x)>45&&Math.abs(x)>Math.abs(y)*1.3){suppress=true;move(x<0?1:-1);}else schedule();});
 stage.addEventListener('pointercancel',()=>{start=null;schedule();});
 stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);}else if(e.key===' '){e.preventDefault();paused=!paused;schedule();}});stage.addEventListener('click',e=>{if(suppress){e.preventDefault();suppress=false;}});stage.addEventListener('dragstart',e=>e.preventDefault());
 document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',()=>{paused=motion.matches;schedule();});
 // Touch, like the featured carousel: hold the current slide while touched and for 5 seconds afterwards.
 let touchTimer;box.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){clearTimeout(touchTimer);hover=true;schedule();}});
 const releaseTouch=e=>{if(e.pointerType==='touch'){clearTimeout(touchTimer);touchTimer=setTimeout(()=>{hover=false;schedule();},5000);}};box.addEventListener('pointerup',releaseTouch);box.addEventListener('pointercancel',releaseTouch);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)preload();schedule();}).observe(box);schedule();
});

// Sized/faced package cards: selectors update the live price and the "Start a commission" link.
document.querySelectorAll('[data-package-options]').forEach(box => {
 const slug = box.dataset.packageOptions, prices = JSON.parse(box.dataset.prices), order = box.dataset.order.split(',');
 const cta = document.querySelector(`[data-package-cta="${slug}"]`), out = box.querySelector('.service-option-price');
 const money = n => '$' + Number(n).toLocaleString('en-US', {maximumFractionDigits: 2});
 const update = () => {
  const value = axis => box.querySelector(`[data-axis="${axis}"]`)?.value;
  const id = order.map(value).join('-'), amount = prices[id];
  if (!amount) return;
  out.textContent = `${money(amount)} total · deposit ${money(Number(amount) / 2)}`;
  const params = new URLSearchParams({package: slug, size: value('size')});
  if (value('faces')) params.set('faces', value('faces').replace(/f$/, ''));
  if (cta) cta.href = `/commissions/?${params}#form`;
 };
 box.addEventListener('change', update); update();
});
