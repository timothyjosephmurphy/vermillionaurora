import {Engine} from '@babylonjs/core/Engines/engine.js';
import {Scene} from '@babylonjs/core/scene.js';
import {UniversalCamera} from '@babylonjs/core/Cameras/universalCamera.js';
import {Vector3} from '@babylonjs/core/Maths/math.vector.js';
import {Color3,Color4} from '@babylonjs/core/Maths/math.color.js';
import {TransformNode} from '@babylonjs/core/Meshes/transformNode.js';
import {CreateBox} from '@babylonjs/core/Meshes/Builders/boxBuilder.js';
import {CreateGround} from '@babylonjs/core/Meshes/Builders/groundBuilder.js';
import {CreatePlane} from '@babylonjs/core/Meshes/Builders/planeBuilder.js';
import {StandardMaterial} from '@babylonjs/core/Materials/standardMaterial.js';
import {Texture} from '@babylonjs/core/Materials/Textures/texture.js';
import {DynamicTexture} from '@babylonjs/core/Materials/Textures/dynamicTexture.js';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight.js';
import {DirectionalLight} from '@babylonjs/core/Lights/directionalLight.js';
import '@babylonjs/core/Collisions/collisionCoordinator.js';
import '@babylonjs/core/Culling/ray.js';
import {approachPosition} from './gallery-walkthrough-layout.mjs';

