"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/types";

const CATEGORIES = ["All", "Full-Stack", "AI-ML", "Cloud", "Data", "Venture"];

const CATEGORY_COLORS: Record<string, string> = {
  "Full-Stack": "text-teal border-teal/20 bg-teal/5",
  "AI-ML": "text-violet border-violet/30 bg-violet/5",
  "Cloud": "text-blue-400 border-blue-400/20 bg-blue-400/5",
  "Data": "text-amber-400 border-amber-400/20 bg-amber-400/5",
  "Venture": "text-pink-400 border-pink-400/20 bg-pink-400/5",
};

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-content px-6 sm:px-10 pb-20">
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
          if (cat !== "All" && count === 0) return null;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-xl border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
                active === cat
                  ? "border-teal/40 bg-teal/10 text-teal"
                  : "border-line text-muted hover:border-teal/20 hover:text-ink"
              }`}
            >
              {cat}
              <span className="ml-1.5 opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <p className="font-mono text-sm text-muted">No projects in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="group block">
              <article className="glass-hover glass h-full rounded-2xl overflow-hidden border border-line/50 flex flex-col">
                {/* Cover */}
                <div className="relative h-48 overflow-hidden bg-surface2">
                  {p.cover_image_url ? (
                    <img
                      src={p.cover_image_url}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, #0D1526 0%, #${["0D3B35", "2E1065", "1a2d4e", "2d1a0e", "1a1a2e"][i % 5]} 100%)`,
                      }}
                    >
                      <span className="font-display text-5xl font-bold opacity-10 text-ink">{p.title.charAt(0)}</span>
                      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, rgba(45,212,191,0.15) 0%, transparent 60%)` }} />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${CATEGORY_COLORS[p.category] ?? "text-teal border-teal/20 bg-teal/5"}`}>
                      {p.category}
                    </span>
                  </div>
                  {p.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-teal/20 border border-teal/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-teal">Featured</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-base font-semibold text-ink group-hover:text-teal transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted line-clamp-3">
                    {p.tagline ?? p.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech_stack.slice(0, 3).map((s) => (
                      <span key={s} className="tech-badge">{s}</span>
                    ))}
                    {p.tech_stack.length > 3 && (
                      <span className="tech-badge">+{p.tech_stack.length - 3}</span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line/50 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-teal transition-colors">
                      View Details →
                    </span>
                    <div className="flex gap-2">
                      {p.demo_url && <span className="font-mono text-[10px] text-muted">Demo</span>}
                      {p.repo_url && <span className="font-mono text-[10px] text-muted">Code</span>}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
