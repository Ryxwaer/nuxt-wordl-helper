<template>
    <div class="flex flex-col items-center mb-4">
        <p>Slider for word size</p>
        <input type="range" min="3" max="10" v-model="wordSize" class="w-full" />
        <p>{{ wordSize }}</p>
    </div>
</template>

<script setup lang="ts">
const wordSize = ref(5);
</script>