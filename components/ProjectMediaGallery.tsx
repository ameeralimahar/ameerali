"use client";

import { useState } from "react";

interface ProjectMediaGalleryProps {
  coverImage: string | null;
  videoUrl: string | null;
  mediaUrls: string[];
  projectTitle: string;
}

export default function ProjectMediaGallery({
  coverImage,
  videoUrl,
  mediaUrls,
  projectTitle,
}: ProjectMediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Combine all media: video first (if exists), then cover image, then additional media
  const allMedia: Array<{ type: "video" | "image"; url: string }> = [];
  
  if (videoUrl) {
    allMedia.push({ type: "video", url: videoUrl });
  }
  if (coverImage) {
    allMedia.push({ type: "image", url: coverImage });
  }
  mediaUrls.forEach((url) => {
    if (url && url !== coverImage) {
      allMedia.push({ type: "image", url });
    }
  });

  // If no media at all, show placeholder
  if (allMedia.length === 0) {
    return (
      <div className="mb-8 overflow-hidden rounded-2xl border border-line/50 aspect-video bg-surface2 flex items-center justify-center relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(45,212,191,0.1) 0%, transparent 60%)" }} />
        <span className="font-display text-8xl font-bold text-ink/5">{projectTitle.charAt(0)}</span>
      </div>
    );
  }

  const currentMedia = allMedia[currentIndex];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % allMedia.length);
  };

  const lightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <>
      {/* Main Carousel */}
      <div className="mb-8 relative group">
        <div 
          className="overflow-hidden rounded-2xl border border-line/50 aspect-video cursor-pointer"
          onClick={() => openLightbox(currentIndex)}
        >
          {currentMedia.type === "video" ? (
            <video
              src={currentMedia.url}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={currentMedia.url}
              alt={`${projectTitle} - Image ${currentIndex + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>

        {/* Navigation Arrows (only if more than 1 media) */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-bg/80 backdrop-blur-sm border border-line/50 flex items-center justify-center text-ink hover:bg-teal/20 hover:text-teal transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-bg/80 backdrop-blur-sm border border-line/50 flex items-center justify-center text-ink hover:bg-teal/20 hover:text-teal transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Indicator dots */}
        {allMedia.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {allMedia.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-8 bg-teal" : "w-2 bg-muted/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Media type badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-bg/80 backdrop-blur-sm border border-line/50 font-mono text-xs text-muted">
          {currentIndex + 1} / {allMedia.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {allMedia.length > 1 && (
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {allMedia.map((media, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`shrink-0 h-20 w-32 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex ? "border-teal" : "border-line/30 hover:border-teal/50"
              }`}
            >
              {media.type === "video" ? (
                <div className="relative h-full w-full bg-surface2 flex items-center justify-center">
                  <video src={media.url} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-bg/40">
                    <svg className="w-6 h-6 text-teal" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <img src={media.url} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-bg/98 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-surface border border-line/50 flex items-center justify-center text-ink hover:text-teal transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          {allMedia.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-surface border border-line/50 flex items-center justify-center text-ink hover:bg-teal/20 hover:text-teal transition-all z-10"
                aria-label="Previous"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-surface border border-line/50 flex items-center justify-center text-ink hover:bg-teal/20 hover:text-teal transition-all z-10"
                aria-label="Next"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Media Content */}
          <div className="relative max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            {allMedia[lightboxIndex].type === "video" ? (
              <video
                src={allMedia[lightboxIndex].url}
                className="w-full h-auto max-h-[90vh] rounded-2xl border border-line/50"
                controls
                autoPlay
              />
            ) : (
              <img
                src={allMedia[lightboxIndex].url}
                alt={`${projectTitle} - Image ${lightboxIndex + 1}`}
                className="w-full h-auto max-h-[90vh] object-contain rounded-2xl border border-line/50"
              />
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-surface/90 backdrop-blur-sm border border-line/50 font-mono text-sm text-ink">
              {lightboxIndex + 1} / {allMedia.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
