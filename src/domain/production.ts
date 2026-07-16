import { BUILDINGS, BUILDING_IDS } from './buildings';
import { MAX_CYCLES_PER_TICK, MAX_TICK_MS } from './constants';
import { getSaleIncome } from './economy';
import type {
  BuildingConfig,
  GameData,
  OwnedBuilding,
  ProductionBlockReason,
  ProductionEvent,
  ResourceAmount,
} from './types';
import { addResources, canStoreOutputs, getFreeCapacity, removeResources } from './warehouse';

export function getSafeDeltaMs(rawDeltaMs: number): number {
  if (!Number.isFinite(rawDeltaMs)) {
    return 0;
  }

  return Math.min(Math.max(rawDeltaMs, 0), MAX_TICK_MS);
}

export type ProductionInputs = Pick<GameData, 'warehouse' | 'autoSell'>;

/** A recipe amount scaled by how many copies of the building are running. */
function scaleAmounts(amounts: readonly ResourceAmount[], count: number): ResourceAmount[] {
  return amounts.map((amount) => ({
    resourceId: amount.resourceId,
    amount: amount.amount * count,
  }));
}

/** Sums a batch of outputs into an accumulator keyed by resource, so several
 * cycles completed in one tick surface as a single per-resource total. */
function mergeAmounts(
  accumulator: ResourceAmount[],
  additions: readonly ResourceAmount[],
): ResourceAmount[] {
  for (const addition of additions) {
    const existing = accumulator.find((entry) => entry.resourceId === addition.resourceId);

    if (existing) {
      existing.amount += addition.amount;
    } else {
      accumulator.push({ resourceId: addition.resourceId, amount: addition.amount });
    }
  }

  return accumulator;
}

export function getStartBlockReason(
  gameData: ProductionInputs,
  config: BuildingConfig,
  count = 1,
): ProductionBlockReason | null {
  for (const input of config.inputs) {
    const required = input.amount * count;
    const available = gameData.warehouse[input.resourceId].amount;

    if (available < required) {
      return {
        type: 'missing_input',
        resourceId: input.resourceId,
        missingAmount: required - available,
      };
    }
  }

  for (const output of config.outputs) {
    if (gameData.autoSell[output.resourceId]) {
      continue;
    }

    const required = output.amount * count;
    const freeCapacity = getFreeCapacity(gameData.warehouse, output.resourceId);

    if (freeCapacity < required) {
      return {
        type: 'output_full',
        resourceId: output.resourceId,
        requiredSpace: required - freeCapacity,
      };
    }
  }

  return null;
}

/** Reuses the previous building object when nothing changed, so ticks that do not
 * alter state keep referential equality and downstream subscribers skip re-renders. */
function withBuildingState(
  building: OwnedBuilding,
  progressMs: number,
  isCycleActive: boolean,
  status: OwnedBuilding['status'],
): OwnedBuilding {
  if (
    building.progressMs === progressMs &&
    building.isCycleActive === isCycleActive &&
    building.status === status
  ) {
    return building;
  }

  return { ...building, progressMs, isCycleActive, status };
}

export function startCycle(
  gameData: GameData,
  building: OwnedBuilding,
  config: BuildingConfig,
): { gameData: GameData; building: OwnedBuilding } {
  const count = building.ownedCount;
  const blockReason = getStartBlockReason(gameData, config, count);

  if (blockReason) {
    return {
      gameData,
      building: withBuildingState(
        building,
        0,
        false,
        blockReason.type === 'missing_input' ? 'waiting_for_inputs' : 'output_blocked',
      ),
    };
  }

  if (config.inputs.length === 0) {
    return {
      gameData,
      building: withBuildingState(building, 0, true, 'running'),
    };
  }

  const removalResult = removeResources(gameData.warehouse, scaleAmounts(config.inputs, count));

  if (!removalResult.ok) {
    return {
      gameData,
      building: withBuildingState(building, 0, false, 'waiting_for_inputs'),
    };
  }

  return {
    gameData: { ...gameData, warehouse: removalResult.warehouse },
    building: withBuildingState(building, 0, true, 'running'),
  };
}

