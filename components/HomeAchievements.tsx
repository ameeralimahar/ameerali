import Link from "next/link";
import type { Achievement } from "@/types";

// Static leadership/volunteer data (always shown)
const LEADERSHIP = [
  {
    icon: "📋",
    title: "Government Exam Coordinator",
    org: "SIBA Testing Services",
    desc: "Coordinated, conducted and managed Government Tests (Grade 5–15, MDCAT, High Courts) with thousands of candidates per cycle.",
  },
  {
    icon: "🌊",
    title: "Flood Relief Data Coordinator",
    org: "Community / Sukkur IBA",
    desc: "Coordinated field surveys and data collection during regional flood relief efforts in Sindh.",
  },
  {
    icon: "🎓",
    title: "University Events & Tech Community",
    org: "Sukkur IBA University",
    desc: "Organized university events and technical community activities at Sukkur IBA.",
  },
];

export default function HomeAchievements({ items }: { items: Achievement[] }) {
  return (
    <section id="achievements" className="section-pad border-b border-line/50 relative overflow-hidden">
      <div className="orb orb-teal absolute left-0 top-1/2 h-64 w-64 opacity-[0.08]" />

      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="eyebrow mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-teal" />Beyond Code
        </div>
        <h2 className="mb-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          Achievements & Leadership
        </h2>
        <p className="mb-12 font-body text-base text-muted max-w-xl">
          Engineering is only part of the story — here&apos;s where I&apos;ve led, volunteered, and made an impact off-screen.
        </p>

        {/* Dynamic achievements from DB */}
        {items.length > 0 && (
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => (
              <div key={a.id} className="glass glass-hover rounded-2xl p-6 border border-line/50 flex items-start gap-4">
                {a.image_url ? (
                  <img src={a.image_url} alt={a.title} className="h-14 w-14 rounded-xl object-cover border border-line/50 shrink-0" />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet/10 border border-violet/20 text-2xl">🏅</div>
                )}
                <div>
                  <h3 className="font-display text-sm font-semibold text-ink">{a.title}</h3>
                  {a.description && <p className="mt-1 font-body text-xs text-muted leading-relaxed">{a.description}</p>}
                  {a.date && (
                    <p className="mt-2 font-mono text-[10px] text-teal">
                      {new Date(a.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </p>
                  )}
                  {a.link_url && (
                    <a href={a.link_url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-mono text-[10px] text-muted hover:text-teal transition-colors">
                      Learn More →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Static leadership section */}
        <div className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-violet" />Leadership & Volunteering
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {LEADERSHIP.map((l) => (
            <div key={l.title} className="glass glass-hover rounded-2xl p-6 border border-line/50">
              <span className="text-3xl mb-4 block">{l.icon}</span>
              <h3 className="font-display text-sm font-semibold text-ink">{l.title}</h3>
              <p className="font-mono text-[10px] text-teal mt-1">{l.org}</p>
              <p className="mt-2 font-body text-xs text-muted leading-relaxed">{l.desc}</p>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/certifications" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-teal transition-colors">
              View All Certifications & Achievements →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
