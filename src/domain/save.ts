import { BUILDINGS, BUILDING_IDS } from './buildings';
import { INITIAL_MONEY } from './constants';
import {
  createInitialAutoSell,
  createInitialGameData,
  createInitialWarehouse,
} from './initialState';
import { RESOURCES, RESOURCE_IDS } from './resources';
import type {
  BuildingId,
  BuildingRunStatus,
  GameData,
  OwnedBuilding,
  ResourceId,
  Warehouse,
} from './types';

export const SAVE_STORAGE_KEY = 'business-universe-save';
export const SAVE_SCHEMA_VERSION = 1;

export type PersistedGameStateV1 = {
  version: 1;
  savedAt: number;
  money: number;
  warehouse: Warehouse;
  ownedBuildings: Partial<Record<BuildingId, OwnedBuilding>>;
  autoSell: Record<ResourceId, boolean>;
};

const VALID_STATUSES: readonly BuildingRunStatus[] = [
  'idle',
  'running',
  'waiting_for_inputs',
  'output_blocked',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function sanitizeNonNegativeInteger(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return Math.floor(value);
  }

  return fallback;
}

function sanitizeStatus(value: unknown, isCycleActive: boolean): BuildingRunStatus {
  if (typeof value === 'string' && (VALID_STATUSES as readonly string[]).includes(value)) {
    return value as BuildingRunStatus;
  }

  return isCycleActive ? 'running' : 'idle';
}

function sanitizeOwnedBuilding(raw: unknown, buildingId: BuildingId): OwnedBuilding | undefined {
  if (!isRecord(raw)) {
    return undefined;
  }

  const config = BUILDINGS[buildingId];
  const isCycleActive = raw.isCycleActive === true;
  const progressMs = Math.min(
    sanitizeNonNegativeInteger(raw.progressMs, 0),
    config.cycleDurationMs,
  );

  return {
    id: buildingId,
    progressMs,
    isCycleActive,
    status: sanitizeStatus(raw.status, isCycleActive),
  };
}

function sanitizeOwnedBuildings(raw: unknown): GameData['ownedBuildings'] {
  const ownedBuildings: GameData['ownedBuildings'] = {};

  if (!isRecord(raw)) {
    return ownedBuildings;
  }

  for (const buildingId of BUILDING_IDS) {
    const sanitized = sanitizeOwnedBuilding(raw[buildingId], buildingId);

    if (sanitized) {
      ownedBuildings[buildingId] = sanitized;
    }
  }

  return ownedBuildings;
}

function sanitizeWarehouse(raw: unknown): Warehouse {
  const warehouse = createInitialWarehouse();

  if (!isRecord(raw)) {
    return warehouse;
  }

  for (const resourceId of RESOURCE_IDS) {
    const slot = raw[resourceId];
    const capacity = RESOURCES[resourceId].initialCapacity;

    if (isRecord(slot)) {
      const amount = sanitizeNonNegativeInteger(slot.amount, 0);
      warehouse[resourceId] = { amount: Math.min(amount, capacity), capacity };
    }
  }

  return warehouse;
}

function sanitizeAutoSell(raw: unknown): Record<ResourceId, boolean> {
  const autoSell = createInitialAutoSell();

  if (!isRecord(raw)) {
    return autoSell;
  }

  for (const resourceId of RESOURCE_IDS) {
    if (typeof raw[resourceId] === 'boolean') {
      autoSell[resourceId] = raw[resourceId];
    }
  }

  return autoSell;
}

export function selectPersistedState(gameData: GameData): PersistedGameStateV1 {
  return {
    version: SAVE_SCHEMA_VERSION,
    savedAt: Date.now(),
    money: gameData.money,
    warehouse: gameData.warehouse,
    ownedBuildings: gameData.ownedBuildings,
    autoSell: gameData.autoSell,
  };
}

export function serializeSave(gameData: GameData): string {
  return JSON.stringify(selectPersistedState(gameData));
}

export function parseSave(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Migration boundary: only version 1 exists today. An unrecognized or future
 * schema version must not be treated as v1 data.
 */
export function migrateSave(parsed: unknown): unknown {
  if (!isRecord(parsed) || parsed.version !== SAVE_SCHEMA_VERSION) {
    return null;
  }

  return parsed;
}

export function sanitizeSave(candidate: unknown, fallback: GameData): GameData {
  if (!isRecord(candidate)) {
    return fallback;
  }

  return {
    money: sanitizeNonNegativeInteger(candidate.money, INITIAL_MONEY),
    warehouse: sanitizeWarehouse(candidate.warehouse),
    ownedBuildings: sanitizeOwnedBuildings(candidate.ownedBuildings),
    autoSell: sanitizeAutoSell(candidate.autoSell),
  };
}

function readRawSave(): string | null {
  try {
    return localStorage.getItem(SAVE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeRawSave(serialized: string): void {
  try {
    localStorage.setItem(SAVE_STORAGE_KEY, serialized);
  } catch {
    // Storage can be unavailable (private mode, quota exceeded); saving is best-effort.
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_STORAGE_KEY);
  } catch {
    // Storage can be unavailable; nothing to clean up in that case.
  }
}

export function loadGameData(): GameData {
  const raw = readRawSave();

  if (raw === null) {
    return createInitialGameData();
  }

  const migrated = migrateSave(parseSave(raw));
  return sanitizeSave(migrated, createInitialGameData());
}

export function saveGameData(gameData: GameData): void {
  writeRawSave(serializeSave(gameData));
}
