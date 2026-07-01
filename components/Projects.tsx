import type { Project } from "@/types";

const categoryColor: Record<string, string> = {
  "Full-Stack": "text-teal",
  "AI-ML": "text-teal",
  Cloud: "text-teal",
  Data: "text-teal",
  Venture: "text-teal",
};

export default function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  if (projects.length === 0) {
    return (
      <section id="work" className="section-pad border-b border-line">
        <div className="mx-auto max-w-content px-6 sm:px-10">
          <p className="eyebrow">03 — Selected Work</p>
          <p className="mt-6 max-w-lg text-muted">
            No published projects yet. Add and publish projects from the
            admin dashboard (or the Supabase Table Editor) — they&apos;ll
            appear here automatically.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="section-pad border-b border-line">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
          <p className="eyebrow">03 — Selected Work</p>

          <div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>

            {more.length > 0 && (
              <details className="mt-10 group">
                <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-muted hover:text-teal">
                  More Projects ({more.length}) ↓
                </summary>
                <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                  {more.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col bg-bg p-7 transition-colors hover:bg-surface">
      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-[11px] uppercase tracking-widest ${
            categoryColor[project.category] ?? "text-teal"
          }`}
        >
          {project.category}
        </span>
        {project.source === "github_sync" && (
          <span
            title="Synced from GitHub"
            className="font-mono text-[10px] text-muted"
          >
            ⟲ synced
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold text-ink">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.tagline ?? project.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech_stack.map((s) => (
          <li
            key={s}
            className="rounded-sm border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
          >
            {s}
          </li>
        ))}
      </ul>

      {(project.demo_url || project.repo_url || project.video_url) && (
        <div className="mt-5 flex flex-wrap gap-4 border-t border-line pt-4">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-teal hover:opacity-80"
            >
              Live Demo →
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-teal"
            >
              Source →
            </a>
          )}
          {project.video_url && (
            <a
              href={project.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-teal"
            >
              Watch Demo →
            </a>
          )}
        </div>
      )}
    </article>
  );
}
