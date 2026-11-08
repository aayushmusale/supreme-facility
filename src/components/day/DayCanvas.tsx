"use client";

import dynamic from "next/dynamic";
import type { Quality } from "@/lib/day/quality";

// ssr:false: the scene touches WebGL/window on import and must never run on the server.
// Capability gating (reduced motion / WebGL) is done by DaySection before this mounts,
// so the three.js/R3F chunk is only downloaded for visitors who will actually see it.
const DayScene = dynamic(() => import("./DayScene"), { ssr: false });

type DayCanvasProps = {
  quality: Quality;
  /** False while the section is far off-screen: the scene stays mounted but stops rendering. */
  active: boolean;
  /** Called if the browser drops the WebGL context; the caller swaps in the static fallback. */
  onContextLost: () => void;
};

export function DayCanvas({ quality, active, onContextLost }: DayCanvasProps) {
  return <DayScene quality={quality} active={active} onContextLost={onContextLost} />;
}
