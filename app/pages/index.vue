<template>
  <!-- Main page container -->
  <div class="container mx-auto px-4 py-8 max-w-7xl flex flex-col items-center">
    <!-- H1 heading outside the card -->
    <h1 class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)] drop-shadow-[0_0_25px_var(--glow-primary)]">
      Wordle & Binance WODL Solver
    </h1>

    <!-- Wordle Helper Card Container -->
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

    <!-- Today's WODL Theme — H2 for SEO (people search by theme name) -->
    <NuxtLink v-if="theme" to="/wodl" class="mt-6 group text-center block hover:no-underline">
      <h2 class="text-lg font-semibold text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
        Today's WODL Theme:
        <span class="text-[var(--color-primary)]">{{ theme }}</span>
      </h2>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
// Fetch current WODL theme (SSR — rendered into HTML for SEO)
const { data: themeData } = await useFetch<{ theme: string | null }>('/api/theme')
const theme = computed(() => themeData.value?.theme ?? null)

useSeoMeta({
  title: "Free Binance WODL Solver & Wordle Helper | Instant Word Game Answers",
  description:
    "Free Binance WODL solver and Wordle helper — get today's WODL answer instantly! Enter your clues and find possible solutions for 5, 6, or 7-letter word puzzles.",
  ogTitle: "Free Binance WODL Solver & Wordle Helper | Instant Answers",
  ogDescription:
    "Solve today's Binance WODL puzzle and Wordle instantly with my free tool. Enter your clues to get word suggestions in seconds.",
  keywords:
    "WODL, Binance WODL, Binance WODL solver, WODL solver, WODL answer, WODL answer today, binance wodl answer today, wodl 5 letter words, how to play binance wodl, Binance word game, wordle, wordle helper, wordle solver, wodl helper, wodl answers, crypto word game, word puzzle, find words, word game answers",
});

// Add canonical URL and JSON-LD structured data for better SEO
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
        "url": "https://wordl.ryxwaer.com/",
        "description": "A free tool to help solve Binance WODL and Wordle puzzles by suggesting possible answers based on your clues.",
        "applicationCategory": "Game, Utility",
        "operatingSystem": "Any",
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
