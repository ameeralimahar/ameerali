import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { getSiteSettings, getFeaturedProjects, getCertifications } from "@/lib/content";

// Always fetch fresh content — this page is content-managed via the
// admin dashboard / Supabase, so it should never be statically cached
// at build time.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, projects, certifications] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getCertifications(),
  ]);

  return (
    <main className="bg-bg">
      <AnalyticsTracker />
      <Nav />
      <Hero settings={settings} />
      <About />
      <Stats projectCount={projects.length} />
      <Skills />
      <Projects projects={projects} />
      <Experience />
      <Certifications items={certifications} />
      <Contact settings={settings} />
    </main>
  );
}
