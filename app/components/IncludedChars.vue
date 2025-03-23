<template>
    <div class="flex flex-col items-center">
        <p class="mb-2 dark:text-[var(--color-global-light)]">Included Letters</p>
        <LetterInput type="included" />
        <div v-if="state.included.length > state.position.length"
            class="dark:text-[var(--color-global-light)] dark:bg-red-800 font-bold rounded-2xl text-center m-2 p-2">
            Exceeding max letters!</div>
    </div>
</template>

<script setup lang="ts">
const { state } = useLetters();
</script>