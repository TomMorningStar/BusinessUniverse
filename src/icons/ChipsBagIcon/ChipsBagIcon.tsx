import type { CSSProperties } from 'react';

import styles from './ChipsBagIcon.module.css';

type ChipsBagIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
  label?: string;
};

export function ChipsBagIcon({
  size = 180,
  animated = true,
  className = '',
  label = 'Анимированный пакет чипсов',
}: ChipsBagIconProps) {
  const style = {
    '--chips-size': `${size}px`,
  } as CSSProperties;

  const rootClassName = [styles.root, animated ? styles.animated : styles.static, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClassName} style={style} role="img" aria-label={label}>
      <span className={styles.shadow} aria-hidden="true" />

      <svg
        className={styles.bag}
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <g className={styles.bagGroup}>
          <path
            d="M100,70Q150,84 200,70C214,72 222,82 222,96L222,206C230,216 230,236 220,246C214,254 204,256 196,252C190,264 176,268 164,258C156,268 144,268 136,258C124,268 110,264 104,252C96,256 86,254 80,246C70,236 70,216 78,206L78,96C78,82 86,72 100,70Z"
            fill="#F2801D"
            stroke="#1A1A1A"
            strokeWidth="11"
            strokeLinejoin="round"
          />

          <rect x="86" y="92" width="128" height="16" rx="8" fill="#1A1A1A" />
          <rect x="86" y="220" width="128" height="16" rx="8" fill="#1A1A1A" />

          <g className={styles.badge}>
            <circle cx="150" cy="160" r="42" fill="#FFC93C" stroke="#1A1A1A" strokeWidth="9" />
            <path
              d="M118,182L188,142L198,158L128,198Z"
              fill="#D9D9D9"
              stroke="#1A1A1A"
              strokeWidth="7"
              strokeLinejoin="round"
            />
          </g>
        </g>

        <g className={styles.chip}>
          <path
            d="M186,222C204,206 232,202 252,214C270,224 276,246 264,262C252,278 226,282 206,270C192,262 182,246 182,232C182,228 183,225 186,222Z"
            fill="#F5B942"
            stroke="#1A1A1A"
            strokeWidth="9"
            strokeLinejoin="round"
          />
          <path
            d="M198,232C212,224 232,224 246,236"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
      </svg>
    </span>
  );
}
