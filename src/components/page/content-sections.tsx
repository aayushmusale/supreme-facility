import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { PageSection } from "@/content/services";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const columnClass = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
} as const;

/** Renders typed content sections, alternating background tones for rhythm. */
export function ContentSections({ sections, startTone = "stone" }: { sections: PageSection[]; startTone?: "stone" | "white" }) {
  return (
    <>
      {sections.map((section, index) => {
        const isStone = (index % 2 === 0) === (startTone === "stone");
        const id = `section-${index + 1}`;
        return (
          <section key={id} aria-labelledby={id} className={cn("py-16 md:py-24", isStone ? "bg-stone" : "bg-white")}>
            <div className="container-page">
              <SectionHeading id={id} heading={section.heading} intro={section.intro} />
              <SectionBody section={section} />
            </div>
          </section>
        );
      })}
    </>
  );
}

function SectionBody({ section }: { section: PageSection }) {
  switch (section.type) {
    case "cards":
      return (
        <ul className={cn("mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2", columnClass[section.columns ?? 3])}>
          {section.items.map((item) => (
            <li key={item.title} className="border-t-2 border-brand-600 pt-5">
              <h3 className="font-display text-lg leading-snug font-semibold">
                {item.href ? (
                  <Link href={item.href} className="group inline-flex items-start gap-1.5 hover:text-brand-700">
                    {item.title}
                    <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ) : (
                  item.title
                )}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      );

    case "metrics":
      return (
        <ul className="mt-12 grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-white md:grid-cols-3 lg:grid-cols-5">
          {section.items.map((item) => (
            <li key={item.label} className="flex flex-col gap-2 border-r border-b border-line p-6 md:p-7">
              <p className="font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-none font-semibold tracking-[-0.03em] text-brand-700">
                {item.value}
              </p>
              <p className="font-medium">{item.label}</p>
              {item.text && <p className="text-sm leading-relaxed text-muted">{item.text}</p>}
            </li>
          ))}
        </ul>
      );

    case "checklist":
      return (
        <div className={cn("mt-12 grid gap-10", section.lists.length > 1 && "md:grid-cols-2")}>
          {section.lists.map((list, listIndex) => (
            <div key={list.title ?? listIndex}>
              {list.title && <h3 className="font-display text-xl font-semibold">{list.title}</h3>}
              <ul
                className={cn(
                  "grid gap-x-10 gap-y-4",
                  list.title && "mt-5",
                  section.lists.length === 1 && "md:grid-cols-2",
                )}
              >
                {list.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Check aria-hidden className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "gallery":
      return (
        <ul className={cn("mt-12 grid gap-4 sm:grid-cols-2", section.images.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
          {section.images.map((image) => (
            <li key={image.src}>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                {image.caption && <figcaption className="mt-3 font-display text-lg font-semibold">{image.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      );

    case "features":
      return (
        <ul className="mt-12 space-y-6">
          {section.items.map((item, index) => (
            <li key={item.href}>
              <article
                className={cn(
                  "grid overflow-hidden rounded-[1.5rem] border border-line bg-white md:grid-cols-[0.9fr_1.1fr]",
                  index % 2 === 1 && "md:[&>*:first-child]:order-last",
                )}
              >
                <div className="relative aspect-[16/10] bg-line md:aspect-auto md:min-h-72">
                  <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col p-7 md:p-10">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
                  <Link
                    href={item.href}
                    className="group mt-6 inline-flex items-center gap-1.5 self-start font-medium text-brand-700 hover:underline"
                  >
                    Explore {item.title.toLowerCase()}
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      );
  }
}
