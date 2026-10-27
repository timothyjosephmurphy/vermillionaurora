import olderWorkProducts from '../catalog/older-work-products.mjs';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {tjWall,paulWall,notToScale,WALL_UNIT,WALL_GAP,FRAME_INCHES} from '../src/data/paintings-wall.mjs';
import {packWall} from '../src/data/paintings-wall-layout.mjs';
import {scaledPaintings,unscaledPaintings,inchesOf,heldOffWall,wallHangSets} from '../src/data/paintings-wall-selection.mjs';
import {printOptions,config,papers} from '../catalog/prints.mjs';
import {wallArtworks} from '../src/data/gallery-wall.mjs';
import {products,statusLabel} from '../catalog/catalog.mjs';
import archiveProducts from '../catalog/archive-products.mjs';
import images from '../catalog/paintings-wall-images.json' with {type:'json'};
import {canonicalArtwork} from '../src/data/canonical-artworks.mjs';

const walls=[['TJ Murphy',tjWall],['Paul Murphy',paulWall]];
test('the TJ wall draws every TJ work with a size or a print; Paul\'s wall every measured painting, each once',()=>{
  const covered=p=>p.olderWork?.members?.length>1&&p.olderWork.members.every((_,i)=>products.some(x=>x.id===`${p.id}-original-${i+1}`));
  const tjWorks=products.filter(p=>p.artist==='TJ Murphy'&&(p.type==='painting'||p.bookGallery)&&!covered(p)&&!p.strawberryGroup&&!heldOffWall.has(p.id)&&!(canonicalArtwork[p.id]&&products.some(x=>x.id===canonicalArtwork[p.id])));
  assert(tjWall.artworks.every(a=>!canonicalArtwork[a.id])&&notToScale.every(i=>!canonicalArtwork[i.id]||!products.some(x=>x.id===canonicalArtwork[i.id])),'merged book scans are not drawn or listed');
  const drawnTJ=new Set(tjWall.artworks.map(a=>a.id)),listed=new Set(notToScale.map(i=>i.id));
  assert(tjWorks.every(p=>drawnTJ.has(p.id)!==listed.has(p.id)),'each TJ work is drawn or listed, never both');
  assert(tjWall.artworks.length>=204); // 205 before the Oct 15 2026 twin merge (archived-painting-412 = painting-studio-figure)
  assert(tjWall.artworks.filter(a=>a.scaleBasis==='actual').length>=130&&tjWall.artworks.filter(a=>a.scaleBasis==='print').length>=72); // Oct 20 2026: Sunrise on Rainier moved from print-scaled to actual size (#641)
  const paulExpected=products.filter(p=>p.type==='painting'&&!p.bookGallery&&p.artist==='Paul Murphy'&&p.dimensions?.width>0&&p.dimensions?.height>0);
  assert.deepEqual(paulWall.artworks.map(a=>a.id).sort(),paulExpected.map(p=>p.id).sort());
  for(const [artist,wall] of walls){assert.equal(new Set(wall.artworks.map(a=>a.id)).size,wall.artworks.length);assert(wall.artworks.every(a=>a.artist===artist));}
});
test('status wording comes from the catalog and the Temple paintings say exactly Not for sale',()=>{
  const labels=new Set(['Available','Sold','Not for sale']);
  for(const art of [...tjWall.artworks,...paulWall.artworks]){
    const p=products.find(item=>item.id===art.id);
    assert.equal(art.statusLabel,statusLabel(p));assert(labels.has(art.statusLabel),`${art.id}: ${art.statusLabel}`);
    assert.equal(art.buy,p.listing.status==='available');
    assert.match(art.href,/^\/products\/[a-z0-9-]+\/$/);if(art.buy)assert.match(art.buyHref,/^\/commissions\/\?(buy|product)=[a-z0-9-]+#form$/);
  }
  const temples=tjWall.artworks.filter(a=>a.id.startsWith('burning-man-temple')||/Burning Man Temple/.test(a.title));
  assert.equal(temples.length,4);assert(temples.every(a=>a.statusLabel==='Not for sale'&&!a.buy));
  assert(tjWall.artworks.some(a=>a.id==='cormorant-presiding-over-sunset-on-puget-sound'&&a.statusLabel==='Not for sale'));
});
test('layouts never overlap, keep the 2.6 in gap, stay on the wall and are centred',()=>{
  for(const [,wall] of walls){
    const rects=wall.artworks.map(a=>({id:a.id,x:a.x/WALL_UNIT,y:a.y/WALL_UNIT,w:a.width/WALL_UNIT,h:a.height/WALL_UNIT}));
    const W=wall.world.width/WALL_UNIT,H=wall.world.height/WALL_UNIT;
    for(const r of rects)assert(r.x>=11.99&&r.y>=11.99&&r.x+r.w<=W-11.99&&r.y+r.h<=H-11.99,`${r.id} off the wall`);
    for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){
      const a=rects[i],b=rects[j];
      assert(a.x+a.w+WALL_GAP<=b.x+.01||b.x+b.w+WALL_GAP<=a.x+.01||a.y+a.h+WALL_GAP<=b.y+.01||b.y+b.h+WALL_GAP<=a.y+.01,`Insufficient gap: ${a.id}, ${b.id}`);
    }
    const left=Math.min(...rects.map(r=>r.x))-12,right=W-12-Math.max(...rects.map(r=>r.x+r.w));
    assert(Math.abs(left)<.01&&right<.5,'content hugs the margin on both sides');
    const aspect=W/H;assert(aspect>1.4&&aspect<2.4,`sensible wall aspect: ${aspect}`);
  }
});
test('packing is deterministic and independent of input order',()=>{
  const items=tjWall.artworks.map(a=>({id:a.id,width:a.width/WALL_UNIT,height:a.height/WALL_UNIT}));
  const first=packWall(items),second=packWall([...items].reverse());
  assert.deepEqual(first,second);assert.deepEqual(first,packWall(items));
  assert.equal(packWall([]).items.length,0);
});
test('paintings keep the true stated area, drawn at the photo shape inside a thin frame',()=>{
  for(const [artist,wall] of walls)for(const art of wall.artworks){
    const p=products.find(item=>item.id===art.id),stated=inchesOf(p);
    const w=art.imageWidth/WALL_UNIT,h=art.imageHeight/WALL_UNIT;
    assert(Math.abs(w*h-stated.width*stated.height)<.05,`${art.id} area`);
    assert(Math.abs(w/h-art.sourceWidth/art.sourceHeight)<.002,`${art.id} photo shape`);
    assert(Math.abs(art.width/WALL_UNIT-(w+2*FRAME_INCHES))<.01);assert.equal(art.frameWidth,FRAME_INCHES*WALL_UNIT);
  }
});
test('previews are small WebP files, never upscaled, and end with the full photo',()=>{
  const onPrintWall=new Set(wallArtworks.map(a=>a.id));
  for(const [,wall] of walls)for(const art of wall.artworks){
    assert(art.sources.length>=1);
    const widths=art.sources.map(s=>s.width);assert.deepEqual(widths,[...widths].sort((a,b)=>a-b),`${art.id} ascending`);
    assert(art.sources[0].width<=960&&art.sources[0].src.endsWith('.webp'),`${art.id} first preview`);
    assert(art.sources.at(-1).width<=art.sourceWidth,`${art.id} never upscaled`);
    if(!onPrintWall.has(art.id)){
      assert(images[art.id],`${art.id} manifest`);
      for(const s of art.sources.filter(s=>s.src.startsWith('/wall-paintings/'))){
        // 1920/2880 deep-zoom previews are uploaded to R2 only (gitignored); the small levels ship in the repo
        if(s.width<1920){assert(fs.existsSync(`static${s.src}`),`${s.src} exists`);assert(fs.statSync(`static${s.src}`).size<400_000);}
        assert(s.width<=art.sourceWidth);
      }
    }
  }
  // The first (initial-load) previews of the whole TJ wall stay in the 1-2 MB budget; the 78 print-wall previews come from the build step.
  const own=tjWall.artworks.filter(a=>!onPrintWall.has(a.id)).reduce((sum,a)=>sum+fs.statSync(`static${a.sources[0].src}`).size,0);
  // Sized Older Work originals (Oct 2026) add ~0.45 MB of small previews.
  // All TJ works (Oct 2026: book pages and archive paintings at print size) bring the small previews to ~2.5 MB.
  assert(own<3_000_000,`own TJ previews ${own}`);
});
test('works with neither a size nor a print are listed, not drawn',()=>{
  const drawn=new Set([...tjWall.artworks,...paulWall.artworks].map(a=>a.id));
  assert(notToScale.every(i=>!drawn.has(i.id)&&/^\/(products\/[a-z0-9-]+\/|commissions\/#[a-z]+)$/.test(i.href)));
  assert.equal(notToScale.filter(i=>i.kind==='Commission package').length,3);
  assert.equal(notToScale.filter(i=>i.kind==='Archived painting').length,0);
});
test('the print wall includes the 54 archive additions',()=>{assert.equal(wallArtworks.length,77);assert(archiveProducts.every(p=>wallArtworks.some(a=>a.id===p.id)));});
test('hang sets stay contiguous, triptychs are one row, and the four temples are a 2×2',()=>{
  const byId=new Map(tjWall.artworks.map(a=>[a.id,a]));
  const inch=a=>({x:a.x/WALL_UNIT,y:a.y/WALL_UNIT,w:a.width/WALL_UNIT,h:a.height/WALL_UNIT});
  assert(!byId.has('sunrise-on-rainier-from-denny-blaine')&&!notToScale.some(i=>i.id==='sunrise-on-rainier-from-denny-blaine'));
  assert(products.some(p=>p.id==='sunrise-on-rainier-from-denny-blaine'),'the product page stays');
  assert(byId.has('sunrise-on-tahoma-from-denny-blaine')&&byId.has('lisa-climbing-tahoma-at-sunrise-from-denny-blaine'));
  assert(!byId.has('archived-painting-19')&&!byId.has('archived-painting-20'));
  const eagle=products.find(p=>p.id==='painting-portrait-with-hat');
  assert.equal(eagle.listing.status,'sold');assert.equal(eagle.listing.price,null);
  assert(printOptions(eagle,config,papers).some(o=>o.ready&&!o.testOnly),'prints stay for sale the way other sold originals do');
  const eagleArt=byId.get('painting-portrait-with-hat');
  assert.equal(eagleArt.status,'sold');assert.equal(eagleArt.statusLabel,'Sold');assert.equal(eagleArt.buy,false);
  const forest=['older-work-forest-triptych-original-2','older-work-forest-triptych-original-1','older-work-forest-triptych-original-3'];
  for(const set of wallHangSets()){
    const arts=set.members.map(id=>byId.get(id));
    assert(arts.every(Boolean),set.id);
    const r=arts.map(inch);
    const box={x:Math.min(...r.map(i=>i.x)),y:Math.min(...r.map(i=>i.y)),r:Math.max(...r.map(i=>i.x+i.w)),b:Math.max(...r.map(i=>i.y+i.h))};
    const ids=new Set(set.members);
    for(const other of tjWall.artworks){
      if(ids.has(other.id))continue;
      const p=inch(other);
      assert(!(p.x<box.r-.01&&p.x+p.w>box.x+.01&&p.y<box.b-.01&&p.y+p.h>box.y+.01),`${other.id} inside ${set.id}`);
    }
    if(set.arrangement==='stack'){
      for(let i=0;i<r.length-1;i++){
        assert(Math.abs(r[i].y+r[i].h+WALL_GAP-r[i+1].y)<.02,`${set.id} stacked gap`);
        assert(Math.abs((r[i].x+r[i].w/2)-(r[i+1].x+r[i+1].w/2))<.02,`${set.id} stacked`);
      }
    }else if(set.arrangement==='grid'){
      assert.equal(r.length,4,set.id);
      const mid=a=>a.y+a.h/2,cx=a=>a.x+a.w/2;
      assert(Math.abs(mid(r[0])-mid(r[1]))<.02&&r[0].x+r[0].w+WALL_GAP<=r[1].x+.02,set.id+' top row');
      assert(Math.abs(mid(r[2])-mid(r[3]))<.02&&r[2].x+r[2].w+WALL_GAP<=r[3].x+.02&&mid(r[0])<mid(r[2]),set.id+' bottom row');
      assert(Math.abs(cx(r[0])-cx(r[2]))<.2&&Math.abs(cx(r[1])-cx(r[3]))<.2,set.id+' columns');
      assert(r[0].y+r[0].h+WALL_GAP<=r[2].y+.02,set.id+' row gap');
    }else{
      for(let i=0;i<r.length-1;i++){
        assert(Math.abs(r[i].x+r[i].w+WALL_GAP-r[i+1].x)<.02,`${set.id} row gap`);
        assert(Math.abs((r[i].y+r[i].h/2)-(r[i+1].y+r[i+1].h/2))<.02,`${set.id} one row`);
      }
    }
  }
  assert.deepEqual(forest.map(id=>byId.get(id).title),['TJ Forest 302','TJ Forest 303','TJ Forest 304']);
  const fx=forest.map(id=>byId.get(id).x);
  assert(fx[0]<fx[1]&&fx[1]<fx[2],'Forest reads 302, 303, 304 left to right');
  assert.deepEqual([...byId.keys()].filter(id=>id.startsWith('burning-man-temple-2022-')).sort(),['burning-man-temple-2022-blue','burning-man-temple-2022-daytime','burning-man-temple-2022-flame','burning-man-temple-2022-pink']);
});

