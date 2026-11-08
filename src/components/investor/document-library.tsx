"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { InvestorCategory } from "@/content/investor";
import { cn } from "@/lib/utils";

const ALL = "all";

/** Client-side category + year filter over a fixed set of documents. No network calls, no layout shift. */
export function DocumentLibrary({ categories, years }: { categories: InvestorCategory[]; years: number[] }) {
  const [categoryId, setCategoryId] = useState<string>(ALL);
  const [year, setYear] = useState<string>(ALL);

  const visible = useMemo(() => {
    const byCategory = categoryId === ALL ? categories : categories.filter((category) => category.id === categoryId);
    if (year === ALL) return byCategory;
    return byCategory
      .map((category) => ({
        ...category,
        groups: category.groups
          .map((group) => ({ ...group, docs: group.docs.filter((doc) => doc.year === Number(year)) }))
          .filter((group) => group.docs.length > 0),
      }))
      .filter((category) => category.groups.length > 0);
  }, [categories, categoryId, year]);

  const selectClass =
    "h-11 w-full min-w-0 rounded-xl border border-line bg-white px-3 text-[0.95rem] focus:border-brand-600 focus:outline-none";

  return (
    <div>
      <div className="flex flex-wrap gap-3 max-sm:flex-col">
        <label className="flex min-w-0 max-w-full items-center gap-2 max-sm:w-full">
          <span className="shrink-0 text-sm font-medium text-muted">Category</span>
          <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className={selectClass}>
            <option value={ALL}>All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-0 max-w-full items-center gap-2 max-sm:w-full">
          <span className="shrink-0 text-sm font-medium text-muted">Year</span>
          <select value={year} onChange={(event) => setYear(event.target.value)} className={selectClass}>
            <option value={ALL}>All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="mt-8 text-muted">No documents match that filter.</p>
      ) : (
        <div className="mt-8 space-y-10">
          {visible.map((category) => (
            <div key={category.id}>
              <h3 className="font-display text-xl font-semibold">{category.label}</h3>
              <div className="mt-4 space-y-6">
                {category.groups.map((group, index) => (
                  <div key={group.heading ?? index}>
                    {group.heading && <p className="mb-2 font-medium text-ink">{group.heading}</p>}
                    <ul className={cn("grid gap-2 sm:grid-cols-2", !category.groups.some((g) => g.heading) && "lg:grid-cols-3")}>
                      {group.docs.map((doc, docIndex) => (
                        <li key={`${doc.href}-${docIndex}`}>
                          <a
                            href={doc.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm transition-colors hover:border-brand-600 hover:text-brand-700"
                          >
                            <span>
                              <span className="block font-medium">{doc.title}</span>
                              {doc.date && <span className="block text-muted">{doc.date}</span>}
                            </span>
                            <Download aria-hidden className="size-4 shrink-0 text-muted" />
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
