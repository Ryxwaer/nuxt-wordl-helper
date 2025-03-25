<template>
    <div class="w-64 min-h-16 md:h-48 border border-yellow-500 bg-gray-900/20 dark:text-yellow-400 rounded-lg p-2 grid grid-cols-6 gap-1 auto-rows-min relative"
        @click="focusInput">
        <!-- Placeholder when empty -->
        <span v-if="tags.length === 0" class="absolute left-2 top-2 dark:text-yellow-500 opacity-50 text-sm">
            Type {{ type }} letters
        </span>

        <!-- Render letters as tags -->
        <span v-for="(letter, index) in tags" :key="`${letter}-${index}`" 
        :style="{
                backgroundColor: flashingLetters.includes(letter) ? 'red' : props.color
            }"
        :class="[
            'uppercase w-8 h-8 flex items-center justify-center bg-yellow-500 text-black rounded-md text-lg font-bold cursor-pointer transition-colors duration-300',
            { 'bg-red-500 text-white': flashingLetters.includes(letter) }
        ]" @click.stop="removeLetter(index)">
            {{ letter }}
        </span>

        <!-- Hidden input for typing -->
        <input ref="inputField" v-model="inputLetter"
            class="w-8 h-8 text-lg text-yellow-400 bg-transparent outline-none text-center" @input="tryAddLetter"
            @keydown="handleKeydown" placeholder="" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    type: 'included' | 'excluded',
    color: string
}>()

const { state, addLetter } = useLetters()
const tags = computed(() => state.value[props.type])
const flashingLetters = computed(() => state.value.flashing)

const inputLetter = ref("")
const inputField = ref<HTMLInputElement | null>(null)

// Focus the hidden input when container is clicked
const focusInput = () => {
    inputField.value?.focus()
}

// Try adding a letter to the state
const tryAddLetter = () => {
    const letter = inputLetter.value.toLowerCase().trim()
    if (/^[a-z]$/.test(letter)) {
        addLetter(letter, props.type)
    }
    inputLetter.value = ""
}

// Handle Backspace (delete last letter if input is empty)
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace' && inputLetter.value === '' && tags.value.length > 0) {
        tags.value.pop()
    }
}

// Remove letter from the tag list
const removeLetter = (index: number) => {
    tags.value.splice(index, 1)
}
</script>

<style scoped>
.auto-rows-min {
    grid-auto-rows: min-content;
}
</style>