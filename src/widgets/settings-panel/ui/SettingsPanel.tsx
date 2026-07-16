import { ResetProgressButton } from '../../../features/reset-progress';
import './SettingsPanel.css';

/**
 * Settings tab content. «Профиль», «Лидеры» and «Сменить язык» are placeholders
 * for upcoming platform features — they render but have no action wired yet.
 */
export function SettingsPanel() {
  return (
    <section className="settings-panel" aria-label="Настройки">
      <button type="button" className="settings-panel__button glass-btn">
        Профиль
      </button>
      <button type="button" className="settings-panel__button glass-btn">
        Лидеры
      </button>
      <button type="button" className="settings-panel__button glass-btn">
        Сменить язык
      </button>
      <ResetProgressButton />
    </section>
  );
}
