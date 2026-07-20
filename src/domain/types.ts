export type ResourceId = 'potato' | 'chips' | 'wheat' | 'orange' | 'wood' | 'planks' | 'stone';

export type BuildingId =
  | 'potato_farm'
  | 'chips_factory'
  | 'wheat_field'
  | 'orange_grove'
  | 'lumberjack'
  | 'sawmill'
  | 'quarry'
  | 'settler_house'
  | 'artisan_house';

/** `settler`s run simple raw-material production; `artisan`s run processing factories. */
export type PopulationClassId = 'settler' | 'artisan';

export type ResourceAmount = {
  resourceId: ResourceId;
  amount: number;
};

export type BuildingCategory = 'raw_material' | 'construction' | 'factory' | 'housing';

/** Groups resources by which building category produces them (housing produces
 * no resources, so it's excluded); drives the warehouse panel's filter buttons. */
export type ResourceCategory = Exclude<BuildingCategory, 'housing'>;

/**
 * Configs carry no display names: user-facing text lives in the i18n
 * dictionaries and is resolved by id (`resources.<id>.name`) at the UI level.
 */
export type ResourceConfig = {
  id: ResourceId;
  emoji: string;
  sellPrice: number;
  initialCapacity: number;
  category: ResourceCategory;
};

/**
 * Cost of the first copy (`ownedCount === 0`): a money amount plus, for buildings
 * beyond the earliest "bootstrap" tier, a list of stored resources the warehouse
 * must hold. `resources` is empty for bootstrap buildings (e.g. `potato_farm`,
 * `lumberjack`, `quarry`) so the player is never blocked from the very first
 * purchase by resources they have no way to produce yet.
 */
export type ConstructionCost = {
  money: number;
  resources: readonly ResourceAmount[];
};

/** A production building's per-copy labor requirement, scaled by `ownedCount`. */
export type WorkforceRequirement = {
  populationClassId: PopulationClassId;
  required: number;
};

/** A housing building's per-copy population capacity for one class. */
export type HousingCapacity = {
  populationClassId: PopulationClassId;
  capacity: number;
};

export type BuildingConfig = {
  id: BuildingId;
  emoji: string;
  category: BuildingCategory;
  constructionCost: ConstructionCost;
  /** Per-copy price multiplier applied to both `constructionCost.money` and every
   * `constructionCost.resources` amount: `unitCost = baseCost * costGrowthRate **
   * ownedCount`. Must be > 1 so mass-buying a single building type has diminishing
   * returns instead of staying the best move forever. */
  costGrowthRate: number;
  cycleDurationMs: number;
  inputs: readonly ResourceAmount[];
  outputs: readonly ResourceAmount[];
  /** Present on production buildings: the cycle cannot start without this labor. */
  workforce?: WorkforceRequirement;
  /** Present on housing buildings; such buildings have no recipe (`outputs` is
   * empty) and are skipped by the production tick entirely. */
  housing?: HousingCapacity;
};

export type WarehouseSlot = {
  amount: number;
  capacity: number;
};

export type Warehouse = Record<ResourceId, WarehouseSlot>;

export type BuildingRunStatus =
  'idle' | 'running' | 'waiting_for_inputs' | 'waiting_for_workers' | 'output_blocked';

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

/** How many copies of each building are owned; the minimal input population
 * calculations need (not the full `OwnedBuilding` record). */
export type OwnedCounts = Partial<Record<BuildingId, number>>;

export type PopulationClassState = {
  total: number;
  employed: number;
  available: number;
};

export type PopulationState = Record<PopulationClassId, PopulationClassState>;

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
