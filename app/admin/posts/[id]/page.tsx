import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostForm from "@/components/admin/PostForm";
import type { Post } from "@/types";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*").eq("id", params.id).single();
  if (error || !data) notFound();

  return (
    <div>
      <p className="eyebrow mb-1">Posts</p>
      <h2 className="mb-8 font-display text-2xl font-semibold text-ink">Edit Post</h2>
      <PostForm post={data as Post} />
    </div>
  );
}
