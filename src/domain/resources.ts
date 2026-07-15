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
  wheat: {
    id: 'wheat',
    name: 'Пшеница',
    emoji: '🌾',
    sellPrice: 8,
    initialCapacity: 120,
  },
  orange: {
    id: 'orange',
    name: 'Апельсины',
    emoji: '🍊',
    sellPrice: 14,
    initialCapacity: 120,
  },
} as const satisfies Record<ResourceId, ResourceConfig>;

export const RESOURCE_IDS = Object.keys(RESOURCES) as ResourceId[];
