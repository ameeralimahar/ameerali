# Ameer Ali — Portfolio v2 (Supabase-powered)

Phase 1 of the advanced portfolio: a dynamic, database-driven public site.
Every project, cert, and piece of site copy is stored in Supabase instead
of hardcoded — so the admin dashboard (Phase 2) and GitHub auto-sync can
both write into the same tables the public site reads from.

## What's in this phase

- Public site (Hero, About, Stats, Skills, Projects, Experience,
  Certifications, Contact) — all pulling live data from Supabase
- Full Postgres schema (`supabase/schema.sql`) covering projects, posts,
  certifications, achievements, page-view analytics, and site settings
- Seed data (`supabase/seed.sql`) with your real project history, seeded
  as **drafts** so nothing goes live until you review it
- Self-hosted analytics: every page view pings `page_views` anonymously
  (no cookies, no GA)
- GitHub auto-sync API route (`/api/sync-github`) + Vercel Cron config —
  pulls your repos daily and creates new ones as draft projects
- Row Level Security so the public can only ever read `status = 'published'`
  rows, and only an authenticated session (you) can write

## Not yet built (Phase 2)

- `/admin` dashboard UI (CRUD forms, analytics charts, rich text editor)
- Magic-link auth wiring for the admin route
- AI features (README → project description generator, RAG chatbot, etc.)

This phase is deliberately scoped so Phase 2 is additive — no schema or
architecture changes needed, just new routes and components on top.

## Setup

### 1. Create a Supabase project
Go to [supabase.com](https://supabase.com), create a new project, and grab
your Project URL + anon key from **Settings > API**.

### 2. Run the schema
Supabase dashboard → **SQL Editor** → paste and run `supabase/schema.sql`.

### 3. Seed placeholder content
Same SQL Editor → paste and run `supabase/seed.sql`. This inserts your
real project history as **drafts** — go to **Table Editor > projects**,
review each row, fill in `demo_url` / `repo_url` / `cover_image_url`
where you have them, then change `status` to `published` for the ones
you want live.

### 4. Environment variables
```bash
cp .env.example .env.local
```
Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
from step 1. For the GitHub sync route, also fill in
`SUPABASE_SERVICE_ROLE_KEY` (Settings > API > service_role — keep this
secret, never commit it) and `GITHUB_USERNAME`.

### 5. Run locally
```bash
npm install
npm run dev
```

### 6. Deploy to Vercel
```bash
vercel
```
Then add the same environment variables in **Vercel Project Settings >
Environment Variables** (including `CRON_SECRET`, which you generate
yourself — any long random string).

## GitHub auto-sync

Once deployed, Vercel Cron will hit `/api/sync-github` daily (see
`vercel.json` — adjust the schedule if you want it more/less frequent).
It pulls your public repos, skips forks/archives, and:
- Creates new repos as **draft** projects (never auto-publishes)
- Updates metadata (stars, last commit, description) on repos it already
  synced before, without touching your `status` or edits

You can also trigger it manually any time:
```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-site.vercel.app/api/sync-github
```

## Content model quick reference

| Table            | Purpose                                      |
|-------------------|-----------------------------------------------|
| `projects`         | Portfolio project cards + detail data          |
| `posts`            | Blog / dev-log entries (not yet rendered — Phase 2) |
| `certifications`   | Cert badges shown in the Certifications section |
| `achievements`     | Awards/milestones (schema ready, not yet rendered) |
| `page_views`       | Anonymous analytics pings                      |
| `site_settings`    | Single-row hero copy, contact links, resume URL |

## Next steps

Ready for Phase 2 whenever you are:
1. `/admin` dashboard with magic-link auth (Supabase Auth — just your
   email allow-listed)
2. CRUD UI for all tables above, drag-to-reorder, image/video upload via
   Supabase Storage
3. Analytics charts reading from `page_views`
4. AI features: RAG "Ask My Portfolio" chatbot, GitHub README →
   auto-generated project description, weekly traffic summaries
