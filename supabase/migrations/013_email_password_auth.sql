-- ============================================================
-- 013_email_password_auth.sql — Email/password auth columns
-- ============================================================

-- Add email and password_hash columns to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email text UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS password_hash text;

-- Drop the FK constraint to auth.users so we can insert profiles
-- for users who don't exist in Supabase Auth
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
ALTER TABLE profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Fast lookups by email
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles (email);

-- Allow inserts from service role (RLS bypass via service key)
-- Add a permissive policy for service-role inserts
CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);
