"""Create display derivatives from verified JPEG masters; never modify R2 originals."""
import concurrent.futures
import hashlib
import io
import json
import pathlib
import urllib.request
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / 'catalog/archive-paintings.json').read_text())
display_dir = ROOT / 'static/display'
display_dir.mkdir(parents=True, exist_ok=True)

def prepare(p):
    source = p['front']
    if not source['sourceUrl'].startswith('https://media.vermillionaurora.com/images/Archive/'):
        raise ValueError('Unexpected archive source URL')
    with urllib.request.urlopen(source['sourceUrl'], timeout=120) as response:
        data = response.read(256 * 1024 * 1024 + 1)
    if hashlib.sha256(data).hexdigest() != source['sha256']:
        raise ValueError('Master checksum changed: ' + source['key'])
    with Image.open(io.BytesIO(data)) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
    if image.size != (source['width'], source['height']):
        raise ValueError('Master dimensions changed: ' + source['key'])
    variants = []
    for width in (160, 480, 960, 1600):
        height = round(image.height * width / image.width)
        preview = image.resize((width, height), Image.Resampling.LANCZOS)
        file_name = f"{p['id']}-{width}.webp"
        file_path = display_dir / file_name
        preview.save(file_path, 'WEBP', quality=85, method=6)
        variants.append({'w': width, 'src': '/display/' + file_name, 'bytes': file_path.stat().st_size})
    print(f"Prepared {p['id']}", flush=True)
    return source['sourceUrl'], {'original': len(data), 'width': image.width, 'variants': variants}

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    additions = dict(pool.map(prepare, manifest['paintings']))
map_path = ROOT / 'scripts/display-images.json'
display_map = json.loads(map_path.read_text())
display_map.update(additions)
map_path.write_text(json.dumps(display_map, ensure_ascii=False, indent=1) + '\n')
print(f"Prepared {len(additions)} verified masters and {len(additions) * 4} display images.")
