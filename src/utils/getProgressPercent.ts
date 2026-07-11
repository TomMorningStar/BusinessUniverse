export function getProgressPercent(progressMs: number, durationMs: number): number {
  if (durationMs <= 0) {
    return 0;
  }

  return Math.min(Math.max((progressMs / durationMs) * 100, 0), 100);
}
