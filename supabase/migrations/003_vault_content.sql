-- ============================================================
-- 003_vault_content.sql — Strategy Vault content table
-- ============================================================

create table vault_content (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content_type text not null,           -- article, video, template, guide
  category text not null,               -- ai-strategy, data-privacy, governance, etc.
  body text not null default '',
  excerpt text,
  thumbnail_url text,
  tier_required text not null default 'free',  -- free, essentials, professional, enterprise
  published boolean not null default false,
  author_name text default 'Keith L. Odom',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for slug lookups and category filtering
create index idx_vault_content_slug on vault_content(slug);
create index idx_vault_content_category on vault_content(category);
create index idx_vault_content_published on vault_content(published) where published = true;

-- Enable Row Level Security
alter table vault_content enable row level security;

-- Published content is publicly readable
create policy "Published vault content is publicly readable"
  on vault_content for select
  using (published = true);

-- Service role (admin) can manage all content (handled via service key, no policy needed)
