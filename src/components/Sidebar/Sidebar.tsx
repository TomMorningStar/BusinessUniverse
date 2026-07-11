import { EmojiIcon } from '../EmojiIcon/EmojiIcon';
import './Sidebar.css';

export type AppTab = 'warehouse' | 'raw_material' | 'factory';

type SidebarTab = {
  id: AppTab;
  label: string;
  emoji: string;
};

const SIDEBAR_TABS: readonly SidebarTab[] = [
  { id: 'warehouse', label: 'Склад', emoji: '📦' },
  { id: 'raw_material', label: 'Сырьё', emoji: '🌾' },
  { id: 'factory', label: 'Фабрика', emoji: '🏭' },
];

type SidebarProps = {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
};

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <nav className="sidebar" aria-label="Разделы">
      {SIDEBAR_TABS.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            className="sidebar__tab"
            aria-pressed={isActive}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="sidebar__tab-icon" aria-hidden="true">
              <EmojiIcon emoji={tab.emoji} size={34} animated={isActive} />
            </span>
            <span className="sidebar__tab-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
