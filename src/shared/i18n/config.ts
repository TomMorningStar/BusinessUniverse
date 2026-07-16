import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { detectLanguage, persistLocale } from './detectLanguage';
import { FALLBACK_LOCALE, isSupportedLocale, type SupportedLocale } from './locales';
import { TRANSLATIONS } from './translations';

const resources = Object.fromEntries(
  Object.entries(TRANSLATIONS).map(([locale, translation]) => [locale, { translation }]),
);

function applyDocumentLocale(locale: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.lang = locale;
  // Every supported locale is LTR today; revisit when an RTL locale is added.
  document.documentElement.dir = 'ltr';
}

void i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: FALLBACK_LOCALE,
  interpolation: { escapeValue: false },
  returnNull: false,
  // Surfaces forgotten keys during development without polluting the production console.
  ...(import.meta.env.DEV
    ? {
        saveMissing: true,
        missingKeyHandler: (_lngs: readonly string[], _ns: string, key: string) => {
          console.warn(`[i18n] missing translation key: ${key}`);
        },
      }
    : null),
});

i18n.on('languageChanged', applyDocumentLocale);
applyDocumentLocale(i18n.language);

export function getCurrentLocale(): SupportedLocale {
  return isSupportedLocale(i18n.language) ? i18n.language : FALLBACK_LOCALE;
}

/** Manual language switch: persists the choice and updates the UI without a reload. */
export function setAppLanguage(locale: SupportedLocale): void {
  persistLocale(locale);

  if (i18n.language !== locale) {
    void i18n.changeLanguage(locale);
  }
}

export default i18n;
