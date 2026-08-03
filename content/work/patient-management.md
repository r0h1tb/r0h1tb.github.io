---
title: Microservices Patient Management System
summary: A four-service healthcare backend built to work through service-to-service communication properly — gRPC between services, Kafka for events, rather than HTTP calls everywhere.
year: "2025"
role: Personal project
stack:
  - Spring Boot
  - gRPC
  - Apache Kafka
  - PostgreSQL
  - Docker
  - Python
outcome: Four services over gRPC with 3+ Kafka topics; Python analytics processing 1K+ simulated patient records.
order: 4
draft: false
---

## Why I built it

To get the service-to-service layer wrong somewhere it did not matter.
At work the integration patterns are already chosen; here I wanted to
make the choices myself and find out where they hurt.

## What it does

Four services — patient, appointment, billing, analytics — with gRPC for
synchronous service-to-service calls and Kafka for events that more than
one service cares about. PostgreSQL for persistence, Docker Compose for
the whole thing.

The split matters: gRPC where a caller genuinely needs an answer before
it can continue, Kafka where it does not. Defaulting everything to REST
blurs that line, and the blur is where latency accumulates.

Python analytics on the consumer side, processing 1K+ simulated patient
records to produce reporting off the event stream rather than by
querying the operational database.

## What I would change

The service boundaries follow the nouns of the domain, which is the
obvious cut and not always the right one. Billing and appointment share
enough state that they talk more than two independent services should —
a sign the boundary is in the wrong place. I would redraw it around
transactions rather than entities.
