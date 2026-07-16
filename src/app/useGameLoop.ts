import { useEffect } from 'react';
import { MAX_TICK_MS, SIMULATION_STEP_MS } from '../domain/constants';
import { useGameStore } from '../store/useGameStore';

/**
 * Drives the simulation at a fixed step (`SIMULATION_STEP_MS`, ≈10 Hz) rather than
 * once per animation frame (~60 Hz). Each frame measures the real elapsed time,
 * adds it to an accumulator, and drains whole steps out of it; the sub-step
 * remainder is kept for the next frame, so no elapsed time is lost and the result
 * matches real time regardless of frame rate.
 */
export function useGameLoop(): void {
  useEffect(() => {
    let frameId = 0;
    let lastTime = performance.now();
    let accumulatorMs = 0;

    const frame = (now: number) => {
      if (document.visibilityState === 'visible') {
        const deltaMs = now - lastTime;
        lastTime = now;

        if (Number.isFinite(deltaMs) && deltaMs > 0) {
          accumulatorMs += deltaMs;

          // Clamp abnormally large gaps (background throttling, a long stall) so a
          // single frame can never trigger a burst of catch-up steps.
          if (accumulatorMs > MAX_TICK_MS) {
            accumulatorMs = MAX_TICK_MS;
          }

          const tick = useGameStore.getState().tick;

          while (accumulatorMs >= SIMULATION_STEP_MS) {
            tick(SIMULATION_STEP_MS);
            accumulatorMs -= SIMULATION_STEP_MS;
          }
        }
      } else {
        // Hidden tab: don't advance. Keep the clock current so the away time is
        // not replayed as progress when the tab becomes visible again.
        lastTime = now;
      }

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
