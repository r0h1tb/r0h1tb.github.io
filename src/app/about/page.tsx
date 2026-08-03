import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { certifications } from "@/lib/bio";
import { SectionHead, Shell } from "@/components/section";
import { StatGrid } from "@/components/stat-grid";
import { Timeline } from "@/components/timeline";
import { StackMatrix } from "@/components/stack-matrix";

export const metadata: Metadata = {
  title: "About",
  description:
    "Backend engineer working on payments and core banking. Three years on regulated systems where a rollback plan matters as much as the feature.",
};

/**
 * Structured hook → proof → close, rather than the wall of prose and
 * bullet lists this replaces.
 *
 * The proof section is the part that does the work: the thread that
 * connects the career, stated as the one problem that keeps recurring in
 * different contexts. That is what gives a reader a framework for
 * everything else on the page.
 */
export default function AboutPage() {
  return (
    <Shell>
      {/* ---- HOOK ------------------------------------------------- */}
      <section className="grid grid-cols-1 gap-y-10 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-x-14">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-faint lg:pt-5">
          About
        </p>

        <div>
          <h1 className="hang-punct font-display text-h1 leading-[0.88] tracking-[-0.03em]">
            Most of what I know came from
            <br />
            systems that{" "}
            <em className="not-italic text-signal">could not be rolled back</em>{" "}
            casually.
          </h1>

          <p className="mt-10 max-w-[54ch] text-lead leading-[1.4] text-muted">
            I build account-servicing and payment APIs for a global
            bank&rsquo;s core banking platform. In that environment you do
            not ship first and find out later — the thing on the other end
            of the endpoint is somebody&rsquo;s account.
          </p>
        </div>
      </section>

      {/* ---- PROOF: the numbers ----------------------------------- */}
      <section className="pb-24">
        <SectionHead label="By the numbers" />
        <StatGrid />
      </section>

      {/* ---- PROOF: the thread ------------------------------------ */}
      <section className="grid grid-cols-1 gap-y-10 pb-24 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-x-14">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-faint lg:pt-2">
          The thread
        </p>

        <div className="max-w-[62ch]">
          <p className="border-l-2 border-signal pl-6 font-display text-h3 leading-[1.25] text-ink">
            The same problem keeps turning up in different clothes: what
            happens when the thing you depend on fails halfway through.
          </p>

          <div className="prose mt-10">
            <p>
              A retry that runs twice. A message redelivered after the
              handler already committed. A downstream system that is slow
              rather than down, which is worse. A migration that has to
              prove the new endpoint behaves exactly like the one it
              replaces, including the parts nobody documented.
            </p>
            <p>
              Almost everything I have learned sits somewhere in that
              space — idempotency, circuit breakers, dead-letter queues,
              test-driven migration. It is also why I read other
              people&rsquo;s code for fun: the{" "}
              <Link href="/work/ast-rag" className="link">
                data race I fixed in a parse cache
              </Link>{" "}
              was the same shape of bug as a duplicate bureau enquiry, just
              with different consequences.
            </p>
            <p>
              I studied Mechanical Engineering at NITK Surathkal and moved
              into backend work because the problems were more interesting
              to me. Three years in, that has not worn off.
            </p>
          </div>
        </div>
      </section>

      {/* ---- PROOF: history --------------------------------------- */}
      <section className="pb-24">
        <SectionHead label="History" />
        <Timeline />
      </section>

      {/* ---- PROOF: stack ----------------------------------------- */}
      <section className="pb-24">
        <SectionHead label="Stack" />
        <StackMatrix />

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[10rem_minmax(0,1fr)]">
          <p className="font-mono text-micro uppercase tracking-[0.16em] text-faint">
            Certified
          </p>
          <ul className="space-y-1.5">
            {certifications.map((c) => (
              <li
                key={c}
                className="grid grid-cols-[1.25rem_minmax(0,1fr)] text-sm leading-relaxed text-muted"
              >
                <span aria-hidden className="text-rule">
                  —
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- CLOSE ------------------------------------------------ */}
      <section className="border-t border-rule py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-16">
          <div>
            <h2 className="font-display text-h2 leading-[1.02] tracking-[-0.02em]">
              Open to backend and platform roles.
            </h2>
            <p className="mt-4 max-w-[46ch] text-body text-muted">
              Happiest somewhere the failure modes matter. Also glad to
              review a pull request on anything in the ledger.
            </p>
          </div>

          {/* Not uppercased — an address is a literal string. */}
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex shrink-0 items-baseline gap-3 border-b-2 border-signal pb-1 font-mono text-sm tracking-normal text-signal"
          >
            {site.email}
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
            >
              ↗
            </span>
          </a>
        </div>
      </section>
    </Shell>
  );
}
