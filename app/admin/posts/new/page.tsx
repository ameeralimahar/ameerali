import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <p className="eyebrow mb-1">Posts</p>
      <h2 className="mb-8 font-display text-2xl font-semibold text-ink">New Post</h2>
      <PostForm />
    </div>
  );
}
