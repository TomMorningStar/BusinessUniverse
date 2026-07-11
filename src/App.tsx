import { useState } from 'react';
import { Header } from './components/Header/Header';
import { WarehousePanel } from './components/WarehousePanel/WarehousePanel';
import { BuildingsPanel } from './components/BuildingsPanel/BuildingsPanel';
import { ShopPanel } from './components/ShopPanel/ShopPanel';
import { ProductionNotice } from './components/ProductionNotice/ProductionNotice';
import { Sidebar, type AppTab } from './components/Sidebar/Sidebar';
import { useGameLoop } from './app/useGameLoop';
import { useAutosave } from './app/useAutosave';
import './App.css';

function App() {
  useGameLoop();
  useAutosave();

  const [activeTab, setActiveTab] = useState<AppTab>('warehouse');

  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <main className="app__main">
          {activeTab === 'warehouse' && <WarehousePanel />}
          {activeTab === 'raw_material' && (
            <>
              <BuildingsPanel category="raw_material" />
              <ShopPanel category="raw_material" />
            </>
          )}
          {activeTab === 'factory' && (
            <>
              <BuildingsPanel category="factory" />
              <ShopPanel category="factory" />
            </>
          )}
        </main>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <ProductionNotice />
    </div>
  );
}

export default App;
