-- studio-tracker #311: photo booth wall. D1 holds records; R2 holds the image bytes. Not applied anywhere yet.
-- Apply (when TJ says go): wrangler d1 migrations apply <db> --remote   (NOT run by this PR)
-- Only photos with the visitor's consent to keep them are ever stored, so there is no consent column and no expiry:
-- consenting photos stay up until TJ removes them (admin tool) or the visitor uses their delete link.
CREATE TABLE IF NOT EXISTS photos (
  id TEXT PRIMARY KEY,                 -- random uuid, also the R2 key stem: photos/<id>
  owner_hash TEXT NOT NULL,            -- sha256 of the owner token handed to the visitor (for their delete link); the token itself is never stored
  status TEXT NOT NULL CHECK (status IN ('published','held','removed')),
  -- published: passed the content filter, on the wall. held: filter said no / unsure / errored, visible only to the admin tool.
  -- removed: deleted by the visitor or TJ (R2 object is gone).
  hold_reason TEXT,                    -- short code for held photos, e.g. 'unsafe', 'unsure', 'filter_error'
  content_type TEXT NOT NULL,
  bytes INTEGER NOT NULL,
  created_at INTEGER NOT NULL          -- unix ms
);
-- Public wall: published, newest first, capped. Also serves the 24-hour filter budget count.
CREATE INDEX IF NOT EXISTS photos_wall ON photos (status, created_at DESC);
CREATE INDEX IF NOT EXISTS photos_created ON photos (created_at);
