import type { ResourceAmount, ResourceId, Warehouse } from './types';

export type WarehouseOperationResult =
  | { ok: true; warehouse: Warehouse }
  | { ok: false; reason: 'invalid_amount' | 'insufficient_capacity' | 'insufficient_stock' };

function isValidAmount(amount: number): boolean {
  return Number.isFinite(amount) && Number.isInteger(amount) && amount > 0;
}

export function getFreeCapacity(warehouse: Warehouse, resourceId: ResourceId): number {
  const slot = warehouse[resourceId];
  return Math.max(slot.capacity - slot.amount, 0);
}

export function hasResources(
  warehouse: Warehouse,
  requirements: readonly ResourceAmount[],
): boolean {
  return requirements.every(
    (requirement) =>
      isValidAmount(requirement.amount) &&
      warehouse[requirement.resourceId].amount >= requirement.amount,
  );
}

export function canStoreOutputs(
  warehouse: Warehouse,
  outputs: readonly ResourceAmount[],
  autoSell: Record<ResourceId, boolean>,
): boolean {
  return outputs.every((output) => {
    if (autoSell[output.resourceId]) {
      return true;
    }
    return (
      isValidAmount(output.amount) && getFreeCapacity(warehouse, output.resourceId) >= output.amount
    );
  });
}

export function addResources(
  warehouse: Warehouse,
  resources: readonly ResourceAmount[],
): WarehouseOperationResult {
  const draft: Warehouse = { ...warehouse };

  for (const resource of resources) {
    if (!isValidAmount(resource.amount)) {
      return { ok: false, reason: 'invalid_amount' };
    }

    const slot = draft[resource.resourceId];
    const freeCapacity = slot.capacity - slot.amount;

    if (freeCapacity < resource.amount) {
      return { ok: false, reason: 'insufficient_capacity' };
    }

    draft[resource.resourceId] = { ...slot, amount: slot.amount + resource.amount };
  }

  return { ok: true, warehouse: draft };
}

export function removeResources(
  warehouse: Warehouse,
  resources: readonly ResourceAmount[],
): WarehouseOperationResult {
  const draft: Warehouse = { ...warehouse };

  for (const resource of resources) {
    if (!isValidAmount(resource.amount)) {
      return { ok: false, reason: 'invalid_amount' };
    }

    const slot = draft[resource.resourceId];

    if (slot.amount < resource.amount) {
      return { ok: false, reason: 'insufficient_stock' };
    }

    draft[resource.resourceId] = { ...slot, amount: slot.amount - resource.amount };
  }

  return { ok: true, warehouse: draft };
}
