-- Changelog entry: home page image editing UX (PR feat/home-image-editing-ux)
-- This is an additive insert — no schema changes required.
-- page_configs.section_images is stored as JSONB in the existing table.

INSERT INTO changelog (version, title, description, type, created_at)
VALUES (
  '1.18.0',
  'Home Page Image Editing',
  'Admins can now swap watermark images on the Latest Brief and Featured Insight cards directly from Creative Studio → Pages (select "Home"). MediaPicker gains an "Upload & Use" button so files can be uploaded without leaving the editor. A new "Edit Home Page" shortcut on the Admin Overview tab cuts the path from 4 clicks to 1.',
  'feature',
  now()
);
