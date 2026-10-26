import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NavLink } from "@/content/site";

export function RelatedLinks({ heading, links }: { heading: string; links: NavLink[] }) {
  if (links.length === 0) return null;

  return (
    <section aria-labelledby="related-title" className="bg-stone pt-16 pb-10 md:pt-24">
      <div className="container-page">
        <h2 id="related-title" className="font-display text-2xl font-semibold tracking-[-0.02em]">
          {heading}
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5 font-medium transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                {link.label}
                <ArrowUpRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
