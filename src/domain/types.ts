export type ResourceId = 'potato' | 'chips' | 'wheat' | 'orange';

export type BuildingId = 'potato_farm' | 'chips_factory' | 'wheat_field' | 'orange_grove';

export type ResourceAmount = {
  resourceId: ResourceId;
  amount: number;
};

/**
 * Configs carry no display names: user-facing text lives in the i18n
 * dictionaries and is resolved by id (`resources.<id>.name`) at the UI level.
 */
export type ResourceConfig = {
  id: ResourceId;
  emoji: string;
  sellPrice: number;
  initialCapacity: number;
};

export type BuildingCategory = 'raw_material' | 'factory';

export type BuildingConfig = {
  id: BuildingId;
  emoji: string;
  category: BuildingCategory;
  purchaseCost: number;
  cycleDurationMs: number;
  inputs: readonly ResourceAmount[];
  outputs: readonly ResourceAmount[];
};

export type WarehouseSlot = {
  amount: number;
  capacity: number;
};

export type Warehouse = Record<ResourceId, WarehouseSlot>;

export type BuildingRunStatus = 'idle' | 'running' | 'waiting_for_inputs' | 'output_blocked';

export type OwnedBuilding = {
  id: BuildingId;
  /** How many copies of this building the player has built. Production scales by this. */
  ownedCount: number;
  progressMs: number;
  isCycleActive: boolean;
  status: BuildingRunStatus;
};

export type ProductionBlockReason =
  | { type: 'missing_input'; resourceId: ResourceId; missingAmount: number }
  | { type: 'output_full'; resourceId: ResourceId; requiredSpace: number };

export type ProductionEvent = {
  buildingId: BuildingId;
  storedOutputs: readonly ResourceAmount[];
  autoSoldOutputs: readonly ResourceAmount[];
};

export type GameData = {
  money: number;
  warehouse: Warehouse;
  ownedBuildings: Partial<Record<BuildingId, OwnedBuilding>>;
  autoSell: Record<ResourceId, boolean>;
};

export type GameActions = {
  /** Builds up to `quantity` copies, or as many as the player can afford. */
  buyBuilding: (buildingId: BuildingId, quantity: number) => void;
  sellAll: (resourceId: ResourceId) => void;
  toggleAutoSell: (resourceId: ResourceId) => void;
  tick: (deltaMs: number) => void;
  loadGame: () => void;
  saveGame: () => void;
  resetGame: () => void;
};

export type GameState = GameData & GameActions;
