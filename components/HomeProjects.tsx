import Link from "next/link";
import type { Project } from "@/types";

const CATEGORY_COLORS: Record<string, string> = {
  "Full-Stack": "text-teal border-teal/20 bg-teal/5",
  "AI-ML": "text-violet border-violet/30 bg-violet/5",
  "Cloud": "text-blue-400 border-blue-400/20 bg-blue-400/5",
  "Data": "text-amber-400 border-amber-400/20 bg-amber-400/5",
  "Venture": "text-pink-400 border-pink-400/20 bg-pink-400/5",
};

export default function HomeProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="section-pad border-b border-line/50 relative overflow-hidden">
      <div className="orb orb-teal absolute -left-32 bottom-0 h-80 w-80 opacity-10" />

      <div className="mx-auto max-w-content px-6 sm:px-10">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-teal" />
              Featured Work
            </div>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Selected Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-teal sm:block"
          >
            View All →
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="font-mono text-sm text-muted">No projects yet. Add them from the admin dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-block rounded-xl border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-teal/40 hover:text-teal"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const colorClass = CATEGORY_COLORS[project.category] ?? "text-teal border-teal/20 bg-teal/5";

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article className="glass-hover glass h-full rounded-2xl overflow-hidden border border-line/50 flex flex-col">
        {/* Cover image or gradient placeholder */}
        <div className="relative h-44 overflow-hidden bg-surface2">
          {project.cover_image_url ? (
            <img
              src={project.cover_image_url}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, #0D1526 0%, #${["0D3B35", "2E1065", "1a2d4e", "2d1a0e", "1a1a2e"][index % 5]} 100%)`,
              }}
            >
              <span className="font-display text-4xl font-bold opacity-20 text-ink">
                {project.title.charAt(0)}
              </span>
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 50%, rgba(45,212,191,0.15) 0%, transparent 60%)`,
                }}
              />
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${colorClass}`}>
              {project.category}
            </span>
          </div>
          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="rounded-full bg-teal/20 border border-teal/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-teal">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-base font-semibold text-ink group-hover:text-teal transition-colors line-clamp-2">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted line-clamp-3">
            {project.tagline ?? project.description}
          </p>

          {/* Tech stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 3).map((s) => (
              <span key={s} className="tech-badge">{s}</span>
            ))}
            {project.tech_stack.length > 3 && (
              <span className="tech-badge">+{project.tech_stack.length - 3}</span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-line/50 pt-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-teal transition-colors">
              View Details →
            </span>
            <div className="flex gap-3">
              {project.demo_url && (
                <span className="font-mono text-[10px] text-muted">Demo</span>
              )}
              {project.repo_url && (
                <span className="font-mono text-[10px] text-muted">Source</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
