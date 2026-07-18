import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { BUILDING_IDS } from '../../../domain/buildings';
import { getPopulationState } from '../../../domain/population';
import type { OwnedCounts, PopulationClassId } from '../../../domain/types';
import { formatNumber } from '../../../shared/i18n';
import { selectBuildingOwnedCounts } from '../../../store/selectors';
import { useGameStore } from '../../../store/useGameStore';
import './PopulationSummary.css';

const POPULATION_CLASS_IDS: readonly PopulationClassId[] = ['settler', 'artisan'];

/**
 * Required/employed/available residents per class (roadmap: "UI показывает
 * требуемых, занятых и свободных жителей"). Subscribes only to every building's
 * `ownedCount` via `useShallow` — capacity and staffing only change on a
 * purchase, so this does not re-render on the production tick's progress churn.
 */
export function PopulationSummary() {
  const { t } = useTranslation();
  const ownedCounts = useGameStore(useShallow(selectBuildingOwnedCounts(BUILDING_IDS)));

  const counts: OwnedCounts = {};
  BUILDING_IDS.forEach((buildingId, index) => {
    if (ownedCounts[index] > 0) {
      counts[buildingId] = ownedCounts[index];
    }
  });

  const population = getPopulationState(counts);

  return (
    <section className="population-summary glass" aria-label={t('population.summary.title')}>
      <h2 className="population-summary__title">{t('population.summary.title')}</h2>
      <ul className="population-summary__list">
        {POPULATION_CLASS_IDS.map((classId) => {
          const state = population[classId];

          return (
            <li key={classId} className="population-summary__row">
              {t('population.summary.classRow', {
                className: t(`population.${classId}.name`),
                total: formatNumber(state.total),
                employed: formatNumber(state.employed),
                available: formatNumber(state.available),
              })}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
