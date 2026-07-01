"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import MediaUploader from "@/components/admin/MediaUploader";
import type { Achievement } from "@/types";

const EMPTY = {
  title: "", description: "", date: "", link_url: "", image_url: "",
  display_order: 0, status: "published" as const,
};

export default function AchievementsClient({ items: initial }: { items: Achievement[] }) {
  const [items, setItems] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Achievement | null>(null);
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

  function openEdit(item: Achievement) {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description ?? "",
      date: item.date ?? "",
      link_url: item.link_url ?? "",
      image_url: item.image_url ?? "",
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
      date: form.date || null,
      link_url: form.link_url || null,
      description: form.description || null,
      image_url: form.image_url || null,
    };
    const res = editing
      ? await fetch("/api/admin/achievement", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...payload }) })
      : await fetch("/api/admin/achievement", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Save failed"); setSaving(false); return; }
    setShowForm(false);
    startTransition(() => router.refresh());
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this achievement?")) return;
    setItems(prev => prev.filter(i => i.id !== id));
    await fetch("/api/admin/achievement", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    startTransition(() => router.refresh());
  }

  const inp = "rounded-lg border border-line bg-surface px-3 py-2 font-body text-sm text-ink placeholder:text-muted focus:border-teal/60 focus:outline-none w-full";

  return (
    <div>
      <div className="mb-6">
        <button onClick={openNew} className="rounded-xl bg-teal px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-bg hover:opacity-90 transition-opacity">
          + Add Achievement
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass rounded-2xl border border-line/60 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-display text-lg font-semibold text-ink mb-6">
              {editing ? "Edit Achievement" : "New Achievement"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Title *</label>
                <input required value={form.title} onChange={e => set("title", e.target.value)} className={inp} />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)} className={inp} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Date</label>
                  <input type="date" value={form.date} onChange={e => set("date", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Display Order</label>
                  <input type="number" value={form.display_order} onChange={e => set("display_order", Number(e.target.value))} className={inp} />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Link URL</label>
                <input type="url" value={form.link_url} onChange={e => set("link_url", e.target.value)} placeholder="https://..." className={inp} />
              </div>
              <MediaUploader
                type="image"
                label="Achievement Image / Badge (optional)"
                currentUrl={form.image_url}
                onUploaded={url => set("image_url", url)}
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

      {items.length === 0 ? (
        <div className="glass rounded-2xl border border-dashed border-line/60 p-12 text-center">
          <p className="font-mono text-sm text-muted mb-3">No achievements yet</p>
          <button onClick={openNew} className="font-mono text-xs text-teal hover:opacity-80">Add your first →</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map(item => (
            <div key={item.id} className="glass rounded-2xl border border-line/50 p-5 flex items-start gap-4 hover:border-teal/20 transition-colors">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="h-14 w-14 rounded-xl object-cover border border-line shrink-0" />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet/10 border border-violet/20 text-2xl shrink-0">🏅</div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-semibold text-ink">{item.title}</p>
                {item.description && <p className="font-mono text-[10px] text-muted mt-1 line-clamp-2">{item.description}</p>}
                {item.date && <p className="font-mono text-[9px] text-teal mt-1">{new Date(item.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>}
                <div className="flex items-center gap-3 mt-3 pt-2 border-t border-line/50">
                  {item.link_url && <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-muted hover:text-teal transition-colors">View ↗</a>}
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
