-- Add optional website URL to event presentations
ALTER TABLE event_presentations
ADD COLUMN IF NOT EXISTS website_url TEXT;
