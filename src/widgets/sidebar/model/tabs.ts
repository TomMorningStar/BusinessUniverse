export type AppTab = 'warehouse' | 'raw_material' | 'factory';

export type SidebarTab = {
  id: AppTab;
  label: string;
  emoji: string;
};

export const TAB_LABELS: Record<AppTab, string> = {
  warehouse: 'Склад',
  raw_material: 'Сырьё',
  factory: 'Фабрика',
};

export const SIDEBAR_TABS: readonly SidebarTab[] = [
  { id: 'warehouse', label: TAB_LABELS.warehouse, emoji: '📦' },
  { id: 'raw_material', label: TAB_LABELS.raw_material, emoji: '🌾' },
  { id: 'factory', label: TAB_LABELS.factory, emoji: '🏭' },
];
