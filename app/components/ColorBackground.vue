<template>
  <div class="bg-white dark:bg-black">
    <!-- Light Mode Background -->
    <div
      class="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
    ></div>

    <!-- Dark Mode Background -->
    <div class="absolute inset-0 -z-10 w-full bg-black hidden dark:block">
      <div
        class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px), linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
      ></div>

      <!-- Dark Mode Radial Glow (still in the corner, cropped at boundaries) -->
      <div
        class="absolute left-0 top-[-164px] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"
      ></div>
    </div>

    <!-- Dark Mode Toggle - Commented Out -->
    <!--
    <button @click="next()" class="absolute top-5 right-5 custom-button">
      <span class="transition-opacity duration-500 opacity-100 dark:hidden"
        >🌙 Dark Mode</span
      >
      <span
        class="transition-opacity duration-500 opacity-100 hidden dark:inline"
        >☀️ Light Mode</span
      >
    </button>
    -->
  </div>
</template>

<script setup lang="ts">
// Set theme-color meta tag based on system preferences only
useHead({
  meta: [
    {
      name: "theme-color",
      media: "(prefers-color-scheme: light)",
      content: "#ffffff",
    },
    {
      name: "theme-color",
      media: "(prefers-color-scheme: dark)",
      content: "#000000",
    },
    {
      name: "theme-color",
      content: "#000000",
    }
  ],
});
</script>
