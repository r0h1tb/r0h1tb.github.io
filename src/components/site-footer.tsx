import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The footer is the last thing every visitor sees, so it closes rather
 * than just labelling the bottom of the page. The address is set at
 * display scale because it is the single action worth taking here;
 * everything else — links, colophon — sits underneath it, quiet.
 */
export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-y-10 py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-16">
          <div>
            <p className="font-mono text-micro uppercase tracking-[0.22em] text-faint">
              Get in touch
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-4 flex flex-wrap items-baseline gap-x-4 font-display text-h2 leading-[1] tracking-[-0.02em]"
            >
              <span className="link">{site.email}</span>
              <span
                aria-hidden
                className="inline-block text-h3 text-signal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
              >
                ↗
              </span>
            </a>
          </div>

          <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-2 font-mono text-micro uppercase tracking-[0.18em] lg:justify-end">
            {site.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="link text-muted transition-colors hover:text-ink"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colophon. A print convention, and evidence a person chose things. */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-rule py-5 font-mono text-micro text-faint">
          <p>
            Set in Instrument Serif, Archivo &amp; IBM Plex Mono
            <span className="mx-2 text-rule">/</span>
            {site.location}
          </p>
          <p className="tnum flex flex-wrap items-baseline gap-x-2">
            <Link href="/privacy" className="link hover:text-muted">
              Privacy
            </Link>
            <span aria-hidden className="text-rule">
              /
            </span>
            <Link href="/terms" className="link hover:text-muted">
              Terms
            </Link>
            <span aria-hidden className="mx-1 text-rule">
              ·
            </span>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
