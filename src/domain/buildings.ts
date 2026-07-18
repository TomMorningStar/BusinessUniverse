import type { BuildingConfig, BuildingId } from './types';

export const BUILDINGS = {
  potato_farm: {
    id: 'potato_farm',
    emoji: '🥔',
    category: 'raw_material',
    constructionCost: { money: 100, resources: [] },
    costGrowthRate: 1.07,
    cycleDurationMs: 5_000,
    inputs: [],
    outputs: [{ resourceId: 'potato', amount: 5 }],
    workforce: { populationClassId: 'settler', required: 1 },
  },
  chips_factory: {
    id: 'chips_factory',
    emoji: '🏭',
    category: 'factory',
    constructionCost: {
      money: 500,
      resources: [
        { resourceId: 'planks', amount: 15 },
        { resourceId: 'stone', amount: 10 },
      ],
    },
    costGrowthRate: 1.07,
    cycleDurationMs: 7_000,
    inputs: [{ resourceId: 'potato', amount: 10 }],
    outputs: [{ resourceId: 'chips', amount: 2 }],
    workforce: { populationClassId: 'artisan', required: 2 },
  },
  wheat_field: {
    id: 'wheat_field',
    emoji: '🌾',
    category: 'raw_material',
    constructionCost: {
      money: 300,
      resources: [{ resourceId: 'wood', amount: 15 }],
    },
    costGrowthRate: 1.07,
    cycleDurationMs: 6_000,
    inputs: [],
    outputs: [{ resourceId: 'wheat', amount: 6 }],
    workforce: { populationClassId: 'settler', required: 1 },
  },
  orange_grove: {
    id: 'orange_grove',
    emoji: '🍊',
    category: 'raw_material',
    constructionCost: {
      money: 700,
      resources: [
        { resourceId: 'wood', amount: 20 },
        { resourceId: 'stone', amount: 10 },
      ],
    },
    costGrowthRate: 1.07,
    cycleDurationMs: 8_000,
    inputs: [],
    outputs: [{ resourceId: 'orange', amount: 8 }],
    workforce: { populationClassId: 'settler', required: 2 },
  },
  lumberjack: {
    id: 'lumberjack',
    emoji: '🪵',
    category: 'raw_material',
    constructionCost: { money: 150, resources: [] },
    costGrowthRate: 1.07,
    cycleDurationMs: 5_000,
    inputs: [],
    outputs: [{ resourceId: 'wood', amount: 6 }],
    workforce: { populationClassId: 'settler', required: 1 },
  },
  quarry: {
    id: 'quarry',
    emoji: '🪨',
    category: 'raw_material',
    constructionCost: { money: 250, resources: [] },
    costGrowthRate: 1.07,
    cycleDurationMs: 6_000,
    inputs: [],
    outputs: [{ resourceId: 'stone', amount: 4 }],
    workforce: { populationClassId: 'settler', required: 1 },
  },
  sawmill: {
    id: 'sawmill',
    emoji: '🪚',
    category: 'factory',
    constructionCost: {
      money: 350,
      resources: [{ resourceId: 'wood', amount: 20 }],
    },
    costGrowthRate: 1.07,
    cycleDurationMs: 6_000,
    inputs: [{ resourceId: 'wood', amount: 8 }],
    outputs: [{ resourceId: 'planks', amount: 3 }],
    workforce: { populationClassId: 'artisan', required: 1 },
  },
  settler_house: {
    id: 'settler_house',
    emoji: '🏠',
    category: 'housing',
    // Money-only and cheap on purpose: every other building now needs a settler to
    // run, including the earliest bootstrap buildings, so this has to be reachable
    // before anything else, with no resource of its own to depend on circularly.
    constructionCost: { money: 60, resources: [] },
    costGrowthRate: 1.07,
    cycleDurationMs: 0,
    inputs: [],
    outputs: [],
    housing: { populationClassId: 'settler', capacity: 4 },
  },
  artisan_house: {
    id: 'artisan_house',
    emoji: '🏘️',
    category: 'housing',
    constructionCost: {
      money: 600,
      resources: [
        { resourceId: 'planks', amount: 15 },
        { resourceId: 'stone', amount: 10 },
      ],
    },
    costGrowthRate: 1.07,
    cycleDurationMs: 0,
    inputs: [],
    outputs: [],
    housing: { populationClassId: 'artisan', capacity: 3 },
  },
} as const satisfies Record<BuildingId, BuildingConfig>;

export const BUILDING_IDS = Object.keys(BUILDINGS) as BuildingId[];
