"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Cpu,
  Handshake,
  Landmark,
  Link2,
  Mail,
  MapPin,
  Plus,
  SearchX,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Job, JobTeam } from "@/content/careers";
import { cn } from "@/lib/utils";

const TEAM_ICON: Record<JobTeam, LucideIcon> = {
  Technology: Cpu,
  Sales: Handshake,
  Finance: Landmark,
  "Supply chain": Truck,
};

/** "Pune (Akurdi)" and "Akurdi (Pimpri Chinchwad)" are both the Akurdi site; otherwise the city. */
const placeOf = (job: Job) => (/akurdi/i.test(job.location) ? "Akurdi" : job.location.split(" ")[0]);

function tally<T extends string>(jobs: Job[], pick: (job: Job) => T): [T, number][] {
  const counts = new Map<T, number>();
  for (const job of jobs) counts.set(pick(job), (counts.get(pick(job)) ?? 0) + 1);
  return [...counts];
}

function openingsLabel(job: Job) {
  const value = job.facts?.find((fact) => fact.label === "Vacancy")?.value;
  if (!value) return null;
  return /^\d+$/.test(value) ? `${value} ${value === "1" ? "opening" : "openings"}` : `Vacancy: ${value}`;
}

// The URL hash is an external store: reading it this way keeps server and first client render
// identical (no hash), then re-renders with the real one, so deep links like /careers/#tax-manager
// open that role without a hydration mismatch.
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

/** An email address with one legal line break, right after the "@": it can wrap, but never mid-word. */
function BreakableEmail({ email }: { email: string }) {
  const at = email.indexOf("@");
  return (
    <>
      {email.slice(0, at + 1)}
      <wbr />
      {email.slice(at + 1)}
    </>
  );
}

/* ---------- Filters ---------- */

