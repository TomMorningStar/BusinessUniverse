import { useTranslation } from 'react-i18next';
import { formatMoney } from '../../../shared/i18n';
import { QuantityStepper } from '../../../shared/ui/QuantityStepper/QuantityStepper';
import { selectMoney } from '../../../store/selectors';
import { useGameStore } from '../../../store/useGameStore';
import './Header.css';

/** Batch sizes offered by the global build quantity picker. */
const BUILD_QUANTITY_OPTIONS = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000] as const;

type HeaderProps = {
  title: string;
  showBuildQuantityPicker: boolean;
  buildQuantity: number;
  onBuildQuantityChange: (value: number) => void;
};

export function Header({
  title,
  showBuildQuantityPicker,
  buildQuantity,
  onBuildQuantityChange,
}: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="app-header">
      <h1 className="app-header__title">{title}</h1>
      {showBuildQuantityPicker && (
        <QuantityStepper
          value={buildQuantity}
          options={BUILD_QUANTITY_OPTIONS}
          onChange={onBuildQuantityChange}
          label={t('header.buildQuantity')}
        />
      )}
      <MoneyDisplay />
    </header>
  );
}

/** Isolated so frequent money updates re-render only this element, not the whole header. */
function MoneyDisplay() {
  const money = useGameStore(selectMoney);
  // Subscribes to language changes so the number re-formats for the new locale.
  useTranslation();

  return (
    <div className="app-header__money glass-btn" aria-live="polite">
      {formatMoney(money)}
    </div>
  );
}
