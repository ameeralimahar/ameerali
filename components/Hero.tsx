"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { SiteSettings } from "@/types";

const ROLES = [
  "Software Engineer",
  "Full-Stack Developer",
  "AI/ML Engineer",
  "Cloud Architect",
  "Open-Source Builder",
];

export default function Hero({ settings }: { settings: SiteSettings }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIdx];

    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 60);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIdx]);

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background gradient orbs */}
      <div className="orb orb-teal absolute -top-32 -left-32 h-96 w-96 animate-pulse3d" />
      <div className="orb orb-violet absolute top-1/2 -right-48 h-[500px] w-[500px] animate-pulse3d" style={{ animationDelay: "1.5s" }} />
      <div className="orb orb-teal absolute bottom-0 left-1/3 h-64 w-64 animate-pulse3d" style={{ animationDelay: "3s" }} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating 3D cards (decorative) */}
      <div className="absolute right-8 top-24 hidden xl:block animate-float" style={{ animationDelay: "0s" }}>
        <div className="glass rounded-xl p-4 w-44" style={{ transform: "perspective(800px) rotateY(-8deg) rotateX(4deg)" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span className="font-mono text-[10px] text-teal uppercase tracking-widest">Live System</span>
          </div>
          <div className="font-mono text-xs text-muted">OMR Graded</div>
          <div className="font-display text-2xl font-bold text-ink mt-1">3M+</div>
          <div className="mt-2 h-1 rounded-full bg-line overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-teal to-violet" />
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-64 hidden xl:block animate-float" style={{ animationDelay: "2s" }}>
        <div className="glass rounded-xl p-4 w-44" style={{ transform: "perspective(800px) rotateY(-6deg) rotateX(-3deg)" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-violet animate-pulse" />
            <span className="font-mono text-[10px] text-violet uppercase tracking-widest">Stack</span>
          </div>
          {["Python", "Next.js", "AWS", "OpenCV"].map((s) => (
            <div key={s} className="mt-1 font-mono text-[10px] text-muted">• {s}</div>
          ))}
        </div>
      </div>

      <div className="absolute left-8 bottom-32 hidden xl:block animate-float" style={{ animationDelay: "1s" }}>
        <div className="glass rounded-xl p-4 w-48" style={{ transform: "perspective(800px) rotateY(8deg) rotateX(3deg)" }}>
          <div className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">Current Role</div>
          <div className="font-display text-sm font-semibold text-ink">Software Engineer</div>
          <div className="font-mono text-[10px] text-teal mt-1">SIBA Testing Services</div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative mx-auto max-w-content w-full px-6 sm:px-10 pt-32 pb-24">
        <div
          className="animate-fadeUp"
          style={{ animationDelay: "0s", opacity: 0 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
            <span className="font-mono text-xs text-teal uppercase tracking-widest">
              Open to remote opportunities
            </span>
          </div>
        </div>

        <h1
          className="animate-fadeUp max-w-4xl font-display text-5xl font-bold leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          {settings.hero_heading}
        </h1>

        {/* Typewriter role */}
        <div
          className="animate-fadeUp mt-6 flex items-center gap-3"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <span className="font-mono text-base text-muted sm:text-lg">I am a</span>
          <span className="font-mono text-base font-medium text-teal sm:text-lg min-w-[200px]">
            {displayed}
            <span className="ml-0.5 inline-block w-0.5 h-5 bg-teal align-middle animate-pulse" />
          </span>
        </div>

        <p
          className="animate-fadeUp mt-6 max-w-2xl font-body text-lg leading-relaxed text-muted"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          {settings.hero_subheading}
        </p>

        {/* CTAs */}
        <div
          className="animate-fadeUp mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <Link
            href="/projects"
            className="group relative overflow-hidden rounded-xl bg-teal px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-bg font-semibold transition-all hover:shadow-lg hover:shadow-teal/25 hover:scale-105"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal to-teal/80 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <a
            href={`mailto:${settings.email}`}
            className="rounded-xl border border-line bg-surface/50 px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-ink transition-all hover:border-teal/40 hover:bg-surface hover:text-teal hover:scale-105"
          >
            Get in Touch
          </a>
          <a
            href={settings.linkedin_url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-line bg-surface/50 px-5 py-3.5 font-mono text-xs text-muted transition-all hover:border-teal/40 hover:text-teal hover:scale-105"
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Stats bar */}
        <div
          className="animate-fadeUp mt-20 grid grid-cols-2 gap-4 border-t border-line/50 pt-10 sm:grid-cols-4"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          {[
            { value: "3M+", label: "Candidates Served" },
            { value: "8+", label: "Production Systems" },
            { value: "5+", label: "Years Experience" },
            { value: "2", label: "Core Disciplines" },
          ].map((s) => (
            <div key={s.label} className="group">
              <div className="font-display text-3xl font-bold gradient-text-teal sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Scroll</span>
        <div className="h-8 w-4 rounded-full border border-line/60 flex justify-center pt-1">
          <div className="h-2 w-0.5 rounded-full bg-teal animate-pulse" />
        </div>
      </div>
    </section>
  );
}
