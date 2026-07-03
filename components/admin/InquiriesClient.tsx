"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Inquiry {
  id: string;
  project_slug: string;
  project_title: string;
  inquiry_type: string;
  name: string;
  email: string;
  message: string | null;
  created_at: string;
  status: "new" | "read" | "responded" | "archived";
}

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  discuss: "Discuss the work",
  custom_version: "Custom version",
  hire: "Hire for similar",
  other: "Other",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-teal/10 text-teal border-teal/20",
  read: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  responded: "bg-violet/10 text-violet border-violet/20",
  archived: "bg-muted/10 text-muted border-muted/20",
};

export default function InquiriesClient({ inquiries: initialInquiries }: { inquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const router = useRouter();

  const filteredInquiries = statusFilter === "all" 
    ? inquiries 
    : inquiries.filter((i) => i.status === statusFilter);

  const unreadCount = inquiries.filter((i) => i.status === "new").length;

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/inquiry-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus as Inquiry["status"] } : i))
      );

      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus as Inquiry["status"] });
      }

      router.refresh();
    } catch (error) {
      console.error("Update status error:", error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats & Filters */}
      <div className="glass rounded-2xl p-6 border border-line/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-2xl font-bold text-ink">{inquiries.length}</div>
              <div className="text-xs text-muted uppercase tracking-widest">Total</div>
            </div>
            {unreadCount > 0 && (
              <div>
                <div className="text-2xl font-bold text-teal">{unreadCount}</div>
                <div className="text-xs text-muted uppercase tracking-widest">New</div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {["all", "new", "read", "responded", "archived"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg border font-mono text-xs uppercase tracking-wider transition-colors ${
                  statusFilter === status
                    ? "border-teal/30 bg-teal/10 text-teal"
                    : "border-line bg-surface text-muted hover:text-ink"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      {filteredInquiries.length === 0 ? (
        <div className="glass rounded-2xl p-12 border border-line/50 text-center">
          <p className="text-muted">No inquiries found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="glass glass-hover rounded-2xl p-6 border border-line/50 cursor-pointer"
              onClick={() => setSelectedInquiry(inquiry)}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-base font-semibold text-ink">
                      {inquiry.project_title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full border text-xs font-mono uppercase ${STATUS_COLORS[inquiry.status]}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted font-mono">
                    {INQUIRY_TYPE_LABELS[inquiry.inquiry_type]}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-ink">{inquiry.name}</p>
                  <p className="text-xs text-muted">{inquiry.email}</p>
                </div>
              </div>

              {inquiry.message && (
                <p className="text-sm text-muted line-clamp-2 mb-3">{inquiry.message}</p>
              )}

              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-mono">
                  {new Date(inquiry.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="font-mono text-teal hover:underline">View details →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-[9999] bg-bg/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="relative max-w-2xl w-full glass rounded-2xl border border-line/50 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 text-muted hover:text-teal transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display text-xl font-bold text-ink">{selectedInquiry.project_title}</h2>
                <span className={`px-2 py-1 rounded-full border text-xs font-mono uppercase ${STATUS_COLORS[selectedInquiry.status]}`}>
                  {selectedInquiry.status}
                </span>
              </div>
              <p className="text-sm text-muted font-mono">
                {INQUIRY_TYPE_LABELS[selectedInquiry.inquiry_type]}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted mb-1">Name</label>
                <p className="text-sm text-ink">{selectedInquiry.name}</p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted mb-1">Email</label>
                <a href={`mailto:${selectedInquiry.email}`} className="text-sm text-teal hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted mb-1">Project Slug</label>
                <p className="text-sm text-muted font-mono">{selectedInquiry.project_slug}</p>
              </div>

              {selectedInquiry.message && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-1">Message</label>
                  <p className="text-sm text-ink whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted mb-1">Submitted</label>
                <p className="text-sm text-muted font-mono">
                  {new Date(selectedInquiry.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-line">
              <button
                onClick={() => updateStatus(selectedInquiry.id, "read")}
                disabled={selectedInquiry.status === "read"}
                className="px-4 py-2 rounded-lg border border-line bg-surface text-ink text-sm font-mono uppercase tracking-wider hover:border-teal/30 hover:text-teal transition-colors disabled:opacity-50"
              >
                Mark Read
              </button>
              <button
                onClick={() => updateStatus(selectedInquiry.id, "responded")}
                disabled={selectedInquiry.status === "responded"}
                className="px-4 py-2 rounded-lg border border-line bg-surface text-ink text-sm font-mono uppercase tracking-wider hover:border-teal/30 hover:text-teal transition-colors disabled:opacity-50"
              >
                Mark Responded
              </button>
              <button
                onClick={() => updateStatus(selectedInquiry.id, "archived")}
                disabled={selectedInquiry.status === "archived"}
                className="px-4 py-2 rounded-lg border border-line bg-surface text-ink text-sm font-mono uppercase tracking-wider hover:border-teal/30 hover:text-teal transition-colors disabled:opacity-50"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
