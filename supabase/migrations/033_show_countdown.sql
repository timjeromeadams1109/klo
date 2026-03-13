-- Add show_countdown toggle for events page countdown clock
ALTER TABLE event_presentations
  ADD COLUMN IF NOT EXISTS show_countdown BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN event_presentations.show_countdown IS 'When true, shows a countdown timer on the events page for this event';
