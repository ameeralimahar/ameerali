"use client";

import { useState } from "react";
import MediaUploader from "@/components/admin/MediaUploader";
import type { SiteSettings } from "@/types";

export default function SettingsClient({ settings }: { settings: SiteSettings | null }) {
  const [form, setForm] = useState({
    hero_heading: settings?.hero_heading ?? "",
    hero_subheading: settings?.hero_subheading ?? "",
    email: settings?.email ?? "",
    github_url: settings?.github_url ?? "",
    linkedin_url: settings?.linkedin_url ?? "",
    resume_url: settings?.resume_url ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: keyof typeof form, val: string) {
    setForm(prev => ({ ...prev, [key]: val }));
    setSaved(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null); setSaved(false);
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Save failed"); }
    else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    setSaving(false);
  }

  const inp = "rounded-lg border border-line bg-surface px-3 py-2.5 font-body text-sm text-ink placeholder:text-muted focus:border-teal/60 focus:outline-none w-full transition-colors";
  const label = "font-mono text-[10px] uppercase tracking-widest text-muted block mb-1.5";

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-8">

      {/* Hero */}
      <div className="glass rounded-2xl border border-line/50 p-6">
        <h3 className="font-display text-base font-semibold text-ink mb-5 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal/10 border border-teal/20 text-sm">🏠</span>
          Hero Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className={label}>Main Heading</label>
            <textarea rows={2} value={form.hero_heading} onChange={e => set("hero_heading", e.target.value)} className={inp} />
            <p className="mt-1 font-mono text-[9px] text-muted">The big bold text visitors see first</p>
          </div>
          <div>
            <label className={label}>Subheading</label>
            <textarea rows={3} value={form.hero_subheading} onChange={e => set("hero_subheading", e.target.value)} className={inp} />
            <p className="mt-1 font-mono text-[9px] text-muted">Supporting text below the heading</p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="glass rounded-2xl border border-line/50 p-6">
        <h3 className="font-display text-base font-semibold text-ink mb-5 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet/10 border border-violet/20 text-sm">📬</span>
          Contact & Links
        </h3>
        <div className="space-y-4">
          <div>
            <label className={label}>Email Address</label>
            <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@example.com" className={inp} />
          </div>
          <div>
            <label className={label}>GitHub URL</label>
            <input type="url" value={form.github_url} onChange={e => set("github_url", e.target.value)} placeholder="https://github.com/username" className={inp} />
          </div>
          <div>
            <label className={label}>LinkedIn URL</label>
            <input type="url" value={form.linkedin_url} onChange={e => set("linkedin_url", e.target.value)} placeholder="https://linkedin.com/in/username" className={inp} />
          </div>
        </div>
      </div>

      {/* Resume */}
      <div className="glass rounded-2xl border border-line/50 p-6">
        <h3 className="font-display text-base font-semibold text-ink mb-5 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-400/10 border border-blue-400/20 text-sm">📄</span>
          Resume
        </h3>
        <div className="space-y-4">
          <div>
            <label className={label}>Resume URL</label>
            <input type="text" value={form.resume_url} onChange={e => set("resume_url", e.target.value)} placeholder="/resume.pdf or https://..." className={inp} />
            <p className="mt-1 font-mono text-[9px] text-muted">
              Upload your PDF to Supabase Storage and paste the URL, or use a path like /resume.pdf (place the file in /public)
            </p>
          </div>
          <MediaUploader
            type="image"
            label="Upload Resume PDF (paste URL above after upload)"
            currentUrl=""
            onUploaded={url => set("resume_url", url)}
          />
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-teal px-7 py-3 font-mono text-xs uppercase tracking-widest text-bg hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? "Saving…" : "Save Settings"}
        </button>
        {saved && (
          <span className="flex items-center gap-2 font-mono text-xs text-teal animate-fadeIn">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Settings saved!
          </span>
        )}
        {error && <span className="font-mono text-xs text-red-400">{error}</span>}
      </div>

      {/* Preview link */}
      <div className="glass rounded-xl border border-line/50 p-4 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">Changes appear instantly on save</span>
        <a href="/" target="_blank" className="font-mono text-xs text-teal hover:opacity-80 transition-opacity">
          Preview site ↗
        </a>
      </div>
    </form>
  );
}
