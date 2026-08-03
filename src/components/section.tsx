/**
 * Section head: a mono label, a count, and a rule that draws itself
 * along the scroll rather than on page load. The rule is the reason
 * these read as chapters instead of paragraphs.
 */
export function SectionHead({
  label,
  count,
}: {
  label: string;
  count?: number;
}) {
  return (
    <div className="mb-9">
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="font-mono text-micro uppercase tracking-[0.22em] text-muted">
          {label}
        </h2>
        {count !== undefined && (
          <span className="tnum font-mono text-micro text-faint">
            [{String(count).padStart(2, "0")}]
          </span>
        )}
      </div>
      <div
        aria-hidden
        className="rule-draw mt-3 h-px w-full bg-ink/25"
      />
    </div>
  );
}

/** Page shell. max-w is wide on purpose — editorial, not a 720px blog. */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">{children}</div>
  );
}

/**
 * Reading-progress bar, driven by scroll(root block). Long case studies
 * benefit from knowing how much is left; the home page does not have it.
 */
export function ReadingProgress() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
    >
      <div className="progress h-full w-full origin-left bg-signal" />
    </div>
  );
}
