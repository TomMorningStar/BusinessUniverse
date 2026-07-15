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
  orange_grove: {
    id: 'orange_grove',
    name: 'Апельсиновая роща',
    emoji: '🍊',
    category: 'raw_material',
    purchaseCost: 1_200,
    cycleDurationMs: 8_000,
    inputs: [],
    outputs: [{ resourceId: 'orange', amount: 8 }],
  },
  juice_factory: {
    id: 'juice_factory',
    name: 'Соковый завод',
    emoji: '🧃',
    category: 'factory',
    purchaseCost: 4_500,
    cycleDurationMs: 10_000,
    inputs: [{ resourceId: 'orange', amount: 12 }],
    outputs: [{ resourceId: 'orange_juice', amount: 3 }],
  },
} as const satisfies Record<BuildingId, BuildingConfig>;

export const BUILDING_IDS = Object.keys(BUILDINGS) as BuildingId[];
