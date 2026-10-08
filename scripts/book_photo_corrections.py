"""Perspective-correct and crop book-gallery painting photos (see catalog/book-photo-corrections.json).
Run: python scripts/book_photo_corrections.py SOURCE_DIR OUTPUT_DIR
SOURCE_DIR holds the book PDFs (scripts/download-book-sources.mjs). Each correction starts from the native PDF image
(verified by sourceHash), maps the four paper corners (TL, TR, BR, BL; source pixels) onto an upright rectangle of
`size`, then crops `crop` [x0, y0, x1, y1) in that upright image: to the paper (no background) or, with
cropTo 'color', inside the painted area so no paper margin shows on any edge. No enlargement beyond the photographed paper
and no sharpening. Writes OUTPUT_DIR/<output>.jpg (quality 96, 4:4:4) and <output>.webp (<=1000 px, quality 85),
the same encodings as extract-book-galleries.py, plus corrections.json with sizes and SHA-256 digests.
Use pinned Pillow 12.3.0 (as in prepare-book-galleries.yml) to reproduce the committed bytes exactly.
"""
import sys,json,hashlib,io,pathlib
import fitz
import numpy as np
from PIL import Image

def coefficients(corners,size):
  # Pillow's PERSPECTIVE maps each output (x, y) to input ((a x + b y + c)/(g x + h y + 1), (d x + e y + f)/(g x + h y + 1)).
  w,h=size;dst=[(0,0),(w,0),(w,h),(0,h)];rows=[];rhs=[]
  for (X,Y),(x,y) in zip(corners,dst):
    rows.append([x,y,1,0,0,0,-X*x,-X*y]);rhs.append(X)
    rows.append([0,0,0,x,y,1,-Y*x,-Y*y]);rhs.append(Y)
  return tuple(float(v) for v in np.linalg.solve(np.array(rows,float),np.array(rhs,float)))

def correct(image,spec):
  flat=image.convert('RGB').transform(tuple(spec['size']),Image.Transform.PERSPECTIVE,coefficients(spec['corners'],spec['size']),Image.Resampling.BICUBIC,fillcolor=(255,0,0))
  return flat.crop(tuple(spec['crop']))

def encode(image):
  jpg=io.BytesIO();image.save(jpg,'JPEG',quality=96,subsampling=0)
  thumb=image.copy();thumb.thumbnail((1000,1000));webp=io.BytesIO();thumb.save(webp,'WEBP',quality=85)
  return jpg.getvalue(),webp.getvalue()

if __name__=='__main__':
  src,out=map(pathlib.Path,sys.argv[1:3]);out.mkdir(parents=True,exist_ok=True)
  config=json.loads((pathlib.Path(__file__).parent.parent/'catalog'/'book-photo-corrections.json').read_text())
  results=[]
  for spec in config['corrections']:
    raw=fitz.open(src/(spec['book']+'.pdf')).extract_image(spec['xref'])['image']
    assert hashlib.sha256(raw).hexdigest()==spec['sourceHash'],('source changed',spec['key'])
    image=correct(Image.open(io.BytesIO(raw)),spec)
    jpg,webp=encode(image);files={}
    for ext,data in [('jpg',jpg),('webp',webp)]:
      (out/f"{spec['output']}.{ext}").write_bytes(data)
      files[ext]=dict(file=f"{spec['output']}.{ext}",sha256=hashlib.sha256(data).hexdigest(),size=len(data))
    results.append(dict(key=spec['key'],widthPx=image.width,heightPx=image.height,files=files))
  (out/'corrections.json').write_text(json.dumps(results,indent=2)+'\n');print(json.dumps(results))
