<template>
  <div class="card">
    <div class="card-body d-flex flex-column p-0">
      <div class="d-flex flex-stack flex-wrap p-5">
        <span class="text-dark fw-bold fs-4">Purchases Overview</span>

        <span class="text-primary fw-bold fs-4">$24,500</span>
      </div>

      <div class="flex-grow-1 h-100">
        <apexchart ref="chartRef" class="card-rounded-bottom" :options="chart" :series="series"
          type="area" height="200"></apexchart>
      </div>

    </div>
  </div>
</template>
  
<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets"
import { defineComponent, ref, onBeforeMount, computed, watch } from "vue"
import { getCSSVariableValue } from "@/assets/ts/_utils"
import type VueApexCharts from "vue3-apexcharts"
import type { ApexOptions } from "apexcharts"
import { useThemeStore } from "@/stores/theme"

export default defineComponent({
  name: "programs-chart-card",
  props: {
    widgetClasses: String,
    chartColor: String,
    chartHeight: String,
  },
  setup(props) {
    const chartRef = ref<typeof VueApexCharts | null>(null)
    const color = ref(props.chartColor)
    let chart: ApexOptions = {}
    const store = useThemeStore()

    const series = ref([
      {
        name: "Net Profit",
        data: [15, 25, 15, 40, 20, 50],
      },
    ]);

    const themeMode = computed(() => {
      return store.mode;
    });

    onBeforeMount(() => {
      Object.assign(chart, chartOptions(color.value));
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions(color.value));

      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    return {
      chart,
      series,
      chartRef,
      refreshChart,
      getAssetPath,
    };
  },
});

const chartOptions = (color: string = "secondary"): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-800");
  const strokeColor = getCSSVariableValue("--bs-gray-300");
  const baseColor = getCSSVariableValue(`--bs-${color}`);
  const lightColor = getCSSVariableValue(`--bs-${color}-light`);

  return {
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: "auto",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return "$" + val + " thousands";
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };
};
</script>
  