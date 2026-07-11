import { formatMoney } from '../../utils/formatMoney';
import { useGameStore } from '../../store/useGameStore';
import { ResetProgressButton } from '../ResetProgressButton/ResetProgressButton';
import './Header.css';

export function Header() {
  const money = useGameStore((state) => state.money);

  return (
    <header className="app-header">
      <h1 className="app-header__title">Business Universe</h1>
      <div className="app-header__money" aria-live="polite">
        {formatMoney(money)}
      </div>
      <ResetProgressButton />
    </header>
  );
}
