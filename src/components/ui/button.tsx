import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  light: "bg-white text-ink hover:bg-brand-50",
  "outline-light": "border border-white/30 text-white hover:border-white/60 hover:bg-white/10",
  outline: "border border-ink/15 text-ink hover:border-ink/40 hover:bg-white",
} as const;

const sizes = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
} as const;

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  newTab?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", className, newTab }: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200",
    variants[variant],
    sizes[size],
    className,
  );

  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
