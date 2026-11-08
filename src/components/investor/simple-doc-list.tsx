import { Download } from "lucide-react";
import type { InvestorDoc } from "@/content/investor";

/** A short, unfiltered list of documents — for small sections like IPO, Policies and Material Contracts. */
export function SimpleDocList({ docs }: { docs: InvestorDoc[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {docs.map((doc) => (
        <li key={doc.href}>
          <a
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-brand-600 hover:text-brand-700"
          >
            {doc.title}
            <Download aria-hidden className="size-4 shrink-0 text-muted" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
