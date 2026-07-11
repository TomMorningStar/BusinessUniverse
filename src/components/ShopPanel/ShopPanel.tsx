import { BUILDINGS, BUILDING_IDS } from '../../domain/buildings';
import { canAfford } from '../../domain/economy';
import type { BuildingCategory, BuildingConfig } from '../../domain/types';
import { formatMoney } from '../../utils/formatMoney';
import { formatResourceAmountsText } from '../../utils/formatResourceAmounts';
import { useGameStore } from '../../store/useGameStore';
import { EmojiIcon } from '../EmojiIcon/EmojiIcon';
import { ResourceAmountIcons } from '../ResourceAmountIcons/ResourceAmountIcons';
import './ShopPanel.css';

function formatRecipeText(config: BuildingConfig): string {
  const cycleSeconds = config.cycleDurationMs / 1000;
  const outputs = formatResourceAmountsText(config.outputs);

  if (config.inputs.length === 0) {
    return `${outputs}, цикл ${cycleSeconds} с`;
  }

  return `${formatResourceAmountsText(config.inputs)} → ${outputs}, цикл ${cycleSeconds} с`;
}

type ShopPanelProps = {
  category: BuildingCategory;
};

export function ShopPanel({ category }: ShopPanelProps) {
  const money = useGameStore((state) => state.money);
  const ownedBuildings = useGameStore((state) => state.ownedBuildings);
  const buyBuilding = useGameStore((state) => state.buyBuilding);

  const availableBuildingIds = BUILDING_IDS.filter(
    (buildingId) => !ownedBuildings[buildingId] && BUILDINGS[buildingId].category === category,
  );

  if (availableBuildingIds.length === 0) {
    return null;
  }

  return (
    <section className="shop-panel" aria-label="Магазин">
      <ul className="shop-panel__list">
        {availableBuildingIds.map((buildingId) => {
          const config = BUILDINGS[buildingId];
          const cycleSeconds = config.cycleDurationMs / 1000;
          const affordable = canAfford(money, config.purchaseCost);
          const cardModifierClass = affordable
            ? 'shop-panel__card--affordable'
            : 'shop-panel__card--unaffordable';

          return (
            <li
              key={buildingId}
              className={`shop-panel__card ${cardModifierClass}`}
              title={formatRecipeText(config)}
            >
              <div className="shop-panel__icon">
                <EmojiIcon emoji={config.emoji} size={40} animated />
              </div>
              <div className="shop-panel__content">
                <h3 className="shop-panel__name">{config.name}</h3>
                <p className="shop-panel__stats" aria-label={formatRecipeText(config)}>
                  <span className="shop-panel__stats-visual" aria-hidden="true">
                    {config.inputs.length > 0 && (
                      <>
                        <ResourceAmountIcons amounts={config.inputs} size={16} />
                        <span className="shop-panel__stats-arrow">→</span>
                      </>
                    )}
                    <ResourceAmountIcons amounts={config.outputs} size={16} />
                    <span>/{cycleSeconds}с</span>
                  </span>
                </p>
                <span className="shop-panel__buy">
                  <button
                    type="button"
                    className="shop-panel__buy-button"
                    onClick={() => buyBuilding(buildingId)}
                    disabled={!affordable}
                  >
                    Построить -{formatMoney(config.purchaseCost)}
                  </button>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
