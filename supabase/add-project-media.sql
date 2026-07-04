-- ============================================================
-- Add media gallery support to projects
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Add media_urls column to projects table (array of image/video URLs)
alter table projects add column if not exists media_urls text[] default '{}';

-- Update existing projects to include cover_image in media_urls if it exists
update projects 
set media_urls = array_append(media_urls, cover_image_url)
where cover_image_url is not null and cover_image_url != '';

-- Verify the update
select slug, cover_image_url, media_urls from projects limit 5;
