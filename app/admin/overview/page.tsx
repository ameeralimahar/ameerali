import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createClient();
  const [projects, posts, certs, achievements, views, recentViews] = await Promise.all([
    supabase.from("projects").select("id, status", { count: "exact" }),
    supabase.from("posts").select("id, status", { count: "exact" }),
    supabase.from("certifications").select("id", { count: "exact" }),
    supabase.from("achievements").select("id", { count: "exact" }),
    supabase.from("page_views").select("id", { count: "exact" }).gte("created_at", new Date(Date.now() - 7 * 86400_000).toISOString()),
    supabase.from("page_views").select("path, created_at").order("created_at", { ascending: false }).limit(5),
  ]);

  const publishedProjects = projects.data?.filter((p) => p.status === "published").length ?? 0;
  const draftProjects = projects.data?.filter((p) => p.status === "draft").length ?? 0;
  const publishedPosts = posts.data?.filter((p) => p.status === "published").length ?? 0;

  return {
    totalProjects: projects.count ?? 0,
    publishedProjects,
    draftProjects,
    totalPosts: posts.count ?? 0,
    publishedPosts,
    totalCerts: certs.count ?? 0,
    totalAchievements: achievements.count ?? 0,
    views7d: views.count ?? 0,
    recentViews: recentViews.data ?? [],
  };
}

const SECTIONS = [
  { href: "/admin/projects", label: "Projects", icon: "⌨️", desc: "Manage & publish portfolio projects", color: "teal" },
  { href: "/admin/posts", label: "Posts", icon: "✍️", desc: "Write posts or AI-generate with Gemini", color: "violet" },
  { href: "/admin/certifications", label: "Certifications", icon: "🏆", desc: "Add certifications with badges & links", color: "blue" },
  { href: "/admin/achievements", label: "Achievements", icon: "🏅", desc: "Milestones and awards", color: "amber" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️", desc: "Hero copy, contact links, resume URL", color: "pink" },
];

const COLOR_MAP: Record<string, string> = {
  teal: "bg-teal/10 border-teal/20 text-teal",
  violet: "bg-violet/10 border-violet/20 text-violet",
  blue: "bg-blue-400/10 border-blue-400/20 text-blue-400",
  amber: "bg-amber-400/10 border-amber-400/20 text-amber-400",
  pink: "bg-pink-400/10 border-pink-400/20 text-pink-400",
};

export default async function OverviewPage() {
  const stats = await getStats();
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="eyebrow mb-1">{greeting}, Ameer</p>
          <h1 className="font-display text-3xl font-bold text-ink">Dashboard</h1>
          <p className="mt-1 font-mono text-xs text-muted">
            {now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 font-mono text-xs text-muted transition-all hover:border-teal/40 hover:text-teal"
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          View Site
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Total Projects", value: stats.totalProjects, sub: `${stats.publishedProjects} published`, color: "text-teal" },
          { label: "Draft Projects", value: stats.draftProjects, sub: "awaiting review", color: stats.draftProjects > 0 ? "text-amber-400" : "text-muted" },
          { label: "Posts", value: stats.totalPosts, sub: `${stats.publishedPosts} live`, color: "text-violet" },
          { label: "Certifications", value: stats.totalCerts, sub: "verified", color: "text-blue-400" },
          { label: "Achievements", value: stats.totalAchievements, sub: "milestones", color: "text-amber-400" },
          { label: "Views (7d)", value: stats.views7d, sub: "page views", color: "text-pink-400" },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="glass rounded-2xl border border-line/50 p-4 hover:border-teal/20 transition-colors">
            <p className={`font-display text-3xl font-bold ${color}`}>{value}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-ink">{label}</p>
            <p className="mt-1 font-mono text-[9px] text-muted">{sub}</p>
          </div>
        ))}
      </div>

      {/* Quick actions + recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick actions */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SECTIONS.map(({ href, label, icon, desc, color }) => (
              <Link
                key={href}
                href={href}
                className="group glass glass-hover rounded-2xl border border-line/50 p-5 flex items-start gap-4"
              >
                <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xl ${COLOR_MAP[color]}`}>
                  {icon}
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink group-hover:text-teal transition-colors">{label}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
            <Link
              href="/admin/projects/new"
              className="group glass glass-hover rounded-2xl border border-dashed border-teal/30 p-5 flex items-center justify-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 border border-teal/20 text-teal text-xl">+</span>
              <div>
                <p className="font-display text-sm font-semibold text-teal">New Project</p>
                <p className="font-mono text-[10px] text-muted">Add a project manually</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="mb-4 font-display text-base font-semibold text-ink">Recent Visitors</h2>
          <div className="glass rounded-2xl border border-line/50 p-4">
            {stats.recentViews.length === 0 ? (
              <p className="font-mono text-xs text-muted text-center py-4">No visits yet</p>
            ) : (
              <div className="space-y-3">
                {stats.recentViews.map((v, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-ink truncate">{v.path || "/"}</p>
                      <p className="font-mono text-[9px] text-muted">
                        {new Date(v.created_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 border-t border-line/50 pt-3">
              <p className="font-mono text-[10px] text-muted text-center">
                {stats.views7d} views in last 7 days
              </p>
            </div>
          </div>

          {/* Draft reminder */}
          {stats.draftProjects > 0 && (
            <div className="mt-4 glass rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
              <div className="flex items-start gap-3">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="font-display text-sm font-semibold text-amber-400">
                    {stats.draftProjects} draft project{stats.draftProjects > 1 ? "s" : ""}
                  </p>
                  <p className="font-mono text-[10px] text-muted mt-0.5">Review and publish when ready</p>
                  <Link href="/admin/projects?status=draft" className="mt-2 inline-block font-mono text-[10px] text-amber-400 hover:opacity-80">
                    Review drafts →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
