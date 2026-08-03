#!/usr/bin/env node
/**
 * Regenerates public/og.png — the link-preview card.
 *
 * Why a committed PNG rather than Next's generated `opengraph-image`
 * route: on a static export that route is written to a file with no
 * extension, so GitHub Pages serves it as application/octet-stream and
 * every social scraper rejects it. A real .png in public/ gets the right
 * Content-Type.
 *
 * Run after changing anything in src/lib/site.ts:
 *   npm run og
 */

import { writeFileSync } from "node:fs";
// Direct path rather than "next/og": the package has no ESM exports entry
// for it, so bare-specifier resolution fails outside Next's bundler.
import { ImageResponse } from "next/dist/server/og/image-response.js";

// Keep in step with @theme in src/app/globals.css. Satori resolves no
// CSS custom properties, so these have to be literals.
//
// Dark, matching the site's default — a light preview card next to a
// dark site reads as someone else's link.
const INK = "#f2f0ea";
const PAPER = "#121116";
const MUTED = "#9c99a4";
const RULE = "#2e2c36";
const SIGNAL = "#ff4438";

const { site } = await import("../src/lib/site.ts");

const card = {
  type: "div",
  props: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: PAPER,
      padding: "72px 80px",
    },
    children: [
      {
        type: "div",
        props: {
          style: { display: "flex", gap: 24, alignItems: "center" },
          children: [
            {
              type: "div",
              props: {
                style: { width: 64, height: 5, backgroundColor: SIGNAL },
              },
            },
            {
              type: "div",
              props: {
                style: {
                  fontSize: 22,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: MUTED,
                },
                children: site.role,
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            fontSize: 92,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: INK,
            maxWidth: 960,
          },
          children: site.statement,
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderTop: `1px solid ${RULE}`,
            paddingTop: 28,
            fontSize: 24,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: MUTED,
          },
          children: [
            {
              type: "div",
              props: { style: { display: "flex", color: INK }, children: site.name },
            },
            {
              type: "div",
              props: { style: { display: "flex" }, children: site.location },
            },
          ],
        },
      },
    ],
  },
};

const res = new ImageResponse(card, { width: 1200, height: 630 });
const buf = Buffer.from(await res.arrayBuffer());
writeFileSync(new URL("../public/og.png", import.meta.url), buf);
console.log(`og: wrote public/og.png (${(buf.length / 1024).toFixed(1)} KB)`);
