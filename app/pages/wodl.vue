<template>
  <!-- Main page container -->
  <div class="container mx-auto px-4 py-8 max-w-7xl flex flex-col items-center">
    <!-- H1 heading outside the card -->
    <h1 class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)] drop-shadow-[0_0_25px_var(--glow-primary)]">
      Binance WODL Solver
    </h1>

    <div v-glow class="w-full max-w-5xl mb-8 p-8 glass-card rounded-3xl">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        What is Binance WODL?
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Binance WODL is a daily word game on the Binance platform inspired by Wordle. Players have six attempts to guess a 5-letter word and can earn crypto rewards for correct guesses.
      </p>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Like Wordle, WODL gives feedback with different colored tiles:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6 ml-4">
        <li><span class="font-bold" style="color: var(--letter-correct)">Green</span> tiles indicate correct letters in the right position</li>
        <li><span class="font-bold" style="color: var(--letter-include)">Yellow</span> tiles indicate correct letters in the wrong position</li>
        <li><span class="font-bold" style="color: var(--letter-exclude)">Gray</span> tiles indicate letters not in the word</li>
      </ul>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        I created this WODL solver to help find answers quickly. Enter what you know below and get instant suggestions!
      </p>
    </div>

    <!-- Wordle Helper Card Container (redirects to home) -->
    <div v-glow class="w-full max-w-5xl min-h-[200px] p-8 glass-card rounded-3xl flex items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <h2 class="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
          WODL Solver Tool
        </h2>
        <NuxtLink to="/" class="custom-button mb-6 px-8 py-3 text-lg font-bold">
          Use My WODL Solver Now
        </NuxtLink>
        <p class="text-gray-600 dark:text-gray-400 mb-4 text-center max-w-lg">
          This tool will help you find today's Binance WODL answer in seconds! I built it because I play WODL daily and wanted to help others.
        </p>
      </div>
    </div>
    
    <div v-glow class="w-full max-w-5xl mt-8 p-8 glass-card rounded-3xl">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        How to Use My Binance WODL Solver
      </h2>
      <ul class="space-y-3 text-gray-600 dark:text-gray-400 ml-4">
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 mt-0.5 rounded shrink-0" style="background-color: var(--letter-correct)"></span>
          <span>Enter your <strong style="color: var(--letter-correct)">green</strong> letters in the exact position boxes</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 mt-0.5 rounded shrink-0" style="background-color: var(--letter-include)"></span>
          <span>Add <strong style="color: var(--letter-include)">yellow</strong> letters to the "Included Letters" section</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 mt-0.5 rounded shrink-0" style="background-color: var(--letter-exclude)"></span>
          <span>Mark <strong style="color: var(--letter-exclude)">gray</strong> letters in the "Excluded Letters" section</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="inline-block w-5 h-5 mt-0.5 rounded shrink-0 bg-[var(--color-primary)]"></span>
          <span>Hit <strong>"Calculate Words"</strong> to see all possible WODL answers</span>
        </li>
      </ul>
      <p class="mt-6 text-gray-600 dark:text-gray-400">
        The more clues you enter from your guesses, the more accurate the solver becomes! I created this as a personal project to help fellow WODL players.
      </p>
    </div>

    <div
      class="mt-8 text-center"
    >
      <NuxtLink
        to="/"
        class="inline-block bg-[#f0b90b] hover:bg-[#f8d33a] text-[var(--color-letters)] font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-[#f0b90b]/20 hover:shadow-[#f0b90b]/40 hover:scale-[1.02]"
      >
        Back to Helper
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Today's Binance WODL Answer | Free Daily WODL Solver Tool",
  description: "Get today's Binance WODL answer instantly with this free solver. Enter your green, yellow, and gray clues to find the daily WODL solution in seconds.",
  ogTitle: "Today's Binance WODL Answer | Free Daily WODL Solver",
  ogDescription: "Solve today's Binance WODL puzzle in seconds. Free tool — enter your clues and get instant answers for the daily WODL challenge.",
  keywords: "WODL, Binance WODL, WODL solver, WODL answer today, binance wodl answer today, daily WODL answer, Binance word game, WODL solution, crypto WODL, WODL crypto game, wodl 5 letter words, how to play binance wodl",
});

// Add canonical URL and JSON-LD structured data for better SEO
useHead({
  link: [
    { rel: 'canonical', href: 'https://wordl.ryxwaer.com/wodl' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Binance WODL Solver",
        "url": "https://wordl.ryxwaer.com/wodl",
        "description": "A free tool to help solve Binance WODL puzzles by suggesting possible answers based on your clues. Get today's WODL answer instantly.",
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