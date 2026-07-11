import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

export function useGameLoop(): void {
  useEffect(() => {
    let frameId = 0;
    let lastTime = performance.now();

    const frame = (now: number) => {
      if (document.visibilityState === 'visible') {
        const deltaMs = now - lastTime;
        useGameStore.getState().tick(deltaMs);
      }

      lastTime = now;
      frameId = requestAnimationFrame(frame);
    };

    const handleVisibilityChange = () => {
      lastTime = performance.now();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
