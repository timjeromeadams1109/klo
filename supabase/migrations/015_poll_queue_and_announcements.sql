-- Add is_deployed to conference_polls for queue/deploy workflow
ALTER TABLE conference_polls ADD COLUMN IF NOT EXISTS is_deployed boolean NOT NULL DEFAULT false;

-- Create conference_announcements table
CREATE TABLE IF NOT EXISTS conference_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS policies for announcements
ALTER TABLE conference_announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active announcements"
  ON conference_announcements FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert announcements"
  ON conference_announcements FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update announcements"
  ON conference_announcements FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete announcements"
  ON conference_announcements FOR DELETE
  USING (true);

-- Enable realtime for announcements
ALTER PUBLICATION supabase_realtime ADD TABLE conference_announcements;
