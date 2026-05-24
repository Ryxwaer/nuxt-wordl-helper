<template>
  <!-- Main page container -->
  <div class="container mx-auto px-4 py-8 max-w-7xl flex flex-col items-center">
    <!-- H1 heading outside the card -->
    <h1 class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)] drop-shadow-[0_0_25px_var(--glow-primary)]">
      Binance WODL Solver
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

    <!-- Today's WODL Theme — link to the dedicated /wodl page where the
         current theme + word pool are surfaced with full context. The
         homepage stays a calculator: only the tool, the H1 and this small
         contextual link. Background context lives on /wodl, /about and
         the layout footer (default.vue). See report/2025-05-24.md §6. -->
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

// SERP-facing meta is fully static (no theme.value reads here, no dynamic
// title computed). Earlier sessions experimented with dynamic theme-name
// titles for "freshness", but slow-crawl engines (Brave, Bing) cache the
// title from one crawl window and serve a stale theme name for weeks.
// Body content (the live WODL theme card on /wodl) keeps Google's
// freshness signals; SERP titles stay correct year-round.
//
// Naming: the app targets Binance WODL specifically — NOT generic Wordle.
// The solver biases results toward this week's Binance crypto theme
// words, so a Wordle player landing here would get a worse experience.
// Both "WODL" (community/search term) and "WOTD" / "Word of the Day"
// (Binance's official name) appear so we capture both query families.
useSeoMeta({
  title: "Binance WODL Solver — Today's Word of the Day Answer",
  description:
    "Free Binance WODL solver — also known as WOTD or Word of the Day. Enter green, yellow & gray clues and get instant 3–8 letter answers.",
  ogTitle: "Binance WODL Solver — Today's Word of the Day Answer",
  ogDescription:
    "Enter your green, yellow & gray clues, get today's Binance WODL / WOTD answer in seconds. Free, no login. 3–8 letter words.",
  ogImage: "https://wordl.ryxwaer.com/og-image.jpg",
  twitterImage: "https://wordl.ryxwaer.com/og-image.jpg",
  // Binance-WODL-specific keywords only. Generic Wordle keywords removed
  // 2026-05-24: the solver's theme-aware ranking would actively hurt a
  // Wordle player's experience, so we shouldn't compete for that traffic.
  keywords:
    "binance wodl, binance wodl solver, binance wotd, binance wotd solver, wodl solver, wotd solver, binance word of the day, word of the day solver, wodl answer today, wodl theme today, wodl 5 letter words, wodl 6 letter words, wodl 7 letter words, crypto word game, binance crypto word puzzle",
});

// Canonical + WebApplication schema only.
//
// We removed the FAQPage schema in 2026-05-24 alongside the on-page
// "What is Binance WODL?" content section: per Google's structured data
// guidelines, FAQPage schema requires the Q&As to be visible to the user
// on the source page. Schema without backing content is a policy
// violation and risks rich-result loss / manual penalty.
//
// The /wodl page (which has its own visible "What is Binance WODL?" H2)
// retains its FAQPage schema, including the WODL ↔ WOTD bridge Q&A.
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
        // alternateName covers Binance's official product name (WOTD /
        // Word of the Day) so Google's knowledge graph links the entity
        // across both query families. We deliberately do NOT list
        // "Wordle Helper" here — the solver is theme-biased toward this
        // week's Binance crypto words and is not built for generic Wordle.
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
