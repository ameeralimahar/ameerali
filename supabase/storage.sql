-- ============================================================
-- Supabase Storage setup for portfolio media uploads
-- Run this ONCE in Supabase SQL Editor
-- ============================================================

-- Create the bucket (public = files are accessible via public URL)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-media',
  'portfolio-media',
  true,
  209715200, -- 200 MB limit
  ARRAY[
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
    'video/mp4', 'video/webm', 'video/quicktime'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to READ public files (for displaying on the site)
CREATE POLICY "Public read portfolio media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

-- Allow uploads from the browser (anon key is fine since admin is PIN-protected)
-- The service_role key used server-side bypasses RLS entirely
CREATE POLICY "Allow portfolio media uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-media');

-- Allow deletes (for when you remove/replace a file)
CREATE POLICY "Allow portfolio media deletes"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-media');

-- ============================================================
-- After running this:
-- 1. Go to Storage in your Supabase dashboard to confirm
--    the 'portfolio-media' bucket appears
-- 2. You can now upload images/videos directly from the
--    admin dashboard (Projects > Edit, Posts > Edit)
-- ============================================================
