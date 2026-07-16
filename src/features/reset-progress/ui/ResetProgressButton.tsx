import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../../store/useGameStore';
import './ResetProgressButton.css';

export function ResetProgressButton() {
  const { t } = useTranslation();
  const resetGame = useGameStore((state) => state.resetGame);

  const handleClick = () => {
    if (window.confirm(t('reset.confirm'))) {
      resetGame();
    }
  };

  return (
    <button type="button" className="reset-button glass-btn" onClick={handleClick}>
      {t('reset.button')}
    </button>
  );
}
