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

// Title is intentionally WODL-first — GSC shows this page accumulates the
// bulk of WODL-query impressions ("wodl solver", "wodl", "binance wodl
// solver"). Kept under ~60 chars for SERP display.
//
// Description trimmed to ~140 chars in 2026-05-24 to fit Google's mobile
// SERP truncation budget without ellipsis (was 172 chars).
useSeoMeta({
  title: "WODL Solver & Wordle Helper — Today's Answer & Word Finder",
  description:
    "Free WODL Solver & Wordle Helper. Enter green, yellow & gray clues to get answers for 3–8 letter Binance WODL and Wordle puzzles. No login.",
  ogTitle: "WODL Solver & Wordle Helper — Today's Answer & Word Finder",
  ogDescription:
    "Enter your clues, get instant answers. Free WODL Solver and Wordle Helper — 3 to 8 letter words, no login required.",
  ogImage: "https://wordl.ryxwaer.com/og-image.jpg",
  twitterImage: "https://wordl.ryxwaer.com/og-image.jpg",
  // Ordered by actual GSC-observed query volume. WOTD / "word of the day"
  // variants appended after WODL terms — Binance's official name has very
  // little organic volume today but the parallel branding paid off in
  // GSC ("binance wotd solver" reaching 14.3% CTR after the May 3 deploy).
  keywords:
    "wodl solver, wodl, binance wodl solver, wodl answer today, wordle helper, wordle solver, word finder, binance wodl, wordle answer helper, 5 letter word finder, word puzzle solver, crypto word game, binance wotd, binance word of the day, wotd solver, word of the day solver",
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
        "name": "Wordle Helper & Solver",
        // alternateName covers both the community-search term (WODL) and
        // Binance's official product name (WOTD / Word of the Day). Helps
        // Google's knowledge graph link the entity across both query
        // families even though we keep "WODL" as the primary brand.
        "alternateName": [
          "Binance WODL Solver",
          "Binance WOTD Solver",
          "Word of the Day Solver"
        ],
        "url": "https://wordl.ryxwaer.com/",
        "description": "A free tool that suggests possible Wordle and Binance WODL (also known as WOTD or Word of the Day) answers based on your green, yellow and gray letter clues.",
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
