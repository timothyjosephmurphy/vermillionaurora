#!/usr/bin/env python3
"""Build 1200x630 padded (contain, never cropped) social share JPEGs for every product page.
Sources: local display derivatives from scripts/social-sources.mjs; anything else is fetched once and
downscaled here (print masters are only read, never published). Output: static/social/<slug>-<hash10>.jpg
(uploaded to R2 by scripts/sync-images-r2.mjs, served from img.tjm.art) and scripts/social-images.json."""
import json, subprocess, hashlib, io, os, sys, urllib.request, urllib.parse
from PIL import Image, ImageOps
os.makedirs('static/social', exist_ok=True)
data = json.loads(subprocess.check_output(['node', 'scripts/social-sources.mjs']))
srcs = dict(data['out'])
for line in data['missing']:
    slug, url = line.split(' ', 1); srcs[slug] = url
manifest_path = 'scripts/social-images.json'
manifest = json.load(open(manifest_path)) if os.path.exists(manifest_path) else {}
W, H, BG = 1200, 630, (244, 239, 232)
# Pages that rotate their source image on screen (e.g. the SVG rotate(-90) for Arizona Slot Cave): degrees counter-clockwise.
ROTATE = {'paul-murphy-painting-8': 90}
for slug, src in sorted(srcs.items()):
    try:
        if src.startswith('http'):
            req = urllib.request.Request(urllib.parse.quote(src, safe=':/%?=&'), headers={'User-Agent': 'tjm-social-build'})
            raw = urllib.request.urlopen(req, timeout=60).read()
        else:
            raw = open(src, 'rb').read()
        key = f"social/{slug}-{hashlib.sha256(raw + str(ROTATE.get(slug, 0)).encode()).hexdigest()[:10]}.jpg"
        if manifest.get(slug) == key and os.path.exists('static/' + key): continue
        im = ImageOps.exif_transpose(Image.open(io.BytesIO(raw))).convert('RGB')
        if ROTATE.get(slug): im = im.rotate(ROTATE[slug], expand=True)
        im.thumbnail((W - 60, H - 40), Image.LANCZOS)
        canvas = Image.new('RGB', (W, H), BG)
        canvas.paste(im, ((W - im.width) // 2, (H - im.height) // 2))
        canvas.save('static/' + key, 'JPEG', quality=84, optimize=True, progressive=True)
        old = manifest.get(slug)
        if old and old != key and os.path.exists('static/' + old): os.remove('static/' + old)
        manifest[slug] = key
    except Exception as e:
        print('FAILED', slug, src, e, file=sys.stderr)
json.dump(dict(sorted(manifest.items())), open(manifest_path, 'w'), indent=0)
print(len(manifest), 'social images')
