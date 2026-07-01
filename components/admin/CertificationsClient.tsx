"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import MediaUploader from "@/components/admin/MediaUploader";
import type { Certification } from "@/types";

const EMPTY = {
  title: "", issuer: "", issue_date: "", credential_url: "", badge_image_url: "",
  display_order: 0, status: "published" as const,
};

export default function CertificationsClient({ items: initial }: { items: Certification[] }) {
  const [items, setItems] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Certification | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  function openNew() {
    setEditing(null);
    setForm({ ...EMPTY, display_order: items.length });
    setShowForm(true);
  }

  function openEdit(item: Certification) {
    setEditing(item);
    setForm({
      title: item.title, issuer: item.issuer,
      issue_date: item.issue_date ?? "",
      credential_url: item.credential_url ?? "",
      badge_image_url: item.badge_image_url ?? "",
      display_order: item.display_order,
      status: item.status as "published",
    });
    setShowForm(true);
  }

  function set<K extends keyof typeof EMPTY>(key: K, val: (typeof EMPTY)[K]) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const payload = {
      ...form,
      issue_date: form.issue_date || null,
      credential_url: form.credential_url || null,
      badge_image_url: form.badge_image_url || null,
    };
    const res = editing
      ? await fetch("/api/admin/certification", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...payload }) })
      : await fetch("/api/admin/certification", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Save failed"); setSaving(false); return; }
    setShowForm(false);
    startTransition(() => router.refresh());
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this certification?")) return;
    setItems(prev => prev.filter(i => i.id !== id));
    await fetch("/api/admin/certification", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    startTransition(() => router.refresh());
  }

  const inp = "rounded-lg border border-line bg-surface px-3 py-2 font-body text-sm text-ink placeholder:text-muted focus:border-teal/60 focus:outline-none w-full";

  return (
    <div>
      <div className="mb-6">
        <button onClick={openNew} className="rounded-xl bg-teal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-bg hover:opacity-90 transition-opacity">
          + Add Certification
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass rounded-2xl border border-line/60 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-display text-lg font-semibold text-ink mb-6">
              {editing ? "Edit Certification" : "New Certification"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Title *</label>
                <input required value={form.title} onChange={e => set("title", e.target.value)} className={inp} />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Issuer *</label>
                <input required value={form.issuer} onChange={e => set("issuer", e.target.value)} className={inp} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Issue Date</label>
                  <input type="date" value={form.issue_date} onChange={e => set("issue_date", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Display Order</label>
                  <input type="number" value={form.display_order} onChange={e => set("display_order", Number(e.target.value))} className={inp} />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Credential URL</label>
                <input type="url" value={form.credential_url} onChange={e => set("credential_url", e.target.value)} placeholder="https://..." className={inp} />
              </div>
              <MediaUploader
                type="image"
                label="Badge / Logo Image (optional)"
                currentUrl={form.badge_image_url}
                onUploaded={url => set("badge_image_url", url)}
              />
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Status</label>
                <select value={form.status} onChange={e => set("status", e.target.value as "published")} className={inp}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              {error && <p className="font-mono text-xs text-red-400">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 rounded-xl bg-teal py-2.5 font-mono text-xs uppercase tracking-widest text-bg hover:opacity-90 disabled:opacity-50 transition-opacity">
                  {saving ? "Saving…" : editing ? "Save Changes" : "Create"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {items.length === 0 ? (
        <div className="glass rounded-2xl border border-dashed border-line/60 p-12 text-center">
          <p className="font-mono text-sm text-muted mb-3">No certifications yet</p>
          <button onClick={openNew} className="font-mono text-xs text-teal hover:opacity-80">Add your first →</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(item => (
            <div key={item.id} className="glass rounded-2xl border border-line/50 p-5 flex flex-col gap-3 hover:border-teal/20 transition-colors">
              <div className="flex items-start gap-3">
                {item.badge_image_url ? (
                  <img src={item.badge_image_url} alt={item.issuer} className="h-12 w-12 rounded-xl object-contain border border-line bg-surface2 shrink-0" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 border border-teal/20 text-xl shrink-0">🏆</div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold text-ink leading-snug line-clamp-2">{item.title}</p>
                  <p className="font-mono text-[10px] text-teal mt-0.5">{item.issuer}</p>
                  {item.issue_date && <p className="font-mono text-[9px] text-muted">{new Date(item.issue_date).getFullYear()}</p>}
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-line/50">
                <span className={`font-mono text-[9px] uppercase tracking-widest ${item.status === "published" ? "text-teal" : "text-muted"}`}>
                  {item.status}
                </span>
                <div className="flex gap-3">
                  {item.credential_url && (
                    <a href={item.credential_url} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-muted hover:text-teal transition-colors">Verify ↗</a>
                  )}
                  <button onClick={() => openEdit(item)} className="font-mono text-[10px] text-muted hover:text-teal transition-colors">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="font-mono text-[10px] text-muted hover:text-red-400 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
