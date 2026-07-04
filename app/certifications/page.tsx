import Nav from "@/components/Nav";
import CertificationsGrid from "@/components/CertificationsGrid";
import { getCertifications, getAchievements, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function CertificationsPage() {
  const [certifications, achievements, settings] = await Promise.all([
    getCertifications(),
    getAchievements(),
    getSiteSettings(),
  ]);

  // Sort certifications by date descending (newest first)
  const sortedCertifications = certifications
    .filter(c => c.status === 'published')
    .sort((a, b) => {
      const dateA = a.issue_date ? new Date(a.issue_date).getTime() : 0;
      const dateB = b.issue_date ? new Date(b.issue_date).getTime() : 0;
      return dateB - dateA;
    });

  // Sort achievements by date descending (newest first)
  const sortedAchievements = achievements
    .filter(a => a.status === 'published')
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

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
        {sortedCertifications.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <p className="font-mono text-sm text-muted">No certifications added yet.</p>
          </div>
        ) : (
          <CertificationsGrid certifications={sortedCertifications} />
        )}

        {/* Achievements */}
        {sortedAchievements.length > 0 && (
          <div className="mt-20">
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-teal" />
              Achievements
            </div>
            <h2 className="mb-8 font-display text-2xl font-bold text-ink">Milestones</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sortedAchievements.map((a) => (
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
