<template>
  <div class="flex flex-col items-center">
    <h2 class="mb-2 flex items-center">
      <span class="mr-2 text-[var(--color-primary)]">Included Letters</span>
      <span class="w-5 h-5 bg-[var(--letter-include)] rounded-md"></span>
    </h2>
    <LetterInput type="included" color="var(--letter-include)" />

    <div
      v-if="state.included.length > state.position.length"
      class="text-[var(--color-letters)] dark:bg-red-800 bg-red-600 font-bold rounded-2xl text-center m-2 p-2 -mt-2 motion-preset-bounce"
    >
      Exceeding max letters!
    </div>
  </div>
</template>

<script setup lang="ts">
const { state } = useLetters();
</script>
