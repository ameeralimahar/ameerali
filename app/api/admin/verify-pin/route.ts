import { NextResponse } from "next/server";
import { isPinCorrect, createSessionToken, COOKIE_NAME } from "@/lib/adminAuth";

/**
 * In-memory rate limiting. This resets whenever the serverless function
 * cold-starts and doesn't share state across regions/instances, so it's
 * a best-effort speed bump, not a hard guarantee — but it's enough to
 * stop a naive script from trying all 10,000 4-digit combos in a tight
 * loop, which is the realistic threat for a personal site.
 *
 * For real protection (worth it since this endpoint has DB write
 * access behind it), swap this for Upstash Redis rate limiting —
 * @upstash/ratelimit has a free tier and a five-line setup.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000; // 1 minute

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a minute." },
      { status: 429 }
    );
  }

  const { pin } = await request.json();

  if (typeof pin !== "string" || !isPinCorrect(pin)) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  }

  const session = createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, session.value, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: session.maxAge,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
