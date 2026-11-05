// Room music runtime shared by /neural-dance/ and /neural-dance/live/.
// One WASM instance, mic Listen, display AGC, and the marker hook camera mode calls.
// Slider values stay in this browser under nd-room-lab.

export const ROOM_KEY = 'nd-room-lab';

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
    sens
  };
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
      sens: settings.sens
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
let api=null,running=false,low=false,allowMap=false,mapper=null;
let timer=0,raf=0,last=0,started=0,slow=0,lastReport=0;
let ac=null;
let colors=[],foreground='',background='';
const rings=(typeof NeuralDanceRings==='undefined'?null:NeuralDanceRings.createSession())||{connect(){},release(){},sample(){},stroke(){}};
let micState='off',micPending=false,micStream=null,micSource=null,analyser=null,spec=null,pointer=null;
const bandSens=[1,1,1,1];
const hotUntil=[0,0,0,0];
const MIC={off:{label:'Listen',status:'Mic off',pressed:false},listening:{label:'Listening',status:'Listening',pressed:true},muted:{label:'Muted',status:'Muted',pressed:false},unavailable:{label:'No mic',status:'No microphone',pressed:false}};
try{
  if(!globalThis.ndSilenceGate)throw new Error('gate');
  const res=await fetch('/neural-dance/neural-dance.wasm');
  if(!res.ok)throw new Error('missing');
  api=(await WebAssembly.instantiate(await res.arrayBuffer())).instance.exports;
  if(typeof api.nd_set_clock!=='function'||typeof api.nd_add!=='function'||typeof api.nd_set_gravity!=='function'||typeof api.nd_set_wander!=='function'||typeof api.nd_set_threshold!=='function'||typeof api.nd_set_peak_hold!=='function'||typeof api.nd_set_band_sens!=='function')throw new Error('exports');
}catch{status.textContent='Room music unavailable';play.disabled=listenButton.disabled=alignButton.disabled=true;return;}
const gate=ndSilenceGate.create();
function floats(){return new Float32Array(api.memory.buffer);}
function theme(){
  const resolver=document.createElement('span');root.appendChild(resolver);
  function color(token){resolver.style.color='var('+token+')';return getComputedStyle(resolver).color;}
  colors=[1,2,3,4].map(i=>color('--viz-series-'+i));foreground=color('--foreground');background=color('--background');resolver.remove();
  for(let k=0;k<4;k++)el('[data-legend="'+k+'"]').style.color=colors[k];
  still();
}
function applyStickers(){const n=positions.length;const f=new Float32Array(api.memory.buffer,api.nd_sticker_in(),n*4);positions.forEach(([x,y],i)=>{f[i*4]=i+1;f[i*4+1]=x;f[i*4+2]=y;f[i*4+3]=i%4;});api.nd_set_stickers(n);}
function report(text){status.textContent=text;}
function onscreen(){const r=canvas.getBoundingClientRect();return !document.hidden&&r.bottom>0&&r.top<innerHeight&&r.left<innerWidth&&r.right>0&&root.isConnected;}
function cancel(){clearTimeout(timer);cancelAnimationFrame(raf);timer=raf=0;}
function stop(text='Paused', releaseMic=false){running=false;cancel();if(releaseMic)disarmMic();else if(ac&&micState!=='listening')ac.suspend().catch(()=>{});play.textContent='Start';report(text);}
function start(){if(running||!onscreen()||!api)return;cancel();running=true;last=performance.now();started=last;slow=0;play.textContent='Pause';report(micState==='listening'?'Listening':'Running');if(ac&&micState==='listening')ac.resume().catch(()=>{});schedule(0);}
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
function drawSpectrum(levels){const w=spectrum.width,h=spectrum.height;sctx.fillStyle='#05060a';sctx.fillRect(0,0,w,h);const names=['Kick','Bass','Mid','Treble'],cols=['#ff927d','#eb92f5','#7fe8b3','#81b7fc'];if(micState!=='listening'||!spec){sctx.fillStyle='#9da5b8';sctx.font='14px sans-serif';sctx.fillText(micState==='muted'?'Muted':'Mic off',12,h/2);return;}
 const lv=levels||rawLevels(),gap=10,bw=(w-gap*5)/4;sctx.font='13px sans-serif';sctx.textAlign='center';
 for(let k=0;k<4;k++){const v=lv[k]||0,x=gap+k*(bw+gap),track=h-28,bh=Math.max(2,v*track);sctx.fillStyle='#171b27';sctx.fillRect(x,8,bw,track);sctx.fillStyle=cols[k];sctx.fillRect(x,8+track-bh,bw,bh);sctx.fillText(names[k],x+bw/2,h-6);}sctx.textAlign='left';
}
function shape(k,p,r){ctx.beginPath();if(k===0)ctx.arc(p.x,p.y,r,0,Math.PI*2);else if(k===1){ctx.moveTo(p.x,p.y-r);ctx.lineTo(p.x+r,p.y);ctx.lineTo(p.x,p.y+r);ctx.lineTo(p.x-r,p.y);ctx.closePath();}else if(k===2)ctx.rect(p.x-r*.8,p.y-r*.8,r*1.6,r*1.6);else{ctx.moveTo(p.x,p.y-r);ctx.lineTo(p.x+r,p.y+r);ctx.lineTo(p.x-r,p.y+r);ctx.closePath();}ctx.fill();}
function sacred(xy){const CX=500,CY=310,SX=1.18,SY=.72;ctx.save();ctx.strokeStyle='rgba(145,150,180,.22)';ctx.lineWidth=1.4;ctx.lineCap='round';
 for(const r of [105,185,265]){ctx.beginPath();for(let i=0;i<=100;i++){const a=i/100*Math.PI*2,p=xy(CX+Math.cos(a)*r*SX,CY+Math.sin(a)*r*SY);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.stroke();}
 for(let a=0;a<Math.PI;a+=Math.PI/4){const p=xy(CX-Math.cos(a)*360,CY-Math.sin(a)*230),q=xy(CX+Math.cos(a)*360,CY+Math.sin(a)*230);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
 ctx.restore();}
function draw(){const f=floats(),base=api.nd_dancers()>>>2,ds=api.nd_dancer_stride(),n=api.nd_count();const scale=canvas.width/W,vx=0,vy=canvas.height/2-H*scale/2;const xy=(x,y)=>({x:vx+x*scale,y:vy+y*scale});
 ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle=background||'#080910';ctx.fillRect(0,0,canvas.width,canvas.height);sacred(xy);
 ctx.lineWidth=1.5;ctx.strokeStyle=foreground;
 for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const ia=base+i*ds,ib=base+j*ds,ax=f[ia],ay=f[ia+1],bx=f[ib],by=f[ib+1];if(Math.hypot(ax-bx,ay-by)>R)continue;const activity=Math.min(f[ia+2],f[ib+2]);if(activity<.25)continue;ctx.globalAlpha=.08+.15*Math.min(1,activity);const p=xy(ax,ay),q=xy(bx,by),amp=Math.min(18,Math.abs(bx-ax)*.15),mid=xy(ax+(bx-ax)*.5,ay+(by-ay)*.5-amp);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.quadraticCurveTo(mid.x,mid.y-(p.y+q.y)/2+mid.y,q.x,q.y);ctx.stroke();}
 ctx.globalAlpha=1;const pb=api.nd_pulses()>>>2,pc=api.nd_pulse_count(),ps=api.nd_pulse_stride();
 for(let i=0;i<pc;i++){const o=pb+i*ps,k=f[o+2]|0,trail=f[o+7]|0;ctx.strokeStyle=colors[k];for(let j=1;j<trail;j++){ctx.globalAlpha=.6*j/trail;ctx.lineWidth=2+j/4;const a=xy(f[o+8+(j-1)*2],f[o+9+(j-1)*2]),b=xy(f[o+8+j*2],f[o+9+j*2]);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}ctx.globalAlpha=1;const p=xy(f[o+5],f[o+6]);ctx.fillStyle=colors[k];ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fill();}
 for(let i=0;i<n;i++){const o=base+i*ds,p=xy(f[o],f[o+1]),a=f[o+2],rest=f[o+3],k=f[o+4]|0,q=Math.min(1,a/1.4),boost=Math.min(2.4,Math.max(0,Number.isFinite(bandSens[k])?bandSens[k]:1)),radius=8+14*q*boost;ctx.globalAlpha=rest>0?.4:1;rings.stroke(ctx,p.x,p.y,radius*2.15,k,colors[k],low);ctx.strokeStyle=colors[k];ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.stroke();ctx.fillStyle=colors[k];shape(k,p,4+2*q);}
 ctx.globalAlpha=1;
}
function consumeFeed(){if(!root._feed)return;try{const sample=root._feed.sample();if(!Array.isArray(sample))return;const n=Math.min(sample.length,48);if(n){const buf=new Float32Array(api.memory.buffer,api.nd_sticker_in(),n*4);for(let i=0;i<n;i++){const s=sample[i];buf[i*4]=s.id||0;buf[i*4+1]=s.x;buf[i*4+2]=s.y;buf[i*4+3]=s.type|0;}}api.nd_set_stickers(n);}catch{}}
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
  const tones=api.nd_update(Math.min(.067,gap/1000),listening?1:0,bins,ac?ac.sampleRate:48000,analyser?analyser.fftSize:2048,now);
  if(listening){for(let k=0;k<4;k++)if(tones&(1<<k))hotUntil[k]=now+180;paintMeters(now,levels);paintFloor(true);}else paintFloor(false);
  if(listening&&micSource&&ac)rings.connect(ac,micSource);else rings.release();
  rings.sample(gap/1000);
  draw();drawSpectrum(levels);
 }catch{stop('Paused');return;}
 const cost=performance.now()-begin;slow=cost>25||gap>150?slow+1:Math.max(0,slow-1);
 if(cost>150||slow>=12){low=true;api.nd_set_low(1);stop('Paused to keep the browser responsive');return;}
 if(now-lastReport>1000){const floorNote=micState==='listening'?' · noise floor '+gate.noiseFloor.toFixed(2)+(gate.open?'':' · quiet'):'';report((micState==='listening'?'Listening · ':'')+api.nd_count()+' dancers · '+api.nd_pulse_count()+' pulses'+floorNote);lastReport=now;}
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
      sens
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
canvas.addEventListener('pointerdown',e=>{if(!api||mapping())return;const p=pointerWorld(e);if(p.x<0||p.y<0||p.x>W||p.y>H)return;const near=dancerAt(p);if(e.shiftKey){if(near){api.nd_remove(near);still();}return;}pointer={id:near,x:e.clientX,y:e.clientY,moved:false};try{canvas.setPointerCapture(e.pointerId);}catch{}});
canvas.addEventListener('pointermove',e=>{if(!pointer||!api)return;pointer.moved=pointer.moved||Math.hypot(e.clientX-pointer.x,e.clientY-pointer.y)>3;if(pointer.id&&pointer.moved){const p=pointerWorld(e);api.nd_move(pointer.id,Math.max(0,Math.min(W,p.x)),Math.max(0,Math.min(H,p.y)));still();}});
canvas.addEventListener('pointerup',e=>{if(!pointer||!api)return;if(!pointer.id&&!pointer.moved){const p=pointerWorld(e);if(p.x>=0&&p.x<=W&&p.y>=0&&p.y<=H){const kind=+el('[data-control="type"]').value;if(!api.nd_add(p.x,p.y,kind))report('48-dancer limit · remove one to add another');}}pointer=null;still();});
canvas.addEventListener('pointercancel',()=>{pointer=null;});
play.onclick=()=>running?stop():start();listenButton.onclick=toggleListen;alignButton.onclick=toggleAlign;
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(alignButton.getAttribute('aria-pressed')==='true'){exitMapping();e.stopImmediatePropagation();e.preventDefault();}},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop('Paused while out of view',true);});
window.addEventListener('pagehide',()=>{stop();disarmMic();});
if('IntersectionObserver' in window)new IntersectionObserver(()=>{if(running&&!onscreen())stop('Paused while out of view',true);}).observe(canvas);
theme();applyStickers();holdClock();still();report('Ready · '+api.nd_count()+' dancers · mic off');
root.neuralDance={
  setStickerFeed(feed){root._feed=feed&&typeof feed.sample==='function'?feed:null;},
  hit(type){api.nd_hit(type|0);},
  // studio-tracker #793. Fluorescent markers in projection pixels, or null to keep the current dancers.
  markers(){return root._markers||null;},
  setMarkers(list){root._markers=Array.isArray(list)?list.slice(0,48).map(m=>({id:+m.id||0,x:+m.x||0,y:+m.y||0,type:((m.type|0)%4+4)%4})):null;if(!root._markerFeed)root._markerFeed={sample(){return root._markers;}};if(root._markers)root._feed=root._markerFeed;else if(root._feed===root._markerFeed)root._feed=null;return root._markers;},
  poke(){consumeFeed();still();}
};
root.dataset.roomReady='1';
})();
}
if(typeof document!=='undefined'){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootRoomLab);
  else bootRoomLab();
}
