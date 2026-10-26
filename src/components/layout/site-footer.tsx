import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, footerLinks, services } from "@/content/site";
import { isExternal } from "@/lib/utils";

function FooterLink({ href, label }: { href: string; label: string }) {
  const className = "text-white/70 transition-colors hover:text-white";
  return isExternal(href) ? (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-dark bg-oxblood text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-20">
        <div>
          <Link href="/" className="inline-flex rounded-xl bg-white px-4 py-3" aria-label={`${company.shortName} home`}>
            <Image src={company.logo} alt="" width={280} height={58} className="h-10 w-auto" />
          </Link>
          <p className="mt-6 font-display text-xl font-medium text-white">{company.tagline}</p>
          <address className="mt-6 space-y-3 text-[0.95rem] not-italic text-white/70">
            <p className="flex gap-3">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-gold" />
              <span>
                <span className="block text-white">{company.legalName}</span>
                Regd. Office: {company.address.join(" ")}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone aria-hidden className="size-4 shrink-0 text-gold" />
              <a href={company.phone.href} className="hover:text-white">
                {company.phone.display}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Mail aria-hidden className="size-4 shrink-0 text-gold" />
              <a href={`mailto:${company.email}`} className="hover:text-white">
                {company.email}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <MessageCircle aria-hidden className="size-4 shrink-0 text-gold" />
              <a href={company.whatsapp} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </address>
        </div>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="font-display text-lg font-semibold">
            Our services
          </h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {services.map((service) => (
              <li key={service.href}>
                <FooterLink href={service.href} label={service.title} />
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className="font-display text-lg font-semibold">
            Quick links
          </h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Social media">
            {company.socials.map((social) => (
              <li key={social.href}>
                <FooterLink href={social.href} label={social.label} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}




// import Link from "next/link";

// export function SiteFooter() {
//   return (
//     <footer className="site-footer">
//       <div className="page-container footer-inner">
//         <Link className="wordmark footer-wordmark" href="/">Supreme <span>Facility Management</span></Link>
//         <p>Supreme Facility Management</p>
//       </div>
//     </footer>
//   );
// }
