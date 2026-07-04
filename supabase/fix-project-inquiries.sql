-- ============================================================
-- Fix Project Inquiries Table and Policies
-- Run this if you're getting "Failed to save inquiry" errors
-- ============================================================

-- Drop existing policies if they exist
drop policy if exists "Allow public insert" on project_inquiries;
drop policy if exists "Allow authenticated read" on project_inquiries;
drop policy if exists "Allow authenticated update" on project_inquiries;

-- Recreate the table with proper structure
drop table if exists project_inquiries;

create table project_inquiries (
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

-- Allow ANYONE (including service role) to insert
create policy "Allow all insert"
  on project_inquiries
  for insert
  with check (true);

-- Allow service role to read (for admin dashboard)
create policy "Allow service role read"
  on project_inquiries
  for select
  using (true);

-- Allow service role to update (for status changes)
create policy "Allow service role update"
  on project_inquiries
  for update
  using (true);

-- Create indexes for faster queries
create index if not exists idx_project_inquiries_created_at on project_inquiries(created_at desc);
create index if not exists idx_project_inquiries_status on project_inquiries(status);

-- Test insert to verify it works
insert into project_inquiries (project_slug, project_title, inquiry_type, name, email, message)
values ('test-project', 'Test Project', 'discuss', 'Test User', 'test@example.com', 'This is a test inquiry');

-- Check that the test insert worked
select * from project_inquiries where email = 'test@example.com';

-- Delete the test record
delete from project_inquiries where email = 'test@example.com';

-- Verify table is ready
select 
  tablename,
  rowsecurity as rls_enabled
from pg_tables 
where tablename = 'project_inquiries';

-- Show all policies
select 
  policyname,
  cmd as command,
  qual as using_expression,
  with_check as with_check_expression
from pg_policies 
where tablename = 'project_inquiries';
