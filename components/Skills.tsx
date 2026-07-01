const groups = [
  { label: "Frontend", items: ["React", "Angular", "Next.js", "TypeScript"] },
  { label: "Backend", items: ["Node.js", "Express", "Python", "Flask/Django"] },
  { label: "Cloud & Infra", items: ["AWS Lambda", "SES", "S3", "Supabase"] },
  { label: "AI / ML / CV", items: ["OpenCV", "PyTorch", "Scikit-learn", "RAG/LLM"] },
];

export default function Skills() {
  return (
    <section id="skills" className="section-pad border-b border-line">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
          <p className="eyebrow">02 — Stack</p>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <div key={g.label} className="bg-bg p-6">
                <h3 className="font-display text-sm font-semibold text-teal">
                  {g.label}
                </h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="font-mono text-xs text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
