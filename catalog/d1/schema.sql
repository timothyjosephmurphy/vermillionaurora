-- tjm-catalog (D1). Live catalog edited at /catalog-admin/. Imported once from the built snapshot
-- (dist/catalog/snapshot.json, made by scripts/build-catalog-snapshot.mjs); the snapshot stays the fallback.
CREATE TABLE IF NOT EXISTS paintings (
  id TEXT PRIMARY KEY,            -- catalog product id (stable; never reused)
  slug TEXT NOT NULL UNIQUE,      -- /products/<slug>/
  type TEXT NOT NULL DEFAULT 'painting',
  title TEXT NOT NULL,
  artist TEXT, medium TEXT, surface TEXT, year INTEGER,
  width REAL, height REAL, unit TEXT, -- original's dimensions
  description TEXT,
  price_amount TEXT,              -- original's site price ("1000.00"), NULL = no price. Etsy lists originals at +10%.
  currency TEXT NOT NULL DEFAULT 'USD',
  parcel_json TEXT,               -- shipping parcel for the original (checkout)
  source TEXT NOT NULL DEFAULT 'import', -- 'import' (built page exists) or 'admin' (added in admin, worker-rendered page)
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS editions (
  id TEXT PRIMARY KEY,            -- print id, e.g. print-<product>-full[-frame-black]
  product_id TEXT NOT NULL,
  title TEXT NOT NULL,
  amount TEXT NOT NULL,           -- published retail price ("125.00")
  currency TEXT NOT NULL DEFAULT 'USD',
  sku TEXT,
  image_w REAL, image_h REAL, paper_w REAL, paper_h REAL,
  enabled INTEGER NOT NULL DEFAULT 1, -- 0 = size withdrawn (hidden on the site, refused at checkout)
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS editions_product ON editions(product_id);
CREATE TABLE IF NOT EXISTS images (
  product_id TEXT NOT NULL,
  key TEXT NOT NULL,              -- R2 key in tjm-images (docs/r2-images.md), e.g. display/<base>-<hash10>-<w>.webp
  width INTEGER,
  role TEXT NOT NULL DEFAULT 'display',
  rev INTEGER NOT NULL DEFAULT 0, -- bumped on swap; pages add ?v=<rev> so the new picture shows immediately
  PRIMARY KEY (product_id, key)
);
CREATE TABLE IF NOT EXISTS status (
  product_id TEXT PRIMARY KEY,
  status TEXT NOT NULL,           -- catalog listing status: available | sold | not-for-sale | inquiry | ...
  note TEXT, updated_at TEXT NOT NULL
  -- Live holds/sales stay in the checkout Worker's PaintingStock Durable Object and the Etsy sync log;
  -- /inventory/status combines both exactly as before (this row replaces the generated baseline).
);
CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, action TEXT NOT NULL, target TEXT, change_json TEXT);
INSERT OR IGNORE INTO meta (key, value) VALUES ('rev', '0');
