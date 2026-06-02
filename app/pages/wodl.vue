<template>
  <!-- Main page container -->
  <div class="container mx-auto px-4 py-8 max-w-7xl flex flex-col items-center">
    <!-- H1 heading outside the card. The live theme is injected as body
         freshness (the SERP title stays static - see useSeoMeta note below). -->
    <h1 class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)] drop-shadow-[0_0_25px_var(--glow-primary)]">
      Binance WODL Solver<template v-if="theme"> - {{ theme }} Theme</template>
    </h1>

    <div v-glow class="w-full max-w-5xl mb-8 p-8 glass-card rounded-3xl">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        What is Binance WODL?
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Binance <strong>WODL</strong> - officially called <strong>WOTD</strong>
        (<em>Word of the Day</em>) by Binance - is a free daily crypto word
        puzzle inside the Binance app. Each puzzle gives you six attempts to
        guess a crypto-related word (Binance allows up to two puzzles per
        day), and players who solve the puzzle on five days within a weekly
        theme qualify to share that week's prize pool. Each theme features
        new words ranging from 3 to 8 letters. The community widely calls
        the game "WODL", which is why this solver uses that name throughout.
      </p>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        WODL / WOTD gives feedback after each guess with different colored tiles:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6 ml-4">
        <li><span class="font-bold" style="color: var(--letter-correct)">Green</span> tiles indicate correct letters in the right position</li>
        <li><span class="font-bold" style="color: var(--letter-include)">Yellow</span> tiles indicate correct letters in the wrong position</li>
        <li><span class="font-bold" style="color: var(--letter-exclude)">Gray</span> tiles indicate letters not in the word</li>
      </ul>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        I created this WODL solver to help find answers quickly. Enter what you know and get instant suggestions!
      </p>

      <!-- Prominent, skim-proof CTA: catches users who won't read the page. -->
      <div class="mt-8 flex justify-center">
        <NuxtLink
          to="/"
          aria-label="Open the automated WODL solver"
          class="group flex flex-col items-center rounded-2xl border border-[var(--color-primary)]/25 px-10 py-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/60 hover:shadow-[0_0_30px_var(--glow-primary)]"
        >
          <span class="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-[var(--color-primary)]">
            Get Your Answer
          </span>
          <span class="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400 transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-300">
            Open the automated solver
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- Today's WODL Theme -->
    <div v-if="theme" v-glow class="w-full max-w-5xl mb-8 p-6 glass-card rounded-3xl text-center">
      <h2 class="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
        Today's Binance WODL Theme
      </h2>
      <p class="text-3xl font-bold text-[var(--color-primary)] drop-shadow-[0_0_15px_var(--glow-primary)]">
        {{ theme }}
      </p>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-500">
        Theme words are highlighted first in the solver results.
      </p>
    </div>

    <!-- Theme Word Pool -->
    <div v-if="hasThemeWords" v-glow class="w-full max-w-5xl mb-8 p-6 glass-card rounded-3xl">
      <h2 class="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">
        This Week's WODL Word Pool
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-500 text-center mb-4">
        Binance assigns different words per account - try any word matching your letter count.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="len in sortedLengths" :key="len" class="text-center">
          <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
            {{ len }}-letter words
          </p>
          <div class="flex flex-wrap justify-center gap-1.5">
            <span
              v-for="word in themeWords[len]"
              :key="word"
              class="inline-block px-2 py-0.5 rounded text-sm font-mono bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
            >
              {{ word }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- WODL Solver entry card (links to homepage solver) -->
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
// Fetch current WODL theme (SSR - rendered into HTML for SEO)
const { data: themeData } = await useFetch<{ theme: string | null }>('/api/theme')
const theme = computed(() => themeData.value?.theme ?? null)

// Fetch this week's theme word pool (SSR)
const { data: themeWordsData } = await useFetch<{ words: Record<number, string[]> }>('/api/theme-words')
const themeWords = computed(() => themeWordsData.value?.words ?? {})
const sortedLengths = computed(() =>
  Object.keys(themeWords.value).map(Number).sort((a, b) => a - b)
)
const hasThemeWords = computed(() => sortedLengths.value.length > 0)

// SERP title is DYNAMIC on this page - and only this page; the homepage
// solver keeps a static title. It bakes the live weekly theme into the
// <title>, matching how the competitor answer pages rank for theme-specific
// "binance word of the day [theme]" queries.
//
// Known tradeoff: slow-crawl engines (e.g. Brave) can show the previous
// theme in the snippet for a while after the weekly rotation, since they
// re-index late. We accept it - Google re-crawls /wodl within ~a day
// (verified via URL Inspection), the theme rotates only weekly, and the
// competitors clearly get away with theme/date-in-title, so the freshness
// upside outweighs the occasional stale snippet on minor engines.
//
// The page BODY also stays dynamic (the "Today's Binance WODL Theme" H2,
// the word-pool grid, and the FAQ schema all inject the live theme), and
// the homepage `/` deliberately keeps a static "Solver" title so the two
// pages stay differentiated.
const pageTitle = computed(() =>
  theme.value
    ? `Binance WODL Solver - ${theme.value} Theme & Answers`
    : "Binance WODL Theme Words & Pool - WOTD Solver"
);

useSeoMeta({
  title: () => pageTitle.value,
  description:
    "Free Binance WODL / WOTD solver with this week's theme word pool (3–8 letters). Enter your green, yellow & gray clues to find today's answer.",
  ogTitle: () => pageTitle.value,
  ogDescription:
    "See this week's Binance WODL / WOTD theme word pool (3–8 letters) and use the free solver to find today's answer from your color clues.",
  ogImage: "https://wordl.ryxwaer.com/og-image.jpg",
  twitterImage: "https://wordl.ryxwaer.com/og-image.jpg",
  // Binance WODL / WOTD only. We deliberately don't target generic
  // Wordle queries - the solver biases toward this week's Binance crypto
  // theme words, so a Wordle player would get a worse experience.
  keywords: "binance wodl, binance wodl solver, binance wotd, binance wotd solver, binance wodl theme, wodl theme today, wodl word pool, wodl 3 letter words, wodl 4 letter words, wodl 5 letter words, wodl 6 letter words, wodl 7 letter words, wodl 8 letter words, binance word of the day, wotd solver, word of the day solver",
});

// Canonical + structured data. This page declares both the WebApplication
// (the solver) AND a HowTo - HowTo schema is frequently promoted into rich
// SERP results for "how to ..." queries, which directly attacks the 0% CTR
// problem flagged in the weekly audit.
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
        // alternateNames bridge WODL (community/search term) with WOTD
        // (Binance's official name) so the entity matches both query
        // families in Google's knowledge graph.
        "alternateName": [
          "Binance WOTD Solver",
          "Binance Word of the Day Solver",
          "WODL Solver",
          "WOTD Solver"
        ],
        "url": "https://wordl.ryxwaer.com/wodl",
        "description": "Free Binance WODL solver - also known as Binance WOTD or Word of the Day. Suggests possible answers based on your green, yellow and gray letter clues, and lists the current weekly theme's word pool (3–8 letters).",
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
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to solve today's Binance WODL",
        "description": "Find today's Binance WODL answer by entering the color-coded clues from your in-app guesses.",
        "totalTime": "PT30S",
        "tool": [
          { "@type": "HowToTool", "name": "Binance WODL Solver" }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter your green letters",
            "text": "Type each green (correct-position) letter into the input box matching its position in the word."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Add yellow letters",
            "text": "Add any yellow (in the word, wrong position) letters to the Included Letters field."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Mark gray letters",
            "text": "Click gray (not in the word) letters on the keyboard to mark them as excluded."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate possible words",
            "text": "The solver instantly returns all valid answers matching your clues, with this week's theme words ranked first."
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      // FAQ schema dedicated to bridging the WODL ↔ WOTD naming gap.
      // Binance officially calls the game WOTD (Word of the Day) but
      // search-volume in GSC is overwhelmingly on "wodl". Surfacing this
      // explicitly (a) signals topical authority to Google's E-E-A-T,
      // and (b) makes us eligible for rich snippets on the small but
      // growing "what is wotd" / "wodl vs wotd" query family.
      innerHTML: computed(() => JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is WODL the same as WOTD?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes - they are the same Binance game. Binance officially calls it WOTD (Word of the Day), but the player community widely refers to it as WODL (a Wordle-style nickname). Both names point to the same daily, theme-based crypto word puzzle inside the Binance app, and this solver works for either name."
            }
          },
          {
            "@type": "Question",
            "name": "What is this week's Binance WODL / WOTD theme?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": theme.value
                ? `This week's Binance WODL (WOTD) theme is "${theme.value}". The full word pool for 3, 4, 5, 6, 7 and 8 letter words is shown above; theme words are ranked first in the solver results.`
                : "Binance publishes a new WODL / WOTD theme each week alongside a pool of crypto-related words from 3 to 8 letters. The current theme appears at the top of this page, and theme words are ranked first in the solver."
            }
          },
          {
            "@type": "Question",
            "name": "How many letters do Binance WODL words have?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Binance WODL (WOTD) word lengths vary by week and by player account. Typical lengths range from 3 to 8 letters, all drawn from the announced weekly theme. This solver supports every length in that range."
            }
          },
          {
            "@type": "Question",
            "name": "How do I win Binance WODL rewards?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To earn rewards in Binance WODL (WOTD), you need to correctly solve the daily puzzle on five days during a weekly theme. Players who reach five wins share that week's prize pool, which Binance announces in advance and pays out through the Binance Reward Hub - typically as Binance Points vouchers, BNB, or USDT vouchers depending on the theme. Each puzzle gives you up to six attempts to find the correct word, and Binance allows up to two puzzles per day."
            }
          },
          {
            "@type": "Question",
            "name": "Does the WODL solver give me today's answer directly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Binance assigns different words to different accounts from the weekly theme pool, so there isn't a single 'today's answer' that applies to everyone. The solver shows every word in this week's pool that matches your clues, with theme words ranked first - type your green, yellow and gray letters and the candidates appear instantly."
            }
          }
        ]
      }))
    }
  ]
})
</script> 