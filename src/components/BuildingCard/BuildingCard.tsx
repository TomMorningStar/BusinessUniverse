import type { CSSProperties } from 'react';
import { getStartBlockReason } from '../../domain/production';
import { RESOURCES } from '../../domain/resources';
import type {
  BuildingConfig,
  BuildingRunStatus,
  OwnedBuilding,
  ProductionBlockReason,
  ResourceAmount,
} from '../../domain/types';
import { getProgressPercent } from '../../utils/getProgressPercent';
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
  const inputs = config.inputs.map(formatResourceAmount).join(', ');
  return `${inputs} → ${outputs}`;
}

function formatCompactStats(config: BuildingConfig): string {
  const cycleSeconds = config.cycleDurationMs / 1000;
  const outputs = config.outputs.map((output) => `+${output.amount}`).join(', ');
  return `${outputs}/${cycleSeconds}с`;
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
  building: OwnedBuilding;
};

export function BuildingCard({ config, building }: BuildingCardProps) {
  const warehouse = useGameStore((state) => state.warehouse);
  const autoSell = useGameStore((state) => state.autoSell);

  const progressPercent = getProgressPercent(building.progressMs, config.cycleDurationMs);
  const cycleSeconds = config.cycleDurationMs / 1000;
  const isBlocked =
    building.status === 'waiting_for_inputs' || building.status === 'output_blocked';
  const blockReason = isBlocked ? getStartBlockReason({ warehouse, autoSell }, config) : null;
  const statusText = blockReason ? formatBlockReason(blockReason) : STATUS_LABELS[building.status];
  const progressStyle = { '--progress': `${progressPercent}%` } as CSSProperties;
  const statusModifierClass = isBlocked
    ? 'building-card--blocked'
    : `building-card--${building.status}`;

  return (
    <li className={`building-card ${statusModifierClass}`} style={progressStyle} title={statusText}>
      <div className="building-card__progress-fill" aria-hidden="true" />
      <div className="building-card__icon">
        <EmojiIcon emoji={config.emoji} size={40} animated />
      </div>
      <div className="building-card__content">
        <h3 className="building-card__name">{config.name}</h3>
        {config.inputs.length === 0 ? (
          <p className="building-card__stats" aria-label={formatCompactStats(config)}>
            <span className="building-card__stats-visual" aria-hidden="true">
              +<ResourceAmountIcons amounts={config.outputs} size={16} />/{cycleSeconds}с
            </span>
          </p>
        ) : (
          <>
            <p className="building-card__recipe">{formatRecipe(config)}</p>
            <p className="building-card__cycle">Цикл: {cycleSeconds} с</p>
          </>
        )}
        <progress
          className="visually-hidden"
          value={progressPercent}
          max={100}
          aria-label={`Прогресс производства: ${config.name}`}
        />
        <span className="visually-hidden">{statusText}</span>
      </div>
    </li>
  );
}
