import { createClient } from "@/lib/supabase/server";
import SettingsClient from "@/components/admin/SettingsClient";
import type { SiteSettings } from "@/types";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <div>
      <div className="mb-6">
        <p className="eyebrow mb-1">Config</p>
        <h2 className="font-display text-2xl font-bold text-ink">Settings</h2>
        <p className="mt-1 font-mono text-xs text-muted">Control your public portfolio content</p>
      </div>
      <SettingsClient settings={data as SiteSettings} />
    </div>
  );
}
