import Link from "next/link";
import type { Post } from "@/types";

function readTime(body: string | null) {
  if (!body) return "2 min read";
  return `${Math.max(1, Math.ceil(body.split(/\s+/).length / 200))} min read`;
}

export default function HomePosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section id="posts" className="section-pad border-b border-line/50 relative overflow-hidden">
      <div className="orb orb-violet absolute right-0 top-1/2 h-64 w-64 opacity-10" />
      <div className="mx-auto max-w-content px-6 sm:px-10">

        <div className="mb-12 reveal">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-teal" />Writing
          </div>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Posts & Articles</h2>
          <p className="mt-3 font-body text-base text-muted max-w-xl">
            Technical deep-dives, dev logs, and thoughts on building production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="group block reveal">
              <article className="glass-hover glass h-full rounded-2xl overflow-hidden border border-line/50 flex flex-col">
                {post.cover_image_url ? (
                  <div className="h-40 overflow-hidden">
                    <img src={post.cover_image_url} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-surface2 to-violetDim/30 flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-ink/10">✍</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-teal">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft"}
                    </span>
                    <span className="text-muted/40">·</span>
                    <span className="font-mono text-[10px] text-muted">{readTime(post.body)}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-ink group-hover:text-teal transition-colors line-clamp-2">{post.title}</h3>
                  {post.excerpt && <p className="mt-2 font-body text-sm text-muted line-clamp-3 flex-1">{post.excerpt}</p>}
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-teal transition-colors">Read More →</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
