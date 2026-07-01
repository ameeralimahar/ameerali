import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const ADMIN_PIN = process.env.ADMIN_PIN ?? "0000";
function isAuthed() {
  return cookies().get("admin_session")?.value === `pin_ok_${ADMIN_PIN}`;
}

export async function PATCH(request: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await request.json();
  const supabase = createClient();
  const { error } = await supabase.from("site_settings").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
