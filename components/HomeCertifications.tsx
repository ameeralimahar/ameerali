import Link from "next/link";
import type { Certification } from "@/types";

export default function HomeCertifications({ items }: { items: Certification[] }) {
  if (items.length === 0) return null;

  return (
    <section id="certifications" className="section-pad border-b border-line/50 relative overflow-hidden">
      <div className="orb orb-violet absolute right-0 bottom-0 h-64 w-64 opacity-10" />

      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-teal" />
              Credentials
            </div>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Certifications
            </h2>
          </div>
          <Link
            href="/certifications"
            className="hidden font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-teal sm:block"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((c) => (
            <div
              key={c.id}
              className="glass glass-hover rounded-2xl p-6 border border-line/50 flex flex-col"
            >
              {c.badge_image_url ? (
                <div className="mb-4 h-14 w-14 rounded-xl overflow-hidden bg-surface2 flex items-center justify-center">
                  <img src={c.badge_image_url} alt={c.issuer} className="h-10 w-10 object-contain" />
                </div>
              ) : (
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10 border border-teal/20">
                  <span className="text-2xl">🏆</span>
                </div>
              )}

              <h3 className="font-display text-sm font-semibold text-ink leading-snug line-clamp-3">
                {c.title}
              </h3>
              <p className="mt-2 font-mono text-xs text-teal">
                {c.issuer}
              </p>
              {c.issue_date && (
                <p className="mt-1 font-mono text-[10px] text-muted">
                  {new Date(c.issue_date).getFullYear()}
                </p>
              )}

              {c.credential_url && (
                <a
                  href={c.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-[10px] uppercase tracking-widest text-teal hover:opacity-80 transition-opacity"
                >
                  Verify →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
