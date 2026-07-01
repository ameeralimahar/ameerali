"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BubbleGrid from "@/components/BubbleGrid";

export default function AdminLoginPage() {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  function handleChange(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    setError(false);
    if (val && i < 3) inputs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pin = digits.join("");
    if (pin.length < 4) return;
    setLoading(true);

    const res = await fetch("/api/admin/verify-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    if (res.ok) {
      router.push("/admin/overview");
      router.refresh();
    } else {
      setError(true);
      setDigits(["", "", "", ""]);
      inputs.current[0]?.focus();
    }
    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg">
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <BubbleGrid rows={22} cols={48} cell={20} fillRatio={0.28} />
      </div>

      <div className="relative w-full max-w-xs px-6 text-center">
        <p className="eyebrow mb-2">Admin Access</p>
        <h1 className="mb-8 font-display text-2xl font-semibold text-ink">
          AMEER ALI
        </h1>

        <form onSubmit={handleSubmit}>
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">
            Enter PIN
          </p>

          <div className="mb-6 flex justify-center gap-3">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputs.current[i] = el; }}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`h-14 w-12 rounded border text-center font-mono text-xl text-ink bg-surface focus:outline-none transition-colors ${
                  error
                    ? "border-red-500/60 bg-red-500/5"
                    : "border-line focus:border-teal/60"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="mb-4 font-mono text-xs text-red-400">Incorrect PIN</p>
          )}

          <button
            type="submit"
            disabled={loading || digits.join("").length < 4}
            className="w-full rounded bg-teal py-3 font-mono text-xs uppercase tracking-widest text-bg transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {loading ? "Verifying…" : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}
