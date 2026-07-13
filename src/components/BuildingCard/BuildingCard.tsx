import { getBuildTotalCost, planBuild } from '../../domain/economy';
import { getStartBlockReason } from '../../domain/production';
import { RESOURCES } from '../../domain/resources';
import type {
  BuildingConfig,
  BuildingRunStatus,
  ProductionBlockReason,
  ResourceAmount,
} from '../../domain/types';
import { formatMoney } from '../../utils/formatMoney';
import { useGameStore } from '../../store/useGameStore';
import { EmojiIcon } from '../EmojiIcon/EmojiIcon';
import { ResourceAmountIcons } from '../ResourceAmountIcons/ResourceAmountIcons';
import './BuildingCard.css';

const STATUS_LABELS: Record<BuildingRunStatus, string> = {
  idle: 'Ожидание запуска',
  running: 'Производство',
  waiting_for_inputs: 'Ожидает сырьё',
  output_blocked: 'Склад заполнен',
};

function formatResourceAmount(resourceAmount: ResourceAmount): string {
  const config = RESOURCES[resourceAmount.resourceId];
  return `${resourceAmount.amount} ${config.emoji} ${config.name}`;
}

function formatRecipe(config: BuildingConfig): string {
  const outputs = config.outputs.map(formatResourceAmount).join(', ');

  if (config.inputs.length === 0) {
    return outputs;
  }

  return `${config.inputs.map(formatResourceAmount).join(', ')} → ${outputs}`;
}

function formatBlockReason(reason: ProductionBlockReason): string {
  const resourceConfig = RESOURCES[reason.resourceId];

  if (reason.type === 'missing_input') {
    return `Не хватает ${resourceConfig.emoji} ${resourceConfig.name}: нужно ещё ${reason.missingAmount}`;
  }

  return `Склад заполнен: ${resourceConfig.emoji} ${resourceConfig.name}`;
}

type BuildingCardProps = {
  config: BuildingConfig;
  quantity: number;
};

export function BuildingCard({ config, quantity }: BuildingCardProps) {
  const money = useGameStore((state) => state.money);
  const warehouse = useGameStore((state) => state.warehouse);
  const autoSell = useGameStore((state) => state.autoSell);
  const building = useGameStore((state) => state.ownedBuildings[config.id]);
  const buyBuilding = useGameStore((state) => state.buyBuilding);
  const toggleAutoSell = useGameStore((state) => state.toggleAutoSell);

  const ownedCount = building?.ownedCount ?? 0;
  const isBuilt = ownedCount >= 1;
  const cycleSeconds = config.cycleDurationMs / 1000;

  const selectedCost = getBuildTotalCost(config, ownedCount, quantity);
  const plan = planBuild(money, config, ownedCount, quantity);
  const canBuild = plan.count >= 1;

  const isBlocked =
    isBuilt &&
    building !== undefined &&
    (building.status === 'waiting_for_inputs' || building.status === 'output_blocked');
  const blockReason = isBlocked
    ? getStartBlockReason({ warehouse, autoSell }, config, ownedCount)
    : null;
  const statusText =
    isBuilt && building
      ? blockReason
        ? formatBlockReason(blockReason)
        : STATUS_LABELS[building.status]
      : '';

  const categoryModifierClass =
    config.category === 'factory' ? 'building-card--factory' : 'building-card--raw';
  const statusModifierClass =
    isBuilt && building
      ? isBlocked
        ? 'building-card--blocked'
        : `building-card--${building.status}`
      : '';

  return (
    <li
      className={`building-card glass ${categoryModifierClass} ${statusModifierClass}`.trim()}
      title={statusText || undefined}
    >
      <div className="building-card__icon">
        <EmojiIcon emoji={config.emoji} animated />
      </div>

      <div className="building-card__content">
        <div className="building-card__head">
          <h3 className="building-card__name">{config.name}</h3>
          {isBuilt && <span className="building-card__count">Построено: {ownedCount}</span>}
        </div>

        <p
          className="building-card__stats"
          aria-label={`${formatRecipe(config)}, цикл ${cycleSeconds} сек`}
        >
          <span className="building-card__stats-visual" aria-hidden="true">
            {config.inputs.length > 0 && (
              <>
                <ResourceAmountIcons amounts={config.inputs} size={16} />
                <span className="building-card__stats-arrow">→</span>
              </>
            )}
            <ResourceAmountIcons amounts={config.outputs} size={16} />
            <span className="building-card__stats-cycle">⏱ {cycleSeconds} сек</span>
          </span>
        </p>

        <div className="building-card__autosell">
          {isBuilt &&
            config.outputs.map((output) => (
              <label key={output.resourceId} className="building-card__autosell-toggle">
                <input
                  type="checkbox"
                  checked={autoSell[output.resourceId]}
                  onChange={() => toggleAutoSell(output.resourceId)}
                />
                <span>
                  {config.outputs.length > 1
                    ? `Автопродажа: ${RESOURCES[output.resourceId].name}`
                    : 'Автопродажа'}
                </span>
              </label>
            ))}
          <button
            type="button"
            className="building-card__build-button glass-btn"
            onClick={() => buyBuilding(config.id, quantity)}
            disabled={!canBuild}
          >
            Построить {formatMoney(selectedCost)}
          </button>
        </div>

        {isBuilt && <span className="visually-hidden">{statusText}</span>}
      </div>
    </li>
  );
}
