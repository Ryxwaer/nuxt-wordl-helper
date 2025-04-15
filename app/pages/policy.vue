<template>
  <div class="container mx-auto py-8 max-w-5xl">
    <h1
      class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)]"
    >
      Privacy Policy
    </h1>

    <section
      class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg motion-safe:animate-fade-in-up"
    >
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Our Commitment to Privacy
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        At Wordle Helper, we are committed to protecting your privacy. This policy explains what information we collect, how we use it, and how we protect it.
      </p>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        <strong>In short: We don't collect or store any of your personal data.</strong>
      </p>
    </section>

    <section class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        No Data Collection
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Our service is designed to respect your privacy:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
        <li>We <strong>do not</strong> collect any personal information from you.</li>
        <li>We <strong>do not</strong> use cookies or any similar tracking technologies.</li>
        <li>We <strong>do not</strong> store your game inputs or word preferences.</li>
        <li>We <strong>do not</strong> track your usage patterns or behaviors.</li>
      </ul>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        When you use our Wordle Helper, all data processing happens directly in your browser. The letters you input (correct positions, included letters, and excluded letters) are only used to query our word database for possible solutions. These inputs are not stored or saved anywhere after your session ends.
      </p>
    </section>

    <section class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Server Interaction
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Our application does make server requests to fetch word suggestions based on your inputs. Here's how this works:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
        <li>When you click "Calculate Words", we send only your letter inputs (correct positions, included letters, excluded letters) to our server.</li>
        <li>Our server processes this request to search our word database for matching words.</li>
        <li>The results are sent back to your browser and displayed to you.</li>
        <li>We do not log or store these requests or associate them with any user identifiers.</li>
      </ul>
    </section>

    <section class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Analytics and Third Parties
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        We use minimal, privacy-focused analytics to help us understand overall usage patterns of our website. This analytics implementation:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
        <li>Does not use cookies</li>
        <li>Does not track users individually</li>
        <li>Only collects anonymous aggregate data (like page views)</li>
        <li>Does not build user profiles or track behavior over time</li>
      </ul>
    </section>

    <section class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Contact Us
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        If you have any questions about our privacy practices, you can open an issue on our project repository or contact us through the provided channels on our GitHub page.
      </p>
    </section>

    <div class="mt-8 text-center">
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
  title: "Privacy Policy - Wordle Helper",
  meta: [
    {
      name: "description",
      content: "Privacy Policy for Wordle Helper - We don't store your data or use cookies.",
    },
    {
      name: "robots",
      content: "noindex",
    }
  ],
});
</script> 