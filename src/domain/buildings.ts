import type { BuildingConfig, BuildingId } from './types';

export const BUILDINGS = {
  potato_farm: {
    id: 'potato_farm',
    emoji: '🥔',
    category: 'raw_material',
    purchaseCost: 100,
    costGrowthRate: 1.07,
    cycleDurationMs: 5_000,
    inputs: [],
    outputs: [{ resourceId: 'potato', amount: 5 }],
  },
  chips_factory: {
    id: 'chips_factory',
    emoji: '🏭',
    category: 'factory',
    purchaseCost: 500,
    costGrowthRate: 1.07,
    cycleDurationMs: 7_000,
    inputs: [{ resourceId: 'potato', amount: 10 }],
    outputs: [{ resourceId: 'chips', amount: 2 }],
  },
  wheat_field: {
    id: 'wheat_field',
    emoji: '🌾',
    category: 'raw_material',
    purchaseCost: 300,
    costGrowthRate: 1.07,
    cycleDurationMs: 6_000,
    inputs: [],
    outputs: [{ resourceId: 'wheat', amount: 6 }],
  },
  orange_grove: {
    id: 'orange_grove',
    emoji: '🍊',
    category: 'raw_material',
    purchaseCost: 700,
    costGrowthRate: 1.07,
    cycleDurationMs: 8_000,
    inputs: [],
    outputs: [{ resourceId: 'orange', amount: 8 }],
  },
} as const satisfies Record<BuildingId, BuildingConfig>;

export const BUILDING_IDS = Object.keys(BUILDINGS) as BuildingId[];
