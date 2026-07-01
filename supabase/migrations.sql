-- ============================================================
-- Migrations — run in Supabase SQL Editor if you already ran
-- schema.sql and need to add new columns.
-- Safe to run multiple times (uses IF NOT EXISTS).
-- ============================================================

-- Add image_url to achievements (added in v2)
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS image_url text;

-- ============================================================
-- Update storage bucket to allow PDF uploads (resume)
-- Run this if you see "mime type application/pdf is not supported"
-- ============================================================
UPDATE storage.buckets
SET allowed_mime_types = ARRAY[
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/webm', 'video/quicktime',
  'application/pdf'
]
WHERE id = 'portfolio-media';

-- Verify
SELECT id, allowed_mime_types FROM storage.buckets WHERE id = 'portfolio-media';
