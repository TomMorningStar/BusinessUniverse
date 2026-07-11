import { BUILDINGS, BUILDING_IDS } from '../../domain/buildings';
import type { BuildingCategory } from '../../domain/types';
import { useGameStore } from '../../store/useGameStore';
import { BuildingCard } from '../BuildingCard/BuildingCard';
import './BuildingsPanel.css';

type BuildingsPanelProps = {
  category: BuildingCategory;
};

export function BuildingsPanel({ category }: BuildingsPanelProps) {
  const ownedBuildings = useGameStore((state) => state.ownedBuildings);
  const ownedBuildingIds = BUILDING_IDS.filter(
    (buildingId) => ownedBuildings[buildingId] && BUILDINGS[buildingId].category === category,
  );

  if (ownedBuildingIds.length === 0) {
    return null;
  }

  return (
    <section className="buildings-panel" aria-label="Мои здания">
      <ul className="buildings-panel__list">
        {ownedBuildingIds.map((buildingId) => {
          const building = ownedBuildings[buildingId];
          if (!building) {
            return null;
          }

          return (
            <BuildingCard key={buildingId} config={BUILDINGS[buildingId]} building={building} />
          );
        })}
      </ul>
    </section>
  );
}
