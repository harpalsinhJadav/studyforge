CREATE TABLE materials (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  type            TEXT NOT NULL CHECK (type IN ('pdf','pptx','doc','mp4','mp3','csv','image','url','voice')),
  status          TEXT NOT NULL DEFAULT 'uploading'
                    CHECK (status IN ('uploading','processing','ready','error')),
  file_url        TEXT,
  file_size       BIGINT,
  page_count      INTEGER,
  chapter_count   INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_materials_user_id ON materials(user_id);
CREATE INDEX idx_materials_status  ON materials(status);

CREATE TABLE chapters (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id     UUID NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  idx             INTEGER NOT NULL,
  summary         TEXT,
  key_concepts    JSONB NOT NULL DEFAULT '[]',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(material_id, idx)
);

CREATE TABLE chapter_progress (
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  chapter_id      UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  completion_pct  INTEGER NOT NULL DEFAULT 0 CHECK (completion_pct BETWEEN 0 AND 100),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, chapter_id)
);
