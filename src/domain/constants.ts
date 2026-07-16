export const INITIAL_MONEY = 100;

export const MAX_TICK_MS = 1000;

/**
 * Fixed simulation step. The game loop advances production in discrete steps of
 * this size (≈10 steps/sec) instead of once per animation frame (~60/sec), and
 * carries the sub-step remainder between frames so no elapsed time is lost.
 */
export const SIMULATION_STEP_MS = 100;

/**
 * Safety cap on how many production cycles a single building may complete within
 * one tick. Real cycles last several seconds, so this is never reached in normal
 * play; it only bounds pathological configs (e.g. a near-zero cycle duration)
 * from looping forever when a large delta is processed at once.
 */
export const MAX_CYCLES_PER_TICK = 1000;
