import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import type { ResourceCategory } from '../../../domain/types';
import { ResourceRow } from '../../../entities/resource';
import { selectStoredResourceIds } from '../../../store/selectors';
import { useGameStore } from '../../../store/useGameStore';
import './WarehousePanel.css';

type ResourceFilter = 'all' | ResourceCategory;

/** Order drives both the button row and the i18n key lookup — 'all' has its own
 * key, the rest reuse the matching `tabs.<category>` label. */
const FILTERS: readonly ResourceFilter[] = ['all', 'raw_material', 'construction', 'factory'];

export function WarehousePanel() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ResourceFilter>('all');
  // Shallow-compared id list: the panel re-renders only when a resource appears
  // in or disappears from the warehouse, not on every amount change.
  const storedResourceIds = useGameStore(useShallow(selectStoredResourceIds(filter)));

  return (
    <section className="warehouse-panel" aria-label={t('panels.warehouse')}>
      <div className="warehouse-panel__filters" role="group" aria-label={t('warehouse.filterAria')}>
        {FILTERS.map((filterOption) => (
          <button
            key={filterOption}
            type="button"
            className="warehouse-panel__filter glass-btn"
            aria-pressed={filter === filterOption}
            onClick={() => setFilter(filterOption)}
          >
            {t(filterOption === 'all' ? 'warehouse.filterAll' : `tabs.${filterOption}`)}
          </button>
        ))}
      </div>
      {storedResourceIds.length > 0 ? (
        <ul className="warehouse-panel__list">
          {storedResourceIds.map((resourceId) => (
            <ResourceRow key={resourceId} resourceId={resourceId} />
          ))}
        </ul>
      ) : (
        <p className="warehouse-panel__empty glass">{t('warehouse.empty')}</p>
      )}
    </section>
  );
}
