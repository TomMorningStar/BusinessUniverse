import type { CSSProperties } from 'react';

import styles from './WheatIcon.module.css';

type WheatIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
  label?: string;
};

export function WheatIcon({
  size = 28,
  animated = false,
  className = '',
  label = 'Иконка сырья',
}: WheatIconProps) {
  const style = {
    '--wheat-size': `${size}px`,
  } as CSSProperties;

  const rootClassName = [styles.root, animated ? styles.animated : styles.static, className]
    .filter(Boolean)
    .join(' ');

  const grainFill = '#f2c368';
  const grainStroke = '#a86f22';

  return (
    <span className={rootClassName} style={style} role="img" aria-label={label}>
      <span className={styles.shadow} aria-hidden="true" />

      <svg
        className={styles.wheat}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <g className={styles.stalkGroup}>
          <path
            d="M100,178 C100,140 100,100 100,46"
            fill="none"
            stroke="#6b8f3d"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <path
            d="M100,168 C78,166 60,154 50,134"
            fill="none"
            stroke="#6b8f3d"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M100,168 C122,166 140,154 150,134"
            fill="none"
            stroke="#6b8f3d"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {[140, 110, 80].map((y, index) => {
            const side = index % 2 === 0 ? -1 : 1;
            const scale = 1 - index * 0.12;
            return (
              <g key={y} transform={`translate(100 ${y}) rotate(${side * 34})`}>
                <ellipse
                  cx={side * 22 * scale}
                  cy="0"
                  rx={19 * scale}
                  ry={11 * scale}
                  fill={grainFill}
                  stroke={grainStroke}
                  strokeWidth="4"
                />
              </g>
            );
          })}

          <ellipse
            cx="100"
            cy="42"
            rx="11"
            ry="18"
            fill={grainFill}
            stroke={grainStroke}
            strokeWidth="4"
          />
        </g>
      </svg>
    </span>
  );
}
