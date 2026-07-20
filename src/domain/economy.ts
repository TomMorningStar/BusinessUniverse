import { RESOURCES } from './resources';
import type { BuildingConfig, ResourceAmount, ResourceId, Warehouse } from './types';

export function getSaleIncome(resourceId: ResourceId, amount: number): number {
  if (!Number.isFinite(amount) || amount <= 0) {
    return 0;
  }

  return RESOURCES[resourceId].sellPrice * amount;
}

export type BuildUnitCost = { money: number; resources: readonly ResourceAmount[] };

/**
 * Cost of the next single copy of a building, given how many are already owned.
 * Both the money price and every resource amount grow geometrically with
 * `ownedCount` (`costGrowthRate` per copy) so mass-buying one building forever has
 * diminishing returns instead of staying the best move at every stage of the game
 * — this is the only place that computes a unit cost; everything else sums this
 * over a range of copies.
 */
export function getBuildingUnitCost(config: BuildingConfig, ownedCount: number): BuildUnitCost {
  const scale = config.costGrowthRate ** ownedCount;

  return {
    money: Math.round(config.constructionCost.money * scale),
    resources: config.constructionCost.resources.map((resource) => ({
      resourceId: resource.resourceId,
      amount: Math.round(resource.amount * scale),
    })),
  };
}

/** Merges a resource amount list into a running per-resource total map. */
function addToResourceTotals(
  totals: Map<ResourceId, number>,
  resources: readonly ResourceAmount[],
): void {
  for (const resource of resources) {
    totals.set(resource.resourceId, (totals.get(resource.resourceId) ?? 0) + resource.amount);
  }
}

function resourceTotalsToList(totals: Map<ResourceId, number>): ResourceAmount[] {
  return [...totals.entries()].map(([resourceId, amount]) => ({ resourceId, amount }));
}

export type BuildTotalCost = { money: number; resources: readonly ResourceAmount[] };

/**
 * Total price of buying `quantity` copies starting from `ownedCount`, summed as a
 * sequence of individual purchases so the per-copy price growth compounds
 * correctly for money and for every resource.
 */
export function getBuildTotalCost(
  config: BuildingConfig,
  ownedCount: number,
  quantity: number,
): BuildTotalCost {
  let money = 0;
  const resourceTotals = new Map<ResourceId, number>();

  for (let i = 0; i < quantity; i += 1) {
    const unit = getBuildingUnitCost(config, ownedCount + i);
    money += unit.money;
    addToResourceTotals(resourceTotals, unit.resources);
  }

  return { money, resources: resourceTotalsToList(resourceTotals) };
}

export type BuildPlan = { count: number; totalCost: BuildTotalCost };

/**
 * How many of the requested `quantity` copies the player can actually afford —
 * checking money and every required resource together — and the summed cost of
 * exactly those copies. Stops as soon as the next copy would exceed money or any
 * single resource currently in the warehouse, so a request for ×100 with enough
 * stone for only 37 yields `{ count: 37 }`.
 */
export function planBuild(
  money: number,
  warehouse: Warehouse,
  config: BuildingConfig,
  ownedCount: number,
  quantity: number,
): BuildPlan {
  if (!Number.isFinite(money) || quantity <= 0) {
    return { count: 0, totalCost: { money: 0, resources: [] } };
  }

  let totalMoney = 0;
  const resourceTotals = new Map<ResourceId, number>();
  let count = 0;

  for (let i = 0; i < quantity; i += 1) {
    const unit = getBuildingUnitCost(config, ownedCount + i);
    const nextMoney = totalMoney + unit.money;

    if (money < nextMoney) {
      break;
    }

    const fitsInStock = unit.resources.every((resource) => {
      const projected = (resourceTotals.get(resource.resourceId) ?? 0) + resource.amount;
      return projected <= warehouse[resource.resourceId].amount;
    });

    if (!fitsInStock) {
      break;
    }

    totalMoney = nextMoney;
    addToResourceTotals(resourceTotals, unit.resources);
    count += 1;
  }

  return {
    count,
    totalCost: { money: totalMoney, resources: resourceTotalsToList(resourceTotals) },
  };
}

export type ConstructionShortfall = {
  missingMoney: number;
  missingResources: readonly ResourceAmount[];
};

/**
 * What is missing to afford the next single copy right now (money and/or any
 * resource), for the "not enough X" hint shown when even one more copy can't be
 * built. Returns `null` once the next copy is fully affordable.
 */
export function getConstructionShortfall(
  money: number,
  warehouse: Warehouse,
  config: BuildingConfig,
  ownedCount: number,
): ConstructionShortfall | null {
  const unit = getBuildingUnitCost(config, ownedCount);
  const missingMoney = Math.max(unit.money - money, 0);
  const missingResources = unit.resources
    .map((resource) => ({
      resourceId: resource.resourceId,
      amount: Math.max(resource.amount - warehouse[resource.resourceId].amount, 0),
    }))
    .filter((resource) => resource.amount > 0);

  if (missingMoney === 0 && missingResources.length === 0) {
    return null;
  }

  return { missingMoney, missingResources };
}
