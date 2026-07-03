import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/adminAuth";

export async function PATCH(request: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await request.json();
  const supabase = createClient();
  const { error } = await supabase.from("site_settings").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
