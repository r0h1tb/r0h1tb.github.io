---
title: A data race that CI cannot see
summary: The parse-cache bug in raged did not crash, did not reproduce on a small repository, and produced results that were merely wrong.
date: 2026-08-17
tags:
  - concurrency
  - open source
draft: true
---

<!--
OUTLINE — from lexasub/raged#48. Set `draft: false` to publish.

Beats:

1. Symptom first: indexing a large repo gave inconsistent results, and
   nothing failed. Silent wrongness is the interesting category.
2. Why CI missed it — small fixtures, single-threaded test runs, timing
   that never opened the window.
3. The actual race between ParserManager and the parse caches. Diagram
   the interleaving.
4. The fix, and why you chose that synchronisation boundary over the
   alternatives.
5. The hard part: writing a regression test for a race. What you did to
   make it fail reliably on `main`.
6. Generalise: the class of bug where correctness degrades instead of
   the process dying, and why that class deserves more fear.
-->
