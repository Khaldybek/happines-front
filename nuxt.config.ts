import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

const isPublicAsset = (id: string) =>
  id.startsWith('/images/') || (/^\/[^/]*\.(png|jpg|jpeg|gif|svg|webp|ico)(\?|$)/i.test(id))

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-06-01',
  devtools: { enabled: true },
  devServer: { port: 3010 },
  srcDir: 'app',
  hooks: {
    'vite:config'(viteConfig) {
      const root = path.resolve(projectRoot)
      const mainPath = path.join(root, '.nuxt/tsconfig.json')
      if (existsSync(mainPath)) {
        const content = readFileSync(mainPath, 'utf-8')
        for (const name of ['tsconfig.app.json', 'tsconfig.shared.json', 'tsconfig.node.json']) {
          const outPath = path.join(root, '.nuxt', name)
          if (!existsSync(outPath)) writeFileSync(outPath, content)
        }
      }
    },
  },
  vite: {
    plugins: [
      {
        name: 'nuxt-tsconfig-copy',
        enforce: 'pre',
        configResolved() {
          const root = path.resolve(projectRoot)
          const mainPath = path.join(root, '.nuxt/tsconfig.json')
          if (!existsSync(mainPath)) return
          const content = readFileSync(mainPath, 'utf-8')
          for (const name of ['tsconfig.app.json', 'tsconfig.shared.json', 'tsconfig.node.json']) {
            const outPath = path.join(root, '.nuxt', name)
            if (!existsSync(outPath)) writeFileSync(outPath, content)
          }
        },
      },
      {
        name: 'resolve-public-assets',
        enforce: 'pre',
        resolveId(id) {
          if (typeof id !== 'string' || !isPublicAsset(id)) return null
          const fullPath = path.join(projectRoot, 'public', id)
          if (existsSync(fullPath)) return fullPath
          return { id, external: true }
        },
      },
    ],
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
  css: ['~/assets/css/variables.css', '~/assets/css/main.css'],
})
