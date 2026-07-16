export { default as i18n, getCurrentLocale, setAppLanguage } from './config';
export { detectLanguage, normalizeLocale } from './detectLanguage';
export { formatMoney, formatNumber, formatPercent } from './formatters';
export { FALLBACK_LOCALE, LOCALE_CONFIGS, SUPPORTED_LOCALES, isSupportedLocale } from './locales';
export type { FlagId, LocaleConfig, SupportedLocale } from './locales';
