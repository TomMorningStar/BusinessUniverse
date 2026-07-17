import { RESOURCES } from './resources';
import type { BuildingConfig, ResourceId } from './types';

export function getSaleIncome(resourceId: ResourceId, amount: number): number {
  if (!Number.isFinite(amount) || amount <= 0) {
    return 0;
  }

  return RESOURCES[resourceId].sellPrice * amount;
}

/**
 * Cost of the next single copy of a building, given how many are already owned.
 * Grows geometrically with `ownedCount` (`costGrowthRate` per copy) so mass-buying
 * one building forever has diminishing returns instead of staying the best move at
 * every stage of the game — this is the only place that computes a unit cost;
 * everything else sums this over a range of copies.
 */
export function getBuildingUnitCost(config: BuildingConfig, ownedCount: number): number {
  return Math.round(config.purchaseCost * config.costGrowthRate ** ownedCount);
}

/**
 * Total price of buying `quantity` copies starting from `ownedCount`, summed as a
 * sequence of individual purchases so the per-copy price growth compounds correctly.
 */
export function getBuildTotalCost(
  config: BuildingConfig,
  ownedCount: number,
  quantity: number,
): number {
  let total = 0;

  for (let i = 0; i < quantity; i += 1) {
    total += getBuildingUnitCost(config, ownedCount + i);
  }

  return total;
}

export type BuildPlan = { count: number; totalCost: number };

/**
 * How many of the requested `quantity` the player can actually afford, and the
 * summed cost of exactly those copies. Stops as soon as the next copy is
 * unaffordable, so a request for ×100 with money for 37 yields { count: 37 }.
 */
export function planBuild(
  money: number,
  config: BuildingConfig,
  ownedCount: number,
  quantity: number,
): BuildPlan {
  if (!Number.isFinite(money) || quantity <= 0) {
    return { count: 0, totalCost: 0 };
  }

  let totalCost = 0;
  let count = 0;

  for (let i = 0; i < quantity; i += 1) {
    const nextCost = getBuildingUnitCost(config, ownedCount + i);

    if (money - totalCost < nextCost) {
      break;
    }

    totalCost += nextCost;
    count += 1;
  }

  return { count, totalCost };
}
