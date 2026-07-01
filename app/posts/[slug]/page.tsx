import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { getPostBySlug, getAllPosts, getSiteSettings } from "@/lib/content";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

function readTime(body: string | null): string {
  if (!body) return "2 min read";
  return `${Math.max(1, Math.ceil(body.split(/\s+/).length / 200))} min read`;
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const [post, settings] = await Promise.all([
    getPostBySlug(params.slug),
    getSiteSettings(),
  ]);
  if (!post) notFound();

  return (
    <main className="bg-bg min-h-screen">
      <Nav resumeUrl={settings.resume_url} />

      <div className="mx-auto max-w-3xl px-6 sm:px-10 pt-32 pb-20">
        <Link
          href="/posts"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-teal transition-colors"
        >
          ← Back to Posts
        </Link>

        {/* Cover */}
        {post.cover_image_url && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-line/50 aspect-video">
            <img src={post.cover_image_url} alt={post.title} className="h-full w-full object-cover" />
          </div>
        )}

        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {post.published_at && (
            <span className="font-mono text-xs text-teal">
              {new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          )}
          <span className="text-line">·</span>
          <span className="font-mono text-xs text-muted">{readTime(post.body)}</span>
        </div>

        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-6 font-body text-xl text-teal/90 leading-relaxed border-l-2 border-teal/40 pl-6">
            {post.excerpt}
          </p>
        )}

        {/* Body */}
        {post.body && (
          <div className="mt-10 prose-portfolio" dangerouslySetInnerHTML={{ __html: post.body }} />
        )}

        {/* Footer */}
        <div className="mt-16 flex items-center justify-between border-t border-line/50 pt-8">
          <Link
            href="/posts"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-teal transition-colors"
          >
            ← All Posts
          </Link>
          <span className="font-mono text-xs text-muted">Ameer Ali</span>
        </div>
      </div>
    </main>
  );
}
