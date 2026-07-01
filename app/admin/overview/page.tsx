import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createClient();
  const [projects, posts, certs, achievements, views] = await Promise.all([
    supabase.from("projects").select("id, status", { count: "exact" }),
    supabase.from("posts").select("id, status", { count: "exact" }),
    supabase.from("certifications").select("id", { count: "exact" }),
    supabase.from("achievements").select("id", { count: "exact" }),
    supabase
      .from("page_views")
      .select("id", { count: "exact" })
      .gte("created_at", new Date(Date.now() - 7 * 86400_000).toISOString()),
  ]);

  const draftProjects =
    projects.data?.filter((p) => p.status === "draft").length ?? 0;

  return {
    totalProjects: projects.count ?? 0,
    draftProjects,
    totalPosts: posts.count ?? 0,
    totalCerts: certs.count ?? 0,
    totalAchievements: achievements.count ?? 0,
    views7d: views.count ?? 0,
  };
}

const SECTIONS = [
  { href: "/admin/projects", label: "Projects", desc: "Manage portfolio projects, review GitHub sync drafts" },
  { href: "/admin/posts", label: "Posts", desc: "Write and publish blog / dev-log entries" },
  { href: "/admin/certifications", label: "Certifications", desc: "Add or update certification badges" },
  { href: "/admin/achievements", label: "Achievements", desc: "Awards and milestones" },
  { href: "/admin/settings", label: "Settings", desc: "Hero copy, contact links, resume URL" },
  { href: "/admin/overview", label: "Analytics", desc: "Page views, top pages, referrers" },
];

export default async function OverviewPage() {
  const stats = await getStats();

  return (
    <div>
      <p className="eyebrow mb-1">Dashboard</p>
      <h2 className="mb-8 font-display text-2xl font-semibold text-ink">Overview</h2>

      {/* Stats row */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Projects", value: stats.totalProjects },
          { label: "Drafts", value: stats.draftProjects, highlight: stats.draftProjects > 0 },
          { label: "Posts", value: stats.totalPosts },
          { label: "Certs", value: stats.totalCerts },
          { label: "Achievements", value: stats.totalAchievements },
          { label: "Views (7d)", value: stats.views7d },
        ].map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`rounded border p-4 ${
              highlight ? "border-teal/40 bg-tealDim/20" : "border-line bg-surface"
            }`}
          >
            <p className="font-mono text-2xl font-medium text-ink">{value}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Section links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="group rounded border border-line bg-surface p-5 transition-colors hover:border-teal/40 hover:bg-surface2"
          >
            <p className="font-display text-sm font-semibold text-ink group-hover:text-teal transition-colors">
              {label}
            </p>
            <p className="mt-1 font-body text-xs text-muted">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
