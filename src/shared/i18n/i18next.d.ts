import type { AppTranslation } from './translations/en';

/**
 * Types `t()` against the reference (English) dictionary: unknown keys fail the
 * build, and dynamic keys like `t(`resources.${resourceId}.name`)` stay safe
 * because the id unions match the dictionary structure.
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: AppTranslation };
  }
}
