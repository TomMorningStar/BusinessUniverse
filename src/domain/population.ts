import { BUILDINGS, BUILDING_IDS } from './buildings';
import type {
  BuildingConfig,
  BuildingId,
  OwnedCounts,
  PopulationClassId,
  PopulationState,
} from './types';

type PopulationTotals = Record<PopulationClassId, number>;

function emptyTotals(): PopulationTotals {
  return { settler: 0, artisan: 0 };
}

/** Total housing capacity per population class, derived from owned housing buildings. */
export function getPopulationCapacity(ownedCounts: OwnedCounts): PopulationTotals {
  const totals = emptyTotals();

  for (const buildingId of BUILDING_IDS) {
    // Explicit annotation: indexing BUILDINGS with the BuildingId union otherwise
    // infers the narrow per-building literal type, which drops optional fields a
    // specific building's literal happens not to declare (e.g. `housing`).
    const config: BuildingConfig = BUILDINGS[buildingId];

    if (!config.housing) {
      continue;
    }

    const ownedCount = ownedCounts[buildingId] ?? 0;
    totals[config.housing.populationClassId] += config.housing.capacity * ownedCount;
  }

  return totals;
}

export type WorkforceStatus = {
  staffed: boolean;
  /** Exact shortfall against the pool remaining at the time this building was
   * considered, for the "missing N workers" message. 0 when `staffed` is true. */
  missingWorkers: number;
};

export type WorkforceAllocation = {
  capacity: PopulationTotals;
  employed: PopulationTotals;
  statusByBuilding: Partial<Record<BuildingId, WorkforceStatus>>;
};

/**
 * Fixed-priority workforce allocation (the "first version" model called for by
 * the roadmap): walks buildings in a fixed declaration order and fully staffs a
 * building's *entire* owned group if the remaining pool covers its total
 * requirement, otherwise leaves that whole group completely unstaffed for this
 * tick. There is no partial/per-copy staffing and no manual priority yet — both
 * are explicitly deferred to a later stage.
 */
export function allocateWorkforce(ownedCounts: OwnedCounts): WorkforceAllocation {
  const capacity = getPopulationCapacity(ownedCounts);
  const remaining = { ...capacity };
  const employed = emptyTotals();
  const statusByBuilding: WorkforceAllocation['statusByBuilding'] = {};

  for (const buildingId of BUILDING_IDS) {
    const config: BuildingConfig = BUILDINGS[buildingId];

    if (!config.workforce) {
      continue;
    }

    const ownedCount = ownedCounts[buildingId] ?? 0;

    if (ownedCount < 1) {
      continue;
    }

    const classId = config.workforce.populationClassId;
    const demand = config.workforce.required * ownedCount;

    if (remaining[classId] >= demand) {
      remaining[classId] -= demand;
      employed[classId] += demand;
      statusByBuilding[buildingId] = { staffed: true, missingWorkers: 0 };
    } else {
      statusByBuilding[buildingId] = {
        staffed: false,
        missingWorkers: demand - remaining[classId],
      };
    }
  }

  return { capacity, employed, statusByBuilding };
}

/** Required/employed/available per population class, for the population summary UI. */
export function getPopulationState(ownedCounts: OwnedCounts): PopulationState {
  const { capacity, employed } = allocateWorkforce(ownedCounts);
  const classIds: readonly PopulationClassId[] = ['settler', 'artisan'];
  const state = {} as PopulationState;

  for (const classId of classIds) {
    state[classId] = {
      total: capacity[classId],
      employed: employed[classId],
      available: capacity[classId] - employed[classId],
    };
  }

  return state;
}
