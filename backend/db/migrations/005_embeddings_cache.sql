-- Chunk embeddings for semantic search (Ask AI)
CREATE TABLE chunk_embeddings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id     UUID NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  chapter_id      UUID REFERENCES chapters(id) ON DELETE CASCADE,
  content         TEXT NOT NULL,
  embedding       VECTOR(1536) NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chunk_embeddings_material ON chunk_embeddings(material_id);
-- Approximate nearest-neighbor index for fast similarity search
CREATE INDEX idx_chunk_embeddings_vec
  ON chunk_embeddings USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Semantic cache: topic-mode results keyed by embedding (cosine ≥ 0.92)
CREATE TABLE semantic_cache (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_text      TEXT NOT NULL,
  embedding       VECTOR(1536) NOT NULL,
  chapters        JSONB NOT NULL,
  quizzes         JSONB NOT NULL,
  accessed_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at      TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '30 days'
);

CREATE INDEX idx_semantic_cache_vec
  ON semantic_cache USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 50);
