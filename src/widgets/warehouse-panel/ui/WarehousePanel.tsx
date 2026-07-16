import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { ResourceRow } from '../../../entities/resource';
import { selectStoredResourceIds } from '../../../store/selectors';
import { useGameStore } from '../../../store/useGameStore';
import './WarehousePanel.css';

export function WarehousePanel() {
  const { t } = useTranslation();
  // Shallow-compared id list: the panel re-renders only when a resource appears
  // in or disappears from the warehouse, not on every amount change.
  const storedResourceIds = useGameStore(useShallow(selectStoredResourceIds));

  return (
    <section className="warehouse-panel" aria-label={t('tabs.warehouse')}>
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
