"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { SiteSettings } from "@/types";

const ROLES = [
  "AI Engineer",
  "Software Engineer",
  "Full-Stack Developer",
  "Computer Vision Engineer",
  "Cloud Architect",
];

export default function Hero({ settings }: { settings: SiteSettings }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = ROLES[roleIdx];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIdx]);

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background orbs */}
      <div className="orb orb-teal absolute -top-32 -left-32 h-96 w-96 animate-pulse3d" />
      <div className="orb orb-violet absolute top-1/2 -right-48 h-[500px] w-[500px] animate-pulse3d" style={{ animationDelay: "1.5s" }} />
      <div className="orb orb-teal absolute bottom-0 left-1/3 h-64 w-64 animate-pulse3d" style={{ animationDelay: "3s" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* ── RIGHT-SIDE floating cards ── */}
      {/* Card 1 — Live System / 3M+ (top right, larger) */}
      <div className="absolute right-6 top-28 hidden xl:block animate-float" style={{ animationDelay: "0s" }}>
        <div
          className="glass rounded-2xl p-6 w-64 glow-teal border border-teal/20"
          style={{ transform: "perspective(900px) rotateY(-10deg) rotateX(5deg)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-teal animate-pulse" />
              <span className="font-mono text-[10px] text-teal uppercase tracking-widest">Live System</span>
            </div>
            <span className="font-mono text-[9px] text-muted">STS</span>
          </div>
          <div className="font-mono text-xs text-muted mb-1">Candidates Served</div>
          <div className="font-display text-4xl font-bold gradient-text-teal">3M+</div>
          <div className="mt-3 h-1.5 rounded-full bg-line overflow-hidden">
            <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-teal to-violet animate-shimmer" style={{ backgroundSize: "200%" }} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[{ v: "8+", l: "Systems" }, { v: "4", l: "AI Pipelines" }].map(s => (
              <div key={s.l} className="rounded-lg bg-surface/60 p-2 text-center">
                <div className="font-mono text-sm font-bold text-ink">{s.v}</div>
                <div className="font-mono text-[9px] text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 2 — Current Role (right side, bigger) */}
      <div className="absolute right-6 top-[26rem] hidden xl:block animate-float" style={{ animationDelay: "1.2s" }}>
        <div
          className="glass rounded-2xl p-6 w-64 border border-violet/20"
          style={{ transform: "perspective(900px) rotateY(-8deg) rotateX(-4deg)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2.5 w-2.5 rounded-full bg-violet animate-pulse" />
            <span className="font-mono text-[10px] text-violet uppercase tracking-widest">Current Role</span>
          </div>
          <div className="font-display text-lg font-bold text-ink">AI Engineer</div>
          <div className="font-mono text-xs text-teal mt-1">SIBA Testing Services</div>
          <div className="font-mono text-[10px] text-muted mt-0.5">Feb 2025 — Present</div>
          <div className="mt-4 space-y-1.5">
            {["OMR Grading System", "ID Doc Verification", "AWS Pipelines"].map(t => (
              <div key={t} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-teal" />
                <span className="font-mono text-[10px] text-muted">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3 — Stack (bottom right) */}
      <div className="absolute right-6 bottom-28 hidden xl:block animate-float" style={{ animationDelay: "2.4s" }}>
        <div
          className="glass rounded-2xl p-5 w-56 border border-line/40"
          style={{ transform: "perspective(900px) rotateY(-6deg) rotateX(3deg)" }}
        >
          <div className="font-mono text-[10px] text-muted uppercase tracking-widest mb-3">Core Stack</div>
          <div className="flex flex-wrap gap-1.5">
            {["Python", "OpenCV", "PyTorch", "AWS", "Node.js", "Next.js"].map(s => (
              <span key={s} className="tech-badge">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative mx-auto max-w-content w-full px-6 sm:px-10 pt-32 pb-24 xl:pr-80">
        <div className="animate-fadeUp" style={{ animationDelay: "0s", opacity: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
            <span className="font-mono text-xs text-teal uppercase tracking-widest">Open to remote opportunities</span>
          </div>
        </div>

        <h1
          className="animate-fadeUp max-w-3xl font-display text-5xl font-bold leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          {settings.hero_heading}
        </h1>

        {/* Typewriter */}
        <div className="animate-fadeUp mt-6 flex items-center gap-3" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <span className="font-mono text-base text-muted sm:text-lg">I am a</span>
          <span className="font-mono text-base font-medium text-teal sm:text-lg min-w-[220px]">
            {displayed}
            <span className="ml-0.5 inline-block w-0.5 h-5 bg-teal align-middle animate-pulse" />
          </span>
        </div>

        <p
          className="animate-fadeUp mt-6 max-w-xl font-body text-lg leading-relaxed text-muted"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          {settings.hero_subheading}
        </p>

        {/* CTAs with proper icons */}
        <div className="animate-fadeUp mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <Link
            href="/projects"
            className="group relative overflow-hidden rounded-xl bg-teal px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-bg font-semibold transition-all hover:shadow-lg hover:shadow-teal/25 hover:scale-105"
          >
            View Projects
          </Link>

          {/* Gmail */}
          <a
            href={`mailto:${settings.email}`}
            className="flex items-center gap-2 rounded-xl border border-line bg-surface/50 px-5 py-3.5 font-mono text-xs text-muted transition-all hover:border-red-400/40 hover:text-red-400 hover:scale-105"
            title={settings.email ?? "Email"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
            <span className="hidden sm:inline">Email</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/ameeralimahar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-line bg-surface/50 px-5 py-3.5 font-mono text-xs text-muted transition-all hover:border-teal/40 hover:text-ink hover:scale-105"
            title="GitHub"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href={settings.linkedin_url ?? "https://www.linkedin.com/in/ameeralimahar"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-line bg-surface/50 px-5 py-3.5 font-mono text-xs text-muted transition-all hover:border-blue-400/40 hover:text-blue-400 hover:scale-105"
            title="LinkedIn"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="hidden sm:inline">LinkedIn</span>
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
            { value: "4+", label: "AI/CV Pipelines" },
            { value: "B.S.", label: "Computer Science" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold gradient-text-teal sm:text-4xl">{s.value}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">{s.label}</div>
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
