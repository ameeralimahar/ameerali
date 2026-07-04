import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import ProjectsTable from "@/components/admin/ProjectsTable";
import type { Project } from "@/types";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const supabase = createClient();
  const statusFilter = searchParams.status ?? "all";

  // Fetch all projects sorted by created_at descending (newest first)
  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;
  const projects: Project[] = (data as Project[]) ?? [];

  // Count by status
  const allCount = projects.length;
  const publishedCount = projects.filter((p) => p.status === "published").length;
  const draftCount = projects.filter((p) => p.status === "draft").length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="eyebrow mb-1">Content</p>
          <h2 className="font-display text-2xl font-semibold text-ink">Projects</h2>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded bg-teal px-4 py-2 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90"
        >
          + New Project
        </Link>
      </div>

      {/* Status filter tabs */}
      <div className="mb-6 flex gap-1">
        {[
          { label: "all", count: allCount },
          { label: "published", count: publishedCount },
          { label: "draft", count: draftCount },
        ].map(({ label, count }) => (
          <Link
            key={label}
            href={`/admin/projects${label !== "all" ? `?status=${label}` : ""}`}
            className={`rounded px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
              statusFilter === label
                ? "bg-tealDim text-teal"
                : "text-muted hover:bg-surface2 hover:text-ink"
            }`}
          >
            {label} <span className="ml-1 opacity-60">({count})</span>
          </Link>
        ))}
      </div>

      {error && (
        <p className="mb-4 font-mono text-xs text-red-400">{error.message}</p>
      )}

      <ProjectsTable projects={projects} />
    </div>
  );
}
