-- ============================================================
-- 006_admin_role.sql — Admin role support
-- ============================================================

-- Add role column to profiles (default 'user')
alter table profiles
  add column if not exists role text not null default 'user';

-- Constrain role values
alter table profiles
  add constraint profiles_role_check
  check (role in ('user', 'admin'));

-- Index for role-based lookups
create index idx_profiles_role on profiles(role);

-- RLS policy: admins can read all profiles
create policy "Admins can read all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles as p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- RLS policy: admins can read all subscriptions
create policy "Admins can read all subscriptions"
  on subscriptions for select
  using (
    exists (
      select 1 from profiles as p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- RLS policy: admins can read all advisor usage
create policy "Admins can read all advisor usage"
  on advisor_usage for select
  using (
    exists (
      select 1 from profiles as p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- RLS policy: admins can read all assessment results
create policy "Admins can read all assessment results"
  on assessment_results for select
  using (
    exists (
      select 1 from profiles as p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- RLS policy: admins can read all vault content
create policy "Admins can read all vault content"
  on vault_content for select
  using (
    exists (
      select 1 from profiles as p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- RLS policy: admins can read all strategy rooms
create policy "Admins can read all strategy rooms"
  on strategy_rooms for select
  using (
    exists (
      select 1 from profiles as p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- RLS policy: admins can read all feed posts
create policy "Admins can read all feed posts"
  on feed_posts for select
  using (
    exists (
      select 1 from profiles as p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
