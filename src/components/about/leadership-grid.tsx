"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useIsPresent,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Leader } from "@/content/about";

const HOVER_INTENT_MS = 450;
/** How long a hover-opened window waits for the cursor to reach it before closing itself. */
const ENTRY_WAIT_MS = 2500;
const EASE = [0.22, 1, 0.36, 1] as const;

type Active = {
  index: number;
  /** "hover" windows open under the cursor and close the moment it leaves; "press" windows (click, tap, keyboard) stay until dismissed. */
  via: "hover" | "press";
  /** Viewport point the window grows from: the cursor for hover, the card centre otherwise. */
  point: { x: number; y: number };
};

/**
 * Leader cards. Hovering a card (after a short pause, so a pointer passing over does not trigger it),
 * or pressing its "View profile" button, opens a profile window that grows out of the card: the
 * window opens centred on the cursor, the portrait slides in on the left, the biography settles in on the right. A hover-opened window closes
 * again the moment the mouse leaves it. Built on a native <dialog>: focus is trapped, Escape closes it and
 * the page behind is inert.
 */
export function LeadershipGrid({ leaders }: { leaders: Leader[] }) {
  const [active, setActive] = useState<Active | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const pointer = useRef({ x: 0, y: 0 });

  const open = useCallback(
    (index: number, card: HTMLElement, via: Active["via"]) => {
      window.clearTimeout(hoverTimer.current);
      returnFocus.current = card.querySelector<HTMLElement>("button");
      const rect = card.getBoundingClientRect();
      setActive({
        index,
        via,
        point:
          via === "hover"
            ? { ...pointer.current }
            : { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      });
    },
    [],
  );

  const close = useCallback(() => setActive(null), []);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  function armHover(event: React.PointerEvent<HTMLElement>, index: number) {
    pointer.current = { x: event.clientX, y: event.clientY };
    if (
      event.pointerType !== "mouse" ||
      active ||
      hoverTimer.current !== undefined
    )
      return;
    const card = event.currentTarget;
    hoverTimer.current = window.setTimeout(() => {
      hoverTimer.current = undefined;
      open(index, card, "hover");
    }, HOVER_INTENT_MS);
  }

  const leader = active ? leaders[active.index] : null;

  return (
    <MotionConfig reducedMotion="user">
      <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {leaders.map((item, index) => (
          <li key={item.name}>
            <article
              // Start the hover timer on enter AND on move: when a window closes under the cursor, the
              // card beneath gets a move but no fresh "enter", and it must still open.
              onPointerEnter={(event) => armHover(event, index)}
              onPointerMove={(event) => armHover(event, index)}
              onPointerLeave={() => {
                window.clearTimeout(hoverTimer.current);
                hoverTimer.current = undefined;
              }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,var(--color-brand-50),var(--color-line))]">
                <Image
                  src={item.image}
                  alt={`Portrait of ${item.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">
                {item.name}
              </h3>
              <p className="mt-1 font-medium text-brand-700">{item.role}</p>
              <p className="mt-3 leading-relaxed text-muted">{item.summary}</p>
              {/* <button
                type="button"
                onClick={(event) =>
                  open(index, event.currentTarget.closest("article")!, "press")
                }
                aria-haspopup="dialog"
                className="mt-4 inline-flex w-full items-center gap-1.5 border-t border-line pt-3 font-medium text-brand-700 hover:text-brand-600"
              >
                View profile<span className="sr-only"> of {item.name}</span>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button> */}
            </article>
          </li>
        ))}
      </ul>

      <AnimatePresence
        onExitComplete={() =>
          returnFocus.current?.focus({ preventScroll: true })
        }
      >
        {active && leader && (
          <ProfileWindow
            key="profile"
            leader={leader}
            active={active}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

function ProfileWindow({
  leader,
  active,
  onClose,
}: {
  leader: Leader;
  active: Active;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hoverOpened = active.via === "hover";
  // While fading out, let the pointer fall through to the cards underneath so the next hover registers at once.
  const isPresent = useIsPresent();
  const entered = useRef(false);
  const idleTimer = useRef<number | undefined>(undefined);

  // The window always sits in the centre of the screen; it only grows out of the point it was
  // opened from (the card or the cursor), so the transition still reads as coming from the card.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog || !panel) return;
    if (!dialog.open) dialog.showModal();
    const left = (window.innerWidth - panel.offsetWidth) / 2;
    const top = (window.innerHeight - panel.offsetHeight) / 2;
    panel.style.transformOrigin = `${active.point.x - left}px ${active.point.y - top}px`;
  }, [active.point]);

  // The cursor starts on the card, not on the centred window. Until it reaches the window, give it a
  // few seconds; if it never does, the user has moved on, so close. Once on it, leaving closes at once.
  useEffect(() => {
    if (!hoverOpened) return;
    idleTimer.current = window.setTimeout(onClose, ENTRY_WAIT_MS);
    return () => window.clearTimeout(idleTimer.current);
  }, [hoverOpened, onClose]);

  return (
    <motion.dialog
      ref={dialogRef}
      aria-labelledby="leader-window-title"
      style={isPresent ? undefined : { pointerEvents: "none" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-0 hidden h-dvh max-h-none w-dvw max-w-none place-items-center overflow-hidden bg-transparent p-4 text-ink backdrop:bg-ink/55 open:grid sm:p-8"
    >
      <motion.div
        ref={panelRef}
        style={{ willChange: "transform, opacity" }}
        onPointerEnter={(event) => {
          if (!hoverOpened || event.pointerType !== "mouse") return;
          entered.current = true;
          window.clearTimeout(idleTimer.current);
        }}
        onPointerLeave={(event) => {
          if (hoverOpened && entered.current && event.pointerType === "mouse")
            onClose();
        }}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 0.9,
          transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
        }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative grid max-h-full w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-24px_rgba(27,21,23,0.55)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(160deg,var(--color-brand-50),var(--color-line))] md:aspect-auto md:min-h-[26rem]">
          <motion.div
            initial={{ x: "35%", scale: 1.12 }}
            animate={{
              x: 0,
              scale: 1,
              transition: { delay: 0.08, duration: 0.7, ease: EASE },
            }}
            exit={{ transition: { duration: 0 } }}
            className="absolute inset-0"
          >
            <Image
              src={leader.image}
              alt={`Portrait of ${leader.name}`}
              fill
              sizes="(min-width: 768px) 340px, 100vw"
              className="object-cover object-top"
            />
          </motion.div>
        </div>

        <div className="min-h-0 overflow-y-auto p-6 sm:p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.22, duration: 0.55, ease: EASE },
            }}
            exit={{ transition: { duration: 0 } }}
          >
            <h3
              id="leader-window-title"
              className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance"
            >
              {leader.name}
            </h3>
            <p className="mt-2 font-medium text-brand-700">{leader.role}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.32, duration: 0.55, ease: EASE },
            }}
            exit={{ transition: { duration: 0 } }}
            className="mt-6 max-w-[62ch] space-y-4 leading-relaxed text-ink/80"
          >
            {leader.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.dialog>
  );
}
