/**
 * Upstream contributions — the signature element.
 *
 * Chosen because it is the thing that is actually distinctive here: fixes
 * sent to libraries used in production, each with a regression test that
 * fails on `main`. Rendered as a dense ledger rather than cards, because
 * a ledger is the native form for this kind of data.
 *
 * Star counts and PR states verified against the GitHub API on
 * 2026-08-03. Re-check with:
 *   gh search prs --author r0h1tb --limit 40 --json repository,title,url,state
 */

export type Upstream = {
  repo: string;
  stars: string;
  pr: string;
  href: string;
  state: "open" | "merged";
  fixes: string;
};

/** Sorted by reach, which is the honest way to read this list. */
export const upstream: Upstream[] = [
  {
    repo: "axios/axios",
    stars: "109k",
    pr: "#11118",
    href: "https://github.com/axios/axios/pull/11118",
    state: "open",
    fixes: "TypeError when an interceptor is ejected mid-request — nullish handlers weren't guarded",
  },
  {
    repo: "spring-projects/spring-boot",
    stars: "81k",
    pr: "#51174",
    href: "https://github.com/spring-projects/spring-boot/pull/51174",
    state: "open",
    fixes: "gRPC port initializer ran even when spring-grpc was absent",
  },
  {
    repo: "spf13/cobra",
    stars: "44k",
    pr: "#2473",
    href: "https://github.com/spf13/cobra/pull/2473",
    state: "open",
    fixes: "Misaligned help output after a command subtree is re-parented",
  },
  {
    repo: "PostHog/posthog",
    stars: "37k",
    pr: "#76372",
    href: "https://github.com/PostHog/posthog/pull/76372",
    state: "open",
    fixes: "Etsy token refresh sent as JSON where the endpoint requires form encoding",
  },
  {
    repo: "keycloak/keycloak",
    stars: "36k",
    pr: "#51356",
    href: "https://github.com/keycloak/keycloak/pull/51356",
    state: "open",
    fixes: "Blank key attestation values emitted into OID4VCI metadata",
  },
  {
    repo: "mastra-ai/mastra",
    stars: "27k",
    pr: "#20591",
    href: "https://github.com/mastra-ai/mastra/pull/20591",
    state: "merged",
    fixes: "Stale @mastra/core peer floors across nine storage adapters",
  },
  {
    repo: "outsourc-e/hermes-workspace",
    stars: "6.3k",
    pr: "#735",
    href: "https://github.com/outsourc-e/hermes-workspace/pull/735",
    state: "open",
    fixes: "MCP server list fetched from the wrong endpoint, on both probe and data paths",
  },
  {
    repo: "goccy/go-json",
    stars: "3.7k",
    pr: "#600",
    href: "https://github.com/goccy/go-json/pull/600",
    state: "open",
    fixes: "Multi-byte runes corrupted when split across a stream buffer refill",
  },
  {
    repo: "qdrant/qdrant-client",
    stars: "1.3k",
    pr: "#1303",
    href: "https://github.com/qdrant/qdrant-client/pull/1303",
    state: "open",
    fixes: "values_count range filter applied its bounds across different counts",
  },
  {
    repo: "lexasub/raged",
    stars: "17 merged",
    pr: "#41–60",
    href: "https://github.com/lexasub/raged/pulls?q=is%3Apr+author%3Ar0h1tb",
    state: "merged",
    fixes: "Parse-cache layer, parser thread safety, Go support, cross-file symbol resolution",
  },
];
