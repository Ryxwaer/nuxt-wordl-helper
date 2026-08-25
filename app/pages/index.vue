<template>
  <!-- Main page container -->
  <div class="container mx-auto px-4 py-8 max-w-7xl flex flex-col items-center">
    <!-- H1 heading outside the card -->
    <h1 class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)] drop-shadow-[0_0_25px_var(--glow-primary)]">
      <span class="hidden sm:inline">Binance </span>WODL Solver
    </h1>

    <!-- WODL Solver Card Container -->
      <div
        v-glow
        class="w-full max-w-5xl min-h-160 p-8 rounded-3xl glass-card"
      >
        <div class="items-center flex flex-col">
          <div class="md:max-w-50 flex flex-col items-center">
            <CorrectPositions />
          </div>
        </div>

        <!-- Grid layout with column changes on mobile and desktop -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Mobile: ExcludedChars comes after IncludedChars, Desktop: ExcludedChars first -->
          <div class="order-2 md:order-1">
            <ExcludedChars />
          </div>

          <!-- Word Setup (Correct Positions, Slider, Calculate Button) -->
          <div
            class="col-span-1 flex flex-col items-center mt-4 order-3 md:order-2"
          >
            <CalculateButton />
            <div class="h-16" />
          </div>

          <!-- ExcludedChars: Mobile below IncludedChars, Desktop first -->
          <div class="order-1 md:order-3">
            <IncludedChars />
          </div>
        </div>
      </div>

    <!-- The homepage stays a calculator; theme context lives on /wodl. -->
    <NuxtLink v-if="theme" to="/wodl" class="mt-6 group text-center block hover:no-underline">
      <h2 class="text-lg font-semibold text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
        Today's WODL Theme:
        <span class="text-[var(--color-primary)]">{{ theme }}</span>
      </h2>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
// Fetch current WODL theme (SSR - rendered into HTML for SEO)
const { data: themeData } = await useFetch<{ theme: string | null }>('/api/theme')
const theme = computed(() => themeData.value?.theme ?? null)

// Do not make this theme-dependent - see docs/documentation.md.
useSeoMeta({
  title: "Binance WODL Solver - Today's Word of the Day Answer",
  description:
    "Free Binance WODL solver - also known as WOTD or Word of the Day. Enter green, yellow & gray clues and get instant 3–8 letter answers.",
  ogTitle: "Binance WODL Solver - Today's Word of the Day Answer",
  ogDescription:
    "Enter your green, yellow & gray clues, get today's Binance WODL / WOTD answer in seconds. Free, no login. 3–8 letter words.",
  ogImage: "https://wordl.ryxwaer.com/og-image.jpg",
  twitterImage: "https://wordl.ryxwaer.com/og-image.jpg",
  // Binance WODL/WOTD only, never generic Wordle - see docs/documentation.md.
  keywords:
    "binance wodl, binance wodl solver, binance wotd, binance wotd solver, wodl solver, wotd solver, binance word of the day, word of the day solver, wodl answer today, wodl theme today, wodl 5 letter words, wodl 6 letter words, wodl 7 letter words, crypto word game, binance crypto word puzzle",
});

// No FAQPage schema: Google requires its Q&As to be visible on the page,
// and this one has no FAQ section.
useHead({
  link: [
    { rel: 'canonical', href: 'https://wordl.ryxwaer.com/' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Binance WODL Solver",
        "alternateName": [
          "Binance WOTD Solver",
          "Binance Word of the Day Solver",
          "WODL Solver",
          "WOTD Solver"
        ],
        "url": "https://wordl.ryxwaer.com/",
        "description": "A free Binance WODL / WOTD (Word of the Day) solver that suggests possible answers from this week's Binance theme word pool based on your green, yellow and gray letter clues.",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works in any modern browser.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      })
    }
  ]
})
</script>
