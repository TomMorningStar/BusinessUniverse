import type { TranslationDict } from '../types';

export const it = {
  tabs: {
    warehouse: 'Magazzino',
    raw_material: 'Materie prime',
    factory: 'Fabbrica',
    settings: 'Impostazioni',
  },
  nav: {
    sections: 'Sezioni',
    back: 'Indietro',
  },
  header: {
    buildQuantity: 'Quantità da costruire',
  },
  stepper: {
    less: 'Meno',
    more: 'Più',
  },
  panels: {
    buildings: 'Edifici',
  },
  buildings: {
    potato_farm: {
      name: 'Fattoria di patate',
      description: 'Coltiva patate, la materia prima di base del tuo impero.',
    },
    chips_factory: {
      name: 'Fabbrica di patatine',
      description: 'Trasforma le patate in patatine croccanti che si vendono a caro prezzo.',
    },
    wheat_field: {
      name: 'Campo di grano',
      description: 'Produce grano a ogni ciclo di raccolto.',
    },
    orange_grove: {
      name: 'Aranceto',
      description: 'Raccoglie arance fresche pronte per la vendita.',
    },
    lumberjack: {
      name: 'Boscaiolo',
      description: 'Raccoglie legno, la risorsa base per le costruzioni.',
    },
    sawmill: {
      name: 'Segheria',
      description: 'Trasforma il legno in assi da costruzione.',
    },
    quarry: {
      name: 'Cava',
      description: 'Estrae pietra per la costruzione degli edifici.',
    },
  },
  resources: {
    potato: { name: 'Patate' },
    chips: { name: 'Patatine' },
    wheat: { name: 'Grano' },
    orange: { name: 'Arance' },
    wood: { name: 'Legno' },
    planks: { name: 'Assi' },
    stone: { name: 'Pietra' },
  },
  buildingStatus: {
    idle: 'In attesa di avvio',
    running: 'Produzione',
    waiting_for_inputs: 'In attesa di materie prime',
    output_blocked: 'Magazzino pieno',
  },
  production: {
    missingResource: '{{resource}} non sufficiente: ne servono altri {{missing}}',
    outputFull: 'Magazzino pieno: {{resource}}',
  },
  buildingCard: {
    owned: 'Costruiti: {{value}}',
    cycleSeconds: '⏱ {{seconds}} s',
    recipeAria: '{{recipe}}, ciclo di {{seconds}} s',
    build: 'Costruisci {{cost}}',
    buildCountAria_one: 'Costruisci {{quantity}} edificio per {{cost}}',
    buildCountAria_many: 'Costruisci {{quantity}} edifici per {{cost}}',
    buildCountAria_other: 'Costruisci {{quantity}} edifici per {{cost}}',
    autoSell: 'Vendita automatica',
    autoSellNamed: 'Vendita automatica: {{resource}}',
    storage: 'Magazzino: {{amount}} su {{capacity}}',
    missingForBuild: 'Manca per costruire: {{list}}',
  },
  warehouse: {
    empty: 'Il magazzino per ora è vuoto: costruisci edifici e le merci arriveranno qui.',
    sellAll: 'Vendi tutto',
    emptyRow: 'Vuoto',
  },
  notices: {
    built: '{{name}} ×{{qty}}',
    sold_one: '{{resource}}: {{amount}} unità venduta (+{{income}})',
    sold_many: '{{resource}}: {{amount}} unità vendute (+{{income}})',
    sold_other: '{{resource}}: {{amount}} unità vendute (+{{income}})',
  },
  settings: {
    profile: 'Profilo',
    leaderboard: 'Classifica',
    language: 'Lingua',
  },
  reset: {
    button: 'Azzera i progressi',
    confirm: 'Azzerare i progressi? Denaro, edifici e magazzino verranno eliminati per sempre.',
  },
  language: {
    title: 'Lingua',
    description: 'Scegli la lingua dell’interfaccia: cambia all’istante, senza ricaricare.',
    groupAria: 'Lingua dell’interfaccia',
  },
} as const satisfies TranslationDict;
