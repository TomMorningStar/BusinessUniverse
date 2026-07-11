# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Business Universe — a browser idle/tycoon game (React + TypeScript). Core loop:

```
money → potato farm → potatoes → chips factory → chips → money
```

The playable MVP baseline is complete. This repo is now maintained through **targeted, explicitly-requested changes**, not a task backlog — see "Scope discipline" below before doing anything not directly asked for.

## Commands

```bash
npm run dev            # start Vite dev server
npm run typecheck       # tsc -b --pretty false
npm run lint            # eslint .
npm run format          # prettier --write .
npm run format:check    # prettier --check .
npm run build           # tsc -b && vite build
npm run preview         # preview production build
```

There is no test runner configured in this repo. After any meaningful change, run `typecheck`, `lint`, `format:check`, and `build`, and fix every failure. Never claim a check passed without actually running it.

## Scope discipline (read this first)

- Implement only what the user explicitly requested. Do not pick another backlog item, redesign unrelated UI, migrate libraries, rewrite working modules, change game balance, or add a dependency/backend/SDK on your own initiative.
- If code and documentation disagree, trust the code, then report the mismatch rather than silently changing behavior to match stale docs.
- Prefer the smallest coherent change that fully solves the request; keep refactors scoped to what the task requires.

## Architecture

Dependency direction is strictly one-way:

```
React components → Zustand store (state/actions/selectors) → pure domain functions + typed configs → plain serializable data
```

- **`src/domain`** — pure, React-free game logic: types, constants, resource/building configs, initial-state factories, warehouse operations, economy calculations, production transitions, save validation/migration. Must not import React, Zustand, or components.
- **`src/store`** (`useGameStore.ts`, `useNoticesStore.ts`, `selectors.ts`) — the single source of mutable game state (Zustand). Actions read config, call domain helpers, and commit one coherent update. Never duplicates formulas already defined in domain configs; never calls React hooks.
- **`src/components`** — rendering, input, presentation formatting only. Never consumes production inputs, computes prices/recipes, advances production, or touches storage directly. No building-ID-specific branches.
- **`src/app`** (`useGameLoop.ts`, `useAutosave.ts`) — app composition, game loop and autosave lifecycle, page-visibility handling.
- **`src/utils`** — generic helpers with no knowledge of game entities.

Key architectural rules:

- **Config-driven entities**: resources and buildings are typed configs (`src/domain/resources.ts`, `src/domain/buildings.ts`). Adding an ordinary building should not require a copied production function or an `if (building.id === ...)` branch — production goes through `advanceBuilding`/`advanceAllBuildings` (`src/domain/production.ts`) driven by config.
- **Atomic production cycles**: a cycle start verifies and consumes _all_ recipe inputs at once (never partially); a cycle completion delivers/auto-sells all outputs exactly once. If a completed output can't fit in the warehouse, the building stays `output_blocked` at full progress until space frees up (not silently dropped, not double-consumed on retry) — see `startCycle`/`advanceBuilding` in `src/domain/production.ts`.
- **Domain result model**: operations that can fail return `{ ok: true, value, events? } | { ok: false, reason }` rather than throwing; machine-readable reasons are converted to UI text in the presentation layer.
- **Time/delta handling**: `getSafeDeltaMs` rejects non-finite/negative delta and clamps abnormally large delta (e.g. after a hidden tab) to `MAX_TICK_MS`. Hidden-tab time is currently _not_ offline progress — visibility restoration resets elapsed-time measurement rather than catching up.
- **Persistence** (`src/domain/save.ts`): storage key `business-universe-save`, schema version `1` (`SAVE_SCHEMA_VERSION`). Flow is always `parseSave → migrateSave → sanitizeSave(fallback) → set(...)` — raw parsed JSON is never spread directly into store state. An unrecognized/future version is not treated as v1. Any change to persisted fields needs a migration (bump `SAVE_SCHEMA_VERSION`) or an explicit incompatibility decision.
- **Derived state is never persisted** (progress %, formatted currency, button/status text) — compute it from persisted primitives.
- **Platform integration boundary**: Yandex Games (or any platform) integration should sit behind a narrow adapter so the game keeps running locally without the platform iframe; domain types must not leak platform SDK types.

## Engineering constraints

- Strict TypeScript everywhere; avoid `any` (if unavoidable due to a third-party API, isolate and comment why).
- Never write saves on every animation frame.
- Never mutate nested state accidentally — commit one coherent state update per action.
