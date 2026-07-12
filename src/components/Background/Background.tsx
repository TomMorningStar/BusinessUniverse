import type { CSSProperties, ReactNode } from 'react';
import backgroundImage from '../../assets/background/pocket-empire-animated-background.svg';
import styles from './Background.module.css';

type BackgroundProps = {
  className?: string;
  children?: ReactNode;
  intensity?: number;
};

export function Background({ className = '', children, intensity = 1 }: BackgroundProps) {
  const safeIntensity = Math.min(1.35, Math.max(0.6, intensity));

  return (
    <div
      className={`${styles.root} ${className}`.trim()}
      style={{ '--bg-intensity': safeIntensity } as CSSProperties}
    >
      <img
        className={styles.background}
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        draggable={false}
      />

      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
