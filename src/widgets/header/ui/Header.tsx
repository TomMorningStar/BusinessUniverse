import { ResetProgressButton } from '../../../features/reset-progress';
import { formatMoney } from '../../../shared/lib/formatMoney';
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
  return (
    <header className="app-header">
      <h1 className="app-header__title">{title}</h1>
      {showBuildQuantityPicker && (
        <QuantityStepper
          value={buildQuantity}
          options={BUILD_QUANTITY_OPTIONS}
          onChange={onBuildQuantityChange}
          label="Количество для постройки"
        />
      )}
      <MoneyDisplay />
      <ResetProgressButton />
    </header>
  );
}

/** Isolated so frequent money updates re-render only this element, not the whole header. */
function MoneyDisplay() {
  const money = useGameStore(selectMoney);

  return (
    <div className="app-header__money glass-btn" aria-live="polite">
      {formatMoney(money)}
    </div>
  );
}
