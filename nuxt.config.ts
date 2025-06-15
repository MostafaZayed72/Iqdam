// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxt/icon',
    'nuxt-swiper',
    'vuetify-nuxt-module',
  ],
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
},
i18n: {
  strategy: 'no_prefix',
  lazy: true,
  langDir: 'locales/',
  defaultLocale: 'ar',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
  },
  locales: [
    {
      code: 'ar',
      iso: 'ar-EG',
      name: 'Arabic',
      file: 'ar.json',
      dir: 'rtl', // ← ضروري
    },
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en.json',
      dir: 'ltr', // ← ضروري
    },
  ],
}




})
