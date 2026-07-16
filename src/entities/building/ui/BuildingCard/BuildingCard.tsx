import { useShallow } from 'zustand/react/shallow';
import { getBuildTotalCost, planBuild } from '../../../../domain/economy';
import { getStartBlockReason } from '../../../../domain/production';
import { RESOURCES } from '../../../../domain/resources';
import type {
  BuildingConfig,
  BuildingRunStatus,
  ProductionBlockReason,
  ResourceAmount,
  ResourceId,
  Warehouse,
} from '../../../../domain/types';
import { ResourceAmountIcons } from '../../../resource';
import { formatMoney } from '../../../../shared/lib/formatMoney';
import { useIconAnimationPause } from '../../../../shared/lib/iconAnimation';
import { EmojiIcon } from '../../../../shared/ui/EmojiIcon/EmojiIcon';
import {
  selectAutoSellFlags,
  selectBuildingOwnedCount,
  selectBuildingStatus,
  selectMoney,
  selectResourceSlots,
} from '../../../../store/selectors';
import { useGameStore } from '../../../../store/useGameStore';
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

/**
 * Owns only the parts that change rarely — the (heavy) animated icon, the recipe
 * visual, and the name/count — driven by two primitive subscriptions: `ownedCount`
 * and `status`. Money and warehouse changes are confined to the child components
 * below, so an auto-sell payout or a resource tick never re-renders the icon.
 */
export function BuildingCard({ config, quantity }: BuildingCardProps) {
  const ownedCount = useGameStore(selectBuildingOwnedCount(config.id));
  const status = useGameStore(selectBuildingStatus(config.id));
  const iconRef = useIconAnimationPause();

  const isBuilt = ownedCount >= 1;
  const cycleSeconds = config.cycleDurationMs / 1000;

  const isBlocked = isBuilt && (status === 'waiting_for_inputs' || status === 'output_blocked');
  const statusLabel = isBuilt && status !== null ? STATUS_LABELS[status] : '';

  const categoryModifierClass =
    config.category === 'factory' ? 'building-card--factory' : 'building-card--raw';
  const statusModifierClass =
    isBuilt && status !== null
      ? isBlocked
        ? 'building-card--blocked'
        : `building-card--${status}`
      : '';

  return (
    <li
      className={`building-card glass ${categoryModifierClass} ${statusModifierClass}`.trim()}
      title={statusLabel || undefined}
    >
      <div className="building-card__icon" ref={iconRef}>
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
                <ResourceAmountIcons amounts={config.inputs} />
                <span className="building-card__stats-arrow">→</span>
              </>
            )}
            <ResourceAmountIcons amounts={config.outputs} />
            <span className="building-card__stats-cycle">⏱ {cycleSeconds} сек</span>
          </span>
        </p>

        <div className="building-card__autosell">
          {isBuilt && <AutoSellToggles config={config} />}
          <BuildButton config={config} ownedCount={ownedCount} quantity={quantity} />
        </div>

        {isBuilt &&
          status !== null &&
          (isBlocked ? (
            <BlockReasonText config={config} ownedCount={ownedCount} fallback={statusLabel} />
          ) : (
            <span className="visually-hidden">{statusLabel}</span>
          ))}
      </div>
    </li>
  );
}

/** Subscribes only to money, so auto-sell payouts re-render just the button. */
function BuildButton({
  config,
  ownedCount,
  quantity,
}: {
  config: BuildingConfig;
  ownedCount: number;
  quantity: number;
}) {
  const money = useGameStore(selectMoney);
  const buyBuilding = useGameStore((state) => state.buyBuilding);

  const selectedCost = getBuildTotalCost(config, ownedCount, quantity);
  const canBuild = planBuild(money, config, ownedCount, quantity).count >= 1;

  return (
    <button
      type="button"
      className="building-card__build-button glass-btn"
      onClick={() => buyBuilding(config.id, quantity)}
      disabled={!canBuild}
    >
      Построить {formatMoney(selectedCost)}
    </button>
  );
}

/** Subscribes only to the auto-sell flags of this building's outputs. */
function AutoSellToggles({ config }: { config: BuildingConfig }) {
  const outputIds = config.outputs.map((output) => output.resourceId);
  const flags = useGameStore(useShallow(selectAutoSellFlags(outputIds)));
  const toggleAutoSell = useGameStore((state) => state.toggleAutoSell);

  return (
    <>
      {config.outputs.map((output, index) => (
        <label key={output.resourceId} className="building-card__autosell-toggle">
          <input
            type="checkbox"
            checked={flags[index]}
            onChange={() => toggleAutoSell(output.resourceId)}
          />
          <span>
            {config.outputs.length > 1
              ? `Автопродажа: ${RESOURCES[output.resourceId].name}`
              : 'Автопродажа'}
          </span>
        </label>
      ))}
    </>
  );
}

/**
 * Renders the precise block reason for screen readers. Subscribes only to the
 * warehouse slots and auto-sell flags of this recipe (via `useShallow`), so its
 * text refreshes when the relevant stock changes without touching the rest of the
 * card. Mounted only while the building is actually blocked.
 */
function BlockReasonText({
  config,
  ownedCount,
  fallback,
}: {
  config: BuildingConfig;
  ownedCount: number;
  fallback: string;
}) {
  const inputIds = config.inputs.map((input) => input.resourceId);
  const outputIds = config.outputs.map((output) => output.resourceId);
  const inputSlots = useGameStore(useShallow(selectResourceSlots(inputIds)));
  const outputSlots = useGameStore(useShallow(selectResourceSlots(outputIds)));
  const outputAutoSell = useGameStore(useShallow(selectAutoSellFlags(outputIds)));

  // Reconstruct just the slice of the warehouse/auto-sell this recipe needs so the
  // shared domain query can compute the exact missing amount or overflow.
  const warehouse = {} as Warehouse;
  inputIds.forEach((resourceId, index) => {
    warehouse[resourceId] = inputSlots[index];
  });
  outputIds.forEach((resourceId, index) => {
    warehouse[resourceId] = outputSlots[index];
  });

  const autoSell = {} as Record<ResourceId, boolean>;
  outputIds.forEach((resourceId, index) => {
    autoSell[resourceId] = outputAutoSell[index];
  });

  const reason = getStartBlockReason({ warehouse, autoSell }, config, ownedCount);
  const text = reason ? formatBlockReason(reason) : fallback;

  return <span className="visually-hidden">{text}</span>;
}
