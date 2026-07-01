import { createClient } from "@/lib/supabase/server";
import AchievementsClient from "@/components/admin/AchievementsClient";
import type { Achievement } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("achievements")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="mb-6">
        <p className="eyebrow mb-1">Content</p>
        <h2 className="font-display text-2xl font-bold text-ink">Achievements</h2>
        <p className="mt-1 font-mono text-xs text-muted">Awards, milestones and recognition</p>
      </div>
      <AchievementsClient items={(data as Achievement[]) ?? []} />
    </div>
  );
}
