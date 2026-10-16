(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $s="170",th=0,No=1,eh=2,Jl=1,ih=2,pi=3,Gi=0,Ae=1,_i=2,Fi=0,Hn=1,fr=2,Fo=3,Oo=4,nh=5,sn=100,ah=101,rh=102,sh=103,oh=104,lh=200,ch=201,hh=202,dh=203,rs=204,ss=205,fh=206,uh=207,ph=208,mh=209,gh=210,_h=211,vh=212,xh=213,wh=214,os=0,ls=1,cs=2,Xn=3,hs=4,ds=5,fs=6,us=7,Zs=0,bh=1,Mh=2,Oi=0,yh=1,Sh=2,Eh=3,Th=4,Ah=5,Rh=6,Ch=7,Kl=300,qn=301,Yn=302,ps=303,ms=304,_r=306,ur=1e3,ni=1001,gs=1002,Pe=1003,Lh=1004,Ua=1005,ai=1006,Rr=1007,ln=1008,yi=1009,Ql=1010,tc=1011,ya=1012,Js=1013,dn=1014,vi=1015,Aa=1016,Ks=1017,Qs=1018,$n=1020,ec=35902,ic=1021,nc=1022,Je=1023,ac=1024,rc=1025,Gn=1026,Zn=1027,sc=1028,to=1029,oc=1030,eo=1031,io=1033,ir=33776,nr=33777,ar=33778,rr=33779,_s=35840,vs=35841,xs=35842,ws=35843,bs=36196,Ms=37492,ys=37496,Ss=37808,Es=37809,Ts=37810,As=37811,Rs=37812,Cs=37813,Ls=37814,Ps=37815,Ds=37816,Is=37817,Us=37818,ks=37819,zs=37820,Ns=37821,sr=36492,Fs=36494,Os=36495,lc=36283,Bs=36284,Hs=36285,Gs=36286,Ph=3200,Dh=3201,cc=0,Ih=1,Ui="",Ee="srgb",ia="srgb-linear",vr="linear",$t="srgb",vn=7680,Bo=519,Uh=512,kh=513,zh=514,hc=515,Nh=516,Fh=517,Oh=518,Bh=519,Ho=35044,Go="300 es",xi=2e3,pr=2001;class gn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const a=this._listeners[t];if(a!==void 0){const r=a.indexOf(e);r!==-1&&a.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const a=i.slice(0);for(let r=0,s=a.length;r<s;r++)a[r].call(this,t);t.target=null}}}const _e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Vo=1234567;const wa=Math.PI/180,Jn=180/Math.PI;function na(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(_e[n&255]+_e[n>>8&255]+_e[n>>16&255]+_e[n>>24&255]+"-"+_e[t&255]+_e[t>>8&255]+"-"+_e[t>>16&15|64]+_e[t>>24&255]+"-"+_e[e&63|128]+_e[e>>8&255]+"-"+_e[e>>16&255]+_e[e>>24&255]+_e[i&255]+_e[i>>8&255]+_e[i>>16&255]+_e[i>>24&255]).toLowerCase()}function Te(n,t,e){return Math.max(t,Math.min(e,n))}function no(n,t){return(n%t+t)%t}function Hh(n,t,e,i,a){return i+(n-t)*(a-i)/(e-t)}function Gh(n,t,e){return n!==t?(e-n)/(t-n):0}function ba(n,t,e){return(1-e)*n+e*t}function Vh(n,t,e,i){return ba(n,t,1-Math.exp(-e*i))}function Wh(n,t=1){return t-Math.abs(no(n,t*2)-t)}function jh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Xh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function qh(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Yh(n,t){return n+Math.random()*(t-n)}function $h(n){return n*(.5-Math.random())}function Zh(n){n!==void 0&&(Vo=n);let t=Vo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Jh(n){return n*wa}function Kh(n){return n*Jn}function Qh(n){return(n&n-1)===0&&n!==0}function td(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ed(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function id(n,t,e,i,a){const r=Math.cos,s=Math.sin,o=r(e/2),l=s(e/2),c=r((t+i)/2),h=s((t+i)/2),d=r((t-i)/2),u=s((t-i)/2),m=r((i-t)/2),g=s((i-t)/2);switch(a){case"XYX":n.set(o*h,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*m,o*c);break;case"YXY":n.set(l*m,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function zn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ye(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const nd={DEG2RAD:wa,RAD2DEG:Jn,generateUUID:na,clamp:Te,euclideanModulo:no,mapLinear:Hh,inverseLerp:Gh,lerp:ba,damp:Vh,pingpong:Wh,smoothstep:jh,smootherstep:Xh,randInt:qh,randFloat:Yh,randFloatSpread:$h,seededRandom:Zh,degToRad:Jh,radToDeg:Kh,isPowerOfTwo:Qh,ceilPowerOfTwo:td,floorPowerOfTwo:ed,setQuaternionFromProperEuler:id,normalize:ye,denormalize:zn};class Nt{constructor(t=0,e=0){Nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,a=t.elements;return this.x=a[0]*e+a[3]*i+a[6],this.y=a[1]*e+a[4]*i+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),a=Math.sin(e),r=this.x-t.x,s=this.y-t.y;return this.x=r*i-s*a+t.x,this.y=r*a+s*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Pt{constructor(t,e,i,a,r,s,o,l,c){Pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,a,r,s,o,l,c)}set(t,e,i,a,r,s,o,l,c){const h=this.elements;return h[0]=t,h[1]=a,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,a=e.elements,r=this.elements,s=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],m=i[5],g=i[8],w=a[0],p=a[3],f=a[6],S=a[1],y=a[4],b=a[7],k=a[2],A=a[5],T=a[8];return r[0]=s*w+o*S+l*k,r[3]=s*p+o*y+l*A,r[6]=s*f+o*b+l*T,r[1]=c*w+h*S+d*k,r[4]=c*p+h*y+d*A,r[7]=c*f+h*b+d*T,r[2]=u*w+m*S+g*k,r[5]=u*p+m*y+g*A,r[8]=u*f+m*b+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*s*h-e*o*c-i*r*h+i*o*l+a*r*c-a*s*l}invert(){const t=this.elements,e=t[0],i=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*s-o*c,u=o*l-h*r,m=c*r-s*l,g=e*d+i*u+a*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/g;return t[0]=d*w,t[1]=(a*c-h*i)*w,t[2]=(o*i-a*s)*w,t[3]=u*w,t[4]=(h*e-a*l)*w,t[5]=(a*r-o*e)*w,t[6]=m*w,t[7]=(i*l-c*e)*w,t[8]=(s*e-i*r)*w,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,a,r,s,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*s+c*o)+s+t,-a*c,a*l,-a*(-c*s+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Cr.makeScale(t,e)),this}rotate(t){return this.premultiply(Cr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Cr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let a=0;a<9;a++)if(e[a]!==i[a])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Cr=new Pt;function dc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Sa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ad(){const n=Sa("canvas");return n.style.display="block",n}const Wo={};function ga(n){n in Wo||(Wo[n]=!0,console.warn(n))}function rd(n,t,e){return new Promise(function(i,a){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:a();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function sd(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function od(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Wt={enabled:!0,workingColorSpace:ia,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===$t&&(n.r=Mi(n.r),n.g=Mi(n.g),n.b=Mi(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===$t&&(n.r=Vn(n.r),n.g=Vn(n.g),n.b=Vn(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ui?vr:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Mi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Vn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const jo=[.64,.33,.3,.6,.15,.06],Xo=[.2126,.7152,.0722],qo=[.3127,.329],Yo=new Pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$o=new Pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Wt.define({[ia]:{primaries:jo,whitePoint:qo,transfer:vr,toXYZ:Yo,fromXYZ:$o,luminanceCoefficients:Xo,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:jo,whitePoint:qo,transfer:$t,toXYZ:Yo,fromXYZ:$o,luminanceCoefficients:Xo,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}});let xn;class ld{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{xn===void 0&&(xn=Sa("canvas")),xn.width=t.width,xn.height=t.height;const i=xn.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=xn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Sa("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const a=i.getImageData(0,0,t.width,t.height),r=a.data;for(let s=0;s<r.length;s++)r[s]=Mi(r[s]/255)*255;return i.putImageData(a,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Mi(e[i]/255)*255):e[i]=Mi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let cd=0;class fc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=na(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?r.push(Lr(a[s].image)):r.push(Lr(a[s]))}else r=Lr(a);i.url=r}return e||(t.images[this.uuid]=i),i}}function Lr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ld.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let hd=0;class Me extends gn{constructor(t=Me.DEFAULT_IMAGE,e=Me.DEFAULT_MAPPING,i=ni,a=ni,r=ai,s=ln,o=Je,l=yi,c=Me.DEFAULT_ANISOTROPY,h=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=na(),this.name="",this.source=new fc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Nt(0,0),this.repeat=new Nt(1,1),this.center=new Nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Kl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ur:t.x=t.x-Math.floor(t.x);break;case ni:t.x=t.x<0?0:1;break;case gs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ur:t.y=t.y-Math.floor(t.y);break;case ni:t.y=t.y<0?0:1;break;case gs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Me.DEFAULT_IMAGE=null;Me.DEFAULT_MAPPING=Kl;Me.DEFAULT_ANISOTROPY=1;class Zt{constructor(t=0,e=0,i=0,a=1){Zt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,a){return this.x=t,this.y=e,this.z=i,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,a=this.z,r=this.w,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*a+s[12]*r,this.y=s[1]*e+s[5]*i+s[9]*a+s[13]*r,this.z=s[2]*e+s[6]*i+s[10]*a+s[14]*r,this.w=s[3]*e+s[7]*i+s[11]*a+s[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,a,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],m=l[5],g=l[9],w=l[2],p=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-w)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+w)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,b=(m+1)/2,k=(f+1)/2,A=(h+u)/4,T=(d+w)/4,C=(g+p)/4;return y>b&&y>k?y<.01?(i=0,a=.707106781,r=.707106781):(i=Math.sqrt(y),a=A/i,r=T/i):b>k?b<.01?(i=.707106781,a=0,r=.707106781):(a=Math.sqrt(b),i=A/a,r=C/a):k<.01?(i=.707106781,a=.707106781,r=0):(r=Math.sqrt(k),i=T/r,a=C/r),this.set(i,a,r,e),this}let S=Math.sqrt((p-g)*(p-g)+(d-w)*(d-w)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(d-w)/S,this.z=(u-h)/S,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class dd extends gn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Zt(0,0,t,e),this.scissorTest=!1,this.viewport=new Zt(0,0,t,e);const a={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Me(a,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const s=i.count;for(let o=0;o<s;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=t,this.textures[a].image.height=e,this.textures[a].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,a=t.textures.length;i<a;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new fc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends dd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class uc extends Me{constructor(t=null,e=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:a},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class fd extends Me{constructor(t=null,e=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:a},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ra{constructor(t=0,e=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=a}static slerpFlat(t,e,i,a,r,s,o){let l=i[a+0],c=i[a+1],h=i[a+2],d=i[a+3];const u=r[s+0],m=r[s+1],g=r[s+2],w=r[s+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=m,t[e+2]=g,t[e+3]=w;return}if(d!==w||l!==u||c!==m||h!==g){let p=1-o;const f=l*u+c*m+h*g+d*w,S=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){const k=Math.sqrt(y),A=Math.atan2(k,f*S);p=Math.sin(p*A)/k,o=Math.sin(o*A)/k}const b=o*S;if(l=l*p+u*b,c=c*p+m*b,h=h*p+g*b,d=d*p+w*b,p===1-o){const k=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=k,c*=k,h*=k,d*=k}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,a,r,s){const o=i[a],l=i[a+1],c=i[a+2],h=i[a+3],d=r[s],u=r[s+1],m=r[s+2],g=r[s+3];return t[e]=o*g+h*d+l*m-c*u,t[e+1]=l*g+h*u+c*d-o*m,t[e+2]=c*g+h*m+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,a){return this._x=t,this._y=e,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,a=t._y,r=t._z,s=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(a/2),d=o(r/2),u=l(i/2),m=l(a/2),g=l(r/2);switch(s){case"XYZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"YXZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"ZXY":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"ZYX":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"YZX":this._x=u*h*d+c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d-u*m*g;break;case"XZY":this._x=u*h*d-c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d+u*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],a=e[4],r=e[8],s=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+o+d;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(s-a)*m}else if(i>o&&i>d){const m=2*Math.sqrt(1+i-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(a+s)/m,this._z=(r+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-i-d);this._w=(r-c)/m,this._x=(a+s)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-i-o);this._w=(s-a)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const a=Math.min(1,e/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,a=t._y,r=t._z,s=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+s*o+a*c-r*l,this._y=a*h+s*l+r*o-i*c,this._z=r*h+s*c+i*l-a*o,this._w=s*h-i*o-a*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,a=this._y,r=this._z,s=this._w;let o=s*t._w+i*t._x+a*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=s,this._x=i,this._y=a,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*s+e*this._w,this._x=m*i+e*this._x,this._y=m*a+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=s*d+this._w*u,this._x=i*d+this._x*u,this._y=a*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(a*Math.sin(t),a*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,i=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,a=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*a,this.y=r[1]*e+r[4]*i+r[7]*a,this.z=r[2]*e+r[5]*i+r[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,a=this.z,r=t.elements,s=1/(r[3]*e+r[7]*i+r[11]*a+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*a+r[12])*s,this.y=(r[1]*e+r[5]*i+r[9]*a+r[13])*s,this.z=(r[2]*e+r[6]*i+r[10]*a+r[14])*s,this}applyQuaternion(t){const e=this.x,i=this.y,a=this.z,r=t.x,s=t.y,o=t.z,l=t.w,c=2*(s*a-o*i),h=2*(o*e-r*a),d=2*(r*i-s*e);return this.x=e+l*c+s*d-o*h,this.y=i+l*h+o*c-r*d,this.z=a+l*d+r*h-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,a=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*a,this.y=r[1]*e+r[5]*i+r[9]*a,this.z=r[2]*e+r[6]*i+r[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,a=t.y,r=t.z,s=e.x,o=e.y,l=e.z;return this.x=a*l-r*o,this.y=r*s-i*l,this.z=i*o-a*s,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Pr.copy(this).projectOnVector(t),this.sub(Pr)}reflect(t){return this.sub(Pr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,a=this.z-t.z;return e*e+i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const a=Math.sin(e)*t;return this.x=a*Math.sin(i),this.y=Math.cos(e)*t,this.z=a*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=a,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pr=new L,Zo=new Ra;class Ca{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Xe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Xe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Xe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let s=0,o=r.count;s<o;s++)t.isMesh===!0?t.getVertexPosition(s,Xe):Xe.fromBufferAttribute(r,s),Xe.applyMatrix4(t.matrixWorld),this.expandByPoint(Xe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ka.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ka.copy(i.boundingBox)),ka.applyMatrix4(t.matrixWorld),this.union(ka)}const a=t.children;for(let r=0,s=a.length;r<s;r++)this.expandByObject(a[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Xe),Xe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(la),za.subVectors(this.max,la),wn.subVectors(t.a,la),bn.subVectors(t.b,la),Mn.subVectors(t.c,la),Ti.subVectors(bn,wn),Ai.subVectors(Mn,bn),$i.subVectors(wn,Mn);let e=[0,-Ti.z,Ti.y,0,-Ai.z,Ai.y,0,-$i.z,$i.y,Ti.z,0,-Ti.x,Ai.z,0,-Ai.x,$i.z,0,-$i.x,-Ti.y,Ti.x,0,-Ai.y,Ai.x,0,-$i.y,$i.x,0];return!Dr(e,wn,bn,Mn,za)||(e=[1,0,0,0,1,0,0,0,1],!Dr(e,wn,bn,Mn,za))?!1:(Na.crossVectors(Ti,Ai),e=[Na.x,Na.y,Na.z],Dr(e,wn,bn,Mn,za))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Xe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Xe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ci=[new L,new L,new L,new L,new L,new L,new L,new L],Xe=new L,ka=new Ca,wn=new L,bn=new L,Mn=new L,Ti=new L,Ai=new L,$i=new L,la=new L,za=new L,Na=new L,Zi=new L;function Dr(n,t,e,i,a){for(let r=0,s=n.length-3;r<=s;r+=3){Zi.fromArray(n,r);const o=a.x*Math.abs(Zi.x)+a.y*Math.abs(Zi.y)+a.z*Math.abs(Zi.z),l=t.dot(Zi),c=e.dot(Zi),h=i.dot(Zi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const ud=new Ca,ca=new L,Ir=new L;class ao{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):ud.setFromPoints(t).getCenter(i);let a=0;for(let r=0,s=t.length;r<s;r++)a=Math.max(a,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ca.subVectors(t,this.center);const e=ca.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),a=(i-this.radius)*.5;this.center.addScaledVector(ca,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ir.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ca.copy(t.center).add(Ir)),this.expandByPoint(ca.copy(t.center).sub(Ir))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const hi=new L,Ur=new L,Fa=new L,Ri=new L,kr=new L,Oa=new L,zr=new L;class pc{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,hi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=hi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(hi.copy(this.origin).addScaledVector(this.direction,e),hi.distanceToSquared(t))}distanceSqToSegment(t,e,i,a){Ur.copy(t).add(e).multiplyScalar(.5),Fa.copy(e).sub(t).normalize(),Ri.copy(this.origin).sub(Ur);const r=t.distanceTo(e)*.5,s=-this.direction.dot(Fa),o=Ri.dot(this.direction),l=-Ri.dot(Fa),c=Ri.lengthSq(),h=Math.abs(1-s*s);let d,u,m,g;if(h>0)if(d=s*l-o,u=s*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const w=1/h;d*=w,u*=w,m=d*(d+s*u+2*o)+u*(s*d+u+2*l)+c}else u=r,d=Math.max(0,-(s*u+o)),m=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(s*u+o)),m=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-s*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),m=u*(u+2*l)+c):(d=Math.max(0,-(s*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+u*(u+2*l)+c);else u=s>0?-r:r,d=Math.max(0,-(s*u+o)),m=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(Ur).addScaledVector(Fa,u),m}intersectSphere(t,e){hi.subVectors(t.center,this.origin);const i=hi.dot(this.direction),a=hi.dot(hi)-i*i,r=t.radius*t.radius;if(a>r)return null;const s=Math.sqrt(r-a),o=i-s,l=i+s;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,a,r,s,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,a=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,a=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,s=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,s=(t.min.y-u.y)*h),i>s||r>a||((r>i||isNaN(i))&&(i=r),(s<a||isNaN(a))&&(a=s),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,e)}intersectsBox(t){return this.intersectBox(t,hi)!==null}intersectTriangle(t,e,i,a,r){kr.subVectors(e,t),Oa.subVectors(i,t),zr.crossVectors(kr,Oa);let s=this.direction.dot(zr),o;if(s>0){if(a)return null;o=1}else if(s<0)o=-1,s=-s;else return null;Ri.subVectors(this.origin,t);const l=o*this.direction.dot(Oa.crossVectors(Ri,Oa));if(l<0)return null;const c=o*this.direction.dot(kr.cross(Ri));if(c<0||l+c>s)return null;const h=-o*Ri.dot(zr);return h<0?null:this.at(h/s,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,i,a,r,s,o,l,c,h,d,u,m,g,w,p){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,a,r,s,o,l,c,h,d,u,m,g,w,p)}set(t,e,i,a,r,s,o,l,c,h,d,u,m,g,w,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=a,f[1]=r,f[5]=s,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=m,f[7]=g,f[11]=w,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,a=1/yn.setFromMatrixColumn(t,0).length(),r=1/yn.setFromMatrixColumn(t,1).length(),s=1/yn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*a,e[1]=i[1]*a,e[2]=i[2]*a,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*s,e[9]=i[9]*s,e[10]=i[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,a=t.y,r=t.z,s=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=s*h,m=s*d,g=o*h,w=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=u-w*c,e[9]=-o*l,e[2]=w-u*c,e[6]=g+m*c,e[10]=s*l}else if(t.order==="YXZ"){const u=l*h,m=l*d,g=c*h,w=c*d;e[0]=u+w*o,e[4]=g*o-m,e[8]=s*c,e[1]=s*d,e[5]=s*h,e[9]=-o,e[2]=m*o-g,e[6]=w+u*o,e[10]=s*l}else if(t.order==="ZXY"){const u=l*h,m=l*d,g=c*h,w=c*d;e[0]=u-w*o,e[4]=-s*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=s*h,e[9]=w-u*o,e[2]=-s*c,e[6]=o,e[10]=s*l}else if(t.order==="ZYX"){const u=s*h,m=s*d,g=o*h,w=o*d;e[0]=l*h,e[4]=g*c-m,e[8]=u*c+w,e[1]=l*d,e[5]=w*c+u,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=s*l}else if(t.order==="YZX"){const u=s*l,m=s*c,g=o*l,w=o*c;e[0]=l*h,e[4]=w-u*d,e[8]=g*d+m,e[1]=d,e[5]=s*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*d+g,e[10]=u-w*d}else if(t.order==="XZY"){const u=s*l,m=s*c,g=o*l,w=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+w,e[5]=s*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*h,e[10]=w*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(pd,t,md)}lookAt(t,e,i){const a=this.elements;return Ie.subVectors(t,e),Ie.lengthSq()===0&&(Ie.z=1),Ie.normalize(),Ci.crossVectors(i,Ie),Ci.lengthSq()===0&&(Math.abs(i.z)===1?Ie.x+=1e-4:Ie.z+=1e-4,Ie.normalize(),Ci.crossVectors(i,Ie)),Ci.normalize(),Ba.crossVectors(Ie,Ci),a[0]=Ci.x,a[4]=Ba.x,a[8]=Ie.x,a[1]=Ci.y,a[5]=Ba.y,a[9]=Ie.y,a[2]=Ci.z,a[6]=Ba.z,a[10]=Ie.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,a=e.elements,r=this.elements,s=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],m=i[13],g=i[2],w=i[6],p=i[10],f=i[14],S=i[3],y=i[7],b=i[11],k=i[15],A=a[0],T=a[4],C=a[8],M=a[12],v=a[1],R=a[5],V=a[9],B=a[13],N=a[2],j=a[6],F=a[10],W=a[14],H=a[3],K=a[7],Q=a[11],at=a[15];return r[0]=s*A+o*v+l*N+c*H,r[4]=s*T+o*R+l*j+c*K,r[8]=s*C+o*V+l*F+c*Q,r[12]=s*M+o*B+l*W+c*at,r[1]=h*A+d*v+u*N+m*H,r[5]=h*T+d*R+u*j+m*K,r[9]=h*C+d*V+u*F+m*Q,r[13]=h*M+d*B+u*W+m*at,r[2]=g*A+w*v+p*N+f*H,r[6]=g*T+w*R+p*j+f*K,r[10]=g*C+w*V+p*F+f*Q,r[14]=g*M+w*B+p*W+f*at,r[3]=S*A+y*v+b*N+k*H,r[7]=S*T+y*R+b*j+k*K,r[11]=S*C+y*V+b*F+k*Q,r[15]=S*M+y*B+b*W+k*at,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],a=t[8],r=t[12],s=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],m=t[14],g=t[3],w=t[7],p=t[11],f=t[15];return g*(+r*l*d-a*c*d-r*o*u+i*c*u+a*o*m-i*l*m)+w*(+e*l*m-e*c*u+r*s*u-a*s*m+a*c*h-r*l*h)+p*(+e*c*d-e*o*m-r*s*d+i*s*m+r*o*h-i*c*h)+f*(-a*o*h-e*l*d+e*o*u+a*s*d-i*s*u+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=e,a[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],m=t[11],g=t[12],w=t[13],p=t[14],f=t[15],S=d*p*c-w*u*c+w*l*m-o*p*m-d*l*f+o*u*f,y=g*u*c-h*p*c-g*l*m+s*p*m+h*l*f-s*u*f,b=h*w*c-g*d*c+g*o*m-s*w*m-h*o*f+s*d*f,k=g*d*l-h*w*l-g*o*u+s*w*u+h*o*p-s*d*p,A=e*S+i*y+a*b+r*k;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return t[0]=S*T,t[1]=(w*u*r-d*p*r-w*a*m+i*p*m+d*a*f-i*u*f)*T,t[2]=(o*p*r-w*l*r+w*a*c-i*p*c-o*a*f+i*l*f)*T,t[3]=(d*l*r-o*u*r-d*a*c+i*u*c+o*a*m-i*l*m)*T,t[4]=y*T,t[5]=(h*p*r-g*u*r+g*a*m-e*p*m-h*a*f+e*u*f)*T,t[6]=(g*l*r-s*p*r-g*a*c+e*p*c+s*a*f-e*l*f)*T,t[7]=(s*u*r-h*l*r+h*a*c-e*u*c-s*a*m+e*l*m)*T,t[8]=b*T,t[9]=(g*d*r-h*w*r-g*i*m+e*w*m+h*i*f-e*d*f)*T,t[10]=(s*w*r-g*o*r+g*i*c-e*w*c-s*i*f+e*o*f)*T,t[11]=(h*o*r-s*d*r-h*i*c+e*d*c+s*i*m-e*o*m)*T,t[12]=k*T,t[13]=(h*w*a-g*d*a+g*i*u-e*w*u-h*i*p+e*d*p)*T,t[14]=(g*o*a-s*w*a-g*i*l+e*w*l+s*i*p-e*o*p)*T,t[15]=(s*d*a-h*o*a+h*i*l-e*d*l-s*i*u+e*o*u)*T,this}scale(t){const e=this.elements,i=t.x,a=t.y,r=t.z;return e[0]*=i,e[4]*=a,e[8]*=r,e[1]*=i,e[5]*=a,e[9]*=r,e[2]*=i,e[6]*=a,e[10]*=r,e[3]*=i,e[7]*=a,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,a))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),a=Math.sin(e),r=1-i,s=t.x,o=t.y,l=t.z,c=r*s,h=r*o;return this.set(c*s+i,c*o-a*l,c*l+a*o,0,c*o+a*l,h*o+i,h*l-a*s,0,c*l-a*o,h*l+a*s,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,a,r,s){return this.set(1,i,r,0,t,1,s,0,e,a,1,0,0,0,0,1),this}compose(t,e,i){const a=this.elements,r=e._x,s=e._y,o=e._z,l=e._w,c=r+r,h=s+s,d=o+o,u=r*c,m=r*h,g=r*d,w=s*h,p=s*d,f=o*d,S=l*c,y=l*h,b=l*d,k=i.x,A=i.y,T=i.z;return a[0]=(1-(w+f))*k,a[1]=(m+b)*k,a[2]=(g-y)*k,a[3]=0,a[4]=(m-b)*A,a[5]=(1-(u+f))*A,a[6]=(p+S)*A,a[7]=0,a[8]=(g+y)*T,a[9]=(p-S)*T,a[10]=(1-(u+w))*T,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,e,i){const a=this.elements;let r=yn.set(a[0],a[1],a[2]).length();const s=yn.set(a[4],a[5],a[6]).length(),o=yn.set(a[8],a[9],a[10]).length();this.determinant()<0&&(r=-r),t.x=a[12],t.y=a[13],t.z=a[14],qe.copy(this);const c=1/r,h=1/s,d=1/o;return qe.elements[0]*=c,qe.elements[1]*=c,qe.elements[2]*=c,qe.elements[4]*=h,qe.elements[5]*=h,qe.elements[6]*=h,qe.elements[8]*=d,qe.elements[9]*=d,qe.elements[10]*=d,e.setFromRotationMatrix(qe),i.x=r,i.y=s,i.z=o,this}makePerspective(t,e,i,a,r,s,o=xi){const l=this.elements,c=2*r/(e-t),h=2*r/(i-a),d=(e+t)/(e-t),u=(i+a)/(i-a);let m,g;if(o===xi)m=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(o===pr)m=-s/(s-r),g=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,a,r,s,o=xi){const l=this.elements,c=1/(e-t),h=1/(i-a),d=1/(s-r),u=(e+t)*c,m=(i+a)*h;let g,w;if(o===xi)g=(s+r)*d,w=-2*d;else if(o===pr)g=r*d,w=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=w,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let a=0;a<16;a++)if(e[a]!==i[a])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const yn=new L,qe=new ne,pd=new L(0,0,0),md=new L(1,1,1),Ci=new L,Ba=new L,Ie=new L,Jo=new ne,Ko=new Ra;class Ce{constructor(t=0,e=0,i=0,a=Ce.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,a=this._order){return this._x=t,this._y=e,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const a=t.elements,r=a[0],s=a[4],o=a[8],l=a[1],c=a[5],h=a[9],d=a[2],u=a[6],m=a[10];switch(e){case"XYZ":this._y=Math.asin(Te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Te(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Te(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Jo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Jo,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ko.setFromEuler(this),this.setFromQuaternion(Ko,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ce.DEFAULT_ORDER="XYZ";class ro{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let gd=0;const Qo=new L,Sn=new Ra,di=new ne,Ha=new L,ha=new L,_d=new L,vd=new Ra,tl=new L(1,0,0),el=new L(0,1,0),il=new L(0,0,1),nl={type:"added"},xd={type:"removed"},En={type:"childadded",child:null},Nr={type:"childremoved",child:null};class ce extends gn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=na(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ce.DEFAULT_UP.clone();const t=new L,e=new Ce,i=new Ra,a=new L(1,1,1);function r(){i.setFromEuler(e,!1)}function s(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new ne},normalMatrix:{value:new Pt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ro,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Sn.setFromAxisAngle(t,e),this.quaternion.multiply(Sn),this}rotateOnWorldAxis(t,e){return Sn.setFromAxisAngle(t,e),this.quaternion.premultiply(Sn),this}rotateX(t){return this.rotateOnAxis(tl,t)}rotateY(t){return this.rotateOnAxis(el,t)}rotateZ(t){return this.rotateOnAxis(il,t)}translateOnAxis(t,e){return Qo.copy(t).applyQuaternion(this.quaternion),this.position.add(Qo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(tl,t)}translateY(t){return this.translateOnAxis(el,t)}translateZ(t){return this.translateOnAxis(il,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ha.copy(t):Ha.set(t,e,i);const a=this.parent;this.updateWorldMatrix(!0,!1),ha.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(ha,Ha,this.up):di.lookAt(Ha,ha,this.up),this.quaternion.setFromRotationMatrix(di),a&&(di.extractRotation(a.matrixWorld),Sn.setFromRotationMatrix(di),this.quaternion.premultiply(Sn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(nl),En.child=t,this.dispatchEvent(En),En.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xd),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),di.multiply(t.parent.matrixWorld)),t.applyMatrix4(di),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(nl),En.child=t,this.dispatchEvent(En),En.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,a=this.children.length;i<a;i++){const s=this.children[i].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ha,t,_d),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ha,vd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,a=e.length;i<a;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,a=e.length;i<a;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,a=e.length;i<a;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));a.material=o}else a.material=r(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(r(t.animations,l))}}if(e){const o=s(t.geometries),l=s(t.materials),c=s(t.textures),h=s(t.images),d=s(t.shapes),u=s(t.skeletons),m=s(t.animations),g=s(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=a,i;function s(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const a=t.children[i];this.add(a.clone())}return this}}ce.DEFAULT_UP=new L(0,1,0);ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ye=new L,fi=new L,Fr=new L,ui=new L,Tn=new L,An=new L,al=new L,Or=new L,Br=new L,Hr=new L,Gr=new Zt,Vr=new Zt,Wr=new Zt;class Ze{constructor(t=new L,e=new L,i=new L){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,a){a.subVectors(i,e),Ye.subVectors(t,e),a.cross(Ye);const r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(t,e,i,a,r){Ye.subVectors(a,e),fi.subVectors(i,e),Fr.subVectors(t,e);const s=Ye.dot(Ye),o=Ye.dot(fi),l=Ye.dot(Fr),c=fi.dot(fi),h=fi.dot(Fr),d=s*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,m=(c*l-o*h)*u,g=(s*h-o*l)*u;return r.set(1-m-g,g,m)}static containsPoint(t,e,i,a){return this.getBarycoord(t,e,i,a,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(t,e,i,a,r,s,o,l){return this.getBarycoord(t,e,i,a,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ui.x),l.addScaledVector(s,ui.y),l.addScaledVector(o,ui.z),l)}static getInterpolatedAttribute(t,e,i,a,r,s){return Gr.setScalar(0),Vr.setScalar(0),Wr.setScalar(0),Gr.fromBufferAttribute(t,e),Vr.fromBufferAttribute(t,i),Wr.fromBufferAttribute(t,a),s.setScalar(0),s.addScaledVector(Gr,r.x),s.addScaledVector(Vr,r.y),s.addScaledVector(Wr,r.z),s}static isFrontFacing(t,e,i,a){return Ye.subVectors(i,e),fi.subVectors(t,e),Ye.cross(fi).dot(a)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,a){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,e,i,a){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ye.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Ye.cross(fi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,a,r){return Ze.getInterpolation(t,this.a,this.b,this.c,e,i,a,r)}containsPoint(t){return Ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,a=this.b,r=this.c;let s,o;Tn.subVectors(a,i),An.subVectors(r,i),Or.subVectors(t,i);const l=Tn.dot(Or),c=An.dot(Or);if(l<=0&&c<=0)return e.copy(i);Br.subVectors(t,a);const h=Tn.dot(Br),d=An.dot(Br);if(h>=0&&d<=h)return e.copy(a);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return s=l/(l-h),e.copy(i).addScaledVector(Tn,s);Hr.subVectors(t,r);const m=Tn.dot(Hr),g=An.dot(Hr);if(g>=0&&m<=g)return e.copy(r);const w=m*c-l*g;if(w<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(An,o);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return al.subVectors(r,a),o=(d-h)/(d-h+(m-g)),e.copy(a).addScaledVector(al,o);const f=1/(p+w+u);return s=w*f,o=u*f,e.copy(i).addScaledVector(Tn,s).addScaledVector(An,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},Ga={h:0,s:0,l:0};function jr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ft{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,a=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Wt.toWorkingColorSpace(this,a),this}setHSL(t,e,i,a=Wt.workingColorSpace){if(t=no(t,1),e=Te(e,0,1),i=Te(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,s=2*i-r;this.r=jr(s,r,t+1/3),this.g=jr(s,r,t),this.b=jr(s,r,t-1/3)}return Wt.toWorkingColorSpace(this,a),this}setStyle(t,e=Ee){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=a[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){const i=mc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Mi(t.r),this.g=Mi(t.g),this.b=Mi(t.b),this}copyLinearToSRGB(t){return this.r=Vn(t.r),this.g=Vn(t.g),this.b=Vn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return Wt.fromWorkingColorSpace(ve.copy(this),t),Math.round(Te(ve.r*255,0,255))*65536+Math.round(Te(ve.g*255,0,255))*256+Math.round(Te(ve.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.fromWorkingColorSpace(ve.copy(this),e);const i=ve.r,a=ve.g,r=ve.b,s=Math.max(i,a,r),o=Math.min(i,a,r);let l,c;const h=(o+s)/2;if(o===s)l=0,c=0;else{const d=s-o;switch(c=h<=.5?d/(s+o):d/(2-s-o),s){case i:l=(a-r)/d+(a<r?6:0);break;case a:l=(r-i)/d+2;break;case r:l=(i-a)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Wt.workingColorSpace){return Wt.fromWorkingColorSpace(ve.copy(this),e),t.r=ve.r,t.g=ve.g,t.b=ve.b,t}getStyle(t=Ee){Wt.fromWorkingColorSpace(ve.copy(this),t);const e=ve.r,i=ve.g,a=ve.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(t,e,i){return this.getHSL(Li),this.setHSL(Li.h+t,Li.s+e,Li.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Li),t.getHSL(Ga);const i=ba(Li.h,Ga.h,e),a=ba(Li.s,Ga.s,e),r=ba(Li.l,Ga.l,e);return this.setHSL(i,a,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,a=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*a,this.g=r[1]*e+r[4]*i+r[7]*a,this.b=r[2]*e+r[5]*i+r[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ve=new Ft;Ft.NAMES=mc;let wd=0;class La extends gn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wd++}),this.uuid=na(),this.name="",this.blending=Hn,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rs,this.blendDst=ss,this.blendEquation=sn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=Xn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vn,this.stencilZFail=vn,this.stencilZPass=vn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const a=this[e];if(a===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Hn&&(i.blending=this.blending),this.side!==Gi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==rs&&(i.blendSrc=this.blendSrc),this.blendDst!==ss&&(i.blendDst=this.blendDst),this.blendEquation!==sn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Xn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==vn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==vn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(r){const s=[];for(const o in r){const l=r[o];delete l.metadata,s.push(l)}return s}if(e){const r=a(t.textures),s=a(t.images);r.length>0&&(i.textures=r),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const a=e.length;i=new Array(a);for(let r=0;r!==a;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class pe extends La{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ce,this.combine=Zs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const oe=new L,Va=new Nt;class Ne{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ho,this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[t+a]=e.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Va.fromBufferAttribute(this,e),Va.applyMatrix3(t),this.setXY(e,Va.x,Va.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)oe.fromBufferAttribute(this,e),oe.applyMatrix3(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)oe.fromBufferAttribute(this,e),oe.applyMatrix4(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)oe.fromBufferAttribute(this,e),oe.applyNormalMatrix(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)oe.fromBufferAttribute(this,e),oe.transformDirection(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=zn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ye(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=zn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=zn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=zn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=zn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),i=ye(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,a){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),i=ye(i,this.array),a=ye(a,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,e,i,a,r){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),i=ye(i,this.array),a=ye(a,this.array),r=ye(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ho&&(t.usage=this.usage),t}}class gc extends Ne{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class _c extends Ne{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class me extends Ne{constructor(t,e,i){super(new Float32Array(t),e,i)}}let bd=0;const He=new ne,Xr=new ce,Rn=new L,Ue=new Ca,da=new Ca,fe=new L;class ti extends gn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=na(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(dc(t)?_c:gc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Pt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return He.makeRotationFromQuaternion(t),this.applyMatrix4(He),this}rotateX(t){return He.makeRotationX(t),this.applyMatrix4(He),this}rotateY(t){return He.makeRotationY(t),this.applyMatrix4(He),this}rotateZ(t){return He.makeRotationZ(t),this.applyMatrix4(He),this}translate(t,e,i){return He.makeTranslation(t,e,i),this.applyMatrix4(He),this}scale(t,e,i){return He.makeScale(t,e,i),this.applyMatrix4(He),this}lookAt(t){return Xr.lookAt(t),Xr.updateMatrix(),this.applyMatrix4(Xr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rn).negate(),this.translate(Rn.x,Rn.y,Rn.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let a=0,r=t.length;a<r;a++){const s=t[a];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new me(i,3))}else{for(let i=0,a=e.count;i<a;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ca);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,a=e.length;i<a;i++){const r=e[i];Ue.setFromBufferAttribute(r),this.morphTargetsRelative?(fe.addVectors(this.boundingBox.min,Ue.min),this.boundingBox.expandByPoint(fe),fe.addVectors(this.boundingBox.max,Ue.max),this.boundingBox.expandByPoint(fe)):(this.boundingBox.expandByPoint(Ue.min),this.boundingBox.expandByPoint(Ue.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ao);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const i=this.boundingSphere.center;if(Ue.setFromBufferAttribute(t),e)for(let r=0,s=e.length;r<s;r++){const o=e[r];da.setFromBufferAttribute(o),this.morphTargetsRelative?(fe.addVectors(Ue.min,da.min),Ue.expandByPoint(fe),fe.addVectors(Ue.max,da.max),Ue.expandByPoint(fe)):(Ue.expandByPoint(da.min),Ue.expandByPoint(da.max))}Ue.getCenter(i);let a=0;for(let r=0,s=t.count;r<s;r++)fe.fromBufferAttribute(t,r),a=Math.max(a,i.distanceToSquared(fe));if(e)for(let r=0,s=e.length;r<s;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)fe.fromBufferAttribute(o,c),l&&(Rn.fromBufferAttribute(t,c),fe.add(Rn)),a=Math.max(a,i.distanceToSquared(fe))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,a=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<i.count;C++)o[C]=new L,l[C]=new L;const c=new L,h=new L,d=new L,u=new Nt,m=new Nt,g=new Nt,w=new L,p=new L;function f(C,M,v){c.fromBufferAttribute(i,C),h.fromBufferAttribute(i,M),d.fromBufferAttribute(i,v),u.fromBufferAttribute(r,C),m.fromBufferAttribute(r,M),g.fromBufferAttribute(r,v),h.sub(c),d.sub(c),m.sub(u),g.sub(u);const R=1/(m.x*g.y-g.x*m.y);isFinite(R)&&(w.copy(h).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(R),p.copy(d).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(R),o[C].add(w),o[M].add(w),o[v].add(w),l[C].add(p),l[M].add(p),l[v].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let C=0,M=S.length;C<M;++C){const v=S[C],R=v.start,V=v.count;for(let B=R,N=R+V;B<N;B+=3)f(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const y=new L,b=new L,k=new L,A=new L;function T(C){k.fromBufferAttribute(a,C),A.copy(k);const M=o[C];y.copy(M),y.sub(k.multiplyScalar(k.dot(M))).normalize(),b.crossVectors(A,M);const R=b.dot(l[C])<0?-1:1;s.setXYZW(C,y.x,y.y,y.z,R)}for(let C=0,M=S.length;C<M;++C){const v=S[C],R=v.start,V=v.count;for(let B=R,N=R+V;B<N;B+=3)T(t.getX(B+0)),T(t.getX(B+1)),T(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const a=new L,r=new L,s=new L,o=new L,l=new L,c=new L,h=new L,d=new L;if(t)for(let u=0,m=t.count;u<m;u+=3){const g=t.getX(u+0),w=t.getX(u+1),p=t.getX(u+2);a.fromBufferAttribute(e,g),r.fromBufferAttribute(e,w),s.fromBufferAttribute(e,p),h.subVectors(s,r),d.subVectors(a,r),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,w),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(w,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,m=e.count;u<m;u+=3)a.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),s.fromBufferAttribute(e,u+2),h.subVectors(s,r),d.subVectors(a,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)fe.fromBufferAttribute(t,e),fe.normalize(),t.setXYZ(e,fe.x,fe.y,fe.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let m=0,g=0;for(let w=0,p=l.length;w<p;w++){o.isInterleavedBufferAttribute?m=l[w]*o.data.stride+o.offset:m=l[w]*h;for(let f=0;f<h;f++)u[g++]=c[m++]}return new Ne(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ti,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],m=t(u,i);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const a={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(a[l]=h,r=!0)}r&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const a=t.attributes;for(const c in a){const h=a[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,m=d.length;u<m;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const s=t.groups;for(let c=0,h=s.length;c<h;c++){const d=s[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rl=new ne,Ji=new pc,Wa=new ao,sl=new L,ja=new L,Xa=new L,qa=new L,qr=new L,Ya=new L,ol=new L,$a=new L;class kt extends ce{constructor(t=new ti,e=new pe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const a=e[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,a=i.attributes.position,r=i.morphAttributes.position,s=i.morphTargetsRelative;e.fromBufferAttribute(a,t);const o=this.morphTargetInfluences;if(r&&o){Ya.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(qr.fromBufferAttribute(d,t),s?Ya.addScaledVector(qr,h):Ya.addScaledVector(qr.sub(e),h))}e.add(Ya)}return e}raycast(t,e){const i=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wa.copy(i.boundingSphere),Wa.applyMatrix4(r),Ji.copy(t.ray).recast(t.near),!(Wa.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(Wa,sl)===null||Ji.origin.distanceToSquared(sl)>(t.far-t.near)**2))&&(rl.copy(r).invert(),Ji.copy(t.ray).applyMatrix4(rl),!(i.boundingBox!==null&&Ji.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ji)))}_computeIntersections(t,e,i){let a;const r=this.geometry,s=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,w=u.length;g<w;g++){const p=u[g],f=s[p.materialIndex],S=Math.max(p.start,m.start),y=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let b=S,k=y;b<k;b+=3){const A=o.getX(b),T=o.getX(b+1),C=o.getX(b+2);a=Za(this,f,t,i,c,h,d,A,T,C),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=p.materialIndex,e.push(a))}}else{const g=Math.max(0,m.start),w=Math.min(o.count,m.start+m.count);for(let p=g,f=w;p<f;p+=3){const S=o.getX(p),y=o.getX(p+1),b=o.getX(p+2);a=Za(this,s,t,i,c,h,d,S,y,b),a&&(a.faceIndex=Math.floor(p/3),e.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,w=u.length;g<w;g++){const p=u[g],f=s[p.materialIndex],S=Math.max(p.start,m.start),y=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let b=S,k=y;b<k;b+=3){const A=b,T=b+1,C=b+2;a=Za(this,f,t,i,c,h,d,A,T,C),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=p.materialIndex,e.push(a))}}else{const g=Math.max(0,m.start),w=Math.min(l.count,m.start+m.count);for(let p=g,f=w;p<f;p+=3){const S=p,y=p+1,b=p+2;a=Za(this,s,t,i,c,h,d,S,y,b),a&&(a.faceIndex=Math.floor(p/3),e.push(a))}}}}function Md(n,t,e,i,a,r,s,o){let l;if(t.side===Ae?l=i.intersectTriangle(s,r,a,!0,o):l=i.intersectTriangle(a,r,s,t.side===Gi,o),l===null)return null;$a.copy(o),$a.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo($a);return c<e.near||c>e.far?null:{distance:c,point:$a.clone(),object:n}}function Za(n,t,e,i,a,r,s,o,l,c){n.getVertexPosition(o,ja),n.getVertexPosition(l,Xa),n.getVertexPosition(c,qa);const h=Md(n,t,e,i,ja,Xa,qa,ol);if(h){const d=new L;Ze.getBarycoord(ol,ja,Xa,qa,d),a&&(h.uv=Ze.getInterpolatedAttribute(a,o,l,c,d,new Nt)),r&&(h.uv1=Ze.getInterpolatedAttribute(r,o,l,c,d,new Nt)),s&&(h.normal=Ze.getInterpolatedAttribute(s,o,l,c,d,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new L,materialIndex:0};Ze.getNormal(ja,Xa,qa,u.normal),h.face=u,h.barycoord=d}return h}class ji extends ti{constructor(t=1,e=1,i=1,a=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:a,heightSegments:r,depthSegments:s};const o=this;a=Math.floor(a),r=Math.floor(r),s=Math.floor(s);const l=[],c=[],h=[],d=[];let u=0,m=0;g("z","y","x",-1,-1,i,e,t,s,r,0),g("z","y","x",1,-1,i,e,-t,s,r,1),g("x","z","y",1,1,t,i,e,a,s,2),g("x","z","y",1,-1,t,i,-e,a,s,3),g("x","y","z",1,-1,t,e,i,a,r,4),g("x","y","z",-1,-1,t,e,-i,a,r,5),this.setIndex(l),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(h,3)),this.setAttribute("uv",new me(d,2));function g(w,p,f,S,y,b,k,A,T,C,M){const v=b/T,R=k/C,V=b/2,B=k/2,N=A/2,j=T+1,F=C+1;let W=0,H=0;const K=new L;for(let Q=0;Q<F;Q++){const at=Q*R-B;for(let St=0;St<j;St++){const Ut=St*v-V;K[w]=Ut*S,K[p]=at*y,K[f]=N,c.push(K.x,K.y,K.z),K[w]=0,K[p]=0,K[f]=A>0?1:-1,h.push(K.x,K.y,K.z),d.push(St/T),d.push(1-Q/C),W+=1}}for(let Q=0;Q<C;Q++)for(let at=0;at<T;at++){const St=u+at+j*Q,Ut=u+at+j*(Q+1),q=u+(at+1)+j*(Q+1),it=u+(at+1)+j*Q;l.push(St,Ut,it),l.push(Ut,q,it),H+=6}o.addGroup(m,H,M),m+=H,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ji(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Kn(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const a=n[e][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=a.clone():Array.isArray(a)?t[e][i]=a.slice():t[e][i]=a}}return t}function Se(n){const t={};for(let e=0;e<n.length;e++){const i=Kn(n[e]);for(const a in i)t[a]=i[a]}return t}function yd(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function vc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}const Sd={clone:Kn,merge:Se};var Ed=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Td=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qe extends La{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ed,this.fragmentShader=Td,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Kn(t.uniforms),this.uniformsGroups=yd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const a in this.uniforms){const s=this.uniforms[a].value;s&&s.isTexture?e.uniforms[a]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[a]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[a]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[a]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[a]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[a]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[a]={type:"m4",value:s.toArray()}:e.uniforms[a]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class xc extends ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=xi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pi=new L,ll=new Nt,cl=new Nt;class xe extends xc{constructor(t=50,e=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Jn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(wa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Jn*2*Math.atan(Math.tan(wa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Pi.x,Pi.y).multiplyScalar(-t/Pi.z),Pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Pi.x,Pi.y).multiplyScalar(-t/Pi.z)}getViewSize(t,e){return this.getViewBounds(t,ll,cl),e.subVectors(cl,ll)}setViewOffset(t,e,i,a,r,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(wa*.5*this.fov)/this.zoom,i=2*e,a=this.aspect*i,r=-.5*a;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;r+=s.offsetX*a/l,e-=s.offsetY*i/c,a*=s.width/l,i*=s.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Cn=-90,Ln=1;class Ad extends ce{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new xe(Cn,Ln,t,e);a.layers=this.layers,this.add(a);const r=new xe(Cn,Ln,t,e);r.layers=this.layers,this.add(r);const s=new xe(Cn,Ln,t,e);s.layers=this.layers,this.add(s);const o=new xe(Cn,Ln,t,e);o.layers=this.layers,this.add(o);const l=new xe(Cn,Ln,t,e);l.layers=this.layers,this.add(l);const c=new xe(Cn,Ln,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,a,r,s,o,l]=e;for(const c of e)this.remove(c);if(t===xi)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===pr)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,s,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const w=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,a),t.render(e,r),t.setRenderTarget(i,1,a),t.render(e,s),t.setRenderTarget(i,2,a),t.render(e,o),t.setRenderTarget(i,3,a),t.render(e,l),t.setRenderTarget(i,4,a),t.render(e,c),i.texture.generateMipmaps=w,t.setRenderTarget(i,5,a),t.render(e,h),t.setRenderTarget(d,u,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class wc extends Me{constructor(t,e,i,a,r,s,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:qn,super(t,e,i,a,r,s,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Rd extends fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];this.texture=new wc(a,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ai}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new ji(5,5,5),r=new Qe({name:"CubemapFromEquirect",uniforms:Kn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ae,blending:Fi});r.uniforms.tEquirect.value=e;const s=new kt(a,r),o=e.minFilter;return e.minFilter===ln&&(e.minFilter=ai),new Ad(1,10,this).update(t,s),e.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(t,e,i,a){const r=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(e,i,a);t.setRenderTarget(r)}}const Yr=new L,Cd=new L,Ld=new Pt;class an{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,a){return this.normal.set(t,e,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const a=Yr.subVectors(i,e).cross(Cd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Yr),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Ld.getNormalMatrix(t),a=this.coplanarPoint(Yr).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ki=new ao,Ja=new L;class so{constructor(t=new an,e=new an,i=new an,a=new an,r=new an,s=new an){this.planes=[t,e,i,a,r,s]}set(t,e,i,a,r,s){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(a),o[4].copy(r),o[5].copy(s),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=xi){const i=this.planes,a=t.elements,r=a[0],s=a[1],o=a[2],l=a[3],c=a[4],h=a[5],d=a[6],u=a[7],m=a[8],g=a[9],w=a[10],p=a[11],f=a[12],S=a[13],y=a[14],b=a[15];if(i[0].setComponents(l-r,u-c,p-m,b-f).normalize(),i[1].setComponents(l+r,u+c,p+m,b+f).normalize(),i[2].setComponents(l+s,u+h,p+g,b+S).normalize(),i[3].setComponents(l-s,u-h,p-g,b-S).normalize(),i[4].setComponents(l-o,u-d,p-w,b-y).normalize(),e===xi)i[5].setComponents(l+o,u+d,p+w,b+y).normalize();else if(e===pr)i[5].setComponents(o,d,w,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(t){return Ki.center.set(0,0,0),Ki.radius=.7071067811865476,Ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(t){const e=this.planes,i=t.center,a=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const a=e[i];if(Ja.x=a.normal.x>0?t.max.x:t.min.x,Ja.y=a.normal.y>0?t.max.y:t.min.y,Ja.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(Ja)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function bc(){let n=null,t=!1,e=null,i=null;function a(r,s){e(r,s),i=n.requestAnimationFrame(a)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(a),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Pd(n){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const h=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,h);else{d.sort((m,g)=>m.start-g.start);let u=0;for(let m=1;m<d.length;m++){const g=d[u],w=d[m];w.start<=g.start+g.count+1?g.count=Math.max(g.count,w.start+w.count-g.start):(++u,d[u]=w)}d.length=u+1;for(let m=0,g=d.length;m<g;m++){const w=d[m];n.bufferSubData(c,w.start*h.BYTES_PER_ELEMENT,h,w.start,w.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:r,update:s}}class Re extends ti{constructor(t=1,e=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:a};const r=t/2,s=e/2,o=Math.floor(i),l=Math.floor(a),c=o+1,h=l+1,d=t/o,u=e/l,m=[],g=[],w=[],p=[];for(let f=0;f<h;f++){const S=f*u-s;for(let y=0;y<c;y++){const b=y*d-r;g.push(b,-S,0),w.push(0,0,1),p.push(y/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){const y=S+c*f,b=S+c*(f+1),k=S+1+c*(f+1),A=S+1+c*f;m.push(y,b,A),m.push(b,k,A)}this.setIndex(m),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(w,3)),this.setAttribute("uv",new me(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Re(t.width,t.height,t.widthSegments,t.heightSegments)}}var Dd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Id=`#ifdef USE_ALPHAHASH
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
#endif`,Ud=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fd=`#ifdef USE_AOMAP
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
#endif`,Od=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bd=`#ifdef USE_BATCHING
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
#endif`,Hd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jd=`#ifdef USE_IRIDESCENCE
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
#endif`,Xd=`#ifdef USE_BUMPMAP
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
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Kd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ef=`#define PI 3.141592653589793
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
} // validated`,nf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,af=`vec3 transformedNormal = objectNormal;
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
#endif`,rf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,of=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cf="gl_FragColor = linearToOutputTexel( gl_FragColor );",hf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,df=`#ifdef USE_ENVMAP
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
#endif`,ff=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,uf=`#ifdef USE_ENVMAP
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
#endif`,pf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mf=`#ifdef USE_ENVMAP
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
#endif`,gf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_f=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wf=`#ifdef USE_GRADIENTMAP
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
}`,bf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sf=`uniform bool receiveShadow;
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
#endif`,Ef=`#ifdef USE_ENVMAP
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
#endif`,Tf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Af=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lf=`PhysicalMaterial material;
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
#endif`,Pf=`struct PhysicalMaterial {
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
}`,Df=`
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
#endif`,If=`#if defined( RE_IndirectDiffuse )
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
#endif`,Uf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ff=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Of=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gf=`#if defined( USE_POINTS_UV )
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
#endif`,Vf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yf=`#ifdef USE_MORPHTARGETS
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
#endif`,$f=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,eu=`#ifdef USE_NORMALMAP
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
#endif`,iu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,au=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ru=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,su=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ou=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,lu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,du=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_u=`float getShadowMask() {
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
}`,vu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xu=`#ifdef USE_SKINNING
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
#endif`,wu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bu=`#ifdef USE_SKINNING
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
#endif`,Mu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Su=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Eu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tu=`#ifdef USE_TRANSMISSION
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
#endif`,Au=`#ifdef USE_TRANSMISSION
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
#endif`,Ru=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Du=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Iu=`uniform sampler2D t2D;
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
}`,Uu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ku=`#ifdef ENVMAP_TYPE_CUBE
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
}`,zu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fu=`#include <common>
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
}`,Ou=`#if DEPTH_PACKING == 3200
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
}`,Bu=`#define DISTANCE
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
}`,Hu=`#define DISTANCE
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
}`,Gu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wu=`uniform float scale;
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
}`,ju=`uniform vec3 diffuse;
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
}`,Xu=`#include <common>
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
}`,qu=`uniform vec3 diffuse;
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
}`,Yu=`#define LAMBERT
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
}`,$u=`#define LAMBERT
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
}`,Zu=`#define MATCAP
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
}`,Ju=`#define MATCAP
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
}`,Ku=`#define NORMAL
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
}`,Qu=`#define NORMAL
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
}`,t0=`#define PHONG
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
}`,e0=`#define PHONG
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
}`,i0=`#define STANDARD
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
}`,n0=`#define STANDARD
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
}`,a0=`#define TOON
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
}`,r0=`#define TOON
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
}`,s0=`uniform float size;
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
}`,o0=`uniform vec3 diffuse;
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
}`,l0=`#include <common>
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
}`,c0=`uniform vec3 color;
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
}`,h0=`uniform float rotation;
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
}`,d0=`uniform vec3 diffuse;
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
}`,It={alphahash_fragment:Dd,alphahash_pars_fragment:Id,alphamap_fragment:Ud,alphamap_pars_fragment:kd,alphatest_fragment:zd,alphatest_pars_fragment:Nd,aomap_fragment:Fd,aomap_pars_fragment:Od,batching_pars_vertex:Bd,batching_vertex:Hd,begin_vertex:Gd,beginnormal_vertex:Vd,bsdfs:Wd,iridescence_fragment:jd,bumpmap_pars_fragment:Xd,clipping_planes_fragment:qd,clipping_planes_pars_fragment:Yd,clipping_planes_pars_vertex:$d,clipping_planes_vertex:Zd,color_fragment:Jd,color_pars_fragment:Kd,color_pars_vertex:Qd,color_vertex:tf,common:ef,cube_uv_reflection_fragment:nf,defaultnormal_vertex:af,displacementmap_pars_vertex:rf,displacementmap_vertex:sf,emissivemap_fragment:of,emissivemap_pars_fragment:lf,colorspace_fragment:cf,colorspace_pars_fragment:hf,envmap_fragment:df,envmap_common_pars_fragment:ff,envmap_pars_fragment:uf,envmap_pars_vertex:pf,envmap_physical_pars_fragment:Ef,envmap_vertex:mf,fog_vertex:gf,fog_pars_vertex:_f,fog_fragment:vf,fog_pars_fragment:xf,gradientmap_pars_fragment:wf,lightmap_pars_fragment:bf,lights_lambert_fragment:Mf,lights_lambert_pars_fragment:yf,lights_pars_begin:Sf,lights_toon_fragment:Tf,lights_toon_pars_fragment:Af,lights_phong_fragment:Rf,lights_phong_pars_fragment:Cf,lights_physical_fragment:Lf,lights_physical_pars_fragment:Pf,lights_fragment_begin:Df,lights_fragment_maps:If,lights_fragment_end:Uf,logdepthbuf_fragment:kf,logdepthbuf_pars_fragment:zf,logdepthbuf_pars_vertex:Nf,logdepthbuf_vertex:Ff,map_fragment:Of,map_pars_fragment:Bf,map_particle_fragment:Hf,map_particle_pars_fragment:Gf,metalnessmap_fragment:Vf,metalnessmap_pars_fragment:Wf,morphinstance_vertex:jf,morphcolor_vertex:Xf,morphnormal_vertex:qf,morphtarget_pars_vertex:Yf,morphtarget_vertex:$f,normal_fragment_begin:Zf,normal_fragment_maps:Jf,normal_pars_fragment:Kf,normal_pars_vertex:Qf,normal_vertex:tu,normalmap_pars_fragment:eu,clearcoat_normal_fragment_begin:iu,clearcoat_normal_fragment_maps:nu,clearcoat_pars_fragment:au,iridescence_pars_fragment:ru,opaque_fragment:su,packing:ou,premultiplied_alpha_fragment:lu,project_vertex:cu,dithering_fragment:hu,dithering_pars_fragment:du,roughnessmap_fragment:fu,roughnessmap_pars_fragment:uu,shadowmap_pars_fragment:pu,shadowmap_pars_vertex:mu,shadowmap_vertex:gu,shadowmask_pars_fragment:_u,skinbase_vertex:vu,skinning_pars_vertex:xu,skinning_vertex:wu,skinnormal_vertex:bu,specularmap_fragment:Mu,specularmap_pars_fragment:yu,tonemapping_fragment:Su,tonemapping_pars_fragment:Eu,transmission_fragment:Tu,transmission_pars_fragment:Au,uv_pars_fragment:Ru,uv_pars_vertex:Cu,uv_vertex:Lu,worldpos_vertex:Pu,background_vert:Du,background_frag:Iu,backgroundCube_vert:Uu,backgroundCube_frag:ku,cube_vert:zu,cube_frag:Nu,depth_vert:Fu,depth_frag:Ou,distanceRGBA_vert:Bu,distanceRGBA_frag:Hu,equirect_vert:Gu,equirect_frag:Vu,linedashed_vert:Wu,linedashed_frag:ju,meshbasic_vert:Xu,meshbasic_frag:qu,meshlambert_vert:Yu,meshlambert_frag:$u,meshmatcap_vert:Zu,meshmatcap_frag:Ju,meshnormal_vert:Ku,meshnormal_frag:Qu,meshphong_vert:t0,meshphong_frag:e0,meshphysical_vert:i0,meshphysical_frag:n0,meshtoon_vert:a0,meshtoon_frag:r0,points_vert:s0,points_frag:o0,shadow_vert:l0,shadow_frag:c0,sprite_vert:h0,sprite_frag:d0},nt={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pt}},envmap:{envMap:{value:null},envMapRotation:{value:new Pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pt},normalScale:{value:new Nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0},uvTransform:{value:new Pt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new Nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}}},ii={basic:{uniforms:Se([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:It.meshbasic_vert,fragmentShader:It.meshbasic_frag},lambert:{uniforms:Se([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:It.meshlambert_vert,fragmentShader:It.meshlambert_frag},phong:{uniforms:Se([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30}}]),vertexShader:It.meshphong_vert,fragmentShader:It.meshphong_frag},standard:{uniforms:Se([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag},toon:{uniforms:Se([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:It.meshtoon_vert,fragmentShader:It.meshtoon_frag},matcap:{uniforms:Se([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:It.meshmatcap_vert,fragmentShader:It.meshmatcap_frag},points:{uniforms:Se([nt.points,nt.fog]),vertexShader:It.points_vert,fragmentShader:It.points_frag},dashed:{uniforms:Se([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:It.linedashed_vert,fragmentShader:It.linedashed_frag},depth:{uniforms:Se([nt.common,nt.displacementmap]),vertexShader:It.depth_vert,fragmentShader:It.depth_frag},normal:{uniforms:Se([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:It.meshnormal_vert,fragmentShader:It.meshnormal_frag},sprite:{uniforms:Se([nt.sprite,nt.fog]),vertexShader:It.sprite_vert,fragmentShader:It.sprite_frag},background:{uniforms:{uvTransform:{value:new Pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:It.background_vert,fragmentShader:It.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pt}},vertexShader:It.backgroundCube_vert,fragmentShader:It.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:It.cube_vert,fragmentShader:It.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:It.equirect_vert,fragmentShader:It.equirect_frag},distanceRGBA:{uniforms:Se([nt.common,nt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:It.distanceRGBA_vert,fragmentShader:It.distanceRGBA_frag},shadow:{uniforms:Se([nt.lights,nt.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:It.shadow_vert,fragmentShader:It.shadow_frag}};ii.physical={uniforms:Se([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pt},clearcoatNormalScale:{value:new Nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pt},transmissionSamplerSize:{value:new Nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pt},anisotropyVector:{value:new Nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pt}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag};const Ka={r:0,b:0,g:0},Qi=new Ce,f0=new ne;function u0(n,t,e,i,a,r,s){const o=new Ft(0);let l=r===!0?0:1,c,h,d=null,u=0,m=null;function g(S){let y=S.isScene===!0?S.background:null;return y&&y.isTexture&&(y=(S.backgroundBlurriness>0?e:t).get(y)),y}function w(S){let y=!1;const b=g(S);b===null?f(o,l):b&&b.isColor&&(f(b,1),y=!0);const k=n.xr.getEnvironmentBlendMode();k==="additive"?i.buffers.color.setClear(0,0,0,1,s):k==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(S,y){const b=g(y);b&&(b.isCubeTexture||b.mapping===_r)?(h===void 0&&(h=new kt(new ji(1,1,1),new Qe({name:"BackgroundCubeMaterial",uniforms:Kn(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:Ae,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(k,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(h)),Qi.copy(y.backgroundRotation),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(f0.makeRotationFromEuler(Qi)),h.material.toneMapped=Wt.getTransfer(b.colorSpace)!==$t,(d!==b||u!==b.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,d=b,u=b.version,m=n.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new kt(new Re(2,2),new Qe({name:"BackgroundMaterial",uniforms:Kn(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Wt.getTransfer(b.colorSpace)!==$t,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||u!==b.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,d=b,u=b.version,m=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function f(S,y){S.getRGB(Ka,vc(n)),i.buffers.color.setClear(Ka.r,Ka.g,Ka.b,y,s)}return{getClearColor:function(){return o},setClearColor:function(S,y=1){o.set(S),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,f(o,l)},render:w,addToRenderList:p}}function p0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},a=u(null);let r=a,s=!1;function o(v,R,V,B,N){let j=!1;const F=d(B,V,R);r!==F&&(r=F,c(r.object)),j=m(v,B,V,N),j&&g(v,B,V,N),N!==null&&t.update(N,n.ELEMENT_ARRAY_BUFFER),(j||s)&&(s=!1,b(v,R,V,B),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function h(v){return n.deleteVertexArray(v)}function d(v,R,V){const B=V.wireframe===!0;let N=i[v.id];N===void 0&&(N={},i[v.id]=N);let j=N[R.id];j===void 0&&(j={},N[R.id]=j);let F=j[B];return F===void 0&&(F=u(l()),j[B]=F),F}function u(v){const R=[],V=[],B=[];for(let N=0;N<e;N++)R[N]=0,V[N]=0,B[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:V,attributeDivisors:B,object:v,attributes:{},index:null}}function m(v,R,V,B){const N=r.attributes,j=R.attributes;let F=0;const W=V.getAttributes();for(const H in W)if(W[H].location>=0){const Q=N[H];let at=j[H];if(at===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(at=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(at=v.instanceColor)),Q===void 0||Q.attribute!==at||at&&Q.data!==at.data)return!0;F++}return r.attributesNum!==F||r.index!==B}function g(v,R,V,B){const N={},j=R.attributes;let F=0;const W=V.getAttributes();for(const H in W)if(W[H].location>=0){let Q=j[H];Q===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(Q=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(Q=v.instanceColor));const at={};at.attribute=Q,Q&&Q.data&&(at.data=Q.data),N[H]=at,F++}r.attributes=N,r.attributesNum=F,r.index=B}function w(){const v=r.newAttributes;for(let R=0,V=v.length;R<V;R++)v[R]=0}function p(v){f(v,0)}function f(v,R){const V=r.newAttributes,B=r.enabledAttributes,N=r.attributeDivisors;V[v]=1,B[v]===0&&(n.enableVertexAttribArray(v),B[v]=1),N[v]!==R&&(n.vertexAttribDivisor(v,R),N[v]=R)}function S(){const v=r.newAttributes,R=r.enabledAttributes;for(let V=0,B=R.length;V<B;V++)R[V]!==v[V]&&(n.disableVertexAttribArray(V),R[V]=0)}function y(v,R,V,B,N,j,F){F===!0?n.vertexAttribIPointer(v,R,V,N,j):n.vertexAttribPointer(v,R,V,B,N,j)}function b(v,R,V,B){w();const N=B.attributes,j=V.getAttributes(),F=R.defaultAttributeValues;for(const W in j){const H=j[W];if(H.location>=0){let K=N[W];if(K===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(K=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(K=v.instanceColor)),K!==void 0){const Q=K.normalized,at=K.itemSize,St=t.get(K);if(St===void 0)continue;const Ut=St.buffer,q=St.type,it=St.bytesPerElement,vt=q===n.INT||q===n.UNSIGNED_INT||K.gpuType===Js;if(K.isInterleavedBufferAttribute){const st=K.data,Et=st.stride,Rt=K.offset;if(st.isInstancedInterleavedBuffer){for(let zt=0;zt<H.locationSize;zt++)f(H.location+zt,st.meshPerAttribute);v.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let zt=0;zt<H.locationSize;zt++)p(H.location+zt);n.bindBuffer(n.ARRAY_BUFFER,Ut);for(let zt=0;zt<H.locationSize;zt++)y(H.location+zt,at/H.locationSize,q,Q,Et*it,(Rt+at/H.locationSize*zt)*it,vt)}else{if(K.isInstancedBufferAttribute){for(let st=0;st<H.locationSize;st++)f(H.location+st,K.meshPerAttribute);v.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let st=0;st<H.locationSize;st++)p(H.location+st);n.bindBuffer(n.ARRAY_BUFFER,Ut);for(let st=0;st<H.locationSize;st++)y(H.location+st,at/H.locationSize,q,Q,at*it,at/H.locationSize*st*it,vt)}}else if(F!==void 0){const Q=F[W];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(H.location,Q);break;case 3:n.vertexAttrib3fv(H.location,Q);break;case 4:n.vertexAttrib4fv(H.location,Q);break;default:n.vertexAttrib1fv(H.location,Q)}}}}S()}function k(){C();for(const v in i){const R=i[v];for(const V in R){const B=R[V];for(const N in B)h(B[N].object),delete B[N];delete R[V]}delete i[v]}}function A(v){if(i[v.id]===void 0)return;const R=i[v.id];for(const V in R){const B=R[V];for(const N in B)h(B[N].object),delete B[N];delete R[V]}delete i[v.id]}function T(v){for(const R in i){const V=i[R];if(V[v.id]===void 0)continue;const B=V[v.id];for(const N in B)h(B[N].object),delete B[N];delete V[v.id]}}function C(){M(),s=!0,r!==a&&(r=a,c(r.object))}function M(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:C,resetDefaultState:M,dispose:k,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:w,enableAttribute:p,disableUnusedAttributes:S}}function m0(n,t,e){let i;function a(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function s(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),e.update(h,i,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=h[g];e.update(m,i,1)}function l(c,h,d,u){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)s(c[g],h[g],u[g]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let w=0;w<d;w++)g+=h[w]*u[w];e.update(g,i,1)}}this.setMode=a,this.render=r,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function g0(n,t,e,i){let a;function r(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");a=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(T){return!(T!==Je&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const C=T===Aa&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==yi&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==vi&&!C)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),k=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:m,maxVertexTextures:g,maxTextureSize:w,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:S,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:k,maxSamples:A}}function _0(n){const t=this;let e=null,i=0,a=!1,r=!1;const s=new an,o=new Pt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const m=d.length!==0||u||i!==0||a;return a=u,i=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,m){const g=d.clippingPlanes,w=d.clipIntersection,p=d.clipShadows,f=n.get(d);if(!a||g===null||g.length===0||r&&!p)r?h(null):c();else{const S=r?0:i,y=S*4;let b=f.clippingState||null;l.value=b,b=h(g,u,y,m);for(let k=0;k!==y;++k)b[k]=e[k];f.clippingState=b,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,m,g){const w=d!==null?d.length:0;let p=null;if(w!==0){if(p=l.value,g!==!0||p===null){const f=m+w*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<f)&&(p=new Float32Array(f));for(let y=0,b=m;y!==w;++y,b+=4)s.copy(d[y]).applyMatrix4(S,o),s.normal.toArray(p,b),p[b+3]=s.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,p}}function v0(n){let t=new WeakMap;function e(s,o){return o===ps?s.mapping=qn:o===ms&&(s.mapping=Yn),s}function i(s){if(s&&s.isTexture){const o=s.mapping;if(o===ps||o===ms)if(t.has(s)){const l=t.get(s).texture;return e(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Rd(l.height);return c.fromEquirectangularTexture(n,s),t.set(s,c),s.addEventListener("dispose",a),e(c.texture,s.mapping)}else return null}}return s}function a(s){const o=s.target;o.removeEventListener("dispose",a);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class oo extends xc{constructor(t=-1,e=1,i=1,a=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=a,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,a,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let r=i-t,s=i+t,o=a+e,l=a-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Fn=4,hl=[.125,.215,.35,.446,.526,.582],on=20,$r=new oo,dl=new Ft;let Zr=null,Jr=0,Kr=0,Qr=!1;const rn=(1+Math.sqrt(5))/2,Pn=1/rn,fl=[new L(-rn,Pn,0),new L(rn,Pn,0),new L(-Pn,0,rn),new L(Pn,0,rn),new L(0,rn,-Pn),new L(0,rn,Pn),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class ul{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,a=100){Zr=this._renderer.getRenderTarget(),Jr=this._renderer.getActiveCubeFace(),Kr=this._renderer.getActiveMipmapLevel(),Qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,a,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Zr,Jr,Kr),this._renderer.xr.enabled=Qr,t.scissorTest=!1,Qa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qn||t.mapping===Yn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Zr=this._renderer.getRenderTarget(),Jr=this._renderer.getActiveCubeFace(),Kr=this._renderer.getActiveMipmapLevel(),Qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ai,minFilter:ai,generateMipmaps:!1,type:Aa,format:Je,colorSpace:ia,depthBuffer:!1},a=pl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pl(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=x0(r)),this._blurMaterial=w0(r,t,e)}return a}_compileMaterial(t){const e=new kt(this._lodPlanes[0],t);this._renderer.compile(e,$r)}_sceneToCubeUV(t,e,i,a){const o=new xe(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(dl),h.toneMapping=Oi,h.autoClear=!1;const m=new pe({name:"PMREM.Background",side:Ae,depthWrite:!1,depthTest:!1}),g=new kt(new ji,m);let w=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,w=!0):(m.color.copy(dl),w=!0);for(let f=0;f<6;f++){const S=f%3;S===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):S===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const y=this._cubeSize;Qa(a,S*y,f>2?y:0,y,y),h.setRenderTarget(a),w&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,a=t.mapping===qn||t.mapping===Yn;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=gl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ml());const r=a?this._cubemapMaterial:this._equirectMaterial,s=new kt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Qa(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(s,$r)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=fl[(a-r-1)%fl.length];this._blur(t,r-1,r,s,o)}e.autoClear=i}_blur(t,e,i,a,r){const s=this._pingPongRenderTarget;this._halfBlur(t,s,e,i,a,"latitudinal",r),this._halfBlur(s,t,i,i,a,"longitudinal",r)}_halfBlur(t,e,i,a,r,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new kt(this._lodPlanes[a],c),u=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*on-1),w=r/g,p=isFinite(r)?1+Math.floor(h*w):on;p>on&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${on}`);const f=[];let S=0;for(let T=0;T<on;++T){const C=T/w,M=Math.exp(-C*C/2);f.push(M),T===0?S+=M:T<p&&(S+=2*M)}for(let T=0;T<f.length;T++)f[T]=f[T]/S;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=f,u.latitudinal.value=s==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:y}=this;u.dTheta.value=g,u.mipInt.value=y-i;const b=this._sizeLods[a],k=3*b*(a>y-Fn?a-y+Fn:0),A=4*(this._cubeSize-b);Qa(e,k,A,3*b,2*b),l.setRenderTarget(e),l.render(d,$r)}}function x0(n){const t=[],e=[],i=[];let a=n;const r=n-Fn+1+hl.length;for(let s=0;s<r;s++){const o=Math.pow(2,a);e.push(o);let l=1/o;s>n-Fn?l=hl[s-n+Fn-1]:s===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,w=3,p=2,f=1,S=new Float32Array(w*g*m),y=new Float32Array(p*g*m),b=new Float32Array(f*g*m);for(let A=0;A<m;A++){const T=A%3*2/3-1,C=A>2?0:-1,M=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];S.set(M,w*g*A),y.set(u,p*g*A);const v=[A,A,A,A,A,A];b.set(v,f*g*A)}const k=new ti;k.setAttribute("position",new Ne(S,w)),k.setAttribute("uv",new Ne(y,p)),k.setAttribute("faceIndex",new Ne(b,f)),t.push(k),a>Fn&&a--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function pl(n,t,e){const i=new fn(n,t,e);return i.texture.mapping=_r,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Qa(n,t,e,i,a){n.viewport.set(t,e,i,a),n.scissor.set(t,e,i,a)}function w0(n,t,e){const i=new Float32Array(on),a=new L(0,1,0);return new Qe({name:"SphericalGaussianBlur",defines:{n:on,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:lo(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function ml(){return new Qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lo(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function gl(){return new Qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function lo(){return`

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
	`}function b0(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ps||l===ms,h=l===qn||l===Yn;if(c||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new ul(n)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return c&&m&&m.height>0||h&&m&&a(m)?(e===null&&(e=new ul(n)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function a(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function s(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:s}}function M0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let a;switch(i){case"WEBGL_depth_texture":a=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=n.getExtension(i)}return t[i]=a,a}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const a=e(i);return a===null&&ga("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function y0(n,t,e,i){const a={},r=new WeakMap;function s(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const w=u.morphAttributes[g];for(let p=0,f=w.length;p<f;p++)t.remove(w[p])}u.removeEventListener("dispose",s),delete a[u.id];const m=r.get(u);m&&(t.remove(m),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return a[u.id]===!0||(u.addEventListener("dispose",s),a[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],n.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const w=m[g];for(let p=0,f=w.length;p<f;p++)t.update(w[p],n.ARRAY_BUFFER)}}function c(d){const u=[],m=d.index,g=d.attributes.position;let w=0;if(m!==null){const S=m.array;w=m.version;for(let y=0,b=S.length;y<b;y+=3){const k=S[y+0],A=S[y+1],T=S[y+2];u.push(k,A,A,T,T,k)}}else if(g!==void 0){const S=g.array;w=g.version;for(let y=0,b=S.length/3-1;y<b;y+=3){const k=y+0,A=y+1,T=y+2;u.push(k,A,A,T,T,k)}}else return;const p=new(dc(u)?_c:gc)(u,1);p.version=w;const f=r.get(d);f&&t.remove(f),r.set(d,p)}function h(d){const u=r.get(d);if(u){const m=d.index;m!==null&&u.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function S0(n,t,e){let i;function a(u){i=u}let r,s;function o(u){r=u.type,s=u.bytesPerElement}function l(u,m){n.drawElements(i,m,r,u*s),e.update(m,i,1)}function c(u,m,g){g!==0&&(n.drawElementsInstanced(i,m,r,u*s,g),e.update(m,i,g))}function h(u,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,u,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];e.update(p,i,1)}function d(u,m,g,w){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<u.length;f++)c(u[f]/s,m[f],w[f]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,r,u,0,w,0,g);let f=0;for(let S=0;S<g;S++)f+=m[S]*w[S];e.update(f,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function E0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,s,o){switch(e.calls++,s){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function a(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:a,update:i}}function T0(n,t,e){const i=new WeakMap,a=new Zt;function r(s,o,l){const c=s.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let v=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",v)};var m=v;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,w=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let b=0;g===!0&&(b=1),w===!0&&(b=2),p===!0&&(b=3);let k=o.attributes.position.count*b,A=1;k>t.maxTextureSize&&(A=Math.ceil(k/t.maxTextureSize),k=t.maxTextureSize);const T=new Float32Array(k*A*4*d),C=new uc(T,k,A,d);C.type=vi,C.needsUpdate=!0;const M=b*4;for(let R=0;R<d;R++){const V=f[R],B=S[R],N=y[R],j=k*A*4*R;for(let F=0;F<V.count;F++){const W=F*M;g===!0&&(a.fromBufferAttribute(V,F),T[j+W+0]=a.x,T[j+W+1]=a.y,T[j+W+2]=a.z,T[j+W+3]=0),w===!0&&(a.fromBufferAttribute(B,F),T[j+W+4]=a.x,T[j+W+5]=a.y,T[j+W+6]=a.z,T[j+W+7]=0),p===!0&&(a.fromBufferAttribute(N,F),T[j+W+8]=a.x,T[j+W+9]=a.y,T[j+W+10]=a.z,T[j+W+11]=N.itemSize===4?a.w:1)}}u={count:d,texture:C,size:new Nt(k,A)},i.set(o,u),o.addEventListener("dispose",v)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",s.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const w=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",w),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function A0(n,t,e,i){let a=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,d=t.get(l,h);if(a.get(d)!==c&&(t.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;a.get(u)!==c&&(u.update(),a.set(u,c))}return d}function s(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:s}}class Mc extends Me{constructor(t,e,i,a,r,s,o,l,c,h=Gn){if(h!==Gn&&h!==Zn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Gn&&(i=dn),i===void 0&&h===Zn&&(i=$n),super(null,a,r,s,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Pe,this.minFilter=l!==void 0?l:Pe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const yc=new Me,_l=new Mc(1,1),Sc=new uc,Ec=new fd,Tc=new wc,vl=[],xl=[],wl=new Float32Array(16),bl=new Float32Array(9),Ml=new Float32Array(4);function aa(n,t,e){const i=n[0];if(i<=0||i>0)return n;const a=t*e;let r=vl[a];if(r===void 0&&(r=new Float32Array(a),vl[a]=r),t!==0){i.toArray(r,0);for(let s=1,o=0;s!==t;++s)o+=e,n[s].toArray(r,o)}return r}function he(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function de(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function xr(n,t){let e=xl[t];e===void 0&&(e=new Int32Array(t),xl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function R0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function C0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;n.uniform2fv(this.addr,t),de(e,t)}}function L0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(he(e,t))return;n.uniform3fv(this.addr,t),de(e,t)}}function P0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;n.uniform4fv(this.addr,t),de(e,t)}}function D0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(he(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(he(e,i))return;Ml.set(i),n.uniformMatrix2fv(this.addr,!1,Ml),de(e,i)}}function I0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(he(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(he(e,i))return;bl.set(i),n.uniformMatrix3fv(this.addr,!1,bl),de(e,i)}}function U0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(he(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(he(e,i))return;wl.set(i),n.uniformMatrix4fv(this.addr,!1,wl),de(e,i)}}function k0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function z0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;n.uniform2iv(this.addr,t),de(e,t)}}function N0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;n.uniform3iv(this.addr,t),de(e,t)}}function F0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;n.uniform4iv(this.addr,t),de(e,t)}}function O0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function B0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;n.uniform2uiv(this.addr,t),de(e,t)}}function H0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;n.uniform3uiv(this.addr,t),de(e,t)}}function G0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;n.uniform4uiv(this.addr,t),de(e,t)}}function V0(n,t,e){const i=this.cache,a=e.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a);let r;this.type===n.SAMPLER_2D_SHADOW?(_l.compareFunction=hc,r=_l):r=yc,e.setTexture2D(t||r,a)}function W0(n,t,e){const i=this.cache,a=e.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),e.setTexture3D(t||Ec,a)}function j0(n,t,e){const i=this.cache,a=e.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),e.setTextureCube(t||Tc,a)}function X0(n,t,e){const i=this.cache,a=e.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),e.setTexture2DArray(t||Sc,a)}function q0(n){switch(n){case 5126:return R0;case 35664:return C0;case 35665:return L0;case 35666:return P0;case 35674:return D0;case 35675:return I0;case 35676:return U0;case 5124:case 35670:return k0;case 35667:case 35671:return z0;case 35668:case 35672:return N0;case 35669:case 35673:return F0;case 5125:return O0;case 36294:return B0;case 36295:return H0;case 36296:return G0;case 35678:case 36198:case 36298:case 36306:case 35682:return V0;case 35679:case 36299:case 36307:return W0;case 35680:case 36300:case 36308:case 36293:return j0;case 36289:case 36303:case 36311:case 36292:return X0}}function Y0(n,t){n.uniform1fv(this.addr,t)}function $0(n,t){const e=aa(t,this.size,2);n.uniform2fv(this.addr,e)}function Z0(n,t){const e=aa(t,this.size,3);n.uniform3fv(this.addr,e)}function J0(n,t){const e=aa(t,this.size,4);n.uniform4fv(this.addr,e)}function K0(n,t){const e=aa(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Q0(n,t){const e=aa(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function tp(n,t){const e=aa(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function ep(n,t){n.uniform1iv(this.addr,t)}function ip(n,t){n.uniform2iv(this.addr,t)}function np(n,t){n.uniform3iv(this.addr,t)}function ap(n,t){n.uniform4iv(this.addr,t)}function rp(n,t){n.uniform1uiv(this.addr,t)}function sp(n,t){n.uniform2uiv(this.addr,t)}function op(n,t){n.uniform3uiv(this.addr,t)}function lp(n,t){n.uniform4uiv(this.addr,t)}function cp(n,t,e){const i=this.cache,a=t.length,r=xr(e,a);he(i,r)||(n.uniform1iv(this.addr,r),de(i,r));for(let s=0;s!==a;++s)e.setTexture2D(t[s]||yc,r[s])}function hp(n,t,e){const i=this.cache,a=t.length,r=xr(e,a);he(i,r)||(n.uniform1iv(this.addr,r),de(i,r));for(let s=0;s!==a;++s)e.setTexture3D(t[s]||Ec,r[s])}function dp(n,t,e){const i=this.cache,a=t.length,r=xr(e,a);he(i,r)||(n.uniform1iv(this.addr,r),de(i,r));for(let s=0;s!==a;++s)e.setTextureCube(t[s]||Tc,r[s])}function fp(n,t,e){const i=this.cache,a=t.length,r=xr(e,a);he(i,r)||(n.uniform1iv(this.addr,r),de(i,r));for(let s=0;s!==a;++s)e.setTexture2DArray(t[s]||Sc,r[s])}function up(n){switch(n){case 5126:return Y0;case 35664:return $0;case 35665:return Z0;case 35666:return J0;case 35674:return K0;case 35675:return Q0;case 35676:return tp;case 5124:case 35670:return ep;case 35667:case 35671:return ip;case 35668:case 35672:return np;case 35669:case 35673:return ap;case 5125:return rp;case 36294:return sp;case 36295:return op;case 36296:return lp;case 35678:case 36198:case 36298:case 36306:case 35682:return cp;case 35679:case 36299:case 36307:return hp;case 35680:case 36300:case 36308:case 36293:return dp;case 36289:case 36303:case 36311:case 36292:return fp}}class pp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=q0(e.type)}}class mp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=up(e.type)}}class gp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const a=this.seq;for(let r=0,s=a.length;r!==s;++r){const o=a[r];o.setValue(t,e[o.id],i)}}}const ts=/(\w+)(\])?(\[|\.)?/g;function yl(n,t){n.seq.push(t),n.map[t.id]=t}function _p(n,t,e){const i=n.name,a=i.length;for(ts.lastIndex=0;;){const r=ts.exec(i),s=ts.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===a){yl(e,c===void 0?new pp(o,n,t):new mp(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new gp(o),yl(e,d)),e=d}}}class or{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const r=t.getActiveUniform(e,a),s=t.getUniformLocation(e,r.name);_p(r,s,this)}}setValue(t,e,i,a){const r=this.map[e];r!==void 0&&r.setValue(t,i,a)}setOptional(t,e,i){const a=e[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,e,i,a){for(let r=0,s=e.length;r!==s;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,e){const i=[];for(let a=0,r=t.length;a!==r;++a){const s=t[a];s.id in e&&i.push(s)}return i}}function Sl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const vp=37297;let xp=0;function wp(n,t){const e=n.split(`
`),i=[],a=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let s=a;s<r;s++){const o=s+1;i.push(`${o===t?">":" "} ${o}: ${e[s]}`)}return i.join(`
`)}const El=new Pt;function bp(n){Wt._getMatrix(El,Wt.workingColorSpace,n);const t=`mat3( ${El.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(n)){case vr:return[t,"LinearTransferOETF"];case $t:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Tl(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),a=n.getShaderInfoLog(t).trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const s=parseInt(r[1]);return e.toUpperCase()+`

`+a+`

`+wp(n.getShaderSource(t),s)}else return a}function Mp(n,t){const e=bp(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function yp(n,t){let e;switch(t){case yh:e="Linear";break;case Sh:e="Reinhard";break;case Eh:e="Cineon";break;case Th:e="ACESFilmic";break;case Rh:e="AgX";break;case Ch:e="Neutral";break;case Ah:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const tr=new L;function Sp(){Wt.getLuminanceCoefficients(tr);const n=tr.x.toFixed(4),t=tr.y.toFixed(4),e=tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ep(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_a).join(`
`)}function Tp(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ap(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const r=n.getActiveAttrib(t,a),s=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[s]={type:r.type,location:n.getAttribLocation(t,s),locationSize:o}}return e}function _a(n){return n!==""}function Al(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Rp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vs(n){return n.replace(Rp,Lp)}const Cp=new Map;function Lp(n,t){let e=It[t];if(e===void 0){const i=Cp.get(t);if(i!==void 0)e=It[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Vs(e)}const Pp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cl(n){return n.replace(Pp,Dp)}function Dp(n,t,e,i){let a="";for(let r=parseInt(t);r<parseInt(e);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function Ll(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Ip(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Jl?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===ih?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===pi&&(t="SHADOWMAP_TYPE_VSM"),t}function Up(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case qn:case Yn:t="ENVMAP_TYPE_CUBE";break;case _r:t="ENVMAP_TYPE_CUBE_UV";break}return t}function kp(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Yn:t="ENVMAP_MODE_REFRACTION";break}return t}function zp(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Zs:t="ENVMAP_BLENDING_MULTIPLY";break;case bh:t="ENVMAP_BLENDING_MIX";break;case Mh:t="ENVMAP_BLENDING_ADD";break}return t}function Np(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Fp(n,t,e,i){const a=n.getContext(),r=e.defines;let s=e.vertexShader,o=e.fragmentShader;const l=Ip(e),c=Up(e),h=kp(e),d=zp(e),u=Np(e),m=Ep(e),g=Tp(r),w=a.createProgram();let p,f,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_a).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_a).join(`
`),f.length>0&&(f+=`
`)):(p=[Ll(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_a).join(`
`),f=[Ll(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Oi?"#define TONE_MAPPING":"",e.toneMapping!==Oi?It.tonemapping_pars_fragment:"",e.toneMapping!==Oi?yp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",It.colorspace_pars_fragment,Mp("linearToOutputTexel",e.outputColorSpace),Sp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_a).join(`
`)),s=Vs(s),s=Al(s,e),s=Rl(s,e),o=Vs(o),o=Al(o,e),o=Rl(o,e),s=Cl(s),o=Cl(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===Go?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=S+p+s,b=S+f+o,k=Sl(a,a.VERTEX_SHADER,y),A=Sl(a,a.FRAGMENT_SHADER,b);a.attachShader(w,k),a.attachShader(w,A),e.index0AttributeName!==void 0?a.bindAttribLocation(w,0,e.index0AttributeName):e.morphTargets===!0&&a.bindAttribLocation(w,0,"position"),a.linkProgram(w);function T(R){if(n.debug.checkShaderErrors){const V=a.getProgramInfoLog(w).trim(),B=a.getShaderInfoLog(k).trim(),N=a.getShaderInfoLog(A).trim();let j=!0,F=!0;if(a.getProgramParameter(w,a.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(a,w,k,A);else{const W=Tl(a,k,"vertex"),H=Tl(a,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(w,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+V+`
`+W+`
`+H)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(B===""||N==="")&&(F=!1);F&&(R.diagnostics={runnable:j,programLog:V,vertexShader:{log:B,prefix:p},fragmentShader:{log:N,prefix:f}})}a.deleteShader(k),a.deleteShader(A),C=new or(a,w),M=Ap(a,w)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=a.getProgramParameter(w,vp)),v},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(w),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xp++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=k,this.fragmentShader=A,this}let Op=0;class Bp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,a=this._getShaderStage(e),r=this._getShaderStage(i),s=this._getShaderCacheForMaterial(t);return s.has(a)===!1&&(s.add(a),a.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Hp(t),e.set(t,i)),i}}class Hp{constructor(t){this.id=Op++,this.code=t,this.usedTimes=0}}function Gp(n,t,e,i,a,r,s){const o=new ro,l=new Bp,c=new Set,h=[],d=a.logarithmicDepthBuffer,u=a.vertexTextures;let m=a.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(M){return c.add(M),M===0?"uv":`uv${M}`}function p(M,v,R,V,B){const N=V.fog,j=B.geometry,F=M.isMeshStandardMaterial?V.environment:null,W=(M.isMeshStandardMaterial?e:t).get(M.envMap||F),H=W&&W.mapping===_r?W.image.height:null,K=g[M.type];M.precision!==null&&(m=a.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const Q=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,at=Q!==void 0?Q.length:0;let St=0;j.morphAttributes.position!==void 0&&(St=1),j.morphAttributes.normal!==void 0&&(St=2),j.morphAttributes.color!==void 0&&(St=3);let Ut,q,it,vt;if(K){const Yt=ii[K];Ut=Yt.vertexShader,q=Yt.fragmentShader}else Ut=M.vertexShader,q=M.fragmentShader,l.update(M),it=l.getVertexShaderID(M),vt=l.getFragmentShaderID(M);const st=n.getRenderTarget(),Et=n.state.buffers.depth.getReversed(),Rt=B.isInstancedMesh===!0,zt=B.isBatchedMesh===!0,ae=!!M.map,Gt=!!M.matcap,se=!!W,U=!!M.aoMap,Oe=!!M.lightMap,Ot=!!M.bumpMap,Bt=!!M.normalMap,Mt=!!M.displacementMap,Qt=!!M.emissiveMap,bt=!!M.metalnessMap,E=!!M.roughnessMap,_=M.anisotropy>0,z=M.clearcoat>0,$=M.dispersion>0,J=M.iridescence>0,Y=M.sheen>0,xt=M.transmission>0,ot=_&&!!M.anisotropyMap,ft=z&&!!M.clearcoatMap,Vt=z&&!!M.clearcoatNormalMap,tt=z&&!!M.clearcoatRoughnessMap,ut=J&&!!M.iridescenceMap,yt=J&&!!M.iridescenceThicknessMap,Tt=Y&&!!M.sheenColorMap,pt=Y&&!!M.sheenRoughnessMap,Ht=!!M.specularMap,Dt=!!M.specularColorMap,Jt=!!M.specularIntensityMap,P=xt&&!!M.transmissionMap,rt=xt&&!!M.thicknessMap,X=!!M.gradientMap,Z=!!M.alphaMap,ht=M.alphaTest>0,lt=!!M.alphaHash,Ct=!!M.extensions;let re=Oi;M.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(re=n.toneMapping);const ge={shaderID:K,shaderType:M.type,shaderName:M.name,vertexShader:Ut,fragmentShader:q,defines:M.defines,customVertexShaderID:it,customFragmentShaderID:vt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:zt,batchingColor:zt&&B._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&B.instanceColor!==null,instancingMorph:Rt&&B.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:st===null?n.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:ia,alphaToCoverage:!!M.alphaToCoverage,map:ae,matcap:Gt,envMap:se,envMapMode:se&&W.mapping,envMapCubeUVHeight:H,aoMap:U,lightMap:Oe,bumpMap:Ot,normalMap:Bt,displacementMap:u&&Mt,emissiveMap:Qt,normalMapObjectSpace:Bt&&M.normalMapType===Ih,normalMapTangentSpace:Bt&&M.normalMapType===cc,metalnessMap:bt,roughnessMap:E,anisotropy:_,anisotropyMap:ot,clearcoat:z,clearcoatMap:ft,clearcoatNormalMap:Vt,clearcoatRoughnessMap:tt,dispersion:$,iridescence:J,iridescenceMap:ut,iridescenceThicknessMap:yt,sheen:Y,sheenColorMap:Tt,sheenRoughnessMap:pt,specularMap:Ht,specularColorMap:Dt,specularIntensityMap:Jt,transmission:xt,transmissionMap:P,thicknessMap:rt,gradientMap:X,opaque:M.transparent===!1&&M.blending===Hn&&M.alphaToCoverage===!1,alphaMap:Z,alphaTest:ht,alphaHash:lt,combine:M.combine,mapUv:ae&&w(M.map.channel),aoMapUv:U&&w(M.aoMap.channel),lightMapUv:Oe&&w(M.lightMap.channel),bumpMapUv:Ot&&w(M.bumpMap.channel),normalMapUv:Bt&&w(M.normalMap.channel),displacementMapUv:Mt&&w(M.displacementMap.channel),emissiveMapUv:Qt&&w(M.emissiveMap.channel),metalnessMapUv:bt&&w(M.metalnessMap.channel),roughnessMapUv:E&&w(M.roughnessMap.channel),anisotropyMapUv:ot&&w(M.anisotropyMap.channel),clearcoatMapUv:ft&&w(M.clearcoatMap.channel),clearcoatNormalMapUv:Vt&&w(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&w(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&w(M.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&w(M.iridescenceThicknessMap.channel),sheenColorMapUv:Tt&&w(M.sheenColorMap.channel),sheenRoughnessMapUv:pt&&w(M.sheenRoughnessMap.channel),specularMapUv:Ht&&w(M.specularMap.channel),specularColorMapUv:Dt&&w(M.specularColorMap.channel),specularIntensityMapUv:Jt&&w(M.specularIntensityMap.channel),transmissionMapUv:P&&w(M.transmissionMap.channel),thicknessMapUv:rt&&w(M.thicknessMap.channel),alphaMapUv:Z&&w(M.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Bt||_),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!j.attributes.uv&&(ae||Z),fog:!!N,useFog:M.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Et,skinning:B.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:St,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:re,decodeVideoTexture:ae&&M.map.isVideoTexture===!0&&Wt.getTransfer(M.map.colorSpace)===$t,decodeVideoTextureEmissive:Qt&&M.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(M.emissiveMap.colorSpace)===$t,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===_i,flipSided:M.side===Ae,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ct&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&M.extensions.multiDraw===!0||zt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ge.vertexUv1s=c.has(1),ge.vertexUv2s=c.has(2),ge.vertexUv3s=c.has(3),c.clear(),ge}function f(M){const v=[];if(M.shaderID?v.push(M.shaderID):(v.push(M.customVertexShaderID),v.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)v.push(R),v.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(S(v,M),y(v,M),v.push(n.outputColorSpace)),v.push(M.customProgramCacheKey),v.join()}function S(M,v){M.push(v.precision),M.push(v.outputColorSpace),M.push(v.envMapMode),M.push(v.envMapCubeUVHeight),M.push(v.mapUv),M.push(v.alphaMapUv),M.push(v.lightMapUv),M.push(v.aoMapUv),M.push(v.bumpMapUv),M.push(v.normalMapUv),M.push(v.displacementMapUv),M.push(v.emissiveMapUv),M.push(v.metalnessMapUv),M.push(v.roughnessMapUv),M.push(v.anisotropyMapUv),M.push(v.clearcoatMapUv),M.push(v.clearcoatNormalMapUv),M.push(v.clearcoatRoughnessMapUv),M.push(v.iridescenceMapUv),M.push(v.iridescenceThicknessMapUv),M.push(v.sheenColorMapUv),M.push(v.sheenRoughnessMapUv),M.push(v.specularMapUv),M.push(v.specularColorMapUv),M.push(v.specularIntensityMapUv),M.push(v.transmissionMapUv),M.push(v.thicknessMapUv),M.push(v.combine),M.push(v.fogExp2),M.push(v.sizeAttenuation),M.push(v.morphTargetsCount),M.push(v.morphAttributeCount),M.push(v.numDirLights),M.push(v.numPointLights),M.push(v.numSpotLights),M.push(v.numSpotLightMaps),M.push(v.numHemiLights),M.push(v.numRectAreaLights),M.push(v.numDirLightShadows),M.push(v.numPointLightShadows),M.push(v.numSpotLightShadows),M.push(v.numSpotLightShadowsWithMaps),M.push(v.numLightProbes),M.push(v.shadowMapType),M.push(v.toneMapping),M.push(v.numClippingPlanes),M.push(v.numClipIntersection),M.push(v.depthPacking)}function y(M,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),M.push(o.mask)}function b(M){const v=g[M.type];let R;if(v){const V=ii[v];R=Sd.clone(V.uniforms)}else R=M.uniforms;return R}function k(M,v){let R;for(let V=0,B=h.length;V<B;V++){const N=h[V];if(N.cacheKey===v){R=N,++R.usedTimes;break}}return R===void 0&&(R=new Fp(n,v,M,r),h.push(R)),R}function A(M){if(--M.usedTimes===0){const v=h.indexOf(M);h[v]=h[h.length-1],h.pop(),M.destroy()}}function T(M){l.remove(M)}function C(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:b,acquireProgram:k,releaseProgram:A,releaseShaderCache:T,programs:h,dispose:C}}function Vp(){let n=new WeakMap;function t(s){return n.has(s)}function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function a(s,o,l){n.get(s)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:a,dispose:r}}function Wp(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Pl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Dl(){const n=[];let t=0;const e=[],i=[],a=[];function r(){t=0,e.length=0,i.length=0,a.length=0}function s(d,u,m,g,w,p){let f=n[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:m,groupOrder:g,renderOrder:d.renderOrder,z:w,group:p},n[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=m,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=w,f.group=p),t++,f}function o(d,u,m,g,w,p){const f=s(d,u,m,g,w,p);m.transmission>0?i.push(f):m.transparent===!0?a.push(f):e.push(f)}function l(d,u,m,g,w,p){const f=s(d,u,m,g,w,p);m.transmission>0?i.unshift(f):m.transparent===!0?a.unshift(f):e.unshift(f)}function c(d,u){e.length>1&&e.sort(d||Wp),i.length>1&&i.sort(u||Pl),a.length>1&&a.sort(u||Pl)}function h(){for(let d=t,u=n.length;d<u;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:a,init:r,push:o,unshift:l,finish:h,sort:c}}function jp(){let n=new WeakMap;function t(i,a){const r=n.get(i);let s;return r===void 0?(s=new Dl,n.set(i,[s])):a>=r.length?(s=new Dl,r.push(s)):s=r[a],s}function e(){n=new WeakMap}return{get:t,dispose:e}}function Xp(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Ft};break;case"SpotLight":e={position:new L,direction:new L,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new L,halfWidth:new L,halfHeight:new L};break}return n[t.id]=e,e}}}function qp(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Yp=0;function $p(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Zp(n){const t=new Xp,e=qp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const a=new L,r=new ne,s=new ne;function o(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let m=0,g=0,w=0,p=0,f=0,S=0,y=0,b=0,k=0,A=0,T=0;c.sort($p);for(let M=0,v=c.length;M<v;M++){const R=c[M],V=R.color,B=R.intensity,N=R.distance,j=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=V.r*B,d+=V.g*B,u+=V.b*B;else if(R.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(R.sh.coefficients[F],B);T++}else if(R.isDirectionalLight){const F=t.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const W=R.shadow,H=e.get(R);H.shadowIntensity=W.intensity,H.shadowBias=W.bias,H.shadowNormalBias=W.normalBias,H.shadowRadius=W.radius,H.shadowMapSize=W.mapSize,i.directionalShadow[m]=H,i.directionalShadowMap[m]=j,i.directionalShadowMatrix[m]=R.shadow.matrix,S++}i.directional[m]=F,m++}else if(R.isSpotLight){const F=t.get(R);F.position.setFromMatrixPosition(R.matrixWorld),F.color.copy(V).multiplyScalar(B),F.distance=N,F.coneCos=Math.cos(R.angle),F.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),F.decay=R.decay,i.spot[w]=F;const W=R.shadow;if(R.map&&(i.spotLightMap[k]=R.map,k++,W.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[w]=W.matrix,R.castShadow){const H=e.get(R);H.shadowIntensity=W.intensity,H.shadowBias=W.bias,H.shadowNormalBias=W.normalBias,H.shadowRadius=W.radius,H.shadowMapSize=W.mapSize,i.spotShadow[w]=H,i.spotShadowMap[w]=j,b++}w++}else if(R.isRectAreaLight){const F=t.get(R);F.color.copy(V).multiplyScalar(B),F.halfWidth.set(R.width*.5,0,0),F.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=F,p++}else if(R.isPointLight){const F=t.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),F.distance=R.distance,F.decay=R.decay,R.castShadow){const W=R.shadow,H=e.get(R);H.shadowIntensity=W.intensity,H.shadowBias=W.bias,H.shadowNormalBias=W.normalBias,H.shadowRadius=W.radius,H.shadowMapSize=W.mapSize,H.shadowCameraNear=W.camera.near,H.shadowCameraFar=W.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=R.shadow.matrix,y++}i.point[g]=F,g++}else if(R.isHemisphereLight){const F=t.get(R);F.skyColor.copy(R.color).multiplyScalar(B),F.groundColor.copy(R.groundColor).multiplyScalar(B),i.hemi[f]=F,f++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_FLOAT_1,i.rectAreaLTC2=nt.LTC_FLOAT_2):(i.rectAreaLTC1=nt.LTC_HALF_1,i.rectAreaLTC2=nt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const C=i.hash;(C.directionalLength!==m||C.pointLength!==g||C.spotLength!==w||C.rectAreaLength!==p||C.hemiLength!==f||C.numDirectionalShadows!==S||C.numPointShadows!==y||C.numSpotShadows!==b||C.numSpotMaps!==k||C.numLightProbes!==T)&&(i.directional.length=m,i.spot.length=w,i.rectArea.length=p,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=b+k-A,i.spotLightMap.length=k,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=T,C.directionalLength=m,C.pointLength=g,C.spotLength=w,C.rectAreaLength=p,C.hemiLength=f,C.numDirectionalShadows=S,C.numPointShadows=y,C.numSpotShadows=b,C.numSpotMaps=k,C.numLightProbes=T,i.version=Yp++)}function l(c,h){let d=0,u=0,m=0,g=0,w=0;const p=h.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const y=c[f];if(y.isDirectionalLight){const b=i.directional[d];b.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(p),d++}else if(y.isSpotLight){const b=i.spot[m];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(p),m++}else if(y.isRectAreaLight){const b=i.rectArea[g];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),s.identity(),r.copy(y.matrixWorld),r.premultiply(p),s.extractRotation(r),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(s),b.halfHeight.applyMatrix4(s),g++}else if(y.isPointLight){const b=i.point[u];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),u++}else if(y.isHemisphereLight){const b=i.hemi[w];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(p),w++}}}return{setup:o,setupView:l,state:i}}function Il(n){const t=new Zp(n),e=[],i=[];function a(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function s(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:s}}function Jp(n){let t=new WeakMap;function e(a,r=0){const s=t.get(a);let o;return s===void 0?(o=new Il(n),t.set(a,[o])):r>=s.length?(o=new Il(n),s.push(o)):o=s[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class Kp extends La{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ph,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Qp extends La{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const tm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,em=`uniform sampler2D shadow_pass;
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
}`;function im(n,t,e){let i=new so;const a=new Nt,r=new Nt,s=new Zt,o=new Kp({depthPacking:Dh}),l=new Qp,c={},h=e.maxTextureSize,d={[Gi]:Ae,[Ae]:Gi,[_i]:_i},u=new Qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Nt},radius:{value:4}},vertexShader:tm,fragmentShader:em}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const g=new ti;g.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new kt(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jl;let f=this.type;this.render=function(A,T,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const M=n.getRenderTarget(),v=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),V=n.state;V.setBlending(Fi),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const B=f!==pi&&this.type===pi,N=f===pi&&this.type!==pi;for(let j=0,F=A.length;j<F;j++){const W=A[j],H=W.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;a.copy(H.mapSize);const K=H.getFrameExtents();if(a.multiply(K),r.copy(H.mapSize),(a.x>h||a.y>h)&&(a.x>h&&(r.x=Math.floor(h/K.x),a.x=r.x*K.x,H.mapSize.x=r.x),a.y>h&&(r.y=Math.floor(h/K.y),a.y=r.y*K.y,H.mapSize.y=r.y)),H.map===null||B===!0||N===!0){const at=this.type!==pi?{minFilter:Pe,magFilter:Pe}:{};H.map!==null&&H.map.dispose(),H.map=new fn(a.x,a.y,at),H.map.texture.name=W.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const Q=H.getViewportCount();for(let at=0;at<Q;at++){const St=H.getViewport(at);s.set(r.x*St.x,r.y*St.y,r.x*St.z,r.y*St.w),V.viewport(s),H.updateMatrices(W,at),i=H.getFrustum(),b(T,C,H.camera,W,this.type)}H.isPointLightShadow!==!0&&this.type===pi&&S(H,C),H.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(M,v,R)};function S(A,T){const C=t.update(w);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new fn(a.x,a.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(T,null,C,u,w,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(T,null,C,m,w,null)}function y(A,T,C,M){let v=null;const R=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)v=R;else if(v=C.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const V=v.uuid,B=T.uuid;let N=c[V];N===void 0&&(N={},c[V]=N);let j=N[B];j===void 0&&(j=v.clone(),N[B]=j,T.addEventListener("dispose",k)),v=j}if(v.visible=T.visible,v.wireframe=T.wireframe,M===pi?v.side=T.shadowSide!==null?T.shadowSide:T.side:v.side=T.shadowSide!==null?T.shadowSide:d[T.side],v.alphaMap=T.alphaMap,v.alphaTest=T.alphaTest,v.map=T.map,v.clipShadows=T.clipShadows,v.clippingPlanes=T.clippingPlanes,v.clipIntersection=T.clipIntersection,v.displacementMap=T.displacementMap,v.displacementScale=T.displacementScale,v.displacementBias=T.displacementBias,v.wireframeLinewidth=T.wireframeLinewidth,v.linewidth=T.linewidth,C.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const V=n.properties.get(v);V.light=C}return v}function b(A,T,C,M,v){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&v===pi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const B=t.update(A),N=A.material;if(Array.isArray(N)){const j=B.groups;for(let F=0,W=j.length;F<W;F++){const H=j[F],K=N[H.materialIndex];if(K&&K.visible){const Q=y(A,K,M,v);A.onBeforeShadow(n,A,T,C,B,Q,H),n.renderBufferDirect(C,null,B,Q,A,H),A.onAfterShadow(n,A,T,C,B,Q,H)}}}else if(N.visible){const j=y(A,N,M,v);A.onBeforeShadow(n,A,T,C,B,j,null),n.renderBufferDirect(C,null,B,j,A,null),A.onAfterShadow(n,A,T,C,B,j,null)}}const V=A.children;for(let B=0,N=V.length;B<N;B++)b(V[B],T,C,M,v)}function k(A){A.target.removeEventListener("dispose",k);for(const C in c){const M=c[C],v=A.target.uuid;v in M&&(M[v].dispose(),delete M[v])}}}const nm={[os]:ls,[cs]:fs,[hs]:us,[Xn]:ds,[ls]:os,[fs]:cs,[us]:hs,[ds]:Xn};function am(n,t){function e(){let P=!1;const rt=new Zt;let X=null;const Z=new Zt(0,0,0,0);return{setMask:function(ht){X!==ht&&!P&&(n.colorMask(ht,ht,ht,ht),X=ht)},setLocked:function(ht){P=ht},setClear:function(ht,lt,Ct,re,ge){ge===!0&&(ht*=re,lt*=re,Ct*=re),rt.set(ht,lt,Ct,re),Z.equals(rt)===!1&&(n.clearColor(ht,lt,Ct,re),Z.copy(rt))},reset:function(){P=!1,X=null,Z.set(-1,0,0,0)}}}function i(){let P=!1,rt=!1,X=null,Z=null,ht=null;return{setReversed:function(lt){if(rt!==lt){const Ct=t.get("EXT_clip_control");rt?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT);const re=ht;ht=null,this.setClear(re)}rt=lt},getReversed:function(){return rt},setTest:function(lt){lt?st(n.DEPTH_TEST):Et(n.DEPTH_TEST)},setMask:function(lt){X!==lt&&!P&&(n.depthMask(lt),X=lt)},setFunc:function(lt){if(rt&&(lt=nm[lt]),Z!==lt){switch(lt){case os:n.depthFunc(n.NEVER);break;case ls:n.depthFunc(n.ALWAYS);break;case cs:n.depthFunc(n.LESS);break;case Xn:n.depthFunc(n.LEQUAL);break;case hs:n.depthFunc(n.EQUAL);break;case ds:n.depthFunc(n.GEQUAL);break;case fs:n.depthFunc(n.GREATER);break;case us:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=lt}},setLocked:function(lt){P=lt},setClear:function(lt){ht!==lt&&(rt&&(lt=1-lt),n.clearDepth(lt),ht=lt)},reset:function(){P=!1,X=null,Z=null,ht=null,rt=!1}}}function a(){let P=!1,rt=null,X=null,Z=null,ht=null,lt=null,Ct=null,re=null,ge=null;return{setTest:function(Yt){P||(Yt?st(n.STENCIL_TEST):Et(n.STENCIL_TEST))},setMask:function(Yt){rt!==Yt&&!P&&(n.stencilMask(Yt),rt=Yt)},setFunc:function(Yt,We,oi){(X!==Yt||Z!==We||ht!==oi)&&(n.stencilFunc(Yt,We,oi),X=Yt,Z=We,ht=oi)},setOp:function(Yt,We,oi){(lt!==Yt||Ct!==We||re!==oi)&&(n.stencilOp(Yt,We,oi),lt=Yt,Ct=We,re=oi)},setLocked:function(Yt){P=Yt},setClear:function(Yt){ge!==Yt&&(n.clearStencil(Yt),ge=Yt)},reset:function(){P=!1,rt=null,X=null,Z=null,ht=null,lt=null,Ct=null,re=null,ge=null}}}const r=new e,s=new i,o=new a,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,m=[],g=null,w=!1,p=null,f=null,S=null,y=null,b=null,k=null,A=null,T=new Ft(0,0,0),C=0,M=!1,v=null,R=null,V=null,B=null,N=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,W=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(H)[1]),F=W>=1):H.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),F=W>=2);let K=null,Q={};const at=n.getParameter(n.SCISSOR_BOX),St=n.getParameter(n.VIEWPORT),Ut=new Zt().fromArray(at),q=new Zt().fromArray(St);function it(P,rt,X,Z){const ht=new Uint8Array(4),lt=n.createTexture();n.bindTexture(P,lt),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ct=0;Ct<X;Ct++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(rt,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,ht):n.texImage2D(rt+Ct,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ht);return lt}const vt={};vt[n.TEXTURE_2D]=it(n.TEXTURE_2D,n.TEXTURE_2D,1),vt[n.TEXTURE_CUBE_MAP]=it(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[n.TEXTURE_2D_ARRAY]=it(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),vt[n.TEXTURE_3D]=it(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),st(n.DEPTH_TEST),s.setFunc(Xn),Ot(!1),Bt(No),st(n.CULL_FACE),U(Fi);function st(P){h[P]!==!0&&(n.enable(P),h[P]=!0)}function Et(P){h[P]!==!1&&(n.disable(P),h[P]=!1)}function Rt(P,rt){return d[P]!==rt?(n.bindFramebuffer(P,rt),d[P]=rt,P===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=rt),P===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=rt),!0):!1}function zt(P,rt){let X=m,Z=!1;if(P){X=u.get(rt),X===void 0&&(X=[],u.set(rt,X));const ht=P.textures;if(X.length!==ht.length||X[0]!==n.COLOR_ATTACHMENT0){for(let lt=0,Ct=ht.length;lt<Ct;lt++)X[lt]=n.COLOR_ATTACHMENT0+lt;X.length=ht.length,Z=!0}}else X[0]!==n.BACK&&(X[0]=n.BACK,Z=!0);Z&&n.drawBuffers(X)}function ae(P){return g!==P?(n.useProgram(P),g=P,!0):!1}const Gt={[sn]:n.FUNC_ADD,[ah]:n.FUNC_SUBTRACT,[rh]:n.FUNC_REVERSE_SUBTRACT};Gt[sh]=n.MIN,Gt[oh]=n.MAX;const se={[lh]:n.ZERO,[ch]:n.ONE,[hh]:n.SRC_COLOR,[rs]:n.SRC_ALPHA,[gh]:n.SRC_ALPHA_SATURATE,[ph]:n.DST_COLOR,[fh]:n.DST_ALPHA,[dh]:n.ONE_MINUS_SRC_COLOR,[ss]:n.ONE_MINUS_SRC_ALPHA,[mh]:n.ONE_MINUS_DST_COLOR,[uh]:n.ONE_MINUS_DST_ALPHA,[_h]:n.CONSTANT_COLOR,[vh]:n.ONE_MINUS_CONSTANT_COLOR,[xh]:n.CONSTANT_ALPHA,[wh]:n.ONE_MINUS_CONSTANT_ALPHA};function U(P,rt,X,Z,ht,lt,Ct,re,ge,Yt){if(P===Fi){w===!0&&(Et(n.BLEND),w=!1);return}if(w===!1&&(st(n.BLEND),w=!0),P!==nh){if(P!==p||Yt!==M){if((f!==sn||b!==sn)&&(n.blendEquation(n.FUNC_ADD),f=sn,b=sn),Yt)switch(P){case Hn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fr:n.blendFunc(n.ONE,n.ONE);break;case Fo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Oo:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Hn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fr:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Fo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Oo:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}S=null,y=null,k=null,A=null,T.set(0,0,0),C=0,p=P,M=Yt}return}ht=ht||rt,lt=lt||X,Ct=Ct||Z,(rt!==f||ht!==b)&&(n.blendEquationSeparate(Gt[rt],Gt[ht]),f=rt,b=ht),(X!==S||Z!==y||lt!==k||Ct!==A)&&(n.blendFuncSeparate(se[X],se[Z],se[lt],se[Ct]),S=X,y=Z,k=lt,A=Ct),(re.equals(T)===!1||ge!==C)&&(n.blendColor(re.r,re.g,re.b,ge),T.copy(re),C=ge),p=P,M=!1}function Oe(P,rt){P.side===_i?Et(n.CULL_FACE):st(n.CULL_FACE);let X=P.side===Ae;rt&&(X=!X),Ot(X),P.blending===Hn&&P.transparent===!1?U(Fi):U(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),s.setFunc(P.depthFunc),s.setTest(P.depthTest),s.setMask(P.depthWrite),r.setMask(P.colorWrite);const Z=P.stencilWrite;o.setTest(Z),Z&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Qt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?st(n.SAMPLE_ALPHA_TO_COVERAGE):Et(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(P){v!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),v=P)}function Bt(P){P!==th?(st(n.CULL_FACE),P!==R&&(P===No?n.cullFace(n.BACK):P===eh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Et(n.CULL_FACE),R=P}function Mt(P){P!==V&&(F&&n.lineWidth(P),V=P)}function Qt(P,rt,X){P?(st(n.POLYGON_OFFSET_FILL),(B!==rt||N!==X)&&(n.polygonOffset(rt,X),B=rt,N=X)):Et(n.POLYGON_OFFSET_FILL)}function bt(P){P?st(n.SCISSOR_TEST):Et(n.SCISSOR_TEST)}function E(P){P===void 0&&(P=n.TEXTURE0+j-1),K!==P&&(n.activeTexture(P),K=P)}function _(P,rt,X){X===void 0&&(K===null?X=n.TEXTURE0+j-1:X=K);let Z=Q[X];Z===void 0&&(Z={type:void 0,texture:void 0},Q[X]=Z),(Z.type!==P||Z.texture!==rt)&&(K!==X&&(n.activeTexture(X),K=X),n.bindTexture(P,rt||vt[P]),Z.type=P,Z.texture=rt)}function z(){const P=Q[K];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function $(){try{n.compressedTexImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Y(){try{n.texSubImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function xt(){try{n.texSubImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ot(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ft(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Vt(){try{n.texStorage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function tt(){try{n.texStorage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ut(){try{n.texImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function yt(){try{n.texImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Tt(P){Ut.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),Ut.copy(P))}function pt(P){q.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),q.copy(P))}function Ht(P,rt){let X=c.get(rt);X===void 0&&(X=new WeakMap,c.set(rt,X));let Z=X.get(P);Z===void 0&&(Z=n.getUniformBlockIndex(rt,P.name),X.set(P,Z))}function Dt(P,rt){const Z=c.get(rt).get(P);l.get(rt)!==Z&&(n.uniformBlockBinding(rt,Z,P.__bindingPointIndex),l.set(rt,Z))}function Jt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},K=null,Q={},d={},u=new WeakMap,m=[],g=null,w=!1,p=null,f=null,S=null,y=null,b=null,k=null,A=null,T=new Ft(0,0,0),C=0,M=!1,v=null,R=null,V=null,B=null,N=null,Ut.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:st,disable:Et,bindFramebuffer:Rt,drawBuffers:zt,useProgram:ae,setBlending:U,setMaterial:Oe,setFlipSided:Ot,setCullFace:Bt,setLineWidth:Mt,setPolygonOffset:Qt,setScissorTest:bt,activeTexture:E,bindTexture:_,unbindTexture:z,compressedTexImage2D:$,compressedTexImage3D:J,texImage2D:ut,texImage3D:yt,updateUBOMapping:Ht,uniformBlockBinding:Dt,texStorage2D:Vt,texStorage3D:tt,texSubImage2D:Y,texSubImage3D:xt,compressedTexSubImage2D:ot,compressedTexSubImage3D:ft,scissor:Tt,viewport:pt,reset:Jt}}function Ul(n,t,e,i){const a=rm(i);switch(e){case ic:return n*t;case ac:return n*t;case rc:return n*t*2;case sc:return n*t/a.components*a.byteLength;case to:return n*t/a.components*a.byteLength;case oc:return n*t*2/a.components*a.byteLength;case eo:return n*t*2/a.components*a.byteLength;case nc:return n*t*3/a.components*a.byteLength;case Je:return n*t*4/a.components*a.byteLength;case io:return n*t*4/a.components*a.byteLength;case ir:case nr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ar:case rr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case vs:case ws:return Math.max(n,16)*Math.max(t,8)/4;case _s:case xs:return Math.max(n,8)*Math.max(t,8)/2;case bs:case Ms:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ys:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ss:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Es:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Ts:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case As:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Rs:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Cs:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Ls:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Ps:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ds:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Is:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Us:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ks:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case zs:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Ns:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case sr:case Fs:case Os:return Math.ceil(n/4)*Math.ceil(t/4)*16;case lc:case Bs:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Hs:case Gs:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function rm(n){switch(n){case yi:case Ql:return{byteLength:1,components:1};case ya:case tc:case Aa:return{byteLength:2,components:1};case Ks:case Qs:return{byteLength:2,components:4};case dn:case Js:case vi:return{byteLength:4,components:1};case ec:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function sm(n,t,e,i,a,r,s){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Nt,h=new WeakMap;let d;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,_){return m?new OffscreenCanvas(E,_):Sa("canvas")}function w(E,_,z){let $=1;const J=bt(E);if((J.width>z||J.height>z)&&($=z/Math.max(J.width,J.height)),$<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const Y=Math.floor($*J.width),xt=Math.floor($*J.height);d===void 0&&(d=g(Y,xt));const ot=_?g(Y,xt):d;return ot.width=Y,ot.height=xt,ot.getContext("2d").drawImage(E,0,0,Y,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+xt+")."),ot}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),E;return E}function p(E){return E.generateMipmaps}function f(E){n.generateMipmap(E)}function S(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(E,_,z,$,J=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Y=_;if(_===n.RED&&(z===n.FLOAT&&(Y=n.R32F),z===n.HALF_FLOAT&&(Y=n.R16F),z===n.UNSIGNED_BYTE&&(Y=n.R8)),_===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(Y=n.R8UI),z===n.UNSIGNED_SHORT&&(Y=n.R16UI),z===n.UNSIGNED_INT&&(Y=n.R32UI),z===n.BYTE&&(Y=n.R8I),z===n.SHORT&&(Y=n.R16I),z===n.INT&&(Y=n.R32I)),_===n.RG&&(z===n.FLOAT&&(Y=n.RG32F),z===n.HALF_FLOAT&&(Y=n.RG16F),z===n.UNSIGNED_BYTE&&(Y=n.RG8)),_===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(Y=n.RG8UI),z===n.UNSIGNED_SHORT&&(Y=n.RG16UI),z===n.UNSIGNED_INT&&(Y=n.RG32UI),z===n.BYTE&&(Y=n.RG8I),z===n.SHORT&&(Y=n.RG16I),z===n.INT&&(Y=n.RG32I)),_===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),z===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),z===n.UNSIGNED_INT&&(Y=n.RGB32UI),z===n.BYTE&&(Y=n.RGB8I),z===n.SHORT&&(Y=n.RGB16I),z===n.INT&&(Y=n.RGB32I)),_===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),z===n.UNSIGNED_INT&&(Y=n.RGBA32UI),z===n.BYTE&&(Y=n.RGBA8I),z===n.SHORT&&(Y=n.RGBA16I),z===n.INT&&(Y=n.RGBA32I)),_===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),_===n.RGBA){const xt=J?vr:Wt.getTransfer($);z===n.FLOAT&&(Y=n.RGBA32F),z===n.HALF_FLOAT&&(Y=n.RGBA16F),z===n.UNSIGNED_BYTE&&(Y=xt===$t?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function b(E,_){let z;return E?_===null||_===dn||_===$n?z=n.DEPTH24_STENCIL8:_===vi?z=n.DEPTH32F_STENCIL8:_===ya&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===dn||_===$n?z=n.DEPTH_COMPONENT24:_===vi?z=n.DEPTH_COMPONENT32F:_===ya&&(z=n.DEPTH_COMPONENT16),z}function k(E,_){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==Pe&&E.minFilter!==ai?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function A(E){const _=E.target;_.removeEventListener("dispose",A),C(_),_.isVideoTexture&&h.delete(_)}function T(E){const _=E.target;_.removeEventListener("dispose",T),v(_)}function C(E){const _=i.get(E);if(_.__webglInit===void 0)return;const z=E.source,$=u.get(z);if($){const J=$[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&M(E),Object.keys($).length===0&&u.delete(z)}i.remove(E)}function M(E){const _=i.get(E);n.deleteTexture(_.__webglTexture);const z=E.source,$=u.get(z);delete $[_.__cacheKey],s.memory.textures--}function v(E){const _=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let J=0;J<_.__webglFramebuffer[$].length;J++)n.deleteFramebuffer(_.__webglFramebuffer[$][J]);else n.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)n.deleteFramebuffer(_.__webglFramebuffer[$]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const z=E.textures;for(let $=0,J=z.length;$<J;$++){const Y=i.get(z[$]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),s.memory.textures--),i.remove(z[$])}i.remove(E)}let R=0;function V(){R=0}function B(){const E=R;return E>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+a.maxTextures),R+=1,E}function N(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function j(E,_){const z=i.get(E);if(E.isVideoTexture&&Mt(E),E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){const $=E.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(z,E,_);return}}e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+_)}function F(E,_){const z=i.get(E);if(E.version>0&&z.__version!==E.version){q(z,E,_);return}e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+_)}function W(E,_){const z=i.get(E);if(E.version>0&&z.__version!==E.version){q(z,E,_);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+_)}function H(E,_){const z=i.get(E);if(E.version>0&&z.__version!==E.version){it(z,E,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+_)}const K={[ur]:n.REPEAT,[ni]:n.CLAMP_TO_EDGE,[gs]:n.MIRRORED_REPEAT},Q={[Pe]:n.NEAREST,[Lh]:n.NEAREST_MIPMAP_NEAREST,[Ua]:n.NEAREST_MIPMAP_LINEAR,[ai]:n.LINEAR,[Rr]:n.LINEAR_MIPMAP_NEAREST,[ln]:n.LINEAR_MIPMAP_LINEAR},at={[Uh]:n.NEVER,[Bh]:n.ALWAYS,[kh]:n.LESS,[hc]:n.LEQUAL,[zh]:n.EQUAL,[Oh]:n.GEQUAL,[Nh]:n.GREATER,[Fh]:n.NOTEQUAL};function St(E,_){if(_.type===vi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===ai||_.magFilter===Rr||_.magFilter===Ua||_.magFilter===ln||_.minFilter===ai||_.minFilter===Rr||_.minFilter===Ua||_.minFilter===ln)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,K[_.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,K[_.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,K[_.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,Q[_.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,Q[_.minFilter]),_.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,at[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Pe||_.minFilter!==Ua&&_.minFilter!==ln||_.type===vi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,a.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Ut(E,_){let z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",A));const $=_.source;let J=u.get($);J===void 0&&(J={},u.set($,J));const Y=N(_);if(Y!==E.__cacheKey){J[Y]===void 0&&(J[Y]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,z=!0),J[Y].usedTimes++;const xt=J[E.__cacheKey];xt!==void 0&&(J[E.__cacheKey].usedTimes--,xt.usedTimes===0&&M(_)),E.__cacheKey=Y,E.__webglTexture=J[Y].texture}return z}function q(E,_,z){let $=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=n.TEXTURE_3D);const J=Ut(E,_),Y=_.source;e.bindTexture($,E.__webglTexture,n.TEXTURE0+z);const xt=i.get(Y);if(Y.version!==xt.__version||J===!0){e.activeTexture(n.TEXTURE0+z);const ot=Wt.getPrimaries(Wt.workingColorSpace),ft=_.colorSpace===Ui?null:Wt.getPrimaries(_.colorSpace),Vt=_.colorSpace===Ui||ot===ft?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let tt=w(_.image,!1,a.maxTextureSize);tt=Qt(_,tt);const ut=r.convert(_.format,_.colorSpace),yt=r.convert(_.type);let Tt=y(_.internalFormat,ut,yt,_.colorSpace,_.isVideoTexture);St($,_);let pt;const Ht=_.mipmaps,Dt=_.isVideoTexture!==!0,Jt=xt.__version===void 0||J===!0,P=Y.dataReady,rt=k(_,tt);if(_.isDepthTexture)Tt=b(_.format===Zn,_.type),Jt&&(Dt?e.texStorage2D(n.TEXTURE_2D,1,Tt,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,Tt,tt.width,tt.height,0,ut,yt,null));else if(_.isDataTexture)if(Ht.length>0){Dt&&Jt&&e.texStorage2D(n.TEXTURE_2D,rt,Tt,Ht[0].width,Ht[0].height);for(let X=0,Z=Ht.length;X<Z;X++)pt=Ht[X],Dt?P&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,pt.width,pt.height,ut,yt,pt.data):e.texImage2D(n.TEXTURE_2D,X,Tt,pt.width,pt.height,0,ut,yt,pt.data);_.generateMipmaps=!1}else Dt?(Jt&&e.texStorage2D(n.TEXTURE_2D,rt,Tt,tt.width,tt.height),P&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,tt.width,tt.height,ut,yt,tt.data)):e.texImage2D(n.TEXTURE_2D,0,Tt,tt.width,tt.height,0,ut,yt,tt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Dt&&Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,rt,Tt,Ht[0].width,Ht[0].height,tt.depth);for(let X=0,Z=Ht.length;X<Z;X++)if(pt=Ht[X],_.format!==Je)if(ut!==null)if(Dt){if(P)if(_.layerUpdates.size>0){const ht=Ul(pt.width,pt.height,_.format,_.type);for(const lt of _.layerUpdates){const Ct=pt.data.subarray(lt*ht/pt.data.BYTES_PER_ELEMENT,(lt+1)*ht/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,lt,pt.width,pt.height,1,ut,Ct)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,pt.width,pt.height,tt.depth,ut,pt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,X,Tt,pt.width,pt.height,tt.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?P&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,pt.width,pt.height,tt.depth,ut,yt,pt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,X,Tt,pt.width,pt.height,tt.depth,0,ut,yt,pt.data)}else{Dt&&Jt&&e.texStorage2D(n.TEXTURE_2D,rt,Tt,Ht[0].width,Ht[0].height);for(let X=0,Z=Ht.length;X<Z;X++)pt=Ht[X],_.format!==Je?ut!==null?Dt?P&&e.compressedTexSubImage2D(n.TEXTURE_2D,X,0,0,pt.width,pt.height,ut,pt.data):e.compressedTexImage2D(n.TEXTURE_2D,X,Tt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?P&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,pt.width,pt.height,ut,yt,pt.data):e.texImage2D(n.TEXTURE_2D,X,Tt,pt.width,pt.height,0,ut,yt,pt.data)}else if(_.isDataArrayTexture)if(Dt){if(Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,rt,Tt,tt.width,tt.height,tt.depth),P)if(_.layerUpdates.size>0){const X=Ul(tt.width,tt.height,_.format,_.type);for(const Z of _.layerUpdates){const ht=tt.data.subarray(Z*X/tt.data.BYTES_PER_ELEMENT,(Z+1)*X/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,tt.width,tt.height,1,ut,yt,ht)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ut,yt,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Tt,tt.width,tt.height,tt.depth,0,ut,yt,tt.data);else if(_.isData3DTexture)Dt?(Jt&&e.texStorage3D(n.TEXTURE_3D,rt,Tt,tt.width,tt.height,tt.depth),P&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ut,yt,tt.data)):e.texImage3D(n.TEXTURE_3D,0,Tt,tt.width,tt.height,tt.depth,0,ut,yt,tt.data);else if(_.isFramebufferTexture){if(Jt)if(Dt)e.texStorage2D(n.TEXTURE_2D,rt,Tt,tt.width,tt.height);else{let X=tt.width,Z=tt.height;for(let ht=0;ht<rt;ht++)e.texImage2D(n.TEXTURE_2D,ht,Tt,X,Z,0,ut,yt,null),X>>=1,Z>>=1}}else if(Ht.length>0){if(Dt&&Jt){const X=bt(Ht[0]);e.texStorage2D(n.TEXTURE_2D,rt,Tt,X.width,X.height)}for(let X=0,Z=Ht.length;X<Z;X++)pt=Ht[X],Dt?P&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,ut,yt,pt):e.texImage2D(n.TEXTURE_2D,X,Tt,ut,yt,pt);_.generateMipmaps=!1}else if(Dt){if(Jt){const X=bt(tt);e.texStorage2D(n.TEXTURE_2D,rt,Tt,X.width,X.height)}P&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut,yt,tt)}else e.texImage2D(n.TEXTURE_2D,0,Tt,ut,yt,tt);p(_)&&f($),xt.__version=Y.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function it(E,_,z){if(_.image.length!==6)return;const $=Ut(E,_),J=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+z);const Y=i.get(J);if(J.version!==Y.__version||$===!0){e.activeTexture(n.TEXTURE0+z);const xt=Wt.getPrimaries(Wt.workingColorSpace),ot=_.colorSpace===Ui?null:Wt.getPrimaries(_.colorSpace),ft=_.colorSpace===Ui||xt===ot?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const Vt=_.isCompressedTexture||_.image[0].isCompressedTexture,tt=_.image[0]&&_.image[0].isDataTexture,ut=[];for(let Z=0;Z<6;Z++)!Vt&&!tt?ut[Z]=w(_.image[Z],!0,a.maxCubemapSize):ut[Z]=tt?_.image[Z].image:_.image[Z],ut[Z]=Qt(_,ut[Z]);const yt=ut[0],Tt=r.convert(_.format,_.colorSpace),pt=r.convert(_.type),Ht=y(_.internalFormat,Tt,pt,_.colorSpace),Dt=_.isVideoTexture!==!0,Jt=Y.__version===void 0||$===!0,P=J.dataReady;let rt=k(_,yt);St(n.TEXTURE_CUBE_MAP,_);let X;if(Vt){Dt&&Jt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,rt,Ht,yt.width,yt.height);for(let Z=0;Z<6;Z++){X=ut[Z].mipmaps;for(let ht=0;ht<X.length;ht++){const lt=X[ht];_.format!==Je?Tt!==null?Dt?P&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht,0,0,lt.width,lt.height,Tt,lt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht,Ht,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?P&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht,0,0,lt.width,lt.height,Tt,pt,lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht,Ht,lt.width,lt.height,0,Tt,pt,lt.data)}}}else{if(X=_.mipmaps,Dt&&Jt){X.length>0&&rt++;const Z=bt(ut[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,rt,Ht,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(tt){Dt?P&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ut[Z].width,ut[Z].height,Tt,pt,ut[Z].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ht,ut[Z].width,ut[Z].height,0,Tt,pt,ut[Z].data);for(let ht=0;ht<X.length;ht++){const Ct=X[ht].image[Z].image;Dt?P&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht+1,0,0,Ct.width,Ct.height,Tt,pt,Ct.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht+1,Ht,Ct.width,Ct.height,0,Tt,pt,Ct.data)}}else{Dt?P&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Tt,pt,ut[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ht,Tt,pt,ut[Z]);for(let ht=0;ht<X.length;ht++){const lt=X[ht];Dt?P&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht+1,0,0,Tt,pt,lt.image[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht+1,Ht,Tt,pt,lt.image[Z])}}}p(_)&&f(n.TEXTURE_CUBE_MAP),Y.__version=J.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function vt(E,_,z,$,J,Y){const xt=r.convert(z.format,z.colorSpace),ot=r.convert(z.type),ft=y(z.internalFormat,xt,ot,z.colorSpace),Vt=i.get(_),tt=i.get(z);if(tt.__renderTarget=_,!Vt.__hasExternalTextures){const ut=Math.max(1,_.width>>Y),yt=Math.max(1,_.height>>Y);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?e.texImage3D(J,Y,ft,ut,yt,_.depth,0,xt,ot,null):e.texImage2D(J,Y,ft,ut,yt,0,xt,ot,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),Bt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,J,tt.__webglTexture,0,Ot(_)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,J,tt.__webglTexture,Y),e.bindFramebuffer(n.FRAMEBUFFER,null)}function st(E,_,z){if(n.bindRenderbuffer(n.RENDERBUFFER,E),_.depthBuffer){const $=_.depthTexture,J=$&&$.isDepthTexture?$.type:null,Y=b(_.stencilBuffer,J),xt=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=Ot(_);Bt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot,Y,_.width,_.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,Y,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Y,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xt,n.RENDERBUFFER,E)}else{const $=_.textures;for(let J=0;J<$.length;J++){const Y=$[J],xt=r.convert(Y.format,Y.colorSpace),ot=r.convert(Y.type),ft=y(Y.internalFormat,xt,ot,Y.colorSpace),Vt=Ot(_);z&&Bt(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Vt,ft,_.width,_.height):Bt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Vt,ft,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ft,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Et(E,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(_.depthTexture);$.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),j(_.depthTexture,0);const J=$.__webglTexture,Y=Ot(_);if(_.depthTexture.format===Gn)Bt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(_.depthTexture.format===Zn)Bt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Rt(E){const _=i.get(E),z=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){const $=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){const J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",J)};$.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=$}if(E.depthTexture&&!_.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Et(_.__webglFramebuffer,E)}else if(z){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=n.createRenderbuffer(),st(_.__webglDepthbuffer[$],E,!1);else{const J=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,Y)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),st(_.__webglDepthbuffer,E,!1);else{const $=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,J)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function zt(E,_,z){const $=i.get(E);_!==void 0&&vt($.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Rt(E)}function ae(E){const _=E.texture,z=i.get(E),$=i.get(_);E.addEventListener("dispose",T);const J=E.textures,Y=E.isWebGLCubeRenderTarget===!0,xt=J.length>1;if(xt||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=_.version,s.memory.textures++),Y){z.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[ot]=[];for(let ft=0;ft<_.mipmaps.length;ft++)z.__webglFramebuffer[ot][ft]=n.createFramebuffer()}else z.__webglFramebuffer[ot]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let ot=0;ot<_.mipmaps.length;ot++)z.__webglFramebuffer[ot]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(xt)for(let ot=0,ft=J.length;ot<ft;ot++){const Vt=i.get(J[ot]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=n.createTexture(),s.memory.textures++)}if(E.samples>0&&Bt(E)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ot=0;ot<J.length;ot++){const ft=J[ot];z.__webglColorRenderbuffer[ot]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[ot]);const Vt=r.convert(ft.format,ft.colorSpace),tt=r.convert(ft.type),ut=y(ft.internalFormat,Vt,tt,ft.colorSpace,E.isXRRenderTarget===!0),yt=Ot(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,yt,ut,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ot,n.RENDERBUFFER,z.__webglColorRenderbuffer[ot])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),st(z.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),St(n.TEXTURE_CUBE_MAP,_);for(let ot=0;ot<6;ot++)if(_.mipmaps&&_.mipmaps.length>0)for(let ft=0;ft<_.mipmaps.length;ft++)vt(z.__webglFramebuffer[ot][ft],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ft);else vt(z.__webglFramebuffer[ot],E,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);p(_)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let ot=0,ft=J.length;ot<ft;ot++){const Vt=J[ot],tt=i.get(Vt);e.bindTexture(n.TEXTURE_2D,tt.__webglTexture),St(n.TEXTURE_2D,Vt),vt(z.__webglFramebuffer,E,Vt,n.COLOR_ATTACHMENT0+ot,n.TEXTURE_2D,0),p(Vt)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let ot=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ot=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ot,$.__webglTexture),St(ot,_),_.mipmaps&&_.mipmaps.length>0)for(let ft=0;ft<_.mipmaps.length;ft++)vt(z.__webglFramebuffer[ft],E,_,n.COLOR_ATTACHMENT0,ot,ft);else vt(z.__webglFramebuffer,E,_,n.COLOR_ATTACHMENT0,ot,0);p(_)&&f(ot),e.unbindTexture()}E.depthBuffer&&Rt(E)}function Gt(E){const _=E.textures;for(let z=0,$=_.length;z<$;z++){const J=_[z];if(p(J)){const Y=S(E),xt=i.get(J).__webglTexture;e.bindTexture(Y,xt),f(Y),e.unbindTexture()}}}const se=[],U=[];function Oe(E){if(E.samples>0){if(Bt(E)===!1){const _=E.textures,z=E.width,$=E.height;let J=n.COLOR_BUFFER_BIT;const Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xt=i.get(E),ot=_.length>1;if(ot)for(let ft=0;ft<_.length;ft++)e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let ft=0;ft<_.length;ft++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),ot){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xt.__webglColorRenderbuffer[ft]);const Vt=i.get(_[ft]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Vt,0)}n.blitFramebuffer(0,0,z,$,0,0,z,$,J,n.NEAREST),l===!0&&(se.length=0,U.length=0,se.push(n.COLOR_ATTACHMENT0+ft),E.depthBuffer&&E.resolveDepthBuffer===!1&&(se.push(Y),U.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,U)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,se))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ot)for(let ft=0;ft<_.length;ft++){e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,xt.__webglColorRenderbuffer[ft]);const Vt=i.get(_[ft]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,Vt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const _=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Ot(E){return Math.min(a.maxSamples,E.samples)}function Bt(E){const _=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Mt(E){const _=s.render.frame;h.get(E)!==_&&(h.set(E,_),E.update())}function Qt(E,_){const z=E.colorSpace,$=E.format,J=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||z!==ia&&z!==Ui&&(Wt.getTransfer(z)===$t?($!==Je||J!==yi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),_}function bt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=V,this.setTexture2D=j,this.setTexture2DArray=F,this.setTexture3D=W,this.setTextureCube=H,this.rebindTextures=zt,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Bt}function om(n,t){function e(i,a=Ui){let r;const s=Wt.getTransfer(a);if(i===yi)return n.UNSIGNED_BYTE;if(i===Ks)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Qs)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ec)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ql)return n.BYTE;if(i===tc)return n.SHORT;if(i===ya)return n.UNSIGNED_SHORT;if(i===Js)return n.INT;if(i===dn)return n.UNSIGNED_INT;if(i===vi)return n.FLOAT;if(i===Aa)return n.HALF_FLOAT;if(i===ic)return n.ALPHA;if(i===nc)return n.RGB;if(i===Je)return n.RGBA;if(i===ac)return n.LUMINANCE;if(i===rc)return n.LUMINANCE_ALPHA;if(i===Gn)return n.DEPTH_COMPONENT;if(i===Zn)return n.DEPTH_STENCIL;if(i===sc)return n.RED;if(i===to)return n.RED_INTEGER;if(i===oc)return n.RG;if(i===eo)return n.RG_INTEGER;if(i===io)return n.RGBA_INTEGER;if(i===ir||i===nr||i===ar||i===rr)if(s===$t)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ir)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ir)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===nr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===rr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_s||i===vs||i===xs||i===ws)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===_s)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===vs)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xs)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ws)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===bs||i===Ms||i===ys)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===bs||i===Ms)return s===$t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ys)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ss||i===Es||i===Ts||i===As||i===Rs||i===Cs||i===Ls||i===Ps||i===Ds||i===Is||i===Us||i===ks||i===zs||i===Ns)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ss)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Es)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ts)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===As)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Rs)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Cs)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ls)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ps)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ds)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Is)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Us)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ks)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===zs)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ns)return s===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sr||i===Fs||i===Os)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===sr)return s===$t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Fs)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Os)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===lc||i===Bs||i===Hs||i===Gs)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===sr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Bs)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Hs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Gs)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===$n?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class lm extends xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ke extends ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cm={type:"move"};class es{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let a=null,r=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){s=!0;for(const w of t.hand.values()){const p=e.getJointPose(w,i),f=this._getHandJoint(c,w);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&u>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=e.getPose(t.targetRaySpace,i),a===null&&r!==null&&(a=r),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cm)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Ke;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const hm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dm=`
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

}`;class fm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const a=new Me,r=t.properties.get(a);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Qe({vertexShader:hm,fragmentShader:dm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new kt(new Re(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class um extends gn{constructor(t,e){super();const i=this;let a=null,r=1,s=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,m=null,g=null;const w=new fm,p=e.getContextAttributes();let f=null,S=null;const y=[],b=[],k=new Nt;let A=null;const T=new xe;T.viewport=new Zt;const C=new xe;C.viewport=new Zt;const M=[T,C],v=new lm;let R=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let it=y[q];return it===void 0&&(it=new es,y[q]=it),it.getTargetRaySpace()},this.getControllerGrip=function(q){let it=y[q];return it===void 0&&(it=new es,y[q]=it),it.getGripSpace()},this.getHand=function(q){let it=y[q];return it===void 0&&(it=new es,y[q]=it),it.getHandSpace()};function B(q){const it=b.indexOf(q.inputSource);if(it===-1)return;const vt=y[it];vt!==void 0&&(vt.update(q.inputSource,q.frame,c||s),vt.dispatchEvent({type:q.type,data:q.inputSource}))}function N(){a.removeEventListener("select",B),a.removeEventListener("selectstart",B),a.removeEventListener("selectend",B),a.removeEventListener("squeeze",B),a.removeEventListener("squeezestart",B),a.removeEventListener("squeezeend",B),a.removeEventListener("end",N),a.removeEventListener("inputsourceschange",j);for(let q=0;q<y.length;q++){const it=b[q];it!==null&&(b[q]=null,y[q].disconnect(it))}R=null,V=null,w.reset(),t.setRenderTarget(f),m=null,u=null,d=null,a=null,S=null,Ut.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(k.width,k.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(q){if(a=q,a!==null){if(f=t.getRenderTarget(),a.addEventListener("select",B),a.addEventListener("selectstart",B),a.addEventListener("selectend",B),a.addEventListener("squeeze",B),a.addEventListener("squeezestart",B),a.addEventListener("squeezeend",B),a.addEventListener("end",N),a.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(k),a.renderState.layers===void 0){const it={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(a,e,it),a.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new fn(m.framebufferWidth,m.framebufferHeight,{format:Je,type:yi,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let it=null,vt=null,st=null;p.depth&&(st=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=p.stencil?Zn:Gn,vt=p.stencil?$n:dn);const Et={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:r};d=new XRWebGLBinding(a,e),u=d.createProjectionLayer(Et),a.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new fn(u.textureWidth,u.textureHeight,{format:Je,type:yi,depthTexture:new Mc(u.textureWidth,u.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await a.requestReferenceSpace(o),Ut.setContext(a),Ut.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function j(q){for(let it=0;it<q.removed.length;it++){const vt=q.removed[it],st=b.indexOf(vt);st>=0&&(b[st]=null,y[st].disconnect(vt))}for(let it=0;it<q.added.length;it++){const vt=q.added[it];let st=b.indexOf(vt);if(st===-1){for(let Rt=0;Rt<y.length;Rt++)if(Rt>=b.length){b.push(vt),st=Rt;break}else if(b[Rt]===null){b[Rt]=vt,st=Rt;break}if(st===-1)break}const Et=y[st];Et&&Et.connect(vt)}}const F=new L,W=new L;function H(q,it,vt){F.setFromMatrixPosition(it.matrixWorld),W.setFromMatrixPosition(vt.matrixWorld);const st=F.distanceTo(W),Et=it.projectionMatrix.elements,Rt=vt.projectionMatrix.elements,zt=Et[14]/(Et[10]-1),ae=Et[14]/(Et[10]+1),Gt=(Et[9]+1)/Et[5],se=(Et[9]-1)/Et[5],U=(Et[8]-1)/Et[0],Oe=(Rt[8]+1)/Rt[0],Ot=zt*U,Bt=zt*Oe,Mt=st/(-U+Oe),Qt=Mt*-U;if(it.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Qt),q.translateZ(Mt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Et[10]===-1)q.projectionMatrix.copy(it.projectionMatrix),q.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const bt=zt+Mt,E=ae+Mt,_=Ot-Qt,z=Bt+(st-Qt),$=Gt*ae/E*bt,J=se*ae/E*bt;q.projectionMatrix.makePerspective(_,z,$,J,bt,E),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function K(q,it){it===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(it.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(a===null)return;let it=q.near,vt=q.far;w.texture!==null&&(w.depthNear>0&&(it=w.depthNear),w.depthFar>0&&(vt=w.depthFar)),v.near=C.near=T.near=it,v.far=C.far=T.far=vt,(R!==v.near||V!==v.far)&&(a.updateRenderState({depthNear:v.near,depthFar:v.far}),R=v.near,V=v.far),T.layers.mask=q.layers.mask|2,C.layers.mask=q.layers.mask|4,v.layers.mask=T.layers.mask|C.layers.mask;const st=q.parent,Et=v.cameras;K(v,st);for(let Rt=0;Rt<Et.length;Rt++)K(Et[Rt],st);Et.length===2?H(v,T,C):v.projectionMatrix.copy(T.projectionMatrix),Q(q,v,st)};function Q(q,it,vt){vt===null?q.matrix.copy(it.matrixWorld):(q.matrix.copy(vt.matrixWorld),q.matrix.invert(),q.matrix.multiply(it.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(it.projectionMatrix),q.projectionMatrixInverse.copy(it.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Jn*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=q)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(v)};let at=null;function St(q,it){if(h=it.getViewerPose(c||s),g=it,h!==null){const vt=h.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let st=!1;vt.length!==v.cameras.length&&(v.cameras.length=0,st=!0);for(let Rt=0;Rt<vt.length;Rt++){const zt=vt[Rt];let ae=null;if(m!==null)ae=m.getViewport(zt);else{const se=d.getViewSubImage(u,zt);ae=se.viewport,Rt===0&&(t.setRenderTargetTextures(S,se.colorTexture,u.ignoreDepthValues?void 0:se.depthStencilTexture),t.setRenderTarget(S))}let Gt=M[Rt];Gt===void 0&&(Gt=new xe,Gt.layers.enable(Rt),Gt.viewport=new Zt,M[Rt]=Gt),Gt.matrix.fromArray(zt.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(zt.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(ae.x,ae.y,ae.width,ae.height),Rt===0&&(v.matrix.copy(Gt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),st===!0&&v.cameras.push(Gt)}const Et=a.enabledFeatures;if(Et&&Et.includes("depth-sensing")){const Rt=d.getDepthInformation(vt[0]);Rt&&Rt.isValid&&Rt.texture&&w.init(t,Rt,a.renderState)}}for(let vt=0;vt<y.length;vt++){const st=b[vt],Et=y[vt];st!==null&&Et!==void 0&&Et.update(st,it,c||s)}at&&at(q,it),it.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:it}),g=null}const Ut=new bc;Ut.setAnimationLoop(St),this.setAnimationLoop=function(q){at=q},this.dispose=function(){}}}const tn=new Ce,pm=new ne;function mm(n,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,vc(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function a(p,f,S,y,b){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(p,f):f.isMeshToonMaterial?(r(p,f),d(p,f)):f.isMeshPhongMaterial?(r(p,f),h(p,f)):f.isMeshStandardMaterial?(r(p,f),u(p,f),f.isMeshPhysicalMaterial&&m(p,f,b)):f.isMeshMatcapMaterial?(r(p,f),g(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),w(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(s(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,S,y):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ae&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ae&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const S=t.get(f),y=S.envMap,b=S.envMapRotation;y&&(p.envMap.value=y,tn.copy(b),tn.x*=-1,tn.y*=-1,tn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(tn.y*=-1,tn.z*=-1),p.envMapRotation.value.setFromMatrix4(pm.makeRotationFromEuler(tn)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function s(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,S,y){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*S,p.scale.value=y*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,S){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ae&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function w(p,f){const S=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function gm(n,t,e,i){let a={},r={},s=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,y){const b=y.program;i.uniformBlockBinding(S,b)}function c(S,y){let b=a[S.id];b===void 0&&(g(S),b=h(S),a[S.id]=b,S.addEventListener("dispose",p));const k=y.program;i.updateUBOMapping(S,k);const A=t.render.frame;r[S.id]!==A&&(u(S),r[S.id]=A)}function h(S){const y=d();S.__bindingPointIndex=y;const b=n.createBuffer(),k=S.__size,A=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,k,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,b),b}function d(){for(let S=0;S<o;S++)if(s.indexOf(S)===-1)return s.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const y=a[S.id],b=S.uniforms,k=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let A=0,T=b.length;A<T;A++){const C=Array.isArray(b[A])?b[A]:[b[A]];for(let M=0,v=C.length;M<v;M++){const R=C[M];if(m(R,A,M,k)===!0){const V=R.__offset,B=Array.isArray(R.value)?R.value:[R.value];let N=0;for(let j=0;j<B.length;j++){const F=B[j],W=w(F);typeof F=="number"||typeof F=="boolean"?(R.__data[0]=F,n.bufferSubData(n.UNIFORM_BUFFER,V+N,R.__data)):F.isMatrix3?(R.__data[0]=F.elements[0],R.__data[1]=F.elements[1],R.__data[2]=F.elements[2],R.__data[3]=0,R.__data[4]=F.elements[3],R.__data[5]=F.elements[4],R.__data[6]=F.elements[5],R.__data[7]=0,R.__data[8]=F.elements[6],R.__data[9]=F.elements[7],R.__data[10]=F.elements[8],R.__data[11]=0):(F.toArray(R.__data,N),N+=W.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,V,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(S,y,b,k){const A=S.value,T=y+"_"+b;if(k[T]===void 0)return typeof A=="number"||typeof A=="boolean"?k[T]=A:k[T]=A.clone(),!0;{const C=k[T];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return k[T]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function g(S){const y=S.uniforms;let b=0;const k=16;for(let T=0,C=y.length;T<C;T++){const M=Array.isArray(y[T])?y[T]:[y[T]];for(let v=0,R=M.length;v<R;v++){const V=M[v],B=Array.isArray(V.value)?V.value:[V.value];for(let N=0,j=B.length;N<j;N++){const F=B[N],W=w(F),H=b%k,K=H%W.boundary,Q=H+K;b+=K,Q!==0&&k-Q<W.storage&&(b+=k-Q),V.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=b,b+=W.storage}}}const A=b%k;return A>0&&(b+=k-A),S.__size=b,S.__cache={},this}function w(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function p(S){const y=S.target;y.removeEventListener("dispose",p);const b=s.indexOf(y.__bindingPointIndex);s.splice(b,1),n.deleteBuffer(a[y.id]),delete a[y.id],delete r[y.id]}function f(){for(const S in a)n.deleteBuffer(a[S]);s=[],a={},r={}}return{bind:l,update:c,dispose:f}}class _m{constructor(t={}){const{canvas:e=ad(),context:i=null,depth:a=!0,stencil:r=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=s;const g=new Uint32Array(4),w=new Int32Array(4);let p=null,f=null;const S=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ee,this.toneMapping=Oi,this.toneMappingExposure=1;const b=this;let k=!1,A=0,T=0,C=null,M=-1,v=null;const R=new Zt,V=new Zt;let B=null;const N=new Ft(0);let j=0,F=e.width,W=e.height,H=1,K=null,Q=null;const at=new Zt(0,0,F,W),St=new Zt(0,0,F,W);let Ut=!1;const q=new so;let it=!1,vt=!1;const st=new ne,Et=new ne,Rt=new L,zt=new Zt,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function se(){return C===null?H:1}let U=i;function Oe(x,D){return e.getContext(x,D)}try{const x={alpha:!0,depth:a,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${$s}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",ht,!1),e.addEventListener("webglcontextcreationerror",lt,!1),U===null){const D="webgl2";if(U=Oe(D,x),U===null)throw Oe(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Ot,Bt,Mt,Qt,bt,E,_,z,$,J,Y,xt,ot,ft,Vt,tt,ut,yt,Tt,pt,Ht,Dt,Jt,P;function rt(){Ot=new M0(U),Ot.init(),Dt=new om(U,Ot),Bt=new g0(U,Ot,t,Dt),Mt=new am(U,Ot),Bt.reverseDepthBuffer&&u&&Mt.buffers.depth.setReversed(!0),Qt=new E0(U),bt=new Vp,E=new sm(U,Ot,Mt,bt,Bt,Dt,Qt),_=new v0(b),z=new b0(b),$=new Pd(U),Jt=new p0(U,$),J=new y0(U,$,Qt,Jt),Y=new A0(U,J,$,Qt),Tt=new T0(U,Bt,E),tt=new _0(bt),xt=new Gp(b,_,z,Ot,Bt,Jt,tt),ot=new mm(b,bt),ft=new jp,Vt=new Jp(Ot),yt=new u0(b,_,z,Mt,Y,m,l),ut=new im(b,Y,Bt),P=new gm(U,Qt,Bt,Mt),pt=new m0(U,Ot,Qt),Ht=new S0(U,Ot,Qt),Qt.programs=xt.programs,b.capabilities=Bt,b.extensions=Ot,b.properties=bt,b.renderLists=ft,b.shadowMap=ut,b.state=Mt,b.info=Qt}rt();const X=new um(b,U);this.xr=X,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const x=Ot.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ot.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(x){x!==void 0&&(H=x,this.setSize(F,W,!1))},this.getSize=function(x){return x.set(F,W)},this.setSize=function(x,D,O=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=x,W=D,e.width=Math.floor(x*H),e.height=Math.floor(D*H),O===!0&&(e.style.width=x+"px",e.style.height=D+"px"),this.setViewport(0,0,x,D)},this.getDrawingBufferSize=function(x){return x.set(F*H,W*H).floor()},this.setDrawingBufferSize=function(x,D,O){F=x,W=D,H=O,e.width=Math.floor(x*O),e.height=Math.floor(D*O),this.setViewport(0,0,x,D)},this.getCurrentViewport=function(x){return x.copy(R)},this.getViewport=function(x){return x.copy(at)},this.setViewport=function(x,D,O,G){x.isVector4?at.set(x.x,x.y,x.z,x.w):at.set(x,D,O,G),Mt.viewport(R.copy(at).multiplyScalar(H).round())},this.getScissor=function(x){return x.copy(St)},this.setScissor=function(x,D,O,G){x.isVector4?St.set(x.x,x.y,x.z,x.w):St.set(x,D,O,G),Mt.scissor(V.copy(St).multiplyScalar(H).round())},this.getScissorTest=function(){return Ut},this.setScissorTest=function(x){Mt.setScissorTest(Ut=x)},this.setOpaqueSort=function(x){K=x},this.setTransparentSort=function(x){Q=x},this.getClearColor=function(x){return x.copy(yt.getClearColor())},this.setClearColor=function(){yt.setClearColor.apply(yt,arguments)},this.getClearAlpha=function(){return yt.getClearAlpha()},this.setClearAlpha=function(){yt.setClearAlpha.apply(yt,arguments)},this.clear=function(x=!0,D=!0,O=!0){let G=0;if(x){let I=!1;if(C!==null){const et=C.texture.format;I=et===io||et===eo||et===to}if(I){const et=C.texture.type,ct=et===yi||et===dn||et===ya||et===$n||et===Ks||et===Qs,mt=yt.getClearColor(),gt=yt.getClearAlpha(),At=mt.r,Lt=mt.g,_t=mt.b;ct?(g[0]=At,g[1]=Lt,g[2]=_t,g[3]=gt,U.clearBufferuiv(U.COLOR,0,g)):(w[0]=At,w[1]=Lt,w[2]=_t,w[3]=gt,U.clearBufferiv(U.COLOR,0,w))}else G|=U.COLOR_BUFFER_BIT}D&&(G|=U.DEPTH_BUFFER_BIT),O&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",ht,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),ft.dispose(),Vt.dispose(),bt.dispose(),_.dispose(),z.dispose(),Y.dispose(),Jt.dispose(),P.dispose(),xt.dispose(),X.dispose(),X.removeEventListener("sessionstart",Co),X.removeEventListener("sessionend",Lo),Yi.stop()};function Z(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function ht(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;const x=Qt.autoReset,D=ut.enabled,O=ut.autoUpdate,G=ut.needsUpdate,I=ut.type;rt(),Qt.autoReset=x,ut.enabled=D,ut.autoUpdate=O,ut.needsUpdate=G,ut.type=I}function lt(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Ct(x){const D=x.target;D.removeEventListener("dispose",Ct),re(D)}function re(x){ge(x),bt.remove(x)}function ge(x){const D=bt.get(x).programs;D!==void 0&&(D.forEach(function(O){xt.releaseProgram(O)}),x.isShaderMaterial&&xt.releaseShaderCache(x))}this.renderBufferDirect=function(x,D,O,G,I,et){D===null&&(D=ae);const ct=I.isMesh&&I.matrixWorld.determinant()<0,mt=Jc(x,D,O,G,I);Mt.setMaterial(G,ct);let gt=O.index,At=1;if(G.wireframe===!0){if(gt=J.getWireframeAttribute(O),gt===void 0)return;At=2}const Lt=O.drawRange,_t=O.attributes.position;let jt=Lt.start*At,Kt=(Lt.start+Lt.count)*At;et!==null&&(jt=Math.max(jt,et.start*At),Kt=Math.min(Kt,(et.start+et.count)*At)),gt!==null?(jt=Math.max(jt,0),Kt=Math.min(Kt,gt.count)):_t!=null&&(jt=Math.max(jt,0),Kt=Math.min(Kt,_t.count));const te=Kt-jt;if(te<0||te===1/0)return;Jt.setup(I,G,mt,O,gt);let Le,Xt=pt;if(gt!==null&&(Le=$.get(gt),Xt=Ht,Xt.setIndex(Le)),I.isMesh)G.wireframe===!0?(Mt.setLineWidth(G.wireframeLinewidth*se()),Xt.setMode(U.LINES)):Xt.setMode(U.TRIANGLES);else if(I.isLine){let wt=G.linewidth;wt===void 0&&(wt=1),Mt.setLineWidth(wt*se()),I.isLineSegments?Xt.setMode(U.LINES):I.isLineLoop?Xt.setMode(U.LINE_LOOP):Xt.setMode(U.LINE_STRIP)}else I.isPoints?Xt.setMode(U.POINTS):I.isSprite&&Xt.setMode(U.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Xt.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Ot.get("WEBGL_multi_draw"))Xt.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const wt=I._multiDrawStarts,li=I._multiDrawCounts,qt=I._multiDrawCount,je=gt?$.get(gt).bytesPerElement:1,_n=bt.get(G).currentProgram.getUniforms();for(let De=0;De<qt;De++)_n.setValue(U,"_gl_DrawID",De),Xt.render(wt[De]/je,li[De])}else if(I.isInstancedMesh)Xt.renderInstances(jt,te,I.count);else if(O.isInstancedBufferGeometry){const wt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,li=Math.min(O.instanceCount,wt);Xt.renderInstances(jt,te,li)}else Xt.render(jt,te)};function Yt(x,D,O){x.transparent===!0&&x.side===_i&&x.forceSinglePass===!1?(x.side=Ae,x.needsUpdate=!0,Ia(x,D,O),x.side=Gi,x.needsUpdate=!0,Ia(x,D,O),x.side=_i):Ia(x,D,O)}this.compile=function(x,D,O=null){O===null&&(O=x),f=Vt.get(O),f.init(D),y.push(f),O.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(f.pushLight(I),I.castShadow&&f.pushShadow(I))}),x!==O&&x.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(f.pushLight(I),I.castShadow&&f.pushShadow(I))}),f.setupLights();const G=new Set;return x.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const et=I.material;if(et)if(Array.isArray(et))for(let ct=0;ct<et.length;ct++){const mt=et[ct];Yt(mt,O,I),G.add(mt)}else Yt(et,O,I),G.add(et)}),y.pop(),f=null,G},this.compileAsync=function(x,D,O=null){const G=this.compile(x,D,O);return new Promise(I=>{function et(){if(G.forEach(function(ct){bt.get(ct).currentProgram.isReady()&&G.delete(ct)}),G.size===0){I(x);return}setTimeout(et,10)}Ot.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let We=null;function oi(x){We&&We(x)}function Co(){Yi.stop()}function Lo(){Yi.start()}const Yi=new bc;Yi.setAnimationLoop(oi),typeof self<"u"&&Yi.setContext(self),this.setAnimationLoop=function(x){We=x,X.setAnimationLoop(x),x===null?Yi.stop():Yi.start()},X.addEventListener("sessionstart",Co),X.addEventListener("sessionend",Lo),this.render=function(x,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(D),D=X.getCamera()),x.isScene===!0&&x.onBeforeRender(b,x,D,C),f=Vt.get(x,y.length),f.init(D),y.push(f),Et.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),q.setFromProjectionMatrix(Et),vt=this.localClippingEnabled,it=tt.init(this.clippingPlanes,vt),p=ft.get(x,S.length),p.init(),S.push(p),X.enabled===!0&&X.isPresenting===!0){const et=b.xr.getDepthSensingMesh();et!==null&&Ar(et,D,-1/0,b.sortObjects)}Ar(x,D,0,b.sortObjects),p.finish(),b.sortObjects===!0&&p.sort(K,Q),Gt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Gt&&yt.addToRenderList(p,x),this.info.render.frame++,it===!0&&tt.beginShadows();const O=f.state.shadowsArray;ut.render(O,x,D),it===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=p.opaque,I=p.transmissive;if(f.setupLights(),D.isArrayCamera){const et=D.cameras;if(I.length>0)for(let ct=0,mt=et.length;ct<mt;ct++){const gt=et[ct];Do(G,I,x,gt)}Gt&&yt.render(x);for(let ct=0,mt=et.length;ct<mt;ct++){const gt=et[ct];Po(p,x,gt,gt.viewport)}}else I.length>0&&Do(G,I,x,D),Gt&&yt.render(x),Po(p,x,D);C!==null&&(E.updateMultisampleRenderTarget(C),E.updateRenderTargetMipmap(C)),x.isScene===!0&&x.onAfterRender(b,x,D),Jt.resetDefaultState(),M=-1,v=null,y.pop(),y.length>0?(f=y[y.length-1],it===!0&&tt.setGlobalState(b.clippingPlanes,f.state.camera)):f=null,S.pop(),S.length>0?p=S[S.length-1]:p=null};function Ar(x,D,O,G){if(x.visible===!1)return;if(x.layers.test(D.layers)){if(x.isGroup)O=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(D);else if(x.isLight)f.pushLight(x),x.castShadow&&f.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||q.intersectsSprite(x)){G&&zt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Et);const ct=Y.update(x),mt=x.material;mt.visible&&p.push(x,ct,mt,O,zt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||q.intersectsObject(x))){const ct=Y.update(x),mt=x.material;if(G&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),zt.copy(x.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),zt.copy(ct.boundingSphere.center)),zt.applyMatrix4(x.matrixWorld).applyMatrix4(Et)),Array.isArray(mt)){const gt=ct.groups;for(let At=0,Lt=gt.length;At<Lt;At++){const _t=gt[At],jt=mt[_t.materialIndex];jt&&jt.visible&&p.push(x,ct,jt,O,zt.z,_t)}}else mt.visible&&p.push(x,ct,mt,O,zt.z,null)}}const et=x.children;for(let ct=0,mt=et.length;ct<mt;ct++)Ar(et[ct],D,O,G)}function Po(x,D,O,G){const I=x.opaque,et=x.transmissive,ct=x.transparent;f.setupLightsView(O),it===!0&&tt.setGlobalState(b.clippingPlanes,O),G&&Mt.viewport(R.copy(G)),I.length>0&&Da(I,D,O),et.length>0&&Da(et,D,O),ct.length>0&&Da(ct,D,O),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Do(x,D,O,G){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[G.id]===void 0&&(f.state.transmissionRenderTarget[G.id]=new fn(1,1,{generateMipmaps:!0,type:Ot.has("EXT_color_buffer_half_float")||Ot.has("EXT_color_buffer_float")?Aa:yi,minFilter:ln,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace}));const et=f.state.transmissionRenderTarget[G.id],ct=G.viewport||R;et.setSize(ct.z,ct.w);const mt=b.getRenderTarget();b.setRenderTarget(et),b.getClearColor(N),j=b.getClearAlpha(),j<1&&b.setClearColor(16777215,.5),b.clear(),Gt&&yt.render(O);const gt=b.toneMapping;b.toneMapping=Oi;const At=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),f.setupLightsView(G),it===!0&&tt.setGlobalState(b.clippingPlanes,G),Da(x,O,G),E.updateMultisampleRenderTarget(et),E.updateRenderTargetMipmap(et),Ot.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let _t=0,jt=D.length;_t<jt;_t++){const Kt=D[_t],te=Kt.object,Le=Kt.geometry,Xt=Kt.material,wt=Kt.group;if(Xt.side===_i&&te.layers.test(G.layers)){const li=Xt.side;Xt.side=Ae,Xt.needsUpdate=!0,Io(te,O,G,Le,Xt,wt),Xt.side=li,Xt.needsUpdate=!0,Lt=!0}}Lt===!0&&(E.updateMultisampleRenderTarget(et),E.updateRenderTargetMipmap(et))}b.setRenderTarget(mt),b.setClearColor(N,j),At!==void 0&&(G.viewport=At),b.toneMapping=gt}function Da(x,D,O){const G=D.isScene===!0?D.overrideMaterial:null;for(let I=0,et=x.length;I<et;I++){const ct=x[I],mt=ct.object,gt=ct.geometry,At=G===null?ct.material:G,Lt=ct.group;mt.layers.test(O.layers)&&Io(mt,D,O,gt,At,Lt)}}function Io(x,D,O,G,I,et){x.onBeforeRender(b,D,O,G,I,et),x.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),I.onBeforeRender(b,D,O,G,x,et),I.transparent===!0&&I.side===_i&&I.forceSinglePass===!1?(I.side=Ae,I.needsUpdate=!0,b.renderBufferDirect(O,D,G,I,x,et),I.side=Gi,I.needsUpdate=!0,b.renderBufferDirect(O,D,G,I,x,et),I.side=_i):b.renderBufferDirect(O,D,G,I,x,et),x.onAfterRender(b,D,O,G,I,et)}function Ia(x,D,O){D.isScene!==!0&&(D=ae);const G=bt.get(x),I=f.state.lights,et=f.state.shadowsArray,ct=I.state.version,mt=xt.getParameters(x,I.state,et,D,O),gt=xt.getProgramCacheKey(mt);let At=G.programs;G.environment=x.isMeshStandardMaterial?D.environment:null,G.fog=D.fog,G.envMap=(x.isMeshStandardMaterial?z:_).get(x.envMap||G.environment),G.envMapRotation=G.environment!==null&&x.envMap===null?D.environmentRotation:x.envMapRotation,At===void 0&&(x.addEventListener("dispose",Ct),At=new Map,G.programs=At);let Lt=At.get(gt);if(Lt!==void 0){if(G.currentProgram===Lt&&G.lightsStateVersion===ct)return ko(x,mt),Lt}else mt.uniforms=xt.getUniforms(x),x.onBeforeCompile(mt,b),Lt=xt.acquireProgram(mt,gt),At.set(gt,Lt),G.uniforms=mt.uniforms;const _t=G.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(_t.clippingPlanes=tt.uniform),ko(x,mt),G.needsLights=Qc(x),G.lightsStateVersion=ct,G.needsLights&&(_t.ambientLightColor.value=I.state.ambient,_t.lightProbe.value=I.state.probe,_t.directionalLights.value=I.state.directional,_t.directionalLightShadows.value=I.state.directionalShadow,_t.spotLights.value=I.state.spot,_t.spotLightShadows.value=I.state.spotShadow,_t.rectAreaLights.value=I.state.rectArea,_t.ltc_1.value=I.state.rectAreaLTC1,_t.ltc_2.value=I.state.rectAreaLTC2,_t.pointLights.value=I.state.point,_t.pointLightShadows.value=I.state.pointShadow,_t.hemisphereLights.value=I.state.hemi,_t.directionalShadowMap.value=I.state.directionalShadowMap,_t.directionalShadowMatrix.value=I.state.directionalShadowMatrix,_t.spotShadowMap.value=I.state.spotShadowMap,_t.spotLightMatrix.value=I.state.spotLightMatrix,_t.spotLightMap.value=I.state.spotLightMap,_t.pointShadowMap.value=I.state.pointShadowMap,_t.pointShadowMatrix.value=I.state.pointShadowMatrix),G.currentProgram=Lt,G.uniformsList=null,Lt}function Uo(x){if(x.uniformsList===null){const D=x.currentProgram.getUniforms();x.uniformsList=or.seqWithValue(D.seq,x.uniforms)}return x.uniformsList}function ko(x,D){const O=bt.get(x);O.outputColorSpace=D.outputColorSpace,O.batching=D.batching,O.batchingColor=D.batchingColor,O.instancing=D.instancing,O.instancingColor=D.instancingColor,O.instancingMorph=D.instancingMorph,O.skinning=D.skinning,O.morphTargets=D.morphTargets,O.morphNormals=D.morphNormals,O.morphColors=D.morphColors,O.morphTargetsCount=D.morphTargetsCount,O.numClippingPlanes=D.numClippingPlanes,O.numIntersection=D.numClipIntersection,O.vertexAlphas=D.vertexAlphas,O.vertexTangents=D.vertexTangents,O.toneMapping=D.toneMapping}function Jc(x,D,O,G,I){D.isScene!==!0&&(D=ae),E.resetTextureUnits();const et=D.fog,ct=G.isMeshStandardMaterial?D.environment:null,mt=C===null?b.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:ia,gt=(G.isMeshStandardMaterial?z:_).get(G.envMap||ct),At=G.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Lt=!!O.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),_t=!!O.morphAttributes.position,jt=!!O.morphAttributes.normal,Kt=!!O.morphAttributes.color;let te=Oi;G.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(te=b.toneMapping);const Le=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Xt=Le!==void 0?Le.length:0,wt=bt.get(G),li=f.state.lights;if(it===!0&&(vt===!0||x!==v)){const Be=x===v&&G.id===M;tt.setState(G,x,Be)}let qt=!1;G.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==li.state.version||wt.outputColorSpace!==mt||I.isBatchedMesh&&wt.batching===!1||!I.isBatchedMesh&&wt.batching===!0||I.isBatchedMesh&&wt.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&wt.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&wt.instancing===!1||!I.isInstancedMesh&&wt.instancing===!0||I.isSkinnedMesh&&wt.skinning===!1||!I.isSkinnedMesh&&wt.skinning===!0||I.isInstancedMesh&&wt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&wt.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&wt.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&wt.instancingMorph===!1&&I.morphTexture!==null||wt.envMap!==gt||G.fog===!0&&wt.fog!==et||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==tt.numPlanes||wt.numIntersection!==tt.numIntersection)||wt.vertexAlphas!==At||wt.vertexTangents!==Lt||wt.morphTargets!==_t||wt.morphNormals!==jt||wt.morphColors!==Kt||wt.toneMapping!==te||wt.morphTargetsCount!==Xt)&&(qt=!0):(qt=!0,wt.__version=G.version);let je=wt.currentProgram;qt===!0&&(je=Ia(G,D,I));let _n=!1,De=!1,sa=!1;const ee=je.getUniforms(),ei=wt.uniforms;if(Mt.useProgram(je.program)&&(_n=!0,De=!0,sa=!0),G.id!==M&&(M=G.id,De=!0),_n||v!==x){Mt.buffers.depth.getReversed()?(st.copy(x.projectionMatrix),sd(st),od(st),ee.setValue(U,"projectionMatrix",st)):ee.setValue(U,"projectionMatrix",x.projectionMatrix),ee.setValue(U,"viewMatrix",x.matrixWorldInverse);const Si=ee.map.cameraPosition;Si!==void 0&&Si.setValue(U,Rt.setFromMatrixPosition(x.matrixWorld)),Bt.logarithmicDepthBuffer&&ee.setValue(U,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ee.setValue(U,"isOrthographic",x.isOrthographicCamera===!0),v!==x&&(v=x,De=!0,sa=!0)}if(I.isSkinnedMesh){ee.setOptional(U,I,"bindMatrix"),ee.setOptional(U,I,"bindMatrixInverse");const Be=I.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),ee.setValue(U,"boneTexture",Be.boneTexture,E))}I.isBatchedMesh&&(ee.setOptional(U,I,"batchingTexture"),ee.setValue(U,"batchingTexture",I._matricesTexture,E),ee.setOptional(U,I,"batchingIdTexture"),ee.setValue(U,"batchingIdTexture",I._indirectTexture,E),ee.setOptional(U,I,"batchingColorTexture"),I._colorsTexture!==null&&ee.setValue(U,"batchingColorTexture",I._colorsTexture,E));const oa=O.morphAttributes;if((oa.position!==void 0||oa.normal!==void 0||oa.color!==void 0)&&Tt.update(I,O,je),(De||wt.receiveShadow!==I.receiveShadow)&&(wt.receiveShadow=I.receiveShadow,ee.setValue(U,"receiveShadow",I.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(ei.envMap.value=gt,ei.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&D.environment!==null&&(ei.envMapIntensity.value=D.environmentIntensity),De&&(ee.setValue(U,"toneMappingExposure",b.toneMappingExposure),wt.needsLights&&Kc(ei,sa),et&&G.fog===!0&&ot.refreshFogUniforms(ei,et),ot.refreshMaterialUniforms(ei,G,H,W,f.state.transmissionRenderTarget[x.id]),or.upload(U,Uo(wt),ei,E)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(or.upload(U,Uo(wt),ei,E),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ee.setValue(U,"center",I.center),ee.setValue(U,"modelViewMatrix",I.modelViewMatrix),ee.setValue(U,"normalMatrix",I.normalMatrix),ee.setValue(U,"modelMatrix",I.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Be=G.uniformsGroups;for(let Si=0,Ei=Be.length;Si<Ei;Si++){const zo=Be[Si];P.update(zo,je),P.bind(zo,je)}}return je}function Kc(x,D){x.ambientLightColor.needsUpdate=D,x.lightProbe.needsUpdate=D,x.directionalLights.needsUpdate=D,x.directionalLightShadows.needsUpdate=D,x.pointLights.needsUpdate=D,x.pointLightShadows.needsUpdate=D,x.spotLights.needsUpdate=D,x.spotLightShadows.needsUpdate=D,x.rectAreaLights.needsUpdate=D,x.hemisphereLights.needsUpdate=D}function Qc(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(x,D,O){bt.get(x.texture).__webglTexture=D,bt.get(x.depthTexture).__webglTexture=O;const G=bt.get(x);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=O===void 0,G.__autoAllocateDepthBuffer||Ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,D){const O=bt.get(x);O.__webglFramebuffer=D,O.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(x,D=0,O=0){C=x,A=D,T=O;let G=!0,I=null,et=!1,ct=!1;if(x){const gt=bt.get(x);if(gt.__useDefaultFramebuffer!==void 0)Mt.bindFramebuffer(U.FRAMEBUFFER,null),G=!1;else if(gt.__webglFramebuffer===void 0)E.setupRenderTarget(x);else if(gt.__hasExternalTextures)E.rebindTextures(x,bt.get(x.texture).__webglTexture,bt.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const _t=x.depthTexture;if(gt.__boundDepthTexture!==_t){if(_t!==null&&bt.has(_t)&&(x.width!==_t.image.width||x.height!==_t.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(x)}}const At=x.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(ct=!0);const Lt=bt.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Lt[D])?I=Lt[D][O]:I=Lt[D],et=!0):x.samples>0&&E.useMultisampledRTT(x)===!1?I=bt.get(x).__webglMultisampledFramebuffer:Array.isArray(Lt)?I=Lt[O]:I=Lt,R.copy(x.viewport),V.copy(x.scissor),B=x.scissorTest}else R.copy(at).multiplyScalar(H).floor(),V.copy(St).multiplyScalar(H).floor(),B=Ut;if(Mt.bindFramebuffer(U.FRAMEBUFFER,I)&&G&&Mt.drawBuffers(x,I),Mt.viewport(R),Mt.scissor(V),Mt.setScissorTest(B),et){const gt=bt.get(x.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,gt.__webglTexture,O)}else if(ct){const gt=bt.get(x.texture),At=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,gt.__webglTexture,O||0,At)}M=-1},this.readRenderTargetPixels=function(x,D,O,G,I,et,ct){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=bt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ct!==void 0&&(mt=mt[ct]),mt){Mt.bindFramebuffer(U.FRAMEBUFFER,mt);try{const gt=x.texture,At=gt.format,Lt=gt.type;if(!Bt.textureFormatReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Bt.textureTypeReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=x.width-G&&O>=0&&O<=x.height-I&&U.readPixels(D,O,G,I,Dt.convert(At),Dt.convert(Lt),et)}finally{const gt=C!==null?bt.get(C).__webglFramebuffer:null;Mt.bindFramebuffer(U.FRAMEBUFFER,gt)}}},this.readRenderTargetPixelsAsync=async function(x,D,O,G,I,et,ct){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=bt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ct!==void 0&&(mt=mt[ct]),mt){const gt=x.texture,At=gt.format,Lt=gt.type;if(!Bt.textureFormatReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Bt.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=x.width-G&&O>=0&&O<=x.height-I){Mt.bindFramebuffer(U.FRAMEBUFFER,mt);const _t=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,_t),U.bufferData(U.PIXEL_PACK_BUFFER,et.byteLength,U.STREAM_READ),U.readPixels(D,O,G,I,Dt.convert(At),Dt.convert(Lt),0);const jt=C!==null?bt.get(C).__webglFramebuffer:null;Mt.bindFramebuffer(U.FRAMEBUFFER,jt);const Kt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await rd(U,Kt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,_t),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,et),U.deleteBuffer(_t),U.deleteSync(Kt),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,D=null,O=0){x.isTexture!==!0&&(ga("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,x=arguments[1]);const G=Math.pow(2,-O),I=Math.floor(x.image.width*G),et=Math.floor(x.image.height*G),ct=D!==null?D.x:0,mt=D!==null?D.y:0;E.setTexture2D(x,0),U.copyTexSubImage2D(U.TEXTURE_2D,O,0,0,ct,mt,I,et),Mt.unbindTexture()},this.copyTextureToTexture=function(x,D,O=null,G=null,I=0){x.isTexture!==!0&&(ga("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,x=arguments[1],D=arguments[2],I=arguments[3]||0,O=null);let et,ct,mt,gt,At,Lt,_t,jt,Kt;const te=x.isCompressedTexture?x.mipmaps[I]:x.image;O!==null?(et=O.max.x-O.min.x,ct=O.max.y-O.min.y,mt=O.isBox3?O.max.z-O.min.z:1,gt=O.min.x,At=O.min.y,Lt=O.isBox3?O.min.z:0):(et=te.width,ct=te.height,mt=te.depth||1,gt=0,At=0,Lt=0),G!==null?(_t=G.x,jt=G.y,Kt=G.z):(_t=0,jt=0,Kt=0);const Le=Dt.convert(D.format),Xt=Dt.convert(D.type);let wt;D.isData3DTexture?(E.setTexture3D(D,0),wt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(E.setTexture2DArray(D,0),wt=U.TEXTURE_2D_ARRAY):(E.setTexture2D(D,0),wt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const li=U.getParameter(U.UNPACK_ROW_LENGTH),qt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),je=U.getParameter(U.UNPACK_SKIP_PIXELS),_n=U.getParameter(U.UNPACK_SKIP_ROWS),De=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,te.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,te.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,gt),U.pixelStorei(U.UNPACK_SKIP_ROWS,At),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Lt);const sa=x.isDataArrayTexture||x.isData3DTexture,ee=D.isDataArrayTexture||D.isData3DTexture;if(x.isRenderTargetTexture||x.isDepthTexture){const ei=bt.get(x),oa=bt.get(D),Be=bt.get(ei.__renderTarget),Si=bt.get(oa.__renderTarget);Mt.bindFramebuffer(U.READ_FRAMEBUFFER,Be.__webglFramebuffer),Mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Si.__webglFramebuffer);for(let Ei=0;Ei<mt;Ei++)sa&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,bt.get(x).__webglTexture,I,Lt+Ei),x.isDepthTexture?(ee&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,bt.get(D).__webglTexture,I,Kt+Ei),U.blitFramebuffer(gt,At,et,ct,_t,jt,et,ct,U.DEPTH_BUFFER_BIT,U.NEAREST)):ee?U.copyTexSubImage3D(wt,I,_t,jt,Kt+Ei,gt,At,et,ct):U.copyTexSubImage2D(wt,I,_t,jt,Kt+Ei,gt,At,et,ct);Mt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ee?x.isDataTexture||x.isData3DTexture?U.texSubImage3D(wt,I,_t,jt,Kt,et,ct,mt,Le,Xt,te.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(wt,I,_t,jt,Kt,et,ct,mt,Le,te.data):U.texSubImage3D(wt,I,_t,jt,Kt,et,ct,mt,Le,Xt,te):x.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,I,_t,jt,et,ct,Le,Xt,te.data):x.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,I,_t,jt,te.width,te.height,Le,te.data):U.texSubImage2D(U.TEXTURE_2D,I,_t,jt,et,ct,Le,Xt,te);U.pixelStorei(U.UNPACK_ROW_LENGTH,li),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,qt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,je),U.pixelStorei(U.UNPACK_SKIP_ROWS,_n),U.pixelStorei(U.UNPACK_SKIP_IMAGES,De),I===0&&D.generateMipmaps&&U.generateMipmap(wt),Mt.unbindTexture()},this.copyTextureToTexture3D=function(x,D,O=null,G=null,I=0){return x.isTexture!==!0&&(ga("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,G=arguments[1]||null,x=arguments[2],D=arguments[3],I=arguments[4]||0),ga('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,D,O,G,I)},this.initRenderTarget=function(x){bt.get(x).__webglFramebuffer===void 0&&E.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?E.setTextureCube(x,0):x.isData3DTexture?E.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?E.setTexture2DArray(x,0):E.setTexture2D(x,0),Mt.unbindTexture()},this.resetState=function(){A=0,T=0,C=null,Mt.reset(),Jt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}}class co{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ft(t),this.density=e}clone(){return new co(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ho{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ft(t),this.near=e,this.far=i}clone(){return new ho(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class mr extends ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ce,this.environmentIntensity=1,this.environmentRotation=new Ce,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ac extends Me{constructor(t,e,i,a,r,s,o,l,c){super(t,e,i,a,r,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class un extends ti{constructor(t=1,e=1,i=1,a=32,r=1,s=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:a,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:l};const c=this;a=Math.floor(a),r=Math.floor(r);const h=[],d=[],u=[],m=[];let g=0;const w=[],p=i/2;let f=0;S(),s===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new me(d,3)),this.setAttribute("normal",new me(u,3)),this.setAttribute("uv",new me(m,2));function S(){const b=new L,k=new L;let A=0;const T=(e-t)/i;for(let C=0;C<=r;C++){const M=[],v=C/r,R=v*(e-t)+t;for(let V=0;V<=a;V++){const B=V/a,N=B*l+o,j=Math.sin(N),F=Math.cos(N);k.x=R*j,k.y=-v*i+p,k.z=R*F,d.push(k.x,k.y,k.z),b.set(j,T,F).normalize(),u.push(b.x,b.y,b.z),m.push(B,1-v),M.push(g++)}w.push(M)}for(let C=0;C<a;C++)for(let M=0;M<r;M++){const v=w[M][C],R=w[M+1][C],V=w[M+1][C+1],B=w[M][C+1];(t>0||M!==0)&&(h.push(v,R,B),A+=3),(e>0||M!==r-1)&&(h.push(R,V,B),A+=3)}c.addGroup(f,A,0),f+=A}function y(b){const k=g,A=new Nt,T=new L;let C=0;const M=b===!0?t:e,v=b===!0?1:-1;for(let V=1;V<=a;V++)d.push(0,p*v,0),u.push(0,v,0),m.push(.5,.5),g++;const R=g;for(let V=0;V<=a;V++){const N=V/a*l+o,j=Math.cos(N),F=Math.sin(N);T.x=M*F,T.y=p*v,T.z=M*j,d.push(T.x,T.y,T.z),u.push(0,v,0),A.x=j*.5+.5,A.y=F*.5*v+.5,m.push(A.x,A.y),g++}for(let V=0;V<a;V++){const B=k+V,N=R+V;b===!0?h.push(N,N+1,B):h.push(N+1,N,B),C+=3}c.addGroup(f,C,b===!0?1:2),f+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new un(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class fo extends un{constructor(t=1,e=1,i=32,a=1,r=!1,s=0,o=Math.PI*2){super(0,t,e,i,a,r,s,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:a,openEnded:r,thetaStart:s,thetaLength:o}}static fromJSON(t){return new fo(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ra extends ti{constructor(t=[],e=[],i=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:a};const r=[],s=[];o(a),c(i),h(),this.setAttribute("position",new me(r,3)),this.setAttribute("normal",new me(r.slice(),3)),this.setAttribute("uv",new me(s,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const y=new L,b=new L,k=new L;for(let A=0;A<e.length;A+=3)m(e[A+0],y),m(e[A+1],b),m(e[A+2],k),l(y,b,k,S)}function l(S,y,b,k){const A=k+1,T=[];for(let C=0;C<=A;C++){T[C]=[];const M=S.clone().lerp(b,C/A),v=y.clone().lerp(b,C/A),R=A-C;for(let V=0;V<=R;V++)V===0&&C===A?T[C][V]=M:T[C][V]=M.clone().lerp(v,V/R)}for(let C=0;C<A;C++)for(let M=0;M<2*(A-C)-1;M++){const v=Math.floor(M/2);M%2===0?(u(T[C][v+1]),u(T[C+1][v]),u(T[C][v])):(u(T[C][v+1]),u(T[C+1][v+1]),u(T[C+1][v]))}}function c(S){const y=new L;for(let b=0;b<r.length;b+=3)y.x=r[b+0],y.y=r[b+1],y.z=r[b+2],y.normalize().multiplyScalar(S),r[b+0]=y.x,r[b+1]=y.y,r[b+2]=y.z}function h(){const S=new L;for(let y=0;y<r.length;y+=3){S.x=r[y+0],S.y=r[y+1],S.z=r[y+2];const b=p(S)/2/Math.PI+.5,k=f(S)/Math.PI+.5;s.push(b,1-k)}g(),d()}function d(){for(let S=0;S<s.length;S+=6){const y=s[S+0],b=s[S+2],k=s[S+4],A=Math.max(y,b,k),T=Math.min(y,b,k);A>.9&&T<.1&&(y<.2&&(s[S+0]+=1),b<.2&&(s[S+2]+=1),k<.2&&(s[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function m(S,y){const b=S*3;y.x=t[b+0],y.y=t[b+1],y.z=t[b+2]}function g(){const S=new L,y=new L,b=new L,k=new L,A=new Nt,T=new Nt,C=new Nt;for(let M=0,v=0;M<r.length;M+=9,v+=6){S.set(r[M+0],r[M+1],r[M+2]),y.set(r[M+3],r[M+4],r[M+5]),b.set(r[M+6],r[M+7],r[M+8]),A.set(s[v+0],s[v+1]),T.set(s[v+2],s[v+3]),C.set(s[v+4],s[v+5]),k.copy(S).add(y).add(b).divideScalar(3);const R=p(k);w(A,v+0,S,R),w(T,v+2,y,R),w(C,v+4,b,R)}}function w(S,y,b,k){k<0&&S.x===1&&(s[y]=S.x-1),b.x===0&&b.z===0&&(s[y]=k/2/Math.PI+.5)}function p(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ra(t.vertices,t.indices,t.radius,t.details)}}class uo extends ra{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,a=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-a,-i,0,-a,i,0,a,-i,0,a,i,-a,-i,0,-a,i,0,a,-i,0,a,i,0,-i,0,-a,i,0,-a,-i,0,a,i,0,a],s=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,s,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new uo(t.radius,t.detail)}}class Ni extends ra{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,a=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(a,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ni(t.radius,t.detail)}}class wr extends ra{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],a=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,a,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new wr(t.radius,t.detail)}}class po extends ti{constructor(t=1,e=32,i=16,a=0,r=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:a,phiLength:r,thetaStart:s,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(s+o,Math.PI);let c=0;const h=[],d=new L,u=new L,m=[],g=[],w=[],p=[];for(let f=0;f<=i;f++){const S=[],y=f/i;let b=0;f===0&&s===0?b=.5/e:f===i&&l===Math.PI&&(b=-.5/e);for(let k=0;k<=e;k++){const A=k/e;d.x=-t*Math.cos(a+A*r)*Math.sin(s+y*o),d.y=t*Math.cos(s+y*o),d.z=t*Math.sin(a+A*r)*Math.sin(s+y*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),w.push(u.x,u.y,u.z),p.push(A+b,1-y),S.push(c++)}h.push(S)}for(let f=0;f<i;f++)for(let S=0;S<e;S++){const y=h[f][S+1],b=h[f][S],k=h[f+1][S],A=h[f+1][S+1];(f!==0||s>0)&&m.push(y,b,A),(f!==i-1||l<Math.PI)&&m.push(b,k,A)}this.setIndex(m),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(w,3)),this.setAttribute("uv",new me(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new po(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class mo extends ra{constructor(t=1,e=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],a=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,a,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new mo(t.radius,t.detail)}}class Bi extends La{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cc,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ce,this.combine=Zs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const kl={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(this.files[n]=t)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class vm{constructor(t,e,i){const a=this;let r=!1,s=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){o++,r===!1&&a.onStart!==void 0&&a.onStart(h,s,o),r=!0},this.itemEnd=function(h){s++,a.onProgress!==void 0&&a.onProgress(h,s,o),s===o&&(r=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(h){a.onError!==void 0&&a.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const m=c[d],g=c[d+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}}const xm=new vm;class go{constructor(t){this.manager=t!==void 0?t:xm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const i=this;return new Promise(function(a,r){i.load(t,a,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}go.DEFAULT_MATERIAL_NAME="__DEFAULT";class wm extends go{constructor(t){super(t)}load(t,e,i,a){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,s=kl.get(t);if(s!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(s),r.manager.itemEnd(t)},0),s;const o=Sa("img");function l(){h(),kl.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),a&&a(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class bm extends go{constructor(t){super(t)}load(t,e,i,a){const r=new Me,s=new wm(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},i,a),r}}class br extends ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Rc extends br{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const is=new ne,zl=new L,Nl=new L;class _o{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Nt(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new so,this._frameExtents=new Nt(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;zl.setFromMatrixPosition(t.matrixWorld),e.position.copy(zl),Nl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Nl),e.updateMatrixWorld(),is.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(is),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(is)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Mm extends _o{constructor(){super(new xe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,i=Jn*2*t.angle*this.focus,a=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(i!==e.fov||a!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=a,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class ym extends br{constructor(t,e,i=0,a=Math.PI/3,r=0,s=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.target=new ce,this.distance=i,this.angle=a,this.penumbra=r,this.decay=s,this.map=null,this.shadow=new Mm}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Fl=new ne,fa=new L,ns=new L;class Sm extends _o{constructor(){super(new xe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Nt(4,2),this._viewportCount=6,this._viewports=[new Zt(2,1,1,1),new Zt(0,1,1,1),new Zt(3,1,1,1),new Zt(1,1,1,1),new Zt(3,0,1,1),new Zt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,a=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),fa.setFromMatrixPosition(t.matrixWorld),i.position.copy(fa),ns.copy(i.position),ns.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(ns),i.updateMatrixWorld(),a.makeTranslation(-fa.x,-fa.y,-fa.z),Fl.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fl)}}class Cc extends br{constructor(t,e,i=0,a=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=a,this.shadow=new Sm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Em extends _o{constructor(){super(new oo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tm extends br{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.target=new ce,this.shadow=new Em}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Ol=new ne;class Am{constructor(t,e,i=0,a=1/0){this.ray=new pc(t,e),this.near=i,this.far=a,this.camera=null,this.layers=new ro,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ol.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ol),this}intersectObject(t,e=!0,i=[]){return Ws(t,this,i,e),i.sort(Bl),i}intersectObjects(t,e=!0,i=[]){for(let a=0,r=t.length;a<r;a++)Ws(t[a],this,i,e);return i.sort(Bl),i}}function Bl(n,t){return n.distance-t.distance}function Ws(n,t,e,i){let a=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(a=!1),a===!0&&i===!0){const r=n.children;for(let s=0,o=r.length;s<o;s++)Ws(r[s],t,e,!0)}}class Rm extends gn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$s}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$s);const Dn=new Ce(0,0,0,"YXZ"),In=new L,Cm={type:"change"},Lm={type:"lock"},Pm={type:"unlock"},Hl=Math.PI/2;class Dm extends Rm{constructor(t,e=null){super(t,e),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Im.bind(this),this._onPointerlockChange=Um.bind(this),this._onPointerlockError=km.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(t){return t.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(t){if(this.enabled===!1)return;const e=this.object;In.setFromMatrixColumn(e.matrix,0),In.crossVectors(e.up,In),e.position.addScaledVector(In,t)}moveRight(t){if(this.enabled===!1)return;const e=this.object;In.setFromMatrixColumn(e.matrix,0),e.position.addScaledVector(In,t)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function Im(n){if(this.enabled===!1||this.isLocked===!1)return;const t=n.movementX||n.mozMovementX||n.webkitMovementX||0,e=n.movementY||n.mozMovementY||n.webkitMovementY||0,i=this.object;Dn.setFromQuaternion(i.quaternion),Dn.y-=t*.002*this.pointerSpeed,Dn.x-=e*.002*this.pointerSpeed,Dn.x=Math.max(Hl-this.maxPolarAngle,Math.min(Hl-this.minPolarAngle,Dn.x)),i.quaternion.setFromEuler(Dn),this.dispatchEvent(Cm)}function Um(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(Lm),this.isLocked=!0):(this.dispatchEvent(Pm),this.isLocked=!1)}function km(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const zm={rooms:[{id:"central",title:"Watercolor Pastels",kind:"hall",ring:"S",galleries:["Cormorant garden mural","Watercolor Pastels"],minX:-12.625,maxX:12.625,minZ:0,maxZ:12,openings:[{wall:"W",from:4.8,to:7.2},{wall:"E",from:4.8,to:7.2}],windows:[{wall:"N",from:-7.3125,to:-5.3125,sill:.9,head:3},{wall:"N",from:5.3125,to:7.3125,sill:.9,head:3}],count:46},{id:"travels",title:"Travels & the Pacific Northwest",kind:"gallery",ring:"N",galleries:["Travels","Pacific Northwest","Friends Club mural (Lillooet)","Exhibitions: Cape Town, El Salvador, Warsaw"],minX:-12.625,maxX:12.625,minZ:15.5,maxZ:23.5,openings:[{wall:"W",from:18.3,to:20.7},{wall:"E",from:18.3,to:20.7}],windows:[{wall:"S",from:-7.3125,to:-5.3125,sill:.9,head:3},{wall:"S",from:5.3125,to:7.3125,sill:.9,head:3}],count:21},{id:"people",title:"Friends, Family & Bitcoiners",kind:"gallery",ring:"W",galleries:["Friends","Family","Bitcoiners","Self Portraits","Archived Paintings (portraits & people)","Exhibitions: Living Room, Studio 601, Victrola, Paul Murphy"],minX:-23.225,maxX:-15.225000000000001,minZ:0,maxZ:23.5,openings:[{wall:"E",from:4.8,to:7.2},{wall:"E",from:18.3,to:20.7}],windows:[{wall:"E",from:12.75,to:14.75,sill:.9,head:3}],count:50},{id:"archive",title:"Archived & Older Work",kind:"gallery",ring:"E",galleries:["Archived Paintings","Older Work"],minX:15.225,maxX:23.225,minZ:0,maxZ:23.5,openings:[{wall:"W",from:4.8,to:7.2},{wall:"W",from:18.3,to:20.7}],windows:[{wall:"W",from:12.75,to:14.75,sill:.9,head:3}],count:98}],hall:{height:4.6,doorHeight:2.7},hallways:[{id:"passage-central-people",from:"central",to:"people",minX:-15.225000000000001,maxX:-12.625,minZ:4.8,maxZ:7.2},{id:"passage-people-archive",from:"people",to:"travels",minX:-15.225000000000001,maxX:-12.625,minZ:18.3,maxZ:20.7},{id:"passage-archive-travels",from:"travels",to:"archive",minX:12.625,maxX:15.225,minZ:18.3,maxZ:20.7},{id:"passage-travels-central",from:"archive",to:"central",minX:12.625,maxX:15.225,minZ:4.8,maxZ:7.2}],signs:[{title:"Central Hall",x:-15.345,y:3.1500000000000004,z:6,yaw:1.5707963267948966},{title:"Friends, Family & Bitcoiners",x:-12.505,y:3.1500000000000004,z:6,yaw:-1.5707963267948966},{title:"Travels & the Pacific Northwest",x:-15.345,y:3.1500000000000004,z:19.5,yaw:1.5707963267948966},{title:"Friends, Family & Bitcoiners",x:-12.505,y:3.1500000000000004,z:19.5,yaw:-1.5707963267948966},{title:"Archived & Older Work",x:12.505,y:3.1500000000000004,z:19.5,yaw:1.5707963267948966},{title:"Travels & the Pacific Northwest",x:15.344999999999999,y:3.1500000000000004,z:19.5,yaw:-1.5707963267948966},{title:"Archived & Older Work",x:12.505,y:3.1500000000000004,z:6,yaw:1.5707963267948966},{title:"Central Hall",x:15.344999999999999,y:3.1500000000000004,z:6,yaw:-1.5707963267948966}],start:{x:0,z:1.6,yaw:0}},Nm=[{id:"cormorant-presiding-over-sunset-on-puget-sound",kind:"mural",room:"central",wall:"N",x:0,y:1.9,z:11.965,ix:0,iz:-1,iw:1.524,ih:1.016,s:1,smax:1,title:"Cormorant Presiding over Sunset on Puget Sound",price:null,status:"nfs",url:"https://tjm.art/products/cormorant-presiding-over-sunset-on-puget-sound/",img:"art/cormorant-presiding-over-sunset-on-puget-sound.webp",focal:!0,caption:"Garden mural, Seattle · 60 × 40 in (W × H)",hi:"https://img.tjm.art/gallery-wall/a74c24cb788ba4d20bea974f63c112995614224f8dbdc53b7d0ba5e3ad83b81a-960.webp",fw:1.55448,fh:1.04648,w:1.524,h:1.016,hiLocal:!0},{id:"coined-in-watercolor-film-poster",kind:"painting",room:"central",wall:"N",x:-10.450841334198724,y:1.7500000000000002,z:11.965,ix:0,iz:-1,iw:.6837599544260782,ih:1.0237510919860067,s:1,smax:1,title:"Coined in Watercolor Film Poster",price:null,status:"nfs",url:"https://tjm.art/products/coined-in-watercolor-film-poster/",img:"art/coined-in-watercolor-film-poster.webp",focal:!1,caption:"100 × 70 cm (H × W)",hi:"https://tjm.art/gallery-images/coined-in-watercolor-film-poster.jpg",fw:.7142399544260781,fh:1.0542310919860065,w:.6837599544260782,h:1.0237510919860067,hiLocal:!0},{id:"painting-shoreline-at-dusk",kind:"painting",room:"central",wall:"N",x:-8.853110678492843,y:1.75,z:11.965,ix:0,iz:-1,iw:1.2537026683974506,ih:.5928234331271137,s:1,smax:1,title:"El Zonte at Dawn",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-shoreline-at-dusk/",img:"art/painting-shoreline-at-dusk.webp",focal:!1,caption:"48 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/63d06a96a47f9244f2309dbda6117c8922c6eade29a98ad674923cf57378421a-960.webp",fw:1.2841826683974507,fh:.6233034331271138,w:1.2537026683974506,h:.5928234331271137,hiLocal:!0},{id:"el-zonte-before-dawn",kind:"painting",room:"central",wall:"N",x:-3.896474698180212,y:1.75,z:11.965,ix:0,iz:-1,iw:1.2479855178646906,ih:.5955392184932247,s:1,smax:1,title:"El Zonte Before Dawn",price:"$1,000",status:"available",url:"https://tjm.art/products/el-zonte-before-dawn/",img:"art/el-zonte-before-dawn.webp",focal:!1,caption:"48 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/0832de7fa78ee0b4964fb98b9009c464a0a40018c4db8f32144bd246d9135559-960.webp",fw:1.2784655178646906,fh:.6260192184932247,w:1.2479855178646906,h:.5955392184932247,hiLocal:!0},{id:"painting-moonlit-water",kind:"painting",room:"central",wall:"N",x:-2.6172409696239334,y:1.75,z:11.965,ix:0,iz:-1,iw:.29593685347297877,ih:.6016964697377867,s:1,smax:1,title:"Moonrise Over the Cascades",price:"$500",status:"available",url:"https://tjm.art/products/painting-moonlit-water/",img:"art/painting-moonlit-water.webp",focal:!1,caption:"12 × 23 in (W × H)",hi:"https://img.tjm.art/gallery-wall/370a11b9549c02d36d2ecf5a32d0e0e9b927311a116a38623a17985029422b2d-960.webp",fw:.3264168534729787,fh:.6321764697377866,w:.29593685347297877,h:.6016964697377867,hiLocal:!0},{id:"el-zonte-at-sunrise",kind:"painting",room:"central",wall:"N",x:2.786675144770146,y:1.75,z:11.965,ix:0,iz:-1,iw:.6144868231508612,ih:1.2095040804764867,s:1,smax:1,title:"Sunrise from Punta El Zonte Hostel",price:"$1,000",status:"available",url:"https://tjm.art/products/el-zonte-at-sunrise/",img:"art/el-zonte-at-sunrise.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/6bd54b8a2350ec2a09c359d018e74399db2b1c36dd7a179c717f01702d45f8a8-960.webp",fw:.6449668231508613,fh:1.2399840804764868,w:.6144868231508612,h:1.2095040804764867,hiLocal:!0},{id:"sunrise-in-el-zonte-large",kind:"painting",room:"central",wall:"N",x:4.060829278172788,y:1.75,z:11.965,ix:0,iz:-1,iw:.8989579772649925,ih:1.2401430413819794,s:1,smax:1,title:"Sunrise in El Zonte (Large)",price:"$2,000",status:"available",url:"https://tjm.art/products/sunrise-in-el-zonte-large/",img:"art/sunrise-in-el-zonte-large.webp",focal:!1,caption:"36 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/85427e7af2a0b74812205d51fbd7046788188c69454562ed1afc25ecb380c488-960.webp",fw:.9294379772649926,fh:1.2706230413819795,w:.8989579772649925,h:1.2401430413819794,hiLocal:!0},{id:"painting-portrait-with-hat",kind:"painting",room:"central",wall:"N",x:9.064372887091231,y:1.7500000000000002,z:11.965,ix:0,iz:-1,iw:1.744766510711794,ih:.4880946503567272,s:1,smax:1,title:"Sunrise on Rainier with Eagle",price:null,status:"nfs",url:"https://tjm.art/products/painting-portrait-with-hat/",img:"art/painting-portrait-with-hat.webp",focal:!1,caption:"60 × 22 in (W × H)",hi:"https://img.tjm.art/gallery-wall/06b6660bc24b59597f923ebfa869fe3bcbacae363f1b8cab9a6486a3c73a756a-960.webp",fw:1.775246510711794,fh:.5185746503567272,w:1.744766510711794,h:.4880946503567272,hiLocal:!0},{id:"painting-red-horizon",kind:"painting",room:"central",wall:"N",x:10.823584880695801,y:1.7500000000000002,z:11.965,ix:0,iz:-1,iw:.5841982130266746,ih:1.1176034185681227,s:1,smax:1,title:"Sunset at Kihei on Maui",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-red-horizon/",img:"art/painting-red-horizon.webp",focal:!1,caption:"23 × 44 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f6e3bea6cf0aae99cac1bf06cccd45149b5be70beb16be754e64984b0e176efc-960.webp",fw:.6146782130266746,fh:1.1480834185681226,w:.5841982130266746,h:1.1176034185681227,hiLocal:!0},{id:"sunset-in-el-tunco-el-salvador",kind:"painting",room:"central",wall:"N",x:11.877961993604568,y:1.75,z:11.965,ix:0,iz:-1,iw:.3350967493201906,ih:.1155176828140828,s:1,smax:1,title:"Sunset in El Tunco, El Salvador",price:null,status:"sold",url:"https://tjm.art/products/sunset-in-el-tunco-el-salvador/",img:"art/sunset-in-el-tunco-el-salvador.webp",focal:!1,caption:"12 × 5 in (W × H)",hi:"https://tjm.art/gallery-images/beach-walk.jpg",fw:.3655767493201906,fh:.14599768281408276,w:.3350967493201906,h:.1155176828140828,hiLocal:!1},{id:"sunset-in-el-zonte-el-salvador",kind:"painting",room:"central",wall:"S",x:-2.800770188233186,y:1.7500000000000002,z:.0350000000000001,ix:0,iz:1,iw:.4608467177894373,ih:.9407629549356789,s:1,smax:1,title:"Sunset in El Zonte, El Salvador",price:null,status:"nfs",url:"https://tjm.art/products/sunset-in-el-zonte-el-salvador/",img:"art/sunset-in-el-zonte-el-salvador.webp",focal:!1,caption:"24 × 28 in (W × H)",hi:"https://img.tjm.art/wall-paintings/sunset-in-el-zonte-el-salvador-66c1e1ab57-290.webp",fw:.49132671778943726,fh:.9712429549356788,w:.4608467177894373,h:.9407629549356789,hiLocal:!0},{id:"painting-golden-coast",kind:"painting",room:"central",wall:"S",x:-3.7930746725813522,y:1.75,z:.035000000000000225,ix:0,iz:1,iw:.3525885922299603,ih:.6587212550782704,s:1,smax:1,title:"Sunset in the Strait of Juan de Fuca, Patos Island 1",price:null,status:"sold",url:"https://tjm.art/products/painting-golden-coast/",img:"art/painting-golden-coast.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9f3f1c8a20548e3041ad3062bf8879b280a5b26a63d3b6784f891c1f251e18e1-960.webp",fw:.38306859222996026,fh:.6892012550782703,w:.3525885922299603,h:.6587212550782704,hiLocal:!0},{id:"painting-sunset-silhouette",kind:"painting",room:"central",wall:"S",x:-4.877369741388776,y:1.7500000000000002,z:.03500000000000036,ix:0,iz:1,iw:.6448278867079538,ih:.3601854150349282,s:1,smax:1,title:"Sunset in the Strait of Juan de Fuca, Sucia Island",price:null,status:"sold",url:"https://tjm.art/products/painting-sunset-silhouette/",img:"art/painting-sunset-silhouette.webp",focal:!1,caption:"24 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/75de88bb244df1dc710367f6eef13734be24c732398f783551c78e31674bca91-960.webp",fw:.6753078867079537,fh:.39066541503492813,w:.6448278867079538,h:.3601854150349282,hiLocal:!0},{id:"painting-studio-figure",kind:"painting",room:"central",wall:"S",x:-6.06438970606845,y:1.75,z:.0350000000000005,ix:0,iz:1,iw:.5580383839744599,ih:.41620362804761807,s:1,smax:1,title:"Brekkie @BVBTC hoisting a sculpture in progress",price:"$400",status:"available",url:"https://tjm.art/products/painting-studio-figure/",img:"art/painting-studio-figure.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/studio-figure.jpg",fw:.5885183839744599,fh:.446683628047618,w:.5580383839744599,h:.41620362804761807,hiLocal:!1},{id:"painting-portrait-with-cheese",kind:"painting",room:"central",wall:"S",x:-7.252284947752637,y:1.7500000000000002,z:.03500000000000065,ix:0,iz:1,iw:.6465784407169791,ih:.35921024484276615,s:1,smax:1,title:"Brekkie @BVBTC with polished Bitcoin B",price:"$400",status:"available",url:"https://tjm.art/products/painting-portrait-with-cheese/",img:"art/painting-portrait-with-cheese.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/portrait-with-cheese.jpg",fw:.6770584407169791,fh:.3896902448427661,w:.6465784407169791,h:.35921024484276615,hiLocal:!0},{id:"burning-man-temple-2022-blue",kind:"painting",room:"central",wall:"S",x:-8.75643103365427,y:3.09300404557705,z:.03500000000000083,ix:0,iz:1,iw:1.1819637031181294,ih:.5895043969301671,s:1,smax:1,title:"Burning Man Temple 2022: Blue",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-blue/",img:"art/burning-man-temple-2022-blue.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-blue-7e4ea9513b-960.webp",fw:1.2124437031181294,fh:.6199843969301672,w:1.1819637031181294,h:.5895043969301671,hiLocal:!0},{id:"burning-man-temple-2022-daytime",kind:"painting",room:"central",wall:"S",x:-8.75643103365427,y:2.0772359259249304,z:.03500000000000083,ix:0,iz:1,iw:1.1991164417005815,ih:.5810718423740734,s:1,smax:1,title:"Burning Man Temple 2022: Daytime",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-daytime/",img:"art/burning-man-temple-2022-daytime.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-daytime-6e69733e63-960.webp",fw:1.2295964417005816,fh:.6115518423740735,w:1.1991164417005815,h:.5810718423740734,hiLocal:!0},{id:"burning-man-temple-2022-flame",kind:"painting",room:"central",wall:"S",x:-8.75643103365427,y:1.060730002368947,z:.03500000000000083,ix:0,iz:1,iw:1.1790124782800857,ih:.5909800047378929,s:1,smax:1,title:"Burning Man Temple 2022: Flame",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-flame/",img:"art/burning-man-temple-2022-flame.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-flame-652b838481-960.webp",fw:1.2094924782800858,fh:.621460004737893,w:1.1790124782800857,h:.5909800047378929,hiLocal:!0},{id:"burning-man-temple-2022-pink",kind:"painting",room:"central",wall:"S",x:-10.531488942856857,y:1.75,z:.03500000000000105,ix:0,iz:1,iw:1.171249348736427,ih:.5948970650457102,s:1,smax:1,title:"Burning Man Temple 2022: Pink",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-pink/",img:"art/burning-man-temple-2022-pink.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-pink-92f2d4315e-960.webp",fw:1.2017293487364271,fh:.6253770650457102,w:1.171249348736427,h:.5948970650457102,hiLocal:!0},{id:"daniel-portrait-1",kind:"painting",room:"central",wall:"S",x:-11.878676808612536,y:1.75,z:.03500000000000121,ix:0,iz:1,iw:.3519527240979959,ih:.6599113576837422,s:1,smax:1,title:"Daniel — portrait 1",price:null,status:"nfs",url:"https://tjm.art/products/daniel-portrait-1/",img:"art/daniel-portrait-1.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/daniel-portrait-1-52e78c730f-304.webp",fw:.38243272409799584,fh:.6903913576837422,w:.3519527240979959,h:.6599113576837422,hiLocal:!0},{id:"painting-guitarist",kind:"painting",room:"central",wall:"S",x:11.900746833893939,y:1.75,z:.03500000000000009,ix:0,iz:1,iw:.3180263322121229,ih:.36515466877296915,s:1,smax:1,title:"Girl Tuning Guitar",price:null,status:"nfs",url:"https://tjm.art/products/painting-guitarist/",img:"art/painting-guitarist.webp",focal:!1,caption:"15 × 12 in (W × H)",hi:"https://img.tjm.art/gallery-wall/df6cb0c90b3e3686c53c19965833979894218165c6c141e33f01331582f9cb18-960.webp",fw:.3485063322121229,fh:.39563466877296916,w:.3180263322121229,h:.36515466877296915,hiLocal:!1},{id:"girl-wearing-flower-crown",kind:"painting",room:"central",wall:"S",x:11.0685324363028,y:1.7500000000000002,z:.03500000000000019,ix:0,iz:1,iw:.35740968089854536,ih:.6498357834519006,s:1,smax:1,title:"Girl Wearing Flower Crown",price:null,status:"sold",url:"https://tjm.art/products/girl-wearing-flower-crown/",img:"art/girl-wearing-flower-crown.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/girl-wearing-flower-crown-1b69db9b36-308.webp",fw:.3878896808985453,fh:.6803157834519006,w:.35740968089854536,h:.6498357834519006,hiLocal:!0},{id:"myself-my-mother-ruth-my-grandpa-howard",kind:"painting",room:"central",wall:"S",x:10.028002238102872,y:1.75,z:.03500000000000032,ix:0,iz:1,iw:.648674324465505,ih:.35804962712432886,s:1,smax:1,title:"Myself, my mother Ruth, my grandpa Howard",price:null,status:"nfs",url:"https://tjm.art/products/myself-my-mother-ruth-my-grandpa-howard/",img:"art/myself-my-mother-ruth-my-grandpa-howard.webp",focal:!1,caption:"24 × 15 in (W × H)",hi:"https://tjm.art/gallery-images/family-portrait.jpg",fw:.6791543244655049,fh:.3885296271243288,w:.648674324465505,h:.35804962712432886,hiLocal:!0},{id:"michael-and-katie-in-yelapa",kind:"painting",room:"central",wall:"S",x:8.963917123873305,y:1.7500000000000004,z:.035000000000000454,ix:0,iz:1,iw:.4045195129578255,ih:.5741567280691716,s:1,smax:1,title:"Romance in Yelapa",price:null,status:"sold",url:"https://tjm.art/products/michael-and-katie-in-yelapa/",img:"art/michael-and-katie-in-yelapa.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/embrace.jpg",fw:.43499951295782546,fh:.6046367280691716,w:.4045195129578255,h:.5741567280691716,hiLocal:!1},{id:"painting-couple-in-color",kind:"painting",room:"central",wall:"S",x:7.927148321553965,y:1.75,z:.03500000000000058,ix:0,iz:1,iw:.59404170064505,ih:.39097861269301337,s:1,smax:1,title:"Aunt Fran and Cousin Hillary",price:null,status:"nfs",url:"https://tjm.art/products/painting-couple-in-color/",img:"art/painting-couple-in-color.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f6b3e14539ed681eb7395e1d56e8537a437d8f085d5acc986d2d0318bc775c36-960.webp",fw:.62452170064505,fh:.4214586126930133,w:.59404170064505,h:.39097861269301337,hiLocal:!1},{id:"painting-portrait-in-green",kind:"painting",room:"central",wall:"S",x:6.937073232537113,y:1.75,z:.0350000000000007,ix:0,iz:1,iw:.3111320863528471,ih:.37324597845656204,s:1,smax:1,title:"Chase Toole",price:"$200",status:"available",url:"https://tjm.art/products/painting-portrait-in-green/",img:"art/painting-portrait-in-green.webp",focal:!1,caption:"12 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9ba4b0f54e321f8b264ccb423549c1d935d4e02767f91549de7c6fade8ccf5b8-960.webp",fw:.3416120863528471,fh:.40372597845656205,w:.3111320863528471,h:.37324597845656204,hiLocal:!1},{id:"painting-portrait-in-gold",kind:"painting",room:"central",wall:"S",x:6.080056476721121,y:1.75,z:.03500000000000081,ix:0,iz:1,iw:.32792503424333347,ih:.35413215788163266,s:1,smax:1,title:"Dorian Nakamoto",price:"$200",status:"available",url:"https://tjm.art/products/painting-portrait-in-gold/",img:"art/painting-portrait-in-gold.webp",focal:!1,caption:"12 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/edcc7405e05f4353e269958204c32ca9af022e77e445f06fb978c3a877bbee34-960.webp",fw:.3584050342433335,fh:.38461215788163267,w:.32792503424333347,h:.35413215788163266,hiLocal:!1},{id:"painting-clouds-over-water",kind:"painting",room:"central",wall:"S",x:5.267585744372855,y:1.7500000000000002,z:.035000000000000905,ix:0,iz:1,iw:.2220400394173934,ih:.37191706602413394,s:1,smax:1,title:"El Salvador",price:"$200",status:"available",url:"https://tjm.art/products/painting-clouds-over-water/",img:"art/painting-clouds-over-water.webp",focal:!1,caption:"8 × 16 in (W × H)",hi:"https://img.tjm.art/wall-paintings/painting-clouds-over-water-dda20437ce-320.webp",fw:.25252003941739337,fh:.40239706602413394,w:.2220400394173934,h:.37191706602413394,hiLocal:!1},{id:"painting-twin-dragons",kind:"painting",room:"central",wall:"S",x:4.018753471690841,y:3.3399036859833307,z:.03500000000000106,ix:0,iz:1,iw:1.2006481149108283,ih:.6190192703173476,s:1,smax:1,title:"El Salvador: Future - Chase Toole Collab",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-twin-dragons/",img:"art/painting-twin-dragons.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://tjm.art/gallery-images/twin-dragons.jpg",fw:1.2311281149108284,fh:.6494992703173477,w:1.2006481149108283,h:.6190192703173476,hiLocal:!0},{id:"painting-insect-garden",kind:"painting",room:"central",wall:"S",x:4.018753471690841,y:2.290404415665983,z:.03500000000000106,ix:0,iz:1,iw:1.2006481149108283,ih:.6190192703173476,s:1,smax:1,title:"El Salvador: Past - Chase Toole Collab",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-insect-garden/",img:"art/painting-insect-garden.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://tjm.art/gallery-images/insect-garden.jpg",fw:1.2311281149108284,fh:.6494992703173477,w:1.2006481149108283,h:.6190192703173476,hiLocal:!0},{id:"painting-emergence",kind:"painting",room:"central",wall:"S",x:4.018753471690841,y:1.1578273902536547,z:.03500000000000106,ix:0,iz:1,iw:.9465718187226999,ih:.7851747805073087,s:1,smax:1,title:"El Salvador: Present - Chase Toole Collab",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-emergence/",img:"art/painting-emergence.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://tjm.art/gallery-images/emergence.jpg",fw:.9770518187227,fh:.8156547805073088,w:.9465718187226999,h:.7851747805073087,hiLocal:!0},{id:"grandpa-howard",kind:"painting",room:"central",wall:"S",x:2.7015947071177138,y:1.75,z:.03500000000000122,ix:0,iz:1,iw:.35869302319962443,ih:.6475107821395818,s:1,smax:1,title:"Grandpa Howard",price:null,status:"nfs",url:"https://tjm.art/products/grandpa-howard/",img:"art/grandpa-howard.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/grandpa-howard-c0035dc5a5-308.webp",fw:.38917302319962443,fh:.6779907821395819,w:.35869302319962443,h:.6475107821395818,hiLocal:!0},{id:"honeybadger-and-cub-with-genesis-block",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.75,z:.9981774387893084,ix:1,iz:0,iw:.6999999999999998,ih:.9999999999999998,s:1,smax:1,title:"Honeybadger and Cub with Genesis Block",price:"$1,200",status:"available",url:"https://tjm.art/products/honeybadger-and-cub-with-genesis-block/",img:"art/honeybadger-and-cub-with-genesis-block.webp",focal:!1,caption:"100 × 70 cm (W × H)",hi:"https://img.tjm.art/gallery-wall/5661ac7acd18cb2d7e1634c9595fedb2ef05b6a9a0c454b5e5613b77c17a2c7b-960.webp",fw:.7304799999999998,fh:1.0304799999999998,w:.6999999999999998,h:.9999999999999998,hiLocal:!0},{id:"hope-the-vermillion-aurora",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.7500000000000002,z:2.5703948775786167,ix:1,iz:0,iw:1.1176,ih:.5588,s:1,smax:1,title:"Hope, the Vermillion Aurora",price:"$2,000",status:"available",url:"https://tjm.art/products/hope-the-vermillion-aurora/",img:"art/hope-the-vermillion-aurora.webp",focal:!1,caption:"44 × 22 in (W × H)",hi:"https://img.tjm.art/gallery-wall/62fadea5e859a0d9adca611a1bbb9d8b714edf350fa0885e2920296867d136fb-960.webp",fw:1.14808,fh:.58928,w:1.1176,h:.5588,hiLocal:!0},{id:"painting-chef-in-white",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.75,z:3.9722174387893086,ix:1,iz:0,iw:.35921024484276615,ih:.646578440716979,s:1,smax:1,title:"Jimmy Song @jimmysong",price:"$400",status:"available",url:"https://tjm.art/products/painting-chef-in-white/",img:"art/painting-chef-in-white.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/chef-in-white.jpg",fw:.3896902448427661,fh:.677058440716979,w:.35921024484276615,h:.646578440716979,hiLocal:!0},{id:"joaquim-in-zihuatanejo",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.75,z:8.01332703523546,ix:1,iz:0,iw:.42820703305515045,ih:.5423955752031906,s:1,smax:1,title:"Joaquim in Zihuatanejo",price:null,status:"sold",url:"https://tjm.art/products/joaquim-in-zihuatanejo/",img:"art/joaquim-in-zihuatanejo.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/sunset-reflection.jpg",fw:.45868703305515046,fh:.5728755752031907,w:.42820703305515045,h:.5423955752031906,hiLocal:!1},{id:"meditation-at-denny-blaine",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.7500000000000002,z:9.04820181240893,ix:1,iz:0,iw:.4126154838760254,ih:.5753998317507032,s:1,smax:1,title:"Meditation at Denny Blaine",price:"$600",status:"available",url:"https://tjm.art/products/meditation-at-denny-blaine/",img:"art/meditation-at-denny-blaine.webp",focal:!1,caption:"16 × 23 in (W × H)",hi:"https://img.tjm.art/gallery-wall/80cd427a93dfa369a63d4e8bd5232ebdce59355ee8dfbe8b83aea6b214613cc3-960.webp",fw:.4430954838760254,fh:.6058798317507031,w:.4126154838760254,h:.5753998317507032,hiLocal:!1},{id:"painting-portrait-in-blue-light",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.75,z:10.029001228379403,ix:1,iz:0,iw:.32005631064915707,ih:.3628386510000716,s:1,smax:1,title:"MJ",price:null,status:"nfs",url:"https://tjm.art/products/painting-portrait-in-blue-light/",img:"art/painting-portrait-in-blue-light.webp",focal:!1,caption:"15 × 12 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f8860ee7e0bc016ca435183a6539bac3ba4b0024f1078ac1d1f075f98c2fcb53-960.webp",fw:.350536310649157,fh:.3933186510000716,w:.32005631064915707,h:.3628386510000716,hiLocal:!1},{id:"painting-lightburst",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.75,z:11.10213469185199,ix:1,iz:0,iw:.5972835788802501,ih:1.2443407893338545,s:1,smax:1,title:"Revelation",price:null,status:"nfs",url:"https://tjm.art/products/painting-lightburst/",img:"art/painting-lightburst.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/wall-paintings/painting-lightburst-c33406e958-288.webp",fw:.62776357888025,fh:1.2748207893338543,w:.5972835788802501,h:1.2443407893338545,hiLocal:!0},{id:"rice-paddies-in-vietnam",kind:"painting",room:"central",wall:"E",x:12.59,y:1.75,z:3.9604228377672475,ix:-1,iz:0,iw:.648674324465505,ih:.35804962712432886,s:1,smax:1,title:"Rice paddies in Vietnam, Photo Credit: Daniel Goldsmith",price:null,status:"nfs",url:"https://tjm.art/products/rice-paddies-in-vietnam/",img:"art/rice-paddies-in-vietnam.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/two-soldiers.jpg",fw:.6791543244655049,fh:.3885296271243288,w:.648674324465505,h:.35804962712432886,hiLocal:!0},{id:"painting-phoenix-rising",kind:"painting",room:"central",wall:"E",x:12.59,y:3.042930007393096,z:2.8370643471436208,ix:-1,iz:0,iw:.6011480164280586,ih:1.2363416324920105,s:1,smax:1,title:"The Bounty of Satoshi: Achievement",price:null,status:"nfs",url:"https://tjm.art/products/painting-phoenix-rising/",img:"art/painting-phoenix-rising.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/3ae03c4519694354f32fd4500c9b80d14213531c3e37ed74b2e5a6bb9206b69e-960.webp",fw:.6316280164280585,fh:1.2668216324920105,w:.6011480164280586,h:1.2363416324920105,hiLocal:!0},{id:"painting-festival-portrait",kind:"painting",room:"central",wall:"E",x:12.59,y:1.379759595573545,z:2.8370643471436208,ix:-1,iz:0,iw:.6047197887207582,ih:1.2290391911470901,s:1,smax:1,title:"The Bounty of Satoshi: Wonder",price:null,status:"nfs",url:"https://tjm.art/products/painting-festival-portrait/",img:"art/painting-festival-portrait.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/5a93fb9dae1591564ffabae3ec7eb4e3474858bad0c8c0c34ea878f467462e04-960.webp",fw:.6351997887207581,fh:1.2595191911470902,w:.6047197887207582,h:1.2290391911470901,hiLocal:!0},{id:"painting-figures-in-wheatfield",kind:"painting",room:"central",wall:"E",x:12.59,y:1.75,z:1.8756036965287775,ix:-1,iz:0,iw:.35423249505156734,ih:.6556642974445048,s:1,smax:1,title:"The Mother of Kiev",price:null,status:"sold",url:"https://tjm.art/products/painting-figures-in-wheatfield/",img:"art/painting-figures-in-wheatfield.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/a97a42644b7c84e4693e2af671f49e0daf4f16a662d7ac9796fe5e2d67c055aa-960.webp",fw:.38471249505156735,fh:.6861442974445049,w:.35423249505156734,h:.6556642974445048,hiLocal:!0},{id:"painting-sunflower-woman",kind:"painting",room:"central",wall:"E",x:12.59,y:1.7500000000000002,z:.891623724501497,ix:-1,iz:0,iw:.6527674490029938,ih:.3558045064206852,s:1,smax:1,title:"Vision of Ukraine at Peace",price:null,status:"sold",url:"https://tjm.art/products/painting-sunflower-woman/",img:"art/painting-sunflower-woman.webp",focal:!1,caption:"24 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/19bc1bffd4191f6c530e4dcbe85d95cb1b2dbd7ccbd6b024a5a285781523d63e-960.webp",fw:.6832474490029938,fh:.38628450642068524,w:.6527674490029938,h:.3558045064206852,hiLocal:!0},{id:"warszawska-syrenka",kind:"painting",room:"central",wall:"E",x:12.59,y:1.75,z:9.6,ix:-1,iz:0,iw:.6999999999999998,ih:.9999999999999998,s:1,smax:1,title:"Warszawska Syrenka",price:"$1,200",status:"available",url:"https://tjm.art/products/warszawska-syrenka/",img:"art/warszawska-syrenka.webp",focal:!1,caption:"100 × 70 cm (W × H)",hi:"https://img.tjm.art/gallery-wall/6eb3799795acad929e3a84356c017bc8ce8174a9c4fa0b96604f389444e60718-960.webp",fw:.7304799999999998,fh:1.0304799999999998,w:.6999999999999998,h:.9999999999999998,hiLocal:!0},{id:"friends-club-mural",kind:"mural",room:"travels",wall:"N",x:-1.6226579273364177,y:2.1216,z:23.465,ix:0,iz:-1,iw:12.192,ih:2.7432,s:1,smax:1,title:"Friends Club",price:null,status:"nfs",url:"https://tjm.art/murals/#friends-story",img:"art/friends-club-mural.webp",focal:!1,caption:"Lillooet, British Columbia · 2026 · 40 × 9 ft shipping-container mural",hi:"https://img.tjm.art/walkthrough/friends-club-mural-8e471cb081.webp",fw:12.192,fh:2.7432,w:12.192,h:2.7432,hiLocal:!0},{id:"book-art-9ae261289a3bce952c6f",kind:"painting",room:"travels",wall:"N",x:7.506,y:1.75,z:23.465,ix:0,iz:-1,iw:.3948358546728351,ih:.15122213233969586,s:1,smax:1,title:"Lisa Climbing Tahoma at Sunrise from Denny Blaine prototype",price:null,status:"nfs",url:"https://tjm.art/products/book-art-9ae261289a3bce952c6f/",img:"art/book-art-9ae261289a3bce952c6f.webp",focal:!1,caption:"Shown at its largest print size, 15.5 × 6 in",hi:"https://img.tjm.art/wall-paintings/book-art-9ae261289a3bce952c6f-c02294e976-960.webp",fw:.42531585467283517,fh:.18170213233969593,w:.3948358546728351,h:.15122213233969586,hiLocal:!1},{id:"book-art-6e6d7ac51608e0b7f10f",kind:"painting",room:"travels",wall:"S",x:-8.523374087059269,y:1.7500000000000002,z:15.535,ix:0,iz:1,iw:.13904787240741964,ih:.22141380956595483,s:1,smax:1,title:"Moonrise in Santa Monica, photo credit: Paul Murphy",price:null,status:"nfs",url:"https://tjm.art/products/book-art-6e6d7ac51608e0b7f10f/",img:"art/book-art-6e6d7ac51608e0b7f10f.webp",focal:!1,caption:"Shown at its largest print size, 5.5 × 8.7 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/6e6d7ac51608e0b7f10f.webp",fw:.16952787240741962,fh:.2518938095659548,w:.13904787240741964,h:.22141380956595483,hiLocal:!1},{id:"book-art-471daf14a8bb7883f114",kind:"painting",room:"travels",wall:"S",x:-9.593142401540746,y:1.7500000000000002,z:15.535,ix:0,iz:1,iw:.2873084548444202,ih:.15428464025145364,s:1,smax:1,title:"Myself in Skandasana on Playa de los Muertos at Dawn in Puerto Vallarta",price:null,status:"nfs",url:"https://tjm.art/products/book-art-471daf14a8bb7883f114/",img:"art/book-art-471daf14a8bb7883f114.webp",focal:!1,caption:"Shown at its largest print size, 11.3 × 6.1 in",hi:"https://img.tjm.art/wall-paintings/book-art-471daf14a8bb7883f114-6db9296c0b-960.webp",fw:.3177884548444202,fh:.18476464025145364,w:.2873084548444202,h:.15428464025145364,hiLocal:!1},{id:"book-art-c198f09bc8ddad18ed1e",kind:"painting",room:"travels",wall:"S",x:-10.703757352953176,y:1.75,z:15.535,ix:0,iz:1,iw:.22074114626932057,ih:.1203039247167797,s:1,smax:1,title:"Sunrise at Bass Coast, Merritt, BC 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-c198f09bc8ddad18ed1e/",img:"art/book-art-c198f09bc8ddad18ed1e.webp",focal:!1,caption:"Shown at its largest print size, 8.7 × 4.7 in",hi:"https://img.tjm.art/wall-paintings/book-art-c198f09bc8ddad18ed1e-994bc476f6-960.webp",fw:.25122114626932057,fh:.1507839247167797,w:.22074114626932057,h:.1203039247167797,hiLocal:!1},{id:"book-art-87cf2a732259b313f5ab",kind:"painting",room:"travels",wall:"S",x:-11.727183963043919,y:1.75,z:15.535,ix:0,iz:1,iw:.11293177220104608,ih:.1988235426074755,s:1,smax:1,title:"Sunrise in Puerto Vallarta",price:null,status:"nfs",url:"https://tjm.art/products/book-art-87cf2a732259b313f5ab/",img:"art/book-art-87cf2a732259b313f5ab.webp",focal:!1,caption:"Shown at its largest print size, 4.4 × 7.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/87cf2a732259b313f5ab.webp",fw:.1434117722010461,fh:.2293035426074755,w:.11293177220104608,h:.1988235426074755,hiLocal:!1},{id:"book-art-e97329411fa8b273b508",kind:"painting",room:"travels",wall:"S",x:4.018409740319008,y:1.75,z:15.535,ix:0,iz:1,iw:.14749567772753552,ih:.2406128511052782,s:1,smax:1,title:"Sunrise in Traverse City, photo credit: Paul Murphy",price:null,status:"nfs",url:"https://tjm.art/products/book-art-e97329411fa8b273b508/",img:"art/book-art-e97329411fa8b273b508.webp",focal:!1,caption:"Shown at its largest print size, 5.8 × 9.5 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/e97329411fa8b273b508.webp",fw:.17797567772753553,fh:.2710928511052782,w:.14749567772753552,h:.2406128511052782,hiLocal:!1},{id:"book-art-deb3358c321671dae1fc",kind:"painting",room:"travels",wall:"S",x:2.9276929850637106,y:1.7500000000000002,z:15.535,ix:0,iz:1,iw:.1627729911486093,ih:.30031917186090273,s:1,smax:1,title:"Sunrise on Tahoma with motorcycles",price:null,status:"nfs",url:"https://tjm.art/products/book-art-deb3358c321671dae1fc/",img:"art/book-art-deb3358c321671dae1fc.webp",focal:!1,caption:"Shown at its largest print size, 6.4 × 11.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/deb3358c321671dae1fc.webp",fw:.1932529911486093,fh:.33079917186090274,w:.1627729911486093,h:.30031917186090273,hiLocal:!1},{id:"book-art-e589c9375e23d1de4748",kind:"painting",room:"travels",wall:"S",x:1.7838255331984398,y:1.7500000000000002,z:15.535,ix:0,iz:1,iw:.25379707094748305,ih:.1400959831630106,s:1,smax:1,title:"Sunset in Greece, Photo Credit: Chelsea Murphy",price:null,status:"nfs",url:"https://tjm.art/products/book-art-e589c9375e23d1de4748/",img:"art/book-art-e589c9375e23d1de4748.webp",focal:!1,caption:"Shown at its largest print size, 10 × 5.5 in",hi:"https://img.tjm.art/wall-paintings/book-art-e589c9375e23d1de4748-878e092b32-960.webp",fw:.284277070947483,fh:.17057598316301056,w:.25379707094748305,h:.1400959831630106,hiLocal:!1},{id:"book-art-d1399111a441ed91feaa",kind:"painting",room:"travels",wall:"S",x:.6529359317011583,y:1.75,z:15.535,ix:0,iz:1,iw:.1368172904126309,ih:.24875870984114706,s:1,smax:1,title:"Sunset in the Strait of Juan de Fuca, Patos Island 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-d1399111a441ed91feaa/",img:"art/book-art-d1399111a441ed91feaa.webp",focal:!1,caption:"Shown at its largest print size, 5.4 × 9.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/d1399111a441ed91feaa.webp",fw:.16729729041263092,fh:.27923870984114707,w:.1368172904126309,h:.24875870984114706,hiLocal:!1},{id:"book-art-a2e53a8418a8d84f3dc5",kind:"painting",room:"travels",wall:"S",x:-.4249094174359449,y:2.017242436186523,z:15.535,ix:0,iz:1,iw:.14770856622712594,ih:.11373559599488696,s:1,smax:1,title:"El Salvador",price:null,status:"nfs",url:"https://tjm.art/products/book-art-a2e53a8418a8d84f3dc5/",img:"art/book-art-a2e53a8418a8d84f3dc5.webp",focal:!1,caption:"Shown at its largest print size, 5.8 × 4.5 in",hi:"https://img.tjm.art/wall-paintings/book-art-a2e53a8418a8d84f3dc5-eba19eb317-960.webp",fw:.17818856622712595,fh:.14421559599488698,w:.14770856622712594,h:.11373559599488696,hiLocal:!1},{id:"book-art-e3293c73dbb01f94b39b",kind:"painting",room:"travels",wall:"S",x:-.4249094174359449,y:1.4762704147322496,z:15.535,ix:0,iz:1,iw:.13507361072249305,ih:.10724844691365948,s:1,smax:1,title:"El Salvador",price:null,status:"nfs",url:"https://tjm.art/products/book-art-e3293c73dbb01f94b39b/",img:"art/book-art-e3293c73dbb01f94b39b.webp",focal:!1,caption:"Shown at its largest print size, 5.3 × 4.2 in",hi:"https://img.tjm.art/wall-paintings/book-art-e3293c73dbb01f94b39b-2be213bfaa-960.webp",fw:.16555361072249306,fh:.13772844691365949,w:.13507361072249305,h:.10724844691365948,hiLocal:!1},{id:"book-art-55829535637cd4974a88",kind:"painting",room:"travels",wall:"S",x:-1.5065647801365518,y:1.7500000000000002,z:15.535,ix:0,iz:1,iw:.14443731753963912,ih:.1129499823159978,s:1,smax:1,title:"Hawaii",price:null,status:"nfs",url:"https://tjm.art/products/book-art-55829535637cd4974a88/",img:"art/book-art-55829535637cd4974a88.webp",focal:!1,caption:"Shown at its largest print size, 5.7 × 4.4 in",hi:"https://img.tjm.art/wall-paintings/book-art-55829535637cd4974a88-f905147f0a-960.webp",fw:.17491731753963913,fh:.1434299823159978,w:.14443731753963912,h:.1129499823159978,hiLocal:!1},{id:"book-art-94e2edf9a24c90950489",kind:"painting",room:"travels",wall:"S",x:-2.6706443752149065,y:1.75,z:15.535000000000002,ix:0,iz:1,iw:.3125570309826217,ih:.15284038815050202,s:1,smax:1,title:"Inside album cover for Yes: Close to the Edge",price:null,status:"nfs",url:"https://tjm.art/products/book-art-94e2edf9a24c90950489/",img:"art/book-art-94e2edf9a24c90950489.webp",focal:!1,caption:"Shown at its largest print size, 12.3 × 6 in",hi:"https://img.tjm.art/wall-paintings/book-art-94e2edf9a24c90950489-bfc815d54d-960.webp",fw:.34303703098262167,fh:.18332038815050197,w:.3125570309826217,h:.15284038815050202,hiLocal:!1},{id:"book-art-ff6db6906f0ed48ccc3a",kind:"painting",room:"travels",wall:"S",x:-3.9273314453531087,y:1.75,z:15.535000000000002,ix:0,iz:1,iw:.3296522676593339,ih:.2465798962091818,s:1,smax:1,title:"Sedona Monuments",price:null,status:"nfs",url:"https://tjm.art/products/book-art-ff6db6906f0ed48ccc3a/",img:"art/book-art-ff6db6906f0ed48ccc3a.webp",focal:!1,caption:"Shown at its largest print size, 13 × 9.7 in",hi:"https://img.tjm.art/wall-paintings/book-art-ff6db6906f0ed48ccc3a-6efc3645f3-960.webp",fw:.3601322676593339,fh:.2770598962091818,w:.3296522676593339,h:.2465798962091818,hiLocal:!1},{id:"book-art-27fee33e69f262ecfacb",kind:"painting",room:"travels",wall:"S",x:11.530098165105262,y:1.75,z:15.535,ix:0,iz:1,iw:.25581260657705274,ih:.33703900734789555,s:1,smax:1,title:"Sedona: Bell Rock 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-27fee33e69f262ecfacb/",img:"art/book-art-27fee33e69f262ecfacb.webp",focal:!1,caption:"Shown at its largest print size, 10.1 × 13.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/27fee33e69f262ecfacb.webp",fw:.28629260657705274,fh:.36751900734789555,w:.25581260657705274,h:.33703900734789555,hiLocal:!1},{id:"book-art-f2025e5a72f4a70866c6",kind:"painting",room:"travels",wall:"S",x:10.285603696711473,y:1.75,z:15.535,ix:0,iz:1,iw:.26870526699809694,ih:.21577032939947183,s:1,smax:1,title:"Untitled — Assorted Adventures, page 59",price:null,status:"nfs",url:"https://tjm.art/products/book-art-f2025e5a72f4a70866c6/",img:"art/book-art-f2025e5a72f4a70866c6.webp",focal:!1,caption:"Shown at its largest print size, 10.6 × 8.5 in",hi:"https://img.tjm.art/wall-paintings/book-art-f2025e5a72f4a70866c6-f6d52f6258-960.webp",fw:.29918526699809694,fh:.24625032939947183,w:.26870526699809694,h:.21577032939947183,hiLocal:!1},{id:"book-art-3a9cba708a8045364e82",kind:"painting",room:"people",wall:"N",x:-22.340002047914048,y:1.75,z:23.465,ix:0,iz:-1,iw:.30109780482114484,ih:.15988293436002793,s:1,smax:1,title:"Dawn and her father Pete at Burning Man",price:null,status:"nfs",url:"https://tjm.art/products/book-art-3a9cba708a8045364e82/",img:"art/book-art-3a9cba708a8045364e82.webp",focal:!1,caption:"Shown at its largest print size, 11.9 × 6.3 in",hi:"https://img.tjm.art/wall-paintings/book-art-3a9cba708a8045364e82-6d25875d18-960.webp",fw:.3315778048211448,fh:.19036293436002788,w:.30109780482114484,h:.15988293436002793,hiLocal:!1},{id:"archived-painting-22",kind:"painting",room:"people",wall:"N",x:-20.837317373365437,y:1.75,z:23.465,ix:0,iz:-1,iw:1.2048934449253088,ih:.5782858251363404,s:1,smax:1,title:"Devo & Katie @ Bass Coast",price:"$1,000",status:"available",url:"https://tjm.art/products/archived-painting-22/",img:"art/archived-painting-22.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/a162cfb27e01580ab91fcb783c9c9b81fe68a0e4f572c73e902855b0eb09365a-960.webp",fw:1.2353734449253089,fh:.6087658251363405,w:1.2048934449253088,h:.5782858251363404,hiLocal:!0},{id:"book-art-74a736000a32427842b1",kind:"painting",room:"people",wall:"N",x:-19.343717717207504,y:1.75,z:23.465,ix:0,iz:-1,iw:.2829277680397993,ih:.2520886413234612,s:1,smax:1,title:"Laura and Cafécito on paddleboard in Lake Washington",price:null,status:"nfs",url:"https://tjm.art/products/book-art-74a736000a32427842b1/",img:"art/book-art-74a736000a32427842b1.webp",focal:!1,caption:"Shown at its largest print size, 11.1 × 9.9 in",hi:"https://img.tjm.art/wall-paintings/book-art-74a736000a32427842b1-845d6258d2-960.webp",fw:.3134077680397993,fh:.2825686413234612,w:.2829277680397993,h:.2520886413234612,hiLocal:!1},{id:"book-art-50a7984f819bec72d1c7",kind:"painting",room:"people",wall:"N",x:-18.35613356674294,y:1.75,z:23.465,ix:0,iz:-1,iw:.19286243353855792,ih:.25646600204595466,s:1,smax:1,title:"Myself Painting on Mt Baker near Goat Lake",price:null,status:"nfs",url:"https://tjm.art/products/book-art-50a7984f819bec72d1c7/",img:"art/book-art-50a7984f819bec72d1c7.webp",focal:!1,caption:"Shown at its largest print size, 7.6 × 10.1 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/50a7984f819bec72d1c7.webp",fw:.22334243353855793,fh:.28694600204595466,w:.19286243353855792,h:.25646600204595466,hiLocal:!1},{id:"archived-painting-308",kind:"painting",room:"people",wall:"N",x:-17.337590287379783,y:1.7500000000000002,z:23.465,ix:0,iz:-1,iw:.34484602583699275,ih:.45474666066580866,s:1,smax:1,title:"Self Portrait on Goat Lake",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-308/",img:"art/archived-painting-308.webp",focal:!1,caption:"Shown at its largest print size, 13.6 × 17.9 in",hi:"https://img.tjm.art/gallery-wall/23cb306de1e7d1c1608c00cfb6ed7f612683d28af9cad0e20444ea53f4f23fe8-960.webp",fw:.37532602583699276,fh:.48522666066580866,w:.34484602583699275,h:.45474666066580866,hiLocal:!1},{id:"archived-painting-370",kind:"painting",room:"people",wall:"N",x:-16.187463637230643,y:1.75,z:23.465,ix:0,iz:-1,iw:.45602917511052243,ih:.3428046369220127,s:1,smax:1,title:"Ben & Kermit & Swan",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-370/",img:"art/archived-painting-370.webp",focal:!1,caption:"Shown at its largest print size, 18 × 13.5 in",hi:"https://img.tjm.art/gallery-wall/4b6a2895e642a6103cba97fdfc26f05f48f0f2121136f3db346f87b90e151445-960.webp",fw:.4865091751105224,fh:.37328463692201264,w:.45602917511052243,h:.3428046369220127,hiLocal:!1},{id:"archived-painting-416",kind:"painting",room:"people",wall:"S",x:-16.291329791119992,y:1.7500000000000002,z:.035000000000000135,ix:0,iz:1,iw:.5384045367014424,ih:.2973455647590264,s:1,smax:1,title:"Brekkie Finishing Orange Calcite B",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-416/",img:"art/archived-painting-416.webp",focal:!1,caption:"Shown at its largest print size, 21.2 × 11.7 in",hi:"https://img.tjm.art/gallery-wall/a616e8fe5d34df6ce9ddba9e9c389ffee6a97974faea046237220f94c7710e30-960.webp",fw:.5688845367014425,fh:.32782556475902647,w:.5384045367014424,h:.2973455647590264,hiLocal:!1},{id:"archived-painting-412",kind:"painting",room:"people",wall:"S",x:-17.587060869510925,y:1.7500000000000002,z:.035000000000000295,ix:0,iz:1,iw:.4283225745418843,ih:.3097999739230457,s:1,smax:1,title:"Brekkie Hoisting Orange Calcite B",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-412/",img:"art/archived-painting-412.webp",focal:!1,caption:"Shown at its largest print size, 16.9 × 12.2 in",hi:"https://img.tjm.art/gallery-wall/49077623a9eebab719aa89b099be7bcf78a21f03cb7ea7e247ac7f55f03293db-960.webp",fw:.4588025745418843,fh:.34027997392304565,w:.4283225745418843,h:.3097999739230457,hiLocal:!1},{id:"archived-painting-301",kind:"painting",room:"people",wall:"S",x:-18.895154409411266,y:1.7499999999999998,z:.035000000000000454,ix:0,iz:1,iw:.5631294597202643,ih:.604913264827622,s:1,smax:1,title:"Catherine #1",price:"$600",status:"available",url:"https://tjm.art/products/archived-painting-301/",img:"art/archived-painting-301.webp",focal:!1,caption:"22 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/83af905a4d9fc70fe6a9f1e6701a3b701bda410567f28a456c6553c272b2358f-960.webp",fw:.5936094597202644,fh:.635393264827622,w:.5631294597202643,h:.604913264827622,hiLocal:!0},{id:"book-art-9209f1fd7d47f373597f",kind:"painting",room:"people",wall:"S",x:-20.05960339736265,y:3.0685656161359542,z:.0350000000000006,ix:0,iz:1,iw:.11605636158300316,ih:.2730737919600074,s:1,smax:1,title:"Catherine dance series — study 1",price:null,status:"nfs",url:"https://tjm.art/products/book-art-9209f1fd7d47f373597f/",img:"art/book-art-9209f1fd7d47f373597f.webp",focal:!1,caption:"Shown at its largest print size, 4.6 × 10.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/9209f1fd7d47f373597f.webp",fw:.14653636158300315,fh:.3035537919600074,w:.11605636158300316,h:.2730737919600074,hiLocal:!1},{id:"book-art-a61c71e5de8cc1b71500",kind:"painting",room:"people",wall:"S",x:-20.05960339736265,y:2.372214078127374,z:.0350000000000006,ix:0,iz:1,iw:.16373765680817862,ih:.2586692840571542,s:1,smax:1,title:"Catherine dance series — study 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-a61c71e5de8cc1b71500/",img:"art/book-art-a61c71e5de8cc1b71500.webp",focal:!1,caption:"Shown at its largest print size, 6.4 × 10.2 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/a61c71e5de8cc1b71500.webp",fw:.19421765680817862,fh:.28914928405715423,w:.16373765680817862,h:.2586692840571542,hiLocal:!1},{id:"book-art-596837cb5ff533c620dd",kind:"painting",room:"people",wall:"S",x:-20.05960339736265,y:1.6690396954209619,z:.0350000000000006,ix:0,iz:1,iw:.16601057970493277,ih:.2867194813556697,s:1,smax:1,title:"Catherine dance series — study 3",price:null,status:"nfs",url:"https://tjm.art/products/book-art-596837cb5ff533c620dd/",img:"art/book-art-596837cb5ff533c620dd.webp",focal:!1,caption:"Shown at its largest print size, 6.5 × 11.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/596837cb5ff533c620dd.webp",fw:.19649057970493278,fh:.3171994813556697,w:.16601057970493277,h:.2867194813556697,hiLocal:!1},{id:"book-art-7bce6e3509027d1f7a0b",kind:"painting",room:"people",wall:"S",x:-20.05960339736265,y:.9302199773715636,z:.0350000000000006,ix:0,iz:1,iw:.15442125881978336,ih:.32995995474312684,s:1,smax:1,title:"Catherine dance series — study 4",price:null,status:"nfs",url:"https://tjm.art/products/book-art-7bce6e3509027d1f7a0b/",img:"art/book-art-7bce6e3509027d1f7a0b.webp",focal:!1,caption:"Shown at its largest print size, 6.1 × 13 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/7bce6e3509027d1f7a0b.webp",fw:.18490125881978337,fh:.36043995474312684,w:.15442125881978336,h:.32995995474312684,hiLocal:!1},{id:"archived-painting-133",kind:"painting",room:"people",wall:"S",x:-21.139639167889285,y:1.75,z:.035000000000000725,ix:0,iz:1,iw:.3443488067488291,ih:.578343510769599,s:1,smax:1,title:"Devo in Front of the Mayan Warrior",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-133/",img:"art/archived-painting-133.webp",focal:!1,caption:"Shown at its largest print size, 13.6 × 22.8 in",hi:"https://img.tjm.art/gallery-wall/20686e5b976babbe2b5e90a7067f631f6bbbdcdf654e83b6985bdbe7431acc6c-960.webp",fw:.37482880674882907,fh:.608823510769599,w:.3443488067488291,h:.578343510769599,hiLocal:!1},{id:"archived-painting-363",kind:"painting",room:"people",wall:"S",x:-22.27602678563185,y:1.75,z:.035000000000000864,ix:0,iz:1,iw:.30369138319776684,ih:.41454000732400664,s:1,smax:1,title:"Elon & Lil’ X in the Oval Office",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-363/",img:"art/archived-painting-363.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.3 in",hi:"https://img.tjm.art/gallery-wall/c395c1c2a73621f0eba699af365ff267e7e04b4d7af6d133ec931f03a98938d0-960.webp",fw:.33417138319776685,fh:.44502000732400665,w:.30369138319776684,h:.41454000732400664,hiLocal:!1},{id:"archived-painting-66",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.7500000000000002,z:1.044177487053271,ix:1,iz:0,iw:.6695964350922621,ih:.5511252758523901,s:1,smax:1,title:"Flamenco Guitarist in Zihuatanejo",price:"$600",status:"available",url:"https://tjm.art/products/archived-painting-66/",img:"art/archived-painting-66.webp",focal:!1,caption:"26 × 22 in (W × H)",hi:"https://img.tjm.art/gallery-wall/51f462f3a96a1a6da5485b16a847912d453b17ea5afba5ada4624619ff5287a3-960.webp",fw:.700076435092262,fh:.5816052758523901,w:.6695964350922621,h:.5511252758523901,hiLocal:!0},{id:"archived-painting-367",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.7500000000000002,z:2.2560815993763104,ix:1,iz:0,iw:.30497325053953733,ih:.41917959956266504,s:1,smax:1,title:"Josie, The Redheaded Libertarian",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-367/",img:"art/archived-painting-367.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.5 in",hi:"https://img.tjm.art/gallery-wall/64e27601d760271561cd6a29135a46e368d669d2d9dfa7360337d561aa2ad8f8-960.webp",fw:.33545325053953734,fh:.44965959956266505,w:.30497325053953733,h:.41917959956266504,hiLocal:!1},{id:"archived-painting-364",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.7500000000000002,z:3.3418201987117326,ix:1,iz:0,iw:.4172654091170277,ih:.3067281628073242,s:1,smax:1,title:"Max Keiser & Michael Saylor",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-364/",img:"art/archived-painting-364.webp",focal:!1,caption:"Shown at its largest print size, 16.4 × 12.1 in",hi:"https://img.tjm.art/gallery-wall/b29e07d3045e85d048b268939aa32ca68a492f7a88b694408491e4969250181a-960.webp",fw:.44774540911702765,fh:.33720816280732413,w:.4172654091170277,h:.3067281628073242,hiLocal:!1},{id:"archived-painting-362",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:4.496606713483073,ix:1,iz:0,iw:.44306908141137336,ih:.31588557694970526,s:1,smax:1,title:"Max Keiser & Stacey Herbert",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-362/",img:"art/archived-painting-362.webp",focal:!1,caption:"Shown at its largest print size, 17.4 × 12.4 in",hi:"https://img.tjm.art/gallery-wall/495def835824cee6f5ddabd2e49dac28b6a11588900c98d69c8294f33fe724ac-960.webp",fw:.4735490814113733,fh:.3463655769497052,w:.44306908141137336,h:.31588557694970526,hiLocal:!1},{id:"book-art-029f45a5fbfd6c90212e",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:5.543700957230665,ix:1,iz:0,iw:.2018808670695304,ih:.3637493100351899,s:1,smax:1,title:"Mikyla, Mandy, and Guin",price:null,status:"nfs",url:"https://tjm.art/products/book-art-029f45a5fbfd6c90212e/",img:"art/book-art-029f45a5fbfd6c90212e.webp",focal:!1,caption:"Shown at its largest print size, 7.9 × 14.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/029f45a5fbfd6c90212e.webp",fw:.2323608670695304,fh:.3942293100351899,w:.2018808670695304,h:.3637493100351899,hiLocal:!1},{id:"archived-painting-img-1608",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:6.549658745147516,ix:1,iz:0,iw:.3607961697498945,ih:.6437363239221802,s:1,smax:1,title:"My Dad, Paul Murphy",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-img-1608/",img:"art/archived-painting-img-1608.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/7401a29fec30c8f5333f5830871d8efb867cf0ad3418fd92e1740f65d66f03c1-960.webp",fw:.3912761697498945,fh:.6742163239221801,w:.3607961697498945,h:.6437363239221802,hiLocal:!0},{id:"book-art-0f696788184bbba1d236",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:7.508472790708712,ix:1,iz:0,iw:.10759338235821865,ih:.1732582646670188,s:1,smax:1,title:"Myself",price:null,status:"nfs",url:"https://tjm.art/products/book-art-0f696788184bbba1d236/",img:"art/book-art-0f696788184bbba1d236.webp",focal:!1,caption:"Shown at its largest print size, 4.2 × 6.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/0f696788184bbba1d236.webp",fw:.13807338235821867,fh:.20373826466701883,w:.10759338235821865,h:.1732582646670188,hiLocal:!1},{id:"archived-painting-366",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:8.441233060530264,ix:1,iz:0,iw:.3086886182706044,ih:.4327394719944821,s:1,smax:1,title:"RFK",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-366/",img:"art/archived-painting-366.webp",focal:!1,caption:"Shown at its largest print size, 12.2 × 17 in",hi:"https://img.tjm.art/gallery-wall/c0436ee7e503922435d19062a877a660c2d4d1fd21d412725010fa4cbf21899e-960.webp",fw:.33916861827060435,fh:.46321947199448205,w:.3086886182706044,h:.4327394719944821,hiLocal:!1},{id:"archived-painting-390",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:9.470147685354409,ix:1,iz:0,iw:.29990209236340604,ih:.41899953632482645,s:1,smax:1,title:"Ron Paul",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-390/",img:"art/archived-painting-390.webp",focal:!1,caption:"Shown at its largest print size, 11.8 × 16.5 in",hi:"https://img.tjm.art/gallery-wall/5030c993aeaef08722c6dd789360a6bfcf46cd82ce48612ef2444a140c3e6d30-960.webp",fw:.33038209236340604,fh:.44947953632482646,w:.29990209236340604,h:.41899953632482645,hiLocal:!1},{id:"book-art-4a0bb9cdd6c404c4e77c",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:10.405585545232622,ix:1,iz:0,iw:.1217350883787434,ih:.17316513282893797,s:1,smax:1,title:"Scarlette Melon @Scarlette_melon",price:null,status:"nfs",url:"https://tjm.art/products/book-art-4a0bb9cdd6c404c4e77c/",img:"art/book-art-4a0bb9cdd6c404c4e77c.webp",focal:!1,caption:"Shown at its largest print size, 4.8 × 6.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/4a0bb9cdd6c404c4e77c.webp",fw:.1522150883787434,fh:.20364513282893798,w:.1217350883787434,h:.17316513282893797,hiLocal:!1},{id:"archived-painting-53",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.7499999999999998,z:11.49241506387502,ix:1,iz:0,iw:.602685409891775,ih:1.156113601829386,s:1,smax:1,title:"Self Portrait, Meditation at Denny Blaine",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-53/",img:"art/archived-painting-53.webp",focal:!1,caption:"24 × 45 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9d83b86870ee61249fa5ad1a985a10ff503b1f8951db8db8d8c471dd76a07dcb-960.webp",fw:.6331654098917749,fh:1.1865936018293861,w:.602685409891775,h:1.156113601829386,hiLocal:!0},{id:"archived-painting-387",kind:"painting",room:"people",wall:"W",x:-23.19,y:2.1733651984414064,z:12.674026575599946,ix:1,iz:0,iw:.2937739011653011,ih:.3979616488848303,s:1,smax:1,title:"Tulsi Gabbard #1",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-387/",img:"art/archived-painting-387.webp",focal:!1,caption:"Shown at its largest print size, 11.6 × 15.7 in",hi:"https://img.tjm.art/gallery-wall/c9bbb3f33ff4f860e9846a7479cb19550c230739149e5bbb3275ef7e4cb0f847-960.webp",fw:.3242539011653011,fh:.42844164888483033,w:.2937739011653011,h:.3979616488848303,hiLocal:!1},{id:"archived-painting-389",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.3388273002239157,z:12.674026575599946,ix:1,iz:0,iw:.30545735008429553,ih:.41015414755015134,s:1,smax:1,title:"Tulsi Gabbard #2",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-389/",img:"art/archived-painting-389.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.1 in",hi:"https://img.tjm.art/gallery-wall/8bf2e4be17af62dd9bccf1e9d2f9aff40bac6ea178e0d5b0ef8610702d55c3c9-960.webp",fw:.3359373500842955,fh:.4406341475501513,w:.30545735008429553,h:.41015414755015134,hiLocal:!1},{id:"archived-painting-img-1612",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.7500000000000002,z:13.870405540375911,ix:1,iz:0,iw:.6439037649128522,ih:1.15424751414614,s:1,smax:1,title:"Bounty of Satoshi: Achievement",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-img-1612/",img:"art/archived-painting-img-1612.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/c987f826bbffc0e4dea91ece695bcfab8181cb008757b2e5c9b97c130088b6e1-960.webp",fw:.6743837649128521,fh:1.18472751414614,w:.6439037649128522,h:1.15424751414614,hiLocal:!0},{id:"archived-painting-img-1555",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:15.152848018776675,ix:1,iz:0,iw:.47174265287439665,ih:.3811856671234809,s:1,smax:1,title:"Dad Meditating in Yellowstone",price:"$400",status:"available",url:"https://tjm.art/products/archived-painting-img-1555/",img:"art/archived-painting-img-1555.webp",focal:!1,caption:"Shown at its largest print size, 18.6 × 15 in",hi:"https://img.tjm.art/gallery-wall/140afceb54fcf91b85e0778adfaff80793eb576d4d1a005b4ca5717e7cf6d0a1-960.webp",fw:.5022226528743966,fh:.41166566712348085,w:.47174265287439665,h:.3811856671234809,hiLocal:!1},{id:"book-art-14d2876a55c720cbc908",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:16.272604877590112,ix:1,iz:0,iw:.31853252573819546,ih:.2252024956969042,s:1,smax:1,title:"Jane and Sid in Zihuatanejo",price:null,status:"nfs",url:"https://tjm.art/products/book-art-14d2876a55c720cbc908/",img:"art/book-art-14d2876a55c720cbc908.webp",focal:!1,caption:"Shown at its largest print size, 12.5 × 8.9 in",hi:"https://img.tjm.art/wall-paintings/book-art-14d2876a55c720cbc908-987aa02cb7-960.webp",fw:.34901252573819547,fh:.2556824956969042,w:.31853252573819546,h:.2252024956969042,hiLocal:!1},{id:"book-art-616ff8378f27047b4a91",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.7500000000000002,z:17.214760034572635,ix:1,iz:0,iw:.11653924921257164,ih:.1265355583198389,s:1,smax:1,title:"Jasmine in Austin",price:null,status:"nfs",url:"https://tjm.art/products/book-art-616ff8378f27047b4a91/",img:"art/book-art-616ff8378f27047b4a91.webp",focal:!1,caption:"Shown at its largest print size, 4.6 × 5 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/616ff8378f27047b4a91.webp",fw:.14701924921257165,fh:.1570155583198389,w:.11653924921257164,h:.1265355583198389,hiLocal:!1},{id:"book-art-a627c7b7d19ace6b3e51",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.7500000000000002,z:18.102102930808954,ix:1,iz:0,iw:.208908004245782,ih:.23685714767095462,s:1,smax:1,title:"John",price:null,status:"nfs",url:"https://tjm.art/products/book-art-a627c7b7d19ace6b3e51/",img:"art/book-art-a627c7b7d19ace6b3e51.webp",focal:!1,caption:"Shown at its largest print size, 8.2 × 9.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/a627c7b7d19ace6b3e51.webp",fw:.23938800424578197,fh:.2673371476709546,w:.208908004245782,h:.23685714767095462,hiLocal:!1},{id:"book-art-28bec44600b36ed0766f",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:19.024474341847647,ix:1,iz:0,iw:.18659627881732538,ih:.2297983729277406,s:1,smax:1,title:"Julia's baby shower",price:null,status:"nfs",url:"https://tjm.art/products/book-art-28bec44600b36ed0766f/",img:"art/book-art-28bec44600b36ed0766f.webp",focal:!1,caption:"Shown at its largest print size, 7.3 × 9 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/28bec44600b36ed0766f.webp",fw:.21707627881732536,fh:.2602783729277406,w:.18659627881732538,h:.2297983729277406,hiLocal:!1},{id:"book-art-1143b08e177333e43dc7",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.7500000000000002,z:19.940521357652088,ix:1,iz:0,iw:.1962592137772773,ih:.2330869522295455,s:1,smax:1,title:"Kristine",price:null,status:"nfs",url:"https://tjm.art/products/book-art-1143b08e177333e43dc7/",img:"art/book-art-1143b08e177333e43dc7.webp",focal:!1,caption:"Shown at its largest print size, 7.7 × 9.2 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/1143b08e177333e43dc7.webp",fw:.2267392137772773,fh:.2635669522295455,w:.1962592137772773,h:.2330869522295455,hiLocal:!1},{id:"book-art-0ee2717bc04e65d0507e",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:20.891001772584758,ix:1,iz:0,iw:.2554630770737793,ih:.2807286561250322,s:1,smax:1,title:"Kushboo Kullar @DrKhushboo_K",price:null,status:"nfs",url:"https://tjm.art/products/book-art-0ee2717bc04e65d0507e/",img:"art/book-art-0ee2717bc04e65d0507e.webp",focal:!1,caption:"Shown at its largest print size, 10.1 × 11.1 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/0ee2717bc04e65d0507e.webp",fw:.2859430770737793,fh:.31120865612503223,w:.2554630770737793,h:.2807286561250322,hiLocal:!1},{id:"book-art-64cfd389b3dbb5cde532",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.75,z:21.84730804845513,ix:1,iz:0,iw:.20791093565269067,ih:.2469251017252858,s:1,smax:1,title:"Loree",price:null,status:"nfs",url:"https://tjm.art/products/book-art-64cfd389b3dbb5cde532/",img:"art/book-art-64cfd389b3dbb5cde532.webp",focal:!1,caption:"Shown at its largest print size, 8.2 × 9.7 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/64cfd389b3dbb5cde532.webp",fw:.23839093565269065,fh:.27740510172528576,w:.20791093565269067,h:.2469251017252858,hiLocal:!1},{id:"book-art-c04c7e48687fe35e65f5",kind:"painting",room:"people",wall:"W",x:-23.19,y:1.7500000000000002,z:22.733251758140742,ix:1,iz:0,iw:.11473794470424956,ih:.12512316761641173,s:1,smax:1,title:"Maya Parbhoe @MayaPar25",price:null,status:"nfs",url:"https://tjm.art/products/book-art-c04c7e48687fe35e65f5/",img:"art/book-art-c04c7e48687fe35e65f5.webp",focal:!1,caption:"Shown at its largest print size, 4.5 × 4.9 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/c04c7e48687fe35e65f5.webp",fw:.14521794470424956,fh:.15560316761641174,w:.11473794470424956,h:.12512316761641173,hiLocal:!1},{id:"book-art-c347459aa3f77f7213ae",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.75,z:4.031288520440233,ix:-1,iz:0,iw:.2736737990404821,ih:.15052058947226515,s:1,smax:1,title:"Mike and Julie in Leon",price:null,status:"nfs",url:"https://tjm.art/products/book-art-c347459aa3f77f7213ae/",img:"art/book-art-c347459aa3f77f7213ae.webp",focal:!1,caption:"Shown at its largest print size, 10.8 × 5.9 in",hi:"https://img.tjm.art/wall-paintings/book-art-c347459aa3f77f7213ae-8823455597-960.webp",fw:.30415379904048206,fh:.1810005894722651,w:.2736737990404821,h:.15052058947226515,hiLocal:!1},{id:"book-art-504e3fafdacd7c9bbcd0",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.75,z:3.1870684102945734,ix:-1,iz:0,iw:.12053726117178598,ih:.1731857200744052,s:1,smax:1,title:"Osisipho Filane @FilaneSisipho",price:null,status:"nfs",url:"https://tjm.art/products/book-art-504e3fafdacd7c9bbcd0/",img:"art/book-art-504e3fafdacd7c9bbcd0.webp",focal:!1,caption:"Shown at its largest print size, 4.7 × 6.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/504e3fafdacd7c9bbcd0.webp",fw:.151017261171786,fh:.2036657200744052,w:.12053726117178598,h:.1731857200744052,hiLocal:!1},{id:"book-art-4c6fb3817fed4e5a6195",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.75,z:2.3774571099828807,ix:-1,iz:0,iw:.20445617937254842,ih:.17849024459223478,s:1,smax:1,title:"Painting in Black Rock City",price:null,status:"nfs",url:"https://tjm.art/products/book-art-4c6fb3817fed4e5a6195/",img:"art/book-art-4c6fb3817fed4e5a6195.webp",focal:!1,caption:"Shown at its largest print size, 8.1 × 7 in",hi:"https://img.tjm.art/wall-paintings/book-art-4c6fb3817fed4e5a6195-5a0c40f61a-960.webp",fw:.2349361793725484,fh:.20897024459223476,w:.20445617937254842,h:.17849024459223478,hiLocal:!1},{id:"book-art-44161b6b117af79e3df4",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.75,z:1.5184262547770975,ix:-1,iz:0,iw:.21937637095996726,ih:.24375152328885252,s:1,smax:1,title:"Sergey",price:null,status:"nfs",url:"https://tjm.art/products/book-art-44161b6b117af79e3df4/",img:"art/book-art-44161b6b117af79e3df4.webp",focal:!1,caption:"Shown at its largest print size, 8.6 × 9.6 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/44161b6b117af79e3df4.webp",fw:.24985637095996724,fh:.2742315232888525,w:.21937637095996726,h:.24375152328885252,hiLocal:!1},{id:"book-art-466dc684227286c40502",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.75,z:.6967490346485565,ix:-1,iz:0,iw:.1297489092180624,ih:.19222060624898132,s:1,smax:1,title:"Sister Claire",price:null,status:"nfs",url:"https://tjm.art/products/book-art-466dc684227286c40502/",img:"art/book-art-466dc684227286c40502.webp",focal:!1,caption:"Shown at its largest print size, 5.1 × 7.6 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/466dc684227286c40502.webp",fw:.1602289092180624,fh:.22270060624898133,w:.1297489092180624,h:.19222060624898132,hiLocal:!1},{id:"book-art-db933efcbc4fbe01c841",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.75,z:11.748106662702765,ix:-1,iz:0,iw:.23561685640791083,ih:.36137554663790006,s:1,smax:1,title:"Steve",price:null,status:"nfs",url:"https://tjm.art/products/book-art-db933efcbc4fbe01c841/",img:"art/book-art-db933efcbc4fbe01c841.webp",focal:!1,caption:"Shown at its largest print size, 9.3 × 14.2 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/db933efcbc4fbe01c841.webp",fw:.2660968564079108,fh:.3918555466379,w:.23561685640791083,h:.36137554663790006,hiLocal:!1},{id:"book-art-ec22daff29e72f16eb76",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.75,z:10.972840980991652,ix:-1,iz:0,iw:.11626468882776059,ih:.1333310651694502,s:1,smax:1,title:"Tomer Strolight @TomerStrolight",price:null,status:"nfs",url:"https://tjm.art/products/book-art-ec22daff29e72f16eb76/",img:"art/book-art-ec22daff29e72f16eb76.webp",focal:!1,caption:"Shown at its largest print size, 4.6 × 5.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/ec22daff29e72f16eb76.webp",fw:.1467446888277606,fh:.1638110651694502,w:.11626468882776059,h:.1333310651694502,hiLocal:!1},{id:"book-art-deb92de6e72f7b3ce951",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.75,z:10.238579227382164,ix:-1,iz:0,iw:.15360900020465953,ih:.16880109912599947,s:1,smax:1,title:"Untitled — Bitcoiners, page 64",price:null,status:"nfs",url:"https://tjm.art/products/book-art-deb92de6e72f7b3ce951/",img:"art/book-art-deb92de6e72f7b3ce951.webp",focal:!1,caption:"Shown at its largest print size, 6 × 6.6 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/deb92de6e72f7b3ce951.webp",fw:.18408900020465951,fh:.19928109912599945,w:.15360900020465953,h:.16880109912599947,hiLocal:!1},{id:"archived-painting-90",kind:"painting",room:"archive",wall:"N",x:15.967909377872953,y:1.7500000000000004,z:23.465,ix:0,iz:-1,iw:.35533875574590656,ih:.6226440373371762,s:1,smax:1,title:"Sienna Dawn at Bass Coast",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-90/",img:"art/archived-painting-90.webp",focal:!1,caption:"14.75 × 23.25 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f974178c8dcf4970e390b3e3de23cf2ab8bbd96ac649906636195c7395c7d162-960.webp",fw:.38581875574590657,fh:.6531240373371763,w:.35533875574590656,h:.6226440373371762,hiLocal:!0},{id:"archived-painting-433",kind:"painting",room:"archive",wall:"N",x:17.011928073293785,y:3.559384975791667,z:23.465,ix:0,iz:-1,iw:.6395953588213836,ih:.3459211428733759,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #1",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-433/",img:"art/archived-painting-433.webp",focal:!1,caption:"23.25 × 14.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/d444d5892a8f556cf83218ca41a096112f34f9fc96a30cf646c7d7e042018a3d-960.webp",fw:.6700753588213836,fh:.37640114287337584,w:.6395953588213836,h:.3459211428733759,hiLocal:!0},{id:"archived-painting-436",kind:"painting",room:"archive",wall:"N",x:17.011928073293785,y:2.640785234701091,z:23.465,ix:0,iz:-1,iw:.3483255980479946,ih:.6303183393077763,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #2",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-436/",img:"art/archived-painting-436.webp",focal:!1,caption:"13.75 × 24.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/37fb5f76e383a5973699d952b83ee162c815fb2c144a105a289451e22af48a62-960.webp",fw:.37880559804799463,fh:.6607983393077763,w:.3483255980479946,h:.6303183393077763,hiLocal:!0},{id:"archived-painting-437",kind:"painting",room:"archive",wall:"N",x:17.011928073293785,y:1.7212277077275653,z:23.465,ix:0,iz:-1,iw:.6360730428627904,ih:.3478367146392753,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #3",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-437/",img:"art/archived-painting-437.webp",focal:!1,caption:"23.25 × 14.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/062ab28f5f678c9bfb0553c710f42785865ec766620e1e51ed79eed96676e661-960.webp",fw:.6665530428627905,fh:.37831671463927535,w:.6360730428627904,h:.3478367146392753,hiLocal:!0},{id:"archived-painting-438",kind:"painting",room:"archive",wall:"N",x:17.011928073293785,y:.9410346752039637,z:23.465,ix:0,iz:-1,iw:.6292840134187727,ih:.35158935040792766,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #4",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-438/",img:"art/archived-painting-438.webp",focal:!1,caption:"23.25 × 14.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/7b31e9134c311dd8c49a16428df99db5934e05e0bc9753c051ac30586898ad47-960.webp",fw:.6597640134187728,fh:.3820693504079277,w:.6292840134187727,h:.35158935040792766,hiLocal:!0},{id:"archived-painting-246",kind:"painting",room:"archive",wall:"N",x:18.097265411741077,y:3.1409631282702226,z:23.465,ix:0,iz:-1,iw:.3562093013220939,ih:.6296122649453384,s:1,smax:1,title:"Sunset from Atami, El Salvador #1",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-246/",img:"art/archived-painting-246.webp",focal:!1,caption:"13.5 × 25.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/1aa7d0a3b86d956b6fb23786e2288aa0b1f7e46b71e4babeeb461594eab790c4-960.webp",fw:.38668930132209384,fh:.6600922649453383,w:.3562093013220939,h:.6296122649453384,hiLocal:!0},{id:"archived-painting-248",kind:"painting",room:"archive",wall:"N",x:18.097265411741077,y:2.0949212113444866,z:23.465,ix:0,iz:-1,iw:.35662772104301044,ih:.601511568906133,s:1,smax:1,title:"Sunset from Atami, El Salvador #2",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-248/",img:"art/archived-painting-248.webp",focal:!1,caption:"14 × 23.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/e8a641e0f5ae6b44f06e638fbea763860320d36f238101d0ccf79ae498af36bd-960.webp",fw:.3871077210430104,fh:.631991568906133,w:.35662772104301044,h:.601511568906133,hiLocal:!0},{id:"archived-painting-247",kind:"painting",room:"archive",wall:"N",x:18.097265411741077,y:1.0644627134457099,z:23.465,ix:0,iz:-1,iw:.38810155373138133,ih:.5984454268914204,s:1,smax:1,title:"Sunset from Atami, El Salvador #3",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-247/",img:"art/archived-painting-247.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9064d4cf43de15de8bb99b0913e242f8473d59e03f39eb6224c0dc7ab1018920-960.webp",fw:.4185815537313813,fh:.6289254268914204,w:.38810155373138133,h:.5984454268914204,hiLocal:!1},{id:"archived-painting-249",kind:"painting",room:"archive",wall:"N",x:19.01099704084835,y:1.75,z:23.465,ix:0,iz:-1,iw:.3282761925506138,ih:.6131724583377,s:1,smax:1,title:"Lake in North Cascades",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-249/",img:"art/archived-painting-249.webp",focal:!1,caption:"13 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/0d8b905417ca735c995aee98ca4f07a719dfc8b8f4d89a6babf609ae159efa7d-960.webp",fw:.35875619255061375,fh:.6436524583376999,w:.3282761925506138,h:.6131724583377,hiLocal:!0},{id:"archived-painting-18",kind:"painting",room:"archive",wall:"N",x:20.33102859382673,y:1.7500000000000002,z:23.465,ix:0,iz:-1,iw:1.1847552752689643,ih:.5815807655666065,s:1,smax:1,title:"Mayan Warrior",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-18/",img:"art/archived-painting-18.webp",focal:!1,caption:"44.5 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/2f86850a9431808e9abbf7882abf72c33f5aa61632855b1088b085b64a0b40da-960.webp",fw:1.2152352752689644,fh:.6120607655666066,w:1.1847552752689643,h:.5815807655666065,hiLocal:!0},{id:"archived-painting-19",kind:"painting",room:"archive",wall:"N",x:22.064858934799197,y:1.75,z:23.465,ix:0,iz:-1,iw:1.1898021304016044,ih:.5856207365882024,s:1,smax:1,title:"The Temple, Daytime",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-19/",img:"art/archived-painting-19.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/73ae0f9353d8e6952c0f74268dfd91fe5d3be1e7912e838e621676425f6f65f6-960.webp",fw:1.2202821304016045,fh:.6161007365882024,w:1.1898021304016044,h:.5856207365882024,hiLocal:!0},{id:"archived-painting-20",kind:"painting",room:"archive",wall:"S",x:22.006254513533335,y:1.75,z:.035000000000000156,ix:0,iz:1,iw:1.1870005037951072,ih:.5870029522079062,s:1,smax:1,title:"The Temple, the Lighting #2",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-20/",img:"art/archived-painting-20.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/05a725ac7c5f8c65d1b11f67ad3533fced0e63f4354f29aba8bd181549c07f98-960.webp",fw:1.2174805037951073,fh:.6174829522079063,w:1.1870005037951072,h:.5870029522079062,hiLocal:!0},{id:"archived-painting-307",kind:"painting",room:"archive",wall:"S",x:20.48312490709642,y:1.75,z:.035000000000000336,ix:0,iz:1,iw:.5782882399404912,ih:.432975652793144,s:1,smax:1,title:"Cross on Maui",price:"$250",status:"available",url:"https://tjm.art/products/archived-painting-307/",img:"art/archived-painting-307.webp",focal:!1,caption:"Shown at its largest print size, 22.8 × 17 in",hi:"https://img.tjm.art/gallery-wall/74b889871f4a2aacebfea38f8b5ae1be8ce5f1f03c9c820e0172d25114e138b9-960.webp",fw:.6087682399404911,fh:.46345565279314394,w:.5782882399404912,h:.432975652793144,hiLocal:!1},{id:"archived-painting-385",kind:"painting",room:"archive",wall:"S",x:19.40298071168771,y:2.175032580282684,z:.03500000000000047,ix:0,iz:1,iw:.29760639098720554,ih:.40622680202403666,s:1,smax:1,title:"Holding the Line",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-385/",img:"art/archived-painting-385.webp",focal:!1,caption:"Shown at its largest print size, 11.7 × 16 in",hi:"https://img.tjm.art/gallery-wall/6e037122c56177197ba12817fa36682ab1a74b1ded40830c99a02432f3b3ea99-960.webp",fw:.3280863909872055,fh:.4367068020240366,w:.29760639098720554,h:.40622680202403666,hiLocal:!1},{id:"archived-painting-386",kind:"painting",room:"archive",wall:"S",x:19.40298071168771,y:1.3338729920782038,z:.03500000000000047,ix:0,iz:1,iw:.3044529724902071,ih:.4151323743849239,s:1,smax:1,title:"Holding the Line #2",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-386/",img:"art/archived-painting-386.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.3 in",hi:"https://img.tjm.art/gallery-wall/30d546d939ec9a4e26f594f42706d2f067312dc19bc5d93ab512d8d860d9b914-960.webp",fw:.3349329724902071,fh:.4456123743849239,w:.3044529724902071,h:.4151323743849239,hiLocal:!1},{id:"archived-painting-241",kind:"painting",room:"archive",wall:"S",x:18.272584986843874,y:1.75,z:.03500000000000061,ix:0,iz:1,iw:.6719447173077279,ih:.5117538260852478,s:1,smax:1,title:"On a Trip with Elsa",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-241/",img:"art/archived-painting-241.webp",focal:!1,caption:"26 × 20.5 in (W × H)",hi:"https://img.tjm.art/gallery-wall/82dce5605cb36a0d8c1fc15de07dfd2d539291a947ee3c425ae29485633359ac-960.webp",fw:.7024247173077278,fh:.5422338260852477,w:.6719447173077279,h:.5117538260852478,hiLocal:!0},{id:"archived-painting-1",kind:"painting",room:"archive",wall:"S",x:17.118901653653143,y:1.7500000000000002,z:.03500000000000075,ix:0,iz:1,iw:.35445147993550535,ih:.08560976078633208,s:1,smax:1,title:"Painting #1",price:"$400",status:"available",url:"https://tjm.art/products/archived-painting-1/",img:"art/archived-painting-1.webp",focal:!1,caption:"Shown at its largest print size, 14 × 3.4 in",hi:"https://img.tjm.art/gallery-wall/e9876274627a9afe2ddb371681be76c5343f6d079f465440a2179049cbfa7669-960.webp",fw:.3849314799355053,fh:.11608976078633203,w:.35445147993550535,h:.08560976078633208,hiLocal:!1},{id:"archived-painting-193",kind:"painting",room:"archive",wall:"S",x:16.075717956842695,y:1.75,z:.03500000000000088,ix:0,iz:1,iw:.45094544454716207,ih:.49291747316329876,s:1,smax:1,title:"Painting #193",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-193/",img:"art/archived-painting-193.webp",focal:!1,caption:"Shown at its largest print size, 17.8 × 19.4 in",hi:"https://img.tjm.art/gallery-wall/b359eb147108c36e50c722a17f3d45a1ebd0f0cbaf58e8dfaaecc5bd1c6bd33d-960.webp",fw:.4814254445471621,fh:.5233974731632988,w:.45094544454716207,h:.49291747316329876,hiLocal:!1},{id:"archived-painting-2",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.7500000000000002,z:.8382915995347231,ix:1,iz:0,iw:.35479442804427136,ih:.09049755275097258,s:1,smax:1,title:"Painting #2",price:"$400",status:"available",url:"https://tjm.art/products/archived-painting-2/",img:"art/archived-painting-2.webp",focal:!1,caption:"Shown at its largest print size, 14 × 3.6 in",hi:"https://img.tjm.art/gallery-wall/e661e119f7f15ccbe7c71c081b858bca38b1a7a837ff5acf7e60c77f7938ac31-960.webp",fw:.38527442804427137,fh:.12097755275097259,w:.35479442804427136,h:.09049755275097258,hiLocal:!1},{id:"archived-painting-217",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.7500000000000004,z:1.7889383835809143,ix:1,iz:0,iw:.19423036902293628,ih:.6172905064287307,s:1,smax:1,title:"Painting #217",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-217/",img:"art/archived-painting-217.webp",focal:!1,caption:"Shown at its largest print size, 7.6 × 24.3 in",hi:"https://img.tjm.art/gallery-wall/0adb3354b13717fde1f05575dace2085698d3eb35dca17f0fa5a6d2273d7beee-960.webp",fw:.22471036902293628,fh:.6477705064287307,w:.19423036902293628,h:.6172905064287307,hiLocal:!0},{id:"archived-painting-226",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.75,z:2.8682194019782403,ix:1,iz:0,iw:.6120628967465405,ih:.43018745909328887,s:1,smax:1,title:"Painting #226",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-226/",img:"art/archived-painting-226.webp",focal:!1,caption:"Shown at its largest print size, 24.1 × 16.9 in",hi:"https://img.tjm.art/gallery-wall/58877194b4cb1a4caa6f655c50e29aa546c154fb9fb58223b09220a613d1727e-960.webp",fw:.6425428967465405,fh:.46066745909328893,w:.6120628967465405,h:.43018745909328887,hiLocal:!0},{id:"archived-painting-233",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.75,z:3.994745425175755,ix:1,iz:0,iw:.2887203786233148,ih:.40613728033124363,s:1,smax:1,title:"Painting #233",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-233/",img:"art/archived-painting-233.webp",focal:!1,caption:"Shown at its largest print size, 11.4 × 16 in",hi:"https://img.tjm.art/gallery-wall/a5cfc0849615388546a9ec9772b91a5d485057f77ec3de9c2503385fc3893b36-960.webp",fw:.3192003786233148,fh:.43661728033124364,w:.2887203786233148,h:.40613728033124363,hiLocal:!1},{id:"archived-painting-354",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.7500000000000002,z:7.973804404838536,ix:1,iz:0,iw:.45202737701990925,ih:.616978015067429,s:1,smax:1,title:"Painting #354",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-354/",img:"art/archived-painting-354.webp",focal:!1,caption:"Shown at its largest print size, 17.8 × 24.3 in",hi:"https://img.tjm.art/gallery-wall/020829831bba99f303622a9351e674b4bf0a3794f5995ecf744bdae4179eda33-960.webp",fw:.48250737701990926,fh:.647458015067429,w:.45202737701990925,h:.616978015067429,hiLocal:!0},{id:"archived-painting-368",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.75,z:8.91825461749796,ix:1,iz:0,iw:.310811615641774,ih:.4129209297625201,s:1,smax:1,title:"Painting #368",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-368/",img:"art/archived-painting-368.webp",focal:!1,caption:"Shown at its largest print size, 12.2 × 16.3 in",hi:"https://img.tjm.art/gallery-wall/4bf6fd5e67133125a7715aa9aa4e67dd313fee4888717a8ff7855fdabc219d13-960.webp",fw:.341291615641774,fh:.4434009297625201,w:.310811615641774,h:.4129209297625201,hiLocal:!1},{id:"archived-painting-369",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.75,z:9.851284354634192,ix:1,iz:0,iw:.42918642597353035,ih:.3108047599764939,s:1,smax:1,title:"Painting #369",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-369/",img:"art/archived-painting-369.webp",focal:!1,caption:"Shown at its largest print size, 16.9 × 12.2 in",hi:"https://img.tjm.art/gallery-wall/3b82c491eb2e0d50fc70d1fbb0cfe5581ab1971fcbed338850ca6ed6b7700f55-960.webp",fw:.45966642597353036,fh:.34128475997649393,w:.42918642597353035,h:.3108047599764939,hiLocal:!1},{id:"archived-painting-371",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.75,z:10.832572575523823,ix:1,iz:0,iw:.40732858314856885,ih:.298876819161764,s:1,smax:1,title:"Painting #371",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-371/",img:"art/archived-painting-371.webp",focal:!1,caption:"Shown at its largest print size, 16 × 11.8 in",hi:"https://img.tjm.art/gallery-wall/c22a2fde103c8c65575e5b871116318b6e87c6d8ac914177b3373cb84a673711-960.webp",fw:.4378085831485688,fh:.32935681916176396,w:.40732858314856885,h:.298876819161764,hiLocal:!1},{id:"archived-painting-373",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.75,z:11.750738433549053,ix:1,iz:0,iw:.30294170024472894,ih:.41790896375564396,s:1,smax:1,title:"Painting #373",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-373/",img:"art/archived-painting-373.webp",focal:!1,caption:"Shown at its largest print size, 11.9 × 16.5 in",hi:"https://img.tjm.art/gallery-wall/aeb9c6621442e41a7670b8de9d31b17b2bae4cb8f40e8c9e2dd849f2bbeaca0c-960.webp",fw:.33342170024472895,fh:.44838896375564397,w:.30294170024472894,h:.41790896375564396,hiLocal:!1},{id:"archived-painting-375",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.7500000000000002,z:15.725715053598314,ix:1,iz:0,iw:.32377650871822644,ih:.42967047274606995,s:1,smax:1,title:"Painting #375",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-375/",img:"art/archived-painting-375.webp",focal:!1,caption:"Shown at its largest print size, 12.7 × 16.9 in",hi:"https://img.tjm.art/gallery-wall/73624bb4c2211042e2e50e91fbbc6de8795cf5765c54181f41f643ca4cabe292-960.webp",fw:.35425650871822645,fh:.46015047274606996,w:.32377650871822644,h:.42967047274606995,hiLocal:!1},{id:"archived-painting-4",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.75,z:16.59142323063759,ix:1,iz:0,iw:.34950624688192267,ih:.0806683103120543,s:1,smax:1,title:"Painting #4",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-4/",img:"art/archived-painting-4.webp",focal:!1,caption:"Shown at its largest print size, 13.8 × 3.2 in",hi:"https://img.tjm.art/gallery-wall/992f895182682e7172da1054d9e7d1172877e138d3f8b537f49c430b4bece967-960.webp",fw:.3799862468819226,fh:.11114831031205426,w:.34950624688192267,h:.0806683103120543,hiLocal:!1},{id:"archived-painting-62",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.75,z:17.539294976278477,ix:1,iz:0,iw:.49093004744304686,ih:.5438974379154836,s:1,smax:1,title:"Painting #62",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-62/",img:"art/archived-painting-62.webp",focal:!1,caption:"19.25 × 21.5 in (W × H)",hi:"https://img.tjm.art/gallery-wall/46554d5969de58ccb45aa2f91a55920cbe49d85f342c8cda7fe49ffadc646818-960.webp",fw:.5214100474430469,fh:.5743774379154836,w:.49093004744304686,h:.5438974379154836,hiLocal:!1},{id:"archived-painting-73",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.7500000000000002,z:21.57506036632922,ix:1,iz:0,iw:.36999944610352575,ih:.5929977399010532,s:1,smax:1,title:"Painting #73",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-73/",img:"art/archived-painting-73.webp",focal:!1,caption:"Shown at its largest print size, 14.6 × 23.3 in",hi:"https://img.tjm.art/gallery-wall/ce548dec7454c6a31c49a759c41152114abd14e1731fc91f48c9c1e206c2d32c-960.webp",fw:.40047944610352576,fh:.6234777399010532,w:.36999944610352575,h:.5929977399010532,hiLocal:!1},{id:"archived-painting-75",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.7500000000000002,z:22.637650044690492,ix:1,iz:0,iw:.3445786240640955,ih:.5051449836439503,s:1,smax:1,title:"Painting #75",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-75/",img:"art/archived-painting-75.webp",focal:!1,caption:"Shown at its largest print size, 13.6 × 19.9 in",hi:"https://img.tjm.art/gallery-wall/09b012e1ac23215f0b5d3d63350ef9a0882e5c3d1680802239e0ad603bc2f2af-960.webp",fw:.37505862406409546,fh:.5356249836439503,w:.3445786240640955,h:.5051449836439503,hiLocal:!1},{id:"archived-painting-76",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.75,z:22.637040659235222,ix:-1,iz:0,iw:.3580590737646268,ih:.4902160381361643,s:1,smax:1,title:"Painting #76",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-76/",img:"art/archived-painting-76.webp",focal:!1,caption:"Shown at its largest print size, 14.1 × 19.3 in",hi:"https://img.tjm.art/gallery-wall/64b732c7f9f637d54873d5dc1656279ee18adcf4d17ba5389298e61d6890895e-960.webp",fw:.38853907376462676,fh:.5206960381361643,w:.3580590737646268,h:.4902160381361643,hiLocal:!1},{id:"archived-painting-15",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.75,z:21.15706620645686,ix:-1,iz:0,iw:1.2035502240271645,ih:.5724986512772634,s:1,smax:1,title:"Symbiosis #1",price:"$1,000",status:"available",url:"https://tjm.art/products/archived-painting-15/",img:"art/archived-painting-15.webp",focal:!1,caption:"44.5 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/7112103318fcb79bfaae9e8fb67b3a2badc1b9bc3313084870aaa9df993f6c13-960.webp",fw:1.2340302240271646,fh:.6029786512772635,w:1.2035502240271645,h:.5724986512772634,hiLocal:!0},{id:"older-work-beach-sunsets-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.3093158640553,z:19.767918642363554,ix:-1,iz:0,iw:.17640529639451843,ih:.12800409319627243,s:1,smax:1,title:"TJ Beach Sunset 309",price:"$75",status:"available",url:"https://tjm.art/products/older-work-beach-sunsets-original-3/",img:"art/older-work-beach-sunsets-original-3.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-beach-sunsets-original-3-9148b73270-960.webp",fw:.20688529639451844,fh:.15848409319627244,w:.17640529639451843,h:.12800409319627243,hiLocal:!1},{id:"older-work-beach-sunsets-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.7500918382242117,z:19.767918642363554,ix:-1,iz:0,iw:.1743891696510494,ih:.12948395846590416,s:1,smax:1,title:"TJ Beach Sunset 310",price:"$75",status:"available",url:"https://tjm.art/products/older-work-beach-sunsets-original-1/",img:"art/older-work-beach-sunsets-original-1.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-beach-sunsets-original-1-4fb0883ec1-960.webp",fw:.20486916965104937,fh:.15996395846590414,w:.1743891696510494,h:.12948395846590416,hiLocal:!1},{id:"older-work-beach-sunsets-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.1908127094585963,z:19.767918642363554,ix:-1,iz:0,iw:.17625354987491224,ih:.12811429906532681,s:1,smax:1,title:"TJ Beach Sunset 311",price:"$75",status:"available",url:"https://tjm.art/products/older-work-beach-sunsets-original-2/",img:"art/older-work-beach-sunsets-original-2.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-beach-sunsets-original-2-c33a395a68-960.webp",fw:.20673354987491221,fh:.1585942990653268,w:.17625354987491224,h:.12811429906532681,hiLocal:!1},{id:"older-work-shore-figures-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.2803803206837663,z:18.925908886296412,ix:-1,iz:0,iw:.10887853937874756,ih:.1007335335556571,s:1,smax:1,title:"TJ Crab on Beach 180",price:"$75",status:"available",url:"https://tjm.art/products/older-work-shore-figures-original-3/",img:"art/older-work-shore-figures-original-3.webp",focal:!1,caption:"4.25 × 4 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-shore-figures-original-3-dcfe558566-960.webp",fw:.13935853937874756,fh:.13121353355565712,w:.10887853937874756,h:.1007335335556571,hiLocal:!1},{id:"older-work-shore-figures-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.7493936788686981,z:18.925908886296412,ix:-1,iz:0,iw:.10937123389172913,ih:.10027975007447913,s:1,smax:1,title:"TJ Figures on a Shore 179",price:"$75",status:"available",url:"https://tjm.art/products/older-work-shore-figures-original-1/",img:"art/older-work-shore-figures-original-1.webp",focal:!1,caption:"4.25 × 4 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-shore-figures-original-1-ddd0d8fd53-960.webp",fw:.13985123389172913,fh:.13075975007447913,w:.10937123389172913,h:.10027975007447913,hiLocal:!1},{id:"older-work-shore-figures-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.2187708297324114,z:18.925908886296412,ix:-1,iz:0,iw:.10967067657090578,ih:.10000594819809469,s:1,smax:1,title:"TJ Wading Figure 181",price:"$75",status:"available",url:"https://tjm.art/products/older-work-shore-figures-original-2/",img:"art/older-work-shore-figures-original-2.webp",focal:!1,caption:"4.25 × 4 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-shore-figures-original-2-7764c6d6dc-960.webp",fw:.14015067657090577,fh:.13048594819809467,w:.10967067657090578,h:.10000594819809469,hiLocal:!1},{id:"older-work-sunset-ridge-strips-original-6",kind:"painting",room:"archive",wall:"E",x:23.19,y:3.502812867329231,z:18.00289260302096,ix:-1,iz:0,iw:.3376262136189952,ih:.1031870115373054,s:1,smax:1,title:"TJ Sunset Ridge Strip 158",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-6/",img:"art/older-work-sunset-ridge-strips-original-6.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-6-dff8599ae8-960.webp",fw:.36810621361899515,fh:.13366701153730537,w:.3376262136189952,h:.1031870115373054,hiLocal:!1},{id:"older-work-sunset-ridge-strips-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.967946452945879,z:18.00289260302096,ix:-1,iz:0,iw:.32995567884187116,ih:.10558581722939876,s:1,smax:1,title:"TJ Sunset Ridge Strip 159",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-3/",img:"art/older-work-sunset-ridge-strips-original-3.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-3-21e11dff2c-960.webp",fw:.36043567884187117,fh:.13606581722939876,w:.32995567884187116,h:.10558581722939876,hiLocal:!1},{id:"older-work-sunset-ridge-strips-original-4",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.4318806357164804,z:18.00289260302096,ix:-1,iz:0,iw:.32995567884187116,ih:.10558581722939876,s:1,smax:1,title:"TJ Sunset Ridge Strip 164",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-4/",img:"art/older-work-sunset-ridge-strips-original-4.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-4-14a797f9ad-960.webp",fw:.36043567884187117,fh:.13606581722939876,w:.32995567884187116,h:.10558581722939876,hiLocal:!1},{id:"older-work-sunset-ridge-strips-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.896228886908436,z:18.00289260302096,ix:-1,iz:0,iw:.3325640647196524,ih:.1047576803866905,s:1,smax:1,title:"TJ Sunset Ridge Strip 165",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-2/",img:"art/older-work-sunset-ridge-strips-original-2.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-2-0104aa0349-960.webp",fw:.36304406471965234,fh:.13523768038669046,w:.3325640647196524,h:.1047576803866905,hiLocal:!1},{id:"older-work-sunset-ridge-strips-original-5",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.358207219897568,z:18.00289260302096,ix:-1,iz:0,iw:.3157800461825986,ih:.11032565363504537,s:1,smax:1,title:"TJ Sunset Ridge Strip 173",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-5/",img:"art/older-work-sunset-ridge-strips-original-5.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-5-e3b3002667-960.webp",fw:.3462600461825986,fh:.14080565363504538,w:.3157800461825986,h:.11032565363504537,hiLocal:!1},{id:"older-work-sunset-ridge-strips-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:.8189021965400229,z:18.00289260302096,ix:-1,iz:0,iw:.3246106406957881,ih:.10732439308004495,s:1,smax:1,title:"TJ Sunset Ridge Strip 174",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-1/",img:"art/older-work-sunset-ridge-strips-original-1.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-1-c76d05d284-960.webp",fw:.35509064069578805,fh:.13780439308004488,w:.3246106406957881,h:.10732439308004495,hiLocal:!1},{id:"older-work-mountain-layers-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.5744358464265322,z:17.045136256962337,ix:-1,iz:0,iw:.17068805365440642,ih:.1322916250818533,s:1,smax:1,title:"TJ Blue Mountain Layers 185",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-1/",img:"art/older-work-mountain-layers-original-1.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-1-58258ae4c4-960.webp",fw:.20116805365440643,fh:.1627716250818533,w:.17068805365440642,h:.1322916250818533,hiLocal:!1},{id:"older-work-mountain-layers-original-4",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.0154922361803016,z:17.045136256962337,ix:-1,iz:0,iw:.18117296207081954,ih:.12463559541060748,s:1,smax:1,title:"TJ Golden Mountain Layers 153",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-4/",img:"art/older-work-mountain-layers-original-4.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-4-ec72f50db4-960.webp",fw:.21165296207081952,fh:.15511559541060746,w:.18117296207081954,h:.12463559541060748,hiLocal:!1},{id:"older-work-mountain-layers-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.4613206149442066,z:17.045136256962337,ix:-1,iz:0,iw:.18395953438253063,ih:.12274764706158293,s:1,smax:1,title:"TJ Orange Mountain Layers 186",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-2/",img:"art/older-work-mountain-layers-original-2.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-2-b2f21e4a46-960.webp",fw:.21443953438253063,fh:.15322764706158293,w:.18395953438253063,h:.12274764706158293,hiLocal:!1},{id:"older-work-mountain-layers-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:.9095413181906952,z:17.045136256962337,ix:-1,iz:0,iw:.1884056878122314,ih:.11985094644543981,s:1,smax:1,title:"TJ Red Mountain Layers 156",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-3/",img:"art/older-work-mountain-layers-original-3.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-3-ff36e67e60-960.webp",fw:.2188856878122314,fh:.1503309464454398,w:.1884056878122314,h:.11985094644543981,hiLocal:!1},{id:"older-work-lake-hillside-color-wheel-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.3019951455200034,z:16.15941039012752,ix:-1,iz:0,iw:.1691321052963144,ih:.13350865561827818,s:1,smax:1,title:"TJ Color Wheel Study 184",price:"$75",status:"available",url:"https://tjm.art/products/older-work-lake-hillside-color-wheel-original-3/",img:"art/older-work-lake-hillside-color-wheel-original-3.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-lake-hillside-color-wheel-original-3-0794df63c5-960.webp",fw:.1996121052963144,fh:.1639886556182782,w:.1691321052963144,h:.13350865561827818,hiLocal:!1},{id:"older-work-lake-hillside-color-wheel-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.7418148912640325,z:16.15941039012752,ix:-1,iz:0,iw:.17936506200343974,ih:.12589185289366425,s:1,smax:1,title:"TJ Golden Hillside 141",price:"$75",status:"available",url:"https://tjm.art/products/older-work-lake-hillside-color-wheel-original-2/",img:"art/older-work-lake-hillside-color-wheel-original-2.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-lake-hillside-color-wheel-original-2-7ae1a5eed1-960.webp",fw:.20984506200343972,fh:.15637185289366423,w:.17936506200343974,h:.12589185289366425,hiLocal:!1},{id:"older-work-lake-hillside-color-wheel-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.186545702249642,z:16.15941039012752,ix:-1,iz:0,iw:.1825631367308004,ih:.12368652513511728,s:1,smax:1,title:"TJ Mountain Lake 145",price:"$75",status:"available",url:"https://tjm.art/products/older-work-lake-hillside-color-wheel-original-1/",img:"art/older-work-lake-hillside-color-wheel-original-1.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-lake-hillside-color-wheel-original-1-4c3ee3593e-960.webp",fw:.2130431367308004,fh:.15416652513511725,w:.1825631367308004,h:.12368652513511728,hiLocal:!1},{id:"older-work-forest-triptych-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.4921287551046047,z:15.276621069621163,ix:-1,iz:0,iw:.17796038079973686,ih:.8428825524305789,s:1,smax:1,title:"TJ Forest 302",price:"$250",status:"available",url:"https://tjm.art/products/older-work-forest-triptych-original-2/",img:"art/older-work-forest-triptych-original-2.webp",focal:!1,caption:"7.75 × 30 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-forest-triptych-original-2-dfc6702110-960.webp",fw:.20844038079973684,fh:.8733625524305788,w:.17796038079973686,h:.8428825524305789,hiLocal:!0},{id:"older-work-forest-triptych-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.2027237394446577,z:15.276621069621163,ix:-1,iz:0,iw:.1714346002784124,ih:.8749674788893149,s:1,smax:1,title:"TJ Forest 303",price:"$250",status:"available",url:"https://tjm.art/products/older-work-forest-triptych-original-1/",img:"art/older-work-forest-triptych-original-1.webp",focal:!1,caption:"7.75 × 30 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-forest-triptych-original-1-c2340a270a-960.webp",fw:.2019146002784124,fh:.905447478889315,w:.1714346002784124,h:.8749674788893149,hiLocal:!0},{id:"older-work-forest-triptych-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.75,z:14.396642128877595,ix:-1,iz:0,iw:.1836578929224663,ih:.8167342966486302,s:1,smax:1,title:"TJ Forest 304",price:"$250",status:"available",url:"https://tjm.art/products/older-work-forest-triptych-original-3/",img:"art/older-work-forest-triptych-original-3.webp",focal:!1,caption:"7.75 × 30 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-forest-triptych-original-3-59db81a04b-960.webp",fw:.2141378929224663,fh:.8472142966486302,w:.1836578929224663,h:.8167342966486302,hiLocal:!0},{id:"older-work-ridge-strips-unindexed-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:3.9825372818832645,z:13.436792132403184,ix:-1,iz:0,iw:.3335582793883297,ih:.10444543623347073,s:1,smax:1,title:"TJ Ridge Strip Study A",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-1/",img:"art/older-work-ridge-strips-unindexed-original-1.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-1-2c69db1f5f-960.webp",fw:.36403827938832967,fh:.1349254362334707,w:.3335582793883297,h:.10444543623347073,hiLocal:!1},{id:"older-work-ridge-strips-unindexed-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:3.4488780392824165,z:13.436792132403184,ix:-1,iz:0,iw:.34184670513451015,ih:.10191304896822584,s:1,smax:1,title:"TJ Ridge Strip Study B",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-2/",img:"art/older-work-ridge-strips-unindexed-original-2.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-2-decfb037a2-960.webp",fw:.3723267051345101,fh:.1323930489682258,w:.34184670513451015,h:.10191304896822584,hiLocal:!1},{id:"older-work-ridge-strips-unindexed-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.9153231378809434,z:13.436792132403184,ix:-1,iz:0,iw:.3342260643999036,ih:.10423675383471993,s:1,smax:1,title:"TJ Ridge Strip Study C",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-3/",img:"art/older-work-ridge-strips-unindexed-original-3.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-3-ff1b439d1f-960.webp",fw:.36470606439990355,fh:.13471675383471987,w:.3342260643999036,h:.10423675383471993,hiLocal:!1},{id:"older-work-ridge-strips-unindexed-original-4",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.3815550283328575,z:13.436792132403184,ix:-1,iz:0,iw:.3404223376680326,ih:.1023394652614523,s:1,smax:1,title:"TJ Ridge Strip Study D",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-4/",img:"art/older-work-ridge-strips-unindexed-original-4.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-4-6893b24edb-960.webp",fw:.37090233766803254,fh:.13281946526145225,w:.3404223376680326,h:.1023394652614523,hiLocal:!1},{id:"older-work-ridge-strips-unindexed-original-5",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.847112387087432,z:13.436792132403184,ix:-1,iz:0,iw:.32995567884187116,ih:.10558581722939876,s:1,smax:1,title:"TJ Ridge Strip Study E",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-5/",img:"art/older-work-ridge-strips-unindexed-original-5.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-5-e51b25f0ee-960.webp",fw:.36043567884187117,fh:.13606581722939876,w:.32995567884187116,h:.10558581722939876,hiLocal:!1},{id:"older-work-ridge-strips-unindexed-original-6",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.3101265854674213,z:13.436792132403184,ix:-1,iz:0,iw:.32430425965470866,ih:.10742578601062223,s:1,smax:1,title:"TJ Ridge Strip Study F",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-6/",img:"art/older-work-ridge-strips-unindexed-original-6.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-6-bc88075727-960.webp",fw:.35478425965470867,fh:.13790578601062226,w:.32430425965470866,h:.10742578601062223,hiLocal:!1},{id:"older-work-ridge-strips-unindexed-original-7",kind:"painting",room:"archive",wall:"E",x:23.19,y:.7739198660550866,z:13.436792132403184,ix:-1,iz:0,iw:.3348978762625271,ih:.10402765281404748,s:1,smax:1,title:"TJ Ridge Strip Study G",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-7/",img:"art/older-work-ridge-strips-unindexed-original-7.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-7-84ca4c65a8-960.webp",fw:.3653778762625271,fh:.13450765281404747,w:.3348978762625271,h:.10402765281404748,hiLocal:!1},{id:"older-work-portraits-319-329-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:3.03082101261697,z:12.44886040461393,ix:-1,iz:0,iw:.2315329298059804,ih:.26959115514283843,s:1,smax:1,title:"TJ Andreas Antonopoulos 327",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-3/",img:"art/older-work-portraits-319-329-original-3.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-3-00609e5994-960.webp",fw:.26201292980598034,fh:.3000711551428384,w:.2315329298059804,h:.26959115514283843,hiLocal:!1},{id:"older-work-portraits-319-329-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.3287389439886113,z:12.44886040461393,ix:-1,iz:0,iw:.22812963594695507,ih:.27361298211387924,s:1,smax:1,title:"TJ Bernard Parah 329",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-1/",img:"art/older-work-portraits-319-329-original-1.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-1-b878be8767-960.webp",fw:.2586096359469551,fh:.30409298211387925,w:.22812963594695507,h:.27361298211387924,hiLocal:!1},{id:"older-work-portraits-319-329-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.6190856267759437,z:12.44886040461393,ix:-1,iz:0,iw:.2192197146114744,ih:.28473365231145525,s:1,smax:1,title:"TJ José 328",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-2/",img:"art/older-work-portraits-319-329-original-2.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-2-b95ff95919-960.webp",fw:.2496997146114744,fh:.31521365231145526,w:.2192197146114744,h:.28473365231145525,hiLocal:!1},{id:"older-work-portraits-319-329-original-4",kind:"painting",room:"archive",wall:"E",x:23.19,y:.905739400310108,z:12.44886040461393,ix:-1,iz:0,iw:.22213343922546733,ih:.28099880062021615,s:1,smax:1,title:"TJ Portrait with Glasses 319",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-4/",img:"art/older-work-portraits-319-329-original-4.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-4-54ae5f717f-960.webp",fw:.2526134392254673,fh:.31147880062021616,w:.22213343922546733,h:.28099880062021615,hiLocal:!1},{id:"older-work-provibes-sandwiches-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.1222332567233653,z:11.412365428327357,ix:-1,iz:0,iw:.4431174150022327,ih:.31212082919219764,s:1,smax:1,title:"TJ Devo and Sarah Sandwich (L)",price:"$250",status:"available",url:"https://tjm.art/products/older-work-provibes-sandwiches-original-1/",img:"art/older-work-provibes-sandwiches-original-1.webp",focal:!1,caption:"17.5 × 12.25 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-provibes-sandwiches-original-1-d6ae18ddad-960.webp",fw:.4735974150022326,fh:.3426008291921976,w:.4431174150022327,h:.31212082919219764,hiLocal:!1},{id:"older-work-provibes-sandwiches-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.3790105327796571,z:11.412365428327357,ix:-1,iz:0,iw:.44135861788059005,ih:.313364618695219,s:1,smax:1,title:"TJ Devo and Sarah Sandwich (R)",price:"$250",status:"available",url:"https://tjm.art/products/older-work-provibes-sandwiches-original-2/",img:"art/older-work-provibes-sandwiches-original-2.webp",focal:!1,caption:"17.5 × 12.25 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-provibes-sandwiches-original-2-7ff72bcea8-960.webp",fw:.47183861788059006,fh:.343844618695219,w:.44135861788059005,h:.313364618695219,hiLocal:!1},{id:"older-work-bitcoin-voices-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:3.4362741684761926,z:10.380291520535945,ix:-1,iz:0,iw:.16580873134365143,ih:.3314636512482086,s:1,smax:1,title:"TJ Jack Mallers",price:"$200",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-1/",img:"art/older-work-bitcoin-voices-original-1.webp",focal:!1,caption:"7.25 × 11.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-1-b220032d08-960.webp",fw:.19628873134365143,fh:.3619436512482086,w:.16580873134365143,h:.3314636512482086,hiLocal:!1},{id:"older-work-bitcoin-voices-original-4",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.6130029551726106,z:10.380291520535945,ix:-1,iz:0,iw:.2727716331527744,ih:.4541187753589548,s:1,smax:1,title:"TJ Michael Saylor",price:"$250",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-4/",img:"art/older-work-bitcoin-voices-original-4.webp",focal:!1,caption:"12 × 16 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-4-ee3c8b5799-960.webp",fw:.3032516331527744,fh:.4845987753589548,w:.2727716331527744,h:.4541187753589548,hiLocal:!1},{id:"older-work-bitcoin-voices-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.7971274552187024,z:10.380291520535945,ix:-1,iz:0,iw:.17355348287427683,ih:.3166722245488616,s:1,smax:1,title:"TJ Natalie Brunell",price:"$200",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-2/",img:"art/older-work-bitcoin-voices-original-2.webp",focal:!1,caption:"7.25 × 11.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-2-4ed30b3321-960.webp",fw:.2040334828742768,fh:.34715222454886163,w:.17355348287427683,h:.3166722245488616,hiLocal:!1},{id:"older-work-bitcoin-voices-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:.9867756714721359,z:10.380291520535945,ix:-1,iz:0,iw:.27957285428766737,ih:.44307134294427175,s:1,smax:1,title:"TJ Peter McCormack",price:"$250",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-3/",img:"art/older-work-bitcoin-voices-original-3.webp",focal:!1,caption:"12 × 16 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-3-744a8ac405-960.webp",fw:.3100528542876674,fh:.47355134294427176,w:.27957285428766737,h:.44307134294427175,hiLocal:!1},{id:"older-work-rochard-martinez-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.4789159825179263,z:9.372111361559623,ix:-1,iz:0,iw:.2767358769751385,ih:.30773429499222726,s:1,smax:1,title:"TJ Aixa Martinez 347",price:"$200",status:"available",url:"https://tjm.art/products/older-work-rochard-martinez-original-3/",img:"art/older-work-rochard-martinez-original-3.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-rochard-martinez-original-3-75ddb98c20-960.webp",fw:.3072158769751385,fh:.33821429499222727,w:.2767358769751385,h:.30773429499222726,hiLocal:!1},{id:"older-work-rochard-martinez-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.741350363729985,z:9.372111361559623,ix:-1,iz:0,iw:.27790748492000644,ih:.3064369425836551,s:1,smax:1,title:"TJ Morgen Rochard 358",price:"$200",status:"available",url:"https://tjm.art/products/older-work-rochard-martinez-original-2/",img:"art/older-work-rochard-martinez-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-rochard-martinez-original-2-716858e3dc-960.webp",fw:.3083874849200064,fh:.33691694258365507,w:.27790748492000644,h:.3064369425836551,hiLocal:!1},{id:"older-work-rochard-martinez-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.008974526704053,z:9.372111361559623,ix:-1,iz:0,iw:.28639571188092844,ih:.2973547314682089,s:1,smax:1,title:"TJ Pierre Rochard 359",price:"$200",status:"available",url:"https://tjm.art/products/older-work-rochard-martinez-original-1/",img:"art/older-work-rochard-martinez-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-rochard-martinez-original-1-65e7fed054-960.webp",fw:.31687571188092845,fh:.3278347314682089,w:.28639571188092844,h:.2973547314682089,hiLocal:!1},{id:"older-work-fernandez-moran-pysh-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.4810232350070556,z:8.38399170861848,ix:-1,iz:0,iw:.28667406878353524,ih:.2970660037769384,s:1,smax:1,title:"TJ Akin Fernandez 351",price:"$200",status:"available",url:"https://tjm.art/products/older-work-fernandez-moran-pysh-original-1/",img:"art/older-work-fernandez-moran-pysh-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-fernandez-moran-pysh-original-1-ec17e71718-960.webp",fw:.31715406878353525,fh:.32754600377693843,w:.28667406878353524,h:.2970660037769384,hiLocal:!1},{id:"older-work-fernandez-moran-pysh-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.7526731369234345,z:8.38399170861848,ix:-1,iz:0,iw:.2851304939286906,ih:.29867419239030346,s:1,smax:1,title:"TJ Nico Moran 345",price:"$200",status:"available",url:"https://tjm.art/products/older-work-fernandez-moran-pysh-original-2/",img:"art/older-work-fernandez-moran-pysh-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-fernandez-moran-pysh-original-2-8619d6a9ca-960.webp",fw:.31561049392869056,fh:.3291541923903034,w:.2851304939286906,h:.29867419239030346,hiLocal:!1},{id:"older-work-fernandez-moran-pysh-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.0227191566857532,z:8.38399170861848,ix:-1,iz:0,iw:.28361158732945396,ih:.30027376808505934,s:1,smax:1,title:"TJ Preston Pysh 344",price:"$200",status:"available",url:"https://tjm.art/products/older-work-fernandez-moran-pysh-original-3/",img:"art/older-work-fernandez-moran-pysh-original-3.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-fernandez-moran-pysh-original-3-7a6e7f5f45-960.webp",fw:.3140915873294539,fh:.3307537680850593,w:.28361158732945396,h:.30027376808505934,hiLocal:!1},{id:"older-work-pitchers-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.0226865672455676,z:7.4449584338328485,ix:-1,iz:0,iw:.15567779434515994,ih:.2237868293711674,s:1,smax:1,title:"TJ Blue Pitcher 187",price:"$75",status:"available",url:"https://tjm.art/products/older-work-pitchers-original-2/",img:"art/older-work-pitchers-original-2.webp",focal:!1,caption:"6 × 9 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-pitchers-original-2-98f7bac8f4-960.webp",fw:.18615779434515994,fh:.2542668293711674,w:.15567779434515994,h:.2237868293711674,hiLocal:!1},{id:"older-work-pitchers-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.4047176361677445,z:7.4449584338328485,ix:-1,iz:0,iw:.23042795170042957,ih:.15119103278447904,s:1,smax:1,title:"TJ Two Pitchers 188",price:"$75",status:"available",url:"https://tjm.art/products/older-work-pitchers-original-1/",img:"art/older-work-pitchers-original-1.webp",focal:!1,caption:"9 × 6 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-pitchers-original-1-7d2d7e4632-960.webp",fw:.2609079517004295,fh:.181671032784479,w:.23042795170042957,h:.15119103278447904,hiLocal:!1},{id:"older-work-yakes-todd-dickerson-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.4764023312668724,z:6.4968896663740345,ix:-1,iz:0,iw:.2299948967746304,ih:.27139397819406386,s:1,smax:1,title:"TJ Desiree Dickerson 332",price:"$200",status:"available",url:"https://tjm.art/products/older-work-yakes-todd-dickerson-original-3/",img:"art/older-work-yakes-todd-dickerson-original-3.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-yakes-todd-dickerson-original-3-ec786ce1dc-960.webp",fw:.26047489677463037,fh:.3018739781940638,w:.2299948967746304,h:.27139397819406386,hiLocal:!1},{id:"older-work-yakes-todd-dickerson-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.7731339856486779,z:6.4968896663740345,ix:-1,iz:0,iw:.22765559982756622,ih:.2741827130423251,s:1,smax:1,title:"TJ Eric Yakes 330",price:"$200",status:"available",url:"https://tjm.art/products/older-work-yakes-todd-dickerson-original-1/",img:"art/older-work-yakes-todd-dickerson-original-1.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-yakes-todd-dickerson-original-1-16c80bb5c4-960.webp",fw:.2581355998275662,fh:.30466271304232506,w:.22765559982756622,h:.2741827130423251,hiLocal:!1},{id:"older-work-yakes-todd-dickerson-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.0559852486412766,z:6.4968896663740345,ix:-1,iz:0,iw:.2086519692920504,ih:.29915476097247723,s:1,smax:1,title:"TJ Peter Todd 331",price:"$200",status:"available",url:"https://tjm.art/products/older-work-yakes-todd-dickerson-original-2/",img:"art/older-work-yakes-todd-dickerson-original-2.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-yakes-todd-dickerson-original-2-39a72edaa0-960.webp",fw:.23913196929205038,fh:.32963476097247724,w:.2086519692920504,h:.29915476097247723,hiLocal:!1},{id:"older-work-nakamoto-hayek-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.123202337153107,z:5.541787493325039,ix:-1,iz:0,iw:.28186984155843087,ih:.3021292364204431,s:1,smax:1,title:"TJ Dorian Nakamoto",price:"$200",status:"available",url:"https://tjm.art/products/older-work-nakamoto-hayek-original-1/",img:"art/older-work-nakamoto-hayek-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-nakamoto-hayek-original-1-27b0ab6335-960.webp",fw:.3123498415584309,fh:.3326092364204431,w:.28186984155843087,h:.3021292364204431,hiLocal:!1},{id:"older-work-nakamoto-hayek-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.385994621437407,z:5.541787493325039,ix:-1,iz:0,iw:.2735430598668479,ih:.31132619501095626,s:1,smax:1,title:"TJ Hayek 339",price:"$200",status:"available",url:"https://tjm.art/products/older-work-nakamoto-hayek-original-2/",img:"art/older-work-nakamoto-hayek-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-nakamoto-hayek-original-2-ac8ceaa163-960.webp",fw:.3040230598668479,fh:.34180619501095627,w:.2735430598668479,h:.31132619501095626,hiLocal:!1},{id:"older-work-hayek-stark-gomez-el-bawab-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:3.038370469048516,z:4.587439212291436,ix:-1,iz:0,iw:.22848711274383873,ih:.2731849041743522,s:1,smax:1,title:"TJ Elizabeth Stark 335",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-2/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-2.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-2-3d6bba0f8e-960.webp",fw:.2589671127438387,fh:.3036649041743522,w:.22848711274383873,h:.2731849041743522,hiLocal:!1},{id:"older-work-hayek-stark-gomez-el-bawab-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.328161202988343,z:4.587439212291436,ix:-1,iz:0,iw:.21804044769284686,ih:.286273627945994,s:1,smax:1,title:"TJ F.A. Hayek 336",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-1/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-1.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-1-775ae9c6ec-960.webp",fw:.24852044769284684,fh:.31675362794599393,w:.21804044769284686,h:.286273627945994,hiLocal:!1},{id:"older-work-hayek-stark-gomez-el-bawab-original-4",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.6142679092473577,z:4.587439212291436,ix:-1,iz:0,iw:.22248644285641755,ih:.2805529595359771,s:1,smax:1,title:"TJ Noor El Bawab 333",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-4/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-4.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-4-b154114211-960.webp",fw:.25296644285641756,fh:.3110329595359771,w:.22248644285641755,h:.2805529595359771,hiLocal:!1},{id:"older-work-hayek-stark-gomez-el-bawab-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:.9043757147396845,z:4.587439212291436,ix:-1,iz:0,iw:.22431059529461245,ih:.2782714294793689,s:1,smax:1,title:"TJ Rodrigo Gomez 334",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-3/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-3.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-3-1aeaa02b7d-960.webp",fw:.25479059529461245,fh:.3087514294793689,w:.22431059529461245,h:.2782714294793689,hiLocal:!1},{id:"older-work-figen-pnut-swoll-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.4922584691169027,z:3.6307737211456548,ix:-1,iz:0,iw:.2865042617827952,ih:.2972420705719289,s:1,smax:1,title:"TJ Figen 341",price:"$200",status:"available",url:"https://tjm.art/products/older-work-figen-pnut-swoll-original-1/",img:"art/older-work-figen-pnut-swoll-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-figen-pnut-swoll-original-1-9280268eaa-960.webp",fw:.3169842617827952,fh:.3277220705719289,w:.2865042617827952,h:.2972420705719289,hiLocal:!1},{id:"older-work-figen-pnut-swoll-original-3",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.7615408163945827,z:3.6307737211456548,ix:-1,iz:0,iw:.2808436220249673,ih:.3032332348727117,s:1,smax:1,title:"TJ Joey Swoll 340",price:"$200",status:"available",url:"https://tjm.art/products/older-work-figen-pnut-swoll-original-3/",img:"art/older-work-figen-pnut-swoll-original-3.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-figen-pnut-swoll-original-3-ff335b6a18-960.webp",fw:.31132362202496733,fh:.3337132348727117,w:.2808436220249673,h:.3032332348727117,hiLocal:!1},{id:"older-work-figen-pnut-swoll-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.023898673835513,z:3.6307737211456548,ix:-1,iz:0,iw:.27374982318782276,ih:.31109105024542794,s:1,smax:1,title:"TJ PNut Window 338",price:"$200",status:"available",url:"https://tjm.art/products/older-work-figen-pnut-swoll-original-2/",img:"art/older-work-figen-pnut-swoll-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-figen-pnut-swoll-original-2-50020e7d03-960.webp",fw:.30422982318782277,fh:.34157105024542794,w:.27374982318782276,h:.31109105024542794,hiLocal:!1},{id:"older-work-hummingbird-feeder-190",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.75,z:2.705725007561206,ix:-1,iz:0,iw:.16525355762116473,ih:.23229164051039838,s:1,smax:1,title:"TJ Hummingbird Feeder 190",price:"$75",status:"available",url:"https://tjm.art/products/older-work-hummingbird-feeder-190/",img:"art/older-work-hummingbird-feeder-190.webp",focal:!1,caption:"7 × 8.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hummingbird-feeder-190-cef1c7ac71-960.webp",fw:.19573355762116473,fh:.26277164051039836,w:.16525355762116473,h:.23229164051039838,hiLocal:!1},{id:"older-work-ammous-livera-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.1188350240703477,z:1.7814481646457736,ix:-1,iz:0,iw:.28496052044477554,ih:.2988523458164583,s:1,smax:1,title:"TJ Saifedean Ammous 355",price:"$200",status:"available",url:"https://tjm.art/products/older-work-ammous-livera-original-1/",img:"art/older-work-ammous-livera-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ammous-livera-original-1-03bc0c54d8-960.webp",fw:.3154405204447755,fh:.32933234581645826,w:.28496052044477554,h:.2988523458164583,hiLocal:!1},{id:"older-work-ammous-livera-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.3867234441458105,z:1.7814481646457736,ix:-1,iz:0,iw:.2797572099093543,ih:.3044108140326161,s:1,smax:1,title:"TJ Stephan Livera 356",price:"$200",status:"available",url:"https://tjm.art/products/older-work-ammous-livera-original-2/",img:"art/older-work-ammous-livera-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ammous-livera-original-2-13fb12c87c-960.webp",fw:.3102372099093543,fh:.33489081403261606,w:.2797572099093543,h:.3044108140326161,hiLocal:!1},{id:"older-work-legend-of-billy-buff-original-2",kind:"painting",room:"archive",wall:"E",x:23.19,y:2.1428355152054177,z:.81265057768793,ix:-1,iz:0,iw:.25272179475350126,ih:.3618660198626696,s:1,smax:1,title:"TJ The Legend of Billy Buff 1",price:"$200",status:"available",url:"https://tjm.art/products/older-work-legend-of-billy-buff-original-2/",img:"art/older-work-legend-of-billy-buff-original-2.webp",focal:!1,caption:"10.5 × 13.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-legend-of-billy-buff-original-2-2375e533a9-960.webp",fw:.2832017947535012,fh:.39234601986266954,w:.25272179475350126,h:.3618660198626696,hiLocal:!1},{id:"older-work-legend-of-billy-buff-original-1",kind:"painting",room:"archive",wall:"E",x:23.19,y:1.3527144918266931,z:.81265057768793,ix:-1,iz:0,iw:.25586829665845534,ih:.35741602689477986,s:1,smax:1,title:"TJ The Legend of Billy Buff 2",price:"$200",status:"available",url:"https://tjm.art/products/older-work-legend-of-billy-buff-original-1/",img:"art/older-work-legend-of-billy-buff-original-1.webp",focal:!1,caption:"10.5 × 13.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-legend-of-billy-buff-original-1-133621edc7-960.webp",fw:.28634829665845535,fh:.38789602689477987,w:.25586829665845534,h:.35741602689477986,hiLocal:!1}],Fm=[{id:"cormorant-presiding-over-sunset-on-puget-sound-plaque",kind:"plaque",room:"central",wall:"N",x:-11.716480655705881,y:1.5999999999999999,z:11.965,ix:0,iz:-1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Cormorant Presiding over Sunset on Puget Sound",lines:["Garden mural, Seattle · 60 × 40 in (W × H)","A favorite view. Brian and Marcos sent me reference photographs of sunset over Puget Sound, with the Olympic Mountains behind it. This is one of their favorite views—a scene that captures the essence of Seattle for them. They wanted to bring it into their garden as a mural painted on a board and hung from their fence.","The watercolor prototype. Before starting the acrylic mural, I painted a watercolor prototype to explore the composition. A cormorant spreads its wings on a pier pile in the foreground, as if presiding over the sunset. Two distant sailboats meet the waterline, beneath the layered mountains of the Olympics.","The garden becomes part of the painting. The plants in the garden are part of the composition. As the grasses beneath the board fill in, they will suggest dunes leading into the painted shore."],url:"https://tjm.art/products/cormorant-presiding-over-sunset-on-puget-sound/"},{id:"friends-club-mural-plaque",kind:"plaque",room:"travels",wall:"N",x:5.883342072663581,y:1.5999999999999999,z:23.465,ix:0,iz:-1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Friends Club",lines:["Lillooet, British Columbia · 2026","40 × 9 ft shipping-container mural","An invitation, and a little trust. An exercise in trusting in the process and serendipity.","The design concept. I set up an ideation board, and Kara, Paul, and I brainstormed. I took their Higher Education branding kit and extracted a color palette and a set of themes. We discussed the principles of their organization, seeking to incorporate some of the messaging symbolically into the design, and we iterated.","Day one · Preparing the sea-can. On the May long weekend, I ventured to Lillooet with an intrepid crew of builders: stopping at the Ark in Vancouver to load cylinders and triangles, stopping in Whistler to jam and sleep, and wending over the passes and between charging stations toward the remote mountain valley."],url:"https://tjm.art/murals/#friends-story"},{id:"cape-town-plaque",kind:"plaque",room:"travels",wall:"S",x:8.874255531606213,y:1.5999999999999999,z:15.535,ix:0,iz:1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Adopting Bitcoin Cape Town, South Africa",lines:["Exhibition · 2025","Adopting Bitcoin 2025 · V&A Waterfront"],url:"https://tjm.art/exhibitions/cape-town/"},{id:"el-salvador-plaque",kind:"plaque",room:"travels",wall:"W",x:-12.59,y:1.5999999999999999,z:16.9,ix:1,iz:0,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Adopting Bitcoin El Salvador",lines:["Exhibition · 2024","Adopting Bitcoin conference venue · Near San Salvador"],url:"https://tjm.art/exhibitions/el-salvador/"},{id:"bitcoin-film-festival-warsaw-plaque",kind:"plaque",room:"travels",wall:"W",x:-12.59,y:1.5999999999999999,z:22.1,ix:1,iz:0,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Bitcoin Film Festival Warsaw, Poland",lines:["Exhibition · 2026","Art & cinema · Warsaw, Poland","2026 · Kinoteka · Palace of Culture and Science","I made these paintings specifically for the Bitcoin Film Festival: the Warsaw Syrenka and the Bitcoin honey badger with cub, along with the movie poster for Coined in Watercolor, Gavin Robertson’s documentary."],url:"https://tjm.art/exhibitions/bitcoin-film-festival-warsaw/"},{id:"paul-murphy-plaque",kind:"plaque",room:"people",wall:"E",x:-15.260000000000002,y:1.5999999999999999,z:9.267689818186556,ix:-1,iz:0,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Paul Murphy",lines:["Exhibition","Paul Murphy is my dad. We’ve been painting together since COVID, when he picked up a brush shortly after I did and began painting for the first time in his life. As he leaves the corporate world, he’s discovered a new passion for artistic expression.","At least once a week, we talk about painting techniques and share images to paint. During COVID, he painted every day for a long stretch, sending me each painting with a poem he had written to accompany it. Those paintings and poems became his book COVID 2020.","He has published several books of poetry and found readers for his work. COVID 2020 and Reflections on Time are available on Amazon. You can also explore Reflections on Time here."],url:"https://tjm.art/exhibitions/paul-murphy/"},{id:"living-room-plaque",kind:"plaque",room:"people",wall:"E",x:-15.260000000000002,y:1.5999999999999999,z:8.078844909093277,ix:-1,iz:0,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"My Living Room, Seattle, Washington",lines:["Exhibition · Current"],url:"https://tjm.art/exhibitions/living-room/"},{id:"studio-601-plaque",kind:"plaque",room:"people",wall:"E",x:-15.260000000000002,y:1.5999999999999999,z:17.32,ix:-1,iz:0,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Studio 601, Seattle, Washington",lines:["Exhibition · 2023","Pioneer Square · Seattle waterfront"],url:"https://tjm.art/exhibitions/studio-601/"},{id:"victrola-plaque",kind:"plaque",room:"people",wall:"E",x:-15.260000000000002,y:1.5999999999999999,z:16.03,ix:-1,iz:0,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Victrola Coffee Shop, Seattle, Washington",lines:["Exhibition · 2026","15th Avenue East · Capitol Hill"],url:"https://tjm.art/exhibitions/victrola/"}],wi={layout:zm,paintings:Nm,plaques:Fm},ua=(n,t,e)=>new L(n,t,e),Lc=n=>Math.min(1,Math.max(0,n)),en=n=>(n=Lc(n),n*n*(3-2*n)),ke={erupt:3.5,engulf:5.2,world:5.2+18,white:5.2+18+1.6},Gl=["THEY ARE SO HAPPY TO SEE YOU","YOU HAVE BEEN HERE BEFORE","LOOK AT WHAT THEY ARE SHOWING YOU","IT IS ALL LANGUAGE","THE PAINTINGS ARE WINDOWS","DO NOT TRY TO REMEMBER THIS"],Om=(n="")=>new Qe({uniforms:{uTime:{value:0}},side:Ae,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform float uTime; varying vec2 vUv;
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
      gl_FragColor = vec4(floor(c*8.)/8., 1.); }`});function Bm({scene:n,camera:t,renderer:e,makeElf:i,animateElf:a,elfUniforms:r,say:s,canvas:o,floorY:l}){const c=document.createElement("div");Object.assign(c.style,{position:"fixed",inset:"0",pointerEvents:"none",opacity:"0",background:"#fff",zIndex:5}),document.body.appendChild(c);let h=null;const d=(()=>{const N=document.createElement("canvas");N.width=N.height=128;const j=N.getContext("2d");j.strokeStyle="#ffb030",j.lineCap="round";for(let H=0;H<14;H++){let K=64,Q=64,at=H/14*6.283;j.lineWidth=5,j.beginPath(),j.moveTo(K,Q);for(let St=0;St<6;St++)at+=(Math.random()-.5)*.9,K+=Math.cos(at)*11,Q+=Math.sin(at)*11,j.lineTo(K,Q),j.lineWidth=Math.max(1,5-St);j.stroke()}const F=j.createRadialGradient(64,64,2,64,64,30);F.addColorStop(0,"rgba(255,240,160,1)"),F.addColorStop(1,"rgba(255,90,0,0)"),j.fillStyle=F,j.fillRect(0,0,128,128);const W=new Ac(N);return W.magFilter=Pe,W})(),u=new ji(.25,.18,.22),m=new Bi({color:7034424}),g=new mr;g.fog=new co(0,.02);const w=new xe(85,t.aspect,.05,400),p=Om(),f=new kt(new un(9,9,300,24,1,!0).rotateX(Math.PI/2),p);g.add(f);const S=new Qe({uniforms:{uTime:{value:0}},vertexShader:"uniform float uTime; varying vec2 vP; void main(){ vec3 p = position; vP = p.xy; p.z += sin(length(p.xy)*0.6 - uTime*2.)*0.5; gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.); }",fragmentShader:`uniform float uTime; varying vec2 vP;
      vec3 hsv(float h,float s,float v){ vec3 k=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.); return v*mix(vec3(1.),k,s); }
      void main(){ vec2 g = vP*0.6; vec2 r = vec2(g.x + g.y*0.577, g.y*1.155); vec2 f = fract(r); float tri = step(f.x, f.y);
        float b = 1. - smoothstep(0.0, 0.08, min(min(f.x, f.y), abs(f.x - f.y)));
        float br = 0.5 + 0.5*sin(length(vP)*0.6 - uTime*2.);
        vec3 c = hsv(fract(tri*0.5 + length(floor(r))*0.05 + uTime*0.15), .8, 0.25 + 0.5*br) + b*vec3(1.,.8,.4);
        gl_FragColor = vec4(c, 1.); }`}),y=new kt(new Re(60,300,60,150).rotateX(-Math.PI/2),S);y.position.y=-6,g.add(y);const b=new Ke;g.add(b);const k=[new Ni(6,0),new uo(4.2,0),new wr(2.8,0),new mo(1.6,0)].map((N,j)=>{const F=new kt(N,new pe({color:16777215,wireframe:j%2===0,transparent:!0,opacity:j%2?.55:1}));return b.add(F),F}),A=[];for(let N=0;N<16;N++){const j=i(N/16);j.scale.setScalar(3+N%3),g.add(j),A.push({e:j,a:N/16*6.283,r:4+N%4*1.4,y:N%5-2,sp:.4+N%3*.25})}const T=new mr,C=new oo(-1,1,1,-1,0,1);T.add(new kt(new Re(2,2),new pe({color:0,transparent:!0,opacity:.18,depthTest:!1,depthWrite:!1})));let M={x:0,y:0};addEventListener("mousemove",N=>{!h||h.t<ke.engulf||(M.x=Math.max(-.6,Math.min(.6,M.x-N.movementX*.002)),M.y=Math.max(-.4,Math.min(.4,M.y-N.movementY*.002)))});function v(){const N=i(.77);N.scale.setScalar(11);const j=ua(0,0,-1).applyQuaternion(t.quaternion).setY(0).normalize(),F=t.position.clone().addScaledVector(j,3.2);N.position.set(F.x,-5,F.z),n.add(N);const W=new kt(new Re(1,1).rotateX(-Math.PI/2),new pe({map:d,transparent:!0,blending:fr,depthWrite:!1}));W.position.set(t.position.x,l(t.position.x,t.position.z)+.02,t.position.z);const H=new Cc(16740384,0,12);H.position.copy(W.position).y+=.5,n.add(H);const K=[];for(let Q=0;Q<26;Q++){const at=new kt(u,m);at.position.copy(W.position),n.add(at),K.push({m:at,v:ua((Math.random()-.5)*6,4+Math.random()*6,(Math.random()-.5)*6),w:ua(Math.random()*9,Math.random()*9,0),t0:Math.random()*1.5})}h={t:0,savedPos:t.position.clone(),savedQuat:t.quaternion.clone(),giant:N,crack:W,fissureLight:H,chunks:K,base:F,frag:-1,done:!1},s("THE FLOOR IS... OPENING",3)}function R(){n.remove(h.giant,h.crack,h.fissureLight,...h.chunks.map(N=>N.m))}function V(N,j){if(!h)return!1;h.t+=N;const F=h.t;if(p.uniforms.uTime.value=S.uniforms.uTime.value=j/1e3,F<ke.engulf){const W=en(F/2.2),H=(F<ke.erupt?.12:.05)*(1-Lc((F-3)/2));h.crack.scale.setScalar(.5+W*5),h.fissureLight.intensity=30*W,h.chunks.forEach(Ut=>{const q=F-Ut.t0;q<0||(Ut.m.position.set(h.crack.position.x+Ut.v.x*q*.4,h.crack.position.y+Ut.v.y*q-4.9*q*q,h.crack.position.z+Ut.v.z*q*.4),Ut.m.rotation.set(Ut.w.x*q,Ut.w.y*q,0),Ut.m.position.y<0&&(Ut.m.position.y=0))});const K=en((F-.6)/2.6);h.giant.position.y=-5+K*(h.savedPos.y+2+5),a(h.giant,"idle",F,t,N);const Q=h.giant.localToWorld(ua(0,-.19,.2)),at=en((F-ke.erupt)/(ke.engulf-ke.erupt));t.position.copy(h.savedPos).lerp(Q,at*.97).add(ua((Math.random()-.5)*H,(Math.random()-.5)*H,(Math.random()-.5)*H));const St=t.clone();St.lookAt(Q),t.quaternion.copy(h.savedQuat).slerp(St.quaternion,en((F-1.5)/2)),c.style.background="#000",c.style.opacity=String(en((F-ke.engulf+.6)/.6)),F>1.5&&F<1.6&&s("SOMETHING ENORMOUS IS VERY HAPPY TO SEE YOU",3),o.style.filter=`saturate(${1+W}) contrast(${1+W*.3})`}else if(F<ke.world){h.inWorld||(h.inWorld=!0,R(),M={x:0,y:0});const W=F-ke.engulf;c.style.background=W<1?"#000":"#fff",c.style.opacity=String(W<1?1-W:en((W-16.4)/1.6)),w.position.set(Math.sin(W*.4)*1.5,Math.cos(W*.3)*1,-W*2.2),w.rotation.set(M.y+Math.sin(W*.5)*.1,M.x,Math.sin(W*.23)*.6,"YXZ"),f.position.z=w.position.z,y.position.z=w.position.z,b.position.set(0,0,w.position.z-22),k.forEach((Q,at)=>{Q.rotation.set(W*(.3+at*.2)*(at%2?-1:1),W*(.5+at*.1),0),Q.material.color.setHSL((W*.1+at*.25)%1,1,.6),Q.scale.setScalar(1+.15*Math.sin(W*2+at))}),A.forEach((Q,at)=>{const St=Q.a+W*Q.sp;Q.e.position.set(Math.cos(St)*Q.r,Q.y+Math.abs(Math.sin(W*3+at))*1.2,w.position.z-8+Math.sin(St)*Q.r),a(Q.e,"idle",W+at,w,N)});const H=Math.floor(W/3);H!==h.frag&&H<6&&(h.frag=H,s(Gl[H%Gl.length],2.8));const K=j/1e3;o.style.filter=`saturate(${2.2+Math.sin(K*2)}) hue-rotate(${K*60%360}deg) drop-shadow(${4+3*Math.sin(K*3)}px 0 rgba(255,0,80,.6)) drop-shadow(${-4-3*Math.sin(K*3)}px 0 rgba(0,255,240,.6))`,o.style.transform=`scale(${1.04+.03*Math.sin(K*1.7)}) skew(${3*Math.sin(K*.9)}deg, ${2*Math.sin(K*1.3)}deg) rotate(${2*Math.sin(K*.7)}deg)`,r.uPulse.value=1}else if(F<ke.white){if(!h.back){h.back=!0,t.position.copy(h.savedPos),t.quaternion.copy(h.savedQuat);const W=new Ce().setFromQuaternion(t.quaternion,"YXZ");W.x=0,W.z=0,t.quaternion.setFromEuler(W),o.style.filter="",o.style.transform="",s("WELCOME BACK.",4)}c.style.background="#fff",c.style.opacity=String(1-en((F-ke.world)/(ke.white-ke.world)))}else{c.style.opacity="0",h.done=!0;const W=h;return h=null,{finished:!0,savedPos:W.savedPos}}return!0}function B(){return h&&h.inWorld&&!h.back?(e.render(T,C),e.clearDepth(),e.render(g,w),!0):!1}return{start:v,update:V,render:B,get state(){return h}}}const Ma={uTime:{value:0},uPulse:{value:0}};function Un(n,t=1){n=n.index?n.toNonIndexed():n,n.computeVertexNormals();const e=n.attributes.position.array,i=e.length/9,a=new Float32Array(e.length),r=new Float32Array(e.length/3),s=new Float32Array(e.length/3);for(let o=0;o<i;o++){const l=(e[o*9]+e[o*9+3]+e[o*9+6])/3,c=(e[o*9+1]+e[o*9+4]+e[o*9+7])/3,h=(e[o*9+2]+e[o*9+5]+e[o*9+8])/3,d=Math.abs(Math.sin(o*12.9898+l*78.233)*43758.5453)%1;for(let u=0;u<3;u++)a.set([l,c,h],o*9+u*3),r[o*3+u]=d,s[o*3+u]=t}return n.setAttribute("aCenter",new Ne(a,3)),n.setAttribute("aRand",new Ne(r,1)),n.setAttribute("aOpen",new Ne(s,1)),n}function Vl(n){const t=new ti,e=["position","normal","aCenter","aRand","aOpen"],i={};return e.forEach(a=>i[a]=[]),n.forEach(a=>e.forEach(r=>i[r].push(...a.attributes[r].array))),e.forEach(a=>t.setAttribute(a,new me(i[a],n[0].attributes[a].itemSize))),t}const as=new Qe({uniforms:Ma,vertexShader:`attribute vec3 aCenter; attribute float aRand; attribute float aOpen; uniform float uTime;
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
    }`}),Pc=new pe({color:16777215}),Dc=new pe({color:16777215,wireframe:!1}),pa={shell:Un(new Ni(.17,1)),core:new wr(.1,0),cap:(()=>{const n=[];return[-.6,0,.6].forEach(t=>{const e=new fo(.05,.22,4).translate(0,.11,0).rotateZ(t).translate(Math.sin(-t)*.05,.13,0);n.push(Un(e,.3));const i=new Ni(.025,0).translate(Math.sin(-t)*.25,.13+Math.cos(t)*.22,0);n.push(Un(i,.3))}),n.push(Un(new un(.12,.14,.05,8).translate(0,.13,0),.2)),Vl(n)})(),arm:Vl([Un(new un(.025,.02,.12,5).translate(0,-.06,0),0),Un(new Ni(.035,0).translate(0,-.13,0),.5)]),orb:new Ni(.06,0)};function Mr(n=Math.random()){const t=new Ke,e=new Ke;t.add(e);const i=new kt(pa.shell,as);e.add(i);const a=new kt(pa.core,Pc);e.add(a);const r=new kt(pa.cap,as);e.add(r);const s=h=>{const d=new kt(pa.arm,as);return d.position.set(h,0,.04),e.add(d),d},o=s(-.17),l=s(.17),c=new kt(pa.orb,Dc);return c.position.set(0,.42,.1),e.add(c),t.userData.rig={body:e,shell:i,core:a,cap:r,armL:o,armR:l,orb:c,seed:n,glitch:0},t}const Hm=(n,t)=>Math.floor(n*t)/t;function yr(n,t,e,i,a){const r=n.userData.rig,s=r.seed*10,o=Hm(e+s,8);let l=0,c=1,h=.3,d=.3,u=0,m=0;if(t==="walk"||t==="retreat"){const p=Math.abs(Math.sin((e+s)*9));l=p*.16,c=p<.15?.75:1+p*.08,u=(e+s)*(t==="retreat"?-9:9),h=-1+Math.sin(e*18)*.6,d=-1-Math.sin(e*18)*.6}else if(t==="scrub")d=-1.6+Math.sin((e+s)*22)*.7,h=-1.6-Math.sin((e+s)*22)*.7,l=Math.abs(Math.sin((e+s)*11))*.04,u=Math.sin(e*5)*.3;else if(t==="carry"){h=d=-2.9+Math.sin((e+s)*8)*.2;const p=Math.abs(Math.sin((e+s)*12));l=p*.05,c=1-p*.1}else t==="peek"?(h=-2.6,d=-.4,m=1,u=Math.sin(o*4)*.2):(l=Math.abs(Math.sin((e+s)*6))*.08,h=-2.4+Math.sin(o*3)*.4,m=1);r.body.position.y=-.12+l,r.body.scale.set(1/Math.sqrt(c),c,1/Math.sqrt(c)),r.armL.rotation.set(h,0,.5),r.armR.rotation.set(d,0,-.5),r.shell.rotation.set(u*.25,Math.sin(o*1.1+s)*.4,Math.sin(o*.7)*.3),r.core.rotation.set(e*2.3,e*3.1,0),r.core.scale.setScalar(.8+.3*Math.sin(e*4+s)),r.cap.rotation.z=Math.sin(o*1.3+s)*.4,r.cap.position.y=.06+Math.abs(Math.sin(e*9+s))*.03,r.orb.visible=m>0,r.orb.rotation.set(e*3,e*2,0),r.orb.scale.set(1+.4*Math.sin(e*5),1+.4*Math.sin(e*5+2),1+.4*Math.sin(e*5+4));const g=n.getWorldPosition(new L);n.lookAt(i.position.x,g.y,i.position.z),r.glitch>0?r.glitch-=a:Math.random()<a*.6&&(r.glitch=.12);const w=r.glitch>0;r.body.position.x=w?(Math.random()-.5)*.06:0,w&&(r.body.scale.x*=1.5)}function Wl(n){const t=n/2e3%1;Dc.color.setHSL(t,1,.65),Pc.color.setHSL((t+.5)%1,1,.7)}const Xi=(n,t)=>{const e=document.createElement("canvas");return e.width=n,e.height=t,[e,e.getContext("2d")]};let jl=7;const we=()=>(jl=jl*16807%2147483647)/2147483647;function qi(n,t=1,e=1){const i=new Ac(n);return i.magFilter=i.minFilter=Pe,i.generateMipmaps=!1,i.wrapS=i.wrapT=ur,i.repeat.set(t,e),i.colorSpace=Ee,i}function Gm(){const[n,t]=Xi(32,32);t.fillStyle="#ff7a00",t.beginPath(),t.arc(16,16,8,0,7),t.fill();for(let i=0;i<9;i++){const a=we()*6.28,r=8+we()*7;t.fillRect(16+Math.cos(a)*r-2|0,16+Math.sin(a)*r-2|0,3+we()*3|0,3+we()*3|0)}t.fillStyle="#ffb040",t.fillRect(12,12,3,3);const e=qi(n);return e.wrapS=e.wrapT=ni,e}function Ic(n,t){const[e,i]=Xi(256,40);i.fillStyle="#2a2014",i.fillRect(0,0,256,40),i.strokeStyle="#c9a24a",i.lineWidth=3,i.strokeRect(2,2,252,36),i.fillStyle="#f0d070",i.font="bold 15px monospace",i.textAlign="center",i.textBaseline="middle",i.fillText(n.length>30?n.slice(0,29)+"…":n,128,21);const a=qi(e);return a.wrapS=a.wrapT=ni,a}function Vm(){const[n,t]=Xi(64,64),e=t.createRadialGradient(32,26,2,32,30,32);e.addColorStop(0,"rgba(255,200,130,.55)"),e.addColorStop(.6,"rgba(255,170,90,.2)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const i=qi(n);return i.wrapS=i.wrapT=ni,i}const ma=[[20,16,12],[39,30,22],[55,43,31],[71,55,39],[87,67,47],[107,83,59],[127,99,71],[59,51,35],[79,71,47],[99,91,63],[47,47,51],[67,67,71],[91,91,95],[119,115,111],[123,63,31],[159,83,35],[191,111,47],[227,155,63]];function Sr(n){const t=n.getContext("2d"),e=t.getImageData(0,0,n.width,n.height);for(let i=0;i<e.data.length;i+=4){let a=0,r=1e9;for(let s=0;s<ma.length;s++){const o=ma[s],l=(o[0]-e.data[i])**2+(o[1]-e.data[i+1])**2+(o[2]-e.data[i+2])**2;l<r&&(r=l,a=s)}e.data[i]=ma[a][0],e.data[i+1]=ma[a][1],e.data[i+2]=ma[a][2]}return t.putImageData(e,0,0),n}function Er(n,t,e,i=900,a=.35){for(let r=0;r<i;r++){const s=we()<.5?0:255;n.fillStyle=`rgba(${s},${s},${s},${we()*a})`,n.fillRect(we()*t|0,we()*e|0,1+(we()*2|0),1)}}function Wm(n,t){const[e,i]=Xi(64,64);i.fillStyle="#1e1810",i.fillRect(0,0,64,64);for(let a=0;a<4;a++)for(let r=-1;r<3;r++){const s=a%2?16:0,o=85+we()*45|0;i.fillStyle=`rgb(${o},${o*.8|0},${o*.6|0})`,i.fillRect(r*32+s+1,a*16+1,30,14),i.fillStyle="rgba(255,230,190,.18)",i.fillRect(r*32+s+1,a*16+1,30,2),i.fillStyle="rgba(0,0,0,.35)",i.fillRect(r*32+s+1,a*16+13,30,2)}return Er(i,64,64),qi(Sr(e),n,t)}function jm(n,t){const[e,i]=Xi(64,64);i.fillStyle="#4a4a4e",i.fillRect(0,0,64,64);for(let a=0;a<2;a++)for(let r=0;r<2;r++){i.fillStyle=(a+r)%2?"#56565a":"#46464a",i.fillRect(a*32+1,r*32+1,30,30),i.fillStyle="#77736f",i.fillRect(a*32+1,r*32+1,30,1),i.fillStyle="#202024",i.fillRect(a*32+1,r*32+30,30,1);for(const[s,o]of[[4,4],[27,4],[4,27],[27,27]])i.fillStyle="#88847f",i.fillRect(a*32+s,r*32+o,2,2),i.fillStyle="#18181a",i.fillRect(a*32+s+1,r*32+o+1,2,1)}i.fillStyle="rgba(123,63,31,.5)";for(let a=0;a<40;a++)i.fillRect(we()*64|0,we()*64|0,2,3+we()*6|0);return Er(i,64,64,700,.3),qi(Sr(e),n,t)}function Uc(n,t){const[e,i]=Xi(32,64);for(let a=0;a<64;a++){const r=60+Math.sin(a*.7+we())*12+we()*10|0;i.fillStyle=`rgb(${r},${r*.72|0},${r*.48|0})`,i.fillRect(0,a,32,1)}return i.fillStyle="#1e1810",i.fillRect(15,0,1,64),Er(i,32,64,300),qi(Sr(e),n,t)}function Xm(n,t){const[e,i]=Xi(64,64);i.fillStyle="#16120c",i.fillRect(0,0,64,64);for(let a=0;a<2;a++)for(let r=0;r<2;r++){const s=55+we()*30|0;i.fillStyle=`rgb(${s},${s*.9|0},${s*.65|0})`,i.fillRect(a*32+1,r*32+1,30,30)}return Er(i,64,64,1200,.4),qi(Sr(e),n,t)}function qm(){const[n,t]=Xi(32,8);for(let e=0;e<32;e++)for(let i=0;i<8;i++){const a=Math.sin(e*.6+i*.9)+Math.sin(e*.23-i*1.3);t.fillStyle=a>.8?"#ffd040":a>0?"#ff7a10":a>-.8?"#c03a08":"#601804",t.fillRect(e,i,1,1)}return qi(n,8,1)}const js="/play/",vo=640,xo=400,pn=document.getElementById("c"),$e=new _m({canvas:pn,antialias:!1,preserveDrawingBuffer:!0});$e.setPixelRatio(1);$e.setSize(vo,xo,!1);const ie=new mr;ie.background=new Ft(789e3);ie.fog=new ho(920328,10,28);const dt=new xe(70,vo/xo,.05,100);dt.position.set(wi.layout.start.x,1.6,wi.layout.start.z);dt.lookAt(wi.layout.start.x+Math.sin(wi.layout.start.yaw)*5,1.6,wi.layout.start.z+Math.cos(wi.layout.start.yaw)*5);ie.add(dt);const Hi=1.6,bi=(n,t)=>{const e=Math.abs(n-Wi.x),i=Math.abs(t-Wi.z);return e<1.8&&i<1.8?.5:e<2.4&&i<2.4?.25:0};ie.add(new Rc(11571312,2103312,.55));const Pa=wi.layout,Ve=Pa.hall.height,Nn=Pa.hall.doorHeight,ki=.3,be={stone:(n,t)=>new Bi({map:Wm(Math.max(1,n),Math.max(1,t))}),metal:(n,t)=>new Bi({map:jm(Math.max(1,n),Math.max(1,t))}),wood:(n,t)=>new Bi({map:Uc(Math.max(1,n),Math.max(1,t))})};function le(n,t,e,i,a,r,s,o=ie){const l=new kt(new ji(n,t,e),i);return l.position.set(a,r,s),o.add(l),l}const kc=qm(),Ym=new pe({map:kc}),wo=[],zc=[],bo=[],Vi=Pa.rooms,Mo=Pa.hallways;function Nc(n,t){zc.push([n,t]),le(.7,Ve,.7,be.stone(.7,Ve/2),n,Ve/2,t),le(.9,.3,.9,be.metal(1,.3),n,.15,t),le(.9,.3,.9,be.metal(1,.3),n,Ve-.15,t)}function $m(n,t){const e=t==="N"||t==="S",i=t==="N"?n.maxZ:t==="S"?n.minZ:t==="W"?n.minX:n.maxX,a=e?n.minX:n.minZ,r=e?n.maxX:n.maxZ,s=t==="N"?[0,-1]:t==="S"?[0,1]:t==="W"?[1,0]:[-1,0],o=n.openings.filter(d=>d.wall===t).sort((d,u)=>d.from-u.from),l=[];let c=a;o.forEach(d=>{l.push([c,d.from,0,Ve]),l.push([d.from,d.to,Nn,Ve]),c=d.to}),l.push([c,r,0,Ve]);const h=ki/2;l.forEach(([d,u,m,g])=>{const w=u-d;if(w<.01)return;const p=(d+u)/2,f=g-m,S=m>0?be.metal(w/2,f/2):be.stone(w/2,f/2);if(e?le(w,f,ki,S,p,m+f/2,i-s[1]*h):le(ki,f,w,S,i-s[0]*h,m+f/2,p),m===0){const y=new kt(new Re(w,.2),Ym);y.rotation.x=-Math.PI/2,e?y.position.set(p,.015,i+s[1]*.12):(y.rotation.z=Math.PI/2,y.position.set(i+s[0]*.12,.015,p)),ie.add(y)}}),o.forEach(d=>{for(const u of[d.from-.35,d.to+.35]){const[m,g]=e?[u,i+s[1]*.35]:[i+s[0]*.35,u];Nc(m,g),bo.push([m+s[0]*.45,2.9,g+s[1]*.45])}})}Vi.forEach(n=>{const t=n.maxX-n.minX,e=n.maxZ-n.minZ,i=(n.minX+n.maxX)/2,a=(n.minZ+n.maxZ)/2,r=new kt(new Re(t,e),new Bi({map:Xm(t/2,e/2)}));r.rotation.x=-Math.PI/2,r.position.set(i,0,a),ie.add(r);const s=new kt(new Re(t,e),be.metal(t/2,e/2));s.rotation.x=Math.PI/2,s.position.set(i,Ve,a),ie.add(s),wo.push(s),["N","S","W","E"].forEach(c=>$m(n,c));for(const[c,h]of[[n.minX+.35,n.minZ+.35],[n.maxX-.35,n.minZ+.35],[n.minX+.35,n.maxZ-.35],[n.maxX-.35,n.maxZ-.35]])Nc(c,h);const o=be.wood(Math.max(t,e)/2,1),l=t>e;for(let c=3;c<(l?t:e)-1;c+=4)l?le(.4,.45,e,o,n.minX+c,Ve-.3,a):le(t,.45,.4,o,i,Ve-.3,n.minZ+c);bo.push([i,Ve-.9,a])});Mo.forEach(n=>{const t=n.maxX-n.minX,e=n.maxZ-n.minZ,i=(n.minX+n.maxX)/2,a=(n.minZ+n.maxZ)/2,r=new kt(new Re(t,e),be.metal(t,e));r.rotation.x=-Math.PI/2,r.position.set(i,.005,a),ie.add(r);const s=le(t,.2,e+2*ki,be.metal(t,e),i,Nn+.1,a);wo.push(s),le(t,Nn,ki,be.stone(t/2,1.4),i,Nn/2,n.minZ-ki/2),le(t,Nn,ki,be.stone(t/2,1.4),i,Nn/2,n.maxZ+ki/2)});Pa.signs.forEach(n=>{const t=new kt(new Re(2.2,.3),new pe({map:Ic(n.title)}));t.position.set(n.x,n.y,n.z),t.rotation.y=n.yaw,ie.add(t)});const Wi={x:0,z:(Vi[0].minZ+Vi[0].maxZ)/2};le(4.8,.25,4.8,be.stone(2.4,.2),Wi.x,.125,Wi.z);le(3.6,.25,3.6,be.metal(1.8,.2),Wi.x,.375,Wi.z);const Xl=bo.map(([n,t,e])=>{const i=new kt(new ji(.16,.22,.16),new pe({color:16752704}));return i.position.set(n,t,e),ie.add(i),le(.1,.35,.1,be.wood(1,1),n,t-.28,e),{flame:i,ph:Math.random()*10,pos:new L(n,t,e)}}),Xs=Array.from({length:4},()=>{const n=new Cc(16747056,6,9,1.4);return ie.add(n),n}),er=.45;function lr(n,t){for(const e of Vi)if(n>e.minX+er&&n<e.maxX-er&&t>e.minZ+er&&t<e.maxZ-er)return!0;for(const e of Mo)if(n>=e.minX-.5&&n<=e.maxX+.5&&t>e.minZ+.3&&t<e.maxZ-.3)return!0;return!1}function yo(n,t){let e=null,i=1e9;return Vi.forEach(a=>{const r=Math.max(a.minX-n,0,n-a.maxX),s=Math.max(a.minZ-t,0,t-a.maxZ),o=r+s;o<i&&(i=o,e=a)}),e}const Fc=new bm,Zm=Vm(),Jm=new Bi({map:Uc(1,1)}),Km=new pe({color:13214282}),Qm=new pe({map:Zm,transparent:!0,blending:fr,depthWrite:!1}),On=new Re(1,1),si=[],cn=n=>String(n).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),t1=document.getElementById("labels"),gr=[];function Oc(n,t,e,i,a,r){const s=document.createElement("div");s.className="lbl3d "+a,s.innerHTML=n,s.style.display="none",t1.appendChild(s),gr.push({el:s,pos:t,n:new L(e.ix,0,e.iz),room:e.room,w:i,p:r,cls:a,shown:!1})}const So=[];(wi.plaques||[]).forEach(n=>{const t=new Ke;t.position.set(n.x,n.y,n.z),t.rotation.y=Math.atan2(n.ix,n.iz),ie.add(t);const e=new kt(On,new Bi({color:2760728}));e.scale.set(n.fw+.06,n.fh+.06,1),e.position.z=.01,t.add(e);const i=new kt(On,new pe({color:1380363}));i.scale.set(n.fw,n.fh,1),i.position.z=.02,t.add(i),i.userData.q=n,e.userData.q=n,So.push(i,e),t.updateMatrixWorld();const a=n.lines.slice(0,3).map((r,s)=>s?`<p>${cn(r.length>150?r.slice(0,148)+"…":r)}</p>`:`<div class="s">${cn(r)}</div>`).join("");Oc(`<div class="t">${cn(n.title)}</div>${a}<div class="s">E · read more on tjm.art</div>`,t.localToWorld(new L(0,n.fh/2-.03,.03)),n,n.fw-.06,"board",null)});wi.paintings.forEach((n,t)=>{const e=new Ke;e.position.set(n.x,n.y,n.z),e.rotation.y=Math.atan2(n.ix,n.iz),ie.add(e);const i=Fc.load(js+n.img);i.colorSpace=Ee,i.magFilter=i.minFilter=Pe,i.generateMipmaps=!1;const a=n.fw,r=n.fh,s=new kt(On,Jm);s.scale.set(a+.1,r+.1,1),s.position.z=.005,e.add(s);const o=new kt(On,new pe({map:i}));o.scale.set(n.w,n.h,1),o.position.z=.02,e.add(o);const l=new kt(On,Qm);l.scale.set(a*1.8+.6,r*1.8+.6,1),l.position.set(0,.15,.001),e.add(l);const c=new kt(On,Km);c.scale.set(Math.min(.8,a*.6),.05,1),c.position.set(0,r/2+.12,.06),e.add(c),n.slug=n.slug||n.id;const h=n.caption&&n.caption.length<30?n.caption:"",d=n.status==="available"?`<b class="ok">${n.price}</b> · available`:n.status==="sold"?'<b class="sold">SOLD</b>':n.status==="inquiry"?"available by inquiry":"not for sale",u={data:n,group:e,mesh:o,frame:s,state:"wall",i:t,w:a,h:r,room:n.room};e.updateMatrixWorld(),Oc(`<div class="t">${cn(n.title)}</div><div class="s">${h?cn(h)+" · ":""}${d}</div>`,e.localToWorld(new L(0,-r/2-.05,.03)),n,Math.max(a,Math.min(a+.38,.78)),"plq",u),o.userData.p=u,s.userData.p=u,si.push(u)});const ql=Array.from({length:6},()=>{const n=new ym(16769712,14,6,.75,.5,1.5);return ie.add(n),ie.add(n.target),n});let Yl=0;const e1=/(^|\.)tjm\.art$/.test(location.hostname);function Eo(n){const t=dt.position;si.forEach(a=>{if(a.dist=a.group.position.distanceTo(t),a.dist<5.5&&!a.hiReq){a.hiReq=1;const r=e1?a.data.hi:a.data.hiLocal&&js==="/"?js+"art-hi/"+a.data.slug+".webp":null;r&&Fc.load(r,s=>{s.colorSpace=Ee,s.anisotropy=4,a.mesh.material.map=s,a.mesh.material.needsUpdate=!0,a.hi=1},void 0,()=>{})}a.state==="wall"&&(a.group.visible=a.dist<24||!!(window.game&&window.game.freeze))});const e=si.filter(a=>a.state==="wall").sort((a,r)=>a.dist-r.dist).slice(0,ql.length);ql.forEach((a,r)=>{const s=e[r];if(!s){a.intensity=0;return}const o=new L(s.data.ix,0,s.data.iz);a.intensity=14,a.position.copy(s.group.position).addScaledVector(o,1.1),a.position.y+=1.4,a.target.position.copy(s.group.position)}),Xl.forEach(a=>a.d=a.pos.distanceTo(t));const i=[...Xl].sort((a,r)=>a.d-r.d).slice(0,Xs.length);Xs.forEach((a,r)=>{i[r]&&(a.position.copy(i[r].pos),a.userData.t=i[r])})}Eo();const To=()=>si.filter(n=>n.state==="wall"&&n.group.visible).flatMap(n=>[n.mesh,n.frame]),Fe=new Dm(dt,document.body),mn=document.getElementById("start");mn.addEventListener("click",()=>{matchMedia("(pointer:coarse)").matches?mn.style.display="none":Fe.lock()});Fe.addEventListener("lock",()=>mn.style.display="none");Fe.addEventListener("unlock",()=>{window.__test||(mn.style.display="flex")});const Ii={};addEventListener("keydown",n=>{Ii[n.code]=!0,n.code==="Digit1"&&ea(0),n.code==="Digit2"&&ea(1),n.code==="KeyC"&&jc.classList.toggle("open"),n.code==="KeyE"&&d1()});addEventListener("keyup",n=>Ii[n.code]=!1);addEventListener("wheel",n=>ea(ta^1));addEventListener("mousedown",n=>{Fe.isLocked&&n.button===0&&Ro()});const Qn={x:0,y:0};let va=null,qs=null;const Ao=document.getElementById("tmove");Ao.addEventListener("touchstart",n=>{qs=n.changedTouches[0],n.preventDefault()},{passive:!1});Ao.addEventListener("touchmove",n=>{const t=n.changedTouches[0];Qn.x=(t.clientX-qs.clientX)/60,Qn.y=(t.clientY-qs.clientY)/60,n.preventDefault()},{passive:!1});Ao.addEventListener("touchend",()=>{Qn.x=Qn.y=0});pn.addEventListener("touchstart",n=>{va=n.changedTouches[0]},{passive:!0});pn.addEventListener("touchmove",n=>{const t=n.changedTouches[0];if(!va)return;const e=new Ce(0,0,0,"YXZ").setFromQuaternion(dt.quaternion);e.y-=(t.clientX-va.clientX)*.005,e.x=Math.max(-1.4,Math.min(1.4,e.x-(t.clientY-va.clientY)*.005)),dt.quaternion.setFromEuler(e),va=t},{passive:!0});document.getElementById("tfire").addEventListener("touchstart",n=>{n.preventDefault(),Ro()});document.getElementById("tswap").addEventListener("touchstart",n=>{n.preventDefault(),ea(ta^1)});const i1=["PAINT GUN","BUY TOOL"];let ta=0,Wn=0;const Ge=new L,Tr=new mr,n1=new xe(60,vo/xo,.01,10);Tr.add(new Rc(16769216,3153944,1.2));const Bc=new Tm(16756848,2);Bc.position.set(1,2,1);Tr.add(Bc);const jn=n=>new Bi({color:n,flatShading:!0}),Ea=[new Ke,new Ke];{const n=Ea[0];le(.12,.12,.42,be.metal(1,1),0,0,0,n);const t=new kt(new un(.035,.045,.32,6),jn(3815998));t.rotation.x=Math.PI/2,t.position.set(0,.02,-.33),n.add(t);const e=new kt(new Ni(.085,0),jn(16742912));e.position.set(0,.12,.02),n.add(e),le(.05,.14,.06,jn(4861976),0,-.12,.12,n)}{const n=Ea[1];le(.06,.06,.5,be.wood(1,1),0,0,0,n),le(.16,.08,.08,jn(11569722),0,0,-.27,n);for(const t of[-1,1]){const e=le(.025,.025,.16,jn(6974064),t*.07,0,-.36,n);e.rotation.y=t*.35}le(.07,.05,.005,jn(14729312),.05,.06,-.2,n)}Ea.forEach(n=>{n.scale.setScalar(.7),n.rotation.y=.1,Tr.add(n)});$e.autoClear=!1;function Hc(){Ea.forEach((e,i)=>e.visible=i===ta);const n=Ea[ta],t=Math.sin(performance.now()/160)*Math.min(1,Ge.length())*.015;n.position.set(.24+t,-.24-Math.abs(t)+Wn*.03,-.62+Wn*.08),n.rotation.x=Wn*.25}function ea(n){ta=n,document.getElementById("wname").textContent=i1[n],Hc()}ea(0);const Gc=document.getElementById("msg");let Vc=0;function ze(n,t=2.5){Gc.textContent=n,Vc=t}const ri=new Am;function a1(){return dt.updateMatrixWorld(),ri.setFromCamera(new Nt(0,0),dt),ri.intersectObjects(To(),!1)[0]}function Ro(){ue&&ue.locked||hn||(Wn=1,ta===0?o1():h1())}const cr=[],mi=[],r1=new po(.08,6,4),s1=new pe({color:16742912});function o1(){const n=new L;dt.getWorldDirection(n);const t=new kt(r1,s1);t.position.copy(dt.position).addScaledVector(n,.3).y-=.03,ie.add(t),cr.push({m:t,v:n.multiplyScalar(14),life:3})}let Wc=0,ue=null;const xa=new Set;function l1(n){const t=n.object.userData.p,e=new pe({map:Gm(),transparent:!0,depthWrite:!1}),i=new kt(new Re(.9,.9),e),a=t.group.worldToLocal(n.point.clone());i.position.set(a.x,a.y,.02),i.rotation.z=Math.random()*6,t.group.add(i);const r=[],s=2+(Math.random()<.5?1:0);for(let l=0;l<s;l++){const c=Mr(Math.random()),h=["L","R","T"][l],d=t.w/2,u=t.h/2,m=h==="L"?new L(-d+.05,a.y,.05):h==="R"?new L(d-.05,a.y,.05):new L(a.x,u-.05,.05),g=h==="L"?new L(-d-.2,a.y,.35):h==="R"?new L(d+.2,a.y,.35):new L(a.x,u+.2,.35);Object.assign(c.userData,{a:l*2.1,base:a.clone(),hide:m,peek:g}),c.position.copy(m),c.visible=!1,t.group.add(c),r.push(c)}xa.add(t.data.slug),Wc++,document.getElementById("hitn").textContent=xa.size%3;const o={d:i,elves:r,group:t.group,t:0,dur:8};xa.size>=3&&(xa.clear(),document.getElementById("hitn").textContent=0,o.swarm=!0,o.dur=1e9,r.forEach(l=>l.visible=!1)),mi.push(o),ze(o.swarm?"SPLAT! ...SOMETHING STIRS BEHIND THE WALLS":"SPLAT!")}const hr=[],jc=document.getElementById("cart"),c1=document.getElementById("cartlist");function Xc(){document.getElementById("cartn").textContent=hr.length,c1.innerHTML=hr.length?hr.map(n=>`<li><a href="${n.url}" target="_blank" rel="noopener">${n.title}</a> ${n.price} · <i>In cart</i></li>`).join(""):"<li>empty</li>"}const dr=[];function h1(){const n=a1();if(!n)return ze("AIM AT A PAINTING");const t=n.object.userData.p;if(t.data.status==="sold")return ze("SOLD: "+t.data.title);if(t.data.status!=="available")return ze("BY INQUIRY ONLY: "+t.data.title);t.state="lifting",dr.push({p:t,t:0,from:t.group.position.clone(),rot:t.group.rotation.y}),hr.push(t.data),Xc(),jc.classList.add("open"),ze("ADDED TO CART: "+t.data.title)}function d1(){dt.updateMatrixWorld(),ri.setFromCamera(new Nt(0,0),dt),ri.far=8;const n=ri.intersectObjects([...To(),...So],!1)[0];if(ri.far=1/0,!n)return ze("AIM AT A PAINTING, THEN PRESS E");const t=n.object.userData.p?n.object.userData.p.data:n.object.userData.q;ze("OPENING "+t.title.toUpperCase()),Fe.isLocked&&Fe.unlock(),window.open(t.url,"_blank","noopener")}const Bn=document.getElementById("goto");Bn.innerHTML='<option value="">Go to a painting…</option>'+Vi.map(n=>`<optgroup label="${cn(n.title)}">`+si.filter(t=>t.room===n.id).map(t=>`<option value="${t.i}">${cn(t.data.title)}</option>`).join("")+"</optgroup>").join("");["click","mousedown","touchstart"].forEach(n=>Bn.addEventListener(n,t=>t.stopPropagation()));function qc(n){const t=si[n];if(!t||t.state!=="wall")return;const e=new L(t.data.ix,0,t.data.iz),i=Math.max(1.8,Math.min(4,t.h*1.3+.8));dt.position.copy(t.group.position).addScaledVector(e,i),dt.position.y=Hi+bi(dt.position.x,dt.position.z),dt.lookAt(t.group.position.x,Math.min(t.group.position.y,Hi+.4),t.group.position.z);const a=new Ce(0,0,0,"YXZ").setFromQuaternion(dt.quaternion);a.z=0,dt.quaternion.setFromEuler(a),Ge.set(0,0,0),Eo(),ze(t.data.title.toUpperCase())}Bn.addEventListener("change",()=>{Bn.value!==""&&(qc(+Bn.value),Bn.value="",matchMedia("(pointer:coarse)").matches?mn.style.display="none":Fe.lock())});const kn=new L;function $l(){const n=dt.position,t=pn.getBoundingClientRect(),e=yo(n.x,n.z).id,i=t.height/2/Math.tan(nd.degToRad(dt.fov/2)),a=hn||ue&&ue.locked;for(const r of gr){const s=r.pos.distanceTo(n),o=r.cls==="board"?5:6.5;let l=!a&&s<o&&(n.x-r.pos.x)*r.n.x+(n.z-r.pos.z)*r.n.z>.25&&r.room===e&&(!r.p||r.p.state==="wall");if(l&&(kn.copy(r.pos).project(dt),l=kn.z<1&&Math.abs(kn.x)<1.2&&Math.abs(kn.y)<1.2),!l){r.shown&&(r.el.style.display="none",r.shown=!1);continue}r.shown||(r.el.style.display="block",r.shown=!0);const c=i/s;r.el.style.left=t.left+(kn.x+1)/2*t.width+"px",r.el.style.top=t.top+(1-kn.y)/2*t.height+"px",r.el.style.width=r.w*c+"px",r.el.style.fontSize=Math.min(30,c*(r.cls==="board"?.034:.07))+"px",r.el.style.opacity=Math.min(1,(o-s)/2.5).toFixed(2)}}const gi=(n,t,e)=>new L(n,t,e),nn=(n,t,e)=>n.clone().lerp(t,Math.min(1,Math.max(0,e))),Di=n=>(n=Math.min(1,Math.max(0,n)),n*n*(3-2*n));function f1(){mi.forEach(a=>a.inSwarm=!0),Fe.enabled=!1,Ge.set(0,0,0);const n=[],t=yo(dt.position.x,dt.position.z);si.filter(a=>a.state==="wall"&&a.room===t.id).sort((a,r)=>a.dist-r.dist).slice(0,8).forEach(a=>{a.group.visible=!0;for(let r=0;r<4;r++){const s=a.w/2,o=a.h/2,l=r%3,c=(Math.random()-.5)*a.h*.8,h=(Math.random()-.5)*a.w*.8,d=a.group.localToWorld(l===2?gi(h,o-.05,.05):gi(l?s-.05:-s+.05,c,.05)),u=a.group.localToWorld(l===2?gi(h,o+.3,.45):gi(l?s+.28:-s-.28,c,.45)),m=Mr(Math.random());m.position.copy(d),ie.add(m);const g=Math.random()*Math.PI*2,w=.7+Math.random()*.7;n.push({s:m,home:d,peek:u,a:g,rad:w,dy:-.55-Math.random()*.5,ph:Math.random()*6,j:r})}});const i=t.id==="central"?gi(Wi.x,0,Wi.z):gi((t.minX+t.maxX)/2,0,(t.minZ+t.maxZ)/2);ue={t:0,elves:n,locked:!0,from:dt.position.clone(),dest:i,landed:!1,shake:0},ze("THE ELVES HAVE OPINIONS",6)}function u1(n){const t=ue;t.t+=n;const e=t.t,i=new Ce(0,0,0,"YXZ").setFromQuaternion(dt.quaternion),a=Hi+bi(t.from.x,t.from.z)+Di((e-2.2)/.8)*(1.5-bi(t.from.x,t.from.z)),r=Di((e-3)/3),s=nn(gi(t.from.x,0,t.from.z),t.dest,r);let o=a,l=0;if(e>2.2&&e<6&&(o+=Math.sin(e*7)*.12,l=Math.sin(e*3.3)*.12),e>=6){const d=e-6,u=Hi+bi(t.dest.x,t.dest.z);o=Math.max(u,3.2-4.9*d*d*1.4),o<=u&&!t.landed&&(t.landed=!0,t.shake=.45,ze("*THUD*"))}t.landed&&(t.shake=Math.max(0,t.shake-n));const c=t.shake*.35;dt.position.set(s.x+(Math.random()-.5)*c,o-(t.landed&&t.shake>.3?.15:0)+(Math.random()-.5)*c,s.z+(Math.random()-.5)*c),e>2.2&&e<6&&(i.x+=(-.7-i.x)*Math.min(1,n*2)),e>6.4&&(i.x+=(0-i.x)*Math.min(1,n*4)),e>8.5&&(i.x=0),i.z=l,dt.quaternion.setFromEuler(i);const h=i.y;t.elves.forEach((d,u)=>{const m=gi(Math.cos(d.a+h)*d.rad,d.dy+Math.sin(e*9+d.ph)*.08,Math.sin(d.a+h)*d.rad),g=dt.position.clone().add(m),w=gi(dt.position.x+m.x*1.6,.35+Math.abs(Math.sin(e*8+d.ph))*.2,dt.position.z+m.z*1.6);let p;e<1?p=nn(d.home,d.peek,Di(e-u%3*.1)):e<2.2?p=nn(d.peek,w,Di((e-1)/1.2)):e<2.8?p=nn(w,g,Di((e-2.2)/.6)):e<6?p=g:e<6.6?p=w:e<8.2?p=nn(w,d.peek,Di((e-6.6)/1.6)):p=nn(d.peek,d.home,Di((e-8.2)/.8)),e>=6&&e<6.6&&(d.s.userData.g=d.s.userData.g||p.clone()),d.s.position.copy(e>=6&&e<6.6?d.s.userData.g:p),e>=6.6&&e<8.2&&d.s.position.copy(nn(d.s.userData.g||w,d.peek,Di((e-6.6)/1.6))),d.s.scale.setScalar(Math.max(.05,Math.min(1,e/.9,(9-e)/.8))),yr(d.s,e<1?"peek":e<2.2?"walk":e<6?"carry":e<6.6?"idle":"retreat",e,dt,n)}),e>7.2&&t.locked&&(t.locked=!1,Fe.enabled=!0,ze("CONTROL RESTORED. BEHAVE.")),e>9&&(t.elves.forEach(d=>ie.remove(d.s)),ue=null,Ta++,dt.position.y=Hi+bi(dt.position.x,dt.position.z),i.x=0,i.z=0,dt.quaternion.setFromEuler(i))}let Zl=performance.now(),Ta=0,Yc=!1,hn=!1,$c=null;const zi=Bm({scene:ie,camera:dt,renderer:$e,makeElf:Mr,animateElf:yr,elfUniforms:Ma,say:ze,canvas:pn,floorY:bi});function Ys(){Yc=!1,hn=!0,Fe.enabled=!1,zi.start(),document.body.classList.add("chaos")}new URLSearchParams(location.search).get("chaos")==="1"&&setTimeout(()=>{window.__test=1,mn.style.display="none",dt.position.set(0,Hi+bi(0,0),0),Ys()},800);function Zc(){requestAnimationFrame(Zc);const n=performance.now(),t=Math.min(.05,(n-Zl)/1e3);if(Zl=n,Yc&&!ue&&Ys(),hn){const i=zi.update(t,n);i&&i.finished&&(hn=!1,Fe.enabled=!0,document.body.classList.remove("chaos"),$c={before:i.savedPos.toArray(),after:dt.position.toArray()}),Ma.uTime.value=n/1e3,Wl(n),zi.state&&zi.state.inWorld&&!zi.state.back||$e.clear(),zi.render()||$e.render(ie,dt),$l();return}if(!(window.game&&window.game.freeze))if(ue)u1(t);else{Ge.x-=Ge.x*10*t,Ge.z-=Ge.z*10*t;const i=(Ii.KeyW||Ii.ArrowUp?1:0)-(Ii.KeyS||Ii.ArrowDown?1:0)-Qn.y,a=(Ii.KeyD?1:0)-(Ii.KeyA?1:0)+Qn.x;Ge.z+=Math.max(-1,Math.min(1,i))*60*t,Ge.x+=Math.max(-1,Math.min(1,a))*60*t;const r=dt.position.clone();Fe.moveRight(Ge.x*t),Fe.moveForward(Ge.z*t),lr(dt.position.x,dt.position.z)||(lr(dt.position.x,r.z)?dt.position.z=r.z:lr(r.x,dt.position.z)?dt.position.x=r.x:(dt.position.x=r.x,dt.position.z=r.z));for(const[s,o]of zc){const l=dt.position.x-s,c=dt.position.z-o,h=Math.hypot(l,c);h<.75&&h>0&&(dt.position.x=s+l/h*.75,dt.position.z=o+c/h*.75)}dt.position.y=Hi+bi(dt.position.x,dt.position.z)+Math.abs(Math.sin(n/120))*Math.min(.06,Ge.length()*.02)}for(let i=cr.length-1;i>=0;i--){const a=cr[i];a.v.y-=.8*t,a.life-=t;const r=a.v.clone().multiplyScalar(t);ri.set(a.m.position,r.clone().normalize()),ri.far=r.length();const s=ri.intersectObjects(To(),!1)[0];a.m.position.add(r);const o=a.m.position.x,l=a.m.position.z,h=![...Vi,...Mo].some(d=>o>d.minX-.6&&o<d.maxX+.6&&l>d.minZ-.6&&l<d.maxZ+.6)||a.m.position.y<0||a.m.position.y>Ve;s&&l1(s),(s||h||a.life<0)&&(ie.remove(a.m),cr.splice(i,1))}ri.far=1/0;for(let i=mi.length-1;i>=0;i--){const a=mi[i];a.t+=t;const r=a.t/a.dur;if(a.swarm&&a.t>=3&&!ue&&!hn)if(Ta>=2){Ta=0,mi.forEach(l=>{l.group.remove(l.d,...l.elves)}),mi.length=0,Ys();break}else f1();if(a.swarm||a.inSwarm){if(a.elves.forEach(l=>l.visible=!1),a.inSwarm){const l=Math.min(1,Math.max(0,(ue?ue.t:99)-2.5)/3);a.d.material.opacity=1-l,l>=1&&(a.group.remove(a.d,...a.elves),mi.splice(i,1))}continue}a.said;const s=a.t,o=Math.min(1,Math.max(0,(s-4.4)/2.2));a.d.material.opacity=1-o,a.d.scale.setScalar(1-o*.4),s>3&&!a.said&&(a.said=1,ze("DMT ELVES DEPLOYED: SCRUBBING...")),a.elves.forEach((l,c)=>{const h=l.userData;l.visible=s>3;const d=h.base.clone().add(new L(Math.cos(h.a+s*1.5)*.28,Math.sin(h.a+s*1.1)*.12-.15,.3)),u=(m,g,w)=>m.clone().lerp(g,Math.min(1,Math.max(0,w)));s<3.8?l.position.copy(u(h.hide,h.peek,(s-3)/.8)):s<4.4?l.position.copy(u(h.peek,d,(s-3.8)/.6)).setZ(.25):s<6.6?l.position.copy(d):s<7.2?l.position.copy(u(d,h.peek,(s-6.6)/.6)).setZ(.25):l.position.copy(u(h.peek,h.hide,(s-7.2)/.8)),l.scale.setScalar(Math.max(.05,Math.min(1,(s-3)/.8,(8-s)/.8))),yr(l,s<3.8?"peek":s<4.4?"walk":s<6.6?"scrub":"retreat",s,dt,t)}),r>=1&&(a.group.remove(a.d,...a.elves),mi.splice(i,1))}for(let i=dr.length-1;i>=0;i--){const a=dr[i];a.t+=t;const r=a.p.group,s=Math.min(1,a.t/2.2);if(r.position.copy(a.from),r.rotation.y=a.rot,r.translateZ(s*1.2),r.position.y=a.from.y+Math.sin(s*Math.PI)*.4+s*s*1.5,r.rotation.y=a.rot+s*Math.PI*2,r.scale.setScalar(1-s*.85),s>=1){r.visible=!1,a.p.state="cart",dr.splice(i,1);const o=new kt(new Re(1.8,.28),new pe({map:Ic("IN CART · "+a.p.data.title)}));o.position.copy(a.from),o.rotation.y=a.rot,o.translateZ(.02),ie.add(o)}}Wn=Math.max(0,Wn-t*5),Hc(),$l(),(Vc-=t)<0&&(Gc.textContent=""),(Yl-=t)<0&&(Yl=.25,Eo()),Xs.forEach(i=>{const a=i.userData.t;if(!a)return;const r=.75+.25*Math.sin(n/70+a.ph)*Math.sin(n/130+a.ph*2);i.intensity=6*r,a.flame.scale.y=.8+r*.5}),kc.offset.x=n/8e3%1,Ma.uTime.value=n/1e3,Wl(n);const e=ue?Math.min(1,ue.t/1.5)*(ue.t<8?1:Math.max(0,9-ue.t)):0;Ma.uPulse.value=e,pn.style.filter=e>.01?`saturate(${1+e*(.6+.4*Math.sin(n/180))}) hue-rotate(${e*25*Math.sin(n/400)}deg) drop-shadow(${2*e}px 0 rgba(255,0,90,.45)) drop-shadow(${-2*e}px 0 rgba(0,255,220,.45))`:"",pn.style.transform=e>.01?`scale(${1+.012*e*Math.sin(n/230)}) skewX(${e*.8*Math.sin(n/310)}deg)`:"",$e.clear(),$e.render(ie,dt),$e.clearDepth(),$e.render(Tr,n1)}Zc();Xc();window.game={ceilings:wo,ROOMS:Vi,walkable:lr,roomAt:yo,get nPaintings(){return si.length},get chaosActive(){return hn},get chaosT(){return zi.state?zi.state.t:-1},get lastChaos(){return $c},get swarmCount(){return Ta},setSwarmCount:n=>{Ta=n},renderer:$e,camera:dt,makeElf:Mr,animateElf:yr,scene:ie,splats:mi,get swarm(){return ue},get hits(){return Wc},get distinct(){return xa.size},setWeapon:ea,fire:Ro,paintings:si,goTo:qc,LABELS:gr,boards:So,get shownLabels(){return gr.filter(n=>n.shown).length},lookAt:(n,t=3.5)=>{const e=si[n].group,i=new L(0,0,1).applyQuaternion(e.quaternion);dt.position.copy(e.position).addScaledVector(i,t),dt.position.y=Hi+bi(dt.position.x,dt.position.z),dt.lookAt(e.position.x,e.position.y,e.position.z)},hideStart:()=>{window.__test=1,mn.style.display="none"}};
