-- Event presentations table
CREATE TABLE IF NOT EXISTS event_presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  conference_name TEXT NOT NULL,
  conference_location TEXT NOT NULL,
  event_category TEXT NOT NULL CHECK (event_category IN ('Previous Events', 'Current Events')),
  description TEXT,
  event_date DATE NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Event files table
CREATE TABLE IF NOT EXISTS event_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES event_presentations(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt')),
  file_url TEXT NOT NULL,
  file_size TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_event_presentations_category ON event_presentations(event_category);
CREATE INDEX IF NOT EXISTS idx_event_presentations_slug ON event_presentations(slug);
CREATE INDEX IF NOT EXISTS idx_event_files_event_id ON event_files(event_id);

-- Storage bucket for event files (run via Supabase dashboard or API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('event-files', 'event-files', true);
