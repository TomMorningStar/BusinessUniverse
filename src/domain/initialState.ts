import { INITIAL_MONEY } from './constants';
import { RESOURCES, RESOURCE_IDS } from './resources';
import type { GameData, ResourceId, Warehouse } from './types';

export function createInitialWarehouse(): Warehouse {
  const warehouse = {} as Warehouse;

  for (const resourceId of RESOURCE_IDS) {
    warehouse[resourceId] = {
      amount: 0,
      capacity: RESOURCES[resourceId].initialCapacity,
    };
  }

  return warehouse;
}

export function createInitialAutoSell(): Record<ResourceId, boolean> {
  const autoSell = {} as Record<ResourceId, boolean>;

  for (const resourceId of RESOURCE_IDS) {
    autoSell[resourceId] = false;
  }

  return autoSell;
}

export function createInitialGameData(): GameData {
  return {
    money: INITIAL_MONEY,
    warehouse: createInitialWarehouse(),
    ownedBuildings: {},
    autoSell: createInitialAutoSell(),
  };
}
