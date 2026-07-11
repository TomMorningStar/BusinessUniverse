# Project State — Business Universe

Last documentation reset: 2026-07-11.

## Status

The initial playable baseline is reported as completed. The project is now maintained through targeted tasks rather than a fixed historical task sequence.

Before relying on this document, inspect the current repository. Update this file when the real implementation changes.

## Implemented baseline

Expected completed behavior (exact numbers live only in `BUSINESS_UNIVERSE_SPEC.md`):

- starting money balance;
- purchase and production of the potato farm;
- per-resource warehouse capacity;
- manual sell-all;
- per-resource auto-sell;
- purchase and production of the chips factory, converting potatoes into chips;
- local save/load;
- persisted active production progress;
- safe reset;
- hidden-tab pause without a large catch-up;
- responsive desktop/mobile UI;
- strict TypeScript, lint, format, and production-build workflow.

## Current game data

Resource and building numbers (IDs, prices, capacities, cycle durations, recipes) are documented once in `BUSINESS_UNIVERSE_SPEC.md` §2 (Economy). Do not copy those numbers here; read them from the spec so this file cannot drift out of sync with it.

## Save state

Storage key and schema version are documented once in `BUSINESS_UNIVERSE_SPEC.md` §10 (Saving and loading).

- Active production state must be persisted.
- Unknown or malformed saved entities must not crash loading.
- Existing saves must not be broken without migration or an explicit product decision.

## Expected architectural areas

Verify exact paths in the repository before editing:

```text
src/
  app/
  components/
  domain/
  store/
  utils/
```

Likely high-impact modules include:

- resource and building configs;
- production engine;
- warehouse and economy helpers;
- game store;
- save parser/migration;
- game loop and autosave;
- building and warehouse UI.

## Current limitations

Unless the repository already contains later work, the baseline does not assume:

- cloud saves;
- Yandex Games SDK;
- advertising;
- leaderboards;
- authentication;
- backend or database;
- offline progress;
- multiple copies of one building;
- upgrades or building levels;
- prestige;
- expanded production chains.

These are not permanent prohibitions. They may be added only through an explicit task with documented behavior.

## Maintenance rules

- Keep this file factual and concise.
- Do not list speculative features here; put them in `BACKLOG.md`.
- When a feature is completed, move its status here and remove stale wording.
- Record known bugs and technical debt only when confirmed.
