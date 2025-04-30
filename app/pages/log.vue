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
        <div class="relative">
          <!-- Chart with subtle transition -->
          <div :class="{ 'opacity-80 transition-opacity duration-300': isTransitioning }">
            <client-only>
              <ApexChart
                width="100%"
                height="280"
                type="area"
                :options="chartOptions"
                :series="chartData.series"
              />
            </client-only>
          </div>
        </div>
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
                <div class="flex gap-2">
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
                <div class="flex flex-wrap gap-2">
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
                <div class="flex flex-wrap gap-2">
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
import { ref, computed, defineAsyncComponent, onMounted, watch } from 'vue'

const ApexChart = defineAsyncComponent(() => import('vue3-apexcharts'))

// View mode state - 'daily' or 'monthly'
const viewMode = ref('daily')
const isTransitioning = ref(false)

// Toggle view with transition effect
const toggleView = (mode: 'daily' | 'monthly') => {
  if (viewMode.value === mode || isTransitioning.value) return;
  
  isTransitioning.value = true
  viewMode.value = mode
  
  // Reset transition state after animation completes
  setTimeout(() => {
    isTransitioning.value = false
  }, 350)
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

// Group logs by hour (for daily view)
const dailyData = computed(() => {
  const today = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format
  const counts: Record<string, number> = {};
  
  // Initialize all 24 hours with zero counts
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    counts[`${hour}:00`] = 0;
  }
  
  // Count logs from today grouped by hour
  logs.value.forEach(log => {
    const logDate = new Date(log.timestamp);
    const logDateStr = logDate.toISOString().slice(0, 10);
    
    // Only include logs from today
    if (logDateStr === today) {
      const hour = logDate.getHours().toString().padStart(2, '0');
      const timeKey = `${hour}:00`;
      counts[timeKey] = (counts[timeKey] || 0) + 1;
    }
  });
  
  const sortedTimes = Object.keys(counts).sort();
  return {
    categories: sortedTimes,
    series: [{ name: 'Queries', data: sortedTimes.map(time => counts[time]) }]
  };
});

// Group logs by day (for monthly view)
const monthlyData = computed(() => {
  const counts: Record<string, number> = {};
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);
  
  // Initialize the last 30 days with zero counts
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    counts[dateStr] = 0;
  }
  
  // Count logs from the last 30 days
  logs.value.forEach(log => {
    const logDate = new Date(log.timestamp);
    if (logDate >= thirtyDaysAgo) {
      const dateStr = logDate.toISOString().slice(0, 10);
      counts[dateStr] = (counts[dateStr] || 0) + 1;
    }
  });
  
  const sortedDays = Object.keys(counts).sort();
  return {
    categories: sortedDays,
    series: [{ name: 'Queries', data: sortedDays.map(day => counts[day]) }]
  };
});

