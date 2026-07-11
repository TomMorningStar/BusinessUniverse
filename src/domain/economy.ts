import { RESOURCES } from './resources';
import type { ResourceId } from './types';

export type PurchaseResult =
  { ok: true; money: number } | { ok: false; reason: 'invalid_cost' | 'insufficient_funds' };

export function getSaleIncome(resourceId: ResourceId, amount: number): number {
  if (!Number.isFinite(amount) || amount <= 0) {
    return 0;
  }

  return RESOURCES[resourceId].sellPrice * amount;
}

export function canAfford(money: number, cost: number): boolean {
  return Number.isFinite(money) && Number.isFinite(cost) && cost >= 0 && money >= cost;
}

export function purchase(money: number, cost: number): PurchaseResult {
  if (!Number.isFinite(cost) || cost < 0) {
    return { ok: false, reason: 'invalid_cost' };
  }

  if (!canAfford(money, cost)) {
    return { ok: false, reason: 'insufficient_funds' };
  }

  return { ok: true, money: money - cost };
}
