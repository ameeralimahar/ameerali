"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/types";

export default function ProjectsTable({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initial);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const supabase = createClient();

  async function toggleStatus(project: Project) {
    const next = project.status === "published" ? "draft" : "published";
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, status: next } : p))
    );
    await supabase.from("projects").update({ status: next }).eq("id", project.id);
    startTransition(() => router.refresh());
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    await supabase.from("projects").delete().eq("id", id);
    startTransition(() => router.refresh());
  }

  async function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const reordered = Array.from(projects);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setProjects(reordered);

    // Persist new display_order values
    await Promise.all(
      reordered.map((p, i) =>
        supabase.from("projects").update({ display_order: i }).eq("id", p.id)
      )
    );
    startTransition(() => router.refresh());
  }

  if (projects.length === 0) {
    return (
      <p className="font-body text-sm text-muted">
        No projects found.{" "}
        <Link href="/admin/projects/new" className="text-teal hover:underline">
          Create one
        </Link>
        .
      </p>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="projects">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-2"
          >
            {projects.map((project, index) => (
              <Draggable key={project.id} draggableId={project.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-center gap-4 rounded border px-4 py-3 transition-colors ${
                      snapshot.isDragging
                        ? "border-teal/40 bg-surface2"
                        : "border-line bg-surface hover:border-line/80"
                    }`}
                  >
                    {/* Drag handle */}
                    <span
                      {...provided.dragHandleProps}
                      className="cursor-grab text-muted select-none"
                      title="Drag to reorder"
                    >
                      ⠿
                    </span>

                    {/* Title + badges */}
                    <div className="flex flex-1 flex-wrap items-center gap-2 min-w-0">
                      <span className="font-body text-sm font-medium text-ink truncate">
                        {project.title}
                      </span>
                      {project.source === "github_sync" && (
                        <span className="rounded bg-surface2 border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                          GitHub Sync
                        </span>
                      )}
                      {project.featured && (
                        <span className="rounded bg-tealDim/30 border border-teal/20 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-teal">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Category */}
                    <span className="hidden font-mono text-xs text-muted sm:block shrink-0">
                      {project.category}
                    </span>

                    {/* Status toggle */}
                    <button
                      onClick={() => toggleStatus(project)}
                      disabled={pending}
                      className={`shrink-0 rounded px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                        project.status === "published"
                          ? "bg-tealDim/40 text-teal hover:bg-tealDim/60"
                          : "bg-surface2 text-muted hover:bg-line hover:text-ink"
                      }`}
                    >
                      {project.status}
                    </button>

                    {/* Actions */}
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="shrink-0 font-mono text-xs text-muted hover:text-teal transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="shrink-0 font-mono text-xs text-muted hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
