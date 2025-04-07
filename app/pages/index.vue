<template>
  <div
    class="w-full max-w-5xl min-h-200 mt-16 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg"
  >
    <div class="items-center flex flex-col">
      <div class="md:max-w-50 flex flex-col items-center">
        <CorrectPositions />
      </div>
    </div>

    <!-- Grid layout with column changes on mobile and desktop -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Wordle & Binance WODL Helper - Find Puzzle Answers",
  description:
    "Stuck on today's Wordle or Binance WODL? Use our helper tool to find possible answers based on correct letters, included letters, and excluded letters for both word puzzle games.",
  ogTitle: "Wordle & Binance WODL Helper - Find Puzzle Answers",
  ogDescription:
    "Get help solving Wordle and Binance WODL puzzles. Enter your known letters and find potential solutions instantly for these popular word games.",
  // Maybe add an og:image pointing to a relevant screenshot or logo in your public/ directory
  // ogImage: '/images/wordle-helper-promo.png',
  keywords:
    "wordle, wordle helper, wordle solver, binance wodl, wodl helper, wodl answers, wodl solver, binance word game, crypto word game, word puzzle, find words, word game answers",
});
</script>
