import { createClient } from "@/lib/supabase/server";
import type { Project, Post, Certification, Achievement, SiteSettings } from "@/types";

const FALLBACK_SETTINGS: SiteSettings = {
  id: 1,
  hero_heading: "I build systems that grade, verify, and scale — to millions of people.",
  hero_subheading:
    "Full-stack web platforms, cloud infrastructure, and AI/ML & computer-vision pipelines — shipped in production.",
  email: "ameerali.bscssef20@iba-suk.edu.pk",
  github_url: "https://github.com/ameeralimahar",
  linkedin_url: "https://www.linkedin.com/in/ameeralimahar",
  resume_url: "/resume.pdf",
  updated_at: new Date().toISOString(),
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
    if (error || !data) return FALLBACK_SETTINGS;
    return data as SiteSettings;
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function getAllProjects(): Promise<Project[]> {
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

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .limit(6);
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

export async function getAllPosts(): Promise<Post[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error || !data) return [];
    return data as Post[];
  } catch {
    return [];
  }
}

export async function getRecentPosts(limit = 3): Promise<Post[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data as Post[];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error || !data) return null;
    return data as Post;
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

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("status", "published")
      .order("display_order", { ascending: true });
    if (error || !data) return [];
    return data as Achievement[];
  } catch {
    return [];
  }
}
