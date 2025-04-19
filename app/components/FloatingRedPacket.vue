<template>
  >
  <div
    v-if="isVisible"
    class="fixed bottom-8 right-8 z-50 motion-opacity-in-0 motion-duration-[2s]"
  >
    <div
      class="relative motion-translate-y-in-100 motion-duration-[2s] motion-ease-spring-smooth"
    >
      <!-- Image container as the main element -->
      <div
        class="relative p-[1px] rounded-xl shadow-md border border-[var(--color-bg)] cursor-pointer hover:-translate-y-1 duration-300 group"
        @click="goToRedPacket"
      >
        <!-- Image wrapper with overflow hidden -->
        <div class="overflow-hidden rounded-lg">
          <img
            src="/red-packet.png"
            alt="Binance Red Packet"
            class="w-32 h-32 md:w-56 md:h-full object-cover scale-160 md:scale-100 origin-center duration-300 group-hover:scale-150"
          />
        </div>

        <!-- Title pill positioned to overlap image -->
        <div
          class="md:hidden absolute text-red-800 font-bold -top-3 -left-2 md:-top-4 md:-left-3 h-8 md:h-12 bg-gray-100 dark:bg-gray-900 text-xs md:text-base px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-md border border-white dark:border-black cursor-pointer hover:bg-red-600 hover:text-white"
          @click.stop="goToRedPacket"
        >
          RED PACKET
        </div>

        <!-- Close button positioned to overlap image -->
        <button
          @click.stop="closeRedPacket"
          class="absolute -top-3 -right-2 md:-top-4 md:-right-3 bg-gray-100 dark:bg-gray-800 h-8 w-8 md:h-12 md:w-12 rounded-full flex items-center justify-center cursor-pointer text-lg md:text-2xl font-bold dark:text-white text-black border border-white dark:border-black shadow hover:bg-gray-600 hover:text-white"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const isVisible = ref(false);

const goToRedPacket = () => {
  router.push("/red-packet");
  closeRedPacket();
};

const closeRedPacket = (e) => {
  if (e) e.stopPropagation();
  isVisible.value = false;
};

watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/red-packet") {
      closeRedPacket();
    }
  }
);

onMounted(() => {
  if (route.path !== "/red-packet") {
    setTimeout(() => {
      isVisible.value = true;
    }, 5000);
  }
});
</script>
