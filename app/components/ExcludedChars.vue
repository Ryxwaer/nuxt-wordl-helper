<template>
  <div class="flex flex-col items-center">
    <p class="mb-2 flex items-center">
      <span class="mr-2 text-[var(--color-primary)]">Excluded Letters</span>
      <span class="w-5 h-5 bg-[var(--letter-exclude)] rounded-md"></span>
    </p>
    <LetterInput type="excluded" color="var(--letter-exclude)" />
  </div>
</template>

<script setup lang="ts"></script>
