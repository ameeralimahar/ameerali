import Nav from "@/components/Nav";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

function readTime(body: string | null): string {
  if (!body) return "2 min read";
  return `${Math.max(1, Math.ceil(body.split(/\s+/).length / 200))} min read`;
}

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <main className="bg-bg min-h-screen">
      <Nav />

      <div className="pt-24 pb-8 relative overflow-hidden">
        <div className="orb orb-violet absolute right-0 top-0 h-80 w-80 opacity-10" />
        <div className="mx-auto max-w-content px-6 sm:px-10 pt-12">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-teal" />
            Writing
          </div>
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            Posts & Articles
          </h1>
          <p className="mt-4 max-w-xl font-body text-lg text-muted">
            Technical deep-dives, dev logs, and thoughts on building production systems.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 sm:px-10 pb-20">
        {posts.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <p className="font-mono text-sm text-muted mb-2">No posts yet.</p>
            <p className="font-mono text-xs text-muted/60">Check back soon — AI-powered posts coming.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Featured post */}
            {posts[0] && (
              <Link href={`/posts/${posts[0].slug}`} className="group lg:col-span-3">
                <article className="glass glass-hover rounded-2xl overflow-hidden border border-line/50 lg:flex">
                  {posts[0].cover_image_url ? (
                    <div className="h-56 overflow-hidden lg:h-auto lg:w-2/5">
                      <img
                        src={posts[0].cover_image_url}
                        alt={posts[0].title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-56 bg-gradient-to-br from-surface2 to-violetDim/30 flex items-center justify-center lg:h-auto lg:w-2/5">
                      <span className="font-display text-6xl font-bold text-ink/10">✍</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-center p-8">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full border border-teal/20 bg-teal/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-teal">
                        Latest
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {posts[0].published_at
                          ? new Date(posts[0].published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                          : ""}
                      </span>
                      <span className="font-mono text-xs text-muted">{readTime(posts[0].body)}</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-ink group-hover:text-teal transition-colors sm:text-3xl">
                      {posts[0].title}
                    </h2>
                    {posts[0].excerpt && (
                      <p className="mt-3 font-body text-base text-muted leading-relaxed line-clamp-3">
                        {posts[0].excerpt}
                      </p>
                    )}
                    <div className="mt-6 font-mono text-xs uppercase tracking-widest text-teal">
                      Read Article →
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Rest */}
            {posts.slice(1).map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`} className="group block">
                <article className="glass glass-hover h-full rounded-2xl overflow-hidden border border-line/50 flex flex-col">
                  {post.cover_image_url ? (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gradient-to-br from-surface2 to-violetDim/20 flex items-center justify-center">
                      <span className="font-display text-4xl font-bold text-ink/10">✍</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-teal">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                          : ""}
                      </span>
                      <span className="text-line text-xs">·</span>
                      <span className="font-mono text-[10px] text-muted">{readTime(post.body)}</span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-ink group-hover:text-teal transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 flex-1 font-body text-sm text-muted line-clamp-3">{post.excerpt}</p>
                    )}
                    <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-teal transition-colors">
                      Read More →
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
