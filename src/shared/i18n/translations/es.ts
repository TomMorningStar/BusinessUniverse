import type { TranslationDict } from '../types';

export const es = {
  tabs: {
    warehouse: 'Almacén',
    raw_material: 'Materias primas',
    factory: 'Fábrica',
    settings: 'Ajustes',
  },
  nav: {
    sections: 'Secciones',
    back: 'Atrás',
  },
  header: {
    buildQuantity: 'Cantidad a construir',
  },
  stepper: {
    less: 'Menos',
    more: 'Más',
  },
  panels: {
    buildings: 'Edificios',
  },
  buildings: {
    potato_farm: {
      name: 'Granja de patatas',
      description: 'Cultiva patatas, la materia prima básica de tu imperio.',
    },
    chips_factory: {
      name: 'Fábrica de patatas fritas',
      description: 'Convierte las patatas en crujientes patatas fritas que se venden más caras.',
    },
    wheat_field: {
      name: 'Campo de trigo',
      description: 'Produce trigo en cada ciclo de cosecha.',
    },
    orange_grove: {
      name: 'Naranjal',
      description: 'Recoge naranjas frescas listas para vender.',
    },
    lumberjack: {
      name: 'Leñador',
      description: 'Recolecta madera, el recurso básico de construcción.',
    },
    sawmill: {
      name: 'Aserradero',
      description: 'Convierte la madera en tablones para la construcción.',
    },
    quarry: {
      name: 'Cantera',
      description: 'Extrae piedra para la construcción de edificios.',
    },
  },
  resources: {
    potato: { name: 'Patatas' },
    chips: { name: 'Patatas fritas' },
    wheat: { name: 'Trigo' },
    orange: { name: 'Naranjas' },
    wood: { name: 'Madera' },
    planks: { name: 'Tablones' },
    stone: { name: 'Piedra' },
  },
  buildingStatus: {
    idle: 'En espera de inicio',
    running: 'Producción',
    waiting_for_inputs: 'Esperando materias primas',
    output_blocked: 'Almacén lleno',
  },
  production: {
    missingResource: 'No hay suficiente {{resource}}: faltan {{missing}} más',
    outputFull: 'Almacén lleno: {{resource}}',
  },
  buildingCard: {
    owned: 'Construidos: {{value}}',
    cycleSeconds: '⏱ {{seconds}} s',
    recipeAria: '{{recipe}}, ciclo de {{seconds}} s',
    build: 'Construir {{cost}}',
    buildCountAria_one: 'Construir {{quantity}} edificio por {{cost}}',
    buildCountAria_many: 'Construir {{quantity}} edificios por {{cost}}',
    buildCountAria_other: 'Construir {{quantity}} edificios por {{cost}}',
    autoSell: 'Venta automática',
    autoSellNamed: 'Venta automática: {{resource}}',
    storage: 'Almacén: {{amount}} de {{capacity}}',
    missingForBuild: 'Falta para construir: {{list}}',
  },
  warehouse: {
    empty: 'El almacén está vacío por ahora: construye edificios y los productos llegarán aquí.',
    sellAll: 'Vender todo',
    emptyRow: 'Vacío',
  },
  notices: {
    built: '{{name}} ×{{qty}}',
    sold_one: '{{resource}}: {{amount}} unidad vendida (+{{income}})',
    sold_many: '{{resource}}: {{amount}} unidades vendidas (+{{income}})',
    sold_other: '{{resource}}: {{amount}} unidades vendidas (+{{income}})',
  },
  settings: {
    profile: 'Perfil',
    leaderboard: 'Clasificación',
    language: 'Idioma',
  },
  reset: {
    button: 'Restablecer progreso',
    confirm:
      '¿Restablecer el progreso? Todo el dinero, los edificios y el almacén se eliminarán para siempre.',
  },
  language: {
    title: 'Idioma',
    description: 'Elige el idioma de la interfaz: cambia al instante, sin recargar.',
    groupAria: 'Idioma de la interfaz',
  },
} as const satisfies TranslationDict;
