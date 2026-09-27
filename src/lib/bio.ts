/**
 * Structured biography — everything the About page renders.
 *
 * Sourced from rohit_behera_resume_legacy_first.tex (31 Jul 2026) and the
 * GitHub API (3 Aug 2026). Kept apart from site.ts because site.ts is
 * identity and links, which every page needs; this is only About.
 */

/**
 * Four, not eight. Past three or four figures a stats row stops being
 * read and becomes a wall the eye skips — so these are the ones that
 * prove an outcome, and every one is measured rather than rounded up.
 */
export const stats = [
  {
    figure: "3",
    unit: "yrs",
    label: "Backend engineering",
    note: "Regulated banking systems, Java and Spring Boot",
  },
  {
    figure: "17",
    unit: "+",
    label: "Endpoints migrated",
    note: "≈35% of one modernization programme's scope",
  },
  {
    figure: "10",
    unit: "",
    label: "Upstream projects",
    note: "axios, Spring Boot, Cobra, Keycloak, PostHog and more",
  },
  {
    figure: "17",
    unit: "",
    label: "Pull requests merged",
    note: "Into raged, each with a failing regression test first",
  },
] as const;

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  place?: string;
  body: string;
  detail?: string[];
  current?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Jul 2023 — Sep 2026",
    title: "Senior Analyst, Backend Engineering",
    org: "A global bank",
    place: "Chennai",
    body: "Account-servicing and payment APIs on a global bank's core banking platform, where behaviour has to be provably unchanged before anything ships. Joined as a Development Engineer in 2023 and promoted to Senior Analyst in 2025.",
    detail: [
      "Legacy modernization off SOAP onto REST, test-driven, 17+ endpoints migrated",
    ],
  },
  {
    period: "2026",
    title: "Leading external contributor",
    org: "lexasub/raged",
    body: "Open-source code intelligence for AI agents. Took on the parse-cache layer, parser thread safety, Go language support and cross-file symbol resolution.",
    detail: ["17 pull requests merged", "608 lines of shadowed duplicate code removed"],
  },
  {
    period: "2019 — 2023",
    title: "B.Tech, Mechanical Engineering",
    org: "National Institute of Technology Karnataka",
    place: "Surathkal",
    body: "Moved into backend work because the problems were more interesting to me. Led technical workshops for 20+ students with the IET NITK chapter.",
  },
];

/**
 * Grouped rather than one flat list — a wall of thirty technologies says
 * nothing about which of them you would actually be trusted with.
 */
export const stack = [
  {
    group: "Core",
    items: ["Java 17", "Spring Boot", "Spring Cloud", "Hibernate", "PostgreSQL"],
  },
  {
    group: "Messaging & resilience",
    items: ["RabbitMQ", "Apache Kafka", "Redis", "Resilience4j", "gRPC"],
  },
  {
    group: "Testing",
    items: ["JUnit 5", "Mockito", "Testcontainers", "TDD"],
  },
  {
    group: "Platform",
    items: ["Docker", "Kubernetes", "AWS", "Jenkins", "Flyway", "Prometheus"],
  },
  {
    group: "Also work in",
    items: ["Python", "Go", "TypeScript", "OpenAPI"],
  },
] as const;

export const certifications = [
  "Oracle Certified Java SE 8 Programmer",
  "AWS Certified Cloud Practitioner",
  "200+ LeetCode problems — data structures & system design",
] as const;
