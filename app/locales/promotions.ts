/** Переводы страницы промоушенов (синхрон с ?lang=ru|kz|en|zh) */
export type PromoLocaleCode = 'ru' | 'kz' | 'en' | 'zh'

export const promotionsLocaleKeys = [
  'promotionFor',
  'longTermTab',
  'longTermSubtitle',
  'loading',
  'loadError',
  'prevTab',
  'nextTab',
  'readMore',
] as const

export type PromotionsLocaleKey = (typeof promotionsLocaleKeys)[number]

export const promotionsMessages: Record<
  PromoLocaleCode,
  Record<PromotionsLocaleKey, string>
> = {
  ru: {
    promotionFor: 'Промоушен для',
    longTermTab: 'Долгосрочные',
    longTermSubtitle: 'Долгосрочные промоушены',
    loading: 'Загрузка…',
    loadError:
      'Не удалось загрузить промоушены. Проверьте API и попробуйте позже.',
    prevTab: 'Предыдущий',
    nextTab: 'Следующий',
    readMore: 'Подробнее',
  },
  kz: {
    promotionFor: 'Промоушен:',
    longTermTab: 'Ұзақ мерзімді',
    longTermSubtitle: 'Ұзақ мерзімді промоушендер',
    loading: 'Жүктелуде…',
    loadError:
      'Промоушендерді жүктеу мүмкін болмады. API тексеріңіз.',
    prevTab: 'Алдыңғы',
    nextTab: 'Келесі',
    readMore: 'Толығырақ',
  },
  en: {
    promotionFor: 'Promotion for',
    longTermTab: 'Long-term',
    longTermSubtitle: 'Long-term promotions',
    loading: 'Loading…',
    loadError: 'Could not load promotions. Please try again later.',
    prevTab: 'Previous',
    nextTab: 'Next',
    readMore: 'Read more',
  },
  zh: {
    promotionFor: '促销活动 ·',
    longTermTab: '长期活动',
    longTermSubtitle: '长期促销活动',
    loading: '加载中…',
    loadError: '无法加载促销信息，请稍后再试。',
    prevTab: '上一项',
    nextTab: '下一项',
    readMore: '了解更多',
  },
}
