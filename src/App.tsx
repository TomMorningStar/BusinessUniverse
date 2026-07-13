import { useState } from 'react';
import { Background } from './components/Background/Background';
import { Header } from './components/Header/Header';
import { WarehousePanel } from './components/WarehousePanel/WarehousePanel';
import { BuildingsPanel } from './components/BuildingsPanel/BuildingsPanel';
import { ProductionNotice } from './components/ProductionNotice/ProductionNotice';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TAB_LABELS, type AppTab } from './components/Sidebar/tabs';
import { useGameLoop } from './app/useGameLoop';
import { useAutosave } from './app/useAutosave';
import './App.css';

function App() {
  useGameLoop();
  useAutosave();

  const [activeTab, setActiveTab] = useState<AppTab>('warehouse');

  return (
    <Background>
      <div className="app">
        <Header title={TAB_LABELS[activeTab]} />
        <div className="app__body">
          <main className="app__main">
            {activeTab === 'warehouse' && <WarehousePanel />}
            {activeTab === 'raw_material' && <BuildingsPanel category="raw_material" />}
            {activeTab === 'factory' && <BuildingsPanel category="factory" />}
          </main>
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <ProductionNotice />
      </div>
    </Background>
  );
}

export default App;
