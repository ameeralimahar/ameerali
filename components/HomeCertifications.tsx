"use client";
import { useState } from "react";
import type { Certification } from "@/types";

const INITIAL_DISPLAY = 6;

export default function HomeCertifications({ items }: { items: Certification[] }) {
  const [showAll, setShowAll] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (items.length === 0) return null;

  const displayItems = showAll ? items : items.slice(0, INITIAL_DISPLAY);
  const hasMore = items.length > INITIAL_DISPLAY;

  return (
    <section id="certifications" className="section-pad border-b border-line/50 relative overflow-hidden">
      <div className="orb orb-violet absolute right-0 bottom-0 h-64 w-64 opacity-10" />
      <div className="mx-auto max-w-content px-6 sm:px-10">

        <div className="mb-12 reveal">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-teal" />Credentials
          </div>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Certifications</h2>
          <p className="mt-3 font-body text-base text-muted max-w-xl">
            Verified credentials and continuous learning milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger">
          {displayItems.map((c) => (
            <div key={c.id} className="glass glass-hover rounded-2xl p-6 border border-line/50 flex flex-col reveal">
              {c.badge_image_url ? (
                <button 
                  onClick={() => setLightboxImage(c.badge_image_url!)}
                  className="mb-4 h-14 w-14 rounded-xl overflow-hidden bg-surface2 flex items-center justify-center border border-line/50 hover:border-teal/50 transition-colors cursor-pointer group"
                  aria-label="View certificate image"
                >
                  <img src={c.badge_image_url} alt={c.issuer} className="h-full w-full object-contain p-1 group-hover:scale-110 transition-transform" />
                </button>
              ) : (
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10 border border-teal/20 text-2xl">🏆</div>
              )}
              <h3 className="font-display text-sm font-semibold text-ink leading-snug line-clamp-3 flex-1">{c.title}</h3>
              <p className="mt-2 font-mono text-xs text-teal">{c.issuer}</p>
              {c.issue_date && <p className="mt-1 font-mono text-[10px] text-muted">{new Date(c.issue_date).getFullYear()}</p>}
              {c.credential_url && (
                <a href={c.credential_url} target="_blank" rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-between rounded-xl border border-teal/20 bg-teal/5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-teal transition-all hover:bg-teal/10">
                  <span>Verify</span><span>↗</span>
                </a>
              )}
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center reveal">
            <button
              onClick={() => setShowAll(!showAll)}
              className="glass glass-hover rounded-xl border border-line/50 px-8 py-3 font-mono text-sm text-ink hover:text-teal transition-colors"
            >
              {showAll ? "Show Less" : `See All ${items.length} Certifications`}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox for viewing images */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-bg/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-ink hover:text-teal transition-colors font-mono text-sm"
              aria-label="Close"
            >
              Close ✕
            </button>
            <img 
              src={lightboxImage} 
              alt="Certificate" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl border border-line/50"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
