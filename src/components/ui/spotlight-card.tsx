"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Mouse-following glow (Aceternity-style). Updates CSS variables only, no React re-renders. */
export function SpotlightCard({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onPointerMove={handlePointerMove} className={cn("group relative isolate overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(560px circle at var(--x, 50%) var(--y, 50%), rgb(255 255 255 / 0.13), transparent 45%)",
        }}
      />
      {children}
    </div>
  );
}
