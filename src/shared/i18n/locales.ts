/**
 * Single typed source of truth for every supported interface language.
 * Components must consume this config instead of re-declaring locale lists.
 */

export const SUPPORTED_LOCALES = ['ru', 'en', 'es', 'de', 'fr', 'pt-BR', 'tr', 'it'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const FALLBACK_LOCALE: SupportedLocale = 'en';

/** Stored separately from the game save on purpose: resetting progress keeps the language. */
export const LANGUAGE_STORAGE_KEY = 'business-universe:language';

export type FlagId = 'ru' | 'gb' | 'es' | 'de' | 'fr' | 'br' | 'tr' | 'it';

export type LocaleConfig = {
  locale: SupportedLocale;
  /** Always shown in its own language, regardless of the active interface locale. */
  nativeName: string;
  flag: FlagId;
};

export const LOCALE_CONFIGS: readonly LocaleConfig[] = [
  { locale: 'ru', nativeName: 'Русский', flag: 'ru' },
  { locale: 'en', nativeName: 'English', flag: 'gb' },
  { locale: 'es', nativeName: 'Español', flag: 'es' },
  { locale: 'de', nativeName: 'Deutsch', flag: 'de' },
  { locale: 'fr', nativeName: 'Français', flag: 'fr' },
  { locale: 'pt-BR', nativeName: 'Português (Brasil)', flag: 'br' },
  { locale: 'tr', nativeName: 'Türkçe', flag: 'tr' },
  { locale: 'it', nativeName: 'Italiano', flag: 'it' },
];

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
