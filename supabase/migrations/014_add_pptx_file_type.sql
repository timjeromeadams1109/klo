-- Add PowerPoint file types (ppt, pptx) to event_files
ALTER TABLE event_files DROP CONSTRAINT IF EXISTS event_files_file_type_check;
ALTER TABLE event_files ADD CONSTRAINT event_files_file_type_check
  CHECK (file_type IN ('pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'ppt', 'pptx'));
