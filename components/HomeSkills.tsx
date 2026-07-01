const SKILLS = [
  {
    label: "Frontend",
    icon: "🖥️",
    color: "teal",
    items: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    icon: "⚙️",
    color: "violet",
    items: ["Node.js", "Express", "Python", "Flask", "REST APIs"],
  },
  {
    label: "AI / ML / CV",
    icon: "🤖",
    color: "blue",
    items: ["OpenCV", "PyTorch", "Scikit-learn", "Computer Vision", "LLMs"],
  },
  {
    label: "Cloud & Infra",
    icon: "☁️",
    color: "amber",
    items: ["AWS Lambda", "AWS SES", "S3", "Supabase", "SQL Server"],
  },
];

const COLOR_MAP: Record<string, string> = {
  teal: "border-teal/20 bg-teal/5 text-teal",
  violet: "border-violet/20 bg-violet/5 text-violet",
  blue: "border-blue-400/20 bg-blue-400/5 text-blue-400",
  amber: "border-amber-400/20 bg-amber-400/5 text-amber-400",
};

export default function HomeSkills() {
  return (
    <section id="skills" className="section-pad border-b border-line/50 relative overflow-hidden">
      <div className="orb orb-teal absolute left-1/4 top-0 h-72 w-72 opacity-8" />

      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="eyebrow mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-teal" />
          Tech Stack
        </div>
        <h2 className="mb-12 font-display text-3xl font-bold text-ink sm:text-4xl">
          What I Work With
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((group) => (
            <div
              key={group.label}
              className="glass glass-hover rounded-2xl p-6 border border-line/50"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{group.icon}</span>
                <h3 className={`font-display text-sm font-semibold ${COLOR_MAP[group.color]?.split(" ")[2]}`}>
                  {group.label}
                </h3>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className={`h-1 w-1 rounded-full ${group.color === "teal" ? "bg-teal" : group.color === "violet" ? "bg-violet" : group.color === "blue" ? "bg-blue-400" : "bg-amber-400"}`} />
                    <span className="font-mono text-xs text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Experience timeline */}
        <div className="mt-16">
          <h3 className="mb-8 font-display text-xl font-semibold text-ink">Experience</h3>
          <div className="relative pl-6 border-l border-line space-y-8">
            {[
              {
                period: "2022 — Present",
                title: "Software Engineer",
                org: "SIBA Testing Services (STS)",
                desc: "Building and maintaining production systems used by millions of exam candidates — automated OMR grading, ID document verification, and institutional web portals.",
                color: "bg-teal",
              },
              {
                period: "2021 — 2022",
                title: "Data Science Intern",
                org: "CodXo",
                desc: "Machine learning and data analysis — predictive modeling, recommendation systems, data preprocessing and feature engineering.",
                color: "bg-violet",
              },
              {
                period: "Ongoing",
                title: "Founder",
                org: "Robbers Mewen",
                desc: "Bootstrapping a luxury e-commerce venture, handling everything from brand identity to storefront build.",
                color: "bg-amber-400",
              },
            ].map((r) => (
              <div key={r.title} className="relative">
                <div className={`absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-bg ${r.color}`} />
                <div className="glass rounded-xl p-5 border border-line/50 glass-hover">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-teal uppercase tracking-widest">{r.period}</span>
                    <span className="text-line">·</span>
                    <span className="font-mono text-xs text-muted">{r.org}</span>
                  </div>
                  <h4 className="font-display text-base font-semibold text-ink">{r.title}</h4>
                  <p className="mt-2 font-body text-sm text-muted leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
