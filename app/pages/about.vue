<template>
  <div class="container mx-auto py-8 max-w-5xl px-4">
    <h1
      class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)] drop-shadow-[0_0_25px_var(--glow-primary)]"
    >
      How to Use the Wordle Helper
    </h1>

      <section
        v-glow
        class="p-8 glass-card rounded-3xl motion-safe:animate-fade-in-up text-left mb-8"
      >
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        🎯 What is Wordle?
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        Wordle is a popular game where you try to guess a secret 5-letter word
        in six tries. After each guess, the game gives you feedback with colors:
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
        This helper uses those clues to suggest possible answers!
      </p>
      </section>

      <section
        v-glow
        class="p-8 glass-card rounded-3xl text-left mb-8"
      >
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        💡 Using the Helper: Step-by-Step
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        After each guess in Wordle, enter the information you learned into this
        helper:
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
          If you got any green letters, type them into the main 5 input boxes
          exactly where they appear in your Wordle guess. Leave boxes empty if
          the letter isn't green.
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
        As you add more clues, the list of "Possible Words" below will update
        automatically, showing you only the words that fit all the rules you've
        entered. The list is sorted to suggest words that might help you guess
        the answer faster!
      </p>
      </section>

      <section
        v-glow
        class="p-8 glass-card rounded-3xl text-left mb-8"
      >
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        ✨ What This Helper Does For You
      </h2>
      <ul
        class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400"
      >
        <li>
          Easily enter your green, yellow, and grey letter clues from Wordle.
        </li>
        <li>
          Narrows down the possibilities from a large word list based on your
          clues.
        </li>
        <li>Shows you a list of words that could be the answer.</li>
        <li>Suggests the best words to guess next to maximize your chances.</li>
        <li>
          Quickly mark letters you know aren't in the word using the keyboard.
        </li>
        <li>Simple and easy-to-use interface.</li>
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
  title: "How to Use Wordle Helper & Binance WODL Solver | Step-by-Step Guide",
  description:
    "Learn how to use this free Wordle helper and Binance WODL solver. Step-by-step guide to entering green, yellow, and gray clues to find word answers instantly.",
  ogTitle: "How to Use Wordle Helper & WODL Solver | Guide",
  ogDescription:
    "Step-by-step guide to solving Wordle and Binance WODL puzzles with this free tool. Enter clues, get answers instantly.",
  keywords:
    "how to use wordle helper, wordle solver guide, WODL solver instructions, binance wodl help, wordle tips, word game solver tutorial",
});

// Add canonical URL and FAQPage schema for rich snippets
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
            "name": "What is Wordle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Wordle is a popular game where you try to guess a secret 5-letter word in six tries. After each guess, the game gives you feedback with colors: Green means the letter is correct and in the right spot, Yellow means the letter is in the word but in the wrong spot, and Grey means the letter is not in the word at all."
            }
          },
          {
            "@type": "Question",
            "name": "How do I use the Wordle Helper?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter your green letters into the main 5 input boxes exactly where they appear. Add yellow letters to the 'Present Letters' section. Click grey letters on the interactive keyboard to mark them as excluded. The list of possible words will update automatically as you add more clues."
            }
          },
          {
            "@type": "Question",
            "name": "What does the Wordle Helper do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Wordle Helper narrows down possibilities from a large word list based on your clues. It shows possible answers, suggests the best words to guess next, and lets you quickly mark excluded letters using the keyboard. It works for Wordle, Binance WODL, and other word puzzle games."
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
