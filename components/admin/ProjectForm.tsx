"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Project, ProjectCategory, ContentStatus } from "@/types";

type FormData = Omit<Project, "id" | "created_at" | "updated_at" | "stars" | "last_commit_at">;

const CATEGORIES: ProjectCategory[] = ["Full-Stack", "AI-ML", "Cloud", "Data", "Venture"];

const EMPTY: FormData = {
  title: "",
  slug: "",
  tagline: "",
  description: "",
  category: "Full-Stack",
  tech_stack: [],
  demo_url: "",
  repo_url: "",
  video_url: "",
  cover_image_url: "",
  featured: false,
  display_order: 0,
  status: "draft",
  source: "manual",
  github_repo_full_name: "",
};

export default function ProjectForm({
  project,
}: {
  project?: Project;
}) {
  const isEdit = !!project;
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");

  const [form, setForm] = useState<FormData>(() =>
    project
      ? {
          title: project.title,
          slug: project.slug,
          tagline: project.tagline ?? "",
          description: project.description ?? "",
          category: project.category,
          tech_stack: project.tech_stack ?? [],
          demo_url: project.demo_url ?? "",
          repo_url: project.repo_url ?? "",
          video_url: project.video_url ?? "",
          cover_image_url: project.cover_image_url ?? "",
          featured: project.featured,
          display_order: project.display_order,
          status: project.status,
          source: project.source,
          github_repo_full_name: project.github_repo_full_name ?? "",
        }
      : EMPTY
  );

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function addTech(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = techInput.trim();
      if (tag && !form.tech_stack.includes(tag)) {
        set("tech_stack", [...form.tech_stack, tag]);
      }
      setTechInput("");
    }
  }

  function removeTech(tag: string) {
    set("tech_stack", form.tech_stack.filter((t) => t !== tag));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const supabase = createClient();

    const payload = {
      ...form,
      tagline: form.tagline || null,
      description: form.description || null,
      demo_url: form.demo_url || null,
      repo_url: form.repo_url || null,
      video_url: form.video_url || null,
      cover_image_url: form.cover_image_url || null,
      github_repo_full_name: form.github_repo_full_name || null,
    };

    const { error } = isEdit
      ? await supabase.from("projects").update(payload).eq("id", project!.id)
      : await supabase.from("projects").insert(payload);

    if (error) {
      setError(error.message);
      return;
    }

    startTransition(() => router.push("/admin/projects"));
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      {/* Title + slug */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" required>
          <input
            required
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!isEdit) set("slug", autoSlug(e.target.value));
            }}
            className={inputCls}
          />
        </Field>
        <Field label="Slug" required>
          <input
            required
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Tagline">
        <input
          value={form.tagline ?? ""}
          onChange={(e) => set("tagline", e.target.value)}
          placeholder="One-liner for project cards"
          className={inputCls}
        />
      </Field>

      <Field label="Description">
        <textarea
          rows={4}
          value={form.description ?? ""}
          onChange={(e) => set("description", e.target.value)}
          className={inputCls}
        />
      </Field>

      {/* Category + status */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value as ProjectCategory)}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value as ContentStatus)}
            className={inputCls}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>
      </div>

      {/* Tech stack */}
      <Field label="Tech Stack (press Enter or comma to add)">
        <div className="flex flex-wrap gap-1.5 rounded border border-line bg-surface p-2">
          {form.tech_stack.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded bg-tealDim/30 px-2 py-0.5 font-mono text-xs text-teal"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTech(tag)}
                className="text-teal/60 hover:text-teal"
              >
                ×
              </button>
            </span>
          ))}
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={addTech}
            placeholder="e.g. TypeScript"
            className="flex-1 min-w-24 bg-transparent font-body text-sm text-ink placeholder:text-muted focus:outline-none"
          />
        </div>
      </Field>

      {/* URLs */}
      <Field label="Demo URL">
        <input type="url" value={form.demo_url ?? ""} onChange={(e) => set("demo_url", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Repo URL">
        <input type="url" value={form.repo_url ?? ""} onChange={(e) => set("repo_url", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Video URL">
        <input type="url" value={form.video_url ?? ""} onChange={(e) => set("video_url", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Cover Image URL">
        <input type="url" value={form.cover_image_url ?? ""} onChange={(e) => set("cover_image_url", e.target.value)} className={inputCls} />
      </Field>

      {/* Flags */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="accent-teal"
          />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Featured</span>
        </label>
        <Field label="Display Order" className="flex items-center gap-2">
          <input
            type="number"
            value={form.display_order}
            onChange={(e) => set("display_order", Number(e.target.value))}
            className={`${inputCls} w-20`}
          />
        </Field>
      </div>

      {error && <p className="font-mono text-xs text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-teal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="rounded border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-teal/40 hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
        {required && <span className="ml-1 text-teal">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "rounded border border-line bg-surface px-3 py-2 font-body text-sm text-ink placeholder:text-muted focus:border-teal/60 focus:outline-none w-full";
