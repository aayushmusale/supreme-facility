# Supreme Facility Management: website

Marketing website for Supreme Facility Management (est. 1983, L. V. Shinde Group): services, sectors, investor
information, careers and an enquiry form. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
GSAP and Three.js. There is no database and no login; page content lives in code under `src/content/`.

> This project uses a recent Next.js with changes from older versions. Before changing framework-level code, read the
> matching guide in `node_modules/next/dist/docs/`.

For a plain-language tour of how the site fits together, with diagrams, read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Run it

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then edit as needed (see below)
npm run dev                  # http://localhost:3000
```

| Command                | What it does                                            |
| ---------------------- | ------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload                      |
| `npm run build`        | Production build (run this before every push)          |
| `npm run start`        | Serve the production build                              |
| `npm run lint`         | ESLint                                                  |
| `npm run typecheck`    | TypeScript check, no output files                       |
| `npm run format`       | Format the code with Prettier                           |
| `npm run format:check` | Report files that are not formatted                     |
| `npm run analyze`      | Open the bundle analyzer to see what makes pages heavy  |

Always check the real thing with `npm run build && npm run start`: the development server can show stale styles.

## Environment variables

Copy `.env.example` to `.env.local`. Never commit real values; `.env*` files are git-ignored except the example.

| Variable            | Values            | Meaning                                                                                                |
| ------------------- | ----------------- | ------------------------------------------------------------------------------------------------------ |
| `ALLOW_INDEXING`    | `true` / `false`  | Lets search engines index the site. Keep `false` everywhere except approved production.                |
| `ENQUIRY_DELIVERY`  | `mock`            | Development only: the enquiry form logs a redacted summary. In production, delivery fails safely until a real destination is configured. |

Add any new secret as a server-only variable. Only names starting with `NEXT_PUBLIC_` reach the browser.

## Where things are

```
src/app/         Pages, the enquiry Server Action, sitemap, robots, error and 404 pages, share-card image
src/components/  Reusable parts: layout, home sections, page blocks, motion, 3D scenes, UI
src/content/     All text and data: services, about, careers, investor documents, navigation
src/lib/         Helpers: form validation, rate limit, SEO, motion and device checks
public/          Images and static files
docs/            Requirements (PRD/TRD), open decisions, architecture and diagrams
```

To add or change a service page, edit its entry in `src/content/`. Pages at the site root (for example
`/supply-chain-solutions/`) are all built from one template, `src/app/[slug]/page.tsx`.

## Security notes

- Security headers, including a Content Security Policy and HSTS, are set in `next.config.ts`. If you add a new
  third-party script, font, image host, map or embed, add its address to the policy first or the browser will block it.
- The enquiry form has a hidden honeypot field, a minimum fill time, a per-network rate limit and server-side
  validation (Zod). The rate limit is kept in server memory, so replace it with a firewall rule or shared store on the
  chosen host.

## Before launch

Open decisions are tracked in [docs/OPEN_DECISIONS.md](docs/OPEN_DECISIONS.md). The main ones: where enquiries are
delivered (email or CRM), the hosting platform, and replacing temporary images hotlinked from the old site and Unsplash
with files in `public/`.

## Deploying

Hosting is not decided yet. Any host that runs Next.js works. In general:

1. Set the environment variables above for the target environment (preview and production separately).
2. `npm run build` must pass.
3. Set `ALLOW_INDEXING=true` only for the approved production site.
4. Serve over HTTPS on the final domain.

## Changing the home page About section

The About section (3D tour) is in `src/components/home/company-intro.tsx`. To return to the older split layout, change
one import in `src/app/page.tsx` as described in the comment there.
