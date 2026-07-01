import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import AdminPostsClient from "@/components/admin/AdminPostsClient";
import type { Post } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const posts: Post[] = (data as Post[]) ?? [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="eyebrow mb-1">Content</p>
          <h2 className="font-display text-2xl font-semibold text-ink">Posts</h2>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded bg-teal px-4 py-2 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90"
        >
          + New Post
        </Link>
      </div>
      <AdminPostsClient posts={posts} />
    </div>
  );
}
