import type { TranslationDict } from '../types';

export const de = {
  tabs: {
    warehouse: 'Lager',
    raw_material: 'Rohstoffe',
    factory: 'Fabrik',
    settings: 'Einstellungen',
  },
  nav: {
    sections: 'Bereiche',
    back: 'Zurück',
  },
  header: {
    buildQuantity: 'Bauanzahl',
  },
  stepper: {
    less: 'Weniger',
    more: 'Mehr',
  },
  panels: {
    buildings: 'Gebäude',
  },
  buildings: {
    potato_farm: {
      name: 'Kartoffelfarm',
      description: 'Baut Kartoffeln an – den Grundrohstoff deines Imperiums.',
    },
    chips_factory: {
      name: 'Chipsfabrik',
      description: 'Verarbeitet Kartoffeln zu knusprigen Chips, die teurer verkauft werden.',
    },
    wheat_field: {
      name: 'Weizenfeld',
      description: 'Liefert mit jedem Erntezyklus Weizen.',
    },
    orange_grove: {
      name: 'Orangenhain',
      description: 'Erntet frische Orangen, bereit zum Verkauf.',
    },
  },
  resources: {
    potato: { name: 'Kartoffeln' },
    chips: { name: 'Chips' },
    wheat: { name: 'Weizen' },
    orange: { name: 'Orangen' },
  },
  buildingStatus: {
    idle: 'Wartet auf Start',
    running: 'Produktion',
    waiting_for_inputs: 'Wartet auf Rohstoffe',
    output_blocked: 'Lager ist voll',
  },
  production: {
    missingResource: 'Nicht genug {{resource}}: es fehlen noch {{missing}}',
    outputFull: 'Lager ist voll: {{resource}}',
  },
  buildingCard: {
    owned: 'Gebaut: {{value}}',
    cycleSeconds: '⏱ {{seconds}} Sek.',
    recipeAria: '{{recipe}}, Zyklus {{seconds}} Sek.',
    build: 'Bauen für {{cost}}',
    buildCountAria_one: '{{quantity}} Gebäude für {{cost}} bauen',
    buildCountAria_other: '{{quantity}} Gebäude für {{cost}} bauen',
    autoSell: 'Auto-Verkauf',
    autoSellNamed: 'Auto-Verkauf: {{resource}}',
    storage: 'Lager: {{amount}} von {{capacity}}',
  },
  warehouse: {
    empty: 'Das Lager ist noch leer – baue Gebäude, und die Waren erscheinen hier.',
    sellAll: 'Alles verkaufen',
    emptyRow: 'Leer',
  },
  notices: {
    built: '{{name}} ×{{qty}}',
    sold_one: '{{resource}}: {{amount}} Einheit verkauft (+{{income}})',
    sold_other: '{{resource}}: {{amount}} Einheiten verkauft (+{{income}})',
  },
  settings: {
    profile: 'Profil',
    leaderboard: 'Bestenliste',
    language: 'Sprache',
  },
  reset: {
    button: 'Fortschritt zurücksetzen',
    confirm:
      'Fortschritt zurücksetzen? Geld, Gebäude und Lagerbestand werden unwiderruflich gelöscht.',
  },
  language: {
    title: 'Sprache',
    description: 'Wähle die Sprache der Oberfläche – sie wechselt sofort, ohne Neuladen.',
    groupAria: 'Sprache der Oberfläche',
  },
} as const satisfies TranslationDict;
