import type { ReactElement } from 'react';
import type { FlagId } from '../../../i18n/locales';
import styles from './FlagIcon.module.css';

/**
 * Local, dependency-free flag icons: flat shapes only — no filters, no
 * animations, no external assets — so eight instances cost almost nothing.
 * Flags are decorative; the language card's text carries the accessible name.
 */

const FLAG_SHAPES: Record<FlagId, ReactElement> = {
  ru: (
    <>
      <rect width="24" height="6" fill="#ffffff" />
      <rect y="6" width="24" height="6" fill="#0039a6" />
      <rect y="12" width="24" height="6" fill="#d52b1e" />
    </>
  ),
  gb: (
    <>
      <rect width="24" height="18" fill="#012169" />
      <path d="M0 0L24 18M24 0L0 18" stroke="#ffffff" strokeWidth="3.2" />
      <path d="M0 0L24 18M24 0L0 18" stroke="#c8102e" strokeWidth="1.4" />
      <path d="M12 0V18M0 9H24" stroke="#ffffff" strokeWidth="5.4" />
      <path d="M12 0V18M0 9H24" stroke="#c8102e" strokeWidth="3.2" />
    </>
  ),
  es: (
    <>
      <rect width="24" height="18" fill="#f1bf00" />
      <rect width="24" height="4.5" fill="#aa151b" />
      <rect y="13.5" width="24" height="4.5" fill="#aa151b" />
    </>
  ),
  de: (
    <>
      <rect width="24" height="6" fill="#000000" />
      <rect y="6" width="24" height="6" fill="#dd0000" />
      <rect y="12" width="24" height="6" fill="#ffce00" />
    </>
  ),
  fr: (
    <>
      <rect width="8" height="18" fill="#0055a4" />
      <rect x="8" width="8" height="18" fill="#ffffff" />
      <rect x="16" width="8" height="18" fill="#ef4135" />
    </>
  ),
  br: (
    <>
      <rect width="24" height="18" fill="#009c3b" />
      <polygon points="12,2.2 21.5,9 12,15.8 2.5,9" fill="#ffdf00" />
      <circle cx="12" cy="9" r="3.4" fill="#002776" />
    </>
  ),
  tr: (
    <>
      <rect width="24" height="18" fill="#e30a17" />
      <circle cx="9.5" cy="9" r="4.5" fill="#ffffff" />
      <circle cx="10.6" cy="9" r="3.6" fill="#e30a17" />
      <polygon
        points="14.8,7 14.33,8.35 12.9,8.38 14.04,9.25 13.62,10.62 14.8,9.8 15.98,10.62 15.56,9.25 16.7,8.38 15.27,8.35"
        fill="#ffffff"
      />
    </>
  ),
  it: (
    <>
      <rect width="8" height="18" fill="#009246" />
      <rect x="8" width="8" height="18" fill="#ffffff" />
      <rect x="16" width="8" height="18" fill="#ce2b37" />
    </>
  ),
};

type FlagIconProps = {
  flag: FlagId;
  className?: string;
};

export function FlagIcon({ flag, className = '' }: FlagIconProps) {
  return (
    <span className={`${styles.root} ${className}`.trim()} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 24 18"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        {FLAG_SHAPES[flag]}
      </svg>
    </span>
  );
}
