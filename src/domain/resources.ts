import type { ResourceConfig, ResourceId } from './types';

export const RESOURCES = {
  potato: {
    id: 'potato',
    name: 'Картошка',
    emoji: '🥔',
    sellPrice: 5,
    initialCapacity: 100,
  },
  chips: {
    id: 'chips',
    name: 'Чипсы',
    emoji: '🍟',
    sellPrice: 40,
    initialCapacity: 50,
  },
  orange: {
    id: 'orange',
    name: 'Апельсины',
    emoji: '🍊',
    sellPrice: 12,
    initialCapacity: 120,
  },
  orange_juice: {
    id: 'orange_juice',
    name: 'Апельсиновый сок',
    emoji: '🧃',
    sellPrice: 95,
    initialCapacity: 60,
  },
} as const satisfies Record<ResourceId, ResourceConfig>;

export const RESOURCE_IDS = Object.keys(RESOURCES) as ResourceId[];
