import Link from "next/link";
import { site } from "@/lib/site";
import { formatDate, getAllPosts, getAllWork } from "@/lib/content";
import { SectionHead, Shell } from "@/components/section";
import { WorkIndex } from "@/components/work-index";
import { UpstreamLedger } from "@/components/upstream-ledger";
import { upstream } from "@/lib/upstream";

export default function Home() {
  const work = getAllWork();
  const posts = getAllPosts().slice(0, 4);

  return (
    <Shell>
      {/* ---- HERO -------------------------------------------------
          Grid break #1: the statement column starts in the second
          track and runs wider than the meta column, so the composition
          is deliberately off-centre rather than a centred stack. */}
      <section className="grid grid-cols-1 gap-y-10 pb-24 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-x-16 lg:pb-36">
        <aside className="rise order-2 lg:order-1 lg:pt-3">
          <dl className="space-y-5 font-mono text-micro uppercase tracking-[0.18em]">
            <div>
              <dt className="text-faint">Role</dt>
              <dd className="mt-1 text-ink">{site.role}</dd>
            </div>
            <div>
              <dt className="text-faint">Based</dt>
              <dd className="mt-1 text-ink">{site.location}</dd>
            </div>
            {site.now && (
              <div>
                <dt className="text-faint">Now</dt>
                <dd className="mt-1 text-ink">{site.now}</dd>
              </div>
            )}
            <div>
              <dt className="text-faint">Index</dt>
              <dd className="tnum mt-1 text-ink">
                {String(work.length).padStart(2, "0")} projects
              </dd>
            </div>
          </dl>
        </aside>

        <div className="order-1 lg:order-2">
          <h1
            className="hang-punct rise font-display text-h1 leading-[0.92] tracking-[-0.02em]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {site.statement}
          </h1>

          <p
            className="rise mt-10 max-w-[52ch] text-lead leading-[1.45] text-muted"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Three years on account-servicing and payment APIs for a global
            bank&rsquo;s core banking platform — the kind of system where a
            rollback plan matters as much as the feature. Java, Spring
            Boot, and a lot of time spent on failure modes. Outside work I
            send fixes upstream to libraries I actually use.
          </p>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-micro uppercase tracking-[0.18em]"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <a href={`mailto:${site.email}`} className="link text-signal">
              Email me ↗
            </a>
            {site.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="link text-muted hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---- WORK ------------------------------------------------- */}
      <section className="pb-28">
        <SectionHead label="Selected work" count={work.length} />
        <WorkIndex items={work} />
        {work.length > 0 && (
          <Link
            href="/work"
            className="link mt-8 inline-block font-mono text-micro uppercase tracking-[0.18em] text-muted hover:text-ink"
          >
            All work →
          </Link>
        )}
      </section>

      {/* ---- UPSTREAM — the signature element ---------------------- */}
      <section className="pb-28">
        <SectionHead label="Upstream" count={upstream.length} />
        <p className="mb-8 max-w-[62ch] text-sm leading-relaxed text-muted">
          Fixes sent to libraries I use in production. Each one ships with a
          regression test that fails on <code className="font-mono">main</code>{" "}
          and passes with the patch.
        </p>
        <UpstreamLedger />
      </section>

      {/* ---- WRITING ---------------------------------------------- */}
      {posts.length > 0 && (
        <section className="pb-16">
          <SectionHead label="Writing" count={posts.length} />
          <ul className="border-t border-rule">
            {posts.map((post, i) => (
              <li
                key={post.slug}
                className="rise"
                style={{ "--i": i } as React.CSSProperties}
              >
                <Link
                  href={`/writing/${post.slug}`}
                  className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-1 border-b border-rule py-5 transition-colors duration-500 hover:bg-sunk sm:grid-cols-[7rem_minmax(0,1fr)]"
                >
                  <time
                    dateTime={post.date}
                    className="font-mono text-micro uppercase tracking-[0.16em] text-faint"
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="text-body text-ink transition-colors group-hover:text-signal">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/writing"
            className="link mt-8 inline-block font-mono text-micro uppercase tracking-[0.18em] text-muted hover:text-ink"
          >
            All writing →
          </Link>
        </section>
      )}
    </Shell>
  );
}
