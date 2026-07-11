# Business Universe — Current Game Specification

This document describes the currently supported baseline behavior. It is not a task list.

Change these rules only when the user explicitly requests a behavior or balance change.

## 1. Product concept

Business Universe is a browser idle/tycoon game based on production chains.

Current chain:

```text
money → potato farm → potatoes → chips factory → chips → more money
```

The interface uses ordinary React UI:
- cards;
- buttons;
- progress bars;
- warehouse rows;
- status messages.

## 2. Economy

### Resources

| ID | Name | Icon | Sell price per unit | Initial capacity |
|---|---|---:|---:|---:|
| `potato` | Картошка | 🥔 | 5 ₽ | 100 |
| `chips` | Чипсы | 🍟 | 40 ₽ | 50 |

### Buildings

| ID | Name | Purchase price | Cycle | Inputs | Outputs |
|---|---|---:|---:|---|---|
| `potato_farm` | Картофельная ферма | 100 ₽ | 5 s | none | 5 potatoes |
| `chips_factory` | Завод чипсов | 500 ₽ | 7 s | 10 potatoes | 2 chips |

Processing advantage:

```text
10 raw potatoes = 50 ₽
2 chips = 80 ₽
processing advantage = 30 ₽
```

## 3. Initial state

```ts
money = 100;

warehouse = {
  potato: { amount: 0, capacity: 100 },
  chips: { amount: 0, capacity: 50 },
};

ownedBuildings = {};

autoSell = {
  potato: false,
  chips: false,
};
```

The player initially owns no buildings.

## 4. Purchases

A building purchase succeeds only when:
- the building config exists;
- the building is not already owned;
- the player has enough money.

On success:
- subtract the exact purchase price;
- create fresh runtime state for the building;
- save the changed game state.

Money must remain finite and non-negative.

The current baseline supports one building of each configured type.

## 5. Manual selling

The current action is **Sell all**.

```text
income = stored amount × unit sell price
```

On success:
- add the exact income to money;
- set stored amount to zero;
- save the changed state.

Selling is disabled when the stored amount is zero.

Resources are whole non-negative units.

## 6. Auto-sell

Auto-sell is configured separately for every resource.

When a production cycle completes:
- newly produced output with auto-sell enabled is sold immediately;
- that output is not placed into the warehouse;
- warehouse capacity does not block that auto-sold output;
- exact income is added to money.

Enabling auto-sell does not sell stock that was already in the warehouse.

Previously stored stock may still be sold manually.

## 7. Warehouse invariants

For every slot:

```text
0 <= amount <= capacity
```

Rules:

1. Production must never silently discard overflow.
2. Before a cycle starts, every non-auto-sold output must fit as a complete batch.
3. When output space is unavailable before start, the building waits at 0%.
4. Once a cycle has started, consumed inputs belong to that cycle.
5. If delivery unexpectedly becomes blocked at completion, keep the completed cycle pending.
6. Do not consume inputs again while a completed result is waiting for delivery.
7. Delivery is atomic for the configured batch.

## 8. Production runtime

Documented runtime model:

```ts
type BuildingRunStatus =
  | 'idle'
  | 'running'
  | 'waiting_for_inputs'
  | 'output_blocked';

type OwnedBuilding = {
  id: BuildingId;
  progressMs: number;
  isCycleActive: boolean;
  status: BuildingRunStatus;
};
```

### Starting a cycle

A non-active owned building may start only when:
- all required inputs exist;
- every stored output has capacity for the complete batch.

On start:
1. consume all inputs atomically;
2. set `isCycleActive = true`;
3. set `progressMs = 0`;
4. set `status = 'running'`.

Missing inputs keep progress at 0 and set `waiting_for_inputs`.

Output capacity failure keeps progress at 0 and sets `output_blocked`.

### Advancing a cycle

Progress uses elapsed time, not frame count.

Invalid delta values must be rejected or normalized safely:
- negative;
- `NaN`;
- `Infinity`;
- unreasonably large values.

### Completing a cycle

At or above the configured duration:
- deliver or auto-sell every complete output batch exactly once;
- retain no silent partial result;
- subtract one cycle duration only after successful delivery;
- mark the cycle inactive;
- attempt the next cycle through the normal start rules.

A bounded number of transitions may be processed per tick.

### Completion blocked

