import { BadgeCheck, Cpu, HardHat, Leaf, Users, Workflow, type LucideIcon } from "lucide-react";
import { pillars, type Pillar } from "@/content/site";

const icons: Record<Pillar, LucideIcon> = {
  Sustainability: Leaf,
  Safety: HardHat,
  Quality: BadgeCheck,
  People: Users,
  Process: Workflow,
  Technology: Cpu,
};

const RADIUS = 34; // % of the square, matches the inner ring (inset 16%)

/** The six pillars arranged around the Supreme Operational Excellence Model. Pure server-rendered HTML/CSS. */
export function PillarRing() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <div aria-hidden className="absolute inset-[3%] rounded-full border border-dashed border-white/15 motion-safe:animate-spin-slow" />
      <div aria-hidden className="absolute inset-[16%] rounded-full border border-white/15" />

      <div className="absolute inset-[32%] flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,var(--color-brand-500),var(--color-brand-800))] p-3 text-center shadow-[0_0_90px_-10px_rgb(196_52_58/0.65)]">
        <p className="font-display text-[clamp(0.8rem,2.4vw,1.05rem)] leading-tight font-semibold text-white">
          Supreme Operational Excellence Model
        </p>
      </div>

      <ul aria-label="Six pillars of the Supreme Operational Excellence Model" className="absolute inset-0">
        {pillars.map((pillar, index) => {
          const Icon = icons[pillar];
          const angle = ((-90 + index * 60) * Math.PI) / 180;
          const left = (50 + RADIUS * Math.cos(angle)).toFixed(2);
          const top = (50 + RADIUS * Math.sin(angle)).toFixed(2);
          return (
            <li key={pillar} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
              <span className="absolute top-0 left-0 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-oxblood-2 text-gold sm:size-14">
                <Icon aria-hidden className="size-5 sm:size-6" strokeWidth={1.75} />
              </span>
              <span className="absolute top-[1.65rem] left-0 -translate-x-1/2 text-xs font-medium whitespace-nowrap text-white/85 sm:top-[2.15rem] sm:text-sm">
                {pillar}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
