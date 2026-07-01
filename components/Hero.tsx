import BubbleGrid from "./BubbleGrid";
import type { SiteSettings } from "@/types";

export default function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
        <BubbleGrid rows={22} cols={48} cell={20} fillRatio={0.3} />
      </div>

      <div className="relative mx-auto max-w-content px-6 pb-20 pt-20 sm:px-10 sm:pb-28 sm:pt-28">
        <p className="eyebrow animate-fadeUp">
          Software Engineer · Sukkur, Pakistan (Remote)
        </p>

        <h1
          className="mt-6 max-w-3xl animate-fadeUp font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-6xl"
          style={{ animationDelay: "0.08s", opacity: 0 }}
        >
          {settings.hero_heading}
        </h1>

        <p
          className="mt-6 max-w-xl animate-fadeUp font-body text-base leading-relaxed text-muted sm:text-lg"
          style={{ animationDelay: "0.16s", opacity: 0 }}
        >
          {settings.hero_subheading}
        </p>

        <div
          className="mt-10 flex animate-fadeUp flex-wrap items-center gap-4"
          style={{ animationDelay: "0.24s", opacity: 0 }}
        >
          <a
            href="#work"
            className="rounded-sm bg-teal px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-sm border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-teal/50 hover:text-teal"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
