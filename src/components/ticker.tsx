import { upstream } from "@/lib/upstream";

/**
 * Marquee of the upstream repos.
 *
 * A ticker is the native form for this content — it is a feed of systems
 * and figures, and the vernacular belongs to the subject rather than
 * being borrowed decoration. It is also the one moving thing on an
 * otherwise still page, which is what stops the layout reading as empty.
 *
 * The track is rendered twice and translated -50%, so the loop closes on
 * itself with nothing measuring widths at runtime. Pauses on hover and on
 * keyboard focus; stops entirely under prefers-reduced-motion.
 */
export function Ticker() {
  const items = [...upstream, ...upstream];

  return (
    <div
      className="ticker ticker-mask relative overflow-hidden border-y border-rule py-3.5"
      // Duplicated for the loop, so the second pass is decorative.
      aria-label={`Upstream contributions to ${upstream.length} projects`}
    >
      <div className="ticker-track">
        {items.map((item, i) => (
          <span
            key={`${item.repo}-${i}`}
            aria-hidden={i >= upstream.length}
            className="flex shrink-0 items-baseline gap-3 whitespace-nowrap px-6 font-mono text-micro uppercase tracking-[0.16em]"
          >
            <span className="text-signal">→</span>
            <span className="text-ink">{item.repo}</span>
            <span className="tnum text-faint">{item.stars}</span>
            <span className="text-rule">/</span>
          </span>
        ))}
      </div>

    </div>
  );
}
