// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-9591206482674636'
    }]
  ],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27',

  runtimeConfig: {
    DB_URI: process.env.DB_URI, // accessible server-side only
  },
})