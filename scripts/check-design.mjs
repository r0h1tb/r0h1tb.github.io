#!/usr/bin/env node
/**
 * Fails the build when a banned default sneaks back in.
 *
 * The point (DESIGN-PLAYBOOK.md, Step 8): discouraging defaults does not
 * work, because the next generated component reaches for them again.
 * Removing them from the theme handles the utilities; this catches the
 * rest — raw hex, inline gradients, generic copy.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const ROOTS = ["src", "content"];
const EXTS = new Set([".ts", ".tsx", ".css", ".md", ".mdx"]);

const RULES = [
  {
    id: "tailwind-default-palette",
    // The palette is cleared in globals.css, so these would silently
    // render as nothing. Catch them as an error instead.
    re: /\b(?:bg|text|border|from|via|to|ring|fill|stroke)-(?:indigo|violet|purple|slate|gray|grey|zinc|neutral|stone|sky|blue|emerald|teal|cyan|rose|fuchsia)-\d{2,3}\b/g,
    msg: "Tailwind default palette colour. Use the project tokens: paper, sunk, rule, ink, muted, faint, signal.",
  },
  {
    id: "gradient",
    re: /\bbg-gradient-to-|\bbg-linear-to-|linear-gradient\((?![^)]*currentColor)/g,
    msg: "Gradient. The blue-to-purple gradient is the loudest AI tell; this design uses flat ink on paper.",
  },
  {
    id: "rounded",
    re: /\brounded-(?:sm|md|lg|xl|2xl|3xl)\b/g,
    msg: "Rounded corner. This design commits to radius 0 (`rounded-none`) with `rounded-full` as the only exception.",
  },
  {
    id: "shadow",
    re: /\bshadow-(?:sm|md|lg|xl|2xl)\b/g,
    msg: "Drop shadow. Elevation here is borders and colour contrast, one system only.",
  },
  {
    id: "raw-hex",
    re: /#[0-9a-fA-F]{6}\b/g,
    msg: "Raw hex outside the token block. Add it to @theme in globals.css and reference the token.",
    // The token definitions themselves obviously contain hex. OG images
    // are rendered by satori, which resolves no CSS custom properties —
    // literal values are the only option there.
    skipFiles: [/globals\.css$/, /opengraph-image\.tsx$/],
  },
  {
    id: "filler-copy",
    // `transform` is a CSS property and `unlock` is a plausible verb, so
    // these match the marketing phrasing rather than the bare word.
    re: /\b(?:empower|seamless(?:ly)?|elevate|leverage|supercharge|cutting-edge|game-chang|revolutionis|revolutioniz|passionate about|best-in-class|next-level|take (?:it|your \w+) to the next level|transform(?:s|ed|ing)? (?:your|the way|how)|unlock(?:s|ed|ing)? (?:your|the|new) )\b/gi,
    msg: "Filler word. Replace with something specific: a number, a name, a constraint.",
    // Stylesheets are not prose.
    skipFiles: [/\.css$/],
  },
];

/**
 * A static export cannot contain a dynamic route that generates zero
 * pages, so `writing/[slug]` is parked as `_[slug]` (Next ignores
 * underscore-prefixed folders) while every post is a draft.
 *
 * The moment a post is published that route has to come back, or every
 * link from the writing index 404s. Silent trap; make it loud.
 */
function checkWritingRoute() {
  const live = join("src", "app", "writing", "[slug]");
  const parked = join("src", "app", "writing", "_[slug]");
  const dir = join("content", "writing");

  let published = 0;
  try {
    published = readdirSync(dir).filter((f) => {
      if (!f.endsWith(".md")) return false;
      return !/^draft:\s*true\s*$/m.test(readFileSync(join(dir, f), "utf8"));
    }).length;
  } catch {
    return null;
  }

  const isParked = existsSync(parked) && !existsSync(live);

  if (published > 0 && isParked) {
    return `${published} published post(s) exist but the detail route is parked.\n    Fix: git mv "src/app/writing/_[slug]" "src/app/writing/[slug]"`;
  }
  if (published === 0 && !isParked) {
    return `No published posts, but "writing/[slug]" is live — a static export needs at least one page per dynamic route.\n    Fix: git mv "src/app/writing/[slug]" "src/app/writing/_[slug]"`;
  }
  return null;
}

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTS.has(extname(full))) out.push(full);
  }
  return out;
}

const files = ROOTS.flatMap((r) => walk(r));
const findings = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");

  for (const rule of RULES) {
    if (rule.skipFiles?.some((p) => p.test(file))) continue;

    lines.forEach((line, i) => {
      // Allow a deliberate override with a trailing comment.
      if (line.includes("design-check-ignore")) return;
      const matches = line.match(rule.re);
      if (matches) {
        findings.push({
          file,
          line: i + 1,
          match: matches[0],
          id: rule.id,
          msg: rule.msg,
        });
      }
    });
  }
}

const routeProblem = checkWritingRoute();

if (findings.length === 0 && !routeProblem) {
  console.log(`design-check: clean (${files.length} files)`);
  process.exit(0);
}

if (routeProblem) {
  console.error(`\ndesign-check: writing route out of sync\n`);
  console.error(`    ${routeProblem}\n`);
  if (findings.length === 0) process.exit(1);
}

console.error(`\ndesign-check: ${findings.length} issue(s)\n`);
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}  ${f.match}`);
  console.error(`    ${f.id} — ${f.msg}\n`);
}
console.error("Append `design-check-ignore` to a line to override.\n");
process.exit(1);
