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
} as const satisfies Record<ResourceId, ResourceConfig>;

export const RESOURCE_IDS = Object.keys(RESOURCES) as ResourceId[];
