import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/adminAuth";

export async function PATCH(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    const validStatuses = ["new", "read", "responded", "archived"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("project_inquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Update status error:", error);
      return NextResponse.json(
        { error: "Failed to update status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry status update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
