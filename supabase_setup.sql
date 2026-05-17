-- Run this SQL in your Supabase SQL Editor
-- Dashboard > SQL Editor > New Query

CREATE TABLE IF NOT EXISTS funnel_answers (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  text NOT NULL,
  question_1  text,
  question_2  text,
  question_3  text,
  question_4  text,
  completed   boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE funnel_answers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts and updates (for the funnel)
CREATE POLICY "Allow anon insert" ON funnel_answers
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon update own session" ON funnel_answers
  FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow anon select own session" ON funnel_answers
  FOR SELECT TO anon USING (true);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_funnel_session ON funnel_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_funnel_created ON funnel_answers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_funnel_completed ON funnel_answers(completed);
