import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SectionHead, Shell } from "@/components/section";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How the personal tools published here handle data. Short version: they run on my own machine and send nothing anywhere.",
};

/**
 * Required by Google's OAuth consent screen: an app cannot leave
 * "Testing" publishing status without a reachable privacy policy URL,
 * and apps left in Testing have refresh tokens that expire after seven
 * days. This page exists so the tools can be published properly.
 *
 * Deliberately quiet compared to the rest of the site — a policy page
 * should be legible, not art-directed.
 */
export default function PrivacyPage() {
  return (
    <Shell>
      <section className="grid grid-cols-1 gap-y-10 pb-16 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-x-14">
        <p className="font-mono text-micro uppercase tracking-[0.22em] text-faint lg:pt-5">
          Privacy
        </p>

        <div>
          <h1 className="hang-punct font-display text-h1 leading-[0.88] tracking-[-0.03em]">
            These tools run on my machine
            <br />
            and send data{" "}
            <em className="not-italic text-signal">nowhere</em>.
          </h1>

          <p className="mt-10 max-w-[54ch] text-lead leading-[1.4] text-muted">
            This policy covers the personal command-line tools I publish,
            including <strong className="text-ink">gmail-cli</strong>, which
            uses Google&rsquo;s Gmail API. There is no server, no account to
            create and no analytics.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <SectionHead label="What is collected" />
        <div className="prose max-w-[62ch]">
          <p>
            Nothing is collected by me. These tools are run locally by the
            person who installed them. They have no backend, transmit no
            telemetry, and I have no ability to see what anyone does with
            them.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <SectionHead label="Google account data" />
        <div className="prose max-w-[62ch]">
          <p>
            <strong>gmail-cli</strong> asks for two Google OAuth scopes:
          </p>
          <ul>
            <li>
              <code>gmail.modify</code> — read, search and label messages in
              the mailbox that authorised it.
            </li>
            <li>
              <code>gmail.send</code> — send messages from that mailbox.
            </li>
          </ul>
          <p>
            It does not request permission to delete anything. Message
            content is read into the local process only to display it in
            your own terminal, and is not written anywhere except where you
            explicitly ask the tool to save it.
          </p>
          <p>
            Google account data obtained through these scopes is never
            transferred to anyone, and is not used for advertising,
            profiling, resale, or to train any model. Use of information
            received from Google APIs adheres to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              Google API Services User Data Policy
            </a>
            , including its Limited Use requirements.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <SectionHead label="Where credentials live" />
        <div className="prose max-w-[62ch]">
          <p>
            Authorising the tool writes an OAuth token to a file on your own
            computer, readable only by your user account. It never leaves
            that machine. Deleting the file removes the tool&rsquo;s access
            locally.
          </p>
          <p>
            You can revoke access at any time, independently of me, at{" "}
            <a
              href="https://myaccount.google.com/permissions"
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              myaccount.google.com/permissions
            </a>
            . Revoking takes effect immediately.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <SectionHead label="Children" />
        <div className="prose max-w-[62ch]">
          <p>
            These are developer tools and are not directed at children under
            13.
          </p>
        </div>
      </section>

      <section className="border-t border-rule py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-16">
          <div>
            <h2 className="font-display text-h2 leading-[1.02] tracking-[-0.02em]">
              Questions about any of this?
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
