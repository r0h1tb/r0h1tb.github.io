import { stats } from "@/lib/bio";

/**
 * Headline figures.
 *
 * Figure large, label quiet — the hierarchy that makes a stats row read
 * as evidence rather than decoration. Four entries is the ceiling: past
 * three or four, a stats block stops being absorbed in one glance and
 * turns into a wall, so more numbers buy less credibility rather than
 * more.
 *
 * Tabular figures, and the unit is set small and raised so the digits
 * align optically across the row.
 */
export function StatGrid() {
  return (
    <dl className="grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="reveal flex flex-col justify-between gap-5 bg-paper p-5 transition-colors duration-500 hover:bg-sunk sm:p-6"
          style={{ "--i": i } as React.CSSProperties}
        >
          <dt className="font-mono text-micro uppercase tracking-[0.16em] text-faint">
            {stat.label}
          </dt>
          <dd>
            <span className="tnum font-display text-h1 leading-[0.8] tracking-[-0.03em] text-ink">
              {stat.figure}
              <span className="text-h3 align-top text-signal">{stat.unit}</span>
            </span>
            <span className="mt-3 block max-w-[24ch] text-caption leading-snug text-muted">
              {stat.note}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
