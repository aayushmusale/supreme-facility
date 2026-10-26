import { cn } from "@/lib/utils";

type SectionHeadingProps = { id: string; heading: string; intro?: string; className?: string };

export function SectionHeading({ id, heading, intro, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2 id={id} className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance">
        {heading}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">{intro}</p>}
    </div>
  );
}
