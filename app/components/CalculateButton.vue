<template>
  <div class="flex flex-col items-center gap-4">
    <!-- Button -->
    <button
      class="px-8 py-3 font-bold text-[var(--color-letters)] rounded-xl transition-all duration-300"
      @click="fetchWords"
      :disabled="error"
      :class="{
        'bg-[#f0b90b] hover:bg-[#e5b00a] hover:motion-preset-pulse-sm motion-ease-spring-smooth motion-duration-1000 cursor-pointer shadow-lg shadow-[#f0b90b]/20 hover:shadow-[#f0b90b]/30':
          !error,
        'bg-gray-600 cursor-not-allowed opacity-60': error,
      }"
    >
      Calculate Words
    </button>

    <!-- Selected Words Box -->
    <div
      class="w-full overflow-y-auto glass-card-inner rounded-xl p-4 font-bold dark:text-[var(--color-primary)] motion-preset-focus-md"
      :class="{ 'opacity-20': selectedWords.length === 0 }"
    >
      <ul class="space-y-1 list-decimal pl-9">
        <li
          class="tracking-wide hover:translate-x-2 ease-in-out transition-transform duration-200"
          v-for="(word, index) in selectedWords"
          @click="removeFromSelectedWords(word.word)"
        >
          <div
            class="capitalize text-lg tracking-wide font-mono bg-[var(--color-primary)]/10 rounded-lg pr-4 pl-4 ml-4 mr-4 hover:bg-[var(--color-primary)]/25 cursor-pointer motion-preset-focus-md border border-transparent hover:border-[var(--color-primary)]/20 transition-all duration-200"
            :class="{ 'p-0': words.length > 100, 'p-1': words.length <= 100 }"
          >
            {{ word.word }}
          </div>
        </li>
      </ul>
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
      class="w-full overflow-y-auto glass-card-inner rounded-xl p-4 font-bold dark:text-[var(--color-primary)] motion-preset-focus-md"
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
      <ul v-if="words.length" class="space-y-1 list-decimal pl-9">
        <li
          class="tracking-wide hover:translate-x-2 transition-transform duration-200 ease-in-out"
          v-for="(word, index) in words"
          :key="index"
          @click="selectWord(word.word)"
        >
          <div
            class="capitalize text-lg tracking-wide font-mono bg-[var(--color-primary)]/10 rounded-lg pr-4 pl-4 ml-4 mr-4 hover:bg-[var(--color-primary)]/25 cursor-pointer motion-preset-focus-md border border-transparent hover:border-[var(--color-primary)]/20 transition-all duration-200"
            :class="{ 'p-0': words.length > 100, 'p-1': words.length <= 100 }"
            :style="{
              animationDelay: `${index <= 32 ? index * 30 : 1000}ms`,
              animationFillMode: 'both',
            }"
          >
            {{ word.word }}
          </div>
        </li>
      </ul>

      <!-- Empty State -->
      <p
        v-else-if="!loading && searched"
        class="text-center font-thin motion-preset-focus-md"
      >
        No matched words
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getData, state } = useLetters();
const words = ref<{ word: string }[]>([]);
const selectedWords = ref<{ word: string }[]>([]);
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

const fetchWords = async () => {
  words.value = [];
  loading.value = true;
  searched.value = true;

  try {
    const res = await $fetch<{ words: { word: string }[] }>("/api/words", {
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
