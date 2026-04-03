CREATE TABLE quizzes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  material_id     UUID REFERENCES materials(id) ON DELETE SET NULL,
  topic_text      TEXT,
  difficulty      TEXT NOT NULL CHECK (difficulty IN ('basic','medium','advanced','pro')),
  questions       JSONB NOT NULL DEFAULT '[]',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE quiz_attempts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id         UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  answers         JSONB NOT NULL DEFAULT '{}',
  score           INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  xp_earned       INTEGER NOT NULL DEFAULT 0,
  time_taken_secs INTEGER NOT NULL DEFAULT 0,
  completed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
