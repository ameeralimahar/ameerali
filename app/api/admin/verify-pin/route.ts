import { NextResponse } from "next/server";

const ADMIN_PIN = process.env.ADMIN_PIN ?? "0000";
const COOKIE_NAME = "admin_session";

export async function POST(request: Request) {
  const { pin } = await request.json();

  if (pin !== ADMIN_PIN) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, `pin_ok_${ADMIN_PIN}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // Expires in 7 days
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
