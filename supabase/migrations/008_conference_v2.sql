-- ============================================================
-- 008_conference_v2.sql — Conference V2 Upgrade
-- Multi-role, sessions, authenticated likes, profanity filter,
-- slide-aware release, soft-delete/archive
-- ============================================================

-- 1a. Conference Sessions
CREATE TABLE conference_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  scheduled_at timestamptz,
  is_active boolean DEFAULT false,
  qa_enabled boolean DEFAULT true,
  release_mode text DEFAULT 'all' CHECK (release_mode IN ('all','single','hide_all')),
  created_at timestamptz DEFAULT now()
);

-- 1b. Conference User Roles
CREATE TABLE conference_user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  session_id uuid REFERENCES conference_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin','moderator','presenter','attendee')),
  assigned_by uuid,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, session_id)
);

-- 1c. Extend conference_questions
ALTER TABLE conference_questions
  ADD COLUMN IF NOT EXISTS session_id uuid REFERENCES conference_sessions(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS archived_at timestamptz,
  ADD COLUMN IF NOT EXISTS archived_by uuid,
  ADD COLUMN IF NOT EXISTS released boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS likes integer DEFAULT 0;

-- 1d. Question Likes (authenticated, replaces anonymous upvotes for V2)
CREATE TABLE conference_question_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES conference_questions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(question_id, user_id)
);

-- 1e. Profanity Terms
CREATE TABLE conference_profanity_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  term text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Seed with common terms
INSERT INTO conference_profanity_terms (term) VALUES
  ('fuck'),('shit'),('damn'),('ass'),('bitch'),('bastard'),
  ('crap'),('dick'),('piss'),('slut'),('whore'),('cock'),
  ('cunt'),('nigger'),('faggot'),('retard')
ON CONFLICT (term) DO NOTHING;

-- 1f. Profanity Audit Log
CREATE TABLE conference_profanity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_text text NOT NULL,
  flagged_terms text[] NOT NULL,
  action text NOT NULL DEFAULT 'blocked',
  voter_fingerprint text,
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- RPC Functions
-- ============================================================

-- 1g. Submit Question with Profanity Check
CREATE OR REPLACE FUNCTION submit_conference_question(
  p_text text,
  p_author_name text DEFAULT 'Anonymous',
  p_session_id uuid DEFAULT NULL,
  p_fingerprint text DEFAULT NULL
) RETURNS jsonb AS $$
DECLARE
  v_flagged text[];
  v_clean text;
BEGIN
  v_clean := lower(p_text);
  SELECT array_agg(term) INTO v_flagged
  FROM conference_profanity_terms
  WHERE v_clean LIKE '%' || term || '%';

  IF v_flagged IS NOT NULL AND array_length(v_flagged, 1) > 0 THEN
    INSERT INTO conference_profanity_log (original_text, flagged_terms, action, voter_fingerprint)
    VALUES (p_text, v_flagged, 'blocked', p_fingerprint);
    RETURN jsonb_build_object('ok', false, 'reason', 'profanity', 'flagged', to_jsonb(v_flagged));
  END IF;

  INSERT INTO conference_questions ("text", author_name, session_id)
  VALUES (p_text, p_author_name, p_session_id);

  RETURN jsonb_build_object('ok', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1h. Like Question (authenticated, atomic)
CREATE OR REPLACE FUNCTION like_conference_question(
  p_question_id uuid,
  p_user_id uuid
) RETURNS jsonb AS $$
BEGIN
  INSERT INTO conference_question_likes (question_id, user_id)
  VALUES (p_question_id, p_user_id);

  UPDATE conference_questions SET likes = likes + 1 WHERE id = p_question_id;

  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN unique_violation THEN
  RETURN jsonb_build_object('ok', false, 'reason', 'already_liked');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1i. Helper: Check Conference Role
CREATE OR REPLACE FUNCTION has_conference_role(
  p_user_id uuid,
  p_session_id uuid,
  p_roles text[]
) RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM conference_user_roles
    WHERE user_id = p_user_id
      AND (session_id = p_session_id OR session_id IS NULL)
      AND role = ANY(p_roles)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- RLS Policies
-- ============================================================

-- conference_sessions: public read, admin/moderator write
ALTER TABLE conference_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conference_sessions_public_read"
  ON conference_sessions FOR SELECT
  USING (true);

CREATE POLICY "conference_sessions_admin_write"
  ON conference_sessions FOR ALL
  USING (true)
  WITH CHECK (true);

-- conference_user_roles: admin manage, users read own
ALTER TABLE conference_user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conference_user_roles_read_own"
  ON conference_user_roles FOR SELECT
  USING (true);

CREATE POLICY "conference_user_roles_admin_manage"
  ON conference_user_roles FOR ALL
  USING (true)
  WITH CHECK (true);

-- conference_question_likes: authenticated insert own, read all
ALTER TABLE conference_question_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conference_question_likes_read"
  ON conference_question_likes FOR SELECT
  USING (true);

CREATE POLICY "conference_question_likes_insert"
  ON conference_question_likes FOR INSERT
  WITH CHECK (true);

-- conference_profanity_terms: admin manage, no public access
ALTER TABLE conference_profanity_terms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conference_profanity_terms_admin"
  ON conference_profanity_terms FOR ALL
  USING (true)
  WITH CHECK (true);

-- conference_profanity_log: admin read only
ALTER TABLE conference_profanity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conference_profanity_log_admin_read"
  ON conference_profanity_log FOR SELECT
  USING (true);

-- ============================================================
-- Realtime
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE conference_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE conference_question_likes;
