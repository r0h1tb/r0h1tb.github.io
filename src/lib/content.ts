import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Work = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role?: string;
  stack?: string[];
  /** The single measurable result. Numbers, not adjectives. */
  outcome?: string;
  live?: string;
  repo?: string;
  order: number;
  draft: boolean;
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  draft: boolean;
};

/* ---------------------------------------------------------------- */

function readDir(collection: "work" | "writing"): string[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

function readFile(collection: "work" | "writing", file: string) {
  const full = path.join(CONTENT_DIR, collection, file);
  const { data, content } = matter(fs.readFileSync(full, "utf8"));
  return { slug: file.replace(/\.md$/, ""), data, content, full };
}

/** Fail loudly at build time rather than rendering `undefined` into a page. */
function required(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing frontmatter field "${field}" in ${file}`);
  }
  return value;
}

/* ---------------------------------------------------------------- */

export function getAllWork(): Work[] {
  return readDir("work")
    .map((file) => {
      const { slug, data, full } = readFile("work", file);
      return {
        slug,
        title: required(data.title, "title", full),
        summary: required(data.summary, "summary", full),
        year: required(String(data.year ?? ""), "year", full),
        role: data.role,
        stack: Array.isArray(data.stack) ? data.stack : undefined,
        outcome: data.outcome,
        live: data.live,
        repo: data.repo,
        order: typeof data.order === "number" ? data.order : 999,
        draft: data.draft === true,
      } satisfies Work;
    })
    .filter((w) => !w.draft)
    .sort((a, b) => a.order - b.order || b.year.localeCompare(a.year));
}

export function getAllPosts(): Post[] {
  return readDir("writing")
    .map((file) => {
      const { slug, data, full } = readFile("writing", file);
      return {
        slug,
        title: required(data.title, "title", full),
        summary: required(data.summary, "summary", full),
        date: required(
          data.date instanceof Date
            ? data.date.toISOString().slice(0, 10)
            : String(data.date ?? ""),
          "date",
          full,
        ),
        tags: Array.isArray(data.tags) ? data.tags : [],
        draft: data.draft === true,
      } satisfies Post;
    })
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/* ---------------------------------------------------------------- */

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeShiki, {
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })
  .use(rehypeStringify);

/** Markdown -> HTML at build time. No client-side markdown runtime. */
export async function renderMarkdown(md: string): Promise<string> {
  const file = await processor.process(md);
  return String(file);
}

export async function getWork(slug: string) {
  const meta = getAllWork().find((w) => w.slug === slug);
  if (!meta) return null;
  const { content } = readFile("work", `${slug}.md`);
  return { ...meta, html: await renderMarkdown(content) };
}

export async function getPost(slug: string) {
  const meta = getAllPosts().find((p) => p.slug === slug);
  if (!meta) return null;
  const { content } = readFile("writing", `${slug}.md`);
  return { ...meta, html: await renderMarkdown(content) };
}

/** "12 Mar 2026" — never the American ordering, never "3/12/26". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
