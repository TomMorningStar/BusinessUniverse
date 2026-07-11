import type { CSSProperties } from 'react';

import styles from './WheatIcon.module.css';

type WheatIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
  label?: string;
};

type Grain = { x: number; y: number; r: number; rot: number };

const LEFT_GRAINS: Grain[] = [
  { x: 50, y: 44, r: 0.72, rot: 30 },
  { x: 46, y: 60, r: 0.82, rot: 26 },
  { x: 43, y: 76, r: 0.9, rot: 22 },
  { x: 41, y: 92, r: 0.98, rot: 18 },
];

const RIGHT_GRAINS: Grain[] = [
  { x: 78, y: 44, r: 0.72, rot: -30 },
  { x: 82, y: 60, r: 0.82, rot: -26 },
  { x: 85, y: 76, r: 0.9, rot: -22 },
  { x: 87, y: 92, r: 0.98, rot: -18 },
];

const CENTER_GRAINS: Grain[] = [
  { x: 64, y: 34, r: 0.85, rot: 0 },
  { x: 64, y: 50, r: 0.95, rot: 0 },
  { x: 64, y: 66, r: 1, rot: 0 },
  { x: 64, y: 82, r: 1, rot: 0 },
];

function Grain({ x, y, r, rot }: Grain) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${r})`}>
      <ellipse
        cx="0"
        cy="0"
        rx="9"
        ry="15"
        fill="url(#wheat-grain)"
        stroke="#a86a1c"
        strokeWidth="2"
      />
      <path d="M0 -13 L0 13" stroke="#9a5f18" strokeWidth="1.6" opacity="0.55" />
      <ellipse cx="-2.6" cy="-4" rx="2.4" ry="4.6" fill="#fff3c4" opacity="0.7" />
    </g>
  );
}

export function WheatIcon({
  size = 28,
  animated = false,
  className = '',
  label = 'Иконка сырья',
}: WheatIconProps) {
  const style = { '--wheat-size': `${size}px` } as CSSProperties;

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
            id="wheat-grain"
            x1="-9"
            y1="-15"
            x2="9"
            y2="15"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.grainA} offset="0" />
            <stop className={styles.grainB} offset="0.55" />
            <stop className={styles.grainC} offset="1" />
          </linearGradient>
          <linearGradient
            id="wheat-stem"
            x1="60"
            y1="90"
            x2="68"
            y2="122"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.stemA} offset="0" />
            <stop className={styles.stemB} offset="1" />
          </linearGradient>
          <filter id="wheat-drop" x="-30%" y="-20%" width="160%" height="150%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3.2"
              floodColor="#5a3a08"
              floodOpacity="0.4"
            />
          </filter>
        </defs>

        <g className={styles.float}>
          <g className={styles.breathe}>
            <g className={styles.tilt} filter="url(#wheat-drop)">
              {/* stem + leaves */}
              <path
                d="M64 118 C64 100 64 78 64 58"
                fill="none"
                stroke="url(#wheat-stem)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M64 104 C52 102 42 94 36 80 C50 80 60 88 64 100 Z"
                fill="url(#wheat-stem)"
                stroke="#4f6f2c"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M64 104 C76 102 86 94 92 80 C78 80 68 88 64 100 Z"
                fill="url(#wheat-stem)"
                stroke="#4f6f2c"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* awns */}
              <g stroke="#e9b64f" strokeWidth="2" strokeLinecap="round" opacity="0.85">
                <path d="M64 30 L64 14" fill="none" />
                <path d="M58 34 L48 22" fill="none" />
                <path d="M70 34 L80 22" fill="none" />
              </g>

              {/* grain heads */}
              {LEFT_GRAINS.map((g, i) => (
                <Grain key={`l${i}`} {...g} />
              ))}
              {RIGHT_GRAINS.map((g, i) => (
                <Grain key={`r${i}`} {...g} />
              ))}
              {CENTER_GRAINS.map((g, i) => (
                <Grain key={`c${i}`} {...g} />
              ))}
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
}
