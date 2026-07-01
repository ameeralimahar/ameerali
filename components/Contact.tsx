import BubbleGrid from "./BubbleGrid";
import type { SiteSettings } from "@/types";

export default function Contact({ settings }: { settings: SiteSettings }) {
  const links = [
    { label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { label: "GitHub", value: settings.github_url?.replace("https://", ""), href: settings.github_url },
    { label: "LinkedIn", value: settings.linkedin_url?.replace("https://", ""), href: settings.linkedin_url },
  ].filter((l) => l.value && l.href) as { label: string; value: string; href: string }[];

  return (
    <section id="contact" className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute inset-0 opacity-[0.1]">
        <BubbleGrid rows={16} cols={40} cell={20} fillRatio={0.22} />
      </div>

      <div className="relative mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
          <p className="eyebrow">06 — Contact</p>

          <div>
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Open to remote Full-Stack and AI/ML Engineer roles.
            </h2>
            <p className="mt-4 max-w-lg text-muted">
              If you&apos;re hiring, or just want to talk about systems that
              scale — reach out.
            </p>

            <ul className="mt-10 space-y-4">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group flex items-center gap-4 border-b border-line py-3 transition-colors hover:border-teal/50"
                  >
                    <span className="w-20 font-mono text-xs uppercase tracking-widest text-muted">
                      {l.label}
                    </span>
                    <span className="font-body text-base text-ink group-hover:text-teal">
                      {l.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Ameer Ali. Built with Next.js, Tailwind & Supabase.
          </p>
          <a
            href="#top"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-teal"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
}
