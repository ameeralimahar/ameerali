"use client";

import { useState, useEffect } from "react";

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectSlug: string;
  projectTitle: string;
}

const INQUIRY_TYPES = [
  { value: "discuss", label: "Discuss the work" },
  { value: "custom_version", label: "Request a custom/modified version" },
  { value: "hire", label: "Hire for similar work" },
  { value: "other", label: "Other" },
];

export default function ProjectInquiryModal({
  isOpen,
  onClose,
  projectSlug,
  projectTitle,
}: ProjectInquiryModalProps) {
  const [inquiryType, setInquiryType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setInquiryType("");
        setName("");
        setEmail("");
        setMessage("");
        setSubmitStatus("idle");
        setErrorMessage("");
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_slug: projectSlug,
          project_title: projectTitle,
          inquiry_type: inquiryType,
          name,
          email,
          message: message || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setSubmitStatus("success");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Inquiry submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-bg/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full glass rounded-2xl border border-line/50 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-teal transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitStatus === "success" ? (
          <div className="text-center py-8">
            <div className="mb-4 text-teal text-5xl">✓</div>
            <h3 className="font-display text-xl font-semibold text-ink mb-2">
              Thanks for your interest!
            </h3>
            <p className="font-body text-sm text-muted">
              I'll get back to you soon at {email}
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-display text-2xl font-bold text-ink mb-2">
              Interested in this project?
            </h2>
            <p className="font-body text-sm text-muted mb-6">
              Let me know what you're looking for regarding <span className="text-teal">{projectTitle}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Inquiry Type */}
              <div>
                <label htmlFor="inquiryType" className="block font-mono text-xs uppercase tracking-widest text-muted mb-2">
                  What are you interested in? *
                </label>
                <select
                  id="inquiryType"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  required
                  className="w-full rounded-xl border border-line bg-surface px-4 py-3 font-body text-sm text-ink focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-colors"
                >
                  <option value="">Select an option...</option>
                  {INQUIRY_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-muted mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-line bg-surface px-4 py-3 font-body text-sm text-ink focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-muted mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-line bg-surface px-4 py-3 font-body text-sm text-ink focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-muted mb-2">
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-line bg-surface px-4 py-3 font-body text-sm text-ink focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-colors resize-none"
                  placeholder="Tell me a bit about what you need..."
                />
              </div>

              {/* Error message */}
              {submitStatus === "error" && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 font-body text-sm text-red-400">
                  {errorMessage}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-teal/20 bg-teal/10 px-6 py-3 font-mono text-sm uppercase tracking-widest text-teal transition-all hover:bg-teal/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
