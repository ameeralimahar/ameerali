-- ============================================================
-- Ameer Ali Portfolio — Supabase Schema
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query)
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- PROJECTS
-- ------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  tagline text,                          -- short one-liner for cards
  description text,                      -- longer body for the detail view
  category text not null default 'Full-Stack',  -- Full-Stack | AI-ML | Cloud | Data | Venture
  tech_stack text[] default '{}',
  demo_url text,
  repo_url text,
  video_url text,
  cover_image_url text,
  featured boolean default false,        -- show in main grid vs "more projects"
  display_order int default 0,
  status text not null default 'draft',  -- draft | published
  source text not null default 'manual', -- manual | github_sync
  github_repo_full_name text,            -- e.g. "ameeralimahar/voicebox", set when source = github_sync
  stars int default 0,
  last_commit_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ------------------------------------------------------------
-- POSTS (blog / dev-log / updates)
-- ------------------------------------------------------------
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  body text,                             -- markdown or rich text (Tiptap JSON as text)
  cover_image_url text,
  status text not null default 'draft',  -- draft | published
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ------------------------------------------------------------
-- CERTIFICATIONS
-- ------------------------------------------------------------
create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issue_date date,
  credential_url text,
  badge_image_url text,
  display_order int default 0,
  status text not null default 'published',
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- ACHIEVEMENTS
-- ------------------------------------------------------------
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date date,
  link_url text,
  display_order int default 0,
  status text not null default 'published',
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- PAGE VIEWS (self-hosted analytics)
-- ------------------------------------------------------------
create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  country text,
  device_type text,                      -- mobile | desktop | tablet
  project_slug text,                     -- set when the view is a project detail/click-through
  session_id text,                       -- anonymous, client-generated, no cookies/PII
  created_at timestamptz default now()
);

create index if not exists idx_page_views_created_at on page_views (created_at);
create index if not exists idx_page_views_path on page_views (path);

-- ------------------------------------------------------------
-- SITE SETTINGS (single row — hero text, contact links, resume URL, etc.)
-- ------------------------------------------------------------
create table if not exists site_settings (
  id int primary key default 1,
  hero_heading text,
  hero_subheading text,
  email text,
  github_url text,
  linkedin_url text,
  resume_url text,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

insert into site_settings (id, hero_heading, hero_subheading, email, github_url, linkedin_url, resume_url)
values (
  1,
  'I build systems that grade, verify, and scale — to millions of people.',
  'Full-stack web platforms, cloud infrastructure, and AI/ML & computer-vision pipelines — shipped in production.',
  'ameer@example.com',
  'https://github.com/ameeralimahar',
  'https://www.linkedin.com/in/ameeralimahar',
  '/resume.pdf'
)
on conflict (id) do nothing;

-- ------------------------------------------------------------
-- updated_at auto-touch trigger (reusable)
-- ------------------------------------------------------------
create or replace function touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on projects;
create trigger trg_projects_updated_at before update on projects
  for each row execute function touch_updated_at();

drop trigger if exists trg_posts_updated_at on posts;
create trigger trg_posts_updated_at before update on posts
  for each row execute function touch_updated_at();

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- Public (anon) can only READ published rows.
-- All writes require an authenticated session (you, via magic link).
-- ------------------------------------------------------------
alter table projects enable row level security;
alter table posts enable row level security;
alter table certifications enable row level security;
alter table achievements enable row level security;
alter table page_views enable row level security;
alter table site_settings enable row level security;

-- Public read: published only
create policy "public read published projects" on projects
  for select using (status = 'published');

create policy "public read published posts" on posts
  for select using (status = 'published');

create policy "public read published certifications" on certifications
  for select using (status = 'published');

create policy "public read published achievements" on achievements
  for select using (status = 'published');

create policy "public read site settings" on site_settings
  for select using (true);

-- Public can INSERT page views (anonymous analytics pings), never read them back
create policy "public insert page views" on page_views
  for insert with check (true);

-- Authenticated (you) can do everything
create policy "admin full access projects" on projects
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin full access posts" on posts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin full access certifications" on certifications
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin full access achievements" on achievements
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin read page views" on page_views
  for select using (auth.role() = 'authenticated');

create policy "admin update site settings" on site_settings
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
