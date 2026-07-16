import type { CSSProperties } from 'react';

import styles from './GearIcon.module.css';

type GearIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
  label?: string;
};

const TOOTH_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

type GearTeethProps = {
  cx: number;
  cy: number;
  rOuter: number;
  width: number;
  height: number;
  radius: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
};

function GearTeeth({
  cx,
  cy,
  rOuter,
  width,
  height,
  radius,
  fill,
  stroke,
  strokeWidth,
}: GearTeethProps) {
  return (
    <>
      {TOOTH_ANGLES.map((angle) => (
        <rect
          key={angle}
          x={cx - width / 2}
          y={cy - rOuter}
          width={width}
          height={height}
          rx={radius}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          transform={`rotate(${angle} ${cx} ${cy})`}
        />
      ))}
    </>
  );
}

export function GearIcon({ size, animated = false, className = '', label }: GearIconProps) {
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
          <radialGradient
            id="gear-steel"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(44 52) rotate(55) scale(58 54)"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.steelA} offset="0" />
            <stop className={styles.steelB} offset="0.5" />
            <stop className={styles.steelC} offset="0.82" />
            <stop className={styles.steelD} offset="1" />
          </radialGradient>

          <radialGradient
            id="gear-gold"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(92 30) rotate(60) scale(26 24)"
            gradientUnits="userSpaceOnUse"
          >
            <stop className={styles.goldA} offset="0" />
            <stop className={styles.goldB} offset="0.6" />
            <stop className={styles.goldC} offset="1" />
          </radialGradient>

          <radialGradient
            id="gear-sheen"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(44 52) rotate(50) scale(30 26)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="0.55" stopColor="#e6ecff" stopOpacity="0.25" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <filter id="gear-drop" x="-30%" y="-20%" width="160%" height="150%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3.2"
              floodColor="#141a3d"
              floodOpacity="0.45"
            />
          </filter>
        </defs>

        <g className={styles.breathe}>
          <g filter="url(#gear-drop)">
            {/* small gold gear, counter-rotating twice as fast */}
            <g className={styles.gearSmall}>
              <GearTeeth
                cx={99}
                cy={38}
                rOuter={18}
                width={8}
                height={9}
                radius={2.5}
                fill="url(#gear-gold)"
                stroke="#a05e08"
                strokeWidth={1.4}
              />
              <circle
                cx="99"
                cy="38"
                r="13"
                fill="url(#gear-gold)"
                stroke="#a05e08"
                strokeWidth="1.6"
              />
              <circle cx="99" cy="38" r="4.5" fill="#7a4a08" stroke="#5e3805" strokeWidth="1.2" />
            </g>

            {/* main steel gear */}
            <g className={styles.gearMain}>
              <GearTeeth
                cx={58}
                cy={72}
                rOuter={39}
                width={16}
                height={15}
                radius={4}
                fill="url(#gear-steel)"
                stroke="#2e3577"
                strokeWidth={1.8}
              />
              <circle
                cx="58"
                cy="72"
                r="30"
                fill="url(#gear-steel)"
                stroke="#2e3577"
                strokeWidth="2.2"
              />
              <circle
                cx="58"
                cy="72"
                r="18"
                fill="none"
                stroke="#39418f"
                strokeWidth="3"
                opacity="0.55"
              />
              <circle
                cx="58"
                cy="72"
                r="11.5"
                fill="url(#gear-steel)"
                stroke="#2e3577"
                strokeWidth="1.8"
              />
              <circle cx="58" cy="72" r="6" fill="#20265c" stroke="#161b46" strokeWidth="1.4" />
            </g>

            {/* fixed lighting: the sheen stays put while the metal turns beneath it */}
            <g className={styles.glint}>
              <circle cx="58" cy="72" r="30" fill="url(#gear-sheen)" />
              <ellipse
                cx="46"
                cy="58"
                rx="9"
                ry="12"
                transform="rotate(35 46 58)"
                fill="#ffffff"
                opacity="0.5"
              />
              <circle cx="92" cy="31" r="3.5" fill="#ffffff" opacity="0.55" />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
}
