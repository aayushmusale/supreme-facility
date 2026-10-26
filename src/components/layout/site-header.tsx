"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { company, ifmMenu, mainNav, services, type NavLink } from "@/content/site";
import { cn } from "@/lib/utils";

const otherServices = services.filter((s) => s.href !== ifmMenu.overview.href);

function isActive(pathname: string, href: string) {
  const path = href.split("#")[0].replace(/\/$/, "");
  return path === "" ? pathname === "/" : pathname.startsWith(path);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const lastPointer = useRef<string>("mouse");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const openNow = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const triggerClick = (label: string) => {
    // Mouse users already opened it on hover, so a click keeps it open. Keyboard/touch toggles.
    if (lastPointer.current === "mouse") openNow(label);
    else setOpenMenu((current) => (current === label ? null : label));
    lastPointer.current = "keyboard";
  };

  const navLinkClass =
    "inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.95rem] font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink aria-[current=page]:text-brand-700 aria-expanded:bg-ink/5 aria-expanded:text-ink";

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "relative mx-auto flex h-16 max-w-7xl items-center gap-3 rounded-2xl border border-white/70 bg-white/90 pr-2 pl-4 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/80",
          scrolled || mobileOpen ? "shadow-[0_12px_40px_-16px_rgb(27_21_23/0.35)]" : "shadow-[0_4px_20px_-12px_rgb(27_21_23/0.25)]",
        )}
      >
        <Link href="/" onClick={closeAll} className="shrink-0" aria-label={`${company.shortName} home`}>
          <Image src={company.logo} alt="" width={280} height={58} priority className="h-9 w-auto sm:h-10" />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              if (item.kind === "link") {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className={navLinkClass}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const panelId = `menu-${item.label.toLowerCase()}`;
              const isOpen = openMenu === item.label;

              return (
                <li
                  key={item.label}
                  className={item.kind === "menu" ? "relative" : undefined}
                  onPointerEnter={(e) => e.pointerType === "mouse" && openNow(item.label)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
                >
                  <button
                    type="button"
                    className={navLinkClass}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onPointerDown={(e) => {
                      lastPointer.current = e.pointerType;
                    }}
                    onClick={() => triggerClick(item.label)}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
                  </button>

                  {item.kind === "menu" ? (
                    <div id={panelId} hidden={!isOpen} className="absolute top-full left-0 pt-3">
                      <ul className="w-72 animate-pop rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-20px_rgb(27_21_23/0.35)]">
                        {item.items.map((link) => (
                          <li key={link.href}>
                            <PanelLink link={link} pathname={pathname} onNavigate={closeAll} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div id={panelId} hidden={!isOpen} className="absolute inset-x-0 top-full pt-3">
                      <ServicesPanel pathname={pathname} onNavigate={closeAll} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Link
            href="/contact-us/"
            onClick={closeAll}
            className="hidden h-11 items-center gap-1.5 rounded-xl bg-brand-600 px-4 text-[0.95rem] font-medium text-white transition-colors hover:bg-brand-700 sm:inline-flex"
          >
            Contact us
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl text-ink hover:bg-ink/5 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        hidden={!mobileOpen}
        className="fixed inset-x-3 top-[5.25rem] bottom-3 animate-pop overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-3 shadow-2xl sm:inset-x-4 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => {
              if (item.kind === "link") {
                return (
                  <li key={item.label}>
                    <MobileLink href={item.href} label={item.label} pathname={pathname} onNavigate={closeAll} />
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-4 text-lg font-medium">
                      {item.label}
                      <ChevronDown aria-hidden className="size-5 text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="pb-3 pl-3">
                      {item.kind === "menu" ? (
                        item.items.map((link) => (
                          <MobileLink key={link.href} href={link.href} label={link.label} pathname={pathname} onNavigate={closeAll} small />
                        ))
                      ) : (
                        <MobileServices pathname={pathname} onNavigate={closeAll} />
                      )}
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-4 grid gap-2 border-t border-line pt-4">
          <Link
            href="/contact-us/"
            onClick={closeAll}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 font-medium text-white"
          >
            Contact us
          </Link>
          <a href={company.phone.href} className="inline-flex h-12 items-center justify-center rounded-xl border border-line font-medium">
            Call {company.phone.display}
          </a>
        </div>
      </div>
    </header>
  );
}

function PanelLink({ link, pathname, onNavigate }: { link: NavLink; pathname: string; onNavigate: () => void }) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={isActive(pathname, link.href) ? "page" : undefined}
      className="block rounded-xl px-3 py-2.5 text-[0.95rem] text-ink/80 transition-colors hover:bg-stone hover:text-ink aria-[current=page]:text-brand-700"
    >
      {link.label}
    </Link>
  );
}

function ServicesPanel({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <div className="grid animate-pop grid-cols-[1fr_1fr_1fr_1.15fr] gap-2 rounded-2xl border border-line bg-white p-3 shadow-[0_24px_60px_-20px_rgb(27_21_23/0.35)]">
      <div className="col-span-3 p-3">
        <Link
          href={ifmMenu.overview.href}
          onClick={onNavigate}
          className="group/ifm inline-flex items-center gap-1.5 font-display text-xl font-semibold text-ink hover:text-brand-700"
        >
          {ifmMenu.overview.label}
          <ArrowUpRight aria-hidden className="size-5 transition-transform group-hover/ifm:translate-x-0.5 group-hover/ifm:-translate-y-0.5" />
        </Link>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {ifmMenu.groups.map((group) => (
            <div key={group.href}>
              <Link href={group.href} onClick={onNavigate} className="px-3 text-sm font-semibold text-muted hover:text-brand-700">
                {group.label}
              </Link>
              <ul className="mt-1">
                {group.items.map((link) => (
                  <li key={link.href}>
                    <PanelLink link={link} pathname={pathname} onNavigate={onNavigate} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="px-3 text-sm font-semibold text-muted">More within IFM</p>
            <ul className="mt-1">
              {ifmMenu.more.map((link) => (
                <li key={link.href}>
                  <PanelLink link={link} pathname={pathname} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-stone p-3">
        <ul className="space-y-1">
          {otherServices.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                onClick={onNavigate}
                className="block rounded-lg px-3 py-2.5 font-medium text-ink transition-colors hover:bg-white hover:text-brand-700"
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/services/"
          onClick={onNavigate}
          className="mt-3 block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:underline"
        >
          View all services
        </Link>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  label,
  pathname,
  onNavigate,
  small,
}: {
  href: string;
  label: string;
  pathname: string;
  onNavigate: () => void;
  small?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive(pathname, href) ? "page" : undefined}
      className={cn(
        "block rounded-xl px-3 aria-[current=page]:text-brand-700",
        small ? "py-2.5 text-base text-ink/80" : "py-4 text-lg font-medium",
      )}
    >
      {label}
    </Link>
  );
}

function MobileServices({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <div className="space-y-3">
      <MobileLink href="/services/" label="All services" pathname={pathname} onNavigate={onNavigate} small />
      <MobileLink href={ifmMenu.overview.href} label={ifmMenu.overview.label} pathname={pathname} onNavigate={onNavigate} small />
      {ifmMenu.groups.map((group) => (
        <div key={group.href} className="ml-3 border-l border-line pl-2">
          <MobileLink href={group.href} label={group.label} pathname={pathname} onNavigate={onNavigate} small />
          {group.items.map((link) => (
            <MobileLink key={link.href} href={link.href} label={link.label} pathname={pathname} onNavigate={onNavigate} small />
          ))}
        </div>
      ))}
      <div className="ml-3 border-l border-line pl-2">
        {ifmMenu.more.map((link) => (
          <MobileLink key={link.href} href={link.href} label={link.label} pathname={pathname} onNavigate={onNavigate} small />
        ))}
      </div>
      {otherServices.map((service) => (
        <MobileLink key={service.href} href={service.href} label={service.title} pathname={pathname} onNavigate={onNavigate} small />
      ))}
    </div>
  );
}






// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// const navigation = [
//   { label: "About", href: "/about" },
//   {
//     label: "Services",
//     href: "/services",
//     children: [
//       { label: "All services", href: "/services" },
//       { label: "Integrated facility management", href: "/services/integrated-facility-management" },
//       { label: "Supply chain solutions", href: "/services/supply-chain-solutions" },
//       { label: "Employee transportation", href: "/services/employee-transportation" },
//       { label: "Corporate food solutions", href: "/services/corporate-food-solutions" },
//       { label: "Production support", href: "/services/production-support" },
//     ],
//   },
//   { label: "Sectors", href: "/sectors" },
//   { label: "Investor relations", href: "/investor-relations" },
//   { label: "Careers", href: "/careers" },
//   { label: "Contact", href: "/contact" },
// ];

// export function SiteHeader() {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const updateHeader = () => setIsScrolled(window.scrollY > 24);
//     updateHeader();
//     window.addEventListener("scroll", updateHeader, { passive: true });
//     return () => window.removeEventListener("scroll", updateHeader);
//   }, []);

//   return (
//     <header className={`site-header${isScrolled || pathname !== "/" ? " is-scrolled" : ""}`}>
//       <div className="page-container header-inner">
//         <Link className="header-logo-link" href="/" aria-label="Supreme Facility Management home" onClick={() => setIsOpen(false)}>
//           <Image
//             className="site-logo"
//             src="/sfm-sticky-logo-1.png"
//             alt=""
//             width={280}
//             height={58}
//             priority
//           />
//         </Link>

//         <button
//           className="menu-toggle"
//           type="button"
//           aria-expanded={isOpen}
//           aria-controls="primary-navigation"
//           onClick={() => setIsOpen((open) => !open)}
//         >
//           <span>{isOpen ? "Close" : "Menu"}</span>
//           <svg className="menu-icon" viewBox="0 0 20 20" aria-hidden="true"><path d={isOpen ? "M4 4l12 12M16 4 4 16" : "M3 5h14M3 10h14M3 15h14"} /></svg>
//         </button>

//         <nav
//           id="primary-navigation"
//           className={`primary-navigation${isOpen ? " is-open" : ""}`}
//           aria-label="Primary navigation"
//         >
//           {navigation.map((item) => (
//             <div className="nav-item" key={item.label}>
//               {item.children ? (
//                 <details className="nav-dropdown">
//                   <summary>{item.label}</summary>
//                   <div className="dropdown-panel">
//                     {item.children.map((child) => (
//                       <Link href={child.href} key={child.href} onClick={() => setIsOpen(false)}>
//                         {child.label}
//                       </Link>
//                     ))}
//                   </div>
//                 </details>
//               ) : (
//                 <Link href={item.href} onClick={() => setIsOpen(false)}>{item.label}</Link>
//               )}
//             </div>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// }

