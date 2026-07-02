"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

// On home page: anchor scroll links. On other pages: regular links.
const HOME_ANCHORS = [
  { href: "#about",          label: "About" },
  { href: "#work",           label: "Projects" },
  { href: "#posts",          label: "Posts" },
  { href: "#skills",         label: "Skills" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact",        label: "Contact" },
];

export default function Nav({ resumeUrl }: { resumeUrl?: string | null }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState("");
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const isHome = pathname === "/";
  const resumeHref = resumeUrl || "/resume.pdf";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHome) return;
      // Track active anchor
      const sections = HOME_ANCHORS.map(a => a.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const navLinks = isHome ? HOME_ANCHORS : [
    { href: "/",              label: "Home" },
    { href: "/projects",      label: "Projects" },
    { href: "/posts",         label: "Posts" },
    { href: "/certifications",label: "Certifications" },
  ];

  function isActive(href: string) {
    if (isHome) return active === href.replace("#", "");
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-bg/90 backdrop-blur-xl border-b border-line/60 shadow-lg shadow-black/10"
        : "bg-transparent"
    }`}>
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-10">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 border border-teal/20 font-mono text-xs font-bold text-teal transition-all group-hover:bg-teal/20 group-hover:border-teal/40">
            AA
          </span>
          <span className="font-display text-sm font-semibold tracking-wide text-ink group-hover:text-teal transition-colors">
            Ameer Ali
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 sm:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors rounded-lg block ${
                  isActive(l.href) ? "text-teal bg-teal/8" : "text-muted hover:text-ink hover:bg-white/4"
                }`}
              >
                {isActive(l.href) && (
                  <span className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-teal" />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: theme toggle + github + resume */}
        <div className="hidden items-center gap-2 sm:flex">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-all hover:border-teal/40 hover:text-teal"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              // Sun icon
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4"/>
                <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              // Moon icon
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/ameeralimahar"
            target="_blank" rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-all hover:border-teal/40 hover:text-teal"
            aria-label="GitHub"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>

          {/* Resume */}
          <a
            href={resumeHref}
            target="_blank" rel="noopener noreferrer"
            className="rounded-lg border border-teal/30 bg-teal/8 px-4 py-2 font-mono text-xs uppercase tracking-widest text-teal transition-all hover:bg-teal/15 hover:border-teal/50"
          >
            Resume
          </a>
        </div>

        {/* Mobile burger */}
        <div className="flex items-center gap-2 sm:hidden">
          <button onClick={toggle} className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted" aria-label="Toggle theme">
            {theme === "dark" ? (
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
            <span className={`h-0.5 w-5 bg-ink transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="glass border-t border-line/40 sm:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                    isActive(l.href) ? "text-teal bg-teal/8" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-2">
              <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="block rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-widest text-teal">
                Resume →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
