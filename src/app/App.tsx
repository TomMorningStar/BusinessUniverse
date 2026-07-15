import { GamePage } from '../pages/game';
import { useAutosave } from './useAutosave';
import { useGameLoop } from './useGameLoop';

function App() {
  useGameLoop();
  useAutosave();

  return <GamePage />;
}

export default App;
