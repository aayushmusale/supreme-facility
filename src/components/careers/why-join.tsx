import type { ReactNode } from "react";

// Phrases from the intro copy that carry its promise. They are set in a heavier weight and full ink
// against the lighter surrounding text, so the paragraph scans without a single word being changed.
const KEY_PHRASES = [
  "growth and success",
  "Safety is at our core",
  "sustainable future",
  "competitive compensation",
  "career advancement",
  "nurturing talent from within",
];
const KEY_PATTERN = new RegExp(`(${KEY_PHRASES.join("|")})`);

function Emphasised({ text }: { text: string }): ReactNode {
  return text.split(KEY_PATTERN).map((part, i) =>
    KEY_PHRASES.includes(part) ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

/** The "why join us" section: the first paragraph is the lead, the second supports it. */
export function WhyJoin({ paragraphs }: { paragraphs: string[] }) {
  const [lead, ...rest] = paragraphs;

  return (
    <section aria-labelledby="why-join-title" className="content-py bg-white">
      <div className="container-page grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-16">
        <h2
          id="why-join-title"
          className="font-display text-h2 font-semibold tracking-[-0.03em] text-balance md:sticky md:top-28 md:self-start"
        >
          Why Supreme Facility Management?
        </h2>
        <div>
          <p className="font-display text-[clamp(1.35rem,2.1vw,1.75rem)] leading-[1.35] tracking-[-0.01em] text-pretty text-ink/70">
            <Emphasised text={lead} />
          </p>
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-6 max-w-[62ch] text-lg leading-relaxed text-pretty text-ink/70">
              <Emphasised text={paragraph} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
