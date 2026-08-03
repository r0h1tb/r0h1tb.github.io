import Link from "next/link";
import type { Work } from "@/lib/content";

/**
 * The index list — this replaces "three feature cards in a row".
 * Numerals hang in the left margin, which breaks the content grid on
 * purpose. Rows are hairline-ruled rather than boxed: no card, no
 * radius, no shadow.
 */
export function WorkIndex({ items }: { items: Work[] }) {
  if (items.length === 0) {
    return (
      <p className="border-t border-rule py-8 text-body text-muted">
        Nothing here yet.
      </p>
    );
  }

  return (
    <ol className="border-t border-rule">
      {items.map((work, i) => (
        <li key={work.slug} className="rise" style={{ "--i": i } as React.CSSProperties}>
          <Link
            href={`/work/${work.slug}`}
            className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-b border-rule py-6 transition-colors duration-500 hover:bg-sunk sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-x-8 sm:py-7"
          >
            <span className="tnum font-mono text-micro text-faint transition-colors duration-300 group-hover:text-signal">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <h3 className="font-display text-h3 leading-[1.05] sm:text-h2">
                {work.title}
              </h3>
              <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-muted">
                {work.summary}
              </p>
              {work.stack && (
                <p className="mt-3 font-mono text-micro uppercase tracking-[0.16em] text-faint">
                  {work.stack.join(" · ")}
                </p>
              )}
            </div>

            <span className="col-start-2 mt-4 flex items-baseline gap-4 font-mono text-micro uppercase tracking-[0.18em] text-faint sm:col-start-3 sm:mt-0 sm:justify-end">
              <span className="tnum">{work.year}</span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-signal"
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
