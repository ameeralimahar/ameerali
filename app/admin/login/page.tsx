"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import BubbleGrid from "@/components/BubbleGrid";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin/overview` },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg">
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <BubbleGrid rows={22} cols={48} cell={20} fillRatio={0.28} />
      </div>

      <div className="relative w-full max-w-sm px-6">
        <p className="eyebrow mb-2">Admin Access</p>
        <h1 className="mb-8 font-display text-2xl font-semibold text-ink">
          AMEER ALI
        </h1>

        {sent ? (
          <div className="rounded border border-teal/30 bg-tealDim/20 p-6 text-center">
            <p className="font-mono text-sm text-teal">Magic link sent.</p>
            <p className="mt-2 font-body text-sm text-muted">
              Check your inbox and click the link to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-line bg-surface px-4 py-3 font-body text-sm text-ink placeholder:text-muted focus:border-teal/60 focus:outline-none"
            />
            {error && (
              <p className="font-mono text-xs text-red-400">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-teal px-4 py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send Magic Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
