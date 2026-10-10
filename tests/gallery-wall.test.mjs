import {test} from 'node:test';
import assert from 'node:assert/strict';
import {wallArtworks,wallLayout,wallSize,WALL_UNIT} from '../src/data/gallery-wall.mjs';
import {byId,collections} from '../catalog/catalog.mjs';
import {readyPrints} from '../catalog/prints.mjs';
import {fitView,zoomAt,constrainView,screenRect,imageSource,focusArtwork,panelPosition} from '../src/scripts/gallery-wall-math.mjs';
const near=(a,b)=>assert(Math.abs(a-b)<.001,`${a} differs from ${b}`);
test('every main-gallery TJ print appears once at its largest ready black-frame size',()=>{
  const expected=Object.values(readyPrints).filter(p=>!p.testOnly&&!p.sampleOnly&&p.frame?.key==='black'&&byId[p.productId]?.artist==='TJ Murphy'&&collections.gallery.some(c=>c.product===p.productId));
  assert.equal(wallArtworks.length,24);assert.equal(new Set(wallArtworks.map(a=>a.id)).size,24);
  assert.deepEqual(new Set(wallArtworks.map(a=>a.id)),new Set(expected.map(p=>p.productId)));
  for(const art of wallArtworks){
    const largest=expected.filter(p=>p.productId===art.id).sort((a,b)=>b.frame.size.width*b.frame.size.height-a.frame.size.width*a.frame.size.height)[0];
    assert.equal(art.printId,largest.id);
    near(art.width/WALL_UNIT,largest.frame.size.width+2*largest.frame.mouldingWidth);
    near(art.height/WALL_UNIT,largest.frame.size.height+2*largest.frame.mouldingWidth);
    assert(Math.abs(art.imageWidth/art.imageHeight-art.sourceWidth/art.sourceHeight)<.002,'Uncropped source proportions');
    assert(art.imageWidth<art.width-2*art.frameWidth&&art.imageHeight<art.height-2*art.frameWidth,'Entire image fits within the mat');
    assert.equal(art.sources.at(-1).src,art.fullSrc);assert.equal(art.sources.at(-1).width,art.sourceWidth);
    assert.match(art.href,/^\/products\/[a-z0-9-]+\/$/);
  }
});
test('physical rectangles never overlap, preserve the gap, and define all four corners',()=>{
  const {artworks,width,height,gap}=wallLayout;
  for(const art of artworks){assert(art.x>=0&&art.y>=0&&art.x+art.width<=width+.001&&art.y+art.height<=height+.001);}
  for(let i=0;i<artworks.length;i++)for(let j=i+1;j<artworks.length;j++){
    const a=artworks[i],b=artworks[j];
    assert(a.x+a.width+gap<=b.x+.001||b.x+b.width+gap<=a.x+.001||a.y+a.height+gap<=b.y+.001||b.y+b.height+gap<=a.y+.001,`Insufficient separation: ${a.id}, ${b.id}`);
  }
  for(const [right,bottom] of [[false,false],[true,false],[false,true],[true,true]])assert(artworks.some(a=>Math.abs((right?a.x+a.width:a.x)-(right?width:0))<.001&&Math.abs((bottom?a.y+a.height:a.y)-(bottom?height:0))<.001));
});
test('zoom retains the point beneath a finger and the overview shows the complete wall',()=>{
  for(const view of [{width:1280,height:700},{width:366,height:590}]){
    const fit=fitView(view,wallSize);assert(fit.x>=0&&fit.y>=0);
    assert(wallSize.width*fit.scale<=view.width&&wallSize.height*fit.scale<=view.height);
    const p={x:view.width*.34,y:view.height*.6},next=zoomAt(fit,p,fit.scale*4);
    near((p.x-fit.x)/fit.scale,(p.x-next.x)/next.scale);near((p.y-fit.y)/fit.scale,(p.y-next.y)/next.scale);
    assert.equal(focusArtwork(wallArtworks,fit,view,fit.scale),null);
    const constrained=constrainView({...next,x:1e6,y:-1e6},view,wallSize);
    assert(constrained.x<=160&&constrained.y>=view.height-wallSize.height*constrained.scale-160);
  }
});
test('detail progresses to the untouched source and focused artwork has an onscreen panel',()=>{
  const art=wallArtworks[0];assert.equal(imageSource(art.sources,100),art.sources[0]);assert.equal(imageSource(art.sources,art.sourceWidth),art.sources.at(-1));
  for(const view of [{width:1280,height:700},{width:366,height:480}]){
    const fit=fitView(view,wallSize),scale=fit.scale*5;
    const t={scale,x:view.width/2-(art.x+art.width/2)*scale,y:view.height/2-(art.y+art.height/2)*scale};
    assert.equal(focusArtwork(wallArtworks,t,view,fit.scale)?.id,art.id);
    for(const rect of [screenRect(art,t),{x:-300,y:-100,width:2000,height:1800}]){
      const p=panelPosition(rect,view,{width:260,height:340});
      assert(p.x>=12&&p.y>=12&&p.x+260<=view.width-12&&p.y+340<=view.height-12);
    }
  }
});
