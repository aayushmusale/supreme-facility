"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, type LucideIcon } from "lucide-react";

export function CopyButton({
  getText,
  label,
  copiedLabel = "Copied",
  icon: Icon = Copy,
  iconOnly = false,
  className,
  disabled,
}: {
  getText: () => string;
  label: string;
  copiedLabel?: string;
  icon?: LucideIcon;
  /** Square icon button: `label` becomes its accessible name. */
  iconOnly?: boolean;
  className?: string;
  disabled?: boolean;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(getText());
      setState("copied");
    } catch {
      // Clipboard can be blocked (insecure context, permissions); say so instead of failing silently.
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        disabled={disabled}
        data-state={state}
        aria-label={iconOnly ? label : undefined}
        title={iconOnly ? (state === "copied" ? copiedLabel : label) : undefined}
        className={className}
      >
        {state === "copied" ? <Check aria-hidden className="size-4" /> : <Icon aria-hidden className="size-4" />}
        {!iconOnly && <span>{state === "copied" ? copiedLabel : state === "failed" ? "Copy failed" : label}</span>}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? copiedLabel : state === "failed" ? "Copy failed" : ""}
      </span>
    </>
  );
}
