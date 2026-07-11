import type { BuildingConfig, BuildingId } from './types';

export const BUILDINGS = {
  potato_farm: {
    id: 'potato_farm',
    name: 'Картофельная ферма',
    emoji: '🥔',
    category: 'raw_material',
    purchaseCost: 100,
    cycleDurationMs: 5_000,
    inputs: [],
    outputs: [{ resourceId: 'potato', amount: 5 }],
  },
  chips_factory: {
    id: 'chips_factory',
    name: 'Завод чипсов',
    emoji: '🏭',
    category: 'factory',
    purchaseCost: 500,
    cycleDurationMs: 7_000,
    inputs: [{ resourceId: 'potato', amount: 10 }],
    outputs: [{ resourceId: 'chips', amount: 2 }],
  },
} as const satisfies Record<BuildingId, BuildingConfig>;

export const BUILDING_IDS = Object.keys(BUILDINGS) as BuildingId[];
