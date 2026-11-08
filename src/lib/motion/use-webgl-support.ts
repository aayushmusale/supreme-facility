"use client";

import { useEffect, useState } from "react";

/**
 * Feature-detects WebGL support. Starts `false` — the safe default of "no 3D"
 * — until confirmed on the client, so the first client paint always matches
 * the server-rendered markup (same hydration-safety convention as
 * useReducedMotion: this only ever gates a client-side decision, never
 * server-rendered text or structure).
 */
export function useWebglSupport(): boolean {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
