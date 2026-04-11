-- ============================================================
-- Content Visibility — hide/archive without delete
--
-- Creates vault_content and feed_posts if missing, then adds
-- visibility field for the hide/archive toggle system.
--
-- visibility values:
--   published — visible to users in the app (default)
--   hidden    — not visible to users, still editable in Content Manager
--   archived  — moved to Content Repository, AI can still reference
-- ============================================================

-- ------------------------------------------------------------
-- vault_content (create if missing)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vault_content (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  content_type TEXT NOT NULL,                -- article, video, template, guide, briefing, framework, policy, replay, event
  category     TEXT NOT NULL,
  body         TEXT NOT NULL DEFAULT '',
  excerpt      TEXT,
  thumbnail_url TEXT,
  tier_required TEXT NOT NULL DEFAULT 'free', -- free, essentials, professional, enterprise
  published    BOOLEAN NOT NULL DEFAULT true,
  author_name  TEXT DEFAULT 'Keith L. Odom',
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- Add visibility, metadata, published_at columns
ALTER TABLE vault_content
  ADD COLUMN IF NOT EXISTS visibility TEXT NOT NULL DEFAULT 'published'
    CHECK (visibility IN ('published', 'hidden', 'archived'));

ALTER TABLE vault_content
  ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

ALTER TABLE vault_content
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Backfill visibility from existing published boolean (for any pre-existing rows)
UPDATE vault_content SET visibility = 'hidden' WHERE published = false AND visibility = 'published';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_vault_content_slug       ON vault_content(slug);
CREATE INDEX IF NOT EXISTS idx_vault_content_category   ON vault_content(category);
CREATE INDEX IF NOT EXISTS idx_vault_content_visibility ON vault_content(visibility);

-- RLS
ALTER TABLE vault_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published vault content is publicly readable" ON vault_content;
DROP POLICY IF EXISTS "vault_content_public_read" ON vault_content;
DROP POLICY IF EXISTS "vault_content_public_read_published" ON vault_content;

CREATE POLICY "vault_content_public_read_published" ON vault_content
  FOR SELECT
  USING (visibility = 'published');

-- ------------------------------------------------------------
-- feed_posts (create if missing)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS feed_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id       UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title           TEXT,
  body            TEXT NOT NULL,
  post_type       TEXT NOT NULL DEFAULT 'discussion',
  tags            TEXT[] NOT NULL DEFAULT '{}',
  likes_count     INTEGER NOT NULL DEFAULT 0,
  comments_count  INTEGER NOT NULL DEFAULT 0,
  is_pinned       BOOLEAN NOT NULL DEFAULT false,
  published       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Make author_id nullable (admin-authored posts don't need a profile FK)
ALTER TABLE feed_posts ALTER COLUMN author_id DROP NOT NULL;

-- Add visibility, metadata, published_at columns
ALTER TABLE feed_posts
  ADD COLUMN IF NOT EXISTS visibility TEXT NOT NULL DEFAULT 'published'
    CHECK (visibility IN ('published', 'hidden', 'archived'));

ALTER TABLE feed_posts
  ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

ALTER TABLE feed_posts
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Backfill visibility
UPDATE feed_posts SET visibility = 'hidden' WHERE published = false AND visibility = 'published';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_feed_posts_visibility ON feed_posts(visibility, created_at DESC);

-- RLS
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view published posts" ON feed_posts;
DROP POLICY IF EXISTS "feed_posts_public_read" ON feed_posts;
DROP POLICY IF EXISTS "feed_posts_public_read_published" ON feed_posts;
DROP POLICY IF EXISTS "Users can create own posts" ON feed_posts;
DROP POLICY IF EXISTS "Users can update own posts" ON feed_posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON feed_posts;

-- Feed posts are publicly readable when published (marketing content, no auth required)
CREATE POLICY "feed_posts_public_read_published" ON feed_posts
  FOR SELECT
  USING (visibility = 'published');
