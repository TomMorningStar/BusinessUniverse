import type { TranslationDict } from '../types';

export const fr = {
  tabs: {
    warehouse: 'Entrepôt',
    raw_material: 'Matières premières',
    factory: 'Usine',
    housing: 'Logement',
    settings: 'Paramètres',
  },
  nav: {
    sections: 'Sections',
    back: 'Retour',
  },
  header: {
    buildQuantity: 'Quantité à construire',
  },
  stepper: {
    less: 'Moins',
    more: 'Plus',
  },
  panels: {
    buildings: 'Bâtiments',
  },
  buildings: {
    potato_farm: {
      name: 'Ferme de pommes de terre',
      description: 'Cultive des pommes de terre, la matière première de base de votre empire.',
    },
    chips_factory: {
      name: 'Usine de chips',
      description: 'Transforme les pommes de terre en chips croustillantes vendues plus cher.',
    },
    wheat_field: {
      name: 'Champ de blé',
      description: 'Produit du blé à chaque cycle de récolte.',
    },
    orange_grove: {
      name: 'Orangeraie',
      description: 'Récolte des oranges fraîches prêtes à la vente.',
    },
    lumberjack: {
      name: 'Bûcheron',
      description: 'Récolte du bois, la ressource de construction de base.',
    },
    sawmill: {
      name: 'Scierie',
      description: 'Transforme le bois en planches de construction.',
    },
    quarry: {
      name: 'Carrière',
      description: 'Extrait de la pierre pour la construction des bâtiments.',
    },
    settler_house: {
      name: 'Maison de colons',
      description: 'Loge les colons nécessaires à la production de matières premières.',
    },
    artisan_house: {
      name: 'Maison d’artisans',
      description: 'Loge les artisans nécessaires aux usines de transformation.',
    },
  },
  resources: {
    potato: { name: 'Pommes de terre' },
    chips: { name: 'Chips' },
    wheat: { name: 'Blé' },
    orange: { name: 'Oranges' },
    wood: { name: 'Bois' },
    planks: { name: 'Planches' },
    stone: { name: 'Pierre' },
  },
  population: {
    settler: { name: 'Colons' },
    artisan: { name: 'Artisans' },
    summary: {
      title: 'Population',
      classRow: '{{className}} : total {{total}}, employés {{employed}}, disponibles {{available}}',
    },
  },
  buildingStatus: {
    idle: 'En attente de démarrage',
    running: 'Production',
    waiting_for_inputs: 'En attente de matières premières',
    waiting_for_workers: 'En attente de travailleurs',
    output_blocked: 'Entrepôt plein',
  },
  production: {
    missingResource: 'Pas assez de {{resource}} : il en manque {{missing}}',
    outputFull: 'Entrepôt plein : {{resource}}',
  },
  buildingCard: {
    owned: 'Construits : {{value}}',
    cycleSeconds: '⏱ {{seconds}} s',
    recipeAria: '{{recipe}}, cycle de {{seconds}} s',
    recipeAriaWithWorkforce:
      '{{recipe}}, cycle de {{seconds}} s, nécessite {{workforceCount}} {{workforceClass}}',
    housingCapacity: 'Loge : {{amount}} {{class}}',
    build: 'Construire {{cost}}',
    buildCountAria_one: 'Construire {{quantity}} bâtiment pour {{cost}}',
    buildCountAria_many: 'Construire {{quantity}} bâtiments pour {{cost}}',
    buildCountAria_other: 'Construire {{quantity}} bâtiments pour {{cost}}',
    autoSell: 'Vente auto',
    autoSellNamed: 'Vente auto : {{resource}}',
    storage: 'Entrepôt : {{amount}} sur {{capacity}}',
    missingForBuild: 'Manque pour construire : {{list}}',
  },
  warehouse: {
    empty:
      'L’entrepôt est vide pour l’instant : construisez des bâtiments et les marchandises arriveront ici.',
    sellAll: 'Tout vendre',
    emptyRow: 'Vide',
  },
  notices: {
    built: '{{name}} ×{{qty}}',
    sold_one: '{{resource}} : {{amount}} unité vendue (+{{income}})',
    sold_many: '{{resource}} : {{amount}} unités vendues (+{{income}})',
    sold_other: '{{resource}} : {{amount}} unités vendues (+{{income}})',
  },
  settings: {
    profile: 'Profil',
    leaderboard: 'Classement',
    language: 'Langue',
  },
  reset: {
    button: 'Réinitialiser la progression',
    confirm:
      'Réinitialiser la progression ? L’argent, les bâtiments et l’entrepôt seront définitivement supprimés.',
  },
  language: {
    title: 'Langue',
    description:
      'Choisissez la langue de l’interface : elle change instantanément, sans rechargement.',
    groupAria: 'Langue de l’interface',
  },
} as const satisfies TranslationDict;
