-- 025: Marketing automation tables
-- Adds testimonials, social queue, email log, and organizer fields

-- Organizer contact info on events
ALTER TABLE event_presentations
  ADD COLUMN IF NOT EXISTS organizer_email TEXT,
  ADD COLUMN IF NOT EXISTS organizer_name TEXT;

-- Testimonials collected from event organizers
CREATE TABLE IF NOT EXISTS marketing_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES event_presentations(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  quote TEXT,
  organizer_name TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Social media post queue
CREATE TABLE IF NOT EXISTS marketing_social_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES event_presentations(id) ON DELETE SET NULL,
  platform TEXT NOT NULL DEFAULT 'twitter',
  content TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'posted', 'rejected')),
  scheduled_for TIMESTAMPTZ,
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Email send log (deduplication + analytics)
CREATE TABLE IF NOT EXISTS marketing_email_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES event_presentations(id) ON DELETE SET NULL,
  email_type TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT,
  sent_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(event_id, email_type, recipient_email)
);

-- RLS policies
ALTER TABLE marketing_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_social_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_email_log ENABLE ROW LEVEL SECURITY;

-- Service role full access
CREATE POLICY "Service role full access" ON marketing_testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON marketing_social_queue FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON marketing_email_log FOR ALL USING (true) WITH CHECK (true);

-- Public can insert testimonials (from email links)
CREATE POLICY "Public can submit testimonials" ON marketing_testimonials FOR INSERT WITH CHECK (true);

-- Unique constraint for upsert (one rating per organizer per event)
ALTER TABLE marketing_testimonials ADD CONSTRAINT testimonials_event_email_unique UNIQUE (event_id, email);
