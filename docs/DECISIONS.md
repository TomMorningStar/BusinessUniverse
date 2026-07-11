# Architecture Decisions — Business Universe

This file records durable decisions. Add a new entry only when a choice should constrain future work.

## ADR-001 — React, Vite, and strict TypeScript

**Status:** accepted

The browser application uses React with Vite and strict TypeScript.

Consequences:
- new code must preserve strict typing;
- avoid unnecessary framework replacement;
- build tooling changes require a concrete benefit.

## ADR-002 — Zustand owns mutable game state

**Status:** accepted

Zustand stores game data and exposes actions/selectors.

Consequences:
- React components do not become an alternative source of authoritative game state;
- hooks are not called inside store actions;
- replacing Zustand requires an explicit task.

## ADR-003 — Domain logic is independent of React

**Status:** accepted

Economy, warehouse, production, validation, and migration logic belong in pure or testable domain modules.

Consequences:
- React components do not contain production formulas;
- domain modules do not import React or components;
- rules can be reused by future offline simulation or platform integrations.

## ADR-004 — Production is config-driven

**Status:** accepted

Resources, buildings, recipes, durations, prices, and capacities are typed configuration.

Consequences:
- ordinary new entities should not require copied production algorithms;
- building-ID branches are not used as the general production architecture.

## ADR-005 — Inputs are consumed at cycle start

**Status:** accepted

All recipe inputs are consumed atomically when a cycle begins.

Consequences:
- active production must be persisted;
- refreshing must not charge inputs again;
- blocked output delivery must not restart input consumption.

## ADR-006 — No silent output loss

**Status:** accepted

A production batch is stored, auto-sold, or kept pending. Warehouse overflow is never treated as a successful partial delivery.

## ADR-007 — Baseline hidden-tab behavior pauses progress

**Status:** accepted

Hidden-tab time is not offline progress in the current baseline.

Consequences:
- visibility restoration resets elapsed-time measurement;
- offline progress requires a separate explicit product specification.

## ADR-008 — Save format is versioned

**Status:** accepted

Current documented schema version is `1` under `business-universe-save`.

Consequences:
- raw saved JSON is validated before use;
- persisted-structure changes require migration analysis;
- unknown future versions are not loaded as version 1.

## ADR-009 — Platform services use adapters

**Status:** accepted

Future Yandex Games services should be introduced behind narrow interfaces with browser-local fallbacks where practical.

Consequences:
- domain logic does not import platform SDK types;
- local development remains possible without the platform iframe.

## ADR-010 — Targeted work after baseline completion

**Status:** accepted

The historical sequential MVP task plan is retired.

Consequences:
- only explicit user requests are implemented;
- backlog entries are not automatic tasks;
- unrelated refactors and scope expansion are avoided.
