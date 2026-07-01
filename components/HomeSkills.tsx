const SKILLS = [
  {
    label: "AI / ML / CV",
    icon: "🤖",
    color: "teal",
    items: ["OpenCV", "PyTorch", "Scikit-Learn", "NumPy", "Pandas", "OCR / OMR"],
  },
  {
    label: "Languages",
    icon: "⌨️",
    color: "violet",
    items: ["Python", "JavaScript", "SQL", "TypeScript"],
  },
  {
    label: "Cloud & Tools",
    icon: "☁️",
    color: "blue",
    items: ["AWS Lambda", "AWS S3", "AWS RDS", "Docker", "Git", "Linux"],
  },
  {
    label: "Backend & Web",
    icon: "⚙️",
    color: "amber",
    items: ["Node.js", "REST APIs", "Next.js", "Angular", "Express"],
  },
];

const COLOR_MAP: Record<string, { dot: string; text: string }> = {
  teal: { dot: "bg-teal", text: "text-teal" },
  violet: { dot: "bg-violet", text: "text-violet" },
  blue: { dot: "bg-blue-400", text: "text-blue-400" },
  amber: { dot: "bg-amber-400", text: "text-amber-400" },
};

const EXPERIENCE = [
  {
    period: "Feb 2025 — Present",
    title: "Software Engineer (AI Focus)",
    org: "SIBA Testing Services (STS)",
    location: "Sukkur, Pakistan",
    color: "bg-teal",
    dotColor: "border-teal",
    bullets: [
      "Built Python/OpenCV pipelines to verify & align identity documents for 3M+ candidates, handling noisy scans and real-world variation",
      "Developed automated OMR grading system using computer vision — detecting and scoring marked answers at scale",
      "Built the supporting answer-sheet portal for scanning, uploading, and reviewing OMR sheets during exams",
      "Wrote Python/boto3 pipelines to query SQL Server (AWS RDS) and sync candidate documents to/from AWS S3",
    ],
  },
  {
    period: "Jul 2024 — Apr 2025",
    title: "Data Science Intern",
    org: "CODXO",
    location: "Remote, India",
    color: "bg-violet",
    dotColor: "border-violet",
    bullets: [
      "10-month internship covering core data science concepts and practical exercises",
      "Worked in a remote, internationally distributed team on ML and data analysis tasks",
    ],
  },
];

const CERTS = [
  { title: "Model Context Protocol (MCP)", issuer: "Scrimba" },
  { title: "AI Engineering Path", issuer: "Scrimba" },
  { title: "Supervised Machine Learning: Regression & Classification", issuer: "DeepLearning.AI / Stanford" },
  { title: "Prompt Engineering for Generative AI", issuer: "Google" },
];

export default function HomeSkills() {
  return (
    <section id="skills" className="section-pad border-b border-line/50 relative overflow-hidden">
      <div className="orb orb-teal absolute left-1/4 top-0 h-72 w-72 opacity-[0.08]" />

      <div className="mx-auto max-w-content px-6 sm:px-10">
        {/* Skills */}
        <div className="eyebrow mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-teal" />
          Tech Stack
        </div>
        <h2 className="mb-12 font-display text-3xl font-bold text-ink sm:text-4xl">
          What I Work With
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((group) => (
            <div key={group.label} className="glass glass-hover rounded-2xl p-6 border border-line/50">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{group.icon}</span>
                <h3 className={`font-display text-sm font-semibold ${COLOR_MAP[group.color].text}`}>
                  {group.label}
                </h3>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className={`h-1 w-1 shrink-0 rounded-full ${COLOR_MAP[group.color].dot}`} />
                    <span className="font-mono text-xs text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="mt-20">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-teal" />
            Experience
          </div>
          <h2 className="mb-10 font-display text-3xl font-bold text-ink sm:text-4xl">
            Where I&apos;ve Worked
          </h2>

          <div className="relative pl-6 border-l border-line space-y-8">
            {EXPERIENCE.map((r) => (
              <div key={r.title} className="relative">
                <div className={`absolute -left-[1.4rem] top-2 h-3 w-3 rounded-full border-2 border-bg ${r.color}`} />
                <div className="glass rounded-2xl p-6 border border-line/50 glass-hover">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-display text-base font-semibold text-ink">{r.title}</h4>
                      <div className="font-mono text-xs text-teal mt-0.5">{r.org}</div>
                      <div className="font-mono text-[10px] text-muted mt-0.5">{r.location}</div>
                    </div>
                    <span className="shrink-0 rounded-lg border border-line bg-surface2 px-3 py-1 font-mono text-[10px] text-muted">
                      {r.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {r.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 font-body text-sm text-muted leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-16 glass rounded-2xl p-6 border border-line/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10 border border-teal/20 text-2xl">
              🎓
            </div>
            <div>
              <div className="font-display text-base font-semibold text-ink">B.S. Computer Science</div>
              <div className="font-mono text-xs text-teal">Sukkur IBA University</div>
              <div className="font-mono text-[10px] text-muted">Sukkur, Pakistan</div>
            </div>
          </div>
          <span className="rounded-lg border border-line bg-surface2 px-3 py-1 font-mono text-[10px] text-muted">
            Oct 2020 — Jun 2024
          </span>
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-teal" />
            Certifications
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CERTS.map((c) => (
              <div key={c.title} className="glass glass-hover rounded-xl p-4 border border-line/50 flex items-center gap-4">
                <span className="text-xl shrink-0">🏆</span>
                <div>
                  <div className="font-body text-sm text-ink">{c.title}</div>
                  <div className="font-mono text-[10px] text-teal mt-0.5">{c.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
