import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { stats } from "@/content/site";

export function Scale() {
  return (
    <section aria-labelledby="scale-title" className="py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="scale-title" className="font-display text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            Our scale and presence
          </h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
            Sites, people, vehicles and meals we manage every day for clients across India.
          </p>
        </div>

        <ul className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-white md:grid-cols-4">
          {stats.map((stat) => (
            <li key={stat.label} className="flex flex-col gap-2 border-r border-b border-line p-6 md:p-7">
              <p className="font-display text-[clamp(1.9rem,3.2vw,2.75rem)] leading-none font-semibold tracking-[-0.03em] text-ink">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm leading-snug text-muted">{stat.label}</p>
            </li>
          ))}
          <li className="border-b border-line">
            <Link
              href="/sectors/"
              className="group flex h-full min-h-36 flex-col justify-between gap-4 bg-brand-600 p-6 text-white transition-colors hover:bg-brand-700 md:p-7"
            >
              <ArrowUpRight aria-hidden className="size-6 self-end transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="font-medium leading-snug">See the industries we cater to</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
