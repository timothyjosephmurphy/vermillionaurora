#!/usr/bin/env python3
"""Build watermarked high-resolution print previews and write a public manifest.

Sources are private print masters (local files or the tjm-print-masters bucket).
Outputs are written under a work directory and, optionally, described in
data/print-hires-manifest.json. They are never the original masters: the long
edge is capped at 4000 px and a low-opacity tiled "tjm.art" watermark is baked in.

Usage:
  python3 scripts/build-print-hires.py --masters /path/to/masters --out /path/to/out
  python3 scripts/build-print-hires.py --masters ... --out ... --sample 2
  python3 scripts/build-print-hires.py --masters ... --out ... --write-manifest
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
IMAGE_ORIGIN = "https://img.tjm.art"
PREFIX = "print-hires"
LONG_EDGE_CAP = 4000
HIRES_FLOOR = 3000
WEBP_QUALITY = 85
WEBP_METHOD = 5
WATERMARK_TEXT = "tjm.art"
FONT_CANDIDATES = (
    Path("/home/box/.fonts/CG-600.ttf"),
    Path("/usr/share/fonts/truetype/sand-box/google/Cormorant Garamond/CormorantGaramond-VariableFont_wght.ttf"),
    Path("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"),
    Path("/usr/share/fonts/truetype/freefont/FreeSerif.ttf"),
)


def load_json(path: Path):
    return json.loads(path.read_text())


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def pick_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for candidate in FONT_CANDIDATES:
        if candidate.is_file():
            try:
                return ImageFont.truetype(str(candidate), size=size)
            except OSError:
                continue
    return ImageFont.load_default()


def watermark_overlay(width: int, height: int) -> Image.Image:
    """Diagonal tiled text, readable on light and dark paint, with room for brushwork."""
    font_size = max(36, min(width, height) // 42)
    font = pick_font(font_size)
    # Build a square larger than the diagonal so rotation does not clip the grid.
    side = int(math.hypot(width, height) * 1.15)
    layer = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    text = WATERMARK_TEXT
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    step_x = max(int(tw * 3.6), font_size * 8)
    step_y = max(int(th * 5.2), font_size * 5)
    # Staggered rows so the pattern does not form heavy columns.
    y = -step_y
    row = 0
    while y < side + step_y:
        x = -step_x + (step_x // 2 if row % 2 else 0)
        while x < side + step_x:
            # A 1px dark offset keeps the mark visible on pale passages.
            draw.text((x + 1, y + 1), text, font=font, fill=(20, 16, 12, 38))
            draw.text((x, y), text, font=font, fill=(255, 252, 247, 52))
            x += step_x
        y += step_y
        row += 1
    rotated = layer.rotate(28, resample=Image.Resampling.BICUBIC, expand=False)
    left = (side - width) // 2
    top = (side - height) // 2
    return rotated.crop((left, top, left + width, top + height))


def resize_to_cap(image: Image.Image, cap: int) -> Image.Image:
    width, height = image.size
    long_edge = max(width, height)
    if long_edge <= cap:
        return image
    scale = cap / long_edge
    next_size = (max(1, round(width * scale)), max(1, round(height * scale)))
    return image.resize(next_size, Image.Resampling.LANCZOS)


def build_derivative(source: Path) -> tuple[Image.Image, int, int]:
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw)
        image = image.convert("RGB")
        source_size = image.size
        image = resize_to_cap(image, LONG_EDGE_CAP)
        overlay = watermark_overlay(*image.size)
        image = Image.alpha_composite(image.convert("RGBA"), overlay).convert("RGB")
        return image, source_size[0], source_size[1]



def artwork_index(prints_config: dict) -> dict[str, list[str]]:
    by_sha: dict[str, list[str]] = {}
    for artwork_id, artwork in prints_config["artworks"].items():
        sha = (artwork.get("source") or {}).get("sha256")
        if sha:
            by_sha.setdefault(sha, []).append(artwork_id)
    for ids in by_sha.values():
        ids.sort()
    return by_sha


def download_source(url: str, dest: Path) -> Path:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return dest
    import urllib.request
    req = urllib.request.Request(url, headers={"User-Agent": "tjm.art-print-hires/1"})
    with urllib.request.urlopen(req, timeout=120) as response:
        dest.write_bytes(response.read())
    return dest


def resolve_source(sha: str, filename_hint: str, url: str | None, masters: Path, cache: Path) -> Path:
    for name in (filename_hint, f"{sha}.jpg", f"{sha}.jpeg", f"{sha}.png", f"{sha}.tif", f"{sha}.tiff"):
        candidate = masters / name
        if candidate.exists():
            return candidate
        cached = cache / name
        if cached.exists():
            return cached
    if url:
        suffix = Path(url.split("?", 1)[0]).suffix.lower() or ".jpg"
        dest = cache / f"{sha}{suffix}"
        return download_source(url, dest)
    raise SystemExit(f"no source file for {sha}")


def process(masters: Path, out: Path, cache: Path, artworks: dict, manifest_by_sha: dict,
            only: set[str] | None, sample: int, overwrite: bool) -> list[dict]:
    out.mkdir(parents=True, exist_ok=True)
    cache.mkdir(parents=True, exist_ok=True)
    by_sha = artwork_index({"artworks": artworks})
    chosen = []
    for sha, artwork_ids in by_sha.items():
        source = artworks[artwork_ids[0]]["source"]
        if only and sha not in only and not only.intersection(artwork_ids):
            continue
        chosen.append((sha, artwork_ids, source))
    chosen.sort(key=lambda item: item[0])
    if sample:
        chosen.sort(key=lambda item: -max(item[2].get("widthPx") or 0, item[2].get("heightPx") or 0))
        mixed = []
        if chosen:
            mixed.append(chosen[0])
        if len(chosen) > 1:
            mixed.append(chosen[-1])
        for rec in chosen:
            if len(mixed) >= sample:
                break
            if rec not in mixed:
                mixed.append(rec)
        chosen = mixed[:sample]

    records = []
    for i, (sha, artwork_ids, source) in enumerate(chosen, 1):
        manifest = manifest_by_sha.get(sha)
        filename = manifest["filename"] if manifest else f"{sha}.jpg"
        path = resolve_source(sha, filename, source.get("url"), masters, cache)
        if manifest and path.stat().st_size != manifest["bytes"] and path.resolve() == (masters / filename).resolve():
            raise SystemExit(f"size mismatch for {filename}: {path.stat().st_size} != {manifest['bytes']}")
        digest = sha256_file(path)
        if digest != sha:
            raise SystemExit(f"sha256 mismatch for {path} (got {digest})")
        width_src = source.get("widthPx") or (manifest or {}).get("widthPx")
        height_src = source.get("heightPx") or (manifest or {}).get("heightPx")
        source_long = max(width_src or 0, height_src or 0)
        out_long = min(LONG_EDGE_CAP, source_long) if source_long else LONG_EDGE_CAP
        dest = out / f"{sha}-{out_long}w.webp"
        if dest.exists() and not overwrite:
            bytes_out = dest.stat().st_size
            with Image.open(dest) as existing:
                width, height = existing.size
            if not width_src or not height_src:
                width_src, height_src = width, height
                source_long = max(width_src, height_src)
        else:
            image, opened_w, opened_h = build_derivative(path)
            if not width_src or not height_src:
                width_src, height_src = opened_w, opened_h
                source_long = max(width_src, height_src)
            width, height = image.size
            out_long = max(width, height)
            dest = out / f"{sha}-{out_long}w.webp"
            image.save(dest, format="WEBP", quality=WEBP_QUALITY, method=WEBP_METHOD)
            bytes_out = dest.stat().st_size
        key = f"{PREFIX}/{sha}-{out_long}w.webp"
        entry = {
            "sha256": sha,
            "artworkIds": artwork_ids,
            "sourceWidthPx": width_src,
            "sourceHeightPx": height_src,
            "sourceLongEdge": source_long,
            "widthPx": width,
            "heightPx": height,
            "key": key,
            "url": f"{IMAGE_ORIGIN}/{key}",
            "bytes": bytes_out,
            "meetsHiResFloor": source_long >= HIRES_FLOOR,
        }
        records.append(entry)
        flag = "ok" if entry["meetsHiResFloor"] else "below-3000"
        print(f"[{i}/{len(chosen)}] {flag} {width}x{height} {bytes_out}B {key} artworks={','.join(artwork_ids)}")
    return records


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--masters", type=Path, required=True, help="Directory of print-master files named by sha256.")
    parser.add_argument("--out", type=Path, required=True, help="Directory for watermarked WebP derivatives.")
    parser.add_argument("--cache", type=Path, default=None, help="Download cache for remote (non-R2) sources.")
    parser.add_argument("--write-manifest", action="store_true", help="Write data/print-hires-manifest.json in the repo.")
    parser.add_argument("--sample", type=int, default=0, help="Build only this many review samples.")
    parser.add_argument("--only", action="append", default=[], help="Limit to a sha256 or artwork id (repeatable).")
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()

    masters_manifest = load_json(ROOT / "data/print-masters-manifest.json")
    prints_config = load_json(ROOT / "catalog/prints.json")
    manifest_by_sha = {file["sha256"]: file for file in masters_manifest["files"]}
    cache = args.cache or (args.out.parent / "remote-sources")
    records = process(
        args.masters,
        args.out,
        cache,
        prints_config["artworks"],
        manifest_by_sha,
        set(args.only) or None,
        args.sample,
        args.overwrite,
    )
    records.sort(key=lambda r: r["sha256"])
    missing = sorted(set(artwork_index(prints_config)) - {r["sha256"] for r in records}) if not args.sample and not args.only else []
    payload = {
        "version": 1,
        "bucket": "tjm-images",
        "prefix": PREFIX,
        "origin": IMAGE_ORIGIN,
        "longEdgeCap": LONG_EDGE_CAP,
        "hiResFloor": HIRES_FLOOR,
        "watermark": WATERMARK_TEXT,
        "format": "webp",
        "quality": WEBP_QUALITY,
        "files": records,
        "coverage": {
            "printArtworks": len(prints_config["artworks"]),
            "derivatives": len(records),
            "meetsHiResFloor": sum(1 for r in records if r["meetsHiResFloor"]),
            "belowHiResFloor": sum(1 for r in records if not r["meetsHiResFloor"]),
            "missingSources": missing,
        },
    }
    if args.write_manifest:
        dest = ROOT / "data/print-hires-manifest.json"
        dest.write_text(json.dumps(payload, indent=2) + "\n")
        print(f"wrote {dest}")
    else:
        print(json.dumps(payload["coverage"], indent=2))
    if missing and not args.sample and not args.only:
        raise SystemExit(f"missing sources for {len(missing)} print artworks")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
