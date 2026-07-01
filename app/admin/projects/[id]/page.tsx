import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project } from "@/types";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) notFound();

  const project = data as Project;

  return (
    <div>
      <p className="eyebrow mb-1">Projects</p>
      <h2 className="mb-2 font-display text-2xl font-semibold text-ink">
        {project.title}
      </h2>
      {project.source === "github_sync" && (
        <p className="mb-6 font-mono text-xs text-muted">
          <span className="rounded border border-line bg-surface2 px-1.5 py-0.5 uppercase tracking-wider">
            GitHub Sync
          </span>{" "}
          — review and edit before publishing.
        </p>
      )}
      {!project.description && project.source === "github_sync" && (
        <div className="mb-6 rounded border border-teal/20 bg-tealDim/10 px-4 py-3">
          <p className="font-mono text-xs text-teal">
            Tip: fill in Description and Tagline, then set Status → Published when ready.
          </p>
        </div>
      )}
      <ProjectForm project={project} />
    </div>
  );
}
