"use client";

import { useEffect, useRef } from "react";

const links = [
  { label: "IPO", href: "#ipo" },
  { label: "Policies", href: "#policies" },
  { label: "Contacts", href: "#investor-contacts" },
  { label: "Board", href: "#board" },
  { label: "Documents", href: "#documents" },
  { label: "CSR", href: "#csr" },
];

const SHOW_NEAR_TOP_PX = 200;
const MIN_DELTA_PX = 6;

/** Hide-on-scroll-down, show-on-scroll-up in-page nav. Same behaviour as the About page's section nav. */
export function InvestorSectionNav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < MIN_DELTA_PX) return;

      const hide = delta > 0 && y > SHOW_NEAR_TOP_PX && !nav.contains(document.activeElement);
      nav.dataset.hidden = hide ? "true" : "false";
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="On this page"
      data-hidden="false"
      onFocus={() => {
        if (navRef.current) navRef.current.dataset.hidden = "false";
      }}
      className="sticky top-[5.25rem] z-30 border-b border-line bg-stone/90 backdrop-blur-md transition-transform duration-300 ease-out will-change-transform data-[hidden=true]:-translate-y-[calc(100%+5.25rem)] motion-reduce:transition-none"
    >
      <ul className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {links.map((link) => (
          <li key={link.href} className="shrink-0">
            <a
              href={link.href}
              className="inline-flex h-10 items-center rounded-full px-4 text-[0.95rem] font-medium text-ink transition-colors hover:bg-brand-50 hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
