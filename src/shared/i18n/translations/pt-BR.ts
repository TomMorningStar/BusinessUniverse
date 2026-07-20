import type { TranslationDict } from '../types';

export const ptBR = {
  tabs: {
    warehouse: 'Armazém',
    construction: 'Materiais de construção',
    raw_material: 'Matérias-primas',
    factory: 'Fábrica',
    housing: 'Moradia',
    settings: 'Configurações',
  },
  nav: {
    sections: 'Seções',
    back: 'Voltar',
  },
  header: {
    buildQuantity: 'Quantidade a construir',
  },
  stepper: {
    less: 'Menos',
    more: 'Mais',
  },
  panels: {
    buildings: 'Construções',
    warehouse: 'Armazém',
  },
  buildings: {
    potato_farm: {
      name: 'Fazenda de batatas',
      description: 'Cultiva batatas, a matéria-prima básica do seu império.',
    },
    chips_factory: {
      name: 'Fábrica de chips',
      description: 'Transforma batatas em chips crocantes que valem mais.',
    },
    wheat_field: {
      name: 'Campo de trigo',
      description: 'Produz trigo a cada ciclo de colheita.',
    },
    orange_grove: {
      name: 'Laranjal',
      description: 'Colhe laranjas frescas prontas para venda.',
    },
    lumberjack: {
      name: 'Lenhador',
      description: 'Coleta madeira, o recurso básico de construção.',
    },
    sawmill: {
      name: 'Serraria',
      description: 'Transforma madeira em tábuas para construção.',
    },
    quarry: {
      name: 'Pedreira',
      description: 'Extrai pedra para a construção de edifícios.',
    },
    settler_house: {
      name: 'Casa de colonos',
      description: 'Abriga os colonos necessários para a produção de matérias-primas.',
    },
    artisan_house: {
      name: 'Casa de artesãos',
      description: 'Abriga os artesãos necessários para as fábricas de processamento.',
    },
  },
  resources: {
    potato: { name: 'Batatas' },
    chips: { name: 'Chips' },
    wheat: { name: 'Trigo' },
    orange: { name: 'Laranjas' },
    wood: { name: 'Madeira' },
    planks: { name: 'Tábuas' },
    stone: { name: 'Pedra' },
  },
  population: {
    settler: { name: 'Colonos' },
    artisan: { name: 'Artesãos' },
    summary: {
      title: 'População',
      classRow:
        '{{className}}: total {{total}}, empregados {{employed}}, disponíveis {{available}}',
    },
  },
  buildingStatus: {
    idle: 'Aguardando início',
    running: 'Produção',
    waiting_for_inputs: 'Aguardando matérias-primas',
    waiting_for_workers: 'Aguardando trabalhadores',
    output_blocked: 'Armazém cheio',
  },
  production: {
    missingResource: 'Não há {{resource}} suficiente: faltam mais {{missing}}',
    outputFull: 'Armazém cheio: {{resource}}',
  },
  buildingCard: {
    owned: 'Construídos: {{value}}',
    cycleSeconds: '⏱ {{seconds}} s',
    recipeAria: '{{recipe}}, ciclo de {{seconds}} s',
    recipeAriaWithWorkforce:
      '{{recipe}}, ciclo de {{seconds}} s, requer {{workforceCount}} {{workforceClass}}',
    housingCapacity: 'Abriga: {{amount}} {{class}}',
    build: 'Construir {{cost}}',
    buildCountAria_one: 'Construir {{quantity}} edifício por {{cost}}',
    buildCountAria_many: 'Construir {{quantity}} edifícios por {{cost}}',
    buildCountAria_other: 'Construir {{quantity}} edifícios por {{cost}}',
    autoSell: 'Venda automática',
    autoSellNamed: 'Venda automática: {{resource}}',
    storage: 'Armazém: {{amount}} de {{capacity}}',
    missingForBuild: 'Falta para construir: {{list}}',
  },
  warehouse: {
    empty: 'O armazém ainda está vazio — construa edifícios e os produtos aparecerão aqui.',
    sellAll: 'Vender tudo',
    emptyRow: 'Vazio',
    filterAll: 'Todos',
    filterAria: 'Filtrar por categoria',
  },
  notices: {
    built: '{{name}} ×{{qty}}',
    sold_one: '{{resource}}: {{amount}} unidade vendida (+{{income}})',
    sold_many: '{{resource}}: {{amount}} unidades vendidas (+{{income}})',
    sold_other: '{{resource}}: {{amount}} unidades vendidas (+{{income}})',
  },
  settings: {
    profile: 'Perfil',
    leaderboard: 'Classificação',
    language: 'Idioma',
  },
  reset: {
    button: 'Redefinir progresso',
    confirm:
      'Redefinir o progresso? Todo o dinheiro, os edifícios e o armazém serão apagados para sempre.',
  },
  language: {
    title: 'Idioma',
    description: 'Escolha o idioma da interface — a troca é instantânea, sem recarregar.',
    groupAria: 'Idioma da interface',
  },
} as const satisfies TranslationDict;
