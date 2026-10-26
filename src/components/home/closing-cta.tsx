import { Mail, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { company } from "@/content/site";

type ClosingCtaProps = { heading?: string; text?: string; buttonHref?: string; buttonLabel?: string };

export function ClosingCta({
  heading = "Request a quote",
  text = "Tell us about your sites and the services you need. The right team will contact you.",
  buttonHref = "/contact-us/#enquiry",
  buttonLabel = "Send an enquiry",
}: ClosingCtaProps) {
  const contacts = [
    { icon: Phone, label: "Call us", value: company.phone.display, href: company.phone.href, newTab: false },
    { icon: Mail, label: "Email us", value: company.email, href: `mailto:${company.email}`, newTab: false },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: company.whatsapp, newTab: true },
  ];

  return (
    <section aria-labelledby="cta-title" className="pb-20 md:pb-28">
      <div className="container-page">
        <SpotlightCard className="theme-dark rounded-[2rem] bg-brand-700 text-white">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:p-16">
            <div>
              <h2 id="cta-title" className="font-display text-[clamp(2rem,4vw,3.25rem)] text-balance leading-[1.05] font-semibold tracking-[-0.03em]">
                {heading}
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
                {text}
              </p>
              <ButtonLink href={buttonHref} variant="light" size="lg" className="mt-8">
                {buttonLabel}
              </ButtonLink>
            </div>

            <ul className="divide-y divide-white/15 rounded-2xl border border-white/15 bg-white/[0.06]">
              {contacts.map(({ icon: Icon, label, value, href, newTab }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-4 p-5 transition-colors hover:bg-white/[0.06]"
                    {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-white/65">{label}</span>
                      <span className="block font-medium break-all">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
