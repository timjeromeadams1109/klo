-- ============================================================
-- 005_subscriptions.sql — Subscriptions, advisor usage, feed
-- ============================================================

-- Subscriptions table (synced from Stripe webhooks)
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  stripe_subscription_id text unique not null,
  tier text not null default 'free',              -- free, essentials, professional, enterprise
  status text not null default 'active',          -- active, past_due, canceled, trialing
  current_period_start timestamptz not null,
  current_period_end timestamptz not null,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz default now()
);

create index idx_subscriptions_user_id on subscriptions(user_id);
create index idx_subscriptions_stripe_id on subscriptions(stripe_subscription_id);

alter table subscriptions enable row level security;

-- Users can view their own subscriptions
create policy "Users can view own subscriptions"
  on subscriptions for select
  using (auth.uid() = user_id);

-- ============================================================
-- Advisor usage tracking (rate limiting & analytics)
-- ============================================================

create table advisor_usage (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  message_count integer not null default 0,
  tokens_used integer not null default 0,
  period_start timestamptz not null,
  period_end timestamptz not null,
  created_at timestamptz default now()
);

create index idx_advisor_usage_user_id on advisor_usage(user_id);
create index idx_advisor_usage_period on advisor_usage(user_id, period_start, period_end);

alter table advisor_usage enable row level security;

-- Users can view their own usage
create policy "Users can view own advisor usage"
  on advisor_usage for select
  using (auth.uid() = user_id);

-- ============================================================
-- Feed posts (community / thought leadership)
-- ============================================================

create table feed_posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references profiles(id) on delete cascade not null,
  title text,
  body text not null,
  post_type text not null default 'discussion',   -- discussion, insight, announcement, poll
  tags text[] not null default '{}',
  likes_count integer not null default 0,
  comments_count integer not null default 0,
  is_pinned boolean not null default false,
  published boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_feed_posts_author on feed_posts(author_id);
create index idx_feed_posts_published on feed_posts(published, created_at desc) where published = true;

alter table feed_posts enable row level security;

-- Published posts are readable by all authenticated users
create policy "Authenticated users can view published posts"
  on feed_posts for select
  using (published = true and auth.role() = 'authenticated');

-- Users can create their own posts
create policy "Users can create own posts"
  on feed_posts for insert
  with check (auth.uid() = author_id);

-- Users can update their own posts
create policy "Users can update own posts"
  on feed_posts for update
  using (auth.uid() = author_id);

-- Users can delete their own posts
create policy "Users can delete own posts"
  on feed_posts for delete
  using (auth.uid() = author_id);
