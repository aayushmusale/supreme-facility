import { forwardRef, useId } from "react";

/**
 * Side-on Supreme employee-transport bus, facing right (the direction of travel). Pure SVG, so it
 * stays crisp at any size and costs no image request. White body, brand-maroon lower band, the
 * word SUPREME printed on it. The two wheels carry `.bus-wheel` so the scene can spin them.
 */
export const SupremeBus = forwardRef<SVGSVGElement, { className?: string }>(function SupremeBus({ className }, ref) {
  // Unique gradient/clip ids per instance: a hidden SVG (display:none) cannot resolve url(#id) for another.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${uid}-${name}`;
  const wheel = (cx: number) => (
    <g>
      <circle cx={cx} cy={162} r={36} fill="#0e0f12" />
      <g className="bus-wheel" data-cx={cx}>
        <circle cx={cx} cy={162} r={29} fill="#1a1b20" />
        <circle cx={cx} cy={162} r={17} fill="#c9ccd1" />
        <circle cx={cx} cy={162} r={17} fill={`url(#${id("rim")})`} />
        {[0, 72, 144, 216, 288].map((a) => (
          <rect key={a} x={cx - 1.6} y={146} width={3.2} height={11} rx={1.5} fill="#7b7f88" transform={`rotate(${a} ${cx} 162)`} />
        ))}
        <circle cx={cx} cy={162} r={5} fill="#50545c" />
      </g>
    </g>
  );
  return (
    <svg ref={ref} viewBox="0 0 600 206" role="img" aria-label="A Supreme employee transportation bus" className={className}>
      <defs>
        <linearGradient id={id("body")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e9e5df" />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4a5c" />
          <stop offset="1" stopColor="#141b24" />
        </linearGradient>
        <linearGradient id={id("band")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#85182a" />
          <stop offset="1" stopColor="#5e1020" />
        </linearGradient>
        <radialGradient id={id("rim")} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#9a9ea6" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id={id("shadow")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.38" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id={id("clip")}>
          <rect x="24" y="36" width="536" height="128" rx="20" />
        </clipPath>
      </defs>

      <ellipse cx="300" cy="199" rx="286" ry="9" fill={`url(#${id("shadow")})`} />

      {/* roof cap and rooftop unit */}
      <rect x="34" y="28" width="506" height="12" rx="6" fill="#26242a" />
      <rect x="240" y="19" width="96" height="10" rx="3" fill="#b9bcc2" />

      {/* body */}
      <rect x="24" y="36" width="536" height="128" rx="20" fill={`url(#${id("body")})`} />
      <g clipPath={`url(#${id("clip")})`}>
        <rect x="24" y="118" width="540" height="50" fill={`url(#${id("band")})`} />
        <rect x="24" y="113" width="540" height="5" fill="#d9ad5f" />
        <rect x="24" y="36" width="540" height="4" fill="#ffffff" opacity="0.7" />
      </g>

      {/* side windows with pillars, door, windshield */}
      <rect x="54" y="50" width="352" height="52" rx="7" fill={`url(#${id("glass")})`} />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={106 + i * 48.5} y={50} width={5} height={52} fill="#f3f0ea" />
      ))}
      <rect x="414" y="46" width="58" height="68" rx="7" fill="#f1eee8" />
      <rect x="420" y="52" width="46" height="56" rx="5" fill={`url(#${id("glass")})`} />
      <rect x="443" y="52" width="2.5" height="56" fill="#f1eee8" />
      <path d="M480 48 H548 Q556 48 556 58 V104 Q556 112 548 112 H480 Z" fill={`url(#${id("glass")})`} />
      <path d="M488 52 L520 52 L498 110 L488 110 Z" fill="#ffffff" opacity="0.1" />

      {/* mirror, lights, bumpers */}
      <rect x="552" y="66" width="9" height="30" rx="3" fill="#1c1d22" />
      <rect x="544" y="76" width="10" height="3" fill="#1c1d22" />
      <rect x="552" y="122" width="14" height="13" rx="4" fill="#fff4d2" />
      <rect x="552" y="138" width="14" height="6" rx="2" fill="#e8a21c" />
      <rect x="20" y="100" width="7" height="20" rx="3" fill="#c4343a" />
      <rect x="520" y="150" width="46" height="14" rx="5" fill="#1c1d22" />
      <rect x="14" y="152" width="34" height="12" rx="5" fill="#1c1d22" />

      {/* the brand, printed on the maroon band, centred between the wheels */}
      <text x="288" y="150" textAnchor="middle" fontFamily="Arial Black, Helvetica Neue, Arial, sans-serif" fontWeight="900" fontSize="24" letterSpacing="3" fill="#ffffff">
        SUPREME
      </text>

      {wheel(132)}
      {wheel(444)}
    </svg>
  );
});
