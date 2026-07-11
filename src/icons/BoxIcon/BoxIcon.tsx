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
          <linearGradient
            id="box-tape"
            x1="52"
            y1="70"
            x2="76"
            y2="118"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.tapeA} offset="0" />
            <stop className={styles.tapeB} offset="1" />
          </linearGradient>
          <radialGradient
            id="box-glow"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(52 44) scale(56)"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="box-shine"
            x1="0"
            y1="0"
            x2="26"
            y2="52"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="box-clip">
            <path d="M64 20 L110 46 L110 96 L64 122 L18 96 L18 46 Z" />
          </clipPath>
          <filter id="box-drop" x="-30%" y="-25%" width="160%" height="155%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0a1a2a" floodOpacity="0.45" />
          </filter>
        </defs>

        <g className={styles.float}>
          <g className={styles.breathe}>
            <g className={styles.tilt} filter="url(#box-drop)">
              {/* faces */}
              <path
                d="M64 20 L110 46 L64 72 L18 46 Z"
                fill="url(#box-top)"
                stroke="#123049"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M18 46 L64 72 L64 122 L18 96 Z"
                fill="url(#box-left)"
                stroke="#0e2a41"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M64 72 L110 46 L110 96 L64 122 Z"
                fill="url(#box-right)"
                stroke="#0e2a41"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* tape */}
              <g clipPath="url(#box-clip)">
                <path d="M64 21 L79 29.5 L64 38 L49 29.5 Z" fill="url(#box-tape)" opacity="0.95" />
                <path d="M56 73 L72 73 L72 118 L56 118 Z" fill="url(#box-tape)" />
                <path d="M56 73 L60 73 L60 118 L56 118 Z" fill="#ffffff" opacity="0.25" />
              </g>

              {/* ambient + gloss */}
              <path d="M64 20 L110 46 L64 72 L18 46 Z" fill="url(#box-glow)" />
              <g clipPath="url(#box-clip)">
                <rect
                  className={styles.shine}
                  x="-30"
                  y="8"
                  width="26"
                  height="120"
                  fill="url(#box-shine)"
                />
              </g>
              <path
                d="M24 47 L64 24 L104 47"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.4"
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
