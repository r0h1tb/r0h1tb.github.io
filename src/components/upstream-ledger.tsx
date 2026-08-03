import { upstream } from "@/lib/upstream";

/**
 * The signature element. A ledger, not cards — dense, monospaced,
 * tabular figures, hairline rules. It reads like something printed off
 * a system rather than laid out by a marketing page, which is the point.
 */
export function UpstreamLedger() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[44rem] border-collapse text-left">
        <thead>
          {/* border-b only — SectionHead draws the rule above the table. */}
          <tr className="border-b border-rule font-mono text-micro uppercase tracking-[0.18em] text-faint">
            <th scope="col" className="py-3 pr-6 font-normal">
              Project
            </th>
            <th scope="col" className="py-3 pr-6 text-right font-normal">
              Reach
            </th>
            <th scope="col" className="py-3 pr-6 font-normal">
              PR
            </th>
            <th scope="col" className="py-3 pr-6 font-normal">
              State
            </th>
            <th scope="col" className="py-3 font-normal">
              What it fixes
            </th>
          </tr>
        </thead>
        <tbody>
          {upstream.map((row, i) => (
            <tr
              key={row.repo}
              className="reveal group border-b border-rule align-baseline transition-colors duration-500 hover:bg-sunk"
              style={{ "--i": i } as React.CSSProperties}
            >
              <th scope="row" className="py-4 pr-6 font-normal">
                <a
                  href={row.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link font-mono text-sm text-ink transition-colors duration-300 group-hover:text-signal"
                >
                  {row.repo}
                </a>
              </th>
              <td className="tnum py-4 pr-6 text-right font-mono text-micro text-faint">
                {row.stars}
              </td>
              <td className="tnum py-4 pr-6 font-mono text-micro text-muted">
                {row.pr}
              </td>
              <td className="py-4 pr-6 font-mono text-micro uppercase tracking-[0.16em]">
                <span
                  className={
                    row.state === "merged" ? "text-signal" : "text-faint"
                  }
                >
                  {row.state}
                </span>
              </td>
              <td className="py-4 text-sm leading-snug text-muted">
                {row.fixes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
