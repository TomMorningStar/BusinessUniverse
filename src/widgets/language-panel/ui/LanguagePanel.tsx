import { useTranslation } from 'react-i18next';
import { LOCALE_CONFIGS, getCurrentLocale, setAppLanguage } from '../../../shared/i18n';
import { FlagIcon } from '../../../shared/ui/icons/flags/FlagIcon';
import './LanguagePanel.css';

type LanguagePanelProps = {
  /** Returns to the settings menu; the panel renders inside the settings tab. */
  onBack: () => void;
};

/**
 * Language selection rendered inside `app__main` (a settings sub-view, not a
 * separate page). Picking a card switches the interface immediately, persists
 * the choice and keeps the user on the list.
 */
export function LanguagePanel({ onBack }: LanguagePanelProps) {
  const { t } = useTranslation();
  const currentLocale = getCurrentLocale();

  return (
    <section className="language-panel" aria-label={t('language.title')}>
      <div className="language-panel__header">
        <button
          type="button"
          className="language-panel__back glass-btn"
          onClick={onBack}
          aria-label={t('nav.back')}
        >
          ← {t('nav.back')}
        </button>
        <p className="language-panel__description">{t('language.description')}</p>
      </div>

      <div className="language-panel__grid" role="radiogroup" aria-label={t('language.groupAria')}>
        {LOCALE_CONFIGS.map((config) => {
          const isSelected = config.locale === currentLocale;

          return (
            <button
              key={config.locale}
              type="button"
              role="radio"
              aria-checked={isSelected}
              lang={config.locale}
              className={`language-panel__card glass${isSelected ? ' language-panel__card--selected' : ''}`}
              onClick={() => setAppLanguage(config.locale)}
            >
              <FlagIcon flag={config.flag} className="language-panel__flag" />
              <span className="language-panel__name">{config.nativeName}</span>
              <span className="language-panel__check" aria-hidden="true">
                {isSelected ? '✓' : ''}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
