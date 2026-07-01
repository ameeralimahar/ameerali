const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-wide text-ink"
        >
          AMEER ALI
        </a>
        <ul className="hidden gap-8 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-teal"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          className="rounded-sm border border-teal/40 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-teal transition-colors hover:bg-teal/10"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
