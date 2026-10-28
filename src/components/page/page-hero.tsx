import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { company } from "@/content/site";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

type PageHeroProps = {
  breadcrumbs: Crumb[];
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  showActions?: boolean;
};

/**
 * Shared top banner for inner pages. When `image` is given, it covers the whole
 * section as a background (with a dark overlay so text stays readable) instead
 * of sitting in its own side column. Without an image, it falls back to the
 * plain dark hero with the grid pattern and spotlight glow.
 */
export function PageHero({ breadcrumbs, title, lead, image, imageAlt = "", showActions = true }: PageHeroProps) {
  return (
    <section className="theme-dark relative isolate min-h-svh flex-col overflow-hidden bg-oxblood text-white">
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-30 object-cover" />
          {/* Darkens the photo so white text stays readable, heavier towards the bottom. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(42_13_16/0.55)_0%,rgb(42_13_16/0.72)_45%,rgb(42_13_16/0.88)_100%)]"
          />
        </>
      )}
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_20%_20%,black,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/2 -left-1/4 -z-10 h-[160%] w-[80%] -rotate-[24deg] animate-spotlight bg-[radial-gradient(ellipse_at_center,rgb(255_228_200/0.13),transparent_60%)]"
      />

      <div className="container-page flex flex-1 items-center pt-32 pb-14 md:pt-36 md:pb-20">
        <div className="max-w-2xl animate-rise">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-6 font-display text-[clamp(2.2rem,4.8vw,3.9rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance">
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-white/75">{lead}</p>}
          {showActions && (
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact-us/#enquiry" variant="light" size="lg">
                Request a quote
                <ArrowUpRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href={company.phone.href} variant="outline-light" size="lg">
                Call {company.phone.display}
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


// import Image from "next/image";
// import { ArrowUpRight } from "lucide-react";
// import { ButtonLink } from "@/components/ui/button";
// import { company } from "@/content/site";
// import { Breadcrumbs, type Crumb } from "./breadcrumbs";

// type PageHeroProps = {
//   breadcrumbs: Crumb[];
//   title: string;
//   lead?: string;
//   image?: string;
//   imageAlt?: string;
//   showActions?: boolean;
// };

// export function PageHero({ breadcrumbs, title, lead, image, imageAlt = "", showActions = true }: PageHeroProps) {
//   return (
//     <section className="theme-dark relative isolate overflow-hidden bg-oxblood text-white">
//       <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_20%_20%,black,transparent_70%)]" />
//       <div
//         aria-hidden
//         className="pointer-events-none absolute -top-1/2 -left-1/4 -z-10 h-[160%] w-[80%] -rotate-[24deg] animate-spotlight bg-[radial-gradient(ellipse_at_center,rgb(255_228_200/0.13),transparent_60%)]"
//       />

//       <div className={`container-page grid items-center gap-10 pt-32 pb-14 md:pt-36 md:pb-20 ${image ? "lg:grid-cols-[1.15fr_1fr] lg:gap-14" : ""}`}>
//         <div className="animate-rise">
//           <Breadcrumbs items={breadcrumbs} />
//           <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,4.8vw,3.9rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance">
//             {title}
//           </h1>
//           {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-white/75">{lead}</p>}
//           {showActions && (
//             <div className="mt-8 flex flex-wrap gap-3">
//               <ButtonLink href="/contact-us/#enquiry" variant="light" size="lg">
//                 Request a quote
//                 <ArrowUpRight aria-hidden className="size-4" />
//               </ButtonLink>
//               <ButtonLink href={company.phone.href} variant="outline-light" size="lg">
//                 Call {company.phone.display}
//               </ButtonLink>
//             </div>
//           )}
//         </div>

//         {image && (
//           <div className="relative aspect-[4/3] animate-rise overflow-hidden rounded-[1.75rem] [animation-delay:120ms]">
//             <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
