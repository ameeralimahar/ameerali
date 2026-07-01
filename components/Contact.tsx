import type { SiteSettings } from "@/types";

export default function Contact({ settings }: { settings: SiteSettings }) {
  const links = [
    {
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
      icon: "✉️",
    },
    {
      label: "GitHub",
      value: settings.github_url?.replace("https://", ""),
      href: settings.github_url,
      icon: "⌨️",
    },
    {
      label: "LinkedIn",
      value: settings.linkedin_url?.replace("https://www.", ""),
      href: settings.linkedin_url,
      icon: "💼",
    },
  ].filter((l) => l.value && l.href) as {
    label: string;
    value: string;
    href: string;
    icon: string;
  }[];

  return (
    <section id="contact" className="relative section-pad overflow-hidden">
      {/* Background */}
      <div className="orb orb-teal absolute left-0 top-0 h-96 w-96 opacity-10" />
      <div className="orb orb-violet absolute right-0 bottom-0 h-64 w-64 opacity-10" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-teal" />
            Get In Touch
            <span className="h-px w-8 bg-teal" />
          </div>

          <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl leading-tight">
            Open to{" "}
            <span className="gradient-text">remote roles</span>
            <br />
            and collaborations
          </h2>

          <p className="mt-6 font-body text-lg text-muted leading-relaxed">
            If you&apos;re hiring for Full-Stack, AI/ML, or Cloud Engineering roles —
            or just want to talk about systems that scale — reach out.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.label !== "Email" ? "_blank" : undefined}
                rel={l.label !== "Email" ? "noopener noreferrer" : undefined}
                className="group flex w-full items-center gap-4 rounded-2xl border border-line/60 bg-surface/40 px-6 py-4 backdrop-blur transition-all hover:border-teal/40 hover:bg-surface hover:scale-105 sm:w-auto"
              >
                <span className="text-2xl">{l.icon}</span>
                <div className="text-left">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{l.label}</div>
                  <div className="font-body text-sm text-ink group-hover:text-teal transition-colors truncate max-w-[160px]">
                    {l.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {settings.resume_url && (
            <div className="mt-8">
              <a
                href={settings.resume_url}
                className="inline-flex items-center gap-2 rounded-xl border border-teal/30 bg-teal/8 px-6 py-3 font-mono text-xs uppercase tracking-widest text-teal transition-all hover:bg-teal/15 hover:border-teal/50"
              >
                📄 Download Resume
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-line/50 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Ameer Ali. Built with Next.js, Tailwind & Supabase.
          </p>
          <a
            href="#top"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-teal transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
}
