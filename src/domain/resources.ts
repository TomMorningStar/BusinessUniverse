import type { ResourceConfig, ResourceId } from './types';

export const RESOURCES = {
  potato: {
    id: 'potato',
    emoji: '🥔',
    sellPrice: 5,
    initialCapacity: 100,
    category: 'raw_material',
  },
  chips: {
    id: 'chips',
    emoji: '🍟',
    sellPrice: 40,
    initialCapacity: 50,
    category: 'factory',
  },
  wheat: {
    id: 'wheat',
    emoji: '🌾',
    sellPrice: 8,
    initialCapacity: 120,
    category: 'raw_material',
  },
  orange: {
    id: 'orange',
    emoji: '🍊',
    sellPrice: 14,
    initialCapacity: 120,
    category: 'raw_material',
  },
  wood: {
    id: 'wood',
    emoji: '🪵',
    sellPrice: 3,
    initialCapacity: 150,
    category: 'construction',
  },
  stone: {
    id: 'stone',
    emoji: '🪨',
    sellPrice: 4,
    initialCapacity: 120,
    category: 'construction',
  },
  planks: {
    id: 'planks',
    emoji: '🚧',
    sellPrice: 12,
    initialCapacity: 80,
    category: 'factory',
  },
} as const satisfies Record<ResourceId, ResourceConfig>;

export const RESOURCE_IDS = Object.keys(RESOURCES) as ResourceId[];
