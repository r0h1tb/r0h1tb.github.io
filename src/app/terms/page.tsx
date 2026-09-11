import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { SectionHead, Shell } from "@/components/section";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms for the personal command-line tools published here. Provided as-is, for your own account, with no warranty.",
};

/**
 * Companion to /privacy — Google's OAuth consent screen requires a terms
 * URL as well before an app can be published out of "Testing".
 */
export default function TermsPage() {
  return (
    <Shell>
      <section className="grid grid-cols-1 gap-y-10 pb-16 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-x-14">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-faint lg:pt-5">
          Terms
        </p>

        <div>
          <h1 className="hang-punct font-display text-h1 leading-[0.88] tracking-[-0.03em]">
            Personal tools, offered{" "}
            <em className="not-italic text-signal">as-is</em>.
          </h1>

          <p className="mt-10 max-w-[54ch] text-lead leading-[1.4] text-muted">
            These terms cover the personal command-line tools I publish,
            including <strong className="text-ink">gmail-cli</strong>. They
            are side projects, not a product, and there is no company behind
            them.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <SectionHead label="Use" />
        <div className="prose max-w-[62ch]">
          <p>
            You may run these tools against accounts you own or are
            authorised to access, and nothing else. You are responsible for
            what you send with them and for complying with the terms of any
            service they talk to — including Gmail&rsquo;s sending limits and
            bulk-sender policies.
          </p>
          <p>
            Do not use them to send unsolicited bulk mail. That is against
            Google&rsquo;s terms, and it is the fastest way to get your own
            account restricted.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <SectionHead label="No warranty" />
        <div className="prose max-w-[62ch]">
          <p>
            The tools are provided &ldquo;as is&rdquo;, without warranty of
            any kind, express or implied, including merchantability, fitness
            for a particular purpose and non-infringement. I am not liable
            for any claim, damages, lost mail, missed message or other
            liability arising from their use.
          </p>
          <p>
            They can stop working at any time — an upstream API changes, a
            token expires, a dependency breaks. Do not put anything critical
            behind them without your own monitoring.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <SectionHead label="Your data" />
        <div className="prose max-w-[62ch]">
          <p>
            I do not receive, store or process your data — see the{" "}
            <Link href="/privacy" className="link">
              privacy policy
            </Link>{" "}
            for what that means in practice. Access can be revoked by you at
            any time from your Google account permissions page.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <SectionHead label="Changes" />
        <div className="prose max-w-[62ch]">
          <p>
            These terms may change as the tools change. The date below is the
            current version.
          </p>
        </div>
      </section>

      <section className="border-t border-rule py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-16">
          <div>
            <h2 className="font-display text-h2 leading-[1.02] tracking-[-0.02em]">
              Anything unclear here?
            </h2>
            <p className="mt-4 max-w-[46ch] text-body text-muted">
              Ask me directly. Last updated 11 September 2026.
            </p>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="group inline-flex shrink-0 items-baseline gap-3 border-b-2 border-signal pb-1 font-mono text-sm tracking-normal text-signal"
          >
            {site.email}
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
            >
              ↗
            </span>
          </a>
        </div>
      </section>
    </Shell>
  );
}