If a stored result unexpectedly cannot fit:
- keep progress at the full duration;
- keep the cycle active;
- set `output_blocked`;
- retry delivery later;
- do not consume inputs again.

## 9. Game loop and visibility

The baseline uses elapsed-time updates, normally through `requestAnimationFrame`.

Current behavior:
- visible-page time advances production;
- hidden-page time does not count as offline progress;
- visibility restoration resets time measurement;
- returning to the tab must not create a large catch-up batch;
- production must not depend on FPS.

A future offline-progress feature requires a separate explicit specification.

## 10. Saving and loading

### Storage key

```text
business-universe-save
```

### Current schema

```ts
type PersistedGameStateV1 = {
  version: 1;
  savedAt: number;
  money: number;
  warehouse: Warehouse;
  ownedBuildings: Partial<Record<BuildingId, OwnedBuilding>>;
  autoSell: Record<ResourceId, boolean>;
};
```

Persist:
- money;
- warehouse;
- owned buildings;
- auto-sell flags;
- active-cycle status and progress;
- schema version;
- save timestamp.

Do not persist:
- functions;
- hooks;
- timers;
- DOM values;
- derived formatting;
- transient notifications.

### Save timing

Save after meaningful state changes and at a bounded periodic interval.

Do not write on every animation frame.

### Loading

Loading must:
1. parse safely;
2. validate shape and version;
3. accept only known resources and buildings;
4. sanitize invalid numeric values;
5. merge with fresh defaults;
6. preserve a valid active cycle without charging inputs again;
7. fall back safely when data is corrupted.

Unknown future schema versions must not be interpreted as version 1.

### Reset

Reset must:
- ask for confirmation in the UI;
- clear the persisted key;
- create a fresh initial state;
- preserve no previous money, stock, progress, buildings, or auto-sell flags.

## 11. UI behavior

### Header

Show:
- game title;
- formatted money;
- reset control.

### Warehouse

For each resource show:
- icon and name;
- amount and capacity;
- current stock value;
- sell-all control;
- auto-sell control.

### Buildings

Owned building cards show:
- name;
- recipe;
- duration;
- progress;
- meaningful status.

Unowned building cards show:
- cost;
- recipe;
- purchase action;
- visible disabled reason.

### Accessibility and responsive behavior

- usable from 320 px width;
- no horizontal page scroll;
- touch-friendly controls;
- semantic buttons and headings;
- progress has accessible value/text;
- status is not communicated by color alone;
- respect reduced-motion preferences.

## 12. Invariants

At all times:
- money is finite and non-negative;
- stock values are finite non-negative integers;
- capacities are positive integers;
- progress is finite and non-negative;
- an active cycle consumes inputs at most once;
- a completed cycle delivers outputs at most once;
- unknown saved entities are ignored safely;
- overflow is not silently discarded.

## 13. Baseline acceptance scenarios

### First farm

1. Start with 100 ₽.
2. Buy the farm.
3. Money becomes 0 ₽.
4. After 5 seconds, receive 5 potatoes.

### Manual sale

1. Store 5 potatoes.
2. Sell all.
3. Potato stock becomes 0.
4. Money increases by 25 ₽.

### Full potato warehouse

1. Reach 100 potatoes with auto-sell disabled.
2. The farm does not start another stored-output cycle.
3. The UI explains that output is blocked.
4. No resource disappears.

### Potato auto-sell

1. Enable potato auto-sell.
2. Finish a farm cycle.
3. New potatoes are not stored.
4. Money increases by 25 ₽.

### Factory input

1. Own the factory with fewer than 10 potatoes.
2. Factory stays at 0%.
3. Add enough potatoes.
4. Exactly 10 potatoes are consumed once at cycle start.

### Factory output

1. Complete 7 seconds of production.
2. Receive exactly 2 chips.
3. Selling them gives exactly 80 ₽.

### Refresh during production

1. Start a factory cycle.
2. Refresh before completion.
3. Progress and active state load.
4. The same 10 potatoes are not consumed again.

### Hidden tab

1. Hide the tab for a long time.
2. Return.
3. No large unplanned production batch appears.

### Corrupted save

1. Put invalid JSON or invalid values into the save key.
2. Reload.
3. The app starts safely without crashing.

### Reset

1. Accumulate state.
2. Confirm reset.
3. Return exactly to initial values.
4. Reload does not restore old state.
