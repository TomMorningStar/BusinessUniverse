import type { CSSProperties } from 'react';

import styles from './FactoryIcon.module.css';

type FactoryIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
  label?: string;
};

export function FactoryIcon({
  size = 28,
  animated = false,
  className = '',
  label = 'Иконка фабрики',
}: FactoryIconProps) {
  const style = {
    '--factory-size': `${size}px`,
  } as CSSProperties;

  const rootClassName = [styles.root, animated ? styles.animated : styles.static, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClassName} style={style} role="img" aria-label={label}>
      <span className={styles.shadow} aria-hidden="true" />

      <svg
        className={styles.factory}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <g className={styles.smokeLeft}>
          <circle cx="70" cy="55" r="9" fill="#c7d2db" />
        </g>
        <g className={styles.smokeRight}>
          <circle cx="128" cy="42" r="7" fill="#c7d2db" />
        </g>

        <g className={styles.building}>
          <rect
            x="60"
            y="38"
            width="20"
            height="62"
            fill="#26313b"
            stroke="#12181e"
            strokeWidth="7"
          />
          <rect
            x="118"
            y="53"
            width="20"
            height="47"
            fill="#26313b"
            stroke="#12181e"
            strokeWidth="7"
          />

          <path
            d="M38,100 L70,76 L100,100 L130,76 L162,100 L162,170 L38,170 Z"
            fill="#33404c"
            stroke="#12181e"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          <rect
            x="53"
            y="116"
            width="24"
            height="24"
            rx="3"
            fill="#f2c368"
            stroke="#12181e"
            strokeWidth="5"
          />
          <rect
            x="88"
            y="116"
            width="24"
            height="24"
            rx="3"
            fill="#f2c368"
            stroke="#12181e"
            strokeWidth="5"
          />
          <rect
            x="123"
            y="116"
            width="24"
            height="24"
            rx="3"
            fill="#f2c368"
            stroke="#12181e"
            strokeWidth="5"
          />
          <rect
            x="78"
            y="148"
            width="44"
            height="22"
            rx="3"
            fill="#1c242c"
            stroke="#12181e"
            strokeWidth="5"
          />
        </g>
      </svg>
    </span>
  );
}
