import { createClient } from "@/lib/supabase/server";
import CertificationsClient from "@/components/admin/CertificationsClient";
import type { Certification } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminCertificationsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="mb-6">
        <p className="eyebrow mb-1">Content</p>
        <h2 className="font-display text-2xl font-bold text-ink">Certifications</h2>
        <p className="mt-1 font-mono text-xs text-muted">Manage your credentials and badges</p>
      </div>
      <CertificationsClient items={(data as Certification[]) ?? []} />
    </div>
  );
}
