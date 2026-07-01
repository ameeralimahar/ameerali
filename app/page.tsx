import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import HomeProjects from "@/components/HomeProjects";
import HomePosts from "@/components/HomePosts";
import HomeCertifications from "@/components/HomeCertifications";
import HomeSkills from "@/components/HomeSkills";
import Contact from "@/components/Contact";
import AIChatbot from "@/components/AIChatbot";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import {
  getSiteSettings,
  getFeaturedProjects,
  getRecentPosts,
  getCertifications,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, projects, posts, certifications] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getRecentPosts(3),
    getCertifications(),
  ]);

  return (
    <main className="bg-bg">
      <AnalyticsTracker />
      <Nav />
      <Hero settings={settings} />
      <HomeAbout />
      <HomeProjects projects={projects} />
      <HomePosts posts={posts} />
      <HomeSkills />
      <HomeCertifications items={certifications} />
      <Contact settings={settings} />
      <AIChatbot />
    </main>
  );
}
