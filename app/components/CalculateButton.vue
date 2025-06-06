<template>
  <div class="flex flex-col items-center gap-4">
    <!-- Button -->
    <button
      class="px-6 py-2 font-bold text-[var(--color-letters)] rounded-lg"
      @click="fetchWords"
      :disabled="error"
      :class="{
        'bg-yellow-500 hover:bg-yellow-400 hover:motion-preset-pulse-sm motion-ease-spring-smooth motion-duration-1000 cursor-pointer':
          !error,
        'bg-gray-500 cursor-not-allowed': error,
      }"
    >
      Calculate Words
    </button>

    <!-- Selected Words Box -->
    <div
      class="w-full overflow-y-auto border border-yellow-500 rounded-lg p-4 bg-[var(--color-form-bg)] font-bold dark:text-yellow-400 motion-preset-focus-md"
      :class="{ 'opacity-10': selectedWords.length === 0 }"
    >
      <ul class="space-y-1 list-decimal pl-9">
        <li
          class="tracking-wide hover:translate-x-4 ease-in-out"
          v-for="(word, index) in selectedWords"
          @click="removeFromSelectedWords(word.word)"
        >
          <div
            class="capitalize text-lg tracking-wide font-mono bg-yellow-500/10 rounded-lg pr-4 pl-4 ml-4 mr-4 hover:bg-yellow-500/20 cursor-pointer motion-preset-focus-md"
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
        'fixed top-4 z-50 text-center p-2 pl-8 pr-8 bg-gray-500 text-white rounded-lg shadow-lg motion-duration-200',
      ]"
    >
      Copied!
    </div>

    <!-- Results Box -->
    <div
      v-if="showResultsBox"
      class="w-full overflow-y-auto border border-yellow-500 rounded-lg p-4 bg-[var(--color-form-bg)] font-bold dark:text-yellow-400 motion-preset-focus-md"
    >
      <!-- Loading Dots -->
      <div
        v-if="showLoadingDots"
        class="flex justify-center space-x-2 text-yellow-400 motion-preset-focus-md"
      >
        <span class="motion-preset-oscillate motion-delay-0">.</span>
        <span class="motion-preset-oscillate motion-delay-150">.</span>
        <span class="motion-preset-oscillate motion-delay-300">.</span>
      </div>

      <!-- Word List -->
      <ul v-if="words.length" class="space-y-1 list-decimal pl-9">
        <li
          class="tracking-wide hover:translate-x-4 transition-transform duration-200 ease-in-out"
          v-for="(word, index) in words"
          :key="index"
          @click="selectWord(word.word)"
        >
          <div
            class="capitalize text-lg tracking-wide font-mono bg-yellow-500/10 rounded-lg pr-4 pl-4 ml-4 mr-4 hover:bg-yellow-500/20 cursor-pointer motion-preset-focus-md"
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
