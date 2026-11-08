"use client";

import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";

const ICONS: Record<"phone" | "mail" | "chat", LucideIcon> = {
  phone: Phone,
  mail: Mail,
  chat: MessageCircle,
};

type Channel = {
  icon: keyof typeof ICONS;
  label: string;
  value: string;
  href: string;
  action: string;
  external?: boolean;
  /** Text placed on the clipboard; omitted for channels that are not copyable. */
  copy?: string;
};

const copyClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-muted transition-colors hover:border-brand-600 hover:text-brand-700 data-[state=copied]:border-brand-600 data-[state=copied]:bg-brand-50 data-[state=copied]:text-brand-700 focus-visible:rounded-full";

/**
 * Three ways to reach the team. Each row is one large link that opens the right app (dialler, mail,
 * WhatsApp); phone and email also get a copy button for people on a desktop without those apps.
 */
export function Channels({ channels }: { channels: Channel[] }) {
  return (
    <ul className="space-y-3">
      {channels.map(({ icon, label, value, href, action, external, copy }) => (
        <li
          key={label}
          className="group relative flex items-center gap-2 rounded-2xl border border-line bg-white transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-600/50 hover:shadow-[0_12px_28px_-16px_rgba(15,23,42,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <a
            href={href}
            className="flex min-w-0 flex-1 items-center gap-4 rounded-2xl p-4 pr-2 focus-visible:rounded-2xl sm:p-5 sm:pr-2"
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
              {(() => {
                const Icon = ICONS[icon];
                return <Icon aria-hidden className="size-5" />;
              })()}
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-muted">{label}</span>
              <span className="block font-display text-lg leading-snug font-semibold tracking-[-0.01em] ">
                {value.includes("@") ? (
                  <>
                    {value.split("@")[0]}@<wbr />
                    {value.split("@")[1]}
                  </>
                ) : (
                  value
                )}
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                {action}
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </span>
            {external && <span className="sr-only">(opens in a new tab)</span>}
          </a>
          {copy && (
            <div className="pr-3 sm:pr-4">
              <CopyButton
                getText={() => copy}
                label={`Copy ${label.toLowerCase()}`}
                iconOnly
                className={copyClass}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
