(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Il="170",Eu=0,Lc=1,Tu=2,zl=1,id=2,Hi=3,bn=0,Ve=1,Be=2,De=0,ba=1,yi=2,Dc=3,Uc=4,nd=5,wi=100,Au=101,Cu=102,Ru=103,Pu=104,Qa=200,Lu=201,Du=202,Uu=203,zo=204,No=205,ko=206,Iu=207,Fo=208,zu=209,Nu=210,ku=211,Fu=212,Ou=213,Bu=214,Oo=0,Bo=1,Ho=2,Aa=3,Vo=4,Go=5,Wo=6,jo=7,Nl=0,Hu=1,Vu=2,Ri=0,Gu=1,Wu=2,ju=3,Xu=4,qu=5,ms=6,Yu=7,ad=300,Ca=301,Ra=302,Xo=303,qo=304,ys=306,Pi=1e3,Yi=1001,Yo=1002,Ue=1003,$u=1004,Er=1005,$e=1006,Hs=1007,$i=1008,Li=1009,rd=1010,sd=1011,ur=1012,kl=1013,On=1014,Zi=1015,ri=1016,Fl=1017,Ol=1018,Bn=1020,od=35902,ld=1021,cd=1022,ui=1023,hd=1024,dd=1025,ya=1026,Hn=1027,ud=1028,Bl=1029,fd=1030,Hl=1031,Vl=1033,rs=33776,ss=33777,os=33778,ls=33779,$o=35840,Zo=35841,Jo=35842,Ko=35843,Qo=36196,tl=37492,el=37496,il=37808,nl=37809,al=37810,rl=37811,sl=37812,ol=37813,ll=37814,cl=37815,hl=37816,dl=37817,ul=37818,fl=37819,pl=37820,ml=37821,cs=36492,gl=36494,vl=36495,pd=36283,xl=36284,wl=36285,_l=36286,Zu=3200,Ju=3201,Ms=0,Ku=1,Wi="",ve="srgb",Na="srgb-linear",Ss="linear",oe="srgb",Zn=7680,Ic=519,Qu=512,tf=513,ef=514,md=515,nf=516,af=517,rf=518,sf=519,bl=35044,zc="300 es",Ji=2e3,gs=2001;class jn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const a=this._listeners[t];if(a!==void 0){const r=a.indexOf(e);r!==-1&&a.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const a=n.slice(0);for(let r=0,s=a.length;r<s;r++)a[r].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nc=1234567;const rr=Math.PI/180,Pa=180/Math.PI;function Ki(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ke[i&255]+ke[i>>8&255]+ke[i>>16&255]+ke[i>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]).toLowerCase()}function Re(i,t,e){return Math.max(t,Math.min(e,i))}function Gl(i,t){return(i%t+t)%t}function of(i,t,e,n,a){return n+(i-t)*(a-n)/(e-t)}function lf(i,t,e){return i!==t?(e-i)/(t-i):0}function sr(i,t,e){return(1-e)*i+e*t}function cf(i,t,e,n){return sr(i,t,1-Math.exp(-e*n))}function hf(i,t=1){return t-Math.abs(Gl(i,t*2)-t)}function df(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function uf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ff(i,t){return i+Math.floor(Math.random()*(t-i+1))}function pf(i,t){return i+Math.random()*(t-i)}function mf(i){return i*(.5-Math.random())}function gf(i){i!==void 0&&(Nc=i);let t=Nc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vf(i){return i*rr}function xf(i){return i*Pa}function wf(i){return(i&i-1)===0&&i!==0}function _f(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function bf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yf(i,t,e,n,a){const r=Math.cos,s=Math.sin,o=r(e/2),l=s(e/2),c=r((t+n)/2),h=s((t+n)/2),d=r((t-n)/2),u=s((t-n)/2),p=r((n-t)/2),g=s((n-t)/2);switch(a){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function _i(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function se(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Tr={DEG2RAD:rr,RAD2DEG:Pa,generateUUID:Ki,clamp:Re,euclideanModulo:Gl,mapLinear:of,inverseLerp:lf,lerp:sr,damp:cf,pingpong:hf,smoothstep:df,smootherstep:uf,randInt:ff,randFloat:pf,randFloatSpread:mf,seededRandom:gf,degToRad:vf,radToDeg:xf,isPowerOfTwo:wf,ceilPowerOfTwo:_f,floorPowerOfTwo:bf,setQuaternionFromProperEuler:yf,normalize:se,denormalize:_i};class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,a=t.elements;return this.x=a[0]*e+a[3]*n+a[6],this.y=a[1]*e+a[4]*n+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),a=Math.sin(e),r=this.x-t.x,s=this.y-t.y;return this.x=r*n-s*a+t.x,this.y=r*a+s*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class jt{constructor(t,e,n,a,r,s,o,l,c){jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,a,r,s,o,l,c)}set(t,e,n,a,r,s,o,l,c){const h=this.elements;return h[0]=t,h[1]=a,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,a=e.elements,r=this.elements,s=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],x=a[0],m=a[3],f=a[6],S=a[1],y=a[4],v=a[7],P=a[2],E=a[5],A=a[8];return r[0]=s*x+o*S+l*P,r[3]=s*m+o*y+l*E,r[6]=s*f+o*v+l*A,r[1]=c*x+h*S+d*P,r[4]=c*m+h*y+d*E,r[7]=c*f+h*v+d*A,r[2]=u*x+p*S+g*P,r[5]=u*m+p*y+g*E,r[8]=u*f+p*v+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*s*h-e*o*c-n*r*h+n*o*l+a*r*c-a*s*l}invert(){const t=this.elements,e=t[0],n=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*s-o*c,u=o*l-h*r,p=c*r-s*l,g=e*d+n*u+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(a*c-h*n)*x,t[2]=(o*n-a*s)*x,t[3]=u*x,t[4]=(h*e-a*l)*x,t[5]=(a*r-o*e)*x,t[6]=p*x,t[7]=(n*l-c*e)*x,t[8]=(s*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,a,r,s,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*s+c*o)+s+t,-a*c,a*l,-a*(-c*s+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Vs.makeScale(t,e)),this}rotate(t){return this.premultiply(Vs.makeRotation(-t)),this}translate(t,e){return this.premultiply(Vs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let a=0;a<9;a++)if(e[a]!==n[a])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Vs=new jt;function gd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Mf(){const i=fr("canvas");return i.style.display="block",i}const kc={};function tr(i){i in kc||(kc[i]=!0,console.warn(i))}function Sf(i,t,e){return new Promise(function(n,a){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:a();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Ef(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Tf(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Kt={enabled:!0,workingColorSpace:Na,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(i.r=Qi(i.r),i.g=Qi(i.g),i.b=Qi(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(i.r=Ma(i.r),i.g=Ma(i.g),i.b=Ma(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Wi?Ss:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Qi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ma(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Fc=[.64,.33,.3,.6,.15,.06],Oc=[.2126,.7152,.0722],Bc=[.3127,.329],Hc=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vc=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Kt.define({[Na]:{primaries:Fc,whitePoint:Bc,transfer:Ss,toXYZ:Hc,fromXYZ:Vc,luminanceCoefficients:Oc,workingColorSpaceConfig:{unpackColorSpace:ve},outputColorSpaceConfig:{drawingBufferColorSpace:ve}},[ve]:{primaries:Fc,whitePoint:Bc,transfer:oe,toXYZ:Hc,fromXYZ:Vc,luminanceCoefficients:Oc,outputColorSpaceConfig:{drawingBufferColorSpace:ve}}});let Jn;class Af{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Jn===void 0&&(Jn=fr("canvas")),Jn.width=t.width,Jn.height=t.height;const n=Jn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Jn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=fr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const a=n.getImageData(0,0,t.width,t.height),r=a.data;for(let s=0;s<r.length;s++)r[s]=Qi(r[s]/255)*255;return n.putImageData(a,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Qi(e[n]/255)*255):e[n]=Qi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Cf=0;class vd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=Ki(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?r.push(Gs(a[s].image)):r.push(Gs(a[s]))}else r=Gs(a);n.url=r}return e||(t.images[this.uuid]=n),n}}function Gs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Af.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Rf=0;class Pe extends jn{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=Yi,a=Yi,r=$e,s=$i,o=ui,l=Li,c=Pe.DEFAULT_ANISOTROPY,h=Wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Ki(),this.name="",this.source=new vd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=a,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ad)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Pi:t.x=t.x-Math.floor(t.x);break;case Yi:t.x=t.x<0?0:1;break;case Yo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Pi:t.y=t.y-Math.floor(t.y);break;case Yi:t.y=t.y<0?0:1;break;case Yo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=ad;Pe.DEFAULT_ANISOTROPY=1;class le{constructor(t=0,e=0,n=0,a=1){le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,a){return this.x=t,this.y=e,this.z=n,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,a=this.z,r=this.w,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*a+s[12]*r,this.y=s[1]*e+s[5]*n+s[9]*a+s[13]*r,this.z=s[2]*e+s[6]*n+s[10]*a+s[14]*r,this.w=s[3]*e+s[7]*n+s[11]*a+s[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,a,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,v=(p+1)/2,P=(f+1)/2,E=(h+u)/4,A=(d+x)/4,D=(g+m)/4;return y>v&&y>P?y<.01?(n=0,a=.707106781,r=.707106781):(n=Math.sqrt(y),a=E/n,r=A/n):v>P?v<.01?(n=.707106781,a=0,r=.707106781):(a=Math.sqrt(v),n=E/a,r=D/a):P<.01?(n=.707106781,a=.707106781,r=0):(r=Math.sqrt(P),n=A/r,a=D/r),this.set(n,a,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-x)/S,this.z=(u-h)/S,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pf extends jn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);const a={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Pe(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const s=n.count;for(let o=0;o<s;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=t,this.textures[a].image.height=e,this.textures[a].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,a=t.textures.length;n<a;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new vd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qe extends Pf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class xd extends Pe{constructor(t=null,e=1,n=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:a},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lf extends Pe{constructor(t=null,e=1,n=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:a},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ka{constructor(t=0,e=0,n=0,a=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=a}static slerpFlat(t,e,n,a,r,s,o){let l=n[a+0],c=n[a+1],h=n[a+2],d=n[a+3];const u=r[s+0],p=r[s+1],g=r[s+2],x=r[s+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(d!==x||l!==u||c!==p||h!==g){let m=1-o;const f=l*u+c*p+h*g+d*x,S=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){const P=Math.sqrt(y),E=Math.atan2(P,f*S);m=Math.sin(m*E)/P,o=Math.sin(o*E)/P}const v=o*S;if(l=l*m+u*v,c=c*m+p*v,h=h*m+g*v,d=d*m+x*v,m===1-o){const P=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=P,c*=P,h*=P,d*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,a,r,s){const o=n[a],l=n[a+1],c=n[a+2],h=n[a+3],d=r[s],u=r[s+1],p=r[s+2],g=r[s+3];return t[e]=o*g+h*d+l*p-c*u,t[e+1]=l*g+h*u+c*d-o*p,t[e+2]=c*g+h*p+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,a){return this._x=t,this._y=e,this._z=n,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,a=t._y,r=t._z,s=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(a/2),d=o(r/2),u=l(n/2),p=l(a/2),g=l(r/2);switch(s){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,a=Math.sin(n);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],a=e[4],r=e[8],s=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(s-a)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(a+s)/p,this._z=(r+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(r-c)/p,this._x=(a+s)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(s-a)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Re(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const a=Math.min(1,e/n);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,a=t._y,r=t._z,s=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+s*o+a*c-r*l,this._y=a*h+s*l+r*o-n*c,this._z=r*h+s*c+n*l-a*o,this._w=s*h-n*o-a*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,a=this._y,r=this._z,s=this._w;let o=s*t._w+n*t._x+a*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=s,this._x=n,this._y=a,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*s+e*this._w,this._x=p*n+e*this._x,this._y=p*a+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=s*d+this._w*u,this._x=n*d+this._x*u,this._y=a*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),a=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(a*Math.sin(t),a*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,a=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*a,this.y=r[1]*e+r[4]*n+r[7]*a,this.z=r[2]*e+r[5]*n+r[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,a=this.z,r=t.elements,s=1/(r[3]*e+r[7]*n+r[11]*a+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*a+r[12])*s,this.y=(r[1]*e+r[5]*n+r[9]*a+r[13])*s,this.z=(r[2]*e+r[6]*n+r[10]*a+r[14])*s,this}applyQuaternion(t){const e=this.x,n=this.y,a=this.z,r=t.x,s=t.y,o=t.z,l=t.w,c=2*(s*a-o*n),h=2*(o*e-r*a),d=2*(r*n-s*e);return this.x=e+l*c+s*d-o*h,this.y=n+l*h+o*c-r*d,this.z=a+l*d+r*h-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,a=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*a,this.y=r[1]*e+r[5]*n+r[9]*a,this.z=r[2]*e+r[6]*n+r[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,a=t.y,r=t.z,s=e.x,o=e.y,l=e.z;return this.x=a*l-r*o,this.y=r*s-n*l,this.z=n*o-a*s,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ws.copy(this).projectOnVector(t),this.sub(Ws)}reflect(t){return this.sub(Ws.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,a=this.z-t.z;return e*e+n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const a=Math.sin(e)*t;return this.x=a*Math.sin(n),this.y=Math.cos(e)*t,this.z=a*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=a,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ws=new R,Gc=new ka;class gr{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(mi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(mi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=mi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let s=0,o=r.count;s<o;s++)t.isMesh===!0?t.getVertexPosition(s,mi):mi.fromBufferAttribute(r,s),mi.applyMatrix4(t.matrixWorld),this.expandByPoint(mi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ar.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ar.copy(n.boundingBox)),Ar.applyMatrix4(t.matrixWorld),this.union(Ar)}const a=t.children;for(let r=0,s=a.length;r<s;r++)this.expandByObject(a[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mi),mi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ga),Cr.subVectors(this.max,Ga),Kn.subVectors(t.a,Ga),Qn.subVectors(t.b,Ga),ta.subVectors(t.c,Ga),sn.subVectors(Qn,Kn),on.subVectors(ta,Qn),En.subVectors(Kn,ta);let e=[0,-sn.z,sn.y,0,-on.z,on.y,0,-En.z,En.y,sn.z,0,-sn.x,on.z,0,-on.x,En.z,0,-En.x,-sn.y,sn.x,0,-on.y,on.x,0,-En.y,En.x,0];return!js(e,Kn,Qn,ta,Cr)||(e=[1,0,0,0,1,0,0,0,1],!js(e,Kn,Qn,ta,Cr))?!1:(Rr.crossVectors(sn,on),e=[Rr.x,Rr.y,Rr.z],js(e,Kn,Qn,ta,Cr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(mi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ni),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ni=[new R,new R,new R,new R,new R,new R,new R,new R],mi=new R,Ar=new gr,Kn=new R,Qn=new R,ta=new R,sn=new R,on=new R,En=new R,Ga=new R,Cr=new R,Rr=new R,Tn=new R;function js(i,t,e,n,a){for(let r=0,s=i.length-3;r<=s;r+=3){Tn.fromArray(i,r);const o=a.x*Math.abs(Tn.x)+a.y*Math.abs(Tn.y)+a.z*Math.abs(Tn.z),l=t.dot(Tn),c=e.dot(Tn),h=n.dot(Tn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Df=new gr,Wa=new R,Xs=new R;class Wl{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Df.setFromPoints(t).getCenter(n);let a=0;for(let r=0,s=t.length;r<s;r++)a=Math.max(a,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Wa.subVectors(t,this.center);const e=Wa.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),a=(n-this.radius)*.5;this.center.addScaledVector(Wa,a/n),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xs.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Wa.copy(t.center).add(Xs)),this.expandByPoint(Wa.copy(t.center).sub(Xs))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ki=new R,qs=new R,Pr=new R,ln=new R,Ys=new R,Lr=new R,$s=new R;class wd{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ki)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ki.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ki.copy(this.origin).addScaledVector(this.direction,e),ki.distanceToSquared(t))}distanceSqToSegment(t,e,n,a){qs.copy(t).add(e).multiplyScalar(.5),Pr.copy(e).sub(t).normalize(),ln.copy(this.origin).sub(qs);const r=t.distanceTo(e)*.5,s=-this.direction.dot(Pr),o=ln.dot(this.direction),l=-ln.dot(Pr),c=ln.lengthSq(),h=Math.abs(1-s*s);let d,u,p,g;if(h>0)if(d=s*l-o,u=s*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const x=1/h;d*=x,u*=x,p=d*(d+s*u+2*o)+u*(s*d+u+2*l)+c}else u=r,d=Math.max(0,-(s*u+o)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(s*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-s*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(s*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=s>0?-r:r,d=Math.max(0,-(s*u+o)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(qs).addScaledVector(Pr,u),p}intersectSphere(t,e){ki.subVectors(t.center,this.origin);const n=ki.dot(this.direction),a=ki.dot(ki)-n*n,r=t.radius*t.radius;if(a>r)return null;const s=Math.sqrt(r-a),o=n-s,l=n+s;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,a,r,s,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,a=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,a=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,s=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,s=(t.min.y-u.y)*h),n>s||r>a||((r>n||isNaN(n))&&(n=r),(s<a||isNaN(a))&&(a=s),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>a)||((o>n||n!==n)&&(n=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(n>=0?n:a,e)}intersectsBox(t){return this.intersectBox(t,ki)!==null}intersectTriangle(t,e,n,a,r){Ys.subVectors(e,t),Lr.subVectors(n,t),$s.crossVectors(Ys,Lr);let s=this.direction.dot($s),o;if(s>0){if(a)return null;o=1}else if(s<0)o=-1,s=-s;else return null;ln.subVectors(this.origin,t);const l=o*this.direction.dot(Lr.crossVectors(ln,Lr));if(l<0)return null;const c=o*this.direction.dot(Ys.cross(ln));if(c<0||l+c>s)return null;const h=-o*ln.dot($s);return h<0?null:this.at(h/s,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ee{constructor(t,e,n,a,r,s,o,l,c,h,d,u,p,g,x,m){ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,a,r,s,o,l,c,h,d,u,p,g,x,m)}set(t,e,n,a,r,s,o,l,c,h,d,u,p,g,x,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=a,f[1]=r,f[5]=s,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ee().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,a=1/ea.setFromMatrixColumn(t,0).length(),r=1/ea.setFromMatrixColumn(t,1).length(),s=1/ea.setFromMatrixColumn(t,2).length();return e[0]=n[0]*a,e[1]=n[1]*a,e[2]=n[2]*a,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*s,e[9]=n[9]*s,e[10]=n[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,a=t.y,r=t.z,s=Math.cos(n),o=Math.sin(n),l=Math.cos(a),c=Math.sin(a),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=s*h,p=s*d,g=o*h,x=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=u-x*c,e[9]=-o*l,e[2]=x-u*c,e[6]=g+p*c,e[10]=s*l}else if(t.order==="YXZ"){const u=l*h,p=l*d,g=c*h,x=c*d;e[0]=u+x*o,e[4]=g*o-p,e[8]=s*c,e[1]=s*d,e[5]=s*h,e[9]=-o,e[2]=p*o-g,e[6]=x+u*o,e[10]=s*l}else if(t.order==="ZXY"){const u=l*h,p=l*d,g=c*h,x=c*d;e[0]=u-x*o,e[4]=-s*d,e[8]=g+p*o,e[1]=p+g*o,e[5]=s*h,e[9]=x-u*o,e[2]=-s*c,e[6]=o,e[10]=s*l}else if(t.order==="ZYX"){const u=s*h,p=s*d,g=o*h,x=o*d;e[0]=l*h,e[4]=g*c-p,e[8]=u*c+x,e[1]=l*d,e[5]=x*c+u,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=s*l}else if(t.order==="YZX"){const u=s*l,p=s*c,g=o*l,x=o*c;e[0]=l*h,e[4]=x-u*d,e[8]=g*d+p,e[1]=d,e[5]=s*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*d+g,e[10]=u-x*d}else if(t.order==="XZY"){const u=s*l,p=s*c,g=o*l,x=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+x,e[5]=s*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=o*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Uf,t,If)}lookAt(t,e,n){const a=this.elements;return ii.subVectors(t,e),ii.lengthSq()===0&&(ii.z=1),ii.normalize(),cn.crossVectors(n,ii),cn.lengthSq()===0&&(Math.abs(n.z)===1?ii.x+=1e-4:ii.z+=1e-4,ii.normalize(),cn.crossVectors(n,ii)),cn.normalize(),Dr.crossVectors(ii,cn),a[0]=cn.x,a[4]=Dr.x,a[8]=ii.x,a[1]=cn.y,a[5]=Dr.y,a[9]=ii.y,a[2]=cn.z,a[6]=Dr.z,a[10]=ii.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,a=e.elements,r=this.elements,s=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],x=n[6],m=n[10],f=n[14],S=n[3],y=n[7],v=n[11],P=n[15],E=a[0],A=a[4],D=a[8],_=a[12],w=a[1],T=a[5],U=a[9],B=a[13],N=a[2],j=a[6],z=a[10],Z=a[14],V=a[3],Y=a[7],at=a[11],st=a[15];return r[0]=s*E+o*w+l*N+c*V,r[4]=s*A+o*T+l*j+c*Y,r[8]=s*D+o*U+l*z+c*at,r[12]=s*_+o*B+l*Z+c*st,r[1]=h*E+d*w+u*N+p*V,r[5]=h*A+d*T+u*j+p*Y,r[9]=h*D+d*U+u*z+p*at,r[13]=h*_+d*B+u*Z+p*st,r[2]=g*E+x*w+m*N+f*V,r[6]=g*A+x*T+m*j+f*Y,r[10]=g*D+x*U+m*z+f*at,r[14]=g*_+x*B+m*Z+f*st,r[3]=S*E+y*w+v*N+P*V,r[7]=S*A+y*T+v*j+P*Y,r[11]=S*D+y*U+v*z+P*at,r[15]=S*_+y*B+v*Z+P*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],a=t[8],r=t[12],s=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+r*l*d-a*c*d-r*o*u+n*c*u+a*o*p-n*l*p)+x*(+e*l*p-e*c*u+r*s*u-a*s*p+a*c*h-r*l*h)+m*(+e*c*d-e*o*p-r*s*d+n*s*p+r*o*h-n*c*h)+f*(-a*o*h-e*l*d+e*o*u+a*s*d-n*s*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=e,a[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],S=d*m*c-x*u*c+x*l*p-o*m*p-d*l*f+o*u*f,y=g*u*c-h*m*c-g*l*p+s*m*p+h*l*f-s*u*f,v=h*x*c-g*d*c+g*o*p-s*x*p-h*o*f+s*d*f,P=g*d*l-h*x*l-g*o*u+s*x*u+h*o*m-s*d*m,E=e*S+n*y+a*v+r*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=S*A,t[1]=(x*u*r-d*m*r-x*a*p+n*m*p+d*a*f-n*u*f)*A,t[2]=(o*m*r-x*l*r+x*a*c-n*m*c-o*a*f+n*l*f)*A,t[3]=(d*l*r-o*u*r-d*a*c+n*u*c+o*a*p-n*l*p)*A,t[4]=y*A,t[5]=(h*m*r-g*u*r+g*a*p-e*m*p-h*a*f+e*u*f)*A,t[6]=(g*l*r-s*m*r-g*a*c+e*m*c+s*a*f-e*l*f)*A,t[7]=(s*u*r-h*l*r+h*a*c-e*u*c-s*a*p+e*l*p)*A,t[8]=v*A,t[9]=(g*d*r-h*x*r-g*n*p+e*x*p+h*n*f-e*d*f)*A,t[10]=(s*x*r-g*o*r+g*n*c-e*x*c-s*n*f+e*o*f)*A,t[11]=(h*o*r-s*d*r-h*n*c+e*d*c+s*n*p-e*o*p)*A,t[12]=P*A,t[13]=(h*x*a-g*d*a+g*n*u-e*x*u-h*n*m+e*d*m)*A,t[14]=(g*o*a-s*x*a-g*n*l+e*x*l+s*n*m-e*o*m)*A,t[15]=(s*d*a-h*o*a+h*n*l-e*d*l-s*n*u+e*o*u)*A,this}scale(t){const e=this.elements,n=t.x,a=t.y,r=t.z;return e[0]*=n,e[4]*=a,e[8]*=r,e[1]*=n,e[5]*=a,e[9]*=r,e[2]*=n,e[6]*=a,e[10]*=r,e[3]*=n,e[7]*=a,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,a))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),a=Math.sin(e),r=1-n,s=t.x,o=t.y,l=t.z,c=r*s,h=r*o;return this.set(c*s+n,c*o-a*l,c*l+a*o,0,c*o+a*l,h*o+n,h*l-a*s,0,c*l-a*o,h*l+a*s,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,a,r,s){return this.set(1,n,r,0,t,1,s,0,e,a,1,0,0,0,0,1),this}compose(t,e,n){const a=this.elements,r=e._x,s=e._y,o=e._z,l=e._w,c=r+r,h=s+s,d=o+o,u=r*c,p=r*h,g=r*d,x=s*h,m=s*d,f=o*d,S=l*c,y=l*h,v=l*d,P=n.x,E=n.y,A=n.z;return a[0]=(1-(x+f))*P,a[1]=(p+v)*P,a[2]=(g-y)*P,a[3]=0,a[4]=(p-v)*E,a[5]=(1-(u+f))*E,a[6]=(m+S)*E,a[7]=0,a[8]=(g+y)*A,a[9]=(m-S)*A,a[10]=(1-(u+x))*A,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,e,n){const a=this.elements;let r=ea.set(a[0],a[1],a[2]).length();const s=ea.set(a[4],a[5],a[6]).length(),o=ea.set(a[8],a[9],a[10]).length();this.determinant()<0&&(r=-r),t.x=a[12],t.y=a[13],t.z=a[14],gi.copy(this);const c=1/r,h=1/s,d=1/o;return gi.elements[0]*=c,gi.elements[1]*=c,gi.elements[2]*=c,gi.elements[4]*=h,gi.elements[5]*=h,gi.elements[6]*=h,gi.elements[8]*=d,gi.elements[9]*=d,gi.elements[10]*=d,e.setFromRotationMatrix(gi),n.x=r,n.y=s,n.z=o,this}makePerspective(t,e,n,a,r,s,o=Ji){const l=this.elements,c=2*r/(e-t),h=2*r/(n-a),d=(e+t)/(e-t),u=(n+a)/(n-a);let p,g;if(o===Ji)p=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(o===gs)p=-s/(s-r),g=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,a,r,s,o=Ji){const l=this.elements,c=1/(e-t),h=1/(n-a),d=1/(s-r),u=(e+t)*c,p=(n+a)*h;let g,x;if(o===Ji)g=(s+r)*d,x=-2*d;else if(o===gs)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let a=0;a<16;a++)if(e[a]!==n[a])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ea=new R,gi=new ee,Uf=new R(0,0,0),If=new R(1,1,1),cn=new R,Dr=new R,ii=new R,Wc=new ee,jc=new ka;class ze{constructor(t=0,e=0,n=0,a=ze.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,a=this._order){return this._x=t,this._y=e,this._z=n,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const a=t.elements,r=a[0],s=a[4],o=a[8],l=a[1],c=a[5],h=a[9],d=a[2],u=a[6],p=a[10];switch(e){case"XYZ":this._y=Math.asin(Re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Re(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Re(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Re(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Wc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Wc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jc.setFromEuler(this),this.setFromQuaternion(jc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ze.DEFAULT_ORDER="XYZ";class jl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let zf=0;const Xc=new R,ia=new ka,Fi=new ee,Ur=new R,ja=new R,Nf=new R,kf=new ka,qc=new R(1,0,0),Yc=new R(0,1,0),$c=new R(0,0,1),Zc={type:"added"},Ff={type:"removed"},na={type:"childadded",child:null},Zs={type:"childremoved",child:null};class Me extends jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Me.DEFAULT_UP.clone();const t=new R,e=new ze,n=new ka,a=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function s(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new ee},normalMatrix:{value:new jt}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=Me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ia.setFromAxisAngle(t,e),this.quaternion.multiply(ia),this}rotateOnWorldAxis(t,e){return ia.setFromAxisAngle(t,e),this.quaternion.premultiply(ia),this}rotateX(t){return this.rotateOnAxis(qc,t)}rotateY(t){return this.rotateOnAxis(Yc,t)}rotateZ(t){return this.rotateOnAxis($c,t)}translateOnAxis(t,e){return Xc.copy(t).applyQuaternion(this.quaternion),this.position.add(Xc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(qc,t)}translateY(t){return this.translateOnAxis(Yc,t)}translateZ(t){return this.translateOnAxis($c,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ur.copy(t):Ur.set(t,e,n);const a=this.parent;this.updateWorldMatrix(!0,!1),ja.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt(ja,Ur,this.up):Fi.lookAt(Ur,ja,this.up),this.quaternion.setFromRotationMatrix(Fi),a&&(Fi.extractRotation(a.matrixWorld),ia.setFromRotationMatrix(Fi),this.quaternion.premultiply(ia.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zc),na.child=t,this.dispatchEvent(na),na.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ff),Zs.child=t,this.dispatchEvent(Zs),Zs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zc),na.child=t,this.dispatchEvent(na),na.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,a=this.children.length;n<a;n++){const s=this.children[n].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ja,t,Nf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ja,kf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,a=e.length;n<a;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,a=e.length;n<a;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,a=e.length;n<a;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));a.material=o}else a.material=r(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(r(t.animations,l))}}if(e){const o=s(t.geometries),l=s(t.materials),c=s(t.textures),h=s(t.images),d=s(t.shapes),u=s(t.skeletons),p=s(t.animations),g=s(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=a,n;function s(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const a=t.children[n];this.add(a.clone())}return this}}Me.DEFAULT_UP=new R(0,1,0);Me.DEFAULT_MATRIX_AUTO_UPDATE=!0;Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vi=new R,Oi=new R,Js=new R,Bi=new R,aa=new R,ra=new R,Jc=new R,Ks=new R,Qs=new R,to=new R,eo=new le,io=new le,no=new le;class hi{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,a){a.subVectors(n,e),vi.subVectors(t,e),a.cross(vi);const r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(t,e,n,a,r){vi.subVectors(a,e),Oi.subVectors(n,e),Js.subVectors(t,e);const s=vi.dot(vi),o=vi.dot(Oi),l=vi.dot(Js),c=Oi.dot(Oi),h=Oi.dot(Js),d=s*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(c*l-o*h)*u,g=(s*h-o*l)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,a){return this.getBarycoord(t,e,n,a,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(t,e,n,a,r,s,o,l){return this.getBarycoord(t,e,n,a,Bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bi.x),l.addScaledVector(s,Bi.y),l.addScaledVector(o,Bi.z),l)}static getInterpolatedAttribute(t,e,n,a,r,s){return eo.setScalar(0),io.setScalar(0),no.setScalar(0),eo.fromBufferAttribute(t,e),io.fromBufferAttribute(t,n),no.fromBufferAttribute(t,a),s.setScalar(0),s.addScaledVector(eo,r.x),s.addScaledVector(io,r.y),s.addScaledVector(no,r.z),s}static isFrontFacing(t,e,n,a){return vi.subVectors(n,e),Oi.subVectors(t,e),vi.cross(Oi).dot(a)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,a){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,e,n,a){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vi.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),vi.cross(Oi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,a,r){return hi.getInterpolation(t,this.a,this.b,this.c,e,n,a,r)}containsPoint(t){return hi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,a=this.b,r=this.c;let s,o;aa.subVectors(a,n),ra.subVectors(r,n),Ks.subVectors(t,n);const l=aa.dot(Ks),c=ra.dot(Ks);if(l<=0&&c<=0)return e.copy(n);Qs.subVectors(t,a);const h=aa.dot(Qs),d=ra.dot(Qs);if(h>=0&&d<=h)return e.copy(a);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return s=l/(l-h),e.copy(n).addScaledVector(aa,s);to.subVectors(t,r);const p=aa.dot(to),g=ra.dot(to);if(g>=0&&p<=g)return e.copy(r);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(ra,o);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Jc.subVectors(r,a),o=(d-h)/(d-h+(p-g)),e.copy(a).addScaledVector(Jc,o);const f=1/(m+x+u);return s=x*f,o=u*f,e.copy(n).addScaledVector(aa,s).addScaledVector(ra,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _d={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hn={h:0,s:0,l:0},Ir={h:0,s:0,l:0};function ao(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class It{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,a=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.toWorkingColorSpace(this,a),this}setHSL(t,e,n,a=Kt.workingColorSpace){if(t=Gl(t,1),e=Re(e,0,1),n=Re(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,s=2*n-r;this.r=ao(s,r,t+1/3),this.g=ao(s,r,t),this.b=ao(s,r,t-1/3)}return Kt.toWorkingColorSpace(this,a),this}setStyle(t,e=ve){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=a[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ve){const n=_d[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qi(t.r),this.g=Qi(t.g),this.b=Qi(t.b),this}copyLinearToSRGB(t){return this.r=Ma(t.r),this.g=Ma(t.g),this.b=Ma(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ve){return Kt.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Re(Fe.r*255,0,255))*65536+Math.round(Re(Fe.g*255,0,255))*256+Math.round(Re(Fe.b*255,0,255))}getHexString(t=ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Fe.copy(this),e);const n=Fe.r,a=Fe.g,r=Fe.b,s=Math.max(n,a,r),o=Math.min(n,a,r);let l,c;const h=(o+s)/2;if(o===s)l=0,c=0;else{const d=s-o;switch(c=h<=.5?d/(s+o):d/(2-s-o),s){case n:l=(a-r)/d+(a<r?6:0);break;case a:l=(r-n)/d+2;break;case r:l=(n-a)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=ve){Kt.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,a=Fe.b;return t!==ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(a*255)})`}offsetHSL(t,e,n){return this.getHSL(hn),this.setHSL(hn.h+t,hn.s+e,hn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(hn),t.getHSL(Ir);const n=sr(hn.h,Ir.h,e),a=sr(hn.s,Ir.s,e),r=sr(hn.l,Ir.l,e);return this.setHSL(n,a,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,a=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*a,this.g=r[1]*e+r[4]*n+r[7]*a,this.b=r[2]*e+r[5]*n+r[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new It;It.NAMES=_d;let Of=0;class Mn extends jn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=Ki(),this.name="",this.blending=ba,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zo,this.blendDst=No,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Aa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ic,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zn,this.stencilZFail=Zn,this.stencilZPass=Zn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const a=this[e];if(a===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(n):a&&a.isVector3&&n&&n.isVector3?a.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ba&&(n.blending=this.blending),this.side!==bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zo&&(n.blendSrc=this.blendSrc),this.blendDst!==No&&(n.blendDst=this.blendDst),this.blendEquation!==wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Aa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ic&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function a(r){const s=[];for(const o in r){const l=r[o];delete l.metadata,s.push(l)}return s}if(e){const r=a(t.textures),s=a(t.images);r.length>0&&(n.textures=r),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const a=e.length;n=new Array(a);for(let r=0;r!==a;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Yt extends Mn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ze,this.combine=Nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const be=new R,zr=new ot;class Ke{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=bl,this.updateRanges=[],this.gpuType=Zi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[t+a]=e.array[n+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zr.fromBufferAttribute(this,e),zr.applyMatrix3(t),this.setXY(e,zr.x,zr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=_i(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_i(e,this.array)),e}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_i(e,this.array)),e}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_i(e,this.array)),e}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_i(e,this.array)),e}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,a){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),a=se(a,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=a,this}setXYZW(t,e,n,a,r){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),a=se(a,this.array),r=se(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=a,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==bl&&(t.usage=this.usage),t}}class bd extends Ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class yd extends Ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ce extends Ke{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Bf=0;const oi=new ee,ro=new Me,sa=new R,ni=new gr,Xa=new gr,Ae=new R;class We extends jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=Ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(gd(t)?yd:bd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return oi.makeRotationFromQuaternion(t),this.applyMatrix4(oi),this}rotateX(t){return oi.makeRotationX(t),this.applyMatrix4(oi),this}rotateY(t){return oi.makeRotationY(t),this.applyMatrix4(oi),this}rotateZ(t){return oi.makeRotationZ(t),this.applyMatrix4(oi),this}translate(t,e,n){return oi.makeTranslation(t,e,n),this.applyMatrix4(oi),this}scale(t,e,n){return oi.makeScale(t,e,n),this.applyMatrix4(oi),this}lookAt(t){return ro.lookAt(t),ro.updateMatrix(),this.applyMatrix4(ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(sa).negate(),this.translate(sa.x,sa.y,sa.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let a=0,r=t.length;a<r;a++){const s=t[a];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new ce(n,3))}else{for(let n=0,a=e.count;n<a;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,a=e.length;n<a;n++){const r=e[n];ni.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(ni.setFromBufferAttribute(t),e)for(let r=0,s=e.length;r<s;r++){const o=e[r];Xa.setFromBufferAttribute(o),this.morphTargetsRelative?(Ae.addVectors(ni.min,Xa.min),ni.expandByPoint(Ae),Ae.addVectors(ni.max,Xa.max),ni.expandByPoint(Ae)):(ni.expandByPoint(Xa.min),ni.expandByPoint(Xa.max))}ni.getCenter(n);let a=0;for(let r=0,s=t.count;r<s;r++)Ae.fromBufferAttribute(t,r),a=Math.max(a,n.distanceToSquared(Ae));if(e)for(let r=0,s=e.length;r<s;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ae.fromBufferAttribute(o,c),l&&(sa.fromBufferAttribute(t,c),Ae.add(sa)),a=Math.max(a,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,a=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<n.count;D++)o[D]=new R,l[D]=new R;const c=new R,h=new R,d=new R,u=new ot,p=new ot,g=new ot,x=new R,m=new R;function f(D,_,w){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,_),d.fromBufferAttribute(n,w),u.fromBufferAttribute(r,D),p.fromBufferAttribute(r,_),g.fromBufferAttribute(r,w),h.sub(c),d.sub(c),p.sub(u),g.sub(u);const T=1/(p.x*g.y-g.x*p.y);isFinite(T)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(T),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(T),o[D].add(x),o[_].add(x),o[w].add(x),l[D].add(m),l[_].add(m),l[w].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let D=0,_=S.length;D<_;++D){const w=S[D],T=w.start,U=w.count;for(let B=T,N=T+U;B<N;B+=3)f(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const y=new R,v=new R,P=new R,E=new R;function A(D){P.fromBufferAttribute(a,D),E.copy(P);const _=o[D];y.copy(_),y.sub(P.multiplyScalar(P.dot(_))).normalize(),v.crossVectors(E,_);const T=v.dot(l[D])<0?-1:1;s.setXYZW(D,y.x,y.y,y.z,T)}for(let D=0,_=S.length;D<_;++D){const w=S[D],T=w.start,U=w.count;for(let B=T,N=T+U;B<N;B+=3)A(t.getX(B+0)),A(t.getX(B+1)),A(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const a=new R,r=new R,s=new R,o=new R,l=new R,c=new R,h=new R,d=new R;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);a.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),s.fromBufferAttribute(e,m),h.subVectors(s,r),d.subVectors(a,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)a.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),s.fromBufferAttribute(e,u+2),h.subVectors(s,r),d.subVectors(a,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new Ke(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new We,n=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=t(u,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const a={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(a[l]=h,r=!0)}r&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const a=t.attributes;for(const c in a){const h=a[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const s=t.groups;for(let c=0,h=s.length;c<h;c++){const d=s[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kc=new ee,An=new wd,Nr=new Wl,Qc=new R,kr=new R,Fr=new R,Or=new R,so=new R,Br=new R,th=new R,Hr=new R;class Tt extends Me{constructor(t=new We,e=new Yt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const a=e[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,a=n.attributes.position,r=n.morphAttributes.position,s=n.morphTargetsRelative;e.fromBufferAttribute(a,t);const o=this.morphTargetInfluences;if(r&&o){Br.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(so.fromBufferAttribute(d,t),s?Br.addScaledVector(so,h):Br.addScaledVector(so.sub(e),h))}e.add(Br)}return e}raycast(t,e){const n=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(r),An.copy(t.ray).recast(t.near),!(Nr.containsPoint(An.origin)===!1&&(An.intersectSphere(Nr,Qc)===null||An.origin.distanceToSquared(Qc)>(t.far-t.near)**2))&&(Kc.copy(r).invert(),An.copy(t.ray).applyMatrix4(Kc),!(n.boundingBox!==null&&An.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,An)))}_computeIntersections(t,e,n){let a;const r=this.geometry,s=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,x=u.length;g<x;g++){const m=u[g],f=s[m.materialIndex],S=Math.max(m.start,p.start),y=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,P=y;v<P;v+=3){const E=o.getX(v),A=o.getX(v+1),D=o.getX(v+2);a=Vr(this,f,t,n,c,h,d,E,A,D),a&&(a.faceIndex=Math.floor(v/3),a.face.materialIndex=m.materialIndex,e.push(a))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const S=o.getX(m),y=o.getX(m+1),v=o.getX(m+2);a=Vr(this,s,t,n,c,h,d,S,y,v),a&&(a.faceIndex=Math.floor(m/3),e.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,x=u.length;g<x;g++){const m=u[g],f=s[m.materialIndex],S=Math.max(m.start,p.start),y=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=S,P=y;v<P;v+=3){const E=v,A=v+1,D=v+2;a=Vr(this,f,t,n,c,h,d,E,A,D),a&&(a.faceIndex=Math.floor(v/3),a.face.materialIndex=m.materialIndex,e.push(a))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const S=m,y=m+1,v=m+2;a=Vr(this,s,t,n,c,h,d,S,y,v),a&&(a.faceIndex=Math.floor(m/3),e.push(a))}}}}function Hf(i,t,e,n,a,r,s,o){let l;if(t.side===Ve?l=n.intersectTriangle(s,r,a,!0,o):l=n.intersectTriangle(a,r,s,t.side===bn,o),l===null)return null;Hr.copy(o),Hr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Hr);return c<e.near||c>e.far?null:{distance:c,point:Hr.clone(),object:i}}function Vr(i,t,e,n,a,r,s,o,l,c){i.getVertexPosition(o,kr),i.getVertexPosition(l,Fr),i.getVertexPosition(c,Or);const h=Hf(i,t,e,n,kr,Fr,Or,th);if(h){const d=new R;hi.getBarycoord(th,kr,Fr,Or,d),a&&(h.uv=hi.getInterpolatedAttribute(a,o,l,c,d,new ot)),r&&(h.uv1=hi.getInterpolatedAttribute(r,o,l,c,d,new ot)),s&&(h.normal=hi.getInterpolatedAttribute(s,o,l,c,d,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new R,materialIndex:0};hi.getNormal(kr,Fr,Or,u.normal),h.face=u,h.barycoord=d}return h}class Ze extends We{constructor(t=1,e=1,n=1,a=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:a,heightSegments:r,depthSegments:s};const o=this;a=Math.floor(a),r=Math.floor(r),s=Math.floor(s);const l=[],c=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,e,t,s,r,0),g("z","y","x",1,-1,n,e,-t,s,r,1),g("x","z","y",1,1,t,n,e,a,s,2),g("x","z","y",1,-1,t,n,-e,a,s,3),g("x","y","z",1,-1,t,e,n,a,r,4),g("x","y","z",-1,-1,t,e,-n,a,r,5),this.setIndex(l),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(d,2));function g(x,m,f,S,y,v,P,E,A,D,_){const w=v/A,T=P/D,U=v/2,B=P/2,N=E/2,j=A+1,z=D+1;let Z=0,V=0;const Y=new R;for(let at=0;at<z;at++){const st=at*T-B;for(let ut=0;ut<j;ut++){const Ot=ut*w-U;Y[x]=Ot*S,Y[m]=st*y,Y[f]=N,c.push(Y.x,Y.y,Y.z),Y[x]=0,Y[m]=0,Y[f]=E>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(ut/A),d.push(1-at/D),Z+=1}}for(let at=0;at<D;at++)for(let st=0;st<A;st++){const ut=u+st+j*at,Ot=u+st+j*(at+1),J=u+(st+1)+j*(at+1),it=u+(st+1)+j*at;l.push(ut,Ot,it),l.push(Ot,J,it),V+=6}o.addGroup(p,V,_),p+=V,u+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ze(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function La(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const a=i[e][n];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=a.clone():Array.isArray(a)?t[e][n]=a.slice():t[e][n]=a}}return t}function Xe(i){const t={};for(let e=0;e<i.length;e++){const n=La(i[e]);for(const a in n)t[a]=n[a]}return t}function Vf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Md(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const ji={clone:La,merge:Xe};var Gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ue extends Mn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gf,this.fragmentShader=Wf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=La(t.uniforms),this.uniformsGroups=Vf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const a in this.uniforms){const s=this.uniforms[a].value;s&&s.isTexture?e.uniforms[a]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[a]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[a]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[a]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[a]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[a]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[a]={type:"m4",value:s.toArray()}:e.uniforms[a]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const a in this.extensions)this.extensions[a]===!0&&(n[a]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Sd extends Me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=Ji}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const dn=new R,eh=new ot,ih=new ot;class Oe extends Sd{constructor(t=50,e=1,n=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=a,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Pa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(rr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Pa*2*Math.atan(Math.tan(rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(dn.x,dn.y).multiplyScalar(-t/dn.z),dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(dn.x,dn.y).multiplyScalar(-t/dn.z)}getViewSize(t,e){return this.getViewBounds(t,eh,ih),e.subVectors(ih,eh)}setViewOffset(t,e,n,a,r,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(rr*.5*this.fov)/this.zoom,n=2*e,a=this.aspect*n,r=-.5*a;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;r+=s.offsetX*a/l,e-=s.offsetY*n/c,a*=s.width/l,n*=s.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const oa=-90,la=1;class jf extends Me{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Oe(oa,la,t,e);a.layers=this.layers,this.add(a);const r=new Oe(oa,la,t,e);r.layers=this.layers,this.add(r);const s=new Oe(oa,la,t,e);s.layers=this.layers,this.add(s);const o=new Oe(oa,la,t,e);o.layers=this.layers,this.add(o);const l=new Oe(oa,la,t,e);l.layers=this.layers,this.add(l);const c=new Oe(oa,la,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,a,r,s,o,l]=e;for(const c of e)this.remove(c);if(t===Ji)n.up.set(0,1,0),n.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===gs)n.up.set(0,-1,0),n.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,s,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,a),t.render(e,r),t.setRenderTarget(n,1,a),t.render(e,s),t.setRenderTarget(n,2,a),t.render(e,o),t.setRenderTarget(n,3,a),t.render(e,l),t.setRenderTarget(n,4,a),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,a),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ed extends Pe{constructor(t,e,n,a,r,s,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ca,super(t,e,n,a,r,s,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Xf extends qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},a=[n,n,n,n,n,n];this.texture=new Ed(a,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:$e}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Ze(5,5,5),r=new ue({name:"CubemapFromEquirect",uniforms:La(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:De});r.uniforms.tEquirect.value=e;const s=new Tt(a,r),o=e.minFilter;return e.minFilter===$i&&(e.minFilter=$e),new jf(1,10,this).update(t,s),e.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(t,e,n,a){const r=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(e,n,a);t.setRenderTarget(r)}}const oo=new R,qf=new R,Yf=new jt;class Un{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,a){return this.normal.set(t,e,n),this.constant=a,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const a=oo.subVectors(n,e).cross(qf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(oo),a=this.normal.dot(n);if(a===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Yf.getNormalMatrix(t),a=this.coplanarPoint(oo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-a.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cn=new Wl,Gr=new R;class Xl{constructor(t=new Un,e=new Un,n=new Un,a=new Un,r=new Un,s=new Un){this.planes=[t,e,n,a,r,s]}set(t,e,n,a,r,s){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(a),o[4].copy(r),o[5].copy(s),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ji){const n=this.planes,a=t.elements,r=a[0],s=a[1],o=a[2],l=a[3],c=a[4],h=a[5],d=a[6],u=a[7],p=a[8],g=a[9],x=a[10],m=a[11],f=a[12],S=a[13],y=a[14],v=a[15];if(n[0].setComponents(l-r,u-c,m-p,v-f).normalize(),n[1].setComponents(l+r,u+c,m+p,v+f).normalize(),n[2].setComponents(l+s,u+h,m+g,v+S).normalize(),n[3].setComponents(l-s,u-h,m-g,v-S).normalize(),n[4].setComponents(l-o,u-d,m-x,v-y).normalize(),e===Ji)n[5].setComponents(l+o,u+d,m+x,v+y).normalize();else if(e===gs)n[5].setComponents(o,d,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Cn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Cn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Cn)}intersectsSprite(t){return Cn.center.set(0,0,0),Cn.radius=.7071067811865476,Cn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Cn)}intersectsSphere(t){const e=this.planes,n=t.center,a=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<a)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const a=e[n];if(Gr.x=a.normal.x>0?t.max.x:t.min.x,Gr.y=a.normal.y>0?t.max.y:t.min.y,Gr.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(Gr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Td(){let i=null,t=!1,e=null,n=null;function a(r,s){e(r,s),n=i.requestAnimationFrame(a)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(a),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function $f(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const x=d[p];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:a,remove:r,update:s}}class he extends We{constructor(t=1,e=1,n=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:a};const r=t/2,s=e/2,o=Math.floor(n),l=Math.floor(a),c=o+1,h=l+1,d=t/o,u=e/l,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){const S=f*u-s;for(let y=0;y<c;y++){const v=y*d-r;g.push(v,-S,0),x.push(0,0,1),m.push(y/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){const y=S+c*f,v=S+c*(f+1),P=S+1+c*(f+1),E=S+1+c*f;p.push(y,v,E),p.push(v,P,E)}this.setIndex(p),this.setAttribute("position",new ce(g,3)),this.setAttribute("normal",new ce(x,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new he(t.width,t.height,t.widthSegments,t.heightSegments)}}var Zf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jf=`#ifdef USE_ALPHAHASH
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
#endif`,Kf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ep=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ip=`#ifdef USE_AOMAP
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
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ap=`#ifdef USE_BATCHING
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
#endif`,rp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,op=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cp=`#ifdef USE_IRIDESCENCE
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
#endif`,hp=`#ifdef USE_BUMPMAP
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
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,wp=`#define PI 3.141592653589793
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
} // validated`,_p=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bp=`vec3 transformedNormal = objectNormal;
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
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ap=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pp=`#ifdef USE_ENVMAP
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
#endif`,Lp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dp=`#ifdef USE_ENVMAP
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
#endif`,Up=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kp=`#ifdef USE_GRADIENTMAP
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
}`,Fp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Op=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hp=`uniform bool receiveShadow;
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
#endif`,Vp=`#ifdef USE_ENVMAP
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
#endif`,Gp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
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
#endif`,Yp=`struct PhysicalMaterial {
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
}`,$p=`
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
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Jp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,t0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,i0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,n0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,a0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,r0=`#if defined( USE_POINTS_UV )
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
#endif`,s0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,o0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,l0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,c0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,h0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,d0=`#ifdef USE_MORPHTARGETS
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
#endif`,u0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,f0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,p0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,m0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,v0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,x0=`#ifdef USE_NORMALMAP
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
#endif`,w0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,b0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,y0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,M0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,S0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,E0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,T0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,A0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,C0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,R0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,P0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,L0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,D0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,U0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,I0=`float getShadowMask() {
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
}`,z0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,N0=`#ifdef USE_SKINNING
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
#endif`,k0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,F0=`#ifdef USE_SKINNING
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
#endif`,O0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,B0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,H0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,V0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,G0=`#ifdef USE_TRANSMISSION
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
#endif`,W0=`#ifdef USE_TRANSMISSION
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
#endif`,j0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,X0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Y0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Z0=`uniform sampler2D t2D;
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
}`,J0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,em=`#include <common>
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
}`,im=`#if DEPTH_PACKING == 3200
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
}`,nm=`#define DISTANCE
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
}`,am=`#define DISTANCE
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
}`,rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`uniform float scale;
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
}`,lm=`uniform vec3 diffuse;
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
}`,cm=`#include <common>
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
}`,hm=`uniform vec3 diffuse;
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
}`,dm=`#define LAMBERT
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
}`,um=`#define LAMBERT
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
}`,fm=`#define MATCAP
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
}`,pm=`#define MATCAP
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
}`,mm=`#define NORMAL
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
}`,gm=`#define NORMAL
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
}`,vm=`#define PHONG
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
}`,xm=`#define PHONG
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
}`,wm=`#define STANDARD
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
}`,_m=`#define STANDARD
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
}`,bm=`#define TOON
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
}`,ym=`#define TOON
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
}`,Mm=`uniform float size;
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
}`,Sm=`uniform vec3 diffuse;
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
}`,Em=`#include <common>
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
}`,Tm=`uniform vec3 color;
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
}`,Am=`uniform float rotation;
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
}`,Cm=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:Zf,alphahash_pars_fragment:Jf,alphamap_fragment:Kf,alphamap_pars_fragment:Qf,alphatest_fragment:tp,alphatest_pars_fragment:ep,aomap_fragment:ip,aomap_pars_fragment:np,batching_pars_vertex:ap,batching_vertex:rp,begin_vertex:sp,beginnormal_vertex:op,bsdfs:lp,iridescence_fragment:cp,bumpmap_pars_fragment:hp,clipping_planes_fragment:dp,clipping_planes_pars_fragment:up,clipping_planes_pars_vertex:fp,clipping_planes_vertex:pp,color_fragment:mp,color_pars_fragment:gp,color_pars_vertex:vp,color_vertex:xp,common:wp,cube_uv_reflection_fragment:_p,defaultnormal_vertex:bp,displacementmap_pars_vertex:yp,displacementmap_vertex:Mp,emissivemap_fragment:Sp,emissivemap_pars_fragment:Ep,colorspace_fragment:Tp,colorspace_pars_fragment:Ap,envmap_fragment:Cp,envmap_common_pars_fragment:Rp,envmap_pars_fragment:Pp,envmap_pars_vertex:Lp,envmap_physical_pars_fragment:Vp,envmap_vertex:Dp,fog_vertex:Up,fog_pars_vertex:Ip,fog_fragment:zp,fog_pars_fragment:Np,gradientmap_pars_fragment:kp,lightmap_pars_fragment:Fp,lights_lambert_fragment:Op,lights_lambert_pars_fragment:Bp,lights_pars_begin:Hp,lights_toon_fragment:Gp,lights_toon_pars_fragment:Wp,lights_phong_fragment:jp,lights_phong_pars_fragment:Xp,lights_physical_fragment:qp,lights_physical_pars_fragment:Yp,lights_fragment_begin:$p,lights_fragment_maps:Zp,lights_fragment_end:Jp,logdepthbuf_fragment:Kp,logdepthbuf_pars_fragment:Qp,logdepthbuf_pars_vertex:t0,logdepthbuf_vertex:e0,map_fragment:i0,map_pars_fragment:n0,map_particle_fragment:a0,map_particle_pars_fragment:r0,metalnessmap_fragment:s0,metalnessmap_pars_fragment:o0,morphinstance_vertex:l0,morphcolor_vertex:c0,morphnormal_vertex:h0,morphtarget_pars_vertex:d0,morphtarget_vertex:u0,normal_fragment_begin:f0,normal_fragment_maps:p0,normal_pars_fragment:m0,normal_pars_vertex:g0,normal_vertex:v0,normalmap_pars_fragment:x0,clearcoat_normal_fragment_begin:w0,clearcoat_normal_fragment_maps:_0,clearcoat_pars_fragment:b0,iridescence_pars_fragment:y0,opaque_fragment:M0,packing:S0,premultiplied_alpha_fragment:E0,project_vertex:T0,dithering_fragment:A0,dithering_pars_fragment:C0,roughnessmap_fragment:R0,roughnessmap_pars_fragment:P0,shadowmap_pars_fragment:L0,shadowmap_pars_vertex:D0,shadowmap_vertex:U0,shadowmask_pars_fragment:I0,skinbase_vertex:z0,skinning_pars_vertex:N0,skinning_vertex:k0,skinnormal_vertex:F0,specularmap_fragment:O0,specularmap_pars_fragment:B0,tonemapping_fragment:H0,tonemapping_pars_fragment:V0,transmission_fragment:G0,transmission_pars_fragment:W0,uv_pars_fragment:j0,uv_pars_vertex:X0,uv_vertex:q0,worldpos_vertex:Y0,background_vert:$0,background_frag:Z0,backgroundCube_vert:J0,backgroundCube_frag:K0,cube_vert:Q0,cube_frag:tm,depth_vert:em,depth_frag:im,distanceRGBA_vert:nm,distanceRGBA_frag:am,equirect_vert:rm,equirect_frag:sm,linedashed_vert:om,linedashed_frag:lm,meshbasic_vert:cm,meshbasic_frag:hm,meshlambert_vert:dm,meshlambert_frag:um,meshmatcap_vert:fm,meshmatcap_frag:pm,meshnormal_vert:mm,meshnormal_frag:gm,meshphong_vert:vm,meshphong_frag:xm,meshphysical_vert:wm,meshphysical_frag:_m,meshtoon_vert:bm,meshtoon_frag:ym,points_vert:Mm,points_frag:Sm,shadow_vert:Em,shadow_frag:Tm,sprite_vert:Am,sprite_frag:Cm},pt={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},Si={basic:{uniforms:Xe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Xe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new It(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Xe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Xe([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Xe([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new It(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Xe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Xe([pt.points,pt.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Xe([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Xe([pt.common,pt.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Xe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Xe([pt.sprite,pt.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:Xe([pt.common,pt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:Xe([pt.lights,pt.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};Si.physical={uniforms:Xe([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const Wr={r:0,b:0,g:0},Rn=new ze,Rm=new ee;function Pm(i,t,e,n,a,r,s){const o=new It(0);let l=r===!0?0:1,c,h,d=null,u=0,p=null;function g(S){let y=S.isScene===!0?S.background:null;return y&&y.isTexture&&(y=(S.backgroundBlurriness>0?e:t).get(y)),y}function x(S){let y=!1;const v=g(S);v===null?f(o,l):v&&v.isColor&&(f(v,1),y=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,s):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,y){const v=g(y);v&&(v.isCubeTexture||v.mapping===ys)?(h===void 0&&(h=new Tt(new Ze(1,1,1),new ue({name:"BackgroundCubeMaterial",uniforms:La(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(h)),Rn.copy(y.backgroundRotation),Rn.x*=-1,Rn.y*=-1,Rn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Rn.y*=-1,Rn.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Rm.makeRotationFromEuler(Rn)),h.material.toneMapped=Kt.getTransfer(v.colorSpace)!==oe,(d!==v||u!==v.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,d=v,u=v.version,p=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Tt(new he(2,2),new ue({name:"BackgroundMaterial",uniforms:La(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(v.colorSpace)!==oe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,d=v,u=v.version,p=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function f(S,y){S.getRGB(Wr,Md(i)),n.buffers.color.setClear(Wr.r,Wr.g,Wr.b,y,s)}return{getClearColor:function(){return o},setClearColor:function(S,y=1){o.set(S),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,f(o,l)},render:x,addToRenderList:m}}function Lm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},a=u(null);let r=a,s=!1;function o(w,T,U,B,N){let j=!1;const z=d(B,U,T);r!==z&&(r=z,c(r.object)),j=p(w,B,U,N),j&&g(w,B,U,N),N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(j||s)&&(s=!1,v(w,T,U,B),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function l(){return i.createVertexArray()}function c(w){return i.bindVertexArray(w)}function h(w){return i.deleteVertexArray(w)}function d(w,T,U){const B=U.wireframe===!0;let N=n[w.id];N===void 0&&(N={},n[w.id]=N);let j=N[T.id];j===void 0&&(j={},N[T.id]=j);let z=j[B];return z===void 0&&(z=u(l()),j[B]=z),z}function u(w){const T=[],U=[],B=[];for(let N=0;N<e;N++)T[N]=0,U[N]=0,B[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:U,attributeDivisors:B,object:w,attributes:{},index:null}}function p(w,T,U,B){const N=r.attributes,j=T.attributes;let z=0;const Z=U.getAttributes();for(const V in Z)if(Z[V].location>=0){const at=N[V];let st=j[V];if(st===void 0&&(V==="instanceMatrix"&&w.instanceMatrix&&(st=w.instanceMatrix),V==="instanceColor"&&w.instanceColor&&(st=w.instanceColor)),at===void 0||at.attribute!==st||st&&at.data!==st.data)return!0;z++}return r.attributesNum!==z||r.index!==B}function g(w,T,U,B){const N={},j=T.attributes;let z=0;const Z=U.getAttributes();for(const V in Z)if(Z[V].location>=0){let at=j[V];at===void 0&&(V==="instanceMatrix"&&w.instanceMatrix&&(at=w.instanceMatrix),V==="instanceColor"&&w.instanceColor&&(at=w.instanceColor));const st={};st.attribute=at,at&&at.data&&(st.data=at.data),N[V]=st,z++}r.attributes=N,r.attributesNum=z,r.index=B}function x(){const w=r.newAttributes;for(let T=0,U=w.length;T<U;T++)w[T]=0}function m(w){f(w,0)}function f(w,T){const U=r.newAttributes,B=r.enabledAttributes,N=r.attributeDivisors;U[w]=1,B[w]===0&&(i.enableVertexAttribArray(w),B[w]=1),N[w]!==T&&(i.vertexAttribDivisor(w,T),N[w]=T)}function S(){const w=r.newAttributes,T=r.enabledAttributes;for(let U=0,B=T.length;U<B;U++)T[U]!==w[U]&&(i.disableVertexAttribArray(U),T[U]=0)}function y(w,T,U,B,N,j,z){z===!0?i.vertexAttribIPointer(w,T,U,N,j):i.vertexAttribPointer(w,T,U,B,N,j)}function v(w,T,U,B){x();const N=B.attributes,j=U.getAttributes(),z=T.defaultAttributeValues;for(const Z in j){const V=j[Z];if(V.location>=0){let Y=N[Z];if(Y===void 0&&(Z==="instanceMatrix"&&w.instanceMatrix&&(Y=w.instanceMatrix),Z==="instanceColor"&&w.instanceColor&&(Y=w.instanceColor)),Y!==void 0){const at=Y.normalized,st=Y.itemSize,ut=t.get(Y);if(ut===void 0)continue;const Ot=ut.buffer,J=ut.type,it=ut.bytesPerElement,mt=J===i.INT||J===i.UNSIGNED_INT||Y.gpuType===kl;if(Y.isInterleavedBufferAttribute){const ct=Y.data,Rt=ct.stride,Pt=Y.offset;if(ct.isInstancedInterleavedBuffer){for(let k=0;k<V.locationSize;k++)f(V.location+k,ct.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let k=0;k<V.locationSize;k++)m(V.location+k);i.bindBuffer(i.ARRAY_BUFFER,Ot);for(let k=0;k<V.locationSize;k++)y(V.location+k,st/V.locationSize,J,at,Rt*it,(Pt+st/V.locationSize*k)*it,mt)}else{if(Y.isInstancedBufferAttribute){for(let ct=0;ct<V.locationSize;ct++)f(V.location+ct,Y.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ct=0;ct<V.locationSize;ct++)m(V.location+ct);i.bindBuffer(i.ARRAY_BUFFER,Ot);for(let ct=0;ct<V.locationSize;ct++)y(V.location+ct,st/V.locationSize,J,at,st*it,st/V.locationSize*ct*it,mt)}}else if(z!==void 0){const at=z[Z];if(at!==void 0)switch(at.length){case 2:i.vertexAttrib2fv(V.location,at);break;case 3:i.vertexAttrib3fv(V.location,at);break;case 4:i.vertexAttrib4fv(V.location,at);break;default:i.vertexAttrib1fv(V.location,at)}}}}S()}function P(){D();for(const w in n){const T=n[w];for(const U in T){const B=T[U];for(const N in B)h(B[N].object),delete B[N];delete T[U]}delete n[w]}}function E(w){if(n[w.id]===void 0)return;const T=n[w.id];for(const U in T){const B=T[U];for(const N in B)h(B[N].object),delete B[N];delete T[U]}delete n[w.id]}function A(w){for(const T in n){const U=n[T];if(U[w.id]===void 0)continue;const B=U[w.id];for(const N in B)h(B[N].object),delete B[N];delete U[w.id]}}function D(){_(),s=!0,r!==a&&(r=a,c(r.object))}function _(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:D,resetDefaultState:_,dispose:P,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function Dm(i,t,e){let n;function a(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function s(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];e.update(p,n,1)}function l(c,h,d,u){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)s(c[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*u[x];e.update(g,n,1)}}this.setMode=a,this.render=r,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Um(i,t,e,n){let a;function r(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");a=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(A){return!(A!==ui&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const D=A===ri&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Li&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Zi&&!D)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:P,maxSamples:E}}function Im(i){const t=this;let e=null,n=0,a=!1,r=!1;const s=new Un,o=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||a;return a=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!a||g===null||g.length===0||r&&!m)r?h(null):c();else{const S=r?0:n,y=S*4;let v=f.clippingState||null;l.value=v,v=h(g,u,y,p);for(let P=0;P!==y;++P)v[P]=e[P];f.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,p,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const f=p+x*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,v=p;y!==x;++y,v+=4)s.copy(d[y]).applyMatrix4(S,o),s.normal.toArray(m,v),m[v+3]=s.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function zm(i){let t=new WeakMap;function e(s,o){return o===Xo?s.mapping=Ca:o===qo&&(s.mapping=Ra),s}function n(s){if(s&&s.isTexture){const o=s.mapping;if(o===Xo||o===qo)if(t.has(s)){const l=t.get(s).texture;return e(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Xf(l.height);return c.fromEquirectangularTexture(i,s),t.set(s,c),s.addEventListener("dispose",a),e(c.texture,s.mapping)}else return null}}return s}function a(s){const o=s.target;o.removeEventListener("dispose",a);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Es extends Sd{constructor(t=-1,e=1,n=1,a=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=a,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,a,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let r=n-t,s=n+t,o=a+e,l=a-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const xa=4,nh=[.125,.215,.35,.446,.526,.582],zn=20,lo=new Es,ah=new It;let co=null,ho=0,uo=0,fo=!1;const In=(1+Math.sqrt(5))/2,ca=1/In,rh=[new R(-In,ca,0),new R(In,ca,0),new R(-ca,0,In),new R(ca,0,In),new R(0,In,-ca),new R(0,In,ca),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class yl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,a=100){co=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),uo=this._renderer.getActiveMipmapLevel(),fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,a,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=oh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(co,ho,uo),this._renderer.xr.enabled=fo,t.scissorTest=!1,jr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ca||t.mapping===Ra?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),co=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),uo=this._renderer.getActiveMipmapLevel(),fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:ri,format:ui,colorSpace:Na,depthBuffer:!1},a=sh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Nm(r)),this._blurMaterial=km(r,t,e)}return a}_compileMaterial(t){const e=new Tt(this._lodPlanes[0],t);this._renderer.compile(e,lo)}_sceneToCubeUV(t,e,n,a){const o=new Oe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(ah),h.toneMapping=Ri,h.autoClear=!1;const p=new Yt({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),g=new Tt(new Ze,p);let x=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,x=!0):(p.color.copy(ah),x=!0);for(let f=0;f<6;f++){const S=f%3;S===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):S===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const y=this._cubeSize;jr(a,S*y,f>2?y:0,y,y),h.setRenderTarget(a),x&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,a=t.mapping===Ca||t.mapping===Ra;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=lh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=oh());const r=a?this._cubemapMaterial:this._equirectMaterial,s=new Tt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;jr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(s,lo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=rh[(a-r-1)%rh.length];this._blur(t,r-1,r,s,o)}e.autoClear=n}_blur(t,e,n,a,r){const s=this._pingPongRenderTarget;this._halfBlur(t,s,e,n,a,"latitudinal",r),this._halfBlur(s,t,n,n,a,"longitudinal",r)}_halfBlur(t,e,n,a,r,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Tt(this._lodPlanes[a],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*zn-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):zn;m>zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zn}`);const f=[];let S=0;for(let A=0;A<zn;++A){const D=A/x,_=Math.exp(-D*D/2);f.push(_),A===0?S+=_:A<m&&(S+=2*_)}for(let A=0;A<f.length;A++)f[A]=f[A]/S;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=s==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:y}=this;u.dTheta.value=g,u.mipInt.value=y-n;const v=this._sizeLods[a],P=3*v*(a>y-xa?a-y+xa:0),E=4*(this._cubeSize-v);jr(e,P,E,3*v,2*v),l.setRenderTarget(e),l.render(d,lo)}}function Nm(i){const t=[],e=[],n=[];let a=i;const r=i-xa+1+nh.length;for(let s=0;s<r;s++){const o=Math.pow(2,a);e.push(o);let l=1/o;s>i-xa?l=nh[s-i+xa-1]:s===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,x=3,m=2,f=1,S=new Float32Array(x*g*p),y=new Float32Array(m*g*p),v=new Float32Array(f*g*p);for(let E=0;E<p;E++){const A=E%3*2/3-1,D=E>2?0:-1,_=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];S.set(_,x*g*E),y.set(u,m*g*E);const w=[E,E,E,E,E,E];v.set(w,f*g*E)}const P=new We;P.setAttribute("position",new Ke(S,x)),P.setAttribute("uv",new Ke(y,m)),P.setAttribute("faceIndex",new Ke(v,f)),t.push(P),a>xa&&a--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function sh(i,t,e){const n=new qe(i,t,e);return n.texture.mapping=ys,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function jr(i,t,e,n,a){i.viewport.set(t,e,n,a),i.scissor.set(t,e,n,a)}function km(i,t,e){const n=new Float32Array(zn),a=new R(0,1,0);return new ue({name:"SphericalGaussianBlur",defines:{n:zn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:ql(),fragmentShader:`

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
		`,blending:De,depthTest:!1,depthWrite:!1})}function oh(){return new ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ql(),fragmentShader:`

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
		`,blending:De,depthTest:!1,depthWrite:!1})}function lh(){return new ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:De,depthTest:!1,depthWrite:!1})}function ql(){return`

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
	`}function Fm(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Xo||l===qo,h=l===Ca||l===Ra;if(c||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new yl(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&a(p)?(e===null&&(e=new yl(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function a(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function s(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:s}}function Om(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let a;switch(n){case"WEBGL_depth_texture":a=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=i.getExtension(n)}return t[n]=a,a}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const a=e(n);return a===null&&tr("THREE.WebGLRenderer: "+n+" extension not supported."),a}}}function Bm(i,t,e,n){const a={},r=new WeakMap;function s(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const x=u.morphAttributes[g];for(let m=0,f=x.length;m<f;m++)t.remove(x[m])}u.removeEventListener("dispose",s),delete a[u.id];const p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return a[u.id]===!0||(u.addEventListener("dispose",s),a[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],i.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const x=p[g];for(let m=0,f=x.length;m<f;m++)t.update(x[m],i.ARRAY_BUFFER)}}function c(d){const u=[],p=d.index,g=d.attributes.position;let x=0;if(p!==null){const S=p.array;x=p.version;for(let y=0,v=S.length;y<v;y+=3){const P=S[y+0],E=S[y+1],A=S[y+2];u.push(P,E,E,A,A,P)}}else if(g!==void 0){const S=g.array;x=g.version;for(let y=0,v=S.length/3-1;y<v;y+=3){const P=y+0,E=y+1,A=y+2;u.push(P,E,E,A,A,P)}}else return;const m=new(gd(u)?yd:bd)(u,1);m.version=x;const f=r.get(d);f&&t.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Hm(i,t,e){let n;function a(u){n=u}let r,s;function o(u){r=u.type,s=u.bytesPerElement}function l(u,p){i.drawElements(n,p,r,u*s),e.update(p,n,1)}function c(u,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,u*s,g),e.update(p,n,g))}function h(u,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function d(u,p,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/s,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,x,0,g);let f=0;for(let S=0;S<g;S++)f+=p[S]*x[S];e.update(f,n,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Vm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,s,o){switch(e.calls++,s){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function a(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:a,update:n}}function Gm(i,t,e){const n=new WeakMap,a=new le;function r(s,o,l){const c=s.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let w=function(){D.dispose(),n.delete(o),o.removeEventListener("dispose",w)};var p=w;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let v=0;g===!0&&(v=1),x===!0&&(v=2),m===!0&&(v=3);let P=o.attributes.position.count*v,E=1;P>t.maxTextureSize&&(E=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const A=new Float32Array(P*E*4*d),D=new xd(A,P,E,d);D.type=Zi,D.needsUpdate=!0;const _=v*4;for(let T=0;T<d;T++){const U=f[T],B=S[T],N=y[T],j=P*E*4*T;for(let z=0;z<U.count;z++){const Z=z*_;g===!0&&(a.fromBufferAttribute(U,z),A[j+Z+0]=a.x,A[j+Z+1]=a.y,A[j+Z+2]=a.z,A[j+Z+3]=0),x===!0&&(a.fromBufferAttribute(B,z),A[j+Z+4]=a.x,A[j+Z+5]=a.y,A[j+Z+6]=a.z,A[j+Z+7]=0),m===!0&&(a.fromBufferAttribute(N,z),A[j+Z+8]=a.x,A[j+Z+9]=a.y,A[j+Z+10]=a.z,A[j+Z+11]=N.itemSize===4?a.w:1)}}u={count:d,texture:D,size:new ot(P,E)},n.set(o,u),o.addEventListener("dispose",w)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Wm(i,t,e,n){let a=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(a.get(d)!==c&&(t.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;a.get(u)!==c&&(u.update(),a.set(u,c))}return d}function s(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:s}}class Yl extends Pe{constructor(t,e,n,a,r,s,o,l,c,h=ya){if(h!==ya&&h!==Hn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ya&&(n=On),n===void 0&&h===Hn&&(n=Bn),super(null,a,r,s,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ue,this.minFilter=l!==void 0?l:Ue,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Ad=new Pe,ch=new Yl(1,1),Cd=new xd,Rd=new Lf,Pd=new Ed,hh=[],dh=[],uh=new Float32Array(16),fh=new Float32Array(9),ph=new Float32Array(4);function Fa(i,t,e){const n=i[0];if(n<=0||n>0)return i;const a=t*e;let r=hh[a];if(r===void 0&&(r=new Float32Array(a),hh[a]=r),t!==0){n.toArray(r,0);for(let s=1,o=0;s!==t;++s)o+=e,i[s].toArray(r,o)}return r}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ts(i,t){let e=dh[t];e===void 0&&(e=new Int32Array(t),dh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function jm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function Ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function $m(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;ph.set(n),i.uniformMatrix2fv(this.addr,!1,ph),Te(e,n)}}function Zm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;fh.set(n),i.uniformMatrix3fv(this.addr,!1,fh),Te(e,n)}}function Jm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;uh.set(n),i.uniformMatrix4fv(this.addr,!1,uh),Te(e,n)}}function Km(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function t1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function e1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function i1(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function n1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function a1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function r1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function s1(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a);let r;this.type===i.SAMPLER_2D_SHADOW?(ch.compareFunction=md,r=ch):r=Ad,e.setTexture2D(t||r,a)}function o1(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),e.setTexture3D(t||Rd,a)}function l1(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),e.setTextureCube(t||Pd,a)}function c1(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),e.setTexture2DArray(t||Cd,a)}function h1(i){switch(i){case 5126:return jm;case 35664:return Xm;case 35665:return qm;case 35666:return Ym;case 35674:return $m;case 35675:return Zm;case 35676:return Jm;case 5124:case 35670:return Km;case 35667:case 35671:return Qm;case 35668:case 35672:return t1;case 35669:case 35673:return e1;case 5125:return i1;case 36294:return n1;case 36295:return a1;case 36296:return r1;case 35678:case 36198:case 36298:case 36306:case 35682:return s1;case 35679:case 36299:case 36307:return o1;case 35680:case 36300:case 36308:case 36293:return l1;case 36289:case 36303:case 36311:case 36292:return c1}}function d1(i,t){i.uniform1fv(this.addr,t)}function u1(i,t){const e=Fa(t,this.size,2);i.uniform2fv(this.addr,e)}function f1(i,t){const e=Fa(t,this.size,3);i.uniform3fv(this.addr,e)}function p1(i,t){const e=Fa(t,this.size,4);i.uniform4fv(this.addr,e)}function m1(i,t){const e=Fa(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function g1(i,t){const e=Fa(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function v1(i,t){const e=Fa(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function x1(i,t){i.uniform1iv(this.addr,t)}function w1(i,t){i.uniform2iv(this.addr,t)}function _1(i,t){i.uniform3iv(this.addr,t)}function b1(i,t){i.uniform4iv(this.addr,t)}function y1(i,t){i.uniform1uiv(this.addr,t)}function M1(i,t){i.uniform2uiv(this.addr,t)}function S1(i,t){i.uniform3uiv(this.addr,t)}function E1(i,t){i.uniform4uiv(this.addr,t)}function T1(i,t,e){const n=this.cache,a=t.length,r=Ts(e,a);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let s=0;s!==a;++s)e.setTexture2D(t[s]||Ad,r[s])}function A1(i,t,e){const n=this.cache,a=t.length,r=Ts(e,a);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let s=0;s!==a;++s)e.setTexture3D(t[s]||Rd,r[s])}function C1(i,t,e){const n=this.cache,a=t.length,r=Ts(e,a);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let s=0;s!==a;++s)e.setTextureCube(t[s]||Pd,r[s])}function R1(i,t,e){const n=this.cache,a=t.length,r=Ts(e,a);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let s=0;s!==a;++s)e.setTexture2DArray(t[s]||Cd,r[s])}function P1(i){switch(i){case 5126:return d1;case 35664:return u1;case 35665:return f1;case 35666:return p1;case 35674:return m1;case 35675:return g1;case 35676:return v1;case 5124:case 35670:return x1;case 35667:case 35671:return w1;case 35668:case 35672:return _1;case 35669:case 35673:return b1;case 5125:return y1;case 36294:return M1;case 36295:return S1;case 36296:return E1;case 35678:case 36198:case 36298:case 36306:case 35682:return T1;case 35679:case 36299:case 36307:return A1;case 35680:case 36300:case 36308:case 36293:return C1;case 36289:case 36303:case 36311:case 36292:return R1}}class L1{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=h1(e.type)}}class D1{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=P1(e.type)}}class U1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const a=this.seq;for(let r=0,s=a.length;r!==s;++r){const o=a[r];o.setValue(t,e[o.id],n)}}}const po=/(\w+)(\])?(\[|\.)?/g;function mh(i,t){i.seq.push(t),i.map[t.id]=t}function I1(i,t,e){const n=i.name,a=n.length;for(po.lastIndex=0;;){const r=po.exec(n),s=po.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===a){mh(e,c===void 0?new L1(o,i,t):new D1(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new U1(o),mh(e,d)),e=d}}}class hs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const r=t.getActiveUniform(e,a),s=t.getUniformLocation(e,r.name);I1(r,s,this)}}setValue(t,e,n,a){const r=this.map[e];r!==void 0&&r.setValue(t,n,a)}setOptional(t,e,n){const a=e[n];a!==void 0&&this.setValue(t,n,a)}static upload(t,e,n,a){for(let r=0,s=e.length;r!==s;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,e){const n=[];for(let a=0,r=t.length;a!==r;++a){const s=t[a];s.id in e&&n.push(s)}return n}}function gh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const z1=37297;let N1=0;function k1(i,t){const e=i.split(`
`),n=[],a=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let s=a;s<r;s++){const o=s+1;n.push(`${o===t?">":" "} ${o}: ${e[s]}`)}return n.join(`
`)}const vh=new jt;function F1(i){Kt._getMatrix(vh,Kt.workingColorSpace,i);const t=`mat3( ${vh.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(i)){case Ss:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function xh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),a=i.getShaderInfoLog(t).trim();if(n&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const s=parseInt(r[1]);return e.toUpperCase()+`

`+a+`

`+k1(i.getShaderSource(t),s)}else return a}function O1(i,t){const e=F1(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function B1(i,t){let e;switch(t){case Gu:e="Linear";break;case Wu:e="Reinhard";break;case ju:e="Cineon";break;case Xu:e="ACESFilmic";break;case ms:e="AgX";break;case Yu:e="Neutral";break;case qu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Xr=new R;function H1(){Kt.getLuminanceCoefficients(Xr);const i=Xr.x.toFixed(4),t=Xr.y.toFixed(4),e=Xr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function V1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function G1(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function W1(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let a=0;a<n;a++){const r=i.getActiveAttrib(t,a),s=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[s]={type:r.type,location:i.getAttribLocation(t,s),locationSize:o}}return e}function er(i){return i!==""}function wh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function _h(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const j1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ml(i){return i.replace(j1,q1)}const X1=new Map;function q1(i,t){let e=Xt[t];if(e===void 0){const n=X1.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ml(e)}const Y1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bh(i){return i.replace(Y1,$1)}function $1(i,t,e,n){let a="";for(let r=parseInt(t);r<parseInt(e);r++)a+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function yh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Z1(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===zl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===id?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Hi&&(t="SHADOWMAP_TYPE_VSM"),t}function J1(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ca:case Ra:t="ENVMAP_TYPE_CUBE";break;case ys:t="ENVMAP_TYPE_CUBE_UV";break}return t}function K1(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ra:t="ENVMAP_MODE_REFRACTION";break}return t}function Q1(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Nl:t="ENVMAP_BLENDING_MULTIPLY";break;case Hu:t="ENVMAP_BLENDING_MIX";break;case Vu:t="ENVMAP_BLENDING_ADD";break}return t}function tg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function eg(i,t,e,n){const a=i.getContext(),r=e.defines;let s=e.vertexShader,o=e.fragmentShader;const l=Z1(e),c=J1(e),h=K1(e),d=Q1(e),u=tg(e),p=V1(e),g=G1(r),x=a.createProgram();let m,f,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(er).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(er).join(`
`),f.length>0&&(f+=`
`)):(m=[yh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),f=[yh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ri?"#define TONE_MAPPING":"",e.toneMapping!==Ri?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Ri?B1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,O1("linearToOutputTexel",e.outputColorSpace),H1(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(er).join(`
`)),s=Ml(s),s=wh(s,e),s=_h(s,e),o=Ml(o),o=wh(o,e),o=_h(o,e),s=bh(s),o=bh(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===zc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===zc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=S+m+s,v=S+f+o,P=gh(a,a.VERTEX_SHADER,y),E=gh(a,a.FRAGMENT_SHADER,v);a.attachShader(x,P),a.attachShader(x,E),e.index0AttributeName!==void 0?a.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&a.bindAttribLocation(x,0,"position"),a.linkProgram(x);function A(T){if(i.debug.checkShaderErrors){const U=a.getProgramInfoLog(x).trim(),B=a.getShaderInfoLog(P).trim(),N=a.getShaderInfoLog(E).trim();let j=!0,z=!0;if(a.getProgramParameter(x,a.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(a,x,P,E);else{const Z=xh(a,P,"vertex"),V=xh(a,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(x,a.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+U+`
`+Z+`
`+V)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(B===""||N==="")&&(z=!1);z&&(T.diagnostics={runnable:j,programLog:U,vertexShader:{log:B,prefix:m},fragmentShader:{log:N,prefix:f}})}a.deleteShader(P),a.deleteShader(E),D=new hs(a,x),_=W1(a,x)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let _;this.getAttributes=function(){return _===void 0&&A(this),_};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=a.getProgramParameter(x,z1)),w},this.destroy=function(){n.releaseStatesOfProgram(this),a.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=N1++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=E,this}let ig=0;class ng{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,a=this._getShaderStage(e),r=this._getShaderStage(n),s=this._getShaderCacheForMaterial(t);return s.has(a)===!1&&(s.add(a),a.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ag(t),e.set(t,n)),n}}class ag{constructor(t){this.id=ig++,this.code=t,this.usedTimes=0}}function rg(i,t,e,n,a,r,s){const o=new jl,l=new ng,c=new Set,h=[],d=a.logarithmicDepthBuffer,u=a.vertexTextures;let p=a.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return c.add(_),_===0?"uv":`uv${_}`}function m(_,w,T,U,B){const N=U.fog,j=B.geometry,z=_.isMeshStandardMaterial?U.environment:null,Z=(_.isMeshStandardMaterial?e:t).get(_.envMap||z),V=Z&&Z.mapping===ys?Z.image.height:null,Y=g[_.type];_.precision!==null&&(p=a.getMaxPrecision(_.precision),p!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",p,"instead."));const at=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,st=at!==void 0?at.length:0;let ut=0;j.morphAttributes.position!==void 0&&(ut=1),j.morphAttributes.normal!==void 0&&(ut=2),j.morphAttributes.color!==void 0&&(ut=3);let Ot,J,it,mt;if(Y){const re=Si[Y];Ot=re.vertexShader,J=re.fragmentShader}else Ot=_.vertexShader,J=_.fragmentShader,l.update(_),it=l.getVertexShaderID(_),mt=l.getFragmentShaderID(_);const ct=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),Pt=B.isInstancedMesh===!0,k=B.isBatchedMesh===!0,G=!!_.map,W=!!_.matcap,wt=!!Z,L=!!_.aoMap,St=!!_.lightMap,ft=!!_.bumpMap,bt=!!_.normalMap,Et=!!_.displacementMap,$t=!!_.emissiveMap,Ct=!!_.metalnessMap,C=!!_.roughnessMap,b=_.anisotropy>0,H=_.clearcoat>0,Q=_.dispersion>0,et=_.iridescence>0,K=_.sheen>0,At=_.transmission>0,ht=b&&!!_.anisotropyMap,gt=H&&!!_.clearcoatMap,Vt=H&&!!_.clearcoatNormalMap,nt=H&&!!_.clearcoatRoughnessMap,yt=et&&!!_.iridescenceMap,Nt=et&&!!_.iridescenceThicknessMap,kt=K&&!!_.sheenColorMap,Mt=K&&!!_.sheenRoughnessMap,Bt=!!_.specularMap,Ft=!!_.specularColorMap,Zt=!!_.specularIntensityMap,I=At&&!!_.transmissionMap,dt=At&&!!_.thicknessMap,$=!!_.gradientMap,tt=!!_.alphaMap,_t=_.alphaTest>0,vt=!!_.alphaHash,Gt=!!_.extensions;let xe=Ri;_.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(xe=i.toneMapping);const Ne={shaderID:Y,shaderType:_.type,shaderName:_.name,vertexShader:Ot,fragmentShader:J,defines:_.defines,customVertexShaderID:it,customFragmentShaderID:mt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:p,batching:k,batchingColor:k&&B._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&B.instanceColor!==null,instancingMorph:Pt&&B.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ct===null?i.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Na,alphaToCoverage:!!_.alphaToCoverage,map:G,matcap:W,envMap:wt,envMapMode:wt&&Z.mapping,envMapCubeUVHeight:V,aoMap:L,lightMap:St,bumpMap:ft,normalMap:bt,displacementMap:u&&Et,emissiveMap:$t,normalMapObjectSpace:bt&&_.normalMapType===Ku,normalMapTangentSpace:bt&&_.normalMapType===Ms,metalnessMap:Ct,roughnessMap:C,anisotropy:b,anisotropyMap:ht,clearcoat:H,clearcoatMap:gt,clearcoatNormalMap:Vt,clearcoatRoughnessMap:nt,dispersion:Q,iridescence:et,iridescenceMap:yt,iridescenceThicknessMap:Nt,sheen:K,sheenColorMap:kt,sheenRoughnessMap:Mt,specularMap:Bt,specularColorMap:Ft,specularIntensityMap:Zt,transmission:At,transmissionMap:I,thicknessMap:dt,gradientMap:$,opaque:_.transparent===!1&&_.blending===ba&&_.alphaToCoverage===!1,alphaMap:tt,alphaTest:_t,alphaHash:vt,combine:_.combine,mapUv:G&&x(_.map.channel),aoMapUv:L&&x(_.aoMap.channel),lightMapUv:St&&x(_.lightMap.channel),bumpMapUv:ft&&x(_.bumpMap.channel),normalMapUv:bt&&x(_.normalMap.channel),displacementMapUv:Et&&x(_.displacementMap.channel),emissiveMapUv:$t&&x(_.emissiveMap.channel),metalnessMapUv:Ct&&x(_.metalnessMap.channel),roughnessMapUv:C&&x(_.roughnessMap.channel),anisotropyMapUv:ht&&x(_.anisotropyMap.channel),clearcoatMapUv:gt&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:Vt&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&x(_.sheenRoughnessMap.channel),specularMapUv:Bt&&x(_.specularMap.channel),specularColorMapUv:Ft&&x(_.specularColorMap.channel),specularIntensityMapUv:Zt&&x(_.specularIntensityMap.channel),transmissionMapUv:I&&x(_.transmissionMap.channel),thicknessMapUv:dt&&x(_.thicknessMap.channel),alphaMapUv:tt&&x(_.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(bt||b),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!j.attributes.uv&&(G||tt),fog:!!N,useFog:_.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Rt,skinning:B.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:ut,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&T.length>0,shadowMapType:i.shadowMap.type,toneMapping:xe,decodeVideoTexture:G&&_.map.isVideoTexture===!0&&Kt.getTransfer(_.map.colorSpace)===oe,decodeVideoTextureEmissive:$t&&_.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(_.emissiveMap.colorSpace)===oe,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Be,flipSided:_.side===Ve,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Gt&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&_.extensions.multiDraw===!0||k)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function f(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const T in _.defines)w.push(T),w.push(_.defines[T]);return _.isRawShaderMaterial===!1&&(S(w,_),y(w,_),w.push(i.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function S(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function y(_,w){o.disableAll(),w.supportsVertexTextures&&o.enable(0),w.instancing&&o.enable(1),w.instancingColor&&o.enable(2),w.instancingMorph&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),w.dispersion&&o.enable(20),w.batchingColor&&o.enable(21),_.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reverseDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),_.push(o.mask)}function v(_){const w=g[_.type];let T;if(w){const U=Si[w];T=ji.clone(U.uniforms)}else T=_.uniforms;return T}function P(_,w){let T;for(let U=0,B=h.length;U<B;U++){const N=h[U];if(N.cacheKey===w){T=N,++T.usedTimes;break}}return T===void 0&&(T=new eg(i,w,_,r),h.push(T)),T}function E(_){if(--_.usedTimes===0){const w=h.indexOf(_);h[w]=h[h.length-1],h.pop(),_.destroy()}}function A(_){l.remove(_)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:P,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:D}}function sg(){let i=new WeakMap;function t(s){return i.has(s)}function e(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function n(s){i.delete(s)}function a(s,o,l){i.get(s)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:a,dispose:r}}function og(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Mh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Sh(){const i=[];let t=0;const e=[],n=[],a=[];function r(){t=0,e.length=0,n.length=0,a.length=0}function s(d,u,p,g,x,m){let f=i[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},i[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=x,f.group=m),t++,f}function o(d,u,p,g,x,m){const f=s(d,u,p,g,x,m);p.transmission>0?n.push(f):p.transparent===!0?a.push(f):e.push(f)}function l(d,u,p,g,x,m){const f=s(d,u,p,g,x,m);p.transmission>0?n.unshift(f):p.transparent===!0?a.unshift(f):e.unshift(f)}function c(d,u){e.length>1&&e.sort(d||og),n.length>1&&n.sort(u||Mh),a.length>1&&a.sort(u||Mh)}function h(){for(let d=t,u=i.length;d<u;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:a,init:r,push:o,unshift:l,finish:h,sort:c}}function lg(){let i=new WeakMap;function t(n,a){const r=i.get(n);let s;return r===void 0?(s=new Sh,i.set(n,[s])):a>=r.length?(s=new Sh,r.push(s)):s=r[a],s}function e(){i=new WeakMap}return{get:t,dispose:e}}function cg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new It};break;case"SpotLight":e={position:new R,direction:new R,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function hg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let dg=0;function ug(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function fg(i){const t=new cg,e=hg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const a=new R,r=new ee,s=new ee;function o(c){let h=0,d=0,u=0;for(let _=0;_<9;_++)n.probe[_].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,S=0,y=0,v=0,P=0,E=0,A=0;c.sort(ug);for(let _=0,w=c.length;_<w;_++){const T=c[_],U=T.color,B=T.intensity,N=T.distance,j=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)h+=U.r*B,d+=U.g*B,u+=U.b*B;else if(T.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(T.sh.coefficients[z],B);A++}else if(T.isDirectionalLight){const z=t.get(T);if(z.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const Z=T.shadow,V=e.get(T);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,n.directionalShadow[p]=V,n.directionalShadowMap[p]=j,n.directionalShadowMatrix[p]=T.shadow.matrix,S++}n.directional[p]=z,p++}else if(T.isSpotLight){const z=t.get(T);z.position.setFromMatrixPosition(T.matrixWorld),z.color.copy(U).multiplyScalar(B),z.distance=N,z.coneCos=Math.cos(T.angle),z.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),z.decay=T.decay,n.spot[x]=z;const Z=T.shadow;if(T.map&&(n.spotLightMap[P]=T.map,P++,Z.updateMatrices(T),T.castShadow&&E++),n.spotLightMatrix[x]=Z.matrix,T.castShadow){const V=e.get(T);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,n.spotShadow[x]=V,n.spotShadowMap[x]=j,v++}x++}else if(T.isRectAreaLight){const z=t.get(T);z.color.copy(U).multiplyScalar(B),z.halfWidth.set(T.width*.5,0,0),z.halfHeight.set(0,T.height*.5,0),n.rectArea[m]=z,m++}else if(T.isPointLight){const z=t.get(T);if(z.color.copy(T.color).multiplyScalar(T.intensity),z.distance=T.distance,z.decay=T.decay,T.castShadow){const Z=T.shadow,V=e.get(T);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,V.shadowCameraNear=Z.camera.near,V.shadowCameraFar=Z.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=T.shadow.matrix,y++}n.point[g]=z,g++}else if(T.isHemisphereLight){const z=t.get(T);z.skyColor.copy(T.color).multiplyScalar(B),z.groundColor.copy(T.groundColor).multiplyScalar(B),n.hemi[f]=z,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const D=n.hash;(D.directionalLength!==p||D.pointLength!==g||D.spotLength!==x||D.rectAreaLength!==m||D.hemiLength!==f||D.numDirectionalShadows!==S||D.numPointShadows!==y||D.numSpotShadows!==v||D.numSpotMaps!==P||D.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+P-E,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,D.directionalLength=p,D.pointLength=g,D.spotLength=x,D.rectAreaLength=m,D.hemiLength=f,D.numDirectionalShadows=S,D.numPointShadows=y,D.numSpotShadows=v,D.numSpotMaps=P,D.numLightProbes=A,n.version=dg++)}function l(c,h){let d=0,u=0,p=0,g=0,x=0;const m=h.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const y=c[f];if(y.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(a),v.direction.transformDirection(m),d++}else if(y.isSpotLight){const v=n.spot[p];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(a),v.direction.transformDirection(m),p++}else if(y.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),s.identity(),r.copy(y.matrixWorld),r.premultiply(m),s.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(s),v.halfHeight.applyMatrix4(s),g++}else if(y.isPointLight){const v=n.point[u];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),u++}else if(y.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:n}}function Eh(i){const t=new fg(i),e=[],n=[];function a(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function s(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:s}}function pg(i){let t=new WeakMap;function e(a,r=0){const s=t.get(a);let o;return s===void 0?(o=new Eh(i),t.set(a,[o])):r>=s.length?(o=new Eh(i),s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class mg extends Mn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Zu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class gg extends Mn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const vg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xg=`uniform sampler2D shadow_pass;
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
}`;function wg(i,t,e){let n=new Xl;const a=new ot,r=new ot,s=new le,o=new mg({depthPacking:Ju}),l=new gg,c={},h=e.maxTextureSize,d={[bn]:Ve,[Ve]:bn,[Be]:Be},u=new ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:vg,fragmentShader:xg}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new We;g.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Tt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zl;let f=this.type;this.render=function(E,A,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const _=i.getRenderTarget(),w=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),U=i.state;U.setBlending(De),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const B=f!==Hi&&this.type===Hi,N=f===Hi&&this.type!==Hi;for(let j=0,z=E.length;j<z;j++){const Z=E[j],V=Z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const Y=V.getFrameExtents();if(a.multiply(Y),r.copy(V.mapSize),(a.x>h||a.y>h)&&(a.x>h&&(r.x=Math.floor(h/Y.x),a.x=r.x*Y.x,V.mapSize.x=r.x),a.y>h&&(r.y=Math.floor(h/Y.y),a.y=r.y*Y.y,V.mapSize.y=r.y)),V.map===null||B===!0||N===!0){const st=this.type!==Hi?{minFilter:Ue,magFilter:Ue}:{};V.map!==null&&V.map.dispose(),V.map=new qe(a.x,a.y,st),V.map.texture.name=Z.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const at=V.getViewportCount();for(let st=0;st<at;st++){const ut=V.getViewport(st);s.set(r.x*ut.x,r.y*ut.y,r.x*ut.z,r.y*ut.w),U.viewport(s),V.updateMatrices(Z,st),n=V.getFrustum(),v(A,D,V.camera,Z,this.type)}V.isPointLightShadow!==!0&&this.type===Hi&&S(V,D),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(_,w,T)};function S(E,A){const D=t.update(x);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new qe(a.x,a.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,D,u,x,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,D,p,x,null)}function y(E,A,D,_){let w=null;const T=D.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(T!==void 0)w=T;else if(w=D.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const U=w.uuid,B=A.uuid;let N=c[U];N===void 0&&(N={},c[U]=N);let j=N[B];j===void 0&&(j=w.clone(),N[B]=j,A.addEventListener("dispose",P)),w=j}if(w.visible=A.visible,w.wireframe=A.wireframe,_===Hi?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:d[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,D.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const U=i.properties.get(w);U.light=D}return w}function v(E,A,D,_,w){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&w===Hi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,E.matrixWorld);const B=t.update(E),N=E.material;if(Array.isArray(N)){const j=B.groups;for(let z=0,Z=j.length;z<Z;z++){const V=j[z],Y=N[V.materialIndex];if(Y&&Y.visible){const at=y(E,Y,_,w);E.onBeforeShadow(i,E,A,D,B,at,V),i.renderBufferDirect(D,null,B,at,E,V),E.onAfterShadow(i,E,A,D,B,at,V)}}}else if(N.visible){const j=y(E,N,_,w);E.onBeforeShadow(i,E,A,D,B,j,null),i.renderBufferDirect(D,null,B,j,E,null),E.onAfterShadow(i,E,A,D,B,j,null)}}const U=E.children;for(let B=0,N=U.length;B<N;B++)v(U[B],A,D,_,w)}function P(E){E.target.removeEventListener("dispose",P);for(const D in c){const _=c[D],w=E.target.uuid;w in _&&(_[w].dispose(),delete _[w])}}}const _g={[Oo]:Bo,[Ho]:Wo,[Vo]:jo,[Aa]:Go,[Bo]:Oo,[Wo]:Ho,[jo]:Vo,[Go]:Aa};function bg(i,t){function e(){let I=!1;const dt=new le;let $=null;const tt=new le(0,0,0,0);return{setMask:function(_t){$!==_t&&!I&&(i.colorMask(_t,_t,_t,_t),$=_t)},setLocked:function(_t){I=_t},setClear:function(_t,vt,Gt,xe,Ne){Ne===!0&&(_t*=xe,vt*=xe,Gt*=xe),dt.set(_t,vt,Gt,xe),tt.equals(dt)===!1&&(i.clearColor(_t,vt,Gt,xe),tt.copy(dt))},reset:function(){I=!1,$=null,tt.set(-1,0,0,0)}}}function n(){let I=!1,dt=!1,$=null,tt=null,_t=null;return{setReversed:function(vt){if(dt!==vt){const Gt=t.get("EXT_clip_control");dt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const xe=_t;_t=null,this.setClear(xe)}dt=vt},getReversed:function(){return dt},setTest:function(vt){vt?ct(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(vt){$!==vt&&!I&&(i.depthMask(vt),$=vt)},setFunc:function(vt){if(dt&&(vt=_g[vt]),tt!==vt){switch(vt){case Oo:i.depthFunc(i.NEVER);break;case Bo:i.depthFunc(i.ALWAYS);break;case Ho:i.depthFunc(i.LESS);break;case Aa:i.depthFunc(i.LEQUAL);break;case Vo:i.depthFunc(i.EQUAL);break;case Go:i.depthFunc(i.GEQUAL);break;case Wo:i.depthFunc(i.GREATER);break;case jo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=vt}},setLocked:function(vt){I=vt},setClear:function(vt){_t!==vt&&(dt&&(vt=1-vt),i.clearDepth(vt),_t=vt)},reset:function(){I=!1,$=null,tt=null,_t=null,dt=!1}}}function a(){let I=!1,dt=null,$=null,tt=null,_t=null,vt=null,Gt=null,xe=null,Ne=null;return{setTest:function(re){I||(re?ct(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(re){dt!==re&&!I&&(i.stencilMask(re),dt=re)},setFunc:function(re,fi,Ii){($!==re||tt!==fi||_t!==Ii)&&(i.stencilFunc(re,fi,Ii),$=re,tt=fi,_t=Ii)},setOp:function(re,fi,Ii){(vt!==re||Gt!==fi||xe!==Ii)&&(i.stencilOp(re,fi,Ii),vt=re,Gt=fi,xe=Ii)},setLocked:function(re){I=re},setClear:function(re){Ne!==re&&(i.clearStencil(re),Ne=re)},reset:function(){I=!1,dt=null,$=null,tt=null,_t=null,vt=null,Gt=null,xe=null,Ne=null}}}const r=new e,s=new n,o=new a,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,p=[],g=null,x=!1,m=null,f=null,S=null,y=null,v=null,P=null,E=null,A=new It(0,0,0),D=0,_=!1,w=null,T=null,U=null,B=null,N=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Z=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(V)[1]),z=Z>=1):V.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),z=Z>=2);let Y=null,at={};const st=i.getParameter(i.SCISSOR_BOX),ut=i.getParameter(i.VIEWPORT),Ot=new le().fromArray(st),J=new le().fromArray(ut);function it(I,dt,$,tt){const _t=new Uint8Array(4),vt=i.createTexture();i.bindTexture(I,vt),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<$;Gt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,_t):i.texImage2D(dt+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_t);return vt}const mt={};mt[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),mt[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),mt[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ct(i.DEPTH_TEST),s.setFunc(Aa),ft(!1),bt(Lc),ct(i.CULL_FACE),L(De);function ct(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Rt(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Pt(I,dt){return d[I]!==dt?(i.bindFramebuffer(I,dt),d[I]=dt,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=dt),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function k(I,dt){let $=p,tt=!1;if(I){$=u.get(dt),$===void 0&&($=[],u.set(dt,$));const _t=I.textures;if($.length!==_t.length||$[0]!==i.COLOR_ATTACHMENT0){for(let vt=0,Gt=_t.length;vt<Gt;vt++)$[vt]=i.COLOR_ATTACHMENT0+vt;$.length=_t.length,tt=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,tt=!0);tt&&i.drawBuffers($)}function G(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const W={[wi]:i.FUNC_ADD,[Au]:i.FUNC_SUBTRACT,[Cu]:i.FUNC_REVERSE_SUBTRACT};W[Ru]=i.MIN,W[Pu]=i.MAX;const wt={[Qa]:i.ZERO,[Lu]:i.ONE,[Du]:i.SRC_COLOR,[zo]:i.SRC_ALPHA,[Nu]:i.SRC_ALPHA_SATURATE,[Fo]:i.DST_COLOR,[ko]:i.DST_ALPHA,[Uu]:i.ONE_MINUS_SRC_COLOR,[No]:i.ONE_MINUS_SRC_ALPHA,[zu]:i.ONE_MINUS_DST_COLOR,[Iu]:i.ONE_MINUS_DST_ALPHA,[ku]:i.CONSTANT_COLOR,[Fu]:i.ONE_MINUS_CONSTANT_COLOR,[Ou]:i.CONSTANT_ALPHA,[Bu]:i.ONE_MINUS_CONSTANT_ALPHA};function L(I,dt,$,tt,_t,vt,Gt,xe,Ne,re){if(I===De){x===!0&&(Rt(i.BLEND),x=!1);return}if(x===!1&&(ct(i.BLEND),x=!0),I!==nd){if(I!==m||re!==_){if((f!==wi||v!==wi)&&(i.blendEquation(i.FUNC_ADD),f=wi,v=wi),re)switch(I){case ba:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yi:i.blendFunc(i.ONE,i.ONE);break;case Dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case ba:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yi:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}S=null,y=null,P=null,E=null,A.set(0,0,0),D=0,m=I,_=re}return}_t=_t||dt,vt=vt||$,Gt=Gt||tt,(dt!==f||_t!==v)&&(i.blendEquationSeparate(W[dt],W[_t]),f=dt,v=_t),($!==S||tt!==y||vt!==P||Gt!==E)&&(i.blendFuncSeparate(wt[$],wt[tt],wt[vt],wt[Gt]),S=$,y=tt,P=vt,E=Gt),(xe.equals(A)===!1||Ne!==D)&&(i.blendColor(xe.r,xe.g,xe.b,Ne),A.copy(xe),D=Ne),m=I,_=!1}function St(I,dt){I.side===Be?Rt(i.CULL_FACE):ct(i.CULL_FACE);let $=I.side===Ve;dt&&($=!$),ft($),I.blending===ba&&I.transparent===!1?L(De):L(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),r.setMask(I.colorWrite);const tt=I.stencilWrite;o.setTest(tt),tt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),$t(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ct(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ft(I){w!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),w=I)}function bt(I){I!==Eu?(ct(i.CULL_FACE),I!==T&&(I===Lc?i.cullFace(i.BACK):I===Tu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),T=I}function Et(I){I!==U&&(z&&i.lineWidth(I),U=I)}function $t(I,dt,$){I?(ct(i.POLYGON_OFFSET_FILL),(B!==dt||N!==$)&&(i.polygonOffset(dt,$),B=dt,N=$)):Rt(i.POLYGON_OFFSET_FILL)}function Ct(I){I?ct(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function C(I){I===void 0&&(I=i.TEXTURE0+j-1),Y!==I&&(i.activeTexture(I),Y=I)}function b(I,dt,$){$===void 0&&(Y===null?$=i.TEXTURE0+j-1:$=Y);let tt=at[$];tt===void 0&&(tt={type:void 0,texture:void 0},at[$]=tt),(tt.type!==I||tt.texture!==dt)&&(Y!==$&&(i.activeTexture($),Y=$),i.bindTexture(I,dt||mt[I]),tt.type=I,tt.texture=dt)}function H(){const I=at[Y];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function At(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ht(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function gt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Vt(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function nt(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function yt(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Nt(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function kt(I){Ot.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Ot.copy(I))}function Mt(I){J.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),J.copy(I))}function Bt(I,dt){let $=c.get(dt);$===void 0&&($=new WeakMap,c.set(dt,$));let tt=$.get(I);tt===void 0&&(tt=i.getUniformBlockIndex(dt,I.name),$.set(I,tt))}function Ft(I,dt){const tt=c.get(dt).get(I);l.get(dt)!==tt&&(i.uniformBlockBinding(dt,tt,I.__bindingPointIndex),l.set(dt,tt))}function Zt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Y=null,at={},d={},u=new WeakMap,p=[],g=null,x=!1,m=null,f=null,S=null,y=null,v=null,P=null,E=null,A=new It(0,0,0),D=0,_=!1,w=null,T=null,U=null,B=null,N=null,Ot.set(0,0,i.canvas.width,i.canvas.height),J.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:ct,disable:Rt,bindFramebuffer:Pt,drawBuffers:k,useProgram:G,setBlending:L,setMaterial:St,setFlipSided:ft,setCullFace:bt,setLineWidth:Et,setPolygonOffset:$t,setScissorTest:Ct,activeTexture:C,bindTexture:b,unbindTexture:H,compressedTexImage2D:Q,compressedTexImage3D:et,texImage2D:yt,texImage3D:Nt,updateUBOMapping:Bt,uniformBlockBinding:Ft,texStorage2D:Vt,texStorage3D:nt,texSubImage2D:K,texSubImage3D:At,compressedTexSubImage2D:ht,compressedTexSubImage3D:gt,scissor:kt,viewport:Mt,reset:Zt}}function Th(i,t,e,n){const a=yg(n);switch(e){case ld:return i*t;case hd:return i*t;case dd:return i*t*2;case ud:return i*t/a.components*a.byteLength;case Bl:return i*t/a.components*a.byteLength;case fd:return i*t*2/a.components*a.byteLength;case Hl:return i*t*2/a.components*a.byteLength;case cd:return i*t*3/a.components*a.byteLength;case ui:return i*t*4/a.components*a.byteLength;case Vl:return i*t*4/a.components*a.byteLength;case rs:case ss:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case os:case ls:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Zo:case Ko:return Math.max(i,16)*Math.max(t,8)/4;case $o:case Jo:return Math.max(i,8)*Math.max(t,8)/2;case Qo:case tl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case el:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case il:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case nl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case al:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case rl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case sl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ol:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ll:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case cl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case hl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case dl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ul:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case fl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case pl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ml:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case cs:case gl:case vl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case pd:case xl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case wl:case _l:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function yg(i){switch(i){case Li:case rd:return{byteLength:1,components:1};case ur:case sd:case ri:return{byteLength:2,components:1};case Fl:case Ol:return{byteLength:2,components:4};case On:case kl:case Zi:return{byteLength:4,components:1};case od:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Mg(i,t,e,n,a,r,s){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,b){return p?new OffscreenCanvas(C,b):fr("canvas")}function x(C,b,H){let Q=1;const et=Ct(C);if((et.width>H||et.height>H)&&(Q=H/Math.max(et.width,et.height)),Q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const K=Math.floor(Q*et.width),At=Math.floor(Q*et.height);d===void 0&&(d=g(K,At));const ht=b?g(K,At):d;return ht.width=K,ht.height=At,ht.getContext("2d").drawImage(C,0,0,K,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+K+"x"+At+")."),ht}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),C;return C}function m(C){return C.generateMipmaps}function f(C){i.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(C,b,H,Q,et=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let K=b;if(b===i.RED&&(H===i.FLOAT&&(K=i.R32F),H===i.HALF_FLOAT&&(K=i.R16F),H===i.UNSIGNED_BYTE&&(K=i.R8)),b===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.R8UI),H===i.UNSIGNED_SHORT&&(K=i.R16UI),H===i.UNSIGNED_INT&&(K=i.R32UI),H===i.BYTE&&(K=i.R8I),H===i.SHORT&&(K=i.R16I),H===i.INT&&(K=i.R32I)),b===i.RG&&(H===i.FLOAT&&(K=i.RG32F),H===i.HALF_FLOAT&&(K=i.RG16F),H===i.UNSIGNED_BYTE&&(K=i.RG8)),b===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RG8UI),H===i.UNSIGNED_SHORT&&(K=i.RG16UI),H===i.UNSIGNED_INT&&(K=i.RG32UI),H===i.BYTE&&(K=i.RG8I),H===i.SHORT&&(K=i.RG16I),H===i.INT&&(K=i.RG32I)),b===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGB8UI),H===i.UNSIGNED_SHORT&&(K=i.RGB16UI),H===i.UNSIGNED_INT&&(K=i.RGB32UI),H===i.BYTE&&(K=i.RGB8I),H===i.SHORT&&(K=i.RGB16I),H===i.INT&&(K=i.RGB32I)),b===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),H===i.UNSIGNED_INT&&(K=i.RGBA32UI),H===i.BYTE&&(K=i.RGBA8I),H===i.SHORT&&(K=i.RGBA16I),H===i.INT&&(K=i.RGBA32I)),b===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),b===i.RGBA){const At=et?Ss:Kt.getTransfer(Q);H===i.FLOAT&&(K=i.RGBA32F),H===i.HALF_FLOAT&&(K=i.RGBA16F),H===i.UNSIGNED_BYTE&&(K=At===oe?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(C,b){let H;return C?b===null||b===On||b===Bn?H=i.DEPTH24_STENCIL8:b===Zi?H=i.DEPTH32F_STENCIL8:b===ur&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===On||b===Bn?H=i.DEPTH_COMPONENT24:b===Zi?H=i.DEPTH_COMPONENT32F:b===ur&&(H=i.DEPTH_COMPONENT16),H}function P(C,b){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ue&&C.minFilter!==$e?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function E(C){const b=C.target;b.removeEventListener("dispose",E),D(b),b.isVideoTexture&&h.delete(b)}function A(C){const b=C.target;b.removeEventListener("dispose",A),w(b)}function D(C){const b=n.get(C);if(b.__webglInit===void 0)return;const H=C.source,Q=u.get(H);if(Q){const et=Q[b.__cacheKey];et.usedTimes--,et.usedTimes===0&&_(C),Object.keys(Q).length===0&&u.delete(H)}n.remove(C)}function _(C){const b=n.get(C);i.deleteTexture(b.__webglTexture);const H=C.source,Q=u.get(H);delete Q[b.__cacheKey],s.memory.textures--}function w(C){const b=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(b.__webglFramebuffer[Q]))for(let et=0;et<b.__webglFramebuffer[Q].length;et++)i.deleteFramebuffer(b.__webglFramebuffer[Q][et]);else i.deleteFramebuffer(b.__webglFramebuffer[Q]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[Q])}else{if(Array.isArray(b.__webglFramebuffer))for(let Q=0;Q<b.__webglFramebuffer.length;Q++)i.deleteFramebuffer(b.__webglFramebuffer[Q]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Q=0;Q<b.__webglColorRenderbuffer.length;Q++)b.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[Q]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const H=C.textures;for(let Q=0,et=H.length;Q<et;Q++){const K=n.get(H[Q]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),s.memory.textures--),n.remove(H[Q])}n.remove(C)}let T=0;function U(){T=0}function B(){const C=T;return C>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+a.maxTextures),T+=1,C}function N(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function j(C,b){const H=n.get(C);if(C.isVideoTexture&&Et(C),C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){const Q=C.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(H,C,b);return}}e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+b)}function z(C,b){const H=n.get(C);if(C.version>0&&H.__version!==C.version){J(H,C,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+b)}function Z(C,b){const H=n.get(C);if(C.version>0&&H.__version!==C.version){J(H,C,b);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+b)}function V(C,b){const H=n.get(C);if(C.version>0&&H.__version!==C.version){it(H,C,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+b)}const Y={[Pi]:i.REPEAT,[Yi]:i.CLAMP_TO_EDGE,[Yo]:i.MIRRORED_REPEAT},at={[Ue]:i.NEAREST,[$u]:i.NEAREST_MIPMAP_NEAREST,[Er]:i.NEAREST_MIPMAP_LINEAR,[$e]:i.LINEAR,[Hs]:i.LINEAR_MIPMAP_NEAREST,[$i]:i.LINEAR_MIPMAP_LINEAR},st={[Qu]:i.NEVER,[sf]:i.ALWAYS,[tf]:i.LESS,[md]:i.LEQUAL,[ef]:i.EQUAL,[rf]:i.GEQUAL,[nf]:i.GREATER,[af]:i.NOTEQUAL};function ut(C,b){if(b.type===Zi&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===$e||b.magFilter===Hs||b.magFilter===Er||b.magFilter===$i||b.minFilter===$e||b.minFilter===Hs||b.minFilter===Er||b.minFilter===$i)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,Y[b.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,Y[b.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,Y[b.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,at[b.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,at[b.minFilter]),b.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,st[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ue||b.minFilter!==Er&&b.minFilter!==$i||b.type===Zi&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,a.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Ot(C,b){let H=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",E));const Q=b.source;let et=u.get(Q);et===void 0&&(et={},u.set(Q,et));const K=N(b);if(K!==C.__cacheKey){et[K]===void 0&&(et[K]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,H=!0),et[K].usedTimes++;const At=et[C.__cacheKey];At!==void 0&&(et[C.__cacheKey].usedTimes--,At.usedTimes===0&&_(b)),C.__cacheKey=K,C.__webglTexture=et[K].texture}return H}function J(C,b,H){let Q=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Q=i.TEXTURE_3D);const et=Ot(C,b),K=b.source;e.bindTexture(Q,C.__webglTexture,i.TEXTURE0+H);const At=n.get(K);if(K.version!==At.__version||et===!0){e.activeTexture(i.TEXTURE0+H);const ht=Kt.getPrimaries(Kt.workingColorSpace),gt=b.colorSpace===Wi?null:Kt.getPrimaries(b.colorSpace),Vt=b.colorSpace===Wi||ht===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let nt=x(b.image,!1,a.maxTextureSize);nt=$t(b,nt);const yt=r.convert(b.format,b.colorSpace),Nt=r.convert(b.type);let kt=y(b.internalFormat,yt,Nt,b.colorSpace,b.isVideoTexture);ut(Q,b);let Mt;const Bt=b.mipmaps,Ft=b.isVideoTexture!==!0,Zt=At.__version===void 0||et===!0,I=K.dataReady,dt=P(b,nt);if(b.isDepthTexture)kt=v(b.format===Hn,b.type),Zt&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,kt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,kt,nt.width,nt.height,0,yt,Nt,null));else if(b.isDataTexture)if(Bt.length>0){Ft&&Zt&&e.texStorage2D(i.TEXTURE_2D,dt,kt,Bt[0].width,Bt[0].height);for(let $=0,tt=Bt.length;$<tt;$++)Mt=Bt[$],Ft?I&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,Mt.width,Mt.height,yt,Nt,Mt.data):e.texImage2D(i.TEXTURE_2D,$,kt,Mt.width,Mt.height,0,yt,Nt,Mt.data);b.generateMipmaps=!1}else Ft?(Zt&&e.texStorage2D(i.TEXTURE_2D,dt,kt,nt.width,nt.height),I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,yt,Nt,nt.data)):e.texImage2D(i.TEXTURE_2D,0,kt,nt.width,nt.height,0,yt,Nt,nt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ft&&Zt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,kt,Bt[0].width,Bt[0].height,nt.depth);for(let $=0,tt=Bt.length;$<tt;$++)if(Mt=Bt[$],b.format!==ui)if(yt!==null)if(Ft){if(I)if(b.layerUpdates.size>0){const _t=Th(Mt.width,Mt.height,b.format,b.type);for(const vt of b.layerUpdates){const Gt=Mt.data.subarray(vt*_t/Mt.data.BYTES_PER_ELEMENT,(vt+1)*_t/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,vt,Mt.width,Mt.height,1,yt,Gt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Mt.width,Mt.height,nt.depth,yt,Mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,kt,Mt.width,Mt.height,nt.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Mt.width,Mt.height,nt.depth,yt,Nt,Mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,kt,Mt.width,Mt.height,nt.depth,0,yt,Nt,Mt.data)}else{Ft&&Zt&&e.texStorage2D(i.TEXTURE_2D,dt,kt,Bt[0].width,Bt[0].height);for(let $=0,tt=Bt.length;$<tt;$++)Mt=Bt[$],b.format!==ui?yt!==null?Ft?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,Mt.width,Mt.height,yt,Mt.data):e.compressedTexImage2D(i.TEXTURE_2D,$,kt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?I&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,Mt.width,Mt.height,yt,Nt,Mt.data):e.texImage2D(i.TEXTURE_2D,$,kt,Mt.width,Mt.height,0,yt,Nt,Mt.data)}else if(b.isDataArrayTexture)if(Ft){if(Zt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,kt,nt.width,nt.height,nt.depth),I)if(b.layerUpdates.size>0){const $=Th(nt.width,nt.height,b.format,b.type);for(const tt of b.layerUpdates){const _t=nt.data.subarray(tt*$/nt.data.BYTES_PER_ELEMENT,(tt+1)*$/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,nt.width,nt.height,1,yt,Nt,_t)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,yt,Nt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,kt,nt.width,nt.height,nt.depth,0,yt,Nt,nt.data);else if(b.isData3DTexture)Ft?(Zt&&e.texStorage3D(i.TEXTURE_3D,dt,kt,nt.width,nt.height,nt.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,yt,Nt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,kt,nt.width,nt.height,nt.depth,0,yt,Nt,nt.data);else if(b.isFramebufferTexture){if(Zt)if(Ft)e.texStorage2D(i.TEXTURE_2D,dt,kt,nt.width,nt.height);else{let $=nt.width,tt=nt.height;for(let _t=0;_t<dt;_t++)e.texImage2D(i.TEXTURE_2D,_t,kt,$,tt,0,yt,Nt,null),$>>=1,tt>>=1}}else if(Bt.length>0){if(Ft&&Zt){const $=Ct(Bt[0]);e.texStorage2D(i.TEXTURE_2D,dt,kt,$.width,$.height)}for(let $=0,tt=Bt.length;$<tt;$++)Mt=Bt[$],Ft?I&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,yt,Nt,Mt):e.texImage2D(i.TEXTURE_2D,$,kt,yt,Nt,Mt);b.generateMipmaps=!1}else if(Ft){if(Zt){const $=Ct(nt);e.texStorage2D(i.TEXTURE_2D,dt,kt,$.width,$.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,yt,Nt,nt)}else e.texImage2D(i.TEXTURE_2D,0,kt,yt,Nt,nt);m(b)&&f(Q),At.__version=K.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function it(C,b,H){if(b.image.length!==6)return;const Q=Ot(C,b),et=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+H);const K=n.get(et);if(et.version!==K.__version||Q===!0){e.activeTexture(i.TEXTURE0+H);const At=Kt.getPrimaries(Kt.workingColorSpace),ht=b.colorSpace===Wi?null:Kt.getPrimaries(b.colorSpace),gt=b.colorSpace===Wi||At===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const Vt=b.isCompressedTexture||b.image[0].isCompressedTexture,nt=b.image[0]&&b.image[0].isDataTexture,yt=[];for(let tt=0;tt<6;tt++)!Vt&&!nt?yt[tt]=x(b.image[tt],!0,a.maxCubemapSize):yt[tt]=nt?b.image[tt].image:b.image[tt],yt[tt]=$t(b,yt[tt]);const Nt=yt[0],kt=r.convert(b.format,b.colorSpace),Mt=r.convert(b.type),Bt=y(b.internalFormat,kt,Mt,b.colorSpace),Ft=b.isVideoTexture!==!0,Zt=K.__version===void 0||Q===!0,I=et.dataReady;let dt=P(b,Nt);ut(i.TEXTURE_CUBE_MAP,b);let $;if(Vt){Ft&&Zt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Bt,Nt.width,Nt.height);for(let tt=0;tt<6;tt++){$=yt[tt].mipmaps;for(let _t=0;_t<$.length;_t++){const vt=$[_t];b.format!==ui?kt!==null?Ft?I&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t,0,0,vt.width,vt.height,kt,vt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t,Bt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t,0,0,vt.width,vt.height,kt,Mt,vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t,Bt,vt.width,vt.height,0,kt,Mt,vt.data)}}}else{if($=b.mipmaps,Ft&&Zt){$.length>0&&dt++;const tt=Ct(yt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Bt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(nt){Ft?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,yt[tt].width,yt[tt].height,kt,Mt,yt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Bt,yt[tt].width,yt[tt].height,0,kt,Mt,yt[tt].data);for(let _t=0;_t<$.length;_t++){const Gt=$[_t].image[tt].image;Ft?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t+1,0,0,Gt.width,Gt.height,kt,Mt,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t+1,Bt,Gt.width,Gt.height,0,kt,Mt,Gt.data)}}else{Ft?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,kt,Mt,yt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Bt,kt,Mt,yt[tt]);for(let _t=0;_t<$.length;_t++){const vt=$[_t];Ft?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t+1,0,0,kt,Mt,vt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,_t+1,Bt,kt,Mt,vt.image[tt])}}}m(b)&&f(i.TEXTURE_CUBE_MAP),K.__version=et.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function mt(C,b,H,Q,et,K){const At=r.convert(H.format,H.colorSpace),ht=r.convert(H.type),gt=y(H.internalFormat,At,ht,H.colorSpace),Vt=n.get(b),nt=n.get(H);if(nt.__renderTarget=b,!Vt.__hasExternalTextures){const yt=Math.max(1,b.width>>K),Nt=Math.max(1,b.height>>K);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,K,gt,yt,Nt,b.depth,0,At,ht,null):e.texImage2D(et,K,gt,yt,Nt,0,At,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),bt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,et,nt.__webglTexture,0,ft(b)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,et,nt.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ct(C,b,H){if(i.bindRenderbuffer(i.RENDERBUFFER,C),b.depthBuffer){const Q=b.depthTexture,et=Q&&Q.isDepthTexture?Q.type:null,K=v(b.stencilBuffer,et),At=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=ft(b);bt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,K,b.width,b.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,K,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,K,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,At,i.RENDERBUFFER,C)}else{const Q=b.textures;for(let et=0;et<Q.length;et++){const K=Q[et],At=r.convert(K.format,K.colorSpace),ht=r.convert(K.type),gt=y(K.internalFormat,At,ht,K.colorSpace),Vt=ft(b);H&&bt(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Vt,gt,b.width,b.height):bt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Vt,gt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,gt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(b.depthTexture);Q.__renderTarget=b,(!Q.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),j(b.depthTexture,0);const et=Q.__webglTexture,K=ft(b);if(b.depthTexture.format===ya)bt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(b.depthTexture.format===Hn)bt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function Pt(C){const b=n.get(C),H=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){const Q=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Q){const et=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Q.removeEventListener("dispose",et)};Q.addEventListener("dispose",et),b.__depthDisposeCallback=et}b.__boundDepthTexture=Q}if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Rt(b.__webglFramebuffer,C)}else if(H){b.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[Q]),b.__webglDepthbuffer[Q]===void 0)b.__webglDepthbuffer[Q]=i.createRenderbuffer(),ct(b.__webglDepthbuffer[Q],C,!1);else{const et=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ct(b.__webglDepthbuffer,C,!1);else{const Q=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function k(C,b,H){const Q=n.get(C);b!==void 0&&mt(Q.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Pt(C)}function G(C){const b=C.texture,H=n.get(C),Q=n.get(b);C.addEventListener("dispose",A);const et=C.textures,K=C.isWebGLCubeRenderTarget===!0,At=et.length>1;if(At||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=b.version,s.memory.textures++),K){H.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer[ht]=[];for(let gt=0;gt<b.mipmaps.length;gt++)H.__webglFramebuffer[ht][gt]=i.createFramebuffer()}else H.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer=[];for(let ht=0;ht<b.mipmaps.length;ht++)H.__webglFramebuffer[ht]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(At)for(let ht=0,gt=et.length;ht<gt;ht++){const Vt=n.get(et[ht]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=i.createTexture(),s.memory.textures++)}if(C.samples>0&&bt(C)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ht=0;ht<et.length;ht++){const gt=et[ht];H.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[ht]);const Vt=r.convert(gt.format,gt.colorSpace),nt=r.convert(gt.type),yt=y(gt.internalFormat,Vt,nt,gt.colorSpace,C.isXRRenderTarget===!0),Nt=ft(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,yt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,H.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ct(H.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),ut(i.TEXTURE_CUBE_MAP,b);for(let ht=0;ht<6;ht++)if(b.mipmaps&&b.mipmaps.length>0)for(let gt=0;gt<b.mipmaps.length;gt++)mt(H.__webglFramebuffer[ht][gt],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,gt);else mt(H.__webglFramebuffer[ht],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(b)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let ht=0,gt=et.length;ht<gt;ht++){const Vt=et[ht],nt=n.get(Vt);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),ut(i.TEXTURE_2D,Vt),mt(H.__webglFramebuffer,C,Vt,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,0),m(Vt)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ht=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,Q.__webglTexture),ut(ht,b),b.mipmaps&&b.mipmaps.length>0)for(let gt=0;gt<b.mipmaps.length;gt++)mt(H.__webglFramebuffer[gt],C,b,i.COLOR_ATTACHMENT0,ht,gt);else mt(H.__webglFramebuffer,C,b,i.COLOR_ATTACHMENT0,ht,0);m(b)&&f(ht),e.unbindTexture()}C.depthBuffer&&Pt(C)}function W(C){const b=C.textures;for(let H=0,Q=b.length;H<Q;H++){const et=b[H];if(m(et)){const K=S(C),At=n.get(et).__webglTexture;e.bindTexture(K,At),f(K),e.unbindTexture()}}}const wt=[],L=[];function St(C){if(C.samples>0){if(bt(C)===!1){const b=C.textures,H=C.width,Q=C.height;let et=i.COLOR_BUFFER_BIT;const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,At=n.get(C),ht=b.length>1;if(ht)for(let gt=0;gt<b.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let gt=0;gt<b.length;gt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,At.__webglColorRenderbuffer[gt]);const Vt=n.get(b[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Vt,0)}i.blitFramebuffer(0,0,H,Q,0,0,H,Q,et,i.NEAREST),l===!0&&(wt.length=0,L.length=0,wt.push(i.COLOR_ATTACHMENT0+gt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(wt.push(K),L.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,wt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let gt=0;gt<b.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,At.__webglColorRenderbuffer[gt]);const Vt=n.get(b[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,Vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const b=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function ft(C){return Math.min(a.maxSamples,C.samples)}function bt(C){const b=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Et(C){const b=s.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function $t(C,b){const H=C.colorSpace,Q=C.format,et=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||H!==Na&&H!==Wi&&(Kt.getTransfer(H)===oe?(Q!==ui||et!==Li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),b}function Ct(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=U,this.setTexture2D=j,this.setTexture2DArray=z,this.setTexture3D=Z,this.setTextureCube=V,this.rebindTextures=k,this.setupRenderTarget=G,this.updateRenderTargetMipmap=W,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=bt}function Sg(i,t){function e(n,a=Wi){let r;const s=Kt.getTransfer(a);if(n===Li)return i.UNSIGNED_BYTE;if(n===Fl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ol)return i.UNSIGNED_SHORT_5_5_5_1;if(n===od)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===rd)return i.BYTE;if(n===sd)return i.SHORT;if(n===ur)return i.UNSIGNED_SHORT;if(n===kl)return i.INT;if(n===On)return i.UNSIGNED_INT;if(n===Zi)return i.FLOAT;if(n===ri)return i.HALF_FLOAT;if(n===ld)return i.ALPHA;if(n===cd)return i.RGB;if(n===ui)return i.RGBA;if(n===hd)return i.LUMINANCE;if(n===dd)return i.LUMINANCE_ALPHA;if(n===ya)return i.DEPTH_COMPONENT;if(n===Hn)return i.DEPTH_STENCIL;if(n===ud)return i.RED;if(n===Bl)return i.RED_INTEGER;if(n===fd)return i.RG;if(n===Hl)return i.RG_INTEGER;if(n===Vl)return i.RGBA_INTEGER;if(n===rs||n===ss||n===os||n===ls)if(s===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===rs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ss)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===os)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===rs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ss)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===os)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ls)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$o||n===Zo||n===Jo||n===Ko)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$o)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Zo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ko)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qo||n===tl||n===el)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qo||n===tl)return s===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===el)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===il||n===nl||n===al||n===rl||n===sl||n===ol||n===ll||n===cl||n===hl||n===dl||n===ul||n===fl||n===pl||n===ml)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===il)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===nl)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===al)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===rl)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sl)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ol)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ll)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===cl)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hl)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===dl)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ul)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fl)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===pl)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ml)return s===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cs||n===gl||n===vl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===cs)return s===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===gl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pd||n===xl||n===wl||n===_l)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===cs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===xl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===_l)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Bn?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Eg extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Se extends Me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Tg={type:"move"};class mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let a=null,r=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){s=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=e.getPose(t.targetRaySpace,n),a===null&&r!==null&&(a=r),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tg)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Se;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Ag=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cg=`
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

}`;class Rg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const a=new Pe,r=t.properties.get(a);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ue({vertexShader:Ag,fragmentShader:Cg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Tt(new he(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Pg extends jn{constructor(t,e){super();const n=this;let a=null,r=1,s=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null;const x=new Rg,m=e.getContextAttributes();let f=null,S=null;const y=[],v=[],P=new ot;let E=null;const A=new Oe;A.viewport=new le;const D=new Oe;D.viewport=new le;const _=[A,D],w=new Eg;let T=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let it=y[J];return it===void 0&&(it=new mo,y[J]=it),it.getTargetRaySpace()},this.getControllerGrip=function(J){let it=y[J];return it===void 0&&(it=new mo,y[J]=it),it.getGripSpace()},this.getHand=function(J){let it=y[J];return it===void 0&&(it=new mo,y[J]=it),it.getHandSpace()};function B(J){const it=v.indexOf(J.inputSource);if(it===-1)return;const mt=y[it];mt!==void 0&&(mt.update(J.inputSource,J.frame,c||s),mt.dispatchEvent({type:J.type,data:J.inputSource}))}function N(){a.removeEventListener("select",B),a.removeEventListener("selectstart",B),a.removeEventListener("selectend",B),a.removeEventListener("squeeze",B),a.removeEventListener("squeezestart",B),a.removeEventListener("squeezeend",B),a.removeEventListener("end",N),a.removeEventListener("inputsourceschange",j);for(let J=0;J<y.length;J++){const it=v[J];it!==null&&(v[J]=null,y[J].disconnect(it))}T=null,U=null,x.reset(),t.setRenderTarget(f),p=null,u=null,d=null,a=null,S=null,Ot.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(J){if(a=J,a!==null){if(f=t.getRenderTarget(),a.addEventListener("select",B),a.addEventListener("selectstart",B),a.addEventListener("selectend",B),a.addEventListener("squeeze",B),a.addEventListener("squeezestart",B),a.addEventListener("squeezeend",B),a.addEventListener("end",N),a.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(P),a.renderState.layers===void 0){const it={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(a,e,it),a.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new qe(p.framebufferWidth,p.framebufferHeight,{format:ui,type:Li,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let it=null,mt=null,ct=null;m.depth&&(ct=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=m.stencil?Hn:ya,mt=m.stencil?Bn:On);const Rt={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};d=new XRWebGLBinding(a,e),u=d.createProjectionLayer(Rt),a.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new qe(u.textureWidth,u.textureHeight,{format:ui,type:Li,depthTexture:new Yl(u.textureWidth,u.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await a.requestReferenceSpace(o),Ot.setContext(a),Ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function j(J){for(let it=0;it<J.removed.length;it++){const mt=J.removed[it],ct=v.indexOf(mt);ct>=0&&(v[ct]=null,y[ct].disconnect(mt))}for(let it=0;it<J.added.length;it++){const mt=J.added[it];let ct=v.indexOf(mt);if(ct===-1){for(let Pt=0;Pt<y.length;Pt++)if(Pt>=v.length){v.push(mt),ct=Pt;break}else if(v[Pt]===null){v[Pt]=mt,ct=Pt;break}if(ct===-1)break}const Rt=y[ct];Rt&&Rt.connect(mt)}}const z=new R,Z=new R;function V(J,it,mt){z.setFromMatrixPosition(it.matrixWorld),Z.setFromMatrixPosition(mt.matrixWorld);const ct=z.distanceTo(Z),Rt=it.projectionMatrix.elements,Pt=mt.projectionMatrix.elements,k=Rt[14]/(Rt[10]-1),G=Rt[14]/(Rt[10]+1),W=(Rt[9]+1)/Rt[5],wt=(Rt[9]-1)/Rt[5],L=(Rt[8]-1)/Rt[0],St=(Pt[8]+1)/Pt[0],ft=k*L,bt=k*St,Et=ct/(-L+St),$t=Et*-L;if(it.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX($t),J.translateZ(Et),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Rt[10]===-1)J.projectionMatrix.copy(it.projectionMatrix),J.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const Ct=k+Et,C=G+Et,b=ft-$t,H=bt+(ct-$t),Q=W*G/C*Ct,et=wt*G/C*Ct;J.projectionMatrix.makePerspective(b,H,Q,et,Ct,C),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Y(J,it){it===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(it.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(a===null)return;let it=J.near,mt=J.far;x.texture!==null&&(x.depthNear>0&&(it=x.depthNear),x.depthFar>0&&(mt=x.depthFar)),w.near=D.near=A.near=it,w.far=D.far=A.far=mt,(T!==w.near||U!==w.far)&&(a.updateRenderState({depthNear:w.near,depthFar:w.far}),T=w.near,U=w.far),A.layers.mask=J.layers.mask|2,D.layers.mask=J.layers.mask|4,w.layers.mask=A.layers.mask|D.layers.mask;const ct=J.parent,Rt=w.cameras;Y(w,ct);for(let Pt=0;Pt<Rt.length;Pt++)Y(Rt[Pt],ct);Rt.length===2?V(w,A,D):w.projectionMatrix.copy(A.projectionMatrix),at(J,w,ct)};function at(J,it,mt){mt===null?J.matrix.copy(it.matrixWorld):(J.matrix.copy(mt.matrixWorld),J.matrix.invert(),J.matrix.multiply(it.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(it.projectionMatrix),J.projectionMatrixInverse.copy(it.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Pa*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(w)};let st=null;function ut(J,it){if(h=it.getViewerPose(c||s),g=it,h!==null){const mt=h.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let ct=!1;mt.length!==w.cameras.length&&(w.cameras.length=0,ct=!0);for(let Pt=0;Pt<mt.length;Pt++){const k=mt[Pt];let G=null;if(p!==null)G=p.getViewport(k);else{const wt=d.getViewSubImage(u,k);G=wt.viewport,Pt===0&&(t.setRenderTargetTextures(S,wt.colorTexture,u.ignoreDepthValues?void 0:wt.depthStencilTexture),t.setRenderTarget(S))}let W=_[Pt];W===void 0&&(W=new Oe,W.layers.enable(Pt),W.viewport=new le,_[Pt]=W),W.matrix.fromArray(k.transform.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale),W.projectionMatrix.fromArray(k.projectionMatrix),W.projectionMatrixInverse.copy(W.projectionMatrix).invert(),W.viewport.set(G.x,G.y,G.width,G.height),Pt===0&&(w.matrix.copy(W.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),ct===!0&&w.cameras.push(W)}const Rt=a.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const Pt=d.getDepthInformation(mt[0]);Pt&&Pt.isValid&&Pt.texture&&x.init(t,Pt,a.renderState)}}for(let mt=0;mt<y.length;mt++){const ct=v[mt],Rt=y[mt];ct!==null&&Rt!==void 0&&Rt.update(ct,it,c||s)}st&&st(J,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const Ot=new Td;Ot.setAnimationLoop(ut),this.setAnimationLoop=function(J){st=J},this.dispose=function(){}}}const Pn=new ze,Lg=new ee;function Dg(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Md(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function a(m,f,S,y,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(s(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,S,y):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ve&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ve&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=t.get(f),y=S.envMap,v=S.envMapRotation;y&&(m.envMap.value=y,Pn.copy(v),Pn.x*=-1,Pn.y*=-1,Pn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Pn.y*=-1,Pn.z*=-1),m.envMapRotation.value.setFromMatrix4(Lg.makeRotationFromEuler(Pn)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function s(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,S,y){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=y*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ve&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const S=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:a}}function Ug(i,t,e,n){let a={},r={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,y){const v=y.program;n.uniformBlockBinding(S,v)}function c(S,y){let v=a[S.id];v===void 0&&(g(S),v=h(S),a[S.id]=v,S.addEventListener("dispose",m));const P=y.program;n.updateUBOMapping(S,P);const E=t.render.frame;r[S.id]!==E&&(u(S),r[S.id]=E)}function h(S){const y=d();S.__bindingPointIndex=y;const v=i.createBuffer(),P=S.__size,E=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,P,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,v),v}function d(){for(let S=0;S<o;S++)if(s.indexOf(S)===-1)return s.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const y=a[S.id],v=S.uniforms,P=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,A=v.length;E<A;E++){const D=Array.isArray(v[E])?v[E]:[v[E]];for(let _=0,w=D.length;_<w;_++){const T=D[_];if(p(T,E,_,P)===!0){const U=T.__offset,B=Array.isArray(T.value)?T.value:[T.value];let N=0;for(let j=0;j<B.length;j++){const z=B[j],Z=x(z);typeof z=="number"||typeof z=="boolean"?(T.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,U+N,T.__data)):z.isMatrix3?(T.__data[0]=z.elements[0],T.__data[1]=z.elements[1],T.__data[2]=z.elements[2],T.__data[3]=0,T.__data[4]=z.elements[3],T.__data[5]=z.elements[4],T.__data[6]=z.elements[5],T.__data[7]=0,T.__data[8]=z.elements[6],T.__data[9]=z.elements[7],T.__data[10]=z.elements[8],T.__data[11]=0):(z.toArray(T.__data,N),N+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,T.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(S,y,v,P){const E=S.value,A=y+"_"+v;if(P[A]===void 0)return typeof E=="number"||typeof E=="boolean"?P[A]=E:P[A]=E.clone(),!0;{const D=P[A];if(typeof E=="number"||typeof E=="boolean"){if(D!==E)return P[A]=E,!0}else if(D.equals(E)===!1)return D.copy(E),!0}return!1}function g(S){const y=S.uniforms;let v=0;const P=16;for(let A=0,D=y.length;A<D;A++){const _=Array.isArray(y[A])?y[A]:[y[A]];for(let w=0,T=_.length;w<T;w++){const U=_[w],B=Array.isArray(U.value)?U.value:[U.value];for(let N=0,j=B.length;N<j;N++){const z=B[N],Z=x(z),V=v%P,Y=V%Z.boundary,at=V+Y;v+=Y,at!==0&&P-at<Z.storage&&(v+=P-at),U.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=Z.storage}}}const E=v%P;return E>0&&(v+=P-E),S.__size=v,S.__cache={},this}function x(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){const y=S.target;y.removeEventListener("dispose",m);const v=s.indexOf(y.__bindingPointIndex);s.splice(v,1),i.deleteBuffer(a[y.id]),delete a[y.id],delete r[y.id]}function f(){for(const S in a)i.deleteBuffer(a[S]);s=[],a={},r={}}return{bind:l,update:c,dispose:f}}class Ig{constructor(t={}){const{canvas:e=Mf(),context:n=null,depth:a=!0,stencil:r=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=s;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,f=null;const S=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ve,this.toneMapping=Ri,this.toneMappingExposure=1;const v=this;let P=!1,E=0,A=0,D=null,_=-1,w=null;const T=new le,U=new le;let B=null;const N=new It(0);let j=0,z=e.width,Z=e.height,V=1,Y=null,at=null;const st=new le(0,0,z,Z),ut=new le(0,0,z,Z);let Ot=!1;const J=new Xl;let it=!1,mt=!1;const ct=new ee,Rt=new ee,Pt=new R,k=new le,G={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let W=!1;function wt(){return D===null?V:1}let L=n;function St(M,F){return e.getContext(M,F)}try{const M={alpha:!0,depth:a,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Il}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",_t,!1),e.addEventListener("webglcontextcreationerror",vt,!1),L===null){const F="webgl2";if(L=St(F,M),L===null)throw St(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let ft,bt,Et,$t,Ct,C,b,H,Q,et,K,At,ht,gt,Vt,nt,yt,Nt,kt,Mt,Bt,Ft,Zt,I;function dt(){ft=new Om(L),ft.init(),Ft=new Sg(L,ft),bt=new Um(L,ft,t,Ft),Et=new bg(L,ft),bt.reverseDepthBuffer&&u&&Et.buffers.depth.setReversed(!0),$t=new Vm(L),Ct=new sg,C=new Mg(L,ft,Et,Ct,bt,Ft,$t),b=new zm(v),H=new Fm(v),Q=new $f(L),Zt=new Lm(L,Q),et=new Bm(L,Q,$t,Zt),K=new Wm(L,et,Q,$t),kt=new Gm(L,bt,C),nt=new Im(Ct),At=new rg(v,b,H,ft,bt,Zt,nt),ht=new Dg(v,Ct),gt=new lg,Vt=new pg(ft),Nt=new Pm(v,b,H,Et,K,p,l),yt=new wg(v,K,bt),I=new Ug(L,$t,bt,Et),Mt=new Dm(L,ft,$t),Bt=new Hm(L,ft,$t),$t.programs=At.programs,v.capabilities=bt,v.extensions=ft,v.properties=Ct,v.renderLists=gt,v.shadowMap=yt,v.state=Et,v.info=$t}dt();const $=new Pg(v,L);this.xr=$,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const M=ft.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ft.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(M){M!==void 0&&(V=M,this.setSize(z,Z,!1))},this.getSize=function(M){return M.set(z,Z)},this.setSize=function(M,F,X=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=M,Z=F,e.width=Math.floor(M*V),e.height=Math.floor(F*V),X===!0&&(e.style.width=M+"px",e.style.height=F+"px"),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(z*V,Z*V).floor()},this.setDrawingBufferSize=function(M,F,X){z=M,Z=F,V=X,e.width=Math.floor(M*X),e.height=Math.floor(F*X),this.setViewport(0,0,M,F)},this.getCurrentViewport=function(M){return M.copy(T)},this.getViewport=function(M){return M.copy(st)},this.setViewport=function(M,F,X,q){M.isVector4?st.set(M.x,M.y,M.z,M.w):st.set(M,F,X,q),Et.viewport(T.copy(st).multiplyScalar(V).round())},this.getScissor=function(M){return M.copy(ut)},this.setScissor=function(M,F,X,q){M.isVector4?ut.set(M.x,M.y,M.z,M.w):ut.set(M,F,X,q),Et.scissor(U.copy(ut).multiplyScalar(V).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(M){Et.setScissorTest(Ot=M)},this.setOpaqueSort=function(M){Y=M},this.setTransparentSort=function(M){at=M},this.getClearColor=function(M){return M.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(M=!0,F=!0,X=!0){let q=0;if(M){let O=!1;if(D!==null){const lt=D.texture.format;O=lt===Vl||lt===Hl||lt===Bl}if(O){const lt=D.texture.type,xt=lt===Li||lt===On||lt===ur||lt===Bn||lt===Fl||lt===Ol,Lt=Nt.getClearColor(),Dt=Nt.getClearAlpha(),Ht=Lt.r,Wt=Lt.g,Ut=Lt.b;xt?(g[0]=Ht,g[1]=Wt,g[2]=Ut,g[3]=Dt,L.clearBufferuiv(L.COLOR,0,g)):(x[0]=Ht,x[1]=Wt,x[2]=Ut,x[3]=Dt,L.clearBufferiv(L.COLOR,0,x))}else q|=L.COLOR_BUFFER_BIT}F&&(q|=L.DEPTH_BUFFER_BIT),X&&(q|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",_t,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),gt.dispose(),Vt.dispose(),Ct.dispose(),b.dispose(),H.dispose(),K.dispose(),Zt.dispose(),I.dispose(),At.dispose(),$.dispose(),$.removeEventListener("sessionstart",Mc),$.removeEventListener("sessionend",Sc),Sn.stop()};function tt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function _t(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const M=$t.autoReset,F=yt.enabled,X=yt.autoUpdate,q=yt.needsUpdate,O=yt.type;dt(),$t.autoReset=M,yt.enabled=F,yt.autoUpdate=X,yt.needsUpdate=q,yt.type=O}function vt(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Gt(M){const F=M.target;F.removeEventListener("dispose",Gt),xe(F)}function xe(M){Ne(M),Ct.remove(M)}function Ne(M){const F=Ct.get(M).programs;F!==void 0&&(F.forEach(function(X){At.releaseProgram(X)}),M.isShaderMaterial&&At.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,X,q,O,lt){F===null&&(F=G);const xt=O.isMesh&&O.matrixWorld.determinant()<0,Lt=yu(M,F,X,q,O);Et.setMaterial(q,xt);let Dt=X.index,Ht=1;if(q.wireframe===!0){if(Dt=et.getWireframeAttribute(X),Dt===void 0)return;Ht=2}const Wt=X.drawRange,Ut=X.attributes.position;let Qt=Wt.start*Ht,de=(Wt.start+Wt.count)*Ht;lt!==null&&(Qt=Math.max(Qt,lt.start*Ht),de=Math.min(de,(lt.start+lt.count)*Ht)),Dt!==null?(Qt=Math.max(Qt,0),de=Math.min(de,Dt.count)):Ut!=null&&(Qt=Math.max(Qt,0),de=Math.min(de,Ut.count));const pe=de-Qt;if(pe<0||pe===1/0)return;Zt.setup(O,q,Lt,X,Dt);let Ye,ie=Mt;if(Dt!==null&&(Ye=Q.get(Dt),ie=Bt,ie.setIndex(Ye)),O.isMesh)q.wireframe===!0?(Et.setLineWidth(q.wireframeLinewidth*wt()),ie.setMode(L.LINES)):ie.setMode(L.TRIANGLES);else if(O.isLine){let zt=q.linewidth;zt===void 0&&(zt=1),Et.setLineWidth(zt*wt()),O.isLineSegments?ie.setMode(L.LINES):O.isLineLoop?ie.setMode(L.LINE_LOOP):ie.setMode(L.LINE_STRIP)}else O.isPoints?ie.setMode(L.POINTS):O.isSprite&&ie.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ie.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(ft.get("WEBGL_multi_draw"))ie.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const zt=O._multiDrawStarts,zi=O._multiDrawCounts,ne=O._multiDrawCount,pi=Dt?Q.get(Dt).bytesPerElement:1,$n=Ct.get(q).currentProgram.getUniforms();for(let ei=0;ei<ne;ei++)$n.setValue(L,"_gl_DrawID",ei),ie.render(zt[ei]/pi,zi[ei])}else if(O.isInstancedMesh)ie.renderInstances(Qt,pe,O.count);else if(X.isInstancedBufferGeometry){const zt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,zi=Math.min(X.instanceCount,zt);ie.renderInstances(Qt,pe,zi)}else ie.render(Qt,pe)};function re(M,F,X){M.transparent===!0&&M.side===Be&&M.forceSinglePass===!1?(M.side=Ve,M.needsUpdate=!0,Sr(M,F,X),M.side=bn,M.needsUpdate=!0,Sr(M,F,X),M.side=Be):Sr(M,F,X)}this.compile=function(M,F,X=null){X===null&&(X=M),f=Vt.get(X),f.init(F),y.push(f),X.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),M!==X&&M.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights();const q=new Set;return M.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const lt=O.material;if(lt)if(Array.isArray(lt))for(let xt=0;xt<lt.length;xt++){const Lt=lt[xt];re(Lt,X,O),q.add(Lt)}else re(lt,X,O),q.add(lt)}),y.pop(),f=null,q},this.compileAsync=function(M,F,X=null){const q=this.compile(M,F,X);return new Promise(O=>{function lt(){if(q.forEach(function(xt){Ct.get(xt).currentProgram.isReady()&&q.delete(xt)}),q.size===0){O(M);return}setTimeout(lt,10)}ft.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let fi=null;function Ii(M){fi&&fi(M)}function Mc(){Sn.stop()}function Sc(){Sn.start()}const Sn=new Td;Sn.setAnimationLoop(Ii),typeof self<"u"&&Sn.setContext(self),this.setAnimationLoop=function(M){fi=M,$.setAnimationLoop(M),M===null?Sn.stop():Sn.start()},$.addEventListener("sessionstart",Mc),$.addEventListener("sessionend",Sc),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(F),F=$.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,F,D),f=Vt.get(M,y.length),f.init(F),y.push(f),Rt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),J.setFromProjectionMatrix(Rt),mt=this.localClippingEnabled,it=nt.init(this.clippingPlanes,mt),m=gt.get(M,S.length),m.init(),S.push(m),$.enabled===!0&&$.isPresenting===!0){const lt=v.xr.getDepthSensingMesh();lt!==null&&Bs(lt,F,-1/0,v.sortObjects)}Bs(M,F,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Y,at),W=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,W&&Nt.addToRenderList(m,M),this.info.render.frame++,it===!0&&nt.beginShadows();const X=f.state.shadowsArray;yt.render(X,M,F),it===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,O=m.transmissive;if(f.setupLights(),F.isArrayCamera){const lt=F.cameras;if(O.length>0)for(let xt=0,Lt=lt.length;xt<Lt;xt++){const Dt=lt[xt];Tc(q,O,M,Dt)}W&&Nt.render(M);for(let xt=0,Lt=lt.length;xt<Lt;xt++){const Dt=lt[xt];Ec(m,M,Dt,Dt.viewport)}}else O.length>0&&Tc(q,O,M,F),W&&Nt.render(M),Ec(m,M,F);D!==null&&(C.updateMultisampleRenderTarget(D),C.updateRenderTargetMipmap(D)),M.isScene===!0&&M.onAfterRender(v,M,F),Zt.resetDefaultState(),_=-1,w=null,y.pop(),y.length>0?(f=y[y.length-1],it===!0&&nt.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Bs(M,F,X,q){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)X=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLight)f.pushLight(M),M.castShadow&&f.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||J.intersectsSprite(M)){q&&k.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Rt);const xt=K.update(M),Lt=M.material;Lt.visible&&m.push(M,xt,Lt,X,k.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||J.intersectsObject(M))){const xt=K.update(M),Lt=M.material;if(q&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),k.copy(M.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),k.copy(xt.boundingSphere.center)),k.applyMatrix4(M.matrixWorld).applyMatrix4(Rt)),Array.isArray(Lt)){const Dt=xt.groups;for(let Ht=0,Wt=Dt.length;Ht<Wt;Ht++){const Ut=Dt[Ht],Qt=Lt[Ut.materialIndex];Qt&&Qt.visible&&m.push(M,xt,Qt,X,k.z,Ut)}}else Lt.visible&&m.push(M,xt,Lt,X,k.z,null)}}const lt=M.children;for(let xt=0,Lt=lt.length;xt<Lt;xt++)Bs(lt[xt],F,X,q)}function Ec(M,F,X,q){const O=M.opaque,lt=M.transmissive,xt=M.transparent;f.setupLightsView(X),it===!0&&nt.setGlobalState(v.clippingPlanes,X),q&&Et.viewport(T.copy(q)),O.length>0&&Mr(O,F,X),lt.length>0&&Mr(lt,F,X),xt.length>0&&Mr(xt,F,X),Et.buffers.depth.setTest(!0),Et.buffers.depth.setMask(!0),Et.buffers.color.setMask(!0),Et.setPolygonOffset(!1)}function Tc(M,F,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[q.id]===void 0&&(f.state.transmissionRenderTarget[q.id]=new qe(1,1,{generateMipmaps:!0,type:ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float")?ri:Li,minFilter:$i,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const lt=f.state.transmissionRenderTarget[q.id],xt=q.viewport||T;lt.setSize(xt.z,xt.w);const Lt=v.getRenderTarget();v.setRenderTarget(lt),v.getClearColor(N),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),W&&Nt.render(X);const Dt=v.toneMapping;v.toneMapping=Ri;const Ht=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),f.setupLightsView(q),it===!0&&nt.setGlobalState(v.clippingPlanes,q),Mr(M,X,q),C.updateMultisampleRenderTarget(lt),C.updateRenderTargetMipmap(lt),ft.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Ut=0,Qt=F.length;Ut<Qt;Ut++){const de=F[Ut],pe=de.object,Ye=de.geometry,ie=de.material,zt=de.group;if(ie.side===Be&&pe.layers.test(q.layers)){const zi=ie.side;ie.side=Ve,ie.needsUpdate=!0,Ac(pe,X,q,Ye,ie,zt),ie.side=zi,ie.needsUpdate=!0,Wt=!0}}Wt===!0&&(C.updateMultisampleRenderTarget(lt),C.updateRenderTargetMipmap(lt))}v.setRenderTarget(Lt),v.setClearColor(N,j),Ht!==void 0&&(q.viewport=Ht),v.toneMapping=Dt}function Mr(M,F,X){const q=F.isScene===!0?F.overrideMaterial:null;for(let O=0,lt=M.length;O<lt;O++){const xt=M[O],Lt=xt.object,Dt=xt.geometry,Ht=q===null?xt.material:q,Wt=xt.group;Lt.layers.test(X.layers)&&Ac(Lt,F,X,Dt,Ht,Wt)}}function Ac(M,F,X,q,O,lt){M.onBeforeRender(v,F,X,q,O,lt),M.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),O.onBeforeRender(v,F,X,q,M,lt),O.transparent===!0&&O.side===Be&&O.forceSinglePass===!1?(O.side=Ve,O.needsUpdate=!0,v.renderBufferDirect(X,F,q,O,M,lt),O.side=bn,O.needsUpdate=!0,v.renderBufferDirect(X,F,q,O,M,lt),O.side=Be):v.renderBufferDirect(X,F,q,O,M,lt),M.onAfterRender(v,F,X,q,O,lt)}function Sr(M,F,X){F.isScene!==!0&&(F=G);const q=Ct.get(M),O=f.state.lights,lt=f.state.shadowsArray,xt=O.state.version,Lt=At.getParameters(M,O.state,lt,F,X),Dt=At.getProgramCacheKey(Lt);let Ht=q.programs;q.environment=M.isMeshStandardMaterial?F.environment:null,q.fog=F.fog,q.envMap=(M.isMeshStandardMaterial?H:b).get(M.envMap||q.environment),q.envMapRotation=q.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,Ht===void 0&&(M.addEventListener("dispose",Gt),Ht=new Map,q.programs=Ht);let Wt=Ht.get(Dt);if(Wt!==void 0){if(q.currentProgram===Wt&&q.lightsStateVersion===xt)return Rc(M,Lt),Wt}else Lt.uniforms=At.getUniforms(M),M.onBeforeCompile(Lt,v),Wt=At.acquireProgram(Lt,Dt),Ht.set(Dt,Wt),q.uniforms=Lt.uniforms;const Ut=q.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ut.clippingPlanes=nt.uniform),Rc(M,Lt),q.needsLights=Su(M),q.lightsStateVersion=xt,q.needsLights&&(Ut.ambientLightColor.value=O.state.ambient,Ut.lightProbe.value=O.state.probe,Ut.directionalLights.value=O.state.directional,Ut.directionalLightShadows.value=O.state.directionalShadow,Ut.spotLights.value=O.state.spot,Ut.spotLightShadows.value=O.state.spotShadow,Ut.rectAreaLights.value=O.state.rectArea,Ut.ltc_1.value=O.state.rectAreaLTC1,Ut.ltc_2.value=O.state.rectAreaLTC2,Ut.pointLights.value=O.state.point,Ut.pointLightShadows.value=O.state.pointShadow,Ut.hemisphereLights.value=O.state.hemi,Ut.directionalShadowMap.value=O.state.directionalShadowMap,Ut.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ut.spotShadowMap.value=O.state.spotShadowMap,Ut.spotLightMatrix.value=O.state.spotLightMatrix,Ut.spotLightMap.value=O.state.spotLightMap,Ut.pointShadowMap.value=O.state.pointShadowMap,Ut.pointShadowMatrix.value=O.state.pointShadowMatrix),q.currentProgram=Wt,q.uniformsList=null,Wt}function Cc(M){if(M.uniformsList===null){const F=M.currentProgram.getUniforms();M.uniformsList=hs.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function Rc(M,F){const X=Ct.get(M);X.outputColorSpace=F.outputColorSpace,X.batching=F.batching,X.batchingColor=F.batchingColor,X.instancing=F.instancing,X.instancingColor=F.instancingColor,X.instancingMorph=F.instancingMorph,X.skinning=F.skinning,X.morphTargets=F.morphTargets,X.morphNormals=F.morphNormals,X.morphColors=F.morphColors,X.morphTargetsCount=F.morphTargetsCount,X.numClippingPlanes=F.numClippingPlanes,X.numIntersection=F.numClipIntersection,X.vertexAlphas=F.vertexAlphas,X.vertexTangents=F.vertexTangents,X.toneMapping=F.toneMapping}function yu(M,F,X,q,O){F.isScene!==!0&&(F=G),C.resetTextureUnits();const lt=F.fog,xt=q.isMeshStandardMaterial?F.environment:null,Lt=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Na,Dt=(q.isMeshStandardMaterial?H:b).get(q.envMap||xt),Ht=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Wt=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ut=!!X.morphAttributes.position,Qt=!!X.morphAttributes.normal,de=!!X.morphAttributes.color;let pe=Ri;q.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(pe=v.toneMapping);const Ye=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ie=Ye!==void 0?Ye.length:0,zt=Ct.get(q),zi=f.state.lights;if(it===!0&&(mt===!0||M!==w)){const si=M===w&&q.id===_;nt.setState(q,M,si)}let ne=!1;q.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==zi.state.version||zt.outputColorSpace!==Lt||O.isBatchedMesh&&zt.batching===!1||!O.isBatchedMesh&&zt.batching===!0||O.isBatchedMesh&&zt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&zt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&zt.instancing===!1||!O.isInstancedMesh&&zt.instancing===!0||O.isSkinnedMesh&&zt.skinning===!1||!O.isSkinnedMesh&&zt.skinning===!0||O.isInstancedMesh&&zt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&zt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&zt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&zt.instancingMorph===!1&&O.morphTexture!==null||zt.envMap!==Dt||q.fog===!0&&zt.fog!==lt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==nt.numPlanes||zt.numIntersection!==nt.numIntersection)||zt.vertexAlphas!==Ht||zt.vertexTangents!==Wt||zt.morphTargets!==Ut||zt.morphNormals!==Qt||zt.morphColors!==de||zt.toneMapping!==pe||zt.morphTargetsCount!==ie)&&(ne=!0):(ne=!0,zt.__version=q.version);let pi=zt.currentProgram;ne===!0&&(pi=Sr(q,F,O));let $n=!1,ei=!1,Ha=!1;const me=pi.getUniforms(),Mi=zt.uniforms;if(Et.useProgram(pi.program)&&($n=!0,ei=!0,Ha=!0),q.id!==_&&(_=q.id,ei=!0),$n||w!==M){Et.buffers.depth.getReversed()?(ct.copy(M.projectionMatrix),Ef(ct),Tf(ct),me.setValue(L,"projectionMatrix",ct)):me.setValue(L,"projectionMatrix",M.projectionMatrix),me.setValue(L,"viewMatrix",M.matrixWorldInverse);const an=me.map.cameraPosition;an!==void 0&&an.setValue(L,Pt.setFromMatrixPosition(M.matrixWorld)),bt.logarithmicDepthBuffer&&me.setValue(L,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&me.setValue(L,"isOrthographic",M.isOrthographicCamera===!0),w!==M&&(w=M,ei=!0,Ha=!0)}if(O.isSkinnedMesh){me.setOptional(L,O,"bindMatrix"),me.setOptional(L,O,"bindMatrixInverse");const si=O.skeleton;si&&(si.boneTexture===null&&si.computeBoneTexture(),me.setValue(L,"boneTexture",si.boneTexture,C))}O.isBatchedMesh&&(me.setOptional(L,O,"batchingTexture"),me.setValue(L,"batchingTexture",O._matricesTexture,C),me.setOptional(L,O,"batchingIdTexture"),me.setValue(L,"batchingIdTexture",O._indirectTexture,C),me.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&me.setValue(L,"batchingColorTexture",O._colorsTexture,C));const Va=X.morphAttributes;if((Va.position!==void 0||Va.normal!==void 0||Va.color!==void 0)&&kt.update(O,X,pi),(ei||zt.receiveShadow!==O.receiveShadow)&&(zt.receiveShadow=O.receiveShadow,me.setValue(L,"receiveShadow",O.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Mi.envMap.value=Dt,Mi.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&F.environment!==null&&(Mi.envMapIntensity.value=F.environmentIntensity),ei&&(me.setValue(L,"toneMappingExposure",v.toneMappingExposure),zt.needsLights&&Mu(Mi,Ha),lt&&q.fog===!0&&ht.refreshFogUniforms(Mi,lt),ht.refreshMaterialUniforms(Mi,q,V,Z,f.state.transmissionRenderTarget[M.id]),hs.upload(L,Cc(zt),Mi,C)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(hs.upload(L,Cc(zt),Mi,C),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&me.setValue(L,"center",O.center),me.setValue(L,"modelViewMatrix",O.modelViewMatrix),me.setValue(L,"normalMatrix",O.normalMatrix),me.setValue(L,"modelMatrix",O.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const si=q.uniformsGroups;for(let an=0,rn=si.length;an<rn;an++){const Pc=si[an];I.update(Pc,pi),I.bind(Pc,pi)}}return pi}function Mu(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function Su(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(M,F,X){Ct.get(M.texture).__webglTexture=F,Ct.get(M.depthTexture).__webglTexture=X;const q=Ct.get(M);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,F){const X=Ct.get(M);X.__webglFramebuffer=F,X.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(M,F=0,X=0){D=M,E=F,A=X;let q=!0,O=null,lt=!1,xt=!1;if(M){const Dt=Ct.get(M);if(Dt.__useDefaultFramebuffer!==void 0)Et.bindFramebuffer(L.FRAMEBUFFER,null),q=!1;else if(Dt.__webglFramebuffer===void 0)C.setupRenderTarget(M);else if(Dt.__hasExternalTextures)C.rebindTextures(M,Ct.get(M.texture).__webglTexture,Ct.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ut=M.depthTexture;if(Dt.__boundDepthTexture!==Ut){if(Ut!==null&&Ct.has(Ut)&&(M.width!==Ut.image.width||M.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(M)}}const Ht=M.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(xt=!0);const Wt=Ct.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Wt[F])?O=Wt[F][X]:O=Wt[F],lt=!0):M.samples>0&&C.useMultisampledRTT(M)===!1?O=Ct.get(M).__webglMultisampledFramebuffer:Array.isArray(Wt)?O=Wt[X]:O=Wt,T.copy(M.viewport),U.copy(M.scissor),B=M.scissorTest}else T.copy(st).multiplyScalar(V).floor(),U.copy(ut).multiplyScalar(V).floor(),B=Ot;if(Et.bindFramebuffer(L.FRAMEBUFFER,O)&&q&&Et.drawBuffers(M,O),Et.viewport(T),Et.scissor(U),Et.setScissorTest(B),lt){const Dt=Ct.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,Dt.__webglTexture,X)}else if(xt){const Dt=Ct.get(M.texture),Ht=F||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Dt.__webglTexture,X||0,Ht)}_=-1},this.readRenderTargetPixels=function(M,F,X,q,O,lt,xt){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=Ct.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xt!==void 0&&(Lt=Lt[xt]),Lt){Et.bindFramebuffer(L.FRAMEBUFFER,Lt);try{const Dt=M.texture,Ht=Dt.format,Wt=Dt.type;if(!bt.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!bt.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-q&&X>=0&&X<=M.height-O&&L.readPixels(F,X,q,O,Ft.convert(Ht),Ft.convert(Wt),lt)}finally{const Dt=D!==null?Ct.get(D).__webglFramebuffer:null;Et.bindFramebuffer(L.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(M,F,X,q,O,lt,xt){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=Ct.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xt!==void 0&&(Lt=Lt[xt]),Lt){const Dt=M.texture,Ht=Dt.format,Wt=Dt.type;if(!bt.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!bt.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=M.width-q&&X>=0&&X<=M.height-O){Et.bindFramebuffer(L.FRAMEBUFFER,Lt);const Ut=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ut),L.bufferData(L.PIXEL_PACK_BUFFER,lt.byteLength,L.STREAM_READ),L.readPixels(F,X,q,O,Ft.convert(Ht),Ft.convert(Wt),0);const Qt=D!==null?Ct.get(D).__webglFramebuffer:null;Et.bindFramebuffer(L.FRAMEBUFFER,Qt);const de=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Sf(L,de,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ut),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,lt),L.deleteBuffer(Ut),L.deleteSync(de),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,F=null,X=0){M.isTexture!==!0&&(tr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,M=arguments[1]);const q=Math.pow(2,-X),O=Math.floor(M.image.width*q),lt=Math.floor(M.image.height*q),xt=F!==null?F.x:0,Lt=F!==null?F.y:0;C.setTexture2D(M,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,xt,Lt,O,lt),Et.unbindTexture()},this.copyTextureToTexture=function(M,F,X=null,q=null,O=0){M.isTexture!==!0&&(tr("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,M=arguments[1],F=arguments[2],O=arguments[3]||0,X=null);let lt,xt,Lt,Dt,Ht,Wt,Ut,Qt,de;const pe=M.isCompressedTexture?M.mipmaps[O]:M.image;X!==null?(lt=X.max.x-X.min.x,xt=X.max.y-X.min.y,Lt=X.isBox3?X.max.z-X.min.z:1,Dt=X.min.x,Ht=X.min.y,Wt=X.isBox3?X.min.z:0):(lt=pe.width,xt=pe.height,Lt=pe.depth||1,Dt=0,Ht=0,Wt=0),q!==null?(Ut=q.x,Qt=q.y,de=q.z):(Ut=0,Qt=0,de=0);const Ye=Ft.convert(F.format),ie=Ft.convert(F.type);let zt;F.isData3DTexture?(C.setTexture3D(F,0),zt=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(C.setTexture2DArray(F,0),zt=L.TEXTURE_2D_ARRAY):(C.setTexture2D(F,0),zt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const zi=L.getParameter(L.UNPACK_ROW_LENGTH),ne=L.getParameter(L.UNPACK_IMAGE_HEIGHT),pi=L.getParameter(L.UNPACK_SKIP_PIXELS),$n=L.getParameter(L.UNPACK_SKIP_ROWS),ei=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,pe.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pe.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Dt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ht),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Wt);const Ha=M.isDataArrayTexture||M.isData3DTexture,me=F.isDataArrayTexture||F.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){const Mi=Ct.get(M),Va=Ct.get(F),si=Ct.get(Mi.__renderTarget),an=Ct.get(Va.__renderTarget);Et.bindFramebuffer(L.READ_FRAMEBUFFER,si.__webglFramebuffer),Et.bindFramebuffer(L.DRAW_FRAMEBUFFER,an.__webglFramebuffer);for(let rn=0;rn<Lt;rn++)Ha&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ct.get(M).__webglTexture,O,Wt+rn),M.isDepthTexture?(me&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ct.get(F).__webglTexture,O,de+rn),L.blitFramebuffer(Dt,Ht,lt,xt,Ut,Qt,lt,xt,L.DEPTH_BUFFER_BIT,L.NEAREST)):me?L.copyTexSubImage3D(zt,O,Ut,Qt,de+rn,Dt,Ht,lt,xt):L.copyTexSubImage2D(zt,O,Ut,Qt,de+rn,Dt,Ht,lt,xt);Et.bindFramebuffer(L.READ_FRAMEBUFFER,null),Et.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else me?M.isDataTexture||M.isData3DTexture?L.texSubImage3D(zt,O,Ut,Qt,de,lt,xt,Lt,Ye,ie,pe.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(zt,O,Ut,Qt,de,lt,xt,Lt,Ye,pe.data):L.texSubImage3D(zt,O,Ut,Qt,de,lt,xt,Lt,Ye,ie,pe):M.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,O,Ut,Qt,lt,xt,Ye,ie,pe.data):M.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,O,Ut,Qt,pe.width,pe.height,Ye,pe.data):L.texSubImage2D(L.TEXTURE_2D,O,Ut,Qt,lt,xt,Ye,ie,pe);L.pixelStorei(L.UNPACK_ROW_LENGTH,zi),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ne),L.pixelStorei(L.UNPACK_SKIP_PIXELS,pi),L.pixelStorei(L.UNPACK_SKIP_ROWS,$n),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ei),O===0&&F.generateMipmaps&&L.generateMipmap(zt),Et.unbindTexture()},this.copyTextureToTexture3D=function(M,F,X=null,q=null,O=0){return M.isTexture!==!0&&(tr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,M=arguments[2],F=arguments[3],O=arguments[4]||0),tr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,F,X,q,O)},this.initRenderTarget=function(M){Ct.get(M).__webglFramebuffer===void 0&&C.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?C.setTextureCube(M,0):M.isData3DTexture?C.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?C.setTexture2DArray(M,0):C.setTexture2D(M,0),Et.unbindTexture()},this.resetState=function(){E=0,A=0,D=null,Et.reset(),Zt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}class As{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new It(t),this.density=e}clone(){return new As(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class pr extends Me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ze,this.environmentIntensity=1,this.environmentRotation=new ze,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class zg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=bl,this.updateRanges=[],this.version=0,this.uuid=Ki()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let a=0,r=this.stride;a<r;a++)this.array[t+a]=e.array[n+a];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ki()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ki()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const je=new R;class vs{constructor(t,e,n,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=_i(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=_i(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=_i(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=_i(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=_i(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,a){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),a=se(a,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=a,this}setXYZW(t,e,n,a,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),a=se(a,this.array),r=se(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=a,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const a=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[a+r])}return new Ke(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new vs(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const a=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[a+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ld extends Mn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new It(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ha;const qa=new R,da=new R,ua=new R,fa=new ot,Ya=new ot,Dd=new ee,qr=new R,$a=new R,Yr=new R,Ah=new ot,go=new ot,Ch=new ot;class $l extends Me{constructor(t=new Ld){if(super(),this.isSprite=!0,this.type="Sprite",ha===void 0){ha=new We;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new zg(e,5);ha.setIndex([0,1,2,0,2,3]),ha.setAttribute("position",new vs(n,3,0,!1)),ha.setAttribute("uv",new vs(n,2,3,!1))}this.geometry=ha,this.material=t,this.center=new ot(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),da.setFromMatrixScale(this.matrixWorld),Dd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ua.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&da.multiplyScalar(-ua.z);const n=this.material.rotation;let a,r;n!==0&&(r=Math.cos(n),a=Math.sin(n));const s=this.center;$r(qr.set(-.5,-.5,0),ua,s,da,a,r),$r($a.set(.5,-.5,0),ua,s,da,a,r),$r(Yr.set(.5,.5,0),ua,s,da,a,r),Ah.set(0,0),go.set(1,0),Ch.set(1,1);let o=t.ray.intersectTriangle(qr,$a,Yr,!1,qa);if(o===null&&($r($a.set(-.5,.5,0),ua,s,da,a,r),go.set(0,1),o=t.ray.intersectTriangle(qr,Yr,$a,!1,qa),o===null))return;const l=t.ray.origin.distanceTo(qa);l<t.near||l>t.far||e.push({distance:l,point:qa.clone(),uv:hi.getInterpolation(qa,qr,$a,Yr,Ah,go,Ch,new ot),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function $r(i,t,e,n,a,r){fa.subVectors(i,e).addScalar(.5).multiply(n),a!==void 0?(Ya.x=r*fa.x-a*fa.y,Ya.y=a*fa.x+r*fa.y):Ya.copy(fa),i.copy(t),i.x+=Ya.x,i.y+=Ya.y,i.applyMatrix4(Dd)}class Ud extends Pe{constructor(t=null,e=1,n=1,a,r,s,o,l,c=Ue,h=Ue,d,u){super(null,s,o,l,c,h,a,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ng extends Pe{constructor(t,e,n,a,r,s,o,l,c){super(t,e,n,a,r,s,o,l,c),this.isVideoTexture=!0,this.minFilter=s!==void 0?s:$e,this.magFilter=r!==void 0?r:$e,this.generateMipmaps=!1;const h=this;function d(){h.needsUpdate=!0,t.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in t&&t.requestVideoFrameCallback(d)}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class ti extends Pe{constructor(t,e,n,a,r,s,o,l,c){super(t,e,n,a,r,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class en{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,a=this.getPoint(0),r=0;e.push(0);for(let s=1;s<=t;s++)n=this.getPoint(s/t),r+=n.distanceTo(a),e.push(r),a=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let a=0;const r=n.length;let s;e?s=e:s=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),c=n[a]-s,c<0)o=a+1;else if(c>0)l=a-1;else{l=a;break}if(a=l,n[a]===s)return a/(r-1);const h=n[a],u=n[a+1]-h,p=(s-h)/u;return(a+p)/(r-1)}getTangent(t,e){let a=t-1e-4,r=t+1e-4;a<0&&(a=0),r>1&&(r=1);const s=this.getPoint(a),o=this.getPoint(r),l=e||(s.isVector2?new ot:new R);return l.copy(o).sub(s).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new R,a=[],r=[],s=[],o=new R,l=new ee;for(let p=0;p<=t;p++){const g=p/t;a[p]=this.getTangentAt(g,new R)}r[0]=new R,s[0]=new R;let c=Number.MAX_VALUE;const h=Math.abs(a[0].x),d=Math.abs(a[0].y),u=Math.abs(a[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(a[0],n).normalize(),r[0].crossVectors(a[0],o),s[0].crossVectors(a[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),s[p]=s[p-1].clone(),o.crossVectors(a[p-1],a[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Re(a[p-1].dot(a[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}s[p].crossVectors(a[p],r[p])}if(e===!0){let p=Math.acos(Re(r[0].dot(r[t]),-1,1));p/=t,a[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(a[g],p*g)),s[g].crossVectors(a[g],r[g])}return{tangents:a,normals:r,binormals:s}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Id extends en{constructor(t=0,e=0,n=1,a=1,r=0,s=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=a,this.aStartAngle=r,this.aEndAngle=s,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ot){const n=e,a=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const s=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=a;for(;r>a;)r-=a;r<Number.EPSILON&&(s?r=0:r=a),this.aClockwise===!0&&!s&&(r===a?r=-a:r=r-a);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*h-p*d+this.aX,c=u*d+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class kg extends Id{constructor(t,e,n,a,r,s){super(t,e,n,n,a,r,s),this.isArcCurve=!0,this.type="ArcCurve"}}function Zl(){let i=0,t=0,e=0,n=0;function a(r,s,o,l){i=r,t=o,e=-3*r+3*s-2*o-l,n=2*r-2*s+o+l}return{initCatmullRom:function(r,s,o,l,c){a(s,o,c*(o-r),c*(l-s))},initNonuniformCatmullRom:function(r,s,o,l,c,h,d){let u=(s-r)/c-(o-r)/(c+h)+(o-s)/h,p=(o-s)/h-(l-s)/(h+d)+(l-o)/d;u*=h,p*=h,a(s,o,u,p)},calc:function(r){const s=r*r,o=s*r;return i+t*r+e*s+n*o}}}const Zr=new R,vo=new Zl,xo=new Zl,wo=new Zl;class zd extends en{constructor(t=[],e=!1,n="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=a}getPoint(t,e=new R){const n=e,a=this.points,r=a.length,s=(r-(this.closed?0:1))*t;let o=Math.floor(s),l=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=a[(o-1)%r]:(Zr.subVectors(a[0],a[1]).add(a[0]),c=Zr);const d=a[o%r],u=a[(o+1)%r];if(this.closed||o+2<r?h=a[(o+2)%r]:(Zr.subVectors(a[r-1],a[r-2]).add(a[r-1]),h=Zr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),vo.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,x,m),xo.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,x,m),wo.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(vo.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),xo.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),wo.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(vo.calc(l),xo.calc(l),wo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const a=t.points[e];this.points.push(a.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const a=this.points[e];t.points.push(a.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const a=t.points[e];this.points.push(new R().fromArray(a))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Rh(i,t,e,n,a){const r=(n-t)*.5,s=(a-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+s)*l+(-3*e+3*n-2*r-s)*o+r*i+e}function Fg(i,t){const e=1-i;return e*e*t}function Og(i,t){return 2*(1-i)*i*t}function Bg(i,t){return i*i*t}function or(i,t,e,n){return Fg(i,t)+Og(i,e)+Bg(i,n)}function Hg(i,t){const e=1-i;return e*e*e*t}function Vg(i,t){const e=1-i;return 3*e*e*i*t}function Gg(i,t){return 3*(1-i)*i*i*t}function Wg(i,t){return i*i*i*t}function lr(i,t,e,n,a){return Hg(i,t)+Vg(i,e)+Gg(i,n)+Wg(i,a)}class jg extends en{constructor(t=new ot,e=new ot,n=new ot,a=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=a}getPoint(t,e=new ot){const n=e,a=this.v0,r=this.v1,s=this.v2,o=this.v3;return n.set(lr(t,a.x,r.x,s.x,o.x),lr(t,a.y,r.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xg extends en{constructor(t=new R,e=new R,n=new R,a=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=a}getPoint(t,e=new R){const n=e,a=this.v0,r=this.v1,s=this.v2,o=this.v3;return n.set(lr(t,a.x,r.x,s.x,o.x),lr(t,a.y,r.y,s.y,o.y),lr(t,a.z,r.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class qg extends en{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yg extends en{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $g extends en{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){const n=e,a=this.v0,r=this.v1,s=this.v2;return n.set(or(t,a.x,r.x,s.x),or(t,a.y,r.y,s.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nd extends en{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){const n=e,a=this.v0,r=this.v1,s=this.v2;return n.set(or(t,a.x,r.x,s.x),or(t,a.y,r.y,s.y),or(t,a.z,r.z,s.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zg extends en{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const n=e,a=this.points,r=(a.length-1)*t,s=Math.floor(r),o=r-s,l=a[s===0?s:s-1],c=a[s],h=a[s>a.length-2?a.length-1:s+1],d=a[s>a.length-3?a.length-1:s+2];return n.set(Rh(o,l.x,c.x,h.x,d.x),Rh(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const a=t.points[e];this.points.push(a.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const a=this.points[e];t.points.push(a.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const a=t.points[e];this.points.push(new ot().fromArray(a))}return this}}var Jg=Object.freeze({__proto__:null,ArcCurve:kg,CatmullRomCurve3:zd,CubicBezierCurve:jg,CubicBezierCurve3:Xg,EllipseCurve:Id,LineCurve:qg,LineCurve3:Yg,QuadraticBezierCurve:$g,QuadraticBezierCurve3:Nd,SplineCurve:Zg});class Cs extends We{constructor(t=1,e=32,n=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:a},e=Math.max(3,e);const r=[],s=[],o=[],l=[],c=new R,h=new ot;s.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const p=n+d/e*a;c.x=t*Math.cos(p),c.y=t*Math.sin(p),s.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(s[u]/t+1)/2,h.y=(s[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ce(s,3)),this.setAttribute("normal",new ce(o,3)),this.setAttribute("uv",new ce(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cs(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class yn extends We{constructor(t=1,e=1,n=1,a=32,r=1,s=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:a,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:l};const c=this;a=Math.floor(a),r=Math.floor(r);const h=[],d=[],u=[],p=[];let g=0;const x=[],m=n/2;let f=0;S(),s===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ce(d,3)),this.setAttribute("normal",new ce(u,3)),this.setAttribute("uv",new ce(p,2));function S(){const v=new R,P=new R;let E=0;const A=(e-t)/n;for(let D=0;D<=r;D++){const _=[],w=D/r,T=w*(e-t)+t;for(let U=0;U<=a;U++){const B=U/a,N=B*l+o,j=Math.sin(N),z=Math.cos(N);P.x=T*j,P.y=-w*n+m,P.z=T*z,d.push(P.x,P.y,P.z),v.set(j,A,z).normalize(),u.push(v.x,v.y,v.z),p.push(B,1-w),_.push(g++)}x.push(_)}for(let D=0;D<a;D++)for(let _=0;_<r;_++){const w=x[_][D],T=x[_+1][D],U=x[_+1][D+1],B=x[_][D+1];(t>0||_!==0)&&(h.push(w,T,B),E+=3),(e>0||_!==r-1)&&(h.push(T,U,B),E+=3)}c.addGroup(f,E,0),f+=E}function y(v){const P=g,E=new ot,A=new R;let D=0;const _=v===!0?t:e,w=v===!0?1:-1;for(let U=1;U<=a;U++)d.push(0,m*w,0),u.push(0,w,0),p.push(.5,.5),g++;const T=g;for(let U=0;U<=a;U++){const N=U/a*l+o,j=Math.cos(N),z=Math.sin(N);A.x=_*z,A.y=m*w,A.z=_*j,d.push(A.x,A.y,A.z),u.push(0,w,0),E.x=j*.5+.5,E.y=z*.5*w+.5,p.push(E.x,E.y),g++}for(let U=0;U<a;U++){const B=P+U,N=T+U;v===!0?h.push(N,N+1,B):h.push(N+1,N,B),D+=3}c.addGroup(f,D,v===!0?1:2),f+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Oa extends We{constructor(t=[],e=[],n=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:a};const r=[],s=[];o(a),c(n),h(),this.setAttribute("position",new ce(r,3)),this.setAttribute("normal",new ce(r.slice(),3)),this.setAttribute("uv",new ce(s,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const y=new R,v=new R,P=new R;for(let E=0;E<e.length;E+=3)p(e[E+0],y),p(e[E+1],v),p(e[E+2],P),l(y,v,P,S)}function l(S,y,v,P){const E=P+1,A=[];for(let D=0;D<=E;D++){A[D]=[];const _=S.clone().lerp(v,D/E),w=y.clone().lerp(v,D/E),T=E-D;for(let U=0;U<=T;U++)U===0&&D===E?A[D][U]=_:A[D][U]=_.clone().lerp(w,U/T)}for(let D=0;D<E;D++)for(let _=0;_<2*(E-D)-1;_++){const w=Math.floor(_/2);_%2===0?(u(A[D][w+1]),u(A[D+1][w]),u(A[D][w])):(u(A[D][w+1]),u(A[D+1][w+1]),u(A[D+1][w]))}}function c(S){const y=new R;for(let v=0;v<r.length;v+=3)y.x=r[v+0],y.y=r[v+1],y.z=r[v+2],y.normalize().multiplyScalar(S),r[v+0]=y.x,r[v+1]=y.y,r[v+2]=y.z}function h(){const S=new R;for(let y=0;y<r.length;y+=3){S.x=r[y+0],S.y=r[y+1],S.z=r[y+2];const v=m(S)/2/Math.PI+.5,P=f(S)/Math.PI+.5;s.push(v,1-P)}g(),d()}function d(){for(let S=0;S<s.length;S+=6){const y=s[S+0],v=s[S+2],P=s[S+4],E=Math.max(y,v,P),A=Math.min(y,v,P);E>.9&&A<.1&&(y<.2&&(s[S+0]+=1),v<.2&&(s[S+2]+=1),P<.2&&(s[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function p(S,y){const v=S*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function g(){const S=new R,y=new R,v=new R,P=new R,E=new ot,A=new ot,D=new ot;for(let _=0,w=0;_<r.length;_+=9,w+=6){S.set(r[_+0],r[_+1],r[_+2]),y.set(r[_+3],r[_+4],r[_+5]),v.set(r[_+6],r[_+7],r[_+8]),E.set(s[w+0],s[w+1]),A.set(s[w+2],s[w+3]),D.set(s[w+4],s[w+5]),P.copy(S).add(y).add(v).divideScalar(3);const T=m(P);x(E,w+0,S,T),x(A,w+2,y,T),x(D,w+4,v,T)}}function x(S,y,v,P){P<0&&S.x===1&&(s[y]=S.x-1),v.x===0&&v.z===0&&(s[y]=P/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oa(t.vertices,t.indices,t.radius,t.details)}}class Jl extends Oa{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,a=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-a,-n,0,-a,n,0,a,-n,0,a,n,-a,-n,0,-a,n,0,a,-n,0,a,n,0,-n,0,-a,n,0,-a,-n,0,a,n,0,a],s=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,s,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Jl(t.radius,t.detail)}}class Xi extends Oa{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,a=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(a,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Xi(t.radius,t.detail)}}class Rs extends Oa{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],a=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,a,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Rs(t.radius,t.detail)}}class Kl extends We{constructor(t=.5,e=1,n=32,a=1,r=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:a,thetaStart:r,thetaLength:s},n=Math.max(3,n),a=Math.max(1,a);const o=[],l=[],c=[],h=[];let d=t;const u=(e-t)/a,p=new R,g=new ot;for(let x=0;x<=a;x++){for(let m=0;m<=n;m++){const f=r+m/n*s;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<a;x++){const m=x*(n+1);for(let f=0;f<n;f++){const S=f+m,y=S,v=S+n+1,P=S+n+2,E=S+1;o.push(y,v,E),o.push(v,P,E)}}this.setIndex(o),this.setAttribute("position",new ce(l,3)),this.setAttribute("normal",new ce(c,3)),this.setAttribute("uv",new ce(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class vr extends We{constructor(t=1,e=32,n=16,a=0,r=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:a,phiLength:r,thetaStart:s,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(s+o,Math.PI);let c=0;const h=[],d=new R,u=new R,p=[],g=[],x=[],m=[];for(let f=0;f<=n;f++){const S=[],y=f/n;let v=0;f===0&&s===0?v=.5/e:f===n&&l===Math.PI&&(v=-.5/e);for(let P=0;P<=e;P++){const E=P/e;d.x=-t*Math.cos(a+E*r)*Math.sin(s+y*o),d.y=t*Math.cos(s+y*o),d.z=t*Math.sin(a+E*r)*Math.sin(s+y*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(E+v,1-y),S.push(c++)}h.push(S)}for(let f=0;f<n;f++)for(let S=0;S<e;S++){const y=h[f][S+1],v=h[f][S],P=h[f+1][S],E=h[f+1][S+1];(f!==0||s>0)&&p.push(y,v,E),(f!==n-1||l<Math.PI)&&p.push(v,P,E)}this.setIndex(p),this.setAttribute("position",new ce(g,3)),this.setAttribute("normal",new ce(x,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ql extends Oa{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],a=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,a,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ql(t.radius,t.detail)}}class tc extends We{constructor(t=new Nd(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,n=1,a=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:a,closed:r};const s=t.computeFrenetFrames(e,r);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;const o=new R,l=new R,c=new ot;let h=new R;const d=[],u=[],p=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new ce(d,3)),this.setAttribute("normal",new ce(u,3)),this.setAttribute("uv",new ce(p,2));function x(){for(let y=0;y<e;y++)m(y);m(r===!1?e:0),S(),f()}function m(y){h=t.getPointAt(y/e,h);const v=s.normals[y],P=s.binormals[y];for(let E=0;E<=a;E++){const A=E/a*Math.PI*2,D=Math.sin(A),_=-Math.cos(A);l.x=_*v.x+D*P.x,l.y=_*v.y+D*P.y,l.z=_*v.z+D*P.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function f(){for(let y=1;y<=e;y++)for(let v=1;v<=a;v++){const P=(a+1)*(y-1)+(v-1),E=(a+1)*y+(v-1),A=(a+1)*y+v,D=(a+1)*(y-1)+v;g.push(P,E,D),g.push(E,A,D)}}function S(){for(let y=0;y<=e;y++)for(let v=0;v<=a;v++)c.x=y/e,c.y=v/a,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new tc(new Jg[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class wn extends Mn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ms,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ze,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Kg extends wn{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Re(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new It(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new It(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new It(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Qg extends Mn{static get type(){return"MeshNormalMaterial"}constructor(t){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ms,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class ec extends Mn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ms,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ze,this.combine=Nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Ph={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class t2{constructor(t,e,n){const a=this;let r=!1,s=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&a.onStart!==void 0&&a.onStart(h,s,o),r=!0},this.itemEnd=function(h){s++,a.onProgress!==void 0&&a.onProgress(h,s,o),s===o&&(r=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(h){a.onError!==void 0&&a.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const e2=new t2;class ic{constructor(t){this.manager=t!==void 0?t:e2,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(a,r){n.load(t,a,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ic.DEFAULT_MATERIAL_NAME="__DEFAULT";class i2 extends ic{constructor(t){super(t)}load(t,e,n,a){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,s=Ph.get(t);if(s!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(s),r.manager.itemEnd(t)},0),s;const o=fr("img");function l(){h(),Ph.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),a&&a(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class Ps extends ic{constructor(t){super(t)}load(t,e,n,a){const r=new Pe,s=new i2(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,a),r}}class Ls extends Me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class kd extends Ls{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const _o=new ee,Lh=new R,Dh=new R;class nc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xl,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Lh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Lh),Dh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Dh),e.updateMatrixWorld(),_o.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_o),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_o)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class n2 extends nc{constructor(){super(new Oe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Pa*2*t.angle*this.focus,a=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||a!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=a,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Fd extends Ls{constructor(t,e,n=0,a=Math.PI/3,r=0,s=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.distance=n,this.angle=a,this.penumbra=r,this.decay=s,this.map=null,this.shadow=new n2}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Uh=new ee,Za=new R,bo=new R;class a2 extends nc{constructor(){super(new Oe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new le(2,1,1,1),new le(0,1,1,1),new le(3,1,1,1),new le(1,1,1,1),new le(3,0,1,1),new le(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,a=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Za.setFromMatrixPosition(t.matrixWorld),n.position.copy(Za),bo.copy(n.position),bo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(bo),n.updateMatrixWorld(),a.makeTranslation(-Za.x,-Za.y,-Za.z),Uh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uh)}}class Xn extends Ls{constructor(t,e,n=0,a=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=a,this.shadow=new a2}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class r2 extends nc{constructor(){super(new Es(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class s2 extends Ls{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.shadow=new r2}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class o2{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ih(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Ih();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Ih(){return performance.now()}const zh=new ee;class Od{constructor(t,e,n=0,a=1/0){this.ray=new wd(t,e),this.near=n,this.far=a,this.camera=null,this.layers=new jl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return zh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zh),this}intersectObject(t,e=!0,n=[]){return Sl(t,this,n,e),n.sort(Nh),n}intersectObjects(t,e=!0,n=[]){for(let a=0,r=t.length;a<r;a++)Sl(t[a],this,n,e);return n.sort(Nh),n}}function Nh(i,t){return i.distance-t.distance}function Sl(i,t,e,n){let a=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(a=!1),a===!0&&n===!0){const r=i.children;for(let s=0,o=r.length;s<o;s++)Sl(r[s],t,e,!0)}}class l2 extends jn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Il}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Il);const pa=new ze(0,0,0,"YXZ"),ma=new R,c2={type:"change"},h2={type:"lock"},d2={type:"unlock"},kh=Math.PI/2;class u2 extends l2{constructor(t,e=null){super(t,e),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=f2.bind(this),this._onPointerlockChange=p2.bind(this),this._onPointerlockError=m2.bind(this),this.domElement!==null&&this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return console.warn("THREE.PointerLockControls: getObject() has been deprecated. Use controls.object instead."),this.object}getDirection(t){return t.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(t){if(this.enabled===!1)return;const e=this.object;ma.setFromMatrixColumn(e.matrix,0),ma.crossVectors(e.up,ma),e.position.addScaledVector(ma,t)}moveRight(t){if(this.enabled===!1)return;const e=this.object;ma.setFromMatrixColumn(e.matrix,0),e.position.addScaledVector(ma,t)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function f2(i){if(this.enabled===!1||this.isLocked===!1)return;const t=i.movementX||i.mozMovementX||i.webkitMovementX||0,e=i.movementY||i.mozMovementY||i.webkitMovementY||0,n=this.object;pa.setFromQuaternion(n.quaternion),pa.y-=t*.002*this.pointerSpeed,pa.x-=e*.002*this.pointerSpeed,pa.x=Math.max(kh-this.maxPolarAngle,Math.min(kh-this.minPolarAngle,pa.x)),n.quaternion.setFromEuler(pa),this.dispatchEvent(c2)}function p2(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(h2),this.isLocked=!0):(this.dispatchEvent(d2),this.isLocked=!1)}function m2(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const g2={rooms:[{id:"central",title:"El Salvador · Bitcoin · Bitcoiners",kind:"hall",ring:"S",galleries:["Cormorant garden mural","Watercolor Pastels"],minX:-12.625,maxX:12.625,minZ:-3,maxZ:12,openings:[{wall:"W",from:4.8,to:7.2},{wall:"E",from:4.8,to:7.2}],windows:[{wall:"N",from:-7.3125,to:-5.3125,sill:.9,head:3},{wall:"N",from:5.3125,to:7.3125,sill:.9,head:3}],count:46},{id:"travels",title:"Murals · Travels · Pacific Northwest",kind:"gallery",ring:"N",galleries:["Travels","Pacific Northwest","Friends Club mural (Lillooet)","Exhibitions: Cape Town, El Salvador, Warsaw"],minX:-12.625,maxX:12.625,minZ:15.5,maxZ:35,openings:[{wall:"W",from:18.3,to:20.7},{wall:"E",from:18.3,to:20.7}],windows:[{wall:"S",from:-7.3125,to:-5.3125,sill:.9,head:3},{wall:"S",from:5.3125,to:7.3125,sill:.9,head:3}],count:21},{id:"people",title:"Family · Friends · Self Portraits · Archived",kind:"gallery",ring:"W",galleries:["Friends","Family","Bitcoiners","Self Portraits","Archived Paintings (portraits & people)","Exhibitions: Living Room, Studio 601, Victrola, Paul Murphy"],minX:-35.725,maxX:-15.225000000000001,minZ:0,maxZ:23.5,openings:[{wall:"E",from:4.8,to:7.2},{wall:"E",from:18.3,to:20.7}],windows:[{wall:"E",from:12.75,to:14.75,sill:.9,head:3}],count:50},{id:"archive",title:"Burning Man & Older Work",kind:"gallery",ring:"E",galleries:["Archived Paintings","Older Work"],minX:15.225,maxX:40.225,minZ:0,maxZ:23.5,openings:[{wall:"W",from:4.8,to:7.2},{wall:"W",from:18.3,to:20.7}],windows:[{wall:"W",from:12.75,to:14.75,sill:.9,head:3}],count:98}],hall:{height:4.6,doorHeight:2.7},hallways:[{id:"passage-central-people",from:"central",to:"people",minX:-15.225000000000001,maxX:-12.625,minZ:4.8,maxZ:7.2},{id:"passage-people-archive",from:"people",to:"travels",minX:-15.225000000000001,maxX:-12.625,minZ:18.3,maxZ:20.7},{id:"passage-archive-travels",from:"travels",to:"archive",minX:12.625,maxX:15.225,minZ:18.3,maxZ:20.7},{id:"passage-travels-central",from:"archive",to:"central",minX:12.625,maxX:15.225,minZ:4.8,maxZ:7.2}],signs:[{title:"El Salvador · Bitcoin · Bitcoiners",x:-15.345,y:3.1500000000000004,z:6,yaw:1.5707963267948966},{title:"Family · Friends · Self Portraits · Archived",x:-12.505,y:3.1500000000000004,z:6,yaw:-1.5707963267948966},{title:"Murals · Travels · Pacific Northwest",x:-15.345,y:3.1500000000000004,z:19.5,yaw:1.5707963267948966},{title:"Family · Friends · Self Portraits · Archived",x:-12.505,y:3.1500000000000004,z:19.5,yaw:-1.5707963267948966},{title:"Burning Man & Older Work",x:12.505,y:3.1500000000000004,z:19.5,yaw:1.5707963267948966},{title:"Murals · Travels · Pacific Northwest",x:15.344999999999999,y:3.1500000000000004,z:19.5,yaw:-1.5707963267948966},{title:"Burning Man & Older Work",x:12.505,y:3.1500000000000004,z:6,yaw:1.5707963267948966},{title:"El Salvador · Bitcoin · Bitcoiners",x:15.344999999999999,y:3.1500000000000004,z:6,yaw:-1.5707963267948966}],start:{x:0,z:1.6,yaw:0},courtyard:{minX:-12.625,maxX:12.625,minZ:12,maxZ:15.5},gate:{room:"travels",from:8.8,to:10.8},checkout:{room:"travels",from:-10.8,to:-8.8},groupSigns:[{title:"El Salvador",x:-9.787561513793197,y:3.45,z:-2.945,yaw:0,group:"el-salvador"},{title:"Chase Toole Collaboration",x:7.540632041345326,y:3.45,z:-2.945,yaw:0,group:"chase"},{title:"Bitcoin",x:12.57,y:3.45,z:.875,yaw:-1.5707963267948966,group:"bitcoin"},{title:"Bitcoiners",x:-12.57,y:3.45,z:10.061835214855245,yaw:1.5707963267948966,group:"bitcoiners"},{title:"Murals",x:-9.66875,y:3.45,z:15.555,yaw:0,group:"murals"},{title:"Travels",x:-1.311471711800241,y:3.45,z:15.555,yaw:0,group:"travels"},{title:"Pacific Northwest",x:5.733216659571758,y:3.45,z:34.945,yaw:3.141592653589793,group:"pnw"},{title:"Family",x:-33.65641819566881,y:3.45,z:.05500000000000001,yaw:0,group:"family"},{title:"Friends",x:-24.722158364256362,y:3.45,z:.05500000000000001,yaw:0,group:"friends"},{title:"Self Portraits",x:-21.402467645262703,y:3.45,z:23.445,yaw:3.141592653589793,group:"self"},{title:"Archived Paintings",x:-28.929860064551693,y:3.45,z:23.445,yaw:3.141592653589793,group:"archived"},{title:"Burning Man & Bass Coast",x:21.941435291341406,y:3.45,z:.05500000000000001,yaw:0,group:"playa"},{title:"Older Work · Portraits",x:40.17,y:3.45,z:12.416949262677527,yaw:-1.5707963267948966,group:"older-portraits"},{title:"Older Work · Landscapes & Studies",x:25.29481281167596,y:3.45,z:23.445,yaw:3.141592653589793,group:"older-studies"}]},v2=[{id:"cormorant-presiding-over-sunset-on-puget-sound",kind:"mural",room:"travels",wall:"S",x:-9.66875,y:1.6,z:15.535,ix:0,iz:1,iw:3.048,ih:2.032,s:1,smax:1,title:"Cormorant Presiding over Sunset on Puget Sound",price:null,status:"nfs",url:"https://tjm.art/products/cormorant-presiding-over-sunset-on-puget-sound/",img:"art/cormorant-presiding-over-sunset-on-puget-sound.webp",focal:!0,caption:"Garden mural, Seattle · 60 × 40 in (W × H)",hi:"https://img.tjm.art/gallery-wall/a74c24cb788ba4d20bea974f63c112995614224f8dbdc53b7d0ba5e3ad83b81a-960.webp",w:3.048,h:2.032,fw:3.07848,fh:2.06248},{id:"coined-in-watercolor-film-poster",kind:"painting",room:"central",wall:"E",x:12.59,y:1.6,z:.8750000000000002,ix:-1,iz:0,iw:1.3675199088521564,ih:2.0475021839720133,s:1,smax:1,title:"Coined in Watercolor Film Poster",price:null,status:"nfs",url:"https://tjm.art/products/coined-in-watercolor-film-poster/",img:"art/coined-in-watercolor-film-poster.webp",focal:!1,caption:"100 × 70 cm (H × W)",hi:"https://tjm.art/gallery-images/coined-in-watercolor-film-poster.jpg",w:1.3675199088521564,h:2.0475021839720133,fw:1.3979999088521562,fh:2.077982183972013},{id:"painting-shoreline-at-dusk",kind:"painting",room:"travels",wall:"S",x:.8697794301485466,y:1.6,z:15.535,ix:0,iz:1,iw:2.507405336794901,ih:1.1856468662542274,s:1,smax:1,title:"El Zonte at Dawn",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-shoreline-at-dusk/",img:"art/painting-shoreline-at-dusk.webp",focal:!1,caption:"48 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/63d06a96a47f9244f2309dbda6117c8922c6eade29a98ad674923cf57378421a-960.webp",w:2.507405336794901,h:1.1856468662542274,fw:2.5378853367949015,fh:1.2161268662542275},{id:"el-zonte-before-dawn",kind:"painting",room:"central",wall:"S",x:-2.160928247385594,y:1.6,z:-2.965,ix:0,iz:1,iw:2.495971035729381,ih:1.1910784369864493,s:1,smax:1,title:"El Zonte Before Dawn",price:"$1,000",status:"available",url:"https://tjm.art/products/el-zonte-before-dawn/",img:"art/el-zonte-before-dawn.webp",focal:!1,caption:"48 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/0832de7fa78ee0b4964fb98b9009c464a0a40018c4db8f32144bd246d9135559-960.webp",w:2.495971035729381,h:1.1910784369864493,fw:2.526451035729381,fh:1.2215584369864494},{id:"painting-moonlit-water",kind:"painting",room:"travels",wall:"W",x:-12.59,y:1.6000000000000003,z:32.16208116622408,ix:1,iz:0,iw:.5918737069459575,ih:1.2033929394755734,s:1,smax:1,title:"Moonrise Over the Cascades",price:"$500",status:"available",url:"https://tjm.art/products/painting-moonlit-water/",img:"art/painting-moonlit-water.webp",focal:!1,caption:"12 × 23 in (W × H)",hi:"https://img.tjm.art/gallery-wall/370a11b9549c02d36d2ecf5a32d0e0e9b927311a116a38623a17985029422b2d-960.webp",w:.5918737069459575,h:1.2033929394755734,fw:.6223537069459575,fh:1.2338729394755732},{id:"el-zonte-at-sunrise",kind:"painting",room:"central",wall:"S",x:1.6657573494294697,y:1.6247440804764866,z:-2.965,ix:0,iz:1,iw:1.2289736463017225,ih:2.4190081609529734,s:1,smax:1,title:"Sunrise from Punta El Zonte Hostel",price:"$1,000",status:"available",url:"https://tjm.art/products/el-zonte-at-sunrise/",img:"art/el-zonte-at-sunrise.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/6bd54b8a2350ec2a09c359d018e74399db2b1c36dd7a179c717f01702d45f8a8-960.webp",w:1.2289736463017225,h:2.4190081609529734,fw:1.2594536463017225,fh:2.4494881609529733},{id:"sunrise-in-el-zonte-large",kind:"painting",room:"central",wall:"S",x:-5.7944716415707,y:1.6553830413819792,z:-2.965,ix:0,iz:1,iw:1.797915954529985,ih:2.480286082763959,s:1,smax:1,title:"Sunrise in El Zonte (Large)",price:"$2,000",status:"available",url:"https://tjm.art/products/sunrise-in-el-zonte-large/",img:"art/sunrise-in-el-zonte-large.webp",focal:!1,caption:"36 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/85427e7af2a0b74812205d51fbd7046788188c69454562ed1afc25ecb380c488-960.webp",w:1.797915954529985,h:2.480286082763959,fw:1.828395954529985,fh:2.5107660827639586},{id:"painting-portrait-with-hat",kind:"painting",room:"travels",wall:"W",x:-12.59,y:1.6,z:25.834891917147704,ix:1,iz:0,iw:3.489533021423588,ih:.9761893007134544,s:1,smax:1,title:"Sunrise on Rainier with Eagle",price:null,status:"nfs",url:"https://tjm.art/products/painting-portrait-with-hat/",img:"art/painting-portrait-with-hat.webp",focal:!1,caption:"60 × 22 in (W × H)",hi:"https://img.tjm.art/gallery-wall/06b6660bc24b59597f923ebfa869fe3bcbacae363f1b8cab9a6486a3c73a756a-960.webp",w:3.489533021423588,h:.9761893007134544,fw:3.520013021423588,fh:1.0066693007134546},{id:"painting-red-horizon",kind:"painting",room:"travels",wall:"E",x:12.59,y:1.6,z:33.00565263247051,ix:-1,iz:0,iw:1.1683964260533493,ih:2.2352068371362455,s:1,smax:1,title:"Sunset at Kihei on Maui",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-red-horizon/",img:"art/painting-red-horizon.webp",focal:!1,caption:"23 × 44 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f6e3bea6cf0aae99cac1bf06cccd45149b5be70beb16be754e64984b0e176efc-960.webp",w:1.1683964260533493,h:2.2352068371362455,fw:1.1988764260533493,fh:2.2656868371362453},{id:"sunset-in-el-tunco-el-salvador",kind:"painting",room:"central",wall:"S",x:-7.549786278266202,y:1.6,z:-2.965,ix:0,iz:1,iw:.6701934986403812,ih:.2310353656281656,s:1,smax:1,title:"Sunset in El Tunco, El Salvador",price:null,status:"sold",url:"https://tjm.art/products/sunset-in-el-tunco-el-salvador/",img:"art/sunset-in-el-tunco-el-salvador.webp",focal:!1,caption:"12 × 5 in (W × H)",hi:"https://tjm.art/gallery-images/beach-walk.jpg",w:.6701934986403812,h:.2310353656281656,fw:.7006734986403812,fh:.2615153656281656},{id:"sunset-in-el-zonte-el-salvador",kind:"painting",room:"central",wall:"S",x:.0691638983788525,y:1.6,z:-2.965,ix:0,iz:1,iw:.9216934355788746,ih:1.8815259098713577,s:1,smax:1,title:"Sunset in El Zonte, El Salvador",price:null,status:"nfs",url:"https://tjm.art/products/sunset-in-el-zonte-el-salvador/",img:"art/sunset-in-el-zonte-el-salvador.webp",focal:!1,caption:"24 × 28 in (W × H)",hi:"https://img.tjm.art/wall-paintings/sunset-in-el-zonte-el-salvador-66c1e1ab57-290.webp",w:.9216934355788746,h:1.8815259098713577,fw:.9521734355788746,fh:1.9120059098713575},{id:"painting-golden-coast",kind:"painting",room:"travels",wall:"W",x:-12.59,y:1.6,z:28.341022155568094,ix:1,iz:0,iw:.7051771844599206,ih:1.3174425101565408,s:1,smax:1,title:"Sunset in the Strait of Juan de Fuca, Patos Island 1",price:null,status:"sold",url:"https://tjm.art/products/painting-golden-coast/",img:"art/painting-golden-coast.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9f3f1c8a20548e3041ad3062bf8879b280a5b26a63d3b6784f891c1f251e18e1-960.webp",w:.7051771844599206,h:1.3174425101565408,fw:.7356571844599206,fh:1.3479225101565406},{id:"painting-sunset-silhouette",kind:"painting",room:"travels",wall:"W",x:-12.59,y:1.6,z:29.747213769984644,ix:1,iz:0,iw:1.2896557734159075,ih:.7203708300698564,s:1,smax:1,title:"Sunset in the Strait of Juan de Fuca, Sucia Island",price:null,status:"sold",url:"https://tjm.art/products/painting-sunset-silhouette/",img:"art/painting-sunset-silhouette.webp",focal:!1,caption:"24 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/75de88bb244df1dc710367f6eef13734be24c732398f783551c78e31674bca91-960.webp",w:1.2896557734159075,h:.7203708300698564,fw:1.3201357734159074,fh:.7508508300698563},{id:"painting-studio-figure",kind:"painting",room:"central",wall:"N",x:-3.8845281107448084,y:1.6,z:11.965,ix:0,iz:-1,iw:1.1160767679489199,ih:.8324072560952361,s:1,smax:1,title:"Brekkie @BVBTC hoisting a sculpture in progress",price:"$400",status:"available",url:"https://tjm.art/products/painting-studio-figure/",img:"art/painting-studio-figure.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/studio-figure.jpg",w:1.1160767679489199,h:.8324072560952361,fw:1.14655676794892,fh:.8628872560952361},{id:"painting-portrait-with-cheese",kind:"painting",room:"central",wall:"N",x:-8.686534220358489,y:1.6,z:11.965,ix:0,iz:-1,iw:1.2931568814339582,ih:.7184204896855323,s:1,smax:1,title:"Brekkie @BVBTC with polished Bitcoin B",price:"$400",status:"available",url:"https://tjm.art/products/painting-portrait-with-cheese/",img:"art/painting-portrait-with-cheese.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/portrait-with-cheese.jpg",w:1.2931568814339582,h:.7184204896855323,fw:1.3236368814339583,fh:.7489004896855322},{id:"burning-man-temple-2022-blue",kind:"painting",room:"archive",wall:"S",x:17.97133702262431,y:1.6,z:.035,ix:0,iz:1,iw:2.3718533992160955,ih:1.1790087938603342,s:1,smax:1,title:"Burning Man Temple 2022: Blue",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-blue/",img:"art/burning-man-temple-2022-blue.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/display/burning-man-temple-2022-blue-7836afc7f6-1600.webp",w:2.3718533992160955,h:1.1790087938603342,fw:2.4023333992160953,fh:1.2094887938603343},{id:"burning-man-temple-2022-daytime",kind:"painting",room:"archive",wall:"S",x:20.632897167443023,y:1.6,z:.035,ix:0,iz:1,iw:2.398232883401163,ih:1.1621436847481468,s:1,smax:1,title:"Burning Man Temple 2022: Daytime",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-daytime/",img:"art/burning-man-temple-2022-daytime.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-daytime-6e69733e63-960.webp",w:2.398232883401163,h:1.1621436847481468,fw:2.428712883401163,fh:1.1926236847481468},{id:"burning-man-temple-2022-flame",kind:"painting",room:"archive",wall:"S",x:23.29150608742369,y:1.6,z:.035,ix:0,iz:1,iw:2.3580249565601714,ih:1.1819600094757858,s:1,smax:1,title:"Burning Man Temple 2022: Flame",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-flame/",img:"art/burning-man-temple-2022-flame.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-flame-652b838481-960.webp",w:2.3580249565601714,h:1.1819600094757858,fw:2.3885049565601717,fh:1.212440009475786},{id:"burning-man-temple-2022-pink",kind:"painting",room:"archive",wall:"S",x:25.922247914440202,y:1.6,z:.035,ix:0,iz:1,iw:2.342498697472854,ih:1.1897941300914203,s:1,smax:1,title:"Burning Man Temple 2022: Pink",price:null,status:"nfs",url:"https://tjm.art/products/burning-man-temple-2022-pink/",img:"art/burning-man-temple-2022-pink.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/burning-man-temple-2022-pink-92f2d4315e-960.webp",w:2.342498697472854,h:1.1897941300914203,fw:2.3729786974728544,fh:1.2202741300914204},{id:"daniel-portrait-1",kind:"painting",room:"people",wall:"S",x:-19.97932317442315,y:1.6,z:.035,ix:0,iz:1,iw:.7039054481959918,ih:1.3198227153674844,s:1,smax:1,title:"Daniel — portrait 1",price:null,status:"nfs",url:"https://tjm.art/products/daniel-portrait-1/",img:"art/daniel-portrait-1.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/daniel-portrait-1-52e78c730f-304.webp",w:.7039054481959918,h:1.3198227153674844,fw:.7343854481959917,fh:1.3503027153674845},{id:"painting-guitarist",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.131514021543438,z:10.435972864461366,ix:-1,iz:0,iw:.6360526644242458,ih:.7303093375459383,s:1,smax:1,title:"Girl Tuning Guitar",price:null,status:"nfs",url:"https://tjm.art/products/painting-guitarist/",img:"art/painting-guitarist.webp",focal:!1,caption:"15 × 12 in (W × H)",hi:"https://img.tjm.art/gallery-wall/df6cb0c90b3e3686c53c19965833979894218165c6c141e33f01331582f9cb18-960.webp",w:.6360526644242458,h:.7303093375459383,fw:.6665326644242457,fh:.7607893375459382},{id:"girl-wearing-flower-crown",kind:"painting",room:"people",wall:"S",x:-18.784813289560926,y:1.6,z:.035,ix:0,iz:1,iw:.7148193617970907,ih:1.2996715669038013,s:1,smax:1,title:"Girl Wearing Flower Crown",price:null,status:"sold",url:"https://tjm.art/products/girl-wearing-flower-crown/",img:"art/girl-wearing-flower-crown.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/girl-wearing-flower-crown-1b69db9b36-308.webp",w:.7148193617970907,h:1.2996715669038013,fw:.7452993617970907,fh:1.330151566903801},{id:"myself-my-mother-ruth-my-grandpa-howard",kind:"painting",room:"people",wall:"S",x:-33.65641819566881,y:1.6,z:.035,ix:0,iz:1,iw:1.29734864893101,ih:.7160992542486577,s:1,smax:1,title:"Myself, my mother Ruth, my grandpa Howard",price:null,status:"nfs",url:"https://tjm.art/products/myself-my-mother-ruth-my-grandpa-howard/",img:"art/myself-my-mother-ruth-my-grandpa-howard.webp",focal:!1,caption:"24 × 15 in (W × H)",hi:"https://tjm.art/gallery-images/family-portrait.jpg",w:1.29734864893101,h:.7160992542486577,fw:1.32782864893101,fh:.7465792542486577},{id:"michael-and-katie-in-yelapa",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.5999999999999999,z:1.7442884822825082,ix:-1,iz:0,iw:.809039025915651,ih:1.1483134561383432,s:1,smax:1,title:"Romance in Yelapa",price:null,status:"sold",url:"https://tjm.art/products/michael-and-katie-in-yelapa/",img:"art/michael-and-katie-in-yelapa.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/embrace.jpg",w:.809039025915651,h:1.1483134561383432,fw:.839519025915651,fh:1.1787934561383433},{id:"painting-couple-in-color",kind:"painting",room:"people",wall:"S",x:-29.519281345062172,y:1.5999999999999999,z:.035,ix:0,iz:1,iw:1.1880834012901,ih:.7819572253860267,s:1,smax:1,title:"Aunt Fran and Cousin Hillary",price:null,status:"nfs",url:"https://tjm.art/products/painting-couple-in-color/",img:"art/painting-couple-in-color.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f6b3e14539ed681eb7395e1d56e8537a437d8f085d5acc986d2d0318bc775c36-960.webp",w:1.1880834012901,h:.7819572253860267,fw:1.2185634012900999,fh:.8124372253860267},{id:"painting-portrait-in-green",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:2.060394668772969,z:10.435972864461366,ix:-1,iz:0,iw:.6222641727056942,ih:.7464919569131241,s:1,smax:1,title:"Chase Toole",price:"$200",status:"available",url:"https://tjm.art/products/painting-portrait-in-green/",img:"art/painting-portrait-in-green.webp",focal:!1,caption:"12 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9ba4b0f54e321f8b264ccb423549c1d935d4e02767f91549de7c6fade8ccf5b8-960.webp",w:.6222641727056942,h:.7464919569131241,fw:.6527441727056942,fh:.7769719569131242},{id:"painting-portrait-in-gold",kind:"painting",room:"central",wall:"E",x:12.59,y:1.6,z:9.625,ix:-1,iz:0,iw:.6558500684866669,ih:.7082643157632653,s:1,smax:1,title:"Dorian Nakamoto",price:"$200",status:"available",url:"https://tjm.art/products/painting-portrait-in-gold/",img:"art/painting-portrait-in-gold.webp",focal:!1,caption:"12 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/edcc7405e05f4353e269958204c32ca9af022e77e445f06fb978c3a877bbee34-960.webp",w:.6558500684866669,h:.7082643157632653,fw:.6863300684866669,fh:.7387443157632654},{id:"painting-clouds-over-water",kind:"painting",room:"central",wall:"S",x:-4.1522137147779965,y:1.6,z:-2.965,ix:0,iz:1,iw:.4440800788347868,ih:.7438341320482679,s:1,smax:1,title:"El Salvador",price:"$200",status:"available",url:"https://tjm.art/products/painting-clouds-over-water/",img:"art/painting-clouds-over-water.webp",focal:!1,caption:"8 × 16 in (W × H)",hi:"https://img.tjm.art/wall-paintings/painting-clouds-over-water-dda20437ce-320.webp",w:.4440800788347868,h:.7438341320482679,fw:.4745600788347868,fh:.7743141320482678},{id:"painting-twin-dragons",kind:"painting",room:"central",wall:"S",x:9.968331974978854,y:1.6,z:-2.965,ix:0,iz:1,iw:2.4012962298216567,ih:1.2380385406346952,s:1,smax:1,title:"El Salvador: Future - Chase Toole Collab",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-twin-dragons/",img:"art/painting-twin-dragons.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://tjm.art/gallery-images/twin-dragons.jpg",w:2.4012962298216567,h:1.2380385406346952,fw:2.431776229821657,fh:1.2685185406346953},{id:"painting-insect-garden",kind:"painting",room:"central",wall:"S",x:5.1129321077117975,y:1.6,z:-2.965,ix:0,iz:1,iw:2.4012962298216567,ih:1.2380385406346952,s:1,smax:1,title:"El Salvador: Past - Chase Toole Collab",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-insect-garden/",img:"art/painting-insect-garden.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://tjm.art/gallery-images/insect-garden.jpg",w:2.4012962298216567,h:1.2380385406346952,fw:2.431776229821657,fh:1.2685185406346953},{id:"painting-emergence",kind:"painting",room:"central",wall:"S",x:7.540632041345326,y:1.6,z:-2.965,ix:0,iz:1,iw:1.8931436374453998,ih:1.5703495610146174,s:1,smax:1,title:"El Salvador: Present - Chase Toole Collab",price:"$1,000",status:"available",url:"https://tjm.art/products/painting-emergence/",img:"art/painting-emergence.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://tjm.art/gallery-images/emergence.jpg",w:1.8931436374453998,h:1.5703495610146174,fw:1.9236236374453999,fh:1.6008295610146175},{id:"grandpa-howard",kind:"painting",room:"people",wall:"S",x:-32.163903368138,y:1.6,z:.035,ix:0,iz:1,iw:.7173860463992489,ih:1.2950215642791636,s:1,smax:1,title:"Grandpa Howard",price:null,status:"nfs",url:"https://tjm.art/products/grandpa-howard/",img:"art/grandpa-howard.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/wall-paintings/grandpa-howard-c0035dc5a5-308.webp",w:.7173860463992489,h:1.2950215642791636,fw:.7478660463992488,fh:1.3255015642791637},{id:"honeybadger-and-cub-with-genesis-block",kind:"painting",room:"central",wall:"E",x:12.59,y:1.6,z:-.7892399544260777,ix:-1,iz:0,iw:1.3999999999999997,ih:1.9999999999999996,s:1,smax:1,title:"Honeybadger and Cub with Genesis Block",price:"$1,200",status:"available",url:"https://tjm.art/products/honeybadger-and-cub-with-genesis-block/",img:"art/honeybadger-and-cub-with-genesis-block.webp",focal:!1,caption:"100 × 70 cm (W × H)",hi:"https://img.tjm.art/gallery-wall/5661ac7acd18cb2d7e1634c9595fedb2ef05b6a9a0c454b5e5613b77c17a2c7b-960.webp",w:1.3999999999999997,h:1.9999999999999996,fw:1.4304799999999998,fh:2.0304799999999994},{id:"hope-the-vermillion-aurora",kind:"painting",room:"travels",wall:"E",x:12.59,y:1.6,z:30.82846526494103,ix:-1,iz:0,iw:2.2352,ih:1.1176,s:1,smax:1,title:"Hope, the Vermillion Aurora",price:"$2,000",status:"available",url:"https://tjm.art/products/hope-the-vermillion-aurora/",img:"art/hope-the-vermillion-aurora.webp",focal:!1,caption:"44 × 22 in (W × H)",hi:"https://img.tjm.art/gallery-wall/62fadea5e859a0d9adca611a1bbb9d8b714edf350fa0885e2920296867d136fb-960.webp",w:2.2352,h:1.1176,fw:2.2656799999999997,fh:1.14808},{id:"painting-chef-in-white",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.6000000000000003,z:10.061835214855245,ix:1,iz:0,iw:.7184204896855323,ih:1.293156881433958,s:1,smax:1,title:"Jimmy Song @jimmysong",price:"$400",status:"available",url:"https://tjm.art/products/painting-chef-in-white/",img:"art/painting-chef-in-white.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/chef-in-white.jpg",w:.7184204896855323,h:1.293156881433958,fw:.7489004896855322,fh:1.3236368814339579},{id:"joaquim-in-zihuatanejo",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.6,z:2.982023997620167,ix:-1,iz:0,iw:.8564140661103009,ih:1.0847911504063812,s:1,smax:1,title:"Joaquim in Zihuatanejo",price:null,status:"sold",url:"https://tjm.art/products/joaquim-in-zihuatanejo/",img:"art/joaquim-in-zihuatanejo.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/sunset-reflection.jpg",w:.8564140661103009,h:1.0847911504063812,fw:.8868940661103009,fh:1.1152711504063813},{id:"meditation-at-denny-blaine",kind:"painting",room:"people",wall:"N",x:-22.85607434416695,y:1.5999999999999999,z:23.465,ix:0,iz:-1,iw:.8252309677520508,ih:1.1507996635014064,s:1,smax:1,title:"Meditation at Denny Blaine",price:"$600",status:"available",url:"https://tjm.art/products/meditation-at-denny-blaine/",img:"art/meditation-at-denny-blaine.webp",focal:!1,caption:"16 × 23 in (W × H)",hi:"https://img.tjm.art/gallery-wall/80cd427a93dfa369a63d4e8bd5232ebdce59355ee8dfbe8b83aea6b214613cc3-960.webp",w:.8252309677520508,h:1.1507996635014064,fw:.8557109677520508,fh:1.1812796635014062},{id:"painting-portrait-in-blue-light",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:2.0566155466379,z:11.584619598336745,ix:-1,iz:0,iw:.6401126212983141,ih:.7256773020001432,s:1,smax:1,title:"MJ",price:null,status:"nfs",url:"https://tjm.art/products/painting-portrait-in-blue-light/",img:"art/painting-portrait-in-blue-light.webp",focal:!1,caption:"15 × 12 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f8860ee7e0bc016ca435183a6539bac3ba4b0024f1078ac1d1f075f98c2fcb53-960.webp",w:.6401126212983141,h:.7256773020001432,fw:.6705926212983141,fh:.7561573020001432},{id:"painting-lightburst",kind:"painting",room:"travels",wall:"N",x:7.2056148253601835,y:1.6595807893338543,z:34.965,ix:0,iz:-1,iw:1.1945671577605002,ih:2.488681578667709,s:1,smax:1,title:"Revelation",price:null,status:"nfs",url:"https://tjm.art/products/painting-lightburst/",img:"art/painting-lightburst.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/wall-paintings/painting-lightburst-c33406e958-288.webp",w:1.1945671577605002,h:2.488681578667709,fw:1.2250471577605002,fh:2.519161578667709},{id:"rice-paddies-in-vietnam",kind:"painting",room:"people",wall:"S",x:-17.293581804331193,y:1.6,z:.035,ix:0,iz:1,iw:1.29734864893101,ih:.7160992542486577,s:1,smax:1,title:"Rice paddies in Vietnam, Photo Credit: Daniel Goldsmith",price:null,status:"nfs",url:"https://tjm.art/products/rice-paddies-in-vietnam/",img:"art/rice-paddies-in-vietnam.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://tjm.art/gallery-images/two-soldiers.jpg",w:1.29734864893101,h:.7160992542486577,fw:1.32782864893101,fh:.7465792542486577},{id:"painting-phoenix-rising",kind:"painting",room:"central",wall:"N",x:10.413709788720757,y:1.6515816324920105,z:11.965,ix:0,iz:-1,iw:1.2022960328561172,ih:2.472683264984021,s:1,smax:1,title:"The Bounty of Satoshi: Achievement",price:null,status:"nfs",url:"https://tjm.art/products/painting-phoenix-rising/",img:"art/painting-phoenix-rising.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/3ae03c4519694354f32fd4500c9b80d14213531c3e37ed74b2e5a6bb9206b69e-960.webp",w:1.2022960328561172,h:2.472683264984021,fw:1.2327760328561173,fh:2.5031632649840208},{id:"painting-festival-portrait",kind:"painting",room:"central",wall:"N",x:8.927361983571942,y:1.6442791911470902,z:11.965,ix:0,iz:-1,iw:1.2094395774415163,ih:2.4580783822941803,s:1,smax:1,title:"The Bounty of Satoshi: Wonder",price:null,status:"nfs",url:"https://tjm.art/products/painting-festival-portrait/",img:"art/painting-festival-portrait.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/5a93fb9dae1591564ffabae3ec7eb4e3474858bad0c8c0c34ea878f467462e04-960.webp",w:1.2094395774415163,h:2.4580783822941803,fw:1.2399195774415164,fh:2.48855838229418},{id:"painting-figures-in-wheatfield",kind:"painting",room:"travels",wall:"E",x:12.59,y:1.6,z:25.429999391884625,ix:-1,iz:0,iw:.7084649901031347,ih:1.3113285948890097,s:1,smax:1,title:"The Mother of Kiev",price:null,status:"sold",url:"https://tjm.art/products/painting-figures-in-wheatfield/",img:"art/painting-figures-in-wheatfield.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/a97a42644b7c84e4693e2af671f49e0daf4f16a662d7ac9796fe5e2d67c055aa-960.webp",w:.7084649901031347,h:1.3113285948890097,fw:.7389449901031346,fh:1.3418085948890097},{id:"painting-sunflower-woman",kind:"painting",room:"travels",wall:"E",x:12.59,y:1.6,z:23.947610293327262,ix:-1,iz:0,iw:1.3055348980059875,ih:.7116090128413703,s:1,smax:1,title:"Vision of Ukraine at Peace",price:null,status:"sold",url:"https://tjm.art/products/painting-sunflower-woman/",img:"art/painting-sunflower-woman.webp",focal:!1,caption:"24 × 15 in (W × H)",hi:"https://img.tjm.art/gallery-wall/19bc1bffd4191f6c530e4dcbe85d95cb1b2dbd7ccbd6b024a5a285781523d63e-960.webp",w:1.3055348980059875,h:.7116090128413703,fw:1.3360148980059876,fh:.7420890128413704},{id:"warszawska-syrenka",kind:"painting",room:"central",wall:"E",x:12.59,y:1.6,z:2.539239954426078,ix:-1,iz:0,iw:1.3999999999999997,ih:1.9999999999999996,s:1,smax:1,title:"Warszawska Syrenka",price:"$1,200",status:"available",url:"https://tjm.art/products/warszawska-syrenka/",img:"art/warszawska-syrenka.webp",focal:!1,caption:"100 × 70 cm (W × H)",hi:"https://img.tjm.art/gallery-wall/6eb3799795acad929e3a84356c017bc8ce8174a9c4fa0b96604f389444e60718-960.webp",w:1.3999999999999997,h:1.9999999999999996,fw:1.4304799999999998,fh:2.0304799999999994},{id:"friends-club-mural",kind:"mural",room:"travels",wall:"N",x:-1.6226579273364177,y:1.8716,z:34.965,ix:0,iz:-1,iw:12.192,ih:2.7432,s:1,smax:1,title:"Friends Club",price:null,status:"nfs",url:"https://tjm.art/murals/#friends-story",img:"art/friends-club-mural.webp",focal:!1,caption:"Lillooet, British Columbia · 2026 · 40 × 9 ft shipping-container mural",hi:"https://img.tjm.art/walkthrough/friends-club-mural-upscaled-3528-3fd8d748ff.webp",w:12.192,h:2.7432,fw:12.192,fh:2.7432},{id:"book-art-9ae261289a3bce952c6f",kind:"painting",room:"travels",wall:"W",x:-12.59,y:1.6,z:33.26162900984853,ix:1,iz:0,iw:.7896717093456702,ih:.30244426467939173,s:1,smax:1,title:"Lisa Climbing Tahoma at Sunrise from Denny Blaine prototype",price:null,status:"nfs",url:"https://tjm.art/products/book-art-9ae261289a3bce952c6f/",img:"art/book-art-9ae261289a3bce952c6f.webp",focal:!1,caption:"Shown at its largest print size, 15.5 × 6 in",hi:"https://img.tjm.art/wall-paintings/book-art-9ae261289a3bce952c6f-c02294e976-960.webp",w:.7896717093456702,h:.30244426467939173,fw:.8201517093456703,fh:.3329242646793918},{id:"book-art-6e6d7ac51608e0b7f10f",kind:"painting",room:"travels",wall:"S",x:9.078948122407057,y:1.9358528511052784,z:15.535,ix:0,iz:1,iw:.2780957448148393,ih:.44282761913190966,s:1,smax:1,title:"Moonrise in Santa Monica, photo credit: Paul Murphy",price:null,status:"nfs",url:"https://tjm.art/products/book-art-6e6d7ac51608e0b7f10f/",img:"art/book-art-6e6d7ac51608e0b7f10f.webp",focal:!1,caption:"Shown at its largest print size, 5.5 × 8.7 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/6e6d7ac51608e0b7f10f.webp",w:.2780957448148393,h:.44282761913190966,fw:.3085757448148393,fh:.47330761913190966},{id:"book-art-471daf14a8bb7883f114",kind:"painting",room:"travels",wall:"S",x:9.935107331049455,y:1.3646640168369895,z:15.535,ix:0,iz:1,iw:.5746169096888404,ih:.3085692805029073,s:1,smax:1,title:"Myself in Skandasana on Playa de los Muertos at Dawn in Puerto Vallarta",price:null,status:"nfs",url:"https://tjm.art/products/book-art-471daf14a8bb7883f114/",img:"art/book-art-471daf14a8bb7883f114.webp",focal:!1,caption:"Shown at its largest print size, 11.3 × 6.1 in",hi:"https://img.tjm.art/wall-paintings/book-art-471daf14a8bb7883f114-6db9296c0b-960.webp",w:.5746169096888404,h:.3085692805029073,fw:.6050969096888403,fh:.3390492805029073},{id:"book-art-c198f09bc8ddad18ed1e",kind:"painting",room:"travels",wall:"S",x:8.28935622233976,y:1.6,z:15.535,ix:0,iz:1,iw:.44148229253864113,ih:.2406078494335594,s:1,smax:1,title:"Sunrise at Bass Coast, Merritt, BC 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-c198f09bc8ddad18ed1e/",img:"art/book-art-c198f09bc8ddad18ed1e.webp",focal:!1,caption:"Shown at its largest print size, 8.7 × 4.7 in",hi:"https://img.tjm.art/wall-paintings/book-art-c198f09bc8ddad18ed1e-994bc476f6-960.webp",w:.44148229253864113,h:.2406078494335594,fw:.47196229253864114,fh:.2710878494335594},{id:"book-art-87cf2a732259b313f5ab",kind:"painting",room:"travels",wall:"S",x:4.0849683204747445,y:1.6,z:15.535,ix:0,iz:1,iw:.22586354440209216,ih:.397647085214951,s:1,smax:1,title:"Sunrise in Puerto Vallarta",price:null,status:"nfs",url:"https://tjm.art/products/book-art-87cf2a732259b313f5ab/",img:"art/book-art-87cf2a732259b313f5ab.webp",focal:!1,caption:"Shown at its largest print size, 4.4 × 7.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/87cf2a732259b313f5ab.webp",w:.22586354440209216,h:.397647085214951,fw:.25634354440209217,fh:.428127085214951},{id:"book-art-e97329411fa8b273b508",kind:"painting",room:"travels",wall:"S",x:9.078948122407057,y:1.2833461904340453,z:15.535,ix:0,iz:1,iw:.29499135545507105,ih:.4812257022105564,s:1,smax:1,title:"Sunrise in Traverse City, photo credit: Paul Murphy",price:null,status:"nfs",url:"https://tjm.art/products/book-art-e97329411fa8b273b508/",img:"art/book-art-e97329411fa8b273b508.webp",focal:!1,caption:"Shown at its largest print size, 5.8 × 9.5 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/e97329411fa8b273b508.webp",w:.29499135545507105,h:.4812257022105564,fw:.32547135545507105,fh:.5117057022105564},{id:"book-art-deb3358c321671dae1fc",kind:"painting",room:"travels",wall:"N",x:5.733216659571758,y:1.2560012901588533,z:34.965,ix:0,iz:-1,iw:.3255459822972186,ih:.6006383437218055,s:1,smax:1,title:"Sunrise on Tahoma with motorcycles",price:null,status:"nfs",url:"https://tjm.art/products/book-art-deb3358c321671dae1fc/",img:"art/book-art-deb3358c321671dae1fc.webp",focal:!1,caption:"Shown at its largest print size, 6.4 × 11.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/deb3358c321671dae1fc.webp",w:.3255459822972186,h:.6006383437218055,fw:.3560259822972186,fh:.6311183437218055},{id:"book-art-e589c9375e23d1de4748",kind:"painting",room:"travels",wall:"S",x:9.935107331049455,y:1.8495246402514538,z:15.535,ix:0,iz:1,iw:.5075941418949661,ih:.2801919663260212,s:1,smax:1,title:"Sunset in Greece, Photo Credit: Chelsea Murphy",price:null,status:"nfs",url:"https://tjm.art/products/book-art-e589c9375e23d1de4748/",img:"art/book-art-e589c9375e23d1de4748.webp",focal:!1,caption:"Shown at its largest print size, 10 × 5.5 in",hi:"https://img.tjm.art/wall-paintings/book-art-e589c9375e23d1de4748-878e092b32-960.webp",w:.5075941418949661,h:.2801919663260212,fw:.538074141894966,fh:.3106719663260212},{id:"book-art-d1399111a441ed91feaa",kind:"painting",room:"travels",wall:"N",x:5.733216659571758,y:1.995559171860903,z:34.965,ix:0,iz:-1,iw:.2736345808252618,ih:.4975174196822941,s:1,smax:1,title:"Sunset in the Strait of Juan de Fuca, Patos Island 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-d1399111a441ed91feaa/",img:"art/book-art-d1399111a441ed91feaa.webp",focal:!1,caption:"Shown at its largest print size, 5.4 × 9.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/d1399111a441ed91feaa.webp",w:.2736345808252618,h:.4975174196822941,fw:.3041145808252618,fh:.5279974196822941},{id:"book-art-a2e53a8418a8d84f3dc5",kind:"painting",room:"travels",wall:"S",x:-1.311471711800241,y:1.397511553086341,z:15.535,ix:0,iz:1,iw:.2954171324542519,ih:.22747119198977392,s:1,smax:1,title:"El Salvador",price:null,status:"nfs",url:"https://tjm.art/products/book-art-a2e53a8418a8d84f3dc5/",img:"art/book-art-a2e53a8418a8d84f3dc5.webp",focal:!1,caption:"Shown at its largest print size, 5.8 × 4.5 in",hi:"https://img.tjm.art/wall-paintings/book-art-a2e53a8418a8d84f3dc5-eba19eb317-960.webp",w:.2954171324542519,h:.22747119198977392,fw:.3258971324542519,fh:.2579511919897739},{id:"book-art-e3293c73dbb01f94b39b",kind:"painting",room:"travels",wall:"S",x:-1.311471711800241,y:1.808975595994887,z:15.535,ix:0,iz:1,iw:.2701472214449861,ih:.21449689382731896,s:1,smax:1,title:"El Salvador",price:null,status:"nfs",url:"https://tjm.art/products/book-art-e3293c73dbb01f94b39b/",img:"art/book-art-e3293c73dbb01f94b39b.webp",focal:!1,caption:"Shown at its largest print size, 5.3 × 4.2 in",hi:"https://img.tjm.art/wall-paintings/book-art-e3293c73dbb01f94b39b-2be213bfaa-960.webp",w:.2701472214449861,h:.21449689382731896,fw:.3006272214449861,fh:.24497689382731896},{id:"book-art-55829535637cd4974a88",kind:"painting",room:"travels",wall:"S",x:3.047759323409848,y:1.6,z:15.535,ix:0,iz:1,iw:.28887463507927824,ih:.2258999646319956,s:1,smax:1,title:"Hawaii",price:null,status:"nfs",url:"https://tjm.art/products/book-art-55829535637cd4974a88/",img:"art/book-art-55829535637cd4974a88.webp",focal:!1,caption:"Shown at its largest print size, 5.7 × 4.4 in",hi:"https://img.tjm.art/wall-paintings/book-art-55829535637cd4974a88-f905147f0a-960.webp",w:.28887463507927824,h:.2258999646319956,fw:.31935463507927825,fh:.25637996463199564},{id:"book-art-94e2edf9a24c90950489",kind:"painting",room:"travels",wall:"S",x:10.956327892946938,y:1.911010329399472,z:15.535,ix:0,iz:1,iw:.6251140619652434,ih:.30568077630100404,s:1,smax:1,title:"Inside album cover for Yes: Close to the Edge",price:null,status:"nfs",url:"https://tjm.art/products/book-art-94e2edf9a24c90950489/",img:"art/book-art-94e2edf9a24c90950489.webp",focal:!1,caption:"Shown at its largest print size, 12.3 × 6 in",hi:"https://img.tjm.art/wall-paintings/book-art-94e2edf9a24c90950489-bfc815d54d-960.webp",w:.6251140619652434,h:.30568077630100404,fw:.6555940619652434,fh:.336160776301004},{id:"book-art-ff6db6906f0ed48ccc3a",kind:"painting",room:"travels",wall:"E",x:12.59,y:2.0322790073478956,z:22.489801422162135,ix:-1,iz:0,iw:.6593045353186678,ih:.4931597924183636,s:1,smax:1,title:"Sedona Monuments",price:null,status:"nfs",url:"https://tjm.art/products/book-art-ff6db6906f0ed48ccc3a/",img:"art/book-art-ff6db6906f0ed48ccc3a.webp",focal:!1,caption:"Shown at its largest print size, 13 × 9.7 in",hi:"https://img.tjm.art/wall-paintings/book-art-ff6db6906f0ed48ccc3a-6efc3645f3-960.webp",w:.6593045353186678,h:.4931597924183636,fw:.6897845353186678,fh:.5236397924183636},{id:"book-art-27fee33e69f262ecfacb",kind:"painting",room:"travels",wall:"E",x:12.59,y:1.258180103790818,z:22.489801422162135,ix:-1,iz:0,iw:.5116252131541055,ih:.6740780146957911,s:1,smax:1,title:"Sedona: Bell Rock 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-27fee33e69f262ecfacb/",img:"art/book-art-27fee33e69f262ecfacb.webp",focal:!1,caption:"Shown at its largest print size, 10.1 × 13.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/27fee33e69f262ecfacb.webp",w:.5116252131541055,h:.6740780146957911,fw:.5421052131541055,fh:.704558014695791},{id:"book-art-f2025e5a72f4a70866c6",kind:"painting",room:"travels",wall:"S",x:10.956327892946938,y:1.351919611849498,z:15.535,ix:0,iz:1,iw:.5374105339961939,ih:.43154065879894365,s:1,smax:1,title:"Untitled — Assorted Adventures, page 59",price:null,status:"nfs",url:"https://tjm.art/products/book-art-f2025e5a72f4a70866c6/",img:"art/book-art-f2025e5a72f4a70866c6.webp",focal:!1,caption:"Shown at its largest print size, 10.6 × 8.5 in",hi:"https://img.tjm.art/wall-paintings/book-art-f2025e5a72f4a70866c6-f6d52f6258-960.webp",w:.5374105339961939,h:.43154065879894365,fw:.5678905339961939,fh:.46202065879894366},{id:"book-art-3a9cba708a8045364e82",kind:"painting",room:"archive",wall:"S",x:28.024208387503958,y:1.6,z:.035,ix:0,iz:1,iw:.6021956096422897,ih:.31976586872005586,s:1,smax:1,title:"Dawn and her father Pete at Burning Man",price:null,status:"nfs",url:"https://tjm.art/products/book-art-3a9cba708a8045364e82/",img:"art/book-art-3a9cba708a8045364e82.webp",focal:!1,caption:"Shown at its largest print size, 11.9 × 6.3 in",hi:"https://img.tjm.art/wall-paintings/book-art-3a9cba708a8045364e82-6d25875d18-960.webp",w:.6021956096422897,h:.31976586872005586,fw:.6326756096422896,fh:.3502458687200558},{id:"archived-painting-22",kind:"painting",room:"archive",wall:"S",x:37.4557332355685,y:1.6000000000000003,z:.035,ix:0,iz:1,iw:2.4097868898506176,ih:1.1565716502726808,s:1,smax:1,title:"Devo & Katie @ Bass Coast",price:"$1,000",status:"available",url:"https://tjm.art/products/archived-painting-22/",img:"art/archived-painting-22.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/a162cfb27e01580ab91fcb783c9c9b81fe68a0e4f572c73e902855b0eb09365a-960.webp",w:2.4097868898506176,h:1.1565716502726808,fw:2.4402668898506175,fh:1.187051650272681},{id:"book-art-74a736000a32427842b1",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.2795575043030958,z:16.600156402800287,ix:-1,iz:0,iw:.5658555360795986,ih:.5041772826469224,s:1,smax:1,title:"Laura and Cafécito on paddleboard in Lake Washington",price:null,status:"nfs",url:"https://tjm.art/products/book-art-74a736000a32427842b1/",img:"art/book-art-74a736000a32427842b1.webp",focal:!1,caption:"Shown at its largest print size, 11.1 × 9.9 in",hi:"https://img.tjm.art/wall-paintings/book-art-74a736000a32427842b1-845d6258d2-960.webp",w:.5658555360795986,h:.5041772826469224,fw:.5963355360795985,fh:.5346572826469225},{id:"book-art-50a7984f819bec72d1c7",kind:"painting",room:"people",wall:"N",x:-25.02785592352841,y:1.6,z:23.465,ix:0,iz:-1,iw:.38572486707711584,ih:.5129320040919093,s:1,smax:1,title:"Myself Painting on Mt Baker near Goat Lake",price:null,status:"nfs",url:"https://tjm.art/products/book-art-50a7984f819bec72d1c7/",img:"art/book-art-50a7984f819bec72d1c7.webp",focal:!1,caption:"Shown at its largest print size, 7.6 × 10.1 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/50a7984f819bec72d1c7.webp",w:.38572486707711584,h:.5129320040919093,fw:.41620486707711585,fh:.5434120040919093},{id:"archived-painting-308",kind:"painting",room:"people",wall:"N",x:-24.051841659016414,y:1.6,z:23.465,ix:0,iz:-1,iw:.6896920516739855,ih:.9094933213316173,s:1,smax:1,title:"Self Portrait on Goat Lake",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-308/",img:"art/archived-painting-308.webp",focal:!1,caption:"Shown at its largest print size, 13.6 × 17.9 in",hi:"https://img.tjm.art/gallery-wall/23cb306de1e7d1c1608c00cfb6ed7f612683d28af9cad0e20444ea53f4f23fe8-960.webp",w:.6896920516739855,h:.9094933213316173,fw:.7201720516739856,fh:.9399733213316173},{id:"archived-painting-370",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.6,z:9.151353266124621,ix:-1,iz:0,iw:.9120583502210449,ih:.6856092738440254,s:1,smax:1,title:"Ben & Kermit & Swan",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-370/",img:"art/archived-painting-370.webp",focal:!1,caption:"Shown at its largest print size, 18 × 13.5 in",hi:"https://img.tjm.art/gallery-wall/4b6a2895e642a6103cba97fdfc26f05f48f0f2121136f3db346f87b90e151445-960.webp",w:.9120583502210449,h:.6856092738440254,fw:.9425383502210448,fh:.7160892738440253},{id:"archived-painting-416",kind:"painting",room:"central",wall:"N",x:.6893622685468881,y:1.6,z:11.965,ix:0,iz:-1,iw:1.0768090734028848,ih:.5946911295180528,s:1,smax:1,title:"Brekkie Finishing Orange Calcite B",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-416/",img:"art/archived-painting-416.webp",focal:!1,caption:"Shown at its largest print size, 21.2 × 11.7 in",hi:"https://img.tjm.art/gallery-wall/a616e8fe5d34df6ce9ddba9e9c389ffee6a97974faea046237220f94c7710e30-960.webp",w:1.0768090734028848,h:.5946911295180528,fw:1.1072890734028848,fh:.6251711295180529},{id:"archived-painting-412",kind:"painting",room:"central",wall:"N",x:4.014243920177384,y:1.6,z:11.965,ix:0,iz:-1,iw:.8566451490837687,ih:.6195999478460914,s:1,smax:1,title:"Brekkie Hoisting Orange Calcite B",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-412/",img:"art/archived-painting-412.webp",focal:!1,caption:"Shown at its largest print size, 16.9 × 12.2 in",hi:"https://img.tjm.art/gallery-wall/49077623a9eebab719aa89b099be7bcf78a21f03cb7ea7e247ac7f55f03293db-960.webp",w:.8566451490837687,h:.6195999478460914,fw:.8871251490837686,fh:.6500799478460914},{id:"archived-painting-301",kind:"painting",room:"people",wall:"S",x:-21.379552838107095,y:1.5999999999999999,z:.035,ix:0,iz:1,iw:1.1262589194405286,ih:1.209826529655244,s:1,smax:1,title:"Catherine #1",price:"$600",status:"available",url:"https://tjm.art/products/archived-painting-301/",img:"art/archived-painting-301.webp",focal:!1,caption:"22 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/83af905a4d9fc70fe6a9f1e6701a3b701bda410567f28a456c6553c272b2358f-960.webp",w:1.1262589194405286,h:1.209826529655244,fw:1.1567389194405286,fh:1.240306529655244},{id:"book-art-9209f1fd7d47f373597f",kind:"painting",room:"people",wall:"S",x:-25.028408943961296,y:2.025199954743127,z:.035,ix:0,iz:1,iw:.2321127231660063,ih:.5461475839200148,s:1,smax:1,title:"Catherine dance series — study 1",price:null,status:"nfs",url:"https://tjm.art/products/book-art-9209f1fd7d47f373597f/",img:"art/book-art-9209f1fd7d47f373597f.webp",focal:!1,caption:"Shown at its largest print size, 4.6 × 10.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/9209f1fd7d47f373597f.webp",w:.2321127231660063,h:.5461475839200148,fw:.2625927231660063,fh:.5766275839200148},{id:"book-art-a61c71e5de8cc1b71500",kind:"painting",room:"people",wall:"S",x:-25.028408943961296,y:1.2180405186443306,z:.035,ix:0,iz:1,iw:.32747531361635723,ih:.5173385681143085,s:1,smax:1,title:"Catherine dance series — study 2",price:null,status:"nfs",url:"https://tjm.art/products/book-art-a61c71e5de8cc1b71500/",img:"art/book-art-a61c71e5de8cc1b71500.webp",focal:!1,caption:"Shown at its largest print size, 6.4 × 10.2 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/a61c71e5de8cc1b71500.webp",w:.32747531361635723,h:.5173385681143085,fw:.35795531361635724,fh:.5478185681143084},{id:"book-art-596837cb5ff533c620dd",kind:"painting",room:"people",wall:"S",x:-24.418180707448183,y:2.025199954743127,z:.035,ix:0,iz:1,iw:.33202115940986554,ih:.5734389627113394,s:1,smax:1,title:"Catherine dance series — study 3",price:null,status:"nfs",url:"https://tjm.art/products/book-art-596837cb5ff533c620dd/",img:"art/book-art-596837cb5ff533c620dd.webp",focal:!1,caption:"Shown at its largest print size, 6.5 × 11.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/596837cb5ff533c620dd.webp",w:.33202115940986554,h:.5734389627113394,fw:.36250115940986555,fh:.6039189627113395},{id:"book-art-7bce6e3509027d1f7a0b",kind:"painting",room:"people",wall:"S",x:-24.418180707448183,y:1.2180405186443306,z:.035,ix:0,iz:1,iw:.3088425176395667,ih:.6599199094862537,s:1,smax:1,title:"Catherine dance series — study 4",price:null,status:"nfs",url:"https://tjm.art/products/book-art-7bce6e3509027d1f7a0b/",img:"art/book-art-7bce6e3509027d1f7a0b.webp",focal:!1,caption:"Shown at its largest print size, 6.1 × 13 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/7bce6e3509027d1f7a0b.webp",w:.3088425176395667,h:.6599199094862537,fw:.3393225176395667,fh:.6903999094862536},{id:"archived-painting-133",kind:"painting",room:"archive",wall:"S",x:35.27687766438818,y:1.6000000000000003,z:.035,ix:0,iz:1,iw:.6886976134976582,ih:1.156687021539198,s:1,smax:1,title:"Devo in Front of the Mayan Warrior",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-133/",img:"art/archived-painting-133.webp",focal:!1,caption:"Shown at its largest print size, 13.6 × 22.8 in",hi:"https://img.tjm.art/gallery-wall/20686e5b976babbe2b5e90a7067f631f6bbbdcdf654e83b6985bdbe7431acc6c-960.webp",w:.6886976134976582,h:1.156687021539198,fw:.7191776134976582,fh:1.187167021539198},{id:"archived-painting-363",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:8.34397351607442,ix:1,iz:0,iw:.6073827663955337,ih:.8290800146480133,s:1,smax:1,title:"Elon & Lil’ X in the Oval Office",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-363/",img:"art/archived-painting-363.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.3 in",hi:"https://img.tjm.art/gallery-wall/c395c1c2a73621f0eba699af365ff267e7e04b4d7af6d133ec931f03a98938d0-960.webp",w:.6073827663955337,h:.8290800146480133,fw:.6378627663955336,fh:.8595600146480133},{id:"archived-painting-66",kind:"painting",room:"people",wall:"S",x:-23.097426212785305,y:1.6,z:.035,ix:0,iz:1,iw:1.3391928701845242,ih:1.1022505517047803,s:1,smax:1,title:"Flamenco Guitarist in Zihuatanejo",price:"$600",status:"available",url:"https://tjm.art/products/archived-painting-66/",img:"art/archived-painting-66.webp",focal:!1,caption:"26 × 22 in (W × H)",hi:"https://img.tjm.art/gallery-wall/51f462f3a96a1a6da5485b16a847912d453b17ea5afba5ada4624619ff5287a3-960.webp",w:1.3391928701845242,h:1.1022505517047803,fw:1.369672870184524,fh:1.13273055170478},{id:"archived-painting-367",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:10.5061095322177,ix:1,iz:0,iw:.6099465010790747,ih:.8383591991253301,s:1,smax:1,title:"Josie, The Redheaded Libertarian",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-367/",img:"art/archived-painting-367.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.5 in",hi:"https://img.tjm.art/gallery-wall/64e27601d760271561cd6a29135a46e368d669d2d9dfa7360337d561aa2ad8f8-960.webp",w:.6099465010790747,h:.8383591991253301,fw:.6404265010790746,fh:.8688391991253301},{id:"archived-painting-364",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.6,z:1.0501372085244642,ix:1,iz:0,iw:.8345308182340554,ih:.6134563256146484,s:1,smax:1,title:"Max Keiser & Michael Saylor",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-364/",img:"art/archived-painting-364.webp",focal:!1,caption:"Shown at its largest print size, 16.4 × 12.1 in",hi:"https://img.tjm.art/gallery-wall/b29e07d3045e85d048b268939aa32ca68a492f7a88b694408491e4969250181a-960.webp",w:.8345308182340554,h:.6134563256146484,fw:.8650108182340553,fh:.6439363256146483},{id:"archived-painting-362",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.6,z:2.96244763796188,ix:1,iz:0,iw:.8861381628227467,ih:.6317711538994105,s:1,smax:1,title:"Max Keiser & Stacey Herbert",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-362/",img:"art/archived-painting-362.webp",focal:!1,caption:"Shown at its largest print size, 17.4 × 12.4 in",hi:"https://img.tjm.art/gallery-wall/495def835824cee6f5ddabd2e49dac28b6a11588900c98d69c8294f33fe724ac-960.webp",w:.8861381628227467,h:.6317711538994105,fw:.9166181628227467,fh:.6622511538994105},{id:"book-art-029f45a5fbfd6c90212e",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.6,z:15.683191938531046,ix:-1,iz:0,iw:.4037617341390608,ih:.7274986200703798,s:1,smax:1,title:"Mikyla, Mandy, and Guin",price:null,status:"nfs",url:"https://tjm.art/products/book-art-029f45a5fbfd6c90212e/",img:"art/book-art-029f45a5fbfd6c90212e.webp",focal:!1,caption:"Shown at its largest print size, 7.9 × 14.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/029f45a5fbfd6c90212e.webp",w:.4037617341390608,h:.7274986200703798,fw:.4342417341390608,fh:.7579786200703797},{id:"archived-painting-img-1608",kind:"painting",room:"people",wall:"S",x:-30.9592666953228,y:1.6,z:.035,ix:0,iz:1,iw:.721592339499789,ih:1.2874726478443603,s:1,smax:1,title:"My Dad, Paul Murphy",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-img-1608/",img:"art/archived-painting-img-1608.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/7401a29fec30c8f5333f5830871d8efb867cf0ad3418fd92e1740f65d66f03c1-960.webp",w:.721592339499789,h:1.2874726478443603,fw:.752072339499789,fh:1.3179526478443604},{id:"book-art-0f696788184bbba1d236",kind:"painting",room:"people",wall:"N",x:-26.613835708443172,y:1.6,z:23.465,ix:0,iz:-1,iw:.2151867647164373,ih:.3465165293340376,s:1,smax:1,title:"Myself",price:null,status:"nfs",url:"https://tjm.art/products/book-art-0f696788184bbba1d236/",img:"art/book-art-0f696788184bbba1d236.webp",focal:!1,caption:"Shown at its largest print size, 4.2 × 6.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/0f696788184bbba1d236.webp",w:.2151867647164373,h:.3465165293340376,fw:.24566676471643734,fh:.3769965293340376},{id:"archived-painting-366",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6000000000000003,z:14.021149457133227,ix:1,iz:0,iw:.6173772365412088,ih:.8654789439889642,s:1,smax:1,title:"RFK",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-366/",img:"art/archived-painting-366.webp",focal:!1,caption:"Shown at its largest print size, 12.2 × 17 in",hi:"https://img.tjm.art/gallery-wall/c0436ee7e503922435d19062a877a660c2d4d1fd21d412725010fa4cbf21899e-960.webp",w:.6173772365412088,h:.8654789439889642,fw:.6478572365412087,fh:.8959589439889641},{id:"archived-painting-390",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:7.26658604955499,ix:1,iz:0,iw:.5998041847268121,ih:.8379990726496529,s:1,smax:1,title:"Ron Paul",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-390/",img:"art/archived-painting-390.webp",focal:!1,caption:"Shown at its largest print size, 11.8 × 16.5 in",hi:"https://img.tjm.art/gallery-wall/5030c993aeaef08722c6dd789360a6bfcf46cd82ce48612ef2444a140c3e6d30-960.webp",w:.5998041847268121,h:.8379990726496529,fw:.6302841847268121,fh:.868479072649653},{id:"book-art-4a0bb9cdd6c404c4e77c",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.8640410991259997,z:-1.5019077191685937,ix:1,iz:0,iw:.2434701767574868,ih:.34633026565787595,s:1,smax:1,title:"Scarlette Melon @Scarlette_melon",price:null,status:"nfs",url:"https://tjm.art/products/book-art-4a0bb9cdd6c404c4e77c/",img:"art/book-art-4a0bb9cdd6c404c4e77c.webp",focal:!1,caption:"Shown at its largest print size, 4.8 × 6.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/4a0bb9cdd6c404c4e77c.webp",w:.2434701767574868,h:.34633026565787595,fw:.2739501767574868,fh:.37681026565787595},{id:"archived-painting-53",kind:"painting",room:"people",wall:"N",x:-21.402467645262703,y:1.5999999999999999,z:23.465,ix:0,iz:-1,iw:1.20537081978355,ih:2.312227203658772,s:1,smax:1,title:"Self Portrait, Meditation at Denny Blaine",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-53/",img:"art/archived-painting-53.webp",focal:!1,caption:"24 × 45 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9d83b86870ee61249fa5ad1a985a10ff503b1f8951db8db8d8c471dd76a07dcb-960.webp",w:1.20537081978355,h:2.312227203658772,fw:1.23585081978355,fh:2.342707203658772},{id:"archived-painting-387",kind:"painting",room:"people",wall:"N",x:-30.404239134330854,y:1.6,z:23.465,ix:0,iz:-1,iw:.5875478023306022,ih:.7959232977696606,s:1,smax:1,title:"Tulsi Gabbard #1",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-387/",img:"art/archived-painting-387.webp",focal:!1,caption:"Shown at its largest print size, 11.6 × 15.7 in",hi:"https://img.tjm.art/gallery-wall/c9bbb3f33ff4f860e9846a7479cb19550c230739149e5bbb3275ef7e4cb0f847-960.webp",w:.5875478023306022,h:.7959232977696606,fw:.6180278023306023,fh:.8264032977696607},{id:"archived-painting-389",kind:"painting",room:"people",wall:"N",x:-31.28395038558045,y:1.6,z:23.465,ix:0,iz:-1,iw:.6109147001685911,ih:.8203082951003027,s:1,smax:1,title:"Tulsi Gabbard #2",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-389/",img:"art/archived-painting-389.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.1 in",hi:"https://img.tjm.art/gallery-wall/8bf2e4be17af62dd9bccf1e9d2f9aff40bac6ea178e0d5b0ef8610702d55c3c9-960.webp",w:.6109147001685911,h:.8203082951003027,fw:.641394700168591,fh:.8507882951003026},{id:"archived-painting-img-1612",kind:"painting",room:"central",wall:"N",x:2.406844075441915,y:1.5999999999999999,z:11.965,ix:0,iz:-1,iw:1.2878075298257043,ih:2.30849502829228,s:1,smax:1,title:"Bounty of Satoshi: Achievement",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-img-1612/",img:"art/archived-painting-img-1612.webp",focal:!1,caption:"24 × 48 in (W × H)",hi:"https://img.tjm.art/gallery-wall/c987f826bbffc0e4dea91ece695bcfab8181cb008757b2e5c9b97c130088b6e1-960.webp",w:1.2878075298257043,h:2.30849502829228,fw:1.3182875298257044,fh:2.3389750282922797},{id:"archived-painting-img-1555",kind:"painting",room:"people",wall:"S",x:-27.968349511677044,y:1.6,z:.035,ix:0,iz:1,iw:.9434853057487933,ih:.7623713342469618,s:1,smax:1,title:"Dad Meditating in Yellowstone",price:"$400",status:"available",url:"https://tjm.art/products/archived-painting-img-1555/",img:"art/archived-painting-img-1555.webp",focal:!1,caption:"Shown at its largest print size, 18.6 × 15 in",hi:"https://img.tjm.art/gallery-wall/140afceb54fcf91b85e0778adfaff80793eb576d4d1a005b4ca5717e7cf6d0a1-960.webp",w:.9434853057487933,h:.7623713342469618,fw:.9739653057487933,fh:.7928513342469617},{id:"book-art-14d2876a55c720cbc908",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.9473286413234612,z:16.600156402800287,ix:-1,iz:0,iw:.6370650514763909,ih:.4504049913938084,s:1,smax:1,title:"Jane and Sid in Zihuatanejo",price:null,status:"nfs",url:"https://tjm.art/products/book-art-14d2876a55c720cbc908/",img:"art/book-art-14d2876a55c720cbc908.webp",focal:!1,caption:"Shown at its largest print size, 12.5 × 8.9 in",hi:"https://img.tjm.art/wall-paintings/book-art-14d2876a55c720cbc908-987aa02cb7-960.webp",w:.6370650514763909,h:.4504049913938084,fw:.667545051476391,fh:.4808849913938084},{id:"book-art-616ff8378f27047b4a91",kind:"painting",room:"people",wall:"N",x:-20.244937181021914,y:1.6,z:23.465,ix:0,iz:-1,iw:.23307849842514328,ih:.2530711166396778,s:1,smax:1,title:"Jasmine in Austin",price:null,status:"nfs",url:"https://tjm.art/products/book-art-616ff8378f27047b4a91/",img:"art/book-art-616ff8378f27047b4a91.webp",focal:!1,caption:"Shown at its largest print size, 4.6 × 5 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/616ff8378f27047b4a91.webp",w:.23307849842514328,h:.2530711166396778,fw:.2635584984251433,fh:.2835511166396778},{id:"book-art-a627c7b7d19ace6b3e51",kind:"painting",room:"people",wall:"N",x:-17.684032356438607,y:1.9283269522295456,z:23.465,ix:0,iz:-1,iw:.417816008491564,ih:.47371429534190923,s:1,smax:1,title:"John",price:null,status:"nfs",url:"https://tjm.art/products/book-art-a627c7b7d19ace6b3e51/",img:"art/book-art-a627c7b7d19ace6b3e51.webp",focal:!1,caption:"Shown at its largest print size, 8.2 × 9.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/a627c7b7d19ace6b3e51.webp",w:.417816008491564,h:.47371429534190923,fw:.4482960084915639,fh:.5041942953419092},{id:"book-art-28bec44600b36ed0766f",kind:"painting",room:"people",wall:"N",x:-18.517842444638163,y:1.6,z:23.465,ix:0,iz:-1,iw:.37319255763465076,ih:.4595967458554812,s:1,smax:1,title:"Julia's baby shower",price:null,status:"nfs",url:"https://tjm.art/products/book-art-28bec44600b36ed0766f/",img:"art/book-art-28bec44600b36ed0766f.webp",focal:!1,caption:"Shown at its largest print size, 7.3 × 9 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/28bec44600b36ed0766f.webp",w:.37319255763465076,h:.4595967458554812,fw:.4036725576346507,fh:.4900767458554812},{id:"book-art-1143b08e177333e43dc7",kind:"painting",room:"people",wall:"N",x:-17.684032356438607,y:1.2679028523290454,z:23.465,ix:0,iz:-1,iw:.3925184275545546,ih:.466173904459091,s:1,smax:1,title:"Kristine",price:null,status:"nfs",url:"https://tjm.art/products/book-art-1143b08e177333e43dc7/",img:"art/book-art-1143b08e177333e43dc7.webp",focal:!1,caption:"Shown at its largest print size, 7.7 × 9.2 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/1143b08e177333e43dc7.webp",w:.3925184275545546,h:.466173904459091,fw:.42299842755455463,fh:.49665390445909097},{id:"book-art-0ee2717bc04e65d0507e",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.6,z:-.6831123612634081,ix:1,iz:0,iw:.5109261541475586,ih:.5614573122500645,s:1,smax:1,title:"Kushboo Kullar @DrKhushboo_K",price:null,status:"nfs",url:"https://tjm.art/products/book-art-0ee2717bc04e65d0507e/",img:"art/book-art-0ee2717bc04e65d0507e.webp",focal:!1,caption:"Shown at its largest print size, 10.1 × 11.1 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/0ee2717bc04e65d0507e.webp",w:.5109261541475586,h:.5614573122500645,fw:.5414061541475585,fh:.5919373122500644},{id:"book-art-64cfd389b3dbb5cde532",kind:"painting",room:"people",wall:"N",x:-16.817442176096414,y:1.2610084767111476,z:23.465,ix:0,iz:-1,iw:.41582187130538134,ih:.4938502034505716,s:1,smax:1,title:"Loree",price:null,status:"nfs",url:"https://tjm.art/products/book-art-64cfd389b3dbb5cde532/",img:"art/book-art-64cfd389b3dbb5cde532.webp",focal:!1,caption:"Shown at its largest print size, 8.2 × 9.7 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/64cfd389b3dbb5cde532.webp",w:.41582187130538134,h:.4938502034505716,fw:.44630187130538135,fh:.5243302034505716},{id:"book-art-c04c7e48687fe35e65f5",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.6,z:8.94369248500624,ix:1,iz:0,iw:.2294758894084991,ih:.25024633523282347,s:1,smax:1,title:"Maya Parbhoe @MayaPar25",price:null,status:"nfs",url:"https://tjm.art/products/book-art-c04c7e48687fe35e65f5/",img:"art/book-art-c04c7e48687fe35e65f5.webp",focal:!1,caption:"Shown at its largest print size, 4.5 × 4.9 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/c04c7e48687fe35e65f5.webp",w:.2294758894084991,h:.25024633523282347,fw:.2599558894084991,fh:.2807263352328235},{id:"book-art-c347459aa3f77f7213ae",kind:"painting",room:"people",wall:"N",x:-19.416418327632414,y:1.6,z:23.465,ix:0,iz:-1,iw:.5473475980809642,ih:.3010411789445303,s:1,smax:1,title:"Mike and Julie in Leon",price:null,status:"nfs",url:"https://tjm.art/products/book-art-c347459aa3f77f7213ae/",img:"art/book-art-c347459aa3f77f7213ae.webp",focal:!1,caption:"Shown at its largest print size, 10.8 × 5.9 in",hi:"https://img.tjm.art/wall-paintings/book-art-c347459aa3f77f7213ae-8823455597-960.webp",w:.5473475980809642,h:.3010411789445303,fw:.5778275980809642,fh:.33152117894453026},{id:"book-art-504e3fafdacd7c9bbcd0",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.6,z:.10261125760890388,ix:1,iz:0,iw:.24107452234357196,ih:.3463714401488104,s:1,smax:1,title:"Osisipho Filane @FilaneSisipho",price:null,status:"nfs",url:"https://tjm.art/products/book-art-504e3fafdacd7c9bbcd0/",img:"art/book-art-504e3fafdacd7c9bbcd0.webp",focal:!1,caption:"Shown at its largest print size, 4.7 × 6.8 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/504e3fafdacd7c9bbcd0.webp",w:.24107452234357196,h:.3463714401488104,fw:.27155452234357197,fh:.3768514401488104},{id:"book-art-4c6fb3817fed4e5a6195",kind:"painting",room:"people",wall:"N",x:-25.86348034157596,y:1.6,z:23.465,ix:0,iz:-1,iw:.40891235874509685,ih:.35698048918446956,s:1,smax:1,title:"Painting in Black Rock City",price:null,status:"nfs",url:"https://tjm.art/products/book-art-4c6fb3817fed4e5a6195/",img:"art/book-art-4c6fb3817fed4e5a6195.webp",focal:!1,caption:"Shown at its largest print size, 8.1 × 7 in",hi:"https://img.tjm.art/wall-paintings/book-art-4c6fb3817fed4e5a6195-5a0c40f61a-960.webp",w:.40891235874509685,h:.35698048918446956,fw:.43939235874509686,fh:.3874604891844695},{id:"book-art-44161b6b117af79e3df4",kind:"painting",room:"people",wall:"N",x:-16.817442176096414,y:1.942165101725286,z:23.465,ix:0,iz:-1,iw:.4387527419199345,ih:.48750304657770505,s:1,smax:1,title:"Sergey",price:null,status:"nfs",url:"https://tjm.art/products/book-art-44161b6b117af79e3df4/",img:"art/book-art-44161b6b117af79e3df4.webp",focal:!1,caption:"Shown at its largest print size, 8.6 × 9.6 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/44161b6b117af79e3df4.webp",w:.4387527419199345,h:.48750304657770505,fw:.46923274191993447,fh:.517983046577705},{id:"book-art-466dc684227286c40502",kind:"painting",room:"people",wall:"S",x:-26.881710469718904,y:1.6,z:.035,ix:0,iz:1,iw:.2594978184361248,ih:.38444121249796265,s:1,smax:1,title:"Sister Claire",price:null,status:"nfs",url:"https://tjm.art/products/book-art-466dc684227286c40502/",img:"art/book-art-466dc684227286c40502.webp",focal:!1,caption:"Shown at its largest print size, 5.1 × 7.6 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/466dc684227286c40502.webp",w:.2594978184361248,h:.38444121249796265,fw:.2899778184361248,fh:.41492121249796265},{id:"book-art-db933efcbc4fbe01c841",kind:"painting",room:"people",wall:"E",x:-15.260000000000002,y:1.1419213489999285,z:11.584619598336745,ix:-1,iz:0,iw:.47123371281582166,ih:.7227510932758001,s:1,smax:1,title:"Steve",price:null,status:"nfs",url:"https://tjm.art/products/book-art-db933efcbc4fbe01c841/",img:"art/book-art-db933efcbc4fbe01c841.webp",focal:!1,caption:"Shown at its largest print size, 9.3 × 14.2 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/db933efcbc4fbe01c841.webp",w:.47123371281582166,h:.7227510932758001,fw:.5017137128158217,fh:.7532310932758001},{id:"book-art-ec22daff29e72f16eb76",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.6,z:1.9933905870959991,ix:1,iz:0,iw:.23252937765552117,ih:.2666621303389004,s:1,smax:1,title:"Tomer Strolight @TomerStrolight",price:null,status:"nfs",url:"https://tjm.art/products/book-art-ec22daff29e72f16eb76/",img:"art/book-art-ec22daff29e72f16eb76.webp",focal:!1,caption:"Shown at its largest print size, 4.6 × 5.3 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/ec22daff29e72f16eb76.webp",w:.23252937765552117,h:.2666621303389004,fw:.2630093776555212,fh:.2971421303389004},{id:"book-art-deb92de6e72f7b3ce951",kind:"painting",room:"central",wall:"W",x:-12.59,y:1.3315948671710622,z:-1.5019077191685937,ix:1,iz:0,iw:.30721800040931907,ih:.33760219825199894,s:1,smax:1,title:"Untitled — Bitcoiners, page 64",price:null,status:"nfs",url:"https://tjm.art/products/book-art-deb92de6e72f7b3ce951/",img:"art/book-art-deb92de6e72f7b3ce951.webp",focal:!1,caption:"Shown at its largest print size, 6 × 6.6 in",hi:"https://media.vermillionaurora.com/images/book-galleries/v1/deb92de6e72f7b3ce951.webp",w:.30721800040931907,h:.33760219825199894,fw:.3376980004093191,fh:.36808219825199895},{id:"archived-painting-90",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:1.9009966683904893,ix:-1,iz:0,iw:.7106775114918131,ih:1.2452880746743524,s:1,smax:1,title:"Sienna Dawn at Bass Coast",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-90/",img:"art/archived-painting-90.webp",focal:!1,caption:"14.75 × 23.25 in (W × H)",hi:"https://img.tjm.art/gallery-wall/f974178c8dcf4970e390b3e3de23cf2ab8bbd96ac649906636195c7395c7d162-960.webp",w:.7106775114918131,h:1.2452880746743524,fw:.7411575114918132,fh:1.2757680746743525},{id:"archived-painting-433",kind:"painting",room:"archive",wall:"S",x:29.59451487065267,y:1.6,z:.035,ix:0,iz:1,iw:1.2791907176427673,ih:.6918422857467518,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #1",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-433/",img:"art/archived-painting-433.webp",focal:!1,caption:"23.25 × 14.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/d444d5892a8f556cf83218ca41a096112f34f9fc96a30cf646c7d7e042018a3d-960.webp",w:1.2791907176427673,h:.6918422857467518,fw:1.309670717642767,fh:.7223222857467517},{id:"archived-painting-436",kind:"painting",room:"archive",wall:"S",x:30.86291582752205,y:1.6,z:.035,ix:0,iz:1,iw:.6966511960959892,ih:1.2606366786155525,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #2",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-436/",img:"art/archived-painting-436.webp",focal:!1,caption:"13.75 × 24.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/37fb5f76e383a5973699d952b83ee162c815fb2c144a105a289451e22af48a62-960.webp",w:.6966511960959892,h:1.2606366786155525,fw:.7271311960959892,fh:1.2911166786155526},{id:"archived-painting-437",kind:"painting",room:"archive",wall:"S",x:32.12779446843283,y:1.6,z:.035,ix:0,iz:1,iw:1.2721460857255809,ih:.6956734292785506,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #3",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-437/",img:"art/archived-painting-437.webp",focal:!1,caption:"23.25 × 14.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/062ab28f5f678c9bfb0553c710f42785865ec766620e1e51ed79eed96676e661-960.webp",w:1.2721460857255809,h:.6956734292785506,fw:1.302626085725581,fh:.7261534292785506},{id:"archived-painting-438",kind:"painting",room:"archive",wall:"S",x:33.673631524714395,y:1.6,z:.035,ix:0,iz:1,iw:1.2585680268375454,ih:.7031787008158553,s:1,smax:1,title:"Sunrise at Bass Coast 2023 #4",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-438/",img:"art/archived-painting-438.webp",focal:!1,caption:"23.25 × 14.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/7b31e9134c311dd8c49a16428df99db5934e05e0bc9753c051ac30586898ad47-960.webp",w:1.2585680268375454,h:.7031787008158553,fw:1.2890480268375455,fh:.7336587008158554},{id:"archived-painting-246",kind:"painting",room:"central",wall:"S",x:-10.812770788567589,y:1.6,z:-2.965,ix:0,iz:1,iw:.7124186026441878,ih:1.2592245298906768,s:1,smax:1,title:"Sunset from Atami, El Salvador #1",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-246/",img:"art/archived-painting-246.webp",focal:!1,caption:"13.5 × 25.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/1aa7d0a3b86d956b6fb23786e2288aa0b1f7e46b71e4babeeb461594eab790c4-960.webp",w:.7124186026441878,h:1.2592245298906768,fw:.7428986026441877,fh:1.2897045298906766},{id:"archived-painting-248",kind:"painting",room:"central",wall:"S",x:-9.819453766202484,y:1.6,z:-2.965,ix:0,iz:1,iw:.7132554420860209,ih:1.203023137812266,s:1,smax:1,title:"Sunset from Atami, El Salvador #2",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-248/",img:"art/archived-painting-248.webp",focal:!1,caption:"14 × 23.75 in (W × H)",hi:"https://img.tjm.art/gallery-wall/e8a641e0f5ae6b44f06e638fbea763860320d36f238101d0ccf79ae498af36bd-960.webp",w:.7132554420860209,h:1.203023137812266,fw:.7437354420860208,fh:1.2335031378122658},{id:"archived-painting-247",kind:"painting",room:"central",wall:"S",x:-8.794244491428092,y:1.6,z:-2.965,ix:0,iz:1,iw:.7762031074627627,ih:1.1968908537828409,s:1,smax:1,title:"Sunset from Atami, El Salvador #3",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-247/",img:"art/archived-painting-247.webp",focal:!1,caption:"15 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/9064d4cf43de15de8bb99b0913e242f8473d59e03f39eb6224c0dc7ab1018920-960.webp",w:.7762031074627627,h:1.1968908537828409,fw:.8066831074627626,fh:1.227370853782841},{id:"archived-painting-249",kind:"painting",room:"travels",wall:"W",x:-12.59,y:1.5999999999999999,z:31.129092984721847,ix:1,iz:0,iw:.6565523851012276,ih:1.2263449166754,s:1,smax:1,title:"Lake in North Cascades",price:"$500",status:"available",url:"https://tjm.art/products/archived-painting-249/",img:"art/archived-painting-249.webp",focal:!1,caption:"13 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/0d8b905417ca735c995aee98ca4f07a719dfc8b8f4d89a6babf609ae159efa7d-960.webp",w:.6565523851012276,h:1.2263449166754,fw:.6870323851012275,fh:1.2568249166754},{id:"archived-painting-18",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:7.042490785497735,ix:-1,iz:0,iw:2.3695105505379286,ih:1.163161531133213,s:1,smax:1,title:"Mayan Warrior",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-18/",img:"art/archived-painting-18.webp",focal:!1,caption:"44.5 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/2f86850a9431808e9abbf7882abf72c33f5aa61632855b1088b085b64a0b40da-960.webp",w:2.3695105505379286,h:1.163161531133213,fw:2.399990550537929,fh:1.1936415311332131},{id:"archived-painting-19",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:4.057035467182583,ix:-1,iz:0,iw:2.379604260803209,ih:1.1712414731764047,s:1,smax:1,title:"The Temple, Daytime",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-19/",img:"art/archived-painting-19.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/73ae0f9353d8e6952c0f74268dfd91fe5d3be1e7912e838e621676425f6f65f6-960.webp",w:2.379604260803209,h:1.1712414731764047,fw:2.4100842608032087,fh:1.2017214731764048},{id:"archived-painting-20",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:10.02514447720639,ix:-1,iz:0,iw:2.3740010075902145,ih:1.1740059044158124,s:1,smax:1,title:"The Temple, the Lighting #2",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-20/",img:"art/archived-painting-20.webp",focal:!1,caption:"45 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/05a725ac7c5f8c65d1b11f67ad3533fced0e63f4354f29aba8bd181549c07f98-960.webp",w:2.3740010075902145,h:1.1740059044158124,fw:2.4044810075902143,fh:1.2044859044158125},{id:"archived-painting-307",kind:"painting",room:"travels",wall:"E",x:12.59,y:1.5999999999999999,z:26.837909281379485,ix:-1,iz:0,iw:1.1565764798809823,ih:.865951305586288,s:1,smax:1,title:"Cross on Maui",price:"$250",status:"available",url:"https://tjm.art/products/archived-painting-307/",img:"art/archived-painting-307.webp",focal:!1,caption:"Shown at its largest print size, 22.8 × 17 in",hi:"https://img.tjm.art/gallery-wall/74b889871f4a2aacebfea38f8b5ae1be8ce5f1f03c9c820e0172d25114e138b9-960.webp",w:1.1565764798809823,h:.865951305586288,fw:1.1870564798809822,fh:.8964313055862879},{id:"archived-painting-385",kind:"painting",room:"people",wall:"N",x:-28.485167092061488,y:1.6,z:23.465,ix:0,iz:-1,iw:.5952127819744111,ih:.8124536040480733,s:1,smax:1,title:"Holding the Line",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-385/",img:"art/archived-painting-385.webp",focal:!1,caption:"Shown at its largest print size, 11.7 × 16 in",hi:"https://img.tjm.art/gallery-wall/6e037122c56177197ba12817fa36682ab1a74b1ded40830c99a02432f3b3ea99-960.webp",w:.5952127819744111,h:.8124536040480733,fw:.625692781974411,fh:.8429336040480733},{id:"archived-painting-386",kind:"painting",room:"people",wall:"N",x:-29.367706455538897,y:1.6,z:23.465,ix:0,iz:-1,iw:.6089059449804142,ih:.8302647487698478,s:1,smax:1,title:"Holding the Line #2",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-386/",img:"art/archived-painting-386.webp",focal:!1,caption:"Shown at its largest print size, 12 × 16.3 in",hi:"https://img.tjm.art/gallery-wall/30d546d939ec9a4e26f594f42706d2f067312dc19bc5d93ab512d8d860d9b914-960.webp",w:.6089059449804142,h:.8302647487698478,fw:.6393859449804142,fh:.8607447487698479},{id:"archived-painting-241",kind:"painting",room:"travels",wall:"E",x:12.59,y:1.6,z:28.563531393130503,ix:-1,iz:0,iw:1.3438894346154557,ih:1.0235076521704956,s:1,smax:1,title:"On a Trip with Elsa",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-241/",img:"art/archived-painting-241.webp",focal:!1,caption:"26 × 20.5 in (W × H)",hi:"https://img.tjm.art/gallery-wall/82dce5605cb36a0d8c1fc15de07dfd2d539291a947ee3c425ae29485633359ac-960.webp",w:1.3438894346154557,h:1.0235076521704956,fw:1.3743694346154558,fh:1.0539876521704956},{id:"archived-painting-1",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.4142624472490275,z:2.936154903724636,ix:1,iz:0,iw:.7089029598710107,ih:.17121952157266415,s:1,smax:1,title:"Painting #1",price:"$400",status:"available",url:"https://tjm.art/products/archived-painting-1/",img:"art/archived-painting-1.webp",focal:!1,caption:"Shown at its largest print size, 14 × 3.4 in",hi:"https://img.tjm.art/gallery-wall/e9876274627a9afe2ddb371681be76c5343f6d079f465440a2179049cbfa7669-960.webp",w:.7089029598710107,h:.17121952157266415,fw:.7393829598710107,fh:.2016995215726641},{id:"archived-painting-193",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6000000000000003,z:19.94258078004324,ix:1,iz:0,iw:.9018908890943241,ih:.9858349463265975,s:1,smax:1,title:"Painting #193",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-193/",img:"art/archived-painting-193.webp",focal:!1,caption:"Shown at its largest print size, 17.8 × 19.4 in",hi:"https://img.tjm.art/gallery-wall/b359eb147108c36e50c722a17f3d45a1ebd0f0cbaf58e8dfaaecc5bd1c6bd33d-960.webp",w:.9018908890943241,h:.9858349463265975,fw:.9323708890943241,fh:1.0163149463265975},{id:"archived-painting-2",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.7808497607863323,z:2.936154903724636,ix:1,iz:0,iw:.7095888560885427,ih:.18099510550194517,s:1,smax:1,title:"Painting #2",price:"$400",status:"available",url:"https://tjm.art/products/archived-painting-2/",img:"art/archived-painting-2.webp",focal:!1,caption:"Shown at its largest print size, 14 × 3.6 in",hi:"https://img.tjm.art/gallery-wall/e661e119f7f15ccbe7c71c081b858bca38b1a7a837ff5acf7e60c77f7938ac31-960.webp",w:.7095888560885427,h:.18099510550194517,fw:.7400688560885427,fh:.21147510550194518},{id:"archived-painting-217",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.5999999999999999,z:5.010208439954992,ix:1,iz:0,iw:.38846073804587256,ih:1.2345810128574615,s:1,smax:1,title:"Painting #217",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-217/",img:"art/archived-painting-217.webp",focal:!1,caption:"Shown at its largest print size, 7.6 × 24.3 in",hi:"https://img.tjm.art/gallery-wall/0adb3354b13717fde1f05575dace2085698d3eb35dca17f0fa5a6d2273d7beee-960.webp",w:.38846073804587256,h:1.2345810128574615,fw:.41894073804587256,fh:1.2650610128574615},{id:"archived-painting-226",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.5999999999999999,z:21.479383112295203,ix:1,iz:0,iw:1.224125793493081,ih:.8603749181865777,s:1,smax:1,title:"Painting #226",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-226/",img:"art/archived-painting-226.webp",focal:!1,caption:"Shown at its largest print size, 24.1 × 16.9 in",hi:"https://img.tjm.art/gallery-wall/58877194b4cb1a4caa6f655c50e29aa546c154fb9fb58223b09220a613d1727e-960.webp",w:1.224125793493081,h:.8603749181865777,fw:1.254605793493081,fh:.8908549181865778},{id:"archived-painting-233",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:4.0534637013504815,ix:1,iz:0,iw:.5774407572466296,ih:.8122745606624873,s:1,smax:1,title:"Painting #233",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-233/",img:"art/archived-painting-233.webp",focal:!1,caption:"Shown at its largest print size, 11.4 × 16 in",hi:"https://img.tjm.art/gallery-wall/a5cfc0849615388546a9ec9772b91a5d485057f77ec3de9c2503385fc3893b36-960.webp",w:.5774407572466296,h:.8122745606624873,fw:.6079207572466296,fh:.8427545606624873},{id:"archived-painting-354",kind:"painting",room:"people",wall:"N",x:-32.4797409178211,y:1.6,z:23.465,ix:0,iz:-1,iw:.9040547540398185,ih:1.233956030134858,s:1,smax:1,title:"Painting #354",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-354/",img:"art/archived-painting-354.webp",focal:!1,caption:"Shown at its largest print size, 17.8 × 24.3 in",hi:"https://img.tjm.art/gallery-wall/020829831bba99f303622a9351e674b4bf0a3794f5995ecf744bdae4179eda33-960.webp",w:.9040547540398185,h:1.233956030134858,fw:.9345347540398186,fh:1.264436030134858},{id:"archived-painting-368",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:11.595688389357269,ix:1,iz:0,iw:.621623231283548,ih:.8258418595250402,s:1,smax:1,title:"Painting #368",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-368/",img:"art/archived-painting-368.webp",focal:!1,caption:"Shown at its largest print size, 12.2 × 16.3 in",hi:"https://img.tjm.art/gallery-wall/4bf6fd5e67133125a7715aa9aa4e67dd313fee4888717a8ff7855fdabc219d13-960.webp",w:.621623231283548,h:.8258418595250402,fw:.652103231283548,fh:.8563218595250401},{id:"archived-painting-369",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:12.809480421930832,ix:1,iz:0,iw:.8583728519470607,ih:.6216095199529879,s:1,smax:1,title:"Painting #369",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-369/",img:"art/archived-painting-369.webp",focal:!1,caption:"Shown at its largest print size, 16.9 × 12.2 in",hi:"https://img.tjm.art/gallery-wall/3b82c491eb2e0d50fc70d1fbb0cfe5581ab1971fcbed338850ca6ed6b7700f55-960.webp",w:.8583728519470607,h:.6216095199529879,fw:.8888528519470607,fh:.6520895199529879},{id:"archived-painting-371",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:6.085561383084756,ix:1,iz:0,iw:.8146571662971377,ih:.597753638323528,s:1,smax:1,title:"Painting #371",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-371/",img:"art/archived-painting-371.webp",focal:!1,caption:"Shown at its largest print size, 16 × 11.8 in",hi:"https://img.tjm.art/gallery-wall/c22a2fde103c8c65575e5b871116318b6e87c6d8ac914177b3373cb84a673711-960.webp",w:.8146571662971377,h:.597753638323528,fw:.8451371662971376,fh:.628233638323528},{id:"archived-painting-373",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:9.424400590475175,ix:1,iz:0,iw:.6058834004894579,ih:.8358179275112879,s:1,smax:1,title:"Painting #373",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-373/",img:"art/archived-painting-373.webp",focal:!1,caption:"Shown at its largest print size, 11.9 × 16.5 in",hi:"https://img.tjm.art/gallery-wall/aeb9c6621442e41a7670b8de9d31b17b2bae4cb8f40e8c9e2dd849f2bbeaca0c-960.webp",w:.6058834004894579,h:.8358179275112879,fw:.6363634004894578,fh:.8662979275112879},{id:"archived-painting-375",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:15.127408575080317,ix:1,iz:0,iw:.6475530174364529,ih:.8593409454921399,s:1,smax:1,title:"Painting #375",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-375/",img:"art/archived-painting-375.webp",focal:!1,caption:"Shown at its largest print size, 12.7 × 16.9 in",hi:"https://img.tjm.art/gallery-wall/73624bb4c2211042e2e50e91fbbc6de8795cf5765c54181f41f643ca4cabe292-960.webp",w:.6475530174364529,h:.8593409454921399,fw:.6780330174364528,fh:.88982094549214},{id:"archived-painting-4",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:1.7580602378401833,ix:1,iz:0,iw:.6990124937638453,ih:.1613366206241086,s:1,smax:1,title:"Painting #4",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-4/",img:"art/archived-painting-4.webp",focal:!1,caption:"Shown at its largest print size, 13.8 × 3.2 in",hi:"https://img.tjm.art/gallery-wall/992f895182682e7172da1054d9e7d1172877e138d3f8b537f49c430b4bece967-960.webp",w:.6990124937638453,h:.1613366206241086,fw:.7294924937638453,fh:.19181662062410856},{id:"archived-painting-62",kind:"painting",room:"people",wall:"N",x:-33.861004147420495,y:1.6,z:23.465,ix:0,iz:-1,iw:.9818600948860937,ih:1.0877948758309672,s:1,smax:1,title:"Painting #62",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-62/",img:"art/archived-painting-62.webp",focal:!1,caption:"19.25 × 21.5 in (W × H)",hi:"https://img.tjm.art/gallery-wall/46554d5969de58ccb45aa2f91a55920cbe49d85f342c8cda7fe49ffadc646818-960.webp",w:.9818600948860937,h:1.0877948758309672,fw:1.0123400948860937,fh:1.1182748758309673},{id:"archived-painting-73",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:18.647841898434294,ix:1,iz:0,iw:.7399988922070515,ih:1.1859954798021064,s:1,smax:1,title:"Painting #73",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-73/",img:"art/archived-painting-73.webp",focal:!1,caption:"Shown at its largest print size, 14.6 × 23.3 in",hi:"https://img.tjm.art/gallery-wall/ce548dec7454c6a31c49a759c41152114abd14e1731fc91f48c9c1e206c2d32c-960.webp",w:.7399988922070515,h:1.1859954798021064,fw:.7704788922070516,fh:1.2164754798021065},{id:"archived-painting-75",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6,z:16.269557698820897,ix:1,iz:0,iw:.689157248128191,ih:1.0102899672879007,s:1,smax:1,title:"Painting #75",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-75/",img:"art/archived-painting-75.webp",focal:!1,caption:"Shown at its largest print size, 13.6 × 19.9 in",hi:"https://img.tjm.art/gallery-wall/09b012e1ac23215f0b5d3d63350ef9a0882e5c3d1680802239e0ad603bc2f2af-960.webp",w:.689157248128191,h:1.0102899672879007,fw:.719637248128191,fh:1.0407699672879005},{id:"archived-painting-76",kind:"painting",room:"people",wall:"W",x:-35.690000000000005,y:1.6000000000000003,z:17.44598938760788,ix:1,iz:0,iw:.7161181475292536,ih:.9804320762723286,s:1,smax:1,title:"Painting #76",price:null,status:"nfs",url:"https://tjm.art/products/archived-painting-76/",img:"art/archived-painting-76.webp",focal:!1,caption:"Shown at its largest print size, 14.1 × 19.3 in",hi:"https://img.tjm.art/gallery-wall/64b732c7f9f637d54873d5dc1656279ee18adcf4d17ba5389298e61d6890895e-960.webp",w:.7161181475292536,h:.9804320762723286,fw:.7465981475292536,fh:1.0109120762723287},{id:"archived-painting-15",kind:"painting",room:"central",wall:"N",x:-1.5877659974624514,y:1.6,z:11.965,ix:0,iz:-1,iw:2.407100448054329,ih:1.1449973025545268,s:1,smax:1,title:"Symbiosis #1",price:"$1,000",status:"available",url:"https://tjm.art/products/archived-painting-15/",img:"art/archived-painting-15.webp",focal:!1,caption:"44.5 × 24 in (W × H)",hi:"https://img.tjm.art/gallery-wall/7112103318fcb79bfaae9e8fb67b3a2badc1b9bc3313084870aaa9df993f6c13-960.webp",w:2.407100448054329,h:1.1449973025545268,fw:2.4375804480543293,fh:1.1754773025545269},{id:"older-work-beach-sunsets-original-3",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.824723958465904,z:9.533357915964313,ix:1,iz:0,iw:.35281059278903687,ih:.25600818639254486,s:1,smax:1,title:"TJ Beach Sunset 309",price:"$75",status:"available",url:"https://tjm.art/products/older-work-beach-sunsets-original-3/",img:"art/older-work-beach-sunsets-original-3.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-beach-sunsets-original-3-9148b73270-960.webp",w:.35281059278903687,h:.25600818639254486,fw:.3832905927890369,fh:.28648818639254486},{id:"older-work-beach-sunsets-original-1",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.3766457009346733,z:9.533357915964313,ix:1,iz:0,iw:.3487783393020988,ih:.2589679169318083,s:1,smax:1,title:"TJ Beach Sunset 310",price:"$75",status:"available",url:"https://tjm.art/products/older-work-beach-sunsets-original-1/",img:"art/older-work-beach-sunsets-original-1.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-beach-sunsets-original-1-4fb0883ec1-960.webp",w:.3487783393020988,h:.2589679169318083,fw:.37925833930209873,fh:.28944791693180827},{id:"older-work-beach-sunsets-original-2",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.824723958465904,z:8.90021906969488,ix:1,iz:0,iw:.35250709974982447,ih:.25622859813065363,s:1,smax:1,title:"TJ Beach Sunset 311",price:"$75",status:"available",url:"https://tjm.art/products/older-work-beach-sunsets-original-2/",img:"art/older-work-beach-sunsets-original-2.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-beach-sunsets-original-2-c33a395a68-960.webp",w:.35250709974982447,h:.25622859813065363,fw:.3829870997498245,fh:.28670859813065364},{id:"older-work-shore-figures-original-3",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.7955197500744793,z:16.449910676570905,ix:1,iz:0,iw:.21775707875749511,ih:.2014670671113142,s:1,smax:1,title:"TJ Crab on Beach 180",price:"$75",status:"available",url:"https://tjm.art/products/older-work-shore-figures-original-3/",img:"art/older-work-shore-figures-original-3.webp",focal:!1,caption:"4.25 × 4 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-shore-figures-original-3-dcfe558566-960.webp",w:.21775707875749511,h:.2014670671113142,fw:.24823707875749512,fh:.23194706711131421},{id:"older-work-shore-figures-original-1",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.4040264664443431,z:16.449910676570905,ix:1,iz:0,iw:.21874246778345827,ih:.20055950014895826,s:1,smax:1,title:"TJ Figures on a Shore 179",price:"$75",status:"available",url:"https://tjm.art/products/older-work-shore-figures-original-1/",img:"art/older-work-shore-figures-original-1.webp",focal:!1,caption:"4.25 × 4 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-shore-figures-original-1-ddd0d8fd53-960.webp",w:.21874246778345827,h:.20055950014895826,fw:.24922246778345825,fh:.23103950014895824},{id:"older-work-shore-figures-original-2",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.7955197500744793,z:15.95038876610827,ix:1,iz:0,iw:.21934135314181155,ih:.20001189639618938,s:1,smax:1,title:"TJ Wading Figure 181",price:"$75",status:"available",url:"https://tjm.art/products/older-work-shore-figures-original-2/",img:"art/older-work-shore-figures-original-2.webp",focal:!1,caption:"4.25 × 4 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-shore-figures-original-2-7764c6d6dc-960.webp",w:.21934135314181155,h:.20001189639618938,fw:.24982135314181153,fh:.2304918963961894},{id:"older-work-sunset-ridge-strips-original-6",kind:"painting",room:"archive",wall:"N",x:21.89331189746748,y:1.802564393080045,z:23.465,ix:0,iz:-1,iw:.6752524272379904,ih:.2063740230746108,s:1,smax:1,title:"TJ Sunset Ridge Strip 158",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-6/",img:"art/older-work-sunset-ridge-strips-original-6.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-6-dff8599ae8-960.webp",w:.6752524272379904,h:.2063740230746108,fw:.7057324272379903,fh:.23685402307461076},{id:"older-work-sunset-ridge-strips-original-3",kind:"painting",room:"archive",wall:"N",x:21.89331189746748,y:1.394434346364955,z:23.465,ix:0,iz:-1,iw:.6599113576837423,ih:.21117163445879752,s:1,smax:1,title:"TJ Sunset Ridge Strip 159",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-3/",img:"art/older-work-sunset-ridge-strips-original-3.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-3-21e11dff2c-960.webp",w:.6599113576837423,h:.21117163445879752,fw:.6903913576837424,fh:.24165163445879753},{id:"older-work-sunset-ridge-strips-original-4",kind:"painting",room:"archive",wall:"N",x:20.942641619128832,y:1.802564393080045,z:23.465,ix:0,iz:-1,iw:.6599113576837423,ih:.21117163445879752,s:1,smax:1,title:"TJ Sunset Ridge Strip 164",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-4/",img:"art/older-work-sunset-ridge-strips-original-4.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-4-14a797f9ad-960.webp",w:.6599113576837423,h:.21117163445879752,fw:.6903913576837424,fh:.24165163445879753},{id:"older-work-sunset-ridge-strips-original-2",kind:"painting",room:"archive",wall:"N",x:20.942641619128832,y:1.394434346364955,z:23.465,ix:0,iz:-1,iw:.6651281294393048,ih:.209515360773381,s:1,smax:1,title:"TJ Sunset Ridge Strip 165",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-2/",img:"art/older-work-sunset-ridge-strips-original-2.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-2-0104aa0349-960.webp",w:.6651281294393048,h:.209515360773381,fw:.6956081294393047,fh:.23999536077338096},{id:"older-work-sunset-ridge-strips-original-5",kind:"painting",room:"archive",wall:"N",x:20.00498691371339,y:1.802564393080045,z:23.465,ix:0,iz:-1,iw:.6315600923651972,ih:.22065130727009075,s:1,smax:1,title:"TJ Sunset Ridge Strip 173",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-5/",img:"art/older-work-sunset-ridge-strips-original-5.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-5-e3b3002667-960.webp",w:.6315600923651972,h:.22065130727009075,fw:.6620400923651972,fh:.25113130727009075},{id:"older-work-sunset-ridge-strips-original-1",kind:"painting",room:"archive",wall:"N",x:20.00498691371339,y:1.394434346364955,z:23.465,ix:0,iz:-1,iw:.6492212813915762,ih:.2146487861600899,s:1,smax:1,title:"TJ Sunset Ridge Strip 174",price:"$100",status:"available",url:"https://tjm.art/products/older-work-sunset-ridge-strips-original-1/",img:"art/older-work-sunset-ridge-strips-original-1.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-sunset-ridge-strips-original-1-c76d05d284-960.webp",w:.6492212813915762,h:.2146487861600899,fw:.6797012813915762,fh:.24512878616008985},{id:"older-work-mountain-layers-original-1",kind:"painting",room:"archive",wall:"N",x:17.48098683141539,y:1.8198755954106076,z:23.465,ix:0,iz:-1,iw:.34137610730881285,ih:.2645832501637066,s:1,smax:1,title:"TJ Blue Mountain Layers 185",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-1/",img:"art/older-work-mountain-layers-original-1.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-1-58258ae4c4-960.webp",w:.34137610730881285,h:.2645832501637066,fw:.37185610730881286,fh:.2950632501637066},{id:"older-work-mountain-layers-original-4",kind:"painting",room:"archive",wall:"N",x:17.48098683141539,y:1.372468374918147,z:23.465,ix:0,iz:-1,iw:.3623459241416391,ih:.24927119082121496,s:1,smax:1,title:"TJ Golden Mountain Layers 153",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-4/",img:"art/older-work-mountain-layers-original-4.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-4-ec72f50db4-960.webp",w:.3623459241416391,h:.24927119082121496,fw:.3928259241416391,fh:.2797511908212149},{id:"older-work-mountain-layers-original-2",kind:"painting",room:"archive",wall:"N",x:16.83092818153234,y:1.8198755954106076,z:23.465,ix:0,iz:-1,iw:.36791906876506125,ih:.24549529412316587,s:1,smax:1,title:"TJ Orange Mountain Layers 186",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-2/",img:"art/older-work-mountain-layers-original-2.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-2-b2f21e4a46-960.webp",w:.36791906876506125,h:.24549529412316587,fw:.39839906876506126,fh:.2759752941231659},{id:"older-work-mountain-layers-original-3",kind:"painting",room:"archive",wall:"N",x:16.83092818153234,y:1.372468374918147,z:23.465,ix:0,iz:-1,iw:.3768113756244628,ih:.23970189289087962,s:1,smax:1,title:"TJ Red Mountain Layers 156",price:"$75",status:"available",url:"https://tjm.art/products/older-work-mountain-layers-original-3/",img:"art/older-work-mountain-layers-original-3.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-mountain-layers-original-3-ff36e67e60-960.webp",w:.3768113756244628,h:.23970189289087962,fw:.4072913756244628,fh:.27018189289087957},{id:"older-work-lake-hillside-color-wheel-original-3",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.8211318528936644,z:2.6978031367308004,ix:1,iz:0,iw:.3382642105926288,ih:.26701731123655637,s:1,smax:1,title:"TJ Color Wheel Study 184",price:"$75",status:"available",url:"https://tjm.art/products/older-work-lake-hillside-color-wheel-original-3/",img:"art/older-work-lake-hillside-color-wheel-original-3.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-lake-hillside-color-wheel-original-3-0794df63c5-960.webp",w:.3382642105926288,h:.26701731123655637,fw:.3687442105926288,fh:.29749731123655637},{id:"older-work-lake-hillside-color-wheel-original-2",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.371251344381722,z:2.6978031367308004,ix:1,iz:0,iw:.3587301240068795,ih:.2517837057873285,s:1,smax:1,title:"TJ Golden Hillside 141",price:"$75",status:"available",url:"https://tjm.art/products/older-work-lake-hillside-color-wheel-original-2/",img:"art/older-work-lake-hillside-color-wheel-original-2.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-lake-hillside-color-wheel-original-2-7ae1a5eed1-960.webp",w:.3587301240068795,h:.2517837057873285,fw:.3892101240068795,fh:.2822637057873285},{id:"older-work-lake-hillside-color-wheel-original-1",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.8211318528936644,z:2.05539493799656,ix:1,iz:0,iw:.3651262734616008,ih:.24737305027023457,s:1,smax:1,title:"TJ Mountain Lake 145",price:"$75",status:"available",url:"https://tjm.art/products/older-work-lake-hillside-color-wheel-original-1/",img:"art/older-work-lake-hillside-color-wheel-original-1.webp",focal:!1,caption:"7 × 5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-lake-hillside-color-wheel-original-1-4c3ee3593e-960.webp",w:.3651262734616008,h:.24737305027023457,fw:.3956062734616008,fh:.27785305027023455},{id:"older-work-forest-triptych-original-2",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.6,z:11.06535036224078,ix:1,iz:0,iw:.36728538437358094,ih:1.6334685932972604,s:1,smax:1,title:"TJ Forest 302",price:"$250",status:"available",url:"https://tjm.art/products/older-work-forest-triptych-original-2/",img:"art/older-work-forest-triptych-original-2.webp",focal:!1,caption:"7.75 × 30 in (W × H)",hi:"https://img.tjm.art/play/art-hi/older-work-forest-triptych-original-2.webp",w:.36728538437358094,h:1.6334685932972604,fw:.39776538437358094,fh:1.6639485932972604},{id:"older-work-forest-triptych-original-1",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.6,z:11.713146148085713,ix:1,iz:0,iw:.3672979664245263,ih:1.6334685932972604,s:1,smax:1,title:"TJ Forest 303",price:"$250",status:"available",url:"https://tjm.art/products/older-work-forest-triptych-original-1/",img:"art/older-work-forest-triptych-original-1.webp",focal:!1,caption:"7.75 × 30 in (W × H)",hi:"https://img.tjm.art/play/art-hi/older-work-forest-triptych-original-1.webp",w:.3672979664245263,h:1.6334685932972604,fw:.3977779664245263,fh:1.6639485932972604},{id:"older-work-forest-triptych-original-3",kind:"painting",room:"archive",wall:"W",x:15.26,y:1.6,z:10.417554576395847,ix:1,iz:0,iw:.3673157858449326,ih:1.6334685932972604,s:1,smax:1,title:"TJ Forest 304",price:"$250",status:"available",url:"https://tjm.art/products/older-work-forest-triptych-original-3/",img:"art/older-work-forest-triptych-original-3.webp",focal:!1,caption:"7.75 × 30 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-forest-triptych-original-3-59db81a04b-960.webp",w:.3673157858449326,h:1.6334685932972604,fw:.3977957858449326,fh:1.6639485932972604},{id:"older-work-ridge-strips-unindexed-original-1",kind:"painting",room:"archive",wall:"N",x:26.72080870444839,y:1.8026657860106223,z:23.465,ix:0,iz:-1,iw:.6671165587766594,ih:.20889087246694146,s:1,smax:1,title:"TJ Ridge Strip Study A",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-1/",img:"art/older-work-ridge-strips-unindexed-original-1.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-1-2c69db1f5f-960.webp",w:.6671165587766594,h:.20889087246694146,fw:.6975965587766594,fh:.23937087246694141},{id:"older-work-ridge-strips-unindexed-original-2",kind:"painting",room:"archive",wall:"N",x:26.72080870444839,y:1.3991741827706015,z:23.465,ix:0,iz:-1,iw:.6836934102690203,ih:.20382609793645168,s:1,smax:1,title:"TJ Ridge Strip Study B",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-2/",img:"art/older-work-ridge-strips-unindexed-original-2.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-2-decfb037a2-960.webp",w:.6836934102690203,h:.20382609793645168,fw:.7141734102690203,fh:.23430609793645163},{id:"older-work-ridge-strips-unindexed-original-3",kind:"painting",room:"archive",wall:"N",x:25.75805966164585,y:1.8026657860106223,z:23.465,ix:0,iz:-1,iw:.6684521287998072,ih:.20847350766943987,s:1,smax:1,title:"TJ Ridge Strip Study C",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-3/",img:"art/older-work-ridge-strips-unindexed-original-3.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-3-ff1b439d1f-960.webp",w:.6684521287998072,h:.20847350766943987,fw:.6989321287998072,fh:.23895350766943982},{id:"older-work-ridge-strips-unindexed-original-4",kind:"painting",room:"archive",wall:"N",x:25.75805966164585,y:1.3991741827706015,z:23.465,ix:0,iz:-1,iw:.6808446753360652,ih:.2046789305229046,s:1,smax:1,title:"TJ Ridge Strip Study D",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-4/",img:"art/older-work-ridge-strips-unindexed-original-4.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-4-6893b24edb-960.webp",w:.6808446753360652,h:.2046789305229046,fw:.7113246753360651,fh:.23515893052290454},{id:"older-work-ridge-strips-unindexed-original-5",kind:"painting",room:"archive",wall:"N",x:24.807201645135944,y:1.8026657860106223,z:23.465,ix:0,iz:-1,iw:.6599113576837423,ih:.21117163445879752,s:1,smax:1,title:"TJ Ridge Strip Study E",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-5/",img:"art/older-work-ridge-strips-unindexed-original-5.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-5-e51b25f0ee-960.webp",w:.6599113576837423,h:.21117163445879752,fw:.6903913576837424,fh:.24165163445879753},{id:"older-work-ridge-strips-unindexed-original-6",kind:"painting",room:"archive",wall:"N",x:24.807201645135944,y:1.3991741827706015,z:23.465,ix:0,iz:-1,iw:.6486085193094173,ih:.21485157202124447,s:1,smax:1,title:"TJ Ridge Strip Study F",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-6/",img:"art/older-work-ridge-strips-unindexed-original-6.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-6-bc88075727-960.webp",w:.6486085193094173,h:.21485157202124447,fw:.6790885193094174,fh:.24533157202124448},{id:"older-work-ridge-strips-unindexed-original-7",kind:"painting",room:"archive",wall:"N",x:23.861868090031546,y:1.8026657860106223,z:23.465,ix:0,iz:-1,iw:.6697957525250542,ih:.20805530562809496,s:1,smax:1,title:"TJ Ridge Strip Study G",price:"$100",status:"available",url:"https://tjm.art/products/older-work-ridge-strips-unindexed-original-7/",img:"art/older-work-ridge-strips-unindexed-original-7.webp",focal:!1,caption:"12 × 4.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ridge-strips-unindexed-original-7-84ca4c65a8-960.webp",w:.6697957525250542,h:.20805530562809496,fw:.7002757525250543,fh:.23853530562809497},{id:"older-work-portraits-319-329-original-3",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.9762388006202163,z:12.05457582345206,ix:-1,iz:0,iw:.4630658596119608,ih:.5391823102856769,s:1,smax:1,title:"TJ Andreas Antonopoulos 327",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-3/",img:"art/older-work-portraits-319-329-original-3.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-3-00609e5994-960.webp",w:.4630658596119608,h:.5391823102856769,fw:.49354585961196074,fh:.5696623102856768},{id:"older-work-portraits-319-329-original-1",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.2200263476885451,z:12.05457582345206,ix:-1,iz:0,iw:.45625927189391013,ih:.5472259642277585,s:1,smax:1,title:"TJ Bernard Parah 329",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-1/",img:"art/older-work-portraits-319-329-original-1.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-1-b878be8767-960.webp",w:.45625927189391013,h:.5472259642277585,fw:.48673927189391014,fh:.5777059642277584},{id:"older-work-portraits-319-329-original-2",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.9762388006202163,z:12.788722192483506,ix:-1,iz:0,iw:.4384394292229488,ih:.5694673046229105,s:1,smax:1,title:"TJ José 328",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-2/",img:"art/older-work-portraits-319-329-original-2.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-2-b95ff95919-960.webp",w:.4384394292229488,h:.5694673046229105,fw:.4689194292229488,fh:.5999473046229105},{id:"older-work-portraits-319-329-original-4",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.2200263476885451,z:12.788722192483506,ix:-1,iz:0,iw:.44426687845093465,ih:.5619976012404323,s:1,smax:1,title:"TJ Portrait with Glasses 319",price:"$200",status:"available",url:"https://tjm.art/products/older-work-portraits-319-329-original-4/",img:"art/older-work-portraits-319-329-original-4.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-portraits-319-329-original-4-54ae5f717f-960.webp",w:.44426687845093465,h:.5619976012404323,fw:.47474687845093466,fh:.5924776012404323},{id:"older-work-provibes-sandwiches-original-1",kind:"painting",room:"archive",wall:"N",x:31.0435814413884,y:1.6,z:23.465,ix:0,iz:-1,iw:.8862348300044653,ih:.6242416583843953,s:1,smax:1,title:"TJ Devo and Sarah Sandwich (L)",price:"$250",status:"available",url:"https://tjm.art/products/older-work-provibes-sandwiches-original-1/",img:"art/older-work-provibes-sandwiches-original-1.webp",focal:!1,caption:"17.5 × 12.25 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-provibes-sandwiches-original-1-d6ae18ddad-960.webp",w:.8862348300044653,h:.6242416583843953,fw:.9167148300044653,fh:.6547216583843952},{id:"older-work-provibes-sandwiches-original-2",kind:"painting",room:"archive",wall:"N",x:29.878625408505577,y:1.6,z:23.465,ix:0,iz:-1,iw:.8827172357611801,ih:.626729237390438,s:1,smax:1,title:"TJ Devo and Sarah Sandwich (R)",price:"$250",status:"available",url:"https://tjm.art/products/older-work-provibes-sandwiches-original-2/",img:"art/older-work-provibes-sandwiches-original-2.webp",focal:!1,caption:"17.5 × 12.25 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-provibes-sandwiches-original-2-7ff72bcea8-960.webp",w:.8827172357611801,h:.626729237390438,fw:.9131972357611802,fh:.6572092373904379},{id:"older-work-bitcoin-voices-original-1",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:19.49529741538233,ix:-1,iz:0,iw:.33161746268730286,ih:.6629273024964172,s:1,smax:1,title:"TJ Jack Mallers",price:"$200",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-1/",img:"art/older-work-bitcoin-voices-original-1.webp",focal:!1,caption:"7.25 × 11.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-1-b220032d08-960.webp",w:.33161746268730286,h:.6629273024964172,fw:.36209746268730286,fh:.6934073024964171},{id:"older-work-bitcoin-voices-original-4",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:20.214357779878753,ix:-1,iz:0,iw:.5455432663055488,ih:.9082375507179096,s:1,smax:1,title:"TJ Michael Saylor",price:"$250",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-4/",img:"art/older-work-bitcoin-voices-original-4.webp",focal:!1,caption:"12 × 16 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-4-ee3c8b5799-960.webp",w:.5455432663055488,h:.9082375507179096,fw:.5760232663055489,fh:.9387175507179095},{id:"older-work-bitcoin-voices-original-2",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:20.941162895905805,ix:-1,iz:0,iw:.34710696574855365,ih:.6333444490977232,s:1,smax:1,title:"TJ Natalie Brunell",price:"$200",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-2/",img:"art/older-work-bitcoin-voices-original-2.webp",focal:!1,caption:"7.25 × 11.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-2-4ed30b3321-960.webp",w:.34710696574855365,h:.6333444490977232,fw:.37758696574855366,fh:.6638244490977232},{id:"older-work-bitcoin-voices-original-3",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:21.67476923306775,ix:-1,iz:0,iw:.5591457085753347,ih:.8861426858885435,s:1,smax:1,title:"TJ Peter McCormack",price:"$250",status:"available",url:"https://tjm.art/products/older-work-bitcoin-voices-original-3/",img:"art/older-work-bitcoin-voices-original-3.webp",focal:!1,caption:"12 × 16 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-bitcoin-voices-original-3-744a8ac405-960.webp",w:.5591457085753347,h:.8861426858885435,fw:.5896257085753347,fh:.9166226858885436},{id:"older-work-rochard-martinez-original-3",kind:"painting",room:"archive",wall:"N",x:28.676596811984872,y:2.0016769425836554,z:23.465,ix:0,iz:-1,iw:.553471753950277,ih:.6154685899844545,s:1,smax:1,title:"TJ Aixa Martinez 347",price:"$200",status:"available",url:"https://tjm.art/products/older-work-rochard-martinez-original-3/",img:"art/older-work-rochard-martinez-original-3.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-rochard-martinez-original-3-75ddb98c20-960.webp",w:.553471753950277,h:.6154685899844545,fw:.583951753950277,fh:.6459485899844546},{id:"older-work-rochard-martinez-original-2",kind:"painting",room:"archive",wall:"N",x:28.676596811984872,y:1.197025705007773,z:23.465,ix:0,iz:-1,iw:.5558149698400129,ih:.6128738851673102,s:1,smax:1,title:"TJ Morgen Rochard 358",price:"$200",status:"available",url:"https://tjm.art/products/older-work-rochard-martinez-original-2/",img:"art/older-work-rochard-martinez-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-rochard-martinez-original-2-716858e3dc-960.webp",w:.5558149698400129,h:.6128738851673102,fw:.5862949698400128,fh:.6433538851673102},{id:"older-work-rochard-martinez-original-1",kind:"painting",room:"archive",wall:"N",x:27.83181361518394,y:2.0016769425836554,z:23.465,ix:0,iz:-1,iw:.5727914237618569,ih:.5947094629364178,s:1,smax:1,title:"TJ Pierre Rochard 359",price:"$200",status:"available",url:"https://tjm.art/products/older-work-rochard-martinez-original-1/",img:"art/older-work-rochard-martinez-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-rochard-martinez-original-1-65e7fed054-960.webp",w:.5727914237618569,h:.5947094629364178,fw:.6032714237618568,fh:.6251894629364179},{id:"older-work-fernandez-moran-pysh-original-1",kind:"painting",room:"archive",wall:"N",x:36.62812548306799,y:1.9939141923903034,z:23.465,ix:0,iz:-1,iw:.5733481375670705,ih:.5941320075538769,s:1,smax:1,title:"TJ Akin Fernandez 351",price:"$200",status:"available",url:"https://tjm.art/products/older-work-fernandez-moran-pysh-original-1/",img:"art/older-work-fernandez-moran-pysh-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-fernandez-moran-pysh-original-1-ec17e71718-960.webp",w:.5733481375670705,h:.5941320075538769,fw:.6038281375670704,fh:.6246120075538768},{id:"older-work-fernandez-moran-pysh-original-2",kind:"painting",room:"archive",wall:"N",x:36.62812548306799,y:1.2044862319149408,z:23.465,ix:0,iz:-1,iw:.5702609878573812,ih:.5973483847806069,s:1,smax:1,title:"TJ Nico Moran 345",price:"$200",status:"available",url:"https://tjm.art/products/older-work-fernandez-moran-pysh-original-2/",img:"art/older-work-fernandez-moran-pysh-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-fernandez-moran-pysh-original-2-8619d6a9ca-960.webp",w:.5702609878573812,h:.5973483847806069,fw:.6007409878573812,fh:.6278283847806069},{id:"older-work-fernandez-moran-pysh-original-3",kind:"painting",room:"archive",wall:"N",x:35.777359826955006,y:1.9939141923903034,z:23.465,ix:0,iz:-1,iw:.5672231746589079,ih:.6005475361701187,s:1,smax:1,title:"TJ Preston Pysh 344",price:"$200",status:"available",url:"https://tjm.art/products/older-work-fernandez-moran-pysh-original-3/",img:"art/older-work-fernandez-moran-pysh-original-3.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-fernandez-moran-pysh-original-3-7a6e7f5f45-960.webp",w:.5672231746589079,h:.6005475361701187,fw:.5977031746589079,fh:.6310275361701186},{id:"older-work-pitchers-original-2",kind:"painting",room:"archive",wall:"N",x:19.04193598495234,y:1.6,z:23.465,ix:0,iz:-1,iw:.3113555886903199,ih:.4475736587423348,s:1,smax:1,title:"TJ Blue Pitcher 187",price:"$75",status:"available",url:"https://tjm.art/products/older-work-pitchers-original-2/",img:"art/older-work-pitchers-original-2.webp",focal:!1,caption:"6 × 9 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-pitchers-original-2-98f7bac8f4-960.webp",w:.3113555886903199,h:.4475736587423348,fw:.3418355886903199,fh:.4780536587423348},{id:"older-work-pitchers-original-1",kind:"painting",room:"archive",wall:"N",x:18.375350238906748,y:1.6,z:23.465,ix:0,iz:-1,iw:.46085590340085913,ih:.3023820655689581,s:1,smax:1,title:"TJ Two Pitchers 188",price:"$75",status:"available",url:"https://tjm.art/products/older-work-pitchers-original-1/",img:"art/older-work-pitchers-original-1.webp",focal:!1,caption:"9 × 6 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-pitchers-original-1-7d2d7e4632-960.webp",w:.46085590340085913,h:.3023820655689581,fw:.4913359034008591,fh:.33286206556895803},{id:"older-work-yakes-todd-dickerson-original-3",kind:"painting",room:"archive",wall:"N",x:34.78099084913081,y:1.9694227130423254,z:23.465,ix:0,iz:-1,iw:.4599897935492608,ih:.5427879563881277,s:1,smax:1,title:"TJ Desiree Dickerson 332",price:"$200",status:"available",url:"https://tjm.art/products/older-work-yakes-todd-dickerson-original-3/",img:"art/older-work-yakes-todd-dickerson-original-3.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-yakes-todd-dickerson-original-3-ec786ce1dc-960.webp",w:.4599897935492608,h:.5427879563881277,fw:.4904697935492608,fh:.5732679563881277},{id:"older-work-yakes-todd-dickerson-original-1",kind:"painting",room:"archive",wall:"N",x:34.78099084913081,y:1.2056052390275234,z:23.465,ix:0,iz:-1,iw:.45531119965513245,ih:.5483654260846502,s:1,smax:1,title:"TJ Eric Yakes 330",price:"$200",status:"available",url:"https://tjm.art/products/older-work-yakes-todd-dickerson-original-1/",img:"art/older-work-yakes-todd-dickerson-original-1.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-yakes-todd-dickerson-original-1-16c80bb5c4-960.webp",w:.45531119965513245,h:.5483654260846502,fw:.4857911996551324,fh:.5788454260846502},{id:"older-work-yakes-todd-dickerson-original-2",kind:"painting",room:"archive",wall:"N",x:34.06186398306413,y:1.9694227130423254,z:23.465,ix:0,iz:-1,iw:.4173039385841008,ih:.5983095219449545,s:1,smax:1,title:"TJ Peter Todd 331",price:"$200",status:"available",url:"https://tjm.art/products/older-work-yakes-todd-dickerson-original-2/",img:"art/older-work-yakes-todd-dickerson-original-2.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-yakes-todd-dickerson-original-2-39a72edaa0-960.webp",w:.4173039385841008,h:.5983095219449545,fw:.4477839385841008,fh:.6287895219449544},{id:"older-work-nakamoto-hayek-original-1",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:17.609154810101966,ix:-1,iz:0,iw:.5637396831168617,ih:.6042584728408862,s:1,smax:1,title:"TJ Dorian Nakamoto",price:"$200",status:"available",url:"https://tjm.art/products/older-work-nakamoto-hayek-original-1/",img:"art/older-work-nakamoto-hayek-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-nakamoto-hayek-original-1-27b0ab6335-960.webp",w:.5637396831168617,h:.6042584728408862,fw:.5942196831168618,fh:.6347384728408862},{id:"older-work-nakamoto-hayek-original-2",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:18.445047711527245,ix:-1,iz:0,iw:.5470861197336958,ih:.6226523900219125,s:1,smax:1,title:"TJ Hayek 339",price:"$200",status:"available",url:"https://tjm.art/products/older-work-nakamoto-hayek-original-2/",img:"art/older-work-nakamoto-hayek-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-nakamoto-hayek-original-2-ac8ceaa163-960.webp",w:.5470861197336958,h:.6226523900219125,fw:.5775661197336959,fh:.6531323900219126},{id:"older-work-hayek-stark-gomez-el-bawab-original-2",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.981513627945994,z:15.758798752565891,ix:-1,iz:0,iw:.45697422548767747,ih:.5463698083487044,s:1,smax:1,title:"TJ Elizabeth Stark 335",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-2/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-2.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-2-3d6bba0f8e-960.webp",w:.45697422548767747,h:.5463698083487044,fw:.4874542254876775,fh:.5768498083487044},{id:"older-work-hayek-stark-gomez-el-bawab-original-1",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.224207040464023,z:15.758798752565891,ix:-1,iz:0,iw:.4360808953856937,ih:.572547255891988,s:1,smax:1,title:"TJ F.A. Hayek 336",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-1/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-1.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-1-775ae9c6ec-960.webp",w:.4360808953856937,h:.572547255891988,fw:.4665608953856937,fh:.6030272558919879},{id:"older-work-hayek-stark-gomez-el-bawab-original-4",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.981513627945994,z:16.49207646060434,ix:-1,iz:0,iw:.4449728857128351,ih:.5611059190719542,s:1,smax:1,title:"TJ Noor El Bawab 333",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-4/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-4.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-4-b154114211-960.webp",w:.4449728857128351,h:.5611059190719542,fw:.4754528857128351,fh:.5915859190719541},{id:"older-work-hayek-stark-gomez-el-bawab-original-3",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.224207040464023,z:16.49207646060434,ix:-1,iz:0,iw:.4486211905892249,ih:.5565428589587378,s:1,smax:1,title:"TJ Rodrigo Gomez 334",price:"$200",status:"available",url:"https://tjm.art/products/older-work-hayek-stark-gomez-el-bawab-original-3/",img:"art/older-work-hayek-stark-gomez-el-bawab-original-3.webp",focal:!1,caption:"9 × 10.75 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hayek-stark-gomez-el-bawab-original-3-1aeaa02b7d-960.webp",w:.4486211905892249,h:.5565428589587378,fw:.4791011905892249,fh:.5870228589587378},{id:"older-work-figen-pnut-swoll-original-1",kind:"painting",room:"archive",wall:"N",x:33.08394525826918,y:1.9984732348727121,z:23.465,ix:0,iz:-1,iw:.5730085235655904,ih:.5944841411438578,s:1,smax:1,title:"TJ Figen 341",price:"$200",status:"available",url:"https://tjm.art/products/older-work-figen-pnut-swoll-original-1/",img:"art/older-work-figen-pnut-swoll-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-figen-pnut-swoll-original-1-9280268eaa-960.webp",w:.5730085235655904,h:.5944841411438578,fw:.6034885235655905,fh:.6249641411438578},{id:"older-work-figen-pnut-swoll-original-3",kind:"painting",room:"archive",wall:"N",x:33.08394525826918,y:1.1936689497545725,z:23.465,ix:0,iz:-1,iw:.5616872440499346,ih:.6064664697454234,s:1,smax:1,title:"TJ Joey Swoll 340",price:"$200",status:"available",url:"https://tjm.art/products/older-work-figen-pnut-swoll-original-3/",img:"art/older-work-figen-pnut-swoll-original-3.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-figen-pnut-swoll-original-3-ff335b6a18-960.webp",w:.5616872440499346,h:.6064664697454234,fw:.5921672440499346,fh:.6369464697454235},{id:"older-work-figen-pnut-swoll-original-2",kind:"painting",room:"archive",wall:"N",x:32.24321117329856,y:1.9984732348727121,z:23.465,ix:0,iz:-1,iw:.5474996463756455,ih:.6221821004908559,s:1,smax:1,title:"TJ PNut Window 338",price:"$200",status:"available",url:"https://tjm.art/products/older-work-figen-pnut-swoll-original-2/",img:"art/older-work-figen-pnut-swoll-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-figen-pnut-swoll-original-2-50020e7d03-960.webp",w:.5474996463756455,h:.6221821004908559,fw:.5779796463756455,fh:.6526621004908559},{id:"older-work-hummingbird-feeder-190",kind:"painting",room:"archive",wall:"N",x:22.87895416242775,y:1.6,z:23.465,ix:0,iz:-1,iw:.33050711524232945,ih:.46458328102079677,s:1,smax:1,title:"TJ Hummingbird Feeder 190",price:"$75",status:"available",url:"https://tjm.art/products/older-work-hummingbird-feeder-190/",img:"art/older-work-hummingbird-feeder-190.webp",focal:!1,caption:"7 × 8.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-hummingbird-feeder-190-cef1c7ac71-960.webp",w:.33050711524232945,h:.46458328102079677,fw:.36098711524232946,fh:.4950632810207968},{id:"older-work-ammous-livera-original-1",kind:"painting",room:"archive",wall:"N",x:38.52251698583512,y:1.6,z:23.465,ix:0,iz:-1,iw:.5699210408895511,ih:.5977046916329166,s:1,smax:1,title:"TJ Saifedean Ammous 355",price:"$200",status:"available",url:"https://tjm.art/products/older-work-ammous-livera-original-1/",img:"art/older-work-ammous-livera-original-1.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ammous-livera-original-1-03bc0c54d8-960.webp",w:.5699210408895511,h:.5977046916329166,fw:.600401040889551,fh:.6281846916329166},{id:"older-work-ammous-livera-original-2",kind:"painting",room:"archive",wall:"N",x:37.67731925548099,y:1.6,z:23.465,ix:0,iz:-1,iw:.5595144198187086,ih:.6088216280652322,s:1,smax:1,title:"TJ Stephan Livera 356",price:"$200",status:"available",url:"https://tjm.art/products/older-work-ammous-livera-original-2/",img:"art/older-work-ammous-livera-original-2.webp",focal:!1,caption:"11 × 12 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-ammous-livera-original-2-13fb12c87c-960.webp",w:.5595144198187086,h:.6088216280652322,fw:.5899944198187086,fh:.6393016280652322},{id:"older-work-legend-of-billy-buff-original-2",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:13.874475339107057,ix:-1,iz:0,iw:.5054435895070025,ih:.7237320397253392,s:1,smax:1,title:"TJ The Legend of Billy Buff 1",price:"$200",status:"available",url:"https://tjm.art/products/older-work-legend-of-billy-buff-original-2/",img:"art/older-work-legend-of-billy-buff-original-2.webp",focal:!1,caption:"10.5 × 13.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-legend-of-billy-buff-original-2-2375e533a9-960.webp",w:.5054435895070025,h:.7237320397253392,fw:.5359235895070025,fh:.7542120397253391},{id:"older-work-legend-of-billy-buff-original-1",kind:"painting",room:"archive",wall:"E",x:40.190000000000005,y:1.6,z:14.663545430519015,ix:-1,iz:0,iw:.5117365933169107,ih:.7148320537895597,s:1,smax:1,title:"TJ The Legend of Billy Buff 2",price:"$200",status:"available",url:"https://tjm.art/products/older-work-legend-of-billy-buff-original-1/",img:"art/older-work-legend-of-billy-buff-original-1.webp",focal:!1,caption:"10.5 × 13.5 in (W × H)",hi:"https://img.tjm.art/wall-paintings/older-work-legend-of-billy-buff-original-1-133621edc7-960.webp",w:.5117365933169107,h:.7148320537895597,fw:.5422165933169107,fh:.7453120537895597}],x2=[{id:"cormorant-presiding-over-sunset-on-puget-sound-plaque",kind:"plaque",room:"travels",wall:"S",x:-3.9031400926757893,y:1.6000000000000003,z:15.535,ix:0,iz:1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Cormorant Presiding over Sunset on Puget Sound",lines:["Garden mural, Seattle · 60 × 40 in (W × H)","A favorite view. Brian and Marcos sent me reference photographs of sunset over Puget Sound, with the Olympic Mountains behind it. This is one of their favorite views—a scene that captures the essence of Seattle for them. They wanted to bring it into their garden as a mural painted on a board and hung from their fence.","The watercolor prototype. Before starting the acrylic mural, I painted a watercolor prototype to explore the composition. A cormorant spreads its wings on a pier pile in the foreground, as if presiding over the sunset. Two distant sailboats meet the waterline, beneath the layered mountains of the Olympics.","The garden becomes part of the painting. The plants in the garden are part of the composition. As the grasses beneath the board fill in, they will suggest dunes leading into the painted shore."],url:"https://tjm.art/products/cormorant-presiding-over-sunset-on-puget-sound/"},{id:"friends-club-mural-plaque",kind:"plaque",room:"travels",wall:"S",x:-2.5337801853515782,y:1.6000000000000003,z:15.535,ix:0,iz:1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Friends Club",lines:["Lillooet, British Columbia · 2026","40 × 9 ft shipping-container mural","An invitation, and a little trust. An exercise in trusting in the process and serendipity.","The design concept. I set up an ideation board, and Kara, Paul, and I brainstormed. I took their Higher Education branding kit and extracted a color palette and a set of themes. We discussed the principles of their organization, seeking to incorporate some of the messaging symbolically into the design, and we iterated.","Day one · Preparing the sea-can. On the May long weekend, I ventured to Lillooet with an intrepid crew of builders: stopping at the Ark in Vancouver to load cylinders and triangles, stopping in Whistler to jam and sleep, and wending over the passes and between charging stations toward the remote mountain valley."],url:"https://tjm.art/murals/#friends-story"},{id:"cape-town-plaque",kind:"plaque",room:"central",wall:"N",x:-10.020568440716978,y:1.6000000000000003,z:11.965,ix:0,iz:-1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Adopting Bitcoin Cape Town, South Africa",lines:["Exhibition · 2025","Adopting Bitcoin 2025 · V&A Waterfront"],url:"https://tjm.art/exhibitions/cape-town/"},{id:"el-salvador-plaque",kind:"plaque",room:"central",wall:"S",x:3.0962640826906496,y:1.6000000000000003,z:-2.965,ix:0,iz:1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Adopting Bitcoin El Salvador",lines:["Exhibition · 2024","Adopting Bitcoin conference venue · Near San Salvador"],url:"https://tjm.art/exhibitions/el-salvador/"},{id:"bitcoin-film-festival-warsaw-plaque",kind:"plaque",room:"central",wall:"N",x:-11.002784220358489,y:1.6000000000000003,z:11.965,ix:0,iz:-1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Bitcoin Film Festival Warsaw, Poland",lines:["Exhibition · 2026","Art & cinema · Warsaw, Poland","2026 · Kinoteka · Palace of Culture and Science","I made these paintings specifically for the Bitcoin Film Festival: the Warsaw Syrenka and the Bitcoin honey badger with cub, along with the movie poster for Coined in Watercolor, Gavin Robertson’s documentary."],url:"https://tjm.art/exhibitions/bitcoin-film-festival-warsaw/"},{id:"paul-murphy-plaque",kind:"plaque",room:"people",wall:"S",x:-25.972054080635157,y:1.6000000000000003,z:.035,ix:0,iz:1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Paul Murphy",lines:["Exhibition","Paul Murphy is my dad. We’ve been painting together since COVID, when he picked up a brush shortly after I did and began painting for the first time in his life. As he leaves the corporate world, he’s discovered a new passion for artistic expression.","At least once a week, we talk about painting techniques and share images to paint. During COVID, he painted every day for a long stretch, sending me each painting with a poem he had written to accompany it. Those paintings and poems became his book COVID 2020.","He has published several books of poetry and found readers for his work. COVID 2020 and Reflections on Time are available on Amazon. You can also explore Reflections on Time here."],url:"https://tjm.art/exhibitions/paul-murphy/"},{id:"living-room-plaque",kind:"plaque",room:"people",wall:"N",x:-27.454494895937838,y:1.6000000000000003,z:23.465,ix:0,iz:-1,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"My Living Room, Seattle, Washington",lines:["Exhibition · Current"],url:"https://tjm.art/exhibitions/living-room/"},{id:"studio-601-plaque",kind:"plaque",room:"travels",wall:"W",x:-12.59,y:1.6000000000000003,z:23.386590270957274,ix:1,iz:0,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Studio 601, Seattle, Washington",lines:["Exhibition · 2023","Pioneer Square · Seattle waterfront"],url:"https://tjm.art/exhibitions/studio-601/"},{id:"victrola-plaque",kind:"plaque",room:"travels",wall:"W",x:-12.59,y:1.6000000000000003,z:22.38829513547864,ix:1,iz:0,w:.62,h:.82,fw:.62,fh:.82,s:1,title:"Victrola Coffee Shop, Seattle, Washington",lines:["Exhibition · 2026","15th Avenue East · Capitol Hill"],url:"https://tjm.art/exhibitions/victrola/"}],Ti={layout:g2,paintings:v2,plaques:x2},Ja=(i,t,e)=>new R(i,t,e),Bd=i=>Math.min(1,Math.max(0,i)),un=i=>(i=Bd(i),i*i*(3-2*i)),li={erupt:3.5,engulf:5.2},Fh=["THEY ARE SO HAPPY TO SEE YOU","YOU HAVE BEEN HERE BEFORE","LOOK AT WHAT THEY ARE SHOWING YOU","IT IS ALL LANGUAGE","THE PAINTINGS ARE WINDOWS","DO NOT TRY TO REMEMBER THIS"],w2=(i="")=>new ue({uniforms:{uTime:{value:0}},side:Ve,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform float uTime; varying vec2 vUv;
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
      gl_FragColor = vec4(floor(c*8.)/8., 1.); }`});function _2({scene:i,camera:t,renderer:e,makeElf:n,animateElf:a,elfUniforms:r,say:s,canvas:o,floorY:l}){const c=document.createElement("div");Object.assign(c.style,{position:"fixed",inset:"0",pointerEvents:"none",opacity:"0",background:"#fff",zIndex:5}),document.body.appendChild(c);let h=null;const d=(()=>{const N=document.createElement("canvas");N.width=N.height=128;const j=N.getContext("2d");j.strokeStyle="#ffb030",j.lineCap="round";for(let V=0;V<14;V++){let Y=64,at=64,st=V/14*6.283;j.lineWidth=5,j.beginPath(),j.moveTo(Y,at);for(let ut=0;ut<6;ut++)st+=(Math.random()-.5)*.9,Y+=Math.cos(st)*11,at+=Math.sin(st)*11,j.lineTo(Y,at),j.lineWidth=Math.max(1,5-ut);j.stroke()}const z=j.createRadialGradient(64,64,2,64,64,30);z.addColorStop(0,"rgba(255,240,160,1)"),z.addColorStop(1,"rgba(255,90,0,0)"),j.fillStyle=z,j.fillRect(0,0,128,128);const Z=new ti(N);return Z.magFilter=Ue,Z})(),u=new Ze(.25,.18,.22),p=new ec({color:7034424}),g=new pr;g.fog=new As(0,.02);const x=new Oe(85,t.aspect,.05,400),m=w2(),f=new Tt(new yn(9,9,300,24,1,!0).rotateX(Math.PI/2),m);g.add(f);const S=new ue({uniforms:{uTime:{value:0}},vertexShader:"uniform float uTime; varying vec2 vP; void main(){ vec3 p = position; vP = p.xy; p.z += sin(length(p.xy)*0.6 - uTime*2.)*0.5; gl_Position = projectionMatrix*modelViewMatrix*vec4(p,1.); }",fragmentShader:`uniform float uTime; varying vec2 vP;
      vec3 hsv(float h,float s,float v){ vec3 k=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.); return v*mix(vec3(1.),k,s); }
      void main(){ vec2 g = vP*0.6; vec2 r = vec2(g.x + g.y*0.577, g.y*1.155); vec2 f = fract(r); float tri = step(f.x, f.y);
        float b = 1. - smoothstep(0.0, 0.08, min(min(f.x, f.y), abs(f.x - f.y)));
        float br = 0.5 + 0.5*sin(length(vP)*0.6 - uTime*2.);
        vec3 c = hsv(fract(tri*0.5 + length(floor(r))*0.05 + uTime*0.15), .8, 0.25 + 0.5*br) + b*vec3(1.,.8,.4);
        gl_FragColor = vec4(c, 1.); }`}),y=new Tt(new he(60,300,60,150).rotateX(-Math.PI/2),S);y.position.y=-6,g.add(y);const v=new Se;g.add(v);const P=[new Xi(6,0),new Jl(4.2,0),new Rs(2.8,0),new Ql(1.6,0)].map((N,j)=>{const z=new Tt(N,new Yt({color:16777215,wireframe:j%2===0,transparent:!0,opacity:j%2?.55:1}));return v.add(z),z}),E=[];for(let N=0;N<16;N++){const j=n(N/16);j.scale.setScalar(3+N%3),g.add(j),E.push({e:j,a:N/16*6.283,r:4+N%4*1.4,y:N%5-2,sp:.4+N%3*.25})}const A=new pr,D=new Es(-1,1,1,-1,0,1);A.add(new Tt(new he(2,2),new Yt({color:0,transparent:!0,opacity:.18,depthTest:!1,depthWrite:!1})));let _={x:0,y:0};addEventListener("mousemove",N=>{!h||h.t<li.engulf||(_.x=Math.max(-.6,Math.min(.6,_.x-N.movementX*.002)),_.y=Math.max(-.4,Math.min(.4,_.y-N.movementY*.002)))});function w(N={}){const j=n(.77);j.scale.setScalar(11);const z=Ja(0,0,-1).applyQuaternion(t.quaternion).setY(0).normalize(),Z=t.position.clone().addScaledVector(z,3.2);j.position.set(Z.x,-5,Z.z),i.add(j);const V=new Tt(new he(1,1).rotateX(-Math.PI/2),new Yt({map:d,transparent:!0,blending:yi,depthWrite:!1}));V.position.set(t.position.x,l(t.position.x,t.position.z)+.02,t.position.z);const Y=new Xn(16740384,0,12);Y.position.copy(V.position).y+=.5,i.add(Y);const at=[];for(let st=0;st<26;st++){const ut=new Tt(u,p);ut.position.copy(V.position),i.add(ut),at.push({m:ut,v:Ja((Math.random()-.5)*6,4+Math.random()*6,(Math.random()-.5)*6),w:Ja(Math.random()*9,Math.random()*9,0),t0:Math.random()*1.5})}h={t:N.direct?li.engulf-.6:0,direct:!!N.direct,wl:N.worldLen||18,savedPos:(N.savedPos||t.position).clone(),savedQuat:(N.savedQuat||t.quaternion).clone(),giant:j,crack:V,fissureLight:Y,chunks:at,base:Z,frag:-1,done:!1},N.direct?(j.visible=!1,V.visible=!1,at.forEach(st=>st.m.visible=!1)):s("THE FLOOR IS... OPENING",3)}function T(){i.remove(h.giant,h.crack,h.fissureLight,...h.chunks.map(N=>N.m))}function U(N,j){if(!h)return!1;h.t+=N;const z=h.t;m.uniforms.uTime.value=S.uniforms.uTime.value=j/1e3;const Z=li.engulf+h.wl,V=Z+1.6;if(z<li.engulf&&h.direct)c.style.background="#000",c.style.opacity=String(un((z-li.engulf+.6)/.6));else if(z<li.engulf){const Y=un(z/2.2),at=(z<li.erupt?.12:.05)*(1-Bd((z-3)/2));h.crack.scale.setScalar(.5+Y*5),h.fissureLight.intensity=30*Y,h.chunks.forEach(it=>{const mt=z-it.t0;mt<0||(it.m.position.set(h.crack.position.x+it.v.x*mt*.4,h.crack.position.y+it.v.y*mt-4.9*mt*mt,h.crack.position.z+it.v.z*mt*.4),it.m.rotation.set(it.w.x*mt,it.w.y*mt,0),it.m.position.y<0&&(it.m.position.y=0))});const st=un((z-.6)/2.6);h.giant.position.y=-5+st*(h.savedPos.y+2+5),a(h.giant,"idle",z,t,N);const ut=h.giant.localToWorld(Ja(0,-.19,.2)),Ot=un((z-li.erupt)/(li.engulf-li.erupt));t.position.copy(h.savedPos).lerp(ut,Ot*.97).add(Ja((Math.random()-.5)*at,(Math.random()-.5)*at,(Math.random()-.5)*at));const J=t.clone();J.lookAt(ut),t.quaternion.copy(h.savedQuat).slerp(J.quaternion,un((z-1.5)/2)),c.style.background="#000",c.style.opacity=String(un((z-li.engulf+.6)/.6)),z>1.5&&z<1.6&&s("SOMETHING ENORMOUS IS VERY HAPPY TO SEE YOU",3),o.style.filter=`saturate(${1+Y}) contrast(${1+Y*.3})`}else if(z<Z){h.inWorld||(h.inWorld=!0,T(),_={x:0,y:0});const Y=z-li.engulf;c.style.background=Y<1?"#000":"#fff",c.style.opacity=String(Y<1?1-Y:un((Y-(h.wl-1.6))/1.6)),x.position.set(Math.sin(Y*.4)*1.5,Math.cos(Y*.3)*1,-Y*2.2),x.rotation.set(_.y+Math.sin(Y*.5)*.1,_.x,Math.sin(Y*.23)*.6,"YXZ"),f.position.z=x.position.z,y.position.z=x.position.z,v.position.set(0,0,x.position.z-22),P.forEach((ut,Ot)=>{ut.rotation.set(Y*(.3+Ot*.2)*(Ot%2?-1:1),Y*(.5+Ot*.1),0),ut.material.color.setHSL((Y*.1+Ot*.25)%1,1,.6),ut.scale.setScalar(1+.15*Math.sin(Y*2+Ot))}),E.forEach((ut,Ot)=>{const J=ut.a+Y*ut.sp;ut.e.position.set(Math.cos(J)*ut.r,ut.y+Math.abs(Math.sin(Y*3+Ot))*1.2,x.position.z-8+Math.sin(J)*ut.r),a(ut.e,"idle",Y+Ot,x,N)});const at=Math.floor(Y/3);at!==h.frag&&at<6&&(h.frag=at,s(Fh[at%Fh.length],2.8));const st=j/1e3;o.style.filter=`saturate(${2.2+Math.sin(st*2)}) hue-rotate(${st*60%360}deg) drop-shadow(${4+3*Math.sin(st*3)}px 0 rgba(255,0,80,.6)) drop-shadow(${-4-3*Math.sin(st*3)}px 0 rgba(0,255,240,.6))`,o.style.transform=`scale(${1.04+.03*Math.sin(st*1.7)}) skew(${3*Math.sin(st*.9)}deg, ${2*Math.sin(st*1.3)}deg) rotate(${2*Math.sin(st*.7)}deg)`,r.uPulse.value=1}else if(z<V){if(!h.back){h.back=!0,t.position.copy(h.savedPos),t.quaternion.copy(h.savedQuat);const Y=new ze().setFromQuaternion(t.quaternion,"YXZ");Y.x=0,Y.z=0,t.quaternion.setFromEuler(Y),o.style.filter="",o.style.transform="",s("WELCOME BACK.",4)}c.style.background="#fff",c.style.opacity=String(1-un((z-Z)/(V-Z)))}else{c.style.opacity="0",h.done=!0;const Y=h;return h=null,{finished:!0,savedPos:Y.savedPos}}return!0}function B(){return h&&h.inWorld&&!h.back?(e.render(A,D),e.clearDepth(),e.render(g,x),!0):!1}return{start:w,update:U,render:B,get state(){return h}}}const Sa={uTime:{value:0},uPulse:{value:0}};function fn(i,t=1){i=i.index?i.toNonIndexed():i,i.computeVertexNormals();const e=i.attributes.position.array,n=e.length/9,a=new Float32Array(e.length),r=new Float32Array(e.length/3),s=new Float32Array(e.length/3);for(let o=0;o<n;o++){const l=(e[o*9]+e[o*9+3]+e[o*9+6])/3,c=(e[o*9+1]+e[o*9+4]+e[o*9+7])/3,h=(e[o*9+2]+e[o*9+5]+e[o*9+8])/3,d=Math.abs(Math.sin(o*12.9898+l*78.233)*43758.5453)%1;for(let u=0;u<3;u++)a.set([l,c,h],o*9+u*3),r[o*3+u]=d,s[o*3+u]=t}return i.setAttribute("aCenter",new Ke(a,3)),i.setAttribute("aRand",new Ke(r,1)),i.setAttribute("aOpen",new Ke(s,1)),i}function yo(i){const t=new We,e=["position","normal","aCenter","aRand","aOpen"],n={};return e.forEach(a=>n[a]=[]),i.forEach(a=>e.forEach(r=>n[r].push(...a.attributes[r].array))),e.forEach(a=>t.setAttribute(a,new ce(n[a],i[0].attributes[a].itemSize))),t}const cr=new ue({uniforms:Sa,vertexShader:`attribute vec3 aCenter; attribute float aRand; attribute float aOpen; uniform float uTime;
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
    }`}),b2=new ue({uniforms:Sa,fragmentShader:cr.fragmentShader,vertexShader:cr.vertexShader.replace("vN = normalize",`float fl = clamp((abs(position.x) - 0.06) / 0.25, 0., 1.); fl = fl * fl; float sg = sign(position.x);
      float w = uTime * 2.4 + ph + sg * 1.1;
      pos += vec3(sg * 0.035 * sin(w), -0.03 * (0.5 + 0.5 * sin(w * 1.3 + 0.7)) - 0.015, 0.06 * sin(w * 0.8 + sg)) * fl;
      vN = normalize`)}),Hd=new Yt({color:16777215}),Vd=new Yt({color:16777215,wireframe:!1}),ga={shell:fn(new Xi(.17,1)),core:new Rs(.1,0),cap:(()=>{const i=[fn(new vr(.165,10,5,0,6.283,0,1.5708).scale(1,.8,1).translate(0,.05,0),.2)];return[-1,1].forEach(t=>{const e=new zd([new R(t*.05,.15,0),new R(t*.13,.26,-.01),new R(t*.24,.24,.01),new R(t*.3,.12,.03),new R(t*.31,.03,.04)]),n=12,a=6,r=new tc(e,n,.062,a,!1),s=r.attributes.position;for(let o=0;o<=n;o++){const l=o/n,c=e.getPointAt(l),h=Math.max(.12,1-l*.92);for(let d=0;d<=a;d++){const u=o*(a+1)+d;s.setXYZ(u,c.x+(s.getX(u)-c.x)*h,c.y+(s.getY(u)-c.y)*h,c.z+(s.getZ(u)-c.z)*h)}}i.push(fn(r,.25)),i.push(fn(new Xi(.03,1).translate(t*.31,0,.04),.3))}),yo(i)})(),leg:yo([fn(new yn(.024,.019,.11,5).translate(0,-.055,0),0),fn(new Xi(.035,0).scale(1,.6,1.5).translate(0,-.115,.02),.4)]),arm:yo([fn(new yn(.025,.02,.12,5).translate(0,-.06,0),0),fn(new Xi(.035,0).translate(0,-.13,0),.5)]),orb:new Xi(.06,0)};function Ds(i=Math.random()){const t=new Se,e=new Se;t.add(e);const n=new Tt(ga.shell,cr);e.add(n);const a=new Tt(ga.core,Hd);e.add(a);const r=new Tt(ga.cap,b2);e.add(r);const s=p=>{const g=new Tt(ga.arm,cr);return g.position.set(p,0,.04),e.add(g),g},o=s(-.17),l=s(.17),c=p=>{const g=new Tt(ga.leg,cr);return g.position.set(p,-.13,.02),e.add(g),g},h=c(-.07),d=c(.07),u=new Tt(ga.orb,Vd);return u.position.set(0,.42,.1),e.add(u),t.userData.rig={body:e,shell:n,core:a,cap:r,armL:o,armR:l,legL:h,legR:d,orb:u,seed:i,glitch:0},t}const y2=(i,t)=>Math.floor(i*t)/t;function Us(i,t,e,n,a){const r=i.userData.rig,s=r.seed*10,o=y2(e+s,8);let l=0,c=1,h=.3,d=.3,u=0,p=0,g=0,x=0,m=.12;if(t==="walk"||t==="retreat"){const y=Math.abs(Math.sin((e+s)*9));l=y*.16,c=y<.15?.75:1+y*.08;{const v=Math.sin((e+s)*9);g=v*.8,x=-v*.8}u=(e+s)*(t==="retreat"?-9:9),h=-1+Math.sin(e*18)*.6,d=-1-Math.sin(e*18)*.6}else if(t==="scrub")d=-1.6+Math.sin((e+s)*22)*.7,h=-1.6-Math.sin((e+s)*22)*.7,l=Math.abs(Math.sin((e+s)*11))*.04,u=Math.sin(e*5)*.3,g=Math.sin((e+s)*11)*.25,x=-g,m=.3;else if(t==="carry"){h=d=-2.9+Math.sin((e+s)*8)*.2;const y=Math.abs(Math.sin((e+s)*12));l=y*.05,c=1-y*.1,g=Math.sin((e+s)*12)*.5,x=-g}else t==="peek"?(h=-2.6,d=-.4+Math.sin((e+s)*3.1)*.35,p=1,g=Math.sin((e+s)*2.7)*.2,x=Math.sin((e+s)*2.7+2)*.2,m=.18+.08*Math.sin((e+s)*3.7),u=Math.sin(o*4)*.2):(l=Math.abs(Math.sin((e+s)*6))*.08,h=-2.4+Math.sin(o*3)*.4,d=.2+Math.sin((e+s)*3.3)*.5,p=1,g=Math.sin((e+s)*6)*.35,x=-g,m=.15+.1*Math.sin((e+s)*4.1));r.body.position.y=-.12+l,r.body.scale.set(1/Math.sqrt(c),c,1/Math.sqrt(c)),r.armL.rotation.set(h,0,.5+Math.sin((e+s)*4.3)*.12),r.armR.rotation.set(d,0,-.5-Math.sin((e+s)*3.9)*.12),r.legL.rotation.set(g,0,-m),r.legR.rotation.set(x,0,m),r.shell.rotation.set(u*.25,Math.sin(o*1.1+s)*.4,Math.sin(o*.7)*.3),r.core.rotation.set(e*2.3,e*3.1,0),r.core.scale.setScalar(.8+.3*Math.sin(e*4+s)),r.cap.rotation.z=Math.sin((e+s)*1.7)*.18,r.cap.rotation.x=-l*1.2,r.cap.position.y=.06+Math.abs(Math.sin(e*9+s))*.03,r.orb.visible=p>0,r.orb.rotation.set(e*3,e*2,0),r.orb.scale.set(1+.4*Math.sin(e*5),1+.4*Math.sin(e*5+2),1+.4*Math.sin(e*5+4));const f=i.getWorldPosition(new R);i.lookAt(n.position.x,f.y,n.position.z),r.glitch>0?r.glitch-=a:Math.random()<a*.6&&(r.glitch=.12);const S=r.glitch>0;r.body.position.x=S?(Math.random()-.5)*.06:0,S&&(r.body.scale.x*=1.5)}function Oh(i){const t=i/2e3%1;Vd.color.setHSL(t,1,.65),Hd.color.setHSL((t+.5)%1,1,.7)}const ac=(i,t)=>{const e=document.createElement("canvas");return e.width=i,e.height=t,[e,e.getContext("2d")]};let Bh=7;const we=()=>(Bh=Bh*16807%2147483647)/2147483647;function Gd(i,t=1,e=1){const n=new ti(i);return n.magFilter=n.minFilter=Ue,n.generateMipmaps=!1,n.wrapS=n.wrapT=Pi,n.repeat.set(t,e),n.colorSpace=ve,n}const Jr=[];function M2(){if(Jr.length<4){const[e,n]=ac(256,320),a=128,r=128,s=54+we()*10,o=24+we()*10,l=`hsl(${o},100%,50%)`,c=`hsl(${o-6},100%,34%)`,h=96,d=[we()*6,we()*6,we()*6],u=[];for(let v=0;v<h;v++){const P=v/h*6.283;let E=s*(1+.13*Math.sin(P*3+d[0])+.08*Math.sin(P*5+d[1])+.05*Math.sin(P*9+d[2]));u.push(E)}for(let v=0;v<7;v++){const P=we()*h|0,E=10+we()*22;for(let A=-2;A<=2;A++)u[(P+A+h)%h]+=E*(1-Math.abs(A)/3)}const p=(v,P)=>{n.beginPath();for(let E=0;E<=h;E++){const A=E/h*6.283,D=u[E%h]*v,_=a+Math.cos(A)*D,w=r+Math.sin(A)*D;E?n.lineTo(_,w):n.moveTo(_,w)}n.closePath(),n.fillStyle=P,n.fill()},g=[];for(let v=0,P=2+(we()*3|0);v<P;v++){const E=.6+we()*1.9,A=Math.round(E/6.283*h)%h;g.push({x:a+Math.cos(E)*u[A]*.8,y:r+Math.sin(E)*u[A]*.8,w:5+we()*7,len:40+we()*(260-r-u[A]*.8)})}const x=(v,P=0)=>{n.fillStyle=v,g.forEach(E=>{const A=E.w+P,D=Math.min(320-E.w-4,E.y+E.len);n.beginPath(),n.moveTo(E.x-A,E.y),n.quadraticCurveTo(E.x-A*.8,(E.y+D)/2,E.x-A*.7,D),n.arc(E.x,D,A*1.25,Math.PI,0,!0),n.lineTo(E.x+A*.7,D),n.quadraticCurveTo(E.x+A*.8,(E.y+D)/2,E.x+A,E.y),n.fill(),n.beginPath(),n.arc(E.x,D+A*.2,A*1.35,0,6.283),n.fill()})},m=[];for(let v=0;v<16;v++){const P=we()*6.283,E=s*(1.25+we()*.9);m.push([a+Math.cos(P)*E,r+Math.sin(P)*E,1.5+we()*5])}p(1.04,c),x(c,1.5),m.forEach(([v,P,E])=>{n.fillStyle=c,n.beginPath(),n.arc(v,P,E+1,0,6.283),n.fill()}),p(1,l),x(l),m.forEach(([v,P,E])=>{n.fillStyle=l,n.beginPath(),n.arc(v,P,E,0,6.283),n.fill()});const f=n.createRadialGradient(a-10,r-12,4,a,r,s*1.1);f.addColorStop(0,`hsla(${o+10},100%,62%,0.9)`),f.addColorStop(.7,`hsla(${o},100%,52%,0)`),n.globalCompositeOperation="source-atop",n.fillStyle=f,n.fillRect(0,0,256,320),n.fillStyle="rgba(80,20,0,0.18)",g.forEach(v=>{n.fillRect(v.x+v.w*.25,v.y,v.w*.6,v.len)});const S=n.createRadialGradient(a-18,r-22,2,a-18,r-22,s*.75);S.addColorStop(0,"rgba(255,255,240,0.55)"),S.addColorStop(1,"rgba(255,255,240,0)"),n.fillStyle=S,n.fillRect(0,0,256,320),n.fillStyle="rgba(255,255,250,0.95)",n.beginPath(),n.ellipse(a-22,r-26,13,5,-.6,0,6.283),n.fill(),n.beginPath(),n.ellipse(a-2,r-36,4,2,-.4,0,6.283),n.fill(),n.beginPath(),n.ellipse(a+20,r+14,6,2.2,-.7,0,6.283),n.fillStyle="rgba(255,255,250,0.5)",n.fill(),n.fillStyle="rgba(255,255,250,0.9)",g.forEach(v=>{const P=Math.min(320-v.w-4,v.y+v.len);n.beginPath(),n.ellipse(v.x-v.w*.45,P-v.w*.3,v.w*.32,v.w*.5,.3,0,6.283),n.fill(),n.fillRect(v.x-v.w*.55,v.y+6,Math.max(1.2,v.w*.18),v.len*.6)}),m.forEach(([v,P,E])=>{E>2.5&&(n.beginPath(),n.arc(v-E*.35,P-E*.35,E*.3,0,6.283),n.fill())}),n.globalCompositeOperation="source-over";const y=new ti(e);y.colorSpace=ve,y.minFilter=$i,y.magFilter=$e,y.generateMipmaps=!0,y.anisotropy=4,y.wrapS=y.wrapT=Yi,Jr.push(y)}return Jr[we()*Jr.length|0]}function Wd(i,t){const[e,n]=ac(256,40);n.fillStyle="#2a2014",n.fillRect(0,0,256,40),n.strokeStyle="#c9a24a",n.lineWidth=3,n.strokeRect(2,2,252,36),n.fillStyle="#f0d070",n.font="bold 15px monospace",n.textAlign="center",n.textBaseline="middle",n.fillText(i.length>30?i.slice(0,29)+"…":i,128,21);const a=Gd(e);return a.wrapS=a.wrapT=Yi,a}const Ka=[[20,16,12],[39,30,22],[55,43,31],[71,55,39],[87,67,47],[107,83,59],[127,99,71],[59,51,35],[79,71,47],[99,91,63],[47,47,51],[67,67,71],[91,91,95],[119,115,111],[123,63,31],[159,83,35],[191,111,47],[227,155,63]];function S2(i){const t=i.getContext("2d"),e=t.getImageData(0,0,i.width,i.height);for(let n=0;n<e.data.length;n+=4){let a=0,r=1e9;for(let s=0;s<Ka.length;s++){const o=Ka[s],l=(o[0]-e.data[n])**2+(o[1]-e.data[n+1])**2+(o[2]-e.data[n+2])**2;l<r&&(r=l,a=s)}e.data[n]=Ka[a][0],e.data[n+1]=Ka[a][1],e.data[n+2]=Ka[a][2]}return t.putImageData(e,0,0),i}function E2(i,t,e,n=900,a=.35){for(let r=0;r<n;r++){const s=we()<.5?0:255;i.fillStyle=`rgba(${s},${s},${s},${we()*a})`,i.fillRect(we()*t|0,we()*e|0,1+(we()*2|0),1)}}function T2(i,t){const[e,n]=ac(32,64);for(let a=0;a<64;a++){const r=60+Math.sin(a*.7+we())*12+we()*10|0;n.fillStyle=`rgb(${r},${r*.72|0},${r*.48|0})`,n.fillRect(0,a,32,1)}return n.fillStyle="#1e1810",n.fillRect(15,0,1,64),E2(n,32,64,300),Gd(S2(e),i,t)}const Hh="varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",A2=`varying vec2 vUv; uniform sampler2D map; uniform float t, flick;
  void main(){ vec3 c = texture2D(map, vec2(vUv.x*.5, vUv.y)).rgb; float a = texture2D(map, vec2(.5+vUv.x*.5, vUv.y)).r;
    a = smoothstep(.08,.6,a) * smoothstep(1.,.86,vUv.y) * smoothstep(0.,.16,vUv.y) * smoothstep(0.,.07,vUv.x) * smoothstep(1.,.95,vUv.x);
    c = mix(c, c*vec3(.7,1.,1.15)+vec3(.0,.04,.07), .4);
    float sl = .86 + .14*sin(vUv.y*408.*3.14159 + t*6.);
    float band = smoothstep(.0,.02, abs(fract(vUv.y*.5 - t*.12)-.5)-.47);
    c *= sl * flick * (1. + .5*(1.-band));
    gl_FragColor = vec4(c*.95, a*.9*flick);
    #include <colorspace_fragment>
  }`;let Mo=null;function C2(){if(Mo)return Mo;const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,4,64,64,64);return e.addColorStop(0,"rgba(160,240,255,1)"),e.addColorStop(.35,"rgba(70,200,255,.55)"),e.addColorStop(.8,"rgba(40,140,255,.15)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Mo=new ti(i)}function R2(i,t,e,n){const a=t.h||1.62,r=a*t.asp,s=new Se;s.position.set(t.x,t.y,t.z),i.add(s);const o=document.createElement("video");Object.assign(o,{src:n+t.src,loop:!0,muted:!0,playsInline:!0,crossOrigin:"anonymous",preload:"metadata"}),o.setAttribute("playsinline",""),o.setAttribute("webkit-playsinline","");const l=new Ps().load(n+t.still),c=new Ng(o);c.colorSpace=l.colorSpace=ve;const h={map:{value:l},t:{value:0},flick:{value:1}},d=new Tt(new he(r,a),new ue({uniforms:h,vertexShader:Hh,fragmentShader:A2,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1,side:Be}));d.position.y=.06+a/2,d.renderOrder=5,s.add(d);const u={transparent:!0,depthWrite:!1,blending:yi,toneMapped:!1,fog:!1},p=new Tt(new Cs(.95,48),new Yt({map:C2(),...u}));p.rotation.x=-Math.PI/2,p.position.y=.012,s.add(p);const g=new Tt(new Kl(.62,.68,64),new Yt({color:6741503,...u,opacity:.8}));g.rotation.x=-Math.PI/2,g.position.y=.015,s.add(g);const x=new Tt(new yn(.75,.6,a+.2,40,1,!0),new ue({...u,side:Be,uniforms:h,vertexShader:Hh,fragmentShader:"varying vec2 vUv; uniform float flick; void main(){ gl_FragColor = vec4(vec3(.25,.7,1.)*.11*(1.-vUv.y)*flick, 1.); }"}));if(x.position.y=(a+.2)/2,s.add(x),!e){const m=new Xn(6737151,2.5,5,2);m.position.y=.4,s.add(m)}return{d:t,root:s,video:o,vtex:c,still:l,uni:h,plane:d,ring:g,gain:null,pan:null,pauseAt:0,playing:!1}}function P2(i,t,e,{low:n=!1,base:a=""}={}){const r=e.map(T=>R2(i,T,n,a)),s=2,o=.32;r.forEach(T=>{const U=T.d.b;T.pv=1,T.far=U?Math.max(...[[U.minX,U.minZ],[U.minX,U.maxZ],[U.maxX,U.minZ],[U.maxX,U.maxZ]].map(([B,N])=>Math.hypot(B-T.d.x,N-T.d.z))):12});const l=(T,U)=>{const B=Math.min(1,Math.max(0,(U-s)/(T.far-s))),N=B*B*(3-2*B);return 1-(1-o)*N};let c=null,h=null,d=!1,u=!1,p=!1,g=null,x=0;const m=.4,f=T=>{T.uni.map.value=!p&&T.playing?T.vtex:T.still};r.forEach(T=>{T.video.addEventListener("playing",()=>{T.playing=!0,f(T)}),T.video.addEventListener("pause",()=>{T.playing=!1,f(T)})});const S=()=>!d&&!document.hidden;function y(T){r.forEach(U=>{const B=U===g?1:0;U.gain?T?U.gain.gain.value=B:U.gain.gain.setTargetAtTime(B,c.currentTime,m):U.video.muted=!(u&&B&&S())}),h&&h.gain.setTargetAtTime(S()?1:0,c.currentTime,.08)}const v=T=>{T.pauseAt=0,!document.hidden&&T.video.play().catch(()=>{})};function P(){if(u){c&&c.state==="suspended"&&c.resume();return}u=!0;try{c=new(window.AudioContext||window.webkitAudioContext),h=c.createGain(),h.connect(c.destination),r.forEach(T=>{const U=c.createMediaElementSource(T.video);T.pan=c.createStereoPanner?c.createStereoPanner():null,T.gain=c.createGain(),T.gain.gain.value=T===g?1:0,T.prox=c.createGain(),T.prox.gain.value=T.pv,(T.pan?U.connect(T.pan).connect(T.prox):U.connect(T.prox)).connect(T.gain).connect(h),T.video.muted=!1})}catch{c=null,h=null,r.forEach(U=>{U.gain=null})}y(!0),g&&v(g)}addEventListener("visibilitychange",()=>{document.hidden?r.forEach(T=>T.video.pause()):g&&v(g),y()});const E=new R;function A(T,U,B){const N=r.find(z=>z.d.room===B)||null;if(N!==g){const z=g;g=N,x++,z&&(z.pauseAt=U+(u?2e3:0)),g&&v(g),y(!u)}const j=t.position;E.set(1,0,0).applyQuaternion(t.quaternion);for(const z of r){z.pauseAt&&U>=z.pauseAt&&z!==g&&(z.pauseAt=0,z.video.pause()),z===g&&u&&z.video.paused&&!document.hidden&&v(z),z.uni.t.value=U/1e3,z.uni.flick.value=.93+.05*Math.sin(U/37+z.d.x)+(Math.random()<.01?-.25:0);const Z=z.d.x-j.x,V=z.d.z-j.z;if(z.plane.rotation.y=Math.atan2(-Z,-V),z.ring.rotation.z+=T*.4,z===g){const Y=l(z,Math.hypot(Z,V));Math.abs(Y-z.pv)>.003&&(z.pv=Y,z.prox?z.prox.gain.setTargetAtTime(Y,c.currentTime,.15):z.gain||(z.video.volume=Y))}if(z.pan&&z===g){const Y=Math.hypot(Z,V)||1;z.pan.pan.setTargetAtTime(Math.max(-1,Math.min(1,(Z*E.x+V*E.z)/Y))*.3,c.currentTime,.1)}}}function D(T){p=T,r.forEach(f)}function _(){return d=!d,P(),y(),d}function w(T,U){return d=!!T,U&&P(),y(),d}return{H:r,begin:P,update:A,toggleMute:_,setMuted:w,setLowStill:D,get muted(){return d},get state(){return{started:u,ctx:c&&c.state,active:g&&g.d.room,switches:x,lowStill:p,holos:r.map(T=>({room:T.d.room,paused:T.video.paused,t:+T.video.currentTime.toFixed(2),gain:T.gain?+T.gain.gain.value.toFixed(3):T.video.muted?0:1,prox:T.prox?+T.prox.gain.value.toFixed(3):+T.pv.toFixed(3),proxTarget:+T.pv.toFixed(3),far:+T.far.toFixed(1),video:T.uni.map.value===T.vtex}))}}}}const L2=.44,ci=.4,So=i=>i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2,pn=i=>{const t=new Yt(i);return t.toneMapped=!1,t.fog=!1,t};function D2({scene:i,camera:t,controls:e,defs:n,base:a="",low:r=!1,stone:s,pillars:o,isMuted:l,onReading:c}){const h=new Ps;h.setCrossOrigin("anonymous");const d=new Map;function u(k,G){let W=d.get(k);return W?(W.t&&W.ok?G&&G(W.t):G&&W.cbs.push(G),W):(W={t:null,ok:!1,cbs:G?[G]:[],used:performance.now()},d.set(k,W),W.t=h.load(k,wt=>{wt.colorSpace=ve,wt.anisotropy=4,W.ok=!0,W.cbs.forEach(L=>L(wt)),W.cbs=[]},void 0,()=>{d.delete(k)}),W)}const p=(k,G,W)=>`${a}books/${k.d.id}/${String(G).padStart(3,"0")}-${W}.webp`,g=(()=>{const k=document.createElement("canvas");k.width=k.height=128;const G=k.getContext("2d"),W=G.createRadialGradient(64,64,2,64,64,64);W.addColorStop(0,"rgba(255,225,170,.9)"),W.addColorStop(.5,"rgba(255,190,120,.35)"),W.addColorStop(1,"rgba(0,0,0,0)"),G.fillStyle=W,G.fillRect(0,0,128,128);const wt=new ti(k);return wt.colorSpace=ve,wt})(),x={transparent:!0,depthWrite:!1,blending:yi,toneMapped:!1,fog:!1},m=15985884,f=4858902,S=n.map(k=>{const G=ci*k.aspect,W=new Se;W.position.set(k.x,0,k.z),W.rotation.y=k.yaw,i.add(W);const wt=new Tt(new Ze(.34,.82,.34),s);wt.position.y=.47,W.add(wt);const L=new Tt(new Ze(.62,.12,.62),s);L.position.y=.06,W.add(L);const St=new Se;St.position.set(0,1.06,0),St.rotation.x=L2,W.add(St);const ft=new Tt(new Ze(2*G+.14,.05,ci+.12),s);ft.position.y=-.025,St.add(ft);const bt=new Se;bt.rotation.x=-Math.PI/2,bt.position.y=.002,St.add(bt);const Et=(Bt,Ft,Zt,I,dt,$=0)=>{const tt=new Tt(new he(Bt,Ft),Zt);return tt.position.set(I,0,dt),tt.rotation.y=$,tt},$t=new Tt(new Ze(G,ci,.03),pn({color:15261900}));$t.position.set(G/2,0,.015),bt.add($t);const Ct=$t.clone();Ct.position.x=-G/2,Ct.visible=!1,bt.add(Ct);const C=Et(G+.01,ci+.01,pn({color:f,side:Be}),G/2,-.002);bt.add(C);const b=Et(G,ci,pn({color:m}),-G/2,.031);b.visible=!1,bt.add(b);const H=Et(G,ci,pn({color:m}),G/2,.031);bt.add(H);const Q=new Se;Q.position.z=.0335,bt.add(Q);const et=pn({color:16777215});u(a+k.cover,Bt=>{et.map=Bt,et.needsUpdate=!0});const K=Et(G+.008,ci+.008,et,G/2,.001);Q.add(K);const At=Et(G+.008,ci+.008,pn({color:5909530}),G/2,-.001,Math.PI);Q.add(At);const ht=new Se;ht.position.z=.033,ht.visible=!1,bt.add(ht);const gt=Et(G,ci,pn({color:m}),G/2,5e-4),Vt=Et(G,ci,pn({color:m}),G/2,-5e-4,Math.PI);ht.add(gt,Vt);const nt=new Tt(new Cs(1.3,40),new Yt({map:g,...x,opacity:.55}));nt.rotation.x=-Math.PI/2,nt.position.y=.015,W.add(nt);const yt=new Tt(new yn(.12,.9,2.6,32,1,!0),new Yt({color:16766880,...x,opacity:.05,side:Be}));yt.position.y=1.4,W.add(yt);const Nt=new Tt(new he(2*G+.5,ci+.4),new Yt({map:g,...x,opacity:.35}));if(Nt.rotation.x=-Math.PI/2,Nt.position.y=.003,St.add(Nt),!r){const Bt=new Fd(16766624,6,5,.5,.7,1.5);Bt.position.set(0,3.4,.6),Bt.target=St,W.add(Bt)}o&&o.push([k.x,k.z]);const kt=k.pages,Mt=Math.floor(kt/2)+1;return{d:k,W:G,g:W,desk:St,book:bt,block:$t,blockL:Ct,pageL:b,pageR:H,coverPivot:Q,turn:ht,tF:gt,tB:Vt,hit:[wt,ft,K,$t],npg:kt,spreads:Mt,spread:0}}),y=S.flatMap(k=>k.hit.map(G=>(G.userData.book=k,G))),v=(k,G)=>G===0?0:2*G,P=(k,G)=>2*G+1;function E(k,G,W,wt){const L=k.material;if(!W||W>G.npg){L.map=null,L.color.set(m),L.needsUpdate=!0,k.userData.n=0;return}k.userData.n=W,L.color.set(16777215);const St=()=>{for(const bt of wt?["hi","md","lo"]:["md","lo"]){const Et=d.get(p(G,W,bt));if(Et&&Et.ok)return Et.t}return null},ft=()=>{if(k.userData.n!==W)return;const bt=St();bt&&L.map!==bt?(L.map=bt,L.needsUpdate=!0):!bt&&!L.map&&L.color.set(m)};L.map&&!(L.map.userData&&L.map.userData.n===W)&&(L.map=null,L.needsUpdate=!0),u(p(G,W,"lo"),bt=>{bt.userData.n=W,ft()}),u(p(G,W,"md"),bt=>{bt.userData.n=W,ft()}),wt&&u(p(G,W,"hi"),bt=>{bt.userData.n=W,ft()}),ft()}function A(k,G){for(let W=G-2;W<=G+3;W++)if(!(W<0||W>=k.spreads))for(const wt of[v(k,W),P(k,W)])wt&&wt<=k.npg&&(u(p(k,wt,"lo")),Math.abs(W-G)<=2&&u(p(k,wt,"md")));for(const[W,wt]of d){const L=W.match(/books\/([^/]+)\/(\d+)-(hi|md)\.webp$/);if(!L||L[1]!==k.d.id||!wt.ok)continue;const St=+L[2],ft=Math.floor(St/2);(L[3]==="hi"&&ft!==G||L[3]==="md"&&Math.abs(ft-G)>3)&&(wt.t.dispose(),d.delete(W))}}function D(k,G){k.spread=G,E(k.pageL,k,v(k,G),!0),E(k.pageR,k,P(k,G),!0),k.pageL.visible=G>0||U===k,A(k,G),T.update()}let _=null;function w(){if(!(l&&l()))try{_=_||new(window.AudioContext||window.webkitAudioContext),_.state==="suspended"&&_.resume();const k=_.sampleRate*.45,G=_.createBuffer(1,k,_.sampleRate),W=G.getChannelData(0);for(let ft=0;ft<k;ft++){const bt=ft/k;W[ft]=(Math.random()*2-1)*Math.pow(Math.sin(Math.PI*Math.min(1,bt*1.6)),2)*(.6+.4*Math.sin(bt*40))}const wt=_.createBufferSource();wt.buffer=G;const L=_.createBiquadFilter();L.type="bandpass",L.frequency.value=2400,L.Q.value=.7;const St=_.createGain();St.gain.value=.16,wt.connect(L).connect(St).connect(_.destination),wt.start()}catch{}}const T=(()=>{const k=document.createElement("div");k.id="bookui",k.hidden=!0,k.innerHTML='<div class="bk-top"><b class="bk-title"></b><a class="bk-link" target="_blank" rel="noopener">View on tjm.art ↗</a><button type="button" class="bk-close" aria-label="Close book">✕ Close</button></div><div class="bk-bot"><button type="button" class="bk-prev" aria-label="Previous pages">‹</button><span class="bk-pg"></span><button type="button" class="bk-next" aria-label="Next pages">›</button></div>',document.body.appendChild(k);const G=W=>k.querySelector(W);return["mousedown","pointerdown","touchstart","touchend","click","mouseup"].forEach(W=>k.querySelectorAll("button,a").forEach(wt=>wt.addEventListener(W,L=>L.stopPropagation(),{passive:W!=="click"}))),G(".bk-close").addEventListener("click",()=>st(!0)),G(".bk-prev").addEventListener("click",()=>ut(-1)),G(".bk-next").addEventListener("click",()=>ut(1)),{el:k,update(){const W=U||B;if(!W)return;G(".bk-title").textContent=W.d.title,G(".bk-link").href=W.d.url;const wt=v(W,W.spread),L=P(W,W.spread);G(".bk-pg").textContent=W.spread===0?`p. 1 / ${W.npg}`:L<=W.npg?`pp. ${wt}–${L} / ${W.npg}`:`p. ${wt} / ${W.npg}`,G(".bk-prev").disabled=W.spread===0,G(".bk-next").disabled=W.spread>=W.spreads-1}}})();let U=null,B=null,N=null,j=null,z=0;const Z=document.createElement("div");Z.id="bookhint",Z.hidden=!0,document.body.appendChild(Z);function V(k){k.desk.updateMatrixWorld(!0);const G=new R(0,.03,0).applyMatrix4(k.desk.matrixWorld),W=new R(0,1,0).transformDirection(k.desk.matrixWorld),wt=new R(0,0,-1).transformDirection(k.desk.matrixWorld),L=Math.tan(Tr.degToRad(t.fov/2)),St=Math.max(ci*1.3/2/L,k.W*2*1.18/2/(L*t.aspect)),ft=G.clone().addScaledVector(W,St),bt=new ee().lookAt(ft,G,wt);return{pos:ft,quat:new ka().setFromRotationMatrix(bt)}}function Y(k){if(U||B||N)return;B=k,window.__reading=!0,c&&c(!0),j={pos:t.position.clone(),quat:t.quaternion.clone(),locked:e.isLocked},e.isLocked&&e.unlock(),k.spread=0,D(k,0),k.pageL.visible=!1,T.el.hidden=!1,T.update(),Z.hidden=!0;const G=V(k);N={t:0,dur:1.1,kind:"open",b:k,from:{pos:t.position.clone(),quat:t.quaternion.clone()},to:G}}let at=null;function st(k){if(N&&(N.kind==="flip"||N.kind==="open")){at={relock:k},z=0;return}const G=U;!G||N||(at=null,z=0,N={t:0,dur:.9,kind:"close",b:G,from:{pos:t.position.clone(),quat:t.quaternion.clone()},to:j,relock:k})}function ut(k){const G=U;if(!G)return;if(N){N.kind==="flip"&&(z=Math.max(-3,Math.min(3,z+k)));return}const W=G.spread+k;W<0||W>=G.spreads||(w(),G.turn.visible=!0,k>0?(E(G.tF,G,P(G,G.spread),!0),E(G.tB,G,v(G,W),!0),E(G.pageR,G,P(G,W),!0),G.turn.rotation.y=0):(E(G.tF,G,P(G,W),!0),E(G.tB,G,v(G,G.spread),!0),E(G.pageL,G,v(G,W),!0),G.turn.rotation.y=-Math.PI,W===0&&(G.pageL.visible=!1)),k>0&&G.spread===0&&(G.pageL.visible=!1),N={t:0,dur:r?.5:.65,kind:"flip",b:G,dir:k,s:W})}let Ot=performance.now();function J(){const k=performance.now(),G=Math.min(.5,(k-Ot)/1e3);if(Ot=k,N){N.t+=G;const W=Math.min(1,N.t/N.dur),wt=So(W),L=N,St=L.b;if(L.kind==="open"||L.kind==="close"){t.position.lerpVectors(L.from.pos,L.to.pos,wt),t.quaternion.slerpQuaternions(L.from.quat,L.to.quat,wt);const ft=L.kind==="open"?Tr.clamp((W-.35)/.65,0,1):Tr.clamp(1-W/.6,0,1);St.coverPivot.rotation.y=-Math.PI*So(ft),St.coverPivot.position.z=.0335-.0375*Tr.clamp((So(ft)-.5)*2,0,1),St.blockL.visible=ft>.5,St.pageL.visible=ft>.92&&St.spread>0,L.kind==="open"&&ft>.92&&(St.pageL.visible=!0)}else if(L.kind==="flip"){const ft=L.dir>0?-Math.PI*wt:-Math.PI*(1-wt);St.turn.rotation.y=ft,St.turn.position.z=.033+Math.sin(Math.PI*wt)*.02}if(W>=1){if(N=null,at&&L.kind!=="close"){const ft=at;at=null,L.kind==="open"?(U=St,B=null):(St.turn.visible=!1,D(St,L.s)),St.pageL.visible=!0,st(ft.relock);return}if(L.kind==="open")U=St,B=null,St.pageL.visible=!0,E(St.pageL,St,0,!0),T.update();else if(L.kind==="close"){if(U=null,T.el.hidden=!0,St.coverPivot.rotation.y=0,St.coverPivot.position.z=.0335,St.blockL.visible=!1,St.pageL.visible=!1,St.spread=0,E(St.pageR,St,1,!1),window.__reading=!1,c&&c(!1),L.relock!==!1)try{e.lock()}catch{}}else if(St.turn.visible=!1,D(St,L.s),St.pageL.visible=!0,z){const ft=Math.sign(z);z-=ft,ut(ft)}}}if(!U&&!N){const W=ct();Z.hidden=!W,W&&(Z.textContent=(matchMedia("(pointer:coarse)").matches?"Tap":"E / click")+" to read “"+W.d.title+"”")}}const it=new Od,mt=new ot;function ct(){let k=null,G=2.6;for(const W of S){const wt=W.d.x-t.position.x,L=W.d.z-t.position.z,St=Math.hypot(wt,L);if(St>G)continue;const ft=new R;t.getWorldDirection(ft),(ft.x*wt+ft.z*L)/(St||1)>.55&&(k=W,G=St)}return k}function Rt(k){if(U||N)return!1;t.updateMatrixWorld(),it.setFromCamera(k||mt.set(0,0),t),it.far=3.2;const G=it.intersectObjects(y,!1)[0];if(G)return Y(G.object.userData.book),!0;if(!k){const W=ct();if(W)return Y(W),!0}return!1}addEventListener("keydown",k=>{U&&(k.code==="ArrowRight"||k.code==="KeyD"||k.code==="PageDown"||k.code==="Space"?(ut(1),k.preventDefault()):k.code==="ArrowLeft"||k.code==="KeyA"||k.code==="PageUp"?(ut(-1),k.preventDefault()):k.code==="Escape"&&st(!1))},!0);let Pt=null;return addEventListener("pointerdown",k=>{!U||k.target.closest&&k.target.closest("#bookui,#soundbtn,#homebtn,#hud")||(Pt={x:k.clientX,y:k.clientY,t:performance.now()})},!0),addEventListener("pointerup",k=>{if(!U||!Pt)return;const G=k.clientX-Pt.x,W=k.clientY-Pt.y,wt=Pt;if(Pt=null,Math.abs(G)>40&&Math.abs(G)>Math.abs(W)){ut(G<0?1:-1);return}Math.hypot(G,W)<12&&performance.now()-wt.t<500&&ut(k.clientX>innerWidth/2?1:-1)},!0),{B:S,update:J,tryOpen:Rt,open:Y,close:st,flip:ut,get reading(){return!!U||!!N},get state(){const k=U||B;return{reading:!!U,anim:N&&N.kind,book:k&&k.d.id,spread:k&&k.spread,left:k&&k.pageL.userData.n,right:k&&k.pageR.userData.n,leftTex:k&&k.pageL.material.map&&k.pageL.material.map.image&&k.pageL.material.map.image.width,rightTex:k&&k.pageR.material.map&&k.pageR.material.map.image&&k.pageR.material.map.image.width,cached:d.size,hint:Z.hidden?null:Z.textContent}}}}const hr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ba{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const U2=new Es(-1,1,1,-1,0,1);class I2 extends We{constructor(){super(),this.setAttribute("position",new ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ce([0,2,0,0,2,0],2))}}const z2=new I2;class rc{constructor(t){this._mesh=new Tt(z2,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,U2)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class jd extends Ba{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ue?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ji.clone(t.uniforms),this.material=new ue({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new rc(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Vh extends Ba{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const a=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let s,o;this.inverse?(s=0,o=1):(s=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),r.buffers.stencil.setFunc(a.ALWAYS,s,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(a.EQUAL,1,4294967295),r.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),r.buffers.stencil.setLocked(!0)}}class N2 extends Ba{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class k2{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new ot);this._width=n.width,this._height=n.height,e=new qe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ri}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new jd(hr),this.copyPass.material.blending=De,this.clock=new o2}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let a=0,r=this.passes.length;a<r;a++){const s=this.passes[a];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),s.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),s.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Vh!==void 0&&(s instanceof Vh?n=!0:s instanceof N2&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ot);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(n,a),this.renderTarget2.setSize(n,a);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,a)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class F2 extends Ba{constructor(t,e,n=null,a=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=a,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new It}render(t,e,n){const a=t.autoClear;t.autoClear=!1;let r,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),t.autoClear=a}}const Kr={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ot},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new ee},cameraProjectionMatrixInverse:{value:new ee},cameraWorldMatrix:{value:new ee},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new R(-1,-1,-1)},sceneBoxMax:{value:new R(1,1,1)}},vertexShader:`

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
		}`},Qr={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Eo={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function O2(i=5){const t=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),e=B2(t),n=e.length,a=new Uint8Array(n*4);for(let s=0;s<n;++s){const o=e[s],l=2*Math.PI*o/n,c=new R(Math.cos(l),Math.sin(l),0).normalize();a[s*4]=(c.x*.5+.5)*255,a[s*4+1]=(c.y*.5+.5)*255,a[s*4+2]=127,a[s*4+3]=255}const r=new Ud(a,t,t);return r.wrapS=Pi,r.wrapT=Pi,r.needsUpdate=!0,r}function B2(i){const t=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),e=t*t,n=Array(e).fill(0);let a=Math.floor(t/2),r=t-1;for(let s=1;s<=e;){if(a===-1&&r===t?(r=t-2,a=0):(r===t&&(r=0),a<0&&(a=t-1)),n[a*t+r]!==0){r-=2,a++;continue}else n[a*t+r]=s++;r++,a--}return n}const ts={defines:{SAMPLES:16,SAMPLE_VECTORS:Xd(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ot},cameraProjectionMatrixInverse:{value:new ee},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Xd(i,t,e){const n=H2(i,t,e);let a="vec3[SAMPLES](";for(let r=0;r<i;r++){const s=n[r];a+=`vec3(${s.x}, ${s.y}, ${s.z})${r<i-1?",":")"}`}return a}function H2(i,t,e){const n=[];for(let a=0;a<i;a++){const r=2*Math.PI*t*a/i,s=Math.pow(a/(i-1),e);n.push(new R(Math.cos(r),Math.sin(r),s))}return n}class V2{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(t,e,n){return t[0]*e+t[1]*n}dot3(t,e,n,a){return t[0]*e+t[1]*n+t[2]*a}dot4(t,e,n,a,r){return t[0]*e+t[1]*n+t[2]*a+t[3]*r}noise(t,e){let n,a,r;const s=.5*(Math.sqrt(3)-1),o=(t+e)*s,l=Math.floor(t+o),c=Math.floor(e+o),h=(3-Math.sqrt(3))/6,d=(l+c)*h,u=l-d,p=c-d,g=t-u,x=e-p;let m,f;g>x?(m=1,f=0):(m=0,f=1);const S=g-m+h,y=x-f+h,v=g-1+2*h,P=x-1+2*h,E=l&255,A=c&255,D=this.perm[E+this.perm[A]]%12,_=this.perm[E+m+this.perm[A+f]]%12,w=this.perm[E+1+this.perm[A+1]]%12;let T=.5-g*g-x*x;T<0?n=0:(T*=T,n=T*T*this.dot(this.grad3[D],g,x));let U=.5-S*S-y*y;U<0?a=0:(U*=U,a=U*U*this.dot(this.grad3[_],S,y));let B=.5-v*v-P*P;return B<0?r=0:(B*=B,r=B*B*this.dot(this.grad3[w],v,P)),70*(n+a+r)}noise3d(t,e,n){let a,r,s,o;const c=(t+e+n)*.3333333333333333,h=Math.floor(t+c),d=Math.floor(e+c),u=Math.floor(n+c),p=1/6,g=(h+d+u)*p,x=h-g,m=d-g,f=u-g,S=t-x,y=e-m,v=n-f;let P,E,A,D,_,w;S>=y?y>=v?(P=1,E=0,A=0,D=1,_=1,w=0):S>=v?(P=1,E=0,A=0,D=1,_=0,w=1):(P=0,E=0,A=1,D=1,_=0,w=1):y<v?(P=0,E=0,A=1,D=0,_=1,w=1):S<v?(P=0,E=1,A=0,D=0,_=1,w=1):(P=0,E=1,A=0,D=1,_=1,w=0);const T=S-P+p,U=y-E+p,B=v-A+p,N=S-D+2*p,j=y-_+2*p,z=v-w+2*p,Z=S-1+3*p,V=y-1+3*p,Y=v-1+3*p,at=h&255,st=d&255,ut=u&255,Ot=this.perm[at+this.perm[st+this.perm[ut]]]%12,J=this.perm[at+P+this.perm[st+E+this.perm[ut+A]]]%12,it=this.perm[at+D+this.perm[st+_+this.perm[ut+w]]]%12,mt=this.perm[at+1+this.perm[st+1+this.perm[ut+1]]]%12;let ct=.6-S*S-y*y-v*v;ct<0?a=0:(ct*=ct,a=ct*ct*this.dot3(this.grad3[Ot],S,y,v));let Rt=.6-T*T-U*U-B*B;Rt<0?r=0:(Rt*=Rt,r=Rt*Rt*this.dot3(this.grad3[J],T,U,B));let Pt=.6-N*N-j*j-z*z;Pt<0?s=0:(Pt*=Pt,s=Pt*Pt*this.dot3(this.grad3[it],N,j,z));let k=.6-Z*Z-V*V-Y*Y;return k<0?o=0:(k*=k,o=k*k*this.dot3(this.grad3[mt],Z,V,Y)),32*(a+r+s+o)}noise4d(t,e,n,a){const r=this.grad4,s=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,d,u,p,g;const x=(t+e+n+a)*l,m=Math.floor(t+x),f=Math.floor(e+x),S=Math.floor(n+x),y=Math.floor(a+x),v=(m+f+S+y)*c,P=m-v,E=f-v,A=S-v,D=y-v,_=t-P,w=e-E,T=n-A,U=a-D,B=_>w?32:0,N=_>T?16:0,j=w>T?8:0,z=_>U?4:0,Z=w>U?2:0,V=T>U?1:0,Y=B+N+j+z+Z+V,at=s[Y][0]>=3?1:0,st=s[Y][1]>=3?1:0,ut=s[Y][2]>=3?1:0,Ot=s[Y][3]>=3?1:0,J=s[Y][0]>=2?1:0,it=s[Y][1]>=2?1:0,mt=s[Y][2]>=2?1:0,ct=s[Y][3]>=2?1:0,Rt=s[Y][0]>=1?1:0,Pt=s[Y][1]>=1?1:0,k=s[Y][2]>=1?1:0,G=s[Y][3]>=1?1:0,W=_-at+c,wt=w-st+c,L=T-ut+c,St=U-Ot+c,ft=_-J+2*c,bt=w-it+2*c,Et=T-mt+2*c,$t=U-ct+2*c,Ct=_-Rt+3*c,C=w-Pt+3*c,b=T-k+3*c,H=U-G+3*c,Q=_-1+4*c,et=w-1+4*c,K=T-1+4*c,At=U-1+4*c,ht=m&255,gt=f&255,Vt=S&255,nt=y&255,yt=o[ht+o[gt+o[Vt+o[nt]]]]%32,Nt=o[ht+at+o[gt+st+o[Vt+ut+o[nt+Ot]]]]%32,kt=o[ht+J+o[gt+it+o[Vt+mt+o[nt+ct]]]]%32,Mt=o[ht+Rt+o[gt+Pt+o[Vt+k+o[nt+G]]]]%32,Bt=o[ht+1+o[gt+1+o[Vt+1+o[nt+1]]]]%32;let Ft=.6-_*_-w*w-T*T-U*U;Ft<0?h=0:(Ft*=Ft,h=Ft*Ft*this.dot4(r[yt],_,w,T,U));let Zt=.6-W*W-wt*wt-L*L-St*St;Zt<0?d=0:(Zt*=Zt,d=Zt*Zt*this.dot4(r[Nt],W,wt,L,St));let I=.6-ft*ft-bt*bt-Et*Et-$t*$t;I<0?u=0:(I*=I,u=I*I*this.dot4(r[kt],ft,bt,Et,$t));let dt=.6-Ct*Ct-C*C-b*b-H*H;dt<0?p=0:(dt*=dt,p=dt*dt*this.dot4(r[Mt],Ct,C,b,H));let $=.6-Q*Q-et*et-K*K-At*At;return $<0?g=0:($*=$,g=$*$*this.dot4(r[Bt],Q,et,K,At)),27*(h+d+u+p+g)}}class xi extends Ba{constructor(t,e,n,a,r,s,o){super(),this.width=n!==void 0?n:512,this.height=a!==void 0?a:512,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=O2(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new qe(this.width,this.height,{type:ri}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new ue({defines:Object.assign({},Kr.defines),uniforms:ji.clone(Kr.uniforms),vertexShader:Kr.vertexShader,fragmentShader:Kr.fragmentShader,blending:De,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Qg,this.normalMaterial.blending=De,this.pdMaterial=new ue({defines:Object.assign({},ts.defines),uniforms:ji.clone(ts.uniforms),vertexShader:ts.vertexShader,fragmentShader:ts.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new ue({defines:Object.assign({},Qr.defines),uniforms:ji.clone(Qr.uniforms),vertexShader:Qr.vertexShader,fragmentShader:Qr.fragmentShader,blending:De}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ue({uniforms:ji.clone(hr.uniforms),vertexShader:hr.vertexShader,fragmentShader:hr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Fo,blendDst:Qa,blendEquation:wi,blendSrcAlpha:ko,blendDstAlpha:Qa,blendEquationAlpha:wi}),this.blendMaterial=new ue({uniforms:ji.clone(Eo.uniforms),vertexShader:Eo.vertexShader,fragmentShader:Eo.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:nd,blendSrc:Fo,blendDst:Qa,blendEquation:wi,blendSrcAlpha:ko,blendDstAlpha:Qa,blendEquationAlpha:wi}),this.fsQuad=new rc(null),this.originalClearColor=new It,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),s!==void 0&&this.updateGtaoMaterial(s),o!==void 0&&this.updatePdMaterial(o)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new Yl,this.depthTexture.format=Hn,this.depthTexture.type=Bn,this.normalRenderTarget=new qe(this.width,this.height,{minFilter:Ue,magFilter:Ue,type:ri,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,a=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=a,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=a,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Xd(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case xi.OUTPUT.Off:break;case xi.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=De,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case xi.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=De,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case xi.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=De,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case xi.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case xi.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=De,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case xi.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=De,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(t,e,n,a,r){t.getClearColor(this.originalClearColor);const s=t.getClearAlpha(),o=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,a!=null&&(t.setClearColor(a),t.setClearAlpha(r||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=o,t.setClearColor(this.originalClearColor),t.setClearAlpha(s)}renderOverride(t,e,n,a,r){t.getClearColor(this.originalClearColor);const s=t.getClearAlpha(),o=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,a=e.clearColor||a,r=e.clearAlpha||r,a!=null&&(t.setClearColor(a),t.setClearAlpha(r||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=o,t.setClearColor(this.originalClearColor),t.setClearAlpha(s)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){const t=this.scene,e=this._visibilityCache;t.traverse(function(n){e.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){const t=this.scene,e=this._visibilityCache;t.traverse(function(n){const a=e.get(n);n.visible=a}),e.clear()}generateNoise(t=64){const e=new V2,n=t*t*4,a=new Uint8Array(n);for(let s=0;s<t;s++)for(let o=0;o<t;o++){const l=s,c=o;a[(s*t+o)*4]=(e.noise(l,c)*.5+.5)*255,a[(s*t+o)*4+1]=(e.noise(l+t,c)*.5+.5)*255,a[(s*t+o)*4+2]=(e.noise(l,c+t)*.5+.5)*255,a[(s*t+o)*4+3]=(e.noise(l+t,c+t)*.5+.5)*255}const r=new Ud(a,t,t,ui,Li);return r.wrapS=Pi,r.wrapT=Pi,r.needsUpdate=!0,r}}xi.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const G2={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new It(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Da extends Ba{constructor(t,e,n,a){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=a,this.resolution=t!==void 0?new ot(t.x,t.y):new ot(256,256),this.clearColor=new It(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new qe(r,s,{type:ri}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const u=new qe(r,s,{type:ri});u.texture.name="UnrealBloomPass.h"+d,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const p=new qe(r,s,{type:ri});p.texture.name="UnrealBloomPass.v"+d,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),s=Math.round(s/2)}const o=G2;this.highPassUniforms=ji.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ue({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new ot(1/r,1/s),r=Math.round(r/2),s=Math.round(s/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1),new R(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=hr;this.copyUniforms=ji.clone(h.uniforms),this.blendMaterial=new ue({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:yi,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new It,this.oldClearAlpha=1,this.basic=new Yt,this.fsQuad=new rc(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),a=Math.round(e/2);this.renderTargetBright.setSize(n,a);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,a),this.renderTargetsVertical[r].setSize(n,a),this.separableBlurMaterials[r].uniforms.invSize.value=new ot(1/n,1/a),n=Math.round(n/2),a=Math.round(a/2)}render(t,e,n,a,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const s=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Da.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Da.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=s}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new ue({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ot(.5,.5)},direction:{value:new ot(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new ue({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Da.BlurDirectionX=new ot(1,0);Da.BlurDirectionY=new ot(0,1);const Gh=new URLSearchParams(location.search),W2=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>1&&Math.min(screen.width,screen.height)<820,Wh=(()=>{try{return localStorage.getItem("tjmPlayQ")}catch{return null}})(),xs=["low","medium","high"],_n=xs.includes(Gh.get("q"))?Gh.get("q"):xs.includes(Wh)?Wh:W2?"low":"medium",_e=_n==="high",Vn=_n==="medium",qn=_n==="low",El=1,j2=i=>xs[(xs.indexOf(i)+1)%3];function X2(i){try{localStorage.setItem("tjmPlayQ",i)}catch{}const t=new URL(location.href);t.searchParams.delete("q"),location.replace(t)}function q2(i){const t=new Ig({canvas:i,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"});return t.setPixelRatio(Math.min(devicePixelRatio||1,1.25)),t.setSize(innerWidth,innerHeight,!1),t.toneMapping=ms,t.toneMappingExposure=1.8,t.outputColorSpace=ve,t.shadowMap.enabled=!qn,t.shadowMap.type=_e?id:zl,t}const Y2=new Ps,To={};function Ao(i,t,e){const n=i+t;if(To[n])return To[n];const a=t==="diff"&&qn&&i!=="metal"?`${i}_diff_1k`:`${i}_${t}`,r=Y2.load("/play/pbr/"+a+".webp");return r.wrapS=r.wrapT=Pi,r.colorSpace=e?ve:Wi,r.anisotropy=8,To[n]=r}const Co=(i,t,e)=>{const n=i.clone();return n.repeat.set(t,e),n},ds=new Map;function es(i,t,e,n={}){t=Math.max(.5,Math.round(t*4)/4),e=Math.max(.5,Math.round(e*4)/4);const a=[i,t,e,n.wet?1:0,n.tint||""].join("|");if(ds.has(a))return ds.get(a);const r=Co(Ao(i,"arm"),t,e),s={map:Co(Ao(i,"diff",!0),t,e),normalMap:Co(Ao(i,"nor"),t,e),aoMap:r,roughnessMap:r,metalnessMap:r,aoMapIntensity:.9};let o;return n.wet&&_e?o=new Kg({...s,roughness:.55,metalness:0,clearcoat:.7,clearcoatRoughness:.12,envMapIntensity:1,normalScale:new ot(.8,.8)}):n.wet?o=new wn({...s,roughness:.5,metalness:0,envMapIntensity:1.1}):i==="metal"?o=new wn({...s,roughness:1,metalness:1,envMapIntensity:.6}):o=new wn({...s,roughness:1,metalness:0,envMapIntensity:.5,normalScale:new ot(.7,.7)}),n.tint&&o.color.set(n.tint),n.wet&&(o.userData.wet=1,!_e&&Tl.tex&&(o.envMap=Tl.tex,o.envMapIntensity=1.4)),ds.set(a,o),o}const ws={stone:(i,t)=>es("wall",i,t,{tint:12103072}),metal:(i,t)=>es("metal",i,t),floor:(i,t)=>es("floor",i,t,{wet:!0,tint:7235166}),ceiling:(i,t)=>es("metal",i,t,{tint:6969424})},Tl={};function $2(i,t){const e=new yl(i),n=new pr;n.add(new Tt(new Ze(30,10,30),new Yt({color:1708814,side:Ve})));const a=(s,o,l,c,h,d)=>{const u=new Tt(new vr(d,12,8),new Yt({color:new It(s).multiplyScalar(o)}));u.position.set(l,c,h),n.add(u)};a(16747056,6,-8,2,6,.6),a(16747056,6,9,2,-5,.6),a(16747056,6,3,2.5,12,.5),a(16734736,3,-12,-1,-10,2.5),a(16769712,2,0,3,-13,1.2);const r=e.fromScene(n,.02).texture;e.dispose(),_e?(t.environment=r,t.environmentIntensity=1.6):ds.forEach(s=>{s.userData.wet&&(s.envMap=r,s.envMapIntensity=1.4,s.needsUpdate=!0)}),Tl.tex=r,t.fog=new As(1709070,_e?.016:.014)}function Yn(i){i.traverse(t=>{if(!t.material)return;t.layers.set(El),(Array.isArray(t.material)?t.material:[t.material]).forEach(n=>{n.toneMapped=!1,n.fog=!1})})}function Z2(i){return i.toneMapped=!1,i.fog=!1,i}const J2={uniforms:{tDiffuse:{value:null},tPaint:{value:null},toneMappingExposure:{value:1},uVig:{value:.22}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",fragmentShader:`varying vec2 vUv; uniform sampler2D tDiffuse, tPaint; uniform float uVig;
    #include <tonemapping_pars_fragment>
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      vec2 d = vUv - .5; c *= 1. - uVig * dot(d, d) * 2.;            // gentle vignette (graded image only)
      vec3 g = AgXToneMapping(c);
      vec4 p = texture2D(tPaint, vUv);                                // paintings: linear, untouched
      gl_FragColor = sRGBTransferOETF(vec4(mix(g, p.rgb, p.a), 1.)); }`};function K2(i,t,e){e.layers.enable(El);const n=()=>[innerWidth,innerHeight],a={level:"direct",render(){i.setRenderTarget(null),i.clear(),i.render(t,e)},setSize(){i.setSize(innerWidth,innerHeight,!1)}};if(!_e)return a;const r=i.getPixelRatio();let[s,o]=n();const l=new qe(s*r,o*r,{type:ri,samples:2}),c=new k2(i,l);c.addPass(new F2(t,e));const h=new xi(t,e,s*r/2,o*r/2),d=h.setSize.bind(h);h.setSize=(E,A)=>d(Math.round(E/2),Math.round(A/2)),h.output=xi.OUTPUT.Default,h.blendIntensity=.75,h.updateGtaoMaterial({radius:.45,distanceExponent:1.4,thickness:1.2,scale:1,samples:8}),h.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:4,rings:2,samples:8}),c.addPass(h);const u=new Da(new ot(s/2,o/2),.32,.5,1),p=u.setSize.bind(u);u.setSize=(E,A)=>p(Math.round(E/2),Math.round(A/2)),c.addPass(u);const g=new jd(J2);g.material.toneMapped=!1,c.addPass(g);const x=new qe(s*r,o*r,{type:ri,samples:2});g.uniforms.tPaint.value=x.texture;const m=new Yt({colorWrite:!1,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2,side:Be}),f=new It;function S(){const E=t.background,A=t.fog,D=i.autoClear,_=t.overrideMaterial,w=e.layers.mask,T=i.shadowMap.autoUpdate;i.getClearColor(f);const U=i.getClearAlpha();t.background=null,t.fog=null,i.shadowMap.autoUpdate=!1,i.setRenderTarget(x),i.setClearColor(0,0),i.clear(),i.autoClear=!1,e.layers.set(0),t.overrideMaterial=m,i.render(t,e),e.layers.set(El),t.overrideMaterial=null,i.render(t,e),e.layers.mask=w,t.background=E,t.fog=A,i.autoClear=D,t.overrideMaterial=_,i.shadowMap.autoUpdate=T,i.setClearColor(f,U),i.setRenderTarget(null)}const y={level:"high",composer:c,gtao:h,bloom:u,render(){S(),c.render()},setSize(){[s,o]=n(),i.setSize(s,o,!1),c.setSize(s,o),x.setSize(s*r,o*r)}},v={level:"high",render:()=>P.render(),setSize:()=>P.setSize(),stepDown(){return P===y?(l.dispose(),x.dispose(),c.dispose&&c.dispose(),P=a,v.level="direct",a.setSize(),!0):!1}};let P=y;return v}function sc(i=8,t=1){const a=document.createElement("canvas");a.width=512,a.height=128;const r=a.getContext("2d"),s=r.createImageData(512,128),o=[255,214,90],l=[255,110,20],c=[70,12,4];for(let d=0;d<128;d++)for(let u=0;u<512;u++){const p=u/512*Math.PI*2,g=d/128*Math.PI*2;let x=Math.sin(p*2+Math.sin(g)*1.8)+Math.sin(p*5-g+Math.cos(p*3)*1.2)*.5+Math.sin(g*2+p)*.4+Math.sin(p*11+Math.sin(p*4+g*2)*2)*.18;x=(x+1.9)/3.8;const m=Math.max(0,Math.min(1,x)),f=m<.5?c:l,S=m<.5?l:o,y=m<.5?m/.5:(m-.5)/.5,v=y*y*(3-2*y),P=(d*512+u)*4;for(let E=0;E<3;E++)s.data[P+E]=f[E]+(S[E]-f[E])*v;s.data[P+3]=255}r.putImageData(s,0,0),r.filter="blur(3px)",r.drawImage(a,0,0),r.filter="none";const h=new ti(a);return h.colorSpace=ve,h.wrapS=h.wrapT=Pi,h.repeat.set(i,t),h.anisotropy=8,h}let is=null;function Q2(){if(is)return is;const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,.45)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),is=new ti(i),is}function oc(i,t){return new Ld({map:Q2(),color:i,transparent:!0,opacity:t,blending:yi,depthWrite:!1,fog:!1})}let Ro=null;function tv(i,t){if(!Ro){const e=document.createElement("canvas");e.width=4,e.height=64;const n=e.getContext("2d"),a=n.createLinearGradient(0,64,0,0);a.addColorStop(0,"rgba(255,255,255,1)"),a.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=a,n.fillRect(0,0,4,64),Ro=new ti(e)}return new Yt({map:Ro,color:i,transparent:!0,opacity:t,blending:yi,depthWrite:!1,side:Be,fog:!1})}function ev(i,t){let e=0,n=0,a=0,r=0;return function(o,l){if(!n){n=o;return}const c=o-n;if(n=o,!l||c>500){e=0;return}if(!((a+=c)<3e3)&&(e=c>20?e+c:Math.max(0,e-c*2),e>2500&&r<i.length)){e=0,a=0;const h=i[r++];h(),t&&t(r,i.length)}}}const xr=[],Al="/play/",tn=document.getElementById("c"),ye=q2(tn),qd=innerWidth,Yd=innerHeight,qt=new pr;qt.background=new It(789e3);$2(ye,qt);const rt=new Oe(70,qd/Yd,.05,100);rt.position.set(Ti.layout.start.x,1.6,Ti.layout.start.z);rt.lookAt(Ti.layout.start.x+Math.sin(Ti.layout.start.yaw)*5,1.6,Ti.layout.start.z+Math.cos(Ti.layout.start.yaw)*5);qt.add(rt);const Qe=1.6,$d=[],Ai=(i,t)=>{const e=Math.abs(i-Di.x),n=Math.abs(t-Di.z);if(e<1.8&&n<1.8)return .5;if(e<2.4&&n<2.4)return .25;for(const a of $d)if(Math.abs(i-a.x)<1.4&&Math.abs(t-a.z)<1.4)return .25;return 0};qt.add(new kd(13677202,4601386,.85));Ti.paintings.forEach(i=>{i.slug||(i.slug=i.id)});const nn=Ti.layout,Je=nn.hall.height,vn=nn.hall.doorHeight,Ce=.3,fe={stone:(i,t)=>ws.stone(i,t),metal:(i,t)=>ws.metal(i,t),wood:(i,t)=>new wn({map:T2(Math.max(1,i),Math.max(1,t)),roughness:.85,metalness:0})};function Jt(i,t,e,n,a,r,s,o=qt){const l=new Tt(new Ze(i,t,e),n);return l.position.set(a,r,s),l.castShadow=l.receiveShadow=!0,o.add(l),l}const Zd=sc(10,.35),iv=new Yt({map:Zd,color:new It(2.6,2.2,2)}),lc=[],cc=[],hc=[],dc=[],wr=[],Ge=nn.rooms,Is=nn.hallways;function Jd(i,t){cc.push([i,t]),Jt(.7,Je,.7,fe.stone(.7,Je/2),i,Je/2,t),Jt(.9,.3,.9,fe.metal(1,.3),i,.15,t),Jt(.9,.3,.9,fe.metal(1,.3),i,Je-.15,t)}function nv(i,t){const e=t==="N"||t==="S",n=t==="N"?i.maxZ:t==="S"?i.minZ:t==="W"?i.minX:i.maxX,a=e?i.minX:i.minZ,r=e?i.maxX:i.maxZ,s=t==="N"?[0,-1]:t==="S"?[0,1]:t==="W"?[1,0]:[-1,0],o=i.openings.filter(u=>u.wall===t).sort((u,p)=>u.from-p.from),l=[...o.map(u=>({...u,door:1})),...(i.windows||[]).filter(u=>u.wall===t)].sort((u,p)=>u.from-p.from),c=[];let h=a;l.forEach(u=>{c.push([h,u.from,0,Je]),u.door?c.push([u.from,u.to,vn,Je]):(c.push([u.from,u.to,0,u.sill]),c.push([u.from,u.to,u.head,Je]),dc.push({side:t,c:n,inward:s,from:u.from,to:u.to,sill:u.sill,head:u.head})),h=u.to}),c.push([h,r,0,Je]);const d=Ce/2;c.forEach(([u,p,g,x])=>{const m=p-u;if(m<.01)return;const f=(u+p)/2,S=x-g,y=g>0?fe.metal(m/2,S/2):fe.stone(m/2,S/2);if(e?Jt(m,S,Ce,y,f,g+S/2,n-s[1]*d):Jt(Ce,S,m,y,n-s[0]*d,g+S/2,f),g===0){const v=new Tt(new he(m,.2),iv);v.rotation.x=-Math.PI/2,e?v.position.set(f,.015,n+s[1]*.12):(v.rotation.z=Math.PI/2,v.position.set(n+s[0]*.12,.015,f)),qt.add(v);const P=new Tt(new he(m,.45),tv(16738842,.22));e?P.position.set(f,.24,n+s[1]*.03):(P.rotation.y=Math.PI/2,P.position.set(n+s[0]*.03,.24,f)),P.visible=Vn,P.renderOrder=3,qt.add(P),xr.push(P)}}),o.forEach(u=>{for(const p of[u.from-.35,u.to+.35]){const[g,x]=e?[p,n+s[1]*.35]:[n+s[0]*.35,p];Jd(g,x),hc.push([g+s[0]*.45,2.9,x+s[1]*.45])}})}Ge.forEach(i=>{const t=i.maxX-i.minX,e=i.maxZ-i.minZ,n=(i.minX+i.maxX)/2,a=(i.minZ+i.maxZ)/2,r=new Tt(new he(t,e),ws.floor(t/2.5,e/2.5));r.receiveShadow=!0,r.rotation.x=-Math.PI/2,r.position.set(n,0,a),qt.add(r);const s=new Tt(new he(t,e),ws.ceiling(t/2,e/2));s.rotation.x=Math.PI/2,s.position.set(n,Je,a),qt.add(s),lc.push(s),["N","S","W","E"].forEach(c=>nv(i,c));for(const[c,h]of[[i.minX+.35,i.minZ+.35],[i.maxX-.35,i.minZ+.35],[i.minX+.35,i.maxZ-.35],[i.maxX-.35,i.maxZ-.35]])Jd(c,h);const o=fe.wood(Math.max(t,e)/2,1),l=t>e;for(let c=3;c<(l?t:e)-1;c+=4)l?Jt(.4,.45,e,o,i.minX+c,Je-.3,a):Jt(t,.45,.4,o,n,Je-.3,i.minZ+c);hc.push([n,Je-.9,a])});Is.forEach(i=>{const t=i.maxX-i.minX,e=i.maxZ-i.minZ,n=(i.minX+i.maxX)/2,a=(i.minZ+i.maxZ)/2,r=new Tt(new he(t,e),fe.metal(t,e));r.rotation.x=-Math.PI/2,r.position.set(n,.005,a),qt.add(r);const s=Jt(t,.2,e+2*Ce,fe.metal(t,e),n,vn+.1,a);lc.push(s),Jt(t,vn,Ce,fe.stone(t/2,1.4),n,vn/2,i.minZ-Ce/2),Jt(t,vn,Ce,fe.stone(t/2,1.4),n,vn/2,i.maxZ+Ce/2)});const kn=nn.courtyard,ge={minX:Ge.reduce((i,t)=>Math.min(i,t.maxX),1e9)<0?-15.225:kn.minX,maxX:0,minZ:kn.minZ,maxZ:kn.maxZ};ge.minX=Math.min(...Ge.filter(i=>i.maxX<kn.minX+.01).map(i=>i.maxX),kn.minX);ge.maxX=Math.max(...Ge.filter(i=>i.minX>kn.maxX-.01).map(i=>i.minX),kn.maxX);const uc=sc();uc.repeat.set((ge.maxX-ge.minX)/1.5,(ge.maxZ-ge.minZ)/1.5);const av=new Yt({map:uc,color:new It(2.4,2,1.8)}),fc=sc();fc.repeat.set((ge.maxX-ge.minX)/4,(ge.maxZ-ge.minZ)/4);const rv=new Yt({map:fc,transparent:!0,opacity:.45,blending:yi,depthWrite:!1});{const i=ge.maxX-ge.minX,t=ge.maxZ-ge.minZ,e=(ge.minX+ge.maxX)/2,n=(ge.minZ+ge.maxZ)/2,a=new Tt(new he(i,t),av);a.rotation.x=-Math.PI/2,a.position.set(e,-.25,n),qt.add(a);const r=new Tt(new he(i,t),rv);r.rotation.x=-Math.PI/2,r.position.set(e,-.23,n),qt.add(r),Jt(i,.3,.12,fe.metal(i/2,.2),e,-.1,ge.minZ+.06),Jt(i,.3,.12,fe.metal(i/2,.2),e,-.1,ge.maxZ-.06),(_e?[-.33,0,.33]:[0]).forEach(o=>{const l=new Xn(16734736,_e?22:12,_e?10:4.5,2);l.position.set(e+o*i,.9,n),_e&&(l.castShadow=!0,l.shadow.mapSize.set(512,512),l.shadow.bias=-.004,l.shadow.radius=3,l.shadow.camera.far=10,l.shadow.autoUpdate=!1,l.shadow.needsUpdate=!0),qt.add(l),wr.push(l)});const s=new Tt(new he(i,t),new Yt({color:1707270}));s.rotation.x=Math.PI/2,s.position.set(e,Je+1.5,n),qt.add(s)}dc.forEach(i=>{const t=i.side==="N"||i.side==="S",e=(i.from+i.to)/2,n=i.to-i.from,a=(r,s,o)=>t?[r,s,i.c-i.inward[1]*o]:[i.c-i.inward[0]*o,s,r];t?Jt(n+.2,.08,Ce+.16,fe.metal(1,.2),...a(e,i.sill,Ce/2)):Jt(Ce+.16,.08,n+.2,fe.metal(1,.2),...a(e,i.sill,Ce/2));for(const r of[i.from,i.to])Jt(t?.08:Ce,i.head-i.sill,t?Ce:.08,fe.metal(.2,1),...a(r,(i.sill+i.head)/2,Ce/2));Jt(t?.05:Ce*.6,i.head-i.sill,t?Ce*.6:.05,fe.metal(.1,1),...a(e,(i.sill+i.head)/2,Ce/2))});const te=(()=>{const i=nn.gate,t=Ge.find(r=>r.id===i.room),e=(i.from+i.to)/2,n=t.maxZ,a=[0,-1];return{pos:new R(e,0,n),n:new R(a[0],0,a[1]),w:1.5,h:2.6}})(),pc=new ue({transparent:!0,side:Be,uniforms:{uTime:{value:0},uA:{value:new It(.18,.05,.45)},uB:{value:new It(.35,.55,1)},uC:{value:new It(.6,.4,1)},uGlow:{value:_e?1.25:1.4},uSat:{value:_e?2.2:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`varying vec2 vUv; uniform float uTime, uGlow, uSat; uniform vec3 uA, uB, uC;
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
      gl_FragColor = vec4(col * uGlow, .92 * edge + .08); }`});{const i=new Se;i.position.copy(te.pos).addScaledVector(te.n,.04),i.rotation.y=Math.atan2(te.n.x,te.n.z),qt.add(i);const t=new Tt(new he(te.w,te.h),pc);t.position.y=te.h/2,i.add(t),te.mesh=t;const e=fe.metal(.3,1.4);Jt(.3,te.h+.3,.3,e,-te.w/2-.15,(te.h+.3)/2,.1,i),Jt(.3,te.h+.3,.3,e,te.w/2+.15,(te.h+.3)/2,.1,i),Jt(te.w+.9,.35,.36,e,0,te.h+.3,.1,i),Jt(te.w+.9,.12,.8,fe.metal(1,.3),0,.06,.3,i);const n=new Xn(8019199,14,7,2);n.position.set(0,1.4,.8),i.add(n),te.light=n;{const r=new $l(oc(8019199,.5));r.scale.set(3.6,3.8,1),r.position.set(0,1.4,.35),r.visible=Vn,i.add(r),xr.push(r)}const a=new Tt(new he(1.4,.2),new Yt({map:Wd("SLIPGATE")}));a.position.set(0,te.h+.3,.29),i.add(a),Yn(a)}const ae=(()=>{const i=nn.checkout,t=Ge.find(r=>r.id===i.room),e=(i.from+i.to)/2,n=t.maxZ,a=[0,-1];return{pos:new R(e,0,n),n:new R(a[0],0,a[1]),w:1.5,h:2.6}})(),_r=pc.clone();_r.uniforms.uA.value=new It(.05,.22,.06);_r.uniforms.uB.value=new It(1,.78,.2);_r.uniforms.uC.value=new It(.6,1,.4);{const i=new Se;i.position.copy(ae.pos).addScaledVector(ae.n,.04),i.rotation.y=Math.atan2(ae.n.x,ae.n.z),qt.add(i);const t=new Tt(new he(ae.w,ae.h),_r);t.position.y=ae.h/2,i.add(t);const e=new wn({color:9071138,metalness:.9,roughness:.35});Jt(.3,ae.h+.3,.3,e,-ae.w/2-.15,(ae.h+.3)/2,.1,i),Jt(.3,ae.h+.3,.3,e,ae.w/2+.15,(ae.h+.3)/2,.1,i),Jt(ae.w+.9,.35,.36,e,0,ae.h+.3,.1,i),Jt(ae.w+.9,.12,.8,fe.metal(1,.3),0,.06,.3,i);const n=new Xn(14204992,14,7,2);n.position.set(0,1.4,.8),i.add(n),ae.light=n;{const l=new $l(oc(14204992,.45));l.scale.set(3.6,3.8,1),l.position.set(0,1.4,.35),l.visible=Vn,i.add(l),xr.push(l)}const a=document.createElement("canvas");a.width=512,a.height=96;const r=a.getContext("2d");r.fillStyle="#1a1206",r.fillRect(0,0,512,96),r.strokeStyle="#e8c050",r.lineWidth=6,r.strokeRect(3,3,506,90),r.fillStyle="#ffd860",r.font="900 64px Impact, Arial Black, sans-serif",r.textAlign="center",r.textBaseline="middle",r.fillText("CHECKOUT",256,50);const s=new ti(a);s.colorSpace=ve,s.anisotropy=8;const o=new Tt(new he(1.8,.34),new Yt({map:s}));o.position.set(0,ae.h+.3,.29),i.add(o),Yn(o)}let jh=!1;function mc(){try{sessionStorage.setItem("tjmPlayState",JSON.stringify({pos:rt.position.toArray(),quat:rt.quaternion.toArray(),weapon:Ia,cart:Fn.map(i=>i.slug),swarmCount:Wn,at:Date.now()}))}catch{}}function sv(){if(jh)return;jh=!0;const i=ae.pos.clone().addScaledVector(ae.n,1.6);i.y=Qe,rt.position.copy(i),rt.lookAt(ae.pos.x,Qe,ae.pos.z),mc();try{const e=JSON.parse(localStorage.getItem("va-cart-v1")||"[]"),n=new Set((Array.isArray(e)?e:[]).map(r=>r.id)),a=Fn.filter(r=>r.status==="available"&&!n.has(r.slug)).map(r=>({id:r.slug,quantity:1}));localStorage.setItem("va-cart-v1",JSON.stringify([...Array.isArray(e)?e:[],...a].slice(0,12)))}catch{}Kd(),He("TO THE CHECKOUT…",3),Ie.isLocked&&Ie.unlock();const t=/(^|\.)tjm\.art$/.test(location.hostname);setTimeout(()=>location.assign((t?"/cart/":"https://tjm.art/cart/")+"?from=play"),600)}let Po=null;function Kd(){try{Po=Po||new(window.AudioContext||window.webkitAudioContext);const i=Po,t=i.currentTime,e=i.createOscillator(),n=i.createGain();e.type="sawtooth",e.frequency.setValueAtTime(880,t),e.frequency.exponentialRampToValueAtTime(55,t+.9),n.gain.setValueAtTime(.25,t),n.gain.exponentialRampToValueAtTime(.001,t+1),e.connect(n).connect(i.destination),e.start(t),e.stop(t+1);const a=i.createBuffer(1,i.sampleRate,i.sampleRate),r=a.getChannelData(0);for(let l=0;l<r.length;l++)r[l]=(Math.random()*2-1)*(1-l/r.length);const s=i.createBufferSource(),o=i.createGain();s.buffer=a,o.gain.value=.18,s.connect(o).connect(i.destination),s.start(t)}catch{}}let di=null;function ov(){const i=te.pos.clone().addScaledVector(te.n,1.6);i.y=Qe;const t=rt.clone();t.position.copy(i),t.lookAt(i.x+te.n.x,Qe,i.z+te.n.z),di={v:0,back:i,backQ:t.quaternion.clone(),t:0},Kd(),Ie.enabled=!1,ai.set(0,0,0),rt.position.set((ge.minX+ge.maxX)/2,9,(ge.minZ+ge.maxZ)/2),rt.quaternion.setFromEuler(new ze(-1.2,0,0,"YXZ")),He("YOU ARE FALLING",2.5)}function lv(i){if(di.t+=i,di.v-=9.8*i,rt.position.y+=di.v*i,rt.position.y<.1){const t=di;di=null,yc=!1,Ei=!0,document.body.classList.add("chaos"),He("THE LAVA IS NOT LAVA",3),qi.start({direct:!0,worldLen:11,savedPos:t.back,savedQuat:t.backQ}),Qd++}}let Qd=0;function tu(i,t){const e=document.createElement("canvas"),n=e.getContext("2d"),a=96;n.font="600 52px Georgia, serif";const r=Math.ceil(n.measureText(i).width+90);e.width=r,e.height=a,n.fillStyle="#2a2014",n.fillRect(0,0,r,a),n.strokeStyle="#c9a24a",n.lineWidth=5,n.strokeRect(4,4,r-8,a-8),n.font="600 52px Georgia, serif",n.fillStyle="#f0d070",n.textAlign="center",n.textBaseline="middle",n.fillText(i,r/2,a/2+3);const s=new ti(e);s.colorSpace=ve,s.anisotropy=4;const o=new Tt(new he(t*r/a,t),new Yt({map:s}));return Yn(o),o}nn.signs.forEach(i=>{const t=tu(i.title,.3);t.position.set(i.x,i.y,i.z),t.rotation.y=i.yaw,qt.add(t)});(nn.groupSigns||[]).forEach(i=>{const t=tu(i.title,.26);t.position.set(i.x,i.y,i.z),t.rotation.y=i.yaw,qt.add(t)});const eu=new Yt({color:new It(2.2,1.8,1.2)});{const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,2,64,64,64);e.addColorStop(0,"rgba(255,214,150,.9)"),e.addColorStop(.5,"rgba(255,190,120,.35)"),e.addColorStop(1,"rgba(255,170,90,0)"),t.fillStyle=e,t.fillRect(0,0,128,128);const n=new ti(i);n.colorSpace=ve;const a=new Yt({map:n,transparent:!0,blending:yi,depthWrite:!1,opacity:_e?.45:.85,polygonOffset:!0,polygonOffsetFactor:-2});Is.forEach(r=>{const s=(r.minX+r.maxX)/2,o=(r.minZ+r.maxZ)/2,l=r.maxX-r.minX>r.maxZ-r.minZ?"x":"z",c=new Tt(new he(l==="x"?7:5,l==="x"?5:7),a);c.rotation.x=-Math.PI/2,c.position.set(s,.02,o),c.renderOrder=2,qt.add(c);const h=new Tt(new Ze(l==="x"?.8:.12,.08,l==="x"?.12:.8),eu);if(h.position.set(s,vn-.1,o),qt.add(h),!qn){const d=new Xn(16767136,9,7,2);d.position.set(s,vn-.3,o),qt.add(d)}})}const Di={x:0,z:(Ge[0].minZ+Ge[0].maxZ)/2};Jt(4.8,.25,4.8,fe.stone(2.4,.2),Di.x,.125,Di.z);Jt(3.6,.25,3.6,fe.metal(1.8,.2),Di.x,.375,Di.z);const zs=[{room:"central",src:"holo/holo.mp4",still:"holo/still.jpg",asp:600/408,y:.5,x:Di.x,z:Di.z,title:"Barre-chord loop (2026-08-21)"},{room:"travels",src:"holo/holo_bass.mp4",still:"holo/still_bass.jpg",asp:454/408,title:"Bass and guitar in counterpoint, G (2026-03-10)"},{room:"people",src:"holo/holo_irish.mp4",still:"holo/still_irish.jpg",asp:454/408,title:"Improv after two days of drilling Irish tunes (2026-03-20)"},{room:"archive",src:"holo/holo_psy.mp4",still:"holo/still_psy.jpg",asp:454/408,title:"Psychedelic (2026-09-16)"}];zs.forEach(i=>{if(i.room==="central")return;const t=Ge.find(e=>e.id===i.room);i.x=(t.minX+t.maxX)/2,i.z=(t.minZ+t.maxZ)/2,i.y=.25,$d.push({x:i.x,z:i.z}),Jt(2.8,.25,2.8,fe.metal(1.4,.2),i.x,.125,i.z)});zs.forEach(i=>{const t=Ge.find(e=>e.id===i.room);i.b={minX:t.minX,maxX:t.maxX,minZ:t.minZ,maxZ:t.maxZ}});const xn=P2(qt,rt,zs,{low:qn,base:"https://img.tjm.art/play/"});{const i=document.createElement("span");i.className="cell",i.id="holomute",i.setAttribute("role","button"),i.tabIndex=0,i.title="Hologram sound (M)";const t=document.createElement("button");t.id="soundbtn",t.type="button";const e=o=>{i.textContent=o?"♪ off":"♪ on",t.textContent=o?"🔇":"🔊",t.setAttribute("aria-label",o?"Unmute music":"Mute music"),t.setAttribute("aria-pressed",String(o)),t.title=(o?"Unmute":"Mute")+" music (M)"};let n=!1;try{n=localStorage.getItem("tjmPlayMuted")==="1"}catch{}xn.setMuted(n,!1),e(n);const a=o=>{o&&(o.stopPropagation(),o.preventDefault());const l=xn.setMuted(!xn.muted,!0);e(l);try{localStorage.setItem("tjmPlayMuted",l?"1":"0")}catch{}},r=o=>o.stopPropagation();[i,t].forEach(o=>{o.addEventListener("click",a),o.addEventListener("touchstart",a,{passive:!1}),["mousedown","pointerdown","mouseup","pointerup","touchend"].forEach(l=>o.addEventListener(l,r))}),document.getElementById("hud").appendChild(i),document.body.appendChild(t),window.__holoToggle=a;const s=()=>xn.begin();["pointerdown","keydown","touchstart"].forEach(o=>addEventListener(o,s,{passive:!0}))}let Ln={n:0,t:0,done:!qn};const Xh=hc.map(([i,t,e])=>{const n=new Tt(new Ze(.16,.22,.16),new Yt({color:new It(6,2.6,.7)}));n.position.set(i,t,e),qt.add(n),Jt(.1,.35,.1,fe.wood(1,1),i,t-.28,e);{const a=new $l(oc(16751168,.55));a.scale.set(1.1,1.3,1),a.position.set(i,t+.05,e),a.visible=Vn,qt.add(a),xr.push(a)}return{flame:n,ph:Math.random()*10,pos:new R(i,t,e)}}),iu=30,_s=Array.from({length:_e?4:Vn?3:2},(i,t)=>{const e=new Xn(16754790,iu,11,2);if(_e&&t<2||Vn){const n=_e?512:256;e.castShadow=!0,e.shadow.mapSize.set(n,n),e.shadow.bias=-.004,e.shadow.normalBias=.02,e.shadow.radius=_e?4:1,e.shadow.camera.near=.1,e.shadow.camera.far=11,e.shadow.autoUpdate=!1,e.shadow.needsUpdate=!0}return qt.add(e),e}),ns=.45;function us(i,t){for(const e of Ge)if(i>e.minX+ns&&i<e.maxX-ns&&t>e.minZ+ns&&t<e.maxZ-ns)return!0;for(const e of Is)if(i>=e.minX-.5&&i<=e.maxX+.5&&t>e.minZ+.3&&t<e.maxZ-.3)return!0;return!1}function Ns(i,t){let e=null,n=1e9;return Ge.forEach(a=>{const r=Math.max(a.minX-i,0,i-a.maxX),s=Math.max(a.minZ-t,0,t-a.maxZ),o=r+s;o<n&&(n=o,e=a)}),e}const nu=new Ps;nu.setCrossOrigin("anonymous");const au=6180928,cv=(()=>{const i=document.createElement("canvas");i.width=i.height=256;const t=i.getContext("2d"),e=t.createRadialGradient(128,40,4,128,120,135);e.addColorStop(0,"rgba(255,236,200,1)"),e.addColorStop(.45,"rgba(255,220,170,.55)"),e.addColorStop(1,"rgba(255,200,140,0)"),t.fillStyle=e,t.fillRect(0,0,256,256);const n=new ti(i);return n.colorSpace=ve,n})(),hv=new wn({color:1840914,roughness:.55});new wn({color:9071162,metalness:.9,roughness:.35});const dv=new Yt({map:cv,transparent:!0,opacity:_e?.32:.34,blending:yi,depthWrite:!1}),Nn=new he(1,1),bi=[],qh=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Yh=[],uv=ye.capabilities.getMaxAnisotropy(),ks=i=>(i.colorSpace=ve,i.generateMipmaps=!0,i.minFilter=$i,i.magFilter=$e,i.anisotropy=uv,i.needsUpdate=!0,i);function $h(i,t,e){const n=[];let a="";for(const r of t.split(" ")){const s=a?a+" "+r:r;i.measureText(s).width>e&&a?(n.push(a),a=r):a=s}return a&&n.push(a),n}function Cl(i,t,e){if(i.measureText(t).width<=e)return t;for(;t.length>1&&i.measureText(t+"…").width>e;)t=t.slice(0,-1);return t+"…"}function fv(i,t,e){const n=document.createElement("canvas");n.width=512,n.height=160;const a=n.getContext("2d");a.fillStyle="#e9e1cf",a.fillRect(0,0,512,160),a.strokeStyle="#8a7a5c",a.lineWidth=4,a.strokeRect(2,2,508,156),a.fillStyle="#1d1712",a.font="bold 44px Georgia, serif",a.textBaseline="middle",a.fillText(Cl(a,i,476),18,54),a.fillStyle=e||"#4a3f32",a.font="32px Arial, sans-serif",a.fillText(Cl(a,t,476),18,112);const r=new Tt(Nn,new Yt({map:ks(new ti(n))}));return r.scale.set(.2,.0625,1),Yn(r),r}const gc=[];(Ti.plaques||[]).forEach(i=>{const t=new Se;t.position.set(i.x,i.y,i.z),t.rotation.y=Math.atan2(i.ix,i.iz),qt.add(t);const e=new Tt(Nn,new ec({color:2760728}));e.scale.set(i.fw+.06,i.fh+.06,1),e.position.z=.01,t.add(e);const n=new Tt(Nn,new Yt({color:1380363}));n.scale.set(i.fw,i.fh,1),n.position.z=.02,t.add(n),n.userData.q=i,e.userData.q=i,gc.push(n,e);{const a=document.createElement("canvas");a.width=620,a.height=820;const r=a.getContext("2d");r.fillStyle="#17110c",r.fillRect(0,0,620,820),r.fillStyle="#f2e4c4",r.font="bold 40px Georgia, serif";let s=60;for(const o of $h(r,i.title,560).slice(0,3))r.fillText(o,30,s),s+=46;r.font="24px Arial, sans-serif",r.fillStyle="#d2b47a",i.lines[0]&&(r.fillText(Cl(r,i.lines[0],560),30,s),s+=44),r.font="25px Georgia, serif",r.fillStyle="#e6d6b4";for(const o of i.lines.slice(1)){for(const l of $h(r,o,560)){if(s>740)break;r.fillText(l,30,s),s+=32}s+=14}r.font="22px Arial, sans-serif",r.fillStyle="#d2b47a",r.fillText("Press E to read more on tjm.art",30,790),n.material=new Yt({map:ks(new ti(a))}),Yn(n)}});Ti.paintings.forEach((i,t)=>{const e=new Se;e.position.set(i.x,i.y,i.z),e.rotation.y=Math.atan2(i.ix,i.iz),qt.add(e);const n=i.fw,a=i.fh,r=new Tt(Nn,hv);r.scale.set(Math.max(n,i.w+.03),Math.max(a,i.h+.03),1),r.position.z=.005,e.add(r);const s=new Tt(Nn,new Yt({color:au}));s.scale.set(i.w,i.h,1),s.position.z=.02,e.add(s),Yn(s),r.castShadow=!0;const o=new Tt(Nn,dv);o.scale.set(n*1.6+.9,a*1.5+.9,1),o.position.set(0,.2,.001),e.add(o);const l=new Tt(Nn,eu);l.scale.set(Math.min(.8,n*.6),.05,1),l.position.set(0,a/2+.12,.06),e.add(l),i.slug=i.slug||i.id;const c=i.caption&&i.caption.length<30?i.caption:"",h=i.status==="available"?`${i.price} · available`:i.status==="sold"?"SOLD":i.status==="inquiry"?"available by inquiry":"not for sale",d={data:i,group:e,mesh:s,frame:r,state:"wall",i:t,w:n,h:a,room:i.room},u=fv(i.title,(c?c+" · ":"")+h,i.status==="sold"?"#a3241a":i.status==="available"?"#8a4a10":null);u.position.set(0,-a/2-.075,.012),e.add(u),d.plaque=u,s.userData.p=d,r.userData.p=d,bi.push(d),vc(Al+i.img,3,p=>{ks(p),ye.initTexture(p),d.baseTex=p,d.hiTex||(s.material.map=p,s.material.color.set(16777215),s.material.needsUpdate=!0),d.base=1},()=>{d.baseFailed=1})});function vc(i,t,e,n){nu.load(i,e,void 0,()=>{t>0?setTimeout(()=>vc(i+(i.includes("?")?"&":"?")+"retry="+t,t-1,e,n),600*(4-t)):(window.__texFail=(window.__texFail||0)+1,n&&n())})}const Zh=qn?14:28,bs=[],va=[];let as=0;function Rl(){for(;as<2&&bs.length;){const i=bs.shift();if(i.dist-i.w/2>9||i.state!=="wall"){i.hiReq=0;continue}as++,vc(i.hiUrl,2,t=>{ks(t);const e=()=>{as--,i.state==="wall"&&!i.hiTex?(ye.initTexture(t),i.mesh.material.map=t,i.mesh.material.color.set(16777215),i.mesh.material.needsUpdate=!0,i.hiTex=t,i.hi=1,va.push(i),pv()):t.dispose(),Rl()};t.image&&t.image.decode?t.image.decode().catch(()=>{}).then(e):e()},()=>{as--,Rl()})}}function pv(){if(!(va.length<=Zh))for(va.sort((i,t)=>t.dist-i.dist);va.length>Zh&&va[0].dist>6;){const i=va.shift();i.mesh.material.map=i.baseTex||null,i.baseTex||i.mesh.material.color.set(au),i.mesh.material.needsUpdate=!0,i.hiTex.dispose(),i.hiTex=null,i.hi=0,i.hiReq=0}}const Jh=Array.from({length:_e?6:3},()=>{const i=new Fd(16773340,30,5,.42,.75,2);return qt.add(i),qt.add(i.target),i});let Kh=0;const mv=/(^|\.)tjm\.art$/.test(location.hostname);function br(i){const t=rt.position,e=Ns(t.x,t.z);bi.forEach(r=>{if(r.dist=r.group.position.distanceTo(t),r.dist-r.w/2<5.5&&!r.hiReq&&r.state==="wall"){const s=mv||/^https:\/\/img\.tjm\.art\//.test(r.data.hi||"")?r.data.hi:r.data.hiLocal&&Al==="/"?Al+"art-hi/"+r.data.slug+".webp":null;s&&(r.hiReq=1,r.hiUrl=s,bs.push(r))}r.state==="wall"&&(r.group.visible=r.dist<24||r.data.room===(e&&e.id)||!!(window.game&&window.game.freeze))}),bs.sort((r,s)=>r.dist-s.dist),Rl();const n=bi.filter(r=>r.state==="wall").sort((r,s)=>r.dist-s.dist).slice(0,Jh.length);Jh.forEach((r,s)=>{const o=n[s];if(!o){r.intensity=0;return}const l=new R(o.data.ix,0,o.data.iz);r.intensity=14,r.position.copy(o.group.position).addScaledVector(l,1.1),r.position.y+=1.4,r.target.position.copy(o.group.position)}),Xh.forEach(r=>r.d=r.pos.distanceTo(t));const a=[...Xh].sort((r,s)=>r.d-s.d).slice(0,_s.length);_s.forEach((r,s)=>{a[s]&&r.userData.t!==a[s]&&(r.position.copy(a[s].pos),r.userData.t=a[s],r.castShadow&&(r.shadow.needsUpdate=!0))})}br();const xc=()=>bi.filter(i=>i.state==="wall"&&i.group.visible).flatMap(i=>[i.mesh,i.frame]),Ie=new u2(rt,document.body),Ui=document.getElementById("start");Ui.addEventListener("click",()=>{matchMedia("(pointer:coarse)").matches?Ui.style.display="none":Ie.lock()});Ie.addEventListener("lock",()=>Ui.style.display="none");Ie.addEventListener("unlock",()=>{!window.__test&&!window.__reading&&(Ui.style.display="flex")});const ru=[{id:"landscapes",room:"travels",title:"Watercolor Landscapes",url:"https://tjm.art/products/watercolor-landscapes/",pages:75,aspect:612/787.92,dx:-5.5,dz:4.25},{id:"portraits",room:"people",title:"Watercolor Portraits",url:"https://tjm.art/products/watercolor-portraits/",pages:79,aspect:612/787.92,dx:-5,dz:5.25},{id:"reflections",room:"archive",title:"Reflections on Time",url:"https://tjm.art/products/reflections-on-time/",pages:35,aspect:432/648,dx:5.8,dz:5.25}];ru.forEach(i=>{const t=Ge.find(a=>a.id===i.room),e=(t.minX+t.maxX)/2,n=(t.minZ+t.maxZ)/2;i.x=e+i.dx,i.z=n+i.dz,i.yaw=Math.atan2(e-i.x,n-i.z),i.cover=`books/${i.id}/cover.webp`});const yr=D2({scene:qt,camera:rt,controls:Ie,defs:ru,base:"https://img.tjm.art/play/",low:qn,stone:fe.stone(.6,.6),pillars:cc,isMuted:()=>xn.muted,onReading:i=>document.body.classList.toggle("reading",i)}),gn={};addEventListener("keydown",i=>{gn[i.code]=!0,i.code==="Digit1"&&Gn(0),i.code==="Digit2"&&Gn(1),i.code==="KeyC"&&Os(),i.code==="KeyE"&&!window.__reading&&!yr.tryOpen()&&fu(),i.code==="KeyM"&&window.__holoToggle&&window.__holoToggle()});addEventListener("keyup",i=>gn[i.code]=!1);addEventListener("wheel",i=>Gn(Ia^1));addEventListener("mousedown",i=>{if(Ie.isLocked&&i.button===0&&!window.__reading){if(yr.tryOpen(new ot(0,0)))return;_c()}});const Ua={x:0,y:0};let ir=null,Pl=null;const wc=document.getElementById("tmove");wc.addEventListener("touchstart",i=>{Pl=i.changedTouches[0],i.preventDefault()},{passive:!1});wc.addEventListener("touchmove",i=>{const t=i.changedTouches[0];Ua.x=(t.clientX-Pl.clientX)/60,Ua.y=(t.clientY-Pl.clientY)/60,i.preventDefault()},{passive:!1});wc.addEventListener("touchend",()=>{Ua.x=Ua.y=0});tn.addEventListener("touchstart",i=>{ir=i.changedTouches[0]},{passive:!0});tn.addEventListener("touchmove",i=>{const t=i.changedTouches[0];if(!ir)return;const e=new ze(0,0,0,"YXZ").setFromQuaternion(rt.quaternion);e.y-=(t.clientX-ir.clientX)*.005,e.x=Math.max(-1.4,Math.min(1.4,e.x-(t.clientY-ir.clientY)*.005)),rt.quaternion.setFromEuler(e),ir=t},{passive:!0});document.getElementById("tfire").addEventListener("touchstart",i=>{i.preventDefault(),_c()});document.querySelectorAll("#hud .wpn").forEach(i=>{const t=e=>{e.preventDefault(),e.stopPropagation(),Gn(+i.dataset.w)};i.addEventListener("touchstart",t,{passive:!1}),i.addEventListener("mousedown",e=>e.stopPropagation()),i.addEventListener("click",t)});const su=document.getElementById("cartcell");["click","touchstart"].forEach(i=>su.addEventListener(i,t=>{t.preventDefault(),t.stopPropagation(),Os()},{passive:!1}));su.addEventListener("mousedown",i=>i.stopPropagation());const gv=matchMedia("(pointer:coarse)").matches,vv=matchMedia("(display-mode: fullscreen), (display-mode: standalone)").matches||navigator.standalone;function ou(){if(!gv||vv)return;const i=document.documentElement,t=i.requestFullscreen||i.webkitRequestFullscreen||i.webkitRequestFullScreen||i.msRequestFullscreen;if(t&&!(document.fullscreenElement||document.webkitFullscreenElement))try{const e=t.call(i,{navigationUI:"hide"});e&&e.then?e.then(Qh,()=>{}):Qh()}catch{}else if(!t){window.scrollTo(0,1);try{if(!localStorage.getItem("tjmIosHint")){localStorage.setItem("tjmIosHint","1");const e=document.getElementById("iosHint");e.hidden=!1,e.querySelector("button").onclick=()=>e.hidden=!0,setTimeout(()=>e.hidden=!0,9e3)}}catch{}}}function Qh(){try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch{}}addEventListener("touchend",ou,{once:!1,passive:!0});Ui.addEventListener("click",ou);let Ia=0,Ea=0;const ai=new R,Fs=new pr,Ll=new Oe(60,qd/Yd,.01,10);Fs.add(new kd(16769216,3153944,1.2));const lu=new s2(16756848,2);lu.position.set(1,2,1);Fs.add(lu);const Ta=i=>new ec({color:i,flatShading:!0}),mr=[new Se,new Se];{const i=mr[0];Jt(.12,.12,.42,fe.metal(1,1),0,0,0,i);const t=new Tt(new yn(.035,.045,.32,6),Ta(3815998));t.rotation.x=Math.PI/2,t.position.set(0,.02,-.33),i.add(t);const e=new Tt(new Xi(.085,0),Ta(16742912));e.position.set(0,.12,.02),i.add(e),Jt(.05,.14,.06,Ta(4861976),0,-.12,.12,i)}{const i=mr[1];Jt(.06,.06,.5,fe.wood(1,1),0,0,0,i),Jt(.16,.08,.08,Ta(11569722),0,0,-.27,i);for(const t of[-1,1]){const e=Jt(.025,.025,.16,Ta(6974064),t*.07,0,-.36,i);e.rotation.y=t*.35}Jt(.07,.05,.005,Ta(14729312),.05,.06,-.2,i)}mr.forEach(i=>{i.scale.setScalar(.7),i.rotation.y=.1,Fs.add(i)});ye.autoClear=!1;function cu(){mr.forEach((e,n)=>e.visible=n===Ia);const i=mr[Ia],t=Math.sin(performance.now()/160)*Math.min(1,ai.length())*.015;i.position.set(.24+t,-.24-Math.abs(t)+Ea*.03,-.62+Ea*.08),i.rotation.x=Ea*.25}function Gn(i){Ia=i,document.querySelectorAll("#hud .wpn").forEach(t=>t.classList.toggle("on",+t.dataset.w===i)),cu()}Gn(0);const hu=document.getElementById("msg");let du=0;function He(i,t=2.5){hu.textContent=i,du=t}const Ci=new Od;function xv(){return rt.updateMatrixWorld(),Ci.setFromCamera(new ot(0,0),rt),Ci.intersectObjects(xc(),!1)[0]}function _c(){Le&&Le.locked||Ei||(Ea=1,Ia===0?bv():Ev())}const fs=[],Vi=[],wv=new vr(.08,6,4),_v=new Yt({color:16742912});function bv(){const i=new R;rt.getWorldDirection(i);const t=new Tt(wv,_v);t.position.copy(rt.position).addScaledVector(i,.3).y-=.03,qt.add(t),fs.push({m:t,v:i.multiplyScalar(14),life:3})}let uu=0,Le=null;const nr=new Set,yv=(()=>{const i=new he(.9,1.125);return i.translate(0,-.11249999999999999,0),i})();function Mv(i){const t=i.object.userData.p,e=new Yt({map:M2(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),n=new Tt(yv,e),a=t.group.worldToLocal(i.point.clone());n.position.set(a.x,a.y,.024),n.scale.x=Math.random()<.5?-1:1,n.renderOrder=5,e.alphaTest=.02,t.group.add(n),Yn(n);const r=[],s=2+(Math.random()<.5?1:0);for(let l=0;l<s;l++){const c=Ds(Math.random()),h=["L","R","T"][l],d=t.w/2,u=t.h/2,p=h==="L"?new R(-d+.05,a.y,.05):h==="R"?new R(d-.05,a.y,.05):new R(a.x,u-.05,.05),g=h==="L"?new R(-d-.2,a.y,.35):h==="R"?new R(d+.2,a.y,.35):new R(a.x,u+.2,.35);Object.assign(c.userData,{a:l*2.1,base:a.clone(),hide:p,peek:g}),c.position.copy(p),c.visible=!1,t.group.add(c),r.push(c)}nr.add(t.data.slug),uu++,document.getElementById("hitn").textContent=nr.size%3;const o={d:n,elves:r,group:t.group,t:0,dur:8};nr.size>=3&&(nr.clear(),document.getElementById("hitn").textContent=0,o.swarm=!0,o.dur=1e9,r.forEach(l=>l.visible=!1)),Vi.push(o),He(o.swarm?"SPLAT! ...SOMETHING STIRS BEHIND THE WALLS":"SPLAT!")}const Fn=[],Dl=document.getElementById("cart"),Sv=document.getElementById("cartlist");let td=0;function Os(i=4e3){Dl.classList.add("open"),clearTimeout(td),td=setTimeout(()=>Dl.classList.remove("open"),i)}function bc(){document.getElementById("cartn").textContent=Fn.length,Sv.innerHTML=Fn.length?Fn.map(i=>`<li><a href="${i.url}" target="_blank" rel="noopener">${i.title}</a> ${i.price} · <i>In cart</i></li>`).join(""):"<li>empty</li>"}const ps=[];function Ev(){const i=xv();if(!i)return He("AIM AT A PAINTING");const t=i.object.userData.p;if(t.data.status==="sold")return He("SOLD: "+t.data.title);if(t.data.status!=="available")return He("BY INQUIRY ONLY: "+t.data.title);t.state="lifting",ps.push({p:t,t:0,from:t.group.position.clone(),rot:t.group.rotation.y}),Fn.push(t.data),bc(),Os(),He("ADDED TO CART: "+t.data.title)}const Tv=2.2;function fu(i){rt.updateMatrixWorld(),Ci.setFromCamera(i||new ot(0,0),rt),Ci.far=Tv;const t=Ci.intersectObjects([...xc(),...gc],!1)[0];if(Ci.far=1/0,!t)return i||He("GET CLOSER TO A PAINTING, THEN PRESS E"),!1;const e=t.object.userData.p?t.object.userData.p.data:t.object.userData.q;return Av(e),!0}function Av(i){mc(),He("OPENING "+i.title.toUpperCase()),Ie.isLocked&&Ie.unlock();const t=new URL(i.url);t.searchParams.set("from","play"),location.assign(t.href)}let ar=null;tn.addEventListener("touchstart",i=>{const t=i.changedTouches[0];ar={x:t.clientX,y:t.clientY,t:performance.now()}},{passive:!0});tn.addEventListener("touchend",i=>{const t=i.changedTouches[0];if(!ar||Le||Ei||di||window.__reading||Math.hypot(t.clientX-ar.x,t.clientY-ar.y)>12||performance.now()-ar.t>350)return;const e=tn.getBoundingClientRect(),n=new ot((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1);yr.tryOpen(n)||fu(new ot((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1))},{passive:!0});const wa=document.getElementById("goto");wa.innerHTML='<option value="">Go to a painting…</option>'+Ge.map(i=>`<optgroup label="${qh(i.title)}">`+bi.filter(t=>t.room===i.id).map(t=>`<option value="${t.i}">${qh(t.data.title)}</option>`).join("")+"</optgroup>").join("");["click","mousedown","touchstart"].forEach(i=>wa.addEventListener(i,t=>t.stopPropagation()));{const i=document.createElement("a");i.id="homebtn",i.href="https://tjm.art/",i.setAttribute("aria-label","Back to the tjm.art homepage"),i.title="Back to tjm.art",i.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z"/></svg><span>Home</span>',document.body.appendChild(i);const t=e=>{e.stopPropagation(),e.preventDefault(),window.__wentHome=!0;try{mc()}catch{}location.href="https://tjm.art/"};[i,document.getElementById("homelink")].forEach(e=>{e&&(e.addEventListener("click",t),["mousedown","pointerdown","mouseup","pointerup","touchstart","touchend"].forEach(n=>e.addEventListener(n,a=>a.stopPropagation(),{passive:!0})))})}function pu(i){const t=bi[i];if(!t||t.state!=="wall")return;const e=new R(t.data.ix,0,t.data.iz),n=Math.max(1.8,Math.min(4,t.h*1.3+.8));rt.position.copy(t.group.position).addScaledVector(e,n),rt.position.y=Qe+Ai(rt.position.x,rt.position.z),rt.lookAt(t.group.position.x,Math.min(t.group.position.y,Qe+.4),t.group.position.z);const a=new ze(0,0,0,"YXZ").setFromQuaternion(rt.quaternion);a.z=0,rt.quaternion.setFromEuler(a),ai.set(0,0,0),br(),He(t.data.title.toUpperCase())}wa.addEventListener("change",()=>{wa.value!==""&&(pu(+wa.value),wa.value="",matchMedia("(pointer:coarse)").matches?Ui.style.display="none":Ie.lock())});new R;const Gi=(i,t,e)=>new R(i,t,e),Dn=(i,t,e)=>i.clone().lerp(t,Math.min(1,Math.max(0,e))),mn=i=>(i=Math.min(1,Math.max(0,i)),i*i*(3-2*i));function Cv(){Vi.forEach(a=>a.inSwarm=!0),Ie.enabled=!1,ai.set(0,0,0);const i=[],t=Ns(rt.position.x,rt.position.z);bi.filter(a=>a.state==="wall"&&a.room===t.id).sort((a,r)=>a.dist-r.dist).slice(0,8).forEach(a=>{a.group.visible=!0;for(let r=0;r<4;r++){const s=a.w/2,o=a.h/2,l=r%3,c=(Math.random()-.5)*a.h*.8,h=(Math.random()-.5)*a.w*.8,d=a.group.localToWorld(l===2?Gi(h,o-.05,.05):Gi(l?s-.05:-s+.05,c,.05)),u=a.group.localToWorld(l===2?Gi(h,o+.3,.45):Gi(l?s+.28:-s-.28,c,.45)),p=Ds(Math.random());p.position.copy(d),qt.add(p);const g=Math.random()*Math.PI*2,x=.7+Math.random()*.7;i.push({s:p,home:d,peek:u,a:g,rad:x,dy:-.55-Math.random()*.5,ph:Math.random()*6,j:r})}});const n=t.id==="central"?Gi(Di.x,0,Di.z):Gi((t.minX+t.maxX)/2,0,(t.minZ+t.maxZ)/2);Le={t:0,elves:i,locked:!0,from:rt.position.clone(),dest:n,landed:!1,shake:0},He("THE ELVES HAVE OPINIONS",6)}function Rv(i){const t=Le;t.t+=i;const e=t.t,n=new ze(0,0,0,"YXZ").setFromQuaternion(rt.quaternion),a=Qe+Ai(t.from.x,t.from.z)+mn((e-2.2)/.8)*(1.5-Ai(t.from.x,t.from.z)),r=mn((e-3)/3),s=Dn(Gi(t.from.x,0,t.from.z),t.dest,r);let o=a,l=0;if(e>2.2&&e<6&&(o+=Math.sin(e*7)*.12,l=Math.sin(e*3.3)*.12),e>=6){const d=e-6,u=Qe+Ai(t.dest.x,t.dest.z);o=Math.max(u,3.2-4.9*d*d*1.4),o<=u&&!t.landed&&(t.landed=!0,t.shake=.45,He("*THUD*"))}t.landed&&(t.shake=Math.max(0,t.shake-i));const c=t.shake*.35;rt.position.set(s.x+(Math.random()-.5)*c,o-(t.landed&&t.shake>.3?.15:0)+(Math.random()-.5)*c,s.z+(Math.random()-.5)*c),e>2.2&&e<6&&(n.x+=(-.7-n.x)*Math.min(1,i*2)),e>6.4&&(n.x+=(0-n.x)*Math.min(1,i*4)),e>8.5&&(n.x=0),n.z=l,rt.quaternion.setFromEuler(n);const h=n.y;t.elves.forEach((d,u)=>{const p=Gi(Math.cos(d.a+h)*d.rad,d.dy+Math.sin(e*9+d.ph)*.08,Math.sin(d.a+h)*d.rad),g=rt.position.clone().add(p),x=Gi(rt.position.x+p.x*1.6,.35+Math.abs(Math.sin(e*8+d.ph))*.2,rt.position.z+p.z*1.6);let m;e<1?m=Dn(d.home,d.peek,mn(e-u%3*.1)):e<2.2?m=Dn(d.peek,x,mn((e-1)/1.2)):e<2.8?m=Dn(x,g,mn((e-2.2)/.6)):e<6?m=g:e<6.6?m=x:e<8.2?m=Dn(x,d.peek,mn((e-6.6)/1.6)):m=Dn(d.peek,d.home,mn((e-8.2)/.8)),e>=6&&e<6.6&&(d.s.userData.g=d.s.userData.g||m.clone()),d.s.position.copy(e>=6&&e<6.6?d.s.userData.g:m),e>=6.6&&e<8.2&&d.s.position.copy(Dn(d.s.userData.g||x,d.peek,mn((e-6.6)/1.6))),d.s.scale.setScalar(Math.max(.05,Math.min(1,e/.9,(9-e)/.8))),Us(d.s,e<1?"peek":e<2.2?"walk":e<6?"carry":e<6.6?"idle":"retreat",e,rt,i)}),e>7.2&&t.locked&&(t.locked=!1,Ie.enabled=!0,He("CONTROL RESTORED. BEHAVE.")),e>9&&(t.elves.forEach(d=>qt.remove(d.s)),Le=null,Wn++,rt.position.y=Qe+Ai(rt.position.x,rt.position.z),n.x=0,n.z=0,rt.quaternion.setFromEuler(n))}let Lo=performance.now(),Wn=0,yc=!1,Ei=!1,mu=null;const qi=_2({scene:qt,camera:rt,renderer:ye,makeElf:Ds,animateElf:Us,elfUniforms:Sa,say:He,canvas:tn,floorY:Ai});function Ul(){yc=!1,Ei=!0,Ie.enabled=!1,qi.start(),document.body.classList.add("chaos")}new URLSearchParams(location.search).get("chaos")==="1"&&setTimeout(()=>{window.__test=1,Ui.style.display="none",rt.position.set(0,Qe+Ai(0,0),0),Ul()},800);const gu=matchMedia("(orientation: portrait) and (pointer: coarse)");function vu(){if(requestAnimationFrame(vu),gu.matches){Lo=performance.now();return}const i=performance.now(),t=Math.min(.05,(i-Lo)/1e3);if(Lo=i,yc&&!Le&&Ul(),Ei){ye.toneMapping!==Ri&&(ye.toneMapping=Ri);const n=qi.update(t,i);n&&n.finished&&(Ei=!1,Ie.enabled=!0,document.body.classList.remove("chaos"),mu={before:n.savedPos.toArray(),after:rt.position.toArray()}),Sa.uTime.value=i/1e3,Oh(i),qi.state&&qi.state.inWorld&&!qi.state.back||ye.clear(),qi.render()||ye.render(qt,rt);return}if(di&&lv(t),!(window.game&&window.game.freeze||window.__reading)){if(!di)if(Le)Rv(t);else{ai.x-=ai.x*10*t,ai.z-=ai.z*10*t;const n=(gn.KeyW||gn.ArrowUp?1:0)-(gn.KeyS||gn.ArrowDown?1:0)-Ua.y,a=(gn.KeyD?1:0)-(gn.KeyA?1:0)+Ua.x;ai.z+=Math.max(-1,Math.min(1,n))*60*t,ai.x+=Math.max(-1,Math.min(1,a))*60*t;const r=rt.position.clone();Ie.moveRight(ai.x*t),Ie.moveForward(ai.z*t),us(rt.position.x,rt.position.z)||(us(rt.position.x,r.z)?rt.position.z=r.z:us(r.x,rt.position.z)?rt.position.x=r.x:(rt.position.x=r.x,rt.position.z=r.z));for(const[s,o]of cc){const l=rt.position.x-s,c=rt.position.z-o,h=Math.hypot(l,c);h<.75&&h>0&&(rt.position.x=s+l/h*.75,rt.position.z=o+c/h*.75)}{const s=rt.position.x-te.pos.x,o=rt.position.z-te.pos.z,l=Math.abs(s*te.n.z-o*te.n.x),c=s*te.n.x+o*te.n.z;l<.7&&c<.62&&!Ei&&ov()}{const s=rt.position.x-ae.pos.x,o=rt.position.z-ae.pos.z,l=Math.abs(s*ae.n.z-o*ae.n.x),c=s*ae.n.x+o*ae.n.z;l<.7&&c<.62&&!Ei&&sv()}di||(rt.position.y=Qe+Ai(rt.position.x,rt.position.z)+Math.abs(Math.sin(i/120))*Math.min(.06,ai.length()*.02))}}if(yr.update(t),xn.update(t,i,Ns(rt.position.x,rt.position.z).id),!Le&&!di)for(const n of zs){const a=rt.position.x-n.x,r=rt.position.z-n.z,s=Math.hypot(a,r);s<.6&&s>0&&(rt.position.x=n.x+a/s*.6,rt.position.z=n.z+r/s*.6)}Ln.done||(Ln.n++,Ln.t+=t,Ln.t>6&&(Ln.done=!0,Ln.n/Ln.t<24&&xn.setLowStill(!0)));for(let n=fs.length-1;n>=0;n--){const a=fs[n];a.v.y-=.8*t,a.life-=t;const r=a.v.clone().multiplyScalar(t);Ci.set(a.m.position,r.clone().normalize()),Ci.far=r.length();const s=Ci.intersectObjects(xc(),!1)[0];a.m.position.add(r);const o=a.m.position.x,l=a.m.position.z,h=![...Ge,...Is].some(d=>o>d.minX-.6&&o<d.maxX+.6&&l>d.minZ-.6&&l<d.maxZ+.6)||a.m.position.y<0||a.m.position.y>Je;s&&Mv(s),(s||h||a.life<0)&&(qt.remove(a.m),fs.splice(n,1))}Ci.far=1/0;for(let n=Vi.length-1;n>=0;n--){const a=Vi[n];a.t+=t;const r=a.t/a.dur;if(a.swarm&&a.t>=3&&!Le&&!Ei)if(Wn>=2){Wn=0,Vi.forEach(l=>{l.group.remove(l.d,...l.elves)}),Vi.length=0,Ul();break}else Cv();if(a.swarm||a.inSwarm){if(a.elves.forEach(l=>l.visible=!1),a.inSwarm){const l=Math.min(1,Math.max(0,(Le?Le.t:99)-2.5)/3);a.d.material.opacity=1-l,l>=1&&(a.group.remove(a.d,...a.elves),Vi.splice(n,1))}continue}a.said;const s=a.t,o=Math.min(1,Math.max(0,(s-4.4)/2.2));a.d.material.opacity=1-o;{const l=s<.18?.55+.45*Math.sin(s/.18*1.5708)*1.06:1,c=l*(1-o*.4);a.d.scale.set(Math.sign(a.d.scale.x)*c,c,1)}s>3&&!a.said&&(a.said=1,He("MACHINE ELVES DEPLOYED: SCRUBBING...")),a.elves.forEach((l,c)=>{const h=l.userData;l.visible=s>3;const d=h.base.clone().add(new R(Math.cos(h.a+s*1.5)*.28,Math.sin(h.a+s*1.1)*.12-.15,.3)),u=(p,g,x)=>p.clone().lerp(g,Math.min(1,Math.max(0,x)));s<3.8?l.position.copy(u(h.hide,h.peek,(s-3)/.8)):s<4.4?l.position.copy(u(h.peek,d,(s-3.8)/.6)).setZ(.25):s<6.6?l.position.copy(d):s<7.2?l.position.copy(u(d,h.peek,(s-6.6)/.6)).setZ(.25):l.position.copy(u(h.peek,h.hide,(s-7.2)/.8)),l.scale.setScalar(Math.max(.05,Math.min(1,(s-3)/.8,(8-s)/.8))),Us(l,s<3.8?"peek":s<4.4?"walk":s<6.6?"scrub":"retreat",s,rt,t)}),r>=1&&(a.group.remove(a.d,...a.elves),Vi.splice(n,1))}for(let n=ps.length-1;n>=0;n--){const a=ps[n];a.t+=t;const r=a.p.group,s=Math.min(1,a.t/2.2);if(r.position.copy(a.from),r.rotation.y=a.rot,r.translateZ(s*1.2),r.position.y=a.from.y+Math.sin(s*Math.PI)*.4+s*s*1.5,r.rotation.y=a.rot+s*Math.PI*2,r.scale.setScalar(1-s*.85),s>=1){r.visible=!1,a.p.state="cart",ps.splice(n,1);const o=new Tt(new he(1.8,.28),Z2(new Yt({map:Wd("IN CART · "+a.p.data.title)})));o.position.copy(a.from),o.rotation.y=a.rot,o.translateZ(.02),qt.add(o)}}Ea=Math.max(0,Ea-t*5),cu(),(du-=t)<0&&(hu.textContent=""),(Kh-=t)<0&&(Kh=.25,br()),_s.forEach(n=>{const a=n.userData.t;if(!a)return;const r=.75+.25*Math.sin(i/70+a.ph)*Math.sin(i/130+a.ph*2);n.intensity=iu*r,a.flame.scale.y=.8+r*.5}),Zd.offset.x=i/8e3%1,pc.uniforms.uTime.value=i/1e3,_r.uniforms.uTime.value=i/1e3+7,ae.light.intensity=14+3*Math.sin(i/300),te.light.intensity=14+4*Math.sin(i/90)*Math.sin(i/37),uc.offset.set(i/2e4%1,i/31e3%1),fc.offset.set(-(i/26e3)%1,i/17e3%1),wr.forEach((n,a)=>n.intensity=(_e?22:12)*(.85+.15*Math.sin(i/600+a*2))),Sa.uTime.value=i/1e3,Oh(i);const e=Le?Math.min(1,Le.t/1.5)*(Le.t<8?1:Math.max(0,9-Le.t)):0;Sa.uPulse.value=e,tn.style.filter=e>.01?`saturate(${1+e*(.6+.4*Math.sin(i/180))}) hue-rotate(${e*25*Math.sin(i/400)}deg) drop-shadow(${2*e}px 0 rgba(255,0,90,.45)) drop-shadow(${-2*e}px 0 rgba(0,255,220,.45))`:"",tn.style.transform=e>.01?`scale(${1+.012*e*Math.sin(i/230)}) skewX(${e*.8*Math.sin(i/310)}deg)`:"",ye.toneMapping!==ms&&(ye.toneMapping=ms),za.render(),ye.setRenderTarget(null),ye.clearDepth(),window.__reading||ye.render(Fs,Ll),Pv(i),Uv(i,Ui.style.display==="none"&&!document.hidden)}const za=K2(ye,qt,rt);let Do=0,Uo=0,xu=0;function Pv(i){Do++,i-Uo>1e3&&(xu=Do*1e3/(i-Uo),Do=0,Uo=i)}function wu(){rt.aspect=innerWidth/innerHeight,rt.updateProjectionMatrix(),Ll.aspect=rt.aspect,Ll.updateProjectionMatrix(),za.setSize()}addEventListener("resize",wu);wu();const _a=document.getElementById("qcell"),_u={high:"HQ",medium:"MQ",low:"LQ"};_a&&(_a.textContent=_u[_n],_a.title="Graphics quality: "+_n+" (tap to switch: low → medium → high)",_a.addEventListener("click",i=>{i.stopPropagation(),X2(j2(_n))}));let dr=_n;const bu=()=>[..._s,...wr].filter(i=>i.castShadow);function Lv(){bu().forEach(i=>{if(wr.includes(i)){i.castShadow=!1;return}i.shadow.map&&i.shadow.map.dispose(),i.shadow.map=null,i.shadow.mapSize.set(256,256),i.shadow.radius=1,i.shadow.needsUpdate=!0})}function ed(){bu().forEach(i=>i.castShadow=!1),ye.shadowMap.enabled=!1,qt.traverse(i=>{i.material&&(Array.isArray(i.material)?i.material:[i.material]).forEach(t=>t.needsUpdate=!0)})}function Io(){ye.getPixelRatio()>1&&(ye.setPixelRatio(1),za.setSize())}const Dv=_e?[()=>{za.stepDown&&za.stepDown(),xr.forEach(i=>i.visible=!0),Lv(),dr="medium"},()=>{Io(),ed(),dr="low"}]:Vn?[()=>Io(),()=>{ed(),dr="low"}]:[()=>Io()],Uv=ev(Dv,(i,t)=>{_a&&(_a.textContent=_u[dr]+"·auto"),window.__autoSteps=i});setTimeout(()=>wr.forEach(i=>{i.castShadow&&(i.shadow.needsUpdate=!0)}),3e3);vu();bc();window.game={holo:xn,books:yr,get fps(){return xu},tier:_n,get autoLevel(){return dr},get autoSteps(){return window.__autoSteps||0},get pipelineLevel(){return za.level},ceilings:lc,ROOMS:Ge,walkable:us,roomAt:Ns,get nPaintings(){return bi.length},get chaosActive(){return Ei},get chaosT(){return qi.state?qi.state.t:-1},get lastChaos(){return mu},get swarmCount(){return Wn},setSwarmCount:i=>{Wn=i},renderer:ye,camera:rt,makeElf:Ds,animateElf:Us,scene:qt,splats:Vi,get swarm(){return Le},get hits(){return uu},get distinct(){return nr.size},setWeapon:Gn,fire:_c,paintings:bi,goTo:pu,get pausedPortrait(){return gu.matches},CHK:ae,showCart:Os,get cartOpen(){return Dl.classList.contains("open")},windowSpots:dc,PIT:ge,GATE:te,get gateTrips(){return Qd},get falling(){return!!di},LABELS:Yh,boards:gc,get shownLabels(){return Yh.filter(i=>i.shown).length},lookAt:(i,t=3.5)=>{const e=bi[i].group,n=new R(0,0,1).applyQuaternion(e.quaternion);rt.position.copy(e.position).addScaledVector(n,t),rt.position.y=Qe+Ai(rt.position.x,rt.position.z),rt.lookAt(e.position.x,e.position.y,e.position.z)},view:(i,t,e,n)=>{rt.position.set(i,Qe+Ai(i,t),t),rt.lookAt(e,Qe,n),br()},hideStart:()=>{window.__test=1,Ui.style.display="none"}};if(new URLSearchParams(location.search).get("resume")==="1")try{const i=JSON.parse(sessionStorage.getItem("tjmPlayState")||"null");i&&(rt.position.fromArray(i.pos),rt.quaternion.fromArray(i.quat),Gn(i.weapon||0),Wn=i.swarmCount||0,(i.cart||[]).forEach(t=>{const e=bi.find(n=>n.data.slug===t);e&&e.state==="wall"&&(e.state="cart",e.group.visible=!1,Fn.push(e.data))}),bc(),br(),Ui.querySelector("p").textContent="TAP / CLICK TO RESUME",window.__resumed=i)}catch{}
