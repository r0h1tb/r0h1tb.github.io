---
title: Legacy Service Modernization
summary: Migrating a bank's account-servicing endpoints off SOAP and onto a standard REST architecture, without a maintenance window and without changing behaviour.
year: "2023–2026"
role: Backend engineer · a global bank
stack:
  - Spring Boot
  - PostgreSQL
  - REST
  - SOAP
  - Elasticsearch
  - Kibana
  - Azure DevOps
outcome: 17+ endpoints migrated — around 35% of the programme's total scope — with test coverage raised to 80% and legacy maintenance overhead down 25%.
order: 2
draft: false
---

## The problem

A core banking platform accumulates a particular kind of debt. The
services work, they have worked for years, and nobody wants to touch
them — which is precisely why the cost of changing anything keeps
rising. The brief was to migrate account-servicing endpoints onto a
modern REST architecture while the existing ones stayed live and
correct.

The constraint that shapes everything: this is a regulated environment.
There is no "move fast" version. Behaviour has to be provably identical
before and after, because the thing on the other end of the endpoint is
somebody's account.

## Approach

Each endpoint was rebuilt through the full backend stack rather than
wrapped — resource classes, mappers, translators, repositories. A façade
over SOAP would have been faster and would have preserved the original
shape of the problem, which was the thing we were trying to remove.

Test-driven throughout, which in a migration is less about design and
more about evidence. Writing the test first forces you to state what the
legacy endpoint actually does, including the parts nobody documented,
before you are allowed to replace it. Coverage went from legacy levels
to 80%, and that number is the artefact of the method rather than a
target that was chased.

Elasticsearch and Kibana on the logs, so a discrepancy between old and
new could be found by querying rather than by reading.

## Decisions

**Rebuild the layers instead of wrapping the SOAP service.** Slower.
It's the difference between reducing the maintenance burden and
relocating it.

**Migrate endpoint by endpoint rather than as a cutover.** Each one
shipped independently and could be rolled back independently. In a bank,
a rollback plan matters as much as the feature.

## Outcome

17+ endpoints migrated, roughly 35% of the total modernization goal for
the targeted system. Maintenance overhead on the legacy surface dropped
about 25%, and standardising the REST architecture cut debugging and
testing time for the team by around 40% — most of that being time
previously spent working out what the old contract was.
