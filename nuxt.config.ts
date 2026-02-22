// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,

  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/scripts', ['@piwikpro/nuxt-piwik-pro', {
    containerId: "48a0f7d5-b139-4e3d-94f8-62e23b7f1b6d",
    containerUrl: "https://ryxwaer.containers.piwik.pro",
  }]],
  scripts: {
    registry: {
      googleAdsense: {
        client: "ca-pub-9197371272439471",
        autoAds: true,
      },
      cloudflareWebAnalytics: {
        token: '4d5de9c91e9f466e843d81b9daaef673'
      }
    },
  },

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27',

  runtimeConfig: {
    DB_URI: process.env.DB_URI, // accessible server-side only
    THEME_API: process.env.THEME_API || 'https://wotd-theme.ryxwaer.com/api/theme',
  },

  app: {
    head: {
      title: 'Binance WODL Solver & Wordle Helper',
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
        { property: 'og:title', content: 'Binance WODL Solver - Find WODL Answers Fast' },
        { property: 'og:description', content: 'Free Binance WODL solver and Wordle helper tool I created as a personal project. Find possible answers based on your clues.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'WODL Solver' },
        { property: 'og:url', content: 'https://wordl.ryxwaer.com/' },
        { property: 'og:image', content: 'https://wordl.ryxwaer.com/favicon-512x512.png' },
        { property: 'og:image:width', content: '512' },
        { property: 'og:image:height', content: '512' },
        { property: 'og:image:alt', content: 'Binance WODL Solver' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Binance WODL Solver & Wordle Helper | Free Word Game Tool' },
        { name: 'twitter:description', content: 'Free Binance WODL solver and Wordle helper. Get instant solutions for today\'s WODL puzzle and find answers for word games.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Free Binance WODL solver and Wordle helper I built to help players. Get answers for today\'s WODL puzzle instantly.' },
        { name: 'keywords', content: 'WODL, Binance WODL, WODL solver, Binance WODL solver, Wordle, WODL answer today, wodl 5 letter words, how to play binance wodl' },
        { name: 'msapplication-TileColor', content: '#0a0a0a' },
        { name: 'msapplication-TileImage', content: '/favicon-144x144.png' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },
        // SSR fallbacks — keep in sync with --color-bg-solid in main.css
        // At runtime, ColorBackground.vue overwrites these from CSS variables
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#f8f8f8' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#0a0a0a' },
        { name: 'theme-color', content: '#0a0a0a' }
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