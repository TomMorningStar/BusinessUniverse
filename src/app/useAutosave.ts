import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

const AUTOSAVE_INTERVAL_MS = 5_000;

export function useAutosave(): void {
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      useGameStore.getState().saveGame();
    }, AUTOSAVE_INTERVAL_MS);

    const handlePageHide = () => {
      useGameStore.getState().saveGame();
    };

    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, []);
}
