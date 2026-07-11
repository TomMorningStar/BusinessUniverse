import { RESOURCES } from '../domain/resources';
import type { ResourceAmount } from '../domain/types';

export function formatResourceAmountsText(amounts: readonly ResourceAmount[]): string {
  return amounts
    .map((resourceAmount) => {
      const resourceConfig = RESOURCES[resourceAmount.resourceId];
      return `${resourceAmount.amount} ${resourceConfig.emoji} ${resourceConfig.name}`;
    })
    .join(', ');
}
