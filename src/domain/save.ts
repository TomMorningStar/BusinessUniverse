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
export const SAVE_SCHEMA_VERSION = 3;

/** Legacy v1 buildings had no `ownedCount` — presence in the map meant "built once". */
type PersistedOwnedBuildingV1 = Omit<OwnedBuilding, 'ownedCount'>;

export type PersistedGameStateV1 = {
  version: 1;
  savedAt: number;
  money: number;
  warehouse: Warehouse;
  ownedBuildings: Partial<Record<BuildingId, PersistedOwnedBuildingV1>>;
  autoSell: Record<ResourceId, boolean>;
};

export type PersistedGameStateV2 = {
  version: 2;
  savedAt: number;
  money: number;
  warehouse: Warehouse;
  ownedBuildings: Partial<Record<BuildingId, OwnedBuilding>>;
  autoSell: Record<ResourceId, boolean>;
};

export type PersistedGameStateV3 = {
  version: 3;
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
  // A stored building record represents at least one built copy.
  const ownedCount = Math.max(1, sanitizeNonNegativeInteger(raw.ownedCount, 1));

  return {
    id: buildingId,
    ownedCount,
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

export function selectPersistedState(gameData: GameData): PersistedGameStateV3 {
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
 * v1 → v2: buildings gained an `ownedCount`. A building present in a v1 save was
 * built exactly once, so every stored record migrates to `ownedCount: 1`; absent
 * buildings stay absent (an implicit count of 0).
 */
function migrateV1ToV2(v1: Record<string, unknown>): Record<string, unknown> {
  const rawOwned = isRecord(v1.ownedBuildings) ? v1.ownedBuildings : {};
  const ownedBuildings: Record<string, unknown> = {};

  for (const [buildingId, building] of Object.entries(rawOwned)) {
    if (isRecord(building)) {
      ownedBuildings[buildingId] = { ...building, ownedCount: 1 };
    }
  }

  return { ...v1, version: 2, ownedBuildings };
}

/**
 * v2 → v3: the orange production chain added two resources and two buildings.
 * Missing resource slots and autosell flags are filled by the sanitizer.
 */
function migrateV2ToV3(v2: Record<string, unknown>): Record<string, unknown> {
  return { ...v2, version: 3 };
}

/**
 * Migration boundary. Known versions are upgraded to the current schema; an
 * unrecognized or future schema version must not be treated as current data.
 */
export function migrateSave(parsed: unknown): unknown {
  if (!isRecord(parsed)) {
    return null;
  }

  if (parsed.version === SAVE_SCHEMA_VERSION) {
    return parsed;
  }

  if (parsed.version === 2) {
    return migrateV2ToV3(parsed);
  }

  if (parsed.version === 1) {
    return migrateV2ToV3(migrateV1ToV2(parsed));
  }

  return null;
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
