export function IntroBlock({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <section aria-labelledby="intro-title" className="bg-white py-16 md:py-24">
      <div className="container-page grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-16">
        <h2 id="intro-title" className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance">
          {heading}
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-pretty text-ink/80">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
