"use client";

import { useState } from "react";
import ProjectInquiryModal from "./ProjectInquiryModal";

interface ProjectDetailClientProps {
  projectSlug: string;
  projectTitle: string;
}

export default function ProjectDetailClient({ projectSlug, projectTitle }: ProjectDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-teal/20 bg-teal/10 px-6 py-3 font-mono text-sm uppercase tracking-widest text-teal transition-all hover:bg-teal/20"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>Interested in this project?</span>
      </button>

      <ProjectInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectSlug={projectSlug}
        projectTitle={projectTitle}
      />
    </>
  );
}
