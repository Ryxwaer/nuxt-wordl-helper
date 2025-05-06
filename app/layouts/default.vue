<template>
  <div class="relative flex flex-col justify-between min-h-screen">
    <!-- Navigation Buttons -->
    <div class="absolute top-5 right-5 z-10 flex space-x-3">
      <!-- Red Packet Button (only show on home page if enabled in config) -->
      <NuxtLink
        v-if="isOnRoot && redPacketConfig.enableNavButton"
        :to="'/red-packet'"
        class="custom-button"
      >
        Red Packet
      </NuxtLink>

      <!-- Dynamic Navigation Button (About/Solver) -->
      <NuxtLink :to="navLinkTarget" class="custom-button">
        {{ navLinkText }}
      </NuxtLink>
    </div>

    <!-- Main content area with padding -->
    <main class="flex-grow flex justify-center items-start p-6">
      <slot />
    </main>

    <!-- Footer -->
    <footer
      class="w-full mt-auto mb-10 text-center text-sm flex-shrink-0 p-6"
    >
      <!-- Extended footer for home page only -->
      <div v-if="isOnRoot" class="max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
        <h2 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">My Binance WODL Solver</h2>
        <p class="mb-3">
          Looking for help with the Binance WODL Challenge? My tool provides a simple and efficient solution
          to help you solve daily WODL puzzles and earn crypto rewards. Input the letters you know, and get
          instant suggestions for possible words that match your clues.
        </p>
        <p class="mb-3">
          Whether you're working with 5-letter, 6-letter, or 7-letter words, my WODL solver helps you narrow down
          possibilities quickly. Simply enter correct letters, included letters, and excluded letters to get
          accurate word suggestions sorted by frequency.
        </p>
        <p class="mt-6 text-sm text-gray-500 dark:text-gray-500">
          Made with ❤️ by
          <a
            href="https://github.com/Ryxwaer"
            target="_blank"
            class="text-blue-500 hover:underline"
            >Ryxwaer</a
          > |
          <NuxtLink to="/policy" class="text-blue-500 hover:underline"
            >Privacy Policy</NuxtLink
          >
        </p>
      </div>
      
      <!-- Simple footer for other pages -->
      <div v-else class="text-gray-500 dark:text-gray-400">
        <p>This app helps you solve any Wordle challenges!</p>
        <p>
          Made with ❤️ by
          <a
            href="https://github.com/Ryxwaer"
            target="_blank"
            class="text-blue-500 hover:underline"
            >Ryxwaer</a
          > |
          <NuxtLink to="/policy" class="text-blue-500 hover:underline"
            >Privacy Policy</NuxtLink
          >
        </p>
      </div>
    </footer>

    <!-- Floating Red Packet (only show when not on the red packet page and enabled in config) -->
    <ClientOnly>
      <div
        :class="{
          'motion-opacity-out-0 motion-duration-300': isOnRedPacketPage,
        }"
      >
        <FloatingRedPacket v-if="redPacketConfig.enableFloatingComponent" />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();

// Get red packet configuration from app config
const redPacketConfig = appConfig.redPacket;

// Check if we're on the home page
const isOnRoot = computed(() => route.path === "/");
const isOnRedPacketPage = computed(() => route.path === "/red-packet");

const navLinkText = computed(() => {
  if (isOnRoot.value) return "About";
  return "Solver";
});

const navLinkTarget = computed(() => {
  if (isOnRoot.value) return "/about";
  return "/";
});
</script>
