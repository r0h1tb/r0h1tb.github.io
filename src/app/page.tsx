import Link from "next/link";
import { site } from "@/lib/site";
import { formatDate, getAllPosts, getAllWork } from "@/lib/content";
import { SectionHead, Shell } from "@/components/section";
import { WorkIndex } from "@/components/work-index";
import { UpstreamLedger } from "@/components/upstream-ledger";
import { Ticker } from "@/components/ticker";
import { upstream } from "@/lib/upstream";

export default function Home() {
  const work = getAllWork();
  const posts = getAllPosts().slice(0, 4);

  return (
    <Shell>
      {/* ---- HERO -------------------------------------------------
          The statement is set at viewport scale and allowed to run to
          the full measure — the old version reserved a narrow column
          for it and left the page reading empty. Meta is now a dense
          rail of hairline-separated rows rather than four lonely
          labels. */}
      <section className="hero-fade grid grid-cols-1 gap-y-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-x-14 lg:pb-28">
        <aside className="rise order-2 lg:order-1 lg:pt-4">
          <dl className="border-t border-rule font-mono text-micro uppercase tracking-[0.18em]">
            {[
              ["Role", site.role],
              ["Based", site.location],
              ...(site.now ? [["Now", site.now]] : []),
              ["Index", `${String(work.length).padStart(2, "0")} projects`],
              ["Upstream", `${upstream.length} projects`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5"
              >
                <dt className="text-faint">{label}</dt>
                <dd className="tnum text-right text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="order-1 lg:order-2">
          <h1
            className="hang-punct rise font-display text-h1 leading-[0.86] tracking-[-0.035em]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            I build banking APIs
            <br />
            where a retry has to be{" "}
            {/* The one word the whole page is about. */}
            <em className="not-italic text-signal">idempotent.</em>
          </h1>

          <div
            className="rise mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <p className="max-w-[46ch] text-lead leading-[1.4] text-muted">
              Three years on account-servicing and payment APIs for a
              global bank&rsquo;s core banking platform — the kind of
              system where a rollback plan matters as much as the
              feature. Outside work I send fixes upstream to libraries I
              actually use.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="group inline-flex shrink-0 items-baseline gap-3 border-b-2 border-signal pb-1 font-mono text-micro uppercase tracking-[0.2em] text-signal"
            >
              Email me
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Only moving thing on the page, and it is content rather than
          decoration — see components/ticker.tsx. */}
      <div className="-mx-5 mb-24 sm:-mx-8">
        <Ticker />
      </div>

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
      <section className="pb-32">
        <SectionHead label="Upstream" count={upstream.length} />
        <p className="mb-10 max-w-[54ch] text-lead leading-[1.4] text-muted">
          Fixes sent to libraries I use in production. Each one ships with a
          regression test that fails on{" "}
          <code className="font-mono text-body text-ink">main</code> and passes
          with the patch.
        </p>
        <UpstreamLedger />
      </section>

      {/* ---- WRITING ---------------------------------------------- */}
      {posts.length > 0 && (
        <section className="pb-16">
          <SectionHead label="Writing" count={posts.length} />
          <ul>
            {posts.map((post, i) => (
              <li
                key={post.slug}
                className="reveal"
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
