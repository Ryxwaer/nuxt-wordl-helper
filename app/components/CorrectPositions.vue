<template>
  <div
    class="text-sm font-semibold mb-2 text-left dark:text-[var(--color-primary)]"
  >
    Exact positions
    <div
      class="flex mb-2 mt-2 justify-center"
      :class="{ 'gap-1': wordSize == 9, 'gap-2': wordSize <= 8 }"
    >
      <input
        v-for="(index, i) in Array.from({ length: wordSize })"
        :key="i"
        type="text"
        maxlength="1"
        v-model="state.position[i]"
        @input="addLetterToState(i)"
        @keydown="handleArrowKey($event, i)"
        @focus="selectText"
        :ref="`inputs${i}`"
        class="uppercase w-8 h-10 text-center text-lg bg-[var(--letter-correct)] font-bold text-[var(--color-letters)] rounded-lg motion-preset-shrink"
      />
    </div>
  </div>
  <!-- Range Slider for Word Size -->
  <div class="relative w-full sm:w-64 h-8">
    <!-- Background Track (non-functional visual track) -->
    <div
      class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-300 rounded-full z-0"
    ></div>

    <!-- Functional Range Slider (this is the real interactive slider) -->
    <input
      type="range"
      min="3"
      max="10"
      v-model="wordSize"
      class="absolute slider w-full h-8 rounded-full appearance-none cursor-pointer focus:outline-none accent-gray-500 z-10"
    />
  </div>

  <p class="dark:text-white dark:font-bold">{{ wordSize }}</p>
</template>

<script setup lang="ts">
const { state, addLetter, removeLetter } = useLetters();
const wordSize = ref(5);

state.value.position = Array(wordSize.value).fill("");

function selectText(event: any) {
  event.target.select();
}

watch(wordSize, (newSize) => {
  if (newSize > state.value.position.length) {
    state.value.position.push(
      ...Array(newSize - state.value.position.length).fill("")
    );
  } else {
    state.value.position.length = newSize;
  }
});

const moveFocus = (index: number) => {
  if (index < wordSize.value - 1) {
    const nextInput: HTMLInputElement | null = document.querySelector(
      `input:nth-child(${index + 2})`
    );
    nextInput?.focus();
  } else {
    const nextInput: HTMLInputElement | null =
      document.querySelector(`input:nth-child(1)`);
    nextInput?.focus();
  }
};

// Handle Arrow Keys
const handleArrowKey = (event: KeyboardEvent, index: number) => {
  const inputs = Array.from(document.querySelectorAll("input"));

  if (event.key === "ArrowRight") {
    if (index < wordSize.value - 1) {
      const nextInput: HTMLInputElement | undefined = inputs[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
      nextInput?.focus();

      setTimeout(() => {
        nextInput?.select();
      }, 0);
    } else {
      const nextInput: HTMLInputElement | undefined = inputs[0];
      nextInput?.focus();
    }
  } else if (event.key === "ArrowLeft") {
    if (index > 0) {
      const prevInput: HTMLInputElement | undefined = inputs[index - 1];
      prevInput?.focus();

      setTimeout(() => {
        prevInput?.select();
      }, 0);
    } else {
      const prevInput: HTMLInputElement | undefined =
        inputs[wordSize.value - 1];
      prevInput?.focus();
    }
  } else if (event.key === "Backspace") {
    event.preventDefault();
    state.value.position[index] = "";
    if (index > 0) {
      const prevInput: HTMLInputElement | undefined = inputs[index - 1];
      setTimeout(() => {
        prevInput?.focus();
      }, 0);
    } else {
      const prevInput: HTMLInputElement | undefined =
        inputs[wordSize.value - 1];
      setTimeout(() => {
        prevInput?.focus();
      }, 0);
    }
    triggerAnimation(index);
  }
};

const addLetterToState = (index: number) => {
  const letter = state.value.position[index]!.toLowerCase().trim();
  if (state.value.excluded.includes(letter)) {
    removeLetter(letter, "excluded");
  }
  if (/^[a-z]$/.test(letter)) {
    state.value.position[index] = letter;
    addLetter(letter, "included");
    moveFocus(index);

    triggerAnimation(index);
  } else {
    state.value.position[index] = "";
  }
};

const triggerAnimation = (index: number) => {
  const inputElement = document.querySelector(
    `input:nth-child(${index + 1})`
  ) as HTMLInputElement;

  inputElement.classList.remove("motion-preset-shrink");

  void inputElement.offsetWidth;

  inputElement.classList.add("motion-preset-shrink");
};
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 5px solid #f0b90b;
  background: transparent;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 5px solid #f0b90b;
  background: transparent;
  cursor: pointer;
}
</style>
