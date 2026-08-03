import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWork, getWork } from "@/lib/content";
import { ReadingProgress, Shell } from "@/components/section";

type Params = { params: Promise<{ slug: string }> };

// Only these slugs exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWork().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) return {};
  return { title: work.title, description: work.summary };
}

export default async function WorkDetail({ params }: Params) {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) notFound();

  return (
    <Shell>
      <ReadingProgress />
      <article className="pt-12 sm:pt-20">
        <Link
          href="/work"
          className="link font-mono text-micro uppercase tracking-[0.18em] text-faint hover:text-ink"
        >
          ← Work
        </Link>

        {/* Grid break #2: the metadata table sits in the left margin
            beside the title rather than stacked beneath it. */}
        <header className="mt-10 grid grid-cols-1 gap-y-10 border-b border-rule pb-12 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-x-16">
          <dl className="order-2 space-y-5 font-mono text-micro uppercase tracking-[0.18em] lg:order-1 lg:pt-3">
            <div>
              <dt className="text-faint">Year</dt>
              <dd className="tnum mt-1 text-ink">{work.year}</dd>
            </div>
            {work.role && (
              <div>
                <dt className="text-faint">Role</dt>
                <dd className="mt-1 text-ink">{work.role}</dd>
              </div>
            )}
            {work.stack && (
              <div>
                <dt className="text-faint">Stack</dt>
                <dd className="mt-1 space-y-1 text-ink">
                  {work.stack.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </dd>
              </div>
            )}
            {(work.live || work.repo) && (
              <div>
                <dt className="text-faint">Links</dt>
                <dd className="mt-1 space-y-1">
                  {work.live && (
                    <div>
                      <a
                        href={work.live}
                        target="_blank"
                        rel="noreferrer"
                        className="link text-signal"
                      >
                        Live ↗
                      </a>
                    </div>
                  )}
                  {work.repo && (
                    <div>
                      <a
                        href={work.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="link text-signal"
                      >
                        Source ↗
                      </a>
                    </div>
                  )}
                </dd>
              </div>
            )}
          </dl>

          <div className="order-1 lg:order-2">
            <h1 className="hang-punct font-display text-h1 leading-[0.94] tracking-[-0.02em]">
              {work.title}
            </h1>
            <p className="mt-8 max-w-[54ch] text-lead leading-[1.45] text-muted">
              {work.summary}
            </p>
            {work.outcome && (
              <p className="mt-8 max-w-[54ch] border-l-2 border-signal pl-5 text-body text-ink">
                {work.outcome}
              </p>
            )}
          </div>
        </header>

        <div
          className="prose mt-14 lg:ml-[calc(14rem+4rem)]"
          dangerouslySetInnerHTML={{ __html: work.html }}
        />
      </article>
    </Shell>
  );
}
