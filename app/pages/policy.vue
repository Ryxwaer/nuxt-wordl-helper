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
        At Binance WODL Solver, we are committed to protecting your privacy. This policy explains what information we collect, how we use it, and how we protect it.
      </p>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        <strong>In short: we never ask you who you are.</strong> We don't use cookies, we have no accounts, and we show no ads.
      </p>
    </section>

    <section class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        What We Don't Do
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Our service is designed to respect your privacy:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
        <li>We <strong>do not</strong> ask for your name, email address, or any other personal detail.</li>
        <li>We <strong>do not</strong> use cookies or any similar tracking technologies.</li>
        <li>We <strong>do not</strong> require an account, and there is nothing to log in to.</li>
        <li>We <strong>do not</strong> show ads or use any advertising service.</li>
        <li>We <strong>do not</strong> sell, share, or trade your data with anyone.</li>
      </ul>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        The letters you input (correct positions, included letters, and excluded letters) are sent to our server only to look up matching words in our database.
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
      </ul>
    </section>

    <section class="mb-8 p-6 bg-[var(--color-bg)] rounded-3xl shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
        Analytics and Third Parties
      </h2>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        We use Cloudflare Web Analytics, a privacy-focused analytics service, to see overall traffic to the site. This implementation:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
        <li>Does not use cookies</li>
        <li>Does not track users individually or across sites</li>
        <li>Only collects anonymous aggregate data (like page views)</li>
        <li>Does not build user profiles or track behavior over time</li>
      </ul>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        We use no advertising, ad-personalisation, or product-analytics third parties of any kind.
      </p>
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
  title: "Privacy Policy - Binance WODL Solver",
  meta: [
    {
      name: "description",
      content: "Privacy Policy for the Binance WODL Solver - no cookies, no accounts, and no ads.",
    },
    {
      name: "robots",
      content: "noindex",
    }
  ],
});
</script> 