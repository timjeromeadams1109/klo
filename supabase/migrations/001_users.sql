-- ============================================================
-- 001_users.sql — User profiles table
-- ============================================================

create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  organization_name text,
  organization_type text,
  industry text,
  team_size text,
  subscription_tier text default 'free',
  stripe_customer_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Auto-create profile on user signup (trigger)
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
