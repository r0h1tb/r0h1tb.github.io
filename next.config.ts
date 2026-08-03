import type { NextConfig } from "next";

/**
 * Static export — the whole site prerenders, so it can be served from any
 * static host (GitHub Pages here). Nothing in this project needs a server:
 * every dynamic route has generateStaticParams, markdown is rendered at
 * build time, and there are no route handlers, cookies or server actions.
 *
 * BASE_PATH is set by CI when the site is served from a subdirectory
 * (username.github.io/<repo>). Empty for a user site or custom domain.
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Emits /work/slug/index.html instead of /work/slug.html, which is what
  // static hosts resolve correctly without rewrite rules.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
