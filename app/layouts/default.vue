<template>
  <div class="relative flex flex-col justify-between min-h-screen">
    <!-- Dynamic Navigation Button -->
    <NuxtLink
      :to="navLinkTarget"
      class="absolute top-5 right-5 z-10 custom-button"
    >
      {{ navLinkText }}
    </NuxtLink>

    <!-- Main content area with padding -->
    <main class="flex-grow flex justify-center items-start p-6">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="w-full mt-auto mb-10 text-center text-sm text-gray-500 flex-shrink-0 p-6">
      <p>This app helps you solve any Wordle challenges!</p>
      <p>
        Made with ❤️ by
        <a href="https://github.com/Ryxwaer" target="_blank" class="text-blue-500"
          >Ryxwaer</a
        >
      </p>
      <p class="mt-2">
        <NuxtLink to="/policy" class="text-blue-500 hover:underline">Privacy Policy</NuxtLink>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Determine link text and target based on current route
const isOnAboutPage = computed(() => route.path === '/about')
const isOnPolicyPage = computed(() => route.path === '/policy')

const navLinkText = computed(() => {
  if (isOnAboutPage.value || isOnPolicyPage.value) return 'Back'
  return 'About'
})

const navLinkTarget = computed(() => {
  if (isOnAboutPage.value || isOnPolicyPage.value) return '/'
  return '/about'
})
</script>
