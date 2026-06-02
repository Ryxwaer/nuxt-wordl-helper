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
        <p class="mb-3">
          This free Binance WODL solver - also known as <strong>WOTD</strong> (Word of the Day) - suggests
          possible answers based on the clues you already have. Type in your green, yellow and gray letters
          and the tool instantly narrows this week's WODL theme word pool (3 to 8 letters) down to the words
          that still fit, with Binance's official theme words ranked first.
        </p>
        <p class="mb-3">
          Want to see this week's full theme and word pool? Head over to the dedicated
          <NuxtLink to="/wodl" class="text-blue-500 hover:underline">WODL Theme Words page</NuxtLink>
          where you can browse the complete 3, 4, 5, 6, 7 and 8 letter pool before you start guessing.
        </p>
        <!-- Internal navigation links for SEO -->
        <nav class="flex justify-center gap-4 mt-4 mb-3 text-sm">
          <NuxtLink to="/wodl" class="text-blue-500 hover:underline">WODL Theme Words</NuxtLink>
          <span class="text-gray-400">·</span>
          <NuxtLink to="/about" class="text-blue-500 hover:underline">How to Use</NuxtLink>
          <span class="text-gray-400">·</span>
          <NuxtLink to="/policy" class="text-blue-500 hover:underline">Privacy Policy</NuxtLink>
        </nav>
        <p class="mt-4 text-sm text-gray-500 dark:text-gray-500">
          Made with ❤️ by
          <a
            href="https://github.com/Ryxwaer"
            target="_blank"
            class="text-blue-500 hover:underline"
            >Ryxwaer</a
          >
        </p>
        <p>Last Updated: {{ formattedDate }}</p>
      </div>
      
      <!-- Simple footer for other pages -->
      <div v-else class="text-gray-500 dark:text-gray-400">
        <p>This app helps you solve Binance WODL (Word of the Day) puzzles.</p>
        <!-- Internal navigation links for SEO - distinct anchors per page so
             /  (the solver tool) and /wodl (theme word pool) don't compete
             for the same keyword. -->
        <nav class="flex justify-center gap-4 mt-3 mb-3 text-sm">
          <NuxtLink to="/" class="text-blue-500 hover:underline">WODL Solver</NuxtLink>
          <span class="text-gray-400">·</span>
          <NuxtLink to="/wodl" class="text-blue-500 hover:underline">WODL Theme Words</NuxtLink>
          <span class="text-gray-400">·</span>
          <NuxtLink to="/about" class="text-blue-500 hover:underline">How to Use</NuxtLink>
          <span class="text-gray-400">·</span>
          <NuxtLink to="/policy" class="text-blue-500 hover:underline">Privacy Policy</NuxtLink>
        </nav>
        <p class="text-sm text-gray-500 dark:text-gray-500">
          Made with ❤️ by
          <a
            href="https://github.com/Ryxwaer"
            target="_blank"
            class="text-blue-500 hover:underline"
            >Ryxwaer</a
          >
        </p>
        <p>Last Updated: {{ formattedDate }}</p>
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

// Breadcrumb schema for better Google search structure
const SITE_URL = 'https://wordl.ryxwaer.com'
const breadcrumbItems = computed(() => {
  const items = [{ name: 'Home', url: SITE_URL + '/' }]
  const path = route.path
  if (path === '/wodl') items.push({ name: 'WODL Theme Words', url: SITE_URL + '/wodl' })
  else if (path === '/about') items.push({ name: 'How to Use', url: SITE_URL + '/about' })
  else if (path === '/red-packet') items.push({ name: 'Red Packet', url: SITE_URL + '/red-packet' })
  else if (path === '/policy') items.push({ name: 'Privacy Policy', url: SITE_URL + '/policy' })
  return items
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.value.map((item, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": item.name,
          "item": item.url
        }))
      }))
    }
  ]
})

// Get red packet configuration from app config
const redPacketConfig = appConfig.redPacket;

// "Last Updated" date. The home and /wodl pages render the live current-week
// word pool (rank=1 from the DB) on every request, so their freshness date is
// the render time - not the build date, which would otherwise freeze at the
// last deploy and signal staleness while the content is actually current.
// Static informational pages keep the build date. Computed once on the server
// and reused on the client (useState) to avoid hydration mismatches.
const LIVE_DATA_ROUTES = ['/', '/wodl'];
const renderDateIso = useState('renderDateIso', () => new Date().toISOString());

const formattedDate = computed(() => {
  const isLivePage = LIVE_DATA_ROUTES.includes(route.path);
  const sourceIso = isLivePage
    ? renderDateIso.value
    : (typeof appConfig.buildDate === 'string' ? appConfig.buildDate : renderDateIso.value);

  const parsed = new Date(sourceIso);
  const safeDate = isNaN(parsed.getTime()) ? new Date() : parsed;

  // Fixed locale + timeZone so the server and client render the identical
  // string (otherwise day-boundary/locale differences cause hydration warnings).
  return safeDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
});

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
