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

    <!--
      Informational SSR content block. Targets the "wodl" raw query
      (297 impressions, 0 clicks at position 7.4 per the 2026-04-24 audit).
      The #1 competitor (miguelroquefernandes.com/wodl-solver) has zero
      "What is WODL" content — so substantive, theme-aware copy here is a
      direct content-quality lever Google's Helpful Content System rewards.
    -->
    <section
      v-glow
      class="w-full max-w-5xl mt-10 p-8 rounded-3xl glass-card text-left"
    >
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        What is Binance WODL?
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Binance <strong>WODL</strong> — officially called
        <strong>WOTD</strong> (<em>Word of the Day</em>) by Binance, but
        widely known as WODL in the community — is a free daily word puzzle
        inside the Binance app, inspired by Wordle. Each week Binance
        publishes a new <strong>theme</strong> and a pool of crypto-related
        words from 3 to 8 letters. You guess words from that pool using
        green, yellow and gray feedback tiles, and correct answers earn
        small crypto rewards.
      </p>
      <p v-if="theme" class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        <strong>This week's WODL theme is
          <span class="text-[var(--color-primary)]">{{ theme }}</span>.</strong>
        See the full word pool for every length on the
        <NuxtLink to="/wodl" class="text-blue-500 hover:underline">Binance WODL Solver</NuxtLink>
        page — theme words are ranked first in the solver results above so
        you can find the answer faster.
      </p>
      <p v-else class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        See the full weekly theme word pool on the
        <NuxtLink to="/wodl" class="text-blue-500 hover:underline">Binance WODL Solver</NuxtLink>
        page — theme words are ranked first in the solver results above.
      </p>
      <h3 class="text-lg font-semibold mt-6 mb-2 text-gray-700 dark:text-gray-300">
        How this WODL solver works
      </h3>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        Type any green letters into the position boxes, add yellow letters to
        "Included Letters", and click gray letters on the keyboard to exclude
        them. The solver instantly narrows the word list down to candidates
        that match every clue and ranks this week's theme words at the top.
        Works for both Binance WODL and classic Wordle, no login required.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
// Fetch current WODL theme (SSR — rendered into HTML for SEO)
const { data: themeData } = await useFetch<{ theme: string | null }>('/api/theme')
const theme = computed(() => themeData.value?.theme ?? null)

// Title / description rewritten 2026-04-18 in response to weekly SEO audit:
// GSC shows this page accumulates the bulk of WODL-query impressions
// ("wodl solver" 192, "wodl" 134, "binance wodl solver" 14), yet the prior
// title never said "WODL" — which credibly explains the 0% CTR. Front-load
// "WODL Solver" while keeping "Wordle Helper" so generic-Wordle queries
// still match. Kept under ~60 chars for SERP display.
useSeoMeta({
  title: "WODL Solver & Wordle Helper — Today's Answer & Word Finder",
  description:
    "Free WODL Solver & Wordle Helper. Enter green, yellow & gray clues and get instant answers for 3–8 letter words. Solves Binance WODL and classic Wordle. No login.",
  ogTitle: "WODL Solver & Wordle Helper — Today's Answer & Word Finder",
  ogDescription:
    "Enter your clues, get instant answers. Free WODL Solver and Wordle Helper — 3 to 8 letter words, no login required.",
  ogImage: "https://wordl.ryxwaer.com/og-image.jpg",
  twitterImage: "https://wordl.ryxwaer.com/og-image.jpg",
  // Ordered by actual GSC-observed query volume for this URL. WOTD /
  // "word of the day" variants appended after the WODL terms — Binance's
  // official name has near-zero search volume today but is the term the
  // company itself promotes, so we keep both query families covered.
  keywords:
    "wodl solver, wodl, binance wodl solver, wodl answer today, wordle helper, wordle solver, word finder, binance wodl, wordle answer helper, 5 letter word finder, word puzzle solver, crypto word game, binance wotd, binance word of the day, wotd solver, word of the day solver",
});

// Canonical + JSON-LD — homepage is positioned as the general Wordle helper.
// /wodl is the authoritative Binance WODL landing page.
//
// FAQPage schema is added because (a) the #1 competitor for "wodl solver"
// ships zero structured data, leaving rich-snippet real estate uncontested,
// and (b) the 2026-04-24 audit shows the raw "wodl" query gets 297
// impressions / 0 clicks — Q&A snippets directly improve CTR for
// informational intent.
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
    },
    {
      type: 'application/ld+json',
      // Computed so Google sees the live theme answer in the schema, not a
      // stale build-time value. Falls back to a generic answer when the
      // theme API is down so the schema is always valid.
      innerHTML: computed(() => JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Binance WODL (and is it the same as WOTD)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Binance WODL and Binance WOTD are the same game — Binance officially calls it WOTD (Word of the Day), while the player community widely calls it WODL. It's a free daily word puzzle inside the Binance app, inspired by Wordle. Each week Binance publishes a new theme and a pool of crypto-related words from 3 to 8 letters. Players guess words from the pool using green, yellow and gray feedback tiles, and correct answers earn small crypto rewards."
            }
          },
          {
            "@type": "Question",
            "name": "What is this week's Binance WODL / WOTD theme?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": theme.value
                ? `This week's Binance WODL (WOTD) theme is "${theme.value}". The full word pool for 3, 4, 5, 6, 7 and 8 letter words is available on the WODL Solver page, with theme words ranked first in the solver results.`
                : "Binance publishes a new WODL / WOTD theme each week alongside a pool of crypto-related words from 3 to 8 letters. Visit the WODL Solver page on this site to see the current theme and full word pool."
            }
          },
          {
            "@type": "Question",
            "name": "How do I use the Wordle / WODL solver?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Type any green (correct-position) letters into the matching position boxes. Add yellow (in the word, wrong position) letters to the Included Letters field. Click gray (not in the word) letters on the keyboard to mark them as excluded. The solver instantly returns every word that matches your clues, with this week's WODL theme words ranked first."
            }
          },
          {
            "@type": "Question",
            "name": "Is the WODL solver free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The WODL Solver and Wordle Helper are completely free. No account, login or app install is required — open the page and enter your clues."
            }
          },
          {
            "@type": "Question",
            "name": "Does this solver work for classic Wordle as well?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The same solver supports classic Wordle (5-letter words) and Binance WODL (3 to 8 letter words). Pick the word length you need, enter your green, yellow and gray clues, and the solver lists every matching answer."
            }
          }
        ]
      }))
    }
  ]
})
</script>
