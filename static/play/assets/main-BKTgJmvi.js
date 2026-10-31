import{M as fa,C as Et,R as Nn,S as Ct,a as Ln,G as Ue,b as dt,c as as,T as zn,I as Sa,d as ae,e as Se,B as At,f as Qt,g as di,h as So,A as Sn,i as Mo,V as ze,j,P as je,D as tn,L as ou,E as Au,k as lu,l as oA,m as ti,n as oo,o as Xe,p as Ei,q as Ra,r as mt,s as cu,t as rl,u as ol,O as cr,v as mn,w as Al,F as pi,Q as Rt,x as uu,N as Ia,y as ji,z as ll,H as Wi,J as gu,K as hu,U as ko,W as cl,X as Gn,Y as fu,Z as du,_ as is,$ as pu,a0 as mu,a1 as ul,a2 as ys,a3 as Zt,a4 as Do,a5 as Iu,a6 as Cu,a7 as To,a8 as wn,a9 as gl,aa as Fa,ab as Bu,ac as Na,ad as Ai,ae as hl,af as _o,ag as fl,ah as Eu,ai as yu,aj as Ua,ak as wu,al as dl,am as rt,an as xu,ao as pl,ap as zo,aq as Rn,ar as mi,as as bu,at as Qu,au as vu,av as ha,aw as pa,ax as On,ay as Su,az as ws,aA as xs,aB as AA,aC as lA,aD as Mu,aE as ku,aF as Du,aG as Tu,aH as _u,aI as zu,aJ as Ao,aK as Ru,aL as Fu,aM as Nu,aN as Lu,aO as Gu,aP as Uu,aQ as ml,aR as Yu,aS as Il,aT as qu,aU as Pu,aV as cA}from"./RoundedBoxGeometry-BjLWazPU.js";const Hu=typeof matchMedia<"u"&&matchMedia("(pointer: coarse)").matches;let Xs=Hu?"low":"hd";const Ju={hudName:"SOUP THERMOS"},Ou=t=>new Ln({color:t});function Vu(t){const e=Xs==="low"?16:36,n=new fa({color:13949149,specular:16777215,shininess:60,flatShading:Xs==="low"}),a=Ou(1842206),i=(()=>{const l=document.createElement("canvas");l.width=l.height=64;const u=l.getContext("2d");u.fillStyle="#b3222a",u.fillRect(0,0,64,64),u.fillStyle="rgba(20,30,60,.55)";for(let g=0;g<64;g+=16)u.fillRect(g,0,6,64),u.fillRect(0,g,64,6);u.fillStyle="rgba(240,210,120,.6)";for(let g=8;g<64;g+=16)u.fillRect(g,0,1.5,64),u.fillRect(0,g,64,1.5);const c=new Et(l);return c.wrapS=c.wrapT=Nn,c.repeat.set(3,1),c.colorSpace=Ct,new Ln({map:c})})(),s=new Ue;t.add(s);const r=(l,u,c)=>{const g=new ae(l,u);return g.position.y=c,s.add(g),g};r(new dt(.075,.075,.34,e),n,0),r(new dt(.077,.077,.12,e,1,!0),i,-.02),r(new dt(.078,.078,.025,e),a,-.16),r(new dt(.05,.075,.05,e),a,.195),r(new dt(.045,.045,.04,e,1,!0),n,.24);const o=r(new as(.042,e),new Ln({color:13780251}),.255);o.rotation.x=-Math.PI/2;const A=r(new zn(.05,.012,10,20,Math.PI),a,.02);return A.rotation.set(0,Math.PI/2,Math.PI/2),A.position.x=.085,t}let uA=null;function Cl(t,e,n,a,i=1.2){const s=uA=uA||new(window.AudioContext||window.webkitAudioContext),r=s.currentTime,o=s.createBuffer(1,Math.ceil(s.sampleRate*t),s.sampleRate),A=o.getChannelData(0);for(let g=0;g<A.length;g++)A[g]=(Math.random()*2-1)*Math.pow(1-g/A.length,2);const l=s.createBufferSource(),u=s.createBiquadFilter(),c=s.createGain();l.buffer=o,u.type="bandpass",u.Q.value=i,u.frequency.setValueAtTime(e,r),u.frequency.exponentialRampToValueAtTime(n,r+t),c.gain.value=a,l.connect(u).connect(c).connect(s.destination),l.start(r)}function ju(t){if(!(t&&t()))try{Cl(.32,300,900,.5,2.5)}catch{}}function Wu(t){if(!(t&&t()))try{Cl(.22,1800,400,.45,.8)}catch{}}function Xu(t,e){const n=e>0?Math.sin(Math.PI*(1-e)):0,a=e>0?Math.sin(Math.PI*(1-e)*.5):0;t.position.y+=.085,t.position.x-=.03,t.rotation.x=-1.9*n,t.position.y+=.09*n,t.position.z-=.14*n+.02*a,t.rotation.z=-.15*n}const Bl=.38;function Ku(){const t=new Sa(.075,Xs==="low"?2:3),e=t.attributes.position;for(let n=0;n<e.count;n++){const a=e.getX(n),i=e.getY(n),s=e.getZ(n),r=1+Math.sin(a*38)*Math.sin(i*33)*.07+Math.sin(s*61+a*20)*.03+(s<-.03?(-.03-s)*3:0);e.setXYZ(n,a*r,i*r,s*r)}return t.computeVertexNormals(),new ae(t,new fa({color:14173978,emissive:4854020,specular:16765104,shininess:70}))}const xi=[];let gA=11;const Ke=()=>(gA=gA*16807%2147483647)/2147483647;function Zu(){const t=Xs==="low"?1:2,e=256*t,n=320*t,a=128*t,i=128*t,s=document.createElement("canvas");s.width=e,s.height=n;const r=s.getContext("2d"),o=(50+Ke()*12)*t,A=256,l=[],u=[Ke()*6,Ke()*6,Ke()*6,Ke()*6];for(let I=0;I<A;I++){const y=I/A*6.283;l.push(o*(1+.14*Math.sin(y*3+u[0])+.08*Math.sin(y*5+u[1])+.05*Math.sin(y*9+u[2])+.025*Math.sin(y*17+u[3])+.012*Math.sin(y*31)))}for(let I=0;I<9;I++){const y=Ke()*A|0,Q=(6+Ke()*22)*t,D=3+(Ke()*5|0);for(let v=-D;v<=D;v++)l[(y+v+A)%A]+=Q*Math.cos(v/D*Math.PI/2)**2}const c=I=>{r.beginPath();for(let y=0;y<=A;y++){const Q=y/A*6.283,D=l[y%A]*I,v=a+Math.cos(Q)*D,T=i+Math.sin(Q)*D;y?r.lineTo(v,T):r.moveTo(v,T)}r.closePath()},g=[];for(let I=0,y=3+(Ke()*3|0);I<y;I++){const Q=.55+Ke()*2,D=Math.round(Q/6.283*A)%A;g.push({x:a+Math.cos(Q)*l[D]*.82,y:i+Math.sin(Q)*l[D]*.82,w:(3.2+Ke()*4.8)*t,l:(26+Ke()*120)*t})}const f=(I,y)=>{const Q=Math.min(n-16*t,I.y+I.l),D=I.w+y,v=I.w*.55+y;r.beginPath(),r.moveTo(I.x-D,I.y),r.bezierCurveTo(I.x-D*.9,I.y+(Q-I.y)*.4,I.x-v,Q-6*t,I.x-v,Q),r.arc(I.x,Q+v*.3,v*1.35+y*.2,Math.PI,0,!0),r.lineTo(I.x+v,Q),r.bezierCurveTo(I.x+v,Q-6*t,I.x+D*.9,I.y+(Q-I.y)*.4,I.x+D,I.y),r.closePath()},p=[];for(let I=0;I<16;I++){const y=Ke()*6.283,Q=o*(.95+Ke()*.1),D=o*(1.25+Ke()*.7);p.push([y,Q,D,(1.5+Ke()*3)*t])}const m=[];for(let I=0;I<22;I++){const y=Ke()*6.283,Q=o*(1.25+Ke()*.95);m.push([a+Math.cos(y)*Q,i+Math.sin(y)*Q,(1.2+Ke()*4.5)*t])}const B=(I,y)=>{r.fillStyle=I,c(1+y/o),r.fill(),g.forEach(Q=>{f(Q,y),r.fill()}),p.forEach(([Q,D,v,T])=>{const F=Math.cos(Q),Z=Math.sin(Q),x=-Z,z=F,se=T+y*.6;r.beginPath(),r.moveTo(a+F*D+x*se,i+Z*D+z*se),r.quadraticCurveTo(a+F*(D+v)/2+x*se*.6,i+Z*(D+v)/2+z*se*.6,a+F*v,i+Z*v),r.quadraticCurveTo(a+F*(D+v)/2-x*se*.6,i+Z*(D+v)/2-z*se*.6,a+F*D-x*se,i+Z*D-z*se),r.fill(),r.beginPath(),r.arc(a+F*v,i+Z*v,se*.9,0,6.283),r.fill()}),m.forEach(([Q,D,v])=>{r.beginPath(),r.arc(Q,D,v+y*.5,0,6.283),r.fill()})};B("#7e1d0c",2.2*t),B("#c63d17",0),r.globalCompositeOperation="source-atop";let d=r.createRadialGradient(a,i,o*.1,a,i,o*1.25);d.addColorStop(0,"rgba(150,32,10,.55)"),d.addColorStop(.55,"rgba(200,64,24,0)"),d.addColorStop(1,"rgba(240,120,60,.35)"),r.fillStyle=d,r.fillRect(0,0,e,n),d=r.createRadialGradient(a-o*.3,i-o*.35,2*t,a-o*.1,i-o*.1,o),d.addColorStop(0,"rgba(255,150,80,.75)"),d.addColorStop(1,"rgba(230,90,40,0)"),r.fillStyle=d,r.fillRect(0,0,e,n),r.save(),c(1),r.clip(),r.lineWidth=7*t,r.strokeStyle="rgba(110,22,8,.45)",r.shadowColor="rgba(90,15,5,.6)",r.shadowBlur=8*t,c(1.01),r.stroke(),r.restore(),r.lineCap="round";for(const[I,y,Q]of[[4*t,0,"rgba(255,214,170,.42)"],[2*t,1.4,"rgba(255,235,210,.35)"]]){r.lineWidth=I,r.strokeStyle=Q,r.beginPath();for(let D=0;D<9.5;D+=.12){const v=(3+D*4.6)*t*(1+.08*Math.sin(D*3+y));r.lineTo(a+Math.cos(D+y)*v,i+Math.sin(D+y)*v*.92)}r.stroke()}for(let I=0;I<6;I++){const y=Ke()*6.283,Q=Ke()*o*.6;d=r.createRadialGradient(a+Math.cos(y)*Q,i+Math.sin(y)*Q,0,a+Math.cos(y)*Q,i+Math.sin(y)*Q,(8+Ke()*14)*t),d.addColorStop(0,"rgba(255,190,140,.25)"),d.addColorStop(1,"rgba(255,190,140,0)"),r.fillStyle=d,r.fillRect(0,0,e,n)}r.fillStyle="rgba(255,248,236,.75)";for(let I=0;I<5;I++)r.beginPath(),r.ellipse(a-o*(.2+Ke()*.4),i-o*(.15+Ke()*.45),(4+Ke()*9)*t,(1.2+Ke()*2)*t,-.6+Ke()*.4,0,6.283),r.fill();for(let I=0;I<18;I++){const y=Ke()*6.283,Q=Ke()*o*.85,D=a+Math.cos(y)*Q,v=i+Math.sin(y)*Q,T=(.8+Ke()*2.2)*t;r.fillStyle="rgba(255,170,90,.55)",r.beginPath(),r.arc(D,v,T,0,6.283),r.fill(),r.fillStyle="rgba(255,250,240,.8)",r.beginPath(),r.arc(D-T*.35,v-T*.35,T*.35,0,6.283),r.fill()}g.forEach(I=>{const y=Math.min(n-16*t,I.y+I.l);r.strokeStyle="rgba(255,230,200,.45)",r.lineWidth=1.6*t,r.beginPath(),r.moveTo(I.x-I.w*.35,I.y+4*t),r.lineTo(I.x-I.w*.25,y-2*t),r.stroke(),r.fillStyle="rgba(255,248,236,.8)",r.beginPath(),r.arc(I.x-I.w*.3,y+I.w*.1,1.6*t,0,6.283),r.fill()}),m.forEach(([I,y,Q])=>{Q<2*t||(r.fillStyle="rgba(255,245,230,.75)",r.beginPath(),r.arc(I-Q*.35,y-Q*.35,Q*.3,0,6.283),r.fill())}),r.globalCompositeOperation="source-over";const E=new Et(s);return E.colorSpace=Ct,E.anisotropy=4,E}function $u(){return xi.length<4?(xi.push(Zu()),xi[xi.length-1]):xi[Math.random()*4|0]}const ni={name:"GRAVITY GUN",slot:"Gravity Gun",api:"https://tjm-play-layouts.timothyjosephmurphy.workers.dev"},qt=(t=0,e=0,n=0)=>new j(t,e,n);function eg(t){const e=new Ln({color:3816512,flatShading:!0}),n=new Ln({color:9080468,flatShading:!0}),a=new Se({color:16747038}),i=new Se({color:16765562}),s=(l,u,c,g,f,p=0,m=0)=>{const B=new ae(l,u);return B.position.set(c,g,f),B.rotation.set(p,0,m),t.add(B),B};s(new At(.16,.14,.36),e,0,0,.02),s(new dt(.075,.09,.14,8),n,0,0,-.2,Math.PI/2);for(let l=0;l<3;l++){const u=l/3*Math.PI*2+Math.PI/2;s(new At(.025,.025,.2),n,Math.cos(u)*.075,Math.sin(u)*.075,-.33).rotation.set(Math.sin(u)*.35,-Math.cos(u)*.35,0)}const r=s(new Qt(.045,10,8),i,0,0,-.29),o=s(new zn(.06,.012,6,16),a,0,0,-.27);s(new At(.17,.02,.2),a,0,.08,.04),s(new At(.06,.14,.07),e,0,-.12,.12);const A=new di(new So({map:tg(),color:16751162,transparent:!0,depthWrite:!1,blending:Sn}));return A.scale.set(.3,.3,1),A.position.set(0,0,-.3),t.add(A),t.userData.grav={em:r,ring:o,halo:A,glow:a},t}function tg(){const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,220,150,1)"),n.addColorStop(.4,"rgba(255,140,40,.5)"),n.addColorStop(1,"rgba(255,100,0,0)"),e.fillStyle=n,e.fillRect(0,0,64,64),new Et(t)}function ng(t,e,n,a){const i=t.userData.grav;if(!i)return;const s=1+.12*Math.sin(e*9)+(n?.25:0)+a*.8;i.halo.scale.set(.26*s,.26*s,1),i.ring.rotation.z=e*(n?9:3),i.em.scale.setScalar(.9+.2*Math.sin(e*23)),t.rotation.x+=a*.35,t.position.z+=a*.06}function ag(t){const e=t.volume!=null?t.volume:ni.volume!=null?ni.volume:1,{scene:n,camera:a,paintings:i,say:s,isMuted:r,walkable:o,roomAt:A,gallery:l}=t;let u=null,c=null,g=0,f=null,p=null;const m=[],B=new Mo,d=()=>{const k=new Set;return i.forEach(N=>N.group.traverse(W=>k.add(W))),k},E=()=>{if(u)return u;const k=d();return u=[],n.traverse(N=>{N.isMesh&&!k.has(N)&&N.geometry&&N.geometry.type==="BoxGeometry"&&!(N.material&&N.material.transparent)&&N.visible!==!1&&u.push(N)}),u},I=()=>i.filter(k=>k.state==="wall"&&k.group.visible||k.state==="floor"||k.state==="trolley").flatMap(k=>[k.mesh,k.frame]),y=(k=12)=>{a.updateMatrixWorld(),B.setFromCamera(new ze(0,0),a),B.far=k;const N=B.intersectObjects(I(),!1)[0];return B.far=1/0,N&&N.object.userData.p?N.object.userData.p:N?i.find(W=>W.mesh===N.object||W.frame===N.object):null},Q=(k,N,W,ce,Y)=>{const Qe=qt(W.z,0,-W.x),C=E();B.far=.6;for(const U of[-.48,-.25,0,.25,.48])for(const V of[-.45,0,.45]){const ne=N.clone().addScaledVector(Qe,U*ce).add(qt(0,V*Y,0)).addScaledVector(W,.25);if(B.set(ne,W.clone().negate()),!B.intersectObjects(C,!1).length)return B.far=1/0,!1}B.far=1/0;for(const U of i){if(U===k||U.state!=="wall")continue;const V=U.data;if(qt(V.ix,0,V.iz).dot(W)<.99)continue;const P=V.x-N.x,_e=V.z-N.z,Fe=Math.abs(P*W.x+_e*W.z),ke=Math.abs(P*Qe.x+_e*Qe.z);if(!(Fe>.4)&&ke<(U.w+ce)/2+.05&&Math.abs(V.y-N.y)<(U.h+Y)/2+.02)return!1}return!0},D=k=>{a.updateMatrixWorld(),B.setFromCamera(new ze(0,0),a),B.far=9;const N=B.intersectObjects(E(),!1)[0];if(B.far=1/0,!N||!N.face)return null;const W=N.face.normal.clone().transformDirection(N.object.matrixWorld);if(Math.abs(W.y)>.3||(W.y=0,W.normalize(),W.dot(a.getWorldDirection(qt()))>0))return null;const ce=k.w,Y=k.h,Qe=Math.max(Y/2+.35,Math.min(N.point.y,1.7+Math.max(0,Y/2-.9))),C=qt(N.point.x,Qe,N.point.z).addScaledVector(W,.035);return{pos:C,n:W,ok:Q(k,C,W,ce,Y)}},v=k=>{f&&(n.remove(f),f.traverse(ce=>ce.geometry&&ce.geometry.dispose())),f=new Ue;const N=new ae(new je(k.w,k.h),new Se({color:3211104,transparent:!0,opacity:.32,depthWrite:!1,side:tn})),W=new ou(new Au(new je(k.w,k.h)),new lu({color:3211104}));f.add(N,W),f.userData={m:N,e:W},f.visible=!1,f.renderOrder=9,n.add(f)},T=k=>{k.home||(k.home={x:k.data.x,y:k.data.y,z:k.data.z,ix:k.data.ix,iz:k.data.iz,room:k.data.room,wall:k.data.wall})};function F(k){T(k),k.group.parent&&k.group.parent!==n&&n.attach(k.group);const N=m.findIndex(W=>W.p===k);N>=0&&m.splice(N,1),k.state="held",k.group.visible=!0,c={p:k,t:0,from:k.group.position.clone()},v(k),g=1,he(.5),s("GRABBED · CLICK TO HANG · RIGHT-CLICK TO LAUNCH",2.5)}function Z(){const k=c.p,N=D(k);if(!N||!N.ok)return s(N?"NO ROOM THERE: OVERLAP OR DOORWAY":"AIM AT A WALL",1.6),ie(),!1;const W=k.data;Object.assign(W,{x:N.pos.x,y:N.pos.y,z:N.pos.z,ix:+N.n.x.toFixed(4),iz:+N.n.z.toFixed(4)});const ce=A?A(W.x,W.z):null;return W.room=k.room=ce&&ce.id?ce.id:W.room,W.wall=Math.abs(W.ix)>Math.abs(W.iz)?W.ix>0?"W":"E":W.iz>0?"S":"N",k.group.position.set(W.x,W.y,W.z),k.group.rotation.set(0,Math.atan2(W.ix,W.iz),0),k.state="wall",k.moved=!0,c=null,f&&(f.visible=!1),g=1,he(.9),s("HUNG",1.2),!0}function x(){if(!c)return null;const k=c.p;return c=null,f&&(f.visible=!1),k}function z(k){if(!k){if(k=y(9),!k)return;T(k),k.state="held"}const N=a.getWorldDirection(qt()),W=(c&&c.p===k,k.group.position.clone());m.push({p:k,pos:W,v:N.multiplyScalar(13).add(qt(0,2.2,0)),spin:qt((Math.random()-.5)*6,(Math.random()-.5)*8,(Math.random()-.5)*6),phase:"air"}),k.state="flying",k.moved=!1,c=null,f&&(f.visible=!1),g=1.4,he(1.2),s("LAUNCHED",1)}let se=null;function J(){if(!c)return!1;const k=c.p;return se&&se(k)?(c=null,f&&(f.visible=!1),g=1,he(.6),s("ON THE TROLLEY",1.2),!0):Z()}function oe(){if(c)return J();const k=y(12);return k?(F(k),!0):(s("AIM AT A PAINTING",1.2),!1)}function G(){z(c?c.p:null)}function me(k,N){const W=performance.now()/1e3;if(g=Math.max(0,g-k*4),K(N,!!c),c){const ce=c.p;c.t=Math.min(1,c.t+k*3.5);const Y=a.getWorldDirection(qt()),Qe=a.position.clone().addScaledVector(Y,1.3+Math.max(ce.w,ce.h)*.55);Qe.y-=.1+Math.sin(W*2)*.03,ce.group.position.lerpVectors(c.from,Qe,c.t*c.t*(3-2*c.t)),c.t>=1&&c.from.copy(Qe),ce.group.rotation.set(0,Math.atan2(-Y.x,-Y.z)+Math.sin(W*1.3)*.05,Math.sin(W*1.7)*.03);const C=N?D(ce):null;if(f&&(f.visible=!!C,C)){f.position.copy(C.pos).addScaledVector(C.n,.01),f.rotation.set(0,Math.atan2(C.n.x,C.n.z),0);const U=C.ok?3211104:16724016;f.userData.m.material.color.setHex(U),f.userData.e.material.color.setHex(U)}p=C,N||Ee(ce)}for(let ce=m.length-1;ce>=0;ce--){const Y=m[ce],Qe=Y.p,C=Qe.group,U=Qe.h/2;if(Y.phase==="air"){Y.v.y-=9.8*k;const V=Y.pos.x+Y.v.x*k,ne=Y.pos.z+Y.v.z*k;if(o(V,ne))Y.pos.x=V,Y.pos.z=ne;else{const P=w(Y.pos,Y.v);Y.wall=P,Y.v.set(0,Math.min(0,Y.v.y),0),Y.phase="slide"}Y.pos.y+=Y.v.y*k,C.rotation.x+=Y.spin.x*k,C.rotation.y+=Y.spin.y*k,C.rotation.z+=Y.spin.z*k,Y.pos.y<.05+.02&&(Y.pos.y=.05,Y.phase="floor",Y.v.y=0)}else if(Y.phase==="slide"){Y.v.y-=9.8*k,Y.pos.y=Math.max(U*Math.cos(.2),Y.pos.y+Y.v.y*k);const V=Y.wall||qt(0,0,1);C.rotation.set(-.2,Math.atan2(V.x,V.z),0,"YXZ");const ne=U*Math.sin(.2)+.06,P=Y.pos.clone();P.addScaledVector(V,0),C.position.set(P.x+V.x*ne,Y.pos.y,P.z+V.z*ne),Y.pos.y<=U*Math.cos(.2)+.001&&(Y.phase="rest")}if(Y.phase==="floor"){const V=Math.hypot(Y.v.x,Y.v.z),ne=Math.max(0,V-6*k)/(V||1);Y.v.x*=ne,Y.v.z*=ne;const P=Y.pos.x+Y.v.x*k,_e=Y.pos.z+Y.v.z*k;o(P,_e)?(Y.pos.x=P,Y.pos.z=_e):Y.v.set(0,0,0),C.rotation.set(-Math.PI/2,C.rotation.y,0,"YXZ"),V<.05&&(Y.phase="rest")}Y.phase!=="slide"&&C.position.copy(Y.pos),Y.phase==="rest"&&(Qe.state="floor",m.splice(ce,1))}}function Ee(k){m.push({p:k,pos:k.group.position.clone(),v:qt(0,0,0),spin:qt(),phase:"air"}),k.state="flying",c=null,f&&(f.visible=!1)}function w(k,N){const W=qt(N.x,0,N.z);if(W.lengthSq()<1e-6)return qt(0,0,1);W.normalize(),B.set(qt(k.x,Math.max(.5,k.y),k.z),W),B.far=3;const ce=B.intersectObjects(E(),!1)[0];if(B.far=1/0,ce&&ce.face){const Y=ce.face.normal.clone().transformDirection(ce.object.matrixWorld);if(Y.y=0,Y.lengthSq()>.01)return Y.normalize()}return W.negate()}let X=null,L=null,O=0;function q(){try{return X=X||new(window.AudioContext||window.webkitAudioContext),X.state==="suspended"&&X.resume(),X}catch{return null}}function K(k,N){const W=r&&r();if(!k||W){L&&L.gain.setTargetAtTime(0,X.currentTime,.05);return}const ce=q();if(!ce)return;if(!L){L=ce.createGain(),L.gain.value=0,L.connect(ce.destination);for(const[Qe,C,U]of[[58,"sine",.05],[117,"sine",.018],[176,"sine",.006]]){const V=ce.createOscillator(),ne=ce.createGain(),P=ce.createBiquadFilter();P.type="lowpass",P.frequency.value=260,V.type=C,V.frequency.value=Qe,ne.gain.value=U,V.connect(P).connect(ne).connect(L),V.start()}}L.gain.setTargetAtTime((N?.3:.14)*e,ce.currentTime,.08);const Y=ce.currentTime;Y-O>(N?.35:1.4)&&Math.random()<(N?.3:.08)&&(O=Y,re(.03+Math.random()*.03,1800+Math.random()*1200,(N?.022:.01)*e))}function re(k,N,W){const ce=q();if(!ce||r&&r())return;const Y=ce.createBuffer(1,Math.ceil(ce.sampleRate*k),ce.sampleRate),Qe=Y.getChannelData(0);for(let ne=0;ne<Qe.length;ne++)Qe[ne]=(Math.random()*2-1)*(Math.random()<.3?1:.2);const C=ce.createBufferSource(),U=ce.createBiquadFilter(),V=ce.createGain();U.type="bandpass",U.frequency.value=N,U.Q.value=.9,V.gain.value=W,C.buffer=Y,C.connect(U).connect(V).connect(ce.destination),C.start()}function he(k){re(.08*k+.04,1200,.05*k*e);const N=q();if(!N||r&&r())return;const W=N.createOscillator(),ce=N.createGain(),Y=N.currentTime;W.type="sine",W.frequency.setValueAtTime(220,Y),W.frequency.exponentialRampToValueAtTime(70,Y+.25),ce.gain.setValueAtTime(.025*k*e,Y),ce.gain.exponentialRampToValueAtTime(.001,Y+.3),W.connect(ce).connect(N.destination),W.start(Y),W.stop(Y+.32)}function ie(){re(.14,380,.04*e)}const pe=()=>{const k={};return i.forEach(N=>{if(N.moved&&N.state==="wall"){const W=N.data;k[W.id]={x:+W.x.toFixed(3),y:+W.y.toFixed(3),z:+W.z.toFixed(3),ix:W.ix,iz:W.iz,room:W.room,wall:W.wall}}}),{v:1,gallery:l,moves:k}};function ye(k){let N=0;const W=k&&k.moves||{};for(const ce in W){const Y=i.find(C=>C.data.id===ce),Qe=W[ce];!Y||Y.state!=="wall"||![Qe.x,Qe.y,Qe.z,Qe.ix,Qe.iz].every(Number.isFinite)||(T(Y),Object.assign(Y.data,{x:Qe.x,y:Qe.y,z:Qe.z,ix:Qe.ix,iz:Qe.iz,room:Qe.room||Y.data.room,wall:Qe.wall||Y.data.wall}),Y.room=Y.data.room,Y.group.position.set(Qe.x,Qe.y,Qe.z),Y.group.rotation.set(0,Math.atan2(Qe.ix,Qe.iz),0),Y.moved=!0,N++)}return N}const b=new URLSearchParams(location.search).get("key"),M=k=>{const N=new Date;return isNaN(N)?"":N.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})},_=k=>{const N=new Date(k);return isNaN(N)?"":N.toLocaleString([],{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})};let ge=null,te=null;const fe=()=>{ge&&(ge.textContent=te&&te.saved?`Last saved: ${_(te.saved)}, ${te.n} move${te.n===1?"":"s"}`:"Last saved: never (default hanging)")},Be=(k,N,W,ce=4e3)=>{const Y=document.getElementById(k);Y&&(clearTimeout(Y._t),Y.textContent=N,W&&(Y.style.background=W),ce&&(Y._t=setTimeout(()=>{Y.textContent=Y.dataset.label,Y.style.background=Y.dataset.bg},ce)))};async function be(){try{const k=await fetch(`${ni.api}/layout/${l}`,{cache:"no-store"});if(!k.ok)return 0;const N=await k.json();return Me=ye(N),te=N.saved?{saved:N.saved,n:Object.keys(N.moves||{}).length}:null,fe(),Me}catch{return 0}finally{qe=!0}}let qe=!1,Me=0;async function we(){if(!b)return{ok:!1};Be("saveLayout","Saving…",null,0);const k=JSON.stringify(pe()),N=Object.keys(JSON.parse(k).moves).length;let W=null;try{W=await fetch(`${ni.api}/layout/${l}`,{method:"PUT",headers:{"content-type":"application/json","x-key":b},body:k})}catch{}const ce=!!(W&&W.ok);return ce&&(te={saved:new Date().toISOString(),n:N},fe()),Be("saveLayout",ce?`✓ Saved (${N} painting${N===1?"":"s"} moved) at ${M()}`:`Save failed${W?" ("+W.status+")":""}`,ce?"#1f8f4a":"#b3261e"),s(ce?"LAYOUT SAVED ("+N+" MOVED)":"SAVE FAILED",3),{ok:ce,status:W?W.status:0}}async function it(){if(!b)return{ok:!1};Be("resetLayout","Resetting…",null,0);let k=null;try{k=await fetch(`${ni.api}/layout/${l}`,{method:"DELETE",headers:{"x-key":b}})}catch{}const N=!!(k&&k.ok);return N&&(te=null,fe()),Be("resetLayout",N?`✓ Reset to default at ${M()} · reloading…`:`Reset failed${k?" ("+k.status+")":""}`,N?"#1f8f4a":"#b3261e"),s(N?"RESET TO DEFAULT · RELOADING":"RESET FAILED",3),N&&!t.noReload&&setTimeout(()=>location.reload(),2200),{ok:N,status:k?k.status:0}}if(b){const k=document.createElement("div");k.id="tjlayout",k.style.cssText="position:fixed;top:58px;right:10px;z-index:2147483000;display:flex;flex-direction:column;align-items:flex-end;gap:6px;font:700 13px system-ui,sans-serif;pointer-events:auto";const N=document.createElement("div");N.style.cssText="display:flex;gap:8px",k.appendChild(N);for(const[W,ce,Y,Qe]of[["saveLayout","SAVE LAYOUT",we,"#1f8f4a"],["resetLayout","RESET TO DEFAULT",()=>confirm("Reset this gallery to the default hanging?")&&it(),"#a3352a"]]){const C=document.createElement("button");C.id=W,C.type="button",C.textContent=ce,C.dataset.label=ce,C.dataset.bg=Qe,C.style.cssText=`background:${Qe};color:#fff;border:0;border-radius:8px;padding:9px 12px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.5)`,["mousedown","touchstart","pointerdown","click"].forEach(U=>C.addEventListener(U,V=>{V.stopPropagation(),(U==="click"||U==="touchstart")&&(V.preventDefault(),Y())},{passive:!1})),N.appendChild(C)}ge=document.createElement("div"),ge.id="layoutStatus",ge.style.cssText="background:rgba(0,0,0,.72);color:#f2e4c4;border-radius:6px;padding:4px 8px;font:600 12px system-ui,sans-serif",fe(),k.appendChild(ge),document.body.appendChild(k)}return{primary:oe,secondary:G,update:me,grab:F,hang:Z,place:J,drop:x,launch:z,get dropHook(){return se},set dropHook(k){se=k},save:we,reset:it,load:be,apply:ye,serialize:pe,aimPainting:y,placement:D,fits:Q,get held(){return c?c.p:null},get preview(){return p},get flying(){return m.length},get loaded(){return qe},get applied(){return Me},get hasKey(){return!!b},get lastSaved(){return te},get kick(){return g}}}const ig="ef8c2252b76eb3b6129f-7a07079bab1427379910",sg={"archived-painting-1":{pr:{id:"print-archived-painting-1-full-frame-black",a:"99.00",in:[18.21,8],win:[14.21,4],img:[13.96,3.37],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-1-full",baseA:"50.00"}},"archived-painting-133":{pr:{id:"print-archived-painting-133-full-frame-black",a:"233.00",in:[16.81,26.03],win:[13.81,23.03],img:[13.56,22.77],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-133-full",baseA:"130.00"}},"archived-painting-15":{p:"1000.00",pr:{id:"print-archived-painting-15-full-frame-black",a:"211.00",in:[26.95,14.52],win:[23.95,11.52],img:[23.69,11.27],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-15-full",baseA:"110.00"}},"archived-painting-18":{pr:{id:"print-archived-painting-18-full-frame-black",a:"226.00",in:[27.75,15.28],win:[24.75,12.28],img:[24.5,12.03],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-18-full",baseA:"125.00"}},"archived-painting-19":{pr:{id:"print-archived-painting-19-full-frame-black",a:"228.00",in:[28.03,15.45],win:[25.03,12.45],img:[24.78,12.2],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-19-full",baseA:"130.00"}},"archived-painting-193":{pr:{id:"print-archived-painting-193-full-frame-black",a:"253.00",in:[21.01,22.66],win:[18.01,19.66],img:[17.75,19.41],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-193-full",baseA:"145.00"}},"archived-painting-2":{pr:{id:"print-archived-painting-2-full-frame-black",a:"99.00",in:[18.22,8],win:[14.22,4],img:[13.97,3.56],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-2-full",baseA:"50.00"}},"archived-painting-20":{pr:{id:"print-archived-painting-20-full-frame-black",a:"228.00",in:[27.91,15.44],win:[24.91,12.44],img:[24.64,12.19],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-20-full",baseA:"130.00"}},"archived-painting-217":{pr:{id:"print-archived-painting-217-full-frame-black",a:"163.00",in:[10.9,27.57],win:[7.9,24.57],img:[7.65,24.3],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-217-full",baseA:"85.00"}},"archived-painting-22":{p:"1000.00",pr:{id:"print-archived-painting-22-full-frame-black",a:"198.00",in:[26.19,14.26],win:[23.19,11.26],img:[22.93,11.01],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-22-full",baseA:"105.00"}},"archived-painting-226":{pr:{id:"print-archived-painting-226-full-frame-black",a:"290.00",in:[27.35,20.19],win:[24.35,17.19],img:[24.1,16.94],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-226-full",baseA:"170.00"}},"archived-painting-233":{pr:{id:"print-archived-painting-233-full-frame-black",a:"151.00",in:[14.62,19.25],win:[11.62,16.25],img:[11.37,15.99],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-233-full",baseA:"75.00"}},"archived-painting-241":{pr:{id:"print-archived-painting-241-full-frame-black",a:"325.00",in:[27.81,21.96],win:[24.81,18.96],img:[24.56,18.7],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-241-full",baseA:"195.00"}},"archived-painting-246":{p:"500.00",pr:{id:"print-archived-painting-246-full-frame-black",a:"241.00",in:[16.75,27.11],win:[13.75,24.11],img:[13.5,23.86],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-246-full",baseA:"135.00"}},"archived-painting-247":{p:"500.00",pr:{id:"print-archived-painting-247-full-frame-black",a:"254.00",in:[18.25,26.37],win:[15.25,23.37],img:[14.99,23.12],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-247-full",baseA:"145.00"}},"archived-painting-248":{p:"500.00",pr:{id:"print-archived-painting-248-full-frame-black",a:"242.00",in:[17.25,26.86],win:[14.25,23.86],img:[14,23.61],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-248-full",baseA:"140.00"}},"archived-painting-249":{p:"500.00",pr:{id:"print-archived-painting-249-full-frame-black",a:"234.00",in:[16.09,27.25],win:[13.09,24.25],img:[12.84,23.98],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-249-full",baseA:"130.00"}},"archived-painting-301":{p:"600.00",pr:{id:"print-archived-painting-301-full-frame-black",a:"269.00",in:[21.98,23.17],win:[18.98,20.17],img:[18.72,19.92],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-301-full",baseA:"155.00"}},"archived-painting-307":{pr:{id:"print-archived-painting-307-full-frame-black",a:"277.00",in:[26.02,20.3],win:[23.02,17.3],img:[22.77,17.05],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-307-full",baseA:"165.00"}},"archived-painting-308":{pr:{id:"print-archived-painting-308-full-frame-black",a:"188.00",in:[16.83,21.16],win:[13.83,18.16],img:[13.58,17.9],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-308-full",baseA:"105.00"}},"archived-painting-354":{pr:{id:"print-archived-painting-354-full-frame-black",a:"309.00",in:[21.05,27.55],win:[18.05,24.55],img:[17.8,24.29],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-354-full",baseA:"180.00"}},"archived-painting-362":{pr:{id:"print-archived-painting-362-full-frame-black",a:"174.00",in:[20.7,15.69],win:[17.7,12.69],img:[17.44,12.44],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-362-full",baseA:"95.00"}},"archived-painting-363":{pr:{id:"print-archived-painting-363-full-frame-black",a:"159.00",in:[15.21,19.58],win:[12.21,16.58],img:[11.96,16.32],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-363-full",baseA:"85.00"}},"archived-painting-364":{pr:{id:"print-archived-painting-364-full-frame-black",a:"160.00",in:[19.68,15.33],win:[16.68,12.33],img:[16.43,12.08],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-364-full",baseA:"85.00"}},"archived-painting-366":{pr:{id:"print-archived-painting-366-full-frame-black",a:"167.00",in:[15.41,20.29],win:[12.41,17.29],img:[12.15,17.04],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-366-full",baseA:"85.00"}},"archived-painting-367":{pr:{id:"print-archived-painting-367-full-frame-black",a:"160.00",in:[15.26,19.76],win:[12.26,16.76],img:[12.01,16.5],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-367-full",baseA:"85.00"}},"archived-painting-368":{pr:{id:"print-archived-painting-368-full-frame-black",a:"160.00",in:[15.49,19.52],win:[12.49,16.52],img:[12.24,16.26],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-368-full",baseA:"85.00"}},"archived-painting-369":{pr:{id:"print-archived-painting-369-full-frame-black",a:"167.00",in:[20.15,15.49],win:[17.15,12.49],img:[16.9,12.24],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-369-full",baseA:"85.00"}},"archived-painting-370":{pr:{id:"print-archived-painting-370-full-frame-black",a:"188.00",in:[21.21,16.75],win:[18.21,13.75],img:[17.95,13.5],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-370-full",baseA:"105.00"}},"archived-painting-371":{pr:{id:"print-archived-painting-371-full-frame-black",a:"158.00",in:[19.3,15.02],win:[16.3,12.02],img:[16.04,11.77],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-371-full",baseA:"80.00"}},"archived-painting-373":{pr:{id:"print-archived-painting-373-full-frame-black",a:"159.00",in:[15.18,19.71],win:[12.18,16.71],img:[11.93,16.45],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-373-full",baseA:"85.00"}},"archived-painting-375":{pr:{id:"print-archived-painting-375-full-frame-black",a:"174.00",in:[16,20.17],win:[13,17.17],img:[12.75,16.92],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-375-full",baseA:"90.00"}},"archived-painting-385":{pr:{id:"print-archived-painting-385-full-frame-black",a:"158.00",in:[14.97,19.25],win:[11.97,16.25],img:[11.72,15.99],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-385-full",baseA:"80.00"}},"archived-painting-386":{pr:{id:"print-archived-painting-386-full-frame-black",a:"159.00",in:[15.24,19.6],win:[12.24,16.6],img:[11.99,16.34],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-386-full",baseA:"85.00"}},"archived-painting-387":{pr:{id:"print-archived-painting-387-full-frame-black",a:"151.00",in:[14.82,18.92],win:[11.82,15.92],img:[11.57,15.67],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-387-full",baseA:"75.00"}},"archived-painting-389":{pr:{id:"print-archived-painting-389-full-frame-black",a:"159.00",in:[15.28,19.4],win:[12.28,16.4],img:[12.03,16.15],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-389-full",baseA:"85.00"}},"archived-painting-390":{pr:{id:"print-archived-painting-390-full-frame-black",a:"159.00",in:[15.06,19.75],win:[12.06,16.75],img:[11.81,16.5],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-390-full",baseA:"85.00"}},"archived-painting-4":{pr:{id:"print-archived-painting-4-full-frame-black",a:"98.00",in:[18.01,8],win:[14.01,4],img:[13.76,3.18],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-4-full",baseA:"50.00"}},"archived-painting-412":{pr:{id:"print-archived-painting-412-full-frame-black",a:"167.00",in:[20.12,15.45],win:[17.12,12.45],img:[16.86,12.2],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-412-full",baseA:"85.00"}},"archived-painting-416":{pr:{id:"print-archived-painting-416-full-frame-black",a:"192.00",in:[24.45,14.96],win:[21.45,11.96],img:[21.2,11.71],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-416-full",baseA:"105.00"}},"archived-painting-433":{p:"500.00",pr:{id:"print-archived-painting-433-full-frame-black",a:"189.00",in:[24.34,14.66],win:[21.34,11.66],img:[21.09,11.4],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-433-full",baseA:"100.00"}},"archived-painting-436":{p:"500.00",pr:{id:"print-archived-painting-436-full-frame-black",a:"176.00",in:[14.4,23.42],win:[11.4,20.42],img:[11.14,20.17],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-436-full",baseA:"95.00"}},"archived-painting-437":{p:"500.00",pr:{id:"print-archived-painting-437-full-frame-black",a:"191.00",in:[24.31,14.76],win:[21.31,11.76],img:[21.04,11.51],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-437-full",baseA:"105.00"}},"archived-painting-438":{p:"500.00",pr:{id:"print-archived-painting-438-full-frame-black",a:"197.00",in:[24.59,15.17],win:[21.59,12.17],img:[21.33,11.92],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-438-full",baseA:"105.00"}},"archived-painting-53":{pr:{id:"print-archived-painting-53-full-frame-black",a:"255.00",in:[16.58,28.83],win:[13.58,25.83],img:[13.33,25.56],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-53-full",baseA:"140.00"}},"archived-painting-62":{pr:{id:"print-archived-painting-62-full-frame-black",a:"277.00",in:[22,24.02],win:[19,21.02],img:[18.74,20.77],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-62-full",baseA:"165.00"}},"archived-painting-66":{p:"600.00",pr:{id:"print-archived-painting-66-full-frame-black",a:"261.00",in:[24.2,20.49],win:[21.2,17.49],img:[20.94,17.24],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-66-full",baseA:"155.00"}},"archived-painting-73":{pr:{id:"print-archived-painting-73-full-frame-black",a:"249.00",in:[17.82,26.6],win:[14.82,23.6],img:[14.57,23.35],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-73-full",baseA:"140.00"}},"archived-painting-75":{pr:{id:"print-archived-painting-75-full-frame-black",a:"209.00",in:[16.82,23.14],win:[13.82,20.14],img:[13.57,19.89],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-75-full",baseA:"115.00"}},"archived-painting-76":{pr:{id:"print-archived-painting-76-full-frame-black",a:"209.00",in:[17.35,22.56],win:[14.35,19.56],img:[14.1,19.3],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-76-full",baseA:"115.00"}},"archived-painting-90":{pr:{id:"print-archived-painting-90-full-frame-black",a:"191.00",in:[15.07,23.97],win:[12.07,20.97],img:[11.82,20.71],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-90-full",baseA:"105.00"}},"archived-painting-img-1555":{pr:{id:"print-archived-painting-img-1555-full-frame-black",a:"211.00",in:[21.83,18.26],win:[18.83,15.26],img:[18.57,15.01],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-img-1555-full",baseA:"120.00"}},"archived-painting-img-1608":{pr:{id:"print-archived-painting-img-1608-full-frame-black",a:"204.00",in:[15.28,24.72],win:[12.28,21.72],img:[12.03,21.46],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-img-1608-full",baseA:"105.00"}},"archived-painting-img-1612":{pr:{id:"print-archived-painting-img-1612-full-frame-black",a:"189.00",in:[14.83,24.02],win:[11.83,21.02],img:[11.58,20.75],frame:"Black",color:"#262321",size:"Large print",base:"print-archived-painting-img-1612-full",baseA:"100.00"}},"book-art-029f45a5fbfd6c90212e":{pr:{id:"print-book-art-029f45a5fbfd6c90212e-full-frame-black",a:"107.00",in:[11.2,17.58],win:[8.2,14.58],img:[7.95,14.32],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-029f45a5fbfd6c90212e-full",baseA:"50.00"}},"book-art-0ee2717bc04e65d0507e":{pr:{id:"print-book-art-0ee2717bc04e65d0507e-full-frame-black",a:"105.00",in:[13.31,14.31],win:[10.31,11.31],img:[10.06,11.05],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-0ee2717bc04e65d0507e-full",baseA:"50.00"}},"book-art-0f696788184bbba1d236":{pr:{id:"print-book-art-0f696788184bbba1d236-full-frame-black",a:"62.63",in:[8.01,10.6],win:[4.49,7.08],img:[4.24,6.82],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-0f696788184bbba1d236-full",baseA:"25.00"}},"book-art-1143b08e177333e43dc7":{pr:{id:"print-book-art-1143b08e177333e43dc7-full-frame-black",a:"80.00",in:[10.98,12.43],win:[7.98,9.43],img:[7.73,9.18],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-1143b08e177333e43dc7-full",baseA:"30.00"}},"book-art-14d2876a55c720cbc908":{pr:{id:"print-book-art-14d2876a55c720cbc908-full-frame-black",a:"105.00",in:[15.8,12.12],win:[12.8,9.12],img:[12.54,8.87],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-14d2876a55c720cbc908-full",baseA:"50.00"}},"book-art-27fee33e69f262ecfacb":{pr:{id:"print-book-art-27fee33e69f262ecfacb-full-frame-black",a:"120.00",in:[13.33,16.52],win:[10.33,13.52],img:[10.07,13.27],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-27fee33e69f262ecfacb-full",baseA:"60.00"}},"book-art-28bec44600b36ed0766f":{pr:{id:"print-book-art-28bec44600b36ed0766f-full-frame-black",a:"73.00",in:[10.6,12.3],win:[7.6,9.3],img:[7.35,9.05],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-28bec44600b36ed0766f-full",baseA:"30.00"}},"book-art-3a9cba708a8045364e82":{pr:{id:"print-book-art-3a9cba708a8045364e82-full-frame-black",a:"87.00",in:[15.11,9.55],win:[12.11,6.55],img:[11.86,6.29],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-3a9cba708a8045364e82-full",baseA:"40.00"}},"book-art-44161b6b117af79e3df4":{pr:{id:"print-book-art-44161b6b117af79e3df4-full-frame-black",a:"83.00",in:[11.89,12.85],win:[8.89,9.85],img:[8.64,9.6],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-44161b6b117af79e3df4-full",baseA:"35.00"}},"book-art-466dc684227286c40502":{pr:{id:"print-book-art-466dc684227286c40502-full-frame-black",a:"62.63",in:[8.36,10.83],win:[5.36,7.83],img:[5.11,7.57],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-466dc684227286c40502-full",baseA:"25.00"}},"book-art-471daf14a8bb7883f114":{pr:{id:"print-book-art-471daf14a8bb7883f114-full-frame-black",a:"85.00",in:[14.57,9.33],win:[11.57,6.33],img:[11.31,6.08],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-471daf14a8bb7883f114-full",baseA:"35.00"}},"book-art-4a0bb9cdd6c404c4e77c":{pr:{id:"print-book-art-4a0bb9cdd6c404c4e77c-full-frame-black",a:"61.63",in:[8.05,10.07],win:[5.05,7.07],img:[4.79,6.82],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-4a0bb9cdd6c404c4e77c-full",baseA:"25.00"}},"book-art-4c6fb3817fed4e5a6195":{pr:{id:"print-book-art-4c6fb3817fed4e5a6195-full-frame-black",a:"66.00",in:[11.31,10.28],win:[8.31,7.28],img:[8.05,7.03],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-4c6fb3817fed4e5a6195-full",baseA:"25.00"}},"book-art-504e3fafdacd7c9bbcd0":{pr:{id:"print-book-art-504e3fafdacd7c9bbcd0-full-frame-black",a:"61.63",in:[8,10.07],win:[5,7.07],img:[4.75,6.82],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-504e3fafdacd7c9bbcd0-full",baseA:"25.00"}},"book-art-50a7984f819bec72d1c7":{pr:{id:"print-book-art-50a7984f819bec72d1c7-full-frame-black",a:"81.00",in:[10.85,13.35],win:[7.85,10.35],img:[7.59,10.1],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-50a7984f819bec72d1c7-full",baseA:"35.00"}},"book-art-55829535637cd4974a88":{pr:{id:"print-book-art-55829535637cd4974a88-full-frame-black",a:"60.63",in:[9.24,8],win:[5.94,4.7],img:[5.69,4.45],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-55829535637cd4974a88-full",baseA:"25.00"}},"book-art-596837cb5ff533c620dd":{pr:{id:"print-book-art-596837cb5ff533c620dd-full-frame-black",a:"86.00",in:[9.79,14.54],win:[6.79,11.54],img:[6.54,11.29],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-596837cb5ff533c620dd-full",baseA:"35.00"}},"book-art-616ff8378f27047b4a91":{pr:{id:"print-book-art-616ff8378f27047b4a91-full-frame-black",a:"59.63",in:[8,8.4],win:[4.84,5.24],img:[4.59,4.98],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-616ff8378f27047b4a91-full",baseA:"25.00"}},"book-art-64cfd389b3dbb5cde532":{pr:{id:"print-book-art-64cfd389b3dbb5cde532-full-frame-black",a:"82.00",in:[11.44,12.98],win:[8.44,9.98],img:[8.19,9.72],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-64cfd389b3dbb5cde532-full",baseA:"35.00"}},"book-art-6e6d7ac51608e0b7f10f":{pr:{id:"print-book-art-6e6d7ac51608e0b7f10f-full-frame-black",a:"69.63",in:[8.73,11.98],win:[5.73,8.98],img:[5.48,8.71],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-6e6d7ac51608e0b7f10f-full",baseA:"30.00"}},"book-art-74a736000a32427842b1":{pr:{id:"print-book-art-74a736000a32427842b1-full-frame-black",a:"105.00",in:[14.39,13.18],win:[11.39,10.18],img:[11.14,9.93],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-74a736000a32427842b1-full",baseA:"50.00"}},"book-art-7bce6e3509027d1f7a0b":{pr:{id:"print-book-art-7bce6e3509027d1f7a0b-full-frame-black",a:"94.00",in:[9.33,16.25],win:[6.33,13.25],img:[6.08,13],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-7bce6e3509027d1f7a0b-full",baseA:"45.00"}},"book-art-87cf2a732259b313f5ab":{pr:{id:"print-book-art-87cf2a732259b313f5ab-full-frame-black",a:"62.63",in:[8,11.39],win:[4.7,8.09],img:[4.45,7.83],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-87cf2a732259b313f5ab-full",baseA:"25.00"}},"book-art-9209f1fd7d47f373597f":{pr:{id:"print-book-art-9209f1fd7d47f373597f-full-frame-black",a:"76.00",in:[8,14.19],win:[4.82,11.01],img:[4.57,10.76],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-9209f1fd7d47f373597f-full",baseA:"35.00"}},"book-art-94e2edf9a24c90950489":{pr:{id:"print-book-art-94e2edf9a24c90950489-full-frame-black",a:"92.00",in:[15.56,9.27],win:[12.56,6.27],img:[12.31,6.02],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-94e2edf9a24c90950489-full",baseA:"40.00"}},"book-art-9ae261289a3bce952c6f":{pr:{id:"print-book-art-9ae261289a3bce952c6f-full-frame-black",a:"108.00",in:[18.79,9.21],win:[15.79,6.21],img:[15.54,5.96],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-9ae261289a3bce952c6f-full",baseA:"50.00"}},"book-art-a2e53a8418a8d84f3dc5":{pr:{id:"print-book-art-a2e53a8418a8d84f3dc5-full-frame-black",a:"60.63",in:[9.36,8.01],win:[6.08,4.73],img:[5.82,4.48],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-a2e53a8418a8d84f3dc5-full",baseA:"25.00"}},"book-art-a61c71e5de8cc1b71500":{pr:{id:"print-book-art-a61c71e5de8cc1b71500-full-frame-black",a:"78.00",in:[9.7,13.44],win:[6.7,10.44],img:[6.45,10.18],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-a61c71e5de8cc1b71500-full",baseA:"35.00"}},"book-art-a627c7b7d19ace6b3e51":{pr:{id:"print-book-art-a627c7b7d19ace6b3e51-full-frame-black",a:"81.00",in:[11.48,12.58],win:[8.48,9.58],img:[8.22,9.33],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-a627c7b7d19ace6b3e51-full",baseA:"35.00"}},"book-art-c04c7e48687fe35e65f5":{pr:{id:"print-book-art-c04c7e48687fe35e65f5-full-frame-black",a:"59.63",in:[8.01,8.42],win:[4.77,5.18],img:[4.52,4.93],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-c04c7e48687fe35e65f5-full",baseA:"25.00"}},"book-art-c198f09bc8ddad18ed1e":{pr:{id:"print-book-art-c198f09bc8ddad18ed1e-full-frame-black",a:"68.63",in:[11.98,8.01],win:[8.96,4.99],img:[8.69,4.74],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-c198f09bc8ddad18ed1e-full",baseA:"30.00"}},"book-art-c347459aa3f77f7213ae":{pr:{id:"print-book-art-c347459aa3f77f7213ae-full-frame-black",a:"78.00",in:[14.04,9.18],win:[11.04,6.18],img:[10.77,5.93],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-c347459aa3f77f7213ae-full",baseA:"35.00"}},"book-art-d1399111a441ed91feaa":{pr:{id:"print-book-art-d1399111a441ed91feaa-full-frame-black",a:"75.63",in:[8.64,13.06],win:[5.64,10.06],img:[5.39,9.79],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-d1399111a441ed91feaa-full",baseA:"35.00"}},"book-art-db933efcbc4fbe01c841":{pr:{id:"print-book-art-db933efcbc4fbe01c841-full-frame-black",a:"121.00",in:[12.53,17.48],win:[9.53,14.48],img:[9.28,14.23],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-db933efcbc4fbe01c841-full",baseA:"55.00"}},"book-art-deb3358c321671dae1fc":{pr:{id:"print-book-art-deb3358c321671dae1fc-full-frame-black",a:"87.00",in:[9.66,15.09],win:[6.66,12.09],img:[6.41,11.83],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-deb3358c321671dae1fc-full",baseA:"40.00"}},"book-art-deb92de6e72f7b3ce951":{pr:{id:"print-book-art-deb92de6e72f7b3ce951-full-frame-black",a:"62.63",in:[9.3,9.9],win:[6.3,6.9],img:[6.05,6.65],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-deb92de6e72f7b3ce951-full",baseA:"25.00"}},"book-art-e3293c73dbb01f94b39b":{pr:{id:"print-book-art-e3293c73dbb01f94b39b-full-frame-black",a:"60.63",in:[9.09,8],win:[5.57,4.48],img:[5.32,4.22],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-e3293c73dbb01f94b39b-full",baseA:"25.00"}},"book-art-e589c9375e23d1de4748":{pr:{id:"print-book-art-e589c9375e23d1de4748-full-frame-black",a:"76.00",in:[13.25,8.77],win:[10.25,5.77],img:[9.99,5.52],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-e589c9375e23d1de4748-full",baseA:"35.00"}},"book-art-e97329411fa8b273b508":{pr:{id:"print-book-art-e97329411fa8b273b508-full-frame-black",a:"76.00",in:[9.06,12.73],win:[6.06,9.73],img:[5.81,9.47],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-e97329411fa8b273b508-full",baseA:"35.00"}},"book-art-ec22daff29e72f16eb76":{pr:{id:"print-book-art-ec22daff29e72f16eb76-full-frame-black",a:"59.63",in:[8.01,8.69],win:[4.83,5.51],img:[4.58,5.25],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-ec22daff29e72f16eb76-full",baseA:"25.00"}},"book-art-f2025e5a72f4a70866c6":{pr:{id:"print-book-art-f2025e5a72f4a70866c6-full-frame-black",a:"90.00",in:[13.83,11.75],win:[10.83,8.75],img:[10.58,8.5],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-f2025e5a72f4a70866c6-full",baseA:"35.00"}},"book-art-ff6db6906f0ed48ccc3a":{pr:{id:"print-book-art-ff6db6906f0ed48ccc3a-full-frame-black",a:"114.00",in:[16.24,12.96],win:[13.24,9.96],img:[12.98,9.71],frame:"Black",color:"#262321",size:"Large print",base:"print-book-art-ff6db6906f0ed48ccc3a-full",baseA:"55.00"}},"cormorant-presiding-over-sunset-on-puget-sound":{pr:{id:"print-cormorant-presiding-over-sunset-on-puget-sound-full-frame-black",a:"254.00",in:[25.86,18.32],win:[22.86,15.32],img:[22.6,15.07],frame:"Black",color:"#262321",size:"Large print",base:"print-cormorant-presiding-over-sunset-on-puget-sound-full",baseA:"140.00"}},"el-zonte-at-sunrise":{p:"1000.00",pr:{id:"print-el-zonte-at-sunrise-full-frame-black",a:"218.00",in:[15.24,26.85],win:[12.24,23.85],img:[11.99,23.59],frame:"Black",color:"#262321",size:"Large print",base:"print-el-zonte-at-sunrise-full",baseA:"120.00"}},"el-zonte-before-dawn":{p:"1000.00",pr:{id:"print-el-zonte-before-dawn-full-frame-black",a:"228.00",in:[28.39,15.25],win:[25.39,12.25],img:[25.14,12],frame:"Black",color:"#262321",size:"Large print",base:"print-el-zonte-before-dawn-full",baseA:"130.00"}},"honeybadger-and-cub-with-genesis-block":{p:"1200.00",pr:{id:"print-honeybadger-and-cub-with-genesis-block-full-frame-black",a:"268.00",in:[19.3,26.18],win:[16.3,23.18],img:[16.05,22.92],frame:"Black",color:"#262321",size:"Large print",base:"print-honeybadger-and-cub-with-genesis-block-full",baseA:"155.00"}},"hope-the-vermillion-aurora":{p:"2000.00",pr:{id:"print-hope-the-vermillion-aurora-full-frame-black",a:"197.00",in:[25.71,14.48],win:[22.71,11.48],img:[22.45,11.23],frame:"Black",color:"#262321",size:"Large print",base:"print-hope-the-vermillion-aurora-full",baseA:"105.00"}},"meditation-at-denny-blaine":{p:"600.00",pr:{id:"print-meditation-at-denny-blaine-full-frame-black",a:"261.00",in:[19.25,25.56],win:[16.25,22.56],img:[16,22.31],frame:"Black",color:"#262321",size:"Large print",base:"print-meditation-at-denny-blaine-full",baseA:"150.00"}},"older-work-ammous-livera-original-1":{p:"200.00"},"older-work-ammous-livera-original-2":{p:"200.00"},"older-work-beach-sunsets-original-1":{p:"75.00"},"older-work-beach-sunsets-original-2":{p:"75.00"},"older-work-beach-sunsets-original-3":{p:"75.00"},"older-work-bitcoin-voices-original-1":{p:"200.00"},"older-work-bitcoin-voices-original-2":{p:"200.00"},"older-work-bitcoin-voices-original-3":{p:"250.00"},"older-work-bitcoin-voices-original-4":{p:"250.00"},"older-work-fernandez-moran-pysh-original-1":{p:"200.00"},"older-work-fernandez-moran-pysh-original-2":{p:"200.00"},"older-work-fernandez-moran-pysh-original-3":{p:"200.00"},"older-work-figen-pnut-swoll-original-1":{p:"200.00"},"older-work-figen-pnut-swoll-original-2":{p:"200.00"},"older-work-figen-pnut-swoll-original-3":{p:"200.00"},"older-work-forest-triptych-original-1":{p:"250.00"},"older-work-forest-triptych-original-2":{p:"250.00"},"older-work-forest-triptych-original-3":{p:"250.00"},"older-work-hayek-stark-gomez-el-bawab-original-1":{p:"200.00"},"older-work-hayek-stark-gomez-el-bawab-original-2":{p:"200.00"},"older-work-hayek-stark-gomez-el-bawab-original-3":{p:"200.00"},"older-work-hayek-stark-gomez-el-bawab-original-4":{p:"200.00"},"older-work-hummingbird-feeder-190":{p:"75.00",pr:{id:"print-older-work-hummingbird-feeder-190-full-frame-black",a:"61.63",in:[8,9.67],win:[4.36,6.03],img:[4.11,5.77],frame:"Black",color:"#262321",size:"Large print",base:"print-older-work-hummingbird-feeder-190-full",baseA:"25.00"}},"older-work-lake-hillside-color-wheel-original-1":{p:"75.00"},"older-work-lake-hillside-color-wheel-original-2":{p:"75.00"},"older-work-lake-hillside-color-wheel-original-3":{p:"75.00"},"older-work-legend-of-billy-buff-original-1":{p:"200.00"},"older-work-legend-of-billy-buff-original-2":{p:"200.00"},"older-work-mountain-layers-original-1":{p:"75.00"},"older-work-mountain-layers-original-2":{p:"75.00"},"older-work-mountain-layers-original-3":{p:"75.00"},"older-work-mountain-layers-original-4":{p:"75.00"},"older-work-nakamoto-hayek-original-1":{p:"200.00"},"older-work-nakamoto-hayek-original-2":{p:"200.00"},"older-work-pitchers-original-1":{p:"75.00"},"older-work-pitchers-original-2":{p:"75.00"},"older-work-portraits-319-329-original-1":{p:"200.00"},"older-work-portraits-319-329-original-2":{p:"200.00"},"older-work-portraits-319-329-original-3":{p:"200.00"},"older-work-portraits-319-329-original-4":{p:"200.00"},"older-work-provibes-sandwiches-original-1":{p:"250.00"},"older-work-provibes-sandwiches-original-2":{p:"250.00"},"older-work-ridge-strips-unindexed-original-1":{p:"100.00"},"older-work-ridge-strips-unindexed-original-2":{p:"100.00"},"older-work-ridge-strips-unindexed-original-3":{p:"100.00"},"older-work-ridge-strips-unindexed-original-4":{p:"100.00"},"older-work-ridge-strips-unindexed-original-5":{p:"100.00"},"older-work-ridge-strips-unindexed-original-6":{p:"100.00"},"older-work-ridge-strips-unindexed-original-7":{p:"100.00"},"older-work-rochard-martinez-original-1":{p:"200.00"},"older-work-rochard-martinez-original-2":{p:"200.00"},"older-work-rochard-martinez-original-3":{p:"200.00"},"older-work-shore-figures-original-1":{p:"75.00"},"older-work-shore-figures-original-2":{p:"75.00"},"older-work-shore-figures-original-3":{p:"75.00"},"older-work-sunset-ridge-strips-original-1":{p:"100.00"},"older-work-sunset-ridge-strips-original-2":{p:"100.00"},"older-work-sunset-ridge-strips-original-3":{p:"100.00"},"older-work-sunset-ridge-strips-original-4":{p:"100.00"},"older-work-sunset-ridge-strips-original-5":{p:"100.00"},"older-work-sunset-ridge-strips-original-6":{p:"100.00"},"older-work-yakes-todd-dickerson-original-1":{p:"200.00"},"older-work-yakes-todd-dickerson-original-2":{p:"200.00"},"older-work-yakes-todd-dickerson-original-3":{p:"200.00"},"painting-chef-in-white":{p:"400.00"},"painting-clouds-over-water":{p:"200.00"},"painting-couple-in-color":{pr:{id:"print-painting-couple-in-color-full-frame-black",a:"114.00",in:[17.1,12.37],win:[14.1,9.37],img:[13.85,9.11],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-couple-in-color-full",baseA:"55.00"}},"painting-emergence":{p:"1000.00"},"painting-festival-portrait":{pr:{id:"print-painting-festival-portrait-full-frame-black",a:"68.63",in:[8,12.36],win:[4.46,8.82],img:[4.21,8.55],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-festival-portrait-full",baseA:"30.00"}},"painting-figures-in-wheatfield":{pr:{id:"print-painting-figures-in-wheatfield-full-frame-black",a:"62.63",in:[8,10.79],win:[4,6.79],img:[3.53,6.54],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-figures-in-wheatfield-full",baseA:"25.00"}},"painting-golden-coast":{pr:{id:"print-painting-golden-coast-full-frame-black",a:"74.63",in:[8.18,12.46],win:[5.18,9.46],img:[4.93,9.2],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-golden-coast-full",baseA:"30.00"}},"painting-guitarist":{pr:{id:"print-painting-guitarist-full-frame-black",a:"90.00",in:[12.09,13.4],win:[9.09,10.4],img:[8.84,10.15],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-guitarist-full",baseA:"35.00"}},"painting-insect-garden":{p:"1000.00"},"painting-moonlit-water":{p:"500.00",pr:{id:"print-painting-moonlit-water-full-frame-black",a:"153.00",in:[12.69,22.44],win:[9.69,19.44],img:[9.44,19.19],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-moonlit-water-full",baseA:"75.00"}},"painting-phoenix-rising":{pr:{id:"print-painting-phoenix-rising-full-frame-black",a:"68.63",in:[8.01,12.36],win:[4.37,8.72],img:[4.12,8.47],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-phoenix-rising-full",baseA:"30.00"}},"painting-portrait-in-blue-light":{pr:{id:"print-painting-portrait-in-blue-light-full-frame-black",a:"137.00",in:[15.25,16.85],win:[12.25,13.85],img:[11.99,13.6],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-portrait-in-blue-light-full",baseA:"70.00"}},"painting-portrait-in-gold":{p:"200.00",pr:{id:"print-painting-portrait-in-gold-full-frame-black",a:"80.00",in:[11.38,12.03],win:[8.38,9.03],img:[8.13,8.78],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-portrait-in-gold-full",baseA:"30.00"}},"painting-portrait-in-green":{p:"200.00",pr:{id:"print-painting-portrait-in-green-full-frame-black",a:"97.00",in:[12.46,14.3],win:[9.46,11.3],img:[9.21,11.04],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-portrait-in-green-full",baseA:"45.00"}},"painting-portrait-with-cheese":{p:"400.00"},"painting-portrait-with-hat":{pr:{id:"print-painting-portrait-with-hat-full-frame-black",a:"163.00",in:[28.63,10.35],win:[25.63,7.35],img:[25.37,7.1],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-portrait-with-hat-full",baseA:"85.00"}},"painting-red-horizon":{p:"1000.00",pr:{id:"print-painting-red-horizon-full-frame-black",a:"226.00",in:[15.63,26.94],win:[12.63,23.94],img:[12.38,23.68],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-red-horizon-full",baseA:"125.00"}},"painting-shoreline-at-dusk":{p:"1000.00",pr:{id:"print-painting-shoreline-at-dusk-full-frame-black",a:"230.00",in:[28.73,15.3],win:[25.73,12.3],img:[25.48,12.05],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-shoreline-at-dusk-full",baseA:"130.00"}},"painting-studio-figure":{p:"400.00"},"painting-sunflower-woman":{pr:{id:"print-painting-sunflower-woman-full-frame-black",a:"80.00",in:[14.3,9.27],win:[11.3,6.27],img:[11.04,6.02],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-sunflower-woman-full",baseA:"35.00"}},"painting-sunset-silhouette":{pr:{id:"print-painting-sunset-silhouette-full-frame-black",a:"60.63",in:[9.4,8],win:[5.4,4],img:[5.15,2.87],frame:"Black",color:"#262321",size:"Large print",base:"print-painting-sunset-silhouette-full",baseA:"25.00"}},"painting-twin-dragons":{p:"1000.00"},"sunrise-in-el-zonte-large":{p:"2000.00",pr:{id:"print-sunrise-in-el-zonte-large-full-frame-black",a:"269.00",in:[19.7,25.94],win:[16.7,22.94],img:[16.45,22.69],frame:"Black",color:"#262321",size:"Large print",base:"print-sunrise-in-el-zonte-large-full",baseA:"155.00"}},"warszawska-syrenka":{p:"1200.00",pr:{id:"print-warszawska-syrenka-full-frame-black",a:"284.00",in:[19.86,26.98],win:[16.86,23.98],img:[16.61,23.72],frame:"Black",color:"#262321",size:"Large print",base:"print-warszawska-syrenka-full",baseA:"165.00"}}},El={v:ig,shop:sg},bs=.0254,hA=.16,Qs=.11,vs=.46,Ss=.13,Ms=.05,ks=t=>El.shop[t]||null,Tr=t=>"$"+Number(t).toLocaleString("en-US",{minimumFractionDigits:Number(t)%1?2:0,maximumFractionDigits:2});function rg({THREE:t,scene:e,camera:n,paintings:a,boards:i=[],walkable:s,exempt:r,unit:o,rampFloors:A=!1}){const l={previews:[],skipped:[],aim:null,label:null,labelFor:null,built:new Set},u=(w,X,L)=>{const O=document.createElement("canvas");O.width=w,O.height=X,L(O.getContext("2d"),w,X);const q=new t.CanvasTexture(O);return q.colorSpace=t.SRGBColorSpace,q.anisotropy=4,q},c=(w,X,L)=>{const O=new t.Mesh(o,L);return O.scale.set(w,X,1),r&&r(O),O},g=new t.Vector3;function f(w,X=!0){w.group.updateWorldMatrix(!0,!1);const L=new t.Matrix4().copy(w.group.matrixWorld).invert(),O=[],q=(K,re,he)=>{K.updateWorldMatrix(!0,!1);let ie=1e9,pe=-1e9,ye=1e9,b=-1e9,M=1e9;for(const[_,ge]of[[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]])g.set(_,ge,0).applyMatrix4(K.matrixWorld).applyMatrix4(L),ie=Math.min(ie,g.x),pe=Math.max(pe,g.x),ye=Math.min(ye,g.y),b=Math.max(b,g.y),M=Math.min(M,Math.abs(g.z));M<.6&&pe-ie>.01&&O.push([ie,ye,pe,b])};w.group.updateMatrixWorld();for(const K of a)K===w||K.state!=="wall"||K.group.position.distanceTo(w.group.position)>6+K.w/2+w.w/2||(q(K.frame),K.plaque&&q(K.plaque),K.preview&&K.preview.traverse(re=>{re.userData.box&&q(re)}),K.priceBox&&q(K.priceBox));for(const K of i)K.parent&&K.parent.position.distanceTo(w.group.position)<6+K.scale.x/2+w.w/2&&q(K);return w.preview&&w.preview.traverse(K=>{K.userData.box&&q(K)}),X&&(O.push([-w.w/2,-w.h/2,w.w/2,w.h/2],[-Math.min(.4,w.w*.3),w.h/2,Math.min(.4,w.w*.3),w.h/2+.16]),w.plaque?q(w.plaque):O.push([-.14,-w.h/2-.16,.14,-w.h/2])),O}const p=(w,X)=>X.some(L=>w[0]<L[2]+Ms&&w[2]>L[0]-Ms&&w[1]<L[3]+Ms&&w[3]>L[1]-Ms);function m(w,X,L,O){w.group.updateWorldMatrix(!0,!1);const q=w.group.position.y,K=A?[void 0,...[1.6,1.3].map(re=>q-re)]:[void 0];for(const re of[X,L]){let he=!1;for(const ie of K)if([.45,.8,1.2,1.7,2.2].some(pe=>(g.set(re,O,pe).applyMatrix4(w.group.matrixWorld),s(g.x,g.z,ie)))&&(g.set(re,O,-.3).applyMatrix4(w.group.matrixWorld),!s(g.x,g.z,ie))){he=!0;break}if(!he)return!1}return!0}function B(w){return w.group.position.y}function d(w,X,L,O=["r","l","up"],q=null){const K=f(w),re=B(w),he=[];for(const ie of O){if(ie==="up"){for(const ye of[0,.3,-.3,.6,-.6])he.push([ye,w.h/2+.2+L/2]);continue}const pe=ie==="r"?1:-1;for(const ye of[0,.25,.5])for(const b of[0,.3,-.3,.6,-.6])he.push([pe*(w.w/2+hA+X/2+ye),b])}for(const ie of[1,-1])he.push([ie*(.14+hA+X/2),-w.h/2-.07]);for(const ie of[0,.35,-.35])he.push([ie,-w.h/2-.2-L/2]);for(let[ie,pe]of he){if(re+pe-L/2<.4)continue;const b=[ie-X/2,pe-L/2,ie+X/2,pe+L/2];if(!(re+b[3]>3.4)&&!p(b,K)&&(!l.labelPass&&m(w,b[0],b[2],pe)||l.labelPass)&&(!q||q(ie,pe)))return{x:ie,y:pe}}return null}function E(w){l.built.add(w);const X=ks(w.data.slug),L=X&&X.pr;if(!L)return;const O=L.in[0]*bs,q=L.in[1]*bs,K=Math.max(O,.34),re=q+.03+Qs,he=f(w,!1);if(p([-w.w/2+.1,-w.h/2+.1,w.w/2-.1,w.h/2-.1],he)){l.skipped.push(w.data.slug);return}const ie=d(w,Math.max(O,K),re);if(!ie){l.skipped.push(w.data.slug);return}const pe=new t.Group;pe.position.set(ie.x,ie.y+(re/2-q/2),.1),pe.userData.p=w;const ye=c(O,q,new t.MeshBasicMaterial({color:new t.Color(L.color)}));ye.userData.box=1,pe.add(ye);const b=Math.min(.022,O*.06),M=c(O-2*b,q-2*b,new t.MeshBasicMaterial({color:16184558}));M.position.z=.004,pe.add(M);const _=L.img[0]*bs,ge=L.img[1]*bs,te=new t.Mesh(o,w.mesh.material);te.scale.set(_,ge,1),te.position.z=.008,pe.add(te);const fe=c(O+.012,q+.012,new t.MeshBasicMaterial({color:1118481}));fe.position.z=-.004,pe.add(fe);const Be=u(512,Math.round(512*Qs/K),(Me,we,it)=>{Me.fillStyle="rgba(18,16,14,0.92)",Me.fillRect(0,0,we,it),Me.strokeStyle="#d9b46a",Me.lineWidth=4,Me.strokeRect(2,2,we-4,it-4),Me.textAlign="center",Me.textBaseline="middle",Me.fillStyle="#f4e6c8",Me.font=`bold ${Math.round(it*.36)}px Georgia, serif`,Me.fillText(`${L.size} · ${L.frame} frame  ${Tr(L.a)}`,we/2,it*.36,we-24),Me.fillStyle="#b9d9c2",Me.font=`${Math.round(it*.24)}px Arial, sans-serif`,Me.fillText("Scan to add this print to your cart",we/2,it*.74,we-24)}),be=c(K,Qs,new t.MeshBasicMaterial({map:Be,transparent:!0}));be.position.set(0,-q/2-.03-Qs/2,.004),be.userData.box=1,pe.add(be);const qe=c(O+.06,q+.06,new t.MeshBasicMaterial({color:2883434,transparent:!0,opacity:.85}));qe.position.z=-.006,qe.visible=!1,pe.add(qe);for(const Me of[ye,M,te,be])Me.userData.print=w;pe.userData.glow=qe,pe.userData.entry=L,w.preview=pe,w.group.add(pe),l.previews.push(w)}const I=new t.Mesh(o,new t.MeshBasicMaterial({color:2883434,transparent:!0,opacity:.9}));I.visible=!1,r&&r(I);const y={};function Q(w,X){const L=w+X;if(y[L])return y[L];const O=u(512,144,(K,re,he)=>{const ie=w==="sale";K.fillStyle=ie?"rgba(12,40,22,0.94)":"rgba(52,10,10,0.94)",K.fillRect(0,0,re,he),K.strokeStyle=ie?"#3aff7a":"#ff4a3a",K.lineWidth=6,K.strokeRect(3,3,re-6,he-6),K.textAlign="center",K.textBaseline="middle",K.fillStyle=ie?"#d4ffe0":"#ffd6d0",K.font=`bold ${ie?64:54}px Georgia, serif`,K.fillText(X,re/2,ie?62:he/2,re-30),ie&&(K.font="26px Arial, sans-serif",K.fillStyle="#9fe0b4",K.fillText("Original · scan to add to cart",re/2,114,re-30))}),q=c(vs,Ss,new t.MeshBasicMaterial({map:O,transparent:!0,depthTest:!0}));return q.userData.box=1,y[L]=q}function D(w,X){if(l.labelFor===w&&l.kind===X)return;v();const L=ks(w.data.slug),O=X==="sale"?Tr(L.p):"Not for sale";I.material.color.setHex(X==="nfs"?16722458:2883434),I.scale.set(w.w+.07,w.h+.07,1),I.position.set(0,0,.001),w.group.add(I),I.visible=!0;const q=Q(X,O),K=T(),re=(pe,ye)=>{l.labelPass=ye;try{return d(w,vs,Ss,["up","r","l"],pe)}finally{l.labelPass=!1}},he=(pe,ye)=>!K.some(b=>Z(F(w,pe,ye,vs,Ss),b)),ie=re(he,!1)||re(he,!0)||re(null,!0);ie&&(q.position.set(ie.x,ie.y,.07),w.group.add(q),w.priceBox=q,l.label=q),l.labelFor=w,l.kind=X,l.labelSpot=ie}function v(){l.label&&(l.label.parent&&l.label.parent.remove(l.label),l.labelFor&&(l.labelFor.priceBox=null)),l.label=null,l.labelFor=null,l.kind=null,I.parent&&I.parent.remove(I),I.visible=!1}function T(){const w=[];for(const X of document.querySelectorAll("body *")){if(X.tagName==="CANVAS")continue;const L=getComputedStyle(X);if(L.position!=="fixed"&&L.position!=="absolute"||L.display==="none"||L.visibility==="hidden"||+L.opacity==0)continue;const O=X.getBoundingClientRect();O.width<4||O.height<4||O.width>innerWidth*.9||O.height>innerHeight*.9||!X.textContent.trim()&&L.backgroundColor==="rgba(0, 0, 0, 0)"&&L.borderStyle==="none"||w.push([O.left,O.top,O.right,O.bottom])}return w}function F(w,X,L,O,q){let K=1e9,re=-1e9,he=1e9,ie=-1e9;w.group.updateWorldMatrix(!0,!1),n.updateMatrixWorld();for(const[pe,ye]of[[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]]){g.set(X+pe*O,L+ye*q,.07).applyMatrix4(w.group.matrixWorld).project(n);const b=(g.x+1)/2*innerWidth,M=(1-g.y)/2*innerHeight;K=Math.min(K,b),re=Math.max(re,b),he=Math.min(he,M),ie=Math.max(ie,M)}return[K,he,re,ie]}const Z=(w,X)=>w[0]<X[2]+6&&w[2]>X[0]-6&&w[1]<X[3]+6&&w[3]>X[1]-6,x=new t.Raycaster,z=new t.Vector2(0,0);function se(w){n.updateMatrixWorld(),x.setFromCamera(z,n),x.far=30;const X=l.previews.filter(K=>K.preview.visible).flatMap(K=>K.preview.children.filter(re=>re.userData.print)),L=x.intersectObjects([...w,...X],!1)[0];if(!L)return null;if(L.object.userData.print)return{kind:"print",p:L.object.userData.print,entry:L.object.userData.print.preview.userData.entry};const O=L.object.userData.p;if(!O)return null;const q=ks(O.data.slug);return{kind:O.data.status==="available"&&q&&q.p?"sale":"nfs",p:O}}let J=0,oe=0,G=null;function me(w,X,L){if((oe-=w)<=0){oe=.5;const K=n.position;for(const re of a){if(l.built.has(re)||re.state!=="wall")continue;re.group.position.distanceTo(K)<12&&E(re)}}for(const K of l.previews)K.preview.visible=K.state==="wall"&&K.group.visible;if(!X){l.aim&&(l.aim=null,v(),G&&(G.preview.userData.glow.visible=!1,G=null));return}const O=performance.now();if(O-J<80)return;J=O;const q=se(L);if(l.aim=q,G&&(!q||q.p!==G||q.kind!=="print")&&(G.preview.userData.glow.visible=!1,G=null),!q){v();return}if(q.kind==="print"){v(),q.p.preview.userData.glow.visible=!0,G=q.p;return}if(D(q.p,q.kind),l.label&&O-(l.hudT||0)>500){l.hudT=O;const K=l.label.position,re=F(l.labelFor,K.x,K.y,vs,Ss);if(T().some(he=>Z(re,he))){const he=l.labelFor,ie=l.kind;v(),D(he,ie)}}}const Ee={update:me,state:l,get aim(){return l.aim},beamColor:()=>l.aim?l.aim.kind==="nfs"?16719888:4259696:null,hudRects:T,screenRect:F,buildAll:()=>{for(const w of a)!l.built.has(w)&&w.state==="wall"&&E(w);return l.previews.length},obstacles:f,overlaps:p,onWall:m,printAt:w=>{const X=se(w);return X&&X.kind==="print"?X:null},money:Tr,shopEntry:ks,version:El.v};return window.__shopScan=Ee,Ee}const bi={id:"glitter",slot:"Glitter Cannon",hudName:"GLITTER CANNON",fireLabel:"SPRAY",altLabel:"BURST",help:"hold click spray glitter, right-click burst"},Ds={id:"blower",slot:"Leaf Blower",hudName:"LEAF BLOWER",fireLabel:"BLOW",help:"hold click blow"},wt=(t=0,e=0,n=0)=>new j(t,e,n),Ks=[16765498,16727988,3139327,9240378,10116351,15660031,16738877,4029439,16754920,4259784],fA=[14247452,12072474,15245863,9211690,13060127];function Ma(t,e={}){return new Ln({color:t,flatShading:!0,...e})}function dA(){const t=document.createElement("canvas");t.width=128,t.height=4;const e=t.getContext("2d"),n=e.createLinearGradient(0,0,128,0);["#ff3fb4","#ffd23a","#8cff3a","#2fe6ff","#9a5cff","#ff3fb4"].forEach((i,s,r)=>n.addColorStop(s/(r.length-1),i)),e.fillStyle=n,e.fillRect(0,0,128,4);const a=new Et(t);return a.colorSpace=Ct,a.wrapS=Nn,a}function og(){const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,240,255,.6)"),n.addColorStop(1,"rgba(255,200,255,0)"),e.fillStyle=n,e.fillRect(0,0,64,64),e.globalCompositeOperation="lighter",e.fillStyle="rgba(255,255,255,.9)",e.fillRect(30,2,4,60),e.fillRect(2,30,60,4),new Et(t)}function Ag(t){const e=new fa({color:1540234,shininess:60,specular:8965328}),n=new fa({color:14198842,specular:16773312,shininess:70,flatShading:!0}),a=Ma(1909542),i=(c,g,f,p,m,B=0)=>{const d=new ae(c,g);return d.position.set(f,p,m),d.rotation.x=B,t.add(d),d};i(new dt(.072,.082,.3,18),e,0,0,0,Math.PI/2),i(new Qt(.082,18,8,0,Math.PI*2,0,Math.PI/2),e,0,0,.15,Math.PI/2),i(new as(.03,12),new Se({map:dA(),toneMapped:!1}),0,0,.234),i(new zn(.084,.007,5,14),n,0,0,.1),i(new zn(.08,.007,5,14),n,0,0,-.1);const s=i(new dt(.12,.07,.13,12,1,!0),new fa({color:1870484,side:tn,shininess:40,flatShading:!0}),0,0,-.23,Math.PI/2),r=i(new zn(.12,.014,6,24),new Se({map:dA(),color:new Xe(1.6,1.6,1.6)}),0,0,-.295),o=i(new Qt(.07,12,8,0,Math.PI*2,0,Math.PI/2),new fa({color:13627391,transparent:!0,opacity:.35,shininess:120,depthWrite:!1}),0,.07,.03);i(new dt(.072,.072,.02,12),n,0,.07,.03);const A=new Ue;A.position.set(0,.085,.03),t.add(A);const l=new Al(.012,0);for(let c=0;c<22;c++){const g=c*2.4,f=.012+c%5*.009,p=new ae(l,new Se({color:Ks[c%Ks.length],toneMapped:!1}));p.position.set(Math.cos(g)*f,c%4*.008,Math.sin(g)*f),p.rotation.set(c,c*2,0),A.add(p)}i(new At(.05,.12,.06),a,0,-.1,.09,-.25),i(new At(.018,.04,.03),n,0,-.06,.04);const u=new di(new So({map:og(),color:16777215,transparent:!0,depthWrite:!1,blending:Sn,opacity:0}));return u.position.set(0,0,-.32),u.scale.set(.22,.22,1),t.add(u),t.userData.glitter={fill:A,lip:r,flash:u,bell:s,dome:o},t}function lg(t){const e=new fa({color:15770403,shininess:50,flatShading:!0}),n=Ma(2237222),a=Ma(7304314),i=new fa({color:15328472,shininess:30,flatShading:!0}),s=(A,l,u,c,g,f=0,p=0,m=0)=>{const B=new ae(A,l);return B.position.set(u,c,g),B.rotation.set(f,p,m),t.add(B),B};s(new dt(.1,.1,.11,14),e,0,0,.1,0,0,Math.PI/2),s(new At(.1,.1,.16),e,0,0,0);const r=s(new as(.075,14),n,.057,0,.1,0,Math.PI/2,0);for(let A=0;A<3;A++)s(new At(.004,.12-A*.03,.006),a,.06,0,.1+(A-1)*.03);s(new zn(.06,.014,6,12,Math.PI),n,0,.09,.06,0,Math.PI/2,0),s(new dt(.035,.042,.32,10),i,0,-.01,-.22,Math.PI/2),s(new dt(.044,.044,.03,10),n,0,-.01,-.07,Math.PI/2);const o=s(new dt(.03,.035,.08,10),i,0,-.01,-.41,Math.PI/2);return o.scale.set(1.5,1,.6),s(new At(.03,.025,.012),new Se({color:4718474}),.03,.06,.02),t.userData.blower={grille:r,noz:o},t}function cg(t,e=.3){let n=null,a=null,i=null,s=null;const r=c=>(s||(s=c.createGain(),s.gain.value=e,s.connect(c.destination)),s),o={played:0,suppressed:0},A=()=>{if(t())return o.suppressed++,null;try{n=n||new(window.AudioContext||window.webkitAudioContext),n.state==="suspended"&&n.resume()}catch{return null}if(!a){a=n.createBuffer(1,n.sampleRate,n.sampleRate);const c=a.getChannelData(0);for(let g=0;g<c.length;g++)c[g]=Math.random()*2-1}return o.played++,n},l=(c,g,f,p,m,B,d=1)=>{const E=c.currentTime,I=c.createBufferSource(),y=c.createBiquadFilter(),Q=c.createGain();I.buffer=a,I.loop=!0,y.type=f,y.Q.value=d,y.frequency.setValueAtTime(p,E),y.frequency.exponentialRampToValueAtTime(m,E+g),Q.gain.setValueAtTime(B,E),Q.gain.exponentialRampToValueAtTime(8e-4,E+g),I.connect(y).connect(Q).connect(r(c)),I.start(E,Math.random()*.5),I.stop(E+g+.02)},u=(c,g,f,p,m,B="sine",d=0)=>{const E=c.currentTime+d,I=c.createOscillator(),y=c.createGain();I.type=B,I.frequency.setValueAtTime(g,E),I.frequency.exponentialRampToValueAtTime(f,E+p),y.gain.setValueAtTime(1e-4,E),y.gain.linearRampToValueAtTime(m,E+.008),y.gain.exponentialRampToValueAtTime(5e-4,E+p),I.connect(y).connect(r(c)),I.start(E),I.stop(E+p+.02)};return{stats:o,sprinkle(){const c=A();if(c&&(l(c,.12,"highpass",6e3,4e3,.07,.7),Math.random()<.45)){const g=2200+Math.random()*3800;u(c,g,g*1.01,.18,.035)}},burst(){const c=A();c&&(l(c,.18,"lowpass",900,120,.4,.8),l(c,.5,"highpass",7e3,3e3,.08,.6),[0,4,7,12,16].forEach((g,f)=>u(c,1318*Math.pow(2,g/12),1318*Math.pow(2,g/12),.28,.04,"triangle",f*.045)))},swish(c){if(c<.02)return;const g=A();g&&l(g,.16,"bandpass",3200,1800,.12*c,1.4)},whee(){const c=A();c&&(u(c,620,1500,.32,.06,"sine"),u(c,930,2100,.28,.025,"triangle",.02))},blower(c,g){if(c&&t()&&(c=!1),c&&!i){const f=A();if(!f)return;const p=f.currentTime,m=f.createOscillator(),B=f.createOscillator(),d=f.createBiquadFilter(),E=f.createBufferSource(),I=f.createBiquadFilter(),y=f.createGain();m.type="sawtooth",m.frequency.setValueAtTime(60,p),m.frequency.linearRampToValueAtTime(118,p+.35),B.type="square",B.frequency.setValueAtTime(121,p),B.frequency.linearRampToValueAtTime(239,p+.35),d.type="lowpass",d.frequency.value=520;const Q=f.createGain();Q.gain.value=.5,m.connect(d),B.connect(Q).connect(d),E.buffer=a,E.loop=!0,I.type="bandpass",I.frequency.value=1100,I.Q.value=.6,E.connect(I),d.connect(y),I.connect(y),y.gain.setValueAtTime(1e-4,p),y.gain.linearRampToValueAtTime(.12,p+.25),y.connect(r(f)),m.start(p),B.start(p),E.start(p),i={a:f,g:y,nodes:[m,B,E]}}if(!c&&i){const{a:f,g:p,nodes:m}=i,B=f.currentTime;p.gain.cancelScheduledValues(B),p.gain.setValueAtTime(p.gain.value,B),p.gain.linearRampToValueAtTime(1e-4,B+(t()?.02:.25)),m.forEach(d=>d.stop(B+.3)),i=null}},get humming(){return!!i}}}function ug(){return new mt({side:tn,toneMapped:!1,fog:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,uniforms:{uTime:{value:0}},vertexShader:`attribute float aSeed; uniform float uTime; varying vec3 vCol; varying float vGlint, vSheen;
      void main(){
        mat4 m = modelMatrix * instanceMatrix; vec4 c = m * vec4(0., 0., 0., 1.);
        float dist = distance(c.xyz, cameraPosition), grow = 1. + max(0., dist - 2.5) * 0.16;   // far flakes never shrink below ~a pixel
        vec4 wp = m * vec4(position * grow, 1.);
        vec3 n = normalize(mat3(m) * vec3(0., 1., 0.) + 1e-6), v = normalize(cameraPosition - wp.xyz);
        vec3 L = normalize(vec3(sin(uTime * .9 + aSeed * 31.) * 1.6, .9, cos(uTime * .7 + aSeed * 17.) * 1.6));
        float spec = pow(abs(dot(n, normalize(L + v))), 220.);                               // tight: only a few flakes flash at once
        float tw = step(.965, fract(aSeed * 91.7 + uTime * (.35 + aSeed * .8)));           // random twinkle, independent of the light
        vGlint = spec * 1.8 + tw * 1.3; vSheen = .55 + .45 * abs(dot(n, v));
        #ifdef USE_INSTANCING_COLOR
        vCol = instanceColor;
        #else
        vCol = vec3(1.);
        #endif
        gl_Position = projectionMatrix * viewMatrix * wp; }`,fragmentShader:`varying vec3 vCol; varying float vGlint, vSheen;
      void main(){ vec3 base = max(mix(vec3(dot(vCol, vec3(.2126, .7152, .0722))), vCol, 1.35), 0.);  // true colour (not tone mapped), like the paintings
        vec3 col = base * (.7 * vSheen + .2) + mix(base, vec3(1.), .45) * vGlint;
        gl_FragColor = vec4(col, 1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`})}function gg(t){const e=new Ei,n=t/2,a=[0,0,0];for(let s=0;s<6;s++){const r=s/6*Math.PI*2;a.push(Math.cos(r)*n,0,Math.sin(r)*n*.8)}const i=[];for(let s=0;s<6;s++)i.push(0,1+s,1+(s+1)%6);return e.setAttribute("position",new pi(a,3)),e.setIndex(i),e}let ra=null;function hg(){return ra||(ra={handle:new dt(.011,.011,.34,5),head:new dt(.025,.075,.1,7),band:new dt(.028,.028,.018,7),pan:new At(.14,.01,.1),lip:new At(.14,.045,.01),wood:Ma(10119738),straw:Ma(15123546),red:Ma(14170730),panM:Ma(3842264)},ra.handle.translate(0,-.17,0),ra.head.translate(0,-.38,0),ra.band.translate(0,-.335,0),ra.head.scale(1,1,.45),ra)}function fg(t){const e=hg(),n=t.userData.rig,a=new Ue;a.position.set(.16,.06,.07),a.add(new ae(e.handle,e.wood),new ae(e.head,e.straw),new ae(e.band,e.red)),n.body.add(a);const i=new Ue;i.position.set(-.13,-.2,.17),i.add(new ae(e.pan,e.panM));const s=new ae(e.lip,e.panM);return s.position.set(0,.016,-.04),i.add(s),n.body.add(i),t.userData.broom=a,t.userData.pan=i,t}function dg(t){const{scene:e,camera:n}=t;if(!e||!n)throw new Error("installGlitterBlower: scene and camera are required");const a=t.walkable||(()=>!0),i=t.floorH||(()=>0),s=t.say||(()=>{}),r=t.isMuted||(()=>!1),o=t.isBusy||(()=>!1),A=t.isLocked||(()=>!0),l=t.pillars||[],u=t.paintings||[],c=t.phone!=null?!!t.phone:matchMedia("(pointer: coarse)").matches||!!t.low,g=t.cap||(c?1200:3e3),f=c?210:420,p=t.maxElves||(c?2:4),m=t.ceiling||4,B=cg(r,t.volume!=null?t.volume:.3),d=t.vm||[],E=t.firstSlot!=null?t.firstSlot:d.length,I={glitter:E,blower:E+1},y=Ag(new Ue),Q=lg(new Ue);[y,Q].forEach((h,H)=>{h.scale.setScalar(.6),h.rotation.y=.1,h.visible=!1,d[E+H]=h,t.vmScene&&t.vmScene.add(h)});const D=h=>h===I.glitter||h===I.blower,v=t.getWeapon||(()=>-1),T=new oA(gg(c?.034:.028),ug(),g);T.instanceMatrix.setUsage(ti),T.frustumCulled=!1,T.castShadow=T.receiveShadow=!1,T.name="glitter",T.renderOrder=1,T.instanceColor=new oo(new Float32Array(g*3).fill(1),3),T.instanceColor.setUsage(ti);const F=new oo(new Float32Array(g),1);for(let h=0;h<g;h++)F.array[h]=Math.random();T.geometry.setAttribute("aSeed",F);const Z=T.instanceMatrix.array;Z.fill(0),e.add(T),t.exempt&&t.exempt(T);const x=new Float32Array(g*3),z=new Float32Array(g*3),se=new Uint8Array(g),J=new Float32Array(g*4),oe=new Float32Array(g),G=new Float32Array(g);let me=0,Ee=0,w=0,X=0,L=g,O=-1,q=g,K=-1,re=0,he=0;const ie=new Xe,pe=(h,H,$,S)=>{const ee=h*16,le=Math.cos($),ue=Math.sin($),Ie=Math.cos(H),Ce=Math.sin(H);Z[ee]=le*S,Z[ee+1]=0,Z[ee+2]=-ue*S,Z[ee+3]=0,Z[ee+4]=ue*Ce*S,Z[ee+5]=Ie*S,Z[ee+6]=le*Ce*S,Z[ee+7]=0,Z[ee+8]=ue*Ie*S,Z[ee+9]=-Ce*S,Z[ee+10]=le*Ie*S,Z[ee+11]=0,Z[ee+12]=x[h*3],Z[ee+13]=x[h*3+1],Z[ee+14]=x[h*3+2],Z[ee+15]=1,h<L&&(L=h),h>O&&(O=h)},ye=h=>{const H=h*16;for(let $=0;$<16;$++)Z[H+$]=0;h<L&&(L=h),h>O&&(O=h)};function b(h,H,$,S,ee,le){const ue=me;return me=(me+1)%g,se[ue]===1?Ee--:se[ue]===2?w--:se[ue]===3&&X--,se[ue]=1,Ee++,x[ue*3]=h,x[ue*3+1]=H,x[ue*3+2]=$,z[ue*3]=S,z[ue*3+1]=ee,z[ue*3+2]=le,J[ue*4]=Math.random()*6.28,J[ue*4+1]=Math.random()*6.28,J[ue*4+2]=(Math.random()-.5)*30,J[ue*4+3]=(Math.random()-.5)*22,oe[ue]=0,G[ue]=.75+Math.random()*.6,ie.setHex(Ks[Math.random()*Ks.length|0]),Math.random()<.15&&ie.offsetHSL(0,0,.12),T.instanceColor.setXYZ(ue,ie.r,ie.g,ie.b),ue<q&&(q=ue),ue>K&&(K=ue),F.array[ue]=Math.random(),ue}const M=h=>{se[h]=2,Ee--,w++,oe[h]=he,x[h*3+1]=i(x[h*3],x[h*3+2])+.011+Math.random()*.005,pe(h,(Math.random()-.5)*.5,J[h*4],G[h])},_=wt(),ge=wt(),te=wt(),fe=wt();function Be(h=.55){return n.updateMatrixWorld(),n.getWorldDirection(_),ge.set(1,0,0).applyQuaternion(n.quaternion),te.set(0,1,0).applyQuaternion(n.quaternion),fe.copy(n.position).addScaledVector(_,h).addScaledVector(ge,.16).addScaledVector(te,-.13)}function be(h,H,$,S,ee=.6){const le=Be(.5);for(let ue=0;ue<h;ue++){const Ie=Math.random()*6.283,Ce=Math.sqrt(Math.random())*H,Pe=$+Math.random()*(S-$),de=_.x+(ge.x*Math.cos(Ie)+te.x*Math.sin(Ie))*Ce,ve=_.y+(ge.y*Math.cos(Ie)+te.y*Math.sin(Ie))*Ce,Je=_.z+(ge.z*Math.cos(Ie)+te.z*Math.sin(Ie))*Ce;b(le.x+(Math.random()-.5)*.04,le.y+(Math.random()-.5)*.04,le.z+(Math.random()-.5)*.04,de*Pe,ve*Pe+ee,Je*Pe)}}function qe(h,H=.6,$){if(!h)return 0;const S=H*H,ee=$?$.x:h.x,le=$?$.z:h.z;let ue=0;for(let Ie=0;Ie<g;Ie++){const Ce=se[Ie];if(Ce!==2&&!(Ce===1&&x[Ie*3+1]<i(x[Ie*3],x[Ie*3+2])+.35))continue;const Pe=x[Ie*3]-h.x,de=x[Ie*3+2]-h.z;Pe*Pe+de*de>S||(Ce===1?Ee--:w--,se[Ie]=3,X++,oe[Ie]=.25+Math.random()*.3,z[Ie*3]=ee+(Math.random()-.5)*.05,z[Ie*3+2]=le+(Math.random()-.5)*.05,z[Ie*3+1]=oe[Ie],ue++)}return we.swept+=ue,ue}function Me(){for(let h=0;h<g;h++)se[h]=0,ye(h);Ee=w=X=0}const we={sprayed:0,swept:0,blownFlakes:0,elvesSpawned:0,tumbles:0,getups:0},it=c?36:72,k=new Float32Array(it*3),N=new Float32Array(it*3),W=new Float32Array(it);let ce=0;const Y=new Ei;Y.setAttribute("position",new Ra(k,3).setUsage(ti)),Y.setAttribute("aLife",new Ra(W,1).setUsage(ti));const Qe=new mt({transparent:!0,depthWrite:!1,blending:Sn,uniforms:{uScale:{value:400}},vertexShader:"attribute float aLife; uniform float uScale; varying float vA; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.); vA = aLife; gl_PointSize = aLife > 0. ? uScale * (0.2 - aLife * 0.14) / max(0.3, -mv.z) : 0.; gl_Position = projectionMatrix * mv; }",fragmentShader:"varying float vA; void main(){ vec2 q = gl_PointCoord - .5; float d = dot(q, q) * 4.; if (d > 1.) discard; gl_FragColor = vec4(vec3(.75, .88, 1.) * (1. - d) * (1. - d) * vA * .2, 1.); }"}),C=new cu(Y,Qe);C.frustumCulled=!1,C.name="blowerAir",e.add(C);const U=c?10:22,V=new rl;V.moveTo(0,-.05),V.quadraticCurveTo(.035,-.01,0,.05),V.quadraticCurveTo(-.035,-.01,0,-.05);const ne=new ol(V,3);ne.rotateX(-Math.PI/2);const P=new oA(ne,new Ln({side:tn}),U);P.frustumCulled=!1,P.instanceMatrix.setUsage(ti),P.name="blowerLeaves";const _e=Array.from({length:U},(h,H)=>(P.setColorAt(H,ie.setHex(fA[H%fA.length])),{p:wt(),v:wt(),life:0,rx:0,ry:0,sx:0,sy:0}));let Fe=0;const ke=new cr;_e.forEach((h,H)=>{ke.scale.setScalar(0),ke.updateMatrix(),P.setMatrixAt(H,ke.matrix)}),e.add(P);const We=[],$e={add(h){return!h||We.includes(h)?()=>{}:(h.radius=h.radius||.35,h.mass=h.mass||1,h._v=h._v||wt(),We.push(h),()=>$e.remove(h))},remove(h){const H=We.indexOf(h);H>=0&&We.splice(H,1)},get list(){return We.slice()}},Ne=h=>h.getPosition?h.getPosition():h.position||h.object&&h.object.position,Le=[];let Oe=0,pt=0,jt=!1,Wt={g:0,b:0};function Jn(h){let H=null,$=1e9;const S=wt(h.x,0,h.z);for(const ee of u){if(ee.state!=="wall"||!ee.group||!ee.data)continue;const le=ee.group.position,ue=Math.hypot(le.x-S.x,le.z-S.z);if(ue>14||ue>$)continue;const Ie=wt(ee.data.ix,0,ee.data.iz),Ce=wt(Ie.z,0,-Ie.x),Pe=Math.random()<.5?-1:1;for(const de of[.75,1.05]){const ve=wt(le.x,0,le.z).addScaledVector(Ce,Pe*(ee.w/2+.18)).addScaledVector(Ie,de);if(!a(ve.x,ve.z))continue;const Je=wt(le.x,Math.max(.7,le.y-ee.h/2+.12),le.z).addScaledVector(Ce,Pe*(ee.w/2+.16)).addScaledVector(Ie,.22);H={floor:ve,wall:Je,p:ee},$=ue;break}}if(!H)for(let ee=0;ee<12&&!H;ee++){const le=Math.random()*6.28,ue=wt(S.x+Math.cos(le)*2.5,0,S.z+Math.sin(le)*2.5);a(ue.x,ue.z)&&(H={floor:ue,wall:wt(ue.x,i(ue.x,ue.z)+.9,ue.z),p:null})}return H}function Oa(h,H,$){let S=-1,ee=1e18;for(let le=0;le<g;le++){if(se[le]!==2)continue;const ue=x[le*3]-h,Ie=x[le*3+2]-H,Ce=ue*ue+Ie*Ie;Ce>=ee||$&&$(x[le*3],x[le*3+2])||(ee=Ce,S=le)}return S}const ia=h=>(H,$)=>Le.some(S=>S!==h&&S.tgt&&(S.state==="walk"||S.state==="sweep")&&(S.tgt.x-H)**2+(S.tgt.z-$)**2<.8);function ps(){const h=Oa(n.position.x,n.position.z,null);if(h<0||!t.makeElf)return null;const H=Jn({x:x[h*3],z:x[h*3+2]});if(!H)return null;const $=fg(t.makeElf(Math.random()));$.name="sweeperElf",$.scale.setScalar(.05),$.position.copy(H.wall),e.add($);const S={s:$,home:H,state:"emerge",t:0,st:0,pos:H.floor.clone(),v:wt(),vy:0,hop:0,yaw:0,roll:0,axis:wt(1,0,0),quiet:0,stuck:0,tgt:null,strokes:0,ph:Math.random()*6,lastWhee:-9};return S.push={name:"elf",radius:.3,mass:1,getPosition:()=>ms.set(S.pos.x,i(S.pos.x,S.pos.z)+.3+S.hop,S.pos.z),onPush(ee){S.state==="emerge"||S.state==="home"||S.state==="gone"||(S.v.x+=ee.x,S.v.z+=ee.z,S.vy=Math.max(S.vy,Math.min(3.2,S.vy+ee.y)),S.state!=="tumble"&&Math.hypot(S.v.x,S.v.z)>.9&&(S.state="tumble",S.st=0,S.quiet=0,we.tumbles++,he-S.lastWhee>1.2&&(S.lastWhee=he,B.whee())))}},$e.add(S.push),Le.push(S),we.elvesSpawned++,jt||(jt=!0,s("THE ELVES HAVE NOTICED THE GLITTER",2.5)),S}const ms=wt(),tA=new Rt,Is=new Rt;new mn;const nA=wt(0,1,0);function Kc(h,H){h.t+=H,h.st+=H;const $=h.s,S=h.t+h.ph;let ee="idle",le=null;const ue=(de,ve,Je)=>{const gt=de-h.pos.x,Bt=ve-h.pos.z,yt=Math.hypot(gt,Bt);if(yt<1e-4)return 0;const sn=Math.min(yt,Je*H)/yt;let Yt=h.pos.x+gt*sn,cn=h.pos.z+Bt*sn;a(Yt,cn)||(a(Yt,h.pos.z)?cn=h.pos.z:a(h.pos.x,cn)?Yt=h.pos.x:(Yt=h.pos.x,cn=h.pos.z));const ya=Math.hypot(Yt-h.pos.x,cn-h.pos.z);return h.stuck=ya<Je*H*.3?h.stuck+H:0,h.pos.x=Yt,h.pos.z=cn,le=Math.atan2(gt,Bt),yt},Ie=()=>{const de=Oa(h.pos.x,h.pos.z,ia(h)),ve=de<0?Oa(h.pos.x,h.pos.z,null):de;return ve<0?(h.tgt=null,!1):(h.tgt=wt(x[ve*3],0,x[ve*3+2]),!0)};if(h.state==="emerge"){const de=Math.min(1,h.st/1.3);if(ee=de<.45?"peek":"walk",de<.45)$.position.copy(h.home.wall),$.scale.setScalar(Math.max(.05,Math.min(1,h.st/.45)));else{const ve=(de-.45)/.55,Je=i(h.home.floor.x,h.home.floor.z)+.35;$.position.lerpVectors(h.home.wall,ms.set(h.home.floor.x,Je,h.home.floor.z),ve),$.position.y+=Math.sin(ve*Math.PI)*.35,$.scale.setScalar(1)}de>=1&&(h.pos.copy(h.home.floor),h.state=Ie()?"walk":"retreat",h.st=0)}else if(h.state==="walk")ee="walk",(!h.tgt||h.st>.6)&&(h.st=0,Ie()||(h.state="retreat",h.st=0)),h.tgt&&(ue(h.tgt.x,h.tgt.z,1.7)<.28&&(h.state="sweep",h.st=0,h.strokes=0),h.stuck>1.2&&(h.pos.set(h.tgt.x+(Math.random()-.5)*.5,0,h.tgt.z+(Math.random()-.5)*.5),a(h.pos.x,h.pos.z)||h.pos.set(h.tgt.x,0,h.tgt.z),h.stuck=0,h.glitch=.3));else if(h.state==="sweep"){if(ee="scrub",le=h.yaw,h.st>.55){h.st=0,h.strokes++;const ve=Math.sin(h.yaw),Je=Math.cos(h.yaw),gt=ms.set(h.pos.x+ve*.22,0,h.pos.z+Je*.22),Bt=wt(h.pos.x+ve*.12-Je*.1,0,h.pos.z+Je*.12+ve*.1),yt=qe(gt,.5,Bt),sn=n.position.distanceTo($.position);if(yt>0&&h.strokes%2===1&&B.swish(1/(1+sn*sn*.12)),yt===0)Ie()?(h.state="walk",h.st=0):(h.state="retreat",h.st=0);else if(h.strokes>2){const Yt=h.tgt;Ie()&&Yt&&h.tgt.distanceTo(Yt)>.35&&(h.state="walk",h.st=0)}}h.pos.x+=Math.sin(h.yaw)*H*.05,h.pos.z+=Math.cos(h.yaw)*H*.05}else if(h.state==="tumble"){ee="carry";const de=Math.hypot(h.v.x,h.v.z),ve=Math.exp(-(h.hop>.01?.6:2.6)*H);h.v.x*=ve,h.v.z*=ve,h.vy-=9.8*H,h.hop=Math.max(0,h.hop+h.vy*H),h.hop===0&&h.vy<0&&(h.vy=de>1.2?-h.vy*.3:0);let Je=h.pos.x+h.v.x*H,gt=h.pos.z+h.v.z*H;a(Je,h.pos.z)||(h.v.x*=-.45,Je=h.pos.x),a(h.pos.x,gt)||(h.v.z*=-.45,gt=h.pos.z),h.pos.x=Je,h.pos.z=gt,de>.05&&h.axis.set(h.v.z,0,-h.v.x).normalize(),h.roll+=de*H*5.5,h.quiet=de<.35&&h.hop<.01?h.quiet+H:0,h.quiet>.45&&(h.state="getup",h.st=0,we.getups++,h.from=$.quaternion.clone())}else if(h.state==="getup"){ee="idle";const de=Math.min(1,h.st/.7);de>=1&&(h.roll=0,h.state=Ie()?"walk":"retreat",h.st=0),h.getK=de}else if(h.state==="retreat"){ee="retreat";const de=ue(h.home.floor.x,h.home.floor.z,1.9);w>0&&h.st>.4&&Ie()?(h.state="walk",h.st=0):(de<.15||h.stuck>1.5)&&(h.state="home",h.st=0,h.hp=$.position.clone())}else if(h.state==="home"){ee="walk";const de=Math.min(1,h.st/.7);$.position.lerpVectors(h.hp,h.home.wall,de),$.position.y+=Math.sin(de*Math.PI)*.25,$.scale.setScalar(Math.max(.05,1-de)),de>=1&&(h.state="gone")}if(h.state==="walk"||h.state==="sweep"||h.state==="retreat"||h.state==="tumble"||h.state==="getup"){for(const[ve,Je]of l){const gt=h.pos.x-ve,Bt=h.pos.z-Je,yt=Math.hypot(gt,Bt);yt<.6&&yt>0&&(h.pos.x=ve+gt/yt*.6,h.pos.z=Je+Bt/yt*.6)}const de=ee==="scrub"?Math.abs(Math.sin(S*11))*.03:ee==="walk"||ee==="retreat"?Math.abs(Math.sin(S*8))*.12:0;$.position.set(h.pos.x,i(h.pos.x,h.pos.z)+.35+h.hop+de,h.pos.z),$.scale.setScalar(h.glitch>0?.6+Math.random()*.5:1)}if(h.glitch>0&&(h.glitch-=H),t.animateElf&&t.animateElf($,ee,h.t,n,H),le!=null){let de=le-h.yaw;de=Math.atan2(Math.sin(de),Math.cos(de)),h.yaw+=de*Math.min(1,H*10)}h.state==="tumble"?(tA.setFromAxisAngle(h.axis,h.roll),Is.setFromAxisAngle(nA,h.yaw),$.quaternion.copy(tA).multiply(Is)):h.state==="getup"?(Is.setFromAxisAngle(nA,h.yaw),$.quaternion.slerpQuaternions(h.from,Is,h.getK*h.getK*(3-2*h.getK)),$.position.y-=(1-h.getK)*.18):h.state!=="emerge"&&h.state!=="home"&&$.rotation.set(0,h.yaw+(ee==="scrub"?Math.sin(S*7)*.35:0),0);const Ce=$.userData.broom,Pe=$.userData.pan;ee==="scrub"?(Ce.rotation.set(-.85,Math.sin(S*11.4)*.7,.25),Pe.visible=!0):(Ce.rotation.set(2.75+Math.sin(S*6)*.08,0,h.state==="tumble"?Math.sin(S*15)*1.2:-.25),Pe.visible=h.state==="tumble")}function Zc(h){w>0?Oe+=h:Oe=0,pt-=h;const H=Le.filter($=>$.state!=="home"&&$.state!=="gone").length;Oe>1.6&&pt<=0&&H<p&&(H===0||w/H>160)&&(pt=.9,ps());for(let $=Le.length-1;$>=0;$--){const S=Le[$];Kc(S,h),S.state==="gone"&&(e.remove(S.s),$e.remove(S.push),Le.splice($,1))}w===0&&!Le.length&&(jt=!1)}function $c(h){const $=Math.exp(-2.1*h);Ee=0,w=0,X=0;for(let S=0;S<g;S++){const ee=se[S];if(ee===0)continue;if(ee===2){w++;continue}const le=S*3;if(ee===1){oe[S]+=h;let ue=z[le]*$,Ie=z[le+1]*$-7.5*h,Ce=z[le+2]*$;const Pe=Math.sin(he*9+S)*.35*h;ue+=Pe,Ce-=Pe,Ie<-1.6&&(Ie=-1.6+(Ie+1.6)*.5);let de=x[le]+ue*h,ve=x[le+2]+Ce*h;a(de,ve)||(a(x[le],ve)?(de=x[le],ue*=-.3):a(de,x[le+2])?(ve=x[le+2],Ce*=-.3):(de=x[le],ve=x[le+2],ue*=-.3,Ce*=-.3));let Je=x[le+1]+Ie*h;if(Je>m-.05&&(Je=m-.05,Ie=-Math.abs(Ie)*.3),x[le]=de,x[le+1]=Je,x[le+2]=ve,z[le]=ue,z[le+1]=Ie,z[le+2]=Ce,Je<=i(de,ve)+.012||oe[S]>9){Ee++,M(S);continue}Ee++,pe(S,J[S*4+1]+J[S*4+2]*oe[S],J[S*4]+J[S*4+3]*oe[S],G[S])}else if(ee===3){oe[S]-=h;const ue=Math.min(1,h*7);if(x[le]+=(z[le]-x[le])*ue,x[le+2]+=(z[le+2]-x[le+2])*ue,x[le+1]=i(x[le],x[le+2])+.013,oe[S]<=0){se[S]=0,ye(S);continue}X++,pe(S,0,J[S*4]+he*3,G[S]*Math.max(.05,oe[S]/Math.max(.05,z[le+1])))}}}const Cs=5.2,aA=Math.tan(.44);function eu(h){const H=Be(.62),$=_.x,S=_.y,ee=_.z,le=Math.hypot($,ee)||1,ue=$/le,Ie=ee/le;for(let Ce=0;Ce<g;Ce++){const Pe=se[Ce];if(Pe!==1&&Pe!==2)continue;const de=Ce*3,ve=x[de]-H.x,Je=x[de+1]-H.y,gt=x[de+2]-H.z,Bt=ve*$+Je*S+gt*ee;if(Bt<0||Bt>Cs)continue;const yt=ve-$*Bt,sn=Je-S*Bt,Yt=gt-ee*Bt;if(Math.sqrt(yt*yt+sn*sn+Yt*Yt)>.3+Bt*aA)continue;const kn=1-Bt/Cs,ya=Math.hypot(yt,Yt)||1,rA=.9*Math.random();Pe===2?(se[Ce]=1,w--,Ee++,oe[Ce]=0,we.blownFlakes++,z[de]=(ue+yt/ya*rA)*(3+7*kn)*(.6+Math.random()*.6),z[de+2]=(Ie+Yt/ya*rA)*(3+7*kn)*(.6+Math.random()*.6),z[de+1]=1+Math.random()*2.8*kn,x[de+1]+=.01):(z[de]+=ue*16*kn*h,z[de+2]+=Ie*16*kn*h,z[de+1]+=2*kn*h)}for(const Ce of We){const Pe=Ne(Ce);if(!Pe)continue;const de=Pe.x-H.x,ve=Pe.y-H.y,Je=Pe.z-H.z,gt=de*$+ve*S+Je*ee;if(gt<0||gt>Cs)continue;const Bt=de-$*gt,yt=ve-S*gt,sn=Je-ee*gt;if(Math.sqrt(Bt*Bt+yt*yt+sn*sn)>Ce.radius+.3+gt*aA)continue;const cn=(1-gt/Cs)/Ce.mass,kn=Math.hypot(Bt,sn)||1,ya=ms.set((ue+Bt/kn*.35)*22*cn*h,7*cn*h,(Ie+sn/kn*.35)*22*cn*h);Ce.onPush?Ce.onPush(ya,{from:H,dir:_,strength:cn,dt:h}):Ce._v.add(ya)}for(let Ce=0;Ce<(c?2:3);Ce++){const Pe=ce;ce=(ce+1)%it;const de=Math.random()*6.28,ve=Math.random()*.2;k[Pe*3]=H.x,k[Pe*3+1]=H.y,k[Pe*3+2]=H.z;const Je=7+Math.random()*4;N[Pe*3]=($+(ge.x*Math.cos(de)+te.x*Math.sin(de))*ve)*Je,N[Pe*3+1]=(S+(ge.y*Math.cos(de)+te.y*Math.sin(de))*ve)*Je,N[Pe*3+2]=(ee+(ge.z*Math.cos(de)+te.z*Math.sin(de))*ve)*Je,W[Pe]=1}if(Math.random()<h*(c?3:5)){const Ce=_e[Fe];Fe=(Fe+1)%U,Ce.p.copy(H),Ce.v.set($*6+(Math.random()-.5)*2,S*6+1.5,ee*6+(Math.random()-.5)*2),Ce.life=3.5,Ce.rx=Math.random()*6,Ce.ry=Math.random()*6,Ce.sx=(Math.random()-.5)*14,Ce.sy=(Math.random()-.5)*9}}function tu(h){let H=!1;for(let S=0;S<it;S++){if(W[S]<=0)continue;H=!0,W[S]=Math.max(0,W[S]-h*2.4);const ee=Math.exp(-1.5*h);N[S*3]*=ee,N[S*3+1]*=ee,N[S*3+2]*=ee,k[S*3]+=N[S*3]*h,k[S*3+1]+=N[S*3+1]*h,k[S*3+2]+=N[S*3+2]*h}(H||C.userData.any)&&(Y.attributes.position.needsUpdate=!0,Y.attributes.aLife.needsUpdate=!0),C.userData.any=H;let $=!1;_e.forEach((S,ee)=>{if(S.life<=0)return;$=!0,S.life-=h;const le=i(S.p.x,S.p.z)+.004;if(S.p.y>le){S.v.y-=4*h,S.v.multiplyScalar(Math.exp(-1.6*h)),S.v.y<-1.1&&(S.v.y=-1.1);const ue=S.p.x+S.v.x*h,Ie=S.p.z+S.v.z*h;a(ue,Ie)?(S.p.x=ue,S.p.z=Ie):(S.v.x*=-.3,S.v.z*=-.3),S.p.y=Math.max(le,S.p.y+S.v.y*h),S.rx+=S.sx*h,S.ry+=S.sy*h}else S.rx*=.9;ke.position.copy(S.p),ke.rotation.set(S.p.y>le?S.rx:.05,S.ry,0),ke.scale.setScalar(Math.min(1,S.life/.6)),ke.updateMatrix(),P.setMatrixAt(ee,ke.matrix)}),($||P.userData.any)&&(P.instanceMatrix.needsUpdate=!0),P.userData.any=$}function nu(h){for(const H of We){if(H.onPush)continue;const $=H.object?H.object.position:H.position;if(!$||H._v.lengthSq()<1e-6)continue;const S=Math.exp(-3*h);H._v.x*=S,H._v.z*=S;const ee=$.x+H._v.x*h,le=$.z+H._v.z*h;a(ee,$.z)?$.x=ee:H._v.x*=-.4,a($.x,le)?$.z=le:H._v.z*=-.4,H._v.y=0}}let Mn=!1,Va=0,sa=0,Mr=0,Bs=0;function au(h){o()||(Mn=!0,h===I.glitter&&!Wt.g&&(Wt.g=1,s("GLITTER CANNON · HOLD TO SPRAY · RIGHT-CLICK BURST",2.5)),h===I.blower&&!Wt.b&&(Wt.b=1,s("LEAF BLOWER · HOLD TO BLOW",2)))}function Es(){Mn=!1}function kr(h){h==null&&(h=v()),!(h!==I.glitter||o()||Va>0)&&(Va=.6,sa=1,be(c?120:260,.55,2.5,7.5,1.6),we.sprayed+=c?120:260,B.burst())}if(addEventListener("mouseup",h=>{h.button===0&&Es()}),addEventListener("blur",Es),addEventListener("mousedown",h=>{h.button===2&&A()&&v()===I.glitter&&!window.__reading&&kr(I.glitter)}),addEventListener("keydown",h=>{const H=/^Digit(\d)$/.exec(h.code);if(!H||!t.setWeapon)return;const $=+H[1]-1;D($)&&t.setWeapon($)}),typeof document<"u"){const h=document.createElement("style");h.textContent="#tburst{display:none}@media (pointer:coarse){#tburst{display:block;position:fixed;bottom:calc(120px + var(--sa-bottom, env(safe-area-inset-bottom)));right:calc(16px + var(--sa-right, env(safe-area-inset-right)));width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#ff3fb4cc,#ffd23acc,#2fe6ffcc);color:#fff;font:bold 11px monospace;border:3px solid #fff;text-shadow:0 1px 2px #000}#tburst[hidden]{display:none}}#tfire.gb-hold{box-shadow:0 0 0 4px #fff8,0 0 18px #ff9cf0}",document.head.appendChild(h);const H=document.getElementById("hud"),$=H?[...H.querySelectorAll(".wpn")].pop():null;[[bi,I.glitter],[Ds,I.blower]].forEach(([ue,Ie])=>{if(!H||H.querySelector(`.wpn[data-w="${Ie}"]`))return;const Ce=document.createElement("button");Ce.className="wpn",Ce.type="button",Ce.dataset.w=Ie,Ce.dataset.tool=ue.id,Ce.innerHTML=`<b>${Ie+1}</b> ${ue.slot}`;const Pe=ve=>{ve.preventDefault(),ve.stopPropagation(),t.setWeapon&&t.setWeapon(Ie)};Ce.addEventListener("touchstart",Pe,{passive:!1}),Ce.addEventListener("mousedown",ve=>ve.stopPropagation()),Ce.addEventListener("click",Pe);const de=H.querySelector(`.wpn[data-w="${Ie-1}"]`)||$;de?de.after(Ce):H.prepend(Ce)});const S=document.getElementById("tfire");S&&["touchend","touchcancel"].forEach(ue=>S.addEventListener(ue,Es));const ee=document.getElementById("touch");if(ee&&!document.getElementById("tburst")){const ue=document.createElement("button");ue.id="tburst",ue.type="button",ue.hidden=!0,ue.textContent=bi.altLabel,ue.addEventListener("touchstart",Ie=>{Ie.preventDefault(),Ie.stopPropagation(),kr(I.glitter)},{passive:!1}),ee.appendChild(ue)}const le=document.querySelector("#start p:last-of-type");le&&!/Glitter/.test(le.innerHTML)&&le.insertAdjacentHTML("beforeend",`<br>${I.glitter+1} Glitter Cannon: hold to spray, right-click burst · ${I.blower+1} Leaf Blower: hold to blow`)}let iA=-1;typeof MutationObserver<"u"&&document.getElementById("hud")&&new MutationObserver(()=>sA(v())).observe(document.getElementById("hud"),{subtree:!0,attributes:!0,attributeFilter:["class"]});function sA(h){if(h===iA)return;iA=h;const H=document.getElementById("tburst"),$=document.getElementById("tlaunch");H&&(H.hidden=h!==I.glitter),D(h)&&$&&($.hidden=!0)}function iu(h,H){H==null&&(H=v()),he+=h,T.material.uniforms.uTime.value=he,sA(H);const $=o();($||!D(H))&&(Mn=!1);const S=typeof document<"u"&&document.getElementById("tfire");if(S&&S.classList.toggle("gb-hold",Mn&&D(H)),!$){if(Mn&&H===I.glitter){re+=f*h;const ee=re|0;re-=ee,ee&&(be(ee,.13,5.5,9.5,.5),we.sprayed+=ee),sa=Math.min(1,sa+h*6),Mr-=h,Mr<=0&&(Mr=.075,B.sprinkle())}Bs=Mn&&H===I.blower?Math.min(1,Bs+h*4):Math.max(0,Bs-h*5),Mn&&H===I.blower&&eu(h),$c(h),Zc(h),nu(h)}if(B.blower(!$&&Mn&&H===I.blower),tu(h),Va=Math.max(0,Va-h),sa=Math.max(0,sa-h*3),O>=L&&(Dr(T.instanceMatrix,L*16,(O-L+1)*16),L=g,O=-1),K>=q&&(Dr(T.instanceColor,q*3,(K-q+1)*3),Dr(F,q,K-q+1),q=g,K=-1),t.renderer){const ee=t.renderer.getDrawingBufferSize(su).y;Qe.uniforms.uScale.value=ee*.5*n.projectionMatrix.elements[5]}else Qe.uniforms.uScale.value=innerHeight*Math.min(2,devicePixelRatio||1)*.5*n.projectionMatrix.elements[5]}const su=new ze;function Dr(h,H,$){h.updateRanges.length>6?(h.clearUpdateRanges(),h.addUpdateRange(0,h.array.length)):h.addUpdateRange(H,$),h.needsUpdate=!0}function ru(h,H){const $=he;if(H===I.glitter){const S=y.userData.glitter,ee=Mn?1:0;h.rotation.x=-.05+sa*.12,h.rotation.z=0,h.position.y+=.03,h.position.z+=sa*.035,ee&&(h.position.x+=(Math.random()-.5)*.004,h.position.y+=(Math.random()-.5)*.004),S.fill.rotation.y+=(.4+ee*9)*.016,S.fill.position.y=.085+ee*Math.abs(Math.sin($*30))*.01,S.flash.material.opacity=Math.max(ee*(.55+.45*Math.random()),Va>.35?1:0);const le=.18+ee*.08+(Va>.35?.25:0);S.flash.scale.set(le,le,1),S.lip.rotation.z=$*2,S.lip.material.map.offset.x=$*.4%1}if(H===I.blower){const S=Q.userData.blower,ee=Bs;h.rotation.x=-.12,h.rotation.z=.04,h.position.y+=.02,ee>0&&(h.position.x+=(Math.random()-.5)*.006*ee,h.position.y+=(Math.random()-.5)*.006*ee,h.rotation.z+=Math.sin($*60)*.01*ee),S.grille.rotation.z+=ee*.9,S.noz.scale.x=1.5+Math.sin($*45)*.06*ee}}return{GLITTER:bi,BLOWER:Ds,slots:I,names:[bi.hudName,Ds.hudName],fireLabels:[bi.fireLabel,Ds.fireLabel],owns:D,down:au,up:Es,secondary:kr,update:iu,pose:ru,sweepAt:qe,pushables:$e,viewmodels:[y,Q],get holding(){return Mn},get kick(){return sa},glitter:{mesh:T,cap:g,emit:b,get air(){return Ee},get settled(){return w},get swept(){return X},get head(){return me},clear:Me,spray:h=>{be(h,.13,5.5,9.5,.5),we.sprayed+=h},positions:x,states:se},elves:Le,stats:we,audio:B.stats,get humming(){return B.humming},phone:c}}const oa=(t=0,e=0,n=0)=>new j(t,e,n),_r={sprint:1.8,fovKick:7,bobWalk:.035,bobRun:.07,volume:.3,chase:{base:8.6,ramp:.17,cap:13.5,farBonusFrom:20,farBonus:.1,farBonusMax:2,catchupAfter:12,catchupDist:22,catchupBehind:15,catchupEvery:4,forceCatchAt:120,packSpread:25,knockMin:1.2,tumbleMin:.9,recover:.6,immunity:4,friction:2.2},hold:{budget:.4,slow:2.2,knockMin:1,tumble:.9,back:7,dragDur:[3,5.2],dragPace:4}};function pg(t){const e={..._r,...t.options||{},chase:{..._r.chase,...(t.options||{}).chase||{}},hold:{..._r.hold,...(t.options||{}).hold||{}}},n=t.camera,a=t.touchMove||{x:0,y:0},i=t.isMuted||(()=>!1),s=t.walkable||(()=>!0),r=t.floorY||(()=>0),o=t.animateElf||(()=>{}),A=t.isCarried||(()=>!1),l=t.inRealm||(()=>!1),u=t.isBusy||(()=>!1),c=matchMedia("(pointer: coarse)").matches;let g=typeof t.floorMaterial=="function"?t.floorMaterial:typeof t.floorMaterial=="string"?()=>t.floorMaterial:()=>"stone",f=!1,p=!1,m=!1,B=0,d=0,E=0,I=0,y=0,Q=0;const D=n.position.clone(),v={steps:0,byMat:{},suppressed:0,maxSpeed:0,runFrames:0};addEventListener("keydown",C=>{C.key==="Shift"&&(f=!0)}),addEventListener("keyup",C=>{C.key==="Shift"&&(f=!1)}),addEventListener("blur",()=>{f=!1});let T=null,F=null;const Z=document.getElementById("hud");Z&&(F=document.createElement("span"),F.className="cell",F.id="runcell",F.textContent=c?"stick to top: run":"Shift to run",F.style.cssText="white-space:nowrap",Z.appendChild(F));function x(){F&&(F.style.color=m?"#ffcf6a":"")}const z=()=>{const C=-(a.y||0);return C>=.95&&Math.abs(a.x||0)<=C*.7};function se(C,U){const ne=Math.abs(C||0)+Math.abs(U||0)>.1&&(f||p||z())&&!u();return ne!==m&&(m=ne,x()),m?e.sprint:1}let J=null,oe=null;function G(){try{return J||(J=new(window.AudioContext||window.webkitAudioContext),oe=J.createGain(),oe.gain.value=e.volume,oe.connect(J.destination)),J.state==="suspended"&&J.resume(),J}catch{return null}}let me=null;const Ee=C=>{if(me)return me;me=C.createBuffer(1,Math.ceil(C.sampleRate*.3),C.sampleRate);const U=me.getChannelData(0);for(let V=0;V<U.length;V++)U[V]=Math.random()*2-1;return me},w={stone:["bandpass",950,.9,.07,.55,[[95,"sine",.06,.5]]],wood:["bandpass",520,1.8,.09,.4,[[150,"triangle",.08,.55],[310,"sine",.05,.15]]],marble:["highpass",2600,.7,.035,.45,[[2300,"sine",.045,.07],[110,"sine",.04,.3]]],concrete:["bandpass",1500,.6,.095,.6,[[80,"sine",.07,.45]]],glass:["highpass",3e3,.8,.03,.3,[[1850,"sine",.14,.08],[2760,"sine",.11,.05],[120,"sine",.04,.25]]],metal:["bandpass",1200,1.2,.06,.35,[[420,"square",.16,.05],[985,"triangle",.13,.06],[100,"sine",.05,.3]]],carpet:["lowpass",420,.7,.08,.5,[[70,"sine",.05,.25]]]};function X(C,U){if(i()){v.suppressed++;return}const V=G();if(!V)return;const ne=w[C]||w.stone,P=V.currentTime+.005,_e=.92+Math.random()*.16,Fe=V.createStereoPanner?V.createStereoPanner():null;Q=1-Q,Fe&&(Fe.pan.value=Q?.12:-.12,Fe.connect(oe));const ke=Fe||oe,We=V.createBufferSource(),$e=V.createBiquadFilter(),Ne=V.createGain();We.buffer=Ee(V),We.playbackRate.value=_e,$e.type=ne[0],$e.frequency.value=ne[1]*_e,$e.Q.value=ne[2],Ne.gain.setValueAtTime(1e-4,P),Ne.gain.exponentialRampToValueAtTime(ne[4]*U,P+.004),Ne.gain.exponentialRampToValueAtTime(1e-4,P+ne[3]),We.connect($e).connect(Ne).connect(ke),We.start(P,Math.random()*.1),We.stop(P+ne[3]+.02);for(const[Le,Oe,pt,jt]of ne[5]){const Wt=V.createOscillator(),Jn=V.createGain();Wt.type=Oe,Wt.frequency.setValueAtTime(Le*_e,P),Wt.frequency.exponentialRampToValueAtTime(Le*_e*.82,P+pt),Jn.gain.setValueAtTime(1e-4,P),Jn.gain.exponentialRampToValueAtTime(jt*U,P+.005),Jn.gain.exponentialRampToValueAtTime(1e-4,P+pt),Wt.connect(Jn).connect(ke),Wt.start(P),Wt.stop(P+pt+.02)}v.steps++,v.byMat[C]=(v.byMat[C]||0)+1}function L(C){if(te+=Math.min(.05,Math.max(0,C||0)),!(C>0))return;const U=n.position,V=U.x-D.x,ne=U.z-D.z;D.copy(U);let P=Math.hypot(V,ne)/C;P>25&&(P=0),y+=(P-y)*Math.min(1,C*12),y>v.maxSpeed&&(v.maxSpeed=y);const _e=A(),Fe=l();B+=((m&&!_e&&!Fe?1:0)-B)*Math.min(1,C*6),m&&v.runFrames++;const ke=e.fovKick*B*Math.min(1,y/8);if(Math.abs(ke-d)>.01&&(n.fov+=ke-d,d=ke,n.updateProjectionMatrix()),_e||y<.6){E=Math.round(E),I=E;return}const We=1.6+Math.min(14,y)*.12;if(E+=C*We,Math.floor(E)>Math.floor(I)){let $e="stone";try{$e=g(U.x,U.z,r())||"stone"}catch{}X($e,(Fe?.35:1)*(m?1.3:1)*Math.min(1,.45+y/10))}I=E}const O=()=>A()||y<.3?0:Math.abs(Math.sin(E*Math.PI))*(e.bobWalk+(e.bobRun-e.bobWalk)*B)*Math.min(1,y/5),q=e.chase,K=[];let re=0;const he=oa(1e9,0,1e9),ie=()=>{const C=n.position;Math.hypot(C.x-he.x,C.z-he.z)<.6||(he.copy(C),K.push(oa(C.x,0,C.z)),K.length>300&&(K.shift(),re++))},pe=C=>K[C-re],ye=()=>re+K.length-1,b=oa(),M=C=>(b.set(C.x,r()+.6,C.z),b.distanceTo(n.position)>45?!1:(b.project(n),b.z<1&&Math.abs(b.x)<1.1&&Math.abs(b.y)<1.1)),_=(C,U)=>{const V=Math.hypot(U.x-C.x,U.z-C.z),ne=Math.ceil(V/.5);for(let P=1;P<ne;P++){const _e=P/ne;if(!s(C.x+(U.x-C.x)*_e,C.z+(U.z-C.z)*_e))return!1}return!0},ge=C=>{const U=K.map((V,ne)=>[Math.hypot(V.x-C.x,V.z-C.z),ne]).sort((V,ne)=>V[0]-ne[0]);for(let V=0;V<Math.min(10,U.length);V++)if(_(C,K[U[V][1]]))return U[V][1]+re;return U.length?U[0][1]+re:-1};let te=0;const fe=()=>te;function Be(C,U){if(C._mvReg)return;C._mvReg=!0,C.spd=.95+Math.random()*.1,C.kv=oa(),C.farT=0;const V=t.tools&&t.tools();V&&V.pushables&&(C._unpush=V.pushables.add({name:"chase-elf",radius:.35,mass:1,getPosition:()=>oa(C.cp.x,r()+.35,C.cp.z),onPush:ne=>be(C,U,ne)}))}function be(C,U,V){!C.s.parent||!U.chase||C.immune&&fe()<C.immune||C.rec||(C.kv.x+=V.x,C.kv.z+=V.z,C.kvy=Math.min(2.5,(C.kvy||0)+V.y),!C.tumble&&Math.hypot(C.kv.x,C.kv.z)>q.knockMin&&(C.tumble={t:0,spin:(Math.random()<.5?-1:1)*(6+Math.random()*4)},C.ti=void 0,v.knocks=(v.knocks||0)+1))}function qe(C,U,V,ne){Be(C,U),U._mv||(U._mv={curMin:1e9,prevMin:1e9,farT:0,cool:0},K.length=0,re=0,he.set(1e9,0,1e9)),C===U.elves[0]&&ie();const P=n.position,_e=r();let Fe=Math.hypot(P.x-C.cp.x,P.z-C.cp.z);const ke=U._mv;if(C===U.elves[0]&&(ke.prevMin=ke.curMin,ke.curMin=1e9,ke.farT=ke.prevMin>q.catchupDist?ke.farT+ne:0,ke.cool=Math.max(0,ke.cool-ne)),C.tumble||C.rec){if(C.tumble){const Ne=C.tumble;Ne.t+=ne;const Le=C.cp.x+C.kv.x*ne,Oe=C.cp.z+C.kv.z*ne;s(Le,Oe)?(C.cp.x=Le,C.cp.z=Oe):C.kv.multiplyScalar(-.4);const pt=Math.exp(-q.friction*ne);C.kv.multiplyScalar(pt),C.kvy=Math.max(0,(C.kvy||0)-6*ne),C.hop=Math.max(0,(C.hop||0)+C.kvy*ne-(C.kvy?0:2*ne)),o(C.s,"idle",V,n,ne),C.s.position.set(C.cp.x,_e+.3+(C.hop||0),C.cp.z),C.s.rotation.z+=Ne.spin*ne,C.s.rotation.x=Math.sin(Ne.t*9)*.6,Ne.t>q.tumbleMin&&Math.hypot(C.kv.x,C.kv.z)<.8&&(C.tumble=null,C.rec={t:0,z:C.s.rotation.z%(Math.PI*2),x:C.s.rotation.x})}else{C.rec.t+=ne;const Ne=Math.min(1,C.rec.t/q.recover);o(C.s,"idle",V,n,ne),C.s.position.set(C.cp.x,_e+.35,C.cp.z),C.s.rotation.z=C.rec.z*(1-Ne),C.s.rotation.x=C.rec.x*(1-Ne),Ne>=1&&(C.rec=null,C.s.rotation.x=C.s.rotation.z=0,C.immune=fe()+q.immunity,C.kv.set(0,0,0),v.recovered=(v.recovered||0)+1)}return C.cp.y=C.s.position.y,Fe+99}const We=C.spd*Math.min(q.cap,q.base+q.ramp*Math.max(0,V-1))+Math.min(q.farBonusMax,Math.max(0,Fe-q.farBonusFrom)*q.farBonus);if(Fe<ke.curMin&&(ke.curMin=Fe),ke.farT>q.catchupAfter&&ke.cool<=0&&Fe>ke.prevMin+2&&!M(C.cp)){let Ne=ye(),Le=0;for(;Ne>re&&Le<q.catchupBehind;)Le+=pe(Ne).distanceTo(pe(Ne-1)),Ne--;const Oe=pe(Ne);Oe&&!M(Oe)&&(C.cp.x=Oe.x+(Math.random()-.5)*.4,C.cp.z=Oe.z+(Math.random()-.5)*.4,C.ti=Ne,ke.cool=q.catchupEvery,v.catchups=(v.catchups||0)+1,Fe=Math.hypot(P.x-C.cp.x,P.z-C.cp.z))}if(C.ti!==void 0&&C.ti>=re&&!C.los&&ke.prevMin<1e8&&(ye()-C.ti)*.6>Math.min(ke.prevMin,60)+q.packSpread&&!M(C.cp)){const Le=Math.max(re,ye()-Math.round((Math.min(ke.prevMin,40)+3+Math.random()*6)/.6)),Oe=pe(Le);Oe&&!M(Oe)&&(C.cp.x=Oe.x+(Math.random()-.5)*.4,C.cp.z=Oe.z+(Math.random()-.5)*.4,C.ti=Le,v.regroups=(v.regroups||0)+1,Fe=Math.hypot(P.x-C.cp.x,P.z-C.cp.z))}C.losT=(C.losT||0)-ne,C.losT<=0&&(C.losT=.2+Math.random()*.1,C.los=Fe<1.6||_(C.cp,P));let $e=We*ne;for(let Ne=0;Ne<8&&$e>1e-4;Ne++){let Le,Oe,pt=!C.los;if(pt){(C.ti===void 0||C.ti<re)&&(C.ti=ge(C.cp));const ia=C.ti>=0?pe(C.ti):null;ia?(Le=ia.x,Oe=ia.z):(Le=P.x,Oe=P.z,pt=!1)}else{const ia=Fe>3?.6:0,ps=C.a||0;Le=P.x+Math.cos(ps)*ia,Oe=P.z+Math.sin(ps)*ia,C.ti=void 0}const jt=Math.hypot(Le-C.cp.x,Oe-C.cp.z);if(pt&&jt<=$e){if(C.cp.x=Le,C.cp.z=Oe,$e-=jt,C.ti<ye()){C.ti++;continue}break}const Wt=jt>1e-6?Math.min(1,$e/jt):0,Jn=C.cp.x+(Le-C.cp.x)*Wt,Oa=C.cp.z+(Oe-C.cp.z)*Wt;pt||s(Jn,Oa)||Fe<1.6?(C.cp.x=Jn,C.cp.z=Oa):(C.los=!1,C.losT=.3);break}return C.cp.y=_e+.35+Math.abs(Math.sin(V*8+(C.ph||0)))*.2,C.s.position.copy(C.cp),C.s.scale.setScalar(1),o(C.s,"walk",V,n,ne),Math.hypot(P.x-C.cp.x,P.z-C.cp.z)}function Me(C){!C||!C.elves||(C.elves.forEach(U=>{U._unpush&&(U._unpush(),U._unpush=null),U._mvReg=!1,U.tumble=U.rec=null,U.s&&(U.s.rotation.x=U.s.rotation.z=0)}),C._mv=null)}const we=e.hold;function it(C,U){if(!C||!C.elves||C._hold)return;const V=C.elves.length,ne=C._hold={kind:U,active:!1,used:0,budget:Math.max(2,Math.round(V*we.budget)),off:0,unpush:[]},P=t.tools&&t.tools();for(const _e of C.elves)_e.hk=null,P&&P.pushables&&ne.unpush.push(P.pushables.add({name:"holding-elf",radius:.35,mass:1,getPosition:()=>_e.s.getWorldPosition(oa()),onPush:Fe=>k(C,_e,Fe)}))}function k(C,U,V){const ne=C._hold;if(!ne||!ne.active||U.hk||ne.used>=ne.budget||(U.hacc=(U.hacc||oa()).add(oa(V.x,0,V.z)),U.hacc.length()<we.knockMin))return;ne.used++,v.holdKnocks=(v.holdKnocks||0)+1;const P=U.hacc.clone().multiplyScalar(1.6);U.hacc.set(0,0,0),U.hk={st:"tumble",t:0,p:U.s.position.clone(),v:P,y:Math.max(.35,U.s.position.y),vy:1.2,spin:(Math.random()<.5?-1:1)*(7+Math.random()*4)}}function N(C,U,V){const ne=C&&C._hold;if(!ne)return 1;ne.active=!!V;const P=C.elves.length||1;let _e=0;for(const Fe of C.elves)Fe.hk&&_e++;return ne.off=_e,Math.max(0,Math.min(1,1-we.slow*_e/P))}function W(C,U,V,ne){const P=U.hk;if(!P)return!1;const _e=r(),Fe=U.s.position.clone();if(P.st==="tumble"){P.t+=ne;const Ne=P.p.x+P.v.x*ne,Le=P.p.z+P.v.z*ne;return s(Ne,Le)?(P.p.x=Ne,P.p.z=Le):P.v.multiplyScalar(-.4),P.v.multiplyScalar(Math.exp(-2.4*ne)),P.vy-=6*ne,P.y=Math.max(_e+.3,P.y+P.vy*ne),U.s.position.set(P.p.x,P.y,P.p.z),U.s.rotation.z+=P.spin*ne,U.s.rotation.x=Math.sin(P.t*9)*.6,o(U.s,"idle",V,n,ne),P.t>we.tumble&&P.v.length()<.9&&(P.st="back",P.t=0,P.rz=U.s.rotation.z%(Math.PI*2),P.rx=U.s.rotation.x),!0}P.t+=ne;const ke=Math.min(1,P.t/.35);U.s.rotation.z=P.rz*(1-ke),U.s.rotation.x=P.rx*(1-ke);const We=Math.hypot(Fe.x-P.p.x,Fe.z-P.p.z),$e=we.back*ne*(ke>=1?1:.3);return We<=$e+.05?(U.hk=null,U.s.rotation.x=U.s.rotation.z=0,v.holdRegroups=(v.holdRegroups||0)+1,!1):(P.p.x+=(Fe.x-P.p.x)/We*$e,P.p.z+=(Fe.z-P.p.z)/We*$e,P.y+=(_e+.35+Math.abs(Math.sin(V*9))*.15-P.y)*Math.min(1,ne*8),U.s.position.set(P.p.x,P.y,P.p.z),o(U.s,"walk",V,n,ne),!0)}function ce(C){const U=C&&C._hold;if(U){U.unpush.forEach(V=>{try{V&&V()}catch{}});for(const V of C.elves)V.hk=null,V.s&&(V.s.rotation.x=V.s.rotation.z=0);C._hold=null}}return{speedMul:se,update:L,bob:O,chase:{step:qe,end:Me,forceCatch:C=>C>q.forceCatchAt,speedAt:C=>Math.min(q.cap,q.base+q.ramp*Math.max(0,C-1)),get trailLength(){return K.length},opts:q},hold:{begin:it,factor:N,apply:W,end:ce,dragDur:C=>Math.min(we.dragDur[1],Math.max(we.dragDur[0],C/we.dragPace)),info:C=>C&&C._hold?{used:C._hold.used,budget:C._hold.budget,off:C._hold.off,kind:C._hold.kind}:null,opts:we},step:X,get clock(){return te},setFloorMaterial:C=>{g=typeof C=="function"?C:()=>C},floorMaterial:(C,U,V)=>g(C,U,V),get running(){return m},get speed(){return y},get fovAdded(){return d},get toggle(){return p},setToggle:C=>{p=!!C,x()},stats:v,options:e,button:T}}const ja=new mn(0,0,0,"YXZ"),Wa=new j,mg={type:"change"},Ig={type:"lock"},Cg={type:"unlock"},pA=Math.PI/2;class Bg extends uu{constructor(e,n=null){super(e,n),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Eg.bind(this),this._onPointerlockChange=yg.bind(this),this._onPointerlockError=wg.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(e){if(this.enabled===!1)return;const n=this.object;Wa.setFromMatrixColumn(n.matrix,0),Wa.crossVectors(n.up,Wa),n.position.addScaledVector(Wa,e)}moveRight(e){if(this.enabled===!1)return;const n=this.object;Wa.setFromMatrixColumn(n.matrix,0),n.position.addScaledVector(Wa,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function Eg(t){if(this.enabled===!1||this.isLocked===!1)return;const e=t.movementX||t.mozMovementX||t.webkitMovementX||0,n=t.movementY||t.mozMovementY||t.webkitMovementY||0,a=this.object;ja.setFromQuaternion(a.quaternion),ja.y-=e*.002*this.pointerSpeed,ja.x-=n*.002*this.pointerSpeed,ja.x=Math.max(pA-this.maxPolarAngle,Math.min(pA-this.minPolarAngle,ja.x)),a.quaternion.setFromEuler(ja),this.dispatchEvent(mg)}function yg(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(Ig),this.isLocked=!0):(this.dispatchEvent(Cg),this.isLocked=!1)}function wg(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const xg={rooms:[],hallways:[],start:{x:.7633,z:-3.899,yaw:.25},hall:{height:2.4,doorHeight:2.2},signs:[],groupSigns:[]},bg=[{id:"painting-portrait-in-gold",title:"Dorian Nakamoto",caption:"12 × 15 in (W × H)",status:"available",url:"https://tjm.art/products/painting-portrait-in-gold/",img:"art/painting-portrait-in-gold.webp",hi:"https://img.tjm.art/gallery-wall/edcc7405e05f4353e269958204c32ca9af022e77e445f06fb978c3a877bbee34-960.webp",kind:"painting",w:.3048,h:.381,fw:.3348,fh:.411,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"painting-clouds-over-water",title:"El Salvador",caption:"8 × 16 in (W × H)",status:"available",url:"https://tjm.art/products/painting-clouds-over-water/",img:"art/painting-clouds-over-water.webp",hi:"https://img.tjm.art/wall-paintings/painting-clouds-over-water-dda20437ce-320.webp",kind:"painting",w:.2032,h:.4064,fw:.2332,fh:.4364,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"honeybadger-and-cub-with-genesis-block",title:"Honeybadger and Cub with Genesis Block",caption:"100 × 70 cm (W × H)",status:"available",url:"https://tjm.art/products/honeybadger-and-cub-with-genesis-block/",img:"art/honeybadger-and-cub-with-genesis-block.webp",hi:"https://img.tjm.art/gallery-wall/5661ac7acd18cb2d7e1634c9595fedb2ef05b6a9a0c454b5e5613b77c17a2c7b-960.webp",kind:"painting",w:.7,h:1,fw:.73,fh:1.03,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1,orientNote:"caption says 100 × 70 cm (W × H) but the image is portrait (0.700): hung 70 W × 100 H, flagged for TJ"},{id:"hope-the-vermillion-aurora",title:"Hope, the Vermillion Aurora",caption:"44 × 22 in (W × H)",status:"available",url:"https://tjm.art/products/hope-the-vermillion-aurora/",img:"art/hope-the-vermillion-aurora.webp",hi:"https://img.tjm.art/gallery-wall/62fadea5e859a0d9adca611a1bbb9d8b714edf350fa0885e2920296867d136fb-960.webp",kind:"painting",w:1.1176,h:.5588,fw:1.1476,fh:.5888,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"archived-painting-15",title:"Symbiosis #1",caption:"44.5 × 24 in (W × H)",status:"available",url:"https://tjm.art/products/archived-painting-15/",img:"art/archived-painting-15.webp",hi:"https://img.tjm.art/gallery-wall/7112103318fcb79bfaae9e8fb67b3a2badc1b9bc3313084870aaa9df993f6c13-960.webp",kind:"painting",w:1.1303,h:.6096,fw:1.1603,fh:.6396,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"painting-red-horizon",title:"Sunset at Kihei on Maui",caption:"23 × 44 in (W × H)",status:"available",url:"https://tjm.art/products/painting-red-horizon/",img:"art/painting-red-horizon.webp",hi:"https://img.tjm.art/gallery-wall/f6e3bea6cf0aae99cac1bf06cccd45149b5be70beb16be754e64984b0e176efc-960.webp",kind:"painting",w:.5842,h:1.1176,fw:.6142,fh:1.1476,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"older-work-provibes-sandwiches-original-1",title:"TJ Devo and Sarah Sandwich (L)",caption:"17.5 × 12.25 in (W × H)",status:"available",url:"https://tjm.art/products/older-work-provibes-sandwiches-original-1/",img:"art/older-work-provibes-sandwiches-original-1.webp",hi:"https://img.tjm.art/wall-paintings/older-work-provibes-sandwiches-original-1-d6ae18ddad-960.webp",kind:"painting",w:.4445,h:.3111,fw:.4745,fh:.3411,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"archived-painting-248",title:"Sunset from Atami, El Salvador #2",caption:"14 × 23.75 in (W × H)",status:"available",url:"https://tjm.art/products/archived-painting-248/",img:"art/archived-painting-248.webp",hi:"https://img.tjm.art/gallery-wall/daa4334b9927e18d378b382c6301b09025e8713d6aac6e8dd050015275dd1652-960.webp",kind:"painting",w:.3556,h:.6032,fw:.3856,fh:.6332,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"archived-painting-436",title:"Sunrise at Bass Coast 2023 #2",caption:"13.75 × 24.75 in (W × H)",status:"available",url:"https://tjm.art/products/archived-painting-436/",img:"art/archived-painting-436.webp",hi:"https://img.tjm.art/gallery-wall/37fb5f76e383a5973699d952b83ee162c815fb2c144a105a289451e22af48a62-960.webp",kind:"painting",w:.3493,h:.6286,fw:.3792,fh:.6586,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"older-work-portraits-319-329-original-1",title:"TJ Bernard Parah 329",caption:"9 × 10.75 in (W × H)",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-1/",img:"art/older-work-portraits-319-329-original-1.webp",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-1-b878be8767-960.webp",kind:"painting",w:.2286,h:.2731,fw:.2586,fh:.3031,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"older-work-ammous-livera-original-2",title:"TJ Stephan Livera 356",caption:"11 × 12 in (W × H)",status:"available",url:"https://tjm.art/products/older-work-ammous-livera-original-2/",img:"art/older-work-ammous-livera-original-2.webp",hi:"https://img.tjm.art/wall-paintings/older-work-ammous-livera-original-2-13fb12c87c-960.webp",kind:"painting",w:.2794,h:.3048,fw:.3094,fh:.3348,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1}],Qg=[],rn={layout:xg,paintings:bg,plaques:Qg},Qi=(t,e,n)=>new j(t,e,n);function vg(){try{const t=document.createElement("div");t.id="realmtitle",t.textContent="HYPERSPACE REALM",document.body.appendChild(t),setTimeout(()=>t.remove(),4200),window.__realmTitleShown=(window.__realmTitleShown||0)+1}catch{}}const yl=t=>Math.min(1,Math.max(0,t)),Aa=t=>(t=yl(t),t*t*(3-2*t)),un={erupt:3.5,engulf:5.2},mA=["THEY ARE SO HAPPY TO SEE YOU","YOU HAVE BEEN HERE BEFORE","LOOK AT WHAT THEY ARE SHOWING YOU","IT IS ALL LANGUAGE","THE PAINTINGS ARE WINDOWS","DO NOT TRY TO REMEMBER THIS"],Sg=(t="")=>new mt({uniforms:{uTime:{value:0}},side:cl,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform float uTime; varying vec2 vUv;
    vec3 hsv(float h,float s,float v){ vec3 k=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.); return v*mix(vec3(1.),k,s); }
    void main(){
      vec2 p = vec2(vUv.x*6.2832, vUv.y*40. - uTime*6.);           // around + along the tunnel
      float a = abs(mod(p.x*3., 2.0944) - 1.0472);                  // kaleidoscope folds
      vec2 q = vec2(cos(a), sin(a)) * (2. + sin(p.y*0.5));
      float f = 0.;
      for (int i = 0; i < 4; i++) { q = abs(q) / dot(q, q) - 0.9 + 0.1*sin(uTime*0.3); f += length(q); }   // little fractal fold
      float m = sin(p.y*2. + f*2. + uTime*2.) * 0.5 + 0.5;
      float hex = step(0.85, fract(f*1.7 + p.y*0.25));
      vec3 c = hsv(fract(f*0.12 + p.y*0.03 + uTime*0.1), 0.85, 0.35 + 0.65*m) + hex*vec3(1.,.9,.6);
      gl_FragColor = vec4(floor(c*8.)/8., 1.); }`});function Mg({scene:t,camera:e,renderer:n,makeElf:a,animateElf:i,elfUniforms:s,say:r,canvas:o,floorY:A}){const l=document.createElement("div");Object.assign(l.style,{position:"fixed",inset:"0",pointerEvents:"none",opacity:"0",background:"#fff",zIndex:5}),document.body.appendChild(l);let u=null;const c=(()=>{const J=document.createElement("canvas");J.width=J.height=128;const oe=J.getContext("2d");oe.strokeStyle="#ffb030",oe.lineCap="round";for(let Ee=0;Ee<14;Ee++){let w=64,X=64,L=Ee/14*6.283;oe.lineWidth=5,oe.beginPath(),oe.moveTo(w,X);for(let O=0;O<6;O++)L+=(Math.random()-.5)*.9,w+=Math.cos(L)*11,X+=Math.sin(L)*11,oe.lineTo(w,X),oe.lineWidth=Math.max(1,5-O);oe.stroke()}const G=oe.createRadialGradient(64,64,2,64,64,30);G.addColorStop(0,"rgba(255,240,160,1)"),G.addColorStop(1,"rgba(255,90,0,0)"),oe.fillStyle=G,oe.fillRect(0,0,128,128);const me=new Et(J);return me.magFilter=Ia,me})(),g=new At(.25,.18,.22),f=new Ln({color:7034424}),p=new ji;p.fog=new ll(0,.02);const m=new Wi(85,e.aspect,.05,400),B=Sg(),d=new ae(new dt(9,9,300,24,1,!0).rotateX(Math.PI/2),B);p.add(d);const E=new mt({uniforms:{uTime:{value:0}},vertexShader:"uniform float uTime; varying vec2 vP; void main(){ vec3 p = position; vP = p.xy; p.z += sin(length(p.xy)*0.6 - uTime*2.)*0.5; gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.); }",fragmentShader:`uniform float uTime; varying vec2 vP;
      vec3 hsv(float h,float s,float v){ vec3 k=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.); return v*mix(vec3(1.),k,s); }
      void main(){ vec2 g = vP*0.6; vec2 r = vec2(g.x + g.y*0.577, g.y*1.155); vec2 f = fract(r); float tri = step(f.x, f.y);
        float b = 1. - smoothstep(0.0, 0.08, min(min(f.x, f.y), abs(f.x - f.y)));
        float br = 0.5 + 0.5*sin(length(vP)*0.6 - uTime*2.);
        vec3 c = hsv(fract(tri*0.5 + length(floor(r))*0.05 + uTime*0.15), .8, 0.25 + 0.5*br) + b*vec3(1.,.8,.4);
        gl_FragColor = vec4(c, 1.); }`}),I=new ae(new je(60,300,60,150).rotateX(-Math.PI/2),E);I.position.y=-6,p.add(I);const y=new Ue;p.add(y);const Q=[new Sa(6,0),new gu(4.2,0),new Al(2.8,0),new hu(1.6,0)].map((J,oe)=>{const G=new ae(J,new Se({color:16777215,wireframe:oe%2===0,transparent:!0,opacity:oe%2?.55:1}));return y.add(G),G}),D=[];for(let J=0;J<16;J++){const oe=a(J/16);oe.scale.setScalar(3+J%3),p.add(oe),D.push({e:oe,a:J/16*6.283,r:4+J%4*1.4,y:J%5-2,sp:.4+J%3*.25})}const v=new ji,T=new ko(-1,1,1,-1,0,1);v.add(new ae(new je(2,2),new Se({color:0,transparent:!0,opacity:.18,depthTest:!1,depthWrite:!1})));let F={x:0,y:0};addEventListener("mousemove",J=>{!u||u.t<un.engulf||(F.x=Math.max(-.6,Math.min(.6,F.x-J.movementX*.002)),F.y=Math.max(-.4,Math.min(.4,F.y-J.movementY*.002)))});function Z(J={}){const oe=a(.77);oe.scale.setScalar(11);const G=Qi(0,0,-1).applyQuaternion(e.quaternion).setY(0).normalize(),me=e.position.clone().addScaledVector(G,3.2);oe.position.set(me.x,-5,me.z),t.add(oe);const Ee=new ae(new je(1,1).rotateX(-Math.PI/2),new Se({map:c,transparent:!0,blending:Sn,depthWrite:!1}));Ee.position.set(e.position.x,A(e.position.x,e.position.z)+.02,e.position.z);const w=new Gn(16740384,0,12);w.position.copy(Ee.position).y+=.5,t.add(w);const X=[];for(let L=0;L<26;L++){const O=new ae(g,f);O.position.copy(Ee.position),t.add(O),X.push({m:O,v:Qi((Math.random()-.5)*6,4+Math.random()*6,(Math.random()-.5)*6),w:Qi(Math.random()*9,Math.random()*9,0),t0:Math.random()*1.5})}u={t:J.direct?un.engulf-.6:0,direct:!!J.direct,wl:J.worldLen||18,savedPos:(J.savedPos||e.position).clone(),savedQuat:(J.savedQuat||e.quaternion).clone(),giant:oe,crack:Ee,fissureLight:w,chunks:X,base:me,frag:-1,done:!1},J.direct?(oe.visible=!1,Ee.visible=!1,X.forEach(L=>L.m.visible=!1)):r("THE FLOOR IS... OPENING",3)}function x(){t.remove(u.giant,u.crack,u.fissureLight,...u.chunks.map(J=>J.m))}function z(J,oe){if(!u)return!1;u.t+=J;const G=u.t;B.uniforms.uTime.value=E.uniforms.uTime.value=oe/1e3;const me=un.engulf+u.wl,Ee=me+1.6;if(G<un.engulf&&u.direct)l.style.background="#000",l.style.opacity=String(Aa((G-un.engulf+.6)/.6));else if(G<un.engulf){const w=Aa(G/2.2),X=(G<un.erupt?.12:.05)*(1-yl((G-3)/2));u.crack.scale.setScalar(.5+w*5),u.fissureLight.intensity=30*w,u.chunks.forEach(re=>{const he=G-re.t0;he<0||(re.m.position.set(u.crack.position.x+re.v.x*he*.4,u.crack.position.y+re.v.y*he-4.9*he*he,u.crack.position.z+re.v.z*he*.4),re.m.rotation.set(re.w.x*he,re.w.y*he,0),re.m.position.y<0&&(re.m.position.y=0))});const L=Aa((G-.6)/2.6);u.giant.position.y=-5+L*(u.savedPos.y+2+5),i(u.giant,"idle",G,e,J);const O=u.giant.localToWorld(Qi(0,-.19,.2)),q=Aa((G-un.erupt)/(un.engulf-un.erupt));e.position.copy(u.savedPos).lerp(O,q*.97).add(Qi((Math.random()-.5)*X,(Math.random()-.5)*X,(Math.random()-.5)*X));const K=e.clone();K.lookAt(O),e.quaternion.copy(u.savedQuat).slerp(K.quaternion,Aa((G-1.5)/2)),l.style.background="#000",l.style.opacity=String(Aa((G-un.engulf+.6)/.6)),G>1.5&&G<1.6&&r("SOMETHING ENORMOUS IS VERY HAPPY TO SEE YOU",3),o.style.filter=`saturate(${1+w}) contrast(${1+w*.3})`}else if(G<me){u.inWorld||(u.inWorld=!0,x(),F={x:0,y:0},vg());const w=G-un.engulf;l.style.background=w<1?"#000":"#fff",l.style.opacity=String(w<1?1-w:Aa((w-(u.wl-1.6))/1.6)),m.position.set(Math.sin(w*.4)*1.5,Math.cos(w*.3)*1,-w*2.2),m.rotation.set(F.y+Math.sin(w*.5)*.1,F.x,Math.sin(w*.23)*.6,"YXZ"),d.position.z=m.position.z,I.position.z=m.position.z,y.position.set(0,0,m.position.z-22),Q.forEach((O,q)=>{O.rotation.set(w*(.3+q*.2)*(q%2?-1:1),w*(.5+q*.1),0),O.material.color.setHSL((w*.1+q*.25)%1,1,.6),O.scale.setScalar(1+.15*Math.sin(w*2+q))}),D.forEach((O,q)=>{const K=O.a+w*O.sp;O.e.position.set(Math.cos(K)*O.r,O.y+Math.abs(Math.sin(w*3+q))*1.2,m.position.z-8+Math.sin(K)*O.r),i(O.e,"idle",w+q,m,J)});const X=Math.floor(w/3);X!==u.frag&&X<6&&(u.frag=X,r(mA[X%mA.length],2.8));const L=oe/1e3;o.style.filter=`saturate(${2.2+Math.sin(L*2)}) hue-rotate(${L*60%360}deg) drop-shadow(${4+3*Math.sin(L*3)}px 0 rgba(255,0,80,.6)) drop-shadow(${-4-3*Math.sin(L*3)}px 0 rgba(0,255,240,.6))`,o.style.transform=`scale(${1.04+.03*Math.sin(L*1.7)}) skew(${3*Math.sin(L*.9)}deg, ${2*Math.sin(L*1.3)}deg) rotate(${2*Math.sin(L*.7)}deg)`,s.uPulse.value=1}else if(G<Ee){if(!u.back){u.back=!0,e.position.copy(u.savedPos),e.quaternion.copy(u.savedQuat);const w=new mn().setFromQuaternion(e.quaternion,"YXZ");w.x=0,w.z=0,e.quaternion.setFromEuler(w),o.style.filter="",o.style.transform="",r("WELCOME BACK.",4)}l.style.background="#fff",l.style.opacity=String(1-Aa((G-me)/(Ee-me)))}else{l.style.opacity="0",u.done=!0;const w=u;return u=null,{finished:!0,savedPos:w.savedPos}}return!0}function se(){return u&&u.inWorld&&!u.back?(n.render(v,T),n.clearDepth(),n.render(p,m),!0):!1}return{start:Z,update:z,render:se,get state(){return u}}}let wl=typeof window<"u"&&window.__elfLow===!0;function kg(t){wl=t==="low"||t===!0,ki=null}const li={uTime:{value:0},uPulse:{value:0}};function Xt(t,e=1){t=t.index?t.toNonIndexed():t,t.computeVertexNormals();const n=t.attributes.position.array,a=n.length/9,i=new Float32Array(n.length),s=new Float32Array(n.length/3),r=new Float32Array(n.length/3);for(let o=0;o<a;o++){const A=(n[o*9]+n[o*9+3]+n[o*9+6])/3,l=(n[o*9+1]+n[o*9+4]+n[o*9+7])/3,u=(n[o*9+2]+n[o*9+5]+n[o*9+8])/3,c=Math.abs(Math.sin(o*12.9898+A*78.233)*43758.5453)%1;for(let g=0;g<3;g++)i.set([A,l,u],o*9+g*3),s[o*3+g]=c,r[o*3+g]=e}return t.setAttribute("aCenter",new Ra(i,3)),t.setAttribute("aRand",new Ra(s,1)),t.setAttribute("aOpen",new Ra(r,1)),t}function zr(t){const e=new Ei,n=["position","normal","aCenter","aRand","aOpen"],a={};return n.forEach(i=>a[i]=[]),t.forEach(i=>n.forEach(s=>a[s].push(...i.attributes[s].array))),n.forEach(i=>e.setAttribute(i,new pi(a[i],t[0].attributes[i].itemSize))),e}const Li=new mt({uniforms:li,vertexShader:`attribute vec3 aCenter; attribute float aRand; attribute float aOpen; uniform float uTime;
    varying vec3 vN; varying vec3 vC; varying vec3 vP; varying float vR; varying vec3 vV; varying float vPh;
    void main(){
      float ph = dot(modelMatrix[3].xyz, vec3(1.3, 0.7, 2.1));
      float open = pow(max(0., sin(uTime*1.6 + ph + aRand*6.283)), 4.) * 0.022 * aOpen;   // facets drift apart (smaller facets, smaller gaps)
      float shimmer = 0.012 * sin(uTime*6. + aRand*40.) * aOpen;
      vec3 dir = normalize(aCenter + 1e-5);
      vec3 pos = position + dir * (open + shimmer);
      // facets twist about their centre while open (turning inside out)
      float a = open * 14. * (aRand - .5);
      vec3 lp = position - aCenter; pos = aCenter + dir*(open+shimmer) + vec3(lp.x*cos(a)-lp.y*sin(a), lp.x*sin(a)+lp.y*cos(a), lp.z);
      vN = normalize(normalMatrix * normal); vC = aCenter; vP = position; vR = aRand; vPh = ph;
      vec4 mv = modelViewMatrix * vec4(pos,1.); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform float uTime; uniform float uPulse; varying vec3 vN; varying vec3 vC; varying vec3 vP; varying float vR; varying vec3 vV; varying float vPh;
    vec3 hsv(float h,float s,float v){ vec3 k=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.); return v*mix(vec3(1.),k,s); }
    void main(){
      // harlequin diamonds + fluid mandala flowing over the facets
      vec2 d = vec2(vC.x + vC.y, vC.x - vC.y) * 9.;
      float harl = mod(floor(d.x) + floor(d.y), 2.);
      float r = length(vC.xy) * 14., ang = atan(vC.y, vC.x);
      float mand = sin(r - uTime*3. + vPh) + sin(abs(mod(ang*3., 2.094) - 1.047)*8. + uTime*2.);
      float h = fract(vR*0.08 + harl*0.18 + mand*0.06 + uTime*0.07 + vPh*0.37);
      float fres = pow(1. - max(dot(vN, vV), 0.), 2.);
      float lit = 0.5 + 0.5*max(dot(vN, normalize(vec3(.3,.9,.6))), 0.);
      vec3 c = hsv(h, 0.7, lit*(0.75+0.25*harl)) + fres * hsv(h + .33, .9, .9);
      // facet sparkle / emissive glints
      float spec = pow(max(dot(reflect(-vV, vN), normalize(vec3(.2,.8,.6))), 0.), 24.);
      float glint = step(0.93, fract(vR*61. + uTime*0.9)) * 0.9;
      c += vec3(1.) * (spec*0.8 + glint);
      // eyes opening on some facets (front half), pupils looking at the viewer
      float eyeOn = step(0.62, vR) * step(-0.02, vC.z) * smoothstep(0.2, 0.6, sin(uTime*1.3 + vR*30. + vPh));
      float de = length(vP - vC);
      if (eyeOn > 0. && de < 0.022) { c = mix(mix(vec3(1., .97, .6), vec3(.55, .9, 1.), step(de, 0.016)), vec3(.02), step(de, 0.009)); } // eye: white, iris ring, pupil
      // grin band: facets in the lower front open into glowing nested geometry
      if (vC.z > 0.07 && vC.y < -0.02 && vC.y > -0.11 && abs(vC.x) < 0.15) {
        float rings = fract(length(vP.xy - vec2(0., -0.07))*40. - uTime*2.);
        c = mix(vec3(0.03, 0., 0.05), hsv(fract(uTime*0.3 + rings), .9, 1.), step(0.7, rings));
      }
      c *= 1. + uPulse*0.25;
      gl_FragColor = vec4(floor(c*24.)/24., 1.);
    }`}),Dg=new mt({uniforms:li,fragmentShader:Li.fragmentShader,vertexShader:Li.vertexShader.replace("vN = normalize",`float fl = clamp((abs(position.x) - 0.06) / 0.25, 0., 1.); fl = fl * fl; float sg = sign(position.x);
      float w = uTime * 2.4 + ph + sg * 1.1;
      pos += vec3(sg * 0.035 * sin(w), -0.03 * (0.5 + 0.5 * sin(w * 1.3 + 0.7)) - 0.015, 0.06 * sin(w * 0.8 + sg)) * fl;
      vN = normalize`)}),xl=new Se({color:16777215}),bl=new Se({color:16777215,wireframe:!1}),Ql=new Se({color:16777215,wireframe:!0,transparent:!0,opacity:.35,depthWrite:!1}),IA=(t,e,n,a,i)=>{const s=new fu(t),r=new du(s,a,1,i,!1),o=r.attributes.position;for(let A=0;A<=a;A++){const l=A/a,u=s.getPointAt(l),c=e+(n-e)*l;for(let g=0;g<=i;g++){const f=A*(i+1)+g;o.setXYZ(f,u.x+(o.getX(f)-u.x)*c,u.y+(o.getY(f)-u.y)*c,u.z+(o.getZ(f)-u.z)*c)}}return r.computeVertexNormals(),r};let ki=null;function Tg(){if(ki)return ki;const t=wl,e=t?1:2,n=a=>t?Math.max(5,Math.round(a*.55)):a;return ki={shell:Xt(new Sa(.17,e)),core:new Sa(.1,t?1:2),cap:(()=>{const a=[Xt(new Qt(.165,n(24),n(10),0,6.283,0,1.5708).scale(1,.8,1).translate(0,.05,0),.2),Xt(new zn(.162,.016,n(8),n(32)).rotateX(Math.PI/2).scale(1,1,1).translate(0,.055,0),.1)];return[-1,1].forEach(i=>{a.push(Xt(IA([new j(i*.05,.15,0),new j(i*.13,.26,-.01),new j(i*.24,.24,.01),new j(i*.3,.12,.03),new j(i*.31,.035,.04)],.062,.008,n(28),n(12)),.25)),a.push(Xt(new Qt(.03,n(14),n(10)).translate(i*.31,0,.04),.3)),a.push(Xt(new zn(.03,.005,6,n(16)).rotateX(Math.PI/2).translate(i*.31,-.012,.04),.1)),a.push(Xt(new Qt(.008,6,4).translate(i*.31,-.03,.04),0))}),zr(a)})(),leg:zr([Xt(new dt(.024,.019,.11,n(12),2).translate(0,-.055,0),0),Xt(new Qt(.02,n(10),n(8)).translate(0,-.11,0),0),Xt(IA([new j(0,-.118,-.02),new j(0,-.122,.03),new j(0,-.11,.075),new j(0,-.085,.085)],.03,.008,n(12),n(10)),.4)]),arm:zr([Xt(new dt(.025,.02,.12,n(12),2).translate(0,-.06,0),0),Xt(new Qt(.022,n(10),n(8)).translate(0,-.005,0),0),Xt(new Qt(.034,n(14),n(10)).scale(1,1.15,.8).translate(0,-.135,0),.5),Xt(new Qt(.013,n(8),n(6)).scale(1,1.6,1).translate(.026,-.12,.012),.2)]),orb:new Sa(.06,t?0:1),halo:new Sa(.13,0)},ki}function ss(t=Math.random()){const e=Tg(),n=new Ue,a=new Ue;n.add(a);const i=new ae(e.shell,Li);a.add(i);const s=new ae(e.core,xl);a.add(s);const r=new ae(e.halo,Ql);s.add(r);const o=new ae(e.cap,Dg);a.add(o);const A=m=>{const B=new ae(e.arm,Li);return B.position.set(m,0,.04),a.add(B),B},l=A(-.17),u=A(.17),c=m=>{const B=new ae(e.leg,Li);return B.position.set(m,-.13,.02),a.add(B),B},g=c(-.07),f=c(.07),p=new ae(e.orb,bl);return p.position.set(0,.42,.1),a.add(p),n.userData.rig={body:a,shell:i,core:s,cap:o,armL:l,armR:u,legL:g,legR:f,orb:p,seed:t,glitch:0},n}const _g=(t,e)=>Math.floor(t*e)/e;function Un(t,e,n,a,i){const s=t.userData.rig,r=s.seed*10,o=_g(n+r,8);let A=0,l=1,u=.3,c=.3,g=0,f=0,p=0,m=0,B=.12;if(e==="walk"||e==="retreat"){const I=Math.abs(Math.sin((n+r)*9));A=I*.16,l=I<.15?.75:1+I*.08;{const y=Math.sin((n+r)*9);p=y*.8,m=-y*.8}g=(n+r)*(e==="retreat"?-9:9),u=-1+Math.sin(n*18)*.6,c=-1-Math.sin(n*18)*.6}else if(e==="scrub")c=-1.6+Math.sin((n+r)*22)*.7,u=-1.6-Math.sin((n+r)*22)*.7,A=Math.abs(Math.sin((n+r)*11))*.04,g=Math.sin(n*5)*.3,p=Math.sin((n+r)*11)*.25,m=-p,B=.3;else if(e==="carry"){u=c=-2.9+Math.sin((n+r)*8)*.2;const I=Math.abs(Math.sin((n+r)*12));A=I*.05,l=1-I*.1,p=Math.sin((n+r)*12)*.5,m=-p}else e==="peek"?(u=-2.6,c=-.4+Math.sin((n+r)*3.1)*.35,f=1,p=Math.sin((n+r)*2.7)*.2,m=Math.sin((n+r)*2.7+2)*.2,B=.18+.08*Math.sin((n+r)*3.7),g=Math.sin(o*4)*.2):(A=Math.abs(Math.sin((n+r)*6))*.08,u=-2.4+Math.sin(o*3)*.4,c=.2+Math.sin((n+r)*3.3)*.5,f=1,p=Math.sin((n+r)*6)*.35,m=-p,B=.15+.1*Math.sin((n+r)*4.1));s.body.position.y=-.12+A,s.body.scale.set(1/Math.sqrt(l),l,1/Math.sqrt(l)),s.armL.rotation.set(u,0,.5+Math.sin((n+r)*4.3)*.12),s.armR.rotation.set(c,0,-.5-Math.sin((n+r)*3.9)*.12),s.legL.rotation.set(p,0,-B),s.legR.rotation.set(m,0,B),s.shell.rotation.set(g*.25,Math.sin(o*1.1+r)*.4,Math.sin(o*.7)*.3),s.core.rotation.set(n*2.3,n*3.1,0),s.core.scale.setScalar(.8+.3*Math.sin(n*4+r)),s.cap.rotation.z=Math.sin((n+r)*1.7)*.18,s.cap.rotation.x=-A*1.2,s.cap.position.y=.06+Math.abs(Math.sin(n*9+r))*.03,s.orb.visible=f>0,s.orb.rotation.set(n*3,n*2,0),s.orb.scale.set(1+.4*Math.sin(n*5),1+.4*Math.sin(n*5+2),1+.4*Math.sin(n*5+4));const d=t.getWorldPosition(new j);t.lookAt(a.position.x,d.y,a.position.z),s.glitch>0?s.glitch-=i:Math.random()<i*.6&&(s.glitch=.12);const E=s.glitch>0;s.body.position.x=E?(Math.random()-.5)*.06:0,E&&(s.body.scale.x*=1.5)}function CA(t){const e=t/2e3%1;bl.color.setHSL(e,1,.65),xl.color.setHSL((e+.5)%1,1,.7),Ql.color.setHSL((e+.25)%1,1,.75)}kg(typeof matchMedia<"u"&&matchMedia("(pointer: coarse)").matches?"low":"hd");const BA="https://splats.tjm.art/hit",Ro=/(^|\.)tjm\.art$/.test(location.hostname);let Gi="",Xi=new Set,ci=new Set,Zs=0;try{Gi=sessionStorage.getItem("tjmSplatSid")||"",Xi=new Set(JSON.parse(sessionStorage.getItem("tjmSplatSent")||"[]"))}catch{}if(!/^[A-Za-z0-9_-]{16,40}$/.test(Gi)){const t=new Uint8Array(16);crypto.getRandomValues(t),Gi=[...t].map(e=>(e%36).toString(36)).join("")+"xx";try{sessionStorage.setItem("tjmSplatSid",Gi)}catch{}}function ur(t){if(clearTimeout(Zs),Zs=0,!ci.size||!Ro)return;const e=[...ci];ci.clear(),e.forEach(a=>Xi.add(a));try{sessionStorage.setItem("tjmSplatSent",JSON.stringify([...Xi]))}catch{}const n=JSON.stringify({sid:Gi,hits:e,test:window.__splatTest?1:0});try{if(t&&navigator.sendBeacon&&navigator.sendBeacon(BA,new Blob([n],{type:"text/plain"})))return;fetch(BA,{method:"POST",body:n,headers:{"content-type":"text/plain"},keepalive:!0,mode:"cors",credentials:"omit"}).catch(()=>{})}catch{}}function zg(t){!Ro||!t||Xi.has(t)||ci.has(t)||(ci.add(t),Zs||(Zs=setTimeout(()=>ur(!1),15e3)))}addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&ur(!0)});addEventListener("pagehide",()=>ur(!0));const Rg={flush:()=>ur(!1),get queued(){return[...ci]},get sent(){return[...Xi]},get on(){return Ro}},Fg=(t,e)=>{const n=document.createElement("canvas");return n.width=t,n.height=e,[n,n.getContext("2d")]};let EA=7;const ba=()=>(EA=EA*16807%2147483647)/2147483647;function Ng(t,e=1,n=1){const a=new Et(t);return a.magFilter=a.minFilter=Ia,a.generateMipmaps=!1,a.wrapS=a.wrapT=Nn,a.repeat.set(e,n),a.colorSpace=Ct,a}const vi=[[20,16,12],[39,30,22],[55,43,31],[71,55,39],[87,67,47],[107,83,59],[127,99,71],[59,51,35],[79,71,47],[99,91,63],[47,47,51],[67,67,71],[91,91,95],[119,115,111],[123,63,31],[159,83,35],[191,111,47],[227,155,63]];function Lg(t){const e=t.getContext("2d"),n=e.getImageData(0,0,t.width,t.height);for(let a=0;a<n.data.length;a+=4){let i=0,s=1e9;for(let r=0;r<vi.length;r++){const o=vi[r],A=(o[0]-n.data[a])**2+(o[1]-n.data[a+1])**2+(o[2]-n.data[a+2])**2;A<s&&(s=A,i=r)}n.data[a]=vi[i][0],n.data[a+1]=vi[i][1],n.data[a+2]=vi[i][2]}return e.putImageData(n,0,0),t}function Gg(t,e,n,a=900,i=.35){for(let s=0;s<a;s++){const r=ba()<.5?0:255;t.fillStyle=`rgba(${r},${r},${r},${ba()*i})`,t.fillRect(ba()*e|0,ba()*n|0,1+(ba()*2|0),1)}}function Ug(t,e){const[n,a]=Fg(32,64);for(let i=0;i<64;i++){const s=60+Math.sin(i*.7+ba())*12+ba()*10|0;a.fillStyle=`rgb(${s},${s*.72|0},${s*.48|0})`,a.fillRect(0,i,32,1)}return a.fillStyle="#1e1810",a.fillRect(15,0,1,64),Gg(a,32,64,300),Ng(Lg(n),t,e)}const yA="varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",Yg=`varying vec2 vUv; uniform sampler2D map; uniform float t, flick;
  void main(){ vec3 c = texture2D(map, vec2(vUv.x*.5, vUv.y)).rgb; float a = texture2D(map, vec2(.5+vUv.x*.5, vUv.y)).r;
    a = smoothstep(.08,.6,a) * smoothstep(1.,.86,vUv.y) * smoothstep(0.,.16,vUv.y) * smoothstep(0.,.07,vUv.x) * smoothstep(1.,.95,vUv.x);
    c = mix(c, c*vec3(.7,1.,1.15)+vec3(.0,.04,.07), .4);
    float sl = .86 + .14*sin(vUv.y*408.*3.14159 + t*6.);
    float band = smoothstep(.0,.02, abs(fract(vUv.y*.5 - t*.12)-.5)-.47);
    c *= sl * flick * (1. + .5*(1.-band));
    gl_FragColor = vec4(c*.95, a*.9*flick);
    #include <colorspace_fragment>
  }`;let Rr=null;function qg(){if(Rr)return Rr;const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=e.createRadialGradient(64,64,4,64,64,64);return n.addColorStop(0,"rgba(160,240,255,1)"),n.addColorStop(.35,"rgba(70,200,255,.55)"),n.addColorStop(.8,"rgba(40,140,255,.15)"),n.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=n,e.fillRect(0,0,128,128),Rr=new Et(t)}function Pg(t,e,n,a){const i=e.h||1.62,s=i*e.asp,r=new Ue;r.position.set(e.x,e.y,e.z),t.add(r);const o=document.createElement("video");Object.assign(o,{src:a+e.src,loop:!0,muted:!0,playsInline:!0,crossOrigin:"anonymous",preload:"metadata"}),o.setAttribute("playsinline",""),o.setAttribute("webkit-playsinline","");const A=new is().load(a+e.still),l=new pu(o);l.colorSpace=A.colorSpace=Ct;const u={map:{value:A},t:{value:0},flick:{value:1}},c=new ae(new je(s,i),new mt({uniforms:u,vertexShader:yA,fragmentShader:Yg,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1,side:tn}));c.position.y=.06+i/2,c.renderOrder=5,r.add(c);const g={transparent:!0,depthWrite:!1,blending:Sn,toneMapped:!1,fog:!1},f=new ae(new as(.95,48),new Se({map:qg(),...g}));f.rotation.x=-Math.PI/2,f.position.y=.012,r.add(f);const p=new ae(new mu(.62,.68,64),new Se({color:6741503,...g,opacity:.8}));p.rotation.x=-Math.PI/2,p.position.y=.015,r.add(p);const m=new ae(new dt(.75,.6,i+.2,40,1,!0),new mt({...g,side:tn,uniforms:u,vertexShader:yA,fragmentShader:"varying vec2 vUv; uniform float flick; void main(){ gl_FragColor = vec4(vec3(.25,.7,1.)*.11*(1.-vUv.y)*flick, 1.); }"}));if(m.position.y=(i+.2)/2,r.add(m),!n){const B=new Gn(6737151,2.5,5,2);B.position.y=.4,r.add(B)}return{d:e,root:r,video:o,vtex:l,still:A,uni:u,plane:c,ring:p,gain:null,pan:null,pauseAt:0,playing:!1}}function Hg(t,e,n,{low:a=!1,base:i=""}={}){const s=n.map(x=>Pg(t,x,a,i)),r=1.5,o=.12;s.forEach(x=>{const z=x.d.b;x.pv=1,x.far=z?Math.max(...[[z.minX,z.minZ],[z.minX,z.maxZ],[z.maxX,z.minZ],[z.maxX,z.maxZ]].map(([se,J])=>Math.hypot(se-x.d.x,J-x.d.z))):12});const A=(x,z)=>{const se=Math.min(1,Math.max(0,(z-r)/(x.far-r))),J=se*se*(3-2*se);return 1-(1-o)*J};let l=null,u=null,c=!1,g=!1,f=!1,p=null,m=0;const B=.4,d=x=>{x.uni.map.value=!f&&x.playing?x.vtex:x.still};s.forEach(x=>{x.video.addEventListener("playing",()=>{x.playing=!0,d(x)}),x.video.addEventListener("pause",()=>{x.playing=!1,d(x)})});const E=()=>!c&&!document.hidden;function I(x){s.forEach(z=>{const se=z===p?1:0;z.gain?x?z.gain.gain.value=se:z.gain.gain.setTargetAtTime(se,l.currentTime,B):z.video.muted=!(g&&se&&E())}),u&&u.gain.setTargetAtTime(E()?.7:0,l.currentTime,.08)}const y=x=>{x.pauseAt=0,!document.hidden&&x.video.play().catch(()=>{})};function Q(){if(g){l&&l.state==="suspended"&&l.resume();return}g=!0;try{l=new(window.AudioContext||window.webkitAudioContext),u=l.createGain(),u.connect(l.destination),s.forEach(x=>{const z=l.createMediaElementSource(x.video);x.pan=l.createStereoPanner?l.createStereoPanner():null,x.gain=l.createGain(),x.gain.gain.value=x===p?1:0,x.prox=l.createGain(),x.prox.gain.value=x.pv,(x.pan?z.connect(x.pan).connect(x.prox):z.connect(x.prox)).connect(x.gain).connect(u),x.video.muted=!1})}catch{l=null,u=null,s.forEach(z=>{z.gain=null})}I(!0),p&&y(p)}addEventListener("visibilitychange",()=>{document.hidden?s.forEach(x=>x.video.pause()):p&&y(p),I()});const D=new j;function v(x,z,se){const J=s.find(G=>G.d.room===se)||null;if(J!==p){const G=p;p=J,m++,G&&(G.pauseAt=z+(g?2e3:0)),p&&y(p),I(!g)}const oe=e.position;D.set(1,0,0).applyQuaternion(e.quaternion);for(const G of s){G.pauseAt&&z>=G.pauseAt&&G!==p&&(G.pauseAt=0,G.video.pause()),G===p&&g&&G.video.paused&&!document.hidden&&y(G),G.uni.t.value=z/1e3,G.uni.flick.value=.93+.05*Math.sin(z/37+G.d.x)+(Math.random()<.01?-.25:0);const me=G.d.x-oe.x,Ee=G.d.z-oe.z;if(G.plane.rotation.y=Math.atan2(-me,-Ee),G.ring.rotation.z+=x*.4,G===p){const w=A(G,Math.hypot(me,Ee));Math.abs(w-G.pv)>.003&&(G.pv=w,G.prox?G.prox.gain.setTargetAtTime(w,l.currentTime,.15):G.gain||(G.video.volume=w))}if(G.pan&&G===p){const w=Math.hypot(me,Ee)||1;G.pan.pan.setTargetAtTime(Math.max(-1,Math.min(1,(me*D.x+Ee*D.z)/w))*.3,l.currentTime,.1)}}}function T(x){f=x,s.forEach(d)}function F(){return c=!c,Q(),I(),c}function Z(x,z){return c=!!x,z&&Q(),I(),c}return{H:s,begin:Q,update:v,toggleMute:F,setMuted:Z,setLowStill:T,get muted(){return c},get state(){return{started:g,ctx:l&&l.state,active:p&&p.d.room,switches:m,lowStill:f,holos:s.map(x=>({room:x.d.room,paused:x.video.paused,t:+x.video.currentTime.toFixed(2),gain:x.gain?+x.gain.gain.value.toFixed(3):x.video.muted?0:1,prox:x.prox?+x.prox.gain.value.toFixed(3):+x.pv.toFixed(3),proxTarget:+x.pv.toFixed(3),far:+x.far.toFixed(1),video:x.uni.map.value===x.vtex}))}}}}const Jg=.44,gn=.4,Fr=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,la=t=>{const e=new Se(t);return e.toneMapped=!1,e.fog=!1,e};function Og({scene:t,camera:e,controls:n,defs:a,base:i="",low:s=!1,stone:r,pillars:o,isMuted:A,onReading:l}){const u=new is;u.setCrossOrigin("anonymous");const c=new Map;function g(b,M){let _=c.get(b);return _?(_.t&&_.ok?M&&M(_.t):M&&_.cbs.push(M),_):(_={t:null,ok:!1,cbs:M?[M]:[],used:performance.now()},c.set(b,_),_.t=u.load(b,ge=>{ge.colorSpace=Ct,ge.anisotropy=4,_.ok=!0,_.cbs.forEach(te=>te(ge)),_.cbs=[]},void 0,()=>{c.delete(b)}),_)}const f=(b,M,_)=>`${i}books/${b.d.id}/${String(M).padStart(3,"0")}-${_}.webp`,p=(()=>{const b=document.createElement("canvas");b.width=b.height=128;const M=b.getContext("2d"),_=M.createRadialGradient(64,64,2,64,64,64);_.addColorStop(0,"rgba(255,225,170,.9)"),_.addColorStop(.5,"rgba(255,190,120,.35)"),_.addColorStop(1,"rgba(0,0,0,0)"),M.fillStyle=_,M.fillRect(0,0,128,128);const ge=new Et(b);return ge.colorSpace=Ct,ge})(),m={transparent:!0,depthWrite:!1,blending:Sn,toneMapped:!1,fog:!1},B=15985884,d=4858902,E=a.map(b=>{const M=gn*b.aspect,_=new Ue;_.position.set(b.x,0,b.z),_.rotation.y=b.yaw,t.add(_);const ge=new ae(new At(.34,.82,.34),r);ge.position.y=.47,_.add(ge);const te=new ae(new At(.62,.12,.62),r);te.position.y=.06,_.add(te);const fe=new Ue;fe.position.set(0,1.06,0),fe.rotation.x=Jg,_.add(fe);const Be=new ae(new At(2*M+.14,.05,gn+.12),r);Be.position.y=-.025,fe.add(Be);const be=new Ue;be.rotation.x=-Math.PI/2,be.position.y=.002,fe.add(be);const qe=(We,$e,Ne,Le,Oe,pt=0)=>{const jt=new ae(new je(We,$e),Ne);return jt.position.set(Le,0,Oe),jt.rotation.y=pt,jt},Me=new ae(new At(M,gn,.03),la({color:15261900}));Me.position.set(M/2,0,.015),be.add(Me);const we=Me.clone();we.position.x=-M/2,we.visible=!1,be.add(we);const it=qe(M+.01,gn+.01,la({color:d,side:tn}),M/2,-.002);be.add(it);const k=qe(M,gn,la({color:B}),-M/2,.031);k.visible=!1,be.add(k);const N=qe(M,gn,la({color:B}),M/2,.031);be.add(N);const W=new Ue;W.position.z=.0335,be.add(W);const ce=la({color:16777215});g(i+b.cover,We=>{ce.map=We,ce.needsUpdate=!0});const Y=qe(M+.008,gn+.008,ce,M/2,.001);W.add(Y);const Qe=qe(M+.008,gn+.008,la({color:5909530}),M/2,-.001,Math.PI);W.add(Qe);const C=new Ue;C.position.z=.033,C.visible=!1,be.add(C);const U=qe(M,gn,la({color:B}),M/2,5e-4),V=qe(M,gn,la({color:B}),M/2,-5e-4,Math.PI);C.add(U,V);const ne=new ae(new as(1.3,40),new Se({map:p,...m,opacity:.55}));ne.rotation.x=-Math.PI/2,ne.position.y=.015,_.add(ne);const P=new ae(new dt(.12,.9,2.6,32,1,!0),new Se({color:16766880,...m,opacity:.05,side:tn}));P.position.y=1.4,_.add(P);const _e=new ae(new je(2*M+.5,gn+.4),new Se({map:p,...m,opacity:.35}));if(_e.rotation.x=-Math.PI/2,_e.position.y=.003,fe.add(_e),!s){const We=new ul(16766624,6,5,.5,.7,1.5);We.position.set(0,3.4,.6),We.target=fe,_.add(We)}o&&o.push([b.x,b.z]);const Fe=b.pages,ke=Math.floor(Fe/2)+1;return{d:b,W:M,g:_,desk:fe,book:be,block:Me,blockL:we,pageL:k,pageR:N,coverPivot:W,turn:C,tF:U,tB:V,hit:[ge,Be,Y,Me],npg:Fe,spreads:ke,spread:0}}),I=E.flatMap(b=>b.hit.map(M=>(M.userData.book=b,M))),y=(b,M)=>M===0?0:2*M,Q=(b,M)=>2*M+1;function D(b,M,_,ge){const te=b.material;if(!_||_>M.npg){te.map=null,te.color.set(B),te.needsUpdate=!0,b.userData.n=0;return}b.userData.n=_,te.color.set(16777215);const fe=()=>{for(const be of ge?["hi","md","lo"]:["md","lo"]){const qe=c.get(f(M,_,be));if(qe&&qe.ok)return qe.t}return null},Be=()=>{if(b.userData.n!==_)return;const be=fe();be&&te.map!==be?(te.map=be,te.needsUpdate=!0):!be&&!te.map&&te.color.set(B)};te.map&&!(te.map.userData&&te.map.userData.n===_)&&(te.map=null,te.needsUpdate=!0),g(f(M,_,"lo"),be=>{be.userData.n=_,Be()}),g(f(M,_,"md"),be=>{be.userData.n=_,Be()}),ge&&g(f(M,_,"hi"),be=>{be.userData.n=_,Be()}),Be()}function v(b,M){for(let _=M-2;_<=M+3;_++)if(!(_<0||_>=b.spreads))for(const ge of[y(b,_),Q(b,_)])ge&&ge<=b.npg&&(g(f(b,ge,"lo")),Math.abs(_-M)<=2&&g(f(b,ge,"md")));for(const[_,ge]of c){const te=_.match(/books\/([^/]+)\/(\d+)-(hi|md)\.webp$/);if(!te||te[1]!==b.d.id||!ge.ok)continue;const fe=+te[2],Be=Math.floor(fe/2);(te[3]==="hi"&&Be!==M||te[3]==="md"&&Math.abs(Be-M)>3)&&(ge.t.dispose(),c.delete(_))}}function T(b,M){b.spread=M,D(b.pageL,b,y(b,M),!0),D(b.pageR,b,Q(b,M),!0),b.pageL.visible=M>0||z===b,v(b,M),x.update()}let F=null;function Z(){if(!(A&&A()))try{F=F||new(window.AudioContext||window.webkitAudioContext),F.state==="suspended"&&F.resume();const b=F.sampleRate*.45,M=F.createBuffer(1,b,F.sampleRate),_=M.getChannelData(0);for(let Be=0;Be<b;Be++){const be=Be/b;_[Be]=(Math.random()*2-1)*Math.pow(Math.sin(Math.PI*Math.min(1,be*1.6)),2)*(.6+.4*Math.sin(be*40))}const ge=F.createBufferSource();ge.buffer=M;const te=F.createBiquadFilter();te.type="bandpass",te.frequency.value=2400,te.Q.value=.7;const fe=F.createGain();fe.gain.value=.16,ge.connect(te).connect(fe).connect(F.destination),ge.start()}catch{}}const x=(()=>{const b=document.createElement("div");b.id="bookui",b.hidden=!0,b.innerHTML='<div class="bk-top"><b class="bk-title"></b><a class="bk-link" target="_blank" rel="noopener">View on tjm.art ↗</a><button type="button" class="bk-close" aria-label="Close book">✕ Close</button></div><div class="bk-bot"><button type="button" class="bk-prev" aria-label="Previous pages">‹</button><span class="bk-pg"></span><button type="button" class="bk-next" aria-label="Next pages">›</button></div>',document.body.appendChild(b);const M=_=>b.querySelector(_);return["mousedown","pointerdown","touchstart","touchend","click","mouseup"].forEach(_=>b.querySelectorAll("button,a").forEach(ge=>ge.addEventListener(_,te=>te.stopPropagation(),{passive:_!=="click"}))),M(".bk-close").addEventListener("click",()=>L(!0)),M(".bk-prev").addEventListener("click",()=>O(-1)),M(".bk-next").addEventListener("click",()=>O(1)),{el:b,update(){const _=z||se;if(!_)return;M(".bk-title").textContent=_.d.title,M(".bk-link").href=_.d.url;const ge=y(_,_.spread),te=Q(_,_.spread);M(".bk-pg").textContent=_.spread===0?`p. 1 / ${_.npg}`:te<=_.npg?`pp. ${ge}–${te} / ${_.npg}`:`p. ${ge} / ${_.npg}`,M(".bk-prev").disabled=_.spread===0,M(".bk-next").disabled=_.spread>=_.spreads-1}}})();let z=null,se=null,J=null,oe=null,G=0;const me=document.createElement("div");me.id="bookhint",me.hidden=!0,document.body.appendChild(me);function Ee(b){b.desk.updateMatrixWorld(!0);const M=new j(0,.03,0).applyMatrix4(b.desk.matrixWorld),_=new j(0,1,0).transformDirection(b.desk.matrixWorld),ge=new j(0,0,-1).transformDirection(b.desk.matrixWorld),te=Math.tan(ys.degToRad(e.fov/2)),fe=Math.max(gn*1.3/2/te,b.W*2*1.18/2/(te*e.aspect)),Be=M.clone().addScaledVector(_,fe),be=new Zt().lookAt(Be,M,ge);return{pos:Be,quat:new Rt().setFromRotationMatrix(be)}}function w(b){if(z||se||J)return;se=b,window.__reading=!0,l&&l(!0),oe={pos:e.position.clone(),quat:e.quaternion.clone(),locked:n.isLocked},n.isLocked&&n.unlock(),b.spread=0,T(b,0),b.pageL.visible=!1,x.el.hidden=!1,x.update(),me.hidden=!0;const M=Ee(b);J={t:0,dur:1.1,kind:"open",b,from:{pos:e.position.clone(),quat:e.quaternion.clone()},to:M}}let X=null;function L(b){if(J&&(J.kind==="flip"||J.kind==="open")){X={relock:b},G=0;return}const M=z;!M||J||(X=null,G=0,J={t:0,dur:.9,kind:"close",b:M,from:{pos:e.position.clone(),quat:e.quaternion.clone()},to:oe,relock:b})}function O(b){const M=z;if(!M)return;if(J){J.kind==="flip"&&(G=Math.max(-3,Math.min(3,G+b)));return}const _=M.spread+b;_<0||_>=M.spreads||(Z(),M.turn.visible=!0,b>0?(D(M.tF,M,Q(M,M.spread),!0),D(M.tB,M,y(M,_),!0),D(M.pageR,M,Q(M,_),!0),M.turn.rotation.y=0):(D(M.tF,M,Q(M,_),!0),D(M.tB,M,y(M,M.spread),!0),D(M.pageL,M,y(M,_),!0),M.turn.rotation.y=-Math.PI,_===0&&(M.pageL.visible=!1)),b>0&&M.spread===0&&(M.pageL.visible=!1),J={t:0,dur:s?.5:.65,kind:"flip",b:M,dir:b,s:_})}let q=performance.now();function K(){const b=performance.now(),M=Math.min(.5,(b-q)/1e3);if(q=b,J){J.t+=M;const _=Math.min(1,J.t/J.dur),ge=Fr(_),te=J,fe=te.b;if(te.kind==="open"||te.kind==="close"){e.position.lerpVectors(te.from.pos,te.to.pos,ge),e.quaternion.slerpQuaternions(te.from.quat,te.to.quat,ge);const Be=te.kind==="open"?ys.clamp((_-.35)/.65,0,1):ys.clamp(1-_/.6,0,1);fe.coverPivot.rotation.y=-Math.PI*Fr(Be),fe.coverPivot.position.z=.0335-.0375*ys.clamp((Fr(Be)-.5)*2,0,1),fe.blockL.visible=Be>.5,fe.pageL.visible=Be>.92&&fe.spread>0,te.kind==="open"&&Be>.92&&(fe.pageL.visible=!0)}else if(te.kind==="flip"){const Be=te.dir>0?-Math.PI*ge:-Math.PI*(1-ge);fe.turn.rotation.y=Be,fe.turn.position.z=.033+Math.sin(Math.PI*ge)*.02}if(_>=1){if(J=null,X&&te.kind!=="close"){const Be=X;X=null,te.kind==="open"?(z=fe,se=null):(fe.turn.visible=!1,T(fe,te.s)),fe.pageL.visible=!0,L(Be.relock);return}if(te.kind==="open")z=fe,se=null,fe.pageL.visible=!0,D(fe.pageL,fe,0,!0),x.update();else if(te.kind==="close"){if(z=null,x.el.hidden=!0,fe.coverPivot.rotation.y=0,fe.coverPivot.position.z=.0335,fe.blockL.visible=!1,fe.pageL.visible=!1,fe.spread=0,D(fe.pageR,fe,1,!1),window.__reading=!1,l&&l(!1),te.relock!==!1)try{n.lock()}catch{}}else if(fe.turn.visible=!1,T(fe,te.s),fe.pageL.visible=!0,G){const Be=Math.sign(G);G-=Be,O(Be)}}}if(!z&&!J){const _=ie();me.hidden=!_,_&&(me.textContent=(matchMedia("(pointer:coarse)").matches?"Tap":"E / click")+" to read “"+_.d.title+"”")}}const re=new Mo,he=new ze;function ie(){let b=null,M=2.6;for(const _ of E){const ge=_.d.x-e.position.x,te=_.d.z-e.position.z,fe=Math.hypot(ge,te);if(fe>M)continue;const Be=new j;e.getWorldDirection(Be),(Be.x*ge+Be.z*te)/(fe||1)>.55&&(b=_,M=fe)}return b}function pe(b){if(z||J)return!1;e.updateMatrixWorld(),re.setFromCamera(b||he.set(0,0),e),re.far=3.2;const M=re.intersectObjects(I,!1)[0];if(M)return w(M.object.userData.book),!0;if(!b){const _=ie();if(_)return w(_),!0}return!1}addEventListener("keydown",b=>{z&&(b.code==="ArrowRight"||b.code==="KeyD"||b.code==="PageDown"||b.code==="Space"?(O(1),b.preventDefault()):b.code==="ArrowLeft"||b.code==="KeyA"||b.code==="PageUp"?(O(-1),b.preventDefault()):b.code==="Escape"&&L(!1))},!0);let ye=null;return addEventListener("pointerdown",b=>{!z||b.target.closest&&b.target.closest("#bookui,#soundbtn,#homebtn,#hud")||(ye={x:b.clientX,y:b.clientY,t:performance.now()})},!0),addEventListener("pointerup",b=>{if(!z||!ye)return;const M=b.clientX-ye.x,_=b.clientY-ye.y,ge=ye;if(ye=null,Math.abs(M)>40&&Math.abs(M)>Math.abs(_)){O(M<0?1:-1);return}Math.hypot(M,_)<12&&performance.now()-ge.t<500&&O(b.clientX>innerWidth/2?1:-1)},!0),{B:E,update:K,tryOpen:pe,open:w,close:L,flip:O,get reading(){return!!z||!!J},get state(){const b=z||se;return{reading:!!z,anim:J&&J.kind,book:b&&b.d.id,spread:b&&b.spread,left:b&&b.pageL.userData.n,right:b&&b.pageR.userData.n,leftTex:b&&b.pageL.material.map&&b.pageL.material.map.image&&b.pageL.material.map.image.width,rightTex:b&&b.pageR.material.map&&b.pageR.material.map.image&&b.pageR.material.map.image.width,cached:c.size,hint:me.hidden?null:me.textContent}}}}const Vg=new ko(-1,1,1,-1,0,1);let jg=class extends Ei{constructor(){super(),this.setAttribute("position",new pi([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new pi([0,2,0,0,2,0],2))}};const Wg=new jg;let vl=class{constructor(e){this._mesh=new ae(Wg,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Vg)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var kt=Uint8Array,Ui=Uint16Array,Xg=Int32Array,Sl=new kt([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ml=new kt([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Kg=new kt([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),kl=function(t,e){for(var n=new Ui(31),a=0;a<31;++a)n[a]=e+=1<<t[a-1];for(var i=new Xg(n[30]),a=1;a<30;++a)for(var s=n[a];s<n[a+1];++s)i[s]=s-n[a]<<5|a;return{b:n,r:i}},Dl=kl(Sl,2),Tl=Dl.b,Zg=Dl.r;Tl[28]=258,Zg[258]=28;var $g=kl(Ml,0),eh=$g.b,_l=new Ui(32768);for(var ot=0;ot<32768;++ot){var ca=(ot&43690)>>1|(ot&21845)<<1;ca=(ca&52428)>>2|(ca&13107)<<2,ca=(ca&61680)>>4|(ca&3855)<<4,_l[ot]=((ca&65280)>>8|(ca&255)<<8)>>1}var Yi=function(t,e,n){for(var a=t.length,i=0,s=new Ui(e);i<a;++i)t[i]&&++s[t[i]-1];var r=new Ui(e);for(i=1;i<e;++i)r[i]=r[i-1]+s[i-1]<<1;var o;{o=new Ui(1<<e);var A=15-e;for(i=0;i<a;++i)if(t[i])for(var l=i<<4|t[i],u=e-t[i],c=r[t[i]-1]++<<u,g=c|(1<<u)-1;c<=g;++c)o[_l[c]>>A]=l}return o},rs=new kt(288);for(var ot=0;ot<144;++ot)rs[ot]=8;for(var ot=144;ot<256;++ot)rs[ot]=9;for(var ot=256;ot<280;++ot)rs[ot]=7;for(var ot=280;ot<288;++ot)rs[ot]=8;var zl=new kt(32);for(var ot=0;ot<32;++ot)zl[ot]=5;var th=Yi(rs,9),nh=Yi(zl,5),Nr=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},In=function(t,e,n){var a=e/8|0;return(t[a]|t[a+1]<<8)>>(e&7)&n},Lr=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},Rl=function(t){return(t+7)/8|0},ui=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new kt(t.subarray(e,n))},ah=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Jt=function(t,e,n){var a=new Error(e||ah[t]);if(a.code=t,Error.captureStackTrace&&Error.captureStackTrace(a,Jt),!n)throw a;return a},Fl=function(t,e,n,a){var i=t.length,s=a?a.length:0;if(!i||e.f&&!e.l)return n||new kt(0);var r=!n,o=r||e.i!=2,A=e.i;r&&(n=new kt(i*3));var l=function(M){var _=n.length;if(M>_){var ge=new kt(Math.max(_*2,M));ge.set(n),n=ge}},u=e.f||0,c=e.p||0,g=e.b||0,f=e.l,p=e.d,m=e.m,B=e.n,d=i*8;do{if(!f){u=In(t,c,1);var E=In(t,c+1,3);if(c+=3,E)if(E==1)f=th,p=nh,m=9,B=5;else if(E==2){var D=In(t,c,31)+257,v=In(t,c+10,15)+4,T=D+In(t,c+5,31)+1;c+=14;for(var F=new kt(T),Z=new kt(19),x=0;x<v;++x)Z[Kg[x]]=In(t,c+x*3,7);c+=v*3;for(var z=Nr(Z),se=(1<<z)-1,J=Yi(Z,z),x=0;x<T;){var oe=J[In(t,c,se)];c+=oe&15;var I=oe>>4;if(I<16)F[x++]=I;else{var G=0,me=0;for(I==16?(me=3+In(t,c,3),c+=2,G=F[x-1]):I==17?(me=3+In(t,c,7),c+=3):I==18&&(me=11+In(t,c,127),c+=7);me--;)F[x++]=G}}var Ee=F.subarray(0,D),w=F.subarray(D);m=Nr(Ee),B=Nr(w),f=Yi(Ee,m),p=Yi(w,B)}else Jt(1);else{var I=Rl(c)+4,y=t[I-4]|t[I-3]<<8,Q=I+y;if(Q>i){A&&Jt(0);break}o&&l(g+y),n.set(t.subarray(I,Q),g),e.b=g+=y,e.p=c=Q*8,e.f=u;continue}if(c>d){A&&Jt(0);break}}o&&l(g+131072);for(var X=(1<<m)-1,L=(1<<B)-1,O=c;;O=c){var G=f[Lr(t,c)&X],q=G>>4;if(c+=G&15,c>d){A&&Jt(0);break}if(G||Jt(2),q<256)n[g++]=q;else if(q==256){O=c,f=null;break}else{var K=q-254;if(q>264){var x=q-257,re=Sl[x];K=In(t,c,(1<<re)-1)+Tl[x],c+=re}var he=p[Lr(t,c)&L],ie=he>>4;he||Jt(3),c+=he&15;var w=eh[ie];if(ie>3){var re=Ml[ie];w+=Lr(t,c)&(1<<re)-1,c+=re}if(c>d){A&&Jt(0);break}o&&l(g+131072);var pe=g+K;if(g<w){var ye=s-w,b=Math.min(w,pe);for(ye+g<0&&Jt(3);g<b;++g)n[g]=a[ye+g]}for(;g<pe;++g)n[g]=n[g-w]}}e.l=f,e.p=O,e.b=g,e.f=u,f&&(u=1,e.m=m,e.d=p,e.n=B)}while(!u);return g!=n.length&&r?ui(n,0,g):n.subarray(0,g)},ih=new kt(0),Dn=function(t,e){return t[e]|t[e+1]<<8},En=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},Gr=function(t,e){return En(t,e)+En(t,e+4)*4294967296},sh=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&Jt(6,"invalid gzip data");var e=t[3],n=10;e&4&&(n+=(t[10]|t[11]<<8)+2);for(var a=(e>>3&1)+(e>>4&1);a>0;a-=!t[n++]);return n+(e&2)},Ur=function(){function t(e,n){typeof e=="function"&&(n=e,e={}),this.ondata=n;var a=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:a?a.length:0},this.o=new kt(32768),this.p=new kt(0),a&&this.o.set(a)}return t.prototype.e=function(e){if(this.ondata||Jt(5),this.d&&Jt(4),!this.p.length)this.p=e;else if(e.length){var n=new kt(this.p.length+e.length);n.set(this.p),n.set(e,this.p.length),this.p=n}},t.prototype.c=function(e){this.s.i=+(this.d=e||!1);var n=this.s.b,a=Fl(this.p,this.s,this.o);this.ondata(ui(a,n,this.s.b),this.d),this.o=ui(a,this.s.b-32768),this.s.b=this.o.length,this.p=ui(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(e,n){this.e(e),this.c(n)},t}();function rh(t,e){return Fl(t,{i:2},e&&e.out,e&&e.dictionary)}var oh=function(){function t(e,n){this.v=1,this.r=0,Ur.call(this,e,n)}return t.prototype.push=function(e,n){if(Ur.prototype.e.call(this,e),this.r+=e.length,this.v){var a=this.p.subarray(this.v-1),i=a.length>3?sh(a):4;if(i>a.length){if(!n)return}else this.v>1&&this.onmember&&this.onmember(this.r-a.length);this.p=a.subarray(i),this.v=0}Ur.prototype.c.call(this,n),this.s.f&&!this.s.l&&!n&&(this.v=Rl(this.s.p)+9,this.s={i:0},this.o=new kt(0),this.push(new kt(0),n))},t}(),lo=typeof TextDecoder<"u"&&new TextDecoder,Ah=0;try{lo.decode(ih,{stream:!0}),Ah=1}catch{}var lh=function(t){for(var e="",n=0;;){var a=t[n++],i=(a>127)+(a>223)+(a>239);if(n+i>t.length)return{s:e,r:ui(t,n-1)};i?i==3?(a=((a&15)<<18|(t[n++]&63)<<12|(t[n++]&63)<<6|t[n++]&63)-65536,e+=String.fromCharCode(55296|a>>10,56320|a&1023)):i&1?e+=String.fromCharCode((a&31)<<6|t[n++]&63):e+=String.fromCharCode((a&15)<<12|(t[n++]&63)<<6|t[n++]&63):e+=String.fromCharCode(a)}};function ch(t,e){if(e){for(var n="",a=0;a<t.length;a+=16384)n+=String.fromCharCode.apply(null,t.subarray(a,a+16384));return n}else{if(lo)return lo.decode(t);var i=lh(t),s=i.s,n=i.r;return n.length&&Jt(8),s}}var uh=function(t,e){return e+30+Dn(t,e+26)+Dn(t,e+28)},gh=function(t,e,n){var a=Dn(t,e+28),i=ch(t.subarray(e+46,e+46+a),!(Dn(t,e+8)&2048)),s=e+46+a,r=En(t,e+20),o=n&&r==4294967295?hh(t,s):[r,En(t,e+24),En(t,e+42)],A=o[0],l=o[1],u=o[2];return[Dn(t,e+10),A,l,i,s+Dn(t,e+30)+Dn(t,e+32),u]},hh=function(t,e){for(;Dn(t,e)!=1;e+=4+Dn(t,e+2));return[Gr(t,e+12),Gr(t,e+4),Gr(t,e+20)]};function fh(t,e){for(var n={},a=t.length-22;En(t,a)!=101010256;--a)(!a||t.length-a>65558)&&Jt(13);var i=Dn(t,a+8);if(!i)return{};var s=En(t,a+16),r=s==4294967295||i==65535;if(r){var o=En(t,a-12);r=En(t,o)==101075792,r&&(i=En(t,o+32),s=En(t,o+48))}for(var A=e&&e.filter,l=0;l<i;++l){var u=gh(t,s,r),c=u[0],g=u[1],f=u[2],p=u[3],m=u[4],B=u[5],d=uh(t,B);s=m,(!A||A({name:p,size:g,originalSize:f,compression:c}))&&(c?c==8?n[p]=rh(t.subarray(d,d+g),{out:new kt(f)}):Jt(14,"unknown compression type "+c):n[p]=ui(t,d,d+g))}return n}let Kn;const Nl=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&Nl.decode();let Di=null;function dh(){return(Di===null||Di.byteLength===0)&&(Di=new Uint8Array(Kn.memory.buffer)),Di}function ph(t,e){return t=t>>>0,Nl.decode(dh().subarray(t,t+e))}function mh(t,e,n,a,i,s,r,o,A,l,u,c,g){return Kn.raycast_splats(t,e,n,a,i,s,r,o,A,l,u,c,g)}async function Ih(t,e){if(typeof Response=="function"&&t instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(t,e)}catch(a){if(t.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",a);else throw a}const n=await t.arrayBuffer();return await WebAssembly.instantiate(n,e)}else{const n=await WebAssembly.instantiate(t,e);return n instanceof WebAssembly.Instance?{instance:n,module:t}:n}}function Ch(){const t={};return t.wbg={},t.wbg.__wbg_buffer_609cc3eee51ed158=function(e){return e.buffer},t.wbg.__wbg_length_3b4f022188ae8db6=function(e){return e.length},t.wbg.__wbg_length_6ca527665d89694d=function(e){return e.length},t.wbg.__wbg_length_8cfd2c6409af88ad=function(e){return e.length},t.wbg.__wbg_new_9fee97a409b32b68=function(e){return new Uint16Array(e)},t.wbg.__wbg_new_e3b321dcfef89fc7=function(e){return new Uint32Array(e)},t.wbg.__wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354=function(e,n,a){return new Float32Array(e,n>>>0,a>>>0)},t.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212=function(e,n,a){return new Uint32Array(e,n>>>0,a>>>0)},t.wbg.__wbg_newwithlength_5a5efe313cfd59f1=function(e){return new Float32Array(e>>>0)},t.wbg.__wbg_set_10bad9bee0e9c58b=function(e,n,a){e.set(n,a>>>0)},t.wbg.__wbg_set_d23661d19148b229=function(e,n,a){e.set(n,a>>>0)},t.wbg.__wbg_set_f4f1f0daa30696fc=function(e,n,a){e.set(n,a>>>0)},t.wbg.__wbg_subarray_3aaeec89bb2544f0=function(e,n,a){return e.subarray(n>>>0,a>>>0)},t.wbg.__wbg_subarray_769e1e0f81bb259b=function(e,n,a){return e.subarray(n>>>0,a>>>0)},t.wbg.__wbindgen_init_externref_table=function(){const e=Kn.__wbindgen_export_0,n=e.grow(4);e.set(0,void 0),e.set(n+0,void 0),e.set(n+1,null),e.set(n+2,!0),e.set(n+3,!1)},t.wbg.__wbindgen_memory=function(){return Kn.memory},t.wbg.__wbindgen_throw=function(e,n){throw new Error(ph(e,n))},t}function Bh(t,e){return Kn=t.exports,Ll.__wbindgen_wasm_module=e,Di=null,Kn.__wbindgen_start(),Kn}async function Ll(t){if(Kn!==void 0)return Kn;typeof t<"u"&&(Object.getPrototypeOf(t)===Object.prototype?{module_or_path:t}=t:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),typeof t>"u"&&(t=new URL("data:application/wasm;base64,AGFzbQEAAAABzAEeYAJ/fwF/YAJ/fwBgA39/fwF/YAF/AX9gA39/fwBgAX8AYAV/f39/fwBgA29/fwFvYAV/f39/fwF/YAFvAW9gA29vfwBgAW8Bf2AAAX9gBH9/f38AYAAAYAR/f39/AX9gA39vbwF/YAF/AW9gAAFvYAF9AX1gBn9/f39/fwBgDX19fX19fX19f29/fX0Bb2AGf39/f39/AX9gBX9/fH9/AGAEf3x/fwBgBX9/fX9/AGAEf31/fwBgBX9/fn9/AGAEf35/fwBgAn19AX0C8gQRA3diZx1fX3diZ19idWZmZXJfNjA5Y2MzZWVlNTFlZDE1OAAJA3diZxpfX3diZ19uZXdfOWZlZTk3YTQwOWIzMmI2OAAJA3diZxpfX3diZ19zZXRfZjRmMWYwZGFhMzA2OTZmYwAKA3diZx1fX3diZ19sZW5ndGhfOGNmZDJjNjQwOWFmODhhZAALA3diZzFfX3diZ19uZXd3aXRoYnl0ZW9mZnNldGFuZGxlbmd0aF9mMWRlYWQ0NGQxZmM3MjEyAAcDd2JnGl9fd2JnX25ld19lM2IzMjFkY2ZlZjg5ZmM3AAkDd2JnGl9fd2JnX3NldF9kMjM2NjFkMTkxNDhiMjI5AAoDd2JnHV9fd2JnX2xlbmd0aF82Y2E1Mjc2NjVkODk2OTRkAAsDd2JnMV9fd2JnX25ld3dpdGhieXRlb2Zmc2V0YW5kbGVuZ3RoX2U2YjdlNjlhY2Q0YzczNTQABwN3YmcaX193Ymdfc2V0XzEwYmFkOWJlZTBlOWM1OGIACgN3YmcdX193YmdfbGVuZ3RoXzNiNGYwMjIxODhhZThkYjYACwN3YmcfX193Ymdfc3ViYXJyYXlfNzY5ZTFlMGY4MWJiMjU5YgAHA3diZx9fX3diZ19zdWJhcnJheV8zYWFlZWM4OWJiMjU0NGYwAAcDd2JnJF9fd2JnX25ld3dpdGhsZW5ndGhfNWE1ZWZlMzEzY2ZkNTlmMQARA3diZxBfX3diaW5kZ2VuX3Rocm93AAEDd2JnEV9fd2JpbmRnZW5fbWVtb3J5ABIDd2JnH19fd2JpbmRnZW5faW5pdF9leHRlcm5yZWZfdGFibGUADgNhYAMAAQIIBQQCEwEMAAEBAgAAAQwBBAYFBQQAAQYFFAENBAAGBQQEAQQOAgECAQAIBAAVARYGCBcZGwUNAhAQBR0FAQMPAAIDAwMADAAAAQEBAAAABAECAAEAAQAAAQEDAwQJAnABLi5vAIABBQMBABEGCQF/AUGAgMAACwdiBgZtZW1vcnkCAAtzb3J0X3NwbGF0cwBNDXNvcnQzMl9zcGxhdHMATg5yYXljYXN0X3NwbGF0cwBCE19fd2JpbmRnZW5fZXhwb3J0XzABARBfX3diaW5kZ2VuX3N0YXJ0ABAJMwEAQQELLVhZV1xBZ0YuRUZETEtFRUhHST5RN086IWlfXmE7YGpKMiQrbk88IGtsVVpiYwrF3wFghCQCCX8BfiMAQRBrIggkAAJ/AkACQAJAAkACQAJAIABB9QFPBEBBACAAQc3/e08NBxogAEELaiIBQXhxIQVB7JbAACgCACIJRQ0EQR8hB0EAIAVrIQQgAEH0//8HTQRAIAVBBiABQQh2ZyIAa3ZBAXEgAEEBdGtBPmohBwsgB0ECdEHQk8AAaigCACIBRQRAQQAhAAwCC0EAIQAgBUEZIAdBAXZrQQAgB0EfRxt0IQMDQAJAIAEoAgRBeHEiBiAFSQ0AIAYgBWsiBiAETw0AIAEhAiAGIgQNAEEAIQQgASEADAQLIAEoAhQiBiAAIAYgASADQR12QQRxakEQaigCACIBRxsgACAGGyEAIANBAXQhAyABDQALDAELQeiWwAAoAgAiAkEQIABBC2pB+ANxIABBC0kbIgVBA3YiAHYiAUEDcQRAAkAgAUF/c0EBcSAAaiIGQQN0IgBB4JTAAGoiAyAAQeiUwABqKAIAIgEoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQeiWwAAgAkF+IAZ3cTYCAAsgASAAQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIEIAFBCGoMBwsgBUHwlsAAKAIATQ0DAkACQCABRQRAQeyWwAAoAgAiAEUNBiAAaEECdEHQk8AAaigCACICKAIEQXhxIAVrIQQgAiEBA0ACQCACKAIQIgANACACKAIUIgANACABKAIYIQcCQAJAIAEgASgCDCIARgRAIAFBFEEQIAEoAhQiABtqKAIAIgINAUEAIQAMAgsgASgCCCICIAA2AgwgACACNgIIDAELIAFBFGogAUEQaiAAGyEDA0AgAyEGIAIiAEEUaiAAQRBqIAAoAhQiAhshAyAAQRRBECACG2ooAgAiAg0ACyAGQQA2AgALIAdFDQQgASABKAIcQQJ0QdCTwABqIgIoAgBHBEAgB0EQQRQgBygCECABRhtqIAA2AgAgAEUNBQwECyACIAA2AgAgAA0DQeyWwABB7JbAACgCAEF+IAEoAhx3cTYCAAwECyAAKAIEQXhxIAVrIgIgBCACIARJIgIbIQQgACABIAIbIQEgACECDAALAAsCQEECIAB0IgNBACADa3IgASAAdHFoIgZBA3QiAUHglMAAaiIDIAFB6JTAAGooAgAiACgCCCIERwRAIAQgAzYCDCADIAQ2AggMAQtB6JbAACACQX4gBndxNgIACyAAIAVBA3I2AgQgACAFaiIGIAEgBWsiA0EBcjYCBCAAIAFqIAM2AgBB8JbAACgCACIEBEAgBEF4cUHglMAAaiEBQfiWwAAoAgAhAgJ/QeiWwAAoAgAiBUEBIARBA3Z0IgRxRQRAQeiWwAAgBCAFcjYCACABDAELIAEoAggLIQQgASACNgIIIAQgAjYCDCACIAE2AgwgAiAENgIIC0H4lsAAIAY2AgBB8JbAACADNgIAIABBCGoMCAsgACAHNgIYIAEoAhAiAgRAIAAgAjYCECACIAA2AhgLIAEoAhQiAkUNACAAIAI2AhQgAiAANgIYCwJAAkAgBEEQTwRAIAEgBUEDcjYCBCABIAVqIgMgBEEBcjYCBCADIARqIAQ2AgBB8JbAACgCACIGRQ0BIAZBeHFB4JTAAGohAEH4lsAAKAIAIQICf0HolsAAKAIAIgVBASAGQQN2dCIGcUUEQEHolsAAIAUgBnI2AgAgAAwBCyAAKAIICyEGIAAgAjYCCCAGIAI2AgwgAiAANgIMIAIgBjYCCAwBCyABIAQgBWoiAEEDcjYCBCAAIAFqIgAgACgCBEEBcjYCBAwBC0H4lsAAIAM2AgBB8JbAACAENgIACyABQQhqDAYLIAAgAnJFBEBBACECQQIgB3QiAEEAIABrciAJcSIARQ0DIABoQQJ0QdCTwABqKAIAIQALIABFDQELA0AgACACIAAoAgRBeHEiAyAFayIGIARJIgcbIQkgACgCECIBRQRAIAAoAhQhAQsgAiAJIAMgBUkiABshAiAEIAYgBCAHGyAAGyEEIAEiAA0ACwsgAkUNACAFQfCWwAAoAgAiAE0gBCAAIAVrT3ENACACKAIYIQcCQAJAIAIgAigCDCIARgRAIAJBFEEQIAIoAhQiABtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAJBFGogAkEQaiAAGyEDA0AgAyEGIAEiAEEUaiAAQRBqIAAoAhQiARshAyAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQIgAiACKAIcQQJ0QdCTwABqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNAwwCCyABIAA2AgAgAA0BQeyWwABB7JbAACgCAEF+IAIoAhx3cTYCAAwCCwJAAkACQAJAAkAgBUHwlsAAKAIAIgFLBEAgBUH0lsAAKAIAIgBPBEAgBUGvgARqQYCAfHEiAkEQdkAAIQAgCEEEaiIBQQA2AgggAUEAIAJBgIB8cSAAQX9GIgIbNgIEIAFBACAAQRB0IAIbNgIAQQAgCCgCBCIBRQ0JGiAIKAIMIQZBgJfAACAIKAIIIgRBgJfAACgCAGoiADYCAEGEl8AAQYSXwAAoAgAiAiAAIAAgAkkbNgIAAkACQEH8lsAAKAIAIgIEQEHQlMAAIQADQCABIAAoAgAiAyAAKAIEIgdqRg0CIAAoAggiAA0ACwwCC0GMl8AAKAIAIgBBACAAIAFNG0UEQEGMl8AAIAE2AgALQZCXwABB/x82AgBB3JTAACAGNgIAQdSUwAAgBDYCAEHQlMAAIAE2AgBB7JTAAEHglMAANgIAQfSUwABB6JTAADYCAEHolMAAQeCUwAA2AgBB/JTAAEHwlMAANgIAQfCUwABB6JTAADYCAEGElcAAQfiUwAA2AgBB+JTAAEHwlMAANgIAQYyVwABBgJXAADYCAEGAlcAAQfiUwAA2AgBBlJXAAEGIlcAANgIAQYiVwABBgJXAADYCAEGclcAAQZCVwAA2AgBBkJXAAEGIlcAANgIAQaSVwABBmJXAADYCAEGYlcAAQZCVwAA2AgBBrJXAAEGglcAANgIAQaCVwABBmJXAADYCAEGolcAAQaCVwAA2AgBBtJXAAEGolcAANgIAQbCVwABBqJXAADYCAEG8lcAAQbCVwAA2AgBBuJXAAEGwlcAANgIAQcSVwABBuJXAADYCAEHAlcAAQbiVwAA2AgBBzJXAAEHAlcAANgIAQciVwABBwJXAADYCAEHUlcAAQciVwAA2AgBB0JXAAEHIlcAANgIAQdyVwABB0JXAADYCAEHYlcAAQdCVwAA2AgBB5JXAAEHYlcAANgIAQeCVwABB2JXAADYCAEHslcAAQeCVwAA2AgBB9JXAAEHolcAANgIAQeiVwABB4JXAADYCAEH8lcAAQfCVwAA2AgBB8JXAAEHolcAANgIAQYSWwABB+JXAADYCAEH4lcAAQfCVwAA2AgBBjJbAAEGAlsAANgIAQYCWwABB+JXAADYCAEGUlsAAQYiWwAA2AgBBiJbAAEGAlsAANgIAQZyWwABBkJbAADYCAEGQlsAAQYiWwAA2AgBBpJbAAEGYlsAANgIAQZiWwABBkJbAADYCAEGslsAAQaCWwAA2AgBBoJbAAEGYlsAANgIAQbSWwABBqJbAADYCAEGolsAAQaCWwAA2AgBBvJbAAEGwlsAANgIAQbCWwABBqJbAADYCAEHElsAAQbiWwAA2AgBBuJbAAEGwlsAANgIAQcyWwABBwJbAADYCAEHAlsAAQbiWwAA2AgBB1JbAAEHIlsAANgIAQciWwABBwJbAADYCAEHclsAAQdCWwAA2AgBB0JbAAEHIlsAANgIAQeSWwABB2JbAADYCAEHYlsAAQdCWwAA2AgBB/JbAACABQQ9qQXhxIgBBCGsiAjYCAEHglsAAQdiWwAA2AgBB9JbAACAEQShrIgMgASAAa2pBCGoiADYCACACIABBAXI2AgQgASADakEoNgIEQYiXwABBgICAATYCAAwICyACIANJIAEgAk1yDQAgACgCDCIDQQFxDQAgA0EBdiAGRg0DC0GMl8AAQYyXwAAoAgAiACABIAAgAUkbNgIAIAEgBGohA0HQlMAAIQACQAJAA0AgAyAAKAIAIgdHBEAgACgCCCIADQEMAgsLIAAoAgwiA0EBcQ0AIANBAXYgBkYNAQtB0JTAACEAA0ACQCACIAAoAgAiA08EQCACIAMgACgCBGoiB0kNAQsgACgCCCEADAELC0H8lsAAIAFBD2pBeHEiAEEIayIDNgIAQfSWwAAgBEEoayIJIAEgAGtqQQhqIgA2AgAgAyAAQQFyNgIEIAEgCWpBKDYCBEGIl8AAQYCAgAE2AgAgAiAHQSBrQXhxQQhrIgAgACACQRBqSRsiA0EbNgIEQdCUwAApAgAhCiADQRBqQdiUwAApAgA3AgAgAyAKNwIIQdyUwAAgBjYCAEHUlMAAIAQ2AgBB0JTAACABNgIAQdiUwAAgA0EIajYCACADQRxqIQADQCAAQQc2AgAgAEEEaiIAIAdJDQALIAIgA0YNByADIAMoAgRBfnE2AgQgAiADIAJrIgBBAXI2AgQgAyAANgIAIABBgAJPBEAgAiAAECIMCAsgAEH4AXFB4JTAAGohAQJ/QeiWwAAoAgAiA0EBIABBA3Z0IgBxRQRAQeiWwAAgACADcjYCACABDAELIAEoAggLIQAgASACNgIIIAAgAjYCDCACIAE2AgwgAiAANgIIDAcLIAAgATYCACAAIAAoAgQgBGo2AgQgAUEPakF4cUEIayICIAVBA3I2AgQgB0EPakF4cUEIayIEIAIgBWoiAGshBSAEQfyWwAAoAgBGDQMgBEH4lsAAKAIARg0EIAQoAgQiAUEDcUEBRgRAIAQgAUF4cSIBEB4gASAFaiEFIAEgBGoiBCgCBCEBCyAEIAFBfnE2AgQgACAFQQFyNgIEIAAgBWogBTYCACAFQYACTwRAIAAgBRAiDAYLIAVB+AFxQeCUwABqIQECf0HolsAAKAIAIgNBASAFQQN2dCIEcUUEQEHolsAAIAMgBHI2AgAgAQwBCyABKAIICyEDIAEgADYCCCADIAA2AgwgACABNgIMIAAgAzYCCAwFC0H0lsAAIAAgBWsiATYCAEH8lsAAQfyWwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQgAEEIagwIC0H4lsAAKAIAIQACQCABIAVrIgJBD00EQEH4lsAAQQA2AgBB8JbAAEEANgIAIAAgAUEDcjYCBCAAIAFqIgEgASgCBEEBcjYCBAwBC0HwlsAAIAI2AgBB+JbAACAAIAVqIgM2AgAgAyACQQFyNgIEIAAgAWogAjYCACAAIAVBA3I2AgQLIABBCGoMBwsgACAEIAdqNgIEQfyWwABB/JbAACgCACIAQQ9qQXhxIgFBCGsiAjYCAEH0lsAAQfSWwAAoAgAgBGoiAyAAIAFrakEIaiIBNgIAIAIgAUEBcjYCBCAAIANqQSg2AgRBiJfAAEGAgIABNgIADAMLQfyWwAAgADYCAEH0lsAAQfSWwAAoAgAgBWoiATYCACAAIAFBAXI2AgQMAQtB+JbAACAANgIAQfCWwABB8JbAACgCACAFaiIBNgIAIAAgAUEBcjYCBCAAIAFqIAE2AgALIAJBCGoMAwtBAEH0lsAAKAIAIgAgBU0NAhpB9JbAACAAIAVrIgE2AgBB/JbAAEH8lsAAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEIABBCGoMAgsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAUUNACAAIAE2AhQgASAANgIYCwJAIARBEE8EQCACIAVBA3I2AgQgAiAFaiIAIARBAXI2AgQgACAEaiAENgIAIARBgAJPBEAgACAEECIMAgsgBEH4AXFB4JTAAGohAQJ/QeiWwAAoAgAiA0EBIARBA3Z0IgRxRQRAQeiWwAAgAyAEcjYCACABDAELIAEoAggLIQMgASAANgIIIAMgADYCDCAAIAE2AgwgACADNgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIECyACQQhqCyAIQRBqJAALxgYBCH8CQAJAIAEgAEEDakF8cSICIABrIghJDQAgASAIayIGQQRJDQAgBkEDcSEHQQAhAQJAIAAgAkYiCQ0AAkAgACACayIEQXxLBEBBACECDAELQQAhAgNAIAEgACACaiIDLAAAQb9/SmogA0EBaiwAAEG/f0pqIANBAmosAABBv39KaiADQQNqLAAAQb9/SmohASACQQRqIgINAAsLIAkNACAAIAJqIQMDQCABIAMsAABBv39KaiEBIANBAWohAyAEQQFqIgQNAAsLIAAgCGohAgJAIAdFDQAgAiAGQXxxaiIALAAAQb9/SiEFIAdBAUYNACAFIAAsAAFBv39KaiEFIAdBAkYNACAFIAAsAAJBv39KaiEFCyAGQQJ2IQYgASAFaiEEA0AgAiEAIAZFDQJBwAEgBiAGQcABTxsiBUEDcSEHIAVBAnQhCEEAIQMgBkEETwRAIAAgCEHwB3FqIQkgACEBA0AgASgCACICQX9zQQd2IAJBBnZyQYGChAhxIANqIAEoAgQiAkF/c0EHdiACQQZ2ckGBgoQIcWogASgCCCICQX9zQQd2IAJBBnZyQYGChAhxaiABKAIMIgJBf3NBB3YgAkEGdnJBgYKECHFqIQMgAUEQaiIBIAlHDQALCyAGIAVrIQYgACAIaiECIANBCHZB/4H8B3EgA0H/gfwHcWpBgYAEbEEQdiAEaiEEIAdFDQALAn8gACAFQfwBcUECdGoiACgCACIBQX9zQQd2IAFBBnZyQYGChAhxIgEgB0EBRg0AGiABIAAoAgQiAUF/c0EHdiABQQZ2ckGBgoQIcWoiASAHQQJGDQAaIAAoAggiAEF/c0EHdiAAQQZ2ckGBgoQIcSABagsiAUEIdkH/gRxxIAFB/4H8B3FqQYGABGxBEHYgBGoPCyABRQRAQQAPCyABQQNxIQICQCABQQRJBEAMAQsgAUF8cSEFA0AgBCAAIANqIgEsAABBv39KaiABQQFqLAAAQb9/SmogAUECaiwAAEG/f0pqIAFBA2osAABBv39KaiEEIAUgA0EEaiIDRw0ACwsgAkUNACAAIANqIQEDQCAEIAEsAABBv39KaiEEIAFBAWohASACQQFrIgINAAsLIAQL3QUBBX8gACgCCCIDIAFJBEAgASADIgJrIgQgACgCACACa0sEQCAAIAIgBEEEQQQQJiAAKAIIIQILIAAoAgQiBiACQQJ0aiEFIARBAk8EQCAFIANBf3MgAWpBAnQQKhogASACakECdCADQQJ0ayAGakEEayEFIAIgBGpBAWshAgsgBUEANgIAIAAgAkEBajYCCAsgACgCFCIDIAFJBEAgASADIgJrIgQgACgCDCACa0sEQCAAQQxqIAIgBEEEQQQQJiAAKAIUIQILIAAoAhAiBiACQQJ0aiEFIARBAk8EQCAFIANBf3MgAWpBAnQQKhogASACakECdCADQQJ0ayAGakEEayEFIAIgBGpBAWshAgsgBUEANgIAIAAgAkEBajYCFAsgACgCOCIDIAFJBEAgASADIgJrIgQgACgCMCACa0sEQCAAQTBqIAIgBEEEQQQQJiAAKAI4IQILIAAoAjQiBiACQQJ0aiEFIARBAk8EQCAFIANBf3MgAWpBAnQQKhogASACakECdCADQQJ0ayAGakEEayEFIAIgBGpBAWshAgsgBUEANgIAIAAgAkEBajYCOAsgACgCICIDQf//A00EQCADIQFBgIAEIANrIgIgACgCGCADa0sEQCAAQRhqIAMgAkEEQQQQJiAAKAIgIQELIAAoAhwiBSABQQJ0IgRqIQIgA0H//wNHBEAgAkH8/w8gA0ECdCICaxAqGiAEIAJrIAVqQfz/D2ohAiABIANrQf//A2ohAQsgAkEANgIAIAAgAUEBajYCIAsgACgCLCIDQf//A00EQCADIQFBgIAEIANrIgIgACgCJCADa0sEQCAAQSRqIAMgAkEEQQQQJiAAKAIsIQELIAAoAigiBSABQQJ0IgRqIQIgA0H//wNHBEAgAkH8/w8gA0ECdCICaxAqGiAEIAJrIAVqQfz/D2ohAiABIANrQf//A2ohAQsgAkEANgIAIAAgAUEBajYCLAsLqQUBB38CQCAAKAIIQQFxRSIEIAAoAgAiCUVxRQRAAkAgBA0AIAEgAmohBwJAIAAoAgwiBkUEQCABIQQMAQsgASEEA0AgBCIDIAdGDQICfyADQQFqIAMsAAAiCEEATg0AGiADQQJqIAhBYEkNABogA0EDaiAIQXBJDQAaIANBBGoLIgQgA2sgBWohBSAGQQFrIgYNAAsLIAQgB0YNACAELAAAGiAFIAICfwJAIAVFDQAgAiAFSwRAIAEgBWosAABBv39KDQFBAAwCCyACIAVGDQBBAAwBCyABCyIDGyECIAMgASADGyEBCyAJRQ0BIAAoAgQhBwJAIAJBEE8EQCABIAIQEiEDDAELIAJFBEBBACEDDAELIAJBA3EhBgJAIAJBBEkEQEEAIQNBACEFDAELIAJBDHEhCEEAIQNBACEFA0AgAyABIAVqIgQsAABBv39KaiAEQQFqLAAAQb9/SmogBEECaiwAAEG/f0pqIARBA2osAABBv39KaiEDIAggBUEEaiIFRw0ACwsgBkUNACABIAVqIQQDQCADIAQsAABBv39KaiEDIARBAWohBCAGQQFrIgYNAAsLAkAgAyAHSQRAIAcgA2shBEEAIQMCQAJAAkAgAC0AIEEBaw4CAAECCyAEIQNBACEEDAELIARBAXYhAyAEQQFqQQF2IQQLIANBAWohAyAAKAIQIQYgACgCGCEFIAAoAhQhAANAIANBAWsiA0UNAiAAIAYgBSgCEBEAAEUNAAtBAQ8LDAILIAAgASACIAUoAgwRAgAEQEEBDwtBACEDA0AgAyAERgRAQQAPCyADQQFqIQMgACAGIAUoAhARAABFDQALIANBAWsgBEkPCyAAKAIUIAEgAiAAKAIYKAIMEQIADwsgACgCFCABIAIgACgCGCgCDBECAAu/BQEIf0ErQYCAxAAgACgCHCIIQQFxIgYbIQwgBCAGaiEGAkAgCEEEcUUEQEEAIQEMAQsCQCACQRBPBEAgASACEBIhBQwBCyACRQRADAELIAJBA3EhCQJAIAJBBEkEQAwBCyACQQxxIQoDQCAFIAEgB2oiCywAAEG/f0pqIAtBAWosAABBv39KaiALQQJqLAAAQb9/SmogC0EDaiwAAEG/f0pqIQUgCiAHQQRqIgdHDQALCyAJRQ0AIAEgB2ohBwNAIAUgBywAAEG/f0pqIQUgB0EBaiEHIAlBAWsiCQ0ACwsgBSAGaiEGCyAAKAIARQRAIAAoAhQiBiAAKAIYIgAgDCABIAIQPwRAQQEPCyAGIAMgBCAAKAIMEQIADwsCQAJAAkAgBiAAKAIEIgdPBEAgACgCFCIGIAAoAhgiACAMIAEgAhA/RQ0BQQEPCyAIQQhxRQ0BIAAoAhAhCCAAQTA2AhAgAC0AICEKQQEhBSAAQQE6ACAgACgCFCIJIAAoAhgiCyAMIAEgAhA/DQIgByAGa0EBaiEFAkADQCAFQQFrIgVFDQEgCUEwIAsoAhARAABFDQALQQEPCyAJIAMgBCALKAIMEQIABEBBAQ8LIAAgCjoAICAAIAg2AhBBAA8LIAYgAyAEIAAoAgwRAgAhBQwBCyAHIAZrIQYCQAJAAkAgAC0AICIFQQFrDgMAAQACCyAGIQVBACEGDAELIAZBAXYhBSAGQQFqQQF2IQYLIAVBAWohBSAAKAIQIQogACgCGCEIIAAoAhQhAAJAA0AgBUEBayIFRQ0BIAAgCiAIKAIQEQAARQ0AC0EBDwtBASEFIAAgCCAMIAEgAhA/DQAgACADIAQgCCgCDBECAA0AQQAhBQNAIAUgBkYEQEEADwsgBUEBaiEFIAAgCiAIKAIQEQAARQ0ACyAFQQFrIAZJDwsgBQv+BQEFfyAAQQhrIgEgAEEEaygCACIDQXhxIgBqIQICQAJAIANBAXENACADQQJxRQ0BIAEoAgAiAyAAaiEAIAEgA2siAUH4lsAAKAIARgRAIAIoAgRBA3FBA0cNAUHwlsAAIAA2AgAgAiACKAIEQX5xNgIEIAEgAEEBcjYCBCACIAA2AgAPCyABIAMQHgsCQAJAAkACQAJAIAIoAgQiA0ECcUUEQCACQfyWwAAoAgBGDQIgAkH4lsAAKAIARg0DIAIgA0F4cSICEB4gASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFB+JbAACgCAEcNAUHwlsAAIAA2AgAPCyACIANBfnE2AgQgASAAQQFyNgIEIAAgAWogADYCAAsgAEGAAkkNAiABIAAQIkEAIQFBkJfAAEGQl8AAKAIAQQFrIgA2AgAgAA0EQdiUwAAoAgAiAARAA0AgAUEBaiEBIAAoAggiAA0ACwtBkJfAAEH/HyABIAFB/x9NGzYCAA8LQfyWwAAgATYCAEH0lsAAQfSWwAAoAgAgAGoiADYCACABIABBAXI2AgRB+JbAACgCACABRgRAQfCWwABBADYCAEH4lsAAQQA2AgALIABBiJfAACgCACIDTQ0DQfyWwAAoAgAiAkUNA0EAIQBB9JbAACgCACIEQSlJDQJB0JTAACEBA0AgAiABKAIAIgVPBEAgAiAFIAEoAgRqSQ0ECyABKAIIIQEMAAsAC0H4lsAAIAE2AgBB8JbAAEHwlsAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAA8LIABB+AFxQeCUwABqIQICf0HolsAAKAIAIgNBASAAQQN2dCIAcUUEQEHolsAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCA8LQdiUwAAoAgAiAQRAA0AgAEEBaiEAIAEoAggiAQ0ACwtBkJfAAEH/HyAAIABB/x9NGzYCACADIARPDQBBiJfAAEF/NgIACwvpBAEFfwJ/AkAgAkECTwRAIAEoAgQiBEH//wFxRQRAIARBEHQMAwsgBEH/B3EhBSAEQYCAAnEhAyAEQYD4AXEiBkGA+AFGBEAgA0EQdCEDIANBgICA/AdyIAVFDQMaIAMgBUENdHJBgICA/gdyDAMLIANBEHQhAyAGRQ0BIAZBDXRBgICA/ABxIAVBDXRyQYCAgMADaiADcgwCC0EBQQFB9IHAABA1AAsgBSAFZ0EQayIFQf//A3FBCGp0Qf///wNxIANBgICA2ANyIAVBF3RrcgshBQJ/IARBgIB8cSAEQRB2IgNB//8BcUUNABogA0H/B3EhBCADQYCAAnEhBiADQYD4AXEiB0GA+AFGBEAgBkEQdCEGIAZBgICA/AdyIARFDQEaIAYgA0ENdHJBgICA/gdyDAELIAZBEHQhAyAHQQ10QYCAgPwAcSAEQQ10ckGAgIDAA2ogA3IgBw0AGiAEIARnQRBrIgRB//8DcUEIanRB////A3EgA0GAgIDYA3IgBEEXdGtyCyEEIAACfwJAIAJBAkcEQCABKAIIIgJB//8BcUUEQCACQRB0DAMLIAJB/wdxIQEgAkGAgAJxIQMgAkGA+AFxIgJBgPgBRgRAIANBEHQhAiACQYCAgPwHciABRQ0DGiACIAFBDXRyQYCAgP4HcgwDCyADQRB0IQMgAkUNASACQQ10QYCAgPwAcSABQQ10ckGAgIDAA2ogA3IMAgtBAkECQYSCwAAQNQALIAEgAWdBEGsiAUH//wNxQQhqdEH///8DcSADQYCAgNgDciABQRd0a3ILNgIIIAAgBDYCBCAAIAU2AgAL6wQBCn8jAEEwayIDJAAgA0EDOgAsIANBIDYCHCADQQA2AiggAyABNgIkIAMgADYCICADQQA2AhQgA0EANgIMAn8CQAJAAkAgAigCECIKRQRAIAIoAgwiAEUNASACKAIIIgEgAEEDdGohBCAAQQFrQf////8BcUEBaiEHIAIoAgAhAANAIABBBGooAgAiBQRAIAMoAiAgACgCACAFIAMoAiQoAgwRAgANBAsgASgCACADQQxqIAEoAgQRAAANAyAAQQhqIQAgAUEIaiIBIARHDQALDAELIAIoAhQiAEUNACAAQQV0IQsgAEEBa0H///8/cUEBaiEHIAIoAgghBSACKAIAIQADQCAAQQRqKAIAIgEEQCADKAIgIAAoAgAgASADKAIkKAIMEQIADQMLIAMgCCAKaiIBQRBqKAIANgIcIAMgAUEcai0AADoALCADIAFBGGooAgA2AiggAUEMaigCACEEQQAhCUEAIQYCQAJAAkAgAUEIaigCAEEBaw4CAAIBCyAEQQN0IAVqIgwoAgANASAMKAIEIQQLQQEhBgsgAyAENgIQIAMgBjYCDCABQQRqKAIAIQQCQAJAAkAgASgCAEEBaw4CAAIBCyAEQQN0IAVqIgYoAgANASAGKAIEIQQLQQEhCQsgAyAENgIYIAMgCTYCFCAFIAFBFGooAgBBA3RqIgEoAgAgA0EMaiABKAIEEQAADQIgAEEIaiEAIAsgCEEgaiIIRw0ACwsgByACKAIETw0BIAMoAiAgAigCACAHQQN0aiIAKAIAIAAoAgQgAygCJCgCDBECAEUNAQtBAQwBC0EACyADQTBqJAALsgQCAn0EfyMAQRBrIQQgALwiBUEfdiEGAkACfSAAAn8CQAJAAkACQCAFQf////8HcSIDQdDYupUETwRAIANBgICA/AdLBEAgAA8LIAVBAEgiBUUgA0GX5MWVBEtxDQIgBUUNASAEQwAAgIAgAJU4AgggBCoCCBogA0G047+WBE0NAQwHCyADQZjkxfUDTQRAIANBgICAyANNDQNBACEDIAAMBgsgA0GSq5T8A00NAwsgAEM7qrg/lCAGQQJ0QYiSwABqKgIAkiIBQwAAAM9gIQRB/////wcCfyABi0MAAABPXQRAIAGoDAELQYCAgIB4C0GAgICAeCAEGyABQ////05eG0EAIAEgAVsbDAMLIABDAAAAf5QPCyAEIABDAAAAf5I4AgwgBCoCDBogAEMAAIA/kg8LIAZFIAZrCyIDsiIBQwByMb+UkiIAIAFDjr6/NZQiApMLIQEgACABIAEgASABlCIAIABDFVI1u5RDj6oqPpKUkyIAlEMAAABAIACTlSACk5JDAACAP5IhASADRQ0AAkACQAJAIANB/wBMBEAgA0GCf04NAyABQwAAgAyUIQEgA0Gbfk0NASADQeYAaiEDDAMLIAFDAAAAf5QhASADQf4BSw0BIANB/wBrIQMMAgsgAUMAAIAMlCEBQbZ9IAMgA0G2fU0bQcwBaiEDDAELIAFDAAAAf5QhAUH9AiADIANB/QJPG0H+AWshAwsgASADQRd0QYCAgPwDar6UIQELIAEL+QMBAn8gACABaiECAkACQCAAKAIEIgNBAXENACADQQJxRQ0BIAAoAgAiAyABaiEBIAAgA2siAEH4lsAAKAIARgRAIAIoAgRBA3FBA0cNAUHwlsAAIAE2AgAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCACIAE2AgAMAgsgACADEB4LAkACQAJAIAIoAgQiA0ECcUUEQCACQfyWwAAoAgBGDQIgAkH4lsAAKAIARg0DIAIgA0F4cSICEB4gACABIAJqIgFBAXI2AgQgACABaiABNgIAIABB+JbAACgCAEcNAUHwlsAAIAE2AgAPCyACIANBfnE2AgQgACABQQFyNgIEIAAgAWogATYCAAsgAUGAAk8EQCAAIAEQIg8LIAFB+AFxQeCUwABqIQICf0HolsAAKAIAIgNBASABQQN2dCIBcUUEQEHolsAAIAEgA3I2AgAgAgwBCyACKAIICyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCA8LQfyWwAAgADYCAEH0lsAAQfSWwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgAEH4lsAAKAIARw0BQfCWwABBADYCAEH4lsAAQQA2AgAPC0H4lsAAIAA2AgBB8JbAAEHwlsAAKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAAsLggMBCX8jAEEgayIEJAAQIyIAKAIQIQUgACgCDCEIIABCADcCDCAAKAIEIQYgACgCCCEDIABCBDcCBCAAKAIAIQIgAEEANgIAAkAgAyAIRgRAAkAgAiADRgRA0G9BgAEgAiACQYABTRsiB/wPASIBQX9GDQMCQCAFRQRAIAEhBQwBCyACIAVqIAFHDQQLIAIgB2oiByACSSAHQf////8DS3INAyAHQQJ0IgFB/P///wdLDQMgBCACBH8gBCAGNgIUIAQgAkECdDYCHEEEBUEACzYCGCAEQQhqQQQgASAEQRRqEDAgBCgCCEEBRg0DIAQoAgwhBiACIQEgByECDAELIAIgAyIBTQ0CCyAGIAFBAnRqIANBAWo2AgAgAUEBaiEDCyADIAhNDQAgBiAIQQJ0aigCACEBIAAgBTYCECAAIAE2AgwgACADNgIIIAAoAgQhAyAAIAY2AgQgACgCACEBIAAgAjYCACABBEAgAyABQQJ0EGULIARBIGokACAFIAhqDwsAC+cCAQV/AkBBzf97QRAgACAAQRBNGyIAayABTQ0AIABBECABQQtqQXhxIAFBC0kbIgRqQQxqEBEiAkUNACACQQhrIQECQCAAQQFrIgMgAnFFBEAgASEADAELIAJBBGsiBSgCACIGQXhxIAIgA2pBACAAa3FBCGsiAiAAQQAgAiABa0EQTRtqIgAgAWsiAmshAyAGQQNxBEAgACADIAAoAgRBAXFyQQJyNgIEIAAgA2oiAyADKAIEQQFyNgIEIAUgAiAFKAIAQQFxckECcjYCACABIAJqIgMgAygCBEEBcjYCBCABIAIQGgwBCyABKAIAIQEgACADNgIEIAAgASACajYCAAsCQCAAKAIEIgFBA3FFDQAgAUF4cSICIARBEGpNDQAgACAEIAFBAXFyQQJyNgIEIAAgBGoiASACIARrIgRBA3I2AgQgACACaiICIAIoAgRBAXI2AgQgASAEEBoLIABBCGohAwsgAwv7AgEHfyMAQRBrIgQkAAJAAkACQAJAAkAgASgCBCICRQ0AIAEoAgAhByACQQNxIQUCQCACQQRJBEBBACECDAELIAdBHGohAyACQXxxIQhBACECA0AgAygCACADQQhrKAIAIANBEGsoAgAgA0EYaygCACACampqaiECIANBIGohAyAIIAZBBGoiBkcNAAsLIAUEQCAGQQN0IAdqQQRqIQMDQCADKAIAIAJqIQIgA0EIaiEDIAVBAWsiBQ0ACwsgASgCDARAIAJBAEgNASAHKAIERSACQRBJcQ0BIAJBAXQhAgtBACEFIAJBAEgNAyACDQELQQEhA0EAIQIMAQtBsZPAAC0AABpBASEFIAJBARBdIgNFDQELIARBADYCCCAEIAM2AgQgBCACNgIAIARBwIvAACABEBhFDQFBqIzAAEHWACAEQQ9qQZiMwABBkI3AABAzAAsgBSACEFIACyAAIAQpAgA3AgAgAEEIaiAEQQhqKAIANgIAIARBEGokAAvxAgEEfyAAKAIMIQICQAJAIAFBgAJPBEAgACgCGCEDAkACQCAAIAJGBEAgAEEUQRAgACgCFCICG2ooAgAiAQ0BQQAhAgwCCyAAKAIIIgEgAjYCDCACIAE2AggMAQsgAEEUaiAAQRBqIAIbIQQDQCAEIQUgASICQRRqIAJBEGogAigCFCIBGyEEIAJBFEEQIAEbaigCACIBDQALIAVBADYCAAsgA0UNAiAAIAAoAhxBAnRB0JPAAGoiASgCAEcEQCADQRBBFCADKAIQIABGG2ogAjYCACACRQ0DDAILIAEgAjYCACACDQFB7JbAAEHslsAAKAIAQX4gACgCHHdxNgIADAILIAAoAggiACACRwRAIAAgAjYCDCACIAA2AggPC0HolsAAQeiWwAAoAgBBfiABQQN2d3E2AgAPCyACIAM2AhggACgCECIBBEAgAiABNgIQIAEgAjYCGAsgACgCFCIARQ0AIAIgADYCFCAAIAI2AhgLC7YCAQd/AkAgAkEQSQRAIAAhAwwBCyAAQQAgAGtBA3EiBGohBSAEBEAgACEDIAEhBgNAIAMgBi0AADoAACAGQQFqIQYgA0EBaiIDIAVJDQALCyAFIAIgBGsiCEF8cSIHaiEDAkAgASAEaiIEQQNxBEAgB0EATA0BIARBA3QiAkEYcSEJIARBfHEiBkEEaiEBQQAgAmtBGHEhAiAGKAIAIQYDQCAFIAYgCXYgASgCACIGIAJ0cjYCACABQQRqIQEgBUEEaiIFIANJDQALDAELIAdBAEwNACAEIQEDQCAFIAEoAgA2AgAgAUEEaiEBIAVBBGoiBSADSQ0ACwsgCEEDcSECIAQgB2ohAQsgAgRAIAIgA2ohAgNAIAMgAS0AADoAACABQQFqIQEgA0EBaiIDIAJJDQALCyAAC78CAQN/IwBBEGsiAiQAAkAgAUGAAU8EQCACQQA2AgwCfyABQYAQTwRAIAFBgIAETwRAIAJBDGpBA3IhBCACIAFBEnZB8AFyOgAMIAIgAUEGdkE/cUGAAXI6AA4gAiABQQx2QT9xQYABcjoADUEEDAILIAJBDGpBAnIhBCACIAFBDHZB4AFyOgAMIAIgAUEGdkE/cUGAAXI6AA1BAwwBCyACQQxqQQFyIQQgAiABQQZ2QcABcjoADEECCyEDIAQgAUE/cUGAAXI6AAAgAyAAKAIAIAAoAggiAWtLBEAgACABIAMQKSAAKAIIIQELIAAoAgQgAWogAkEMaiADEB8aIAAgASADajYCCAwBCyAAKAIIIgMgACgCAEYEQCAAECgLIAAgA0EBajYCCCAAKAIEIANqIAE6AAALIAJBEGokAEEAC70CAQJ/IwBBEGsiAiQAAkAgAUGAAU8EQCACQQA2AgwCfyABQYAQTwRAIAFBgIAETwRAIAIgAUE/cUGAAXI6AA8gAiABQRJ2QfABcjoADCACIAFBBnZBP3FBgAFyOgAOIAIgAUEMdkE/cUGAAXI6AA1BBAwCCyACIAFBP3FBgAFyOgAOIAIgAUEMdkHgAXI6AAwgAiABQQZ2QT9xQYABcjoADUEDDAELIAIgAUE/cUGAAXI6AA0gAiABQQZ2QcABcjoADEECCyEBIAEgACgCACAAKAIIIgNrSwRAIAAgAyABECUgACgCCCEDCyAAKAIEIANqIAJBDGogARAfGiAAIAEgA2o2AggMAQsgACgCCCIDIAAoAgBGBEAgABAoCyAAIANBAWo2AgggACgCBCADaiABOgAACyACQRBqJABBAAvEAgEEfyAAQgA3AhAgAAJ/QQAgAUGAAkkNABpBHyABQf///wdLDQAaIAFBBiABQQh2ZyIDa3ZBAXEgA0EBdGtBPmoLIgI2AhwgAkECdEHQk8AAaiEEQQEgAnQiA0HslsAAKAIAcUUEQCAEIAA2AgAgACAENgIYIAAgADYCDCAAIAA2AghB7JbAAEHslsAAKAIAIANyNgIADwsCQAJAIAEgBCgCACIDKAIEQXhxRgRAIAMhAgwBCyABQRkgAkEBdmtBACACQR9HG3QhBQNAIAMgBUEddkEEcWpBEGoiBCgCACICRQ0CIAVBAXQhBSACIQMgAigCBEF4cSABRw0ACwsgAigCCCIBIAA2AgwgAiAANgIIIABBADYCGCAAIAI2AgwgACABNgIIDwsgBCAANgIAIAAgAzYCGCAAIAA2AgwgACAANgIIC/MCAQR/IwBBMGsiACQAAkACQEGQksAAKAIARQRAQaiSwAAoAgAhAUGoksAAQQA2AgAgAUUNASAAQRhqIAERBQAgAEEQaiICIABBJGopAgA3AwAgACAAKQIcNwMIIAAoAhghAUGQksAAKAIAIgMNAgJAIANFDQBBlJLAACgCACICRQ0AQZiSwAAoAgAgAkECdBBlC0GUksAAIAE2AgBBkJLAAEEBNgIAQZiSwAAgACkDCDcCAEGgksAAIABBEGopAwA3AgALIABBMGokAEGUksAADwsgAEEANgIoIABBATYCHCAAQaCHwAA2AhggAEIENwIgIABBGGpBiIjAABBDAAsgAEEoaiACKQMANwIAIAAgACkDCDcCICAAIAE2AhwgAEEBNgIYAkAgAEEYaiIBKAIARQ0AIAEoAgQiAkUNACABKAIIIAJBAnQQZQsgAEEANgIoIABBATYCHCAAQaiIwAA2AhggAEIENwIgIAFBsIjAABBDAAuoAgIDfwF+IwBBQGoiAiQAIAEoAgBBgICAgHhGBEAgASgCDCEDIAJBJGoiBEEANgIAIAJCgICAgBA3AhwgAkEwaiADKAIAIgNBCGopAgA3AwAgAkE4aiADQRBqKQIANwMAIAIgAykCADcDKCACQRxqQcCIwAAgAkEoahAYGiACQRhqIAQoAgAiAzYCACACIAIpAhwiBTcDECABQQhqIAM2AgAgASAFNwIACyABKQIAIQUgAUKAgICAEDcCACACQQhqIgMgAUEIaiIBKAIANgIAIAFBADYCAEGxk8AALQAAGiACIAU3AwBBDEEEEF0iAUUEQEEEQQwQbQALIAEgAikDADcCACABQQhqIAMoAgA2AgAgAEHgisAANgIEIAAgATYCACACQUBrJAAL0gECBH8BfiMAQSBrIgMkACABIAEgAmoiAksEQEEAQQAQUgALQQggACgCACIEQQF0IgEgAiABIAJLGyICIAJBCEkb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QQRqrUKAgICA4ACENwMoIAEgAa1CgICAgOAAhDcDICABIAFBIGo2AhAgAUEIakHIj8AAEEMAC2kCAX8BfiMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQfyNwAA2AgggA0ICNwIUIANCgICAgOAAIgQgA62ENwMoIAMgBCADQQRqrYQ3AyAgAyADQSBqNgIQIANBCGogAhBDAAtpAgF/AX4jAEEwayIDJAAgAyAANgIAIAMgATYCBCADQQI2AgwgA0H4kcAANgIIIANCAjcCFCADQoCAgIDgACIEIANBBGqthDcDKCADIAQgA62ENwMgIAMgA0EgajYCECADQQhqIAIQQwALZgAjAEEwayIAJABBsJPAAC0AAARAIABBAjYCDCAAQbCKwAA2AgggAEIBNwIUIAAgATYCLCAAIABBLGqtQoCAgIDgAIQ3AyAgACAAQSBqNgIQIABBCGpB0IrAABBDAAsgAEEwaiQAC5QBAgN/AW8jAEEgayIDJAAgAyAAKAIAEHAiBDYCACADIAI2AgQgAiAERwRAIANBADYCCCADIANBBGogA0EIahBAAAsQWyIEEFMiBSUBEAUhBhAbIgIgBiYBIAVBhAFPBEAgBRAtCyACIAAoAgAgAUECdhBkIAJBhAFPBEAgAhAtCyAEQYQBTwRAIAQQLQsgA0EgaiQAC08BAX8jAEEwayIAJAAgAEEBNgIMIABBwI3AADYCCCAAQgE3AhQgACAAQS9qrUKAgICAoAWENwMgIAAgAEEgajYCECAAQQhqQcSBwAAQQwALQQEBfyACIAAoAgAgACgCCCIDa0sEQCAAIAMgAhAlIAAoAgghAwsgACgCBCADaiABIAIQHxogACACIANqNgIIQQALTQECf0Gxk8AALQAAGiABKAIEIQIgASgCACEDQQhBBBBdIgFFBEBBBEEIEG0ACyABIAI2AgQgASADNgIAIABB8IrAADYCBCAAIAE2AgALQQEBfyACIAAoAgAgACgCCCIDa0sEQCAAIAMgAhApIAAoAgghAwsgACgCBCADaiABIAIQHxogACACIANqNgIIQQALQQEBfyMAQSBrIgIkACACQQA2AhAgAkEBNgIEIAJCBDcCCCACQS42AhwgAiAANgIYIAIgAkEYajYCACACIAEQQwALswIBA38gACgCACECIAEoAhwiAEEQcUUE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ZCByZWN1cnNpdmVseSBvciBhZnRlciBiZWluZyBkcm9wcGVkTGF6eSBpbnN0YW5jZSBoYXMgcHJldmlvdXNseSBiZWVuIHBvaXNvbmVkdgMQACoAAAAvVXNlcnMvZG1hcmNvcy8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL29uY2VfY2VsbC0xLjIxLjMvc3JjL2xpYi5ycwCoAxAAXwAAAAgDAAAZAAAAcmVlbnRyYW50IGluaXQAABgEEAAOAAAAqAMQAF8AAAB6AgAADQAAABYAAAAMAAAABAAAABcAAAAYAAAAGQAAAC9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZABYBBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAWAQQACkAAACuBAAADQAAAEFjY2Vzc0Vycm9ybWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAAAAAsFEAAVAAAAIAUQAA0AAABzdGQvc3JjL2FsbG9jLnJzQAUQABAAAABjAQAACQAAABYAAAAMAAAABAAAABoAAAAAAAAACAAAAAQAAAAbAAAAAAAAAAgAAAAEAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAQAAAABAAAACEAAAAiAAAAIwAAACQAAABFcnJvcgAAACUAAAAMAAAABAAAACYAAAAnAAAAKAAAAGNhcGFjaXR5IG92ZXJmbG93AAAA2AUQABEAAABhbGxvYy9zcmMvcmF3X3ZlYy5yc/QFEAAUAAAAGAAAAAUAQaCMwAAL8AUBAAAAKQAAAGEgZm9ybWF0dGluZyB0cmFpdCBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB3aGVuIHRoZSB1bmRlcmx5aW5nIHN0cmVhbSBkaWQgbm90YWxsb2Mvc3JjL2ZtdC5ycwAAfgYQABAAAAB+AgAADgAAAEJvcnJvd011dEVycm9yYWxyZWFkeSBib3Jyb3dlZDogrgYQABIAAABpbmRleCBvdXQgb2YgYm91bmRzOiB0aGUgbGVuIGlzICBidXQgdGhlIGluZGV4IGlzIAAAyAYQACAAAADoBhAAEgAAAD09IT1tYXRjaGVzYXNzZXJ0aW9uIGBsZWZ0ICByaWdodGAgZmFpbGVkCiAgbGVmdDogCiByaWdodDogABcHEAAQAAAAJwcQABcAAAA+BxAACQAAACByaWdodGAgZmFpbGVkOiAKICBsZWZ0OiAAAAAXBxAAEAAAAGAHEAAQAAAAcAcQAAkAAAA+BxAACQAAADogAAABAAAAAAAAAJwHEAACAAAAfSB9Y29yZS9zcmMvZm10L251bS5ycwAAswcQABMAAABmAAAAFwAAADB4MDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTlyYW5nZSBzdGFydCBpbmRleCAgb3V0IG9mIHJhbmdlIGZvciBzbGljZSBvZiBsZW5ndGggAACiCBAAEgAAALQIEAAiAAAAcmFuZ2UgZW5kIGluZGV4IOgIEAAQAAAAtAgQACIAAAAAAAA/AAAAvwBBqJLAAAsBFABwCXByb2R1Y2VycwIIbGFuZ3VhZ2UBBFJ1c3QADHByb2Nlc3NlZC1ieQMFcnVzdGMdMS44My4wICg5MGIzNWE2MjMgMjAyNC0xMS0yNikGd2FscnVzBjAuMjMuMwx3YXNtLWJpbmRnZW4HMC4yLjEwMABJD3RhcmdldF9mZWF0dXJlcwQrD211dGFibGUtZ2xvYmFscysIc2lnbi1leHQrD3JlZmVyZW5jZS10eXBlcysKbXVsdGl2YWx1ZQ=="));const e=Ch();(typeof t=="string"||typeof Request=="function"&&t instanceof Request||typeof URL=="function"&&t instanceof URL)&&(t=fetch(t));const{instance:n,module:a}=await Ih(await t,e);return Bh(n,a)}const $n=-12,ea=9,Eh=-30,Yr=Math.exp(Eh),yh=11,wh=11,nt=1<<yh,ka=1<<wh,xh=1;function bh(t){return t==="bool"||t==="bvec2"||t==="bvec3"||t==="bvec4"}function Da(t){return t==="int"||t==="ivec2"||t==="ivec3"||t==="ivec4"}function Ta(t){return t==="uint"||t==="uvec2"||t==="uvec3"||t==="uvec4"}function Qh(t){return t==="float"||t==="vec2"||t==="vec3"||t==="vec4"}function vh(t){return t==="mat2"||t==="mat2x2"||t==="mat2x3"||t==="mat2x4"||t==="mat3"||t==="mat3x2"||t==="mat3x3"||t==="mat3x4"||t==="mat4"||t==="mat4x2"||t==="mat4x3"||t==="mat4x4"}function Ki(t){return Qh(t)||vh(t)}function Xa(t){return t==="mat2"||t==="mat2x2"}function Ka(t){return t==="mat3"||t==="mat3x3"}function Za(t){return t==="mat4"||t==="mat4x4"}function Sh(t){switch(t){case"vec2":return"float";case"vec3":return"float";case"vec4":return"float";case"ivec2":return"int";case"ivec3":return"int";case"ivec4":return"int";case"uvec2":return"uint";case"uvec3":return"uint";case"uvec4":return"uint";default:throw new Error(`Invalid vector type: ${t}`)}}function Mh(t){switch(t){case"vec2":case"ivec2":case"uvec2":return 2;case"vec3":case"ivec3":case"uvec3":return 3;case"vec4":case"ivec4":case"uvec4":return 4;default:throw new Error(`Invalid vector type: ${t}`)}}function xt(t){return Math.trunc(t).toString()}function bt(t){return`${Math.max(0,Math.trunc(t)).toString()}u`}function Ve(t){return t===Number.POSITIVE_INFINITY?"INFINITY":t===Number.NEGATIVE_INFINITY?"-INFINITY":Number.isInteger(t)?t.toFixed(1):t.toString()}function Xn(t){return t instanceof _a?t.type:t.dynoOut().type}class _a{constructor(e){this.__isDynoValue=!0,this.type=e}}class en extends _a{constructor(e,n){super(e.outTypes[n]),this.dyno=e,this.key=n}}class Hs extends _a{constructor(e,n){super(e),this.literal=n}getLiteral(){return this.literal}}class kh extends Hs{constructor(e,n){super(e,""),this.value=n}getLiteral(){const{type:e,value:n}=this;switch(e){case"bool":return n?"true":"false";case"uint":return bt(n);case"int":return xt(n);case"float":return Ve(n);case"bvec2":{const a=n;return`bvec2(${a[0]}, ${a[1]})`}case"uvec2":{if(n instanceof ze)return`uvec2(${bt(n.x)}, ${bt(n.y)})`;const a=n;return`uvec2(${bt(a[0])}, ${bt(a[1])})`}case"ivec2":{if(n instanceof ze)return`ivec2(${xt(n.x)}, ${xt(n.y)})`;const a=n;return`ivec2(${xt(a[0])}, ${xt(a[1])})`}case"vec2":{if(n instanceof ze)return`vec2(${Ve(n.x)}, ${Ve(n.y)})`;const a=n;return`vec2(${Ve(a[0])}, ${Ve(a[1])})`}case"bvec3":{const a=n;return`bvec3(${a[0]}, ${a[1]}, ${a[2]})`}case"uvec3":{if(n instanceof j)return`uvec3(${bt(n.x)}, ${bt(n.y)}, ${bt(n.z)})`;const a=n;return`uvec3(${bt(a[0])}, ${bt(a[1])}, ${bt(a[2])})`}case"ivec3":{if(n instanceof j)return`ivec3(${xt(n.x)}, ${xt(n.y)}, ${xt(n.z)})`;const a=n;return`ivec3(${xt(a[0])}, ${xt(a[1])}, ${xt(a[2])})`}case"vec3":{if(n instanceof j)return`vec3(${Ve(n.x)}, ${Ve(n.y)}, ${Ve(n.z)})`;const a=n;return`vec3(${Ve(a[0])}, ${Ve(a[1])}, ${Ve(a[2])})`}case"bvec4":{const a=n;return`bvec4(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`}case"uvec4":{if(n instanceof wn)return`uvec4(${bt(n.x)}, ${bt(n.y)}, ${bt(n.z)}, ${bt(n.w)})`;const a=n;return`uvec4(${bt(a[0])}, ${bt(a[1])}, ${bt(a[2])}, ${bt(a[3])})`}case"ivec4":{if(n instanceof wn)return`ivec4(${xt(n.x)}, ${xt(n.y)}, ${xt(n.z)}, ${xt(n.w)})`;const a=n;return`ivec4(${xt(a[0])}, ${xt(a[1])}, ${xt(a[2])}, ${xt(a[3])})`}case"vec4":{if(n instanceof wn)return`vec4(${Ve(n.x)}, ${Ve(n.y)}, ${Ve(n.z)}, ${Ve(n.w)})`;if(n instanceof Rt)return`vec4(${Ve(n.x)}, ${Ve(n.y)}, ${Ve(n.z)}, ${Ve(n.w)})`;const a=n;return`vec4(${Ve(a[0])}, ${Ve(a[1])}, ${Ve(a[2])}, ${Ve(a[3])})`}case"mat2":case"mat2x2":{const a=n,i=a instanceof fl?a.elements:n,s=new Array(4).fill(0).map((r,o)=>Ve(i[o]));return`${e}(${s.join(", ")})`}case"mat2x3":{const a=n,i=new Array(6).fill(0).map((s,r)=>Ve(a[r]));return`${e}(${i.join(", ")})`}case"mat2x4":{const a=n,i=new Array(8).fill(0).map((s,r)=>Ve(a[r]));return`${e}(${i.join(", ")})`}case"mat3":case"mat3x3":{const a=n,i=a instanceof gl?a.elements:n,s=new Array(9).fill(0).map((r,o)=>Ve(i[o]));return`${e}(${s.join(", ")})`}case"mat3x2":{const a=n,i=new Array(6).fill(0).map((s,r)=>Ve(a[r]));return`${e}(${i.join(", ")})`}case"mat3x4":{const a=n,i=new Array(12).fill(0).map((s,r)=>Ve(a[r]));return`${e}(${i.join(", ")})`}case"mat4":case"mat4x4":{const a=n,i=a instanceof Zt?a.elements:n,s=new Array(16).fill(0).map((r,o)=>Ve(i[o]));return`${e}(${s.join(", ")})`}case"mat4x2":{const a=n,i=new Array(8).fill(0).map((s,r)=>Ve(a[r]));return`${e}(${i.join(", ")})`}case"mat4x3":{const a=n,i=new Array(12).fill(0).map((s,r)=>Ve(a[r]));return`${e}(${i.join(", ")})`}default:throw new Error(`Type not implemented: ${String(e)}`)}}}function qi(t,e){return new kh(t,e)}function Ts(t){const e=String(t);if(bh(t))return`${e}(false)`;if(Ki(t))return`${e}(0.0)`;if(Da(t))return`${e}(0)`;if(Ta(t))return`${e}(0u)`;throw new Error(`Type not implemented: ${e}`)}const wA="    ";class Dh{constructor({indent:e}={}){this.globals=new Set,this.statements=[],this.uniforms={},this.declares=new Set,this.updaters=[],this.sequence=0,this.indent=wA,this.indent=e??wA}nextSequence(){return this.sequence++}}class Tt{constructor({inTypes:e,outTypes:n,inputs:a,update:i,globals:s,statements:r,generate:o}){this.inTypes=e??{},this.outTypes=n??{},this.inputs=a??{},this.update=i,this.globals=s,this.statements=r,this.generate=o??(({inputs:A,outputs:l,compile:u})=>{var c,g;return{globals:(c=this.globals)==null?void 0:c.call(this,{inputs:A,outputs:l,compile:u}),statements:(g=this.statements)==null?void 0:g.call(this,{inputs:A,outputs:l,compile:u})}})}get outputs(){const e={};for(const n in this.outTypes)e[n]=new en(this,n);return e}apply(e){return Object.assign(this.inputs,e),this.outputs}compile({inputs:e,outputs:n,compile:a}){const i=[`// ${this.constructor.name}(${Object.values(e).join(", ")}) => (${Object.values(n).join(", ")})`],s=[];for(const l in n){const u=n[l];u&&!a.declares.has(u)&&(a.declares.add(u),s.push(l))}const{globals:r,statements:o,uniforms:A}=this.generate({inputs:e,outputs:n,compile:a});for(const l of r??[])a.globals.add(l);for(const l in A)a.uniforms[l]=A[l];this.update&&a.updaters.push(this.update);for(const l of s){const u=n[l];u&&(a.uniforms[u]||i.push(`${Gl(u,this.outTypes[l])};`))}return o!=null&&o.length&&(i.push("{"),i.push(...o.map(l=>a.indent+l)),i.push("}")),i}}class Th extends Tt{constructor({inTypes:e,outTypes:n,inputs:a,update:i,globals:s,construct:r}){super({inTypes:e,outTypes:n,inputs:a,update:i,globals:s,generate:o=>this.generateBlock(o)}),this.construct=r}generateBlock({inputs:e,outputs:n,compile:a}){var i,s;const r={},o={};for(const B in e)e[B]!=null&&(r[B]=new Hs(this.inTypes[B],e[B]));for(const B in n)n[B]!=null&&(o[B]=new _a(this.outTypes[B]));const A={roots:[]},l=this.construct(r,o,A);for(const B of((i=this.globals)==null?void 0:i.call(this,{inputs:e,outputs:n,compile:a}))??[])a.globals.add(B);const u=[],c=new Map;function g(B,d,E){let I=c.get(B);if(!I){I={sequence:a.nextSequence(),outNames:new Map,newOuts:new Set},c.set(B,I);for(const y in B.inputs){let Q=B.inputs[y];for(;Q;){if(Q instanceof _a){Q instanceof en&&g(Q.dyno,Q.key);break}Q=Q.dynoOut()}}u.push(B)}d&&(E||I.newOuts.add(d),I.outNames.set(d,E??`${d}_${I.sequence}`))}for(const B of A.roots)g(B);for(const B in o){let d=(l==null?void 0:l[B])??o[B];for(;d;){if(d instanceof _a){d instanceof en&&g(d.dyno,d.key,n[B]);break}d=d.dynoOut()}o[B]=d}const f=[];for(const B of u){const d={},E={};for(const Q in B.inputs){let D=B.inputs[Q];for(;D;){if(D instanceof _a){if(D instanceof Hs)d[Q]=D.getLiteral();else if(D instanceof en){const v=(s=c.get(D.dyno))==null?void 0:s.outNames.get(D.key);if(!v)throw new Error(`Source not found for ${D.dyno.constructor.name}.${D.key}`);d[Q]=v}break}D=D.dynoOut()}}const I=c.get(B)??{outNames:new Map};for(const[Q,D]of I.outNames.entries())E[Q]=D;const y=B.compile({inputs:d,outputs:E,compile:a});f.push(y)}const p=[];for(const B in n)o[B]instanceof Hs&&p.push(`${n[B]} = ${o[B].getLiteral()};`);return p.length>0&&f.push(p),{statements:f.flatMap((B,d)=>d===0?B:["",...B])}}}function ta(t,e,n,{update:a,globals:i}={}){return new Th({inTypes:t,outTypes:e,construct:n,update:a,globals:i})}function gr({inTypes:t,outTypes:e,inputs:n,update:a,globals:i,statements:s,generate:r}){return new Tt({inTypes:t,outTypes:e,inputs:n,update:a,globals:i,statements:s,generate:r})}function Gl(t,e,n){const a=typeof e=="string"?e:e.type;if(!a)throw new Error(`Invalid DynoType: ${String(e)}`);return`${a} ${t}${n!=null?`[${n}]`:""}`}function qn(t){var e;let n=!1;const a=t.split(`
`).map(r=>{const o=r.trimEnd();return n?o:o.length>0?(n=!0,o):null}).filter(r=>r!=null);for(;a.length>0&&a[a.length-1].length===0;)a.pop();if(a.length===0)return[];const i=(e=a[0].match(/^\s*/))==null?void 0:e[0];if(!i)return a;const s=new RegExp(`^${i}`);return a.map(r=>r.replace(s,""))}function an(t){return qn(t).join(`
`)}class hr extends Tt{constructor({a:e,outKey:n,outTypeFunc:a}){const i={a:Xn(e)},s=a(Xn(e)),r={[n]:s};super({inTypes:i,outTypes:r,inputs:{a:e}}),this.outKey=n}dynoOut(){return new en(this,this.outKey)}}class fr extends Tt{constructor({a:e,b:n,outKey:a,outTypeFunc:i}){const s={a:Xn(e),b:Xn(n)},r=i(Xn(e),Xn(n)),o={[a]:r};super({inTypes:s,outTypes:o,inputs:{a:e,b:n}}),this.outKey=a}dynoOut(){return new en(this,this.outKey)}}const St={type:"Gsplat"},dr={type:"PackedSplats"},Pi=(t,e)=>new zh({packedSplats:t,index:e}),_h=(t,e,n,a)=>new Rh({packedSplats:t,index:e,base:n,count:a}),Js=t=>new Fh({gsplat:t}),qr=({gsplat:t,flags:e,index:n,center:a,scales:i,quaternion:s,rgba:r,rgb:o,opacity:A,x:l,y:u,z:c,r:g,g:f,b:p})=>new Nh({gsplat:t,flags:e,index:n,center:a,scales:i,quaternion:s,rgba:r,rgb:o,opacity:A,x:l,y:u,z:c,r:g,g:f,b:p}),Ul=(t,{scale:e,rotate:n,translate:a,recolor:i})=>new Lh({gsplat:t,scale:e,rotate:n,translate:a,recolor:i}),Pn=an(`
  struct Gsplat {
    vec3 center;
    uint flags;
    vec3 scales;
    int index;
    vec4 quaternion;
    vec4 rgba;
  };
  const uint GSPLAT_FLAG_ACTIVE = 1u << 0u;

  bool isGsplatActive(uint flags) {
    return (flags & GSPLAT_FLAG_ACTIVE) != 0u;
  }
`),Fo=an(`
  struct PackedSplats {
    usampler2DArray texture;
    int numSplats;
    vec4 rgbMinMaxLnScaleMinMax;
  };
`),Yl=an(`
  bool readPackedSplat(usampler2DArray texture, int numSplats, vec4 rgbMinMaxLnScaleMinMax, int index, out Gsplat gsplat) {
    if ((index >= 0) && (index < numSplats)) {
      uvec4 packed = texelFetch(texture, splatTexCoord(index), 0);
      unpackSplatEncoding(packed, gsplat.center, gsplat.scales, gsplat.quaternion, gsplat.rgba, rgbMinMaxLnScaleMinMax);
      return true;
    } else {
      return false;
    }
  }
`);class zh extends Tt{constructor({packedSplats:e,index:n}){super({inTypes:{packedSplats:dr,index:"int"},outTypes:{gsplat:St},inputs:{packedSplats:e,index:n},globals:()=>[Pn,Fo,Yl],statements:({inputs:a,outputs:i})=>{const{gsplat:s}=i;if(!s)return[];const{packedSplats:r,index:o}=a;let A;return r&&o?A=qn(`
            if (readPackedSplat(${r}.texture, ${r}.numSplats, ${r}.rgbMinMaxLnScaleMinMax, ${o}, ${s})) {
              bool zeroSize = all(equal(${s}.scales, vec3(0.0, 0.0, 0.0)));
              ${s}.flags = zeroSize ? 0u : GSPLAT_FLAG_ACTIVE;
            } else {
              ${s}.flags = 0u;
            }
          `):A=[`${s}.flags = 0u;`],A.push(`${s}.index = ${o??"0"};`),A}})}dynoOut(){return new en(this,"gsplat")}}class Rh extends Tt{constructor({packedSplats:e,index:n,base:a,count:i}){super({inTypes:{packedSplats:dr,index:"int",base:"int",count:"int"},outTypes:{gsplat:St},inputs:{packedSplats:e,index:n,base:a,count:i},globals:()=>[Pn,Fo,Yl],statements:({inputs:s,outputs:r})=>{const{gsplat:o}=r;if(!o)return[];const{packedSplats:A,index:l,base:u,count:c}=s;let g;return A&&l&&u&&c?g=qn(`
            ${o}.flags = 0u;
            if ((${l} >= ${u}) && (${l} < (${u} + ${c}))) {
              if (readPackedSplat(${A}.texture, ${A}.numSplats, ${A}.rgbMinMaxLnScaleMinMax, ${l}, ${o})) {
                bool zeroSize = all(equal(${o}.scales, vec3(0.0, 0.0, 0.0)));
                ${o}.flags = zeroSize ? 0u : GSPLAT_FLAG_ACTIVE;
              }
            }
          `):g=[`${o}.flags = 0u;`],g.push(`${o}.index = ${l??"0"};`),g}})}dynoOut(){return new en(this,"gsplat")}}class Fh extends Tt{constructor({gsplat:e}){super({inTypes:{gsplat:St},outTypes:{flags:"uint",active:"bool",index:"int",center:"vec3",scales:"vec3",quaternion:"vec4",rgba:"vec4",rgb:"vec3",opacity:"float",x:"float",y:"float",z:"float",r:"float",g:"float",b:"float"},inputs:{gsplat:e},globals:()=>[Pn],statements:({inputs:n,outputs:a})=>{const{gsplat:i}=n,{flags:s,active:r,index:o,center:A,scales:l,quaternion:u,rgba:c,rgb:g,opacity:f,x:p,y:m,z:B,r:d,g:E,b:I}=a;return[s?`${s} = ${i?`${i}.flags`:"0u"};`:null,r?`${r} = isGsplatActive(${i?`${i}.flags`:"0u"});`:null,o?`${o} = ${i?`${i}.index`:"0"};`:null,A?`${A} = ${i?`${i}.center`:"vec3(0.0, 0.0, 0.0)"};`:null,l?`${l} = ${i?`${i}.scales`:"vec3(0.0, 0.0, 0.0)"};`:null,u?`${u} = ${i?`${i}.quaternion`:"vec4(0.0, 0.0, 0.0, 1.0)"};`:null,c?`${c} = ${i?`${i}.rgba`:"vec4(0.0, 0.0, 0.0, 0.0)"};`:null,g?`${g} = ${i?`${i}.rgba.rgb`:"vec3(0.0, 0.0, 0.0)"};`:null,f?`${f} = ${i?`${i}.rgba.a`:"0.0"};`:null,p?`${p} = ${i?`${i}.center.x`:"0.0"};`:null,m?`${m} = ${i?`${i}.center.y`:"0.0"};`:null,B?`${B} = ${i?`${i}.center.z`:"0.0"};`:null,d?`${d} = ${i?`${i}.rgba.r`:"0.0"};`:null,E?`${E} = ${i?`${i}.rgba.g`:"0.0"};`:null,I?`${I} = ${i?`${i}.rgba.b`:"0.0"};`:null].filter(Boolean)}})}}class Nh extends Tt{constructor({gsplat:e,flags:n,index:a,center:i,scales:s,quaternion:r,rgba:o,rgb:A,opacity:l,x:u,y:c,z:g,r:f,g:p,b:m}){super({inTypes:{gsplat:St,flags:"uint",index:"int",center:"vec3",scales:"vec3",quaternion:"vec4",rgba:"vec4",rgb:"vec3",opacity:"float",x:"float",y:"float",z:"float",r:"float",g:"float",b:"float"},outTypes:{gsplat:St},inputs:{gsplat:e,flags:n,index:a,center:i,scales:s,quaternion:r,rgba:o,rgb:A,opacity:l,x:u,y:c,z:g,r:f,g:p,b:m},globals:()=>[Pn],statements:({inputs:B,outputs:d})=>{const{gsplat:E}=d;if(!E)return[];const{gsplat:I,flags:y,index:Q,center:D,scales:v,quaternion:T,rgba:F,rgb:Z,opacity:x,x:z,y:se,z:J,r:oe,g:G,b:me}=B;return[`${E}.flags = ${y??(I?`${I}.flags`:"0u")};`,`${E}.index = ${Q??(I?`${I}.index`:"0")};`,`${E}.center = ${D??(I?`${I}.center`:"vec3(0.0, 0.0, 0.0)")};`,`${E}.scales = ${v??(I?`${I}.scales`:"vec3(0.0, 0.0, 0.0)")};`,`${E}.quaternion = ${T??(I?`${I}.quaternion`:"vec4(0.0, 0.0, 0.0, 1.0)")};`,`${E}.rgba = ${F??(I?`${I}.rgba`:"vec4(0.0, 0.0, 0.0, 0.0)")};`,Z?`${E}.rgba.rgb = ${Z};`:null,x?`${E}.rgba.a = ${x};`:null,z?`${E}.center.x = ${z};`:null,se?`${E}.center.y = ${se};`:null,J?`${E}.center.z = ${J};`:null,oe?`${E}.rgba.r = ${oe};`:null,G?`${E}.rgba.g = ${G};`:null,me?`${E}.rgba.b = ${me};`:null].filter(Boolean)}})}dynoOut(){return new en(this,"gsplat")}}an(`
  vec3 gsplatNormal(vec3 scales, vec4 quaternion) {
    float minScale = min(scales.x, min(scales.y, scales.z));
    vec3 normal;
    if (scales.z == minScale) {
      normal = vec3(0.0, 0.0, 1.0);
    } else if (scales.y == minScale) {
      normal = vec3(0.0, 1.0, 0.0);
    } else {
      normal = vec3(1.0, 0.0, 0.0);
    }
    return quatVec(quaternion, normal);
  }
`);class Lh extends Tt{constructor({gsplat:e,scale:n,rotate:a,translate:i,recolor:s}){super({inTypes:{gsplat:St,scale:"float",rotate:"vec4",translate:"vec3",recolor:"vec4"},outTypes:{gsplat:St},inputs:{gsplat:e,scale:n,rotate:a,translate:i,recolor:s},globals:()=>[Pn],statements:({inputs:r,outputs:o,compile:A})=>{const{gsplat:l}=o;if(!l||!r.gsplat)return[];const{scale:u,rotate:c,translate:g,recolor:f}=r,p=A.indent;return[`${l} = ${r.gsplat};`,`if (isGsplatActive(${l}.flags)) {`,u?`${p}${l}.center *= ${u};`:null,c?`${p}${l}.center = quatVec(${c}, ${l}.center);`:null,g?`${p}${l}.center += ${g};`:null,u?`${p}${l}.scales *= ${u};`:null,c?`${p}${l}.quaternion = quatQuat(${c}, ${l}.quaternion);`:null,f?`${p}${l}.rgba *= ${f};`:null,"}"].filter(Boolean)}})}dynoOut(){return new en(this,"gsplat")}}const Gh=(t,e)=>new Uh({gsplat:t,rgbMinMaxLnScaleMinMax:e});class Uh extends Tt{constructor({gsplat:e,rgbMinMaxLnScaleMinMax:n}){super({inTypes:{gsplat:St,rgbMinMaxLnScaleMinMax:"vec4"},inputs:{gsplat:e,rgbMinMaxLnScaleMinMax:n},globals:()=>[Pn],statements:({inputs:a,outputs:i})=>{const{output:s}=i;if(!s)return[];const{gsplat:r,rgbMinMaxLnScaleMinMax:o}=a;return r?qn(`
            if (isGsplatActive(${r}.flags)) {
              ${s} = packSplatEncoding(${r}.center, ${r}.scales, ${r}.quaternion, ${r}.rgba, ${o});
            } else {
              ${s} = uvec4(0u, 0u, 0u, 0u);
            }
          `):[`${s} = uvec4(0u, 0u, 0u, 0u);`]}})}dynoOut(){return new en(this,"output")}}class Yh extends Tt{constructor({rgba8:e}){super({inTypes:{rgba8:"vec4"},inputs:{rgba8:e},statements:({inputs:n,outputs:a})=>[`target = ${n.rgba8??"vec4(0.0, 0.0, 0.0, 0.0)"};`]})}dynoOut(){return new en(this,"rgba8")}}class xn extends Tt{constructor({key:e,type:n,count:a,value:i,update:s,globals:r}){e=e??"value",super({outTypes:{[e]:n},update:()=>{if(s){const o=s(this.value);o!==void 0&&(this.value=o)}this.uniform.value=this.value},generate:({inputs:o,outputs:A})=>{const l=(r==null?void 0:r({inputs:o,outputs:A}))??[],u={},c=A[e];return c&&(l.push(`uniform ${Gl(c,n,a)};`),u[c]=this.uniform),{globals:l,uniforms:u}}}),this.type=n,this.count=a,this.value=i,this.uniform={value:i},this.outKey=e}dynoOut(){return new en(this,this.outKey)}}class xA extends xn{constructor({key:e,value:n,update:a}){super({key:e,type:"bool",value:n,update:a})}}class co extends xn{constructor({key:e,value:n,update:a}){super({key:e,type:"int",value:n,update:a})}}class Zi extends xn{constructor({key:e,value:n,update:a}){super({key:e,type:"float",value:n,update:a})}}class Pr extends xn{constructor({key:e,value:n,update:a}){super({key:e,type:"vec2",value:n,update:a})}}class $s extends xn{constructor({key:e,value:n,update:a}){super({key:e,type:"vec3",value:n,update:a})}}class pr extends xn{constructor({key:e,value:n,update:a}){super({key:e,type:"vec4",value:n,update:a})}}class Hr extends xn{constructor({key:e,value:n,update:a}){super({key:e,type:"usampler2DArray",value:n,update:a})}}const No=new Float32Array(1),ql=new Uint32Array(No.buffer),Lo="Float16Array"in globalThis,er=Lo?new globalThis.Float16Array(1):null,Pl=new Uint16Array(er==null?void 0:er.buffer),Jr=Lo?qh:Ph,Or=Lo?Hh:Jh;function qh(t){return er[0]=t,Pl[0]}function Ph(t){No[0]=t;const e=ql[0],n=e>>31&1,a=e>>23&255,i=e&8388607,s=n<<15;if(a===255)return i!==0?s|32767:s|31744;const r=a-127+15;if(r>=31)return s|31744;if(r<=0){if(r<-10)return s;const A=(i|8388608)>>1-r+13;return s|A}const o=i>>13;return s|r<<10|o}function Hh(t){return Pl[0]=t,er[0]}function Jh(t){const e=t>>15&1,n=t>>10&31,a=t&1023;let i;if(n===0)if(a===0)i=e<<31;else{let s=a,r=-14;for(;!(s&1024);)s<<=1,r--;s&=1023;const o=r+127,A=s<<13;i=e<<31|o<<23|A}else if(n===31)a===0?i=e<<31|2139095040:i=e<<31|2143289344;else{const s=n-15+127,r=a<<13;i=e<<31|s<<23|r}return ql[0]=i,No[0]}function _s(t){return Math.max(0,Math.min(255,Math.round(t*255)))}function Oh(t){const e=[],n=new Set;function a(i){i&&typeof i=="object"&&!n.has(i)&&(n.add(i),i instanceof ArrayBuffer?e.push(i):ArrayBuffer.isView(i)?e.push(i.buffer):Array.isArray(i)?i.forEach(a):Object.values(i).forEach(a))}return a(t),e}class Vh{constructor({allocate:e,dispose:n,valid:a}){this.items=[],this.allocate=e,this.dispose=n,this.valid=a}alloc(e){for(;;){const n=this.items.pop();if(!n)break;if(this.valid(n,e))return n;this.dispose&&this.dispose(n)}return this.allocate(e)}free(e){this.items.push(e)}disposeAll(){let e;for(e=this.items.pop();e;)this.dispose&&this.dispose(e),e=this.items.pop()}}function bA(t,e,n,a,i,s,r,o,A,l,u,c,g,f,p,m,B){const d=(B==null?void 0:B.rgbMin)??0,I=((B==null?void 0:B.rgbMax)??1)-d,y=_s((f-d)/I),Q=_s((p-d)/I),D=_s((m-d)/I),v=_s(g),T=r0(jh.set(A,l,u,c)),F=T&255,Z=T>>>8&255,x=T>>>16&255,z=(B==null?void 0:B.lnScaleMin)??$n,J=254/(((B==null?void 0:B.lnScaleMax)??ea)-z),oe=s<Yr?0:Math.min(255,Math.max(1,Math.round((Math.log(s)-z)*J)+1)),G=r<Yr?0:Math.min(255,Math.max(1,Math.round((Math.log(r)-z)*J)+1)),me=o<Yr?0:Math.min(255,Math.max(1,Math.round((Math.log(o)-z)*J)+1)),Ee=Jr(n),w=Jr(a),X=Jr(i),L=e*4;t[L]=y|Q<<8|D<<16|v<<24,t[L+1]=Ee|w<<16,t[L+2]=X|F<<16|Z<<24,t[L+3]=oe|G<<8|me<<16|x<<24}const jh=new Rt,Wh=new j,Xh=new j,Kh=new Rt,Zh=new Xe,$h={center:Wh,scales:Xh,quaternion:Kh,color:Zh,opacity:0};function QA(t,e,n){const a=$h,i=e*4,s=t[i],r=t[i+1],o=t[i+2],A=t[i+3],l=(n==null?void 0:n.rgbMin)??0,c=((n==null?void 0:n.rgbMax)??1)-l;a.color.set(l+(s&255)/255*c,l+(s>>>8&255)/255*c,l+(s>>>16&255)/255*c),a.opacity=(s>>>24&255)/255,a.center.set(Or(r&65535),Or(r>>>16&65535),Or(o&65535));const g=(n==null?void 0:n.lnScaleMin)??$n,p=(((n==null?void 0:n.lnScaleMax)??ea)-g)/254,m=A&255;a.scales.x=m===0?0:Math.exp(g+(m-1)*p);const B=A>>>8&255;a.scales.y=B===0?0:Math.exp(g+(B-1)*p);const d=A>>>16&255;a.scales.z=d===0?0:Math.exp(g+(d-1)*p);const E=o>>>16&65535|A>>>8&16711680;return o0(E,a.quaternion),a}function fn(t){const e=nt,n=Math.max(xh,Math.min(ka,Math.ceil(t/e))),a=Math.ceil(t/(e*n)),i=e*n*a;return{width:e,height:n,depth:a,maxSplats:i}}function e0(t){const e=new _o(t.autoStart);return e.startTime=t.startTime,e.oldTime=t.oldTime,e.elapsedTime=t.elapsedTime,e.running=t.running,e}const t0=an(`
  precision highp float;

  in vec3 position;

  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`);function n0(t){const e=new j;for(const n of t)e.add(n);return e.divideScalar(t.length)}function a0(t){if(t.length===0)return new Rt;const e=t[0].clone();for(let n=1;n<t.length;n++)t[n].dot(t[0])<0?(e.x-=t[n].x,e.y-=t[n].y,e.z-=t[n].z,e.w-=t[n].w):(e.x+=t[n].x,e.y+=t[n].y,e.z+=t[n].z,e.w+=t[n].w);return e.normalize()}function i0(t,e){const[n,a]=[new j,new Rt],[i,s]=[new j,new Rt];t.decompose(n,a,new j),e.decompose(i,s,new j);const r=n.distanceTo(i),o=Math.abs(a.dot(s));return{distance:r,coorient:o}}function uo({matrix1:t,matrix2:e,maxDistance:n,minCoorient:a}){const{distance:i,coorient:s}=i0(t,e);return i<=n&&(a==null||s>=a)}const s0=new Rt,go=new j;function r0(t){const e=s0.copy(t).normalize();e.w<0&&e.set(-e.x,-e.y,-e.z,-e.w);const n=2*Math.acos(e.w),a=Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z),i=a<1e-6?go.set(1,0,0):go.set(e.x,e.y,e.z).divideScalar(a),s=Math.abs(i.x)+Math.abs(i.y)+Math.abs(i.z);let r=i.x/s,o=i.y/s;if(i.z<0){const f=r;r=(1-Math.abs(o))*(r>=0?1:-1),o=(1-Math.abs(f))*(o>=0?1:-1)}const A=r*.5+.5,l=o*.5+.5,u=Math.round(A*255),c=Math.round(l*255);return Math.round(n*(255/Math.PI))<<16|c<<8|u}function o0(t,e){const n=t&255,a=t>>>8&255,i=t>>>16&255,s=n/255,r=a/255;let o=(s-.5)*2,A=(r-.5)*2;const l=1-(Math.abs(o)+Math.abs(A)),u=Math.max(-l,0);o+=o>=0?-u:u,A+=A>=0?-u:u;const c=go.set(o,A,l).normalize(),f=i/255*Math.PI*.5,p=Math.sin(f),m=Math.cos(f);return e.set(c.x*p,c.y*p,c.z*p,m),e}function A0(t,e){const n=[];let a=0,i=null;const s=new oh((A,l)=>{if(n.push(A),a+=A.length,l||a>=e){const u=new Uint8Array(a);let c=0;for(const g of n)u.set(g,c),c+=g.length;i=u.slice(0,e)}}),r=1024;let o=0;for(;i==null&&o<t.length;){const A=t.slice(o,o+r);s.push(A,!1),o+=r}if(i==null&&(s.push(new Uint8Array,!0),i==null))throw new Error("Failed to decompress partial gzip");return i}class Hl{constructor({graph:e,inputs:n,outputs:a,template:i}){this.graph=e,this.template=i,this.inputs=n??{},this.outputs=a??{};const s=new Dh({indent:this.template.indent});for(const o in this.outputs)this.outputs[o]&&s.declares.add(this.outputs[o]);const r=e.compile({inputs:this.inputs,outputs:this.outputs,compile:s});this.shader=i.generate({globals:s.globals,statements:r}),this.uniforms=s.uniforms,this.updaters=s.updaters}prepareMaterial(){return l0(this)}update(){for(const e of this.updaters)e()}}class Jl{constructor(e){const n=e.match(/^([ \t]*)\{\{\s*GLOBALS\s*\}\}/m),a=e.match(/^([ \t]*)\{\{\s*STATEMENTS\s*\}\}/m);if(!n||!a)throw new Error("Template must contain {{ GLOBALS }} and {{ STATEMENTS }}");this.before=e.substring(0,n.index),this.between=e.substring(n.index+n[0].length,a.index),this.after=e.substring(a.index+a[0].length),this.indent=a[1]}generate({globals:e,statements:n}){return this.before+Array.from(e).join(`

`)+this.between+n.map(a=>this.indent+a).join(`
`)+this.after}}const vA=new Map;function l0(t){let e=vA.get(t);return e||(e=new Do({glslVersion:hl,vertexShader:t0,fragmentShader:t.shader,uniforms:t.uniforms}),vA.set(t,e),e)}function Ol(t,e,n="add"){const a=()=>{throw new Error(`Invalid ${n} types: ${t}, ${e}`)};if(t===e)return t;if(t==="int"){if(Da(e))return e;a()}if(e==="int"){if(Da(t))return t;a()}if(t==="uint"){if(Ta(e))return e;a()}if(e==="uint"){if(Ta(t))return t;a()}if(t==="float"){if(Ki(e))return e;a()}if(e==="float"){if(Ki(t))return t;a()}throw new Error(`Invalid ${n} types: ${t}, ${e}`)}function c0(t,e){return Ol(t,e,"sub")}function u0(t,e){const n=()=>{throw new Error(`Invalid mul types: ${t}, ${e}`)},a=i=>i;if(t==="int"){if(Da(e))return a(e);n()}if(e==="int"){if(Da(t))return a(t);n()}if(t==="uint"){if(Ta(e))return a(e);n()}if(e==="uint"){if(Ta(t))return a(t);n()}if(t==="float"){if(Ki(e))return a(e);n()}if(e==="float"){if(Ki(t))return a(t);n()}if(Da(t)||Ta(t)||Da(e)||Ta(e)){if(t===e)return a(t);n()}if(t==="vec2"){if(e==="vec2"||Xa(e))return a("vec2");if(e==="mat3x2")return a("vec3");if(e==="mat4x2")return a("vec4");n()}if(t==="vec3"){if(e==="mat2x3")return a("vec2");if(e==="vec3"||Ka(e))return a("vec3");if(e==="mat4x3")return a("vec4");n()}if(t==="vec4"){if(e==="mat2x4")return a("vec2");if(e==="mat3x4")return a("vec3");if(e==="vec4"||Za(e))return a("vec4");n()}if(e==="vec2"){if(Xa(t))return a("vec2");if(t==="mat2x3")return a("vec3");if(t==="mat2x4")return a("vec4");n()}if(e==="vec3"){if(t==="mat3x2")return a("vec2");if(Ka(t))return a("vec3");if(t==="mat3x4")return a("vec4");n()}if(e==="vec4"){if(t==="mat4x2")return a("vec2");if(t==="mat4x3")return a("vec3");if(Za(t))return a("vec4");n()}if(Xa(t)){if(Xa(e))return a("mat2");if(e==="mat3x2")return a("mat3x2");if(e==="mat4x2")return a("mat4x2");n()}if(t==="mat2x3"){if(Xa(e))return a("mat2x3");if(e==="mat3x2")return a("mat3");if(e==="mat4x2")return a("mat4x3");n()}if(t==="mat2x4"){if(Xa(e))return a("mat2x4");if(e==="mat3x2")return a("mat3x4");if(e==="mat4x2")return a("mat4");n()}if(t==="mat3x2"){if(e==="mat2x3")return a("mat2");if(Ka(e))return a("mat3x2");if(e==="mat4x3")return a("mat4x2");n()}if(Ka(t)){if(e==="mat2x3")return a("mat2x3");if(Ka(e))return a("mat3");if(e==="mat4x3")return a("mat4x3");n()}if(t==="mat3x4"){if(e==="mat2x3")return a("mat2x4");if(Ka(e))return a("mat3x4");if(e==="mat4x3")return a("mat4");n()}if(t==="mat4x2"){if(e==="mat2x4")return a("mat2");if(e==="mat3x4")return a("mat3x2");if(Za(e))return a("mat4x2");n()}if(t==="mat4x3"){if(e==="mat2x4")return a("mat2x3");if(e==="mat3x4")return a("mat3");if(Za(e))return a("mat4x3");n()}if(Za(t)){if(e==="mat2x4")return a("mat2x4");if(e==="mat3x4")return a("mat3x4");if(Za(e))return a("mat4");n()}throw new Error(`Invalid mul types: ${t}, ${e}`)}const Qa=(t,e)=>new g0({a:t,b:e}),SA=(t,e)=>new h0({a:t,b:e}),Ti=(t,e)=>new f0({a:t,b:e});class g0 extends fr{constructor({a:e,b:n}){super({a:e,b:n,outKey:"sum",outTypeFunc:Ol}),this.statements=({inputs:a,outputs:i})=>[`${i.sum} = ${a.a} + ${a.b};`]}}class h0 extends fr{constructor({a:e,b:n}){super({a:e,b:n,outKey:"difference",outTypeFunc:c0}),this.statements=({inputs:a,outputs:i})=>[`${i.difference} = ${a.a} - ${a.b};`]}}class f0 extends fr{constructor({a:e,b:n}){super({a:e,b:n,outKey:"product",outTypeFunc:u0}),this.statements=({inputs:a,outputs:i})=>[`${i.product} = ${a.a} * ${a.b};`]}}const d0=t=>new m0({value:t}),p0=t=>new I0({value:t}),MA=t=>new C0({value:t});class m0 extends hr{constructor({value:e}){super({a:e,outKey:"uint",outTypeFunc:()=>"uint"}),this.statements=({inputs:n,outputs:a})=>[`${a.uint} = floatBitsToUint(${n.a});`]}}class I0 extends hr{constructor({value:e}){super({a:e,outKey:"uint",outTypeFunc:()=>"uint"}),this.statements=({inputs:n,outputs:a})=>[`${a.uint} = packHalf2x16(${n.a});`]}}class C0 extends hr{constructor({value:e}){super({a:e,outKey:"rgba8",outTypeFunc:()=>"vec4"}),this.statements=({inputs:n,outputs:a})=>[`uvec4 uRgba = uvec4(${n.a} & 0xffu, (${n.a} >> 8u) & 0xffu, (${n.a} >> 16u) & 0xffu, (${n.a} >> 24u) & 0xffu);`,`${a.rgba8} = vec4(uRgba) / 255.0;`]}}const B0=t=>new x0({a:t}),E0=t=>new S0({vector:t}),y0=({vector:t,vectorType:e,x:n,y:a,z:i,w:s,r,g:o,b:A,a:l})=>new M0({vector:t,vectorType:e,x:n,y:a,z:i,w:s,r,g:o,b:A,a:l}),w0=(t,e)=>new Q0({a:t,b:e});class x0 extends hr{constructor({a:e}){super({a:e,outTypeFunc:n=>n,outKey:"normalize"}),this.statements=({inputs:n,outputs:a})=>[`${a.normalize} = normalize(${n.a});`]}}function b0(t){if(t==="float")return"vec2";if(t==="vec2")return"vec3";if(t==="vec3")return"vec4";throw new Error("Invalid type")}class Q0 extends fr{constructor({a:e,b:n}){const a=Xn(e),i=b0(a);super({a:e,b:n,outKey:"extend",outTypeFunc:()=>i}),this.statements=({inputs:s,outputs:r})=>[`${r.extend} = ${i}(${s.a}, ${s.b});`]}}function v0(t){const e=n=>n;switch(t){case"vec2":return e({x:"float",y:"float",r:"float",g:"float"});case"vec3":return e({x:"float",y:"float",z:"float",r:"float",g:"float",b:"float"});case"vec4":return e({x:"float",y:"float",z:"float",w:"float",r:"float",g:"float",b:"float",a:"float"});case"ivec2":return e({x:"int",y:"int",r:"int",g:"int"});case"ivec3":return e({x:"int",y:"int",z:"int",r:"int",g:"int",b:"int"});case"ivec4":return e({x:"int",y:"int",z:"int",w:"int",r:"int",g:"int",b:"int",a:"int"});case"uvec2":return e({x:"uint",y:"uint",r:"uint",g:"uint"});case"uvec3":return e({x:"uint",y:"uint",z:"uint",r:"uint",g:"uint",b:"uint"});case"uvec4":return e({x:"uint",y:"uint",z:"uint",w:"uint",r:"uint",g:"uint",b:"uint",a:"uint"});default:throw new Error(`Invalid vector type: ${t}`)}}class S0 extends Tt{constructor({vector:e}){const a={vector:Xn(e)},i=v0(a.vector);super({inTypes:a,outTypes:i,inputs:{vector:e}}),this.statements=({inputs:s,outputs:r})=>{const{x:o,y:A,z:l,w:u,r:c,g,b:f,a:p}=r,{vector:m}=s;return[o?`${o} = ${m}.x;`:null,A?`${A} = ${m}.y;`:null,l?`${l} = ${m}.z;`:null,u?`${u} = ${m}.w;`:null,c?`${c} = ${m}.r;`:null,g?`${g} = ${m}.g;`:null,f?`${f} = ${m}.b;`:null,p?`${p} = ${m}.a;`:null].filter(Boolean)}}}class M0 extends Tt{constructor({vector:e,vectorType:n,x:a,y:i,z:s,w:r,r:o,g:A,b:l,a:u}){if(!e&&!n)throw new Error("Either vector or vectorType must be provided");const c=n??Xn(e),g=Sh(c),f=Mh(c),p={vector:c,x:g,y:g,r:g,g},m={vector:e,x:a,y:i,r:o,g:A};f>=3&&(Object.assign(p,{z:g,b:g}),Object.assign(m,{z:s,b:l})),f>=4&&(Object.assign(p,{w:g,a:g}),Object.assign(m,{w:r,a:u})),super({inTypes:p,outTypes:{vector:c},inputs:m}),this.statements=({inputs:B,outputs:d})=>{const{vector:E}=d,{vector:I,x:y,y:Q,z:D,w:v,r:T,g:F,b:Z,a:x}=B,z=[`${E}.x = ${y??T??(I?`${I}.x`:Ts(g))};`,`${E}.y = ${Q??F??(I?`${I}.y`:Ts(g))};`];return f>=3&&z.push(`${E}.z = ${D??Z??(I?`${I}.z`:Ts(g))};`),f>=4&&z.push(`${E}.w = ${v??x??(I?`${I}.w`:Ts(g))};`),z}}dynoOut(){return new en(this,"vector")}}const k0=(t,{scale:e,scales:n,rotate:a,translate:i})=>new T0({position:t,scale:e,scales:n,rotate:a,translate:i}).outputs.position,D0=(t,{scale:e,scales:n,rotate:a})=>new _0({dir:t,scale:e,scales:n,rotate:a}).outputs.dir;class T0 extends Tt{constructor({position:e,scale:n,scales:a,rotate:i,translate:s}){super({inTypes:{position:"vec3",scale:"float",scales:"vec3",rotate:"vec4",translate:"vec3"},outTypes:{position:"vec3"},inputs:{position:e,scale:n,scales:a,rotate:i,translate:s},statements:({inputs:r,outputs:o})=>{const{position:A}=o;if(!A)return[];const{scale:l,scales:u,rotate:c,translate:g}=r;return[`${A} = ${r.position??"vec3(0.0, 0.0, 0.0)"};`,l?`${A} *= ${l};`:null,u?`${A} *= ${u};`:null,c?`${A} = quatVec(${c}, ${A});`:null,g?`${A} += ${g};`:null].filter(Boolean)}})}}class _0 extends Tt{constructor({dir:e,scale:n,scales:a,rotate:i}){super({inTypes:{dir:"vec3",scale:"float",scales:"vec3",rotate:"vec4"},outTypes:{dir:"vec3"},inputs:{dir:e,scale:n,scales:a,rotate:i},statements:({inputs:s,outputs:r})=>{const{dir:o}=r;if(!o)return[];const{scale:A,scales:l,rotate:u}=s;return[`${o} = ${s.dir??"vec3(0.0, 0.0, 0.0)"};`,A?`${o} *= ${A};`:null,l?`${o} *= ${l};`:null,u?`${o} = quatVec(${u}, ${o});`:null].filter(Boolean)}})}}var z0=`precision highp float;
precision highp int;
precision highp sampler2D;
precision highp usampler2D;
precision highp isampler2D;
precision highp sampler2DArray;
precision highp usampler2DArray;
precision highp isampler2DArray;
precision highp sampler3D;
precision highp usampler3D;
precision highp isampler3D;

#include <splatDefines>

uniform uint targetLayer;
uniform int targetBase;
uniform int targetCount;

out vec4 target;

{{ GLOBALS }}

void computeReadback(int index) {
    {{ STATEMENTS }}
}

void main() {
    int targetIndex = int(targetLayer << SPLAT_TEX_LAYER_BITS) + int(uint(gl_FragCoord.y) << SPLAT_TEX_WIDTH_BITS) + int(gl_FragCoord.x);
    int index = targetIndex - targetBase;

    if ((index >= 0) && (index < targetCount)) {
        computeReadback(index);
    } else {
        target = vec4(0.0, 0.0, 0.0, 0.0);
    }
}`;const mr=class ua{constructor({renderer:e}={}){this.renderer=e,this.capacity=0,this.count=0}dispose(){this.target&&(this.target.dispose(),this.target=void 0)}ensureBuffer(e,n){const i=Math.ceil(Math.max(1,e)/nt)*nt*4;if(n.byteLength>=i)return n;const s=new ArrayBuffer(i);if(n instanceof ArrayBuffer)return s;const r=n.constructor;return new r(s)}ensureCapacity(e){const{width:n,height:a,depth:i,maxSplats:s}=fn(e);(!this.target||s>this.capacity)&&(this.dispose(),this.capacity=s,this.target=new pl(n,a,i,{depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,magFilter:Ia,minFilter:Ia}),this.target.texture.format=Ua,this.target.texture.type=mi,this.target.texture.internalFormat="RGBA8",this.target.scissorTest=!0)}prepareProgramMaterial(e){let n=ua.readbackProgram.get(e);if(!n){const i=ta({index:"int"},{rgba8:"vec4"},({index:s})=>(e.inputs.index=s,{rgba8:new Yh({rgba8:e.outputs.rgba8})}));ua.programTemplate||(ua.programTemplate=new Jl(z0)),n=new Hl({graph:i,inputs:{index:"index"},outputs:{rgba8:"target"},template:ua.programTemplate}),Object.assign(n.uniforms,{targetLayer:{value:0},targetBase:{value:0},targetCount:{value:0}}),ua.readbackProgram.set(e,n)}const a=n.prepareMaterial();return ua.fullScreenQuad.material=a,{program:n,material:a}}saveRenderState(e){return{xrEnabled:e.xr.enabled,autoClear:e.autoClear}}resetRenderState(e,n){e.setRenderTarget(null),e.xr.enabled=n.xrEnabled,e.autoClear=n.autoClear}process({count:e,material:n}){const a=this.renderer;if(!a)throw new Error("No renderer");if(!this.target)throw new Error("No target");const i=nt*ka;n.uniforms.targetBase.value=0,n.uniforms.targetCount.value=e;let s=0;for(;s<e;){const r=Math.floor(s/i),o=r*i,A=Math.min(ka,Math.ceil((e-o)/nt));n.uniforms.targetLayer.value=r,this.target.scissor.set(0,0,nt,A),a.setRenderTarget(this.target,r),a.xr.enabled=!1,a.autoClear=!1,ua.fullScreenQuad.render(a),s+=nt*A}this.count=e}async read({readback:e}){const n=this.renderer;if(!n)throw new Error("No renderer");if(!this.target)throw new Error("No target");const a=Math.ceil(this.count/nt)*nt;if(e.byteLength<a*4)throw new Error(`Readback buffer too small: ${e.byteLength} < ${a*4}`);const i=new Uint8Array(e instanceof ArrayBuffer?e:e.buffer),s=nt*ka;let r=0;const o=[];for(;r<this.count;){const A=Math.floor(r/s),l=A*s,u=Math.min(ka,Math.ceil((this.count-l)/nt));n.setRenderTarget(this.target,A);const c=nt*u*4,g=i.subarray(l*4,l*4+c),f=n==null?void 0:n.readRenderTargetPixelsAsync(this.target,0,0,nt,u,g);o.push(f),r+=nt*u}return Promise.all(o).then(()=>e)}render({reader:e,count:n,renderer:a}){if(this.renderer=a||this.renderer,!this.renderer)throw new Error("No renderer");this.ensureCapacity(n);const{program:i,material:s}=this.prepareProgramMaterial(e);i.update();const r=this.saveRenderState(this.renderer);this.process({count:n,material:s}),this.resetRenderState(this.renderer,r)}async readback({readback:e}){if(!this.renderer)throw new Error("No renderer");const n=this.saveRenderState(this.renderer),a=this.read({readback:e});return this.resetRenderState(this.renderer,n),a}async renderReadback({reader:e,count:n,renderer:a,readback:i}){if(this.renderer=a||this.renderer,!this.renderer)throw new Error("No renderer");this.ensureCapacity(n);const{program:s,material:r}=this.prepareProgramMaterial(e);s.update();const o=this.saveRenderState(this.renderer);this.process({count:n,material:r});const A=this.read({readback:i});return this.resetRenderState(this.renderer,o),A}getTexture(){var e;return(e=this.target)==null?void 0:e.texture}};mr.programTemplate=null;mr.readbackProgram=new Map;mr.fullScreenQuad=new vl(new Do({visible:!1}));let Vl=mr;const Go=class Pt{constructor(e={}){this.capacity=0,this.count=0,this.array=null,this.readback=null,this.source=null,this.needsUpdate=!0,this.dyno=new xn({key:"rgbaArray",type:jl,globals:()=>[Wl],value:{texture:Pt.getEmpty(),count:0},update:n=>{var a;return n.texture=((a=this.readback)==null?void 0:a.getTexture())??this.source??Pt.getEmpty(),n.count=this.count,n}}),e.array?(this.array=e.array,this.capacity=Math.floor(this.array.length/4),this.capacity=Math.floor(this.capacity/nt)*nt,this.count=Math.min(this.capacity,e.count??Number.POSITIVE_INFINITY)):(this.capacity=e.capacity??0,this.count=0)}dispose(){this.readback&&(this.readback.dispose(),this.readback=null),this.source&&(this.source.dispose(),this.source=null)}ensureCapacity(e){var n;if(!this.array||e>(((n=this.array)==null?void 0:n.length)??0)/4){this.capacity=fn(e).maxSplats;const a=new Uint8Array(this.capacity*4);this.array&&a.set(this.array),this.array=a}return this.array}getTexture(){var e;let n=(e=this.readback)==null?void 0:e.getTexture();return(this.source||this.array)&&(n=this.maybeUpdateSource()),n??Pt.getEmpty()}maybeUpdateSource(){if(!this.array)throw new Error("No array");if(this.needsUpdate||!this.source){if(this.needsUpdate=!1,this.source){const{width:e,height:n,depth:a}=this.source.image;this.capacity!==e*n*a&&(this.source.dispose(),this.source=null)}if(this.source)this.array.buffer!==this.source.image.data.buffer&&(this.source.image.data=new Uint8Array(this.array.buffer));else{const{width:e,height:n,depth:a}=fn(this.capacity);this.source=new Fa(this.array,e,n,a),this.source.format=Ua,this.source.type=mi,this.source.internalFormat="RGBA8",this.source.needsUpdate=!0}this.source.needsUpdate=!0}return this.source}render({reader:e,count:n,renderer:a}){this.readback||(this.readback=new Vl({renderer:a})),this.readback.render({reader:e,count:n,renderer:a}),this.capacity=this.readback.capacity,this.count=this.readback.count}fromPackedSplats({packedSplats:e,base:n,count:a,renderer:i}){const{dynoSplats:s,dynoBase:r,dynoCount:o,reader:A}=Pt.makeDynos();return s.packedSplats=e,r.value=n,o.value=a,this.render({reader:A,count:a,renderer:i}),this}async read(){if(!this.readback)throw new Error("No readback");return(!this.array||this.array.length<this.count*4)&&(this.array=new Uint8Array(this.capacity*4)),(await this.readback.readback({readback:this.array})).subarray(0,this.count*4)}static getEmpty(){if(!Pt.emptySource){const e=new Uint8Array(4);Pt.emptySource=new Fa(e,1,1,1),Pt.emptySource.format=Ua,Pt.emptySource.type=mi,Pt.emptySource.internalFormat="RGBA8",Pt.emptySource.needsUpdate=!0}return Pt.emptySource}static makeDynos(){if(!Pt.dynos){const e=new qo,n=new co({value:0}),a=new co({value:0}),i=ta({index:"int"},{rgba8:"vec4"},({index:s})=>{if(!s)throw new Error("index is undefined");s=Qa(s,n);const r=_h(e,s,n,a);return{rgba8:Js(r).outputs.rgba}});Pt.dynos={dynoSplats:e,dynoBase:n,dynoCount:a,reader:i}}return Pt.dynos}};Go.emptySource=null;Go.dynos=null;let R0=Go;const jl={type:"RgbaArray"},Wl=an(`
  struct RgbaArray {
    sampler2DArray texture;
    int count;
  };
`);function F0(t,e){return new Tt({inTypes:{rgba:jl,index:"int"},outTypes:{rgba:"vec4"},inputs:{rgba:t,index:e},globals:()=>[Wl],statements:({inputs:a,outputs:i})=>qn(`
        if ((index >= 0) && (index < ${a.rgba}.count)) {
          ${i.rgba} = texelFetch(${a.rgba}.texture, splatTexCoord(index), 0);
        } else {
          ${i.rgba} = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `)}).outputs.rgba}function N0(t){switch(t){case"all":return 0;case"plane":return 1;case"sphere":return 2;case"box":return 3;case"ellipsoid":return 4;case"cylinder":return 5;case"capsule":return 6;case"infinite_cone":return 7;default:throw new Error(`Unknown SDF type: ${t}`)}}function L0(t){switch(t){case"multiply":return 0;case"set_rgb":return 1;case"add_rgba":return 2;default:throw new Error(`Unknown blend mode: ${t}`)}}class G0 extends cr{constructor(e={}){super();const{type:n,invert:a,opacity:i,color:s,displace:r,radius:o}=e;this.type=n??"sphere",this.invert=a??!1,this.opacity=i??1,this.color=s??new Xe(1,1,1),this.displace=r??new j(0,0,0),this.radius=o??0}}const Xl=class Kl extends cr{constructor(e={}){const{name:n,rgbaBlendMode:a="multiply",sdfSmooth:i=0,softEdge:s=0,invert:r=!1,sdfs:o=null}=e;super(),this.rgbaBlendMode=a,this.sdfSmooth=i,this.softEdge=s,this.invert=r,this.sdfs=o,this.ordering=Kl.nextOrdering++,this.name=n??`Edit ${this.ordering}`}addSdf(e){this.sdfs==null&&(this.sdfs=[]),this.sdfs.includes(e)||this.sdfs.push(e)}removeSdf(e){this.sdfs!=null&&(this.sdfs=this.sdfs.filter(n=>n!==e))}};Xl.nextOrdering=1;let Zl=Xl;class U0{constructor({maxSdfs:e,maxEdits:n}){this.maxSdfs=Math.max(16,e??0),this.numSdfs=0,this.sdfData=new Uint32Array(this.maxSdfs*8*4),this.sdfFloatData=new Float32Array(this.sdfData.buffer),this.sdfTexture=this.newSdfTexture(this.sdfData,this.maxSdfs),this.dynoSdfArray=new xn({key:"sdfArray",type:$l,globals:()=>[ec],value:{numSdfs:0,sdfTexture:this.sdfTexture},update:a=>(a.numSdfs=this.numSdfs,a.sdfTexture=this.sdfTexture,a)}),this.maxEdits=Math.max(16,n??0),this.numEdits=0,this.editData=new Uint32Array(this.maxEdits*4),this.editFloatData=new Float32Array(this.editData.buffer),this.dynoNumEdits=new co({value:0}),this.dynoEdits=this.newEdits(this.editData,this.maxEdits)}newSdfTexture(e,n){const a=new zo(e,8,n,Ai,Na);return a.internalFormat="RGBA32UI",a.needsUpdate=!0,a}newEdits(e,n){return new xn({key:"edits",type:"uvec4",count:n,globals:()=>[tc],value:e})}ensureCapacity({maxSdfs:e,maxEdits:n}){let a=!1;return e>this.sdfTexture.image.height&&(this.sdfTexture.dispose(),this.maxSdfs=Math.max(this.maxSdfs*2,e),this.sdfData=new Uint32Array(this.maxSdfs*8*4),this.sdfFloatData=new Float32Array(this.sdfData.buffer),this.sdfTexture=this.newSdfTexture(this.sdfData,this.maxSdfs)),n>(this.dynoEdits.count??0)&&(this.maxEdits=Math.max(this.maxEdits*2,n),this.editData=new Uint32Array(this.maxEdits*4),this.editFloatData=new Float32Array(this.editData.buffer),this.dynoEdits=this.newEdits(this.editData,this.maxEdits),a=!0),a}updateEditData(e,n){const a=this.editData[e]!==n;return this.editData[e]=n,a}updateEditFloatData(e,n){$a[0]=n;const a=this.editFloatData[e]!==$a[0];return a&&(this.editFloatData[e]=$a[0]),a}encodeEdit(e,{sdfFirst:n,sdfCount:a,invert:i,rgbaBlendMode:s,softEdge:r,sdfSmooth:o}){const A=e*4;let l=!1;return l=this.updateEditData(A+0,s|(i?256:0))||l,l=this.updateEditData(A+1,n|a<<16)||l,l=this.updateEditFloatData(A+2,r)||l,l=this.updateEditFloatData(A+3,o)||l,l}updateSdfData(e,n){const a=this.sdfData[e]!==n;return this.sdfData[e]=n,a}updateSdfFloatData(e,n){$a[0]=n;const a=this.sdfFloatData[e]!==$a[0];return a&&(this.sdfFloatData[e]=$a[0]),a}encodeSdf(e,{sdfType:n,invert:a,center:i,quaternion:s,scale:r,sizes:o},A){const l=e*32,u=n|(a?256:0);let c=!1;c=this.updateSdfFloatData(l+0,(i==null?void 0:i.x)??0)||c,c=this.updateSdfFloatData(l+1,(i==null?void 0:i.y)??0)||c,c=this.updateSdfFloatData(l+2,(i==null?void 0:i.z)??0)||c,c=this.updateSdfData(l+3,u)||c,c=this.updateSdfFloatData(l+4,(s==null?void 0:s.x)??0)||c,c=this.updateSdfFloatData(l+5,(s==null?void 0:s.y)??0)||c,c=this.updateSdfFloatData(l+6,(s==null?void 0:s.z)??0)||c,c=this.updateSdfFloatData(l+7,(s==null?void 0:s.w)??0)||c,c=this.updateSdfFloatData(l+8,(r==null?void 0:r.x)??0)||c,c=this.updateSdfFloatData(l+9,(r==null?void 0:r.y)??0)||c,c=this.updateSdfFloatData(l+10,(r==null?void 0:r.z)??0)||c,c=this.updateSdfData(l+11,0)||c,c=this.updateSdfFloatData(l+12,(o==null?void 0:o.x)??0)||c,c=this.updateSdfFloatData(l+13,(o==null?void 0:o.y)??0)||c,c=this.updateSdfFloatData(l+14,(o==null?void 0:o.z)??0)||c,c=this.updateSdfFloatData(l+15,(o==null?void 0:o.w)??0)||c;const g=Math.min(4,A.length);for(let f=0;f<g;++f){const p=l+16+f*4;c=this.updateSdfFloatData(p+0,A[f].x)||c,c=this.updateSdfFloatData(p+1,A[f].y)||c,c=this.updateSdfFloatData(p+2,A[f].z)||c,c=this.updateSdfFloatData(p+3,A[f].w)||c}return c}update(e){const n=e.reduce((c,{sdfs:g})=>c+g.length,0),a=this.ensureCapacity({maxEdits:e.length,maxSdfs:n}),i=[new wn,new wn],s=new j,r=new Rt,o=new j,A=new wn;let l=0,u=a;e.length!==this.dynoNumEdits.value&&(this.dynoNumEdits.value=e.length,this.numEdits=e.length,u=!0);for(const[c,{edit:g,sdfs:f}]of e.entries()){u=this.encodeEdit(c,{sdfFirst:l,sdfCount:f.length,invert:g.invert,rgbaBlendMode:L0(g.rgbaBlendMode),softEdge:g.softEdge,sdfSmooth:g.sdfSmooth})||u;let p=!1;for(const m of f)A.set(m.scale.x,m.scale.y,m.scale.z,m.radius),m.scale.setScalar(1),m.updateMatrixWorld(),m.matrixWorld.clone().invert().decompose(s,r,o),m.scale.set(A.x,A.y,A.z),m.updateMatrixWorld(),i[0].set(m.color.r,m.color.g,m.color.b,m.opacity),i[1].set(m.displace.x,m.displace.y,m.displace.z,1),p=this.encodeSdf(l,{sdfType:N0(m.type),invert:m.invert,center:s,quaternion:r,scale:o,sizes:A},i)||p,l+=1;this.numSdfs=l,p&&(this.sdfTexture.needsUpdate=!0),u||(u=p)}return{updated:u,dynoUpdated:a}}modify(e){return Y0(e,this.dynoSdfArray,this.dynoNumEdits,this.dynoEdits)}}const $l={type:"SdfArray"},ec=an(`
  struct SdfArray {
    int numSdfs;
    usampler2D sdfTexture;
  };

  void unpackSdfArray(
    usampler2D sdfTexture, int sdfIndex, out uint flags,
    out vec3 center, out vec4 quaternion, out vec3 scale, out vec4 sizes,
    int numValues, out vec4 values[4]
  ) {
    uvec4 temp = texelFetch(sdfTexture, ivec2(0, sdfIndex), 0);
    flags = temp.w;
    center = vec3(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z));

    temp = texelFetch(sdfTexture, ivec2(1, sdfIndex), 0);
    quaternion = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));

    temp = texelFetch(sdfTexture, ivec2(2, sdfIndex), 0);
    scale = vec3(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z));

    temp = texelFetch(sdfTexture, ivec2(3, sdfIndex), 0);
    sizes = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));

    for (int i = 0; i < numValues; ++i) {
      temp = texelFetch(sdfTexture, ivec2(4 + i, sdfIndex), 0);
      values[i] = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));
    }
  }

  const uint SDF_FLAG_TYPE = 0xFFu;
  const uint SDF_FLAG_INVERT = 1u << 8u;

  const uint SDF_TYPE_ALL = 0u;
  const uint SDF_TYPE_PLANE = 1u;
  const uint SDF_TYPE_SPHERE = 2u;
  const uint SDF_TYPE_BOX = 3u;
  const uint SDF_TYPE_ELLIPSOID = 4u;
  const uint SDF_TYPE_CYLINDER = 5u;
  const uint SDF_TYPE_CAPSULE = 6u;
  const uint SDF_TYPE_INFINITE_CONE = 7u;

  float evaluateSdfArray(
    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, vec3 pos,
    float smoothK, int numValues, out vec4 outValues[4]
  ) {
    float distanceAccum = (smoothK == 0.0) ? 1.0 / 0.0 : 0.0;
    float maxExp = -1.0 / 0.0;
    for (int i = 0; i < numValues; ++i) {
        outValues[i] = vec4(0.0);
    }

    uint flags;
    vec3 center, scale;
    vec4 quaternion, sizes;
    vec4 values[4];

    int sdfLast = min(sdfFirst + sdfCount, numSdfs);
    for (int index = sdfFirst; index < sdfLast; ++index) {
      unpackSdfArray(sdfTexture, index, flags, center, quaternion, scale, sizes, numValues, values);
      uint sdfType = flags & SDF_FLAG_TYPE;
      vec3 sdfPos = quatVec(quaternion, pos * scale) + center;

      float distance;
      switch (sdfType) {
        case SDF_TYPE_ALL:
          distance = -1.0 / 0.0;
          break;
        case SDF_TYPE_PLANE: {
          distance = sdfPos.z;
          break;
        }
        case SDF_TYPE_SPHERE: {
          distance = length(sdfPos) - sizes.w;
          break;
        }
        case SDF_TYPE_BOX: {
          vec3 q = abs(sdfPos) - sizes.xyz + sizes.w;
          distance = length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - sizes.w;
          break;
        }
        case SDF_TYPE_ELLIPSOID: {
          vec3 sizes = sizes.xyz;
          float k0 = length(sdfPos / sizes);
          float k1 = length(sdfPos / dot(sizes, sizes));
          distance = k0 * (k0 - 1.0) / k1;
          break;
        }
        case SDF_TYPE_CYLINDER: {
          vec2 d = abs(vec2(length(sdfPos.xz), sdfPos.y)) - sizes.wy;
          distance = min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
          break;
        }
        case SDF_TYPE_CAPSULE: {
          sdfPos.y -= clamp(sdfPos.y, -0.5 * sizes.y, 0.5 * sizes.y);
          distance = length(sdfPos) - sizes.w;
          break;
        }
        case SDF_TYPE_INFINITE_CONE: {
          float angle = 0.25 * PI * sizes.w;
          vec2 c = vec2(sin(angle), cos(angle));
          vec2 q = vec2(length(sdfPos.xy), -sdfPos.z);
          float d = length(q - c * max(dot(q, c), 0.0));
          distance = d * (((q.x * c.y - q.y * c.x) < 0.0) ? -1.0 : 1.0);
          break;
        }
      }

      if ((flags & SDF_FLAG_INVERT) != 0u) {
        distance = -distance;
      }

      if (smoothK == 0.0) {
        if (distance < distanceAccum) {
          distanceAccum = distance;
          for (int i = 0; i < numValues; ++i) {
            outValues[i] = values[i];
          }
        }
      } else {
        float scaledDistance = -distance / smoothK;
        if (scaledDistance > maxExp) {
          float scale = exp(maxExp - scaledDistance);
          distanceAccum *= scale;
          for (int i = 0; i < numValues; ++i) {
            outValues[i] *= scale;
          }
          maxExp = scaledDistance;
        }

        float weight = exp(scaledDistance - maxExp);
        distanceAccum += weight;
        for (int i = 0; i < numValues; ++i) {
          outValues[i] += weight * values[i];
        }
      }
    }

    if (smoothK == 0.0) {
      return distanceAccum;
    } else {
      // Very distant SDFs may result in 0 accumulation
      if (distanceAccum == 0.0) {
        return 1.0 / 0.0;
      }
      for (int i = 0; i < numValues; ++i) {
        outValues[i] /= distanceAccum;
      }
      return (-log(distanceAccum) - maxExp) * smoothK;
    }
  }

  float modulateSdfArray(
    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, vec3 pos,
    float smoothK, int numValues, out vec4 values[4],
    float softEdge, bool invert
  ) {
    float distance = evaluateSdfArray(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, smoothK, numValues, values);
    if (invert) {
      distance = -distance;
    }

    return (softEdge == 0.0) ? ((distance < 0.0) ? 1.0 : 0.0)
      : clamp(-distance / softEdge + 0.5, 0.0, 1.0);
  }
`),tc=an(`
  const uint EDIT_FLAG_BLEND = 0xFFu;
  const uint EDIT_BLEND_MULTIPLY = 0u;
  const uint EDIT_BLEND_SET_RGB = 1u;
  const uint EDIT_BLEND_ADD_RGBA = 2u;
  const uint EDIT_FLAG_INVERT = 0x100u;

  void decodeEdit(
    uvec4 packedEdit, out int sdfFirst, out int sdfCount,
    out bool invert, out uint rgbaBlendMode, out float softEdge, out float sdfSmooth
  ) {
    rgbaBlendMode = packedEdit.x & EDIT_FLAG_BLEND;
    invert = (packedEdit.x & EDIT_FLAG_INVERT) != 0u;

    sdfFirst = int(packedEdit.y & 0xFFFFu);
    sdfCount = int(packedEdit.y >> 16u);

    softEdge = uintBitsToFloat(packedEdit.z);
    sdfSmooth = uintBitsToFloat(packedEdit.w);
  }

  void applyRgbaDisplaceEdit(
    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, inout vec3 pos,
    float smoothK, float softEdge, bool invert, uint rgbaBlendMode, inout vec4 rgba
  ) {
    vec4 values[4];
    float modulate = modulateSdfArray(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, smoothK, 2, values, softEdge, invert);
    // On Android, moving values[0] is necessary to work around a compiler bug.
    vec4 sdfRgba = values[0];
    vec4 sdfDisplaceScale = values[1];

    vec4 target;
    switch (rgbaBlendMode) {
      case EDIT_BLEND_MULTIPLY:
        target = rgba * sdfRgba;
        break;
      case EDIT_BLEND_SET_RGB:
        target = vec4(sdfRgba.rgb, rgba.a * sdfRgba.a);
        break;
      case EDIT_BLEND_ADD_RGBA:
        target = rgba + sdfRgba;
        break;
      default:
        // Debug output if blend mode not set
        target = vec4(fract(pos), 1.0);
    }
    rgba = mix(rgba, target, modulate);
    pos += sdfDisplaceScale.xyz * modulate;
  }

  void applyPackedRgbaDisplaceEdit(uvec4 packedEdit, usampler2D sdfTexture, int numSdfs, inout vec3 pos, inout vec4 rgba) {
    int sdfFirst, sdfCount;
    bool invert;
    uint rgbaBlendMode;
    float softEdge, sdfSmooth;
    decodeEdit(packedEdit, sdfFirst, sdfCount, invert, rgbaBlendMode, softEdge, sdfSmooth);
    applyRgbaDisplaceEdit(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, sdfSmooth, softEdge, invert, rgbaBlendMode, rgba);
  }
`);function Y0(t,e,n,a){return new Tt({inTypes:{gsplat:St,sdfArray:$l,numEdits:"int",rgbaDisplaceEdits:"uvec4"},outTypes:{gsplat:St},globals:()=>[ec,tc],inputs:{gsplat:t,sdfArray:e,numEdits:n,rgbaDisplaceEdits:a},statements:({inputs:s,outputs:r})=>{const{sdfArray:o,numEdits:A,rgbaDisplaceEdits:l}=s,{gsplat:u}=r;return qn(`
        ${u} = ${s.gsplat};
        if (isGsplatActive(${u}.flags)) {
          for (int editIndex = 0; editIndex < ${A}; ++editIndex) {
            applyPackedRgbaDisplaceEdit(
              ${l}[editIndex], ${o}.sdfTexture, ${o}.numSdfs,
              ${u}.center, ${u}.rgba
            );
          }
        }
      `)}}).outputs.gsplat}const $a=new Float32Array(1);class q0{constructor(e){this.modifier=e,this.cache=new Map}apply(e){let n=this.cache.get(e);return n||(n=ta({index:"int"},{gsplat:St},({index:a})=>{const{gsplat:i}=e.apply({index:a});return this.modifier.apply({gsplat:i})}),this.cache.set(e,n)),n}}class zs{constructor(){this.scale=new Zi({value:Number.NEGATIVE_INFINITY}),this.rotate=new pr({value:new Rt(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY)}),this.translate=new $s({value:new j(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY)})}apply(e){return k0(e,{scale:this.scale,rotate:this.rotate,translate:this.translate})}applyDir(e){return D0(e,{rotate:this.rotate})}applyGsplat(e){return Ul(e,{scale:this.scale,rotate:this.rotate,translate:this.translate})}updateFromMatrix(e){const n=new j,a=new Rt,i=new j;e.decompose(i,a,n);const s=(n.x+n.y+n.z)/3;let r=!1;return s!==this.scale.value&&(this.scale.value=s,r=!0),i.equals(this.translate.value)||(this.translate.value.copy(i),r=!0),a.equals(this.rotate.value)||(this.rotate.value.copy(a),r=!0),r}update(e){return e.updateMatrixWorld(),this.updateFromMatrix(e.matrixWorld)}}class ho extends cr{constructor({numSplats:e,generator:n,construct:a,update:i}){if(super(),this.numSplats=e??0,this.generator=n,this.frameUpdate=i,this.version=0,a){const s=a(this);Object.assign(this,s)}}updateVersion(){this.version+=1}set needsUpdate(e){e&&this.updateVersion()}}const $i=class fo extends ho{constructor(e={}){const n=new zs,a=new zs,i=new zs,s=new zs,r=new pr({value:new wn(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY)}),o=new Zi({value:0}),A=new Zi({value:0}),l={transform:n,viewToWorld:a,worldToView:i,viewToObject:s,recolor:r,time:o,deltaTime:A};if(super({update:({time:u,deltaTime:c,viewToWorld:g,globalEdits:f})=>this.update({time:u,deltaTime:c,viewToWorld:g,globalEdits:f})}),this.isInitialized=!1,this.recolor=new Xe(1,1,1),this.opacity=1,this.enableViewToObject=!1,this.enableViewToWorld=!1,this.enableWorldToView=!1,this.skinning=null,this.edits=null,this.rgbaDisplaceEdits=null,this.splatRgba=null,this.maxSh=3,this.packedSplats=e.packedSplats??new Ya,this.packedSplats.splatEncoding=e.splatEncoding??{...Ir},this.numSplats=this.packedSplats.numSplats,this.editable=e.editable??!0,this.onFrame=e.onFrame,this.context=l,this.objectModifier=e.objectModifier,this.worldModifier=e.worldModifier,this.updateGenerator(),e.url||e.fileBytes||e.constructSplats||e.packedSplats&&!e.packedSplats.isInitialized)this.initialized=this.asyncInitialize(e).then(async()=>{if(this.updateGenerator(),this.isInitialized=!0,e.onLoad){const u=e.onLoad(this);u instanceof Promise&&await u}return this});else if(this.isInitialized=!0,this.initialized=Promise.resolve(this),e.onLoad){const u=e.onLoad(this);u instanceof Promise&&(this.initialized=u.then(()=>this))}this.add(K0())}async asyncInitialize(e){const{url:n,fileBytes:a,fileType:i,fileName:s,maxSplats:r,constructSplats:o,splatEncoding:A}=e;if(n||a||o){const l={url:n,fileBytes:a,fileType:i,fileName:s,maxSplats:r,construct:o,splatEncoding:A};this.packedSplats.reinitialize(l)}this.packedSplats&&(await this.packedSplats.initialized,this.numSplats=this.packedSplats.numSplats,this.updateGenerator())}static async staticInitialize(){await Ll(),fo.isStaticInitialized=!0}pushSplat(e,n,a,i,s){this.packedSplats.pushSplat(e,n,a,i,s)}forEachSplat(e){this.packedSplats.forEachSplat(e)}dispose(){this.packedSplats.dispose()}getBoundingBox(e=!0){if(!this.initialized)throw new Error("Cannot get bounding box before SplatMesh is initialized");const n=new j(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),a=new j(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY),i=new j,s=[-1,1];return this.packedSplats.forEachSplat((o,A,l,u,c,g)=>{if(e)n.min(A),a.max(A);else for(const f of s)for(const p of s)for(const m of s)i.set(f*l.x,p*l.y,m*l.z),i.applyQuaternion(u),i.add(A),n.min(i),a.max(i)}),new To(n,a)}constructGenerator(e){const{transform:n,viewToObject:a,recolor:i}=e,s=ta({index:"int"},{gsplat:St},({index:r})=>{if(!r)throw new Error("index is undefined");let o=Pi(this.packedSplats.dyno,r);if(this.maxSh>=1){const{sh1Texture:l,sh2Texture:u,sh3Texture:c}=this.ensureShTextures();if(l){let g=function(I,y){const{x:Q,y:D}=E0(y).outputs,v=Ti(Qa(Q,D),qi("float",.5)),T=Ti(SA(D,Q),qi("float",.5));return Qa(v,Ti(I,T))};const f=a.translate,{center:p}=Js(o).outputs,m=B0(SA(p,f)),B=O0(o,l,m);let d=g(B,this.packedSplats.dynoSh1MinMax);if(this.maxSh>=2&&u){const I=V0(o,u,m);d=Qa(d,g(I,this.packedSplats.dynoSh2MinMax))}if(this.maxSh>=3&&c){const I=j0(o,c,m);d=Qa(d,g(I,this.packedSplats.dynoSh3MinMax))}let{rgba:E}=Js(o).outputs;E=Qa(E,w0(d,qi("float",0))),o=qr({gsplat:o,rgba:E})}}if(this.splatRgba){const l=F0(this.splatRgba.dyno,r);o=qr({gsplat:o,rgba:l})}this.skinning&&(o=this.skinning.modify(o)),this.objectModifier&&(o=this.objectModifier.apply({gsplat:o}).gsplat),o=n.applyGsplat(o);const A=Ti(i,Js(o).outputs.rgba);return o=qr({gsplat:o,rgba:A}),this.rgbaDisplaceEdits&&(o=this.rgbaDisplaceEdits.modify(o)),this.worldModifier&&(o=this.worldModifier.apply({gsplat:o}).gsplat),{gsplat:o}});this.generator=s}updateGenerator(){this.constructGenerator(this.context)}update({time:e,viewToWorld:n,deltaTime:a,globalEdits:i}){var s;this.numSplats=this.packedSplats.numSplats,this.context.time.value=e,this.context.deltaTime.value=a,fo.dynoTime.value=e;const{transform:r,viewToObject:o,recolor:A}=this.context;let l=r.update(this);this.context.viewToWorld.updateFromMatrix(n)&&this.enableViewToWorld&&(l=!0);const u=n.clone().invert();this.context.worldToView.updateFromMatrix(u)&&this.enableWorldToView&&(l=!0);const f=new Zt().compose(r.translate.value,r.rotate.value,new j().setScalar(r.scale.value)).invert().multiply(n);o.updateFromMatrix(f)&&(this.enableViewToObject||this.packedSplats.extra.sh1)&&(l=!0);const p=new wn(this.recolor.r,this.recolor.g,this.recolor.b,this.opacity);p.equals(A.value)||(A.value.copy(p),l=!0);const m=this.editable?(this.edits??[]).concat(i):[];this.editable&&!this.edits&&this.traverseVisible(d=>{d instanceof Zl&&m.push(d)}),m.sort((d,E)=>d.ordering-E.ordering);const B=m.map(d=>{if(d.sdfs!=null)return{edit:d,sdfs:d.sdfs};const E=[];return d.traverseVisible(I=>{I instanceof G0&&E.push(I)}),{edit:d,sdfs:E}});if(B.length>0&&!this.rgbaDisplaceEdits){const d=B.length,E=B.reduce((I,y)=>I+y.sdfs.length,0);this.rgbaDisplaceEdits=new U0({maxEdits:d,maxSdfs:E}),this.updateGenerator()}if(this.rgbaDisplaceEdits){const d=this.rgbaDisplaceEdits.update(B);l||(l=d.updated),d.dynoUpdated&&this.updateGenerator()}l&&this.updateVersion(),(s=this.onFrame)==null||s.call(this,{mesh:this,time:e,deltaTime:a})}raycast(e,n){var a,i;if(!this.packedSplats.packedArray||!this.packedSplats.numSplats)return;const{near:s,far:r,ray:o}=e,A=this.matrixWorld.clone().invert(),l=new gl().setFromMatrix4(A),u=o.origin.clone().applyMatrix4(A),c=o.direction.clone().applyMatrix3(l),g=new j;A.decompose(new j,new Rt,g),(g.x*g.y*g.z)**(1/3);const p=mh(u.x,u.y,u.z,c.x,c.y,c.z,s,r,this.packedSplats.numSplats,this.packedSplats.packedArray,!0,((a=this.packedSplats.splatEncoding)==null?void 0:a.lnScaleMin)??$n,((i=this.packedSplats.splatEncoding)==null?void 0:i.lnScaleMax)??ea);for(const m of p){const B=o.direction.clone().multiplyScalar(m).add(o.origin);n.push({distance:m,point:B,object:this})}}ensureShTextures(){if(!this.packedSplats.extra.sh1)return{};let e=this.packedSplats.extra.sh1Texture;if(!e){let i=this.packedSplats.extra.sh1;const{width:s,height:r,depth:o,maxSplats:A}=fn(i.length/2);if(i.length<A*2){const u=new Uint32Array(A*2);u.set(i),this.packedSplats.extra.sh1=u,i=u}const l=new Fa(i,s,r,o);l.format=Bu,l.type=Na,l.internalFormat="RG32UI",l.needsUpdate=!0,e=new Hr({value:l,key:"sh1"}),this.packedSplats.extra.sh1Texture=e}if(!this.packedSplats.extra.sh2)return{sh1Texture:e};let n=this.packedSplats.extra.sh2Texture;if(!n){let i=this.packedSplats.extra.sh2;const{width:s,height:r,depth:o,maxSplats:A}=fn(i.length/4);if(i.length<A*4){const u=new Uint32Array(A*4);u.set(i),this.packedSplats.extra.sh2=u,i=u}const l=new Fa(i,s,r,o);l.format=Ai,l.type=Na,l.internalFormat="RGBA32UI",l.needsUpdate=!0,n=new Hr({value:l,key:"sh2"}),this.packedSplats.extra.sh2Texture=n}if(!this.packedSplats.extra.sh3)return{sh1Texture:e,sh2Texture:n};let a=this.packedSplats.extra.sh3Texture;if(!a){let i=this.packedSplats.extra.sh3;const{width:s,height:r,depth:o,maxSplats:A}=fn(i.length/4);if(i.length<A*4){const u=new Uint32Array(A*4);u.set(i),this.packedSplats.extra.sh3=u,i=u}const l=new Fa(i,s,r,o);l.format=Ai,l.type=Na,l.internalFormat="RGBA32UI",l.needsUpdate=!0,a=new Hr({value:l,key:"sh3"}),this.packedSplats.extra.sh3Texture=a}return{sh1Texture:e,sh2Texture:n,sh3Texture:a}}};$i.staticInitialized=$i.staticInitialize();$i.isStaticInitialized=!1;$i.dynoTime=new Zi({value:0});let Uo=$i;const P0=an(`
  vec3 evaluateSH1(Gsplat gsplat, usampler2DArray sh1, vec3 viewDir) {
    // Extract sint7 values packed into 2 x uint32
    uvec2 packed = texelFetch(sh1, splatTexCoord(gsplat.index), 0).rg;
    vec3 sh1_0 = vec3(ivec3(
      int(packed.x << 25u) >> 25,
      int(packed.x << 18u) >> 25,
      int(packed.x << 11u) >> 25
    )) / 63.0;
    vec3 sh1_1 = vec3(ivec3(
      int(packed.x << 4u) >> 25,
      int((packed.x >> 3u) | (packed.y << 29u)) >> 25,
      int(packed.y << 22u) >> 25
    )) / 63.0;
    vec3 sh1_2 = vec3(ivec3(
      int(packed.y << 15u) >> 25,
      int(packed.y << 8u) >> 25,
      int(packed.y << 1u) >> 25
    )) / 63.0;

    return sh1_0 * (-0.4886025 * viewDir.y)
      + sh1_1 * (0.4886025 * viewDir.z)
      + sh1_2 * (-0.4886025 * viewDir.x);
  }
`),H0=an(`
  vec3 evaluateSH2(Gsplat gsplat, usampler2DArray sh2, vec3 viewDir) {
    // Extract sint8 values packed into 4 x uint32
    uvec4 packed = texelFetch(sh2, splatTexCoord(gsplat.index), 0);
    vec3 sh2_0 = vec3(ivec3(
      int(packed.x << 24u) >> 24,
      int(packed.x << 16u) >> 24,
      int(packed.x << 8u) >> 24
    )) / 127.0;
    vec3 sh2_1 = vec3(ivec3(
      int(packed.x) >> 24,
      int(packed.y << 24u) >> 24,
      int(packed.y << 16u) >> 24
    )) / 127.0;
    vec3 sh2_2 = vec3(ivec3(
      int(packed.y << 8u) >> 24,
      int(packed.y) >> 24,
      int(packed.z << 24u) >> 24
    )) / 127.0;
    vec3 sh2_3 = vec3(ivec3(
      int(packed.z << 16u) >> 24,
      int(packed.z << 8u) >> 24,
      int(packed.z) >> 24
    )) / 127.0;
    vec3 sh2_4 = vec3(ivec3(
      int(packed.w << 24u) >> 24,
      int(packed.w << 16u) >> 24,
      int(packed.w << 8u) >> 24
    )) / 127.0;

    return sh2_0 * (1.0925484 * viewDir.x * viewDir.y)
      + sh2_1 * (-1.0925484 * viewDir.y * viewDir.z)
      + sh2_2 * (0.3153915 * (2.0 * viewDir.z * viewDir.z - viewDir.x * viewDir.x - viewDir.y * viewDir.y))
      + sh2_3 * (-1.0925484 * viewDir.x * viewDir.z)
      + sh2_4 * (0.5462742 * (viewDir.x * viewDir.x - viewDir.y * viewDir.y));
  }
`),J0=an(`
  vec3 evaluateSH3(Gsplat gsplat, usampler2DArray sh3, vec3 viewDir) {
    // Extract sint6 values packed into 4 x uint32
    uvec4 packed = texelFetch(sh3, splatTexCoord(gsplat.index), 0);
    vec3 sh3_0 = vec3(ivec3(
      int(packed.x << 26u) >> 26,
      int(packed.x << 20u) >> 26,
      int(packed.x << 14u) >> 26
    )) / 31.0;
    vec3 sh3_1 = vec3(ivec3(
      int(packed.x << 8u) >> 26,
      int(packed.x << 2u) >> 26,
      int((packed.x >> 4u) | (packed.y << 28u)) >> 26
    )) / 31.0;
    vec3 sh3_2 = vec3(ivec3(
      int(packed.y << 22u) >> 26,
      int(packed.y << 16u) >> 26,
      int(packed.y << 10u) >> 26
    )) / 31.0;
    vec3 sh3_3 = vec3(ivec3(
      int(packed.y << 4u) >> 26,
      int((packed.y >> 2u) | (packed.z << 30u)) >> 26,
      int(packed.z << 24u) >> 26
    )) / 31.0;
    vec3 sh3_4 = vec3(ivec3(
      int(packed.z << 18u) >> 26,
      int(packed.z << 12u) >> 26,
      int(packed.z << 6u) >> 26
    )) / 31.0;
    vec3 sh3_5 = vec3(ivec3(
      int(packed.z) >> 26,
      int(packed.w << 26u) >> 26,
      int(packed.w << 20u) >> 26
    )) / 31.0;
    vec3 sh3_6 = vec3(ivec3(
      int(packed.w << 14u) >> 26,
      int(packed.w << 8u) >> 26,
      int(packed.w << 2u) >> 26
    )) / 31.0;

    float xx = viewDir.x * viewDir.x;
    float yy = viewDir.y * viewDir.y;
    float zz = viewDir.z * viewDir.z;
    float xy = viewDir.x * viewDir.y;
    float yz = viewDir.y * viewDir.z;
    float zx = viewDir.z * viewDir.x;

    return sh3_0 * (-0.5900436 * viewDir.y * (3.0 * xx - yy))
      + sh3_1 * (2.8906114 * xy * viewDir.z) +
      + sh3_2 * (-0.4570458 * viewDir.y * (4.0 * zz - xx - yy))
      + sh3_3 * (0.3731763 * viewDir.z * (2.0 * zz - 3.0 * xx - 3.0 * yy))
      + sh3_4 * (-0.4570458 * viewDir.x * (4.0 * zz - xx - yy))
      + sh3_5 * (1.4453057 * viewDir.z * (xx - yy))
      + sh3_6 * (-0.5900436 * viewDir.x * (xx - 3.0 * yy));
  }
`);function O0(t,e,n){return gr({inTypes:{gsplat:St,sh1:"usampler2DArray",viewDir:"vec3"},outTypes:{rgb:"vec3"},inputs:{gsplat:t,sh1:e,viewDir:n},globals:()=>[Pn,P0],statements:({inputs:a,outputs:i})=>qn(`
        if (isGsplatActive(${a.gsplat}.flags)) {
          ${i.rgb} = evaluateSH1(${a.gsplat}, ${a.sh1}, ${a.viewDir});
        } else {
          ${i.rgb} = vec3(0.0);
        }
      `)}).outputs.rgb}function V0(t,e,n){return gr({inTypes:{gsplat:St,sh2:"usampler2DArray",viewDir:"vec3"},outTypes:{rgb:"vec3"},inputs:{gsplat:t,sh2:e,viewDir:n},globals:()=>[Pn,H0],statements:({inputs:a,outputs:i})=>qn(`
        if (isGsplatActive(${a.gsplat}.flags)) {
          ${i.rgb} = evaluateSH2(${a.gsplat}, ${a.sh2}, ${a.viewDir});
        } else {
          ${i.rgb} = vec3(0.0);
        }
      `)}).outputs.rgb}function j0(t,e,n){return gr({inTypes:{gsplat:St,sh3:"usampler2DArray",viewDir:"vec3"},outTypes:{rgb:"vec3"},inputs:{gsplat:t,sh3:e,viewDir:n},globals:()=>[Pn,J0],statements:({inputs:a,outputs:i})=>qn(`
        if (isGsplatActive(${a.gsplat}.flags)) {
          ${i.rgb} = evaluateSH3(${a.gsplat}, ${a.sh3}, ${a.viewDir});
        } else {
          ${i.rgb} = vec3(0.0);
        }
      `)}).outputs.rgb}const W0=new Ei,X0=new mt;function K0(){const t=new ae(W0,X0);return t.frustumCulled=!1,t.onBeforeRender=function(e,n){if(!n.isScene){this.removeFromParent();return}let a=!1;n.traverse(i=>{i instanceof FA&&(a=!0)}),a||n.add(new FA({renderer:e})),this.removeFromParent()},t}const kA=["char","uchar","short","ushort","int","uint","float","double"],nc=class Os{constructor({fileBytes:e}){this.header="",this.littleEndian=!0,this.elements={},this.comments=[],this.data=null,this.numSplats=0,this.fileBytes=e instanceof ArrayBuffer?new Uint8Array(e):e}async parseHeader(){const n=new ReadableStream({start:r=>{r.enqueue(this.fileBytes.slice(0,65536)),r.close()}}).pipeThrough(new TextDecoderStream).getReader();this.header="";const a=`end_header
`;for(;;){const{value:r,done:o}=await n.read();if(o)throw new Error("Failed to read header");this.header+=r;const A=this.header.indexOf(a);if(A>=0){this.header=this.header.slice(0,A+a.length);break}}const i=new TextEncoder().encode(this.header).length;this.data=new DataView(this.fileBytes.buffer,i),this.elements={};let s=null;this.comments=[],this.header.trim().split(`
`).forEach((r,o)=>{const A=r.trim();if(o===0){if(A!=="ply")throw new Error("Invalid PLY header");return}if(A.length===0)return;const l=A.split(" ");switch(l[0]){case"format":if(l[1]==="binary_little_endian")this.littleEndian=!0;else if(l[1]==="binary_big_endian")this.littleEndian=!1;else throw new Error(`Unsupported PLY format: ${l[1]}`);if(l[2]!=="1.0")throw new Error(`Unsupported PLY version: ${l[2]}`);break;case"end_header":break;case"comment":this.comments.push(A.slice(8));break;case"element":{const u=l[1];s={name:u,count:Number.parseInt(l[2]),properties:{}},this.elements[u]=s;break}case"property":if(s==null)throw new Error("Property must be inside an element");l[1]==="list"?s.properties[l[4]]={isList:!0,type:l[3],countType:l[2]}:s.properties[l[2]]={isList:!1,type:l[1]};break}}),this.elements.vertex&&(this.numSplats=this.elements.vertex.count)}parseData(e){let n=0;const a=this.data;if(a==null)throw new Error("No data to parse");for(const i in this.elements){const s=this.elements[i],{count:r,properties:o}=s,A=tf(o),l=nf(o,this.littleEndian),u=e(s)??(()=>{});for(let c=0;c<r;c++)n=l(a,n,A),u(c,A)}}parseSplats(e,n){if(this.elements.vertex==null)throw new Error("No vertex element found");let a=!1;const i=[];let s=0,r=[],o=[],A=[],l,u,c;function g(){const d=ef[s];r=new Array(3).fill(null).flatMap((E,I)=>[0,1,2].map((y,Q)=>I+Q*d/3)),o=new Array(5).fill(null).flatMap((E,I)=>[0,1,2].map((y,Q)=>3+I+Q*d/3)),A=new Array(7).fill(null).flatMap((E,I)=>[0,1,2].map((y,Q)=>8+I+Q*d/3)),l=s>=1?new Float32Array(3*3):void 0,u=s>=2?new Float32Array(5*3):void 0,c=s>=3?new Float32Array(7*3):void 0}function f(d,E){if(!l)throw new Error("Missing sh1");const I=E.f_rest;for(let y=0;y<r.length;y++)l[y]=I[r[y]]*8/255-4;if(u)for(let y=0;y<o.length;y++)u[y]=I[o[y]]*8/255-4;if(c)for(let y=0;y<A.length;y++)c[y]=I[A[y]]*8/255-4;n==null||n(d,l,u,c)}function p(d){const{min_x:E,min_y:I,min_z:y,max_x:Q,max_y:D,max_z:v,min_scale_x:T,min_scale_y:F,min_scale_z:Z,max_scale_x:x,max_scale_y:z,max_scale_z:se}=d.properties;if(!E||!I||!y||!Q||!D||!v||!T||!F||!Z||!x||!z||!se)throw new Error("Missing PLY chunk properties");return a=!0,(J,oe)=>{const{min_x:G,min_y:me,min_z:Ee,max_x:w,max_y:X,max_z:L,min_scale_x:O,min_scale_y:q,min_scale_z:K,max_scale_x:re,max_scale_y:he,max_scale_z:ie,min_r:pe,min_g:ye,min_b:b,max_r:M,max_g:_,max_b:ge}=oe;i.push({min_x:G,min_y:me,min_z:Ee,max_x:w,max_y:X,max_z:L,min_scale_x:O,min_scale_y:q,min_scale_z:K,max_scale_x:re,max_scale_y:he,max_scale_z:ie,min_r:pe,min_g:ye,min_b:b,max_r:M,max_g:_,max_b:ge})}}function m(d){if(n&&d.name==="sh")return s=po(d.properties),g(),f;if(d.name!=="vertex")return null;const{packed_position:E,packed_rotation:I,packed_scale:y,packed_color:Q}=d.properties;if(!E||!I||!y||!Q)throw new Error("Missing PLY properties: packed_position, packed_rotation, packed_scale, packed_color");const D=Math.sqrt(2);return(v,T)=>{const F=i[v>>>8];if(F==null)throw new Error("Missing PLY chunk");const{min_x:Z,min_y:x,min_z:z,max_x:se,max_y:J,max_z:oe,min_scale_x:G,min_scale_y:me,min_scale_z:Ee,max_scale_x:w,max_scale_y:X,max_scale_z:L,min_r:O,min_g:q,min_b:K,max_r:re,max_g:he,max_b:ie}=F,{packed_position:pe,packed_rotation:ye,packed_scale:b,packed_color:M}=T,_=(pe>>>21&2047)/2047*(se-Z)+Z,ge=(pe>>>11&1023)/1023*(J-x)+x,te=(pe&2047)/2047*(oe-z)+z,fe=((ye>>>20&1023)/1023-.5)*D,Be=((ye>>>10&1023)/1023-.5)*D,be=((ye&1023)/1023-.5)*D,qe=Math.sqrt(Math.max(0,1-fe*fe-Be*Be-be*be)),Me=ye>>>30,we=Me===0?fe:Me===1?qe:Be,it=Me<=1?Be:Me===2?qe:be,k=Me<=2?be:qe,N=Me===0?qe:fe,W=Math.exp((b>>>21&2047)/2047*(w-G)+G),ce=Math.exp((b>>>11&1023)/1023*(X-me)+me),Y=Math.exp((b&2047)/2047*(L-Ee)+Ee),Qe=(M>>>24&255)/255*((re??1)-(O??0))+(O??0),C=(M>>>16&255)/255*((he??1)-(q??0))+(q??0),U=(M>>>8&255)/255*((ie??1)-(K??0))+(K??0),V=(M&255)/255;e(v,_,ge,te,W,ce,Y,we,it,k,N,V,Qe,C,U)}}const B=d=>{if(d.name==="chunk")return p(d);if(a)return m(d);if(d.name!=="vertex")return null;const{x:E,y:I,z:y,scale_0:Q,scale_1:D,scale_2:v,rot_0:T,rot_1:F,rot_2:Z,rot_3:x,opacity:z,f_dc_0:se,f_dc_1:J,f_dc_2:oe,red:G,green:me,blue:Ee,alpha:w}=d.properties;if(!E||!I||!y)throw new Error("Missing PLY properties: x, y, z");const X=Q&&D&&v,L=T&&F&&Z&&x,O=w!=null?Fs[w.type]:1,q=G!=null?Fs[G.type]:1,K=me!=null?Fs[me.type]:1,re=Ee!=null?Fs[Ee.type]:1;return s=po(d.properties),g(),(he,ie)=>{const pe=X?Math.exp(ie.scale_0):Os.defaultPointScale,ye=X?Math.exp(ie.scale_1):Os.defaultPointScale,b=X?Math.exp(ie.scale_2):Os.defaultPointScale,M=L?ie.rot_1:0,_=L?ie.rot_2:0,ge=L?ie.rot_3:0,te=L?ie.rot_0:1,fe=z!=null?1/(1+Math.exp(-ie.opacity)):w!=null?ie.alpha/O:1,Be=se!=null?ie.f_dc_0*Rs+.5:G!=null?ie.red/q:1,be=J!=null?ie.f_dc_1*Rs+.5:me!=null?ie.green/K:1,qe=oe!=null?ie.f_dc_2*Rs+.5:Ee!=null?ie.blue/re:1;if(e(he,ie.x,ie.y,ie.z,pe,ye,b,M,_,ge,te,fe,Be,be,qe),n&&l){const Me=ie.f_rest;if(l)for(let we=0;we<r.length;we++)l[we]=Me[r[we]];if(u)for(let we=0;we<o.length;we++)u[we]=Me[o[we]];if(c)for(let we=0;we<A.length;we++)c[we]=Me[A[we]];n(he,l,u,c)}}};this.parseData(B)}injectRgba(e){let n=0;const a=this.data;if(a==null)throw new Error("No parsed data");if(e.length!==this.numSplats*4)throw new Error("Invalid RGBA array length");for(const i in this.elements){const s=this.elements[i],{count:r,properties:o}=s,A=[];let l=0;const u=i==="vertex";if(u){for(const c of["opacity","f_dc_0","f_dc_1","f_dc_2"])if(!o[c]||o[c].type!=="float")throw new Error(`Can't injectRgba due to property: ${c}`)}for(const[c,g]of Object.entries(o))if(g.isList)A.push(()=>{const f=ai[g.countType](a,n,this.littleEndian);n+=yn[g.countType],n+=f*yn[g.type]});else{if(u)if(c==="f_dc_0"||c==="f_dc_1"||c==="f_dc_2"){const f=Number.parseInt(c.slice(5));A.push(()=>{const p=(e[l+f]/255-.5)/Rs;DA[g.type](a,n,this.littleEndian,p)})}else c==="opacity"&&A.push(()=>{const f=Math.max(-100,Math.min(100,-Math.log(1/(e[l+3]/255)-1)));DA[g.type](a,n,this.littleEndian,f)});A.push(()=>{n+=yn[g.type]})}for(let c=0;c<r;c++){for(const g of A)g();u&&(l+=4)}}}};nc.defaultPointScale=.001;let Z0=nc;const Rs=.28209479177387814,ai={char:(t,e,n)=>t.getInt8(e),uchar:(t,e,n)=>t.getUint8(e),short:(t,e,n)=>t.getInt16(e,n),ushort:(t,e,n)=>t.getUint16(e,n),int:(t,e,n)=>t.getInt32(e,n),uint:(t,e,n)=>t.getUint32(e,n),float:(t,e,n)=>t.getFloat32(e,n),double:(t,e,n)=>t.getFloat64(e,n)},DA={char:(t,e,n,a)=>{t.setInt8(e,a)},uchar:(t,e,n,a)=>{t.setUint8(e,a)},short:(t,e,n,a)=>{t.setInt16(e,a,n)},ushort:(t,e,n,a)=>{t.setUint16(e,a,n)},int:(t,e,n,a)=>{t.setInt32(e,a,n)},uint:(t,e,n,a)=>{t.setUint32(e,a,n)},float:(t,e,n,a)=>{t.setFloat32(e,a,n)},double:(t,e,n,a)=>{t.setFloat64(e,a,n)}},yn={char:1,uchar:1,short:2,ushort:2,int:4,uint:4,float:4,double:8},Fs={char:127,uchar:255,short:32767,ushort:65535,int:2147483647,uint:4294967295,float:1,double:1},$0={0:0,9:1,24:2,45:3},ef={0:0,1:9,2:24,3:45},Yo=/^f_rest_([0-9]{1,2})$/;function tf(t){const e={};for(const[n,a]of Object.entries(t))Yo.test(n)?e.f_rest=new Array(po(t)):e[n]=a.isList?[]:0;return e}function nf(t,e){return rf(t)?of(t,e):Af(t,e)}const af=(()=>{try{new Function("return 42;")}catch{return!1}return!0})(),sf=/^[a-zA-Z0-9_]+$/;function rf(t){if(!af)return!1;for(const[e,n]of Object.entries(t))if(!sf.test(e)||n.isList&&!kA.includes(n.countType)||!kA.includes(n.type))return!1;return!0}function of(t,e){const n=["let list;"];for(const[i,s]of Object.entries(t)){const r=i.match(Yo);if(r){const o=+r[1];n.push(`
        item.f_rest[${o}] = PARSE_FIELD['${s.type}'](data, offset, ${e});
        offset += ${yn[s.type]};
      `)}else s.isList?n.push(`
        list = item['${i}'];
        list.length = PARSE_FIELD['${s.countType}'](data, offset, ${e});
        offset += ${yn[s.countType]};
        for (let i = 0; i < list.length; i++) {
          list[i] = PARSE_FIELD['${s.type}'](data, offset, ${e});
          offset += ${yn[s.type]};
        }
      `):n.push(`
        item['${i}'] = PARSE_FIELD['${s.type}'](data, offset, ${e});
        offset += ${yn[s.type]};
      `)}n.push("return offset;");const a=new Function("data","offset","item","PARSE_FIELD",n.join(`
`));return(i,s,r)=>a(i,s,r,ai)}function Af(t,e){const n=[];for(const[a,i]of Object.entries(t)){const s=a.match(Yo);if(s){const r=+s[1];n.push((o,A,l)=>(l.f_rest[r]=ai[i.type](o,A,e),A+yn[i.type]))}else i.isList?n.push((r,o,A)=>{const l=A[a];l.length=ai[i.countType](r,o,e);let u=o+yn[i.countType];for(let c=0;c<l.length;c++)l[c]=ai[i.type](r,u,e),u+=yn[i.type];return u}):n.push((r,o,A)=>(A[a]=ai[i.type](r,o,e),o+yn[i.type]))}return(a,i,s)=>{let r=i;for(let o=0;o<n.length;o++)r=n[o](a,r,s);return r}}function po(t){let e=0;for(;t[`f_rest_${e}`];)e+=1;const n=$0[e];if(n==null)throw new Error(`Unsupported number of SH coefficients: ${e}`);return n}const ac=`(function() {
  "use strict";
  let wasm;
  const cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
    throw Error("TextDecoder not available");
  } };
  if (typeof TextDecoder !== "undefined") {
    cachedTextDecoder.decode();
  }
  let cachedUint8ArrayMemory0 = null;
  function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
      cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
  }
  function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
  }
  function sort_splats(num_splats, readback, ordering) {
    const ret = wasm.sort_splats(num_splats, readback, ordering);
    return ret >>> 0;
  }
  function sort32_splats(num_splats, readback, ordering) {
    const ret = wasm.sort32_splats(num_splats, readback, ordering);
    return ret >>> 0;
  }
  async function __wbg_load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return await WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          if (module.headers.get("Content-Type") != "application/wasm") {
            console.warn("\`WebAssembly.instantiateStreaming\` failed because your server does not serve Wasm with \`application/wasm\` MIME type. Falling back to \`WebAssembly.instantiate\` which is slower. Original error:\\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = await module.arrayBuffer();
      return await WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = await WebAssembly.instantiate(module, imports);
      if (instance instanceof WebAssembly.Instance) {
        return { instance, module };
      } else {
        return instance;
      }
    }
  }
  function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
      const ret = arg0.buffer;
      return ret;
    };
    imports.wbg.__wbg_length_3b4f022188ae8db6 = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_length_6ca527665d89694d = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_length_8cfd2c6409af88ad = function(arg0) {
      const ret = arg0.length;
      return ret;
    };
    imports.wbg.__wbg_new_9fee97a409b32b68 = function(arg0) {
      const ret = new Uint16Array(arg0);
      return ret;
    };
    imports.wbg.__wbg_new_e3b321dcfef89fc7 = function(arg0) {
      const ret = new Uint32Array(arg0);
      return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354 = function(arg0, arg1, arg2) {
      const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212 = function(arg0, arg1, arg2) {
      const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_newwithlength_5a5efe313cfd59f1 = function(arg0) {
      const ret = new Float32Array(arg0 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_set_10bad9bee0e9c58b = function(arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_set_d23661d19148b229 = function(arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_set_f4f1f0daa30696fc = function(arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_subarray_3aaeec89bb2544f0 = function(arg0, arg1, arg2) {
      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbg_subarray_769e1e0f81bb259b = function(arg0, arg1, arg2) {
      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
      return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
      const table = wasm.__wbindgen_export_0;
      const offset = table.grow(4);
      table.set(0, void 0);
      table.set(offset + 0, void 0);
      table.set(offset + 1, null);
      table.set(offset + 2, true);
      table.set(offset + 3, false);
    };
    imports.wbg.__wbindgen_memory = function() {
      const ret = wasm.memory;
      return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
    return imports;
  }
  function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
  }
  async function __wbg_init(module_or_path) {
    if (wasm !== void 0) return wasm;
    if (typeof module_or_path !== "undefined") {
      if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
        ({ module_or_path } = module_or_path);
      } else {
        console.warn("using deprecated parameters for the initialization function; pass a single object instead");
      }
    }
    if (typeof module_or_path === "undefined") {
      module_or_path = new URL("data:application/wasm;base64,AGFzbQEAAAABzAEeYAJ/fwF/YAJ/fwBgA39/fwF/YAF/AX9gA39/fwBgAX8AYAV/f39/fwBgA29/fwFvYAV/f39/fwF/YAFvAW9gA29vfwBgAW8Bf2AAAX9gBH9/f38AYAAAYAR/f39/AX9gA39vbwF/YAF/AW9gAAFvYAF9AX1gBn9/f39/fwBgDX19fX19fX19f29/fX0Bb2AGf39/f39/AX9gBX9/fH9/AGAEf3x/fwBgBX9/fX9/AGAEf31/fwBgBX9/fn9/AGAEf35/fwBgAn19AX0C8gQRA3diZx1fX3diZ19idWZmZXJfNjA5Y2MzZWVlNTFlZDE1OAAJA3diZxpfX3diZ19uZXdfOWZlZTk3YTQwOWIzMmI2OAAJA3diZxpfX3diZ19zZXRfZjRmMWYwZGFhMzA2OTZmYwAKA3diZx1fX3diZ19sZW5ndGhfOGNmZDJjNjQwOWFmODhhZAALA3diZzFfX3diZ19uZXd3aXRoYnl0ZW9mZnNldGFuZGxlbmd0aF9mMWRlYWQ0NGQxZmM3MjEyAAcDd2JnGl9fd2JnX25ld19lM2IzMjFkY2ZlZjg5ZmM3AAkDd2JnGl9fd2JnX3NldF9kMjM2NjFkMTkxNDhiMjI5AAoDd2JnHV9fd2JnX2xlbmd0aF82Y2E1Mjc2NjVkODk2OTRkAAsDd2JnMV9fd2JnX25ld3dpdGhieXRlb2Zmc2V0YW5kbGVuZ3RoX2U2YjdlNjlhY2Q0YzczNTQABwN3YmcaX193Ymdfc2V0XzEwYmFkOWJlZTBlOWM1OGIACgN3YmcdX193YmdfbGVuZ3RoXzNiNGYwMjIxODhhZThkYjYACwN3YmcfX193Ymdfc3ViYXJyYXlfNzY5ZTFlMGY4MWJiMjU5YgAHA3diZx9fX3diZ19zdWJhcnJheV8zYWFlZWM4OWJiMjU0NGYwAAcDd2JnJF9fd2JnX25ld3dpdGhsZW5ndGhfNWE1ZWZlMzEzY2ZkNTlmMQARA3diZxBfX3diaW5kZ2VuX3Rocm93AAEDd2JnEV9fd2JpbmRnZW5fbWVtb3J5ABIDd2JnH19fd2JpbmRnZW5faW5pdF9leHRlcm5yZWZfdGFibGUADgNhYAMAAQIIBQQCEwEMAAEBAgAAAQwBBAYFBQQAAQYFFAENBAAGBQQEAQQOAgECAQAIBAAVARYG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ACIDKAIEQXhxRgRAIAMhAgwBCyABQRkgAkEBdmtBACACQR9HG3QhBQNAIAMgBUEddkEEcWpBEGoiBCgCACICRQ0CIAVBAXQhBSACIQMgAigCBEF4cSABRw0ACwsgAigCCCIBIAA2AgwgAiAANgIIIABBADYCGCAAIAI2AgwgACABNgIIDwsgBCAANgIAIAAgAzYCGCAAIAA2AgwgACAANgIIC/MCAQR/IwBBMGsiACQAAkACQEGQksAAKAIARQRAQaiSwAAoAgAhAUGoksAAQQA2AgAgAUUNASAAQRhqIAERBQAgAEEQaiICIABBJGopAgA3AwAgACAAKQIcNwMIIAAoAhghAUGQksAAKAIAIgMNAgJAIANFDQBBlJLAACgCACICRQ0AQZiSwAAoAgAgAkECdBBlC0GUksAAIAE2AgBBkJLAAEEBNgIAQZiSwAAgACkDCDcCAEGgksAAIABBEGopAwA3AgALIABBMGokAEGUksAADwsgAEEANgIoIABBATYCHCAAQaCHwAA2AhggAEIENwIgIABBGGpBiIjAABBDAAsgAEEoaiACKQMANwIAIAAgACkDCDcCICAAIAE2AhwgAEEBNgIYAkAgAEEYaiIBKAIARQ0AIAEoAgQiAkUNACABKAIIIAJBAnQQZQsgAEEANgIoIABBATYCHCAAQaiIwAA2AhggAEIENwIgIAFBsIjAABBDAAuoAgIDfwF+IwBBQGoiAiQAIAEoAgBBgICAgHhGBEAgASgCDCEDIAJBJGoiBEEANgIAIAJCgICAgBA3AhwgAkEwaiADKAIAIgNBCGopAgA3AwAgAkE4aiADQRBqKQIANwMAIAIgAykCADcDKCACQRxqQcCIwAAgAkEoahAYGiACQRhqIAQoAgAiAzYCACACIAIpAhwiBTcDECABQQhqIAM2AgAgASAFNwIACyABKQIAIQUgAUKAgICAEDcCACACQQhqIgMgAUEIaiIBKAIANgIAIAFBADYCAEGxk8AALQAAGiACIAU3AwBBDEEEEF0iAUUEQEEEQQwQbQALIAEgAikDADcCACABQQhqIAMoAgA2AgAgAEHgisAANgIEIAAgATYCACACQUBrJAAL0gECBH8BfiMAQSBrIgMkACABIAEgAmoiAksEQEEAQQAQUgALQQggACgCACIEQQF0IgEgAiABIAJLGyICIAJBCEkb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QQRqrUKAgICA4ACENwMoIAEgAa1CgICAgOAAhDcDICABIAFBIGo2AhAgAUEIakHIj8AAEEMAC2kCAX8BfiMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQfyNwAA2AgggA0ICNwIUIANCgICAgOAAIgQgA62ENwMoIAMgBCADQQRqrYQ3AyAgAyADQSBqNgIQIANBCGogAhBDAAtpAgF/AX4jAEEwayIDJAAgAyAANgIAIAMgATYCBCADQQI2AgwgA0H4kcAANgIIIANCAjcCFCADQoCAgIDgACIEIANBBGqthDcDKCADIAQgA62ENwMgIAMgA0EgajYCECADQQhqIAIQQwALZgAjAEEwayIAJABBsJPAAC0AAARAIABBAjYCDCAAQbCKwAA2AgggAEIBNwIUIAAgATYCLCAAIABBLGqtQoCAgIDgAIQ3AyAgACAAQSBqNgIQIABBCGpB0IrAABBDAAsgAEEwaiQAC5QBAgN/AW8jAEEgayIDJAAgAyAAKAIAEHAiBDYCACADIAI2AgQgAiAERwRAIANBADYCCCADIANBBGogA0EIahBAAAsQWyIEEFMiBSUBEAUhBhAbIgIgBiYBIAVBhAFPBEAgBRAtCyACIAAoAgAgAUECdhBkIAJBhAFPBEAgAhAtCyAEQYQBTwRAIAQQLQsgA0EgaiQAC08BAX8jAEEwayIAJAAgAEEBNgIMIABBwI3AADYCCCAAQgE3AhQgACAAQS9qrUKAgICAoAWENwMgIAAgAEEgajYCECAAQQhqQcSBwAAQQwALQQEBfyACIAAoAgAgACgCCCIDa0sEQCAAIAMgAhAlIAAoAgghAwsgACgCBCADaiABIAIQHxogACACIANqNgIIQQALTQECf0Gxk8AALQAAGiABKAIEIQIgASgCACEDQQhBBBBdIgFFBEBBBEEIEG0ACyABIAI2AgQgASADNgIAIABB8IrAADYCBCAAIAE2AgALQQEBfyACIAAoAgAgACgCCCIDa0sEQCAAIAMgAhApIAAoAgghAwsgACgCBCADaiABIAIQHxogACACIANqNgIIQQALQQEBfyMAQSBrIgIkACACQQA2AhAgAkEBNgIEIAJCBDcCCCACQS42AhwgAiAANgIYIAIgAkEYajYCACACIAEQQwALswIBA38gACgCACECIAEoAhwiAEEQcUUE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ZCByZWN1cnNpdmVseSBvciBhZnRlciBiZWluZyBkcm9wcGVkTGF6eSBpbnN0YW5jZSBoYXMgcHJldmlvdXNseSBiZWVuIHBvaXNvbmVkdgMQACoAAAAvVXNlcnMvZG1hcmNvcy8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL29uY2VfY2VsbC0xLjIxLjMvc3JjL2xpYi5ycwCoAxAAXwAAAAgDAAAZAAAAcmVlbnRyYW50IGluaXQAABgEEAAOAAAAqAMQAF8AAAB6AgAADQAAABYAAAAMAAAABAAAABcAAAAYAAAAGQAAAC9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZABYBBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAWAQQACkAAACuBAAADQAAAEFjY2Vzc0Vycm9ybWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAAAAAsFEAAVAAAAIAUQAA0AAABzdGQvc3JjL2FsbG9jLnJzQAUQABAAAABjAQAACQAAABYAAAAMAAAABAAAABoAAAAAAAAACAAAAAQAAAAbAAAAAAAAAAgAAAAEAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAQAAAABAAAACEAAAAiAAAAIwAAACQAAABFcnJvcgAAACUAAAAMAAAABAAAACYAAAAnAAAAKAAAAGNhcGFjaXR5IG92ZXJmbG93AAAA2AUQABEAAABhbGxvYy9zcmMvcmF3X3ZlYy5yc/QFEAAUAAAAGAAAAAUAQaCMwAAL8AUBAAAAKQAAAGEgZm9ybWF0dGluZyB0cmFpdCBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB3aGVuIHRoZSB1bmRlcmx5aW5nIHN0cmVhbSBkaWQgbm90YWxsb2Mvc3JjL2ZtdC5ycwAAfgYQABAAAAB+AgAADgAAAEJvcnJvd011dEVycm9yYWxyZWFkeSBib3Jyb3dlZDogrgYQABIAAABpbmRleCBvdXQgb2YgYm91bmRzOiB0aGUgbGVuIGlzICBidXQgdGhlIGluZGV4IGlzIAAAyAYQACAAAADoBhAAEgAAAD09IT1tYXRjaGVzYXNzZXJ0aW9uIGBsZWZ0ICByaWdodGAgZmFpbGVkCiAgbGVmdDogCiByaWdodDogABcHEAAQAAAAJwcQABcAAAA+BxAACQAAACByaWdodGAgZmFpbGVkOiAKICBsZWZ0OiAAAAAXBxAAEAAAAGAHEAAQAAAAcAcQAAkAAAA+BxAACQAAADogAAABAAAAAAAAAJwHEAACAAAAfSB9Y29yZS9zcmMvZm10L251bS5ycwAAswcQABMAAABmAAAAFwAAADB4MDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTlyYW5nZSBzdGFydCBpbmRleCAgb3V0IG9mIHJhbmdlIGZvciBzbGljZSBvZiBsZW5ndGggAACiCBAAEgAAALQIEAAiAAAAcmFuZ2UgZW5kIGluZGV4IOgIEAAQAAAAtAgQACIAAAAAAAA/AAAAvwBBqJLAAAsBFABwCXByb2R1Y2VycwIIbGFuZ3VhZ2UBBFJ1c3QADHByb2Nlc3NlZC1ieQMFcnVzdGMdMS44My4wICg5MGIzNWE2MjMgMjAyNC0xMS0yNikGd2FscnVzBjAuMjMuMwx3YXNtLWJpbmRnZW4HMC4yLjEwMABJD3RhcmdldF9mZWF0dXJlcwQrD211dGFibGUtZ2xvYmFscysIc2lnbi1leHQrD3JlZmVyZW5jZS10eXBlcysKbXVsdGl2YWx1ZQ==", self.location.href);
    }
    const imports = __wbg_get_imports();
    if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
      module_or_path = fetch(module_or_path);
    }
    const { instance, module } = await __wbg_load(await module_or_path, imports);
    return __wbg_finalize_init(instance, module);
  }
  var ch2 = {};
  var wk = function(c, id, msg, transfer, cb) {
    var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
      c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
    ], { type: "text/javascript" }))));
    w.onmessage = function(e) {
      var d = e.data, ed = d.$e$;
      if (ed) {
        var err2 = new Error(ed[0]);
        err2["code"] = ed[1];
        err2.stack = ed[2];
        cb(err2, null);
      } else
        cb(null, d);
    };
    w.postMessage(msg, transfer);
    return w;
  };
  var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b[i2] = start += 1 << eb[i2 - 1];
    }
    var r = new i32(b[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j = b[i2]; j < b[i2 + 1]; ++j) {
        r[j] = j - b[i2] << 5 | i2;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0), fd = _b.b;
  var rev = new u16(32768);
  for (var i = 0; i < 32768; ++i) {
    var x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var hMap = function(cd, mb, r) {
    var s = cd.length;
    var i2 = 0;
    var l = new u16(mb);
    for (; i2 < s; ++i2) {
      if (cd[i2])
        ++l[cd[i2] - 1];
    }
    var le = new u16(mb);
    for (i2 = 1; i2 < mb; ++i2) {
      le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          var sv = i2 << 4 | cd[i2];
          var r_1 = mb - cd[i2];
          var v = le[cd[i2] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
        }
      }
    }
    return co;
  };
  var flt = new u8(288);
  for (var i = 0; i < 144; ++i)
    flt[i] = 8;
  for (var i = 144; i < 256; ++i)
    flt[i] = 9;
  for (var i = 256; i < 280; ++i)
    flt[i] = 7;
  for (var i = 280; i < 288; ++i)
    flt[i] = 8;
  var fdt = new u8(32);
  for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a) {
    var m = a[0];
    for (var i2 = 1; i2 < a.length; ++i2) {
      if (a[i2] > m)
        m = a[i2];
    }
    return m;
  };
  var bits = function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
  };
  var bits16 = function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
  };
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    return new u8(v.subarray(s, e));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var inflt = function(dat, st, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf;
    var resize = noBuf || st.i != 2;
    var noSt = st.i;
    if (noBuf)
      buf = new u8(sl * 3);
    var cbuf = function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + l);
          buf.set(dat.subarray(s, t), bt);
          st.b = bt += l, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i2 = 0; i2 < hcLen; ++i2) {
            clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i2 = 0; i2 < tl; ) {
            var r = clm[bits(dat, pos, clbmsk)];
            pos += r & 15;
            var s = r >> 4;
            if (s < 16) {
              ldt[i2++] = s;
            } else {
              var c = 0, n = 0;
              if (s == 16)
                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
              else if (s == 17)
                n = 3 + bits(dat, pos, 7), pos += 3;
              else if (s == 18)
                n = 11 + bits(dat, pos, 127), pos += 7;
              while (n--)
                ldt[i2++] = c;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (resize)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
        pos += c & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i2 = sym - 257, b = fleb[i2];
            add = bits(dat, pos, (1 << b) - 1) + fl[i2];
            pos += b;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + 131072);
          var end = bt + add;
          if (bt < dt) {
            var shift = dl - dt, dend = Math.min(dt, end);
            if (shift + bt < 0)
              err(3);
            for (; bt < dend; ++bt)
              buf[bt] = dict[shift + bt];
          }
          for (; bt < end; ++bt)
            buf[bt] = buf[bt - dt];
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
  };
  var et = /* @__PURE__ */ new u8(0);
  var mrg = function(a, b) {
    var o = {};
    for (var k in a)
      o[k] = a[k];
    for (var k in b)
      o[k] = b[k];
    return o;
  };
  var wcln = function(fn, fnStr, td2) {
    var dt = fn();
    var st = fn.toString();
    var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\\s+/g, "").split(",");
    for (var i2 = 0; i2 < dt.length; ++i2) {
      var v = dt[i2], k = ks[i2];
      if (typeof v == "function") {
        fnStr += ";" + k + "=";
        var st_1 = v.toString();
        if (v.prototype) {
          if (st_1.indexOf("[native code]") != -1) {
            var spInd = st_1.indexOf(" ", 8) + 1;
            fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
          } else {
            fnStr += st_1;
            for (var t in v.prototype)
              fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
          }
        } else
          fnStr += st_1;
      } else
        td2[k] = v;
    }
    return fnStr;
  };
  var ch = [];
  var cbfs = function(v) {
    var tl = [];
    for (var k in v) {
      if (v[k].buffer) {
        tl.push((v[k] = new v[k].constructor(v[k])).buffer);
      }
    }
    return tl;
  };
  var wrkr = function(fns, init, id, cb) {
    if (!ch[id]) {
      var fnStr = "", td_1 = {}, m = fns.length - 1;
      for (var i2 = 0; i2 < m; ++i2)
        fnStr = wcln(fns[i2], fnStr, td_1);
      ch[id] = { c: wcln(fns[m], fnStr, td_1), e: td_1 };
    }
    var td2 = mrg({}, ch[id].e);
    return wk(ch[id].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
  };
  var bInflt = function() {
    return [u8, u16, i32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gopt];
  };
  var pbf = function(msg) {
    return postMessage(msg, [msg.buffer]);
  };
  var gopt = function(o) {
    return o && {
      out: o.size && new u8(o.size),
      dictionary: o.dictionary
    };
  };
  var cbify = function(dat, opts, fns, init, id, cb) {
    var w = wrkr(fns, init, id, function(err2, dat2) {
      w.terminate();
      cb(err2, dat2);
    });
    w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
    return function() {
      w.terminate();
    };
  };
  var b2 = function(d, b) {
    return d[b] | d[b + 1] << 8;
  };
  var b4 = function(d, b) {
    return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
  };
  var b8 = function(d, b) {
    return b4(d, b) + b4(d, b + 4) * 4294967296;
  };
  var gzs = function(d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
      err(6, "invalid gzip data");
    var flg = d[3];
    var st = 10;
    if (flg & 4)
      st += (d[10] | d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
      ;
    return st + (flg & 2);
  };
  var Inflate = /* @__PURE__ */ function() {
    function Inflate2(opts, cb) {
      if (typeof opts == "function")
        cb = opts, opts = {};
      this.ondata = cb;
      var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);
      this.s = { i: 0, b: dict ? dict.length : 0 };
      this.o = new u8(32768);
      this.p = new u8(0);
      if (dict)
        this.o.set(dict);
    }
    Inflate2.prototype.e = function(c) {
      if (!this.ondata)
        err(5);
      if (this.d)
        err(4);
      if (!this.p.length)
        this.p = c;
      else if (c.length) {
        var n = new u8(this.p.length + c.length);
        n.set(this.p), n.set(c, this.p.length), this.p = n;
      }
    };
    Inflate2.prototype.c = function(final) {
      this.s.i = +(this.d = final || false);
      var bts = this.s.b;
      var dt = inflt(this.p, this.s, this.o);
      this.ondata(slc(dt, bts, this.s.b), this.d);
      this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
      this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
    };
    Inflate2.prototype.push = function(chunk, final) {
      this.e(chunk), this.c(final);
    };
    return Inflate2;
  }();
  function inflate(data, opts, cb) {
    if (!cb)
      cb = opts, opts = {};
    if (typeof cb != "function")
      err(7);
    return cbify(data, opts, [
      bInflt
    ], function(ev) {
      return pbf(inflateSync(ev.data[0], gopt(ev.data[1])));
    }, 1, cb);
  }
  function inflateSync(data, opts) {
    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  var Gunzip = /* @__PURE__ */ function() {
    function Gunzip2(opts, cb) {
      this.v = 1;
      this.r = 0;
      Inflate.call(this, opts, cb);
    }
    Gunzip2.prototype.push = function(chunk, final) {
      Inflate.prototype.e.call(this, chunk);
      this.r += chunk.length;
      if (this.v) {
        var p = this.p.subarray(this.v - 1);
        var s = p.length > 3 ? gzs(p) : 4;
        if (s > p.length) {
          if (!final)
            return;
        } else if (this.v > 1 && this.onmember) {
          this.onmember(this.r - p.length);
        }
        this.p = p.subarray(s), this.v = 0;
      }
      Inflate.prototype.c.call(this, final);
      if (this.s.f && !this.s.l && !final) {
        this.v = shft(this.s.p) + 9;
        this.s = { i: 0 };
        this.o = new u8(0);
        this.push(new u8(0), final);
      }
    };
    return Gunzip2;
  }();
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  try {
    td.decode(et, { stream: true });
  } catch (e) {
  }
  var dutf8 = function(d) {
    for (var r = "", i2 = 0; ; ) {
      var c = d[i2++];
      var eb = (c > 127) + (c > 223) + (c > 239);
      if (i2 + eb > d.length)
        return { s: r, r: slc(d, i2 - 1) };
      if (!eb)
        r += String.fromCharCode(c);
      else if (eb == 3) {
        c = ((c & 15) << 18 | (d[i2++] & 63) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
      } else if (eb & 1)
        r += String.fromCharCode((c & 31) << 6 | d[i2++] & 63);
      else
        r += String.fromCharCode((c & 15) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63);
    }
  };
  function strFromU8(dat, latin1) {
    if (latin1) {
      var r = "";
      for (var i2 = 0; i2 < dat.length; i2 += 16384)
        r += String.fromCharCode.apply(null, dat.subarray(i2, i2 + 16384));
      return r;
    } else if (td) {
      return td.decode(dat);
    } else {
      var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
      if (r.length)
        err(8);
      return s;
    }
  }
  var slzh = function(d, b) {
    return b + 30 + b2(d, b + 26) + b2(d, b + 28);
  };
  var zh = function(d, b, z) {
    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
    var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
    return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
  };
  var z64e = function(d, b) {
    for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
      ;
    return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
  };
  var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {
    fn();
  };
  function unzip(data, opts, cb) {
    if (!cb)
      cb = opts, opts = {};
    if (typeof cb != "function")
      err(7);
    var term = [];
    var tAll = function() {
      for (var i3 = 0; i3 < term.length; ++i3)
        term[i3]();
    };
    var files = {};
    var cbd = function(a, b) {
      mt(function() {
        cb(a, b);
      });
    };
    mt(function() {
      cbd = cb;
    });
    var e = data.length - 22;
    for (; b4(data, e) != 101010256; --e) {
      if (!e || data.length - e > 65558) {
        cbd(err(13, 0, 1), null);
        return tAll;
      }
    }
    var lft = b2(data, e + 8);
    if (lft) {
      var c = lft;
      var o = b4(data, e + 16);
      var z = o == 4294967295 || c == 65535;
      if (z) {
        var ze = b4(data, e - 12);
        z = b4(data, ze) == 101075792;
        if (z) {
          c = lft = b4(data, ze + 32);
          o = b4(data, ze + 48);
        }
      }
      var fltr = opts && opts.filter;
      var _loop_3 = function(i3) {
        var _a2 = zh(data, o, z), c_1 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
        o = no;
        var cbl = function(e2, d) {
          if (e2) {
            tAll();
            cbd(e2, null);
          } else {
            if (d)
              files[fn] = d;
            if (!--lft)
              cbd(null, files);
          }
        };
        if (!fltr || fltr({
          name: fn,
          size: sc,
          originalSize: su,
          compression: c_1
        })) {
          if (!c_1)
            cbl(null, slc(data, b, b + sc));
          else if (c_1 == 8) {
            var infl = data.subarray(b, b + sc);
            if (su < 524288 || sc > 0.8 * su) {
              try {
                cbl(null, inflateSync(infl, { out: new u8(su) }));
              } catch (e2) {
                cbl(e2, null);
              }
            } else
              term.push(inflate(infl, { size: su }, cbl));
          } else
            cbl(err(14, "unknown compression type " + c_1, 1), null);
        } else
          cbl(null, null);
      };
      for (var i2 = 0; i2 < c; ++i2) {
        _loop_3(i2);
      }
    } else
      cbd(null, {});
    return tAll;
  }
  function unzipSync(data, opts) {
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 101010256; --e) {
      if (!e || data.length - e > 65558)
        err(13);
    }
    var c = b2(data, e + 8);
    if (!c)
      return {};
    var o = b4(data, e + 16);
    var z = o == 4294967295 || c == 65535;
    if (z) {
      var ze = b4(data, e - 12);
      z = b4(data, ze) == 101075792;
      if (z) {
        c = b4(data, ze + 32);
        o = b4(data, ze + 48);
      }
    }
    var fltr = opts && opts.filter;
    for (var i2 = 0; i2 < c; ++i2) {
      var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
      o = no;
      if (!fltr || fltr({
        name: fn,
        size: sc,
        originalSize: su,
        compression: c_2
      })) {
        if (!c_2)
          files[fn] = slc(data, b, b + sc);
        else if (c_2 == 8)
          files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });
        else
          err(14, "unknown compression type " + c_2);
      }
    }
    return files;
  }
  /**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   */
  const REVISION = "178";
  const NoColorSpace = "";
  const SRGBColorSpace = "srgb";
  const LinearSRGBColorSpace = "srgb-linear";
  const LinearTransfer = "linear";
  const SRGBTransfer = "srgb";
  function clamp(value, min, max2) {
    return Math.max(min, Math.min(max2, value));
  }
  function euclideanModulo(n, m) {
    return (n % m + m) % m;
  }
  function lerp(x2, y, t) {
    return (1 - t) * x2 + t * y;
  }
  class Quaternion {
    /**
     * Constructs a new quaternion.
     *
     * @param {number} [x=0] - The x value of this quaternion.
     * @param {number} [y=0] - The y value of this quaternion.
     * @param {number} [z=0] - The z value of this quaternion.
     * @param {number} [w=1] - The w value of this quaternion.
     */
    constructor(x2 = 0, y = 0, z = 0, w = 1) {
      this.isQuaternion = true;
      this._x = x2;
      this._y = y;
      this._z = z;
      this._w = w;
    }
    /**
     * Interpolates between two quaternions via SLERP. This implementation assumes the
     * quaternion data are managed  in flat arrays.
     *
     * @param {Array<number>} dst - The destination array.
     * @param {number} dstOffset - An offset into the destination array.
     * @param {Array<number>} src0 - The source array of the first quaternion.
     * @param {number} srcOffset0 - An offset into the first source array.
     * @param {Array<number>} src1 -  The source array of the second quaternion.
     * @param {number} srcOffset1 - An offset into the second source array.
     * @param {number} t - The interpolation factor in the range \`[0,1]\`.
     * @see {@link Quaternion#slerp}
     */
    static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
      let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];
      const x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
      if (t === 0) {
        dst[dstOffset + 0] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
        return;
      }
      if (t === 1) {
        dst[dstOffset + 0] = x1;
        dst[dstOffset + 1] = y1;
        dst[dstOffset + 2] = z1;
        dst[dstOffset + 3] = w1;
        return;
      }
      if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
        let s = 1 - t;
        const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1, dir = cos >= 0 ? 1 : -1, sqrSin = 1 - cos * cos;
        if (sqrSin > Number.EPSILON) {
          const sin = Math.sqrt(sqrSin), len = Math.atan2(sin, cos * dir);
          s = Math.sin(s * len) / sin;
          t = Math.sin(t * len) / sin;
        }
        const tDir = t * dir;
        x0 = x0 * s + x1 * tDir;
        y0 = y0 * s + y1 * tDir;
        z0 = z0 * s + z1 * tDir;
        w0 = w0 * s + w1 * tDir;
        if (s === 1 - t) {
          const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
          x0 *= f;
          y0 *= f;
          z0 *= f;
          w0 *= f;
        }
      }
      dst[dstOffset] = x0;
      dst[dstOffset + 1] = y0;
      dst[dstOffset + 2] = z0;
      dst[dstOffset + 3] = w0;
    }
    /**
     * Multiplies two quaternions. This implementation assumes the quaternion data are managed
     * in flat arrays.
     *
     * @param {Array<number>} dst - The destination array.
     * @param {number} dstOffset - An offset into the destination array.
     * @param {Array<number>} src0 - The source array of the first quaternion.
     * @param {number} srcOffset0 - An offset into the first source array.
     * @param {Array<number>} src1 -  The source array of the second quaternion.
     * @param {number} srcOffset1 - An offset into the second source array.
     * @return {Array<number>} The destination array.
     * @see {@link Quaternion#multiplyQuaternions}.
     */
    static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
      const x0 = src0[srcOffset0];
      const y0 = src0[srcOffset0 + 1];
      const z0 = src0[srcOffset0 + 2];
      const w0 = src0[srcOffset0 + 3];
      const x1 = src1[srcOffset1];
      const y1 = src1[srcOffset1 + 1];
      const z1 = src1[srcOffset1 + 2];
      const w1 = src1[srcOffset1 + 3];
      dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
      dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
      dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
      dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
      return dst;
    }
    /**
     * The x value of this quaternion.
     *
     * @type {number}
     * @default 0
     */
    get x() {
      return this._x;
    }
    set x(value) {
      this._x = value;
      this._onChangeCallback();
    }
    /**
     * The y value of this quaternion.
     *
     * @type {number}
     * @default 0
     */
    get y() {
      return this._y;
    }
    set y(value) {
      this._y = value;
      this._onChangeCallback();
    }
    /**
     * The z value of this quaternion.
     *
     * @type {number}
     * @default 0
     */
    get z() {
      return this._z;
    }
    set z(value) {
      this._z = value;
      this._onChangeCallback();
    }
    /**
     * The w value of this quaternion.
     *
     * @type {number}
     * @default 1
     */
    get w() {
      return this._w;
    }
    set w(value) {
      this._w = value;
      this._onChangeCallback();
    }
    /**
     * Sets the quaternion components.
     *
     * @param {number} x - The x value of this quaternion.
     * @param {number} y - The y value of this quaternion.
     * @param {number} z - The z value of this quaternion.
     * @param {number} w - The w value of this quaternion.
     * @return {Quaternion} A reference to this quaternion.
     */
    set(x2, y, z, w) {
      this._x = x2;
      this._y = y;
      this._z = z;
      this._w = w;
      this._onChangeCallback();
      return this;
    }
    /**
     * Returns a new quaternion with copied values from this instance.
     *
     * @return {Quaternion} A clone of this instance.
     */
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    /**
     * Copies the values of the given quaternion to this instance.
     *
     * @param {Quaternion} quaternion - The quaternion to copy.
     * @return {Quaternion} A reference to this quaternion.
     */
    copy(quaternion) {
      this._x = quaternion.x;
      this._y = quaternion.y;
      this._z = quaternion.z;
      this._w = quaternion.w;
      this._onChangeCallback();
      return this;
    }
    /**
     * Sets this quaternion from the rotation specified by the given
     * Euler angles.
     *
     * @param {Euler} euler - The Euler angles.
     * @param {boolean} [update=true] - Whether the internal \`onChange\` callback should be executed or not.
     * @return {Quaternion} A reference to this quaternion.
     */
    setFromEuler(euler, update = true) {
      const x2 = euler._x, y = euler._y, z = euler._z, order = euler._order;
      const cos = Math.cos;
      const sin = Math.sin;
      const c1 = cos(x2 / 2);
      const c2 = cos(y / 2);
      const c3 = cos(z / 2);
      const s1 = sin(x2 / 2);
      const s2 = sin(y / 2);
      const s3 = sin(z / 2);
      switch (order) {
        case "XYZ":
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;
        case "YXZ":
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;
        case "ZXY":
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;
        case "ZYX":
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;
        case "YZX":
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;
        case "XZY":
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;
        default:
          console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + order);
      }
      if (update === true) this._onChangeCallback();
      return this;
    }
    /**
     * Sets this quaternion from the given axis and angle.
     *
     * @param {Vector3} axis - The normalized axis.
     * @param {number} angle - The angle in radians.
     * @return {Quaternion} A reference to this quaternion.
     */
    setFromAxisAngle(axis, angle) {
      const halfAngle = angle / 2, s = Math.sin(halfAngle);
      this._x = axis.x * s;
      this._y = axis.y * s;
      this._z = axis.z * s;
      this._w = Math.cos(halfAngle);
      this._onChangeCallback();
      return this;
    }
    /**
     * Sets this quaternion from the given rotation matrix.
     *
     * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
     * @return {Quaternion} A reference to this quaternion.
     */
    setFromRotationMatrix(m) {
      const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
      if (trace > 0) {
        const s = 0.5 / Math.sqrt(trace + 1);
        this._w = 0.25 / s;
        this._x = (m32 - m23) * s;
        this._y = (m13 - m31) * s;
        this._z = (m21 - m12) * s;
      } else if (m11 > m22 && m11 > m33) {
        const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
        this._w = (m32 - m23) / s;
        this._x = 0.25 * s;
        this._y = (m12 + m21) / s;
        this._z = (m13 + m31) / s;
      } else if (m22 > m33) {
        const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
        this._w = (m13 - m31) / s;
        this._x = (m12 + m21) / s;
        this._y = 0.25 * s;
        this._z = (m23 + m32) / s;
      } else {
        const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
        this._w = (m21 - m12) / s;
        this._x = (m13 + m31) / s;
        this._y = (m23 + m32) / s;
        this._z = 0.25 * s;
      }
      this._onChangeCallback();
      return this;
    }
    /**
     * Sets this quaternion to the rotation required to rotate the direction vector
     * \`vFrom\` to the direction vector \`vTo\`.
     *
     * @param {Vector3} vFrom - The first (normalized) direction vector.
     * @param {Vector3} vTo - The second (normalized) direction vector.
     * @return {Quaternion} A reference to this quaternion.
     */
    setFromUnitVectors(vFrom, vTo) {
      let r = vFrom.dot(vTo) + 1;
      if (r < 1e-8) {
        r = 0;
        if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
          this._x = -vFrom.y;
          this._y = vFrom.x;
          this._z = 0;
          this._w = r;
        } else {
          this._x = 0;
          this._y = -vFrom.z;
          this._z = vFrom.y;
          this._w = r;
        }
      } else {
        this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
        this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
        this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
        this._w = r;
      }
      return this.normalize();
    }
    /**
     * Returns the angle between this quaternion and the given one in radians.
     *
     * @param {Quaternion} q - The quaternion to compute the angle with.
     * @return {number} The angle in radians.
     */
    angleTo(q) {
      return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
    }
    /**
     * Rotates this quaternion by a given angular step to the given quaternion.
     * The method ensures that the final quaternion will not overshoot \`q\`.
     *
     * @param {Quaternion} q - The target quaternion.
     * @param {number} step - The angular step in radians.
     * @return {Quaternion} A reference to this quaternion.
     */
    rotateTowards(q, step) {
      const angle = this.angleTo(q);
      if (angle === 0) return this;
      const t = Math.min(1, step / angle);
      this.slerp(q, t);
      return this;
    }
    /**
     * Sets this quaternion to the identity quaternion; that is, to the
     * quaternion that represents "no rotation".
     *
     * @return {Quaternion} A reference to this quaternion.
     */
    identity() {
      return this.set(0, 0, 0, 1);
    }
    /**
     * Inverts this quaternion via {@link Quaternion#conjugate}. The
     * quaternion is assumed to have unit length.
     *
     * @return {Quaternion} A reference to this quaternion.
     */
    invert() {
      return this.conjugate();
    }
    /**
     * Returns the rotational conjugate of this quaternion. The conjugate of a
     * quaternion represents the same rotation in the opposite direction about
     * the rotational axis.
     *
     * @return {Quaternion} A reference to this quaternion.
     */
    conjugate() {
      this._x *= -1;
      this._y *= -1;
      this._z *= -1;
      this._onChangeCallback();
      return this;
    }
    /**
     * Calculates the dot product of this quaternion and the given one.
     *
     * @param {Quaternion} v - The quaternion to compute the dot product with.
     * @return {number} The result of the dot product.
     */
    dot(v) {
      return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }
    /**
     * Computes the squared Euclidean length (straight-line length) of this quaternion,
     * considered as a 4 dimensional vector. This can be useful if you are comparing the
     * lengths of two quaternions, as this is a slightly more efficient calculation than
     * {@link Quaternion#length}.
     *
     * @return {number} The squared Euclidean length.
     */
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    /**
     * Computes the Euclidean length (straight-line length) of this quaternion,
     * considered as a 4 dimensional vector.
     *
     * @return {number} The Euclidean length.
     */
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    /**
     * Normalizes this quaternion - that is, calculated the quaternion that performs
     * the same rotation as this one, but has a length equal to \`1\`.
     *
     * @return {Quaternion} A reference to this quaternion.
     */
    normalize() {
      let l = this.length();
      if (l === 0) {
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._w = 1;
      } else {
        l = 1 / l;
        this._x = this._x * l;
        this._y = this._y * l;
        this._z = this._z * l;
        this._w = this._w * l;
      }
      this._onChangeCallback();
      return this;
    }
    /**
     * Multiplies this quaternion by the given one.
     *
     * @param {Quaternion} q - The quaternion.
     * @return {Quaternion} A reference to this quaternion.
     */
    multiply(q) {
      return this.multiplyQuaternions(this, q);
    }
    /**
     * Pre-multiplies this quaternion by the given one.
     *
     * @param {Quaternion} q - The quaternion.
     * @return {Quaternion} A reference to this quaternion.
     */
    premultiply(q) {
      return this.multiplyQuaternions(q, this);
    }
    /**
     * Multiplies the given quaternions and stores the result in this instance.
     *
     * @param {Quaternion} a - The first quaternion.
     * @param {Quaternion} b - The second quaternion.
     * @return {Quaternion} A reference to this quaternion.
     */
    multiplyQuaternions(a, b) {
      const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
      const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
      this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
      this._onChangeCallback();
      return this;
    }
    /**
     * Performs a spherical linear interpolation between quaternions.
     *
     * @param {Quaternion} qb - The target quaternion.
     * @param {number} t - The interpolation factor in the closed interval \`[0, 1]\`.
     * @return {Quaternion} A reference to this quaternion.
     */
    slerp(qb, t) {
      if (t === 0) return this;
      if (t === 1) return this.copy(qb);
      const x2 = this._x, y = this._y, z = this._z, w = this._w;
      let cosHalfTheta = w * qb._w + x2 * qb._x + y * qb._y + z * qb._z;
      if (cosHalfTheta < 0) {
        this._w = -qb._w;
        this._x = -qb._x;
        this._y = -qb._y;
        this._z = -qb._z;
        cosHalfTheta = -cosHalfTheta;
      } else {
        this.copy(qb);
      }
      if (cosHalfTheta >= 1) {
        this._w = w;
        this._x = x2;
        this._y = y;
        this._z = z;
        return this;
      }
      const sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;
      if (sqrSinHalfTheta <= Number.EPSILON) {
        const s = 1 - t;
        this._w = s * w + t * this._w;
        this._x = s * x2 + t * this._x;
        this._y = s * y + t * this._y;
        this._z = s * z + t * this._z;
        this.normalize();
        return this;
      }
      const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
      const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
      const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
      this._w = w * ratioA + this._w * ratioB;
      this._x = x2 * ratioA + this._x * ratioB;
      this._y = y * ratioA + this._y * ratioB;
      this._z = z * ratioA + this._z * ratioB;
      this._onChangeCallback();
      return this;
    }
    /**
     * Performs a spherical linear interpolation between the given quaternions
     * and stores the result in this quaternion.
     *
     * @param {Quaternion} qa - The source quaternion.
     * @param {Quaternion} qb - The target quaternion.
     * @param {number} t - The interpolation factor in the closed interval \`[0, 1]\`.
     * @return {Quaternion} A reference to this quaternion.
     */
    slerpQuaternions(qa, qb, t) {
      return this.copy(qa).slerp(qb, t);
    }
    /**
     * Sets this quaternion to a uniformly random, normalized quaternion.
     *
     * @return {Quaternion} A reference to this quaternion.
     */
    random() {
      const theta1 = 2 * Math.PI * Math.random();
      const theta2 = 2 * Math.PI * Math.random();
      const x0 = Math.random();
      const r1 = Math.sqrt(1 - x0);
      const r2 = Math.sqrt(x0);
      return this.set(
        r1 * Math.sin(theta1),
        r1 * Math.cos(theta1),
        r2 * Math.sin(theta2),
        r2 * Math.cos(theta2)
      );
    }
    /**
     * Returns \`true\` if this quaternion is equal with the given one.
     *
     * @param {Quaternion} quaternion - The quaternion to test for equality.
     * @return {boolean} Whether this quaternion is equal with the given one.
     */
    equals(quaternion) {
      return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
    }
    /**
     * Sets this quaternion's components from the given array.
     *
     * @param {Array<number>} array - An array holding the quaternion component values.
     * @param {number} [offset=0] - The offset into the array.
     * @return {Quaternion} A reference to this quaternion.
     */
    fromArray(array, offset = 0) {
      this._x = array[offset];
      this._y = array[offset + 1];
      this._z = array[offset + 2];
      this._w = array[offset + 3];
      this._onChangeCallback();
      return this;
    }
    /**
     * Writes the components of this quaternion to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The quaternion components.
     */
    toArray(array = [], offset = 0) {
      array[offset] = this._x;
      array[offset + 1] = this._y;
      array[offset + 2] = this._z;
      array[offset + 3] = this._w;
      return array;
    }
    /**
     * Sets the components of this quaternion from the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
     * @param {number} index - The index into the attribute.
     * @return {Quaternion} A reference to this quaternion.
     */
    fromBufferAttribute(attribute, index) {
      this._x = attribute.getX(index);
      this._y = attribute.getY(index);
      this._z = attribute.getZ(index);
      this._w = attribute.getW(index);
      this._onChangeCallback();
      return this;
    }
    /**
     * This methods defines the serialization result of this class. Returns the
     * numerical elements of this quaternion in an array of format \`[x, y, z, w]\`.
     *
     * @return {Array<number>} The serialized quaternion.
     */
    toJSON() {
      return this.toArray();
    }
    _onChange(callback) {
      this._onChangeCallback = callback;
      return this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x;
      yield this._y;
      yield this._z;
      yield this._w;
    }
  }
  class Vector3 {
    /**
     * Constructs a new 3D vector.
     *
     * @param {number} [x=0] - The x value of this vector.
     * @param {number} [y=0] - The y value of this vector.
     * @param {number} [z=0] - The z value of this vector.
     */
    constructor(x2 = 0, y = 0, z = 0) {
      Vector3.prototype.isVector3 = true;
      this.x = x2;
      this.y = y;
      this.z = z;
    }
    /**
     * Sets the vector components.
     *
     * @param {number} x - The value of the x component.
     * @param {number} y - The value of the y component.
     * @param {number} z - The value of the z component.
     * @return {Vector3} A reference to this vector.
     */
    set(x2, y, z) {
      if (z === void 0) z = this.z;
      this.x = x2;
      this.y = y;
      this.z = z;
      return this;
    }
    /**
     * Sets the vector components to the same value.
     *
     * @param {number} scalar - The value to set for all vector components.
     * @return {Vector3} A reference to this vector.
     */
    setScalar(scalar) {
      this.x = scalar;
      this.y = scalar;
      this.z = scalar;
      return this;
    }
    /**
     * Sets the vector's x component to the given value
     *
     * @param {number} x - The value to set.
     * @return {Vector3} A reference to this vector.
     */
    setX(x2) {
      this.x = x2;
      return this;
    }
    /**
     * Sets the vector's y component to the given value
     *
     * @param {number} y - The value to set.
     * @return {Vector3} A reference to this vector.
     */
    setY(y) {
      this.y = y;
      return this;
    }
    /**
     * Sets the vector's z component to the given value
     *
     * @param {number} z - The value to set.
     * @return {Vector3} A reference to this vector.
     */
    setZ(z) {
      this.z = z;
      return this;
    }
    /**
     * Allows to set a vector component with an index.
     *
     * @param {number} index - The component index. \`0\` equals to x, \`1\` equals to y, \`2\` equals to z.
     * @param {number} value - The value to set.
     * @return {Vector3} A reference to this vector.
     */
    setComponent(index, value) {
      switch (index) {
        case 0:
          this.x = value;
          break;
        case 1:
          this.y = value;
          break;
        case 2:
          this.z = value;
          break;
        default:
          throw new Error("index is out of range: " + index);
      }
      return this;
    }
    /**
     * Returns the value of the vector component which matches the given index.
     *
     * @param {number} index - The component index. \`0\` equals to x, \`1\` equals to y, \`2\` equals to z.
     * @return {number} A vector component value.
     */
    getComponent(index) {
      switch (index) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("index is out of range: " + index);
      }
    }
    /**
     * Returns a new vector with copied values from this instance.
     *
     * @return {Vector3} A clone of this instance.
     */
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    /**
     * Copies the values of the given vector to this instance.
     *
     * @param {Vector3} v - The vector to copy.
     * @return {Vector3} A reference to this vector.
     */
    copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    }
    /**
     * Adds the given vector to this instance.
     *
     * @param {Vector3} v - The vector to add.
     * @return {Vector3} A reference to this vector.
     */
    add(v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    }
    /**
     * Adds the given scalar value to all components of this instance.
     *
     * @param {number} s - The scalar to add.
     * @return {Vector3} A reference to this vector.
     */
    addScalar(s) {
      this.x += s;
      this.y += s;
      this.z += s;
      return this;
    }
    /**
     * Adds the given vectors and stores the result in this instance.
     *
     * @param {Vector3} a - The first vector.
     * @param {Vector3} b - The second vector.
     * @return {Vector3} A reference to this vector.
     */
    addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      return this;
    }
    /**
     * Adds the given vector scaled by the given factor to this instance.
     *
     * @param {Vector3|Vector4} v - The vector.
     * @param {number} s - The factor that scales \`v\`.
     * @return {Vector3} A reference to this vector.
     */
    addScaledVector(v, s) {
      this.x += v.x * s;
      this.y += v.y * s;
      this.z += v.z * s;
      return this;
    }
    /**
     * Subtracts the given vector from this instance.
     *
     * @param {Vector3} v - The vector to subtract.
     * @return {Vector3} A reference to this vector.
     */
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    }
    /**
     * Subtracts the given scalar value from all components of this instance.
     *
     * @param {number} s - The scalar to subtract.
     * @return {Vector3} A reference to this vector.
     */
    subScalar(s) {
      this.x -= s;
      this.y -= s;
      this.z -= s;
      return this;
    }
    /**
     * Subtracts the given vectors and stores the result in this instance.
     *
     * @param {Vector3} a - The first vector.
     * @param {Vector3} b - The second vector.
     * @return {Vector3} A reference to this vector.
     */
    subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      return this;
    }
    /**
     * Multiplies the given vector with this instance.
     *
     * @param {Vector3} v - The vector to multiply.
     * @return {Vector3} A reference to this vector.
     */
    multiply(v) {
      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
      return this;
    }
    /**
     * Multiplies the given scalar value with all components of this instance.
     *
     * @param {number} scalar - The scalar to multiply.
     * @return {Vector3} A reference to this vector.
     */
    multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      return this;
    }
    /**
     * Multiplies the given vectors and stores the result in this instance.
     *
     * @param {Vector3} a - The first vector.
     * @param {Vector3} b - The second vector.
     * @return {Vector3} A reference to this vector.
     */
    multiplyVectors(a, b) {
      this.x = a.x * b.x;
      this.y = a.y * b.y;
      this.z = a.z * b.z;
      return this;
    }
    /**
     * Applies the given Euler rotation to this vector.
     *
     * @param {Euler} euler - The Euler angles.
     * @return {Vector3} A reference to this vector.
     */
    applyEuler(euler) {
      return this.applyQuaternion(_quaternion$4.setFromEuler(euler));
    }
    /**
     * Applies a rotation specified by an axis and an angle to this vector.
     *
     * @param {Vector3} axis - A normalized vector representing the rotation axis.
     * @param {number} angle - The angle in radians.
     * @return {Vector3} A reference to this vector.
     */
    applyAxisAngle(axis, angle) {
      return this.applyQuaternion(_quaternion$4.setFromAxisAngle(axis, angle));
    }
    /**
     * Multiplies this vector with the given 3x3 matrix.
     *
     * @param {Matrix3} m - The 3x3 matrix.
     * @return {Vector3} A reference to this vector.
     */
    applyMatrix3(m) {
      const x2 = this.x, y = this.y, z = this.z;
      const e = m.elements;
      this.x = e[0] * x2 + e[3] * y + e[6] * z;
      this.y = e[1] * x2 + e[4] * y + e[7] * z;
      this.z = e[2] * x2 + e[5] * y + e[8] * z;
      return this;
    }
    /**
     * Multiplies this vector by the given normal matrix and normalizes
     * the result.
     *
     * @param {Matrix3} m - The normal matrix.
     * @return {Vector3} A reference to this vector.
     */
    applyNormalMatrix(m) {
      return this.applyMatrix3(m).normalize();
    }
    /**
     * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
     * divides by perspective.
     *
     * @param {Matrix4} m - The matrix to apply.
     * @return {Vector3} A reference to this vector.
     */
    applyMatrix4(m) {
      const x2 = this.x, y = this.y, z = this.z;
      const e = m.elements;
      const w = 1 / (e[3] * x2 + e[7] * y + e[11] * z + e[15]);
      this.x = (e[0] * x2 + e[4] * y + e[8] * z + e[12]) * w;
      this.y = (e[1] * x2 + e[5] * y + e[9] * z + e[13]) * w;
      this.z = (e[2] * x2 + e[6] * y + e[10] * z + e[14]) * w;
      return this;
    }
    /**
     * Applies the given Quaternion to this vector.
     *
     * @param {Quaternion} q - The Quaternion.
     * @return {Vector3} A reference to this vector.
     */
    applyQuaternion(q) {
      const vx = this.x, vy = this.y, vz = this.z;
      const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
      const tx = 2 * (qy * vz - qz * vy);
      const ty = 2 * (qz * vx - qx * vz);
      const tz = 2 * (qx * vy - qy * vx);
      this.x = vx + qw * tx + qy * tz - qz * ty;
      this.y = vy + qw * ty + qz * tx - qx * tz;
      this.z = vz + qw * tz + qx * ty - qy * tx;
      return this;
    }
    /**
     * Projects this vector from world space into the camera's normalized
     * device coordinate (NDC) space.
     *
     * @param {Camera} camera - The camera.
     * @return {Vector3} A reference to this vector.
     */
    project(camera) {
      return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
    }
    /**
     * Unprojects this vector from the camera's normalized device coordinate (NDC)
     * space into world space.
     *
     * @param {Camera} camera - The camera.
     * @return {Vector3} A reference to this vector.
     */
    unproject(camera) {
      return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
    }
    /**
     * Transforms the direction of this vector by a matrix (the upper left 3 x 3
     * subset of the given 4x4 matrix and then normalizes the result.
     *
     * @param {Matrix4} m - The matrix.
     * @return {Vector3} A reference to this vector.
     */
    transformDirection(m) {
      const x2 = this.x, y = this.y, z = this.z;
      const e = m.elements;
      this.x = e[0] * x2 + e[4] * y + e[8] * z;
      this.y = e[1] * x2 + e[5] * y + e[9] * z;
      this.z = e[2] * x2 + e[6] * y + e[10] * z;
      return this.normalize();
    }
    /**
     * Divides this instance by the given vector.
     *
     * @param {Vector3} v - The vector to divide.
     * @return {Vector3} A reference to this vector.
     */
    divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
      return this;
    }
    /**
     * Divides this vector by the given scalar.
     *
     * @param {number} scalar - The scalar to divide.
     * @return {Vector3} A reference to this vector.
     */
    divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
    /**
     * If this vector's x, y or z value is greater than the given vector's x, y or z
     * value, replace that value with the corresponding min value.
     *
     * @param {Vector3} v - The vector.
     * @return {Vector3} A reference to this vector.
     */
    min(v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      this.z = Math.min(this.z, v.z);
      return this;
    }
    /**
     * If this vector's x, y or z value is less than the given vector's x, y or z
     * value, replace that value with the corresponding max value.
     *
     * @param {Vector3} v - The vector.
     * @return {Vector3} A reference to this vector.
     */
    max(v) {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      this.z = Math.max(this.z, v.z);
      return this;
    }
    /**
     * If this vector's x, y or z value is greater than the max vector's x, y or z
     * value, it is replaced by the corresponding value.
     * If this vector's x, y or z value is less than the min vector's x, y or z value,
     * it is replaced by the corresponding value.
     *
     * @param {Vector3} min - The minimum x, y and z values.
     * @param {Vector3} max - The maximum x, y and z values in the desired range.
     * @return {Vector3} A reference to this vector.
     */
    clamp(min, max2) {
      this.x = clamp(this.x, min.x, max2.x);
      this.y = clamp(this.y, min.y, max2.y);
      this.z = clamp(this.z, min.z, max2.z);
      return this;
    }
    /**
     * If this vector's x, y or z values are greater than the max value, they are
     * replaced by the max value.
     * If this vector's x, y or z values are less than the min value, they are
     * replaced by the min value.
     *
     * @param {number} minVal - The minimum value the components will be clamped to.
     * @param {number} maxVal - The maximum value the components will be clamped to.
     * @return {Vector3} A reference to this vector.
     */
    clampScalar(minVal, maxVal) {
      this.x = clamp(this.x, minVal, maxVal);
      this.y = clamp(this.y, minVal, maxVal);
      this.z = clamp(this.z, minVal, maxVal);
      return this;
    }
    /**
     * If this vector's length is greater than the max value, it is replaced by
     * the max value.
     * If this vector's length is less than the min value, it is replaced by the
     * min value.
     *
     * @param {number} min - The minimum value the vector length will be clamped to.
     * @param {number} max - The maximum value the vector length will be clamped to.
     * @return {Vector3} A reference to this vector.
     */
    clampLength(min, max2) {
      const length = this.length();
      return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max2));
    }
    /**
     * The components of this vector are rounded down to the nearest integer value.
     *
     * @return {Vector3} A reference to this vector.
     */
    floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      return this;
    }
    /**
     * The components of this vector are rounded up to the nearest integer value.
     *
     * @return {Vector3} A reference to this vector.
     */
    ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      return this;
    }
    /**
     * The components of this vector are rounded to the nearest integer value
     *
     * @return {Vector3} A reference to this vector.
     */
    round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      return this;
    }
    /**
     * The components of this vector are rounded towards zero (up if negative,
     * down if positive) to an integer value.
     *
     * @return {Vector3} A reference to this vector.
     */
    roundToZero() {
      this.x = Math.trunc(this.x);
      this.y = Math.trunc(this.y);
      this.z = Math.trunc(this.z);
      return this;
    }
    /**
     * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
     *
     * @return {Vector3} A reference to this vector.
     */
    negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    }
    /**
     * Calculates the dot product of the given vector with this instance.
     *
     * @param {Vector3} v - The vector to compute the dot product with.
     * @return {number} The result of the dot product.
     */
    dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    // TODO lengthSquared?
    /**
     * Computes the square of the Euclidean length (straight-line length) from
     * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
     * compare the length squared instead as it is slightly more efficient to calculate.
     *
     * @return {number} The square length of this vector.
     */
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    /**
     * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
     *
     * @return {number} The length of this vector.
     */
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /**
     * Computes the Manhattan length of this vector.
     *
     * @return {number} The length of this vector.
     */
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    /**
     * Converts this vector to a unit vector - that is, sets it equal to a vector
     * with the same direction as this one, but with a vector length of \`1\`.
     *
     * @return {Vector3} A reference to this vector.
     */
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    /**
     * Sets this vector to a vector with the same direction as this one, but
     * with the specified length.
     *
     * @param {number} length - The new length of this vector.
     * @return {Vector3} A reference to this vector.
     */
    setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
    /**
     * Linearly interpolates between the given vector and this instance, where
     * alpha is the percent distance along the line - alpha = 0 will be this
     * vector, and alpha = 1 will be the given one.
     *
     * @param {Vector3} v - The vector to interpolate towards.
     * @param {number} alpha - The interpolation factor, typically in the closed interval \`[0, 1]\`.
     * @return {Vector3} A reference to this vector.
     */
    lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;
      return this;
    }
    /**
     * Linearly interpolates between the given vectors, where alpha is the percent
     * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
     * be the second one. The result is stored in this instance.
     *
     * @param {Vector3} v1 - The first vector.
     * @param {Vector3} v2 - The second vector.
     * @param {number} alpha - The interpolation factor, typically in the closed interval \`[0, 1]\`.
     * @return {Vector3} A reference to this vector.
     */
    lerpVectors(v1, v2, alpha) {
      this.x = v1.x + (v2.x - v1.x) * alpha;
      this.y = v1.y + (v2.y - v1.y) * alpha;
      this.z = v1.z + (v2.z - v1.z) * alpha;
      return this;
    }
    /**
     * Calculates the cross product of the given vector with this instance.
     *
     * @param {Vector3} v - The vector to compute the cross product with.
     * @return {Vector3} The result of the cross product.
     */
    cross(v) {
      return this.crossVectors(this, v);
    }
    /**
     * Calculates the cross product of the given vectors and stores the result
     * in this instance.
     *
     * @param {Vector3} a - The first vector.
     * @param {Vector3} b - The second vector.
     * @return {Vector3} A reference to this vector.
     */
    crossVectors(a, b) {
      const ax = a.x, ay = a.y, az = a.z;
      const bx = b.x, by = b.y, bz = b.z;
      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;
      return this;
    }
    /**
     * Projects this vector onto the given one.
     *
     * @param {Vector3} v - The vector to project to.
     * @return {Vector3} A reference to this vector.
     */
    projectOnVector(v) {
      const denominator = v.lengthSq();
      if (denominator === 0) return this.set(0, 0, 0);
      const scalar = v.dot(this) / denominator;
      return this.copy(v).multiplyScalar(scalar);
    }
    /**
     * Projects this vector onto a plane by subtracting this
     * vector projected onto the plane's normal from this vector.
     *
     * @param {Vector3} planeNormal - The plane normal.
     * @return {Vector3} A reference to this vector.
     */
    projectOnPlane(planeNormal) {
      _vector$c.copy(this).projectOnVector(planeNormal);
      return this.sub(_vector$c);
    }
    /**
     * Reflects this vector off a plane orthogonal to the given normal vector.
     *
     * @param {Vector3} normal - The (normalized) normal vector.
     * @return {Vector3} A reference to this vector.
     */
    reflect(normal) {
      return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }
    /**
     * Returns the angle between the given vector and this instance in radians.
     *
     * @param {Vector3} v - The vector to compute the angle with.
     * @return {number} The angle in radians.
     */
    angleTo(v) {
      const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
      if (denominator === 0) return Math.PI / 2;
      const theta = this.dot(v) / denominator;
      return Math.acos(clamp(theta, -1, 1));
    }
    /**
     * Computes the distance from the given vector to this instance.
     *
     * @param {Vector3} v - The vector to compute the distance to.
     * @return {number} The distance.
     */
    distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }
    /**
     * Computes the squared distance from the given vector to this instance.
     * If you are just comparing the distance with another distance, you should compare
     * the distance squared instead as it is slightly more efficient to calculate.
     *
     * @param {Vector3} v - The vector to compute the squared distance to.
     * @return {number} The squared distance.
     */
    distanceToSquared(v) {
      const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
      return dx * dx + dy * dy + dz * dz;
    }
    /**
     * Computes the Manhattan distance from the given vector to this instance.
     *
     * @param {Vector3} v - The vector to compute the Manhattan distance to.
     * @return {number} The Manhattan distance.
     */
    manhattanDistanceTo(v) {
      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }
    /**
     * Sets the vector components from the given spherical coordinates.
     *
     * @param {Spherical} s - The spherical coordinates.
     * @return {Vector3} A reference to this vector.
     */
    setFromSpherical(s) {
      return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
    }
    /**
     * Sets the vector components from the given spherical coordinates.
     *
     * @param {number} radius - The radius.
     * @param {number} phi - The phi angle in radians.
     * @param {number} theta - The theta angle in radians.
     * @return {Vector3} A reference to this vector.
     */
    setFromSphericalCoords(radius, phi, theta) {
      const sinPhiRadius = Math.sin(phi) * radius;
      this.x = sinPhiRadius * Math.sin(theta);
      this.y = Math.cos(phi) * radius;
      this.z = sinPhiRadius * Math.cos(theta);
      return this;
    }
    /**
     * Sets the vector components from the given cylindrical coordinates.
     *
     * @param {Cylindrical} c - The cylindrical coordinates.
     * @return {Vector3} A reference to this vector.
     */
    setFromCylindrical(c) {
      return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
    }
    /**
     * Sets the vector components from the given cylindrical coordinates.
     *
     * @param {number} radius - The radius.
     * @param {number} theta - The theta angle in radians.
     * @param {number} y - The y value.
     * @return {Vector3} A reference to this vector.
     */
    setFromCylindricalCoords(radius, theta, y) {
      this.x = radius * Math.sin(theta);
      this.y = y;
      this.z = radius * Math.cos(theta);
      return this;
    }
    /**
     * Sets the vector components to the position elements of the
     * given transformation matrix.
     *
     * @param {Matrix4} m - The 4x4 matrix.
     * @return {Vector3} A reference to this vector.
     */
    setFromMatrixPosition(m) {
      const e = m.elements;
      this.x = e[12];
      this.y = e[13];
      this.z = e[14];
      return this;
    }
    /**
     * Sets the vector components to the scale elements of the
     * given transformation matrix.
     *
     * @param {Matrix4} m - The 4x4 matrix.
     * @return {Vector3} A reference to this vector.
     */
    setFromMatrixScale(m) {
      const sx = this.setFromMatrixColumn(m, 0).length();
      const sy = this.setFromMatrixColumn(m, 1).length();
      const sz = this.setFromMatrixColumn(m, 2).length();
      this.x = sx;
      this.y = sy;
      this.z = sz;
      return this;
    }
    /**
     * Sets the vector components from the specified matrix column.
     *
     * @param {Matrix4} m - The 4x4 matrix.
     * @param {number} index - The column index.
     * @return {Vector3} A reference to this vector.
     */
    setFromMatrixColumn(m, index) {
      return this.fromArray(m.elements, index * 4);
    }
    /**
     * Sets the vector components from the specified matrix column.
     *
     * @param {Matrix3} m - The 3x3 matrix.
     * @param {number} index - The column index.
     * @return {Vector3} A reference to this vector.
     */
    setFromMatrix3Column(m, index) {
      return this.fromArray(m.elements, index * 3);
    }
    /**
     * Sets the vector components from the given Euler angles.
     *
     * @param {Euler} e - The Euler angles to set.
     * @return {Vector3} A reference to this vector.
     */
    setFromEuler(e) {
      this.x = e._x;
      this.y = e._y;
      this.z = e._z;
      return this;
    }
    /**
     * Sets the vector components from the RGB components of the
     * given color.
     *
     * @param {Color} c - The color to set.
     * @return {Vector3} A reference to this vector.
     */
    setFromColor(c) {
      this.x = c.r;
      this.y = c.g;
      this.z = c.b;
      return this;
    }
    /**
     * Returns \`true\` if this vector is equal with the given one.
     *
     * @param {Vector3} v - The vector to test for equality.
     * @return {boolean} Whether this vector is equal with the given one.
     */
    equals(v) {
      return v.x === this.x && v.y === this.y && v.z === this.z;
    }
    /**
     * Sets this vector's x value to be \`array[ offset ]\`, y value to be \`array[ offset + 1 ]\`
     * and z value to be \`array[ offset + 2 ]\`.
     *
     * @param {Array<number>} array - An array holding the vector component values.
     * @param {number} [offset=0] - The offset into the array.
     * @return {Vector3} A reference to this vector.
     */
    fromArray(array, offset = 0) {
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      return this;
    }
    /**
     * Writes the components of this vector to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the vector components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The vector components.
     */
    toArray(array = [], offset = 0) {
      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      return array;
    }
    /**
     * Sets the components of this vector from the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
     * @param {number} index - The index into the attribute.
     * @return {Vector3} A reference to this vector.
     */
    fromBufferAttribute(attribute, index) {
      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      this.z = attribute.getZ(index);
      return this;
    }
    /**
     * Sets each component of this vector to a pseudo-random value between \`0\` and
     * \`1\`, excluding \`1\`.
     *
     * @return {Vector3} A reference to this vector.
     */
    random() {
      this.x = Math.random();
      this.y = Math.random();
      this.z = Math.random();
      return this;
    }
    /**
     * Sets this vector to a uniformly random point on a unit sphere.
     *
     * @return {Vector3} A reference to this vector.
     */
    randomDirection() {
      const theta = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const c = Math.sqrt(1 - u * u);
      this.x = c * Math.cos(theta);
      this.y = u;
      this.z = c * Math.sin(theta);
      return this;
    }
    *[Symbol.iterator]() {
      yield this.x;
      yield this.y;
      yield this.z;
    }
  }
  const _vector$c = /* @__PURE__ */ new Vector3();
  const _quaternion$4 = /* @__PURE__ */ new Quaternion();
  class Matrix3 {
    /**
     * Constructs a new 3x3 matrix. The arguments are supposed to be
     * in row-major order. If no arguments are provided, the constructor
     * initializes the matrix as an identity matrix.
     *
     * @param {number} [n11] - 1-1 matrix element.
     * @param {number} [n12] - 1-2 matrix element.
     * @param {number} [n13] - 1-3 matrix element.
     * @param {number} [n21] - 2-1 matrix element.
     * @param {number} [n22] - 2-2 matrix element.
     * @param {number} [n23] - 2-3 matrix element.
     * @param {number} [n31] - 3-1 matrix element.
     * @param {number} [n32] - 3-2 matrix element.
     * @param {number} [n33] - 3-3 matrix element.
     */
    constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
      Matrix3.prototype.isMatrix3 = true;
      this.elements = [
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ];
      if (n11 !== void 0) {
        this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
      }
    }
    /**
     * Sets the elements of the matrix.The arguments are supposed to be
     * in row-major order.
     *
     * @param {number} [n11] - 1-1 matrix element.
     * @param {number} [n12] - 1-2 matrix element.
     * @param {number} [n13] - 1-3 matrix element.
     * @param {number} [n21] - 2-1 matrix element.
     * @param {number} [n22] - 2-2 matrix element.
     * @param {number} [n23] - 2-3 matrix element.
     * @param {number} [n31] - 3-1 matrix element.
     * @param {number} [n32] - 3-2 matrix element.
     * @param {number} [n33] - 3-3 matrix element.
     * @return {Matrix3} A reference to this matrix.
     */
    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
      const te = this.elements;
      te[0] = n11;
      te[1] = n21;
      te[2] = n31;
      te[3] = n12;
      te[4] = n22;
      te[5] = n32;
      te[6] = n13;
      te[7] = n23;
      te[8] = n33;
      return this;
    }
    /**
     * Sets this matrix to the 3x3 identity matrix.
     *
     * @return {Matrix3} A reference to this matrix.
     */
    identity() {
      this.set(
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      );
      return this;
    }
    /**
     * Copies the values of the given matrix to this instance.
     *
     * @param {Matrix3} m - The matrix to copy.
     * @return {Matrix3} A reference to this matrix.
     */
    copy(m) {
      const te = this.elements;
      const me = m.elements;
      te[0] = me[0];
      te[1] = me[1];
      te[2] = me[2];
      te[3] = me[3];
      te[4] = me[4];
      te[5] = me[5];
      te[6] = me[6];
      te[7] = me[7];
      te[8] = me[8];
      return this;
    }
    /**
     * Extracts the basis of this matrix into the three axis vectors provided.
     *
     * @param {Vector3} xAxis - The basis's x axis.
     * @param {Vector3} yAxis - The basis's y axis.
     * @param {Vector3} zAxis - The basis's z axis.
     * @return {Matrix3} A reference to this matrix.
     */
    extractBasis(xAxis, yAxis, zAxis) {
      xAxis.setFromMatrix3Column(this, 0);
      yAxis.setFromMatrix3Column(this, 1);
      zAxis.setFromMatrix3Column(this, 2);
      return this;
    }
    /**
     * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
     *
     * @param {Matrix4} m - The 4x4 matrix.
     * @return {Matrix3} A reference to this matrix.
     */
    setFromMatrix4(m) {
      const me = m.elements;
      this.set(
        me[0],
        me[4],
        me[8],
        me[1],
        me[5],
        me[9],
        me[2],
        me[6],
        me[10]
      );
      return this;
    }
    /**
     * Post-multiplies this matrix by the given 3x3 matrix.
     *
     * @param {Matrix3} m - The matrix to multiply with.
     * @return {Matrix3} A reference to this matrix.
     */
    multiply(m) {
      return this.multiplyMatrices(this, m);
    }
    /**
     * Pre-multiplies this matrix by the given 3x3 matrix.
     *
     * @param {Matrix3} m - The matrix to multiply with.
     * @return {Matrix3} A reference to this matrix.
     */
    premultiply(m) {
      return this.multiplyMatrices(m, this);
    }
    /**
     * Multiples the given 3x3 matrices and stores the result
     * in this matrix.
     *
     * @param {Matrix3} a - The first matrix.
     * @param {Matrix3} b - The second matrix.
     * @return {Matrix3} A reference to this matrix.
     */
    multiplyMatrices(a, b) {
      const ae = a.elements;
      const be = b.elements;
      const te = this.elements;
      const a11 = ae[0], a12 = ae[3], a13 = ae[6];
      const a21 = ae[1], a22 = ae[4], a23 = ae[7];
      const a31 = ae[2], a32 = ae[5], a33 = ae[8];
      const b11 = be[0], b12 = be[3], b13 = be[6];
      const b21 = be[1], b22 = be[4], b23 = be[7];
      const b31 = be[2], b32 = be[5], b33 = be[8];
      te[0] = a11 * b11 + a12 * b21 + a13 * b31;
      te[3] = a11 * b12 + a12 * b22 + a13 * b32;
      te[6] = a11 * b13 + a12 * b23 + a13 * b33;
      te[1] = a21 * b11 + a22 * b21 + a23 * b31;
      te[4] = a21 * b12 + a22 * b22 + a23 * b32;
      te[7] = a21 * b13 + a22 * b23 + a23 * b33;
      te[2] = a31 * b11 + a32 * b21 + a33 * b31;
      te[5] = a31 * b12 + a32 * b22 + a33 * b32;
      te[8] = a31 * b13 + a32 * b23 + a33 * b33;
      return this;
    }
    /**
     * Multiplies every component of the matrix by the given scalar.
     *
     * @param {number} s - The scalar.
     * @return {Matrix3} A reference to this matrix.
     */
    multiplyScalar(s) {
      const te = this.elements;
      te[0] *= s;
      te[3] *= s;
      te[6] *= s;
      te[1] *= s;
      te[4] *= s;
      te[7] *= s;
      te[2] *= s;
      te[5] *= s;
      te[8] *= s;
      return this;
    }
    /**
     * Computes and returns the determinant of this matrix.
     *
     * @return {number} The determinant.
     */
    determinant() {
      const te = this.elements;
      const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i2 = te[8];
      return a * e * i2 - a * f * h - b * d * i2 + b * f * g + c * d * h - c * e * g;
    }
    /**
     * Inverts this matrix, using the [analytic method]{@link https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution}.
     * You can not invert with a determinant of zero. If you attempt this, the method produces
     * a zero matrix instead.
     *
     * @return {Matrix3} A reference to this matrix.
     */
    invert() {
      const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
      if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const detInv = 1 / det;
      te[0] = t11 * detInv;
      te[1] = (n31 * n23 - n33 * n21) * detInv;
      te[2] = (n32 * n21 - n31 * n22) * detInv;
      te[3] = t12 * detInv;
      te[4] = (n33 * n11 - n31 * n13) * detInv;
      te[5] = (n31 * n12 - n32 * n11) * detInv;
      te[6] = t13 * detInv;
      te[7] = (n21 * n13 - n23 * n11) * detInv;
      te[8] = (n22 * n11 - n21 * n12) * detInv;
      return this;
    }
    /**
     * Transposes this matrix in place.
     *
     * @return {Matrix3} A reference to this matrix.
     */
    transpose() {
      let tmp;
      const m = this.elements;
      tmp = m[1];
      m[1] = m[3];
      m[3] = tmp;
      tmp = m[2];
      m[2] = m[6];
      m[6] = tmp;
      tmp = m[5];
      m[5] = m[7];
      m[7] = tmp;
      return this;
    }
    /**
     * Computes the normal matrix which is the inverse transpose of the upper
     * left 3x3 portion of the given 4x4 matrix.
     *
     * @param {Matrix4} matrix4 - The 4x4 matrix.
     * @return {Matrix3} A reference to this matrix.
     */
    getNormalMatrix(matrix4) {
      return this.setFromMatrix4(matrix4).invert().transpose();
    }
    /**
     * Transposes this matrix into the supplied array, and returns itself unchanged.
     *
     * @param {Array<number>} r - An array to store the transposed matrix elements.
     * @return {Matrix3} A reference to this matrix.
     */
    transposeIntoArray(r) {
      const m = this.elements;
      r[0] = m[0];
      r[1] = m[3];
      r[2] = m[6];
      r[3] = m[1];
      r[4] = m[4];
      r[5] = m[7];
      r[6] = m[2];
      r[7] = m[5];
      r[8] = m[8];
      return this;
    }
    /**
     * Sets the UV transform matrix from offset, repeat, rotation, and center.
     *
     * @param {number} tx - Offset x.
     * @param {number} ty - Offset y.
     * @param {number} sx - Repeat x.
     * @param {number} sy - Repeat y.
     * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
     * @param {number} cx - Center x of rotation.
     * @param {number} cy - Center y of rotation
     * @return {Matrix3} A reference to this matrix.
     */
    setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
      const c = Math.cos(rotation);
      const s = Math.sin(rotation);
      this.set(
        sx * c,
        sx * s,
        -sx * (c * cx + s * cy) + cx + tx,
        -sy * s,
        sy * c,
        -sy * (-s * cx + c * cy) + cy + ty,
        0,
        0,
        1
      );
      return this;
    }
    /**
     * Scales this matrix with the given scalar values.
     *
     * @param {number} sx - The amount to scale in the X axis.
     * @param {number} sy - The amount to scale in the Y axis.
     * @return {Matrix3} A reference to this matrix.
     */
    scale(sx, sy) {
      this.premultiply(_m3.makeScale(sx, sy));
      return this;
    }
    /**
     * Rotates this matrix by the given angle.
     *
     * @param {number} theta - The rotation in radians.
     * @return {Matrix3} A reference to this matrix.
     */
    rotate(theta) {
      this.premultiply(_m3.makeRotation(-theta));
      return this;
    }
    /**
     * Translates this matrix by the given scalar values.
     *
     * @param {number} tx - The amount to translate in the X axis.
     * @param {number} ty - The amount to translate in the Y axis.
     * @return {Matrix3} A reference to this matrix.
     */
    translate(tx, ty) {
      this.premultiply(_m3.makeTranslation(tx, ty));
      return this;
    }
    // for 2D Transforms
    /**
     * Sets this matrix as a 2D translation transform.
     *
     * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
     * @param {number} y - The amount to translate in the Y axis.
     * @return {Matrix3} A reference to this matrix.
     */
    makeTranslation(x2, y) {
      if (x2.isVector2) {
        this.set(
          1,
          0,
          x2.x,
          0,
          1,
          x2.y,
          0,
          0,
          1
        );
      } else {
        this.set(
          1,
          0,
          x2,
          0,
          1,
          y,
          0,
          0,
          1
        );
      }
      return this;
    }
    /**
     * Sets this matrix as a 2D rotational transformation.
     *
     * @param {number} theta - The rotation in radians.
     * @return {Matrix3} A reference to this matrix.
     */
    makeRotation(theta) {
      const c = Math.cos(theta);
      const s = Math.sin(theta);
      this.set(
        c,
        -s,
        0,
        s,
        c,
        0,
        0,
        0,
        1
      );
      return this;
    }
    /**
     * Sets this matrix as a 2D scale transform.
     *
     * @param {number} x - The amount to scale in the X axis.
     * @param {number} y - The amount to scale in the Y axis.
     * @return {Matrix3} A reference to this matrix.
     */
    makeScale(x2, y) {
      this.set(
        x2,
        0,
        0,
        0,
        y,
        0,
        0,
        0,
        1
      );
      return this;
    }
    /**
     * Returns \`true\` if this matrix is equal with the given one.
     *
     * @param {Matrix3} matrix - The matrix to test for equality.
     * @return {boolean} Whether this matrix is equal with the given one.
     */
    equals(matrix) {
      const te = this.elements;
      const me = matrix.elements;
      for (let i2 = 0; i2 < 9; i2++) {
        if (te[i2] !== me[i2]) return false;
      }
      return true;
    }
    /**
     * Sets the elements of the matrix from the given array.
     *
     * @param {Array<number>} array - The matrix elements in column-major order.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Matrix3} A reference to this matrix.
     */
    fromArray(array, offset = 0) {
      for (let i2 = 0; i2 < 9; i2++) {
        this.elements[i2] = array[i2 + offset];
      }
      return this;
    }
    /**
     * Writes the elements of this matrix to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The matrix elements in column-major order.
     */
    toArray(array = [], offset = 0) {
      const te = this.elements;
      array[offset] = te[0];
      array[offset + 1] = te[1];
      array[offset + 2] = te[2];
      array[offset + 3] = te[3];
      array[offset + 4] = te[4];
      array[offset + 5] = te[5];
      array[offset + 6] = te[6];
      array[offset + 7] = te[7];
      array[offset + 8] = te[8];
      return array;
    }
    /**
     * Returns a matrix with copied values from this instance.
     *
     * @return {Matrix3} A clone of this instance.
     */
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }
  const _m3 = /* @__PURE__ */ new Matrix3();
  const _cache = {};
  function warnOnce(message) {
    if (message in _cache) return;
    _cache[message] = true;
    console.warn(message);
  }
  const LINEAR_REC709_TO_XYZ = /* @__PURE__ */ new Matrix3().set(
    0.4123908,
    0.3575843,
    0.1804808,
    0.212639,
    0.7151687,
    0.0721923,
    0.0193308,
    0.1191948,
    0.9505322
  );
  const XYZ_TO_LINEAR_REC709 = /* @__PURE__ */ new Matrix3().set(
    3.2409699,
    -1.5373832,
    -0.4986108,
    -0.9692436,
    1.8759675,
    0.0415551,
    0.0556301,
    -0.203977,
    1.0569715
  );
  function createColorManagement() {
    const ColorManagement2 = {
      enabled: true,
      workingColorSpace: LinearSRGBColorSpace,
      /**
       * Implementations of supported color spaces.
       *
       * Required:
       *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
       *	- whitePoint: reference white [ x y ]
       *	- transfer: transfer function (pre-defined)
       *	- toXYZ: Matrix3 RGB to XYZ transform
       *	- fromXYZ: Matrix3 XYZ to RGB transform
       *	- luminanceCoefficients: RGB luminance coefficients
       *
       * Optional:
       *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }
       *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
       *
       * Reference:
       * - https://www.russellcottrell.com/photo/matrixCalculator.htm
       */
      spaces: {},
      convert: function(color, sourceColorSpace, targetColorSpace) {
        if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {
          return color;
        }
        if (this.spaces[sourceColorSpace].transfer === SRGBTransfer) {
          color.r = SRGBToLinear(color.r);
          color.g = SRGBToLinear(color.g);
          color.b = SRGBToLinear(color.b);
        }
        if (this.spaces[sourceColorSpace].primaries !== this.spaces[targetColorSpace].primaries) {
          color.applyMatrix3(this.spaces[sourceColorSpace].toXYZ);
          color.applyMatrix3(this.spaces[targetColorSpace].fromXYZ);
        }
        if (this.spaces[targetColorSpace].transfer === SRGBTransfer) {
          color.r = LinearToSRGB(color.r);
          color.g = LinearToSRGB(color.g);
          color.b = LinearToSRGB(color.b);
        }
        return color;
      },
      workingToColorSpace: function(color, targetColorSpace) {
        return this.convert(color, this.workingColorSpace, targetColorSpace);
      },
      colorSpaceToWorking: function(color, sourceColorSpace) {
        return this.convert(color, sourceColorSpace, this.workingColorSpace);
      },
      getPrimaries: function(colorSpace) {
        return this.spaces[colorSpace].primaries;
      },
      getTransfer: function(colorSpace) {
        if (colorSpace === NoColorSpace) return LinearTransfer;
        return this.spaces[colorSpace].transfer;
      },
      getLuminanceCoefficients: function(target, colorSpace = this.workingColorSpace) {
        return target.fromArray(this.spaces[colorSpace].luminanceCoefficients);
      },
      define: function(colorSpaces) {
        Object.assign(this.spaces, colorSpaces);
      },
      // Internal APIs
      _getMatrix: function(targetMatrix, sourceColorSpace, targetColorSpace) {
        return targetMatrix.copy(this.spaces[sourceColorSpace].toXYZ).multiply(this.spaces[targetColorSpace].fromXYZ);
      },
      _getDrawingBufferColorSpace: function(colorSpace) {
        return this.spaces[colorSpace].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function(colorSpace = this.workingColorSpace) {
        return this.spaces[colorSpace].workingColorSpaceConfig.unpackColorSpace;
      },
      // Deprecated
      fromWorkingColorSpace: function(color, targetColorSpace) {
        warnOnce("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().");
        return ColorManagement2.workingToColorSpace(color, targetColorSpace);
      },
      toWorkingColorSpace: function(color, sourceColorSpace) {
        warnOnce("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().");
        return ColorManagement2.colorSpaceToWorking(color, sourceColorSpace);
      }
    };
    const REC709_PRIMARIES = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06];
    const REC709_LUMINANCE_COEFFICIENTS = [0.2126, 0.7152, 0.0722];
    const D65 = [0.3127, 0.329];
    ColorManagement2.define({
      [LinearSRGBColorSpace]: {
        primaries: REC709_PRIMARIES,
        whitePoint: D65,
        transfer: LinearTransfer,
        toXYZ: LINEAR_REC709_TO_XYZ,
        fromXYZ: XYZ_TO_LINEAR_REC709,
        luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
        workingColorSpaceConfig: { unpackColorSpace: SRGBColorSpace },
        outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
      },
      [SRGBColorSpace]: {
        primaries: REC709_PRIMARIES,
        whitePoint: D65,
        transfer: SRGBTransfer,
        toXYZ: LINEAR_REC709_TO_XYZ,
        fromXYZ: XYZ_TO_LINEAR_REC709,
        luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
        outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
      }
    });
    return ColorManagement2;
  }
  const ColorManagement = /* @__PURE__ */ createColorManagement();
  function SRGBToLinear(c) {
    return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
  }
  function LinearToSRGB(c) {
    return c < 31308e-7 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
  }
  class Box3 {
    /**
     * Constructs a new bounding box.
     *
     * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.
     * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
     */
    constructor(min = new Vector3(Infinity, Infinity, Infinity), max2 = new Vector3(-Infinity, -Infinity, -Infinity)) {
      this.isBox3 = true;
      this.min = min;
      this.max = max2;
    }
    /**
     * Sets the lower and upper boundaries of this box.
     * Please note that this method only copies the values from the given objects.
     *
     * @param {Vector3} min - The lower boundary of the box.
     * @param {Vector3} max - The upper boundary of the box.
     * @return {Box3} A reference to this bounding box.
     */
    set(min, max2) {
      this.min.copy(min);
      this.max.copy(max2);
      return this;
    }
    /**
     * Sets the upper and lower bounds of this box so it encloses the position data
     * in the given array.
     *
     * @param {Array<number>} array - An array holding 3D position data.
     * @return {Box3} A reference to this bounding box.
     */
    setFromArray(array) {
      this.makeEmpty();
      for (let i2 = 0, il = array.length; i2 < il; i2 += 3) {
        this.expandByPoint(_vector$b.fromArray(array, i2));
      }
      return this;
    }
    /**
     * Sets the upper and lower bounds of this box so it encloses the position data
     * in the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.
     * @return {Box3} A reference to this bounding box.
     */
    setFromBufferAttribute(attribute) {
      this.makeEmpty();
      for (let i2 = 0, il = attribute.count; i2 < il; i2++) {
        this.expandByPoint(_vector$b.fromBufferAttribute(attribute, i2));
      }
      return this;
    }
    /**
     * Sets the upper and lower bounds of this box so it encloses the position data
     * in the given array.
     *
     * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.
     * @return {Box3} A reference to this bounding box.
     */
    setFromPoints(points) {
      this.makeEmpty();
      for (let i2 = 0, il = points.length; i2 < il; i2++) {
        this.expandByPoint(points[i2]);
      }
      return this;
    }
    /**
     * Centers this box on the given center vector and sets this box's width, height and
     * depth to the given size values.
     *
     * @param {Vector3} center - The center of the box.
     * @param {Vector3} size - The x, y and z dimensions of the box.
     * @return {Box3} A reference to this bounding box.
     */
    setFromCenterAndSize(center, size) {
      const halfSize = _vector$b.copy(size).multiplyScalar(0.5);
      this.min.copy(center).sub(halfSize);
      this.max.copy(center).add(halfSize);
      return this;
    }
    /**
     * Computes the world-axis-aligned bounding box for the given 3D object
     * (including its children), accounting for the object's, and children's,
     * world transforms. The function may result in a larger box than strictly necessary.
     *
     * @param {Object3D} object - The 3D object to compute the bounding box for.
     * @param {boolean} [precise=false] - If set to \`true\`, the method computes the smallest
     * world-axis-aligned bounding box at the expense of more computation.
     * @return {Box3} A reference to this bounding box.
     */
    setFromObject(object, precise = false) {
      this.makeEmpty();
      return this.expandByObject(object, precise);
    }
    /**
     * Returns a new box with copied values from this instance.
     *
     * @return {Box3} A clone of this instance.
     */
    clone() {
      return new this.constructor().copy(this);
    }
    /**
     * Copies the values of the given box to this instance.
     *
     * @param {Box3} box - The box to copy.
     * @return {Box3} A reference to this bounding box.
     */
    copy(box) {
      this.min.copy(box.min);
      this.max.copy(box.max);
      return this;
    }
    /**
     * Makes this box empty which means in encloses a zero space in 3D.
     *
     * @return {Box3} A reference to this bounding box.
     */
    makeEmpty() {
      this.min.x = this.min.y = this.min.z = Infinity;
      this.max.x = this.max.y = this.max.z = -Infinity;
      return this;
    }
    /**
     * Returns true if this box includes zero points within its bounds.
     * Note that a box with equal lower and upper bounds still includes one
     * point, the one both bounds share.
     *
     * @return {boolean} Whether this box is empty or not.
     */
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    /**
     * Returns the center point of this box.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The center point.
     */
    getCenter(target) {
      return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    /**
     * Returns the dimensions of this box.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The size.
     */
    getSize(target) {
      return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
    }
    /**
     * Expands the boundaries of this box to include the given point.
     *
     * @param {Vector3} point - The point that should be included by the bounding box.
     * @return {Box3} A reference to this bounding box.
     */
    expandByPoint(point) {
      this.min.min(point);
      this.max.max(point);
      return this;
    }
    /**
     * Expands this box equilaterally by the given vector. The width of this
     * box will be expanded by the x component of the vector in both
     * directions. The height of this box will be expanded by the y component of
     * the vector in both directions. The depth of this box will be
     * expanded by the z component of the vector in both directions.
     *
     * @param {Vector3} vector - The vector that should expand the bounding box.
     * @return {Box3} A reference to this bounding box.
     */
    expandByVector(vector) {
      this.min.sub(vector);
      this.max.add(vector);
      return this;
    }
    /**
     * Expands each dimension of the box by the given scalar. If negative, the
     * dimensions of the box will be contracted.
     *
     * @param {number} scalar - The scalar value that should expand the bounding box.
     * @return {Box3} A reference to this bounding box.
     */
    expandByScalar(scalar) {
      this.min.addScalar(-scalar);
      this.max.addScalar(scalar);
      return this;
    }
    /**
     * Expands the boundaries of this box to include the given 3D object and
     * its children, accounting for the object's, and children's, world
     * transforms. The function may result in a larger box than strictly
     * necessary (unless the precise parameter is set to true).
     *
     * @param {Object3D} object - The 3D object that should expand the bounding box.
     * @param {boolean} precise - If set to \`true\`, the method expands the bounding box
     * as little as necessary at the expense of more computation.
     * @return {Box3} A reference to this bounding box.
     */
    expandByObject(object, precise = false) {
      object.updateWorldMatrix(false, false);
      const geometry = object.geometry;
      if (geometry !== void 0) {
        const positionAttribute = geometry.getAttribute("position");
        if (precise === true && positionAttribute !== void 0 && object.isInstancedMesh !== true) {
          for (let i2 = 0, l = positionAttribute.count; i2 < l; i2++) {
            if (object.isMesh === true) {
              object.getVertexPosition(i2, _vector$b);
            } else {
              _vector$b.fromBufferAttribute(positionAttribute, i2);
            }
            _vector$b.applyMatrix4(object.matrixWorld);
            this.expandByPoint(_vector$b);
          }
        } else {
          if (object.boundingBox !== void 0) {
            if (object.boundingBox === null) {
              object.computeBoundingBox();
            }
            _box$4.copy(object.boundingBox);
          } else {
            if (geometry.boundingBox === null) {
              geometry.computeBoundingBox();
            }
            _box$4.copy(geometry.boundingBox);
          }
          _box$4.applyMatrix4(object.matrixWorld);
          this.union(_box$4);
        }
      }
      const children = object.children;
      for (let i2 = 0, l = children.length; i2 < l; i2++) {
        this.expandByObject(children[i2], precise);
      }
      return this;
    }
    /**
     * Returns \`true\` if the given point lies within or on the boundaries of this box.
     *
     * @param {Vector3} point - The point to test.
     * @return {boolean} Whether the bounding box contains the given point or not.
     */
    containsPoint(point) {
      return point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y && point.z >= this.min.z && point.z <= this.max.z;
    }
    /**
     * Returns \`true\` if this bounding box includes the entirety of the given bounding box.
     * If this box and the given one are identical, this function also returns \`true\`.
     *
     * @param {Box3} box - The bounding box to test.
     * @return {boolean} Whether the bounding box contains the given bounding box or not.
     */
    containsBox(box) {
      return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
    }
    /**
     * Returns a point as a proportion of this box's width, height and depth.
     *
     * @param {Vector3} point - A point in 3D space.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} A point as a proportion of this box's width, height and depth.
     */
    getParameter(point, target) {
      return target.set(
        (point.x - this.min.x) / (this.max.x - this.min.x),
        (point.y - this.min.y) / (this.max.y - this.min.y),
        (point.z - this.min.z) / (this.max.z - this.min.z)
      );
    }
    /**
     * Returns \`true\` if the given bounding box intersects with this bounding box.
     *
     * @param {Box3} box - The bounding box to test.
     * @return {boolean} Whether the given bounding box intersects with this bounding box.
     */
    intersectsBox(box) {
      return box.max.x >= this.min.x && box.min.x <= this.max.x && box.max.y >= this.min.y && box.min.y <= this.max.y && box.max.z >= this.min.z && box.min.z <= this.max.z;
    }
    /**
     * Returns \`true\` if the given bounding sphere intersects with this bounding box.
     *
     * @param {Sphere} sphere - The bounding sphere to test.
     * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
     */
    intersectsSphere(sphere) {
      this.clampPoint(sphere.center, _vector$b);
      return _vector$b.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
    }
    /**
     * Returns \`true\` if the given plane intersects with this bounding box.
     *
     * @param {Plane} plane - The plane to test.
     * @return {boolean} Whether the given plane intersects with this bounding box.
     */
    intersectsPlane(plane) {
      let min, max2;
      if (plane.normal.x > 0) {
        min = plane.normal.x * this.min.x;
        max2 = plane.normal.x * this.max.x;
      } else {
        min = plane.normal.x * this.max.x;
        max2 = plane.normal.x * this.min.x;
      }
      if (plane.normal.y > 0) {
        min += plane.normal.y * this.min.y;
        max2 += plane.normal.y * this.max.y;
      } else {
        min += plane.normal.y * this.max.y;
        max2 += plane.normal.y * this.min.y;
      }
      if (plane.normal.z > 0) {
        min += plane.normal.z * this.min.z;
        max2 += plane.normal.z * this.max.z;
      } else {
        min += plane.normal.z * this.max.z;
        max2 += plane.normal.z * this.min.z;
      }
      return min <= -plane.constant && max2 >= -plane.constant;
    }
    /**
     * Returns \`true\` if the given triangle intersects with this bounding box.
     *
     * @param {Triangle} triangle - The triangle to test.
     * @return {boolean} Whether the given triangle intersects with this bounding box.
     */
    intersectsTriangle(triangle) {
      if (this.isEmpty()) {
        return false;
      }
      this.getCenter(_center);
      _extents.subVectors(this.max, _center);
      _v0$2.subVectors(triangle.a, _center);
      _v1$7.subVectors(triangle.b, _center);
      _v2$4.subVectors(triangle.c, _center);
      _f0.subVectors(_v1$7, _v0$2);
      _f1.subVectors(_v2$4, _v1$7);
      _f2.subVectors(_v0$2, _v2$4);
      let axes = [
        0,
        -_f0.z,
        _f0.y,
        0,
        -_f1.z,
        _f1.y,
        0,
        -_f2.z,
        _f2.y,
        _f0.z,
        0,
        -_f0.x,
        _f1.z,
        0,
        -_f1.x,
        _f2.z,
        0,
        -_f2.x,
        -_f0.y,
        _f0.x,
        0,
        -_f1.y,
        _f1.x,
        0,
        -_f2.y,
        _f2.x,
        0
      ];
      if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {
        return false;
      }
      axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {
        return false;
      }
      _triangleNormal.crossVectors(_f0, _f1);
      axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
      return satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents);
    }
    /**
     * Clamps the given point within the bounds of this box.
     *
     * @param {Vector3} point - The point to clamp.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The clamped point.
     */
    clampPoint(point, target) {
      return target.copy(point).clamp(this.min, this.max);
    }
    /**
     * Returns the euclidean distance from any edge of this box to the specified point. If
     * the given point lies inside of this box, the distance will be \`0\`.
     *
     * @param {Vector3} point - The point to compute the distance to.
     * @return {number} The euclidean distance.
     */
    distanceToPoint(point) {
      return this.clampPoint(point, _vector$b).distanceTo(point);
    }
    /**
     * Returns a bounding sphere that encloses this bounding box.
     *
     * @param {Sphere} target - The target sphere that is used to store the method's result.
     * @return {Sphere} The bounding sphere that encloses this bounding box.
     */
    getBoundingSphere(target) {
      if (this.isEmpty()) {
        target.makeEmpty();
      } else {
        this.getCenter(target.center);
        target.radius = this.getSize(_vector$b).length() * 0.5;
      }
      return target;
    }
    /**
     * Computes the intersection of this bounding box and the given one, setting the upper
     * bound of this box to the lesser of the two boxes' upper bounds and the
     * lower bound of this box to the greater of the two boxes' lower bounds. If
     * there's no overlap, makes this box empty.
     *
     * @param {Box3} box - The bounding box to intersect with.
     * @return {Box3} A reference to this bounding box.
     */
    intersect(box) {
      this.min.max(box.min);
      this.max.min(box.max);
      if (this.isEmpty()) this.makeEmpty();
      return this;
    }
    /**
     * Computes the union of this box and another and the given one, setting the upper
     * bound of this box to the greater of the two boxes' upper bounds and the
     * lower bound of this box to the lesser of the two boxes' lower bounds.
     *
     * @param {Box3} box - The bounding box that will be unioned with this instance.
     * @return {Box3} A reference to this bounding box.
     */
    union(box) {
      this.min.min(box.min);
      this.max.max(box.max);
      return this;
    }
    /**
     * Transforms this bounding box by the given 4x4 transformation matrix.
     *
     * @param {Matrix4} matrix - The transformation matrix.
     * @return {Box3} A reference to this bounding box.
     */
    applyMatrix4(matrix) {
      if (this.isEmpty()) return this;
      _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);
      _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);
      _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);
      _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);
      _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);
      _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);
      _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);
      _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);
      this.setFromPoints(_points);
      return this;
    }
    /**
     * Adds the given offset to both the upper and lower bounds of this bounding box,
     * effectively moving it in 3D space.
     *
     * @param {Vector3} offset - The offset that should be used to translate the bounding box.
     * @return {Box3} A reference to this bounding box.
     */
    translate(offset) {
      this.min.add(offset);
      this.max.add(offset);
      return this;
    }
    /**
     * Returns \`true\` if this bounding box is equal with the given one.
     *
     * @param {Box3} box - The box to test for equality.
     * @return {boolean} Whether this bounding box is equal with the given one.
     */
    equals(box) {
      return box.min.equals(this.min) && box.max.equals(this.max);
    }
    /**
     * Returns a serialized structure of the bounding box.
     *
     * @return {Object} Serialized structure with fields representing the object state.
     */
    toJSON() {
      return {
        min: this.min.toArray(),
        max: this.max.toArray()
      };
    }
    /**
     * Returns a serialized structure of the bounding box.
     *
     * @param {Object} json - The serialized json to set the box from.
     * @return {Box3} A reference to this bounding box.
     */
    fromJSON(json) {
      this.min.fromArray(json.min);
      this.max.fromArray(json.max);
      return this;
    }
  }
  const _points = [
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3()
  ];
  const _vector$b = /* @__PURE__ */ new Vector3();
  const _box$4 = /* @__PURE__ */ new Box3();
  const _v0$2 = /* @__PURE__ */ new Vector3();
  const _v1$7 = /* @__PURE__ */ new Vector3();
  const _v2$4 = /* @__PURE__ */ new Vector3();
  const _f0 = /* @__PURE__ */ new Vector3();
  const _f1 = /* @__PURE__ */ new Vector3();
  const _f2 = /* @__PURE__ */ new Vector3();
  const _center = /* @__PURE__ */ new Vector3();
  const _extents = /* @__PURE__ */ new Vector3();
  const _triangleNormal = /* @__PURE__ */ new Vector3();
  const _testAxis = /* @__PURE__ */ new Vector3();
  function satForAxes(axes, v0, v1, v2, extents) {
    for (let i2 = 0, j = axes.length - 3; i2 <= j; i2 += 3) {
      _testAxis.fromArray(axes, i2);
      const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);
      const p0 = v0.dot(_testAxis);
      const p1 = v1.dot(_testAxis);
      const p2 = v2.dot(_testAxis);
      if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
        return false;
      }
    }
    return true;
  }
  const _colorKeywords = {
    "aliceblue": 15792383,
    "antiquewhite": 16444375,
    "aqua": 65535,
    "aquamarine": 8388564,
    "azure": 15794175,
    "beige": 16119260,
    "bisque": 16770244,
    "black": 0,
    "blanchedalmond": 16772045,
    "blue": 255,
    "blueviolet": 9055202,
    "brown": 10824234,
    "burlywood": 14596231,
    "cadetblue": 6266528,
    "chartreuse": 8388352,
    "chocolate": 13789470,
    "coral": 16744272,
    "cornflowerblue": 6591981,
    "cornsilk": 16775388,
    "crimson": 14423100,
    "cyan": 65535,
    "darkblue": 139,
    "darkcyan": 35723,
    "darkgoldenrod": 12092939,
    "darkgray": 11119017,
    "darkgreen": 25600,
    "darkgrey": 11119017,
    "darkkhaki": 12433259,
    "darkmagenta": 9109643,
    "darkolivegreen": 5597999,
    "darkorange": 16747520,
    "darkorchid": 10040012,
    "darkred": 9109504,
    "darksalmon": 15308410,
    "darkseagreen": 9419919,
    "darkslateblue": 4734347,
    "darkslategray": 3100495,
    "darkslategrey": 3100495,
    "darkturquoise": 52945,
    "darkviolet": 9699539,
    "deeppink": 16716947,
    "deepskyblue": 49151,
    "dimgray": 6908265,
    "dimgrey": 6908265,
    "dodgerblue": 2003199,
    "firebrick": 11674146,
    "floralwhite": 16775920,
    "forestgreen": 2263842,
    "fuchsia": 16711935,
    "gainsboro": 14474460,
    "ghostwhite": 16316671,
    "gold": 16766720,
    "goldenrod": 14329120,
    "gray": 8421504,
    "green": 32768,
    "greenyellow": 11403055,
    "grey": 8421504,
    "honeydew": 15794160,
    "hotpink": 16738740,
    "indianred": 13458524,
    "indigo": 4915330,
    "ivory": 16777200,
    "khaki": 15787660,
    "lavender": 15132410,
    "lavenderblush": 16773365,
    "lawngreen": 8190976,
    "lemonchiffon": 16775885,
    "lightblue": 11393254,
    "lightcoral": 15761536,
    "lightcyan": 14745599,
    "lightgoldenrodyellow": 16448210,
    "lightgray": 13882323,
    "lightgreen": 9498256,
    "lightgrey": 13882323,
    "lightpink": 16758465,
    "lightsalmon": 16752762,
    "lightseagreen": 2142890,
    "lightskyblue": 8900346,
    "lightslategray": 7833753,
    "lightslategrey": 7833753,
    "lightsteelblue": 11584734,
    "lightyellow": 16777184,
    "lime": 65280,
    "limegreen": 3329330,
    "linen": 16445670,
    "magenta": 16711935,
    "maroon": 8388608,
    "mediumaquamarine": 6737322,
    "mediumblue": 205,
    "mediumorchid": 12211667,
    "mediumpurple": 9662683,
    "mediumseagreen": 3978097,
    "mediumslateblue": 8087790,
    "mediumspringgreen": 64154,
    "mediumturquoise": 4772300,
    "mediumvioletred": 13047173,
    "midnightblue": 1644912,
    "mintcream": 16121850,
    "mistyrose": 16770273,
    "moccasin": 16770229,
    "navajowhite": 16768685,
    "navy": 128,
    "oldlace": 16643558,
    "olive": 8421376,
    "olivedrab": 7048739,
    "orange": 16753920,
    "orangered": 16729344,
    "orchid": 14315734,
    "palegoldenrod": 15657130,
    "palegreen": 10025880,
    "paleturquoise": 11529966,
    "palevioletred": 14381203,
    "papayawhip": 16773077,
    "peachpuff": 16767673,
    "peru": 13468991,
    "pink": 16761035,
    "plum": 14524637,
    "powderblue": 11591910,
    "purple": 8388736,
    "rebeccapurple": 6697881,
    "red": 16711680,
    "rosybrown": 12357519,
    "royalblue": 4286945,
    "saddlebrown": 9127187,
    "salmon": 16416882,
    "sandybrown": 16032864,
    "seagreen": 3050327,
    "seashell": 16774638,
    "sienna": 10506797,
    "silver": 12632256,
    "skyblue": 8900331,
    "slateblue": 6970061,
    "slategray": 7372944,
    "slategrey": 7372944,
    "snow": 16775930,
    "springgreen": 65407,
    "steelblue": 4620980,
    "tan": 13808780,
    "teal": 32896,
    "thistle": 14204888,
    "tomato": 16737095,
    "turquoise": 4251856,
    "violet": 15631086,
    "wheat": 16113331,
    "white": 16777215,
    "whitesmoke": 16119285,
    "yellow": 16776960,
    "yellowgreen": 10145074
  };
  const _hslA = { h: 0, s: 0, l: 0 };
  const _hslB = { h: 0, s: 0, l: 0 };
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
    return p;
  }
  class Color {
    /**
     * Constructs a new color.
     *
     * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
     * and that method is used throughout the rest of the documentation.
     *
     * @param {(number|string|Color)} [r] - The red component of the color. If \`g\` and \`b\` are
     * not provided, it can be hexadecimal triplet, a CSS-style string or another \`Color\` instance.
     * @param {number} [g] - The green component.
     * @param {number} [b] - The blue component.
     */
    constructor(r, g, b) {
      this.isColor = true;
      this.r = 1;
      this.g = 1;
      this.b = 1;
      return this.set(r, g, b);
    }
    /**
     * Sets the colors's components from the given values.
     *
     * @param {(number|string|Color)} [r] - The red component of the color. If \`g\` and \`b\` are
     * not provided, it can be hexadecimal triplet, a CSS-style string or another \`Color\` instance.
     * @param {number} [g] - The green component.
     * @param {number} [b] - The blue component.
     * @return {Color} A reference to this color.
     */
    set(r, g, b) {
      if (g === void 0 && b === void 0) {
        const value = r;
        if (value && value.isColor) {
          this.copy(value);
        } else if (typeof value === "number") {
          this.setHex(value);
        } else if (typeof value === "string") {
          this.setStyle(value);
        }
      } else {
        this.setRGB(r, g, b);
      }
      return this;
    }
    /**
     * Sets the colors's components to the given scalar value.
     *
     * @param {number} scalar - The scalar value.
     * @return {Color} A reference to this color.
     */
    setScalar(scalar) {
      this.r = scalar;
      this.g = scalar;
      this.b = scalar;
      return this;
    }
    /**
     * Sets this color from a hexadecimal value.
     *
     * @param {number} hex - The hexadecimal value.
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setHex(hex, colorSpace = SRGBColorSpace) {
      hex = Math.floor(hex);
      this.r = (hex >> 16 & 255) / 255;
      this.g = (hex >> 8 & 255) / 255;
      this.b = (hex & 255) / 255;
      ColorManagement.colorSpaceToWorking(this, colorSpace);
      return this;
    }
    /**
     * Sets this color from RGB values.
     *
     * @param {number} r - Red channel value between \`0.0\` and \`1.0\`.
     * @param {number} g - Green channel value between \`0.0\` and \`1.0\`.
     * @param {number} b - Blue channel value between \`0.0\` and \`1.0\`.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setRGB(r, g, b, colorSpace = ColorManagement.workingColorSpace) {
      this.r = r;
      this.g = g;
      this.b = b;
      ColorManagement.colorSpaceToWorking(this, colorSpace);
      return this;
    }
    /**
     * Sets this color from RGB values.
     *
     * @param {number} h - Hue value between \`0.0\` and \`1.0\`.
     * @param {number} s - Saturation value between \`0.0\` and \`1.0\`.
     * @param {number} l - Lightness value between \`0.0\` and \`1.0\`.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setHSL(h, s, l, colorSpace = ColorManagement.workingColorSpace) {
      h = euclideanModulo(h, 1);
      s = clamp(s, 0, 1);
      l = clamp(l, 0, 1);
      if (s === 0) {
        this.r = this.g = this.b = l;
      } else {
        const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
        const q = 2 * l - p;
        this.r = hue2rgb(q, p, h + 1 / 3);
        this.g = hue2rgb(q, p, h);
        this.b = hue2rgb(q, p, h - 1 / 3);
      }
      ColorManagement.colorSpaceToWorking(this, colorSpace);
      return this;
    }
    /**
     * Sets this color from a CSS-style string. For example, \`rgb(250, 0,0)\`,
     * \`rgb(100%, 0%, 0%)\`, \`hsl(0, 100%, 50%)\`, \`#ff0000\`, \`#f00\`, or \`red\` ( or
     * any [X11 color name]{@link https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart} -
     * all 140 color names are supported).
     *
     * @param {string} style - Color as a CSS-style string.
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setStyle(style, colorSpace = SRGBColorSpace) {
      function handleAlpha(string) {
        if (string === void 0) return;
        if (parseFloat(string) < 1) {
          console.warn("THREE.Color: Alpha component of " + style + " will be ignored.");
        }
      }
      let m;
      if (m = /^(\\w+)\\(([^\\)]*)\\)/.exec(style)) {
        let color;
        const name = m[1];
        const components = m[2];
        switch (name) {
          case "rgb":
          case "rgba":
            if (color = /^\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {
              handleAlpha(color[4]);
              return this.setRGB(
                Math.min(255, parseInt(color[1], 10)) / 255,
                Math.min(255, parseInt(color[2], 10)) / 255,
                Math.min(255, parseInt(color[3], 10)) / 255,
                colorSpace
              );
            }
            if (color = /^\\s*(\\d+)\\%\\s*,\\s*(\\d+)\\%\\s*,\\s*(\\d+)\\%\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {
              handleAlpha(color[4]);
              return this.setRGB(
                Math.min(100, parseInt(color[1], 10)) / 100,
                Math.min(100, parseInt(color[2], 10)) / 100,
                Math.min(100, parseInt(color[3], 10)) / 100,
                colorSpace
              );
            }
            break;
          case "hsl":
          case "hsla":
            if (color = /^\\s*(\\d*\\.?\\d+)\\s*,\\s*(\\d*\\.?\\d+)\\%\\s*,\\s*(\\d*\\.?\\d+)\\%\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {
              handleAlpha(color[4]);
              return this.setHSL(
                parseFloat(color[1]) / 360,
                parseFloat(color[2]) / 100,
                parseFloat(color[3]) / 100,
                colorSpace
              );
            }
            break;
          default:
            console.warn("THREE.Color: Unknown color model " + style);
        }
      } else if (m = /^\\#([A-Fa-f\\d]+)$/.exec(style)) {
        const hex = m[1];
        const size = hex.length;
        if (size === 3) {
          return this.setRGB(
            parseInt(hex.charAt(0), 16) / 15,
            parseInt(hex.charAt(1), 16) / 15,
            parseInt(hex.charAt(2), 16) / 15,
            colorSpace
          );
        } else if (size === 6) {
          return this.setHex(parseInt(hex, 16), colorSpace);
        } else {
          console.warn("THREE.Color: Invalid hex color " + style);
        }
      } else if (style && style.length > 0) {
        return this.setColorName(style, colorSpace);
      }
      return this;
    }
    /**
     * Sets this color from a color name. Faster than {@link Color#setStyle} if
     * you don't need the other CSS-style formats.
     *
     * For convenience, the list of names is exposed in \`Color.NAMES\` as a hash.
     * \`\`\`js
     * Color.NAMES.aliceblue // returns 0xF0F8FF
     * \`\`\`
     *
     * @param {string} style - The color name.
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setColorName(style, colorSpace = SRGBColorSpace) {
      const hex = _colorKeywords[style.toLowerCase()];
      if (hex !== void 0) {
        this.setHex(hex, colorSpace);
      } else {
        console.warn("THREE.Color: Unknown color " + style);
      }
      return this;
    }
    /**
     * Returns a new color with copied values from this instance.
     *
     * @return {Color} A clone of this instance.
     */
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    /**
     * Copies the values of the given color to this instance.
     *
     * @param {Color} color - The color to copy.
     * @return {Color} A reference to this color.
     */
    copy(color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      return this;
    }
    /**
     * Copies the given color into this color, and then converts this color from
     * \`SRGBColorSpace\` to \`LinearSRGBColorSpace\`.
     *
     * @param {Color} color - The color to copy/convert.
     * @return {Color} A reference to this color.
     */
    copySRGBToLinear(color) {
      this.r = SRGBToLinear(color.r);
      this.g = SRGBToLinear(color.g);
      this.b = SRGBToLinear(color.b);
      return this;
    }
    /**
     * Copies the given color into this color, and then converts this color from
     * \`LinearSRGBColorSpace\` to \`SRGBColorSpace\`.
     *
     * @param {Color} color - The color to copy/convert.
     * @return {Color} A reference to this color.
     */
    copyLinearToSRGB(color) {
      this.r = LinearToSRGB(color.r);
      this.g = LinearToSRGB(color.g);
      this.b = LinearToSRGB(color.b);
      return this;
    }
    /**
     * Converts this color from \`SRGBColorSpace\` to \`LinearSRGBColorSpace\`.
     *
     * @return {Color} A reference to this color.
     */
    convertSRGBToLinear() {
      this.copySRGBToLinear(this);
      return this;
    }
    /**
     * Converts this color from \`LinearSRGBColorSpace\` to \`SRGBColorSpace\`.
     *
     * @return {Color} A reference to this color.
     */
    convertLinearToSRGB() {
      this.copyLinearToSRGB(this);
      return this;
    }
    /**
     * Returns the hexadecimal value of this color.
     *
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {number} The hexadecimal value.
     */
    getHex(colorSpace = SRGBColorSpace) {
      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
      return Math.round(clamp(_color.r * 255, 0, 255)) * 65536 + Math.round(clamp(_color.g * 255, 0, 255)) * 256 + Math.round(clamp(_color.b * 255, 0, 255));
    }
    /**
     * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
     *
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {string} The hexadecimal value as a string.
     */
    getHexString(colorSpace = SRGBColorSpace) {
      return ("000000" + this.getHex(colorSpace).toString(16)).slice(-6);
    }
    /**
     * Converts the colors RGB values into the HSL format and stores them into the
     * given target object.
     *
     * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {{h:number,s:number,l:number}} The HSL representation of this color.
     */
    getHSL(target, colorSpace = ColorManagement.workingColorSpace) {
      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
      const r = _color.r, g = _color.g, b = _color.b;
      const max2 = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let hue, saturation;
      const lightness = (min + max2) / 2;
      if (min === max2) {
        hue = 0;
        saturation = 0;
      } else {
        const delta = max2 - min;
        saturation = lightness <= 0.5 ? delta / (max2 + min) : delta / (2 - max2 - min);
        switch (max2) {
          case r:
            hue = (g - b) / delta + (g < b ? 6 : 0);
            break;
          case g:
            hue = (b - r) / delta + 2;
            break;
          case b:
            hue = (r - g) / delta + 4;
            break;
        }
        hue /= 6;
      }
      target.h = hue;
      target.s = saturation;
      target.l = lightness;
      return target;
    }
    /**
     * Returns the RGB values of this color and stores them into the given target object.
     *
     * @param {Color} target - The target color that is used to store the method's result.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {Color} The RGB representation of this color.
     */
    getRGB(target, colorSpace = ColorManagement.workingColorSpace) {
      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
      target.r = _color.r;
      target.g = _color.g;
      target.b = _color.b;
      return target;
    }
    /**
     * Returns the value of this color as a CSS style string. Example: \`rgb(255,0,0)\`.
     *
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {string} The CSS representation of this color.
     */
    getStyle(colorSpace = SRGBColorSpace) {
      ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
      const r = _color.r, g = _color.g, b = _color.b;
      if (colorSpace !== SRGBColorSpace) {
        return \`color(\${colorSpace} \${r.toFixed(3)} \${g.toFixed(3)} \${b.toFixed(3)})\`;
      }
      return \`rgb(\${Math.round(r * 255)},\${Math.round(g * 255)},\${Math.round(b * 255)})\`;
    }
    /**
     * Adds the given HSL values to this color's values.
     * Internally, this converts the color's RGB values to HSL, adds HSL
     * and then converts the color back to RGB.
     *
     * @param {number} h - Hue value between \`0.0\` and \`1.0\`.
     * @param {number} s - Saturation value between \`0.0\` and \`1.0\`.
     * @param {number} l - Lightness value between \`0.0\` and \`1.0\`.
     * @return {Color} A reference to this color.
     */
    offsetHSL(h, s, l) {
      this.getHSL(_hslA);
      return this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);
    }
    /**
     * Adds the RGB values of the given color to the RGB values of this color.
     *
     * @param {Color} color - The color to add.
     * @return {Color} A reference to this color.
     */
    add(color) {
      this.r += color.r;
      this.g += color.g;
      this.b += color.b;
      return this;
    }
    /**
     * Adds the RGB values of the given colors and stores the result in this instance.
     *
     * @param {Color} color1 - The first color.
     * @param {Color} color2 - The second color.
     * @return {Color} A reference to this color.
     */
    addColors(color1, color2) {
      this.r = color1.r + color2.r;
      this.g = color1.g + color2.g;
      this.b = color1.b + color2.b;
      return this;
    }
    /**
     * Adds the given scalar value to the RGB values of this color.
     *
     * @param {number} s - The scalar to add.
     * @return {Color} A reference to this color.
     */
    addScalar(s) {
      this.r += s;
      this.g += s;
      this.b += s;
      return this;
    }
    /**
     * Subtracts the RGB values of the given color from the RGB values of this color.
     *
     * @param {Color} color - The color to subtract.
     * @return {Color} A reference to this color.
     */
    sub(color) {
      this.r = Math.max(0, this.r - color.r);
      this.g = Math.max(0, this.g - color.g);
      this.b = Math.max(0, this.b - color.b);
      return this;
    }
    /**
     * Multiplies the RGB values of the given color with the RGB values of this color.
     *
     * @param {Color} color - The color to multiply.
     * @return {Color} A reference to this color.
     */
    multiply(color) {
      this.r *= color.r;
      this.g *= color.g;
      this.b *= color.b;
      return this;
    }
    /**
     * Multiplies the given scalar value with the RGB values of this color.
     *
     * @param {number} s - The scalar to multiply.
     * @return {Color} A reference to this color.
     */
    multiplyScalar(s) {
      this.r *= s;
      this.g *= s;
      this.b *= s;
      return this;
    }
    /**
     * Linearly interpolates this color's RGB values toward the RGB values of the
     * given color. The alpha argument can be thought of as the ratio between
     * the two colors, where \`0.0\` is this color and \`1.0\` is the first argument.
     *
     * @param {Color} color - The color to converge on.
     * @param {number} alpha - The interpolation factor in the closed interval \`[0,1]\`.
     * @return {Color} A reference to this color.
     */
    lerp(color, alpha) {
      this.r += (color.r - this.r) * alpha;
      this.g += (color.g - this.g) * alpha;
      this.b += (color.b - this.b) * alpha;
      return this;
    }
    /**
     * Linearly interpolates between the given colors and stores the result in this instance.
     * The alpha argument can be thought of as the ratio between the two colors, where \`0.0\`
     * is the first and \`1.0\` is the second color.
     *
     * @param {Color} color1 - The first color.
     * @param {Color} color2 - The second color.
     * @param {number} alpha - The interpolation factor in the closed interval \`[0,1]\`.
     * @return {Color} A reference to this color.
     */
    lerpColors(color1, color2, alpha) {
      this.r = color1.r + (color2.r - color1.r) * alpha;
      this.g = color1.g + (color2.g - color1.g) * alpha;
      this.b = color1.b + (color2.b - color1.b) * alpha;
      return this;
    }
    /**
     * Linearly interpolates this color's HSL values toward the HSL values of the
     * given color. It differs from {@link Color#lerp} by not interpolating straight
     * from one color to the other, but instead going through all the hues in between
     * those two colors. The alpha argument can be thought of as the ratio between
     * the two colors, where 0.0 is this color and 1.0 is the first argument.
     *
     * @param {Color} color - The color to converge on.
     * @param {number} alpha - The interpolation factor in the closed interval \`[0,1]\`.
     * @return {Color} A reference to this color.
     */
    lerpHSL(color, alpha) {
      this.getHSL(_hslA);
      color.getHSL(_hslB);
      const h = lerp(_hslA.h, _hslB.h, alpha);
      const s = lerp(_hslA.s, _hslB.s, alpha);
      const l = lerp(_hslA.l, _hslB.l, alpha);
      this.setHSL(h, s, l);
      return this;
    }
    /**
     * Sets the color's RGB components from the given 3D vector.
     *
     * @param {Vector3} v - The vector to set.
     * @return {Color} A reference to this color.
     */
    setFromVector3(v) {
      this.r = v.x;
      this.g = v.y;
      this.b = v.z;
      return this;
    }
    /**
     * Transforms this color with the given 3x3 matrix.
     *
     * @param {Matrix3} m - The matrix.
     * @return {Color} A reference to this color.
     */
    applyMatrix3(m) {
      const r = this.r, g = this.g, b = this.b;
      const e = m.elements;
      this.r = e[0] * r + e[3] * g + e[6] * b;
      this.g = e[1] * r + e[4] * g + e[7] * b;
      this.b = e[2] * r + e[5] * g + e[8] * b;
      return this;
    }
    /**
     * Returns \`true\` if this color is equal with the given one.
     *
     * @param {Color} c - The color to test for equality.
     * @return {boolean} Whether this bounding color is equal with the given one.
     */
    equals(c) {
      return c.r === this.r && c.g === this.g && c.b === this.b;
    }
    /**
     * Sets this color's RGB components from the given array.
     *
     * @param {Array<number>} array - An array holding the RGB values.
     * @param {number} [offset=0] - The offset into the array.
     * @return {Color} A reference to this color.
     */
    fromArray(array, offset = 0) {
      this.r = array[offset];
      this.g = array[offset + 1];
      this.b = array[offset + 2];
      return this;
    }
    /**
     * Writes the RGB components of this color to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the color components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The color components.
     */
    toArray(array = [], offset = 0) {
      array[offset] = this.r;
      array[offset + 1] = this.g;
      array[offset + 2] = this.b;
      return array;
    }
    /**
     * Sets the components of this color from the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute holding color data.
     * @param {number} index - The index into the attribute.
     * @return {Color} A reference to this color.
     */
    fromBufferAttribute(attribute, index) {
      this.r = attribute.getX(index);
      this.g = attribute.getY(index);
      this.b = attribute.getZ(index);
      return this;
    }
    /**
     * This methods defines the serialization result of this class. Returns the color
     * as a hexadecimal value.
     *
     * @return {number} The hexadecimal value.
     */
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      yield this.r;
      yield this.g;
      yield this.b;
    }
  }
  const _color = /* @__PURE__ */ new Color();
  Color.NAMES = _colorKeywords;
  if (typeof __THREE_DEVTOOLS__ !== "undefined") {
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
      revision: REVISION
    } }));
  }
  if (typeof window !== "undefined") {
    if (window.__THREE__) {
      console.warn("WARNING: Multiple instances of Three.js being imported.");
    } else {
      window.__THREE__ = REVISION;
    }
  }
  const LN_SCALE_MIN = -12;
  const LN_SCALE_MAX = 9;
  const LN_SCALE_ZERO = -30;
  const SCALE_ZERO = Math.exp(LN_SCALE_ZERO);
  const SPLAT_TEX_WIDTH_BITS = 11;
  const SPLAT_TEX_HEIGHT_BITS = 11;
  const SPLAT_TEX_WIDTH = 1 << SPLAT_TEX_WIDTH_BITS;
  const SPLAT_TEX_HEIGHT = 1 << SPLAT_TEX_HEIGHT_BITS;
  const SPLAT_TEX_MIN_HEIGHT = 1;
  function unindentLines(s) {
    var _a2;
    let seenNonEmpty = false;
    const lines = s.split("\\n").map((line) => {
      const trimmedLine = line.trimEnd();
      if (seenNonEmpty) {
        return trimmedLine;
      }
      if (trimmedLine.length > 0) {
        seenNonEmpty = true;
        return trimmedLine;
      }
      return null;
    }).filter((line) => line != null);
    while (lines.length > 0 && lines[lines.length - 1].length === 0) {
      lines.pop();
    }
    if (lines.length === 0) {
      return [];
    }
    const indent = (_a2 = lines[0].match(/^\\s*/)) == null ? void 0 : _a2[0];
    if (!indent) {
      return lines;
    }
    const regex = new RegExp(\`^\${indent}\`);
    return lines.map((line) => line.replace(regex, ""));
  }
  function unindent(s) {
    return unindentLines(s).join("\\n");
  }
  const f32buffer = new Float32Array(1);
  const u32buffer = new Uint32Array(f32buffer.buffer);
  const supportsFloat16Array = "Float16Array" in globalThis;
  const f16buffer = supportsFloat16Array ? new globalThis["Float16Array"](1) : null;
  const u16buffer = new Uint16Array(f16buffer == null ? void 0 : f16buffer.buffer);
  function normalize(vec) {
    const norm = Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0));
    return vec.map((v) => v / norm);
  }
  const toHalf = supportsFloat16Array ? toHalfNative : toHalfJS;
  const fromHalf = supportsFloat16Array ? fromHalfNative : fromHalfJS;
  function toHalfNative(f) {
    f16buffer[0] = f;
    return u16buffer[0];
  }
  function toHalfJS(f) {
    f32buffer[0] = f;
    const bits2 = u32buffer[0];
    const sign = bits2 >> 31 & 1;
    const exp = bits2 >> 23 & 255;
    const frac = bits2 & 8388607;
    const halfSign = sign << 15;
    if (exp === 255) {
      if (frac !== 0) {
        return halfSign | 32767;
      }
      return halfSign | 31744;
    }
    const newExp = exp - 127 + 15;
    if (newExp >= 31) {
      return halfSign | 31744;
    }
    if (newExp <= 0) {
      if (newExp < -10) {
        return halfSign;
      }
      const subFrac = (frac | 8388608) >> 1 - newExp + 13;
      return halfSign | subFrac;
    }
    const halfFrac = frac >> 13;
    return halfSign | newExp << 10 | halfFrac;
  }
  function fromHalfNative(u) {
    u16buffer[0] = u;
    return f16buffer[0];
  }
  function fromHalfJS(h) {
    const sign = h >> 15 & 1;
    const exp = h >> 10 & 31;
    const frac = h & 1023;
    let f32bits;
    if (exp === 0) {
      if (frac === 0) {
        f32bits = sign << 31;
      } else {
        let mant = frac;
        let e = -14;
        while ((mant & 1024) === 0) {
          mant <<= 1;
          e--;
        }
        mant &= 1023;
        const newExp = e + 127;
        const newFrac = mant << 13;
        f32bits = sign << 31 | newExp << 23 | newFrac;
      }
    } else if (exp === 31) {
      if (frac === 0) {
        f32bits = sign << 31 | 2139095040;
      } else {
        f32bits = sign << 31 | 2143289344;
      }
    } else {
      const newExp = exp - 15 + 127;
      const newFrac = frac << 13;
      f32bits = sign << 31 | newExp << 23 | newFrac;
    }
    u32buffer[0] = f32bits;
    return f32buffer[0];
  }
  function floatToUint8(v) {
    return Math.max(0, Math.min(255, Math.round(v * 255)));
  }
  function getArrayBuffers(ctx) {
    const buffers = [];
    const seen = /* @__PURE__ */ new Set();
    function traverse(obj) {
      if (obj && typeof obj === "object" && !seen.has(obj)) {
        seen.add(obj);
        if (obj instanceof ArrayBuffer) {
          buffers.push(obj);
        } else if (ArrayBuffer.isView(obj)) {
          buffers.push(obj.buffer);
        } else if (Array.isArray(obj)) {
          obj.forEach(traverse);
        } else {
          Object.values(obj).forEach(traverse);
        }
      }
    }
    traverse(ctx);
    return buffers;
  }
  function setPackedSplat(packedSplats, index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b, encoding) {
    const rgbMin = (encoding == null ? void 0 : encoding.rgbMin) ?? 0;
    const rgbMax = (encoding == null ? void 0 : encoding.rgbMax) ?? 1;
    const rgbRange = rgbMax - rgbMin;
    const uR = floatToUint8((r - rgbMin) / rgbRange);
    const uG = floatToUint8((g - rgbMin) / rgbRange);
    const uB = floatToUint8((b - rgbMin) / rgbRange);
    const uA = floatToUint8(opacity);
    const uQuat = encodeQuatOctXy88R8(
      tempQuaternion.set(quatX, quatY, quatZ, quatW)
    );
    const uQuatX = uQuat & 255;
    const uQuatY = uQuat >>> 8 & 255;
    const uQuatZ = uQuat >>> 16 & 255;
    const lnScaleMin = (encoding == null ? void 0 : encoding.lnScaleMin) ?? LN_SCALE_MIN;
    const lnScaleMax = (encoding == null ? void 0 : encoding.lnScaleMax) ?? LN_SCALE_MAX;
    const lnScaleScale = 254 / (lnScaleMax - lnScaleMin);
    const uScaleX = scaleX < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleX) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const uScaleY = scaleY < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleY) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const uScaleZ = scaleZ < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleZ) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const uCenterX = toHalf(x2);
    const uCenterY = toHalf(y);
    const uCenterZ = toHalf(z);
    const i4 = index * 4;
    packedSplats[i4] = uR | uG << 8 | uB << 16 | uA << 24;
    packedSplats[i4 + 1] = uCenterX | uCenterY << 16;
    packedSplats[i4 + 2] = uCenterZ | uQuatX << 16 | uQuatY << 24;
    packedSplats[i4 + 3] = uScaleX | uScaleY << 8 | uScaleZ << 16 | uQuatZ << 24;
  }
  function setPackedSplatCenter(packedSplats, index, x2, y, z) {
    const uCenterX = toHalf(x2);
    const uCenterY = toHalf(y);
    const uCenterZ = toHalf(z);
    const i4 = index * 4;
    packedSplats[i4 + 1] = uCenterX | uCenterY << 16;
    packedSplats[i4 + 2] = uCenterZ | packedSplats[i4 + 2] & 4294901760;
  }
  function setPackedSplatScales(packedSplats, index, scaleX, scaleY, scaleZ, encoding) {
    const lnScaleMin = (encoding == null ? void 0 : encoding.lnScaleMin) ?? LN_SCALE_MIN;
    const lnScaleMax = (encoding == null ? void 0 : encoding.lnScaleMax) ?? LN_SCALE_MAX;
    const lnScaleScale = 254 / (lnScaleMax - lnScaleMin);
    const uScaleX = scaleX < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleX) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const uScaleY = scaleY < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleY) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const uScaleZ = scaleZ < SCALE_ZERO ? 0 : Math.min(
      255,
      Math.max(
        1,
        Math.round((Math.log(scaleZ) - lnScaleMin) * lnScaleScale) + 1
      )
    );
    const i4 = index * 4;
    packedSplats[i4 + 3] = uScaleX | uScaleY << 8 | uScaleZ << 16 | packedSplats[i4 + 3] & 4278190080;
  }
  const tempQuaternion = new Quaternion();
  function setPackedSplatQuat(packedSplats, index, quatX, quatY, quatZ, quatW) {
    const uQuat = encodeQuatOctXy88R8(
      tempQuaternion.set(quatX, quatY, quatZ, quatW)
    );
    const uQuatX = uQuat & 255;
    const uQuatY = uQuat >>> 8 & 255;
    const uQuatZ = uQuat >>> 16 & 255;
    const i4 = index * 4;
    packedSplats[i4 + 2] = packedSplats[i4 + 2] & 65535 | uQuatX << 16 | uQuatY << 24;
    packedSplats[i4 + 3] = packedSplats[i4 + 3] & 16777215 | uQuatZ << 24;
  }
  function setPackedSplatRgba(packedSplats, index, r, g, b, a, encoding) {
    const rgbMin = (encoding == null ? void 0 : encoding.rgbMin) ?? 0;
    const rgbMax = (encoding == null ? void 0 : encoding.rgbMax) ?? 1;
    const rgbRange = rgbMax - rgbMin;
    const uR = floatToUint8((r - rgbMin) / rgbRange);
    const uG = floatToUint8((g - rgbMin) / rgbRange);
    const uB = floatToUint8((b - rgbMin) / rgbRange);
    const uA = floatToUint8(a);
    const i4 = index * 4;
    packedSplats[i4] = uR | uG << 8 | uB << 16 | uA << 24;
  }
  function setPackedSplatRgb(packedSplats, index, r, g, b, encoding) {
    const rgbMin = (encoding == null ? void 0 : encoding.rgbMin) ?? 0;
    const rgbMax = (encoding == null ? void 0 : encoding.rgbMax) ?? 1;
    const rgbRange = rgbMax - rgbMin;
    const uR = floatToUint8((r - rgbMin) / rgbRange);
    const uG = floatToUint8((g - rgbMin) / rgbRange);
    const uB = floatToUint8((b - rgbMin) / rgbRange);
    const i4 = index * 4;
    packedSplats[i4] = uR | uG << 8 | uB << 16 | packedSplats[i4] & 4278190080;
  }
  function setPackedSplatOpacity(packedSplats, index, opacity) {
    const uA = floatToUint8(opacity);
    const i4 = index * 4;
    packedSplats[i4] = packedSplats[i4] & 16777215 | uA << 24;
  }
  new Vector3();
  new Vector3();
  new Color();
  function getTextureSize(numSplats) {
    const width = SPLAT_TEX_WIDTH;
    const height = Math.max(
      SPLAT_TEX_MIN_HEIGHT,
      Math.min(SPLAT_TEX_HEIGHT, Math.ceil(numSplats / width))
    );
    const depth = Math.ceil(numSplats / (width * height));
    const maxSplats = width * height * depth;
    return { width, height, depth, maxSplats };
  }
  function computeMaxSplats(numSplats) {
    const width = SPLAT_TEX_WIDTH;
    const height = Math.max(
      SPLAT_TEX_MIN_HEIGHT,
      Math.min(SPLAT_TEX_HEIGHT, Math.ceil(numSplats / width))
    );
    const depth = Math.ceil(numSplats / (width * height));
    return width * height * depth;
  }
  unindent(\`
  precision highp float;

  in vec3 position;

  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
\`);
  const tempNormalizedQuaternion = new Quaternion();
  const tempAxis = new Vector3();
  function encodeQuatOctXy88R8(q) {
    const qnorm = tempNormalizedQuaternion.copy(q).normalize();
    if (qnorm.w < 0) {
      qnorm.set(-qnorm.x, -qnorm.y, -qnorm.z, -qnorm.w);
    }
    const theta = 2 * Math.acos(qnorm.w);
    const xyz_norm = Math.sqrt(
      qnorm.x * qnorm.x + qnorm.y * qnorm.y + qnorm.z * qnorm.z
    );
    const axis = xyz_norm < 1e-6 ? tempAxis.set(1, 0, 0) : tempAxis.set(qnorm.x, qnorm.y, qnorm.z).divideScalar(xyz_norm);
    const sum = Math.abs(axis.x) + Math.abs(axis.y) + Math.abs(axis.z);
    let p_x = axis.x / sum;
    let p_y = axis.y / sum;
    if (axis.z < 0) {
      const tmp = p_x;
      p_x = (1 - Math.abs(p_y)) * (p_x >= 0 ? 1 : -1);
      p_y = (1 - Math.abs(tmp)) * (p_y >= 0 ? 1 : -1);
    }
    const u_f = p_x * 0.5 + 0.5;
    const v_f = p_y * 0.5 + 0.5;
    const quantU = Math.round(u_f * 255);
    const quantV = Math.round(v_f * 255);
    const angleInt = Math.round(theta * (255 / Math.PI));
    return angleInt << 16 | quantV << 8 | quantU;
  }
  function packSint8Bytes(b0, b1, b22, b3) {
    const clampedB0 = Math.max(-127, Math.min(127, b0 * 127));
    const clampedB1 = Math.max(-127, Math.min(127, b1 * 127));
    const clampedB2 = Math.max(-127, Math.min(127, b22 * 127));
    const clampedB3 = Math.max(-127, Math.min(127, b3 * 127));
    return clampedB0 & 255 | (clampedB1 & 255) << 8 | (clampedB2 & 255) << 16 | (clampedB3 & 255) << 24;
  }
  function encodeSh1Rgb(sh1Array, index, sh1Rgb, encoding) {
    const sh1Min = (encoding == null ? void 0 : encoding.sh1Min) ?? -1;
    const sh1Max = (encoding == null ? void 0 : encoding.sh1Max) ?? 1;
    const sh1Mid = 0.5 * (sh1Min + sh1Max);
    const sh1Scale = 126 / (sh1Max - sh1Min);
    const base = index * 2;
    for (let i2 = 0; i2 < 9; ++i2) {
      const s = (sh1Rgb[i2] - sh1Mid) * sh1Scale;
      const value = Math.round(Math.max(-63, Math.min(63, s))) & 127;
      const bitStart = i2 * 7;
      const bitEnd = bitStart + 7;
      const wordStart = Math.floor(bitStart / 32);
      const bitOffset = bitStart - wordStart * 32;
      const firstWord = value << bitOffset & 4294967295;
      sh1Array[base + wordStart] |= firstWord;
      if (bitEnd > wordStart * 32 + 32) {
        const secondWord = value >>> 32 - bitOffset & 4294967295;
        sh1Array[base + wordStart + 1] |= secondWord;
      }
    }
  }
  function encodeSh2Rgb(sh2Array, index, sh2Rgb, encoding) {
    const sh2Min = (encoding == null ? void 0 : encoding.sh2Min) ?? -1;
    const sh2Max = (encoding == null ? void 0 : encoding.sh2Max) ?? 1;
    const sh2Mid = 0.5 * (sh2Min + sh2Max);
    const sh2Scale = 2 / (sh2Max - sh2Min);
    sh2Array[index * 4 + 0] = packSint8Bytes(
      (sh2Rgb[0] - sh2Mid) * sh2Scale,
      (sh2Rgb[1] - sh2Mid) * sh2Scale,
      (sh2Rgb[2] - sh2Mid) * sh2Scale,
      (sh2Rgb[3] - sh2Mid) * sh2Scale
    );
    sh2Array[index * 4 + 1] = packSint8Bytes(
      (sh2Rgb[4] - sh2Mid) * sh2Scale,
      (sh2Rgb[5] - sh2Mid) * sh2Scale,
      (sh2Rgb[6] - sh2Mid) * sh2Scale,
      (sh2Rgb[7] - sh2Mid) * sh2Scale
    );
    sh2Array[index * 4 + 2] = packSint8Bytes(
      (sh2Rgb[8] - sh2Mid) * sh2Scale,
      (sh2Rgb[9] - sh2Mid) * sh2Scale,
      (sh2Rgb[10] - sh2Mid) * sh2Scale,
      (sh2Rgb[11] - sh2Mid) * sh2Scale
    );
    sh2Array[index * 4 + 3] = packSint8Bytes(
      (sh2Rgb[12] - sh2Mid) * sh2Scale,
      (sh2Rgb[13] - sh2Mid) * sh2Scale,
      (sh2Rgb[14] - sh2Mid) * sh2Scale,
      0
    );
  }
  function encodeSh3Rgb(sh3Array, index, sh3Rgb, encoding) {
    const sh3Min = (encoding == null ? void 0 : encoding.sh3Min) ?? -1;
    const sh3Max = (encoding == null ? void 0 : encoding.sh3Max) ?? 1;
    const sh3Mid = 0.5 * (sh3Min + sh3Max);
    const sh3Scale = 62 / (sh3Max - sh3Min);
    const base = index * 4;
    for (let i2 = 0; i2 < 21; ++i2) {
      const s = (sh3Rgb[i2] - sh3Mid) * sh3Scale;
      const value = Math.round(Math.max(-31, Math.min(31, s))) & 63;
      const bitStart = i2 * 6;
      const bitEnd = bitStart + 6;
      const wordStart = Math.floor(bitStart / 32);
      const bitOffset = bitStart - wordStart * 32;
      const firstWord = value << bitOffset & 4294967295;
      sh3Array[base + wordStart] |= firstWord;
      if (bitEnd > wordStart * 32 + 32) {
        const secondWord = value >>> 32 - bitOffset & 4294967295;
        sh3Array[base + wordStart + 1] |= secondWord;
      }
    }
  }
  function decompressPartialGzip(fileBytes, numBytes) {
    const chunks = [];
    let totalBytes = 0;
    let result = null;
    const gunzip = new Gunzip((data, final) => {
      chunks.push(data);
      totalBytes += data.length;
      if (final || totalBytes >= numBytes) {
        const allBytes = new Uint8Array(totalBytes);
        let offset2 = 0;
        for (const chunk of chunks) {
          allBytes.set(chunk, offset2);
          offset2 += chunk.length;
        }
        result = allBytes.slice(0, numBytes);
      }
    });
    const CHUNK_SIZE = 1024;
    let offset = 0;
    while (result == null && offset < fileBytes.length) {
      const chunk = fileBytes.slice(offset, offset + CHUNK_SIZE);
      gunzip.push(chunk, false);
      offset += CHUNK_SIZE;
    }
    if (result == null) {
      gunzip.push(new Uint8Array(), true);
      if (result == null) {
        throw new Error("Failed to decompress partial gzip");
      }
    }
    return result;
  }
  class GunzipReader {
    constructor({
      fileBytes,
      chunkBytes = 64 * 1024
    }) {
      this.fileBytes = fileBytes;
      this.chunkBytes = chunkBytes;
      this.chunks = [];
      this.totalBytes = 0;
      const ds = new DecompressionStream("gzip");
      const decompressionStream = new Blob([fileBytes]).stream().pipeThrough(ds);
      this.reader = decompressionStream.getReader();
    }
    async read(numBytes) {
      while (this.totalBytes < numBytes) {
        const { value: chunk, done: readerDone } = await this.reader.read();
        if (readerDone) {
          break;
        }
        this.chunks.push(chunk);
        this.totalBytes += chunk.length;
      }
      if (this.totalBytes < numBytes) {
        throw new Error(
          \`Unexpected EOF: needed \${numBytes}, got \${this.totalBytes}\`
        );
      }
      const allBytes = new Uint8Array(this.totalBytes);
      let outOffset = 0;
      for (const chunk of this.chunks) {
        allBytes.set(chunk, outOffset);
        outOffset += chunk.length;
      }
      const result = allBytes.subarray(0, numBytes);
      this.chunks = [allBytes.subarray(numBytes)];
      this.totalBytes -= numBytes;
      return result;
    }
  }
  function decodeAntiSplat(fileBytes, initNumSplats, splatCallback) {
    const numSplats = Math.floor(fileBytes.length / 32);
    if (numSplats * 32 !== fileBytes.length) {
      throw new Error("Invalid .splat file size");
    }
    initNumSplats(numSplats);
    const f32 = new Float32Array(fileBytes.buffer);
    for (let i2 = 0; i2 < numSplats; ++i2) {
      const i322 = i2 * 32;
      const i8 = i2 * 8;
      const x2 = f32[i8 + 0];
      const y = f32[i8 + 1];
      const z = f32[i8 + 2];
      const scaleX = f32[i8 + 3];
      const scaleY = f32[i8 + 4];
      const scaleZ = f32[i8 + 5];
      const r = fileBytes[i322 + 24] / 255;
      const g = fileBytes[i322 + 25] / 255;
      const b = fileBytes[i322 + 26] / 255;
      const opacity = fileBytes[i322 + 27] / 255;
      const quatW = (fileBytes[i322 + 28] - 128) / 128;
      const quatX = (fileBytes[i322 + 29] - 128) / 128;
      const quatY = (fileBytes[i322 + 30] - 128) / 128;
      const quatZ = (fileBytes[i322 + 31] - 128) / 128;
      splatCallback(
        i2,
        x2,
        y,
        z,
        scaleX,
        scaleY,
        scaleZ,
        quatX,
        quatY,
        quatZ,
        quatW,
        opacity,
        r,
        g,
        b
      );
    }
  }
  function unpackAntiSplat(fileBytes, splatEncoding) {
    let numSplats = 0;
    let maxSplats = 0;
    let packedArray = new Uint32Array(0);
    decodeAntiSplat(
      fileBytes,
      (cbNumSplats) => {
        numSplats = cbNumSplats;
        maxSplats = computeMaxSplats(numSplats);
        packedArray = new Uint32Array(maxSplats * 4);
      },
      (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
        setPackedSplat(
          packedArray,
          index,
          x2,
          y,
          z,
          scaleX,
          scaleY,
          scaleZ,
          quatX,
          quatY,
          quatZ,
          quatW,
          opacity,
          r,
          g,
          b,
          splatEncoding
        );
      }
    );
    return { packedArray, numSplats };
  }
  const KSPLAT_COMPRESSION = {
    0: {
      bytesPerCenter: 12,
      bytesPerScale: 12,
      bytesPerRotation: 16,
      bytesPerColor: 4,
      bytesPerSphericalHarmonicsComponent: 4,
      scaleOffsetBytes: 12,
      rotationOffsetBytes: 24,
      colorOffsetBytes: 40,
      sphericalHarmonicsOffsetBytes: 44,
      scaleRange: 1
    },
    1: {
      bytesPerCenter: 6,
      bytesPerScale: 6,
      bytesPerRotation: 8,
      bytesPerColor: 4,
      bytesPerSphericalHarmonicsComponent: 2,
      scaleOffsetBytes: 6,
      rotationOffsetBytes: 12,
      colorOffsetBytes: 20,
      sphericalHarmonicsOffsetBytes: 24,
      scaleRange: 32767
    },
    2: {
      bytesPerCenter: 6,
      bytesPerScale: 6,
      bytesPerRotation: 8,
      bytesPerColor: 4,
      bytesPerSphericalHarmonicsComponent: 1,
      scaleOffsetBytes: 6,
      rotationOffsetBytes: 12,
      colorOffsetBytes: 20,
      sphericalHarmonicsOffsetBytes: 24,
      scaleRange: 32767
    }
  };
  const KSPLAT_SH_DEGREE_TO_COMPONENTS = {
    0: 0,
    1: 9,
    2: 24,
    3: 45
  };
  function decodeKsplat(fileBytes, initNumSplats, splatCallback, shCallback) {
    var _a2;
    const HEADER_BYTES = 4096;
    const SECTION_BYTES = 1024;
    let headerOffset = 0;
    const header = new DataView(fileBytes.buffer, headerOffset, HEADER_BYTES);
    headerOffset += HEADER_BYTES;
    const versionMajor = header.getUint8(0);
    const versionMinor = header.getUint8(1);
    if (versionMajor !== 0 || versionMinor < 1) {
      throw new Error(
        \`Unsupported .ksplat version: \${versionMajor}.\${versionMinor}\`
      );
    }
    const maxSectionCount = header.getUint32(4, true);
    header.getUint32(16, true);
    const compressionLevel = header.getUint16(20, true);
    if (compressionLevel < 0 || compressionLevel > 2) {
      throw new Error(\`Invalid .ksplat compression level: \${compressionLevel}\`);
    }
    const minSphericalHarmonicsCoeff = header.getFloat32(36, true) || -1.5;
    const maxSphericalHarmonicsCoeff = header.getFloat32(40, true) || 1.5;
    let sectionBase = HEADER_BYTES + maxSectionCount * SECTION_BYTES;
    for (let section = 0; section < maxSectionCount; ++section) {
      let getSh = function(splatOffset, component) {
        if (compressionLevel === 0) {
          return data.getFloat32(
            splatOffset + sphericalHarmonicsOffsetBytes + component * 4,
            true
          );
        }
        if (compressionLevel === 1) {
          return fromHalf(
            data.getUint16(
              splatOffset + sphericalHarmonicsOffsetBytes + component * 2,
              true
            )
          );
        }
        const t = data.getUint8(splatOffset + sphericalHarmonicsOffsetBytes + component) / 255;
        return minSphericalHarmonicsCoeff + t * (maxSphericalHarmonicsCoeff - minSphericalHarmonicsCoeff);
      };
      const section2 = new DataView(fileBytes.buffer, headerOffset, SECTION_BYTES);
      headerOffset += SECTION_BYTES;
      const sectionSplatCount = section2.getUint32(0, true);
      const sectionMaxSplatCount = section2.getUint32(4, true);
      const bucketSize = section2.getUint32(8, true);
      const bucketCount = section2.getUint32(12, true);
      const bucketBlockSize = section2.getFloat32(16, true);
      const bucketStorageSizeBytes = section2.getUint16(20, true);
      const compressionScaleRange = (section2.getUint32(24, true) || ((_a2 = KSPLAT_COMPRESSION[compressionLevel]) == null ? void 0 : _a2.scaleRange)) ?? 1;
      const fullBucketCount = section2.getUint32(32, true);
      const fullBucketSplats = fullBucketCount * bucketSize;
      const partiallyFilledBucketCount = section2.getUint32(36, true);
      const bucketsMetaDataSizeBytes = partiallyFilledBucketCount * 4;
      const bucketsStorageSizeBytes = bucketStorageSizeBytes * bucketCount + bucketsMetaDataSizeBytes;
      const sphericalHarmonicsDegree = section2.getUint16(40, true);
      const shComponents = KSPLAT_SH_DEGREE_TO_COMPONENTS[sphericalHarmonicsDegree];
      const {
        bytesPerCenter,
        bytesPerScale,
        bytesPerRotation,
        bytesPerColor,
        bytesPerSphericalHarmonicsComponent,
        scaleOffsetBytes,
        rotationOffsetBytes,
        colorOffsetBytes,
        sphericalHarmonicsOffsetBytes
      } = KSPLAT_COMPRESSION[compressionLevel];
      const bytesPerSplat = bytesPerCenter + bytesPerScale + bytesPerRotation + bytesPerColor + shComponents * bytesPerSphericalHarmonicsComponent;
      const splatDataStorageSizeBytes = bytesPerSplat * sectionMaxSplatCount;
      const storageSizeBytes = splatDataStorageSizeBytes + bucketsStorageSizeBytes;
      const sh1Index = [0, 3, 6, 1, 4, 7, 2, 5, 8];
      const sh2Index = [
        9,
        14,
        19,
        10,
        15,
        20,
        11,
        16,
        21,
        12,
        17,
        22,
        13,
        18,
        23
      ];
      const sh3Index = [
        24,
        31,
        38,
        25,
        32,
        39,
        26,
        33,
        40,
        27,
        34,
        41,
        28,
        35,
        42,
        29,
        36,
        43,
        30,
        37,
        44
      ];
      const sh1 = sphericalHarmonicsDegree >= 1 ? new Float32Array(3 * 3) : void 0;
      const sh2 = sphericalHarmonicsDegree >= 2 ? new Float32Array(5 * 3) : void 0;
      const sh3 = sphericalHarmonicsDegree >= 3 ? new Float32Array(7 * 3) : void 0;
      const compressionScaleFactor = bucketBlockSize / 2 / compressionScaleRange;
      const bucketsBase = sectionBase + bucketsMetaDataSizeBytes;
      const dataBase = sectionBase + bucketsStorageSizeBytes;
      const data = new DataView(
        fileBytes.buffer,
        dataBase,
        splatDataStorageSizeBytes
      );
      const bucketArray = new Float32Array(
        fileBytes.buffer,
        bucketsBase,
        bucketCount * 3
      );
      const partiallyFilledBucketLengths = new Uint32Array(
        fileBytes.buffer,
        sectionBase,
        partiallyFilledBucketCount
      );
      let partialBucketIndex = fullBucketCount;
      let partialBucketBase = fullBucketSplats;
      for (let i2 = 0; i2 < sectionSplatCount; ++i2) {
        const splatOffset = i2 * bytesPerSplat;
        let bucketIndex;
        if (i2 < fullBucketSplats) {
          bucketIndex = Math.floor(i2 / bucketSize);
        } else {
          const bucketLength = partiallyFilledBucketLengths[partialBucketIndex - fullBucketCount];
          if (i2 >= partialBucketBase + bucketLength) {
            partialBucketIndex += 1;
            partialBucketBase += bucketLength;
          }
          bucketIndex = partialBucketIndex;
        }
        const x2 = compressionLevel === 0 ? data.getFloat32(splatOffset + 0, true) : (data.getUint16(splatOffset + 0, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 0];
        const y = compressionLevel === 0 ? data.getFloat32(splatOffset + 4, true) : (data.getUint16(splatOffset + 2, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 1];
        const z = compressionLevel === 0 ? data.getFloat32(splatOffset + 8, true) : (data.getUint16(splatOffset + 4, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 2];
        const scaleX = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 0, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 0, true));
        const scaleY = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 4, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 2, true));
        const scaleZ = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 8, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 4, true));
        const quatW = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 0, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 0, true)
        );
        const quatX = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 4, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 2, true)
        );
        const quatY = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 8, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 4, true)
        );
        const quatZ = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 12, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 6, true)
        );
        const r = data.getUint8(splatOffset + colorOffsetBytes + 0) / 255;
        const g = data.getUint8(splatOffset + colorOffsetBytes + 1) / 255;
        const b = data.getUint8(splatOffset + colorOffsetBytes + 2) / 255;
        const opacity = data.getUint8(splatOffset + colorOffsetBytes + 3) / 255;
        splatCallback(
          i2,
          x2,
          y,
          z,
          scaleX,
          scaleY,
          scaleZ,
          quatX,
          quatY,
          quatZ,
          quatW,
          opacity,
          r,
          g,
          b
        );
        if (sphericalHarmonicsDegree >= 1 && sh1) {
          for (const [i22, key] of sh1Index.entries()) {
            sh1[i22] = getSh(splatOffset, key);
          }
          if (sh2) {
            for (const [i22, key] of sh2Index.entries()) {
              sh2[i22] = getSh(splatOffset, key);
            }
          }
          if (sh3) {
            for (const [i22, key] of sh3Index.entries()) {
              sh3[i22] = getSh(splatOffset, key);
            }
          }
          shCallback == null ? void 0 : shCallback(i2, sh1, sh2, sh3);
        }
      }
      sectionBase += storageSizeBytes;
    }
  }
  function unpackKsplat(fileBytes, splatEncoding) {
    var _a2;
    const HEADER_BYTES = 4096;
    const SECTION_BYTES = 1024;
    let headerOffset = 0;
    const header = new DataView(fileBytes.buffer, headerOffset, HEADER_BYTES);
    headerOffset += HEADER_BYTES;
    const versionMajor = header.getUint8(0);
    const versionMinor = header.getUint8(1);
    if (versionMajor !== 0 || versionMinor < 1) {
      throw new Error(
        \`Unsupported .ksplat version: \${versionMajor}.\${versionMinor}\`
      );
    }
    const maxSectionCount = header.getUint32(4, true);
    const splatCount = header.getUint32(16, true);
    const compressionLevel = header.getUint16(20, true);
    if (compressionLevel < 0 || compressionLevel > 2) {
      throw new Error(\`Invalid .ksplat compression level: \${compressionLevel}\`);
    }
    const minSphericalHarmonicsCoeff = header.getFloat32(36, true) || -1.5;
    const maxSphericalHarmonicsCoeff = header.getFloat32(40, true) || 1.5;
    const numSplats = splatCount;
    const maxSplats = computeMaxSplats(numSplats);
    const packedArray = new Uint32Array(maxSplats * 4);
    const extra = {};
    let sectionBase = HEADER_BYTES + maxSectionCount * SECTION_BYTES;
    for (let section = 0; section < maxSectionCount; ++section) {
      let getSh = function(splatOffset, component) {
        if (compressionLevel === 0) {
          return data.getFloat32(
            splatOffset + sphericalHarmonicsOffsetBytes + component * 4,
            true
          );
        }
        if (compressionLevel === 1) {
          return fromHalf(
            data.getUint16(
              splatOffset + sphericalHarmonicsOffsetBytes + component * 2,
              true
            )
          );
        }
        const t = data.getUint8(splatOffset + sphericalHarmonicsOffsetBytes + component) / 255;
        return minSphericalHarmonicsCoeff + t * (maxSphericalHarmonicsCoeff - minSphericalHarmonicsCoeff);
      };
      const section2 = new DataView(fileBytes.buffer, headerOffset, SECTION_BYTES);
      headerOffset += SECTION_BYTES;
      const sectionSplatCount = section2.getUint32(0, true);
      const sectionMaxSplatCount = section2.getUint32(4, true);
      const bucketSize = section2.getUint32(8, true);
      const bucketCount = section2.getUint32(12, true);
      const bucketBlockSize = section2.getFloat32(16, true);
      const bucketStorageSizeBytes = section2.getUint16(20, true);
      const compressionScaleRange = (section2.getUint32(24, true) || ((_a2 = KSPLAT_COMPRESSION[compressionLevel]) == null ? void 0 : _a2.scaleRange)) ?? 1;
      const fullBucketCount = section2.getUint32(32, true);
      const fullBucketSplats = fullBucketCount * bucketSize;
      const partiallyFilledBucketCount = section2.getUint32(36, true);
      const bucketsMetaDataSizeBytes = partiallyFilledBucketCount * 4;
      const bucketsStorageSizeBytes = bucketStorageSizeBytes * bucketCount + bucketsMetaDataSizeBytes;
      const sphericalHarmonicsDegree = section2.getUint16(40, true);
      const shComponents = KSPLAT_SH_DEGREE_TO_COMPONENTS[sphericalHarmonicsDegree];
      const {
        bytesPerCenter,
        bytesPerScale,
        bytesPerRotation,
        bytesPerColor,
        bytesPerSphericalHarmonicsComponent,
        scaleOffsetBytes,
        rotationOffsetBytes,
        colorOffsetBytes,
        sphericalHarmonicsOffsetBytes
      } = KSPLAT_COMPRESSION[compressionLevel];
      const bytesPerSplat = bytesPerCenter + bytesPerScale + bytesPerRotation + bytesPerColor + shComponents * bytesPerSphericalHarmonicsComponent;
      const splatDataStorageSizeBytes = bytesPerSplat * sectionMaxSplatCount;
      const storageSizeBytes = splatDataStorageSizeBytes + bucketsStorageSizeBytes;
      const sh1Index = [0, 3, 6, 1, 4, 7, 2, 5, 8];
      const sh2Index = [
        9,
        14,
        19,
        10,
        15,
        20,
        11,
        16,
        21,
        12,
        17,
        22,
        13,
        18,
        23
      ];
      const sh3Index = [
        24,
        31,
        38,
        25,
        32,
        39,
        26,
        33,
        40,
        27,
        34,
        41,
        28,
        35,
        42,
        29,
        36,
        43,
        30,
        37,
        44
      ];
      const sh1 = sphericalHarmonicsDegree >= 1 ? new Float32Array(3 * 3) : void 0;
      const sh2 = sphericalHarmonicsDegree >= 2 ? new Float32Array(5 * 3) : void 0;
      const sh3 = sphericalHarmonicsDegree >= 3 ? new Float32Array(7 * 3) : void 0;
      const compressionScaleFactor = bucketBlockSize / 2 / compressionScaleRange;
      const bucketsBase = sectionBase + bucketsMetaDataSizeBytes;
      const dataBase = sectionBase + bucketsStorageSizeBytes;
      const data = new DataView(
        fileBytes.buffer,
        dataBase,
        splatDataStorageSizeBytes
      );
      const bucketArray = new Float32Array(
        fileBytes.buffer,
        bucketsBase,
        bucketCount * 3
      );
      const partiallyFilledBucketLengths = new Uint32Array(
        fileBytes.buffer,
        sectionBase,
        partiallyFilledBucketCount
      );
      let partialBucketIndex = fullBucketCount;
      let partialBucketBase = fullBucketSplats;
      for (let i2 = 0; i2 < sectionSplatCount; ++i2) {
        const splatOffset = i2 * bytesPerSplat;
        let bucketIndex;
        if (i2 < fullBucketSplats) {
          bucketIndex = Math.floor(i2 / bucketSize);
        } else {
          const bucketLength = partiallyFilledBucketLengths[partialBucketIndex - fullBucketCount];
          if (i2 >= partialBucketBase + bucketLength) {
            partialBucketIndex += 1;
            partialBucketBase += bucketLength;
          }
          bucketIndex = partialBucketIndex;
        }
        const x2 = compressionLevel === 0 ? data.getFloat32(splatOffset + 0, true) : (data.getUint16(splatOffset + 0, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 0];
        const y = compressionLevel === 0 ? data.getFloat32(splatOffset + 4, true) : (data.getUint16(splatOffset + 2, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 1];
        const z = compressionLevel === 0 ? data.getFloat32(splatOffset + 8, true) : (data.getUint16(splatOffset + 4, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 2];
        const scaleX = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 0, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 0, true));
        const scaleY = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 4, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 2, true));
        const scaleZ = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 8, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 4, true));
        const quatW = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 0, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 0, true)
        );
        const quatX = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 4, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 2, true)
        );
        const quatY = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 8, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 4, true)
        );
        const quatZ = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 12, true) : fromHalf(
          data.getUint16(splatOffset + rotationOffsetBytes + 6, true)
        );
        const r = data.getUint8(splatOffset + colorOffsetBytes + 0) / 255;
        const g = data.getUint8(splatOffset + colorOffsetBytes + 1) / 255;
        const b = data.getUint8(splatOffset + colorOffsetBytes + 2) / 255;
        const opacity = data.getUint8(splatOffset + colorOffsetBytes + 3) / 255;
        setPackedSplat(
          packedArray,
          i2,
          x2,
          y,
          z,
          scaleX,
          scaleY,
          scaleZ,
          quatX,
          quatY,
          quatZ,
          quatW,
          opacity,
          r,
          g,
          b,
          splatEncoding
        );
        if (sphericalHarmonicsDegree >= 1) {
          if (sh1) {
            if (!extra.sh1) {
              extra.sh1 = new Uint32Array(numSplats * 2);
            }
            for (const [i22, key] of sh1Index.entries()) {
              sh1[i22] = getSh(splatOffset, key);
            }
            encodeSh1Rgb(extra.sh1, i2, sh1, splatEncoding);
          }
          if (sh2) {
            if (!extra.sh2) {
              extra.sh2 = new Uint32Array(numSplats * 4);
            }
            for (const [i22, key] of sh2Index.entries()) {
              sh2[i22] = getSh(splatOffset, key);
            }
            encodeSh2Rgb(extra.sh2, i2, sh2, splatEncoding);
          }
          if (sh3) {
            if (!extra.sh3) {
              extra.sh3 = new Uint32Array(numSplats * 4);
            }
            for (const [i22, key] of sh3Index.entries()) {
              sh3[i22] = getSh(splatOffset, key);
            }
            encodeSh3Rgb(extra.sh3, i2, sh3, splatEncoding);
          }
        }
      }
      sectionBase += storageSizeBytes;
    }
    return { packedArray, numSplats, extra };
  }
  const PLY_PROPERTY_TYPES = [
    "char",
    "uchar",
    "short",
    "ushort",
    "int",
    "uint",
    "float",
    "double"
  ];
  const _PlyReader = class _PlyReader {
    // Create a PlyReader from a Uint8Array/ArrayBuffer, no parsing done yet
    constructor({ fileBytes }) {
      this.header = "";
      this.littleEndian = true;
      this.elements = {};
      this.comments = [];
      this.data = null;
      this.numSplats = 0;
      this.fileBytes = fileBytes instanceof ArrayBuffer ? new Uint8Array(fileBytes) : fileBytes;
    }
    // Identify and parse the PLY text header (assumed to be <64KB in size).
    // this.elements will contain all the elements in the file, typically
    // "vertex" contains the Gsplat data.
    async parseHeader() {
      const bufferStream = new ReadableStream({
        start: (controller) => {
          controller.enqueue(this.fileBytes.slice(0, 65536));
          controller.close();
        }
      });
      const decoder = bufferStream.pipeThrough(new TextDecoderStream()).getReader();
      this.header = "";
      const headerTerminator = "end_header\\n";
      while (true) {
        const { value, done } = await decoder.read();
        if (done) {
          throw new Error("Failed to read header");
        }
        this.header += value;
        const endHeader = this.header.indexOf(headerTerminator);
        if (endHeader >= 0) {
          this.header = this.header.slice(0, endHeader + headerTerminator.length);
          break;
        }
      }
      const headerLen = new TextEncoder().encode(this.header).length;
      this.data = new DataView(this.fileBytes.buffer, headerLen);
      this.elements = {};
      let curElement = null;
      this.comments = [];
      this.header.trim().split("\\n").forEach((line, lineIndex) => {
        const trimmedLine = line.trim();
        if (lineIndex === 0) {
          if (trimmedLine !== "ply") {
            throw new Error("Invalid PLY header");
          }
          return;
        }
        if (trimmedLine.length === 0) {
          return;
        }
        const fields = trimmedLine.split(" ");
        switch (fields[0]) {
          case "format":
            if (fields[1] === "binary_little_endian") {
              this.littleEndian = true;
            } else if (fields[1] === "binary_big_endian") {
              this.littleEndian = false;
            } else {
              throw new Error(\`Unsupported PLY format: \${fields[1]}\`);
            }
            if (fields[2] !== "1.0") {
              throw new Error(\`Unsupported PLY version: \${fields[2]}\`);
            }
            break;
          case "end_header":
            break;
          case "comment":
            this.comments.push(trimmedLine.slice("comment ".length));
            break;
          case "element": {
            const name = fields[1];
            curElement = {
              name,
              count: Number.parseInt(fields[2]),
              properties: {}
            };
            this.elements[name] = curElement;
            break;
          }
          case "property":
            if (curElement == null) {
              throw new Error("Property must be inside an element");
            }
            if (fields[1] === "list") {
              curElement.properties[fields[4]] = {
                isList: true,
                type: fields[3],
                countType: fields[2]
              };
            } else {
              curElement.properties[fields[2]] = {
                isList: false,
                type: fields[1]
              };
            }
            break;
        }
      });
      if (this.elements.vertex) {
        this.numSplats = this.elements.vertex.count;
      }
    }
    parseData(elementCallback) {
      let offset = 0;
      const data = this.data;
      if (data == null) {
        throw new Error("No data to parse");
      }
      for (const elementName in this.elements) {
        const element = this.elements[elementName];
        const { count, properties } = element;
        const item = createEmptyItem(properties);
        const parseFn = createParseFn(properties, this.littleEndian);
        const callback = elementCallback(element) ?? (() => {
        });
        for (let index = 0; index < count; index++) {
          offset = parseFn(data, offset, item);
          callback(index, item);
        }
      }
    }
    // Parse all the Gsplat data in the PLY file in go, invoking the given
    // callbacks for each Gsplat.
    parseSplats(splatCallback, shCallback) {
      if (this.elements.vertex == null) {
        throw new Error("No vertex element found");
      }
      let isSuperSplat = false;
      const ssChunks = [];
      let numSh = 0;
      let sh1Props = [];
      let sh2Props = [];
      let sh3Props = [];
      let sh1 = void 0;
      let sh2 = void 0;
      let sh3 = void 0;
      function prepareSh() {
        const num_f_rest = NUM_SH_TO_NUM_F_REST[numSh];
        sh1Props = new Array(3).fill(null).flatMap((_, k) => [0, 1, 2].map((_2, d) => k + d * num_f_rest / 3));
        sh2Props = new Array(5).fill(null).flatMap(
          (_, k) => [0, 1, 2].map((_2, d) => 3 + k + d * num_f_rest / 3)
        );
        sh3Props = new Array(7).fill(null).flatMap(
          (_, k) => [0, 1, 2].map((_2, d) => 8 + k + d * num_f_rest / 3)
        );
        sh1 = numSh >= 1 ? new Float32Array(3 * 3) : void 0;
        sh2 = numSh >= 2 ? new Float32Array(5 * 3) : void 0;
        sh3 = numSh >= 3 ? new Float32Array(7 * 3) : void 0;
      }
      function ssShCallback(index, item) {
        if (!sh1) {
          throw new Error("Missing sh1");
        }
        const sh = item.f_rest;
        for (let i2 = 0; i2 < sh1Props.length; i2++) {
          sh1[i2] = sh[sh1Props[i2]] * 8 / 255 - 4;
        }
        if (sh2) {
          for (let i2 = 0; i2 < sh2Props.length; i2++) {
            sh2[i2] = sh[sh2Props[i2]] * 8 / 255 - 4;
          }
        }
        if (sh3) {
          for (let i2 = 0; i2 < sh3Props.length; i2++) {
            sh3[i2] = sh[sh3Props[i2]] * 8 / 255 - 4;
          }
        }
        shCallback == null ? void 0 : shCallback(index, sh1, sh2, sh3);
      }
      function initSuperSplat(element) {
        const {
          min_x,
          min_y,
          min_z,
          max_x,
          max_y,
          max_z,
          min_scale_x,
          min_scale_y,
          min_scale_z,
          max_scale_x,
          max_scale_y,
          max_scale_z
        } = element.properties;
        if (!min_x || !min_y || !min_z || !max_x || !max_y || !max_z || !min_scale_x || !min_scale_y || !min_scale_z || !max_scale_x || !max_scale_y || !max_scale_z) {
          throw new Error("Missing PLY chunk properties");
        }
        isSuperSplat = true;
        return (index, item) => {
          const {
            min_x: min_x2,
            min_y: min_y2,
            min_z: min_z2,
            max_x: max_x2,
            max_y: max_y2,
            max_z: max_z2,
            min_scale_x: min_scale_x2,
            min_scale_y: min_scale_y2,
            min_scale_z: min_scale_z2,
            max_scale_x: max_scale_x2,
            max_scale_y: max_scale_y2,
            max_scale_z: max_scale_z2,
            min_r,
            min_g,
            min_b,
            max_r,
            max_g,
            max_b
          } = item;
          ssChunks.push({
            min_x: min_x2,
            min_y: min_y2,
            min_z: min_z2,
            max_x: max_x2,
            max_y: max_y2,
            max_z: max_z2,
            min_scale_x: min_scale_x2,
            min_scale_y: min_scale_y2,
            min_scale_z: min_scale_z2,
            max_scale_x: max_scale_x2,
            max_scale_y: max_scale_y2,
            max_scale_z: max_scale_z2,
            min_r,
            min_g,
            min_b,
            max_r,
            max_g,
            max_b
          });
        };
      }
      function decodeSuperSplat(element) {
        if (shCallback && element.name === "sh") {
          numSh = getNumSh(element.properties);
          prepareSh();
          return ssShCallback;
        }
        if (element.name !== "vertex") {
          return null;
        }
        const { packed_position, packed_rotation, packed_scale, packed_color } = element.properties;
        if (!packed_position || !packed_rotation || !packed_scale || !packed_color) {
          throw new Error(
            "Missing PLY properties: packed_position, packed_rotation, packed_scale, packed_color"
          );
        }
        const SQRT2 = Math.sqrt(2);
        return (index, item) => {
          const chunk = ssChunks[index >>> 8];
          if (chunk == null) {
            throw new Error("Missing PLY chunk");
          }
          const {
            min_x,
            min_y,
            min_z,
            max_x,
            max_y,
            max_z,
            min_scale_x,
            min_scale_y,
            min_scale_z,
            max_scale_x,
            max_scale_y,
            max_scale_z,
            min_r,
            min_g,
            min_b,
            max_r,
            max_g,
            max_b
          } = chunk;
          const { packed_position: packed_position2, packed_rotation: packed_rotation2, packed_scale: packed_scale2, packed_color: packed_color2 } = item;
          const x2 = (packed_position2 >>> 21 & 2047) / 2047 * (max_x - min_x) + min_x;
          const y = (packed_position2 >>> 11 & 1023) / 1023 * (max_y - min_y) + min_y;
          const z = (packed_position2 & 2047) / 2047 * (max_z - min_z) + min_z;
          const r0 = ((packed_rotation2 >>> 20 & 1023) / 1023 - 0.5) * SQRT2;
          const r1 = ((packed_rotation2 >>> 10 & 1023) / 1023 - 0.5) * SQRT2;
          const r2 = ((packed_rotation2 & 1023) / 1023 - 0.5) * SQRT2;
          const rr = Math.sqrt(Math.max(0, 1 - r0 * r0 - r1 * r1 - r2 * r2));
          const rOrder = packed_rotation2 >>> 30;
          const quatX = rOrder === 0 ? r0 : rOrder === 1 ? rr : r1;
          const quatY = rOrder <= 1 ? r1 : rOrder === 2 ? rr : r2;
          const quatZ = rOrder <= 2 ? r2 : rr;
          const quatW = rOrder === 0 ? rr : r0;
          const scaleX = Math.exp(
            (packed_scale2 >>> 21 & 2047) / 2047 * (max_scale_x - min_scale_x) + min_scale_x
          );
          const scaleY = Math.exp(
            (packed_scale2 >>> 11 & 1023) / 1023 * (max_scale_y - min_scale_y) + min_scale_y
          );
          const scaleZ = Math.exp(
            (packed_scale2 & 2047) / 2047 * (max_scale_z - min_scale_z) + min_scale_z
          );
          const r = (packed_color2 >>> 24 & 255) / 255 * ((max_r ?? 1) - (min_r ?? 0)) + (min_r ?? 0);
          const g = (packed_color2 >>> 16 & 255) / 255 * ((max_g ?? 1) - (min_g ?? 0)) + (min_g ?? 0);
          const b = (packed_color2 >>> 8 & 255) / 255 * ((max_b ?? 1) - (min_b ?? 0)) + (min_b ?? 0);
          const opacity = (packed_color2 & 255) / 255;
          splatCallback(
            index,
            x2,
            y,
            z,
            scaleX,
            scaleY,
            scaleZ,
            quatX,
            quatY,
            quatZ,
            quatW,
            opacity,
            r,
            g,
            b
          );
        };
      }
      const elementCallback = (element) => {
        if (element.name === "chunk") {
          return initSuperSplat(element);
        }
        if (isSuperSplat) {
          return decodeSuperSplat(element);
        }
        if (element.name !== "vertex") {
          return null;
        }
        const {
          x: x2,
          y,
          z,
          scale_0,
          scale_1,
          scale_2,
          rot_0,
          rot_1,
          rot_2,
          rot_3,
          opacity,
          f_dc_0,
          f_dc_1,
          f_dc_2,
          red,
          green,
          blue,
          alpha
        } = element.properties;
        if (!x2 || !y || !z) {
          throw new Error("Missing PLY properties: x, y, z");
        }
        const hasScales = scale_0 && scale_1 && scale_2;
        const hasRots = rot_0 && rot_1 && rot_2 && rot_3;
        const alphaDiv = alpha != null ? FIELD_SCALE[alpha.type] : 1;
        const redDiv = red != null ? FIELD_SCALE[red.type] : 1;
        const greenDiv = green != null ? FIELD_SCALE[green.type] : 1;
        const blueDiv = blue != null ? FIELD_SCALE[blue.type] : 1;
        numSh = getNumSh(element.properties);
        prepareSh();
        return (index, item) => {
          const scaleX = hasScales ? Math.exp(item.scale_0) : _PlyReader.defaultPointScale;
          const scaleY = hasScales ? Math.exp(item.scale_1) : _PlyReader.defaultPointScale;
          const scaleZ = hasScales ? Math.exp(item.scale_2) : _PlyReader.defaultPointScale;
          const quatX = hasRots ? item.rot_1 : 0;
          const quatY = hasRots ? item.rot_2 : 0;
          const quatZ = hasRots ? item.rot_3 : 0;
          const quatW = hasRots ? item.rot_0 : 1;
          const op = opacity != null ? 1 / (1 + Math.exp(-item.opacity)) : alpha != null ? item.alpha / alphaDiv : 1;
          const r = f_dc_0 != null ? item.f_dc_0 * SH_C0$1 + 0.5 : red != null ? item.red / redDiv : 1;
          const g = f_dc_1 != null ? item.f_dc_1 * SH_C0$1 + 0.5 : green != null ? item.green / greenDiv : 1;
          const b = f_dc_2 != null ? item.f_dc_2 * SH_C0$1 + 0.5 : blue != null ? item.blue / blueDiv : 1;
          splatCallback(
            index,
            item.x,
            item.y,
            item.z,
            scaleX,
            scaleY,
            scaleZ,
            quatX,
            quatY,
            quatZ,
            quatW,
            op,
            r,
            g,
            b
          );
          if (shCallback && sh1) {
            const sh = item.f_rest;
            if (sh1) {
              for (let i2 = 0; i2 < sh1Props.length; i2++) {
                sh1[i2] = sh[sh1Props[i2]];
              }
            }
            if (sh2) {
              for (let i2 = 0; i2 < sh2Props.length; i2++) {
                sh2[i2] = sh[sh2Props[i2]];
              }
            }
            if (sh3) {
              for (let i2 = 0; i2 < sh3Props.length; i2++) {
                sh3[i2] = sh[sh3Props[i2]];
              }
            }
            shCallback(index, sh1, sh2, sh3);
          }
        };
      };
      this.parseData(elementCallback);
    }
    // Inject RGBA values into original PLY file, which can be used to modify
    // the color/opacity of the Gsplats and write out the modified PLY file.
    injectRgba(rgba) {
      let offset = 0;
      const data = this.data;
      if (data == null) {
        throw new Error("No parsed data");
      }
      if (rgba.length !== this.numSplats * 4) {
        throw new Error("Invalid RGBA array length");
      }
      for (const elementName in this.elements) {
        const element = this.elements[elementName];
        const { count, properties } = element;
        const parsers = [];
        let rgbaOffset = 0;
        const isVertex = elementName === "vertex";
        if (isVertex) {
          for (const name of ["opacity", "f_dc_0", "f_dc_1", "f_dc_2"]) {
            if (!properties[name] || properties[name].type !== "float") {
              throw new Error(\`Can't injectRgba due to property: \${name}\`);
            }
          }
        }
        for (const [propertyName, property] of Object.entries(properties)) {
          if (!property.isList) {
            if (isVertex) {
              if (propertyName === "f_dc_0" || propertyName === "f_dc_1" || propertyName === "f_dc_2") {
                const component = Number.parseInt(
                  propertyName.slice("f_dc_".length)
                );
                parsers.push(() => {
                  const value = (rgba[rgbaOffset + component] / 255 - 0.5) / SH_C0$1;
                  SET_FIELD[property.type](
                    data,
                    offset,
                    this.littleEndian,
                    value
                  );
                });
              } else if (propertyName === "opacity") {
                parsers.push(() => {
                  const value = Math.max(
                    -100,
                    Math.min(
                      100,
                      -Math.log(1 / (rgba[rgbaOffset + 3] / 255) - 1)
                    )
                  );
                  SET_FIELD[property.type](
                    data,
                    offset,
                    this.littleEndian,
                    value
                  );
                });
              }
            }
            parsers.push(() => {
              offset += FIELD_BYTES[property.type];
            });
          } else {
            parsers.push(() => {
              const length = PARSE_FIELD[property.countType](
                data,
                offset,
                this.littleEndian
              );
              offset += FIELD_BYTES[property.countType];
              offset += length * FIELD_BYTES[property.type];
            });
          }
        }
        for (let index = 0; index < count; index++) {
          for (const parser of parsers) {
            parser();
          }
          if (isVertex) {
            rgbaOffset += 4;
          }
        }
      }
    }
  };
  _PlyReader.defaultPointScale = 1e-3;
  let PlyReader = _PlyReader;
  const SH_C0$1 = 0.28209479177387814;
  const PARSE_FIELD = {
    char: (data, offset, littleEndian) => {
      return data.getInt8(offset);
    },
    uchar: (data, offset, littleEndian) => {
      return data.getUint8(offset);
    },
    short: (data, offset, littleEndian) => {
      return data.getInt16(offset, littleEndian);
    },
    ushort: (data, offset, littleEndian) => {
      return data.getUint16(offset, littleEndian);
    },
    int: (data, offset, littleEndian) => {
      return data.getInt32(offset, littleEndian);
    },
    uint: (data, offset, littleEndian) => {
      return data.getUint32(offset, littleEndian);
    },
    float: (data, offset, littleEndian) => {
      return data.getFloat32(offset, littleEndian);
    },
    double: (data, offset, littleEndian) => {
      return data.getFloat64(offset, littleEndian);
    }
  };
  const SET_FIELD = {
    char: (data, offset, littleEndian, value) => {
      data.setInt8(offset, value);
    },
    uchar: (data, offset, littleEndian, value) => {
      data.setUint8(offset, value);
    },
    short: (data, offset, littleEndian, value) => {
      data.setInt16(offset, value, littleEndian);
    },
    ushort: (data, offset, littleEndian, value) => {
      data.setUint16(offset, value, littleEndian);
    },
    int: (data, offset, littleEndian, value) => {
      data.setInt32(offset, value, littleEndian);
    },
    uint: (data, offset, littleEndian, value) => {
      data.setUint32(offset, value, littleEndian);
    },
    float: (data, offset, littleEndian, value) => {
      data.setFloat32(offset, value, littleEndian);
    },
    double: (data, offset, littleEndian, value) => {
      data.setFloat64(offset, value, littleEndian);
    }
  };
  const FIELD_BYTES = {
    char: 1,
    uchar: 1,
    short: 2,
    ushort: 2,
    int: 4,
    uint: 4,
    float: 4,
    double: 8
  };
  const FIELD_SCALE = {
    char: 127,
    uchar: 255,
    short: 32767,
    ushort: 65535,
    int: 2147483647,
    uint: 4294967295,
    float: 1,
    double: 1
  };
  const NUM_F_REST_TO_NUM_SH = {
    0: 0,
    9: 1,
    24: 2,
    45: 3
  };
  const NUM_SH_TO_NUM_F_REST = {
    0: 0,
    1: 9,
    2: 24,
    3: 45
  };
  const F_REST_REGEX = /^f_rest_([0-9]{1,2})$/;
  function createEmptyItem(properties) {
    const item = {};
    for (const [propertyName, property] of Object.entries(properties)) {
      if (F_REST_REGEX.test(propertyName)) {
        item.f_rest = new Array(getNumSh(properties));
      } else {
        item[propertyName] = property.isList ? [] : 0;
      }
    }
    return item;
  }
  function createParseFn(properties, littleEndian) {
    if (safeToCompile(properties)) {
      return createCompiledParserFn(properties, littleEndian);
    }
    return createDynamicParserFn(properties, littleEndian);
  }
  const UNSAFE_EVAL_ALLOWED = (() => {
    try {
      new Function("return 42;");
    } catch (e) {
      return false;
    }
    return true;
  })();
  const PROPERTY_NAME_REGEX = /^[a-zA-Z0-9_]+$/;
  function safeToCompile(properties) {
    if (!UNSAFE_EVAL_ALLOWED) {
      return false;
    }
    for (const [propertyName, property] of Object.entries(properties)) {
      if (!PROPERTY_NAME_REGEX.test(propertyName)) {
        return false;
      }
      if (property.isList && !PLY_PROPERTY_TYPES.includes(property.countType)) {
        return false;
      }
      if (!PLY_PROPERTY_TYPES.includes(property.type)) {
        return false;
      }
    }
    return true;
  }
  function createCompiledParserFn(properties, littleEndian) {
    const parserSrc = ["let list;"];
    for (const [propertyName, property] of Object.entries(properties)) {
      const fRestMatch = propertyName.match(F_REST_REGEX);
      if (fRestMatch) {
        const fRestIndex = +fRestMatch[1];
        parserSrc.push(
          /*js*/
          \`
        item.f_rest[\${fRestIndex}] = PARSE_FIELD['\${property.type}'](data, offset, \${littleEndian});
        offset += \${FIELD_BYTES[property.type]};
      \`
        );
      } else if (!property.isList) {
        parserSrc.push(
          /*js*/
          \`
        item['\${propertyName}'] = PARSE_FIELD['\${property.type}'](data, offset, \${littleEndian});
        offset += \${FIELD_BYTES[property.type]};
      \`
        );
      } else {
        parserSrc.push(
          /*js*/
          \`
        list = item['\${propertyName}'];
        list.length = PARSE_FIELD['\${property.countType}'](data, offset, \${littleEndian});
        offset += \${FIELD_BYTES[property.countType]};
        for (let i = 0; i < list.length; i++) {
          list[i] = PARSE_FIELD['\${property.type}'](data, offset, \${littleEndian});
          offset += \${FIELD_BYTES[property.type]};
        }
      \`
        );
      }
    }
    parserSrc.push("return offset;");
    const fn = new Function(
      "data",
      "offset",
      "item",
      "PARSE_FIELD",
      parserSrc.join("\\n")
    );
    return (data, offset, item) => fn(data, offset, item, PARSE_FIELD);
  }
  function createDynamicParserFn(properties, littleEndian) {
    const parsers = [];
    for (const [propertyName, property] of Object.entries(properties)) {
      const fRestMatch = propertyName.match(F_REST_REGEX);
      if (fRestMatch) {
        const fRestIndex = +fRestMatch[1];
        parsers.push(
          (data, offset, item) => {
            item.f_rest[fRestIndex] = PARSE_FIELD[property.type](
              data,
              offset,
              littleEndian
            );
            return offset + FIELD_BYTES[property.type];
          }
        );
      } else if (!property.isList) {
        parsers.push(
          (data, offset, item) => {
            item[propertyName] = PARSE_FIELD[property.type](
              data,
              offset,
              littleEndian
            );
            return offset + FIELD_BYTES[property.type];
          }
        );
      } else {
        parsers.push(
          (data, offset, item) => {
            const list = item[propertyName];
            list.length = PARSE_FIELD[property.countType](
              data,
              offset,
              littleEndian
            );
            let currentOffset = offset + FIELD_BYTES[property.countType];
            for (let i2 = 0; i2 < list.length; i2++) {
              list[i2] = PARSE_FIELD[property.type](
                data,
                currentOffset,
                littleEndian
              );
              currentOffset += FIELD_BYTES[property.type];
            }
            return currentOffset;
          }
        );
      }
    }
    return (data, offset, item) => {
      let currentOffset = offset;
      for (let parserIndex = 0; parserIndex < parsers.length; parserIndex++) {
        currentOffset = parsers[parserIndex](data, currentOffset, item);
      }
      return currentOffset;
    };
  }
  function getNumSh(properties) {
    let num_f_rest = 0;
    while (properties[\`f_rest_\${num_f_rest}\`]) {
      num_f_rest += 1;
    }
    const numSh = NUM_F_REST_TO_NUM_SH[num_f_rest];
    if (numSh == null) {
      throw new Error(\`Unsupported number of SH coefficients: \${num_f_rest}\`);
    }
    return numSh;
  }
  var SplatFileType = /* @__PURE__ */ ((SplatFileType2) => {
    SplatFileType2["PLY"] = "ply";
    SplatFileType2["SPZ"] = "spz";
    SplatFileType2["SPLAT"] = "splat";
    SplatFileType2["KSPLAT"] = "ksplat";
    SplatFileType2["PCSOGS"] = "pcsogs";
    SplatFileType2["PCSOGSZIP"] = "pcsogszip";
    return SplatFileType2;
  })(SplatFileType || {});
  function getSplatFileType(fileBytes) {
    const view = new DataView(fileBytes.buffer);
    if ((view.getUint32(0, true) & 16777215) === 7957616) {
      return "ply";
    }
    if ((view.getUint32(0, true) & 16777215) === 559903) {
      const header = decompressPartialGzip(fileBytes, 4);
      const gView = new DataView(header.buffer);
      if (gView.getUint32(0, true) === 1347635022) {
        return "spz";
      }
      return void 0;
    }
    if (view.getUint32(0, true) === 67324752) {
      if (tryPcSogsZip(fileBytes)) {
        return "pcsogszip";
      }
      return void 0;
    }
    return void 0;
  }
  function getFileExtension(pathOrUrl) {
    const noTrailing = pathOrUrl.split(/[?#]/, 1)[0];
    const lastSlash = Math.max(
      noTrailing.lastIndexOf("/"),
      noTrailing.lastIndexOf("\\\\")
    );
    const filename = noTrailing.slice(lastSlash + 1);
    const lastDot = filename.lastIndexOf(".");
    if (lastDot <= 0 || lastDot === filename.length - 1) {
      return "";
    }
    return filename.slice(lastDot + 1).toLowerCase();
  }
  function getSplatFileTypeFromPath(pathOrUrl) {
    const extension = getFileExtension(pathOrUrl);
    if (extension === "ply") {
      return "ply";
    }
    if (extension === "spz") {
      return "spz";
    }
    if (extension === "splat") {
      return "splat";
    }
    if (extension === "ksplat") {
      return "ksplat";
    }
    if (extension === "sog") {
      return "pcsogszip";
    }
    return void 0;
  }
  function tryPcSogs(input) {
    try {
      let text;
      if (typeof input === "string") {
        text = input;
      } else {
        const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
        if (fileBytes.length > 65536) {
          return void 0;
        }
        text = new TextDecoder().decode(fileBytes);
      }
      const json = JSON.parse(text);
      if (!json || typeof json !== "object" || Array.isArray(json)) {
        return void 0;
      }
      const isVersion2 = json.version === 2;
      for (const key of ["means", "scales", "quats", "sh0"]) {
        if (!json[key] || typeof json[key] !== "object" || Array.isArray(json[key])) {
          return void 0;
        }
        if (isVersion2) {
          if (!json[key].files) {
            return void 0;
          }
          if ((key === "scales" || key === "sh0") && !json[key].codebook) {
            return void 0;
          }
          if (key === "means" && (!json[key].mins || !json[key].maxs)) {
            return void 0;
          }
        } else {
          if (!json[key].shape || !json[key].files) {
            return void 0;
          }
          if (key !== "quats" && (!json[key].mins || !json[key].maxs)) {
            return void 0;
          }
        }
      }
      return json;
    } catch {
      return void 0;
    }
  }
  function tryPcSogsZip(input) {
    try {
      const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
      let metaFilename = null;
      const unzipped = unzipSync(fileBytes, {
        filter: ({ name }) => {
          const filename = name.split(/[\\\\/]/).pop();
          if (filename === "meta.json") {
            metaFilename = name;
            return true;
          }
          return false;
        }
      });
      if (!metaFilename) {
        return void 0;
      }
      const json = tryPcSogs(unzipped[metaFilename]);
      if (!json) {
        return void 0;
      }
      return { name: metaFilename, json };
    } catch {
      return void 0;
    }
  }
  class SplatData {
    constructor({ maxSplats = 1 } = {}) {
      this.numSplats = 0;
      this.maxSplats = getTextureSize(maxSplats).maxSplats;
      this.centers = new Float32Array(this.maxSplats * 3);
      this.scales = new Float32Array(this.maxSplats * 3);
      this.quaternions = new Float32Array(this.maxSplats * 4);
      this.opacities = new Float32Array(this.maxSplats);
      this.colors = new Float32Array(this.maxSplats * 3);
    }
    pushSplat() {
      const index = this.numSplats;
      this.ensureIndex(index);
      this.numSplats += 1;
      return index;
    }
    unpushSplat(index) {
      if (index === this.numSplats - 1) {
        this.numSplats -= 1;
      } else {
        throw new Error("Cannot unpush splat from non-last position");
      }
    }
    ensureCapacity(numSplats) {
      if (numSplats > this.maxSplats) {
        const targetSplats = Math.max(numSplats, this.maxSplats * 2);
        const newCenters = new Float32Array(targetSplats * 3);
        const newScales = new Float32Array(targetSplats * 3);
        const newQuaternions = new Float32Array(targetSplats * 4);
        const newOpacities = new Float32Array(targetSplats);
        const newColors = new Float32Array(targetSplats * 3);
        newCenters.set(this.centers);
        newScales.set(this.scales);
        newQuaternions.set(this.quaternions);
        newOpacities.set(this.opacities);
        newColors.set(this.colors);
        this.centers = newCenters;
        this.scales = newScales;
        this.quaternions = newQuaternions;
        this.opacities = newOpacities;
        this.colors = newColors;
        if (this.sh1) {
          const newSh1 = new Float32Array(targetSplats * 9);
          newSh1.set(this.sh1);
          this.sh1 = newSh1;
        }
        if (this.sh2) {
          const newSh2 = new Float32Array(targetSplats * 15);
          newSh2.set(this.sh2);
          this.sh2 = newSh2;
        }
        if (this.sh3) {
          const newSh3 = new Float32Array(targetSplats * 21);
          newSh3.set(this.sh3);
          this.sh3 = newSh3;
        }
        this.maxSplats = targetSplats;
      }
    }
    ensureIndex(index) {
      this.ensureCapacity(index + 1);
    }
    setCenter(index, x2, y, z) {
      this.centers[index * 3] = x2;
      this.centers[index * 3 + 1] = y;
      this.centers[index * 3 + 2] = z;
    }
    setScale(index, scaleX, scaleY, scaleZ) {
      this.scales[index * 3] = scaleX;
      this.scales[index * 3 + 1] = scaleY;
      this.scales[index * 3 + 2] = scaleZ;
    }
    setQuaternion(index, x2, y, z, w) {
      this.quaternions[index * 4] = x2;
      this.quaternions[index * 4 + 1] = y;
      this.quaternions[index * 4 + 2] = z;
      this.quaternions[index * 4 + 3] = w;
    }
    setOpacity(index, opacity) {
      this.opacities[index] = opacity;
    }
    setColor(index, r, g, b) {
      this.colors[index * 3] = r;
      this.colors[index * 3 + 1] = g;
      this.colors[index * 3 + 2] = b;
    }
    setSh1(index, sh1) {
      if (!this.sh1) {
        this.sh1 = new Float32Array(this.maxSplats * 9);
      }
      for (let j = 0; j < 9; ++j) {
        this.sh1[index * 9 + j] = sh1[j];
      }
    }
    setSh2(index, sh2) {
      if (!this.sh2) {
        this.sh2 = new Float32Array(this.maxSplats * 15);
      }
      for (let j = 0; j < 15; ++j) {
        this.sh2[index * 15 + j] = sh2[j];
      }
    }
    setSh3(index, sh3) {
      if (!this.sh3) {
        this.sh3 = new Float32Array(this.maxSplats * 21);
      }
      for (let j = 0; j < 21; ++j) {
        this.sh3[index * 21 + j] = sh3[j];
      }
    }
  }
  async function unpackPcSogs(json, extraFiles, splatEncoding) {
    const isVersion2 = "version" in json;
    if (!isVersion2 && json.quats.encoding !== "quaternion_packed") {
      throw new Error("Unsupported quaternion encoding");
    }
    const numSplats = isVersion2 ? json.count : json.means.shape[0];
    const maxSplats = computeMaxSplats(numSplats);
    const packedArray = new Uint32Array(maxSplats * 4);
    const extra = {};
    const meansPromise = Promise.all([
      decodeImageRgba(extraFiles[json.means.files[0]]),
      decodeImageRgba(extraFiles[json.means.files[1]])
    ]).then((means) => {
      for (let i2 = 0; i2 < numSplats; ++i2) {
        const i4 = i2 * 4;
        const fx = (means[0][i4 + 0] + (means[1][i4 + 0] << 8)) / 65535;
        const fy = (means[0][i4 + 1] + (means[1][i4 + 1] << 8)) / 65535;
        const fz = (means[0][i4 + 2] + (means[1][i4 + 2] << 8)) / 65535;
        let x2 = json.means.mins[0] + (json.means.maxs[0] - json.means.mins[0]) * fx;
        let y = json.means.mins[1] + (json.means.maxs[1] - json.means.mins[1]) * fy;
        let z = json.means.mins[2] + (json.means.maxs[2] - json.means.mins[2]) * fz;
        x2 = Math.sign(x2) * (Math.exp(Math.abs(x2)) - 1);
        y = Math.sign(y) * (Math.exp(Math.abs(y)) - 1);
        z = Math.sign(z) * (Math.exp(Math.abs(z)) - 1);
        setPackedSplatCenter(packedArray, i2, x2, y, z);
      }
    });
    const scalesPromise = decodeImageRgba(extraFiles[json.scales.files[0]]).then(
      (scales) => {
        let xLookup;
        let yLookup;
        let zLookup;
        if (isVersion2) {
          xLookup = yLookup = zLookup = json.scales.codebook.map((x2) => Math.exp(x2));
        } else {
          xLookup = new Array(256).fill(0).map(
            (_, i2) => json.scales.mins[0] + (json.scales.maxs[0] - json.scales.mins[0]) * (i2 / 255)
          ).map((x2) => Math.exp(x2));
          yLookup = new Array(256).fill(0).map(
            (_, i2) => json.scales.mins[1] + (json.scales.maxs[1] - json.scales.mins[1]) * (i2 / 255)
          ).map((x2) => Math.exp(x2));
          zLookup = new Array(256).fill(0).map(
            (_, i2) => json.scales.mins[2] + (json.scales.maxs[2] - json.scales.mins[2]) * (i2 / 255)
          ).map((x2) => Math.exp(x2));
        }
        for (let i2 = 0; i2 < numSplats; ++i2) {
          const i4 = i2 * 4;
          setPackedSplatScales(
            packedArray,
            i2,
            xLookup[scales[i4 + 0]],
            yLookup[scales[i4 + 1]],
            zLookup[scales[i4 + 2]],
            splatEncoding
          );
        }
      }
    );
    const quatsPromise = decodeImageRgba(extraFiles[json.quats.files[0]]).then(
      (quats) => {
        const SQRT2 = Math.sqrt(2);
        const lookup = new Array(256).fill(0).map((_, i2) => (i2 / 255 - 0.5) * SQRT2);
        for (let i2 = 0; i2 < numSplats; ++i2) {
          const i4 = i2 * 4;
          const r0 = lookup[quats[i4 + 0]];
          const r1 = lookup[quats[i4 + 1]];
          const r2 = lookup[quats[i4 + 2]];
          const rr = Math.sqrt(Math.max(0, 1 - r0 * r0 - r1 * r1 - r2 * r2));
          const rOrder = quats[i4 + 3] - 252;
          const quatX = rOrder === 0 ? r0 : rOrder === 1 ? rr : r1;
          const quatY = rOrder <= 1 ? r1 : rOrder === 2 ? rr : r2;
          const quatZ = rOrder <= 2 ? r2 : rr;
          const quatW = rOrder === 0 ? rr : r0;
          setPackedSplatQuat(packedArray, i2, quatX, quatY, quatZ, quatW);
        }
      }
    );
    const sh0Promise = decodeImageRgba(extraFiles[json.sh0.files[0]]).then(
      (sh0) => {
        const SH_C02 = 0.28209479177387814;
        let rLookup;
        let gLookup;
        let bLookup;
        let aLookup;
        if (isVersion2) {
          rLookup = gLookup = bLookup = json.sh0.codebook.map((x2) => SH_C02 * x2 + 0.5);
          aLookup = new Array(256).fill(0).map((_, i2) => i2 / 255);
        } else {
          rLookup = new Array(256).fill(0).map(
            (_, i2) => json.sh0.mins[0] + (json.sh0.maxs[0] - json.sh0.mins[0]) * (i2 / 255)
          ).map((x2) => SH_C02 * x2 + 0.5);
          gLookup = new Array(256).fill(0).map(
            (_, i2) => json.sh0.mins[1] + (json.sh0.maxs[1] - json.sh0.mins[1]) * (i2 / 255)
          ).map((x2) => SH_C02 * x2 + 0.5);
          bLookup = new Array(256).fill(0).map(
            (_, i2) => json.sh0.mins[2] + (json.sh0.maxs[2] - json.sh0.mins[2]) * (i2 / 255)
          ).map((x2) => SH_C02 * x2 + 0.5);
          aLookup = new Array(256).fill(0).map(
            (_, i2) => json.sh0.mins[3] + (json.sh0.maxs[3] - json.sh0.mins[3]) * (i2 / 255)
          ).map((x2) => 1 / (1 + Math.exp(-x2)));
        }
        for (let i2 = 0; i2 < numSplats; ++i2) {
          const i4 = i2 * 4;
          setPackedSplatRgba(
            packedArray,
            i2,
            rLookup[sh0[i4 + 0]],
            gLookup[sh0[i4 + 1]],
            bLookup[sh0[i4 + 2]],
            aLookup[sh0[i4 + 3]],
            splatEncoding
          );
        }
      }
    );
    const promises = [meansPromise, scalesPromise, quatsPromise, sh0Promise];
    if (json.shN) {
      const useSH3 = isVersion2 ? json.shN.bands >= 3 : json.shN.shape[1] >= 48 - 3;
      const useSH2 = isVersion2 ? json.shN.bands >= 2 : json.shN.shape[1] >= 27 - 3;
      const useSH1 = isVersion2 ? json.shN.bands >= 1 : json.shN.shape[1] >= 12 - 3;
      if (useSH1) extra.sh1 = new Uint32Array(numSplats * 2);
      if (useSH2) extra.sh2 = new Uint32Array(numSplats * 4);
      if (useSH3) extra.sh3 = new Uint32Array(numSplats * 4);
      const sh1 = new Float32Array(9);
      const sh2 = new Float32Array(15);
      const sh3 = new Float32Array(21);
      const shN = json.shN;
      const shNPromise = Promise.all([
        decodeImage(extraFiles[json.shN.files[0]]),
        decodeImage(extraFiles[json.shN.files[1]])
      ]).then(([centroids, labels]) => {
        const lookup = "codebook" in shN ? shN.codebook : new Array(256).fill(0).map((_, i2) => shN.mins + (shN.maxs - shN.mins) * (i2 / 255));
        for (let i2 = 0; i2 < numSplats; ++i2) {
          const i4 = i2 * 4;
          const label = labels.rgba[i4 + 0] + (labels.rgba[i4 + 1] << 8);
          const col = (label & 63) * 15;
          const row = label >>> 6;
          const offset = row * centroids.width + col;
          for (let d = 0; d < 3; ++d) {
            if (useSH1) {
              for (let k = 0; k < 3; ++k) {
                sh1[k * 3 + d] = lookup[centroids.rgba[(offset + k) * 4 + d]];
              }
            }
            if (useSH2) {
              for (let k = 0; k < 5; ++k) {
                sh2[k * 3 + d] = lookup[centroids.rgba[(offset + 3 + k) * 4 + d]];
              }
            }
            if (useSH3) {
              for (let k = 0; k < 7; ++k) {
                sh3[k * 3 + d] = lookup[centroids.rgba[(offset + 8 + k) * 4 + d]];
              }
            }
          }
          if (useSH1)
            encodeSh1Rgb(extra.sh1, i2, sh1, splatEncoding);
          if (useSH2)
            encodeSh2Rgb(extra.sh2, i2, sh2, splatEncoding);
          if (useSH3)
            encodeSh3Rgb(extra.sh3, i2, sh3, splatEncoding);
        }
      });
      promises.push(shNPromise);
    }
    await Promise.all(promises);
    return { packedArray, numSplats, extra };
  }
  let offscreenGlContext = null;
  async function decodeImage(fileBytes) {
    if (!offscreenGlContext) {
      const canvas = new OffscreenCanvas(1, 1);
      offscreenGlContext = canvas.getContext("webgl2");
      if (!offscreenGlContext) {
        throw new Error("Failed to create WebGL2 context");
      }
    }
    const imageBlob = new Blob([fileBytes]);
    const bitmap = await createImageBitmap(imageBlob, {
      premultiplyAlpha: "none"
    });
    const gl = offscreenGlContext;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    const data = new Uint8Array(bitmap.width * bitmap.height * 4);
    gl.readPixels(
      0,
      0,
      bitmap.width,
      bitmap.height,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      data
    );
    gl.deleteTexture(texture);
    gl.deleteFramebuffer(framebuffer);
    return { rgba: data, width: bitmap.width, height: bitmap.height };
  }
  async function decodeImageRgba(fileBytes) {
    const { rgba } = await decodeImage(fileBytes);
    return rgba;
  }
  async function unpackPcSogsZip(fileBytes, splatEncoding) {
    var _a2;
    const nameJson = tryPcSogsZip(fileBytes);
    if (!nameJson) {
      throw new Error("Invalid PC SOGS zip file");
    }
    const { name, json } = nameJson;
    const lastSlash = name.lastIndexOf("/");
    const lastBackslash = name.lastIndexOf("\\\\");
    const prefix = name.slice(0, Math.max(lastSlash, lastBackslash) + 1);
    const fileMap = /* @__PURE__ */ new Map();
    const refFiles = [
      ...json.means.files,
      ...json.scales.files,
      ...json.quats.files,
      ...json.sh0.files,
      ...((_a2 = json.shN) == null ? void 0 : _a2.files) ?? []
    ];
    for (const file of refFiles) {
      fileMap.set(prefix + file, file);
    }
    const unzipped = await new Promise(
      (resolve, reject) => {
        unzip(
          fileBytes,
          {
            filter: ({ name: name2 }) => {
              return fileMap.has(name2);
            }
          },
          (err2, files) => {
            if (err2) {
              reject(err2);
            } else {
              resolve(files);
            }
          }
        );
      }
    );
    const extraFiles = {};
    for (const [full, name2] of fileMap.entries()) {
      extraFiles[name2] = unzipped[full];
    }
    return await unpackPcSogs(json, extraFiles, splatEncoding);
  }
  class SpzReader {
    constructor({ fileBytes }) {
      this.version = -1;
      this.numSplats = 0;
      this.shDegree = 0;
      this.fractionalBits = 0;
      this.flags = 0;
      this.flagAntiAlias = false;
      this.reserved = 0;
      this.headerParsed = false;
      this.parsed = false;
      this.fileBytes = fileBytes instanceof ArrayBuffer ? new Uint8Array(fileBytes) : fileBytes;
      this.reader = new GunzipReader({ fileBytes: this.fileBytes });
    }
    async parseHeader() {
      if (this.headerParsed) {
        throw new Error("SPZ file header already parsed");
      }
      const header = new DataView((await this.reader.read(16)).buffer);
      if (header.getUint32(0, true) !== 1347635022) {
        throw new Error("Invalid SPZ file");
      }
      this.version = header.getUint32(4, true);
      if (this.version < 1 || this.version > 3) {
        throw new Error(\`Unsupported SPZ version: \${this.version}\`);
      }
      this.numSplats = header.getUint32(8, true);
      this.shDegree = header.getUint8(12);
      this.fractionalBits = header.getUint8(13);
      this.flags = header.getUint8(14);
      this.flagAntiAlias = (this.flags & 1) !== 0;
      this.reserved = header.getUint8(15);
      this.headerParsed = true;
      this.parsed = false;
    }
    async parseSplats(centerCallback, alphaCallback, rgbCallback, scalesCallback, quatCallback, shCallback) {
      if (!this.headerParsed) {
        throw new Error("SPZ file header must be parsed first");
      }
      if (this.parsed) {
        throw new Error("SPZ file already parsed");
      }
      this.parsed = true;
      if (this.version === 1) {
        const centerBytes = await this.reader.read(this.numSplats * 3 * 2);
        const centerUint16 = new Uint16Array(centerBytes.buffer);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i3 = i2 * 3;
          const x2 = fromHalf(centerUint16[i3]);
          const y = fromHalf(centerUint16[i3 + 1]);
          const z = fromHalf(centerUint16[i3 + 2]);
          centerCallback == null ? void 0 : centerCallback(i2, x2, y, z);
        }
      } else if (this.version === 2 || this.version === 3) {
        const fixed = 1 << this.fractionalBits;
        const centerBytes = await this.reader.read(this.numSplats * 3 * 3);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i9 = i2 * 9;
          const x2 = ((centerBytes[i9 + 2] << 24 | centerBytes[i9 + 1] << 16 | centerBytes[i9] << 8) >> 8) / fixed;
          const y = ((centerBytes[i9 + 5] << 24 | centerBytes[i9 + 4] << 16 | centerBytes[i9 + 3] << 8) >> 8) / fixed;
          const z = ((centerBytes[i9 + 8] << 24 | centerBytes[i9 + 7] << 16 | centerBytes[i9 + 6] << 8) >> 8) / fixed;
          centerCallback == null ? void 0 : centerCallback(i2, x2, y, z);
        }
      } else {
        throw new Error("Unreachable");
      }
      {
        const bytes = await this.reader.read(this.numSplats);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          alphaCallback == null ? void 0 : alphaCallback(i2, bytes[i2] / 255);
        }
      }
      {
        const rgbBytes = await this.reader.read(this.numSplats * 3);
        const scale = SH_C0 / 0.15;
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i3 = i2 * 3;
          const r = (rgbBytes[i3] / 255 - 0.5) * scale + 0.5;
          const g = (rgbBytes[i3 + 1] / 255 - 0.5) * scale + 0.5;
          const b = (rgbBytes[i3 + 2] / 255 - 0.5) * scale + 0.5;
          rgbCallback == null ? void 0 : rgbCallback(i2, r, g, b);
        }
      }
      {
        const scalesBytes = await this.reader.read(this.numSplats * 3);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i3 = i2 * 3;
          const scaleX = Math.exp(scalesBytes[i3] / 16 - 10);
          const scaleY = Math.exp(scalesBytes[i3 + 1] / 16 - 10);
          const scaleZ = Math.exp(scalesBytes[i3 + 2] / 16 - 10);
          scalesCallback == null ? void 0 : scalesCallback(i2, scaleX, scaleY, scaleZ);
        }
      }
      if (this.version === 3) {
        const maxValue = 1 / Math.sqrt(2);
        const quatBytes = await this.reader.read(this.numSplats * 4);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i3 = i2 * 4;
          const quaternion = [0, 0, 0, 0];
          const values = [
            quatBytes[i3],
            quatBytes[i3 + 1],
            quatBytes[i3 + 2],
            quatBytes[i3 + 3]
          ];
          const combinedValues = values[0] + (values[1] << 8) + (values[2] << 16) + (values[3] << 24);
          const valueMask = (1 << 9) - 1;
          const largestIndex = combinedValues >>> 30;
          let remainingValues = combinedValues;
          let sumSquares = 0;
          for (let i22 = 3; i22 >= 0; --i22) {
            if (i22 !== largestIndex) {
              const value = remainingValues & valueMask;
              const sign = remainingValues >>> 9 & 1;
              remainingValues = remainingValues >>> 10;
              quaternion[i22] = maxValue * (value / valueMask);
              quaternion[i22] = sign === 0 ? quaternion[i22] : -quaternion[i22];
              sumSquares += quaternion[i22] * quaternion[i22];
            }
          }
          const square = 1 - sumSquares;
          quaternion[largestIndex] = Math.sqrt(Math.max(square, 0));
          quatCallback == null ? void 0 : quatCallback(
            i2,
            quaternion[0],
            quaternion[1],
            quaternion[2],
            quaternion[3]
          );
        }
      } else {
        const quatBytes = await this.reader.read(this.numSplats * 3);
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          const i3 = i2 * 3;
          const quatX = quatBytes[i3] / 127.5 - 1;
          const quatY = quatBytes[i3 + 1] / 127.5 - 1;
          const quatZ = quatBytes[i3 + 2] / 127.5 - 1;
          const quatW = Math.sqrt(
            Math.max(0, 1 - quatX * quatX - quatY * quatY - quatZ * quatZ)
          );
          quatCallback == null ? void 0 : quatCallback(i2, quatX, quatY, quatZ, quatW);
        }
      }
      if (shCallback && this.shDegree >= 1) {
        const sh1 = new Float32Array(3 * 3);
        const sh2 = this.shDegree >= 2 ? new Float32Array(5 * 3) : void 0;
        const sh3 = this.shDegree >= 3 ? new Float32Array(7 * 3) : void 0;
        const shBytes = await this.reader.read(
          this.numSplats * SH_DEGREE_TO_VECS[this.shDegree] * 3
        );
        let offset = 0;
        for (let i2 = 0; i2 < this.numSplats; i2++) {
          for (let j = 0; j < 9; ++j) {
            sh1[j] = (shBytes[offset + j] - 128) / 128;
          }
          offset += 9;
          if (sh2) {
            for (let j = 0; j < 15; ++j) {
              sh2[j] = (shBytes[offset + j] - 128) / 128;
            }
            offset += 15;
          }
          if (sh3) {
            for (let j = 0; j < 21; ++j) {
              sh3[j] = (shBytes[offset + j] - 128) / 128;
            }
            offset += 21;
          }
          shCallback == null ? void 0 : shCallback(i2, sh1, sh2, sh3);
        }
      }
    }
  }
  const SH_DEGREE_TO_VECS = { 1: 3, 2: 8, 3: 15 };
  const SH_C0 = 0.28209479177387814;
  const SPZ_MAGIC = 1347635022;
  const SPZ_VERSION = 3;
  const FLAG_ANTIALIASED = 1;
  class SpzWriter {
    constructor({
      numSplats,
      shDegree,
      fractionalBits = 12,
      flagAntiAlias = true
    }) {
      this.clippedCount = 0;
      const splatSize = 9 + // Position
      1 + // Opacity
      3 + // Scale
      3 + // DC-rgb
      4 + // Rotation
      (shDegree >= 1 ? 9 : 0) + (shDegree >= 2 ? 15 : 0) + (shDegree >= 3 ? 21 : 0);
      const bufferSize = 16 + numSplats * splatSize;
      this.buffer = new ArrayBuffer(bufferSize);
      this.view = new DataView(this.buffer);
      this.view.setUint32(0, SPZ_MAGIC, true);
      this.view.setUint32(4, SPZ_VERSION, true);
      this.view.setUint32(8, numSplats, true);
      this.view.setUint8(12, shDegree);
      this.view.setUint8(13, fractionalBits);
      this.view.setUint8(14, flagAntiAlias ? FLAG_ANTIALIASED : 0);
      this.view.setUint8(15, 0);
      this.numSplats = numSplats;
      this.shDegree = shDegree;
      this.fractionalBits = fractionalBits;
      this.fraction = 1 << fractionalBits;
      this.flagAntiAlias = flagAntiAlias;
    }
    setCenter(index, x2, y, z) {
      const xRounded = Math.round(x2 * this.fraction);
      const xInt = Math.max(-8388607, Math.min(8388607, xRounded));
      const yRounded = Math.round(y * this.fraction);
      const yInt = Math.max(-8388607, Math.min(8388607, yRounded));
      const zRounded = Math.round(z * this.fraction);
      const zInt = Math.max(-8388607, Math.min(8388607, zRounded));
      const clipped = xRounded !== xInt || yRounded !== yInt || zRounded !== zInt;
      if (clipped) {
        this.clippedCount += 1;
      }
      const i9 = index * 9;
      const base = 16 + i9;
      this.view.setUint8(base, xInt & 255);
      this.view.setUint8(base + 1, xInt >> 8 & 255);
      this.view.setUint8(base + 2, xInt >> 16 & 255);
      this.view.setUint8(base + 3, yInt & 255);
      this.view.setUint8(base + 4, yInt >> 8 & 255);
      this.view.setUint8(base + 5, yInt >> 16 & 255);
      this.view.setUint8(base + 6, zInt & 255);
      this.view.setUint8(base + 7, zInt >> 8 & 255);
      this.view.setUint8(base + 8, zInt >> 16 & 255);
    }
    setAlpha(index, alpha) {
      const base = 16 + this.numSplats * 9 + index;
      this.view.setUint8(
        base,
        Math.max(0, Math.min(255, Math.round(alpha * 255)))
      );
    }
    static scaleRgb(r) {
      const v = ((r - 0.5) / (SH_C0 / 0.15) + 0.5) * 255;
      return Math.max(0, Math.min(255, Math.round(v)));
    }
    setRgb(index, r, g, b) {
      const base = 16 + this.numSplats * 10 + index * 3;
      this.view.setUint8(base, SpzWriter.scaleRgb(r));
      this.view.setUint8(base + 1, SpzWriter.scaleRgb(g));
      this.view.setUint8(base + 2, SpzWriter.scaleRgb(b));
    }
    setScale(index, scaleX, scaleY, scaleZ) {
      const base = 16 + this.numSplats * 13 + index * 3;
      this.view.setUint8(
        base,
        Math.max(0, Math.min(255, Math.round((Math.log(scaleX) + 10) * 16)))
      );
      this.view.setUint8(
        base + 1,
        Math.max(0, Math.min(255, Math.round((Math.log(scaleY) + 10) * 16)))
      );
      this.view.setUint8(
        base + 2,
        Math.max(0, Math.min(255, Math.round((Math.log(scaleZ) + 10) * 16)))
      );
    }
    setQuat(index, ...q) {
      const base = 16 + this.numSplats * 16 + index * 4;
      const quat = normalize(q);
      let iLargest = 0;
      for (let i2 = 1; i2 < 4; ++i2) {
        if (Math.abs(quat[i2]) > Math.abs(quat[iLargest])) {
          iLargest = i2;
        }
      }
      const negate = quat[iLargest] < 0 ? 1 : 0;
      let comp = iLargest;
      for (let i2 = 0; i2 < 4; ++i2) {
        if (i2 !== iLargest) {
          const negbit = (quat[i2] < 0 ? 1 : 0) ^ negate;
          const mag = Math.floor(
            ((1 << 9) - 1) * (Math.abs(quat[i2]) / Math.SQRT1_2) + 0.5
          );
          comp = comp << 10 | negbit << 9 | mag;
        }
      }
      this.view.setUint8(base, comp & 255);
      this.view.setUint8(base + 1, comp >> 8 & 255);
      this.view.setUint8(base + 2, comp >> 16 & 255);
      this.view.setUint8(base + 3, comp >>> 24 & 255);
    }
    static quantizeSh(sh, bits2) {
      const value = Math.round(sh * 128) + 128;
      const bucketSize = 1 << 8 - bits2;
      const quantized = Math.floor((value + bucketSize / 2) / bucketSize) * bucketSize;
      return Math.max(0, Math.min(255, quantized));
    }
    setSh(index, sh1, sh2, sh3) {
      const shVecs = SH_DEGREE_TO_VECS[this.shDegree] || 0;
      const base1 = 16 + this.numSplats * 20 + index * shVecs * 3;
      for (let j = 0; j < 9; ++j) {
        this.view.setUint8(base1 + j, SpzWriter.quantizeSh(sh1[j], 5));
      }
      if (sh2) {
        const base2 = base1 + 9;
        for (let j = 0; j < 15; ++j) {
          this.view.setUint8(base2 + j, SpzWriter.quantizeSh(sh2[j], 4));
        }
        if (sh3) {
          const base3 = base2 + 15;
          for (let j = 0; j < 21; ++j) {
            this.view.setUint8(base3 + j, SpzWriter.quantizeSh(sh3[j], 4));
          }
        }
      }
    }
    async finalize() {
      const input = new Uint8Array(this.buffer);
      const stream = new ReadableStream({
        async start(controller) {
          controller.enqueue(input);
          controller.close();
        }
      });
      const compressed = stream.pipeThrough(new CompressionStream("gzip"));
      const response = new Response(compressed);
      const buffer = await response.arrayBuffer();
      console.log(
        "Compressed",
        input.length,
        "bytes to",
        buffer.byteLength,
        "bytes"
      );
      return new Uint8Array(buffer);
    }
  }
  async function transcodeSpz(input) {
    var _a2, _b2, _c;
    const splats = new SplatData();
    const {
      inputs,
      clipXyz,
      maxSh,
      fractionalBits = 12,
      opacityThreshold
    } = input;
    for (const input2 of inputs) {
      let transformPos = function(pos) {
        pos.multiplyScalar(scale);
        pos.applyQuaternion(quaternion);
        pos.add(translate);
        return pos;
      }, transformScales = function(scales) {
        scales.multiplyScalar(scale);
        return scales;
      }, transformQuaternion = function(quat) {
        quat.premultiply(quaternion);
        return quat;
      }, withinClip = function(p) {
        return !clip || clip.containsPoint(p);
      }, withinOpacity = function(opacity) {
        return opacityThreshold !== void 0 ? opacity >= opacityThreshold : true;
      };
      const scale = ((_a2 = input2.transform) == null ? void 0 : _a2.scale) ?? 1;
      const quaternion = new Quaternion().fromArray(
        ((_b2 = input2.transform) == null ? void 0 : _b2.quaternion) ?? [0, 0, 0, 1]
      );
      const translate = new Vector3().fromArray(
        ((_c = input2.transform) == null ? void 0 : _c.translate) ?? [0, 0, 0]
      );
      const clip = clipXyz ? new Box3(
        new Vector3().fromArray(clipXyz.min),
        new Vector3().fromArray(clipXyz.max)
      ) : void 0;
      let fileType = input2.fileType;
      if (!fileType) {
        fileType = getSplatFileType(input2.fileBytes);
        if (!fileType && input2.pathOrUrl) {
          fileType = getSplatFileTypeFromPath(input2.pathOrUrl);
        }
      }
      switch (fileType) {
        case SplatFileType.PLY: {
          const ply = new PlyReader({ fileBytes: input2.fileBytes });
          await ply.parseHeader();
          let lastIndex = null;
          ply.parseSplats(
            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
              const center = transformPos(new Vector3(x2, y, z));
              if (withinClip(center) && withinOpacity(opacity)) {
                lastIndex = splats.pushSplat();
                splats.setCenter(lastIndex, center.x, center.y, center.z);
                const scales = transformScales(
                  new Vector3(scaleX, scaleY, scaleZ)
                );
                splats.setScale(lastIndex, scales.x, scales.y, scales.z);
                const quaternion2 = transformQuaternion(
                  new Quaternion(quatX, quatY, quatZ, quatW)
                );
                splats.setQuaternion(
                  lastIndex,
                  quaternion2.x,
                  quaternion2.y,
                  quaternion2.z,
                  quaternion2.w
                );
                splats.setOpacity(lastIndex, opacity);
                splats.setColor(lastIndex, r, g, b);
              } else {
                lastIndex = null;
              }
            },
            (index, sh1, sh2, sh3) => {
              if (sh1 && lastIndex !== null) {
                splats.setSh1(lastIndex, sh1);
              }
              if (sh2 && lastIndex !== null) {
                splats.setSh2(lastIndex, sh2);
              }
              if (sh3 && lastIndex !== null) {
                splats.setSh3(lastIndex, sh3);
              }
            }
          );
          break;
        }
        case SplatFileType.SPZ: {
          const spz2 = new SpzReader({ fileBytes: input2.fileBytes });
          await spz2.parseHeader();
          const mapping = new Int32Array(spz2.numSplats);
          mapping.fill(-1);
          const centers = new Float32Array(spz2.numSplats * 3);
          const center = new Vector3();
          spz2.parseSplats(
            (index, x2, y, z) => {
              const center2 = transformPos(new Vector3(x2, y, z));
              centers[index * 3] = center2.x;
              centers[index * 3 + 1] = center2.y;
              centers[index * 3 + 2] = center2.z;
            },
            (index, alpha) => {
              center.fromArray(centers, index * 3);
              if (withinClip(center) && withinOpacity(alpha)) {
                mapping[index] = splats.pushSplat();
                splats.setCenter(mapping[index], center.x, center.y, center.z);
                splats.setOpacity(mapping[index], alpha);
              }
            },
            (index, r, g, b) => {
              if (mapping[index] >= 0) {
                splats.setColor(mapping[index], r, g, b);
              }
            },
            (index, scaleX, scaleY, scaleZ) => {
              if (mapping[index] >= 0) {
                const scales = transformScales(
                  new Vector3(scaleX, scaleY, scaleZ)
                );
                splats.setScale(mapping[index], scales.x, scales.y, scales.z);
              }
            },
            (index, quatX, quatY, quatZ, quatW) => {
              if (mapping[index] >= 0) {
                const quaternion2 = transformQuaternion(
                  new Quaternion(quatX, quatY, quatZ, quatW)
                );
                splats.setQuaternion(
                  mapping[index],
                  quaternion2.x,
                  quaternion2.y,
                  quaternion2.z,
                  quaternion2.w
                );
              }
            },
            (index, sh1, sh2, sh3) => {
              if (mapping[index] >= 0) {
                splats.setSh1(mapping[index], sh1);
                if (sh2) {
                  splats.setSh2(mapping[index], sh2);
                }
                if (sh3) {
                  splats.setSh3(mapping[index], sh3);
                }
              }
            }
          );
          break;
        }
        case SplatFileType.SPLAT:
          decodeAntiSplat(
            input2.fileBytes,
            (numSplats) => {
            },
            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
              const center = transformPos(new Vector3(x2, y, z));
              if (withinClip(center) && withinOpacity(opacity)) {
                const index2 = splats.pushSplat();
                splats.setCenter(index2, center.x, center.y, center.z);
                const scales = transformScales(
                  new Vector3(scaleX, scaleY, scaleZ)
                );
                splats.setScale(index2, scales.x, scales.y, scales.z);
                const quaternion2 = transformQuaternion(
                  new Quaternion(quatX, quatY, quatZ, quatW)
                );
                splats.setQuaternion(
                  index2,
                  quaternion2.x,
                  quaternion2.y,
                  quaternion2.z,
                  quaternion2.w
                );
                splats.setOpacity(index2, opacity);
                splats.setColor(index2, r, g, b);
              }
            }
          );
          break;
        case SplatFileType.KSPLAT: {
          let lastIndex = null;
          decodeKsplat(
            input2.fileBytes,
            (numSplats) => {
            },
            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
              const center = transformPos(new Vector3(x2, y, z));
              if (withinClip(center) && withinOpacity(opacity)) {
                lastIndex = splats.pushSplat();
                splats.setCenter(lastIndex, center.x, center.y, center.z);
                const scales = transformScales(
                  new Vector3(scaleX, scaleY, scaleZ)
                );
                splats.setScale(lastIndex, scales.x, scales.y, scales.z);
                const quaternion2 = transformQuaternion(
                  new Quaternion(quatX, quatY, quatZ, quatW)
                );
                splats.setQuaternion(
                  lastIndex,
                  quaternion2.x,
                  quaternion2.y,
                  quaternion2.z,
                  quaternion2.w
                );
                splats.setOpacity(lastIndex, opacity);
                splats.setColor(lastIndex, r, g, b);
              } else {
                lastIndex = null;
              }
            },
            (index, sh1, sh2, sh3) => {
              if (lastIndex !== null) {
                splats.setSh1(lastIndex, sh1);
                if (sh2) {
                  splats.setSh2(lastIndex, sh2);
                }
                if (sh3) {
                  splats.setSh3(lastIndex, sh3);
                }
              }
            }
          );
          break;
        }
        default:
          throw new Error(\`transcodeSpz not implemented for \${fileType}\`);
      }
    }
    const shDegree = Math.min(
      maxSh ?? 3,
      splats.sh3 ? 3 : splats.sh2 ? 2 : splats.sh1 ? 1 : 0
    );
    const spz = new SpzWriter({
      numSplats: splats.numSplats,
      shDegree,
      fractionalBits,
      flagAntiAlias: true
    });
    for (let i2 = 0; i2 < splats.numSplats; ++i2) {
      const i3 = i2 * 3;
      const i4 = i2 * 4;
      spz.setCenter(
        i2,
        splats.centers[i3],
        splats.centers[i3 + 1],
        splats.centers[i3 + 2]
      );
      spz.setScale(
        i2,
        splats.scales[i3],
        splats.scales[i3 + 1],
        splats.scales[i3 + 2]
      );
      spz.setQuat(
        i2,
        splats.quaternions[i4],
        splats.quaternions[i4 + 1],
        splats.quaternions[i4 + 2],
        splats.quaternions[i4 + 3]
      );
      spz.setAlpha(i2, splats.opacities[i2]);
      spz.setRgb(
        i2,
        splats.colors[i3],
        splats.colors[i3 + 1],
        splats.colors[i3 + 2]
      );
      if (splats.sh1 && shDegree >= 1) {
        spz.setSh(
          i2,
          splats.sh1.slice(i2 * 9, (i2 + 1) * 9),
          shDegree >= 2 && splats.sh2 ? splats.sh2.slice(i2 * 15, (i2 + 1) * 15) : void 0,
          shDegree >= 3 && splats.sh3 ? splats.sh3.slice(i2 * 21, (i2 + 1) * 21) : void 0
        );
      }
    }
    const spzBytes = await spz.finalize();
    return { fileBytes: spzBytes, clippedCount: spz.clippedCount };
  }
  async function onMessage(event) {
    const { name, args, id } = event.data;
    let result = void 0;
    let error = void 0;
    try {
      switch (name) {
        case "unpackPly": {
          const { packedArray, fileBytes, splatEncoding } = args;
          const decoded = await unpackPly({
            packedArray,
            fileBytes,
            splatEncoding
          });
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray,
            extra: decoded.extra
          };
          break;
        }
        case "decodeSpz": {
          const { fileBytes, splatEncoding } = args;
          const decoded = await unpackSpz(fileBytes, splatEncoding);
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray,
            extra: decoded.extra
          };
          break;
        }
        case "decodeAntiSplat": {
          const { fileBytes, splatEncoding } = args;
          const decoded = unpackAntiSplat(fileBytes, splatEncoding);
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray
          };
          break;
        }
        case "decodeKsplat": {
          const { fileBytes, splatEncoding } = args;
          const decoded = unpackKsplat(fileBytes, splatEncoding);
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray,
            extra: decoded.extra
          };
          break;
        }
        case "decodePcSogs": {
          const { fileBytes, extraFiles, splatEncoding } = args;
          const json = JSON.parse(
            new TextDecoder().decode(fileBytes)
          );
          const decoded = await unpackPcSogs(json, extraFiles, splatEncoding);
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray,
            extra: decoded.extra
          };
          break;
        }
        case "decodePcSogsZip": {
          const { fileBytes, splatEncoding } = args;
          const decoded = await unpackPcSogsZip(fileBytes, splatEncoding);
          result = {
            id,
            numSplats: decoded.numSplats,
            packedArray: decoded.packedArray,
            extra: decoded.extra
          };
          break;
        }
        case "sortSplats": {
          const { totalSplats, readback, ordering } = args;
          result = {
            id,
            readback,
            ...sortSplats({ totalSplats, readback, ordering })
          };
          break;
        }
        case "sortDoubleSplats": {
          const { numSplats, readback, ordering } = args;
          {
            result = {
              id,
              readback,
              ordering,
              activeSplats: sort_splats(numSplats, readback, ordering)
            };
          }
          break;
        }
        case "sort32Splats": {
          const { numSplats, readback, ordering } = args;
          {
            result = {
              id,
              readback,
              ordering,
              activeSplats: sort32_splats(numSplats, readback, ordering)
            };
          }
          break;
        }
        case "transcodeSpz": {
          const input = args;
          const spzBytes = await transcodeSpz(input);
          result = {
            id,
            fileBytes: spzBytes,
            input
          };
          break;
        }
        default: {
          throw new Error(\`Unknown name: \${name}\`);
        }
      }
    } catch (e) {
      error = e;
      console.error(error);
    }
    self.postMessage(
      { id, result, error },
      { transfer: getArrayBuffers(result) }
    );
  }
  async function unpackPly({
    packedArray,
    fileBytes,
    splatEncoding
  }) {
    const ply = new PlyReader({ fileBytes });
    await ply.parseHeader();
    const numSplats = ply.numSplats;
    const extra = {};
    ply.parseSplats(
      (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
        setPackedSplat(
          packedArray,
          index,
          x2,
          y,
          z,
          scaleX,
          scaleY,
          scaleZ,
          quatX,
          quatY,
          quatZ,
          quatW,
          opacity,
          r,
          g,
          b,
          splatEncoding
        );
      },
      (index, sh1, sh2, sh3) => {
        if (sh1) {
          if (!extra.sh1) {
            extra.sh1 = new Uint32Array(numSplats * 2);
          }
          encodeSh1Rgb(extra.sh1, index, sh1, splatEncoding);
        }
        if (sh2) {
          if (!extra.sh2) {
            extra.sh2 = new Uint32Array(numSplats * 4);
          }
          encodeSh2Rgb(extra.sh2, index, sh2, splatEncoding);
        }
        if (sh3) {
          if (!extra.sh3) {
            extra.sh3 = new Uint32Array(numSplats * 4);
          }
          encodeSh3Rgb(extra.sh3, index, sh3, splatEncoding);
        }
      }
    );
    return { packedArray, numSplats, extra };
  }
  async function unpackSpz(fileBytes, splatEncoding) {
    const spz = new SpzReader({ fileBytes });
    await spz.parseHeader();
    const numSplats = spz.numSplats;
    const maxSplats = computeMaxSplats(numSplats);
    const packedArray = new Uint32Array(maxSplats * 4);
    const extra = {};
    await spz.parseSplats(
      (index, x2, y, z) => {
        setPackedSplatCenter(packedArray, index, x2, y, z);
      },
      (index, alpha) => {
        setPackedSplatOpacity(packedArray, index, alpha);
      },
      (index, r, g, b) => {
        setPackedSplatRgb(packedArray, index, r, g, b, splatEncoding);
      },
      (index, scaleX, scaleY, scaleZ) => {
        setPackedSplatScales(
          packedArray,
          index,
          scaleX,
          scaleY,
          scaleZ,
          splatEncoding
        );
      },
      (index, quatX, quatY, quatZ, quatW) => {
        setPackedSplatQuat(packedArray, index, quatX, quatY, quatZ, quatW);
      },
      (index, sh1, sh2, sh3) => {
        if (sh1) {
          if (!extra.sh1) {
            extra.sh1 = new Uint32Array(numSplats * 2);
          }
          encodeSh1Rgb(extra.sh1, index, sh1, splatEncoding);
        }
        if (sh2) {
          if (!extra.sh2) {
            extra.sh2 = new Uint32Array(numSplats * 4);
          }
          encodeSh2Rgb(extra.sh2, index, sh2, splatEncoding);
        }
        if (sh3) {
          if (!extra.sh3) {
            extra.sh3 = new Uint32Array(numSplats * 4);
          }
          encodeSh3Rgb(extra.sh3, index, sh3, splatEncoding);
        }
      }
    );
    return { packedArray, numSplats, extra };
  }
  const DEPTH_INFINITY_F16 = 31744;
  const DEPTH_SIZE_16 = DEPTH_INFINITY_F16 + 1;
  let depthArray16 = null;
  function sortSplats({
    totalSplats,
    readback,
    ordering
  }) {
    if (!depthArray16) {
      depthArray16 = new Uint32Array(DEPTH_SIZE_16);
    }
    depthArray16.fill(0);
    const readbackUint32 = readback.map((layer) => new Uint32Array(layer.buffer));
    const layerSize = readbackUint32[0].length;
    const numLayers = Math.ceil(totalSplats / layerSize);
    let layerBase = 0;
    for (let layer = 0; layer < numLayers; ++layer) {
      const readbackLayer = readbackUint32[layer];
      const layerSplats = Math.min(readbackLayer.length, totalSplats - layerBase);
      for (let i2 = 0; i2 < layerSplats; ++i2) {
        const pri = readbackLayer[i2] & 32767;
        if (pri < DEPTH_INFINITY_F16) {
          depthArray16[pri] += 1;
        }
      }
      layerBase += layerSplats;
    }
    let activeSplats = 0;
    for (let j = 0; j < DEPTH_SIZE_16; ++j) {
      const nextIndex = activeSplats + depthArray16[j];
      depthArray16[j] = activeSplats;
      activeSplats = nextIndex;
    }
    layerBase = 0;
    for (let layer = 0; layer < numLayers; ++layer) {
      const readbackLayer = readbackUint32[layer];
      const layerSplats = Math.min(readbackLayer.length, totalSplats - layerBase);
      for (let i2 = 0; i2 < layerSplats; ++i2) {
        const pri = readbackLayer[i2] & 32767;
        if (pri < DEPTH_INFINITY_F16) {
          ordering[depthArray16[pri]] = layerBase + i2;
          depthArray16[pri] += 1;
        }
      }
      layerBase += layerSplats;
    }
    if (depthArray16[DEPTH_SIZE_16 - 1] !== activeSplats) {
      throw new Error(
        \`Expected \${activeSplats} active splats but got \${depthArray16[DEPTH_SIZE_16 - 1]}\`
      );
    }
    return { activeSplats, ordering };
  }
  const messageBuffer = [];
  function bufferMessage(event) {
    messageBuffer.push(event);
  }
  async function initialize() {
    self.addEventListener("message", bufferMessage);
    await __wbg_init();
    self.removeEventListener("message", bufferMessage);
    self.addEventListener("message", onMessage);
    for (const event of messageBuffer) {
      onMessage(event);
    }
    messageBuffer.length = 0;
  }
  initialize().catch(console.error);
})();
//# sourceMappingURL=worker-CaMzlx2k.js.map
`,TA=typeof self<"u"&&self.Blob&&new Blob([ac],{type:"text/javascript;charset=utf-8"});function lf(t){let e;try{if(e=TA&&(self.URL||self.webkitURL).createObjectURL(TA),!e)throw"";const n=new Worker(e,{name:t==null?void 0:t.name});return n.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),n}catch{return new Worker("data:text/javascript;charset=utf-8,"+encodeURIComponent(ac),{name:t==null?void 0:t.name})}finally{e&&(self.URL||self.webkitURL).revokeObjectURL(e)}}class cf{constructor(){this.messages={},this.messageIdNext=0,this.worker=new lf,this.worker.onmessage=e=>this.onMessage(e)}makeMessageId(){return++this.messageIdNext}makeMessagePromiseId(){const e=this.makeMessageId(),n=new Promise((a,i)=>{this.messages[e]={resolve:a,reject:i}});return{id:e,promise:n}}onMessage(e){const{id:n,result:a,error:i}=e.data,s=this.messages[n];s&&(delete this.messages[n],i?s.reject(i):s.resolve(a))}async call(e,n){const{id:a,promise:i}=this.makeMessagePromiseId();return this.worker.postMessage({name:e,args:n,id:a},{transfer:Oh(n)}),i}}let ic=4,tr=0;const sc=[],rc=[];async function uf(){const t=sc.shift();if(t)return t;if(tr<ic){const e=new cf;return tr+=1,e}return new Promise(e=>{rc.push(e)})}function gf(t){if(tr>ic){tr-=1;return}const e=rc.shift();if(e){e(t);return}sc.push(t)}async function xa(t){const e=await uf();try{return await t(e)}finally{gf(e)}}class hf extends bu{constructor(e){super(e),this.fileLoader=new Qu(e)}load(e,n,a,i){const s=this.manager.resolveURL((this.path??"")+(e??"")),r=new Headers(this.requestHeader),o=this.withCredentials?"include":"same-origin",A=new Request(s,{headers:r,credentials:o});let l=this.fileType;this.manager.itemStart(s),_A(A,a).then(async u=>{var c;const g=[new ProgressEvent("progress",{lengthComputable:!0,loaded:u.byteLength,total:u.byteLength})];function f(){if(a){const d=g.every(y=>y.lengthComputable||y.loaded===0&&y.total===0),E=g.reduce((y,Q)=>y+Q.loaded,0),I=g.reduce((y,Q)=>y+Q.total,0);a(new ProgressEvent("progress",{lengthComputable:d,loaded:E,total:I}))}}const p={},m=[],B=oc(u);if(l==="pcsogs"&&B===void 0)throw new Error("Invalid PC SOGS file");if(B!==void 0){l="pcsogs";for(const d of["means","scales","quats","sh0","shN"]){const E=B[d];if(E)for(const I of E.files){const y=new URL(I,s).toString(),Q=g.length;g.push(new ProgressEvent("progress")),this.manager.itemStart(y);const D=new Request(y,{headers:r,credentials:o}),v=_A(D,T=>{g[Q]=T,f()}).then(T=>{p[I]=T}).catch(T=>{throw this.manager.itemError(y),T}).finally(()=>{this.manager.itemEnd(y)});m.push(v)}}}if(await Promise.all(m),n){const d=((c=this.packedSplats)==null?void 0:c.splatEncoding)??Ir,E=await Ac({input:u,extraFiles:p,fileType:l,pathOrUrl:s,splatEncoding:d});this.packedSplats?(this.packedSplats.initialize(E),n(this.packedSplats)):n(new Ya(E))}}).catch(u=>{this.manager.itemError(s),i==null||i(u)}).finally(()=>{this.manager.itemEnd(s)})}async loadAsync(e,n){return new Promise((a,i)=>{this.load(e,s=>{a(s)},n,i)})}parse(e){return new Uo({packedSplats:e})}}async function _A(t,e){const n=await fetch(t);if(!n.ok)throw new Error(`${n.status} "${n.statusText}" fetching URL: ${t.url}`);if(!n.body)throw new Error(`Response body is null for URL: ${t.url}`);const a=n.body.getReader(),i=Number.parseInt(n.headers.get("Content-Length")||"0"),s=Number.isNaN(i)?0:i;let r=0;const o=[];for(;;){const{done:u,value:c}=await a.read();if(u)break;o.push(c),r+=c.length,e&&e(new ProgressEvent("progress",{lengthComputable:s!==0,loaded:r,total:s}))}const A=new Uint8Array(r);let l=0;for(const u of o)A.set(u,l),l+=u.length;return A.buffer}function ff(t){const e=new DataView(t.buffer);if((e.getUint32(0,!0)&16777215)===7957616)return"ply";if((e.getUint32(0,!0)&16777215)===559903){const n=A0(t,4);return new DataView(n.buffer).getUint32(0,!0)===1347635022?"spz":void 0}if(e.getUint32(0,!0)===67324752)return mf(t)?"pcsogszip":void 0}function df(t){const e=t.split(/[?#]/,1)[0],n=Math.max(e.lastIndexOf("/"),e.lastIndexOf("\\")),a=e.slice(n+1),i=a.lastIndexOf(".");return i<=0||i===a.length-1?"":a.slice(i+1).toLowerCase()}function pf(t){const e=df(t);if(e==="ply")return"ply";if(e==="spz")return"spz";if(e==="splat")return"splat";if(e==="ksplat")return"ksplat";if(e==="sog")return"pcsogszip"}function oc(t){try{let e;if(typeof t=="string")e=t;else{const i=t instanceof ArrayBuffer?new Uint8Array(t):t;if(i.length>65536)return;e=new TextDecoder().decode(i)}const n=JSON.parse(e);if(!n||typeof n!="object"||Array.isArray(n))return;const a=n.version===2;for(const i of["means","scales","quats","sh0"]){if(!n[i]||typeof n[i]!="object"||Array.isArray(n[i]))return;if(a){if(!n[i].files||(i==="scales"||i==="sh0")&&!n[i].codebook||i==="means"&&(!n[i].mins||!n[i].maxs))return}else if(!n[i].shape||!n[i].files||i!=="quats"&&(!n[i].mins||!n[i].maxs))return}return n}catch{return}}function mf(t){try{const e=t instanceof ArrayBuffer?new Uint8Array(t):t;let n=null;const a=fh(e,{filter:({name:s})=>s.split(/[\\/]/).pop()==="meta.json"?(n=s,!0):!1});if(!n)return;const i=oc(a[n]);return i?{name:n,json:i}:void 0}catch{return}}async function Ac({input:t,extraFiles:e,fileType:n,pathOrUrl:a,splatEncoding:i}){const s=t instanceof ArrayBuffer?new Uint8Array(t):t;let r=n;switch(n||(r=ff(s),!r&&a&&(r=pf(a))),r){case"ply":{const o=new Z0({fileBytes:s});await o.parseHeader();const A=o.numSplats,l=fn(A).maxSplats,u={fileBytes:s,packedArray:new Uint32Array(l*4),splatEncoding:i};return await xa(async c=>{const{packedArray:g,numSplats:f,extra:p}=await c.call("unpackPly",u);return{packedArray:g,numSplats:f,extra:p}})}case"spz":return await xa(async o=>{const{packedArray:A,numSplats:l,extra:u}=await o.call("decodeSpz",{fileBytes:s,splatEncoding:i});return{packedArray:A,numSplats:l,extra:u}});case"splat":return await xa(async o=>{const{packedArray:A,numSplats:l}=await o.call("decodeAntiSplat",{fileBytes:s,splatEncoding:i});return{packedArray:A,numSplats:l}});case"ksplat":return await xa(async o=>{const{packedArray:A,numSplats:l,extra:u}=await o.call("decodeKsplat",{fileBytes:s,splatEncoding:i});return{packedArray:A,numSplats:l,extra:u}});case"pcsogs":return await xa(async o=>{const{packedArray:A,numSplats:l,extra:u}=await o.call("decodePcSogs",{fileBytes:s,extraFiles:e,splatEncoding:i});return{packedArray:A,numSplats:l,extra:u}});case"pcsogszip":return await xa(async o=>{const{packedArray:A,numSplats:l,extra:u}=await o.call("decodePcSogsZip",{fileBytes:s,splatEncoding:i});return{packedArray:A,numSplats:l,extra:u}});default:throw new Error(`Unknown splat file type: ${r}`)}}var If=`precision highp float;
precision highp int;
precision highp sampler2D;
precision highp usampler2D;
precision highp isampler2D;
precision highp sampler2DArray;
precision highp usampler2DArray;
precision highp isampler2DArray;
precision highp sampler3D;
precision highp usampler3D;
precision highp isampler3D;

#include <splatDefines>

uniform uint targetLayer;
uniform int targetBase;
uniform int targetCount;

out uvec4 target;

{{ GLOBALS }}

void produceSplat(int index) {
    {{ STATEMENTS }}
}

void main() {
    int targetIndex = int(targetLayer << SPLAT_TEX_LAYER_BITS) + int(uint(gl_FragCoord.y) << SPLAT_TEX_WIDTH_BITS) + int(gl_FragCoord.x);
    int index = targetIndex - targetBase;

    if ((index >= 0) && (index < targetCount)) {
        produceSplat(index);
    } else {
        target = uvec4(0u, 0u, 0u, 0u);
    }
}`;const Ir={rgbMin:0,rgbMax:1,lnScaleMin:$n,lnScaleMax:ea,sh1Min:-1,sh1Max:1,sh2Min:-1,sh2Max:1,sh3Min:-1,sh3Max:1},os=class Ft{constructor(e={}){this.maxSplats=0,this.numSplats=0,this.packedArray=null,this.isInitialized=!1,this.target=null,this.source=null,this.needsUpdate=!0,this.extra={},this.dyno=new qo({packedSplats:this}),this.dynoRgbMinMaxLnScaleMinMax=new pr({key:"rgbMinMaxLnScaleMinMax",value:new wn(0,1,$n,ea),update:n=>{var a,i,s,r;return n.set(((a=this.splatEncoding)==null?void 0:a.rgbMin)??0,((i=this.splatEncoding)==null?void 0:i.rgbMax)??1,((s=this.splatEncoding)==null?void 0:s.lnScaleMin)??$n,((r=this.splatEncoding)==null?void 0:r.lnScaleMax)??ea),n}}),this.dynoSh1MinMax=new Pr({key:"sh1MinMax",value:new ze(-1,1),update:n=>{var a,i;return n.set(((a=this.splatEncoding)==null?void 0:a.sh1Min)??-1,((i=this.splatEncoding)==null?void 0:i.sh1Max)??1),n}}),this.dynoSh2MinMax=new Pr({key:"sh2MinMax",value:new ze(-1,1),update:n=>{var a,i;return n.set(((a=this.splatEncoding)==null?void 0:a.sh2Min)??-1,((i=this.splatEncoding)==null?void 0:i.sh2Max)??1),n}}),this.dynoSh3MinMax=new Pr({key:"sh3MinMax",value:new ze(-1,1),update:n=>{var a,i;return n.set(((a=this.splatEncoding)==null?void 0:a.sh3Min)??-1,((i=this.splatEncoding)==null?void 0:i.sh3Max)??1),n}}),this.initialized=Promise.resolve(this),this.reinitialize(e)}reinitialize(e){this.isInitialized=!1,this.extra={},this.splatEncoding=e.splatEncoding,e.url||e.fileBytes||e.construct?this.initialized=this.asyncInitialize(e).then(()=>(this.isInitialized=!0,this)):(this.initialize(e),this.isInitialized=!0,this.initialized=Promise.resolve(this))}initialize(e){e.packedArray?(this.packedArray=e.packedArray,this.maxSplats=Math.floor(this.packedArray.length/4),this.maxSplats=Math.floor(this.maxSplats/nt)*nt,this.numSplats=Math.min(this.maxSplats,e.numSplats??Number.POSITIVE_INFINITY)):(this.maxSplats=e.maxSplats??0,this.numSplats=0),this.extra=e.extra??{}}async asyncInitialize(e){const{url:n,fileBytes:a,construct:i}=e;if(n){const s=new hf;s.packedSplats=this,await s.loadAsync(n)}else if(a){const s=await Ac({input:a,fileType:e.fileType,pathOrUrl:e.fileName??n,splatEncoding:e.splatEncoding??Ir});this.initialize(s)}if(i){const s=i(this);s instanceof Promise&&await s}}dispose(){this.target&&(this.target.dispose(),this.target=null),this.source&&(this.source.dispose(),this.source=null)}ensureSplats(e){const n=e<=this.maxSplats?this.maxSplats:Math.max(e,2*this.maxSplats),a=this.packedArray?this.packedArray.length/4:0;if(!this.packedArray||n>a){this.maxSplats=fn(n).maxSplats;const i=new Uint32Array(this.maxSplats*4);this.packedArray&&i.set(this.packedArray),this.packedArray=i}return this.packedArray}ensureSplatsSh(e,n){let a,i;if(e===0)return this.ensureSplats(n);if(e===1)a=2,i="sh1";else if(e===2)a=4,i="sh2";else if(e===3)a=4,i="sh3";else throw new Error(`Invalid level: ${e}`);let s=this.extra[i]?this.extra[i].length/a:0;const r=n<=s?s:Math.max(n,2*s);if(!this.extra[i]||r>s){s=fn(r).maxSplats;const o=new Uint32Array(s*a);this.extra[i]&&o.set(this.extra[i]),this.extra[i]=o}return this.extra[i]}getSplat(e){if(!this.packedArray||e>=this.numSplats)throw new Error("Invalid index");return QA(this.packedArray,e,this.splatEncoding)}setSplat(e,n,a,i,s,r){const o=this.ensureSplats(e+1);bA(o,e,n.x,n.y,n.z,a.x,a.y,a.z,i.x,i.y,i.z,i.w,s,r.r,r.g,r.b),this.numSplats=Math.max(this.numSplats,e+1)}pushSplat(e,n,a,i,s){const r=this.ensureSplats(this.numSplats+1);bA(r,this.numSplats,e.x,e.y,e.z,n.x,n.y,n.z,a.x,a.y,a.z,a.w,i,s.r,s.g,s.b),++this.numSplats}forEachSplat(e){if(!(!this.packedArray||!this.numSplats))for(let n=0;n<this.numSplats;++n){const a=QA(this.packedArray,n,this.splatEncoding);e(n,a.center,a.scales,a.quaternion,a.opacity,a.color)}}ensureGenerate(e){if(this.target&&(e??1)<=this.maxSplats)return!1;this.dispose();const n=fn(e??1),{width:a,height:i,depth:s}=n;return this.maxSplats=n.maxSplats,this.target=new pl(a,i,s,{depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,magFilter:Ia,minFilter:Ia}),this.target.texture.format=Ai,this.target.texture.type=Na,this.target.texture.internalFormat="RGBA32UI",this.target.scissorTest=!0,!0}generateMapping(e){let n=0;const a=e.map(i=>{const s=n,r=Math.ceil(i/nt)*nt;return n+=r,{base:s,count:i}});return{maxSplats:n,mapping:a}}getTexture(){return this.target?this.target.texture:this.source||this.packedArray?this.maybeUpdateSource():Ft.getEmpty()}maybeUpdateSource(){if(!this.packedArray)throw new Error("No packed splats");if(this.needsUpdate||!this.source){if(this.needsUpdate=!1,this.source){const{width:e,height:n,depth:a}=this.source.image;this.maxSplats!==e*n*a&&(this.source.dispose(),this.source=null)}if(this.source)this.packedArray.buffer!==this.source.image.data.buffer&&(this.source.image.data=new Uint8Array(this.packedArray.buffer));else{const{width:e,height:n,depth:a}=fn(this.maxSplats);this.source=new Fa(this.packedArray,e,n,a),this.source.format=Ai,this.source.type=Na,this.source.internalFormat="RGBA32UI",this.source.needsUpdate=!0}this.source.needsUpdate=!0}return this.source}static getEmpty(){if(!Ft.emptySource){const{width:e,height:n,depth:a,maxSplats:i}=fn(1),s=new Uint32Array(i*4);Ft.emptySource=new Fa(s,e,n,a),Ft.emptySource.format=Ai,Ft.emptySource.type=Na,Ft.emptySource.internalFormat="RGBA32UI",Ft.emptySource.needsUpdate=!0}return Ft.emptySource}prepareProgramMaterial(e){let n=Ft.generatorProgram.get(e);if(!n){const i=ta({index:"int"},{output:"uvec4"},({index:s})=>{e.inputs.index=s;const r=e.outputs.gsplat;return{output:Gh(r,this.dynoRgbMinMaxLnScaleMinMax)}});Ft.programTemplate||(Ft.programTemplate=new Jl(If)),n=new Hl({graph:i,inputs:{index:"index"},outputs:{output:"target"},template:Ft.programTemplate}),Object.assign(n.uniforms,{targetLayer:{value:0},targetBase:{value:0},targetCount:{value:0}}),Ft.generatorProgram.set(e,n)}const a=n.prepareMaterial();return Ft.fullScreenQuad.material=a,{program:n,material:a}}saveRenderState(e){return{xrEnabled:e.xr.enabled,autoClear:e.autoClear}}resetRenderState(e,n){e.setRenderTarget(null),e.xr.enabled=n.xrEnabled,e.autoClear=n.autoClear}generate({generator:e,base:n,count:a,renderer:i}){if(!this.target)throw new Error("Target must be initialized with ensureSplats");if(n+a>this.maxSplats)throw new Error("Base + count exceeds maxSplats");const{program:s,material:r}=this.prepareProgramMaterial(e);s.update();const o=this.saveRenderState(i),A=Math.ceil((n+a)/nt)*nt,l=nt*ka;for(r.uniforms.targetBase.value=n,r.uniforms.targetCount.value=a;n<A;){const u=Math.floor(n/l);r.uniforms.targetLayer.value=u;const c=u*l,g=Math.floor((n-c)/nt),f=Math.min(ka,Math.ceil((A-c)/nt));this.target.scissor.set(0,g,nt,f-g),i.setRenderTarget(this.target,u),i.xr.enabled=!1,i.autoClear=!1,Ft.fullScreenQuad.render(i),n+=nt*(f-g)}return this.resetRenderState(i,o),{nextBase:A}}};os.emptySource=null;os.programTemplate=null;os.generatorProgram=new Map;os.fullScreenQuad=new vl(new Do({visible:!1}));let Ya=os;class qo extends xn{constructor({packedSplats:e}={}){super({key:"packedSplats",type:dr,globals:()=>[Fo],value:{texture:Ya.getEmpty(),numSplats:0,rgbMinMaxLnScaleMinMax:new wn(0,1,$n,ea)},update:n=>{var a,i,s,r,o,A,l,u,c,g;return n.texture=((a=this.packedSplats)==null?void 0:a.getTexture())??Ya.getEmpty(),n.numSplats=((i=this.packedSplats)==null?void 0:i.numSplats)??0,n.rgbMinMaxLnScaleMinMax.set(((r=(s=this.packedSplats)==null?void 0:s.splatEncoding)==null?void 0:r.rgbMin)??0,((A=(o=this.packedSplats)==null?void 0:o.splatEncoding)==null?void 0:A.rgbMax)??1,((u=(l=this.packedSplats)==null?void 0:l.splatEncoding)==null?void 0:u.lnScaleMin)??$n,((g=(c=this.packedSplats)==null?void 0:c.splatEncoding)==null?void 0:g.lnScaleMax)??ea),n}}),this.packedSplats=e}}class mo extends xu{constructor(e,n){super(),this.ordering=e,this.setAttribute("position",new Ra(Cf,3)),this.setIndex(new Ra(Bf,1)),this._maxInstanceCount=e.length,this.instanceCount=n,this.attribute=new oo(e,1,!1,1),this.attribute.setUsage(ti),this.setAttribute("splatIndex",this.attribute)}update(e,n){this.ordering=e,this.attribute.array=e,this.instanceCount=n,this.attribute.addUpdateRange(0,n),this.attribute.needsUpdate=!0}}const Cf=new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),Bf=new Uint16Array([0,1,2,0,2,3]),Po=class _i{constructor(e){if(this.lastTime=null,this.encodeLinear=!1,this.superXY=1,this.display=null,this.sorting=null,this.pending=null,this.sortingCheck=!1,this.readback16=new Uint16Array(0),this.readback32=new Uint32Array(0),this.spark=e.spark,this.camera=e.camera,this.viewToWorld=e.viewToWorld??new Zt,e.target){const{width:n,height:a,doubleBuffer:i}=e.target,s=Math.max(1,Math.min(4,e.target.superXY??1));if(this.superXY=s,n*s>8192||a*s>8192)throw new Error("Target size too large");this.target=new Rn(n*s,a*s,{format:Ua,type:mi,colorSpace:Ct}),i&&(this.back=new Rn(n*s,a*s,{format:Ua,type:mi,colorSpace:Ct})),this.encodeLinear=!0}this.onTextureUpdated=e.onTextureUpdated,this.sortRadial=e.sortRadial??!0,this.sortDistance=e.sortDistance,this.sortCoorient=e.sortCoorient,this.depthBias=e.depthBias,this.sort360=e.sort360,this.sort32=e.sort32,this.stochastic=e.stochastic??!1,this.orderingFreelist=new Vh({allocate:n=>new Uint32Array(n),valid:(n,a)=>n.length===a}),this.autoUpdate=!1,this.setAutoUpdate(e.autoUpdate??!1)}dispose(){var e;this.setAutoUpdate(!1),this.target&&(this.target.dispose(),this.target=void 0),this.back&&(this.back.dispose(),this.back=void 0),this.display&&(this.spark.releaseAccumulator(this.display.accumulator),this.display.geometry.dispose(),this.display=null),(e=this.pending)!=null&&e.accumulator&&(this.spark.releaseAccumulator(this.pending.accumulator),this.pending=null)}setAutoUpdate(e){!this.autoUpdate&&e?this.spark.autoViewpoints.push(this):this.autoUpdate&&!e&&(this.spark.autoViewpoints=this.spark.autoViewpoints.filter(n=>n!==this)),this.autoUpdate=e}async prepare({scene:e,camera:n,viewToWorld:a,update:i,forceOrigin:s}){var r;for(a?this.viewToWorld=a:(this.camera=n??this.camera,this.camera&&(this.camera.updateMatrixWorld(),this.viewToWorld=this.camera.matrixWorld.clone()));i??!0;){const A=s?this.viewToWorld:void 0;if(this.spark.updateInternal({scene:e,originToWorld:A}))break;await new Promise(u=>setTimeout(u,10))}const o=this.spark.active;o!==((r=this.display)==null?void 0:r.accumulator)&&(this.spark.active.refCount+=1),await this.sortUpdate({accumulator:o,viewToWorld:this.viewToWorld})}renderTarget({scene:e,camera:n}){var a;const i=this.back??this.target;if(!i)throw new Error("Must initialize SparkViewpoint with target");if(n=n??this.camera,!n)throw new Error("Must provide camera");if(n instanceof Wi){const s=new Wi().copy(n,!1);s.aspect=i.width/i.height,s.updateProjectionMatrix(),n=s}this.viewToWorld=n.matrixWorld.clone();try{this.spark.renderer.setRenderTarget(i),this.spark.prepareViewpoint(this),this.spark.renderer.render(e,n)}finally{this.spark.prepareViewpoint(this.spark.defaultView),this.spark.renderer.setRenderTarget(null)}i!==this.target&&([this.target,this.back]=[this.back,this.target]),(a=this.onTextureUpdated)==null||a.call(this,i.texture)}async readTarget(){if(!this.target)throw new Error("Must initialize SparkViewpoint with target");const{width:e,height:n}=this.target,a=e*n*4;(!this.superPixels||this.superPixels.length<a)&&(this.superPixels=new Uint8Array(a)),await this.spark.renderer.readRenderTargetPixelsAsync(this.target,0,0,e,n,this.superPixels);const{superXY:i}=this;if(i===1)return this.superPixels;const s=e/i,r=n/i,o=s*r*4;(!this.pixels||this.pixels.length<o)&&(this.pixels=new Uint8Array(o));const{superPixels:A,pixels:l}=this,u=i*i;for(let c=0;c<r;c++){const g=c*s;for(let f=0;f<s;f++){const p=f*i;let m=0,B=0,d=0,E=0;for(let y=0;y<i;y++){const Q=(c*i+y)*this.target.width;for(let D=0;D<i;D++){const v=(Q+p+D)*4;m+=A[v],B+=A[v+1],d+=A[v+2],E+=A[v+3]}}const I=(g+f)*4;l[I]=m/u,l[I+1]=B/u,l[I+2]=d/u,l[I+3]=E/u}}return l}async prepareRenderPixels({scene:e,camera:n,viewToWorld:a,update:i,forceOrigin:s}){return await this.prepare({scene:e,camera:n,viewToWorld:a,update:i,forceOrigin:s}),this.renderTarget({scene:e,camera:n}),this.readTarget()}autoPoll({accumulator:e}){var n,a,i;this.camera&&(this.camera.updateMatrixWorld(),this.viewToWorld=this.camera.matrixWorld.clone());let s=!1,r=!1;if(!this.display)s=!0;else if(e){s=!0;const{mappingVersion:A}=this.display.accumulator;e.mappingVersion===A&&(e.refCount+=1,this.spark.releaseAccumulator(this.display.accumulator),this.display.accumulator=e,this.display.viewToWorld.copy(this.viewToWorld),r=!0,this.spark.viewpoint===this&&this.spark.prepareViewpoint(this))}const o=((n=this.sorting)==null?void 0:n.viewToWorld)??((a=this.display)==null?void 0:a.viewToWorld);o&&!uo({matrix1:this.viewToWorld,matrix2:o,maxDistance:this.sortDistance??.01,minCoorient:this.sortCoorient??this.sortRadial?.99:.999})&&(s=!0),s&&(e&&(e.refCount+=1),(i=this.pending)!=null&&i.accumulator&&this.spark.releaseAccumulator(this.pending.accumulator),this.pending={accumulator:e,viewToWorld:this.viewToWorld,displayed:r},this.driveSort())}async driveSort(){for(var e;;){if(this.sorting||!this.pending)return;const{viewToWorld:n,displayed:a}=this.pending;let i=this.pending.accumulator;if(i||(i=((e=this.display)==null?void 0:e.accumulator)??this.spark.active,i.refCount+=1),this.pending=null,!i)throw new Error("No accumulator to sort");this.sorting={viewToWorld:n},await this.sortUpdate({accumulator:i,viewToWorld:n,displayed:a}),this.sorting=null,this.spark.releaseAccumulator(i)}}async sortUpdate({accumulator:e,viewToWorld:n,displayed:a=!1}){if(this.sortingCheck)throw new Error("Only one sort at a time");this.sortingCheck=!0,e=e??this.spark.active;const{numSplats:i,maxSplats:s}=e.splats;let r=0,o=this.orderingFreelist.alloc(s);if(this.stochastic){r=i;for(let A=0;A<i;++A)o[A]=A}else if(i>0){const{reader:A,doubleSortReader:l,sort32Reader:u,dynoSortRadial:c,dynoOrigin:g,dynoDirection:f,dynoDepthBias:p,dynoSort360:m,dynoSplats:B}=_i.makeSorter(),d=this.sort32??!1;let E;if(d)this.readback32=A.ensureBuffer(s,this.readback32),E=this.readback32;else{const T=Math.ceil(s/2);this.readback16=A.ensureBuffer(T,this.readback16),E=this.readback16}const I=e.toWorld.clone().invert(),y=n.clone().premultiply(I);c.value=this.sort360?!0:this.sortRadial,g.value.set(0,0,0).applyMatrix4(y),f.value.set(0,0,-1).applyMatrix4(y).sub(g.value).normalize(),p.value=this.depthBias??1,m.value=this.sort360??!1,B.packedSplats=e.splats;const Q=d?u:l,D=d?i:Math.ceil(i/2);await A.renderReadback({renderer:this.spark.renderer,reader:Q,count:D,readback:E});const v=await xa(async T=>{const F=d?"sort32Splats":"sortDoubleSplats";return T.call(F,{maxSplats:s,numSplats:i,readback:E,ordering:o})});d?this.readback32=v.readback:this.readback16=v.readback,o=v.ordering,r=v.activeSplats}this.updateDisplay({accumulator:e,viewToWorld:n,ordering:o,activeSplats:r,displayed:a}),this.sortingCheck=!1}updateDisplay({accumulator:e,viewToWorld:n,ordering:a,activeSplats:i,displayed:s=!1}){if(!this.display)e.refCount+=1,this.display={accumulator:e,viewToWorld:n,geometry:new mo(a,i)};else{!s&&e!==this.display.accumulator&&(e.refCount+=1,this.spark.releaseAccumulator(this.display.accumulator),this.display.accumulator=e),this.display.viewToWorld=n;const r=this.display.geometry.ordering;r.length===a.length?this.display.geometry.update(a,i):(this.display.geometry.dispose(),this.display.geometry=new mo(a,i)),this.orderingFreelist.free(r)}this.spark.viewpoint===this&&this.spark.prepareViewpoint(this)}static makeSorter(){if(!_i.dynos){const e=new xA({value:!0}),n=new $s({value:new j}),a=new $s({value:new j}),i=new Zi({value:1}),s=new xA({value:!1}),r=new qo,o=new Vl,A=ta({index:"int"},{rgba8:"vec4"},({index:u})=>{if(!u)throw new Error("No index");const c={sortRadial:e,sortOrigin:n,sortDirection:a,sortDepthBias:i,sort360:s},g=Ti(u,qi("int",2)),f=Pi(r,g),p=Vr({gsplat:f,...c}),m=Pi(r,Qa(g,qi("int",1))),B=Vr({gsplat:m,...c}),d=y0({vectorType:"vec2",x:p,y:B});return{rgba8:MA(p0(d))}}),l=ta({index:"int"},{rgba8:"vec4"},({index:u})=>{if(!u)throw new Error("No index");const c={sortRadial:e,sortOrigin:n,sortDirection:a,sortDepthBias:i,sort360:s},g=Pi(r,u),f=Vr({gsplat:g,...c});return{rgba8:MA(d0(f))}});_i.dynos={dynoSortRadial:e,dynoOrigin:n,dynoDirection:a,dynoDepthBias:i,dynoSort360:s,dynoSplats:r,reader:o,doubleSortReader:A,sort32Reader:l}}return _i.dynos}};Po.EMPTY_TEXTURE=new Iu;Po.dynos=null;let zA=Po;const Ef=an(`
  float computeSort(Gsplat gsplat, bool sortRadial, vec3 sortOrigin, vec3 sortDirection, float sortDepthBias, bool sort360) {
    if (!isGsplatActive(gsplat.flags)) {
      return INFINITY;
    }

    vec3 center = gsplat.center - sortOrigin;
    float biasedDepth = dot(center, sortDirection) + sortDepthBias;
    if (!sort360 && (biasedDepth <= 0.0)) {
      return INFINITY;
    }

    return sortRadial ? length(center) : biasedDepth;
  }
`);function Vr({gsplat:t,sortRadial:e,sortOrigin:n,sortDirection:a,sortDepthBias:i,sort360:s}){return gr({inTypes:{gsplat:St,sortRadial:"bool",sortOrigin:"vec3",sortDirection:"vec3",sortDepthBias:"float",sort360:"bool"},outTypes:{metric:"float"},globals:()=>[Pn,Ef],inputs:{gsplat:t,sortRadial:e,sortOrigin:n,sortDirection:a,sortDepthBias:i,sort360:s},statements:({inputs:r,outputs:o})=>{const{gsplat:A,sortRadial:l,sortOrigin:u,sortDirection:c,sortDepthBias:g,sort360:f}=r;return qn(`
        ${o.metric} = computeSort(${A}, ${l}, ${u}, ${c}, ${g}, ${f});
      `)}}).outputs.metric}class jr{constructor(){this.splats=new Ya,this.toWorld=new Zt,this.mapping=[],this.refCount=0,this.splatsVersion=-1,this.mappingVersion=-1}ensureGenerate(e){this.splats.ensureGenerate(e)&&(this.mapping=[])}generateSplats({renderer:e,modifier:n,generators:a,forceUpdate:i,originToWorld:s}){const r=this.mapping.reduce((l,u)=>(l.set(u.node,u),l),new Map);let o=0,A=0;for(const{node:l,generator:u,version:c,base:g,count:f}of a){const p=r.get(l);if((i||u!==(p==null?void 0:p.generator)||c!==(p==null?void 0:p.version)||g!==(p==null?void 0:p.base)||f!==(p==null?void 0:p.count))&&u&&f>0){const m=n.apply(u);try{this.splats.generate({generator:m,base:g,count:f,renderer:e})}catch(B){l.generator=void 0,l.generatorError=B}o+=1}A=Math.max(A,g+f)}return this.splats.numSplats=A,this.toWorld.copy(s),this.mapping=a,o!==0}hasCorrespondence(e){return this.mapping.length!==e.mapping.length?!1:this.mapping.every(({node:n,base:a,count:i},s)=>{const{node:r,base:o,count:A}=e.mapping[s];return n===r&&a===o&&i===A})}}var yf=`const float LN_SCALE_MIN = -12.0;
const float LN_SCALE_MAX = 9.0;

const uint SPLAT_TEX_WIDTH_BITS = 11u;
const uint SPLAT_TEX_HEIGHT_BITS = 11u;
const uint SPLAT_TEX_DEPTH_BITS = 11u;
const uint SPLAT_TEX_LAYER_BITS = SPLAT_TEX_WIDTH_BITS + SPLAT_TEX_HEIGHT_BITS;

const uint SPLAT_TEX_WIDTH = 1u << SPLAT_TEX_WIDTH_BITS;
const uint SPLAT_TEX_HEIGHT = 1u << SPLAT_TEX_HEIGHT_BITS;
const uint SPLAT_TEX_DEPTH = 1u << SPLAT_TEX_DEPTH_BITS;

const uint SPLAT_TEX_WIDTH_MASK = SPLAT_TEX_WIDTH - 1u;
const uint SPLAT_TEX_HEIGHT_MASK = SPLAT_TEX_HEIGHT - 1u;
const uint SPLAT_TEX_DEPTH_MASK = SPLAT_TEX_DEPTH - 1u;

const uint F16_INF = 0x7c00u;
const float PI = 3.1415926535897932384626433832795;

const float INFINITY = 1.0 / 0.0;
const float NEG_INFINITY = -INFINITY;

float sqr(float x) {
    return x * x;
}

float pow4(float x) {
    float x2 = x * x;
    return x2 * x2;
}

float pow8(float x) {
    float x4 = pow4(x);
    return x4 * x4;
}

vec3 srgbToLinear(vec3 rgb) {
    return pow(rgb, vec3(2.2));
}

vec3 linearToSrgb(vec3 rgb) {
    return pow(rgb, vec3(1.0 / 2.2));
}

uint encodeQuatOctXy88R8(vec4 q) {
    
    if (q.w < 0.0) {
        q = -q;
    }
    
    float theta = 2.0 * acos(q.w);
    float halfTheta = theta * 0.5;
    float s = sin(halfTheta);
    
    vec3 axis = (abs(s) < 1e-6) ? vec3(1.0, 0.0, 0.0) : q.xyz / s;
    
    
    
    float sum = abs(axis.x) + abs(axis.y) + abs(axis.z);
    vec2 p = vec2(axis.x, axis.y) / sum;
    
    if (axis.z < 0.0) {
        float oldPx = p.x;
        p.x = (1.0 - abs(p.y)) * (p.x >= 0.0 ? 1.0 : -1.0);
        p.y = (1.0 - abs(oldPx)) * (p.y >= 0.0 ? 1.0 : -1.0);
    }
    
    float u_f = p.x * 0.5 + 0.5;
    float v_f = p.y * 0.5 + 0.5;
    
    uint quantU = uint(clamp(round(u_f * 255.0), 0.0, 255.0));
    uint quantV = uint(clamp(round(v_f * 255.0), 0.0, 255.0));
    
    
    
    uint angleInt = uint(clamp(round((theta / 3.14159265359) * 255.0), 0.0, 255.0));
    
    
    return (angleInt << 16u) | (quantV << 8u) | quantU;
}

vec4 decodeQuatOctXy88R8(uint encoded) {
    
    uint quantU = encoded & uint(0xFFu);               
    uint quantV = (encoded >> 8u) & uint(0xFFu);         
    uint angleInt = encoded >> 16u;                      

    
    float u_f = float(quantU) / 255.0;
    float v_f = float(quantV) / 255.0;
    vec2 f = vec2(u_f * 2.0 - 1.0, v_f * 2.0 - 1.0);

    vec3 axis = vec3(f.xy, 1.0 - abs(f.x) - abs(f.y));
    float t = max(-axis.z, 0.0);
    axis.x += (axis.x >= 0.0) ? -t : t;
    axis.y += (axis.y >= 0.0) ? -t : t;
    axis = normalize(axis);
    
    
    float theta = (float(angleInt) / 255.0) * 3.14159265359;
    float halfTheta = theta * 0.5;
    float s = sin(halfTheta);
    float w = cos(halfTheta);
    
    return vec4(axis * s, w);
}

    

    

    

    

    

    

    

    

    

    

uvec4 packSplatEncoding(
    vec3 center, vec3 scales, vec4 quaternion, vec4 rgba, vec4 rgbMinMaxLnScaleMinMax
) {
    float rgbMin = rgbMinMaxLnScaleMinMax.x;
    float rgbMax = rgbMinMaxLnScaleMinMax.y;
    vec3 encRgb = (rgba.rgb - vec3(rgbMin)) / (rgbMax - rgbMin);
    uvec4 uRgba = uvec4(round(clamp(vec4(encRgb, rgba.a) * 255.0, 0.0, 255.0)));

    uint uQuat = encodeQuatOctXy88R8(quaternion);
    
    
    uvec3 uQuat3 = uvec3(uQuat & 0xffu, (uQuat >> 8u) & 0xffu, (uQuat >> 16u) & 0xffu);

    
    float lnScaleMin = rgbMinMaxLnScaleMinMax.z;
    float lnScaleMax = rgbMinMaxLnScaleMinMax.w;
    float lnScaleScale = 254.0 / (lnScaleMax - lnScaleMin);
    uvec3 uScales = uvec3(
        (scales.x == 0.0) ? 0u : uint(round(clamp((log(scales.x) - lnScaleMin) * lnScaleScale, 0.0, 254.0))) + 1u,
        (scales.y == 0.0) ? 0u : uint(round(clamp((log(scales.y) - lnScaleMin) * lnScaleScale, 0.0, 254.0))) + 1u,
        (scales.z == 0.0) ? 0u : uint(round(clamp((log(scales.z) - lnScaleMin) * lnScaleScale, 0.0, 254.0))) + 1u
    );

    
    uint word0 = uRgba.r | (uRgba.g << 8u) | (uRgba.b << 16u) | (uRgba.a << 24u);
    uint word1 = packHalf2x16(center.xy);
    uint word2 = packHalf2x16(vec2(center.z, 0.0)) | (uQuat3.x << 16u) | (uQuat3.y << 24u);
    uint word3 = uScales.x | (uScales.y << 8u) | (uScales.z << 16u) | (uQuat3.z << 24u);
    return uvec4(word0, word1, word2, word3);
}

uvec4 packSplat(vec3 center, vec3 scales, vec4 quaternion, vec4 rgba) {
    return packSplatEncoding(center, scales, quaternion, rgba, vec4(0.0, 1.0, LN_SCALE_MIN, LN_SCALE_MAX));
}

void unpackSplatEncoding(uvec4 packed, out vec3 center, out vec3 scales, out vec4 quaternion, out vec4 rgba, vec4 rgbMinMaxLnScaleMinMax) {
    uint word0 = packed.x, word1 = packed.y, word2 = packed.z, word3 = packed.w;

    uvec4 uRgba = uvec4(word0 & 0xffu, (word0 >> 8u) & 0xffu, (word0 >> 16u) & 0xffu, (word0 >> 24u) & 0xffu);
    float rgbMin = rgbMinMaxLnScaleMinMax.x;
    float rgbMax = rgbMinMaxLnScaleMinMax.y;
    rgba = (vec4(uRgba) / 255.0);
    rgba.rgb = rgba.rgb * (rgbMax - rgbMin) + rgbMin;

    center = vec4(
        unpackHalf2x16(word1),
        unpackHalf2x16(word2 & 0xffffu)
    ).xyz;

    uvec3 uScales = uvec3(word3 & 0xffu, (word3 >> 8u) & 0xffu, (word3 >> 16u) & 0xffu);
    float lnScaleMin = rgbMinMaxLnScaleMinMax.z;
    float lnScaleMax = rgbMinMaxLnScaleMinMax.w;
    float lnScaleScale = (lnScaleMax - lnScaleMin) / 254.0;
    scales = vec3(
        (uScales.x == 0u) ? 0.0 : exp(lnScaleMin + float(uScales.x - 1u) * lnScaleScale),
        (uScales.y == 0u) ? 0.0 : exp(lnScaleMin + float(uScales.y - 1u) * lnScaleScale),
        (uScales.z == 0u) ? 0.0 : exp(lnScaleMin + float(uScales.z - 1u) * lnScaleScale)
    );

    uint uQuat = ((word2 >> 16u) & 0xFFFFu) | ((word3 >> 8u) & 0xFF0000u);
    quaternion = decodeQuatOctXy88R8(uQuat);
    
    
}

void unpackSplat(uvec4 packed, out vec3 center, out vec3 scales, out vec4 quaternion, out vec4 rgba) {
    unpackSplatEncoding(packed, center, scales, quaternion, rgba, vec4(0.0, 1.0, LN_SCALE_MIN, LN_SCALE_MAX));
}

vec3 quatVec(vec4 q, vec3 v) {
    
    vec3 t = 2.0 * cross(q.xyz, v);
    return v + q.w * t + cross(q.xyz, t);
}

vec4 quatQuat(vec4 q1, vec4 q2) {
    return vec4(
        q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
        q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,
        q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w,
        q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z
    );
}

mat3 scaleQuaternionToMatrix(vec3 s, vec4 q) {
    
    return mat3(
        s.x * (1.0 - 2.0 * (q.y * q.y + q.z * q.z)),
        s.x * (2.0 * (q.x * q.y + q.w * q.z)),
        s.x * (2.0 * (q.x * q.z - q.w * q.y)),
        s.y * (2.0 * (q.x * q.y - q.w * q.z)),
        s.y * (1.0 - 2.0 * (q.x * q.x + q.z * q.z)),
        s.y * (2.0 * (q.y * q.z + q.w * q.x)),
        s.z * (2.0 * (q.x * q.z + q.w * q.y)),
        s.z * (2.0 * (q.y * q.z - q.w * q.x)),
        s.z * (1.0 - 2.0 * (q.x * q.x + q.y * q.y))
    );
}

vec4 slerp(vec4 q1, vec4 q2, float t) {
    
    float cosHalfTheta = dot(q1, q2);

    
    if (abs(cosHalfTheta) >= 0.999) {
        return q1;
    }
    
    
    
    if (cosHalfTheta < 0.0) {
        q2 = -q2;
        cosHalfTheta = -cosHalfTheta;
    }

    
    float halfTheta = acos(cosHalfTheta);
    float sinHalfTheta = sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    
    float ratioA = sin((1.0 - t) * halfTheta) / sinHalfTheta;
    float ratioB = sin(t * halfTheta) / sinHalfTheta;

    
    return q1 * ratioA + q2 * ratioB;
}

ivec3 splatTexCoord(int index) {
    uint x = uint(index) & SPLAT_TEX_WIDTH_MASK;
    uint y = (uint(index) >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK;
    uint z = uint(index) >> SPLAT_TEX_LAYER_BITS;
    return ivec3(x, y, z);
}`,wf=`precision highp float;
precision highp int;

#include <splatDefines>
#include <logdepthbuf_pars_fragment>

uniform float near;
uniform float far;
uniform bool encodeLinear;
uniform float time;
uniform bool debugFlag;
uniform float maxStdDev;
uniform float minAlpha;
uniform bool stochastic;
uniform bool disableFalloff;
uniform float falloff;

uniform bool splatTexEnable;
uniform sampler3D splatTexture;
uniform mat2 splatTexMul;
uniform vec2 splatTexAdd;
uniform float splatTexNear;
uniform float splatTexFar;
uniform float splatTexMid;

out vec4 fragColor;

in vec4 vRgba;
in vec2 vSplatUv;
in vec3 vNdc;
flat in uint vSplatIndex;

void main() {
    vec4 rgba = vRgba;

    float z = dot(vSplatUv, vSplatUv);
    if (!splatTexEnable) {
        if (z > (maxStdDev * maxStdDev)) {
            discard;
        }
    } else {
        vec2 uv = splatTexMul * vSplatUv + splatTexAdd;
        float ndcZ = vNdc.z;
        float depth = (2.0 * near * far) / (far + near - ndcZ * (far - near));
        float clampedFar = max(splatTexFar, splatTexNear);
        float clampedDepth = clamp(depth, splatTexNear, clampedFar);
        float logDepth = log2(clampedDepth + 1.0);
        float logNear = log2(splatTexNear + 1.0);
        float logFar = log2(clampedFar + 1.0);

        float texZ;
        if (splatTexMid > 0.0) {
            float clampedMid = clamp(splatTexMid, splatTexNear, clampedFar);
            float logMid = log2(clampedMid + 1.0);
            texZ = (clampedDepth <= clampedMid) ?
                (0.5 * ((logDepth - logNear) / (logMid - logNear))) :
                (0.5 * ((logDepth - logMid) / (logFar - logMid)) + 0.5);
        } else {
            texZ = (logDepth - logNear) / (logFar - logNear);
        }

        vec4 modulate = texture(splatTexture, vec3(uv, 1.0 - texZ));
        rgba *= modulate;
    }

    rgba.a *= mix(1.0, exp(-0.5 * z), falloff);

    if (rgba.a < minAlpha) {
        discard;
    }
    if (encodeLinear) {
        rgba.rgb = srgbToLinear(rgba.rgb);
    }

    if (stochastic) {
        const bool STEADY = false;
        uint uTime = STEADY ? 0u : floatBitsToUint(time);
        uvec2 coord = uvec2(gl_FragCoord.xy);
        uint state = uTime + 0x9e3779b9u * coord.x + 0x85ebca6bu * coord.y + 0xc2b2ae35u * uint(vSplatIndex);
        state = state * 747796405u + 2891336453u;
        uint hash = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
        hash = (hash >> 22u) ^ hash;
        float rand = float(hash) / 4294967296.0;
        if (rand < rgba.a) {
            fragColor = vec4(rgba.rgb, 1.0);
        } else {
            discard;
        }
    } else {
        #ifdef PREMULTIPLIED_ALPHA
            fragColor = vec4(rgba.rgb * rgba.a, rgba.a);
        #else
            fragColor = rgba;
        #endif
    }
    #include <logdepthbuf_fragment>
}`,xf=`precision highp float;
precision highp int;
precision highp usampler2DArray;

#include <splatDefines>
#include <logdepthbuf_pars_vertex>

attribute uint splatIndex;

out vec4 vRgba;
out vec2 vSplatUv;
out vec3 vNdc;
flat out uint vSplatIndex;

uniform vec2 renderSize;
uniform uint numSplats;
uniform vec4 renderToViewQuat;
uniform vec3 renderToViewPos;
uniform float maxStdDev;
uniform float minPixelRadius;
uniform float maxPixelRadius;
uniform float time;
uniform float deltaTime;
uniform bool debugFlag;
uniform float minAlpha;
uniform bool stochastic;
uniform bool enable2DGS;
uniform float blurAmount;
uniform float preBlurAmount;
uniform float focalDistance;
uniform float apertureAngle;
uniform float clipXY;
uniform float focalAdjustment;

uniform usampler2DArray packedSplats;
uniform vec4 rgbMinMaxLnScaleMinMax;

#ifdef USE_LOGDEPTHBUF
    bool isPerspectiveMatrix( mat4 m ) {
      return m[ 2 ][ 3 ] == - 1.0;
    }
#endif

void main() {
    
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);

    if (uint(gl_InstanceID) >= numSplats) {
        return;
    }

    ivec3 texCoord;
    if (stochastic) {
        texCoord = ivec3(
            uint(gl_InstanceID) & SPLAT_TEX_WIDTH_MASK,
            (uint(gl_InstanceID) >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK,
            (uint(gl_InstanceID) >> SPLAT_TEX_LAYER_BITS)
        );
    } else {
        if (splatIndex == 0xffffffffu) {
            
            return;
        }
        texCoord = ivec3(
            splatIndex & SPLAT_TEX_WIDTH_MASK,
            (splatIndex >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK,
            splatIndex >> SPLAT_TEX_LAYER_BITS
        );
    }
    uvec4 packed = texelFetch(packedSplats, texCoord, 0);

    vec3 center, scales;
    vec4 quaternion, rgba;
    unpackSplatEncoding(packed, center, scales, quaternion, rgba, rgbMinMaxLnScaleMinMax);

    if (rgba.a < minAlpha) {
        return;
    }
    bvec3 zeroScales = equal(scales, vec3(0.0));
    if (all(zeroScales)) {
        return;
    }

    
    vec3 viewCenter = quatVec(renderToViewQuat, center) + renderToViewPos;

    
    if (viewCenter.z >= 0.0) {
        return;
    }

    
    vec4 clipCenter = projectionMatrix * vec4(viewCenter, 1.0);

    
    if (abs(clipCenter.z) >= clipCenter.w) {
        return;
    }

    
    float clip = clipXY * clipCenter.w;
    if (abs(clipCenter.x) > clip || abs(clipCenter.y) > clip) {
        return;
    }

    
    vSplatIndex = splatIndex;

    
    vec4 viewQuaternion = quatQuat(renderToViewQuat, quaternion);

    if (enable2DGS && any(zeroScales)) {
        vRgba = rgba;
        vSplatUv = position.xy * maxStdDev;

        vec3 offset;
        if (zeroScales.z) {
            offset = vec3(vSplatUv.xy * scales.xy, 0.0);
        } else if (zeroScales.y) {
            offset = vec3(vSplatUv.x * scales.x, 0.0, vSplatUv.y * scales.z);
        } else {
            offset = vec3(0.0, vSplatUv.xy * scales.yz);
        }

        vec3 viewPos = viewCenter + quatVec(viewQuaternion, offset);
        gl_Position = projectionMatrix * vec4(viewPos, 1.0);
        vNdc = gl_Position.xyz / gl_Position.w;
        return;
    }

    
    vec3 ndcCenter = clipCenter.xyz / clipCenter.w;

    
    mat3 RS = scaleQuaternionToMatrix(scales, viewQuaternion);
    mat3 cov3D = RS * transpose(RS);

    
    vec2 scaledRenderSize = renderSize * focalAdjustment;
    vec2 focal = 0.5 * scaledRenderSize * vec2(projectionMatrix[0][0], projectionMatrix[1][1]);

    mat3 J;
    if(isOrthographic) {
        J = mat3(
            focal.x, 0.0, 0.0,
            0.0, focal.y, 0.0,
            0.0, 0.0, 0.0
        );
    } else {
        float invZ = 1.0 / viewCenter.z;
        vec2 J1 = focal * invZ;
        vec2 J2 = -(J1 * viewCenter.xy) * invZ;
        J = mat3(
            J1.x, 0.0, J2.x,
            0.0, J1.y, J2.y,
            0.0, 0.0, 0.0
        );
    }

    
    
    
    
    
    
    
    mat3 cov2D = transpose(J) * cov3D * J;
    float a = cov2D[0][0];
    float d = cov2D[1][1];
    float b = cov2D[0][1];

    
    a += preBlurAmount;
    d += preBlurAmount;

    float fullBlurAmount = blurAmount;
    if ((focalDistance > 0.0) && (apertureAngle > 0.0)) {
        float focusRadius = maxPixelRadius;
        if (viewCenter.z < 0.0) {
            float focusBlur = abs((-viewCenter.z - focalDistance) / viewCenter.z);
            float apertureRadius = focal.x * tan(0.5 * apertureAngle);
            focusRadius = focusBlur * apertureRadius;
        }
        fullBlurAmount = clamp(sqr(focusRadius), blurAmount, sqr(maxPixelRadius));
    }

    
    float detOrig = a * d - b * b;
    a += fullBlurAmount;
    d += fullBlurAmount;
    float det = a * d - b * b;

    
    float blurAdjust = sqrt(max(0.0, detOrig / det));
    rgba.a *= blurAdjust;
    if (rgba.a < minAlpha) {
        return;
    }

    
    float eigenAvg = 0.5 * (a + d);
    float eigenDelta = sqrt(max(0.0, eigenAvg * eigenAvg - det));
    float eigen1 = eigenAvg + eigenDelta;
    float eigen2 = eigenAvg - eigenDelta;

    vec2 eigenVec1 = normalize(vec2((abs(b) < 0.001) ? 1.0 : b, eigen1 - a));
    vec2 eigenVec2 = vec2(eigenVec1.y, -eigenVec1.x);

    float scale1 = min(maxPixelRadius, maxStdDev * sqrt(eigen1));
    float scale2 = min(maxPixelRadius, maxStdDev * sqrt(eigen2));
    if (scale1 < minPixelRadius && scale2 < minPixelRadius) {
        return;
    }

    
    vec2 pixelOffset = position.x * eigenVec1 * scale1 + position.y * eigenVec2 * scale2;
    vec2 ndcOffset = (2.0 / scaledRenderSize) * pixelOffset;
    vec3 ndc = vec3(ndcCenter.xy + ndcOffset, ndcCenter.z);

    vRgba = rgba;
    vSplatUv = position.xy * maxStdDev;
    vNdc = ndc;
    gl_Position = vec4(ndc.xy * clipCenter.w, clipCenter.zw);
    #include <logdepthbuf_vertex>
}`;let Wr=null;function bf(){return Wr||(vu.splatDefines=yf,Wr={splatVertex:xf,splatFragment:wf}),Wr}const RA=5,Cr=class Nt extends ae{constructor(e){const n=Nt.makeUniforms(),a=bf(),i=e.premultipliedAlpha??!0,s=new mt({glslVersion:hl,vertexShader:a.splatVertex,fragmentShader:a.splatFragment,uniforms:n,premultipliedAlpha:i,transparent:!0,depthTest:!0,depthWrite:!1,side:tn});super(NA,s),this.splatTexture=null,this.autoViewpoints=[],this.rotateToAccumulator=new pr({value:new Rt}),this.translateToAccumulator=new $s({value:new j}),this.lastFrame=-1,this.lastUpdateTime=null,this.defaultCameras=[],this.lastStochastic=null,this.pendingUpdate={scene:null,originToWorld:new Zt,timeoutId:-1},this.envViewpoint=null,this.frustumCulled=!1,this.renderer=e.renderer,this.material=s,this.uniforms=n;const r=ta({gsplat:St},{gsplat:St},({gsplat:o})=>{if(!o)throw new Error("gsplat not defined");return o=Ul(o,{rotate:this.rotateToAccumulator,translate:this.translateToAccumulator}),{gsplat:o}});this.modifier=new q0(r),this.premultipliedAlpha=i,this.autoUpdate=e.autoUpdate??!0,this.preUpdate=e.preUpdate??!1,this.needsUpdate=!1,this.originDistance=e.originDistance??1,this.maxStdDev=e.maxStdDev??Math.sqrt(8),this.minPixelRadius=e.minPixelRadius??0,this.maxPixelRadius=e.maxPixelRadius??512,this.minAlpha=e.minAlpha??.5*(1/255),this.enable2DGS=e.enable2DGS??!1,this.preBlurAmount=e.preBlurAmount??0,this.blurAmount=e.blurAmount??.3,this.focalDistance=e.focalDistance??0,this.apertureAngle=e.apertureAngle??0,this.falloff=e.falloff??1,this.clipXY=e.clipXY??1.4,this.focalAdjustment=e.focalAdjustment??1,this.splatEncoding=e.splatEncoding??{...Ir},this.active=new jr,this.active.refCount=1,this.accumulatorCount=1,this.freeAccumulators=[];for(let o=0;o<1;++o)this.freeAccumulators.push(new jr),this.accumulatorCount+=1;this.defaultView=new zA({...e.view,autoUpdate:!0,spark:this}),this.viewpoint=this.defaultView,this.prepareViewpoint(this.viewpoint),this.clock=e.clock?e0(e.clock):new _o}static makeUniforms(){return{renderSize:{value:new ze},near:{value:.1},far:{value:1e3},numSplats:{value:0},renderToViewQuat:{value:new Rt},renderToViewPos:{value:new j},maxStdDev:{value:1},minPixelRadius:{value:0},maxPixelRadius:{value:512},minAlpha:{value:.00196078431372549},stochastic:{value:!1},enable2DGS:{value:!1},preBlurAmount:{value:0},blurAmount:{value:.3},focalDistance:{value:0},apertureAngle:{value:0},falloff:{value:1},clipXY:{value:1.4},focalAdjustment:{value:1},splatTexEnable:{value:!1},splatTexture:{type:"t",value:Nt.EMPTY_SPLAT_TEXTURE},splatTexMul:{value:new fl},splatTexAdd:{value:new ze},splatTexNear:{value:.1},splatTexFar:{value:1e3},splatTexMid:{value:0},packedSplats:{type:"t",value:Ya.getEmpty()},rgbMinMaxLnScaleMinMax:{value:new wn},time:{value:0},deltaTime:{value:0},encodeLinear:{value:!1},debugFlag:{value:!1}}}canAllocAccumulator(){return this.freeAccumulators.length>0||this.accumulatorCount<RA}maybeAllocAccumulator(){let e=this.freeAccumulators.pop();if(e===void 0){if(this.accumulatorCount>=RA)return null;e=new jr,this.accumulatorCount+=1}return e.refCount=1,e}releaseAccumulator(e){e.refCount-=1,e.refCount===0&&this.freeAccumulators.push(e)}newViewpoint(e){return new zA({...e,spark:this})}onBeforeRender(e,n,a){var i,s;const r=this.time??this.clock.getElapsedTime(),o=r-(this.viewpoint.lastTime??r);this.viewpoint.lastTime=r;const A=e.info.render.frame,l=A!==this.lastFrame;this.lastFrame=A;const u=this.viewpoint;if(u===this.defaultView){if(l)if(!e.xr.isPresenting)this.defaultView.viewToWorld=a.matrixWorld.clone(),this.defaultCameras=[this.defaultView.viewToWorld];else{const m=e.xr.getCamera().cameras;this.defaultCameras=m.map(B=>B.matrixWorld),this.defaultView.viewToWorld=Qf(this.defaultCameras)??new Zt}this.autoUpdate&&this.update({scene:n,viewToWorld:this.defaultView.viewToWorld})}if(l&&(this.material.premultipliedAlpha!==this.premultipliedAlpha&&(this.material.premultipliedAlpha=this.premultipliedAlpha,this.material.needsUpdate=!0),this.uniforms.time.value=r,this.uniforms.deltaTime.value=o,this.uniforms.debugFlag.value=performance.now()/1e3%2<1,u.display&&u.stochastic&&(this.geometry.instanceCount=this.uniforms.numSplats.value)),u.target)this.uniforms.renderSize.value.set(u.target.width,u.target.height);else{const m=e.getDrawingBufferSize(this.uniforms.renderSize.value);if(m.x===1&&m.y===1){const B=(i=e.xr.getSession())==null?void 0:i.renderState.baseLayer;B&&(m.x=B.framebufferWidth,m.y=B.framebufferHeight)}}const c=a;if(this.uniforms.near.value=c.near,this.uniforms.far.value=c.far,this.uniforms.encodeLinear.value=u.encodeLinear,this.uniforms.maxStdDev.value=this.maxStdDev,this.uniforms.minPixelRadius.value=this.minPixelRadius,this.uniforms.maxPixelRadius.value=this.maxPixelRadius,this.uniforms.minAlpha.value=this.minAlpha,this.uniforms.stochastic.value=u.stochastic,this.uniforms.enable2DGS.value=this.enable2DGS,this.uniforms.preBlurAmount.value=this.preBlurAmount,this.uniforms.blurAmount.value=this.blurAmount,this.uniforms.focalDistance.value=this.focalDistance,this.uniforms.apertureAngle.value=this.apertureAngle,this.uniforms.falloff.value=this.falloff,this.uniforms.clipXY.value=this.clipXY,this.uniforms.focalAdjustment.value=this.focalAdjustment,this.lastStochastic!==!u.stochastic&&(this.lastStochastic=!u.stochastic,this.material.transparent=!u.stochastic,this.material.depthWrite=u.stochastic,this.material.needsUpdate=!0),this.splatTexture){const{enable:m,texture:B,multiply:d,add:E,near:I,far:y,mid:Q}=this.splatTexture;m&&B?(this.uniforms.splatTexEnable.value=!0,this.uniforms.splatTexture.value=B,d?this.uniforms.splatTexMul.value.fromArray(d.elements):this.uniforms.splatTexMul.value.set(.5/this.maxStdDev,0,0,.5/this.maxStdDev),this.uniforms.splatTexAdd.value.set((E==null?void 0:E.x)??.5,(E==null?void 0:E.y)??.5),this.uniforms.splatTexNear.value=I??this.uniforms.near.value,this.uniforms.splatTexFar.value=y??this.uniforms.far.value,this.uniforms.splatTexMid.value=Q??0):(this.uniforms.splatTexEnable.value=!1,this.uniforms.splatTexture.value=Nt.EMPTY_SPLAT_TEXTURE)}else this.uniforms.splatTexEnable.value=!1,this.uniforms.splatTexture.value=Nt.EMPTY_SPLAT_TEXTURE;const g=((s=u.display)==null?void 0:s.accumulator.toWorld)??new Zt,f=a.matrixWorld.clone().invert();g.clone().premultiply(f).decompose(this.uniforms.renderToViewPos.value,this.uniforms.renderToViewQuat.value,new j)}prepareViewpoint(e){var n,a,i,s;if(this.viewpoint=e??this.viewpoint,this.viewpoint.display){const{accumulator:r,geometry:o}=this.viewpoint.display;this.uniforms.numSplats.value=r.splats.numSplats,this.uniforms.packedSplats.value=r.splats.getTexture(),this.uniforms.rgbMinMaxLnScaleMinMax.value.set(((n=r.splats.splatEncoding)==null?void 0:n.rgbMin)??0,((a=r.splats.splatEncoding)==null?void 0:a.rgbMax)??1,((i=r.splats.splatEncoding)==null?void 0:i.lnScaleMin)??$n,((s=r.splats.splatEncoding)==null?void 0:s.lnScaleMax)??ea),this.geometry=o,this.material.transparent=!this.viewpoint.stochastic,this.material.depthWrite=this.viewpoint.stochastic,this.material.needsUpdate=!0}else this.uniforms.numSplats.value=0,this.uniforms.packedSplats.value=Ya.getEmpty(),this.geometry=NA}update({scene:e,viewToWorld:n}){const a=this.matrixWorld;this.preUpdate?this.updateInternal({scene:e,originToWorld:a.clone(),viewToWorld:n}):(this.pendingUpdate.scene=e,this.pendingUpdate.originToWorld.copy(a),this.pendingUpdate.timeoutId===-1&&(this.pendingUpdate.timeoutId=setTimeout(()=>{const{scene:i,originToWorld:s}=this.pendingUpdate;this.pendingUpdate.scene=null,this.pendingUpdate.timeoutId=-1,this.updateInternal({scene:i,originToWorld:s,viewToWorld:n})&&this.renderer.getContext().flush()},1)))}updateInternal({scene:e,originToWorld:n,viewToWorld:a}){var i;if(!this.canAllocAccumulator())return!1;n||(n=this.active.toWorld),a=a??n.clone();const s=this.time??this.clock.getElapsedTime(),r=s-(this.lastUpdateTime??s);this.lastUpdateTime=s;const o=this.active.mapping.reduce((m,B)=>(m.set(B.node,B),m),new Map),{generators:A,visibleGenerators:l,globalEdits:u}=this.compileScene(e);for(const m of A)(i=m.frameUpdate)==null||i.call(m,{object:m,time:s,deltaTime:r,viewToWorld:a,globalEdits:u});const c=new Set(l.map(m=>m.uuid));for(const m of A){const B=o.get(m),E=m.generator&&c.has(m.uuid)?m.numSplats:0;(this.needsUpdate||m.generator!==(B==null?void 0:B.generator)||E!==(B==null?void 0:B.count))&&m.updateVersion()}const g=!uo({matrix1:n,matrix2:this.active.toWorld,maxDistance:this.originDistance}),f=this.needsUpdate||g||A.length!==o.size||A.some(m=>{var B;return m.version!==((B=o.get(m))==null?void 0:B.version)});this.needsUpdate=!1;let p=null;if(f){if(p=this.maybeAllocAccumulator(),!p)throw new Error("Unreachable");const m=!uo({matrix1:n,matrix2:p.toWorld,maxDistance:1e-5,minCoorient:.99999}),d=l.map((v,T)=>{const F=o.get(v);return F?[v.version-F.version,F.base,v]:[Number.POSITIVE_INFINITY,v.version,v]}).sort((v,T)=>v[0]!==T[0]?v[0]-T[0]:v[1]-T[1]).map(([v,T,F])=>F),E=d.map(v=>v.numSplats),{maxSplats:I,mapping:y}=p.splats.generateMapping(E),Q=d.map((v,T)=>{const{base:F,count:Z}=y[T];return{node:v,generator:v.generator,version:v.version,base:F,count:Z}});n.clone().invert().decompose(this.translateToAccumulator.value,this.rotateToAccumulator.value,new j),p.ensureGenerate(I),p.splats.splatEncoding={...this.splatEncoding},p.generateSplats({renderer:this.renderer,modifier:this.modifier,generators:Q,forceUpdate:m,originToWorld:n}),p.splatsVersion=this.active.splatsVersion+1;const D=p.hasCorrespondence(this.active);p.mappingVersion=this.active.mappingVersion+(D?0:1),this.releaseAccumulator(this.active),this.active=p,this.prepareViewpoint()}return setTimeout(()=>{for(const m of this.autoViewpoints)m.autoPoll({accumulator:p??void 0})},1),!0}compileScene(e){const n=[];e.traverse(s=>{s instanceof ho&&n.push(s)});const a=[];e.traverseVisible(s=>{s instanceof ho&&a.push(s)});const i=new Set;return e.traverseVisible(s=>{if(s instanceof Zl){let r=s.parent;for(;r!=null&&!(r instanceof Uo);)r=r.parent;r==null&&i.add(s)}}),{generators:n,visibleGenerators:a,globalEdits:Array.from(i)}}async renderEnvMap({renderer:e,scene:n,worldCenter:a,size:i=256,near:s=.1,far:r=1e3,hideObjects:o=[],update:A=!1}){var l,u;if(this.envViewpoint||(this.envViewpoint=this.newViewpoint({sort360:!0})),!Nt.cubeRender||Nt.cubeRender.target.width!==i||Nt.cubeRender.near!==s||Nt.cubeRender.far!==r){Nt.cubeRender&&Nt.cubeRender.target.dispose();const m=new Eu(i,{format:Ua,generateMipmaps:!0,minFilter:yu}),B=new wu(s,r,m);Nt.cubeRender={target:m,camera:B,near:s,far:r}}Nt.pmrem||(Nt.pmrem=new dl(e??this.renderer));const c=new Zt().setPosition(a);await((l=this.envViewpoint)==null?void 0:l.prepare({scene:n,viewToWorld:c,update:A}));const{target:g,camera:f}=Nt.cubeRender;f.position.copy(a);const p=new Map;for(const m of o)p.set(m,m.visible),m.visible=!1;this.prepareViewpoint(this.envViewpoint),f.update(e??this.renderer,n),this.prepareViewpoint(this.defaultView);for(const[m,B]of p.entries())m.visible=B;return(u=Nt.pmrem)==null?void 0:u.fromCubemap(g.texture).texture}recurseSetEnvMap(e,n){e.traverse(a=>{if(a instanceof ae)if(Array.isArray(a.material))for(const i of a.material)i instanceof rt&&(i.envMap=n);else a.material instanceof rt&&(a.material.envMap=n)})}getRgba({generator:e,rgba:n}){const a=this.active.mapping.find(({node:i})=>i===e);if(!a)throw new Error("Generator not found");return n=n??new R0,n.fromPackedSplats({packedSplats:this.active.splats,base:a.base,count:a.count,renderer:this.renderer}),n}async readRgba({generator:e,rgba:n}){return n=this.getRgba({generator:e,rgba:n}),n.read()}};Cr.cubeRender=null;Cr.pmrem=null;Cr.EMPTY_SPLAT_TEXTURE=new Cu;let FA=Cr;const NA=new mo(new Uint32Array(1),0);ta({packedSplats:dr,index:"int"},{gsplat:St},({packedSplats:t,index:e})=>{if(!t||!e)throw new Error("Invalid input");return{gsplat:Pi(t,e)}});function Qf(t){if(t.length===0)return null;const e=new j,n=new Rt,a=new j,i=[],s=[];for(const r of t)r.decompose(e,n,a),i.push(e),s.push(n);return new Zt().compose(n0(i),a0(s),new j(1,1,1))}an(`
  struct GsplatSkinning {
    int numSplats;
    int numBones;
    usampler2DArray skinTexture;
    sampler2D boneTexture;
  };
`);an(`
  void applyGsplatSkinning(
    int numSplats, int numBones,
    usampler2DArray skinTexture, sampler2D boneTexture,
    int splatIndex, inout vec3 center, inout vec4 quaternion
  ) {
    if ((splatIndex < 0) || (splatIndex >= numSplats)) {
      return;
    }

    uvec4 skinData = texelFetch(skinTexture, splatTexCoord(splatIndex), 0);

    float weights[4];
    weights[0] = float(skinData.x & 0xffu) / 255.0;
    weights[1] = float(skinData.y & 0xffu) / 255.0;
    weights[2] = float(skinData.z & 0xffu) / 255.0;
    weights[3] = float(skinData.w & 0xffu) / 255.0;

    uint boneIndices[4];
    boneIndices[0] = (skinData.x >> 8u) & 0xffu;
    boneIndices[1] = (skinData.y >> 8u) & 0xffu;
    boneIndices[2] = (skinData.z >> 8u) & 0xffu;
    boneIndices[3] = (skinData.w >> 8u) & 0xffu;

    vec4 quat = vec4(0.0);
    vec4 dual = vec4(0.0);
    for (int i = 0; i < 4; i++) {
      if (weights[i] > 0.0) {
        int boneIndex = int(boneIndices[i]);
        vec4 boneQuat = vec4(0.0, 0.0, 0.0, 1.0);
        vec4 boneDual = vec4(0.0);
        if (boneIndex < numBones) {
          boneQuat = texelFetch(boneTexture, ivec2(2, boneIndex), 0);
          boneDual = texelFetch(boneTexture, ivec2(3, boneIndex), 0);
        }

        if ((i > 0) && (dot(quat, boneQuat) < 0.0)) {
          // Flip sign if next blend is pointing in the opposite direction
          boneQuat = -boneQuat;
          boneDual = -boneDual;
        }
        quat += weights[i] * boneQuat;
        dual += weights[i] * boneDual;
      }
    }

    // Normalize dual quaternion
    float norm = length(quat);
    quat /= norm;
    dual /= norm;
    vec3 translate = vec3(
      2.0 * (-dual.w * quat.x + dual.x * quat.w - dual.y * quat.z + dual.z * quat.y),
      2.0 * (-dual.w * quat.y + dual.x * quat.z + dual.y * quat.w - dual.z * quat.x),
      2.0 * (-dual.w * quat.z - dual.x * quat.y + dual.y * quat.x + dual.z * quat.w)
    );

    center = quatVec(quat, center) + translate;
    quaternion = quatQuat(quat, quaternion);
  }
`);new To(new j(-1,-1,-1),new j(1,1,1)),new j(-1,-3,1).normalize(),new Xe(1,1,1),new Xe(.5,.5,1),new j(1,1,1);new To(new j(-2,-1,-2),new j(2,5,2)),new j(0,-1,0),new Xe(1,1,1),new Xe(.25,.25,.5),new j(.1,1,.1);const lc=class Io{static createButton(e,n={}){const a=navigator.xr;if(!a)return null;const i=a,s=document.createElement("button");e.xr.enabled=!0,e.xr.setReferenceSpaceType("local");function r(){let c=null;async function g(m){console.log("onSessionStarted"),m.addEventListener("end",f),await e.xr.setSession(m),s.textContent="EXIT VR",c=m}function f(){console.log("onSessionEnded"),c==null||c.removeEventListener("end",f),s.textContent="ENTER VR",c=null}s.style.display="",s.style.cursor="pointer",s.style.left="calc(50% - 100px)",s.style.width="200px",s.style.height="100px",s.textContent="ENTER VR";const p={...n,optionalFeatures:[...n.optionalFeatures||[]]};s.onmouseenter=()=>{s.style.opacity="1.0"},s.onmouseleave=()=>{s.style.opacity="0.5"},s.onclick=()=>{c===null?(console.log("requesting session"),i.requestSession("immersive-vr",p).then(g)):(console.log("ending session"),c.end())}}function o(){s.style.display="none",s.style.cursor="auto",s.style.left="calc(50% - 75px)",s.style.width="150px",s.onmouseenter=null,s.onmouseleave=null,s.onclick=null}function A(){o(),s.textContent="VR NOT SUPPORTED"}function l(c){o(),console.warn("Exception when trying to call xr.isSessionSupported",c),s.textContent="VR NOT ALLOWED"}function u(c){c.style.position="absolute",c.style.bottom="20px",c.style.padding="12px 6px",c.style.border="1px solid #fff",c.style.borderRadius="4px",c.style.background="rgba(0,0,0,0.1)",c.style.color="#fff",c.style.font="normal 13px sans-serif",c.style.textAlign="center",c.style.opacity="0.5",c.style.outline="none",c.style.zIndex="999"}return s.id="VRButton",s.style.display="none",u(s),i.isSessionSupported("immersive-vr").then(c=>{c?r():A(),c&&Io.xrSessionIsGranted&&s.click()}).catch(l),s}static registerSessionGrantedListener(){const e=navigator.xr;if(!e)return null;const n=e;/WebXRViewer\//i.test(navigator.userAgent)||n.addEventListener("sessiongranted",()=>{Io.xrSessionIsGranted=!0})}};lc.xrSessionIsGranted=!1;let vf=lc;vf.registerSessionGrantedListener();var cc=(t=>(t.w="wrist",t.t0="thumb-metacarpal",t.t1="thumb-phalanx-proximal",t.t2="thumb-phalanx-distal",t.t3="thumb-tip",t.i0="index-finger-metacarpal",t.i1="index-finger-phalanx-proximal",t.i2="index-finger-phalanx-intermediate",t.i3="index-finger-phalanx-distal",t.i4="index-finger-tip",t.m0="middle-finger-metacarpal",t.m1="middle-finger-phalanx-proximal",t.m2="middle-finger-phalanx-intermediate",t.m3="middle-finger-phalanx-distal",t.m4="middle-finger-tip",t.r0="ring-finger-metacarpal",t.r1="ring-finger-phalanx-proximal",t.r2="ring-finger-phalanx-intermediate",t.r3="ring-finger-phalanx-distal",t.r4="ring-finger-tip",t.p0="pinky-finger-metacarpal",t.p1="pinky-finger-phalanx-proximal",t.p2="pinky-finger-phalanx-intermediate",t.p3="pinky-finger-phalanx-distal",t.p4="pinky-finger-tip",t))(cc||{});const Sf=Object.keys(cc);Sf.length;new j(0,0,-1),new j(0,0,1),new j(-1,0,0),new j(1,0,0),new j(0,1,0),new j(0,-1,0);new j(0,0,-1),new j(0,0,1),new j(-1,0,0),new j(1,0,0),new j(0,1,0),new j(0,-1,0);new j(0,0,1),new j(0,0,-1);new j(0,-1,0),new j(0,1,0),new j(-1,0,0),new j(1,0,0);const Hi={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class yi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Mf=new ko(-1,1,1,-1,0,1);class kf extends Ei{constructor(){super(),this.setAttribute("position",new pi([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new pi([0,2,0,0,2,0],2))}}const Df=new kf;class Ho{constructor(e){this._mesh=new ae(Df,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Mf)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class uc extends yi{constructor(e,n){super(),this.textureID=n!==void 0?n:"tDiffuse",e instanceof mt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ha.clone(e.uniforms),this.material=new mt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ho(this.material)}render(e,n,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class LA extends yi{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,a){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let r,o;this.inverse?(r=0,o=1):(r=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Tf extends yi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class _f{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const a=e.getSize(new ze);this._width=a.width,this._height=a.height,n=new Rn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:pa}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new uc(Hi),this.copyPass.material.blending=On,this.clock=new _o}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const n=this.renderer.getRenderTarget();let a=!1;for(let i=0,s=this.passes.length;i<s;i++){const r=this.passes[i];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),r.needsSwap){if(a){const o=this.renderer.getContext(),A=this.renderer.state.buffers.stencil;A.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),A.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}LA!==void 0&&(r instanceof LA?a=!0:r instanceof Tf&&(a=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new ze);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const a=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(a,i),this.renderTarget2.setSize(a,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(a,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class zf extends yi{constructor(e,n,a=null,i=null,s=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=a,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Xe}render(e,n,a){const i=e.autoClear;e.autoClear=!1;let s,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=i}}const Ns={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ze},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Zt},cameraProjectionMatrixInverse:{value:new Zt},cameraWorldMatrix:{value:new Zt},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new j(-1,-1,-1)},sceneBoxMax:{value:new j(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Ls={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Xr={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Rf(t=5){const e=Math.floor(t)%2===0?Math.floor(t)+1:Math.floor(t),n=Ff(e),a=n.length,i=new Uint8Array(a*4);for(let r=0;r<a;++r){const o=n[r],A=2*Math.PI*o/a,l=new j(Math.cos(A),Math.sin(A),0).normalize();i[r*4]=(l.x*.5+.5)*255,i[r*4+1]=(l.y*.5+.5)*255,i[r*4+2]=127,i[r*4+3]=255}const s=new zo(i,e,e);return s.wrapS=Nn,s.wrapT=Nn,s.needsUpdate=!0,s}function Ff(t){const e=Math.floor(t)%2===0?Math.floor(t)+1:Math.floor(t),n=e*e,a=Array(n).fill(0);let i=Math.floor(e/2),s=e-1;for(let r=1;r<=n;){if(i===-1&&s===e?(s=e-2,i=0):(s===e&&(s=0),i<0&&(i=e-1)),a[i*e+s]!==0){s-=2,i++;continue}else a[i*e+s]=r++;s++,i--}return a}const Gs={defines:{SAMPLES:16,SAMPLE_VECTORS:gc(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ze},cameraProjectionMatrixInverse:{value:new Zt},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function gc(t,e,n){const a=Nf(t,e,n);let i="vec3[SAMPLES](";for(let s=0;s<t;s++){const r=a[s];i+=`vec3(${r.x}, ${r.y}, ${r.z})${s<t-1?",":")"}`}return i}function Nf(t,e,n){const a=[];for(let i=0;i<t;i++){const s=2*Math.PI*e*i/t,r=Math.pow(i/(t-1),n);a.push(new j(Math.cos(s),Math.sin(s),r))}return a}class Lf{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let n=0;n<256;n++)this.p[n]=Math.floor(e.random()*256);this.perm=[];for(let n=0;n<512;n++)this.perm[n]=this.p[n&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,n,a){return e[0]*n+e[1]*a}dot3(e,n,a,i){return e[0]*n+e[1]*a+e[2]*i}dot4(e,n,a,i,s){return e[0]*n+e[1]*a+e[2]*i+e[3]*s}noise(e,n){let a,i,s;const r=.5*(Math.sqrt(3)-1),o=(e+n)*r,A=Math.floor(e+o),l=Math.floor(n+o),u=(3-Math.sqrt(3))/6,c=(A+l)*u,g=A-c,f=l-c,p=e-g,m=n-f;let B,d;p>m?(B=1,d=0):(B=0,d=1);const E=p-B+u,I=m-d+u,y=p-1+2*u,Q=m-1+2*u,D=A&255,v=l&255,T=this.perm[D+this.perm[v]]%12,F=this.perm[D+B+this.perm[v+d]]%12,Z=this.perm[D+1+this.perm[v+1]]%12;let x=.5-p*p-m*m;x<0?a=0:(x*=x,a=x*x*this.dot(this.grad3[T],p,m));let z=.5-E*E-I*I;z<0?i=0:(z*=z,i=z*z*this.dot(this.grad3[F],E,I));let se=.5-y*y-Q*Q;return se<0?s=0:(se*=se,s=se*se*this.dot(this.grad3[Z],y,Q)),70*(a+i+s)}noise3d(e,n,a){let i,s,r,o;const l=(e+n+a)*.3333333333333333,u=Math.floor(e+l),c=Math.floor(n+l),g=Math.floor(a+l),f=1/6,p=(u+c+g)*f,m=u-p,B=c-p,d=g-p,E=e-m,I=n-B,y=a-d;let Q,D,v,T,F,Z;E>=I?I>=y?(Q=1,D=0,v=0,T=1,F=1,Z=0):E>=y?(Q=1,D=0,v=0,T=1,F=0,Z=1):(Q=0,D=0,v=1,T=1,F=0,Z=1):I<y?(Q=0,D=0,v=1,T=0,F=1,Z=1):E<y?(Q=0,D=1,v=0,T=0,F=1,Z=1):(Q=0,D=1,v=0,T=1,F=1,Z=0);const x=E-Q+f,z=I-D+f,se=y-v+f,J=E-T+2*f,oe=I-F+2*f,G=y-Z+2*f,me=E-1+3*f,Ee=I-1+3*f,w=y-1+3*f,X=u&255,L=c&255,O=g&255,q=this.perm[X+this.perm[L+this.perm[O]]]%12,K=this.perm[X+Q+this.perm[L+D+this.perm[O+v]]]%12,re=this.perm[X+T+this.perm[L+F+this.perm[O+Z]]]%12,he=this.perm[X+1+this.perm[L+1+this.perm[O+1]]]%12;let ie=.6-E*E-I*I-y*y;ie<0?i=0:(ie*=ie,i=ie*ie*this.dot3(this.grad3[q],E,I,y));let pe=.6-x*x-z*z-se*se;pe<0?s=0:(pe*=pe,s=pe*pe*this.dot3(this.grad3[K],x,z,se));let ye=.6-J*J-oe*oe-G*G;ye<0?r=0:(ye*=ye,r=ye*ye*this.dot3(this.grad3[re],J,oe,G));let b=.6-me*me-Ee*Ee-w*w;return b<0?o=0:(b*=b,o=b*b*this.dot3(this.grad3[he],me,Ee,w)),32*(i+s+r+o)}noise4d(e,n,a,i){const s=this.grad4,r=this.simplex,o=this.perm,A=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let u,c,g,f,p;const m=(e+n+a+i)*A,B=Math.floor(e+m),d=Math.floor(n+m),E=Math.floor(a+m),I=Math.floor(i+m),y=(B+d+E+I)*l,Q=B-y,D=d-y,v=E-y,T=I-y,F=e-Q,Z=n-D,x=a-v,z=i-T,se=F>Z?32:0,J=F>x?16:0,oe=Z>x?8:0,G=F>z?4:0,me=Z>z?2:0,Ee=x>z?1:0,w=se+J+oe+G+me+Ee,X=r[w][0]>=3?1:0,L=r[w][1]>=3?1:0,O=r[w][2]>=3?1:0,q=r[w][3]>=3?1:0,K=r[w][0]>=2?1:0,re=r[w][1]>=2?1:0,he=r[w][2]>=2?1:0,ie=r[w][3]>=2?1:0,pe=r[w][0]>=1?1:0,ye=r[w][1]>=1?1:0,b=r[w][2]>=1?1:0,M=r[w][3]>=1?1:0,_=F-X+l,ge=Z-L+l,te=x-O+l,fe=z-q+l,Be=F-K+2*l,be=Z-re+2*l,qe=x-he+2*l,Me=z-ie+2*l,we=F-pe+3*l,it=Z-ye+3*l,k=x-b+3*l,N=z-M+3*l,W=F-1+4*l,ce=Z-1+4*l,Y=x-1+4*l,Qe=z-1+4*l,C=B&255,U=d&255,V=E&255,ne=I&255,P=o[C+o[U+o[V+o[ne]]]]%32,_e=o[C+X+o[U+L+o[V+O+o[ne+q]]]]%32,Fe=o[C+K+o[U+re+o[V+he+o[ne+ie]]]]%32,ke=o[C+pe+o[U+ye+o[V+b+o[ne+M]]]]%32,We=o[C+1+o[U+1+o[V+1+o[ne+1]]]]%32;let $e=.6-F*F-Z*Z-x*x-z*z;$e<0?u=0:($e*=$e,u=$e*$e*this.dot4(s[P],F,Z,x,z));let Ne=.6-_*_-ge*ge-te*te-fe*fe;Ne<0?c=0:(Ne*=Ne,c=Ne*Ne*this.dot4(s[_e],_,ge,te,fe));let Le=.6-Be*Be-be*be-qe*qe-Me*Me;Le<0?g=0:(Le*=Le,g=Le*Le*this.dot4(s[Fe],Be,be,qe,Me));let Oe=.6-we*we-it*it-k*k-N*N;Oe<0?f=0:(Oe*=Oe,f=Oe*Oe*this.dot4(s[ke],we,it,k,N));let pt=.6-W*W-ce*ce-Y*Y-Qe*Qe;return pt<0?p=0:(pt*=pt,p=pt*pt*this.dot4(s[We],W,ce,Y,Qe)),27*(u+c+g+f+p)}}class Cn extends yi{constructor(e,n,a,i,s,r,o){super(),this.width=a!==void 0?a:512,this.height=i!==void 0?i:512,this.clear=!0,this.camera=n,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Rf(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Rn(this.width,this.height,{type:pa}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new mt({defines:Object.assign({},Ns.defines),uniforms:ha.clone(Ns.uniforms),vertexShader:Ns.vertexShader,fragmentShader:Ns.fragmentShader,blending:On,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Su,this.normalMaterial.blending=On,this.pdMaterial=new mt({defines:Object.assign({},Gs.defines),uniforms:ha.clone(Gs.uniforms),vertexShader:Gs.vertexShader,fragmentShader:Gs.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new mt({defines:Object.assign({},Ls.defines),uniforms:ha.clone(Ls.uniforms),vertexShader:Ls.vertexShader,fragmentShader:Ls.fragmentShader,blending:On}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new mt({uniforms:ha.clone(Hi.uniforms),vertexShader:Hi.vertexShader,fragmentShader:Hi.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:lA,blendDst:xs,blendEquation:ws,blendSrcAlpha:AA,blendDstAlpha:xs,blendEquationAlpha:ws}),this.blendMaterial=new mt({uniforms:ha.clone(Xr.uniforms),vertexShader:Xr.vertexShader,fragmentShader:Xr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Mu,blendSrc:lA,blendDst:xs,blendEquation:ws,blendSrcAlpha:AA,blendDstAlpha:xs,blendEquationAlpha:ws}),this.fsQuad=new Ho(null),this.originalClearColor=new Xe,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),r!==void 0&&this.updateGtaoMaterial(r),o!==void 0&&this.updatePdMaterial(o)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,n){e!==void 0?(this.depthTexture=e,this.normalTexture=n,this._renderGBuffer=!1):(this.depthTexture=new ku,this.depthTexture.format=Du,this.depthTexture.type=Tu,this.normalRenderTarget=new Rn(this.width,this.height,{minFilter:Ia,magFilter:Ia,type:pa,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const a=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=a,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=a,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let n=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,n=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,n=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,n=!0),n&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=gc(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,n,a){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Cn.OUTPUT.Off:break;case Cn.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=a.texture,this.copyMaterial.blending=On,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case Cn.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=On,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case Cn.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=On,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case Cn.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:n);break;case Cn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=On,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case Cn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=a.texture,this.copyMaterial.blending=On,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,n,a,i,s){e.getClearColor(this.originalClearColor);const r=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(a),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(s||0),e.clear()),this.fsQuad.material=n,this.fsQuad.render(e),e.autoClear=o,e.setClearColor(this.originalClearColor),e.setClearAlpha(r)}renderOverride(e,n,a,i,s){e.getClearColor(this.originalClearColor);const r=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(a),e.autoClear=!1,i=n.clearColor||i,s=n.clearAlpha||s,i!=null&&(e.setClearColor(i),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=n,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this.originalClearColor),e.setClearAlpha(r)}setSize(e,n){this.width=e,this.height=n,this.gtaoRenderTarget.setSize(e,n),this.normalRenderTarget.setSize(e,n),this.pdRenderTarget.setSize(e,n),this.gtaoMaterial.uniforms.resolution.value.set(e,n),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,n),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){const e=this.scene,n=this._visibilityCache;e.traverse(function(a){n.set(a,a.visible),(a.isPoints||a.isLine)&&(a.visible=!1)})}restoreVisibility(){const e=this.scene,n=this._visibilityCache;e.traverse(function(a){const i=n.get(a);a.visible=i}),n.clear()}generateNoise(e=64){const n=new Lf,a=e*e*4,i=new Uint8Array(a);for(let r=0;r<e;r++)for(let o=0;o<e;o++){const A=r,l=o;i[(r*e+o)*4]=(n.noise(A,l)*.5+.5)*255,i[(r*e+o)*4+1]=(n.noise(A+e,l)*.5+.5)*255,i[(r*e+o)*4+2]=(n.noise(A,l+e)*.5+.5)*255,i[(r*e+o)*4+3]=(n.noise(A+e,l+e)*.5+.5)*255}const s=new zo(i,e,e,Ua,mi);return s.wrapS=Nn,s.wrapT=Nn,s.needsUpdate=!0,s}}Cn.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Gf={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Xe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ii extends yi{constructor(e,n,a,i){super(),this.strength=n!==void 0?n:1,this.radius=a,this.threshold=i,this.resolution=e!==void 0?new ze(e.x,e.y):new ze(256,256),this.clearColor=new Xe(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new Rn(s,r,{type:pa}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let c=0;c<this.nMips;c++){const g=new Rn(s,r,{type:pa});g.texture.name="UnrealBloomPass.h"+c,g.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(g);const f=new Rn(s,r,{type:pa});f.texture.name="UnrealBloomPass.v"+c,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),r=Math.round(r/2)}const o=Gf;this.highPassUniforms=ha.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new mt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const A=[3,5,7,9,11];s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let c=0;c<this.nMips;c++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(A[c])),this.separableBlurMaterials[c].uniforms.invSize.value=new ze(1/s,1/r),s=Math.round(s/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new j(1,1,1),new j(1,1,1),new j(1,1,1),new j(1,1,1),new j(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Hi;this.copyUniforms=ha.clone(u.uniforms),this.blendMaterial=new mt({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Sn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Xe,this.oldClearAlpha=1,this.basic=new Se,this.fsQuad=new Ho(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,n){let a=Math.round(e/2),i=Math.round(n/2);this.renderTargetBright.setSize(a,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(a,i),this.renderTargetsVertical[s].setSize(a,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ze(1/a,1/i),a=Math.round(a/2),i=Math.round(i/2)}render(e,n,a,i,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=a.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let A=0;A<this.nMips;A++)this.fsQuad.material=this.separableBlurMaterials[A],this.separableBlurMaterials[A].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[A].uniforms.direction.value=Ii.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[A]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[A].uniforms.colorTexture.value=this.renderTargetsHorizontal[A].texture,this.separableBlurMaterials[A].uniforms.direction.value=Ii.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[A]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[A];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(a),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=r}getSeperableBlurMaterial(e){const n=[];for(let a=0;a<e;a++)n.push(.39894*Math.exp(-.5*a*a/(e*e))/e);return new mt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ze(.5,.5)},direction:{value:new ze(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new mt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ii.BlurDirectionX=new ze(1,0);Ii.BlurDirectionY=new ze(0,1);const za=_u||{},GA=new URLSearchParams(location.search),Uf=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>1&&Math.min(screen.width,screen.height)<820,UA=(()=>{try{return localStorage.getItem("tjmPlayQ")}catch{return null}})(),nr=["low","medium","high"],ma=nr.includes(GA.get("q"))?GA.get("q"):nr.includes(UA)?UA:Uf?"low":"medium",zt=ma==="high",qa=ma==="medium",na=ma==="low",Co=1,Yf=t=>nr[(nr.indexOf(t)+1)%3];function qf(t){try{localStorage.setItem("tjmPlayQ",t)}catch{}const e=new URL(location.href);e.searchParams.delete("q"),location.replace(e)}function Pf(t){const e=new zu({canvas:t,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"});return e.setPixelRatio(Math.min(devicePixelRatio||1,1.25)),e.setSize(innerWidth,innerHeight,!1),e.toneMapping=Ao,e.toneMappingExposure=za.exposure??1.8,e.outputColorSpace=Ct,e.shadowMap.enabled=!na,e.shadowMap.type=zt?Ru:Fu,e}const Hf=new is,Kr={};function Zr(t,e,n){const a=t+e;if(Kr[a])return Kr[a];const i=e==="diff"&&na&&t!=="metal"?`${t}_diff_1k`:`${t}_${e}`,s=Hf.load("/play/pbr/"+i+".webp");return s.wrapS=s.wrapT=Nn,s.colorSpace=n?Ct:Lu,s.anisotropy=8,Kr[a]=s}const $r=(t,e,n)=>{const a=t.clone();return a.repeat.set(e,n),a};function Us(t,e,n,a={}){e=Math.max(.5,Math.round(e*4)/4),n=Math.max(.5,Math.round(n*4)/4);const i=[t,e,n,a.wet?1:0,a.tint||""].join("|");if(Vs.has(i))return Vs.get(i);const s=$r(Zr(t,"arm"),e,n),r={map:$r(Zr(t,"diff",!0),e,n),normalMap:$r(Zr(t,"nor"),e,n),aoMap:s,roughnessMap:s,metalnessMap:s,aoMapIntensity:.9};let o;return a.wet&&zt?o=new Nu({...r,roughness:.55,metalness:0,clearcoat:.7,clearcoatRoughness:.12,envMapIntensity:1,normalScale:new ze(.8,.8)}):a.wet?o=new rt({...r,roughness:.5,metalness:0,envMapIntensity:1.1}):t==="metal"?o=new rt({...r,roughness:1,metalness:1,envMapIntensity:.6}):o=new rt({...r,roughness:1,metalness:0,envMapIntensity:.5,normalScale:new ze(.7,.7)}),a.tint&&o.color.set(a.tint),a.wet&&(o.userData.wet=1,!zt&&Bo.tex&&(o.envMap=Bo.tex,o.envMapIntensity=1.4)),Vs.set(i,o),o}const va=za.materials?za.materials(na):null,Vs=va?va.cache:new Map,Pa=va?{stone:va.stone,metal:va.metal,floor:va.floor,ceiling:va.ceiling}:{stone:(t,e)=>Us("wall",t,e,{tint:12103072}),metal:(t,e)=>Us("metal",t,e),floor:(t,e)=>Us("floor",t,e,{wet:!0,tint:7235166}),ceiling:(t,e)=>Us("metal",t,e,{tint:6969424})},Bo={};function Jf(t,e){const n=new dl(t),a=new ji;a.add(new ae(new At(30,10,30),new Se({color:za.envColor??1708814,side:cl})));const i=(r,o,A,l,u,c)=>{const g=new ae(new Qt(c,12,8),new Se({color:new Xe(r).multiplyScalar(o)}));g.position.set(A,l,u),a.add(g)};(za.envGlows||[[16747056,6,-8,2,6,.6],[16747056,6,9,2,-5,.6],[16747056,6,3,2.5,12,.5],[16734736,3,-12,-1,-10,2.5],[16769712,2,0,3,-13,1.2]]).forEach(r=>i(...r));const s=n.fromScene(a,.02).texture;n.dispose(),zt?(e.environment=s,e.environmentIntensity=za.envIntensity??1.6):Vs.forEach(r=>{r.userData.wet&&(r.envMap=s,r.envMapIntensity=1.4,r.needsUpdate=!0)}),Bo.tex=s;{const r=za.fog||[1709070,.014,.016];e.fog=new ll(r[0],zt?r[2]:r[1])}}function ln(t){t.traverse(e=>{if(!e.material)return;e.layers.set(Co),(Array.isArray(e.material)?e.material:[e.material]).forEach(a=>{a.toneMapped=!1,a.fog=!1})})}const Of={uniforms:{tDiffuse:{value:null},tPaint:{value:null},toneMappingExposure:{value:1},uVig:{value:.22}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",fragmentShader:`varying vec2 vUv; uniform sampler2D tDiffuse, tPaint; uniform float uVig;
    #include <tonemapping_pars_fragment>
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      vec2 d = vUv - .5; c *= 1. - uVig * dot(d, d) * 2.;            // gentle vignette (graded image only)
      vec3 g = AgXToneMapping(c);
      vec4 p = texture2D(tPaint, vUv);                                // paintings: linear, untouched
      gl_FragColor = sRGBTransferOETF(vec4(mix(g, p.rgb, p.a), 1.)); }`};function Vf(t,e,n){n.layers.enable(Co);const a=()=>[innerWidth,innerHeight],i={level:"direct",render(){t.setRenderTarget(null),t.clear(),t.render(e,n)},setSize(){t.setSize(innerWidth,innerHeight,!1)}};if(!zt)return i;const s=t.getPixelRatio();let[r,o]=a();const A=new Rn(r*s,o*s,{type:pa,samples:2}),l=new _f(t,A);l.addPass(new zf(e,n));const u=new Cn(e,n,r*s/2,o*s/2),c=u.setSize.bind(u);u.setSize=(D,v)=>c(Math.round(D/2),Math.round(v/2)),u.output=Cn.OUTPUT.Default,u.blendIntensity=.75,u.updateGtaoMaterial({radius:.45,distanceExponent:1.4,thickness:1.2,scale:1,samples:8}),u.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:4,rings:2,samples:8}),l.addPass(u);const g=new Ii(new ze(r/2,o/2),.32,.5,1),f=g.setSize.bind(g);g.setSize=(D,v)=>f(Math.round(D/2),Math.round(v/2)),l.addPass(g);const p=new uc(Of);p.material.toneMapped=!1,l.addPass(p);const m=new Rn(r*s,o*s,{type:pa,samples:2});p.uniforms.tPaint.value=m.texture;const B=new Se({colorWrite:!1,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2,side:tn}),d=new Xe;function E(){const D=e.background,v=e.fog,T=t.autoClear,F=e.overrideMaterial,Z=n.layers.mask,x=t.shadowMap.autoUpdate;t.getClearColor(d);const z=t.getClearAlpha();e.background=null,e.fog=null,t.shadowMap.autoUpdate=!1,t.setRenderTarget(m),t.setClearColor(0,0),t.clear(),t.autoClear=!1,n.layers.set(0),e.overrideMaterial=B,t.render(e,n),n.layers.set(Co),e.overrideMaterial=null,t.render(e,n),n.layers.mask=Z,e.background=D,e.fog=v,t.autoClear=T,e.overrideMaterial=F,t.shadowMap.autoUpdate=x,t.setClearColor(d,z),t.setRenderTarget(null)}const I={level:"high",composer:l,gtao:u,bloom:g,render(){E(),l.render()},setSize(){[r,o]=a(),t.setSize(r,o,!1),l.setSize(r,o),m.setSize(r*s,o*s)}},y={level:"high",render:()=>Q.render(),setSize:()=>Q.setSize(),stepDown(){return Q===I?(A.dispose(),m.dispose(),l.dispose&&l.dispose(),Q=i,y.level="direct",i.setSize(),!0):!1}};let Q=I;return y}function jf(t=8,e=1){const i=document.createElement("canvas");i.width=512,i.height=128;const s=i.getContext("2d"),r=s.createImageData(512,128),o=[255,214,90],A=[255,110,20],l=[70,12,4];for(let c=0;c<128;c++)for(let g=0;g<512;g++){const f=g/512*Math.PI*2,p=c/128*Math.PI*2;let m=Math.sin(f*2+Math.sin(p)*1.8)+Math.sin(f*5-p+Math.cos(f*3)*1.2)*.5+Math.sin(p*2+f)*.4+Math.sin(f*11+Math.sin(f*4+p*2)*2)*.18;m=(m+1.9)/3.8;const B=Math.max(0,Math.min(1,m)),d=B<.5?l:A,E=B<.5?A:o,I=B<.5?B/.5:(B-.5)/.5,y=I*I*(3-2*I),Q=(c*512+g)*4;for(let D=0;D<3;D++)r.data[Q+D]=d[D]+(E[D]-d[D])*y;r.data[Q+3]=255}s.putImageData(r,0,0),s.filter="blur(3px)",s.drawImage(i,0,0),s.filter="none";const u=new Et(i);return u.colorSpace=Ct,u.wrapS=u.wrapT=Nn,u.repeat.set(t,e),u.anisotropy=8,u}let Ys=null;function Wf(){if(Ys)return Ys;const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=e.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,.45)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128),Ys=new Et(t),Ys}function ar(t,e){return new So({map:Wf(),color:t,transparent:!0,opacity:e,blending:Sn,depthWrite:!1,fog:!1})}function Xf(t,e){let n=0,a=0,i=0,s=0;return function(o,A){if(!a){a=o;return}const l=o-a;if(a=o,!A||l>500){n=0;return}if(!((i+=l)<3e3)&&(n=l>20?n+l:Math.max(0,n-l*2),n>2500&&s<t.length)){n=0,i=0;const u=t[s++];u(),e&&e(s,t.length)}}}const Kf=2.33,Zf=[-.2,-2.44],$f=[{id:"A",nx:.3002,nz:.9539,d:5.781},{id:"F",nx:-.2981,nz:-.9545,d:.163},{id:"C",nx:.9454,nz:-.3258,d:.669},{id:"D",nx:-.9524,nz:.3047,d:4.338}],ed=[{id:"scan-a1",wall:"A",x:1.2853,z:-6.465,y:1.12,ix:.3002,iz:.9539,w:1.33,h:.78,splats:1216,patch:"scan/patch5-scan-a1.png",spz:"scan/spot5-scan-a1.spz"},{id:"scan-a2",wall:"A",x:.174,z:-6.1153,y:1.35,ix:.3002,iz:.9539,w:.96,h:1.24,splats:3013,patch:"scan/patch5-scan-a2.png",spz:"scan/spot5-scan-a2.spz"},{id:"scan-a3",wall:"A",x:-.9135,z:-5.7731,y:1.26,ix:.3002,iz:.9539,w:1.42,h:.86,splats:2071,patch:"scan/patch5-scan-a3.png",spz:"scan/spot5-scan-a3.spz"},{id:"scan-f1",wall:"F",x:1.7538,z:-.3771,y:1.425,ix:-.2981,iz:-.9545,w:1.42,h:.86,splats:1392,patch:"scan/patch5-scan-f1.png",spz:"scan/spot5-scan-f1.spz"},{id:"wall-a-right",wall:"A",x:1.9292,z:-6.6677,y:1.5,ix:.3002,iz:.9539,w:0,h:0,splats:0},{id:"wall-a-brick",wall:"A",x:-2.5542,z:-5.2567,y:1.5,ix:.3002,iz:.9539,w:0,h:0,splats:0},{id:"wall-f-white",wall:"F",x:.8947,z:-.1088,y:1.5,ix:-.2981,iz:-.9545,w:0,h:0,splats:0},{id:"wall-f-1",wall:"F",x:.7104,z:-.0511,y:1.4542,ix:-.2981,iz:-.9545,w:0,h:0,splats:0},{id:"wall-f-2",wall:"F",x:1.4048,z:-.268,y:1.4542,ix:-.2981,iz:-.9545,w:0,h:0,splats:0},{id:"wall-f-3",wall:"F",x:2.0066,z:-.4559,y:1.4542,ix:-.2981,iz:-.9545,w:0,h:0,splats:0},{id:"wall-d-1",wall:"D",x:2.74,z:-5.6726,y:1.4542,ix:-.9524,iz:.3047,w:0,h:0,splats:0},{id:"wall-d-2",wall:"D",x:3.4416,z:-3.4796,y:1.4542,ix:-.9524,iz:.3047,w:0,h:0,splats:0}],Gt={ceil:Kf,centre:Zf,walls:$f,spots:ed},td={"scan-a1":{mode:"replaced",painting:"hope-the-vermillion-aurora",plaque:"right"},"scan-a2":{mode:"replaced",painting:"painting-red-horizon",plaque:"left"},"scan-a3":{mode:"replaced",painting:"honeybadger-and-cub-with-genesis-block",plaque:"right"},"scan-f1":{mode:"removed"},"wall-a-right":{mode:"bare"},"wall-a-brick":{mode:"bare"},"wall-f-white":{mode:"bare"},"wall-f-1":{mode:"replaced",painting:"older-work-provibes-sandwiches-original-1",plaque:"left"},"wall-f-2":{mode:"replaced",painting:"archived-painting-248",plaque:"right"},"wall-f-3":{mode:"replaced",painting:"archived-painting-436",plaque:"left"},"wall-d-1":{mode:"replaced",painting:"older-work-portraits-319-329-original-1",plaque:"right",plaqueScale:.85},"wall-d-2":{mode:"replaced",painting:"older-work-ammous-livera-original-2",plaque:"right"}},hc="home",nd={url:(typeof location<"u"&&/(^|\.)tjm\.art$/.test(location.hostname)?"":"https://tjm.art")+"/play/?via="+hc},ad=1.97,gi=2.032/ad,Ca={len:1.83,width:1.15},id=[{id:"front-door",kind:"frontdoor",wall:"D",a:[2.3321,-6.7104],b:[2.6091,-5.9065],y0:0,y1:1.97,cols:0,rows:0,frame:"#93b9b9"},{id:"door-c",kind:"door",wall:"C",a:[-1.2841,-1.6726],b:[-1.0233,-.916],y0:0,y1:2.2,cols:1,rows:3,frame:"#7c7c67"},{id:"kitchen",kind:"opening",wall:"C",a:[-2.4248,-4.9828],b:[-1.3166,-1.7672],y0:0,y1:2.2,cols:0,rows:0,frame:"#774924"},{id:"cabinet-c",kind:"cabinet",wall:"C",a:[-.9972,-.8404],b:[-.5833,.3607],y0:.45,y1:2.1,cols:3,rows:4,frame:"#71a4ba",depth:.4,note:"v6 (#211, TJ): not a window - a blue-framed glass-front cabinet set into wall C; depth 0.40 from the scan (points 0.05-0.42 behind the wall plane, h 0.45-2.0)"},{id:"win-d1",kind:"window",wall:"D",a:[2.8535,-5.1972],b:[3.3424,-3.7786],y0:1.05,y1:1.95,cols:2,rows:2,frame:"#b1ada4"},{id:"win-d2",kind:"window",wall:"D",a:[3.626,-2.9558],b:[4.2452,-1.1588],y0:1,y1:1.95,cols:2,rows:2,frame:"#b16438"},{id:"win-f1",kind:"window",wall:"F",a:[2.6612,-.6603],b:[4.1403,-1.1258],y0:1,y1:1.95,cols:2,rows:2,frame:"#bc7146"},{id:"win-f0",kind:"window",wall:"F",a:[-.5356,.3457],b:[.0083,.1745],y0:1,y1:1.95,cols:1,rows:2,frame:"#8d7157"},{id:"win-a0",kind:"window",wall:"A",a:[-2.4748,-5.2815],b:[-1.95,-5.4467],y0:1,y1:2,cols:1,rows:2,frame:"#e9a83e"}],sd={o:[-2.5226,-5.2665],ax:[.9454,-.3258],az:[.3002,.9539],U:5.06,V:5.95},rd={A:"#606469",F:"#896b58",C:"#896d50",D:"#82695e",floor:"#422d20",ceil:"#6f5135",beam:"#937544"},od=[{id:"monstera",kind:"plant",x:-1.662,z:-5.149,w:.95,d:.66,h:1.9,yaw:.3319,back:"",accent:"#d1a038",ax:[.9454,-.3258],az:[.3002,.9539],top:"#bc8f37",side:"#7a7155",n:7043},{id:"work-table",kind:"desk",x:-1.475,z:-3.578,w:.82,d:1.15,h:1,yaw:.3319,back:"-x",accent:"#ad5e37",ax:[.9454,-.3258],az:[.3002,.9539],top:"#664831",side:"#9c736d",n:6942},{id:"round-table",kind:"roundtable",x:.343,z:-4.994,w:1.1,d:1.1,h:.76,yaw:.3319,back:"",accent:"#a3b8a8",ax:[.9454,-.3258],az:[.3002,.9539],top:"#6d715c",side:"#382f24",n:5441},{id:"chair-w",kind:"chair",x:-.583,z:-4.855,w:.7,d:.75,h:.88,yaw:.3319,back:"-x",accent:"#805522",ax:[.9454,-.3258],az:[.3002,.9539],top:"#513e37",side:"#483724",n:1262},{id:"chair-e",kind:"chair",x:1.246,z:-5.457,w:.65,d:.8,h:.88,yaw:.3319,back:"+x",accent:"#8ba684",ax:[.9454,-.3258],az:[.3002,.9539],top:"#757570",side:"#514b3a",n:2641},{id:"sofa-c",kind:"sofa",x:.4352,z:-2.2123,w:1,d:2.07,h:.66,yaw:.3319,back:"-x",accent:"#9e8066",ax:[.9454,-.3258],az:[.3002,.9539],top:"#807164",side:"#898278",n:6473,note:"v6 (#211, TJ): resized to the grey sofa against wall F (same 2.07 x 1.00 footprint, 0.66 high); front edge kept, clear of sofa-f"},{id:"coffee-table",kind:"coffeetable",x:1.724,z:-2.305,w:1,d:1,h:.45,yaw:.3319,back:"",accent:"#a28260",ax:[.9454,-.3258],az:[.3002,.9539],top:"#938474",side:"#7c7369",n:6497},{id:"sofa-f",kind:"sofa",x:2.073,z:-1.094,w:2.07,d:1,h:.66,yaw:.3319,back:"+z",accent:"#a6bad6",ax:[.9454,-.3258],az:[.3002,.9539],top:"#a7b8c2",side:"#9ea7b5",n:10129},{id:"plant-f1",kind:"plant",x:-.255,z:-.13,w:.7,d:.6,h:1.88,yaw:.3319,back:"",accent:"#777553",ax:[.9454,-.3258],az:[.3002,.9539],top:"#8f9886",side:"#62644f",n:2727},{id:"plant-f2",kind:"plant",x:.891,z:-.533,w:.47,d:.64,h:1,yaw:.3319,back:"",accent:"#5e6057",ax:[.9454,-.3258],az:[.3002,.9539],top:"#3c3a33",side:"#31332d",n:1884},{id:"side-table",kind:"sidetable",x:3.456,z:-2.19,w:.46,d:.5,h:.58,yaw:.3319,back:"",accent:"#848f9c",ax:[.9454,-.3258],az:[.3002,.9539],top:"#757e87",side:"#584a44",n:899},{id:"floor-lamp",kind:"lamp",x:3.647,z:-1.484,w:.4,d:.48,h:1.6,yaw:.3319,back:"",accent:"#a9ab97",ax:[.9454,-.3258],az:[.3002,.9539],top:"#a17e67",side:"#afa7a4",n:404},{id:"plant-d1",kind:"plant",x:2.908,z:-3.474,w:.8,d:.72,h:1.15,yaw:.3319,back:"",accent:"#64311e",ax:[.9454,-.3258],az:[.3002,.9539],top:"#40312f",side:"#3a231c",n:2019},{id:"plant-d2",kind:"plant",x:3.243,z:-2.731,w:.65,d:.6,h:.92,yaw:.3319,back:"",accent:"#8d6653",ax:[.9454,-.3258],az:[.3002,.9539],top:"#533c33",side:"#3a2d29",n:2323},{id:"plant-c",kind:"plant",x:-.365,z:-1.385,w:.65,d:.54,h:.78,yaw:.3319,back:"",accent:"#87572f",ax:[.9454,-.3258],az:[.3002,.9539],top:"#734d2f",side:"#311c17",n:1426}],Wn={openings:id,frame:sd,shell:rd,items:od};if(!Wn.__scaled){Wn.__scaled=1;const t=gi;for(const n of Wn.items)n.x*=t,n.z*=t,n.w*=t,n.d*=t,n.h*=t;const e=Wn.frame;e.o=e.o.map(n=>n*t),e.U*=t,e.V*=t;for(const n of Wn.openings)n.a=n.a.map(a=>a*t),n.b=n.b.map(a=>a*t),n.y0*=t,n.y1*=t}const Jo=Wn.items,ii=Wn.shell,wi=Wn.openings;let YA=17;const Ge=()=>(YA=YA*16807%2147483647)/2147483647,Zn=t=>new Xe(t),js=(t,e)=>Zn(t).multiplyScalar(e);function Br(t,e=128){const n=document.createElement("canvas");n.width=n.height=e;const a=n.getContext("2d");t(a,e);const i=new Et(n);return i.wrapS=i.wrapT=Nn,i.colorSpace=Ct,i}const Ad=Br((t,e)=>{t.fillStyle="#e8e8e8",t.fillRect(0,0,e,e);for(let n=0;n<e;n+=2)t.fillStyle=`rgba(0,0,0,${.04+n%4*.02})`,t.fillRect(n,0,1,e),t.fillRect(0,n,e,1);for(let n=0;n<900;n++)t.fillStyle=`rgba(255,255,255,${Ge()*.12})`,t.fillRect(Ge()*e,Ge()*e,1,1)}),Ji=Br((t,e)=>{t.fillStyle="#d9d9d9",t.fillRect(0,0,e,e);for(let n=0;n<e;n++){const a=.05+.08*Math.abs(Math.sin(n*.35+Math.sin(n*.07)*3));t.fillStyle=`rgba(60,40,20,${a})`,t.fillRect(0,n,e,1)}},256),xe=(t,e="wood",n={})=>new rt({color:Zn(t),map:e==="fabric"?Ad:e==="wood"?Ji:null,roughness:e==="fabric"?.95:e==="metal"?.35:.7,metalness:e==="metal"?.6:0,...n});function Ae(t,e,n,a,i,s,r,o,A=0){const l=A?new Uu(e,n,a,3,Math.min(A,e/2,n/2,a/2)):new At(e,n,a),u=new ae(l,i);return u.position.set(s,r,o),u.castShadow=u.receiveShadow=!0,t.add(u),u}function Ht(t,e,n,a,i,s,r,o,A=24){const l=new ae(new dt(e,n,a,A),i);return l.position.set(s,r,o),t.add(l),l}const qA={sofa(t,e){const{w:n,d:a,h:i}=e,s=e.back==="+z"||e.back==="-z",r=s?n:a,o=s?a:n,A=new Ue;t.add(A);const l=xe(e.top,"fabric"),u=xe(js(e.side,.9).getStyle(),"fabric"),c=xe("#3a2a1e");A.rotation.y={"-z":0,"+z":Math.PI,"-x":Math.PI/2,"+x":-Math.PI/2}[e.back]||0;const g=.17,f=.2,p=.42;Ae(A,r,.24,o,u,0,.22,0,.04),Ae(A,r,i-.08,f,u,0,.08+(i-.08)/2,-o/2+f/2,.06);for(const d of[-1,1])Ae(A,g,.58-.08,o,u,d*(r/2-g/2),.08+.25,0,.06);const m=Math.max(2,Math.round((r-2*g)/.75)),B=(r-2*g)/m;for(let d=0;d<m;d++){const E=-r/2+g+B*(d+.5);Ae(A,B-.02,.12,o-f-.04,l,E,p-.02,f/2+.01,.05),Ae(A,B-.06,.38,.14,l,E,p+.2,-o/2+f+.07,.06).rotation.x=-.12}for(const[d,E]of[[-1,-1],[1,-1],[-1,1],[1,1]])Ht(A,.025,.018,.1,c,d*(r/2-.06),.05,E*(o/2-.06),10)},shelf(t,e){const{w:n,d:a,h:i}=e,s=xe(e.side),r=.03,o=e.back==="+z"||e.back==="-z",A=o?n:a,l=o?a:n,u=new Ue;t.add(u),u.rotation.y={"-z":0,"+z":Math.PI,"-x":Math.PI/2,"+x":-Math.PI/2}[e.back]||0;for(const f of[-1,1])Ae(u,r,i,l,s,f*(A/2-r/2),i/2,0);Ae(u,A,r,l,s,0,i-r/2,0),Ae(u,A-2*r,.012,l,s,0,i/2,-l/2+.006);const c=Math.max(3,Math.round(i/.38)),g=[e.accent,e.top,"#7d2f2a","#2f4a63","#c9b48a","#3f5a3a","#d8d2c4"];for(let f=0;f<c;f++){const p=.06+f*(i-.09)/c;if(Ae(u,A-2*r,r,l-.02,s,0,p,.01),f===0)continue;let m=-A/2+r+.03;const B=(i-.09)/c-.06;for(;m<A/2-r-.06;){const d=.025+Ge()*.035,E=B*(.6+Ge()*.35);if(Ge()<.18){m+=.08;continue}Ae(u,d,E,l*.7,xe(g[Ge()*g.length|0],"plain"),m+d/2,p+r/2+E/2,.02),m+=d+.004}}},dresser(t,e){const{w:n,d:a,h:i}=e,s=e.back==="+z"||e.back==="-z",r=s?n:a,o=s?a:n,A=new Ue;t.add(A),A.rotation.y={"-z":0,"+z":Math.PI,"-x":Math.PI/2,"+x":-Math.PI/2}[e.back]||0;const l=xe(e.top),u=xe(js(e.top,1.12).getStyle()),c=xe("#c8a45a","metal");Ae(A,r,i-.08,o,l,0,.08+(i-.08)/2,0,.01),Ae(A,r+.03,.03,o+.03,l,0,i-.015,0,.01);const g=4;for(let f=0;f<g;f++)for(const p of[-1,1]){const m=.12+(f+.5)*(i-.16)/g;Ae(A,r/2-.04,(i-.16)/g-.03,.02,u,p*r/4,m,o/2+.005,.005);const B=new ae(new Qt(.015,10,8),c);B.position.set(p*r/4,m,o/2+.03),A.add(B)}for(const[f,p]of[[-1,-1],[1,-1],[-1,1],[1,1]])Ae(A,.05,.08,.05,l,f*(r/2-.04),.04,p*(o/2-.04))},roundtable(t,e){const n=Math.min(e.w,e.d)/2*.95,a=xe(e.top),i=xe(e.side);Ht(t,n,n,.04,a,0,e.h-.02,0,48),Ht(t,n-.02,n-.03,.05,i,0,e.h-.065,0,48),Ht(t,.05,.06,e.h-.1,i,0,(e.h-.1)/2+.03,0),Ht(t,.26,.3,.04,i,0,.02,0,32)},bowlchair(t,e){const n=Math.min(e.w,e.d)/2*.95,a=xe(e.side),i=xe(e.accent,"fabric"),s=new ae(new Qt(n,32,12,0,Math.PI*2,Math.PI/2,Math.PI/2.4),xe(e.side,"wood",{side:tn}));s.scale.y=.62,s.position.y=.42+n*.62*.95,s.rotation.x=.35,t.add(s);const r=new ae(new zn(n*.97,.025,8,40),a);r.rotation.x=Math.PI/2+.35,r.position.y=s.position.y+.02,t.add(r);const o=new ae(new dt(n*.8,n*.75,.12,32),i);o.position.y=s.position.y-n*.62*.55,o.rotation.x=.35,t.add(o);const A=new ae(new zn(n*.5,.03,8,32),a);A.rotation.x=Math.PI/2,A.position.y=.2,A.scale.z=4,t.add(A)},coffeetable(t,e){const{w:n,d:a,h:i}=e,s=xe(e.top),r=xe(e.side);Ae(t,n,.05,a,s,0,i-.025,0,.01),Ae(t,n-.12,.03,a-.12,r,0,.12,0);for(const[o,A]of[[-1,-1],[1,-1],[-1,1],[1,1]])Ae(t,.05,i-.05,.05,r,o*(n/2-.05),(i-.05)/2,A*(a/2-.05));Ae(t,.24,.05,.17,xe("#a33b2f","plain"),-n*.18,i+.025,a*.1).rotation.y=.3,Ae(t,.2,.035,.15,xe("#e2dccb","plain"),-n*.17,i+.067,a*.12).rotation.y=.15},sidetable(t,e){const{w:n,d:a,h:i}=e,s=xe(e.top),r=xe(e.side);Ae(t,n,.04,a,s,0,i-.02,0,.01);for(const[o,A]of[[-1,-1],[1,-1],[-1,1],[1,1]])Ht(t,.018,.014,i-.04,r,o*(n/2-.04),(i-.04)/2,A*(a/2-.04),10)},glasscab(t,e){const{w:n,d:a,h:i}=e,s=e.back==="+z"||e.back==="-z",r=s?n:a,o=s?a:n,A=new Ue;t.add(A),A.rotation.y={"-z":0,"+z":Math.PI,"-x":Math.PI/2,"+x":-Math.PI/2}[e.back]||0;const l=xe(e.accent,"wood",{roughness:.55}),u=xe(js(e.top,.8).getStyle()),c=new rt({color:14675698,transparent:!0,opacity:.18,roughness:.05,depthWrite:!1});Ae(A,r,i-.1,.02,u,0,.1+(i-.1)/2,-o/2+.01);for(const m of[-1,1])Ae(A,.04,i,o,l,m*(r/2-.02),i/2,0);Ae(A,r,.06,o,l,0,i-.03,0),Ae(A,r,.1,o,l,0,.05,0);const g=Math.max(2,Math.round(r/.5)),f=(r-.08)/g;for(let m=0;m<g;m++){const B=-r/2+.04+f*(m+.5),d=Ae(A,f-.05,i-.22,.006,c,B,.1+(i-.16)/2,o/2-.02);d.castShadow=!1;for(const E of[-1,1])Ae(A,.025,i-.16,.025,l,B+E*(f/2-.0125),.1+(i-.16)/2,o/2-.015)}const p=["#d9c79a","#9fb7a8","#c47b4a","#e7e1d2","#6f8fa8"];for(let m=1;m<4;m++){const B=.1+m*(i-.16)/4;Ae(A,r-.08,.02,o-.06,l,0,B,-.01);for(let d=-r/2+.1;d<r/2-.1;d+=.11+Ge()*.08){const E=.08+Ge()*.12;Ht(A,.035,.035,E,xe(p[Ge()*p.length|0],"plain",{roughness:.3}),d,B+.01+E/2,-.03+Ge()*.06,14)}}},chair(t,e){const n=new Ue;t.add(n),n.rotation.y={"-z":0,"+z":Math.PI,"-x":Math.PI/2,"+x":-Math.PI/2}[e.back]||0;const a=xe(e.side),i=xe(e.top),s=.46,r=.46,o=.46;Ae(n,s,.035,r,i,0,o,0,.01);for(const[A,l]of[[-1,-1],[1,-1],[-1,1],[1,1]])Ae(n,.035,o,.035,a,A*(s/2-.03),o/2,l*(r/2-.03));for(const A of[-1,1])Ae(n,.035,e.h-o,.035,a,A*(s/2-.03),o+(e.h-o)/2,-r/2+.03);Ae(n,s-.04,.09,.025,a,0,e.h-.06,-r/2+.03,.008),Ae(n,s-.06,.04,.02,a,0,o+.2,-r/2+.03),Ae(n,s-.06,.025,.025,a,0,.14,0)},desk(t,e){const{w:n,d:a,h:i}=e,s=xe(e.top),r=xe(e.side);Ae(t,n,.05,a,s,0,i-.025,0,.008),Ae(t,n-.1,.025,a-.1,s,0,.22,0);for(const[A,l]of[[-1,-1],[1,-1],[-1,1],[1,1]])Ae(t,.055,i-.05,.055,r,A*(n/2-.05),(i-.05)/2,l*(a/2-.05));const o=["#d8d2c4","#7d2f2a","#2f4a63","#c9b48a"];for(let A=0;A<4;A++)Ae(t,.18+Ge()*.12,.02+Ge()*.04,.14+Ge()*.1,xe(o[A],"plain"),(Ge()-.5)*(n-.3),i+.02,(Ge()-.5)*(a-.3)).rotation.y=Ge()-.5},lamp(t,e){const n=xe("#b08a4a","metal");Ht(t,.14,.16,.03,n,0,.015,0,28),Ht(t,.012,.012,e.h-.3,n,0,(e.h-.3)/2,0,10),Ht(t,.11,.21,.28,new rt({color:Zn(e.top),emissive:Zn("#ffcf8a"),emissiveIntensity:.55,side:tn,roughness:.9}),0,e.h-.15,0,32);const a=new Gn(16766624,1.2,3.5,2);a.position.set(0,e.h-.2,0),t.add(a)},plant(t,e){const n=Math.min(e.w,e.d)/2,a=xe("#a65a3c","plain",{roughness:.85}),i=Math.min(.42,e.h*.38);Ht(t,n*.55,n*.42,i,a,0,i/2,0,20),Ht(t,n*.58,n*.58,.03,a,0,i-.015,0,20);const s=[xe("#4e7a3a","plain",{roughness:.8,flatShading:!0}),xe("#3c6630","plain",{roughness:.8,flatShading:!0}),xe("#6a9447","plain",{roughness:.8,flatShading:!0})];e.h>1.5&&Ht(t,n*.3,n*.35,.02,a,0,.01,0,16);const r=e.h>1.5?12:7;for(let o=0;o<r;o++){const A=n*(.35+Ge()*.3),l=Ge()*Math.PI*2,u=n*.45*Ge(),c=new ae(new Sa(A,0),s[o%3]);c.position.set(Math.cos(l)*u,i+A*.8+(e.h-i-A*1.6)*Ge(),Math.sin(l)*u),c.rotation.set(Ge()*3,Ge()*3,0),t.add(c)}}},ld=Jo.map(t=>({id:t.id,x:t.x,z:t.z,ax:t.ax,az:t.az,hw:t.w/2,hd:t.d/2,h:t.h}));function cd(t,e,n=0){for(const a of ld){const i=t-a.x,s=e-a.z,r=i*a.ax[0]+s*a.ax[1],o=i*a.az[0]+s*a.az[1];if(Math.abs(r)<a.hw+n&&Math.abs(o)<a.hd+n)return a.id}return null}function ud(t){const e=[];for(const n of Jo){const a=new Ue;a.name="furniture:"+n.id,a.position.set(n.x,0,n.z),a.rotation.y=n.yaw,(qA[n.kind]||qA.sidetable)(a,n),a.userData.furniture=n.id,t.add(a),e.push(a)}return e}function gd(t,e,n,a){const[i,s]=n;for(const c of e){const g=c.nx*i+c.nz*s+c.d,f=i-c.nx*g,p=s-c.nz*g,m=Math.hypot(c.nx,c.nz),B=[c.nz/m,-c.nx/m],d=a+.2,E=new rl([new ze(-4.5,-.1),new ze(4.5,-.1),new ze(4.5,d-.1),new ze(-4.5,d-.1)]);for(const y of wi.filter(Q=>Q.wall===c.id)){const Q=T=>(T[0]-f)*B[0]+(T[1]-p)*B[1],D=Math.min(Q(y.a),Q(y.b)),v=Math.max(Q(y.a),Q(y.b));E.holes.push(new Gu([new ze(D,Math.max(y.y0,-.05)),new ze(D,y.y1),new ze(v,y.y1),new ze(v,Math.max(y.y0,-.05))]))}const I=new ae(new ol(E),new rt({color:Zn(ii[c.id]||"#888"),roughness:.95}));I.position.set(f-c.nx*.03,0,p-c.nz*.03),I.rotation.y=Math.atan2(c.nx,c.nz),I.name="shell:"+c.id,I.userData.noCollide=1,t.add(I)}const r=new ae(new je(12,12),new rt({color:Zn(ii.floor),map:Ji,roughness:.8}));r.rotation.x=-Math.PI/2,r.position.set(i,-.012,s),r.userData.noCollide=1,r.name="shell:floor",t.add(r);const o=Wn.frame,A=new rt({color:js(ii.beam,.62),map:Ji,roughness:.75}),l=Math.atan2(o.ax[0],o.ax[1]);for(let c=.35;c<o.V-.2;c+=.6){const g=o.U/2,f=o.o[0]+o.ax[0]*g+o.az[0]*c,p=o.o[1]+o.ax[1]*g+o.az[1]*c,m=new ae(new At(.07,.17,o.U),A);m.position.set(f,a-.085,p),m.rotation.y=l,m.name="shell:joist",m.userData.noCollide=1,t.add(m)}const u=new ae(new je(12,12),new rt({color:Zn(ii.ceil),map:Ji,roughness:.9}));u.rotation.x=Math.PI/2,u.position.set(i,a+.03,s),u.userData.noCollide=1,u.name="shell:ceil",t.add(u)}function hd(){return Br((t,e)=>{const n=t.createLinearGradient(0,0,0,e);n.addColorStop(0,"#cfe3f2"),n.addColorStop(.55,"#eef4f4"),n.addColorStop(.75,"#dfe6d4"),n.addColorStop(1,"#a9b98f"),t.fillStyle=n,t.fillRect(0,0,e,e);for(let a=0;a<14;a++){t.fillStyle=`rgba(110,140,90,${.15+Ge()*.2})`;const i=Ge()*e,s=6+Ge()*14;t.beginPath(),t.arc(i,e*(.78+Ge()*.12),s,0,7),t.fill()}},128)}const fc=hd();function Si(t,e){const n=e.find(r=>r.id===t.wall),a=Math.hypot(n.nx,n.nz),i=[n.nx/a,n.nz/a],s=new Ue;return s.position.set((t.a[0]+t.b[0])/2,0,(t.a[1]+t.b[1])/2),s.rotation.y=Math.atan2(i[0],i[1]),s.userData.opening=t.id,s.name=t.kind+":"+t.id,{g:s,W:Math.hypot(t.b[0]-t.a[0],t.b[1]-t.a[1]),n:i}}function PA(t,e,n,a,i,s,r,o){for(let u=1;u<i;u++)Ae(t,.045*.8,a-n,.04,r,-e/2+u*e/i,(n+a)/2,o);for(let u=1;u<s;u++)Ae(t,e,.045*.8,.04,r,0,n+u*(a-n)/s,o);const l=new ae(new je(e,a-n),new rt({color:15266550,transparent:!0,opacity:.12,roughness:.05,depthWrite:!1}));l.position.set(0,(n+a)/2,o-.01),l.userData.noCollide=1,t.add(l)}function HA(t,e,n,a){const i=new ae(new je(e+.6,a-n+.6),new Se({map:fc,toneMapped:!1,color:15921902}));i.position.set(0,(n+a)/2,-.45),i.userData.noCollide=1,i.name="sky",t.add(i)}const JA={frontdoor(t,e){const{g:n,W:a}=Si(t,e),i=t.y1,s=xe("#e6dfd2"),r=Ca.len,o=Ca.width,A=xe("#c9bba6","plain",{roughness:.95}),l=xe("#7a5a3e");for(const E of[-1,1])Ae(n,.09,i+.09,.03,s,E*(a/2+.045),(i+.09)/2,.015);Ae(n,a+.18,.09,.03,s,0,i+.045,.015);for(const E of[-1,1])Ae(n,.02,i,.14,s,E*(a/2-.01),i/2,-.07);Ae(n,a,.02,.14,s,0,i-.01,-.07);const u=new Ue;u.position.set(-a/2+.02,0,-.14),u.rotation.y=Math.PI/2-.12,n.add(u),Ae(u,a-.04,i-.01,.04,l,(a-.04)/2,(i-.01)/2,0,.004);for(const[E,I]of[[.35,.55],[1.15,.65]])Ae(u,a-.24,I,.012,xe("#6b4e35"),(a-.04)/2,E+I/2,.025);const c=new ae(new Qt(.03,12,10),xe("#c8a45a","metal"));c.position.set(a-.12,.95,.04),u.add(c);const g=new Ue;g.name="hallway",n.add(g);const f=Math.max(a,o),p=i+.3,m=new rt({color:Zn(ii.floor),map:Ji,roughness:.8}),B=new ae(new je(f,r+.15),m);B.rotation.x=-Math.PI/2,B.position.set(0,.003,-1.98/2),g.add(B);for(const E of[-1,1])Ae(g,.06,p,r+.15,A,E*(f/2+.03),p/2,-1.98/2);if(Ae(g,f+.12,.05,r+.15,A,0,p,-1.98/2),Ae(g,f+.12,p,.06,A,0,p/2,-r-.18),f>a)for(const E of[-1,1])Ae(g,(f-a)/2,p,.06,A,E*(a/2+(f-a)/4),p/2,-.17);Ae(g,f,p-i,.06,A,0,i+(p-i)/2,-.17);for(const E of[-1,1])Ae(g,.015,.1,r,s,E*(f/2-.008),.05,-r/2-.1);Ht(g,.12,.16,.08,new rt({color:15985368,emissive:16770752,emissiveIntensity:.7}),0,p-.05,-r*.45,24);const d=new Gn(16769727,.9,3.2,2);return d.position.set(0,p-.25,-r*.45),g.add(d),n.userData.hall={len:r,width:f},n},window(t,e){const{g:n,W:a}=Si(t,e),i=xe(t.frame,"wood",{roughness:.6}),s=.06,r=t.y0,o=t.y1;for(const A of[-1,1])Ae(n,s,o-r+2*s,.14,i,A*(a/2+s/2),(r+o)/2,-.02);return Ae(n,a+2*s,s,.14,i,0,o+s/2,-.02),r>.05&&(Ae(n,a+2*s,s,.14,i,0,r-s/2,-.02),Ae(n,a+.16,.03,.12,i,0,r-.015,.06)),PA(n,a,r,o,Math.max(1,t.cols),Math.max(1,t.rows),i,-.03),HA(n,a,r,o),n},cabinet(t,e){const{g:n,W:a}=Si(t,e),i=(t.depth||.4)*gi,s=t.y0,r=t.y1,o=r-s,A=xe(t.frame,"wood",{roughness:.55}),l=.06,u=xe("#e9e4da","plain",{roughness:.85}),c=xe("#dcd5c8","wood",{roughness:.7});Ae(n,a,o,.02,u,0,(s+r)/2,-i+.01);for(const E of[-1,1])Ae(n,.02,o,i,u,E*(a/2-.01),(s+r)/2,-i/2);Ae(n,a,.03,i,c,0,s+.015,-i/2),Ae(n,a,.03,i,u,0,r-.015,-i/2);const g=Math.max(2,t.rows||4),f=Math.max(1,t.cols||3),p=o/g;for(let E=1;E<g;E++)Ae(n,a-.04,.025,i-.04,c,0,s+E*p,-i/2-.01);for(const E of[-1,1])Ae(n,l,o+2*l,.12,A,E*(a/2+l/2),(s+r)/2,-.01);Ae(n,a+2*l,l,.12,A,0,r+l/2,-.01),Ae(n,a+2*l,l,.12,A,0,s-l/2,-.01),Ae(n,a+.16,.035,.14,A,0,r+l+.017,0),Ae(n,a+.12,.03,.1,A,0,s-l-.015,.02);const m=a/f,B=.045;for(let E=0;E<f;E++){const I=-a/2+m*(E+.5),y=new Ue;y.position.set(I,0,-.02),n.add(y),y.name="cabinet-door";for(const v of[-1,1])Ae(y,B,o,.03,A,v*(m/2-B/2),(s+r)/2,0);for(const v of[s+B/2,r-B/2])Ae(y,m,B,.03,A,0,v,0);for(let v=1;v<g;v++)Ae(y,m-2*B,.03,.025,A,0,s+v*p,0);const Q=new ae(new je(m-2*B,o-2*B),new rt({color:15266550,transparent:!0,opacity:.16,roughness:.05,metalness:.1,depthWrite:!1}));Q.position.set(0,(s+r)/2,-.005),Q.userData.noCollide=1,Q.name="cabinet-glass",y.add(Q);const D=new ae(new Qt(.014,10,8),xe("#c8a45a","metal"));D.position.set(E<f/2?m/2-B-.02:-m/2+B+.02,s+o*.45,.025),y.add(D)}const d=["#8c5a3c","#5d6b7a","#b59a6a","#6f7f63","#a0645a","#d8cfc0","#3f4a5a"];for(let E=0;E<g;E++){const I=s+E*p+.03;let y=-a/2+.08+Ge()*.1;for(;y<a/2-.16;){const Q=Ge(),D=d[Math.floor(Ge()*d.length)];if(Q<.45){const v=3+Math.floor(Ge()*5);for(let T=0;T<v&&y<a/2-.08;T++){const F=Math.min(p-.06,.18+Ge()*.08),Z=.025+Ge()*.02;Ae(n,Z,F,.16+Ge()*.05,xe(d[Math.floor(Ge()*d.length)],"plain",{roughness:.8}),y,I+F/2,-i+.14),y+=Z+.003}y+=.08}else if(Q<.75){const v=.035+Ge()*.025,T=Math.min(p-.08,.1+Ge()*.1);Ht(n,v,v,T,new rt({color:Zn(D),roughness:.3,transparent:!0,opacity:.85}),y+v,I+T/2,-i/2-.02,18),y+=2*v+.07}else{const T=new ae(new Qt(.08,18,10,0,Math.PI*2,Math.PI/2,Math.PI/2),xe(D,"plain",{roughness:.5,side:tn}));T.position.set(y+.08,I+.08,-i/2),n.add(T),y+=2*.08+.08}}}return n},door(t,e){const{g:n,W:a}=Si(t,e),i=xe((wi.find(u=>u.id==="cabinet-c")||t).frame,"wood",{roughness:.55}),s=xe("#e6dfd2"),r=t.y1;for(const u of[-1,1])Ae(n,.08,r+.08,.03,s,u*(a/2+.04),(r+.08)/2,.01);Ae(n,a+.16,.09,.03,s,0,r+.045,.01);const o=new Ue;o.position.z=-.05,n.add(o);const A=.1;for(const u of[-1,1])Ae(o,A,r,.045,i,u*(a/2-A/2),r/2,0);Ae(o,a,A,.045,i,0,r-A/2,0),Ae(o,a,.5,.045,i,0,.25,0),PA(o,a-2*A,.5,r-A,t.cols||1,t.rows||3,i,0);const l=new ae(new Qt(.03,12,10),xe("#c8a45a","metal"));return l.position.set(a/2-A-.02,1,.04),o.add(l),HA(n,a,0,r),n},opening(t,e){const{g:n,W:a}=Si(t,e),i=xe("#e6dfd2"),s=t.y1,r=1.5;for(const E of[-1,1])Ae(n,.09,s+.09,.16,i,E*(a/2+.045),(s+.09)/2,-.04);Ae(n,a+.18,.1,.16,i,0,s+.05,-.04);const o=new Ue;o.name="kitchen",n.add(o);const A=xe("#b9ad98","plain",{roughness:.95}),l=new rt({color:9077624,roughness:.8}),u=Br((E,I)=>{E.fillStyle="#d8d4cb",E.fillRect(0,0,I,I),E.strokeStyle="#9b958a",E.lineWidth=2;for(let y=0;y<=I;y+=I/4)E.beginPath(),E.moveTo(y,0),E.lineTo(y,I),E.moveTo(0,y),E.lineTo(I,y),E.stroke()});u.repeat.set(a/.6,r/.6),l.map=u;const c=new ae(new je(a+.4,r),l);c.rotation.x=-Math.PI/2,c.position.set(0,.002,-r/2),o.add(c),Ae(o,a+.4,s+.3,.05,A,0,(s+.3)/2,-r);for(const E of[-1,1])Ae(o,.05,s+.3,r,A,E*(a/2+.2),(s+.3)/2,-r/2);Ae(o,a+.4,.05,r,A,0,s+.3,-r/2);const g=xe("#5f6f5c"),f=xe("#d9d3c6","plain",{roughness:.4}),p=xe("#c9cdd0","metal"),m=a-.95;Ae(o,m,.86,.6,g,-a/2+m/2,.43,-r+.33),Ae(o,m+.02,.04,.63,f,-a/2+m/2,.88,-r+.33);for(let E=-a/2+.3;E<-a/2+m-.2;E+=.6)Ae(o,.56,.7,.02,xe("#6c7d68"),E,.45,-r+.64),Ae(o,.14,.015,.02,p,E,.74,-r+.66),Ae(o,.5,.65,.33,g,E,1.62,-r+.18);Ae(o,.5,.06,.4,p,-a/2+m*.55,.92,-r+.33),Ae(o,.78,1.8,.7,xe("#e9e7e1","plain",{roughness:.35}),a/2-.45,.9,-r+.38),Ae(o,.02,.5,.03,p,a/2-.12,1.25,-r+.75);const B=new ae(new je(.9,.7),new Se({map:fc,toneMapped:!1}));B.position.set(-a/2+m*.55,1.55,-r+.03),o.add(B);const d=new Gn(16767400,.6,3.5,2);return d.position.set(0,s-.1,-r/2),o.add(d),o.traverse(E=>{E.userData.noCollide=1}),n}};function fd(t,e){return wi.map(n=>{const a=(JA[n.kind]||JA.window)(n,e);return t.add(a),a})}if(!Gt.__scaled){Gt.__scaled=1;const t=gi;for(const e of Gt.walls)e.d*=t;Gt.centre=Gt.centre.map(e=>e*t),Gt.ceil*=t;for(const e of Gt.spots)e.x*=t,e.z*=t,e.y*=t,e.w*=t,e.h*=t}const dc={YD:9},dd=()=>99,pd=()=>99,md=(t,e,n=[])=>n,hi=Gt.walls,Id=(t,e,n)=>hi.every(a=>a.nx*t+a.nz*e+a.d>n);for(const t of wi){if(t.__snap)continue;t.__snap=1;const e=hi.find(a=>a.id===t.wall),n=e.nx*e.nx+e.nz*e.nz;for(const a of["a","b"]){const i=t[a],s=(e.nx*i[0]+e.nz*i[1]+e.d)/n;t[a]=[i[0]-e.nx*s,i[1]-e.nz*s]}}const Ot=(()=>{const t=wi.find(o=>o.kind==="frontdoor"),e=hi.find(o=>o.id===t.wall),n=Math.hypot(e.nx,e.nz),a=[e.nx/n,e.nz/n],i=Math.hypot(t.b[0]-t.a[0],t.b[1]-t.a[1]),s=[(t.b[0]-t.a[0])/i,(t.b[1]-t.a[1])/i],r=[(t.a[0]+t.b[0])/2,(t.a[1]+t.b[1])/2];return{o:t,w:e,n:a,t:s,c:r,W:i,H:t.y1-t.y0}})(),Cd=(t,e)=>{const n=t-Ot.c[0],a=e-Ot.c[1];return{out:-(n*Ot.n[0]+a*Ot.n[1]),lat:n*Ot.t[0]+a*Ot.t[1]}},Bd=(t,e,n=.22)=>{const{out:a,lat:i}=Cd(t,e);return a>-.45&&a<Ca.len-.12&&Math.abs(i)<Math.min(Ot.W,Ca.width)/2-n},Ed=(t,e)=>Id(t,e,.3)&&!cd(t,e,.22)||Bd(t,e),OA=Ca.len+.14,yd=Math.max(Ot.W,Ca.width),VA=Ot.o.y1+.3-.025;window.__splatPortal={x:Ot.c[0]-Ot.n[0]*OA,z:Ot.c[1]-Ot.n[1]*OA,nx:Ot.n[0],nz:Ot.n[1],scale:1,fill:{w:yd,h:VA},url:nd.url,via:hc,hall:{len:Ca.len,width:Ca.width,height:VA}};(()=>{const[t,e]=Gt.centre;return{x:t,z:e,yaw:0}})();const La=JSON.parse(JSON.stringify(td));for(const t of(new URLSearchParams(location.search).get("spots")||"").split(",")){const[e,n]=t.split(":");La[e]&&/^(scan|removed|replaced)$/.test(n)&&(La[e].mode=n)}const wd=t=>(La[t]||{mode:"scan"}).mode,xd=matchMedia("(pointer:coarse)").matches||new URLSearchParams(location.search).get("m")==="1";async function bd(t){const e=(window.__parts||{})["/"+t];if(!e)return new Uint8Array(await(await fetch("/play/"+t)).arrayBuffer());const n=await Promise.all([...Array(e)].map((s,r)=>fetch(`/play/${t}.p${r}`).then(o=>o.arrayBuffer()))),a=new Uint8Array(n.reduce((s,r)=>s+r.byteLength,0));let i=0;for(const s of n)a.set(new Uint8Array(s),i),i+=s.byteLength;return a}function Qd(t,e){const n=new Ue;n.name="splatRoom",t.add(n),t.background=new Xe(new URLSearchParams(location.search).get("bg")||"#c9d2d6");const a=d=>(d.quaternion.setFromAxisAngle(new j(1,0,0),Math.PI),d.scale.setScalar(gi),d.position.y=1.03*gi,d),i=new URLSearchParams(location.search).get("sh")||(xd?"1":"3"),s={};window.__splat={loaded:0,meshes:s,cfg:La,sh:i};const r=(d,E)=>bd(E).then(I=>{const y=a(new Uo({fileBytes:I,fileType:"spz",fileName:E.split("/").pop()}));return y.name="splat:"+d,y.frustumCulled=!1,n.add(y),s[d]=y,y.initialized}).then(()=>{window.__splat.loaded++}),o=[r("base",`scan/base5-sh${i}.spz`)],A={};for(const d of Gt.spots){if(!d.spz)continue;if(wd(d.id)==="scan")o.push(r(d.id,d.spz));else{const I=new is().load("/play/"+d.patch);I.colorSpace=Ct;const y=new ae(new je(d.w,d.h),new rt({color:ii[d.wall]||"#888",roughness:.95}));I.dispose(),y.position.set(d.x+d.ix*.012,d.y,d.z+d.iz*.012),y.rotation.y=Math.atan2(d.ix,d.iz),y.name="patch:"+d.id,n.add(y),A[d.id]=y}}window.__splat.total=o.length,Promise.all(o).then(()=>{window.__splat.ready=!0});const l=new Se({colorWrite:!1,depthWrite:!1}),[u,c]=Gt.centre;for(const d of hi){const E=d.nx*u+d.nz*c+d.d,I=u-d.nx*E,y=c-d.nz*E,Q=new ae(new At(9,2.6,.1),l);Q.position.set(I-d.nx*.05,1.3,y-d.nz*.05),Q.rotation.y=Math.atan2(d.nx,d.nz),Q.name="wall:"+d.id,n.add(Q)}gd(n,hi,Gt.centre,Gt.ceil);const g=ud(n);fd(n,hi),window.__splat.openings=wi.map(d=>({id:d.id,kind:d.kind,wall:d.wall,w:Math.hypot(d.b[0]-d.a[0],d.b[1]-d.a[1]),h:d.y1-d.y0,depth:d.depth?d.depth*gi:0,a:d.a,b:d.b,y0:d.y0,y1:d.y1})),window.__splat.items=Jo.map(d=>({id:d.id,kind:d.kind,x:d.x,z:d.z,w:d.w,d:d.d,h:d.h,ax:d.ax,az:d.az})),window.__splat.furniture=g.map(d=>d.userData.furniture);const f=new ae(new At(12,.1,12),l);f.position.set(u,-.05,c),n.add(f);const p=new ae(new At(12,.1,12),l);p.position.set(u,Gt.ceil+.05,c),n.add(p),requestAnimationFrame(()=>t.children.forEach(d=>{d!==n&&d.position&&Math.hypot(d.position.x,d.position.z)>100&&(d.visible=!1)}));const m=d=>{d.geometry.computeBoundingBox();const E=d.geometry.boundingBox;return(E.max.x-E.min.x)*d.scale.x/2},B=()=>{const d=window.game;if(!d||!d.paintings||!d.paintings.length)return requestAnimationFrame(B);for(const E of d.paintings){if(!E.plaque||!E.data.spot)continue;const I=(La[E.data.spot]||{}).plaque==="left"?-1:1,y=(La[E.data.spot]||{}).plaqueScale;y&&!E.plaque.userData.scaled&&(E.plaque.scale.multiplyScalar(y),E.plaque.scale.z=1,E.plaque.userData.scaled=1),E.plaque.position.set(I*(E.w/2+m(E.plaque)+.012),1.45-E.data.y,.012)}window.__splat.plaques=!0};return requestAnimationFrame(B),{apex:Gt.ceil,lifts:[],clock:null,root:n,patches:A}}function vd(t){const e=Object.fromEntries(t.paintings.map(a=>[a.id,a])),n=[];for(const a of Gt.spots){const i=La[a.id];if(!i||i.mode!=="replaced"||!e[i.painting])continue;const s=e[i.painting];Object.assign(s,{room:"central",wall:a.wall,spot:a.id,x:a.x+a.ix*.035,y:a.y,z:a.z+a.iz*.035,ix:a.ix,iz:a.iz}),n.push(s)}return t.paintings=n,()=>{}}const es=[],pc="/play/",bn=document.getElementById("c"),ht=Pf(bn),mc=innerWidth,Ic=innerHeight,Re=new ji;Re.background=new Xe(14674158);Jf(ht,Re);const R=new Wi(70,mc/Ic,.05,600);R.position.set(rn.layout.start.x,1.6,rn.layout.start.z);R.lookAt(rn.layout.start.x+Math.sin(rn.layout.start.yaw)*5,1.6,rn.layout.start.z+Math.cos(rn.layout.start.yaw)*5);Re.add(R);const It=1.6,Oo=[];let He=0;const Sd=(t,e)=>{const n=Math.abs(t-nn.x),a=Math.abs(e-nn.z);if(n<1.8&&a<1.8)return .5;if(n<2.4&&a<2.4)return .25;for(const i of Oo)if(Math.abs(t-i.x)<1.4&&Math.abs(e-i.z)<1.4)return .25;return 0};function Vo(t,e){const n=md();return(Ed(t,e)||zd(t,e))&&n.push(Sd(t,e)),n}const Md=(t,e)=>{let n=null,a=1e9;for(const i of t){const s=Math.abs(i-e);s<a&&(a=s,n=i)}return n},Ga=(t,e,n)=>{const a=Md(Vo(t,e),n);return a===null?0:a},Ha=(t,e)=>Ga(t,e,He);Re.add(new ml(16774372,11838600,1.7));{const t=rn.layout;t.rooms=[{id:"vault",title:"Vault",minX:400,maxX:406,minZ:400,maxZ:406,openings:[],windows:[]}],t.hallways=[],t.signs=[],t.groupSigns=[],t.nave={minX:-1,maxX:1,minZ:-3,maxZ:-1},t.gate={room:"vault",wall:"W",from:400.5,to:402.5},t.checkout={room:"vault",wall:"E",from:403,to:405},window.__rehang=vd(rn)}{const t=rn.layout.start;R.position.set(t.x,1.6,t.z),R.lookAt(t.x+Math.sin(t.yaw)*5,1.6,t.z+Math.cos(t.yaw)*5)}rn.paintings.forEach(t=>{t.slug||(t.slug=t.id)});const aa=rn.layout,dn=aa.hall.height,Kt=aa.hall.doorHeight,st=.3,ct={stone:(t,e)=>Pa.stone(t,e),metal:(t,e)=>Pa.metal(t,e),wood:(t,e)=>new rt({map:Ug(Math.max(1,t),Math.max(1,e)),roughness:.85,metalness:0})};function Ye(t,e,n,a,i,s,r,o=Re){const A=new ae(new At(t,e,n),a);return A.position.set(i,s,r),A.castShadow=A.receiveShadow=!0,o.add(A),A}const Cc=jf(10,.35);new Se({map:Cc,color:new Xe(2.6,2.2,2)});const ir=[],As=[],jo=[],Wo=[],Er=[],Vt=aa.rooms,yr=aa.hallways;function Bc(t,e){As.push([t,e]),Ye(.6,dn,.6,ct.stone(.6,dn/2),t,dn/2,e),Ye(.76,.22,.76,ct.metal(1,.3),t,.11,e),Ye(.8,.26,.8,ct.metal(1,.3),t,dn-.13,e)}function kd(t,e){const n=e==="N"||e==="S",a=e==="N"?t.maxZ:e==="S"?t.minZ:e==="W"?t.minX:t.maxX,i=n?t.minX:t.minZ,s=n?t.maxX:t.maxZ,r=e==="N"?[0,-1]:e==="S"?[0,1]:e==="W"?[1,0]:[-1,0],o=t.openings.filter(g=>g.wall===e).sort((g,f)=>g.from-f.from),A=[...o.map(g=>({...g,door:1})),...(t.windows||[]).filter(g=>g.wall===e)].sort((g,f)=>g.from-f.from),l=[];let u=i;A.forEach(g=>{l.push([u,g.from,0,dn]),g.door?l.push([g.from,g.to,Kt,dn]):(l.push([g.from,g.to,0,g.sill]),l.push([g.from,g.to,g.head,dn]),Wo.push({side:e,c:a,inward:r,from:g.from,to:g.to,sill:g.sill,head:g.head})),u=g.to}),l.push([u,s,0,dn]);const c=st/2;l.forEach(([g,f,p,m])=>{const B=f-g;if(B<.01)return;const d=(g+f)/2,E=m-p,I=p>0?ct.metal(B/2,E/2):ct.stone(B/2,E/2);n?Ye(B,E,st,I,d,p+E/2,a-r[1]*c):Ye(st,E,B,I,a-r[0]*c,p+E/2,d)}),o.forEach(g=>{for(const f of[g.from-.35,g.to+.35]){const[p,m]=n?[f,a+r[1]*.35]:[a+r[0]*.35,f];Bc(p,m),jo.push([p+r[0]*.45,2.9,m+r[1]*.45])}})}Vt.forEach(t=>{const e=t.maxX-t.minX,n=t.maxZ-t.minZ,a=(t.minX+t.maxX)/2,i=(t.minZ+t.maxZ)/2,s=new ae(new je(e,n),Pa.floor(e/2.5,n/2.5));s.receiveShadow=!0,s.rotation.x=-Math.PI/2,s.position.set(a,0,i),Re.add(s);let r;r=new ae(new je(e,n),Pa.ceiling(e/2,n/2)),r.rotation.x=Math.PI/2,r.position.set(a,dn,i),Re.add(r),ir.push(r);const o=new ae(new je(e+.6,n+.6),new rt({color:t.id==="people"||t.id==="archive"?12040894:14275526,roughness:.6,metalness:t.id==="people"||t.id==="archive"?.5:0}));o.rotation.x=-Math.PI/2,o.position.set(a,dn+(t.id==="people"||t.id==="archive"?2.8:.05),i),Re.add(o),["N","S","W","E"].forEach(A=>kd(t,A));for(const[A,l]of[[t.minX+.35,t.minZ+.35],[t.maxX-.35,t.minZ+.35],[t.minX+.35,t.maxZ-.35],[t.maxX-.35,t.maxZ-.35]])Bc(A,l);jo.push([a,dn-.9,i])});yr.forEach(t=>{const e=t.maxX-t.minX,n=t.maxZ-t.minZ,a=(t.minX+t.maxX)/2,i=(t.minZ+t.maxZ)/2,s=new ae(new je(e,n),Pa.floor(e/2.5,n/2.5));if(s.rotation.x=-Math.PI/2,s.position.set(a,.005,i),Re.add(s),t.zrun){const o=Ye(e+2*st,.2,n,ct.metal(e,n),a,Kt+.1,i);ir.push(o),Ye(st,Kt,n,ct.stone(n/2,1.4),t.minX-st/2,Kt/2,i),Ye(st,Kt,n,ct.stone(n/2,1.4),t.maxX+st/2,Kt/2,i);return}const r=Ye(e,.2,n+2*st,ct.metal(e,n),a,Kt+.1,i);ir.push(r),Ye(e,Kt,st,ct.stone(e/2,1.4),a,Kt/2,t.minZ-st/2),Ye(e,Kt,st,ct.stone(e/2,1.4),a,Kt/2,t.maxZ+st/2)});const zi=aa.nave,sr={id:"central",title:"The Rotunda",minX:-20,maxX:20,minZ:-20,maxZ:20},ls=Qd(Re,{MAT:{floor:Pa.floor,ceiling:Pa.ceiling}}),Ec=[];Vt.forEach(t=>t.openings.filter(e=>e.nave).forEach(e=>{const n=e.wall==="N"?t.maxZ:e.wall==="S"?t.minZ:e.wall==="W"?t.minX:t.maxX,a=e.wall==="N"?[0,1]:e.wall==="S"?[0,-1]:e.wall==="W"?[-1,0]:[1,0],i=(e.from+e.to)/2,s=e.wall==="N"||e.wall==="S";Ec.push({title:t.title||t.name||t.id,x:s?i:n+a[0]*(st+.03),z:s?n+a[1]*(st+.03):i,yaw:Math.atan2(a[0],a[1])})}));Wo.forEach(t=>{const e=t.side==="N"||t.side==="S",n=(t.from+t.to)/2,a=t.to-t.from,i=(s,r,o)=>e?[s,r,t.c-t.inward[1]*o]:[t.c-t.inward[0]*o,r,s];e?Ye(a+.2,.08,st+.16,ct.metal(1,.2),...i(n,t.sill,st/2)):Ye(st+.16,.08,a+.2,ct.metal(1,.2),...i(n,t.sill,st/2));for(const s of[t.from,t.to])Ye(e?.08:st,t.head-t.sill,e?st:.08,ct.metal(.2,1),...i(s,(t.sill+t.head)/2,st/2));Ye(e?.05:st*.6,t.head-t.sill,e?st*.6:.05,ct.metal(.1,1),...i(n,(t.sill+t.head)/2,st/2))});const De=(()=>{const t=aa.gate,e=Vt.find(r=>r.id===t.room),n=(t.from+t.to)/2,a=t.wall==="N"||t.wall==="S",i=t.wall==="N"?e.maxZ:t.wall==="S"?e.minZ:t.wall==="W"?e.minX:e.maxX,s=t.wall==="N"?[0,-1]:t.wall==="S"?[0,1]:t.wall==="W"?[1,0]:[-1,0];return{pos:a?new j(n,0,i):new j(i,0,n),n:new j(s[0],0,s[1]),w:1.5,h:2.6}})(),cs=new mt({transparent:!0,side:tn,uniforms:{uTime:{value:0},uA:{value:new Xe(.18,.05,.45)},uB:{value:new Xe(.35,.55,1)},uC:{value:new Xe(.6,.4,1)},uGlow:{value:zt?1.25:1.4},uSat:{value:zt?2.2:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`varying vec2 vUv; uniform float uTime, uGlow, uSat; uniform vec3 uA, uB, uC;
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f); return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
    void main(){
      vec2 p = vec2((vUv.x - .5) * 1.5, vUv.y * 2.6);            // metres in the arch
      float r = .75; if (p.y > 2.6 - r && length(p - vec2(0., 2.6 - r)) > r) discard;   // round top
      vec2 q = p - vec2(0., 1.25); float a = atan(q.y, q.x), d = length(q);
      float sw = a + 2.5 / (d + .35) + uTime * 1.6;                 // swirl
      float v = n(vec2(cos(sw), sin(sw)) * (2. + d * 3.) + uTime * .7) * .6 + n(p * 9. + uTime * 3.) * .4;
      float stat = h(floor(p * 60.) + floor(uTime * 24.));          // TV static
      float fl = .85 + .15 * sin(uTime * 37.) * sin(uTime * 13.);   // flicker
      vec3 col = mix(uA, uB, v) + uC * pow(v, 4.) * 1.5;
      col = mix(col, vec3(stat), .18) * fl;
      float edge = smoothstep(.0, .12, min(min(p.x + .75, .75 - p.x), p.y));
      col = max(mix(vec3(dot(col, vec3(.2126, .7152, .0722))), col, uSat), 0.); // pre-saturate so AgX keeps the hue
      gl_FragColor = vec4(col * uGlow, .92 * edge + .08); }`});{const t=new Ue;t.position.copy(De.pos).addScaledVector(De.n,.04),t.rotation.y=Math.atan2(De.n.x,De.n.z),Re.add(t);const e=new ae(new je(De.w,De.h),cs);e.position.y=De.h/2,t.add(e),De.mesh=e;const n=ct.metal(.3,1.4);Ye(.3,De.h+.3,.3,n,-De.w/2-.15,(De.h+.3)/2,.1,t),Ye(.3,De.h+.3,.3,n,De.w/2+.15,(De.h+.3)/2,.1,t),Ye(De.w+.9,.35,.36,n,0,De.h+.3,.1,t),Ye(De.w+.9,.12,.8,ct.metal(1,.3),0,.06,.3,t);const a=new Gn(8019199,14,7,2);a.position.set(0,1.4,.8),t.add(a),De.light=a;{const l=new di(ar(8019199,.5));l.scale.set(3.6,3.8,1),l.position.set(0,1.4,.35),l.visible=qa,t.add(l),es.push(l)}const i=document.createElement("canvas");i.width=1024,i.height=224;const s=i.getContext("2d"),r=s.createLinearGradient(0,0,0,224);r.addColorStop(0,"#1a0830"),r.addColorStop(1,"#0a0418"),s.fillStyle=r,s.fillRect(0,0,1024,224),s.shadowColor="#3ef0ff",s.shadowBlur=18,s.strokeStyle="#7ef6ff",s.lineWidth=6,s.strokeRect(10,10,1004,204),s.shadowBlur=0,s.strokeStyle="rgba(200,120,255,.6)",s.lineWidth=2,s.strokeRect(22,22,980,180),s.textAlign="center",s.textBaseline="middle",s.font="900 104px Impact, Arial Black, sans-serif",s.shadowColor="#ff4fd8",s.shadowBlur=30,s.fillStyle="#ff9cf0",s.fillText("HYPERSPACE REALM",512,96,930),s.shadowBlur=8,s.fillStyle="#fff4ff",s.fillText("HYPERSPACE REALM",512,96,930),s.shadowColor="#3ef0ff",s.shadowBlur=12,s.fillStyle="#9ef8ff",s.font="700 34px Impact, Arial Black, sans-serif",s.fillText("▼  STEP THROUGH THE SLIPGATE  ▼",512,178,900);const o=new Et(i);o.colorSpace=Ct,o.anisotropy=8;const A=new ae(new je(2.6,.57),new Se({map:o,toneMapped:!1}));A.position.set(0,De.h+.98,.3),A.name="hyperspaceSign",t.add(A),ln(A),De.sign=A;{const l=new di(ar(12607743,.35));l.scale.set(3.6,1.3,1),l.position.set(0,De.h+.98,.26),l.visible=qa,t.add(l),es.push(l)}}const Ze=(()=>{const t=aa.checkout,e=Vt.find(r=>r.id===t.room),n=(t.from+t.to)/2,a=t.wall==="N"||t.wall==="S",i=t.wall==="N"?e.maxZ:t.wall==="S"?e.minZ:t.wall==="W"?e.minX:e.maxX,s=t.wall==="N"?[0,-1]:t.wall==="S"?[0,1]:t.wall==="W"?[1,0]:[-1,0];return{pos:a?new j(n,0,i):new j(i,0,n),n:new j(s[0],0,s[1]),w:1.5,h:2.6}})(),us=cs.clone();us.uniforms.uA.value=new Xe(.05,.22,.06);us.uniforms.uB.value=new Xe(1,.78,.2);us.uniforms.uC.value=new Xe(.6,1,.4);{const t=new Ue;t.position.copy(Ze.pos).addScaledVector(Ze.n,.04),t.rotation.y=Math.atan2(Ze.n.x,Ze.n.z),Re.add(t);const e=new ae(new je(Ze.w,Ze.h),us);e.position.y=Ze.h/2,t.add(e);const n=new rt({color:9071138,metalness:.9,roughness:.35});Ye(.3,Ze.h+.3,.3,n,-Ze.w/2-.15,(Ze.h+.3)/2,.1,t),Ye(.3,Ze.h+.3,.3,n,Ze.w/2+.15,(Ze.h+.3)/2,.1,t),Ye(Ze.w+.9,.35,.36,n,0,Ze.h+.3,.1,t),Ye(Ze.w+.9,.12,.8,ct.metal(1,.3),0,.06,.3,t);const a=new Gn(14204992,14,7,2);a.position.set(0,1.4,.8),t.add(a),Ze.light=a;{const A=new di(ar(14204992,.45));A.scale.set(3.6,3.8,1),A.position.set(0,1.4,.35),A.visible=qa,t.add(A),es.push(A)}const i=document.createElement("canvas");i.width=512,i.height=96;const s=i.getContext("2d");s.fillStyle="#1a1206",s.fillRect(0,0,512,96),s.strokeStyle="#e8c050",s.lineWidth=6,s.strokeRect(3,3,506,90),s.fillStyle="#ffd860",s.font="900 64px Impact, Arial Black, sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("CHECKOUT",256,50);const r=new Et(i);r.colorSpace=Ct,r.anisotropy=8;const o=new ae(new je(1.8,.34),new Se({map:r}));o.position.set(0,Ze.h+.3,.29),t.add(o),ln(o)}const lt=(()=>{const t=window.__splatPortal;return{pos:new j(t.x,0,t.z),n:new j(t.nx,0,t.nz),s:t.scale,url:t.url,fill:t.fill||null}})(),Qn=cs.clone();Qn.uniforms.uA.value=new Xe(.26,.17,.11);Qn.uniforms.uB.value=new Xe(.92,.72,.5);Qn.uniforms.uC.value=new Xe(.7,.55,.38);Qn.uniforms.uSat&&(Qn.uniforms.uSat.value=1);Qn.uniforms.uGlow&&(Qn.uniforms.uGlow.value=.9);lt.fill&&(Qn.fragmentShader=cs.fragmentShader.replace(/if \(p\.y > 2\.6 - r && length\(p - vec2\(0\., 2\.6 - r\)\) > r\) discard;/,""),Qn.needsUpdate=!0);{const t=new Ue;t.position.copy(lt.pos).addScaledVector(lt.n,lt.fill?0:.04),t.rotation.y=Math.atan2(lt.n.x,lt.n.z),t.scale.setScalar(lt.s),t.name="dungeonGate",Re.add(t),lt.group=t;const e=lt.fill,n=e?e.w:1.5,a=e?e.h:2.6,i=new ae(new je(n,a),Qn);i.position.y=a/2,t.add(i);const s=ct.metal(.3,1.4);e||(Ye(.3,2.9,.3,s,-.9,1.45,.1,t),Ye(.3,2.9,.3,s,.9,1.45,.1,t),Ye(2.4,.35,.36,s,0,2.9,.1,t),Ye(2.4,.12,.8,ct.metal(1,.3),0,.06,.3,t));const r=new Gn(16768180,1.6,2.6,2);r.position.set(0,1.4,.8),t.add(r),lt.light=r,i.name="dungeonGatePlane";const o=document.createElement("canvas");o.width=512,o.height=96;const A=o.getContext("2d");A.fillStyle="#2a241e",A.fillRect(0,0,512,96),A.strokeStyle="#c9b391",A.lineWidth=6,A.strokeRect(3,3,506,90),A.fillStyle="#e8d8bc",A.font="900 52px Impact, Arial Black, sans-serif",A.textAlign="center",A.textBaseline="middle",A.fillText("TO THE DUNGEON",256,50,480);const l=new Et(o);l.colorSpace=Ct;const u=e?Math.min(.95,n-.12):1.9,c=new ae(new je(u,u*.36/1.9),new Se({map:l}));c.position.set(0,e?a-.16:3.3,e?.03:.29),c.name="dungeonSign",t.add(c),ln(c)}let Eo=!1;function yc(){if(Eo)return;Eo=!0,window.__dungeonGo=lt.url,wr(),tt("BACK TO THE DUNGEON…",3),ut.isLocked&&ut.unlock();const t=window.__gatesNav?"/play/?via="+encodeURIComponent(window.__splatPortal.via||"home"):lt.url;window.__dungeonGo=t,window.__noNav||(window.__gatesNav?window.__gatesNav(t):setTimeout(()=>top.location.assign(t),600))}window.__dungeonGate={pos:lt.pos,n:lt.n,url:lt.url,go:yc,get going(){return Eo}};let rr=!1;function Xo(){try{sessionStorage.setItem("tjmPlayState",JSON.stringify({pos:R.position.toArray(),quat:R.quaternion.toArray(),weapon:at,cart:An.map(t=>t.slug),swarmCount:Ba,at:Date.now()}))}catch{}}function Ko(){if(rr)return;rr=!0;const t=Ze.pos.clone().addScaledVector(Ze.n,1.6);t.y=It,R.position.copy(t),R.lookAt(Ze.pos.x,It,Ze.pos.z),Xo();try{const i=JSON.parse(localStorage.getItem("va-cart-v1")||"[]"),s=new Set((Array.isArray(i)?i:[]).map(o=>o.id)),r=An.filter(o=>o.status==="available"&&!s.has(o.slug)).map(o=>({id:o.slug,quantity:1}));localStorage.setItem("va-cart-v1",JSON.stringify([...Array.isArray(i)?i:[],...r].slice(0,12)))}catch{}wr(),tt("TO THE CHECKOUT…",3),ut.isLocked&&ut.unlock();const e=/(^|\.)tjm\.art$/.test(location.hostname),n=An.filter(i=>i.status==="available").map(i=>i.slug).slice(0,12),a=e?"/cart/?from=play":"https://tjm.art/play/to-cart.html?from=play&items="+encodeURIComponent(n.join(","));window.__checkoutGo=a,window.__noNav||setTimeout(()=>top.location.assign(a),600)}window.__goCheckout=()=>Ko();let eo=null;function wr(){if(!(window.game&&game.holo&&game.holo.muted))try{eo=eo||new(window.AudioContext||window.webkitAudioContext);const t=eo,e=t.currentTime,n=t.createOscillator(),a=t.createGain();n.type="sawtooth",n.frequency.setValueAtTime(880,e),n.frequency.exponentialRampToValueAtTime(55,e+.9),a.gain.setValueAtTime(.25,e),a.gain.exponentialRampToValueAtTime(.001,e+1),n.connect(a).connect(t.destination),n.start(e),n.stop(e+1);const i=t.createBuffer(1,t.sampleRate,t.sampleRate),s=i.getChannelData(0);for(let A=0;A<s.length;A++)s[A]=(Math.random()*2-1)*(1-A/s.length);const r=t.createBufferSource(),o=t.createGain();r.buffer=i,o.gain.value=.18,r.connect(o).connect(t.destination),r.start(e)}catch{}}let _t=null;function Dd(){const t=De.pos.clone().addScaledVector(De.n,1.6);t.y=It;const e=R.clone();e.position.copy(t),e.lookAt(t.x+De.n.x,It,t.z+De.n.z),_t={v:0,back:t,backQ:e.quaternion.clone(),t:0},wr(),ut.enabled=!1,Lt.set(0,0,0),R.position.set((zi.minX+zi.maxX)/2,dc.YD-3,(zi.minZ+zi.maxZ)/2),He=0,R.quaternion.setFromEuler(new mn(-1.2,0,0,"YXZ")),tt("YOU ARE FALLING",2.5)}function Td(t){if(_t.t+=t,_t.v-=9.8*t,R.position.y+=_t.v*t,R.position.y<.1){const e=_t;_t=null,Sr=!1,Ut=!0,document.body.classList.add("chaos"),tt("THE ROTUNDA FLOOR IS NOT A FLOOR",3),Tn.start({direct:!0,worldLen:11,savedPos:e.back,savedQuat:e.backQ}),Zo++}}let Zo=0;function wc(t,e){const n=document.createElement("canvas"),a=n.getContext("2d"),i=96;a.font="600 52px Georgia, serif";const s=Math.ceil(a.measureText(t).width+90);n.width=s,n.height=i,a.fillStyle="#2a2014",a.fillRect(0,0,s,i),a.strokeStyle="#c9a24a",a.lineWidth=5,a.strokeRect(4,4,s-8,i-8),a.font="600 52px Georgia, serif",a.fillStyle="#f0d070",a.textAlign="center",a.textBaseline="middle",a.fillText(t,s/2,i/2+3);const r=new Et(n);r.colorSpace=Ct,r.anisotropy=4;const o=new ae(new je(e*s/i,e),new Se({map:r}));return ln(o),o}[...aa.signs,...Ec.map(t=>({...t,y:Kt+.42}))].forEach(t=>{const e=wc(t.title,.3);e.position.set(t.x,t.y,t.z),e.rotation.y=t.yaw,Re.add(e)});(aa.groupSigns||[]).forEach(t=>{const e=wc(t.title,.26);e.position.set(t.x,t.y,t.z),e.rotation.y=t.yaw,Re.add(e)});const xc=new Se({color:new Xe(2.2,1.8,1.2)});{const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=e.createRadialGradient(64,64,2,64,64,64);n.addColorStop(0,"rgba(255,214,150,.9)"),n.addColorStop(.5,"rgba(255,190,120,.35)"),n.addColorStop(1,"rgba(255,170,90,0)"),e.fillStyle=n,e.fillRect(0,0,128,128);const a=new Et(t);a.colorSpace=Ct;const i=new Se({map:a,transparent:!0,blending:Sn,depthWrite:!1,opacity:zt?.45:.85,polygonOffset:!0,polygonOffsetFactor:-2});yr.forEach(s=>{const r=(s.minX+s.maxX)/2,o=(s.minZ+s.maxZ)/2,A=s.maxX-s.minX>s.maxZ-s.minZ?"x":"z",l=new ae(new je(A==="x"?7:5,A==="x"?5:7),i);l.rotation.x=-Math.PI/2,l.position.set(r,.02,o),l.renderOrder=2,Re.add(l);const u=new ae(new At(A==="x"?.8:.12,.08,A==="x"?.12:.8),xc);if(u.position.set(r,Kt-.1,o),Re.add(u),!na){const c=new Gn(16767136,9,7,2);c.position.set(r,Kt-.3,o),Re.add(c)}})}const nn={x:999,z:999};Ye(4.8,.25,4.8,ct.stone(2.4,.2),nn.x,.125,nn.z);Ye(3.6,.25,3.6,ct.metal(1.8,.2),nn.x,.375,nn.z);const xr=[{room:"central",src:"holo/holo_central_full_v2.mp4",still:"holo/still_central_full.jpg",asp:600/408,y:.5,x:nn.x,z:nn.z,title:"Barre-chord loop (2026-08-21)"}];xr.forEach(t=>{if(t.room==="central")return;const e=Vt.find(n=>n.id===t.room);t.x=(e.minX+e.maxX)/2,t.z=(e.minZ+e.maxZ)/2,t.y=.25,Oo.push({x:t.x,z:t.z}),Ye(2.8,.25,2.8,ct.metal(1.4,.2),t.x,.125,t.z)});xr.forEach(t=>{const e=t.room==="central"?{minX:-10,maxX:10,minZ:-10,maxZ:10}:Vt.find(n=>n.id===t.room);t.b={minX:e.minX,maxX:e.maxX,minZ:e.minZ,maxZ:e.maxZ}});const $t=Hg(Re,R,xr,{low:na,base:"/play/"});{const t=document.createElement("span");t.className="cell",t.id="holomute",t.setAttribute("role","button"),t.tabIndex=0,t.title="Hologram sound (M)";const e=document.createElement("button");e.id="soundbtn",e.type="button";const n=o=>{t.textContent=o?"♪ off":"♪ on",e.textContent=o?"🔇":"🔊",e.setAttribute("aria-label",o?"Unmute music":"Mute music"),e.setAttribute("aria-pressed",String(o)),e.title=(o?"Unmute":"Mute")+" music (M)"};let a=!1;try{a=localStorage.getItem("tjmPlayMuted")==="1"}catch{}$t.setMuted(a,!1),n(a);const i=o=>{o&&(o.stopPropagation(),o.preventDefault());const A=$t.setMuted(!$t.muted,!0);n(A);try{localStorage.setItem("tjmPlayMuted",A?"1":"0")}catch{}},s=o=>o.stopPropagation();[t,e].forEach(o=>{o.addEventListener("click",i),o.addEventListener("touchstart",i,{passive:!1}),["mousedown","pointerdown","mouseup","pointerup","touchend"].forEach(A=>o.addEventListener(A,s))}),document.getElementById("hud").appendChild(t),document.body.appendChild(e),window.__holoToggle=i;const r=()=>$t.begin();["pointerdown","keydown","touchstart"].forEach(o=>addEventListener(o,r,{passive:!0}))}let wa={n:0,t:0,done:!na};const _d=new rt({color:10123834,metalness:.8,roughness:.35}),jA=jo.map(([t,e,n])=>{const a=new ae(new Qt(.11,12,8),new Se({color:new Xe(1.6,1.5,1.3)}));Ye(.05,.3,.05,_d,t,e-.24,n);{const i=new di(ar(16773328,.3));i.scale.set(1.1,1.3,1),i.position.set(t,e+.05,n),i.visible=qa,Re.add(i),es.push(i)}return{flame:a,ph:Math.random()*10,pos:new j(t,e,n)}}),bc=14,or=Array.from({length:zt?4:qa?3:2},(t,e)=>{const n=new Gn(16773340,bc,11,2);if(zt&&e<2||qa){const a=zt?512:256;n.castShadow=!0,n.shadow.mapSize.set(a,a),n.shadow.bias=-.004,n.shadow.normalBias=.02,n.shadow.radius=zt?4:1,n.shadow.camera.near=.1,n.shadow.camera.far=11,n.shadow.autoUpdate=!1,n.shadow.needsUpdate=!0}return Re.add(n),n}),qs=.45,Qc=[];Vt.forEach(t=>t.openings.forEach(e=>{const n=e.wall==="N"?t.maxZ:e.wall==="S"?t.minZ:e.wall==="W"?t.minX:t.maxX,a=e.wall==="N"||e.wall==="S";Qc.push(a?{minX:e.from+.3,maxX:e.to-.3,minZ:n-1,maxZ:n+1}:{minX:n-1,maxX:n+1,minZ:e.from+.3,maxZ:e.to-.3})}));function zd(t,e){for(const n of Qc)if(t>n.minX&&t<n.maxX&&e>n.minZ&&e<n.maxZ)return!0;for(const n of Vt)if(t>n.minX+qs&&t<n.maxX-qs&&e>n.minZ+qs&&e<n.maxZ-qs)return!0;for(const n of yr)if(n.zrun?e>=n.minZ-.5&&e<=n.maxZ+.6&&t>n.minX+.3&&t<n.maxX-.3:t>=n.minX-.5&&t<=n.maxX+.6&&e>n.minZ+.3&&e<n.maxZ-.3)return!0;return!1}const Rd=window.__walkExtra=window.__walkExtra||[];function pn(t,e,n=He){if(n<.6){for(const a of Rd)if(a(t,e))return!0}for(const a of Vo(t,e))if(Math.abs(a-n)<.6)return!0;return!1}function Ea(t,e,n=0){if(n>3&&Math.hypot(t,e)<21)return sr;for(const s of Vt)if(t>s.minX-.4&&t<s.maxX+.4&&e>s.minZ-.4&&e<s.maxZ+.4)return s;if(Math.hypot(t,e)<21)return sr;let a=null,i=1e9;return Vt.forEach(s=>{const r=Math.max(s.minX-t,0,t-s.maxX),o=Math.max(s.minZ-e,0,e-s.maxZ),A=r+o;A<i&&(i=A,a=s)}),a}const vc=new is;vc.setCrossOrigin("anonymous");const Sc=6180928,Fd=(()=>{const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d"),n=e.createRadialGradient(128,40,4,128,120,135);n.addColorStop(0,"rgba(255,236,200,1)"),n.addColorStop(.45,"rgba(255,220,170,.55)"),n.addColorStop(1,"rgba(255,200,140,0)"),e.fillStyle=n,e.fillRect(0,0,256,256);const a=new Et(t);return a.colorSpace=Ct,a})(),Nd=new rt({color:2761757,roughness:.6});new rt({color:9071162,metalness:.9,roughness:.35});const Ld=new Se({map:Fd,transparent:!0,opacity:zt?.32:.34,blending:Sn,depthWrite:!1}),da=new je(1,1),vt=[],WA=t=>String(t).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),XA=[],Gd=ht.capabilities.getMaxAnisotropy(),gs=t=>(t.colorSpace=Ct,t.generateMipmaps=!0,t.minFilter=qu,t.magFilter=Pu,t.anisotropy=Gd,t.needsUpdate=!0,t);function KA(t,e,n){const a=[];let i="";for(const s of e.split(" ")){const r=i?i+" "+s:s;t.measureText(r).width>n&&i?(a.push(i),i=s):i=r}return i&&a.push(i),a}function yo(t,e,n){if(t.measureText(e).width<=n)return e;for(;e.length>1&&t.measureText(e+"…").width>n;)e=e.slice(0,-1);return e+"…"}const Ud=.28,Mc=.0875;function Yd(t,e,n,a){const i=document.createElement("canvas");i.width=512,i.height=160;const s=i.getContext("2d");s.fillStyle="#e9e1cf",s.fillRect(0,0,512,160),s.strokeStyle="#8a7a5c",s.lineWidth=4,s.strokeRect(2,2,508,156);const r=a?440:476;s.fillStyle="#1d1712",s.font="bold 44px Georgia, serif",s.textBaseline="middle",s.fillText(yo(s,t,r),18,54),s.fillStyle=n||"#4a3f32",s.font="32px Arial, sans-serif",s.fillText(yo(s,e,r),18,112),a&&(s.fillStyle="#c8211b",s.beginPath(),s.arc(484,80,14,0,Math.PI*2),s.fill());const o=new ae(da,new Se({map:gs(new Et(i))}));return o.scale.set(Ud,Mc,1),ln(o),o}const br=[];(rn.plaques||[]).forEach(t=>{const e=new Ue;e.position.set(t.x,t.y,t.z),e.rotation.y=Math.atan2(t.ix,t.iz),Re.add(e);const n=new ae(da,new Ln({color:2760728}));n.scale.set(t.fw+.06,t.fh+.06,1),n.position.z=.01,e.add(n);const a=new ae(da,new Se({color:1380363}));a.scale.set(t.fw,t.fh,1),a.position.z=.02,e.add(a),a.userData.q=t,n.userData.q=t,br.push(a,n);{const i=document.createElement("canvas");i.width=620,i.height=820;const s=i.getContext("2d");s.fillStyle="#17110c",s.fillRect(0,0,620,820),s.fillStyle="#f2e4c4",s.font="bold 40px Georgia, serif";let r=60;for(const o of KA(s,t.title,560).slice(0,3))s.fillText(o,30,r),r+=46;s.font="24px Arial, sans-serif",s.fillStyle="#d2b47a",t.lines[0]&&(s.fillText(yo(s,t.lines[0],560),30,r),r+=44),s.font="25px Georgia, serif",s.fillStyle="#e6d6b4";for(const o of t.lines.slice(1)){for(const A of KA(s,o,560)){if(r>740)break;s.fillText(A,30,r),r+=32}r+=14}s.font="22px Arial, sans-serif",s.fillStyle="#d2b47a",s.fillText("Press E to read more on tjm.art",30,790),a.material=new Se({map:gs(new Et(i))}),ln(a)}});const kc=(t,e)=>{const n=new Ue;n.position.set(t.x,t.y,t.z),n.rotation.y=Math.atan2(t.ix,t.iz),Re.add(n);const a=t.fw,i=t.fh,s=new ae(da,Nd);s.scale.set(Math.max(a,t.w+.03),Math.max(i,t.h+.03),1),s.position.z=.005,n.add(s);const r=new ae(da,new Se({color:Sc}));r.scale.set(t.w,t.h,1),r.position.z=.02,n.add(r),ln(r),s.castShadow=!0;const o=new ae(da,Ld);o.scale.set(a*1.6+.9,i*1.5+.9,1),o.position.set(0,.2,.001),n.add(o);const A=new ae(da,xc);A.scale.set(Math.min(.8,a*.6),.05,1),A.position.set(0,i/2+.12,.06),n.add(A),t.slug=t.slug||t.id;const l=t.caption&&t.caption.length<30?t.caption:"",u=t.status==="available"?"available":t.status==="sold"?"SOLD":t.status==="inquiry"?"available by inquiry":"not for sale",c={data:t,group:n,mesh:r,frame:s,bar:A,state:"wall",i:e,w:a,h:i,room:t.room},g=Yd(t.title,(l?l+" · ":"")+u,t.status==="sold"?"#a3241a":t.status==="available"?"#8a4a10":null,t.status==="sold");return g.position.set(0,-i/2-.044-Mc/2,.012),n.add(g),c.plaque=g,r.userData.p=c,s.userData.p=c,vt.push(c),Qr(pc+t.img,3,f=>{gs(f),ht.initTexture(f),c.baseTex=f,c.hiTex||(r.material.map=f,r.material.color.set(16777215),r.material.needsUpdate=!0),c.base=1},()=>{c.baseFailed=1}),c};rn.paintings.forEach(kc);{const t=vt.find(e=>e.data.id==="friends-club-mural");t&&t.data.hi&&(t.hiReq=1,t.pinned=1,t.hiUrl=t.data.hi,setTimeout(()=>Qr(t.hiUrl,3,e=>{gs(e),ht.initTexture(e),t.state==="wall"&&(t.mesh.material.map=e,t.mesh.material.color.set(16777215),t.mesh.material.needsUpdate=!0,t.hiTex=e,t.hi=1)}),0))}function Qr(t,e,n,a){vc.load(t,n,void 0,()=>{e>0?setTimeout(()=>Qr(t+(t.includes("?")?"&":"?")+"retry="+e,e-1,n,a),600*(4-e)):(window.__texFail=(window.__texFail||0)+1,a&&a())})}const ZA=na?14:28,Ar=[],Vn=[];let Ps=0;function wo(){for(;Ps<2&&Ar.length;){const t=Ar.shift();if(t.dist-t.w/2>9||t.state!=="wall"){t.hiReq=0;continue}Ps++,Qr(t.hiUrl,2,e=>{gs(e);const n=()=>{Ps--,t.state==="wall"&&!t.hiTex?(ht.initTexture(e),t.mesh.material.map=e,t.mesh.material.color.set(16777215),t.mesh.material.needsUpdate=!0,t.hiTex=e,t.hi=1,Vn.push(t),qd()):e.dispose(),wo()};e.image&&e.image.decode?e.image.decode().catch(()=>{}).then(n):n()},()=>{Ps--,wo()})}}function qd(){if(!(Vn.length<=ZA)){Vn.sort((t,e)=>e.dist-t.dist);for(let t=Vn.length-1;t>=0;t--)Vn[t].pinned&&Vn.splice(t,1);for(;Vn.length>ZA&&Vn[0].dist>6;){const t=Vn.shift();t.mesh.material.map=t.baseTex||null,t.baseTex||t.mesh.material.color.set(Sc),t.mesh.material.needsUpdate=!0,t.hiTex.dispose(),t.hiTex=null,t.hi=0,t.hiReq=0}}}const $A=Array.from({length:zt?6:3},()=>{const t=new ul(16773340,30,5,.42,.75,2);return Re.add(t),Re.add(t.target),t});let el=0;const Pd=/(^|\.)tjm\.art$/.test(location.hostname);function Ci(t){const e=R.position,n=Ea(e.x,e.z,e.y-It);vt.forEach(s=>{if(s.dist=s.group.position.distanceTo(e),s.dist-s.w/2<5.5&&!s.hiReq&&s.state==="wall"){const r=s.data.hi||"",o=Pd||/^https:\/\/img\.tjm\.art\//.test(r)?r:/^https:\/\/tjm\.art\//.test(r)?"/tjm"+r.slice(15):/^https:\/\/media\.vermillionaurora\.com\//.test(r)?"/mva"+r.slice(34):null;o&&(s.hiReq=1,s.hiUrl=o,Ar.push(s))}if(s.state==="wall"){s.group.visible=s.dist<24||s.data.room===(n&&n.id)||!!(window.game&&window.game.freeze);const r=s.dist<14;s.plaque&&(s.plaque.visible=r),s.bar&&(s.bar.visible=r)}}),Ar.sort((s,r)=>s.dist-r.dist),wo();const a=vt.filter(s=>s.state==="wall").sort((s,r)=>s.dist-r.dist).slice(0,$A.length);$A.forEach((s,r)=>{const o=a[r];if(!o){s.intensity=0;return}const A=new j(o.data.ix,0,o.data.iz);s.intensity=14,s.position.copy(o.group.position).addScaledVector(A,1.1),s.position.y+=1.4,s.target.position.copy(o.group.position)}),jA.forEach(s=>s.d=s.pos.distanceTo(e));const i=[...jA].sort((s,r)=>s.d-r.d).slice(0,or.length);or.forEach((s,r)=>{i[r]&&s.userData.t!==i[r]&&(s.position.copy(i[r].pos),s.userData.t=i[r],s.castShadow&&(s.shadow.needsUpdate=!0))})}Ci();const ts=()=>vt.filter(t=>t.state==="wall"&&t.group.visible).flatMap(t=>[t.mesh,t.frame]),ut=new Bg(R,document.body),Yn=document.getElementById("start");Yn.addEventListener("click",()=>{matchMedia("(pointer:coarse)").matches?Yn.style.display="none":ut.lock()});ut.addEventListener("lock",()=>Yn.style.display="none");ut.addEventListener("unlock",()=>{!window.__test&&!window.__reading&&(Yn.style.display="flex")});const Dc=[];Dc.forEach(t=>{const e=Vt.find(i=>i.id===t.room),n=(e.minX+e.maxX)/2,a=(e.minZ+e.maxZ)/2;t.x=n+t.dx,t.z=a+t.dz,t.yaw=Math.atan2(n-t.x,a-t.z),t.cover=`books/${t.id}/cover.webp`});const hs=Og({scene:Re,camera:R,controls:ut,defs:Dc,base:"/play/",low:na,stone:ct.stone(.6,.6),pillars:As,isMuted:()=>$t.muted,onReading:t=>document.body.classList.toggle("reading",t)}),ga={};addEventListener("keydown",t=>{ga[t.code]=!0;{const e=/^Digit([1-3])$/.exec(t.code);if(e){const n=window.__toolAt?window.__toolAt(+e[1]):+e[1]-1;n!=null&&Hn(n)}}t.code==="KeyC"&&ds(),t.code==="KeyE"&&!window.__reading&&!hs.tryOpen()&&Yc(),t.code==="KeyM"&&window.__holoToggle&&window.__holoToggle()});addEventListener("keyup",t=>ga[t.code]=!1);let tl=0;addEventListener("wheel",t=>{const e=performance.now();e-tl<180||!t.deltaY||(tl=e,Hn(window.__toolStep?window.__toolStep(at,t.deltaY<0?-1:1):(at+(t.deltaY<0?vn.length-1:1))%vn.length))});addEventListener("contextmenu",t=>{(ut.isLocked||at===2)&&t.preventDefault()});addEventListener("mousedown",t=>{ut.isLocked&&t.button===2&&at===2&&!window.__reading&&Dt&&Dt.secondary()});addEventListener("mousedown",t=>{if(ut.isLocked&&t.button===0&&!window.__reading){if(hs.tryOpen(new ze(0,0)))return;eA()}});const Ja={x:0,y:0};let Ri=null,xo=null;const $o=document.getElementById("tmove");$o.addEventListener("touchstart",t=>{xo=t.changedTouches[0],t.preventDefault()},{passive:!1});$o.addEventListener("touchmove",t=>{const e=t.changedTouches[0];Ja.x=(e.clientX-xo.clientX)/60,Ja.y=(e.clientY-xo.clientY)/60,t.preventDefault()},{passive:!1});$o.addEventListener("touchend",()=>{Ja.x=Ja.y=0});bn.addEventListener("touchstart",t=>{Ri=t.changedTouches[0]},{passive:!0});bn.addEventListener("touchmove",t=>{const e=t.changedTouches[0];if(!Ri)return;const n=new mn(0,0,0,"YXZ").setFromQuaternion(R.quaternion);n.y-=(e.clientX-Ri.clientX)*.005,n.x=Math.max(-1.4,Math.min(1.4,n.x-(e.clientY-Ri.clientY)*.005)),R.quaternion.setFromEuler(n),Ri=e},{passive:!0});document.getElementById("tfire").addEventListener("touchstart",t=>{t.preventDefault(),eA()});document.getElementById("tswap").addEventListener("touchstart",t=>{t.preventDefault(),Hn(window.__toolStep?window.__toolStep(at,1):(at+1)%vn.length)});document.getElementById("tlaunch").addEventListener("touchstart",t=>{t.preventDefault(),at===2&&Dt&&Dt.secondary()});document.querySelectorAll("#hud .wpn").forEach(t=>{const e=n=>{n.preventDefault(),n.stopPropagation(),Hn(+t.dataset.w)};t.addEventListener("touchstart",e,{passive:!1}),t.addEventListener("mousedown",n=>n.stopPropagation()),t.addEventListener("click",e)});const Tc=document.getElementById("cartcell");["click","touchstart"].forEach(t=>Tc.addEventListener(t,e=>{e.preventDefault(),e.stopPropagation(),ds()},{passive:!1}));Tc.addEventListener("mousedown",t=>t.stopPropagation());const Hd=matchMedia("(pointer:coarse)").matches,Jd=matchMedia("(display-mode: fullscreen), (display-mode: standalone)").matches||navigator.standalone;function _c(){if(!Hd||Jd)return;const t=document.documentElement,e=t.requestFullscreen||t.webkitRequestFullscreen||t.webkitRequestFullScreen||t.msRequestFullscreen;if(e&&!(document.fullscreenElement||document.webkitFullscreenElement))try{const n=e.call(t,{navigationUI:"hide"});n&&n.then?n.then(nl,()=>{}):nl()}catch{}else if(!e){window.scrollTo(0,1);try{if(!localStorage.getItem("tjmIosHint")){localStorage.setItem("tjmIosHint","1");const n=document.getElementById("iosHint");n.hidden=!1,n.querySelector("button").onclick=()=>n.hidden=!0,setTimeout(()=>n.hidden=!0,9e3)}}catch{}}}{const t=document.getElementById("rotate");if(t){const e=document.createElement("button");e.type="button",e.id="portraitok",e.textContent="Play in portrait anyway";try{sessionStorage.getItem("tjmPortraitOk")==="1"&&document.body.classList.add("portraitok")}catch{}["touchstart","touchend","mousedown"].forEach(a=>e.addEventListener(a,i=>i.stopPropagation())),e.addEventListener("click",a=>{a.stopPropagation(),document.body.classList.add("portraitok");try{sessionStorage.setItem("tjmPortraitOk","1")}catch{}}),t.appendChild(e);const n=document.createElement("small");n.className="rl",n.textContent="Phone will not turn? Rotation lock may be on. Portrait starts by itself in a moment.",t.appendChild(n),setTimeout(()=>document.body.classList.add("portraitok"),3e3)}}function nl(){try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch{}}addEventListener("touchend",_c,{once:!1,passive:!0});Yn.addEventListener("click",_c);let Dt=null,on=null,Te=null;const zc=["THROW","SCAN","GRAB"],Od=[Ju.hudName,"BUY SCANNER",ni.name];let at=0,fi=0,lr=0;const Lt=new j,fs=new ji,bo=new Wi(60,mc/Ic,.01,10);fs.add(new ml(16769216,3153944,1.2));const Rc=new Yu(16756848,2);Rc.position.set(1,2,1);fs.add(Rc);const to=t=>new Ln({color:t,flatShading:!0}),vn=[new Ue,new Ue,new Ue];eg(vn[2]);Vu(vn[0]),vn[0].userData.thermos=1;{const t=vn[1];Ye(.09,.07,.3,to(2500652),0,0,-.05,t),Ye(.06,.15,.07,to(1710878),0,-.1,.07,t),Ye(.12,.09,.05,to(3356219),0,.005,-.22,t),Ye(.07,.035,.012,new Se({color:16722458}),0,.005,-.25,t),Ye(.05,.025,.004,new Se({color:3866490}),0,.04,-.02,t);const e=new ae(new At(.006,.006,6),new Se({color:16719888,transparent:!0,opacity:.55,blending:Sn,depthWrite:!1}));e.position.set(0,.005,-3.25),t.add(e),t.userData.beam=e}vn.forEach(t=>{t.scale.setScalar(.7),t.rotation.y=.1,fs.add(t)});ht.autoClear=!1;function Fc(){vn.forEach((n,a)=>n.visible=a===at);const t=vn[at],e=Math.sin(performance.now()/160)*Math.min(1,Lt.length())*.015;t.position.set(.24+e,-.24-Math.abs(e)+fi*.03,-.62+fi*.08),t.rotation.x=fi*.25,at===0&&(t.rotation.x=0,t.rotation.z=0,Xu(t,lr/Bl)),at===1&&t.userData.beam&&(si=Math.max(0,si-.03),t.userData.beam.material.opacity=.4+.15*Math.random()+si*.45,t.userData.beam.material.color.setHex(si>.3?4259696:Fn&&Fn.beamColor()||16719888)),at===2&&(t.rotation.x=0,t.rotation.z=0,ng(t,performance.now()/1e3,!!(Dt&&Dt.held),Dt?Dt.kick:0)),on&&on.pose(t,at)}function Hn(t){at=t;{const e=document.getElementById("tfire"),n=document.getElementById("tlaunch");e&&(e.textContent=t===2&&Dt&&Dt.held?"HANG":zc[t]),n&&(n.hidden=t!==2)}document.querySelectorAll("#hud .wpn").forEach(e=>e.classList.toggle("on",+e.dataset.w===t)),Fc()}Hn(0);const Nc=document.getElementById("msg");let Lc=0;function tt(t,e=2.5){Nc.textContent=t,Lc=e}Dt=ag({scene:Re,camera:R,paintings:vt,say:tt,isMuted:()=>!!$t.muted,walkable:pn,roomAt:Ea,gallery:"splat",volume:.5});Hn(at);Dt.load();on=dg({scene:Re,camera:R,renderer:ht,vm:vn,vmScene:fs,setWeapon:Hn,getWeapon:()=>at,say:tt,isMuted:()=>!!$t.muted,walkable:pn,floorH:typeof Ha=="function"?Ha:null,roomAt:Ea,pillars:As,paintings:vt,makeElf:ss,animateElf:Un,exempt:typeof ln=="function"?ln:null,isLocked:()=>ut.isLocked,isBusy:()=>!!(Ut||_t||window.__reading),ceiling:ls.apex,low:na});zc.push(...on.fireLabels);Od.push(...on.names);Te=pg({camera:R,touchMove:Ja,isMuted:()=>!!$t.muted,walkable:pn,animateElf:Un,tools:()=>typeof on<"u"?on:null,floorY:()=>{try{return He}catch{return 0}},inRealm:()=>Ut,isCarried:()=>{let t=!1;try{t=!!Mt}catch{}return!!(et&&et.locked||_t||t)},isBusy:()=>!!(et&&et.locked||Ut||_t||window.__reading),floorMaterial:window.FLOOR_MATERIAL||"stone"});Te.setFloorMaterial((t,e,n)=>{const a=Math.hypot(t,e),i=ls.lifts[0];if(i&&n>i.hTop-1){const r=Math.atan2(i.z,i.x),o=t*Math.cos(r)+e*Math.sin(r),A=Math.abs(-t*Math.sin(r)+e*Math.cos(r));if(o>9.3&&o<dd(i.hTop)+.45&&A<.75)return"metal"}const s=Ea(t,e,n);return s&&s.id!=="central"?"wood":a<21&&s&&s.id==="central"?n>.15?"concrete":"marble":"stone"});const _n=new Mo;function Vd(){return R.updateMatrixWorld(),_n.setFromCamera(new ze(0,0),R),_n.intersectObjects(ts(),!1)[0]}function eA(){if(!Ut){if(on&&on.owns(at)){on.down(at);return}if(!(et&&et.locked)){if(at===2){Dt&&Dt.primary();return}fi=1,at===0&&(lr=Bl),at===0?Wd():np()}}}const Ws=[],jn=[];new Qt(.08,6,4);new Se({color:16742912});const jd=Ku();function Wd(){const t=new j;R.getWorldDirection(t);const e=jd.clone();e.rotation.set(Math.random()*6,Math.random()*6,0),ju(()=>$t.muted),e.position.copy(R.position).addScaledVector(t,.3).y-=.03,Re.add(e),Ws.push({m:e,v:t.multiplyScalar(14),life:3})}let Gc=0,et=null;const Fi=new Set,Xd=(()=>{const t=new je(.9,1.125);return t.translate(0,-.11249999999999999,0),t})();function Kd(t){const e=t.object.userData.p;Wu(()=>$t.muted);const n=new Se({map:$u(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),a=new ae(Xd,n),i=e.group.worldToLocal(t.point.clone());a.position.set(i.x,i.y,.024),a.scale.x=Math.random()<.5?-1:1,a.renderOrder=5,n.alphaTest=.02,e.group.add(a),ln(a);const s=[],r=2+(Math.random()<.5?1:0);for(let A=0;A<r;A++){const l=ss(Math.random()),u=["L","R","T"][A],c=e.w/2,g=e.h/2,f=u==="L"?new j(-c+.05,i.y,.05):u==="R"?new j(c-.05,i.y,.05):new j(i.x,g-.05,.05),p=u==="L"?new j(-c-.2,i.y,.35):u==="R"?new j(c+.2,i.y,.35):new j(i.x,g+.2,.35);Object.assign(l.userData,{a:A*2.1,base:i.clone(),hide:f,peek:p}),l.position.copy(f),l.visible=!1,e.group.add(l),s.push(l)}zg(e.data.slug),Fi.add(e.data.slug),Gc++,document.getElementById("hitn").textContent=Fi.size%3;const o={d:a,elves:s,group:e.group,t:0,dur:8};Fi.size>=3&&(Fi.clear(),document.getElementById("hitn").textContent=0,o.swarm=!0,o.dur=1e9,s.forEach(A=>A.visible=!1)),jn.push(o),tt(o.swarm?"SPLAT! ...SOMETHING STIRS BEHIND THE WALLS":"SPLAT!")}const An=[],Qo=document.getElementById("cart"),Zd=document.getElementById("cartlist");let al=0;function ds(t=4e3){Qo.classList.add("open"),clearTimeout(al),al=setTimeout(()=>Qo.classList.remove("open"),t)}function vr(){document.getElementById("cartn").textContent=An.length,Zd.innerHTML=An.length?An.map(t=>`<li><a href="${t.url}" target="_blank" rel="noopener">${t.title}</a> · <i>In cart</i></li>`).join(""):"<li>empty</li>"}const Oi=[],$d=(()=>{const t=document.createElement("canvas");t.width=256,t.height=72;const e=t.getContext("2d");e.fillStyle="#12301c",e.fillRect(0,0,256,72),e.strokeStyle="#3aff7a",e.lineWidth=5,e.strokeRect(3,3,250,66),e.fillStyle="#c8ffd8",e.font="bold 34px Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("✓ Add to cart",128,38);const n=new Et(t);return n.colorSpace=Ct,n})();let no=null;function ns(t){if(!$t.muted)try{no=no||new(window.AudioContext||window.webkitAudioContext);const e=no,n=e.currentTime;(t?[[1568,0],[2093,.09]]:[[330,0]]).forEach(([a,i])=>{const s=e.createOscillator(),r=e.createGain();s.type=t?"sine":"triangle",s.frequency.value=a,r.gain.setValueAtTime(1e-4,n+i),r.gain.linearRampToValueAtTime(.035,n+i+.01),r.gain.exponentialRampToValueAtTime(5e-4,n+i+.12),s.connect(r).connect(e.destination),s.start(n+i),s.stop(n+i+.14)})}catch{}}function ep(t){const e=t.frame.material;t.frame.material=new Se({color:2883434}),ln(t.frame);const n=new ae(new je(.5,.14),new Se({map:$d,transparent:!0,depthWrite:!1}));n.position.set(0,t.h/2+.16,.04),t.group.add(n),ln(n),ns(!0),si=1,setTimeout(()=>{t.frame.material.dispose(),t.frame.material=e,t.group.remove(n),n.geometry.dispose(),n.material.dispose()},1600)}let si=0,Fn=null;const Uc=(t,e)=>({slug:e.id,status:"available",kind:"print",title:t.title+" — "+e.size+", "+e.frame+" frame",url:t.url});function tp(t){const e=t.entry,n=t.p.data;if(An.some(a=>a.slug===e.id))return ns(!1),tt("THIS PRINT IS ALREADY IN YOUR CART");ns(!0),si=1,An.push(Uc(n,e)),vr(),ds(),tt("PRINT ADDED TO CART: "+n.title)}function np(){{const n=Fn&&Fn.printAt(ts());if(n)return tp(n)}const t=Vd();if(!t)return tt("AIM AT A PAINTING");const e=t.object.userData.p;if(e.data.status==="sold")return ns(!1),tt("SOLD: "+e.data.title);if(e.data.status!=="available")return ns(!1),tt("BY INQUIRY ONLY: "+e.data.title);ep(e),e.state="scanned",setTimeout(()=>{const n=e.group.position.clone(),a=e.group.rotation.y;window.eggs&&window.eggs.takePainting&&window.eggs.takePainting(e,()=>Oi.push({p:e,t:99,from:n,rot:a}))||(e.state="lifting",Oi.push({p:e,t:0,from:n,rot:a}))},650),An.push(e.data),vr(),ds(),tt("ADDED TO CART: "+e.data.title)}const ap=2.2;function Yc(t){R.updateMatrixWorld(),_n.setFromCamera(t||new ze(0,0),R),_n.far=ap;const e=_n.intersectObjects([...ts(),...br],!1)[0];if(_n.far=1/0,!e)return t||tt("GET CLOSER TO A PAINTING, THEN PRESS E"),!1;const n=e.object.userData.p?e.object.userData.p.data:e.object.userData.q;return ip(n),!0}function ip(t){Xo(),tt("OPENING "+t.title.toUpperCase()),ut.isLocked&&ut.unlock();const e=new URL(t.url);e.searchParams.set("from","play"),top.location.assign(e.href)}let Ni=null;bn.addEventListener("touchstart",t=>{const e=t.changedTouches[0];Ni={x:e.clientX,y:e.clientY,t:performance.now()}},{passive:!0});bn.addEventListener("touchend",t=>{const e=t.changedTouches[0];if(!Ni||et||Ut||_t||window.__reading||Math.hypot(e.clientX-Ni.x,e.clientY-Ni.y)>12||performance.now()-Ni.t>350)return;const n=bn.getBoundingClientRect(),a=new ze((e.clientX-n.left)/n.width*2-1,-((e.clientY-n.top)/n.height)*2+1);hs.tryOpen(a)||Yc(new ze((e.clientX-n.left)/n.width*2-1,-((e.clientY-n.top)/n.height)*2+1))},{passive:!0});const ri=document.getElementById("goto");ri.innerHTML='<option value="">Go to a painting…</option>'+[sr,...Vt].map(t=>`<optgroup label="${WA(t.title)}">`+vt.filter(e=>e.room===t.id).map(e=>`<option value="${e.i}">${WA(e.data.title)}</option>`).join("")+"</optgroup>").join("");["click","mousedown","touchstart"].forEach(t=>ri.addEventListener(t,e=>e.stopPropagation()));{const t=document.createElement("a");t.id="homebtn",t.href="https://tjm.art/",t.setAttribute("aria-label","Back to the tjm.art homepage"),t.title="Back to tjm.art",t.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z"/></svg><span>Home</span>',document.body.appendChild(t);const e=n=>{n.stopPropagation(),n.preventDefault(),window.__wentHome=!0;try{Xo()}catch{}top.location.href="https://tjm.art/"};[t,document.getElementById("homelink")].forEach(n=>{n&&(n.addEventListener("click",e),["mousedown","pointerdown","mouseup","pointerup","touchstart","touchend"].forEach(a=>n.addEventListener(a,i=>i.stopPropagation(),{passive:!0})))})}function qc(t){const e=vt[t];if(!e||e.state!=="wall")return;const n=new j(e.data.ix,0,e.data.iz),a=Math.max(1.8,Math.min(4,e.h*1.3+.8));R.position.copy(e.group.position).addScaledVector(n,a),He=Ga(R.position.x,R.position.z,e.group.position.y-1.7),R.position.y=It+He,R.lookAt(e.group.position.x,Math.min(e.group.position.y,He+It+.4),e.group.position.z);const i=new mn(0,0,0,"YXZ").setFromQuaternion(R.quaternion);i.z=0,R.quaternion.setFromEuler(i),Lt.set(0,0,0),Ci(),tt(e.data.title.toUpperCase())}ri.addEventListener("change",()=>{ri.value!==""&&(qc(+ri.value),ri.value="",matchMedia("(pointer:coarse)").matches?Yn.style.display="none":ut.lock())});new j;const ft=(t,e,n)=>new j(t,e,n),Bn=(t,e,n)=>t.clone().lerp(e,Math.min(1,Math.max(0,n))),hn=t=>(t=Math.min(1,Math.max(0,t)),t*t*(3-2*t));function vo(t){jn.forEach(s=>s.inSwarm=!0);const e=[],n=Ea(R.position.x,R.position.z);(()=>{const s=new mn(0,0,0,"YXZ").setFromQuaternion(R.quaternion).y,r=-Math.sin(s),o=-Math.cos(s),A=R.position,l=vt.filter(g=>g.state==="wall"&&g.room===n.id).sort((g,f)=>g.dist-f.dist),u=g=>{const f=g.group.position.x-A.x,p=g.group.position.z-A.z,m=Math.hypot(f,p)||1;return m<10&&(f*r+p*o)/m>.5},c=l.filter(g=>!u(g));return(c.length>=3?c:[...c,...l.filter(u)]).slice(0,8)})().forEach(s=>{s.group.visible=!0;for(let r=0;r<4;r++){const o=s.w/2,A=s.h/2,l=r%3,u=(Math.random()-.5)*s.h*.8,c=(Math.random()-.5)*s.w*.8,g=s.group.localToWorld(l===2?ft(c,A-.05,.05):ft(l?o-.05:-o+.05,u,.05)),f=s.group.localToWorld(l===2?ft(c,A+.3,.45):ft(l?o+.28:-o-.28,u,.45)),p=ss(Math.random());p.position.copy(g),Re.add(p);const m=Math.random()*Math.PI*2,B=.7+Math.random()*.7;e.push({s:p,home:g,peek:f,a:m,rad:B,dy:-.55-Math.random()*.5,ph:Math.random()*6,j:r})}});const i=n.id==="central"?He>.3?ft(R.position.x,0,R.position.z):ft(nn.x,0,nn.z):ft((n.minX+n.maxX)/2,0,(n.minZ+n.maxZ)/2);et={fromH:He,destH:He>.3?He:0,t:0,elves:e,locked:!1,chase:!0,drag:!!t,ct:0,trail:[],trailT:0,from:R.position.clone(),dest:i,landed:!1,shake:0},tt("THE ELVES HAVE OPINIONS",6)}const ei=2;function sp(t){const e=et;e.ct+=t;const n=e.ct,a=R.position;e.trailT-=t,e.trailT<=0&&(e.trailT=.25,e.trail.push(ft(a.x,0,a.z)),e.trail.length>16&&e.trail.shift());const i=new mn(0,0,0,"YXZ").setFromQuaternion(R.quaternion).y,s=ft(-Math.sin(i),0,-Math.cos(i));let r=1e9;if(e.elves.forEach((o,A)=>{if(n<ei){const d=hn((n-A%3*.25)/(ei-.5));o.s.position.copy(Bn(o.home,o.peek,d)),o.s.position.y+=Math.sin(n*9+A)*.04*(1-d),o.s.scale.setScalar(Math.max(.05,Math.min(1,n/(ei*.8)))),Un(o.s,"peek",n,R,t),o.cp=o.s.position.clone();return}if(Te){r=Math.min(r,Te.chase.step(o,e,n-(ei-1),t));return}const l=a.x+Math.cos(o.a+i)*o.rad*1.6,u=a.z+Math.sin(o.a+i)*o.rad*1.6,c=Math.hypot(l-o.cp.x,u-o.cp.z)||1,g=Math.hypot(a.x-o.cp.x,a.z-o.cp.z),f=7+(n-1)*1.2+Math.max(0,g-3)*1.5,p=Math.min(1,f*t/c),m=o.cp.x+(l-o.cp.x)*p,B=o.cp.z+(u-o.cp.z)*p;if(pn(m,B)||g<1.6?(o.cp.x=m,o.cp.z=B,o.stuck=0):o.stuck=(o.stuck||0)+t,o.stuck>.25||g>14){const d=e.trail[Math.max(0,e.trail.length-6)]||ft(a.x,0,a.z),E=d.x-a.x,I=d.z-a.z;(E*s.x+I*s.z<0||o.stuck>1.2)&&(o.cp.x=d.x+(Math.random()-.5)*.4,o.cp.z=d.z+(Math.random()-.5)*.4,o.stuck=0)}o.cp.y=He+.35+Math.abs(Math.sin(n*8+o.ph))*.2,o.s.position.copy(o.cp),o.s.scale.setScalar(1),Un(o.s,"walk",n,R,t),r=Math.min(r,Math.hypot(a.x-o.cp.x,a.z-o.cp.z))}),n>ei&&(r<1||(Te?Te.chase.forceCatch(n-(ei-1)):n>13))){Te&&Te.chase.end(e);const o=Ea(a.x,a.z);if(e.fromH=He,e.destH=He>.3?He:0,o&&(e.dest=o.id==="central"?He>.3?ft(a.x,0,a.z):ft(nn.x,0,nn.z):ft((o.minX+o.maxX)/2,0,(o.minZ+o.maxZ)/2)),e.drag){e.chase=!1,e.caughtAt=n,e.locked=!0,ut.enabled=!1,Lt.set(0,0,0),rp(e),Te&&Te.hold&&Te.hold.begin(e,"drag"),tt("THEY HAVE YOUR ANKLES",3);return}e.chase=!1,e.caughtAt=n,e.t=2.2,e.from=a.clone(),e.locked=!0,ut.enabled=!1,Lt.set(0,0,0),tt("CAUGHT!",2),Te&&Te.hold&&Te.hold.begin(e,"carry")}}function il(t,e){let a=1e9,i=-1e9,s=1e9,r=-1e9;[sr,...Vt].forEach(T=>{a=Math.min(a,T.minX),i=Math.max(i,T.maxX),s=Math.min(s,T.minZ),r=Math.max(r,T.maxZ)}),a-=12,s-=12,i+=12,r+=12;const o=Math.ceil((i-a)/.5),A=Math.ceil((r-s)/.5),l=T=>a+(T+.5)*.5,u=T=>s+(T+.5)*.5,c=(T,F)=>{for(const[Z,x]of[[0,0],[.4,0],[-.4,0],[0,.4],[0,-.4]])if(!pn(T+Z,F+x,0))return!0;for(const[Z,x]of As)if(Math.abs(T-Z)<.95&&Math.abs(F-x)<.95)return!0;for(const Z of Oo)if(Math.abs(T-Z.x)<1.9&&Math.abs(F-Z.z)<1.9)return!0;return Math.abs(T-nn.x)<2.8&&Math.abs(F-nn.z)<2.8},g=new Uint8Array(o*A);for(let T=0;T<A;T++)for(let F=0;F<o;F++)g[T*o+F]=c(l(F),u(T))?0:1;const f=T=>[Math.max(0,Math.min(o-1,Math.floor((T.x-a)/.5))),Math.max(0,Math.min(A-1,Math.floor((T.z-s)/.5)))],p=([T,F])=>{let Z=null,x=1e9;for(let z=-6;z<=6;z++)for(let se=-6;se<=6;se++){const J=T+se,oe=F+z;if(J<0||oe<0||J>=o||oe>=A||!g[oe*o+J])continue;const G=se*se+z*z;G<x&&(x=G,Z=[J,oe])}return Z},m=p(f(t)),B=p(f(e));if(!m||!B)return[t.clone(),e.clone()];const d=new Int32Array(o*A).fill(-1),E=[m[1]*o+m[0]];d[E[0]]=E[0];const I=B[1]*o+B[0];for(let T=0;T<E.length&&d[I]<0;T++){const F=E[T],Z=F%o,x=F/o|0;for(const[z,se]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const J=Z+z,oe=x+se;if(J<0||oe<0||J>=o||oe>=A)continue;const G=oe*o+J;!g[G]||d[G]>=0||z&&se&&(!g[x*o+J]||!g[oe*o+Z])||(d[G]=F,E.push(G))}}if(d[I]<0)return[t.clone(),e.clone()];const y=[];for(let T=I;y.push(ft(l(T%o),0,u(T/o|0))),T!==d[T];T=d[T]);y.reverse();const Q=(T,F)=>{const Z=Math.ceil(T.distanceTo(F)/.2);for(let x=1;x<Z;x++){const z=Bn(T,F,x/Z),se=f(z);if(!g[se[1]*o+se[0]])return!1}return!0},D=[ft(t.x,0,t.z)];let v=0;for(;v<y.length-1;){let T=y.length-1;for(;T>v+1&&!Q(y[v],y[T]);)T--;D.push(y[T]),v=T}return D.push(ft(e.x,0,e.z)),D}function rp(t){const e=De.pos.clone().addScaledVector(De.n,1.4);e.y=0,t.dragH=He,He=0;const n=R.position,a=Math.hypot(n.x,n.z),s=t.dragH>.3&&a>8.5?[ft(n.x,0,n.z),...il(ft(n.x*8.5/a,0,n.z*8.5/a),e)]:il(R.position,e);let r=0;const o=[0];for(let A=1;A<s.length;A++)r+=s[A].distanceTo(s[A-1]),o.push(r);t.dragging={path:s,cum:o,len:r,t:0,dur:Te&&Te.hold?Te.hold.dragDur(r):Math.min(5.2,Math.max(3,r/4)),throwT:-1,yaw:new mn(0,0,0,"YXZ").setFromQuaternion(R.quaternion).y},window.__dragPath={n:s.length,len:+r.toFixed(1),dur:t.dragging.dur}}const op=(t,e)=>{const n=e*t.len;let a=1;for(;a<t.cum.length-1&&t.cum[a]<n;)a++;const i=t.path[a-1],s=t.path[a],r=t.cum[a]-t.cum[a-1]||1;return{p:Bn(i,s,(n-t.cum[a-1])/r),dir:s.clone().sub(i).normalize()}};function Ap(){const t=De.pos.clone().addScaledVector(De.n,1.6);t.y=It,He=0;const e=R.clone();e.position.copy(t),e.lookAt(t.x+De.n.x,It,t.z+De.n.z),ut.enabled=!1,Lt.set(0,0,0),_t=null,Sr=!1,Ut=!0,document.body.classList.add("chaos"),tt("INTO THE HYPERSPACE REALM",3),Tn.start({direct:!0,worldLen:11,savedPos:t,savedQuat:e.quaternion.clone()}),Zo++,window.__thrownDirect=(window.__thrownDirect||0)+1}function lp(t){const e=et,n=e.dragging;n.t+=t;const a=n.t;if(n.pt=(n.pt||0)+(n.throwT<0&&Te&&Te.hold?Te.hold.factor(e,t,(n.pt||0)<n.dur):1)*t,n.pt<n.dur){const r=hn(n.pt/n.dur)*.9+n.pt/n.dur*.1,{p:o,dir:A}=op(n,Math.min(1,r));let u=Math.atan2(-A.x,-A.z)-n.yaw;u=Math.atan2(Math.sin(u),Math.cos(u)),n.yaw+=u*Math.min(1,t*6),pn(o.x,o.z)||(n.off=(n.off||0)+1),R.position.set(o.x+(Math.random()-.5)*.02,.55+(e.dragH||0)*Math.max(0,1-2.5*a/n.dur)+Math.abs(Math.sin(a*11))*.05,o.z+(Math.random()-.5)*.02),R.quaternion.setFromEuler(new mn(-.18,n.yaw,Math.sin(a*5)*.05,"YXZ"));const c=ft(-Math.sin(n.yaw),0,-Math.cos(n.yaw)),g=ft(c.z*-1,0,c.x);e.elves.forEach((f,p)=>{const m=e.elves.length,B=p/m;let d;if(p%3!==2){const E=Math.floor(p/6),I=p%6-2.5;d=c.clone().multiplyScalar(1.1+E*.45).addScaledVector(g,I*.32)}else{const E=p%2?1:-1;d=c.clone().multiplyScalar(-.3+B*3%1.5).addScaledVector(g,E*(.9+p%5*.15))}f.s.position.set(R.position.x+d.x,R.position.y-.2+Math.abs(Math.sin(a*9+f.ph))*.18,R.position.z+d.z),f.s.scale.setScalar(1),Te&&Te.hold&&Te.hold.apply(e,f,a,t)||Un(f.s,p%3!==2?"carry":"walk",a,R,t)}),bn.style.filter=n.len/n.dur>9?`blur(${Math.min(3,(n.len/n.dur-9)*.25*Math.sin(Math.PI*n.pt/n.dur)).toFixed(2)}px)`:"",tt("THEY HAVE YOUR ANKLES",.3);return}n.throwT<0&&(bn.style.filter="",n.throwT=0,n.from=R.position.clone(),wr(),tt("WHEEEEE",1.5)),n.throwT+=t;const i=Math.min(1,n.throwT/.8),s=De.pos.clone();s.y=1.3,R.position.copy(Bn(n.from,s,hn(i))),R.position.y=n.from.y+(1.3-n.from.y)*i+Math.sin(i*Math.PI)*1.1,R.quaternion.setFromEuler(new mn(-.3+i*6.3,Math.atan2(De.n.x,De.n.z),i*4.5,"YXZ")),e.elves.forEach((r,o)=>{Un(r.s,"idle",a,R,t),r.s.position.y=.35+Math.abs(Math.sin(a*14+o))*.4}),i>=1&&(Te&&Te.hold&&Te.hold.end(e),e.elves.forEach(r=>Re.remove(r.s)),et=null,Ba=0,window.__dragDone=(window.__dragDone||0)+1,window.__dragLog={gameSecs:+(e.caughtAt+n.t).toFixed(2),dragSecs:+n.t.toFixed(2),offMesh:n.off||0},Ap())}function cp(t){if(et.dragging)return lp(t);const e=et;e.t+=t*(Te&&Te.hold?Te.hold.factor(e,t,e.t>2.2&&e.t<6):1);const n=e.t,a=new mn(0,0,0,"YXZ").setFromQuaternion(R.quaternion),i=e.fromH||0,s=e.destH||0,r=It+i+hn((n-2.2)/.8)*1.5+(s-i)*hn((n-3)/3),o=hn((n-3)/3),A=Bn(ft(e.from.x,0,e.from.z),e.dest,o);let l=r,u=0;if(n>2.2&&n<6&&(l+=Math.sin(n*7)*.12,u=Math.sin(n*3.3)*.12),n>=6){const f=n-6,p=It+s;He=s,l=Math.max(p,s+3.2-4.9*f*f*1.4),l<=p&&!e.landed&&(e.landed=!0,e.shake=.45,tt("*THUD*"))}e.landed&&(e.shake=Math.max(0,e.shake-t));const c=e.shake*.35;R.position.set(A.x+(Math.random()-.5)*c,l-(e.landed&&e.shake>.3?.15:0)+(Math.random()-.5)*c,A.z+(Math.random()-.5)*c),n>2.2&&n<6&&(a.x+=(-.7-a.x)*Math.min(1,t*2)),n>6.4&&(a.x+=(0-a.x)*Math.min(1,t*4)),n>8.5&&(a.x=0),a.z=u,R.quaternion.setFromEuler(a);const g=a.y;e.elves.forEach((f,p)=>{const m=ft(Math.cos(f.a+g)*f.rad,f.dy+Math.sin(n*9+f.ph)*.08,Math.sin(f.a+g)*f.rad),B=R.position.clone().add(m),d=ft(R.position.x+m.x*1.6,(e.destH||0)*Math.min(1,Math.max(0,n-3)/3)+(e.fromH||0)*(1-Math.min(1,Math.max(0,n-3)/3))+.35+Math.abs(Math.sin(n*8+f.ph))*.2,R.position.z+m.z*1.6);let E;n<1?E=Bn(f.home,f.peek,hn(n-p%3*.1)):n<2.2?E=Bn(f.peek,d,hn((n-1)/1.2)):n<2.8?E=Bn(d,B,hn((n-2.2)/.6)):n<6?E=B:n<6.6?E=d:n<8.2?E=Bn(d,f.peek,hn((n-6.6)/1.6)):E=Bn(f.peek,f.home,hn((n-8.2)/.8)),n>=6&&n<6.6&&(f.s.userData.g=f.s.userData.g||E.clone()),f.s.position.copy(n>=6&&n<6.6?f.s.userData.g:E),n>=6.6&&n<8.2&&f.s.position.copy(Bn(f.s.userData.g||d,f.peek,hn((n-6.6)/1.6))),f.s.scale.setScalar(Math.max(.05,Math.min(1,n/.9,(9-n)/.8))),Te&&Te.hold&&Te.hold.apply(e,f,n,t)||Un(f.s,n<1?"peek":n<2.2?"walk":n<6?"carry":n<6.6?"idle":"retreat",n,R,t)}),n>7.2&&e.locked&&(e.locked=!1,ut.enabled=!0,tt("CONTROL RESTORED. BEHAVE.")),n>9&&(Te&&Te.hold&&Te.hold.end(e),e.elves.forEach(f=>Re.remove(f.s)),et=null,Ba++,R.position.y=It+Ha(R.position.x,R.position.z),a.x=0,a.z=0,R.quaternion.setFromEuler(a))}let ao=performance.now(),Ba=0,Sr=!1,Ut=!1,Pc=null;const Tn=Mg({scene:Re,camera:R,renderer:ht,makeElf:ss,animateElf:Un,elfUniforms:li,say:tt,canvas:bn,floorY:Ha});function Hc(){Sr=!1,Ut=!0,ut.enabled=!1,Tn.start(),document.body.classList.add("chaos")}new URLSearchParams(location.search).get("chaos")==="1"&&setTimeout(()=>{window.__test=1,Yn.style.display="none",R.position.set(0,It+Ha(0,0),0),Hc()},800);const Jc=matchMedia("(orientation: portrait) and (pointer: coarse)");function Oc(){if(requestAnimationFrame(Oc),window.__paused=Jc.matches&&!document.body.classList.contains("portraitok"),window.__paused){ao=performance.now();return}const t=performance.now(),e=Math.min(.05,(t-ao)/1e3);if(ao=t,Te&&Te.update(e),on&&on.update(e,at),Dt&&(Dt.update(e,at===2),at===2)){const a=document.getElementById("tfire"),i=Dt.held?"HANG":"GRAB";a&&a.textContent!==i&&(a.textContent=i)}if(Sr&&!et&&Hc(),Ut){ht.toneMapping!==cA&&(ht.toneMapping=cA);const a=Tn.update(e,t);a&&a.finished&&(He=Ga(R.position.x,R.position.z,R.position.y-It),Ut=!1,ut.enabled=!0,document.body.classList.remove("chaos"),Pc={before:a.savedPos.toArray(),after:R.position.toArray()}),li.uTime.value=t/1e3,CA(t),Tn.state&&Tn.state.inWorld&&!Tn.state.back||ht.clear(),Tn.render()||ht.render(Re,R),window.__frames=(window.__frames||0)+1;return}if(_t&&Td(e),!(window.game&&window.game.freeze||window.__reading)){if(!_t)if(et&&!et.chase)cp(e);else{et&&et.chase&&sp(e),Lt.x-=Lt.x*10*e,Lt.z-=Lt.z*10*e;const a=(ga.KeyW||ga.ArrowUp?1:0)-(ga.KeyS||ga.ArrowDown?1:0)-Ja.y,i=(ga.KeyD?1:0)-(ga.KeyA?1:0)+Ja.x;{const r=Te?Te.speedMul(i,a):1;Lt.z+=Math.max(-1,Math.min(1,a))*60*r*e,Lt.x+=Math.max(-1,Math.min(1,i))*60*r*e}const s=R.position.clone();ut.moveRight(Lt.x*e),ut.moveForward(Lt.z*e),pn(R.position.x,R.position.z)||(pn(R.position.x,s.z)?R.position.z=s.z:pn(s.x,R.position.z)?R.position.x=s.x:(R.position.x=s.x,R.position.z=s.z));for(const[r,o]of As){const A=R.position.x-r,l=R.position.z-o,u=Math.hypot(A,l);u<.75&&u>0&&(R.position.x=r+A/u*.75,R.position.z=o+l/u*.75)}pn(R.position.x,R.position.z)||(R.position.x=s.x,R.position.z=s.z),Mt||(He=Ha(R.position.x,R.position.z));{const r=R.position.x-De.pos.x,o=R.position.z-De.pos.z,A=Math.abs(r*De.n.z-o*De.n.x),l=r*De.n.x+o*De.n.z;A<.7&&l<.62&&!Ut&&Dd()}{const r=R.position.x-Ze.pos.x,o=R.position.z-Ze.pos.z,A=Math.abs(r*Ze.n.z-o*Ze.n.x),l=r*Ze.n.x+o*Ze.n.z;A<.7&&l<.62&&!Ut&&Ko()}{const r=R.position.x-lt.pos.x,o=R.position.z-lt.pos.z,A=Math.abs(r*lt.n.z-o*lt.n.x),l=r*lt.n.x+o*lt.n.z;Qn.uniforms.uTime.value=performance.now()/1e3+3,A<(lt.fill?lt.fill.w/2:.75*lt.s)&&l<.62&&!Ut&&yc()}!_t&&!Mt&&(R.position.y=It+Ha(R.position.x,R.position.z)+(Te?Te.bob():Math.abs(Math.sin(t/120))*Math.min(.06,Lt.length()*.02)))}}if(hs.update(e),$t.update(e,t,Ea(R.position.x,R.position.z).id),!et&&!_t)for(const a of xr){const i=R.position.x-a.x,s=R.position.z-a.z,r=Math.hypot(i,s);r<.6&&r>0&&(R.position.x=a.x+i/r*.6,R.position.z=a.z+s/r*.6)}wa.done||(wa.n++,wa.t+=e,wa.t>6&&(wa.done=!0,wa.n/wa.t<24&&$t.setLowStill(!0)));for(let a=Ws.length-1;a>=0;a--){const i=Ws[a];i.v.y-=.8*e,i.life-=e;const s=i.v.clone().multiplyScalar(e);_n.set(i.m.position,s.clone().normalize()),_n.far=s.length();const r=_n.intersectObjects(ts(),!1)[0];i.m.position.add(s);const o=i.m.position.x,A=i.m.position.z,l=i.m.position.y,u=Math.hypot(o,A)<pd()+.6,g=!(u||[...Vt,...yr].some(f=>o>f.minX-.6&&o<f.maxX+.6&&A>f.minZ-.6&&A<f.maxZ+.6))||l<0||l>(u?ls.apex:dn);r&&Kd(r),(r||g||i.life<0)&&(Re.remove(i.m),Ws.splice(a,1))}_n.far=1/0;for(let a=jn.length-1;a>=0;a--){const i=jn[a];i.t+=e;const s=i.t/i.dur;if(i.swarm&&i.t>=3&&!et&&!Ut)if(Ba>=2){Ba=0,jn.forEach(A=>{A.group.remove(A.d,...A.elves)}),jn.length=0,vo(!0);break}else vo();if(i.swarm||i.inSwarm){if(i.elves.forEach(A=>A.visible=!1),i.inSwarm){const A=Math.min(1,Math.max(0,(et?et.t:99)-2.5)/3);i.d.material.opacity=1-A,A>=1&&(i.group.remove(i.d,...i.elves),jn.splice(a,1))}continue}i.said;const r=i.t,o=Math.min(1,Math.max(0,(r-4.4)/2.2));i.d.material.opacity=1-o;{const A=r<.18?.55+.45*Math.sin(r/.18*1.5708)*1.06:1,l=A*(1-o*.4);i.d.scale.set(Math.sign(i.d.scale.x)*l,l,1)}r>3&&!i.said&&(i.said=1,tt("MACHINE ELVES DEPLOYED: SCRUBBING...")),i.elves.forEach((A,l)=>{const u=A.userData;A.visible=r>3;const c=u.base.clone().add(new j(Math.cos(u.a+r*1.5)*.28,Math.sin(u.a+r*1.1)*.12-.15,.3)),g=(f,p,m)=>f.clone().lerp(p,Math.min(1,Math.max(0,m)));r<3.8?A.position.copy(g(u.hide,u.peek,(r-3)/.8)):r<4.4?A.position.copy(g(u.peek,c,(r-3.8)/.6)).setZ(.25):r<6.6?A.position.copy(c):r<7.2?A.position.copy(g(c,u.peek,(r-6.6)/.6)).setZ(.25):A.position.copy(g(u.peek,u.hide,(r-7.2)/.8)),A.scale.setScalar(Math.max(.05,Math.min(1,(r-3)/.8,(8-r)/.8))),Un(A,r<3.8?"peek":r<4.4?"walk":r<6.6?"scrub":"retreat",r,R,e)}),s>=1&&(i.group.remove(i.d,...i.elves),jn.splice(a,1))}for(let a=Oi.length-1;a>=0;a--){const i=Oi[a];i.t+=e;const s=i.p.group,r=Math.min(1,i.t/2.2);s.position.copy(i.from),s.rotation.y=i.rot,s.translateZ(r*1.2),s.position.y=i.from.y+Math.sin(r*Math.PI)*.4+r*r*1.5,s.rotation.y=i.rot+r*Math.PI*2,s.scale.setScalar(1-r*.85),r>=1&&(s.visible=!1,i.p.state="cart",Oi.splice(a,1))}fi=Math.max(0,fi-e*5),lr=Math.max(0,lr-Math.min(e,.05)),Fc(),Fn&&Fn.update(e,at===1&&!rr&&!window.__paused,ts()),(Lc-=e)<0&&(Nc.textContent=""),(el-=e)<0&&(el=.25,Ci()),or.forEach(a=>{a.userData.t&&(a.intensity=bc)}),Cc.offset.x=t/8e3%1,cs.uniforms.uTime.value=t/1e3,us.uniforms.uTime.value=t/1e3+7,Ze.light.intensity=14+3*Math.sin(t/300),De.light.intensity=14+4*Math.sin(t/90)*Math.sin(t/37);{const a=.88+.12*Math.sin(t/420)+(Math.sin(t/53)>.985?-.25:0);De.sign.material.color.setScalar(a)}up(e),Er.forEach((a,i)=>a.intensity=(zt?22:12)*(.85+.15*Math.sin(t/600+i*2))),li.uTime.value=t/1e3,CA(t);const n=et?Math.min(1,et.t/1.5)*(et.t<8?1:Math.max(0,9-et.t)):0;li.uPulse.value=n,bn.style.filter=n>.01?`saturate(${1+n*(.6+.4*Math.sin(t/180))}) hue-rotate(${n*25*Math.sin(t/400)}deg) drop-shadow(${2*n}px 0 rgba(255,0,90,.45)) drop-shadow(${-2*n}px 0 rgba(0,255,220,.45))`:"",bn.style.transform=n>.01?`scale(${1+.012*n*Math.sin(t/230)}) skewX(${n*.8*Math.sin(t/310)}deg)`:"",ht.toneMapping!==Ao&&(ht.toneMapping=Ao),Bi.render(),ht.setRenderTarget(null),ht.clearDepth(),window.__reading||ht.render(fs,bo),gp(t),dp(t,Yn.style.display==="none"&&!document.hidden),window.__frames=(window.__frames||0)+1}let Mt=null,Mi=0;function up(t){Mi=Math.max(0,Mi-t);const e=R.position;if(!Mt&&!Ut&&!_t&&!et&&Mi===0)for(const u of ls.lifts){if(He<.3&&Math.hypot(e.x-u.x,e.z-u.z)<.75){Mt={l:u,up:!0,t0:performance.now()},tt("GLASS LIFT · UP TO THE TOP OF THE RAMP",3);break}if(Math.abs(He-u.hTop)<1&&Math.hypot(e.x-u.call.x,e.z-u.call.z)<.55){Mt={l:u,up:!1,t0:performance.now(),from:e.clone()},tt("GLASS LIFT · DOWN TO THE ROTUNDA FLOOR",3);break}}if(!Mt)return;const n=Mt.l,a=(performance.now()-Mt.t0)/1e3,i=9,s=.9,r=u=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,u)));Lt.set(0,0,0);let o,A=n.x,l=n.z;if(Mt.up){if(o=n.hTop*r(a/i),a>i){const u=r((a-i)/s);A=n.x+(n.top.x-n.x)*u,l=n.z+(n.top.z-n.z)*u}if(a>i+s){e.x=n.top.x,e.z=n.top.z,He=n.hTop,e.y=It+He,n.cab.position.y=n.hTop,Mt=null,Mi=3,tt("TOP OF THE RAMP · WALK DOWN THROUGH THE SPIRAL",4);return}}else{if(a<s){const u=r(a/s);A=Mt.from.x+(n.x-Mt.from.x)*u,l=Mt.from.z+(n.z-Mt.from.z)*u,o=n.hTop}else o=n.hTop*(1-r((a-s)/i));if(a>i+s){const u=-n.x/Math.hypot(n.x,n.z)*1.3,c=-n.z/Math.hypot(n.x,n.z)*1.3;e.x=n.x+u,e.z=n.z+c,He=0,e.y=It,n.cab.position.y=0,Mt=null,Mi=3;return}}n.cab.position.y=o,e.x=A,e.z=l,e.y=It+o,He=o}const Bi=Vf(ht,Re,R);let io=0,so=0,Vc=0;function gp(t){io++,t-so>1e3&&(Vc=io*1e3/(t-so),io=0,so=t)}function jc(){R.aspect=innerWidth/innerHeight,R.updateProjectionMatrix(),bo.aspect=R.aspect,bo.updateProjectionMatrix(),Bi.setSize()}addEventListener("resize",jc);jc();const oi=document.getElementById("qcell"),Wc={high:"HQ",medium:"MQ",low:"LQ"};oi&&(oi.textContent=Wc[ma],oi.title="Graphics quality: "+ma+" (tap to switch: low → medium → high)",oi.addEventListener("click",t=>{t.stopPropagation(),qf(Yf(ma))}));let Vi=ma;const Xc=()=>[...or,...Er].filter(t=>t.castShadow);function hp(){Xc().forEach(t=>{if(Er.includes(t)){t.castShadow=!1;return}t.shadow.map&&t.shadow.map.dispose(),t.shadow.map=null,t.shadow.mapSize.set(256,256),t.shadow.radius=1,t.shadow.needsUpdate=!0})}function sl(){Xc().forEach(t=>t.castShadow=!1),ht.shadowMap.enabled=!1,Re.traverse(t=>{t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(e=>e.needsUpdate=!0)})}function ro(){ht.getPixelRatio()>1&&(ht.setPixelRatio(1),Bi.setSize())}const fp=zt?[()=>{Bi.stepDown&&Bi.stepDown(),es.forEach(t=>t.visible=!0),hp(),Vi="medium"},()=>{ro(),sl(),Vi="low"}]:qa?[()=>ro(),()=>{sl(),Vi="low"}]:[()=>ro()],dp=Xf(fp,(t,e)=>{oi&&(oi.textContent=Wc[Vi]+"·auto"),window.__autoSteps=t});setTimeout(()=>Er.forEach(t=>{t.castShadow&&(t.shadow.needsUpdate=!0)}),3e3);ht.domElement.addEventListener("webglcontextlost",t=>{t.preventDefault(),window.__glLost=1,window.__playFallback&&window.__playFallback("lost")});Oc();vr();Fn=rg({THREE:Il,scene:Re,camera:R,paintings:vt,boards:br,walkable:pn,exempt:ln,unit:da});window.game={get move(){return Te},get weapon(){return at},get tools(){return on},startSwarm:t=>vo(t),get grav(){return Dt},THREE:Il,holo:$t,books:hs,splatLog:Rg,get fps(){return Vc},tier:ma,get autoLevel(){return Vi},get autoSteps(){return window.__autoSteps||0},get pipelineLevel(){return Bi.level},ceilings:ir,ROOMS:Vt,walkable:pn,roomAt:Ea,get nPaintings(){return vt.length},get chaosActive(){return Ut},get chaosT(){return Tn.state?Tn.state.t:-1},get lastChaos(){return Pc},get swarmCount(){return Ba},setSwarmCount:t=>{Ba=t},renderer:ht,camera:R,makeElf:ss,animateElf:Un,scene:Re,splats:jn,get swarm(){return et},get hits(){return Gc},get distinct(){return Fi.size},setWeapon:Hn,fire:eA,paintings:vt,goTo:qc,get pausedPortrait(){return Jc.matches},CHK:Ze,showCart:ds,get cartOpen(){return Qo.classList.contains("open")},windowSpots:Wo,PIT:zi,GATE:De,get gateTrips(){return Zo},get riding(){return Mt?+Mt.l.cab.position.y.toFixed(1):-1},get curH(){return He},floorCands:Vo,floorNear:Ga,GG:dc,NAVE:ls,get falling(){return!!_t},LABELS:XA,boards:br,get shownLabels(){return XA.filter(t=>t.shown).length},lookAt:(t,e=3.5)=>{const n=vt[t].group,a=new j(0,0,1).applyQuaternion(n.quaternion);R.position.copy(n.position).addScaledVector(a,e),He=Ga(R.position.x,R.position.z,n.position.y-1.7),R.position.y=It+He,R.lookAt(n.position.x,n.position.y,n.position.z),Ci()},view:(t,e,n,a,i=0,s)=>{He=Ga(t,e,i),R.position.set(t,It+He,e),R.lookAt(n,s===void 0?It+He:s,a),Ci()},hideStart:()=>{window.__test=1,Yn.style.display="none"}};window.game.addPainting=t=>kc(t,vt.length);window.game.base=pc;window.game.removePainting=t=>{const e=vt.indexOf(t);e>=0&&vt.splice(e,1),t.group.removeFromParent(),t.state="gone"};if(new URLSearchParams(location.search).get("resume")==="1")try{const t=JSON.parse(sessionStorage.getItem("tjmPlayState")||"null");t&&(R.position.fromArray(t.pos),He=Ga(R.position.x,R.position.z,R.position.y-It),R.quaternion.fromArray(t.quat),Hn(1),Ba=t.swarmCount||0,(t.cart||[]).forEach(e=>{if(/^print-/.test(e)){const a=vt.find(i=>{const s=Fn&&Fn.shopEntry(i.data.slug);return s&&s.pr&&s.pr.id===e});a&&!An.some(i=>i.slug===e)&&An.push(Uc(a.data,Fn.shopEntry(a.data.slug).pr));return}const n=vt.find(a=>a.data.slug===e);n&&n.state==="wall"&&(n.state="cart",n.group.visible=!1,An.push(n.data))}),vr(),Ci(),Yn.querySelector("p").textContent="TAP / CLICK TO RESUME",window.__resumed=t)}catch{}Hn(1);window.__museumCart={count:()=>An.length,go:()=>Ko(),get leaving(){return rr}};
