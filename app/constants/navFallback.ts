import type { NavigationResponse } from '~/types/navigation'

/** Меню, если API недоступен */
export const FALLBACK_NAVIGATION: NavigationResponse = {
  version: 0,
  language: 'ru',
  base_path: 'api',
  items: [
    {
      key: 'home',
      title: 'Главное',
      href: '/',
      children: undefined,
    },
    {
      key: 'company',
      title: 'О компании',
      href: null,
      children: [
        { key: 'about_us', title: 'О нас', href: '/about' },
        { key: 'documents', title: 'Документы', href: '/documents' },
        { key: 'certificates', title: 'Сертификаты', href: '/certificates' },
        { key: 'privacy_policy', title: 'Политика конфиденциальности', href: '/privacy' },
      ],
    },
    {
      key: 'production',
      title: 'Продукция',
      href: null,
      children: [
        { key: 'c21', title: 'Очищение', href: '/catalog/ocishhenie' },
        { key: 'c22', title: 'Восстановление и омоложение', href: '/catalog/vosstanovlenie-i-omolozenie' },
        { key: 'c23', title: 'Ежедневный уход', href: '/catalog/ezednevnyi-uxod' },
        { key: 'c24', title: 'Товары для семьи', href: '/catalog/tovary-dlia-semi' },
        { key: 'diagnostic_test', title: 'Диагностический тест', href: '/diagnostic' },
        { key: 'health_articles', title: 'Статьи о здоровье', href: '/health-articles' },
        { key: 'reviews', title: 'Отзывы', href: '/reviews' },
      ],
    },
    { key: 'online_learning', title: 'Онлайн-обучение', href: '/learning' },
    {
      key: 'events',
      title: 'События',
      href: null,
      children: [
        { key: 'promotions', title: 'Промоушены', href: '/events/promotion' },
        { key: 'photo_gallery', title: 'Галерея', href: '/gallery' },
        { key: 'top_distributors', title: 'Выдающиеся дистрибьюторы', href: '/distributors' },
        { key: 'news', title: 'Новости', href: '/news' },
      ],
    },
    { key: 'business', title: 'Бизнес', href: '/business' },
    { key: 'contacts', title: 'Контакты', href: '/contacts' },
  ],
  languages: {
    default: 'ru',
    query_param: 'lang',
    items: [
      { code: 'ru', native: 'Русский' },
      { code: 'en', native: 'English' },
      { code: 'kz', native: 'Қазақша' },
      { code: 'zh', native: '中文' },
    ],
  },
}
