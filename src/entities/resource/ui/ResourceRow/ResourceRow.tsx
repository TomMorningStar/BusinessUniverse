import { getSaleIncome } from '../../../../domain/economy';
import { RESOURCES } from '../../../../domain/resources';
import type { ResourceId } from '../../../../domain/types';
import { formatMoney } from '../../../../shared/lib/formatMoney';
import { EmojiIcon } from '../../../../shared/ui/EmojiIcon/EmojiIcon';
import { selectResourceSlot } from '../../../../store/selectors';
import { useGameStore } from '../../../../store/useGameStore';
import './ResourceRow.css';

type ResourceRowProps = {
  resourceId: ResourceId;
};

export function ResourceRow({ resourceId }: ResourceRowProps) {
  const slot = useGameStore(selectResourceSlot(resourceId));
  const sellAll = useGameStore((state) => state.sellAll);

  const config = RESOURCES[resourceId];
  const saleValue = getSaleIncome(resourceId, slot.amount);
  const canSell = slot.amount > 0;

  return (
    <li className="resource-row glass">
      <EmojiIcon emoji={config.emoji} animated className="resource-row__icon" />
      <span className="resource-row__name">{config.name}</span>
      <span className="resource-row__stock">
        {slot.amount} / {slot.capacity}
      </span>
      <span className="resource-row__value">{formatMoney(saleValue)}</span>
      <span className="resource-row__sell">
        <button
          type="button"
          className="resource-row__sell-button glass-btn"
          onClick={() => sellAll(resourceId)}
          disabled={!canSell}
        >
          {canSell ? 'Продать всё' : 'Пусто'}
        </button>
      </span>
    </li>
  );
}
