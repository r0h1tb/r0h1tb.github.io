import { stack } from "@/lib/bio";

/**
 * Stack as a grouped matrix rather than one flat list.
 *
 * A wall of thirty logos says nothing about which of them someone would
 * actually be trusted with. Grouping by role — core, messaging, testing,
 * platform, and the honest "also work in" bucket — turns a keyword dump
 * into a claim about depth.
 *
 * Row-ruled, label left, items right: the same ledger structure the rest
 * of the site uses, so it reads as part of one system.
 */
export function StackMatrix() {
  return (
    <dl>
      {stack.map((row, i) => (
        <div
          key={row.group}
          className="reveal grid grid-cols-1 gap-x-8 gap-y-3 border-b border-rule py-5 sm:grid-cols-[10rem_minmax(0,1fr)]"
          style={{ "--i": i } as React.CSSProperties}
        >
          <dt className="font-mono text-micro uppercase tracking-[0.16em] text-faint">
            {row.group}
          </dt>
          <dd className="flex flex-wrap gap-x-2 gap-y-2">
            {row.items.map((item) => (
              <span
                key={item}
                className="border border-rule px-2 py-0.5 font-mono text-micro uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-signal hover:text-signal"
              >
                {item}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
