import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { sectors } from "@/content/site";

/** The 12 sector tiles. Used on the homepage and the Sectors page. */
export function SectorGrid({ linked = true }: { linked?: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {sectors.map((sector) => {
        const tile = (
          <>
            <Image
              src={sector.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-oxblood/90 via-oxblood/20 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4 font-medium text-white sm:p-5 sm:text-lg">{sector.label}</span>
          </>
        );
        const tileClass = "group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-oxblood-2";
        return (
          <li key={sector.label}>
            {linked ? (
              <Link href="/sectors/" className={tileClass}>
                {tile}
              </Link>
            ) : (
              <div className={tileClass}>{tile}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Sectors() {
  return (
    <section aria-labelledby="sectors-title" className="theme-dark bg-oxblood py-20 text-white md:py-28">
      <div className="container-page">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="sectors-title" className="font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Industries we cater to
          </h2>
          <ButtonLink href="/sectors/" variant="outline-light">
            View all sectors
          </ButtonLink>
        </div>
        <SectorGrid />
      </div>
    </section>
  );
}
