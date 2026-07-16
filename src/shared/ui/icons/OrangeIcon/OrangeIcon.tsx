import type { CSSProperties } from 'react';

import styles from './OrangeIcon.module.css';

type OrangeIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
  label?: string;
};

/** Peel pores, hand-placed so the fruit reads as textured, not noisy. */
const PORES: ReadonlyArray<{ x: number; y: number; r: number }> = [
  { x: 46, y: 62, r: 1.5 },
  { x: 58, y: 54, r: 1.2 },
  { x: 72, y: 58, r: 1.6 },
  { x: 84, y: 70, r: 1.2 },
  { x: 40, y: 80, r: 1.3 },
  { x: 54, y: 74, r: 1.1 },
  { x: 68, y: 78, r: 1.4 },
  { x: 82, y: 88, r: 1.5 },
  { x: 48, y: 94, r: 1.4 },
  { x: 62, y: 90, r: 1.2 },
  { x: 74, y: 98, r: 1.3 },
  { x: 58, y: 104, r: 1.5 },
];

export function OrangeIcon({
  size,
  animated = false,
  className = '',
  label = 'Апельсин',
}: OrangeIconProps) {
  const style = size === undefined ? undefined : ({ '--icon-size': `${size}px` } as CSSProperties);

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
          <radialGradient
            id="orange-peel"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(48 56) rotate(55) scale(66 62)"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.peelA} offset="0" />
            <stop className={styles.peelB} offset="0.55" />
            <stop className={styles.peelC} offset="0.85" />
            <stop className={styles.peelD} offset="1" />
          </radialGradient>

          <radialGradient
            id="orange-sheen"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(48 56) rotate(50) scale(34 28)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="0.55" stopColor="#fff3d6" stopOpacity="0.28" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <linearGradient
            id="orange-leaf"
            x1="70"
            y1="20"
            x2="100"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.leafA} offset="0" />
            <stop className={styles.leafB} offset="1" />
          </linearGradient>

          <filter id="orange-drop" x="-30%" y="-20%" width="160%" height="150%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3.2"
              floodColor="#7a3c04"
              floodOpacity="0.38"
            />
          </filter>
        </defs>

        <g className={styles.float}>
          <g className={styles.bob}>
            <g filter="url(#orange-drop)">
              {/* branch stub */}
              <path
                d="M64 34 C64 28 66 23 71 19"
                fill="none"
                stroke="#8a5a2b"
                strokeWidth="5.5"
                strokeLinecap="round"
              />

              {/* leaf, swinging slightly behind the fruit's rhythm */}
              <g className={styles.leaf}>
                <path
                  d="M71 24 C82 14 98 15 104 26 C96 36 80 37 71 28 Z"
                  fill="url(#orange-leaf)"
                  stroke="#3f6522"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M73 26 C83 24 93 24 101 26"
                  fill="none"
                  stroke="#dff0c8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.65"
                />
              </g>

              {/* fruit body — a perfect circle, never squashed */}
              <circle
                cx="64"
                cy="74"
                r="38"
                fill="url(#orange-peel)"
                stroke="#a84e06"
                strokeWidth="2.4"
              />

              {/* calyx where the branch meets the peel */}
              <path
                d="M58 37 C61 34 67 34 70 37 C67 40 61 40 58 37 Z"
                fill="#7d9c44"
                stroke="#55742c"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* peel pores */}
              <g className={styles.pores}>
                {PORES.map((pore, index) => (
                  <circle key={index} cx={pore.x} cy={pore.y} r={pore.r} />
                ))}
              </g>

              {/* soft sheen + moving glint */}
              <circle cx="64" cy="74" r="38" fill="url(#orange-sheen)" />
              <g className={styles.glint}>
                <ellipse
                  cx="48"
                  cy="56"
                  rx="12"
                  ry="16"
                  transform="rotate(38 48 56)"
                  fill="#ffffff"
                  opacity="0.55"
                />
                <circle cx="40" cy="72" r="4" fill="#ffffff" opacity="0.6" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
}
