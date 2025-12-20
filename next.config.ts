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

/*
 * Full CSP + security headers
 * (DO NOT APPLY TO 3D GALLERY)
 */
const fullSecurityHeaders = [
  ...baseSecurityHeaders,
  {
   key: "Content-Security-Policy",
value: [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google.com https://maps.gstatic.com",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "object-src 'none'",
  "frame-src 'self' https://www.google.com https://www.google.com/maps",
  "child-src https://www.google.com https://www.google.com/maps",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join("; "),

  },
];

const nextConfig: NextConfig = {
  // StrictMode OFF for Three.js / WASM stability
  reactStrictMode: false,

  async headers() {
    return [
      /*
       * SECURITY FOR ALL NORMAL PAGES
       * Applies CSP everywhere EXCEPT gallery dynamic routes
       */
      {
        source: "/((?!gallery).*)",
        headers: fullSecurityHeaders,
      },

      /*
       * MINIMAL SECURITY FOR ALL DYNAMIC GALLERY ROUTES
       * This matches /gallery/any-category
       */
      {
        source: "/gallery/(.*)",
        headers: baseSecurityHeaders,
      },
    ];
  },
};

export default nextConfig;
