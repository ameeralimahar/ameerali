"use client";

import { useMemo } from "react";

/**
 * BubbleGrid — the page's signature element.
 * A grid of circles that fill in sequentially, like an OMR
 * (optical mark recognition) answer sheet being graded.
 * Direct visual reference to Ameer's automated grading work.
 */
export default function BubbleGrid({
  rows = 6,
  cols = 18,
  cell = 16,
  fillRatio = 0.34,
  className = "",
}: {
  rows?: number;
  cols?: number;
  cell?: number;
  fillRatio?: number;
  className?: string;
}) {
  const bubbles = useMemo(() => {
    const items: { x: number; y: number; delay: number; willFill: boolean }[] = [];
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const willFill = Math.random() < fillRatio;
        items.push({
          x: c * cell + cell / 2,
          y: r * cell + cell / 2,
          delay: i * 0.022 + Math.random() * 0.4,
          willFill,
        });
        i++;
      }
    }
    return items;
  }, [rows, cols, cell, fillRatio]);

  const width = cols * cell;
  const height = rows * cell;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      className={className}
      role="img"
      aria-label="Animated grid of bubbles filling in, referencing automated answer-sheet grading"
    >
      {bubbles.map((b, idx) => (
        <circle
          key={idx}
          cx={b.x}
          cy={b.y}
          r={cell * 0.28}
          fill="transparent"
          stroke="#1E2D42"
          strokeWidth={1.4}
          style={
            b.willFill
              ? {
                  animation: `fillBubble 0.9s ease forwards`,
                  animationDelay: `${b.delay}s`,
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
}
