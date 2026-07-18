import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Background } from '../../../widgets/background';
import { BuildingsPanel } from '../../../widgets/buildings-panel';
import { Header } from '../../../widgets/header';
import { LanguagePanel } from '../../../widgets/language-panel';
import { PopulationSummary } from '../../../widgets/population-summary';
import { ProductionNotice } from '../../../widgets/production-notice';
import { SettingsPanel } from '../../../widgets/settings-panel';
import { Sidebar, type AppTab } from '../../../widgets/sidebar';
import { WarehousePanel } from '../../../widgets/warehouse-panel';
import './GamePage.css';

/** Sub-view of the settings tab: the menu itself or the language list. */
type SettingsView = 'menu' | 'language';

export function GamePage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<AppTab>('warehouse');
  const [settingsView, setSettingsView] = useState<SettingsView>('menu');
  const [buildQuantity, setBuildQuantity] = useState<number>(1);
  const showBuildQuantityPicker =
    activeTab === 'raw_material' || activeTab === 'factory' || activeTab === 'housing';

  const handleTabChange = (tab: AppTab) => {
    // Leaving (or re-entering) settings always lands on the menu, not a stale sub-view.
    setSettingsView('menu');
    setActiveTab(tab);
  };

  const isLanguageOpen = activeTab === 'settings' && settingsView === 'language';
  const title = isLanguageOpen ? t('language.title') : t(`tabs.${activeTab}`);

  return (
    <Background>
      <div className="app">
        <Header
          title={title}
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
            {activeTab === 'housing' && (
              <>
                <PopulationSummary />
                <BuildingsPanel category="housing" buildQuantity={buildQuantity} />
              </>
            )}
            {activeTab === 'settings' &&
              (isLanguageOpen ? (
                <LanguagePanel onBack={() => setSettingsView('menu')} />
              ) : (
                <SettingsPanel onOpenLanguage={() => setSettingsView('language')} />
              ))}
          </main>
          <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        <ProductionNotice />
      </div>
    </Background>
  );
}
