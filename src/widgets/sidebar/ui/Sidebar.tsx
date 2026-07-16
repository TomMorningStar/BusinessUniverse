import { useTranslation } from 'react-i18next';
import { EmojiIcon } from '../../../shared/ui/EmojiIcon/EmojiIcon';
import { SIDEBAR_TABS, type AppTab } from '../model/tabs';
import './Sidebar.css';

type SidebarProps = {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
};

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { t } = useTranslation();

  return (
    <nav className="sidebar glass" aria-label={t('nav.sections')}>
      {SIDEBAR_TABS.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            className="sidebar__tab"
            aria-pressed={isActive}
            aria-label={t(`tabs.${tab.id}`)}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="sidebar__tab-icon glass-icon" aria-hidden="true">
              <EmojiIcon emoji={tab.emoji} animated />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
