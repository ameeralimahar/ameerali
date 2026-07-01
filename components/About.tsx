export default function About() {
  return (
    <section id="about" className="section-pad border-b border-line">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-[200px_1fr]">
        <p className="eyebrow">01 — About</p>

        <div className="max-w-2xl space-y-5 font-body text-lg leading-relaxed text-ink/90">
          <p>
            I&apos;m a Software Engineer who doesn&apos;t separate
            &ldquo;web development&rdquo; from &ldquo;AI/ML&rdquo; — most of
            the production problems I solve need both. A document
            verification pipeline is computer vision <em>and</em> a web
            portal. An automated grading system is a machine-learning model{" "}
            <em>and</em> the infrastructure that serves it to thousands of
            users on exam day.
          </p>
          <p>
            I build and maintain enterprise systems used by millions of
            candidates: automated OMR grading, ID document verification with
            OpenCV and PyTorch, and the institutional web portals that sit on
            top of it all — built with React, Angular, Node.js/Express, and
            deployed on AWS.
          </p>
          <p className="text-muted">
            Outside of work, I&apos;m bootstrapping{" "}
            <span className="text-ink">Robbers Mewen</span>, a luxury
            e-commerce venture, and contributing to open-source projects.
          </p>
        </div>
      </div>
    </section>
  );
}
