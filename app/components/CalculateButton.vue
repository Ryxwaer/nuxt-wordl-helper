<template>
  <div class="flex flex-col items-center gap-4">
    <!-- Button -->
    <button
      class="px-8 py-3 font-bold text-[var(--color-letters)] rounded-xl transition-all duration-300"
      @click="fetchWords"
      :disabled="error"
      :class="{
        'bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 hover:motion-preset-pulse-sm motion-ease-spring-smooth motion-duration-1000 cursor-pointer shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/30':
          !error,
        'bg-gray-600 cursor-not-allowed opacity-60': error,
      }"
    >
      Calculate Words
    </button>

    <!-- Selected Words Box -->
    <div
      class="w-full overflow-y-auto glass-card-inner rounded-xl p-4 font-bold dark:text-[var(--color-primary)]"
      :class="{ 'opacity-20': selectedWords.length === 0 }"
    >
      <TransitionGroup
        tag="ul"
        name="word-list"
        class="space-y-1 list-decimal pl-9 relative"
      >
        <li
          v-for="word in selectedWords"
          :key="word.word"
          class="tracking-wide hover:translate-x-1.5 transition-transform duration-300 ease-out will-change-transform"
          @click="removeFromSelectedWords(word.word)"
        >
          <div
            class="capitalize text-lg tracking-wide font-mono rounded-lg pr-4 pl-4 ml-4 mr-4 cursor-pointer border border-transparent transition-[background-color,border-color] duration-200 ease-out"
            :class="[
              words.length > 100 ? 'p-0' : 'p-1',
              !word.rank || word.rank < 1
                ? 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 hover:border-gray-500/30'
                : 'bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/25 hover:border-[var(--color-primary)]/20',
            ]"
          >
            {{ word.word }}
          </div>
        </li>
      </TransitionGroup>
    </div>

    <!-- Copy Notification -->
    <div
      :class="[
        showCopyMessage ? 'motion-preset-expand' : 'hidden',
        'fixed top-4 z-50 text-center p-3 px-8 bg-[var(--color-bg-solid)] text-[var(--color-primary)] rounded-xl shadow-2xl shadow-black/50 motion-duration-200 border border-[var(--color-primary)]/30 backdrop-blur-lg',
      ]"
    >
      Copied!
    </div>

    <!-- Results Box -->
    <div
      v-if="showResultsBox"
      class="w-full max-h-[50vh] overflow-y-auto glass-card-inner rounded-xl p-4 font-bold dark:text-[var(--color-primary)]"
    >
      <!-- Loading Dots -->
      <div
        v-if="showLoadingDots"
        class="flex justify-center space-x-2 text-[var(--color-primary)] text-2xl motion-preset-focus-md"
      >
        <span class="motion-preset-oscillate motion-delay-0">.</span>
        <span class="motion-preset-oscillate motion-delay-150">.</span>
        <span class="motion-preset-oscillate motion-delay-300">.</span>
      </div>

      <!-- Word List -->
      <TransitionGroup
        v-if="words.length"
        tag="ul"
        name="word-list"
        class="space-y-1 list-decimal pl-9 relative"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
      >
        <li
          v-for="(word, index) in words"
          :key="word.word"
          :data-index="index"
          class="tracking-wide hover:translate-x-1.5 transition-transform duration-300 ease-out will-change-transform"
          @click="selectWord(word.word)"
        >
          <div
            class="capitalize text-lg tracking-wide font-mono rounded-lg pr-4 pl-4 ml-4 mr-4 cursor-pointer border border-transparent transition-[background-color,border-color] duration-200 ease-out"
            :class="[
              words.length > 100 ? 'p-0' : 'p-1',
              !word.rank || word.rank < 1
                ? 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 hover:border-gray-500/30'
                : 'bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/25 hover:border-[var(--color-primary)]/20',
            ]"
          >
            {{ word.word }}
          </div>
        </li>
      </TransitionGroup>

      <!-- Empty State -->
      <p
        v-else-if="!loading && searched"
        class="text-center font-thin"
      >
        No matched words
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getData, state } = useLetters();
const words = ref<{ word: string; rank: number }[]>([]);
const selectedWords = ref<{ word: string; rank: number }[]>([]);
const loading = ref(false);

const showLoadingDots = computed(
  () => loading.value && words.value.length === 0
);
const showResultsBox = computed(
  () =>
    showLoadingDots.value ||
    words.value.length > 0 ||
    (searched.value && !loading.value)
);
const error = computed(
  () => state.value.position.length < state.value.included.length
);

const showCopyMessage = ref(false);
const searched = ref(false);

// Staggered enter animation hooks for TransitionGroup
const onBeforeEnter = (el: Element) => {
  const htmlEl = el as HTMLElement;
  htmlEl.style.opacity = '0';
  htmlEl.style.transform = 'translateY(8px)';
};

const onEnter = (el: Element, done: () => void) => {
  const htmlEl = el as HTMLElement;
  const index = Number(htmlEl.dataset.index) || 0;
  const delay = index <= 32 ? index * 25 : 800;

  requestAnimationFrame(() => {
    htmlEl.style.transition = `opacity 0.3s ease-out ${delay}ms, transform 0.3s ease-out ${delay}ms`;
    htmlEl.style.opacity = '1';
    htmlEl.style.transform = 'translateY(0)';
  });

  // Clean up inline styles after animation
  setTimeout(() => {
    htmlEl.style.transition = '';
    htmlEl.style.opacity = '';
    htmlEl.style.transform = '';
    done();
  }, delay + 350);
};

const fetchWords = async () => {
  words.value = [];
  loading.value = true;
  searched.value = true;

  try {
    const res = await $fetch<{ words: { word: string; rank: number }[] }>("/api/words", {
      method: "POST",
      body: getData(),
    });
    words.value = res.words.filter(
      (w) => !selectedWords.value.some((sw) => sw.word === w.word)
    );
  } catch (error) {
    console.error("Failed to fetch words:", error);
  } finally {
    loading.value = false;
  }
};

const removeFromSelectedWords = (word: string) => {
  const wordObj = selectedWords.value.find((w) => w.word === word);
  if (wordObj) {
    selectedWords.value = selectedWords.value.filter((w) => w.word !== word);
    words.value.push(wordObj);
  }
};

const selectWord = async (word: string) => {
  const wordObj = words.value.find((w) => w.word === word);
  if (wordObj) {
    words.value = words.value.filter((w) => w.word !== word);
    selectedWords.value.push(wordObj);
  }
  if (selectedWords.value.length > 6) {
    const removedWord = selectedWords.value.shift();
    if (removedWord) {
      words.value.push(removedWord);
    }
  }
};
</script>

<style scoped>
/* TransitionGroup: leave & move animations */
.word-list-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  position: absolute;
  width: 100%;
}

.word-list-leave-to {
  opacity: 0;
  transform: translateX(16px);
}

/* Smooth repositioning when items are added/removed */
.word-list-move {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
