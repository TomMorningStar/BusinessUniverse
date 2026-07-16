import type { SupportedLocale } from '../locales';
import type { TranslationDict } from '../types';
import { de } from './de';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { it } from './it';
import { ptBR } from './pt-BR';
import { ru } from './ru';
import { tr } from './tr';

export const TRANSLATIONS: Record<SupportedLocale, TranslationDict> = {
  ru,
  en,
  es,
  de,
  fr,
  'pt-BR': ptBR,
  tr,
  it,
};
