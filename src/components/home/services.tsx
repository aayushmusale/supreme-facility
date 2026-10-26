import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { services, servicesIntro } from "@/content/site";
import { cn } from "@/lib/utils";

/** Sticky stacking panels: pure CSS position: sticky, no scroll listeners. */
export function Services({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-white py-20 md:py-28">
      <div className="container-page">
        {showHeading ? (
          <div className="mb-14 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end md:gap-16">
            <h2 id="services-title" className="font-display text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
              Explore our range of services
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted">{servicesIntro}</p>
          </div>
        ) : (
          <h2 id="services-title" className="sr-only">
            Our services
          </h2>
        )}

        <ul className="space-y-6 md:space-y-10">
          {services.map((service, index) => (
            <li key={service.href} className="md:sticky" style={{ top: `${6.5 + index * 1.25}rem` }}>
              <article
                className={cn(
                  "grid overflow-hidden rounded-[1.75rem] border border-line bg-stone shadow-[0_-16px_40px_-28px_rgb(27_21_23/0.45)] md:min-h-[26rem] md:grid-cols-2",
                  index % 2 === 1 && "md:[&>*:first-child]:order-last",
                )}
              >
                <div className="relative aspect-[16/10] md:aspect-auto">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col p-7 md:p-10 lg:p-12">
                  <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-[-0.025em]">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-prose leading-relaxed text-muted">{service.summary}</p>

                  {"includes" in service && (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${service.title} includes`}>
                      {service.includes.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="inline-flex h-9 items-center rounded-full border border-ink/10 bg-white px-3.5 text-sm text-ink/80 transition-colors hover:border-brand-600 hover:text-brand-700"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-8">
                    <ButtonLink href={service.href} variant="outline">
                      Know more<span className="sr-only"> about {service.title}</span>
                      <ArrowUpRight aria-hidden className="size-4" />
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}







// import Image from "next/image";
// import Link from "next/link";
// import { ArrowUpRight } from "lucide-react";
// import { ButtonLink } from "@/components/ui/button";
// import { services, servicesIntro } from "@/content/site";
// import { cn } from "@/lib/utils";

// /** Sticky stacking panels: pure CSS position: sticky, no scroll listeners. */
// export function Services() {
//   return (
//     <section id="services" aria-labelledby="services-title" className="bg-white py-20 md:py-28">
//       <div className="container-page">
//         <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
//           <h2 id="services-title" className="font-display text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
//             Explore our range of services
//           </h2>
//           <p className="max-w-xl text-lg leading-relaxed text-muted">{servicesIntro}</p>
//         </div>

//         <ul className="mt-14 space-y-6 md:mt-16 md:space-y-10">
//           {services.map((service, index) => (
//             <li key={service.href} className="md:sticky" style={{ top: `${6.5 + index * 1.25}rem` }}>
//               <article
//                 className={cn(
//                   "grid overflow-hidden rounded-[1.75rem] border border-line bg-stone shadow-[0_-16px_40px_-28px_rgb(27_21_23/0.45)] md:min-h-[26rem] md:grid-cols-2",
//                   index % 2 === 1 && "md:[&>*:first-child]:order-last",
//                 )}
//               >
//                 <div className="relative aspect-[16/10] md:aspect-auto">
//                   <Image
//                     src={service.image}
//                     alt={service.alt}
//                     fill
//                     sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
//                     className="object-cover"
//                   />
//                 </div>
//                 <div className="flex flex-col p-7 md:p-10 lg:p-12">
//                   <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-[-0.025em]">
//                     {service.title}
//                   </h3>
//                   <p className="mt-4 max-w-prose leading-relaxed text-muted">{service.summary}</p>

//                   {"includes" in service && (
//                     <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${service.title} includes`}>
//                       {service.includes.map((item) => (
//                         <li key={item.href}>
//                           <Link
//                             href={item.href}
//                             className="inline-flex h-9 items-center rounded-full border border-ink/10 bg-white px-3.5 text-sm text-ink/80 transition-colors hover:border-brand-600 hover:text-brand-700"
//                           >
//                             {item.label}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   )}

//                   <div className="mt-auto pt-8">
//                     <ButtonLink href={service.href} variant="outline">
//                       Know more<span className="sr-only"> about {service.title}</span>
//                       <ArrowUpRight aria-hidden className="size-4" />
//                     </ButtonLink>
//                   </div>
//                 </div>
//               </article>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }
