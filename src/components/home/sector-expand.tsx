"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sectors } from "@/content/site";

/**
 * Desktop sector strip: twelve slim photo panels, one open at a time. Hover, focus or click a
 * panel and it widens to show the photograph and name; the rest collapse to a sliver with a
 * vertical label. Widths animate through flex-grow, so the row never overflows the container.
 */
export function SectorExpand() {
  const [active, setActive] = useState(0);

  return (
    <ul className="flex h-[26rem] w-full gap-2 xl:h-[28rem]">
      {sectors.map((sector, i) => {
        const open = active === i;
        return (
          <li
            key={sector.label}
            className="min-w-0 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
            style={{ flexGrow: open ? 7 : 1, flexBasis: 0 }}
            onMouseEnter={() => setActive(i)}
          >
            <Link
              href="/sectors/"
              aria-label={sector.label}
              onFocus={() => setActive(i)}
              onClick={(e) => {
                // First tap on a collapsed panel opens it (touch laptops); second follows the link.
                if (!open) {
                  e.preventDefault();
                  setActive(i);
                }
              }}
              className="group relative block h-full overflow-hidden rounded-2xl bg-line ring-1 ring-black/5"
            >
              <Image
                src={sector.image}
                alt=""
                fill
                sizes={open ? "40vw" : "8vw"}
                className={`object-cover transition-all duration-500 ${open ? "scale-100" : "scale-110 saturate-[0.35]"}`}
              />
              <span
                aria-hidden
                className={`absolute inset-0 transition-opacity duration-500 ${
                  open
                    ? "bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                    : "bg-white/45"
                }`}
              />

              {/* Collapsed: vertical label */}
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-5 flex justify-center transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100 delay-200"}`}
              >
                <span className="rounded-full bg-white/90 px-2 py-3 text-sm font-medium tracking-wide whitespace-nowrap text-ink shadow-sm [writing-mode:vertical-rl] rotate-180">
                  {sector.label}
                </span>
              </span>

              {/* Open: name + arrow */}
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white transition-all duration-300 ${open ? "translate-y-0 opacity-100 delay-200" : "translate-y-2 opacity-0"}`}
              >
                <span className="font-display text-xl font-semibold tracking-[-0.01em] xl:text-2xl">{sector.label}</span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/60">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
