// Room music runtime shared by /neural-dance/ and /neural-dance/live/.
// One WASM instance, mic Listen, display AGC, and the marker hook camera mode calls.
// Slider values stay in this browser under nd-room-lab.
import {createSilhouetteShow, sanitizeContour} from './src/silhouette.js';

export const ROOM_KEY = 'nd-room-lab';
export const MARKER_ID_BASE = 100000;
export const DANCER_CAP = 48;

export function markerStickerId(id) {
  const n = Math.abs(id | 0);
  return MARKER_ID_BASE + (n > 0 ? n : 1);
}

// Simulated dancers keep their own ids. Camera markers are offset so a later
// sticker frame cannot replace a tap-added dancer, or the other way around.
export function combineDancerStickers(sim, markers, limit = DANCER_CAP) {
  const cap = Math.max(0, limit | 0);
  const marks = [];
  const seen = new Set();
  for (const marker of markers || []) {
    if (!marker || marks.length >= cap) continue;
    const id = markerStickerId(marker.id);
    if (seen.has(id)) continue;
    seen.add(id);
    marks.push({
      id,
      x: +marker.x || 0,
      y: +marker.y || 0,
      type: ((marker.type | 0) % 4 + 4) % 4,
      kind: marker.kind === 'sticker' ? 'sticker' : 'pink'
    });
  }
  const sims = [];
  const room = cap - marks.length;
  for (const dancer of sim || []) {
    if (!dancer || sims.length >= room) continue;
    const id = dancer.id | 0;
    if (!(id > 0) || id >= MARKER_ID_BASE || seen.has(id)) continue;
    seen.add(id);
    sims.push({
      id,
      x: +dancer.x || 0,
      y: +dancer.y || 0,
      type: ((dancer.type | 0) % 4 + 4) % 4,
      kind: 'sim'
    });
  }
  return sims.concat(marks);
}

function simEntry(item) {
  if (!item || typeof item !== 'object') return null;
  const id = item.id | 0;
  const x = +item.x;
  const y = +item.y;
  if (!(id > 0) || id >= MARKER_ID_BASE || !Number.isFinite(x) || !Number.isFinite(y)) return null;
  return {id, x, y, type: ((item.type | 0) % 4 + 4) % 4};
}

export function simListFromSettings(data) {
  if (!data || typeof data !== 'object') return null;
  if (Array.isArray(data.sim)) return data.sim.map(simEntry).filter(Boolean).slice(0, DANCER_CAP);
  if (data.simDancers === false) return [];
  return null;
}

function memoryOf(storage) {
  try {
    return storage || (typeof localStorage === 'undefined' ? null : localStorage);
  } catch {
    return null;
  }
}

function roomNumber(value, lo, hi) {
  const n = +value;
  if (!Number.isFinite(n)) return null;
  return Math.min(hi, Math.max(lo, n));
}

export function readRoomSettings(storage) {
  const box = memoryOf(storage);
  if (!box) return null;
  let data;
  try {
    const raw = box.getItem(ROOM_KEY);
    if (!raw) return null;
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== 'object') return null;
  const sens = [0, 1, 2, 3].map(i => {
    const n = Array.isArray(data.sens) ? roomNumber(data.sens[i], 0, 3) : null;
    return n == null ? 1 : n;
  });
  return {
    gravity: roomNumber(data.gravity, 0, 6),
    wander: roomNumber(data.wander, 0, 0.8),
    threshold: roomNumber(data.threshold, 1, 1.9),
    peak: roomNumber(data.peak, 1, 6),
    type: roomNumber(data.type, 0, 3),
    quiet: roomNumber(data.quiet, 0, 0.4),
    sens,
    sim: simListFromSettings(data),
    simDancers: Array.isArray(data.sim) ? data.sim.length > 0 : data.simDancers !== false
  };
}

// "25 dancers (24 sim, 1 sticker)" — sim is the stage minus live camera tracks.
// Stickers stay singular only at 1. Pink notes and dancer silhouettes both count.
export function formatDancerCount(total, markerCount) {
  const dancers = Math.max(0, Math.round(+total) || 0);
  const stickers = Math.max(0, Math.round(+markerCount) || 0);
  const sim = Math.max(0, dancers - stickers);
  const stickerLabel = stickers + ' ' + (stickers === 1 ? 'sticker' : 'stickers');
  return dancers + ' dancers (' + sim + ' sim, ' + stickerLabel + ')';
}

