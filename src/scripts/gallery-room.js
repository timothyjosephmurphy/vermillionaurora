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
import {ShadowGenerator} from '@babylonjs/core/Lights/Shadows/shadowGenerator.js';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent.js';
import '@babylonjs/core/Collisions/collisionCoordinator.js';
import '@babylonjs/core/Culling/ray.js';
import {approachPosition} from './gallery-room-layout.mjs';

async function initializeRoom(){
  const root=document.querySelector('[data-gallery-room]');if(!root)return;
  const canvas=root.querySelector('[data-room-canvas]'),enter=root.querySelector('[data-room-enter]'),pauseButton=root.querySelector('[data-room-pause]');
  const picker=root.querySelector('[data-room-picker]'),card=root.querySelector('[data-room-art-card]'),crosshair=root.querySelector('[data-room-crosshair]'),status=root.querySelector('[data-room-status]');
  const {artworks,room}=JSON.parse(root.querySelector('[data-room-data]').textContent),byId=new Map(artworks.map(art=>[art.id,art]));
  let engine;
  try{
    engine=new Engine(canvas,true,{stencil:true,powerPreference:'high-performance'},false);
    engine.setHardwareScalingLevel(1/Math.min(devicePixelRatio||1,1.5));
    const scene=new Scene(engine);scene.clearColor=new Color4(.92,.89,.84,1);
    scene.collisionsEnabled=true;scene.gravity=new Vector3(0,-.12,0);
    const half=room.size/2;
    const camera=new UniversalCamera('gallery-visitor',new Vector3(1.65,room.eyeHeight,-1.65),scene);
    camera.setTarget(new Vector3(-2,room.eyeHeight,2));camera.minZ=.045;camera.maxZ=40;camera.fov=.95;
    camera.speed=.55;camera.inertia=.15;camera.angularSensibility=2400;
    camera.checkCollisions=true;camera.applyGravity=true;camera.ellipsoid=new Vector3(.22,room.eyeHeight/2,.22);
    camera.keysUp=[87,38];camera.keysDown=[83,40];camera.keysLeft=[65];camera.keysRight=[68];
    camera.keysRotateLeft=[37];camera.keysRotateRight=[39];camera.keysUpward=[];camera.keysDownward=[];
    // A single touch drag looks around; the onscreen pad handles walking.
    camera.inputs.removeByType('FreeCameraTouchInput');
    if(camera.inputs.attached.mouse)camera.inputs.attached.mouse.touchEnabled=true;
    const hemisphere=new HemisphericLight('daylight',new Vector3(0,1,0),scene);hemisphere.intensity=.85;hemisphere.groundColor=new Color3(.6,.56,.5);
    const sun=new DirectionalLight('gallery-soft-light',new Vector3(.3,-1,.4),scene);sun.position=new Vector3(-3,7,-5);sun.intensity=.45;
    const shadows=new ShadowGenerator(2048,sun);shadows.useBlurExponentialShadowMap=true;shadows.blurKernel=12;shadows.darkness=.16;shadows.bias=.001;
    const material=(name,hex,unlit=false)=>{const m=new StandardMaterial(name,scene);m.diffuseColor=Color3.FromHexString(hex);m.specularColor=new Color3(.025,.025,.025);if(unlit){m.disableLighting=true;m.emissiveColor=Color3.FromHexString(hex);}return m;};
    const plaster=material('warm-white-plaster','#f3efe5'),trim=material('gallery-trim','#e7dfd0'),frameMaterial=material('black-wood-frame','#24221f'),matMaterial=material('conservation-mat','#fffdf7');
    const box=(name,width,height,depth,position,mat,collides=false)=>{const mesh=CreateBox(name,{width,height,depth},scene);mesh.position.copyFromFloats(...position);mesh.material=mat;mesh.checkCollisions=collides;mesh.isPickable=false;mesh.receiveShadows=true;return mesh;};
    box('north-wall',room.size+.2,room.height,.15,[0,room.height/2,half+.075],plaster,true);
    box('south-wall',room.size+.2,room.height,.15,[0,room.height/2,-half-.075],plaster,true);
    box('east-wall',.15,room.height,room.size,[half+.075,room.height/2,0],plaster,true);
    box('west-wall',.15,room.height,room.size,[-half-.075,room.height/2,0],plaster,true);
    box('ceiling',room.size+.2,.1,room.size+.2,[0,room.height+.05,0],plaster);
    for(const sign of [-1,1]){
      box('baseboard-horizontal-'+sign,room.size,.10,.028,[0,.05,sign*(half-.014)],trim);
      box('baseboard-vertical-'+sign,.028,.10,room.size,[sign*(half-.014),.05,0],trim);
    }
    const floorMat=material('pale-oak','#ffffff');floorMat.specularColor=new Color3(.09,.08,.06);
    const grain=new DynamicTexture('oak-grain',{width:1024,height:1024},scene,false),ctx=grain.getContext();
    let seed=137;const random=()=>((seed=Math.imul(1664525,seed)+1013904223|0)>>>0)/4294967296;
    for(let i=0;i<16;i++){
      const light=70+random()*5;ctx.fillStyle=`hsl(34 23% ${light}%)`;ctx.fillRect(i*64,0,64,1024);
      ctx.fillStyle='#8c755839';ctx.fillRect(i*64,0,1,1024);
      for(let j=0;j<35;j++){ctx.strokeStyle=`rgba(104,78,40,${random()*.08})`;ctx.lineWidth=.5;ctx.beginPath();const x=i*64+random()*64,y=random()*1024;ctx.moveTo(x,y);ctx.lineTo(x+(random()-.5)*3,y+60+random()*220);ctx.stroke();}
      for(let j=0;j<4;j++){ctx.fillStyle='#8c75582a';ctx.fillRect(i*64,((i%3)*83+j*256)%1024,64,1);}
    }
    grain.update();grain.uScale=1;grain.vScale=1;floorMat.diffuseTexture=grain;
    const floor=CreateGround('oak-floor',{width:room.size,height:room.size},scene);floor.material=floorMat;floor.checkCollisions=true;floor.receiveShadows=true;floor.isPickable=false;
    const glow=material('ceiling-light','#fff6dc',true),fixture=material('light-fixture','#d7cebe');
    for(const sign of [-1,1]){
      box('track-horizontal-'+sign,room.size-1.1,.04,.075,[0,room.height-.11,sign*(half-.7)],fixture);
      box('light-horizontal-'+sign,room.size-1.15,.015,.055,[0,room.height-.139,sign*(half-.7)],glow);
      box('track-vertical-'+sign,.075,.04,room.size-1.1,[sign*(half-.7),room.height-.11,0],fixture);
      box('light-vertical-'+sign,.055,.015,room.size-1.15,[sign*(half-.7),room.height-.139,0],glow);
    }
    const imageStates=new Map();let readyImages=0,activeLoads=0;
    for(const art of artworks){
      const mount=new TransformNode(art.id,scene);mount.position.set(art.x,art.y,art.z);mount.rotation.y=art.yaw;
      const frame=box(art.id+'-frame',art.width,art.height,.045,[0,0,0],frameMaterial);frame.parent=mount;frame.metadata={artId:art.id};frame.isPickable=true;shadows.addShadowCaster(frame);
      const mat=box(art.id+'-mat',art.width-art.frameWidth*2,art.height-art.frameWidth*2,.004,[0,0,-.025],matMaterial);mat.parent=mount;mat.metadata={artId:art.id};mat.isPickable=true;
      const image=CreatePlane(art.id+'-image',{width:art.imageWidth,height:art.imageHeight},scene);image.parent=mount;image.position.z=-.029;image.metadata={artId:art.id};
      const imageMaterial=material(art.id+'-colors','#ffffff',true);image.material=imageMaterial;
      const texture=new Texture(art.sources[0].src,scene,false,true,Texture.TRILINEAR_SAMPLINGMODE,()=>{readyImages++;root.dataset.loadedImages=String(readyImages);});texture.anisotropicFilteringLevel=8;imageMaterial.diffuseTexture=texture;
      imageStates.set(art.id,{art,material:imageMaterial,width:art.sources[0].width,loading:false,failed:new Set()});
      const labelTexture=new DynamicTexture(art.id+'-label',{width:768,height:192},scene,false),c=labelTexture.getContext();
      c.fillStyle='#f3efe5';c.fillRect(0,0,768,192);c.fillStyle='#574836';c.font='26px Georgia';
      const words=art.title.split(' '),lines=[''];for(const word of words){const last=lines.length-1,next=(lines[last]+' '+word).trim();if(c.measureText(next).width>700&&lines[last])lines.push(word);else lines[last]=next;}
      lines.slice(0,2).forEach((line,i)=>c.fillText(line,24,42+i*34));c.font='19px Arial';c.fillStyle='#a08056';c.fillText('TJ Murphy  ·  Framed fine-art print',24,151);labelTexture.update();
      const labelMat=material(art.id+'-label-material','#ffffff',true);labelMat.diffuseTexture=labelTexture;
      const label=CreatePlane(art.id+'-caption',{width:.28,height:.07},scene);label.parent=mount;label.position.set(-art.width/2+.14,-art.height/2-.075,-.029);label.material=labelMat;label.isPickable=false;
    }
    root.dataset.paintings=String(imageStates.size);root.dataset.walls='4';
    let playing=false,navigating=false,selected=null,contactSince=0,lastLod=0,hadPointerLock=false;
    const held=new Set(),productLink=root.querySelector('[data-room-product]'),map=root.querySelector('[data-room-map-you]');
    function stopMotion(){held.clear();root.querySelectorAll('.is-held').forEach(el=>el.classList.remove('is-held'));camera.cameraDirection.setAll(0);camera.cameraRotation.setAll(0);}
    function pause(){if(navigating)return;playing=false;root.dataset.playing='false';camera.detachControl();stopMotion();if(document.pointerLockElement)document.exitPointerLock();enter.textContent='Continue exploring';pauseButton.textContent='Continue';card.hidden=true;enter.focus({preventScroll:true});}
    function play(lock=true){
      playing=true;root.dataset.playing='true';camera.attachControl(canvas,true);canvas.focus({preventScroll:true});pauseButton.textContent='Controls';
      if(lock&&matchMedia('(pointer:fine)').matches&&canvas.requestPointerLock){try{const pending=canvas.requestPointerLock();pending?.catch(()=>{});}catch{}}
    }
    function remember(art){const position=art&&Math.hypot(camera.position.x-art.x,camera.position.z-art.z)<.7?approachPosition(art,.95):camera.position;try{sessionStorage.setItem('tj-gallery-room-position',JSON.stringify({x:position.x,z:position.z,yaw:camera.rotation.y,pitch:camera.rotation.x}));}catch{}}
    function visit(art){if(!art||navigating)return;navigating=true;remember(art);stopMotion();camera.detachControl();if(document.pointerLockElement)document.exitPointerLock();location.assign('https://tjm.art'+art.href);}
    function showArt(art){
      if(selected?.id===art?.id)return;selected=art;root.dataset.focusedArt=art?.id||'';contactSince=0;crosshair.classList.toggle('is-targeting',!!art);card.hidden=!art||!playing;
      if(!art)return;
      root.querySelector('[data-room-art-title]').textContent=art.title;
      root.querySelector('[data-room-art-size]').textContent=`${art.frameSize.width} × ${art.frameSize.height} in mat / frame · Black frame`;
      productLink.href='https://tjm.art'+art.href;picker.value=art.id;
    }
    function goTo(id){const art=byId.get(id);if(!art)return;stopMotion();const position=approachPosition(art);camera.position.copyFromFloats(position.x,position.y,position.z);camera.setTarget(new Vector3(art.x,art.y,art.z));play(false);showArt(art);}
    function loadDetail(){
      if(activeLoads>=2)return;
      const close=[...imageStates.values()].map(state=>({...state,distance:Math.hypot(camera.position.x-state.art.x,camera.position.z-state.art.z),state})).sort((a,b)=>a.distance-b.distance);
      for(const {art,state,distance} of close){
        if(activeLoads>=2)break;
        const desired=distance<1.7?1920:distance<3?960:320,source=art.sources.find(s=>s.width>=desired)||art.sources.at(-1);
        const downgrade=distance>4&&state.width>320;
        if(state.loading||(!downgrade&&state.width>=source.width)||state.failed.has(source.src))continue;
        state.loading=true;activeLoads++;
        const next=new Texture(source.src,scene,false,true,Texture.TRILINEAR_SAMPLINGMODE,()=>{
          const old=state.material.diffuseTexture;state.material.diffuseTexture=next;state.width=source.width;next.anisotropicFilteringLevel=8;old.dispose();state.loading=false;activeLoads--;
        },()=>{state.failed.add(source.src);state.loading=false;activeLoads--;next.dispose();});
      }
    }
    try{const saved=JSON.parse(sessionStorage.getItem('tj-gallery-room-position'));if(saved&&[saved.x,saved.z,saved.yaw,saved.pitch].every(Number.isFinite)&&Math.abs(saved.x)<half-.21&&Math.abs(saved.z)<half-.21){camera.position.set(saved.x,room.eyeHeight,saved.z);camera.rotation.set(saved.pitch,saved.yaw,0);}}catch{}
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
      camera.position.x=Math.max(-half+.22,Math.min(half-.22,camera.position.x));camera.position.z=Math.max(-half+.22,Math.min(half-.22,camera.position.z));
      map.style.left=`${(camera.position.x/room.size+.5)*100}%`;map.style.top=`${(.5-camera.position.z/room.size)*100}%`;map.style.transform=`translate(-50%,-50%) rotate(${camera.rotation.y}rad)`;
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
    status.textContent='A square room. Six paintings on each wall.';
  }catch(error){
    engine?.dispose();root.dataset.failed='true';root.querySelector('[data-room-error]').hidden=false;root.querySelector('[data-room-index]').open=true;
    enter.hidden=true;status.textContent='Explore the print wall or browse the paintings.';console.error('Gallery room could not start',error);
  }
}
initializeRoom();
