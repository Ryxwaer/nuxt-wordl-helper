<template>
  <div class="container mx-auto py-8 max-w-5xl">
    <h1
      class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)]"
    >
      Query Logs
    </h1>

    <div class="bg-[var(--color-bg)] rounded-3xl shadow-lg mb-8">
      <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Queries Over Time
        </h3>
        <div class="flex space-x-2">
          <button 
            @click="toggleView('daily')" 
            class="px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300"
            :class="viewMode === 'daily' 
              ? 'bg-[var(--color-primary)] text-white shadow-sm transform scale-105' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
          >
            Daily
          </button>
          <button 
            @click="toggleView('monthly')" 
            class="px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300"
            :class="viewMode === 'monthly' 
              ? 'bg-[var(--color-primary)] text-white shadow-sm transform scale-105' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
          >
            Monthly
          </button>
        </div>
      </div>
      <div class="px-6 py-5">
        <QueryChart :logs="logs" :viewMode="viewMode" />
      </div>
    </div>

    <div class="bg-[var(--color-bg)] rounded-3xl shadow-lg p-6">
      <!-- Desktop View -->
      <div class="hidden md:block">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-4 py-2 text-left">Time</th>
              <th class="px-4 py-2 text-left">Country</th>
              <th class="px-4 py-2 text-left">Position</th>
              <th class="px-4 py-2 text-left">Included</th>
              <th class="px-4 py-2 text-left">Excluded</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="log in logs"
              :key="log._id"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <!-- Timestamp -->
              <td
                class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
              >
                {{ formatDate(log.timestamp) }}
              </td>

              <!-- Country -->
              <td class="px-4 py-2 text-sm">
                {{ log.country }}
              </td>

              <!-- Position Letters -->
              <td class="px-4 py-2">
                <div class="flex gap-2 uppercase">
                  <div
                    v-for="(letter, index) in log.query.position"
                    :key="index"
                    class="w-8 h-8 flex items-center justify-center text-lg font-bold rounded-lg"
                    :class="{
                      'bg-[var(--letter-correct)] text-white': letter,
                      'bg-gray-200 dark:bg-gray-700': !letter,
                    }"
                  >
                    {{ letter || " " }}
                  </div>
                </div>
              </td>

              <!-- Included Letters -->
              <td class="px-4 py-2">
                <div class="flex flex-wrap gap-2 uppercase">
                  <div
                    v-for="letter in log.query.included"
                    :key="letter"
                    class="px-2 py-1 bg-[var(--letter-include)] text-white rounded-lg text-sm font-bold"
                  >
                    {{ letter }}
                  </div>
                </div>
              </td>

              <!-- Excluded Letters -->
              <td class="px-4 py-2">
                <div class="flex flex-wrap gap-2 uppercase">
                  <div
                    v-for="letter in log.query.excluded"
                    :key="letter"
                    class="px-2 py-1 bg-[var(--letter-exclude)] text-white rounded-lg text-sm font-bold"
                  >
                    {{ letter }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile View -->
      <div class="md:hidden space-y-4">
        <div
          v-for="log in logs"
          :key="log._id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
        >
          <!-- Timestamp and Country -->
          <div class="flex justify-between items-center mb-3">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(log.timestamp) }}
            </div>
            <div class="text-sm font-medium">
              {{ log.country }}
            </div>
          </div>

          <!-- Query Display -->
          <div class="space-y-3">
            <!-- Position Letters -->
            <div class="flex gap-2">
              <div
                v-for="(letter, index) in log.query.position"
                :key="index"
                class="w-10 h-10 flex items-center justify-center text-xl font-bold rounded-lg"
                :class="{
                  'bg-[var(--letter-correct)] text-white': letter,
                  'bg-gray-200 dark:bg-gray-700': !letter,
                }"
              >
                {{ letter || " " }}
              </div>
            </div>

            <!-- Included Letters -->
            <div v-if="log.query.included.length" class="flex flex-wrap gap-2">
              <div
                v-for="letter in log.query.included"
                :key="letter"
                class="px-2 py-1 bg-[var(--letter-include)] text-white rounded-lg text-sm font-bold"
              >
                {{ letter }}
              </div>
            </div>

            <!-- Excluded Letters -->
            <div v-if="log.query.excluded.length" class="flex flex-wrap gap-2">
              <div
                v-for="letter in log.query.excluded"
                :key="letter"
                class="px-2 py-1 bg-[var(--letter-exclude)] text-white rounded-lg text-sm font-bold"
              >
                {{ letter }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import QueryChart from '~/components/QueryChart.vue'

// View mode state - 'daily' or 'monthly'
const viewMode = ref('daily')

// Toggle view with transition effect
const toggleView = (mode: 'daily' | 'monthly') => {
  if (viewMode.value === mode) return;
  viewMode.value = mode;
}

useHead({
  meta: [
    { name: 'robots', content: 'noindex,nofollow' }
  ]
})

interface QueryLog {
  _id: string;
  timestamp: string;
  query: {
    position: string[];
    included: string[];
    excluded: string[];
  };
  country: string;
}

const { data: logsData } = await useFetch<{ logs: QueryLog[] }>('/api/logs')
const logs = computed(() => logsData.value?.logs || [])

const formatDate = (date: string) => {
  return new Date(date).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
