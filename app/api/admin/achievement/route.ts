import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/adminAuth";

export async function POST(request: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await request.json();
  const supabase = createClient();
  const { data, error } = await supabase.from("achievements").insert(payload).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, id: data.id });
}

export async function PATCH(request: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...payload } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const supabase = createClient();
  const { error } = await supabase.from("achievements").update(payload).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  const supabase = createClient();
  const { error } = await supabase.from("achievements").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
