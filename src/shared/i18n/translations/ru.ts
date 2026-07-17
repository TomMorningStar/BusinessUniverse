import type { TranslationDict } from '../types';

export const ru = {
  tabs: {
    warehouse: 'Склад',
    raw_material: 'Сырьё',
    factory: 'Фабрика',
    settings: 'Настройки',
  },
  nav: {
    sections: 'Разделы',
    back: 'Назад',
  },
  header: {
    buildQuantity: 'Количество для постройки',
  },
  stepper: {
    less: 'Меньше',
    more: 'Больше',
  },
  panels: {
    buildings: 'Здания',
  },
  buildings: {
    potato_farm: {
      name: 'Картофельная ферма',
      description: 'Выращивает картошку — базовое сырьё вашей империи.',
    },
    chips_factory: {
      name: 'Завод чипсов',
      description: 'Превращает картошку в хрустящие чипсы, которые продаются дороже.',
    },
    wheat_field: {
      name: 'Пшеничное поле',
      description: 'Приносит пшеницу с каждым циклом урожая.',
    },
    orange_grove: {
      name: 'Апельсиновая роща',
      description: 'Собирает свежие апельсины, готовые к продаже.',
    },
    lumberjack: {
      name: 'Лесоруб',
      description: 'Заготавливает дерево — базовый строительный ресурс.',
    },
    sawmill: {
      name: 'Лесопилка',
      description: 'Превращает дерево в доски для строительства.',
    },
    quarry: {
      name: 'Каменоломня',
      description: 'Добывает камень для строительства зданий.',
    },
  },
  resources: {
    potato: { name: 'Картошка' },
    chips: { name: 'Чипсы' },
    wheat: { name: 'Пшеница' },
    orange: { name: 'Апельсины' },
    wood: { name: 'Дерево' },
    planks: { name: 'Доски' },
    stone: { name: 'Камень' },
  },
  buildingStatus: {
    idle: 'Ожидание запуска',
    running: 'Производство',
    waiting_for_inputs: 'Ожидает сырьё',
    output_blocked: 'Склад заполнен',
  },
  production: {
    missingResource: 'Не хватает {{resource}}: нужно ещё {{missing}}',
    outputFull: 'Склад заполнен: {{resource}}',
  },
  buildingCard: {
    owned: 'Построено: {{value}}',
    cycleSeconds: '⏱ {{seconds}} сек',
    recipeAria: '{{recipe}}, цикл {{seconds}} сек',
    build: 'Построить {{cost}}',
    buildCountAria_one: 'Построить {{quantity}} здание за {{cost}}',
    buildCountAria_few: 'Построить {{quantity}} здания за {{cost}}',
    buildCountAria_many: 'Построить {{quantity}} зданий за {{cost}}',
    buildCountAria_other: 'Построить {{quantity}} здания за {{cost}}',
    autoSell: 'Автопродажа',
    autoSellNamed: 'Автопродажа: {{resource}}',
    storage: 'Склад: {{amount}} из {{capacity}}',
    missingForBuild: 'Не хватает для постройки: {{list}}',
  },
  warehouse: {
    empty: 'Склад пока пуст — постройте здания, и товары появятся здесь.',
    sellAll: 'Продать всё',
    emptyRow: 'Пусто',
  },
  notices: {
    built: '{{name}} ×{{qty}}',
    sold_one: '{{resource}}: продана {{amount}} единица (+{{income}})',
    sold_few: '{{resource}}: продано {{amount}} единицы (+{{income}})',
    sold_many: '{{resource}}: продано {{amount}} единиц (+{{income}})',
    sold_other: '{{resource}}: продано {{amount}} единицы (+{{income}})',
  },
  settings: {
    profile: 'Профиль',
    leaderboard: 'Лидеры',
    language: 'Язык',
  },
  reset: {
    button: 'Сбросить прогресс',
    confirm: 'Сбросить прогресс? Все деньги, здания и склад будут удалены безвозвратно.',
  },
  language: {
    title: 'Язык',
    description: 'Выберите язык интерфейса — он переключится мгновенно, без перезагрузки.',
    groupAria: 'Язык интерфейса',
  },
} as const satisfies TranslationDict;
