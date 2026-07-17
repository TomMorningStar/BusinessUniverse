import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { useShallow } from 'zustand/react/shallow';
import {
  getBuildTotalCost,
  getConstructionShortfall,
  planBuild,
  type BuildTotalCost,
  type ConstructionShortfall,
} from '../../../../domain/economy';
import { getStartBlockReason } from '../../../../domain/production';
import { RESOURCES } from '../../../../domain/resources';
import type {
  BuildingConfig,
  ProductionBlockReason,
  ResourceAmount,
  ResourceId,
  Warehouse,
} from '../../../../domain/types';
import { ResourceAmountIcons } from '../../../resource';
import { formatMoney, formatNumber, formatPercent } from '../../../../shared/i18n';
import { useIconAnimationPause } from '../../../../shared/lib/iconAnimation';
import { EmojiIcon } from '../../../../shared/ui/EmojiIcon/EmojiIcon';
import { BoxIcon } from '../../../../shared/ui/icons/BoxIcon/BoxIcon';
import {
  selectAutoSellFlags,
  selectBuildingOwnedCount,
  selectBuildingStatus,
  selectMoney,
  selectResourceSlots,
} from '../../../../store/selectors';
import { useGameStore } from '../../../../store/useGameStore';
import './BuildingCard.css';

/** Emoji + localized name, e.g. "🥔 Картошка" — used inside translated templates. */
function describeResource(resourceId: ResourceId, t: TFunction): string {
  return `${RESOURCES[resourceId].emoji} ${t(`resources.${resourceId}.name`)}`;
}

function formatResourceAmount(resourceAmount: ResourceAmount, t: TFunction): string {
  return `${resourceAmount.amount} ${describeResource(resourceAmount.resourceId, t)}`;
}

function formatRecipe(config: BuildingConfig, t: TFunction): string {
  const outputs = config.outputs.map((output) => formatResourceAmount(output, t)).join(', ');

  if (config.inputs.length === 0) {
    return outputs;
  }

  return `${config.inputs.map((input) => formatResourceAmount(input, t)).join(', ')} → ${outputs}`;
}

function formatBlockReason(reason: ProductionBlockReason, t: TFunction): string {
  const resource = describeResource(reason.resourceId, t);

  if (reason.type === 'missing_input') {
    return t('production.missingResource', {
      resource,
      missing: formatNumber(reason.missingAmount),
    });
  }

  return t('production.outputFull', { resource });
}

/** Money + every required resource, e.g. "500 ₽, 15 🚧 Доски, 10 🪨 Камень". */
function formatConstructionCost(cost: BuildTotalCost, t: TFunction): string {
  const parts = [
    formatMoney(cost.money),
    ...cost.resources.map((resource) => formatResourceAmount(resource, t)),
  ];
  return parts.join(', ');
}

