CREATE TABLE IF NOT EXISTS changelog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'feature' CHECK (type IN ('feature', 'fix', 'improvement', 'breaking')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE changelog ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access on changelog" ON changelog FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Authenticated users can read changelog" ON changelog FOR SELECT USING (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS idx_changelog_created_at ON changelog (created_at DESC);
