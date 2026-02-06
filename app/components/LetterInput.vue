<template>
  <div
    v-glow
    class="w-64 min-h-16 md:h-48 glass-card-inner text-[var(--color-primary)] rounded-xl p-3 grid grid-cols-6 gap-1.5 auto-rows-min relative cursor-text transition-all duration-300 hover:border-[var(--color-primary)]/30"
    @click="focusInput"
  >
    <!-- Placeholder when empty -->
    <span
      v-if="tags.length === 0"
      class="absolute left-2 top-2 dark:text-[var(--color-primary)] opacity-50 text-sm"
    >
      Type {{ type }} letters
    </span>

    <!-- Render letters as tags -->
    <span
      v-for="(letter, index) in tags"
      :key="`tag-${letter}`"
      :style="{
        backgroundColor: flashingLetters.includes(letter) ? 'red' : props.color,
        color: flashingLetters.includes(letter) ? 'white' : '',
      }"
      :class="[
        'uppercase w-8 h-8 flex items-center justify-center text-[var(--color-letters)] rounded-md text-lg font-bold cursor-pointer transition-colors duration-300',
        { 'motion-preset-shake': flashingLetters.includes(letter) },
        { 'motion-preset-shrink': recentlyAdded.includes(letter) },
      ]"
      @click.stop="removeLetter(index)"
    >
      {{ letter }}
    </span>

    <!-- Hidden input for typing -->
    <input
      ref="inputField"
      v-model="inputLetter"
      class="w-8 h-8 text-lg text-[var(--color-primary)] bg-transparent outline-none text-center"
      @input="tryAddLetter"
      @keydown="handleKeydown"
      placeholder=""
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: "included" | "excluded";
  color: string;
}>();

const { state, addLetter } = useLetters();
const tags = computed(() => state.value[props.type]);
const flashingLetters = computed(() => state.value.flashing);

const inputLetter = ref("");
const inputField = ref<HTMLInputElement | null>(null);
const recentlyAdded = ref<string[]>([]);

const focusInput = () => {
  inputField.value?.focus();
};

const tryAddLetter = () => {
  const letter = inputLetter.value.toLowerCase().trim();
  if (/^[a-z]$/.test(letter)) {
    if (addLetter(letter, props.type)) {
      recentlyAdded.value.push(letter);
      setTimeout(() => {
        recentlyAdded.value.shift();
      }, 600);
    }
  }
  inputLetter.value = "";
};

const handleKeydown = (event: KeyboardEvent) => {
  if (
    event.key === "Backspace" &&
    inputLetter.value === "" &&
    tags.value.length > 0
  ) {
    tags.value.pop();
  }
};

const removeLetter = (index: number) => {
  tags.value.splice(index, 1);
};
</script>

<style scoped>
.auto-rows-min {
  grid-auto-rows: min-content;
}
</style>
