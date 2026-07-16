import { useTranslation } from 'react-i18next';
import { ResetProgressButton } from '../../../features/reset-progress';
import './SettingsPanel.css';

type SettingsPanelProps = {
  /** Opens the language list, rendered by the parent in place of this menu. */
  onOpenLanguage: () => void;
};

/**
 * Settings tab content. «Profile» and «Leaderboard» are placeholders for
 * upcoming platform features — they render but have no action wired yet.
 */
export function SettingsPanel({ onOpenLanguage }: SettingsPanelProps) {
  const { t } = useTranslation();

  return (
    <section className="settings-panel" aria-label={t('tabs.settings')}>
      <button type="button" className="settings-panel__button glass-btn">
        {t('settings.profile')}
      </button>
      <button type="button" className="settings-panel__button glass-btn">
        {t('settings.leaderboard')}
      </button>
      <button type="button" className="settings-panel__button glass-btn" onClick={onOpenLanguage}>
        🌐 {t('settings.language')}
      </button>
      <ResetProgressButton />
    </section>
  );
}
