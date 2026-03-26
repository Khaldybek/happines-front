import {
  type PromoLocaleCode,
  promotionsMessages,
} from '~/locales/promotions'

const CODES: PromoLocaleCode[] = ['ru', 'kz', 'en', 'zh']

function localeFromRoute(
  query: Record<string, unknown>,
): PromoLocaleCode {
  const q = query.lang
  const raw = (
    typeof q === 'string' ? q : Array.isArray(q) ? q[0] : ''
  )?.toLowerCase()
  if (raw === 'ch' || raw === 'cn') return 'zh'
  if (CODES.includes(raw as PromoLocaleCode)) return raw as PromoLocaleCode
  return 'ru'
}

export function usePromotionsLocale() {
  const route = useRoute()
  const locale = computed(() => localeFromRoute(route.query as Record<string, unknown>))

  function t(key: keyof (typeof promotionsMessages)['ru']): string {
    return promotionsMessages[locale.value][key]
  }

  /** Локализованный префикс + название региона (из API) */
  function promotionSubtitle(regionTitle: string): string {
    return `${t('promotionFor')} ${regionTitle}`.replace(/\s+/g, ' ').trim()
  }

  return { locale, t, promotionSubtitle }
}
