import type { TranslationDict } from '../types';

export const de = {
  tabs: {
    warehouse: 'Lager',
    raw_material: 'Rohstoffe',
    factory: 'Fabrik',
    housing: 'Wohnen',
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
    lumberjack: {
      name: 'Holzfäller',
      description: 'Schlägt Holz – den grundlegenden Baustoff.',
    },
    sawmill: {
      name: 'Sägewerk',
      description: 'Verarbeitet Holz zu Brettern für den Bau.',
    },
    quarry: {
      name: 'Steinbruch',
      description: 'Fördert Stein für den Gebäudebau.',
    },
    settler_house: {
      name: 'Siedlerhaus',
      description: 'Beherbergt Siedler, die für die Rohstoffproduktion nötig sind.',
    },
    artisan_house: {
      name: 'Handwerkerhaus',
      description: 'Beherbergt Handwerker, die für Verarbeitungsfabriken nötig sind.',
    },
  },
  resources: {
    potato: { name: 'Kartoffeln' },
    chips: { name: 'Chips' },
    wheat: { name: 'Weizen' },
    orange: { name: 'Orangen' },
    wood: { name: 'Holz' },
    planks: { name: 'Bretter' },
    stone: { name: 'Stein' },
  },
  population: {
    settler: { name: 'Siedler' },
    artisan: { name: 'Handwerker' },
    summary: {
      title: 'Bevölkerung',
      classRow:
        '{{className}}: gesamt {{total}}, beschäftigt {{employed}}, verfügbar {{available}}',
    },
  },
  buildingStatus: {
    idle: 'Wartet auf Start',
    running: 'Produktion',
    waiting_for_inputs: 'Wartet auf Rohstoffe',
    waiting_for_workers: 'Wartet auf Arbeiter',
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
    recipeAriaWithWorkforce:
      '{{recipe}}, Zyklus {{seconds}} Sek., benötigt {{workforceCount}} {{workforceClass}}',
    housingCapacity: 'Beherbergt: {{amount}} {{class}}',
    build: 'Bauen für {{cost}}',
    buildCountAria_one: '{{quantity}} Gebäude für {{cost}} bauen',
    buildCountAria_other: '{{quantity}} Gebäude für {{cost}} bauen',
    autoSell: 'Auto-Verkauf',
    autoSellNamed: 'Auto-Verkauf: {{resource}}',
    storage: 'Lager: {{amount}} von {{capacity}}',
    missingForBuild: 'Fehlt zum Bauen: {{list}}',
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
