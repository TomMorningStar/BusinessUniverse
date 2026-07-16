export type AppTab = 'warehouse' | 'raw_material' | 'factory' | 'settings';

export type SidebarTab = {
  id: AppTab;
  emoji: string;
};

/** Labels come from the `tabs.*` i18n keys — the id doubles as the key segment. */
export const SIDEBAR_TABS: readonly SidebarTab[] = [
  { id: 'warehouse', emoji: '📦' },
  { id: 'raw_material', emoji: '🌾' },
  { id: 'factory', emoji: '🏭' },
  { id: 'settings', emoji: '⚙️' },
];
