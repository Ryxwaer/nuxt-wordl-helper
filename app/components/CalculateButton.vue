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
      ref="selectedContainer"
      v-glow
      class="w-full overflow-hidden glass-card-inner rounded-xl p-4 font-bold dark:text-[var(--color-primary)]"
      :class="{ 'opacity-20': selectedWords.length === 0 }"
    >
      <TransitionGroup
        tag="ul"
        :css="false"
        class="space-y-1 list-decimal pl-9"
        @enter="onSelectedEnter"
        @leave="onSelectedLeave"
      >
        <li
          v-for="word in selectedWords"
          :key="word.word"
          class="tracking-wide hover:translate-x-1.5 transition-transform duration-300 ease-out"
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
    <div v-if="showResultsBox" v-glow class="relative w-full rounded-xl">
      <!-- Back-to-top chevron -->
      <Transition
        enter-active-class="transition-[opacity,transform] duration-250 ease-out"
        leave-active-class="transition-[opacity,transform] duration-250 ease-out"
        enter-from-class="opacity-0 -translate-y-1.5"
        leave-to-class="opacity-0 -translate-y-1.5"
      >
        <button
          v-if="showBackToTop"
          class="absolute top-px left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-16 h-8 rounded-b-xl cursor-pointer text-[var(--color-primary)] bg-[var(--color-form-bg)] backdrop-blur-md border border-[rgba(240,185,11,0.15)] border-t-0 opacity-70 hover:opacity-100 hover:shadow-[0_4px_12px_rgba(240,185,11,0.15)] transition-[opacity,box-shadow] duration-200 ease-out"
          @click="scrollToTop"
          aria-label="Scroll to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 15 12 9 18 15" />
          </svg>
        </button>
      </Transition>

      <div
        ref="resultsContainer"
        class="w-full max-h-[50vh] overflow-y-auto glass-card-inner rounded-xl p-4 font-bold dark:text-[var(--color-primary)]"
        :class="{ 'fade-bottom': canScrollDown }"
        @scroll="checkScrollState"
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
      <ul
        v-if="words.length"
        ref="wordListEl"
        class="space-y-1 list-decimal pl-9"
      >
        <li
          v-for="word in words"
          v-show="!hiddenWords.has(word.word)"
          :key="word.word"
          :data-word="word.word"
          :data-gray="(!word.rank || word.rank < 1) ? '' : undefined"
          class="tracking-wide hover:translate-x-1.5 transition-transform duration-300 ease-out"
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
      </ul>

      <!-- Empty State -->
      <p
        v-else-if="!loading && searched"
        class="text-center font-thin"
      >
        No matched words
      </p>
      </div>
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

// Scroll fade detection — show bottom fade only when more content exists below
const resultsContainer = useTemplateRef<HTMLElement>('resultsContainer');
const canScrollDown = ref(false);
const showBackToTop = ref(false);

const checkScrollState = () => {
  const el = resultsContainer.value;
  if (!el) {
    canScrollDown.value = false;
    showBackToTop.value = false;
    return;
  }
  canScrollDown.value = el.scrollHeight - el.scrollTop - el.clientHeight > 20;

  // Show chevron when scrolled past the first gray (unranked) word
  const firstGray = el.querySelector('[data-gray]') as HTMLElement | null;
  if (firstGray && el.scrollTop > 20) {
    const containerRect = el.getBoundingClientRect();
    const grayRect = firstGray.getBoundingClientRect();
    showBackToTop.value = grayRect.top < containerRect.bottom;
  } else {
    showBackToTop.value = false;
  }
};

const scrollToTop = () => {
  resultsContainer.value?.scrollTo({ top: 0, behavior: 'smooth' });
};

// Selected words container ref — used to lock height during overflow swap
const selectedContainer = useTemplateRef<HTMLElement>('selectedContainer');

// Hidden words tracking — toggle visibility instead of mutating the words array
const hiddenWords = ref(new Set<string>());
const wordListEl = useTemplateRef<HTMLElement>('wordListEl');

// Re-check when words list changes
watch(() => words.value.length, () => {
  nextTick(checkScrollState);
});

// Staggered enter animation applied directly to DOM after fetch
const applyStaggerAnimation = () => {
  const el = wordListEl.value;
  if (!el) return;

  // Only animate visible items (skip v-show hidden ones)
  const items = Array.from(el.children).filter(
    (child) => (child as HTMLElement).offsetParent !== null
  ) as HTMLElement[];
  items.forEach((li, i) => {
    li.style.opacity = '0';
    li.style.transform = 'translateY(8px)';

    const delay = i <= 32 ? i * 25 : 800;

    requestAnimationFrame(() => {
      li.style.transition = `opacity 0.3s ease-out ${delay}ms, transform 0.3s ease-out ${delay}ms`;
      li.style.opacity = '1';
      li.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      li.style.transition = '';
      li.style.opacity = '';
      li.style.transform = '';
    }, delay + 350);
  });
};

const fetchWords = async () => {
  words.value = [];
  hiddenWords.value = new Set();
  loading.value = true;
  searched.value = true;

  try {
    const res = await $fetch<{ words: { word: string; rank: number }[] }>("/api/words", {
      method: "POST",
      body: getData(),
    });
    words.value = res.words;

    // Hide words that are already selected (keep them in DOM so they can reappear)
    for (const sw of selectedWords.value) {
      hiddenWords.value.add(sw.word);
    }

    nextTick(applyStaggerAnimation);
  } catch (error) {
    console.error("Failed to fetch words:", error);
  } finally {
    loading.value = false;
  }
};

// Animation config
const ANIM = { ms: 300, css: '0.3s ease-out' };

