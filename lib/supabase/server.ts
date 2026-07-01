import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client.
 * Uses the service_role key so admin dashboard queries bypass RLS.
 * Safe to use only in Server Components and Route Handlers (never sent to browser).
 */
export function createClient() {
  // Silence the unused cookies warning — kept for future auth use
  cookies();

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
