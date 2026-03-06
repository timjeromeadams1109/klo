-- Add source column to track where events came from
-- null = manual entry, 'auto-sync' = scraped from external sites
ALTER TABLE event_presentations
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT NULL;
