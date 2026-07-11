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
  const style = { '--factory-size': `${size}px` } as CSSProperties;

  const rootClassName = [styles.root, animated ? styles.animated : styles.static, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClassName} style={style} role="img" aria-label={label}>
      <span className={styles.shadow} aria-hidden="true" />

      <svg
        className={styles.icon}
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="factory-wall"
            x1="24"
            y1="60"
            x2="104"
            y2="118"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.wallA} offset="0" />
            <stop className={styles.wallB} offset="1" />
          </linearGradient>
          <linearGradient
            id="factory-roof"
            x1="24"
            y1="52"
            x2="104"
            y2="72"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.roofA} offset="0" />
            <stop className={styles.roofB} offset="1" />
          </linearGradient>
          <linearGradient id="factory-chimney" x1="0" y1="0" x2="0" y2="1">
            <stop className={styles.roofA} offset="0" />
            <stop className={styles.roofB} offset="1" />
          </linearGradient>
          <radialGradient id="factory-window" cx="0.35" cy="0.3" r="0.9">
            <stop className={styles.winA} offset="0" />
            <stop className={styles.winB} offset="1" />
          </radialGradient>
          <linearGradient id="factory-smoke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6eef5" />
            <stop offset="1" stopColor="#b8c6d2" />
          </linearGradient>
          <filter id="factory-drop" x="-25%" y="-30%" width="150%" height="160%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="3.6"
              floodColor="#0a141d"
              floodOpacity="0.42"
            />
          </filter>
        </defs>

        {/* smoke rises independently of the building's breathing */}
        <g className={styles.smoke}>
          <circle className={styles.puff1} cx="44" cy="40" r="8" fill="url(#factory-smoke)" />
          <circle className={styles.puff2} cx="44" cy="40" r="10" fill="url(#factory-smoke)" />
          <circle className={styles.puff3} cx="86" cy="30" r="6.5" fill="url(#factory-smoke)" />
          <circle className={styles.puff4} cx="86" cy="30" r="8.5" fill="url(#factory-smoke)" />
        </g>

        <g className={styles.float}>
          <g className={styles.breathe}>
            <g className={styles.tilt} filter="url(#factory-drop)">
              {/* chimneys */}
              <rect
                x="38"
                y="40"
                width="16"
                height="42"
                rx="4"
                fill="url(#factory-chimney)"
                stroke="#14202b"
                strokeWidth="2"
              />
              <rect
                x="80"
                y="30"
                width="14"
                height="42"
                rx="4"
                fill="url(#factory-chimney)"
                stroke="#14202b"
                strokeWidth="2"
              />
              <rect
                x="36"
                y="38"
                width="20"
                height="7"
                rx="3.5"
                fill="url(#factory-roof)"
                stroke="#14202b"
                strokeWidth="2"
              />
              <rect
                x="78"
                y="28"
                width="18"
                height="7"
                rx="3.5"
                fill="url(#factory-roof)"
                stroke="#14202b"
                strokeWidth="2"
              />

              {/* saw-tooth roof / body */}
              <path
                d="M22 74 L44 56 L64 74 L84 56 L106 74 L106 108 Q106 114 100 114 L28 114 Q22 114 22 108 Z"
                fill="url(#factory-wall)"
                stroke="#14202b"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <path
                d="M22 74 L44 56 L64 74 L84 56 L106 74 Z"
                fill="url(#factory-roof)"
                stroke="#14202b"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />

              {/* glossy windows */}
              <rect
                x="34"
                y="86"
                width="17"
                height="17"
                rx="3.5"
                fill="url(#factory-window)"
                stroke="#14202b"
                strokeWidth="2"
              />
              <rect
                x="55.5"
                y="86"
                width="17"
                height="17"
                rx="3.5"
                fill="url(#factory-window)"
                stroke="#14202b"
                strokeWidth="2"
              />
              <rect
                x="77"
                y="86"
                width="17"
                height="17"
                rx="3.5"
                fill="url(#factory-window)"
                stroke="#14202b"
                strokeWidth="2"
              />
              <g fill="#ffffff" opacity="0.55">
                <rect x="36.5" y="88.5" width="5" height="5" rx="1.5" />
                <rect x="58" y="88.5" width="5" height="5" rx="1.5" />
                <rect x="79.5" y="88.5" width="5" height="5" rx="1.5" />
              </g>

              {/* highlight along the roof ridge */}
              <path
                d="M24 73 L44 57 L64 73 L84 57 L104 73"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
}
