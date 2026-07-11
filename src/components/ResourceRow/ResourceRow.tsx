import { getSaleIncome } from '../../domain/economy';
import { RESOURCES } from '../../domain/resources';
import type { ResourceId } from '../../domain/types';
import { formatMoney } from '../../utils/formatMoney';
import { useGameStore } from '../../store/useGameStore';
import { EmojiIcon } from '../EmojiIcon/EmojiIcon';
import './ResourceRow.css';

type ResourceRowProps = {
  resourceId: ResourceId;
};

export function ResourceRow({ resourceId }: ResourceRowProps) {
  const slot = useGameStore((state) => state.warehouse[resourceId]);
  const isAutoSellOn = useGameStore((state) => state.autoSell[resourceId]);
  const sellAll = useGameStore((state) => state.sellAll);
  const toggleAutoSell = useGameStore((state) => state.toggleAutoSell);

  const config = RESOURCES[resourceId];
  const saleValue = getSaleIncome(resourceId, slot.amount);
  const canSell = slot.amount > 0;

  return (
    <li className="resource-row">
      <EmojiIcon emoji={config.emoji} size={28} animated className="resource-row__icon" />
      <span className="resource-row__name">{config.name}</span>
      <span className="resource-row__stock">
        {slot.amount} / {slot.capacity}
      </span>
      <span className="resource-row__value">{formatMoney(saleValue)}</span>
      <label className="resource-row__auto-sell">
        <input type="checkbox" checked={isAutoSellOn} onChange={() => toggleAutoSell(resourceId)} />
        Автопродажа
      </label>
      <span className="resource-row__sell">
        <button
          type="button"
          className="resource-row__sell-button"
          onClick={() => sellAll(resourceId)}
          disabled={!canSell}
        >
          {canSell ? 'Продать всё' : 'Пусто'}
        </button>
      </span>
    </li>
  );
}
