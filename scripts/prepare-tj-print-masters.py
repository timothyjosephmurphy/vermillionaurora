"""Reproduce the reviewed masters without adding detail or enlarging artwork.
Requires PyMuPDF 1.26.6 and Pillow 12.3.0; used once, not during site builds.
"""
import hashlib, io, json, math, subprocess
from pathlib import Path
import pymupdf
from PIL import Image
root=Path(__file__).resolve().parent.parent
cache=root/'.cache/master-inputs';cache.mkdir(parents=True,exist_ok=True)
output=root/'static/print-masters';output.mkdir(parents=True,exist_ok=True)
config=json.loads((root/'catalog/prints.json').read_text())
sha=lambda b:hashlib.sha256(b).hexdigest()
def download(url,expected,suffix):
    target=cache/(expected+suffix)
    if not target.exists():
        subprocess.run(['curl','--fail','--silent','--show-error','--location','--retry','3','--output',str(target),url],check=True)
    data=target.read_bytes()
    if sha(data)!=expected:raise ValueError('Source checksum changed: '+url)
    return data

def perspective(corners,w,h):
    # Map output coordinates into the photographed painting quadrilateral.
    rows=[]
    for (x,y),(u,v) in zip([(0,0),(w,0),(w,h),(0,h)],corners):
        rows.extend([[x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]])
    for col in range(8):
        pivot=max(range(col,8),key=lambda r:abs(rows[r][col]));rows[col],rows[pivot]=rows[pivot],rows[col]
        value=rows[col][col];rows[col]=[v/value for v in rows[col]]
        for r in range(8):
            if r!=col:
                value=rows[r][col];rows[r]=[a-value*b for a,b in zip(rows[r],rows[col])]
    return [rows[i][8] for i in range(8)]

for recipe in json.loads((root/'catalog/tj-print-masters.json').read_text()):
    if 'local' in recipe:data=(root/recipe['local']).read_bytes()
    elif 'xref' in recipe:
        data=download(recipe['url'],recipe['pdfSha256'],'.pdf')
        with pymupdf.open(stream=data,filetype='pdf') as pdf:data=pdf.extract_image(recipe['xref'])['image']
    else:data=download(recipe['url'],recipe['sha256'],'.jpg')
    if sha(data)!=recipe['sha256']:raise ValueError('Extracted source changed: '+recipe['id'])
    image=Image.open(io.BytesIO(data))
    if image.getexif().get(274,1)!=1 or image.mode!='RGB':raise ValueError('Source orientation/color requires review')
    if 'corners' in recipe:
        w,h=recipe['widthPx'],recipe['heightPx'];corners=recipe['corners']
        assert w<=min(math.dist(corners[0],corners[1]),math.dist(corners[3],corners[2]))
        assert h<=min(math.dist(corners[0],corners[3]),math.dist(corners[1],corners[2]))
        assert all(0<=x<image.width and 0<=y<image.height for x,y in corners)
        image=image.transform((w,h),Image.Transform.PERSPECTIVE,perspective(corners,w,h),Image.Resampling.BICUBIC)
        buffer=io.BytesIO();image.save(buffer,format='JPEG',quality=95,subsampling=0,icc_profile=image.info.get('icc_profile',b''));data=buffer.getvalue()
    digest=sha(data);(output/(digest+'.jpg')).write_bytes(data)
    config['artworks'][recipe['id']]={'enabled':False,'sizing':'image-proportional','sizingApproved':True,'paper':config['defaultPaper'],'source':{'url':f'https://vermillionaurora.com/print-masters/{digest}.jpg','widthPx':image.width,'heightPx':image.height,'sha256':digest},'variants':{}}
    if recipe.get('layoutOptions'):config['artworks'][recipe['id']]['layoutOptions']=recipe['layoutOptions']
    print(recipe['id'],image.size)
(root/'catalog/prints.json').write_text(json.dumps(config,indent=2)+'\n')
