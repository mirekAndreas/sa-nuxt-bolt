export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],
  i18n: {
    locales: [
      { code: 'cs', iso: 'cs-CZ', file: 'cs.json', name: 'Čeština' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'de', iso: 'de-DE', file: 'de.json', name: 'Deutsch' }
    ],
    defaultLocale: 'cs',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    vueI18n: './i18n.config.ts'
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'cs'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  devtools: { enabled: true },
  typescript: {
    strict: true
  }
})