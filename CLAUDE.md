# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Business Universe — a browser idle/tycoon game (React + TypeScript). Core loop:

```
money → potato farm → potatoes → chips factory → chips → money
```

The playable MVP baseline is complete. Feature growth beyond the MVP is planned in **`DEVELOPMENT_ROADMAP.md`** — the staged plan (P0/P1/P2 priorities, numbered stages, and a "Рекомендуемый порядок первых задач" sequence of discrete Task 1..15) toward a population-driven economic strategy game (construction resources → housing → population → workforce → production → needs → class advancement → contracts/research/prestige), rather than an ever-growing pile of unrelated resources. None of that system exists in code yet — today's codebase is still the plain MVP loop above (single settler-free chain, no workforce/needs/construction-resource layer, no platform adapter, no test runner). Read the roadmap before starting feature work, but implement only the one stage/task actually requested — see "Scope discipline" below before doing anything not directly asked for.

## Commands

```bash
npm run dev            # start Vite dev server
npm run typecheck       # tsc -b --pretty false
npm run lint            # eslint .
npm run format          # prettier --write .
npm run format:check    # prettier --check .
npm run i18n:check      # translation dictionaries key-parity check (en is the reference)
npm run build           # tsc -b && vite build
npm run preview         # preview production build
```

There is no test runner configured in this repo yet (`DEVELOPMENT_ROADMAP.md` Stage 0 plans to add Vitest — don't assume it exists until that stage is actually done). After any meaningful change, run `typecheck`, `lint`, `format:check`, and `build` (plus `i18n:check` if translation dictionaries changed, and `npm test` once a runner exists), and fix every failure. Never claim a check passed without actually running it.

## Scope discipline (read this first)

- Implement only what the user explicitly requested — including roadmap-driven work: if asked to run a roadmap stage or "Task N" from `DEVELOPMENT_ROADMAP.md`, implement exactly that one item, plan it first, and stop; never self-select or chain into the next stage/task.
- Do not pick another backlog item, redesign unrelated UI, migrate libraries, rewrite working modules, change game balance, or add a dependency/backend/SDK on your own initiative.
- Before starting, check whether the change touches persisted save fields (needs a `SAVE_SCHEMA_VERSION` bump + migration, see Architecture) or introduces new user-facing strings (needs keys in all 8 locales + `i18n:check`, see Localization).
- If code and documentation disagree, trust the code, then report the mismatch rather than silently changing behavior to match stale docs.
- Prefer the smallest coherent change that fully solves the request; keep refactors scoped to what the task requires.

## Architecture

Dependency direction is strictly one-way:

```
React UI (FSD layers) → Zustand store (state/actions/selectors) → pure domain functions + typed configs → plain serializable data
```

The UI follows Feature-Sliced Design (app → pages → widgets → features → entities → shared); a lower layer must never import from a higher one. `src/domain` and `src/store` sit outside the FSD UI layers as the framework-free game core that any UI layer above `shared` may import.

- **`src/domain`** — pure, React-free game logic: types, constants, resource/building configs, initial-state factories, warehouse operations, economy calculations, production transitions, save validation/migration. Must not import React, Zustand, UI code, or i18next — configs carry no display strings (see Localization below), only stable ids.
- **`src/store`** (`useGameStore.ts`, `useNoticesStore.ts`, `selectors.ts`) — the single source of mutable game state (Zustand). Actions read config, call domain helpers, and commit one coherent update. Never duplicates formulas already defined in domain configs; never calls React hooks or `t()`. Notices are stored as typed payloads (`{ kind: 'building_built', buildingId, count }`, `{ kind: 'resources_sold', resourceId, amount, income }`), not pre-formatted strings — translation happens where they're rendered. `selectors.ts` is the canonical set of narrow selectors — components subscribe to the smallest slice they need (primitives over objects; `progressMs` changes every tick, so nothing subscribes to whole `OwnedBuilding` objects; `selectResourceSlots`/`selectAutoSellFlags` take a fixed list of ids and pair with `useShallow`).
- **`src/app`** — entry composition (`App.tsx`), game loop and autosave lifecycle (`useGameLoop.ts`, `useAutosave.ts`), page-visibility handling, global styles (`app/styles/`: tokens, glass, base). The game loop and autosave mount here, above any page-level view switching, so navigating within the app never stops the simulation.
- **`src/pages/game`** — the game page: tab state (including the settings tab's language sub-view) and layout composition of widgets.
- **`src/widgets`** — large self-contained UI blocks (`header`, `sidebar`, `buildings-panel`, `warehouse-panel`, `production-notice`, `background`, `settings-panel`, `language-panel`). Each slice exposes its public API through `index.ts`. `language-panel` renders as a sub-view inside the settings tab's content area (`app__main`), not a separate route — there is no router in this app.
- **`src/features`** — user operations (`reset-progress`). Small actions that are internal details of one component stay in that component.
- **`src/entities`** — entity UI (`building/ui/BuildingCard`, `resource/ui/ResourceRow`, `resource/ui/ResourceAmountIcons`). Rendering, input, presentation formatting only: never consumes production inputs, computes prices/recipes, advances production, or touches storage directly. No building-ID-specific branches. `BuildingCard` is split into the card shell (subscribed only to `ownedCount`/`status` primitives) plus isolated sub-components (`BuildButton` subscribes to money, `AutoSellToggles`/`StorageIndicator`/`BlockReasonText` subscribe only to their building's own resource ids via `useShallow`) — this keeps an auto-sell payout or an unrelated resource tick from re-rendering the heavy animated icon.
- **`src/shared`** — reusable code with no knowledge of game entities: `ui/EmojiIcon`, `ui/QuantityStepper`, `ui/icons/*` (including `icons/flags` for the language panel), `lib/iconAnimation.ts`, `i18n/*`. Must not import entities, features, widgets, pages, or app.

Key architectural rules:

- **Config-driven entities**: resources and buildings are typed configs (`src/domain/resources.ts`, `src/domain/buildings.ts`). Adding an ordinary building should not require a copied production function or an `if (building.id === ...)` branch — production goes through `advanceBuilding`/`advanceAllBuildings` (`src/domain/production.ts`) driven by config. Configs hold only ids and numeric/emoji data, never display names (see Localization).
- **Atomic production cycles**: a cycle start verifies and consumes _all_ recipe inputs at once (never partially); a cycle completion delivers/auto-sells all outputs exactly once. If a completed output can't fit in the warehouse, the building stays `output_blocked` at full progress until space frees up (not silently dropped, not double-consumed on retry). `advanceBuilding` can complete several cycles within one tick when the elapsed time spans more than one cycle duration (carrying the remainder forward, capped by `MAX_CYCLES_PER_TICK` as a safety bound against pathological configs) — see `startCycle`/`advanceBuilding` in `src/domain/production.ts`.
- **Fixed-step simulation**: the game loop (`useGameLoop.ts`) accumulates real elapsed time and drains it in `SIMULATION_STEP_MS` (100 ms) increments rather than ticking every animation frame, so production is frame-rate independent — the same elapsed real time yields the same result regardless of how it was chunked.
- **Domain result model**: operations that can fail return `{ ok: true, value, events? } | { ok: false, reason }` rather than throwing; machine-readable reasons are converted to UI text in the presentation layer.
- **Time/delta handling**: `getSafeDeltaMs` rejects non-finite/negative delta and clamps abnormally large delta (e.g. after a hidden tab) to `MAX_TICK_MS`. Hidden-tab time is currently _not_ offline progress — visibility restoration resets elapsed-time measurement rather than catching up.
- **Persistence** (`src/domain/save.ts`): storage key `business-universe-save`, schema version `4` (`SAVE_SCHEMA_VERSION`). Flow is always `parseSave → migrateSave → sanitizeSave(fallback) → set(...)` — raw parsed JSON is never spread directly into store state. An unrecognized/future version is not treated as current data. Any change to persisted fields needs a migration (bump `SAVE_SCHEMA_VERSION` and chain an upgrade step in `migrateSave`, as `migrateV1ToV2` does for `ownedCount` and the later steps do for each new resource) or an explicit incompatibility decision. The selected UI language is persisted separately under its own `business-universe:language` key (see Localization) — it is never part of the game save and never needs a schema bump.
- **Derived state is never persisted** (progress %, formatted currency, button/status text) — compute it from persisted primitives.
- **Platform integration boundary**: Yandex Games (or any platform) integration should sit behind a narrow adapter so the game keeps running locally without the platform iframe; domain types must not leak platform SDK types. `detectLanguage()` already accepts an optional platform-language argument for this adapter to feed in, without any React code touching the SDK global directly.
- **Design tokens** (`src/app/styles/tokens.css`): colors, glass material, radii, motion, and icon sizing live in one global token sheet; reusable "Liquid Glass" surface classes (`.glass`, `.glass-btn`, `.glass-icon`) live in `src/app/styles/glass.css` — use them rather than re-implementing the effect per component. Component CSS references these variables instead of hard-coding values. Icon components consume `--icon-size`, which the container sets from the per-context tokens (`--icon-size-building`, `--icon-size-sidebar`, …). Below the `720px` mobile breakpoint, `.glass`/`.glass-btn` drop `backdrop-filter` in favor of a slightly more opaque flat fill (still defined in `glass.css`) to avoid per-element backdrop capture cost on weak devices — desktop keeps the real blur.
- **Icon animation pausing** (`src/shared/lib/iconAnimation.ts`): `useIconAnimationPause()` attaches a shared (single, not per-card) `IntersectionObserver` plus page-visibility tracking to freeze an icon's CSS animations via the global `.icon-anim-paused` rule when it's off-screen or the tab is hidden; animations resume from their current frame. This is separate from, and in addition to, each icon's own `prefers-reduced-motion` handling.

## Localization

The UI is fully internationalized via `i18next` + `react-i18next`, rooted at `src/shared/i18n/`:

- **8 supported locales**: `ru, en, es, de, fr, pt-BR, tr, it`, declared once in `locales.ts` (`SUPPORTED_LOCALES`, `LOCALE_CONFIGS` for display — native name + flag id). `en` is the fallback locale and the reference dictionary against which `t()` is typed (`i18next.d.ts`) and against which `npm run i18n:check` validates every other locale's key set (including plural-suffix parity).
- **Detection priority** (`detectLanguage.ts`): manually-stored choice → platform language (passed in, never read from a global SDK) → `navigator.languages` → `navigator.language` → `en`. Regional tags are normalized (`ru-RU → ru`, `pt-PT`/`pt → pt-BR`, etc.); unsupported languages fall through to `en` without throwing.
- **Persistence**: the chosen locale is stored under `business-universe:language`, written only on manual selection — separate from `business-universe-save` and unaffected by `resetGame`.
- **Domain/store stay translation-free**: `src/domain` and `src/store` never call `t()`. They expose stable ids (`resourceId`, `buildingId`, `BuildingRunStatus`, typed notice payloads) that the UI resolves via conventional key paths — `resources.<id>.name`, `buildings.<id>.name`/`description`, `buildingStatus.<status>`. Dynamic messages (missing-resource text, sold-notice text) use i18next interpolation with full sentence templates per locale, not string concatenation, because word order differs across languages.
- **Formatting**: `src/shared/i18n/formatters.ts` wraps `Intl.NumberFormat` (cached per locale) for `formatNumber`/`formatPercent`/`formatMoney` — the in-game `₽` currency symbol is fixed across all locales; only the number grouping/decimal style is locale-aware.
- Adding a resource or building requires adding its `name`/`description` keys to **all 8** dictionaries under `src/shared/i18n/translations/` — `npm run i18n:check` fails loudly if one is missed.

## Engineering constraints

- Strict TypeScript everywhere; avoid `any` (if unavoidable due to a third-party API, isolate and comment why).
- All user-facing text goes through the i18n dictionaries (see Localization above) — no hardcoded UI strings in JSX, configs, or the store. Code identifiers and comments are English.
- Never write saves on every animation frame; the production tick itself never triggers a save (only autosave, `pagehide`, and discrete user actions — buy/sell/toggle-autosell/reset — do).
- Never mutate nested state accidentally — commit one coherent state update per action.
