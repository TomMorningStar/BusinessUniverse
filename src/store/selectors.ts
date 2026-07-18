import { RESOURCE_IDS } from '../domain/resources';
import type { BuildingId, GameState, ResourceId } from '../domain/types';

export const selectMoney = (state: GameState) => state.money;

export const selectWarehouse = (state: GameState) => state.warehouse;

export const selectAutoSell = (state: GameState) => state.autoSell;

export const selectResourceSlot = (resourceId: ResourceId) => (state: GameState) =>
  state.warehouse[resourceId];

/** Warehouse slots for a fixed set of resources (a recipe's inputs/outputs).
 * Pair with `useShallow`: a slot reference changes only when that resource's
 * amount changes, so the subscriber re-renders only for its own resources — not
 * on every unrelated warehouse update. */
export const selectResourceSlots = (resourceIds: readonly ResourceId[]) => (state: GameState) =>
  resourceIds.map((resourceId) => state.warehouse[resourceId]);

/** Auto-sell flags for a fixed set of resources (a building's outputs). Pair with
 * `useShallow` so a toggle only re-renders the cards whose outputs it affects. */
export const selectAutoSellFlags = (resourceIds: readonly ResourceId[]) => (state: GameState) =>
  resourceIds.map((resourceId) => state.autoSell[resourceId]);

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

/** Owned counts for a fixed set of buildings (population capacity/workforce only
 * cares about counts, not progress/status). Pair with `useShallow` so population
 * summaries re-render on purchases, not on every production tick's progress churn. */
export const selectBuildingOwnedCounts =
  (buildingIds: readonly BuildingId[]) => (state: GameState) =>
    buildingIds.map((buildingId) => state.ownedBuildings[buildingId]?.ownedCount ?? 0);
