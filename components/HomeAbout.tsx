export default function HomeAbout() {
  return (
    <section id="about" className="section-pad border-b border-line/50 relative overflow-hidden">
      <div className="orb orb-violet absolute -right-32 top-0 h-64 w-64 opacity-10" />
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">

          {/* Left */}
          <div className="reveal-left">
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-teal" />About Me
            </div>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl leading-tight">
              I don&apos;t separate{" "}
              <span className="gradient-text">engineering disciplines</span>
            </h2>
            <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-muted">
              <p>
                AI/ML-focused Software Engineer with production experience building computer vision
                and automation pipelines deployed at scale — including an{" "}
                <span className="text-ink font-medium">OMR grading system</span> and an{" "}
                <span className="text-ink font-medium">ID document verification pipeline</span>{" "}
                processing records for{" "}
                <span className="text-teal font-semibold">3M+ candidates</span> at SIBA Testing Services.
              </p>
              <p>
                Skilled in <span className="text-ink font-medium">OpenCV, PyTorch, and Scikit-Learn</span>,
                with backend/cloud experience (Python, AWS, SQL) to ship ML systems end-to-end.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["AI / ML", "Computer Vision", "Cloud / AWS", "Python", "Full-Stack"].map((tag) => (
                <span key={tag} className="tech-badge">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative reveal-right">
            <div className="glass rounded-2xl p-8 glow-teal" style={{ transform: "perspective(1000px) rotateY(-4deg) rotateX(2deg)" }}>
              <div className="mb-6 flex items-center justify-between">
                <span className="eyebrow">Current Focus</span>
                <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
              </div>
              <div className="space-y-4">
                {[
                  { icon: "⚡", title: "Enterprise Systems", desc: "Building at scale for millions" },
                  { icon: "🤖", title: "AI / ML Pipelines", desc: "OpenCV, PyTorch, Computer Vision" },
                  { icon: "☁️", title: "Cloud Infrastructure", desc: "AWS Lambda, SES, S3" },
                  { icon: "🚀", title: "Founder Mode", desc: "Bootstrapping Robbers Mewen" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-xl bg-surface/50 p-4 border border-line/50 transition-all hover:border-teal/20">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-display text-sm font-semibold text-ink">{item.title}</div>
                      <div className="font-mono text-xs text-muted mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 border border-teal/20">
              <div className="font-mono text-[10px] text-muted uppercase tracking-widest">Location</div>
              <div className="font-display text-sm font-semibold text-ink mt-0.5">Sukkur, Pakistan</div>
              <div className="font-mono text-[10px] text-teal">Open to Remote</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
