"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point for GSAP plugins. Every motion component imports
 * gsap/ScrollTrigger/useGSAP from here instead of their packages directly,
 * so registerPlugin is never called more than once across the app.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
