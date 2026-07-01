"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/admin/overview", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/admin/sign-out", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-52 shrink-0 flex-col border-r border-line bg-surface">
      <div className="border-b border-line px-5 py-5">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-wide text-ink hover:text-teal transition-colors"
        >
          AMEER ALI
        </Link>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
          Admin
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
        {NAV_LINKS.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`rounded px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                active
                  ? "bg-tealDim text-teal"
                  : "text-muted hover:bg-surface2 hover:text-ink"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line px-3 py-4">
        <button
          onClick={handleSignOut}
          className="w-full rounded px-3 py-2 text-left font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:bg-surface2 hover:text-ink"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
