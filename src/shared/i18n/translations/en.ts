/**
 * Reference dictionary: the key structure of every other locale must match this
 * file (verified by `npm run i18n:check`). English is also the runtime fallback.
 */
export const en = {
  tabs: {
    warehouse: 'Warehouse',
    raw_material: 'Raw materials',
    factory: 'Factory',
    settings: 'Settings',
  },
  nav: {
    sections: 'Sections',
    back: 'Back',
  },
  header: {
    buildQuantity: 'Build quantity',
  },
  stepper: {
    less: 'Less',
    more: 'More',
  },
  panels: {
    buildings: 'Buildings',
  },
  buildings: {
    potato_farm: {
      name: 'Potato farm',
      description: 'Grows potatoes — the basic raw material of your empire.',
    },
    chips_factory: {
      name: 'Chips factory',
      description: 'Turns potatoes into crispy chips that sell at a premium.',
    },
    wheat_field: {
      name: 'Wheat field',
      description: 'Produces wheat with every harvest cycle.',
    },
    orange_grove: {
      name: 'Orange grove',
      description: 'Harvests fresh oranges ready for sale.',
    },
    lumberjack: {
      name: 'Lumberjack',
      description: 'Harvests wood — the basic construction resource.',
    },
    sawmill: {
      name: 'Sawmill',
      description: 'Turns wood into planks for construction.',
    },
    quarry: {
      name: 'Quarry',
      description: 'Mines stone for building construction.',
    },
  },
  resources: {
    potato: { name: 'Potatoes' },
    chips: { name: 'Chips' },
    wheat: { name: 'Wheat' },
    orange: { name: 'Oranges' },
    wood: { name: 'Wood' },
    planks: { name: 'Planks' },
    stone: { name: 'Stone' },
  },
  buildingStatus: {
    idle: 'Waiting to start',
    running: 'Production',
    waiting_for_inputs: 'Waiting for materials',
    output_blocked: 'Storage is full',
  },
  production: {
    missingResource: 'Not enough {{resource}}: {{missing}} more needed',
    outputFull: 'Storage is full: {{resource}}',
  },
  buildingCard: {
    owned: 'Owned: {{value}}',
    cycleSeconds: '⏱ {{seconds}} sec',
    recipeAria: '{{recipe}}, cycle {{seconds}} sec',
    build: 'Build {{cost}}',
    buildCountAria_one: 'Build {{quantity}} building for {{cost}}',
    buildCountAria_other: 'Build {{quantity}} buildings for {{cost}}',
    autoSell: 'Auto-sell',
    autoSellNamed: 'Auto-sell: {{resource}}',
    storage: 'Warehouse: {{amount}} of {{capacity}}',
    missingForBuild: 'Missing to build: {{list}}',
  },
  warehouse: {
    empty: 'The warehouse is empty for now — build something and the goods will arrive here.',
    sellAll: 'Sell all',
    emptyRow: 'Empty',
  },
  notices: {
    built: '{{name}} ×{{qty}}',
    sold_one: '{{resource}}: sold {{amount}} unit (+{{income}})',
    sold_other: '{{resource}}: sold {{amount}} units (+{{income}})',
  },
  settings: {
    profile: 'Profile',
    leaderboard: 'Leaderboard',
    language: 'Language',
  },
  reset: {
    button: 'Reset progress',
    confirm:
      'Reset progress? All money, buildings and warehouse stock will be permanently deleted.',
  },
  language: {
    title: 'Language',
    description: 'Choose the interface language — it switches instantly, no reload needed.',
    groupAria: 'Interface language',
  },
} as const;

export type AppTranslation = typeof en;
