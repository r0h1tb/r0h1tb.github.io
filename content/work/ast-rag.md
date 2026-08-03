---
title: "AST-RAG: Code Intelligence for AI Agents"
summary: Open-source code-intelligence engine that parses repositories into ASTs, builds a Neo4j call graph, and serves semantic search over Qdrant embeddings. I am the leading external contributor.
year: "2026"
role: Leading external contributor — 17 merged PRs
stack:
  - Python
  - Tree-sitter
  - Neo4j
  - Qdrant
  - SQLite
outcome: 17 pull requests merged, including the parse-cache layer, parser thread safety, Go language support, and cross-file symbol resolution.
repo: "https://github.com/lexasub/raged"
order: 3
draft: false
---

## The problem

An agent reasoning about a codebase needs more than text search. `raged`
parses repositories into ASTs with Tree-sitter, builds a call graph in
Neo4j, and indexes embeddings in Qdrant so a query can be answered
structurally rather than lexically.

I started contributing because I was using it, hit its edges, and found
the edges more interesting than the workaround.

## What I built

[All 17 merged pull requests](https://github.com/lexasub/raged/pulls?q=is%3Apr+author%3Ar0h1tb+is%3Amerged)
are public. The ones that mattered most:

**The parse-cache layer.** Re-parsing unchanged files on every index run
was the dominant cost. The cache uses content-addressed SHA-256 keys, so
identical content is never parsed twice regardless of path, with
pluggable in-memory and SQLite backends behind a single interface and
bounded eviction on both entry count and memory. Bounded is the
important word — an unbounded cache in a long-running indexer is a
memory leak with extra steps.

**Thread safety in `ParserManager`.** A data race between the parser
manager and the parse caches. This is the class of bug that does not
reproduce in CI, corrupts results rather than crashing, and is invisible
until someone indexes a large repository on a fast machine.

**Cross-file reference resolution** via a project-wide symbol table,
which is what turns a per-file AST into an actual call graph.

**Go language support**, plus a dedicated TSX grammar for `.tsx` — the
JavaScript grammar silently mis-parses TSX rather than failing, which is
the worst available behaviour.

**608 lines of shadowed duplicate code removed** from the edges module,
and CI restored to green by pinning lint rules and repairing two stale
test assumptions.

## How I work on other people's code

Every fix ships with a regression test that fails on `main` and passes
with the patch. It is the only version of "I fixed it" that a maintainer
can verify in under a minute, and reviewer time is the scarce resource
in open source — not code.
