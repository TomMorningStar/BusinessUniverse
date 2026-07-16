import { useTranslation } from 'react-i18next';
import { BUILDINGS, BUILDING_IDS } from '../../../domain/buildings';
import type { BuildingCategory } from '../../../domain/types';
import { BuildingCard } from '../../../entities/building';
import './BuildingsPanel.css';

type BuildingsPanelProps = {
  category: BuildingCategory;
  buildQuantity: number;
};

export function BuildingsPanel({ category, buildQuantity }: BuildingsPanelProps) {
  const { t } = useTranslation();
  const buildingIds = BUILDING_IDS.filter(
    (buildingId) => BUILDINGS[buildingId].category === category,
  );

  if (buildingIds.length === 0) {
    return null;
  }

  return (
    <section className="buildings-panel" aria-label={t('panels.buildings')}>
      <ul className="buildings-panel__list">
        {buildingIds.map((buildingId) => (
          <BuildingCard key={buildingId} config={BUILDINGS[buildingId]} quantity={buildQuantity} />
        ))}
      </ul>
    </section>
  );
}
