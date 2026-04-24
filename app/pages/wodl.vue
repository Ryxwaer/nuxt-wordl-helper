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
        Binance <strong>WODL</strong> — officially called <strong>WOTD</strong>
        (<em>Word of the Day</em>) by Binance — is a free daily word game
        inside the Binance app, inspired by Wordle. Players get six attempts
        to guess a crypto-related word and earn small rewards for correct
        guesses. Each week features a new theme with words ranging from 3 to
        8 letters. The community widely calls it "WODL", which is why this
        solver uses that name throughout.
      </p>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Like Wordle, WODL / WOTD gives feedback with different colored tiles:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6 ml-4">
        <li><span class="font-bold" style="color: var(--letter-correct)">Green</span> tiles indicate correct letters in the right position</li>
        <li><span class="font-bold" style="color: var(--letter-include)">Yellow</span> tiles indicate correct letters in the wrong position</li>
        <li><span class="font-bold" style="color: var(--letter-exclude)">Gray</span> tiles indicate letters not in the word</li>
      </ul>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        I created this WODL solver to help find answers quickly. Enter what you know and get instant suggestions!
      </p>
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
        Binance assigns different words per account — try any word matching your letter count.
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
// Fetch current WODL theme (SSR — rendered into HTML for SEO)
const { data: themeData } = await useFetch<{ theme: string | null }>('/api/theme')
const theme = computed(() => themeData.value?.theme ?? null)

// Fetch this week's theme word pool (SSR)
const { data: themeWordsData } = await useFetch<{ words: Record<number, string[]> }>('/api/theme-words')
const themeWords = computed(() => themeWordsData.value?.words ?? {})
const sortedLengths = computed(() =>
  Object.keys(themeWords.value).map(Number).sort((a, b) => a - b)
)
const hasThemeWords = computed(() => sortedLengths.value.length > 0)

// Dynamic SEO meta — this page is the authoritative "Binance WODL" landing
// page. Front-load the brand + "Binance WODL" within Google's ~60 char limit.
//
// Title length budgeting: Google truncates SERP titles around 60 characters.
// The fixed parts of the verbose template ("Binance WODL Solver — \"\" Theme
// Words & Answers") are 46 chars, leaving 14 for the theme. Real Binance
// themes regularly exceed that (e.g. "Pre-IPO Assets" 14, "Web3 Infrastructure"
// 19). When the theme would push us past 60 chars we drop to a shorter
// template that always fits.
const SEO_TITLE_MAX = 60
const seoTitle = computed(() => {
  const t = theme.value
  if (!t) return "Binance WODL Solver — Today's Answer & Weekly Theme Words"
  const verbose = `Binance WODL Solver — "${t}" Theme Words & Answers`
  if (verbose.length <= SEO_TITLE_MAX) return verbose
  const compact = `Binance WODL Solver — ${t} Theme & Answers`
  if (compact.length <= SEO_TITLE_MAX) return compact
  return "Binance WODL Solver — This Week's Theme & Answers"
})
const seoDescription = computed(() =>
  theme.value
    ? `This week's Binance WODL theme is "${theme.value}". Free solver — enter green, yellow & gray clues and get today's WODL answer in seconds. No login.`
    : "Free Binance WODL solver — enter your green, yellow & gray clues and get today's WODL answer in seconds. See this week's theme word pool (3–8 letters)."
)

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogImage: "https://wordl.ryxwaer.com/og-image.jpg",
  twitterImage: "https://wordl.ryxwaer.com/og-image.jpg",
  // Mixed WODL/WOTD keywords. Binance officially names the game WOTD
  // (Word of the Day), but GSC shows ~all real impressions come from
  // "wodl" queries. We list both so we capture WODL today AND any latent
  // WOTD demand as Binance pushes the official name.
  keywords: "binance wodl, binance wodl solver, binance wodl answer today, wodl answer, wodl theme today, wodl crypto game, wodl 5 letter words, wodl 6 letter words, wodl 7 letter words, how to play binance wodl, binance wotd, binance word of the day, wotd solver, word of the day solver, binance wotd answer",
});

// Canonical + structured data. This page declares both the WebApplication
// (the solver) AND a HowTo — HowTo schema is frequently promoted into rich
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
        "description": "Free Binance WODL solver — also known as Binance WOTD or Word of the Day. Suggests possible answers based on your green, yellow and gray letter clues, and lists the current weekly theme's word pool (3–8 letters).",
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
              "text": "Yes — they are the same Binance game. Binance officially calls it WOTD (Word of the Day), but the player community widely refers to it as WODL (a Wordle-style nickname). Both names point to the same daily, theme-based crypto word puzzle inside the Binance app, and this solver works for either name."
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
            "name": "Does the WODL solver give me today's answer directly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Binance assigns different words to different accounts from the weekly theme pool, so there isn't a single 'today's answer' that applies to everyone. The solver shows every word in this week's pool that matches your clues, with theme words ranked first — type your green, yellow and gray letters and the candidates appear instantly."
            }
          }
        ]
      }))
    }
  ]
})
</script> 