import type { Art } from "./data";

/**
 * One quiet piece of line-and-silhouette art per milestone, drawn in the brand maroon with soft
 * neutral fills. They stand on the roadside; the bus passes in front of them.
 */
const M = "#85182a";
const TINT = "#ead8db";
const GREY = "#d8d2ca";
const INK = "#3b383c";

function Windows({ x, y, cols, rows, w = 5, h = 6, gx = 9, gy = 11, fill = "#ffffff" }: { x: number; y: number; cols: number; rows: number; w?: number; h?: number; gx?: number; gy?: number; fill?: string }) {
  return (
    <>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => <rect key={`${r}-${c}`} x={x + c * gx} y={y + r * gy} width={w} height={h} rx={1} fill={fill} opacity={0.9} />),
      )}
    </>
  );
}

function Person({ x, h, color }: { x: number; h: number; color: string }) {
  return (
    <g>
      <circle cx={x} cy={112 - h - 5} r={5} fill="#c58b6a" />
      <path d={`M${x - 7} 112 V${112 - h + 4} Q${x - 7} ${112 - h - 1} ${x} ${112 - h - 1} Q${x + 7} ${112 - h - 1} ${x + 7} ${112 - h + 4} V112 Z`} fill={color} />
    </g>
  );
}

const ART: Record<Art, React.ReactNode> = {
  // a glowing location marker with rings, on a dotted route
  reach: (
    <>
      <path d="M10 108 C 40 80, 70 96, 96 70 S 126 60, 134 52" fill="none" stroke={M} strokeOpacity={0.35} strokeWidth={2} strokeDasharray="2 6" strokeLinecap="round" />
      {[34, 24, 14].map((r, i) => (
        <ellipse key={r} cx={70} cy={104} rx={r} ry={r * 0.32} fill="none" stroke={M} strokeOpacity={0.12 + i * 0.12} strokeWidth={1.5} />
      ))}
      <path d="M70 100 C 52 74, 46 62, 46 52 A24 24 0 1 1 94 52 C 94 62, 88 74, 70 100 Z" fill={M} />
      <circle cx={70} cy={52} r={9} fill="#fff" />
    </>
  ),
  // campuses of different heights
  campus: (
    <>
      <rect x={8} y={58} width={34} height={54} fill={TINT} />
      <rect x={46} y={26} width={42} height={86} fill={M} />
      <rect x={92} y={44} width={40} height={68} fill={GREY} />
      <Windows x={13} y={64} cols={3} rows={4} fill="#fff" />
      <Windows x={52} y={34} cols={4} rows={7} gx={9} fill="#f3d9dd" />
      <Windows x={98} y={50} cols={3} rows={5} fill="#fff" />
      <rect x={4} y={110} width={132} height={3} fill={INK} opacity={0.25} />
    </>
  ),
  // two towers joined by a network
  clients: (
    <>
      <rect x={14} y={44} width={40} height={68} fill={M} />
      <rect x={86} y={30} width={40} height={82} fill={TINT} />
      <Windows x={19} y={52} cols={4} rows={5} w={4} gx={8.5} fill="#f3d9dd" />
      <Windows x={91} y={38} cols={4} rows={6} w={4} gx={8.5} fill="#fff" />
      <path d="M34 40 Q 70 6, 106 26" fill="none" stroke={M} strokeWidth={1.6} strokeDasharray="3 5" />
      <circle cx={34} cy={40} r={4.5} fill={M} />
      <circle cx={106} cy={26} r={4.5} fill={M} />
      <circle cx={70} cy={13} r={3.5} fill={M} fillOpacity={0.6} />
      <rect x={4} y={110} width={132} height={3} fill={INK} opacity={0.25} />
    </>
  ),
  // three small buses in a row (the fleet)
  fleet: (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${4 + i * 4} ${40 + i * 21}) scale(${1 - i * 0.12})`} opacity={1 - i * 0.18}>
          <rect x={0} y={0} width={104} height={30} rx={6} fill="#fff" stroke={GREY} />
          <rect x={0} y={20} width={104} height={10} rx={3} fill={M} />
          <rect x={8} y={5} width={60} height={11} rx={2} fill={INK} opacity={0.8} />
          <rect x={72} y={4} width={24} height={14} rx={2} fill={INK} opacity={0.8} />
          <circle cx={22} cy={31} r={6} fill="#1a1b20" />
          <circle cx={80} cy={31} r={6} fill="#1a1b20" />
        </g>
      ))}
    </>
  ),
  // a serving cloche with steam
  kitchen: (
    <>
      <path d="M40 30 Q 34 20, 42 12 M62 28 Q 56 16, 64 6 M84 30 Q 78 20, 86 12" fill="none" stroke={M} strokeOpacity={0.45} strokeWidth={2} strokeLinecap="round" />
      <path d="M18 92 A52 46 0 0 1 122 92 Z" fill={M} />
      <circle cx={70} cy={42} r={6} fill={M} />
      <rect x={8} y={92} width={124} height={8} rx={4} fill={GREY} />
      <rect x={30} y={100} width={80} height={6} rx={3} fill={INK} opacity={0.25} />
      <path d="M30 80 Q 50 58, 76 56" fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  // a varied group of people
  people: (
    <>
      <Person x={22} h={42} color={INK} />
      <Person x={44} h={54} color={M} />
      <Person x={68} h={46} color="#b9a79a" />
      <Person x={92} h={58} color={INK} />
      <Person x={116} h={44} color={M} />
      <rect x={6} y={112} width={128} height={3} fill={INK} opacity={0.25} />
    </>
  ),
  // passengers queueing at a bus door
  boarding: (
    <>
      <rect x={70} y={38} width={66} height={72} rx={8} fill="#fff" stroke={GREY} />
      <rect x={70} y={92} width={66} height={18} rx={4} fill={M} />
      <rect x={78} y={46} width={22} height={40} rx={3} fill={INK} opacity={0.85} />
      <rect x={106} y={46} width={22} height={24} rx={3} fill={INK} opacity={0.85} />
      <circle cx={88} cy={112} r={7} fill="#1a1b20" />
      <circle cx={122} cy={112} r={7} fill="#1a1b20" />
      <Person x={20} h={46} color={INK} />
      <Person x={38} h={52} color={M} />
      <Person x={56} h={44} color="#b9a79a" />
    </>
  ),
};

export function MilestoneArt({ art, className }: { art: Art; className?: string }) {
  return (
    <svg viewBox="0 0 140 120" aria-hidden className={className} fill="none">
      {ART[art]}
    </svg>
  );
}