/** Only the parts actually missing right now, in the same "money, resources" order. */
function formatConstructionShortfall(shortfall: ConstructionShortfall, t: TFunction): string {
  const parts: string[] = [];

  if (shortfall.missingMoney > 0) {
    parts.push(formatMoney(shortfall.missingMoney));
  }

  parts.push(...shortfall.missingResources.map((resource) => formatResourceAmount(resource, t)));

  return parts.join(', ');
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
  const { t } = useTranslation();
  const ownedCount = useGameStore(selectBuildingOwnedCount(config.id));
  const status = useGameStore(selectBuildingStatus(config.id));
  const iconRef = useIconAnimationPause();

  const isBuilt = ownedCount >= 1;
  const cycleSeconds = config.cycleDurationMs / 1000;

  const isBlocked = isBuilt && (status === 'waiting_for_inputs' || status === 'output_blocked');
  const statusLabel = isBuilt && status !== null ? t(`buildingStatus.${status}`) : '';

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
          <h3 className="building-card__name" title={t(`buildings.${config.id}.description`)}>
            {t(`buildings.${config.id}.name`)}
          </h3>
          {isBuilt && (
            <span className="building-card__count">
              {t('buildingCard.owned', { value: formatNumber(ownedCount) })}
            </span>
          )}
        </div>

        <p
          className="building-card__stats"
          aria-label={t('buildingCard.recipeAria', {
            recipe: formatRecipe(config, t),
            seconds: cycleSeconds,
          })}
        >
          <span className="building-card__stats-visual" aria-hidden="true">
            {config.inputs.length > 0 && (
              <>
                <ResourceAmountIcons amounts={config.inputs} />
                <span className="building-card__stats-arrow">→</span>
              </>
            )}
            <ResourceAmountIcons amounts={config.outputs} />
            <span className="building-card__stats-cycle">
              {t('buildingCard.cycleSeconds', { seconds: cycleSeconds })}
            </span>
          </span>
          <StorageIndicator config={config} />
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

/**
 * Warehouse fill for this building's output resources: a small warehouse icon
 * plus a progress bar. Subscribes only to the output slots (via `useShallow`),
 * so it refreshes with the relevant stock without touching the heavy card part.
 */
function StorageIndicator({ config }: { config: BuildingConfig }) {
  const { t } = useTranslation();
  const outputIds = config.outputs.map((output) => output.resourceId);
  const slots = useGameStore(useShallow(selectResourceSlots(outputIds)));

  const totalAmount = slots.reduce((sum, slot) => sum + slot.amount, 0);
  const totalCapacity = slots.reduce((sum, slot) => sum + slot.capacity, 0);
  const ratio = totalCapacity > 0 ? Math.min(totalAmount / totalCapacity, 1) : 0;

  const label = t('buildingCard.storage', {
    amount: formatNumber(totalAmount),
    capacity: formatNumber(totalCapacity),
  });

  return (
    <span
      className="building-card__storage"
      role="img"
      aria-label={label}
      title={`${label} (${formatPercent(ratio)})`}
    >
      <BoxIcon className="building-card__storage-icon" />
      <span className="building-card__storage-bar">
        <span
          className={
            ratio >= 1
              ? 'building-card__storage-fill building-card__storage-fill--full'
              : 'building-card__storage-fill'
          }
          style={{ width: `${ratio * 100}%` }}
        />
      </span>
    </span>
  );
}

/**
 * Subscribes to money plus only this building's own construction-resource slots
 * (via `useShallow`), so an auto-sell payout or an unrelated resource tick
 * re-renders just this button, not the whole card.
 */
function BuildButton({
  config,
  ownedCount,
  quantity,
}: {
  config: BuildingConfig;
  ownedCount: number;
  quantity: number;
}) {
  const { t } = useTranslation();
  const money = useGameStore(selectMoney);
  const costResourceIds = config.constructionCost.resources.map((resource) => resource.resourceId);
  const costResourceSlots = useGameStore(useShallow(selectResourceSlots(costResourceIds)));
  const buyBuilding = useGameStore((state) => state.buyBuilding);

  const warehouse = {} as Warehouse;
  costResourceIds.forEach((resourceId, index) => {
    warehouse[resourceId] = costResourceSlots[index];
  });

  const plan = planBuild(money, warehouse, config, ownedCount, quantity);
  const canBuild = plan.count >= 1;
  const cost = formatConstructionCost(getBuildTotalCost(config, ownedCount, quantity), t);
  const shortfall = canBuild
    ? null
    : getConstructionShortfall(money, warehouse, config, ownedCount);

  return (
    <div className="building-card__build-block">
      <button
        type="button"
        className="building-card__build-button glass-btn"
        onClick={() => buyBuilding(config.id, quantity)}
        disabled={!canBuild}
        aria-label={t('buildingCard.buildCountAria', {
          count: quantity,
          quantity: formatNumber(quantity),
          cost,
        })}
      >
        {t('buildingCard.build', { cost })}
      </button>
      {shortfall && (
        <p className="building-card__missing-resources">
          {t('buildingCard.missingForBuild', { list: formatConstructionShortfall(shortfall, t) })}
        </p>
      )}
    </div>
  );
}

/** Subscribes only to the auto-sell flags of this building's outputs. */
function AutoSellToggles({ config }: { config: BuildingConfig }) {
  const { t } = useTranslation();
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
              ? t('buildingCard.autoSellNamed', {
                  resource: t(`resources.${output.resourceId}.name`),
                })
              : t('buildingCard.autoSell')}
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
  const { t } = useTranslation();
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
  const text = reason ? formatBlockReason(reason, t) : fallback;

  return <span className="visually-hidden">{text}</span>;
}
