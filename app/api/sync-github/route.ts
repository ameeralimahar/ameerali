import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * GitHub → Supabase sync.
 *
 * Pulls the authenticated GitHub user's repos and upserts each one as a
 * DRAFT project (source = 'github_sync'). Never auto-publishes — you
 * review and flip status to 'published' yourself (via the admin
 * dashboard in Phase 2, or the Supabase Table Editor for now), so junk
 * repos, forks, and half-finished experiments never leak onto the
 * public site automatically.
 *
 * Trigger this route two ways:
 *  1. Vercel Cron (see vercel.json) — runs on a schedule automatically.
 *  2. A GitHub webhook on `push` events pointed at this URL, for
 *     near-instant sync instead of waiting for the next cron tick.
 *
 * Auth: requires a `CRON_SECRET` bearer token so this endpoint can't be
 * triggered by randoms hitting the URL.
 */

// Use the service role key here (server-only, never exposed to the
// browser) since this route needs to bypass RLS to write projects.
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const githubUsername = process.env.GITHUB_USERNAME;
  const githubToken = process.env.GITHUB_TOKEN; // optional, raises rate limit

  if (!githubUsername) {
    return NextResponse.json(
      { error: "GITHUB_USERNAME env var not set" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
      },
      // Don't let Next.js cache GitHub's response
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: `GitHub API error: ${res.status}` },
      { status: 502 }
    );
  }

  const repos: GitHubRepo[] = await res.json();
  const supabase = getAdminClient();

  const results: { repo: string; action: string }[] = [];

  for (const repo of repos) {
    // Skip forks and archived repos — these are almost never
    // portfolio-worthy and would just create noise to review.
    if (repo.fork || repo.archived) continue;

    const slug = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // Check if this repo was already synced before
    const { data: existing } = await supabase
      .from("projects")
      .select("id, status")
      .eq("github_repo_full_name", repo.full_name)
      .maybeSingle();

    const payload = {
      title: repo.name,
      slug,
      tagline: repo.description ?? null,
      tech_stack: repo.language ? [repo.language] : [],
      repo_url: repo.html_url,
      category: "Full-Stack" as const,
      source: "github_sync" as const,
      github_repo_full_name: repo.full_name,
      stars: repo.stargazers_count,
      last_commit_at: repo.pushed_at,
    };

    if (existing) {
      // Update metadata only — never touch `status`, so a project you've
      // already reviewed and published/kept-as-draft isn't reset.
      await supabase.from("projects").update(payload).eq("id", existing.id);
      results.push({ repo: repo.full_name, action: "updated" });
    } else {
      await supabase
        .from("projects")
        .insert({ ...payload, status: "draft", featured: false });
      results.push({ repo: repo.full_name, action: "created_as_draft" });
    }
  }

  return NextResponse.json({ synced: results.length, results });
}
