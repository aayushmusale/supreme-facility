import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy. Pages are prerendered (static), so a per-request nonce is not possible and
 * Next.js needs 'unsafe-inline' for its own bootstrap scripts and for styles. Everything else is locked to
 * this site: no other script hosts, no framing, no foreign form targets. 'unsafe-eval' is development only.
 * Image hosts mirror images.remotePatterns below (temporary hotlinks, remove with them).
 * Add a host here BEFORE using it (analytics, email widget, map embed), or the browser will block it.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://supremefacility.com https://images.unsplash.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Browsers only honour HSTS over HTTPS, so this is inert on http://localhost. No "preload": that is a
  // long-lived commitment to decide once the production domain and every subdomain are confirmed HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  // Live WordPress site uses trailing slashes (/about-us/, /investor/). Keep them so old URLs keep working.
  trailingSlash: true,
  poweredByHeader: false,
  experimental: {
    // Set by `next upgrade --agent=security`: keeps the build reminding about security advisories.
    agentUpgrade: "security",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // TEMPORARY: company images hotlinked from the live site. Move into /public before launch.
      { protocol: "https", hostname: "supremefacility.com", pathname: "/wp-content/uploads/**" },
      // TEMPORARY: stock placeholders. Replace with company-owned photography.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;





// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   cacheComponents: true,
//   partialPrefetching: true,
//   turbopack: {
//     rules: {
//       "*.css": {
//         loaders: ["@tailwindcss/turbopack"],
//         as: "*.css",
//       },
//     },
//   },
// };

// export default nextConfig;
