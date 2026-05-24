<template>
  <div class="container mx-auto py-8 max-w-5xl px-4">
    <h1
      class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)] drop-shadow-[0_0_25px_var(--glow-primary)]"
    >
      How to Use the WODL Solver
    </h1>

      <section
        v-glow
        class="p-8 glass-card rounded-3xl motion-safe:animate-fade-in-up text-left mb-8"
      >
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        🎯 What is Binance WODL?
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        Binance <strong>WODL</strong> — officially <strong>WOTD</strong>
        (Word of the Day) — is a free daily crypto word puzzle inside the
        Binance app. Each week ships with a new theme and a pool of
        crypto-related words from 3 to 8 letters. You get six attempts per
        day, and players who solve the puzzle on five days during a weekly
        theme qualify to share that week's prize pool. The game shows
        feedback with colored tiles after each guess:
      </p>
      <ul
        class="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-400"
      >
        <li>
          <span class="font-bold" :style="{ color: 'var(--letter-correct)' }"
            >Green:</span
          >
          The letter is in the word AND in the correct spot.
        </li>
        <li>
          <span class="font-bold" :style="{ color: 'var(--letter-include)' }"
            >Yellow:</span
          >
          The letter is in the word BUT in the wrong spot.
        </li>
        <li>
          <span class="font-bold" :style="{ color: 'var(--letter-exclude)' }"
            >Grey:</span
          >
          The letter is not in the word at all.
        </li>
      </ul>
      <p class="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
        This solver uses those clues to suggest possible answers from this
        week's Binance WODL / WOTD theme word pool. Theme words are ranked
        first so you find today's answer faster.
      </p>
      <p class="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
        Find the game in the Binance app under
        <strong>More → Gift &amp; Campaign → Word of the Day</strong>, or
        read more on the
        <a
          href="https://www.binance.com/en/learn/word-of-the-day"
          target="_blank"
          rel="noopener"
          class="text-blue-500 hover:underline"
        >official Binance Word of the Day page</a>.
      </p>
      </section>

      <section
        v-glow
        class="p-8 glass-card rounded-3xl text-left mb-8"
      >
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        💡 Using the Solver: Step-by-Step
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        After each guess in Binance WODL, enter what you learned into this
        solver:
      </p>
      <ol
        class="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-400"
      >
        <li>
          <strong
            >Correct Letters (Green
            <span :style="{ color: 'var(--letter-correct)' }">🟩</span
            >):</strong
          >
          If you got any green letters, type them into the input boxes
          exactly where they appear in your WODL guess. Leave boxes empty
          if the letter isn't green.
        </li>
        <li>
          <strong
            >Present Letters (Yellow
            <span :style="{ color: 'var(--letter-include)' }">🟨</span
            >):</strong
          >
          If you have yellow letters (they're in the word, just misplaced), type
          them into the box labeled "Present Letters (Yellow)". Don't worry
          about the order.
        </li>
        <li>
          <strong
            >Absent Letters (Grey
            <span :style="{ color: 'var(--letter-exclude)' }">⬜</span
            >):</strong
          >
          For letters that turned grey (not in the word at all), click those
          letters on the interactive keyboard below the input fields. They will
          be marked as excluded.
        </li>
      </ol>
      <p class="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
        As you add more clues, the list of "Possible Words" updates
        automatically, showing only the words that fit every rule you've
        entered. The list is sorted with this week's Binance WODL theme
        words on top.
      </p>
      </section>

      <section
        v-glow
        class="p-8 glass-card rounded-3xl text-left mb-8"
      >
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        ✨ What This Solver Does For You
      </h2>
      <ul
        class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400"
      >
        <li>
          Easily enter your green, yellow, and grey letter clues from your
          Binance WODL guesses.
        </li>
        <li>
          Narrows down possibilities from a large word list (3 to 8 letters)
          based on your clues.
        </li>
        <li>
          Surfaces this week's Binance WODL / WOTD theme words first so you
          find today's answer quickly.
        </li>
        <li>Suggests the best words to guess next to maximize your chances.</li>
        <li>
          Quickly mark letters you know aren't in the word using the keyboard.
        </li>
        <li>Simple, fast, and free — no login required.</li>
      </ul>
    </section>

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
  title: "How to Use the Binance WODL (WOTD) Solver — Guide",
  description:
    "Step-by-step guide to using the Binance WODL solver — officially WOTD (Word of the Day). Enter color clues, get 3–8 letter answers in seconds.",
  ogTitle: "How to Use the Binance WODL (WOTD) Solver — Guide",
  ogDescription:
    "Learn how to solve today's Binance WODL / WOTD puzzle. Enter your green, yellow & gray clues and the solver returns matching theme words instantly.",
  ogImage: "https://wordl.ryxwaer.com/og-image.jpg",
  twitterImage: "https://wordl.ryxwaer.com/og-image.jpg",
  keywords:
    "how to use binance wodl solver, binance wodl guide, binance wodl tips, binance wotd help, binance wotd guide, word of the day solver tutorial, wodl color clues, wodl green yellow gray",
});

// Add canonical URL and FAQPage schema for rich snippets. The Q&As below
// are mirrored 1:1 in the visible page sections above (per Google's
// FAQPage policy: schema content MUST be visible on-page).
useHead({
  link: [
    { rel: 'canonical', href: 'https://wordl.ryxwaer.com/about' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Binance WODL?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Binance WODL — officially WOTD (Word of the Day) — is a free daily crypto word puzzle inside the Binance app. Each week ships with a new theme and a pool of crypto-related words from 3 to 8 letters. You get six attempts per day, and players who solve the puzzle on five days during a weekly theme qualify to share that week's prize pool. The game shows feedback with colored tiles after each guess: Green means the letter is correct and in the right spot, Yellow means the letter is in the word but in the wrong spot, and Grey means the letter is not in the word at all. The game lives in the Binance app under More → Gift & Campaign → Word of the Day."
            }
          },
          {
            "@type": "Question",
            "name": "How do I use the Binance WODL Solver?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter your green letters into the input boxes exactly where they appear in your WODL guess. Add yellow letters to the 'Present Letters' section. Click grey letters on the interactive keyboard to mark them as excluded. The list of possible words updates automatically as you add more clues, with this week's Binance WODL theme words ranked first."
            }
          },
          {
            "@type": "Question",
            "name": "What does the Binance WODL Solver do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The solver narrows down possibilities from a large 3-8 letter word list based on your green, yellow and gray clues. It surfaces this week's Binance WODL / WOTD theme word pool first so you find today's answer faster, suggests the best follow-up guess, and lets you quickly mark excluded letters using the keyboard."
            }
          }
        ]
      })
    }
  ]
});
</script>

<style scoped>
/* Add any page-specific styles here if needed */
</style>
