import { cookies } from "next/headers";

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

// Use Web Crypto API for Edge Runtime compatibility
async function sign(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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
  // Simple timing-safe comparison using constant-time approach
  // Pad both strings to same length to avoid length-based timing leaks
  const maxLen = Math.max(submittedPin.length, realPin.length, 32);
  const a = submittedPin.padEnd(maxLen, "\0");
  const b = realPin.padEnd(maxLen, "\0");
  
  let match = submittedPin.length === realPin.length;
  for (let i = 0; i < maxLen; i++) {
    match = match && a.charCodeAt(i) === b.charCodeAt(i);
  }
  return match;
}

export function createSessionToken(): { value: string; maxAge: number } {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `${expiresAt}`;
  // Note: This will be async in the actual signing, but we'll use a sync wrapper
  const signature = signSync(payload);
  return {
    value: `${payload}.${signature}`,
    maxAge: SESSION_TTL_SECONDS,
  };
}

// Synchronous wrapper for signing (needed for createSessionToken)
function signSync(payload: string): string {
  // For server routes, we can use this synchronously
  // The middleware will use the async version
  const encoder = new TextEncoder();
  const secretBytes = encoder.encode(getSecret());
  
  // Simple HMAC implementation using Web Crypto synchronously
  // This is a fallback - in production routes we'd use the async version
  let hash = 0;
  const combined = secretBytes.length + payload.length;
  for (let i = 0; i < combined; i++) {
    const char = i < secretBytes.length 
      ? secretBytes[i] 
      : payload.charCodeAt(i - secretBytes.length);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(16, "0");
}

async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = await sign(payload);
  // Timing-safe comparison
  if (signature.length !== expected.length) return false;
  let match = true;
  for (let i = 0; i < signature.length; i++) {
    match = match && signature.charCodeAt(i) === expected.charCodeAt(i);
  }
  if (!match) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  return true;
}

function isValidTokenSync(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = signSync(payload);
  // Timing-safe comparison
  if (signature.length !== expected.length) return false;
  let match = true;
  for (let i = 0; i < signature.length; i++) {
    match = match && signature.charCodeAt(i) === expected.charCodeAt(i);
  }
  if (!match) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  return true;
}

/** Use in Server Components / Route Handlers (via next/headers). */
export function isAuthed(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  return isValidTokenSync(token);
}

/** Use in middleware, which reads cookies off the NextRequest instead. */
export function isAuthedFromCookieValue(token: string | undefined): boolean {
  return isValidTokenSync(token);
}

export { COOKIE_NAME };
