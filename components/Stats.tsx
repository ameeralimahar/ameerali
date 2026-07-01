export default function Stats({ projectCount }: { projectCount: number }) {
  const stats = [
    { value: "3M+", label: "Candidates served by systems I've built" },
    {
      value: projectCount > 0 ? `${projectCount}+` : "8+",
      label: "Production systems & projects shipped",
    },
    { value: "2", label: "Disciplines, one stack — full-stack & AI/ML" },
  ];

  return (
    <section className="border-b border-line bg-surface/40">
      <div className="mx-auto grid max-w-content grid-cols-1 divide-y divide-line px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-10">
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-10 sm:px-8">
            <div className="font-mono text-4xl font-medium text-teal sm:text-5xl">
              {s.value}
            </div>
            <p className="mt-3 max-w-[20ch] font-body text-sm text-muted">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
