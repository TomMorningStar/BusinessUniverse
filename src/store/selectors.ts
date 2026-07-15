import { RESOURCE_IDS } from '../domain/resources';
import type { BuildingId, GameState, ResourceId } from '../domain/types';

export const selectMoney = (state: GameState) => state.money;

export const selectWarehouse = (state: GameState) => state.warehouse;

export const selectAutoSell = (state: GameState) => state.autoSell;

export const selectResourceSlot = (resourceId: ResourceId) => (state: GameState) =>
  state.warehouse[resourceId];

/** Resource ids with a non-empty warehouse slot; pair with `useShallow` so the
 * subscriber only re-renders when the membership actually changes. */
export const selectStoredResourceIds = (state: GameState) =>
  RESOURCE_IDS.filter((resourceId) => state.warehouse[resourceId].amount > 0);

/* Building fields are selected as primitives (not the whole OwnedBuilding):
 * `progressMs` changes every game tick, so an object subscription would
 * re-render the card at frame rate while nothing visible changes. */

export const selectBuildingOwnedCount = (buildingId: BuildingId) => (state: GameState) =>
  state.ownedBuildings[buildingId]?.ownedCount ?? 0;

export const selectBuildingStatus = (buildingId: BuildingId) => (state: GameState) =>
  state.ownedBuildings[buildingId]?.status ?? null;
