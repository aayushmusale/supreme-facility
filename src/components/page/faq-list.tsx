import { Plus } from "lucide-react";
import type { Faq } from "@/content/services";

/** Native <details> accordion: keyboard and screen-reader friendly with zero JavaScript. */
export function FaqList({ faqs, heading = "Frequently asked questions" }: { faqs: Faq[]; heading?: string }) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-title" className="bg-white py-16 md:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
        <h2 id="faq-title" className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
          {heading}
        </h2>
        <div className="border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium">
                {faq.question}
                <Plus aria-hidden className="mt-1 size-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="pb-6 leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
