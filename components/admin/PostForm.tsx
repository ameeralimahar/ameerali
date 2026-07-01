"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Post, ContentStatus } from "@/types";

type FormData = Pick<Post, "title" | "slug" | "excerpt" | "body" | "cover_image_url" | "status">;

const EMPTY: FormData = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  cover_image_url: "",
  status: "draft",
};

export default function PostForm({ post }: { post?: Post }) {
  const isEdit = !!post;
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(() =>
    post ? {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      body: post.body ?? "",
      cover_image_url: post.cover_image_url ?? "",
      status: post.status,
    } : EMPTY
  );

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const supabase = createClient();

    const payload = {
      ...form,
      excerpt: form.excerpt || null,
      body: form.body || null,
      cover_image_url: form.cover_image_url || null,
      published_at: form.status === "published" && (!post?.published_at) ? new Date().toISOString() : post?.published_at,
    };

    const { error } = isEdit
      ? await supabase.from("posts").update(payload).eq("id", post!.id)
      : await supabase.from("posts").insert(payload);

    if (error) { setError(error.message); return; }
    startTransition(() => router.push("/admin/posts"));
    router.refresh();
  }

  const inputCls = "rounded border border-line bg-surface px-3 py-2 font-body text-sm text-ink placeholder:text-muted focus:border-teal/60 focus:outline-none w-full";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-3xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Title *</label>
          <input
            required
            value={form.title}
            onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", autoSlug(e.target.value)); }}
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Slug *</label>
          <input required value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Excerpt</label>
        <textarea rows={2} value={form.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} className={inputCls} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Cover Image URL</label>
        <input type="url" value={form.cover_image_url ?? ""} onChange={(e) => set("cover_image_url", e.target.value)} className={inputCls} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Body (HTML)</label>
        <textarea
          rows={18}
          value={form.body ?? ""}
          onChange={(e) => set("body", e.target.value)}
          placeholder="<p>Your post content here...</p>"
          className={`${inputCls} font-mono text-xs`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Status</label>
        <select value={form.status} onChange={(e) => set("status", e.target.value as ContentStatus)} className={inputCls}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {error && <p className="font-mono text-xs text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-teal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/posts")}
          className="rounded border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted hover:border-teal/40 hover:text-ink transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
