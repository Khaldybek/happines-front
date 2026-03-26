/**
 * Global auth guard — redirects unauthenticated users to /login
 * when they try to access any /lk/* route.
 *
 * Reads the token directly from the cookie (same key used by useAuthStore)
 * so this works on both SSR and client without initialising Pinia.
 */
export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/lk')) {
    return
  }

  const token = useCookie<string | null>('auth_token')

  if (!token.value) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
