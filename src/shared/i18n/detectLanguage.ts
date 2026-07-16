import {
  FALLBACK_LOCALE,
  LANGUAGE_STORAGE_KEY,
  isSupportedLocale,
  type SupportedLocale,
} from './locales';

/**
 * Maps a raw BCP 47 tag to a supported locale: `ru-RU → ru`, `en-GB → en`,
 * `pt-PT / pt → pt-BR`, and so on. Returns null for unsupported languages.
 */
export function normalizeLocale(raw: string): SupportedLocale | null {
  const lower = raw.trim().toLowerCase();

  if (!lower) {
    return null;
  }

  // Every Portuguese variant collapses to the single shipped dialect.
  if (lower === 'pt' || lower.startsWith('pt-')) {
    return 'pt-BR';
  }

  const base = lower.split('-')[0];
  return isSupportedLocale(base) ? base : null;
}

export function readStoredLocale(): SupportedLocale | null {
  try {
    const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return raw !== null && isSupportedLocale(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function persistLocale(locale: SupportedLocale): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    // Storage can be unavailable (private mode, quota); the choice just won't survive reload.
  }
}

/**
 * Start-up language resolution, in priority order:
 * 1. the locale the user picked manually earlier (own storage key);
 * 2. the platform language — when a Yandex Games adapter exists it passes the
 *    SDK's language here; no SDK global is ever read from React code;
 * 3. `navigator.languages`;
 * 4. `navigator.language`;
 * 5. English as the final fallback.
 */
export function detectLanguage(platformLanguage?: string | null): SupportedLocale {
  const stored = readStoredLocale();

  if (stored) {
    return stored;
  }

  const candidates: string[] = [];

  if (platformLanguage) {
    candidates.push(platformLanguage);
  }

  if (typeof navigator !== 'undefined') {
    candidates.push(...(navigator.languages ?? []));

    if (navigator.language) {
      candidates.push(navigator.language);
    }
  }

  for (const candidate of candidates) {
    const normalized = normalizeLocale(candidate);

    if (normalized) {
      return normalized;
    }
  }

  return FALLBACK_LOCALE;
}
