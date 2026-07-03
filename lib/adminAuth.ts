import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Secure admin session handling.
 *
 * Replaces the old scheme where the session cookie literally contained
 * the PIN in plain text (`pin_ok_<PIN>`), which meant anyone who could
 * read the cookie — via browser DevTools, a shared/borrowed device, a
 * malicious extension, etc. — got the admin PIN directly.
 *
 * Now the cookie holds a signed, expiring token instead. The token
 * proves "the server issued this after a correct PIN was entered" —
 * it never contains the PIN itself, so reading the cookie reveals
 * nothing useful, and a leaked cookie only grants access until it
 * expires (7 days), not forever.
 */

const COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Generate one with " +
        "`openssl rand -hex 32` and add it to your environment variables."
    );
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/**
 * Timing-safe comparison of the submitted PIN against the real one.
 * Using === on strings leaks timing information character-by-character,
 * which (combined with no rate limiting) is exactly the kind of thing
 * that makes short PINs practically brute-forceable. This closes that
 * side channel; the rate limiting in verify-pin/route.ts closes the
 * brute-force volume problem itself.
 */
export function isPinCorrect(submittedPin: string): boolean {
  const realPin = process.env.ADMIN_PIN;
  if (!realPin) {
    throw new Error("ADMIN_PIN is not set in the environment.");
  }
  const a = Buffer.from(submittedPin.padEnd(32, "\0"));
  const b = Buffer.from(realPin.padEnd(32, "\0"));
  return crypto.timingSafeEqual(a, b) && submittedPin.length === realPin.length;
}

export function createSessionToken(): { value: string; maxAge: number } {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `${expiresAt}`;
  const signature = sign(payload);
  return {
    value: `${payload}.${signature}`,
    maxAge: SESSION_TTL_SECONDS,
  };
}

function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const sigMatch =
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!sigMatch) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  return true;
}

/** Use in Server Components / Route Handlers (via next/headers). */
export function isAuthed(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  return isValidToken(token);
}

/** Use in middleware, which reads cookies off the NextRequest instead. */
export function isAuthedFromCookieValue(token: string | undefined): boolean {
  return isValidToken(token);
}

export { COOKIE_NAME };
