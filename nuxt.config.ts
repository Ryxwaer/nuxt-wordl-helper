// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-9197371272439471'
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

  app: {
    head: {
      title: 'Wordle Helper', // Default title if a page doesn't set one
      titleTemplate: '%s | Wordle Helper', // Appends "| Wordle Helper" to page titles
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon-180x180.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' }
      ],
      meta: [
        { charset: 'utf-8' },
        { property: 'og:title', content: 'Wordle Helper - Find Wordle Answers Fast' },
        { property: 'og:description', content: 'Filter possible Wordle words based on your guesses.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Your friendly helper tool for solving Wordle puzzles. Find possible answers quickly and easily.' }, // Default description
        { name: 'msapplication-TileColor', content: '#15181c' },
        { name: 'msapplication-TileImage', content: '/favicon-144x144.png' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },
        { name: 'theme-color', content: '#15181c' }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  // Add this nitro configuration
  nitro: {
    prerender: {
      ignore: ['/debug']
    }
  }
})