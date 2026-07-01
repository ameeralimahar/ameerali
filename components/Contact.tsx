"use client";

import { useState } from "react";
import type { SiteSettings } from "@/types";

export default function Contact({ settings }: { settings: SiteSettings }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // Opens mailto with prefilled content as fallback
    const subject = encodeURIComponent(`Message from ${name} via Portfolio`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(`mailto:${settings.email}?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setSending(false);
    setTimeout(() => { setSent(false); setName(""); setEmail(""); setMessage(""); }, 4000);
  }

  const LINKS = [
    {
      label: "Email",
      value: settings.email ?? "",
      href: `mailto:${settings.email}`,
      hoverColor: "hover:border-red-400/40 hover:text-red-400",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: settings.github_url?.replace("https://", "") ?? "",
      href: settings.github_url ?? "#",
      hoverColor: "hover:border-teal/40 hover:text-teal",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: settings.linkedin_url?.replace("https://www.", "") ?? "",
      href: settings.linkedin_url ?? "#",
      hoverColor: "hover:border-blue-400/40 hover:text-blue-400",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ].filter(l => l.value && l.href !== "#");

  return (
    <section id="contact" className="relative section-pad overflow-hidden">
      <div className="orb orb-teal absolute left-0 top-0 h-96 w-96 opacity-10" />
      <div className="orb orb-violet absolute right-0 bottom-0 h-64 w-64 opacity-10" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-start">

          {/* Left — headline + social links */}
          <div>
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-teal" />Get In Touch
            </div>
            <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl leading-tight">
              Open to{" "}
              <span className="gradient-text">remote roles</span>
              {" "}and collaborations
            </h2>
            <p className="mt-6 font-body text-lg text-muted leading-relaxed max-w-md">
              If you&apos;re hiring for Full-Stack, AI/ML, or Cloud Engineering roles — or just want to talk about systems that scale — reach out.
            </p>

            {/* Contact links with real icons */}
            <div className="mt-10 space-y-3">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.label !== "Email" ? "_blank" : undefined}
                  rel={l.label !== "Email" ? "noopener noreferrer" : undefined}
                  className={`group flex items-center gap-4 rounded-2xl border border-line/60 bg-surface/40 px-5 py-4 backdrop-blur transition-all ${l.hoverColor} hover:bg-surface hover:scale-[1.02]`}
                >
                  <span className="shrink-0 text-muted group-hover:text-current transition-colors">{l.icon}</span>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-muted">{l.label}</div>
                    <div className="font-body text-sm text-ink group-hover:text-current transition-colors truncate max-w-[260px]">{l.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Resume */}
            {settings.resume_url && (
              <div className="mt-6">
                <a
                  href={settings.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-teal/30 bg-teal/8 px-6 py-3 font-mono text-xs uppercase tracking-widest text-teal transition-all hover:bg-teal/15 hover:border-teal/50"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Resume
                </a>
              </div>
            )}
          </div>

          {/* Right — email form */}
          <div>
            <div className="glass rounded-2xl border border-line/50 p-8">
              <h3 className="font-display text-xl font-semibold text-ink mb-2">Send a Message</h3>
              <p className="font-mono text-xs text-muted mb-6">Fill in the form and it will open your email client with everything pre-filled.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1.5">Your Name</label>
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 font-body text-sm text-ink placeholder:text-muted focus:border-teal/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1.5">Your Email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 font-body text-sm text-ink placeholder:text-muted focus:border-teal/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Hi Ameer, I'd like to discuss..."
                    className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 font-body text-sm text-ink placeholder:text-muted focus:border-teal/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending || sent}
                  className="w-full rounded-xl bg-teal py-3.5 font-mono text-xs uppercase tracking-widest text-bg font-semibold transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {sent ? (
                    <>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Email Client Opened!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      {sending ? "Opening…" : "Send Message"}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-line/50 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-muted">© {new Date().getFullYear()} Ameer Ali. Built with Next.js, Tailwind & Supabase.</p>
          <a href="#top" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-teal transition-colors">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}
