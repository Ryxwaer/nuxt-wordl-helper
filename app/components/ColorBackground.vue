<template>
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <!-- Light Mode Background -->
    <div class="absolute inset-0 dark:hidden">
      <!-- Base gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"></div>
      <!-- Subtle grid pattern -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px]"
      ></div>
      <!-- Soft ambient glow -->
      <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(240,185,11,0.08)_0%,transparent_70%)]"></div>
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(2,192,118,0.05)_0%,transparent_70%)]"></div>
    </div>

    <!-- Dark Mode Background -->
    <div class="absolute inset-0 hidden dark:block">
      <!-- Deep dark base with subtle gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0e10] to-[#0a0a0a]"></div>
      
      <!-- Subtle grid pattern -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#f0b90b08_1px,transparent_1px),linear-gradient(to_bottom,#f0b90b08_1px,transparent_1px)] bg-[size:48px_48px]"
      ></div>
      
      <!-- Primary ambient glow (top) - Binance gold -->
      <div 
        class="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_600px_400px_at_50%_50%,rgba(240,185,11,0.12)_0%,rgba(240,185,11,0.03)_40%,transparent_70%)]"
      ></div>
      
      <!-- Secondary glow (bottom left) - green accent -->
      <div 
        class="absolute -bottom-[100px] -left-[200px] w-[800px] h-[800px] bg-[radial-gradient(circle_400px,rgba(2,192,118,0.08)_0%,transparent_60%)]"
      ></div>
      
      <!-- Tertiary glow (right side) - subtle gold -->
      <div 
        class="absolute top-1/2 -right-[200px] w-[600px] h-[600px] bg-[radial-gradient(circle_300px,rgba(240,185,11,0.05)_0%,transparent_60%)]"
      ></div>
      
      <!-- Noise texture overlay for depth -->
      <div class="absolute inset-0 opacity-[0.015]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"></div>
      
      <!-- Vignette effect -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
    </div>

    <!-- Mouse Glow Effect (Overlay on top of backgrounds) -->
    <div
      class="pointer-events-none absolute top-0 left-0 z-10 w-[500px] h-[500px] transition-opacity duration-300 mix-blend-screen"
      :style="{
        transform: `translate3d(${renderX}px, ${renderY}px, 0) translate(-50%, -50%)`,
        willChange: 'transform'
      }"
    >
      <div 
        class="w-full h-full opacity-100 blur-[80px]"
        style="
            background: radial-gradient(circle at 60% 40%, var(--glow-primary), transparent 60%);
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        "
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { subscribeMouseMove } from '~/utils/globalMouse';

// Use shared physics with critical damping tuning
const { x: renderX, y: renderY, updateTarget } = useSpringPhysics(0.02, 0.28);

// Get color mode from Nuxt UI's color-mode module
const colorMode = useColorMode();

// Theme colors matching the actual background colors
const LIGHT_THEME_COLOR = '#f8f8f8'; // matches --color-bg-solid in light mode
const DARK_THEME_COLOR = '#0a0a0a';  // matches dark mode background gradient

// Computed theme color based on current color mode
const currentThemeColor = computed(() => {
  if (colorMode.value === 'dark') {
    return DARK_THEME_COLOR;
  } else if (colorMode.value === 'light') {
    return LIGHT_THEME_COLOR;
  }
  return DARK_THEME_COLOR;
});

// Computed color-scheme value for Safari system UI
const currentColorScheme = computed(() => {
  if (colorMode.value === 'dark') {
    return 'dark';
  } else if (colorMode.value === 'light') {
    return 'light';
  }
  return 'light dark';
});

// Subscribe to the shared global mouse (ONE listener for the whole app)
let unsubMouse: (() => void) | null = null;

onMounted(() => {
  unsubMouse = subscribeMouseMove((mx, my) => {
    updateTarget(mx, my);
  });
});

onUnmounted(() => {
  unsubMouse?.();
});

// Set theme-color and color-scheme meta tags for Safari mobile UI
// Using reactive computed values to update when color mode changes
useHead({
  meta: computed(() => [
    // color-scheme tells Safari how to style system UI elements (scrollbars, inputs, etc.)
    {
      name: "color-scheme",
      content: currentColorScheme.value,
    },
    // theme-color with media queries for system preference fallback
    {
      name: "theme-color",
      media: "(prefers-color-scheme: light)",
      content: LIGHT_THEME_COLOR,
    },
    {
      name: "theme-color",
      media: "(prefers-color-scheme: dark)",
      content: DARK_THEME_COLOR,
    },
    // Default theme-color based on current mode (for when mode is explicitly set)
    {
      name: "theme-color",
      content: currentThemeColor.value,
    }
  ]),
});
</script>
