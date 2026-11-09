import { stats } from "@/content/site";

/**
 * The seven milestones of "The Supreme Journey". Figures come straight from `stats` in
 * content/site.ts (single source of truth); this file only adds presentation: the unit shown beside
 * the number, the short title, and which piece of milestone art illustrates it.
 */
export type Art = "reach" | "campus" | "clients" | "fleet" | "kitchen" | "people" | "boarding";

type Extra = { unit?: string; label?: string; title: string; art: Art };

const EXTRA: readonly Extra[] = [
  { title: "Nationwide reach", art: "reach" },
  { unit: " Mn", label: "Sq. ft. area managed", title: "Infrastructure", art: "campus" },
  { title: "Client relationships", art: "clients" },
  { title: "Transportation", art: "fleet" },
  { title: "Food services", art: "kitchen" },
  { title: "Workforce", art: "people" },
  { title: "Daily transport impact", art: "boarding" },
];

export const milestones = stats.map((stat, i) => ({
  index: i,
  value: stat.value as number,
  suffix: stat.suffix as string,
  unit: EXTRA[i].unit ?? "",
  label: EXTRA[i].label ?? (stat.label as string),
  title: EXTRA[i].title,
  art: EXTRA[i].art,
}));

export type Milestone = (typeof milestones)[number];
export const LAST = milestones.length - 1;

const fmt = new Intl.NumberFormat("en-IN");
/** "6,200+" or "48+ Mn": a figure exactly as it reads. */
export const figure = (m: Milestone, value = m.value) => `${fmt.format(value)}${m.suffix}${m.unit}`;

/** Horizontal position of each stop as a fraction of the stage width. */
export const STOP_X0 = 0.13;
export const STOP_X1 = 0.87;
export const stopX = (t: number) => STOP_X0 + (STOP_X1 - STOP_X0) * (t / LAST);

/**
 * Scroll progress (0..1) to a continuous stop parameter t in [0, LAST]. The bus dwells on each stop
 * for the first 40% of its slice, then eases to the next over the remaining 60%; the final stop
 * holds for an extra slice so the finished composition rests before the section releases.
 */
export function stopParam(p: number): number {
  const total = LAST + 0.7;
  const u = Math.min(total, Math.max(0, p) * total);
  const i = Math.min(LAST, Math.floor(u));
  if (i >= LAST) return LAST;
  const f = u - i;
  const m = Math.min(1, Math.max(0, (f - 0.4) / 0.6));
  return i + m * m * m * (m * (m * 6 - 15) + 10);
}
