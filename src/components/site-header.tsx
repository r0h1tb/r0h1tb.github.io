import Link from "next/link";
import { nav, site } from "@/lib/site";
import { getAllPosts } from "@/lib/content";

export function SiteHeader() {
  // The nav should describe what exists. Linking to an empty Writing
  // section advertises a gap; hide it until the first post ships.
  const hasWriting = getAllPosts().length > 0;
  const items = nav
    .slice(1)
    .filter((item) => item.href !== "/writing" || hasWriting);

  return (
    <header className="border-b border-rule">
      {/* One row from `sm` up; two rows below it, because the name and
          three nav items do not both fit at 320px. */}
      <div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 gap-y-2.5 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-6 sm:gap-y-0 sm:px-8">
        <Link
          href="/"
          className="font-mono text-micro uppercase tracking-[0.18em] text-ink"
        >
          {site.name}
          <span className="ml-3 text-faint">{site.role}</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-micro uppercase tracking-[0.18em] sm:justify-end sm:gap-x-7">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link text-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
