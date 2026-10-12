import json
import sys
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import pillow_heif
pillow_heif.register_heif_opener()

if sys.argv[1] == "--sheets":
    root = Path(sys.argv[2])
    records = json.loads((root / "review.json").read_text())["objects"]
    sheets = root / "sheets"
    sheets.mkdir(exist_ok=True)
    for kind in ("front", "back"):
        items = [r for r in records if r["kind"] == kind]
        cols, rows, w, h = (4, 3, 400, 440) if kind == "front" else (3, 3, 600, 680)
        for start in range(0, len(items), cols * rows):
            canvas = Image.new("RGB", (cols*w, rows*h), "white")
            draw = ImageDraw.Draw(canvas)
            for slot, record in enumerate(items[start:start+cols*rows]):
                x, y = (slot % cols)*w, (slot // cols)*h
                with Image.open(root / record["preview"]) as source:
                    thumb = ImageOps.contain(source, (w-20, h-65))
                    canvas.paste(thumb, (x+(w-thumb.width)//2, y+10))
                label = str(record["order"]) + " | " + Path(record["key"]).name
                label += "\n" + str(record["width"]) + " x " + str(record["height"]) + " px"
                draw.text((x+10,y+h-50), label, fill="black", font=ImageFont.load_default(size=17))
            canvas.save(sheets / (kind+"-"+str(start//(cols*rows)+1).zfill(3)+".jpg"), quality=90)
    print("Review contact sheets generated.")
else:
    source, destination, kind = sys.argv[1:4]
    with Image.open(source) as original:
        exif = original.getexif()
        date = exif.get(36867) or exif.get(306)
        image = ImageOps.exif_transpose(original)
        width, height = image.size
        image = image.convert("RGB")
        image.thumbnail((2200,2200) if kind=="back" else (1400,1400))
        image.save(destination, quality=92 if kind=="back" else 88, optimize=True)
        print(json.dumps({"width":width,"height":height,"captureDate":str(date) if date else None}))