// Prepare both chart configurations in advance
const getChartOptions = (mode: 'daily' | 'monthly') => {
  // Base options shared between views
  const baseOptions = {
    chart: { 
      id: `queries-chart-${mode}`,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'inherit',
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      sparkline: {
        enabled: false
      }
    },
    title: {
      text: mode === 'daily' ? "Today's Queries" : 'Last 30 Days',
      align: 'left',
      offsetY: 5,
      style: {
        fontSize: '15px',
        fontWeight: '500',
        color: 'var(--color-primary)'
      }
    },
    subtitle: {
      text: '',
      align: 'left'
    },
    xaxis: { 
      categories: mode === 'daily' ? dailyData.value.categories : monthlyData.value.categories,
      labels: { 
        style: { 
          colors: 'var(--color-secondary)',
          fontSize: '11px',
          fontWeight: '400',
          fontFamily: 'inherit'
        },
        // Format date display based on view mode
        formatter: (value: string | undefined) => {
          // Ensure value is a string
          const safeValue = value || '';
          
          if (mode === 'daily') {
            // For hourly data, show label only every 3 hours (0, 3, 6, 9, 12, 15, 18, 21)
            const hour = parseInt(safeValue.split(':')[0] || '0');
            
            if (hour % 3 === 0) {
              return `${hour.toString().padStart(2, '0')}`;
            }
            return ''; // Hide other hours to prevent crowding
          } else {
            // For monthly view, only show every 5th day or key dates
            try {
              const date = new Date(safeValue);
              const day = date.getDate();
              
              // Show 1st, 5th, 10th, 15th, 20th, 25th, 30th
              if (day === 1 || day % 5 === 0) {
                return `${day}/${(date.getMonth() + 1)}`;
              }
            } catch (e) {
              // Handle invalid date
              return '';
            }
            return ''; // Hide other days
          }
        },
        offsetY: 2,
        rotateAlways: false,
        trim: true,
        hideOverlappingLabels: true,
        maxHeight: 120
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: 'var(--color-primary)',
          width: 1,
          dashArray: 3
        }
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: { 
      min: 0,
      tickAmount: 4,
      labels: { 
        style: { 
          colors: 'var(--color-secondary)',
          fontSize: '11px',
          fontWeight: '400',
          fontFamily: 'inherit'
        },
        formatter: (value: number) => value.toFixed(0),
        offsetX: -10
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    stroke: { 
      curve: 'smooth', 
      width: 3,
      colors: ['var(--color-primary)'],
      lineCap: 'round'
    },
    grid: { 
      show: true,
      borderColor: 'transparent',
      strokeDashArray: 5,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      row: {
        colors: undefined,
        opacity: 0.1
      },
      column: {
        colors: undefined,
        opacity: 0.5
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10
      }
    },
    markers: {
      size: 0,
      colors: ['var(--color-primary)'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 3,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
      hover: {
        size: 6,
        sizeOffset: 3
      }
    },
    dataLabels: { 
      enabled: false 
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      followCursor: false,
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'inherit'
      },
      custom: ({ series, seriesIndex, dataPointIndex, w }: { 
        series: number[][], 
        seriesIndex: number, 
        dataPointIndex: number, 
        w: any 
      }) => {
        // Safely access data with fallbacks
        const value = series && series[seriesIndex] ? series[seriesIndex][dataPointIndex] || 0 : 0;
        const category = mode === 'daily' ? dailyData.value.categories[dataPointIndex] || 'Unknown' : monthlyData.value.categories[dataPointIndex] || 'Unknown';
        
        // Format the date/time for display based on view mode
        let displayTime;
        let displayDate = '';
        
        if (mode === 'daily') {
          // For daily view with hourly data, show the specific hour
          try {
            // Parse the hour from time format (e.g., "09:00")
            const timeStr = category;
            const hourStr = timeStr.split(':')[0] || '00';
            const hour = parseInt(hourStr);
            
            // Format hour - show full hour range (e.g., "09:00 - 10:00")
            const nextHour = (hour + 1) % 24;
            displayTime = `${hourStr}:00 - ${nextHour.toString().padStart(2, '0')}:00`;
            
            // Show today's date as well for context
            const today = new Date();
            displayDate = today.toLocaleDateString(undefined, { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            });
          } catch (e) {
            displayTime = category;
          }
        } else {
          // Format the full date for monthly view
          try {
            const date = new Date(category);
            displayTime = date.toLocaleDateString(undefined, { 
              month: 'short', 
              day: 'numeric' 
            });
          } catch (e) {
            displayTime = category;
          }
        }
        
        // Determine if this is a high, medium, or low number of queries compared to the max
        let maxValue = 0;
        if (series && series[seriesIndex]) {
          // Find max value in this series
          maxValue = Math.max(...series[seriesIndex].filter(val => val !== undefined && val !== null) as number[]);
        }
        
        let activityLevel = '';
        let activityColor = '';
        
        if (value === 0) {
          activityLevel = 'No activity';
          activityColor = 'text-gray-500';
        } else if (maxValue === 0 || value <= maxValue * 0.3) {
          activityLevel = 'Low activity';
          activityColor = 'text-blue-600 dark:text-blue-400';
        } else if (value <= maxValue * 0.7) {
          activityLevel = 'Medium activity';
          activityColor = 'text-yellow-600 dark:text-yellow-400';
        } else {
          activityLevel = 'High activity';
          activityColor = 'text-red-600 dark:text-red-400';
        }
        
        return `
          <div class="px-3 py-2 shadow-sm rounded-md">
            ${displayDate ? `<div class="text-xs text-gray-500 dark:text-gray-400 mb-1">${displayDate}</div>` : ''}
            <div class="font-semibold text-sm ${displayDate ? 'mt-0.5' : ''} text-[var(--color-primary)]">
              ${displayTime}
            </div>
            <div class="flex justify-between items-center mt-1.5 mb-0.5">
              <span class="text-sm text-gray-800 dark:text-gray-200">
                ${value} ${value === 1 ? 'query' : 'queries'}
              </span>
              <span class="text-xs ml-3 ${activityColor} font-medium">
                ${activityLevel}
              </span>
            </div>
          </div>
        `;
      }
    },
    legend: {
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.2,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    colors: ['var(--color-primary)'],
    responsive: [
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 220
          },
          xaxis: {
            labels: {
              rotate: -45,
              offsetY: 0,
              style: {
                fontSize: '10px',
                fontWeight: '600'
              },
              minHeight: 20
            }
          },
          grid: {
            padding: {
              right: 10,
              left: 5,
              bottom: 15,
              top: 5
            }
          },
          markers: {
            size: 0,
            hover: {
              size: 0
            }
          },
          tooltip: {
            followCursor: true,
            x: {
              show: false
            }
          }
        }
      }
    ]
  }
  
  // View-specific configurations
  if (mode === 'daily') {
    return {
      ...baseOptions,
      // Daily view specific options...
    }
  } else {
    return {
      ...baseOptions,
      // Monthly view specific options...
    }
  }
}

// Current chart data based on active view
const chartData = computed(() => {
  return viewMode.value === 'daily' ? dailyData.value : monthlyData.value
})

// Current chart options with smooth transition
const chartOptions = computed(() => {
  // Use type assertion to ensure viewMode is correctly typed
  const currentMode = viewMode.value as 'daily' | 'monthly';
  
  // Base options from the view-specific configuration
  return {
    ...getChartOptions(currentMode),
    // The rest of existing chart options code...
  }
})

// Preload both data sets when component mounts
onMounted(() => {
  // Trigger computation of both data sets to cache them
  dailyData.value
  monthlyData.value
})

/*
useSeoMeta({
  title: "Query Logs - Wordle Helper",
  description: "View the last 1000 queries made to the Wordle Helper.",
  ogTitle: "Query Logs | Wordle Helper",
  ogDescription: "View the last 1000 queries made to the Wordle Helper.",
  keywords: "Wordle Helper, query logs, search history, word search",
});
*/
</script>
