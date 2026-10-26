import Image from "next/image";
import { Plus } from "lucide-react";
import type { Leader } from "@/content/about";

/** Leader cards with expandable profiles via native <details>: accessible and zero JavaScript. */
export function LeadershipGrid({ leaders }: { leaders: Leader[] }) {
  return (
    <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {leaders.map((leader) => (
        <li key={leader.name}>
          <article>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,var(--color-brand-50),var(--color-line))]">
              <Image
                src={leader.image}
                alt={`Portrait of ${leader.name}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{leader.name}</h3>
            <p className="mt-1 font-medium text-brand-700">{leader.role}</p>
            <p className="mt-3 leading-relaxed text-muted">{leader.summary}</p>
            <details className="group mt-4 border-t border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium">
                Read profile<span className="sr-only"> of {leader.name}</span>
                <Plus aria-hidden className="size-5 text-brand-600 transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <div className="space-y-3 pb-2 text-[0.95rem] leading-relaxed text-ink/80">
                {leader.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </details>
          </article>
        </li>
      ))}
    </ul>
  );
}
