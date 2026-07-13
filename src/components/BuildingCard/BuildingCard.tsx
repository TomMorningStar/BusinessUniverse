import { useState, type CSSProperties } from 'react';
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
import { getProgressPercent } from '../../utils/getProgressPercent';
import { useGameStore } from '../../store/useGameStore';
import { EmojiIcon } from '../EmojiIcon/EmojiIcon';
import { QuantityStepper } from '../QuantityStepper/QuantityStepper';
import { ResourceAmountIcons } from '../ResourceAmountIcons/ResourceAmountIcons';
import './BuildingCard.css';

/** Batch sizes offered by the per-card build quantity picker. */
const BUILD_QUANTITY_OPTIONS = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000] as const;

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
};

export function BuildingCard({ config }: BuildingCardProps) {
  // Selected build quantity is per-card UI state, never persisted (resets to ×1).
  const [quantity, setQuantity] = useState<number>(1);

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

  const progressPercent =
    isBuilt && building ? getProgressPercent(building.progressMs, config.cycleDurationMs) : 0;
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

  const progressStyle = { '--progress': `${progressPercent}%` } as CSSProperties;

  return (
    <li
      className={`building-card glass ${categoryModifierClass} ${statusModifierClass}`.trim()}
      style={progressStyle}
      title={statusText || undefined}
    >
      {isBuilt && (
        <div className="building-card__fill" aria-hidden="true">
          <div className="building-card__progress-fill" />
        </div>
      )}

      <div className="building-card__icon">
        <EmojiIcon emoji={config.emoji} animated />
      </div>

      <div className="building-card__content">
        <div className="building-card__head">
          <h3 className="building-card__name">{config.name}</h3>
          {isBuilt && (
            <span className="building-card__count">Построено: {ownedCount}</span>
          )}
        </div>

        <p className="building-card__stats" aria-label={`${formatRecipe(config)}, цикл ${cycleSeconds} сек`}>
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

        {isBuilt && (
          <div className="building-card__autosell">
            {config.outputs.map((output) => (
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
          </div>
        )}

        <div className="building-card__build">
          <QuantityStepper
            value={quantity}
            options={BUILD_QUANTITY_OPTIONS}
            onChange={setQuantity}
            label="Количество для постройки"
          />
          <span className="building-card__cost">Стоимость: {formatMoney(selectedCost)}</span>
          <button
            type="button"
            className="building-card__build-button glass-btn glass-btn--success"
            onClick={() => buyBuilding(config.id, quantity)}
            disabled={!canBuild}
          >
            Построить ×{quantity}
          </button>
        </div>

        {isBuilt && (
          <>
            <progress
              className="visually-hidden"
              value={progressPercent}
              max={100}
              aria-label={`Прогресс производства: ${config.name}`}
            />
            <span className="visually-hidden">{statusText}</span>
          </>
        )}
      </div>
    </li>
  );
}
