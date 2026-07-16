import { create } from 'zustand';
import { BUILDINGS } from '../domain/buildings';
import { getSaleIncome, planBuild } from '../domain/economy';
import { createInitialGameData } from '../domain/initialState';
import { advanceAllBuildings } from '../domain/production';
import { RESOURCES } from '../domain/resources';
import { clearSave, loadGameData, saveGameData } from '../domain/save';
import type { BuildingId, GameState, OwnedBuilding, ResourceId } from '../domain/types';
import { removeResources } from '../domain/warehouse';
import { formatMoney } from '../shared/lib/formatMoney';
import { useNoticesStore } from './useNoticesStore';

export const useGameStore = create<GameState>()((set, get) => ({
  ...loadGameData(),

  buyBuilding: (buildingId: BuildingId, quantity: number) => {
    const state = get();
    const config = BUILDINGS[buildingId];
    const existing = state.ownedBuildings[buildingId];
    const ownedCount = existing?.ownedCount ?? 0;

    const plan = planBuild(state.money, config, ownedCount, quantity);

    if (plan.count <= 0) {
      return;
    }

    const nextBuilding: OwnedBuilding = existing
      ? { ...existing, ownedCount: ownedCount + plan.count }
      : {
          id: buildingId,
          ownedCount: plan.count,
          progressMs: 0,
          isCycleActive: false,
          status: 'idle',
        };

    set({
      money: state.money - plan.totalCost,
      ownedBuildings: {
        ...state.ownedBuildings,
        [buildingId]: nextBuilding,
      },
    });
    get().saveGame();
    useNoticesStore.getState().addNotice(`${config.name} ×${plan.count}`);
  },

  sellAll: (resourceId: ResourceId) => {
    const state = get();
    const slot = state.warehouse[resourceId];

    if (slot.amount <= 0) {
      return;
    }

    const removalResult = removeResources(state.warehouse, [{ resourceId, amount: slot.amount }]);

    if (!removalResult.ok) {
      return;
    }

    const income = getSaleIncome(resourceId, slot.amount);

    set({
      money: state.money + income,
      warehouse: removalResult.warehouse,
    });
    get().saveGame();
    useNoticesStore
      .getState()
      .addNotice(`${formatMoney(income)} за ${RESOURCES[resourceId].name.toLowerCase()}`);
  },

  toggleAutoSell: (resourceId: ResourceId) => {
    const state = get();

    set({
      autoSell: {
        ...state.autoSell,
        [resourceId]: !state.autoSell[resourceId],
      },
    });
    get().saveGame();
  },

  tick: (deltaMs: number) => {
    const state = get();
    const result = advanceAllBuildings(state, deltaMs);

    // Production is a hot path (runs every simulation step). It never writes to
    // storage; persistence is handled by the periodic autosave, `pagehide`, and
    // the discrete user actions below (buy/sell/toggle/reset).
    if (result.gameData !== state) {
      set(result.gameData);
    }
  },

  loadGame: () => {
    set(loadGameData());
  },

  saveGame: () => {
    saveGameData(get());
  },

  resetGame: () => {
    clearSave();
    const freshData = createInitialGameData();
    set(freshData);
    saveGameData(freshData);
    useNoticesStore.setState({ notices: [] });
  },
}));
