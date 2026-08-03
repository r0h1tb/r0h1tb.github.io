---
title: Idempotency is not a queue setting
summary: At-least-once delivery means duplicate messages are a certainty, not a risk. Where you put the guard decides whether that is a design or a hope.
date: 2026-08-10
tags:
  - distributed systems
  - rabbitmq
draft: true
---

<!--
OUTLINE — written by Claude from your onboarding-platform work, for you
to finish. Set `draft: false` to publish. Nothing goes live under your
name until you have written it in your own words.

Beats to hit:

1. The setup: RabbitMQ gives at-least-once. Spell out what that
   guarantees and what it does not.
2. The tempting fix — dedupe at the broker / dedupe plugin / message
   IDs — and why it is a weaker guarantee than it looks.
3. Where you actually put it: the handler, against persisted workflow
   state. Show the state machine.
4. The bureau-enquiry example. This is the strongest thing you have:
   a duplicate is not a wasted call, it is a second hard enquiry on a
   real person's credit file. Regulated domains make the abstract
   concrete.
5. The test you write to prove it: redeliver the same message N times,
   assert one state transition.
6. Honest limits: what still breaks, and what you would need
   (transactional outbox?) to close it.
-->
