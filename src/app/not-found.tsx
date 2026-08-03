import Link from "next/link";
import { Shell } from "@/components/section";

export default function NotFound() {
  return (
    <Shell>
      <section className="grid grid-cols-1 gap-y-8 py-32 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-x-16">
        <p className="tnum font-mono text-micro uppercase tracking-[0.22em] text-signal lg:pt-4">
          Error 404
        </p>
        <div>
          <h1 className="font-display text-h1 leading-[0.94] tracking-[-0.02em]">
            No page here.
          </h1>
          <p className="mt-6 max-w-[46ch] text-lead text-muted">
            The link is wrong or the page has moved.
          </p>
          <Link
            href="/"
            className="link mt-8 inline-block font-mono text-micro uppercase tracking-[0.18em] text-ink"
          >
            ← Back to the index
          </Link>
        </div>
      </section>
    </Shell>
  );
}
