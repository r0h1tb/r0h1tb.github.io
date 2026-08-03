import Link from "next/link";
import type { Work } from "@/lib/content";

/**
 * The index list — this replaces "three feature cards in a row".
 *
 * The numeral is set at display scale in the left margin rather than as
 * a small mono label: it is the strongest device an editorial index has,
 * and at 11px it was doing nothing. Rows are hairline-ruled, never
 * boxed — no card, no radius, no shadow.
 *
 * Hover changes weight and colour, not opacity. Fading something to 80%
 * is the default that reads as unconsidered.
 */
export function WorkIndex({ items }: { items: Work[] }) {
  if (items.length === 0) {
    return (
      <p className="border-t border-rule py-8 text-body text-muted">
        Nothing here yet.
      </p>
    );
  }

  // No top border: SectionHead already draws the rule above this list.
  return (
    <ol>
      {items.map((work, i) => (
        <li
          key={work.slug}
          className="reveal"
          style={{ "--i": i } as React.CSSProperties}
        >
          <Link
            href={`/work/${work.slug}`}
            className="group grid grid-cols-[3.25rem_minmax(0,1fr)] items-start gap-x-4 border-b border-rule py-7 transition-colors duration-500 hover:bg-sunk sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:gap-x-8 sm:py-9"
          >
            <span
              aria-hidden
              className="tnum font-display text-h2 leading-[0.8] text-rule transition-colors duration-500 group-hover:text-signal"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <h3 className="font-display text-h3 leading-[1.02] tracking-[-0.015em] sm:text-h2">
                {work.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted">
                {work.summary}
              </p>
              {work.stack && (
                <ul className="mt-4 flex flex-wrap gap-x-2.5 gap-y-1.5 font-mono text-micro uppercase tracking-[0.14em] text-faint">
                  {work.stack.map((s) => (
                    <li key={s} className="border border-rule px-1.5 py-0.5">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <span className="col-start-2 mt-5 flex items-baseline gap-4 font-mono text-micro uppercase tracking-[0.18em] text-faint sm:col-start-3 sm:mt-2 sm:justify-end">
              <span className="tnum">{work.year}</span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-signal"
              >
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
