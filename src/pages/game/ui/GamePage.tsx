import { useState } from 'react';
import { Background } from '../../../widgets/background';
import { BuildingsPanel } from '../../../widgets/buildings-panel';
import { Header } from '../../../widgets/header';
import { ProductionNotice } from '../../../widgets/production-notice';
import { Sidebar, TAB_LABELS, type AppTab } from '../../../widgets/sidebar';
import { WarehousePanel } from '../../../widgets/warehouse-panel';
import './GamePage.css';

export function GamePage() {
  const [activeTab, setActiveTab] = useState<AppTab>('warehouse');
  const [buildQuantity, setBuildQuantity] = useState<number>(1);
  const showBuildQuantityPicker = activeTab === 'raw_material' || activeTab === 'factory';

  return (
    <Background>
      <div className="app">
        <Header
          title={TAB_LABELS[activeTab]}
          showBuildQuantityPicker={showBuildQuantityPicker}
          buildQuantity={buildQuantity}
          onBuildQuantityChange={setBuildQuantity}
        />
        <div className="app__body">
          <main className="app__main">
            {activeTab === 'warehouse' && <WarehousePanel />}
            {activeTab === 'raw_material' && (
              <BuildingsPanel category="raw_material" buildQuantity={buildQuantity} />
            )}
            {activeTab === 'factory' && (
              <BuildingsPanel category="factory" buildQuantity={buildQuantity} />
            )}
          </main>
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <ProductionNotice />
      </div>
    </Background>
  );
}
