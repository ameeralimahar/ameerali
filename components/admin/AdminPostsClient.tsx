"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Post } from "@/types";

export default function AdminPostsClient({ posts: initial }: { posts: Post[] }) {
  const [posts, setPosts] = useState(initial);
  const [generating, setGenerating] = useState(false);
  const [genTopic, setGenTopic] = useState("");
  const [showGenModal, setShowGenModal] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const supabase = createClient();

  async function toggleStatus(post: Post) {
    const next = post.status === "published" ? "draft" : "published";
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, status: next } : p)));
    await supabase
      .from("posts")
      .update({ status: next, published_at: next === "published" ? new Date().toISOString() : null })
      .eq("id", post.id);
    startTransition(() => router.refresh());
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
    await supabase.from("posts").delete().eq("id", id);
    startTransition(() => router.refresh());
  }

  async function generatePost() {
    if (!genTopic.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/admin/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: genTopic }),
      });
      const data = await res.json();
      if (data.id) {
        setShowGenModal(false);
        setGenTopic("");
        startTransition(() => router.push(`/admin/posts/${data.id}`));
      } else {
        alert(data.error ?? "Failed to generate post");
      }
    } catch {
      alert("Failed to generate post");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div>
      {/* AI Generate button */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => setShowGenModal(true)}
          className="flex items-center gap-2 rounded border border-teal/30 bg-teal/8 px-4 py-2 font-mono text-xs uppercase tracking-widest text-teal transition-all hover:bg-teal/15"
        >
          🤖 AI Generate Post
        </button>
      </div>

      {/* AI Generate Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl border border-line/60 p-8 w-full max-w-md mx-4">
            <h3 className="font-display text-lg font-semibold text-ink mb-2">Generate Post with AI</h3>
            <p className="font-body text-sm text-muted mb-6">
              Gemini will write a full blog post about the topic. You can edit it before publishing.
            </p>
            <input
              value={genTopic}
              onChange={(e) => setGenTopic(e.target.value)}
              placeholder="e.g. Building OMR grading systems with OpenCV"
              className="w-full rounded border border-line bg-surface px-3 py-2.5 font-body text-sm text-ink placeholder:text-muted focus:border-teal/60 focus:outline-none mb-4"
              onKeyDown={(e) => e.key === "Enter" && generatePost()}
            />
            <div className="flex gap-3">
              <button
                onClick={generatePost}
                disabled={generating || !genTopic.trim()}
                className="flex-1 rounded bg-teal py-2.5 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {generating ? "Generating…" : "Generate"}
              </button>
              <button
                onClick={() => { setShowGenModal(false); setGenTopic(""); }}
                className="rounded border border-line px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts list */}
      {posts.length === 0 ? (
        <p className="font-body text-sm text-muted">
          No posts yet.{" "}
          <Link href="/admin/posts/new" className="text-teal hover:underline">Create one</Link>{" "}
          or use AI Generate above.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 rounded border border-line bg-surface px-4 py-3 hover:border-line/80 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <span className="font-body text-sm font-medium text-ink truncate block">{post.title}</span>
                {post.published_at && (
                  <span className="font-mono text-[10px] text-muted">
                    {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleStatus(post)}
                disabled={pending}
                className={`shrink-0 rounded px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  post.status === "published"
                    ? "bg-tealDim/40 text-teal hover:bg-tealDim/60"
                    : "bg-surface2 text-muted hover:bg-line hover:text-ink"
                }`}
              >
                {post.status}
              </button>

              <Link
                href={`/admin/posts/${post.id}`}
                className="shrink-0 font-mono text-xs text-muted hover:text-teal transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="shrink-0 font-mono text-xs text-muted hover:text-red-400 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
