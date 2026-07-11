import type { CSSProperties } from 'react';

import styles from './BoxIcon.module.css';

type BoxIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
  label?: string;
};

export function BoxIcon({
  size = 28,
  animated = false,
  className = '',
  label = 'Иконка склада',
}: BoxIconProps) {
  const style = {
    '--box-size': `${size}px`,
  } as CSSProperties;

  const rootClassName = [styles.root, animated ? styles.animated : styles.static, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClassName} style={style} role="img" aria-label={label}>
      <span className={styles.shadow} aria-hidden="true" />

      <svg
        className={styles.box}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <g className={styles.boxGroup}>
          <polygon
            points="100,45 158,78 100,111 42,78"
            fill="#7fc4ff"
            stroke="#123049"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <polygon
            points="42,78 100,111 100,168 42,135"
            fill="#2ea6ea"
            stroke="#123049"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <polygon
            points="100,111 158,78 158,135 100,168"
            fill="#1c7bb0"
            stroke="#123049"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d="M100,111 L100,168"
            stroke="#123049"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M63,66 L137,66"
            stroke="#f0f7ff"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>
      </svg>
    </span>
  );
}
