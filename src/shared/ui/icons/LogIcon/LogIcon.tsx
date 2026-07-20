import type { CSSProperties } from 'react';

import styles from './LogIcon.module.css';

type LogIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
  label?: string;
};

export function LogIcon({ size, animated = false, className = '', label }: LogIconProps) {
  const style = size === undefined ? undefined : ({ '--icon-size': `${size}px` } as CSSProperties);

  const rootClassName = [styles.root, animated ? styles.animated : styles.static, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={rootClassName}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
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
            id="log-bark"
            x1="34"
            y1="42"
            x2="108"
            y2="98"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.barkA} offset="0" />
            <stop className={styles.barkB} offset="0.55" />
            <stop className={styles.barkC} offset="1" />
          </linearGradient>
          <radialGradient
            id="log-rings"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(31 64) scale(18 27)"
          >
            <stop className={styles.ringA} offset="0" />
            <stop className={styles.ringB} offset="0.5" />
            <stop className={styles.ringC} offset="1" />
          </radialGradient>
          <clipPath id="log-body-clip">
            <rect x="34" y="44" width="72" height="52" rx="26" />
          </clipPath>
          <filter id="log-drop" x="-30%" y="-25%" width="160%" height="155%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2a1608" floodOpacity="0.46" />
          </filter>
        </defs>

        <g className={styles.float}>
          <g className={styles.breathe}>
            <g className={styles.tilt} filter="url(#log-drop)">
              {/* trunk */}
              <rect
                x="34"
                y="44"
                width="72"
                height="52"
                rx="26"
                fill="url(#log-bark)"
                stroke="#2e1608"
                strokeWidth="3"
              />

              {/* bark ridges: alternating grooves and highlight strips, clipped to the trunk silhouette */}
              <g clipPath="url(#log-body-clip)">
                <path
                  d="M28 50 C56 45 84 45 112 50"
                  fill="none"
                  stroke="#ffe8ab"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.55"
                />
                <path
                  d="M28 60 C56 55 84 55 112 60"
                  fill="none"
                  stroke="#5a3315"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                <path
                  d="M28 73 C56 69 84 69 112 73"
                  fill="none"
                  stroke="#ffdf94"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.32"
                />
                <path
                  d="M28 82 C56 78 84 78 112 82"
                  fill="none"
                  stroke="#4a2810"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.44"
                />
                <path
                  d="M28 92 C56 96 84 96 112 92"
                  fill="none"
                  stroke="#3a2010"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </g>

              {/* cut end with growth rings */}
              <ellipse
                cx="34"
                cy="70"
                rx="17"
                ry="26"
                fill="url(#log-rings)"
                stroke="#2e1608"
                strokeWidth="3"
              />
              <ellipse
                cx="34"
                cy="70"
                rx="13.5"
                ry="20.5"
                fill="none"
                stroke="#8a5424"
                strokeWidth="1.4"
                opacity="0.55"
              />
              <ellipse
                cx="34"
                cy="70"
                rx="10"
                ry="15.2"
                fill="none"
                stroke="#8a5424"
                strokeWidth="1.4"
                opacity="0.5"
              />
              <ellipse
                cx="34"
                cy="70"
                rx="6.6"
                ry="10"
                fill="none"
                stroke="#8a5424"
                strokeWidth="1.3"
                opacity="0.5"
              />
              <ellipse
                cx="34"
                cy="70"
                rx="3.4"
                ry="5.2"
                fill="none"
                stroke="#8a5424"
                strokeWidth="1.2"
                opacity="0.5"
              />
              <path
                d="M34 70 q3 -2.4 5 0.6 q1.6 3 -1.6 4.6 q-3 1.6 -5 -1.2"
                fill="none"
                stroke="#7a4a1e"
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity="0.55"
              />
              {/* glossy highlight on the end grain */}
              <ellipse cx="29" cy="60" rx="6" ry="9" fill="#fff6de" opacity="0.28" />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
}
