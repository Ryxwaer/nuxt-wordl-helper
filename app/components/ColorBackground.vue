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
  </div>
</template>

<script setup lang="ts">
// Set theme-color meta tag based on system preferences only
useHead({
  meta: [
    {
      name: "theme-color",
      media: "(prefers-color-scheme: light)",
      content: "#ffffff",
    },
    {
      name: "theme-color",
      media: "(prefers-color-scheme: dark)",
      content: "#000000",
    },
    {
      name: "theme-color",
      content: "#000000",
    }
  ],
});
</script>
