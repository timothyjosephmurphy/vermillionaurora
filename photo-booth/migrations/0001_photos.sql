-- studio-tracker #311: photo booth wall. D1 holds records and the approval queue; R2 holds the image bytes.
-- Apply (when TJ says go): wrangler d1 migrations apply <db> --remote   (NOT run by this PR)
CREATE TABLE IF NOT EXISTS photos (
  id TEXT PRIMARY KEY,                 -- random uuid, also the R2 key stem: photos/<id>
  owner_hash TEXT NOT NULL,            -- sha256 of the owner token handed to the visitor; the token itself is never stored
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','deleted','expired')),
  consent_keep INTEGER NOT NULL DEFAULT 0, -- visitor ticked the consent-to-keep box (the expiry rule depends on it)
  frame TEXT NOT NULL DEFAULT 'none',  -- frame option id (the frame choice is open, see photo-booth/config.mjs)
  content_type TEXT NOT NULL,
  bytes INTEGER NOT NULL,
  created_at INTEGER NOT NULL,         -- unix ms
  expires_at INTEGER,                  -- unix ms, NULL = never expires
  decided_at INTEGER                   -- unix ms of TJ's approve/reject
);
-- Public wall: approved, newest first, capped.
CREATE INDEX IF NOT EXISTS photos_wall ON photos (status, created_at DESC);
-- Approval queue (oldest first) and the expiry sweep.
CREATE INDEX IF NOT EXISTS photos_expiry ON photos (expires_at) WHERE expires_at IS NOT NULL;
