"use client";

import { useRef, useState } from "react";
import MediaUploader from "@/components/admin/MediaUploader";
import type { SiteSettings } from "@/types";

// Dedicated PDF uploader for resume
function ResumeUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Please select a PDF file"); return; }
    if (file.size > 10 * 1024 * 1024) { setError("PDF too large (max 10 MB)"); return; }
    setUploading(true); setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "resume");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onUploaded(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-line/60 bg-surface/40 px-4 py-4 transition-all hover:border-teal/40 hover:bg-surface"
      >
        {uploading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal border-t-transparent" />
            <span className="font-mono text-xs text-teal">Uploading PDF…</span>
          </div>
        ) : (
          <>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-muted">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span className="font-mono text-xs text-muted">Click to upload resume PDF — max 10 MB</span>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept="application/pdf" onChange={handleFile} className="hidden" disabled={uploading} />
      {error && <p className="mt-1 font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}

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
          Resume / CV
        </h3>
        <div className="space-y-4">
          {form.resume_url && (
            <div className="flex items-center gap-3 rounded-xl border border-teal/20 bg-teal/5 px-4 py-3">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-teal shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="font-mono text-xs text-teal flex-1 truncate">{form.resume_url}</span>
              <a href={form.resume_url} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-muted hover:text-teal transition-colors shrink-0">View ↗</a>
            </div>
          )}
          <div>
            <label className={label}>Upload Resume PDF</label>
            <ResumeUploader onUploaded={url => set("resume_url", url)} />
          </div>
          <div>
            <label className={label}>Or paste URL directly</label>
            <input type="text" value={form.resume_url} onChange={e => set("resume_url", e.target.value)} placeholder="/resume.pdf or https://..." className={inp} />
          </div>
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
