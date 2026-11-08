import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { DAY_STOPS, STOP_POSTERS, type DayStop, type Poster } from "@/lib/day/stops";

// Indian digit grouping (e.g. 25,000).
const numberFormat = new Intl.NumberFormat("en-IN");

const GOLD = "#d9ad5f";

// Skyline: [x, y, width, height] in a 200x100 viewBox. The tallest is the main tower.
const BUILDINGS: readonly (readonly [number, number, number, number, string])[] = [
  [78, 18, 44, 62, "#3a1216"],
  [40, 44, 30, 36, "#2f0f13"],
  [130, 38, 34, 42, "#2f0f13"],
];

/** Decorative scene for a time of day: gradient sky, sun/moon, skyline with lit windows. */
function PosterArt({ poster }: { poster: Poster }) {
  const litOpacity = Math.min(1, poster.glow) * 0.92;
  return (
    <div
      aria-hidden
      className="relative aspect-[2/1] overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(${poster.top}, ${poster.bottom})` }}
    >
      {poster.orb && (
        <span
          className="absolute size-7 rounded-full"
          style={{
            left: `${poster.orb.x}%`,
            top: `${poster.orb.y}%`,
            background: poster.orb.color,
            boxShadow: `0 0 28px 6px ${poster.orb.color}66`,
          }}
        />
      )}
      <svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full">
        <rect y={80} width={200} height={20} fill="#2a0d10" />
        {BUILDINGS.map(([x, y, w, h, fill]) => (
          <g key={x}>
            <rect x={x} y={y} width={w} height={h} fill={fill} />
            {Array.from({ length: Math.floor((w - 6) / 7) }, (_, c) =>
              Array.from({ length: Math.floor((h - 8) / 8) }, (_, r) => (
                // Every 7th window stays dark, like the 3D scene.
                <rect
                  key={`${c}-${r}`}
                  x={x + 4 + c * 7}
                  y={y + 5 + r * 8}
                  width={3.6}
                  height={4.6}
                  fill={GOLD}
                  opacity={(c * 5 + r) % 7 === 6 ? 0.06 : 0.1 + litOpacity * 0.85}
                />
              )),
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

function StopCard({ stop }: { stop: DayStop }) {
  return (
    <li className="overflow-hidden rounded-2xl bg-white/[0.05] p-4 sm:p-5">
      <PosterArt poster={STOP_POSTERS[stop.id]} />
      <p className="mt-4 text-sm font-medium text-gold">
        {stop.timeLabel} · {stop.service}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold">{stop.headline}</h3>
      <p className="mt-2 text-white/85">{stop.body}</p>
      {stop.counter && (
        <p className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-3xl font-semibold text-gold tabular-nums">
            {numberFormat.format(stop.counter.value)}
            {stop.counter.suffix}
          </span>
          <span className="text-sm text-white/80">{stop.counter.label}</span>
        </p>
      )}
      {stop.cta && (
        <ButtonLink href={stop.cta.href} variant="light" size="lg" className="mt-5">
          {stop.cta.label}
          <ArrowUpRight aria-hidden className="size-4" />
        </ButtonLink>
      )}
    </li>
  );
}

/**
 * The non-animated version of "The 24-Hour Campus": a plain list of the eight stops, each with a
 * static poster for its time of day. Used for reduced-motion, no-WebGL, and a lost WebGL
 * context. No client-only code, so it is also what the server renders.
 */
export function StaticFallback() {
  return (
    <section aria-labelledby="day-title" className="theme-dark bg-oxblood py-16 text-white sm:py-20">
      <div className="container-page">
        <h2 id="day-title" className="font-display text-3xl font-semibold">
          The 24-hour campus
        </h2>
        <p className="mt-3 max-w-xl text-white/80">One working day on a corporate campus, and the services that keep it running.</p>
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {DAY_STOPS.map((stop) => (
            <StopCard key={stop.id} stop={stop} />
          ))}
        </ol>
      </div>
    </section>
  );
}
