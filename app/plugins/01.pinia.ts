import { createPinia, setActivePinia } from 'pinia'

export default defineNuxtPlugin({
  name: 'app-pinia',
  enforce: 'pre',
  setup(nuxtApp) {
    const pinia = createPinia()

    nuxtApp.vueApp.use(pinia)

    // Pinia 3.x no longer sets activePinia automatically via app.use() —
    // call setActivePinia explicitly so useStore() works everywhere.
    setActivePinia(pinia)

    if (import.meta.server) {
      nuxtApp.payload.pinia = pinia.state.value
    }
    else if (nuxtApp.payload?.pinia) {
      pinia.state.value = nuxtApp.payload.pinia as typeof pinia.state.value
    }

    return { provide: { pinia } }
  },
})
