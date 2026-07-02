import Link from "next/link";
import type { Project } from "@/types";

const CAT_COLORS: Record<string, string> = {
  "Full-Stack": "text-teal border-teal/20 bg-teal/5",
  "AI-ML":      "text-violet border-violet/30 bg-violet/5",
  "Cloud":      "text-blue-400 border-blue-400/20 bg-blue-400/5",
  "Data":       "text-amber-400 border-amber-400/20 bg-amber-400/5",
  "Venture":    "text-pink-400 border-pink-400/20 bg-pink-400/5",
};

const GRADIENTS = ["#0D3B35","#2E1065","#1a2d4e","#2d1a0e","#1a1a2e"];

export default function HomeProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="section-pad border-b border-line/50 relative overflow-hidden">
      <div className="orb orb-teal absolute -left-32 bottom-0 h-80 w-80 opacity-10" />
      <div className="mx-auto max-w-content px-6 sm:px-10">

        <div className="mb-12 reveal">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-teal" />Portfolio
          </div>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">All Projects</h2>
          <p className="mt-3 font-body text-base text-muted max-w-xl">
            Production systems, AI/ML pipelines, cloud infrastructure, and everything in between.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center reveal">
            <p className="font-mono text-sm text-muted">No projects yet. Add them from the admin dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger">
            {projects.map((p, i) => (
              <div key={p.id} className="reveal">
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const colorClass = CAT_COLORS[p.category] ?? "text-teal border-teal/20 bg-teal/5";
  return (
    <Link href={`/projects/${p.slug}`} className="group block h-full">
      <article className="glass-hover glass h-full rounded-2xl overflow-hidden border border-line/50 flex flex-col">
        <div className="relative h-44 overflow-hidden bg-surface2">
          {p.cover_image_url ? (
            <img src={p.cover_image_url} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, #0D1526 0%, ${GRADIENTS[index % 5]} 100%)` }}>
              <span className="font-display text-4xl font-bold opacity-20 text-ink">{p.title.charAt(0)}</span>
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, rgba(45,212,191,0.15) 0%, transparent 60%)` }} />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${colorClass}`}>{p.category}</span>
          </div>
          {p.featured && (
            <div className="absolute top-3 right-3">
              <span className="rounded-full bg-teal/20 border border-teal/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-teal">Featured</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-base font-semibold text-ink group-hover:text-teal transition-colors line-clamp-2">{p.title}</h3>
          <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted line-clamp-3">{p.tagline ?? p.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tech_stack.slice(0, 3).map((s) => <span key={s} className="tech-badge">{s}</span>)}
            {p.tech_stack.length > 3 && <span className="tech-badge">+{p.tech_stack.length - 3}</span>}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line/50 pt-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-teal transition-colors">View Details →</span>
            <div className="flex gap-3">
              {p.demo_url && <span className="font-mono text-[10px] text-muted">Demo</span>}
              {p.repo_url && <span className="font-mono text-[10px] text-muted">Code</span>}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
