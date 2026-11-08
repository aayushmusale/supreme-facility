import Image from "next/image";
import { sectors } from "@/content/site";

/**
 * Sector tiles in an endless, left-moving strip. The track holds two copies of the list so a
 * -50% translate loops without a jump; the second copy is hidden from assistive tech. It never
 * pauses; visitors who prefer reduced motion still get a static, scrollable row.
 */
export function SectorMarquee() {
  const tile = (sector: (typeof sectors)[number], key: string) => (
    <li key={key} className="relative aspect-[4/3] w-64 shrink-0 overflow-hidden rounded-2xl bg-oxblood-2 sm:w-72 lg:w-80">
      <Image src={sector.image} alt="" fill sizes="320px" className="object-cover" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-oxblood/90 via-oxblood/15 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-5 font-display text-lg font-semibold text-white">{sector.label}</span>
    </li>
  );

  return (
    <div
      className="group/marquee overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div className="flex w-max gap-4 animate-marquee [--marquee-duration:70s] motion-reduce:animate-none">
        <ul className="flex shrink-0 gap-4">{sectors.map((s) => tile(s, s.label))}</ul>
        <ul aria-hidden className="flex shrink-0 gap-4 motion-reduce:hidden">
          {sectors.map((s) => tile(s, `${s.label}-copy`))}
        </ul>
      </div>
    </div>
  );
}
