<template>
  <!-- Main page container -->
  <div class="container mx-auto px-4 py-8 max-w-7xl flex flex-col items-center">
    <!-- H1 heading outside the card -->
    <h1 class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)] drop-shadow-[0_0_25px_var(--glow-primary)]">
      Wordle & Binance WODL Solver
    </h1>

    <!-- Wordle Helper Card Container -->
    <div
      class="w-full max-w-5xl min-h-200 p-8 rounded-3xl glass-card"
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
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Binance WODL Solver & Wordle Helper | Free Word Game Tool",
  description:
    "Free Binance WODL solver and Wordle helper I created. Get instant solutions for today's WODL puzzle. Find possible answers for Binance and NYT word games.",
  ogTitle: "Binance WODL Solver & Wordle Helper | Find Answers Fast",
  ogDescription:
    "Solve Binance WODL puzzles easily with my free tool. A personal project to help with Binance word game and Wordle with instant word suggestions.",
  // Maybe add an og:image pointing to a relevant screenshot or logo in your public/ directory
  // ogImage: '/images/wordle-helper-promo.png',
  keywords:
    "WODL, Binance WODL, Binance WODL solver, WODL solver, WODL answer, Binance word game, wordle, wordle helper, wordle solver, wodl helper, wodl answers, crypto word game, word puzzle, find words, word game answers",
});

// Add JSON-LD structured data for better SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Binance WODL Solver",
        "url": "https://wordl.ryxwaer.com/",
        "description": "A free tool I created to help solve Binance WODL and Wordle puzzles by suggesting possible answers based on your clues.",
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
