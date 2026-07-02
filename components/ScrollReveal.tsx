"use client";

import { useEffect, useRef } from "react";

// Applies .visible to elements with .reveal/.reveal-left/.reveal-right
// when they enter the viewport — pure CSS transitions, no library needed.
export default function ScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create observer once
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerRef.current?.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Function to observe all reveal elements
    const observeElements = () => {
      const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
      els.forEach((el) => {
        if (!el.classList.contains("visible")) {
          observerRef.current?.observe(el);
        }
      });
    };

    // Initial observation
    observeElements();

    // Re-observe when DOM changes (for dynamically added elements like "see more")
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observerRef.current?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
