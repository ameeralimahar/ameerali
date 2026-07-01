const roles = [
  {
    period: "Current",
    title: "Software Engineer",
    org: "SIBA Testing Services (STS)",
    description:
      "Building and maintaining production systems used by millions of exam candidates — automated OMR grading, ID document verification, and institutional web portals.",
  },
  {
    period: "Past",
    title: "Data Science Intern",
    org: "CodXo",
    description:
      "Machine learning and data analysis — predictive modeling, recommendation systems, data preprocessing and feature engineering.",
  },
  {
    period: "Ongoing",
    title: "Founder",
    org: "Robbers Mewen",
    description:
      "Bootstrapping a luxury e-commerce venture, handling everything from brand identity to storefront build.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-pad border-b border-line">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr]">
          <p className="eyebrow">04 — Experience</p>

          <ol className="space-y-10">
            {roles.map((r) => (
              <li
                key={r.title + r.org}
                className="grid grid-cols-1 gap-2 border-l border-line pl-6 sm:grid-cols-[120px_1fr] sm:gap-8"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-teal">
                  {r.period}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {r.title} <span className="text-muted">— {r.org}</span>
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {r.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
