import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { getProjectBySlug, getAllProjects, getSiteSettings } from "@/lib/content";
import Link from "next/link";
import ProjectDetailClient from "@/components/ProjectDetailClient";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [project, settings] = await Promise.all([
    getProjectBySlug(params.slug),
    getSiteSettings(),
  ]);
  if (!project) notFound();

  const CATEGORY_COLORS: Record<string, string> = {
    "Full-Stack": "text-teal border-teal/20 bg-teal/5",
    "AI-ML": "text-violet border-violet/30 bg-violet/5",
    "Cloud": "text-blue-400 border-blue-400/20 bg-blue-400/5",
    "Data": "text-amber-400 border-amber-400/20 bg-amber-400/5",
    "Venture": "text-pink-400 border-pink-400/20 bg-pink-400/5",
  };

  const colorClass = CATEGORY_COLORS[project.category] ?? "text-teal border-teal/20 bg-teal/5";

  return (
    <main className="bg-bg min-h-screen">
      <Nav resumeUrl={settings.resume_url} />

      <div className="mx-auto max-w-content px-6 sm:px-10 pt-32 pb-20">
        {/* Back */}
        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-teal transition-colors"
        >
          ← Back to Projects
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main */}
          <div>
            {/* Hero image */}
            {project.cover_image_url ? (
              <div className="mb-8 overflow-hidden rounded-2xl border border-line/50 aspect-video">
                <img
                  src={project.cover_image_url}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="mb-8 overflow-hidden rounded-2xl border border-line/50 aspect-video bg-surface2 flex items-center justify-center relative">
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(45,212,191,0.1) 0%, transparent 60%)" }} />
                <span className="font-display text-8xl font-bold text-ink/5">{project.title.charAt(0)}</span>
              </div>
            )}

            {/* Video embed */}
            {project.video_url && (
              <div className="mb-8 overflow-hidden rounded-2xl border border-line/50 aspect-video">
                <iframe
                  src={project.video_url.replace("watch?v=", "embed/")}
                  title={`${project.title} demo`}
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${colorClass}`}>
                {project.category}
              </span>
              {project.featured && (
                <span className="rounded-full bg-teal/10 border border-teal/20 px-3 py-1 font-mono text-xs uppercase tracking-wider text-teal">
                  Featured
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            {project.tagline && (
              <p className="mt-4 font-body text-xl text-teal font-medium">{project.tagline}</p>
            )}

            {project.description && (
              <div className="mt-8 prose-portfolio">
                <p>{project.description}</p>
              </div>
            )}

            {/* Tech stack */}
            {project.tech_stack.length > 0 && (
              <div className="mt-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className="font-display text-lg font-semibold text-ink">Tech Stack</h2>
                  <ProjectDetailClient projectSlug={project.slug} projectTitle={project.title} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((s) => (
                    <span key={s} className="tech-badge text-sm px-3 py-1.5">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Links card */}
            <div className="glass rounded-2xl p-6 border border-line/50">
              <h3 className="font-display text-sm font-semibold text-ink mb-4">Project Links</h3>
              <div className="space-y-3">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-between rounded-xl border border-teal/20 bg-teal/5 px-4 py-3 font-mono text-xs uppercase tracking-widest text-teal transition-all hover:bg-teal/10"
                  >
                    <span>Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-all hover:border-teal/30 hover:text-teal"
                  >
                    <span>Source Code</span>
                    <span>↗</span>
                  </a>
                )}
                {project.video_url && !project.video_url.includes("youtube") && (
                  <a
                    href={project.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-all hover:border-teal/30 hover:text-teal"
                  >
                    <span>Watch Demo</span>
                    <span>↗</span>
                  </a>
                )}
                {!project.demo_url && !project.repo_url && !project.video_url && (
                  <p className="font-mono text-xs text-muted">No links available</p>
                )}
              </div>
            </div>

            {/* Meta card */}
            <div className="glass rounded-2xl p-6 border border-line/50">
              <h3 className="font-display text-sm font-semibold text-ink mb-4">Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">Category</dt>
                  <dd className="mt-0.5 font-body text-sm text-ink">{project.category}</dd>
                </div>
                {project.stars > 0 && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">GitHub Stars</dt>
                    <dd className="mt-0.5 font-body text-sm text-ink">⭐ {project.stars}</dd>
                  </div>
                )}
                {project.last_commit_at && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">Last Updated</dt>
                    <dd className="mt-0.5 font-body text-sm text-ink">
                      {new Date(project.last_commit_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">Source</dt>
                  <dd className="mt-0.5 font-mono text-xs text-muted capitalize">{project.source.replace("_", " ")}</dd>
                </div>
              </dl>
            </div>

            {/* Back to all */}
            <Link
              href="/projects"
              className="block w-full text-center rounded-xl border border-line px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-all hover:border-teal/40 hover:text-teal"
            >
              ← All Projects
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
