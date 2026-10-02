"""Extract native PDF images and caption provenance; never upscale page screenshots.
Run: python scripts/extract-book-galleries.py SOURCE_DIR OUTPUT_DIR
Reuses cached PDFs and extracted native images from the earlier print-master audit.
"""
import sys,json,re,hashlib,io,pathlib,math
import fitz
from pypdf import PdfReader
from pypdf.generic import ContentStream
from PIL import Image,ImageOps
src,out=map(pathlib.Path,sys.argv[1:3]);out.mkdir(parents=True,exist_ok=True)
media=out/'media';media.mkdir(exist_ok=True)
# Headings are raster lettering in these PDFs: transcribed from rendered pages.
sections={
'watercolor-landscapes': [('Foreword',4,5),('Pacific North West',6,31),('Tahoma',8,16),('San Juan Islands',24,27),('Bass Coast',28,29),('Mexico',32,37),('El Salvador',38,47),('South Africa',48,53),('Sedona',54,55),('Hawaii',56,57),('Assorted Adventures',58,67),('Miami',68,69),('About the Author',70,71),('Afterword: Who is Satoshi Nakamoto?',72,75)],
'watercolor-portraits': [('Foreword',4,5),('Friends',6,39),('Chase',8,8),('Lisa',9,9),('Daniel',10,13),('Laura',14,15),('Catherine',16,18),('Dawn',19,23),('Family',40,49),('Bitcoiners',50,67),('Tomer, Valerie, and Marisa',54,55),('Self Portraits',68,73),('About the Author',74,75),('Afterword: Who is Satoshi Nakamoto?',76,79)]}
def slug(t):return re.sub('[^a-z0-9]+','-',t.lower()).strip('-')
def clean(t):return ' '.join(t.replace('\u200b','').replace('\u00ad','').split())
def digest(b):return hashlib.sha256(b).hexdigest()
def image_clips(pdf,pnum,page):
 p=pdf.pages[pnum];ctm=fitz.Matrix(1,1);clip=page.rect;stack=[];path=None;pending=False;clips=[]
 for operands,op in ContentStream(p.get_contents(),pdf).operations:
  if op==b'q':stack.append((fitz.Matrix(ctm),fitz.Rect(clip)))
  elif op==b'Q':ctm,clip=stack.pop()
  elif op==b'cm':ctm=fitz.Matrix(*map(float,operands))*ctm
  elif op==b're':
   x,y,w,h=map(float,operands);path=fitz.Rect(x,y,x+w,y+h)*ctm*page.transformation_matrix
  elif op in [b'W',b'W*']:pending=True
  elif op==b'n':
   if pending and path is not None:clip=clip & path
   pending=False;path=None
  elif op==b'Do':
   obj=p['/Resources']['/XObject'][operands[0]]
   if obj.get('/Subtype')=='/Image':clips.append(tuple(clip))
 return clips