async function initializeRoom(){
  const root=document.querySelector('[data-gallery-room]');if(!root)return;
  const canvas=root.querySelector('[data-room-canvas]'),enter=root.querySelector('[data-room-enter]'),pauseButton=root.querySelector('[data-room-pause]');
  const picker=root.querySelector('[data-room-picker]'),card=root.querySelector('[data-room-art-card]'),crosshair=root.querySelector('[data-room-crosshair]'),status=root.querySelector('[data-room-status]');
  const {artworks,rooms,hall,bounds,hallways,signs:signSpecs,start,courtyard,atlases={}}=JSON.parse(root.querySelector('[data-room-data]').textContent),byId=new Map(artworks.filter(a=>a.kind!=='plaque').map(art=>[art.id,art]));
  let engine;
  try{
    engine=new Engine(canvas,true,{stencil:true,powerPreference:'high-performance'},false);
    engine.setHardwareScalingLevel(1/Math.min(devicePixelRatio||1,1.5));
    const scene=new Scene(engine);scene.clearColor=new Color4(.71,.84,.95,1);
    scene.collisionsEnabled=true;scene.gravity=new Vector3(0,-.12,0);
        const camera=new UniversalCamera('gallery-visitor',new Vector3(start.x,hall.eyeHeight,start.z),scene);
    camera.setTarget(new Vector3(start.x,hall.eyeHeight,start.z+10));camera.minZ=.045;camera.maxZ=90;camera.fov=.95;
    camera.speed=.55;camera.inertia=.15;camera.angularSensibility=2400;
    camera.checkCollisions=true;camera.applyGravity=true;camera.ellipsoid=new Vector3(.22,hall.eyeHeight/2,.22);
    camera.keysUp=[87,38];camera.keysDown=[83,40];camera.keysLeft=[65];camera.keysRight=[68];
    camera.keysRotateLeft=[37];camera.keysRotateRight=[39];camera.keysUpward=[];camera.keysDownward=[];
    // A single touch drag looks around; the onscreen pad handles walking.
    camera.inputs.removeByType('FreeCameraTouchInput');
    if(camera.inputs.attached.mouse)camera.inputs.attached.mouse.touchEnabled=true;
    const hemisphere=new HemisphericLight('daylight',new Vector3(0,1,0),scene);hemisphere.intensity=.95;hemisphere.groundColor=new Color3(.62,.58,.52);
    const sun=new DirectionalLight('gallery-soft-light',new Vector3(.3,-1,.4),scene);sun.intensity=.3;
    const material=(name,hex,unlit=false)=>{const m=new StandardMaterial(name,scene);m.diffuseColor=Color3.FromHexString(hex);m.specularColor=new Color3(.025,.025,.025);if(unlit){m.disableLighting=true;m.emissiveColor=Color3.FromHexString(hex);}return m;};
    const plaster=material('warm-white-plaster','#f3efe5'),hallPlaster=material('hall-plaster','#ebe4d6'),trim=material('gallery-trim','#e7dfd0'),frameMaterial=material('black-wood-frame','#24221f'),matMaterial=material('conservation-mat','#fffdf7'),waiting=material('image-waiting','#d9d1c3',true),signMaterial=material('sign-board','#3a3029');
    const glass=material('window-glass','#dcebf2');glass.alpha=.14;glass.backFaceCulling=false;
    const box=(name,width,height,depth,position,mat,collides=false)=>{const mesh=CreateBox(name,{width,height,depth},scene);mesh.position.copyFromFloats(...position);mesh.material=mat;mesh.checkCollisions=collides;mesh.isPickable=false;mesh.freezeWorldMatrix();return mesh;};
    const {height:H,wall:t,door,doorHeight}=hall,b=bounds,midX=(b.minX+b.maxX)/2,spanX=b.maxX-b.minX+1,spanZ=b.maxZ-b.minZ+1,midZ=(b.minZ+b.maxZ)/2;
    // each room's four walls, with a lintel over every doorway; walls sit just outside the room rectangle
    const wallRun=(id,axis,fixed,lo,hi,openings,mat)=>{let x=lo-t;
      for(const o of [...openings.sort((p,q)=>p.from-q.from),null]){
        const end=o?o.from:hi+t;if(end>x){const len=end-x,c=(x+end)/2;axis==='x'?box(`${id}-${c.toFixed(2)}`,len,H,t,[c,H/2,fixed],mat,true):box(`${id}-${c.toFixed(2)}`,t,H,len,[fixed,H/2,c],mat,true);}
        if(o){const len=o.to-o.from,c=(o.from+o.to)/2,piece=(name,y0,y1,m=mat,collides=false)=>axis==='x'?box(`${id}-${name}-${c.toFixed(2)}`,len,y1-y0,t,[c,(y0+y1)/2,fixed],m,collides):box(`${id}-${name}-${c.toFixed(2)}`,t,y1-y0,len,[fixed,(y0+y1)/2,c],m,collides);
          if(o.sill!==undefined){piece('sill',0,o.sill,mat,true);piece('window-head',o.head,H);piece('glass',o.sill,o.head,glass,true);
            const ledge=axis==='x'?box(`${id}-ledge-${c.toFixed(2)}`,len+.1,.04,t+.12,[c,o.sill+.02,fixed],trim):box(`${id}-ledge-${c.toFixed(2)}`,t+.12,.04,len+.1,[fixed,o.sill+.02,c],trim);}
          else piece('lintel',doorHeight,H);x=o.to;}
      }};
    for(const r of rooms){
      const op=w=>[...r.openings,...(r.windows||[])].filter(o=>o.wall===w),mat=r.kind==='hall'?plaster:hallPlaster;
      wallRun(r.id+'-north','x',r.maxZ+t/2,r.minX,r.maxX,op('N'),mat);wallRun(r.id+'-south','x',r.minZ-t/2,r.minX,r.maxX,op('S'),mat);
      wallRun(r.id+'-east','z',r.maxX+t/2,r.minZ,r.maxZ,op('E'),mat);wallRun(r.id+'-west','z',r.minX-t/2,r.minZ,r.maxZ,op('W'),mat);
      for(let x=r.minX+3;x<r.maxX-1;x+=6)for(let z=r.minZ+3;z<r.maxZ-1;z+=6)box(`${r.id}-light-${x}-${z}`,1.2,.015,.3,[x,H-.03,z],material(`${r.id}-glow-${x}-${z}`,'#fff6dc',true));
    }
    // hallway side walls run between the hall and the gallery
    for(const h of hallways){
      if(h.maxX-h.minX<h.maxZ-h.minZ){for(const x of [h.minX-t/2,h.maxX+t/2])box(`${h.id}-hall-side-${x.toFixed(2)}`,t,H,h.maxZ-h.minZ+2*t,[x,H/2,(h.minZ+h.maxZ)/2],hallPlaster,true);}
      else{for(const z of [h.minZ-t/2,h.maxZ+t/2])box(`${h.id}-hall-side-${z.toFixed(2)}`,h.maxX-h.minX+2*t,H,t,[(h.minX+h.maxX)/2,H/2,z],hallPlaster,true);}
    }
    const signs=[];
    for(const sp of signSpecs){
      // the gallery's name, lettered above the corner doorway
      const tex=new DynamicTexture('sign-'+signs.length,{width:1024,height:160},scene,true),c=tex.getContext();
      c.fillStyle='#3a3029';c.fillRect(0,0,1024,160);c.fillStyle='#f6eedd';c.textAlign='center';c.textBaseline='middle';
      let size=58;c.font=`${size}px Georgia`;while(c.measureText(sp.title).width>960&&size>26){size-=2;c.font=`${size}px Georgia`;}
      c.fillText(sp.title,512,80);tex.update();const m=material('sign-material-'+signs.length,'#ffffff',true);m.diffuseTexture=tex;
      const sign=CreatePlane('doorway-sign-'+signs.length,{width:2.4,height:.375},scene);sign.material=m;sign.isPickable=false;
      sign.position.set(sp.x,sp.y,sp.z);sign.rotation.y=sp.yaw;signs.push(sign);
    }
    {const tex=new DynamicTexture('welcome-sign',{width:1024,height:420},scene,true),c=tex.getContext();c.fillStyle='#f3efe5';c.fillRect(0,0,1024,420);c.fillStyle='#4b3c2c';c.textAlign='center';c.font='34px Arial';c.fillText('T J   M U R P H Y',512,120);c.font='86px Georgia';c.fillText('The Gallery',512,230);c.font='30px Georgia';c.fillStyle='#8f7350';c.fillText(`${rooms.length} galleries · every painting at its true size`,512,320);tex.update();
      const central=rooms.find(r=>r.kind==='hall'),m=material('welcome-material','#ffffff',true);m.diffuseTexture=tex;const p=CreatePlane('welcome',{width:2.6,height:1.07},scene);p.material=m;p.position.set(0,2.2,central.minZ+.03);p.rotation.y=Math.PI;p.isPickable=false;}
    // ceilings over rooms and passages only: the courtyard is open to the sky, with a lawn, low hedges and two trees
    for(const r of [...rooms,...hallways])box(`ceiling-${r.id}`,r.maxX-r.minX+2*t+.02,.1,r.maxZ-r.minZ+2*t+.02,[(r.minX+r.maxX)/2,H+.05,(r.minZ+r.maxZ)/2],plaster);
    if(courtyard){const cw=courtyard.maxX-courtyard.minX,cd=courtyard.maxZ-courtyard.minZ,cx=(courtyard.minX+courtyard.maxX)/2,cz=(courtyard.minZ+courtyard.maxZ)/2;
      const lawn=CreateGround('courtyard-lawn',{width:cw-2*t,height:cd-2*t},scene);lawn.position.set(cx,.012,cz);lawn.material=material('lawn','#7f9f5a');lawn.isPickable=false;
      const hedge=material('hedge','#4f7040'),bark=material('bark','#6b5440'),leaves=material('leaves','#5d8248'),path=material('gravel','#d8cfbd');
      box('courtyard-path',cw-2*t,.02,.9,[cx,.022,cz],path);
      for(const sx of [-1,1]){box(`hedge-${sx}`,cw/2-2.4,.7,.5,[cx+sx*(cw/4+.6),.35,courtyard.maxZ-t-.4],hedge);box(`hedge-s-${sx}`,cw/2-2.4,.7,.5,[cx+sx*(cw/4+.6),.35,courtyard.minZ+t+.4],hedge);
        const tx=cx+sx*cw/8;box(`trunk-${sx}`,.22,3.2,.22,[tx,1.6,cz],bark);const crown=CreateBox(`crown-${sx}`,{size:1},scene);crown.scaling.set(2.2,2.4,Math.min(2.2,cd-.6));crown.position.set(tx,4.3,cz);crown.rotation.y=.785;crown.material=leaves;crown.isPickable=false;}}
    const floorMat=material('pale-oak','#ffffff');floorMat.specularColor=new Color3(.09,.08,.06);
    const grain=new DynamicTexture('oak-grain',{width:1024,height:1024},scene,true),ctx=grain.getContext();
    let seed=137;const random=()=>((seed=Math.imul(1664525,seed)+1013904223|0)>>>0)/4294967296;
    for(let i=0;i<16;i++){
      const light=70+random()*5;ctx.fillStyle=`hsl(34 23% ${light}%)`;ctx.fillRect(i*64,0,64,1024);
      ctx.fillStyle='#8c755839';ctx.fillRect(i*64,0,1,1024);
      for(let j=0;j<35;j++){ctx.strokeStyle=`rgba(104,78,40,${random()*.08})`;ctx.lineWidth=.5;ctx.beginPath();const x=i*64+random()*64,y=random()*1024;ctx.moveTo(x,y);ctx.lineTo(x+(random()-.5)*3,y+60+random()*220);ctx.stroke();}
    }
    grain.update();grain.uScale=spanX/4;grain.vScale=spanZ/4;floorMat.diffuseTexture=grain;
    const floor=CreateGround('oak-floor',{width:spanX,height:spanZ},scene);floor.position.set(midX,0,midZ);floor.material=floorMat;floor.checkCollisions=true;floor.isPickable=false;
    const imageStates=new Map();let readyImages=0,activeLoads=0;
    const wrap=(c,text,maxWidth)=>{const lines=[''];for(const word of String(text).split(/\s+/)){const last=lines.length-1,next=(lines[last]+' '+word).trim();if(c.measureText(next).width>maxWidth&&lines[last])lines.push(word);else lines[last]=next;}return lines;};
    function drawPlaque(art){
      const tex=new DynamicTexture(art.id+'-text',{width:620,height:820},scene,true),c=tex.getContext();
      c.fillStyle='#fbf7ee';c.fillRect(0,0,620,820);c.fillStyle='#3d3125';c.font='36px Georgia';let y=70;
      for(const line of wrap(c,art.title,540).slice(0,3)){c.fillText(line,40,y);y+=44;}
      c.fillStyle='#b98a55';c.fillRect(40,y-14,80,2);y+=26;c.fillStyle='#5d4e3d';c.font='19px Georgia';
      outer:for(const para of art.lines){for(const line of wrap(c,para,540)){if(y>780){c.fillText('…',40,y);break outer;}c.fillText(line,40,y);y+=27;}y+=12;}
      tex.update();return tex;
    }
    for(const art of artworks){
      const mount=new TransformNode(art.id,scene);mount.position.set(art.x,art.y,art.z);mount.rotation.y=art.yaw;
      if(art.kind==='plaque'){
        const m=material(art.id+'-plaque','#ffffff',true);m.diffuseTexture=drawPlaque(art);
        const p=CreatePlane(art.id+'-panel',{width:art.width,height:art.height},scene);p.parent=mount;p.position.z=-.01;p.material=m;p.isPickable=false;
        const back=box(art.id+'-backing',art.width+.02,art.height+.02,.012,[0,0,0],trim);back.unfreezeWorldMatrix();back.parent=mount;continue;
      }
      if(art.frameWidth>0){
        const frame=box(art.id+'-frame',art.width,art.height,.045,[0,0,0],frameMaterial);frame.unfreezeWorldMatrix();frame.parent=mount;frame.metadata={artId:art.id};frame.isPickable=true;
        const mat=box(art.id+'-mat',art.width-art.frameWidth*2,art.height-art.frameWidth*2,.004,[0,0,-.025],matMaterial);mat.unfreezeWorldMatrix();mat.parent=mount;mat.metadata={artId:art.id};mat.isPickable=true;
      }
      const image=CreatePlane(art.id+'-image',{width:art.imageWidth,height:art.imageHeight},scene);image.parent=mount;image.position.z=art.frameWidth>0?-.029:-.006;image.metadata={artId:art.id};image.material=waiting;
      const imageMaterial=material(art.id+'-colors','#ffffff',true);
      imageStates.set(art.id,{art,image,material:imageMaterial,width:0,loading:false,failed:new Set(),label:null,mount});
    }
    function makeLabel(state){
      const art=state.art,tex=new DynamicTexture(art.id+'-label',{width:768,height:192},scene,false),c=tex.getContext();
      c.fillStyle='#f3efe5';c.fillRect(0,0,768,192);c.fillStyle='#574836';c.font='26px Georgia';
      wrap(c,art.title,700).slice(0,2).forEach((line,i)=>c.fillText(line,24,42+i*34));c.font='18px Arial';c.fillStyle='#a08056';
      c.fillText(wrap(c,`TJ Murphy · ${art.caption||''}`,720)[0],24,151);tex.update();
      const m=material(art.id+'-label-material','#ffffff',true);m.diffuseTexture=tex;
      const label=CreatePlane(art.id+'-caption',{width:.28,height:.07},scene);label.parent=state.mount;
      label.position.set(art.width/2+.2,-Math.min(art.height/2,.45)+.035,-.01);if(art.kind==='mural'&&art.width>4)label.position.set(-art.width/2+.14,-art.height/2-.08,-.01);
      label.material=m;label.isPickable=false;state.label=label;
    }
    root.dataset.paintings=String(artworks.filter(a=>a.kind==='painting'||a.kind==='mural').length);root.dataset.rooms=String(rooms.length);root.dataset.works=String(imageStates.size);
    let playing=false,navigating=false,selected=null,contactSince=0,lastLod=0,hadPointerLock=false;
    const roomName=root.querySelector('[data-room-current]'),held=new Set(),productLink=root.querySelector('[data-room-product]'),map=root.querySelector('[data-room-map-you]');
    function stopMotion(){held.clear();root.querySelectorAll('.is-held').forEach(el=>el.classList.remove('is-held'));camera.cameraDirection.setAll(0);camera.cameraRotation.setAll(0);}
    function pause(){if(navigating)return;playing=false;root.dataset.playing='false';camera.detachControl();stopMotion();
      // An intentional unlock can finish after a painting jump has resumed play.
      // Consume that exit here so its asynchronous event cannot pause the new view.
      hadPointerLock=false;if(document.pointerLockElement)document.exitPointerLock();
      enter.textContent='Continue exploring';pauseButton.textContent='Continue';card.hidden=true;enter.focus({preventScroll:true});}
    function play(lock=true){
      playing=true;root.dataset.playing='true';camera.attachControl(canvas,true);canvas.focus({preventScroll:true});pauseButton.textContent='Controls';
      if(lock&&matchMedia('(pointer:fine)').matches&&canvas.requestPointerLock){try{const pending=canvas.requestPointerLock();pending?.catch(()=>{});}catch{}}
    }
    function remember(art){const position=art&&Math.hypot(camera.position.x-art.x,camera.position.z-art.z)<.7?approachPosition(art,.95):camera.position;try{sessionStorage.setItem('tj-gallery-walkthrough-position',JSON.stringify({x:position.x,z:position.z,yaw:camera.rotation.y,pitch:camera.rotation.x}));}catch{}}
    function visit(art){if(!art||navigating)return;navigating=true;remember(art);stopMotion();camera.detachControl();if(document.pointerLockElement)document.exitPointerLock();location.assign(new URL(art.href,'https://tjm.art').href);}
    function showArt(art){
      if(selected?.id===art?.id)return;selected=art;root.dataset.focusedArt=art?.id||'';contactSince=0;crosshair.classList.toggle('is-targeting',!!art);card.hidden=!art||!playing;
      if(!art)return;
      root.querySelector('[data-room-art-title]').textContent=art.title;
      root.querySelector('[data-room-art-size]').textContent=`${art.caption||''} · ${art.roomTitle}`;root.querySelector('[data-room-art-kind]').textContent=art.kind==='photo'?'Exhibition photograph':art.kind==='mural'?'TJ Murphy · Mural':'TJ Murphy · Painting';
      productLink.href=new URL(art.href,'https://tjm.art').href;picker.value=art.id;
    }
    function goTo(id){const art=byId.get(id);if(!art)return;stopMotion();const position=approachPosition(art);camera.position.copyFromFloats(position.x,position.y,position.z);camera.setTarget(new Vector3(art.x,art.y,art.z));play(false);showArt(art);}
    // Textures and labels load only near the visitor, so the full collection never sits in memory at once.
    // Thumbnails first: one atlas per room (current room, then its neighbours, then the rest), so every wall fills in
    // within a few requests; then ≤960 px previews only for works near the visitor in the room they are in.
    const roomAt=(x,z)=>rooms.find(r=>x>r.minX&&x<r.maxX&&z>r.minZ&&z<r.maxZ);
    const atlasTex=new Map(),t0=performance.now();let thumbsReady=0;const thumbTotal=[...imageStates.values()].filter(s=>s.art.thumb).length;
    function applyThumb(state,tex){
      if(state.thumbTex)return;const a=atlases[state.art.thumb.atlas],[x,y,w,h]=state.art.thumb.rect,t=tex.clone();
      t.uScale=w/a.width;t.vScale=h/a.height;t.uOffset=x/a.width;t.vOffset=1-(y+h)/a.height;t.wrapU=t.wrapV=Texture.CLAMP_ADDRESSMODE;
      state.thumbTex=t;thumbsReady++;if(!state.width){state.material.diffuseTexture=t;state.image.material=state.material;state.width=1;readyImages++;}root.dataset.loadedImages=String(readyImages);
      if(thumbsReady===thumbTotal)root.dataset.thumbsMs=String(Math.round(performance.now()-t0));
    }
    function loadAtlases(){
      const here=roomAt(camera.position.x,camera.position.z)||rooms.find(r=>r.kind==='hall'),ring=['S','W','N','E'],k=ring.indexOf(here.ring);
      const order=[here,...rooms.filter(r=>r!==here).sort((a,b)=>{const d=r=>{const i=ring.indexOf(r.ring);return Math.min((i-k+4)%4,(k-i+4)%4);};return d(a)-d(b);})];
      for(const r of order){const a=atlases[r.id];if(!a||atlasTex.has(r.id))continue;
        const load=(url,retry)=>{const tex=new Texture(url,scene,false,true,Texture.TRILINEAR_SAMPLINGMODE,()=>{for(const st of imageStates.values())if(st.art.thumb?.atlas===r.id)applyThumb(st,tex);},()=>{tex.dispose();if(retry)load(a.fallback,false);});atlasTex.set(r.id,tex);};
        load(a.src,true);}
    }
    loadAtlases();
    function setTexture(state,source,useFallback=false){
      const url=useFallback?source.fallback:source.src;state.loading=true;activeLoads++;
      const next=new Texture(url,scene,false,true,Texture.TRILINEAR_SAMPLINGMODE,()=>{
        if(state.detail)state.detail.dispose();state.detail=next;state.material.diffuseTexture=next;next.anisotropicFilteringLevel=8;state.image.material=state.material;
        if(!state.width){readyImages++;root.dataset.loadedImages=String(readyImages);}state.width=source.width;state.loading=false;activeLoads--;
      },()=>{next.dispose();state.loading=false;activeLoads--;if(!useFallback&&source.fallback&&source.fallback!==source.src)setTexture(state,source,true);else state.failed.add(source.src);});
    }
    function loadDetail(){
      const p=camera.position,here=roomAt(p.x,p.z);
      const close=[...imageStates.values()].map(state=>({state,distance:Math.hypot(p.x-state.art.x,p.z-state.art.z),same:here&&state.art.room===here.id})).sort((a,c)=>(c.same-a.same)||a.distance-c.distance);
      for(const {state,distance,same} of close){
        const art=state.art;
        if(distance<9&&!state.label)makeLabel(state);
        else if(distance>15&&state.label){state.label.material.diffuseTexture?.dispose();state.label.material.dispose();state.label.dispose();state.label=null;}
        // far away: drop the preview and fall back to the atlas tile (thumbnails stay in memory; they are tiny)
        if(state.detail&&!state.loading&&distance>(art.kind==='mural'?30:14)&&state.thumbTex){state.material.diffuseTexture=state.thumbTex;state.detail.dispose();state.detail=null;state.width=1;continue;}
        if(activeLoads>=4)continue;
        const near=art.kind==='mural'?distance<24:(same&&distance<7)||distance<3.5;if(!near)continue;
        const want=960,source=art.sources.find(s=>s.width>=want)||art.sources.at(-1);
        if(!source||state.loading||state.width>=source.width||state.failed.has(source.src))continue;
        setTexture(state,source);
      }
    }
    const inside=(x,z)=>[...rooms,...hallways].some(r=>x>r.minX+.25&&x<r.maxX-.25&&z>r.minZ+.25&&z<r.maxZ-.25);
    try{const saved=JSON.parse(sessionStorage.getItem('tj-gallery-walkthrough-position'));if(saved&&[saved.x,saved.z,saved.yaw,saved.pitch].every(Number.isFinite)&&inside(saved.x,saved.z)){camera.position.set(saved.x,hall.eyeHeight,saved.z);camera.rotation.set(saved.pitch,saved.yaw,0);}}catch{}
    enter.addEventListener('click',()=>play());pauseButton.addEventListener('click',()=>playing?pause():play());picker.addEventListener('change',()=>goTo(picker.value));
    productLink.addEventListener('click',event=>{if(event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();visit(selected);}});
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'){pause();return;}
      if(playing&&event.target===canvas&&event.key.toLowerCase()==='e'&&selected){event.preventDefault();visit(selected);}
    });
    document.addEventListener('pointerlockchange',()=>{const locked=document.pointerLockElement===canvas;if(hadPointerLock&&!locked&&playing)pause();hadPointerLock=locked;});
    window.addEventListener('blur',()=>{if(playing)pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)pause();});
    let pointerStart=null,pointerTravel=0;
    canvas.addEventListener('pointerdown',event=>{pointerStart={x:event.clientX,y:event.clientY};pointerTravel=0;});
    canvas.addEventListener('pointermove',event=>{if(pointerStart)pointerTravel+=Math.hypot(event.movementX||event.clientX-pointerStart.x,event.movementY||event.clientY-pointerStart.y);});
    canvas.addEventListener('click',event=>{
      if(!playing||pointerTravel>6)return;
      const rect=canvas.getBoundingClientRect(),locked=document.pointerLockElement===canvas;
      const x=locked?canvas.clientWidth/2:event.clientX-rect.left;
      const y=locked?canvas.clientHeight/2:event.clientY-rect.top;
      const hit=scene.pick(x,y,mesh=>!!mesh.metadata?.artId);if(hit?.hit)visit(byId.get(hit.pickedMesh.metadata.artId));
    });
    for(const button of root.querySelectorAll('[data-room-move]')){
      button.addEventListener('pointerdown',event=>{event.preventDefault();button.setPointerCapture(event.pointerId);held.add(button.dataset.roomMove);button.classList.add('is-held');});
      const release=()=>{held.delete(button.dataset.roomMove);button.classList.remove('is-held');};
      for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,release);
    }
    scene.onBeforeRenderObservable.add(()=>{
      camera.rotation.x=Math.max(-1.05,Math.min(1.05,camera.rotation.x));camera.rotation.z=0;
      if(playing&&held.size){const dt=Math.min(engine.getDeltaTime(),50)/1000,forward=Number(held.has('forward'))-Number(held.has('back')),side=Number(held.has('right'))-Number(held.has('left')),length=Math.max(1,Math.hypot(forward,side)),yaw=camera.rotation.y;
        camera.cameraDirection.addInPlace(new Vector3((Math.sin(yaw)*forward+Math.cos(yaw)*side)*1.65*dt/length,0,(Math.cos(yaw)*forward-Math.sin(yaw)*side)*1.65*dt/length));}
    });
    scene.onAfterRenderObservable.add(()=>{
      // These bounds also guard a stalled frame when a tab returns from the background.
      camera.position.x=Math.max(bounds.minX+.22,Math.min(bounds.maxX-.22,camera.position.x));camera.position.z=Math.max(bounds.minZ+.22,Math.min(bounds.maxZ-.22,camera.position.z));
      map.style.left=`${(camera.position.x-bounds.minX)/(bounds.maxX-bounds.minX)*100}%`;map.style.top=`${(bounds.maxZ-camera.position.z)/(bounds.maxZ-bounds.minZ)*100}%`;
      const here=rooms.find(r=>camera.position.x>r.minX&&camera.position.x<r.maxX&&camera.position.z>r.minZ&&camera.position.z<r.maxZ);if((here?.id||'hallway')!==root.dataset.room){root.dataset.room=here?.id||'hallway';roomName.textContent=here?here.title:'Hallway';}map.style.transform=`translate(-50%,-50%) rotate(${camera.rotation.y}rad)`;
      root.dataset.position=JSON.stringify({x:camera.position.x,y:camera.position.y,z:camera.position.z,yaw:camera.rotation.y});
      const hit=scene.pick(canvas.clientWidth/2,canvas.clientHeight/2,mesh=>!!mesh.metadata?.artId),art=hit?.hit&&hit.distance<3.2?byId.get(hit.pickedMesh.metadata.artId):null;
      if(playing){showArt(art);card.hidden=!art;}
      if(playing&&art&&hit.distance<.42){if(!contactSince)contactSince=performance.now();if(performance.now()-contactSince>350)visit(art);}else contactSince=0;
      if(performance.now()-lastLod>500){lastLod=performance.now();loadDetail();}
    });
    new ResizeObserver(()=>engine.resize()).observe(canvas);
    window.addEventListener('pagehide',()=>{if(!navigating)remember();engine.stopRenderLoop();});
    window.addEventListener('pageshow',event=>{if(event.persisted){navigating=false;engine.runRenderLoop(()=>scene.render());pause();}});
    engine.runRenderLoop(()=>scene.render());
    await scene.whenReadyAsync();
    root.dataset.ready='true';enter.disabled=false;picker.disabled=false;pauseButton.disabled=false;enter.textContent='Enter the gallery';
    status.textContent=`A central hall and ${rooms.length-1} galleries. Every painting hangs at its true size.`;loadDetail();
  }catch(error){
    engine?.dispose();root.dataset.failed='true';root.querySelector('[data-room-error]').hidden=false;root.querySelector('[data-room-index]').open=true;
    enter.hidden=true;status.textContent='Explore the print wall or browse the paintings.';console.error('Gallery room could not start',error);
  }
}
initializeRoom();
