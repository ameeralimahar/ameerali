-- ============================================================
-- Project Inquiries Table
-- Run this in your Supabase SQL Editor
-- ============================================================

create table if not exists project_inquiries (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null,
  project_title text not null,
  inquiry_type text not null check (inquiry_type in ('discuss', 'custom_version', 'hire', 'other')),
  name text not null,
  email text not null,
  message text,
  created_at timestamptz default now(),
  status text default 'new' check (status in ('new', 'read', 'responded', 'archived'))
);

-- Enable Row Level Security
alter table project_inquiries enable row level security;

-- Allow public insert only (for the inquiry form)
create policy "Allow public insert"
  on project_inquiries
  for insert
  to anon
  with check (true);

-- Allow authenticated admin read/update (for the dashboard)
create policy "Allow authenticated read"
  on project_inquiries
  for select
  to authenticated
  using (true);

create policy "Allow authenticated update"
  on project_inquiries
  for update
  to authenticated
  using (true);

-- Create index for faster queries
create index if not exists idx_project_inquiries_created_at on project_inquiries(created_at desc);
create index if not exists idx_project_inquiries_status on project_inquiries(status);
