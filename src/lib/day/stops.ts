export type Vec3 = readonly [number, number, number];

export type DayStop = {
  id: string;
  /** Hour of day (24h clock) at which this stop becomes active. */
  hour: number;
  timeLabel: string;
  service: string;
  headline: string;
  body: string;
  /** Camera position + lookAt target, tuned against the campus layout (see lib/day/layout.ts). */
  camera: { position: Vec3; target: Vec3 };
  /** Animated stat shown for this stop. All values are [CONFIRM] with the company before launch. */
  counter?: { value: number; suffix: string; label: string };
  cta?: { label: string; href: string };
};

// Copy is placeholder, to be refined/approved by the company.
export const DAY_STOPS: readonly DayStop[] = [
  {
    id: "commute",
    hour: 5,
    timeLabel: "5 AM",
    service: "Employee Transportation",
    headline: "5 AM: The commute begins.",
    body: "Before the city wakes, our fleet is already moving your people safely to work.",
    camera: { position: [12, 8, 26], target: [0, 1.5, 9] },
    counter: { value: 25000, suffix: "+", label: "passengers every day" }, // [CONFIRM]
  },
  {
    id: "spaces",
    hour: 7.5,
    timeLabel: "7:30 AM",
    service: "Integrated Facility Management: Soft services",
    headline: "7:30 AM: Spaces get ready.",
    body: "Housekeeping, front office, and landscaping make every arrival feel effortless.",
    camera: { position: [7, 5, 14], target: [0, 4, 0] },
  },
  {
    id: "systems",
    hour: 10,
    timeLabel: "10 AM",
    service: "Integrated Facility Management: Hard services",
    headline: "10 AM: Systems stay alive.",
    body: "Electrical, mechanical, fire safety, and BMS monitored and maintained, invisibly.",
    camera: { position: [14, 8, 6], target: [6, 4.5, -3] },
  },
  {
    id: "food",
    hour: 13,
    timeLabel: "1 PM",
    service: "Corporate Food Solutions",
    headline: "1 PM: Fed and fuelled.",
    body: "Thousands of meals, prepared and served on time, every day.",
    camera: { position: [0, 4, 6], target: [-7, 1.2, 0.5] },
    counter: { value: 6200, suffix: "+", label: "meals every day" }, // [CONFIRM]
  },
  {
    id: "supply",
    hour: 15,
    timeLabel: "3 PM",
    service: "Supply Chain Solutions",
    headline: "3 PM: Supplies in motion.",
    body: "Inbound and outbound flows managed so your operations never wait.",
    camera: { position: [20, 7, 2], target: [10, 1, -6] },
  },
  {
    id: "production",
    hour: 17,
    timeLabel: "5 PM",
    service: "Production Support Services",
    headline: "5 PM: The floor keeps running.",
    body: "Production support that keeps your core business focused on its core.",
    camera: { position: [-22, 7, 2], target: [-11.5, 1, -6.5] },
  },
  {
    id: "shift-change",
    hour: 19,
    timeLabel: "7 PM",
    service: "Employee Transportation",
    headline: "7 PM: Shift change, seamlessly.",
    body: "The fleet turns around and your people get home safely.",
    camera: { position: [12, 8, 26], target: [0, 1.5, 9] },
    counter: { value: 500, suffix: "+", label: "vehicles in our fleet" }, // [CONFIRM]
  },
  {
    id: "night",
    hour: 22,
    timeLabel: "Midnight",
    service: "Safety, Security & Sustainability",
    headline: "Midnight: Still running.",
    body: "Safe, secure, sustainable. While you sleep, we do not.",
    camera: { position: [4, 8, 30], target: [0, 3.5, 2] },
    cta: { label: "Request a Quote", href: "/contact-us/" }, // CTA destination: confirm
  },
];

/** Index of the last stop whose start hour has been reached. */
export function activeStopIndex(hour: number): number {
  let idx = 0;
  for (let i = 0; i < DAY_STOPS.length; i++) {
    if (hour >= DAY_STOPS[i].hour) idx = i;
  }
  return idx;
}

/** Colours for the static (no-WebGL / reduced-motion) poster of each stop's time of day. */
export type Poster = {
  top: string;
  bottom: string;
  /** Window glow 0..1.2, same idea as the 3D scene. */
  glow: number;
  /** Sun or moon, as % of the poster's width/height. */
  orb?: { x: number; y: number; color: string };
};

export const STOP_POSTERS: Record<string, Poster> = {
  commute: { top: "#0d0820", bottom: "#2c1a4a", glow: 1, orb: { x: 78, y: 18, color: "#e8e4ff" } },
  spaces: { top: "#7a6a9a", bottom: "#f0a070", glow: 0.4, orb: { x: 16, y: 52, color: "#ffd9a0" } },
  systems: { top: "#8fb4cf", bottom: "#d8e0e2", glow: 0, orb: { x: 34, y: 22, color: "#fff4e0" } },
  food: { top: "#7fa9c8", bottom: "#c9d7dc", glow: 0, orb: { x: 54, y: 10, color: "#fff9ec" } },
  supply: { top: "#86a8bf", bottom: "#d6d2c6", glow: 0.05, orb: { x: 72, y: 20, color: "#fff4e0" } },
  production: { top: "#8a6f8c", bottom: "#f0a070", glow: 0.2, orb: { x: 84, y: 46, color: "#ffcf9a" } },
  "shift-change": { top: "#1d1030", bottom: "#5a2f4a", glow: 1 },
  night: { top: "#05030a", bottom: "#1a0d1f", glow: 1.2, orb: { x: 22, y: 18, color: "#e8e4ff" } },
};
