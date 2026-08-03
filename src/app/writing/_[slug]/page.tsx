import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllPosts, getPost } from "@/lib/content";
import { Shell } from "@/components/section";

type Params = { params: Promise<{ slug: string }> };

// Only these slugs exist; anything else 404s. Required by `output: export`,
// and correct regardless — this list is currently empty because every post
// is still a draft.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostDetail({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <Shell>
      {/* Reading measure is narrower than the site grid, and offset
          left rather than centred. */}
      <article className="max-w-[46rem] pt-12 sm:pt-20 lg:ml-[calc(14rem+4rem)]">
        <Link
          href="/writing"
          className="link font-mono text-micro uppercase tracking-[0.18em] text-faint hover:text-ink"
        >
          ← Writing
        </Link>

        <header className="mt-10 border-b border-rule pb-10">
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-micro uppercase tracking-[0.18em] text-faint">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tags.length > 0 && <span>{post.tags.join(" · ")}</span>}
          </div>
          <h1 className="hang-punct mt-6 font-display text-h2 leading-[1.02] tracking-[-0.015em] sm:text-h1">
            {post.title}
          </h1>
          <p className="mt-6 max-w-[54ch] text-lead leading-[1.45] text-muted">
            {post.summary}
          </p>
        </header>

        <div
          className="prose mt-12"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Shell>
  );
}
