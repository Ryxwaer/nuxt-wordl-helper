<template>
  <div class="relative md:h-[280px] h-[220px]">
    <!-- Skeleton loading state -->
    <div v-if="props.loading" class="absolute inset-0 p-2 flex flex-col">
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

    <!-- Actual chart -->
    <div v-else class="transition-all duration-300 ease-in-out">
      <client-only>
        <ApexChart
          width="100%"
          height="280"
          type="area"
          :options="chartOptions"
          :series="chartSeries"
          :key="props.viewMode"
        />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";

const ApexChart = defineAsyncComponent(() => import("vue3-apexcharts"));

const props = defineProps<{
  categories: string[];
  counts: number[];
  loading: boolean;
  viewMode: "daily" | "monthly";
}>();
  
// ── Series ────────────────────────────────────────────
const chartSeries = computed(() => [
  { name: "Queries", data: props.counts },
]);

// ── Options ───────────────────────────────────────────
const chartOptions = computed(() => {
  const mode = props.viewMode;

  return {
    chart: {
      id: `queries-chart-${mode}`,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "inherit",
      background: "transparent",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    title: {
      text: mode === "daily" ? "Today's Queries" : "Last 30 Days",
      align: "left",
      style: {
        fontSize: "15px",
        fontWeight: "500",
        color: "var(--color-primary)",
      },
    },
    xaxis: {
      tooltip: { enabled: false },
      categories: props.categories,
      labels: {
        formatter: (value: string | undefined) => {
          const v = value || "";
          if (mode === "daily") {
            const hour = parseInt(v.split(":")[0] || "0");
            return hour % 3 === 0 ? hour.toString().padStart(2, "0") : "";
          }
            try {
            const d = new Date(v);
            const day = d.getUTCDate();
              return day === 1 || day % 5 === 0
              ? `${day}/${d.getUTCMonth() + 1}`
                : "";
            } catch {
              return "";
          }
        },
        style: { colors: "var(--color-secondary)", fontSize: "11px" },
        rotateAlways: false,
        hideOverlappingLabels: true,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        show: true,
        width: 1,
        position: "back",
        opacity: 0.3,
        stroke: {
          color: "var(--color-primary)",
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
      labels: {
        formatter: (v: number) => v.toFixed(0),
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
        const val = series?.[seriesIndex]?.[dataPointIndex] || 0;
        const cat = props.categories[dataPointIndex] || "";
        let label = "";

        if (mode === "daily") {
          const hour = parseInt(cat.split(":")[0] || "0");
          const ampm = hour >= 12 ? "PM" : "AM";
          label = `${hour % 12 || 12}:00 ${ampm}`;
        } else {
          try {
            const d = new Date(cat + "T00:00:00Z");
            label = d.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            });
          } catch {
            label = cat;
          }
        }

        return `
          <div class="px-3 py-2 shadow-sm rounded-md bg-white dark:bg-gray-800">
            <div class="font-semibold text-sm text-[var(--color-primary)]">${label}</div>
            <div class="mt-1">
              <span class="text-sm text-gray-900 dark:text-gray-100">
                <span class="font-bold">${val}</span> ${val === 1 ? "query" : "queries"}
              </span>
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
            labels: { rotate: -45, style: { fontSize: "10px" } },
          },
        },
      },
    ],
  };
});
</script>
