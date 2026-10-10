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
test('detail progresses to the untouched source and focus follows the gesture point',()=>{
  const art=wallArtworks[0];assert.equal(imageSource(art.sources,100),art.sources[0]);assert.equal(imageSource(art.sources,art.sourceWidth),art.sources.at(-1));
  const artworks=[{id:'left',x:20,y:20,width:120,height:160},{id:'right',x:220,y:20,width:120,height:160}],view={width:720,height:400},transform={scale:2,x:0,y:0};
  assert.equal(focusArtwork(artworks,transform,view,.5,{x:100,y:160})?.id,'left');
  assert.equal(focusArtwork(artworks,transform,view,.5,{x:560,y:160})?.id,'right','A new gesture must immediately release the previous focus');
  assert.equal(focusArtwork(artworks,transform,view,.5,{x:360,y:160}),null,'Do not select an unrelated painting across empty wall space');
});
test('the fixed screen-size pane occupies empty wall space or hides completely',()=>{
  const view={width:1280,height:700},panel={width:236,height:220},art={x:300,y:100,width:680,height:500};
  const p=panelPosition(art,view,panel,[art]);assert(p);
  assert(p.x>=12&&p.y>=12&&p.x+panel.width<=view.width-12&&p.y+panel.height<=view.height-12);
  assert(p.x+panel.width+12<=art.x||p.x>=art.x+art.width+12||p.y+panel.height+12<=art.y||p.y>=art.y+art.height+12);
  const blocked={x:0,y:0,width:1280,height:700};
  assert.equal(panelPosition(art,view,panel,[art,blocked]),null,'Never cover another painting to show product information');
  assert.equal(panelPosition(blocked,view,panel),null,'Deep zoom leaves the painting unobstructed');
  assert.equal(panelPosition(art,{width:200,height:200},panel),null);
});
