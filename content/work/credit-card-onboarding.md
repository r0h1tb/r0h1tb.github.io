---
title: Credit Card Onboarding Platform
summary: A personal capstone project — a five-stage card onboarding workflow of the kind banks run, built event-driven so that one downstream failure stops costing the whole application.
year: "2026"
role: Personal capstone project
stack:
  - Java 17
  - Spring Boot
  - PostgreSQL
  - RabbitMQ
  - Redis
  - Resilience4j
  - Docker
  - Kubernetes
outcome: Every failure path ends in a defined state — a stage retries three times with backoff, a circuit breaker opens at a 50% failure rate, unrecoverable work dead-letters to a terminal failed state, and a redelivered message never runs a stage twice.
order: 1
draft: false
---

## The problem

I built this on my own time to work through a failure mode that bank
onboarding flows run into. Digital credit-card onboarding runs through
five stages — application submission, bureau enquiry, credit
decisioning, core banking provisioning, and synchronisation back to the
legacy system. Each stage depends on a downstream system that the bank
does not control.

Run that synchronously and the failure mode is brutal: any one of those
systems being slow or briefly unavailable fails the entire application,
and the customer starts again. In a regulated environment "start again"
is not a neutral outcome — it means a duplicate bureau enquiry against a
real person's credit file.

## Approach

Each stage is its own RabbitMQ consumer, so it retries on its own clock
instead of holding the caller open. PostgreSQL holds the workflow state,
with a transactional outbox so a state change and the message for the
next stage commit together. That makes a retry a resumption rather than a
replay from the top.

The integration boundary with the three downstream systems, mocked in
this project, is where most of the design effort went:

- **Resilience4j circuit breakers** so a system that is already
  struggling stops receiving traffic instead of receiving more of it.
- **Three-attempt exponential backoff**, because most of these failures
  are transient and the second attempt usually succeeds.
- **Dead-letter queues** for the ones that are not transient, so a
  poisoned message is quarantined for inspection rather than retried
  forever.

## Decisions

**Asynchronous over synchronous, despite the added complexity.** A
synchronous design would have been simpler to build. It would also have
coupled the customer's experience to the availability of three
systems on someone else's roadmap. The trade is real — you take on
eventual consistency and the operational burden of a DLQ — and in this
domain it is worth paying.

**Idempotency at the handler, not the queue.** RabbitMQ gives you
at-least-once delivery, which means duplicate messages are a certainty,
not a risk. Pushing idempotency down to the queue configuration would
have been a weaker guarantee than making each handler safe to run twice
against the same workflow state.

## Outcome

The test suite drives each failure mode against the mocked downstream
systems — timeout, open circuit, malformed response, redelivery — and
each one ends in a defined state: the stage retries, or the application
dead-letters to a terminal failed state instead of retrying forever.
Redelivering the same message never runs a stage twice. These are
results from tests against mocks, not from production traffic.