// Visible floor dot for a latched sticker or Post-it. Gold and cool white stay
// off the pink detector, and the center is filled so the mark reads on a dark floor.
export function paintStageMarkers(ctx, markers, xy, size) {
  if (!ctx || !markers || !markers.length || typeof xy !== 'function') return;
  const scale = Number.isFinite(+size) && +size > 0 ? +size : 1;
  const s = scale;
  for (const m of markers) {
    if (!m || !Number.isFinite(+m.x) || !Number.isFinite(+m.y)) continue;
    const p = xy(+m.x, +m.y);
    const sticker = m.kind === 'sticker';
    const halo = ctx.createRadialGradient(p.x, p.y, 2 * s, p.x, p.y, 36 * s);
    halo.addColorStop(0, sticker ? 'rgba(255,214,140,.42)' : 'rgba(244,251,255,.5)');
    halo.addColorStop(.55, sticker ? 'rgba(255,196,110,.5)' : 'rgba(186,230,255,.42)');
    halo.addColorStop(1, 'rgba(255,196,140,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 36 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = sticker ? '#ffe7b0' : '#f4fbff';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 12*scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = sticker ? 'rgba(255,196,110,.95)' : 'rgba(186,230,255,.95)';
    ctx.lineWidth = Math.max(2, 2.5 * s);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 18 * s, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export function writeRoomSettings(storage, settings) {
  const box = memoryOf(storage);
  if (!box || !settings) return false;
  try {
    box.setItem(ROOM_KEY, JSON.stringify({
      v: 1,
      gravity: settings.gravity,
      wander: settings.wander,
      threshold: settings.threshold,
      peak: settings.peak,
      type: settings.type,
      quiet: settings.quiet,
      sens: settings.sens,
      sim: Array.isArray(settings.sim) ? settings.sim.slice(0, DANCER_CAP) : undefined,
      simDancers: Array.isArray(settings.sim) ? settings.sim.length > 0 : settings.simDancers !== false
    }));
    return true;
  } catch {
    return false;
  }
}

// Room-music lab: its own WASM instance on the original prototype stage
// (dark canvas, sacred-geometry field, colored dancers and links).
// nd_set_clock(0) stays off, so the built-in beat never runs. Dancers move
// only from live microphone bands. No synth is connected to the speakers.
// The silence gate measures a noise floor for Listen and for this stage.
// Near that floor the auto-gain is capped and the spectrum is withheld, so
// silence and background noise are not boosted into dancer motion. Above the
// quiet threshold the live bytes reach the onset detector unchanged.
// While Listening, a ring around each dancer draws that band's waveform.
function bootRoomLab(){
(async()=>{
const root=document.getElementById('nd-room-lab');
if(!root||root.dataset.roomBoot==='1')return;
root.dataset.roomBoot='1';
const canvas=root.querySelector('[data-stage]'),ctx=canvas.getContext('2d');
const spectrum=root.querySelector('[data-spectrum]'),sctx=spectrum.getContext('2d');
const el=s=>root.querySelector(s);
const play=el('[data-action="play"]'),listenButton=el('[data-action="listen"]'),alignButton=el('[data-action="align"]'),status=el('[data-status]'),micStatus=el('[data-mic]');
const W=1000,H=620,R=82;
function prototypePositions(){
  let seed=0x5eed;
  const rand=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};
  const CX=500,CY=310,SX=1.18,SY=.72,out=[];
  for(let i=0;i<24;i++){const a=rand()*Math.PI*2,r=50+rand()*260;out.push([CX+Math.cos(a)*r*SX*.94,CY+Math.sin(a)*r*SY*.94,i%4]);}
  return out;
}
const positions=prototypePositions();
let sim=[];
let nextSimId=1;
let api=null,running=false,low=false,allowMap=false,mapper=null;
let timer=0,raf=0,last=0,started=0,slow=0,lastReport=0;
let ac=null;
let colors=[],foreground='',background='';
const rings=(typeof NeuralDanceRings==='undefined'?null:NeuralDanceRings.createSession())||{connect(){},release(){},sample(){},stroke(){},waveform(){return null;}};
const silhouetteShow=createSilhouetteShow();
if(root.dataset.lightMode==='silhouette')silhouetteShow.setMode('silhouette');
let micState='off',micPending=false,micStream=null,micSource=null,analyser=null,spec=null,pointer=null,lastLevels=[0,0,0,0];
const bandSens=[1,1,1,1];
const hotUntil=[0,0,0,0];
const MIC={off:{label:'Listen',status:'Mic off',pressed:false},listening:{label:'Listening',status:'Mic on',pressed:true},muted:{label:'Muted',status:'Muted',pressed:false},unavailable:{label:'No mic',status:'No microphone',pressed:false}};
try{
  if(!globalThis.ndSilenceGate)throw new Error('gate');
  const res=await fetch('/neural-dance/neural-dance.wasm');
  if(!res.ok)throw new Error('missing');
  api=(await WebAssembly.instantiate(await res.arrayBuffer())).instance.exports;
  if(typeof api.nd_set_clock!=='function'||typeof api.nd_add!=='function'||typeof api.nd_set_gravity!=='function'||typeof api.nd_set_wander!=='function'||typeof api.nd_set_threshold!=='function'||typeof api.nd_set_peak_hold!=='function'||typeof api.nd_set_band_sens!=='function')throw new Error('exports');
}catch{status.textContent='Room music unavailable';play.disabled=listenButton.disabled=alignButton.disabled=true;return;}
const gate=ndSilenceGate.create();
rings.gate=gate;
// A zeroed band slider mutes onsets. The ring stays at unity so that band is still visible.
rings.sensAt=band=>{const s=bandSens[band];return s>0?s:undefined;};
function floats(){return new Float32Array(api.memory.buffer);}
function theme(){
  const live=root.dataset.markersLive==='1';
  if(live){root.style.setProperty('--viz-series-1','#ffd166');root.style.setProperty('--viz-series-2','#5ce1e6');}
  else{root.style.removeProperty('--viz-series-1');root.style.removeProperty('--viz-series-2');}
  const resolver=document.createElement('span');root.appendChild(resolver);
  function color(token){resolver.style.color='var('+token+')';return getComputedStyle(resolver).color;}
  colors=[1,2,3,4].map(i=>color('--viz-series-'+i));foreground=color('--foreground');background=color('--background');resolver.remove();
  if(live){colors[0]='#ffd166';colors[1]='#5ce1e6';}
  for(let k=0;k<4;k++){const leg=el('[data-legend="'+k+'"]');if(leg)leg.style.color=colors[k];}
  still();
}
function rememberSim(list){sim=(list||[]).map(d=>({id:d.id|0,x:+d.x||0,y:+d.y||0,type:((d.type|0)%4+4)%4}));nextSimId=sim.reduce((max,d)=>Math.max(max,d.id),0)+1;if(nextSimId<1)nextSimId=1;}
function seedSimList(){rememberSim(positions.map(([x,y,type],i)=>({id:i+1,x,y,type})));}
function syncStickers(){const list=combineDancerStickers(sim,Array.isArray(root._markers)?root._markers:[]);const n=Math.min(list.length,DANCER_CAP);if(n){const buf=new Float32Array(api.memory.buffer,api.nd_sticker_in(),n*4);for(let i=0;i<n;i++){const s=list[i];buf[i*4]=s.id;buf[i*4+1]=s.x;buf[i*4+2]=s.y;buf[i*4+3]=s.type|0;}}api.nd_set_stickers(n);}
function reportCount(prefix){const text=formatDancerCount(api.nd_count(),markerCount())+' · '+api.nd_pulse_count()+' pulses';report(prefix?prefix+text:text);}
function paintSimButtons(){root.querySelectorAll('[data-action="sim-dancers"],[data-sim-clear]').forEach(btn=>{btn.textContent='Clear sim dancers';btn.disabled=sim.length===0;btn.setAttribute('aria-pressed',sim.length?'true':'false');});root.querySelectorAll('[data-action="sim-seed"]').forEach(btn=>{btn.textContent='Seed 24 sim dancers';btn.disabled=false;});}
function clearSim(){sim=[];saveRoomSettings();syncStickers();paintSimButtons();reportCount();still();}
function seedSim(){seedSimList();saveRoomSettings();syncStickers();paintSimButtons();reportCount();still();}
function addSimAt(x,y,type){const markers=Array.isArray(root._markers)?root._markers:[];if(combineDancerStickers(sim,markers).length>=DANCER_CAP){report('48-dancer limit · remove one to add another');return 0;}const id=nextSimId++;sim.push({id,x,y,type:((type|0)%4+4)%4});saveRoomSettings();syncStickers();paintSimButtons();reportCount();still();return id;}
function report(text){status.textContent=text;}
function onscreen(){const r=canvas.getBoundingClientRect();return !document.hidden&&r.bottom>0&&r.top<innerHeight&&r.left<innerWidth&&r.right>0&&root.isConnected;}
function cancel(){clearTimeout(timer);cancelAnimationFrame(raf);timer=raf=0;}
function stop(text='Paused', releaseMic=false){running=false;cancel();if(releaseMic)disarmMic();else if(ac&&micState!=='listening')ac.suspend().catch(()=>{});play.textContent='Start';report(text);}
function start(){if(running||!onscreen()||!api)return;cancel();running=true;last=performance.now();started=last;slow=0;play.textContent='Pause';report('Running');if(ac&&micState==='listening')ac.resume().catch(()=>{});schedule(0);}
function schedule(delay){if(running)timer=setTimeout(()=>{timer=0;raf=requestAnimationFrame(frame);},delay);}
function still(){if(running||raf||!api)return;raf=requestAnimationFrame(()=>{raf=0;draw();drawSpectrum();});}
function ensureGraph(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw new Error('no audio');if(!ac)ac=new AC();return ac.resume();}
function holdClock(){api.nd_set_clock(0);}
function applyMicState(state,text){micState=state;const m=MIC[state];listenButton.textContent=m.label;listenButton.dataset.state=state;listenButton.setAttribute('aria-pressed',m.pressed?'true':'false');root.dataset.mic=state;micStatus.textContent=text||m.status;holdClock();agcReset();if(state!=='listening'){for(let k=0;k<4;k++){const bar=el('[data-meter="'+k+'"]');if(bar)bar.style.transform='scaleX(0)';el('[data-legend="'+k+'"]').classList.remove('is-hot');}}}
function releaseMicHardware(){const stream=micStream;micStream=null;rings.release();try{micSource&&micSource.disconnect();}catch{}micSource=null;analyser=null;spec=null;if(stream)stream.getTracks().forEach(t=>{try{t.stop();}catch{}});}
function disarmMic(){const was=micState;releaseMicHardware();if(was!=='unavailable')applyMicState('off');if(ac)ac.suspend().catch(()=>{});}
function watchMic(stream){for(const track of stream.getAudioTracks()){track.addEventListener('ended',()=>{if(micStream!==stream)return;releaseMicHardware();applyMicState('unavailable','No microphone');report('No microphone');});}}
function requestMic(){const md=navigator.mediaDevices;if(!md||!md.getUserMedia)return Promise.reject(Object.assign(new Error('no mic'),{name:'NotFoundError'}));return md.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}}).catch(err=>{if(err&&err.name==='OverconstrainedError')return md.getUserMedia({audio:true});throw err;});}
function micFailure(err){const denied=err&&(err.name==='NotAllowedError'||err.name==='SecurityError'||err.name==='PermissionDeniedError');applyMicState('unavailable',denied?'Microphone blocked':'No microphone');report(denied?'Microphone blocked':'No microphone');}
async function startListen(){start();if(!running)return;holdClock();let graph;try{graph=ensureGraph();}catch{applyMicState('unavailable','No microphone');return;}micStatus.textContent='Asking for the microphone';const pending=requestMic();try{await graph;}catch(err){micFailure(err);try{(await pending).getTracks().forEach(t=>t.stop());}catch{}return;}let stream;try{stream=await pending;}catch(err){micFailure(err);return;}if(!running){stream.getTracks().forEach(t=>t.stop());return;}releaseMicHardware();analyser=ac.createAnalyser();analyser.fftSize=2048;analyser.smoothingTimeConstant=0;analyser.minDecibels=-96;analyser.maxDecibels=-24;spec=new Uint8Array(analyser.frequencyBinCount);micSource=ac.createMediaStreamSource(stream);micSource.connect(analyser);micStream=stream;watchMic(stream);applyMicState('listening');}
function setMicMuted(muted){if(!micStream){applyMicState('off');return;}for(const track of micStream.getAudioTracks())track.enabled=!muted;applyMicState(muted?'muted':'listening');if(!muted)start();}
async function toggleListen(){if(micPending)return;if(micState==='listening'){setMicMuted(true);return;}if(micState==='muted'){setMicMuted(false);return;}micPending=true;try{await startListen();}finally{micPending=false;}}
function agcReset(){ndSilenceGate.reset(gate);}
function agcKnee(x){return ndSilenceGate.knee(x);}
function agcScale(raw,dt){return ndSilenceGate.scale(gate,raw,dt);}
function paintFloor(listening){const floorEl=el('[data-floor]');if(!floorEl)return;floorEl.textContent=listening?'noise floor '+gate.noiseFloor.toFixed(2)+(gate.open?'':' · quiet'):'noise floor —';}
function rawLevels(){const f=floats(),base=api.nd_levels()>>>2;return [0,1,2,3].map(k=>f[base+k]||0);}
function paintMeters(now,levels){for(let k=0;k<4;k++){const bar=el('[data-meter="'+k+'"]');if(bar)bar.style.transform='scaleX('+(levels[k]||0).toFixed(3)+')';el('[data-legend="'+k+'"]').classList.toggle('is-hot',hotUntil[k]>now);}}
function drawSpectrum(levels){const w=spectrum.width,h=spectrum.height;sctx.fillStyle='#05060a';sctx.fillRect(0,0,w,h);const names=['Kick','Bass','Mid','Treble'],cols=colors.length?colors:['#ffd166','#5ce1e6','#7fe8b3','#81b7fc'];if(micState!=='listening'||!spec){sctx.fillStyle='#9da5b8';sctx.font='14px sans-serif';sctx.fillText(micState==='muted'?'Muted':'Mic off',12,h/2);return;}
 const lv=levels||rawLevels(),gap=10,bw=(w-gap*5)/4;sctx.font='13px sans-serif';sctx.textAlign='center';
 for(let k=0;k<4;k++){const v=lv[k]||0,x=gap+k*(bw+gap),track=h-28,bh=Math.max(2,v*track);sctx.fillStyle='#171b27';sctx.fillRect(x,8,bw,track);sctx.fillStyle=cols[k];sctx.fillRect(x,8+track-bh,bw,bh);sctx.fillText(names[k],x+bw/2,h-6);}sctx.textAlign='left';
}
function shape(k,p,r){ctx.beginPath();if(k===0)ctx.arc(p.x,p.y,r,0,Math.PI*2);else if(k===1){ctx.moveTo(p.x,p.y-r);ctx.lineTo(p.x+r,p.y);ctx.lineTo(p.x,p.y+r);ctx.lineTo(p.x-r,p.y);ctx.closePath();}else if(k===2)ctx.rect(p.x-r*.8,p.y-r*.8,r*1.6,r*1.6);else{ctx.moveTo(p.x,p.y-r);ctx.lineTo(p.x+r,p.y+r);ctx.lineTo(p.x-r,p.y+r);ctx.closePath();}ctx.fill();}
function sacred(xy){const CX=500,CY=310,SX=1.18,SY=.72;ctx.save();ctx.strokeStyle='rgba(145,150,180,.22)';ctx.lineWidth=1.4;ctx.lineCap='round';
 for(const r of [105,185,265]){ctx.beginPath();for(let i=0;i<=100;i++){const a=i/100*Math.PI*2,p=xy(CX+Math.cos(a)*r*SX,CY+Math.sin(a)*r*SY);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.stroke();}
 for(let a=0;a<Math.PI;a+=Math.PI/4){const p=xy(CX-Math.cos(a)*360,CY-Math.sin(a)*230),q=xy(CX+Math.cos(a)*360,CY+Math.sin(a)*230);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
 ctx.restore();}
function draw(){const f=floats(),base=api.nd_dancers()>>>2,ds=api.nd_dancer_stride(),n=api.nd_count();const scale=canvas.width/W,vx=0,vy=canvas.height/2-H*scale/2;const xy=(x,y)=>({x:vx+x*scale,y:vy+y*scale});
 ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle=background||'#080910';ctx.fillRect(0,0,canvas.width,canvas.height);
 if(document.body&&document.body.classList.contains('nd-live-aligning'))return;
 if(performance.now()<+(root.dataset.ndDarkUntil||0))return;
 sacred(xy);
 ctx.lineWidth=1.5;ctx.strokeStyle=foreground;
 for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const ia=base+i*ds,ib=base+j*ds,ax=f[ia],ay=f[ia+1],bx=f[ib],by=f[ib+1];if(Math.hypot(ax-bx,ay-by)>R)continue;const activity=Math.min(f[ia+2],f[ib+2]);if(activity<.25)continue;ctx.globalAlpha=.08+.15*Math.min(1,activity);const p=xy(ax,ay),q=xy(bx,by),amp=Math.min(18,Math.abs(bx-ax)*.15),mid=xy(ax+(bx-ax)*.5,ay+(by-ay)*.5-amp);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.quadraticCurveTo(mid.x,mid.y-(p.y+q.y)/2+mid.y,q.x,q.y);ctx.stroke();}
 ctx.globalAlpha=1;const pb=api.nd_pulses()>>>2,pc=api.nd_pulse_count(),ps=api.nd_pulse_stride();
 for(let i=0;i<pc;i++){const o=pb+i*ps,k=f[o+2]|0,trail=f[o+7]|0;ctx.strokeStyle=colors[k];for(let j=1;j<trail;j++){ctx.globalAlpha=.6*j/trail;ctx.lineWidth=2+j/4;const a=xy(f[o+8+(j-1)*2],f[o+9+(j-1)*2]),b=xy(f[o+8+j*2],f[o+9+j*2]);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}ctx.globalAlpha=1;const p=xy(f[o+5],f[o+6]);ctx.fillStyle=colors[k];ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fill();}
 for(let i=0;i<n;i++){const o=base+i*ds,p=xy(f[o],f[o+1]),a=f[o+2],rest=f[o+3],k=f[o+4]|0,q=Math.min(1,a/1.4),boost=Math.min(2.4,Math.max(0,Number.isFinite(bandSens[k])?bandSens[k]:1)),radius=8+14*q*boost;ctx.globalAlpha=rest>0?.4:1;rings.stroke(ctx,p.x,p.y,radius*2.15,k,colors[k],low);ctx.strokeStyle=colors[k];ctx.lineWidth=2;if(rings.rippling){ctx.globalAlpha*=.42;ctx.lineWidth=1.2;}ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=rest>0?.4:1;ctx.fillStyle=colors[k];shape(k,p,4+2*q);}
 ctx.globalAlpha=1;
 if(root.dataset.markersLive==='1'&&root._markers){
  if(silhouetteShow.mode()==='silhouette')silhouetteShow.paint(ctx,root._markers,{xy,now:performance.now(),waveform:band=>typeof rings.waveform==='function'?rings.waveform(band):null,style:root._silhouetteStyle||null,paintDots:list=>paintStageMarkers(ctx,list,xy,scale)});
  else paintStageMarkers(ctx,root._markers,xy,scale);
 }
}
function markerCount(){const feed=root._feed;if(!feed||typeof feed.sample!=='function')return 0;let sample;try{sample=feed.sample();}catch{return 0;}if(!Array.isArray(sample))return 0;let n=0;for(let i=0;i<sample.length&&i<48;i++)if(sample[i])n++;return n;}
function consumeFeed(){if(!root._feed)return;try{const sample=root._feed.sample();if(!Array.isArray(sample))return;syncStickers();}catch{}}
function frame(now){raf=0;if(!running)return;if(!onscreen()){stop('Paused while out of view',true);return;}const begin=performance.now(),gap=now-last;last=now;
 try{
  consumeFeed();
  const listening=micState==='listening';
  holdClock();
  let bins=0;
  let levels=rawLevels();
  if(listening&&analyser&&spec){
    analyser.getByteFrequencyData(spec);
    const peaks=ndSilenceGate.bandPeaks(spec,ac?ac.sampleRate:48000,analyser.fftSize);
    levels=agcScale(peaks,gap/1000);
    bins=Math.min(spec.length,api.nd_spectrum_cap());
    new Uint8Array(api.memory.buffer,api.nd_spectrum(),bins).set(ndSilenceGate.mask(gate,spec.subarray(0,bins)));
  }
  lastLevels=levels;
  const tones=api.nd_update(Math.min(.067,gap/1000),listening?1:0,bins,ac?ac.sampleRate:48000,analyser?analyser.fftSize:2048,now);
  if(tones)silhouetteShow.beat(now,tones);
  if(listening){for(let k=0;k<4;k++)if(tones&(1<<k))hotUntil[k]=now+180;paintMeters(now,levels);paintFloor(true);}else paintFloor(false);
  if(listening&&micSource&&ac)rings.connect(ac,micSource);else rings.release();
  rings.sample(gap/1000);
  draw();drawSpectrum(levels);
 }catch{stop('Paused');return;}
 const cost=performance.now()-begin;slow=cost>25||gap>150?slow+1:Math.max(0,slow-1);
 if(cost>150||slow>=12){low=true;api.nd_set_low(1);stop('Paused to keep the browser responsive');return;}
 if(now-lastReport>1000){const floorNote=micState==='listening'?' · noise floor '+gate.noiseFloor.toFixed(2)+(gate.open?'':' · quiet'):'';report((micState==='listening'?'Listening · ':'')+formatDancerCount(api.nd_count(),markerCount())+' · '+api.nd_pulse_count()+' pulses'+floorNote);lastReport=now;}
 schedule(Math.max(0,1000/30-cost));
}
function projectorLayout(layer){const r=layer.getBoundingClientRect(),w=r.width,h=r.height;layer.dataset.pinWidth=String(Math.round(w));return {id:'nd-room-projector',sourcePoints:[[0,0],[w,0],[w,h],[0,h]],targetPoints:[[r.left,r.top],[r.right,r.top],[r.right,r.bottom],[r.left,r.bottom]]};}
function enterMapping(layout){allowMap=true;const layer=document.getElementById('nd-room-projector');layer.style.position='fixed';layer.style.display='block';layer.style.top='0px';layer.style.left='0px';layer.style.margin='0px';layer.style.padding='0px';layer.style.width=layer.dataset.pinWidth+'px';mapper.setLayout([layout]);mapper.setConfigEnabled(true);root.classList.add('is-mapping');alignButton.setAttribute('aria-pressed','true');alignButton.textContent='Mapping';}
function exitMapping(){allowMap=false;if(mapper)mapper.setConfigEnabled(false);const layer=document.getElementById('nd-room-projector');layer.style.position='';layer.style.top='';layer.style.left='';layer.style.margin='';layer.style.padding='';layer.style.display='';layer.style.width='';layer.style.transform='';root.classList.remove('is-mapping');alignButton.setAttribute('aria-pressed','false');alignButton.textContent='Align projector';}
function toggleAlign(){if(!window.maptastic||!window.maptastic.Maptastic){report('Projector align unavailable');return;}const layer=document.getElementById('nd-room-projector');if(alignButton.getAttribute('aria-pressed')==='true'){exitMapping();return;}const layout=projectorLayout(layer);if(!mapper){try{mapper=new maptastic.Maptastic({autoSave:false,autoLoad:false,labels:false,layers:['nd-room-projector']});const open=mapper.setConfigEnabled.bind(mapper);mapper.setConfigEnabled=on=>{if(on&&!allowMap)return;open(on);};}catch{report('Projector align unavailable');return;}}enterMapping(layout);}
function mapping(){return alignButton.getAttribute('aria-pressed')==='true';}
function pointerWorld(e){const r=canvas.getBoundingClientRect(),scale=canvas.width/W,vx=0,vy=canvas.height/2-H*scale/2;const cx=(e.clientX-r.left)*canvas.width/Math.max(1,r.width),cy=(e.clientY-r.top)*canvas.height/Math.max(1,r.height);return {x:(cx-vx)/scale,y:(cy-vy)/scale};}
function dancerAt(p){const f=floats(),base=api.nd_dancers()>>>2,ds=api.nd_dancer_stride(),n=api.nd_count();let id=0,best=18;for(let i=0;i<n;i++){const o=base+i*ds,d=Math.hypot(f[o]-p.x,f[o+1]-p.y);if(d<best){id=f[o+5]|0;best=d;}}return id;}
function loadRoomSettings(){
  let saved=null;
  try{saved=readRoomSettings(memoryOf(null));}catch{saved=null;}
  if(saved&&Array.isArray(saved.sim))rememberSim(saved.sim);
  else if(saved&&saved.simDancers===false)rememberSim([]);
  else seedSimList();
  if(!saved)return;
  for(const name of ['gravity','wander','threshold','peak','quiet']){const input=el('[data-control="'+name+'"]');if(input&&Number.isFinite(saved[name]))input.value=String(saved[name]);}
  const type=el('[data-control="type"]');if(type&&Number.isFinite(saved.type))type.value=String(saved.type);
  if(Array.isArray(saved.sens))root.querySelectorAll('[data-control="sens"]').forEach(input=>{const band=+input.dataset.band;if(Number.isFinite(+saved.sens[band]))input.value=String(saved.sens[band]);});
}
function saveRoomSettings(){
  try{
    const sens=[0,1,2,3].map(band=>{const input=root.querySelector('[data-control="sens"][data-band="'+band+'"]');return input?+input.value:1;});
    const type=el('[data-control="type"]');
    writeRoomSettings(memoryOf(null),{
      gravity:+el('[data-control="gravity"]').value,
      wander:+el('[data-control="wander"]').value,
      threshold:+el('[data-control="threshold"]').value,
      peak:+el('[data-control="peak"]').value,
      quiet:+(el('[data-control="quiet"]')||{value:0.08}).value,
      type:type?+type.value:1,
      sens,
      sim:sim.map(d=>({id:d.id,x:d.x,y:d.y,type:d.type})),
      simDancers:sim.length>0
    });
  }catch{}
}
function bindSlider(name,apply,format){const input=el('[data-control="'+name+'"]'),out=el('[data-value="'+name+'"]');const sync=draw=>{const v=+input.value;apply(v);if(out)out.textContent=format(v);saveRoomSettings();if(draw)still();};input.addEventListener('input',()=>sync(true));sync(false);}
loadRoomSettings();
bindSlider('gravity',v=>api.nd_set_gravity(v),v=>v.toFixed(1)+'×');
bindSlider('wander',v=>api.nd_set_wander(v),v=>v.toFixed(2));
bindSlider('threshold',v=>api.nd_set_threshold(v),v=>(+v).toFixed(2));
bindSlider('peak',v=>api.nd_set_peak_hold(v),v=>v.toFixed(1)+' s');
bindSlider('quiet',v=>ndSilenceGate.setQuiet(gate,v),v=>(+v).toFixed(2));
root.querySelectorAll('[data-control="sens"]').forEach(input=>{const band=+input.dataset.band;const out=el('[data-value="sens-'+band+'"]');const sync=draw=>{const v=+input.value;bandSens[band]=v;api.nd_set_band_sens(band,v);if(out)out.textContent=v.toFixed(2)+'×';saveRoomSettings();if(draw)still();};input.addEventListener('input',()=>sync(true));sync(false);});
const typeInput=el('[data-control="type"]');if(typeInput)typeInput.addEventListener('change',()=>saveRoomSettings());
canvas.addEventListener('pointerdown',e=>{if(!api||mapping())return;const p=pointerWorld(e);if(p.x<0||p.y<0||p.x>W||p.y>H)return;const near=dancerAt(p);if(e.shiftKey){if(near&&sim.some(d=>d.id===near)){sim=sim.filter(d=>d.id!==near);saveRoomSettings();syncStickers();paintSimButtons();reportCount();still();}return;}pointer={id:near&&sim.some(d=>d.id===near)?near:0,x:e.clientX,y:e.clientY,moved:false};try{canvas.setPointerCapture(e.pointerId);}catch{}});
canvas.addEventListener('pointermove',e=>{if(!pointer||!api)return;pointer.moved=pointer.moved||Math.hypot(e.clientX-pointer.x,e.clientY-pointer.y)>3;if(pointer.id&&pointer.moved){const p=pointerWorld(e);const x=Math.max(0,Math.min(W,p.x)),y=Math.max(0,Math.min(H,p.y));const dancer=sim.find(d=>d.id===pointer.id);if(dancer){dancer.x=x;dancer.y=y;}api.nd_move(pointer.id,x,y);still();}});
canvas.addEventListener('pointerup',e=>{if(!pointer||!api)return;const dragged=pointer.id&&pointer.moved;if(!pointer.id&&!pointer.moved){const p=pointerWorld(e);if(p.x>=0&&p.x<=W&&p.y>=0&&p.y<=H){const kind=+el('[data-control="type"]').value||0;addSimAt(p.x,p.y,kind);}}else if(dragged)saveRoomSettings();pointer=null;still();});
canvas.addEventListener('pointercancel',()=>{pointer=null;});
play.onclick=()=>running?stop():start();listenButton.onclick=toggleListen;alignButton.onclick=toggleAlign;
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(alignButton.getAttribute('aria-pressed')==='true'){exitMapping();e.stopImmediatePropagation();e.preventDefault();}},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop('Paused while out of view',true);});
window.addEventListener('pagehide',()=>{stop();disarmMic();});
if('IntersectionObserver' in window)new IntersectionObserver(()=>{if(running&&!onscreen())stop('Paused while out of view',true);}).observe(canvas);
theme();syncStickers();holdClock();still();paintSimButtons();report('Ready · '+formatDancerCount(api.nd_count(),markerCount())+' · mic off');
root.querySelectorAll('[data-action="sim-dancers"],[data-sim-clear]').forEach(btn=>{btn.addEventListener('click',()=>{if(sim.length)clearSim();});});
root.querySelectorAll('[data-action="sim-seed"]').forEach(btn=>{btn.addEventListener('click',()=>seedSim());});
function stageDancers(){const f=floats(),base=api.nd_dancers()>>>2,ds=api.nd_dancer_stride(),n=api.nd_count(),out=[];for(let i=0;i<n;i++){const o=base+i*ds;out.push({id:f[o+5]|0,x:f[o],y:f[o+1],type:f[o+4]|0});}return out;}
root.neuralDance={
  formatDancerCount,
  setStickerFeed(feed){root._feed=feed&&typeof feed.sample==='function'?feed:null;},
  hit(type){api.nd_hit(type|0);},
  // studio-tracker #793. Fluorescent markers in projection pixels, or null to keep the current dancers.
  markers(){return root._markers||null;},
  setMarkers(list){root._markers=Array.isArray(list)?list.slice(0,48).map(m=>{const marker={id:+m.id||0,x:+m.x||0,y:+m.y||0,type:((m.type|0)%4+4)%4,kind:m.kind==='sticker'?'sticker':'pink'};const contour=sanitizeContour(m.contour);if(contour)marker.contour=contour;return marker;}):null;if(!root._markerFeed)root._markerFeed={sample(){return root._markers;}};if(root._markers)root._feed=root._markerFeed;else if(root._feed===root._markerFeed)root._feed=null;syncStickers();still();return root._markers;},
  lightMode(){return silhouetteShow.mode();},
  setLightMode(mode){const next=silhouetteShow.setMode(mode);root.dataset.lightMode=next;still();return next;},
  toggleLightMode(){const next=silhouetteShow.toggle();root.dataset.lightMode=next;still();return next;},
  setSilhouetteStyle(style){root._silhouetteStyle=typeof style==='function'?style:null;still();return !!root._silhouetteStyle;},
  poke(){consumeFeed();still();},
  retint(){theme();},
  redraw(){draw();},
  clearSim(){clearSim();return sim.length;},
  seedSim(){seedSim();return sim.length;},
  addSim(x,y,type){return addSimAt(+x||0,+y||0,type|0);},
  simList(){return sim.map(d=>({id:d.id,x:d.x,y:d.y,type:d.type}));},
  stageDancers(){return stageDancers();},
  simDancers(){return sim.length>0;},
  debugAudio(){const listening=micState==='listening';const lv=listening?lastLevels:[0,0,0,0];return {source:listening?'mic':'silent',kick:+lv[0]||0,bass:+lv[1]||0,snare:+lv[2]||0,hat:+lv[3]||0,envelopes:{kick:+lv[0]||0,bass:+lv[1]||0,snare:+lv[2]||0,hat:+lv[3]||0},silenceGate:!listening||!gate.open,noiseFloor:+gate.noiseFloor||0,open:!!(listening&&gate.open),micGain:+gate.gain||0};},
  debugRoom(){return {running,simDancers:sim.length>0,simCount:sim.length,dancers:api.nd_count(),pulses:api.nd_pulse_count(),stickers:markerCount(),markersLive:root.dataset.markersLive==='1'};}
};
root.dataset.roomReady='1';
})();
}
if(typeof document!=='undefined'){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootRoomLab);
  else bootRoomLab();
}
