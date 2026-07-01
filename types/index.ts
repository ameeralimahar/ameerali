export type ProjectCategory = "Full-Stack" | "AI-ML" | "Cloud" | "Data" | "Venture";
export type ContentStatus = "draft" | "published";

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  category: ProjectCategory;
  tech_stack: string[];
  demo_url: string | null;
  repo_url: string | null;
  video_url: string | null;
  cover_image_url: string | null;
  featured: boolean;
  display_order: number;
  status: ContentStatus;
  source: "manual" | "github_sync";
  github_repo_full_name: string | null;
  stars: number;
  last_commit_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  credential_url: string | null;
  badge_image_url: string | null;
  display_order: number;
  status: ContentStatus;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  link_url: string | null;
  image_url: string | null;
  display_order: number;
  status: ContentStatus;
  created_at: string;
}

export interface SiteSettings {
  id: number;
  hero_heading: string | null;
  hero_subheading: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  resume_url: string | null;
  updated_at: string;
}

export interface PageView {
  id: string;
  path: string;
  referrer: string | null;
  country: string | null;
  device_type: string | null;
  project_slug: string | null;
  session_id: string | null;
  created_at: string;
}
