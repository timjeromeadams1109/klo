-- ============================================================
-- 002_assessments.sql — Assessment results table
-- ============================================================

create table assessment_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  assessment_type text not null,
  score integer not null default 0,
  answers jsonb not null default '{}',
  recommendations text[] not null default '{}',
  created_at timestamptz default now()
);

-- Index for fast lookups by user
create index idx_assessment_results_user_id on assessment_results(user_id);

-- Enable Row Level Security
alter table assessment_results enable row level security;

-- Users can view their own assessment results
create policy "Users can view own assessments"
  on assessment_results for select
  using (auth.uid() = user_id);

-- Users can insert their own assessment results
create policy "Users can create own assessments"
  on assessment_results for insert
  with check (auth.uid() = user_id);
