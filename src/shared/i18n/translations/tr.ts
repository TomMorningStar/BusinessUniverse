import type { TranslationDict } from '../types';

export const tr = {
  tabs: {
    warehouse: 'Depo',
    raw_material: 'Hammaddeler',
    factory: 'Fabrika',
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
  },
  resources: {
    potato: { name: 'Patates' },
    chips: { name: 'Cips' },
    wheat: { name: 'Buğday' },
    orange: { name: 'Portakal' },
  },
  buildingStatus: {
    idle: 'Başlatma bekleniyor',
    running: 'Üretim',
    waiting_for_inputs: 'Hammadde bekleniyor',
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
    build: 'İnşa et: {{cost}}',
    buildCountAria_one: '{{cost}} karşılığında {{quantity}} bina inşa et',
    buildCountAria_other: '{{cost}} karşılığında {{quantity}} bina inşa et',
    autoSell: 'Otomatik satış',
    autoSellNamed: 'Otomatik satış: {{resource}}',
    storage: 'Depo: {{amount}} / {{capacity}}',
  },
  warehouse: {
    empty: 'Depo şimdilik boş — binalar inşa edin, ürünler burada görünecek.',
    sellAll: 'Hepsini sat',
    emptyRow: 'Boş',
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
