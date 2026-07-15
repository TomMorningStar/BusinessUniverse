import { RESOURCE_IDS } from '../../domain/resources';
import { useGameStore } from '../../store/useGameStore';
import { ResourceRow } from '../ResourceRow/ResourceRow';
import './WarehousePanel.css';

export function WarehousePanel() {
  const warehouse = useGameStore((state) => state.warehouse);
  const storedResourceIds = RESOURCE_IDS.filter((resourceId) => warehouse[resourceId].amount > 0);

  return (
    <section className="warehouse-panel" aria-label="Склад">
      {storedResourceIds.length > 0 && (
        <ul className="warehouse-panel__list">
          {storedResourceIds.map((resourceId) => (
            <ResourceRow key={resourceId} resourceId={resourceId} />
          ))}
        </ul>
      )}
    </section>
  );
}
