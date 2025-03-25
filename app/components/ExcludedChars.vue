<template>
    <div class="flex flex-col items-center">
        <p class="mb-2 flex items-center">
            <span class="mr-2 dark:text-[var(--color-global-light)]">Excluded Letters</span>
            <span class="w-5 h-5 bg-[#474d57] rounded-md"></span> <!-- Rounded color swatch -->
        </p>
        <LetterInput type="excluded" color="#474d57" />
    </div>
</template>

<script setup lang="ts">
</script>