-- ============================================================
-- Surveys system — public surveys with cross-tabulation
-- ============================================================

-- Surveys (admin-created)
CREATE TABLE IF NOT EXISTS surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  intro_text TEXT,
  is_active BOOLEAN DEFAULT false,
  show_on_homepage BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Survey sections (grouping questions)
CREATE TABLE IF NOT EXISTS survey_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Survey questions
-- type: 'single' | 'multi' | 'open'
CREATE TABLE IF NOT EXISTS survey_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  section_id UUID REFERENCES survey_sections(id) ON DELETE SET NULL,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'single' CHECK (question_type IN ('single', 'multi', 'open')),
  options JSONB DEFAULT '[]',
  sort_order INT DEFAULT 0,
  required BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Survey respondents (anonymous tracking for cross-tabulation)
CREATE TABLE IF NOT EXISTS survey_respondents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  fingerprint TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(survey_id, fingerprint)
);

-- Survey answers (one row per question per respondent)
CREATE TABLE IF NOT EXISTS survey_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  respondent_id UUID NOT NULL REFERENCES survey_respondents(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES survey_questions(id) ON DELETE CASCADE,
  answer_value TEXT,
  answer_values JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(respondent_id, question_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_survey_questions_survey ON survey_questions(survey_id);
CREATE INDEX IF NOT EXISTS idx_survey_answers_survey ON survey_answers(survey_id);
CREATE INDEX IF NOT EXISTS idx_survey_answers_respondent ON survey_answers(respondent_id);
CREATE INDEX IF NOT EXISTS idx_survey_answers_question ON survey_answers(question_id);
CREATE INDEX IF NOT EXISTS idx_survey_respondents_survey ON survey_respondents(survey_id);

-- RLS
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_respondents ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_answers ENABLE ROW LEVEL SECURITY;

-- Public read for active surveys
CREATE POLICY surveys_public_read ON surveys FOR SELECT USING (is_active = true);
CREATE POLICY sections_public_read ON survey_sections FOR SELECT USING (true);
CREATE POLICY questions_public_read ON survey_questions FOR SELECT USING (true);

-- Public insert for respondents and answers
CREATE POLICY respondents_public_insert ON survey_respondents FOR INSERT WITH CHECK (true);
CREATE POLICY respondents_public_select ON survey_respondents FOR SELECT USING (true);
CREATE POLICY answers_public_insert ON survey_answers FOR INSERT WITH CHECK (true);
CREATE POLICY answers_public_select ON survey_answers FOR SELECT USING (true);
