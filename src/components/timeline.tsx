import { timeline } from "@/lib/bio";

/**
 * Career history as a ruled timeline rather than a bullet list.
 *
 * The vertical rule and node do the structural work that dates in a list
 * cannot — you read the shape of the progression before you read a word
 * of it. Current role carries the signal colour; everything else is
 * quiet, so "where is he now" is answerable at a glance.
 */
export function Timeline() {
  return (
    <ol className="relative">
      {/* The spine, centred in the gutter between the date and content
          columns: col 1 ends at 9rem, gap-x-8 is 2rem, so the gutter
          runs 144–176px and its centre is 160px. */}
      <span
        aria-hidden
        className="absolute bottom-0 left-[5px] top-2 w-px bg-rule sm:left-[160px]"
      />

      {timeline.map((entry, i) => (
        <li
          key={`${entry.org}-${entry.period}`}
          className="reveal relative grid grid-cols-1 gap-x-8 gap-y-2 pb-12 pl-7 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:pl-0"
          style={{ "--i": i } as React.CSSProperties}
        >
          {/* 11px node centred on the 160px spine → 160 − 5.5 ≈ 155px. */}
          <span
            aria-hidden
            className={`absolute left-0 top-2 size-[11px] border sm:left-[155px] ${
              entry.current
                ? "border-signal bg-signal"
                : "border-rule bg-paper"
            }`}
          />

          <p className="font-mono text-micro uppercase tracking-[0.16em] text-faint sm:text-right sm:leading-6">
            {entry.period}
          </p>

          <div>
            <h3 className="font-display text-h3 leading-tight">
              {entry.title}
            </h3>
            <p className="mt-1 font-mono text-micro uppercase tracking-[0.16em] text-signal">
              {entry.org}
              {entry.place && (
                <span className="text-faint"> · {entry.place}</span>
              )}
            </p>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-muted">
              {entry.body}
            </p>
            {entry.detail && (
              <ul className="mt-4 space-y-1.5">
                {entry.detail.map((d) => (
                  <li
                    key={d}
                    className="grid grid-cols-[1rem_minmax(0,1fr)] text-caption leading-relaxed text-muted"
                  >
                    <span aria-hidden className="text-rule">
                      —
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
