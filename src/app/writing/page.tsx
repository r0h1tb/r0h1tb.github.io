import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/content";
import { SectionHead, Shell } from "@/components/section";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes and essays.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <Shell>
      <header className="grid grid-cols-1 gap-y-6 pb-16 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-x-16">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-faint lg:pt-4">
          Writing
        </p>
        <h1 className="hang-punct font-display text-h1 leading-[0.94] tracking-[-0.02em]">
          Notes, mostly on things that broke.
        </h1>
      </header>

      <section className="pb-16">
        <SectionHead label="Archive" count={posts.length} />

        {posts.length === 0 ? (
          // No border-t: SectionHead already draws the rule above.
          <p className="max-w-[52ch] pt-2 text-body text-muted">
            Nothing published yet — I&rsquo;d rather post nothing than post
            filler. Two pieces are in progress, on idempotency in
            message-driven systems and on a data race that CI could not
            see. In the meantime, the{" "}
            <Link href="/work" className="link text-signal">
              case studies
            </Link>{" "}
            cover the same ground.
          </p>
        ) : (
          <ul>
            {posts.map((post, i) => (
              <li
                key={post.slug}
                className="reveal"
                style={{ "--i": i } as React.CSSProperties}
              >
                <Link
                  href={`/writing/${post.slug}`}
                  className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-rule py-6 transition-colors duration-500 hover:bg-sunk sm:grid-cols-[7rem_minmax(0,1fr)]"
                >
                  <time
                    dateTime={post.date}
                    className="font-mono text-micro uppercase tracking-[0.16em] text-faint"
                  >
                    {formatDate(post.date)}
                  </time>
                  <div className="min-w-0">
                    <h3 className="font-display text-h3 leading-tight transition-colors group-hover:text-signal">
                      {post.title}
                    </h3>
                    <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-muted">
                      {post.summary}
                    </p>
                    {post.tags.length > 0 && (
                      <p className="mt-3 font-mono text-micro uppercase tracking-[0.16em] text-faint">
                        {post.tags.join(" · ")}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Shell>
  );
}
