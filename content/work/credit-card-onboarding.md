---
title: Credit Card Onboarding Platform
summary: A five-stage digital onboarding workflow for a global bank, rebuilt event-driven so that one downstream failure stops costing the whole application.
year: "2026"
role: Backend engineer · a global bank
stack:
  - Java 17
  - Spring Boot
  - PostgreSQL
  - RabbitMQ
  - Redis
  - Resilience4j
  - Docker
  - Kubernetes
outcome: Independent retries cut the blast radius of a single service failure by roughly 60–70% against the synchronous baseline, and duplicate processing was prevented across 100% of tested failure scenarios.
order: 1
draft: false
---

## The problem

Digital credit-card onboarding runs through five stages — application
submission, bureau enquiry, credit decisioning, core banking
provisioning, and synchronisation back to the legacy system. Each stage
depends on a downstream system that the bank does not control.

Run that synchronously and the failure mode is brutal: any one of those
systems being slow or briefly unavailable fails the entire application,
and the customer starts again. In a regulated environment "start again"
is not a neutral outcome — it means a duplicate bureau enquiry against a
real person's credit file.

## Approach

Five REST APIs, one per stage, decoupled with RabbitMQ so each stage
retries on its own clock instead of holding the caller open. PostgreSQL
holds the workflow state, which makes a retry a resumption rather than a
replay from the top.

The integration boundary with the three downstream systems is where most
of the design effort went:

- **Resilience4j circuit breakers** so a system that is already
  struggling stops receiving traffic instead of receiving more of it.
- **Three-attempt exponential backoff**, because most of these failures
  are transient and the second attempt usually succeeds.
- **Dead-letter queues** for the ones that are not transient, so a
  poisoned message is quarantined for inspection rather than retried
  forever.

## Decisions

**Asynchronous over synchronous, despite the added complexity.** The
synchronous version was simpler and I could have shipped it sooner. It
also coupled the customer's experience to the availability of three
systems on someone else's roadmap. The trade is real — you take on
eventual consistency and the operational burden of a DLQ — and in this
domain it is worth paying.

**Idempotency at the handler, not the queue.** RabbitMQ gives you
at-least-once delivery, which means duplicate messages are a certainty,
not a risk. Pushing idempotency down to the queue configuration would
have been a weaker guarantee than making each handler safe to run twice
against the same workflow state.

## Outcome

Independent per-stage retries reduced the impact of a single service
failure by roughly 60–70% compared with the synchronous workflow.
Across the tested failure scenarios — timeout, circuit open, malformed
downstream response, redelivery — no duplicate processing occurred.
