import{M as ga,C as Be,R as zn,S as Ce,a as Fn,G as Ut,b as de,c as ti,T as _n,I as va,d as X,e as xt,B as Ae,f as ve,g as us,h as mr,A as bn,i as Ir,V as kt,j as q,P as Vt,D as en,L as Wc,E as Xc,k as Kc,l as Zr,m as $a,n as Wo,o as Wt,p as Cs,q as Ra,r as me,s as Zc,t as XA,u as KA,O as $i,v as fn,w as ZA,F as gs,Q as ze,x as $c,N as pa,y as Vs,z as $A,H as js,J as th,K as eh,U as Cr,W as tl,X as Nn,Y as nh,Z as ah,_ as ei,$ as sh,a0 as ih,a1 as el,a2 as Ii,a3 as Ze,a4 as Er,a5 as oh,a6 as rh,a7 as Br,a8 as yn,a9 as nl,aa as za,ab as Ah,ac as Fa,ad as is,ae as al,af as yr,ag as sl,ah as lh,ai as ch,aj as La,ak as hh,al as il,am as oe,an as uh,ao as ol,ap as wr,aq as Rn,ar as fs,as as gh,at as fh,au as dh,av as ua,aw as fa,ax as Hn,ay as ph,az as Ci,aA as Ei,aB as $r,aC as tA,aD as mh,aE as Ih,aF as Ch,aG as Eh,aH as Bh,aI as yh,aJ as Xo,aK as wh,aL as xh,aM as Qh,aN as vh,aO as bh,aP as Sh,aQ as rl,aR as Mh,aS as kh,aT as Dh,aU as Th,aV as eA}from"./RoundedBoxGeometry-DUZeLtIm.js";const _h=typeof matchMedia<"u"&&matchMedia("(pointer: coarse)").matches;let Gi=_h?"low":"hd";const Rh={hudName:"SOUP THERMOS"},zh=e=>new Fn({color:e});function Fh(e){const t=Gi==="low"?16:36,n=new ga({color:13949149,specular:16777215,shininess:60,flatShading:Gi==="low"}),a=zh(1842206),s=(()=>{const l=document.createElement("canvas");l.width=l.height=64;const h=l.getContext("2d");h.fillStyle="#b3222a",h.fillRect(0,0,64,64),h.fillStyle="rgba(20,30,60,.55)";for(let u=0;u<64;u+=16)h.fillRect(u,0,6,64),h.fillRect(0,u,64,6);h.fillStyle="rgba(240,210,120,.6)";for(let u=8;u<64;u+=16)h.fillRect(u,0,1.5,64),h.fillRect(0,u,64,1.5);const c=new Be(l);return c.wrapS=c.wrapT=zn,c.repeat.set(3,1),c.colorSpace=Ce,new Fn({map:c})})(),i=new Ut;e.add(i);const o=(l,h,c)=>{const u=new X(l,h);return u.position.y=c,i.add(u),u};o(new de(.075,.075,.34,t),n,0),o(new de(.077,.077,.12,t,1,!0),s,-.02),o(new de(.078,.078,.025,t),a,-.16),o(new de(.05,.075,.05,t),a,.195),o(new de(.045,.045,.04,t,1,!0),n,.24);const r=o(new ti(.042,t),new Fn({color:13780251}),.255);r.rotation.x=-Math.PI/2;const A=o(new _n(.05,.012,10,20,Math.PI),a,.02);return A.rotation.set(0,Math.PI/2,Math.PI/2),A.position.x=.085,e}let nA=null;function Al(e,t,n,a,s=1.2){const i=nA=nA||new(window.AudioContext||window.webkitAudioContext),o=i.currentTime,r=i.createBuffer(1,Math.ceil(i.sampleRate*e),i.sampleRate),A=r.getChannelData(0);for(let u=0;u<A.length;u++)A[u]=(Math.random()*2-1)*Math.pow(1-u/A.length,2);const l=i.createBufferSource(),h=i.createBiquadFilter(),c=i.createGain();l.buffer=r,h.type="bandpass",h.Q.value=s,h.frequency.setValueAtTime(t,o),h.frequency.exponentialRampToValueAtTime(n,o+e),c.gain.value=a,l.connect(h).connect(c).connect(i.destination),l.start(o)}function Nh(e){if(!(e&&e()))try{Al(.32,300,900,.5,2.5)}catch{}}function Lh(e){if(!(e&&e()))try{Al(.22,1800,400,.45,.8)}catch{}}function Uh(e,t){const n=t>0?Math.sin(Math.PI*(1-t)):0,a=t>0?Math.sin(Math.PI*(1-t)*.5):0;e.position.y+=.085,e.position.x-=.03,e.rotation.x=-1.9*n,e.position.y+=.09*n,e.position.z-=.14*n+.02*a,e.rotation.z=-.15*n}const ll=.38;function Gh(){const e=new va(.075,Gi==="low"?2:3),t=e.attributes.position;for(let n=0;n<t.count;n++){const a=t.getX(n),s=t.getY(n),i=t.getZ(n),o=1+Math.sin(a*38)*Math.sin(s*33)*.07+Math.sin(i*61+a*20)*.03+(i<-.03?(-.03-i)*3:0);t.setXYZ(n,a*o,s*o,i*o)}return e.computeVertexNormals(),new X(e,new ga({color:14173978,emissive:4854020,specular:16765104,shininess:70}))}const ys=[];let aA=11;const Kt=()=>(aA=aA*16807%2147483647)/2147483647;function Yh(){const e=Gi==="low"?1:2,t=256*e,n=320*e,a=128*e,s=128*e,i=document.createElement("canvas");i.width=t,i.height=n;const o=i.getContext("2d"),r=(50+Kt()*12)*e,A=256,l=[],h=[Kt()*6,Kt()*6,Kt()*6,Kt()*6];for(let I=0;I<A;I++){const y=I/A*6.283;l.push(r*(1+.14*Math.sin(y*3+h[0])+.08*Math.sin(y*5+h[1])+.05*Math.sin(y*9+h[2])+.025*Math.sin(y*17+h[3])+.012*Math.sin(y*31)))}for(let I=0;I<9;I++){const y=Kt()*A|0,Q=(6+Kt()*22)*e,k=3+(Kt()*5|0);for(let b=-k;b<=k;b++)l[(y+b+A)%A]+=Q*Math.cos(b/k*Math.PI/2)**2}const c=I=>{o.beginPath();for(let y=0;y<=A;y++){const Q=y/A*6.283,k=l[y%A]*I,b=a+Math.cos(Q)*k,S=s+Math.sin(Q)*k;y?o.lineTo(b,S):o.moveTo(b,S)}o.closePath()},u=[];for(let I=0,y=3+(Kt()*3|0);I<y;I++){const Q=.55+Kt()*2,k=Math.round(Q/6.283*A)%A;u.push({x:a+Math.cos(Q)*l[k]*.82,y:s+Math.sin(Q)*l[k]*.82,w:(3.2+Kt()*4.8)*e,l:(26+Kt()*120)*e})}const d=(I,y)=>{const Q=Math.min(n-16*e,I.y+I.l),k=I.w+y,b=I.w*.55+y;o.beginPath(),o.moveTo(I.x-k,I.y),o.bezierCurveTo(I.x-k*.9,I.y+(Q-I.y)*.4,I.x-b,Q-6*e,I.x-b,Q),o.arc(I.x,Q+b*.3,b*1.35+y*.2,Math.PI,0,!0),o.lineTo(I.x+b,Q),o.bezierCurveTo(I.x+b,Q-6*e,I.x+k*.9,I.y+(Q-I.y)*.4,I.x+k,I.y),o.closePath()},p=[];for(let I=0;I<16;I++){const y=Kt()*6.283,Q=r*(.95+Kt()*.1),k=r*(1.25+Kt()*.7);p.push([y,Q,k,(1.5+Kt()*3)*e])}const m=[];for(let I=0;I<22;I++){const y=Kt()*6.283,Q=r*(1.25+Kt()*.95);m.push([a+Math.cos(y)*Q,s+Math.sin(y)*Q,(1.2+Kt()*4.5)*e])}const f=(I,y)=>{o.fillStyle=I,c(1+y/r),o.fill(),u.forEach(Q=>{d(Q,y),o.fill()}),p.forEach(([Q,k,b,S])=>{const F=Math.cos(Q),j=Math.sin(Q),w=-j,_=F,tt=S+y*.6;o.beginPath(),o.moveTo(a+F*k+w*tt,s+j*k+_*tt),o.quadraticCurveTo(a+F*(k+b)/2+w*tt*.6,s+j*(k+b)/2+_*tt*.6,a+F*b,s+j*b),o.quadraticCurveTo(a+F*(k+b)/2-w*tt*.6,s+j*(k+b)/2-_*tt*.6,a+F*k-w*tt,s+j*k-_*tt),o.fill(),o.beginPath(),o.arc(a+F*b,s+j*b,tt*.9,0,6.283),o.fill()}),m.forEach(([Q,k,b])=>{o.beginPath(),o.arc(Q,k,b+y*.5,0,6.283),o.fill()})};f("#7e1d0c",2.2*e),f("#c63d17",0),o.globalCompositeOperation="source-atop";let B=o.createRadialGradient(a,s,r*.1,a,s,r*1.25);B.addColorStop(0,"rgba(150,32,10,.55)"),B.addColorStop(.55,"rgba(200,64,24,0)"),B.addColorStop(1,"rgba(240,120,60,.35)"),o.fillStyle=B,o.fillRect(0,0,t,n),B=o.createRadialGradient(a-r*.3,s-r*.35,2*e,a-r*.1,s-r*.1,r),B.addColorStop(0,"rgba(255,150,80,.75)"),B.addColorStop(1,"rgba(230,90,40,0)"),o.fillStyle=B,o.fillRect(0,0,t,n),o.save(),c(1),o.clip(),o.lineWidth=7*e,o.strokeStyle="rgba(110,22,8,.45)",o.shadowColor="rgba(90,15,5,.6)",o.shadowBlur=8*e,c(1.01),o.stroke(),o.restore(),o.lineCap="round";for(const[I,y,Q]of[[4*e,0,"rgba(255,214,170,.42)"],[2*e,1.4,"rgba(255,235,210,.35)"]]){o.lineWidth=I,o.strokeStyle=Q,o.beginPath();for(let k=0;k<9.5;k+=.12){const b=(3+k*4.6)*e*(1+.08*Math.sin(k*3+y));o.lineTo(a+Math.cos(k+y)*b,s+Math.sin(k+y)*b*.92)}o.stroke()}for(let I=0;I<6;I++){const y=Kt()*6.283,Q=Kt()*r*.6;B=o.createRadialGradient(a+Math.cos(y)*Q,s+Math.sin(y)*Q,0,a+Math.cos(y)*Q,s+Math.sin(y)*Q,(8+Kt()*14)*e),B.addColorStop(0,"rgba(255,190,140,.25)"),B.addColorStop(1,"rgba(255,190,140,0)"),o.fillStyle=B,o.fillRect(0,0,t,n)}o.fillStyle="rgba(255,248,236,.75)";for(let I=0;I<5;I++)o.beginPath(),o.ellipse(a-r*(.2+Kt()*.4),s-r*(.15+Kt()*.45),(4+Kt()*9)*e,(1.2+Kt()*2)*e,-.6+Kt()*.4,0,6.283),o.fill();for(let I=0;I<18;I++){const y=Kt()*6.283,Q=Kt()*r*.85,k=a+Math.cos(y)*Q,b=s+Math.sin(y)*Q,S=(.8+Kt()*2.2)*e;o.fillStyle="rgba(255,170,90,.55)",o.beginPath(),o.arc(k,b,S,0,6.283),o.fill(),o.fillStyle="rgba(255,250,240,.8)",o.beginPath(),o.arc(k-S*.35,b-S*.35,S*.35,0,6.283),o.fill()}u.forEach(I=>{const y=Math.min(n-16*e,I.y+I.l);o.strokeStyle="rgba(255,230,200,.45)",o.lineWidth=1.6*e,o.beginPath(),o.moveTo(I.x-I.w*.35,I.y+4*e),o.lineTo(I.x-I.w*.25,y-2*e),o.stroke(),o.fillStyle="rgba(255,248,236,.8)",o.beginPath(),o.arc(I.x-I.w*.3,y+I.w*.1,1.6*e,0,6.283),o.fill()}),m.forEach(([I,y,Q])=>{Q<2*e||(o.fillStyle="rgba(255,245,230,.75)",o.beginPath(),o.arc(I-Q*.35,y-Q*.35,Q*.3,0,6.283),o.fill())}),o.globalCompositeOperation="source-over";const E=new Be(i);return E.colorSpace=Ce,E.anisotropy=4,E}function qh(){return ys.length<4?(ys.push(Yh()),ys[ys.length-1]):ys[Math.random()*4|0]}const ts={name:"GRAVITY GUN",slot:"Gravity Gun",api:"https://tjm-play-layouts.timothyjosephmurphy.workers.dev"},qe=(e=0,t=0,n=0)=>new q(e,t,n);function Ph(e){const t=new Fn({color:3816512,flatShading:!0}),n=new Fn({color:9080468,flatShading:!0}),a=new xt({color:16747038}),s=new xt({color:16765562}),i=(l,h,c,u,d,p=0,m=0)=>{const f=new X(l,h);return f.position.set(c,u,d),f.rotation.set(p,0,m),e.add(f),f};i(new Ae(.16,.14,.36),t,0,0,.02),i(new de(.075,.09,.14,8),n,0,0,-.2,Math.PI/2);for(let l=0;l<3;l++){const h=l/3*Math.PI*2+Math.PI/2;i(new Ae(.025,.025,.2),n,Math.cos(h)*.075,Math.sin(h)*.075,-.33).rotation.set(Math.sin(h)*.35,-Math.cos(h)*.35,0)}const o=i(new ve(.045,10,8),s,0,0,-.29),r=i(new _n(.06,.012,6,16),a,0,0,-.27);i(new Ae(.17,.02,.2),a,0,.08,.04),i(new Ae(.06,.14,.07),t,0,-.12,.12);const A=new us(new mr({map:Hh(),color:16751162,transparent:!0,depthWrite:!1,blending:bn}));return A.scale.set(.3,.3,1),A.position.set(0,0,-.3),e.add(A),e.userData.grav={em:o,ring:r,halo:A,glow:a},e}function Hh(){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,220,150,1)"),n.addColorStop(.4,"rgba(255,140,40,.5)"),n.addColorStop(1,"rgba(255,100,0,0)"),t.fillStyle=n,t.fillRect(0,0,64,64),new Be(e)}function Jh(e,t,n,a){const s=e.userData.grav;if(!s)return;const i=1+.12*Math.sin(t*9)+(n?.25:0)+a*.8;s.halo.scale.set(.26*i,.26*i,1),s.ring.rotation.z=t*(n?9:3),s.em.scale.setScalar(.9+.2*Math.sin(t*23)),e.rotation.x+=a*.35,e.position.z+=a*.06}function Oh(e){const t=e.volume!=null?e.volume:ts.volume!=null?ts.volume:1,{scene:n,camera:a,paintings:s,say:i,isMuted:o,walkable:r,roomAt:A,gallery:l}=e;let h=null,c=null,u=0,d=null,p=null;const m=[],f=new Ir,B=()=>{const x=new Set;return s.forEach(N=>N.group.traverse(P=>x.add(P))),x},E=()=>{if(h)return h;const x=B();return h=[],n.traverse(N=>{N.isMesh&&!x.has(N)&&N.geometry&&N.geometry.type==="BoxGeometry"&&!(N.material&&N.material.transparent)&&N.visible!==!1&&h.push(N)}),h},I=()=>s.filter(x=>x.state==="wall"&&x.group.visible||x.state==="floor").flatMap(x=>[x.mesh,x.frame]),y=(x=12)=>{a.updateMatrixWorld(),f.setFromCamera(new kt(0,0),a),f.far=x;const N=f.intersectObjects(I(),!1)[0];return f.far=1/0,N&&N.object.userData.p?N.object.userData.p:N?s.find(P=>P.mesh===N.object||P.frame===N.object):null},Q=(x,N,P,$,z)=>{const mt=qe(P.z,0,-P.x),It=E();f.far=.6;for(const _t of[-.48,-.25,0,.25,.48])for(const C of[-.45,0,.45]){const L=N.clone().addScaledVector(mt,_t*$).add(qe(0,C*z,0)).addScaledVector(P,.25);if(f.set(L,P.clone().negate()),!f.intersectObjects(It,!1).length)return f.far=1/0,!1}f.far=1/0;for(const _t of s){if(_t===x||_t.state!=="wall")continue;const C=_t.data;if(qe(C.ix,0,C.iz).dot(P)<.99)continue;const W=C.x-N.x,nt=C.z-N.z,V=Math.abs(W*P.x+nt*P.z),Nt=Math.abs(W*mt.x+nt*mt.z);if(!(V>.4)&&Nt<(_t.w+$)/2+.05&&Math.abs(C.y-N.y)<(_t.h+z)/2+.02)return!1}return!0},k=x=>{a.updateMatrixWorld(),f.setFromCamera(new kt(0,0),a),f.far=9;const N=f.intersectObjects(E(),!1)[0];if(f.far=1/0,!N||!N.face)return null;const P=N.face.normal.clone().transformDirection(N.object.matrixWorld);if(Math.abs(P.y)>.3||(P.y=0,P.normalize(),P.dot(a.getWorldDirection(qe()))>0))return null;const $=x.w,z=x.h,mt=Math.max(z/2+.35,Math.min(N.point.y,1.7+Math.max(0,z/2-.9))),It=qe(N.point.x,mt,N.point.z).addScaledVector(P,.035);return{pos:It,n:P,ok:Q(x,It,P,$,z)}},b=x=>{d&&(n.remove(d),d.traverse($=>$.geometry&&$.geometry.dispose())),d=new Ut;const N=new X(new Vt(x.w,x.h),new xt({color:3211104,transparent:!0,opacity:.32,depthWrite:!1,side:en})),P=new Wc(new Xc(new Vt(x.w,x.h)),new Kc({color:3211104}));d.add(N,P),d.userData={m:N,e:P},d.visible=!1,d.renderOrder=9,n.add(d)},S=x=>{x.home||(x.home={x:x.data.x,y:x.data.y,z:x.data.z,ix:x.data.ix,iz:x.data.iz,room:x.data.room,wall:x.data.wall})};function F(x){S(x);const N=m.findIndex(P=>P.p===x);N>=0&&m.splice(N,1),x.state="held",x.group.visible=!0,c={p:x,t:0,from:x.group.position.clone()},b(x),u=1,Qt(.5),i("GRABBED · CLICK TO HANG · RIGHT-CLICK TO LAUNCH",2.5)}function j(){const x=c.p,N=k(x);if(!N||!N.ok)return i(N?"NO ROOM THERE: OVERLAP OR DOORWAY":"AIM AT A WALL",1.6),yt(),!1;const P=x.data;Object.assign(P,{x:N.pos.x,y:N.pos.y,z:N.pos.z,ix:+N.n.x.toFixed(4),iz:+N.n.z.toFixed(4)});const $=A?A(P.x,P.z):null;return P.room=x.room=$&&$.id?$.id:P.room,P.wall=Math.abs(P.ix)>Math.abs(P.iz)?P.ix>0?"W":"E":P.iz>0?"S":"N",x.group.position.set(P.x,P.y,P.z),x.group.rotation.set(0,Math.atan2(P.ix,P.iz),0),x.state="wall",x.moved=!0,c=null,d&&(d.visible=!1),u=1,Qt(.9),i("HUNG",1.2),!0}function w(){if(!c)return null;const x=c.p;return c=null,d&&(d.visible=!1),x}function _(x){if(!x){if(x=y(9),!x)return;S(x),x.state="held"}const N=a.getWorldDirection(qe()),P=(c&&c.p===x,x.group.position.clone());m.push({p:x,pos:P,v:N.multiplyScalar(13).add(qe(0,2.2,0)),spin:qe((Math.random()-.5)*6,(Math.random()-.5)*8,(Math.random()-.5)*6),phase:"air"}),x.state="flying",x.moved=!1,c=null,d&&(d.visible=!1),u=1.4,Qt(1.2),i("LAUNCHED",1)}function tt(){if(c)return j();const x=y(12);return x?(F(x),!0):(i("AIM AT A PAINTING",1.2),!1)}function G(){_(c?c.p:null)}function et(x,N){const P=performance.now()/1e3;if(u=Math.max(0,u-x*4),ut(N,!!c),c){const $=c.p;c.t=Math.min(1,c.t+x*3.5);const z=a.getWorldDirection(qe()),mt=a.position.clone().addScaledVector(z,1.3+Math.max($.w,$.h)*.55);mt.y-=.1+Math.sin(P*2)*.03,$.group.position.lerpVectors(c.from,mt,c.t*c.t*(3-2*c.t)),c.t>=1&&c.from.copy(mt),$.group.rotation.set(0,Math.atan2(-z.x,-z.z)+Math.sin(P*1.3)*.05,Math.sin(P*1.7)*.03);const It=N?k($):null;if(d&&(d.visible=!!It,It)){d.position.copy(It.pos).addScaledVector(It.n,.01),d.rotation.set(0,Math.atan2(It.n.x,It.n.z),0);const _t=It.ok?3211104:16724016;d.userData.m.material.color.setHex(_t),d.userData.e.material.color.setHex(_t)}p=It,N||Y($)}for(let $=m.length-1;$>=0;$--){const z=m[$],mt=z.p,It=mt.group,_t=mt.h/2;if(z.phase==="air"){z.v.y-=9.8*x;const C=z.pos.x+z.v.x*x,L=z.pos.z+z.v.z*x;if(r(C,L))z.pos.x=C,z.pos.z=L;else{const W=ct(z.pos,z.v);z.wall=W,z.v.set(0,Math.min(0,z.v.y),0),z.phase="slide"}z.pos.y+=z.v.y*x,It.rotation.x+=z.spin.x*x,It.rotation.y+=z.spin.y*x,It.rotation.z+=z.spin.z*x,z.pos.y<.05+.02&&(z.pos.y=.05,z.phase="floor",z.v.y=0)}else if(z.phase==="slide"){z.v.y-=9.8*x,z.pos.y=Math.max(_t*Math.cos(.2),z.pos.y+z.v.y*x);const C=z.wall||qe(0,0,1);It.rotation.set(-.2,Math.atan2(C.x,C.z),0,"YXZ");const L=_t*Math.sin(.2)+.06,W=z.pos.clone();W.addScaledVector(C,0),It.position.set(W.x+C.x*L,z.pos.y,W.z+C.z*L),z.pos.y<=_t*Math.cos(.2)+.001&&(z.phase="rest")}if(z.phase==="floor"){const C=Math.hypot(z.v.x,z.v.z),L=Math.max(0,C-6*x)/(C||1);z.v.x*=L,z.v.z*=L;const W=z.pos.x+z.v.x*x,nt=z.pos.z+z.v.z*x;r(W,nt)?(z.pos.x=W,z.pos.z=nt):z.v.set(0,0,0),It.rotation.set(-Math.PI/2,It.rotation.y,0,"YXZ"),C<.05&&(z.phase="rest")}z.phase!=="slide"&&It.position.copy(z.pos),z.phase==="rest"&&(mt.state="floor",m.splice($,1))}}function Y(x){m.push({p:x,pos:x.group.position.clone(),v:qe(0,0,0),spin:qe(),phase:"air"}),x.state="flying",c=null,d&&(d.visible=!1)}function ct(x,N){const P=qe(N.x,0,N.z);if(P.lengthSq()<1e-6)return qe(0,0,1);P.normalize(),f.set(qe(x.x,Math.max(.5,x.y),x.z),P),f.far=3;const $=f.intersectObjects(E(),!1)[0];if(f.far=1/0,$&&$.face){const z=$.face.normal.clone().transformDirection($.object.matrixWorld);if(z.y=0,z.lengthSq()>.01)return z.normalize()}return P.negate()}let ft=null,H=null,pt=0;function ht(){try{return ft=ft||new(window.AudioContext||window.webkitAudioContext),ft.state==="suspended"&&ft.resume(),ft}catch{return null}}function ut(x,N){const P=o&&o();if(!x||P){H&&H.gain.setTargetAtTime(0,ft.currentTime,.05);return}const $=ht();if(!$)return;if(!H){H=$.createGain(),H.gain.value=0,H.connect($.destination);for(const[mt,It,_t]of[[58,"sine",.05],[117,"sine",.018],[176,"sine",.006]]){const C=$.createOscillator(),L=$.createGain(),W=$.createBiquadFilter();W.type="lowpass",W.frequency.value=260,C.type=It,C.frequency.value=mt,L.gain.value=_t,C.connect(W).connect(L).connect(H),C.start()}}H.gain.setTargetAtTime((N?.3:.14)*t,$.currentTime,.08);const z=$.currentTime;z-pt>(N?.35:1.4)&&Math.random()<(N?.3:.08)&&(pt=z,rt(.03+Math.random()*.03,1800+Math.random()*1200,(N?.022:.01)*t))}function rt(x,N,P){const $=ht();if(!$||o&&o())return;const z=$.createBuffer(1,Math.ceil($.sampleRate*x),$.sampleRate),mt=z.getChannelData(0);for(let L=0;L<mt.length;L++)mt[L]=(Math.random()*2-1)*(Math.random()<.3?1:.2);const It=$.createBufferSource(),_t=$.createBiquadFilter(),C=$.createGain();_t.type="bandpass",_t.frequency.value=N,_t.Q.value=.9,C.gain.value=P,It.buffer=z,It.connect(_t).connect(C).connect($.destination),It.start()}function Qt(x){rt(.08*x+.04,1200,.05*x*t);const N=ht();if(!N||o&&o())return;const P=N.createOscillator(),$=N.createGain(),z=N.currentTime;P.type="sine",P.frequency.setValueAtTime(220,z),P.frequency.exponentialRampToValueAtTime(70,z+.25),$.gain.setValueAtTime(.025*x*t,z),$.gain.exponentialRampToValueAtTime(.001,z+.3),P.connect($).connect(N.destination),P.start(z),P.stop(z+.32)}function yt(){rt(.14,380,.04*t)}const vt=()=>{const x={};return s.forEach(N=>{if(N.moved&&N.state==="wall"){const P=N.data;x[P.id]={x:+P.x.toFixed(3),y:+P.y.toFixed(3),z:+P.z.toFixed(3),ix:P.ix,iz:P.iz,room:P.room,wall:P.wall}}}),{v:1,gallery:l,moves:x}};function Et(x){let N=0;const P=x&&x.moves||{};for(const $ in P){const z=s.find(It=>It.data.id===$),mt=P[$];!z||z.state!=="wall"||![mt.x,mt.y,mt.z,mt.ix,mt.iz].every(Number.isFinite)||(S(z),Object.assign(z.data,{x:mt.x,y:mt.y,z:mt.z,ix:mt.ix,iz:mt.iz,room:mt.room||z.data.room,wall:mt.wall||z.data.wall}),z.room=z.data.room,z.group.position.set(mt.x,mt.y,mt.z),z.group.rotation.set(0,Math.atan2(mt.ix,mt.iz),0),z.moved=!0,N++)}return N}const Dt=new URLSearchParams(location.search).get("key"),Tt=x=>{const N=new Date;return isNaN(N)?"":N.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})},M=x=>{const N=new Date(x);return isNaN(N)?"":N.toLocaleString([],{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})};let D=null,T=null;const it=()=>{D&&(D.textContent=T&&T.saved?`Last saved: ${M(T.saved)}, ${T.n} move${T.n===1?"":"s"}`:"Last saved: never (default hanging)")},Z=(x,N,P,$=4e3)=>{const z=document.getElementById(x);z&&(clearTimeout(z._t),z.textContent=N,P&&(z.style.background=P),$&&(z._t=setTimeout(()=>{z.textContent=z.dataset.label,z.style.background=z.dataset.bg},$)))};async function At(){try{const x=await fetch(`${ts.api}/layout/${l}`,{cache:"no-store"});if(!x.ok)return 0;const N=await x.json();return Bt=Et(N),T=N.saved?{saved:N.saved,n:Object.keys(N.moves||{}).length}:null,it(),Bt}catch{return 0}finally{dt=!0}}let dt=!1,Bt=0;async function Xt(){if(!Dt)return{ok:!1};Z("saveLayout","Saving…",null,0);const x=JSON.stringify(vt()),N=Object.keys(JSON.parse(x).moves).length;let P=null;try{P=await fetch(`${ts.api}/layout/${l}`,{method:"PUT",headers:{"content-type":"application/json","x-key":Dt},body:x})}catch{}const $=!!(P&&P.ok);return $&&(T={saved:new Date().toISOString(),n:N},it()),Z("saveLayout",$?`✓ Saved (${N} painting${N===1?"":"s"} moved) at ${Tt()}`:`Save failed${P?" ("+P.status+")":""}`,$?"#1f8f4a":"#b3261e"),i($?"LAYOUT SAVED ("+N+" MOVED)":"SAVE FAILED",3),{ok:$,status:P?P.status:0}}async function ee(){if(!Dt)return{ok:!1};Z("resetLayout","Resetting…",null,0);let x=null;try{x=await fetch(`${ts.api}/layout/${l}`,{method:"DELETE",headers:{"x-key":Dt}})}catch{}const N=!!(x&&x.ok);return N&&(T=null,it()),Z("resetLayout",N?`✓ Reset to default at ${Tt()} · reloading…`:`Reset failed${x?" ("+x.status+")":""}`,N?"#1f8f4a":"#b3261e"),i(N?"RESET TO DEFAULT · RELOADING":"RESET FAILED",3),N&&!e.noReload&&setTimeout(()=>location.reload(),2200),{ok:N,status:x?x.status:0}}if(Dt){const x=document.createElement("div");x.id="tjlayout",x.style.cssText="position:fixed;top:58px;right:10px;z-index:2147483000;display:flex;flex-direction:column;align-items:flex-end;gap:6px;font:700 13px system-ui,sans-serif;pointer-events:auto";const N=document.createElement("div");N.style.cssText="display:flex;gap:8px",x.appendChild(N);for(const[P,$,z,mt]of[["saveLayout","SAVE LAYOUT",Xt,"#1f8f4a"],["resetLayout","RESET TO DEFAULT",()=>confirm("Reset this gallery to the default hanging?")&&ee(),"#a3352a"]]){const It=document.createElement("button");It.id=P,It.type="button",It.textContent=$,It.dataset.label=$,It.dataset.bg=mt,It.style.cssText=`background:${mt};color:#fff;border:0;border-radius:8px;padding:9px 12px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.5)`,["mousedown","touchstart","pointerdown","click"].forEach(_t=>It.addEventListener(_t,C=>{C.stopPropagation(),(_t==="click"||_t==="touchstart")&&(C.preventDefault(),z())},{passive:!1})),N.appendChild(It)}D=document.createElement("div"),D.id="layoutStatus",D.style.cssText="background:rgba(0,0,0,.72);color:#f2e4c4;border-radius:6px;padding:4px 8px;font:600 12px system-ui,sans-serif",it(),x.appendChild(D),document.body.appendChild(x)}return{primary:tt,secondary:G,update:et,grab:F,hang:j,drop:w,launch:_,save:Xt,reset:ee,load:At,apply:Et,serialize:vt,aimPainting:y,placement:k,fits:Q,get held(){return c?c.p:null},get preview(){return p},get flying(){return m.length},get loaded(){return dt},get applied(){return Bt},get hasKey(){return!!Dt},get lastSaved(){return T},get kick(){return u}}}const ws={id:"glitter",slot:"Glitter Cannon",hudName:"GLITTER CANNON",fireLabel:"SPRAY",altLabel:"BURST",help:"hold click spray glitter, right-click burst"},Bi={id:"blower",slot:"Leaf Blower",hudName:"LEAF BLOWER",fireLabel:"BLOW",help:"hold click blow"},we=(e=0,t=0,n=0)=>new q(e,t,n),Yi=[16765498,16727988,3139327,9240378,10116351,15660031,16738877,4029439,16754920,4259784],sA=[14247452,12072474,15245863,9211690,13060127];function ba(e,t={}){return new Fn({color:e,flatShading:!0,...t})}function iA(){const e=document.createElement("canvas");e.width=128,e.height=4;const t=e.getContext("2d"),n=t.createLinearGradient(0,0,128,0);["#ff3fb4","#ffd23a","#8cff3a","#2fe6ff","#9a5cff","#ff3fb4"].forEach((s,i,o)=>n.addColorStop(i/(o.length-1),s)),t.fillStyle=n,t.fillRect(0,0,128,4);const a=new Be(e);return a.colorSpace=Ce,a.wrapS=zn,a}function Vh(){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,240,255,.6)"),n.addColorStop(1,"rgba(255,200,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64),t.globalCompositeOperation="lighter",t.fillStyle="rgba(255,255,255,.9)",t.fillRect(30,2,4,60),t.fillRect(2,30,60,4),new Be(e)}function jh(e){const t=new ga({color:1540234,shininess:60,specular:8965328}),n=new ga({color:14198842,specular:16773312,shininess:70,flatShading:!0}),a=ba(1909542),s=(c,u,d,p,m,f=0)=>{const B=new X(c,u);return B.position.set(d,p,m),B.rotation.x=f,e.add(B),B};s(new de(.072,.082,.3,18),t,0,0,0,Math.PI/2),s(new ve(.082,18,8,0,Math.PI*2,0,Math.PI/2),t,0,0,.15,Math.PI/2),s(new ti(.03,12),new xt({map:iA(),toneMapped:!1}),0,0,.234),s(new _n(.084,.007,5,14),n,0,0,.1),s(new _n(.08,.007,5,14),n,0,0,-.1);const i=s(new de(.12,.07,.13,12,1,!0),new ga({color:1870484,side:en,shininess:40,flatShading:!0}),0,0,-.23,Math.PI/2),o=s(new _n(.12,.014,6,24),new xt({map:iA(),color:new Wt(1.6,1.6,1.6)}),0,0,-.295),r=s(new ve(.07,12,8,0,Math.PI*2,0,Math.PI/2),new ga({color:13627391,transparent:!0,opacity:.35,shininess:120,depthWrite:!1}),0,.07,.03);s(new de(.072,.072,.02,12),n,0,.07,.03);const A=new Ut;A.position.set(0,.085,.03),e.add(A);const l=new ZA(.012,0);for(let c=0;c<22;c++){const u=c*2.4,d=.012+c%5*.009,p=new X(l,new xt({color:Yi[c%Yi.length],toneMapped:!1}));p.position.set(Math.cos(u)*d,c%4*.008,Math.sin(u)*d),p.rotation.set(c,c*2,0),A.add(p)}s(new Ae(.05,.12,.06),a,0,-.1,.09,-.25),s(new Ae(.018,.04,.03),n,0,-.06,.04);const h=new us(new mr({map:Vh(),color:16777215,transparent:!0,depthWrite:!1,blending:bn,opacity:0}));return h.position.set(0,0,-.32),h.scale.set(.22,.22,1),e.add(h),e.userData.glitter={fill:A,lip:o,flash:h,bell:i,dome:r},e}function Wh(e){const t=new ga({color:15770403,shininess:50,flatShading:!0}),n=ba(2237222),a=ba(7304314),s=new ga({color:15328472,shininess:30,flatShading:!0}),i=(A,l,h,c,u,d=0,p=0,m=0)=>{const f=new X(A,l);return f.position.set(h,c,u),f.rotation.set(d,p,m),e.add(f),f};i(new de(.1,.1,.11,14),t,0,0,.1,0,0,Math.PI/2),i(new Ae(.1,.1,.16),t,0,0,0);const o=i(new ti(.075,14),n,.057,0,.1,0,Math.PI/2,0);for(let A=0;A<3;A++)i(new Ae(.004,.12-A*.03,.006),a,.06,0,.1+(A-1)*.03);i(new _n(.06,.014,6,12,Math.PI),n,0,.09,.06,0,Math.PI/2,0),i(new de(.035,.042,.32,10),s,0,-.01,-.22,Math.PI/2),i(new de(.044,.044,.03,10),n,0,-.01,-.07,Math.PI/2);const r=i(new de(.03,.035,.08,10),s,0,-.01,-.41,Math.PI/2);return r.scale.set(1.5,1,.6),i(new Ae(.03,.025,.012),new xt({color:4718474}),.03,.06,.02),e.userData.blower={grille:o,noz:r},e}function Xh(e,t=.3){let n=null,a=null,s=null,i=null;const o=c=>(i||(i=c.createGain(),i.gain.value=t,i.connect(c.destination)),i),r={played:0,suppressed:0},A=()=>{if(e())return r.suppressed++,null;try{n=n||new(window.AudioContext||window.webkitAudioContext),n.state==="suspended"&&n.resume()}catch{return null}if(!a){a=n.createBuffer(1,n.sampleRate,n.sampleRate);const c=a.getChannelData(0);for(let u=0;u<c.length;u++)c[u]=Math.random()*2-1}return r.played++,n},l=(c,u,d,p,m,f,B=1)=>{const E=c.currentTime,I=c.createBufferSource(),y=c.createBiquadFilter(),Q=c.createGain();I.buffer=a,I.loop=!0,y.type=d,y.Q.value=B,y.frequency.setValueAtTime(p,E),y.frequency.exponentialRampToValueAtTime(m,E+u),Q.gain.setValueAtTime(f,E),Q.gain.exponentialRampToValueAtTime(8e-4,E+u),I.connect(y).connect(Q).connect(o(c)),I.start(E,Math.random()*.5),I.stop(E+u+.02)},h=(c,u,d,p,m,f="sine",B=0)=>{const E=c.currentTime+B,I=c.createOscillator(),y=c.createGain();I.type=f,I.frequency.setValueAtTime(u,E),I.frequency.exponentialRampToValueAtTime(d,E+p),y.gain.setValueAtTime(1e-4,E),y.gain.linearRampToValueAtTime(m,E+.008),y.gain.exponentialRampToValueAtTime(5e-4,E+p),I.connect(y).connect(o(c)),I.start(E),I.stop(E+p+.02)};return{stats:r,sprinkle(){const c=A();if(c&&(l(c,.12,"highpass",6e3,4e3,.07,.7),Math.random()<.45)){const u=2200+Math.random()*3800;h(c,u,u*1.01,.18,.035)}},burst(){const c=A();c&&(l(c,.18,"lowpass",900,120,.4,.8),l(c,.5,"highpass",7e3,3e3,.08,.6),[0,4,7,12,16].forEach((u,d)=>h(c,1318*Math.pow(2,u/12),1318*Math.pow(2,u/12),.28,.04,"triangle",d*.045)))},swish(c){if(c<.02)return;const u=A();u&&l(u,.16,"bandpass",3200,1800,.12*c,1.4)},whee(){const c=A();c&&(h(c,620,1500,.32,.06,"sine"),h(c,930,2100,.28,.025,"triangle",.02))},blower(c,u){if(c&&e()&&(c=!1),c&&!s){const d=A();if(!d)return;const p=d.currentTime,m=d.createOscillator(),f=d.createOscillator(),B=d.createBiquadFilter(),E=d.createBufferSource(),I=d.createBiquadFilter(),y=d.createGain();m.type="sawtooth",m.frequency.setValueAtTime(60,p),m.frequency.linearRampToValueAtTime(118,p+.35),f.type="square",f.frequency.setValueAtTime(121,p),f.frequency.linearRampToValueAtTime(239,p+.35),B.type="lowpass",B.frequency.value=520;const Q=d.createGain();Q.gain.value=.5,m.connect(B),f.connect(Q).connect(B),E.buffer=a,E.loop=!0,I.type="bandpass",I.frequency.value=1100,I.Q.value=.6,E.connect(I),B.connect(y),I.connect(y),y.gain.setValueAtTime(1e-4,p),y.gain.linearRampToValueAtTime(.12,p+.25),y.connect(o(d)),m.start(p),f.start(p),E.start(p),s={a:d,g:y,nodes:[m,f,E]}}if(!c&&s){const{a:d,g:p,nodes:m}=s,f=d.currentTime;p.gain.cancelScheduledValues(f),p.gain.setValueAtTime(p.gain.value,f),p.gain.linearRampToValueAtTime(1e-4,f+(e()?.02:.25)),m.forEach(B=>B.stop(f+.3)),s=null}},get humming(){return!!s}}}function Kh(){return new me({side:en,toneMapped:!1,fog:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,uniforms:{uTime:{value:0}},vertexShader:`attribute float aSeed; uniform float uTime; varying vec3 vCol; varying float vGlint, vSheen;
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
      }`})}function Zh(e){const t=new Cs,n=e/2,a=[0,0,0];for(let i=0;i<6;i++){const o=i/6*Math.PI*2;a.push(Math.cos(o)*n,0,Math.sin(o)*n*.8)}const s=[];for(let i=0;i<6;i++)s.push(0,1+i,1+(i+1)%6);return t.setAttribute("position",new gs(a,3)),t.setIndex(s),t}let ia=null;function $h(){return ia||(ia={handle:new de(.011,.011,.34,5),head:new de(.025,.075,.1,7),band:new de(.028,.028,.018,7),pan:new Ae(.14,.01,.1),lip:new Ae(.14,.045,.01),wood:ba(10119738),straw:ba(15123546),red:ba(14170730),panM:ba(3842264)},ia.handle.translate(0,-.17,0),ia.head.translate(0,-.38,0),ia.band.translate(0,-.335,0),ia.head.scale(1,1,.45),ia)}function tu(e){const t=$h(),n=e.userData.rig,a=new Ut;a.position.set(.16,.06,.07),a.add(new X(t.handle,t.wood),new X(t.head,t.straw),new X(t.band,t.red)),n.body.add(a);const s=new Ut;s.position.set(-.13,-.2,.17),s.add(new X(t.pan,t.panM));const i=new X(t.lip,t.panM);return i.position.set(0,.016,-.04),s.add(i),n.body.add(s),e.userData.broom=a,e.userData.pan=s,e}function eu(e){const{scene:t,camera:n}=e;if(!t||!n)throw new Error("installGlitterBlower: scene and camera are required");const a=e.walkable||(()=>!0),s=e.floorH||(()=>0),i=e.say||(()=>{}),o=e.isMuted||(()=>!1),r=e.isBusy||(()=>!1),A=e.isLocked||(()=>!0),l=e.pillars||[],h=e.paintings||[],c=e.phone!=null?!!e.phone:matchMedia("(pointer: coarse)").matches||!!e.low,u=e.cap||(c?1200:3e3),d=c?210:420,p=e.maxElves||(c?2:4),m=e.ceiling||4,f=Xh(o,e.volume!=null?e.volume:.3),B=e.vm||[],E=e.firstSlot!=null?e.firstSlot:B.length,I={glitter:E,blower:E+1},y=jh(new Ut),Q=Wh(new Ut);[y,Q].forEach((g,U)=>{g.scale.setScalar(.6),g.rotation.y=.1,g.visible=!1,B[E+U]=g,e.vmScene&&e.vmScene.add(g)});const k=g=>g===I.glitter||g===I.blower,b=e.getWeapon||(()=>-1),S=new Zr(Zh(c?.034:.028),Kh(),u);S.instanceMatrix.setUsage($a),S.frustumCulled=!1,S.castShadow=S.receiveShadow=!1,S.name="glitter",S.renderOrder=1,S.instanceColor=new Wo(new Float32Array(u*3).fill(1),3),S.instanceColor.setUsage($a);const F=new Wo(new Float32Array(u),1);for(let g=0;g<u;g++)F.array[g]=Math.random();S.geometry.setAttribute("aSeed",F);const j=S.instanceMatrix.array;j.fill(0),t.add(S),e.exempt&&e.exempt(S);const w=new Float32Array(u*3),_=new Float32Array(u*3),tt=new Uint8Array(u),G=new Float32Array(u*4),et=new Float32Array(u),Y=new Float32Array(u);let ct=0,ft=0,H=0,pt=0,ht=u,ut=-1,rt=u,Qt=-1,yt=0,vt=0;const Et=new Wt,Dt=(g,U,J,v)=>{const O=g*16,at=Math.cos(J),st=Math.sin(J),lt=Math.cos(U),gt=Math.sin(U);j[O]=at*v,j[O+1]=0,j[O+2]=-st*v,j[O+3]=0,j[O+4]=st*gt*v,j[O+5]=lt*v,j[O+6]=at*gt*v,j[O+7]=0,j[O+8]=st*lt*v,j[O+9]=-gt*v,j[O+10]=at*lt*v,j[O+11]=0,j[O+12]=w[g*3],j[O+13]=w[g*3+1],j[O+14]=w[g*3+2],j[O+15]=1,g<ht&&(ht=g),g>ut&&(ut=g)},Tt=g=>{const U=g*16;for(let J=0;J<16;J++)j[U+J]=0;g<ht&&(ht=g),g>ut&&(ut=g)};function M(g,U,J,v,O,at){const st=ct;return ct=(ct+1)%u,tt[st]===1?ft--:tt[st]===2?H--:tt[st]===3&&pt--,tt[st]=1,ft++,w[st*3]=g,w[st*3+1]=U,w[st*3+2]=J,_[st*3]=v,_[st*3+1]=O,_[st*3+2]=at,G[st*4]=Math.random()*6.28,G[st*4+1]=Math.random()*6.28,G[st*4+2]=(Math.random()-.5)*30,G[st*4+3]=(Math.random()-.5)*22,et[st]=0,Y[st]=.75+Math.random()*.6,Et.setHex(Yi[Math.random()*Yi.length|0]),Math.random()<.15&&Et.offsetHSL(0,0,.12),S.instanceColor.setXYZ(st,Et.r,Et.g,Et.b),st<rt&&(rt=st),st>Qt&&(Qt=st),F.array[st]=Math.random(),st}const D=g=>{tt[g]=2,ft--,H++,et[g]=vt,w[g*3+1]=s(w[g*3],w[g*3+2])+.011+Math.random()*.005,Dt(g,(Math.random()-.5)*.5,G[g*4],Y[g])},T=we(),it=we(),Z=we(),At=we();function dt(g=.55){return n.updateMatrixWorld(),n.getWorldDirection(T),it.set(1,0,0).applyQuaternion(n.quaternion),Z.set(0,1,0).applyQuaternion(n.quaternion),At.copy(n.position).addScaledVector(T,g).addScaledVector(it,.16).addScaledVector(Z,-.13)}function Bt(g,U,J,v,O=.6){const at=dt(.5);for(let st=0;st<g;st++){const lt=Math.random()*6.283,gt=Math.sqrt(Math.random())*U,qt=J+Math.random()*(v-J),ot=T.x+(it.x*Math.cos(lt)+Z.x*Math.sin(lt))*gt,wt=T.y+(it.y*Math.cos(lt)+Z.y*Math.sin(lt))*gt,Ht=T.z+(it.z*Math.cos(lt)+Z.z*Math.sin(lt))*gt;M(at.x+(Math.random()-.5)*.04,at.y+(Math.random()-.5)*.04,at.z+(Math.random()-.5)*.04,ot*qt,wt*qt+O,Ht*qt)}}function Xt(g,U=.6,J){if(!g)return 0;const v=U*U,O=J?J.x:g.x,at=J?J.z:g.z;let st=0;for(let lt=0;lt<u;lt++){const gt=tt[lt];if(gt!==2&&!(gt===1&&w[lt*3+1]<s(w[lt*3],w[lt*3+2])+.35))continue;const qt=w[lt*3]-g.x,ot=w[lt*3+2]-g.z;qt*qt+ot*ot>v||(gt===1?ft--:H--,tt[lt]=3,pt++,et[lt]=.25+Math.random()*.3,_[lt*3]=O+(Math.random()-.5)*.05,_[lt*3+2]=at+(Math.random()-.5)*.05,_[lt*3+1]=et[lt],st++)}return x.swept+=st,st}function ee(){for(let g=0;g<u;g++)tt[g]=0,Tt(g);ft=H=pt=0}const x={sprayed:0,swept:0,blownFlakes:0,elvesSpawned:0,tumbles:0,getups:0},N=c?36:72,P=new Float32Array(N*3),$=new Float32Array(N*3),z=new Float32Array(N);let mt=0;const It=new Cs;It.setAttribute("position",new Ra(P,3).setUsage($a)),It.setAttribute("aLife",new Ra(z,1).setUsage($a));const _t=new me({transparent:!0,depthWrite:!1,blending:bn,uniforms:{uScale:{value:400}},vertexShader:"attribute float aLife; uniform float uScale; varying float vA; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.); vA = aLife; gl_PointSize = aLife > 0. ? uScale * (0.2 - aLife * 0.14) / max(0.3, -mv.z) : 0.; gl_Position = projectionMatrix * mv; }",fragmentShader:"varying float vA; void main(){ vec2 q = gl_PointCoord - .5; float d = dot(q, q) * 4.; if (d > 1.) discard; gl_FragColor = vec4(vec3(.75, .88, 1.) * (1. - d) * (1. - d) * vA * .2, 1.); }"}),C=new Zc(It,_t);C.frustumCulled=!1,C.name="blowerAir",t.add(C);const L=c?10:22,W=new XA;W.moveTo(0,-.05),W.quadraticCurveTo(.035,-.01,0,.05),W.quadraticCurveTo(-.035,-.01,0,-.05);const nt=new KA(W,3);nt.rotateX(-Math.PI/2);const V=new Zr(nt,new Fn({side:en}),L);V.frustumCulled=!1,V.instanceMatrix.setUsage($a),V.name="blowerLeaves";const Nt=Array.from({length:L},(g,U)=>(V.setColorAt(U,Et.setHex(sA[U%sA.length])),{p:we(),v:we(),life:0,rx:0,ry:0,sx:0,sy:0}));let Gt=0;const Mt=new $i;Nt.forEach((g,U)=>{Mt.scale.setScalar(0),Mt.updateMatrix(),V.setMatrixAt(U,Mt.matrix)}),t.add(V);const jt=[],$t={add(g){return!g||jt.includes(g)?()=>{}:(g.radius=g.radius||.35,g.mass=g.mass||1,g._v=g._v||we(),jt.push(g),()=>$t.remove(g))},remove(g){const U=jt.indexOf(g);U>=0&&jt.splice(U,1)},get list(){return jt.slice()}},Rt=g=>g.getPosition?g.getPosition():g.position||g.object&&g.object.position,zt=[];let Jt=0,pe=0,je=!1,We={g:0,b:0};function Pn(g){let U=null,J=1e9;const v=we(g.x,0,g.z);for(const O of h){if(O.state!=="wall"||!O.group||!O.data)continue;const at=O.group.position,st=Math.hypot(at.x-v.x,at.z-v.z);if(st>14||st>J)continue;const lt=we(O.data.ix,0,O.data.iz),gt=we(lt.z,0,-lt.x),qt=Math.random()<.5?-1:1;for(const ot of[.75,1.05]){const wt=we(at.x,0,at.z).addScaledVector(gt,qt*(O.w/2+.18)).addScaledVector(lt,ot);if(!a(wt.x,wt.z))continue;const Ht=we(at.x,Math.max(.7,at.y-O.h/2+.12),at.z).addScaledVector(gt,qt*(O.w/2+.16)).addScaledVector(lt,.22);U={floor:wt,wall:Ht,p:O},J=st;break}}if(!U)for(let O=0;O<12&&!U;O++){const at=Math.random()*6.28,st=we(v.x+Math.cos(at)*2.5,0,v.z+Math.sin(at)*2.5);a(st.x,st.z)&&(U={floor:st,wall:we(st.x,s(st.x,st.z)+.9,st.z),p:null})}return U}function Ha(g,U,J){let v=-1,O=1e18;for(let at=0;at<u;at++){if(tt[at]!==2)continue;const st=w[at*3]-g,lt=w[at*3+2]-U,gt=st*st+lt*lt;gt>=O||J&&J(w[at*3],w[at*3+2])||(O=gt,v=at)}return v}const aa=g=>(U,J)=>zt.some(v=>v!==g&&v.tgt&&(v.state==="walk"||v.state==="sweep")&&(v.tgt.x-U)**2+(v.tgt.z-J)**2<.8);function ui(){const g=Ha(n.position.x,n.position.z,null);if(g<0||!e.makeElf)return null;const U=Pn({x:w[g*3],z:w[g*3+2]});if(!U)return null;const J=tu(e.makeElf(Math.random()));J.name="sweeperElf",J.scale.setScalar(.05),J.position.copy(U.wall),t.add(J);const v={s:J,home:U,state:"emerge",t:0,st:0,pos:U.floor.clone(),v:we(),vy:0,hop:0,yaw:0,roll:0,axis:we(1,0,0),quiet:0,stuck:0,tgt:null,strokes:0,ph:Math.random()*6,lastWhee:-9};return v.push={name:"elf",radius:.3,mass:1,getPosition:()=>gi.set(v.pos.x,s(v.pos.x,v.pos.z)+.3+v.hop,v.pos.z),onPush(O){v.state==="emerge"||v.state==="home"||v.state==="gone"||(v.v.x+=O.x,v.v.z+=O.z,v.vy=Math.max(v.vy,Math.min(3.2,v.vy+O.y)),v.state!=="tumble"&&Math.hypot(v.v.x,v.v.z)>.9&&(v.state="tumble",v.st=0,v.quiet=0,x.tumbles++,vt-v.lastWhee>1.2&&(v.lastWhee=vt,f.whee())))}},$t.add(v.push),zt.push(v),x.elvesSpawned++,je||(je=!0,i("THE ELVES HAVE NOTICED THE GLITTER",2.5)),v}const gi=we(),Or=new ze,fi=new ze;new fn;const Vr=we(0,1,0);function Uc(g,U){g.t+=U,g.st+=U;const J=g.s,v=g.t+g.ph;let O="idle",at=null;const st=(ot,wt,Ht)=>{const ue=ot-g.pos.x,Ee=wt-g.pos.z,ye=Math.hypot(ue,Ee);if(ye<1e-4)return 0;const sn=Math.min(ye,Ht*U)/ye;let Ye=g.pos.x+ue*sn,An=g.pos.z+Ee*sn;a(Ye,An)||(a(Ye,g.pos.z)?An=g.pos.z:a(g.pos.x,An)?Ye=g.pos.x:(Ye=g.pos.x,An=g.pos.z));const Ea=Math.hypot(Ye-g.pos.x,An-g.pos.z);return g.stuck=Ea<Ht*U*.3?g.stuck+U:0,g.pos.x=Ye,g.pos.z=An,at=Math.atan2(ue,Ee),ye},lt=()=>{const ot=Ha(g.pos.x,g.pos.z,aa(g)),wt=ot<0?Ha(g.pos.x,g.pos.z,null):ot;return wt<0?(g.tgt=null,!1):(g.tgt=we(w[wt*3],0,w[wt*3+2]),!0)};if(g.state==="emerge"){const ot=Math.min(1,g.st/1.3);if(O=ot<.45?"peek":"walk",ot<.45)J.position.copy(g.home.wall),J.scale.setScalar(Math.max(.05,Math.min(1,g.st/.45)));else{const wt=(ot-.45)/.55,Ht=s(g.home.floor.x,g.home.floor.z)+.35;J.position.lerpVectors(g.home.wall,gi.set(g.home.floor.x,Ht,g.home.floor.z),wt),J.position.y+=Math.sin(wt*Math.PI)*.35,J.scale.setScalar(1)}ot>=1&&(g.pos.copy(g.home.floor),g.state=lt()?"walk":"retreat",g.st=0)}else if(g.state==="walk")O="walk",(!g.tgt||g.st>.6)&&(g.st=0,lt()||(g.state="retreat",g.st=0)),g.tgt&&(st(g.tgt.x,g.tgt.z,1.7)<.28&&(g.state="sweep",g.st=0,g.strokes=0),g.stuck>1.2&&(g.pos.set(g.tgt.x+(Math.random()-.5)*.5,0,g.tgt.z+(Math.random()-.5)*.5),a(g.pos.x,g.pos.z)||g.pos.set(g.tgt.x,0,g.tgt.z),g.stuck=0,g.glitch=.3));else if(g.state==="sweep"){if(O="scrub",at=g.yaw,g.st>.55){g.st=0,g.strokes++;const wt=Math.sin(g.yaw),Ht=Math.cos(g.yaw),ue=gi.set(g.pos.x+wt*.22,0,g.pos.z+Ht*.22),Ee=we(g.pos.x+wt*.12-Ht*.1,0,g.pos.z+Ht*.12+wt*.1),ye=Xt(ue,.5,Ee),sn=n.position.distanceTo(J.position);if(ye>0&&g.strokes%2===1&&f.swish(1/(1+sn*sn*.12)),ye===0)lt()?(g.state="walk",g.st=0):(g.state="retreat",g.st=0);else if(g.strokes>2){const Ye=g.tgt;lt()&&Ye&&g.tgt.distanceTo(Ye)>.35&&(g.state="walk",g.st=0)}}g.pos.x+=Math.sin(g.yaw)*U*.05,g.pos.z+=Math.cos(g.yaw)*U*.05}else if(g.state==="tumble"){O="carry";const ot=Math.hypot(g.v.x,g.v.z),wt=Math.exp(-(g.hop>.01?.6:2.6)*U);g.v.x*=wt,g.v.z*=wt,g.vy-=9.8*U,g.hop=Math.max(0,g.hop+g.vy*U),g.hop===0&&g.vy<0&&(g.vy=ot>1.2?-g.vy*.3:0);let Ht=g.pos.x+g.v.x*U,ue=g.pos.z+g.v.z*U;a(Ht,g.pos.z)||(g.v.x*=-.45,Ht=g.pos.x),a(g.pos.x,ue)||(g.v.z*=-.45,ue=g.pos.z),g.pos.x=Ht,g.pos.z=ue,ot>.05&&g.axis.set(g.v.z,0,-g.v.x).normalize(),g.roll+=ot*U*5.5,g.quiet=ot<.35&&g.hop<.01?g.quiet+U:0,g.quiet>.45&&(g.state="getup",g.st=0,x.getups++,g.from=J.quaternion.clone())}else if(g.state==="getup"){O="idle";const ot=Math.min(1,g.st/.7);ot>=1&&(g.roll=0,g.state=lt()?"walk":"retreat",g.st=0),g.getK=ot}else if(g.state==="retreat"){O="retreat";const ot=st(g.home.floor.x,g.home.floor.z,1.9);H>0&&g.st>.4&&lt()?(g.state="walk",g.st=0):(ot<.15||g.stuck>1.5)&&(g.state="home",g.st=0,g.hp=J.position.clone())}else if(g.state==="home"){O="walk";const ot=Math.min(1,g.st/.7);J.position.lerpVectors(g.hp,g.home.wall,ot),J.position.y+=Math.sin(ot*Math.PI)*.25,J.scale.setScalar(Math.max(.05,1-ot)),ot>=1&&(g.state="gone")}if(g.state==="walk"||g.state==="sweep"||g.state==="retreat"||g.state==="tumble"||g.state==="getup"){for(const[wt,Ht]of l){const ue=g.pos.x-wt,Ee=g.pos.z-Ht,ye=Math.hypot(ue,Ee);ye<.6&&ye>0&&(g.pos.x=wt+ue/ye*.6,g.pos.z=Ht+Ee/ye*.6)}const ot=O==="scrub"?Math.abs(Math.sin(v*11))*.03:O==="walk"||O==="retreat"?Math.abs(Math.sin(v*8))*.12:0;J.position.set(g.pos.x,s(g.pos.x,g.pos.z)+.35+g.hop+ot,g.pos.z),J.scale.setScalar(g.glitch>0?.6+Math.random()*.5:1)}if(g.glitch>0&&(g.glitch-=U),e.animateElf&&e.animateElf(J,O,g.t,n,U),at!=null){let ot=at-g.yaw;ot=Math.atan2(Math.sin(ot),Math.cos(ot)),g.yaw+=ot*Math.min(1,U*10)}g.state==="tumble"?(Or.setFromAxisAngle(g.axis,g.roll),fi.setFromAxisAngle(Vr,g.yaw),J.quaternion.copy(Or).multiply(fi)):g.state==="getup"?(fi.setFromAxisAngle(Vr,g.yaw),J.quaternion.slerpQuaternions(g.from,fi,g.getK*g.getK*(3-2*g.getK)),J.position.y-=(1-g.getK)*.18):g.state!=="emerge"&&g.state!=="home"&&J.rotation.set(0,g.yaw+(O==="scrub"?Math.sin(v*7)*.35:0),0);const gt=J.userData.broom,qt=J.userData.pan;O==="scrub"?(gt.rotation.set(-.85,Math.sin(v*11.4)*.7,.25),qt.visible=!0):(gt.rotation.set(2.75+Math.sin(v*6)*.08,0,g.state==="tumble"?Math.sin(v*15)*1.2:-.25),qt.visible=g.state==="tumble")}function Gc(g){H>0?Jt+=g:Jt=0,pe-=g;const U=zt.filter(J=>J.state!=="home"&&J.state!=="gone").length;Jt>1.6&&pe<=0&&U<p&&(U===0||H/U>160)&&(pe=.9,ui());for(let J=zt.length-1;J>=0;J--){const v=zt[J];Uc(v,g),v.state==="gone"&&(t.remove(v.s),$t.remove(v.push),zt.splice(J,1))}H===0&&!zt.length&&(je=!1)}function Yc(g){const J=Math.exp(-2.1*g);ft=0,H=0,pt=0;for(let v=0;v<u;v++){const O=tt[v];if(O===0)continue;if(O===2){H++;continue}const at=v*3;if(O===1){et[v]+=g;let st=_[at]*J,lt=_[at+1]*J-7.5*g,gt=_[at+2]*J;const qt=Math.sin(vt*9+v)*.35*g;st+=qt,gt-=qt,lt<-1.6&&(lt=-1.6+(lt+1.6)*.5);let ot=w[at]+st*g,wt=w[at+2]+gt*g;a(ot,wt)||(a(w[at],wt)?(ot=w[at],st*=-.3):a(ot,w[at+2])?(wt=w[at+2],gt*=-.3):(ot=w[at],wt=w[at+2],st*=-.3,gt*=-.3));let Ht=w[at+1]+lt*g;if(Ht>m-.05&&(Ht=m-.05,lt=-Math.abs(lt)*.3),w[at]=ot,w[at+1]=Ht,w[at+2]=wt,_[at]=st,_[at+1]=lt,_[at+2]=gt,Ht<=s(ot,wt)+.012||et[v]>9){ft++,D(v);continue}ft++,Dt(v,G[v*4+1]+G[v*4+2]*et[v],G[v*4]+G[v*4+3]*et[v],Y[v])}else if(O===3){et[v]-=g;const st=Math.min(1,g*7);if(w[at]+=(_[at]-w[at])*st,w[at+2]+=(_[at+2]-w[at+2])*st,w[at+1]=s(w[at],w[at+2])+.013,et[v]<=0){tt[v]=0,Tt(v);continue}pt++,Dt(v,0,G[v*4]+vt*3,Y[v]*Math.max(.05,et[v]/Math.max(.05,_[at+1])))}}}const di=5.2,jr=Math.tan(.44);function qc(g){const U=dt(.62),J=T.x,v=T.y,O=T.z,at=Math.hypot(J,O)||1,st=J/at,lt=O/at;for(let gt=0;gt<u;gt++){const qt=tt[gt];if(qt!==1&&qt!==2)continue;const ot=gt*3,wt=w[ot]-U.x,Ht=w[ot+1]-U.y,ue=w[ot+2]-U.z,Ee=wt*J+Ht*v+ue*O;if(Ee<0||Ee>di)continue;const ye=wt-J*Ee,sn=Ht-v*Ee,Ye=ue-O*Ee;if(Math.sqrt(ye*ye+sn*sn+Ye*Ye)>.3+Ee*jr)continue;const Mn=1-Ee/di,Ea=Math.hypot(ye,Ye)||1,Kr=.9*Math.random();qt===2?(tt[gt]=1,H--,ft++,et[gt]=0,x.blownFlakes++,_[ot]=(st+ye/Ea*Kr)*(3+7*Mn)*(.6+Math.random()*.6),_[ot+2]=(lt+Ye/Ea*Kr)*(3+7*Mn)*(.6+Math.random()*.6),_[ot+1]=1+Math.random()*2.8*Mn,w[ot+1]+=.01):(_[ot]+=st*16*Mn*g,_[ot+2]+=lt*16*Mn*g,_[ot+1]+=2*Mn*g)}for(const gt of jt){const qt=Rt(gt);if(!qt)continue;const ot=qt.x-U.x,wt=qt.y-U.y,Ht=qt.z-U.z,ue=ot*J+wt*v+Ht*O;if(ue<0||ue>di)continue;const Ee=ot-J*ue,ye=wt-v*ue,sn=Ht-O*ue;if(Math.sqrt(Ee*Ee+ye*ye+sn*sn)>gt.radius+.3+ue*jr)continue;const An=(1-ue/di)/gt.mass,Mn=Math.hypot(Ee,sn)||1,Ea=gi.set((st+Ee/Mn*.35)*22*An*g,7*An*g,(lt+sn/Mn*.35)*22*An*g);gt.onPush?gt.onPush(Ea,{from:U,dir:T,strength:An,dt:g}):gt._v.add(Ea)}for(let gt=0;gt<(c?2:3);gt++){const qt=mt;mt=(mt+1)%N;const ot=Math.random()*6.28,wt=Math.random()*.2;P[qt*3]=U.x,P[qt*3+1]=U.y,P[qt*3+2]=U.z;const Ht=7+Math.random()*4;$[qt*3]=(J+(it.x*Math.cos(ot)+Z.x*Math.sin(ot))*wt)*Ht,$[qt*3+1]=(v+(it.y*Math.cos(ot)+Z.y*Math.sin(ot))*wt)*Ht,$[qt*3+2]=(O+(it.z*Math.cos(ot)+Z.z*Math.sin(ot))*wt)*Ht,z[qt]=1}if(Math.random()<g*(c?3:5)){const gt=Nt[Gt];Gt=(Gt+1)%L,gt.p.copy(U),gt.v.set(J*6+(Math.random()-.5)*2,v*6+1.5,O*6+(Math.random()-.5)*2),gt.life=3.5,gt.rx=Math.random()*6,gt.ry=Math.random()*6,gt.sx=(Math.random()-.5)*14,gt.sy=(Math.random()-.5)*9}}function Pc(g){let U=!1;for(let v=0;v<N;v++){if(z[v]<=0)continue;U=!0,z[v]=Math.max(0,z[v]-g*2.4);const O=Math.exp(-1.5*g);$[v*3]*=O,$[v*3+1]*=O,$[v*3+2]*=O,P[v*3]+=$[v*3]*g,P[v*3+1]+=$[v*3+1]*g,P[v*3+2]+=$[v*3+2]*g}(U||C.userData.any)&&(It.attributes.position.needsUpdate=!0,It.attributes.aLife.needsUpdate=!0),C.userData.any=U;let J=!1;Nt.forEach((v,O)=>{if(v.life<=0)return;J=!0,v.life-=g;const at=s(v.p.x,v.p.z)+.004;if(v.p.y>at){v.v.y-=4*g,v.v.multiplyScalar(Math.exp(-1.6*g)),v.v.y<-1.1&&(v.v.y=-1.1);const st=v.p.x+v.v.x*g,lt=v.p.z+v.v.z*g;a(st,lt)?(v.p.x=st,v.p.z=lt):(v.v.x*=-.3,v.v.z*=-.3),v.p.y=Math.max(at,v.p.y+v.v.y*g),v.rx+=v.sx*g,v.ry+=v.sy*g}else v.rx*=.9;Mt.position.copy(v.p),Mt.rotation.set(v.p.y>at?v.rx:.05,v.ry,0),Mt.scale.setScalar(Math.min(1,v.life/.6)),Mt.updateMatrix(),V.setMatrixAt(O,Mt.matrix)}),(J||V.userData.any)&&(V.instanceMatrix.needsUpdate=!0),V.userData.any=J}function Hc(g){for(const U of jt){if(U.onPush)continue;const J=U.object?U.object.position:U.position;if(!J||U._v.lengthSq()<1e-6)continue;const v=Math.exp(-3*g);U._v.x*=v,U._v.z*=v;const O=J.x+U._v.x*g,at=J.z+U._v.z*g;a(O,J.z)?J.x=O:U._v.x*=-.4,a(J.x,at)?J.z=at:U._v.z*=-.4,U._v.y=0}}let Sn=!1,Ja=0,sa=0,Io=0,pi=0;function Jc(g){r()||(Sn=!0,g===I.glitter&&!We.g&&(We.g=1,i("GLITTER CANNON · HOLD TO SPRAY · RIGHT-CLICK BURST",2.5)),g===I.blower&&!We.b&&(We.b=1,i("LEAF BLOWER · HOLD TO BLOW",2)))}function mi(){Sn=!1}function Co(g){g==null&&(g=b()),!(g!==I.glitter||r()||Ja>0)&&(Ja=.6,sa=1,Bt(c?120:260,.55,2.5,7.5,1.6),x.sprayed+=c?120:260,f.burst())}if(addEventListener("mouseup",g=>{g.button===0&&mi()}),addEventListener("blur",mi),addEventListener("mousedown",g=>{g.button===2&&A()&&b()===I.glitter&&!window.__reading&&Co(I.glitter)}),addEventListener("keydown",g=>{const U=/^Digit(\d)$/.exec(g.code);if(!U||!e.setWeapon)return;const J=+U[1]-1;k(J)&&e.setWeapon(J)}),typeof document<"u"){const g=document.createElement("style");g.textContent="#tburst{display:none}@media (pointer:coarse){#tburst{display:block;position:fixed;bottom:calc(120px + var(--sa-bottom, env(safe-area-inset-bottom)));right:calc(16px + var(--sa-right, env(safe-area-inset-right)));width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#ff3fb4cc,#ffd23acc,#2fe6ffcc);color:#fff;font:bold 11px monospace;border:3px solid #fff;text-shadow:0 1px 2px #000}#tburst[hidden]{display:none}}#tfire.gb-hold{box-shadow:0 0 0 4px #fff8,0 0 18px #ff9cf0}",document.head.appendChild(g);const U=document.getElementById("hud"),J=U?[...U.querySelectorAll(".wpn")].pop():null;[[ws,I.glitter],[Bi,I.blower]].forEach(([st,lt])=>{if(!U||U.querySelector(`.wpn[data-w="${lt}"]`))return;const gt=document.createElement("button");gt.className="wpn",gt.type="button",gt.dataset.w=lt,gt.dataset.tool=st.id,gt.innerHTML=`<b>${lt+1}</b> ${st.slot}`;const qt=wt=>{wt.preventDefault(),wt.stopPropagation(),e.setWeapon&&e.setWeapon(lt)};gt.addEventListener("touchstart",qt,{passive:!1}),gt.addEventListener("mousedown",wt=>wt.stopPropagation()),gt.addEventListener("click",qt);const ot=U.querySelector(`.wpn[data-w="${lt-1}"]`)||J;ot?ot.after(gt):U.prepend(gt)});const v=document.getElementById("tfire");v&&["touchend","touchcancel"].forEach(st=>v.addEventListener(st,mi));const O=document.getElementById("touch");if(O&&!document.getElementById("tburst")){const st=document.createElement("button");st.id="tburst",st.type="button",st.hidden=!0,st.textContent=ws.altLabel,st.addEventListener("touchstart",lt=>{lt.preventDefault(),lt.stopPropagation(),Co(I.glitter)},{passive:!1}),O.appendChild(st)}const at=document.querySelector("#start p:last-of-type");at&&!/Glitter/.test(at.innerHTML)&&at.insertAdjacentHTML("beforeend",`<br>${I.glitter+1} Glitter Cannon: hold to spray, right-click burst · ${I.blower+1} Leaf Blower: hold to blow`)}let Wr=-1;typeof MutationObserver<"u"&&document.getElementById("hud")&&new MutationObserver(()=>Xr(b())).observe(document.getElementById("hud"),{subtree:!0,attributes:!0,attributeFilter:["class"]});function Xr(g){if(g===Wr)return;Wr=g;const U=document.getElementById("tburst"),J=document.getElementById("tlaunch");U&&(U.hidden=g!==I.glitter),k(g)&&J&&(J.hidden=!0)}function Oc(g,U){U==null&&(U=b()),vt+=g,S.material.uniforms.uTime.value=vt,Xr(U);const J=r();(J||!k(U))&&(Sn=!1);const v=typeof document<"u"&&document.getElementById("tfire");if(v&&v.classList.toggle("gb-hold",Sn&&k(U)),!J){if(Sn&&U===I.glitter){yt+=d*g;const O=yt|0;yt-=O,O&&(Bt(O,.13,5.5,9.5,.5),x.sprayed+=O),sa=Math.min(1,sa+g*6),Io-=g,Io<=0&&(Io=.075,f.sprinkle())}pi=Sn&&U===I.blower?Math.min(1,pi+g*4):Math.max(0,pi-g*5),Sn&&U===I.blower&&qc(g),Yc(g),Gc(g),Hc(g)}if(f.blower(!J&&Sn&&U===I.blower),Pc(g),Ja=Math.max(0,Ja-g),sa=Math.max(0,sa-g*3),ut>=ht&&(Eo(S.instanceMatrix,ht*16,(ut-ht+1)*16),ht=u,ut=-1),Qt>=rt&&(Eo(S.instanceColor,rt*3,(Qt-rt+1)*3),Eo(F,rt,Qt-rt+1),rt=u,Qt=-1),e.renderer){const O=e.renderer.getDrawingBufferSize(Vc).y;_t.uniforms.uScale.value=O*.5*n.projectionMatrix.elements[5]}else _t.uniforms.uScale.value=innerHeight*Math.min(2,devicePixelRatio||1)*.5*n.projectionMatrix.elements[5]}const Vc=new kt;function Eo(g,U,J){g.updateRanges.length>6?(g.clearUpdateRanges(),g.addUpdateRange(0,g.array.length)):g.addUpdateRange(U,J),g.needsUpdate=!0}function jc(g,U){const J=vt;if(U===I.glitter){const v=y.userData.glitter,O=Sn?1:0;g.rotation.x=-.05+sa*.12,g.rotation.z=0,g.position.y+=.03,g.position.z+=sa*.035,O&&(g.position.x+=(Math.random()-.5)*.004,g.position.y+=(Math.random()-.5)*.004),v.fill.rotation.y+=(.4+O*9)*.016,v.fill.position.y=.085+O*Math.abs(Math.sin(J*30))*.01,v.flash.material.opacity=Math.max(O*(.55+.45*Math.random()),Ja>.35?1:0);const at=.18+O*.08+(Ja>.35?.25:0);v.flash.scale.set(at,at,1),v.lip.rotation.z=J*2,v.lip.material.map.offset.x=J*.4%1}if(U===I.blower){const v=Q.userData.blower,O=pi;g.rotation.x=-.12,g.rotation.z=.04,g.position.y+=.02,O>0&&(g.position.x+=(Math.random()-.5)*.006*O,g.position.y+=(Math.random()-.5)*.006*O,g.rotation.z+=Math.sin(J*60)*.01*O),v.grille.rotation.z+=O*.9,v.noz.scale.x=1.5+Math.sin(J*45)*.06*O}}return{GLITTER:ws,BLOWER:Bi,slots:I,names:[ws.hudName,Bi.hudName],fireLabels:[ws.fireLabel,Bi.fireLabel],owns:k,down:Jc,up:mi,secondary:Co,update:Oc,pose:jc,sweepAt:Xt,pushables:$t,viewmodels:[y,Q],get holding(){return Sn},get kick(){return sa},glitter:{mesh:S,cap:u,get air(){return ft},get settled(){return H},get swept(){return pt},get head(){return ct},clear:ee,spray:g=>{Bt(g,.13,5.5,9.5,.5),x.sprayed+=g},positions:w,states:tt},elves:zt,stats:x,audio:f.stats,get humming(){return f.humming},phone:c}}const oa=(e=0,t=0,n=0)=>new q(e,t,n),Bo={sprint:1.8,fovKick:7,bobWalk:.035,bobRun:.07,volume:.3,chase:{base:8.6,ramp:.17,cap:13.5,farBonusFrom:20,farBonus:.1,farBonusMax:2,catchupAfter:12,catchupDist:22,catchupBehind:15,catchupEvery:4,forceCatchAt:120,packSpread:25,knockMin:1.2,tumbleMin:.9,recover:.6,immunity:4,friction:2.2},hold:{budget:.4,slow:2.2,knockMin:1,tumble:.9,back:7,dragDur:[3,5.2],dragPace:4}};function nu(e){const t={...Bo,...e.options||{},chase:{...Bo.chase,...(e.options||{}).chase||{}},hold:{...Bo.hold,...(e.options||{}).hold||{}}},n=e.camera,a=e.touchMove||{x:0,y:0},s=e.isMuted||(()=>!1),i=e.walkable||(()=>!0),o=e.floorY||(()=>0),r=e.animateElf||(()=>{}),A=e.isCarried||(()=>!1),l=e.inRealm||(()=>!1),h=e.isBusy||(()=>!1),c=matchMedia("(pointer: coarse)").matches;let u=typeof e.floorMaterial=="function"?e.floorMaterial:typeof e.floorMaterial=="string"?()=>e.floorMaterial:()=>"stone",d=!1,p=!1,m=!1,f=0,B=0,E=0,I=0,y=0,Q=0;const k=n.position.clone(),b={steps:0,byMat:{},suppressed:0,maxSpeed:0,runFrames:0};addEventListener("keydown",C=>{C.key==="Shift"&&(d=!0)}),addEventListener("keyup",C=>{C.key==="Shift"&&(d=!1)}),addEventListener("blur",()=>{d=!1});let S=null,F=null;if(c){S=document.createElement("button"),S.id="trun",S.type="button",S.textContent="RUN",S.style.cssText="position:fixed;left:18px;bottom:168px;z-index:30;width:52px;height:30px;border-radius:15px;border:1px solid rgba(255,190,90,.55);background:rgba(20,16,10,.55);color:#e9c98f;font:700 11px monospace;letter-spacing:1px;touch-action:manipulation";const C=W=>{W.preventDefault(),W.stopPropagation(),p=!p,w()};S.addEventListener("touchstart",C,{passive:!1}),S.addEventListener("click",C);const L=document.getElementById("tmove");L&&L.parentNode?L.parentNode.appendChild(S):document.body.appendChild(S)}const j=document.getElementById("hud");j&&(F=document.createElement("span"),F.className="cell",F.id="runcell",F.textContent=c?"stick out: run":"Shift to run",F.style.cssText="white-space:nowrap",j.appendChild(F));function w(){S&&(S.style.background=p?"rgba(216,144,44,.55)":"rgba(20,16,10,.55)",S.style.color=p?"#fff3d6":"#e9c98f"),F&&(F.style.color=m?"#ffcf6a":"")}const _=()=>Math.hypot(a.x||0,a.y||0)>=.95;function tt(C,L){const nt=Math.abs(C||0)+Math.abs(L||0)>.1&&(d||p||_())&&!h();return nt!==m&&(m=nt,w()),m?t.sprint:1}let G=null,et=null;function Y(){try{return G||(G=new(window.AudioContext||window.webkitAudioContext),et=G.createGain(),et.gain.value=t.volume,et.connect(G.destination)),G.state==="suspended"&&G.resume(),G}catch{return null}}let ct=null;const ft=C=>{if(ct)return ct;ct=C.createBuffer(1,Math.ceil(C.sampleRate*.3),C.sampleRate);const L=ct.getChannelData(0);for(let W=0;W<L.length;W++)L[W]=Math.random()*2-1;return ct},H={stone:["bandpass",950,.9,.07,.55,[[95,"sine",.06,.5]]],wood:["bandpass",520,1.8,.09,.4,[[150,"triangle",.08,.55],[310,"sine",.05,.15]]],marble:["highpass",2600,.7,.035,.45,[[2300,"sine",.045,.07],[110,"sine",.04,.3]]],concrete:["bandpass",1500,.6,.095,.6,[[80,"sine",.07,.45]]],glass:["highpass",3e3,.8,.03,.3,[[1850,"sine",.14,.08],[2760,"sine",.11,.05],[120,"sine",.04,.25]]],metal:["bandpass",1200,1.2,.06,.35,[[420,"square",.16,.05],[985,"triangle",.13,.06],[100,"sine",.05,.3]]],carpet:["lowpass",420,.7,.08,.5,[[70,"sine",.05,.25]]]};function pt(C,L){if(s()){b.suppressed++;return}const W=Y();if(!W)return;const nt=H[C]||H.stone,V=W.currentTime+.005,Nt=.92+Math.random()*.16,Gt=W.createStereoPanner?W.createStereoPanner():null;Q=1-Q,Gt&&(Gt.pan.value=Q?.12:-.12,Gt.connect(et));const Mt=Gt||et,jt=W.createBufferSource(),$t=W.createBiquadFilter(),Rt=W.createGain();jt.buffer=ft(W),jt.playbackRate.value=Nt,$t.type=nt[0],$t.frequency.value=nt[1]*Nt,$t.Q.value=nt[2],Rt.gain.setValueAtTime(1e-4,V),Rt.gain.exponentialRampToValueAtTime(nt[4]*L,V+.004),Rt.gain.exponentialRampToValueAtTime(1e-4,V+nt[3]),jt.connect($t).connect(Rt).connect(Mt),jt.start(V,Math.random()*.1),jt.stop(V+nt[3]+.02);for(const[zt,Jt,pe,je]of nt[5]){const We=W.createOscillator(),Pn=W.createGain();We.type=Jt,We.frequency.setValueAtTime(zt*Nt,V),We.frequency.exponentialRampToValueAtTime(zt*Nt*.82,V+pe),Pn.gain.setValueAtTime(1e-4,V),Pn.gain.exponentialRampToValueAtTime(je*L,V+.005),Pn.gain.exponentialRampToValueAtTime(1e-4,V+pe),We.connect(Pn).connect(Mt),We.start(V),We.stop(V+pe+.02)}b.steps++,b.byMat[C]=(b.byMat[C]||0)+1}function ht(C){if(Z+=Math.min(.05,Math.max(0,C||0)),!(C>0))return;const L=n.position,W=L.x-k.x,nt=L.z-k.z;k.copy(L);let V=Math.hypot(W,nt)/C;V>25&&(V=0),y+=(V-y)*Math.min(1,C*12),y>b.maxSpeed&&(b.maxSpeed=y);const Nt=A(),Gt=l();f+=((m&&!Nt&&!Gt?1:0)-f)*Math.min(1,C*6),m&&b.runFrames++;const Mt=t.fovKick*f*Math.min(1,y/8);if(Math.abs(Mt-B)>.01&&(n.fov+=Mt-B,B=Mt,n.updateProjectionMatrix()),Nt||y<.6){E=Math.round(E),I=E;return}const jt=1.6+Math.min(14,y)*.12;if(E+=C*jt,Math.floor(E)>Math.floor(I)){let $t="stone";try{$t=u(L.x,L.z,o())||"stone"}catch{}pt($t,(Gt?.35:1)*(m?1.3:1)*Math.min(1,.45+y/10))}I=E}const ut=()=>A()||y<.3?0:Math.abs(Math.sin(E*Math.PI))*(t.bobWalk+(t.bobRun-t.bobWalk)*f)*Math.min(1,y/5),rt=t.chase,Qt=[];let yt=0;const vt=oa(1e9,0,1e9),Et=()=>{const C=n.position;Math.hypot(C.x-vt.x,C.z-vt.z)<.6||(vt.copy(C),Qt.push(oa(C.x,0,C.z)),Qt.length>300&&(Qt.shift(),yt++))},Dt=C=>Qt[C-yt],Tt=()=>yt+Qt.length-1,M=oa(),D=C=>(M.set(C.x,o()+.6,C.z),M.distanceTo(n.position)>45?!1:(M.project(n),M.z<1&&Math.abs(M.x)<1.1&&Math.abs(M.y)<1.1)),T=(C,L)=>{const W=Math.hypot(L.x-C.x,L.z-C.z),nt=Math.ceil(W/.5);for(let V=1;V<nt;V++){const Nt=V/nt;if(!i(C.x+(L.x-C.x)*Nt,C.z+(L.z-C.z)*Nt))return!1}return!0},it=C=>{const L=Qt.map((W,nt)=>[Math.hypot(W.x-C.x,W.z-C.z),nt]).sort((W,nt)=>W[0]-nt[0]);for(let W=0;W<Math.min(10,L.length);W++)if(T(C,Qt[L[W][1]]))return L[W][1]+yt;return L.length?L[0][1]+yt:-1};let Z=0;const At=()=>Z;function dt(C,L){if(C._mvReg)return;C._mvReg=!0,C.spd=.95+Math.random()*.1,C.kv=oa(),C.farT=0;const W=e.tools&&e.tools();W&&W.pushables&&(C._unpush=W.pushables.add({name:"chase-elf",radius:.35,mass:1,getPosition:()=>oa(C.cp.x,o()+.35,C.cp.z),onPush:nt=>Bt(C,L,nt)}))}function Bt(C,L,W){!C.s.parent||!L.chase||C.immune&&At()<C.immune||C.rec||(C.kv.x+=W.x,C.kv.z+=W.z,C.kvy=Math.min(2.5,(C.kvy||0)+W.y),!C.tumble&&Math.hypot(C.kv.x,C.kv.z)>rt.knockMin&&(C.tumble={t:0,spin:(Math.random()<.5?-1:1)*(6+Math.random()*4)},C.ti=void 0,b.knocks=(b.knocks||0)+1))}function Xt(C,L,W,nt){dt(C,L),L._mv||(L._mv={curMin:1e9,prevMin:1e9,farT:0,cool:0},Qt.length=0,yt=0,vt.set(1e9,0,1e9)),C===L.elves[0]&&Et();const V=n.position,Nt=o();let Gt=Math.hypot(V.x-C.cp.x,V.z-C.cp.z);const Mt=L._mv;if(C===L.elves[0]&&(Mt.prevMin=Mt.curMin,Mt.curMin=1e9,Mt.farT=Mt.prevMin>rt.catchupDist?Mt.farT+nt:0,Mt.cool=Math.max(0,Mt.cool-nt)),C.tumble||C.rec){if(C.tumble){const Rt=C.tumble;Rt.t+=nt;const zt=C.cp.x+C.kv.x*nt,Jt=C.cp.z+C.kv.z*nt;i(zt,Jt)?(C.cp.x=zt,C.cp.z=Jt):C.kv.multiplyScalar(-.4);const pe=Math.exp(-rt.friction*nt);C.kv.multiplyScalar(pe),C.kvy=Math.max(0,(C.kvy||0)-6*nt),C.hop=Math.max(0,(C.hop||0)+C.kvy*nt-(C.kvy?0:2*nt)),r(C.s,"idle",W,n,nt),C.s.position.set(C.cp.x,Nt+.3+(C.hop||0),C.cp.z),C.s.rotation.z+=Rt.spin*nt,C.s.rotation.x=Math.sin(Rt.t*9)*.6,Rt.t>rt.tumbleMin&&Math.hypot(C.kv.x,C.kv.z)<.8&&(C.tumble=null,C.rec={t:0,z:C.s.rotation.z%(Math.PI*2),x:C.s.rotation.x})}else{C.rec.t+=nt;const Rt=Math.min(1,C.rec.t/rt.recover);r(C.s,"idle",W,n,nt),C.s.position.set(C.cp.x,Nt+.35,C.cp.z),C.s.rotation.z=C.rec.z*(1-Rt),C.s.rotation.x=C.rec.x*(1-Rt),Rt>=1&&(C.rec=null,C.s.rotation.x=C.s.rotation.z=0,C.immune=At()+rt.immunity,C.kv.set(0,0,0),b.recovered=(b.recovered||0)+1)}return C.cp.y=C.s.position.y,Gt+99}const jt=C.spd*Math.min(rt.cap,rt.base+rt.ramp*Math.max(0,W-1))+Math.min(rt.farBonusMax,Math.max(0,Gt-rt.farBonusFrom)*rt.farBonus);if(Gt<Mt.curMin&&(Mt.curMin=Gt),Mt.farT>rt.catchupAfter&&Mt.cool<=0&&Gt>Mt.prevMin+2&&!D(C.cp)){let Rt=Tt(),zt=0;for(;Rt>yt&&zt<rt.catchupBehind;)zt+=Dt(Rt).distanceTo(Dt(Rt-1)),Rt--;const Jt=Dt(Rt);Jt&&!D(Jt)&&(C.cp.x=Jt.x+(Math.random()-.5)*.4,C.cp.z=Jt.z+(Math.random()-.5)*.4,C.ti=Rt,Mt.cool=rt.catchupEvery,b.catchups=(b.catchups||0)+1,Gt=Math.hypot(V.x-C.cp.x,V.z-C.cp.z))}if(C.ti!==void 0&&C.ti>=yt&&!C.los&&Mt.prevMin<1e8&&(Tt()-C.ti)*.6>Math.min(Mt.prevMin,60)+rt.packSpread&&!D(C.cp)){const zt=Math.max(yt,Tt()-Math.round((Math.min(Mt.prevMin,40)+3+Math.random()*6)/.6)),Jt=Dt(zt);Jt&&!D(Jt)&&(C.cp.x=Jt.x+(Math.random()-.5)*.4,C.cp.z=Jt.z+(Math.random()-.5)*.4,C.ti=zt,b.regroups=(b.regroups||0)+1,Gt=Math.hypot(V.x-C.cp.x,V.z-C.cp.z))}C.losT=(C.losT||0)-nt,C.losT<=0&&(C.losT=.2+Math.random()*.1,C.los=Gt<1.6||T(C.cp,V));let $t=jt*nt;for(let Rt=0;Rt<8&&$t>1e-4;Rt++){let zt,Jt,pe=!C.los;if(pe){(C.ti===void 0||C.ti<yt)&&(C.ti=it(C.cp));const aa=C.ti>=0?Dt(C.ti):null;aa?(zt=aa.x,Jt=aa.z):(zt=V.x,Jt=V.z,pe=!1)}else{const aa=Gt>3?.6:0,ui=C.a||0;zt=V.x+Math.cos(ui)*aa,Jt=V.z+Math.sin(ui)*aa,C.ti=void 0}const je=Math.hypot(zt-C.cp.x,Jt-C.cp.z);if(pe&&je<=$t){if(C.cp.x=zt,C.cp.z=Jt,$t-=je,C.ti<Tt()){C.ti++;continue}break}const We=je>1e-6?Math.min(1,$t/je):0,Pn=C.cp.x+(zt-C.cp.x)*We,Ha=C.cp.z+(Jt-C.cp.z)*We;pe||i(Pn,Ha)||Gt<1.6?(C.cp.x=Pn,C.cp.z=Ha):(C.los=!1,C.losT=.3);break}return C.cp.y=Nt+.35+Math.abs(Math.sin(W*8+(C.ph||0)))*.2,C.s.position.copy(C.cp),C.s.scale.setScalar(1),r(C.s,"walk",W,n,nt),Math.hypot(V.x-C.cp.x,V.z-C.cp.z)}function ee(C){!C||!C.elves||(C.elves.forEach(L=>{L._unpush&&(L._unpush(),L._unpush=null),L._mvReg=!1,L.tumble=L.rec=null,L.s&&(L.s.rotation.x=L.s.rotation.z=0)}),C._mv=null)}const x=t.hold;function N(C,L){if(!C||!C.elves||C._hold)return;const W=C.elves.length,nt=C._hold={kind:L,active:!1,used:0,budget:Math.max(2,Math.round(W*x.budget)),off:0,unpush:[]},V=e.tools&&e.tools();for(const Nt of C.elves)Nt.hk=null,V&&V.pushables&&nt.unpush.push(V.pushables.add({name:"holding-elf",radius:.35,mass:1,getPosition:()=>Nt.s.getWorldPosition(oa()),onPush:Gt=>P(C,Nt,Gt)}))}function P(C,L,W){const nt=C._hold;if(!nt||!nt.active||L.hk||nt.used>=nt.budget||(L.hacc=(L.hacc||oa()).add(oa(W.x,0,W.z)),L.hacc.length()<x.knockMin))return;nt.used++,b.holdKnocks=(b.holdKnocks||0)+1;const V=L.hacc.clone().multiplyScalar(1.6);L.hacc.set(0,0,0),L.hk={st:"tumble",t:0,p:L.s.position.clone(),v:V,y:Math.max(.35,L.s.position.y),vy:1.2,spin:(Math.random()<.5?-1:1)*(7+Math.random()*4)}}function $(C,L,W){const nt=C&&C._hold;if(!nt)return 1;nt.active=!!W;const V=C.elves.length||1;let Nt=0;for(const Gt of C.elves)Gt.hk&&Nt++;return nt.off=Nt,Math.max(0,Math.min(1,1-x.slow*Nt/V))}function z(C,L,W,nt){const V=L.hk;if(!V)return!1;const Nt=o(),Gt=L.s.position.clone();if(V.st==="tumble"){V.t+=nt;const Rt=V.p.x+V.v.x*nt,zt=V.p.z+V.v.z*nt;return i(Rt,zt)?(V.p.x=Rt,V.p.z=zt):V.v.multiplyScalar(-.4),V.v.multiplyScalar(Math.exp(-2.4*nt)),V.vy-=6*nt,V.y=Math.max(Nt+.3,V.y+V.vy*nt),L.s.position.set(V.p.x,V.y,V.p.z),L.s.rotation.z+=V.spin*nt,L.s.rotation.x=Math.sin(V.t*9)*.6,r(L.s,"idle",W,n,nt),V.t>x.tumble&&V.v.length()<.9&&(V.st="back",V.t=0,V.rz=L.s.rotation.z%(Math.PI*2),V.rx=L.s.rotation.x),!0}V.t+=nt;const Mt=Math.min(1,V.t/.35);L.s.rotation.z=V.rz*(1-Mt),L.s.rotation.x=V.rx*(1-Mt);const jt=Math.hypot(Gt.x-V.p.x,Gt.z-V.p.z),$t=x.back*nt*(Mt>=1?1:.3);return jt<=$t+.05?(L.hk=null,L.s.rotation.x=L.s.rotation.z=0,b.holdRegroups=(b.holdRegroups||0)+1,!1):(V.p.x+=(Gt.x-V.p.x)/jt*$t,V.p.z+=(Gt.z-V.p.z)/jt*$t,V.y+=(Nt+.35+Math.abs(Math.sin(W*9))*.15-V.y)*Math.min(1,nt*8),L.s.position.set(V.p.x,V.y,V.p.z),r(L.s,"walk",W,n,nt),!0)}function mt(C){const L=C&&C._hold;if(L){L.unpush.forEach(W=>{try{W&&W()}catch{}});for(const W of C.elves)W.hk=null,W.s&&(W.s.rotation.x=W.s.rotation.z=0);C._hold=null}}return{speedMul:tt,update:ht,bob:ut,chase:{step:Xt,end:ee,forceCatch:C=>C>rt.forceCatchAt,speedAt:C=>Math.min(rt.cap,rt.base+rt.ramp*Math.max(0,C-1)),get trailLength(){return Qt.length},opts:rt},hold:{begin:N,factor:$,apply:z,end:mt,dragDur:C=>Math.min(x.dragDur[1],Math.max(x.dragDur[0],C/x.dragPace)),info:C=>C&&C._hold?{used:C._hold.used,budget:C._hold.budget,off:C._hold.off,kind:C._hold.kind}:null,opts:x},step:pt,get clock(){return Z},setFloorMaterial:C=>{u=typeof C=="function"?C:()=>C},floorMaterial:(C,L,W)=>u(C,L,W),get running(){return m},get speed(){return y},get fovAdded(){return B},get toggle(){return p},setToggle:C=>{p=!!C,w()},stats:b,options:t,button:S}}const Oa=new fn(0,0,0,"YXZ"),Va=new q,au={type:"change"},su={type:"lock"},iu={type:"unlock"},oA=Math.PI/2;class ou extends $c{constructor(t,n=null){super(t,n),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=ru.bind(this),this._onPointerlockChange=Au.bind(this),this._onPointerlockError=lu.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(t){return t.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(t){if(this.enabled===!1)return;const n=this.object;Va.setFromMatrixColumn(n.matrix,0),Va.crossVectors(n.up,Va),n.position.addScaledVector(Va,t)}moveRight(t){if(this.enabled===!1)return;const n=this.object;Va.setFromMatrixColumn(n.matrix,0),n.position.addScaledVector(Va,t)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function ru(e){if(this.enabled===!1||this.isLocked===!1)return;const t=e.movementX||e.mozMovementX||e.webkitMovementX||0,n=e.movementY||e.mozMovementY||e.webkitMovementY||0,a=this.object;Oa.setFromQuaternion(a.quaternion),Oa.y-=t*.002*this.pointerSpeed,Oa.x-=n*.002*this.pointerSpeed,Oa.x=Math.max(oA-this.maxPolarAngle,Math.min(oA-this.minPolarAngle,Oa.x)),a.quaternion.setFromEuler(Oa),this.dispatchEvent(au)}function Au(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(su),this.isLocked=!0):(this.dispatchEvent(iu),this.isLocked=!1)}function lu(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const cu={rooms:[],hallways:[],start:{x:.7633,z:-3.899,yaw:.25},hall:{height:2.4,doorHeight:2.2},signs:[],groupSigns:[]},hu=[{id:"painting-portrait-in-gold",title:"Dorian Nakamoto",caption:"12 × 15 in (W × H)",status:"available",url:"https://tjm.art/products/painting-portrait-in-gold/",img:"art/painting-portrait-in-gold.webp",hi:"https://img.tjm.art/gallery-wall/edcc7405e05f4353e269958204c32ca9af022e77e445f06fb978c3a877bbee34-960.webp",kind:"painting",w:.3048,h:.381,fw:.3348,fh:.411,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"painting-clouds-over-water",title:"El Salvador",caption:"8 × 16 in (W × H)",status:"available",url:"https://tjm.art/products/painting-clouds-over-water/",img:"art/painting-clouds-over-water.webp",hi:"https://img.tjm.art/wall-paintings/painting-clouds-over-water-dda20437ce-320.webp",kind:"painting",w:.2032,h:.4064,fw:.2332,fh:.4364,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"honeybadger-and-cub-with-genesis-block",title:"Honeybadger and Cub with Genesis Block",caption:"100 × 70 cm (W × H)",status:"available",url:"https://tjm.art/products/honeybadger-and-cub-with-genesis-block/",img:"art/honeybadger-and-cub-with-genesis-block.webp",hi:"https://img.tjm.art/gallery-wall/5661ac7acd18cb2d7e1634c9595fedb2ef05b6a9a0c454b5e5613b77c17a2c7b-960.webp",kind:"painting",w:.7,h:1,fw:.73,fh:1.03,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1,orientNote:"caption says 100 × 70 cm (W × H) but the image is portrait (0.700): hung 70 W × 100 H, flagged for TJ"},{id:"hope-the-vermillion-aurora",title:"Hope, the Vermillion Aurora",caption:"44 × 22 in (W × H)",status:"available",url:"https://tjm.art/products/hope-the-vermillion-aurora/",img:"art/hope-the-vermillion-aurora.webp",hi:"https://img.tjm.art/gallery-wall/62fadea5e859a0d9adca611a1bbb9d8b714edf350fa0885e2920296867d136fb-960.webp",kind:"painting",w:1.1176,h:.5588,fw:1.1476,fh:.5888,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"archived-painting-15",title:"Symbiosis #1",caption:"44.5 × 24 in (W × H)",status:"available",url:"https://tjm.art/products/archived-painting-15/",img:"art/archived-painting-15.webp",hi:"https://img.tjm.art/gallery-wall/7112103318fcb79bfaae9e8fb67b3a2badc1b9bc3313084870aaa9df993f6c13-960.webp",kind:"painting",w:1.1303,h:.6096,fw:1.1603,fh:.6396,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"painting-red-horizon",title:"Sunset at Kihei on Maui",caption:"23 × 44 in (W × H)",status:"available",url:"https://tjm.art/products/painting-red-horizon/",img:"art/painting-red-horizon.webp",hi:"https://img.tjm.art/gallery-wall/f6e3bea6cf0aae99cac1bf06cccd45149b5be70beb16be754e64984b0e176efc-960.webp",kind:"painting",w:.5842,h:1.1176,fw:.6142,fh:1.1476,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"older-work-provibes-sandwiches-original-1",title:"TJ Devo and Sarah Sandwich (L)",caption:"17.5 × 12.25 in (W × H)",status:"available",url:"https://tjm.art/products/older-work-provibes-sandwiches-original-1/",img:"art/older-work-provibes-sandwiches-original-1.webp",hi:"https://img.tjm.art/wall-paintings/older-work-provibes-sandwiches-original-1-d6ae18ddad-960.webp",kind:"painting",w:.4445,h:.3111,fw:.4745,fh:.3411,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"archived-painting-248",title:"Sunset from Atami, El Salvador #2",caption:"14 × 23.75 in (W × H)",status:"available",url:"https://tjm.art/products/archived-painting-248/",img:"art/archived-painting-248.webp",hi:"https://img.tjm.art/gallery-wall/e8a641e0f5ae6b44f06e638fbea763860320d36f238101d0ccf79ae498af36bd-960.webp",kind:"painting",w:.3556,h:.6032,fw:.3856,fh:.6332,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"archived-painting-436",title:"Sunrise at Bass Coast 2023 #2",caption:"13.75 × 24.75 in (W × H)",status:"available",url:"https://tjm.art/products/archived-painting-436/",img:"art/archived-painting-436.webp",hi:"https://img.tjm.art/gallery-wall/37fb5f76e383a5973699d952b83ee162c815fb2c144a105a289451e22af48a62-960.webp",kind:"painting",w:.3493,h:.6286,fw:.3792,fh:.6586,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"older-work-portraits-319-329-original-1",title:"TJ Bernard Parah 329",caption:"9 × 10.75 in (W × H)",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-1/",img:"art/older-work-portraits-319-329-original-1.webp",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-1-b878be8767-960.webp",kind:"painting",w:.2286,h:.2731,fw:.2586,fh:.3031,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1},{id:"older-work-ammous-livera-original-2",title:"TJ Stephan Livera 356",caption:"11 × 12 in (W × H)",status:"available",url:"https://tjm.art/products/older-work-ammous-livera-original-2/",img:"art/older-work-ammous-livera-original-2.webp",hi:"https://img.tjm.art/wall-paintings/older-work-ammous-livera-original-2-13fb12c87c-960.webp",kind:"painting",w:.2794,h:.3048,fw:.3094,fh:.3348,x:0,y:1.5,z:0,ix:0,iz:1,room:"central",s:1,smax:1}],uu=[],on={layout:cu,paintings:hu,plaques:uu},xs=(e,t,n)=>new q(e,t,n);function gu(){try{const e=document.createElement("div");e.id="realmtitle",e.textContent="HYPERSPACE REALM",document.body.appendChild(e),setTimeout(()=>e.remove(),4200),window.__realmTitleShown=(window.__realmTitleShown||0)+1}catch{}}const cl=e=>Math.min(1,Math.max(0,e)),ra=e=>(e=cl(e),e*e*(3-2*e)),ln={erupt:3.5,engulf:5.2},rA=["THEY ARE SO HAPPY TO SEE YOU","YOU HAVE BEEN HERE BEFORE","LOOK AT WHAT THEY ARE SHOWING YOU","IT IS ALL LANGUAGE","THE PAINTINGS ARE WINDOWS","DO NOT TRY TO REMEMBER THIS"],fu=(e="")=>new me({uniforms:{uTime:{value:0}},side:tl,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform float uTime; varying vec2 vUv;
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
      gl_FragColor = vec4(floor(c*8.)/8., 1.); }`});function du({scene:e,camera:t,renderer:n,makeElf:a,animateElf:s,elfUniforms:i,say:o,canvas:r,floorY:A}){const l=document.createElement("div");Object.assign(l.style,{position:"fixed",inset:"0",pointerEvents:"none",opacity:"0",background:"#fff",zIndex:5}),document.body.appendChild(l);let h=null;const c=(()=>{const G=document.createElement("canvas");G.width=G.height=128;const et=G.getContext("2d");et.strokeStyle="#ffb030",et.lineCap="round";for(let ft=0;ft<14;ft++){let H=64,pt=64,ht=ft/14*6.283;et.lineWidth=5,et.beginPath(),et.moveTo(H,pt);for(let ut=0;ut<6;ut++)ht+=(Math.random()-.5)*.9,H+=Math.cos(ht)*11,pt+=Math.sin(ht)*11,et.lineTo(H,pt),et.lineWidth=Math.max(1,5-ut);et.stroke()}const Y=et.createRadialGradient(64,64,2,64,64,30);Y.addColorStop(0,"rgba(255,240,160,1)"),Y.addColorStop(1,"rgba(255,90,0,0)"),et.fillStyle=Y,et.fillRect(0,0,128,128);const ct=new Be(G);return ct.magFilter=pa,ct})(),u=new Ae(.25,.18,.22),d=new Fn({color:7034424}),p=new Vs;p.fog=new $A(0,.02);const m=new js(85,t.aspect,.05,400),f=fu(),B=new X(new de(9,9,300,24,1,!0).rotateX(Math.PI/2),f);p.add(B);const E=new me({uniforms:{uTime:{value:0}},vertexShader:"uniform float uTime; varying vec2 vP; void main(){ vec3 p = position; vP = p.xy; p.z += sin(length(p.xy)*0.6 - uTime*2.)*0.5; gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.); }",fragmentShader:`uniform float uTime; varying vec2 vP;
      vec3 hsv(float h,float s,float v){ vec3 k=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.); return v*mix(vec3(1.),k,s); }
      void main(){ vec2 g = vP*0.6; vec2 r = vec2(g.x + g.y*0.577, g.y*1.155); vec2 f = fract(r); float tri = step(f.x, f.y);
        float b = 1. - smoothstep(0.0, 0.08, min(min(f.x, f.y), abs(f.x - f.y)));
        float br = 0.5 + 0.5*sin(length(vP)*0.6 - uTime*2.);
        vec3 c = hsv(fract(tri*0.5 + length(floor(r))*0.05 + uTime*0.15), .8, 0.25 + 0.5*br) + b*vec3(1.,.8,.4);
        gl_FragColor = vec4(c, 1.); }`}),I=new X(new Vt(60,300,60,150).rotateX(-Math.PI/2),E);I.position.y=-6,p.add(I);const y=new Ut;p.add(y);const Q=[new va(6,0),new th(4.2,0),new ZA(2.8,0),new eh(1.6,0)].map((G,et)=>{const Y=new X(G,new xt({color:16777215,wireframe:et%2===0,transparent:!0,opacity:et%2?.55:1}));return y.add(Y),Y}),k=[];for(let G=0;G<16;G++){const et=a(G/16);et.scale.setScalar(3+G%3),p.add(et),k.push({e:et,a:G/16*6.283,r:4+G%4*1.4,y:G%5-2,sp:.4+G%3*.25})}const b=new Vs,S=new Cr(-1,1,1,-1,0,1);b.add(new X(new Vt(2,2),new xt({color:0,transparent:!0,opacity:.18,depthTest:!1,depthWrite:!1})));let F={x:0,y:0};addEventListener("mousemove",G=>{!h||h.t<ln.engulf||(F.x=Math.max(-.6,Math.min(.6,F.x-G.movementX*.002)),F.y=Math.max(-.4,Math.min(.4,F.y-G.movementY*.002)))});function j(G={}){const et=a(.77);et.scale.setScalar(11);const Y=xs(0,0,-1).applyQuaternion(t.quaternion).setY(0).normalize(),ct=t.position.clone().addScaledVector(Y,3.2);et.position.set(ct.x,-5,ct.z),e.add(et);const ft=new X(new Vt(1,1).rotateX(-Math.PI/2),new xt({map:c,transparent:!0,blending:bn,depthWrite:!1}));ft.position.set(t.position.x,A(t.position.x,t.position.z)+.02,t.position.z);const H=new Nn(16740384,0,12);H.position.copy(ft.position).y+=.5,e.add(H);const pt=[];for(let ht=0;ht<26;ht++){const ut=new X(u,d);ut.position.copy(ft.position),e.add(ut),pt.push({m:ut,v:xs((Math.random()-.5)*6,4+Math.random()*6,(Math.random()-.5)*6),w:xs(Math.random()*9,Math.random()*9,0),t0:Math.random()*1.5})}h={t:G.direct?ln.engulf-.6:0,direct:!!G.direct,wl:G.worldLen||18,savedPos:(G.savedPos||t.position).clone(),savedQuat:(G.savedQuat||t.quaternion).clone(),giant:et,crack:ft,fissureLight:H,chunks:pt,base:ct,frag:-1,done:!1},G.direct?(et.visible=!1,ft.visible=!1,pt.forEach(ht=>ht.m.visible=!1)):o("THE FLOOR IS... OPENING",3)}function w(){e.remove(h.giant,h.crack,h.fissureLight,...h.chunks.map(G=>G.m))}function _(G,et){if(!h)return!1;h.t+=G;const Y=h.t;f.uniforms.uTime.value=E.uniforms.uTime.value=et/1e3;const ct=ln.engulf+h.wl,ft=ct+1.6;if(Y<ln.engulf&&h.direct)l.style.background="#000",l.style.opacity=String(ra((Y-ln.engulf+.6)/.6));else if(Y<ln.engulf){const H=ra(Y/2.2),pt=(Y<ln.erupt?.12:.05)*(1-cl((Y-3)/2));h.crack.scale.setScalar(.5+H*5),h.fissureLight.intensity=30*H,h.chunks.forEach(yt=>{const vt=Y-yt.t0;vt<0||(yt.m.position.set(h.crack.position.x+yt.v.x*vt*.4,h.crack.position.y+yt.v.y*vt-4.9*vt*vt,h.crack.position.z+yt.v.z*vt*.4),yt.m.rotation.set(yt.w.x*vt,yt.w.y*vt,0),yt.m.position.y<0&&(yt.m.position.y=0))});const ht=ra((Y-.6)/2.6);h.giant.position.y=-5+ht*(h.savedPos.y+2+5),s(h.giant,"idle",Y,t,G);const ut=h.giant.localToWorld(xs(0,-.19,.2)),rt=ra((Y-ln.erupt)/(ln.engulf-ln.erupt));t.position.copy(h.savedPos).lerp(ut,rt*.97).add(xs((Math.random()-.5)*pt,(Math.random()-.5)*pt,(Math.random()-.5)*pt));const Qt=t.clone();Qt.lookAt(ut),t.quaternion.copy(h.savedQuat).slerp(Qt.quaternion,ra((Y-1.5)/2)),l.style.background="#000",l.style.opacity=String(ra((Y-ln.engulf+.6)/.6)),Y>1.5&&Y<1.6&&o("SOMETHING ENORMOUS IS VERY HAPPY TO SEE YOU",3),r.style.filter=`saturate(${1+H}) contrast(${1+H*.3})`}else if(Y<ct){h.inWorld||(h.inWorld=!0,w(),F={x:0,y:0},gu());const H=Y-ln.engulf;l.style.background=H<1?"#000":"#fff",l.style.opacity=String(H<1?1-H:ra((H-(h.wl-1.6))/1.6)),m.position.set(Math.sin(H*.4)*1.5,Math.cos(H*.3)*1,-H*2.2),m.rotation.set(F.y+Math.sin(H*.5)*.1,F.x,Math.sin(H*.23)*.6,"YXZ"),B.position.z=m.position.z,I.position.z=m.position.z,y.position.set(0,0,m.position.z-22),Q.forEach((ut,rt)=>{ut.rotation.set(H*(.3+rt*.2)*(rt%2?-1:1),H*(.5+rt*.1),0),ut.material.color.setHSL((H*.1+rt*.25)%1,1,.6),ut.scale.setScalar(1+.15*Math.sin(H*2+rt))}),k.forEach((ut,rt)=>{const Qt=ut.a+H*ut.sp;ut.e.position.set(Math.cos(Qt)*ut.r,ut.y+Math.abs(Math.sin(H*3+rt))*1.2,m.position.z-8+Math.sin(Qt)*ut.r),s(ut.e,"idle",H+rt,m,G)});const pt=Math.floor(H/3);pt!==h.frag&&pt<6&&(h.frag=pt,o(rA[pt%rA.length],2.8));const ht=et/1e3;r.style.filter=`saturate(${2.2+Math.sin(ht*2)}) hue-rotate(${ht*60%360}deg) drop-shadow(${4+3*Math.sin(ht*3)}px 0 rgba(255,0,80,.6)) drop-shadow(${-4-3*Math.sin(ht*3)}px 0 rgba(0,255,240,.6))`,r.style.transform=`scale(${1.04+.03*Math.sin(ht*1.7)}) skew(${3*Math.sin(ht*.9)}deg, ${2*Math.sin(ht*1.3)}deg) rotate(${2*Math.sin(ht*.7)}deg)`,i.uPulse.value=1}else if(Y<ft){if(!h.back){h.back=!0,t.position.copy(h.savedPos),t.quaternion.copy(h.savedQuat);const H=new fn().setFromQuaternion(t.quaternion,"YXZ");H.x=0,H.z=0,t.quaternion.setFromEuler(H),r.style.filter="",r.style.transform="",o("WELCOME BACK.",4)}l.style.background="#fff",l.style.opacity=String(1-ra((Y-ct)/(ft-ct)))}else{l.style.opacity="0",h.done=!0;const H=h;return h=null,{finished:!0,savedPos:H.savedPos}}return!0}function tt(){return h&&h.inWorld&&!h.back?(n.render(b,S),n.clearDepth(),n.render(p,m),!0):!1}return{start:j,update:_,render:tt,get state(){return h}}}let hl=typeof window<"u"&&window.__elfLow===!0;function pu(e){hl=e==="low"||e===!0,Ss=null}const os={uTime:{value:0},uPulse:{value:0}};function Xe(e,t=1){e=e.index?e.toNonIndexed():e,e.computeVertexNormals();const n=e.attributes.position.array,a=n.length/9,s=new Float32Array(n.length),i=new Float32Array(n.length/3),o=new Float32Array(n.length/3);for(let r=0;r<a;r++){const A=(n[r*9]+n[r*9+3]+n[r*9+6])/3,l=(n[r*9+1]+n[r*9+4]+n[r*9+7])/3,h=(n[r*9+2]+n[r*9+5]+n[r*9+8])/3,c=Math.abs(Math.sin(r*12.9898+A*78.233)*43758.5453)%1;for(let u=0;u<3;u++)s.set([A,l,h],r*9+u*3),i[r*3+u]=c,o[r*3+u]=t}return e.setAttribute("aCenter",new Ra(s,3)),e.setAttribute("aRand",new Ra(i,1)),e.setAttribute("aOpen",new Ra(o,1)),e}function yo(e){const t=new Cs,n=["position","normal","aCenter","aRand","aOpen"],a={};return n.forEach(s=>a[s]=[]),e.forEach(s=>n.forEach(i=>a[i].push(...s.attributes[i].array))),n.forEach(s=>t.setAttribute(s,new gs(a[s],e[0].attributes[s].itemSize))),t}const Ns=new me({uniforms:os,vertexShader:`attribute vec3 aCenter; attribute float aRand; attribute float aOpen; uniform float uTime;
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
    }`}),mu=new me({uniforms:os,fragmentShader:Ns.fragmentShader,vertexShader:Ns.vertexShader.replace("vN = normalize",`float fl = clamp((abs(position.x) - 0.06) / 0.25, 0., 1.); fl = fl * fl; float sg = sign(position.x);
      float w = uTime * 2.4 + ph + sg * 1.1;
      pos += vec3(sg * 0.035 * sin(w), -0.03 * (0.5 + 0.5 * sin(w * 1.3 + 0.7)) - 0.015, 0.06 * sin(w * 0.8 + sg)) * fl;
      vN = normalize`)}),ul=new xt({color:16777215}),gl=new xt({color:16777215,wireframe:!1}),fl=new xt({color:16777215,wireframe:!0,transparent:!0,opacity:.35,depthWrite:!1}),AA=(e,t,n,a,s)=>{const i=new nh(e),o=new ah(i,a,1,s,!1),r=o.attributes.position;for(let A=0;A<=a;A++){const l=A/a,h=i.getPointAt(l),c=t+(n-t)*l;for(let u=0;u<=s;u++){const d=A*(s+1)+u;r.setXYZ(d,h.x+(r.getX(d)-h.x)*c,h.y+(r.getY(d)-h.y)*c,h.z+(r.getZ(d)-h.z)*c)}}return o.computeVertexNormals(),o};let Ss=null;function Iu(){if(Ss)return Ss;const e=hl,t=e?1:2,n=a=>e?Math.max(5,Math.round(a*.55)):a;return Ss={shell:Xe(new va(.17,t)),core:new va(.1,e?1:2),cap:(()=>{const a=[Xe(new ve(.165,n(24),n(10),0,6.283,0,1.5708).scale(1,.8,1).translate(0,.05,0),.2),Xe(new _n(.162,.016,n(8),n(32)).rotateX(Math.PI/2).scale(1,1,1).translate(0,.055,0),.1)];return[-1,1].forEach(s=>{a.push(Xe(AA([new q(s*.05,.15,0),new q(s*.13,.26,-.01),new q(s*.24,.24,.01),new q(s*.3,.12,.03),new q(s*.31,.035,.04)],.062,.008,n(28),n(12)),.25)),a.push(Xe(new ve(.03,n(14),n(10)).translate(s*.31,0,.04),.3)),a.push(Xe(new _n(.03,.005,6,n(16)).rotateX(Math.PI/2).translate(s*.31,-.012,.04),.1)),a.push(Xe(new ve(.008,6,4).translate(s*.31,-.03,.04),0))}),yo(a)})(),leg:yo([Xe(new de(.024,.019,.11,n(12),2).translate(0,-.055,0),0),Xe(new ve(.02,n(10),n(8)).translate(0,-.11,0),0),Xe(AA([new q(0,-.118,-.02),new q(0,-.122,.03),new q(0,-.11,.075),new q(0,-.085,.085)],.03,.008,n(12),n(10)),.4)]),arm:yo([Xe(new de(.025,.02,.12,n(12),2).translate(0,-.06,0),0),Xe(new ve(.022,n(10),n(8)).translate(0,-.005,0),0),Xe(new ve(.034,n(14),n(10)).scale(1,1.15,.8).translate(0,-.135,0),.5),Xe(new ve(.013,n(8),n(6)).scale(1,1.6,1).translate(.026,-.12,.012),.2)]),orb:new va(.06,e?0:1),halo:new va(.13,0)},Ss}function ni(e=Math.random()){const t=Iu(),n=new Ut,a=new Ut;n.add(a);const s=new X(t.shell,Ns);a.add(s);const i=new X(t.core,ul);a.add(i);const o=new X(t.halo,fl);i.add(o);const r=new X(t.cap,mu);a.add(r);const A=m=>{const f=new X(t.arm,Ns);return f.position.set(m,0,.04),a.add(f),f},l=A(-.17),h=A(.17),c=m=>{const f=new X(t.leg,Ns);return f.position.set(m,-.13,.02),a.add(f),f},u=c(-.07),d=c(.07),p=new X(t.orb,gl);return p.position.set(0,.42,.1),a.add(p),n.userData.rig={body:a,shell:s,core:i,cap:r,armL:l,armR:h,legL:u,legR:d,orb:p,seed:e,glitch:0},n}const Cu=(e,t)=>Math.floor(e*t)/t;function Ln(e,t,n,a,s){const i=e.userData.rig,o=i.seed*10,r=Cu(n+o,8);let A=0,l=1,h=.3,c=.3,u=0,d=0,p=0,m=0,f=.12;if(t==="walk"||t==="retreat"){const I=Math.abs(Math.sin((n+o)*9));A=I*.16,l=I<.15?.75:1+I*.08;{const y=Math.sin((n+o)*9);p=y*.8,m=-y*.8}u=(n+o)*(t==="retreat"?-9:9),h=-1+Math.sin(n*18)*.6,c=-1-Math.sin(n*18)*.6}else if(t==="scrub")c=-1.6+Math.sin((n+o)*22)*.7,h=-1.6-Math.sin((n+o)*22)*.7,A=Math.abs(Math.sin((n+o)*11))*.04,u=Math.sin(n*5)*.3,p=Math.sin((n+o)*11)*.25,m=-p,f=.3;else if(t==="carry"){h=c=-2.9+Math.sin((n+o)*8)*.2;const I=Math.abs(Math.sin((n+o)*12));A=I*.05,l=1-I*.1,p=Math.sin((n+o)*12)*.5,m=-p}else t==="peek"?(h=-2.6,c=-.4+Math.sin((n+o)*3.1)*.35,d=1,p=Math.sin((n+o)*2.7)*.2,m=Math.sin((n+o)*2.7+2)*.2,f=.18+.08*Math.sin((n+o)*3.7),u=Math.sin(r*4)*.2):(A=Math.abs(Math.sin((n+o)*6))*.08,h=-2.4+Math.sin(r*3)*.4,c=.2+Math.sin((n+o)*3.3)*.5,d=1,p=Math.sin((n+o)*6)*.35,m=-p,f=.15+.1*Math.sin((n+o)*4.1));i.body.position.y=-.12+A,i.body.scale.set(1/Math.sqrt(l),l,1/Math.sqrt(l)),i.armL.rotation.set(h,0,.5+Math.sin((n+o)*4.3)*.12),i.armR.rotation.set(c,0,-.5-Math.sin((n+o)*3.9)*.12),i.legL.rotation.set(p,0,-f),i.legR.rotation.set(m,0,f),i.shell.rotation.set(u*.25,Math.sin(r*1.1+o)*.4,Math.sin(r*.7)*.3),i.core.rotation.set(n*2.3,n*3.1,0),i.core.scale.setScalar(.8+.3*Math.sin(n*4+o)),i.cap.rotation.z=Math.sin((n+o)*1.7)*.18,i.cap.rotation.x=-A*1.2,i.cap.position.y=.06+Math.abs(Math.sin(n*9+o))*.03,i.orb.visible=d>0,i.orb.rotation.set(n*3,n*2,0),i.orb.scale.set(1+.4*Math.sin(n*5),1+.4*Math.sin(n*5+2),1+.4*Math.sin(n*5+4));const B=e.getWorldPosition(new q);e.lookAt(a.position.x,B.y,a.position.z),i.glitch>0?i.glitch-=s:Math.random()<s*.6&&(i.glitch=.12);const E=i.glitch>0;i.body.position.x=E?(Math.random()-.5)*.06:0,E&&(i.body.scale.x*=1.5)}function lA(e){const t=e/2e3%1;gl.color.setHSL(t,1,.65),ul.color.setHSL((t+.5)%1,1,.7),fl.color.setHSL((t+.25)%1,1,.75)}pu(typeof matchMedia<"u"&&matchMedia("(pointer: coarse)").matches?"low":"hd");const cA="https://splats.tjm.art/hit",xr=/(^|\.)tjm\.art$/.test(location.hostname);let Ls="",Ws=new Set,rs=new Set,qi=0;try{Ls=sessionStorage.getItem("tjmSplatSid")||"",Ws=new Set(JSON.parse(sessionStorage.getItem("tjmSplatSent")||"[]"))}catch{}if(!/^[A-Za-z0-9_-]{16,40}$/.test(Ls)){const e=new Uint8Array(16);crypto.getRandomValues(e),Ls=[...e].map(t=>(t%36).toString(36)).join("")+"xx";try{sessionStorage.setItem("tjmSplatSid",Ls)}catch{}}function to(e){if(clearTimeout(qi),qi=0,!rs.size||!xr)return;const t=[...rs];rs.clear(),t.forEach(a=>Ws.add(a));try{sessionStorage.setItem("tjmSplatSent",JSON.stringify([...Ws]))}catch{}const n=JSON.stringify({sid:Ls,hits:t,test:window.__splatTest?1:0});try{if(e&&navigator.sendBeacon&&navigator.sendBeacon(cA,new Blob([n],{type:"text/plain"})))return;fetch(cA,{method:"POST",body:n,headers:{"content-type":"text/plain"},keepalive:!0,mode:"cors",credentials:"omit"}).catch(()=>{})}catch{}}function Eu(e){!xr||!e||Ws.has(e)||rs.has(e)||(rs.add(e),qi||(qi=setTimeout(()=>to(!1),15e3)))}addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&to(!0)});addEventListener("pagehide",()=>to(!0));const Bu={flush:()=>to(!1),get queued(){return[...rs]},get sent(){return[...Ws]},get on(){return xr}},yu=(e,t)=>{const n=document.createElement("canvas");return n.width=e,n.height=t,[n,n.getContext("2d")]};let hA=7;const wa=()=>(hA=hA*16807%2147483647)/2147483647;function wu(e,t=1,n=1){const a=new Be(e);return a.magFilter=a.minFilter=pa,a.generateMipmaps=!1,a.wrapS=a.wrapT=zn,a.repeat.set(t,n),a.colorSpace=Ce,a}const Qs=[[20,16,12],[39,30,22],[55,43,31],[71,55,39],[87,67,47],[107,83,59],[127,99,71],[59,51,35],[79,71,47],[99,91,63],[47,47,51],[67,67,71],[91,91,95],[119,115,111],[123,63,31],[159,83,35],[191,111,47],[227,155,63]];function xu(e){const t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height);for(let a=0;a<n.data.length;a+=4){let s=0,i=1e9;for(let o=0;o<Qs.length;o++){const r=Qs[o],A=(r[0]-n.data[a])**2+(r[1]-n.data[a+1])**2+(r[2]-n.data[a+2])**2;A<i&&(i=A,s=o)}n.data[a]=Qs[s][0],n.data[a+1]=Qs[s][1],n.data[a+2]=Qs[s][2]}return t.putImageData(n,0,0),e}function Qu(e,t,n,a=900,s=.35){for(let i=0;i<a;i++){const o=wa()<.5?0:255;e.fillStyle=`rgba(${o},${o},${o},${wa()*s})`,e.fillRect(wa()*t|0,wa()*n|0,1+(wa()*2|0),1)}}function vu(e,t){const[n,a]=yu(32,64);for(let s=0;s<64;s++){const i=60+Math.sin(s*.7+wa())*12+wa()*10|0;a.fillStyle=`rgb(${i},${i*.72|0},${i*.48|0})`,a.fillRect(0,s,32,1)}return a.fillStyle="#1e1810",a.fillRect(15,0,1,64),Qu(a,32,64,300),wu(xu(n),e,t)}const uA="varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",bu=`varying vec2 vUv; uniform sampler2D map; uniform float t, flick;
  void main(){ vec3 c = texture2D(map, vec2(vUv.x*.5, vUv.y)).rgb; float a = texture2D(map, vec2(.5+vUv.x*.5, vUv.y)).r;
    a = smoothstep(.08,.6,a) * smoothstep(1.,.86,vUv.y) * smoothstep(0.,.16,vUv.y) * smoothstep(0.,.07,vUv.x) * smoothstep(1.,.95,vUv.x);
    c = mix(c, c*vec3(.7,1.,1.15)+vec3(.0,.04,.07), .4);
    float sl = .86 + .14*sin(vUv.y*408.*3.14159 + t*6.);
    float band = smoothstep(.0,.02, abs(fract(vUv.y*.5 - t*.12)-.5)-.47);
    c *= sl * flick * (1. + .5*(1.-band));
    gl_FragColor = vec4(c*.95, a*.9*flick);
    #include <colorspace_fragment>
  }`;let wo=null;function Su(){if(wo)return wo;const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),n=t.createRadialGradient(64,64,4,64,64,64);return n.addColorStop(0,"rgba(160,240,255,1)"),n.addColorStop(.35,"rgba(70,200,255,.55)"),n.addColorStop(.8,"rgba(40,140,255,.15)"),n.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),wo=new Be(e)}function Mu(e,t,n,a){const s=t.h||1.62,i=s*t.asp,o=new Ut;o.position.set(t.x,t.y,t.z),e.add(o);const r=document.createElement("video");Object.assign(r,{src:a+t.src,loop:!0,muted:!0,playsInline:!0,crossOrigin:"anonymous",preload:"metadata"}),r.setAttribute("playsinline",""),r.setAttribute("webkit-playsinline","");const A=new ei().load(a+t.still),l=new sh(r);l.colorSpace=A.colorSpace=Ce;const h={map:{value:A},t:{value:0},flick:{value:1}},c=new X(new Vt(i,s),new me({uniforms:h,vertexShader:uA,fragmentShader:bu,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1,side:en}));c.position.y=.06+s/2,c.renderOrder=5,o.add(c);const u={transparent:!0,depthWrite:!1,blending:bn,toneMapped:!1,fog:!1},d=new X(new ti(.95,48),new xt({map:Su(),...u}));d.rotation.x=-Math.PI/2,d.position.y=.012,o.add(d);const p=new X(new ih(.62,.68,64),new xt({color:6741503,...u,opacity:.8}));p.rotation.x=-Math.PI/2,p.position.y=.015,o.add(p);const m=new X(new de(.75,.6,s+.2,40,1,!0),new me({...u,side:en,uniforms:h,vertexShader:uA,fragmentShader:"varying vec2 vUv; uniform float flick; void main(){ gl_FragColor = vec4(vec3(.25,.7,1.)*.11*(1.-vUv.y)*flick, 1.); }"}));if(m.position.y=(s+.2)/2,o.add(m),!n){const f=new Nn(6737151,2.5,5,2);f.position.y=.4,o.add(f)}return{d:t,root:o,video:r,vtex:l,still:A,uni:h,plane:c,ring:p,gain:null,pan:null,pauseAt:0,playing:!1}}function ku(e,t,n,{low:a=!1,base:s=""}={}){const i=n.map(w=>Mu(e,w,a,s)),o=2,r=.32;i.forEach(w=>{const _=w.d.b;w.pv=1,w.far=_?Math.max(...[[_.minX,_.minZ],[_.minX,_.maxZ],[_.maxX,_.minZ],[_.maxX,_.maxZ]].map(([tt,G])=>Math.hypot(tt-w.d.x,G-w.d.z))):12});const A=(w,_)=>{const tt=Math.min(1,Math.max(0,(_-o)/(w.far-o))),G=tt*tt*(3-2*tt);return 1-(1-r)*G};let l=null,h=null,c=!1,u=!1,d=!1,p=null,m=0;const f=.4,B=w=>{w.uni.map.value=!d&&w.playing?w.vtex:w.still};i.forEach(w=>{w.video.addEventListener("playing",()=>{w.playing=!0,B(w)}),w.video.addEventListener("pause",()=>{w.playing=!1,B(w)})});const E=()=>!c&&!document.hidden;function I(w){i.forEach(_=>{const tt=_===p?1:0;_.gain?w?_.gain.gain.value=tt:_.gain.gain.setTargetAtTime(tt,l.currentTime,f):_.video.muted=!(u&&tt&&E())}),h&&h.gain.setTargetAtTime(E()?1:0,l.currentTime,.08)}const y=w=>{w.pauseAt=0,!document.hidden&&w.video.play().catch(()=>{})};function Q(){if(u){l&&l.state==="suspended"&&l.resume();return}u=!0;try{l=new(window.AudioContext||window.webkitAudioContext),h=l.createGain(),h.connect(l.destination),i.forEach(w=>{const _=l.createMediaElementSource(w.video);w.pan=l.createStereoPanner?l.createStereoPanner():null,w.gain=l.createGain(),w.gain.gain.value=w===p?1:0,w.prox=l.createGain(),w.prox.gain.value=w.pv,(w.pan?_.connect(w.pan).connect(w.prox):_.connect(w.prox)).connect(w.gain).connect(h),w.video.muted=!1})}catch{l=null,h=null,i.forEach(_=>{_.gain=null})}I(!0),p&&y(p)}addEventListener("visibilitychange",()=>{document.hidden?i.forEach(w=>w.video.pause()):p&&y(p),I()});const k=new q;function b(w,_,tt){const G=i.find(Y=>Y.d.room===tt)||null;if(G!==p){const Y=p;p=G,m++,Y&&(Y.pauseAt=_+(u?2e3:0)),p&&y(p),I(!u)}const et=t.position;k.set(1,0,0).applyQuaternion(t.quaternion);for(const Y of i){Y.pauseAt&&_>=Y.pauseAt&&Y!==p&&(Y.pauseAt=0,Y.video.pause()),Y===p&&u&&Y.video.paused&&!document.hidden&&y(Y),Y.uni.t.value=_/1e3,Y.uni.flick.value=.93+.05*Math.sin(_/37+Y.d.x)+(Math.random()<.01?-.25:0);const ct=Y.d.x-et.x,ft=Y.d.z-et.z;if(Y.plane.rotation.y=Math.atan2(-ct,-ft),Y.ring.rotation.z+=w*.4,Y===p){const H=A(Y,Math.hypot(ct,ft));Math.abs(H-Y.pv)>.003&&(Y.pv=H,Y.prox?Y.prox.gain.setTargetAtTime(H,l.currentTime,.15):Y.gain||(Y.video.volume=H))}if(Y.pan&&Y===p){const H=Math.hypot(ct,ft)||1;Y.pan.pan.setTargetAtTime(Math.max(-1,Math.min(1,(ct*k.x+ft*k.z)/H))*.3,l.currentTime,.1)}}}function S(w){d=w,i.forEach(B)}function F(){return c=!c,Q(),I(),c}function j(w,_){return c=!!w,_&&Q(),I(),c}return{H:i,begin:Q,update:b,toggleMute:F,setMuted:j,setLowStill:S,get muted(){return c},get state(){return{started:u,ctx:l&&l.state,active:p&&p.d.room,switches:m,lowStill:d,holos:i.map(w=>({room:w.d.room,paused:w.video.paused,t:+w.video.currentTime.toFixed(2),gain:w.gain?+w.gain.gain.value.toFixed(3):w.video.muted?0:1,prox:w.prox?+w.prox.gain.value.toFixed(3):+w.pv.toFixed(3),proxTarget:+w.pv.toFixed(3),far:+w.far.toFixed(1),video:w.uni.map.value===w.vtex}))}}}}const Du=.44,cn=.4,xo=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,Aa=e=>{const t=new xt(e);return t.toneMapped=!1,t.fog=!1,t};function Tu({scene:e,camera:t,controls:n,defs:a,base:s="",low:i=!1,stone:o,pillars:r,isMuted:A,onReading:l}){const h=new ei;h.setCrossOrigin("anonymous");const c=new Map;function u(M,D){let T=c.get(M);return T?(T.t&&T.ok?D&&D(T.t):D&&T.cbs.push(D),T):(T={t:null,ok:!1,cbs:D?[D]:[],used:performance.now()},c.set(M,T),T.t=h.load(M,it=>{it.colorSpace=Ce,it.anisotropy=4,T.ok=!0,T.cbs.forEach(Z=>Z(it)),T.cbs=[]},void 0,()=>{c.delete(M)}),T)}const d=(M,D,T)=>`${s}books/${M.d.id}/${String(D).padStart(3,"0")}-${T}.webp`,p=(()=>{const M=document.createElement("canvas");M.width=M.height=128;const D=M.getContext("2d"),T=D.createRadialGradient(64,64,2,64,64,64);T.addColorStop(0,"rgba(255,225,170,.9)"),T.addColorStop(.5,"rgba(255,190,120,.35)"),T.addColorStop(1,"rgba(0,0,0,0)"),D.fillStyle=T,D.fillRect(0,0,128,128);const it=new Be(M);return it.colorSpace=Ce,it})(),m={transparent:!0,depthWrite:!1,blending:bn,toneMapped:!1,fog:!1},f=15985884,B=4858902,E=a.map(M=>{const D=cn*M.aspect,T=new Ut;T.position.set(M.x,0,M.z),T.rotation.y=M.yaw,e.add(T);const it=new X(new Ae(.34,.82,.34),o);it.position.y=.47,T.add(it);const Z=new X(new Ae(.62,.12,.62),o);Z.position.y=.06,T.add(Z);const At=new Ut;At.position.set(0,1.06,0),At.rotation.x=Du,T.add(At);const dt=new X(new Ae(2*D+.14,.05,cn+.12),o);dt.position.y=-.025,At.add(dt);const Bt=new Ut;Bt.rotation.x=-Math.PI/2,Bt.position.y=.002,At.add(Bt);const Xt=(jt,$t,Rt,zt,Jt,pe=0)=>{const je=new X(new Vt(jt,$t),Rt);return je.position.set(zt,0,Jt),je.rotation.y=pe,je},ee=new X(new Ae(D,cn,.03),Aa({color:15261900}));ee.position.set(D/2,0,.015),Bt.add(ee);const x=ee.clone();x.position.x=-D/2,x.visible=!1,Bt.add(x);const N=Xt(D+.01,cn+.01,Aa({color:B,side:en}),D/2,-.002);Bt.add(N);const P=Xt(D,cn,Aa({color:f}),-D/2,.031);P.visible=!1,Bt.add(P);const $=Xt(D,cn,Aa({color:f}),D/2,.031);Bt.add($);const z=new Ut;z.position.z=.0335,Bt.add(z);const mt=Aa({color:16777215});u(s+M.cover,jt=>{mt.map=jt,mt.needsUpdate=!0});const It=Xt(D+.008,cn+.008,mt,D/2,.001);z.add(It);const _t=Xt(D+.008,cn+.008,Aa({color:5909530}),D/2,-.001,Math.PI);z.add(_t);const C=new Ut;C.position.z=.033,C.visible=!1,Bt.add(C);const L=Xt(D,cn,Aa({color:f}),D/2,5e-4),W=Xt(D,cn,Aa({color:f}),D/2,-5e-4,Math.PI);C.add(L,W);const nt=new X(new ti(1.3,40),new xt({map:p,...m,opacity:.55}));nt.rotation.x=-Math.PI/2,nt.position.y=.015,T.add(nt);const V=new X(new de(.12,.9,2.6,32,1,!0),new xt({color:16766880,...m,opacity:.05,side:en}));V.position.y=1.4,T.add(V);const Nt=new X(new Vt(2*D+.5,cn+.4),new xt({map:p,...m,opacity:.35}));if(Nt.rotation.x=-Math.PI/2,Nt.position.y=.003,At.add(Nt),!i){const jt=new el(16766624,6,5,.5,.7,1.5);jt.position.set(0,3.4,.6),jt.target=At,T.add(jt)}r&&r.push([M.x,M.z]);const Gt=M.pages,Mt=Math.floor(Gt/2)+1;return{d:M,W:D,g:T,desk:At,book:Bt,block:ee,blockL:x,pageL:P,pageR:$,coverPivot:z,turn:C,tF:L,tB:W,hit:[it,dt,It,ee],npg:Gt,spreads:Mt,spread:0}}),I=E.flatMap(M=>M.hit.map(D=>(D.userData.book=M,D))),y=(M,D)=>D===0?0:2*D,Q=(M,D)=>2*D+1;function k(M,D,T,it){const Z=M.material;if(!T||T>D.npg){Z.map=null,Z.color.set(f),Z.needsUpdate=!0,M.userData.n=0;return}M.userData.n=T,Z.color.set(16777215);const At=()=>{for(const Bt of it?["hi","md","lo"]:["md","lo"]){const Xt=c.get(d(D,T,Bt));if(Xt&&Xt.ok)return Xt.t}return null},dt=()=>{if(M.userData.n!==T)return;const Bt=At();Bt&&Z.map!==Bt?(Z.map=Bt,Z.needsUpdate=!0):!Bt&&!Z.map&&Z.color.set(f)};Z.map&&!(Z.map.userData&&Z.map.userData.n===T)&&(Z.map=null,Z.needsUpdate=!0),u(d(D,T,"lo"),Bt=>{Bt.userData.n=T,dt()}),u(d(D,T,"md"),Bt=>{Bt.userData.n=T,dt()}),it&&u(d(D,T,"hi"),Bt=>{Bt.userData.n=T,dt()}),dt()}function b(M,D){for(let T=D-2;T<=D+3;T++)if(!(T<0||T>=M.spreads))for(const it of[y(M,T),Q(M,T)])it&&it<=M.npg&&(u(d(M,it,"lo")),Math.abs(T-D)<=2&&u(d(M,it,"md")));for(const[T,it]of c){const Z=T.match(/books\/([^/]+)\/(\d+)-(hi|md)\.webp$/);if(!Z||Z[1]!==M.d.id||!it.ok)continue;const At=+Z[2],dt=Math.floor(At/2);(Z[3]==="hi"&&dt!==D||Z[3]==="md"&&Math.abs(dt-D)>3)&&(it.t.dispose(),c.delete(T))}}function S(M,D){M.spread=D,k(M.pageL,M,y(M,D),!0),k(M.pageR,M,Q(M,D),!0),M.pageL.visible=D>0||_===M,b(M,D),w.update()}let F=null;function j(){if(!(A&&A()))try{F=F||new(window.AudioContext||window.webkitAudioContext),F.state==="suspended"&&F.resume();const M=F.sampleRate*.45,D=F.createBuffer(1,M,F.sampleRate),T=D.getChannelData(0);for(let dt=0;dt<M;dt++){const Bt=dt/M;T[dt]=(Math.random()*2-1)*Math.pow(Math.sin(Math.PI*Math.min(1,Bt*1.6)),2)*(.6+.4*Math.sin(Bt*40))}const it=F.createBufferSource();it.buffer=D;const Z=F.createBiquadFilter();Z.type="bandpass",Z.frequency.value=2400,Z.Q.value=.7;const At=F.createGain();At.gain.value=.16,it.connect(Z).connect(At).connect(F.destination),it.start()}catch{}}const w=(()=>{const M=document.createElement("div");M.id="bookui",M.hidden=!0,M.innerHTML='<div class="bk-top"><b class="bk-title"></b><a class="bk-link" target="_blank" rel="noopener">View on tjm.art ↗</a><button type="button" class="bk-close" aria-label="Close book">✕ Close</button></div><div class="bk-bot"><button type="button" class="bk-prev" aria-label="Previous pages">‹</button><span class="bk-pg"></span><button type="button" class="bk-next" aria-label="Next pages">›</button></div>',document.body.appendChild(M);const D=T=>M.querySelector(T);return["mousedown","pointerdown","touchstart","touchend","click","mouseup"].forEach(T=>M.querySelectorAll("button,a").forEach(it=>it.addEventListener(T,Z=>Z.stopPropagation(),{passive:T!=="click"}))),D(".bk-close").addEventListener("click",()=>ht(!0)),D(".bk-prev").addEventListener("click",()=>ut(-1)),D(".bk-next").addEventListener("click",()=>ut(1)),{el:M,update(){const T=_||tt;if(!T)return;D(".bk-title").textContent=T.d.title,D(".bk-link").href=T.d.url;const it=y(T,T.spread),Z=Q(T,T.spread);D(".bk-pg").textContent=T.spread===0?`p. 1 / ${T.npg}`:Z<=T.npg?`pp. ${it}–${Z} / ${T.npg}`:`p. ${it} / ${T.npg}`,D(".bk-prev").disabled=T.spread===0,D(".bk-next").disabled=T.spread>=T.spreads-1}}})();let _=null,tt=null,G=null,et=null,Y=0;const ct=document.createElement("div");ct.id="bookhint",ct.hidden=!0,document.body.appendChild(ct);function ft(M){M.desk.updateMatrixWorld(!0);const D=new q(0,.03,0).applyMatrix4(M.desk.matrixWorld),T=new q(0,1,0).transformDirection(M.desk.matrixWorld),it=new q(0,0,-1).transformDirection(M.desk.matrixWorld),Z=Math.tan(Ii.degToRad(t.fov/2)),At=Math.max(cn*1.3/2/Z,M.W*2*1.18/2/(Z*t.aspect)),dt=D.clone().addScaledVector(T,At),Bt=new Ze().lookAt(dt,D,it);return{pos:dt,quat:new ze().setFromRotationMatrix(Bt)}}function H(M){if(_||tt||G)return;tt=M,window.__reading=!0,l&&l(!0),et={pos:t.position.clone(),quat:t.quaternion.clone(),locked:n.isLocked},n.isLocked&&n.unlock(),M.spread=0,S(M,0),M.pageL.visible=!1,w.el.hidden=!1,w.update(),ct.hidden=!0;const D=ft(M);G={t:0,dur:1.1,kind:"open",b:M,from:{pos:t.position.clone(),quat:t.quaternion.clone()},to:D}}let pt=null;function ht(M){if(G&&(G.kind==="flip"||G.kind==="open")){pt={relock:M},Y=0;return}const D=_;!D||G||(pt=null,Y=0,G={t:0,dur:.9,kind:"close",b:D,from:{pos:t.position.clone(),quat:t.quaternion.clone()},to:et,relock:M})}function ut(M){const D=_;if(!D)return;if(G){G.kind==="flip"&&(Y=Math.max(-3,Math.min(3,Y+M)));return}const T=D.spread+M;T<0||T>=D.spreads||(j(),D.turn.visible=!0,M>0?(k(D.tF,D,Q(D,D.spread),!0),k(D.tB,D,y(D,T),!0),k(D.pageR,D,Q(D,T),!0),D.turn.rotation.y=0):(k(D.tF,D,Q(D,T),!0),k(D.tB,D,y(D,D.spread),!0),k(D.pageL,D,y(D,T),!0),D.turn.rotation.y=-Math.PI,T===0&&(D.pageL.visible=!1)),M>0&&D.spread===0&&(D.pageL.visible=!1),G={t:0,dur:i?.5:.65,kind:"flip",b:D,dir:M,s:T})}let rt=performance.now();function Qt(){const M=performance.now(),D=Math.min(.5,(M-rt)/1e3);if(rt=M,G){G.t+=D;const T=Math.min(1,G.t/G.dur),it=xo(T),Z=G,At=Z.b;if(Z.kind==="open"||Z.kind==="close"){t.position.lerpVectors(Z.from.pos,Z.to.pos,it),t.quaternion.slerpQuaternions(Z.from.quat,Z.to.quat,it);const dt=Z.kind==="open"?Ii.clamp((T-.35)/.65,0,1):Ii.clamp(1-T/.6,0,1);At.coverPivot.rotation.y=-Math.PI*xo(dt),At.coverPivot.position.z=.0335-.0375*Ii.clamp((xo(dt)-.5)*2,0,1),At.blockL.visible=dt>.5,At.pageL.visible=dt>.92&&At.spread>0,Z.kind==="open"&&dt>.92&&(At.pageL.visible=!0)}else if(Z.kind==="flip"){const dt=Z.dir>0?-Math.PI*it:-Math.PI*(1-it);At.turn.rotation.y=dt,At.turn.position.z=.033+Math.sin(Math.PI*it)*.02}if(T>=1){if(G=null,pt&&Z.kind!=="close"){const dt=pt;pt=null,Z.kind==="open"?(_=At,tt=null):(At.turn.visible=!1,S(At,Z.s)),At.pageL.visible=!0,ht(dt.relock);return}if(Z.kind==="open")_=At,tt=null,At.pageL.visible=!0,k(At.pageL,At,0,!0),w.update();else if(Z.kind==="close"){if(_=null,w.el.hidden=!0,At.coverPivot.rotation.y=0,At.coverPivot.position.z=.0335,At.blockL.visible=!1,At.pageL.visible=!1,At.spread=0,k(At.pageR,At,1,!1),window.__reading=!1,l&&l(!1),Z.relock!==!1)try{n.lock()}catch{}}else if(At.turn.visible=!1,S(At,Z.s),At.pageL.visible=!0,Y){const dt=Math.sign(Y);Y-=dt,ut(dt)}}}if(!_&&!G){const T=Et();ct.hidden=!T,T&&(ct.textContent=(matchMedia("(pointer:coarse)").matches?"Tap":"E / click")+" to read “"+T.d.title+"”")}}const yt=new Ir,vt=new kt;function Et(){let M=null,D=2.6;for(const T of E){const it=T.d.x-t.position.x,Z=T.d.z-t.position.z,At=Math.hypot(it,Z);if(At>D)continue;const dt=new q;t.getWorldDirection(dt),(dt.x*it+dt.z*Z)/(At||1)>.55&&(M=T,D=At)}return M}function Dt(M){if(_||G)return!1;t.updateMatrixWorld(),yt.setFromCamera(M||vt.set(0,0),t),yt.far=3.2;const D=yt.intersectObjects(I,!1)[0];if(D)return H(D.object.userData.book),!0;if(!M){const T=Et();if(T)return H(T),!0}return!1}addEventListener("keydown",M=>{_&&(M.code==="ArrowRight"||M.code==="KeyD"||M.code==="PageDown"||M.code==="Space"?(ut(1),M.preventDefault()):M.code==="ArrowLeft"||M.code==="KeyA"||M.code==="PageUp"?(ut(-1),M.preventDefault()):M.code==="Escape"&&ht(!1))},!0);let Tt=null;return addEventListener("pointerdown",M=>{!_||M.target.closest&&M.target.closest("#bookui,#soundbtn,#homebtn,#hud")||(Tt={x:M.clientX,y:M.clientY,t:performance.now()})},!0),addEventListener("pointerup",M=>{if(!_||!Tt)return;const D=M.clientX-Tt.x,T=M.clientY-Tt.y,it=Tt;if(Tt=null,Math.abs(D)>40&&Math.abs(D)>Math.abs(T)){ut(D<0?1:-1);return}Math.hypot(D,T)<12&&performance.now()-it.t<500&&ut(M.clientX>innerWidth/2?1:-1)},!0),{B:E,update:Qt,tryOpen:Dt,open:H,close:ht,flip:ut,get reading(){return!!_||!!G},get state(){const M=_||tt;return{reading:!!_,anim:G&&G.kind,book:M&&M.d.id,spread:M&&M.spread,left:M&&M.pageL.userData.n,right:M&&M.pageR.userData.n,leftTex:M&&M.pageL.material.map&&M.pageL.material.map.image&&M.pageL.material.map.image.width,rightTex:M&&M.pageR.material.map&&M.pageR.material.map.image&&M.pageR.material.map.image.width,cached:c.size,hint:ct.hidden?null:ct.textContent}}}}const _u=new Cr(-1,1,1,-1,0,1);let Ru=class extends Cs{constructor(){super(),this.setAttribute("position",new gs([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gs([0,2,0,0,2,0],2))}};const zu=new Ru;let dl=class{constructor(t){this._mesh=new X(zu,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,_u)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Me=Uint8Array,Us=Uint16Array,Fu=Int32Array,pl=new Me([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ml=new Me([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Nu=new Me([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Il=function(e,t){for(var n=new Us(31),a=0;a<31;++a)n[a]=t+=1<<e[a-1];for(var s=new Fu(n[30]),a=1;a<30;++a)for(var i=n[a];i<n[a+1];++i)s[i]=i-n[a]<<5|a;return{b:n,r:s}},Cl=Il(pl,2),El=Cl.b,Lu=Cl.r;El[28]=258,Lu[258]=28;var Uu=Il(ml,0),Gu=Uu.b,Bl=new Us(32768);for(var re=0;re<32768;++re){var la=(re&43690)>>1|(re&21845)<<1;la=(la&52428)>>2|(la&13107)<<2,la=(la&61680)>>4|(la&3855)<<4,Bl[re]=((la&65280)>>8|(la&255)<<8)>>1}var Gs=function(e,t,n){for(var a=e.length,s=0,i=new Us(t);s<a;++s)e[s]&&++i[e[s]-1];var o=new Us(t);for(s=1;s<t;++s)o[s]=o[s-1]+i[s-1]<<1;var r;{r=new Us(1<<t);var A=15-t;for(s=0;s<a;++s)if(e[s])for(var l=s<<4|e[s],h=t-e[s],c=o[e[s]-1]++<<h,u=c|(1<<h)-1;c<=u;++c)r[Bl[c]>>A]=l}return r},ai=new Me(288);for(var re=0;re<144;++re)ai[re]=8;for(var re=144;re<256;++re)ai[re]=9;for(var re=256;re<280;++re)ai[re]=7;for(var re=280;re<288;++re)ai[re]=8;var yl=new Me(32);for(var re=0;re<32;++re)yl[re]=5;var Yu=Gs(ai,9),qu=Gs(yl,5),Qo=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},pn=function(e,t,n){var a=t/8|0;return(e[a]|e[a+1]<<8)>>(t&7)&n},vo=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},wl=function(e){return(e+7)/8|0},As=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new Me(e.subarray(t,n))},Pu=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Je=function(e,t,n){var a=new Error(t||Pu[e]);if(a.code=e,Error.captureStackTrace&&Error.captureStackTrace(a,Je),!n)throw a;return a},xl=function(e,t,n,a){var s=e.length,i=a?a.length:0;if(!s||t.f&&!t.l)return n||new Me(0);var o=!n,r=o||t.i!=2,A=t.i;o&&(n=new Me(s*3));var l=function(D){var T=n.length;if(D>T){var it=new Me(Math.max(T*2,D));it.set(n),n=it}},h=t.f||0,c=t.p||0,u=t.b||0,d=t.l,p=t.d,m=t.m,f=t.n,B=s*8;do{if(!d){h=pn(e,c,1);var E=pn(e,c+1,3);if(c+=3,E)if(E==1)d=Yu,p=qu,m=9,f=5;else if(E==2){var k=pn(e,c,31)+257,b=pn(e,c+10,15)+4,S=k+pn(e,c+5,31)+1;c+=14;for(var F=new Me(S),j=new Me(19),w=0;w<b;++w)j[Nu[w]]=pn(e,c+w*3,7);c+=b*3;for(var _=Qo(j),tt=(1<<_)-1,G=Gs(j,_),w=0;w<S;){var et=G[pn(e,c,tt)];c+=et&15;var I=et>>4;if(I<16)F[w++]=I;else{var Y=0,ct=0;for(I==16?(ct=3+pn(e,c,3),c+=2,Y=F[w-1]):I==17?(ct=3+pn(e,c,7),c+=3):I==18&&(ct=11+pn(e,c,127),c+=7);ct--;)F[w++]=Y}}var ft=F.subarray(0,k),H=F.subarray(k);m=Qo(ft),f=Qo(H),d=Gs(ft,m),p=Gs(H,f)}else Je(1);else{var I=wl(c)+4,y=e[I-4]|e[I-3]<<8,Q=I+y;if(Q>s){A&&Je(0);break}r&&l(u+y),n.set(e.subarray(I,Q),u),t.b=u+=y,t.p=c=Q*8,t.f=h;continue}if(c>B){A&&Je(0);break}}r&&l(u+131072);for(var pt=(1<<m)-1,ht=(1<<f)-1,ut=c;;ut=c){var Y=d[vo(e,c)&pt],rt=Y>>4;if(c+=Y&15,c>B){A&&Je(0);break}if(Y||Je(2),rt<256)n[u++]=rt;else if(rt==256){ut=c,d=null;break}else{var Qt=rt-254;if(rt>264){var w=rt-257,yt=pl[w];Qt=pn(e,c,(1<<yt)-1)+El[w],c+=yt}var vt=p[vo(e,c)&ht],Et=vt>>4;vt||Je(3),c+=vt&15;var H=Gu[Et];if(Et>3){var yt=ml[Et];H+=vo(e,c)&(1<<yt)-1,c+=yt}if(c>B){A&&Je(0);break}r&&l(u+131072);var Dt=u+Qt;if(u<H){var Tt=i-H,M=Math.min(H,Dt);for(Tt+u<0&&Je(3);u<M;++u)n[u]=a[Tt+u]}for(;u<Dt;++u)n[u]=n[u-H]}}t.l=d,t.p=ut,t.b=u,t.f=h,d&&(h=1,t.m=m,t.d=p,t.n=f)}while(!h);return u!=n.length&&o?As(n,0,u):n.subarray(0,u)},Hu=new Me(0),kn=function(e,t){return e[t]|e[t+1]<<8},Cn=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},bo=function(e,t){return Cn(e,t)+Cn(e,t+4)*4294967296},Ju=function(e){(e[0]!=31||e[1]!=139||e[2]!=8)&&Je(6,"invalid gzip data");var t=e[3],n=10;t&4&&(n+=(e[10]|e[11]<<8)+2);for(var a=(t>>3&1)+(t>>4&1);a>0;a-=!e[n++]);return n+(t&2)},So=function(){function e(t,n){typeof t=="function"&&(n=t,t={}),this.ondata=n;var a=t&&t.dictionary&&t.dictionary.subarray(-32768);this.s={i:0,b:a?a.length:0},this.o=new Me(32768),this.p=new Me(0),a&&this.o.set(a)}return e.prototype.e=function(t){if(this.ondata||Je(5),this.d&&Je(4),!this.p.length)this.p=t;else if(t.length){var n=new Me(this.p.length+t.length);n.set(this.p),n.set(t,this.p.length),this.p=n}},e.prototype.c=function(t){this.s.i=+(this.d=t||!1);var n=this.s.b,a=xl(this.p,this.s,this.o);this.ondata(As(a,n,this.s.b),this.d),this.o=As(a,this.s.b-32768),this.s.b=this.o.length,this.p=As(this.p,this.s.p/8|0),this.s.p&=7},e.prototype.push=function(t,n){this.e(t),this.c(n)},e}();function Ou(e,t){return xl(e,{i:2},t&&t.out,t&&t.dictionary)}var Vu=function(){function e(t,n){this.v=1,this.r=0,So.call(this,t,n)}return e.prototype.push=function(t,n){if(So.prototype.e.call(this,t),this.r+=t.length,this.v){var a=this.p.subarray(this.v-1),s=a.length>3?Ju(a):4;if(s>a.length){if(!n)return}else this.v>1&&this.onmember&&this.onmember(this.r-a.length);this.p=a.subarray(s),this.v=0}So.prototype.c.call(this,n),this.s.f&&!this.s.l&&!n&&(this.v=wl(this.s.p)+9,this.s={i:0},this.o=new Me(0),this.push(new Me(0),n))},e}(),Ko=typeof TextDecoder<"u"&&new TextDecoder,ju=0;try{Ko.decode(Hu,{stream:!0}),ju=1}catch{}var Wu=function(e){for(var t="",n=0;;){var a=e[n++],s=(a>127)+(a>223)+(a>239);if(n+s>e.length)return{s:t,r:As(e,n-1)};s?s==3?(a=((a&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|a>>10,56320|a&1023)):s&1?t+=String.fromCharCode((a&31)<<6|e[n++]&63):t+=String.fromCharCode((a&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(a)}};function Xu(e,t){if(t){for(var n="",a=0;a<e.length;a+=16384)n+=String.fromCharCode.apply(null,e.subarray(a,a+16384));return n}else{if(Ko)return Ko.decode(e);var s=Wu(e),i=s.s,n=s.r;return n.length&&Je(8),i}}var Ku=function(e,t){return t+30+kn(e,t+26)+kn(e,t+28)},Zu=function(e,t,n){var a=kn(e,t+28),s=Xu(e.subarray(t+46,t+46+a),!(kn(e,t+8)&2048)),i=t+46+a,o=Cn(e,t+20),r=n&&o==4294967295?$u(e,i):[o,Cn(e,t+24),Cn(e,t+42)],A=r[0],l=r[1],h=r[2];return[kn(e,t+10),A,l,s,i+kn(e,t+30)+kn(e,t+32),h]},$u=function(e,t){for(;kn(e,t)!=1;t+=4+kn(e,t+2));return[bo(e,t+12),bo(e,t+4),bo(e,t+20)]};function tg(e,t){for(var n={},a=e.length-22;Cn(e,a)!=101010256;--a)(!a||e.length-a>65558)&&Je(13);var s=kn(e,a+8);if(!s)return{};var i=Cn(e,a+16),o=i==4294967295||s==65535;if(o){var r=Cn(e,a-12);o=Cn(e,r)==101075792,o&&(s=Cn(e,r+32),i=Cn(e,r+48))}for(var A=t&&t.filter,l=0;l<s;++l){var h=Zu(e,i,o),c=h[0],u=h[1],d=h[2],p=h[3],m=h[4],f=h[5],B=Ku(e,f);i=m,(!A||A({name:p,size:u,originalSize:d,compression:c}))&&(c?c==8?n[p]=Ou(e.subarray(B,B+u),{out:new Me(d)}):Je(14,"unknown compression type "+c):n[p]=As(e,B,B+u))}return n}let Wn;const Ql=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&Ql.decode();let Ms=null;function eg(){return(Ms===null||Ms.byteLength===0)&&(Ms=new Uint8Array(Wn.memory.buffer)),Ms}function ng(e,t){return e=e>>>0,Ql.decode(eg().subarray(e,e+t))}function ag(e,t,n,a,s,i,o,r,A,l,h,c,u){return Wn.raycast_splats(e,t,n,a,s,i,o,r,A,l,h,c,u)}async function sg(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(a){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",a);else throw a}const n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}else{const n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}function ig(){const e={};return e.wbg={},e.wbg.__wbg_buffer_609cc3eee51ed158=function(t){return t.buffer},e.wbg.__wbg_length_3b4f022188ae8db6=function(t){return t.length},e.wbg.__wbg_length_6ca527665d89694d=function(t){return t.length},e.wbg.__wbg_length_8cfd2c6409af88ad=function(t){return t.length},e.wbg.__wbg_new_9fee97a409b32b68=function(t){return new Uint16Array(t)},e.wbg.__wbg_new_e3b321dcfef89fc7=function(t){return new Uint32Array(t)},e.wbg.__wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354=function(t,n,a){return new Float32Array(t,n>>>0,a>>>0)},e.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212=function(t,n,a){return new Uint32Array(t,n>>>0,a>>>0)},e.wbg.__wbg_newwithlength_5a5efe313cfd59f1=function(t){return new Float32Array(t>>>0)},e.wbg.__wbg_set_10bad9bee0e9c58b=function(t,n,a){t.set(n,a>>>0)},e.wbg.__wbg_set_d23661d19148b229=function(t,n,a){t.set(n,a>>>0)},e.wbg.__wbg_set_f4f1f0daa30696fc=function(t,n,a){t.set(n,a>>>0)},e.wbg.__wbg_subarray_3aaeec89bb2544f0=function(t,n,a){return t.subarray(n>>>0,a>>>0)},e.wbg.__wbg_subarray_769e1e0f81bb259b=function(t,n,a){return t.subarray(n>>>0,a>>>0)},e.wbg.__wbindgen_init_externref_table=function(){const t=Wn.__wbindgen_export_0,n=t.grow(4);t.set(0,void 0),t.set(n+0,void 0),t.set(n+1,null),t.set(n+2,!0),t.set(n+3,!1)},e.wbg.__wbindgen_memory=function(){return Wn.memory},e.wbg.__wbindgen_throw=function(t,n){throw new Error(ng(t,n))},e}function og(e,t){return Wn=e.exports,vl.__wbindgen_wasm_module=t,Ms=null,Wn.__wbindgen_start(),Wn}async function vl(e){if(Wn!==void 0)return Wn;typeof e<"u"&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),typeof e>"u"&&(e=new URL("data:application/wasm;base64,AGFzbQEAAAABzAEeYAJ/fwF/YAJ/fwBgA39/fwF/YAF/AX9gA39/fwBgAX8AYAV/f39/fwBgA29/fwFvYAV/f39/fwF/YAFvAW9gA29vfwBgAW8Bf2AAAX9gBH9/f38AYAAAYAR/f39/AX9gA39vbwF/YAF/AW9gAAFvYAF9AX1gBn9/f39/fwBgDX19fX19fX19f29/fX0Bb2AGf39/f39/AX9gBX9/fH9/AGAEf3x/fwBgBX9/fX9/AGAEf31/fwBgBX9/fn9/AGAEf35/fwBgAn19AX0C8gQRA3diZx1fX3diZ19idWZmZXJfNjA5Y2MzZWVlNTFlZDE1OAAJA3diZxpfX3diZ19uZXdfOWZlZTk3YTQwOWIzMmI2OAAJA3diZxpfX3diZ19zZXRfZjRmMWYwZGFhMzA2OTZmYwAKA3diZx1fX3diZ19sZW5ndGhfOGNmZDJjNjQwOWFmODhhZAALA3diZzFfX3diZ19uZXd3aXRoYnl0ZW9mZnNldGFuZGxlbmd0aF9mMWRlYWQ0NGQxZmM3MjEyAAcDd2JnGl9fd2JnX25ld19lM2IzMjFkY2ZlZjg5ZmM3AAkDd2JnGl9fd2JnX3NldF9kMjM2NjFkMTkxNDhiMjI5AAoDd2JnHV9fd2JnX2xlbmd0aF82Y2E1Mjc2NjVkODk2OTRkAAsDd2JnMV9fd2JnX25ld3dpdGhieXRlb2Zmc2V0YW5kbGVuZ3RoX2U2YjdlNjlhY2Q0YzczNTQABwN3YmcaX193Ymdfc2V0XzEwYmFkOWJlZTBlOWM1OGIACgN3YmcdX193YmdfbGVuZ3RoXzNiNGYwMjIxODhhZThkYjYACwN3YmcfX193Ymdfc3ViYXJyYXlfNzY5ZTFlMGY4MWJiMjU5YgAHA3diZx9fX3diZ19zdWJhcnJheV8zYWFlZWM4OWJiMjU0NGYwAAcDd2JnJF9fd2JnX25ld3dpdGhsZW5ndGhfNWE1ZWZlMzEzY2ZkNTlmMQARA3diZxBfX3diaW5kZ2VuX3Rocm93AAEDd2JnEV9fd2JpbmRnZW5fbWVtb3J5ABIDd2JnH19fd2JpbmRnZW5faW5pdF9leHRlcm5yZWZfdGFibGUADgNhYAMAAQIIBQQCEwEMAAEBAgAAAQwBBAYFBQQAAQYFFAENBAAGBQQEAQQOAgECAQAIBAAVARYG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ACIDKAIEQXhxRgRAIAMhAgwBCyABQRkgAkEBdmtBACACQR9HG3QhBQNAIAMgBUEddkEEcWpBEGoiBCgCACICRQ0CIAVBAXQhBSACIQMgAigCBEF4cSABRw0ACwsgAigCCCIBIAA2AgwgAiAANgIIIABBADYCGCAAIAI2AgwgACABNgIIDwsgBCAANgIAIAAgAzYCGCAAIAA2AgwgACAANgIIC/MCAQR/IwBBMGsiACQAAkACQEGQksAAKAIARQRAQaiSwAAoAgAhAUGoksAAQQA2AgAgAUUNASAAQRhqIAERBQAgAEEQaiICIABBJGopAgA3AwAgACAAKQIcNwMIIAAoAhghAUGQksAAKAIAIgMNAgJAIANFDQBBlJLAACgCACICRQ0AQZiSwAAoAgAgAkECdBBlC0GUksAAIAE2AgBBkJLAAEEBNgIAQZiSwAAgACkDCDcCAEGgksAAIABBEGopAwA3AgALIABBMGokAEGUksAADwsgAEEANgIoIABBATYCHCAAQaCHwAA2AhggAEIENwIgIABBGGpBiIjAABBDAAsgAEEoaiACKQMANwIAIAAgACkDCDcCICAAIAE2AhwgAEEBNgIYAkAgAEEYaiIBKAIARQ0AIAEoAgQiAkUNACABKAIIIAJBAnQQZQsgAEEANgIoIABBATYCHCAAQaiIwAA2AhggAEIENwIgIAFBsIjAABBDAAuoAgIDfwF+IwBBQGoiAiQAIAEoAgBBgICAgHhGBEAgASgCDCEDIAJBJGoiBEEANgIAIAJCgICAgBA3AhwgAkEwaiADKAIAIgNBCGopAgA3AwAgAkE4aiADQRBqKQIANwMAIAIgAykCADcDKCACQRxqQcCIwAAgAkEoahAYGiACQRhqIAQoAgAiAzYCACACIAIpAhwiBTcDECABQQhqIAM2AgAgASAFNwIACyABKQIAIQUgAUKAgICAEDcCACACQQhqIgMgAUEIaiIBKAIANgIAIAFBADYCAEGxk8AALQAAGiACIAU3AwBBDEEEEF0iAUUEQEEEQQwQbQALIAEgAikDADcCACABQQhqIAMoAgA2AgAgAEHgisAANgIEIAAgATYCACACQUBrJAAL0gECBH8BfiMAQSBrIgMkACABIAEgAmoiAksEQEEAQQAQUgALQQggACgCACIEQQF0IgEgAiABIAJLGyICIAJBCEkb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QQRqrUKAgICA4ACENwMoIAEgAa1CgICAgOAAhDcDICABIAFBIGo2AhAgAUEIakHIj8AAEEMAC2kCAX8BfiMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQfyNwAA2AgggA0ICNwIUIANCgICAgOAAIgQgA62ENwMoIAMgBCADQQRqrYQ3AyAgAyADQSBqNgIQIANBCGogAhBDAAtpAgF/AX4jAEEwayIDJAAgAyAANgIAIAMgATYCBCADQQI2AgwgA0H4kcAANgIIIANCAjcCFCADQoCAgIDgACIEIANBBGqthDcDKCADIAQgA62ENwMgIAMgA0EgajYCECADQQhqIAIQQwALZgAjAEEwayIAJABBsJPAAC0AAARAIABBAjYCDCAAQbCKwAA2AgggAEIBNwIUIAAgATYCLCAAIABBLGqtQoCAgIDgAIQ3AyAgACAAQSBqNgIQIABBCGpB0IrAABBDAAsgAEEwaiQAC5QBAgN/AW8jAEEgayIDJAAgAyAAKAIAEHAiBDYCACADIAI2AgQgAiAERwRAIANBADYCCCADIANBBGogA0EIahBAAAsQWyIEEFMiBSUBEAUhBhAbIgIgBiYBIAVBhAFPBEAgBRAtCyACIAAoAgAgAUECdhBkIAJBhAFPBEAgAhAtCyAEQYQBTwRAIAQQLQsgA0EgaiQAC08BAX8jAEEwayIAJAAgAEEBNgIMIABBwI3AADYCCCAAQgE3AhQgACAAQS9qrUKAgICAoAWENwMgIAAgAEEgajYCECAAQQhqQcSBwAAQQwALQQEBfyACIAAoAgAgACgCCCIDa0sEQCAAIAMgAhAlIAAoAgghAwsgACgCBCADaiABIAIQHxogACACIANqNgIIQQALTQECf0Gxk8AALQAAGiABKAIEIQIgASgCACEDQQhBBBBdIgFFBEBBBEEIEG0ACyABIAI2AgQgASADNgIAIABB8IrAADYCBCAAIAE2AgALQQEBfyACIAAoAgAgACgCCCIDa0sEQCAAIAMgAhApIAAoAgghAwsgACgCBCADaiABIAIQHxogACACIANqNgIIQQALQQEBfyMAQSBrIgIkACACQQA2AhAgAkEBNgIEIAJCBDcCCCACQS42AhwgAiAANgIYIAIgAkEYajYCACACIAEQQwALswIBA38gACgCACECIAEoAhwiAEEQcUUE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ZCByZWN1cnNpdmVseSBvciBhZnRlciBiZWluZyBkcm9wcGVkTGF6eSBpbnN0YW5jZSBoYXMgcHJldmlvdXNseSBiZWVuIHBvaXNvbmVkdgMQACoAAAAvVXNlcnMvZG1hcmNvcy8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL29uY2VfY2VsbC0xLjIxLjMvc3JjL2xpYi5ycwCoAxAAXwAAAAgDAAAZAAAAcmVlbnRyYW50IGluaXQAABgEEAAOAAAAqAMQAF8AAAB6AgAADQAAABYAAAAMAAAABAAAABcAAAAYAAAAGQAAAC9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZABYBBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAWAQQACkAAACuBAAADQAAAEFjY2Vzc0Vycm9ybWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAAAAAsFEAAVAAAAIAUQAA0AAABzdGQvc3JjL2FsbG9jLnJzQAUQABAAAABjAQAACQAAABYAAAAMAAAABAAAABoAAAAAAAAACAAAAAQAAAAbAAAAAAAAAAgAAAAEAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAQAAAABAAAACEAAAAiAAAAIwAAACQAAABFcnJvcgAAACUAAAAMAAAABAAAACYAAAAnAAAAKAAAAGNhcGFjaXR5IG92ZXJmbG93AAAA2AUQABEAAABhbGxvYy9zcmMvcmF3X3ZlYy5yc/QFEAAUAAAAGAAAAAUAQaCMwAAL8AUBAAAAKQAAAGEgZm9ybWF0dGluZyB0cmFpdCBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB3aGVuIHRoZSB1bmRlcmx5aW5nIHN0cmVhbSBkaWQgbm90YWxsb2Mvc3JjL2ZtdC5ycwAAfgYQABAAAAB+AgAADgAAAEJvcnJvd011dEVycm9yYWxyZWFkeSBib3Jyb3dlZDogrgYQABIAAABpbmRleCBvdXQgb2YgYm91bmRzOiB0aGUgbGVuIGlzICBidXQgdGhlIGluZGV4IGlzIAAAyAYQACAAAADoBhAAEgAAAD09IT1tYXRjaGVzYXNzZXJ0aW9uIGBsZWZ0ICByaWdodGAgZmFpbGVkCiAgbGVmdDogCiByaWdodDogABcHEAAQAAAAJwcQABcAAAA+BxAACQAAACByaWdodGAgZmFpbGVkOiAKICBsZWZ0OiAAAAAXBxAAEAAAAGAHEAAQAAAAcAcQAAkAAAA+BxAACQAAADogAAABAAAAAAAAAJwHEAACAAAAfSB9Y29yZS9zcmMvZm10L251bS5ycwAAswcQABMAAABmAAAAFwAAADB4MDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTlyYW5nZSBzdGFydCBpbmRleCAgb3V0IG9mIHJhbmdlIGZvciBzbGljZSBvZiBsZW5ndGggAACiCBAAEgAAALQIEAAiAAAAcmFuZ2UgZW5kIGluZGV4IOgIEAAQAAAAtAgQACIAAAAAAAA/AAAAvwBBqJLAAAsBFABwCXByb2R1Y2VycwIIbGFuZ3VhZ2UBBFJ1c3QADHByb2Nlc3NlZC1ieQMFcnVzdGMdMS44My4wICg5MGIzNWE2MjMgMjAyNC0xMS0yNikGd2FscnVzBjAuMjMuMwx3YXNtLWJpbmRnZW4HMC4yLjEwMABJD3RhcmdldF9mZWF0dXJlcwQrD211dGFibGUtZ2xvYmFscysIc2lnbi1leHQrD3JlZmVyZW5jZS10eXBlcysKbXVsdGl2YWx1ZQ=="));const t=ig();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:n,module:a}=await sg(await e,t);return og(n,a)}const Zn=-12,$n=9,rg=-30,Mo=Math.exp(rg),Ag=11,lg=11,ne=1<<Ag,Sa=1<<lg,cg=1;function hg(e){return e==="bool"||e==="bvec2"||e==="bvec3"||e==="bvec4"}function Ma(e){return e==="int"||e==="ivec2"||e==="ivec3"||e==="ivec4"}function ka(e){return e==="uint"||e==="uvec2"||e==="uvec3"||e==="uvec4"}function ug(e){return e==="float"||e==="vec2"||e==="vec3"||e==="vec4"}function gg(e){return e==="mat2"||e==="mat2x2"||e==="mat2x3"||e==="mat2x4"||e==="mat3"||e==="mat3x2"||e==="mat3x3"||e==="mat3x4"||e==="mat4"||e==="mat4x2"||e==="mat4x3"||e==="mat4x4"}function Xs(e){return ug(e)||gg(e)}function ja(e){return e==="mat2"||e==="mat2x2"}function Wa(e){return e==="mat3"||e==="mat3x3"}function Xa(e){return e==="mat4"||e==="mat4x4"}function fg(e){switch(e){case"vec2":return"float";case"vec3":return"float";case"vec4":return"float";case"ivec2":return"int";case"ivec3":return"int";case"ivec4":return"int";case"uvec2":return"uint";case"uvec3":return"uint";case"uvec4":return"uint";default:throw new Error(`Invalid vector type: ${e}`)}}function dg(e){switch(e){case"vec2":case"ivec2":case"uvec2":return 2;case"vec3":case"ivec3":case"uvec3":return 3;case"vec4":case"ivec4":case"uvec4":return 4;default:throw new Error(`Invalid vector type: ${e}`)}}function xe(e){return Math.trunc(e).toString()}function Qe(e){return`${Math.max(0,Math.trunc(e)).toString()}u`}function Ot(e){return e===Number.POSITIVE_INFINITY?"INFINITY":e===Number.NEGATIVE_INFINITY?"-INFINITY":Number.isInteger(e)?e.toFixed(1):e.toString()}function jn(e){return e instanceof Da?e.type:e.dynoOut().type}class Da{constructor(t){this.__isDynoValue=!0,this.type=t}}class tn extends Da{constructor(t,n){super(t.outTypes[n]),this.dyno=t,this.key=n}}class Ri extends Da{constructor(t,n){super(t),this.literal=n}getLiteral(){return this.literal}}class pg extends Ri{constructor(t,n){super(t,""),this.value=n}getLiteral(){const{type:t,value:n}=this;switch(t){case"bool":return n?"true":"false";case"uint":return Qe(n);case"int":return xe(n);case"float":return Ot(n);case"bvec2":{const a=n;return`bvec2(${a[0]}, ${a[1]})`}case"uvec2":{if(n instanceof kt)return`uvec2(${Qe(n.x)}, ${Qe(n.y)})`;const a=n;return`uvec2(${Qe(a[0])}, ${Qe(a[1])})`}case"ivec2":{if(n instanceof kt)return`ivec2(${xe(n.x)}, ${xe(n.y)})`;const a=n;return`ivec2(${xe(a[0])}, ${xe(a[1])})`}case"vec2":{if(n instanceof kt)return`vec2(${Ot(n.x)}, ${Ot(n.y)})`;const a=n;return`vec2(${Ot(a[0])}, ${Ot(a[1])})`}case"bvec3":{const a=n;return`bvec3(${a[0]}, ${a[1]}, ${a[2]})`}case"uvec3":{if(n instanceof q)return`uvec3(${Qe(n.x)}, ${Qe(n.y)}, ${Qe(n.z)})`;const a=n;return`uvec3(${Qe(a[0])}, ${Qe(a[1])}, ${Qe(a[2])})`}case"ivec3":{if(n instanceof q)return`ivec3(${xe(n.x)}, ${xe(n.y)}, ${xe(n.z)})`;const a=n;return`ivec3(${xe(a[0])}, ${xe(a[1])}, ${xe(a[2])})`}case"vec3":{if(n instanceof q)return`vec3(${Ot(n.x)}, ${Ot(n.y)}, ${Ot(n.z)})`;const a=n;return`vec3(${Ot(a[0])}, ${Ot(a[1])}, ${Ot(a[2])})`}case"bvec4":{const a=n;return`bvec4(${a[0]}, ${a[1]}, ${a[2]}, ${a[3]})`}case"uvec4":{if(n instanceof yn)return`uvec4(${Qe(n.x)}, ${Qe(n.y)}, ${Qe(n.z)}, ${Qe(n.w)})`;const a=n;return`uvec4(${Qe(a[0])}, ${Qe(a[1])}, ${Qe(a[2])}, ${Qe(a[3])})`}case"ivec4":{if(n instanceof yn)return`ivec4(${xe(n.x)}, ${xe(n.y)}, ${xe(n.z)}, ${xe(n.w)})`;const a=n;return`ivec4(${xe(a[0])}, ${xe(a[1])}, ${xe(a[2])}, ${xe(a[3])})`}case"vec4":{if(n instanceof yn)return`vec4(${Ot(n.x)}, ${Ot(n.y)}, ${Ot(n.z)}, ${Ot(n.w)})`;if(n instanceof ze)return`vec4(${Ot(n.x)}, ${Ot(n.y)}, ${Ot(n.z)}, ${Ot(n.w)})`;const a=n;return`vec4(${Ot(a[0])}, ${Ot(a[1])}, ${Ot(a[2])}, ${Ot(a[3])})`}case"mat2":case"mat2x2":{const a=n,s=a instanceof sl?a.elements:n,i=new Array(4).fill(0).map((o,r)=>Ot(s[r]));return`${t}(${i.join(", ")})`}case"mat2x3":{const a=n,s=new Array(6).fill(0).map((i,o)=>Ot(a[o]));return`${t}(${s.join(", ")})`}case"mat2x4":{const a=n,s=new Array(8).fill(0).map((i,o)=>Ot(a[o]));return`${t}(${s.join(", ")})`}case"mat3":case"mat3x3":{const a=n,s=a instanceof nl?a.elements:n,i=new Array(9).fill(0).map((o,r)=>Ot(s[r]));return`${t}(${i.join(", ")})`}case"mat3x2":{const a=n,s=new Array(6).fill(0).map((i,o)=>Ot(a[o]));return`${t}(${s.join(", ")})`}case"mat3x4":{const a=n,s=new Array(12).fill(0).map((i,o)=>Ot(a[o]));return`${t}(${s.join(", ")})`}case"mat4":case"mat4x4":{const a=n,s=a instanceof Ze?a.elements:n,i=new Array(16).fill(0).map((o,r)=>Ot(s[r]));return`${t}(${i.join(", ")})`}case"mat4x2":{const a=n,s=new Array(8).fill(0).map((i,o)=>Ot(a[o]));return`${t}(${s.join(", ")})`}case"mat4x3":{const a=n,s=new Array(12).fill(0).map((i,o)=>Ot(a[o]));return`${t}(${s.join(", ")})`}default:throw new Error(`Type not implemented: ${String(t)}`)}}}function Ys(e,t){return new pg(e,t)}function yi(e){const t=String(e);if(hg(e))return`${t}(false)`;if(Xs(e))return`${t}(0.0)`;if(Ma(e))return`${t}(0)`;if(ka(e))return`${t}(0u)`;throw new Error(`Type not implemented: ${t}`)}const gA="    ";class mg{constructor({indent:t}={}){this.globals=new Set,this.statements=[],this.uniforms={},this.declares=new Set,this.updaters=[],this.sequence=0,this.indent=gA,this.indent=t??gA}nextSequence(){return this.sequence++}}class De{constructor({inTypes:t,outTypes:n,inputs:a,update:s,globals:i,statements:o,generate:r}){this.inTypes=t??{},this.outTypes=n??{},this.inputs=a??{},this.update=s,this.globals=i,this.statements=o,this.generate=r??(({inputs:A,outputs:l,compile:h})=>{var c,u;return{globals:(c=this.globals)==null?void 0:c.call(this,{inputs:A,outputs:l,compile:h}),statements:(u=this.statements)==null?void 0:u.call(this,{inputs:A,outputs:l,compile:h})}})}get outputs(){const t={};for(const n in this.outTypes)t[n]=new tn(this,n);return t}apply(t){return Object.assign(this.inputs,t),this.outputs}compile({inputs:t,outputs:n,compile:a}){const s=[`// ${this.constructor.name}(${Object.values(t).join(", ")}) => (${Object.values(n).join(", ")})`],i=[];for(const l in n){const h=n[l];h&&!a.declares.has(h)&&(a.declares.add(h),i.push(l))}const{globals:o,statements:r,uniforms:A}=this.generate({inputs:t,outputs:n,compile:a});for(const l of o??[])a.globals.add(l);for(const l in A)a.uniforms[l]=A[l];this.update&&a.updaters.push(this.update);for(const l of i){const h=n[l];h&&(a.uniforms[h]||s.push(`${bl(h,this.outTypes[l])};`))}return r!=null&&r.length&&(s.push("{"),s.push(...r.map(l=>a.indent+l)),s.push("}")),s}}class Ig extends De{constructor({inTypes:t,outTypes:n,inputs:a,update:s,globals:i,construct:o}){super({inTypes:t,outTypes:n,inputs:a,update:s,globals:i,generate:r=>this.generateBlock(r)}),this.construct=o}generateBlock({inputs:t,outputs:n,compile:a}){var s,i;const o={},r={};for(const f in t)t[f]!=null&&(o[f]=new Ri(this.inTypes[f],t[f]));for(const f in n)n[f]!=null&&(r[f]=new Da(this.outTypes[f]));const A={roots:[]},l=this.construct(o,r,A);for(const f of((s=this.globals)==null?void 0:s.call(this,{inputs:t,outputs:n,compile:a}))??[])a.globals.add(f);const h=[],c=new Map;function u(f,B,E){let I=c.get(f);if(!I){I={sequence:a.nextSequence(),outNames:new Map,newOuts:new Set},c.set(f,I);for(const y in f.inputs){let Q=f.inputs[y];for(;Q;){if(Q instanceof Da){Q instanceof tn&&u(Q.dyno,Q.key);break}Q=Q.dynoOut()}}h.push(f)}B&&(E||I.newOuts.add(B),I.outNames.set(B,E??`${B}_${I.sequence}`))}for(const f of A.roots)u(f);for(const f in r){let B=(l==null?void 0:l[f])??r[f];for(;B;){if(B instanceof Da){B instanceof tn&&u(B.dyno,B.key,n[f]);break}B=B.dynoOut()}r[f]=B}const d=[];for(const f of h){const B={},E={};for(const Q in f.inputs){let k=f.inputs[Q];for(;k;){if(k instanceof Da){if(k instanceof Ri)B[Q]=k.getLiteral();else if(k instanceof tn){const b=(i=c.get(k.dyno))==null?void 0:i.outNames.get(k.key);if(!b)throw new Error(`Source not found for ${k.dyno.constructor.name}.${k.key}`);B[Q]=b}break}k=k.dynoOut()}}const I=c.get(f)??{outNames:new Map};for(const[Q,k]of I.outNames.entries())E[Q]=k;const y=f.compile({inputs:B,outputs:E,compile:a});d.push(y)}const p=[];for(const f in n)r[f]instanceof Ri&&p.push(`${n[f]} = ${r[f].getLiteral()};`);return p.length>0&&d.push(p),{statements:d.flatMap((f,B)=>B===0?f:["",...f])}}}function ta(e,t,n,{update:a,globals:s}={}){return new Ig({inTypes:e,outTypes:t,construct:n,update:a,globals:s})}function eo({inTypes:e,outTypes:t,inputs:n,update:a,globals:s,statements:i,generate:o}){return new De({inTypes:e,outTypes:t,inputs:n,update:a,globals:s,statements:i,generate:o})}function bl(e,t,n){const a=typeof t=="string"?t:t.type;if(!a)throw new Error(`Invalid DynoType: ${String(t)}`);return`${a} ${e}${n!=null?`[${n}]`:""}`}function Gn(e){var t;let n=!1;const a=e.split(`
`).map(o=>{const r=o.trimEnd();return n?r:r.length>0?(n=!0,r):null}).filter(o=>o!=null);for(;a.length>0&&a[a.length-1].length===0;)a.pop();if(a.length===0)return[];const s=(t=a[0].match(/^\s*/))==null?void 0:t[0];if(!s)return a;const i=new RegExp(`^${s}`);return a.map(o=>o.replace(i,""))}function an(e){return Gn(e).join(`
`)}class no extends De{constructor({a:t,outKey:n,outTypeFunc:a}){const s={a:jn(t)},i=a(jn(t)),o={[n]:i};super({inTypes:s,outTypes:o,inputs:{a:t}}),this.outKey=n}dynoOut(){return new tn(this,this.outKey)}}class ao extends De{constructor({a:t,b:n,outKey:a,outTypeFunc:s}){const i={a:jn(t),b:jn(n)},o=s(jn(t),jn(n)),r={[a]:o};super({inTypes:i,outTypes:r,inputs:{a:t,b:n}}),this.outKey=a}dynoOut(){return new tn(this,this.outKey)}}const be={type:"Gsplat"},so={type:"PackedSplats"},qs=(e,t)=>new Eg({packedSplats:e,index:t}),Cg=(e,t,n,a)=>new Bg({packedSplats:e,index:t,base:n,count:a}),zi=e=>new yg({gsplat:e}),ko=({gsplat:e,flags:t,index:n,center:a,scales:s,quaternion:i,rgba:o,rgb:r,opacity:A,x:l,y:h,z:c,r:u,g:d,b:p})=>new wg({gsplat:e,flags:t,index:n,center:a,scales:s,quaternion:i,rgba:o,rgb:r,opacity:A,x:l,y:h,z:c,r:u,g:d,b:p}),Sl=(e,{scale:t,rotate:n,translate:a,recolor:s})=>new xg({gsplat:e,scale:t,rotate:n,translate:a,recolor:s}),Yn=an(`
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
`),Qr=an(`
  struct PackedSplats {
    usampler2DArray texture;
    int numSplats;
    vec4 rgbMinMaxLnScaleMinMax;
  };
`),Ml=an(`
  bool readPackedSplat(usampler2DArray texture, int numSplats, vec4 rgbMinMaxLnScaleMinMax, int index, out Gsplat gsplat) {
    if ((index >= 0) && (index < numSplats)) {
      uvec4 packed = texelFetch(texture, splatTexCoord(index), 0);
      unpackSplatEncoding(packed, gsplat.center, gsplat.scales, gsplat.quaternion, gsplat.rgba, rgbMinMaxLnScaleMinMax);
      return true;
    } else {
      return false;
    }
  }
`);class Eg extends De{constructor({packedSplats:t,index:n}){super({inTypes:{packedSplats:so,index:"int"},outTypes:{gsplat:be},inputs:{packedSplats:t,index:n},globals:()=>[Yn,Qr,Ml],statements:({inputs:a,outputs:s})=>{const{gsplat:i}=s;if(!i)return[];const{packedSplats:o,index:r}=a;let A;return o&&r?A=Gn(`
            if (readPackedSplat(${o}.texture, ${o}.numSplats, ${o}.rgbMinMaxLnScaleMinMax, ${r}, ${i})) {
              bool zeroSize = all(equal(${i}.scales, vec3(0.0, 0.0, 0.0)));
              ${i}.flags = zeroSize ? 0u : GSPLAT_FLAG_ACTIVE;
            } else {
              ${i}.flags = 0u;
            }
          `):A=[`${i}.flags = 0u;`],A.push(`${i}.index = ${r??"0"};`),A}})}dynoOut(){return new tn(this,"gsplat")}}class Bg extends De{constructor({packedSplats:t,index:n,base:a,count:s}){super({inTypes:{packedSplats:so,index:"int",base:"int",count:"int"},outTypes:{gsplat:be},inputs:{packedSplats:t,index:n,base:a,count:s},globals:()=>[Yn,Qr,Ml],statements:({inputs:i,outputs:o})=>{const{gsplat:r}=o;if(!r)return[];const{packedSplats:A,index:l,base:h,count:c}=i;let u;return A&&l&&h&&c?u=Gn(`
            ${r}.flags = 0u;
            if ((${l} >= ${h}) && (${l} < (${h} + ${c}))) {
              if (readPackedSplat(${A}.texture, ${A}.numSplats, ${A}.rgbMinMaxLnScaleMinMax, ${l}, ${r})) {
                bool zeroSize = all(equal(${r}.scales, vec3(0.0, 0.0, 0.0)));
                ${r}.flags = zeroSize ? 0u : GSPLAT_FLAG_ACTIVE;
              }
            }
          `):u=[`${r}.flags = 0u;`],u.push(`${r}.index = ${l??"0"};`),u}})}dynoOut(){return new tn(this,"gsplat")}}class yg extends De{constructor({gsplat:t}){super({inTypes:{gsplat:be},outTypes:{flags:"uint",active:"bool",index:"int",center:"vec3",scales:"vec3",quaternion:"vec4",rgba:"vec4",rgb:"vec3",opacity:"float",x:"float",y:"float",z:"float",r:"float",g:"float",b:"float"},inputs:{gsplat:t},globals:()=>[Yn],statements:({inputs:n,outputs:a})=>{const{gsplat:s}=n,{flags:i,active:o,index:r,center:A,scales:l,quaternion:h,rgba:c,rgb:u,opacity:d,x:p,y:m,z:f,r:B,g:E,b:I}=a;return[i?`${i} = ${s?`${s}.flags`:"0u"};`:null,o?`${o} = isGsplatActive(${s?`${s}.flags`:"0u"});`:null,r?`${r} = ${s?`${s}.index`:"0"};`:null,A?`${A} = ${s?`${s}.center`:"vec3(0.0, 0.0, 0.0)"};`:null,l?`${l} = ${s?`${s}.scales`:"vec3(0.0, 0.0, 0.0)"};`:null,h?`${h} = ${s?`${s}.quaternion`:"vec4(0.0, 0.0, 0.0, 1.0)"};`:null,c?`${c} = ${s?`${s}.rgba`:"vec4(0.0, 0.0, 0.0, 0.0)"};`:null,u?`${u} = ${s?`${s}.rgba.rgb`:"vec3(0.0, 0.0, 0.0)"};`:null,d?`${d} = ${s?`${s}.rgba.a`:"0.0"};`:null,p?`${p} = ${s?`${s}.center.x`:"0.0"};`:null,m?`${m} = ${s?`${s}.center.y`:"0.0"};`:null,f?`${f} = ${s?`${s}.center.z`:"0.0"};`:null,B?`${B} = ${s?`${s}.rgba.r`:"0.0"};`:null,E?`${E} = ${s?`${s}.rgba.g`:"0.0"};`:null,I?`${I} = ${s?`${s}.rgba.b`:"0.0"};`:null].filter(Boolean)}})}}class wg extends De{constructor({gsplat:t,flags:n,index:a,center:s,scales:i,quaternion:o,rgba:r,rgb:A,opacity:l,x:h,y:c,z:u,r:d,g:p,b:m}){super({inTypes:{gsplat:be,flags:"uint",index:"int",center:"vec3",scales:"vec3",quaternion:"vec4",rgba:"vec4",rgb:"vec3",opacity:"float",x:"float",y:"float",z:"float",r:"float",g:"float",b:"float"},outTypes:{gsplat:be},inputs:{gsplat:t,flags:n,index:a,center:s,scales:i,quaternion:o,rgba:r,rgb:A,opacity:l,x:h,y:c,z:u,r:d,g:p,b:m},globals:()=>[Yn],statements:({inputs:f,outputs:B})=>{const{gsplat:E}=B;if(!E)return[];const{gsplat:I,flags:y,index:Q,center:k,scales:b,quaternion:S,rgba:F,rgb:j,opacity:w,x:_,y:tt,z:G,r:et,g:Y,b:ct}=f;return[`${E}.flags = ${y??(I?`${I}.flags`:"0u")};`,`${E}.index = ${Q??(I?`${I}.index`:"0")};`,`${E}.center = ${k??(I?`${I}.center`:"vec3(0.0, 0.0, 0.0)")};`,`${E}.scales = ${b??(I?`${I}.scales`:"vec3(0.0, 0.0, 0.0)")};`,`${E}.quaternion = ${S??(I?`${I}.quaternion`:"vec4(0.0, 0.0, 0.0, 1.0)")};`,`${E}.rgba = ${F??(I?`${I}.rgba`:"vec4(0.0, 0.0, 0.0, 0.0)")};`,j?`${E}.rgba.rgb = ${j};`:null,w?`${E}.rgba.a = ${w};`:null,_?`${E}.center.x = ${_};`:null,tt?`${E}.center.y = ${tt};`:null,G?`${E}.center.z = ${G};`:null,et?`${E}.rgba.r = ${et};`:null,Y?`${E}.rgba.g = ${Y};`:null,ct?`${E}.rgba.b = ${ct};`:null].filter(Boolean)}})}dynoOut(){return new tn(this,"gsplat")}}an(`
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
`);class xg extends De{constructor({gsplat:t,scale:n,rotate:a,translate:s,recolor:i}){super({inTypes:{gsplat:be,scale:"float",rotate:"vec4",translate:"vec3",recolor:"vec4"},outTypes:{gsplat:be},inputs:{gsplat:t,scale:n,rotate:a,translate:s,recolor:i},globals:()=>[Yn],statements:({inputs:o,outputs:r,compile:A})=>{const{gsplat:l}=r;if(!l||!o.gsplat)return[];const{scale:h,rotate:c,translate:u,recolor:d}=o,p=A.indent;return[`${l} = ${o.gsplat};`,`if (isGsplatActive(${l}.flags)) {`,h?`${p}${l}.center *= ${h};`:null,c?`${p}${l}.center = quatVec(${c}, ${l}.center);`:null,u?`${p}${l}.center += ${u};`:null,h?`${p}${l}.scales *= ${h};`:null,c?`${p}${l}.quaternion = quatQuat(${c}, ${l}.quaternion);`:null,d?`${p}${l}.rgba *= ${d};`:null,"}"].filter(Boolean)}})}dynoOut(){return new tn(this,"gsplat")}}const Qg=(e,t)=>new vg({gsplat:e,rgbMinMaxLnScaleMinMax:t});class vg extends De{constructor({gsplat:t,rgbMinMaxLnScaleMinMax:n}){super({inTypes:{gsplat:be,rgbMinMaxLnScaleMinMax:"vec4"},inputs:{gsplat:t,rgbMinMaxLnScaleMinMax:n},globals:()=>[Yn],statements:({inputs:a,outputs:s})=>{const{output:i}=s;if(!i)return[];const{gsplat:o,rgbMinMaxLnScaleMinMax:r}=a;return o?Gn(`
            if (isGsplatActive(${o}.flags)) {
              ${i} = packSplatEncoding(${o}.center, ${o}.scales, ${o}.quaternion, ${o}.rgba, ${r});
            } else {
              ${i} = uvec4(0u, 0u, 0u, 0u);
            }
          `):[`${i} = uvec4(0u, 0u, 0u, 0u);`]}})}dynoOut(){return new tn(this,"output")}}class bg extends De{constructor({rgba8:t}){super({inTypes:{rgba8:"vec4"},inputs:{rgba8:t},statements:({inputs:n,outputs:a})=>[`target = ${n.rgba8??"vec4(0.0, 0.0, 0.0, 0.0)"};`]})}dynoOut(){return new tn(this,"rgba8")}}class wn extends De{constructor({key:t,type:n,count:a,value:s,update:i,globals:o}){t=t??"value",super({outTypes:{[t]:n},update:()=>{if(i){const r=i(this.value);r!==void 0&&(this.value=r)}this.uniform.value=this.value},generate:({inputs:r,outputs:A})=>{const l=(o==null?void 0:o({inputs:r,outputs:A}))??[],h={},c=A[t];return c&&(l.push(`uniform ${bl(c,n,a)};`),h[c]=this.uniform),{globals:l,uniforms:h}}}),this.type=n,this.count=a,this.value=s,this.uniform={value:s},this.outKey=t}dynoOut(){return new tn(this,this.outKey)}}class fA extends wn{constructor({key:t,value:n,update:a}){super({key:t,type:"bool",value:n,update:a})}}class Zo extends wn{constructor({key:t,value:n,update:a}){super({key:t,type:"int",value:n,update:a})}}class Ks extends wn{constructor({key:t,value:n,update:a}){super({key:t,type:"float",value:n,update:a})}}class Do extends wn{constructor({key:t,value:n,update:a}){super({key:t,type:"vec2",value:n,update:a})}}class Pi extends wn{constructor({key:t,value:n,update:a}){super({key:t,type:"vec3",value:n,update:a})}}class io extends wn{constructor({key:t,value:n,update:a}){super({key:t,type:"vec4",value:n,update:a})}}class To extends wn{constructor({key:t,value:n,update:a}){super({key:t,type:"usampler2DArray",value:n,update:a})}}const vr=new Float32Array(1),kl=new Uint32Array(vr.buffer),br="Float16Array"in globalThis,Hi=br?new globalThis.Float16Array(1):null,Dl=new Uint16Array(Hi==null?void 0:Hi.buffer),_o=br?Sg:Mg,Ro=br?kg:Dg;function Sg(e){return Hi[0]=e,Dl[0]}function Mg(e){vr[0]=e;const t=kl[0],n=t>>31&1,a=t>>23&255,s=t&8388607,i=n<<15;if(a===255)return s!==0?i|32767:i|31744;const o=a-127+15;if(o>=31)return i|31744;if(o<=0){if(o<-10)return i;const A=(s|8388608)>>1-o+13;return i|A}const r=s>>13;return i|o<<10|r}function kg(e){return Dl[0]=e,Hi[0]}function Dg(e){const t=e>>15&1,n=e>>10&31,a=e&1023;let s;if(n===0)if(a===0)s=t<<31;else{let i=a,o=-14;for(;!(i&1024);)i<<=1,o--;i&=1023;const r=o+127,A=i<<13;s=t<<31|r<<23|A}else if(n===31)a===0?s=t<<31|2139095040:s=t<<31|2143289344;else{const i=n-15+127,o=a<<13;s=t<<31|i<<23|o}return kl[0]=s,vr[0]}function wi(e){return Math.max(0,Math.min(255,Math.round(e*255)))}function Tg(e){const t=[],n=new Set;function a(s){s&&typeof s=="object"&&!n.has(s)&&(n.add(s),s instanceof ArrayBuffer?t.push(s):ArrayBuffer.isView(s)?t.push(s.buffer):Array.isArray(s)?s.forEach(a):Object.values(s).forEach(a))}return a(e),t}class _g{constructor({allocate:t,dispose:n,valid:a}){this.items=[],this.allocate=t,this.dispose=n,this.valid=a}alloc(t){for(;;){const n=this.items.pop();if(!n)break;if(this.valid(n,t))return n;this.dispose&&this.dispose(n)}return this.allocate(t)}free(t){this.items.push(t)}disposeAll(){let t;for(t=this.items.pop();t;)this.dispose&&this.dispose(t),t=this.items.pop()}}function dA(e,t,n,a,s,i,o,r,A,l,h,c,u,d,p,m,f){const B=(f==null?void 0:f.rgbMin)??0,I=((f==null?void 0:f.rgbMax)??1)-B,y=wi((d-B)/I),Q=wi((p-B)/I),k=wi((m-B)/I),b=wi(u),S=Og(Rg.set(A,l,h,c)),F=S&255,j=S>>>8&255,w=S>>>16&255,_=(f==null?void 0:f.lnScaleMin)??Zn,G=254/(((f==null?void 0:f.lnScaleMax)??$n)-_),et=i<Mo?0:Math.min(255,Math.max(1,Math.round((Math.log(i)-_)*G)+1)),Y=o<Mo?0:Math.min(255,Math.max(1,Math.round((Math.log(o)-_)*G)+1)),ct=r<Mo?0:Math.min(255,Math.max(1,Math.round((Math.log(r)-_)*G)+1)),ft=_o(n),H=_o(a),pt=_o(s),ht=t*4;e[ht]=y|Q<<8|k<<16|b<<24,e[ht+1]=ft|H<<16,e[ht+2]=pt|F<<16|j<<24,e[ht+3]=et|Y<<8|ct<<16|w<<24}const Rg=new ze,zg=new q,Fg=new q,Ng=new ze,Lg=new Wt,Ug={center:zg,scales:Fg,quaternion:Ng,color:Lg,opacity:0};function pA(e,t,n){const a=Ug,s=t*4,i=e[s],o=e[s+1],r=e[s+2],A=e[s+3],l=(n==null?void 0:n.rgbMin)??0,c=((n==null?void 0:n.rgbMax)??1)-l;a.color.set(l+(i&255)/255*c,l+(i>>>8&255)/255*c,l+(i>>>16&255)/255*c),a.opacity=(i>>>24&255)/255,a.center.set(Ro(o&65535),Ro(o>>>16&65535),Ro(r&65535));const u=(n==null?void 0:n.lnScaleMin)??Zn,p=(((n==null?void 0:n.lnScaleMax)??$n)-u)/254,m=A&255;a.scales.x=m===0?0:Math.exp(u+(m-1)*p);const f=A>>>8&255;a.scales.y=f===0?0:Math.exp(u+(f-1)*p);const B=A>>>16&255;a.scales.z=B===0?0:Math.exp(u+(B-1)*p);const E=r>>>16&65535|A>>>8&16711680;return Vg(E,a.quaternion),a}function un(e){const t=ne,n=Math.max(cg,Math.min(Sa,Math.ceil(e/t))),a=Math.ceil(e/(t*n)),s=t*n*a;return{width:t,height:n,depth:a,maxSplats:s}}function Gg(e){const t=new yr(e.autoStart);return t.startTime=e.startTime,t.oldTime=e.oldTime,t.elapsedTime=e.elapsedTime,t.running=e.running,t}const Yg=an(`
  precision highp float;

  in vec3 position;

  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`);function qg(e){const t=new q;for(const n of e)t.add(n);return t.divideScalar(e.length)}function Pg(e){if(e.length===0)return new ze;const t=e[0].clone();for(let n=1;n<e.length;n++)e[n].dot(e[0])<0?(t.x-=e[n].x,t.y-=e[n].y,t.z-=e[n].z,t.w-=e[n].w):(t.x+=e[n].x,t.y+=e[n].y,t.z+=e[n].z,t.w+=e[n].w);return t.normalize()}function Hg(e,t){const[n,a]=[new q,new ze],[s,i]=[new q,new ze];e.decompose(n,a,new q),t.decompose(s,i,new q);const o=n.distanceTo(s),r=Math.abs(a.dot(i));return{distance:o,coorient:r}}function $o({matrix1:e,matrix2:t,maxDistance:n,minCoorient:a}){const{distance:s,coorient:i}=Hg(e,t);return s<=n&&(a==null||i>=a)}const Jg=new ze,tr=new q;function Og(e){const t=Jg.copy(e).normalize();t.w<0&&t.set(-t.x,-t.y,-t.z,-t.w);const n=2*Math.acos(t.w),a=Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z),s=a<1e-6?tr.set(1,0,0):tr.set(t.x,t.y,t.z).divideScalar(a),i=Math.abs(s.x)+Math.abs(s.y)+Math.abs(s.z);let o=s.x/i,r=s.y/i;if(s.z<0){const d=o;o=(1-Math.abs(r))*(o>=0?1:-1),r=(1-Math.abs(d))*(r>=0?1:-1)}const A=o*.5+.5,l=r*.5+.5,h=Math.round(A*255),c=Math.round(l*255);return Math.round(n*(255/Math.PI))<<16|c<<8|h}function Vg(e,t){const n=e&255,a=e>>>8&255,s=e>>>16&255,i=n/255,o=a/255;let r=(i-.5)*2,A=(o-.5)*2;const l=1-(Math.abs(r)+Math.abs(A)),h=Math.max(-l,0);r+=r>=0?-h:h,A+=A>=0?-h:h;const c=tr.set(r,A,l).normalize(),d=s/255*Math.PI*.5,p=Math.sin(d),m=Math.cos(d);return t.set(c.x*p,c.y*p,c.z*p,m),t}function jg(e,t){const n=[];let a=0,s=null;const i=new Vu((A,l)=>{if(n.push(A),a+=A.length,l||a>=t){const h=new Uint8Array(a);let c=0;for(const u of n)h.set(u,c),c+=u.length;s=h.slice(0,t)}}),o=1024;let r=0;for(;s==null&&r<e.length;){const A=e.slice(r,r+o);i.push(A,!1),r+=o}if(s==null&&(i.push(new Uint8Array,!0),s==null))throw new Error("Failed to decompress partial gzip");return s}class Tl{constructor({graph:t,inputs:n,outputs:a,template:s}){this.graph=t,this.template=s,this.inputs=n??{},this.outputs=a??{};const i=new mg({indent:this.template.indent});for(const r in this.outputs)this.outputs[r]&&i.declares.add(this.outputs[r]);const o=t.compile({inputs:this.inputs,outputs:this.outputs,compile:i});this.shader=s.generate({globals:i.globals,statements:o}),this.uniforms=i.uniforms,this.updaters=i.updaters}prepareMaterial(){return Wg(this)}update(){for(const t of this.updaters)t()}}class _l{constructor(t){const n=t.match(/^([ \t]*)\{\{\s*GLOBALS\s*\}\}/m),a=t.match(/^([ \t]*)\{\{\s*STATEMENTS\s*\}\}/m);if(!n||!a)throw new Error("Template must contain {{ GLOBALS }} and {{ STATEMENTS }}");this.before=t.substring(0,n.index),this.between=t.substring(n.index+n[0].length,a.index),this.after=t.substring(a.index+a[0].length),this.indent=a[1]}generate({globals:t,statements:n}){return this.before+Array.from(t).join(`

`)+this.between+n.map(a=>this.indent+a).join(`
`)+this.after}}const mA=new Map;function Wg(e){let t=mA.get(e);return t||(t=new Er({glslVersion:al,vertexShader:Yg,fragmentShader:e.shader,uniforms:e.uniforms}),mA.set(e,t),t)}function Rl(e,t,n="add"){const a=()=>{throw new Error(`Invalid ${n} types: ${e}, ${t}`)};if(e===t)return e;if(e==="int"){if(Ma(t))return t;a()}if(t==="int"){if(Ma(e))return e;a()}if(e==="uint"){if(ka(t))return t;a()}if(t==="uint"){if(ka(e))return e;a()}if(e==="float"){if(Xs(t))return t;a()}if(t==="float"){if(Xs(e))return e;a()}throw new Error(`Invalid ${n} types: ${e}, ${t}`)}function Xg(e,t){return Rl(e,t,"sub")}function Kg(e,t){const n=()=>{throw new Error(`Invalid mul types: ${e}, ${t}`)},a=s=>s;if(e==="int"){if(Ma(t))return a(t);n()}if(t==="int"){if(Ma(e))return a(e);n()}if(e==="uint"){if(ka(t))return a(t);n()}if(t==="uint"){if(ka(e))return a(e);n()}if(e==="float"){if(Xs(t))return a(t);n()}if(t==="float"){if(Xs(e))return a(e);n()}if(Ma(e)||ka(e)||Ma(t)||ka(t)){if(e===t)return a(e);n()}if(e==="vec2"){if(t==="vec2"||ja(t))return a("vec2");if(t==="mat3x2")return a("vec3");if(t==="mat4x2")return a("vec4");n()}if(e==="vec3"){if(t==="mat2x3")return a("vec2");if(t==="vec3"||Wa(t))return a("vec3");if(t==="mat4x3")return a("vec4");n()}if(e==="vec4"){if(t==="mat2x4")return a("vec2");if(t==="mat3x4")return a("vec3");if(t==="vec4"||Xa(t))return a("vec4");n()}if(t==="vec2"){if(ja(e))return a("vec2");if(e==="mat2x3")return a("vec3");if(e==="mat2x4")return a("vec4");n()}if(t==="vec3"){if(e==="mat3x2")return a("vec2");if(Wa(e))return a("vec3");if(e==="mat3x4")return a("vec4");n()}if(t==="vec4"){if(e==="mat4x2")return a("vec2");if(e==="mat4x3")return a("vec3");if(Xa(e))return a("vec4");n()}if(ja(e)){if(ja(t))return a("mat2");if(t==="mat3x2")return a("mat3x2");if(t==="mat4x2")return a("mat4x2");n()}if(e==="mat2x3"){if(ja(t))return a("mat2x3");if(t==="mat3x2")return a("mat3");if(t==="mat4x2")return a("mat4x3");n()}if(e==="mat2x4"){if(ja(t))return a("mat2x4");if(t==="mat3x2")return a("mat3x4");if(t==="mat4x2")return a("mat4");n()}if(e==="mat3x2"){if(t==="mat2x3")return a("mat2");if(Wa(t))return a("mat3x2");if(t==="mat4x3")return a("mat4x2");n()}if(Wa(e)){if(t==="mat2x3")return a("mat2x3");if(Wa(t))return a("mat3");if(t==="mat4x3")return a("mat4x3");n()}if(e==="mat3x4"){if(t==="mat2x3")return a("mat2x4");if(Wa(t))return a("mat3x4");if(t==="mat4x3")return a("mat4");n()}if(e==="mat4x2"){if(t==="mat2x4")return a("mat2");if(t==="mat3x4")return a("mat3x2");if(Xa(t))return a("mat4x2");n()}if(e==="mat4x3"){if(t==="mat2x4")return a("mat2x3");if(t==="mat3x4")return a("mat3");if(Xa(t))return a("mat4x3");n()}if(Xa(e)){if(t==="mat2x4")return a("mat2x4");if(t==="mat3x4")return a("mat3x4");if(Xa(t))return a("mat4");n()}throw new Error(`Invalid mul types: ${e}, ${t}`)}const xa=(e,t)=>new Zg({a:e,b:t}),IA=(e,t)=>new $g({a:e,b:t}),ks=(e,t)=>new t0({a:e,b:t});class Zg extends ao{constructor({a:t,b:n}){super({a:t,b:n,outKey:"sum",outTypeFunc:Rl}),this.statements=({inputs:a,outputs:s})=>[`${s.sum} = ${a.a} + ${a.b};`]}}class $g extends ao{constructor({a:t,b:n}){super({a:t,b:n,outKey:"difference",outTypeFunc:Xg}),this.statements=({inputs:a,outputs:s})=>[`${s.difference} = ${a.a} - ${a.b};`]}}class t0 extends ao{constructor({a:t,b:n}){super({a:t,b:n,outKey:"product",outTypeFunc:Kg}),this.statements=({inputs:a,outputs:s})=>[`${s.product} = ${a.a} * ${a.b};`]}}const e0=e=>new a0({value:e}),n0=e=>new s0({value:e}),CA=e=>new i0({value:e});class a0 extends no{constructor({value:t}){super({a:t,outKey:"uint",outTypeFunc:()=>"uint"}),this.statements=({inputs:n,outputs:a})=>[`${a.uint} = floatBitsToUint(${n.a});`]}}class s0 extends no{constructor({value:t}){super({a:t,outKey:"uint",outTypeFunc:()=>"uint"}),this.statements=({inputs:n,outputs:a})=>[`${a.uint} = packHalf2x16(${n.a});`]}}class i0 extends no{constructor({value:t}){super({a:t,outKey:"rgba8",outTypeFunc:()=>"vec4"}),this.statements=({inputs:n,outputs:a})=>[`uvec4 uRgba = uvec4(${n.a} & 0xffu, (${n.a} >> 8u) & 0xffu, (${n.a} >> 16u) & 0xffu, (${n.a} >> 24u) & 0xffu);`,`${a.rgba8} = vec4(uRgba) / 255.0;`]}}const o0=e=>new c0({a:e}),r0=e=>new f0({vector:e}),A0=({vector:e,vectorType:t,x:n,y:a,z:s,w:i,r:o,g:r,b:A,a:l})=>new d0({vector:e,vectorType:t,x:n,y:a,z:s,w:i,r:o,g:r,b:A,a:l}),l0=(e,t)=>new u0({a:e,b:t});class c0 extends no{constructor({a:t}){super({a:t,outTypeFunc:n=>n,outKey:"normalize"}),this.statements=({inputs:n,outputs:a})=>[`${a.normalize} = normalize(${n.a});`]}}function h0(e){if(e==="float")return"vec2";if(e==="vec2")return"vec3";if(e==="vec3")return"vec4";throw new Error("Invalid type")}class u0 extends ao{constructor({a:t,b:n}){const a=jn(t),s=h0(a);super({a:t,b:n,outKey:"extend",outTypeFunc:()=>s}),this.statements=({inputs:i,outputs:o})=>[`${o.extend} = ${s}(${i.a}, ${i.b});`]}}function g0(e){const t=n=>n;switch(e){case"vec2":return t({x:"float",y:"float",r:"float",g:"float"});case"vec3":return t({x:"float",y:"float",z:"float",r:"float",g:"float",b:"float"});case"vec4":return t({x:"float",y:"float",z:"float",w:"float",r:"float",g:"float",b:"float",a:"float"});case"ivec2":return t({x:"int",y:"int",r:"int",g:"int"});case"ivec3":return t({x:"int",y:"int",z:"int",r:"int",g:"int",b:"int"});case"ivec4":return t({x:"int",y:"int",z:"int",w:"int",r:"int",g:"int",b:"int",a:"int"});case"uvec2":return t({x:"uint",y:"uint",r:"uint",g:"uint"});case"uvec3":return t({x:"uint",y:"uint",z:"uint",r:"uint",g:"uint",b:"uint"});case"uvec4":return t({x:"uint",y:"uint",z:"uint",w:"uint",r:"uint",g:"uint",b:"uint",a:"uint"});default:throw new Error(`Invalid vector type: ${e}`)}}class f0 extends De{constructor({vector:t}){const a={vector:jn(t)},s=g0(a.vector);super({inTypes:a,outTypes:s,inputs:{vector:t}}),this.statements=({inputs:i,outputs:o})=>{const{x:r,y:A,z:l,w:h,r:c,g:u,b:d,a:p}=o,{vector:m}=i;return[r?`${r} = ${m}.x;`:null,A?`${A} = ${m}.y;`:null,l?`${l} = ${m}.z;`:null,h?`${h} = ${m}.w;`:null,c?`${c} = ${m}.r;`:null,u?`${u} = ${m}.g;`:null,d?`${d} = ${m}.b;`:null,p?`${p} = ${m}.a;`:null].filter(Boolean)}}}class d0 extends De{constructor({vector:t,vectorType:n,x:a,y:s,z:i,w:o,r,g:A,b:l,a:h}){if(!t&&!n)throw new Error("Either vector or vectorType must be provided");const c=n??jn(t),u=fg(c),d=dg(c),p={vector:c,x:u,y:u,r:u,g:u},m={vector:t,x:a,y:s,r,g:A};d>=3&&(Object.assign(p,{z:u,b:u}),Object.assign(m,{z:i,b:l})),d>=4&&(Object.assign(p,{w:u,a:u}),Object.assign(m,{w:o,a:h})),super({inTypes:p,outTypes:{vector:c},inputs:m}),this.statements=({inputs:f,outputs:B})=>{const{vector:E}=B,{vector:I,x:y,y:Q,z:k,w:b,r:S,g:F,b:j,a:w}=f,_=[`${E}.x = ${y??S??(I?`${I}.x`:yi(u))};`,`${E}.y = ${Q??F??(I?`${I}.y`:yi(u))};`];return d>=3&&_.push(`${E}.z = ${k??j??(I?`${I}.z`:yi(u))};`),d>=4&&_.push(`${E}.w = ${b??w??(I?`${I}.w`:yi(u))};`),_}}dynoOut(){return new tn(this,"vector")}}const p0=(e,{scale:t,scales:n,rotate:a,translate:s})=>new I0({position:e,scale:t,scales:n,rotate:a,translate:s}).outputs.position,m0=(e,{scale:t,scales:n,rotate:a})=>new C0({dir:e,scale:t,scales:n,rotate:a}).outputs.dir;class I0 extends De{constructor({position:t,scale:n,scales:a,rotate:s,translate:i}){super({inTypes:{position:"vec3",scale:"float",scales:"vec3",rotate:"vec4",translate:"vec3"},outTypes:{position:"vec3"},inputs:{position:t,scale:n,scales:a,rotate:s,translate:i},statements:({inputs:o,outputs:r})=>{const{position:A}=r;if(!A)return[];const{scale:l,scales:h,rotate:c,translate:u}=o;return[`${A} = ${o.position??"vec3(0.0, 0.0, 0.0)"};`,l?`${A} *= ${l};`:null,h?`${A} *= ${h};`:null,c?`${A} = quatVec(${c}, ${A});`:null,u?`${A} += ${u};`:null].filter(Boolean)}})}}class C0 extends De{constructor({dir:t,scale:n,scales:a,rotate:s}){super({inTypes:{dir:"vec3",scale:"float",scales:"vec3",rotate:"vec4"},outTypes:{dir:"vec3"},inputs:{dir:t,scale:n,scales:a,rotate:s},statements:({inputs:i,outputs:o})=>{const{dir:r}=o;if(!r)return[];const{scale:A,scales:l,rotate:h}=i;return[`${r} = ${i.dir??"vec3(0.0, 0.0, 0.0)"};`,A?`${r} *= ${A};`:null,l?`${r} *= ${l};`:null,h?`${r} = quatVec(${h}, ${r});`:null].filter(Boolean)}})}}var E0=`precision highp float;
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
}`;const oo=class ca{constructor({renderer:t}={}){this.renderer=t,this.capacity=0,this.count=0}dispose(){this.target&&(this.target.dispose(),this.target=void 0)}ensureBuffer(t,n){const s=Math.ceil(Math.max(1,t)/ne)*ne*4;if(n.byteLength>=s)return n;const i=new ArrayBuffer(s);if(n instanceof ArrayBuffer)return i;const o=n.constructor;return new o(i)}ensureCapacity(t){const{width:n,height:a,depth:s,maxSplats:i}=un(t);(!this.target||i>this.capacity)&&(this.dispose(),this.capacity=i,this.target=new ol(n,a,s,{depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,magFilter:pa,minFilter:pa}),this.target.texture.format=La,this.target.texture.type=fs,this.target.texture.internalFormat="RGBA8",this.target.scissorTest=!0)}prepareProgramMaterial(t){let n=ca.readbackProgram.get(t);if(!n){const s=ta({index:"int"},{rgba8:"vec4"},({index:i})=>(t.inputs.index=i,{rgba8:new bg({rgba8:t.outputs.rgba8})}));ca.programTemplate||(ca.programTemplate=new _l(E0)),n=new Tl({graph:s,inputs:{index:"index"},outputs:{rgba8:"target"},template:ca.programTemplate}),Object.assign(n.uniforms,{targetLayer:{value:0},targetBase:{value:0},targetCount:{value:0}}),ca.readbackProgram.set(t,n)}const a=n.prepareMaterial();return ca.fullScreenQuad.material=a,{program:n,material:a}}saveRenderState(t){return{xrEnabled:t.xr.enabled,autoClear:t.autoClear}}resetRenderState(t,n){t.setRenderTarget(null),t.xr.enabled=n.xrEnabled,t.autoClear=n.autoClear}process({count:t,material:n}){const a=this.renderer;if(!a)throw new Error("No renderer");if(!this.target)throw new Error("No target");const s=ne*Sa;n.uniforms.targetBase.value=0,n.uniforms.targetCount.value=t;let i=0;for(;i<t;){const o=Math.floor(i/s),r=o*s,A=Math.min(Sa,Math.ceil((t-r)/ne));n.uniforms.targetLayer.value=o,this.target.scissor.set(0,0,ne,A),a.setRenderTarget(this.target,o),a.xr.enabled=!1,a.autoClear=!1,ca.fullScreenQuad.render(a),i+=ne*A}this.count=t}async read({readback:t}){const n=this.renderer;if(!n)throw new Error("No renderer");if(!this.target)throw new Error("No target");const a=Math.ceil(this.count/ne)*ne;if(t.byteLength<a*4)throw new Error(`Readback buffer too small: ${t.byteLength} < ${a*4}`);const s=new Uint8Array(t instanceof ArrayBuffer?t:t.buffer),i=ne*Sa;let o=0;const r=[];for(;o<this.count;){const A=Math.floor(o/i),l=A*i,h=Math.min(Sa,Math.ceil((this.count-l)/ne));n.setRenderTarget(this.target,A);const c=ne*h*4,u=s.subarray(l*4,l*4+c),d=n==null?void 0:n.readRenderTargetPixelsAsync(this.target,0,0,ne,h,u);r.push(d),o+=ne*h}return Promise.all(r).then(()=>t)}render({reader:t,count:n,renderer:a}){if(this.renderer=a||this.renderer,!this.renderer)throw new Error("No renderer");this.ensureCapacity(n);const{program:s,material:i}=this.prepareProgramMaterial(t);s.update();const o=this.saveRenderState(this.renderer);this.process({count:n,material:i}),this.resetRenderState(this.renderer,o)}async readback({readback:t}){if(!this.renderer)throw new Error("No renderer");const n=this.saveRenderState(this.renderer),a=this.read({readback:t});return this.resetRenderState(this.renderer,n),a}async renderReadback({reader:t,count:n,renderer:a,readback:s}){if(this.renderer=a||this.renderer,!this.renderer)throw new Error("No renderer");this.ensureCapacity(n);const{program:i,material:o}=this.prepareProgramMaterial(t);i.update();const r=this.saveRenderState(this.renderer);this.process({count:n,material:o});const A=this.read({readback:s});return this.resetRenderState(this.renderer,r),A}getTexture(){var t;return(t=this.target)==null?void 0:t.texture}};oo.programTemplate=null;oo.readbackProgram=new Map;oo.fullScreenQuad=new dl(new Er({visible:!1}));let zl=oo;const Sr=class Pe{constructor(t={}){this.capacity=0,this.count=0,this.array=null,this.readback=null,this.source=null,this.needsUpdate=!0,this.dyno=new wn({key:"rgbaArray",type:Fl,globals:()=>[Nl],value:{texture:Pe.getEmpty(),count:0},update:n=>{var a;return n.texture=((a=this.readback)==null?void 0:a.getTexture())??this.source??Pe.getEmpty(),n.count=this.count,n}}),t.array?(this.array=t.array,this.capacity=Math.floor(this.array.length/4),this.capacity=Math.floor(this.capacity/ne)*ne,this.count=Math.min(this.capacity,t.count??Number.POSITIVE_INFINITY)):(this.capacity=t.capacity??0,this.count=0)}dispose(){this.readback&&(this.readback.dispose(),this.readback=null),this.source&&(this.source.dispose(),this.source=null)}ensureCapacity(t){var n;if(!this.array||t>(((n=this.array)==null?void 0:n.length)??0)/4){this.capacity=un(t).maxSplats;const a=new Uint8Array(this.capacity*4);this.array&&a.set(this.array),this.array=a}return this.array}getTexture(){var t;let n=(t=this.readback)==null?void 0:t.getTexture();return(this.source||this.array)&&(n=this.maybeUpdateSource()),n??Pe.getEmpty()}maybeUpdateSource(){if(!this.array)throw new Error("No array");if(this.needsUpdate||!this.source){if(this.needsUpdate=!1,this.source){const{width:t,height:n,depth:a}=this.source.image;this.capacity!==t*n*a&&(this.source.dispose(),this.source=null)}if(this.source)this.array.buffer!==this.source.image.data.buffer&&(this.source.image.data=new Uint8Array(this.array.buffer));else{const{width:t,height:n,depth:a}=un(this.capacity);this.source=new za(this.array,t,n,a),this.source.format=La,this.source.type=fs,this.source.internalFormat="RGBA8",this.source.needsUpdate=!0}this.source.needsUpdate=!0}return this.source}render({reader:t,count:n,renderer:a}){this.readback||(this.readback=new zl({renderer:a})),this.readback.render({reader:t,count:n,renderer:a}),this.capacity=this.readback.capacity,this.count=this.readback.count}fromPackedSplats({packedSplats:t,base:n,count:a,renderer:s}){const{dynoSplats:i,dynoBase:o,dynoCount:r,reader:A}=Pe.makeDynos();return i.packedSplats=t,o.value=n,r.value=a,this.render({reader:A,count:a,renderer:s}),this}async read(){if(!this.readback)throw new Error("No readback");return(!this.array||this.array.length<this.count*4)&&(this.array=new Uint8Array(this.capacity*4)),(await this.readback.readback({readback:this.array})).subarray(0,this.count*4)}static getEmpty(){if(!Pe.emptySource){const t=new Uint8Array(4);Pe.emptySource=new za(t,1,1,1),Pe.emptySource.format=La,Pe.emptySource.type=fs,Pe.emptySource.internalFormat="RGBA8",Pe.emptySource.needsUpdate=!0}return Pe.emptySource}static makeDynos(){if(!Pe.dynos){const t=new Dr,n=new Zo({value:0}),a=new Zo({value:0}),s=ta({index:"int"},{rgba8:"vec4"},({index:i})=>{if(!i)throw new Error("index is undefined");i=xa(i,n);const o=Cg(t,i,n,a);return{rgba8:zi(o).outputs.rgba}});Pe.dynos={dynoSplats:t,dynoBase:n,dynoCount:a,reader:s}}return Pe.dynos}};Sr.emptySource=null;Sr.dynos=null;let B0=Sr;const Fl={type:"RgbaArray"},Nl=an(`
  struct RgbaArray {
    sampler2DArray texture;
    int count;
  };
`);function y0(e,t){return new De({inTypes:{rgba:Fl,index:"int"},outTypes:{rgba:"vec4"},inputs:{rgba:e,index:t},globals:()=>[Nl],statements:({inputs:a,outputs:s})=>Gn(`
        if ((index >= 0) && (index < ${a.rgba}.count)) {
          ${s.rgba} = texelFetch(${a.rgba}.texture, splatTexCoord(index), 0);
        } else {
          ${s.rgba} = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `)}).outputs.rgba}function w0(e){switch(e){case"all":return 0;case"plane":return 1;case"sphere":return 2;case"box":return 3;case"ellipsoid":return 4;case"cylinder":return 5;case"capsule":return 6;case"infinite_cone":return 7;default:throw new Error(`Unknown SDF type: ${e}`)}}function x0(e){switch(e){case"multiply":return 0;case"set_rgb":return 1;case"add_rgba":return 2;default:throw new Error(`Unknown blend mode: ${e}`)}}class Q0 extends $i{constructor(t={}){super();const{type:n,invert:a,opacity:s,color:i,displace:o,radius:r}=t;this.type=n??"sphere",this.invert=a??!1,this.opacity=s??1,this.color=i??new Wt(1,1,1),this.displace=o??new q(0,0,0),this.radius=r??0}}const Ll=class Ul extends $i{constructor(t={}){const{name:n,rgbaBlendMode:a="multiply",sdfSmooth:s=0,softEdge:i=0,invert:o=!1,sdfs:r=null}=t;super(),this.rgbaBlendMode=a,this.sdfSmooth=s,this.softEdge=i,this.invert=o,this.sdfs=r,this.ordering=Ul.nextOrdering++,this.name=n??`Edit ${this.ordering}`}addSdf(t){this.sdfs==null&&(this.sdfs=[]),this.sdfs.includes(t)||this.sdfs.push(t)}removeSdf(t){this.sdfs!=null&&(this.sdfs=this.sdfs.filter(n=>n!==t))}};Ll.nextOrdering=1;let Gl=Ll;class v0{constructor({maxSdfs:t,maxEdits:n}){this.maxSdfs=Math.max(16,t??0),this.numSdfs=0,this.sdfData=new Uint32Array(this.maxSdfs*8*4),this.sdfFloatData=new Float32Array(this.sdfData.buffer),this.sdfTexture=this.newSdfTexture(this.sdfData,this.maxSdfs),this.dynoSdfArray=new wn({key:"sdfArray",type:Yl,globals:()=>[ql],value:{numSdfs:0,sdfTexture:this.sdfTexture},update:a=>(a.numSdfs=this.numSdfs,a.sdfTexture=this.sdfTexture,a)}),this.maxEdits=Math.max(16,n??0),this.numEdits=0,this.editData=new Uint32Array(this.maxEdits*4),this.editFloatData=new Float32Array(this.editData.buffer),this.dynoNumEdits=new Zo({value:0}),this.dynoEdits=this.newEdits(this.editData,this.maxEdits)}newSdfTexture(t,n){const a=new wr(t,8,n,is,Fa);return a.internalFormat="RGBA32UI",a.needsUpdate=!0,a}newEdits(t,n){return new wn({key:"edits",type:"uvec4",count:n,globals:()=>[Pl],value:t})}ensureCapacity({maxSdfs:t,maxEdits:n}){let a=!1;return t>this.sdfTexture.image.height&&(this.sdfTexture.dispose(),this.maxSdfs=Math.max(this.maxSdfs*2,t),this.sdfData=new Uint32Array(this.maxSdfs*8*4),this.sdfFloatData=new Float32Array(this.sdfData.buffer),this.sdfTexture=this.newSdfTexture(this.sdfData,this.maxSdfs)),n>(this.dynoEdits.count??0)&&(this.maxEdits=Math.max(this.maxEdits*2,n),this.editData=new Uint32Array(this.maxEdits*4),this.editFloatData=new Float32Array(this.editData.buffer),this.dynoEdits=this.newEdits(this.editData,this.maxEdits),a=!0),a}updateEditData(t,n){const a=this.editData[t]!==n;return this.editData[t]=n,a}updateEditFloatData(t,n){Ka[0]=n;const a=this.editFloatData[t]!==Ka[0];return a&&(this.editFloatData[t]=Ka[0]),a}encodeEdit(t,{sdfFirst:n,sdfCount:a,invert:s,rgbaBlendMode:i,softEdge:o,sdfSmooth:r}){const A=t*4;let l=!1;return l=this.updateEditData(A+0,i|(s?256:0))||l,l=this.updateEditData(A+1,n|a<<16)||l,l=this.updateEditFloatData(A+2,o)||l,l=this.updateEditFloatData(A+3,r)||l,l}updateSdfData(t,n){const a=this.sdfData[t]!==n;return this.sdfData[t]=n,a}updateSdfFloatData(t,n){Ka[0]=n;const a=this.sdfFloatData[t]!==Ka[0];return a&&(this.sdfFloatData[t]=Ka[0]),a}encodeSdf(t,{sdfType:n,invert:a,center:s,quaternion:i,scale:o,sizes:r},A){const l=t*32,h=n|(a?256:0);let c=!1;c=this.updateSdfFloatData(l+0,(s==null?void 0:s.x)??0)||c,c=this.updateSdfFloatData(l+1,(s==null?void 0:s.y)??0)||c,c=this.updateSdfFloatData(l+2,(s==null?void 0:s.z)??0)||c,c=this.updateSdfData(l+3,h)||c,c=this.updateSdfFloatData(l+4,(i==null?void 0:i.x)??0)||c,c=this.updateSdfFloatData(l+5,(i==null?void 0:i.y)??0)||c,c=this.updateSdfFloatData(l+6,(i==null?void 0:i.z)??0)||c,c=this.updateSdfFloatData(l+7,(i==null?void 0:i.w)??0)||c,c=this.updateSdfFloatData(l+8,(o==null?void 0:o.x)??0)||c,c=this.updateSdfFloatData(l+9,(o==null?void 0:o.y)??0)||c,c=this.updateSdfFloatData(l+10,(o==null?void 0:o.z)??0)||c,c=this.updateSdfData(l+11,0)||c,c=this.updateSdfFloatData(l+12,(r==null?void 0:r.x)??0)||c,c=this.updateSdfFloatData(l+13,(r==null?void 0:r.y)??0)||c,c=this.updateSdfFloatData(l+14,(r==null?void 0:r.z)??0)||c,c=this.updateSdfFloatData(l+15,(r==null?void 0:r.w)??0)||c;const u=Math.min(4,A.length);for(let d=0;d<u;++d){const p=l+16+d*4;c=this.updateSdfFloatData(p+0,A[d].x)||c,c=this.updateSdfFloatData(p+1,A[d].y)||c,c=this.updateSdfFloatData(p+2,A[d].z)||c,c=this.updateSdfFloatData(p+3,A[d].w)||c}return c}update(t){const n=t.reduce((c,{sdfs:u})=>c+u.length,0),a=this.ensureCapacity({maxEdits:t.length,maxSdfs:n}),s=[new yn,new yn],i=new q,o=new ze,r=new q,A=new yn;let l=0,h=a;t.length!==this.dynoNumEdits.value&&(this.dynoNumEdits.value=t.length,this.numEdits=t.length,h=!0);for(const[c,{edit:u,sdfs:d}]of t.entries()){h=this.encodeEdit(c,{sdfFirst:l,sdfCount:d.length,invert:u.invert,rgbaBlendMode:x0(u.rgbaBlendMode),softEdge:u.softEdge,sdfSmooth:u.sdfSmooth})||h;let p=!1;for(const m of d)A.set(m.scale.x,m.scale.y,m.scale.z,m.radius),m.scale.setScalar(1),m.updateMatrixWorld(),m.matrixWorld.clone().invert().decompose(i,o,r),m.scale.set(A.x,A.y,A.z),m.updateMatrixWorld(),s[0].set(m.color.r,m.color.g,m.color.b,m.opacity),s[1].set(m.displace.x,m.displace.y,m.displace.z,1),p=this.encodeSdf(l,{sdfType:w0(m.type),invert:m.invert,center:i,quaternion:o,scale:r,sizes:A},s)||p,l+=1;this.numSdfs=l,p&&(this.sdfTexture.needsUpdate=!0),h||(h=p)}return{updated:h,dynoUpdated:a}}modify(t){return b0(t,this.dynoSdfArray,this.dynoNumEdits,this.dynoEdits)}}const Yl={type:"SdfArray"},ql=an(`
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
`),Pl=an(`
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
`);function b0(e,t,n,a){return new De({inTypes:{gsplat:be,sdfArray:Yl,numEdits:"int",rgbaDisplaceEdits:"uvec4"},outTypes:{gsplat:be},globals:()=>[ql,Pl],inputs:{gsplat:e,sdfArray:t,numEdits:n,rgbaDisplaceEdits:a},statements:({inputs:i,outputs:o})=>{const{sdfArray:r,numEdits:A,rgbaDisplaceEdits:l}=i,{gsplat:h}=o;return Gn(`
        ${h} = ${i.gsplat};
        if (isGsplatActive(${h}.flags)) {
          for (int editIndex = 0; editIndex < ${A}; ++editIndex) {
            applyPackedRgbaDisplaceEdit(
              ${l}[editIndex], ${r}.sdfTexture, ${r}.numSdfs,
              ${h}.center, ${h}.rgba
            );
          }
        }
      `)}}).outputs.gsplat}const Ka=new Float32Array(1);class S0{constructor(t){this.modifier=t,this.cache=new Map}apply(t){let n=this.cache.get(t);return n||(n=ta({index:"int"},{gsplat:be},({index:a})=>{const{gsplat:s}=t.apply({index:a});return this.modifier.apply({gsplat:s})}),this.cache.set(t,n)),n}}class xi{constructor(){this.scale=new Ks({value:Number.NEGATIVE_INFINITY}),this.rotate=new io({value:new ze(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY)}),this.translate=new Pi({value:new q(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY)})}apply(t){return p0(t,{scale:this.scale,rotate:this.rotate,translate:this.translate})}applyDir(t){return m0(t,{rotate:this.rotate})}applyGsplat(t){return Sl(t,{scale:this.scale,rotate:this.rotate,translate:this.translate})}updateFromMatrix(t){const n=new q,a=new ze,s=new q;t.decompose(s,a,n);const i=(n.x+n.y+n.z)/3;let o=!1;return i!==this.scale.value&&(this.scale.value=i,o=!0),s.equals(this.translate.value)||(this.translate.value.copy(s),o=!0),a.equals(this.rotate.value)||(this.rotate.value.copy(a),o=!0),o}update(t){return t.updateMatrixWorld(),this.updateFromMatrix(t.matrixWorld)}}class er extends $i{constructor({numSplats:t,generator:n,construct:a,update:s}){if(super(),this.numSplats=t??0,this.generator=n,this.frameUpdate=s,this.version=0,a){const i=a(this);Object.assign(this,i)}}updateVersion(){this.version+=1}set needsUpdate(t){t&&this.updateVersion()}}const Zs=class nr extends er{constructor(t={}){const n=new xi,a=new xi,s=new xi,i=new xi,o=new io({value:new yn(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY)}),r=new Ks({value:0}),A=new Ks({value:0}),l={transform:n,viewToWorld:a,worldToView:s,viewToObject:i,recolor:o,time:r,deltaTime:A};if(super({update:({time:h,deltaTime:c,viewToWorld:u,globalEdits:d})=>this.update({time:h,deltaTime:c,viewToWorld:u,globalEdits:d})}),this.isInitialized=!1,this.recolor=new Wt(1,1,1),this.opacity=1,this.enableViewToObject=!1,this.enableViewToWorld=!1,this.enableWorldToView=!1,this.skinning=null,this.edits=null,this.rgbaDisplaceEdits=null,this.splatRgba=null,this.maxSh=3,this.packedSplats=t.packedSplats??new Ua,this.packedSplats.splatEncoding=t.splatEncoding??{...ro},this.numSplats=this.packedSplats.numSplats,this.editable=t.editable??!0,this.onFrame=t.onFrame,this.context=l,this.objectModifier=t.objectModifier,this.worldModifier=t.worldModifier,this.updateGenerator(),t.url||t.fileBytes||t.constructSplats||t.packedSplats&&!t.packedSplats.isInitialized)this.initialized=this.asyncInitialize(t).then(async()=>{if(this.updateGenerator(),this.isInitialized=!0,t.onLoad){const h=t.onLoad(this);h instanceof Promise&&await h}return this});else if(this.isInitialized=!0,this.initialized=Promise.resolve(this),t.onLoad){const h=t.onLoad(this);h instanceof Promise&&(this.initialized=h.then(()=>this))}this.add(N0())}async asyncInitialize(t){const{url:n,fileBytes:a,fileType:s,fileName:i,maxSplats:o,constructSplats:r,splatEncoding:A}=t;if(n||a||r){const l={url:n,fileBytes:a,fileType:s,fileName:i,maxSplats:o,construct:r,splatEncoding:A};this.packedSplats.reinitialize(l)}this.packedSplats&&(await this.packedSplats.initialized,this.numSplats=this.packedSplats.numSplats,this.updateGenerator())}static async staticInitialize(){await vl(),nr.isStaticInitialized=!0}pushSplat(t,n,a,s,i){this.packedSplats.pushSplat(t,n,a,s,i)}forEachSplat(t){this.packedSplats.forEachSplat(t)}dispose(){this.packedSplats.dispose()}getBoundingBox(t=!0){if(!this.initialized)throw new Error("Cannot get bounding box before SplatMesh is initialized");const n=new q(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),a=new q(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY),s=new q,i=[-1,1];return this.packedSplats.forEachSplat((r,A,l,h,c,u)=>{if(t)n.min(A),a.max(A);else for(const d of i)for(const p of i)for(const m of i)s.set(d*l.x,p*l.y,m*l.z),s.applyQuaternion(h),s.add(A),n.min(s),a.max(s)}),new Br(n,a)}constructGenerator(t){const{transform:n,viewToObject:a,recolor:s}=t,i=ta({index:"int"},{gsplat:be},({index:o})=>{if(!o)throw new Error("index is undefined");let r=qs(this.packedSplats.dyno,o);if(this.maxSh>=1){const{sh1Texture:l,sh2Texture:h,sh3Texture:c}=this.ensureShTextures();if(l){let u=function(I,y){const{x:Q,y:k}=r0(y).outputs,b=ks(xa(Q,k),Ys("float",.5)),S=ks(IA(k,Q),Ys("float",.5));return xa(b,ks(I,S))};const d=a.translate,{center:p}=zi(r).outputs,m=o0(IA(p,d)),f=T0(r,l,m);let B=u(f,this.packedSplats.dynoSh1MinMax);if(this.maxSh>=2&&h){const I=_0(r,h,m);B=xa(B,u(I,this.packedSplats.dynoSh2MinMax))}if(this.maxSh>=3&&c){const I=R0(r,c,m);B=xa(B,u(I,this.packedSplats.dynoSh3MinMax))}let{rgba:E}=zi(r).outputs;E=xa(E,l0(B,Ys("float",0))),r=ko({gsplat:r,rgba:E})}}if(this.splatRgba){const l=y0(this.splatRgba.dyno,o);r=ko({gsplat:r,rgba:l})}this.skinning&&(r=this.skinning.modify(r)),this.objectModifier&&(r=this.objectModifier.apply({gsplat:r}).gsplat),r=n.applyGsplat(r);const A=ks(s,zi(r).outputs.rgba);return r=ko({gsplat:r,rgba:A}),this.rgbaDisplaceEdits&&(r=this.rgbaDisplaceEdits.modify(r)),this.worldModifier&&(r=this.worldModifier.apply({gsplat:r}).gsplat),{gsplat:r}});this.generator=i}updateGenerator(){this.constructGenerator(this.context)}update({time:t,viewToWorld:n,deltaTime:a,globalEdits:s}){var i;this.numSplats=this.packedSplats.numSplats,this.context.time.value=t,this.context.deltaTime.value=a,nr.dynoTime.value=t;const{transform:o,viewToObject:r,recolor:A}=this.context;let l=o.update(this);this.context.viewToWorld.updateFromMatrix(n)&&this.enableViewToWorld&&(l=!0);const h=n.clone().invert();this.context.worldToView.updateFromMatrix(h)&&this.enableWorldToView&&(l=!0);const d=new Ze().compose(o.translate.value,o.rotate.value,new q().setScalar(o.scale.value)).invert().multiply(n);r.updateFromMatrix(d)&&(this.enableViewToObject||this.packedSplats.extra.sh1)&&(l=!0);const p=new yn(this.recolor.r,this.recolor.g,this.recolor.b,this.opacity);p.equals(A.value)||(A.value.copy(p),l=!0);const m=this.editable?(this.edits??[]).concat(s):[];this.editable&&!this.edits&&this.traverseVisible(B=>{B instanceof Gl&&m.push(B)}),m.sort((B,E)=>B.ordering-E.ordering);const f=m.map(B=>{if(B.sdfs!=null)return{edit:B,sdfs:B.sdfs};const E=[];return B.traverseVisible(I=>{I instanceof Q0&&E.push(I)}),{edit:B,sdfs:E}});if(f.length>0&&!this.rgbaDisplaceEdits){const B=f.length,E=f.reduce((I,y)=>I+y.sdfs.length,0);this.rgbaDisplaceEdits=new v0({maxEdits:B,maxSdfs:E}),this.updateGenerator()}if(this.rgbaDisplaceEdits){const B=this.rgbaDisplaceEdits.update(f);l||(l=B.updated),B.dynoUpdated&&this.updateGenerator()}l&&this.updateVersion(),(i=this.onFrame)==null||i.call(this,{mesh:this,time:t,deltaTime:a})}raycast(t,n){var a,s;if(!this.packedSplats.packedArray||!this.packedSplats.numSplats)return;const{near:i,far:o,ray:r}=t,A=this.matrixWorld.clone().invert(),l=new nl().setFromMatrix4(A),h=r.origin.clone().applyMatrix4(A),c=r.direction.clone().applyMatrix3(l),u=new q;A.decompose(new q,new ze,u),(u.x*u.y*u.z)**(1/3);const p=ag(h.x,h.y,h.z,c.x,c.y,c.z,i,o,this.packedSplats.numSplats,this.packedSplats.packedArray,!0,((a=this.packedSplats.splatEncoding)==null?void 0:a.lnScaleMin)??Zn,((s=this.packedSplats.splatEncoding)==null?void 0:s.lnScaleMax)??$n);for(const m of p){const f=r.direction.clone().multiplyScalar(m).add(r.origin);n.push({distance:m,point:f,object:this})}}ensureShTextures(){if(!this.packedSplats.extra.sh1)return{};let t=this.packedSplats.extra.sh1Texture;if(!t){let s=this.packedSplats.extra.sh1;const{width:i,height:o,depth:r,maxSplats:A}=un(s.length/2);if(s.length<A*2){const h=new Uint32Array(A*2);h.set(s),this.packedSplats.extra.sh1=h,s=h}const l=new za(s,i,o,r);l.format=Ah,l.type=Fa,l.internalFormat="RG32UI",l.needsUpdate=!0,t=new To({value:l,key:"sh1"}),this.packedSplats.extra.sh1Texture=t}if(!this.packedSplats.extra.sh2)return{sh1Texture:t};let n=this.packedSplats.extra.sh2Texture;if(!n){let s=this.packedSplats.extra.sh2;const{width:i,height:o,depth:r,maxSplats:A}=un(s.length/4);if(s.length<A*4){const h=new Uint32Array(A*4);h.set(s),this.packedSplats.extra.sh2=h,s=h}const l=new za(s,i,o,r);l.format=is,l.type=Fa,l.internalFormat="RGBA32UI",l.needsUpdate=!0,n=new To({value:l,key:"sh2"}),this.packedSplats.extra.sh2Texture=n}if(!this.packedSplats.extra.sh3)return{sh1Texture:t,sh2Texture:n};let a=this.packedSplats.extra.sh3Texture;if(!a){let s=this.packedSplats.extra.sh3;const{width:i,height:o,depth:r,maxSplats:A}=un(s.length/4);if(s.length<A*4){const h=new Uint32Array(A*4);h.set(s),this.packedSplats.extra.sh3=h,s=h}const l=new za(s,i,o,r);l.format=is,l.type=Fa,l.internalFormat="RGBA32UI",l.needsUpdate=!0,a=new To({value:l,key:"sh3"}),this.packedSplats.extra.sh3Texture=a}return{sh1Texture:t,sh2Texture:n,sh3Texture:a}}};Zs.staticInitialized=Zs.staticInitialize();Zs.isStaticInitialized=!1;Zs.dynoTime=new Ks({value:0});let Mr=Zs;const M0=an(`
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
`),k0=an(`
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
`),D0=an(`
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
`);function T0(e,t,n){return eo({inTypes:{gsplat:be,sh1:"usampler2DArray",viewDir:"vec3"},outTypes:{rgb:"vec3"},inputs:{gsplat:e,sh1:t,viewDir:n},globals:()=>[Yn,M0],statements:({inputs:a,outputs:s})=>Gn(`
        if (isGsplatActive(${a.gsplat}.flags)) {
          ${s.rgb} = evaluateSH1(${a.gsplat}, ${a.sh1}, ${a.viewDir});
        } else {
          ${s.rgb} = vec3(0.0);
        }
      `)}).outputs.rgb}function _0(e,t,n){return eo({inTypes:{gsplat:be,sh2:"usampler2DArray",viewDir:"vec3"},outTypes:{rgb:"vec3"},inputs:{gsplat:e,sh2:t,viewDir:n},globals:()=>[Yn,k0],statements:({inputs:a,outputs:s})=>Gn(`
        if (isGsplatActive(${a.gsplat}.flags)) {
          ${s.rgb} = evaluateSH2(${a.gsplat}, ${a.sh2}, ${a.viewDir});
        } else {
          ${s.rgb} = vec3(0.0);
        }
      `)}).outputs.rgb}function R0(e,t,n){return eo({inTypes:{gsplat:be,sh3:"usampler2DArray",viewDir:"vec3"},outTypes:{rgb:"vec3"},inputs:{gsplat:e,sh3:t,viewDir:n},globals:()=>[Yn,D0],statements:({inputs:a,outputs:s})=>Gn(`
        if (isGsplatActive(${a.gsplat}.flags)) {
          ${s.rgb} = evaluateSH3(${a.gsplat}, ${a.sh3}, ${a.viewDir});
        } else {
          ${s.rgb} = vec3(0.0);
        }
      `)}).outputs.rgb}const z0=new Cs,F0=new me;function N0(){const e=new X(z0,F0);return e.frustumCulled=!1,e.onBeforeRender=function(t,n){if(!n.isScene){this.removeFromParent();return}let a=!1;n.traverse(s=>{s instanceof vA&&(a=!0)}),a||n.add(new vA({renderer:t})),this.removeFromParent()},e}const EA=["char","uchar","short","ushort","int","uint","float","double"],Hl=class Fi{constructor({fileBytes:t}){this.header="",this.littleEndian=!0,this.elements={},this.comments=[],this.data=null,this.numSplats=0,this.fileBytes=t instanceof ArrayBuffer?new Uint8Array(t):t}async parseHeader(){const n=new ReadableStream({start:o=>{o.enqueue(this.fileBytes.slice(0,65536)),o.close()}}).pipeThrough(new TextDecoderStream).getReader();this.header="";const a=`end_header
`;for(;;){const{value:o,done:r}=await n.read();if(r)throw new Error("Failed to read header");this.header+=o;const A=this.header.indexOf(a);if(A>=0){this.header=this.header.slice(0,A+a.length);break}}const s=new TextEncoder().encode(this.header).length;this.data=new DataView(this.fileBytes.buffer,s),this.elements={};let i=null;this.comments=[],this.header.trim().split(`
`).forEach((o,r)=>{const A=o.trim();if(r===0){if(A!=="ply")throw new Error("Invalid PLY header");return}if(A.length===0)return;const l=A.split(" ");switch(l[0]){case"format":if(l[1]==="binary_little_endian")this.littleEndian=!0;else if(l[1]==="binary_big_endian")this.littleEndian=!1;else throw new Error(`Unsupported PLY format: ${l[1]}`);if(l[2]!=="1.0")throw new Error(`Unsupported PLY version: ${l[2]}`);break;case"end_header":break;case"comment":this.comments.push(A.slice(8));break;case"element":{const h=l[1];i={name:h,count:Number.parseInt(l[2]),properties:{}},this.elements[h]=i;break}case"property":if(i==null)throw new Error("Property must be inside an element");l[1]==="list"?i.properties[l[4]]={isList:!0,type:l[3],countType:l[2]}:i.properties[l[2]]={isList:!1,type:l[1]};break}}),this.elements.vertex&&(this.numSplats=this.elements.vertex.count)}parseData(t){let n=0;const a=this.data;if(a==null)throw new Error("No data to parse");for(const s in this.elements){const i=this.elements[s],{count:o,properties:r}=i,A=Y0(r),l=q0(r,this.littleEndian),h=t(i)??(()=>{});for(let c=0;c<o;c++)n=l(a,n,A),h(c,A)}}parseSplats(t,n){if(this.elements.vertex==null)throw new Error("No vertex element found");let a=!1;const s=[];let i=0,o=[],r=[],A=[],l,h,c;function u(){const B=G0[i];o=new Array(3).fill(null).flatMap((E,I)=>[0,1,2].map((y,Q)=>I+Q*B/3)),r=new Array(5).fill(null).flatMap((E,I)=>[0,1,2].map((y,Q)=>3+I+Q*B/3)),A=new Array(7).fill(null).flatMap((E,I)=>[0,1,2].map((y,Q)=>8+I+Q*B/3)),l=i>=1?new Float32Array(3*3):void 0,h=i>=2?new Float32Array(5*3):void 0,c=i>=3?new Float32Array(7*3):void 0}function d(B,E){if(!l)throw new Error("Missing sh1");const I=E.f_rest;for(let y=0;y<o.length;y++)l[y]=I[o[y]]*8/255-4;if(h)for(let y=0;y<r.length;y++)h[y]=I[r[y]]*8/255-4;if(c)for(let y=0;y<A.length;y++)c[y]=I[A[y]]*8/255-4;n==null||n(B,l,h,c)}function p(B){const{min_x:E,min_y:I,min_z:y,max_x:Q,max_y:k,max_z:b,min_scale_x:S,min_scale_y:F,min_scale_z:j,max_scale_x:w,max_scale_y:_,max_scale_z:tt}=B.properties;if(!E||!I||!y||!Q||!k||!b||!S||!F||!j||!w||!_||!tt)throw new Error("Missing PLY chunk properties");return a=!0,(G,et)=>{const{min_x:Y,min_y:ct,min_z:ft,max_x:H,max_y:pt,max_z:ht,min_scale_x:ut,min_scale_y:rt,min_scale_z:Qt,max_scale_x:yt,max_scale_y:vt,max_scale_z:Et,min_r:Dt,min_g:Tt,min_b:M,max_r:D,max_g:T,max_b:it}=et;s.push({min_x:Y,min_y:ct,min_z:ft,max_x:H,max_y:pt,max_z:ht,min_scale_x:ut,min_scale_y:rt,min_scale_z:Qt,max_scale_x:yt,max_scale_y:vt,max_scale_z:Et,min_r:Dt,min_g:Tt,min_b:M,max_r:D,max_g:T,max_b:it})}}function m(B){if(n&&B.name==="sh")return i=ar(B.properties),u(),d;if(B.name!=="vertex")return null;const{packed_position:E,packed_rotation:I,packed_scale:y,packed_color:Q}=B.properties;if(!E||!I||!y||!Q)throw new Error("Missing PLY properties: packed_position, packed_rotation, packed_scale, packed_color");const k=Math.sqrt(2);return(b,S)=>{const F=s[b>>>8];if(F==null)throw new Error("Missing PLY chunk");const{min_x:j,min_y:w,min_z:_,max_x:tt,max_y:G,max_z:et,min_scale_x:Y,min_scale_y:ct,min_scale_z:ft,max_scale_x:H,max_scale_y:pt,max_scale_z:ht,min_r:ut,min_g:rt,min_b:Qt,max_r:yt,max_g:vt,max_b:Et}=F,{packed_position:Dt,packed_rotation:Tt,packed_scale:M,packed_color:D}=S,T=(Dt>>>21&2047)/2047*(tt-j)+j,it=(Dt>>>11&1023)/1023*(G-w)+w,Z=(Dt&2047)/2047*(et-_)+_,At=((Tt>>>20&1023)/1023-.5)*k,dt=((Tt>>>10&1023)/1023-.5)*k,Bt=((Tt&1023)/1023-.5)*k,Xt=Math.sqrt(Math.max(0,1-At*At-dt*dt-Bt*Bt)),ee=Tt>>>30,x=ee===0?At:ee===1?Xt:dt,N=ee<=1?dt:ee===2?Xt:Bt,P=ee<=2?Bt:Xt,$=ee===0?Xt:At,z=Math.exp((M>>>21&2047)/2047*(H-Y)+Y),mt=Math.exp((M>>>11&1023)/1023*(pt-ct)+ct),It=Math.exp((M&2047)/2047*(ht-ft)+ft),_t=(D>>>24&255)/255*((yt??1)-(ut??0))+(ut??0),C=(D>>>16&255)/255*((vt??1)-(rt??0))+(rt??0),L=(D>>>8&255)/255*((Et??1)-(Qt??0))+(Qt??0),W=(D&255)/255;t(b,T,it,Z,z,mt,It,x,N,P,$,W,_t,C,L)}}const f=B=>{if(B.name==="chunk")return p(B);if(a)return m(B);if(B.name!=="vertex")return null;const{x:E,y:I,z:y,scale_0:Q,scale_1:k,scale_2:b,rot_0:S,rot_1:F,rot_2:j,rot_3:w,opacity:_,f_dc_0:tt,f_dc_1:G,f_dc_2:et,red:Y,green:ct,blue:ft,alpha:H}=B.properties;if(!E||!I||!y)throw new Error("Missing PLY properties: x, y, z");const pt=Q&&k&&b,ht=S&&F&&j&&w,ut=H!=null?vi[H.type]:1,rt=Y!=null?vi[Y.type]:1,Qt=ct!=null?vi[ct.type]:1,yt=ft!=null?vi[ft.type]:1;return i=ar(B.properties),u(),(vt,Et)=>{const Dt=pt?Math.exp(Et.scale_0):Fi.defaultPointScale,Tt=pt?Math.exp(Et.scale_1):Fi.defaultPointScale,M=pt?Math.exp(Et.scale_2):Fi.defaultPointScale,D=ht?Et.rot_1:0,T=ht?Et.rot_2:0,it=ht?Et.rot_3:0,Z=ht?Et.rot_0:1,At=_!=null?1/(1+Math.exp(-Et.opacity)):H!=null?Et.alpha/ut:1,dt=tt!=null?Et.f_dc_0*Qi+.5:Y!=null?Et.red/rt:1,Bt=G!=null?Et.f_dc_1*Qi+.5:ct!=null?Et.green/Qt:1,Xt=et!=null?Et.f_dc_2*Qi+.5:ft!=null?Et.blue/yt:1;if(t(vt,Et.x,Et.y,Et.z,Dt,Tt,M,D,T,it,Z,At,dt,Bt,Xt),n&&l){const ee=Et.f_rest;if(l)for(let x=0;x<o.length;x++)l[x]=ee[o[x]];if(h)for(let x=0;x<r.length;x++)h[x]=ee[r[x]];if(c)for(let x=0;x<A.length;x++)c[x]=ee[A[x]];n(vt,l,h,c)}}};this.parseData(f)}injectRgba(t){let n=0;const a=this.data;if(a==null)throw new Error("No parsed data");if(t.length!==this.numSplats*4)throw new Error("Invalid RGBA array length");for(const s in this.elements){const i=this.elements[s],{count:o,properties:r}=i,A=[];let l=0;const h=s==="vertex";if(h){for(const c of["opacity","f_dc_0","f_dc_1","f_dc_2"])if(!r[c]||r[c].type!=="float")throw new Error(`Can't injectRgba due to property: ${c}`)}for(const[c,u]of Object.entries(r))if(u.isList)A.push(()=>{const d=es[u.countType](a,n,this.littleEndian);n+=En[u.countType],n+=d*En[u.type]});else{if(h)if(c==="f_dc_0"||c==="f_dc_1"||c==="f_dc_2"){const d=Number.parseInt(c.slice(5));A.push(()=>{const p=(t[l+d]/255-.5)/Qi;BA[u.type](a,n,this.littleEndian,p)})}else c==="opacity"&&A.push(()=>{const d=Math.max(-100,Math.min(100,-Math.log(1/(t[l+3]/255)-1)));BA[u.type](a,n,this.littleEndian,d)});A.push(()=>{n+=En[u.type]})}for(let c=0;c<o;c++){for(const u of A)u();h&&(l+=4)}}}};Hl.defaultPointScale=.001;let L0=Hl;const Qi=.28209479177387814,es={char:(e,t,n)=>e.getInt8(t),uchar:(e,t,n)=>e.getUint8(t),short:(e,t,n)=>e.getInt16(t,n),ushort:(e,t,n)=>e.getUint16(t,n),int:(e,t,n)=>e.getInt32(t,n),uint:(e,t,n)=>e.getUint32(t,n),float:(e,t,n)=>e.getFloat32(t,n),double:(e,t,n)=>e.getFloat64(t,n)},BA={char:(e,t,n,a)=>{e.setInt8(t,a)},uchar:(e,t,n,a)=>{e.setUint8(t,a)},short:(e,t,n,a)=>{e.setInt16(t,a,n)},ushort:(e,t,n,a)=>{e.setUint16(t,a,n)},int:(e,t,n,a)=>{e.setInt32(t,a,n)},uint:(e,t,n,a)=>{e.setUint32(t,a,n)},float:(e,t,n,a)=>{e.setFloat32(t,a,n)},double:(e,t,n,a)=>{e.setFloat64(t,a,n)}},En={char:1,uchar:1,short:2,ushort:2,int:4,uint:4,float:4,double:8},vi={char:127,uchar:255,short:32767,ushort:65535,int:2147483647,uint:4294967295,float:1,double:1},U0={0:0,9:1,24:2,45:3},G0={0:0,1:9,2:24,3:45},kr=/^f_rest_([0-9]{1,2})$/;function Y0(e){const t={};for(const[n,a]of Object.entries(e))kr.test(n)?t.f_rest=new Array(ar(e)):t[n]=a.isList?[]:0;return t}function q0(e,t){return J0(e)?O0(e,t):V0(e,t)}const P0=(()=>{try{new Function("return 42;")}catch{return!1}return!0})(),H0=/^[a-zA-Z0-9_]+$/;function J0(e){if(!P0)return!1;for(const[t,n]of Object.entries(e))if(!H0.test(t)||n.isList&&!EA.includes(n.countType)||!EA.includes(n.type))return!1;return!0}function O0(e,t){const n=["let list;"];for(const[s,i]of Object.entries(e)){const o=s.match(kr);if(o){const r=+o[1];n.push(`
        item.f_rest[${r}] = PARSE_FIELD['${i.type}'](data, offset, ${t});
        offset += ${En[i.type]};
      `)}else i.isList?n.push(`
        list = item['${s}'];
        list.length = PARSE_FIELD['${i.countType}'](data, offset, ${t});
        offset += ${En[i.countType]};
        for (let i = 0; i < list.length; i++) {
          list[i] = PARSE_FIELD['${i.type}'](data, offset, ${t});
          offset += ${En[i.type]};
        }
      `):n.push(`
        item['${s}'] = PARSE_FIELD['${i.type}'](data, offset, ${t});
        offset += ${En[i.type]};
      `)}n.push("return offset;");const a=new Function("data","offset","item","PARSE_FIELD",n.join(`
`));return(s,i,o)=>a(s,i,o,es)}function V0(e,t){const n=[];for(const[a,s]of Object.entries(e)){const i=a.match(kr);if(i){const o=+i[1];n.push((r,A,l)=>(l.f_rest[o]=es[s.type](r,A,t),A+En[s.type]))}else s.isList?n.push((o,r,A)=>{const l=A[a];l.length=es[s.countType](o,r,t);let h=r+En[s.countType];for(let c=0;c<l.length;c++)l[c]=es[s.type](o,h,t),h+=En[s.type];return h}):n.push((o,r,A)=>(A[a]=es[s.type](o,r,t),r+En[s.type]))}return(a,s,i)=>{let o=s;for(let r=0;r<n.length;r++)o=n[r](a,o,i);return o}}function ar(e){let t=0;for(;e[`f_rest_${t}`];)t+=1;const n=U0[t];if(n==null)throw new Error(`Unsupported number of SH coefficients: ${t}`);return n}const Jl=`(function() {
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
`,yA=typeof self<"u"&&self.Blob&&new Blob([Jl],{type:"text/javascript;charset=utf-8"});function j0(e){let t;try{if(t=yA&&(self.URL||self.webkitURL).createObjectURL(yA),!t)throw"";const n=new Worker(t,{name:e==null?void 0:e.name});return n.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(t)}),n}catch{return new Worker("data:text/javascript;charset=utf-8,"+encodeURIComponent(Jl),{name:e==null?void 0:e.name})}finally{t&&(self.URL||self.webkitURL).revokeObjectURL(t)}}class W0{constructor(){this.messages={},this.messageIdNext=0,this.worker=new j0,this.worker.onmessage=t=>this.onMessage(t)}makeMessageId(){return++this.messageIdNext}makeMessagePromiseId(){const t=this.makeMessageId(),n=new Promise((a,s)=>{this.messages[t]={resolve:a,reject:s}});return{id:t,promise:n}}onMessage(t){const{id:n,result:a,error:s}=t.data,i=this.messages[n];i&&(delete this.messages[n],s?i.reject(s):i.resolve(a))}async call(t,n){const{id:a,promise:s}=this.makeMessagePromiseId();return this.worker.postMessage({name:t,args:n,id:a},{transfer:Tg(n)}),s}}let Ol=4,Ji=0;const Vl=[],jl=[];async function X0(){const e=Vl.shift();if(e)return e;if(Ji<Ol){const t=new W0;return Ji+=1,t}return new Promise(t=>{jl.push(t)})}function K0(e){if(Ji>Ol){Ji-=1;return}const t=jl.shift();if(t){t(e);return}Vl.push(e)}async function ya(e){const t=await X0();try{return await e(t)}finally{K0(t)}}class Z0 extends gh{constructor(t){super(t),this.fileLoader=new fh(t)}load(t,n,a,s){const i=this.manager.resolveURL((this.path??"")+(t??"")),o=new Headers(this.requestHeader),r=this.withCredentials?"include":"same-origin",A=new Request(i,{headers:o,credentials:r});let l=this.fileType;this.manager.itemStart(i),wA(A,a).then(async h=>{var c;const u=[new ProgressEvent("progress",{lengthComputable:!0,loaded:h.byteLength,total:h.byteLength})];function d(){if(a){const B=u.every(y=>y.lengthComputable||y.loaded===0&&y.total===0),E=u.reduce((y,Q)=>y+Q.loaded,0),I=u.reduce((y,Q)=>y+Q.total,0);a(new ProgressEvent("progress",{lengthComputable:B,loaded:E,total:I}))}}const p={},m=[],f=Wl(h);if(l==="pcsogs"&&f===void 0)throw new Error("Invalid PC SOGS file");if(f!==void 0){l="pcsogs";for(const B of["means","scales","quats","sh0","shN"]){const E=f[B];if(E)for(const I of E.files){const y=new URL(I,i).toString(),Q=u.length;u.push(new ProgressEvent("progress")),this.manager.itemStart(y);const k=new Request(y,{headers:o,credentials:r}),b=wA(k,S=>{u[Q]=S,d()}).then(S=>{p[I]=S}).catch(S=>{throw this.manager.itemError(y),S}).finally(()=>{this.manager.itemEnd(y)});m.push(b)}}}if(await Promise.all(m),n){const B=((c=this.packedSplats)==null?void 0:c.splatEncoding)??ro,E=await Xl({input:h,extraFiles:p,fileType:l,pathOrUrl:i,splatEncoding:B});this.packedSplats?(this.packedSplats.initialize(E),n(this.packedSplats)):n(new Ua(E))}}).catch(h=>{this.manager.itemError(i),s==null||s(h)}).finally(()=>{this.manager.itemEnd(i)})}async loadAsync(t,n){return new Promise((a,s)=>{this.load(t,i=>{a(i)},n,s)})}parse(t){return new Mr({packedSplats:t})}}async function wA(e,t){const n=await fetch(e);if(!n.ok)throw new Error(`${n.status} "${n.statusText}" fetching URL: ${e.url}`);if(!n.body)throw new Error(`Response body is null for URL: ${e.url}`);const a=n.body.getReader(),s=Number.parseInt(n.headers.get("Content-Length")||"0"),i=Number.isNaN(s)?0:s;let o=0;const r=[];for(;;){const{done:h,value:c}=await a.read();if(h)break;r.push(c),o+=c.length,t&&t(new ProgressEvent("progress",{lengthComputable:i!==0,loaded:o,total:i}))}const A=new Uint8Array(o);let l=0;for(const h of r)A.set(h,l),l+=h.length;return A.buffer}function $0(e){const t=new DataView(e.buffer);if((t.getUint32(0,!0)&16777215)===7957616)return"ply";if((t.getUint32(0,!0)&16777215)===559903){const n=jg(e,4);return new DataView(n.buffer).getUint32(0,!0)===1347635022?"spz":void 0}if(t.getUint32(0,!0)===67324752)return nf(e)?"pcsogszip":void 0}function tf(e){const t=e.split(/[?#]/,1)[0],n=Math.max(t.lastIndexOf("/"),t.lastIndexOf("\\")),a=t.slice(n+1),s=a.lastIndexOf(".");return s<=0||s===a.length-1?"":a.slice(s+1).toLowerCase()}function ef(e){const t=tf(e);if(t==="ply")return"ply";if(t==="spz")return"spz";if(t==="splat")return"splat";if(t==="ksplat")return"ksplat";if(t==="sog")return"pcsogszip"}function Wl(e){try{let t;if(typeof e=="string")t=e;else{const s=e instanceof ArrayBuffer?new Uint8Array(e):e;if(s.length>65536)return;t=new TextDecoder().decode(s)}const n=JSON.parse(t);if(!n||typeof n!="object"||Array.isArray(n))return;const a=n.version===2;for(const s of["means","scales","quats","sh0"]){if(!n[s]||typeof n[s]!="object"||Array.isArray(n[s]))return;if(a){if(!n[s].files||(s==="scales"||s==="sh0")&&!n[s].codebook||s==="means"&&(!n[s].mins||!n[s].maxs))return}else if(!n[s].shape||!n[s].files||s!=="quats"&&(!n[s].mins||!n[s].maxs))return}return n}catch{return}}function nf(e){try{const t=e instanceof ArrayBuffer?new Uint8Array(e):e;let n=null;const a=tg(t,{filter:({name:i})=>i.split(/[\\/]/).pop()==="meta.json"?(n=i,!0):!1});if(!n)return;const s=Wl(a[n]);return s?{name:n,json:s}:void 0}catch{return}}async function Xl({input:e,extraFiles:t,fileType:n,pathOrUrl:a,splatEncoding:s}){const i=e instanceof ArrayBuffer?new Uint8Array(e):e;let o=n;switch(n||(o=$0(i),!o&&a&&(o=ef(a))),o){case"ply":{const r=new L0({fileBytes:i});await r.parseHeader();const A=r.numSplats,l=un(A).maxSplats,h={fileBytes:i,packedArray:new Uint32Array(l*4),splatEncoding:s};return await ya(async c=>{const{packedArray:u,numSplats:d,extra:p}=await c.call("unpackPly",h);return{packedArray:u,numSplats:d,extra:p}})}case"spz":return await ya(async r=>{const{packedArray:A,numSplats:l,extra:h}=await r.call("decodeSpz",{fileBytes:i,splatEncoding:s});return{packedArray:A,numSplats:l,extra:h}});case"splat":return await ya(async r=>{const{packedArray:A,numSplats:l}=await r.call("decodeAntiSplat",{fileBytes:i,splatEncoding:s});return{packedArray:A,numSplats:l}});case"ksplat":return await ya(async r=>{const{packedArray:A,numSplats:l,extra:h}=await r.call("decodeKsplat",{fileBytes:i,splatEncoding:s});return{packedArray:A,numSplats:l,extra:h}});case"pcsogs":return await ya(async r=>{const{packedArray:A,numSplats:l,extra:h}=await r.call("decodePcSogs",{fileBytes:i,extraFiles:t,splatEncoding:s});return{packedArray:A,numSplats:l,extra:h}});case"pcsogszip":return await ya(async r=>{const{packedArray:A,numSplats:l,extra:h}=await r.call("decodePcSogsZip",{fileBytes:i,splatEncoding:s});return{packedArray:A,numSplats:l,extra:h}});default:throw new Error(`Unknown splat file type: ${o}`)}}var af=`precision highp float;
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
}`;const ro={rgbMin:0,rgbMax:1,lnScaleMin:Zn,lnScaleMax:$n,sh1Min:-1,sh1Max:1,sh2Min:-1,sh2Max:1,sh3Min:-1,sh3Max:1},si=class Fe{constructor(t={}){this.maxSplats=0,this.numSplats=0,this.packedArray=null,this.isInitialized=!1,this.target=null,this.source=null,this.needsUpdate=!0,this.extra={},this.dyno=new Dr({packedSplats:this}),this.dynoRgbMinMaxLnScaleMinMax=new io({key:"rgbMinMaxLnScaleMinMax",value:new yn(0,1,Zn,$n),update:n=>{var a,s,i,o;return n.set(((a=this.splatEncoding)==null?void 0:a.rgbMin)??0,((s=this.splatEncoding)==null?void 0:s.rgbMax)??1,((i=this.splatEncoding)==null?void 0:i.lnScaleMin)??Zn,((o=this.splatEncoding)==null?void 0:o.lnScaleMax)??$n),n}}),this.dynoSh1MinMax=new Do({key:"sh1MinMax",value:new kt(-1,1),update:n=>{var a,s;return n.set(((a=this.splatEncoding)==null?void 0:a.sh1Min)??-1,((s=this.splatEncoding)==null?void 0:s.sh1Max)??1),n}}),this.dynoSh2MinMax=new Do({key:"sh2MinMax",value:new kt(-1,1),update:n=>{var a,s;return n.set(((a=this.splatEncoding)==null?void 0:a.sh2Min)??-1,((s=this.splatEncoding)==null?void 0:s.sh2Max)??1),n}}),this.dynoSh3MinMax=new Do({key:"sh3MinMax",value:new kt(-1,1),update:n=>{var a,s;return n.set(((a=this.splatEncoding)==null?void 0:a.sh3Min)??-1,((s=this.splatEncoding)==null?void 0:s.sh3Max)??1),n}}),this.initialized=Promise.resolve(this),this.reinitialize(t)}reinitialize(t){this.isInitialized=!1,this.extra={},this.splatEncoding=t.splatEncoding,t.url||t.fileBytes||t.construct?this.initialized=this.asyncInitialize(t).then(()=>(this.isInitialized=!0,this)):(this.initialize(t),this.isInitialized=!0,this.initialized=Promise.resolve(this))}initialize(t){t.packedArray?(this.packedArray=t.packedArray,this.maxSplats=Math.floor(this.packedArray.length/4),this.maxSplats=Math.floor(this.maxSplats/ne)*ne,this.numSplats=Math.min(this.maxSplats,t.numSplats??Number.POSITIVE_INFINITY)):(this.maxSplats=t.maxSplats??0,this.numSplats=0),this.extra=t.extra??{}}async asyncInitialize(t){const{url:n,fileBytes:a,construct:s}=t;if(n){const i=new Z0;i.packedSplats=this,await i.loadAsync(n)}else if(a){const i=await Xl({input:a,fileType:t.fileType,pathOrUrl:t.fileName??n,splatEncoding:t.splatEncoding??ro});this.initialize(i)}if(s){const i=s(this);i instanceof Promise&&await i}}dispose(){this.target&&(this.target.dispose(),this.target=null),this.source&&(this.source.dispose(),this.source=null)}ensureSplats(t){const n=t<=this.maxSplats?this.maxSplats:Math.max(t,2*this.maxSplats),a=this.packedArray?this.packedArray.length/4:0;if(!this.packedArray||n>a){this.maxSplats=un(n).maxSplats;const s=new Uint32Array(this.maxSplats*4);this.packedArray&&s.set(this.packedArray),this.packedArray=s}return this.packedArray}ensureSplatsSh(t,n){let a,s;if(t===0)return this.ensureSplats(n);if(t===1)a=2,s="sh1";else if(t===2)a=4,s="sh2";else if(t===3)a=4,s="sh3";else throw new Error(`Invalid level: ${t}`);let i=this.extra[s]?this.extra[s].length/a:0;const o=n<=i?i:Math.max(n,2*i);if(!this.extra[s]||o>i){i=un(o).maxSplats;const r=new Uint32Array(i*a);this.extra[s]&&r.set(this.extra[s]),this.extra[s]=r}return this.extra[s]}getSplat(t){if(!this.packedArray||t>=this.numSplats)throw new Error("Invalid index");return pA(this.packedArray,t,this.splatEncoding)}setSplat(t,n,a,s,i,o){const r=this.ensureSplats(t+1);dA(r,t,n.x,n.y,n.z,a.x,a.y,a.z,s.x,s.y,s.z,s.w,i,o.r,o.g,o.b),this.numSplats=Math.max(this.numSplats,t+1)}pushSplat(t,n,a,s,i){const o=this.ensureSplats(this.numSplats+1);dA(o,this.numSplats,t.x,t.y,t.z,n.x,n.y,n.z,a.x,a.y,a.z,a.w,s,i.r,i.g,i.b),++this.numSplats}forEachSplat(t){if(!(!this.packedArray||!this.numSplats))for(let n=0;n<this.numSplats;++n){const a=pA(this.packedArray,n,this.splatEncoding);t(n,a.center,a.scales,a.quaternion,a.opacity,a.color)}}ensureGenerate(t){if(this.target&&(t??1)<=this.maxSplats)return!1;this.dispose();const n=un(t??1),{width:a,height:s,depth:i}=n;return this.maxSplats=n.maxSplats,this.target=new ol(a,s,i,{depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,magFilter:pa,minFilter:pa}),this.target.texture.format=is,this.target.texture.type=Fa,this.target.texture.internalFormat="RGBA32UI",this.target.scissorTest=!0,!0}generateMapping(t){let n=0;const a=t.map(s=>{const i=n,o=Math.ceil(s/ne)*ne;return n+=o,{base:i,count:s}});return{maxSplats:n,mapping:a}}getTexture(){return this.target?this.target.texture:this.source||this.packedArray?this.maybeUpdateSource():Fe.getEmpty()}maybeUpdateSource(){if(!this.packedArray)throw new Error("No packed splats");if(this.needsUpdate||!this.source){if(this.needsUpdate=!1,this.source){const{width:t,height:n,depth:a}=this.source.image;this.maxSplats!==t*n*a&&(this.source.dispose(),this.source=null)}if(this.source)this.packedArray.buffer!==this.source.image.data.buffer&&(this.source.image.data=new Uint8Array(this.packedArray.buffer));else{const{width:t,height:n,depth:a}=un(this.maxSplats);this.source=new za(this.packedArray,t,n,a),this.source.format=is,this.source.type=Fa,this.source.internalFormat="RGBA32UI",this.source.needsUpdate=!0}this.source.needsUpdate=!0}return this.source}static getEmpty(){if(!Fe.emptySource){const{width:t,height:n,depth:a,maxSplats:s}=un(1),i=new Uint32Array(s*4);Fe.emptySource=new za(i,t,n,a),Fe.emptySource.format=is,Fe.emptySource.type=Fa,Fe.emptySource.internalFormat="RGBA32UI",Fe.emptySource.needsUpdate=!0}return Fe.emptySource}prepareProgramMaterial(t){let n=Fe.generatorProgram.get(t);if(!n){const s=ta({index:"int"},{output:"uvec4"},({index:i})=>{t.inputs.index=i;const o=t.outputs.gsplat;return{output:Qg(o,this.dynoRgbMinMaxLnScaleMinMax)}});Fe.programTemplate||(Fe.programTemplate=new _l(af)),n=new Tl({graph:s,inputs:{index:"index"},outputs:{output:"target"},template:Fe.programTemplate}),Object.assign(n.uniforms,{targetLayer:{value:0},targetBase:{value:0},targetCount:{value:0}}),Fe.generatorProgram.set(t,n)}const a=n.prepareMaterial();return Fe.fullScreenQuad.material=a,{program:n,material:a}}saveRenderState(t){return{xrEnabled:t.xr.enabled,autoClear:t.autoClear}}resetRenderState(t,n){t.setRenderTarget(null),t.xr.enabled=n.xrEnabled,t.autoClear=n.autoClear}generate({generator:t,base:n,count:a,renderer:s}){if(!this.target)throw new Error("Target must be initialized with ensureSplats");if(n+a>this.maxSplats)throw new Error("Base + count exceeds maxSplats");const{program:i,material:o}=this.prepareProgramMaterial(t);i.update();const r=this.saveRenderState(s),A=Math.ceil((n+a)/ne)*ne,l=ne*Sa;for(o.uniforms.targetBase.value=n,o.uniforms.targetCount.value=a;n<A;){const h=Math.floor(n/l);o.uniforms.targetLayer.value=h;const c=h*l,u=Math.floor((n-c)/ne),d=Math.min(Sa,Math.ceil((A-c)/ne));this.target.scissor.set(0,u,ne,d-u),s.setRenderTarget(this.target,h),s.xr.enabled=!1,s.autoClear=!1,Fe.fullScreenQuad.render(s),n+=ne*(d-u)}return this.resetRenderState(s,r),{nextBase:A}}};si.emptySource=null;si.programTemplate=null;si.generatorProgram=new Map;si.fullScreenQuad=new dl(new Er({visible:!1}));let Ua=si;class Dr extends wn{constructor({packedSplats:t}={}){super({key:"packedSplats",type:so,globals:()=>[Qr],value:{texture:Ua.getEmpty(),numSplats:0,rgbMinMaxLnScaleMinMax:new yn(0,1,Zn,$n)},update:n=>{var a,s,i,o,r,A,l,h,c,u;return n.texture=((a=this.packedSplats)==null?void 0:a.getTexture())??Ua.getEmpty(),n.numSplats=((s=this.packedSplats)==null?void 0:s.numSplats)??0,n.rgbMinMaxLnScaleMinMax.set(((o=(i=this.packedSplats)==null?void 0:i.splatEncoding)==null?void 0:o.rgbMin)??0,((A=(r=this.packedSplats)==null?void 0:r.splatEncoding)==null?void 0:A.rgbMax)??1,((h=(l=this.packedSplats)==null?void 0:l.splatEncoding)==null?void 0:h.lnScaleMin)??Zn,((u=(c=this.packedSplats)==null?void 0:c.splatEncoding)==null?void 0:u.lnScaleMax)??$n),n}}),this.packedSplats=t}}class sr extends uh{constructor(t,n){super(),this.ordering=t,this.setAttribute("position",new Ra(sf,3)),this.setIndex(new Ra(of,1)),this._maxInstanceCount=t.length,this.instanceCount=n,this.attribute=new Wo(t,1,!1,1),this.attribute.setUsage($a),this.setAttribute("splatIndex",this.attribute)}update(t,n){this.ordering=t,this.attribute.array=t,this.instanceCount=n,this.attribute.addUpdateRange(0,n),this.attribute.needsUpdate=!0}}const sf=new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,1,0]),of=new Uint16Array([0,1,2,0,2,3]),Tr=class Ds{constructor(t){if(this.lastTime=null,this.encodeLinear=!1,this.superXY=1,this.display=null,this.sorting=null,this.pending=null,this.sortingCheck=!1,this.readback16=new Uint16Array(0),this.readback32=new Uint32Array(0),this.spark=t.spark,this.camera=t.camera,this.viewToWorld=t.viewToWorld??new Ze,t.target){const{width:n,height:a,doubleBuffer:s}=t.target,i=Math.max(1,Math.min(4,t.target.superXY??1));if(this.superXY=i,n*i>8192||a*i>8192)throw new Error("Target size too large");this.target=new Rn(n*i,a*i,{format:La,type:fs,colorSpace:Ce}),s&&(this.back=new Rn(n*i,a*i,{format:La,type:fs,colorSpace:Ce})),this.encodeLinear=!0}this.onTextureUpdated=t.onTextureUpdated,this.sortRadial=t.sortRadial??!0,this.sortDistance=t.sortDistance,this.sortCoorient=t.sortCoorient,this.depthBias=t.depthBias,this.sort360=t.sort360,this.sort32=t.sort32,this.stochastic=t.stochastic??!1,this.orderingFreelist=new _g({allocate:n=>new Uint32Array(n),valid:(n,a)=>n.length===a}),this.autoUpdate=!1,this.setAutoUpdate(t.autoUpdate??!1)}dispose(){var t;this.setAutoUpdate(!1),this.target&&(this.target.dispose(),this.target=void 0),this.back&&(this.back.dispose(),this.back=void 0),this.display&&(this.spark.releaseAccumulator(this.display.accumulator),this.display.geometry.dispose(),this.display=null),(t=this.pending)!=null&&t.accumulator&&(this.spark.releaseAccumulator(this.pending.accumulator),this.pending=null)}setAutoUpdate(t){!this.autoUpdate&&t?this.spark.autoViewpoints.push(this):this.autoUpdate&&!t&&(this.spark.autoViewpoints=this.spark.autoViewpoints.filter(n=>n!==this)),this.autoUpdate=t}async prepare({scene:t,camera:n,viewToWorld:a,update:s,forceOrigin:i}){var o;for(a?this.viewToWorld=a:(this.camera=n??this.camera,this.camera&&(this.camera.updateMatrixWorld(),this.viewToWorld=this.camera.matrixWorld.clone()));s??!0;){const A=i?this.viewToWorld:void 0;if(this.spark.updateInternal({scene:t,originToWorld:A}))break;await new Promise(h=>setTimeout(h,10))}const r=this.spark.active;r!==((o=this.display)==null?void 0:o.accumulator)&&(this.spark.active.refCount+=1),await this.sortUpdate({accumulator:r,viewToWorld:this.viewToWorld})}renderTarget({scene:t,camera:n}){var a;const s=this.back??this.target;if(!s)throw new Error("Must initialize SparkViewpoint with target");if(n=n??this.camera,!n)throw new Error("Must provide camera");if(n instanceof js){const i=new js().copy(n,!1);i.aspect=s.width/s.height,i.updateProjectionMatrix(),n=i}this.viewToWorld=n.matrixWorld.clone();try{this.spark.renderer.setRenderTarget(s),this.spark.prepareViewpoint(this),this.spark.renderer.render(t,n)}finally{this.spark.prepareViewpoint(this.spark.defaultView),this.spark.renderer.setRenderTarget(null)}s!==this.target&&([this.target,this.back]=[this.back,this.target]),(a=this.onTextureUpdated)==null||a.call(this,s.texture)}async readTarget(){if(!this.target)throw new Error("Must initialize SparkViewpoint with target");const{width:t,height:n}=this.target,a=t*n*4;(!this.superPixels||this.superPixels.length<a)&&(this.superPixels=new Uint8Array(a)),await this.spark.renderer.readRenderTargetPixelsAsync(this.target,0,0,t,n,this.superPixels);const{superXY:s}=this;if(s===1)return this.superPixels;const i=t/s,o=n/s,r=i*o*4;(!this.pixels||this.pixels.length<r)&&(this.pixels=new Uint8Array(r));const{superPixels:A,pixels:l}=this,h=s*s;for(let c=0;c<o;c++){const u=c*i;for(let d=0;d<i;d++){const p=d*s;let m=0,f=0,B=0,E=0;for(let y=0;y<s;y++){const Q=(c*s+y)*this.target.width;for(let k=0;k<s;k++){const b=(Q+p+k)*4;m+=A[b],f+=A[b+1],B+=A[b+2],E+=A[b+3]}}const I=(u+d)*4;l[I]=m/h,l[I+1]=f/h,l[I+2]=B/h,l[I+3]=E/h}}return l}async prepareRenderPixels({scene:t,camera:n,viewToWorld:a,update:s,forceOrigin:i}){return await this.prepare({scene:t,camera:n,viewToWorld:a,update:s,forceOrigin:i}),this.renderTarget({scene:t,camera:n}),this.readTarget()}autoPoll({accumulator:t}){var n,a,s;this.camera&&(this.camera.updateMatrixWorld(),this.viewToWorld=this.camera.matrixWorld.clone());let i=!1,o=!1;if(!this.display)i=!0;else if(t){i=!0;const{mappingVersion:A}=this.display.accumulator;t.mappingVersion===A&&(t.refCount+=1,this.spark.releaseAccumulator(this.display.accumulator),this.display.accumulator=t,this.display.viewToWorld.copy(this.viewToWorld),o=!0,this.spark.viewpoint===this&&this.spark.prepareViewpoint(this))}const r=((n=this.sorting)==null?void 0:n.viewToWorld)??((a=this.display)==null?void 0:a.viewToWorld);r&&!$o({matrix1:this.viewToWorld,matrix2:r,maxDistance:this.sortDistance??.01,minCoorient:this.sortCoorient??this.sortRadial?.99:.999})&&(i=!0),i&&(t&&(t.refCount+=1),(s=this.pending)!=null&&s.accumulator&&this.spark.releaseAccumulator(this.pending.accumulator),this.pending={accumulator:t,viewToWorld:this.viewToWorld,displayed:o},this.driveSort())}async driveSort(){for(var t;;){if(this.sorting||!this.pending)return;const{viewToWorld:n,displayed:a}=this.pending;let s=this.pending.accumulator;if(s||(s=((t=this.display)==null?void 0:t.accumulator)??this.spark.active,s.refCount+=1),this.pending=null,!s)throw new Error("No accumulator to sort");this.sorting={viewToWorld:n},await this.sortUpdate({accumulator:s,viewToWorld:n,displayed:a}),this.sorting=null,this.spark.releaseAccumulator(s)}}async sortUpdate({accumulator:t,viewToWorld:n,displayed:a=!1}){if(this.sortingCheck)throw new Error("Only one sort at a time");this.sortingCheck=!0,t=t??this.spark.active;const{numSplats:s,maxSplats:i}=t.splats;let o=0,r=this.orderingFreelist.alloc(i);if(this.stochastic){o=s;for(let A=0;A<s;++A)r[A]=A}else if(s>0){const{reader:A,doubleSortReader:l,sort32Reader:h,dynoSortRadial:c,dynoOrigin:u,dynoDirection:d,dynoDepthBias:p,dynoSort360:m,dynoSplats:f}=Ds.makeSorter(),B=this.sort32??!1;let E;if(B)this.readback32=A.ensureBuffer(i,this.readback32),E=this.readback32;else{const S=Math.ceil(i/2);this.readback16=A.ensureBuffer(S,this.readback16),E=this.readback16}const I=t.toWorld.clone().invert(),y=n.clone().premultiply(I);c.value=this.sort360?!0:this.sortRadial,u.value.set(0,0,0).applyMatrix4(y),d.value.set(0,0,-1).applyMatrix4(y).sub(u.value).normalize(),p.value=this.depthBias??1,m.value=this.sort360??!1,f.packedSplats=t.splats;const Q=B?h:l,k=B?s:Math.ceil(s/2);await A.renderReadback({renderer:this.spark.renderer,reader:Q,count:k,readback:E});const b=await ya(async S=>{const F=B?"sort32Splats":"sortDoubleSplats";return S.call(F,{maxSplats:i,numSplats:s,readback:E,ordering:r})});B?this.readback32=b.readback:this.readback16=b.readback,r=b.ordering,o=b.activeSplats}this.updateDisplay({accumulator:t,viewToWorld:n,ordering:r,activeSplats:o,displayed:a}),this.sortingCheck=!1}updateDisplay({accumulator:t,viewToWorld:n,ordering:a,activeSplats:s,displayed:i=!1}){if(!this.display)t.refCount+=1,this.display={accumulator:t,viewToWorld:n,geometry:new sr(a,s)};else{!i&&t!==this.display.accumulator&&(t.refCount+=1,this.spark.releaseAccumulator(this.display.accumulator),this.display.accumulator=t),this.display.viewToWorld=n;const o=this.display.geometry.ordering;o.length===a.length?this.display.geometry.update(a,s):(this.display.geometry.dispose(),this.display.geometry=new sr(a,s)),this.orderingFreelist.free(o)}this.spark.viewpoint===this&&this.spark.prepareViewpoint(this)}static makeSorter(){if(!Ds.dynos){const t=new fA({value:!0}),n=new Pi({value:new q}),a=new Pi({value:new q}),s=new Ks({value:1}),i=new fA({value:!1}),o=new Dr,r=new zl,A=ta({index:"int"},{rgba8:"vec4"},({index:h})=>{if(!h)throw new Error("No index");const c={sortRadial:t,sortOrigin:n,sortDirection:a,sortDepthBias:s,sort360:i},u=ks(h,Ys("int",2)),d=qs(o,u),p=zo({gsplat:d,...c}),m=qs(o,xa(u,Ys("int",1))),f=zo({gsplat:m,...c}),B=A0({vectorType:"vec2",x:p,y:f});return{rgba8:CA(n0(B))}}),l=ta({index:"int"},{rgba8:"vec4"},({index:h})=>{if(!h)throw new Error("No index");const c={sortRadial:t,sortOrigin:n,sortDirection:a,sortDepthBias:s,sort360:i},u=qs(o,h),d=zo({gsplat:u,...c});return{rgba8:CA(e0(d))}});Ds.dynos={dynoSortRadial:t,dynoOrigin:n,dynoDirection:a,dynoDepthBias:s,dynoSort360:i,dynoSplats:o,reader:r,doubleSortReader:A,sort32Reader:l}}return Ds.dynos}};Tr.EMPTY_TEXTURE=new oh;Tr.dynos=null;let xA=Tr;const rf=an(`
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
`);function zo({gsplat:e,sortRadial:t,sortOrigin:n,sortDirection:a,sortDepthBias:s,sort360:i}){return eo({inTypes:{gsplat:be,sortRadial:"bool",sortOrigin:"vec3",sortDirection:"vec3",sortDepthBias:"float",sort360:"bool"},outTypes:{metric:"float"},globals:()=>[Yn,rf],inputs:{gsplat:e,sortRadial:t,sortOrigin:n,sortDirection:a,sortDepthBias:s,sort360:i},statements:({inputs:o,outputs:r})=>{const{gsplat:A,sortRadial:l,sortOrigin:h,sortDirection:c,sortDepthBias:u,sort360:d}=o;return Gn(`
        ${r.metric} = computeSort(${A}, ${l}, ${h}, ${c}, ${u}, ${d});
      `)}}).outputs.metric}class Fo{constructor(){this.splats=new Ua,this.toWorld=new Ze,this.mapping=[],this.refCount=0,this.splatsVersion=-1,this.mappingVersion=-1}ensureGenerate(t){this.splats.ensureGenerate(t)&&(this.mapping=[])}generateSplats({renderer:t,modifier:n,generators:a,forceUpdate:s,originToWorld:i}){const o=this.mapping.reduce((l,h)=>(l.set(h.node,h),l),new Map);let r=0,A=0;for(const{node:l,generator:h,version:c,base:u,count:d}of a){const p=o.get(l);if((s||h!==(p==null?void 0:p.generator)||c!==(p==null?void 0:p.version)||u!==(p==null?void 0:p.base)||d!==(p==null?void 0:p.count))&&h&&d>0){const m=n.apply(h);try{this.splats.generate({generator:m,base:u,count:d,renderer:t})}catch(f){l.generator=void 0,l.generatorError=f}r+=1}A=Math.max(A,u+d)}return this.splats.numSplats=A,this.toWorld.copy(i),this.mapping=a,r!==0}hasCorrespondence(t){return this.mapping.length!==t.mapping.length?!1:this.mapping.every(({node:n,base:a,count:s},i)=>{const{node:o,base:r,count:A}=t.mapping[i];return n===o&&a===r&&s===A})}}var Af=`const float LN_SCALE_MIN = -12.0;
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
}`,lf=`precision highp float;
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
}`,cf=`precision highp float;
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
}`;let No=null;function hf(){return No||(dh.splatDefines=Af,No={splatVertex:cf,splatFragment:lf}),No}const QA=5,Ao=class Ne extends X{constructor(t){const n=Ne.makeUniforms(),a=hf(),s=t.premultipliedAlpha??!0,i=new me({glslVersion:al,vertexShader:a.splatVertex,fragmentShader:a.splatFragment,uniforms:n,premultipliedAlpha:s,transparent:!0,depthTest:!0,depthWrite:!1,side:en});super(bA,i),this.splatTexture=null,this.autoViewpoints=[],this.rotateToAccumulator=new io({value:new ze}),this.translateToAccumulator=new Pi({value:new q}),this.lastFrame=-1,this.lastUpdateTime=null,this.defaultCameras=[],this.lastStochastic=null,this.pendingUpdate={scene:null,originToWorld:new Ze,timeoutId:-1},this.envViewpoint=null,this.frustumCulled=!1,this.renderer=t.renderer,this.material=i,this.uniforms=n;const o=ta({gsplat:be},{gsplat:be},({gsplat:r})=>{if(!r)throw new Error("gsplat not defined");return r=Sl(r,{rotate:this.rotateToAccumulator,translate:this.translateToAccumulator}),{gsplat:r}});this.modifier=new S0(o),this.premultipliedAlpha=s,this.autoUpdate=t.autoUpdate??!0,this.preUpdate=t.preUpdate??!1,this.needsUpdate=!1,this.originDistance=t.originDistance??1,this.maxStdDev=t.maxStdDev??Math.sqrt(8),this.minPixelRadius=t.minPixelRadius??0,this.maxPixelRadius=t.maxPixelRadius??512,this.minAlpha=t.minAlpha??.5*(1/255),this.enable2DGS=t.enable2DGS??!1,this.preBlurAmount=t.preBlurAmount??0,this.blurAmount=t.blurAmount??.3,this.focalDistance=t.focalDistance??0,this.apertureAngle=t.apertureAngle??0,this.falloff=t.falloff??1,this.clipXY=t.clipXY??1.4,this.focalAdjustment=t.focalAdjustment??1,this.splatEncoding=t.splatEncoding??{...ro},this.active=new Fo,this.active.refCount=1,this.accumulatorCount=1,this.freeAccumulators=[];for(let r=0;r<1;++r)this.freeAccumulators.push(new Fo),this.accumulatorCount+=1;this.defaultView=new xA({...t.view,autoUpdate:!0,spark:this}),this.viewpoint=this.defaultView,this.prepareViewpoint(this.viewpoint),this.clock=t.clock?Gg(t.clock):new yr}static makeUniforms(){return{renderSize:{value:new kt},near:{value:.1},far:{value:1e3},numSplats:{value:0},renderToViewQuat:{value:new ze},renderToViewPos:{value:new q},maxStdDev:{value:1},minPixelRadius:{value:0},maxPixelRadius:{value:512},minAlpha:{value:.00196078431372549},stochastic:{value:!1},enable2DGS:{value:!1},preBlurAmount:{value:0},blurAmount:{value:.3},focalDistance:{value:0},apertureAngle:{value:0},falloff:{value:1},clipXY:{value:1.4},focalAdjustment:{value:1},splatTexEnable:{value:!1},splatTexture:{type:"t",value:Ne.EMPTY_SPLAT_TEXTURE},splatTexMul:{value:new sl},splatTexAdd:{value:new kt},splatTexNear:{value:.1},splatTexFar:{value:1e3},splatTexMid:{value:0},packedSplats:{type:"t",value:Ua.getEmpty()},rgbMinMaxLnScaleMinMax:{value:new yn},time:{value:0},deltaTime:{value:0},encodeLinear:{value:!1},debugFlag:{value:!1}}}canAllocAccumulator(){return this.freeAccumulators.length>0||this.accumulatorCount<QA}maybeAllocAccumulator(){let t=this.freeAccumulators.pop();if(t===void 0){if(this.accumulatorCount>=QA)return null;t=new Fo,this.accumulatorCount+=1}return t.refCount=1,t}releaseAccumulator(t){t.refCount-=1,t.refCount===0&&this.freeAccumulators.push(t)}newViewpoint(t){return new xA({...t,spark:this})}onBeforeRender(t,n,a){var s,i;const o=this.time??this.clock.getElapsedTime(),r=o-(this.viewpoint.lastTime??o);this.viewpoint.lastTime=o;const A=t.info.render.frame,l=A!==this.lastFrame;this.lastFrame=A;const h=this.viewpoint;if(h===this.defaultView){if(l)if(!t.xr.isPresenting)this.defaultView.viewToWorld=a.matrixWorld.clone(),this.defaultCameras=[this.defaultView.viewToWorld];else{const m=t.xr.getCamera().cameras;this.defaultCameras=m.map(f=>f.matrixWorld),this.defaultView.viewToWorld=uf(this.defaultCameras)??new Ze}this.autoUpdate&&this.update({scene:n,viewToWorld:this.defaultView.viewToWorld})}if(l&&(this.material.premultipliedAlpha!==this.premultipliedAlpha&&(this.material.premultipliedAlpha=this.premultipliedAlpha,this.material.needsUpdate=!0),this.uniforms.time.value=o,this.uniforms.deltaTime.value=r,this.uniforms.debugFlag.value=performance.now()/1e3%2<1,h.display&&h.stochastic&&(this.geometry.instanceCount=this.uniforms.numSplats.value)),h.target)this.uniforms.renderSize.value.set(h.target.width,h.target.height);else{const m=t.getDrawingBufferSize(this.uniforms.renderSize.value);if(m.x===1&&m.y===1){const f=(s=t.xr.getSession())==null?void 0:s.renderState.baseLayer;f&&(m.x=f.framebufferWidth,m.y=f.framebufferHeight)}}const c=a;if(this.uniforms.near.value=c.near,this.uniforms.far.value=c.far,this.uniforms.encodeLinear.value=h.encodeLinear,this.uniforms.maxStdDev.value=this.maxStdDev,this.uniforms.minPixelRadius.value=this.minPixelRadius,this.uniforms.maxPixelRadius.value=this.maxPixelRadius,this.uniforms.minAlpha.value=this.minAlpha,this.uniforms.stochastic.value=h.stochastic,this.uniforms.enable2DGS.value=this.enable2DGS,this.uniforms.preBlurAmount.value=this.preBlurAmount,this.uniforms.blurAmount.value=this.blurAmount,this.uniforms.focalDistance.value=this.focalDistance,this.uniforms.apertureAngle.value=this.apertureAngle,this.uniforms.falloff.value=this.falloff,this.uniforms.clipXY.value=this.clipXY,this.uniforms.focalAdjustment.value=this.focalAdjustment,this.lastStochastic!==!h.stochastic&&(this.lastStochastic=!h.stochastic,this.material.transparent=!h.stochastic,this.material.depthWrite=h.stochastic,this.material.needsUpdate=!0),this.splatTexture){const{enable:m,texture:f,multiply:B,add:E,near:I,far:y,mid:Q}=this.splatTexture;m&&f?(this.uniforms.splatTexEnable.value=!0,this.uniforms.splatTexture.value=f,B?this.uniforms.splatTexMul.value.fromArray(B.elements):this.uniforms.splatTexMul.value.set(.5/this.maxStdDev,0,0,.5/this.maxStdDev),this.uniforms.splatTexAdd.value.set((E==null?void 0:E.x)??.5,(E==null?void 0:E.y)??.5),this.uniforms.splatTexNear.value=I??this.uniforms.near.value,this.uniforms.splatTexFar.value=y??this.uniforms.far.value,this.uniforms.splatTexMid.value=Q??0):(this.uniforms.splatTexEnable.value=!1,this.uniforms.splatTexture.value=Ne.EMPTY_SPLAT_TEXTURE)}else this.uniforms.splatTexEnable.value=!1,this.uniforms.splatTexture.value=Ne.EMPTY_SPLAT_TEXTURE;const u=((i=h.display)==null?void 0:i.accumulator.toWorld)??new Ze,d=a.matrixWorld.clone().invert();u.clone().premultiply(d).decompose(this.uniforms.renderToViewPos.value,this.uniforms.renderToViewQuat.value,new q)}prepareViewpoint(t){var n,a,s,i;if(this.viewpoint=t??this.viewpoint,this.viewpoint.display){const{accumulator:o,geometry:r}=this.viewpoint.display;this.uniforms.numSplats.value=o.splats.numSplats,this.uniforms.packedSplats.value=o.splats.getTexture(),this.uniforms.rgbMinMaxLnScaleMinMax.value.set(((n=o.splats.splatEncoding)==null?void 0:n.rgbMin)??0,((a=o.splats.splatEncoding)==null?void 0:a.rgbMax)??1,((s=o.splats.splatEncoding)==null?void 0:s.lnScaleMin)??Zn,((i=o.splats.splatEncoding)==null?void 0:i.lnScaleMax)??$n),this.geometry=r,this.material.transparent=!this.viewpoint.stochastic,this.material.depthWrite=this.viewpoint.stochastic,this.material.needsUpdate=!0}else this.uniforms.numSplats.value=0,this.uniforms.packedSplats.value=Ua.getEmpty(),this.geometry=bA}update({scene:t,viewToWorld:n}){const a=this.matrixWorld;this.preUpdate?this.updateInternal({scene:t,originToWorld:a.clone(),viewToWorld:n}):(this.pendingUpdate.scene=t,this.pendingUpdate.originToWorld.copy(a),this.pendingUpdate.timeoutId===-1&&(this.pendingUpdate.timeoutId=setTimeout(()=>{const{scene:s,originToWorld:i}=this.pendingUpdate;this.pendingUpdate.scene=null,this.pendingUpdate.timeoutId=-1,this.updateInternal({scene:s,originToWorld:i,viewToWorld:n})&&this.renderer.getContext().flush()},1)))}updateInternal({scene:t,originToWorld:n,viewToWorld:a}){var s;if(!this.canAllocAccumulator())return!1;n||(n=this.active.toWorld),a=a??n.clone();const i=this.time??this.clock.getElapsedTime(),o=i-(this.lastUpdateTime??i);this.lastUpdateTime=i;const r=this.active.mapping.reduce((m,f)=>(m.set(f.node,f),m),new Map),{generators:A,visibleGenerators:l,globalEdits:h}=this.compileScene(t);for(const m of A)(s=m.frameUpdate)==null||s.call(m,{object:m,time:i,deltaTime:o,viewToWorld:a,globalEdits:h});const c=new Set(l.map(m=>m.uuid));for(const m of A){const f=r.get(m),E=m.generator&&c.has(m.uuid)?m.numSplats:0;(this.needsUpdate||m.generator!==(f==null?void 0:f.generator)||E!==(f==null?void 0:f.count))&&m.updateVersion()}const u=!$o({matrix1:n,matrix2:this.active.toWorld,maxDistance:this.originDistance}),d=this.needsUpdate||u||A.length!==r.size||A.some(m=>{var f;return m.version!==((f=r.get(m))==null?void 0:f.version)});this.needsUpdate=!1;let p=null;if(d){if(p=this.maybeAllocAccumulator(),!p)throw new Error("Unreachable");const m=!$o({matrix1:n,matrix2:p.toWorld,maxDistance:1e-5,minCoorient:.99999}),B=l.map((b,S)=>{const F=r.get(b);return F?[b.version-F.version,F.base,b]:[Number.POSITIVE_INFINITY,b.version,b]}).sort((b,S)=>b[0]!==S[0]?b[0]-S[0]:b[1]-S[1]).map(([b,S,F])=>F),E=B.map(b=>b.numSplats),{maxSplats:I,mapping:y}=p.splats.generateMapping(E),Q=B.map((b,S)=>{const{base:F,count:j}=y[S];return{node:b,generator:b.generator,version:b.version,base:F,count:j}});n.clone().invert().decompose(this.translateToAccumulator.value,this.rotateToAccumulator.value,new q),p.ensureGenerate(I),p.splats.splatEncoding={...this.splatEncoding},p.generateSplats({renderer:this.renderer,modifier:this.modifier,generators:Q,forceUpdate:m,originToWorld:n}),p.splatsVersion=this.active.splatsVersion+1;const k=p.hasCorrespondence(this.active);p.mappingVersion=this.active.mappingVersion+(k?0:1),this.releaseAccumulator(this.active),this.active=p,this.prepareViewpoint()}return setTimeout(()=>{for(const m of this.autoViewpoints)m.autoPoll({accumulator:p??void 0})},1),!0}compileScene(t){const n=[];t.traverse(i=>{i instanceof er&&n.push(i)});const a=[];t.traverseVisible(i=>{i instanceof er&&a.push(i)});const s=new Set;return t.traverseVisible(i=>{if(i instanceof Gl){let o=i.parent;for(;o!=null&&!(o instanceof Mr);)o=o.parent;o==null&&s.add(i)}}),{generators:n,visibleGenerators:a,globalEdits:Array.from(s)}}async renderEnvMap({renderer:t,scene:n,worldCenter:a,size:s=256,near:i=.1,far:o=1e3,hideObjects:r=[],update:A=!1}){var l,h;if(this.envViewpoint||(this.envViewpoint=this.newViewpoint({sort360:!0})),!Ne.cubeRender||Ne.cubeRender.target.width!==s||Ne.cubeRender.near!==i||Ne.cubeRender.far!==o){Ne.cubeRender&&Ne.cubeRender.target.dispose();const m=new lh(s,{format:La,generateMipmaps:!0,minFilter:ch}),f=new hh(i,o,m);Ne.cubeRender={target:m,camera:f,near:i,far:o}}Ne.pmrem||(Ne.pmrem=new il(t??this.renderer));const c=new Ze().setPosition(a);await((l=this.envViewpoint)==null?void 0:l.prepare({scene:n,viewToWorld:c,update:A}));const{target:u,camera:d}=Ne.cubeRender;d.position.copy(a);const p=new Map;for(const m of r)p.set(m,m.visible),m.visible=!1;this.prepareViewpoint(this.envViewpoint),d.update(t??this.renderer,n),this.prepareViewpoint(this.defaultView);for(const[m,f]of p.entries())m.visible=f;return(h=Ne.pmrem)==null?void 0:h.fromCubemap(u.texture).texture}recurseSetEnvMap(t,n){t.traverse(a=>{if(a instanceof X)if(Array.isArray(a.material))for(const s of a.material)s instanceof oe&&(s.envMap=n);else a.material instanceof oe&&(a.material.envMap=n)})}getRgba({generator:t,rgba:n}){const a=this.active.mapping.find(({node:s})=>s===t);if(!a)throw new Error("Generator not found");return n=n??new B0,n.fromPackedSplats({packedSplats:this.active.splats,base:a.base,count:a.count,renderer:this.renderer}),n}async readRgba({generator:t,rgba:n}){return n=this.getRgba({generator:t,rgba:n}),n.read()}};Ao.cubeRender=null;Ao.pmrem=null;Ao.EMPTY_SPLAT_TEXTURE=new rh;let vA=Ao;const bA=new sr(new Uint32Array(1),0);ta({packedSplats:so,index:"int"},{gsplat:be},({packedSplats:e,index:t})=>{if(!e||!t)throw new Error("Invalid input");return{gsplat:qs(e,t)}});function uf(e){if(e.length===0)return null;const t=new q,n=new ze,a=new q,s=[],i=[];for(const o of e)o.decompose(t,n,a),s.push(t),i.push(n);return new Ze().compose(qg(s),Pg(i),new q(1,1,1))}an(`
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
`);new Br(new q(-1,-1,-1),new q(1,1,1)),new q(-1,-3,1).normalize(),new Wt(1,1,1),new Wt(.5,.5,1),new q(1,1,1);new Br(new q(-2,-1,-2),new q(2,5,2)),new q(0,-1,0),new Wt(1,1,1),new Wt(.25,.25,.5),new q(.1,1,.1);const Kl=class ir{static createButton(t,n={}){const a=navigator.xr;if(!a)return null;const s=a,i=document.createElement("button");t.xr.enabled=!0,t.xr.setReferenceSpaceType("local");function o(){let c=null;async function u(m){console.log("onSessionStarted"),m.addEventListener("end",d),await t.xr.setSession(m),i.textContent="EXIT VR",c=m}function d(){console.log("onSessionEnded"),c==null||c.removeEventListener("end",d),i.textContent="ENTER VR",c=null}i.style.display="",i.style.cursor="pointer",i.style.left="calc(50% - 100px)",i.style.width="200px",i.style.height="100px",i.textContent="ENTER VR";const p={...n,optionalFeatures:[...n.optionalFeatures||[]]};i.onmouseenter=()=>{i.style.opacity="1.0"},i.onmouseleave=()=>{i.style.opacity="0.5"},i.onclick=()=>{c===null?(console.log("requesting session"),s.requestSession("immersive-vr",p).then(u)):(console.log("ending session"),c.end())}}function r(){i.style.display="none",i.style.cursor="auto",i.style.left="calc(50% - 75px)",i.style.width="150px",i.onmouseenter=null,i.onmouseleave=null,i.onclick=null}function A(){r(),i.textContent="VR NOT SUPPORTED"}function l(c){r(),console.warn("Exception when trying to call xr.isSessionSupported",c),i.textContent="VR NOT ALLOWED"}function h(c){c.style.position="absolute",c.style.bottom="20px",c.style.padding="12px 6px",c.style.border="1px solid #fff",c.style.borderRadius="4px",c.style.background="rgba(0,0,0,0.1)",c.style.color="#fff",c.style.font="normal 13px sans-serif",c.style.textAlign="center",c.style.opacity="0.5",c.style.outline="none",c.style.zIndex="999"}return i.id="VRButton",i.style.display="none",h(i),s.isSessionSupported("immersive-vr").then(c=>{c?o():A(),c&&ir.xrSessionIsGranted&&i.click()}).catch(l),i}static registerSessionGrantedListener(){const t=navigator.xr;if(!t)return null;const n=t;/WebXRViewer\//i.test(navigator.userAgent)||n.addEventListener("sessiongranted",()=>{ir.xrSessionIsGranted=!0})}};Kl.xrSessionIsGranted=!1;let gf=Kl;gf.registerSessionGrantedListener();var Zl=(e=>(e.w="wrist",e.t0="thumb-metacarpal",e.t1="thumb-phalanx-proximal",e.t2="thumb-phalanx-distal",e.t3="thumb-tip",e.i0="index-finger-metacarpal",e.i1="index-finger-phalanx-proximal",e.i2="index-finger-phalanx-intermediate",e.i3="index-finger-phalanx-distal",e.i4="index-finger-tip",e.m0="middle-finger-metacarpal",e.m1="middle-finger-phalanx-proximal",e.m2="middle-finger-phalanx-intermediate",e.m3="middle-finger-phalanx-distal",e.m4="middle-finger-tip",e.r0="ring-finger-metacarpal",e.r1="ring-finger-phalanx-proximal",e.r2="ring-finger-phalanx-intermediate",e.r3="ring-finger-phalanx-distal",e.r4="ring-finger-tip",e.p0="pinky-finger-metacarpal",e.p1="pinky-finger-phalanx-proximal",e.p2="pinky-finger-phalanx-intermediate",e.p3="pinky-finger-phalanx-distal",e.p4="pinky-finger-tip",e))(Zl||{});const ff=Object.keys(Zl);ff.length;new q(0,0,-1),new q(0,0,1),new q(-1,0,0),new q(1,0,0),new q(0,1,0),new q(0,-1,0);new q(0,0,-1),new q(0,0,1),new q(-1,0,0),new q(1,0,0),new q(0,1,0),new q(0,-1,0);new q(0,0,1),new q(0,0,-1);new q(0,-1,0),new q(0,1,0),new q(-1,0,0),new q(1,0,0);const Ps={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Es{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const df=new Cr(-1,1,1,-1,0,1);class pf extends Cs{constructor(){super(),this.setAttribute("position",new gs([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gs([0,2,0,0,2,0],2))}}const mf=new pf;class _r{constructor(t){this._mesh=new X(mf,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,df)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class $l extends Es{constructor(t,n){super(),this.textureID=n!==void 0?n:"tDiffuse",t instanceof me?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ua.clone(t.uniforms),this.material=new me({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new _r(this.material)}render(t,n,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class SA extends Es{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,a){const s=t.getContext(),i=t.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let o,r;this.inverse?(o=0,r=1):(o=1,r=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),i.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),i.buffers.stencil.setClear(r),i.buffers.stencil.setLocked(!0),t.setRenderTarget(a),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(s.EQUAL,1,4294967295),i.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),i.buffers.stencil.setLocked(!0)}}class If extends Es{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Cf{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const a=t.getSize(new kt);this._width=a.width,this._height=a.height,n=new Rn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:fa}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new $l(Ps),this.copyPass.material.blending=Hn,this.clock=new yr}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const n=this.renderer.getRenderTarget();let a=!1;for(let s=0,i=this.passes.length;s<i;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,a),o.needsSwap){if(a){const r=this.renderer.getContext(),A=this.renderer.state.buffers.stencil;A.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),A.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}SA!==void 0&&(o instanceof SA?a=!0:o instanceof If&&(a=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new kt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const a=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(a,s),this.renderTarget2.setSize(a,s);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(a,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ef extends Es{constructor(t,n,a=null,s=null,i=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=a,this.clearColor=s,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Wt}render(t,n,a){const s=t.autoClear;t.autoClear=!1;let i,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(i=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const bi={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new kt},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Ze},cameraProjectionMatrixInverse:{value:new Ze},cameraWorldMatrix:{value:new Ze},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new q(-1,-1,-1)},sceneBoxMax:{value:new q(1,1,1)}},vertexShader:`

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
		}`},Si={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Lo={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Bf(e=5){const t=Math.floor(e)%2===0?Math.floor(e)+1:Math.floor(e),n=yf(t),a=n.length,s=new Uint8Array(a*4);for(let o=0;o<a;++o){const r=n[o],A=2*Math.PI*r/a,l=new q(Math.cos(A),Math.sin(A),0).normalize();s[o*4]=(l.x*.5+.5)*255,s[o*4+1]=(l.y*.5+.5)*255,s[o*4+2]=127,s[o*4+3]=255}const i=new wr(s,t,t);return i.wrapS=zn,i.wrapT=zn,i.needsUpdate=!0,i}function yf(e){const t=Math.floor(e)%2===0?Math.floor(e)+1:Math.floor(e),n=t*t,a=Array(n).fill(0);let s=Math.floor(t/2),i=t-1;for(let o=1;o<=n;){if(s===-1&&i===t?(i=t-2,s=0):(i===t&&(i=0),s<0&&(s=t-1)),a[s*t+i]!==0){i-=2,s++;continue}else a[s*t+i]=o++;i++,s--}return a}const Mi={defines:{SAMPLES:16,SAMPLE_VECTORS:tc(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new kt},cameraProjectionMatrixInverse:{value:new Ze},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function tc(e,t,n){const a=wf(e,t,n);let s="vec3[SAMPLES](";for(let i=0;i<e;i++){const o=a[i];s+=`vec3(${o.x}, ${o.y}, ${o.z})${i<e-1?",":")"}`}return s}function wf(e,t,n){const a=[];for(let s=0;s<e;s++){const i=2*Math.PI*t*s/e,o=Math.pow(s/(e-1),n);a.push(new q(Math.cos(i),Math.sin(i),o))}return a}class xf{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let n=0;n<256;n++)this.p[n]=Math.floor(t.random()*256);this.perm=[];for(let n=0;n<512;n++)this.perm[n]=this.p[n&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(t,n,a){return t[0]*n+t[1]*a}dot3(t,n,a,s){return t[0]*n+t[1]*a+t[2]*s}dot4(t,n,a,s,i){return t[0]*n+t[1]*a+t[2]*s+t[3]*i}noise(t,n){let a,s,i;const o=.5*(Math.sqrt(3)-1),r=(t+n)*o,A=Math.floor(t+r),l=Math.floor(n+r),h=(3-Math.sqrt(3))/6,c=(A+l)*h,u=A-c,d=l-c,p=t-u,m=n-d;let f,B;p>m?(f=1,B=0):(f=0,B=1);const E=p-f+h,I=m-B+h,y=p-1+2*h,Q=m-1+2*h,k=A&255,b=l&255,S=this.perm[k+this.perm[b]]%12,F=this.perm[k+f+this.perm[b+B]]%12,j=this.perm[k+1+this.perm[b+1]]%12;let w=.5-p*p-m*m;w<0?a=0:(w*=w,a=w*w*this.dot(this.grad3[S],p,m));let _=.5-E*E-I*I;_<0?s=0:(_*=_,s=_*_*this.dot(this.grad3[F],E,I));let tt=.5-y*y-Q*Q;return tt<0?i=0:(tt*=tt,i=tt*tt*this.dot(this.grad3[j],y,Q)),70*(a+s+i)}noise3d(t,n,a){let s,i,o,r;const l=(t+n+a)*.3333333333333333,h=Math.floor(t+l),c=Math.floor(n+l),u=Math.floor(a+l),d=1/6,p=(h+c+u)*d,m=h-p,f=c-p,B=u-p,E=t-m,I=n-f,y=a-B;let Q,k,b,S,F,j;E>=I?I>=y?(Q=1,k=0,b=0,S=1,F=1,j=0):E>=y?(Q=1,k=0,b=0,S=1,F=0,j=1):(Q=0,k=0,b=1,S=1,F=0,j=1):I<y?(Q=0,k=0,b=1,S=0,F=1,j=1):E<y?(Q=0,k=1,b=0,S=0,F=1,j=1):(Q=0,k=1,b=0,S=1,F=1,j=0);const w=E-Q+d,_=I-k+d,tt=y-b+d,G=E-S+2*d,et=I-F+2*d,Y=y-j+2*d,ct=E-1+3*d,ft=I-1+3*d,H=y-1+3*d,pt=h&255,ht=c&255,ut=u&255,rt=this.perm[pt+this.perm[ht+this.perm[ut]]]%12,Qt=this.perm[pt+Q+this.perm[ht+k+this.perm[ut+b]]]%12,yt=this.perm[pt+S+this.perm[ht+F+this.perm[ut+j]]]%12,vt=this.perm[pt+1+this.perm[ht+1+this.perm[ut+1]]]%12;let Et=.6-E*E-I*I-y*y;Et<0?s=0:(Et*=Et,s=Et*Et*this.dot3(this.grad3[rt],E,I,y));let Dt=.6-w*w-_*_-tt*tt;Dt<0?i=0:(Dt*=Dt,i=Dt*Dt*this.dot3(this.grad3[Qt],w,_,tt));let Tt=.6-G*G-et*et-Y*Y;Tt<0?o=0:(Tt*=Tt,o=Tt*Tt*this.dot3(this.grad3[yt],G,et,Y));let M=.6-ct*ct-ft*ft-H*H;return M<0?r=0:(M*=M,r=M*M*this.dot3(this.grad3[vt],ct,ft,H)),32*(s+i+o+r)}noise4d(t,n,a,s){const i=this.grad4,o=this.simplex,r=this.perm,A=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let h,c,u,d,p;const m=(t+n+a+s)*A,f=Math.floor(t+m),B=Math.floor(n+m),E=Math.floor(a+m),I=Math.floor(s+m),y=(f+B+E+I)*l,Q=f-y,k=B-y,b=E-y,S=I-y,F=t-Q,j=n-k,w=a-b,_=s-S,tt=F>j?32:0,G=F>w?16:0,et=j>w?8:0,Y=F>_?4:0,ct=j>_?2:0,ft=w>_?1:0,H=tt+G+et+Y+ct+ft,pt=o[H][0]>=3?1:0,ht=o[H][1]>=3?1:0,ut=o[H][2]>=3?1:0,rt=o[H][3]>=3?1:0,Qt=o[H][0]>=2?1:0,yt=o[H][1]>=2?1:0,vt=o[H][2]>=2?1:0,Et=o[H][3]>=2?1:0,Dt=o[H][0]>=1?1:0,Tt=o[H][1]>=1?1:0,M=o[H][2]>=1?1:0,D=o[H][3]>=1?1:0,T=F-pt+l,it=j-ht+l,Z=w-ut+l,At=_-rt+l,dt=F-Qt+2*l,Bt=j-yt+2*l,Xt=w-vt+2*l,ee=_-Et+2*l,x=F-Dt+3*l,N=j-Tt+3*l,P=w-M+3*l,$=_-D+3*l,z=F-1+4*l,mt=j-1+4*l,It=w-1+4*l,_t=_-1+4*l,C=f&255,L=B&255,W=E&255,nt=I&255,V=r[C+r[L+r[W+r[nt]]]]%32,Nt=r[C+pt+r[L+ht+r[W+ut+r[nt+rt]]]]%32,Gt=r[C+Qt+r[L+yt+r[W+vt+r[nt+Et]]]]%32,Mt=r[C+Dt+r[L+Tt+r[W+M+r[nt+D]]]]%32,jt=r[C+1+r[L+1+r[W+1+r[nt+1]]]]%32;let $t=.6-F*F-j*j-w*w-_*_;$t<0?h=0:($t*=$t,h=$t*$t*this.dot4(i[V],F,j,w,_));let Rt=.6-T*T-it*it-Z*Z-At*At;Rt<0?c=0:(Rt*=Rt,c=Rt*Rt*this.dot4(i[Nt],T,it,Z,At));let zt=.6-dt*dt-Bt*Bt-Xt*Xt-ee*ee;zt<0?u=0:(zt*=zt,u=zt*zt*this.dot4(i[Gt],dt,Bt,Xt,ee));let Jt=.6-x*x-N*N-P*P-$*$;Jt<0?d=0:(Jt*=Jt,d=Jt*Jt*this.dot4(i[Mt],x,N,P,$));let pe=.6-z*z-mt*mt-It*It-_t*_t;return pe<0?p=0:(pe*=pe,p=pe*pe*this.dot4(i[jt],z,mt,It,_t)),27*(h+c+u+d+p)}}class mn extends Es{constructor(t,n,a,s,i,o,r){super(),this.width=a!==void 0?a:512,this.height=s!==void 0?s:512,this.clear=!0,this.camera=n,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Bf(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Rn(this.width,this.height,{type:fa}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new me({defines:Object.assign({},bi.defines),uniforms:ua.clone(bi.uniforms),vertexShader:bi.vertexShader,fragmentShader:bi.fragmentShader,blending:Hn,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new ph,this.normalMaterial.blending=Hn,this.pdMaterial=new me({defines:Object.assign({},Mi.defines),uniforms:ua.clone(Mi.uniforms),vertexShader:Mi.vertexShader,fragmentShader:Mi.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new me({defines:Object.assign({},Si.defines),uniforms:ua.clone(Si.uniforms),vertexShader:Si.vertexShader,fragmentShader:Si.fragmentShader,blending:Hn}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new me({uniforms:ua.clone(Ps.uniforms),vertexShader:Ps.vertexShader,fragmentShader:Ps.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:tA,blendDst:Ei,blendEquation:Ci,blendSrcAlpha:$r,blendDstAlpha:Ei,blendEquationAlpha:Ci}),this.blendMaterial=new me({uniforms:ua.clone(Lo.uniforms),vertexShader:Lo.vertexShader,fragmentShader:Lo.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:mh,blendSrc:tA,blendDst:Ei,blendEquation:Ci,blendSrcAlpha:$r,blendDstAlpha:Ei,blendEquationAlpha:Ci}),this.fsQuad=new _r(null),this.originalClearColor=new Wt,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),r!==void 0&&this.updatePdMaterial(r)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(t,n){t!==void 0?(this.depthTexture=t,this.normalTexture=n,this._renderGBuffer=!1):(this.depthTexture=new Ih,this.depthTexture.format=Ch,this.depthTexture.type=Eh,this.normalRenderTarget=new Rn(this.width,this.height,{minFilter:pa,magFilter:pa,type:fa,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const a=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=a,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=a,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let n=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,n=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,n=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,n=!0),n&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=tc(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,n,a){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case mn.OUTPUT.Off:break;case mn.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=a.texture,this.copyMaterial.blending=Hn,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case mn.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Hn,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case mn.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Hn,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case mn.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:n);break;case mn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Hn,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case mn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=a.texture,this.copyMaterial.blending=Hn,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(t,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(t,n,a,s,i){t.getClearColor(this.originalClearColor);const o=t.getClearAlpha(),r=t.autoClear;t.setRenderTarget(a),t.autoClear=!1,s!=null&&(t.setClearColor(s),t.setClearAlpha(i||0),t.clear()),this.fsQuad.material=n,this.fsQuad.render(t),t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(o)}renderOverride(t,n,a,s,i){t.getClearColor(this.originalClearColor);const o=t.getClearAlpha(),r=t.autoClear;t.setRenderTarget(a),t.autoClear=!1,s=n.clearColor||s,i=n.clearAlpha||i,s!=null&&(t.setClearColor(s),t.setClearAlpha(i||0),t.clear()),this.scene.overrideMaterial=n,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=r,t.setClearColor(this.originalClearColor),t.setClearAlpha(o)}setSize(t,n){this.width=t,this.height=n,this.gtaoRenderTarget.setSize(t,n),this.normalRenderTarget.setSize(t,n),this.pdRenderTarget.setSize(t,n),this.gtaoMaterial.uniforms.resolution.value.set(t,n),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,n),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){const t=this.scene,n=this._visibilityCache;t.traverse(function(a){n.set(a,a.visible),(a.isPoints||a.isLine)&&(a.visible=!1)})}restoreVisibility(){const t=this.scene,n=this._visibilityCache;t.traverse(function(a){const s=n.get(a);a.visible=s}),n.clear()}generateNoise(t=64){const n=new xf,a=t*t*4,s=new Uint8Array(a);for(let o=0;o<t;o++)for(let r=0;r<t;r++){const A=o,l=r;s[(o*t+r)*4]=(n.noise(A,l)*.5+.5)*255,s[(o*t+r)*4+1]=(n.noise(A+t,l)*.5+.5)*255,s[(o*t+r)*4+2]=(n.noise(A,l+t)*.5+.5)*255,s[(o*t+r)*4+3]=(n.noise(A+t,l+t)*.5+.5)*255}const i=new wr(s,t,t,La,fs);return i.wrapS=zn,i.wrapT=zn,i.needsUpdate=!0,i}}mn.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Qf={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Wt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ds extends Es{constructor(t,n,a,s){super(),this.strength=n!==void 0?n:1,this.radius=a,this.threshold=s,this.resolution=t!==void 0?new kt(t.x,t.y):new kt(256,256),this.clearColor=new Wt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Rn(i,o,{type:fa}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let c=0;c<this.nMips;c++){const u=new Rn(i,o,{type:fa});u.texture.name="UnrealBloomPass.h"+c,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new Rn(i,o,{type:fa});d.texture.name="UnrealBloomPass.v"+c,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),i=Math.round(i/2),o=Math.round(o/2)}const r=Qf;this.highPassUniforms=ua.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new me({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const A=[3,5,7,9,11];i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let c=0;c<this.nMips;c++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(A[c])),this.separableBlurMaterials[c].uniforms.invSize.value=new kt(1/i,1/o),i=Math.round(i/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new q(1,1,1),new q(1,1,1),new q(1,1,1),new q(1,1,1),new q(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Ps;this.copyUniforms=ua.clone(h.uniforms),this.blendMaterial=new me({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:bn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Wt,this.oldClearAlpha=1,this.basic=new xt,this.fsQuad=new _r(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,n){let a=Math.round(t/2),s=Math.round(n/2);this.renderTargetBright.setSize(a,s);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(a,s),this.renderTargetsVertical[i].setSize(a,s),this.separableBlurMaterials[i].uniforms.invSize.value=new kt(1/a,1/s),a=Math.round(a/2),s=Math.round(s/2)}render(t,n,a,s,i){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),i&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=a.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let r=this.renderTargetBright;for(let A=0;A<this.nMips;A++)this.fsQuad.material=this.separableBlurMaterials[A],this.separableBlurMaterials[A].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[A].uniforms.direction.value=ds.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[A]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[A].uniforms.colorTexture.value=this.renderTargetsHorizontal[A].texture,this.separableBlurMaterials[A].uniforms.direction.value=ds.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[A]),t.clear(),this.fsQuad.render(t),r=this.renderTargetsVertical[A];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(a),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const n=[];for(let a=0;a<t;a++)n.push(.39894*Math.exp(-.5*a*a/(t*t))/t);return new me({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new kt(.5,.5)},direction:{value:new kt(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new me({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}ds.BlurDirectionX=new kt(1,0);ds.BlurDirectionY=new kt(0,1);const Ta=Bh||{},MA=new URLSearchParams(location.search),vf=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>1&&Math.min(screen.width,screen.height)<820,kA=(()=>{try{return localStorage.getItem("tjmPlayQ")}catch{return null}})(),Oi=["low","medium","high"],da=Oi.includes(MA.get("q"))?MA.get("q"):Oi.includes(kA)?kA:vf?"low":"medium",_e=da==="high",Ga=da==="medium",ea=da==="low",or=1,bf=e=>Oi[(Oi.indexOf(e)+1)%3];function Sf(e){try{localStorage.setItem("tjmPlayQ",e)}catch{}const t=new URL(location.href);t.searchParams.delete("q"),location.replace(t)}function Mf(e){const t=new yh({canvas:e,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"});return t.setPixelRatio(Math.min(devicePixelRatio||1,1.25)),t.setSize(innerWidth,innerHeight,!1),t.toneMapping=Xo,t.toneMappingExposure=Ta.exposure??1.8,t.outputColorSpace=Ce,t.shadowMap.enabled=!ea,t.shadowMap.type=_e?wh:xh,t}const kf=new ei,Uo={};function Go(e,t,n){const a=e+t;if(Uo[a])return Uo[a];const s=t==="diff"&&ea&&e!=="metal"?`${e}_diff_1k`:`${e}_${t}`,i=kf.load("/play/pbr/"+s+".webp");return i.wrapS=i.wrapT=zn,i.colorSpace=n?Ce:vh,i.anisotropy=8,Uo[a]=i}const Yo=(e,t,n)=>{const a=e.clone();return a.repeat.set(t,n),a};function ki(e,t,n,a={}){t=Math.max(.5,Math.round(t*4)/4),n=Math.max(.5,Math.round(n*4)/4);const s=[e,t,n,a.wet?1:0,a.tint||""].join("|");if(Ni.has(s))return Ni.get(s);const i=Yo(Go(e,"arm"),t,n),o={map:Yo(Go(e,"diff",!0),t,n),normalMap:Yo(Go(e,"nor"),t,n),aoMap:i,roughnessMap:i,metalnessMap:i,aoMapIntensity:.9};let r;return a.wet&&_e?r=new Qh({...o,roughness:.55,metalness:0,clearcoat:.7,clearcoatRoughness:.12,envMapIntensity:1,normalScale:new kt(.8,.8)}):a.wet?r=new oe({...o,roughness:.5,metalness:0,envMapIntensity:1.1}):e==="metal"?r=new oe({...o,roughness:1,metalness:1,envMapIntensity:.6}):r=new oe({...o,roughness:1,metalness:0,envMapIntensity:.5,normalScale:new kt(.7,.7)}),a.tint&&r.color.set(a.tint),a.wet&&(r.userData.wet=1,!_e&&rr.tex&&(r.envMap=rr.tex,r.envMapIntensity=1.4)),Ni.set(s,r),r}const Qa=Ta.materials?Ta.materials(ea):null,Ni=Qa?Qa.cache:new Map,Ya=Qa?{stone:Qa.stone,metal:Qa.metal,floor:Qa.floor,ceiling:Qa.ceiling}:{stone:(e,t)=>ki("wall",e,t,{tint:12103072}),metal:(e,t)=>ki("metal",e,t),floor:(e,t)=>ki("floor",e,t,{wet:!0,tint:7235166}),ceiling:(e,t)=>ki("metal",e,t,{tint:6969424})},rr={};function Df(e,t){const n=new il(e),a=new Vs;a.add(new X(new Ae(30,10,30),new xt({color:Ta.envColor??1708814,side:tl})));const s=(o,r,A,l,h,c)=>{const u=new X(new ve(c,12,8),new xt({color:new Wt(o).multiplyScalar(r)}));u.position.set(A,l,h),a.add(u)};(Ta.envGlows||[[16747056,6,-8,2,6,.6],[16747056,6,9,2,-5,.6],[16747056,6,3,2.5,12,.5],[16734736,3,-12,-1,-10,2.5],[16769712,2,0,3,-13,1.2]]).forEach(o=>s(...o));const i=n.fromScene(a,.02).texture;n.dispose(),_e?(t.environment=i,t.environmentIntensity=Ta.envIntensity??1.6):Ni.forEach(o=>{o.userData.wet&&(o.envMap=i,o.envMapIntensity=1.4,o.needsUpdate=!0)}),rr.tex=i;{const o=Ta.fog||[1709070,.014,.016];t.fog=new $A(o[0],_e?o[2]:o[1])}}function dn(e){e.traverse(t=>{if(!t.material)return;t.layers.set(or),(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.toneMapped=!1,a.fog=!1})})}const Tf={uniforms:{tDiffuse:{value:null},tPaint:{value:null},toneMappingExposure:{value:1},uVig:{value:.22}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",fragmentShader:`varying vec2 vUv; uniform sampler2D tDiffuse, tPaint; uniform float uVig;
    #include <tonemapping_pars_fragment>
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      vec2 d = vUv - .5; c *= 1. - uVig * dot(d, d) * 2.;            // gentle vignette (graded image only)
      vec3 g = AgXToneMapping(c);
      vec4 p = texture2D(tPaint, vUv);                                // paintings: linear, untouched
      gl_FragColor = sRGBTransferOETF(vec4(mix(g, p.rgb, p.a), 1.)); }`};function _f(e,t,n){n.layers.enable(or);const a=()=>[innerWidth,innerHeight],s={level:"direct",render(){e.setRenderTarget(null),e.clear(),e.render(t,n)},setSize(){e.setSize(innerWidth,innerHeight,!1)}};if(!_e)return s;const i=e.getPixelRatio();let[o,r]=a();const A=new Rn(o*i,r*i,{type:fa,samples:2}),l=new Cf(e,A);l.addPass(new Ef(t,n));const h=new mn(t,n,o*i/2,r*i/2),c=h.setSize.bind(h);h.setSize=(k,b)=>c(Math.round(k/2),Math.round(b/2)),h.output=mn.OUTPUT.Default,h.blendIntensity=.75,h.updateGtaoMaterial({radius:.45,distanceExponent:1.4,thickness:1.2,scale:1,samples:8}),h.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:4,rings:2,samples:8}),l.addPass(h);const u=new ds(new kt(o/2,r/2),.32,.5,1),d=u.setSize.bind(u);u.setSize=(k,b)=>d(Math.round(k/2),Math.round(b/2)),l.addPass(u);const p=new $l(Tf);p.material.toneMapped=!1,l.addPass(p);const m=new Rn(o*i,r*i,{type:fa,samples:2});p.uniforms.tPaint.value=m.texture;const f=new xt({colorWrite:!1,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2,side:en}),B=new Wt;function E(){const k=t.background,b=t.fog,S=e.autoClear,F=t.overrideMaterial,j=n.layers.mask,w=e.shadowMap.autoUpdate;e.getClearColor(B);const _=e.getClearAlpha();t.background=null,t.fog=null,e.shadowMap.autoUpdate=!1,e.setRenderTarget(m),e.setClearColor(0,0),e.clear(),e.autoClear=!1,n.layers.set(0),t.overrideMaterial=f,e.render(t,n),n.layers.set(or),t.overrideMaterial=null,e.render(t,n),n.layers.mask=j,t.background=k,t.fog=b,e.autoClear=S,t.overrideMaterial=F,e.shadowMap.autoUpdate=w,e.setClearColor(B,_),e.setRenderTarget(null)}const I={level:"high",composer:l,gtao:h,bloom:u,render(){E(),l.render()},setSize(){[o,r]=a(),e.setSize(o,r,!1),l.setSize(o,r),m.setSize(o*i,r*i)}},y={level:"high",render:()=>Q.render(),setSize:()=>Q.setSize(),stepDown(){return Q===I?(A.dispose(),m.dispose(),l.dispose&&l.dispose(),Q=s,y.level="direct",s.setSize(),!0):!1}};let Q=I;return y}function Rf(e=8,t=1){const s=document.createElement("canvas");s.width=512,s.height=128;const i=s.getContext("2d"),o=i.createImageData(512,128),r=[255,214,90],A=[255,110,20],l=[70,12,4];for(let c=0;c<128;c++)for(let u=0;u<512;u++){const d=u/512*Math.PI*2,p=c/128*Math.PI*2;let m=Math.sin(d*2+Math.sin(p)*1.8)+Math.sin(d*5-p+Math.cos(d*3)*1.2)*.5+Math.sin(p*2+d)*.4+Math.sin(d*11+Math.sin(d*4+p*2)*2)*.18;m=(m+1.9)/3.8;const f=Math.max(0,Math.min(1,m)),B=f<.5?l:A,E=f<.5?A:r,I=f<.5?f/.5:(f-.5)/.5,y=I*I*(3-2*I),Q=(c*512+u)*4;for(let k=0;k<3;k++)o.data[Q+k]=B[k]+(E[k]-B[k])*y;o.data[Q+3]=255}i.putImageData(o,0,0),i.filter="blur(3px)",i.drawImage(s,0,0),i.filter="none";const h=new Be(s);return h.colorSpace=Ce,h.wrapS=h.wrapT=zn,h.repeat.set(e,t),h.anisotropy=8,h}let Di=null;function zf(){if(Di)return Di;const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),n=t.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,.45)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),Di=new Be(e),Di}function Vi(e,t){return new mr({map:zf(),color:e,transparent:!0,opacity:t,blending:bn,depthWrite:!1,fog:!1})}function Ff(e,t){let n=0,a=0,s=0,i=0;return function(r,A){if(!a){a=r;return}const l=r-a;if(a=r,!A||l>500){n=0;return}if(!((s+=l)<3e3)&&(n=l>20?n+l:Math.max(0,n-l*2),n>2500&&i<e.length)){n=0,s=0;const h=e[i++];h(),t&&t(i,e.length)}}}const Nf=2.33,Lf=[-.2,-2.44],Uf=[{id:"A",nx:.3002,nz:.9539,d:5.781},{id:"F",nx:-.2981,nz:-.9545,d:.163},{id:"C",nx:.9454,nz:-.3258,d:.669},{id:"D",nx:-.9524,nz:.3047,d:4.338}],Gf=[{id:"scan-a1",wall:"A",x:1.2853,z:-6.465,y:1.12,ix:.3002,iz:.9539,w:1.33,h:.78,splats:1216,patch:"scan/patch5-scan-a1.png",spz:"scan/spot5-scan-a1.spz"},{id:"scan-a2",wall:"A",x:.174,z:-6.1153,y:1.35,ix:.3002,iz:.9539,w:.96,h:1.24,splats:3013,patch:"scan/patch5-scan-a2.png",spz:"scan/spot5-scan-a2.spz"},{id:"scan-a3",wall:"A",x:-.9135,z:-5.7731,y:1.26,ix:.3002,iz:.9539,w:1.42,h:.86,splats:2071,patch:"scan/patch5-scan-a3.png",spz:"scan/spot5-scan-a3.spz"},{id:"scan-f1",wall:"F",x:1.7538,z:-.3771,y:1.425,ix:-.2981,iz:-.9545,w:1.42,h:.86,splats:1392,patch:"scan/patch5-scan-f1.png",spz:"scan/spot5-scan-f1.spz"},{id:"wall-a-right",wall:"A",x:1.9292,z:-6.6677,y:1.5,ix:.3002,iz:.9539,w:0,h:0,splats:0},{id:"wall-a-brick",wall:"A",x:-2.5542,z:-5.2567,y:1.5,ix:.3002,iz:.9539,w:0,h:0,splats:0},{id:"wall-f-white",wall:"F",x:.8947,z:-.1088,y:1.5,ix:-.2981,iz:-.9545,w:0,h:0,splats:0},{id:"wall-f-1",wall:"F",x:.7104,z:-.0511,y:1.4542,ix:-.2981,iz:-.9545,w:0,h:0,splats:0},{id:"wall-f-2",wall:"F",x:1.4048,z:-.268,y:1.4542,ix:-.2981,iz:-.9545,w:0,h:0,splats:0},{id:"wall-f-3",wall:"F",x:2.0066,z:-.4559,y:1.4542,ix:-.2981,iz:-.9545,w:0,h:0,splats:0},{id:"wall-d-1",wall:"D",x:2.74,z:-5.6726,y:1.4542,ix:-.9524,iz:.3047,w:0,h:0,splats:0},{id:"wall-d-2",wall:"D",x:3.4416,z:-3.4796,y:1.4542,ix:-.9524,iz:.3047,w:0,h:0,splats:0}],Ue={ceil:Nf,centre:Lf,walls:Uf,spots:Gf},Yf={"scan-a1":{mode:"replaced",painting:"hope-the-vermillion-aurora",plaque:"right"},"scan-a2":{mode:"replaced",painting:"painting-red-horizon",plaque:"left"},"scan-a3":{mode:"replaced",painting:"honeybadger-and-cub-with-genesis-block",plaque:"right"},"scan-f1":{mode:"removed"},"wall-a-right":{mode:"bare"},"wall-a-brick":{mode:"bare"},"wall-f-white":{mode:"bare"},"wall-f-1":{mode:"replaced",painting:"older-work-provibes-sandwiches-original-1",plaque:"left"},"wall-f-2":{mode:"replaced",painting:"archived-painting-248",plaque:"left"},"wall-f-3":{mode:"replaced",painting:"archived-painting-436",plaque:"left"},"wall-d-1":{mode:"replaced",painting:"older-work-portraits-319-329-original-1",plaque:"right"},"wall-d-2":{mode:"replaced",painting:"older-work-ammous-livera-original-2",plaque:"right"}},ec="home",qf={url:(typeof location<"u"&&/(^|\.)tjm\.art$/.test(location.hostname)?"":"https://tjm.art")+"/play/?via="+ec},Pf=1.97,ls=2.032/Pf,ma={len:1.83,width:1.15},Hf=[{id:"front-door",kind:"frontdoor",wall:"D",a:[2.3321,-6.7104],b:[2.6091,-5.9065],y0:0,y1:1.97,cols:0,rows:0,frame:"#93b9b9"},{id:"door-c",kind:"door",wall:"C",a:[-1.2841,-1.6726],b:[-1.0233,-.916],y0:0,y1:2.2,cols:1,rows:3,frame:"#7c7c67"},{id:"kitchen",kind:"opening",wall:"C",a:[-2.4248,-4.9828],b:[-1.3166,-1.7672],y0:0,y1:2.2,cols:0,rows:0,frame:"#774924"},{id:"cabinet-c",kind:"cabinet",wall:"C",a:[-.9972,-.8404],b:[-.5833,.3607],y0:.45,y1:2.1,cols:3,rows:4,frame:"#71a4ba",depth:.4,note:"v6 (#211, TJ): not a window - a blue-framed glass-front cabinet set into wall C; depth 0.40 from the scan (points 0.05-0.42 behind the wall plane, h 0.45-2.0)"},{id:"win-d1",kind:"window",wall:"D",a:[2.8535,-5.1972],b:[3.3424,-3.7786],y0:1.05,y1:1.95,cols:2,rows:2,frame:"#b1ada4"},{id:"win-d2",kind:"window",wall:"D",a:[3.626,-2.9558],b:[4.2452,-1.1588],y0:1,y1:1.95,cols:2,rows:2,frame:"#b16438"},{id:"win-f1",kind:"window",wall:"F",a:[2.6612,-.6603],b:[4.1403,-1.1258],y0:1,y1:1.95,cols:2,rows:2,frame:"#bc7146"},{id:"win-f0",kind:"window",wall:"F",a:[-.5356,.3457],b:[.0083,.1745],y0:1,y1:1.95,cols:1,rows:2,frame:"#8d7157"},{id:"win-a0",kind:"window",wall:"A",a:[-2.4748,-5.2815],b:[-1.95,-5.4467],y0:1,y1:2,cols:1,rows:2,frame:"#e9a83e"}],Jf={o:[-2.5226,-5.2665],ax:[.9454,-.3258],az:[.3002,.9539],U:5.06,V:5.95},Of={A:"#606469",F:"#896b58",C:"#896d50",D:"#82695e",floor:"#422d20",ceil:"#6f5135",beam:"#937544"},Vf=[{id:"monstera",kind:"plant",x:-1.662,z:-5.149,w:.95,d:.66,h:1.9,yaw:.3319,back:"",accent:"#d1a038",ax:[.9454,-.3258],az:[.3002,.9539],top:"#bc8f37",side:"#7a7155",n:7043},{id:"work-table",kind:"desk",x:-1.475,z:-3.578,w:.82,d:1.15,h:1,yaw:.3319,back:"-x",accent:"#ad5e37",ax:[.9454,-.3258],az:[.3002,.9539],top:"#664831",side:"#9c736d",n:6942},{id:"round-table",kind:"roundtable",x:.343,z:-4.994,w:1.1,d:1.1,h:.76,yaw:.3319,back:"",accent:"#a3b8a8",ax:[.9454,-.3258],az:[.3002,.9539],top:"#6d715c",side:"#382f24",n:5441},{id:"chair-w",kind:"chair",x:-.583,z:-4.855,w:.7,d:.75,h:.88,yaw:.3319,back:"-x",accent:"#805522",ax:[.9454,-.3258],az:[.3002,.9539],top:"#513e37",side:"#483724",n:1262},{id:"chair-e",kind:"chair",x:1.246,z:-5.457,w:.65,d:.8,h:.88,yaw:.3319,back:"+x",accent:"#8ba684",ax:[.9454,-.3258],az:[.3002,.9539],top:"#757570",side:"#514b3a",n:2641},{id:"sofa-c",kind:"sofa",x:.4352,z:-2.2123,w:1,d:2.07,h:.66,yaw:.3319,back:"-x",accent:"#9e8066",ax:[.9454,-.3258],az:[.3002,.9539],top:"#807164",side:"#898278",n:6473,note:"v6 (#211, TJ): resized to the grey sofa against wall F (same 2.07 x 1.00 footprint, 0.66 high); front edge kept, clear of sofa-f"},{id:"coffee-table",kind:"coffeetable",x:1.724,z:-2.305,w:1,d:1,h:.45,yaw:.3319,back:"",accent:"#a28260",ax:[.9454,-.3258],az:[.3002,.9539],top:"#938474",side:"#7c7369",n:6497},{id:"sofa-f",kind:"sofa",x:2.073,z:-1.094,w:2.07,d:1,h:.66,yaw:.3319,back:"+z",accent:"#a6bad6",ax:[.9454,-.3258],az:[.3002,.9539],top:"#a7b8c2",side:"#9ea7b5",n:10129},{id:"plant-f1",kind:"plant",x:-.255,z:-.13,w:.7,d:.6,h:1.88,yaw:.3319,back:"",accent:"#777553",ax:[.9454,-.3258],az:[.3002,.9539],top:"#8f9886",side:"#62644f",n:2727},{id:"plant-f2",kind:"plant",x:.891,z:-.533,w:.47,d:.64,h:1,yaw:.3319,back:"",accent:"#5e6057",ax:[.9454,-.3258],az:[.3002,.9539],top:"#3c3a33",side:"#31332d",n:1884},{id:"side-table",kind:"sidetable",x:3.456,z:-2.19,w:.46,d:.5,h:.58,yaw:.3319,back:"",accent:"#848f9c",ax:[.9454,-.3258],az:[.3002,.9539],top:"#757e87",side:"#584a44",n:899},{id:"floor-lamp",kind:"lamp",x:3.647,z:-1.484,w:.4,d:.48,h:1.6,yaw:.3319,back:"",accent:"#a9ab97",ax:[.9454,-.3258],az:[.3002,.9539],top:"#a17e67",side:"#afa7a4",n:404},{id:"plant-d1",kind:"plant",x:2.908,z:-3.474,w:.8,d:.72,h:1.15,yaw:.3319,back:"",accent:"#64311e",ax:[.9454,-.3258],az:[.3002,.9539],top:"#40312f",side:"#3a231c",n:2019},{id:"plant-d2",kind:"plant",x:3.243,z:-2.731,w:.65,d:.6,h:.92,yaw:.3319,back:"",accent:"#8d6653",ax:[.9454,-.3258],az:[.3002,.9539],top:"#533c33",side:"#3a2d29",n:2323},{id:"plant-c",kind:"plant",x:-.365,z:-1.385,w:.65,d:.54,h:.78,yaw:.3319,back:"",accent:"#87572f",ax:[.9454,-.3258],az:[.3002,.9539],top:"#734d2f",side:"#311c17",n:1426}],Vn={openings:Hf,frame:Jf,shell:Of,items:Vf};if(!Vn.__scaled){Vn.__scaled=1;const e=ls;for(const n of Vn.items)n.x*=e,n.z*=e,n.w*=e,n.d*=e,n.h*=e;const t=Vn.frame;t.o=t.o.map(n=>n*e),t.U*=e,t.V*=e;for(const n of Vn.openings)n.a=n.a.map(a=>a*e),n.b=n.b.map(a=>a*e),n.y0*=e,n.y1*=e}const Rr=Vn.items,ns=Vn.shell,Bs=Vn.openings;let DA=17;const Lt=()=>(DA=DA*16807%2147483647)/2147483647,Xn=e=>new Wt(e),Li=(e,t)=>Xn(e).multiplyScalar(t);function lo(e,t=128){const n=document.createElement("canvas");n.width=n.height=t;const a=n.getContext("2d");e(a,t);const s=new Be(n);return s.wrapS=s.wrapT=zn,s.colorSpace=Ce,s}const jf=lo((e,t)=>{e.fillStyle="#e8e8e8",e.fillRect(0,0,t,t);for(let n=0;n<t;n+=2)e.fillStyle=`rgba(0,0,0,${.04+n%4*.02})`,e.fillRect(n,0,1,t),e.fillRect(0,n,t,1);for(let n=0;n<900;n++)e.fillStyle=`rgba(255,255,255,${Lt()*.12})`,e.fillRect(Lt()*t,Lt()*t,1,1)}),Hs=lo((e,t)=>{e.fillStyle="#d9d9d9",e.fillRect(0,0,t,t);for(let n=0;n<t;n++){const a=.05+.08*Math.abs(Math.sin(n*.35+Math.sin(n*.07)*3));e.fillStyle=`rgba(60,40,20,${a})`,e.fillRect(0,n,t,1)}},256),Ct=(e,t="wood",n={})=>new oe({color:Xn(e),map:t==="fabric"?jf:t==="wood"?Hs:null,roughness:t==="fabric"?.95:t==="metal"?.35:.7,metalness:t==="metal"?.6:0,...n});function K(e,t,n,a,s,i,o,r,A=0){const l=A?new Sh(t,n,a,3,Math.min(A,t/2,n/2,a/2)):new Ae(t,n,a),h=new X(l,s);return h.position.set(i,o,r),h.castShadow=h.receiveShadow=!0,e.add(h),h}function He(e,t,n,a,s,i,o,r,A=24){const l=new X(new de(t,n,a,A),s);return l.position.set(i,o,r),e.add(l),l}const TA={sofa(e,t){const{w:n,d:a,h:s}=t,i=t.back==="+z"||t.back==="-z",o=i?n:a,r=i?a:n,A=new Ut;e.add(A);const l=Ct(t.top,"fabric"),h=Ct(Li(t.side,.9).getStyle(),"fabric"),c=Ct("#3a2a1e");A.rotation.y={"-z":0,"+z":Math.PI,"-x":Math.PI/2,"+x":-Math.PI/2}[t.back]||0;const u=.17,d=.2,p=.42;K(A,o,.24,r,h,0,.22,0,.04),K(A,o,s-.08,d,h,0,.08+(s-.08)/2,-r/2+d/2,.06);for(const B of[-1,1])K(A,u,.58-.08,r,h,B*(o/2-u/2),.08+.25,0,.06);const m=Math.max(2,Math.round((o-2*u)/.75)),f=(o-2*u)/m;for(let B=0;B<m;B++){const E=-o/2+u+f*(B+.5);K(A,f-.02,.12,r-d-.04,l,E,p-.02,d/2+.01,.05),K(A,f-.06,.38,.14,l,E,p+.2,-r/2+d+.07,.06).rotation.x=-.12}for(const[B,E]of[[-1,-1],[1,-1],[-1,1],[1,1]])He(A,.025,.018,.1,c,B*(o/2-.06),.05,E*(r/2-.06),10)},shelf(e,t){const{w:n,d:a,h:s}=t,i=Ct(t.side),o=.03,r=t.back==="+z"||t.back==="-z",A=r?n:a,l=r?a:n,h=new Ut;e.add(h),h.rotation.y={"-z":0,"+z":Math.PI,"-x":Math.PI/2,"+x":-Math.PI/2}[t.back]||0;for(const d of[-1,1])K(h,o,s,l,i,d*(A/2-o/2),s/2,0);K(h,A,o,l,i,0,s-o/2,0),K(h,A-2*o,.012,l,i,0,s/2,-l/2+.006);const c=Math.max(3,Math.round(s/.38)),u=[t.accent,t.top,"#7d2f2a","#2f4a63","#c9b48a","#3f5a3a","#d8d2c4"];for(let d=0;d<c;d++){const p=.06+d*(s-.09)/c;if(K(h,A-2*o,o,l-.02,i,0,p,.01),d===0)continue;let m=-A/2+o+.03;const f=(s-.09)/c-.06;for(;m<A/2-o-.06;){const B=.025+Lt()*.035,E=f*(.6+Lt()*.35);if(Lt()<.18){m+=.08;continue}K(h,B,E,l*.7,Ct(u[Lt()*u.length|0],"plain"),m+B/2,p+o/2+E/2,.02),m+=B+.004}}},dresser(e,t){const{w:n,d:a,h:s}=t,i=t.back==="+z"||t.back==="-z",o=i?n:a,r=i?a:n,A=new Ut;e.add(A),A.rotation.y={"-z":0,"+z":Math.PI,"-x":Math.PI/2,"+x":-Math.PI/2}[t.back]||0;const l=Ct(t.top),h=Ct(Li(t.top,1.12).getStyle()),c=Ct("#c8a45a","metal");K(A,o,s-.08,r,l,0,.08+(s-.08)/2,0,.01),K(A,o+.03,.03,r+.03,l,0,s-.015,0,.01);const u=4;for(let d=0;d<u;d++)for(const p of[-1,1]){const m=.12+(d+.5)*(s-.16)/u;K(A,o/2-.04,(s-.16)/u-.03,.02,h,p*o/4,m,r/2+.005,.005);const f=new X(new ve(.015,10,8),c);f.position.set(p*o/4,m,r/2+.03),A.add(f)}for(const[d,p]of[[-1,-1],[1,-1],[-1,1],[1,1]])K(A,.05,.08,.05,l,d*(o/2-.04),.04,p*(r/2-.04))},roundtable(e,t){const n=Math.min(t.w,t.d)/2*.95,a=Ct(t.top),s=Ct(t.side);He(e,n,n,.04,a,0,t.h-.02,0,48),He(e,n-.02,n-.03,.05,s,0,t.h-.065,0,48),He(e,.05,.06,t.h-.1,s,0,(t.h-.1)/2+.03,0),He(e,.26,.3,.04,s,0,.02,0,32)},bowlchair(e,t){const n=Math.min(t.w,t.d)/2*.95,a=Ct(t.side),s=Ct(t.accent,"fabric"),i=new X(new ve(n,32,12,0,Math.PI*2,Math.PI/2,Math.PI/2.4),Ct(t.side,"wood",{side:en}));i.scale.y=.62,i.position.y=.42+n*.62*.95,i.rotation.x=.35,e.add(i);const o=new X(new _n(n*.97,.025,8,40),a);o.rotation.x=Math.PI/2+.35,o.position.y=i.position.y+.02,e.add(o);const r=new X(new de(n*.8,n*.75,.12,32),s);r.position.y=i.position.y-n*.62*.55,r.rotation.x=.35,e.add(r);const A=new X(new _n(n*.5,.03,8,32),a);A.rotation.x=Math.PI/2,A.position.y=.2,A.scale.z=4,e.add(A)},coffeetable(e,t){const{w:n,d:a,h:s}=t,i=Ct(t.top),o=Ct(t.side);K(e,n,.05,a,i,0,s-.025,0,.01),K(e,n-.12,.03,a-.12,o,0,.12,0);for(const[r,A]of[[-1,-1],[1,-1],[-1,1],[1,1]])K(e,.05,s-.05,.05,o,r*(n/2-.05),(s-.05)/2,A*(a/2-.05));K(e,.24,.05,.17,Ct("#a33b2f","plain"),-n*.18,s+.025,a*.1).rotation.y=.3,K(e,.2,.035,.15,Ct("#e2dccb","plain"),-n*.17,s+.067,a*.12).rotation.y=.15},sidetable(e,t){const{w:n,d:a,h:s}=t,i=Ct(t.top),o=Ct(t.side);K(e,n,.04,a,i,0,s-.02,0,.01);for(const[r,A]of[[-1,-1],[1,-1],[-1,1],[1,1]])He(e,.018,.014,s-.04,o,r*(n/2-.04),(s-.04)/2,A*(a/2-.04),10)},glasscab(e,t){const{w:n,d:a,h:s}=t,i=t.back==="+z"||t.back==="-z",o=i?n:a,r=i?a:n,A=new Ut;e.add(A),A.rotation.y={"-z":0,"+z":Math.PI,"-x":Math.PI/2,"+x":-Math.PI/2}[t.back]||0;const l=Ct(t.accent,"wood",{roughness:.55}),h=Ct(Li(t.top,.8).getStyle()),c=new oe({color:14675698,transparent:!0,opacity:.18,roughness:.05,depthWrite:!1});K(A,o,s-.1,.02,h,0,.1+(s-.1)/2,-r/2+.01);for(const m of[-1,1])K(A,.04,s,r,l,m*(o/2-.02),s/2,0);K(A,o,.06,r,l,0,s-.03,0),K(A,o,.1,r,l,0,.05,0);const u=Math.max(2,Math.round(o/.5)),d=(o-.08)/u;for(let m=0;m<u;m++){const f=-o/2+.04+d*(m+.5),B=K(A,d-.05,s-.22,.006,c,f,.1+(s-.16)/2,r/2-.02);B.castShadow=!1;for(const E of[-1,1])K(A,.025,s-.16,.025,l,f+E*(d/2-.0125),.1+(s-.16)/2,r/2-.015)}const p=["#d9c79a","#9fb7a8","#c47b4a","#e7e1d2","#6f8fa8"];for(let m=1;m<4;m++){const f=.1+m*(s-.16)/4;K(A,o-.08,.02,r-.06,l,0,f,-.01);for(let B=-o/2+.1;B<o/2-.1;B+=.11+Lt()*.08){const E=.08+Lt()*.12;He(A,.035,.035,E,Ct(p[Lt()*p.length|0],"plain",{roughness:.3}),B,f+.01+E/2,-.03+Lt()*.06,14)}}},chair(e,t){const n=new Ut;e.add(n),n.rotation.y={"-z":0,"+z":Math.PI,"-x":Math.PI/2,"+x":-Math.PI/2}[t.back]||0;const a=Ct(t.side),s=Ct(t.top),i=.46,o=.46,r=.46;K(n,i,.035,o,s,0,r,0,.01);for(const[A,l]of[[-1,-1],[1,-1],[-1,1],[1,1]])K(n,.035,r,.035,a,A*(i/2-.03),r/2,l*(o/2-.03));for(const A of[-1,1])K(n,.035,t.h-r,.035,a,A*(i/2-.03),r+(t.h-r)/2,-o/2+.03);K(n,i-.04,.09,.025,a,0,t.h-.06,-o/2+.03,.008),K(n,i-.06,.04,.02,a,0,r+.2,-o/2+.03),K(n,i-.06,.025,.025,a,0,.14,0)},desk(e,t){const{w:n,d:a,h:s}=t,i=Ct(t.top),o=Ct(t.side);K(e,n,.05,a,i,0,s-.025,0,.008),K(e,n-.1,.025,a-.1,i,0,.22,0);for(const[A,l]of[[-1,-1],[1,-1],[-1,1],[1,1]])K(e,.055,s-.05,.055,o,A*(n/2-.05),(s-.05)/2,l*(a/2-.05));const r=["#d8d2c4","#7d2f2a","#2f4a63","#c9b48a"];for(let A=0;A<4;A++)K(e,.18+Lt()*.12,.02+Lt()*.04,.14+Lt()*.1,Ct(r[A],"plain"),(Lt()-.5)*(n-.3),s+.02,(Lt()-.5)*(a-.3)).rotation.y=Lt()-.5},lamp(e,t){const n=Ct("#b08a4a","metal");He(e,.14,.16,.03,n,0,.015,0,28),He(e,.012,.012,t.h-.3,n,0,(t.h-.3)/2,0,10),He(e,.11,.21,.28,new oe({color:Xn(t.top),emissive:Xn("#ffcf8a"),emissiveIntensity:.55,side:en,roughness:.9}),0,t.h-.15,0,32);const a=new Nn(16766624,1.2,3.5,2);a.position.set(0,t.h-.2,0),e.add(a)},plant(e,t){const n=Math.min(t.w,t.d)/2,a=Ct("#a65a3c","plain",{roughness:.85}),s=Math.min(.42,t.h*.38);He(e,n*.55,n*.42,s,a,0,s/2,0,20),He(e,n*.58,n*.58,.03,a,0,s-.015,0,20);const i=[Ct("#4e7a3a","plain",{roughness:.8,flatShading:!0}),Ct("#3c6630","plain",{roughness:.8,flatShading:!0}),Ct("#6a9447","plain",{roughness:.8,flatShading:!0})];t.h>1.5&&He(e,n*.3,n*.35,.02,a,0,.01,0,16);const o=t.h>1.5?12:7;for(let r=0;r<o;r++){const A=n*(.35+Lt()*.3),l=Lt()*Math.PI*2,h=n*.45*Lt(),c=new X(new va(A,0),i[r%3]);c.position.set(Math.cos(l)*h,s+A*.8+(t.h-s-A*1.6)*Lt(),Math.sin(l)*h),c.rotation.set(Lt()*3,Lt()*3,0),e.add(c)}}},Wf=Rr.map(e=>({id:e.id,x:e.x,z:e.z,ax:e.ax,az:e.az,hw:e.w/2,hd:e.d/2,h:e.h}));function Xf(e,t,n=0){for(const a of Wf){const s=e-a.x,i=t-a.z,o=s*a.ax[0]+i*a.ax[1],r=s*a.az[0]+i*a.az[1];if(Math.abs(o)<a.hw+n&&Math.abs(r)<a.hd+n)return a.id}return null}function Kf(e){const t=[];for(const n of Rr){const a=new Ut;a.name="furniture:"+n.id,a.position.set(n.x,0,n.z),a.rotation.y=n.yaw,(TA[n.kind]||TA.sidetable)(a,n),a.userData.furniture=n.id,e.add(a),t.push(a)}return t}function Zf(e,t,n,a){const[s,i]=n;for(const c of t){const u=c.nx*s+c.nz*i+c.d,d=s-c.nx*u,p=i-c.nz*u,m=Math.hypot(c.nx,c.nz),f=[c.nz/m,-c.nx/m],B=a+.2,E=new XA([new kt(-4.5,-.1),new kt(4.5,-.1),new kt(4.5,B-.1),new kt(-4.5,B-.1)]);for(const y of Bs.filter(Q=>Q.wall===c.id)){const Q=S=>(S[0]-d)*f[0]+(S[1]-p)*f[1],k=Math.min(Q(y.a),Q(y.b)),b=Math.max(Q(y.a),Q(y.b));E.holes.push(new bh([new kt(k,Math.max(y.y0,-.05)),new kt(k,y.y1),new kt(b,y.y1),new kt(b,Math.max(y.y0,-.05))]))}const I=new X(new KA(E),new oe({color:Xn(ns[c.id]||"#888"),roughness:.95}));I.position.set(d-c.nx*.03,0,p-c.nz*.03),I.rotation.y=Math.atan2(c.nx,c.nz),I.name="shell:"+c.id,I.userData.noCollide=1,e.add(I)}const o=new X(new Vt(12,12),new oe({color:Xn(ns.floor),map:Hs,roughness:.8}));o.rotation.x=-Math.PI/2,o.position.set(s,-.012,i),o.userData.noCollide=1,o.name="shell:floor",e.add(o);const r=Vn.frame,A=new oe({color:Li(ns.beam,.62),map:Hs,roughness:.75}),l=Math.atan2(r.ax[0],r.ax[1]);for(let c=.35;c<r.V-.2;c+=.6){const u=r.U/2,d=r.o[0]+r.ax[0]*u+r.az[0]*c,p=r.o[1]+r.ax[1]*u+r.az[1]*c,m=new X(new Ae(.07,.17,r.U),A);m.position.set(d,a-.085,p),m.rotation.y=l,m.name="shell:joist",m.userData.noCollide=1,e.add(m)}const h=new X(new Vt(12,12),new oe({color:Xn(ns.ceil),map:Hs,roughness:.9}));h.rotation.x=Math.PI/2,h.position.set(s,a+.03,i),h.userData.noCollide=1,h.name="shell:ceil",e.add(h)}function $f(){return lo((e,t)=>{const n=e.createLinearGradient(0,0,0,t);n.addColorStop(0,"#cfe3f2"),n.addColorStop(.55,"#eef4f4"),n.addColorStop(.75,"#dfe6d4"),n.addColorStop(1,"#a9b98f"),e.fillStyle=n,e.fillRect(0,0,t,t);for(let a=0;a<14;a++){e.fillStyle=`rgba(110,140,90,${.15+Lt()*.2})`;const s=Lt()*t,i=6+Lt()*14;e.beginPath(),e.arc(s,t*(.78+Lt()*.12),i,0,7),e.fill()}},128)}const nc=$f();function vs(e,t){const n=t.find(o=>o.id===e.wall),a=Math.hypot(n.nx,n.nz),s=[n.nx/a,n.nz/a],i=new Ut;return i.position.set((e.a[0]+e.b[0])/2,0,(e.a[1]+e.b[1])/2),i.rotation.y=Math.atan2(s[0],s[1]),i.userData.opening=e.id,i.name=e.kind+":"+e.id,{g:i,W:Math.hypot(e.b[0]-e.a[0],e.b[1]-e.a[1]),n:s}}function _A(e,t,n,a,s,i,o,r){for(let h=1;h<s;h++)K(e,.045*.8,a-n,.04,o,-t/2+h*t/s,(n+a)/2,r);for(let h=1;h<i;h++)K(e,t,.045*.8,.04,o,0,n+h*(a-n)/i,r);const l=new X(new Vt(t,a-n),new oe({color:15266550,transparent:!0,opacity:.12,roughness:.05,depthWrite:!1}));l.position.set(0,(n+a)/2,r-.01),l.userData.noCollide=1,e.add(l)}function RA(e,t,n,a){const s=new X(new Vt(t+.6,a-n+.6),new xt({map:nc,toneMapped:!1,color:15921902}));s.position.set(0,(n+a)/2,-.45),s.userData.noCollide=1,s.name="sky",e.add(s)}const zA={frontdoor(e,t){const{g:n,W:a}=vs(e,t),s=e.y1,i=Ct("#e6dfd2"),o=ma.len,r=ma.width,A=Ct("#c9bba6","plain",{roughness:.95}),l=Ct("#7a5a3e");for(const E of[-1,1])K(n,.09,s+.09,.03,i,E*(a/2+.045),(s+.09)/2,.015);K(n,a+.18,.09,.03,i,0,s+.045,.015);for(const E of[-1,1])K(n,.02,s,.14,i,E*(a/2-.01),s/2,-.07);K(n,a,.02,.14,i,0,s-.01,-.07);const h=new Ut;h.position.set(-a/2+.02,0,-.14),h.rotation.y=Math.PI/2-.12,n.add(h),K(h,a-.04,s-.01,.04,l,(a-.04)/2,(s-.01)/2,0,.004);for(const[E,I]of[[.35,.55],[1.15,.65]])K(h,a-.24,I,.012,Ct("#6b4e35"),(a-.04)/2,E+I/2,.025);const c=new X(new ve(.03,12,10),Ct("#c8a45a","metal"));c.position.set(a-.12,.95,.04),h.add(c);const u=new Ut;u.name="hallway",n.add(u);const d=Math.max(a,r),p=s+.3,m=new oe({color:Xn(ns.floor),map:Hs,roughness:.8}),f=new X(new Vt(d,o+.15),m);f.rotation.x=-Math.PI/2,f.position.set(0,.003,-1.98/2),u.add(f);for(const E of[-1,1])K(u,.06,p,o+.15,A,E*(d/2+.03),p/2,-1.98/2);if(K(u,d+.12,.05,o+.15,A,0,p,-1.98/2),K(u,d+.12,p,.06,A,0,p/2,-o-.18),d>a)for(const E of[-1,1])K(u,(d-a)/2,p,.06,A,E*(a/2+(d-a)/4),p/2,-.17);K(u,d,p-s,.06,A,0,s+(p-s)/2,-.17);for(const E of[-1,1])K(u,.015,.1,o,i,E*(d/2-.008),.05,-o/2-.1);He(u,.12,.16,.08,new oe({color:15985368,emissive:16770752,emissiveIntensity:.7}),0,p-.05,-o*.45,24);const B=new Nn(16769727,.9,3.2,2);return B.position.set(0,p-.25,-o*.45),u.add(B),n.userData.hall={len:o,width:d},n},window(e,t){const{g:n,W:a}=vs(e,t),s=Ct(e.frame,"wood",{roughness:.6}),i=.06,o=e.y0,r=e.y1;for(const A of[-1,1])K(n,i,r-o+2*i,.14,s,A*(a/2+i/2),(o+r)/2,-.02);return K(n,a+2*i,i,.14,s,0,r+i/2,-.02),o>.05&&(K(n,a+2*i,i,.14,s,0,o-i/2,-.02),K(n,a+.16,.03,.12,s,0,o-.015,.06)),_A(n,a,o,r,Math.max(1,e.cols),Math.max(1,e.rows),s,-.03),RA(n,a,o,r),n},cabinet(e,t){const{g:n,W:a}=vs(e,t),s=(e.depth||.4)*ls,i=e.y0,o=e.y1,r=o-i,A=Ct(e.frame,"wood",{roughness:.55}),l=.06,h=Ct("#e9e4da","plain",{roughness:.85}),c=Ct("#dcd5c8","wood",{roughness:.7});K(n,a,r,.02,h,0,(i+o)/2,-s+.01);for(const E of[-1,1])K(n,.02,r,s,h,E*(a/2-.01),(i+o)/2,-s/2);K(n,a,.03,s,c,0,i+.015,-s/2),K(n,a,.03,s,h,0,o-.015,-s/2);const u=Math.max(2,e.rows||4),d=Math.max(1,e.cols||3),p=r/u;for(let E=1;E<u;E++)K(n,a-.04,.025,s-.04,c,0,i+E*p,-s/2-.01);for(const E of[-1,1])K(n,l,r+2*l,.12,A,E*(a/2+l/2),(i+o)/2,-.01);K(n,a+2*l,l,.12,A,0,o+l/2,-.01),K(n,a+2*l,l,.12,A,0,i-l/2,-.01),K(n,a+.16,.035,.14,A,0,o+l+.017,0),K(n,a+.12,.03,.1,A,0,i-l-.015,.02);const m=a/d,f=.045;for(let E=0;E<d;E++){const I=-a/2+m*(E+.5),y=new Ut;y.position.set(I,0,-.02),n.add(y),y.name="cabinet-door";for(const b of[-1,1])K(y,f,r,.03,A,b*(m/2-f/2),(i+o)/2,0);for(const b of[i+f/2,o-f/2])K(y,m,f,.03,A,0,b,0);for(let b=1;b<u;b++)K(y,m-2*f,.03,.025,A,0,i+b*p,0);const Q=new X(new Vt(m-2*f,r-2*f),new oe({color:15266550,transparent:!0,opacity:.16,roughness:.05,metalness:.1,depthWrite:!1}));Q.position.set(0,(i+o)/2,-.005),Q.userData.noCollide=1,Q.name="cabinet-glass",y.add(Q);const k=new X(new ve(.014,10,8),Ct("#c8a45a","metal"));k.position.set(E<d/2?m/2-f-.02:-m/2+f+.02,i+r*.45,.025),y.add(k)}const B=["#8c5a3c","#5d6b7a","#b59a6a","#6f7f63","#a0645a","#d8cfc0","#3f4a5a"];for(let E=0;E<u;E++){const I=i+E*p+.03;let y=-a/2+.08+Lt()*.1;for(;y<a/2-.16;){const Q=Lt(),k=B[Math.floor(Lt()*B.length)];if(Q<.45){const b=3+Math.floor(Lt()*5);for(let S=0;S<b&&y<a/2-.08;S++){const F=Math.min(p-.06,.18+Lt()*.08),j=.025+Lt()*.02;K(n,j,F,.16+Lt()*.05,Ct(B[Math.floor(Lt()*B.length)],"plain",{roughness:.8}),y,I+F/2,-s+.14),y+=j+.003}y+=.08}else if(Q<.75){const b=.035+Lt()*.025,S=Math.min(p-.08,.1+Lt()*.1);He(n,b,b,S,new oe({color:Xn(k),roughness:.3,transparent:!0,opacity:.85}),y+b,I+S/2,-s/2-.02,18),y+=2*b+.07}else{const S=new X(new ve(.08,18,10,0,Math.PI*2,Math.PI/2,Math.PI/2),Ct(k,"plain",{roughness:.5,side:en}));S.position.set(y+.08,I+.08,-s/2),n.add(S),y+=2*.08+.08}}}return n},door(e,t){const{g:n,W:a}=vs(e,t),s=Ct((Bs.find(h=>h.id==="cabinet-c")||e).frame,"wood",{roughness:.55}),i=Ct("#e6dfd2"),o=e.y1;for(const h of[-1,1])K(n,.08,o+.08,.03,i,h*(a/2+.04),(o+.08)/2,.01);K(n,a+.16,.09,.03,i,0,o+.045,.01);const r=new Ut;r.position.z=-.05,n.add(r);const A=.1;for(const h of[-1,1])K(r,A,o,.045,s,h*(a/2-A/2),o/2,0);K(r,a,A,.045,s,0,o-A/2,0),K(r,a,.5,.045,s,0,.25,0),_A(r,a-2*A,.5,o-A,e.cols||1,e.rows||3,s,0);const l=new X(new ve(.03,12,10),Ct("#c8a45a","metal"));return l.position.set(a/2-A-.02,1,.04),r.add(l),RA(n,a,0,o),n},opening(e,t){const{g:n,W:a}=vs(e,t),s=Ct("#e6dfd2"),i=e.y1,o=1.5;for(const E of[-1,1])K(n,.09,i+.09,.16,s,E*(a/2+.045),(i+.09)/2,-.04);K(n,a+.18,.1,.16,s,0,i+.05,-.04);const r=new Ut;r.name="kitchen",n.add(r);const A=Ct("#b9ad98","plain",{roughness:.95}),l=new oe({color:9077624,roughness:.8}),h=lo((E,I)=>{E.fillStyle="#d8d4cb",E.fillRect(0,0,I,I),E.strokeStyle="#9b958a",E.lineWidth=2;for(let y=0;y<=I;y+=I/4)E.beginPath(),E.moveTo(y,0),E.lineTo(y,I),E.moveTo(0,y),E.lineTo(I,y),E.stroke()});h.repeat.set(a/.6,o/.6),l.map=h;const c=new X(new Vt(a+.4,o),l);c.rotation.x=-Math.PI/2,c.position.set(0,.002,-o/2),r.add(c),K(r,a+.4,i+.3,.05,A,0,(i+.3)/2,-o);for(const E of[-1,1])K(r,.05,i+.3,o,A,E*(a/2+.2),(i+.3)/2,-o/2);K(r,a+.4,.05,o,A,0,i+.3,-o/2);const u=Ct("#5f6f5c"),d=Ct("#d9d3c6","plain",{roughness:.4}),p=Ct("#c9cdd0","metal"),m=a-.95;K(r,m,.86,.6,u,-a/2+m/2,.43,-o+.33),K(r,m+.02,.04,.63,d,-a/2+m/2,.88,-o+.33);for(let E=-a/2+.3;E<-a/2+m-.2;E+=.6)K(r,.56,.7,.02,Ct("#6c7d68"),E,.45,-o+.64),K(r,.14,.015,.02,p,E,.74,-o+.66),K(r,.5,.65,.33,u,E,1.62,-o+.18);K(r,.5,.06,.4,p,-a/2+m*.55,.92,-o+.33),K(r,.78,1.8,.7,Ct("#e9e7e1","plain",{roughness:.35}),a/2-.45,.9,-o+.38),K(r,.02,.5,.03,p,a/2-.12,1.25,-o+.75);const f=new X(new Vt(.9,.7),new xt({map:nc,toneMapped:!1}));f.position.set(-a/2+m*.55,1.55,-o+.03),r.add(f);const B=new Nn(16767400,.6,3.5,2);return B.position.set(0,i-.1,-o/2),r.add(B),r.traverse(E=>{E.userData.noCollide=1}),n}};function td(e,t){return Bs.map(n=>{const a=(zA[n.kind]||zA.window)(n,t);return e.add(a),a})}if(!Ue.__scaled){Ue.__scaled=1;const e=ls;for(const t of Ue.walls)t.d*=e;Ue.centre=Ue.centre.map(t=>t*e),Ue.ceil*=e;for(const t of Ue.spots)t.x*=e,t.z*=e,t.y*=e,t.w*=e,t.h*=e}const ac={YD:9},ed=()=>99,nd=()=>99,ad=(e,t,n=[])=>n,cs=Ue.walls,sd=(e,t,n)=>cs.every(a=>a.nx*e+a.nz*t+a.d>n);for(const e of Bs){if(e.__snap)continue;e.__snap=1;const t=cs.find(a=>a.id===e.wall),n=t.nx*t.nx+t.nz*t.nz;for(const a of["a","b"]){const s=e[a],i=(t.nx*s[0]+t.nz*s[1]+t.d)/n;e[a]=[s[0]-t.nx*i,s[1]-t.nz*i]}}const Oe=(()=>{const e=Bs.find(r=>r.kind==="frontdoor"),t=cs.find(r=>r.id===e.wall),n=Math.hypot(t.nx,t.nz),a=[t.nx/n,t.nz/n],s=Math.hypot(e.b[0]-e.a[0],e.b[1]-e.a[1]),i=[(e.b[0]-e.a[0])/s,(e.b[1]-e.a[1])/s],o=[(e.a[0]+e.b[0])/2,(e.a[1]+e.b[1])/2];return{o:e,w:t,n:a,t:i,c:o,W:s,H:e.y1-e.y0}})(),id=(e,t)=>{const n=e-Oe.c[0],a=t-Oe.c[1];return{out:-(n*Oe.n[0]+a*Oe.n[1]),lat:n*Oe.t[0]+a*Oe.t[1]}},od=(e,t,n=.22)=>{const{out:a,lat:s}=id(e,t);return a>-.45&&a<ma.len-.12&&Math.abs(s)<Math.min(Oe.W,ma.width)/2-n},rd=(e,t)=>sd(e,t,.3)&&!Xf(e,t,.22)||od(e,t),FA=ma.len+.14,Ad=Math.max(Oe.W,ma.width),NA=Oe.o.y1+.3-.025;window.__splatPortal={x:Oe.c[0]-Oe.n[0]*FA,z:Oe.c[1]-Oe.n[1]*FA,nx:Oe.n[0],nz:Oe.n[1],scale:1,fill:{w:Ad,h:NA},url:qf.url,via:ec,hall:{len:ma.len,width:ma.width,height:NA}};(()=>{const[e,t]=Ue.centre;return{x:e,z:t,yaw:0}})();const ps=JSON.parse(JSON.stringify(Yf));for(const e of(new URLSearchParams(location.search).get("spots")||"").split(",")){const[t,n]=e.split(":");ps[t]&&/^(scan|removed|replaced)$/.test(n)&&(ps[t].mode=n)}const ld=e=>(ps[e]||{mode:"scan"}).mode,cd=matchMedia("(pointer:coarse)").matches||new URLSearchParams(location.search).get("m")==="1";async function hd(e){const t=(window.__parts||{})["/"+e];if(!t)return new Uint8Array(await(await fetch("/play/"+e)).arrayBuffer());const n=await Promise.all([...Array(t)].map((i,o)=>fetch(`/play/${e}.p${o}`).then(r=>r.arrayBuffer()))),a=new Uint8Array(n.reduce((i,o)=>i+o.byteLength,0));let s=0;for(const i of n)a.set(new Uint8Array(i),s),s+=i.byteLength;return a}function ud(e,t){const n=new Ut;n.name="splatRoom",e.add(n),e.background=new Wt(new URLSearchParams(location.search).get("bg")||"#c9d2d6");const a=f=>(f.quaternion.setFromAxisAngle(new q(1,0,0),Math.PI),f.scale.setScalar(ls),f.position.y=1.03*ls,f),s=new URLSearchParams(location.search).get("sh")||(cd?"1":"3"),i={};window.__splat={loaded:0,meshes:i,cfg:ps,sh:s};const o=(f,B)=>hd(B).then(E=>{const I=a(new Mr({fileBytes:E,fileType:"spz",fileName:B.split("/").pop()}));return I.name="splat:"+f,I.frustumCulled=!1,n.add(I),i[f]=I,I.initialized}).then(()=>{window.__splat.loaded++}),r=[o("base",`scan/base5-sh${s}.spz`)],A={};for(const f of Ue.spots){if(!f.spz)continue;if(ld(f.id)==="scan")r.push(o(f.id,f.spz));else{const E=new ei().load("/play/"+f.patch);E.colorSpace=Ce;const I=new X(new Vt(f.w,f.h),new oe({color:ns[f.wall]||"#888",roughness:.95}));E.dispose(),I.position.set(f.x+f.ix*.012,f.y,f.z+f.iz*.012),I.rotation.y=Math.atan2(f.ix,f.iz),I.name="patch:"+f.id,n.add(I),A[f.id]=I}}window.__splat.total=r.length,Promise.all(r).then(()=>{window.__splat.ready=!0});const l=new xt({colorWrite:!1,depthWrite:!1}),[h,c]=Ue.centre;for(const f of cs){const B=f.nx*h+f.nz*c+f.d,E=h-f.nx*B,I=c-f.nz*B,y=new X(new Ae(9,2.6,.1),l);y.position.set(E-f.nx*.05,1.3,I-f.nz*.05),y.rotation.y=Math.atan2(f.nx,f.nz),y.name="wall:"+f.id,n.add(y)}Zf(n,cs,Ue.centre,Ue.ceil);const u=Kf(n);td(n,cs),window.__splat.openings=Bs.map(f=>({id:f.id,kind:f.kind,wall:f.wall,w:Math.hypot(f.b[0]-f.a[0],f.b[1]-f.a[1]),h:f.y1-f.y0,depth:f.depth?f.depth*ls:0,a:f.a,b:f.b,y0:f.y0,y1:f.y1})),window.__splat.items=Rr.map(f=>({id:f.id,kind:f.kind,x:f.x,z:f.z,w:f.w,d:f.d,h:f.h,ax:f.ax,az:f.az})),window.__splat.furniture=u.map(f=>f.userData.furniture);const d=new X(new Ae(12,.1,12),l);d.position.set(h,-.05,c),n.add(d);const p=new X(new Ae(12,.1,12),l);p.position.set(h,Ue.ceil+.05,c),n.add(p),requestAnimationFrame(()=>e.children.forEach(f=>{f!==n&&f.position&&Math.hypot(f.position.x,f.position.z)>100&&(f.visible=!1)}));const m=()=>{const f=window.game;if(!f||!f.paintings||!f.paintings.length)return requestAnimationFrame(m);for(const B of f.paintings){if(!B.plaque||!B.data.spot)continue;const E=(ps[B.data.spot]||{}).plaque==="left"?-1:1;B.plaque.position.set(E*(B.w/2+.13),1.45-B.data.y,.012)}window.__splat.plaques=!0};return requestAnimationFrame(m),{apex:Ue.ceil,lifts:[],clock:null,root:n,patches:A}}function gd(e){const t=Object.fromEntries(e.paintings.map(a=>[a.id,a])),n=[];for(const a of Ue.spots){const s=ps[a.id];if(!s||s.mode!=="replaced"||!t[s.painting])continue;const i=t[s.painting];Object.assign(i,{room:"central",wall:a.wall,spot:a.id,x:a.x+a.ix*.035,y:a.y,z:a.z+a.iz*.035,ix:a.ix,iz:a.iz}),n.push(i)}return e.paintings=n,()=>{}}const $s=[],sc="/play/",xn=document.getElementById("c"),ge=Mf(xn),ic=innerWidth,oc=innerHeight,Ft=new Vs;Ft.background=new Wt(14674158);Df(ge,Ft);const R=new js(70,ic/oc,.05,600);R.position.set(on.layout.start.x,1.6,on.layout.start.z);R.lookAt(on.layout.start.x+Math.sin(on.layout.start.yaw)*5,1.6,on.layout.start.z+Math.cos(on.layout.start.yaw)*5);Ft.add(R);const Ie=1.6,zr=[];let Pt=0;const fd=(e,t)=>{const n=Math.abs(e-nn.x),a=Math.abs(t-nn.z);if(n<1.8&&a<1.8)return .5;if(n<2.4&&a<2.4)return .25;for(const s of zr)if(Math.abs(e-s.x)<1.4&&Math.abs(t-s.z)<1.4)return .25;return 0};function Fr(e,t){const n=ad();return(rd(e,t)||Ed(e,t))&&n.push(fd(e,t)),n}const dd=(e,t)=>{let n=null,a=1e9;for(const s of e){const i=Math.abs(s-t);i<a&&(a=i,n=s)}return n},Na=(e,t,n)=>{const a=dd(Fr(e,t),n);return a===null?0:a},qa=(e,t)=>Na(e,t,Pt);Ft.add(new rl(16774372,11838600,1.7));{const e=on.layout;e.rooms=[{id:"vault",title:"Vault",minX:400,maxX:406,minZ:400,maxZ:406,openings:[],windows:[]}],e.hallways=[],e.signs=[],e.groupSigns=[],e.nave={minX:-1,maxX:1,minZ:-3,maxZ:-1},e.gate={room:"vault",wall:"W",from:400.5,to:402.5},e.checkout={room:"vault",wall:"E",from:403,to:405},window.__rehang=gd(on)}{const e=on.layout.start;R.position.set(e.x,1.6,e.z),R.lookAt(e.x+Math.sin(e.yaw)*5,1.6,e.z+Math.cos(e.yaw)*5)}on.paintings.forEach(e=>{e.slug||(e.slug=e.id)});const na=on.layout,gn=na.hall.height,Ke=na.hall.doorHeight,ie=.3,ce={stone:(e,t)=>Ya.stone(e,t),metal:(e,t)=>Ya.metal(e,t),wood:(e,t)=>new oe({map:vu(Math.max(1,e),Math.max(1,t)),roughness:.85,metalness:0})};function Yt(e,t,n,a,s,i,o,r=Ft){const A=new X(new Ae(e,t,n),a);return A.position.set(s,i,o),A.castShadow=A.receiveShadow=!0,r.add(A),A}const rc=Rf(10,.35);new xt({map:rc,color:new Wt(2.6,2.2,2)});const ji=[],ii=[],Nr=[],Lr=[],co=[],Ve=na.rooms,ho=na.hallways;function Ac(e,t){ii.push([e,t]),Yt(.6,gn,.6,ce.stone(.6,gn/2),e,gn/2,t),Yt(.76,.22,.76,ce.metal(1,.3),e,.11,t),Yt(.8,.26,.8,ce.metal(1,.3),e,gn-.13,t)}function pd(e,t){const n=t==="N"||t==="S",a=t==="N"?e.maxZ:t==="S"?e.minZ:t==="W"?e.minX:e.maxX,s=n?e.minX:e.minZ,i=n?e.maxX:e.maxZ,o=t==="N"?[0,-1]:t==="S"?[0,1]:t==="W"?[1,0]:[-1,0],r=e.openings.filter(u=>u.wall===t).sort((u,d)=>u.from-d.from),A=[...r.map(u=>({...u,door:1})),...(e.windows||[]).filter(u=>u.wall===t)].sort((u,d)=>u.from-d.from),l=[];let h=s;A.forEach(u=>{l.push([h,u.from,0,gn]),u.door?l.push([u.from,u.to,Ke,gn]):(l.push([u.from,u.to,0,u.sill]),l.push([u.from,u.to,u.head,gn]),Lr.push({side:t,c:a,inward:o,from:u.from,to:u.to,sill:u.sill,head:u.head})),h=u.to}),l.push([h,i,0,gn]);const c=ie/2;l.forEach(([u,d,p,m])=>{const f=d-u;if(f<.01)return;const B=(u+d)/2,E=m-p,I=p>0?ce.metal(f/2,E/2):ce.stone(f/2,E/2);n?Yt(f,E,ie,I,B,p+E/2,a-o[1]*c):Yt(ie,E,f,I,a-o[0]*c,p+E/2,B)}),r.forEach(u=>{for(const d of[u.from-.35,u.to+.35]){const[p,m]=n?[d,a+o[1]*.35]:[a+o[0]*.35,d];Ac(p,m),Nr.push([p+o[0]*.45,2.9,m+o[1]*.45])}})}Ve.forEach(e=>{const t=e.maxX-e.minX,n=e.maxZ-e.minZ,a=(e.minX+e.maxX)/2,s=(e.minZ+e.maxZ)/2,i=new X(new Vt(t,n),Ya.floor(t/2.5,n/2.5));i.receiveShadow=!0,i.rotation.x=-Math.PI/2,i.position.set(a,0,s),Ft.add(i);let o;o=new X(new Vt(t,n),Ya.ceiling(t/2,n/2)),o.rotation.x=Math.PI/2,o.position.set(a,gn,s),Ft.add(o),ji.push(o);const r=new X(new Vt(t+.6,n+.6),new oe({color:e.id==="people"||e.id==="archive"?12040894:14275526,roughness:.6,metalness:e.id==="people"||e.id==="archive"?.5:0}));r.rotation.x=-Math.PI/2,r.position.set(a,gn+(e.id==="people"||e.id==="archive"?2.8:.05),s),Ft.add(r),["N","S","W","E"].forEach(A=>pd(e,A));for(const[A,l]of[[e.minX+.35,e.minZ+.35],[e.maxX-.35,e.minZ+.35],[e.minX+.35,e.maxZ-.35],[e.maxX-.35,e.maxZ-.35]])Ac(A,l);Nr.push([a,gn-.9,s])});ho.forEach(e=>{const t=e.maxX-e.minX,n=e.maxZ-e.minZ,a=(e.minX+e.maxX)/2,s=(e.minZ+e.maxZ)/2,i=new X(new Vt(t,n),Ya.floor(t/2.5,n/2.5));if(i.rotation.x=-Math.PI/2,i.position.set(a,.005,s),Ft.add(i),e.zrun){const r=Yt(t+2*ie,.2,n,ce.metal(t,n),a,Ke+.1,s);ji.push(r),Yt(ie,Ke,n,ce.stone(n/2,1.4),e.minX-ie/2,Ke/2,s),Yt(ie,Ke,n,ce.stone(n/2,1.4),e.maxX+ie/2,Ke/2,s);return}const o=Yt(t,.2,n+2*ie,ce.metal(t,n),a,Ke+.1,s);ji.push(o),Yt(t,Ke,ie,ce.stone(t/2,1.4),a,Ke/2,e.minZ-ie/2),Yt(t,Ke,ie,ce.stone(t/2,1.4),a,Ke/2,e.maxZ+ie/2)});const Ts=na.nave,Wi={id:"central",title:"The Rotunda",minX:-20,maxX:20,minZ:-20,maxZ:20},oi=ud(Ft,{MAT:{floor:Ya.floor,ceiling:Ya.ceiling}}),lc=[];Ve.forEach(e=>e.openings.filter(t=>t.nave).forEach(t=>{const n=t.wall==="N"?e.maxZ:t.wall==="S"?e.minZ:t.wall==="W"?e.minX:e.maxX,a=t.wall==="N"?[0,1]:t.wall==="S"?[0,-1]:t.wall==="W"?[-1,0]:[1,0],s=(t.from+t.to)/2,i=t.wall==="N"||t.wall==="S";lc.push({title:e.title||e.name||e.id,x:i?s:n+a[0]*(ie+.03),z:i?n+a[1]*(ie+.03):s,yaw:Math.atan2(a[0],a[1])})}));Lr.forEach(e=>{const t=e.side==="N"||e.side==="S",n=(e.from+e.to)/2,a=e.to-e.from,s=(i,o,r)=>t?[i,o,e.c-e.inward[1]*r]:[e.c-e.inward[0]*r,o,i];t?Yt(a+.2,.08,ie+.16,ce.metal(1,.2),...s(n,e.sill,ie/2)):Yt(ie+.16,.08,a+.2,ce.metal(1,.2),...s(n,e.sill,ie/2));for(const i of[e.from,e.to])Yt(t?.08:ie,e.head-e.sill,t?ie:.08,ce.metal(.2,1),...s(i,(e.sill+e.head)/2,ie/2));Yt(t?.05:ie*.6,e.head-e.sill,t?ie*.6:.05,ce.metal(.1,1),...s(n,(e.sill+e.head)/2,ie/2))});const bt=(()=>{const e=na.gate,t=Ve.find(o=>o.id===e.room),n=(e.from+e.to)/2,a=e.wall==="N"||e.wall==="S",s=e.wall==="N"?t.maxZ:e.wall==="S"?t.minZ:e.wall==="W"?t.minX:t.maxX,i=e.wall==="N"?[0,-1]:e.wall==="S"?[0,1]:e.wall==="W"?[1,0]:[-1,0];return{pos:a?new q(n,0,s):new q(s,0,n),n:new q(i[0],0,i[1]),w:1.5,h:2.6}})(),ri=new me({transparent:!0,side:en,uniforms:{uTime:{value:0},uA:{value:new Wt(.18,.05,.45)},uB:{value:new Wt(.35,.55,1)},uC:{value:new Wt(.6,.4,1)},uGlow:{value:_e?1.25:1.4},uSat:{value:_e?2.2:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`varying vec2 vUv; uniform float uTime, uGlow, uSat; uniform vec3 uA, uB, uC;
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
      gl_FragColor = vec4(col * uGlow, .92 * edge + .08); }`});{const e=new Ut;e.position.copy(bt.pos).addScaledVector(bt.n,.04),e.rotation.y=Math.atan2(bt.n.x,bt.n.z),Ft.add(e);const t=new X(new Vt(bt.w,bt.h),ri);t.position.y=bt.h/2,e.add(t),bt.mesh=t;const n=ce.metal(.3,1.4);Yt(.3,bt.h+.3,.3,n,-bt.w/2-.15,(bt.h+.3)/2,.1,e),Yt(.3,bt.h+.3,.3,n,bt.w/2+.15,(bt.h+.3)/2,.1,e),Yt(bt.w+.9,.35,.36,n,0,bt.h+.3,.1,e),Yt(bt.w+.9,.12,.8,ce.metal(1,.3),0,.06,.3,e);const a=new Nn(8019199,14,7,2);a.position.set(0,1.4,.8),e.add(a),bt.light=a;{const l=new us(Vi(8019199,.5));l.scale.set(3.6,3.8,1),l.position.set(0,1.4,.35),l.visible=Ga,e.add(l),$s.push(l)}const s=document.createElement("canvas");s.width=1024,s.height=224;const i=s.getContext("2d"),o=i.createLinearGradient(0,0,0,224);o.addColorStop(0,"#1a0830"),o.addColorStop(1,"#0a0418"),i.fillStyle=o,i.fillRect(0,0,1024,224),i.shadowColor="#3ef0ff",i.shadowBlur=18,i.strokeStyle="#7ef6ff",i.lineWidth=6,i.strokeRect(10,10,1004,204),i.shadowBlur=0,i.strokeStyle="rgba(200,120,255,.6)",i.lineWidth=2,i.strokeRect(22,22,980,180),i.textAlign="center",i.textBaseline="middle",i.font="900 104px Impact, Arial Black, sans-serif",i.shadowColor="#ff4fd8",i.shadowBlur=30,i.fillStyle="#ff9cf0",i.fillText("HYPERSPACE REALM",512,96,930),i.shadowBlur=8,i.fillStyle="#fff4ff",i.fillText("HYPERSPACE REALM",512,96,930),i.shadowColor="#3ef0ff",i.shadowBlur=12,i.fillStyle="#9ef8ff",i.font="700 34px Impact, Arial Black, sans-serif",i.fillText("▼  STEP THROUGH THE SLIPGATE  ▼",512,178,900);const r=new Be(s);r.colorSpace=Ce,r.anisotropy=8;const A=new X(new Vt(2.6,.57),new xt({map:r,toneMapped:!1}));A.position.set(0,bt.h+.98,.3),A.name="hyperspaceSign",e.add(A),dn(A),bt.sign=A;{const l=new us(Vi(12607743,.35));l.scale.set(3.6,1.3,1),l.position.set(0,bt.h+.98,.26),l.visible=Ga,e.add(l),$s.push(l)}}const Zt=(()=>{const e=na.checkout,t=Ve.find(o=>o.id===e.room),n=(e.from+e.to)/2,a=e.wall==="N"||e.wall==="S",s=e.wall==="N"?t.maxZ:e.wall==="S"?t.minZ:e.wall==="W"?t.minX:t.maxX,i=e.wall==="N"?[0,-1]:e.wall==="S"?[0,1]:e.wall==="W"?[1,0]:[-1,0];return{pos:a?new q(n,0,s):new q(s,0,n),n:new q(i[0],0,i[1]),w:1.5,h:2.6}})(),Ai=ri.clone();Ai.uniforms.uA.value=new Wt(.05,.22,.06);Ai.uniforms.uB.value=new Wt(1,.78,.2);Ai.uniforms.uC.value=new Wt(.6,1,.4);{const e=new Ut;e.position.copy(Zt.pos).addScaledVector(Zt.n,.04),e.rotation.y=Math.atan2(Zt.n.x,Zt.n.z),Ft.add(e);const t=new X(new Vt(Zt.w,Zt.h),Ai);t.position.y=Zt.h/2,e.add(t);const n=new oe({color:9071138,metalness:.9,roughness:.35});Yt(.3,Zt.h+.3,.3,n,-Zt.w/2-.15,(Zt.h+.3)/2,.1,e),Yt(.3,Zt.h+.3,.3,n,Zt.w/2+.15,(Zt.h+.3)/2,.1,e),Yt(Zt.w+.9,.35,.36,n,0,Zt.h+.3,.1,e),Yt(Zt.w+.9,.12,.8,ce.metal(1,.3),0,.06,.3,e);const a=new Nn(14204992,14,7,2);a.position.set(0,1.4,.8),e.add(a),Zt.light=a;{const A=new us(Vi(14204992,.45));A.scale.set(3.6,3.8,1),A.position.set(0,1.4,.35),A.visible=Ga,e.add(A),$s.push(A)}const s=document.createElement("canvas");s.width=512,s.height=96;const i=s.getContext("2d");i.fillStyle="#1a1206",i.fillRect(0,0,512,96),i.strokeStyle="#e8c050",i.lineWidth=6,i.strokeRect(3,3,506,90),i.fillStyle="#ffd860",i.font="900 64px Impact, Arial Black, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText("CHECKOUT",256,50);const o=new Be(s);o.colorSpace=Ce,o.anisotropy=8;const r=new X(new Vt(1.8,.34),new xt({map:o}));r.position.set(0,Zt.h+.3,.29),e.add(r),dn(r)}const le=(()=>{const e=window.__splatPortal;return{pos:new q(e.x,0,e.z),n:new q(e.nx,0,e.nz),s:e.scale,url:e.url,fill:e.fill||null}})(),Qn=ri.clone();Qn.uniforms.uA.value=new Wt(.26,.17,.11);Qn.uniforms.uB.value=new Wt(.92,.72,.5);Qn.uniforms.uC.value=new Wt(.7,.55,.38);Qn.uniforms.uSat&&(Qn.uniforms.uSat.value=1);Qn.uniforms.uGlow&&(Qn.uniforms.uGlow.value=.9);le.fill&&(Qn.fragmentShader=ri.fragmentShader.replace(/if \(p\.y > 2\.6 - r && length\(p - vec2\(0\., 2\.6 - r\)\) > r\) discard;/,""),Qn.needsUpdate=!0);{const e=new Ut;e.position.copy(le.pos).addScaledVector(le.n,le.fill?0:.04),e.rotation.y=Math.atan2(le.n.x,le.n.z),e.scale.setScalar(le.s),e.name="dungeonGate",Ft.add(e),le.group=e;const t=le.fill,n=t?t.w:1.5,a=t?t.h:2.6,s=new X(new Vt(n,a),Qn);s.position.y=a/2,e.add(s);const i=ce.metal(.3,1.4);t||(Yt(.3,2.9,.3,i,-.9,1.45,.1,e),Yt(.3,2.9,.3,i,.9,1.45,.1,e),Yt(2.4,.35,.36,i,0,2.9,.1,e),Yt(2.4,.12,.8,ce.metal(1,.3),0,.06,.3,e));const o=new Nn(16768180,1.6,2.6,2);o.position.set(0,1.4,.8),e.add(o),le.light=o,s.name="dungeonGatePlane";const r=document.createElement("canvas");r.width=512,r.height=96;const A=r.getContext("2d");A.fillStyle="#2a241e",A.fillRect(0,0,512,96),A.strokeStyle="#c9b391",A.lineWidth=6,A.strokeRect(3,3,506,90),A.fillStyle="#e8d8bc",A.font="900 52px Impact, Arial Black, sans-serif",A.textAlign="center",A.textBaseline="middle",A.fillText("TO THE DUNGEON",256,50,480);const l=new Be(r);l.colorSpace=Ce;const h=t?Math.min(.95,n-.12):1.9,c=new X(new Vt(h,h*.36/1.9),new xt({map:l}));c.position.set(0,t?a-.16:3.3,t?.03:.29),c.name="dungeonSign",e.add(c),dn(c)}let Ar=!1;function cc(){if(Ar)return;Ar=!0,window.__dungeonGo=le.url,uo(),ae("BACK TO THE DUNGEON…",3),he.isLocked&&he.unlock();const e=window.__gatesNav?"/play/?via="+encodeURIComponent(window.__splatPortal.via||"home"):le.url;window.__dungeonGo=e,window.__noNav||(window.__gatesNav?window.__gatesNav(e):setTimeout(()=>top.location.assign(e),600))}window.__dungeonGate={pos:le.pos,n:le.n,url:le.url,go:cc,get going(){return Ar}};let lr=!1;function Ur(){try{sessionStorage.setItem("tjmPlayState",JSON.stringify({pos:R.position.toArray(),quat:R.quaternion.toArray(),weapon:se,cart:Kn.map(e=>e.slug),swarmCount:Ia,at:Date.now()}))}catch{}}function hc(){if(lr)return;lr=!0;const e=Zt.pos.clone().addScaledVector(Zt.n,1.6);e.y=Ie,R.position.copy(e),R.lookAt(Zt.pos.x,Ie,Zt.pos.z),Ur();try{const a=JSON.parse(localStorage.getItem("va-cart-v1")||"[]"),s=new Set((Array.isArray(a)?a:[]).map(o=>o.id)),i=Kn.filter(o=>o.status==="available"&&!s.has(o.slug)).map(o=>({id:o.slug,quantity:1}));localStorage.setItem("va-cart-v1",JSON.stringify([...Array.isArray(a)?a:[],...i].slice(0,12)))}catch{}uo(),ae("TO THE CHECKOUT…",3),he.isLocked&&he.unlock();const t=/(^|\.)tjm\.art$/.test(location.hostname),n=Kn.filter(a=>a.status==="available").map(a=>a.slug).slice(0,12);setTimeout(()=>top.location.assign(t?"/cart/?from=play":"https://tjm.art/play/to-cart.html?from=play&items="+encodeURIComponent(n.join(","))),600)}let qo=null;function uo(){try{qo=qo||new(window.AudioContext||window.webkitAudioContext);const e=qo,t=e.currentTime,n=e.createOscillator(),a=e.createGain();n.type="sawtooth",n.frequency.setValueAtTime(880,t),n.frequency.exponentialRampToValueAtTime(55,t+.9),a.gain.setValueAtTime(.25,t),a.gain.exponentialRampToValueAtTime(.001,t+1),n.connect(a).connect(e.destination),n.start(t),n.stop(t+1);const s=e.createBuffer(1,e.sampleRate,e.sampleRate),i=s.getChannelData(0);for(let A=0;A<i.length;A++)i[A]=(Math.random()*2-1)*(1-A/i.length);const o=e.createBufferSource(),r=e.createGain();o.buffer=s,r.gain.value=.18,o.connect(r).connect(e.destination),o.start(t)}catch{}}let Te=null;function md(){const e=bt.pos.clone().addScaledVector(bt.n,1.6);e.y=Ie;const t=R.clone();t.position.copy(e),t.lookAt(e.x+bt.n.x,Ie,e.z+bt.n.z),Te={v:0,back:e,backQ:t.quaternion.clone(),t:0},uo(),he.enabled=!1,Le.set(0,0,0),R.position.set((Ts.minX+Ts.maxX)/2,ac.YD-3,(Ts.minZ+Ts.maxZ)/2),Pt=0,R.quaternion.setFromEuler(new fn(-1.2,0,0,"YXZ")),ae("YOU ARE FALLING",2.5)}function Id(e){if(Te.t+=e,Te.v-=9.8*e,R.position.y+=Te.v*e,R.position.y<.1){const t=Te;Te=null,mo=!1,Ge=!0,document.body.classList.add("chaos"),ae("THE ROTUNDA FLOOR IS NOT A FLOOR",3),Dn.start({direct:!0,worldLen:11,savedPos:t.back,savedQuat:t.backQ}),Gr++}}let Gr=0;function uc(e,t){const n=document.createElement("canvas"),a=n.getContext("2d"),s=96;a.font="600 52px Georgia, serif";const i=Math.ceil(a.measureText(e).width+90);n.width=i,n.height=s,a.fillStyle="#2a2014",a.fillRect(0,0,i,s),a.strokeStyle="#c9a24a",a.lineWidth=5,a.strokeRect(4,4,i-8,s-8),a.font="600 52px Georgia, serif",a.fillStyle="#f0d070",a.textAlign="center",a.textBaseline="middle",a.fillText(e,i/2,s/2+3);const o=new Be(n);o.colorSpace=Ce,o.anisotropy=4;const r=new X(new Vt(t*i/s,t),new xt({map:o}));return dn(r),r}[...na.signs,...lc.map(e=>({...e,y:Ke+.42}))].forEach(e=>{const t=uc(e.title,.3);t.position.set(e.x,e.y,e.z),t.rotation.y=e.yaw,Ft.add(t)});(na.groupSigns||[]).forEach(e=>{const t=uc(e.title,.26);t.position.set(e.x,e.y,e.z),t.rotation.y=e.yaw,Ft.add(t)});const gc=new xt({color:new Wt(2.2,1.8,1.2)});{const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),n=t.createRadialGradient(64,64,2,64,64,64);n.addColorStop(0,"rgba(255,214,150,.9)"),n.addColorStop(.5,"rgba(255,190,120,.35)"),n.addColorStop(1,"rgba(255,170,90,0)"),t.fillStyle=n,t.fillRect(0,0,128,128);const a=new Be(e);a.colorSpace=Ce;const s=new xt({map:a,transparent:!0,blending:bn,depthWrite:!1,opacity:_e?.45:.85,polygonOffset:!0,polygonOffsetFactor:-2});ho.forEach(i=>{const o=(i.minX+i.maxX)/2,r=(i.minZ+i.maxZ)/2,A=i.maxX-i.minX>i.maxZ-i.minZ?"x":"z",l=new X(new Vt(A==="x"?7:5,A==="x"?5:7),s);l.rotation.x=-Math.PI/2,l.position.set(o,.02,r),l.renderOrder=2,Ft.add(l);const h=new X(new Ae(A==="x"?.8:.12,.08,A==="x"?.12:.8),gc);if(h.position.set(o,Ke-.1,r),Ft.add(h),!ea){const c=new Nn(16767136,9,7,2);c.position.set(o,Ke-.3,r),Ft.add(c)}})}const nn={x:999,z:999};Yt(4.8,.25,4.8,ce.stone(2.4,.2),nn.x,.125,nn.z);Yt(3.6,.25,3.6,ce.metal(1.8,.2),nn.x,.375,nn.z);const go=[{room:"central",src:"holo/holo_central_full.mp4",still:"holo/still_central_full.jpg",asp:600/408,y:.5,x:nn.x,z:nn.z,title:"Barre-chord loop (2026-08-21)"}];go.forEach(e=>{if(e.room==="central")return;const t=Ve.find(n=>n.id===e.room);e.x=(t.minX+t.maxX)/2,e.z=(t.minZ+t.maxZ)/2,e.y=.25,zr.push({x:e.x,z:e.z}),Yt(2.8,.25,2.8,ce.metal(1.4,.2),e.x,.125,e.z)});go.forEach(e=>{const t=e.room==="central"?{minX:-10,maxX:10,minZ:-10,maxZ:10}:Ve.find(n=>n.id===e.room);e.b={minX:t.minX,maxX:t.maxX,minZ:t.minZ,maxZ:t.maxZ}});const $e=ku(Ft,R,go,{low:ea,base:"/play/"});{const e=document.createElement("span");e.className="cell",e.id="holomute",e.setAttribute("role","button"),e.tabIndex=0,e.title="Hologram sound (M)";const t=document.createElement("button");t.id="soundbtn",t.type="button";const n=r=>{e.textContent=r?"♪ off":"♪ on",t.textContent=r?"🔇":"🔊",t.setAttribute("aria-label",r?"Unmute music":"Mute music"),t.setAttribute("aria-pressed",String(r)),t.title=(r?"Unmute":"Mute")+" music (M)"};let a=!1;try{a=localStorage.getItem("tjmPlayMuted")==="1"}catch{}$e.setMuted(a,!1),n(a);const s=r=>{r&&(r.stopPropagation(),r.preventDefault());const A=$e.setMuted(!$e.muted,!0);n(A);try{localStorage.setItem("tjmPlayMuted",A?"1":"0")}catch{}},i=r=>r.stopPropagation();[e,t].forEach(r=>{r.addEventListener("click",s),r.addEventListener("touchstart",s,{passive:!1}),["mousedown","pointerdown","mouseup","pointerup","touchend"].forEach(A=>r.addEventListener(A,i))}),document.getElementById("hud").appendChild(e),document.body.appendChild(t),window.__holoToggle=s;const o=()=>$e.begin();["pointerdown","keydown","touchstart"].forEach(r=>addEventListener(r,o,{passive:!0}))}let Ba={n:0,t:0,done:!ea};const Cd=new oe({color:10123834,metalness:.8,roughness:.35}),LA=Nr.map(([e,t,n])=>{const a=new X(new ve(.11,12,8),new xt({color:new Wt(1.6,1.5,1.3)}));Yt(.05,.3,.05,Cd,e,t-.24,n);{const s=new us(Vi(16773328,.3));s.scale.set(1.1,1.3,1),s.position.set(e,t+.05,n),s.visible=Ga,Ft.add(s),$s.push(s)}return{flame:a,ph:Math.random()*10,pos:new q(e,t,n)}}),fc=14,Xi=Array.from({length:_e?4:Ga?3:2},(e,t)=>{const n=new Nn(16773340,fc,11,2);if(_e&&t<2||Ga){const a=_e?512:256;n.castShadow=!0,n.shadow.mapSize.set(a,a),n.shadow.bias=-.004,n.shadow.normalBias=.02,n.shadow.radius=_e?4:1,n.shadow.camera.near=.1,n.shadow.camera.far=11,n.shadow.autoUpdate=!1,n.shadow.needsUpdate=!0}return Ft.add(n),n}),Ti=.45,dc=[];Ve.forEach(e=>e.openings.forEach(t=>{const n=t.wall==="N"?e.maxZ:t.wall==="S"?e.minZ:t.wall==="W"?e.minX:e.maxX,a=t.wall==="N"||t.wall==="S";dc.push(a?{minX:t.from+.3,maxX:t.to-.3,minZ:n-1,maxZ:n+1}:{minX:n-1,maxX:n+1,minZ:t.from+.3,maxZ:t.to-.3})}));function Ed(e,t){for(const n of dc)if(e>n.minX&&e<n.maxX&&t>n.minZ&&t<n.maxZ)return!0;for(const n of Ve)if(e>n.minX+Ti&&e<n.maxX-Ti&&t>n.minZ+Ti&&t<n.maxZ-Ti)return!0;for(const n of ho)if(n.zrun?t>=n.minZ-.5&&t<=n.maxZ+.6&&e>n.minX+.3&&e<n.maxX-.3:e>=n.minX-.5&&e<=n.maxX+.6&&t>n.minZ+.3&&t<n.maxZ-.3)return!0;return!1}const Bd=window.__walkExtra=window.__walkExtra||[];function Bn(e,t,n=Pt){if(n<.6){for(const a of Bd)if(a(e,t))return!0}for(const a of Fr(e,t))if(Math.abs(a-n)<.6)return!0;return!1}function Ca(e,t,n=0){if(n>3&&Math.hypot(e,t)<21)return Wi;for(const i of Ve)if(e>i.minX-.4&&e<i.maxX+.4&&t>i.minZ-.4&&t<i.maxZ+.4)return i;if(Math.hypot(e,t)<21)return Wi;let a=null,s=1e9;return Ve.forEach(i=>{const o=Math.max(i.minX-e,0,e-i.maxX),r=Math.max(i.minZ-t,0,t-i.maxZ),A=o+r;A<s&&(s=A,a=i)}),a}const pc=new ei;pc.setCrossOrigin("anonymous");const mc=6180928,yd=(()=>{const e=document.createElement("canvas");e.width=e.height=256;const t=e.getContext("2d"),n=t.createRadialGradient(128,40,4,128,120,135);n.addColorStop(0,"rgba(255,236,200,1)"),n.addColorStop(.45,"rgba(255,220,170,.55)"),n.addColorStop(1,"rgba(255,200,140,0)"),t.fillStyle=n,t.fillRect(0,0,256,256);const a=new Be(e);return a.colorSpace=Ce,a})(),wd=new oe({color:2761757,roughness:.6});new oe({color:9071162,metalness:.9,roughness:.35});const xd=new xt({map:yd,transparent:!0,opacity:_e?.32:.34,blending:bn,depthWrite:!1}),_a=new Vt(1,1),Re=[],UA=e=>String(e).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),GA=[],Qd=ge.capabilities.getMaxAnisotropy(),li=e=>(e.colorSpace=Ce,e.generateMipmaps=!0,e.minFilter=Dh,e.magFilter=Th,e.anisotropy=Qd,e.needsUpdate=!0,e);function YA(e,t,n){const a=[];let s="";for(const i of t.split(" ")){const o=s?s+" "+i:i;e.measureText(o).width>n&&s?(a.push(s),s=i):s=o}return s&&a.push(s),a}function cr(e,t,n){if(e.measureText(t).width<=n)return t;for(;t.length>1&&e.measureText(t+"…").width>n;)t=t.slice(0,-1);return t+"…"}const vd=.28,Ic=.0875;function bd(e,t,n,a){const s=document.createElement("canvas");s.width=512,s.height=160;const i=s.getContext("2d");i.fillStyle="#e9e1cf",i.fillRect(0,0,512,160),i.strokeStyle="#8a7a5c",i.lineWidth=4,i.strokeRect(2,2,508,156);const o=a?440:476;i.fillStyle="#1d1712",i.font="bold 44px Georgia, serif",i.textBaseline="middle",i.fillText(cr(i,e,o),18,54),i.fillStyle=n||"#4a3f32",i.font="32px Arial, sans-serif",i.fillText(cr(i,t,o),18,112),a&&(i.fillStyle="#c8211b",i.beginPath(),i.arc(484,80,14,0,Math.PI*2),i.fill());const r=new X(_a,new xt({map:li(new Be(s))}));return r.scale.set(vd,Ic,1),dn(r),r}const Yr=[];(on.plaques||[]).forEach(e=>{const t=new Ut;t.position.set(e.x,e.y,e.z),t.rotation.y=Math.atan2(e.ix,e.iz),Ft.add(t);const n=new X(_a,new Fn({color:2760728}));n.scale.set(e.fw+.06,e.fh+.06,1),n.position.z=.01,t.add(n);const a=new X(_a,new xt({color:1380363}));a.scale.set(e.fw,e.fh,1),a.position.z=.02,t.add(a),a.userData.q=e,n.userData.q=e,Yr.push(a,n);{const s=document.createElement("canvas");s.width=620,s.height=820;const i=s.getContext("2d");i.fillStyle="#17110c",i.fillRect(0,0,620,820),i.fillStyle="#f2e4c4",i.font="bold 40px Georgia, serif";let o=60;for(const r of YA(i,e.title,560).slice(0,3))i.fillText(r,30,o),o+=46;i.font="24px Arial, sans-serif",i.fillStyle="#d2b47a",e.lines[0]&&(i.fillText(cr(i,e.lines[0],560),30,o),o+=44),i.font="25px Georgia, serif",i.fillStyle="#e6d6b4";for(const r of e.lines.slice(1)){for(const A of YA(i,r,560)){if(o>740)break;i.fillText(A,30,o),o+=32}o+=14}i.font="22px Arial, sans-serif",i.fillStyle="#d2b47a",i.fillText("Press E to read more on tjm.art",30,790),a.material=new xt({map:li(new Be(s))}),dn(a)}});const Cc=(e,t)=>{const n=new Ut;n.position.set(e.x,e.y,e.z),n.rotation.y=Math.atan2(e.ix,e.iz),Ft.add(n);const a=e.fw,s=e.fh,i=new X(_a,wd);i.scale.set(Math.max(a,e.w+.03),Math.max(s,e.h+.03),1),i.position.z=.005,n.add(i);const o=new X(_a,new xt({color:mc}));o.scale.set(e.w,e.h,1),o.position.z=.02,n.add(o),dn(o),i.castShadow=!0;const r=new X(_a,xd);r.scale.set(a*1.6+.9,s*1.5+.9,1),r.position.set(0,.2,.001),n.add(r);const A=new X(_a,gc);A.scale.set(Math.min(.8,a*.6),.05,1),A.position.set(0,s/2+.12,.06),n.add(A),e.slug=e.slug||e.id;const l=e.caption&&e.caption.length<30?e.caption:"",h=e.status==="available"?"available":e.status==="sold"?"SOLD":e.status==="inquiry"?"available by inquiry":"not for sale",c={data:e,group:n,mesh:o,frame:i,bar:A,state:"wall",i:t,w:a,h:s,room:e.room},u=bd(e.title,(l?l+" · ":"")+h,e.status==="sold"?"#a3241a":e.status==="available"?"#8a4a10":null,e.status==="sold");return u.position.set(0,-s/2-.044-Ic/2,.012),n.add(u),c.plaque=u,o.userData.p=c,i.userData.p=c,Re.push(c),fo(sc+e.img,3,d=>{li(d),ge.initTexture(d),c.baseTex=d,c.hiTex||(o.material.map=d,o.material.color.set(16777215),o.material.needsUpdate=!0),c.base=1},()=>{c.baseFailed=1}),c};on.paintings.forEach(Cc);{const e=Re.find(t=>t.data.id==="friends-club-mural");e&&e.data.hi&&(e.hiReq=1,e.pinned=1,e.hiUrl=e.data.hi,setTimeout(()=>fo(e.hiUrl,3,t=>{li(t),ge.initTexture(t),e.state==="wall"&&(e.mesh.material.map=t,e.mesh.material.color.set(16777215),e.mesh.material.needsUpdate=!0,e.hiTex=t,e.hi=1)}),0))}function fo(e,t,n,a){pc.load(e,n,void 0,()=>{t>0?setTimeout(()=>fo(e+(e.includes("?")?"&":"?")+"retry="+t,t-1,n,a),600*(4-t)):(window.__texFail=(window.__texFail||0)+1,a&&a())})}const qA=ea?14:28,Ki=[],Jn=[];let _i=0;function hr(){for(;_i<2&&Ki.length;){const e=Ki.shift();if(e.dist-e.w/2>9||e.state!=="wall"){e.hiReq=0;continue}_i++,fo(e.hiUrl,2,t=>{li(t);const n=()=>{_i--,e.state==="wall"&&!e.hiTex?(ge.initTexture(t),e.mesh.material.map=t,e.mesh.material.color.set(16777215),e.mesh.material.needsUpdate=!0,e.hiTex=t,e.hi=1,Jn.push(e),Sd()):t.dispose(),hr()};t.image&&t.image.decode?t.image.decode().catch(()=>{}).then(n):n()},()=>{_i--,hr()})}}function Sd(){if(!(Jn.length<=qA)){Jn.sort((e,t)=>t.dist-e.dist);for(let e=Jn.length-1;e>=0;e--)Jn[e].pinned&&Jn.splice(e,1);for(;Jn.length>qA&&Jn[0].dist>6;){const e=Jn.shift();e.mesh.material.map=e.baseTex||null,e.baseTex||e.mesh.material.color.set(mc),e.mesh.material.needsUpdate=!0,e.hiTex.dispose(),e.hiTex=null,e.hi=0,e.hiReq=0}}}const PA=Array.from({length:_e?6:3},()=>{const e=new el(16773340,30,5,.42,.75,2);return Ft.add(e),Ft.add(e.target),e});let HA=0;const Md=/(^|\.)tjm\.art$/.test(location.hostname);function ms(e){const t=R.position,n=Ca(t.x,t.z,t.y-Ie);Re.forEach(i=>{if(i.dist=i.group.position.distanceTo(t),i.dist-i.w/2<5.5&&!i.hiReq&&i.state==="wall"){const o=i.data.hi||"",r=Md||/^https:\/\/img\.tjm\.art\//.test(o)?o:/^https:\/\/tjm\.art\//.test(o)?"/tjm"+o.slice(15):/^https:\/\/media\.vermillionaurora\.com\//.test(o)?"/mva"+o.slice(34):null;r&&(i.hiReq=1,i.hiUrl=r,Ki.push(i))}if(i.state==="wall"){i.group.visible=i.dist<24||i.data.room===(n&&n.id)||!!(window.game&&window.game.freeze);const o=i.dist<14;i.plaque&&(i.plaque.visible=o),i.bar&&(i.bar.visible=o)}}),Ki.sort((i,o)=>i.dist-o.dist),hr();const a=Re.filter(i=>i.state==="wall").sort((i,o)=>i.dist-o.dist).slice(0,PA.length);PA.forEach((i,o)=>{const r=a[o];if(!r){i.intensity=0;return}const A=new q(r.data.ix,0,r.data.iz);i.intensity=14,i.position.copy(r.group.position).addScaledVector(A,1.1),i.position.y+=1.4,i.target.position.copy(r.group.position)}),LA.forEach(i=>i.d=i.pos.distanceTo(t));const s=[...LA].sort((i,o)=>i.d-o.d).slice(0,Xi.length);Xi.forEach((i,o)=>{s[o]&&i.userData.t!==s[o]&&(i.position.copy(s[o].pos),i.userData.t=s[o],i.castShadow&&(i.shadow.needsUpdate=!0))})}ms();const qr=()=>Re.filter(e=>e.state==="wall"&&e.group.visible).flatMap(e=>[e.mesh,e.frame]),he=new ou(R,document.body),Un=document.getElementById("start");Un.addEventListener("click",()=>{matchMedia("(pointer:coarse)").matches?Un.style.display="none":he.lock()});he.addEventListener("lock",()=>Un.style.display="none");he.addEventListener("unlock",()=>{!window.__test&&!window.__reading&&(Un.style.display="flex")});const Ec=[];Ec.forEach(e=>{const t=Ve.find(s=>s.id===e.room),n=(t.minX+t.maxX)/2,a=(t.minZ+t.maxZ)/2;e.x=n+e.dx,e.z=a+e.dz,e.yaw=Math.atan2(n-e.x,a-e.z),e.cover=`books/${e.id}/cover.webp`});const ci=Tu({scene:Ft,camera:R,controls:he,defs:Ec,base:"/play/",low:ea,stone:ce.stone(.6,.6),pillars:ii,isMuted:()=>$e.muted,onReading:e=>document.body.classList.toggle("reading",e)}),ha={};addEventListener("keydown",e=>{ha[e.code]=!0;{const t=/^Digit([1-3])$/.exec(e.code);if(t){const n=window.__toolAt?window.__toolAt(+t[1]):+t[1]-1;n!=null&&qn(n)}}e.code==="KeyC"&&po(),e.code==="KeyE"&&!window.__reading&&!ci.tryOpen()&&Mc(),e.code==="KeyM"&&window.__holoToggle&&window.__holoToggle()});addEventListener("keyup",e=>ha[e.code]=!1);let JA=0;addEventListener("wheel",e=>{const t=performance.now();t-JA<180||!e.deltaY||(JA=t,qn(window.__toolStep?window.__toolStep(se,e.deltaY<0?-1:1):(se+(e.deltaY<0?vn.length-1:1))%vn.length))});addEventListener("contextmenu",e=>{(he.isLocked||se===2)&&e.preventDefault()});addEventListener("mousedown",e=>{he.isLocked&&e.button===2&&se===2&&!window.__reading&&ke&&ke.secondary()});addEventListener("mousedown",e=>{if(he.isLocked&&e.button===0&&!window.__reading){if(ci.tryOpen(new kt(0,0)))return;Hr()}});const Pa={x:0,y:0};let _s=null,ur=null;const Pr=document.getElementById("tmove");Pr.addEventListener("touchstart",e=>{ur=e.changedTouches[0],e.preventDefault()},{passive:!1});Pr.addEventListener("touchmove",e=>{const t=e.changedTouches[0];Pa.x=(t.clientX-ur.clientX)/60,Pa.y=(t.clientY-ur.clientY)/60,e.preventDefault()},{passive:!1});Pr.addEventListener("touchend",()=>{Pa.x=Pa.y=0});xn.addEventListener("touchstart",e=>{_s=e.changedTouches[0]},{passive:!0});xn.addEventListener("touchmove",e=>{const t=e.changedTouches[0];if(!_s)return;const n=new fn(0,0,0,"YXZ").setFromQuaternion(R.quaternion);n.y-=(t.clientX-_s.clientX)*.005,n.x=Math.max(-1.4,Math.min(1.4,n.x-(t.clientY-_s.clientY)*.005)),R.quaternion.setFromEuler(n),_s=t},{passive:!0});document.getElementById("tfire").addEventListener("touchstart",e=>{e.preventDefault(),Hr()});document.getElementById("tswap").addEventListener("touchstart",e=>{e.preventDefault(),qn(window.__toolStep?window.__toolStep(se,1):(se+1)%vn.length)});document.getElementById("tlaunch").addEventListener("touchstart",e=>{e.preventDefault(),se===2&&ke&&ke.secondary()});document.querySelectorAll("#hud .wpn").forEach(e=>{const t=n=>{n.preventDefault(),n.stopPropagation(),qn(+e.dataset.w)};e.addEventListener("touchstart",t,{passive:!1}),e.addEventListener("mousedown",n=>n.stopPropagation()),e.addEventListener("click",t)});const Bc=document.getElementById("cartcell");["click","touchstart"].forEach(e=>Bc.addEventListener(e,t=>{t.preventDefault(),t.stopPropagation(),po()},{passive:!1}));Bc.addEventListener("mousedown",e=>e.stopPropagation());const kd=matchMedia("(pointer:coarse)").matches,Dd=matchMedia("(display-mode: fullscreen), (display-mode: standalone)").matches||navigator.standalone;function yc(){if(!kd||Dd)return;const e=document.documentElement,t=e.requestFullscreen||e.webkitRequestFullscreen||e.webkitRequestFullScreen||e.msRequestFullscreen;if(t&&!(document.fullscreenElement||document.webkitFullscreenElement))try{const n=t.call(e,{navigationUI:"hide"});n&&n.then?n.then(OA,()=>{}):OA()}catch{}else if(!t){window.scrollTo(0,1);try{if(!localStorage.getItem("tjmIosHint")){localStorage.setItem("tjmIosHint","1");const n=document.getElementById("iosHint");n.hidden=!1,n.querySelector("button").onclick=()=>n.hidden=!0,setTimeout(()=>n.hidden=!0,9e3)}}catch{}}}{const e=document.getElementById("rotate");if(e){const t=document.createElement("button");t.type="button",t.id="portraitok",t.textContent="Play in portrait anyway";try{sessionStorage.getItem("tjmPortraitOk")==="1"&&document.body.classList.add("portraitok")}catch{}["touchstart","touchend","mousedown"].forEach(a=>t.addEventListener(a,s=>s.stopPropagation())),t.addEventListener("click",a=>{a.stopPropagation(),document.body.classList.add("portraitok");try{sessionStorage.setItem("tjmPortraitOk","1")}catch{}}),e.appendChild(t);const n=document.createElement("small");n.className="rl",n.textContent="Phone will not turn? Rotation lock may be on. Portrait starts by itself in a moment.",e.appendChild(n),setTimeout(()=>document.body.classList.add("portraitok"),3e3)}}function OA(){try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch{}}addEventListener("touchend",yc,{once:!1,passive:!0});Un.addEventListener("click",yc);let ke=null,rn=null,St=null;const wc=["THROW","SCAN","GRAB"],Td=[Rh.hudName,"BUY SCANNER",ts.name];let se=0,hs=0,Zi=0;const Le=new q,hi=new Vs,gr=new js(60,ic/oc,.01,10);hi.add(new rl(16769216,3153944,1.2));const xc=new Mh(16756848,2);xc.position.set(1,2,1);hi.add(xc);const Po=e=>new Fn({color:e,flatShading:!0}),vn=[new Ut,new Ut,new Ut];Ph(vn[2]);Fh(vn[0]),vn[0].userData.thermos=1;{const e=vn[1];Yt(.09,.07,.3,Po(2500652),0,0,-.05,e),Yt(.06,.15,.07,Po(1710878),0,-.1,.07,e),Yt(.12,.09,.05,Po(3356219),0,.005,-.22,e),Yt(.07,.035,.012,new xt({color:16722458}),0,.005,-.25,e),Yt(.05,.025,.004,new xt({color:3866490}),0,.04,-.02,e);const t=new X(new Ae(.006,.006,6),new xt({color:16719888,transparent:!0,opacity:.55,blending:bn,depthWrite:!1}));t.position.set(0,.005,-3.25),e.add(t),e.userData.beam=t}vn.forEach(e=>{e.scale.setScalar(.7),e.rotation.y=.1,hi.add(e)});ge.autoClear=!1;function Qc(){vn.forEach((n,a)=>n.visible=a===se);const e=vn[se],t=Math.sin(performance.now()/160)*Math.min(1,Le.length())*.015;e.position.set(.24+t,-.24-Math.abs(t)+hs*.03,-.62+hs*.08),e.rotation.x=hs*.25,se===0&&(e.rotation.x=0,e.rotation.z=0,Uh(e,Zi/ll)),se===1&&e.userData.beam&&(zs=Math.max(0,zs-.03),e.userData.beam.material.opacity=.4+.15*Math.random()+zs*.45,e.userData.beam.material.color.setHex(zs>.3?4259696:16719888)),se===2&&(e.rotation.x=0,e.rotation.z=0,Jh(e,performance.now()/1e3,!!(ke&&ke.held),ke?ke.kick:0)),rn&&rn.pose(e,se)}function qn(e){se=e;{const t=document.getElementById("tfire"),n=document.getElementById("tlaunch");t&&(t.textContent=e===2&&ke&&ke.held?"HANG":wc[e]),n&&(n.hidden=e!==2)}document.querySelectorAll("#hud .wpn").forEach(t=>t.classList.toggle("on",+t.dataset.w===e)),Qc()}qn(0);const vc=document.getElementById("msg");let bc=0;function ae(e,t=2.5){vc.textContent=e,bc=t}ke=Oh({scene:Ft,camera:R,paintings:Re,say:ae,isMuted:()=>!!$e.muted,walkable:Bn,roomAt:Ca,gallery:"splat",volume:.5});qn(se);ke.load();rn=eu({scene:Ft,camera:R,renderer:ge,vm:vn,vmScene:hi,setWeapon:qn,getWeapon:()=>se,say:ae,isMuted:()=>!!$e.muted,walkable:Bn,floorH:typeof qa=="function"?qa:null,roomAt:Ca,pillars:ii,paintings:Re,makeElf:ni,animateElf:Ln,exempt:typeof dn=="function"?dn:null,isLocked:()=>he.isLocked,isBusy:()=>!!(Ge||Te||window.__reading),ceiling:oi.apex,low:ea});wc.push(...rn.fireLabels);Td.push(...rn.names);St=nu({camera:R,touchMove:Pa,isMuted:()=>!!$e.muted,walkable:Bn,animateElf:Ln,tools:()=>typeof rn<"u"?rn:null,floorY:()=>{try{return Pt}catch{return 0}},inRealm:()=>Ge,isCarried:()=>{let e=!1;try{e=!!Se}catch{}return!!(te&&te.locked||Te||e)},isBusy:()=>!!(te&&te.locked||Ge||Te||window.__reading),floorMaterial:window.FLOOR_MATERIAL||"stone"});St.setFloorMaterial((e,t,n)=>{const a=Math.hypot(e,t),s=oi.lifts[0];if(s&&n>s.hTop-1){const o=Math.atan2(s.z,s.x),r=e*Math.cos(o)+t*Math.sin(o),A=Math.abs(-e*Math.sin(o)+t*Math.cos(o));if(r>9.3&&r<ed(s.hTop)+.45&&A<.75)return"metal"}const i=Ca(e,t,n);return i&&i.id!=="central"?"wood":a<21&&i&&i.id==="central"?n>.15?"concrete":"marble":"stone"});const Tn=new Ir;function _d(){return R.updateMatrixWorld(),Tn.setFromCamera(new kt(0,0),R),Tn.intersectObjects(qr(),!1)[0]}function Hr(){if(!Ge){if(rn&&rn.owns(se)){rn.down(se);return}if(!(te&&te.locked)){if(se===2){ke&&ke.primary();return}hs=1,se===0&&(Zi=ll),se===0?zd():Yd()}}}const Ui=[],On=[];new ve(.08,6,4);new xt({color:16742912});const Rd=Gh();function zd(){const e=new q;R.getWorldDirection(e);const t=Rd.clone();t.rotation.set(Math.random()*6,Math.random()*6,0),Nh(()=>$e.muted),t.position.copy(R.position).addScaledVector(e,.3).y-=.03,Ft.add(t),Ui.push({m:t,v:e.multiplyScalar(14),life:3})}let Sc=0,te=null;const Rs=new Set,Fd=(()=>{const e=new Vt(.9,1.125);return e.translate(0,-.11249999999999999,0),e})();function Nd(e){const t=e.object.userData.p;Lh(()=>$e.muted);const n=new xt({map:qh(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),a=new X(Fd,n),s=t.group.worldToLocal(e.point.clone());a.position.set(s.x,s.y,.024),a.scale.x=Math.random()<.5?-1:1,a.renderOrder=5,n.alphaTest=.02,t.group.add(a),dn(a);const i=[],o=2+(Math.random()<.5?1:0);for(let A=0;A<o;A++){const l=ni(Math.random()),h=["L","R","T"][A],c=t.w/2,u=t.h/2,d=h==="L"?new q(-c+.05,s.y,.05):h==="R"?new q(c-.05,s.y,.05):new q(s.x,u-.05,.05),p=h==="L"?new q(-c-.2,s.y,.35):h==="R"?new q(c+.2,s.y,.35):new q(s.x,u+.2,.35);Object.assign(l.userData,{a:A*2.1,base:s.clone(),hide:d,peek:p}),l.position.copy(d),l.visible=!1,t.group.add(l),i.push(l)}Eu(t.data.slug),Rs.add(t.data.slug),Sc++,document.getElementById("hitn").textContent=Rs.size%3;const r={d:a,elves:i,group:t.group,t:0,dur:8};Rs.size>=3&&(Rs.clear(),document.getElementById("hitn").textContent=0,r.swarm=!0,r.dur=1e9,i.forEach(A=>A.visible=!1)),On.push(r),ae(r.swarm?"SPLAT! ...SOMETHING STIRS BEHIND THE WALLS":"SPLAT!")}const Kn=[],fr=document.getElementById("cart"),Ld=document.getElementById("cartlist");let VA=0;function po(e=4e3){fr.classList.add("open"),clearTimeout(VA),VA=setTimeout(()=>fr.classList.remove("open"),e)}function Jr(){document.getElementById("cartn").textContent=Kn.length,Ld.innerHTML=Kn.length?Kn.map(e=>`<li><a href="${e.url}" target="_blank" rel="noopener">${e.title}</a> · <i>In cart</i></li>`).join(""):"<li>empty</li>"}const Js=[],Ud=(()=>{const e=document.createElement("canvas");e.width=256,e.height=72;const t=e.getContext("2d");t.fillStyle="#12301c",t.fillRect(0,0,256,72),t.strokeStyle="#3aff7a",t.lineWidth=5,t.strokeRect(3,3,250,66),t.fillStyle="#c8ffd8",t.font="bold 34px Arial, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("✓ Add to cart",128,38);const n=new Be(e);return n.colorSpace=Ce,n})();let Ho=null;function dr(e){if(!$e.muted)try{Ho=Ho||new(window.AudioContext||window.webkitAudioContext);const t=Ho,n=t.currentTime;(e?[[1568,0],[2093,.09]]:[[330,0]]).forEach(([a,s])=>{const i=t.createOscillator(),o=t.createGain();i.type=e?"sine":"triangle",i.frequency.value=a,o.gain.setValueAtTime(1e-4,n+s),o.gain.linearRampToValueAtTime(.035,n+s+.01),o.gain.exponentialRampToValueAtTime(5e-4,n+s+.12),i.connect(o).connect(t.destination),i.start(n+s),i.stop(n+s+.14)})}catch{}}function Gd(e){const t=e.frame.material;e.frame.material=new xt({color:2883434}),dn(e.frame);const n=new X(new Vt(.5,.14),new xt({map:Ud,transparent:!0,depthWrite:!1}));n.position.set(0,e.h/2+.16,.04),e.group.add(n),dn(n),dr(!0),zs=1,setTimeout(()=>{e.frame.material.dispose(),e.frame.material=t,e.group.remove(n),n.geometry.dispose(),n.material.dispose()},1600)}let zs=0;function Yd(){const e=_d();if(!e)return ae("AIM AT A PAINTING");const t=e.object.userData.p;if(t.data.status==="sold")return dr(!1),ae("SOLD: "+t.data.title);if(t.data.status!=="available")return dr(!1),ae("BY INQUIRY ONLY: "+t.data.title);Gd(t),t.state="scanned",setTimeout(()=>{const n=t.group.position.clone(),a=t.group.rotation.y;window.eggs&&window.eggs.takePainting&&window.eggs.takePainting(t,()=>Js.push({p:t,t:99,from:n,rot:a}))||(t.state="lifting",Js.push({p:t,t:0,from:n,rot:a}))},650),Kn.push(t.data),Jr(),po(),ae("ADDED TO CART: "+t.data.title)}const qd=2.2;function Mc(e){R.updateMatrixWorld(),Tn.setFromCamera(e||new kt(0,0),R),Tn.far=qd;const t=Tn.intersectObjects([...qr(),...Yr],!1)[0];if(Tn.far=1/0,!t)return e||ae("GET CLOSER TO A PAINTING, THEN PRESS E"),!1;const n=t.object.userData.p?t.object.userData.p.data:t.object.userData.q;return Pd(n),!0}function Pd(e){Ur(),ae("OPENING "+e.title.toUpperCase()),he.isLocked&&he.unlock();const t=new URL(e.url);t.searchParams.set("from","play"),top.location.assign(t.href)}let Fs=null;xn.addEventListener("touchstart",e=>{const t=e.changedTouches[0];Fs={x:t.clientX,y:t.clientY,t:performance.now()}},{passive:!0});xn.addEventListener("touchend",e=>{const t=e.changedTouches[0];if(!Fs||te||Ge||Te||window.__reading||Math.hypot(t.clientX-Fs.x,t.clientY-Fs.y)>12||performance.now()-Fs.t>350)return;const n=xn.getBoundingClientRect(),a=new kt((t.clientX-n.left)/n.width*2-1,-((t.clientY-n.top)/n.height)*2+1);ci.tryOpen(a)||Mc(new kt((t.clientX-n.left)/n.width*2-1,-((t.clientY-n.top)/n.height)*2+1))},{passive:!0});const as=document.getElementById("goto");as.innerHTML='<option value="">Go to a painting…</option>'+[Wi,...Ve].map(e=>`<optgroup label="${UA(e.title)}">`+Re.filter(t=>t.room===e.id).map(t=>`<option value="${t.i}">${UA(t.data.title)}</option>`).join("")+"</optgroup>").join("");["click","mousedown","touchstart"].forEach(e=>as.addEventListener(e,t=>t.stopPropagation()));{const e=document.createElement("a");e.id="homebtn",e.href="https://tjm.art/",e.setAttribute("aria-label","Back to the tjm.art homepage"),e.title="Back to tjm.art",e.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z"/></svg><span>Home</span>',document.body.appendChild(e);const t=n=>{n.stopPropagation(),n.preventDefault(),window.__wentHome=!0;try{Ur()}catch{}top.location.href="https://tjm.art/"};[e,document.getElementById("homelink")].forEach(n=>{n&&(n.addEventListener("click",t),["mousedown","pointerdown","mouseup","pointerup","touchstart","touchend"].forEach(a=>n.addEventListener(a,s=>s.stopPropagation(),{passive:!0})))})}function kc(e){const t=Re[e];if(!t||t.state!=="wall")return;const n=new q(t.data.ix,0,t.data.iz),a=Math.max(1.8,Math.min(4,t.h*1.3+.8));R.position.copy(t.group.position).addScaledVector(n,a),Pt=Na(R.position.x,R.position.z,t.group.position.y-1.7),R.position.y=Ie+Pt,R.lookAt(t.group.position.x,Math.min(t.group.position.y,Pt+Ie+.4),t.group.position.z);const s=new fn(0,0,0,"YXZ").setFromQuaternion(R.quaternion);s.z=0,R.quaternion.setFromEuler(s),Le.set(0,0,0),ms(),ae(t.data.title.toUpperCase())}as.addEventListener("change",()=>{as.value!==""&&(kc(+as.value),as.value="",matchMedia("(pointer:coarse)").matches?Un.style.display="none":he.lock())});new q;const fe=(e,t,n)=>new q(e,t,n),In=(e,t,n)=>e.clone().lerp(t,Math.min(1,Math.max(0,n))),hn=e=>(e=Math.min(1,Math.max(0,e)),e*e*(3-2*e));function pr(e){On.forEach(i=>i.inSwarm=!0);const t=[],n=Ca(R.position.x,R.position.z);(()=>{const i=new fn(0,0,0,"YXZ").setFromQuaternion(R.quaternion).y,o=-Math.sin(i),r=-Math.cos(i),A=R.position,l=Re.filter(u=>u.state==="wall"&&u.room===n.id).sort((u,d)=>u.dist-d.dist),h=u=>{const d=u.group.position.x-A.x,p=u.group.position.z-A.z,m=Math.hypot(d,p)||1;return m<10&&(d*o+p*r)/m>.5},c=l.filter(u=>!h(u));return(c.length>=3?c:[...c,...l.filter(h)]).slice(0,8)})().forEach(i=>{i.group.visible=!0;for(let o=0;o<4;o++){const r=i.w/2,A=i.h/2,l=o%3,h=(Math.random()-.5)*i.h*.8,c=(Math.random()-.5)*i.w*.8,u=i.group.localToWorld(l===2?fe(c,A-.05,.05):fe(l?r-.05:-r+.05,h,.05)),d=i.group.localToWorld(l===2?fe(c,A+.3,.45):fe(l?r+.28:-r-.28,h,.45)),p=ni(Math.random());p.position.copy(u),Ft.add(p);const m=Math.random()*Math.PI*2,f=.7+Math.random()*.7;t.push({s:p,home:u,peek:d,a:m,rad:f,dy:-.55-Math.random()*.5,ph:Math.random()*6,j:o})}});const s=n.id==="central"?Pt>.3?fe(R.position.x,0,R.position.z):fe(nn.x,0,nn.z):fe((n.minX+n.maxX)/2,0,(n.minZ+n.maxZ)/2);te={fromH:Pt,destH:Pt>.3?Pt:0,t:0,elves:t,locked:!1,chase:!0,drag:!!e,ct:0,trail:[],trailT:0,from:R.position.clone(),dest:s,landed:!1,shake:0},ae("THE ELVES HAVE OPINIONS",6)}const Za=2;function Hd(e){const t=te;t.ct+=e;const n=t.ct,a=R.position;t.trailT-=e,t.trailT<=0&&(t.trailT=.25,t.trail.push(fe(a.x,0,a.z)),t.trail.length>16&&t.trail.shift());const s=new fn(0,0,0,"YXZ").setFromQuaternion(R.quaternion).y,i=fe(-Math.sin(s),0,-Math.cos(s));let o=1e9;if(t.elves.forEach((r,A)=>{if(n<Za){const B=hn((n-A%3*.25)/(Za-.5));r.s.position.copy(In(r.home,r.peek,B)),r.s.position.y+=Math.sin(n*9+A)*.04*(1-B),r.s.scale.setScalar(Math.max(.05,Math.min(1,n/(Za*.8)))),Ln(r.s,"peek",n,R,e),r.cp=r.s.position.clone();return}if(St){o=Math.min(o,St.chase.step(r,t,n-(Za-1),e));return}const l=a.x+Math.cos(r.a+s)*r.rad*1.6,h=a.z+Math.sin(r.a+s)*r.rad*1.6,c=Math.hypot(l-r.cp.x,h-r.cp.z)||1,u=Math.hypot(a.x-r.cp.x,a.z-r.cp.z),d=7+(n-1)*1.2+Math.max(0,u-3)*1.5,p=Math.min(1,d*e/c),m=r.cp.x+(l-r.cp.x)*p,f=r.cp.z+(h-r.cp.z)*p;if(Bn(m,f)||u<1.6?(r.cp.x=m,r.cp.z=f,r.stuck=0):r.stuck=(r.stuck||0)+e,r.stuck>.25||u>14){const B=t.trail[Math.max(0,t.trail.length-6)]||fe(a.x,0,a.z),E=B.x-a.x,I=B.z-a.z;(E*i.x+I*i.z<0||r.stuck>1.2)&&(r.cp.x=B.x+(Math.random()-.5)*.4,r.cp.z=B.z+(Math.random()-.5)*.4,r.stuck=0)}r.cp.y=Pt+.35+Math.abs(Math.sin(n*8+r.ph))*.2,r.s.position.copy(r.cp),r.s.scale.setScalar(1),Ln(r.s,"walk",n,R,e),o=Math.min(o,Math.hypot(a.x-r.cp.x,a.z-r.cp.z))}),n>Za&&(o<1||(St?St.chase.forceCatch(n-(Za-1)):n>13))){St&&St.chase.end(t);const r=Ca(a.x,a.z);if(t.fromH=Pt,t.destH=Pt>.3?Pt:0,r&&(t.dest=r.id==="central"?Pt>.3?fe(a.x,0,a.z):fe(nn.x,0,nn.z):fe((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)),t.drag){t.chase=!1,t.caughtAt=n,t.locked=!0,he.enabled=!1,Le.set(0,0,0),Jd(t),St&&St.hold&&St.hold.begin(t,"drag"),ae("THEY HAVE YOUR ANKLES",3);return}t.chase=!1,t.caughtAt=n,t.t=2.2,t.from=a.clone(),t.locked=!0,he.enabled=!1,Le.set(0,0,0),ae("CAUGHT!",2),St&&St.hold&&St.hold.begin(t,"carry")}}function jA(e,t){let a=1e9,s=-1e9,i=1e9,o=-1e9;[Wi,...Ve].forEach(S=>{a=Math.min(a,S.minX),s=Math.max(s,S.maxX),i=Math.min(i,S.minZ),o=Math.max(o,S.maxZ)}),a-=12,i-=12,s+=12,o+=12;const r=Math.ceil((s-a)/.5),A=Math.ceil((o-i)/.5),l=S=>a+(S+.5)*.5,h=S=>i+(S+.5)*.5,c=(S,F)=>{for(const[j,w]of[[0,0],[.4,0],[-.4,0],[0,.4],[0,-.4]])if(!Bn(S+j,F+w,0))return!0;for(const[j,w]of ii)if(Math.abs(S-j)<.95&&Math.abs(F-w)<.95)return!0;for(const j of zr)if(Math.abs(S-j.x)<1.9&&Math.abs(F-j.z)<1.9)return!0;return Math.abs(S-nn.x)<2.8&&Math.abs(F-nn.z)<2.8},u=new Uint8Array(r*A);for(let S=0;S<A;S++)for(let F=0;F<r;F++)u[S*r+F]=c(l(F),h(S))?0:1;const d=S=>[Math.max(0,Math.min(r-1,Math.floor((S.x-a)/.5))),Math.max(0,Math.min(A-1,Math.floor((S.z-i)/.5)))],p=([S,F])=>{let j=null,w=1e9;for(let _=-6;_<=6;_++)for(let tt=-6;tt<=6;tt++){const G=S+tt,et=F+_;if(G<0||et<0||G>=r||et>=A||!u[et*r+G])continue;const Y=tt*tt+_*_;Y<w&&(w=Y,j=[G,et])}return j},m=p(d(e)),f=p(d(t));if(!m||!f)return[e.clone(),t.clone()];const B=new Int32Array(r*A).fill(-1),E=[m[1]*r+m[0]];B[E[0]]=E[0];const I=f[1]*r+f[0];for(let S=0;S<E.length&&B[I]<0;S++){const F=E[S],j=F%r,w=F/r|0;for(const[_,tt]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const G=j+_,et=w+tt;if(G<0||et<0||G>=r||et>=A)continue;const Y=et*r+G;!u[Y]||B[Y]>=0||_&&tt&&(!u[w*r+G]||!u[et*r+j])||(B[Y]=F,E.push(Y))}}if(B[I]<0)return[e.clone(),t.clone()];const y=[];for(let S=I;y.push(fe(l(S%r),0,h(S/r|0))),S!==B[S];S=B[S]);y.reverse();const Q=(S,F)=>{const j=Math.ceil(S.distanceTo(F)/.2);for(let w=1;w<j;w++){const _=In(S,F,w/j),tt=d(_);if(!u[tt[1]*r+tt[0]])return!1}return!0},k=[fe(e.x,0,e.z)];let b=0;for(;b<y.length-1;){let S=y.length-1;for(;S>b+1&&!Q(y[b],y[S]);)S--;k.push(y[S]),b=S}return k.push(fe(t.x,0,t.z)),k}function Jd(e){const t=bt.pos.clone().addScaledVector(bt.n,1.4);t.y=0,e.dragH=Pt,Pt=0;const n=R.position,a=Math.hypot(n.x,n.z),i=e.dragH>.3&&a>8.5?[fe(n.x,0,n.z),...jA(fe(n.x*8.5/a,0,n.z*8.5/a),t)]:jA(R.position,t);let o=0;const r=[0];for(let A=1;A<i.length;A++)o+=i[A].distanceTo(i[A-1]),r.push(o);e.dragging={path:i,cum:r,len:o,t:0,dur:St&&St.hold?St.hold.dragDur(o):Math.min(5.2,Math.max(3,o/4)),throwT:-1,yaw:new fn(0,0,0,"YXZ").setFromQuaternion(R.quaternion).y},window.__dragPath={n:i.length,len:+o.toFixed(1),dur:e.dragging.dur}}const Od=(e,t)=>{const n=t*e.len;let a=1;for(;a<e.cum.length-1&&e.cum[a]<n;)a++;const s=e.path[a-1],i=e.path[a],o=e.cum[a]-e.cum[a-1]||1;return{p:In(s,i,(n-e.cum[a-1])/o),dir:i.clone().sub(s).normalize()}};function Vd(){const e=bt.pos.clone().addScaledVector(bt.n,1.6);e.y=Ie,Pt=0;const t=R.clone();t.position.copy(e),t.lookAt(e.x+bt.n.x,Ie,e.z+bt.n.z),he.enabled=!1,Le.set(0,0,0),Te=null,mo=!1,Ge=!0,document.body.classList.add("chaos"),ae("INTO THE HYPERSPACE REALM",3),Dn.start({direct:!0,worldLen:11,savedPos:e,savedQuat:t.quaternion.clone()}),Gr++,window.__thrownDirect=(window.__thrownDirect||0)+1}function jd(e){const t=te,n=t.dragging;n.t+=e;const a=n.t;if(n.pt=(n.pt||0)+(n.throwT<0&&St&&St.hold?St.hold.factor(t,e,(n.pt||0)<n.dur):1)*e,n.pt<n.dur){const o=hn(n.pt/n.dur)*.9+n.pt/n.dur*.1,{p:r,dir:A}=Od(n,Math.min(1,o));let h=Math.atan2(-A.x,-A.z)-n.yaw;h=Math.atan2(Math.sin(h),Math.cos(h)),n.yaw+=h*Math.min(1,e*6),Bn(r.x,r.z)||(n.off=(n.off||0)+1),R.position.set(r.x+(Math.random()-.5)*.02,.55+(t.dragH||0)*Math.max(0,1-2.5*a/n.dur)+Math.abs(Math.sin(a*11))*.05,r.z+(Math.random()-.5)*.02),R.quaternion.setFromEuler(new fn(-.18,n.yaw,Math.sin(a*5)*.05,"YXZ"));const c=fe(-Math.sin(n.yaw),0,-Math.cos(n.yaw)),u=fe(c.z*-1,0,c.x);t.elves.forEach((d,p)=>{const m=t.elves.length,f=p/m;let B;if(p%3!==2){const E=Math.floor(p/6),I=p%6-2.5;B=c.clone().multiplyScalar(1.1+E*.45).addScaledVector(u,I*.32)}else{const E=p%2?1:-1;B=c.clone().multiplyScalar(-.3+f*3%1.5).addScaledVector(u,E*(.9+p%5*.15))}d.s.position.set(R.position.x+B.x,R.position.y-.2+Math.abs(Math.sin(a*9+d.ph))*.18,R.position.z+B.z),d.s.scale.setScalar(1),St&&St.hold&&St.hold.apply(t,d,a,e)||Ln(d.s,p%3!==2?"carry":"walk",a,R,e)}),xn.style.filter=n.len/n.dur>9?`blur(${Math.min(3,(n.len/n.dur-9)*.25*Math.sin(Math.PI*n.pt/n.dur)).toFixed(2)}px)`:"",ae("THEY HAVE YOUR ANKLES",.3);return}n.throwT<0&&(xn.style.filter="",n.throwT=0,n.from=R.position.clone(),uo(),ae("WHEEEEE",1.5)),n.throwT+=e;const s=Math.min(1,n.throwT/.8),i=bt.pos.clone();i.y=1.3,R.position.copy(In(n.from,i,hn(s))),R.position.y=n.from.y+(1.3-n.from.y)*s+Math.sin(s*Math.PI)*1.1,R.quaternion.setFromEuler(new fn(-.3+s*6.3,Math.atan2(bt.n.x,bt.n.z),s*4.5,"YXZ")),t.elves.forEach((o,r)=>{Ln(o.s,"idle",a,R,e),o.s.position.y=.35+Math.abs(Math.sin(a*14+r))*.4}),s>=1&&(St&&St.hold&&St.hold.end(t),t.elves.forEach(o=>Ft.remove(o.s)),te=null,Ia=0,window.__dragDone=(window.__dragDone||0)+1,window.__dragLog={gameSecs:+(t.caughtAt+n.t).toFixed(2),dragSecs:+n.t.toFixed(2),offMesh:n.off||0},Vd())}function Wd(e){if(te.dragging)return jd(e);const t=te;t.t+=e*(St&&St.hold?St.hold.factor(t,e,t.t>2.2&&t.t<6):1);const n=t.t,a=new fn(0,0,0,"YXZ").setFromQuaternion(R.quaternion),s=t.fromH||0,i=t.destH||0,o=Ie+s+hn((n-2.2)/.8)*1.5+(i-s)*hn((n-3)/3),r=hn((n-3)/3),A=In(fe(t.from.x,0,t.from.z),t.dest,r);let l=o,h=0;if(n>2.2&&n<6&&(l+=Math.sin(n*7)*.12,h=Math.sin(n*3.3)*.12),n>=6){const d=n-6,p=Ie+i;Pt=i,l=Math.max(p,i+3.2-4.9*d*d*1.4),l<=p&&!t.landed&&(t.landed=!0,t.shake=.45,ae("*THUD*"))}t.landed&&(t.shake=Math.max(0,t.shake-e));const c=t.shake*.35;R.position.set(A.x+(Math.random()-.5)*c,l-(t.landed&&t.shake>.3?.15:0)+(Math.random()-.5)*c,A.z+(Math.random()-.5)*c),n>2.2&&n<6&&(a.x+=(-.7-a.x)*Math.min(1,e*2)),n>6.4&&(a.x+=(0-a.x)*Math.min(1,e*4)),n>8.5&&(a.x=0),a.z=h,R.quaternion.setFromEuler(a);const u=a.y;t.elves.forEach((d,p)=>{const m=fe(Math.cos(d.a+u)*d.rad,d.dy+Math.sin(n*9+d.ph)*.08,Math.sin(d.a+u)*d.rad),f=R.position.clone().add(m),B=fe(R.position.x+m.x*1.6,(t.destH||0)*Math.min(1,Math.max(0,n-3)/3)+(t.fromH||0)*(1-Math.min(1,Math.max(0,n-3)/3))+.35+Math.abs(Math.sin(n*8+d.ph))*.2,R.position.z+m.z*1.6);let E;n<1?E=In(d.home,d.peek,hn(n-p%3*.1)):n<2.2?E=In(d.peek,B,hn((n-1)/1.2)):n<2.8?E=In(B,f,hn((n-2.2)/.6)):n<6?E=f:n<6.6?E=B:n<8.2?E=In(B,d.peek,hn((n-6.6)/1.6)):E=In(d.peek,d.home,hn((n-8.2)/.8)),n>=6&&n<6.6&&(d.s.userData.g=d.s.userData.g||E.clone()),d.s.position.copy(n>=6&&n<6.6?d.s.userData.g:E),n>=6.6&&n<8.2&&d.s.position.copy(In(d.s.userData.g||B,d.peek,hn((n-6.6)/1.6))),d.s.scale.setScalar(Math.max(.05,Math.min(1,n/.9,(9-n)/.8))),St&&St.hold&&St.hold.apply(t,d,n,e)||Ln(d.s,n<1?"peek":n<2.2?"walk":n<6?"carry":n<6.6?"idle":"retreat",n,R,e)}),n>7.2&&t.locked&&(t.locked=!1,he.enabled=!0,ae("CONTROL RESTORED. BEHAVE.")),n>9&&(St&&St.hold&&St.hold.end(t),t.elves.forEach(d=>Ft.remove(d.s)),te=null,Ia++,R.position.y=Ie+qa(R.position.x,R.position.z),a.x=0,a.z=0,R.quaternion.setFromEuler(a))}let Jo=performance.now(),Ia=0,mo=!1,Ge=!1,Dc=null;const Dn=du({scene:Ft,camera:R,renderer:ge,makeElf:ni,animateElf:Ln,elfUniforms:os,say:ae,canvas:xn,floorY:qa});function Tc(){mo=!1,Ge=!0,he.enabled=!1,Dn.start(),document.body.classList.add("chaos")}new URLSearchParams(location.search).get("chaos")==="1"&&setTimeout(()=>{window.__test=1,Un.style.display="none",R.position.set(0,Ie+qa(0,0),0),Tc()},800);const _c=matchMedia("(orientation: portrait) and (pointer: coarse)");function Rc(){if(requestAnimationFrame(Rc),window.__paused=_c.matches&&!document.body.classList.contains("portraitok"),window.__paused){Jo=performance.now();return}const e=performance.now(),t=Math.min(.05,(e-Jo)/1e3);if(Jo=e,St&&St.update(t),rn&&rn.update(t,se),ke&&(ke.update(t,se===2),se===2)){const a=document.getElementById("tfire"),s=ke.held?"HANG":"GRAB";a&&a.textContent!==s&&(a.textContent=s)}if(mo&&!te&&Tc(),Ge){ge.toneMapping!==eA&&(ge.toneMapping=eA);const a=Dn.update(t,e);a&&a.finished&&(Pt=Na(R.position.x,R.position.z,R.position.y-Ie),Ge=!1,he.enabled=!0,document.body.classList.remove("chaos"),Dc={before:a.savedPos.toArray(),after:R.position.toArray()}),os.uTime.value=e/1e3,lA(e),Dn.state&&Dn.state.inWorld&&!Dn.state.back||ge.clear(),Dn.render()||ge.render(Ft,R),window.__frames=(window.__frames||0)+1;return}if(Te&&Id(t),!(window.game&&window.game.freeze||window.__reading)){if(!Te)if(te&&!te.chase)Wd(t);else{te&&te.chase&&Hd(t),Le.x-=Le.x*10*t,Le.z-=Le.z*10*t;const a=(ha.KeyW||ha.ArrowUp?1:0)-(ha.KeyS||ha.ArrowDown?1:0)-Pa.y,s=(ha.KeyD?1:0)-(ha.KeyA?1:0)+Pa.x;{const o=St?St.speedMul(s,a):1;Le.z+=Math.max(-1,Math.min(1,a))*60*o*t,Le.x+=Math.max(-1,Math.min(1,s))*60*o*t}const i=R.position.clone();he.moveRight(Le.x*t),he.moveForward(Le.z*t),Bn(R.position.x,R.position.z)||(Bn(R.position.x,i.z)?R.position.z=i.z:Bn(i.x,R.position.z)?R.position.x=i.x:(R.position.x=i.x,R.position.z=i.z));for(const[o,r]of ii){const A=R.position.x-o,l=R.position.z-r,h=Math.hypot(A,l);h<.75&&h>0&&(R.position.x=o+A/h*.75,R.position.z=r+l/h*.75)}Bn(R.position.x,R.position.z)||(R.position.x=i.x,R.position.z=i.z),Se||(Pt=qa(R.position.x,R.position.z));{const o=R.position.x-bt.pos.x,r=R.position.z-bt.pos.z,A=Math.abs(o*bt.n.z-r*bt.n.x),l=o*bt.n.x+r*bt.n.z;A<.7&&l<.62&&!Ge&&md()}{const o=R.position.x-Zt.pos.x,r=R.position.z-Zt.pos.z,A=Math.abs(o*Zt.n.z-r*Zt.n.x),l=o*Zt.n.x+r*Zt.n.z;A<.7&&l<.62&&!Ge&&hc()}{const o=R.position.x-le.pos.x,r=R.position.z-le.pos.z,A=Math.abs(o*le.n.z-r*le.n.x),l=o*le.n.x+r*le.n.z;Qn.uniforms.uTime.value=performance.now()/1e3+3,A<(le.fill?le.fill.w/2:.75*le.s)&&l<.62&&!Ge&&cc()}!Te&&!Se&&(R.position.y=Ie+qa(R.position.x,R.position.z)+(St?St.bob():Math.abs(Math.sin(e/120))*Math.min(.06,Le.length()*.02)))}}if(ci.update(t),$e.update(t,e,Ca(R.position.x,R.position.z).id),!te&&!Te)for(const a of go){const s=R.position.x-a.x,i=R.position.z-a.z,o=Math.hypot(s,i);o<.6&&o>0&&(R.position.x=a.x+s/o*.6,R.position.z=a.z+i/o*.6)}Ba.done||(Ba.n++,Ba.t+=t,Ba.t>6&&(Ba.done=!0,Ba.n/Ba.t<24&&$e.setLowStill(!0)));for(let a=Ui.length-1;a>=0;a--){const s=Ui[a];s.v.y-=.8*t,s.life-=t;const i=s.v.clone().multiplyScalar(t);Tn.set(s.m.position,i.clone().normalize()),Tn.far=i.length();const o=Tn.intersectObjects(qr(),!1)[0];s.m.position.add(i);const r=s.m.position.x,A=s.m.position.z,l=s.m.position.y,h=Math.hypot(r,A)<nd()+.6,u=!(h||[...Ve,...ho].some(d=>r>d.minX-.6&&r<d.maxX+.6&&A>d.minZ-.6&&A<d.maxZ+.6))||l<0||l>(h?oi.apex:gn);o&&Nd(o),(o||u||s.life<0)&&(Ft.remove(s.m),Ui.splice(a,1))}Tn.far=1/0;for(let a=On.length-1;a>=0;a--){const s=On[a];s.t+=t;const i=s.t/s.dur;if(s.swarm&&s.t>=3&&!te&&!Ge)if(Ia>=2){Ia=0,On.forEach(A=>{A.group.remove(A.d,...A.elves)}),On.length=0,pr(!0);break}else pr();if(s.swarm||s.inSwarm){if(s.elves.forEach(A=>A.visible=!1),s.inSwarm){const A=Math.min(1,Math.max(0,(te?te.t:99)-2.5)/3);s.d.material.opacity=1-A,A>=1&&(s.group.remove(s.d,...s.elves),On.splice(a,1))}continue}s.said;const o=s.t,r=Math.min(1,Math.max(0,(o-4.4)/2.2));s.d.material.opacity=1-r;{const A=o<.18?.55+.45*Math.sin(o/.18*1.5708)*1.06:1,l=A*(1-r*.4);s.d.scale.set(Math.sign(s.d.scale.x)*l,l,1)}o>3&&!s.said&&(s.said=1,ae("MACHINE ELVES DEPLOYED: SCRUBBING...")),s.elves.forEach((A,l)=>{const h=A.userData;A.visible=o>3;const c=h.base.clone().add(new q(Math.cos(h.a+o*1.5)*.28,Math.sin(h.a+o*1.1)*.12-.15,.3)),u=(d,p,m)=>d.clone().lerp(p,Math.min(1,Math.max(0,m)));o<3.8?A.position.copy(u(h.hide,h.peek,(o-3)/.8)):o<4.4?A.position.copy(u(h.peek,c,(o-3.8)/.6)).setZ(.25):o<6.6?A.position.copy(c):o<7.2?A.position.copy(u(c,h.peek,(o-6.6)/.6)).setZ(.25):A.position.copy(u(h.peek,h.hide,(o-7.2)/.8)),A.scale.setScalar(Math.max(.05,Math.min(1,(o-3)/.8,(8-o)/.8))),Ln(A,o<3.8?"peek":o<4.4?"walk":o<6.6?"scrub":"retreat",o,R,t)}),i>=1&&(s.group.remove(s.d,...s.elves),On.splice(a,1))}for(let a=Js.length-1;a>=0;a--){const s=Js[a];s.t+=t;const i=s.p.group,o=Math.min(1,s.t/2.2);i.position.copy(s.from),i.rotation.y=s.rot,i.translateZ(o*1.2),i.position.y=s.from.y+Math.sin(o*Math.PI)*.4+o*o*1.5,i.rotation.y=s.rot+o*Math.PI*2,i.scale.setScalar(1-o*.85),o>=1&&(i.visible=!1,s.p.state="cart",Js.splice(a,1))}hs=Math.max(0,hs-t*5),Zi=Math.max(0,Zi-Math.min(t,.05)),Qc(),(bc-=t)<0&&(vc.textContent=""),(HA-=t)<0&&(HA=.25,ms()),Xi.forEach(a=>{a.userData.t&&(a.intensity=fc)}),rc.offset.x=e/8e3%1,ri.uniforms.uTime.value=e/1e3,Ai.uniforms.uTime.value=e/1e3+7,Zt.light.intensity=14+3*Math.sin(e/300),bt.light.intensity=14+4*Math.sin(e/90)*Math.sin(e/37);{const a=.88+.12*Math.sin(e/420)+(Math.sin(e/53)>.985?-.25:0);bt.sign.material.color.setScalar(a)}Xd(t),co.forEach((a,s)=>a.intensity=(_e?22:12)*(.85+.15*Math.sin(e/600+s*2))),os.uTime.value=e/1e3,lA(e);const n=te?Math.min(1,te.t/1.5)*(te.t<8?1:Math.max(0,9-te.t)):0;os.uPulse.value=n,xn.style.filter=n>.01?`saturate(${1+n*(.6+.4*Math.sin(e/180))}) hue-rotate(${n*25*Math.sin(e/400)}deg) drop-shadow(${2*n}px 0 rgba(255,0,90,.45)) drop-shadow(${-2*n}px 0 rgba(0,255,220,.45))`:"",xn.style.transform=n>.01?`scale(${1+.012*n*Math.sin(e/230)}) skewX(${n*.8*Math.sin(e/310)}deg)`:"",ge.toneMapping!==Xo&&(ge.toneMapping=Xo),Is.render(),ge.setRenderTarget(null),ge.clearDepth(),window.__reading||ge.render(hi,gr),Kd(e),tp(e,Un.style.display==="none"&&!document.hidden),window.__frames=(window.__frames||0)+1}let Se=null,bs=0;function Xd(e){bs=Math.max(0,bs-e);const t=R.position;if(!Se&&!Ge&&!Te&&!te&&bs===0)for(const h of oi.lifts){if(Pt<.3&&Math.hypot(t.x-h.x,t.z-h.z)<.75){Se={l:h,up:!0,t0:performance.now()},ae("GLASS LIFT · UP TO THE TOP OF THE RAMP",3);break}if(Math.abs(Pt-h.hTop)<1&&Math.hypot(t.x-h.call.x,t.z-h.call.z)<.55){Se={l:h,up:!1,t0:performance.now(),from:t.clone()},ae("GLASS LIFT · DOWN TO THE ROTUNDA FLOOR",3);break}}if(!Se)return;const n=Se.l,a=(performance.now()-Se.t0)/1e3,s=9,i=.9,o=h=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,h)));Le.set(0,0,0);let r,A=n.x,l=n.z;if(Se.up){if(r=n.hTop*o(a/s),a>s){const h=o((a-s)/i);A=n.x+(n.top.x-n.x)*h,l=n.z+(n.top.z-n.z)*h}if(a>s+i){t.x=n.top.x,t.z=n.top.z,Pt=n.hTop,t.y=Ie+Pt,n.cab.position.y=n.hTop,Se=null,bs=3,ae("TOP OF THE RAMP · WALK DOWN THROUGH THE SPIRAL",4);return}}else{if(a<i){const h=o(a/i);A=Se.from.x+(n.x-Se.from.x)*h,l=Se.from.z+(n.z-Se.from.z)*h,r=n.hTop}else r=n.hTop*(1-o((a-i)/s));if(a>s+i){const h=-n.x/Math.hypot(n.x,n.z)*1.3,c=-n.z/Math.hypot(n.x,n.z)*1.3;t.x=n.x+h,t.z=n.z+c,Pt=0,t.y=Ie,n.cab.position.y=0,Se=null,bs=3;return}}n.cab.position.y=r,t.x=A,t.z=l,t.y=Ie+r,Pt=r}const Is=_f(ge,Ft,R);let Oo=0,Vo=0,zc=0;function Kd(e){Oo++,e-Vo>1e3&&(zc=Oo*1e3/(e-Vo),Oo=0,Vo=e)}function Fc(){R.aspect=innerWidth/innerHeight,R.updateProjectionMatrix(),gr.aspect=R.aspect,gr.updateProjectionMatrix(),Is.setSize()}addEventListener("resize",Fc);Fc();const ss=document.getElementById("qcell"),Nc={high:"HQ",medium:"MQ",low:"LQ"};ss&&(ss.textContent=Nc[da],ss.title="Graphics quality: "+da+" (tap to switch: low → medium → high)",ss.addEventListener("click",e=>{e.stopPropagation(),Sf(bf(da))}));let Os=da;const Lc=()=>[...Xi,...co].filter(e=>e.castShadow);function Zd(){Lc().forEach(e=>{if(co.includes(e)){e.castShadow=!1;return}e.shadow.map&&e.shadow.map.dispose(),e.shadow.map=null,e.shadow.mapSize.set(256,256),e.shadow.radius=1,e.shadow.needsUpdate=!0})}function WA(){Lc().forEach(e=>e.castShadow=!1),ge.shadowMap.enabled=!1,Ft.traverse(e=>{e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(t=>t.needsUpdate=!0)})}function jo(){ge.getPixelRatio()>1&&(ge.setPixelRatio(1),Is.setSize())}const $d=_e?[()=>{Is.stepDown&&Is.stepDown(),$s.forEach(e=>e.visible=!0),Zd(),Os="medium"},()=>{jo(),WA(),Os="low"}]:Ga?[()=>jo(),()=>{WA(),Os="low"}]:[()=>jo()],tp=Ff($d,(e,t)=>{ss&&(ss.textContent=Nc[Os]+"·auto"),window.__autoSteps=e});setTimeout(()=>co.forEach(e=>{e.castShadow&&(e.shadow.needsUpdate=!0)}),3e3);ge.domElement.addEventListener("webglcontextlost",e=>{e.preventDefault(),window.__glLost=1,window.__playFallback&&window.__playFallback("lost")});Rc();Jr();window.game={get move(){return St},get weapon(){return se},get tools(){return rn},startSwarm:e=>pr(e),get grav(){return ke},THREE:kh,holo:$e,books:ci,splatLog:Bu,get fps(){return zc},tier:da,get autoLevel(){return Os},get autoSteps(){return window.__autoSteps||0},get pipelineLevel(){return Is.level},ceilings:ji,ROOMS:Ve,walkable:Bn,roomAt:Ca,get nPaintings(){return Re.length},get chaosActive(){return Ge},get chaosT(){return Dn.state?Dn.state.t:-1},get lastChaos(){return Dc},get swarmCount(){return Ia},setSwarmCount:e=>{Ia=e},renderer:ge,camera:R,makeElf:ni,animateElf:Ln,scene:Ft,splats:On,get swarm(){return te},get hits(){return Sc},get distinct(){return Rs.size},setWeapon:qn,fire:Hr,paintings:Re,goTo:kc,get pausedPortrait(){return _c.matches},CHK:Zt,showCart:po,get cartOpen(){return fr.classList.contains("open")},windowSpots:Lr,PIT:Ts,GATE:bt,get gateTrips(){return Gr},get riding(){return Se?+Se.l.cab.position.y.toFixed(1):-1},get curH(){return Pt},floorCands:Fr,floorNear:Na,GG:ac,NAVE:oi,get falling(){return!!Te},LABELS:GA,boards:Yr,get shownLabels(){return GA.filter(e=>e.shown).length},lookAt:(e,t=3.5)=>{const n=Re[e].group,a=new q(0,0,1).applyQuaternion(n.quaternion);R.position.copy(n.position).addScaledVector(a,t),Pt=Na(R.position.x,R.position.z,n.position.y-1.7),R.position.y=Ie+Pt,R.lookAt(n.position.x,n.position.y,n.position.z),ms()},view:(e,t,n,a,s=0,i)=>{Pt=Na(e,t,s),R.position.set(e,Ie+Pt,t),R.lookAt(n,i===void 0?Ie+Pt:i,a),ms()},hideStart:()=>{window.__test=1,Un.style.display="none"}};window.game.addPainting=e=>Cc(e,Re.length);window.game.base=sc;window.game.removePainting=e=>{const t=Re.indexOf(e);t>=0&&Re.splice(t,1),e.group.removeFromParent(),e.state="gone"};if(new URLSearchParams(location.search).get("resume")==="1")try{const e=JSON.parse(sessionStorage.getItem("tjmPlayState")||"null");e&&(R.position.fromArray(e.pos),Pt=Na(R.position.x,R.position.z,R.position.y-Ie),R.quaternion.fromArray(e.quat),qn(1),Ia=e.swarmCount||0,(e.cart||[]).forEach(t=>{const n=Re.find(a=>a.data.slug===t);n&&n.state==="wall"&&(n.state="cart",n.group.visible=!1,Kn.push(n.data))}),Jr(),ms(),Un.querySelector("p").textContent="TAP / CLICK TO RESUME",window.__resumed=e)}catch{}qn(1);window.__museumCart={count:()=>Kn.length,go:()=>hc(),get leaving(){return lr}};
