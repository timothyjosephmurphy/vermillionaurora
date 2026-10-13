"""Copy the artist-designated archive JPEG masters after verifying their checksums.
No source is cropped, resized, recompressed, or overwritten.
"""
import concurrent.futures
import hashlib
import io
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageOps

root=Path(__file__).resolve().parent.parent
recipes=json.loads((root/'catalog/archive-print-masters.json').read_text())
config_path=root/'catalog/prints.json'
config=json.loads(config_path.read_text())
output=root/'static/print-masters';output.mkdir(parents=True,exist_ok=True)
cache=root/'.cache/archive-print-masters';cache.mkdir(parents=True,exist_ok=True)

def prepare(recipe):
    if not recipe['url'].startswith('https://media.vermillionaurora.com/images/Archive/'):
        raise ValueError('Unexpected archive master location')
    expected=recipe['sha256'];target=output/(expected+'.jpg')
    if not target.exists():
        temporary=cache/(expected+'.jpg')
        subprocess.run(['curl','--fail','--silent','--show-error','--location','--retry','3','--output',str(temporary),recipe['url']],check=True)
        data=temporary.read_bytes()
    else:data=target.read_bytes()
    if hashlib.sha256(data).hexdigest()!=expected:raise ValueError('Changed archive master: '+recipe['id'])
    with Image.open(io.BytesIO(data)) as original:image=ImageOps.exif_transpose(original)
    if image.size!=(recipe['widthPx'],recipe['heightPx']):raise ValueError('Changed archive dimensions: '+recipe['id'])
    target.write_bytes(data)
    source={'url':f'https://vermillionaurora.com/print-masters/{expected}.jpg','widthPx':image.width,'heightPx':image.height,'sha256':expected}
    previous=config['artworks'].get(recipe['id'])
    if previous and previous.get('source')!=source:raise ValueError('Existing archive print source changed: '+recipe['id'])
    art=previous or {'enabled':False,'sizing':'image-proportional','sizingApproved':True,'paper':config['defaultPaper'],'source':source,'variants':{}}
    if recipe.get('layoutOptions'):art['layoutOptions']=recipe['layoutOptions']
    print('Verified untouched master: '+recipe['id'],flush=True)
    return recipe['id'],art

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    config['artworks'].update(dict(pool.map(prepare,recipes)))
config_path.write_text(json.dumps(config,indent=2)+'\n')
print(f'Prepared {len(recipes)} checksum-verified archive masters.')
