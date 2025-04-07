<template>
  <div
    class="w-full max-w-5xl min-h-200 mt-16 p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-lg"
  >
    <div class="items-center flex flex-col">
      <div class="md:max-w-50 flex flex-col items-center">
        <CorrectPositions />
      </div>
    </div>

    <!-- Grid layout with column changes on mobile and desktop -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Mobile: ExcludedChars comes after IncludedChars, Desktop: ExcludedChars first -->
      <div class="order-2 md:order-1">
        <ExcludedChars />
      </div>

      <!-- Word Setup (Correct Positions, Slider, Calculate Button) -->
      <div
        class="col-span-1 flex flex-col items-center mt-4 order-3 md:order-2"
      >
        <CalculateButton />
        <div class="h-16" />
        <DebugData />
      </div>

      <!-- ExcludedChars: Mobile below IncludedChars, Desktop first -->
      <div class="order-1 md:order-3">
        <IncludedChars />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useRobotsRule('noindex, nofollow')
</script>