entries=[];groups=[]
for book,secs in sections.items():
 path=src/(book+'.pdf');doc=fitz.open(path);pdf=PdfReader(path);bookentries=[]
 for title,start,end in secs:groups.append(dict(id=book+'-'+slug(title),book=book,title=title,startPage=start,endPage=end,artworks=[]))
 for pn,page in enumerate(doc):
  pageNo=pn+1
  if not any(a<=pageNo<=b for _,a,b in secs):continue
  # These are text/poem pages rather than artworks.
  if (book=='watercolor-portraits' and pageNo in [5,47,48,77]) or (book=='watercolor-landscapes' and pageNo==72):continue
  infos=page.get_image_info(xrefs=True);clips=image_clips(pdf,pn,page)
  assert len(infos)==len(clips),(book,pageNo,'image count')
  lines=[]
  for block in page.get_text('dict')['blocks']:
   if block['type']==0:
    for line in block['lines']:
     t=clean(''.join(s['text'] for s in line['spans']))
     if t:lines.append(dict(text=t,bbox=line['bbox']))
  candidates=[]
  for index,(info,clip) in enumerate(zip(infos,clips)):
   box=fitz.Rect(info['bbox']);visible=box & fitz.Rect(clip)
   if book=='watercolor-portraits' and info['xref'] in [43,76,598,758,1054]:continue
   if visible.is_empty or visible.height<65 or visible.width<45:continue # raster heading lettering
   obj=doc.extract_image(info['xref']);raw=obj['image'];rh=digest(raw)
   mask=next((z[1] for z in page.get_images(full=True) if z[0]==info['xref']),0)
   if mask:
    pix=fitz.Pixmap(fitz.Pixmap(doc,info['xref']),fitz.Pixmap(doc,mask));raw=pix.tobytes('png');rh=digest(raw)
   im=Image.open(io.BytesIO(raw))
   # In these exports images are axis-aligned. Reject unexpected rotation/shear.
   a,b,c,d,e,f=info['transform'];assert abs(b)<.01 and abs(c)<.01 and a>0 and d>0
   crop=(max(0,round((visible.x0-box.x0)/box.width*im.width)),max(0,round((visible.y0-box.y0)/box.height*im.height)),min(im.width,round((visible.x1-box.x0)/box.width*im.width)),min(im.height,round((visible.y1-box.y0)/box.height*im.height)))
   # Spreads contain the complete same source on each facing page. Recover it once.
   spread=box.width>page.rect.width*1.5 and visible.width>page.rect.width*.7
   if spread:crop=(0,0,im.width,im.height)
   candidates.append(dict(xref=info['xref'],sourceHash=rh,sourceBytes=raw,crop=crop,box=tuple(visible),spread=spread,index=index,rawWidth=im.width,rawHeight=im.height))
  for item in candidates:item['lines']=[]
  for line in lines:
   bb=fitz.Rect(line['bbox']);t=line['text']
   if len(t)>150:continue
   scores=[]
   for item in candidates:
    v=fitz.Rect(item['box']);gap=bb.y0-v.y1
    if -12<=gap<=23:
     # Caption x aligns with corresponding artwork, including right-aligned sizes.
     horizontal=max(v.x0-bb.x1,bb.x0-v.x1,0)
     if horizontal<35:scores.append((abs(gap)+horizontal*2+abs((bb.x0+bb.x1-v.x0-v.x1)/2)*.02,item))
   if scores:min(scores,key=lambda x:x[0])[1]['lines'].append(t)
  candidates.sort(key=lambda v:(round(v['box'][1]/100),v['box'][0]))
  for item in candidates:
   crop=item['crop'];im=Image.open(io.BytesIO(item.pop('sourceBytes'))).convert('RGBA');bg=Image.new('RGBA',im.size,'white');bg.alpha_composite(im);im=bg.convert('RGB').crop(crop)
   if min(im.size)<120:continue
   key=digest((item['sourceHash']+str(crop)).encode())[:20]
   existing=next((x for x in bookentries if x['key']==key),None)
   if existing:
    existing['pages'].append(pageNo);existing['captions']+=item['lines'];continue
   master=media/(key+'.jpg')
   if not master.exists():im.save(master,quality=96,subsampling=0)
   if not (media/(key+'.webp')).exists():
    thumb=im.copy();thumb.thumbnail((1000,1000));thumb.save(media/(key+'.webp'),quality=85)
   captions=item['lines'];measurement=[];titles=[]
   for line in captions:
    found=re.findall(r'\d+(?:\.\d+)?\s*[x×]\s*\d+(?:\.\d+)?',line)
    measurement+=found
    t=re.sub(r'\d+(?:\.\d+)?\s*[x×]\s*\d+(?:\.\d+)?','',line).strip(' ,;')
    if t:titles.append(t)
   ent=dict(key=key,book=book,pages=[pageNo],xref=item['xref'],sourceHash=item['sourceHash'],crop=list(crop),widthPx=im.width,heightPx=im.height,masterSha256=digest(master.read_bytes()),captions=captions,title=' '.join(titles),measurements=measurement,sectionIds=[g['id'] for g in groups if g['book']==book and g['startPage']<=pageNo<=g['endPage']],spread=item['spread'])
   bookentries.append(ent)
 for entry in bookentries:
  # Later facing-page caption may contain the only measurement.
  entry['measurements']=list(dict.fromkeys(sum([re.findall(r'\d+(?:\.\d+)?\s*[x×]\s*\d+(?:\.\d+)?',t) for t in entry['captions']],[])))
  entries.append(entry)
for g in groups:g['artworks']=[e['key'] for e in entries if g['id'] in e['sectionIds']]
(out/'extracted.json').write_text(json.dumps(dict(sections=groups,artworks=entries),indent=2)+'\n')
print(json.dumps(dict(sections=len(groups),artworks=len(entries),possiblePrints=sum(min(e['widthPx'],e['heightPx'])>=1126 for e in entries),missingTitles=sum(not e['title'] for e in entries))))
