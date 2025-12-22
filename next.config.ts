import type { NextConfig } from "next";

/**
 * Base security headers (safe everywhere, including 3D)
 */
const baseSecurityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

/**
 * Relaxed CSP for 3D Gallery (allows Web Workers)
 * CRITICAL: Three.js Text component requires blob: workers
 */
const gallerySecurityHeaders = [
  ...baseSecurityHeaders,
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:", // Allow blob for workers
      "worker-src 'self' blob:", // CRITICAL: Allow Web Workers
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.r2.cloudflarestorage.com https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

/**
 * Full CSP + security headers
 * (DO NOT APPLY TO 3D GALLERY)
 */
const fullSecurityHeaders = [
  ...baseSecurityHeaders,
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // StrictMode OFF for Three.js / WASM stability
  reactStrictMode: false,

  async headers() {
    return [
      /**
       * RELAXED SECURITY FOR ALL GALLERY ROUTES
       * Matches /gallery and /gallery/any-category
       * MUST come FIRST to take precedence
       */
      {
        source: "/gallery/:path*",
        headers: gallerySecurityHeaders,
      },

      /**
       * SECURITY FOR ALL OTHER PAGES
       * Applies strict CSP everywhere except gallery
       */
      {
        source: "/((?!gallery).*)",
        headers: fullSecurityHeaders,
      },
    ];
  },
};

export default nextConfig;