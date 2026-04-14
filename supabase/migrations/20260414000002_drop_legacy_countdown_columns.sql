-- Drop the legacy per-event countdown columns that were left in place during
-- the spotlight rollout to avoid mid-deploy breakage. Now that the new code
-- has been live and stable and no running client reads these columns, they
-- can be removed safely.
--
-- Grep confirmed no reference to either column remains in src/.
ALTER TABLE event_presentations DROP COLUMN IF EXISTS show_countdown;
ALTER TABLE event_presentations DROP COLUMN IF EXISTS show_countdown_title;
