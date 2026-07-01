import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import HomeProjects from "@/components/HomeProjects";
import HomePosts from "@/components/HomePosts";
import HomeSkillsAndExperience from "@/components/HomeSkillsAndExperience";
import SkillsSlider from "@/components/SkillsSlider";
import HomeCertifications from "@/components/HomeCertifications";
import HomeAchievements from "@/components/HomeAchievements";
import Contact from "@/components/Contact";
import AIChatbot from "@/components/AIChatbot";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import {
  getSiteSettings,
  getFeaturedProjects,
  getRecentPosts,
  getCertifications,
  getAchievements,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, projects, posts, certifications, achievements] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getRecentPosts(3),
    getCertifications(),
    getAchievements(),
  ]);

  return (
    <main className="bg-bg">
      <AnalyticsTracker />
      <Nav />
      <Hero settings={settings} />
      <SkillsSlider />
      <HomeAbout />
      <HomeProjects projects={projects} />
      <HomePosts posts={posts} />
      <HomeSkillsAndExperience />
      <HomeCertifications items={certifications} />
      <HomeAchievements items={achievements} />
      <Contact settings={settings} />
      <AIChatbot />
    </main>
  );
}
