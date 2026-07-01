-- ============================================================
-- Migrations — run in Supabase SQL Editor if you already ran
-- schema.sql and need to add new columns.
-- Safe to run multiple times (uses IF NOT EXISTS).
-- ============================================================

-- Add image_url to achievements (added in v2)
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS image_url text;

-- Verify
SELECT column_name FROM information_schema.columns
WHERE table_name = 'achievements' AND column_name = 'image_url';
