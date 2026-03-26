// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: { port: 3010 },
  srcDir: 'app',
  runtimeConfig: {
    public: {
      /** NUXT_PUBLIC_API_BASE — без завершающего слэша */
      apiBase: 'http://127.0.0.1:8000',
    },
  },
  app: {
    head: {
      title: 'Happiness',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
  css: [
    '~/assets/css/variables.css',
    '~/assets/css/main.css',
    '~/assets/css/page-hero-catalog.css',
  ],
  nitro: {
    devServer: { port: 3010 },
  },
})
