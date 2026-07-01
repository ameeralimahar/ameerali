import Nav from "@/components/Nav";
import { getCertifications, getAchievements, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CertificationsPage() {
  const [certifications, achievements, settings] = await Promise.all([
    getCertifications(),
    getAchievements(),
    getSiteSettings(),
  ]);

  return (
    <main className="bg-bg min-h-screen">
      <Nav resumeUrl={settings.resume_url} />

      <div className="pt-24 pb-8 relative overflow-hidden">
        <div className="orb orb-teal absolute left-0 top-0 h-80 w-80 opacity-10" />
        <div className="mx-auto max-w-content px-6 sm:px-10 pt-12">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-teal" />
            Credentials
          </div>
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            Certifications
          </h1>
          <p className="mt-4 max-w-xl font-body text-lg text-muted">
            Verified credentials and continuous learning milestones.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 sm:px-10 pb-20">
        {certifications.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <p className="font-mono text-sm text-muted">No certifications added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <div key={c.id} className="glass glass-hover rounded-2xl p-6 border border-line/50 flex flex-col">
                {/* Badge */}
                <div className="mb-5 flex items-start justify-between gap-3">
                  {c.badge_image_url ? (
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-surface2 flex items-center justify-center border border-line/50 shrink-0">
                      <img
                        src={c.badge_image_url}
                        alt={`${c.issuer} badge`}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-teal/10 border border-teal/20 shrink-0">
                      <span className="text-3xl">🏆</span>
                    </div>
                  )}
                  {c.issue_date && (
                    <span className="font-mono text-xs text-muted bg-surface2 rounded-lg px-2 py-1 shrink-0">
                      {new Date(c.issue_date).getFullYear()}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-sm font-semibold text-ink leading-snug flex-1">
                  {c.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-teal">{c.issuer}</p>

                {c.credential_url && (
                  <a
                    href={c.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex w-full items-center justify-between rounded-xl border border-teal/20 bg-teal/5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-teal transition-all hover:bg-teal/10"
                  >
                    <span>Verify Credential</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mt-20">
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-teal" />
              Achievements
            </div>
            <h2 className="mb-8 font-display text-2xl font-bold text-ink">Milestones</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {achievements.map((a) => (
                <div key={a.id} className="glass glass-hover rounded-2xl p-6 border border-line/50 flex items-start gap-4">
                  {a.image_url ? (
                    <img
                      src={a.image_url}
                      alt={a.title}
                      className="h-14 w-14 rounded-xl object-cover border border-line/50 shrink-0"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet/10 border border-violet/20">
                      <span className="text-2xl">🏅</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-sm font-semibold text-ink">{a.title}</h3>
                    {a.description && (
                      <p className="mt-1 font-body text-xs text-muted leading-relaxed">{a.description}</p>
                    )}
                    {a.date && (
                      <p className="mt-2 font-mono text-[10px] text-teal">
                        {new Date(a.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </p>
                    )}
                    {a.link_url && (
                      <a
                        href={a.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block font-mono text-[10px] text-teal hover:opacity-80 transition-opacity"
                      >
                        Learn More →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
