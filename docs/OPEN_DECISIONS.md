# Open decisions and content flags

Status key: **Confirmed** = approved by owner · **Assumption** = temporary choice in code · **Recommendation** = proposed, needs approval.
Search the code for `FLAG` and `TEMPORARY` to find each item in context.

## Decisions needed

| # | Topic | Owner | Current state in code | Status |
|---|-------|-------|----------------------|--------|
| 1 | Enquiry form destination (email service or CRM) | IT / Sales | `src/lib/enquiry-delivery.ts`: mock in development, fails safely in production | Assumption |
| 2 | Rate limiting store / WAF | IT | In-memory per instance (`src/lib/rate-limit.ts`); replace with edge or shared store | Assumption |
| 3 | Hosting platform and data region | IT | No platform-specific features used | Pending |
| 4 | CMS / editor self-service | Marketing / IT | Typed content files in `src/content/` | Assumption |
| 5 | Analytics and cookie consent | Marketing / Legal | None installed | Pending |
| 6 | Recruitment flow (email vs ATS) and CV handling | HR / Legal | Email applications only, no CV upload | Assumption |
| 7 | Privacy notice and enquiry consent wording | Legal | Placeholder consent text in enquiry form | Pending |
| 8 | Search indexing at launch | IT / Marketing | `ALLOW_INDEXING` env var, off by default | Assumption |
| 9 | Investor Relations document list and taxonomy | IR / Company Secretary | Not built yet | Pending |
| 10 | Brand: "LVS Group" / "LVS Supply Chain Solutions" naming on service pages | Marketing | Kept as on live site | Pending |

## Content conflicts to resolve (live site disagrees with itself)

| Topic | Values found | Where |
|-------|-------------|-------|
| Clients | 175+ (home) vs 150+ (About) vs 25+ (ETS page) | `site.ts`, `about.ts`, `services.ts` |
| States | 14+ (home) vs 7+ (About) vs 5 (2022 milestone) | `site.ts`, `about.ts` |
| Employees | 17,000+ (home) vs 10,000+ (About, 2024 milestone) | `site.ts`, `about.ts` |
| ETS passengers / fleet | 25,000+ / 500+ (home) vs 36,000+ / 550+ (ETS page) vs 400+ (2024 milestone) | `site.ts`, `services.ts`, `about.ts` |
| Years of experience | "since 1983", "40+ years", "four decades", "30+ years" (Healthcare) | several pages |

## Claims needing verification before launch

- ETS: 100% trip fulfilment, 100% safe drop, 98% on-time arrival, 25% cost reduction, ~200 guards after 7 pm.
- Food: FSSAI certified. Plumbing: "fully licensed and insured".
- About: 98% client retention; revenue milestones (₹100/200/300 crore) and acquisition stakes (IR/Compliance sign-off).
- Client names in milestones (Tata Motors, Škoda Auto Volkswagen India, BharatBenz): confirm permission.
- ESG: "eliminated single-use plastics from daily operations".
- Softened on purpose: Fire "foremost authority", Helpdesk "SLAs met without fail", Fire "quote within 24 hours" (removed).

## Careers

All four roles from the live site (last updated Dec 2024) are `hrVerified: false` in `src/content/careers.ts`.
They show only in development. HR must confirm which are open before setting `hrVerified: true`.

## Assets

- Hero and main service images are Unsplash placeholders (`TEMPORARY` in code). Replace with company photography.
- Company images are hotlinked from the WordPress site. Download into `/public` before the old site is retired.
- Client logos for `/sectors/#homeclient` are missing. Need an approved client list and logo files.
