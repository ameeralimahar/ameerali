"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Fires one anonymous page-view ping per page load into the
 * `page_views` table. No cookies, no PII — a random session id
 * is generated per browser tab and kept only in sessionStorage,
 * purely so the future admin dashboard can dedupe "sessions" vs
 * raw hits without tracking individuals across visits.
 */
export default function AnalyticsTracker() {
  useEffect(() => {
    try {
      let sessionId = sessionStorage.getItem("pv_session");
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem("pv_session", sessionId);
      }

      const supabase = createClient();
      supabase
        .from("page_views")
        .insert({
          path: window.location.pathname,
          referrer: document.referrer || null,
          device_type: /Mobi|Android/i.test(navigator.userAgent)
            ? "mobile"
            : "desktop",
          session_id: sessionId,
        })
        .then(() => {
          /* fire and forget — failures here should never affect UX */
        });
    } catch {
      // Analytics must never break the page. Silently ignore.
    }
  }, []);

  return null;
}
