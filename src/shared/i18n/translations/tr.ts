import type { TranslationDict } from '../types';

export const tr = {
  tabs: {
    warehouse: 'Depo',
    construction: 'İnşaat malzemeleri',
    raw_material: 'Hammaddeler',
    factory: 'Fabrika',
    housing: 'Konut',
    settings: 'Ayarlar',
  },
  nav: {
    sections: 'Bölümler',
    back: 'Geri',
  },
  header: {
    buildQuantity: 'İnşa miktarı',
  },
  stepper: {
    less: 'Daha az',
    more: 'Daha çok',
  },
  panels: {
    buildings: 'Binalar',
    warehouse: 'Depo',
  },
  buildings: {
    potato_farm: {
      name: 'Patates çiftliği',
      description: 'İmparatorluğunuzun temel hammaddesi olan patates yetiştirir.',
    },
    chips_factory: {
      name: 'Cips fabrikası',
      description: 'Patatesleri daha pahalıya satılan çıtır cipslere dönüştürür.',
    },
    wheat_field: {
      name: 'Buğday tarlası',
      description: 'Her hasat döngüsünde buğday üretir.',
    },
    orange_grove: {
      name: 'Portakal bahçesi',
      description: 'Satışa hazır taze portakallar toplar.',
    },
    lumberjack: {
      name: 'Oduncu',
      description: 'İnşaatın temel hammaddesi olan odunu toplar.',
    },
    sawmill: {
      name: 'Kereste fabrikası',
      description: 'Odunu inşaat için keresteye dönüştürür.',
    },
    quarry: {
      name: 'Taş ocağı',
      description: 'Bina inşaatı için taş çıkarır.',
    },
    settler_house: {
      name: 'Yerleşimci evi',
      description: 'Hammadde üretimi için gereken yerleşimcileri barındırır.',
    },
    artisan_house: {
      name: 'Zanaatkâr evi',
      description: 'İşleme fabrikaları için gereken zanaatkârları barındırır.',
    },
  },
  resources: {
    potato: { name: 'Patates' },
    chips: { name: 'Cips' },
    wheat: { name: 'Buğday' },
    orange: { name: 'Portakal' },
    wood: { name: 'Odun' },
    planks: { name: 'Kereste' },
    stone: { name: 'Taş' },
  },
  population: {
    settler: { name: 'Yerleşimciler' },
    artisan: { name: 'Zanaatkârlar' },
    summary: {
      title: 'Nüfus',
      classRow: '{{className}}: toplam {{total}}, çalışan {{employed}}, boşta {{available}}',
    },
  },
  buildingStatus: {
    idle: 'Başlatma bekleniyor',
    running: 'Üretim',
    waiting_for_inputs: 'Hammadde bekleniyor',
    waiting_for_workers: 'İşçi bekleniyor',
    output_blocked: 'Depo dolu',
  },
  production: {
    missingResource: 'Yeterli {{resource}} yok: {{missing}} daha gerekli',
    outputFull: 'Depo dolu: {{resource}}',
  },
  buildingCard: {
    owned: 'İnşa edildi: {{value}}',
    cycleSeconds: '⏱ {{seconds}} sn',
    recipeAria: '{{recipe}}, döngü {{seconds}} sn',
    recipeAriaWithWorkforce:
      '{{recipe}}, döngü {{seconds}} sn, {{workforceCount}} {{workforceClass}} gerektirir',
    housingCapacity: 'Barındırır: {{amount}} {{class}}',
    build: 'İnşa et: {{cost}}',
    buildCountAria_one: '{{cost}} karşılığında {{quantity}} bina inşa et',
    buildCountAria_other: '{{cost}} karşılığında {{quantity}} bina inşa et',
    autoSell: 'Otomatik satış',
    autoSellNamed: 'Otomatik satış: {{resource}}',
    storage: 'Depo: {{amount}} / {{capacity}}',
    missingForBuild: 'İnşa için eksik: {{list}}',
  },
  warehouse: {
    empty: 'Depo şimdilik boş — binalar inşa edin, ürünler burada görünecek.',
    sellAll: 'Hepsini sat',
    emptyRow: 'Boş',
    filterAll: 'Tümü',
    filterAria: 'Kategoriye göre filtrele',
  },
  notices: {
    built: '{{name}} ×{{qty}}',
    sold_one: '{{resource}}: {{amount}} birim satıldı (+{{income}})',
    sold_other: '{{resource}}: {{amount}} birim satıldı (+{{income}})',
  },
  settings: {
    profile: 'Profil',
    leaderboard: 'Lider tablosu',
    language: 'Dil',
  },
  reset: {
    button: 'İlerlemeyi sıfırla',
    confirm: 'İlerleme sıfırlansın mı? Tüm para, binalar ve depo kalıcı olarak silinecek.',
  },
  language: {
    title: 'Dil',
    description: 'Arayüz dilini seçin — anında değişir, yeniden yükleme gerekmez.',
    groupAria: 'Arayüz dili',
  },
} as const satisfies TranslationDict;
