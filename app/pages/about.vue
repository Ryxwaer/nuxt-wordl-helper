<template>
  <div class="container mx-auto py-8 max-w-5xl">
    <h1
      class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)]"
    >
      How to Use the Wordle Helper
    </h1>

    <section
      class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg motion-safe:animate-fade-in-up"
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
      class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg"
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
      class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg"
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
        class="inline-block bg-yellow-500 hover:bg-yellow-400 text-[var(--color-letters)] font-bold py-2 px-6 rounded-lg transition duration-300"
      >
        Back to Helper
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "How to Use - Nuxt Wordle Helper",
  meta: [
    {
      name: "description",
      content:
        "Learn how to use the Nuxt Wordle Helper to get suggestions for Wordle based on your green, yellow, and grey letter clues.",
    },
  ],
});
</script>

<style scoped>
/* Add any page-specific styles here if needed */
</style>
