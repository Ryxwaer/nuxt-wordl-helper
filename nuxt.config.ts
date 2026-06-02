// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,

  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/scripts', ['@piwikpro/nuxt-piwik-pro', {
    containerId: "48a0f7d5-b139-4e3d-94f8-62e23b7f1b6d",
    containerUrl: "https://ryxwaer.containers.piwik.pro",
  }], '@nuxtjs/sitemap'],

  sitemap: {
    // Generate at runtime, not at prerender time. The sitemap.list() API
    // showed `indexed: 0 / submitted: 3` with 2 warnings on 2026-05-24
    // because the sitemap was being baked at build time - `lastmod` then
    // stayed frozen at the deploy timestamp for weeks (e.g. all three
    // URLs were stuck at 2026-04-24 long after fresh deploys), and Google
    // flags lastmod-not-updating-despite-changefreq=daily as a warning.
    //
    // With cacheMaxAgeSeconds and the route excluded from Nitro prerender,
    // the urls() function runs per-request (cached for 10 minutes) so
    // `lastmod` is always within a 10-minute window of "now".
    cacheMaxAgeSeconds: 600,
    urls: () => {
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
    THEME_API: process.env.THEME_API,
  },

  app: {
    head: {
      // Static, theme-agnostic title. Earlier sessions used a dynamic
      // theme-name-in-title pattern ("…- \"Pre-IPO Assets\" Theme Words…")
      // for a freshness signal, but slow-crawl engines (Brave, Bing) end
      // up serving multi-week-stale SERP snippets ("Pre-IPO Assets" still
      // showing in Brave 2+ weeks after the theme changed). Body content
      // (H2 / word pool / FAQ schema) stays dynamic for Google's crawl
      // freshness signals; only the SERP-facing title + meta-description
      // are now static. See report/2025-05-24.md.
      //
      // Naming: WODL is the community/search term, WOTD is Binance's
      // official name. Including both maximises query coverage AND
      // outflanks the current #1 competitor (miguelroquefernandes.com)
      // who lacks WOTD entirely in his title/description.
      title: 'Binance WODL Solver - Today\'s Word of the Day Answer',
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
        { property: 'og:title', content: 'Binance WODL Solver - Today\'s Word of the Day Answer' },
        { property: 'og:description', content: 'Free Binance WODL solver - also known as WOTD (Word of the Day). Enter green, yellow & gray clues and get instant 3–8 letter answers. No login.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Binance WODL Solver' },
        { property: 'og:url', content: 'https://wordl.ryxwaer.com/' },
        { property: 'og:image', content: 'https://wordl.ryxwaer.com/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:alt', content: 'Binance WODL Solver - letter tiles spelling WORDL' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Binance WODL Solver - Today\'s Word of the Day Answer' },
        { name: 'twitter:description', content: 'Enter your clues, get today\'s Binance WODL / WOTD answer in seconds. Free, no login. 3–8 letter words.' },
        { name: 'twitter:image', content: 'https://wordl.ryxwaer.com/og-image.jpg' },
        { name: 'twitter:image:alt', content: 'Binance WODL Solver - letter tiles spelling WORDL' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Free Binance WODL solver - also known as WOTD or Word of the Day. Enter green, yellow & gray clues and get instant 3–8 letter answers.' },
        // The app is Binance-WODL-specific (theme-aware ranking biases
        // results toward this week's crypto theme words). We deliberately
        // do NOT target generic Wordle queries - a Wordle player would
        // see crypto-themed words ranked first and get a worse experience.
        // Keep keywords focused on Binance WODL / WOTD only.
        { name: 'keywords', content: 'binance wodl, binance wodl solver, binance wotd, binance wotd solver, wodl solver, wotd solver, binance word of the day, word of the day solver, binance wodl answer today, wodl theme today, wodl 5 letter words, wodl 6 letter words, wodl 7 letter words, crypto word game, binance crypto word puzzle' },
        { name: 'msapplication-TileColor', content: '#0a0a0a' },
        { name: 'msapplication-TileImage', content: '/favicon-144x144.png' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },
        // SSR fallbacks - keep in sync with --color-bg-solid in main.css
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
      // Excluding /sitemap.xml from prerender lets @nuxtjs/sitemap serve
      // it at request time (with a 600s SWR cache, see `sitemap` config
      // above) so `<lastmod>` reflects "now" instead of the build time.
      ignore: ['/debug', '/sitemap.xml']
    }
  }
})