-- Add is_featured column to event_presentations for homepage keynote display
ALTER TABLE event_presentations ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Partial index for quick lookup of the featured event
CREATE INDEX IF NOT EXISTS idx_event_presentations_featured
  ON event_presentations(is_featured) WHERE is_featured = true;
