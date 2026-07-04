import Nav from "@/components/Nav";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getAllProjects, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getAllProjects(), getSiteSettings()]);

  // Sort by created_at descending (newest first) - ensure published only
  const publishedProjects = projects
    .filter(p => p.status === 'published')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <main className="bg-bg min-h-screen">
      <Nav resumeUrl={settings.resume_url} />
      <div className="pt-24 pb-8 relative overflow-hidden">
        <div className="orb orb-teal absolute -left-32 top-0 h-96 w-96 opacity-10" />
        <div className="mx-auto max-w-content px-6 sm:px-10 pt-12">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-teal" />
            Portfolio
          </div>
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            All Projects
          </h1>
          <p className="mt-4 max-w-xl font-body text-lg text-muted">
            Production systems, AI/ML pipelines, cloud infrastructure, and everything in between.
          </p>
        </div>
      </div>
      <ProjectsGrid projects={publishedProjects} />
    </main>
  );
}
