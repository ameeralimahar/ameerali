"use client";

import { useState } from "react";
import type { Certification } from "@/types";

export default function CertificationsGrid({ certifications }: { certifications: Certification[] }) {
  const [filter, setFilter] = useState<"all" | number>("all");

  // Get unique years sorted descending
  const years = Array.from(
    new Set(
      certifications
        .filter((c) => c.issue_date)
        .map((c) => new Date(c.issue_date!).getFullYear())
    )
  ).sort((a, b) => b - a);

  // Filter certifications
  const filtered =
    filter === "all"
      ? certifications
      : certifications.filter((c) => c.issue_date && new Date(c.issue_date).getFullYear() === filter);

  return (
    <>
      {/* Filter tabs */}
      {years.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-xl border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
              filter === "all"
                ? "border-teal/40 bg-teal/10 text-teal"
                : "border-line text-muted hover:border-teal/20 hover:text-ink"
            }`}
          >
            All <span className="ml-1.5 opacity-60">({certifications.length})</span>
          </button>
          {years.map((year) => {
            const count = certifications.filter(
              (c) => c.issue_date && new Date(c.issue_date).getFullYear() === year
            ).length;
            return (
              <button
                key={year}
                onClick={() => setFilter(year)}
                className={`rounded-xl border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all ${
                  filter === year
                    ? "border-teal/40 bg-teal/10 text-teal"
                    : "border-line text-muted hover:border-teal/20 hover:text-ink"
                }`}
              >
                {year} <span className="ml-1.5 opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <p className="font-mono text-sm text-muted">No certifications for this period.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <div key={c.id} className="glass glass-hover rounded-2xl p-6 border border-line/50 flex flex-col">
              {/* Badge */}
              <div className="mb-5 flex items-start justify-between gap-3">
                {c.badge_image_url ? (
                  <div className="h-16 w-16 rounded-xl overflow-hidden bg-surface2 flex items-center justify-center border border-line/50 shrink-0">
                    <img
                      src={c.badge_image_url}
                      alt={`${c.issuer} badge`}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-teal/10 border border-teal/20 shrink-0">
                    <span className="text-3xl">🏆</span>
                  </div>
                )}
                {c.issue_date && (
                  <span className="font-mono text-xs text-muted bg-surface2 rounded-lg px-2 py-1 shrink-0">
                    {new Date(c.issue_date).getFullYear()}
                  </span>
                )}
              </div>

              <h3 className="font-display text-sm font-semibold text-ink leading-snug flex-1">
                {c.title}
              </h3>
              <p className="mt-2 font-mono text-xs text-teal">{c.issuer}</p>

              {c.credential_url && (
                <a
                  href={c.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-between rounded-xl border border-teal/20 bg-teal/5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-teal transition-all hover:bg-teal/10"
                >
                  <span>Verify Credential</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
