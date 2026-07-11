# Architecture — Business Universe

This document describes stable boundaries. Inspect the actual repository before assuming an exact filename exists.

## 1. Dependency direction

```text
React components
      ↓
Zustand selectors/actions
      ↓
pure domain functions + typed configs
      ↓
plain serializable data
```

The domain layer must not depend on:
- React;
- React hooks;
- Zustand;
- components;
- browser DOM.

Browser storage adapters may live near the save boundary, while parsing, validation, sanitization, and migration remain independently testable.

## 2. Responsibilities

### `src/domain`

Owns:
- types;
- constants;
- resource and building configs;
- initial-state factories;
- warehouse operations;
- economy calculations;
- production transitions;
- save validation and migrations.

Domain functions should be deterministic where practical.

### `src/store`

Owns:
- current mutable game state;
- public actions;
- orchestration of domain helpers;
- selectors or selector-friendly state.

The store must not duplicate formulas already defined in configs.

### `src/components`

Owns:
- rendering;
- user input;
- accessibility;
- presentational formatting;
- visible disabled reasons;
- status presentation.

Components must not:
- consume production inputs;
- calculate authoritative prices or recipes;
- advance production;
- read or write storage directly;
- contain building-specific production algorithms.

### `src/app`

Owns:
- application composition;
- game loop lifecycle;
- autosave lifecycle;
- visibility/page lifecycle;
- platform initialization boundaries.

### `src/utils`

Owns generic helpers that do not know game entities.

## 3. Config-driven entities

Resources and buildings must be represented by typed configuration.

Adding a new ordinary building should primarily require:
- a typed ID;
- resource config when needed;
- building recipe config;
- presentation data.

It should not require a copied production function.

Avoid:

```ts
if (building.id === 'potato_farm') {
  addPotatoes();
}
```

Prefer:

```ts
const config = BUILDINGS[building.id];
const result = advanceBuilding(gameData, ownedBuilding, config, deltaMs);
```

## 4. Transaction boundaries

### Cycle start

A start is atomic:
- verify all inputs;
- verify output destination;
- consume all inputs;
- mark the cycle active.

Never consume only part of a recipe.

### Cycle completion

Completion is atomic:
- verify delivery;
- deliver or auto-sell all outputs;
- mark completion once;
- retain only valid remainder progress;
- start the next cycle through normal rules.

Never deliver a configured batch twice.

### Blocked completion

If a completed stored output cannot fit:
- keep the completed result pending;
- do not consume new inputs;
- retry later.

## 5. Domain result model

Prefer explicit result objects for operations that may fail:

```ts
type DomainResult<T, R = string> =
  | { ok: true; value: T; events?: readonly GameEvent[] }
  | { ok: false; reason: R };
```

Use machine-readable reasons in domain code and convert them to localized UI text in the presentation layer.

## 6. Time model

Production receives elapsed time.

The domain/store boundary must:
- reject or normalize non-finite delta;
- reject negative delta;
- clamp unexpectedly large delta;
- bound the number of transitions per call.

The app lifecycle must reset time measurement after hidden/inactive periods.

Offline progress, if introduced later, must reuse deterministic production rules rather than copy economy formulas.

## 7. Zustand rules

Store actions should:

1. read typed config;
2. call domain helpers;
3. commit one coherent update;
4. request persistence only when appropriate.

Do not call React hooks from store actions.

Components should select only the state they need rather than subscribing to the entire store.

## 8. Initial state

Always create fresh state through a factory.

```ts
createInitialGameData()
```

Never reuse one mutable exported object for load fallback or reset.

## 9. Persistence boundary

The save layer should expose:

- storage key;
- schema version;
- persisted types;
- selection of serializable data;
- serialization;
- safe parsing;
- validation/sanitization;
- migrations;
- storage adapter functions.

Never spread raw parsed JSON directly into live state.

Bad:

```ts
set(JSON.parse(raw));
```

Preferred flow:

```ts
const parsed = parseSave(raw);
const migrated = migrateSave(parsed);
const safeData = sanitizeSave(migrated, createInitialGameData());
set(safeData);
```

Changing persisted structure requires:
- a schema decision;
- migration or explicit incompatibility decision;
- updated specification;
- regression tests for old saves.

## 10. Derived state

Do not persist values that can be calculated:
- progress percentage;
- formatted currency;
- current stock value;
- button text;
- localized status text.

## 11. Platform integration boundary

Yandex Games or another platform integration should live behind a narrow adapter.

Desired direction:

```text
game/store
   ↓
save / ads / player service interfaces
   ↓
browser-local adapter OR Yandex adapter
```

The game should remain runnable locally outside the platform.

Platform SDK objects must not leak into domain types.

## 12. Refactoring rule

Do not refactor merely because a different style is possible.

Refactor when:
- required for the requested feature;
- repeated behavior has become error-prone;
- a module violates a documented boundary;
- the current structure blocks testing or correctness.

Keep refactors scoped and preserve behavior.
