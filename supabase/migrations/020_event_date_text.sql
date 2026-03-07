-- Allow event_date to store text values like "SAVE THE DATE" instead of only dates
ALTER TABLE event_presentations ALTER COLUMN event_date TYPE TEXT USING event_date::TEXT;
