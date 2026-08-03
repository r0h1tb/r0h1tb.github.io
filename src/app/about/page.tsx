import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Shell } from "@/components/section";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}.`,
};

export default function AboutPage() {
  return (
    <Shell>
      <article className="grid grid-cols-1 gap-y-12 pb-16 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-x-16">
        <aside className="order-2 lg:order-1 lg:pt-3">
          <dl className="space-y-5 font-mono text-micro uppercase tracking-[0.18em]">
            <div>
              <dt className="text-faint">Based</dt>
              <dd className="mt-1 text-ink">{site.location}</dd>
            </div>
            <div>
              <dt className="text-faint">Email</dt>
              {/* An address is a literal string; uppercasing it is wrong. */}
              <dd className="mt-1 normal-case tracking-normal">
                <a href={`mailto:${site.email}`} className="link text-signal">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-faint">Elsewhere</dt>
              <dd className="mt-1 space-y-1">
                {site.links.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link text-ink"
                    >
                      {link.label} ↗
                    </a>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </aside>

        <div className="order-1 lg:order-2">
          <h1 className="hang-punct font-display text-h1 leading-[0.94] tracking-[-0.02em]">
            About
          </h1>

          <div className="prose mt-12">
            <p>
              I build account-servicing and payment APIs for a global
              bank&rsquo;s core banking platform — the kind of system where a
              retry has to be idempotent, a rollback plan matters as much as
              the feature, and &ldquo;it works on my machine&rdquo; is not a
              finish line. Day to day that means Java, Spring Boot,
              message-driven integration, and a lot of time spent on failure
              modes.
            </p>
            <p>
              I studied Mechanical Engineering at NITK Surathkal and moved
              into backend work because the problems were more interesting to
              me. Three years in, most of what I have learned has come from
              regulated systems, where you cannot ship first and find out
              later.
            </p>
            <p>
              Outside work I contribute fixes to open-source libraries I
              actually use — axios, Spring Boot, Cobra, Keycloak, PostHog and
              others — and build backend services to keep the fundamentals
              sharp.
            </p>

            <h2>Currently</h2>
            <ul>
              <li>
                Software Developer at a global bank, Chennai, since
                July 2023.
              </li>
              <li>
                Building an event-driven credit-card onboarding platform, with
                bureau and decisioning services split out.
              </li>
              <li>
                Going deeper on distributed systems — consistency,
                backpressure, failure recovery.
              </li>
              <li>Open to backend and platform roles.</li>
            </ul>

            <h2>Stack</h2>
            <ul>
              <li>
                <strong>Language &amp; framework</strong> — Java 17, Spring
                Boot, Spring Cloud, Hibernate, JUnit, Mockito, Python, Go
              </li>
              <li>
                <strong>System design</strong> — microservices, REST, gRPC,
                OAuth2, RBAC, circuit breakers
              </li>
              <li>
                <strong>Data &amp; messaging</strong> — PostgreSQL (composite
                indexing, query tuning), MySQL, Redis, RabbitMQ, Kafka
              </li>
              <li>
                <strong>Infrastructure</strong> — Docker, Kubernetes, AWS,
                Jenkins, Flyway, Testcontainers, Prometheus
              </li>
            </ul>

            <h2>Education &amp; certifications</h2>
            <ul>
              <li>
                B.Tech, Mechanical Engineering — National Institute of
                Technology Karnataka (NITK) Surathkal, 2019–2023
              </li>
              <li>Oracle Certified Java SE 8 Programmer</li>
              <li>AWS Certified Cloud Practitioner</li>
              <li>
                200+ LeetCode problems, focused on data structures and system
                design
              </li>
              <li>
                Led technical workshops for 20+ students with the IET NITK
                chapter
              </li>
            </ul>
          </div>
        </div>
      </article>
    </Shell>
  );
}
