import type { CSSProperties } from 'react';

import styles from './PotatoIcon.module.css';

type PotatoIconProps = {
  size?: number;
  animated?: boolean;
  className?: string;
  label?: string;
};

export function PotatoIcon({ size, animated = true, className = '', label }: PotatoIconProps) {
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
        className={styles.potato}
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="potato-icon-skin"
            x1="58"
            y1="35"
            x2="242"
            y2="270"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FFE28A" />
            <stop offset="0.28" stopColor="#F9B83F" />
            <stop offset="0.64" stopColor="#DD8121" />
            <stop offset="1" stopColor="#99420F" />
          </linearGradient>

          <radialGradient
            id="potato-icon-light"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(108 77) rotate(58) scale(178 138)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FFF7C8" stopOpacity="0.98" />
            <stop offset="0.24" stopColor="#FFD76B" stopOpacity="0.5" />
            <stop offset="0.68" stopColor="#C86816" stopOpacity="0.05" />
            <stop offset="1" stopColor="#632104" stopOpacity="0.42" />
          </radialGradient>

          <linearGradient
            id="potato-icon-rim"
            x1="66"
            y1="69"
            x2="237"
            y2="243"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FFF3AF" stopOpacity="0.75" />
            <stop offset="0.5" stopColor="#FFC75B" stopOpacity="0.05" />
            <stop offset="1" stopColor="#6D2105" stopOpacity="0.72" />
          </linearGradient>

          <radialGradient
            id="potato-icon-eye"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(0.38 0.24) rotate(52) scale(1)"
          >
            <stop offset="0" stopColor="#E99A3B" />
            <stop offset="0.5" stopColor="#A94E13" />
            <stop offset="1" stopColor="#6E2808" />
          </radialGradient>

          <linearGradient
            id="potato-icon-glint"
            x1="97"
            y1="55"
            x2="144"
            y2="157"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" stopOpacity="0.88" />
            <stop offset="0.5" stopColor="#FFF7CA" stopOpacity="0.35" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <filter id="potato-icon-inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur" />
            <feOffset dx="6" dy="10" result="offsetBlur" />
            <feComposite in="offsetBlur" in2="SourceAlpha" operator="in" result="inner" />
            <feColorMatrix
              in="inner"
              type="matrix"
              values="
                0 0 0 0 0.28
                0 0 0 0 0.08
                0 0 0 0 0.01
                0 0 0 0.34 0
              "
              result="shadow"
            />
            <feComposite in="SourceGraphic" in2="shadow" operator="over" />
          </filter>

          <filter id="potato-icon-soften" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>

          <clipPath id="potato-icon-clip">
            <path d="M151 24C203 24 237 62 246 118C257 181 239 239 196 270C157 298 99 289 68 244C37 200 39 128 61 76C80 31 111 23 151 24Z" />
          </clipPath>
        </defs>

        <g className={styles.bodyGroup}>
          <path
            d="M151 24C203 24 237 62 246 118C257 181 239 239 196 270C157 298 99 289 68 244C37 200 39 128 61 76C80 31 111 23 151 24Z"
            fill="url(#potato-icon-skin)"
            stroke="#8D3C0C"
            strokeWidth="3.2"
            strokeLinejoin="round"
            filter="url(#potato-icon-inner-shadow)"
          />

          <path
            d="M151 27C201 27 233 64 242 119C252 178 235 234 193 265C157 291 102 283 72 240C43 198 44 131 65 80C83 37 113 27 151 27Z"
            fill="url(#potato-icon-light)"
          />

          <path
            d="M151 27C201 27 233 64 242 119C252 178 235 234 193 265C157 291 102 283 72 240C43 198 44 131 65 80C83 37 113 27 151 27Z"
            fill="none"
            stroke="url(#potato-icon-rim)"
            strokeWidth="3"
          />

          <g className={styles.details} clipPath="url(#potato-icon-clip)">
            <ellipse cx="95" cy="83" rx="7" ry="5" fill="#B65E18" />
            <ellipse cx="121" cy="55" rx="5" ry="3.5" fill="#C86A1A" />
            <ellipse cx="158" cy="61" rx="8" ry="5.5" fill="#A94B11" />
            <ellipse cx="195" cy="81" rx="5" ry="3.5" fill="#B85A14" />
            <ellipse cx="218" cy="111" rx="7" ry="5" fill="#9D430F" />
            <ellipse cx="82" cy="139" rx="5.5" ry="4" fill="#B75B17" />
            <ellipse cx="119" cy="151" rx="4" ry="3" fill="#C8711E" />
            <ellipse cx="164" cy="126" rx="5.5" ry="4" fill="#B95D15" />
            <ellipse cx="209" cy="164" rx="8" ry="5.5" fill="#963A0D" />
            <ellipse cx="91" cy="193" rx="7" ry="5" fill="#A94D12" />
            <ellipse cx="130" cy="220" rx="5" ry="3.5" fill="#B85A16" />
            <ellipse cx="176" cy="207" rx="7.5" ry="5.2" fill="#A5480F" />
            <ellipse cx="212" cy="222" rx="5" ry="3.7" fill="#8D350B" />
            <ellipse cx="111" cy="250" rx="8" ry="4.6" fill="#8E370C" />
            <ellipse cx="164" cy="257" rx="6" ry="3.8" fill="#843109" />

            <g fill="#C97724" opacity="0.88">
              <circle cx="107" cy="93" r="2.1" />
              <circle cx="129" cy="88" r="1.7" />
              <circle cx="149" cy="96" r="2.2" />
              <circle cx="177" cy="89" r="1.6" />
              <circle cx="189" cy="108" r="2" />
              <circle cx="99" cy="116" r="1.8" />
              <circle cx="134" cy="121" r="1.5" />
              <circle cx="154" cy="110" r="1.9" />
              <circle cx="174" cy="145" r="1.7" />
              <circle cx="190" cy="136" r="2.1" />
              <circle cx="102" cy="165" r="1.6" />
              <circle cx="137" cy="175" r="2" />
              <circle cx="155" cy="184" r="1.6" />
              <circle cx="192" cy="188" r="1.9" />
              <circle cx="113" cy="207" r="1.7" />
              <circle cx="148" cy="235" r="1.8" />
              <circle cx="187" cy="239" r="1.5" />
            </g>

            <g>
              <ellipse
                cx="106"
                cy="123"
                rx="15"
                ry="9"
                transform="rotate(-20 106 123)"
                fill="url(#potato-icon-eye)"
              />
              <path
                d="M92 121C97 128 108 132 119 126"
                fill="none"
                stroke="#FFD87B"
                strokeWidth="3.8"
                strokeLinecap="round"
                opacity="0.65"
              />

              <ellipse
                cx="190"
                cy="166"
                rx="16"
                ry="8.5"
                transform="rotate(-12 190 166)"
                fill="url(#potato-icon-eye)"
              />
              <path
                d="M176 166C183 173 196 175 204 169"
                fill="none"
                stroke="#FFD87B"
                strokeWidth="3.6"
                strokeLinecap="round"
                opacity="0.62"
              />

              <ellipse
                cx="147"
                cy="73"
                rx="8"
                ry="5"
                transform="rotate(-30 147 73)"
                fill="#9D420F"
              />
              <path
                d="M141 72C144 75 149 76 153 73"
                fill="none"
                stroke="#FFE08C"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.5"
              />
            </g>
          </g>

          <g className={styles.glint} clipPath="url(#potato-icon-clip)">
            <path
              d="M94 58C111 42 132 43 142 55C151 66 140 80 130 93C119 108 112 129 106 148C97 129 88 111 83 91C79 75 83 67 94 58Z"
              fill="url(#potato-icon-glint)"
              filter="url(#potato-icon-soften)"
            />
            <ellipse
              cx="118"
              cy="72"
              rx="13"
              ry="17"
              transform="rotate(35 118 72)"
              fill="#FFFFFF"
              opacity="0.52"
            />
            <circle cx="99" cy="98" r="5.2" fill="#FFFFFF" opacity="0.64" />
          </g>
        </g>
      </svg>
    </span>
  );
}
