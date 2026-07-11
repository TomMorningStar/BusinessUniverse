import type { BuildingId, GameState, ResourceId } from '../domain/types';

export const selectMoney = (state: GameState) => state.money;

export const selectWarehouse = (state: GameState) => state.warehouse;

export const selectResourceSlot = (resourceId: ResourceId) => (state: GameState) =>
  state.warehouse[resourceId];

export const selectAutoSell = (resourceId: ResourceId) => (state: GameState) =>
  state.autoSell[resourceId];

export const selectOwnedBuilding = (buildingId: BuildingId) => (state: GameState) =>
  state.ownedBuildings[buildingId];

export const selectIsBuildingOwned = (buildingId: BuildingId) => (state: GameState) =>
  Boolean(state.ownedBuildings[buildingId]);
