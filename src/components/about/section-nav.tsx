const links = [
  { label: "Overview", href: "#overview" },
  { label: "Core values", href: "#core-values" },
  { label: "Leadership", href: "#leadership" },
  { label: "Why choose us", href: "#why-choose-us" },
  { label: "Milestones", href: "#milestones" },
];

/** Sticky in-page navigation. Anchors match the old site (/about-us/#leadership etc.). Pure CSS, no JS. */
export function AboutSectionNav() {
  return (
    <nav aria-label="On this page" className="sticky top-[5.25rem] z-30 border-b border-line bg-stone/90 backdrop-blur-md">
      <ul className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {links.map((link) => (
          <li key={link.href} className="shrink-0">
            <a
              href={link.href}
              className="inline-flex h-10 items-center rounded-full px-4 text-[0.95rem] font-medium text-ink/75 transition-colors hover:bg-white hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
