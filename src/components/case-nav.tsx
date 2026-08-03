import Link from "next/link";
import type { Work } from "@/lib/content";

/**
 * Prev / next between case studies.
 *
 * Linear content is the one place where prev-and-next alone is the right
 * pattern — no page numbers, no ellipses. The titles are shown rather
 * than bare arrows, because "→" asks the reader to gamble on what is
 * behind it. This is the difference between a dead end at the bottom of
 * a case study and a reason to keep reading.
 */
export function CaseNav({ prev, next }: { prev?: Work; next?: Work }) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Case studies"
      className="mt-24 grid grid-cols-1 gap-px border-t border-rule bg-rule sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          className="group flex flex-col gap-3 bg-paper p-6 transition-colors duration-500 hover:bg-sunk sm:p-8"
        >
          <span className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.18em] text-faint">
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1.5"
            >
              ←
            </span>
            Previous
          </span>
          <span className="font-display text-h3 leading-tight transition-colors duration-300 group-hover:text-signal">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden bg-paper sm:block" />
      )}

      {next && (
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col items-start gap-3 bg-paper p-6 transition-colors duration-500 hover:bg-sunk sm:items-end sm:p-8 sm:text-right"
        >
          <span className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.18em] text-faint">
            Next
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
          <span className="font-display text-h3 leading-tight transition-colors duration-300 group-hover:text-signal">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
