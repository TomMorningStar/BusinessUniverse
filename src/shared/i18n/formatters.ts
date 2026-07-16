import i18n from './config';

/**
 * Locale-aware number/percent/money formatting for the whole app. Formatter
 * instances are cached per locale — building an `Intl.NumberFormat` is far more
 * expensive than calling `format`, and cards format values on every re-render.
 */

const formatterCache = new Map<string, Intl.NumberFormat>();

function getNumberFormat(locale: string, style: 'decimal' | 'percent'): Intl.NumberFormat {
  const cacheKey = `${locale}:${style}`;
  let formatter = formatterCache.get(cacheKey);

  if (!formatter) {
    formatter = new Intl.NumberFormat(
      locale,
      style === 'percent'
        ? { style: 'percent', maximumFractionDigits: 0 }
        : { maximumFractionDigits: 0 },
    );
    formatterCache.set(cacheKey, formatter);
  }

  return formatter;
}

export function formatNumber(value: number, locale: string = i18n.language): string {
  return getNumberFormat(locale, 'decimal').format(value);
}

/** `0.75 → "75%"` with the locale's own percent notation. */
export function formatPercent(ratio: number, locale: string = i18n.language): string {
  return getNumberFormat(locale, 'percent').format(ratio);
}

/** ₽ is the fixed in-game currency in every language; only the number is localized. */
export function formatMoney(amount: number, locale: string = i18n.language): string {
  return `${formatNumber(amount, locale)} ₽`;
}
