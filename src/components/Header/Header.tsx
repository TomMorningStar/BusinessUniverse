import { formatMoney } from '../../utils/formatMoney';
import { useGameStore } from '../../store/useGameStore';
import { ResetProgressButton } from '../ResetProgressButton/ResetProgressButton';
import './Header.css';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const money = useGameStore((state) => state.money);

  return (
    <header className="app-header">
      <h1 className="app-header__title">{title}</h1>
      <div className="app-header__money glass-capsule" aria-live="polite">
        {formatMoney(money)}
      </div>
      <ResetProgressButton />
    </header>
  );
}