// Reusable: collapse a <li> (fade out + shrink to 0), calls onDone when finished
const collapseEl = (el: HTMLElement, onDone?: () => void) => {
  const h = el.offsetHeight;
  el.style.overflow = 'hidden';
  el.style.height = `${h}px`;
  el.style.pointerEvents = 'none';

  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.transition = `opacity ${ANIM.css}, height ${ANIM.css}, margin-top ${ANIM.css}`;
    el.style.opacity = '0';
    el.style.height = '0';
    el.style.marginTop = '0';
  }));

  setTimeout(() => {
    el.style.overflow = '';
    el.style.height = '';
    el.style.opacity = '';
    el.style.transition = '';
    el.style.marginTop = '';
    el.style.pointerEvents = '';
    onDone?.();
  }, ANIM.ms + 50);
};

// Reusable: expand a hidden word back into the results list at its original position
const expandWordInResults = (word: string) => {
  hiddenWords.value.delete(word);

  nextTick(() => {
    const li = wordListEl.value?.querySelector(
      `[data-word="${CSS.escape(word)}"]`
    ) as HTMLElement | null;
    if (!li) return;

    li.style.overflow = 'hidden';
    li.style.height = '0';
    li.style.opacity = '0';
    li.style.marginTop = '0';

    const targetH = li.scrollHeight;

    requestAnimationFrame(() => requestAnimationFrame(() => {
      li.style.transition = `opacity ${ANIM.css}, height ${ANIM.css}, margin-top ${ANIM.css}`;
      li.style.height = `${targetH}px`;
      li.style.opacity = '1';
      li.style.marginTop = '';
    }));

    setTimeout(() => {
      li.style.overflow = '';
      li.style.height = '';
      li.style.opacity = '';
      li.style.transition = '';
      li.style.marginTop = '';
    }, ANIM.ms + 50);
  });
};

// Selected words list: JS transition hooks
const onSelectedEnter = (el: Element, done: () => void) => {
  const htmlEl = el as HTMLElement;

  htmlEl.style.overflow = 'hidden';
  htmlEl.style.height = '0';
  htmlEl.style.opacity = '0';
  htmlEl.style.marginTop = '0';

  const targetH = htmlEl.scrollHeight;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    htmlEl.style.transition = `opacity ${ANIM.css}, height ${ANIM.css}, margin-top ${ANIM.css}`;
    htmlEl.style.height = `${targetH}px`;
    htmlEl.style.opacity = '1';
    htmlEl.style.marginTop = '';
  }));

  setTimeout(() => {
    htmlEl.style.overflow = '';
    htmlEl.style.height = '';
    htmlEl.style.opacity = '';
    htmlEl.style.transition = '';
    done();
  }, ANIM.ms + 50);
};

const onSelectedLeave = (el: Element, done: () => void) => {
  const htmlEl = el as HTMLElement;
  const h = htmlEl.offsetHeight;

  const isFirst = !htmlEl.previousElementSibling;
  const nextEl = isFirst ? (htmlEl.nextElementSibling as HTMLElement | null) : null;

  htmlEl.style.overflow = 'hidden';
  htmlEl.style.height = `${h}px`;

  if (nextEl) {
    nextEl.style.transition = `margin-top ${ANIM.css}`;
  }

  requestAnimationFrame(() => requestAnimationFrame(() => {
    htmlEl.style.transition = `opacity ${ANIM.css}, height ${ANIM.css}, margin-top ${ANIM.css}`;
    htmlEl.style.opacity = '0';
    htmlEl.style.height = '0';
    htmlEl.style.marginTop = '0';
    if (nextEl) nextEl.style.marginTop = '0';
  }));

  setTimeout(() => {
    done();
    if (nextEl) {
      nextEl.style.transition = '';
      nextEl.style.marginTop = '';
    }
  }, ANIM.ms + 50);
};

// Click word in selected list → remove from top, expand back in bottom list
const removeFromSelectedWords = (word: string) => {
  const idx = selectedWords.value.findIndex((w) => w.word === word);
  if (idx !== -1) {
    selectedWords.value.splice(idx, 1);

    const container = selectedContainer.value;
    if (container) container.style.height = '';

    expandWordInResults(word);
  }
};

// Click word in results list → collapse in bottom, add to top (FIFO overflow)
const selectWord = (word: string) => {
  if (selectedWords.value.some((w) => w.word === word)) return;
  if (hiddenWords.value.has(word)) return;

  const wordObj = words.value.find((w) => w.word === word);
  if (!wordObj) return;

  // Capture overflow word before mutating
  let overflowWord: string | undefined;
  if (selectedWords.value.length >= 6) {
    overflowWord = selectedWords.value[0]?.word;
  }

  // Collapse clicked word in results list
  const li = wordListEl.value?.querySelector(
    `[data-word="${CSS.escape(word)}"]`
  ) as HTMLElement | null;

  if (li) {
    collapseEl(li, () => { hiddenWords.value.add(word); });
  } else {
    hiddenWords.value.add(word);
  }

  // Overflow: expand bumped word simultaneously (not after collapse finishes)
  if (overflowWord) expandWordInResults(overflowWord);

  // Lock container height at 6 words so overflow swaps can't jump
  const container = selectedContainer.value;
  if (selectedWords.value.length >= 6 && container) {
    container.style.height = `${container.offsetHeight}px`;
  }

  selectedWords.value.push(wordObj);

  if (selectedWords.value.length > 6) {
    selectedWords.value.shift();
  }
};
</script>

<style scoped>
/* mask-image needs vendor prefix for Safari — can't be expressed in Tailwind */
.fade-bottom {
  mask-image: linear-gradient(to bottom, black 0%, black 78%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 78%, transparent 100%);
}
</style>
