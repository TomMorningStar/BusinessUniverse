import { BUILDINGS, BUILDING_IDS } from './buildings';
import { MAX_TICK_MS } from './constants';
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
      building: {
        ...building,
        progressMs: 0,
        isCycleActive: false,
        status: blockReason.type === 'missing_input' ? 'waiting_for_inputs' : 'output_blocked',
      },
    };
  }

  if (config.inputs.length === 0) {
    return {
      gameData,
      building: { ...building, progressMs: 0, isCycleActive: true, status: 'running' },
    };
  }

  const removalResult = removeResources(gameData.warehouse, scaleAmounts(config.inputs, count));

  if (!removalResult.ok) {
    return {
      gameData,
      building: { ...building, progressMs: 0, isCycleActive: false, status: 'waiting_for_inputs' },
    };
  }

  return {
    gameData: { ...gameData, warehouse: removalResult.warehouse },
    building: { ...building, progressMs: 0, isCycleActive: true, status: 'running' },
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
  if (!building.isCycleActive) {
    return { ...startCycle(gameData, building, config), event: null };
  }

  const progressMs = building.progressMs + safeDeltaMs;

  if (progressMs < config.cycleDurationMs) {
    return { gameData, building: { ...building, progressMs, status: 'running' }, event: null };
  }

  const deliveryResult = deliverOutputs(gameData, config, building.ownedCount);

  if (!deliveryResult.ok) {
    return {
      gameData,
      building: {
        ...building,
        progressMs: config.cycleDurationMs,
        isCycleActive: true,
        status: 'output_blocked',
      },
      event: null,
    };
  }

  return {
    ...startCycle(
      deliveryResult.gameData,
      { ...building, progressMs: 0, isCycleActive: false, status: 'idle' },
      config,
    ),
    event: {
      buildingId: building.id,
      storedOutputs: deliveryResult.storedOutputs,
      autoSoldOutputs: deliveryResult.autoSoldOutputs,
    },
  };
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
  const events: ProductionEvent[] = [];
  const ownedBuildings: GameData['ownedBuildings'] = { ...gameData.ownedBuildings };

  for (const buildingId of ownedBuildingIds) {
    const building = ownedBuildings[buildingId];

    if (!building || building.ownedCount < 1) {
      continue;
    }

    const result = advanceBuilding(nextGameData, building, BUILDINGS[buildingId], safeDeltaMs);

    nextGameData = result.gameData;
    ownedBuildings[buildingId] = result.building;

    if (result.event) {
      events.push(result.event);
    }
  }

  return { gameData: { ...nextGameData, ownedBuildings }, events };
}
