"use client";

import { ArrowDown } from "lucide-react";

/** Centred bottom-of-hero button: smooth-scrolls to the section that follows the hero. */
export function ScrollCue() {
  return (
    <button
      type="button"
      aria-label="Scroll down to the content"
      onClick={(e) => {
        const next = e.currentTarget.closest("section")?.nextElementSibling;
        next?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="group absolute inset-x-0 bottom-8 max-lg:bottom-28 mx-auto flex w-fit cursor-pointer flex-col items-center gap-3 rounded-full px-4 py-2 text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:bottom-10"
    >
      <span className="text-xs font-medium tracking-[0.24em] uppercase">Scroll</span>
      <span className="flex size-11 items-center justify-center rounded-full border border-white/60 transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
        <ArrowDown aria-hidden className="size-5 animate-bounce" />
      </span>
    </button>
  );
}
