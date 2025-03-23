<template>
    <!-- Light Mode Background -->
    <div
        class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
    </div>

    <!-- Dark Mode Background -->
    <div class="absolute inset-0 -z-10 h-full w-full bg-black hidden dark:block">
        <div class="absolute bottom-0 left-0 right-0 top-0 
                  bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),
                       linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
                  bg-[size:14px_24px]">
        </div>

        <!-- Dark Mode Radial Glow (still in the corner, cropped at boundaries) -->
        <div class="absolute left-0 top-[-10%] h-[1000px] w-[1000px] rounded-full 
                  bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]">
        </div>
    </div>

    <!-- Dark Mode Toggle -->
    <button @click="next()" class="absolute top-5 right-5 custom-button">
      <span class="transition-opacity duration-500 opacity-100 dark:hidden">🌙 Dark Mode</span>
      <span class="transition-opacity duration-500 opacity-100 hidden dark:inline">☀️ Light Mode</span>
    </button>
</template>

<script setup lang="ts">
import { useColorMode, useCycleList } from '@vueuse/core';
import { watchEffect } from 'vue';

const { store } = useColorMode();
const mode = useColorMode({
    emitAuto: true,
    modes: { dark: 'dark', light: 'light' },
});
const { state, next } = useCycleList(['dark', 'light'] as const, { initialValue: store.value });

watchEffect(() => {
    mode.value = state.value;
    store.value = state.value;
}, { flush: "sync" });

useHead({
    meta: [
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: mode.value === "dark" ? '#111827' : '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: mode.value === "dark" ? '#ffffff' : '#111827' },
        { name: 'theme-color', content: mode.value === "dark" ? '#111827' : '#ffffff' },
    ],
});
</script>