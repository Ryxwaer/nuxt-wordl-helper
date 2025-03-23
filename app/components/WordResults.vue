<template>
    <div class="border border-yellow-500 bg-gray-900/20 dark:text-yellow-400 p-4 rounded-lg w-full max-w-md mt-4">
        <p class="mb-2">Main Word Offered</p>
        <pre>{{ JSON.stringify(state, null, 2) }}</pre>
    </div>
</template>

<script setup lang="ts">
const { state } = useLetters();

const mainWord = ref("HELLO"); // Sample data
const wordSuggestions = ref(["WORLD", "HOUSE", "PLANE"]);
</script>