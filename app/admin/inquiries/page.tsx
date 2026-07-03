import { createClient } from "@/lib/supabase/server";
import InquiriesClient from "@/components/admin/InquiriesClient";

export const dynamic = "force-dynamic";

async function getInquiries() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("project_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
    return [];
  }

  return data || [];
}

export default async function InquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-ink">Project Inquiries</h1>
        <p className="mt-2 text-sm text-muted">
          Manage inquiries from visitors interested in your projects
        </p>
      </div>

      <InquiriesClient inquiries={inquiries} />
    </div>
  );
}
