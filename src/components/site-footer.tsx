import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="mx-auto w-full max-w-[88rem] px-5 py-10 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-micro uppercase tracking-[0.18em] text-faint">
              Get in touch
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link mt-2 inline-block font-display text-h3 leading-none"
            >
              {site.email}
            </a>
          </div>

          <ul className="flex flex-wrap items-start gap-x-6 gap-y-2 font-mono text-micro uppercase tracking-[0.18em] sm:justify-end">
            {site.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="link text-muted hover:text-ink"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colophon. Print convention, and evidence a person chose things. */}
        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-4 border-t border-rule pt-4 font-mono text-micro text-faint">
          <p>
            Set in Instrument Serif, Archivo &amp; IBM Plex Mono.
            <span className="mx-2 text-rule">/</span>
            {site.location}
          </p>
          <p>© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
