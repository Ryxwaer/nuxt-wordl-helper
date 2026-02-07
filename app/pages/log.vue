<template>
  <div class="container mx-auto py-8 max-w-5xl">
    <h1
      class="text-3xl md:text-4xl font-bold text-center m-8 text-[var(--color-primary)]"
    >
      Query Logs
    </h1>

    <!-- Chart card -->
    <div v-glow class="bg-[var(--color-bg)] rounded-3xl shadow-lg mb-8">
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
        <QueryChart
          :categories="activeCategories"
          :counts="activeCounts"
          :loading="activeChartLoading"
          :viewMode="viewMode"
        />
      </div>
    </div>

    <!-- Logs table card -->
    <div v-glow class="bg-[var(--color-bg)] rounded-3xl shadow-lg p-6">

      <!-- Table skeleton while loading -->
      <div v-if="logsStatus === 'pending'" class="space-y-4">
        <div v-for="i in 8" :key="i" class="flex items-center gap-4">
          <USkeleton class="h-4 w-28" />
          <USkeleton class="h-4 w-20" />
          <div class="flex gap-1">
            <USkeleton v-for="j in 5" :key="j" class="h-8 w-8 rounded-lg" />
          </div>
          <USkeleton class="h-4 w-16" />
          <USkeleton class="h-4 w-16" />
          <USkeleton class="h-4 w-4 rounded-sm" />
        </div>
      </div>

      <template v-else>
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
              <th class="px-4 py-2 w-10"></th>
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

              <!-- Device indicator -->
              <td class="px-4 py-2 text-gray-400 dark:text-gray-500" :title="log.isMobile ? 'Mobile' : 'Desktop'">
                <!-- Mobile: phone icon -->
                <svg v-if="log.isMobile" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <!-- Desktop: monitor icon -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
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
          <!-- Timestamp, Country & Device -->
          <div class="flex justify-between items-center mb-3">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(log.timestamp) }}
            </div>
            <div class="flex items-center gap-1.5 text-sm font-medium">
              <span class="text-gray-400 dark:text-gray-500">
                <svg v-if="log.isMobile" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </span>
              <span>{{ log.country }}</span>
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

      <!-- Pagination Controls -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <button
          :disabled="currentPage <= 1"
          class="custom-button px-3 py-1.5 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          @click="goToPage(currentPage - 1)"
        >
          ← Prev
        </button>

        <!-- Page numbers -->
        <template v-for="p in visiblePages" :key="p">
          <span v-if="p === '...'" class="px-2 text-gray-400">…</span>
          <button
            v-else
            class="px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300"
            :class="p === currentPage
              ? 'bg-[var(--color-primary)] text-white shadow-sm'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
            @click="goToPage(p as number)"
          >
            {{ p }}
          </button>
        </template>

        <button
          :disabled="currentPage >= totalPages"
          class="custom-button px-3 py-1.5 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          @click="goToPage(currentPage + 1)"
        >
          Next →
        </button>
      </div>

      <!-- Summary -->
      <div class="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
        Showing {{ (currentPage - 1) * LOGS_PER_PAGE + 1 }}–{{ Math.min(currentPage * LOGS_PER_PAGE, totalLogs) }}
        of {{ totalLogs }} logs
      </div>

      <!-- Date range for current page -->
      <div v-if="logs.length" class="text-center text-xs text-gray-400 dark:text-gray-500 mt-1">
        {{ formatDateFull(logs[logs.length - 1].timestamp) }} — {{ formatDateFull(logs[0].timestamp) }}
      </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// ── Constants ──────────────────────────────────────────
const LOGS_PER_PAGE = 50

useHead({
  meta: [
    { name: 'robots', content: 'noindex,nofollow' }
  ]
})

// ── Types ──────────────────────────────────────────────
interface QueryLog {
  _id: string
  timestamp: string
  query: {
    position: string[]
    included: string[]
    excluded: string[]
  }
  country: string
  isMobile: boolean
}

interface LogsResponse {
  logs: QueryLog[]
  page: number
  limit: number
  total: number
  totalPages: number
}

interface ChartResponse {
  categories: string[]
  counts: number[]
}

// ── 1. SSR-blocking: daily chart (first paint) ────────
const { data: dailyChart } = await useFetch<ChartResponse>('/api/chart-data', {
  query: { view: 'daily' },
  key: 'chart-daily',
})

// ── 2. Client-only: monthly chart (never runs during SSR) ─
const { data: monthlyChart, status: monthlyChartStatus } = useLazyFetch<ChartResponse>('/api/chart-data', {
  query: { view: 'monthly' },
  key: 'chart-monthly',
  server: false,
})

// ── 3. Client-only: logs table (never runs during SSR) ────
const currentPage = ref(1)

const { data: logsData, status: logsStatus } = useLazyFetch<LogsResponse>('/api/logs', {
  query: computed(() => ({
    page: currentPage.value,
    limit: LOGS_PER_PAGE,
  })),
  server: false,
})

const logs = computed(() => logsData.value?.logs || [])
const totalPages = computed(() => logsData.value?.totalPages || 1)
const totalLogs = computed(() => logsData.value?.total || 0)

// ── View mode & active chart data ─────────────────────
const viewMode = ref<'daily' | 'monthly'>('daily')

const toggleView = (mode: 'daily' | 'monthly') => {
  if (viewMode.value === mode) return
  viewMode.value = mode
}

const EMPTY_CHART: ChartResponse = { categories: [], counts: [] }

const activeCategories = computed(() => {
  const src = viewMode.value === 'daily' ? dailyChart.value : monthlyChart.value
  return src?.categories || EMPTY_CHART.categories
})

const activeCounts = computed(() => {
  const src = viewMode.value === 'daily' ? dailyChart.value : monthlyChart.value
  return src?.counts || EMPTY_CHART.counts
})

const activeChartLoading = computed(() => {
  // Daily is SSR-loaded so never in a loading state on the client.
  // Monthly may still be pending when the user switches to it.
  if (viewMode.value === 'monthly') {
    return monthlyChartStatus.value === 'pending'
  }
  return false
})

// ── Page navigation (on-demand) ───────────────────────
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Build the visible page numbers with ellipsis
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')
  pages.push(total)

  return pages
})

// ── Helpers ────────────────────────────────────────────
const formatDate = (date: string) => {
  return new Date(date).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatDateFull = (date: string) => {
  return new Date(date).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
