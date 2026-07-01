import { createClient } from "@/lib/supabase/server";
import type { Project, Certification, SiteSettings } from "@/types";

const FALLBACK_SETTINGS: SiteSettings = {
  id: 1,
  hero_heading:
    "I build systems that grade, verify, and scale — to millions of people.",
  hero_subheading:
    "Full-stack web platforms, cloud infrastructure, and AI/ML & computer-vision pipelines — shipped in production.",
  email: "ameer@example.com",
  github_url: "https://github.com/ameeralimahar",
  linkedin_url: "https://linkedin.com",
  resume_url: "/resume.pdf",
  updated_at: new Date().toISOString(),
};

/**
 * Every getter below fails soft: if Supabase env vars aren't set yet
 * (e.g. you're previewing before running the schema/seed), the site
 * renders with sane fallback content instead of crashing or blanking.
 */

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();
    if (error || !data) return FALLBACK_SETTINGS;
    return data as SiteSettings;
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("display_order", { ascending: true });
    if (error || !data) return [];
    return data as Project[];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error || !data) return null;
    return data as Project;
  } catch {
    return null;
  }
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .eq("status", "published")
      .order("display_order", { ascending: true });
    if (error || !data) return [];
    return data as Certification[];
  } catch {
    return [];
  }
}
