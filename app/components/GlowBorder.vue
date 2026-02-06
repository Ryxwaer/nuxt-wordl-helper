<template>
  <div ref="card" class="relative group">
    <!-- Original Content -->
    <slot />

    <!-- Glow Overlay (Border only visible under mouse) -->
    <!-- We duplicate the rounded-3xl here to match the content's shape -->
    <!-- Removed opacity-0/group-hover dependency so it glows when nearby -->
    <!-- Opacity set to 50% fixed, visibility controlled by mask -->
    <div
      class="pointer-events-none absolute inset-0 rounded-3xl border border-[var(--color-primary)] opacity-50 transition-opacity duration-300"
      :style="glowStyle"
    ></div>
  </div>
</template>

<script setup lang="ts">
const card = ref<HTMLElement | null>(null);

// Use shared physics with critical damping tuning
// Slightly tighter tension (0.03) than background so it leads slightly
const { x, y, updateTarget } = useSpringPhysics(0.03, 0.28);

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("mousemove", handleMouseMove);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("mousemove", handleMouseMove);
  }
});

const handleMouseMove = (e: MouseEvent) => {
  if (!card.value) return;
  const rect = card.value.getBoundingClientRect();
  
  // Calculate relative coordinates (can be negative or outside width/height)
  const relX = e.clientX - rect.left;
  const relY = e.clientY - rect.top;
  
  updateTarget(relX, relY);
};

const glowStyle = computed(() => {
  return {
    maskImage: `radial-gradient(250px circle at ${x.value}px ${y.value}px, black, transparent)`,
    WebkitMaskImage: `radial-gradient(250px circle at ${x.value}px ${y.value}px, black, transparent)`,
  };
});
</script>
