<template>
  <div class="relative md:h-[280px] h-[220px]">
    <!-- Skeleton loading state -->
    <div v-if="isLoading" class="absolute inset-0 p-2 flex flex-col">
      <!-- Chart header skeleton -->
      <div class="flex justify-between items-center mb-2 md:mb-4">
        <USkeleton class="h-4 md:h-5 w-24 md:w-32" />
        <USkeleton class="h-3 md:h-4 w-12 md:w-16" />
      </div>

      <!-- Chart area skeleton -->
      <div class="flex-1 flex flex-col justify-end">
        <div
          class="flex items-end space-x-1 md:space-x-2 h-[160px] md:h-[200px]"
        >
          <USkeleton
            v-for="i in 12"
            :key="i"
            class="w-full rounded-t-md"
            :style="{ height: `${Math.random() * 65 + 35}%` }"
          />
        </div>

        <!-- X-axis labels skeleton -->
        <div class="flex justify-between pt-2 md:pt-4 mt-auto">
          <USkeleton
            v-for="i in 5"
            :key="i"
            class="h-2 md:h-3 w-6 md:w-8 transform -rotate-45 md:rotate-0 origin-left"
          />
        </div>
      </div>
    </div>

    <!-- Actual chart with pure CSS transition -->
    <div v-else class="transition-all duration-300 ease-in-out">
      <client-only>
        <ApexChart
          width="100%"
          height="280"
          type="area"
          :options="chartOptions"
          :series="chartData.series"
          :key="props.viewMode"
        />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onMounted } from "vue";
import type { PropType } from "vue";

// Use the simpler form of defineAsyncComponent and handle loading state in onMounted
const ApexChart = defineAsyncComponent(() => import("vue3-apexcharts"));

// Define the QueryLog interface
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

const props = defineProps({
  logs: {
    type: Array as PropType<QueryLog[]>,
    required: true,
  },
  viewMode: {
    type: String,
    default: "daily",
    validator: (value: string) => ["daily", "monthly"].includes(value),
  },
});

// Loading state
const isLoading = ref(true);

// Set loading state to false after component mounts
onMounted(() => {
  // Add a small timeout to ensure chart has time to load
  setTimeout(() => {
    isLoading.value = false;
  }, 100);
});

// Group logs by hour (for daily view)
const dailyData = computed(() => {
  const today = new Date().toISOString().slice(0, 10);
  const counts: Record<string, number> = {};

  // Initialize all 24 hours with zero counts
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0");
    counts[`${hour}:00`] = 0;
  }

  // Count logs from today grouped by hour
  props.logs.forEach((log) => {
    const logDate = new Date(log.timestamp);
    const logDateStr = logDate.toISOString().slice(0, 10);

    // Only include logs from today
    if (logDateStr === today) {
      const hour = logDate.getHours().toString().padStart(2, "0");
      const timeKey = `${hour}:00`;
      counts[timeKey] = (counts[timeKey] || 0) + 1;
    }
  });

  const sortedTimes = Object.keys(counts).sort();
  return {
    categories: sortedTimes,
    series: [
      { name: "Queries", data: sortedTimes.map((time) => counts[time]) },
    ],
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
  props.logs.forEach((log) => {
    const logDate = new Date(log.timestamp);
    if (logDate >= thirtyDaysAgo) {
      const dateStr = logDate.toISOString().slice(0, 10);
      counts[dateStr] = (counts[dateStr] || 0) + 1;
    }
  });

  const sortedDays = Object.keys(counts).sort();
  return {
    categories: sortedDays,
    series: [{ name: "Queries", data: sortedDays.map((day) => counts[day]) }],
  };
});

// Current chart data based on active view
const chartData = computed(() => {
  return props.viewMode === "daily" ? dailyData.value : monthlyData.value;
});

// Chart options based on view mode
const chartOptions = computed(() => {
  const currentMode = props.viewMode as "daily" | "monthly";

  return {
    chart: {
      id: `queries-chart-${currentMode}`,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "inherit",
      background: "transparent",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    title: {
      text: currentMode === "daily" ? "Today's Queries" : "Last 30 Days",
      align: "left",
      style: {
        fontSize: "15px",
        fontWeight: "500",
        color: "var(--color-primary)",
      },
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      categories:
        currentMode === "daily"
          ? dailyData.value.categories
          : monthlyData.value.categories,
      labels: {
        formatter: (value: string | undefined) => {
          const safeValue = value || "";

          if (currentMode === "daily") {
            // Show only every 3 hours
            const hour = parseInt(safeValue.split(":")[0] || "0");
            return hour % 3 === 0 ? `${hour.toString().padStart(2, "0")}` : "";
          } else {
            // Show only every 5th day
            try {
              const date = new Date(safeValue);
              const day = date.getDate();
              return day === 1 || day % 5 === 0
                ? `${day}/${date.getMonth() + 1}`
                : "";
            } catch {
              return "";
            }
          }
        },
        style: {
          colors: "var(--color-secondary)",
          fontSize: "11px",
        },
        rotateAlways: false,
        hideOverlappingLabels: true,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
      labels: {
        formatter: (value: number) => value.toFixed(0),
        style: { colors: "var(--color-secondary)" },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["var(--color-primary)"],
    },
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 5,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      shared: true,
      custom: ({
        series,
        seriesIndex,
        dataPointIndex,
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
      }) => {
        const value = series?.[seriesIndex]?.[dataPointIndex] || 0;
        const category =
          currentMode === "daily"
            ? dailyData.value.categories[dataPointIndex] || ""
            : monthlyData.value.categories[dataPointIndex] || "";

        let displayTime = "";

        if (currentMode === "daily") {
          // Format hour range (e.g., "09:00 - 10:00")
          const hourStr = category.split(":")[0] || "00";
          const hour = parseInt(hourStr);
          const nextHour = (hour + 1) % 24;
          displayTime = `${hourStr}:00 - ${nextHour
            .toString()
            .padStart(2, "0")}:00`;
        } else {
          // Format date (e.g., "Jan 15")
          try {
            const date = new Date(category);
            displayTime = date.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            });
          } catch {
            displayTime = category;
          }
        }

        return `
          <div class="px-3 py-2 shadow-sm rounded-md">
            <div class="font-semibold text-sm text-[var(--color-primary)]">${displayTime}</div>
            <div class="mt-1.5">
              <span class="text-sm text-black">queries: <span class="font-bold">${value}</span></span>
            </div>
          </div>
        `;
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.2,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    colors: ["var(--color-primary)"],
    responsive: [
      {
        breakpoint: 576,
        options: {
          chart: { height: 220 },
          xaxis: {
            labels: {
              rotate: -45,
              style: { fontSize: "10px" },
            },
          },
        },
      },
    ],
  };
});
</script>
