import { useGameStore } from '../../store/useGameStore';

export function ResetProgressButton() {
  const resetGame = useGameStore((state) => state.resetGame);

  const handleClick = () => {
    const confirmed = window.confirm(
      'Сбросить прогресс? Все деньги, здания и склад будут удалены безвозвратно.',
    );

    if (confirmed) {
      resetGame();
    }
  };

  return (
    <button type="button" className="reset-button glass-btn" onClick={handleClick}>
      Сбросить прогресс
    </button>
  );
}
