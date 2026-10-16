(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const so="170",yh=0,il=1,Sh=2,xc=1,Eh=2,Si=3,Ki=0,Ie=1,ui=2,Zi=0,qn=1,Aa=2,nl=3,al=4,Th=5,un=100,Ah=101,Rh=102,Ch=103,Ph=104,Lh=200,Dh=201,Ih=202,Uh=203,ps=204,ms=205,kh=206,zh=207,Nh=208,Fh=209,Oh=210,Bh=211,Hh=212,Vh=213,Gh=214,gs=0,vs=1,_s=2,Kn=3,xs=4,ws=5,bs=6,Ms=7,oo=0,Wh=1,jh=2,Ji=0,Xh=1,qh=2,Yh=3,$h=4,Zh=5,Jh=6,Kh=7,wc=300,Qn=301,ta=302,ys=303,Ss=304,br=306,Ra=1e3,mi=1001,Es=1002,Fe=1003,Qh=1004,Ha=1005,Je=1006,Dr=1007,Ri=1008,Ui=1009,bc=1010,Mc=1011,Ca=1012,lo=1013,_n=1014,Ci=1015,Da=1016,co=1017,ho=1018,ea=1020,yc=35902,Sc=1021,Ec=1022,oi=1023,Tc=1024,Ac=1025,Yn=1026,ia=1027,Rc=1028,fo=1029,Cc=1030,uo=1031,po=1033,cr=33776,hr=33777,dr=33778,fr=33779,Ts=35840,As=35841,Rs=35842,Cs=35843,Ps=36196,Ls=37492,Ds=37496,Is=37808,Us=37809,ks=37810,zs=37811,Ns=37812,Fs=37813,Os=37814,Bs=37815,Hs=37816,Vs=37817,Gs=37818,Ws=37819,js=37820,Xs=37821,ur=36492,qs=36494,Ys=36495,Pc=36283,$s=36284,Zs=36285,Js=36286,td=3200,ed=3201,Lc=0,id=1,Yi="",we="srgb",sa="srgb-linear",Mr="linear",Qt="srgb",An=7680,rl=519,nd=512,ad=513,rd=514,Dc=515,sd=516,od=517,ld=518,cd=519,sl=35044,ol="300 es",Pi=2e3,_r=2001;class yn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const a=this._listeners[t];if(a!==void 0){const r=a.indexOf(e);r!==-1&&a.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const a=n.slice(0);for(let r=0,s=a.length;r<s;r++)a[r].call(this,t);t.target=null}}}const ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ir=Math.PI/180,xr=180/Math.PI;function Ia(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ye[i&255]+ye[i>>8&255]+ye[i>>16&255]+ye[i>>24&255]+"-"+ye[t&255]+ye[t>>8&255]+"-"+ye[t>>16&15|64]+ye[t>>24&255]+"-"+ye[e&63|128]+ye[e>>8&255]+"-"+ye[e>>16&255]+ye[e>>24&255]+ye[n&255]+ye[n>>8&255]+ye[n>>16&255]+ye[n>>24&255]).toLowerCase()}function ze(i,t,e){return Math.max(t,Math.min(e,i))}function hd(i,t){return(i%t+t)%t}function Ur(i,t,e){return(1-e)*i+e*t}function fa(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ke(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Nt{constructor(t=0,e=0){Nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,a=t.elements;return this.x=a[0]*e+a[3]*n+a[6],this.y=a[1]*e+a[4]*n+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ze(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),a=Math.sin(e),r=this.x-t.x,s=this.y-t.y;return this.x=r*n-s*a+t.x,this.y=r*a+s*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Dt{constructor(t,e,n,a,r,s,o,l,c){Dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,a,r,s,o,l,c)}set(t,e,n,a,r,s,o,l,c){const h=this.elements;return h[0]=t,h[1]=a,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,a=e.elements,r=this.elements,s=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],m=n[5],g=n[8],w=a[0],p=a[3],u=a[6],y=a[1],S=a[4],b=a[7],k=a[2],A=a[5],T=a[8];return r[0]=s*w+o*y+l*k,r[3]=s*p+o*S+l*A,r[6]=s*u+o*b+l*T,r[1]=c*w+h*y+d*k,r[4]=c*p+h*S+d*A,r[7]=c*u+h*b+d*T,r[2]=f*w+m*y+g*k,r[5]=f*p+m*S+g*A,r[8]=f*u+m*b+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*s*h-e*o*c-n*r*h+n*o*l+a*r*c-a*s*l}invert(){const t=this.elements,e=t[0],n=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*s-o*c,f=o*l-h*r,m=c*r-s*l,g=e*d+n*f+a*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/g;return t[0]=d*w,t[1]=(a*c-h*n)*w,t[2]=(o*n-a*s)*w,t[3]=f*w,t[4]=(h*e-a*l)*w,t[5]=(a*r-o*e)*w,t[6]=m*w,t[7]=(n*l-c*e)*w,t[8]=(s*e-n*r)*w,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,a,r,s,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*s+c*o)+s+t,-a*c,a*l,-a*(-c*s+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(kr.makeScale(t,e)),this}rotate(t){return this.premultiply(kr.makeRotation(-t)),this}translate(t,e){return this.premultiply(kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let a=0;a<9;a++)if(e[a]!==n[a])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const kr=new Dt;function Ic(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Pa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function dd(){const i=Pa("canvas");return i.style.display="block",i}const ll={};function ba(i){i in ll||(ll[i]=!0,console.warn(i))}function fd(i,t,e){return new Promise(function(n,a){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:a();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function ud(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function pd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Wt={enabled:!0,workingColorSpace:sa,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Qt&&(i.r=Ii(i.r),i.g=Ii(i.g),i.b=Ii(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Qt&&(i.r=$n(i.r),i.g=$n(i.g),i.b=$n(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Yi?Mr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $n(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const cl=[.64,.33,.3,.6,.15,.06],hl=[.2126,.7152,.0722],dl=[.3127,.329],fl=new Dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ul=new Dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Wt.define({[sa]:{primaries:cl,whitePoint:dl,transfer:Mr,toXYZ:fl,fromXYZ:ul,luminanceCoefficients:hl,workingColorSpaceConfig:{unpackColorSpace:we},outputColorSpaceConfig:{drawingBufferColorSpace:we}},[we]:{primaries:cl,whitePoint:dl,transfer:Qt,toXYZ:fl,fromXYZ:ul,luminanceCoefficients:hl,outputColorSpaceConfig:{drawingBufferColorSpace:we}}});let Rn;class md{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Rn===void 0&&(Rn=Pa("canvas")),Rn.width=t.width,Rn.height=t.height;const n=Rn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Rn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Pa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const a=n.getImageData(0,0,t.width,t.height),r=a.data;for(let s=0;s<r.length;s++)r[s]=Ii(r[s]/255)*255;return n.putImageData(a,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ii(e[n]/255)*255):e[n]=Ii(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gd=0;class Uc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=Ia(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?r.push(zr(a[s].image)):r.push(zr(a[s]))}else r=zr(a);n.url=r}return e||(t.images[this.uuid]=n),n}}function zr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?md.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vd=0;class Re extends yn{constructor(t=Re.DEFAULT_IMAGE,e=Re.DEFAULT_MAPPING,n=mi,a=mi,r=Je,s=Ri,o=oi,l=Ui,c=Re.DEFAULT_ANISOTROPY,h=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=Ia(),this.name="",this.source=new Uc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=a,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Nt(0,0),this.repeat=new Nt(1,1),this.center=new Nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ra:t.x=t.x-Math.floor(t.x);break;case mi:t.x=t.x<0?0:1;break;case Es:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ra:t.y=t.y-Math.floor(t.y);break;case mi:t.y=t.y<0?0:1;break;case Es:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Re.DEFAULT_IMAGE=null;Re.DEFAULT_MAPPING=wc;Re.DEFAULT_ANISOTROPY=1;class te{constructor(t=0,e=0,n=0,a=1){te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,a){return this.x=t,this.y=e,this.z=n,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,a=this.z,r=this.w,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*a+s[12]*r,this.y=s[1]*e+s[5]*n+s[9]*a+s[13]*r,this.z=s[2]*e+s[6]*n+s[10]*a+s[14]*r,this.w=s[3]*e+s[7]*n+s[11]*a+s[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,a,r;const l=t.elements,c=l[0],h=l[4],d=l[8],f=l[1],m=l[5],g=l[9],w=l[2],p=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-w)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+w)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,b=(m+1)/2,k=(u+1)/2,A=(h+f)/4,T=(d+w)/4,C=(g+p)/4;return S>b&&S>k?S<.01?(n=0,a=.707106781,r=.707106781):(n=Math.sqrt(S),a=A/n,r=T/n):b>k?b<.01?(n=.707106781,a=0,r=.707106781):(a=Math.sqrt(b),n=A/a,r=C/a):k<.01?(n=.707106781,a=.707106781,r=0):(r=Math.sqrt(k),n=T/r,a=C/r),this.set(n,a,r,e),this}let y=Math.sqrt((p-g)*(p-g)+(d-w)*(d-w)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(d-w)/y,this.z=(f-h)/y,this.w=Math.acos((c+m+u-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _d extends yn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);const a={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Re(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const s=n.count;for(let o=0;o<s;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=t,this.textures[a].image.height=e,this.textures[a].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Uc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xn extends _d{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class kc extends Re{constructor(t=null,e=1,n=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:a},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class xd extends Re{constructor(t=null,e=1,n=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:a},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ua{constructor(t=0,e=0,n=0,a=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=a}static slerpFlat(t,e,n,a,r,s,o){let l=n[a+0],c=n[a+1],h=n[a+2],d=n[a+3];const f=r[s+0],m=r[s+1],g=r[s+2],w=r[s+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=w;return}if(d!==w||l!==f||c!==m||h!==g){let p=1-o;const u=l*f+c*m+h*g+d*w,y=u>=0?1:-1,S=1-u*u;if(S>Number.EPSILON){const k=Math.sqrt(S),A=Math.atan2(k,u*y);p=Math.sin(p*A)/k,o=Math.sin(o*A)/k}const b=o*y;if(l=l*p+f*b,c=c*p+m*b,h=h*p+g*b,d=d*p+w*b,p===1-o){const k=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=k,c*=k,h*=k,d*=k}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,a,r,s){const o=n[a],l=n[a+1],c=n[a+2],h=n[a+3],d=r[s],f=r[s+1],m=r[s+2],g=r[s+3];return t[e]=o*g+h*d+l*m-c*f,t[e+1]=l*g+h*f+c*d-o*m,t[e+2]=c*g+h*m+o*f-l*d,t[e+3]=h*g-o*d-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,a){return this._x=t,this._y=e,this._z=n,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,a=t._y,r=t._z,s=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(a/2),d=o(r/2),f=l(n/2),m=l(a/2),g=l(r/2);switch(s){case"XYZ":this._x=f*h*d+c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d-f*m*g;break;case"YXZ":this._x=f*h*d+c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d+f*m*g;break;case"ZXY":this._x=f*h*d-c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d-f*m*g;break;case"ZYX":this._x=f*h*d-c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d+f*m*g;break;case"YZX":this._x=f*h*d+c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d-f*m*g;break;case"XZY":this._x=f*h*d-c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,a=Math.sin(n);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],a=e[4],r=e[8],s=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],f=n+o+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(s-a)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(a+s)/m,this._z=(r+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(r-c)/m,this._x=(a+s)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(s-a)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ze(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const a=Math.min(1,e/n);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,a=t._y,r=t._z,s=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+s*o+a*c-r*l,this._y=a*h+s*l+r*o-n*c,this._z=r*h+s*c+n*l-a*o,this._w=s*h-n*o-a*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,a=this._y,r=this._z,s=this._w;let o=s*t._w+n*t._x+a*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=s,this._x=n,this._y=a,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*s+e*this._w,this._x=m*n+e*this._x,this._y=m*a+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=s*d+this._w*f,this._x=n*d+this._x*f,this._y=a*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),a=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(a*Math.sin(t),a*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(pl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(pl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,a=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*a,this.y=r[1]*e+r[4]*n+r[7]*a,this.z=r[2]*e+r[5]*n+r[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,a=this.z,r=t.elements,s=1/(r[3]*e+r[7]*n+r[11]*a+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*a+r[12])*s,this.y=(r[1]*e+r[5]*n+r[9]*a+r[13])*s,this.z=(r[2]*e+r[6]*n+r[10]*a+r[14])*s,this}applyQuaternion(t){const e=this.x,n=this.y,a=this.z,r=t.x,s=t.y,o=t.z,l=t.w,c=2*(s*a-o*n),h=2*(o*e-r*a),d=2*(r*n-s*e);return this.x=e+l*c+s*d-o*h,this.y=n+l*h+o*c-r*d,this.z=a+l*d+r*h-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,a=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*a,this.y=r[1]*e+r[5]*n+r[9]*a,this.z=r[2]*e+r[6]*n+r[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,a=t.y,r=t.z,s=e.x,o=e.y,l=e.z;return this.x=a*l-r*o,this.y=r*s-n*l,this.z=n*o-a*s,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Nr.copy(this).projectOnVector(t),this.sub(Nr)}reflect(t){return this.sub(Nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ze(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,a=this.z-t.z;return e*e+n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const a=Math.sin(e)*t;return this.x=a*Math.sin(n),this.y=Math.cos(e)*t,this.z=a*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=a,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Nr=new P,pl=new Ua;class ka{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ii.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ii.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ii.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let s=0,o=r.count;s<o;s++)t.isMesh===!0?t.getVertexPosition(s,ii):ii.fromBufferAttribute(r,s),ii.applyMatrix4(t.matrixWorld),this.expandByPoint(ii);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Va.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Va.copy(n.boundingBox)),Va.applyMatrix4(t.matrixWorld),this.union(Va)}const a=t.children;for(let r=0,s=a.length;r<s;r++)this.expandByObject(a[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ii),ii.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ua),Ga.subVectors(this.max,ua),Cn.subVectors(t.a,ua),Pn.subVectors(t.b,ua),Ln.subVectors(t.c,ua),Oi.subVectors(Pn,Cn),Bi.subVectors(Ln,Pn),an.subVectors(Cn,Ln);let e=[0,-Oi.z,Oi.y,0,-Bi.z,Bi.y,0,-an.z,an.y,Oi.z,0,-Oi.x,Bi.z,0,-Bi.x,an.z,0,-an.x,-Oi.y,Oi.x,0,-Bi.y,Bi.x,0,-an.y,an.x,0];return!Fr(e,Cn,Pn,Ln,Ga)||(e=[1,0,0,0,1,0,0,0,1],!Fr(e,Cn,Pn,Ln,Ga))?!1:(Wa.crossVectors(Oi,Bi),e=[Wa.x,Wa.y,Wa.z],Fr(e,Cn,Pn,Ln,Ga))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ii).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ii).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const xi=[new P,new P,new P,new P,new P,new P,new P,new P],ii=new P,Va=new ka,Cn=new P,Pn=new P,Ln=new P,Oi=new P,Bi=new P,an=new P,ua=new P,Ga=new P,Wa=new P,rn=new P;function Fr(i,t,e,n,a){for(let r=0,s=i.length-3;r<=s;r+=3){rn.fromArray(i,r);const o=a.x*Math.abs(rn.x)+a.y*Math.abs(rn.y)+a.z*Math.abs(rn.z),l=t.dot(rn),c=e.dot(rn),h=n.dot(rn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const wd=new ka,pa=new P,Or=new P;class mo{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):wd.setFromPoints(t).getCenter(n);let a=0;for(let r=0,s=t.length;r<s;r++)a=Math.max(a,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;pa.subVectors(t,this.center);const e=pa.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),a=(n-this.radius)*.5;this.center.addScaledVector(pa,a/n),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Or.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(pa.copy(t.center).add(Or)),this.expandByPoint(pa.copy(t.center).sub(Or))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wi=new P,Br=new P,ja=new P,Hi=new P,Hr=new P,Xa=new P,Vr=new P;class zc{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=wi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(wi.copy(this.origin).addScaledVector(this.direction,e),wi.distanceToSquared(t))}distanceSqToSegment(t,e,n,a){Br.copy(t).add(e).multiplyScalar(.5),ja.copy(e).sub(t).normalize(),Hi.copy(this.origin).sub(Br);const r=t.distanceTo(e)*.5,s=-this.direction.dot(ja),o=Hi.dot(this.direction),l=-Hi.dot(ja),c=Hi.lengthSq(),h=Math.abs(1-s*s);let d,f,m,g;if(h>0)if(d=s*l-o,f=s*o-l,g=r*h,d>=0)if(f>=-g)if(f<=g){const w=1/h;d*=w,f*=w,m=d*(d+s*f+2*o)+f*(s*d+f+2*l)+c}else f=r,d=Math.max(0,-(s*f+o)),m=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(s*f+o)),m=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-s*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(d=Math.max(0,-(s*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+f*(f+2*l)+c);else f=s>0?-r:r,d=Math.max(0,-(s*f+o)),m=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(Br).addScaledVector(ja,f),m}intersectSphere(t,e){wi.subVectors(t.center,this.origin);const n=wi.dot(this.direction),a=wi.dot(wi)-n*n,r=t.radius*t.radius;if(a>r)return null;const s=Math.sqrt(r-a),o=n-s,l=n+s;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,a,r,s,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,a=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,a=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,s=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,s=(t.min.y-f.y)*h),n>s||r>a||((r>n||isNaN(n))&&(n=r),(s<a||isNaN(a))&&(a=s),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),n>l||o>a)||((o>n||n!==n)&&(n=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(n>=0?n:a,e)}intersectsBox(t){return this.intersectBox(t,wi)!==null}intersectTriangle(t,e,n,a,r){Hr.subVectors(e,t),Xa.subVectors(n,t),Vr.crossVectors(Hr,Xa);let s=this.direction.dot(Vr),o;if(s>0){if(a)return null;o=1}else if(s<0)o=-1,s=-s;else return null;Hi.subVectors(this.origin,t);const l=o*this.direction.dot(Xa.crossVectors(Hi,Xa));if(l<0)return null;const c=o*this.direction.dot(Hr.cross(Hi));if(c<0||l+c>s)return null;const h=-o*Hi.dot(Vr);return h<0?null:this.at(h/s,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le{constructor(t,e,n,a,r,s,o,l,c,h,d,f,m,g,w,p){le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,a,r,s,o,l,c,h,d,f,m,g,w,p)}set(t,e,n,a,r,s,o,l,c,h,d,f,m,g,w,p){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=a,u[1]=r,u[5]=s,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=m,u[7]=g,u[11]=w,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new le().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,a=1/Dn.setFromMatrixColumn(t,0).length(),r=1/Dn.setFromMatrixColumn(t,1).length(),s=1/Dn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*a,e[1]=n[1]*a,e[2]=n[2]*a,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*s,e[9]=n[9]*s,e[10]=n[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,a=t.y,r=t.z,s=Math.cos(n),o=Math.sin(n),l=Math.cos(a),c=Math.sin(a),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const f=s*h,m=s*d,g=o*h,w=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=f-w*c,e[9]=-o*l,e[2]=w-f*c,e[6]=g+m*c,e[10]=s*l}else if(t.order==="YXZ"){const f=l*h,m=l*d,g=c*h,w=c*d;e[0]=f+w*o,e[4]=g*o-m,e[8]=s*c,e[1]=s*d,e[5]=s*h,e[9]=-o,e[2]=m*o-g,e[6]=w+f*o,e[10]=s*l}else if(t.order==="ZXY"){const f=l*h,m=l*d,g=c*h,w=c*d;e[0]=f-w*o,e[4]=-s*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=s*h,e[9]=w-f*o,e[2]=-s*c,e[6]=o,e[10]=s*l}else if(t.order==="ZYX"){const f=s*h,m=s*d,g=o*h,w=o*d;e[0]=l*h,e[4]=g*c-m,e[8]=f*c+w,e[1]=l*d,e[5]=w*c+f,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=s*l}else if(t.order==="YZX"){const f=s*l,m=s*c,g=o*l,w=o*c;e[0]=l*h,e[4]=w-f*d,e[8]=g*d+m,e[1]=d,e[5]=s*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*d+g,e[10]=f-w*d}else if(t.order==="XZY"){const f=s*l,m=s*c,g=o*l,w=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=f*d+w,e[5]=s*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*h,e[10]=w*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bd,t,Md)}lookAt(t,e,n){const a=this.elements;return Be.subVectors(t,e),Be.lengthSq()===0&&(Be.z=1),Be.normalize(),Vi.crossVectors(n,Be),Vi.lengthSq()===0&&(Math.abs(n.z)===1?Be.x+=1e-4:Be.z+=1e-4,Be.normalize(),Vi.crossVectors(n,Be)),Vi.normalize(),qa.crossVectors(Be,Vi),a[0]=Vi.x,a[4]=qa.x,a[8]=Be.x,a[1]=Vi.y,a[5]=qa.y,a[9]=Be.y,a[2]=Vi.z,a[6]=qa.z,a[10]=Be.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,a=e.elements,r=this.elements,s=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],m=n[13],g=n[2],w=n[6],p=n[10],u=n[14],y=n[3],S=n[7],b=n[11],k=n[15],A=a[0],T=a[4],C=a[8],M=a[12],_=a[1],R=a[5],V=a[9],B=a[13],N=a[2],W=a[6],F=a[10],Y=a[14],G=a[3],$=a[7],it=a[11],rt=a[15];return r[0]=s*A+o*_+l*N+c*G,r[4]=s*T+o*R+l*W+c*$,r[8]=s*C+o*V+l*F+c*it,r[12]=s*M+o*B+l*Y+c*rt,r[1]=h*A+d*_+f*N+m*G,r[5]=h*T+d*R+f*W+m*$,r[9]=h*C+d*V+f*F+m*it,r[13]=h*M+d*B+f*Y+m*rt,r[2]=g*A+w*_+p*N+u*G,r[6]=g*T+w*R+p*W+u*$,r[10]=g*C+w*V+p*F+u*it,r[14]=g*M+w*B+p*Y+u*rt,r[3]=y*A+S*_+b*N+k*G,r[7]=y*T+S*R+b*W+k*$,r[11]=y*C+S*V+b*F+k*it,r[15]=y*M+S*B+b*Y+k*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],a=t[8],r=t[12],s=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],f=t[10],m=t[14],g=t[3],w=t[7],p=t[11],u=t[15];return g*(+r*l*d-a*c*d-r*o*f+n*c*f+a*o*m-n*l*m)+w*(+e*l*m-e*c*f+r*s*f-a*s*m+a*c*h-r*l*h)+p*(+e*c*d-e*o*m-r*s*d+n*s*m+r*o*h-n*c*h)+u*(-a*o*h-e*l*d+e*o*f+a*s*d-n*s*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=e,a[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],f=t[10],m=t[11],g=t[12],w=t[13],p=t[14],u=t[15],y=d*p*c-w*f*c+w*l*m-o*p*m-d*l*u+o*f*u,S=g*f*c-h*p*c-g*l*m+s*p*m+h*l*u-s*f*u,b=h*w*c-g*d*c+g*o*m-s*w*m-h*o*u+s*d*u,k=g*d*l-h*w*l-g*o*f+s*w*f+h*o*p-s*d*p,A=e*y+n*S+a*b+r*k;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return t[0]=y*T,t[1]=(w*f*r-d*p*r-w*a*m+n*p*m+d*a*u-n*f*u)*T,t[2]=(o*p*r-w*l*r+w*a*c-n*p*c-o*a*u+n*l*u)*T,t[3]=(d*l*r-o*f*r-d*a*c+n*f*c+o*a*m-n*l*m)*T,t[4]=S*T,t[5]=(h*p*r-g*f*r+g*a*m-e*p*m-h*a*u+e*f*u)*T,t[6]=(g*l*r-s*p*r-g*a*c+e*p*c+s*a*u-e*l*u)*T,t[7]=(s*f*r-h*l*r+h*a*c-e*f*c-s*a*m+e*l*m)*T,t[8]=b*T,t[9]=(g*d*r-h*w*r-g*n*m+e*w*m+h*n*u-e*d*u)*T,t[10]=(s*w*r-g*o*r+g*n*c-e*w*c-s*n*u+e*o*u)*T,t[11]=(h*o*r-s*d*r-h*n*c+e*d*c+s*n*m-e*o*m)*T,t[12]=k*T,t[13]=(h*w*a-g*d*a+g*n*f-e*w*f-h*n*p+e*d*p)*T,t[14]=(g*o*a-s*w*a-g*n*l+e*w*l+s*n*p-e*o*p)*T,t[15]=(s*d*a-h*o*a+h*n*l-e*d*l-s*n*f+e*o*f)*T,this}scale(t){const e=this.elements,n=t.x,a=t.y,r=t.z;return e[0]*=n,e[4]*=a,e[8]*=r,e[1]*=n,e[5]*=a,e[9]*=r,e[2]*=n,e[6]*=a,e[10]*=r,e[3]*=n,e[7]*=a,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,a))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),a=Math.sin(e),r=1-n,s=t.x,o=t.y,l=t.z,c=r*s,h=r*o;return this.set(c*s+n,c*o-a*l,c*l+a*o,0,c*o+a*l,h*o+n,h*l-a*s,0,c*l-a*o,h*l+a*s,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,a,r,s){return this.set(1,n,r,0,t,1,s,0,e,a,1,0,0,0,0,1),this}compose(t,e,n){const a=this.elements,r=e._x,s=e._y,o=e._z,l=e._w,c=r+r,h=s+s,d=o+o,f=r*c,m=r*h,g=r*d,w=s*h,p=s*d,u=o*d,y=l*c,S=l*h,b=l*d,k=n.x,A=n.y,T=n.z;return a[0]=(1-(w+u))*k,a[1]=(m+b)*k,a[2]=(g-S)*k,a[3]=0,a[4]=(m-b)*A,a[5]=(1-(f+u))*A,a[6]=(p+y)*A,a[7]=0,a[8]=(g+S)*T,a[9]=(p-y)*T,a[10]=(1-(f+w))*T,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,e,n){const a=this.elements;let r=Dn.set(a[0],a[1],a[2]).length();const s=Dn.set(a[4],a[5],a[6]).length(),o=Dn.set(a[8],a[9],a[10]).length();this.determinant()<0&&(r=-r),t.x=a[12],t.y=a[13],t.z=a[14],ni.copy(this);const c=1/r,h=1/s,d=1/o;return ni.elements[0]*=c,ni.elements[1]*=c,ni.elements[2]*=c,ni.elements[4]*=h,ni.elements[5]*=h,ni.elements[6]*=h,ni.elements[8]*=d,ni.elements[9]*=d,ni.elements[10]*=d,e.setFromRotationMatrix(ni),n.x=r,n.y=s,n.z=o,this}makePerspective(t,e,n,a,r,s,o=Pi){const l=this.elements,c=2*r/(e-t),h=2*r/(n-a),d=(e+t)/(e-t),f=(n+a)/(n-a);let m,g;if(o===Pi)m=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(o===_r)m=-s/(s-r),g=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,a,r,s,o=Pi){const l=this.elements,c=1/(e-t),h=1/(n-a),d=1/(s-r),f=(e+t)*c,m=(n+a)*h;let g,w;if(o===Pi)g=(s+r)*d,w=-2*d;else if(o===_r)g=r*d,w=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=w,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let a=0;a<16;a++)if(e[a]!==n[a])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Dn=new P,ni=new le,bd=new P(0,0,0),Md=new P(1,1,1),Vi=new P,qa=new P,Be=new P,ml=new le,gl=new Ua;class Pe{constructor(t=0,e=0,n=0,a=Pe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,a=this._order){return this._x=t,this._y=e,this._z=n,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const a=t.elements,r=a[0],s=a[4],o=a[8],l=a[1],c=a[5],h=a[9],d=a[2],f=a[6],m=a[10];switch(e){case"XYZ":this._y=Math.asin(ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ze(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ze(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ze(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ml.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ml,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return gl.setFromEuler(this),this.setFromQuaternion(gl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pe.DEFAULT_ORDER="XYZ";class go{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let yd=0;const vl=new P,In=new Ua,bi=new le,Ya=new P,ma=new P,Sd=new P,Ed=new Ua,_l=new P(1,0,0),xl=new P(0,1,0),wl=new P(0,0,1),bl={type:"added"},Td={type:"removed"},Un={type:"childadded",child:null},Gr={type:"childremoved",child:null};class me extends yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=Ia(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=me.DEFAULT_UP.clone();const t=new P,e=new Pe,n=new Ua,a=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function s(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new le},normalMatrix:{value:new Dt}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return In.setFromAxisAngle(t,e),this.quaternion.multiply(In),this}rotateOnWorldAxis(t,e){return In.setFromAxisAngle(t,e),this.quaternion.premultiply(In),this}rotateX(t){return this.rotateOnAxis(_l,t)}rotateY(t){return this.rotateOnAxis(xl,t)}rotateZ(t){return this.rotateOnAxis(wl,t)}translateOnAxis(t,e){return vl.copy(t).applyQuaternion(this.quaternion),this.position.add(vl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(_l,t)}translateY(t){return this.translateOnAxis(xl,t)}translateZ(t){return this.translateOnAxis(wl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ya.copy(t):Ya.set(t,e,n);const a=this.parent;this.updateWorldMatrix(!0,!1),ma.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(ma,Ya,this.up):bi.lookAt(Ya,ma,this.up),this.quaternion.setFromRotationMatrix(bi),a&&(bi.extractRotation(a.matrixWorld),In.setFromRotationMatrix(bi),this.quaternion.premultiply(In.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(bl),Un.child=t,this.dispatchEvent(Un),Un.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Td),Gr.child=t,this.dispatchEvent(Gr),Gr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(bl),Un.child=t,this.dispatchEvent(Un),Un.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,a=this.children.length;n<a;n++){const s=this.children[n].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ma,t,Sd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ma,Ed,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,a=e.length;n<a;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,a=e.length;n<a;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,a=e.length;n<a;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));a.material=o}else a.material=r(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(r(t.animations,l))}}if(e){const o=s(t.geometries),l=s(t.materials),c=s(t.textures),h=s(t.images),d=s(t.shapes),f=s(t.skeletons),m=s(t.animations),g=s(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=a,n;function s(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const a=t.children[n];this.add(a.clone())}return this}}me.DEFAULT_UP=new P(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ai=new P,Mi=new P,Wr=new P,yi=new P,kn=new P,zn=new P,Ml=new P,jr=new P,Xr=new P,qr=new P,Yr=new te,$r=new te,Zr=new te;class ri{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,a){a.subVectors(n,e),ai.subVectors(t,e),a.cross(ai);const r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(t,e,n,a,r){ai.subVectors(a,e),Mi.subVectors(n,e),Wr.subVectors(t,e);const s=ai.dot(ai),o=ai.dot(Mi),l=ai.dot(Wr),c=Mi.dot(Mi),h=Mi.dot(Wr),d=s*c-o*o;if(d===0)return r.set(0,0,0),null;const f=1/d,m=(c*l-o*h)*f,g=(s*h-o*l)*f;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,a){return this.getBarycoord(t,e,n,a,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(t,e,n,a,r,s,o,l){return this.getBarycoord(t,e,n,a,yi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,yi.x),l.addScaledVector(s,yi.y),l.addScaledVector(o,yi.z),l)}static getInterpolatedAttribute(t,e,n,a,r,s){return Yr.setScalar(0),$r.setScalar(0),Zr.setScalar(0),Yr.fromBufferAttribute(t,e),$r.fromBufferAttribute(t,n),Zr.fromBufferAttribute(t,a),s.setScalar(0),s.addScaledVector(Yr,r.x),s.addScaledVector($r,r.y),s.addScaledVector(Zr,r.z),s}static isFrontFacing(t,e,n,a){return ai.subVectors(n,e),Mi.subVectors(t,e),ai.cross(Mi).dot(a)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,a){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,e,n,a){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ai.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),ai.cross(Mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ri.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ri.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,a,r){return ri.getInterpolation(t,this.a,this.b,this.c,e,n,a,r)}containsPoint(t){return ri.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ri.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,a=this.b,r=this.c;let s,o;kn.subVectors(a,n),zn.subVectors(r,n),jr.subVectors(t,n);const l=kn.dot(jr),c=zn.dot(jr);if(l<=0&&c<=0)return e.copy(n);Xr.subVectors(t,a);const h=kn.dot(Xr),d=zn.dot(Xr);if(h>=0&&d<=h)return e.copy(a);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return s=l/(l-h),e.copy(n).addScaledVector(kn,s);qr.subVectors(t,r);const m=kn.dot(qr),g=zn.dot(qr);if(g>=0&&m<=g)return e.copy(r);const w=m*c-l*g;if(w<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(zn,o);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return Ml.subVectors(r,a),o=(d-h)/(d-h+(m-g)),e.copy(a).addScaledVector(Ml,o);const u=1/(p+w+f);return s=w*u,o=f*u,e.copy(n).addScaledVector(kn,s).addScaledVector(zn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Nc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},$a={h:0,s:0,l:0};function Jr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class It{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,a=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Wt.toWorkingColorSpace(this,a),this}setHSL(t,e,n,a=Wt.workingColorSpace){if(t=hd(t,1),e=ze(e,0,1),n=ze(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,s=2*n-r;this.r=Jr(s,r,t+1/3),this.g=Jr(s,r,t),this.b=Jr(s,r,t-1/3)}return Wt.toWorkingColorSpace(this,a),this}setStyle(t,e=we){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=a[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){const n=Nc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ii(t.r),this.g=Ii(t.g),this.b=Ii(t.b),this}copyLinearToSRGB(t){return this.r=$n(t.r),this.g=$n(t.g),this.b=$n(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return Wt.fromWorkingColorSpace(Se.copy(this),t),Math.round(ze(Se.r*255,0,255))*65536+Math.round(ze(Se.g*255,0,255))*256+Math.round(ze(Se.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.fromWorkingColorSpace(Se.copy(this),e);const n=Se.r,a=Se.g,r=Se.b,s=Math.max(n,a,r),o=Math.min(n,a,r);let l,c;const h=(o+s)/2;if(o===s)l=0,c=0;else{const d=s-o;switch(c=h<=.5?d/(s+o):d/(2-s-o),s){case n:l=(a-r)/d+(a<r?6:0);break;case a:l=(r-n)/d+2;break;case r:l=(n-a)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Wt.workingColorSpace){return Wt.fromWorkingColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=we){Wt.fromWorkingColorSpace(Se.copy(this),t);const e=Se.r,n=Se.g,a=Se.b;return t!==we?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(a*255)})`}offsetHSL(t,e,n){return this.getHSL(Gi),this.setHSL(Gi.h+t,Gi.s+e,Gi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Gi),t.getHSL($a);const n=Ur(Gi.h,$a.h,e),a=Ur(Gi.s,$a.s,e),r=Ur(Gi.l,$a.l,e);return this.setHSL(n,a,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,a=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*a,this.g=r[1]*e+r[4]*n+r[7]*a,this.b=r[2]*e+r[5]*n+r[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Se=new It;It.NAMES=Nc;let Ad=0;class za extends yn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=Ia(),this.name="",this.blending=qn,this.side=Ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ps,this.blendDst=ms,this.blendEquation=un,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Kn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=An,this.stencilZFail=An,this.stencilZPass=An,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const a=this[e];if(a===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(n):a&&a.isVector3&&n&&n.isVector3?a.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==qn&&(n.blending=this.blending),this.side!==Ki&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ps&&(n.blendSrc=this.blendSrc),this.blendDst!==ms&&(n.blendDst=this.blendDst),this.blendEquation!==un&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Kn&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==An&&(n.stencilFail=this.stencilFail),this.stencilZFail!==An&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==An&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function a(r){const s=[];for(const o in r){const l=r[o];delete l.metadata,s.push(l)}return s}if(e){const r=a(t.textures),s=a(t.images);r.length>0&&(n.textures=r),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const a=e.length;n=new Array(a);for(let r=0;r!==a;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class de extends za{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pe,this.combine=oo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pe=new P,Za=new Nt;class je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=sl,this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[t+a]=e.array[n+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Za.fromBufferAttribute(this,e),Za.applyMatrix3(t),this.setXY(e,Za.x,Za.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fa(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ke(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fa(e,this.array)),e}setX(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fa(e,this.array)),e}setY(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fa(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fa(e,this.array)),e}setW(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,a){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array),a=ke(a,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=a,this}setXYZW(t,e,n,a,r){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array),a=ke(a,this.array),r=ke(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=a,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==sl&&(t.usage=this.usage),t}}class Fc extends je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Oc extends je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class be extends je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Rd=0;const $e=new le,Kr=new me,Nn=new P,He=new ka,ga=new ka,_e=new P;class hi extends yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=Ia(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ic(t)?Oc:Fc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Dt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return $e.makeRotationFromQuaternion(t),this.applyMatrix4($e),this}rotateX(t){return $e.makeRotationX(t),this.applyMatrix4($e),this}rotateY(t){return $e.makeRotationY(t),this.applyMatrix4($e),this}rotateZ(t){return $e.makeRotationZ(t),this.applyMatrix4($e),this}translate(t,e,n){return $e.makeTranslation(t,e,n),this.applyMatrix4($e),this}scale(t,e,n){return $e.makeScale(t,e,n),this.applyMatrix4($e),this}lookAt(t){return Kr.lookAt(t),Kr.updateMatrix(),this.applyMatrix4(Kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Nn).negate(),this.translate(Nn.x,Nn.y,Nn.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let a=0,r=t.length;a<r;a++){const s=t[a];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new be(n,3))}else{for(let n=0,a=e.count;n<a;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ka);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,a=e.length;n<a;n++){const r=e[n];He.setFromBufferAttribute(r),this.morphTargetsRelative?(_e.addVectors(this.boundingBox.min,He.min),this.boundingBox.expandByPoint(_e),_e.addVectors(this.boundingBox.max,He.max),this.boundingBox.expandByPoint(_e)):(this.boundingBox.expandByPoint(He.min),this.boundingBox.expandByPoint(He.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(He.setFromBufferAttribute(t),e)for(let r=0,s=e.length;r<s;r++){const o=e[r];ga.setFromBufferAttribute(o),this.morphTargetsRelative?(_e.addVectors(He.min,ga.min),He.expandByPoint(_e),_e.addVectors(He.max,ga.max),He.expandByPoint(_e)):(He.expandByPoint(ga.min),He.expandByPoint(ga.max))}He.getCenter(n);let a=0;for(let r=0,s=t.count;r<s;r++)_e.fromBufferAttribute(t,r),a=Math.max(a,n.distanceToSquared(_e));if(e)for(let r=0,s=e.length;r<s;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)_e.fromBufferAttribute(o,c),l&&(Nn.fromBufferAttribute(t,c),_e.add(Nn)),a=Math.max(a,n.distanceToSquared(_e))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,a=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new P,l[C]=new P;const c=new P,h=new P,d=new P,f=new Nt,m=new Nt,g=new Nt,w=new P,p=new P;function u(C,M,_){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,_),f.fromBufferAttribute(r,C),m.fromBufferAttribute(r,M),g.fromBufferAttribute(r,_),h.sub(c),d.sub(c),m.sub(f),g.sub(f);const R=1/(m.x*g.y-g.x*m.y);isFinite(R)&&(w.copy(h).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(R),p.copy(d).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(R),o[C].add(w),o[M].add(w),o[_].add(w),l[C].add(p),l[M].add(p),l[_].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let C=0,M=y.length;C<M;++C){const _=y[C],R=_.start,V=_.count;for(let B=R,N=R+V;B<N;B+=3)u(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const S=new P,b=new P,k=new P,A=new P;function T(C){k.fromBufferAttribute(a,C),A.copy(k);const M=o[C];S.copy(M),S.sub(k.multiplyScalar(k.dot(M))).normalize(),b.crossVectors(A,M);const R=b.dot(l[C])<0?-1:1;s.setXYZW(C,S.x,S.y,S.z,R)}for(let C=0,M=y.length;C<M;++C){const _=y[C],R=_.start,V=_.count;for(let B=R,N=R+V;B<N;B+=3)T(t.getX(B+0)),T(t.getX(B+1)),T(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const a=new P,r=new P,s=new P,o=new P,l=new P,c=new P,h=new P,d=new P;if(t)for(let f=0,m=t.count;f<m;f+=3){const g=t.getX(f+0),w=t.getX(f+1),p=t.getX(f+2);a.fromBufferAttribute(e,g),r.fromBufferAttribute(e,w),s.fromBufferAttribute(e,p),h.subVectors(s,r),d.subVectors(a,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,w),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(w,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)a.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),s.fromBufferAttribute(e,f+2),h.subVectors(s,r),d.subVectors(a,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)_e.fromBufferAttribute(t,e),_e.normalize(),t.setXYZ(e,_e.x,_e.y,_e.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h);let m=0,g=0;for(let w=0,p=l.length;w<p;w++){o.isInterleavedBufferAttribute?m=l[w]*o.data.stride+o.offset:m=l[w]*h;for(let u=0;u<h;u++)f[g++]=c[m++]}return new je(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new hi,n=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const f=c[h],m=t(f,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const a={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(a[l]=h,r=!0)}r&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const a=t.attributes;for(const c in a){const h=a[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let f=0,m=d.length;f<m;f++)h.push(d[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const s=t.groups;for(let c=0,h=s.length;c<h;c++){const d=s[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yl=new le,sn=new zc,Ja=new mo,Sl=new P,Ka=new P,Qa=new P,tr=new P,Qr=new P,er=new P,El=new P,ir=new P;class Tt extends me{constructor(t=new hi,e=new de){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const a=e[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,a=n.attributes.position,r=n.morphAttributes.position,s=n.morphTargetsRelative;e.fromBufferAttribute(a,t);const o=this.morphTargetInfluences;if(r&&o){er.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Qr.fromBufferAttribute(d,t),s?er.addScaledVector(Qr,h):er.addScaledVector(Qr.sub(e),h))}e.add(er)}return e}raycast(t,e){const n=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(r),sn.copy(t.ray).recast(t.near),!(Ja.containsPoint(sn.origin)===!1&&(sn.intersectSphere(Ja,Sl)===null||sn.origin.distanceToSquared(Sl)>(t.far-t.near)**2))&&(yl.copy(r).invert(),sn.copy(t.ray).applyMatrix4(yl),!(n.boundingBox!==null&&sn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,sn)))}_computeIntersections(t,e,n){let a;const r=this.geometry,s=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,w=f.length;g<w;g++){const p=f[g],u=s[p.materialIndex],y=Math.max(p.start,m.start),S=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let b=y,k=S;b<k;b+=3){const A=o.getX(b),T=o.getX(b+1),C=o.getX(b+2);a=nr(this,u,t,n,c,h,d,A,T,C),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=p.materialIndex,e.push(a))}}else{const g=Math.max(0,m.start),w=Math.min(o.count,m.start+m.count);for(let p=g,u=w;p<u;p+=3){const y=o.getX(p),S=o.getX(p+1),b=o.getX(p+2);a=nr(this,s,t,n,c,h,d,y,S,b),a&&(a.faceIndex=Math.floor(p/3),e.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,w=f.length;g<w;g++){const p=f[g],u=s[p.materialIndex],y=Math.max(p.start,m.start),S=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let b=y,k=S;b<k;b+=3){const A=b,T=b+1,C=b+2;a=nr(this,u,t,n,c,h,d,A,T,C),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=p.materialIndex,e.push(a))}}else{const g=Math.max(0,m.start),w=Math.min(l.count,m.start+m.count);for(let p=g,u=w;p<u;p+=3){const y=p,S=p+1,b=p+2;a=nr(this,s,t,n,c,h,d,y,S,b),a&&(a.faceIndex=Math.floor(p/3),e.push(a))}}}}function Cd(i,t,e,n,a,r,s,o){let l;if(t.side===Ie?l=n.intersectTriangle(s,r,a,!0,o):l=n.intersectTriangle(a,r,s,t.side===Ki,o),l===null)return null;ir.copy(o),ir.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ir);return c<e.near||c>e.far?null:{distance:c,point:ir.clone(),object:i}}function nr(i,t,e,n,a,r,s,o,l,c){i.getVertexPosition(o,Ka),i.getVertexPosition(l,Qa),i.getVertexPosition(c,tr);const h=Cd(i,t,e,n,Ka,Qa,tr,El);if(h){const d=new P;ri.getBarycoord(El,Ka,Qa,tr,d),a&&(h.uv=ri.getInterpolatedAttribute(a,o,l,c,d,new Nt)),r&&(h.uv1=ri.getInterpolatedAttribute(r,o,l,c,d,new Nt)),s&&(h.normal=ri.getInterpolatedAttribute(s,o,l,c,d,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new P,materialIndex:0};ri.getNormal(Ka,Qa,tr,f.normal),h.face=f,h.barycoord=d}return h}class tn extends hi{constructor(t=1,e=1,n=1,a=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:a,heightSegments:r,depthSegments:s};const o=this;a=Math.floor(a),r=Math.floor(r),s=Math.floor(s);const l=[],c=[],h=[],d=[];let f=0,m=0;g("z","y","x",-1,-1,n,e,t,s,r,0),g("z","y","x",1,-1,n,e,-t,s,r,1),g("x","z","y",1,1,t,n,e,a,s,2),g("x","z","y",1,-1,t,n,-e,a,s,3),g("x","y","z",1,-1,t,e,n,a,r,4),g("x","y","z",-1,-1,t,e,-n,a,r,5),this.setIndex(l),this.setAttribute("position",new be(c,3)),this.setAttribute("normal",new be(h,3)),this.setAttribute("uv",new be(d,2));function g(w,p,u,y,S,b,k,A,T,C,M){const _=b/T,R=k/C,V=b/2,B=k/2,N=A/2,W=T+1,F=C+1;let Y=0,G=0;const $=new P;for(let it=0;it<F;it++){const rt=it*R-B;for(let gt=0;gt<W;gt++){const zt=gt*_-V;$[w]=zt*y,$[p]=rt*S,$[u]=N,c.push($.x,$.y,$.z),$[w]=0,$[p]=0,$[u]=A>0?1:-1,h.push($.x,$.y,$.z),d.push(gt/T),d.push(1-it/C),Y+=1}}for(let it=0;it<C;it++)for(let rt=0;rt<T;rt++){const gt=f+rt+W*it,zt=f+rt+W*(it+1),X=f+(rt+1)+W*(it+1),Q=f+(rt+1)+W*it;l.push(gt,zt,Q),l.push(zt,X,Q),G+=6}o.addGroup(m,G,M),m+=G,f+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function na(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const a=i[e][n];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=a.clone():Array.isArray(a)?t[e][n]=a.slice():t[e][n]=a}}return t}function Le(i){const t={};for(let e=0;e<i.length;e++){const n=na(i[e]);for(const a in n)t[a]=n[a]}return t}function Pd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Bc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}const Ld={clone:na,merge:Le};var Dd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Id=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qe extends za{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dd,this.fragmentShader=Id,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=na(t.uniforms),this.uniformsGroups=Pd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const a in this.uniforms){const s=this.uniforms[a].value;s&&s.isTexture?e.uniforms[a]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[a]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[a]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[a]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[a]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[a]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[a]={type:"m4",value:s.toArray()}:e.uniforms[a]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const a in this.extensions)this.extensions[a]===!0&&(n[a]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Hc extends me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=Pi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wi=new P,Tl=new Nt,Al=new Nt;class Te extends Hc{constructor(t=50,e=1,n=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=a,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=xr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ir*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xr*2*Math.atan(Math.tan(Ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z)}getViewSize(t,e){return this.getViewBounds(t,Tl,Al),e.subVectors(Al,Tl)}setViewOffset(t,e,n,a,r,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ir*.5*this.fov)/this.zoom,n=2*e,a=this.aspect*n,r=-.5*a;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;r+=s.offsetX*a/l,e-=s.offsetY*n/c,a*=s.width/l,n*=s.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Fn=-90,On=1;class Ud extends me{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Te(Fn,On,t,e);a.layers=this.layers,this.add(a);const r=new Te(Fn,On,t,e);r.layers=this.layers,this.add(r);const s=new Te(Fn,On,t,e);s.layers=this.layers,this.add(s);const o=new Te(Fn,On,t,e);o.layers=this.layers,this.add(o);const l=new Te(Fn,On,t,e);l.layers=this.layers,this.add(l);const c=new Te(Fn,On,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,a,r,s,o,l]=e;for(const c of e)this.remove(c);if(t===Pi)n.up.set(0,1,0),n.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_r)n.up.set(0,-1,0),n.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,s,o,l,c,h]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const w=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,a),t.render(e,r),t.setRenderTarget(n,1,a),t.render(e,s),t.setRenderTarget(n,2,a),t.render(e,o),t.setRenderTarget(n,3,a),t.render(e,l),t.setRenderTarget(n,4,a),t.render(e,c),n.texture.generateMipmaps=w,t.setRenderTarget(n,5,a),t.render(e,h),t.setRenderTarget(d,f,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Vc extends Re{constructor(t,e,n,a,r,s,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Qn,super(t,e,n,a,r,s,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class kd extends xn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},a=[n,n,n,n,n,n];this.texture=new Vc(a,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new tn(5,5,5),r=new Qe({name:"CubemapFromEquirect",uniforms:na(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ie,blending:Zi});r.uniforms.tEquirect.value=e;const s=new Tt(a,r),o=e.minFilter;return e.minFilter===Ri&&(e.minFilter=Je),new Ud(1,10,this).update(t,s),e.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(t,e,n,a){const r=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(e,n,a);t.setRenderTarget(r)}}const ts=new P,zd=new P,Nd=new Dt;class dn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,a){return this.normal.set(t,e,n),this.constant=a,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const a=ts.subVectors(n,e).cross(zd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ts),a=this.normal.dot(n);if(a===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Nd.getNormalMatrix(t),a=this.coplanarPoint(ts).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-a.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const on=new mo,ar=new P;class vo{constructor(t=new dn,e=new dn,n=new dn,a=new dn,r=new dn,s=new dn){this.planes=[t,e,n,a,r,s]}set(t,e,n,a,r,s){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(a),o[4].copy(r),o[5].copy(s),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Pi){const n=this.planes,a=t.elements,r=a[0],s=a[1],o=a[2],l=a[3],c=a[4],h=a[5],d=a[6],f=a[7],m=a[8],g=a[9],w=a[10],p=a[11],u=a[12],y=a[13],S=a[14],b=a[15];if(n[0].setComponents(l-r,f-c,p-m,b-u).normalize(),n[1].setComponents(l+r,f+c,p+m,b+u).normalize(),n[2].setComponents(l+s,f+h,p+g,b+y).normalize(),n[3].setComponents(l-s,f-h,p-g,b-y).normalize(),n[4].setComponents(l-o,f-d,p-w,b-S).normalize(),e===Pi)n[5].setComponents(l+o,f+d,p+w,b+S).normalize();else if(e===_r)n[5].setComponents(o,d,w,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),on.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),on.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(on)}intersectsSprite(t){return on.center.set(0,0,0),on.radius=.7071067811865476,on.applyMatrix4(t.matrixWorld),this.intersectsSphere(on)}intersectsSphere(t){const e=this.planes,n=t.center,a=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<a)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const a=e[n];if(ar.x=a.normal.x>0?t.max.x:t.min.x,ar.y=a.normal.y>0?t.max.y:t.min.y,ar.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(ar)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gc(){let i=null,t=!1,e=null,n=null;function a(r,s){e(r,s),n=i.requestAnimationFrame(a)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(a),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Fd(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<d.length;m++){const g=d[f],w=d[m];w.start<=g.start+g.count+1?g.count=Math.max(g.count,w.start+w.count-g.start):(++f,d[f]=w)}d.length=f+1;for(let m=0,g=d.length;m<g;m++){const w=d[m];i.bufferSubData(c,w.start*h.BYTES_PER_ELEMENT,h,w.start,w.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:a,remove:r,update:s}}class fe extends hi{constructor(t=1,e=1,n=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:a};const r=t/2,s=e/2,o=Math.floor(n),l=Math.floor(a),c=o+1,h=l+1,d=t/o,f=e/l,m=[],g=[],w=[],p=[];for(let u=0;u<h;u++){const y=u*f-s;for(let S=0;S<c;S++){const b=S*d-r;g.push(b,-y,0),w.push(0,0,1),p.push(S/o),p.push(1-u/l)}}for(let u=0;u<l;u++)for(let y=0;y<o;y++){const S=y+c*u,b=y+c*(u+1),k=y+1+c*(u+1),A=y+1+c*u;m.push(S,b,A),m.push(b,k,A)}this.setIndex(m),this.setAttribute("position",new be(g,3)),this.setAttribute("normal",new be(w,3)),this.setAttribute("uv",new be(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.width,t.height,t.widthSegments,t.heightSegments)}}var Od=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Yd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$d=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Kd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,tf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,of=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,lf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,cf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,df=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ff=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gf="gl_FragColor = linearToOutputTexel( gl_FragColor );",vf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_f=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,xf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,wf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ef=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Af=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Df=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,If=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Uf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ff=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Of=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Bf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$f=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,iu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,au=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ru=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,su=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ou=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,du=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_u=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Mu=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Su=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Eu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Au=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ru=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Du=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Iu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Uu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ku=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Fu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ou=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vu=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ju=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xu=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qu=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$u=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ju=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ku=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ip=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,np=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ap=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,op=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,up=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,vp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_p=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:Od,alphahash_pars_fragment:Bd,alphamap_fragment:Hd,alphamap_pars_fragment:Vd,alphatest_fragment:Gd,alphatest_pars_fragment:Wd,aomap_fragment:jd,aomap_pars_fragment:Xd,batching_pars_vertex:qd,batching_vertex:Yd,begin_vertex:$d,beginnormal_vertex:Zd,bsdfs:Jd,iridescence_fragment:Kd,bumpmap_pars_fragment:Qd,clipping_planes_fragment:tf,clipping_planes_pars_fragment:ef,clipping_planes_pars_vertex:nf,clipping_planes_vertex:af,color_fragment:rf,color_pars_fragment:sf,color_pars_vertex:of,color_vertex:lf,common:cf,cube_uv_reflection_fragment:hf,defaultnormal_vertex:df,displacementmap_pars_vertex:ff,displacementmap_vertex:uf,emissivemap_fragment:pf,emissivemap_pars_fragment:mf,colorspace_fragment:gf,colorspace_pars_fragment:vf,envmap_fragment:_f,envmap_common_pars_fragment:xf,envmap_pars_fragment:wf,envmap_pars_vertex:bf,envmap_physical_pars_fragment:Df,envmap_vertex:Mf,fog_vertex:yf,fog_pars_vertex:Sf,fog_fragment:Ef,fog_pars_fragment:Tf,gradientmap_pars_fragment:Af,lightmap_pars_fragment:Rf,lights_lambert_fragment:Cf,lights_lambert_pars_fragment:Pf,lights_pars_begin:Lf,lights_toon_fragment:If,lights_toon_pars_fragment:Uf,lights_phong_fragment:kf,lights_phong_pars_fragment:zf,lights_physical_fragment:Nf,lights_physical_pars_fragment:Ff,lights_fragment_begin:Of,lights_fragment_maps:Bf,lights_fragment_end:Hf,logdepthbuf_fragment:Vf,logdepthbuf_pars_fragment:Gf,logdepthbuf_pars_vertex:Wf,logdepthbuf_vertex:jf,map_fragment:Xf,map_pars_fragment:qf,map_particle_fragment:Yf,map_particle_pars_fragment:$f,metalnessmap_fragment:Zf,metalnessmap_pars_fragment:Jf,morphinstance_vertex:Kf,morphcolor_vertex:Qf,morphnormal_vertex:tu,morphtarget_pars_vertex:eu,morphtarget_vertex:iu,normal_fragment_begin:nu,normal_fragment_maps:au,normal_pars_fragment:ru,normal_pars_vertex:su,normal_vertex:ou,normalmap_pars_fragment:lu,clearcoat_normal_fragment_begin:cu,clearcoat_normal_fragment_maps:hu,clearcoat_pars_fragment:du,iridescence_pars_fragment:fu,opaque_fragment:uu,packing:pu,premultiplied_alpha_fragment:mu,project_vertex:gu,dithering_fragment:vu,dithering_pars_fragment:_u,roughnessmap_fragment:xu,roughnessmap_pars_fragment:wu,shadowmap_pars_fragment:bu,shadowmap_pars_vertex:Mu,shadowmap_vertex:yu,shadowmask_pars_fragment:Su,skinbase_vertex:Eu,skinning_pars_vertex:Tu,skinning_vertex:Au,skinnormal_vertex:Ru,specularmap_fragment:Cu,specularmap_pars_fragment:Pu,tonemapping_fragment:Lu,tonemapping_pars_fragment:Du,transmission_fragment:Iu,transmission_pars_fragment:Uu,uv_pars_fragment:ku,uv_pars_vertex:zu,uv_vertex:Nu,worldpos_vertex:Fu,background_vert:Ou,background_frag:Bu,backgroundCube_vert:Hu,backgroundCube_frag:Vu,cube_vert:Gu,cube_frag:Wu,depth_vert:ju,depth_frag:Xu,distanceRGBA_vert:qu,distanceRGBA_frag:Yu,equirect_vert:$u,equirect_frag:Zu,linedashed_vert:Ju,linedashed_frag:Ku,meshbasic_vert:Qu,meshbasic_frag:tp,meshlambert_vert:ep,meshlambert_frag:ip,meshmatcap_vert:np,meshmatcap_frag:ap,meshnormal_vert:rp,meshnormal_frag:sp,meshphong_vert:op,meshphong_frag:lp,meshphysical_vert:cp,meshphysical_frag:hp,meshtoon_vert:dp,meshtoon_frag:fp,points_vert:up,points_frag:pp,shadow_vert:mp,shadow_frag:gp,sprite_vert:vp,sprite_frag:_p},at={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Dt}},envmap:{envMap:{value:null},envMapRotation:{value:new Dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Dt},normalScale:{value:new Nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0},uvTransform:{value:new Dt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new Nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}}},fi={basic:{uniforms:Le([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Le([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new It(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Le([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Le([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Le([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new It(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Le([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Le([at.points,at.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Le([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Le([at.common,at.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Le([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Le([at.sprite,at.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Dt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Le([at.common,at.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Le([at.lights,at.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};fi.physical={uniforms:Le([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Dt},clearcoatNormalScale:{value:new Nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Dt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Dt},transmissionSamplerSize:{value:new Nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Dt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Dt},anisotropyVector:{value:new Nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Dt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const rr={r:0,b:0,g:0},ln=new Pe,xp=new le;function wp(i,t,e,n,a,r,s){const o=new It(0);let l=r===!0?0:1,c,h,d=null,f=0,m=null;function g(y){let S=y.isScene===!0?y.background:null;return S&&S.isTexture&&(S=(y.backgroundBlurriness>0?e:t).get(S)),S}function w(y){let S=!1;const b=g(y);b===null?u(o,l):b&&b.isColor&&(u(b,1),S=!0);const k=i.xr.getEnvironmentBlendMode();k==="additive"?n.buffers.color.setClear(0,0,0,1,s):k==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(y,S){const b=g(S);b&&(b.isCubeTexture||b.mapping===br)?(h===void 0&&(h=new Tt(new tn(1,1,1),new Qe({name:"BackgroundCubeMaterial",uniforms:na(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:Ie,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(k,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(h)),ln.copy(S.backgroundRotation),ln.x*=-1,ln.y*=-1,ln.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ln.y*=-1,ln.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(xp.makeRotationFromEuler(ln)),h.material.toneMapped=Wt.getTransfer(b.colorSpace)!==Qt,(d!==b||f!==b.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=b,f=b.version,m=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Tt(new fe(2,2),new Qe({name:"BackgroundMaterial",uniforms:na(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:Ki,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Wt.getTransfer(b.colorSpace)!==Qt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||f!==b.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=b,f=b.version,m=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function u(y,S){y.getRGB(rr,Bc(i)),n.buffers.color.setClear(rr.r,rr.g,rr.b,S,s)}return{getClearColor:function(){return o},setClearColor:function(y,S=1){o.set(y),l=S,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,u(o,l)},render:w,addToRenderList:p}}function bp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},a=f(null);let r=a,s=!1;function o(_,R,V,B,N){let W=!1;const F=d(B,V,R);r!==F&&(r=F,c(r.object)),W=m(_,B,V,N),W&&g(_,B,V,N),N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(W||s)&&(s=!1,b(_,R,V,B),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function d(_,R,V){const B=V.wireframe===!0;let N=n[_.id];N===void 0&&(N={},n[_.id]=N);let W=N[R.id];W===void 0&&(W={},N[R.id]=W);let F=W[B];return F===void 0&&(F=f(l()),W[B]=F),F}function f(_){const R=[],V=[],B=[];for(let N=0;N<e;N++)R[N]=0,V[N]=0,B[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:V,attributeDivisors:B,object:_,attributes:{},index:null}}function m(_,R,V,B){const N=r.attributes,W=R.attributes;let F=0;const Y=V.getAttributes();for(const G in Y)if(Y[G].location>=0){const it=N[G];let rt=W[G];if(rt===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(rt=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(rt=_.instanceColor)),it===void 0||it.attribute!==rt||rt&&it.data!==rt.data)return!0;F++}return r.attributesNum!==F||r.index!==B}function g(_,R,V,B){const N={},W=R.attributes;let F=0;const Y=V.getAttributes();for(const G in Y)if(Y[G].location>=0){let it=W[G];it===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(it=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(it=_.instanceColor));const rt={};rt.attribute=it,it&&it.data&&(rt.data=it.data),N[G]=rt,F++}r.attributes=N,r.attributesNum=F,r.index=B}function w(){const _=r.newAttributes;for(let R=0,V=_.length;R<V;R++)_[R]=0}function p(_){u(_,0)}function u(_,R){const V=r.newAttributes,B=r.enabledAttributes,N=r.attributeDivisors;V[_]=1,B[_]===0&&(i.enableVertexAttribArray(_),B[_]=1),N[_]!==R&&(i.vertexAttribDivisor(_,R),N[_]=R)}function y(){const _=r.newAttributes,R=r.enabledAttributes;for(let V=0,B=R.length;V<B;V++)R[V]!==_[V]&&(i.disableVertexAttribArray(V),R[V]=0)}function S(_,R,V,B,N,W,F){F===!0?i.vertexAttribIPointer(_,R,V,N,W):i.vertexAttribPointer(_,R,V,B,N,W)}function b(_,R,V,B){w();const N=B.attributes,W=V.getAttributes(),F=R.defaultAttributeValues;for(const Y in W){const G=W[Y];if(G.location>=0){let $=N[Y];if($===void 0&&(Y==="instanceMatrix"&&_.instanceMatrix&&($=_.instanceMatrix),Y==="instanceColor"&&_.instanceColor&&($=_.instanceColor)),$!==void 0){const it=$.normalized,rt=$.itemSize,gt=t.get($);if(gt===void 0)continue;const zt=gt.buffer,X=gt.type,Q=gt.bytesPerElement,ft=X===i.INT||X===i.UNSIGNED_INT||$.gpuType===lo;if($.isInterleavedBufferAttribute){const ot=$.data,Et=ot.stride,Ct=$.offset;if(ot.isInstancedInterleavedBuffer){for(let Ft=0;Ft<G.locationSize;Ft++)u(G.location+Ft,ot.meshPerAttribute);_.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ft=0;Ft<G.locationSize;Ft++)p(G.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,zt);for(let Ft=0;Ft<G.locationSize;Ft++)S(G.location+Ft,rt/G.locationSize,X,it,Et*Q,(Ct+rt/G.locationSize*Ft)*Q,ft)}else{if($.isInstancedBufferAttribute){for(let ot=0;ot<G.locationSize;ot++)u(G.location+ot,$.meshPerAttribute);_.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ot=0;ot<G.locationSize;ot++)p(G.location+ot);i.bindBuffer(i.ARRAY_BUFFER,zt);for(let ot=0;ot<G.locationSize;ot++)S(G.location+ot,rt/G.locationSize,X,it,rt*Q,rt/G.locationSize*ot*Q,ft)}}else if(F!==void 0){const it=F[Y];if(it!==void 0)switch(it.length){case 2:i.vertexAttrib2fv(G.location,it);break;case 3:i.vertexAttrib3fv(G.location,it);break;case 4:i.vertexAttrib4fv(G.location,it);break;default:i.vertexAttrib1fv(G.location,it)}}}}y()}function k(){C();for(const _ in n){const R=n[_];for(const V in R){const B=R[V];for(const N in B)h(B[N].object),delete B[N];delete R[V]}delete n[_]}}function A(_){if(n[_.id]===void 0)return;const R=n[_.id];for(const V in R){const B=R[V];for(const N in B)h(B[N].object),delete B[N];delete R[V]}delete n[_.id]}function T(_){for(const R in n){const V=n[R];if(V[_.id]===void 0)continue;const B=V[_.id];for(const N in B)h(B[N].object),delete B[N];delete V[_.id]}}function C(){M(),s=!0,r!==a&&(r=a,c(r.object))}function M(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:C,resetDefaultState:M,dispose:k,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:w,enableAttribute:p,disableUnusedAttributes:y}}function Mp(i,t,e){let n;function a(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function s(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=h[g];e.update(m,n,1)}function l(c,h,d,f){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)s(c[g],h[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,d);let g=0;for(let w=0;w<d;w++)g+=h[w]*f[w];e.update(g,n,1)}}this.setMode=a,this.render=r,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function yp(i,t,e,n){let a;function r(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");a=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(T){return!(T!==oi&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const C=T===Da&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Ui&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Ci&&!C)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),k=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:w,maxCubemapSize:p,maxAttributes:u,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:b,vertexTextures:k,maxSamples:A}}function Sp(i){const t=this;let e=null,n=0,a=!1,r=!1;const s=new dn,o=new Dt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||n!==0||a;return a=f,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=h(d,f,0)},this.setState=function(d,f,m){const g=d.clippingPlanes,w=d.clipIntersection,p=d.clipShadows,u=i.get(d);if(!a||g===null||g.length===0||r&&!p)r?h(null):c();else{const y=r?0:n,S=y*4;let b=u.clippingState||null;l.value=b,b=h(g,f,S,m);for(let k=0;k!==S;++k)b[k]=e[k];u.clippingState=b,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,f,m,g){const w=d!==null?d.length:0;let p=null;if(w!==0){if(p=l.value,g!==!0||p===null){const u=m+w*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<u)&&(p=new Float32Array(u));for(let S=0,b=m;S!==w;++S,b+=4)s.copy(d[S]).applyMatrix4(y,o),s.normal.toArray(p,b),p[b+3]=s.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,p}}function Ep(i){let t=new WeakMap;function e(s,o){return o===ys?s.mapping=Qn:o===Ss&&(s.mapping=ta),s}function n(s){if(s&&s.isTexture){const o=s.mapping;if(o===ys||o===Ss)if(t.has(s)){const l=t.get(s).texture;return e(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new kd(l.height);return c.fromEquirectangularTexture(i,s),t.set(s,c),s.addEventListener("dispose",a),e(c.texture,s.mapping)}else return null}}return s}function a(s){const o=s.target;o.removeEventListener("dispose",a);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class _o extends Hc{constructor(t=-1,e=1,n=1,a=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=a,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,a,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let r=n-t,s=n+t,o=a+e,l=a-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const jn=4,Rl=[.125,.215,.35,.446,.526,.582],pn=20,es=new _o,Cl=new It;let is=null,ns=0,as=0,rs=!1;const fn=(1+Math.sqrt(5))/2,Bn=1/fn,Pl=[new P(-fn,Bn,0),new P(fn,Bn,0),new P(-Bn,0,fn),new P(Bn,0,fn),new P(0,fn,-Bn),new P(0,fn,Bn),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Ll{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,a=100){is=this._renderer.getRenderTarget(),ns=this._renderer.getActiveCubeFace(),as=this._renderer.getActiveMipmapLevel(),rs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,a,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(is,ns,as),this._renderer.xr.enabled=rs,t.scissorTest=!1,sr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qn||t.mapping===ta?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),is=this._renderer.getRenderTarget(),ns=this._renderer.getActiveCubeFace(),as=this._renderer.getActiveMipmapLevel(),rs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:Da,format:oi,colorSpace:sa,depthBuffer:!1},a=Dl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Tp(r)),this._blurMaterial=Ap(r,t,e)}return a}_compileMaterial(t){const e=new Tt(this._lodPlanes[0],t);this._renderer.compile(e,es)}_sceneToCubeUV(t,e,n,a){const o=new Te(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Cl),h.toneMapping=Ji,h.autoClear=!1;const m=new de({name:"PMREM.Background",side:Ie,depthWrite:!1,depthTest:!1}),g=new Tt(new tn,m);let w=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,w=!0):(m.color.copy(Cl),w=!0);for(let u=0;u<6;u++){const y=u%3;y===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):y===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const S=this._cubeSize;sr(a,y*S,u>2?S:0,S,S),h.setRenderTarget(a),w&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,a=t.mapping===Qn||t.mapping===ta;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Il());const r=a?this._cubemapMaterial:this._equirectMaterial,s=new Tt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;sr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(s,es)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Pl[(a-r-1)%Pl.length];this._blur(t,r-1,r,s,o)}e.autoClear=n}_blur(t,e,n,a,r){const s=this._pingPongRenderTarget;this._halfBlur(t,s,e,n,a,"latitudinal",r),this._halfBlur(s,t,n,n,a,"longitudinal",r)}_halfBlur(t,e,n,a,r,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Tt(this._lodPlanes[a],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*pn-1),w=r/g,p=isFinite(r)?1+Math.floor(h*w):pn;p>pn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${pn}`);const u=[];let y=0;for(let T=0;T<pn;++T){const C=T/w,M=Math.exp(-C*C/2);u.push(M),T===0?y+=M:T<p&&(y+=2*M)}for(let T=0;T<u.length;T++)u[T]=u[T]/y;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=s==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const b=this._sizeLods[a],k=3*b*(a>S-jn?a-S+jn:0),A=4*(this._cubeSize-b);sr(e,k,A,3*b,2*b),l.setRenderTarget(e),l.render(d,es)}}function Tp(i){const t=[],e=[],n=[];let a=i;const r=i-jn+1+Rl.length;for(let s=0;s<r;s++){const o=Math.pow(2,a);e.push(o);let l=1/o;s>i-jn?l=Rl[s-i+jn-1]:s===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,w=3,p=2,u=1,y=new Float32Array(w*g*m),S=new Float32Array(p*g*m),b=new Float32Array(u*g*m);for(let A=0;A<m;A++){const T=A%3*2/3-1,C=A>2?0:-1,M=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];y.set(M,w*g*A),S.set(f,p*g*A);const _=[A,A,A,A,A,A];b.set(_,u*g*A)}const k=new hi;k.setAttribute("position",new je(y,w)),k.setAttribute("uv",new je(S,p)),k.setAttribute("faceIndex",new je(b,u)),t.push(k),a>jn&&a--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Dl(i,t,e){const n=new xn(i,t,e);return n.texture.mapping=br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sr(i,t,e,n,a){i.viewport.set(t,e,n,a),i.scissor.set(t,e,n,a)}function Ap(i,t,e){const n=new Float32Array(pn),a=new P(0,1,0);return new Qe({name:"SphericalGaussianBlur",defines:{n:pn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Il(){return new Qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Ul(){return new Qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function xo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Rp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ys||l===Ss,h=l===Qn||l===ta;if(c||h){let d=t.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Ll(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return c&&m&&m.height>0||h&&m&&a(m)?(e===null&&(e=new Ll(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function a(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function s(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:s}}function Cp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let a;switch(n){case"WEBGL_depth_texture":a=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=i.getExtension(n)}return t[n]=a,a}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const a=e(n);return a===null&&ba("THREE.WebGLRenderer: "+n+" extension not supported."),a}}}function Pp(i,t,e,n){const a={},r=new WeakMap;function s(d){const f=d.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const w=f.morphAttributes[g];for(let p=0,u=w.length;p<u;p++)t.remove(w[p])}f.removeEventListener("dispose",s),delete a[f.id];const m=r.get(f);m&&(t.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(d,f){return a[f.id]===!0||(f.addEventListener("dispose",s),a[f.id]=!0,e.memory.geometries++),f}function l(d){const f=d.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const w=m[g];for(let p=0,u=w.length;p<u;p++)t.update(w[p],i.ARRAY_BUFFER)}}function c(d){const f=[],m=d.index,g=d.attributes.position;let w=0;if(m!==null){const y=m.array;w=m.version;for(let S=0,b=y.length;S<b;S+=3){const k=y[S+0],A=y[S+1],T=y[S+2];f.push(k,A,A,T,T,k)}}else if(g!==void 0){const y=g.array;w=g.version;for(let S=0,b=y.length/3-1;S<b;S+=3){const k=S+0,A=S+1,T=S+2;f.push(k,A,A,T,T,k)}}else return;const p=new(Ic(f)?Oc:Fc)(f,1);p.version=w;const u=r.get(d);u&&t.remove(u),r.set(d,p)}function h(d){const f=r.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Lp(i,t,e){let n;function a(f){n=f}let r,s;function o(f){r=f.type,s=f.bytesPerElement}function l(f,m){i.drawElements(n,m,r,f*s),e.update(m,n,1)}function c(f,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,f*s,g),e.update(m,n,g))}function h(f,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,f,0,g);let p=0;for(let u=0;u<g;u++)p+=m[u];e.update(p,n,1)}function d(f,m,g,w){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<f.length;u++)c(f[u]/s,m[u],w[u]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,f,0,w,0,g);let u=0;for(let y=0;y<g;y++)u+=m[y]*w[y];e.update(u,n,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Dp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,s,o){switch(e.calls++,s){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function a(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:a,update:n}}function Ip(i,t,e){const n=new WeakMap,a=new te;function r(s,o,l){const c=s.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let _=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var m=_;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,w=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let b=0;g===!0&&(b=1),w===!0&&(b=2),p===!0&&(b=3);let k=o.attributes.position.count*b,A=1;k>t.maxTextureSize&&(A=Math.ceil(k/t.maxTextureSize),k=t.maxTextureSize);const T=new Float32Array(k*A*4*d),C=new kc(T,k,A,d);C.type=Ci,C.needsUpdate=!0;const M=b*4;for(let R=0;R<d;R++){const V=u[R],B=y[R],N=S[R],W=k*A*4*R;for(let F=0;F<V.count;F++){const Y=F*M;g===!0&&(a.fromBufferAttribute(V,F),T[W+Y+0]=a.x,T[W+Y+1]=a.y,T[W+Y+2]=a.z,T[W+Y+3]=0),w===!0&&(a.fromBufferAttribute(B,F),T[W+Y+4]=a.x,T[W+Y+5]=a.y,T[W+Y+6]=a.z,T[W+Y+7]=0),p===!0&&(a.fromBufferAttribute(N,F),T[W+Y+8]=a.x,T[W+Y+9]=a.y,T[W+Y+10]=a.z,T[W+Y+11]=N.itemSize===4?a.w:1)}}f={count:d,texture:C,size:new Nt(k,A)},n.set(o,f),o.addEventListener("dispose",_)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const w=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",w),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Up(i,t,e,n){let a=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(a.get(d)!==c&&(t.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;a.get(f)!==c&&(f.update(),a.set(f,c))}return d}function s(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:s}}class Wc extends Re{constructor(t,e,n,a,r,s,o,l,c,h=Yn){if(h!==Yn&&h!==ia)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Yn&&(n=_n),n===void 0&&h===ia&&(n=ea),super(null,a,r,s,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Fe,this.minFilter=l!==void 0?l:Fe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const jc=new Re,kl=new Wc(1,1),Xc=new kc,qc=new xd,Yc=new Vc,zl=[],Nl=[],Fl=new Float32Array(16),Ol=new Float32Array(9),Bl=new Float32Array(4);function oa(i,t,e){const n=i[0];if(n<=0||n>0)return i;const a=t*e;let r=zl[a];if(r===void 0&&(r=new Float32Array(a),zl[a]=r),t!==0){n.toArray(r,0);for(let s=1,o=0;s!==t;++s)o+=e,i[s].toArray(r,o)}return r}function ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ve(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function yr(i,t){let e=Nl[t];e===void 0&&(e=new Int32Array(t),Nl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function kp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function zp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2fv(this.addr,t),ve(e,t)}}function Np(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;i.uniform3fv(this.addr,t),ve(e,t)}}function Fp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4fv(this.addr,t),ve(e,t)}}function Op(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ve(e,t)}else{if(ge(e,n))return;Bl.set(n),i.uniformMatrix2fv(this.addr,!1,Bl),ve(e,n)}}function Bp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ve(e,t)}else{if(ge(e,n))return;Ol.set(n),i.uniformMatrix3fv(this.addr,!1,Ol),ve(e,n)}}function Hp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ve(e,t)}else{if(ge(e,n))return;Fl.set(n),i.uniformMatrix4fv(this.addr,!1,Fl),ve(e,n)}}function Vp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Gp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2iv(this.addr,t),ve(e,t)}}function Wp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3iv(this.addr,t),ve(e,t)}}function jp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4iv(this.addr,t),ve(e,t)}}function Xp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function qp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2uiv(this.addr,t),ve(e,t)}}function Yp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3uiv(this.addr,t),ve(e,t)}}function $p(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4uiv(this.addr,t),ve(e,t)}}function Zp(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a);let r;this.type===i.SAMPLER_2D_SHADOW?(kl.compareFunction=Dc,r=kl):r=jc,e.setTexture2D(t||r,a)}function Jp(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),e.setTexture3D(t||qc,a)}function Kp(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),e.setTextureCube(t||Yc,a)}function Qp(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),e.setTexture2DArray(t||Xc,a)}function t0(i){switch(i){case 5126:return kp;case 35664:return zp;case 35665:return Np;case 35666:return Fp;case 35674:return Op;case 35675:return Bp;case 35676:return Hp;case 5124:case 35670:return Vp;case 35667:case 35671:return Gp;case 35668:case 35672:return Wp;case 35669:case 35673:return jp;case 5125:return Xp;case 36294:return qp;case 36295:return Yp;case 36296:return $p;case 35678:case 36198:case 36298:case 36306:case 35682:return Zp;case 35679:case 36299:case 36307:return Jp;case 35680:case 36300:case 36308:case 36293:return Kp;case 36289:case 36303:case 36311:case 36292:return Qp}}function e0(i,t){i.uniform1fv(this.addr,t)}function i0(i,t){const e=oa(t,this.size,2);i.uniform2fv(this.addr,e)}function n0(i,t){const e=oa(t,this.size,3);i.uniform3fv(this.addr,e)}function a0(i,t){const e=oa(t,this.size,4);i.uniform4fv(this.addr,e)}function r0(i,t){const e=oa(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function s0(i,t){const e=oa(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function o0(i,t){const e=oa(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function l0(i,t){i.uniform1iv(this.addr,t)}function c0(i,t){i.uniform2iv(this.addr,t)}function h0(i,t){i.uniform3iv(this.addr,t)}function d0(i,t){i.uniform4iv(this.addr,t)}function f0(i,t){i.uniform1uiv(this.addr,t)}function u0(i,t){i.uniform2uiv(this.addr,t)}function p0(i,t){i.uniform3uiv(this.addr,t)}function m0(i,t){i.uniform4uiv(this.addr,t)}function g0(i,t,e){const n=this.cache,a=t.length,r=yr(e,a);ge(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let s=0;s!==a;++s)e.setTexture2D(t[s]||jc,r[s])}function v0(i,t,e){const n=this.cache,a=t.length,r=yr(e,a);ge(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let s=0;s!==a;++s)e.setTexture3D(t[s]||qc,r[s])}function _0(i,t,e){const n=this.cache,a=t.length,r=yr(e,a);ge(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let s=0;s!==a;++s)e.setTextureCube(t[s]||Yc,r[s])}function x0(i,t,e){const n=this.cache,a=t.length,r=yr(e,a);ge(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let s=0;s!==a;++s)e.setTexture2DArray(t[s]||Xc,r[s])}function w0(i){switch(i){case 5126:return e0;case 35664:return i0;case 35665:return n0;case 35666:return a0;case 35674:return r0;case 35675:return s0;case 35676:return o0;case 5124:case 35670:return l0;case 35667:case 35671:return c0;case 35668:case 35672:return h0;case 35669:case 35673:return d0;case 5125:return f0;case 36294:return u0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return v0;case 35680:case 36300:case 36308:case 36293:return _0;case 36289:case 36303:case 36311:case 36292:return x0}}class b0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=t0(e.type)}}class M0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=w0(e.type)}}class y0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const a=this.seq;for(let r=0,s=a.length;r!==s;++r){const o=a[r];o.setValue(t,e[o.id],n)}}}const ss=/(\w+)(\])?(\[|\.)?/g;function Hl(i,t){i.seq.push(t),i.map[t.id]=t}function S0(i,t,e){const n=i.name,a=n.length;for(ss.lastIndex=0;;){const r=ss.exec(n),s=ss.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===a){Hl(e,c===void 0?new b0(o,i,t):new M0(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new y0(o),Hl(e,d)),e=d}}}class pr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const r=t.getActiveUniform(e,a),s=t.getUniformLocation(e,r.name);S0(r,s,this)}}setValue(t,e,n,a){const r=this.map[e];r!==void 0&&r.setValue(t,n,a)}setOptional(t,e,n){const a=e[n];a!==void 0&&this.setValue(t,n,a)}static upload(t,e,n,a){for(let r=0,s=e.length;r!==s;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,e){const n=[];for(let a=0,r=t.length;a!==r;++a){const s=t[a];s.id in e&&n.push(s)}return n}}function Vl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const E0=37297;let T0=0;function A0(i,t){const e=i.split(`
`),n=[],a=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let s=a;s<r;s++){const o=s+1;n.push(`${o===t?">":" "} ${o}: ${e[s]}`)}return n.join(`
`)}const Gl=new Dt;function R0(i){Wt._getMatrix(Gl,Wt.workingColorSpace,i);const t=`mat3( ${Gl.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(i)){case Mr:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Wl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),a=i.getShaderInfoLog(t).trim();if(n&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const s=parseInt(r[1]);return e.toUpperCase()+`

`+a+`

`+A0(i.getShaderSource(t),s)}else return a}function C0(i,t){const e=R0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function P0(i,t){let e;switch(t){case Xh:e="Linear";break;case qh:e="Reinhard";break;case Yh:e="Cineon";break;case $h:e="ACESFilmic";break;case Jh:e="AgX";break;case Kh:e="Neutral";break;case Zh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const or=new P;function L0(){Wt.getLuminanceCoefficients(or);const i=or.x.toFixed(4),t=or.y.toFixed(4),e=or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function D0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ma).join(`
`)}function I0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function U0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let a=0;a<n;a++){const r=i.getActiveAttrib(t,a),s=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[s]={type:r.type,location:i.getAttribLocation(t,s),locationSize:o}}return e}function Ma(i){return i!==""}function jl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const k0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ks(i){return i.replace(k0,N0)}const z0=new Map;function N0(i,t){let e=kt[t];if(e===void 0){const n=z0.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ks(e)}const F0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ql(i){return i.replace(F0,O0)}function O0(i,t,e,n){let a="";for(let r=parseInt(t);r<parseInt(e);r++)a+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function Yl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function B0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===xc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Eh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Si&&(t="SHADOWMAP_TYPE_VSM"),t}function H0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Qn:case ta:t="ENVMAP_TYPE_CUBE";break;case br:t="ENVMAP_TYPE_CUBE_UV";break}return t}function V0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ta:t="ENVMAP_MODE_REFRACTION";break}return t}function G0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case oo:t="ENVMAP_BLENDING_MULTIPLY";break;case Wh:t="ENVMAP_BLENDING_MIX";break;case jh:t="ENVMAP_BLENDING_ADD";break}return t}function W0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function j0(i,t,e,n){const a=i.getContext(),r=e.defines;let s=e.vertexShader,o=e.fragmentShader;const l=B0(e),c=H0(e),h=V0(e),d=G0(e),f=W0(e),m=D0(e),g=I0(r),w=a.createProgram();let p,u,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ma).join(`
`),p.length>0&&(p+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ma).join(`
`),u.length>0&&(u+=`
`)):(p=[Yl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ma).join(`
`),u=[Yl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ji?"#define TONE_MAPPING":"",e.toneMapping!==Ji?kt.tonemapping_pars_fragment:"",e.toneMapping!==Ji?P0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,C0("linearToOutputTexel",e.outputColorSpace),L0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ma).join(`
`)),s=Ks(s),s=jl(s,e),s=Xl(s,e),o=Ks(o),o=jl(o,e),o=Xl(o,e),s=ql(s),o=ql(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",e.glslVersion===ol?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ol?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const S=y+p+s,b=y+u+o,k=Vl(a,a.VERTEX_SHADER,S),A=Vl(a,a.FRAGMENT_SHADER,b);a.attachShader(w,k),a.attachShader(w,A),e.index0AttributeName!==void 0?a.bindAttribLocation(w,0,e.index0AttributeName):e.morphTargets===!0&&a.bindAttribLocation(w,0,"position"),a.linkProgram(w);function T(R){if(i.debug.checkShaderErrors){const V=a.getProgramInfoLog(w).trim(),B=a.getShaderInfoLog(k).trim(),N=a.getShaderInfoLog(A).trim();let W=!0,F=!0;if(a.getProgramParameter(w,a.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(a,w,k,A);else{const Y=Wl(a,k,"vertex"),G=Wl(a,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(w,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+V+`
`+Y+`
`+G)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(B===""||N==="")&&(F=!1);F&&(R.diagnostics={runnable:W,programLog:V,vertexShader:{log:B,prefix:p},fragmentShader:{log:N,prefix:u}})}a.deleteShader(k),a.deleteShader(A),C=new pr(a,w),M=U0(a,w)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=a.getProgramParameter(w,E0)),_},this.destroy=function(){n.releaseStatesOfProgram(this),a.deleteProgram(w),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=T0++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=k,this.fragmentShader=A,this}let X0=0;class q0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,a=this._getShaderStage(e),r=this._getShaderStage(n),s=this._getShaderCacheForMaterial(t);return s.has(a)===!1&&(s.add(a),a.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Y0(t),e.set(t,n)),n}}class Y0{constructor(t){this.id=X0++,this.code=t,this.usedTimes=0}}function $0(i,t,e,n,a,r,s){const o=new go,l=new q0,c=new Set,h=[],d=a.logarithmicDepthBuffer,f=a.vertexTextures;let m=a.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(M){return c.add(M),M===0?"uv":`uv${M}`}function p(M,_,R,V,B){const N=V.fog,W=B.geometry,F=M.isMeshStandardMaterial?V.environment:null,Y=(M.isMeshStandardMaterial?e:t).get(M.envMap||F),G=Y&&Y.mapping===br?Y.image.height:null,$=g[M.type];M.precision!==null&&(m=a.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const it=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,rt=it!==void 0?it.length:0;let gt=0;W.morphAttributes.position!==void 0&&(gt=1),W.morphAttributes.normal!==void 0&&(gt=2),W.morphAttributes.color!==void 0&&(gt=3);let zt,X,Q,ft;if($){const Kt=fi[$];zt=Kt.vertexShader,X=Kt.fragmentShader}else zt=M.vertexShader,X=M.fragmentShader,l.update(M),Q=l.getVertexShaderID(M),ft=l.getFragmentShaderID(M);const ot=i.getRenderTarget(),Et=i.state.buffers.depth.getReversed(),Ct=B.isInstancedMesh===!0,Ft=B.isBatchedMesh===!0,ce=!!M.map,Vt=!!M.matcap,ue=!!Y,U=!!M.aoMap,qe=!!M.lightMap,Ot=!!M.bumpMap,Bt=!!M.normalMap,yt=!!M.displacementMap,ne=!!M.emissiveMap,Mt=!!M.metalnessMap,E=!!M.roughnessMap,v=M.anisotropy>0,z=M.clearcoat>0,Z=M.dispersion>0,K=M.iridescence>0,q=M.sheen>0,wt=M.transmission>0,lt=v&&!!M.anisotropyMap,ut=z&&!!M.clearcoatMap,Gt=z&&!!M.clearcoatNormalMap,tt=z&&!!M.clearcoatRoughnessMap,pt=K&&!!M.iridescenceMap,St=K&&!!M.iridescenceThicknessMap,At=q&&!!M.sheenColorMap,mt=q&&!!M.sheenRoughnessMap,Ht=!!M.specularMap,Ut=!!M.specularColorMap,ee=!!M.specularIntensityMap,L=wt&&!!M.transmissionMap,st=wt&&!!M.thicknessMap,j=!!M.gradientMap,J=!!M.alphaMap,dt=M.alphaTest>0,ct=!!M.alphaHash,Pt=!!M.extensions;let he=Ji;M.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(he=i.toneMapping);const Me={shaderID:$,shaderType:M.type,shaderName:M.name,vertexShader:zt,fragmentShader:X,defines:M.defines,customVertexShaderID:Q,customFragmentShaderID:ft,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:Ft,batchingColor:Ft&&B._colorsTexture!==null,instancing:Ct,instancingColor:Ct&&B.instanceColor!==null,instancingMorph:Ct&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:sa,alphaToCoverage:!!M.alphaToCoverage,map:ce,matcap:Vt,envMap:ue,envMapMode:ue&&Y.mapping,envMapCubeUVHeight:G,aoMap:U,lightMap:qe,bumpMap:Ot,normalMap:Bt,displacementMap:f&&yt,emissiveMap:ne,normalMapObjectSpace:Bt&&M.normalMapType===id,normalMapTangentSpace:Bt&&M.normalMapType===Lc,metalnessMap:Mt,roughnessMap:E,anisotropy:v,anisotropyMap:lt,clearcoat:z,clearcoatMap:ut,clearcoatNormalMap:Gt,clearcoatRoughnessMap:tt,dispersion:Z,iridescence:K,iridescenceMap:pt,iridescenceThicknessMap:St,sheen:q,sheenColorMap:At,sheenRoughnessMap:mt,specularMap:Ht,specularColorMap:Ut,specularIntensityMap:ee,transmission:wt,transmissionMap:L,thicknessMap:st,gradientMap:j,opaque:M.transparent===!1&&M.blending===qn&&M.alphaToCoverage===!1,alphaMap:J,alphaTest:dt,alphaHash:ct,combine:M.combine,mapUv:ce&&w(M.map.channel),aoMapUv:U&&w(M.aoMap.channel),lightMapUv:qe&&w(M.lightMap.channel),bumpMapUv:Ot&&w(M.bumpMap.channel),normalMapUv:Bt&&w(M.normalMap.channel),displacementMapUv:yt&&w(M.displacementMap.channel),emissiveMapUv:ne&&w(M.emissiveMap.channel),metalnessMapUv:Mt&&w(M.metalnessMap.channel),roughnessMapUv:E&&w(M.roughnessMap.channel),anisotropyMapUv:lt&&w(M.anisotropyMap.channel),clearcoatMapUv:ut&&w(M.clearcoatMap.channel),clearcoatNormalMapUv:Gt&&w(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&w(M.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&w(M.iridescenceMap.channel),iridescenceThicknessMapUv:St&&w(M.iridescenceThicknessMap.channel),sheenColorMapUv:At&&w(M.sheenColorMap.channel),sheenRoughnessMapUv:mt&&w(M.sheenRoughnessMap.channel),specularMapUv:Ht&&w(M.specularMap.channel),specularColorMapUv:Ut&&w(M.specularColorMap.channel),specularIntensityMapUv:ee&&w(M.specularIntensityMap.channel),transmissionMapUv:L&&w(M.transmissionMap.channel),thicknessMapUv:st&&w(M.thicknessMap.channel),alphaMapUv:J&&w(M.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Bt||v),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!W.attributes.uv&&(ce||J),fog:!!N,useFog:M.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Et,skinning:B.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:gt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,decodeVideoTexture:ce&&M.map.isVideoTexture===!0&&Wt.getTransfer(M.map.colorSpace)===Qt,decodeVideoTextureEmissive:ne&&M.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(M.emissiveMap.colorSpace)===Qt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ui,flipSided:M.side===Ie,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Pt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&M.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function u(M){const _=[];if(M.shaderID?_.push(M.shaderID):(_.push(M.customVertexShaderID),_.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)_.push(R),_.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(y(_,M),S(_,M),_.push(i.outputColorSpace)),_.push(M.customProgramCacheKey),_.join()}function y(M,_){M.push(_.precision),M.push(_.outputColorSpace),M.push(_.envMapMode),M.push(_.envMapCubeUVHeight),M.push(_.mapUv),M.push(_.alphaMapUv),M.push(_.lightMapUv),M.push(_.aoMapUv),M.push(_.bumpMapUv),M.push(_.normalMapUv),M.push(_.displacementMapUv),M.push(_.emissiveMapUv),M.push(_.metalnessMapUv),M.push(_.roughnessMapUv),M.push(_.anisotropyMapUv),M.push(_.clearcoatMapUv),M.push(_.clearcoatNormalMapUv),M.push(_.clearcoatRoughnessMapUv),M.push(_.iridescenceMapUv),M.push(_.iridescenceThicknessMapUv),M.push(_.sheenColorMapUv),M.push(_.sheenRoughnessMapUv),M.push(_.specularMapUv),M.push(_.specularColorMapUv),M.push(_.specularIntensityMapUv),M.push(_.transmissionMapUv),M.push(_.thicknessMapUv),M.push(_.combine),M.push(_.fogExp2),M.push(_.sizeAttenuation),M.push(_.morphTargetsCount),M.push(_.morphAttributeCount),M.push(_.numDirLights),M.push(_.numPointLights),M.push(_.numSpotLights),M.push(_.numSpotLightMaps),M.push(_.numHemiLights),M.push(_.numRectAreaLights),M.push(_.numDirLightShadows),M.push(_.numPointLightShadows),M.push(_.numSpotLightShadows),M.push(_.numSpotLightShadowsWithMaps),M.push(_.numLightProbes),M.push(_.shadowMapType),M.push(_.toneMapping),M.push(_.numClippingPlanes),M.push(_.numClipIntersection),M.push(_.depthPacking)}function S(M,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reverseDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),M.push(o.mask)}function b(M){const _=g[M.type];let R;if(_){const V=fi[_];R=Ld.clone(V.uniforms)}else R=M.uniforms;return R}function k(M,_){let R;for(let V=0,B=h.length;V<B;V++){const N=h[V];if(N.cacheKey===_){R=N,++R.usedTimes;break}}return R===void 0&&(R=new j0(i,_,M,r),h.push(R)),R}function A(M){if(--M.usedTimes===0){const _=h.indexOf(M);h[_]=h[h.length-1],h.pop(),M.destroy()}}function T(M){l.remove(M)}function C(){l.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:b,acquireProgram:k,releaseProgram:A,releaseShaderCache:T,programs:h,dispose:C}}function Z0(){let i=new WeakMap;function t(s){return i.has(s)}function e(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function n(s){i.delete(s)}function a(s,o,l){i.get(s)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:a,dispose:r}}function J0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function $l(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Zl(){const i=[];let t=0;const e=[],n=[],a=[];function r(){t=0,e.length=0,n.length=0,a.length=0}function s(d,f,m,g,w,p){let u=i[t];return u===void 0?(u={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:w,group:p},i[t]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=m,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=w,u.group=p),t++,u}function o(d,f,m,g,w,p){const u=s(d,f,m,g,w,p);m.transmission>0?n.push(u):m.transparent===!0?a.push(u):e.push(u)}function l(d,f,m,g,w,p){const u=s(d,f,m,g,w,p);m.transmission>0?n.unshift(u):m.transparent===!0?a.unshift(u):e.unshift(u)}function c(d,f){e.length>1&&e.sort(d||J0),n.length>1&&n.sort(f||$l),a.length>1&&a.sort(f||$l)}function h(){for(let d=t,f=i.length;d<f;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:a,init:r,push:o,unshift:l,finish:h,sort:c}}function K0(){let i=new WeakMap;function t(n,a){const r=i.get(n);let s;return r===void 0?(s=new Zl,i.set(n,[s])):a>=r.length?(s=new Zl,r.push(s)):s=r[a],s}function e(){i=new WeakMap}return{get:t,dispose:e}}function Q0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new It};break;case"SpotLight":e={position:new P,direction:new P,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function tm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let em=0;function im(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function nm(i){const t=new Q0,e=tm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const a=new P,r=new le,s=new le;function o(c){let h=0,d=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let m=0,g=0,w=0,p=0,u=0,y=0,S=0,b=0,k=0,A=0,T=0;c.sort(im);for(let M=0,_=c.length;M<_;M++){const R=c[M],V=R.color,B=R.intensity,N=R.distance,W=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=V.r*B,d+=V.g*B,f+=V.b*B;else if(R.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(R.sh.coefficients[F],B);T++}else if(R.isDirectionalLight){const F=t.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Y=R.shadow,G=e.get(R);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,n.directionalShadow[m]=G,n.directionalShadowMap[m]=W,n.directionalShadowMatrix[m]=R.shadow.matrix,y++}n.directional[m]=F,m++}else if(R.isSpotLight){const F=t.get(R);F.position.setFromMatrixPosition(R.matrixWorld),F.color.copy(V).multiplyScalar(B),F.distance=N,F.coneCos=Math.cos(R.angle),F.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),F.decay=R.decay,n.spot[w]=F;const Y=R.shadow;if(R.map&&(n.spotLightMap[k]=R.map,k++,Y.updateMatrices(R),R.castShadow&&A++),n.spotLightMatrix[w]=Y.matrix,R.castShadow){const G=e.get(R);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,n.spotShadow[w]=G,n.spotShadowMap[w]=W,b++}w++}else if(R.isRectAreaLight){const F=t.get(R);F.color.copy(V).multiplyScalar(B),F.halfWidth.set(R.width*.5,0,0),F.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=F,p++}else if(R.isPointLight){const F=t.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),F.distance=R.distance,F.decay=R.decay,R.castShadow){const Y=R.shadow,G=e.get(R);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,G.shadowCameraNear=Y.camera.near,G.shadowCameraFar=Y.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=R.shadow.matrix,S++}n.point[g]=F,g++}else if(R.isHemisphereLight){const F=t.get(R);F.skyColor.copy(R.color).multiplyScalar(B),F.groundColor.copy(R.groundColor).multiplyScalar(B),n.hemi[u]=F,u++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==m||C.pointLength!==g||C.spotLength!==w||C.rectAreaLength!==p||C.hemiLength!==u||C.numDirectionalShadows!==y||C.numPointShadows!==S||C.numSpotShadows!==b||C.numSpotMaps!==k||C.numLightProbes!==T)&&(n.directional.length=m,n.spot.length=w,n.rectArea.length=p,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=b+k-A,n.spotLightMap.length=k,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=T,C.directionalLength=m,C.pointLength=g,C.spotLength=w,C.rectAreaLength=p,C.hemiLength=u,C.numDirectionalShadows=y,C.numPointShadows=S,C.numSpotShadows=b,C.numSpotMaps=k,C.numLightProbes=T,n.version=em++)}function l(c,h){let d=0,f=0,m=0,g=0,w=0;const p=h.matrixWorldInverse;for(let u=0,y=c.length;u<y;u++){const S=c[u];if(S.isDirectionalLight){const b=n.directional[d];b.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(p),d++}else if(S.isSpotLight){const b=n.spot[m];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(p),m++}else if(S.isRectAreaLight){const b=n.rectArea[g];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),s.identity(),r.copy(S.matrixWorld),r.premultiply(p),s.extractRotation(r),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(s),b.halfHeight.applyMatrix4(s),g++}else if(S.isPointLight){const b=n.point[f];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){const b=n.hemi[w];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(p),w++}}}return{setup:o,setupView:l,state:n}}function Jl(i){const t=new nm(i),e=[],n=[];function a(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function s(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:s}}function am(i){let t=new WeakMap;function e(a,r=0){const s=t.get(a);let o;return s===void 0?(o=new Jl(i),t.set(a,[o])):r>=s.length?(o=new Jl(i),s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class rm extends za{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=td,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class sm extends za{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const om=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function cm(i,t,e){let n=new vo;const a=new Nt,r=new Nt,s=new te,o=new rm({depthPacking:ed}),l=new sm,c={},h=e.maxTextureSize,d={[Ki]:Ie,[Ie]:Ki,[ui]:ui},f=new Qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Nt},radius:{value:4}},vertexShader:om,fragmentShader:lm}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new hi;g.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Tt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xc;let u=this.type;this.render=function(A,T,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const M=i.getRenderTarget(),_=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Zi),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const B=u!==Si&&this.type===Si,N=u===Si&&this.type!==Si;for(let W=0,F=A.length;W<F;W++){const Y=A[W],G=Y.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);const $=G.getFrameExtents();if(a.multiply($),r.copy(G.mapSize),(a.x>h||a.y>h)&&(a.x>h&&(r.x=Math.floor(h/$.x),a.x=r.x*$.x,G.mapSize.x=r.x),a.y>h&&(r.y=Math.floor(h/$.y),a.y=r.y*$.y,G.mapSize.y=r.y)),G.map===null||B===!0||N===!0){const rt=this.type!==Si?{minFilter:Fe,magFilter:Fe}:{};G.map!==null&&G.map.dispose(),G.map=new xn(a.x,a.y,rt),G.map.texture.name=Y.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const it=G.getViewportCount();for(let rt=0;rt<it;rt++){const gt=G.getViewport(rt);s.set(r.x*gt.x,r.y*gt.y,r.x*gt.z,r.y*gt.w),V.viewport(s),G.updateMatrices(Y,rt),n=G.getFrustum(),b(T,C,G.camera,Y,this.type)}G.isPointLightShadow!==!0&&this.type===Si&&y(G,C),G.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(M,_,R)};function y(A,T){const C=t.update(w);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new xn(a.x,a.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(T,null,C,f,w,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(T,null,C,m,w,null)}function S(A,T,C,M){let _=null;const R=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)_=R;else if(_=C.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const V=_.uuid,B=T.uuid;let N=c[V];N===void 0&&(N={},c[V]=N);let W=N[B];W===void 0&&(W=_.clone(),N[B]=W,T.addEventListener("dispose",k)),_=W}if(_.visible=T.visible,_.wireframe=T.wireframe,M===Si?_.side=T.shadowSide!==null?T.shadowSide:T.side:_.side=T.shadowSide!==null?T.shadowSide:d[T.side],_.alphaMap=T.alphaMap,_.alphaTest=T.alphaTest,_.map=T.map,_.clipShadows=T.clipShadows,_.clippingPlanes=T.clippingPlanes,_.clipIntersection=T.clipIntersection,_.displacementMap=T.displacementMap,_.displacementScale=T.displacementScale,_.displacementBias=T.displacementBias,_.wireframeLinewidth=T.wireframeLinewidth,_.linewidth=T.linewidth,C.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const V=i.properties.get(_);V.light=C}return _}function b(A,T,C,M,_){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&_===Si)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const B=t.update(A),N=A.material;if(Array.isArray(N)){const W=B.groups;for(let F=0,Y=W.length;F<Y;F++){const G=W[F],$=N[G.materialIndex];if($&&$.visible){const it=S(A,$,M,_);A.onBeforeShadow(i,A,T,C,B,it,G),i.renderBufferDirect(C,null,B,it,A,G),A.onAfterShadow(i,A,T,C,B,it,G)}}}else if(N.visible){const W=S(A,N,M,_);A.onBeforeShadow(i,A,T,C,B,W,null),i.renderBufferDirect(C,null,B,W,A,null),A.onAfterShadow(i,A,T,C,B,W,null)}}const V=A.children;for(let B=0,N=V.length;B<N;B++)b(V[B],T,C,M,_)}function k(A){A.target.removeEventListener("dispose",k);for(const C in c){const M=c[C],_=A.target.uuid;_ in M&&(M[_].dispose(),delete M[_])}}}const hm={[gs]:vs,[_s]:bs,[xs]:Ms,[Kn]:ws,[vs]:gs,[bs]:_s,[Ms]:xs,[ws]:Kn};function dm(i,t){function e(){let L=!1;const st=new te;let j=null;const J=new te(0,0,0,0);return{setMask:function(dt){j!==dt&&!L&&(i.colorMask(dt,dt,dt,dt),j=dt)},setLocked:function(dt){L=dt},setClear:function(dt,ct,Pt,he,Me){Me===!0&&(dt*=he,ct*=he,Pt*=he),st.set(dt,ct,Pt,he),J.equals(st)===!1&&(i.clearColor(dt,ct,Pt,he),J.copy(st))},reset:function(){L=!1,j=null,J.set(-1,0,0,0)}}}function n(){let L=!1,st=!1,j=null,J=null,dt=null;return{setReversed:function(ct){if(st!==ct){const Pt=t.get("EXT_clip_control");st?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT);const he=dt;dt=null,this.setClear(he)}st=ct},getReversed:function(){return st},setTest:function(ct){ct?ot(i.DEPTH_TEST):Et(i.DEPTH_TEST)},setMask:function(ct){j!==ct&&!L&&(i.depthMask(ct),j=ct)},setFunc:function(ct){if(st&&(ct=hm[ct]),J!==ct){switch(ct){case gs:i.depthFunc(i.NEVER);break;case vs:i.depthFunc(i.ALWAYS);break;case _s:i.depthFunc(i.LESS);break;case Kn:i.depthFunc(i.LEQUAL);break;case xs:i.depthFunc(i.EQUAL);break;case ws:i.depthFunc(i.GEQUAL);break;case bs:i.depthFunc(i.GREATER);break;case Ms:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=ct}},setLocked:function(ct){L=ct},setClear:function(ct){dt!==ct&&(st&&(ct=1-ct),i.clearDepth(ct),dt=ct)},reset:function(){L=!1,j=null,J=null,dt=null,st=!1}}}function a(){let L=!1,st=null,j=null,J=null,dt=null,ct=null,Pt=null,he=null,Me=null;return{setTest:function(Kt){L||(Kt?ot(i.STENCIL_TEST):Et(i.STENCIL_TEST))},setMask:function(Kt){st!==Kt&&!L&&(i.stencilMask(Kt),st=Kt)},setFunc:function(Kt,ti,vi){(j!==Kt||J!==ti||dt!==vi)&&(i.stencilFunc(Kt,ti,vi),j=Kt,J=ti,dt=vi)},setOp:function(Kt,ti,vi){(ct!==Kt||Pt!==ti||he!==vi)&&(i.stencilOp(Kt,ti,vi),ct=Kt,Pt=ti,he=vi)},setLocked:function(Kt){L=Kt},setClear:function(Kt){Me!==Kt&&(i.clearStencil(Kt),Me=Kt)},reset:function(){L=!1,st=null,j=null,J=null,dt=null,ct=null,Pt=null,he=null,Me=null}}}const r=new e,s=new n,o=new a,l=new WeakMap,c=new WeakMap;let h={},d={},f=new WeakMap,m=[],g=null,w=!1,p=null,u=null,y=null,S=null,b=null,k=null,A=null,T=new It(0,0,0),C=0,M=!1,_=null,R=null,V=null,B=null,N=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,Y=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(G)[1]),F=Y>=1):G.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),F=Y>=2);let $=null,it={};const rt=i.getParameter(i.SCISSOR_BOX),gt=i.getParameter(i.VIEWPORT),zt=new te().fromArray(rt),X=new te().fromArray(gt);function Q(L,st,j,J){const dt=new Uint8Array(4),ct=i.createTexture();i.bindTexture(L,ct),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<j;Pt++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(st,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(st+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ct}const ft={};ft[i.TEXTURE_2D]=Q(i.TEXTURE_2D,i.TEXTURE_2D,1),ft[i.TEXTURE_CUBE_MAP]=Q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[i.TEXTURE_2D_ARRAY]=Q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ft[i.TEXTURE_3D]=Q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ot(i.DEPTH_TEST),s.setFunc(Kn),Ot(!1),Bt(il),ot(i.CULL_FACE),U(Zi);function ot(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function Et(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function Ct(L,st){return d[L]!==st?(i.bindFramebuffer(L,st),d[L]=st,L===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=st),L===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=st),!0):!1}function Ft(L,st){let j=m,J=!1;if(L){j=f.get(st),j===void 0&&(j=[],f.set(st,j));const dt=L.textures;if(j.length!==dt.length||j[0]!==i.COLOR_ATTACHMENT0){for(let ct=0,Pt=dt.length;ct<Pt;ct++)j[ct]=i.COLOR_ATTACHMENT0+ct;j.length=dt.length,J=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,J=!0);J&&i.drawBuffers(j)}function ce(L){return g!==L?(i.useProgram(L),g=L,!0):!1}const Vt={[un]:i.FUNC_ADD,[Ah]:i.FUNC_SUBTRACT,[Rh]:i.FUNC_REVERSE_SUBTRACT};Vt[Ch]=i.MIN,Vt[Ph]=i.MAX;const ue={[Lh]:i.ZERO,[Dh]:i.ONE,[Ih]:i.SRC_COLOR,[ps]:i.SRC_ALPHA,[Oh]:i.SRC_ALPHA_SATURATE,[Nh]:i.DST_COLOR,[kh]:i.DST_ALPHA,[Uh]:i.ONE_MINUS_SRC_COLOR,[ms]:i.ONE_MINUS_SRC_ALPHA,[Fh]:i.ONE_MINUS_DST_COLOR,[zh]:i.ONE_MINUS_DST_ALPHA,[Bh]:i.CONSTANT_COLOR,[Hh]:i.ONE_MINUS_CONSTANT_COLOR,[Vh]:i.CONSTANT_ALPHA,[Gh]:i.ONE_MINUS_CONSTANT_ALPHA};function U(L,st,j,J,dt,ct,Pt,he,Me,Kt){if(L===Zi){w===!0&&(Et(i.BLEND),w=!1);return}if(w===!1&&(ot(i.BLEND),w=!0),L!==Th){if(L!==p||Kt!==M){if((u!==un||b!==un)&&(i.blendEquation(i.FUNC_ADD),u=un,b=un),Kt)switch(L){case qn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Aa:i.blendFunc(i.ONE,i.ONE);break;case nl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case al:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case qn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Aa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case nl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case al:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}y=null,S=null,k=null,A=null,T.set(0,0,0),C=0,p=L,M=Kt}return}dt=dt||st,ct=ct||j,Pt=Pt||J,(st!==u||dt!==b)&&(i.blendEquationSeparate(Vt[st],Vt[dt]),u=st,b=dt),(j!==y||J!==S||ct!==k||Pt!==A)&&(i.blendFuncSeparate(ue[j],ue[J],ue[ct],ue[Pt]),y=j,S=J,k=ct,A=Pt),(he.equals(T)===!1||Me!==C)&&(i.blendColor(he.r,he.g,he.b,Me),T.copy(he),C=Me),p=L,M=!1}function qe(L,st){L.side===ui?Et(i.CULL_FACE):ot(i.CULL_FACE);let j=L.side===Ie;st&&(j=!j),Ot(j),L.blending===qn&&L.transparent===!1?U(Zi):U(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),r.setMask(L.colorWrite);const J=L.stencilWrite;o.setTest(J),J&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ne(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):Et(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(L){_!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),_=L)}function Bt(L){L!==yh?(ot(i.CULL_FACE),L!==R&&(L===il?i.cullFace(i.BACK):L===Sh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Et(i.CULL_FACE),R=L}function yt(L){L!==V&&(F&&i.lineWidth(L),V=L)}function ne(L,st,j){L?(ot(i.POLYGON_OFFSET_FILL),(B!==st||N!==j)&&(i.polygonOffset(st,j),B=st,N=j)):Et(i.POLYGON_OFFSET_FILL)}function Mt(L){L?ot(i.SCISSOR_TEST):Et(i.SCISSOR_TEST)}function E(L){L===void 0&&(L=i.TEXTURE0+W-1),$!==L&&(i.activeTexture(L),$=L)}function v(L,st,j){j===void 0&&($===null?j=i.TEXTURE0+W-1:j=$);let J=it[j];J===void 0&&(J={type:void 0,texture:void 0},it[j]=J),(J.type!==L||J.texture!==st)&&($!==j&&(i.activeTexture(j),$=j),i.bindTexture(L,st||ft[L]),J.type=L,J.texture=st)}function z(){const L=it[$];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function q(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function wt(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ut(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Gt(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pt(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function St(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function At(L){zt.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),zt.copy(L))}function mt(L){X.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),X.copy(L))}function Ht(L,st){let j=c.get(st);j===void 0&&(j=new WeakMap,c.set(st,j));let J=j.get(L);J===void 0&&(J=i.getUniformBlockIndex(st,L.name),j.set(L,J))}function Ut(L,st){const J=c.get(st).get(L);l.get(st)!==J&&(i.uniformBlockBinding(st,J,L.__bindingPointIndex),l.set(st,J))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},$=null,it={},d={},f=new WeakMap,m=[],g=null,w=!1,p=null,u=null,y=null,S=null,b=null,k=null,A=null,T=new It(0,0,0),C=0,M=!1,_=null,R=null,V=null,B=null,N=null,zt.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:ot,disable:Et,bindFramebuffer:Ct,drawBuffers:Ft,useProgram:ce,setBlending:U,setMaterial:qe,setFlipSided:Ot,setCullFace:Bt,setLineWidth:yt,setPolygonOffset:ne,setScissorTest:Mt,activeTexture:E,bindTexture:v,unbindTexture:z,compressedTexImage2D:Z,compressedTexImage3D:K,texImage2D:pt,texImage3D:St,updateUBOMapping:Ht,uniformBlockBinding:Ut,texStorage2D:Gt,texStorage3D:tt,texSubImage2D:q,texSubImage3D:wt,compressedTexSubImage2D:lt,compressedTexSubImage3D:ut,scissor:At,viewport:mt,reset:ee}}function Kl(i,t,e,n){const a=fm(n);switch(e){case Sc:return i*t;case Tc:return i*t;case Ac:return i*t*2;case Rc:return i*t/a.components*a.byteLength;case fo:return i*t/a.components*a.byteLength;case Cc:return i*t*2/a.components*a.byteLength;case uo:return i*t*2/a.components*a.byteLength;case Ec:return i*t*3/a.components*a.byteLength;case oi:return i*t*4/a.components*a.byteLength;case po:return i*t*4/a.components*a.byteLength;case cr:case hr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case dr:case fr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case As:case Cs:return Math.max(i,16)*Math.max(t,8)/4;case Ts:case Rs:return Math.max(i,8)*Math.max(t,8)/2;case Ps:case Ls:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ds:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Is:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Us:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ks:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case zs:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ns:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Fs:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Os:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Bs:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Hs:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Vs:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Gs:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ws:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case js:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Xs:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ur:case qs:case Ys:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Pc:case $s:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Zs:case Js:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function fm(i){switch(i){case Ui:case bc:return{byteLength:1,components:1};case Ca:case Mc:case Da:return{byteLength:2,components:1};case co:case ho:return{byteLength:2,components:4};case _n:case lo:case Ci:return{byteLength:4,components:1};case yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function um(i,t,e,n,a,r,s){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Nt,h=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return m?new OffscreenCanvas(E,v):Pa("canvas")}function w(E,v,z){let Z=1;const K=Mt(E);if((K.width>z||K.height>z)&&(Z=z/Math.max(K.width,K.height)),Z<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const q=Math.floor(Z*K.width),wt=Math.floor(Z*K.height);d===void 0&&(d=g(q,wt));const lt=v?g(q,wt):d;return lt.width=q,lt.height=wt,lt.getContext("2d").drawImage(E,0,0,q,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+q+"x"+wt+")."),lt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function p(E){return E.generateMipmaps}function u(E){i.generateMipmap(E)}function y(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(E,v,z,Z,K=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let q=v;if(v===i.RED&&(z===i.FLOAT&&(q=i.R32F),z===i.HALF_FLOAT&&(q=i.R16F),z===i.UNSIGNED_BYTE&&(q=i.R8)),v===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.R8UI),z===i.UNSIGNED_SHORT&&(q=i.R16UI),z===i.UNSIGNED_INT&&(q=i.R32UI),z===i.BYTE&&(q=i.R8I),z===i.SHORT&&(q=i.R16I),z===i.INT&&(q=i.R32I)),v===i.RG&&(z===i.FLOAT&&(q=i.RG32F),z===i.HALF_FLOAT&&(q=i.RG16F),z===i.UNSIGNED_BYTE&&(q=i.RG8)),v===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RG8UI),z===i.UNSIGNED_SHORT&&(q=i.RG16UI),z===i.UNSIGNED_INT&&(q=i.RG32UI),z===i.BYTE&&(q=i.RG8I),z===i.SHORT&&(q=i.RG16I),z===i.INT&&(q=i.RG32I)),v===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGB8UI),z===i.UNSIGNED_SHORT&&(q=i.RGB16UI),z===i.UNSIGNED_INT&&(q=i.RGB32UI),z===i.BYTE&&(q=i.RGB8I),z===i.SHORT&&(q=i.RGB16I),z===i.INT&&(q=i.RGB32I)),v===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),z===i.UNSIGNED_INT&&(q=i.RGBA32UI),z===i.BYTE&&(q=i.RGBA8I),z===i.SHORT&&(q=i.RGBA16I),z===i.INT&&(q=i.RGBA32I)),v===i.RGB&&z===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),v===i.RGBA){const wt=K?Mr:Wt.getTransfer(Z);z===i.FLOAT&&(q=i.RGBA32F),z===i.HALF_FLOAT&&(q=i.RGBA16F),z===i.UNSIGNED_BYTE&&(q=wt===Qt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function b(E,v){let z;return E?v===null||v===_n||v===ea?z=i.DEPTH24_STENCIL8:v===Ci?z=i.DEPTH32F_STENCIL8:v===Ca&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===_n||v===ea?z=i.DEPTH_COMPONENT24:v===Ci?z=i.DEPTH_COMPONENT32F:v===Ca&&(z=i.DEPTH_COMPONENT16),z}function k(E,v){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==Fe&&E.minFilter!==Je?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function A(E){const v=E.target;v.removeEventListener("dispose",A),C(v),v.isVideoTexture&&h.delete(v)}function T(E){const v=E.target;v.removeEventListener("dispose",T),_(v)}function C(E){const v=n.get(E);if(v.__webglInit===void 0)return;const z=E.source,Z=f.get(z);if(Z){const K=Z[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&M(E),Object.keys(Z).length===0&&f.delete(z)}n.remove(E)}function M(E){const v=n.get(E);i.deleteTexture(v.__webglTexture);const z=E.source,Z=f.get(z);delete Z[v.__cacheKey],s.memory.textures--}function _(E){const v=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let K=0;K<v.__webglFramebuffer[Z].length;K++)i.deleteFramebuffer(v.__webglFramebuffer[Z][K]);else i.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[Z]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const z=E.textures;for(let Z=0,K=z.length;Z<K;Z++){const q=n.get(z[Z]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),s.memory.textures--),n.remove(z[Z])}n.remove(E)}let R=0;function V(){R=0}function B(){const E=R;return E>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+a.maxTextures),R+=1,E}function N(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function W(E,v){const z=n.get(E);if(E.isVideoTexture&&yt(E),E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){const Z=E.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(z,E,v);return}}e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+v)}function F(E,v){const z=n.get(E);if(E.version>0&&z.__version!==E.version){X(z,E,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+v)}function Y(E,v){const z=n.get(E);if(E.version>0&&z.__version!==E.version){X(z,E,v);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+v)}function G(E,v){const z=n.get(E);if(E.version>0&&z.__version!==E.version){Q(z,E,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+v)}const $={[Ra]:i.REPEAT,[mi]:i.CLAMP_TO_EDGE,[Es]:i.MIRRORED_REPEAT},it={[Fe]:i.NEAREST,[Qh]:i.NEAREST_MIPMAP_NEAREST,[Ha]:i.NEAREST_MIPMAP_LINEAR,[Je]:i.LINEAR,[Dr]:i.LINEAR_MIPMAP_NEAREST,[Ri]:i.LINEAR_MIPMAP_LINEAR},rt={[nd]:i.NEVER,[cd]:i.ALWAYS,[ad]:i.LESS,[Dc]:i.LEQUAL,[rd]:i.EQUAL,[ld]:i.GEQUAL,[sd]:i.GREATER,[od]:i.NOTEQUAL};function gt(E,v){if(v.type===Ci&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Je||v.magFilter===Dr||v.magFilter===Ha||v.magFilter===Ri||v.minFilter===Je||v.minFilter===Dr||v.minFilter===Ha||v.minFilter===Ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,$[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,$[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,$[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,it[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,it[v.minFilter]),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,rt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Fe||v.minFilter!==Ha&&v.minFilter!==Ri||v.type===Ci&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,a.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function zt(E,v){let z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",A));const Z=v.source;let K=f.get(Z);K===void 0&&(K={},f.set(Z,K));const q=N(v);if(q!==E.__cacheKey){K[q]===void 0&&(K[q]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,z=!0),K[q].usedTimes++;const wt=K[E.__cacheKey];wt!==void 0&&(K[E.__cacheKey].usedTimes--,wt.usedTimes===0&&M(v)),E.__cacheKey=q,E.__webglTexture=K[q].texture}return z}function X(E,v,z){let Z=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=i.TEXTURE_3D);const K=zt(E,v),q=v.source;e.bindTexture(Z,E.__webglTexture,i.TEXTURE0+z);const wt=n.get(q);if(q.version!==wt.__version||K===!0){e.activeTexture(i.TEXTURE0+z);const lt=Wt.getPrimaries(Wt.workingColorSpace),ut=v.colorSpace===Yi?null:Wt.getPrimaries(v.colorSpace),Gt=v.colorSpace===Yi||lt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);let tt=w(v.image,!1,a.maxTextureSize);tt=ne(v,tt);const pt=r.convert(v.format,v.colorSpace),St=r.convert(v.type);let At=S(v.internalFormat,pt,St,v.colorSpace,v.isVideoTexture);gt(Z,v);let mt;const Ht=v.mipmaps,Ut=v.isVideoTexture!==!0,ee=wt.__version===void 0||K===!0,L=q.dataReady,st=k(v,tt);if(v.isDepthTexture)At=b(v.format===ia,v.type),ee&&(Ut?e.texStorage2D(i.TEXTURE_2D,1,At,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,At,tt.width,tt.height,0,pt,St,null));else if(v.isDataTexture)if(Ht.length>0){Ut&&ee&&e.texStorage2D(i.TEXTURE_2D,st,At,Ht[0].width,Ht[0].height);for(let j=0,J=Ht.length;j<J;j++)mt=Ht[j],Ut?L&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,mt.width,mt.height,pt,St,mt.data):e.texImage2D(i.TEXTURE_2D,j,At,mt.width,mt.height,0,pt,St,mt.data);v.generateMipmaps=!1}else Ut?(ee&&e.texStorage2D(i.TEXTURE_2D,st,At,tt.width,tt.height),L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt.width,tt.height,pt,St,tt.data)):e.texImage2D(i.TEXTURE_2D,0,At,tt.width,tt.height,0,pt,St,tt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ut&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,st,At,Ht[0].width,Ht[0].height,tt.depth);for(let j=0,J=Ht.length;j<J;j++)if(mt=Ht[j],v.format!==oi)if(pt!==null)if(Ut){if(L)if(v.layerUpdates.size>0){const dt=Kl(mt.width,mt.height,v.format,v.type);for(const ct of v.layerUpdates){const Pt=mt.data.subarray(ct*dt/mt.data.BYTES_PER_ELEMENT,(ct+1)*dt/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,ct,mt.width,mt.height,1,pt,Pt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,mt.width,mt.height,tt.depth,pt,mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,At,mt.width,mt.height,tt.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?L&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,mt.width,mt.height,tt.depth,pt,St,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,At,mt.width,mt.height,tt.depth,0,pt,St,mt.data)}else{Ut&&ee&&e.texStorage2D(i.TEXTURE_2D,st,At,Ht[0].width,Ht[0].height);for(let j=0,J=Ht.length;j<J;j++)mt=Ht[j],v.format!==oi?pt!==null?Ut?L&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,j,At,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?L&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,mt.width,mt.height,pt,St,mt.data):e.texImage2D(i.TEXTURE_2D,j,At,mt.width,mt.height,0,pt,St,mt.data)}else if(v.isDataArrayTexture)if(Ut){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,st,At,tt.width,tt.height,tt.depth),L)if(v.layerUpdates.size>0){const j=Kl(tt.width,tt.height,v.format,v.type);for(const J of v.layerUpdates){const dt=tt.data.subarray(J*j/tt.data.BYTES_PER_ELEMENT,(J+1)*j/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,tt.width,tt.height,1,pt,St,dt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,pt,St,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,At,tt.width,tt.height,tt.depth,0,pt,St,tt.data);else if(v.isData3DTexture)Ut?(ee&&e.texStorage3D(i.TEXTURE_3D,st,At,tt.width,tt.height,tt.depth),L&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,pt,St,tt.data)):e.texImage3D(i.TEXTURE_3D,0,At,tt.width,tt.height,tt.depth,0,pt,St,tt.data);else if(v.isFramebufferTexture){if(ee)if(Ut)e.texStorage2D(i.TEXTURE_2D,st,At,tt.width,tt.height);else{let j=tt.width,J=tt.height;for(let dt=0;dt<st;dt++)e.texImage2D(i.TEXTURE_2D,dt,At,j,J,0,pt,St,null),j>>=1,J>>=1}}else if(Ht.length>0){if(Ut&&ee){const j=Mt(Ht[0]);e.texStorage2D(i.TEXTURE_2D,st,At,j.width,j.height)}for(let j=0,J=Ht.length;j<J;j++)mt=Ht[j],Ut?L&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,pt,St,mt):e.texImage2D(i.TEXTURE_2D,j,At,pt,St,mt);v.generateMipmaps=!1}else if(Ut){if(ee){const j=Mt(tt);e.texStorage2D(i.TEXTURE_2D,st,At,j.width,j.height)}L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt,St,tt)}else e.texImage2D(i.TEXTURE_2D,0,At,pt,St,tt);p(v)&&u(Z),wt.__version=q.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Q(E,v,z){if(v.image.length!==6)return;const Z=zt(E,v),K=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+z);const q=n.get(K);if(K.version!==q.__version||Z===!0){e.activeTexture(i.TEXTURE0+z);const wt=Wt.getPrimaries(Wt.workingColorSpace),lt=v.colorSpace===Yi?null:Wt.getPrimaries(v.colorSpace),ut=v.colorSpace===Yi||wt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);const Gt=v.isCompressedTexture||v.image[0].isCompressedTexture,tt=v.image[0]&&v.image[0].isDataTexture,pt=[];for(let J=0;J<6;J++)!Gt&&!tt?pt[J]=w(v.image[J],!0,a.maxCubemapSize):pt[J]=tt?v.image[J].image:v.image[J],pt[J]=ne(v,pt[J]);const St=pt[0],At=r.convert(v.format,v.colorSpace),mt=r.convert(v.type),Ht=S(v.internalFormat,At,mt,v.colorSpace),Ut=v.isVideoTexture!==!0,ee=q.__version===void 0||Z===!0,L=K.dataReady;let st=k(v,St);gt(i.TEXTURE_CUBE_MAP,v);let j;if(Gt){Ut&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,st,Ht,St.width,St.height);for(let J=0;J<6;J++){j=pt[J].mipmaps;for(let dt=0;dt<j.length;dt++){const ct=j[dt];v.format!==oi?At!==null?Ut?L&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,0,0,ct.width,ct.height,At,ct.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,Ht,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,0,0,ct.width,ct.height,At,mt,ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,Ht,ct.width,ct.height,0,At,mt,ct.data)}}}else{if(j=v.mipmaps,Ut&&ee){j.length>0&&st++;const J=Mt(pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,st,Ht,J.width,J.height)}for(let J=0;J<6;J++)if(tt){Ut?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,pt[J].width,pt[J].height,At,mt,pt[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ht,pt[J].width,pt[J].height,0,At,mt,pt[J].data);for(let dt=0;dt<j.length;dt++){const Pt=j[dt].image[J].image;Ut?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,0,0,Pt.width,Pt.height,At,mt,Pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,Ht,Pt.width,Pt.height,0,At,mt,Pt.data)}}else{Ut?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,At,mt,pt[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ht,At,mt,pt[J]);for(let dt=0;dt<j.length;dt++){const ct=j[dt];Ut?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,0,0,At,mt,ct.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,Ht,At,mt,ct.image[J])}}}p(v)&&u(i.TEXTURE_CUBE_MAP),q.__version=K.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ft(E,v,z,Z,K,q){const wt=r.convert(z.format,z.colorSpace),lt=r.convert(z.type),ut=S(z.internalFormat,wt,lt,z.colorSpace),Gt=n.get(v),tt=n.get(z);if(tt.__renderTarget=v,!Gt.__hasExternalTextures){const pt=Math.max(1,v.width>>q),St=Math.max(1,v.height>>q);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,q,ut,pt,St,v.depth,0,wt,lt,null):e.texImage2D(K,q,ut,pt,St,0,wt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),Bt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,K,tt.__webglTexture,0,Ot(v)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,K,tt.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(E,v,z){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer){const Z=v.depthTexture,K=Z&&Z.isDepthTexture?Z.type:null,q=b(v.stencilBuffer,K),wt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=Ot(v);Bt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,q,v.width,v.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,q,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,q,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,wt,i.RENDERBUFFER,E)}else{const Z=v.textures;for(let K=0;K<Z.length;K++){const q=Z[K],wt=r.convert(q.format,q.colorSpace),lt=r.convert(q.type),ut=S(q.internalFormat,wt,lt,q.colorSpace),Gt=Ot(v);z&&Bt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,ut,v.width,v.height):Bt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt,ut,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ut,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Et(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(v.depthTexture);Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const K=Z.__webglTexture,q=Ot(v);if(v.depthTexture.format===Yn)Bt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(v.depthTexture.format===ia)Bt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ct(E){const v=n.get(E),z=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const Z=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",K)};Z.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=Z}if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Et(v.__webglFramebuffer,E)}else if(z){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=i.createRenderbuffer(),ot(v.__webglDepthbuffer[Z],E,!1);else{const K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,q)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),ot(v.__webglDepthbuffer,E,!1);else{const Z=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,K)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(E,v,z){const Z=n.get(E);v!==void 0&&ft(Z.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ct(E)}function ce(E){const v=E.texture,z=n.get(E),Z=n.get(v);E.addEventListener("dispose",T);const K=E.textures,q=E.isWebGLCubeRenderTarget===!0,wt=K.length>1;if(wt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=v.version,s.memory.textures++),q){z.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer[lt]=[];for(let ut=0;ut<v.mipmaps.length;ut++)z.__webglFramebuffer[lt][ut]=i.createFramebuffer()}else z.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer=[];for(let lt=0;lt<v.mipmaps.length;lt++)z.__webglFramebuffer[lt]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(wt)for(let lt=0,ut=K.length;lt<ut;lt++){const Gt=n.get(K[lt]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=i.createTexture(),s.memory.textures++)}if(E.samples>0&&Bt(E)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let lt=0;lt<K.length;lt++){const ut=K[lt];z.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[lt]);const Gt=r.convert(ut.format,ut.colorSpace),tt=r.convert(ut.type),pt=S(ut.internalFormat,Gt,tt,ut.colorSpace,E.isXRRenderTarget===!0),St=Ot(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,St,pt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,z.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(z.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),gt(i.TEXTURE_CUBE_MAP,v);for(let lt=0;lt<6;lt++)if(v.mipmaps&&v.mipmaps.length>0)for(let ut=0;ut<v.mipmaps.length;ut++)ft(z.__webglFramebuffer[lt][ut],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,ut);else ft(z.__webglFramebuffer[lt],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);p(v)&&u(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let lt=0,ut=K.length;lt<ut;lt++){const Gt=K[lt],tt=n.get(Gt);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture),gt(i.TEXTURE_2D,Gt),ft(z.__webglFramebuffer,E,Gt,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),p(Gt)&&u(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(lt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,Z.__webglTexture),gt(lt,v),v.mipmaps&&v.mipmaps.length>0)for(let ut=0;ut<v.mipmaps.length;ut++)ft(z.__webglFramebuffer[ut],E,v,i.COLOR_ATTACHMENT0,lt,ut);else ft(z.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,lt,0);p(v)&&u(lt),e.unbindTexture()}E.depthBuffer&&Ct(E)}function Vt(E){const v=E.textures;for(let z=0,Z=v.length;z<Z;z++){const K=v[z];if(p(K)){const q=y(E),wt=n.get(K).__webglTexture;e.bindTexture(q,wt),u(q),e.unbindTexture()}}}const ue=[],U=[];function qe(E){if(E.samples>0){if(Bt(E)===!1){const v=E.textures,z=E.width,Z=E.height;let K=i.COLOR_BUFFER_BIT;const q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,wt=n.get(E),lt=v.length>1;if(lt)for(let ut=0;ut<v.length;ut++)e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let ut=0;ut<v.length;ut++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,wt.__webglColorRenderbuffer[ut]);const Gt=n.get(v[ut]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Gt,0)}i.blitFramebuffer(0,0,z,Z,0,0,z,Z,K,i.NEAREST),l===!0&&(ue.length=0,U.length=0,ue.push(i.COLOR_ATTACHMENT0+ut),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ue.push(q),U.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let ut=0;ut<v.length;ut++){e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,wt.__webglColorRenderbuffer[ut]);const Gt=n.get(v[ut]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,Gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const v=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Ot(E){return Math.min(a.maxSamples,E.samples)}function Bt(E){const v=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function yt(E){const v=s.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function ne(E,v){const z=E.colorSpace,Z=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||z!==sa&&z!==Yi&&(Wt.getTransfer(z)===Qt?(Z!==oi||K!==Ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),v}function Mt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=V,this.setTexture2D=W,this.setTexture2DArray=F,this.setTexture3D=Y,this.setTextureCube=G,this.rebindTextures=Ft,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=qe,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=Bt}function pm(i,t){function e(n,a=Yi){let r;const s=Wt.getTransfer(a);if(n===Ui)return i.UNSIGNED_BYTE;if(n===co)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ho)return i.UNSIGNED_SHORT_5_5_5_1;if(n===yc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===bc)return i.BYTE;if(n===Mc)return i.SHORT;if(n===Ca)return i.UNSIGNED_SHORT;if(n===lo)return i.INT;if(n===_n)return i.UNSIGNED_INT;if(n===Ci)return i.FLOAT;if(n===Da)return i.HALF_FLOAT;if(n===Sc)return i.ALPHA;if(n===Ec)return i.RGB;if(n===oi)return i.RGBA;if(n===Tc)return i.LUMINANCE;if(n===Ac)return i.LUMINANCE_ALPHA;if(n===Yn)return i.DEPTH_COMPONENT;if(n===ia)return i.DEPTH_STENCIL;if(n===Rc)return i.RED;if(n===fo)return i.RED_INTEGER;if(n===Cc)return i.RG;if(n===uo)return i.RG_INTEGER;if(n===po)return i.RGBA_INTEGER;if(n===cr||n===hr||n===dr||n===fr)if(s===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===cr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===cr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ts||n===As||n===Rs||n===Cs)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ts)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===As)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Rs)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Cs)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ps||n===Ls||n===Ds)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ps||n===Ls)return s===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ds)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Is||n===Us||n===ks||n===zs||n===Ns||n===Fs||n===Os||n===Bs||n===Hs||n===Vs||n===Gs||n===Ws||n===js||n===Xs)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Is)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Us)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ks)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===zs)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ns)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fs)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Os)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bs)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Hs)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Vs)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Gs)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ws)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===js)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xs)return s===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ur||n===qs||n===Ys)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ur)return s===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qs)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ys)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Pc||n===$s||n===Zs||n===Js)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ur)return r.COMPRESSED_RED_RGTC1_EXT;if(n===$s)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Zs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Js)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ea?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class mm extends Te{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class We extends me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gm={type:"move"};class os{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new We,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new We,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new We,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let a=null,r=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){s=!0;for(const w of t.hand.values()){const p=e.getJointPose(w,n),u=this._getHandJoint(c,w);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=e.getPose(t.targetRaySpace,n),a===null&&r!==null&&(a=r),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gm)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new We;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const vm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_m=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const a=new Re,r=t.properties.get(a);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Qe({vertexShader:vm,fragmentShader:_m,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Tt(new fe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wm extends yn{constructor(t,e){super();const n=this;let a=null,r=1,s=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,m=null,g=null;const w=new xm,p=e.getContextAttributes();let u=null,y=null;const S=[],b=[],k=new Nt;let A=null;const T=new Te;T.viewport=new te;const C=new Te;C.viewport=new te;const M=[T,C],_=new mm;let R=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=S[X];return Q===void 0&&(Q=new os,S[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=S[X];return Q===void 0&&(Q=new os,S[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=S[X];return Q===void 0&&(Q=new os,S[X]=Q),Q.getHandSpace()};function B(X){const Q=b.indexOf(X.inputSource);if(Q===-1)return;const ft=S[Q];ft!==void 0&&(ft.update(X.inputSource,X.frame,c||s),ft.dispatchEvent({type:X.type,data:X.inputSource}))}function N(){a.removeEventListener("select",B),a.removeEventListener("selectstart",B),a.removeEventListener("selectend",B),a.removeEventListener("squeeze",B),a.removeEventListener("squeezestart",B),a.removeEventListener("squeezeend",B),a.removeEventListener("end",N),a.removeEventListener("inputsourceschange",W);for(let X=0;X<S.length;X++){const Q=b[X];Q!==null&&(b[X]=null,S[X].disconnect(Q))}R=null,V=null,w.reset(),t.setRenderTarget(u),m=null,f=null,d=null,a=null,y=null,zt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(X){if(a=X,a!==null){if(u=t.getRenderTarget(),a.addEventListener("select",B),a.addEventListener("selectstart",B),a.addEventListener("selectend",B),a.addEventListener("squeeze",B),a.addEventListener("squeezestart",B),a.addEventListener("squeezeend",B),a.addEventListener("end",N),a.addEventListener("inputsourceschange",W),p.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(k),a.renderState.layers===void 0){const Q={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(a,e,Q),a.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new xn(m.framebufferWidth,m.framebufferHeight,{format:oi,type:Ui,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let Q=null,ft=null,ot=null;p.depth&&(ot=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=p.stencil?ia:Yn,ft=p.stencil?ea:_n);const Et={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};d=new XRWebGLBinding(a,e),f=d.createProjectionLayer(Et),a.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new xn(f.textureWidth,f.textureHeight,{format:oi,type:Ui,depthTexture:new Wc(f.textureWidth,f.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await a.requestReferenceSpace(o),zt.setContext(a),zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function W(X){for(let Q=0;Q<X.removed.length;Q++){const ft=X.removed[Q],ot=b.indexOf(ft);ot>=0&&(b[ot]=null,S[ot].disconnect(ft))}for(let Q=0;Q<X.added.length;Q++){const ft=X.added[Q];let ot=b.indexOf(ft);if(ot===-1){for(let Ct=0;Ct<S.length;Ct++)if(Ct>=b.length){b.push(ft),ot=Ct;break}else if(b[Ct]===null){b[Ct]=ft,ot=Ct;break}if(ot===-1)break}const Et=S[ot];Et&&Et.connect(ft)}}const F=new P,Y=new P;function G(X,Q,ft){F.setFromMatrixPosition(Q.matrixWorld),Y.setFromMatrixPosition(ft.matrixWorld);const ot=F.distanceTo(Y),Et=Q.projectionMatrix.elements,Ct=ft.projectionMatrix.elements,Ft=Et[14]/(Et[10]-1),ce=Et[14]/(Et[10]+1),Vt=(Et[9]+1)/Et[5],ue=(Et[9]-1)/Et[5],U=(Et[8]-1)/Et[0],qe=(Ct[8]+1)/Ct[0],Ot=Ft*U,Bt=Ft*qe,yt=ot/(-U+qe),ne=yt*-U;if(Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(ne),X.translateZ(yt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Et[10]===-1)X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const Mt=Ft+yt,E=ce+yt,v=Ot-ne,z=Bt+(ot-ne),Z=Vt*ce/E*Mt,K=ue*ce/E*Mt;X.projectionMatrix.makePerspective(v,z,Z,K,Mt,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function $(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(a===null)return;let Q=X.near,ft=X.far;w.texture!==null&&(w.depthNear>0&&(Q=w.depthNear),w.depthFar>0&&(ft=w.depthFar)),_.near=C.near=T.near=Q,_.far=C.far=T.far=ft,(R!==_.near||V!==_.far)&&(a.updateRenderState({depthNear:_.near,depthFar:_.far}),R=_.near,V=_.far),T.layers.mask=X.layers.mask|2,C.layers.mask=X.layers.mask|4,_.layers.mask=T.layers.mask|C.layers.mask;const ot=X.parent,Et=_.cameras;$(_,ot);for(let Ct=0;Ct<Et.length;Ct++)$(Et[Ct],ot);Et.length===2?G(_,T,C):_.projectionMatrix.copy(T.projectionMatrix),it(X,_,ot)};function it(X,Q,ft){ft===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(ft.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=xr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(_)};let rt=null;function gt(X,Q){if(h=Q.getViewerPose(c||s),g=Q,h!==null){const ft=h.views;m!==null&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y));let ot=!1;ft.length!==_.cameras.length&&(_.cameras.length=0,ot=!0);for(let Ct=0;Ct<ft.length;Ct++){const Ft=ft[Ct];let ce=null;if(m!==null)ce=m.getViewport(Ft);else{const ue=d.getViewSubImage(f,Ft);ce=ue.viewport,Ct===0&&(t.setRenderTargetTextures(y,ue.colorTexture,f.ignoreDepthValues?void 0:ue.depthStencilTexture),t.setRenderTarget(y))}let Vt=M[Ct];Vt===void 0&&(Vt=new Te,Vt.layers.enable(Ct),Vt.viewport=new te,M[Ct]=Vt),Vt.matrix.fromArray(Ft.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Ft.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(ce.x,ce.y,ce.width,ce.height),Ct===0&&(_.matrix.copy(Vt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ot===!0&&_.cameras.push(Vt)}const Et=a.enabledFeatures;if(Et&&Et.includes("depth-sensing")){const Ct=d.getDepthInformation(ft[0]);Ct&&Ct.isValid&&Ct.texture&&w.init(t,Ct,a.renderState)}}for(let ft=0;ft<S.length;ft++){const ot=b[ft],Et=S[ft];ot!==null&&Et!==void 0&&Et.update(ot,Q,c||s)}rt&&rt(X,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const zt=new Gc;zt.setAnimationLoop(gt),this.setAnimationLoop=function(X){rt=X},this.dispose=function(){}}}const cn=new Pe,bm=new le;function Mm(i,t){function e(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,Bc(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function a(p,u,y,S,b){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(p,u):u.isMeshToonMaterial?(r(p,u),d(p,u)):u.isMeshPhongMaterial?(r(p,u),h(p,u)):u.isMeshStandardMaterial?(r(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,b)):u.isMeshMatcapMaterial?(r(p,u),g(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),w(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(s(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?l(p,u,y,S):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,e(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Ie&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,e(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Ie&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,e(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,e(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const y=t.get(u),S=y.envMap,b=y.envMapRotation;S&&(p.envMap.value=S,cn.copy(b),cn.x*=-1,cn.y*=-1,cn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(cn.y*=-1,cn.z*=-1),p.envMapRotation.value.setFromMatrix4(bm.makeRotationFromEuler(cn)),p.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap&&(p.lightMap.value=u.lightMap,p.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,p.lightMapTransform)),u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,p.aoMapTransform))}function s(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,y,S){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*y,p.scale.value=S*.5,u.map&&(p.map.value=u.map,e(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function d(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,p.roughnessMapTransform)),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,y){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ie&&p.clearcoatNormalScale.value.negate())),u.dispersion>0&&(p.dispersion.value=u.dispersion),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function w(p,u){const y=t.get(u).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:a}}function ym(i,t,e,n){let a={},r={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,S){const b=S.program;n.uniformBlockBinding(y,b)}function c(y,S){let b=a[y.id];b===void 0&&(g(y),b=h(y),a[y.id]=b,y.addEventListener("dispose",p));const k=S.program;n.updateUBOMapping(y,k);const A=t.render.frame;r[y.id]!==A&&(f(y),r[y.id]=A)}function h(y){const S=d();y.__bindingPointIndex=S;const b=i.createBuffer(),k=y.__size,A=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,k,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,b),b}function d(){for(let y=0;y<o;y++)if(s.indexOf(y)===-1)return s.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const S=a[y.id],b=y.uniforms,k=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let A=0,T=b.length;A<T;A++){const C=Array.isArray(b[A])?b[A]:[b[A]];for(let M=0,_=C.length;M<_;M++){const R=C[M];if(m(R,A,M,k)===!0){const V=R.__offset,B=Array.isArray(R.value)?R.value:[R.value];let N=0;for(let W=0;W<B.length;W++){const F=B[W],Y=w(F);typeof F=="number"||typeof F=="boolean"?(R.__data[0]=F,i.bufferSubData(i.UNIFORM_BUFFER,V+N,R.__data)):F.isMatrix3?(R.__data[0]=F.elements[0],R.__data[1]=F.elements[1],R.__data[2]=F.elements[2],R.__data[3]=0,R.__data[4]=F.elements[3],R.__data[5]=F.elements[4],R.__data[6]=F.elements[5],R.__data[7]=0,R.__data[8]=F.elements[6],R.__data[9]=F.elements[7],R.__data[10]=F.elements[8],R.__data[11]=0):(F.toArray(R.__data,N),N+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(y,S,b,k){const A=y.value,T=S+"_"+b;if(k[T]===void 0)return typeof A=="number"||typeof A=="boolean"?k[T]=A:k[T]=A.clone(),!0;{const C=k[T];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return k[T]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function g(y){const S=y.uniforms;let b=0;const k=16;for(let T=0,C=S.length;T<C;T++){const M=Array.isArray(S[T])?S[T]:[S[T]];for(let _=0,R=M.length;_<R;_++){const V=M[_],B=Array.isArray(V.value)?V.value:[V.value];for(let N=0,W=B.length;N<W;N++){const F=B[N],Y=w(F),G=b%k,$=G%Y.boundary,it=G+$;b+=$,it!==0&&k-it<Y.storage&&(b+=k-it),V.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=b,b+=Y.storage}}}const A=b%k;return A>0&&(b+=k-A),y.__size=b,y.__cache={},this}function w(y){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),S}function p(y){const S=y.target;S.removeEventListener("dispose",p);const b=s.indexOf(S.__bindingPointIndex);s.splice(b,1),i.deleteBuffer(a[S.id]),delete a[S.id],delete r[S.id]}function u(){for(const y in a)i.deleteBuffer(a[y]);s=[],a={},r={}}return{bind:l,update:c,dispose:u}}class Sm{constructor(t={}){const{canvas:e=dd(),context:n=null,depth:a=!0,stencil:r=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=s;const g=new Uint32Array(4),w=new Int32Array(4);let p=null,u=null;const y=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=we,this.toneMapping=Ji,this.toneMappingExposure=1;const b=this;let k=!1,A=0,T=0,C=null,M=-1,_=null;const R=new te,V=new te;let B=null;const N=new It(0);let W=0,F=e.width,Y=e.height,G=1,$=null,it=null;const rt=new te(0,0,F,Y),gt=new te(0,0,F,Y);let zt=!1;const X=new vo;let Q=!1,ft=!1;const ot=new le,Et=new le,Ct=new P,Ft=new te,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Vt=!1;function ue(){return C===null?G:1}let U=n;function qe(x,D){return e.getContext(x,D)}try{const x={alpha:!0,depth:a,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${so}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ct,!1),U===null){const D="webgl2";if(U=qe(D,x),U===null)throw qe(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Ot,Bt,yt,ne,Mt,E,v,z,Z,K,q,wt,lt,ut,Gt,tt,pt,St,At,mt,Ht,Ut,ee,L;function st(){Ot=new Cp(U),Ot.init(),Ut=new pm(U,Ot),Bt=new yp(U,Ot,t,Ut),yt=new dm(U,Ot),Bt.reverseDepthBuffer&&f&&yt.buffers.depth.setReversed(!0),ne=new Dp(U),Mt=new Z0,E=new um(U,Ot,yt,Mt,Bt,Ut,ne),v=new Ep(b),z=new Rp(b),Z=new Fd(U),ee=new bp(U,Z),K=new Pp(U,Z,ne,ee),q=new Up(U,K,Z,ne),At=new Ip(U,Bt,E),tt=new Sp(Mt),wt=new $0(b,v,z,Ot,Bt,ee,tt),lt=new Mm(b,Mt),ut=new K0,Gt=new am(Ot),St=new wp(b,v,z,yt,q,m,l),pt=new cm(b,q,Bt),L=new ym(U,ne,Bt,yt),mt=new Mp(U,Ot,ne),Ht=new Lp(U,Ot,ne),ne.programs=wt.programs,b.capabilities=Bt,b.extensions=Ot,b.properties=Mt,b.renderLists=ut,b.shadowMap=pt,b.state=yt,b.info=ne}st();const j=new wm(b,U);this.xr=j,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const x=Ot.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ot.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(x){x!==void 0&&(G=x,this.setSize(F,Y,!1))},this.getSize=function(x){return x.set(F,Y)},this.setSize=function(x,D,O=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=x,Y=D,e.width=Math.floor(x*G),e.height=Math.floor(D*G),O===!0&&(e.style.width=x+"px",e.style.height=D+"px"),this.setViewport(0,0,x,D)},this.getDrawingBufferSize=function(x){return x.set(F*G,Y*G).floor()},this.setDrawingBufferSize=function(x,D,O){F=x,Y=D,G=O,e.width=Math.floor(x*O),e.height=Math.floor(D*O),this.setViewport(0,0,x,D)},this.getCurrentViewport=function(x){return x.copy(R)},this.getViewport=function(x){return x.copy(rt)},this.setViewport=function(x,D,O,H){x.isVector4?rt.set(x.x,x.y,x.z,x.w):rt.set(x,D,O,H),yt.viewport(R.copy(rt).multiplyScalar(G).round())},this.getScissor=function(x){return x.copy(gt)},this.setScissor=function(x,D,O,H){x.isVector4?gt.set(x.x,x.y,x.z,x.w):gt.set(x,D,O,H),yt.scissor(V.copy(gt).multiplyScalar(G).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(x){yt.setScissorTest(zt=x)},this.setOpaqueSort=function(x){$=x},this.setTransparentSort=function(x){it=x},this.getClearColor=function(x){return x.copy(St.getClearColor())},this.setClearColor=function(){St.setClearColor.apply(St,arguments)},this.getClearAlpha=function(){return St.getClearAlpha()},this.setClearAlpha=function(){St.setClearAlpha.apply(St,arguments)},this.clear=function(x=!0,D=!0,O=!0){let H=0;if(x){let I=!1;if(C!==null){const et=C.texture.format;I=et===po||et===uo||et===fo}if(I){const et=C.texture.type,ht=et===Ui||et===_n||et===Ca||et===ea||et===co||et===ho,vt=St.getClearColor(),_t=St.getClearAlpha(),Rt=vt.r,Lt=vt.g,xt=vt.b;ht?(g[0]=Rt,g[1]=Lt,g[2]=xt,g[3]=_t,U.clearBufferuiv(U.COLOR,0,g)):(w[0]=Rt,w[1]=Lt,w[2]=xt,w[3]=_t,U.clearBufferiv(U.COLOR,0,w))}else H|=U.COLOR_BUFFER_BIT}D&&(H|=U.DEPTH_BUFFER_BIT),O&&(H|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),ut.dispose(),Gt.dispose(),Mt.dispose(),v.dispose(),z.dispose(),q.dispose(),ee.dispose(),L.dispose(),wt.dispose(),j.dispose(),j.removeEventListener("sessionstart",Yo),j.removeEventListener("sessionend",$o),nn.stop()};function J(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;const x=ne.autoReset,D=pt.enabled,O=pt.autoUpdate,H=pt.needsUpdate,I=pt.type;st(),ne.autoReset=x,pt.enabled=D,pt.autoUpdate=O,pt.needsUpdate=H,pt.type=I}function ct(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Pt(x){const D=x.target;D.removeEventListener("dispose",Pt),he(D)}function he(x){Me(x),Mt.remove(x)}function Me(x){const D=Mt.get(x).programs;D!==void 0&&(D.forEach(function(O){wt.releaseProgram(O)}),x.isShaderMaterial&&wt.releaseShaderCache(x))}this.renderBufferDirect=function(x,D,O,H,I,et){D===null&&(D=ce);const ht=I.isMesh&&I.matrixWorld.determinant()<0,vt=wh(x,D,O,H,I);yt.setMaterial(H,ht);let _t=O.index,Rt=1;if(H.wireframe===!0){if(_t=K.getWireframeAttribute(O),_t===void 0)return;Rt=2}const Lt=O.drawRange,xt=O.attributes.position;let Xt=Lt.start*Rt,ie=(Lt.start+Lt.count)*Rt;et!==null&&(Xt=Math.max(Xt,et.start*Rt),ie=Math.min(ie,(et.start+et.count)*Rt)),_t!==null?(Xt=Math.max(Xt,0),ie=Math.min(ie,_t.count)):xt!=null&&(Xt=Math.max(Xt,0),ie=Math.min(ie,xt.count));const ae=ie-Xt;if(ae<0||ae===1/0)return;ee.setup(I,H,vt,O,_t);let Ue,$t=mt;if(_t!==null&&(Ue=Z.get(_t),$t=Ht,$t.setIndex(Ue)),I.isMesh)H.wireframe===!0?(yt.setLineWidth(H.wireframeLinewidth*ue()),$t.setMode(U.LINES)):$t.setMode(U.TRIANGLES);else if(I.isLine){let bt=H.linewidth;bt===void 0&&(bt=1),yt.setLineWidth(bt*ue()),I.isLineSegments?$t.setMode(U.LINES):I.isLineLoop?$t.setMode(U.LINE_LOOP):$t.setMode(U.LINE_STRIP)}else I.isPoints?$t.setMode(U.POINTS):I.isSprite&&$t.setMode(U.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)$t.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Ot.get("WEBGL_multi_draw"))$t.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const bt=I._multiDrawStarts,_i=I._multiDrawCounts,Zt=I._multiDrawCount,ei=_t?Z.get(_t).bytesPerElement:1,Tn=Mt.get(H).currentProgram.getUniforms();for(let Oe=0;Oe<Zt;Oe++)Tn.setValue(U,"_gl_DrawID",Oe),$t.render(bt[Oe]/ei,_i[Oe])}else if(I.isInstancedMesh)$t.renderInstances(Xt,ae,I.count);else if(O.isInstancedBufferGeometry){const bt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,_i=Math.min(O.instanceCount,bt);$t.renderInstances(Xt,ae,_i)}else $t.render(Xt,ae)};function Kt(x,D,O){x.transparent===!0&&x.side===ui&&x.forceSinglePass===!1?(x.side=Ie,x.needsUpdate=!0,Ba(x,D,O),x.side=Ki,x.needsUpdate=!0,Ba(x,D,O),x.side=ui):Ba(x,D,O)}this.compile=function(x,D,O=null){O===null&&(O=x),u=Gt.get(O),u.init(D),S.push(u),O.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(u.pushLight(I),I.castShadow&&u.pushShadow(I))}),x!==O&&x.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(u.pushLight(I),I.castShadow&&u.pushShadow(I))}),u.setupLights();const H=new Set;return x.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const et=I.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const vt=et[ht];Kt(vt,O,I),H.add(vt)}else Kt(et,O,I),H.add(et)}),S.pop(),u=null,H},this.compileAsync=function(x,D,O=null){const H=this.compile(x,D,O);return new Promise(I=>{function et(){if(H.forEach(function(ht){Mt.get(ht).currentProgram.isReady()&&H.delete(ht)}),H.size===0){I(x);return}setTimeout(et,10)}Ot.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let ti=null;function vi(x){ti&&ti(x)}function Yo(){nn.stop()}function $o(){nn.start()}const nn=new Gc;nn.setAnimationLoop(vi),typeof self<"u"&&nn.setContext(self),this.setAnimationLoop=function(x){ti=x,j.setAnimationLoop(x),x===null?nn.stop():nn.start()},j.addEventListener("sessionstart",Yo),j.addEventListener("sessionend",$o),this.render=function(x,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(D),D=j.getCamera()),x.isScene===!0&&x.onBeforeRender(b,x,D,C),u=Gt.get(x,S.length),u.init(D),S.push(u),Et.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),X.setFromProjectionMatrix(Et),ft=this.localClippingEnabled,Q=tt.init(this.clippingPlanes,ft),p=ut.get(x,y.length),p.init(),y.push(p),j.enabled===!0&&j.isPresenting===!0){const et=b.xr.getDepthSensingMesh();et!==null&&Lr(et,D,-1/0,b.sortObjects)}Lr(x,D,0,b.sortObjects),p.finish(),b.sortObjects===!0&&p.sort($,it),Vt=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Vt&&St.addToRenderList(p,x),this.info.render.frame++,Q===!0&&tt.beginShadows();const O=u.state.shadowsArray;pt.render(O,x,D),Q===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=p.opaque,I=p.transmissive;if(u.setupLights(),D.isArrayCamera){const et=D.cameras;if(I.length>0)for(let ht=0,vt=et.length;ht<vt;ht++){const _t=et[ht];Jo(H,I,x,_t)}Vt&&St.render(x);for(let ht=0,vt=et.length;ht<vt;ht++){const _t=et[ht];Zo(p,x,_t,_t.viewport)}}else I.length>0&&Jo(H,I,x,D),Vt&&St.render(x),Zo(p,x,D);C!==null&&(E.updateMultisampleRenderTarget(C),E.updateRenderTargetMipmap(C)),x.isScene===!0&&x.onAfterRender(b,x,D),ee.resetDefaultState(),M=-1,_=null,S.pop(),S.length>0?(u=S[S.length-1],Q===!0&&tt.setGlobalState(b.clippingPlanes,u.state.camera)):u=null,y.pop(),y.length>0?p=y[y.length-1]:p=null};function Lr(x,D,O,H){if(x.visible===!1)return;if(x.layers.test(D.layers)){if(x.isGroup)O=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(D);else if(x.isLight)u.pushLight(x),x.castShadow&&u.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||X.intersectsSprite(x)){H&&Ft.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Et);const ht=q.update(x),vt=x.material;vt.visible&&p.push(x,ht,vt,O,Ft.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||X.intersectsObject(x))){const ht=q.update(x),vt=x.material;if(H&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ft.copy(x.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Ft.copy(ht.boundingSphere.center)),Ft.applyMatrix4(x.matrixWorld).applyMatrix4(Et)),Array.isArray(vt)){const _t=ht.groups;for(let Rt=0,Lt=_t.length;Rt<Lt;Rt++){const xt=_t[Rt],Xt=vt[xt.materialIndex];Xt&&Xt.visible&&p.push(x,ht,Xt,O,Ft.z,xt)}}else vt.visible&&p.push(x,ht,vt,O,Ft.z,null)}}const et=x.children;for(let ht=0,vt=et.length;ht<vt;ht++)Lr(et[ht],D,O,H)}function Zo(x,D,O,H){const I=x.opaque,et=x.transmissive,ht=x.transparent;u.setupLightsView(O),Q===!0&&tt.setGlobalState(b.clippingPlanes,O),H&&yt.viewport(R.copy(H)),I.length>0&&Oa(I,D,O),et.length>0&&Oa(et,D,O),ht.length>0&&Oa(ht,D,O),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function Jo(x,D,O,H){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[H.id]===void 0&&(u.state.transmissionRenderTarget[H.id]=new xn(1,1,{generateMipmaps:!0,type:Ot.has("EXT_color_buffer_half_float")||Ot.has("EXT_color_buffer_float")?Da:Ui,minFilter:Ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace}));const et=u.state.transmissionRenderTarget[H.id],ht=H.viewport||R;et.setSize(ht.z,ht.w);const vt=b.getRenderTarget();b.setRenderTarget(et),b.getClearColor(N),W=b.getClearAlpha(),W<1&&b.setClearColor(16777215,.5),b.clear(),Vt&&St.render(O);const _t=b.toneMapping;b.toneMapping=Ji;const Rt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),u.setupLightsView(H),Q===!0&&tt.setGlobalState(b.clippingPlanes,H),Oa(x,O,H),E.updateMultisampleRenderTarget(et),E.updateRenderTargetMipmap(et),Ot.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let xt=0,Xt=D.length;xt<Xt;xt++){const ie=D[xt],ae=ie.object,Ue=ie.geometry,$t=ie.material,bt=ie.group;if($t.side===ui&&ae.layers.test(H.layers)){const _i=$t.side;$t.side=Ie,$t.needsUpdate=!0,Ko(ae,O,H,Ue,$t,bt),$t.side=_i,$t.needsUpdate=!0,Lt=!0}}Lt===!0&&(E.updateMultisampleRenderTarget(et),E.updateRenderTargetMipmap(et))}b.setRenderTarget(vt),b.setClearColor(N,W),Rt!==void 0&&(H.viewport=Rt),b.toneMapping=_t}function Oa(x,D,O){const H=D.isScene===!0?D.overrideMaterial:null;for(let I=0,et=x.length;I<et;I++){const ht=x[I],vt=ht.object,_t=ht.geometry,Rt=H===null?ht.material:H,Lt=ht.group;vt.layers.test(O.layers)&&Ko(vt,D,O,_t,Rt,Lt)}}function Ko(x,D,O,H,I,et){x.onBeforeRender(b,D,O,H,I,et),x.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),I.onBeforeRender(b,D,O,H,x,et),I.transparent===!0&&I.side===ui&&I.forceSinglePass===!1?(I.side=Ie,I.needsUpdate=!0,b.renderBufferDirect(O,D,H,I,x,et),I.side=Ki,I.needsUpdate=!0,b.renderBufferDirect(O,D,H,I,x,et),I.side=ui):b.renderBufferDirect(O,D,H,I,x,et),x.onAfterRender(b,D,O,H,I,et)}function Ba(x,D,O){D.isScene!==!0&&(D=ce);const H=Mt.get(x),I=u.state.lights,et=u.state.shadowsArray,ht=I.state.version,vt=wt.getParameters(x,I.state,et,D,O),_t=wt.getProgramCacheKey(vt);let Rt=H.programs;H.environment=x.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(x.isMeshStandardMaterial?z:v).get(x.envMap||H.environment),H.envMapRotation=H.environment!==null&&x.envMap===null?D.environmentRotation:x.envMapRotation,Rt===void 0&&(x.addEventListener("dispose",Pt),Rt=new Map,H.programs=Rt);let Lt=Rt.get(_t);if(Lt!==void 0){if(H.currentProgram===Lt&&H.lightsStateVersion===ht)return tl(x,vt),Lt}else vt.uniforms=wt.getUniforms(x),x.onBeforeCompile(vt,b),Lt=wt.acquireProgram(vt,_t),Rt.set(_t,Lt),H.uniforms=vt.uniforms;const xt=H.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(xt.clippingPlanes=tt.uniform),tl(x,vt),H.needsLights=Mh(x),H.lightsStateVersion=ht,H.needsLights&&(xt.ambientLightColor.value=I.state.ambient,xt.lightProbe.value=I.state.probe,xt.directionalLights.value=I.state.directional,xt.directionalLightShadows.value=I.state.directionalShadow,xt.spotLights.value=I.state.spot,xt.spotLightShadows.value=I.state.spotShadow,xt.rectAreaLights.value=I.state.rectArea,xt.ltc_1.value=I.state.rectAreaLTC1,xt.ltc_2.value=I.state.rectAreaLTC2,xt.pointLights.value=I.state.point,xt.pointLightShadows.value=I.state.pointShadow,xt.hemisphereLights.value=I.state.hemi,xt.directionalShadowMap.value=I.state.directionalShadowMap,xt.directionalShadowMatrix.value=I.state.directionalShadowMatrix,xt.spotShadowMap.value=I.state.spotShadowMap,xt.spotLightMatrix.value=I.state.spotLightMatrix,xt.spotLightMap.value=I.state.spotLightMap,xt.pointShadowMap.value=I.state.pointShadowMap,xt.pointShadowMatrix.value=I.state.pointShadowMatrix),H.currentProgram=Lt,H.uniformsList=null,Lt}function Qo(x){if(x.uniformsList===null){const D=x.currentProgram.getUniforms();x.uniformsList=pr.seqWithValue(D.seq,x.uniforms)}return x.uniformsList}function tl(x,D){const O=Mt.get(x);O.outputColorSpace=D.outputColorSpace,O.batching=D.batching,O.batchingColor=D.batchingColor,O.instancing=D.instancing,O.instancingColor=D.instancingColor,O.instancingMorph=D.instancingMorph,O.skinning=D.skinning,O.morphTargets=D.morphTargets,O.morphNormals=D.morphNormals,O.morphColors=D.morphColors,O.morphTargetsCount=D.morphTargetsCount,O.numClippingPlanes=D.numClippingPlanes,O.numIntersection=D.numClipIntersection,O.vertexAlphas=D.vertexAlphas,O.vertexTangents=D.vertexTangents,O.toneMapping=D.toneMapping}function wh(x,D,O,H,I){D.isScene!==!0&&(D=ce),E.resetTextureUnits();const et=D.fog,ht=H.isMeshStandardMaterial?D.environment:null,vt=C===null?b.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:sa,_t=(H.isMeshStandardMaterial?z:v).get(H.envMap||ht),Rt=H.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Lt=!!O.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),xt=!!O.morphAttributes.position,Xt=!!O.morphAttributes.normal,ie=!!O.morphAttributes.color;let ae=Ji;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ae=b.toneMapping);const Ue=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,$t=Ue!==void 0?Ue.length:0,bt=Mt.get(H),_i=u.state.lights;if(Q===!0&&(ft===!0||x!==_)){const Ye=x===_&&H.id===M;tt.setState(H,x,Ye)}let Zt=!1;H.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==_i.state.version||bt.outputColorSpace!==vt||I.isBatchedMesh&&bt.batching===!1||!I.isBatchedMesh&&bt.batching===!0||I.isBatchedMesh&&bt.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&bt.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&bt.instancing===!1||!I.isInstancedMesh&&bt.instancing===!0||I.isSkinnedMesh&&bt.skinning===!1||!I.isSkinnedMesh&&bt.skinning===!0||I.isInstancedMesh&&bt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&bt.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&bt.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&bt.instancingMorph===!1&&I.morphTexture!==null||bt.envMap!==_t||H.fog===!0&&bt.fog!==et||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==tt.numPlanes||bt.numIntersection!==tt.numIntersection)||bt.vertexAlphas!==Rt||bt.vertexTangents!==Lt||bt.morphTargets!==xt||bt.morphNormals!==Xt||bt.morphColors!==ie||bt.toneMapping!==ae||bt.morphTargetsCount!==$t)&&(Zt=!0):(Zt=!0,bt.__version=H.version);let ei=bt.currentProgram;Zt===!0&&(ei=Ba(H,D,I));let Tn=!1,Oe=!1,ha=!1;const re=ei.getUniforms(),di=bt.uniforms;if(yt.useProgram(ei.program)&&(Tn=!0,Oe=!0,ha=!0),H.id!==M&&(M=H.id,Oe=!0),Tn||_!==x){yt.buffers.depth.getReversed()?(ot.copy(x.projectionMatrix),ud(ot),pd(ot),re.setValue(U,"projectionMatrix",ot)):re.setValue(U,"projectionMatrix",x.projectionMatrix),re.setValue(U,"viewMatrix",x.matrixWorldInverse);const Ni=re.map.cameraPosition;Ni!==void 0&&Ni.setValue(U,Ct.setFromMatrixPosition(x.matrixWorld)),Bt.logarithmicDepthBuffer&&re.setValue(U,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&re.setValue(U,"isOrthographic",x.isOrthographicCamera===!0),_!==x&&(_=x,Oe=!0,ha=!0)}if(I.isSkinnedMesh){re.setOptional(U,I,"bindMatrix"),re.setOptional(U,I,"bindMatrixInverse");const Ye=I.skeleton;Ye&&(Ye.boneTexture===null&&Ye.computeBoneTexture(),re.setValue(U,"boneTexture",Ye.boneTexture,E))}I.isBatchedMesh&&(re.setOptional(U,I,"batchingTexture"),re.setValue(U,"batchingTexture",I._matricesTexture,E),re.setOptional(U,I,"batchingIdTexture"),re.setValue(U,"batchingIdTexture",I._indirectTexture,E),re.setOptional(U,I,"batchingColorTexture"),I._colorsTexture!==null&&re.setValue(U,"batchingColorTexture",I._colorsTexture,E));const da=O.morphAttributes;if((da.position!==void 0||da.normal!==void 0||da.color!==void 0)&&At.update(I,O,ei),(Oe||bt.receiveShadow!==I.receiveShadow)&&(bt.receiveShadow=I.receiveShadow,re.setValue(U,"receiveShadow",I.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(di.envMap.value=_t,di.flipEnvMap.value=_t.isCubeTexture&&_t.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&D.environment!==null&&(di.envMapIntensity.value=D.environmentIntensity),Oe&&(re.setValue(U,"toneMappingExposure",b.toneMappingExposure),bt.needsLights&&bh(di,ha),et&&H.fog===!0&&lt.refreshFogUniforms(di,et),lt.refreshMaterialUniforms(di,H,G,Y,u.state.transmissionRenderTarget[x.id]),pr.upload(U,Qo(bt),di,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(pr.upload(U,Qo(bt),di,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&re.setValue(U,"center",I.center),re.setValue(U,"modelViewMatrix",I.modelViewMatrix),re.setValue(U,"normalMatrix",I.normalMatrix),re.setValue(U,"modelMatrix",I.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Ye=H.uniformsGroups;for(let Ni=0,Fi=Ye.length;Ni<Fi;Ni++){const el=Ye[Ni];L.update(el,ei),L.bind(el,ei)}}return ei}function bh(x,D){x.ambientLightColor.needsUpdate=D,x.lightProbe.needsUpdate=D,x.directionalLights.needsUpdate=D,x.directionalLightShadows.needsUpdate=D,x.pointLights.needsUpdate=D,x.pointLightShadows.needsUpdate=D,x.spotLights.needsUpdate=D,x.spotLightShadows.needsUpdate=D,x.rectAreaLights.needsUpdate=D,x.hemisphereLights.needsUpdate=D}function Mh(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(x,D,O){Mt.get(x.texture).__webglTexture=D,Mt.get(x.depthTexture).__webglTexture=O;const H=Mt.get(x);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=O===void 0,H.__autoAllocateDepthBuffer||Ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,D){const O=Mt.get(x);O.__webglFramebuffer=D,O.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(x,D=0,O=0){C=x,A=D,T=O;let H=!0,I=null,et=!1,ht=!1;if(x){const _t=Mt.get(x);if(_t.__useDefaultFramebuffer!==void 0)yt.bindFramebuffer(U.FRAMEBUFFER,null),H=!1;else if(_t.__webglFramebuffer===void 0)E.setupRenderTarget(x);else if(_t.__hasExternalTextures)E.rebindTextures(x,Mt.get(x.texture).__webglTexture,Mt.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const xt=x.depthTexture;if(_t.__boundDepthTexture!==xt){if(xt!==null&&Mt.has(xt)&&(x.width!==xt.image.width||x.height!==xt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(x)}}const Rt=x.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(ht=!0);const Lt=Mt.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Lt[D])?I=Lt[D][O]:I=Lt[D],et=!0):x.samples>0&&E.useMultisampledRTT(x)===!1?I=Mt.get(x).__webglMultisampledFramebuffer:Array.isArray(Lt)?I=Lt[O]:I=Lt,R.copy(x.viewport),V.copy(x.scissor),B=x.scissorTest}else R.copy(rt).multiplyScalar(G).floor(),V.copy(gt).multiplyScalar(G).floor(),B=zt;if(yt.bindFramebuffer(U.FRAMEBUFFER,I)&&H&&yt.drawBuffers(x,I),yt.viewport(R),yt.scissor(V),yt.setScissorTest(B),et){const _t=Mt.get(x.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,_t.__webglTexture,O)}else if(ht){const _t=Mt.get(x.texture),Rt=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,_t.__webglTexture,O||0,Rt)}M=-1},this.readRenderTargetPixels=function(x,D,O,H,I,et,ht){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Mt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ht!==void 0&&(vt=vt[ht]),vt){yt.bindFramebuffer(U.FRAMEBUFFER,vt);try{const _t=x.texture,Rt=_t.format,Lt=_t.type;if(!Bt.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Bt.textureTypeReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=x.width-H&&O>=0&&O<=x.height-I&&U.readPixels(D,O,H,I,Ut.convert(Rt),Ut.convert(Lt),et)}finally{const _t=C!==null?Mt.get(C).__webglFramebuffer:null;yt.bindFramebuffer(U.FRAMEBUFFER,_t)}}},this.readRenderTargetPixelsAsync=async function(x,D,O,H,I,et,ht){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Mt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ht!==void 0&&(vt=vt[ht]),vt){const _t=x.texture,Rt=_t.format,Lt=_t.type;if(!Bt.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Bt.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=x.width-H&&O>=0&&O<=x.height-I){yt.bindFramebuffer(U.FRAMEBUFFER,vt);const xt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,xt),U.bufferData(U.PIXEL_PACK_BUFFER,et.byteLength,U.STREAM_READ),U.readPixels(D,O,H,I,Ut.convert(Rt),Ut.convert(Lt),0);const Xt=C!==null?Mt.get(C).__webglFramebuffer:null;yt.bindFramebuffer(U.FRAMEBUFFER,Xt);const ie=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await fd(U,ie,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,xt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,et),U.deleteBuffer(xt),U.deleteSync(ie),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,D=null,O=0){x.isTexture!==!0&&(ba("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,x=arguments[1]);const H=Math.pow(2,-O),I=Math.floor(x.image.width*H),et=Math.floor(x.image.height*H),ht=D!==null?D.x:0,vt=D!==null?D.y:0;E.setTexture2D(x,0),U.copyTexSubImage2D(U.TEXTURE_2D,O,0,0,ht,vt,I,et),yt.unbindTexture()},this.copyTextureToTexture=function(x,D,O=null,H=null,I=0){x.isTexture!==!0&&(ba("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,x=arguments[1],D=arguments[2],I=arguments[3]||0,O=null);let et,ht,vt,_t,Rt,Lt,xt,Xt,ie;const ae=x.isCompressedTexture?x.mipmaps[I]:x.image;O!==null?(et=O.max.x-O.min.x,ht=O.max.y-O.min.y,vt=O.isBox3?O.max.z-O.min.z:1,_t=O.min.x,Rt=O.min.y,Lt=O.isBox3?O.min.z:0):(et=ae.width,ht=ae.height,vt=ae.depth||1,_t=0,Rt=0,Lt=0),H!==null?(xt=H.x,Xt=H.y,ie=H.z):(xt=0,Xt=0,ie=0);const Ue=Ut.convert(D.format),$t=Ut.convert(D.type);let bt;D.isData3DTexture?(E.setTexture3D(D,0),bt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(E.setTexture2DArray(D,0),bt=U.TEXTURE_2D_ARRAY):(E.setTexture2D(D,0),bt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const _i=U.getParameter(U.UNPACK_ROW_LENGTH),Zt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ei=U.getParameter(U.UNPACK_SKIP_PIXELS),Tn=U.getParameter(U.UNPACK_SKIP_ROWS),Oe=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ae.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ae.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,_t),U.pixelStorei(U.UNPACK_SKIP_ROWS,Rt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Lt);const ha=x.isDataArrayTexture||x.isData3DTexture,re=D.isDataArrayTexture||D.isData3DTexture;if(x.isRenderTargetTexture||x.isDepthTexture){const di=Mt.get(x),da=Mt.get(D),Ye=Mt.get(di.__renderTarget),Ni=Mt.get(da.__renderTarget);yt.bindFramebuffer(U.READ_FRAMEBUFFER,Ye.__webglFramebuffer),yt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ni.__webglFramebuffer);for(let Fi=0;Fi<vt;Fi++)ha&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Mt.get(x).__webglTexture,I,Lt+Fi),x.isDepthTexture?(re&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Mt.get(D).__webglTexture,I,ie+Fi),U.blitFramebuffer(_t,Rt,et,ht,xt,Xt,et,ht,U.DEPTH_BUFFER_BIT,U.NEAREST)):re?U.copyTexSubImage3D(bt,I,xt,Xt,ie+Fi,_t,Rt,et,ht):U.copyTexSubImage2D(bt,I,xt,Xt,ie+Fi,_t,Rt,et,ht);yt.bindFramebuffer(U.READ_FRAMEBUFFER,null),yt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else re?x.isDataTexture||x.isData3DTexture?U.texSubImage3D(bt,I,xt,Xt,ie,et,ht,vt,Ue,$t,ae.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(bt,I,xt,Xt,ie,et,ht,vt,Ue,ae.data):U.texSubImage3D(bt,I,xt,Xt,ie,et,ht,vt,Ue,$t,ae):x.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,I,xt,Xt,et,ht,Ue,$t,ae.data):x.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,I,xt,Xt,ae.width,ae.height,Ue,ae.data):U.texSubImage2D(U.TEXTURE_2D,I,xt,Xt,et,ht,Ue,$t,ae);U.pixelStorei(U.UNPACK_ROW_LENGTH,_i),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Zt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ei),U.pixelStorei(U.UNPACK_SKIP_ROWS,Tn),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Oe),I===0&&D.generateMipmaps&&U.generateMipmap(bt),yt.unbindTexture()},this.copyTextureToTexture3D=function(x,D,O=null,H=null,I=0){return x.isTexture!==!0&&(ba("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,H=arguments[1]||null,x=arguments[2],D=arguments[3],I=arguments[4]||0),ba('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,D,O,H,I)},this.initRenderTarget=function(x){Mt.get(x).__webglFramebuffer===void 0&&E.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?E.setTextureCube(x,0):x.isData3DTexture?E.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?E.setTexture2DArray(x,0):E.setTexture2D(x,0),yt.unbindTexture()},this.resetState=function(){A=0,T=0,C=null,yt.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}}class wo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new It(t),this.density=e}clone(){return new wo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class bo{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new It(t),this.near=e,this.far=n}clone(){return new bo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class wr extends me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pe,this.environmentIntensity=1,this.environmentRotation=new Pe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class la extends Re{constructor(t,e,n,a,r,s,o,l,c){super(t,e,n,a,r,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wn extends hi{constructor(t=1,e=1,n=1,a=32,r=1,s=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:a,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:l};const c=this;a=Math.floor(a),r=Math.floor(r);const h=[],d=[],f=[],m=[];let g=0;const w=[],p=n/2;let u=0;y(),s===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new be(d,3)),this.setAttribute("normal",new be(f,3)),this.setAttribute("uv",new be(m,2));function y(){const b=new P,k=new P;let A=0;const T=(e-t)/n;for(let C=0;C<=r;C++){const M=[],_=C/r,R=_*(e-t)+t;for(let V=0;V<=a;V++){const B=V/a,N=B*l+o,W=Math.sin(N),F=Math.cos(N);k.x=R*W,k.y=-_*n+p,k.z=R*F,d.push(k.x,k.y,k.z),b.set(W,T,F).normalize(),f.push(b.x,b.y,b.z),m.push(B,1-_),M.push(g++)}w.push(M)}for(let C=0;C<a;C++)for(let M=0;M<r;M++){const _=w[M][C],R=w[M+1][C],V=w[M+1][C+1],B=w[M][C+1];(t>0||M!==0)&&(h.push(_,R,B),A+=3),(e>0||M!==r-1)&&(h.push(R,V,B),A+=3)}c.addGroup(u,A,0),u+=A}function S(b){const k=g,A=new Nt,T=new P;let C=0;const M=b===!0?t:e,_=b===!0?1:-1;for(let V=1;V<=a;V++)d.push(0,p*_,0),f.push(0,_,0),m.push(.5,.5),g++;const R=g;for(let V=0;V<=a;V++){const N=V/a*l+o,W=Math.cos(N),F=Math.sin(N);T.x=M*F,T.y=p*_,T.z=M*W,d.push(T.x,T.y,T.z),f.push(0,_,0),A.x=W*.5+.5,A.y=F*.5*_+.5,m.push(A.x,A.y),g++}for(let V=0;V<a;V++){const B=k+V,N=R+V;b===!0?h.push(N,N+1,B):h.push(N+1,N,B),C+=3}c.addGroup(u,C,b===!0?1:2),u+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Mo extends wn{constructor(t=1,e=1,n=32,a=1,r=!1,s=0,o=Math.PI*2){super(0,t,e,n,a,r,s,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:a,openEnded:r,thetaStart:s,thetaLength:o}}static fromJSON(t){return new Mo(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ca extends hi{constructor(t=[],e=[],n=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:a};const r=[],s=[];o(a),c(n),h(),this.setAttribute("position",new be(r,3)),this.setAttribute("normal",new be(r.slice(),3)),this.setAttribute("uv",new be(s,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const S=new P,b=new P,k=new P;for(let A=0;A<e.length;A+=3)m(e[A+0],S),m(e[A+1],b),m(e[A+2],k),l(S,b,k,y)}function l(y,S,b,k){const A=k+1,T=[];for(let C=0;C<=A;C++){T[C]=[];const M=y.clone().lerp(b,C/A),_=S.clone().lerp(b,C/A),R=A-C;for(let V=0;V<=R;V++)V===0&&C===A?T[C][V]=M:T[C][V]=M.clone().lerp(_,V/R)}for(let C=0;C<A;C++)for(let M=0;M<2*(A-C)-1;M++){const _=Math.floor(M/2);M%2===0?(f(T[C][_+1]),f(T[C+1][_]),f(T[C][_])):(f(T[C][_+1]),f(T[C+1][_+1]),f(T[C+1][_]))}}function c(y){const S=new P;for(let b=0;b<r.length;b+=3)S.x=r[b+0],S.y=r[b+1],S.z=r[b+2],S.normalize().multiplyScalar(y),r[b+0]=S.x,r[b+1]=S.y,r[b+2]=S.z}function h(){const y=new P;for(let S=0;S<r.length;S+=3){y.x=r[S+0],y.y=r[S+1],y.z=r[S+2];const b=p(y)/2/Math.PI+.5,k=u(y)/Math.PI+.5;s.push(b,1-k)}g(),d()}function d(){for(let y=0;y<s.length;y+=6){const S=s[y+0],b=s[y+2],k=s[y+4],A=Math.max(S,b,k),T=Math.min(S,b,k);A>.9&&T<.1&&(S<.2&&(s[y+0]+=1),b<.2&&(s[y+2]+=1),k<.2&&(s[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function m(y,S){const b=y*3;S.x=t[b+0],S.y=t[b+1],S.z=t[b+2]}function g(){const y=new P,S=new P,b=new P,k=new P,A=new Nt,T=new Nt,C=new Nt;for(let M=0,_=0;M<r.length;M+=9,_+=6){y.set(r[M+0],r[M+1],r[M+2]),S.set(r[M+3],r[M+4],r[M+5]),b.set(r[M+6],r[M+7],r[M+8]),A.set(s[_+0],s[_+1]),T.set(s[_+2],s[_+3]),C.set(s[_+4],s[_+5]),k.copy(y).add(S).add(b).divideScalar(3);const R=p(k);w(A,_+0,y,R),w(T,_+2,S,R),w(C,_+4,b,R)}}function w(y,S,b,k){k<0&&y.x===1&&(s[S]=y.x-1),b.x===0&&b.z===0&&(s[S]=k/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function u(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ca(t.vertices,t.indices,t.radius,t.details)}}class yo extends ca{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,a=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-a,-n,0,-a,n,0,a,-n,0,a,n,-a,-n,0,-a,n,0,a,-n,0,a,n,0,-n,0,-a,n,0,-a,-n,0,a,n,0,a],s=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,s,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new yo(t.radius,t.detail)}}class $i extends ca{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,a=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(a,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new $i(t.radius,t.detail)}}class Sr extends ca{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],a=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,a,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Sr(t.radius,t.detail)}}class So extends hi{constructor(t=1,e=32,n=16,a=0,r=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:a,phiLength:r,thetaStart:s,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(s+o,Math.PI);let c=0;const h=[],d=new P,f=new P,m=[],g=[],w=[],p=[];for(let u=0;u<=n;u++){const y=[],S=u/n;let b=0;u===0&&s===0?b=.5/e:u===n&&l===Math.PI&&(b=-.5/e);for(let k=0;k<=e;k++){const A=k/e;d.x=-t*Math.cos(a+A*r)*Math.sin(s+S*o),d.y=t*Math.cos(s+S*o),d.z=t*Math.sin(a+A*r)*Math.sin(s+S*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),w.push(f.x,f.y,f.z),p.push(A+b,1-S),y.push(c++)}h.push(y)}for(let u=0;u<n;u++)for(let y=0;y<e;y++){const S=h[u][y+1],b=h[u][y],k=h[u+1][y],A=h[u+1][y+1];(u!==0||s>0)&&m.push(S,b,A),(u!==n-1||l<Math.PI)&&m.push(b,k,A)}this.setIndex(m),this.setAttribute("position",new be(g,3)),this.setAttribute("normal",new be(w,3)),this.setAttribute("uv",new be(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new So(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Eo extends ca{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],a=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,a,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Eo(t.radius,t.detail)}}class li extends za{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pe,this.combine=oo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Ql={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Em{constructor(t,e,n){const a=this;let r=!1,s=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&a.onStart!==void 0&&a.onStart(h,s,o),r=!0},this.itemEnd=function(h){s++,a.onProgress!==void 0&&a.onProgress(h,s,o),s===o&&(r=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(h){a.onError!==void 0&&a.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=c.length;d<f;d+=2){const m=c[d],g=c[d+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}}const Tm=new Em;class To{constructor(t){this.manager=t!==void 0?t:Tm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(a,r){n.load(t,a,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}To.DEFAULT_MATERIAL_NAME="__DEFAULT";class Am extends To{constructor(t){super(t)}load(t,e,n,a){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,s=Ql.get(t);if(s!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(s),r.manager.itemEnd(t)},0),s;const o=Pa("img");function l(){h(),Ql.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),a&&a(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class Rm extends To{constructor(t){super(t)}load(t,e,n,a){const r=new Re,s=new Am(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,a),r}}class Er extends me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class $c extends Er{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ls=new le,tc=new P,ec=new P;class Ao{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Nt(512,512),this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vo,this._frameExtents=new Nt(1,1),this._viewportCount=1,this._viewports=[new te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;tc.setFromMatrixPosition(t.matrixWorld),e.position.copy(tc),ec.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ec),e.updateMatrixWorld(),ls.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ls),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ls)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Cm extends Ao{constructor(){super(new Te(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=xr*2*t.angle*this.focus,a=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||a!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=a,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Pm extends Er{constructor(t,e,n=0,a=Math.PI/3,r=0,s=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.distance=n,this.angle=a,this.penumbra=r,this.decay=s,this.map=null,this.shadow=new Cm}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const ic=new le,va=new P,cs=new P;class Lm extends Ao{constructor(){super(new Te(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Nt(4,2),this._viewportCount=6,this._viewports=[new te(2,1,1,1),new te(0,1,1,1),new te(3,1,1,1),new te(1,1,1,1),new te(3,0,1,1),new te(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,a=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),va.setFromMatrixPosition(t.matrixWorld),n.position.copy(va),cs.copy(n.position),cs.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(cs),n.updateMatrixWorld(),a.makeTranslation(-va.x,-va.y,-va.z),ic.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ic)}}class Na extends Er{constructor(t,e,n=0,a=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=a,this.shadow=new Lm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Dm extends Ao{constructor(){super(new _o(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Im extends Er{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(me.DEFAULT_UP),this.updateMatrix(),this.target=new me,this.shadow=new Dm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const nc=new le;class Um{constructor(t,e,n=0,a=1/0){this.ray=new zc(t,e),this.near=n,this.far=a,this.camera=null,this.layers=new go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return nc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(nc),this}intersectObject(t,e=!0,n=[]){return Qs(t,this,n,e),n.sort(ac),n}intersectObjects(t,e=!0,n=[]){for(let a=0,r=t.length;a<r;a++)Qs(t[a],this,n,e);return n.sort(ac),n}}function ac(i,t){return i.distance-t.distance}function Qs(i,t,e,n){let a=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(a=!1),a===!0&&n===!0){const r=i.children;for(let s=0,o=r.length;s<o;s++)Qs(r[s],t,e,!0)}}class km extends yn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:so}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=so);const Hn=new Pe(0,0,0,"YXZ"),Vn=new P,zm={type:"change"},Nm={type:"lock"},Fm={type:"unlock"},rc=Math.PI/2;class Om extends km{constructor(t,e=null){super(t,e),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Bm.bind(this),this._onPointerlockChange=Hm.bind(this),this._onPointerlockError=Vm.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(t){return t.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(t){if(this.enabled===!1)return;const e=this.object;Vn.setFromMatrixColumn(e.matrix,0),Vn.crossVectors(e.up,Vn),e.position.addScaledVector(Vn,t)}moveRight(t){if(this.enabled===!1)return;const e=this.object;Vn.setFromMatrixColumn(e.matrix,0),e.position.addScaledVector(Vn,t)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function Bm(i){if(this.enabled===!1||this.isLocked===!1)return;const t=i.movementX||i.mozMovementX||i.webkitMovementX||0,e=i.movementY||i.mozMovementY||i.webkitMovementY||0,n=this.object;Hn.setFromQuaternion(n.quaternion),Hn.y-=t*.002*this.pointerSpeed,Hn.x-=e*.002*this.pointerSpeed,Hn.x=Math.max(rc-this.maxPolarAngle,Math.min(rc-this.minPolarAngle,Hn.x)),n.quaternion.setFromEuler(Hn),this.dispatchEvent(zm)}function Hm(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(Nm),this.isLocked=!0):(this.dispatchEvent(Fm),this.isLocked=!1)}function Vm(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const Gm={rooms:[{id:"central",title:"Watercolor Pastels",kind:"hall",ring:"S",galleries:["Cormorant garden mural","Watercolor Pastels"],minX:-12.625,maxX:12.625,minZ:-9,maxZ:12,openings:[{wall:"W",from:4.8,to:7.2},{wall:"E",from:4.8,to:7.2}],windows:[{wall:"N",from:-7.3125,to:-5.3125,sill:.9,head:3},{wall:"N",from:5.3125,to:7.3125,sill:.9,head:3}],count:46},{id:"travels",title:"Travels & the Pacific Northwest",kind:"gallery",ring:"N",galleries:["Travels","Pacific Northwest","Friends Club mural (Lillooet)","Exhibitions: Cape Town, El Salvador, Warsaw"],minX:-12.625,maxX:12.625,minZ:15.5,maxZ:23.5,openings:[{wall:"W",from:18.3,to:20.7},{wall:"E",from:18.3,to:20.7}],windows:[{wall:"S",from:-7.3125,to:-5.3125,sill:.9,head:3},{wall:"S",from:5.3125,to:7.3125,sill:.9,head:3}],count:21},{id:"people",title:"Friends, Family & Bitcoiners",kind:"gallery",ring:"W",galleries:["Friends","Family","Bitcoiners","Self Portraits","Archived Paintings (portraits & people)","Exhibitions: Living Room, Studio 601, Victrola, Paul Murphy"],minX:-23.225,maxX:-15.225000000000001,minZ:0,maxZ:23.5,openings:[{wall:"E",from:4.8,to:7.2},{wall:"E",from:18.3,to:20.7}],windows:[{wall:"E",from:12.75,to:14.75,sill:.9,head:3}],count:50},{id:"archive",title:"Archived & Older Work",kind:"gallery",ring:"E",galleries:["Archived Paintings","Older Work"],minX:15.225,maxX:29.725,minZ:0,maxZ:23.5,openings:[{wall:"W",from:4.8,to:7.2},{wall:"W",from:18.3,to:20.7}],windows:[{wall:"W",from:12.75,to:14.75,sill:.9,head:3}],count:98}],hall:{height:4.6,doorHeight:2.7},hallways:[{id:"passage-central-people",from:"central",to:"people",minX:-15.225000000000001,maxX:-12.625,minZ:4.8,maxZ:7.2},{id:"passage-people-archive",from:"people",to:"travels",minX:-15.225000000000001,maxX:-12.625,minZ:18.3,maxZ:20.7},{id:"passage-archive-travels",from:"travels",to:"archive",minX:12.625,maxX:15.225,minZ:18.3,maxZ:20.7},{id:"passage-travels-central",from:"archive",to:"central",minX:12.625,maxX:15.225,minZ:4.8,maxZ:7.2}],signs:[{title:"Central Hall",x:-15.345,y:3.1500000000000004,z:6,yaw:1.5707963267948966},{title:"Friends, Family & Bitcoiners",x:-12.505,y:3.1500000000000004,z:6,yaw:-1.5707963267948966},{title:"Travels & the Pacific Northwest",x:-15.345,y:3.1500000000000004,z:19.5,yaw:1.5707963267948966},{title:"Friends, Family & Bitcoiners",x:-12.505,y:3.1500000000000004,z:19.5,yaw:-1.5707963267948966},{title:"Archived & Older Work",x:12.505,y:3.1500000000000004,z:19.5,yaw:1.5707963267948966},{title:"Travels & the Pacific Northwest",x:15.344999999999999,y:3.1500000000000004,z:19.5,yaw:-1.5707963267948966},{title:"Archived & Older Work",x:12.505,y:3.1500000000000004,z:6,yaw:1.5707963267948966},{title:"Central Hall",x:15.344999999999999,y:3.1500000000000004,z:6,yaw:-1.5707963267948966}],start:{x:0,z:1.6,yaw:0},courtyard:{minX:-12.625,maxX:12.625,minZ:12,maxZ:15.5},gate:{room:"travels",from:8.8,to:10.8},checkout:{room:"travels",from:-10.8,to:-8.8}},Wm=[{id:"cormorant-presiding-over-sunset-on-puget-sound",kind:"mural",room:"central",wall:"N",x:2.9656037905186032,y:1.6,z:11.965,ix:0,iz:-1,iw:3.048,ih:2.032,s:1,smax:1,title:"Cormorant Presiding over Sunset on Puget Sound",price:null,status:"nfs",url:"https://tjm.art/products/cormorant-presiding-over-sunset-on-puget-sound/",img:"art/cormorant-presiding-over-sunset-on-puget-sound.webp",focal:!0,caption:"Garden mural, Seattle · 60 × 40 in (W × H)",hi:"https://img.tjm.art/gallery-wall/a74c24cb788ba4d20bea974f63c112995614224f8dbdc53b7d0ba5e3ad83b81a-960.webp",w:3.048,h:2.032,fw:3.07848,fh:2.06248},{id:"coined-in-watercolor-film-poster",kind:"painting",room:"central",wall:"N",x:-3.805843836092525,y:1.6,z:11.965,ix:0,iz:-1,iw:1.3675199088521564,ih:2.0475021839720133,s:1,smax:1,title:"Coined in Watercolor Film Poster",price:null,status:"nfs",url:"https://tjm.art/products/coined-in-watercolor-film-poster/",img:"art/coined-in-watercolor-film-poster.webp",focal:!1,caption:"100 × 70 cm (H × W)",hi:"https://tjm.art/gallery-images/coined-in-watercolor-film-poster.jpg",w:1.3675199088521564,h:2.0475021839720133,fw:1.3979999088521562,fh:2.077982183972013},{id:"painting-shoreline-at-dusk",kind:"painting",room:"central",wall:"N",x:-1.380245003787599,y:1.008063433127114,z:11.965,ix:0,iz:-1,iw:2.507405336794901,ih:1.1856468662542274,s:1,smax:1,title:"El Zonte at Dawn",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-shoreline-at-dusk/",img:"art/painting-shoreline-at-dusk.webp",focal:!1,caption:"48 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/63d06a96a47f9244f2309dbda6117c8922c6eade29a98ad674923cf57378421a-960.webp",w:2.507405336794901,h:1.1856468662542274,fw:2.5378853367949015,fh:1.2161268662542275},{id:"el-zonte-before-dawn",kind:"painting",room:"central",wall:"N",x:-1.380245003787599,y:2.3869060847474524,z:11.965,ix:0,iz:-1,iw:2.495971035729381,ih:1.1910784369864493,s:1,smax:1,title:"El Zonte Before Dawn",price:"$1,000",status:"available",url:"https://tjm.art/products/el-zonte-before-dawn/",img:"art/el-zonte-before-dawn.webp",focal:!1,caption:"48 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/0832de7fa78ee0b4964fb98b9009c464a0a40018c4db8f32144bd246d9135559-960.webp",w:2.495971035729381,h:1.1910784369864493,fw:2.526451035729381,fh:1.2215584369864494},{id:"painting-moonlit-water",kind:"painting",room:"central",wall:"N",x:.6575307275642275,y:1.6000000000000003,z:11.965,ix:0,iz:-1,iw:.5918737069459575,ih:1.2033929394755734,s:1,smax:1,title:"Moonrise Over the Cascades",price:"$500",status:"available",url:"https://tjm.art/products/painting-moonlit-water/",img:"art/painting-moonlit-water.webp",focal:!1,caption:"12 × 23 in (W × H)",hi:"https://img.tjm.art/gallery-wall/370a11b9549c02d36d2ecf5a32d0e0e9b927311a116a38623a17985029422b2d-960.webp",w:.5918737069459575,h:1.2033929394755734,fw:.6223537069459575,fh:1.2338729394755732},{id:"el-zonte-at-sunrise",kind:"painting",room:"central",wall:"N",x:9.66875,y:1.6247440804764866,z:11.965,ix:0,iz:-1,iw:1.2289736463017225,ih:2.4190081609529734,s:1,smax:1,title:"Sunrise from Punta El Zonte Hostel",price:"$1,000",status:"available",url:"https://tjm.art/products/el-zonte-at-sunrise/",img:"art/el-zonte-at-sunrise.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/6bd54b8a2350ec2a09c359d018e74399db2b1c36dd7a179c717f01702d45f8a8-960.webp",w:1.2289736463017225,h:2.4190081609529734,fw:1.2594536463017225,fh:2.4494881609529733},{id:"sunrise-in-el-zonte-large",kind:"painting",room:"central",wall:"E",x:12.59,y:1.6553830413819792,z:9.625,ix:-1,iz:0,iw:1.797915954529985,ih:2.480286082763959,s:1,smax:1,title:"Sunrise in El Zonte (Large)",price:"$2,000",status:"available",url:"https://tjm.art/products/sunrise-in-el-zonte-large/",img:"art/sunrise-in-el-zonte-large.webp",focal:!1,caption:"36 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/85427e7af2a0b74812205d51fbd7046788188c69454562ed1afc25ecb380c488-960.webp",w:1.797915954529985,h:2.480286082763959,fw:1.828395954529985,fh:2.5107660827639586},{id:"painting-portrait-with-hat",kind:"painting",room:"central",wall:"E",x:12.59,y:1.6,z:1.6844234961278777,ix:-1,iz:0,iw:3.489533021423588,ih:.9761893007134544,s:1,smax:1,title:"Sunrise on Rainier with Eagle",price:null,status:"nfs",url:"https://tjm.art/products/painting-portrait-with-hat/",img:"art/painting-portrait-with-hat.webp",focal:!1,caption:"60 × 22 in (W × H)",hi:"https://img.tjm.art/gallery-wall/06b6660bc24b59597f923ebfa869fe3bcbacae363f1b8cab9a6486a3c73a756a-960.webp",w:3.489533021423588,h:.9761893007134544,fw:3.520013021423588,fh:1.0066693007134546},{id:"painting-red-horizon",kind:"painting",room:"central",wall:"E",x:12.59,y:1.6,z:-1.0305912207709187,ix:-1,iz:0,iw:1.1683964260533493,ih:2.2352068371362455,s:1,smax:1,title:"Sunset at Kihei on Maui",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-red-horizon/",img:"art/painting-red-horizon.webp",focal:!1,caption:"23 × 44 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f6e3bea6cf0aae99cac1bf06cccd45149b5be70beb16be754e64984b0e176efc-960.webp",w:1.1683964260533493,h:2.2352068371362455,fw:1.1988764260533493,fh:2.2656868371362453},{id:"sunset-in-el-tunco-el-salvador",kind:"painting",room:"central",wall:"E",x:12.59,y:.5307576828140823,z:-2.7008394269579212,ix:-1,iz:0,iw:.6701934986403812,ih:.2310353656281656,s:1,smax:1,title:"Sunset in El Tunco, El Salvador",price:null,status:"sold",url:"https://tjm.art/products/sunset-in-el-tunco-el-salvador/",img:"art/sunset-in-el-tunco-el-salvador.webp",focal:!1,caption:"12 × 5 in (W × H)",hi:"https://tjm.art/gallery-images/beach-walk.jpg",w:.6701934986403812,h:.2310353656281656,fw:.7006734986403812,fh:.2615153656281656},{id:"sunset-in-el-zonte-el-salvador",kind:"painting",room:"central",wall:"S",x:-1.4198050243492992,y:1.6,z:-8.965,ix:0,iz:1,iw:.9216934355788746,ih:1.8815259098713577,s:1,smax:1,title:"Sunset in El Zonte, El Salvador",price:null,status:"nfs",url:"https://tjm.art/products/sunset-in-el-zonte-el-salvador/",img:"art/sunset-in-el-zonte-el-salvador.webp",focal:!1,caption:"24 × 28 in (W × H)",hi:"https://img.tjm.art/wall-paintings/sunset-in-el-zonte-el-salvador-66c1e1ab57-290.webp",w:.9216934355788746,h:1.8815259098713577,fw:.9521734355788746,fh:1.9120059098713575},{id:"painting-golden-coast",kind:"painting",room:"central",wall:"S",x:-2.6246885947273677,y:1.6,z:-8.965,ix:0,iz:1,iw:.7051771844599206,ih:1.3174425101565408,s:1,smax:1,title:"Sunset in the Strait of Juan de Fuca, Patos Island 1",price:null,status:"sold",url:"https://tjm.art/products/painting-golden-coast/",img:"art/painting-golden-coast.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9f3f1c8a20548e3041ad3062bf8879b280a5b26a63d3b6784f891c1f251e18e1-960.webp",w:.7051771844599206,h:1.3174425101565408,fw:.7356571844599206,fh:1.3479225101565406},{id:"painting-sunset-silhouette",kind:"painting",room:"central",wall:"S",x:-4.013553334023952,y:1.0885563719523823,z:-8.965,ix:0,iz:1,iw:1.2896557734159075,ih:.7203708300698564,s:1,smax:1,title:"Sunset in the Strait of Juan de Fuca, Sucia Island",price:null,status:"sold",url:"https://tjm.art/products/painting-sunset-silhouette/",img:"art/painting-sunset-silhouette.webp",focal:!1,caption:"24 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/75de88bb244df1dc710367f6eef13734be24c732398f783551c78e31674bca91-960.webp",w:1.2896557734159075,h:.7203708300698564,fw:1.3201357734159074,fh:.7508508300698563},{id:"painting-studio-figure",kind:"painting",room:"central",wall:"S",x:-4.013553334023952,y:2.0554254150349283,z:-8.965,ix:0,iz:1,iw:1.1160767679489199,ih:.8324072560952361,s:1,smax:1,title:"Brekkie @BVBTC hoisting a sculpture in progress",price:"$400",status:"available",url:"https://tjm.art/products/painting-studio-figure/",img:"art/painting-studio-figure.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/studio-figure.jpg",w:1.1160767679489199,h:.8324072560952361,fw:1.14655676794892,fh:.8628872560952361},{id:"painting-portrait-with-cheese",kind:"painting",room:"central",wall:"S",x:-6.248945922791158,y:.774450244842766,z:-8.965,ix:0,iz:1,iw:1.2931568814339582,ih:.7184204896855323,s:1,smax:1,title:"Brekkie @BVBTC with polished Bitcoin B",price:"$400",status:"available",url:"https://tjm.art/products/painting-portrait-with-cheese/",img:"art/painting-portrait-with-cheese.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/portrait-with-cheese.jpg",w:1.2931568814339582,h:.7184204896855323,fw:1.3236368814339583,fh:.7489004896855322},{id:"burning-man-temple-2022-blue",kind:"painting",room:"central",wall:"S",x:-9.021474327968539,y:1.004744396930167,z:-8.965,ix:0,iz:1,iw:2.3639274062362587,ih:1.1790087938603342,s:1,smax:1,title:"Burning Man Temple 2022: Blue",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-blue/",img:"art/burning-man-temple-2022-blue.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-blue-7e4ea9513b-960.webp",w:2.3639274062362587,h:1.1790087938603342,fw:2.394407406236259,fh:1.2094887938603343},{id:"burning-man-temple-2022-daytime",kind:"painting",room:"central",wall:"S",x:-6.248945922791158,y:3.277652341535391,z:-8.965,ix:0,iz:1,iw:2.398232883401163,ih:1.1621436847481468,s:1,smax:1,title:"Burning Man Temple 2022: Daytime",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-daytime/",img:"art/burning-man-temple-2022-daytime.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-daytime-6e69733e63-960.webp",w:2.398232883401163,h:1.1621436847481468,fw:2.428712883401163,fh:1.1926236847481468},{id:"burning-man-temple-2022-flame",kind:"painting",room:"central",wall:"S",x:-6.248945922791158,y:1.915120494423425,z:-8.965,ix:0,iz:1,iw:2.3580249565601714,ih:1.1819600094757858,s:1,smax:1,title:"Burning Man Temple 2022: Flame",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-flame/",img:"art/burning-man-temple-2022-flame.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-flame-652b838481-960.webp",w:2.3580249565601714,h:1.1819600094757858,fw:2.3885049565601717,fh:1.212440009475786},{id:"burning-man-temple-2022-pink",kind:"painting",room:"central",wall:"S",x:-9.021474327968539,y:2.3796258589060444,z:-8.965,ix:0,iz:1,iw:2.342498697472854,ih:1.1897941300914203,s:1,smax:1,title:"Burning Man Temple 2022: Pink",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-pink/",img:"art/burning-man-temple-2022-pink.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-pink-92f2d4315e-960.webp",w:2.342498697472854,h:1.1897941300914203,fw:2.3729786974728544,fh:1.2202741300914204},{id:"daniel-portrait-1",kind:"painting",room:"central",wall:"S",x:-10.946839015543334,y:1.6,z:-8.965,ix:0,iz:1,iw:.7039054481959918,ih:1.3198227153674844,s:1,smax:1,title:"Daniel — portrait 1",price:null,status:"nfs",url:"https://tjm.art/products/daniel-portrait-1/",img:"art/daniel-portrait-1.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/daniel-portrait-1-52e78c730f-304.webp",w:.7039054481959918,h:1.3198227153674844,fw:.7343854481959917,fh:1.3503027153674845},{id:"painting-guitarist",kind:"painting",room:"central",wall:"S",x:10.646024290638334,y:2.051044506420685,z:-8.965,ix:0,iz:1,iw:.6360526644242458,ih:.7303093375459383,s:1,smax:1,title:"Girl Tuning Guitar",price:null,status:"nfs",url:"https://tjm.art/products/painting-guitarist/",img:"art/painting-guitarist.webp",focal:!1,caption:"15 × 12 in (W × H)",hi:"https://img.tjm.art/gallery-wall/df6cb0c90b3e3686c53c19965833979894218165c6c141e33f01331582f9cb18-960.webp",w:.6360526644242458,h:.7303093375459383,fw:.6665326644242457,fh:.7607893375459382},{id:"girl-wearing-flower-crown",kind:"painting",room:"central",wall:"S",x:9.244398900378124,y:1.6,z:-8.965,ix:0,iz:1,iw:.7148193617970907,ih:1.2996715669038013,s:1,smax:1,title:"Girl Wearing Flower Crown",price:null,status:"sold",url:"https://tjm.art/products/girl-wearing-flower-crown/",img:"art/girl-wearing-flower-crown.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/girl-wearing-flower-crown-1b69db9b36-308.webp",w:.7148193617970907,h:1.2996715669038013,fw:.7452993617970907,fh:1.330151566903801},{id:"myself-my-mother-ruth-my-grandpa-howard",kind:"painting",room:"central",wall:"S",x:7.846866634655402,y:1.6,z:-8.965,ix:0,iz:1,iw:1.29734864893101,ih:.7160992542486577,s:1,smax:1,title:"Myself, my mother Ruth, my grandpa Howard",price:null,status:"nfs",url:"https://tjm.art/products/myself-my-mother-ruth-my-grandpa-howard/",img:"art/myself-my-mother-ruth-my-grandpa-howard.webp",focal:!1,caption:"24 × 15 in (W × H)",hi:"https://tjm.art/gallery-images/family-portrait.jpg",w:1.29734864893101,h:.7160992542486577,fw:1.32782864893101,fh:.7465792542486577},{id:"michael-and-katie-in-yelapa",kind:"painting",room:"central",wall:"S",x:6.212702349186177,y:.9893967280691713,z:-8.965,ix:0,iz:1,iw:.809039025915651,ih:1.1483134561383432,s:1,smax:1,title:"Romance in Yelapa",price:null,status:"sold",url:"https://tjm.art/products/michael-and-katie-in-yelapa/",img:"art/michael-and-katie-in-yelapa.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/embrace.jpg",w:.809039025915651,h:1.1483134561383432,fw:.839519025915651,fh:1.1787934561383433},{id:"painting-couple-in-color",kind:"painting",room:"central",wall:"S",x:6.212702349186177,y:2.1450120688313565,z:-8.965,ix:0,iz:1,iw:1.1880834012901,ih:.7819572253860267,s:1,smax:1,title:"Aunt Fran and Cousin Hillary",price:null,status:"nfs",url:"https://tjm.art/products/painting-couple-in-color/",img:"art/painting-couple-in-color.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f6b3e14539ed681eb7395e1d56e8537a437d8f085d5acc986d2d0318bc775c36-960.webp",w:1.1880834012901,h:.7819572253860267,fw:1.2185634012900999,fh:.8124372253860267},{id:"painting-portrait-in-green",kind:"painting",room:"central",wall:"S",x:6.212702349186177,y:3.0997166599809316,z:-8.965,ix:0,iz:1,iw:.6222641727056942,ih:.7464919569131241,s:1,smax:1,title:"Chase Toole",price:"$200",status:"available",url:"https://tjm.art/products/painting-portrait-in-green/",img:"art/painting-portrait-in-green.webp",focal:!1,caption:"12 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9ba4b0f54e321f8b264ccb423549c1d935d4e02767f91549de7c6fade8ccf5b8-960.webp",w:.6222641727056942,h:.7464919569131241,fw:.6527441727056942,fh:.7769719569131242},{id:"painting-portrait-in-gold",kind:"painting",room:"central",wall:"S",x:4.280640569459756,y:.7693721578816326,z:-8.965,ix:0,iz:1,iw:.6558500684866669,ih:.7082643157632653,s:1,smax:1,title:"Dorian Nakamoto",price:"$200",status:"available",url:"https://tjm.art/products/painting-portrait-in-gold/",img:"art/painting-portrait-in-gold.webp",focal:!1,caption:"12 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/edcc7405e05f4353e269958204c32ca9af022e77e445f06fb978c3a877bbee34-960.webp",w:.6558500684866669,h:.7082643157632653,fw:.6863300684866669,fh:.7387443157632654},{id:"painting-clouds-over-water",kind:"painting",room:"central",wall:"S",x:4.280640569459756,y:1.6859013817873993,z:-8.965,ix:0,iz:1,iw:.4440800788347868,ih:.7438341320482679,s:1,smax:1,title:"El Salvador",price:"$200",status:"available",url:"https://tjm.art/products/painting-clouds-over-water/",img:"art/painting-clouds-over-water.webp",focal:!1,caption:"8 × 16 in (W × H)",hi:"https://img.tjm.art/wall-paintings/painting-clouds-over-water-dda20437ce-320.webp",w:.4440800788347868,h:.7438341320482679,fw:.4745600788347868,fh:.7743141320482678},{id:"painting-twin-dragons",kind:"painting",room:"central",wall:"S",x:1.7419723754675567,y:2.462777810952043,z:-8.965,ix:0,iz:1,iw:2.4012962298216567,ih:1.2380385406346952,s:1,smax:1,title:"El Salvador: Future - Chase Toole Collab",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-twin-dragons/",img:"art/painting-twin-dragons.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://tjm.art/gallery-images/twin-dragons.jpg",w:2.4012962298216567,h:1.2380385406346952,fw:2.431776229821657,fh:1.2685185406346953},{id:"painting-insect-garden",kind:"painting",room:"central",wall:"S",x:1.7419723754675567,y:1.0342592703173477,z:-8.965,ix:0,iz:1,iw:2.4012962298216567,ih:1.2380385406346952,s:1,smax:1,title:"El Salvador: Past - Chase Toole Collab",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-insect-garden/",img:"art/painting-insect-garden.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://tjm.art/gallery-images/insect-garden.jpg",w:2.4012962298216567,h:1.2380385406346952,fw:2.431776229821657,fh:1.2685185406346953},{id:"painting-emergence",kind:"painting",room:"central",wall:"S",x:4.280640569459756,y:3.033473228318842,z:-8.965,ix:0,iz:1,iw:1.8931436374453998,ih:1.5703495610146174,s:1,smax:1,title:"El Salvador: Present - Chase Toole Collab",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-emergence/",img:"art/painting-emergence.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://tjm.art/gallery-images/emergence.jpg",w:1.8931436374453998,h:1.5703495610146174,fw:1.9236236374453999,fh:1.6008295610146175},{id:"grandpa-howard",kind:"painting",room:"central",wall:"S",x:-.2088170230015669,y:1.6,z:-8.965,ix:0,iz:1,iw:.7173860463992489,ih:1.2950215642791636,s:1,smax:1,title:"Grandpa Howard",price:null,status:"nfs",url:"https://tjm.art/products/grandpa-howard/",img:"art/grandpa-howard.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/grandpa-howard-c0035dc5a5-308.webp",w:.7173860463992489,h:1.2950215642791636,fw:.7478660463992488,fh:1.3255015642791637},{id:"honeybadger-and-cub-with-genesis-block",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.4152399999999996,z:-2.125000000000001,ix:1,iz:0,iw:1.3999999999999997,ih:1.9999999999999996,s:1,smax:1,title:"Honeybadger and Cub with Genesis Block",price:"$1,200",status:"available",url:"https://tjm.art/products/honeybadger-and-cub-with-genesis-block/",img:"art/honeybadger-and-cub-with-genesis-block.webp",focal:!1,caption:"100 × 70 cm (W × H)",hi:"https://img.tjm.art/gallery-wall/5661ac7acd18cb2d7e1634c9595fedb2ef05b6a9a0c454b5e5613b77c17a2c7b-960.webp",w:1.3999999999999997,h:1.9999999999999996,fw:1.4304799999999998,fh:2.0304799999999994},{id:"hope-the-vermillion-aurora",kind:"painting",room:"central",wall:"W",x:-12.59,y:3.164519999999999,z:-2.125000000000001,ix:1,iz:0,iw:2.2352,ih:1.1176,s:1,smax:1,title:"Hope, the Vermillion Aurora",price:"$2,000",status:"available",url:"https://tjm.art/products/hope-the-vermillion-aurora/",img:"art/hope-the-vermillion-aurora.webp",focal:!1,caption:"44 × 22 in (W × H)",hi:"https://img.tjm.art/gallery-wall/62fadea5e859a0d9adca611a1bbb9d8b714edf350fa0885e2920296867d136fb-960.webp",w:2.2352,h:1.1176,fw:2.2656799999999997,fh:1.14808},{id:"painting-chef-in-white",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.6000000000000003,z:8.979185392910821,ix:1,iz:0,iw:.7184204896855323,ih:1.293156881433958,s:1,smax:1,title:"Jimmy Song @jimmysong",price:"$400",status:"available",url:"https://tjm.art/products/painting-chef-in-white/",img:"art/painting-chef-in-white.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/chef-in-white.jpg",w:.7184204896855323,h:1.293156881433958,fw:.7489004896855322,fh:1.3236368814339579},{id:"joaquim-in-zihuatanejo",kind:"painting",room:"central",wall:"W",x:-12.59,y:.9576355752031905,z:10.201817818876794,ix:1,iz:0,iw:.8564140661103009,ih:1.0847911504063812,s:1,smax:1,title:"Joaquim in Zihuatanejo",price:null,status:"sold",url:"https://tjm.art/products/joaquim-in-zihuatanejo/",img:"art/joaquim-in-zihuatanejo.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/sunset-reflection.jpg",w:.8564140661103009,h:1.0847911504063812,fw:.8868940661103009,fh:1.1152711504063813},{id:"meditation-at-denny-blaine",kind:"painting",room:"central",wall:"W",x:-12.59,y:2.2659109821570844,z:10.201817818876794,ix:1,iz:0,iw:.8252309677520508,ih:1.1507996635014064,s:1,smax:1,title:"Meditation at Denny Blaine",price:"$600",status:"available",url:"https://tjm.art/products/meditation-at-denny-blaine/",img:"art/meditation-at-denny-blaine.webp",focal:!1,caption:"16 × 23 in (W × H)",hi:"https://img.tjm.art/gallery-wall/80cd427a93dfa369a63d4e8bd5232ebdce59355ee8dfbe8b83aea6b214613cc3-960.webp",w:.8252309677520508,h:1.1507996635014064,fw:.8557109677520508,fh:1.1812796635014062},{id:"painting-portrait-in-blue-light",kind:"painting",room:"central",wall:"W",x:-12.59,y:3.394629464907859,z:10.201817818876794,ix:1,iz:0,iw:.6401126212983141,ih:.7256773020001432,s:1,smax:1,title:"MJ",price:null,status:"nfs",url:"https://tjm.art/products/painting-portrait-in-blue-light/",img:"art/painting-portrait-in-blue-light.webp",focal:!1,caption:"15 × 12 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f8860ee7e0bc016ca435183a6539bac3ba4b0024f1078ac1d1f075f98c2fcb53-960.webp",w:.6401126212983141,h:.7256773020001432,fw:.6705926212983141,fh:.7561573020001432},{id:"painting-lightburst",kind:"painting",room:"central",wall:"N",x:-10.339992140373251,y:1.6595807893338543,z:11.965,ix:0,iz:-1,iw:1.1945671577605002,ih:2.488681578667709,s:1,smax:1,title:"Revelation",price:null,status:"nfs",url:"https://tjm.art/products/painting-lightburst/",img:"art/painting-lightburst.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/wall-paintings/painting-lightburst-c33406e958-288.webp",w:1.1945671577605002,h:2.488681578667709,fw:1.2250471577605002,fh:2.519161578667709},{id:"rice-paddies-in-vietnam",kind:"painting",room:"central",wall:"E",x:12.59,y:3.3852849927524935,z:-2.7008394269579212,ix:-1,iz:0,iw:1.29734864893101,ih:.7160992542486577,s:1,smax:1,title:"Rice paddies in Vietnam, Photo Credit: Daniel Goldsmith",price:null,status:"nfs",url:"https://tjm.art/products/rice-paddies-in-vietnam/",img:"art/rice-paddies-in-vietnam.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/two-soldiers.jpg",w:1.29734864893101,h:.7160992542486577,fw:1.32782864893101,fh:.7465792542486577},{id:"painting-phoenix-rising",kind:"painting",room:"central",wall:"E",x:12.59,y:1.6515816324920103,z:-5.983527007148152,ix:-1,iz:0,iw:1.2022960328561172,ih:2.472683264984021,s:1,smax:1,title:"The Bounty of Satoshi: Achievement",price:null,status:"nfs",url:"https://tjm.art/products/painting-phoenix-rising/",img:"art/painting-phoenix-rising.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/3ae03c4519694354f32fd4500c9b80d14213531c3e37ed74b2e5a6bb9206b69e-960.webp",w:1.2022960328561172,h:2.472683264984021,fw:1.2327760328561173,fh:2.5031632649840208},{id:"painting-festival-portrait",kind:"painting",room:"central",wall:"E",x:12.59,y:1.64427919114709,z:-4.391609208839007,ix:-1,iz:0,iw:1.2094395774415163,ih:2.4580783822941803,s:1,smax:1,title:"The Bounty of Satoshi: Wonder",price:null,status:"nfs",url:"https://tjm.art/products/painting-festival-portrait/",img:"art/painting-festival-portrait.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/5a93fb9dae1591564ffabae3ec7eb4e3474858bad0c8c0c34ea878f467462e04-960.webp",w:1.2094395774415163,h:2.4580783822941803,fw:1.2399195774415164,fh:2.48855838229418},{id:"painting-figures-in-wheatfield",kind:"painting",room:"central",wall:"E",x:12.59,y:1.6,z:-7.324957511788106,ix:-1,iz:0,iw:.7084649901031347,ih:1.3113285948890097,s:1,smax:1,title:"The Mother of Kiev",price:null,status:"sold",url:"https://tjm.art/products/painting-figures-in-wheatfield/",img:"art/painting-figures-in-wheatfield.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/a97a42644b7c84e4693e2af671f49e0daf4f16a662d7ac9796fe5e2d67c055aa-960.webp",w:.7084649901031347,h:1.3113285948890097,fw:.7389449901031346,fh:1.3418085948890097},{id:"painting-sunflower-woman",kind:"painting",room:"central",wall:"S",x:10.646024290638334,y:1.1396053312270307,z:-8.965,ix:0,iz:1,iw:1.3055348980059875,ih:.7116090128413703,s:1,smax:1,title:"Vision of Ukraine at Peace",price:null,status:"sold",url:"https://tjm.art/products/painting-sunflower-woman/",img:"art/painting-sunflower-woman.webp",focal:!1,caption:"24 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/19bc1bffd4191f6c530e4dcbe85d95cb1b2dbd7ccbd6b024a5a285781523d63e-960.webp",w:1.3055348980059875,h:.7116090128413703,fw:1.3360148980059876,fh:.7420890128413704},{id:"warszawska-syrenka",kind:"painting",room:"central",wall:"E",x:12.59,y:1.836755365628165,z:-2.7008394269579212,ix:-1,iz:0,iw:1.3999999999999997,ih:1.9999999999999996,s:1,smax:1,title:"Warszawska Syrenka",price:"$1,200",status:"available",url:"https://tjm.art/products/warszawska-syrenka/",img:"art/warszawska-syrenka.webp",focal:!1,caption:"100 × 70 cm (W × H)",hi:"https://img.tjm.art/gallery-wall/6eb3799795acad929e3a84356c017bc8ce8174a9c4fa0b96604f389444e60718-960.webp",w:1.3999999999999997,h:1.9999999999999996,fw:1.4304799999999998,fh:2.0304799999999994},{id:"friends-club-mural",kind:"mural",room:"travels",wall:"N",x:1.5120000000000005,y:1.7715999999999998,z:23.465,ix:0,iz:-1,iw:12.192,ih:2.7432,s:1,smax:1,title:"Friends Club",price:null,status:"nfs",url:"https://tjm.art/murals/#friends-story",img:"art/friends-club-mural.webp",focal:!1,caption:"Lillooet, British Columbia · 2026 · 40 × 9 ft shipping-container mural",hi:"https://img.tjm.art/walkthrough/friends-club-mural-8e471cb081.webp",w:12.192,h:2.7432,fw:12.192,fh:2.7432},{id:"book-art-9ae261289a3bce952c6f",kind:"painting",room:"travels",wall:"S",x:9.629802606577051,y:1.6,z:15.535,ix:0,iz:1,iw:.7896717093456702,ih:.30244426467939173,s:1,smax:1,title:"Lisa Climbing Tahoma at Sunrise from Denny Blaine prototype",price:null,status:"nfs",url:"https://tjm.art/products/book-art-9ae261289a3bce952c6f/",img:"art/book-art-9ae261289a3bce952c6f.webp",focal:!1,caption:"Shown at its largest print size, 15.5 × 6 in",hi:"https://img.tjm.art/wall-paintings/book-art-9ae261289a3bce952c6f-c02294e976-960.webp",w:.7896717093456702,h:.30244426467939173,fw:.8201517093456703,fh:.3329242646793918},{id:"book-art-6e6d7ac51608e0b7f10f",kind:"painting",room:"travels",wall:"S",x:-8.290892174118536,y:1.6,z:15.535,ix:0,iz:1,iw:.2780957448148393,ih:.44282761913190966,s:1,smax:1,title:"Moonrise in Santa Monica, photo credit: Paul Murphy",price:null,status:"nfs",url:"https://tjm.art/products/book-art-6e6d7ac51608e0b7f10f/",img:"art/book-art-6e6d7ac51608e0b7f10f.webp",focal:!1,caption:"Shown at its largest print size, 5.5 × 8.7 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/6e6d7ac51608e0b7f10f.webp",w:.2780957448148393,h:.44282761913190966,fw:.3085757448148393,fh:.47330761913190966},{id:"book-art-471daf14a8bb7883f114",kind:"painting",room:"travels",wall:"S",x:-9.221832803081494,y:1.6,z:15.535,ix:0,iz:1,iw:.5746169096888404,ih:.3085692805029073,s:1,smax:1,title:"Myself in Skandasana on Playa de los Muertos at Dawn in Puerto Vallarta",price:null,status:"nfs",url:"https://tjm.art/products/book-art-471daf14a8bb7883f114/",img:"art/book-art-471daf14a8bb7883f114.webp",focal:!1,caption:"Shown at its largest print size, 11.3 × 6.1 in",hi:"https://img.tjm.art/wall-paintings/book-art-471daf14a8bb7883f114-6db9296c0b-960.webp",w:.5746169096888404,h:.3085692805029073,fw:.6050969096888403,fh:.3390492805029073},{id:"book-art-c198f09bc8ddad18ed1e",kind:"painting",room:"travels",wall:"S",x:-10.234466705906353,y:1.6,z:15.535,ix:0,iz:1,iw:.44148229253864113,ih:.2406078494335594,s:1,smax:1,title:"Sunrise at Bass Coast, Merritt, BC 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-c198f09bc8ddad18ed1e/",img:"art/book-art-c198f09bc8ddad18ed1e.webp",focal:!1,caption:"Shown at its largest print size, 8.7 × 4.7 in",hi:"https://img.tjm.art/wall-paintings/book-art-c198f09bc8ddad18ed1e-994bc476f6-960.webp",w:.44148229253864113,h:.2406078494335594,fw:.47196229253864114,fh:.2710878494335594},{id:"book-art-87cf2a732259b313f5ab",kind:"painting",room:"travels",wall:"S",x:-11.072723926087837,y:1.6,z:15.535,ix:0,iz:1,iw:.22586354440209216,ih:.397647085214951,s:1,smax:1,title:"Sunrise in Puerto Vallarta",price:null,status:"nfs",url:"https://tjm.art/products/book-art-87cf2a732259b313f5ab/",img:"art/book-art-87cf2a732259b313f5ab.webp",focal:!1,caption:"Shown at its largest print size, 4.4 × 7.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/87cf2a732259b313f5ab.webp",w:.22586354440209216,h:.397647085214951,fw:.25634354440209217,fh:.428127085214951},{id:"book-art-e97329411fa8b273b508",kind:"painting",room:"travels",wall:"S",x:2.381332333459056,y:1.6,z:15.535,ix:0,iz:1,iw:.29499135545507105,ih:.4812257022105564,s:1,smax:1,title:"Sunrise in Traverse City, photo credit: Paul Murphy",price:null,status:"nfs",url:"https://tjm.art/products/book-art-e97329411fa8b273b508/",img:"art/book-art-e97329411fa8b273b508.webp",focal:!1,caption:"Shown at its largest print size, 5.8 × 9.5 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/e97329411fa8b273b508.webp",w:.29499135545507105,h:.4812257022105564,fw:.32547135545507105,fh:.5117057022105564},{id:"book-art-deb3358c321671dae1fc",kind:"painting",room:"travels",wall:"S",x:1.6304031796438392,y:1.6,z:15.535,ix:0,iz:1,iw:.3255459822972186,ih:.6006383437218055,s:1,smax:1,title:"Sunrise on Tahoma with motorcycles",price:null,status:"nfs",url:"https://tjm.art/products/book-art-deb3358c321671dae1fc/",img:"art/book-art-deb3358c321671dae1fc.webp",focal:!1,caption:"Shown at its largest print size, 6.4 × 11.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/deb3358c321671dae1fc.webp",w:.3255459822972186,h:.6006383437218055,fw:.3560259822972186,fh:.6311183437218055},{id:"book-art-e589c9375e23d1de4748",kind:"painting",room:"travels",wall:"S",x:.773172632608675,y:1.6,z:15.535,ix:0,iz:1,iw:.5075941418949661,ih:.2801919663260212,s:1,smax:1,title:"Sunset in Greece, Photo Credit: Chelsea Murphy",price:null,status:"nfs",url:"https://tjm.art/products/book-art-e589c9375e23d1de4748/",img:"art/book-art-e589c9375e23d1de4748.webp",focal:!1,caption:"Shown at its largest print size, 10 × 5.5 in",hi:"https://img.tjm.art/wall-paintings/book-art-e589c9375e23d1de4748-878e092b32-960.webp",w:.5075941418949661,h:.2801919663260212,fw:.538074141894966,fh:.3106719663260212},{id:"book-art-d1399111a441ed91feaa",kind:"painting",room:"travels",wall:"S",x:-.05810221369051083,y:1.6,z:15.535,ix:0,iz:1,iw:.2736345808252618,ih:.4975174196822941,s:1,smax:1,title:"Sunset in the Strait of Juan de Fuca, Patos Island 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-d1399111a441ed91feaa/",img:"art/book-art-d1399111a441ed91feaa.webp",focal:!1,caption:"Shown at its largest print size, 5.4 × 9.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/d1399111a441ed91feaa.webp",w:.2736345808252618,h:.4975174196822941,fw:.3041145808252618,fh:.5279974196822941},{id:"book-art-a2e53a8418a8d84f3dc5",kind:"painting",room:"travels",wall:"S",x:-1.4940962616533975,y:1.6,z:15.535,ix:0,iz:1,iw:.2954171324542519,ih:.22747119198977392,s:1,smax:1,title:"El Salvador",price:null,status:"nfs",url:"https://tjm.art/products/book-art-a2e53a8418a8d84f3dc5/",img:"art/book-art-a2e53a8418a8d84f3dc5.webp",focal:!1,caption:"Shown at its largest print size, 5.8 × 4.5 in",hi:"https://img.tjm.art/wall-paintings/book-art-a2e53a8418a8d84f3dc5-eba19eb317-960.webp",w:.2954171324542519,h:.22747119198977392,fw:.3258971324542519,fh:.2579511919897739},{id:"book-art-e3293c73dbb01f94b39b",kind:"painting",room:"travels",wall:"S",x:-.7706535997647066,y:1.6,z:15.535,ix:0,iz:1,iw:.2701472214449861,ih:.21449689382731896,s:1,smax:1,title:"El Salvador",price:null,status:"nfs",url:"https://tjm.art/products/book-art-e3293c73dbb01f94b39b/",img:"art/book-art-e3293c73dbb01f94b39b.webp",focal:!1,caption:"Shown at its largest print size, 5.3 × 4.2 in",hi:"https://img.tjm.art/wall-paintings/book-art-e3293c73dbb01f94b39b-2be213bfaa-960.webp",w:.2701472214449861,h:.21449689382731896,fw:.3006272214449861,fh:.24497689382731896},{id:"book-art-55829535637cd4974a88",kind:"painting",room:"travels",wall:"S",x:-2.2269026303592345,y:1.6,z:15.535,ix:0,iz:1,iw:.28887463507927824,ih:.2258999646319956,s:1,smax:1,title:"Hawaii",price:null,status:"nfs",url:"https://tjm.art/products/book-art-55829535637cd4974a88/",img:"art/book-art-55829535637cd4974a88.webp",focal:!1,caption:"Shown at its largest print size, 5.7 × 4.4 in",hi:"https://img.tjm.art/wall-paintings/book-art-55829535637cd4974a88-f905147f0a-960.webp",w:.28887463507927824,h:.2258999646319956,fw:.31935463507927825,fh:.25637996463199564},{id:"book-art-94e2edf9a24c90950489",kind:"painting",room:"travels",wall:"S",x:-3.124557463820567,y:1.6,z:15.535,ix:0,iz:1,iw:.6251140619652434,ih:.30568077630100404,s:1,smax:1,title:"Inside album cover for Yes: Close to the Edge",price:null,status:"nfs",url:"https://tjm.art/products/book-art-94e2edf9a24c90950489/",img:"art/book-art-94e2edf9a24c90950489.webp",focal:!1,caption:"Shown at its largest print size, 12.3 × 6 in",hi:"https://img.tjm.art/wall-paintings/book-art-94e2edf9a24c90950489-bfc815d54d-960.webp",w:.6251140619652434,h:.30568077630100404,fw:.6555940619652434,fh:.336160776301004},{id:"book-art-ff6db6906f0ed48ccc3a",kind:"painting",room:"travels",wall:"S",x:-4.207427247401594,y:1.6,z:15.535,ix:0,iz:1,iw:.6593045353186678,ih:.4931597924183636,s:1,smax:1,title:"Sedona Monuments",price:null,status:"nfs",url:"https://tjm.art/products/book-art-ff6db6906f0ed48ccc3a/",img:"art/book-art-ff6db6906f0ed48ccc3a.webp",focal:!1,caption:"Shown at its largest print size, 13 × 9.7 in",hi:"https://img.tjm.art/wall-paintings/book-art-ff6db6906f0ed48ccc3a-6efc3645f3-960.webp",w:.6593045353186678,h:.4931597924183636,fw:.6897845353186678,fh:.5236397924183636},{id:"book-art-27fee33e69f262ecfacb",kind:"painting",room:"travels",wall:"S",x:8.441113375952108,y:1.6,z:15.535,ix:0,iz:1,iw:.5116252131541055,ih:.6740780146957911,s:1,smax:1,title:"Sedona: Bell Rock 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-27fee33e69f262ecfacb/",img:"art/book-art-27fee33e69f262ecfacb.webp",focal:!1,caption:"Shown at its largest print size, 10.1 × 13.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/27fee33e69f262ecfacb.webp",w:.5116252131541055,h:.6740780146957911,fw:.5421052131541055,fh:.704558014695791},{id:"book-art-f2025e5a72f4a70866c6",kind:"painting",room:"travels",wall:"S",x:4.268374248062832,y:1.6,z:15.535,ix:0,iz:1,iw:.5374105339961939,ih:.43154065879894365,s:1,smax:1,title:"Untitled — Assorted Adventures, page 59",price:null,status:"nfs",url:"https://tjm.art/products/book-art-f2025e5a72f4a70866c6/",img:"art/book-art-f2025e5a72f4a70866c6.webp",focal:!1,caption:"Shown at its largest print size, 10.6 × 8.5 in",hi:"https://img.tjm.art/wall-paintings/book-art-f2025e5a72f4a70866c6-f6d52f6258-960.webp",w:.5374105339961939,h:.43154065879894365,fw:.5678905339961939,fh:.46202065879894366},{id:"book-art-3a9cba708a8045364e82",kind:"painting",room:"people",wall:"W",x:-23.19,y:.9264741748636597,z:20.84829342650015,ix:1,iz:0,iw:.6021956096422897,ih:.31976586872005586,s:1,smax:1,title:"Dawn and her father Pete at Burning Man",price:null,status:"nfs",url:"https://tjm.art/products/book-art-3a9cba708a8045364e82/",img:"art/book-art-3a9cba708a8045364e82.webp",focal:!1,caption:"Shown at its largest print size, 11.9 × 6.3 in",hi:"https://img.tjm.art/wall-paintings/book-art-3a9cba708a8045364e82-6d25875d18-960.webp",w:.6021956096422897,h:.31976586872005586,fw:.6326756096422896,fh:.3502458687200558},{id:"archived-painting-22",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.855122934360028,z:20.84829342650015,ix:1,iz:0,iw:2.4097868898506176,ih:1.1565716502726808,s:1,smax:1,title:"Devo & Katie @ Bass Coast",price:"$1,000",status:"available",url:"https://tjm.art/products/archived-painting-22/",img:"art/archived-painting-22.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/a162cfb27e01580ab91fcb783c9c9b81fe68a0e4f572c73e902855b0eb09365a-960.webp",w:2.4097868898506176,h:1.1565716502726808,fw:2.4402668898506175,fh:1.187051650272681},{id:"book-art-74a736000a32427842b1",kind:"painting",room:"people",wall:"N",x:-21.506930165146272,y:1.2482939979540457,z:23.465,ix:0,iz:-1,iw:.5658555360795986,ih:.5041772826469224,s:1,smax:1,title:"Laura and Cafécito on paddleboard in Lake Washington",price:null,status:"nfs",url:"https://tjm.art/products/book-art-74a736000a32427842b1/",img:"art/book-art-74a736000a32427842b1.webp",focal:!1,caption:"Shown at its largest print size, 11.1 × 9.9 in",hi:"https://img.tjm.art/wall-paintings/book-art-74a736000a32427842b1-845d6258d2-960.webp",w:.5658555360795986,h:.5041772826469224,fw:.5963355360795985,fh:.5346572826469225},{id:"book-art-50a7984f819bec72d1c7",kind:"painting",room:"people",wall:"N",x:-21.506930165146272,y:1.9473286413234616,z:23.465,ix:0,iz:-1,iw:.38572486707711584,ih:.5129320040919093,s:1,smax:1,title:"Myself Painting on Mt Baker near Goat Lake",price:null,status:"nfs",url:"https://tjm.art/products/book-art-50a7984f819bec72d1c7/",img:"art/book-art-50a7984f819bec72d1c7.webp",focal:!1,caption:"Shown at its largest print size, 7.6 × 10.1 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/50a7984f819bec72d1c7.webp",w:.38572486707711584,h:.5129320040919093,fw:.41620486707711585,fh:.5434120040919093},{id:"archived-painting-308",kind:"painting",room:"people",wall:"N",x:-20.26759115518203,y:1.1619553630779875,z:23.465,ix:0,iz:-1,iw:.6896920516739855,ih:.9094933213316173,s:1,smax:1,title:"Self Portrait on Goat Lake",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-308/",img:"art/archived-painting-308.webp",focal:!1,caption:"Shown at its largest print size, 13.6 × 17.9 in",hi:"https://img.tjm.art/gallery-wall/23cb306de1e7d1c1608c00cfb6ed7f612683d28af9cad0e20444ea53f4f23fe8-960.webp",w:.6896920516739855,h:.9094933213316173,fw:.7201720516739856,fh:.9399733213316173},{id:"archived-painting-370",kind:"painting",room:"people",wall:"N",x:-20.26759115518203,y:2.149986660665809,z:23.465,ix:0,iz:-1,iw:.9120583502210449,ih:.6856092738440254,s:1,smax:1,title:"Ben & Kermit & Swan",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-370/",img:"art/archived-painting-370.webp",focal:!1,caption:"Shown at its largest print size, 18 × 13.5 in",hi:"https://img.tjm.art/gallery-wall/4b6a2895e642a6103cba97fdfc26f05f48f0f2121136f3db346f87b90e151445-960.webp",w:.9120583502210449,h:.6856092738440254,fw:.9425383502210448,fh:.7160892738440253},{id:"archived-painting-416",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.8874606062489812,z:2.375,ix:-1,iz:0,iw:1.0768090734028848,ih:.5946911295180528,s:1,smax:1,title:"Brekkie Finishing Orange Calcite B",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-416/",img:"art/archived-painting-416.webp",focal:!1,caption:"Shown at its largest print size, 21.2 × 11.7 in",hi:"https://img.tjm.art/gallery-wall/a616e8fe5d34df6ce9ddba9e9c389ffee6a97974faea046237220f94c7710e30-960.webp",w:1.0768090734028848,h:.5946911295180528,fw:1.1072890734028848,fh:.6251711295180529},{id:"archived-painting-412",kind:"painting",room:"people",wall:"S",x:-17.230996830993607,y:.899846735172378,z:.035,ix:0,iz:1,iw:.8566451490837687,ih:.6195999478460914,s:1,smax:1,title:"Brekkie Hoisting Orange Calcite B",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-412/",img:"art/archived-painting-412.webp",focal:!1,caption:"Shown at its largest print size, 16.9 × 12.2 in",hi:"https://img.tjm.art/gallery-wall/49077623a9eebab719aa89b099be7bcf78a21f03cb7ea7e247ac7f55f03293db-960.webp",w:.8566451490837687,h:.6195999478460914,fw:.8871251490837686,fh:.6500799478460914},{id:"archived-painting-301",kind:"painting",room:"people",wall:"S",x:-17.230996830993607,y:2.0050399739230453,z:.035,ix:0,iz:1,iw:1.1262589194405286,ih:1.209826529655244,s:1,smax:1,title:"Catherine #1",price:"$600",status:"available",url:"https://tjm.art/products/archived-painting-301/",img:"art/archived-painting-301.webp",focal:!1,caption:"22 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/83af905a4d9fc70fe6a9f1e6701a3b701bda410567f28a456c6553c272b2358f-960.webp",w:1.1262589194405286,h:1.209826529655244,fw:1.1567389194405286,fh:1.240306529655244},{id:"book-art-9209f1fd7d47f373597f",kind:"painting",room:"people",wall:"S",x:-19.306099849478603,y:1.9539092840571541,z:.035,ix:0,iz:1,iw:.2321127231660063,ih:.5461475839200148,s:1,smax:1,title:"Catherine dance series — study 1",price:null,status:"nfs",url:"https://tjm.art/products/book-art-9209f1fd7d47f373597f/",img:"art/book-art-9209f1fd7d47f373597f.webp",focal:!1,caption:"Shown at its largest print size, 4.6 × 10.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/9209f1fd7d47f373597f.webp",w:.2321127231660063,h:.5461475839200148,fw:.2625927231660063,fh:.5766275839200148},{id:"book-art-a61c71e5de8cc1b71500",kind:"painting",room:"people",wall:"S",x:-19.306099849478603,y:1.2316862080399924,z:.035,ix:0,iz:1,iw:.32747531361635723,ih:.5173385681143085,s:1,smax:1,title:"Catherine dance series — study 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-a61c71e5de8cc1b71500/",img:"art/book-art-a61c71e5de8cc1b71500.webp",focal:!1,caption:"Shown at its largest print size, 6.4 × 10.2 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/a61c71e5de8cc1b71500.webp",w:.32747531361635723,h:.5173385681143085,fw:.35795531361635724,fh:.5478185681143084},{id:"book-art-596837cb5ff533c620dd",kind:"painting",room:"people",wall:"S",x:-18.468244241692148,y:2.025199954743127,z:.035,ix:0,iz:1,iw:.33202115940986554,ih:.5734389627113394,s:1,smax:1,title:"Catherine dance series — study 3",price:null,status:"nfs",url:"https://tjm.art/products/book-art-596837cb5ff533c620dd/",img:"art/book-art-596837cb5ff533c620dd.webp",focal:!1,caption:"Shown at its largest print size, 6.5 × 11.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/596837cb5ff533c620dd.webp",w:.33202115940986554,h:.5734389627113394,fw:.36250115940986555,fh:.6039189627113395},{id:"book-art-7bce6e3509027d1f7a0b",kind:"painting",room:"people",wall:"S",x:-18.468244241692148,y:1.2180405186443304,z:.035,ix:0,iz:1,iw:.3088425176395667,ih:.6599199094862537,s:1,smax:1,title:"Catherine dance series — study 4",price:null,status:"nfs",url:"https://tjm.art/products/book-art-7bce6e3509027d1f7a0b/",img:"art/book-art-7bce6e3509027d1f7a0b.webp",focal:!1,caption:"Shown at its largest print size, 6.1 × 13 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/7bce6e3509027d1f7a0b.webp",w:.3088425176395667,h:.6599199094862537,fw:.3393225176395667,fh:.6903999094862536},{id:"archived-painting-133",kind:"painting",room:"people",wall:"S",x:-20.322293684308953,y:1.6000000000000003,z:.035,ix:0,iz:1,iw:.6886976134976582,ih:1.156687021539198,s:1,smax:1,title:"Devo in Front of the Mayan Warrior",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-133/",img:"art/archived-painting-133.webp",focal:!1,caption:"Shown at its largest print size, 13.6 × 22.8 in",hi:"https://img.tjm.art/gallery-wall/20686e5b976babbe2b5e90a7067f631f6bbbdcdf654e83b6985bdbe7431acc6c-960.webp",w:.6886976134976582,h:1.156687021539198,fw:.7191776134976582,fh:1.187167021539198},{id:"archived-painting-363",kind:"painting",room:"people",wall:"S",x:-21.47844124552889,y:1.6,z:.035,ix:0,iz:1,iw:.6073827663955337,ih:.8290800146480133,s:1,smax:1,title:"Elon & Lil’ X in the Oval Office",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-363/",img:"art/archived-painting-363.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.3 in",hi:"https://img.tjm.art/gallery-wall/c395c1c2a73621f0eba699af365ff267e7e04b4d7af6d133ec931f03a98938d0-960.webp",w:.6073827663955337,h:.8290800146480133,fw:.6378627663955336,fh:.8595600146480133},{id:"archived-painting-66",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.6,z:2.1164095636668083,ix:1,iz:0,iw:1.3391928701845242,ih:1.1022505517047803,s:1,smax:1,title:"Flamenco Guitarist in Zihuatanejo",price:"$600",status:"available",url:"https://tjm.art/products/archived-painting-66/",img:"art/archived-painting-66.webp",focal:!1,caption:"26 × 22 in (W × H)",hi:"https://img.tjm.art/gallery-wall/51f462f3a96a1a6da5485b16a847912d453b17ea5afba5ada4624619ff5287a3-960.webp",w:1.3391928701845242,h:1.1022505517047803,fw:1.369672870184524,fh:1.13273055170478},{id:"archived-painting-367",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.198031837192676,z:3.715324536450643,ix:1,iz:0,iw:.6099465010790747,ih:.8383591991253301,s:1,smax:1,title:"Josie, The Redheaded Libertarian",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-367/",img:"art/archived-painting-367.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.5 in",hi:"https://img.tjm.art/gallery-wall/64e27601d760271561cd6a29135a46e368d669d2d9dfa7360337d561aa2ad8f8-960.webp",w:.6099465010790747,h:.8383591991253301,fw:.6404265010790746,fh:.8688391991253301},{id:"archived-painting-364",kind:"painting",room:"people",wall:"W",x:-23.19,y:2.114419599562665,z:3.715324536450643,ix:1,iz:0,iw:.8345308182340554,ih:.6134563256146484,s:1,smax:1,title:"Max Keiser & Michael Saylor",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-364/",img:"art/archived-painting-364.webp",focal:!1,caption:"Shown at its largest print size, 16.4 × 12.1 in",hi:"https://img.tjm.art/gallery-wall/b29e07d3045e85d048b268939aa32ca68a492f7a88b694408491e4969250181a-960.webp",w:.8345308182340554,h:.6134563256146484,fw:.8650108182340553,fh:.6439363256146483},{id:"archived-painting-362",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.14101068996481,z:5.0877121555535885,ix:1,iz:0,iw:.8861381628227467,ih:.6317711538994105,s:1,smax:1,title:"Max Keiser & Stacey Herbert",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-362/",img:"art/archived-painting-362.webp",focal:!1,caption:"Shown at its largest print size, 17.4 × 12.4 in",hi:"https://img.tjm.art/gallery-wall/495def835824cee6f5ddabd2e49dac28b6a11588900c98d69c8294f33fe724ac-960.webp",w:.8861381628227467,h:.6317711538994105,fw:.9166181628227467,fh:.6622511538994105},{id:"book-art-029f45a5fbfd6c90212e",kind:"painting",room:"people",wall:"W",x:-23.19,y:2.011125576949705,z:5.0877121555535885,ix:1,iz:0,iw:.4037617341390608,ih:.7274986200703798,s:1,smax:1,title:"Mikyla, Mandy, and Guin",price:null,status:"nfs",url:"https://tjm.art/products/book-art-029f45a5fbfd6c90212e/",img:"art/book-art-029f45a5fbfd6c90212e.webp",focal:!1,caption:"Shown at its largest print size, 7.9 × 14.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/029f45a5fbfd6c90212e.webp",w:.4037617341390608,h:.7274986200703798,fw:.4342417341390608,fh:.7579786200703797},{id:"archived-painting-img-1608",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.6,z:6.403630535289401,ix:1,iz:0,iw:.721592339499789,ih:1.2874726478443603,s:1,smax:1,title:"My Dad, Paul Murphy",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-img-1608/",img:"art/archived-painting-img-1608.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/7401a29fec30c8f5333f5830871d8efb867cf0ad3418fd92e1740f65d66f03c1-960.webp",w:.721592339499789,h:1.2874726478443603,fw:.752072339499789,fh:1.3179526478443604},{id:"book-art-0f696788184bbba1d236",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.0720205280055182,z:7.585168451884444,ix:1,iz:0,iw:.2151867647164373,ih:.3465165293340376,s:1,smax:1,title:"Myself",price:null,status:"nfs",url:"https://tjm.art/products/book-art-0f696788184bbba1d236/",img:"art/book-art-0f696788184bbba1d236.webp",focal:!1,caption:"Shown at its largest print size, 4.2 × 6.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/0f696788184bbba1d236.webp",w:.2151867647164373,h:.3465165293340376,fw:.24566676471643734,fh:.3769965293340376},{id:"archived-painting-366",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.868498264667019,z:7.585168451884444,ix:1,iz:0,iw:.6173772365412088,ih:.8654789439889642,s:1,smax:1,title:"RFK",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-366/",img:"art/archived-painting-366.webp",focal:!1,caption:"Shown at its largest print size, 12.2 × 17 in",hi:"https://img.tjm.art/gallery-wall/c0436ee7e503922435d19062a877a660c2d4d1fd21d412725010fa4cbf21899e-960.webp",w:.6173772365412088,h:.8654789439889642,fw:.6478572365412087,fh:.8959589439889641},{id:"archived-painting-390",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.331594867171062,z:8.705812291092998,ix:1,iz:0,iw:.5998041847268121,ih:.8379990726496529,s:1,smax:1,title:"Ron Paul",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-390/",img:"art/archived-painting-390.webp",focal:!1,caption:"Shown at its largest print size, 11.8 × 16.5 in",hi:"https://img.tjm.art/gallery-wall/5030c993aeaef08722c6dd789360a6bfcf46cd82ce48612ef2444a140c3e6d30-960.webp",w:.5998041847268121,h:.8379990726496529,fw:.6302841847268121,fh:.868479072649653},{id:"book-art-4a0bb9cdd6c404c4e77c",kind:"painting",room:"people",wall:"W",x:-23.19,y:2.1142395363248263,z:8.705812291092998,ix:1,iz:0,iw:.2434701767574868,ih:.34633026565787595,s:1,smax:1,title:"Scarlette Melon @Scarlette_melon",price:null,status:"nfs",url:"https://tjm.art/products/book-art-4a0bb9cdd6c404c4e77c/",img:"art/book-art-4a0bb9cdd6c404c4e77c.webp",focal:!1,caption:"Shown at its largest print size, 4.8 × 6.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/4a0bb9cdd6c404c4e77c.webp",w:.2434701767574868,h:.34633026565787595,fw:.2739501767574868,fh:.37681026565787595},{id:"archived-painting-53",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.5999999999999999,z:10.120452921922725,ix:1,iz:0,iw:1.20537081978355,ih:2.312227203658772,s:1,smax:1,title:"Self Portrait, Meditation at Denny Blaine",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-53/",img:"art/archived-painting-53.webp",focal:!1,caption:"24 × 45 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9d83b86870ee61249fa5ad1a985a10ff503b1f8951db8db8d8c471dd76a07dcb-960.webp",w:1.20537081978355,h:2.312227203658772,fw:1.23585081978355,fh:2.342707203658772},{id:"archived-painting-387",kind:"painting",room:"people",wall:"W",x:-23.19,y:2.1053941475501516,z:11.54064881047334,ix:1,iz:0,iw:.5875478023306022,ih:.7959232977696606,s:1,smax:1,title:"Tulsi Gabbard #1",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-387/",img:"art/archived-painting-387.webp",focal:!1,caption:"Shown at its largest print size, 11.6 × 15.7 in",hi:"https://img.tjm.art/gallery-wall/c9bbb3f33ff4f860e9846a7479cb19550c230739149e5bbb3275ef7e4cb0f847-960.webp",w:.5875478023306022,h:.7959232977696606,fw:.6180278023306023,fh:.8264032977696607},{id:"archived-painting-389",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.10679835111517,z:11.54064881047334,ix:1,iz:0,iw:.6109147001685911,ih:.8203082951003027,s:1,smax:1,title:"Tulsi Gabbard #2",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-389/",img:"art/archived-painting-389.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.1 in",hi:"https://img.tjm.art/gallery-wall/8bf2e4be17af62dd9bccf1e9d2f9aff40bac6ea178e0d5b0ef8610702d55c3c9-960.webp",w:.6109147001685911,h:.8203082951003027,fw:.641394700168591,fh:.8507882951003026},{id:"archived-painting-img-1612",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.5999999999999999,z:13.002063054045031,ix:1,iz:0,iw:1.2878075298257043,ih:2.30849502829228,s:1,smax:1,title:"Bounty of Satoshi: Achievement",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-img-1612/",img:"art/archived-painting-img-1612.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/c987f826bbffc0e4dea91ece695bcfab8181cb008757b2e5c9b97c130088b6e1-960.webp",w:1.2878075298257043,h:2.30849502829228,fw:1.3182875298257044,fh:2.3389750282922797},{id:"archived-painting-img-1555",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.6,z:14.629762600406826,ix:1,iz:0,iw:.9434853057487933,ih:.7623713342469618,s:1,smax:1,title:"Dad Meditating in Yellowstone",price:"$400",status:"available",url:"https://tjm.art/products/archived-painting-img-1555/",img:"art/archived-painting-img-1555.webp",focal:!1,caption:"Shown at its largest print size, 18.6 × 15 in",hi:"https://img.tjm.art/gallery-wall/140afceb54fcf91b85e0778adfaff80793eb576d4d1a005b4ca5717e7cf6d0a1-960.webp",w:.9434853057487933,h:.7623713342469618,fw:.9739653057487933,fh:.7928513342469617},{id:"book-art-14d2876a55c720cbc908",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.3782244416801612,z:15.932090907593963,ix:1,iz:0,iw:.6370650514763909,ih:.4504049913938084,s:1,smax:1,title:"Jane and Sid in Zihuatanejo",price:null,status:"nfs",url:"https://tjm.art/products/book-art-14d2876a55c720cbc908/",img:"art/book-art-14d2876a55c720cbc908.webp",focal:!1,caption:"Shown at its largest print size, 12.5 × 8.9 in",hi:"https://img.tjm.art/wall-paintings/book-art-14d2876a55c720cbc908-987aa02cb7-960.webp",w:.6370650514763909,h:.4504049913938084,fw:.667545051476391,fh:.4808849913938084},{id:"book-art-616ff8378f27047b4a91",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.9204424956969044,z:15.932090907593963,ix:1,iz:0,iw:.23307849842514328,ih:.2530711166396778,s:1,smax:1,title:"Jasmine in Austin",price:null,status:"nfs",url:"https://tjm.art/products/book-art-616ff8378f27047b4a91/",img:"art/book-art-616ff8378f27047b4a91.webp",focal:!1,caption:"Shown at its largest print size, 4.6 × 5 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/616ff8378f27047b4a91.webp",w:.23307849842514328,h:.2530711166396778,fw:.2635584984251433,fh:.2835511166396778},{id:"book-art-a627c7b7d19ace6b3e51",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.2749616270722597,z:16.971584566152483,ix:1,iz:0,iw:.417816008491564,ih:.47371429534190923,s:1,smax:1,title:"John",price:null,status:"nfs",url:"https://tjm.art/products/book-art-a627c7b7d19ace6b3e51/",img:"art/book-art-a627c7b7d19ace6b3e51.webp",focal:!1,caption:"Shown at its largest print size, 8.2 × 9.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/a627c7b7d19ace6b3e51.webp",w:.417816008491564,h:.47371429534190923,fw:.4482960084915639,fh:.5041942953419092},{id:"book-art-28bec44600b36ed0766f",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.932097147670955,z:16.971584566152483,ix:1,iz:0,iw:.37319255763465076,ih:.4595967458554812,s:1,smax:1,title:"Julia's baby shower",price:null,status:"nfs",url:"https://tjm.art/products/book-art-28bec44600b36ed0766f/",img:"art/book-art-28bec44600b36ed0766f.webp",focal:!1,caption:"Shown at its largest print size, 7.3 × 9 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/28bec44600b36ed0766f.webp",w:.37319255763465076,h:.4595967458554812,fw:.4036725576346507,fh:.4900767458554812},{id:"book-art-1143b08e177333e43dc7",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.2240313438749681,z:17.94800877604659,ix:1,iz:0,iw:.3925184275545546,ih:.466173904459091,s:1,smax:1,title:"Kristine",price:null,status:"nfs",url:"https://tjm.art/products/book-art-1143b08e177333e43dc7/",img:"art/book-art-1143b08e177333e43dc7.webp",focal:!1,caption:"Shown at its largest print size, 7.7 × 9.2 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/1143b08e177333e43dc7.webp",w:.3925184275545546,h:.466173904459091,fw:.42299842755455463,fh:.49665390445909097},{id:"book-art-0ee2717bc04e65d0507e",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.9283269522295456,z:17.94800877604659,ix:1,iz:0,iw:.5109261541475586,ih:.5614573122500645,s:1,smax:1,title:"Kushboo Kullar @DrKhushboo_K",price:null,status:"nfs",url:"https://tjm.art/products/book-art-0ee2717bc04e65d0507e/",img:"art/book-art-0ee2717bc04e65d0507e.webp",focal:!1,caption:"Shown at its largest print size, 10.1 × 11.1 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/0ee2717bc04e65d0507e.webp",w:.5109261541475586,h:.5614573122500645,fw:.5414061541475585,fh:.5919373122500644},{id:"book-art-64cfd389b3dbb5cde532",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.3796368323835886,z:18.923435917347604,ix:1,iz:0,iw:.41582187130538134,ih:.4938502034505716,s:1,smax:1,title:"Loree",price:null,status:"nfs",url:"https://tjm.art/products/book-art-64cfd389b3dbb5cde532/",img:"art/book-art-64cfd389b3dbb5cde532.webp",focal:!1,caption:"Shown at its largest print size, 8.2 × 9.7 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/64cfd389b3dbb5cde532.webp",w:.41582187130538134,h:.4938502034505716,fw:.44630187130538135,fh:.5243302034505716},{id:"book-art-c04c7e48687fe35e65f5",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.9421651017252861,z:18.923435917347604,ix:1,iz:0,iw:.2294758894084991,ih:.25024633523282347,s:1,smax:1,title:"Maya Parbhoe @MayaPar25",price:null,status:"nfs",url:"https://tjm.art/products/book-art-c04c7e48687fe35e65f5/",img:"art/book-art-c04c7e48687fe35e65f5.webp",focal:!1,caption:"Shown at its largest print size, 4.5 × 4.9 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/c04c7e48687fe35e65f5.webp",w:.2294758894084991,h:.25024633523282347,fw:.2599558894084991,fh:.2807263352328235},{id:"book-art-c347459aa3f77f7213ae",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.3315742799255952,z:10.224616370959968,ix:-1,iz:0,iw:.5473475980809642,ih:.3010411789445303,s:1,smax:1,title:"Mike and Julie in Leon",price:null,status:"nfs",url:"https://tjm.art/products/book-art-c347459aa3f77f7213ae/",img:"art/book-art-c347459aa3f77f7213ae.webp",focal:!1,caption:"Shown at its largest print size, 10.8 × 5.9 in",hi:"https://img.tjm.art/wall-paintings/book-art-c347459aa3f77f7213ae-8823455597-960.webp",w:.5473475980809642,h:.3010411789445303,fw:.5778275980809642,fh:.33152117894453026},{id:"book-art-504e3fafdacd7c9bbcd0",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.8457605894722653,z:10.224616370959968,ix:-1,iz:0,iw:.24107452234357196,ih:.3463714401488104,s:1,smax:1,title:"Osisipho Filane @FilaneSisipho",price:null,status:"nfs",url:"https://tjm.art/products/book-art-504e3fafdacd7c9bbcd0/",img:"art/book-art-504e3fafdacd7c9bbcd0.webp",focal:!1,caption:"Shown at its largest print size, 4.7 × 6.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/504e3fafdacd7c9bbcd0.webp",w:.24107452234357196,h:.3463714401488104,fw:.27155452234357197,fh:.3768514401488104},{id:"book-art-4c6fb3817fed4e5a6195",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.2610084767111474,z:9.067851285959742,ix:-1,iz:0,iw:.40891235874509685,ih:.35698048918446956,s:1,smax:1,title:"Painting in Black Rock City",price:null,status:"nfs",url:"https://tjm.art/products/book-art-4c6fb3817fed4e5a6195/",img:"art/book-art-4c6fb3817fed4e5a6195.webp",focal:!1,caption:"Shown at its largest print size, 8.1 × 7 in",hi:"https://img.tjm.art/wall-paintings/book-art-4c6fb3817fed4e5a6195-5a0c40f61a-960.webp",w:.40891235874509685,h:.35698048918446956,fw:.43939235874509686,fh:.3874604891844695},{id:"book-art-44161b6b117af79e3df4",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.8737302445922348,z:9.067851285959742,ix:-1,iz:0,iw:.4387527419199345,ih:.48750304657770505,s:1,smax:1,title:"Sergey",price:null,status:"nfs",url:"https://tjm.art/products/book-art-44161b6b117af79e3df4/",img:"art/book-art-44161b6b117af79e3df4.webp",focal:!1,caption:"Shown at its largest print size, 8.6 × 9.6 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/44161b6b117af79e3df4.webp",w:.4387527419199345,h:.48750304657770505,fw:.46923274191993447,fh:.517983046577705},{id:"book-art-466dc684227286c40502",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.2074144352409735,z:2.375,ix:-1,iz:0,iw:.2594978184361248,ih:.38444121249796265,s:1,smax:1,title:"Sister Claire",price:null,status:"nfs",url:"https://tjm.art/products/book-art-466dc684227286c40502/",img:"art/book-art-466dc684227286c40502.webp",focal:!1,caption:"Shown at its largest print size, 5.1 × 7.6 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/466dc684227286c40502.webp",w:.2594978184361248,h:.38444121249796265,fw:.2899778184361248,fh:.41492121249796265},{id:"book-art-db933efcbc4fbe01c841",kind:"painting",room:"people",wall:"N",x:-16.895758923221834,y:1.6,z:23.465,ix:0,iz:-1,iw:.47123371281582166,ih:.7227510932758001,s:1,smax:1,title:"Steve",price:null,status:"nfs",url:"https://tjm.art/products/book-art-db933efcbc4fbe01c841/",img:"art/book-art-db933efcbc4fbe01c841.webp",focal:!1,caption:"Shown at its largest print size, 9.3 × 14.2 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/db933efcbc4fbe01c841.webp",w:.47123371281582166,h:.7227510932758001,fw:.5017137128158217,fh:.7532310932758001},{id:"book-art-ec22daff29e72f16eb76",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.3359589008740007,z:16.717050333265114,ix:-1,iz:0,iw:.23252937765552117,ih:.2666621303389004,s:1,smax:1,title:"Tomer Strolight @TomerStrolight",price:null,status:"nfs",url:"https://tjm.art/products/book-art-ec22daff29e72f16eb76/",img:"art/book-art-ec22daff29e72f16eb76.webp",focal:!1,caption:"Shown at its largest print size, 4.6 × 5.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/ec22daff29e72f16eb76.webp",w:.23252937765552117,h:.2666621303389004,fw:.2630093776555212,fh:.2971421303389004},{id:"book-art-deb92de6e72f7b3ce951",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.8285710651694504,z:16.717050333265114,ix:-1,iz:0,iw:.30721800040931907,ih:.33760219825199894,s:1,smax:1,title:"Untitled — Bitcoiners, page 64",price:null,status:"nfs",url:"https://tjm.art/products/book-art-deb92de6e72f7b3ce951/",img:"art/book-art-deb92de6e72f7b3ce951.webp",focal:!1,caption:"Shown at its largest print size, 6 × 6.6 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/deb92de6e72f7b3ce951.webp",w:.30721800040931907,h:.33760219825199894,fw:.3376980004093191,fh:.36808219825199895},{id:"archived-painting-90",kind:"painting",room:"archive",wall:"N",x:19.697276464474832,y:1.6,z:23.465,ix:0,iz:-1,iw:.7106775114918131,ih:1.2452880746743524,s:1,smax:1,title:"Sienna Dawn at Bass Coast",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-90/",img:"art/archived-painting-90.webp",focal:!1,caption:"14.75 × 23.25 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f974178c8dcf4970e390b3e3de23cf2ab8bbd96ac649906636195c7395c7d162-960.webp",w:.7106775114918131,h:1.2452880746743524,fw:.7411575114918132,fh:1.2757680746743525},{id:"archived-painting-433",kind:"painting",room:"archive",wall:"N",x:24.121326582499474,y:.9063145731085795,z:23.465,ix:0,iz:-1,iw:1.2791907176427673,ih:.6918422857467518,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #1",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-433/",img:"art/archived-painting-433.webp",focal:!1,caption:"23.25 × 14.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/d444d5892a8f556cf83218ca41a096112f34f9fc96a30cf646c7d7e042018a3d-960.webp",w:1.2791907176427673,h:.6918422857467518,fw:1.309670717642767,fh:.7223222857467517},{id:"archived-painting-436",kind:"painting",room:"archive",wall:"N",x:22.646632718418168,y:1.6,z:23.465,ix:0,iz:-1,iw:.6966511960959892,ih:1.2606366786155525,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #2",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-436/",img:"art/archived-painting-436.webp",focal:!1,caption:"13.75 × 24.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/37fb5f76e383a5973699d952b83ee162c815fb2c144a105a289451e22af48a62-960.webp",w:.6966511960959892,h:1.2606366786155525,fw:.7271311960959892,fh:1.2911166786155526},{id:"archived-painting-437",kind:"painting",room:"archive",wall:"N",x:21.175461170295456,y:2.046829350407928,z:23.465,ix:0,iz:-1,iw:1.2721460857255809,ih:.6956734292785506,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #3",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-437/",img:"art/archived-painting-437.webp",focal:!1,caption:"23.25 × 14.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/062ab28f5f678c9bfb0553c710f42785865ec766620e1e51ed79eed96676e661-960.webp",w:1.2721460857255809,h:.6956734292785506,fw:1.302626085725581,fh:.7261534292785506},{id:"archived-painting-438",kind:"painting",room:"archive",wall:"N",x:21.175461170295456,y:1.1569232853607248,z:23.465,ix:0,iz:-1,iw:1.2585680268375454,ih:.7031787008158553,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #4",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-438/",img:"art/archived-painting-438.webp",focal:!1,caption:"23.25 × 14.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/7b31e9134c311dd8c49a16428df99db5934e05e0bc9753c051ac30586898ad47-960.webp",w:1.2585680268375454,h:.7031787008158553,fw:1.2890480268375455,fh:.7336587008158554},{id:"archived-painting-246",kind:"painting",room:"archive",wall:"N",x:26.80393249915283,y:1.6,z:23.465,ix:0,iz:-1,iw:.7124186026441878,ih:1.2592245298906768,s:1,smax:1,title:"Sunset from Atami, El Salvador #1",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-246/",img:"art/archived-painting-246.webp",focal:!1,caption:"13.5 × 25.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/1aa7d0a3b86d956b6fb23786e2288aa0b1f7e46b71e4babeeb461594eab790c4-960.webp",w:.7124186026441878,h:1.2592245298906768,fw:.7428986026441877,fh:1.2897045298906766},{id:"archived-painting-248",kind:"painting",room:"archive",wall:"N",x:25.604322569575796,y:1.6000000000000003,z:23.465,ix:0,iz:-1,iw:.7132554420860209,ih:1.203023137812266,s:1,smax:1,title:"Sunset from Atami, El Salvador #2",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-248/",img:"art/archived-painting-248.webp",focal:!1,caption:"14 × 23.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/e8a641e0f5ae6b44f06e638fbea763860320d36f238101d0ccf79ae498af36bd-960.webp",w:.7132554420860209,h:1.203023137812266,fw:.7437354420860208,fh:1.2335031378122658},{id:"archived-painting-247",kind:"painting",room:"archive",wall:"N",x:24.121326582499474,y:2.041161142873376,z:23.465,ix:0,iz:-1,iw:.7762031074627627,ih:1.1968908537828409,s:1,smax:1,title:"Sunset from Atami, El Salvador #3",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-247/",img:"art/archived-painting-247.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9064d4cf43de15de8bb99b0913e242f8473d59e03f39eb6224c0dc7ab1018920-960.webp",w:.7762031074627627,h:1.1968908537828409,fw:.8066831074627626,fh:1.227370853782841},{id:"archived-painting-249",kind:"painting",room:"archive",wall:"N",x:27.97519090023746,y:1.5999999999999999,z:23.465,ix:0,iz:-1,iw:.6565523851012276,ih:1.2263449166754,s:1,smax:1,title:"Lake in North Cascades",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-249/",img:"art/archived-painting-249.webp",focal:!1,caption:"13 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/0d8b905417ca735c995aee98ca4f07a719dfc8b8f4d89a6babf609ae159efa7d-960.webp",w:.6565523851012276,h:1.2263449166754,fw:.6870323851012275,fh:1.2568249166754},{id:"archived-painting-18",kind:"painting",room:"archive",wall:"E",x:29.69,y:.9968207655666069,z:20.983091996829863,ix:-1,iz:0,iw:2.3695105505379286,ih:1.163161531133213,s:1,smax:1,title:"Mayan Warrior",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-18/",img:"art/archived-painting-18.webp",focal:!1,caption:"44.5 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/2f86850a9431808e9abbf7882abf72c33f5aa61632855b1088b085b64a0b40da-960.webp",w:2.3695105505379286,h:1.163161531133213,fw:2.399990550537929,fh:1.1936415311332131},{id:"archived-painting-19",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.354502267721416,z:20.983091996829863,ix:-1,iz:0,iw:2.379604260803209,ih:1.1712414731764047,s:1,smax:1,title:"The Temple, Daytime",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-19/",img:"art/archived-painting-19.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/73ae0f9353d8e6952c0f74268dfd91fe5d3be1e7912e838e621676425f6f65f6-960.webp",w:2.379604260803209,h:1.1712414731764047,fw:2.4100842608032087,fh:1.2017214731764048},{id:"archived-painting-20",kind:"painting",room:"archive",wall:"S",x:21.214935920412746,y:2.821767045722805,z:.035,ix:0,iz:1,iw:2.3740010075902145,ih:1.1740059044158124,s:1,smax:1,title:"The Temple, the Lighting #2",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-20/",img:"art/archived-painting-20.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/05a725ac7c5f8c65d1b11f67ad3533fced0e63f4354f29aba8bd181549c07f98-960.webp",w:2.3740010075902145,h:1.1740059044158124,fw:2.4044810075902143,fh:1.2044859044158125},{id:"archived-painting-307",kind:"painting",room:"archive",wall:"S",x:18.993744009303416,y:.8482156527931437,z:.035,ix:0,iz:1,iw:1.1565764798809823,ih:.865951305586288,s:1,smax:1,title:"Cross on Maui",price:"$250",status:"available",url:"https://tjm.art/products/archived-painting-307/",img:"art/archived-painting-307.webp",focal:!1,caption:"Shown at its largest print size, 22.8 × 17 in",hi:"https://img.tjm.art/gallery-wall/74b889871f4a2aacebfea38f8b5ae1be8ce5f1f03c9c820e0172d25114e138b9-960.webp",w:1.1565764798809823,h:.865951305586288,fw:1.1870564798809822,fh:.8964313055862879},{id:"archived-painting-385",kind:"painting",room:"archive",wall:"S",x:18.993744009303416,y:2.8986428563801723,z:.035,ix:0,iz:1,iw:.5952127819744111,ih:.8124536040480733,s:1,smax:1,title:"Holding the Line",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-385/",img:"art/archived-painting-385.webp",focal:!1,caption:"Shown at its largest print size, 11.7 × 16 in",hi:"https://img.tjm.art/gallery-wall/6e037122c56177197ba12817fa36682ab1a74b1ded40830c99a02432f3b3ea99-960.webp",w:.5952127819744111,h:.8124536040480733,fw:.625692781974411,fh:.8429336040480733},{id:"archived-painting-386",kind:"painting",room:"archive",wall:"S",x:18.993744009303416,y:1.8868036799712116,z:.035,ix:0,iz:1,iw:.6089059449804142,ih:.8302647487698478,s:1,smax:1,title:"Holding the Line #2",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-386/",img:"art/archived-painting-386.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.3 in",hi:"https://img.tjm.art/gallery-wall/30d546d939ec9a4e26f594f42706d2f067312dc19bc5d93ab512d8d860d9b914-960.webp",w:.6089059449804142,h:.8302647487698478,fw:.6393859449804142,fh:.8607447487698479},{id:"archived-painting-241",kind:"painting",room:"archive",wall:"S",x:17.287607884681464,y:.9269938260852477,z:.035,ix:0,iz:1,iw:1.3438894346154557,ih:1.0235076521704956,s:1,smax:1,title:"On a Trip with Elsa",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-241/",img:"art/archived-painting-241.webp",focal:!1,caption:"26 × 20.5 in (W × H)",hi:"https://img.tjm.art/gallery-wall/82dce5605cb36a0d8c1fc15de07dfd2d539291a947ee3c425ae29485633359ac-960.webp",w:1.3438894346154557,h:1.0235076521704956,fw:1.3743694346154558,fh:1.0539876521704956},{id:"archived-painting-1",kind:"painting",room:"archive",wall:"S",x:17.287607884681464,y:1.7148374129568276,z:.035,ix:0,iz:1,iw:.7089029598710107,ih:.17121952157266415,s:1,smax:1,title:"Painting #1",price:"$400",status:"available",url:"https://tjm.art/products/archived-painting-1/",img:"art/archived-painting-1.webp",focal:!1,caption:"Shown at its largest print size, 14 × 3.4 in",hi:"https://img.tjm.art/gallery-wall/e9876274627a9afe2ddb371681be76c5343f6d079f465440a2179049cbfa7669-960.webp",w:.7089029598710107,h:.17121952157266415,fw:.7393829598710107,fh:.2016995215726641},{id:"archived-painting-193",kind:"painting",room:"archive",wall:"S",x:17.287607884681464,y:2.4838446469064586,z:.035,ix:0,iz:1,iw:.9018908890943241,ih:.9858349463265975,s:1,smax:1,title:"Painting #193",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-193/",img:"art/archived-painting-193.webp",focal:!1,caption:"Shown at its largest print size, 17.8 × 19.4 in",hi:"https://img.tjm.art/gallery-wall/b359eb147108c36e50c722a17f3d45a1ebd0f0cbaf58e8dfaaecc5bd1c6bd33d-960.webp",w:.9018908890943241,h:.9858349463265975,fw:.9323708890943241,fh:1.0163149463265975},{id:"archived-painting-2",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.6,z:2.375,ix:1,iz:0,iw:.7095888560885427,ih:.18099510550194517,s:1,smax:1,title:"Painting #2",price:"$400",status:"available",url:"https://tjm.art/products/archived-painting-2/",img:"art/archived-painting-2.webp",focal:!1,caption:"Shown at its largest print size, 14 × 3.6 in",hi:"https://img.tjm.art/gallery-wall/e661e119f7f15ccbe7c71c081b858bca38b1a7a837ff5acf7e60c77f7938ac31-960.webp",w:.7095888560885427,h:.18099510550194517,fw:.7400688560885427,fh:.21147510550194518},{id:"archived-painting-217",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.5999999999999999,z:8.807450047628244,ix:1,iz:0,iw:.38846073804587256,ih:1.2345810128574615,s:1,smax:1,title:"Painting #217",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-217/",img:"art/archived-painting-217.webp",focal:!1,caption:"Shown at its largest print size, 7.6 × 24.3 in",hi:"https://img.tjm.art/gallery-wall/0adb3354b13717fde1f05575dace2085698d3eb35dca17f0fa5a6d2273d7beee-960.webp",w:.38846073804587256,h:1.2345810128574615,fw:.41894073804587256,fh:1.2650610128574615},{id:"archived-painting-226",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.5999999999999999,z:10.042202992003027,ix:1,iz:0,iw:1.224125793493081,ih:.8603749181865777,s:1,smax:1,title:"Painting #226",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-226/",img:"art/archived-painting-226.webp",focal:!1,caption:"Shown at its largest print size, 24.1 × 16.9 in",hi:"https://img.tjm.art/gallery-wall/58877194b4cb1a4caa6f655c50e29aa546c154fb9fb58223b09220a613d1727e-960.webp",w:1.224125793493081,h:.8603749181865777,fw:1.254605793493081,fh:.8908549181865778},{id:"archived-painting-233",kind:"painting",room:"archive",wall:"W",x:15.26,y:.8213772803312434,z:11.534752944374784,ix:1,iz:0,iw:.5774407572466296,ih:.8122745606624873,s:1,smax:1,title:"Painting #233",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-233/",img:"art/archived-painting-233.webp",focal:!1,caption:"Shown at its largest print size, 11.4 × 16 in",hi:"https://img.tjm.art/gallery-wall/a5cfc0849615388546a9ec9772b91a5d485057f77ec3de9c2503385fc3893b36-960.webp",w:.5774407572466296,h:.8122745606624873,fw:.6079207572466296,fh:.8427545606624873},{id:"archived-painting-354",kind:"painting",room:"archive",wall:"W",x:15.26,y:2.034972575729916,z:11.534752944374784,ix:1,iz:0,iw:.9040547540398185,ih:1.233956030134858,s:1,smax:1,title:"Painting #354",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-354/",img:"art/archived-painting-354.webp",focal:!1,caption:"Shown at its largest print size, 17.8 × 24.3 in",hi:"https://img.tjm.art/gallery-wall/020829831bba99f303622a9351e674b4bf0a3794f5995ecf744bdae4179eda33-960.webp",w:.9040547540398185,h:1.233956030134858,fw:.9345347540398186,fh:1.264436030134858},{id:"archived-painting-368",kind:"painting",room:"archive",wall:"W",x:15.26,y:3.255351520559865,z:11.534752944374784,ix:1,iz:0,iw:.621623231283548,ih:.8258418595250402,s:1,smax:1,title:"Painting #368",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-368/",img:"art/archived-painting-368.webp",focal:!1,caption:"Shown at its largest print size, 12.2 × 16.3 in",hi:"https://img.tjm.art/gallery-wall/4bf6fd5e67133125a7715aa9aa4e67dd313fee4888717a8ff7855fdabc219d13-960.webp",w:.621623231283548,h:.8258418595250402,fw:.652103231283548,fh:.8563218595250401},{id:"archived-painting-369",kind:"painting",room:"archive",wall:"W",x:15.26,y:.7260447599764936,z:16.2,ix:1,iz:0,iw:.8583728519470607,ih:.6216095199529879,s:1,smax:1,title:"Painting #369",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-369/",img:"art/archived-painting-369.webp",focal:!1,caption:"Shown at its largest print size, 16.9 × 12.2 in",hi:"https://img.tjm.art/gallery-wall/3b82c491eb2e0d50fc70d1fbb0cfe5581ab1971fcbed338850ca6ed6b7700f55-960.webp",w:.8583728519470607,h:.6216095199529879,fw:.8888528519470607,fh:.6520895199529879},{id:"archived-painting-371",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.5262063391147516,z:16.2,ix:1,iz:0,iw:.8146571662971377,ih:.597753638323528,s:1,smax:1,title:"Painting #371",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-371/",img:"art/archived-painting-371.webp",focal:!1,caption:"Shown at its largest print size, 16 × 11.8 in",hi:"https://img.tjm.art/gallery-wall/c22a2fde103c8c65575e5b871116318b6e87c6d8ac914177b3373cb84a673711-960.webp",w:.8146571662971377,h:.597753638323528,fw:.8451371662971376,fh:.628233638323528},{id:"archived-painting-373",kind:"painting",room:"archive",wall:"W",x:15.26,y:2.4334721220321596,z:16.2,ix:1,iz:0,iw:.6058834004894579,ih:.8358179275112879,s:1,smax:1,title:"Painting #373",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-373/",img:"art/archived-painting-373.webp",focal:!1,caption:"Shown at its largest print size, 11.9 × 16.5 in",hi:"https://img.tjm.art/gallery-wall/aeb9c6621442e41a7670b8de9d31b17b2bae4cb8f40e8c9e2dd849f2bbeaca0c-960.webp",w:.6058834004894579,h:.8358179275112879,fw:.6363634004894578,fh:.8662979275112879},{id:"archived-painting-375",kind:"painting",room:"archive",wall:"N",x:17.13746295465497,y:.8449104727460699,z:23.465,ix:0,iz:-1,iw:.6475530174364529,ih:.8593409454921399,s:1,smax:1,title:"Painting #375",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-375/",img:"art/archived-painting-375.webp",focal:!1,caption:"Shown at its largest print size, 12.7 × 16.9 in",hi:"https://img.tjm.art/gallery-wall/73624bb4c2211042e2e50e91fbbc6de8795cf5765c54181f41f643ca4cabe292-960.webp",w:.6475530174364529,h:.8593409454921399,fw:.6780330174364528,fh:.88982094549214},{id:"archived-painting-4",kind:"painting",room:"archive",wall:"N",x:17.13746295465497,y:1.5457292558041942,z:23.465,ix:0,iz:-1,iw:.6990124937638453,ih:.1613366206241086,s:1,smax:1,title:"Painting #4",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-4/",img:"art/archived-painting-4.webp",focal:!1,caption:"Shown at its largest print size, 13.8 × 3.2 in",hi:"https://img.tjm.art/gallery-wall/992f895182682e7172da1054d9e7d1172877e138d3f8b537f49c430b4bece967-960.webp",w:.6990124937638453,h:.1613366206241086,fw:.7294924937638453,fh:.19181662062410856},{id:"archived-painting-62",kind:"painting",room:"archive",wall:"N",x:17.13746295465497,y:2.360775004031732,z:23.465,ix:0,iz:-1,iw:.9818600948860937,ih:1.0877948758309672,s:1,smax:1,title:"Painting #62",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-62/",img:"art/archived-painting-62.webp",focal:!1,caption:"19.25 × 21.5 in (W × H)",hi:"https://img.tjm.art/gallery-wall/46554d5969de58ccb45aa2f91a55920cbe49d85f342c8cda7fe49ffadc646818-960.webp",w:.9818600948860937,h:1.0877948758309672,fw:1.0123400948860937,fh:1.1182748758309673},{id:"archived-painting-73",kind:"painting",room:"archive",wall:"N",x:18.48516535541347,y:1.0082377399010534,z:23.465,ix:0,iz:-1,iw:.7399988922070515,ih:1.1859954798021064,s:1,smax:1,title:"Painting #73",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-73/",img:"art/archived-painting-73.webp",focal:!1,caption:"Shown at its largest print size, 14.6 × 23.3 in",hi:"https://img.tjm.art/gallery-wall/ce548dec7454c6a31c49a759c41152114abd14e1731fc91f48c9c1e206c2d32c-960.webp",w:.7399988922070515,h:1.1859954798021064,fw:.7704788922070516,fh:1.2164754798021065},{id:"archived-painting-75",kind:"painting",room:"archive",wall:"N",x:18.48516535541347,y:2.2968604634460568,z:23.465,ix:0,iz:-1,iw:.689157248128191,ih:1.0102899672879007,s:1,smax:1,title:"Painting #75",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-75/",img:"art/archived-painting-75.webp",focal:!1,caption:"Shown at its largest print size, 13.6 × 19.9 in",hi:"https://img.tjm.art/gallery-wall/09b012e1ac23215f0b5d3d63350ef9a0882e5c3d1680802239e0ad603bc2f2af-960.webp",w:.689157248128191,h:1.0102899672879007,fw:.719637248128191,fh:1.0407699672879005},{id:"archived-painting-76",kind:"painting",room:"archive",wall:"E",x:29.69,y:.9054560381361643,z:18.197393769632562,ix:-1,iz:0,iw:.7161181475292536,ih:.9804320762723286,s:1,smax:1,title:"Painting #76",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-76/",img:"art/archived-painting-76.webp",focal:!1,caption:"Shown at its largest print size, 14.1 × 19.3 in",hi:"https://img.tjm.art/gallery-wall/64b732c7f9f637d54873d5dc1656279ee18adcf4d17ba5389298e61d6890895e-960.webp",w:.7161181475292536,h:.9804320762723286,fw:.7465981475292536,fh:1.0109120762723287},{id:"archived-painting-15",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.158650727549592,z:18.197393769632562,ix:-1,iz:0,iw:2.407100448054329,ih:1.1449973025545268,s:1,smax:1,title:"Symbiosis #1",price:"$1,000",status:"available",url:"https://tjm.art/products/archived-painting-15/",img:"art/archived-painting-15.webp",focal:!1,caption:"44.5 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/7112103318fcb79bfaae9e8fb67b3a2badc1b9bc3313084870aaa9df993f6c13-960.webp",w:2.407100448054329,h:1.1449973025545268,fw:2.4375804480543293,fh:1.1754773025545269},{id:"older-work-beach-sunsets-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.6294780102678095,z:16.425092376442347,ix:-1,iz:0,iw:.35281059278903687,ih:.25600818639254486,s:1,smax:1,title:"TJ Beach Sunset 309",price:"$75",status:"available",url:"https://tjm.art/products/older-work-beach-sunsets-original-3/",img:"art/older-work-beach-sunsets-original-3.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-beach-sunsets-original-3-9148b73270-960.webp",w:.35281059278903687,h:.25600818639254486,fw:.3832905927890369,fh:.28648818639254486},{id:"older-work-beach-sunsets-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.181509958605633,z:16.425092376442347,ix:-1,iz:0,iw:.3487783393020988,ih:.2589679169318083,s:1,smax:1,title:"TJ Beach Sunset 310",price:"$75",status:"available",url:"https://tjm.art/products/older-work-beach-sunsets-original-1/",img:"art/older-work-beach-sunsets-original-1.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-beach-sunsets-original-1-4fb0883ec1-960.webp",w:.3487783393020988,h:.2589679169318083,fw:.37925833930209873,fh:.28944791693180827},{id:"older-work-beach-sunsets-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:3.0497436778921823,z:18.197393769632562,ix:-1,iz:0,iw:.35250709974982447,ih:.25622859813065363,s:1,smax:1,title:"TJ Beach Sunset 311",price:"$75",status:"available",url:"https://tjm.art/products/older-work-beach-sunsets-original-2/",img:"art/older-work-beach-sunsets-original-2.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-beach-sunsets-original-2-c33a395a68-960.webp",w:.35250709974982447,h:.25622859813065363,fw:.3829870997498245,fh:.28670859813065364},{id:"older-work-shore-figures-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.5929553569944341,z:15.531730566583509,ix:-1,iz:0,iw:.21775707875749511,ih:.2014670671113142,s:1,smax:1,title:"TJ Crab on Beach 180",price:"$75",status:"available",url:"https://tjm.art/products/older-work-shore-figures-original-3/",img:"art/older-work-shore-figures-original-3.webp",focal:!1,caption:"4.25 × 4 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-shore-figures-original-3-dcfe558566-960.webp",w:.21775707875749511,h:.2014670671113142,fw:.24823707875749512,fh:.23194706711131421},{id:"older-work-shore-figures-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.2014620733642978,z:15.531730566583509,ix:-1,iz:0,iw:.21874246778345827,ih:.20055950014895826,s:1,smax:1,title:"TJ Figures on a Shore 179",price:"$75",status:"available",url:"https://tjm.art/products/older-work-shore-figures-original-1/",img:"art/older-work-shore-figures-original-1.webp",focal:!1,caption:"4.25 × 4 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-shore-figures-original-1-ddd0d8fd53-960.webp",w:.21874246778345827,h:.20055950014895826,fw:.24922246778345825,fh:.23103950014895824},{id:"older-work-shore-figures-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.0479680516621768,z:16.425092376442347,ix:-1,iz:0,iw:.21934135314181155,ih:.20001189639618938,s:1,smax:1,title:"TJ Wading Figure 181",price:"$75",status:"available",url:"https://tjm.art/products/older-work-shore-figures-original-2/",img:"art/older-work-shore-figures-original-2.webp",focal:!1,caption:"4.25 × 4 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-shore-figures-original-2-7764c6d6dc-960.webp",w:.21934135314181155,h:.20001189639618938,fw:.24982135314181153,fh:.2304918963961894},{id:"older-work-sunset-ridge-strips-original-6",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.5857348707839591,z:13.419673837292358,ix:-1,iz:0,iw:.6752524272379904,ih:.2063740230746108,s:1,smax:1,title:"TJ Sunset Ridge Strip 158",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-6/",img:"art/older-work-sunset-ridge-strips-original-6.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-6-dff8599ae8-960.webp",w:.6752524272379904,h:.2063740230746108,fw:.7057324272379903,fh:.23685402307461076},{id:"older-work-sunset-ridge-strips-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.186482042017255,z:13.419673837292358,ix:-1,iz:0,iw:.6599113576837423,ih:.21117163445879752,s:1,smax:1,title:"TJ Sunset Ridge Strip 159",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-3/",img:"art/older-work-sunset-ridge-strips-original-3.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-3-21e11dff2c-960.webp",w:.6599113576837423,h:.21117163445879752,fw:.6903913576837424,fh:.24165163445879753},{id:"older-work-sunset-ridge-strips-original-4",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.005563334021736,z:14.482209988399537,ix:-1,iz:0,iw:.6599113576837423,ih:.21117163445879752,s:1,smax:1,title:"TJ Sunset Ridge Strip 164",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-4/",img:"art/older-work-sunset-ridge-strips-original-4.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-4-14a797f9ad-960.webp",w:.6599113576837423,h:.21117163445879752,fw:.6903913576837424,fh:.24165163445879753},{id:"older-work-sunset-ridge-strips-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.6047398364056469,z:14.482209988399537,ix:-1,iz:0,iw:.6651281294393048,ih:.209515360773381,s:1,smax:1,title:"TJ Sunset Ridge Strip 165",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-2/",img:"art/older-work-sunset-ridge-strips-original-2.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-2-0104aa0349-960.webp",w:.6651281294393048,h:.209515360773381,fw:.6956081294393047,fh:.23999536077338096},{id:"older-work-sunset-ridge-strips-original-5",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.1991765023839112,z:14.482209988399537,ix:-1,iz:0,iw:.6315600923651972,ih:.22065130727009075,s:1,smax:1,title:"TJ Sunset Ridge Strip 173",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-5/",img:"art/older-work-sunset-ridge-strips-original-5.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-5-e3b3002667-960.webp",w:.6315600923651972,h:.22065130727009075,fw:.6620400923651972,fh:.25113130727009075},{id:"older-work-sunset-ridge-strips-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.9914932836301362,z:15.531730566583509,ix:-1,iz:0,iw:.6492212813915762,ih:.2146487861600899,s:1,smax:1,title:"TJ Sunset Ridge Strip 174",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-1/",img:"art/older-work-sunset-ridge-strips-original-1.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-1-c76d05d284-960.webp",w:.6492212813915762,h:.2146487861600899,fw:.6797012813915762,fh:.24512878616008985},{id:"older-work-mountain-layers-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.0378632424721905,z:12.5057422165223,ix:-1,iz:0,iw:.34137610730881285,ih:.2645832501637066,s:1,smax:1,title:"TJ Blue Mountain Layers 185",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-1/",img:"art/older-work-mountain-layers-original-1.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-1-58258ae4c4-960.webp",w:.34137610730881285,h:.2645832501637066,fw:.37185610730881286,fh:.2950632501637066},{id:"older-work-mountain-layers-original-4",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.5904560219797297,z:12.5057422165223,ix:-1,iz:0,iw:.3623459241416391,ih:.24927119082121496,s:1,smax:1,title:"TJ Golden Mountain Layers 153",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-4/",img:"art/older-work-mountain-layers-original-4.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-4-ec72f50db4-960.webp",w:.3623459241416391,h:.24927119082121496,fw:.3928259241416391,fh:.2797511908212149},{id:"older-work-mountain-layers-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.1525927795075392,z:12.5057422165223,ix:-1,iz:0,iw:.36791906876506125,ih:.24549529412316587,s:1,smax:1,title:"TJ Orange Mountain Layers 186",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-2/",img:"art/older-work-mountain-layers-original-2.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-2-b2f21e4a46-960.webp",w:.36791906876506125,h:.24549529412316587,fw:.39839906876506126,fh:.2759752941231659},{id:"older-work-mountain-layers-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.9992528287667044,z:13.419673837292358,ix:-1,iz:0,iw:.3768113756244628,ih:.23970189289087962,s:1,smax:1,title:"TJ Red Mountain Layers 156",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-3/",img:"art/older-work-mountain-layers-original-3.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-3-ff36e67e60-960.webp",w:.3768113756244628,h:.23970189289087962,fw:.4072913756244628,fh:.27018189289087957},{id:"older-work-lake-hillside-color-wheel-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.0400583780287818,z:11.746873672640437,ix:-1,iz:0,iw:.3382642105926288,ih:.26701731123655637,s:1,smax:1,title:"TJ Color Wheel Study 184",price:"$75",status:"available",url:"https://tjm.art/products/older-work-lake-hillside-color-wheel-original-3/",img:"art/older-work-lake-hillside-color-wheel-original-3.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-lake-hillside-color-wheel-original-3-0794df63c5-960.webp",w:.3382642105926288,h:.26701731123655637,fw:.3687442105926288,fh:.29749731123655637},{id:"older-work-lake-hillside-color-wheel-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.5901778695168394,z:11.746873672640437,ix:-1,iz:0,iw:.3587301240068795,ih:.2517837057873285,s:1,smax:1,title:"TJ Golden Hillside 141",price:"$75",status:"available",url:"https://tjm.art/products/older-work-lake-hillside-color-wheel-original-2/",img:"art/older-work-lake-hillside-color-wheel-original-2.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-lake-hillside-color-wheel-original-2-7ae1a5eed1-960.webp",w:.3587301240068795,h:.2517837057873285,fw:.3892101240068795,fh:.2822637057873285},{id:"older-work-lake-hillside-color-wheel-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.150119491488058,z:11.746873672640437,ix:-1,iz:0,iw:.3651262734616008,ih:.24737305027023457,s:1,smax:1,title:"TJ Mountain Lake 145",price:"$75",status:"available",url:"https://tjm.art/products/older-work-lake-hillside-color-wheel-original-1/",img:"art/older-work-lake-hillside-color-wheel-original-1.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-lake-hillside-color-wheel-original-1-4c3ee3593e-960.webp",w:.3651262734616008,h:.24737305027023457,fw:.3956062734616008,fh:.27785305027023455},{id:"older-work-forest-triptych-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.6,z:10.346208496496436,ix:-1,iz:0,iw:.3559207615994737,ih:1.6857651048611577,s:1,smax:1,title:"TJ Forest 302",price:"$250",status:"available",url:"https://tjm.art/products/older-work-forest-triptych-original-2/",img:"art/older-work-forest-triptych-original-2.webp",focal:!1,caption:"7.75 × 30 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-forest-triptych-original-2-dfc6702110-960.webp",w:.3559207615994737,h:1.6857651048611577,fw:.3864007615994737,fh:1.7162451048611578},{id:"older-work-forest-triptych-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.6,z:9.716333515418286,ix:-1,iz:0,iw:.3428692005568248,ih:1.7499349577786298,s:1,smax:1,title:"TJ Forest 303",price:"$250",status:"available",url:"https://tjm.art/products/older-work-forest-triptych-original-1/",img:"art/older-work-forest-triptych-original-1.webp",focal:!1,caption:"7.75 × 30 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-forest-triptych-original-1-c2340a270a-960.webp",w:.3428692005568248,h:1.7499349577786298,fw:.3733492005568248,fh:1.78041495777863},{id:"older-work-forest-triptych-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.6,z:10.988306770218639,ix:-1,iz:0,iw:.3673157858449326,ih:1.6334685932972604,s:1,smax:1,title:"TJ Forest 304",price:"$250",status:"available",url:"https://tjm.art/products/older-work-forest-triptych-original-3/",img:"art/older-work-forest-triptych-original-3.webp",focal:!1,caption:"7.75 × 30 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-forest-triptych-original-3-59db81a04b-960.webp",w:.3673157858449326,h:1.6334685932972604,fw:.3977957858449326,fh:1.6639485932972604},{id:"older-work-ridge-strips-unindexed-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.9966298028029459,z:6.675374163838649,ix:-1,iz:0,iw:.6671165587766594,ih:.20889087246694146,s:1,smax:1,title:"TJ Ridge Strip Study A",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-1/",img:"art/older-work-ridge-strips-unindexed-original-1.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-1-2c69db1f5f-960.webp",w:.6671165587766594,h:.20889087246694146,fw:.6975965587766594,fh:.23937087246694141},{id:"older-work-ridge-strips-unindexed-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.5997913176012495,z:6.675374163838649,ix:-1,iz:0,iw:.6836934102690203,ih:.20382609793645168,s:1,smax:1,title:"TJ Ridge Strip Study B",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-2/",img:"art/older-work-ridge-strips-unindexed-original-2.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-2-decfb037a2-960.webp",w:.6836934102690203,h:.20382609793645168,fw:.7141734102690203,fh:.23430609793645163},{id:"older-work-ridge-strips-unindexed-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.2031615147983037,z:6.675374163838649,ix:-1,iz:0,iw:.6684521287998072,ih:.20847350766943987,s:1,smax:1,title:"TJ Ridge Strip Study C",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-3/",img:"art/older-work-ridge-strips-unindexed-original-3.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-3-ff1b439d1f-960.webp",w:.6684521287998072,h:.20847350766943987,fw:.6989321287998072,fh:.23895350766943982},{id:"older-work-ridge-strips-unindexed-original-4",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.0034916032400214,z:7.7499890794097235,ix:-1,iz:0,iw:.6808446753360652,ih:.2046789305229046,s:1,smax:1,title:"TJ Ridge Strip Study D",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-4/",img:"art/older-work-ridge-strips-unindexed-original-4.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-4-6893b24edb-960.webp",w:.6808446753360652,h:.2046789305229046,fw:.7113246753360651,fh:.23515893052290454},{id:"older-work-ridge-strips-unindexed-original-5",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.6050863207491703,z:7.7499890794097235,ix:-1,iz:0,iw:.6599113576837423,ih:.21117163445879752,s:1,smax:1,title:"TJ Ridge Strip Study E",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-5/",img:"art/older-work-ridge-strips-unindexed-original-5.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-5-e51b25f0ee-960.webp",w:.6599113576837423,h:.21117163445879752,fw:.6903913576837424,fh:.24165163445879753},{id:"older-work-ridge-strips-unindexed-original-6",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.2015947175091495,z:7.7499890794097235,ix:-1,iz:0,iw:.6486085193094173,ih:.21485157202124447,s:1,smax:1,title:"TJ Ridge Strip Study F",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-6/",img:"art/older-work-ridge-strips-unindexed-original-6.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-6-bc88075727-960.webp",w:.6486085193094173,h:.21485157202124447,fw:.6790885193094174,fh:.24533157202124448},{id:"older-work-ridge-strips-unindexed-original-7",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.6,z:8.817655166108814,ix:-1,iz:0,iw:.6697957525250542,ih:.20805530562809496,s:1,smax:1,title:"TJ Ridge Strip Study G",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-7/",img:"art/older-work-ridge-strips-unindexed-original-7.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-7-84ca4c65a8-960.webp",w:.6697957525250542,h:.20805530562809496,fw:.7002757525250543,fh:.23853530562809497},{id:"older-work-portraits-319-329-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:.7840345521125835,z:4.649459026270932,ix:-1,iz:0,iw:.4630658596119608,ih:.5391823102856769,s:1,smax:1,title:"TJ Andreas Antonopoulos 327",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-3/",img:"art/older-work-portraits-319-329-original-3.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-3-00609e5994-960.webp",w:.4630658596119608,h:.5391823102856769,fw:.49354585961196074,fh:.5696623102856768},{id:"older-work-portraits-319-329-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.356212452931671,z:5.713051949988652,ix:-1,iz:0,iw:.45625927189391013,ih:.5472259642277585,s:1,smax:1,title:"TJ Bernard Parah 329",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-1/",img:"art/older-work-portraits-319-329-original-1.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-1-b878be8767-960.webp",w:.45625927189391013,h:.5472259642277585,fw:.48673927189391014,fh:.5777059642277584},{id:"older-work-portraits-319-329-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.6073858185063368,z:5.713051949988652,ix:-1,iz:0,iw:.4384394292229488,ih:.5694673046229105,s:1,smax:1,title:"TJ José 328",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-2/",img:"art/older-work-portraits-319-329-original-2.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-2-b95ff95919-960.webp",w:.4384394292229488,h:.5694673046229105,fw:.4689194292229488,fh:.5999473046229105},{id:"older-work-portraits-319-329-original-4",kind:"painting",room:"archive",wall:"E",x:29.69,y:.8511733655746654,z:5.713051949988652,ix:-1,iz:0,iw:.44426687845093465,ih:.5619976012404323,s:1,smax:1,title:"TJ Portrait with Glasses 319",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-4/",img:"art/older-work-portraits-319-329-original-4.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-4-54ae5f717f-960.webp",w:.44426687845093465,h:.5619976012404323,fw:.47474687845093466,fh:.5924776012404323},{id:"older-work-provibes-sandwiches-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.3734357738380574,z:4.649459026270932,ix:-1,iz:0,iw:.8862348300044653,ih:.6242416583843953,s:1,smax:1,title:"TJ Devo and Sarah Sandwich (L)",price:"$250",status:"available",url:"https://tjm.art/products/older-work-provibes-sandwiches-original-1/",img:"art/older-work-provibes-sandwiches-original-1.webp",focal:!1,caption:"17.5 × 12.25 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-provibes-sandwiches-original-1-d6ae18ddad-960.webp",w:.8862348300044653,h:.6242416583843953,fw:.9167148300044653,fh:.6547216583843952},{id:"older-work-provibes-sandwiches-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.5574703259506408,z:4.649459026270932,ix:-1,iz:0,iw:.8827172357611801,ih:.626729237390438,s:1,smax:1,title:"TJ Devo and Sarah Sandwich (R)",price:"$250",status:"available",url:"https://tjm.art/products/older-work-provibes-sandwiches-original-2/",img:"art/older-work-provibes-sandwiches-original-2.webp",focal:!1,caption:"17.5 × 12.25 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-provibes-sandwiches-original-2-7ff72bcea8-960.webp",w:.8827172357611801,h:.626729237390438,fw:.9131972357611802,fh:.6572092373904379},{id:"older-work-bitcoin-voices-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:.8057283259481361,z:2.5761084452753735,ix:-1,iz:0,iw:.33161746268730286,ih:.6629273024964172,s:1,smax:1,title:"TJ Jack Mallers",price:"$200",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-1/",img:"art/older-work-bitcoin-voices-original-1.webp",focal:!1,caption:"7.25 × 11.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-1-b220032d08-960.webp",w:.33161746268730286,h:.6629273024964172,fw:.36209746268730286,fh:.6934073024964171},{id:"older-work-bitcoin-voices-original-4",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.7698059103452213,z:3.534422884212501,ix:-1,iz:0,iw:.5455432663055488,ih:.9082375507179096,s:1,smax:1,title:"TJ Michael Saylor",price:"$250",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-4/",img:"art/older-work-bitcoin-voices-original-4.webp",focal:!1,caption:"12 × 16 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-4-ee3c8b5799-960.webp",w:.5455432663055488,h:.9082375507179096,fw:.5760232663055489,fh:.9387175507179095},{id:"older-work-bitcoin-voices-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.8085349104374049,z:3.534422884212501,ix:-1,iz:0,iw:.34710696574855365,ih:.6333444490977232,s:1,smax:1,title:"TJ Natalie Brunell",price:"$200",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-2/",img:"art/older-work-bitcoin-voices-original-2.webp",focal:!1,caption:"7.25 × 11.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-2-4ed30b3321-960.webp",w:.34710696574855365,h:.6333444490977232,fw:.37758696574855366,fh:.6638244490977232},{id:"older-work-bitcoin-voices-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:.8583113429442717,z:3.534422884212501,ix:-1,iz:0,iw:.5591457085753347,ih:.8861426858885435,s:1,smax:1,title:"TJ Peter McCormack",price:"$250",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-3/",img:"art/older-work-bitcoin-voices-original-3.webp",focal:!1,caption:"12 × 16 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-3-744a8ac405-960.webp",w:.5591457085753347,h:.8861426858885435,fw:.5896257085753347,fh:.9166226858885436},{id:"older-work-rochard-martinez-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:.8105720395246373,z:1.6122363666972224,ix:-1,iz:0,iw:.553471753950277,ih:.6154685899844545,s:1,smax:1,title:"TJ Aixa Martinez 347",price:"$200",status:"available",url:"https://tjm.art/products/older-work-rochard-martinez-original-3/",img:"art/older-work-rochard-martinez-original-3.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-rochard-martinez-original-3-75ddb98c20-960.webp",w:.553471753950277,h:.6154685899844545,fw:.583951753950277,fh:.6459485899844546},{id:"older-work-rochard-martinez-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.4192983827164176,z:2.5761084452753735,ix:-1,iz:0,iw:.5558149698400129,ih:.6128738851673102,s:1,smax:1,title:"TJ Morgen Rochard 358",price:"$200",status:"available",url:"https://tjm.art/products/older-work-rochard-martinez-original-2/",img:"art/older-work-rochard-martinez-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-rochard-martinez-original-2-716858e3dc-960.webp",w:.5558149698400129,h:.6128738851673102,fw:.5862949698400128,fh:.6433538851673102},{id:"older-work-rochard-martinez-original-1",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.6250267086645538,z:2.5761084452753735,ix:-1,iz:0,iw:.5727914237618569,ih:.5947094629364178,s:1,smax:1,title:"TJ Pierre Rochard 359",price:"$200",status:"available",url:"https://tjm.art/products/older-work-rochard-martinez-original-1/",img:"art/older-work-rochard-martinez-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-rochard-martinez-original-1-65e7fed054-960.webp",w:.5727914237618569,h:.5947094629364178,fw:.6032714237618568,fh:.6251894629364179},{id:"older-work-fernandez-moran-pysh-original-1",kind:"painting",room:"archive",wall:"S",x:28.047662763842727,y:1.0345421378443538,z:.035,ix:0,iz:1,iw:.5733481375670705,ih:.5941320075538769,s:1,smax:1,title:"TJ Akin Fernandez 351",price:"$200",status:"available",url:"https://tjm.art/products/older-work-fernandez-moran-pysh-original-1/",img:"art/older-work-fernandez-moran-pysh-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-fernandez-moran-pysh-original-1-ec17e71718-960.webp",w:.5733481375670705,h:.5941320075538769,fw:.6038281375670704,fh:.6246120075538768},{id:"older-work-fernandez-moran-pysh-original-2",kind:"painting",room:"archive",wall:"E",x:29.69,y:2.398488063077287,z:1.6122363666972224,ix:-1,iz:0,iw:.5702609878573812,ih:.5973483847806069,s:1,smax:1,title:"TJ Nico Moran 345",price:"$200",status:"available",url:"https://tjm.art/products/older-work-fernandez-moran-pysh-original-2/",img:"art/older-work-fernandez-moran-pysh-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-fernandez-moran-pysh-original-2-8619d6a9ca-960.webp",w:.5702609878573812,h:.5973483847806069,fw:.6007409878573812,fh:.6278283847806069},{id:"older-work-fernandez-moran-pysh-original-3",kind:"painting",room:"archive",wall:"E",x:29.69,y:1.609060102601924,z:1.6122363666972224,ix:-1,iz:0,iw:.5672231746589079,ih:.6005475361701187,s:1,smax:1,title:"TJ Preston Pysh 344",price:"$200",status:"available",url:"https://tjm.art/products/older-work-fernandez-moran-pysh-original-3/",img:"art/older-work-fernandez-moran-pysh-original-3.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-fernandez-moran-pysh-original-3-7a6e7f5f45-960.webp",w:.5672231746589079,h:.6005475361701187,fw:.5977031746589079,fh:.6310275361701186},{id:"older-work-pitchers-original-2",kind:"painting",room:"archive",wall:"S",x:28.047662763842727,y:2.2387370365614174,z:.035,ix:0,iz:1,iw:.3113555886903199,ih:.4475736587423348,s:1,smax:1,title:"TJ Blue Pitcher 187",price:"$75",status:"available",url:"https://tjm.art/products/older-work-pitchers-original-2/",img:"art/older-work-pitchers-original-2.webp",focal:!1,caption:"6 × 9 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-pitchers-original-2-98f7bac8f4-960.webp",w:.3113555886903199,h:.4475736587423348,fw:.3418355886903199,fh:.4780536587423348},{id:"older-work-pitchers-original-1",kind:"painting",room:"archive",wall:"S",x:28.047662763842727,y:1.6732791744057711,z:.035,ix:0,iz:1,iw:.46085590340085913,ih:.3023820655689581,s:1,smax:1,title:"TJ Two Pitchers 188",price:"$75",status:"available",url:"https://tjm.art/products/older-work-pitchers-original-1/",img:"art/older-work-pitchers-original-1.webp",focal:!1,caption:"9 × 6 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-pitchers-original-1-7d2d7e4632-960.webp",w:.46085590340085913,h:.3023820655689581,fw:.4913359034008591,fh:.33286206556895803},{id:"older-work-yakes-todd-dickerson-original-3",kind:"painting",room:"archive",wall:"S",x:27.07509063091083,y:2.3638174740148026,z:.035,ix:0,iz:1,iw:.4599897935492608,ih:.5427879563881277,s:1,smax:1,title:"TJ Desiree Dickerson 332",price:"$200",status:"available",url:"https://tjm.art/products/older-work-yakes-todd-dickerson-original-3/",img:"art/older-work-yakes-todd-dickerson-original-3.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-yakes-todd-dickerson-original-3-ec786ce1dc-960.webp",w:.4599897935492608,h:.5427879563881277,fw:.4904697935492608,fh:.5732679563881277},{id:"older-work-yakes-todd-dickerson-original-1",kind:"painting",room:"archive",wall:"S",x:27.07509063091083,y:1.6277607827784135,z:.035,ix:0,iz:1,iw:.45531119965513245,ih:.5483654260846502,s:1,smax:1,title:"TJ Eric Yakes 330",price:"$200",status:"available",url:"https://tjm.art/products/older-work-yakes-todd-dickerson-original-1/",img:"art/older-work-yakes-todd-dickerson-original-1.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-yakes-todd-dickerson-original-1-16c80bb5c4-960.webp",w:.45531119965513245,h:.5483654260846502,fw:.4857911996551324,fh:.5788454260846502},{id:"older-work-yakes-todd-dickerson-original-2",kind:"painting",room:"archive",wall:"S",x:27.07509063091083,y:.8639433087636111,z:.035,ix:0,iz:1,iw:.4173039385841008,ih:.5983095219449545,s:1,smax:1,title:"TJ Peter Todd 331",price:"$200",status:"available",url:"https://tjm.art/products/older-work-yakes-todd-dickerson-original-2/",img:"art/older-work-yakes-todd-dickerson-original-2.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-yakes-todd-dickerson-original-2-39a72edaa0-960.webp",w:.4173039385841008,h:.5983095219449545,fw:.4477839385841008,fh:.6287895219449544},{id:"older-work-nakamoto-hayek-original-1",kind:"painting",room:"archive",wall:"S",x:26.107322725204035,y:1.633054765531588,z:.035,ix:0,iz:1,iw:.5637396831168617,ih:.6042584728408862,s:1,smax:1,title:"TJ Dorian Nakamoto",price:"$200",status:"available",url:"https://tjm.art/products/older-work-nakamoto-hayek-original-1/",img:"art/older-work-nakamoto-hayek-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-nakamoto-hayek-original-1-27b0ab6335-960.webp",w:.5637396831168617,h:.6042584728408862,fw:.5942196831168618,fh:.6347384728408862},{id:"older-work-nakamoto-hayek-original-2",kind:"painting",room:"archive",wall:"S",x:26.107322725204035,y:.8291193341001885,z:.035,ix:0,iz:1,iw:.5470861197336958,ih:.6226523900219125,s:1,smax:1,title:"TJ Hayek 339",price:"$200",status:"available",url:"https://tjm.art/products/older-work-nakamoto-hayek-original-2/",img:"art/older-work-nakamoto-hayek-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-nakamoto-hayek-original-2-ac8ceaa163-960.webp",w:.5470861197336958,h:.6226523900219125,fw:.5775661197336959,fh:.6531323900219126},{id:"older-work-hayek-stark-gomez-el-bawab-original-2",kind:"painting",room:"archive",wall:"S",x:25.141062603528034,y:2.357306587481971,z:.035,ix:0,iz:1,iw:.45697422548767747,ih:.5463698083487044,s:1,smax:1,title:"TJ Elizabeth Stark 335",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-2/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-2.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-2-3d6bba0f8e-960.webp",w:.45697422548767747,h:.5463698083487044,fw:.4874542254876775,fh:.5768498083487044},{id:"older-work-hayek-stark-gomez-el-bawab-original-1",kind:"painting",room:"archive",wall:"S",x:25.141062603528034,y:1.607368055361625,z:.035,ix:0,iz:1,iw:.4360808953856937,ih:.572547255891988,s:1,smax:1,title:"TJ F.A. Hayek 336",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-1/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-1.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-1-775ae9c6ec-960.webp",w:.4360808953856937,h:.572547255891988,fw:.4665608953856937,fh:.6030272558919879},{id:"older-work-hayek-stark-gomez-el-bawab-original-4",kind:"painting",room:"archive",wall:"S",x:25.141062603528034,y:.850061467879654,z:.035,ix:0,iz:1,iw:.4449728857128351,ih:.5611059190719542,s:1,smax:1,title:"TJ Noor El Bawab 333",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-4/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-4.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-4-b154114211-960.webp",w:.4449728857128351,h:.5611059190719542,fw:.4754528857128351,fh:.5915859190719541},{id:"older-work-hayek-stark-gomez-el-bawab-original-3",kind:"painting",room:"archive",wall:"S",x:26.107322725204035,y:2.4039354314313996,z:.035,ix:0,iz:1,iw:.4486211905892249,ih:.5565428589587378,s:1,smax:1,title:"TJ Rodrigo Gomez 334",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-3/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-3.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-3-1aeaa02b7d-960.webp",w:.4486211905892249,h:.5565428589587378,fw:.4791011905892249,fh:.5870228589587378},{id:"older-work-figen-pnut-swoll-original-1",kind:"painting",room:"archive",wall:"S",x:24.170168061627667,y:2.4048042851181397,z:.035,ix:0,iz:1,iw:.5730085235655904,ih:.5944841411438578,s:1,smax:1,title:"TJ Figen 341",price:"$200",status:"available",url:"https://tjm.art/products/older-work-figen-pnut-swoll-original-1/",img:"art/older-work-figen-pnut-swoll-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-figen-pnut-swoll-original-1-9280268eaa-960.webp",w:.5730085235655904,h:.5944841411438578,fw:.6034885235655905,fh:.6249641411438578},{id:"older-work-figen-pnut-swoll-original-3",kind:"painting",room:"archive",wall:"S",x:24.170168061627667,y:1.613848979673499,z:.035,ix:0,iz:1,iw:.5616872440499346,ih:.6064664697454234,s:1,smax:1,title:"TJ Joey Swoll 340",price:"$200",status:"available",url:"https://tjm.art/products/older-work-figen-pnut-swoll-original-3/",img:"art/older-work-figen-pnut-swoll-original-3.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-figen-pnut-swoll-original-3-ff335b6a18-960.webp",w:.5616872440499346,h:.6064664697454234,fw:.5921672440499346,fh:.6369464697454235},{id:"older-work-figen-pnut-swoll-original-2",kind:"painting",room:"archive",wall:"S",x:24.170168061627667,y:.8090446945553591,z:.035,ix:0,iz:1,iw:.5474996463756455,ih:.6221821004908559,s:1,smax:1,title:"TJ PNut Window 338",price:"$200",status:"available",url:"https://tjm.art/products/older-work-figen-pnut-swoll-original-2/",img:"art/older-work-figen-pnut-swoll-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-figen-pnut-swoll-original-2-50020e7d03-960.webp",w:.5474996463756455,h:.6221821004908559,fw:.5779796463756455,fh:.6526621004908559},{id:"older-work-hummingbird-feeder-190",kind:"painting",room:"archive",wall:"S",x:23.14280011202636,y:.806256840150926,z:.035,ix:0,iz:1,iw:.33050711524232945,ih:.46458328102079677,s:1,smax:1,title:"TJ Hummingbird Feeder 190",price:"$75",status:"available",url:"https://tjm.art/products/older-work-hummingbird-feeder-190/",img:"art/older-work-hummingbird-feeder-190.webp",focal:!1,caption:"7 × 8.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hummingbird-feeder-190-cef1c7ac71-960.webp",w:.33050711524232945,h:.46458328102079677,fw:.36098711524232946,fh:.4950632810207968},{id:"older-work-ammous-livera-original-1",kind:"painting",room:"archive",wall:"S",x:23.14280011202636,y:2.327182454543015,z:.035,ix:0,iz:1,iw:.5699210408895511,ih:.5977046916329166,s:1,smax:1,title:"TJ Saifedean Ammous 355",price:"$200",status:"available",url:"https://tjm.art/products/older-work-ammous-livera-original-1/",img:"art/older-work-ammous-livera-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ammous-livera-original-1-03bc0c54d8-960.webp",w:.5699210408895511,h:.5977046916329166,fw:.600401040889551,fh:.6281846916329166},{id:"older-work-ammous-livera-original-2",kind:"painting",room:"archive",wall:"S",x:23.14280011202636,y:1.5334392946939404,z:.035,ix:0,iz:1,iw:.5595144198187086,ih:.6088216280652322,s:1,smax:1,title:"TJ Stephan Livera 356",price:"$200",status:"available",url:"https://tjm.art/products/older-work-ammous-livera-original-2/",img:"art/older-work-ammous-livera-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ammous-livera-original-2-13fb12c87c-960.webp",w:.5595144198187086,h:.6088216280652322,fw:.5899944198187086,fh:.6393016280652322},{id:"older-work-legend-of-billy-buff-original-2",kind:"painting",room:"archive",wall:"S",x:21.214935920412746,y:1.682418073652229,z:.035,ix:0,iz:1,iw:.5054435895070025,ih:.7237320397253392,s:1,smax:1,title:"TJ The Legend of Billy Buff 1",price:"$200",status:"available",url:"https://tjm.art/products/older-work-legend-of-billy-buff-original-2/",img:"art/older-work-legend-of-billy-buff-original-2.webp",focal:!1,caption:"10.5 × 13.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-legend-of-billy-buff-original-2-2375e533a9-960.webp",w:.5054435895070025,h:.7237320397253392,fw:.5359235895070025,fh:.7542120397253391},{id:"older-work-legend-of-billy-buff-original-1",kind:"painting",room:"archive",wall:"S",x:21.214935920412746,y:.7726560268947797,z:.035,ix:0,iz:1,iw:.5117365933169107,ih:.7148320537895597,s:1,smax:1,title:"TJ The Legend of Billy Buff 2",price:"$200",status:"available",url:"https://tjm.art/products/older-work-legend-of-billy-buff-original-1/",img:"art/older-work-legend-of-billy-buff-original-1.webp",focal:!1,caption:"10.5 × 13.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-legend-of-billy-buff-original-1-133621edc7-960.webp",w:.5117365933169107,h:.7148320537895597,fw:.5422165933169107,fh:.7453120537895597}],jm=[{id:"cormorant-presiding-over-sunset-on-puget-sound-plaque",kind:"plaque",room:"central",wall:"N",x:-8.6949842807465,y:1.6000000000000003,z:11.965,ix:0,iz:-1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Cormorant Presiding over Sunset on Puget Sound",lines:["Garden mural, Seattle · 60 × 40 in (W × H)","A favorite view. Brian and Marcos sent me reference photographs of sunset over Puget Sound, with the Olympic Mountains behind it. This is one of their favorite views—a scene that captures the essence of Seattle for them. They wanted to bring it into their garden as a mural painted on a board and hung from their fence.","The watercolor prototype. Before starting the acrylic mural, I painted a watercolor prototype to explore the composition. A cormorant spreads its wings on a pier pile in the foreground, as if presiding over the sunset. Two distant sailboats meet the waterline, beneath the layered mountains of the Olympics.","The garden becomes part of the painting. The plants in the garden are part of the composition. As the grasses beneath the board fill in, they will suggest dunes leading into the painted shore."],url:"https://tjm.art/products/cormorant-presiding-over-sunset-on-puget-sound/"},{id:"friends-club-mural-plaque",kind:"plaque",room:"travels",wall:"S",x:10.857439230624943,y:1.6000000000000003,z:15.535,ix:0,iz:1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Friends Club",lines:["Lillooet, British Columbia · 2026","40 × 9 ft shipping-container mural","An invitation, and a little trust. An exercise in trusting in the process and serendipity.","The design concept. I set up an ideation board, and Kara, Paul, and I brainstormed. I took their Higher Education branding kit and extracted a color palette and a set of themes. We discussed the principles of their organization, seeking to incorporate some of the messaging symbolically into the design, and we iterated.","Day one · Preparing the sea-can. On the May long weekend, I ventured to Lillooet with an intrepid crew of builders: stopping at the Ark in Vancouver to load cylinders and triangles, stopping in Whistler to jam and sleep, and wending over the passes and between charging stations toward the remote mountain valley."],url:"https://tjm.art/murals/#friends-story"},{id:"cape-town-plaque",kind:"plaque",room:"travels",wall:"S",x:3.2642484961256635,y:1.6000000000000003,z:15.535,ix:0,iz:1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Adopting Bitcoin Cape Town, South Africa",lines:["Exhibition · 2025","Adopting Bitcoin 2025 · V&A Waterfront"],url:"https://tjm.art/exhibitions/cape-town/"},{id:"el-salvador-plaque",kind:"plaque",room:"travels",wall:"N",x:-7.297999999999999,y:1.6000000000000003,z:23.465,ix:0,iz:-1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Adopting Bitcoin El Salvador",lines:["Exhibition · 2024","Adopting Bitcoin conference venue · Near San Salvador"],url:"https://tjm.art/exhibitions/el-salvador/"},{id:"bitcoin-film-festival-warsaw-plaque",kind:"plaque",room:"travels",wall:"N",x:-5.786,y:1.6000000000000003,z:23.465,ix:0,iz:-1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Bitcoin Film Festival Warsaw, Poland",lines:["Exhibition · 2026","Art & cinema · Warsaw, Poland","2026 · Kinoteka · Palace of Culture and Science","I made these paintings specifically for the Bitcoin Film Festival: the Warsaw Syrenka and the Bitcoin honey badger with cub, along with the movie poster for Coined in Watercolor, Gavin Robertson’s documentary."],url:"https://tjm.art/exhibitions/bitcoin-film-festival-warsaw/"},{id:"paul-murphy-plaque",kind:"plaque",room:"people",wall:"E",x:-15.260000000000002,y:1.6000000000000003,z:15.824100666530228,ix:-1,iz:0,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Paul Murphy",lines:["Exhibition","Paul Murphy is my dad. We’ve been painting together since COVID, when he picked up a brush shortly after I did and began painting for the first time in his life. As he leaves the corporate world, he’s discovered a new passion for artistic expression.","At least once a week, we talk about painting techniques and share images to paint. During COVID, he painted every day for a long stretch, sending me each painting with a poem he had written to accompany it. Those paintings and poems became his book COVID 2020.","He has published several books of poetry and found readers for his work. COVID 2020 and Reflections on Time are available on Amazon. You can also explore Reflections on Time here."],url:"https://tjm.art/exhibitions/paul-murphy/"},{id:"living-room-plaque",kind:"plaque",room:"people",wall:"E",x:-15.260000000000002,y:1.6000000000000003,z:11.456765085000226,ix:-1,iz:0,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"My Living Room, Seattle, Washington",lines:["Exhibition · Current"],url:"https://tjm.art/exhibitions/living-room/"},{id:"studio-601-plaque",kind:"plaque",room:"people",wall:"N",x:-19.016419913257586,y:1.6000000000000003,z:23.465,ix:0,iz:-1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Studio 601, Seattle, Washington",lines:["Exhibition · 2023","Pioneer Square · Seattle waterfront"],url:"https://tjm.art/exhibitions/studio-601/"},{id:"victrola-plaque",kind:"plaque",room:"people",wall:"N",x:-17.926517846443666,y:1.6000000000000003,z:23.465,ix:0,iz:-1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Victrola Coffee Shop, Seattle, Washington",lines:["Exhibition · 2026","15th Avenue East · Capitol Hill"],url:"https://tjm.art/exhibitions/victrola/"}],Li={layout:Gm,paintings:Wm,plaques:jm},_a=(i,t,e)=>new P(i,t,e),Zc=i=>Math.min(1,Math.max(0,i)),ji=i=>(i=Zc(i),i*i*(3-2*i)),Ze={erupt:3.5,engulf:5.2},sc=["THEY ARE SO HAPPY TO SEE YOU","YOU HAVE BEEN HERE BEFORE","LOOK AT WHAT THEY ARE SHOWING YOU","IT IS ALL LANGUAGE","THE PAINTINGS ARE WINDOWS","DO NOT TRY TO REMEMBER THIS"],Xm=(i="")=>new Qe({uniforms:{uTime:{value:0}},side:Ie,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform float uTime; varying vec2 vUv;
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
      gl_FragColor = vec4(floor(c*8.)/8., 1.); }`});function qm({scene:i,camera:t,renderer:e,makeElf:n,animateElf:a,elfUniforms:r,say:s,canvas:o,floorY:l}){const c=document.createElement("div");Object.assign(c.style,{position:"fixed",inset:"0",pointerEvents:"none",opacity:"0",background:"#fff",zIndex:5}),document.body.appendChild(c);let h=null;const d=(()=>{const N=document.createElement("canvas");N.width=N.height=128;const W=N.getContext("2d");W.strokeStyle="#ffb030",W.lineCap="round";for(let G=0;G<14;G++){let $=64,it=64,rt=G/14*6.283;W.lineWidth=5,W.beginPath(),W.moveTo($,it);for(let gt=0;gt<6;gt++)rt+=(Math.random()-.5)*.9,$+=Math.cos(rt)*11,it+=Math.sin(rt)*11,W.lineTo($,it),W.lineWidth=Math.max(1,5-gt);W.stroke()}const F=W.createRadialGradient(64,64,2,64,64,30);F.addColorStop(0,"rgba(255,240,160,1)"),F.addColorStop(1,"rgba(255,90,0,0)"),W.fillStyle=F,W.fillRect(0,0,128,128);const Y=new la(N);return Y.magFilter=Fe,Y})(),f=new tn(.25,.18,.22),m=new li({color:7034424}),g=new wr;g.fog=new wo(0,.02);const w=new Te(85,t.aspect,.05,400),p=Xm(),u=new Tt(new wn(9,9,300,24,1,!0).rotateX(Math.PI/2),p);g.add(u);const y=new Qe({uniforms:{uTime:{value:0}},vertexShader:"uniform float uTime; varying vec2 vP; void main(){ vec3 p = position; vP = p.xy; p.z += sin(length(p.xy)*0.6 - uTime*2.)*0.5; gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.); }",fragmentShader:`uniform float uTime; varying vec2 vP;
      vec3 hsv(float h,float s,float v){ vec3 k=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.); return v*mix(vec3(1.),k,s); }
      void main(){ vec2 g = vP*0.6; vec2 r = vec2(g.x + g.y*0.577, g.y*1.155); vec2 f = fract(r); float tri = step(f.x, f.y);
        float b = 1. - smoothstep(0.0, 0.08, min(min(f.x, f.y), abs(f.x - f.y)));
        float br = 0.5 + 0.5*sin(length(vP)*0.6 - uTime*2.);
        vec3 c = hsv(fract(tri*0.5 + length(floor(r))*0.05 + uTime*0.15), .8, 0.25 + 0.5*br) + b*vec3(1.,.8,.4);
        gl_FragColor = vec4(c, 1.); }`}),S=new Tt(new fe(60,300,60,150).rotateX(-Math.PI/2),y);S.position.y=-6,g.add(S);const b=new We;g.add(b);const k=[new $i(6,0),new yo(4.2,0),new Sr(2.8,0),new Eo(1.6,0)].map((N,W)=>{const F=new Tt(N,new de({color:16777215,wireframe:W%2===0,transparent:!0,opacity:W%2?.55:1}));return b.add(F),F}),A=[];for(let N=0;N<16;N++){const W=n(N/16);W.scale.setScalar(3+N%3),g.add(W),A.push({e:W,a:N/16*6.283,r:4+N%4*1.4,y:N%5-2,sp:.4+N%3*.25})}const T=new wr,C=new _o(-1,1,1,-1,0,1);T.add(new Tt(new fe(2,2),new de({color:0,transparent:!0,opacity:.18,depthTest:!1,depthWrite:!1})));let M={x:0,y:0};addEventListener("mousemove",N=>{!h||h.t<Ze.engulf||(M.x=Math.max(-.6,Math.min(.6,M.x-N.movementX*.002)),M.y=Math.max(-.4,Math.min(.4,M.y-N.movementY*.002)))});function _(N={}){const W=n(.77);W.scale.setScalar(11);const F=_a(0,0,-1).applyQuaternion(t.quaternion).setY(0).normalize(),Y=t.position.clone().addScaledVector(F,3.2);W.position.set(Y.x,-5,Y.z),i.add(W);const G=new Tt(new fe(1,1).rotateX(-Math.PI/2),new de({map:d,transparent:!0,blending:Aa,depthWrite:!1}));G.position.set(t.position.x,l(t.position.x,t.position.z)+.02,t.position.z);const $=new Na(16740384,0,12);$.position.copy(G.position).y+=.5,i.add($);const it=[];for(let rt=0;rt<26;rt++){const gt=new Tt(f,m);gt.position.copy(G.position),i.add(gt),it.push({m:gt,v:_a((Math.random()-.5)*6,4+Math.random()*6,(Math.random()-.5)*6),w:_a(Math.random()*9,Math.random()*9,0),t0:Math.random()*1.5})}h={t:N.direct?Ze.engulf-.6:0,direct:!!N.direct,wl:N.worldLen||18,savedPos:(N.savedPos||t.position).clone(),savedQuat:(N.savedQuat||t.quaternion).clone(),giant:W,crack:G,fissureLight:$,chunks:it,base:Y,frag:-1,done:!1},N.direct?(W.visible=!1,G.visible=!1,it.forEach(rt=>rt.m.visible=!1)):s("THE FLOOR IS... OPENING",3)}function R(){i.remove(h.giant,h.crack,h.fissureLight,...h.chunks.map(N=>N.m))}function V(N,W){if(!h)return!1;h.t+=N;const F=h.t;p.uniforms.uTime.value=y.uniforms.uTime.value=W/1e3;const Y=Ze.engulf+h.wl,G=Y+1.6;if(F<Ze.engulf&&h.direct)c.style.background="#000",c.style.opacity=String(ji((F-Ze.engulf+.6)/.6));else if(F<Ze.engulf){const $=ji(F/2.2),it=(F<Ze.erupt?.12:.05)*(1-Zc((F-3)/2));h.crack.scale.setScalar(.5+$*5),h.fissureLight.intensity=30*$,h.chunks.forEach(Q=>{const ft=F-Q.t0;ft<0||(Q.m.position.set(h.crack.position.x+Q.v.x*ft*.4,h.crack.position.y+Q.v.y*ft-4.9*ft*ft,h.crack.position.z+Q.v.z*ft*.4),Q.m.rotation.set(Q.w.x*ft,Q.w.y*ft,0),Q.m.position.y<0&&(Q.m.position.y=0))});const rt=ji((F-.6)/2.6);h.giant.position.y=-5+rt*(h.savedPos.y+2+5),a(h.giant,"idle",F,t,N);const gt=h.giant.localToWorld(_a(0,-.19,.2)),zt=ji((F-Ze.erupt)/(Ze.engulf-Ze.erupt));t.position.copy(h.savedPos).lerp(gt,zt*.97).add(_a((Math.random()-.5)*it,(Math.random()-.5)*it,(Math.random()-.5)*it));const X=t.clone();X.lookAt(gt),t.quaternion.copy(h.savedQuat).slerp(X.quaternion,ji((F-1.5)/2)),c.style.background="#000",c.style.opacity=String(ji((F-Ze.engulf+.6)/.6)),F>1.5&&F<1.6&&s("SOMETHING ENORMOUS IS VERY HAPPY TO SEE YOU",3),o.style.filter=`saturate(${1+$}) contrast(${1+$*.3})`}else if(F<Y){h.inWorld||(h.inWorld=!0,R(),M={x:0,y:0});const $=F-Ze.engulf;c.style.background=$<1?"#000":"#fff",c.style.opacity=String($<1?1-$:ji(($-(h.wl-1.6))/1.6)),w.position.set(Math.sin($*.4)*1.5,Math.cos($*.3)*1,-$*2.2),w.rotation.set(M.y+Math.sin($*.5)*.1,M.x,Math.sin($*.23)*.6,"YXZ"),u.position.z=w.position.z,S.position.z=w.position.z,b.position.set(0,0,w.position.z-22),k.forEach((gt,zt)=>{gt.rotation.set($*(.3+zt*.2)*(zt%2?-1:1),$*(.5+zt*.1),0),gt.material.color.setHSL(($*.1+zt*.25)%1,1,.6),gt.scale.setScalar(1+.15*Math.sin($*2+zt))}),A.forEach((gt,zt)=>{const X=gt.a+$*gt.sp;gt.e.position.set(Math.cos(X)*gt.r,gt.y+Math.abs(Math.sin($*3+zt))*1.2,w.position.z-8+Math.sin(X)*gt.r),a(gt.e,"idle",$+zt,w,N)});const it=Math.floor($/3);it!==h.frag&&it<6&&(h.frag=it,s(sc[it%sc.length],2.8));const rt=W/1e3;o.style.filter=`saturate(${2.2+Math.sin(rt*2)}) hue-rotate(${rt*60%360}deg) drop-shadow(${4+3*Math.sin(rt*3)}px 0 rgba(255,0,80,.6)) drop-shadow(${-4-3*Math.sin(rt*3)}px 0 rgba(0,255,240,.6))`,o.style.transform=`scale(${1.04+.03*Math.sin(rt*1.7)}) skew(${3*Math.sin(rt*.9)}deg, ${2*Math.sin(rt*1.3)}deg) rotate(${2*Math.sin(rt*.7)}deg)`,r.uPulse.value=1}else if(F<G){if(!h.back){h.back=!0,t.position.copy(h.savedPos),t.quaternion.copy(h.savedQuat);const $=new Pe().setFromQuaternion(t.quaternion,"YXZ");$.x=0,$.z=0,t.quaternion.setFromEuler($),o.style.filter="",o.style.transform="",s("WELCOME BACK.",4)}c.style.background="#fff",c.style.opacity=String(1-ji((F-Y)/(G-Y)))}else{c.style.opacity="0",h.done=!0;const $=h;return h=null,{finished:!0,savedPos:$.savedPos}}return!0}function B(){return h&&h.inWorld&&!h.back?(e.render(T,C),e.clearDepth(),e.render(g,w),!0):!1}return{start:_,update:V,render:B,get state(){return h}}}const Ta={uTime:{value:0},uPulse:{value:0}};function Gn(i,t=1){i=i.index?i.toNonIndexed():i,i.computeVertexNormals();const e=i.attributes.position.array,n=e.length/9,a=new Float32Array(e.length),r=new Float32Array(e.length/3),s=new Float32Array(e.length/3);for(let o=0;o<n;o++){const l=(e[o*9]+e[o*9+3]+e[o*9+6])/3,c=(e[o*9+1]+e[o*9+4]+e[o*9+7])/3,h=(e[o*9+2]+e[o*9+5]+e[o*9+8])/3,d=Math.abs(Math.sin(o*12.9898+l*78.233)*43758.5453)%1;for(let f=0;f<3;f++)a.set([l,c,h],o*9+f*3),r[o*3+f]=d,s[o*3+f]=t}return i.setAttribute("aCenter",new je(a,3)),i.setAttribute("aRand",new je(r,1)),i.setAttribute("aOpen",new je(s,1)),i}function oc(i){const t=new hi,e=["position","normal","aCenter","aRand","aOpen"],n={};return e.forEach(a=>n[a]=[]),i.forEach(a=>e.forEach(r=>n[r].push(...a.attributes[r].array))),e.forEach(a=>t.setAttribute(a,new be(n[a],i[0].attributes[a].itemSize))),t}const hs=new Qe({uniforms:Ta,vertexShader:`attribute vec3 aCenter; attribute float aRand; attribute float aOpen; uniform float uTime;
    varying vec3 vN; varying vec3 vC; varying vec3 vP; varying float vR; varying vec3 vV; varying float vPh;
    void main(){
      float ph = dot(modelMatrix[3].xyz, vec3(1.3, 0.7, 2.1));
      float open = pow(max(0., sin(uTime*1.6 + ph + aRand*6.283)), 4.) * 0.035 * aOpen;   // facets drift apart
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
      if (eyeOn > 0. && de < 0.03) { c = mix(vec3(1., .97, .6), vec3(.02), step(de, 0.013)); }
      // grin band: facets in the lower front open into glowing nested geometry
      if (vC.z > 0.07 && vC.y < -0.02 && vC.y > -0.11 && abs(vC.x) < 0.15) {
        float rings = fract(length(vP.xy - vec2(0., -0.07))*40. - uTime*2.);
        c = mix(vec3(0.03, 0., 0.05), hsv(fract(uTime*0.3 + rings), .9, 1.), step(0.7, rings));
      }
      c *= 1. + uPulse*0.25;
      gl_FragColor = vec4(floor(c*9.)/9., 1.);
    }`}),Jc=new de({color:16777215}),Kc=new de({color:16777215,wireframe:!1}),xa={shell:Gn(new $i(.17,1)),core:new Sr(.1,0),cap:(()=>{const i=[];return[-.6,0,.6].forEach(t=>{const e=new Mo(.05,.22,4).translate(0,.11,0).rotateZ(t).translate(Math.sin(-t)*.05,.13,0);i.push(Gn(e,.3));const n=new $i(.025,0).translate(Math.sin(-t)*.25,.13+Math.cos(t)*.22,0);i.push(Gn(n,.3))}),i.push(Gn(new wn(.12,.14,.05,8).translate(0,.13,0),.2)),oc(i)})(),arm:oc([Gn(new wn(.025,.02,.12,5).translate(0,-.06,0),0),Gn(new $i(.035,0).translate(0,-.13,0),.5)]),orb:new $i(.06,0)};function Tr(i=Math.random()){const t=new We,e=new We;t.add(e);const n=new Tt(xa.shell,hs);e.add(n);const a=new Tt(xa.core,Jc);e.add(a);const r=new Tt(xa.cap,hs);e.add(r);const s=h=>{const d=new Tt(xa.arm,hs);return d.position.set(h,0,.04),e.add(d),d},o=s(-.17),l=s(.17),c=new Tt(xa.orb,Kc);return c.position.set(0,.42,.1),e.add(c),t.userData.rig={body:e,shell:n,core:a,cap:r,armL:o,armR:l,orb:c,seed:i,glitch:0},t}const Ym=(i,t)=>Math.floor(i*t)/t;function Ar(i,t,e,n,a){const r=i.userData.rig,s=r.seed*10,o=Ym(e+s,8);let l=0,c=1,h=.3,d=.3,f=0,m=0;if(t==="walk"||t==="retreat"){const p=Math.abs(Math.sin((e+s)*9));l=p*.16,c=p<.15?.75:1+p*.08,f=(e+s)*(t==="retreat"?-9:9),h=-1+Math.sin(e*18)*.6,d=-1-Math.sin(e*18)*.6}else if(t==="scrub")d=-1.6+Math.sin((e+s)*22)*.7,h=-1.6-Math.sin((e+s)*22)*.7,l=Math.abs(Math.sin((e+s)*11))*.04,f=Math.sin(e*5)*.3;else if(t==="carry"){h=d=-2.9+Math.sin((e+s)*8)*.2;const p=Math.abs(Math.sin((e+s)*12));l=p*.05,c=1-p*.1}else t==="peek"?(h=-2.6,d=-.4,m=1,f=Math.sin(o*4)*.2):(l=Math.abs(Math.sin((e+s)*6))*.08,h=-2.4+Math.sin(o*3)*.4,m=1);r.body.position.y=-.12+l,r.body.scale.set(1/Math.sqrt(c),c,1/Math.sqrt(c)),r.armL.rotation.set(h,0,.5),r.armR.rotation.set(d,0,-.5),r.shell.rotation.set(f*.25,Math.sin(o*1.1+s)*.4,Math.sin(o*.7)*.3),r.core.rotation.set(e*2.3,e*3.1,0),r.core.scale.setScalar(.8+.3*Math.sin(e*4+s)),r.cap.rotation.z=Math.sin(o*1.3+s)*.4,r.cap.position.y=.06+Math.abs(Math.sin(e*9+s))*.03,r.orb.visible=m>0,r.orb.rotation.set(e*3,e*2,0),r.orb.scale.set(1+.4*Math.sin(e*5),1+.4*Math.sin(e*5+2),1+.4*Math.sin(e*5+4));const g=i.getWorldPosition(new P);i.lookAt(n.position.x,g.y,n.position.z),r.glitch>0?r.glitch-=a:Math.random()<a*.6&&(r.glitch=.12);const w=r.glitch>0;r.body.position.x=w?(Math.random()-.5)*.06:0,w&&(r.body.scale.x*=1.5)}function lc(i){const t=i/2e3%1;Kc.color.setHSL(t,1,.65),Jc.color.setHSL((t+.5)%1,1,.7)}const Sn=(i,t)=>{const e=document.createElement("canvas");return e.width=i,e.height=t,[e,e.getContext("2d")]};let cc=7;const De=()=>(cc=cc*16807%2147483647)/2147483647;function En(i,t=1,e=1){const n=new la(i);return n.magFilter=n.minFilter=Fe,n.generateMipmaps=!1,n.wrapS=n.wrapT=Ra,n.repeat.set(t,e),n.colorSpace=we,n}function $m(){const[i,t]=Sn(32,32);t.fillStyle="#ff7a00",t.beginPath(),t.arc(16,16,8,0,7),t.fill();for(let n=0;n<9;n++){const a=De()*6.28,r=8+De()*7;t.fillRect(16+Math.cos(a)*r-2|0,16+Math.sin(a)*r-2|0,3+De()*3|0,3+De()*3|0)}t.fillStyle="#ffb040",t.fillRect(12,12,3,3);const e=En(i);return e.wrapS=e.wrapT=mi,e}function Ro(i,t){const[e,n]=Sn(256,40);n.fillStyle="#2a2014",n.fillRect(0,0,256,40),n.strokeStyle="#c9a24a",n.lineWidth=3,n.strokeRect(2,2,252,36),n.fillStyle="#f0d070",n.font="bold 15px monospace",n.textAlign="center",n.textBaseline="middle",n.fillText(i.length>30?i.slice(0,29)+"…":i,128,21);const a=En(e);return a.wrapS=a.wrapT=mi,a}function Zm(){const[i,t]=Sn(64,64),e=t.createRadialGradient(32,26,2,32,30,32);e.addColorStop(0,"rgba(255,200,130,.55)"),e.addColorStop(.6,"rgba(255,170,90,.2)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=En(i);return n.wrapS=n.wrapT=mi,n}const wa=[[20,16,12],[39,30,22],[55,43,31],[71,55,39],[87,67,47],[107,83,59],[127,99,71],[59,51,35],[79,71,47],[99,91,63],[47,47,51],[67,67,71],[91,91,95],[119,115,111],[123,63,31],[159,83,35],[191,111,47],[227,155,63]];function Co(i){const t=i.getContext("2d"),e=t.getImageData(0,0,i.width,i.height);for(let n=0;n<e.data.length;n+=4){let a=0,r=1e9;for(let s=0;s<wa.length;s++){const o=wa[s],l=(o[0]-e.data[n])**2+(o[1]-e.data[n+1])**2+(o[2]-e.data[n+2])**2;l<r&&(r=l,a=s)}e.data[n]=wa[a][0],e.data[n+1]=wa[a][1],e.data[n+2]=wa[a][2]}return t.putImageData(e,0,0),i}function Po(i,t,e,n=900,a=.35){for(let r=0;r<n;r++){const s=De()<.5?0:255;i.fillStyle=`rgba(${s},${s},${s},${De()*a})`,i.fillRect(De()*t|0,De()*e|0,1+(De()*2|0),1)}}function Jm(i,t){const[e,n]=Sn(64,64);n.fillStyle="#4a4a4e",n.fillRect(0,0,64,64);for(let a=0;a<2;a++)for(let r=0;r<2;r++){n.fillStyle=(a+r)%2?"#56565a":"#46464a",n.fillRect(a*32+1,r*32+1,30,30),n.fillStyle="#77736f",n.fillRect(a*32+1,r*32+1,30,1),n.fillStyle="#202024",n.fillRect(a*32+1,r*32+30,30,1);for(const[s,o]of[[4,4],[27,4],[4,27],[27,27]])n.fillStyle="#88847f",n.fillRect(a*32+s,r*32+o,2,2),n.fillStyle="#18181a",n.fillRect(a*32+s+1,r*32+o+1,2,1)}n.fillStyle="rgba(123,63,31,.5)";for(let a=0;a<40;a++)n.fillRect(De()*64|0,De()*64|0,2,3+De()*6|0);return Po(n,64,64,700,.3),En(Co(e),i,t)}function Km(i,t){const[e,n]=Sn(32,64);for(let a=0;a<64;a++){const r=60+Math.sin(a*.7+De())*12+De()*10|0;n.fillStyle=`rgb(${r},${r*.72|0},${r*.48|0})`,n.fillRect(0,a,32,1)}return n.fillStyle="#1e1810",n.fillRect(15,0,1,64),Po(n,32,64,300),En(Co(e),i,t)}function Qm(i,t){const[e,n]=Sn(64,64);n.fillStyle="#16120c",n.fillRect(0,0,64,64);for(let a=0;a<2;a++)for(let r=0;r<2;r++){const s=55+De()*30|0;n.fillStyle=`rgb(${s},${s*.9|0},${s*.65|0})`,n.fillRect(a*32+1,r*32+1,30,30)}return Po(n,64,64,1200,.4),En(Co(e),i,t)}function Lo(){const[i,t]=Sn(32,8);for(let e=0;e<32;e++)for(let n=0;n<8;n++){const a=Math.sin(e*.6+n*.9)+Math.sin(e*.23-n*1.3);t.fillStyle=a>.8?"#ffd040":a>0?"#ff7a10":a>-.8?"#c03a08":"#601804",t.fillRect(e,n,1,1)}return En(i,8,1)}let ds;function t1(){if(ds)return ds;const i=512,t=document.createElement("canvas");t.width=t.height=i;const e=t.getContext("2d");e.fillStyle="#4e463d",e.fillRect(0,0,i,i);for(let r=0;r<60;r++){const s=Math.random()*i,o=Math.random()*i,l=40+Math.random()*110,c=.025+Math.random()*.03,h=Math.random()<.5;for(const d of[-i,0,i])for(const f of[-i,0,i]){const m=e.createRadialGradient(s+d,o+f,0,s+d,o+f,l);m.addColorStop(0,h?`rgba(200,185,160,${c})`:`rgba(20,15,10,${c})`),m.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=m,e.fillRect(s+d-l,o+f-l,2*l,2*l)}}const n=e.getImageData(0,0,i,i),a=n.data;for(let r=0;r<a.length;r+=4){const s=(Math.random()-.5)*10;a[r]+=s,a[r+1]+=s,a[r+2]+=s*.9}return e.putImageData(n,0,0),e.strokeStyle="rgba(25,20,15,.22)",e.lineWidth=1.5,e.beginPath(),e.moveTo(0,.5),e.lineTo(i,.5),e.moveTo(0,i/2),e.lineTo(i,i/2),e.moveTo(.5,0),e.lineTo(.5,i/2),e.moveTo(i/2,i/2),e.lineTo(i/2,i),e.stroke(),ds=t}const to="/play/",Do=800,Io=500,ki=document.getElementById("c"),Ge=new Sm({canvas:ki,antialias:!1,preserveDrawingBuffer:!0});Ge.setPixelRatio(1);Ge.setSize(Do,Io,!1);const Yt=new wr;Yt.background=new It(789e3);Yt.fog=new bo(920328,10,28);const nt=new Te(70,Do/Io,.05,100);nt.position.set(Li.layout.start.x,1.6,Li.layout.start.z);nt.lookAt(Li.layout.start.x+Math.sin(Li.layout.start.yaw)*5,1.6,Li.layout.start.z+Math.cos(Li.layout.start.yaw)*5);Yt.add(nt);const Ke=1.6,Di=(i,t)=>{const e=Math.abs(i-Qi.x),n=Math.abs(t-Qi.z);return e<1.8&&n<1.8?.5:e<2.4&&n<2.4?.25:0};Yt.add(new $c(11571312,2103312,.55));const en=Li.layout,Ne=en.hall.height,Wn=en.hall.doorHeight,xe=.3,oe={stone:(i,t)=>{const e=new la(t1());return e.wrapS=e.wrapT=Ra,e.repeat.set(Math.max(1,i),Math.max(1,t)),e.colorSpace=we,e.generateMipmaps=!0,e.minFilter=Ri,e.magFilter=Je,e.anisotropy=Ge.capabilities.getMaxAnisotropy(),new li({map:e})},metal:(i,t)=>new li({map:Jm(Math.max(1,i),Math.max(1,t))}),wood:(i,t)=>new li({map:Km(Math.max(1,i),Math.max(1,t))})};function jt(i,t,e,n,a,r,s,o=Yt){const l=new Tt(new tn(i,t,e),n);return l.position.set(a,r,s),o.add(l),l}const Qc=Lo(),e1=new de({map:Qc}),Uo=[],th=[],ko=[],zo=[],eh=[],Xe=en.rooms,No=en.hallways;function ih(i,t){th.push([i,t]),jt(.7,Ne,.7,oe.stone(.7,Ne/2),i,Ne/2,t),jt(.9,.3,.9,oe.metal(1,.3),i,.15,t),jt(.9,.3,.9,oe.metal(1,.3),i,Ne-.15,t)}function i1(i,t){const e=t==="N"||t==="S",n=t==="N"?i.maxZ:t==="S"?i.minZ:t==="W"?i.minX:i.maxX,a=e?i.minX:i.minZ,r=e?i.maxX:i.maxZ,s=t==="N"?[0,-1]:t==="S"?[0,1]:t==="W"?[1,0]:[-1,0],o=i.openings.filter(f=>f.wall===t).sort((f,m)=>f.from-m.from),l=[...o.map(f=>({...f,door:1})),...(i.windows||[]).filter(f=>f.wall===t)].sort((f,m)=>f.from-m.from),c=[];let h=a;l.forEach(f=>{c.push([h,f.from,0,Ne]),f.door?c.push([f.from,f.to,Wn,Ne]):(c.push([f.from,f.to,0,f.sill]),c.push([f.from,f.to,f.head,Ne]),zo.push({side:t,c:n,inward:s,from:f.from,to:f.to,sill:f.sill,head:f.head})),h=f.to}),c.push([h,r,0,Ne]);const d=xe/2;c.forEach(([f,m,g,w])=>{const p=m-f;if(p<.01)return;const u=(f+m)/2,y=w-g,S=g>0?oe.metal(p/2,y/2):oe.stone(p/2,y/2);if(e?jt(p,y,xe,S,u,g+y/2,n-s[1]*d):jt(xe,y,p,S,n-s[0]*d,g+y/2,u),g===0){const b=new Tt(new fe(p,.2),e1);b.rotation.x=-Math.PI/2,e?b.position.set(u,.015,n+s[1]*.12):(b.rotation.z=Math.PI/2,b.position.set(n+s[0]*.12,.015,u)),Yt.add(b)}}),o.forEach(f=>{for(const m of[f.from-.35,f.to+.35]){const[g,w]=e?[m,n+s[1]*.35]:[n+s[0]*.35,m];ih(g,w),ko.push([g+s[0]*.45,2.9,w+s[1]*.45])}})}Xe.forEach(i=>{const t=i.maxX-i.minX,e=i.maxZ-i.minZ,n=(i.minX+i.maxX)/2,a=(i.minZ+i.maxZ)/2,r=new Tt(new fe(t,e),new li({map:Qm(t/2,e/2)}));r.rotation.x=-Math.PI/2,r.position.set(n,0,a),Yt.add(r);const s=new Tt(new fe(t,e),oe.metal(t/2,e/2));s.rotation.x=Math.PI/2,s.position.set(n,Ne,a),Yt.add(s),Uo.push(s),["N","S","W","E"].forEach(c=>i1(i,c));for(const[c,h]of[[i.minX+.35,i.minZ+.35],[i.maxX-.35,i.minZ+.35],[i.minX+.35,i.maxZ-.35],[i.maxX-.35,i.maxZ-.35]])ih(c,h);const o=oe.wood(Math.max(t,e)/2,1),l=t>e;for(let c=3;c<(l?t:e)-1;c+=4)l?jt(.4,.45,e,o,i.minX+c,Ne-.3,a):jt(t,.45,.4,o,n,Ne-.3,i.minZ+c);ko.push([n,Ne-.9,a])});No.forEach(i=>{const t=i.maxX-i.minX,e=i.maxZ-i.minZ,n=(i.minX+i.maxX)/2,a=(i.minZ+i.maxZ)/2,r=new Tt(new fe(t,e),oe.metal(t,e));r.rotation.x=-Math.PI/2,r.position.set(n,.005,a),Yt.add(r);const s=jt(t,.2,e+2*xe,oe.metal(t,e),n,Wn+.1,a);Uo.push(s),jt(t,Wn,xe,oe.stone(t/2,1.4),n,Wn/2,i.minZ-xe/2),jt(t,Wn,xe,oe.stone(t/2,1.4),n,Wn/2,i.maxZ+xe/2)});const gn=en.courtyard,se={minX:Xe.reduce((i,t)=>Math.min(i,t.maxX),1e9)<0?-15.225:gn.minX,maxX:0,minZ:gn.minZ,maxZ:gn.maxZ};se.minX=Math.min(...Xe.filter(i=>i.maxX<gn.minX+.01).map(i=>i.maxX),gn.minX);se.maxX=Math.max(...Xe.filter(i=>i.minX>gn.maxX-.01).map(i=>i.minX),gn.maxX);const Fo=Lo();Fo.repeat.set((se.maxX-se.minX)/1.5,(se.maxZ-se.minZ)/1.5);const n1=new de({map:Fo,color:16777215}),Oo=Lo();Oo.repeat.set((se.maxX-se.minX)/4,(se.maxZ-se.minZ)/4);const a1=new de({map:Oo,transparent:!0,opacity:.45,blending:Aa,depthWrite:!1});{const i=se.maxX-se.minX,t=se.maxZ-se.minZ,e=(se.minX+se.maxX)/2,n=(se.minZ+se.maxZ)/2,a=new Tt(new fe(i,t),n1);a.rotation.x=-Math.PI/2,a.position.set(e,-.25,n),Yt.add(a);const r=new Tt(new fe(i,t),a1);r.rotation.x=-Math.PI/2,r.position.set(e,-.23,n),Yt.add(r),jt(i,.3,.12,oe.metal(i/2,.2),e,-.1,se.minZ+.06),jt(i,.3,.12,oe.metal(i/2,.2),e,-.1,se.maxZ-.06),[-.33,0,.33].forEach(o=>{const l=new Na(16734736,9,9,1.3);l.position.set(e+o*i,.6,n),Yt.add(l),eh.push(l)});const s=new Tt(new fe(i,t),new de({color:1707270}));s.rotation.x=Math.PI/2,s.position.set(e,Ne+1.5,n),Yt.add(s)}zo.forEach(i=>{const t=i.side==="N"||i.side==="S",e=(i.from+i.to)/2,n=i.to-i.from,a=(r,s,o)=>t?[r,s,i.c-i.inward[1]*o]:[i.c-i.inward[0]*o,s,r];t?jt(n+.2,.08,xe+.16,oe.metal(1,.2),...a(e,i.sill,xe/2)):jt(xe+.16,.08,n+.2,oe.metal(1,.2),...a(e,i.sill,xe/2));for(const r of[i.from,i.to])jt(t?.08:xe,i.head-i.sill,t?xe:.08,oe.metal(.2,1),...a(r,(i.sill+i.head)/2,xe/2));jt(t?.05:xe*.6,i.head-i.sill,t?xe*.6:.05,oe.metal(.1,1),...a(e,(i.sill+i.head)/2,xe/2))});const qt=(()=>{const i=en.gate,t=Xe.find(r=>r.id===i.room),e=(i.from+i.to)/2,n=t.maxZ,a=[0,-1];return{pos:new P(e,0,n),n:new P(a[0],0,a[1]),w:1.5,h:2.6}})(),Bo=new Qe({transparent:!0,side:ui,uniforms:{uTime:{value:0},uA:{value:new It(.18,.05,.45)},uB:{value:new It(.35,.55,1)},uC:{value:new It(.6,.4,1)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`varying vec2 vUv; uniform float uTime; uniform vec3 uA, uB, uC;
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
      gl_FragColor = vec4(col, .92 * edge + .08); }`});{const i=new We;i.position.copy(qt.pos).addScaledVector(qt.n,.04),i.rotation.y=Math.atan2(qt.n.x,qt.n.z),Yt.add(i);const t=new Tt(new fe(qt.w,qt.h),Bo);t.position.y=qt.h/2,i.add(t),qt.mesh=t;const e=oe.metal(.3,1.4);jt(.3,qt.h+.3,.3,e,-qt.w/2-.15,(qt.h+.3)/2,.1,i),jt(.3,qt.h+.3,.3,e,qt.w/2+.15,(qt.h+.3)/2,.1,i),jt(qt.w+.9,.35,.36,e,0,qt.h+.3,.1,i),jt(qt.w+.9,.12,.8,oe.metal(1,.3),0,.06,.3,i);const n=new Na(8019199,5,5,1.5);n.position.set(0,1.4,.8),i.add(n),qt.light=n;const a=new Tt(new fe(1.4,.2),new de({map:Ro("SLIPGATE")}));a.position.set(0,qt.h+.3,.29),i.add(a)}const Jt=(()=>{const i=en.checkout,t=Xe.find(r=>r.id===i.room),e=(i.from+i.to)/2,n=t.maxZ,a=[0,-1];return{pos:new P(e,0,n),n:new P(a[0],0,a[1]),w:1.5,h:2.6}})(),Fa=Bo.clone();Fa.uniforms.uA.value=new It(.05,.22,.06);Fa.uniforms.uB.value=new It(1,.78,.2);Fa.uniforms.uC.value=new It(.6,1,.4);{const i=new We;i.position.copy(Jt.pos).addScaledVector(Jt.n,.04),i.rotation.y=Math.atan2(Jt.n.x,Jt.n.z),Yt.add(i);const t=new Tt(new fe(Jt.w,Jt.h),Fa);t.position.y=Jt.h/2,i.add(t);const e=new li({color:9071138});jt(.3,Jt.h+.3,.3,e,-Jt.w/2-.15,(Jt.h+.3)/2,.1,i),jt(.3,Jt.h+.3,.3,e,Jt.w/2+.15,(Jt.h+.3)/2,.1,i),jt(Jt.w+.9,.35,.36,e,0,Jt.h+.3,.1,i),jt(Jt.w+.9,.12,.8,oe.metal(1,.3),0,.06,.3,i);const n=new Na(14204992,5,5,1.5);n.position.set(0,1.4,.8),i.add(n),Jt.light=n;const a=document.createElement("canvas");a.width=512,a.height=96;const r=a.getContext("2d");r.fillStyle="#1a1206",r.fillRect(0,0,512,96),r.strokeStyle="#e8c050",r.lineWidth=6,r.strokeRect(3,3,506,90),r.fillStyle="#ffd860",r.font="900 64px Impact, Arial Black, sans-serif",r.textAlign="center",r.textBaseline="middle",r.fillText("CHECKOUT",256,50);const s=new la(a);s.colorSpace=we,s.anisotropy=8;const o=new Tt(new fe(1.8,.34),new de({map:s}));o.position.set(0,Jt.h+.3,.29),i.add(o)}let hc=!1;function nh(){try{sessionStorage.setItem("tjmPlayState",JSON.stringify({pos:nt.position.toArray(),quat:nt.quaternion.toArray(),weapon:ra,cart:vn.map(i=>i.slug),swarmCount:Mn,at:Date.now()}))}catch{}}function r1(){if(hc)return;hc=!0;const i=Jt.pos.clone().addScaledVector(Jt.n,1.6);i.y=Ke,nt.position.copy(i),nt.lookAt(Jt.pos.x,Ke,Jt.pos.z),nh();try{const e=JSON.parse(localStorage.getItem("va-cart-v1")||"[]"),n=new Set((Array.isArray(e)?e:[]).map(r=>r.id)),a=vn.filter(r=>r.status==="available"&&!n.has(r.slug)).map(r=>({id:r.slug,quantity:1}));localStorage.setItem("va-cart-v1",JSON.stringify([...Array.isArray(e)?e:[],...a].slice(0,12)))}catch{}ah(),Ae("TO THE CHECKOUT…",3),Ce.isLocked&&Ce.unlock();const t=/(^|\.)tjm\.art$/.test(location.hostname);setTimeout(()=>location.assign((t?"/cart/":"https://tjm.art/cart/")+"?from=play"),600)}let fs=null;function ah(){try{fs=fs||new(window.AudioContext||window.webkitAudioContext);const i=fs,t=i.currentTime,e=i.createOscillator(),n=i.createGain();e.type="sawtooth",e.frequency.setValueAtTime(880,t),e.frequency.exponentialRampToValueAtTime(55,t+.9),n.gain.setValueAtTime(.25,t),n.gain.exponentialRampToValueAtTime(.001,t+1),e.connect(n).connect(i.destination),e.start(t),e.stop(t+1);const a=i.createBuffer(1,i.sampleRate,i.sampleRate),r=a.getChannelData(0);for(let l=0;l<r.length;l++)r[l]=(Math.random()*2-1)*(1-l/r.length);const s=i.createBufferSource(),o=i.createGain();s.buffer=a,o.gain.value=.18,s.connect(o).connect(i.destination),s.start(t)}catch{}}let si=null;function s1(){const i=qt.pos.clone().addScaledVector(qt.n,1.6);i.y=Ke;const t=nt.clone();t.position.copy(i),t.lookAt(i.x+qt.n.x,Ke,i.z+qt.n.z),si={v:0,back:i,backQ:t.quaternion.clone(),t:0},ah(),Ce.enabled=!1,Ve.set(0,0,0),nt.position.set((se.minX+se.maxX)/2,9,(se.minZ+se.maxZ)/2),nt.quaternion.setFromEuler(new Pe(-1.2,0,0,"YXZ")),Ae("YOU ARE FALLING",2.5)}function o1(i){if(si.t+=i,si.v-=9.8*i,nt.position.y+=si.v*i,nt.position.y<.1){const t=si;si=null,qo=!1,pi=!0,document.body.classList.add("chaos"),Ae("THE LAVA IS NOT LAVA",3),Ai.start({direct:!0,worldLen:11,savedPos:t.back,savedQuat:t.backQ}),rh++}}let rh=0;en.signs.forEach(i=>{const t=new Tt(new fe(2.2,.3),new de({map:Ro(i.title)}));t.position.set(i.x,i.y,i.z),t.rotation.y=i.yaw,Yt.add(t)});const Qi={x:0,z:(Xe[0].minZ+Xe[0].maxZ)/2};jt(4.8,.25,4.8,oe.stone(2.4,.2),Qi.x,.125,Qi.z);jt(3.6,.25,3.6,oe.metal(1.8,.2),Qi.x,.375,Qi.z);const dc=ko.map(([i,t,e])=>{const n=new Tt(new tn(.16,.22,.16),new de({color:16752704}));return n.position.set(i,t,e),Yt.add(n),jt(.1,.35,.1,oe.wood(1,1),i,t-.28,e),{flame:n,ph:Math.random()*10,pos:new P(i,t,e)}}),eo=Array.from({length:4},()=>{const i=new Na(16747056,6,9,1.4);return Yt.add(i),i}),lr=.45;function mr(i,t){for(const e of Xe)if(i>e.minX+lr&&i<e.maxX-lr&&t>e.minZ+lr&&t<e.maxZ-lr)return!0;for(const e of No)if(i>=e.minX-.5&&i<=e.maxX+.5&&t>e.minZ+.3&&t<e.maxZ-.3)return!0;return!1}function sh(i,t){let e=null,n=1e9;return Xe.forEach(a=>{const r=Math.max(a.minX-i,0,i-a.maxX),s=Math.max(a.minZ-t,0,t-a.maxZ),o=r+s;o<n&&(n=o,e=a)}),e}const oh=new Rm,l1=Zm(),c1=new li({color:1840914}),h1=new li({color:3024930}),d1=new de({map:l1,transparent:!0,blending:Aa,depthWrite:!1}),mn=new fe(1,1),ci=[],fc=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),uc=[],f1=Ge.capabilities.getMaxAnisotropy(),Ho=i=>(i.colorSpace=we,i.generateMipmaps=!0,i.minFilter=Ri,i.magFilter=Je,i.anisotropy=f1,i.needsUpdate=!0,i);function pc(i,t,e){const n=[];let a="";for(const r of t.split(" ")){const s=a?a+" "+r:r;i.measureText(s).width>e&&a?(n.push(a),a=r):a=s}return a&&n.push(a),n}function io(i,t,e){if(i.measureText(t).width<=e)return t;for(;t.length>1&&i.measureText(t+"…").width>e;)t=t.slice(0,-1);return t+"…"}function u1(i,t,e){const n=document.createElement("canvas");n.width=512,n.height=160;const a=n.getContext("2d");a.fillStyle="#e9e1cf",a.fillRect(0,0,512,160),a.strokeStyle="#8a7a5c",a.lineWidth=4,a.strokeRect(2,2,508,156),a.fillStyle="#1d1712",a.font="bold 44px Georgia, serif",a.textBaseline="middle",a.fillText(io(a,i,476),18,54),a.fillStyle=e||"#4a3f32",a.font="32px Arial, sans-serif",a.fillText(io(a,t,476),18,112);const r=new Tt(mn,new li({map:Ho(new la(n))}));return r.scale.set(.2,.0625,1),r}const Vo=[];(Li.plaques||[]).forEach(i=>{const t=new We;t.position.set(i.x,i.y,i.z),t.rotation.y=Math.atan2(i.ix,i.iz),Yt.add(t);const e=new Tt(mn,new li({color:2760728}));e.scale.set(i.fw+.06,i.fh+.06,1),e.position.z=.01,t.add(e);const n=new Tt(mn,new de({color:1380363}));n.scale.set(i.fw,i.fh,1),n.position.z=.02,t.add(n),n.userData.q=i,e.userData.q=i,Vo.push(n,e);{const a=document.createElement("canvas");a.width=620,a.height=820;const r=a.getContext("2d");r.fillStyle="#17110c",r.fillRect(0,0,620,820),r.fillStyle="#f2e4c4",r.font="bold 40px Georgia, serif";let s=60;for(const o of pc(r,i.title,560).slice(0,3))r.fillText(o,30,s),s+=46;r.font="24px Arial, sans-serif",r.fillStyle="#d2b47a",i.lines[0]&&(r.fillText(io(r,i.lines[0],560),30,s),s+=44),r.font="25px Georgia, serif",r.fillStyle="#e6d6b4";for(const o of i.lines.slice(1)){for(const l of pc(r,o,560)){if(s>740)break;r.fillText(l,30,s),s+=32}s+=14}r.font="22px Arial, sans-serif",r.fillStyle="#d2b47a",r.fillText("Press E to read more on tjm.art",30,790),n.material=new de({map:Ho(new la(a))})}});Li.paintings.forEach((i,t)=>{const e=new We;e.position.set(i.x,i.y,i.z),e.rotation.y=Math.atan2(i.ix,i.iz),Yt.add(e);const n=oh.load(to+i.img);n.colorSpace=we,n.magFilter=n.minFilter=Fe,n.generateMipmaps=!1;const a=i.fw,r=i.fh,s=new Tt(mn,c1);s.scale.set(Math.max(a,i.w+.03),Math.max(r,i.h+.03),1),s.position.z=.005,e.add(s);const o=new Tt(mn,new de({map:n}));o.scale.set(i.w,i.h,1),o.position.z=.02,e.add(o);const l=new Tt(mn,d1);l.scale.set(a*1.8+.6,r*1.8+.6,1),l.position.set(0,.15,.001),e.add(l);const c=new Tt(mn,h1);c.scale.set(Math.min(.8,a*.6),.05,1),c.position.set(0,r/2+.12,.06),e.add(c),i.slug=i.slug||i.id;const h=i.caption&&i.caption.length<30?i.caption:"",d=i.status==="available"?`${i.price} · available`:i.status==="sold"?"SOLD":i.status==="inquiry"?"available by inquiry":"not for sale",f={data:i,group:e,mesh:o,frame:s,state:"wall",i:t,w:a,h:r,room:i.room},m=u1(i.title,(h?h+" · ":"")+d,i.status==="sold"?"#a3241a":i.status==="available"?"#8a4a10":null);m.position.set(0,-r/2-.075,.012),e.add(m),f.plaque=m,o.userData.p=f,s.userData.p=f,ci.push(f)});const mc=Array.from({length:6},()=>{const i=new Pm(16769712,14,6,.75,.5,1.5);return Yt.add(i),Yt.add(i.target),i});let gc=0;const p1=/(^|\.)tjm\.art$/.test(location.hostname);function Rr(i){const t=nt.position;ci.forEach(a=>{if(a.dist=a.group.position.distanceTo(t),a.dist-a.w/2<5.5&&!a.hiReq){a.hiReq=1;const r=p1?a.data.hi:a.data.hiLocal&&to==="/"?to+"art-hi/"+a.data.slug+".webp":null;r&&oh.load(r,s=>{Ho(s),a.mesh.material.map=s,a.mesh.material.needsUpdate=!0,a.hi=1},void 0,()=>{})}a.state==="wall"&&(a.group.visible=a.dist<24||!!(window.game&&window.game.freeze))});const e=ci.filter(a=>a.state==="wall").sort((a,r)=>a.dist-r.dist).slice(0,mc.length);mc.forEach((a,r)=>{const s=e[r];if(!s){a.intensity=0;return}const o=new P(s.data.ix,0,s.data.iz);a.intensity=14,a.position.copy(s.group.position).addScaledVector(o,1.1),a.position.y+=1.4,a.target.position.copy(s.group.position)}),dc.forEach(a=>a.d=a.pos.distanceTo(t));const n=[...dc].sort((a,r)=>a.d-r.d).slice(0,eo.length);eo.forEach((a,r)=>{n[r]&&(a.position.copy(n[r].pos),a.userData.t=n[r])})}Rr();const Go=()=>ci.filter(i=>i.state==="wall"&&i.group.visible).flatMap(i=>[i.mesh,i.frame]),Ce=new Om(nt,document.body),zi=document.getElementById("start");zi.addEventListener("click",()=>{matchMedia("(pointer:coarse)").matches?zi.style.display="none":Ce.lock()});Ce.addEventListener("lock",()=>zi.style.display="none");Ce.addEventListener("unlock",()=>{window.__test||(zi.style.display="flex")});const qi={};addEventListener("keydown",i=>{qi[i.code]=!0,i.code==="Digit1"&&bn(0),i.code==="Digit2"&&bn(1),i.code==="KeyC"&&Pr(),i.code==="KeyE"&&mh()});addEventListener("keyup",i=>qi[i.code]=!1);addEventListener("wheel",i=>bn(ra^1));addEventListener("mousedown",i=>{Ce.isLocked&&i.button===0&&jo()});const aa={x:0,y:0};let ya=null,no=null;const Wo=document.getElementById("tmove");Wo.addEventListener("touchstart",i=>{no=i.changedTouches[0],i.preventDefault()},{passive:!1});Wo.addEventListener("touchmove",i=>{const t=i.changedTouches[0];aa.x=(t.clientX-no.clientX)/60,aa.y=(t.clientY-no.clientY)/60,i.preventDefault()},{passive:!1});Wo.addEventListener("touchend",()=>{aa.x=aa.y=0});ki.addEventListener("touchstart",i=>{ya=i.changedTouches[0]},{passive:!0});ki.addEventListener("touchmove",i=>{const t=i.changedTouches[0];if(!ya)return;const e=new Pe(0,0,0,"YXZ").setFromQuaternion(nt.quaternion);e.y-=(t.clientX-ya.clientX)*.005,e.x=Math.max(-1.4,Math.min(1.4,e.x-(t.clientY-ya.clientY)*.005)),nt.quaternion.setFromEuler(e),ya=t},{passive:!0});document.getElementById("tfire").addEventListener("touchstart",i=>{i.preventDefault(),jo()});document.querySelectorAll("#hud .wpn").forEach(i=>{const t=e=>{e.preventDefault(),e.stopPropagation(),bn(+i.dataset.w)};i.addEventListener("touchstart",t,{passive:!1}),i.addEventListener("mousedown",e=>e.stopPropagation()),i.addEventListener("click",t)});const lh=document.getElementById("cartcell");["click","touchstart"].forEach(i=>lh.addEventListener(i,t=>{t.preventDefault(),t.stopPropagation(),Pr()},{passive:!1}));lh.addEventListener("mousedown",i=>i.stopPropagation());const m1=matchMedia("(pointer:coarse)").matches,g1=matchMedia("(display-mode: fullscreen), (display-mode: standalone)").matches||navigator.standalone;function ch(){if(!m1||g1)return;const i=document.documentElement,t=i.requestFullscreen||i.webkitRequestFullscreen||i.webkitRequestFullScreen||i.msRequestFullscreen;if(t&&!(document.fullscreenElement||document.webkitFullscreenElement))try{const e=t.call(i,{navigationUI:"hide"});e&&e.then?e.then(vc,()=>{}):vc()}catch{}else if(!t){window.scrollTo(0,1);try{if(!localStorage.getItem("tjmIosHint")){localStorage.setItem("tjmIosHint","1");const e=document.getElementById("iosHint");e.hidden=!1,e.querySelector("button").onclick=()=>e.hidden=!0,setTimeout(()=>e.hidden=!0,9e3)}}catch{}}}function vc(){try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch{}}addEventListener("touchend",ch,{once:!1,passive:!0});zi.addEventListener("click",ch);let ra=0,Zn=0;const Ve=new P,Cr=new wr,v1=new Te(60,Do/Io,.01,10);Cr.add(new $c(16769216,3153944,1.2));const hh=new Im(16756848,2);hh.position.set(1,2,1);Cr.add(hh);const Jn=i=>new li({color:i,flatShading:!0}),La=[new We,new We];{const i=La[0];jt(.12,.12,.42,oe.metal(1,1),0,0,0,i);const t=new Tt(new wn(.035,.045,.32,6),Jn(3815998));t.rotation.x=Math.PI/2,t.position.set(0,.02,-.33),i.add(t);const e=new Tt(new $i(.085,0),Jn(16742912));e.position.set(0,.12,.02),i.add(e),jt(.05,.14,.06,Jn(4861976),0,-.12,.12,i)}{const i=La[1];jt(.06,.06,.5,oe.wood(1,1),0,0,0,i),jt(.16,.08,.08,Jn(11569722),0,0,-.27,i);for(const t of[-1,1]){const e=jt(.025,.025,.16,Jn(6974064),t*.07,0,-.36,i);e.rotation.y=t*.35}jt(.07,.05,.005,Jn(14729312),.05,.06,-.2,i)}La.forEach(i=>{i.scale.setScalar(.7),i.rotation.y=.1,Cr.add(i)});Ge.autoClear=!1;function dh(){La.forEach((e,n)=>e.visible=n===ra);const i=La[ra],t=Math.sin(performance.now()/160)*Math.min(1,Ve.length())*.015;i.position.set(.24+t,-.24-Math.abs(t)+Zn*.03,-.62+Zn*.08),i.rotation.x=Zn*.25}function bn(i){ra=i,document.querySelectorAll("#hud .wpn").forEach(t=>t.classList.toggle("on",+t.dataset.w===i)),dh()}bn(0);const fh=document.getElementById("msg");let uh=0;function Ae(i,t=2.5){fh.textContent=i,uh=t}const gi=new Um;function _1(){return nt.updateMatrixWorld(),gi.setFromCamera(new Nt(0,0),nt),gi.intersectObjects(Go(),!1)[0]}function jo(){Ee&&Ee.locked||pi||(Zn=1,ra===0?b1():S1())}const gr=[],Ei=[],x1=new So(.08,6,4),w1=new de({color:16742912});function b1(){const i=new P;nt.getWorldDirection(i);const t=new Tt(x1,w1);t.position.copy(nt.position).addScaledVector(i,.3).y-=.03,Yt.add(t),gr.push({m:t,v:i.multiplyScalar(14),life:3})}let ph=0,Ee=null;const Sa=new Set;function M1(i){const t=i.object.userData.p,e=new de({map:$m(),transparent:!0,depthWrite:!1}),n=new Tt(new fe(.9,.9),e),a=t.group.worldToLocal(i.point.clone());n.position.set(a.x,a.y,.02),n.rotation.z=Math.random()*6,t.group.add(n);const r=[],s=2+(Math.random()<.5?1:0);for(let l=0;l<s;l++){const c=Tr(Math.random()),h=["L","R","T"][l],d=t.w/2,f=t.h/2,m=h==="L"?new P(-d+.05,a.y,.05):h==="R"?new P(d-.05,a.y,.05):new P(a.x,f-.05,.05),g=h==="L"?new P(-d-.2,a.y,.35):h==="R"?new P(d+.2,a.y,.35):new P(a.x,f+.2,.35);Object.assign(c.userData,{a:l*2.1,base:a.clone(),hide:m,peek:g}),c.position.copy(m),c.visible=!1,t.group.add(c),r.push(c)}Sa.add(t.data.slug),ph++,document.getElementById("hitn").textContent=Sa.size%3;const o={d:n,elves:r,group:t.group,t:0,dur:8};Sa.size>=3&&(Sa.clear(),document.getElementById("hitn").textContent=0,o.swarm=!0,o.dur=1e9,r.forEach(l=>l.visible=!1)),Ei.push(o),Ae(o.swarm?"SPLAT! ...SOMETHING STIRS BEHIND THE WALLS":"SPLAT!")}const vn=[],ao=document.getElementById("cart"),y1=document.getElementById("cartlist");let _c=0;function Pr(i=4e3){ao.classList.add("open"),clearTimeout(_c),_c=setTimeout(()=>ao.classList.remove("open"),i)}function Xo(){document.getElementById("cartn").textContent=vn.length,y1.innerHTML=vn.length?vn.map(i=>`<li><a href="${i.url}" target="_blank" rel="noopener">${i.title}</a> ${i.price} · <i>In cart</i></li>`).join(""):"<li>empty</li>"}const vr=[];function S1(){const i=_1();if(!i)return Ae("AIM AT A PAINTING");const t=i.object.userData.p;if(t.data.status==="sold")return Ae("SOLD: "+t.data.title);if(t.data.status!=="available")return Ae("BY INQUIRY ONLY: "+t.data.title);t.state="lifting",vr.push({p:t,t:0,from:t.group.position.clone(),rot:t.group.rotation.y}),vn.push(t.data),Xo(),Pr(),Ae("ADDED TO CART: "+t.data.title)}const E1=2.2;function mh(i){nt.updateMatrixWorld(),gi.setFromCamera(i||new Nt(0,0),nt),gi.far=E1;const t=gi.intersectObjects([...Go(),...Vo],!1)[0];if(gi.far=1/0,!t)return i||Ae("GET CLOSER TO A PAINTING, THEN PRESS E"),!1;const e=t.object.userData.p?t.object.userData.p.data:t.object.userData.q;return T1(e),!0}function T1(i){nh(),Ae("OPENING "+i.title.toUpperCase()),Ce.isLocked&&Ce.unlock();const t=new URL(i.url);t.searchParams.set("from","play"),location.assign(t.href)}let Ea=null;ki.addEventListener("touchstart",i=>{const t=i.changedTouches[0];Ea={x:t.clientX,y:t.clientY,t:performance.now()}},{passive:!0});ki.addEventListener("touchend",i=>{const t=i.changedTouches[0];if(!Ea||Ee||pi||si||Math.hypot(t.clientX-Ea.x,t.clientY-Ea.y)>12||performance.now()-Ea.t>350)return;const e=ki.getBoundingClientRect();mh(new Nt((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1))},{passive:!0});const Xn=document.getElementById("goto");Xn.innerHTML='<option value="">Go to a painting…</option>'+Xe.map(i=>`<optgroup label="${fc(i.title)}">`+ci.filter(t=>t.room===i.id).map(t=>`<option value="${t.i}">${fc(t.data.title)}</option>`).join("")+"</optgroup>").join("");["click","mousedown","touchstart"].forEach(i=>Xn.addEventListener(i,t=>t.stopPropagation()));function gh(i){const t=ci[i];if(!t||t.state!=="wall")return;const e=new P(t.data.ix,0,t.data.iz),n=Math.max(1.8,Math.min(4,t.h*1.3+.8));nt.position.copy(t.group.position).addScaledVector(e,n),nt.position.y=Ke+Di(nt.position.x,nt.position.z),nt.lookAt(t.group.position.x,Math.min(t.group.position.y,Ke+.4),t.group.position.z);const a=new Pe(0,0,0,"YXZ").setFromQuaternion(nt.quaternion);a.z=0,nt.quaternion.setFromEuler(a),Ve.set(0,0,0),Rr(),Ae(t.data.title.toUpperCase())}Xn.addEventListener("change",()=>{Xn.value!==""&&(gh(+Xn.value),Xn.value="",matchMedia("(pointer:coarse)").matches?zi.style.display="none":Ce.lock())});new P;const Ti=(i,t,e)=>new P(i,t,e),hn=(i,t,e)=>i.clone().lerp(t,Math.min(1,Math.max(0,e))),Xi=i=>(i=Math.min(1,Math.max(0,i)),i*i*(3-2*i));function A1(){Ei.forEach(a=>a.inSwarm=!0),Ce.enabled=!1,Ve.set(0,0,0);const i=[],t=sh(nt.position.x,nt.position.z);ci.filter(a=>a.state==="wall"&&a.room===t.id).sort((a,r)=>a.dist-r.dist).slice(0,8).forEach(a=>{a.group.visible=!0;for(let r=0;r<4;r++){const s=a.w/2,o=a.h/2,l=r%3,c=(Math.random()-.5)*a.h*.8,h=(Math.random()-.5)*a.w*.8,d=a.group.localToWorld(l===2?Ti(h,o-.05,.05):Ti(l?s-.05:-s+.05,c,.05)),f=a.group.localToWorld(l===2?Ti(h,o+.3,.45):Ti(l?s+.28:-s-.28,c,.45)),m=Tr(Math.random());m.position.copy(d),Yt.add(m);const g=Math.random()*Math.PI*2,w=.7+Math.random()*.7;i.push({s:m,home:d,peek:f,a:g,rad:w,dy:-.55-Math.random()*.5,ph:Math.random()*6,j:r})}});const n=t.id==="central"?Ti(Qi.x,0,Qi.z):Ti((t.minX+t.maxX)/2,0,(t.minZ+t.maxZ)/2);Ee={t:0,elves:i,locked:!0,from:nt.position.clone(),dest:n,landed:!1,shake:0},Ae("THE ELVES HAVE OPINIONS",6)}function R1(i){const t=Ee;t.t+=i;const e=t.t,n=new Pe(0,0,0,"YXZ").setFromQuaternion(nt.quaternion),a=Ke+Di(t.from.x,t.from.z)+Xi((e-2.2)/.8)*(1.5-Di(t.from.x,t.from.z)),r=Xi((e-3)/3),s=hn(Ti(t.from.x,0,t.from.z),t.dest,r);let o=a,l=0;if(e>2.2&&e<6&&(o+=Math.sin(e*7)*.12,l=Math.sin(e*3.3)*.12),e>=6){const d=e-6,f=Ke+Di(t.dest.x,t.dest.z);o=Math.max(f,3.2-4.9*d*d*1.4),o<=f&&!t.landed&&(t.landed=!0,t.shake=.45,Ae("*THUD*"))}t.landed&&(t.shake=Math.max(0,t.shake-i));const c=t.shake*.35;nt.position.set(s.x+(Math.random()-.5)*c,o-(t.landed&&t.shake>.3?.15:0)+(Math.random()-.5)*c,s.z+(Math.random()-.5)*c),e>2.2&&e<6&&(n.x+=(-.7-n.x)*Math.min(1,i*2)),e>6.4&&(n.x+=(0-n.x)*Math.min(1,i*4)),e>8.5&&(n.x=0),n.z=l,nt.quaternion.setFromEuler(n);const h=n.y;t.elves.forEach((d,f)=>{const m=Ti(Math.cos(d.a+h)*d.rad,d.dy+Math.sin(e*9+d.ph)*.08,Math.sin(d.a+h)*d.rad),g=nt.position.clone().add(m),w=Ti(nt.position.x+m.x*1.6,.35+Math.abs(Math.sin(e*8+d.ph))*.2,nt.position.z+m.z*1.6);let p;e<1?p=hn(d.home,d.peek,Xi(e-f%3*.1)):e<2.2?p=hn(d.peek,w,Xi((e-1)/1.2)):e<2.8?p=hn(w,g,Xi((e-2.2)/.6)):e<6?p=g:e<6.6?p=w:e<8.2?p=hn(w,d.peek,Xi((e-6.6)/1.6)):p=hn(d.peek,d.home,Xi((e-8.2)/.8)),e>=6&&e<6.6&&(d.s.userData.g=d.s.userData.g||p.clone()),d.s.position.copy(e>=6&&e<6.6?d.s.userData.g:p),e>=6.6&&e<8.2&&d.s.position.copy(hn(d.s.userData.g||w,d.peek,Xi((e-6.6)/1.6))),d.s.scale.setScalar(Math.max(.05,Math.min(1,e/.9,(9-e)/.8))),Ar(d.s,e<1?"peek":e<2.2?"walk":e<6?"carry":e<6.6?"idle":"retreat",e,nt,i)}),e>7.2&&t.locked&&(t.locked=!1,Ce.enabled=!0,Ae("CONTROL RESTORED. BEHAVE.")),e>9&&(t.elves.forEach(d=>Yt.remove(d.s)),Ee=null,Mn++,nt.position.y=Ke+Di(nt.position.x,nt.position.z),n.x=0,n.z=0,nt.quaternion.setFromEuler(n))}let us=performance.now(),Mn=0,qo=!1,pi=!1,vh=null;const Ai=qm({scene:Yt,camera:nt,renderer:Ge,makeElf:Tr,animateElf:Ar,elfUniforms:Ta,say:Ae,canvas:ki,floorY:Di});function ro(){qo=!1,pi=!0,Ce.enabled=!1,Ai.start(),document.body.classList.add("chaos")}new URLSearchParams(location.search).get("chaos")==="1"&&setTimeout(()=>{window.__test=1,zi.style.display="none",nt.position.set(0,Ke+Di(0,0),0),ro()},800);const _h=matchMedia("(orientation: portrait) and (pointer: coarse)");function xh(){if(requestAnimationFrame(xh),_h.matches){us=performance.now();return}const i=performance.now(),t=Math.min(.05,(i-us)/1e3);if(us=i,qo&&!Ee&&ro(),pi){const n=Ai.update(t,i);n&&n.finished&&(pi=!1,Ce.enabled=!0,document.body.classList.remove("chaos"),vh={before:n.savedPos.toArray(),after:nt.position.toArray()}),Ta.uTime.value=i/1e3,lc(i),Ai.state&&Ai.state.inWorld&&!Ai.state.back||Ge.clear(),Ai.render()||Ge.render(Yt,nt);return}if(si&&o1(t),!(window.game&&window.game.freeze)){if(!si)if(Ee)R1(t);else{Ve.x-=Ve.x*10*t,Ve.z-=Ve.z*10*t;const n=(qi.KeyW||qi.ArrowUp?1:0)-(qi.KeyS||qi.ArrowDown?1:0)-aa.y,a=(qi.KeyD?1:0)-(qi.KeyA?1:0)+aa.x;Ve.z+=Math.max(-1,Math.min(1,n))*60*t,Ve.x+=Math.max(-1,Math.min(1,a))*60*t;const r=nt.position.clone();Ce.moveRight(Ve.x*t),Ce.moveForward(Ve.z*t),mr(nt.position.x,nt.position.z)||(mr(nt.position.x,r.z)?nt.position.z=r.z:mr(r.x,nt.position.z)?nt.position.x=r.x:(nt.position.x=r.x,nt.position.z=r.z));for(const[s,o]of th){const l=nt.position.x-s,c=nt.position.z-o,h=Math.hypot(l,c);h<.75&&h>0&&(nt.position.x=s+l/h*.75,nt.position.z=o+c/h*.75)}{const s=nt.position.x-qt.pos.x,o=nt.position.z-qt.pos.z,l=Math.abs(s*qt.n.z-o*qt.n.x),c=s*qt.n.x+o*qt.n.z;l<.7&&c<.62&&!pi&&s1()}{const s=nt.position.x-Jt.pos.x,o=nt.position.z-Jt.pos.z,l=Math.abs(s*Jt.n.z-o*Jt.n.x),c=s*Jt.n.x+o*Jt.n.z;l<.7&&c<.62&&!pi&&r1()}si||(nt.position.y=Ke+Di(nt.position.x,nt.position.z)+Math.abs(Math.sin(i/120))*Math.min(.06,Ve.length()*.02))}}for(let n=gr.length-1;n>=0;n--){const a=gr[n];a.v.y-=.8*t,a.life-=t;const r=a.v.clone().multiplyScalar(t);gi.set(a.m.position,r.clone().normalize()),gi.far=r.length();const s=gi.intersectObjects(Go(),!1)[0];a.m.position.add(r);const o=a.m.position.x,l=a.m.position.z,h=![...Xe,...No].some(d=>o>d.minX-.6&&o<d.maxX+.6&&l>d.minZ-.6&&l<d.maxZ+.6)||a.m.position.y<0||a.m.position.y>Ne;s&&M1(s),(s||h||a.life<0)&&(Yt.remove(a.m),gr.splice(n,1))}gi.far=1/0;for(let n=Ei.length-1;n>=0;n--){const a=Ei[n];a.t+=t;const r=a.t/a.dur;if(a.swarm&&a.t>=3&&!Ee&&!pi)if(Mn>=2){Mn=0,Ei.forEach(l=>{l.group.remove(l.d,...l.elves)}),Ei.length=0,ro();break}else A1();if(a.swarm||a.inSwarm){if(a.elves.forEach(l=>l.visible=!1),a.inSwarm){const l=Math.min(1,Math.max(0,(Ee?Ee.t:99)-2.5)/3);a.d.material.opacity=1-l,l>=1&&(a.group.remove(a.d,...a.elves),Ei.splice(n,1))}continue}a.said;const s=a.t,o=Math.min(1,Math.max(0,(s-4.4)/2.2));a.d.material.opacity=1-o,a.d.scale.setScalar(1-o*.4),s>3&&!a.said&&(a.said=1,Ae("DMT ELVES DEPLOYED: SCRUBBING...")),a.elves.forEach((l,c)=>{const h=l.userData;l.visible=s>3;const d=h.base.clone().add(new P(Math.cos(h.a+s*1.5)*.28,Math.sin(h.a+s*1.1)*.12-.15,.3)),f=(m,g,w)=>m.clone().lerp(g,Math.min(1,Math.max(0,w)));s<3.8?l.position.copy(f(h.hide,h.peek,(s-3)/.8)):s<4.4?l.position.copy(f(h.peek,d,(s-3.8)/.6)).setZ(.25):s<6.6?l.position.copy(d):s<7.2?l.position.copy(f(d,h.peek,(s-6.6)/.6)).setZ(.25):l.position.copy(f(h.peek,h.hide,(s-7.2)/.8)),l.scale.setScalar(Math.max(.05,Math.min(1,(s-3)/.8,(8-s)/.8))),Ar(l,s<3.8?"peek":s<4.4?"walk":s<6.6?"scrub":"retreat",s,nt,t)}),r>=1&&(a.group.remove(a.d,...a.elves),Ei.splice(n,1))}for(let n=vr.length-1;n>=0;n--){const a=vr[n];a.t+=t;const r=a.p.group,s=Math.min(1,a.t/2.2);if(r.position.copy(a.from),r.rotation.y=a.rot,r.translateZ(s*1.2),r.position.y=a.from.y+Math.sin(s*Math.PI)*.4+s*s*1.5,r.rotation.y=a.rot+s*Math.PI*2,r.scale.setScalar(1-s*.85),s>=1){r.visible=!1,a.p.state="cart",vr.splice(n,1);const o=new Tt(new fe(1.8,.28),new de({map:Ro("IN CART · "+a.p.data.title)}));o.position.copy(a.from),o.rotation.y=a.rot,o.translateZ(.02),Yt.add(o)}}Zn=Math.max(0,Zn-t*5),dh(),(uh-=t)<0&&(fh.textContent=""),(gc-=t)<0&&(gc=.25,Rr()),eo.forEach(n=>{const a=n.userData.t;if(!a)return;const r=.75+.25*Math.sin(i/70+a.ph)*Math.sin(i/130+a.ph*2);n.intensity=6*r,a.flame.scale.y=.8+r*.5}),Qc.offset.x=i/8e3%1,Bo.uniforms.uTime.value=i/1e3,Fa.uniforms.uTime.value=i/1e3+7,Jt.light.intensity=5+Math.sin(i/300),qt.light.intensity=5+1.5*Math.sin(i/90)*Math.sin(i/37),Fo.offset.set(i/2e4%1,i/31e3%1),Oo.offset.set(-(i/26e3)%1,i/17e3%1),eh.forEach((n,a)=>n.intensity=9*(.85+.15*Math.sin(i/600+a*2))),Ta.uTime.value=i/1e3,lc(i);const e=Ee?Math.min(1,Ee.t/1.5)*(Ee.t<8?1:Math.max(0,9-Ee.t)):0;Ta.uPulse.value=e,ki.style.filter=e>.01?`saturate(${1+e*(.6+.4*Math.sin(i/180))}) hue-rotate(${e*25*Math.sin(i/400)}deg) drop-shadow(${2*e}px 0 rgba(255,0,90,.45)) drop-shadow(${-2*e}px 0 rgba(0,255,220,.45))`:"",ki.style.transform=e>.01?`scale(${1+.012*e*Math.sin(i/230)}) skewX(${e*.8*Math.sin(i/310)}deg)`:"",Ge.clear(),Ge.render(Yt,nt),Ge.clearDepth(),Ge.render(Cr,v1)}xh();Xo();window.game={ceilings:Uo,ROOMS:Xe,walkable:mr,roomAt:sh,get nPaintings(){return ci.length},get chaosActive(){return pi},get chaosT(){return Ai.state?Ai.state.t:-1},get lastChaos(){return vh},get swarmCount(){return Mn},setSwarmCount:i=>{Mn=i},renderer:Ge,camera:nt,makeElf:Tr,animateElf:Ar,scene:Yt,splats:Ei,get swarm(){return Ee},get hits(){return ph},get distinct(){return Sa.size},setWeapon:bn,fire:jo,paintings:ci,goTo:gh,get pausedPortrait(){return _h.matches},CHK:Jt,showCart:Pr,get cartOpen(){return ao.classList.contains("open")},windowSpots:zo,PIT:se,GATE:qt,get gateTrips(){return rh},get falling(){return!!si},LABELS:uc,boards:Vo,get shownLabels(){return uc.filter(i=>i.shown).length},lookAt:(i,t=3.5)=>{const e=ci[i].group,n=new P(0,0,1).applyQuaternion(e.quaternion);nt.position.copy(e.position).addScaledVector(n,t),nt.position.y=Ke+Di(nt.position.x,nt.position.z),nt.lookAt(e.position.x,e.position.y,e.position.z)},hideStart:()=>{window.__test=1,zi.style.display="none"}};if(new URLSearchParams(location.search).get("resume")==="1")try{const i=JSON.parse(sessionStorage.getItem("tjmPlayState")||"null");i&&(nt.position.fromArray(i.pos),nt.quaternion.fromArray(i.quat),bn(i.weapon||0),Mn=i.swarmCount||0,(i.cart||[]).forEach(t=>{const e=ci.find(n=>n.data.slug===t);e&&e.state==="wall"&&(e.state="cart",e.group.visible=!1,vn.push(e.data))}),Xo(),Rr(),zi.querySelector("p").textContent="TAP / CLICK TO RESUME",window.__resumed=i)}catch{}
