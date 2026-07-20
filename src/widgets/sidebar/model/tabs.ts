export type AppTab =
  'warehouse' | 'raw_material' | 'construction' | 'factory' | 'housing' | 'settings';

export type SidebarTab = {
  id: AppTab;
  emoji: string;
};

/** Labels come from the `tabs.*` i18n keys — the id doubles as the key segment. */
export const SIDEBAR_TABS: readonly SidebarTab[] = [
  { id: 'warehouse', emoji: '📦' },
  { id: 'raw_material', emoji: '🌾' },
  { id: 'construction', emoji: '🧱' },
  { id: 'factory', emoji: '🏭' },
  { id: 'housing', emoji: '🏠' },
  { id: 'settings', emoji: '⚙️' },
];
