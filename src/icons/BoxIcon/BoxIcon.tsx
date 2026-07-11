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
  const style = { '--box-size': `${size}px` } as CSSProperties;

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
            id="box-top"
            x1="30"
            y1="20"
            x2="96"
            y2="74"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.topA} offset="0" />
            <stop className={styles.topB} offset="1" />
          </linearGradient>
          <linearGradient
            id="box-left"
            x1="20"
            y1="52"
            x2="64"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.leftA} offset="0" />
            <stop className={styles.leftB} offset="1" />
          </linearGradient>
          <linearGradient
            id="box-right"
            x1="108"
            y1="52"
            x2="64"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.rightA} offset="0" />
            <stop className={styles.rightB} offset="1" />
          </linearGradient>
          <radialGradient
            id="box-glow"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(52 44) scale(54)"
          >
            <stop offset="0" stopColor="#fff4df" stopOpacity="0.32" />
            <stop offset="0.7" stopColor="#fff4df" stopOpacity="0.04" />
            <stop offset="1" stopColor="#fff4df" stopOpacity="0" />
          </radialGradient>
          <filter id="box-drop" x="-30%" y="-25%" width="160%" height="155%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3a2410" floodOpacity="0.42" />
          </filter>
        </defs>

        <g className={styles.float}>
          <g className={styles.breathe}>
            <g className={styles.tilt} filter="url(#box-drop)">
              {/* faces */}
              <path
                d="M64 20 L110 46 L64 72 L18 46 Z"
                fill="url(#box-top)"
                stroke="#7a5326"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M18 46 L64 72 L64 122 L18 96 Z"
                fill="url(#box-left)"
                stroke="#5e3f1c"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M64 72 L110 46 L110 96 L64 122 Z"
                fill="url(#box-right)"
                stroke="#5e3f1c"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* cardboard flap seams on the lid */}
              <path
                d="M64 20 L64 72"
                stroke="#8a5f2c"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M41 33 L87 59"
                stroke="#8a5f2c"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.4"
              />

              {/* edge highlight + soft ambient */}
              <path
                d="M24 47 L64 24 L104 47"
                fill="none"
                stroke="#fff0d6"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.35"
              />
              <path d="M64 20 L110 46 L64 72 L18 46 Z" fill="url(#box-glow)" />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
}
