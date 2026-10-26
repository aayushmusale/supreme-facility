"use client";

import { useEffect, useRef } from "react";

const formatter = new Intl.NumberFormat("en-IN");

type CounterProps = { value: number; suffix?: string; durationMs?: number };

/**
 * Server renders the final number (good for SEO, no-JS and screen readers).
 * Only counts up if the number starts below the fold and motion is allowed.
 */
export function Counter({ value, suffix = "", durationMs = 1400 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${formatter.format(value)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.textContent = `0${suffix}`;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${formatter.format(Math.round(value * eased))}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = finalText;
    };
  }, [value, suffix, durationMs, finalText]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </>
  );
}
