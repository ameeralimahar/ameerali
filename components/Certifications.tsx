import type { Certification } from "@/types";

export default function Certifications({ items }: { items: Certification[] }) {
  if (items.length === 0) return null;

  return (
    <section id="certifications" className="section-pad border-b border-line">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
          <p className="eyebrow">05 — Certifications</p>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((c) => (
              <li
                key={c.id}
                className="rounded-sm border border-line bg-surface/40 p-5"
              >
                <h3 className="font-display text-sm font-semibold text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-muted">
                  {c.issuer}
                  {c.issue_date ? ` · ${new Date(c.issue_date).getFullYear()}` : ""}
                </p>
                {c.credential_url && (
                  <a
                    href={c.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-mono text-[11px] uppercase tracking-widest text-teal hover:opacity-80"
                  >
                    View Credential →
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
