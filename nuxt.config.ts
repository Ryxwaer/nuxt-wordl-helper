// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,

  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/scripts', ['@piwikpro/nuxt-piwik-pro', {
    containerId: "48a0f7d5-b139-4e3d-94f8-62e23b7f1b6d",
    containerUrl: "https://ryxwaer.containers.piwik.pro",
  }], '@nuxtjs/sitemap'],

  sitemap: {
    urls: () => {
      // Use the build time as lastmod. `/` and `/wodl` change per-request
      // (theme pool) so we always advertise "today" as the last modification
      // to encourage more frequent recrawls.
      const now = new Date().toISOString()
      return [
        { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: now },
        { loc: '/wodl', changefreq: 'daily', priority: 0.9, lastmod: now },
        { loc: '/about', changefreq: 'monthly', priority: 0.7, lastmod: now },
      ]
    },
    exclude: ['/log', '/policy', '/red-packet', '/debug'],
  },
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
    THEME_API: 'https://wotd-theme.ryxwaer.com/api/theme',
  },

  app: {
    head: {
      title: 'WODL Solver & Wordle Helper — Today\'s Answer & Word Finder',
      link: [
        // Preconnect hints for known third-party origins. Cuts ~100-300ms
        // off the first paint of AdSense / analytics / theme-API requests
        // on cold cache, which feeds into Core Web Vitals (LCP / INP).
        // `crossorigin` is required on preconnects to origins that serve
        // CORS-eligible requests (AdSense, fonts).
        { rel: 'preconnect', href: 'https://pagead2.googlesyndication.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://wotd-theme.ryxwaer.com' },
        { rel: 'preconnect', href: 'https://ryxwaer.containers.piwik.pro' },
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
        { property: 'og:title', content: 'WODL Solver & Wordle Helper — Today\'s Answer & Word Finder' },
        { property: 'og:description', content: 'Enter green, yellow & gray clues and get instant word answers. Works for Wordle and Binance WODL (3–8 letters). Free, no login.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Wordle Helper' },
        { property: 'og:url', content: 'https://wordl.ryxwaer.com/' },
        { property: 'og:image', content: 'https://wordl.ryxwaer.com/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:alt', content: 'Wordle Helper and Binance WODL Solver — letter tiles spelling WORDL' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'WODL Solver & Wordle Helper — Today\'s Answer & Word Finder' },
        { name: 'twitter:description', content: 'Enter your clues, get instant word answers. Free Wordle helper and Binance WODL solver (3–8 letters).' },
        { name: 'twitter:image', content: 'https://wordl.ryxwaer.com/og-image.jpg' },
        { name: 'twitter:image:alt', content: 'Wordle Helper and Binance WODL Solver — letter tiles spelling WORDL' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Free Wordle helper and Binance WODL solver — enter green, yellow & gray clues and get instant answers for 3–8 letter words. No login required.' },
        { name: 'keywords', content: 'wordle helper, wordle solver, word finder, WODL solver, Binance WODL, Binance WODL solver, WODL answer today, wodl 5 letter words, crypto word game, word puzzle solver' },
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

  nitro: {
    prerender: {
      ignore: ['/debug']
    },
    // Strip the `x-powered-by: Nuxt` header flagged as a minor info leak in
    // the weekly SEO audit. `routeRules` is applied at response time by
    // Nitro/h3, which is strictly more reliable than a request-time
    // middleware (which would run before the header is set).
    routeRules: {
      '/**': { headers: { 'x-powered-by': '' } }
    }
  }
})