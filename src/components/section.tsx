/** Section head: a mono label, a rule that draws itself, an optional count. */
export function SectionHead({
  label,
  count,
}: {
  label: string;
  count?: number;
}) {
  return (
    <div className="mb-8 flex items-baseline justify-between gap-6">
      <h2 className="font-mono text-micro uppercase tracking-[0.22em] text-muted">
        {label}
      </h2>
      {count !== undefined && (
        <span className="tnum font-mono text-micro text-faint">
          [{String(count).padStart(2, "0")}]
        </span>
      )}
    </div>
  );
}

/** Page shell. max-w is wide on purpose — editorial, not a 720px blog. */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">{children}</div>
  );
}