function FilterGroup({
  label,
  options,
  total,
  value,
  onChange,
}: {
  label: string;
  options: [string, number][];
  total: number;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      // Phones: a single swipeable line per filter (wrapping would push the roles below the fold).
      className="-mx-5 flex items-center gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      <span className="w-[4.5rem] shrink-0 text-sm font-medium text-muted">{label}</span>
      {[["All", total] as [string, number], ...options].map(([name, count]) => {
        const selected = value === name;
        return (
          <button
            key={name}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(name)}
            className={cn(
              "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 focus-visible:rounded-full",
              selected
                ? "border-oxblood bg-oxblood text-white"
                : "border-line bg-white text-ink hover:border-ink/30",
            )}
          >
            {name}
            <span className={cn("tabular-nums", selected ? "text-white/70" : "text-muted")}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- One role ---------- */

function RoleRow({
  job,
  email,
  open,
  onToggle,
}: {
  job: Job;
  email: string;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = TEAM_ICON[job.team];
  const openings = openingsLabel(job);
  const panelId = `${job.id}-panel`;
  const buttonId = `${job.id}-button`;

  return (
    <li id={job.id} className="scroll-mt-28">
      <div
        className={cn(
          "rounded-3xl border bg-white transition-[border-color,box-shadow] duration-300",
          open
            ? "border-brand-600/30 shadow-[0_20px_44px_-26px_rgb(42_13_16/0.45)]"
            : "border-line hover:border-brand-200",
        )}
      >
        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className="group flex w-full items-center gap-4 rounded-3xl p-5 text-left focus-visible:rounded-3xl md:gap-5 md:p-6"
          >
            <span
              aria-hidden
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300",
                open ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600 group-hover:bg-brand-100",
              )}
            >
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg leading-snug font-semibold text-balance md:text-xl">
                {job.title}
              </span>
              <span className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1">
                  <MapPin aria-hidden className="size-3.5" />
                  {job.location}
                </span>
                <span>{job.team}</span>
                {openings && <span>{openings}</span>}
                {!job.hrVerified && (
                  <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-medium text-ink">
                    Dev only: pending HR verification
                  </span>
                )}
              </span>
            </span>
            <Plus
              aria-hidden
              className={cn(
                "size-5 shrink-0 text-brand-600 transition-transform duration-300 ease-(--ease-motion)",
                open && "rotate-45",
              )}
            />
          </button>
        </h3>

        {/* Always in the DOM (readable by crawlers); `inert` keeps the collapsed panel out of the tab order. */}
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-(--ease-motion)",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="px-5 pt-1 pb-6 md:px-6 md:pb-8">
              <p className="max-w-[65ch] leading-relaxed text-ink/80">{job.summary}</p>

              {job.facts && (
                <dl className="mt-5 grid gap-x-6 gap-y-4 rounded-2xl bg-black/[0.04] p-5 sm:grid-cols-3">
                  {job.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-sm text-muted">{fact.label}</dt>
                      <dd className="mt-0.5 font-medium text-pretty">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className={cn("mt-7 grid gap-8", job.details.length > 1 && "md:grid-cols-2")}>
                {job.details.map((block) => (
                  <div key={block.heading}>
                    <h4 className="font-display text-lg font-semibold">{block.heading}</h4>
                    <ul className="mt-3 space-y-2.5 leading-relaxed text-ink/80">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="relative pl-5 before:absolute before:top-[0.65em] before:left-0 before:size-1.5 before:rounded-full before:bg-brand-500"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-600 px-5 font-medium text-white transition-colors duration-200 hover:bg-brand-800 focus-visible:rounded-full"
                >
                  <Mail aria-hidden className="size-4" />
                  Apply by email
                  <span className="sr-only"> for {job.title}</span>
                </a>
                <CopyButton
                  getText={() => `${window.location.origin}/careers/#${job.id}`}
                  label="Copy link to this role"
                  copiedLabel="Link copied"
                  icon={Link2}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 px-5 font-medium transition-colors duration-200 hover:border-ink/40 focus-visible:rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/* ---------- How to apply (reacts to the open role) ---------- */

const STEPS = [
  "Email your latest CV with your expected CTC.",
  "Mention the position you are applying for in the subject line.",
  "Our HR team will contact shortlisted candidates.",
];

// Square icon button; the check icon and gold tint confirm a successful copy.
const chipButton =
  "absolute top-1/2 right-1 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-lg bg-white/10 transition-colors duration-200 hover:bg-white/20 focus-visible:rounded-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/10 data-[state=copied]:text-gold";

function ApplyPanel({ email, role }: { email: string; role: Job | null }) {
  const subject = role ? `Application: ${role.title}` : null;
  const mailto = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  return (
    <aside aria-labelledby="apply-title" className="lg:sticky lg:top-28 lg:self-start">
      <SpotlightCard className="theme-dark rounded-3xl bg-oxblood text-white">
        <div className="p-7 md:p-8">
          <h2 id="apply-title" className="font-display text-2xl font-semibold">
            How to apply
          </h2>

          <ol className="mt-7">
            {STEPS.map((step, i) => (
              <li key={step} className={cn("relative pl-12", i < STEPS.length - 1 && "pb-7")}>
                <span
                  aria-hidden
                  className="absolute top-0 left-0 flex size-8 items-center justify-center rounded-full bg-gold/15 text-sm font-semibold text-gold tabular-nums ring-1 ring-gold/40"
                >
                  {i + 1}
                </span>
                {i < STEPS.length - 1 && <span aria-hidden className="absolute top-10 bottom-1 left-4 w-px bg-white/15" />}
                <p className="leading-relaxed text-white/85">{step}</p>

                {i === 0 && (
                  <div className="relative mt-3 rounded-xl bg-white/[0.07] py-2.5 pr-12 pl-3 ring-1 ring-white/10">
                    <a href={`mailto:${email}`} className="block text-[0.95rem] font-medium break-normal underline-offset-4 hover:underline">
                      <BreakableEmail email={email} />
                    </a>
                    <CopyButton getText={() => email} label="Copy email address" copiedLabel="Copied" iconOnly className={chipButton} />
                  </div>
                )}

                {i === 1 && (
                  <div className="relative mt-3 rounded-xl bg-white/[0.07] py-2.5 pr-12 pl-3 ring-1 ring-white/10">
                    {/* Re-keyed so the text eases in each time the open role changes. */}
                    <span key={subject ?? "none"} className={cn("block animate-pop text-[0.95rem] font-medium break-words", !subject && "text-white/65")}>
                      {subject ?? "Open a role to fill this in"}
                    </span>
                    <CopyButton
                      getText={() => subject ?? ""}
                      label="Copy subject line"
                      copiedLabel="Copied"
                      iconOnly
                      disabled={!subject}
                      className={chipButton}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>

          <a
            href={mailto}
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 font-medium text-ink transition-colors duration-200 hover:bg-brand-50 focus-visible:rounded-full"
          >
            <Mail aria-hidden className="size-4" />
            Email your CV
            {role && <span className="sr-only"> for {role.title}</span>}
          </a>
        </div>
      </SpotlightCard>
    </aside>
  );
}

/* ---------- The board ---------- */

export function RoleBoard({ jobs, email }: { jobs: Job[]; email: string }) {
  const [team, setTeam] = useState("All");
  const [place, setPlace] = useState("All");
  // undefined = the user hasn't picked yet, so the URL hash (if any) decides; null = explicitly closed.
  const [picked, setPicked] = useState<string | null | undefined>(undefined);
  const hash = useSyncExternalStore(subscribeHash, getHash, getServerHash);
  const settle = useRef<number | undefined>(undefined);

  const teams = useMemo(() => tally(jobs, (job) => job.team), [jobs]);
  const places = useMemo(() => tally(jobs, placeOf), [jobs]);
  const visible = useMemo(
    () => jobs.filter((job) => (team === "All" || job.team === team) && (place === "All" || placeOf(job) === place)),
    [jobs, team, place],
  );

  // A role that a filter hides counts as closed.
  const candidate = picked !== undefined ? picked : hash;
  const openId = visible.some((job) => job.id === candidate) ? candidate : null;
  const openRole = jobs.find((job) => job.id === openId) ?? null;

  // Land on the role named in the URL (the browser's own anchor jump happens before the layout settles).
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
    return () => window.clearTimeout(settle.current);
  }, []);

  function toggle(id: string) {
    const next = openId === id ? null : id;
    setPicked(next);
    window.history.replaceState(null, "", next ? `#${next}` : window.location.pathname);
    if (!next) return;
    // Opening one role collapses another, which can shift this row off-screen: once the height
    // transition has finished, bring it back under the header if needed.
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 96 || top > window.innerHeight * 0.6) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
      }
    }, 340);
  }

  function clearFilters() {
    setTeam("All");
    setPlace("All");
  }

  return (
    <section id="openings" aria-labelledby="openings-title" className="content-py scroll-mt-28">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)] lg:gap-16">
        <div className="min-w-0">
          <h2 id="openings-title" className="font-display text-h2 font-semibold tracking-[-0.03em]">
            Current openings
          </h2>

          {jobs.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-line bg-white p-8">
              <p className="text-lg font-medium">There are no openings listed right now.</p>
              <p className="mt-2 text-muted">
                We are always glad to hear from talented people. Email your CV to{" "}
                <a href={`mailto:${email}`} className="font-medium text-brand-700 underline underline-offset-4">
                  {email}
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              <div className="mt-7 space-y-3">
                <FilterGroup label="Team" options={teams} total={jobs.length} value={team} onChange={setTeam} />
                <FilterGroup label="Location" options={places} total={jobs.length} value={place} onChange={setPlace} />
              </div>

              <p role="status" className="mt-5 text-sm text-muted">
                Showing {visible.length} of {jobs.length} roles
              </p>

              {visible.length === 0 ? (
                <div className="mt-4 rounded-3xl border border-dashed border-ink/20 p-8 text-center">
                  <SearchX aria-hidden className="mx-auto size-8 text-brand-600" strokeWidth={1.5} />
                  <p className="mt-4 text-lg font-medium">No roles match those filters.</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 inline-flex h-11 items-center rounded-full border border-ink/15 px-5 font-medium transition-colors duration-200 hover:border-ink/40 hover:bg-white focus-visible:rounded-full"
                  >
                    Show all roles
                  </button>
                </div>
              ) : (
                <ul className="mt-4 space-y-3">
                  {visible.map((job) => (
                    <RoleRow key={job.id} job={job} email={email} open={openId === job.id} onToggle={() => toggle(job.id)} />
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-dashed border-ink/20 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
                <div>
                  <h3 className="font-display text-xl font-semibold">Not seeing your role?</h3>
                  <p className="mt-1.5 max-w-[52ch] text-ink/80">
                    We are always glad to hear from talented people. Email your CV to{" "}
                    <a href={`mailto:${email}`} className="font-medium text-brand-700 underline underline-offset-4">
                      {email}
                    </a>
                    .
                  </p>
                </div>
                <CopyButton
                  getText={() => email}
                  label="Copy email"
                  copiedLabel="Copied"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-ink/15 px-5 font-medium transition-colors duration-200 hover:border-ink/40 hover:bg-white focus-visible:rounded-full"
                />
              </div>
            </>
          )}
        </div>

        <ApplyPanel email={email} role={openRole} />
      </div>
    </section>
  );
}
