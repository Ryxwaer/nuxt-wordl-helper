<template>
    <div class="flex flex-col items-center gap-4">
        <button class="px-6 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400" @click="fetchWords">
            Calculate Words
        </button>

        <!-- Success Message Popup -->
        <Transition name="fade">
            <div v-if="showCopyMessage"
                class="absolute top-10 text-center p-2 pl-8 pr-8 bg-gray-500 text-white rounded-lg shadow-lg"
                :style="{ transition: 'opacity 0.5s ease' }">
                Copied!
            </div>
        </Transition>

        <Transition name="fade-expand">
            <div v-if="showResultsBox"
                class="w-full overflow-y-auto border border-yellow-500 rounded-lg p-4 bg-gray-900/20 font-bold dark:text-yellow-400">

                <!-- Loading Dots ONLY when no words yet -->
                <Transition name="fade">
                    <div v-if="showLoadingDots" class="flex justify-center space-x-2 text-yellow-400">
                        <span class="animate-bounce">.</span>
                        <span class="animate-bounce delay-150">.</span>
                        <span class="animate-bounce delay-300">.</span>
                    </div>
                </Transition>

                <!-- Words List with transition -->
                <Transition name="list-fade" mode="out-in">
                    <ul v-if="words.length" class="space-y-1 list-decimal pl-12 pr-4">
                        <li class="word-appear text-lg tracking-wide font-mono capitalize bg-yellow-500/10 rounded-lg pr-4 pl-4 hover:bg-yellow-500/20 transition cursor-pointer"
                            v-for="(word, index) in words" :key="index" :style="{ animationDelay: `${index <= 64 ? index * 30 : 2000}ms` }"
                            @click="copyToClipboard(word.word)"
                            :class="{ 'p-0': words.length > 100, 'p-1': words.length <= 100 }">
                            {{ word.word }}
                        </li>
                    </ul>

                    <!-- Show "No matched words" if the fetch is done but no results -->
                    <p v-else-if="!loading && searched" class="text-center font-thin">
                        No matched words
                    </p>
                </Transition>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { getData } = useLetters()
const words = ref<{ word: string }[]>([])
const loading = ref(false)

const showLoadingDots = computed(() => loading.value && words.value.length === 0)
const showResultsBox = computed(() => showLoadingDots.value || words.value.length > 0 || (searched.value && !loading.value))

const showCopyMessage = ref(false)
const searched = ref(false)

const fetchWords = async () => {
    // Step 1: Clear words to trigger fade out of old list
    words.value = []
    loading.value = true
    searched.value = true

    try {
        const res = await $fetch<{ words: { word: string }[] }>('/api/words', {
            method: 'POST',
            body: getData(),
        })
        // Step 2: Assign new words (this triggers fade-in)
        words.value = res.words
    } catch (error) {
        console.error('Failed to fetch words:', error)
    } finally {
        loading.value = false
    }
}

// Copy word to clipboard and show success message
const copyToClipboard = async (word: string) => {
    try {
        await navigator.clipboard.writeText(word)
        showCopyMessage.value = true
        setTimeout(() => {
            showCopyMessage.value = false
        }, 1500) // Hide message after 1.5 seconds
    } catch (error) {
        console.error('Failed to copy text:', error)
    }
}
</script>

<style scoped>
/* Fade for entire list switching */
.list-fade-enter-active,
.list-fade-leave-active {
    transition: opacity 0.3s ease;
}

.list-fade-enter-from,
.list-fade-leave-to {
    opacity: 0;
}

/* Fade-expand for the box */
.fade-expand-enter-active,
.fade-expand-leave-active {
    transition: all 0.5s ease;
    overflow: hidden;
    max-height: 500px;
}

.fade-expand-enter-from,
.fade-expand-leave-to {
    opacity: 0;
    max-height: 0;
}

/* Loading fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Word appear sequential animation */
.word-appear {
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.4s forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>