function deliverOutputs(
  gameData: GameData,
  config: BuildingConfig,
  count: number,
):
  | {
      ok: true;
      gameData: GameData;
      storedOutputs: readonly ResourceAmount[];
      autoSoldOutputs: readonly ResourceAmount[];
    }
  | { ok: false } {
  const scaledOutputs = scaleAmounts(config.outputs, count);
  const storedOutputConfigs = scaledOutputs.filter(
    (output) => !gameData.autoSell[output.resourceId],
  );

  if (!canStoreOutputs(gameData.warehouse, storedOutputConfigs, gameData.autoSell)) {
    return { ok: false };
  }

  let warehouse = gameData.warehouse;
  let money = gameData.money;
  const storedOutputs: ResourceAmount[] = [];
  const autoSoldOutputs: ResourceAmount[] = [];

  for (const output of scaledOutputs) {
    if (gameData.autoSell[output.resourceId]) {
      money += getSaleIncome(output.resourceId, output.amount);
      autoSoldOutputs.push(output);
      continue;
    }

    const addResult = addResources(warehouse, [output]);

    if (!addResult.ok) {
      return { ok: false };
    }

    warehouse = addResult.warehouse;
    storedOutputs.push(output);
  }

  return { ok: true, gameData: { ...gameData, warehouse, money }, storedOutputs, autoSoldOutputs };
}

export function advanceBuilding(
  gameData: GameData,
  building: OwnedBuilding,
  config: BuildingConfig,
  safeDeltaMs: number,
): { gameData: GameData; building: OwnedBuilding; event: ProductionEvent | null } {
  let currentData = gameData;
  let current = building;
  let remainingMs = safeDeltaMs;
  let completedCycles = 0;
  const storedOutputs: ResourceAmount[] = [];
  const autoSoldOutputs: ResourceAmount[] = [];

  // Advance as much of the elapsed time as fits, starting/completing whole cycles
  // in sequence so leftover time carries into the next cycle instead of being
  // dropped. This keeps production frame-rate-independent: the same real time
  // yields the same result whether it arrives as one big delta or many small ones.
  while (remainingMs > 0 && completedCycles < MAX_CYCLES_PER_TICK) {
    if (!current.isCycleActive) {
      const startResult = startCycle(currentData, current, config);
      currentData = startResult.gameData;
      current = startResult.building;

      // Still not running ⇒ blocked on inputs or output space; no time can pass.
      if (!current.isCycleActive) {
        break;
      }
    }

    const remainingInCycle = config.cycleDurationMs - current.progressMs;

    if (remainingInCycle > remainingMs) {
      current = withBuildingState(current, current.progressMs + remainingMs, true, 'running');
      break;
    }

    const deliveryResult = deliverOutputs(currentData, config, current.ownedCount);

    if (!deliveryResult.ok) {
      // Output cannot be stored: hold at full progress until space frees up.
      current = withBuildingState(current, config.cycleDurationMs, true, 'output_blocked');
      break;
    }

    currentData = deliveryResult.gameData;
    remainingMs -= remainingInCycle;
    completedCycles += 1;
    mergeAmounts(storedOutputs, deliveryResult.storedOutputs);
    mergeAmounts(autoSoldOutputs, deliveryResult.autoSoldOutputs);

    // Reset for the next cycle; the loop re-enters startCycle with the leftover time.
    current = { ...current, progressMs: 0, isCycleActive: false, status: 'idle' };
  }

  const event =
    completedCycles > 0 ? { buildingId: building.id, storedOutputs, autoSoldOutputs } : null;

  return { gameData: currentData, building: current, event };
}

export function advanceAllBuildings(
  gameData: GameData,
  rawDeltaMs: number,
): { gameData: GameData; events: readonly ProductionEvent[] } {
  const safeDeltaMs = getSafeDeltaMs(rawDeltaMs);
  const ownedBuildingIds = BUILDING_IDS.filter((buildingId) => gameData.ownedBuildings[buildingId]);

  if (safeDeltaMs === 0 || ownedBuildingIds.length === 0) {
    return { gameData, events: [] };
  }

  let nextGameData = gameData;
  let anyBuildingChanged = false;
  const events: ProductionEvent[] = [];
  const ownedBuildings: GameData['ownedBuildings'] = { ...gameData.ownedBuildings };

  for (const buildingId of ownedBuildingIds) {
    const building = ownedBuildings[buildingId];

    if (!building || building.ownedCount < 1) {
      continue;
    }

    const result = advanceBuilding(nextGameData, building, BUILDINGS[buildingId], safeDeltaMs);

    nextGameData = result.gameData;

    if (result.building !== building) {
      ownedBuildings[buildingId] = result.building;
      anyBuildingChanged = true;
    }

    if (result.event) {
      events.push(result.event);
    }
  }

  // A fully stalled tick (every building waiting/blocked, nothing consumed or
  // produced) returns the original object so the store can skip the update.
  if (!anyBuildingChanged && nextGameData === gameData) {
    return { gameData, events };
  }

  return { gameData: { ...nextGameData, ownedBuildings }, events };
}
