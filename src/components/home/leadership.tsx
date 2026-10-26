import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { leadership } from "@/content/site";

export function Leadership() {
  return (
    <section aria-labelledby="leadership-title" className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="leadership-title" className="font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Our leadership team
          </h2>
          <ButtonLink href="/about-us/#leadership" variant="outline">
            Meet the leadership
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person) => (
            <li key={person.name}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,var(--color-brand-50),var(--color-line))]">
                  <Image
                    src={person.image}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="mt-5">
                  <p className="font-display text-xl font-semibold">{person.name}</p>
                  <p className="mt-1 text-muted">{person.role}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
