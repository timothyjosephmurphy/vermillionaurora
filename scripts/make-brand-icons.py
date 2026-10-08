"""Build the TJ Murphy logo and favicon set from the orange-face painting crop.

Source: docs/brand/orange-face-source.png (TJ's painting: upturned face ringed by orange feathers).
Run:    python3 scripts/make-brand-icons.py   (needs Pillow). Outputs are committed under static/.
Small sizes (16/32) use a tighter crop with a slight contrast boost so the face stays legible.
"""
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

SRC = Image.open('docs/brand/orange-face-source.png').convert('RGB')
FACE = (306, 275, 160)       # centre x, centre y, radius: face plus a ring of flames
TIGHT = (305, 265, 138)      # favicon 16/32: tighter on the face
WARM = (247, 232, 212)       # warm paper background for maskable/opaque icons

def crop(spec, size, boost=1.0, sharpen=False, square=False):
    cx, cy, r = spec
    im = SRC.crop((cx - r, cy - r, cx + r, cy + r)).resize((size * 4, size * 4), Image.LANCZOS)
    if boost != 1.0:
        im = ImageEnhance.Contrast(im).enhance(boost)
        im = ImageEnhance.Color(im).enhance(1 + (boost - 1) * 0.8)
    im = im.resize((size, size), Image.LANCZOS)
    if sharpen:
        im = im.filter(ImageFilter.UnsharpMask(radius=0.6, percent=80, threshold=1))
    out = im.convert('RGBA')
    if not square:
        mask = Image.new('L', (size * 4, size * 4), 0)
        ImageDraw.Draw(mask).ellipse((0, 0, size * 4 - 1, size * 4 - 1), fill=255)
        out.putalpha(mask.resize((size, size), Image.LANCZOS))
    return out

def save_small_png(im, path):
    """Palette PNG (256 colours, dithered): about 4x smaller with no visible change at icon sizes."""
    method = Image.Quantize.FASTOCTREE if im.mode == 'RGBA' else Image.Quantize.MEDIANCUT
    im.quantize(256, method=method, dither=Image.Dither.FLOYDSTEINBERG).save(path, optimize=True)

def on_background(mark_size, canvas, background=WARM):
    base = Image.new('RGBA', (canvas, canvas), background + (255,))
    mark = crop(FACE, mark_size)
    base.alpha_composite(mark, ((canvas - mark_size) // 2, (canvas - mark_size) // 2))
    return base

# Header logo (shown at 52px, 40px on small phones): 1x/2x/3x WebP plus a PNG master.
for size in (52, 104, 156):
    crop(FACE, size, boost=1.08 if size == 52 else 1.0, sharpen=size == 52).save(f'static/brand/tj-murphy-logo-{size}.webp', 'WEBP', quality=90, method=6)
crop(FACE, 512).save('static/brand/tj-murphy-logo-512.png', optimize=True)
# Default share image (og:image/twitter:image on pages without an artwork): opaque, square.
on_background(560, 630).convert('RGB').save('static/brand/tj-murphy-share.jpg', 'JPEG', quality=88, optimize=True, progressive=True)
# Legacy path, in case anything outside the site hotlinks the old monogram: same 156x179 box.
legacy = Image.new('RGBA', (156, 179), (0, 0, 0, 0))
legacy.alpha_composite(crop(FACE, 156), (0, (179 - 156) // 2))
legacy.save('static/brand/vermillion-aurora-logo.png', optimize=True)

# Favicons.
f16 = crop(TIGHT, 16, boost=1.2, sharpen=True)
f32 = crop(TIGHT, 32, boost=1.2, sharpen=True)
f48 = crop(FACE, 48, boost=1.12, sharpen=True)
f16.save('static/favicon-16x16.png', optimize=True)
f32.save('static/favicon-32x32.png', optimize=True)
f48.save('static/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)], append_images=[f16, f32])
# Apple touch icon: opaque full-bleed square (iOS rounds the corners itself).
save_small_png(crop(FACE, 180, square=True).convert('RGB'), 'static/apple-touch-icon.png')
# Web app manifest: "any" icons are the round mark; "maskable" icons keep the mark inside the 80% safe zone.
for size in (192, 512):
    save_small_png(crop(FACE, size), f'static/icon-{size}.png')
    save_small_png(on_background(round(size * 0.76), size).convert('RGB'), f'static/icon-maskable-{size}.png')
print('Brand icons written.')
