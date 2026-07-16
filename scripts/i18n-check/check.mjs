/**
 * Dictionary parity check (`npm run i18n:check`).
 *
 * The English dictionary is the reference. For every other locale the script
 * recursively compares key paths (collapsing i18next plural suffixes such as
 * `_one` / `_few` / `_many` / `_other` into their base key) and fails on any
 * missing or extra key. It also requires an `_other` form wherever a key is
 * pluralized, and verifies that every supported locale has both a dictionary
 * and a display config.
 */

import { LOCALE_CONFIGS, SUPPORTED_LOCALES } from '../../src/shared/i18n/locales.ts';
import { TRANSLATIONS } from '../../src/shared/i18n/translations/index.ts';

const PLURAL_SUFFIX = /_(zero|one|two|few|many|other)$/;
const REFERENCE_LOCALE = 'en';

/** Collects `{ collapsedKeyPaths, pluralBases, pluralsWithOther }` of a dictionary. */
function collectKeys(dict, prefix = '', acc = { keys: new Set(), plural: new Map() }) {
  for (const [rawKey, value] of Object.entries(dict)) {
    const isPlural = PLURAL_SUFFIX.test(rawKey);
    const baseKey = rawKey.replace(PLURAL_SUFFIX, '');
    const path = prefix ? `${prefix}.${baseKey}` : baseKey;

    if (typeof value === 'string') {
      acc.keys.add(path);

      if (isPlural) {
        const forms = acc.plural.get(path) ?? new Set();
        forms.add(rawKey.match(PLURAL_SUFFIX)[1]);
        acc.plural.set(path, forms);
      }
    } else {
      collectKeys(value, path, acc);
    }
  }

  return acc;
}

const reference = collectKeys(TRANSLATIONS[REFERENCE_LOCALE]);
const problems = [];

for (const locale of SUPPORTED_LOCALES) {
  if (!(locale in TRANSLATIONS)) {
    problems.push(`[${locale}] has no dictionary in translations/index.ts`);
    continue;
  }

  if (!LOCALE_CONFIGS.some((config) => config.locale === locale)) {
    problems.push(`[${locale}] has no display config in LOCALE_CONFIGS`);
  }

  if (locale === REFERENCE_LOCALE) {
    continue;
  }

  const current = collectKeys(TRANSLATIONS[locale]);

  for (const key of reference.keys) {
    if (!current.keys.has(key)) {
      problems.push(`[${locale}] missing key: ${key}`);
    }
  }

  for (const key of current.keys) {
    if (!reference.keys.has(key)) {
      problems.push(`[${locale}] extra key not present in '${REFERENCE_LOCALE}': ${key}`);
    }
  }

  // Any pluralized key must include the universal `_other` form the runtime
  // falls back to when a locale-specific category is not provided.
  const pluralBases = new Set([...reference.plural.keys(), ...current.plural.keys()]);

  for (const base of pluralBases) {
    if (
      current.keys.has(base) &&
      current.plural.has(base) &&
      !current.plural.get(base).has('other')
    ) {
      problems.push(`[${locale}] plural key '${base}' has no '_other' form`);
    }
  }
}

const localeCount = SUPPORTED_LOCALES.length;
const keyCount = reference.keys.size;

if (problems.length > 0) {
  console.error(`i18n check FAILED (${problems.length} problem(s)):`);

  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }

  process.exit(1);
}

console.log(
  `i18n check OK: ${localeCount} locales, ${keyCount} keys each (reference: '${REFERENCE_LOCALE}').`,
);
